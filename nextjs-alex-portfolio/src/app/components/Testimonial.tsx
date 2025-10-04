// --- Componente Testimonial ---
// Este componente muestra el testimonio relacionado a un proyecto.
// Recibe el objeto testimonial y lo renderiza con imagen, autor y rol.

import type { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

// Helper para construir la URL de la imagen desde Sanity
const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// El prop testimonial puede ser un objeto o null
interface TestimonialProps {
  testimonial: SanityDocument | null;
}

export default function Testimonial({ testimonial }: TestimonialProps) {
  // Si no hay testimonio, no renderiza nada
  if (!testimonial) return null;

  return (
    <section className="mt-8 sm:px-16 sm:py-12 p-6 rounded-xl bg-neutral-900">
      {/* Título del bloque de testimonio */}
      <h3 className="text-lg font-regular mb-2">Testimonio</h3>
      {/* Texto del testimonio */}
      <blockquote className="text-serif text-neutral-300 mb-5">{testimonial.testimonial}</blockquote>
      {/* Autor y rol del testimonio */}
      <div className="mt-2 flex items-center gap-2">
        {/* Imagen del autor si existe */}
        {testimonial.image && (
          <img
            src={urlFor(testimonial.image)?.width(48).height(48).url()}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <span className="font-semibold">{testimonial.author}</span><br />
          {testimonial.role && <span className="ml-2 text-sm text-neutral-500">{testimonial.role}</span>}
        </div>
      </div>
    </section>
  );
}
