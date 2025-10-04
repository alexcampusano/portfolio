// --- Componente Gallery ---
// Este componente muestra una galería de imágenes en formato Masonry de dos columnas usando Tailwind CSS.
// Recibe un arreglo de imágenes y las renderiza optimizadas.

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

// Helper para construir la URL de la imagen desde Sanity
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Props del componente Gallery
interface GalleryProps {
  images: any[];
  title?: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  // Si no hay imágenes, no renderiza nada
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <section className="mt-8">
      {/* Contenedor Masonry con dos columnas y separación entre imágenes */}
      <div className="sm:columns-2 gap-4 [column-fill:_balance]">
        {images.map((img, idx) => (
          img && (
            <img
              key={img._key || idx}
              src={urlFor(img)?.width(500).fit('crop').url()}
              alt={title ? `${title} imagen ${idx + 1}` : `Imagen ${idx + 1}`}
              className="rounded-lg object-cover w-full mb-4 break-inside-avoid"
            />
          )
        ))}
      </div>
    </section>
  );
}
