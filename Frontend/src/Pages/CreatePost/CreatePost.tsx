import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import EditCreatePostFields from '../../Components/EditCreatePost/EditCreatePostFields';
import LoaderButton from '../../Components/Shared/Loader/LoaderButton';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import Axios from '../../http/axios';

import { TagProp } from '../../Types';

const CreatePost = () => {
    const [title, setTitle] = useState<string>('');
    const [tagArray, setTagArray] = useState<TagProp>([]);
    const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { userAuthState } = useAuthProvider();
    const navigate = useNavigate();

    const handlePost = async () => {
        try {
            setLoading(true);

            let finalTagArray = tagArray.map((tag) => tag.text);

            const { data } = await Axios.post('/post/create', {
                title,
                photo: picture !== '' ? picture : undefined,
                body: content,
                tags: finalTagArray,
                userId: userAuthState.userId,
            });

            setLoading(false);

            !data.success && ErrorToast('Post Publish Failed');
            data.success && SuccessToast('Post Published!');

            setTimeout(() => {
                navigate(`/post/${data.post.post_id}`);
            }, 1000);
        } catch (error) {
            error.response?.data.message
                ? ErrorToast(error?.response?.data?.message)
                : ErrorToast('Post Publish Failed');

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

    return (
        <>
            <div className="component component-center gap-5">
                <h1 className="user-info-header-name">Create Post</h1>
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
        </>
    );
};

export default CreatePost;
