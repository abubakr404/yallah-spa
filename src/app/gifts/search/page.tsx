import { GiftsSearch } from "@/components/organisms/gifts-search";
import { fetchGifts } from "@/lib/api";

export const metadata = {
  title: "بحث الهدايا",
};

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function GiftsSearchPage({ searchParams }: PageProps) {
  const { type } = await searchParams;
  const { data } = await fetchGifts({ availableOnly: true });
  return <GiftsSearch products={data} initialType={type ?? ""} />;
}
