// ----------- IMPORTACIONES -----------
import Nav from "./nav";
import Footer from "./footer";

// ----------- COMPONENTE LAYOUT GENERAL -----------
// Este componente envuelve el contenido de cada página con la navegación y el footer
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navegación principal */}
      <Nav />
      {/* Contenido principal */}
      <main className="container mx-auto w-full min-h-screen p-8">
        {children}
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}
