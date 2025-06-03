"use client";

import { ArrowLeft, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJugadores } from "../lib/api/jugadores";
import { indexEquipos } from "../lib/api/equipos";

const GoleadoresPage = () => {
  const router = useRouter();

  const [goleadores, setGoleadores] = useState([]);
  const [equipoGoleador, setEquipoGoleador] = useState(null);

  const [teamQuery, setTeamQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  // Nuevo estado para el género: "M" o "F"
  const [gender, setGender] = useState("M");

  useEffect(() => {
    const fetchGoleadores = async () => {
      try {
        // Se pasa el género como parte de los parámetros
        const jugadores = await getJugadores({
          cantidad: 10,
          pagina: 1,
          goleador: 1,
          equipo_goleador: 1,
          genero: gender, // ⬅ aquí
        });
        const equipos = await indexEquipos({ cantidad: 100, pagina: 1 });

        const jugadoresFixed = jugadores.data.map((jugador) => {
          const equipo = equipos.data.find((e) => e.id === jugador.id_equipo);
          return {
            ...jugador,
            equipo: equipo?.nombre || "Desconocido",
          };
        });
        setGoleadores(jugadoresFixed);
        setEquipoGoleador(jugadores.equipo_con_mas_goles);
      } catch (error) {
        console.error("Error al obtener los goleadores:", error);
      }
    };
    fetchGoleadores();
  }, [gender]); // ⬅ volverá a ejecutarse cada vez que cambie gender

  // Cuando cambia el input de búsqueda
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setTeamQuery(value);
    setSelectedTeamId(null);

    if (value.trim().length > 1) {
      try {
        const res = await indexEquipos({
          cantidad: 10,
          pagina: 1,
          nombre: value.trim(),
        });
        setSuggestions(res.data || []);
      } catch (err) {
        console.error("Error al buscar equipos:", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Al seleccionar una sugerencia
  const handleSelect = (equipo) => {
    setTeamQuery(equipo.nombre);
    setSelectedTeamId(equipo.id);
    setSuggestions([]);
  };

  // Al enviar el formulario de búsqueda de equipo
  const handleSearch = (e) => {
    e.preventDefault();
    const id = selectedTeamId || suggestions[0]?.id;
    if (id) {
      router.push(`/goleadores/${id}`);
    } else {
      alert("Selecciona un equipo de la lista");
    }
  };

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
          <h2 className="text-xl font-bold mb-4 text-center">
            Tabla de Goleadores
          </h2>

          {/* Botones para filtrar por género */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setGender("M")}
              className={`px-4 py-2 rounded-md font-medium ${
                gender === "M"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              MASCULINO
            </button>
            <button
              onClick={() => setGender("F")}
              className={`px-4 py-2 rounded-md font-medium ${
                gender === "F"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              FEMENINO
            </button>
          </div>

          {/* Buscador con autocomplete */}
          <form onSubmit={handleSearch} className="relative flex mb-6">
            <input
              type="text"
              value={teamQuery}
              onChange={handleInputChange}
              placeholder="Buscar por nombre de equipo"
              className="border p-2 rounded-l-md flex-grow focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 rounded-r-md hover:bg-orange-600"
            >
              Buscar
            </button>
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border rounded-b-md shadow z-10 max-h-48 overflow-auto">
                {suggestions.map((eq) => (
                  <li
                    key={eq.id}
                    onClick={() => handleSelect(eq)}
                    className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                  >
                    {eq.nombre}
                  </li>
                ))}
              </ul>
            )}
          </form>

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
                  <tr
                    key={jugador.id}
                    className={`border-b ${index < 3 ? "bg-yellow-50" : ""}`}
                  >
                    <td className="p-3">
                      <div className="flex items-center">
                        <span
                          className={`font-bold ${
                            index === 0
                              ? "text-yellow-600"
                              : index === 1
                              ? "text-gray-500"
                              : index === 2
                              ? "text-orange-600"
                              : ""
                          }`}
                        >
                          {index + 1}
                        </span>
                        {index < 3 && (
                          <Trophy
                            size={16}
                            className={`ml-1 ${
                              index === 0
                                ? "text-yellow-500"
                                : index === 1
                                ? "text-gray-400"
                                : "text-orange-500"
                            }`}
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">{jugador.nombre}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center sm:flex-col">
                        <Image
                          className="w-16 h-16 mx-auto sm:h-24"
                          src={`/teams/${jugador.equipo}.svg`}
                          width={64}
                          height={64}
                          alt={`Equipo ${jugador.equipo}`}
                        />
                        <span className="text-sm hidden sm:inline mt-2">
                          {jugador.equipo}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className="font-bold text-lg text-green-600">
                        {jugador.goles}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Estadísticas adicionales */}
          {goleadores.length === 0 ? (
            <p className="text-center text-white text-lg mt-8">
              Cargando goleadores...
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Máximo Goleador */}
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <Trophy className="text-yellow-500 mx-auto mb-2" size={24} />
                <h3 className="font-bold text-lg">Máximo Goleador</h3>
                <p className="text-sm text-gray-600">{goleadores[0].nombre}</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {goleadores[0].goles} goles
                </p>
                <Image
                  className="w-14 h-14 mx-auto sm:h-24 mt-4"
                  src={`/teams/${goleadores[0].equipo}.svg`}
                  width={32}
                  height={32}
                  alt={`Equipo ${goleadores[0].equipo}`}
                />
                <p className="text-sm text-gray-600">{goleadores[0].equipo}</p>
              </div>

              {/* Equipo menos goleado (placeholder, completa tu lógica) */}
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-blue-500 mx-auto mb-2">⚽</div>
                <h3 className="font-bold text-lg">Equipo menos goleado</h3>
                {/* Si quieres mostrar datos, reemplaza lo que está comentado */}
                {/* <p className="text-2xl font-bold text-blue-600"></p>
                <Image
                  className="w-14 h-14 mx-auto sm:h-24 mt-4"
                  src={`/teams/${equipoMenosGoleado.equipo}.svg`}
                  width={32}
                  height={32}
                  alt={`Equipo ${equipoMenosGoleado.equipo}`}
                />
                <p className="text-sm text-gray-600">
                  {equipoMenosGoleado.equipo}
                </p> */}
              </div>

              {/* Equipo más goleador */}
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-green-500 mx-auto mb-2">🎯</div>
                <h3 className="font-bold text-lg">Equipo más goleador</h3>
                <p className="text-2xl font-bold text-green-600">
                  {equipoGoleador?.total_goles || 0} goles
                </p>
                <Image
                  className="w-14 h-14 mx-auto sm:h-24 mt-4"
                  src={`/teams/${
                    equipoGoleador?.nombre_equipo || goleadores[0].equipo
                  }.svg`}
                  width={32}
                  height={32}
                  alt={`Equipo ${equipoGoleador?.nombre_equipo || goleadores[0].equipo}`}
                />
                <p className="text-sm text-gray-600">
                  {equipoGoleador?.nombre_equipo || "Desconocido"}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GoleadoresPage;
