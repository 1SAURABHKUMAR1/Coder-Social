import Axios from './http/axios';

const getAllPost = (controller: AbortController) =>
    Axios.get('/post', {
        signal: controller.signal,
    });

const getSinglePost = (controller: AbortController, postId: string) =>
    Axios.get(`/post/${postId}`, {
        signal: controller.signal,
    });

const editSignalPost = (
    title: string,
    photo: string | undefined,
    description: string,
    tags: string[],
    postId: string | undefined,
) =>
    Axios.put(`/post/${postId}`, {
        title,
        photo,
        description,
        tags,
    });

const createPost = (
    title: string,
    photo: string | undefined,
    description: string,
    tags: string[],
    userId: string | undefined,
) =>
    Axios.post('/post/create', {
        title,
        photo: photo !== '' ? photo : undefined,
        description,
        tags,
        userId,
    });

const postReaction = (postId: string, reactionName: string) =>
    Axios.put(`/post/${postId}/${reactionName}`);

const createComment = (
    post_id: string,
    comment_body: string,
    parent_comment_id?: string,
) =>
    Axios.post('/comment/create', {
        post_id,
        comment_body,
        parent_comment_id,
    });

const likeComment = (comment_id: string) =>
    Axios.put(`/comment/${comment_id}/like`);

const editComment = (comment_id: string, comment_body: string) =>
    Axios.post(`/comment/edit`, {
        comment_body,
        comment_id,
    });

const deleteComment = (commentId: string) =>
    Axios.delete(`/comment/${commentId}`);

export {
    getAllPost,
    getSinglePost,
    editSignalPost,
    createPost,
    postReaction,
    createComment,
    likeComment,
    editComment,
    deleteComment,
};
