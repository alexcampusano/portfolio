// ----------- COMPONENTE HERO -----------
// Sección principal con título y mensaje destacado
export default function Hero() {
    return (
        <section className="flex flex-col justify-start sm:h-[20vh] h-50vh mb-32 px-8">
            <h1 className="text-4xl sm:text-6xl font-light text-left mb-6 text-white sm:pr-64">Mas de 20 años creando identidades de marca e interfaces digitales</h1>
            <p>Con un diseño claro y estratégico que impulsa un <strong>impacto real en los negocios.</strong></p>
        </section>
    );
}
