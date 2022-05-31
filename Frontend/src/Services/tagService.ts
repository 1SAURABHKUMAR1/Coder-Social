import Axios from './http/axios';

const getTags = (controller: AbortController) =>
    Axios.get('/tags', { signal: controller.signal });

const getSingleTag = (controller: AbortController, tagName: string) =>
    Axios.get(`/tag/${tagName}`, {
        signal: controller.signal,
    });

const followUnfollowTag = (tag_id: string) =>
    Axios.put(`/tag/follow/${tag_id}`);

export { getTags, getSingleTag, followUnfollowTag };
