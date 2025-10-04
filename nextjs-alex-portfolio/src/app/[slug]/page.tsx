// Importa el componente Testimonial para mostrar testimonios relacionados
import Testimonial from "@/app/components/Testimonial";
// Importa el nuevo componente Gallery para mostrar la galería Masonry
import Gallery from "@/app/components/Gallery";
// --- IMPORTACIONES PRINCIPALES ---
// Importa PortableText para renderizar contenido enriquecido desde Sanity
// Importa SanityDocument para tipar los datos recibidos
import { PortableText, type SanityDocument } from "next-sanity";
// Importa el builder para construir URLs de imágenes almacenadas en Sanity
import imageUrlBuilder from "@sanity/image-url";
// Importa el tipo para fuentes de imágenes de Sanity
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
// Importa el cliente configurado para conectar con Sanity
import { client } from "@/sanity/client";
// Importa Link para navegación interna en Next.js
import Link from "next/link";

// --- CONSULTAS GROQ Y UTILIDADES ---
// Consulta para obtener el proyecto (portfolio) según el slug recibido
const POST_QUERY = `*[_type == "portfolio" && slug.current == $slug][0]`;
// Consulta para obtener el testimonio relacionado con el proyecto
const TESTIMONIAL_QUERY = `*[_type == "testimonial" && references($portfolioId)][0]`;
// Extrae projectId y dataset para construir URLs de imágenes
const { projectId, dataset } = client.config();
// Función para construir la URL de una imagen almacenada en Sanity
const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? imageUrlBuilder({ projectId, dataset }).image(source)
		: null;
// Opciones para revalidación ISR (Incremental Static Regeneration)
const options = { next: { revalidate: 30 } };

// --- COMPONENTE PRINCIPAL DE LA PÁGINA DE PROYECTO ---
// Renderiza la página de detalle de un proyecto según el slug recibido
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	// --- OBTENCIÓN DE DATOS PRINCIPALES ---
	/*
		Obtiene el proyecto desde Sanity usando el slug recibido por parámetro.
		- POST_QUERY es una consulta GROQ que busca el documento 'portfolio' cuyo slug coincide con el parámetro.
		- await params obtiene el objeto { slug } que Next.js pasa dinámicamente según la URL.
		- options activa la revalidación ISR para que los datos se actualicen automáticamente cada 30 segundos.
		El resultado es el objeto 'post' con todos los datos del proyecto solicitado.
	*/
	const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
	// Si el proyecto tiene imagen principal, genera la URL optimizada
	const postImageUrl = post.mainImage
		? urlFor(post.mainImage)?.width(800).height(480).url()
		: null;
	// Obtiene el testimonio relacionado (si existe)
	const testimonial = post._id
		? await client.fetch<SanityDocument>(TESTIMONIAL_QUERY, { portfolioId: post._id }, options)
		: null;

	// --- RENDERIZADO DE LA PÁGINA ---
	return (
		<section className="container mx-auto min-h-screen w-full flex flex-col gap-4">
			<div className="p-6">
				{/* --- Navegación: Enlace para volver al listado de proyectos --- */}
				{/* <Link href="/" className="text-neutral-600 hover:underline ">
					← Back to posts
				</Link> */}

				{/* --- Encabezado del proyecto: título, intro y estado de venta --- */}
				<h1 className="text-6xl font-light mb-4">{post.title}</h1>
				<h3 className="text-xl font-regular text-neutral-300 ">{post.intro}</h3>
				{/* Estado de venta del proyecto, solo si el campo existe */}
				{typeof post.isForSale === 'boolean' && (
					<p className="text-xs mt-2 text-[#02ffbb] uppercase">
						{post.isForSale ? 'Este proyecto está disponible para la venta.' : ''}
					</p>
				)}
			</div>
			
			{/* --- Imagen principal del proyecto --- */}
			{postImageUrl && (
				<img
					src={postImageUrl}
					alt={post.title}
					className="aspect-video sm:rounded-md w-full mb-6"
				/>
			)}
			
			<div className="p-6">
				{/* --- Sobre el cliente: sección nueva --- */}
				{Array.isArray(post.aboutClient) && post.aboutClient.length > 0 && (
					<div className="my-8">
						<h2 className="text-3xl">Sobre el cliente</h2>
						<div className="text-lg text-neutral-300">
							<PortableText value={post.aboutClient} />
						</div>
					</div>
				)}

				{/* --- Cuerpo del proyecto: contenido enriquecido --- */}
				<h2 className="text-3xl">Sobre el proyecto</h2>
				<div className="text-lg text-neutral-300">
					{/* Renderiza el cuerpo del proyecto si existe */}
					{Array.isArray(post.body) && <PortableText value={post.body} />}
				</div>

				{/* --- Testimonio relacionado ---
					Se utiliza el componente Testimonial para mostrar el testimonio asociado al proyecto.
					El componente recibe el objeto testimonial y lo renderiza con imagen, autor y rol. */}
				<Testimonial testimonial={testimonial} />

				{/* --- Galería de imágenes Masonry ---
					Se utiliza el componente Gallery para mostrar las imágenes del proyecto en dos columnas.
					El componente recibe el arreglo de imágenes y el título del proyecto para los alt. */}
					
				<Gallery images={post.gallery} />
			</div>
		</section>
	);
}