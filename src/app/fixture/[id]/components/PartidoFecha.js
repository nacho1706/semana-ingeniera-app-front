import Image from "next/image";

const PartidoFecha = ({ partido, equipos }) => {
  const equipo1 = equipos.find((equipo) => equipo.id === partido.equipos[0]) || {
    nombre: "Desconocido",
  };
  const equipo2 = equipos.find((equipo) => equipo.id === partido.equipos[1]) || {
    nombre: "Desconocido",
  };

  const fechaFormatted = new Date(partido.fecha).toLocaleString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="p-3 border rounded-lg text-black">
      <div className="grid grid-cols-5 justify-between items-center">
        <div className="flex items-center">
          <Image
            className="w-16 h-16 mx-auto sm:h-32"
            src={`/teams/${equipo1.nombre}.svg` || "/teams/escudo_test.svg"}
            width={64}
            height={64}
            alt={`Escudo de ${equipo1.nombre}`}
          />
          <span className="ml-2 overflow-hidden not-sm:hidden">{equipo1.nombre}</span>
        </div>
        <span className="ml-2 overflow-hidden sm:hidden col-start-2">{equipo1.nombre}</span>
        <div className="font-bold col-start-3 flex justify-center align-middle">VS</div>
        <span className="mr-2 overflow-hidden text-right sm:hidden col-start-4">{equipo2.nombre}</span>
        <div className="flex items-center col-start-5">
          <span className="mr-2 overflow-hidden text-right not-sm:hidden">{equipo2.nombre}</span>
          <Image
            className="w-16 h-16 mx-auto sm:h-32"
            src={`/teams/${equipo2.nombre}.svg` || "/teams/escudo_test.svg"}
            width={64}
            height={64}
            alt={`Escudo de ${equipo2.nombre}`}
          />
        </div>
      </div>
      <div className="text-center text-sm mt-2 font-bold">
        Fecha: {fechaFormatted}
      </div>
      <div className="text-center text-sm mt-1 font-bold">
        Cancha: {partido.cancha}
      </div>
    </div>
  );
};

export default PartidoFecha;