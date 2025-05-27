import Image from "next/image";

const PartidoFecha = ({equipos}) => {
  return (
    <div className="p-3 border rounded-lg text-black">
      <div className="grid grid-cols-5 justify-between items-center">
        <div className="flex items-center">
          <Image
            className="w-16 h-16 mx-auto sm:h-32"
            src="/teams/escudo_test.svg"
            width={64}
            height={64}
            alt={`Equipo 322 del grupo`}
          />
          <span className="ml-2 overflow-hidden not-sm:hidden ">San Socalo</span>
        </div>
        <span className="ml-2 overflow-hidden sm:hidden col-start-2">
          San Socalo
        </span>
        <div className="font-bold col-start-3 flex justify-center align-middle">
          VS
        </div>
        <span className="mr-2 overflow-hidden text-right sm:hidden col-start-4">
          Equipo Negro
        </span>
        <div className="flex items-center col-start-5">
          <span className="mr-2 overflow-hidden text-right not-sm:hidden">
            Equipo Negro
          </span>
          <Image
            className="w-16 h-16 mx-auto sm:h-32"
            src="/teams/escudo_test.svg"
            width={64}
            height={64}
            alt={`Equipo 32 del gru2po`}
          />
        </div>
      </div>
      <div className="text-center text-sm mt-2 font-bold">
        Fecha: 26/05/2025 - 17:30
      </div>
      <div className="text-center text-sm mt-1 font-bold">
        Cancha: 1 
      </div>
    </div>
  );
};

export default PartidoFecha;
