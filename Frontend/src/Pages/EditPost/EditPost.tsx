import React, { useEffect, useState } from 'react';

import { Navigate, useNavigate, useParams } from 'react-router-dom';

import PostNotFound from '../../Components/PostPage/PostNotFound';
import LoaderButton from '../../Components/Shared/Loader/LoaderButton';
import EditCreatePostFields from '../../Components/EditCreatePost/EditCreatePostFields';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import useScrollToTop from '../../Hooks/useScrollToTop';

import Axios from '../../http/axios';

import { TagProp } from '../../Types';

const EditPost = () => {
    const { postId } = useParams();
    const [isPostValid, setIsPostValid] = useState<boolean>(false);
    const [isAuthEdit, setIsAuthEdit] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [tagArray, setTagArray] = useState<TagProp>([]);
    const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const {
        userAuthState: { userId },
    } = useAuthProvider();

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useScrollToTop();

    const handlePost = async () => {
        try {
            setLoading(true);

            let finalTagArray = tagArray.map((tag) => tag.text);
            const imageChanged = picture.includes('data:image');

            const { data } = await Axios.put(`/post/${postId}`, {
                title,
                photo: imageChanged ? picture : undefined,
                description: content,
                tags: finalTagArray,
            });

            setLoading(false);

            !data.success && ErrorToast('Post Update Failed');
            data.success && SuccessToast('Post Updated!');

            data.success &&
                setTimeout(() => {
                    navigate(`/post/${postId}`);
                }, 1000);
        } catch (error) {
            error.response?.data.message
                ? ErrorToast(error?.response?.data?.message)
                : ErrorToast('Post Update Failed');

            setLoading(false);
            console.log(error);
        }
        setLoading(false);
    };

    const handleSubmit = () => {
        title !== '' && tagArray.length >= 1 && content !== ''
            ? handlePost()
            : ErrorToast('Fill All Details');
    };

    const getPostInfo = async (
        controller: AbortController,
        unMounted: boolean,
    ) => {
        try {
            const { data } = await Axios.get(`/post/${postId}`, {
                signal: controller.signal,
            });

            !data.success && setIsPostValid(false);

            if (!unMounted && data.success) {
                setIsAuthEdit(data.post.author.user_id === userId);

                setTitle(data.post.title);
                setContent(data.post.description);
                setTagArray(
                    data.post.tags.map((tag: any) => ({
                        text: tag.name,
                        id: tag.tag_id,
                    })),
                );
                data.post.image && setPicture(data.post.image.secure_url);
            }

            !unMounted && data.success && setIsPostValid(true);
        } catch (error) {
            console.log(error);

            setIsPostValid(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        getPostInfo(controller, unMounted);

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isPostValid ? (
                isAuthEdit ? (
                    <div className="component component-center gap-5">
                        <h1 className="user-info-header-name">Edit Post</h1>
                        <div className="sub-component flex-gap-5">
                            <EditCreatePostFields
                                title={title}
                                setTitle={setTitle}
                                tagArray={tagArray}
                                setTagArray={setTagArray}
                                picture={picture}
                                setPicture={setPicture}
                                content={content}
                                setContent={setContent}
                            />
                            <div>
                                {loading ? (
                                    <LoaderButton classExtra="button-padding-small" />
                                ) : (
                                    <button
                                        className="button-primary button-padding-small"
                                        onClick={handleSubmit}
                                    >
                                        Publish Post
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Navigate to={'/'} />
                )
            ) : (
                <>
                    <PostNotFound />
                </>
            )}
        </>
    );
};

export default EditPost;
