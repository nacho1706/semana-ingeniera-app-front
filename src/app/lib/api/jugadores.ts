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
