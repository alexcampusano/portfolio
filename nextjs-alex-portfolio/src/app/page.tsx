// ----------- IMPORTACIÓN HERO -----------
import Hero from "./components/hero";
// ----------- IMPORTACIONES -----------
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
// Ya no se usa SiteLayout, el layout global lo gestiona Next.js

// ----------- OPCIONES ISR -----------
// Configuración para revalidación de datos cada 30 segundos
const options = { next: { revalidate: 30 } };

// ----------- CONSULTA GROQ -----------
// Consulta para obtener los 12 portfolios más recientes con los campos necesarios
const POSTS_QUERY = `*[
_type == "portfolio"
&& defined(slug.current)
]|order(publishedAt desc)[0...4]{
	_id,
	title,
	slug,
	intro,
	publishedAt,
	mainImage{asset->{url}}
}`;

// ----------- COMPONENTE PRINCIPAL (HOME) -----------
export default async function IndexPage() {
// Fetch de los posts desde Sanity
const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

// Render principal de la página (contenido específico)
return (
<>
	{/* Hero principal */} 
	<Hero />
	<div className="p-6">
	{/* Título principal */}
	<h2 className="text-2xl font-light mb-8">Proyectos destacados</h2>
	{/* Lista de portfolios */}
	<ul className="grid sm:grid-cols-2 gap-8">
	{posts.map((post) => (
		<li className="hover:text-[#02ffbb] py-8" key={post._id}>
		{/* Enlace al detalle del portfolio */}
		<Link href={`/${post.slug.current}`}> 
			<div className="flex flex-col items-left gap-6">
				{/* Imagen principal si existe */}
				{post.mainImage?.asset?.url && (
					<img
					src={post.mainImage.asset.url}
					alt={post.title}
					className="rounded aspect-video object-cover"
					/>
				)}
				{/* Contenido textual al lado de la imagen */}
				<div>
					<h2 className="text-xl font-regular">{post.title}</h2>
					<p className="text-neutral-500">{post.intro}</p>
					{/* Fecha de publicación en formato largo */}
					{/* <p className="text-sm text-zinc-700">
					{new Date(post.publishedAt).toLocaleDateString('es-ES', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
					</p> */}
				</div>
			</div>
		</Link>
		</li>
	))}
	</ul>
	</div>
</>
);
}