import ShopLayout from "@/components/ShopLayout";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShopLayout>{children}</ShopLayout>;
}
