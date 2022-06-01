import Axios from './http/axios';

const searchPost = (controller: AbortController, searchParam: string) =>
    Axios.get(`/post/filter?search=${searchParam}`);

export { searchPost };
