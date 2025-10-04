	import React from "react";
	// ----------- COMPONENTE NAV -----------
	import Link from "next/link";
	export default function Footer() {
	return (
	<footer id="contacto" className="w-full py-6 mt-12 sm:text-center bg-black text-gray-300 text-sm px-5 border-gray-700">
			<div className="h-[300px] justify-center">
				<h2 className="text-4xl font-light text-white pb-3">Trabajemos Juntos!</h2>
				<p className="text-gray-400 text-xl">
					<a
						href="https://wa.me/56984440464?text=Me%20gustar%C3%ADa%20trabajar%20contigo%20en%20mi%20proyecto%2C%20te%20doy%20algunos%20detalles%3A%20"
						target="_blank"
						rel="noopener noreferrer"
						className="text-neutral-300 hover:text-[#2fb]"
					>
						Envíame un mensaje </a>
						para empezar un proyecto.
				</p>
			</div>
			<div className="w-full flex flex-col sm:flex-row  justify-start sm:justify-between items-left sm:items-center mb-4 max-w-6xl mx-auto">
				<div className="text-left font-light mb-5">
					<h4 className="text-xl text-white">Sígueme</h4>
					<p><Link href="https://www.instagram.com/campusano_cl/" className="text-gray-400 hover:text-gray-200 text-lg">Instagram</Link></p>
					<p><Link href="https://www.behance.net/alexandercampusano" className="text-gray-400 hover:text-gray-200 text-lg">Behance</Link></p>
					<p><Link href="https://dribbble.com/campusano_cl" className="text-gray-400 hover:text-gray-200 text-lg">Dribbble</Link></p>
				</div>
				<div className="text-left sm:text-right font-light mb-5">
					<h4 className="text-xl text-white">Contacto</h4>
					<p><Link href="mailto:alex@campusano.cl" className="text-gray-400 hover:text-gray-200 text-lg">alex@campusano.cl</Link></p>
					<p><Link href="tel:+56984440464" className="text-gray-400 hover:text-gray-200 text-lg">Teléfono</Link></p>
					{/* <p><Link href="#" className="text-gray-400 hover:text-gray-200 text-lg">Dribbble</Link></p> */}
				</div>
			</div>

			{/* © {new Date().getFullYear()} Campusano.cl. Todos los derechos reservados. */}
		</footer>
	);
	}
