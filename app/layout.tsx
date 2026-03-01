import CartToast from "@/components/CartToast";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";

export const metadata = {
  title: "Food Product Explorer",
  description: "Explore food products using OpenFoodFacts API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <CartProvider>
          {children}
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
