// ----------- IMPORTACIONES -----------
// Importa el componente PortableText y el tipo SanityDocument desde next-sanity
import { PortableText, type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
// Ya no se usa SiteLayout, el layout global lo gestiona Next.js

// ----------- OPCIONES ISR -----------
// Configuración para revalidación de datos cada 30 segundos
const options = { next: { revalidate: 30 } };

// ----------- CONSULTA GROQ -----------
// Consulta para obtener todos los servicios con sus datos principales
const SERVICES_QUERY = `*[_type == "service" && defined(slug.current)]|order(publishedAt desc)[0...10]{
	_id,
	title,
	slug,
	body,
	mainImage{asset->{url}}
}`;


// ----------- COMPONENTE PRINCIPAL (SERVICIOS) -----------

// ----------- COMPONENTE PRINCIPAL (SERVICIOS) -----------
// Componente asíncrono que obtiene y muestra los servicios desde Sanity

// ----------- COMPONENTE PRINCIPAL (SERVICIOS) -----------
// Este componente obtiene los servicios y los proyectos desde Sanity, y muestra los proyectos relacionados agrupados por servicio

export default async function ServiciosPage() {
	// Obtiene los servicios desde Sanity usando la consulta GROQ
	const services: SanityDocument[] = await client.fetch(SERVICES_QUERY, {}, options);
	return (
		<div className="p-6">
			{/* Título principal de la página de servicios */}
			<h2 className="text-3xl font-light text-[#2fb]">Servicios</h2>
			<p className="text-left mb-8 text-neutral-400">
				Ayudo a startups, pymes y personas a diferenciarse de su competencia e impulsar la innovación a través del diseño.
			</p>
			{/* Lista de servicios obtenidos dinámicamente */}
			<ul className="flex flex-col gap-y-12">
				{services.map((service) => (
					<li className="py-8" key={service._id}>
						{/* Bloque principal de cada servicio */}
						<div className="flex flex-col items-left gap-6">
							<div className="flex flex-col sm:flex-row">
								{/* Título del servicio */}
								<h2 className="sm:w-2/5 text-5xl font-light sm:mb-0 mb-4">{service.title}</h2>
								<div className="sm:w-3/5 sm:pl-24 flex flex-col">
									{/* Cuerpo del servicio usando PortableText */}
										{/* Si el servicio tiene imagen principal, se muestra aquí */}
										{service.mainImage?.asset?.url && (
											<img
												src={service.mainImage.asset.url}
												alt={service.title}
												className="aspect-video object-cover sm:rounded-md w-full mb-6"
											/>
										)}
									<div className="text-neutral-300">
										
										{Array.isArray(service.body) && <PortableText value={service.body} />}
									</div>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
