import axios from 'axios';
import { API_URL } from '~/shared/constants/environments';

const axiosInstance = axios.create({ baseURL: API_URL });

export default axiosInstance;
