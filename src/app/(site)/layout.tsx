import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      {/* One <main> per page keeps the landmark structure valid for crawlers
          and screen readers. */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
