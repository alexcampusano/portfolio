
// Importa las funciones necesarias para definir esquemas en Sanity
import { defineField, defineType } from 'sanity'

// --- Esquema principal para proyectos del portafolio ---
// Define el tipo de documento 'portfolio' que representa un proyecto en Sanity
export const postType = defineType({
	name: 'portfolio', // Nombre interno del tipo
	title: 'Portfolio', // Título visible en el estudio de Sanity
	type: 'document', // Indica que es un documento principal
	fields: [ // Campos que tendrá cada proyecto
		// Título del proyecto (obligatorio)
		defineField({
			name: 'title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		
		// Breve introducción o resumen (obligatorio)
		defineField({
			name: 'intro',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		// Slug para URL amigable, generado desde el título (obligatorio)
		defineField({
			name: 'slug',
			type: 'slug',
			options: { source: 'title' },
			validation: (rule) => rule.required(),
		}),
		// Indica si el proyecto está destacado
		defineField({
			name: 'isFeatured',
			title: '¿Es destacado?',
			type: 'boolean',
			initialValue: false,
			description: 'Marca si este proyecto esdestacado',
		}),
		// Fecha de publicación, por defecto la actual (obligatorio)
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		// Imagen principal del proyecto
		defineField({
			name: 'mainImage',
			type: 'image',
		}),
		// Cuerpo del proyecto, permite bloques de texto enriquecido
		defineField({
			name: 'body',
			type: 'array',
			of: [{ type: 'block' }],
		}),
        // Sobre el cliente: texto libre, igual que body
        defineField({
            name: 'aboutClient',
            title: 'Sobre el cliente',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Información libre sobre el cliente de este proyecto',
        }),
		// Galería de imágenes: permite agregar varias imágenes al proyecto
		defineField({
			name: 'gallery',
			title: 'Galería de imágenes',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true, // Permite recorte focalizado en la imagen
					},
				},
			],
			description: 'Agrega varias imágenes para la galería de este proyecto',
		}),

		// Relación: servicios asociados al proyecto (pueden ser varios)
		defineField({
			name: 'services',
			title: 'Servicios asociados',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'service' }],
				},
			],
			description: 'Selecciona uno o más servicios relacionados con este proyecto',
		}),
		// Indica si el proyecto está disponible para la venta
		defineField({
			name: 'isForSale',
			title: '¿Está a la venta?',
			type: 'boolean',
			initialValue: false,
			description: 'Marca si este proyecto está disponible para la venta',
		}),
	],
})


// --- Esquema para testimonios de clientes ---
// Define el tipo de documento 'testimonial' para almacenar opiniones de clientes
export const testimonialType = defineType({
	name: 'testimonial', // Nombre interno del tipo
	title: 'Testimonial', // Título visible en el estudio de Sanity
	type: 'document', // Documento principal
	fields: [ // Campos del testimonio
		// Nombre del autor del testimonio (obligatorio)
		defineField({
			name: 'author',
			type: 'string',
			title: 'Autor',
			validation: (rule) => rule.required(),
		}),
		// Rol o cargo del autor
		defineField({
			name: 'role',
			type: 'string',
			title: 'Rol o cargo',
		}),
		// Texto del testimonio (obligatorio)
		defineField({
			name: 'testimonial',
			type: 'text',
			title: 'Testimonio',
			validation: (rule) => rule.required(),
		}),
		// Fecha de publicación del testimonio (obligatorio)
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			title: 'Fecha de publicación',
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		// Imagen del autor del testimonio
		defineField({
			name: 'image',
			type: 'image',
			title: 'Imagen del autor',
		}),
		// Relación: referencia al proyecto (portfolio) asociado (obligatorio)
		defineField({
			name: 'portfolio',
			title: 'Portfolio relacionado',
			type: 'reference',
			to: [{ type: 'portfolio' }],
			validation: (rule) => rule.required(),
		}),
	],
})

// --- Esquema principal para servicios ---
// Define el tipo de documento 'servicio' que representa un proyecto en Sanity
export const serviceType = defineType({
	name: 'service', // Nombre interno del tipo
	title: 'Servicios', // Título visible en el estudio de Sanity
	type: 'document', // Indica que es un documento principal
	fields: [ // Campos que tendrá cada proyecto
		// Título del proyecto (obligatorio)
		defineField({
			name: 'title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		// Slug para URL amigable, generado desde el título (obligatorio)
		defineField({
			name: 'slug',
			type: 'slug',
			options: { source: 'title' },
			validation: (rule) => rule.required(),
		}),
		// Imagen principal del servicio
		defineField({
			name: 'mainImage',
			type: 'image',
		}),
		// Cuerpo del proyecto, permite bloques de texto enriquecido
		defineField({
			name: 'body',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		
	],
})