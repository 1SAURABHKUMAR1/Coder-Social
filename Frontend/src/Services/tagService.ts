import Axios from './http/axios';

const getTags = () => Axios.get('');

export { getTags };
