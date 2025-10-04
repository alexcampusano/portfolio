
// ----------- IMPORTACIONES -----------
// Importa el componente Link para navegación interna en Next.js
import Link from "next/link";
// Importa el tipo SanityDocument para tipar los datos que vienen de Sanity
import { type SanityDocument } from "next-sanity";
// Importa el cliente de Sanity para hacer consultas a la base de datos
import { client } from "@/sanity/client";
// Nota: El layout global lo gestiona Next.js automáticamente

// ----------- OPCIONES ISR -----------
// Configuración para revalidación de datos cada 30 segundos (Incremental Static Regeneration)
// Esto permite que la página se actualice automáticamente cada 30 segundos con los nuevos datos de Sanity
const options = { next: { revalidate: 30 } };

// ----------- CONSULTA GROQ -----------
// Consulta GROQ para obtener los 10 proyectos más recientes del tipo 'portfolio'.
// Incluye los campos principales y expande los servicios asociados (relación con el tipo 'service').
const POSTS_QUERY = `*[
  _type == "portfolio"
  && defined(slug.current)
]|order(title asc){
    _id,
    title,
	isFeatured,
    slug,
    intro,
    publishedAt,
    mainImage{asset->{url}},
    services[]->{
      _id,
      title,
      slug
    }
  }
`;
// ----------- PÁGINA DE PROYECTOS -----------

// Componente principal de la página de proyectos
// Es asíncrono porque obtiene los datos de Sanity antes de renderizar
export default async function ProyectosPage() {
	// Obtiene los proyectos desde Sanity usando la consulta definida arriba
	const posts: SanityDocument[] = await client.fetch(POSTS_QUERY, {}, options);

	return (
		<section className="min-h-[60vh] flex flex-col justify-center p-6">
			{/* Título principal de la sección */}
			<h2 className="text-3xl font-light text-[#22ffbb]">Proyectos destacados</h2>
			{/* Descripción introductoria */}
			<p className="text-left mb-8 text-neutral-400">
				Ayudo a startups, pymes y personas a diferenciarse de su competencia e impulsar la innovación a través del diseño.
			</p>
			{/* Lista de proyectos obtenidos dinámicamente */}
			<ul className="grid sm:grid-cols-2 gap-8">
				{posts.map((post) => (
					<li
						className="hover:text-[#22ffbb] py-8"
						key={post._id}
					>
						<Link href={`/${post.slug.current}`}>
							<div className="flex flex-col items-left gap-6">
								{post.mainImage?.asset?.url && (
									<img
										src={post.mainImage.asset.url}
										alt={post.title}
										className="rounded sm:aspect-video aspect-square object-cover"
									/>
								)}
								<div>
									<h2 className="text-xl font-regular">{post.title}</h2>
									<p className="text-neutral-500">{post.intro}</p>
									{Array.isArray(post.services) && post.services.length > 0 && (
										<div className="text-neutral-500 flex flex-wrap gap-2 mt-5 ">
											{post.services.map((service, idx) => (
												<span key={service._id} className="px-2 py-1 rounded-full bg-zinc-900 text-zinc-400 text-xs">
													{service.title}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
