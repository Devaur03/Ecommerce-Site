import ShopLayout from "@/components/ShopLayout";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShopLayout>{children}</ShopLayout>;
}
