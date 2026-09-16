import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
