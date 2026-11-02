import { notFound, redirect } from "next/navigation";
import { GiftPersonalize } from "@/components/organisms/gift-personalize";
import { fetchGiftById, fetchGifts } from "@/lib/api";

export const metadata = {
  title: "خصّص هديتك",
};

type PageProps = {
  searchParams: Promise<{ giftId?: string }>;
};

export default async function GiftPersonalizePage({ searchParams }: PageProps) {
  const { giftId } = await searchParams;
  if (!giftId) redirect("/gifts");

  try {
    const [{ data: product }, { data: catalog }] = await Promise.all([
      fetchGiftById(giftId),
      fetchGifts({ availableOnly: true }),
    ]);
    return <GiftPersonalize product={product} catalog={catalog} />;
  } catch {
    notFound();
  }
}
