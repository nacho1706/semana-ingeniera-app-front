"use client";

import { useState, useEffect, useRef } from "react";
import { updateJugador } from "../../lib/api/jugadores";
import { indexEquipos } from "../../lib/api/equipos";
import { getJugadores } from "../../lib/api/jugadores";

export default function ModalResultado({
  partido,
  onCerrar,
  onActualizarPartido,
  onFinalizarPartido,
}) {
  const [equipos, setEquipos] = useState([]);
  const [jugadoresLocal, setJugadoresLocal] = useState([]);
  const [jugadoresVisitante, setJugadoresVisitante] = useState([]);
  const [golesNuevos, setGolesNuevos] = useState({});
  const [activeTeamTab, setActiveTeamTab] = useState("local");
  const yaInicializado = useRef(false);

  const [golesPartido, setGolesPartido] = useState({ local: 0, visitante: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equiposResponse = await indexEquipos({
          cantidad: 2,
          pagina: 1,
          id: partido.equipos,
        });
        const equipo1 = equiposResponse.data[0];
        const equipo2 = equiposResponse.data[1];

        const jugadoresResponse1 = await getJugadores({
          cantidad: 100,
          pagina: 1,
          id_equipo: equipo1.id,
        });
        const jugadoresResponse2 = await getJugadores({
          cantidad: 100,
          pagina: 1,
          id_equipo: equipo2.id,
        });

        setEquipos([equipo1, equipo2]);
        setJugadoresLocal(jugadoresResponse1.data || []);
        setJugadoresVisitante(jugadoresResponse2.data || []);

        if (!yaInicializado.current) {
          const [gLocal, gVisitante] = (partido.resultado || "0-0")
            .split("-")
            .map(Number);
          setGolesPartido({ local: gLocal || 0, visitante: gVisitante || 0 });
          yaInicializado.current = true;
        }
      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };

    fetchData();
  }, [partido]);

  const incrementarGol = (jugador) => {
    setGolesNuevos((prev) => {
      const nuevoValor = (prev[jugador.id] || 0) + 1;
      return { ...prev, [jugador.id]: nuevoValor };
    });
    actualizarMarcador(jugador.id_equipo, 1);
  };

  const restarGol = (jugador) => {
    setGolesNuevos((prev) => {
      const actuales = prev[jugador.id] || 0;
      if (actuales > 0) {
        actualizarMarcador(jugador.id_equipo, -1);
        return { ...prev, [jugador.id]: actuales - 1 };
      }
      return prev;
    });
  };

  const actualizarMarcador = (id_equipo, valor) => {
    setGolesPartido((prev) => {
      if (id_equipo === equipos[0]?.id) {
        return { ...prev, local: Math.max(0, prev.local + valor) };
      } else if (id_equipo === equipos[1]?.id) {
        return { ...prev, visitante: Math.max(0, prev.visitante + valor) };
      }
      return prev;
    });
  };

  const confirmarCambios = async () => {
    const todosJugadores = [...jugadoresLocal, ...jugadoresVisitante];

    for (const jugador of todosJugadores) {
      const nuevos = golesNuevos[jugador.id] || 0;
      if (nuevos > 0) {
        try {
          await updateJugador({ id: jugador.id, goles: nuevos });
        } catch (err) {
          console.error("Error actualizando goles", err);
        }
      }
    }

    try {
      const resultadoFinal = `${golesPartido.local}-${golesPartido.visitante}`;
      await onFinalizarPartido(partido.id, resultadoFinal);

      window.dispatchEvent(
        new CustomEvent("partidoActualizado", { detail: "actualizarPartidos" })
      );
    } catch (err) {
      console.error("Error al finalizar partido", err);
    }

    onActualizarPartido();
    onCerrar();
  };

  const renderJugadores = (jugadores) => (
    <div className="mt-4">
      <h5 className="font-medium mb-2">
        Jugadores de{" "}
        {equipos.find((e) => e.id === jugadores[0]?.id_equipo)?.nombre}
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {jugadores.map((jugador) => {
          const nuevos = golesNuevos[jugador.id] || 0;

          return (
            <div
              key={jugador.id}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <span>{jugador.nombre}</span>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {nuevos} {nuevos === 1 ? "gol" : "goles"}
                </span>
                <button
                  type="button"
                  onClick={() => incrementarGol(jugador)}
                  className="bg-green-500 hover:bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                >
                  +
                </button>
                {nuevos > 0 && (
                  <button
                    type="button"
                    onClick={() => restarGol(jugador)}
                    className="bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          type="button"
          onClick={onCerrar}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="flex flex-col items-center mr-4">
            <span className="font-semibold text-sm sm:text-base">
              {equipos[0]?.nombre}
            </span>
          </div>

          <div className="text-2xl font-bold">
            {golesPartido.local} - {golesPartido.visitante}
          </div>

          <div className="flex flex-col items-center ml-4">
            <span className="font-semibold text-sm sm:text-base">
              {equipos[1]?.nombre}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex border-b">
            <button
              type="button"
              className={`px-4 py-2 ${
                activeTeamTab === "local"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTeamTab("local")}
            >
              {equipos[0]?.nombre || "Local"}
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${
                activeTeamTab === "visitante"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTeamTab("visitante")}
            >
              {equipos[1]?.nombre || "Visitante"}
            </button>
          </div>

          {activeTeamTab === "local" && renderJugadores(jugadoresLocal)}
          {activeTeamTab === "visitante" && renderJugadores(jugadoresVisitante)}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={confirmarCambios}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
