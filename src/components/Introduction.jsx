
import { Typewriter } from 'react-simple-typewriter';


export const Introduction = () => {
    return (
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">Bienvenido a Matematicas Discretas</h1>

                        <p className="text-lg">
                            Explora y aprende los conceptos clave de la teoría de conjuntos de una manera clara y accesible.
                            Esta plataforma te guiará paso a paso a través de los fundamentos, con ejemplos prácticos
                            que harán que comprender operaciones entre conjuntos sea mucho más sencillo. ¡Empieza tu recorrido ahora!


                            <Typewriter
                                words={[' fácil', ' Sencillo', ' rápido', ' amigable']}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </p>

                        <div className="flex gap-2">
                            <a
                                href="#cortes"
                                className=" animate-bounce inline-flex items-center justify-center rounded-md bg-primary-foreground px-4 py-2 bg-white text-cyan-950 hover:bg-slate-300"
                            >
                                Comenzar
                            </a>

                        </div>

                    </div>
                    <div className="hidden md:block">
                        <img
                            src="/src/assets/diagrama.gif" 
                            width={500}
                            height={500}
                            alt="Animación"
                            className="mx-auto"
                            style={{ aspectRatio: "500/500", objectFit: "cover" }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};
