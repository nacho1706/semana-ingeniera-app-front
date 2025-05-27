import api from './axios';

export const indexPartidos = async (params: {
  pagina?: number;
  cantidad?: number;
  equipos?: Array<number>;
  fecha?: Date;
  cancha?: number;
}) => {
  const { data } = await api.get('/partidos/index', { params });
  return data;
};
