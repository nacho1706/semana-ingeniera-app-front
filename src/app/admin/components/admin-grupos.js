"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"

export default function AdminGrupos({ equipos, getJugadoresByEquipo }) {
  const [showGrupoForm, setShowGrupoForm] = useState(false)
  const [nuevoGrupo, setNuevoGrupo] = useState({ nombre: "" })

  // Obtener grupos únicos
  const gruposUnicos = [...new Set(equipos.map((e) => e.grupo))].sort()

  const handleCrearGrupo = (e) => {
    e.preventDefault()
    alert(`Grupo "${nuevoGrupo.nombre}" creado correctamente`)
    setNuevoGrupo({ nombre: "" })
    setShowGrupoForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestión de Grupos</h2>
        <button
          onClick={() => setShowGrupoForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg flex items-center text-sm"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Nuevo Grupo
        </button>
      </div>

      {/* Formulario para crear grupo */}
      {showGrupoForm && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-bold mb-4">Crear Nuevo Grupo</h3>
          <form onSubmit={handleCrearGrupo}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del grupo</label>
              <input
                type="text"
                value={nuevoGrupo.nombre}
                onChange={(e) => setNuevoGrupo({ ...nuevoGrupo, nombre: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowGrupoForm(false)}
                className="px-4 py-2 border rounded-md text-gray-600"
              >
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de grupos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gruposUnicos.map((grupoId) => (
          <div key={grupoId} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-3">Grupo {grupoId}</h3>
            <ul className="divide-y">
              {equipos
                .filter((e) => e.grupo === grupoId)
                .map((equipo) => (
                  <li key={equipo.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <span>{equipo.nombre}</span>
                      <span className="text-sm text-gray-500">{getJugadoresByEquipo(equipo.id).length} jugadores</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
