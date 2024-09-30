import { FaCalculator, FaCog, FaDatabase } from 'react-icons/fa';

export const SetTheoryOverview = () => {
    return (
        <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-12 md:py-24 rounded-lg shadow-xl px-6 md:px-12">
            <h2 className="text-3xl font-extrabold mb-6 text-white text-center tracking-tight">
                <FaCalculator className="inline mr-2" /> Teoría de Conjuntos
            </h2>
            
            <p className="text-gray-200 mb-6 text-lg leading-relaxed text-center">
                La teoría de conjuntos es una rama de las matemáticas que estudia la agrupación de objetos, llamados conjuntos. Es la base para diversas áreas matemáticas, como la lógica, el álgebra y la probabilidad.
            </p>

            <div className="md:flex md:justify-between md:space-x-8">
                <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">
                        <FaCog className="inline mr-2" /> Operaciones Principales
                    </h3>
                    <ul className="list-disc list-inside text-gray-200 space-y-2 text-lg">
                        <li><strong>Unión ( ∪ )</strong>: Combina todos los elementos de dos o más conjuntos.</li>
                        <li><strong>Intersección ( ∩ )</strong>: Encuentra los elementos que son comunes a los conjuntos.</li>
                        <li><strong>Diferencia ( A - B )</strong>: Elementos que están en el conjunto A, pero no en B.</li>
                        <li><strong>Complemento</strong>: Todos los elementos que no están en el conjunto.</li>
                    </ul>
                </div>

                <div className="md:w-1/2 mt-8 md:mt-0">
                    <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">
                        <FaDatabase className="inline mr-2" /> Aplicaciones
                    </h3>
                    <p className="text-gray-200 text-lg leading-relaxed">
                        La teoría de conjuntos tiene aplicaciones en lógica matemática, bases de datos, programación y la definición de conceptos como relaciones y funciones. Es fundamental para comprender cómo se estructuran los sistemas y algoritmos en ciencias de la computación.
                    </p>
                </div>
            </div>
        </section>
    );
};
