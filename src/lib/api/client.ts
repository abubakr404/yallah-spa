import { ApiError, type ApiResult } from "@/types/api";

/**
 * Interview / FE test: all remote calls resolve against mock data.
 * Swap `USE_MOCK` to false later and point `API_BASE_URL` at a real backend —
 * call sites keep the same fetch-shaped API.
 */
export const USE_MOCK = true;
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.yallah-spa.example/v1";

const MOCK_LATENCY_MS = Number(process.env.NEXT_PUBLIC_MOCK_LATENCY_MS ?? 280);

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
  /** Skip artificial mock delay (useful in Storybook / DS page). */
  instant?: boolean;
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Low-level HTTP client. In mock mode, callers pass a `mockResolver`
 * instead of hitting the network. Real mode uses `fetch(API_BASE_URL + path)`.
 */
export async function apiRequest<T>(
  path: string,
  options: RequestOptions & {
    mockResolver?: () => Promise<ApiResult<T>> | ApiResult<T>;
  } = {}
): Promise<ApiResult<T>> {
  const { method = "GET", body, headers, signal, instant, mockResolver } =
    options;

  if (USE_MOCK) {
    if (!mockResolver) {
      throw new ApiError(500, {
        code: "MOCK_RESOLVER_MISSING",
        message: `No mock resolver registered for ${method} ${path}`,
      });
    }
    if (!instant) await delay(MOCK_LATENCY_MS);
    return mockResolver();
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
    cache: "no-store",
  });

  const json = (await response.json().catch(() => null)) as
    | ApiResult<T>
    | { error: import("@/types/api").ApiErrorBody }
    | null;

  if (!response.ok) {
    const errBody =
      json && "error" in json && json.error
        ? json.error
        : {
            code: "HTTP_ERROR",
            message: `Request failed with ${response.status}`,
          };
    throw new ApiError(response.status, errBody);
  }

  return json as ApiResult<T>;
}
