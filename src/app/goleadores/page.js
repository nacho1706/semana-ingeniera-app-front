import { ArrowLeft, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const GoleadoresPage = () => {
    const goleadores = [
        {
            id: 1,
            nombre: "Rafael Alcazar",
            equipo: "SAN SOCALO",
            goles: 12,
        },
        {
            id: 2,
            nombre: "Miguel Santos",
            equipo: "Equipo Rojo",
            goles: 10,
        },
        {
            id: 3,
            nombre: "Diego Martínez",
            equipo: "Equipo Naranja",
            goles: 9,
        },
        {
            id: 4,
            nombre: "Andrés López",
            equipo: "Equipo Negro",
            goles: 8,
        },
        {
            id: 5,
            nombre: "Fernando García",
            equipo: "Equipo Azul",
            goles: 7,
        },
        {
            id: 6,
            nombre: "Roberto Silva",
            equipo: "Equipo Rojo",
            goles: 6,
        },
        {
            id: 7,
            nombre: "Luis Hernández",
            equipo: "Equipo Naranja",
            goles: 5,
        },
        {
            id: 8,
            nombre: "Pablo Morales",
            equipo: "Equipo Negro",
            goles: 4,
        },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#ffaa8d] via-[#ff7f5c] to-[#ff5533] text-black">
            <header className="p-4 flex items-center">
                <Link href="/" className="text-white mr-4">
                    <ArrowLeft size={24} />
                </Link>
                <div className="flex items-center">
                    <Trophy className="text-yellow-300 mr-2" size={28} />
                    <h1 className="text-white text-2xl font-bold">GOLEADORES</h1>
                </div>
            </header>

            <main className="flex-1 p-4">
                <div className="bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold mb-4 text-center">Tabla de Goleadores</h2>

                    {/* Tabla de goleadores */}
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left w-16">Pos</th>
                                    <th className="p-3 text-left w-1/3">Jugador</th>
                                    <th className="p-3 text-center w-1/3">Equipo</th>
                                    <th className="p-3 text-center w-16">Goles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {goleadores.map((jugador, index) => (
                                    <tr key={jugador.id} className={`border-b ${index < 3 ? "bg-yellow-50" : ""}`}>
                                        <td className="p-3">
                                            <div className="flex items-center">
                                                <span
                                                    className={`font-bold ${index === 0 ? "text-yellow-600" : index === 1 ? "text-gray-500" : index === 2 ? "text-orange-600" : ""}`}
                                                >
                                                    {index + 1}
                                                </span>
                                                {index < 3 && (
                                                    <Trophy
                                                        size={16}
                                                        className={`ml-1 ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-orange-500"}`}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <span className="font-medium">{jugador.nombre}</span>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center sm:flex sm:flex-col">
                                                <div className="mr-2 sm:mr-0">
                                                    <Image
                                                        className="w-16 h-16 mx-auto sm:h-24"
                                                        src="/teams/escudo_test.svg"
                                                        width={64}
                                                        height={64}
                                                        alt={`Equipo ${jugador.equipo}`}
                                                    />
                                                </div>
                                                <span className="text-sm hidden sm:inline">{jugador.equipo}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className="font-bold text-lg text-green-600">{jugador.goles}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Estadísticas adicionales */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-yellow-50 p-4 rounded-lg text-center">
                            <Trophy className="text-yellow-500 mx-auto mb-2" size={24} />
                            <h3 className="font-bold text-lg">Máximo Goleador</h3>
                            <p className="text-sm text-gray-600">{goleadores[0].nombre}</p>
                            <p className="text-2xl font-bold text-yellow-600">{goleadores[0].goles} goles</p>
                            <Image
                                className="w-14 h-14 mx-auto sm:h-24 mt-4"
                                src="/teams/escudo_test.svg"
                                width={32}
                                height={32}
                                alt={`Equipo ${goleadores[0].equipo}`}
                            />
                            <p className="text-sm text-gray-600">{goleadores[0].equipo}</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-blue-500 mx-auto mb-2 text-2xl">⚽</div>
                            <h3 className="font-bold text-lg">Total de Goles Torneo</h3>
                            <p className="text-2xl font-bold text-blue-600">100</p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg text-center">
                            <div className="text-green-500 mx-auto mb-2 text-2xl">🎯</div>
                            <h3 className="font-bold text-lg">Equipo más goleador</h3>
                            <div className="sm:pt-11">
                            <Image
                                className="w-14 h-14 mx-auto sm:h-24 mt-4"
                                src="/teams/escudo_test.svg"
                                width={32}
                                height={32}
                                alt={`Equipo ${goleadores[0].equipo}`}
                            />
                            <p className="text-sm text-gray-600">{goleadores[0].equipo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


export default GoleadoresPage;