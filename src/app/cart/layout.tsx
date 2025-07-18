import ShopLayout from "@/components/ShopLayout";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShopLayout>{children}</ShopLayout>;
}
