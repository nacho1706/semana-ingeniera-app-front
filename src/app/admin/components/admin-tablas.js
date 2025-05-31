import React, { useState, useEffect } from "react";
import Image from "next/image";
import { actualizarPuntos, indexEquipos } from "../../lib/api/equipos";

const AdminTablas = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEquipos = await indexEquipos({
          cantidad: 100,
          pagina: 1,
          puntero: 1,
        });
        setEquipos(responseEquipos.data);
      } catch (error) {
        console.error("Error al obtener los datos del grupo:", error);
      }
    };

    fetchData();
  }, []);

  const handleActualizarPuntajes = async () => {
    try {
      const res = await actualizarPuntos();
      console.log("res: ", res.message);

      if (res.message != "Puntos actualizados correctamente") {
        throw new Error(`HTTP ${res.status}`);
      }
      alert("Resultados actualizados con éxito");
      window.location.reload();

    } catch (err) {
      console.error("Error al actualizar puntajes:", err);
      alert("Hubo un error al actualizar los puntajes");
    }
  };

  return (
    <div className="text-black">
      <div className="flex justify-end py-2 px-4">
        <button
          onClick={handleActualizarPuntajes}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
        >
          Actualizar puntajes
        </button>
      </div>
      <div className="overflow-x-auto sm:flex sm:justify-center sm:px-10">
        <table className="w-full sm:w-200 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left pr-16">Equipo</th>
              <th className="p-2 text-center">PTS</th>
              <th className="p-2 text-center">PJ</th>
              <th className="p-2 text-center">PG</th>
              <th className="p-2 text-center">PE</th>
              <th className="p-2 text-center">PP</th>
              <th className="p-2 text-center">GF</th>
              <th className="p-2 text-center">DG</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo) => (
              <tr key={equipo.id} className="border-b">
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {/* 
                        – w-16 h-16 en móviles 
                        – sm:w-32 sm:h-32 en pantallas >=640px 
                        – width/height props en 64px ayudan a Next.js a optimizar el SVG 
                        – style={{ objectFit: "contain" }} centra y escala sin recorte 
                      */}
                      <div className="relative w-16 h-16 sm:w-32 sm:h-32">
                        <Image
                          src={`/teams/${equipo.nombre}.svg`}
                          alt={`Escudo de ${equipo.nombre}`}
                          fill
                          style={{ objectFit: "contain" }}
                          onError={(e) => {
                            // Si no existe el SVG, carga uno de prueba
                            e.currentTarget.src = "/teams/Equipo A.svg";
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm">{equipo.nombre}</span>
                  </div>
                </td>
                <td className="p-2 text-center font-bold">{equipo.puntos}</td>
                <td className="p-2 text-center">{equipo.PJ}</td>
                <td className="p-2 text-center">{equipo.PG}</td>
                <td className="p-2 text-center">{equipo.PE}</td>
                <td className="p-2 text-center">{equipo.PP}</td>
                <td className="p-2 text-center">{equipo.GF}</td>
                <td className="p-2 text-center">{equipo.DG}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTablas;
