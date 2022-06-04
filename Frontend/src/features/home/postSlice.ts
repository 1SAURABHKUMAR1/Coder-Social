import {
    createAsyncThunk,
    createSlice,
    current,
    PayloadAction,
} from '@reduxjs/toolkit';

import {
    getBookmark as getBookmarkRequest,
    getAllPost as getAllPostRequest,
    getSinglePost as getSinglePostRequest,
    editSignalPost as editSignalPostRequest,
    createPost as createPostRequest,
    postReaction as postReactionRequest,
    createComment as createCommentRequest,
    likeComment as likeCommentRequest,
    editComment as editCommentRequest,
    deleteComment as deleteCommentRequest,
} from '../../Services';
import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import {
    CommentBody,
    commentProps,
    controller,
    createPostProps,
    editCommentProps,
    editPostProps,
    getSinglePost as getSinglePostType,
    PostData,
    postReactionProps,
    PostSliceAction,
    BookmarkSliceAction,
    PostSliceProps,
    ReactionAction,
    CommentAction,
    likeeditCommentReaction,
    deleteCommentAction,
    setStateNamePost as setStateNamePostProps,
} from '../../Types';

const initialState: PostSliceProps = {
    posts: [],
    singlePost: {
        author: {
            name: '',
            profile_photo: {
                id: '',
                secure_url: '',
            },
            username: '',
            _id: '',
            bio: '',
            education: '',
            createdAt: '',
            location: '',
            user_id: '',
            work: '',
        },
        bookmarks: [],
        comments: [],
        createdAt: '',
        description: '',
        image: {
            id: '',
            secure_url: '',
        },
        likes: [],
        post_id: '',
        tags: [],
        title: '',
        unicorns: [],
        _id: '',
    },
    bookmark: [],
    getBookmarkStatus: 'IDLE',
    postStatus: 'IDLE',
    editPostStatus: 'IDLE',
    createPostStatus: 'IDLE',
    reactionStatus: 'IDLE',
    createCommentStatus: 'IDLE',
};

export const getBookmarks = createAsyncThunk(
    'bookmark/getBookmark',
    async ({ controller, unMounted }: controller, { rejectWithValue }) => {
        try {
            const { data } = await getBookmarkRequest(controller);

            if (data.success && !unMounted) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const getAllPosts = createAsyncThunk(
    'post/getAllPost',
    async ({ controller, unMounted }: controller, { rejectWithValue }) => {
        try {
            const { data } = await getAllPostRequest(controller);

            if (data.success && !unMounted) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const editPost = createAsyncThunk(
    'post/editPost',
    async (
        { title, photo, description, tags, postId }: editPostProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await editSignalPostRequest(
                title,
                photo,
                description,
                tags,
                postId,
            );

            if (data.success) {
                SuccessToast('Post Updated!');
                return data;
            } else {
                ErrorToast('Post Update Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast(error?.response?.data?.message ?? 'Post Update Failed');

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const createPost = createAsyncThunk(
    'post/createPost',
    async (
        { title, photo, description, tags, userId }: createPostProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await createPostRequest(
                title,
                photo,
                description,
                tags,
                userId,
            );

            if (data.success) {
                SuccessToast('Post Created!');
                return data;
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast(error?.response?.data?.message ?? 'Failed');

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const getPost = createAsyncThunk(
    'post/getPost',
    async (
        { controller, unMounted, postId }: getSinglePostType,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await getSinglePostRequest(controller, postId);

            if (data.success && !unMounted) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const postReaction = createAsyncThunk(
    'post/reaction',
    async (
        { postId, reactionName, apiName }: postReactionProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await postReactionRequest(postId, apiName);

            if (data.success) {
                return { data, reactionName, postId };
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const createComment = createAsyncThunk(
    'comment/create',
    async (
        { post_id, comment_body, parent_comment_id }: commentProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await createCommentRequest(
                post_id,
                comment_body,
                parent_comment_id,
            );

            if (data.success) {
                return data;
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            ErrorToast('Failed');
            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const likeComment = createAsyncThunk(
    'comment/likeComment',
    async (comment_id: string, { rejectWithValue }) => {
        try {
            const { data } = await likeCommentRequest(comment_id);

            if (data.success) {
                return { data, comment_id };
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            ErrorToast('Failed');
            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const editComment = createAsyncThunk(
    'comment/editComment',
    async (
        { comment_id, comment_body }: editCommentProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await editCommentRequest(comment_id, comment_body);

            if (data.success) {
                SuccessToast('Comment Updated');
                return { data, comment_id };
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            ErrorToast('Failed');
            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (commentId: string, { rejectWithValue }) => {
        try {
            const { data } = await deleteCommentRequest(commentId);

            if (data.success) {
                SuccessToast('Comment Deleted');
                return { data, comment_id: commentId };
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            ErrorToast('Failed');
            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setStateName: (
            state: PostSliceProps,
            action: PayloadAction<setStateNamePostProps>,
        ) => {
            return {
                ...state,
                [action.payload.stateName]: action.payload.stateValue,
            };
        },

        logoutUser: (state: PostSliceProps) => {
            state.bookmark = [];
            state.posts = [];
            state.getBookmarkStatus = 'IDLE';
            state.postStatus = 'IDLE';
            state.editPostStatus = 'IDLE';
            state.createPostStatus = 'IDLE';
            state.reactionStatus = 'IDLE';
            state.createCommentStatus = 'IDLE';
            state.singlePost = {
                author: {
                    name: '',
                    profile_photo: {
                        id: '',
                        secure_url: '',
                    },
                    username: '',
                    _id: '',
                    bio: '',
                    education: '',
                    createdAt: '',
                    location: '',
                    user_id: '',
                    work: '',
                },
                bookmarks: [],
                comments: [],
                createdAt: '',
                description: '',
                image: {
                    id: '',
                    secure_url: '',
                },
                likes: [],
                post_id: '',
                tags: [],
                title: '',
                unicorns: [],
                _id: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBookmarks.pending, (state: PostSliceProps) => {
            return {
                ...state,
                getBookmarkStatus: 'PENDING',
            };
        });

        builder.addCase(
            getBookmarks.fulfilled,
            (state: PostSliceProps, action: PayloadAction<PostData>) => {
                return {
                    ...state,
                    bookmark: [...action.payload.bookmarks],
                    getBookmarkStatus: 'FULFILLED',
                };
            },
        );

        builder.addCase(getBookmarks.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                getBookmarkStatus: 'REJECTED',
            };
        });

        builder.addCase(getAllPosts.pending, (state: PostSliceProps) => {
            return {
                ...state,
                postStatus: 'PENDING',
            };
        });

        builder.addCase(
            getAllPosts.fulfilled,
            (
                state: PostSliceProps,
                action: PayloadAction<BookmarkSliceAction>,
            ) => {
                return {
                    ...state,
                    postStatus: 'FULFILLED',
                    posts: action.payload.post,
                };
            },
        );

        builder.addCase(getAllPosts.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                postStatus: 'REJECTED',
            };
        });

        builder.addCase(editPost.pending, (state: PostSliceProps) => {
            return {
                ...state,
                editPostStatus: 'PENDING',
            };
        });

        builder.addCase(editPost.fulfilled, (state: PostSliceProps) => {
            return {
                ...state,
                editPostStatus: 'FULFILLED',
            };
        });

        builder.addCase(editPost.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                editPostStatus: 'REJECTED',
            };
        });

        builder.addCase(createPost.pending, (state: PostSliceProps) => {
            return {
                ...state,
                createPostStatus: 'PENDING',
            };
        });

        builder.addCase(createPost.fulfilled, (state: PostSliceProps) => {
            return {
                ...state,
                createPostStatus: 'FULFILLED',
            };
        });

        builder.addCase(createPost.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                createPostStatus: 'REJECTED',
            };
        });

        builder.addCase(getPost.pending, (state: PostSliceProps) => {
            return {
                ...state,
                postStatus: 'PENDING',
            };
        });

        builder.addCase(
            getPost.fulfilled,
            (state: PostSliceProps, action: PayloadAction<PostSliceAction>) => {
                return {
                    ...state,
                    postStatus: 'FULFILLED',
                    singlePost: action.payload.post,
                };
            },
        );

        builder.addCase(
            getPost.rejected,
            (state: PostSliceProps, action: PayloadAction<any>) => {
                if (action.payload.message === 'Failed') {
                    return { ...state, postStatus: 'PENDING' };
                }

                return {
                    ...state,
                    postStatus: 'REJECTED',
                };
            },
        );

        builder.addCase(postReaction.pending, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'PENDING',
            };
        });

        builder.addCase(
            postReaction.fulfilled,
            (state: PostSliceProps, action: PayloadAction<ReactionAction>) => {
                const reactionName = action.payload.reactionName;
                const post = action.payload.data.post;
                const postId = action.payload.postId;

                if (reactionName === 'bookmarks') {
                    const bookmarkState = current(state.bookmark);

                    const isValid = bookmarkState.find(
                        (post) => post.post_id === postId,
                    );

                    if (isValid) {
                        state.reactionStatus = 'FULFILLED';
                        state.bookmark = bookmarkState.filter(
                            (post) => post.post_id !== postId,
                        );
                    } else {
                        state.reactionStatus = 'FULFILLED';
                        state.bookmark = [...state.bookmark, post];
                    }
                }

                state.reactionStatus = 'FULFILLED';
                // @ts-ignore
                state.singlePost[reactionName] = post[reactionName];
            },
        );

        builder.addCase(postReaction.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'REJECTED',
            };
        });

        builder.addCase(createComment.pending, (state: PostSliceProps) => {
            return {
                ...state,
                createCommentStatus: 'PENDING',
            };
        });

        builder.addCase(
            createComment.fulfilled,
            (state: PostSliceProps, action: PayloadAction<CommentAction>) => {
                const oldComments = state.singlePost.comments;

                return {
                    ...state,
                    createCommentStatus: 'FULFILLED',
                    singlePost: {
                        ...state.singlePost,
                        comments: [...oldComments, action.payload.comment],
                    },
                };
            },
        );

        builder.addCase(createComment.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                createCommentStatus: 'REJECTED',
            };
        });

        builder.addCase(likeComment.pending, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'PENDING',
            };
        });

        builder.addCase(
            likeComment.fulfilled,
            (
                state: PostSliceProps,
                action: PayloadAction<likeeditCommentReaction>,
            ) => {
                const commentArray = current(state.singlePost.comments);
                const commentIndex = commentArray.findIndex(
                    (comment: CommentBody) =>
                        comment.comment_id === action.payload.comment_id,
                );
                state.reactionStatus = 'FULFILLED';
                state.singlePost.comments[commentIndex].likes =
                    action.payload.data.comment.likes;
            },
        );

        builder.addCase(likeComment.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'REJECTED',
            };
        });

        builder.addCase(editComment.pending, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'PENDING',
            };
        });

        builder.addCase(
            editComment.fulfilled,
            (
                state: PostSliceProps,
                action: PayloadAction<likeeditCommentReaction>,
            ) => {
                const commentArray = current(state.singlePost.comments);
                const commentIndex = commentArray.findIndex(
                    (comment: CommentBody) =>
                        comment.comment_id === action.payload.comment_id,
                );
                state.reactionStatus = 'FULFILLED';
                state.singlePost.comments[commentIndex].body =
                    action.payload.data.comment.body;
            },
        );

        builder.addCase(editComment.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'REJECTED',
            };
        });

        builder.addCase(deleteComment.pending, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'PENDING',
            };
        });

        builder.addCase(
            deleteComment.fulfilled,
            (
                state: PostSliceProps,
                action: PayloadAction<deleteCommentAction>,
            ) => {
                const commentArray = current(state.singlePost.comments);
                const newCommentArray = commentArray.filter(
                    (comment: CommentBody) =>
                        comment.comment_id !== action.payload.comment_id,
                );
                state.reactionStatus = 'FULFILLED';
                state.singlePost.comments = newCommentArray;
            },
        );

        builder.addCase(deleteComment.rejected, (state: PostSliceProps) => {
            return {
                ...state,
                reactionStatus: 'REJECTED',
            };
        });
    },
});

export const postReducer = postSlice.reducer;
export const { setStateName: setStateNamePost, logoutUser: logoutUserPost } =
    postSlice.actions;
