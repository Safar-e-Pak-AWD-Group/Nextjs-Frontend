import Navbar from "../component/Nav/Nav";
import Footer from "../component/Footer/Footer1";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children} {/* Ye page content */}
        <Footer />
      </body>
    </html>
  );
}
