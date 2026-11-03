import { GiftsBrowse } from "@/components/organisms/gifts-browse";
import { fetchGifts } from "@/lib/api";

export const metadata = {
  title: "اختر هدية",
};

export default async function GiftsPage() {
  const { data } = await fetchGifts({ availableOnly: true });
  return <GiftsBrowse products={data} />;
}
