import api from './axios';

export const getJugadores = async (params: {
  pagina?: number;
  cantidad?: number;
  goleador?: boolean;
  id_equipo?: number;
  equipo_goleador?: boolean;
}) => {
  const { data } = await api.get('/jugadores/index', { params });
  return data;
};

export const updateJugador = async (params: {
  id: number;
  id_equipo?: number;
  goles?: number;
}) => {
  const { data } = await api.put(`/jugadores/update/${params.id}`, params);
  return data;
};
