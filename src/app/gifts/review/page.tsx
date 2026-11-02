import { GiftReview } from "@/components/organisms/gift-review";
import { fetchGifts } from "@/lib/api";

export const metadata = {
  title: "مراجعة الطلب",
};

export default async function GiftReviewPage() {
  const { data } = await fetchGifts({ availableOnly: true });
  return <GiftReview products={data} />;
}
