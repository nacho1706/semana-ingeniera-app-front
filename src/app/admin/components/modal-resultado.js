"use client";

import { useState, useEffect, useRef } from "react";
import { updateJugador } from "../../lib/api/jugadores";
import { indexEquipos } from "../../lib/api/equipos";
import { getJugadores } from "../../lib/api/jugadores";

export default function ModalResultado({
  partido,
  onCerrar,
  onActualizarPartido,
  onFinalizarPartido, // (id, resultado) => Promise que hace updatePartido y pone estado JUGADO
}) {
  const [equipos, setEquipos] = useState([]);
  const [jugadoresLocal, setJugadoresLocal] = useState([]);
  const [jugadoresVisitante, setJugadoresVisitante] = useState([]);
  const [golesNuevos, setGolesNuevos] = useState({}); // { jugadorId: cantidadIncrementada, ... }
  const [golesPartido, setGolesPartido] = useState({ local: 0, visitante: 0 });
  const [activeTeamTab, setActiveTeamTab] = useState("local");
  const yaInicializado = useRef(false);

  // 1) Cargo datos de ambos equipos y sus jugadores
  useEffect(() => {
    const fetchData = async () => {
      try {
        // “partido.equipos” es un array [idEquipoLocal, idEquipoVisitante]
        const equiposResponse = await indexEquipos({
          cantidad: 2,
          pagina: 1,
          id: partido.equipos,
        });

        // Normalizo el orden según el array original “partido.equipos”
        const todos = equiposResponse.data || [];
        const equipoLocal = todos.find((e) => e.id === partido.equipos[0]);
        const equipoVisitante = todos.find((e) => e.id === partido.equipos[1]);
        setEquipos([equipoLocal, equipoVisitante]);

        // Cargo jugadores de cada equipo
        const jugadoresResponse1 = await getJugadores({
          cantidad: 100,
          pagina: 1,
          id_equipo: equipoLocal.id,
        });
        const jugadoresResponse2 = await getJugadores({
          cantidad: 100,
          pagina: 1,
          id_equipo: equipoVisitante.id,
        });

        setJugadoresLocal(jugadoresResponse1.data || []);
        setJugadoresVisitante(jugadoresResponse2.data || []);

        // Inicializo “golesPartido” una sola vez, a partir de partido.resultado (“2-1”, “0-0”, etc.)
        if (!yaInicializado.current) {
          const [gLocal, gVisitante] = (partido.resultado || "0-0")
            .split("-")
            .map((n) => parseInt(n, 10));
          setGolesPartido({
            local: isNaN(gLocal) ? 0 : gLocal,
            visitante: isNaN(gVisitante) ? 0 : gVisitante,
          });
          yaInicializado.current = true;
        }
      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };

    fetchData();
  }, [partido]);

  // 2) Función para incrementar goles a un jugador (mantiene la lógica original)
  const incrementarGol = (jugador) => {
    setGolesNuevos((prev) => {
      const nuevoValor = (prev[jugador.id] || 0) + 1;
      return { ...prev, [jugador.id]: nuevoValor };
    });
    // A su vez, incrementamos el marcador global:
    setGolesPartido((prev) => ({
      ...prev,
      local:
        jugador.id_equipo === equipos[0]?.id
          ? prev.local + 1
          : prev.local,
      visitante:
        jugador.id_equipo === equipos[1]?.id
          ? prev.visitante + 1
          : prev.visitante,
    }));
  };

  // 3) Función para restar goles a un jugador (mantiene la lógica original)
  const restarGol = (jugador) => {
    setGolesNuevos((prev) => {
      const actuales = prev[jugador.id] || 0;
      if (actuales > 0) {
        // También decrementamos el marcador global, sin pasar de 0
        setGolesPartido((gPrev) => ({
          local:
            jugador.id_equipo === equipos[0]?.id
              ? Math.max(0, gPrev.local - 1)
              : gPrev.local,
          visitante:
            jugador.id_equipo === equipos[1]?.id
              ? Math.max(0, gPrev.visitante - 1)
              : gPrev.visitante,
        }));
        return { ...prev, [jugador.id]: actuales - 1 };
      }
      return prev;
    });
  };

  // 4) Funciones para editar manualmente el marcador (NUEVO)
  const onChangeGolesLocal = (e) => {
    const nuevo = parseInt(e.target.value, 10);
    setGolesPartido((prev) => ({
      ...prev,
      local: isNaN(nuevo) || nuevo < 0 ? 0 : nuevo,
    }));
    // No tocamos “golesNuevos”: si modificás manualmente,
    // cuando confirmes no se actualizarán goles de jugadores (a menos que ya hubieras hecho +/−).
  };

  const onChangeGolesVisitante = (e) => {
    const nuevo = parseInt(e.target.value, 10);
    setGolesPartido((prev) => ({
      ...prev,
      visitante: isNaN(nuevo) || nuevo < 0 ? 0 : nuevo,
    }));
  };

  // 5) Confirmar cambios: actualiza jugadores (solo si golesNuevos>0) y luego hace updatePartido
  const confirmarCambios = async () => {
    // 5.1) Actualizar goles de cada jugador incrementado
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

    // 5.2) Armo el string final “X-Y” según golesPartido
    const resultadoFinal = `${golesPartido.local}-${golesPartido.visitante}`;

    try {
      // 5.3) Llamo a la función que me pasaron desde el padre para hacer “updatePartido”
      await onFinalizarPartido(partido.id, resultadoFinal);

      // 5.4) Le aviso al padre que refresque la lista de partidos
      await onActualizarPartido();
    } catch (err) {
      console.error("Error al finalizar partido", err);
    }

    // 5.5) Cierro el modal
    onCerrar();
  };

  // 6) Renderizado de la lista de jugadores (idéntico a antes)
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
                    −
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
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onCerrar}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* ========================
            1) Sección de edición directa de marcador
           ======================== */}
        <div className="flex items-center justify-center mb-6 space-x-8">
          {/* Equipo Local + Input */}
          <div className="flex flex-col items-center">
            <span className="font-semibold text-sm sm:text-base mb-1">
              {equipos[0]?.nombre || "Local"}
            </span>
            <input
              type="number"
              min="0"
              value={golesPartido.local}
              onChange={onChangeGolesLocal}
              className="w-20 p-2 text-center border rounded-md"
            />
          </div>

          <span className="text-2xl font-bold">-</span>

          {/* Equipo Visitante + Input */}
          <div className="flex flex-col items-center">
            <span className="font-semibold text-sm sm:text-base mb-1">
              {equipos[1]?.nombre || "Visitante"}
            </span>
            <input
              type="number"
              min="0"
              value={golesPartido.visitante}
              onChange={onChangeGolesVisitante}
              className="w-20 p-2 text-center border rounded-md"
            />
          </div>
        </div>

        {/* ========================
            2) Muestra el marcador actual (por si querés verlo aparte)
           ======================== */}
        <div className="flex items-center justify-center mb-4">
          <div className="text-2xl font-bold">
            {golesPartido.local} - {golesPartido.visitante}
          </div>
        </div>

        {/* ========================
            3) Pestañas “Local” / “Visitante” para la lógica de jugadores
           ======================== */}
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

        {/* ========================
            4) Botones “Cancelar” / “Confirmar”
           ======================== */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCerrar}
            className="px-4 py-2 border rounded-md text-black"
          >
            Cancelar
          </button>
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
