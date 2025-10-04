
// ----------- COMPONENTE NAV -----------
import Link from "next/link";

export default function Nav() {
    // Función para hacer scroll suave al footer de contacto
    const handleContactoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const contacto = document.getElementById("contacto");
        if (contacto) {
            contacto.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="w-full flex justify-center items-center py-6 pr-6 bg-black">
            <div className="w-full max-w-6xl flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <img src="/alex-logo.jpg" alt="Logo Campusano.cl" className="h-25 sm:h-40 aspect-square" />
                    </Link>
                </div>
                {/* Navegación principal */}
                <ul className="flex space-x-4 sm:space-x-8 ">
                    <li>
                        <Link href="/proyectos" className="text-gray-100 hover:text-gray-300 font-medium">
                            Proyectos
                        </Link>
                    </li>
                    <li>
                        <Link href="/servicios" className="text-gray-100 hover:text-gray-300 font-medium">
                            Servicios
                        </Link>
                    </li>
                    <li>
                        {/* Link de contacto con scroll suave */}
                            <a href="#contacto" className="text-gray-100 hover:text-gray-300 font-medium">
                                Contacto
                            </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}