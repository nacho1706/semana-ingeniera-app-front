"use client";

import Image from "next/image";

const PartidoFecha = ({ partido, equipos }) => {
  const equipo1 =
    equipos.find((e) => e.id === partido.equipos[0]) || { nombre: "Desconocido" };
  const equipo2 =
    equipos.find((e) => e.id === partido.equipos[1]) || { nombre: "Desconocido" };

  const fechaFormatted = new Date(partido.fecha).toLocaleString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Separamos goles en dos variables bonit@s
  const [goles1 = "", goles2 = ""] = partido.resultado
    ? partido.resultado.split("-").map((s) => s.trim())
    : ["", ""];

  return (
    <div className="p-3 border rounded-lg text-black bg-white">
      <div className="grid grid-cols-5 items-center gap-2">
        {/* Escudo + nombre equipo1 */}
        <div className="flex items-center">
          <Image
            className="w-16 h-16 sm:h-32"
            src={`/teams/${equipo1.nombre}.svg`}
            width={64}
            height={64}
            alt={`Escudo de ${equipo1.nombre}`}
          />
          <span className="ml-2 font-medium overflow-hidden sm:block">
            {equipo1.nombre}
          </span>
        </div>

        {/* Nombre equipo1 en móvil */}
        <span className="col-start-2 text-left text-sm sm:hidden">
          {equipo1.nombre}
        </span>

        {/* Resultado centrado */}
        <div className="col-start-3 flex justify-center items-center">
          <span className="text-lg sm:text-4xl font-bold">{goles1}</span>
          <span className="mx-2 text-lg sm:text-4xl font-bold text-orange-500">
            –
          </span>
          <span className="text-lg sm:text-4xl font-bold">{goles2}</span>
        </div>

        {/* Nombre equipo2 en móvil */}
        <span className="col-start-4 text-right text-sm mr-1 sm:hidden">
          {equipo2.nombre}
        </span>

        {/* Escudo + nombre equipo2 */}
        <div className="col-start-5 flex items-center justify-end">
          <span className="mr-2 font-medium overflow-hidden sm:block">
            {equipo2.nombre}
          </span>
          <Image
            className="w-16 h-16 sm:h-32"
            src={`/teams/${equipo2.nombre}.svg`}
            width={64}
            height={64}
            alt={`Escudo de ${equipo2.nombre}`}
          />
        </div>

        {/* Fecha y cancha, ocupando todo el ancho */}
        <div className="col-span-5 mt-2 text-center text-sm font-bold text-gray-600">
          📅 {fechaFormatted}
        </div>
        <div className="col-span-5 text-center text-sm font-bold text-gray-600">
          🏟️ Cancha: {partido.cancha}
        </div>
      </div>
    </div>
  );
};

export default PartidoFecha;
