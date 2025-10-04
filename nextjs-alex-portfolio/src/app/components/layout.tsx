import Nav from "./nav";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        {children}
      </main>
      <Footer />
    </>
  );
}