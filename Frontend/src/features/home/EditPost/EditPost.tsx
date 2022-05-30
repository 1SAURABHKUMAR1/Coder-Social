import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { PostNotFound } from '../../index';

import LoaderButton from '../../../Components/Loader/LoaderButton';
import { EditCreatePostFields, setStateNamePost } from '../../index';

import ErrorToast from '../../../Toast/Error';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import { getPost, editPost } from '../../index';

import { SingleTag } from '../../../Types';

const EditPost = () => {
    const [title, setTitle] = useState<string>('');
    const [tagArray, setTagArray] = useState<Array<SingleTag>>([]);
    const [photo, setPhoto] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { postId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userId } = useAppSelector((state) => state.authenticate);
    const { editPostStatus, singlePost } = useAppSelector(
        (state) => state.post,
    );

    useScrollToTop();

    const handleSubmit = () => {
        if (title !== '' && tagArray.length >= 1 && description !== '') {
            const finalTagArray = tagArray.map((tag) => tag.name);
            const finalPhoto = photo.includes('data:image') ? photo : undefined;

            dispatch(
                editPost({
                    title,
                    photo: finalPhoto,
                    description,
                    tags: finalTagArray,
                    postId,
                }),
            );
        } else {
            ErrorToast('Fill All Details');
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(
            getPost({
                controller,
                unMounted,
                // @ts-ignore
                postId,
            }),
        );

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTitle(singlePost.title);
        setDescription(singlePost.description);
        setTagArray(
            singlePost.tags
                ? singlePost.tags?.map((tag: SingleTag) => ({
                      name: tag.name,
                      _id: tag._id,
                  }))
                : [],
        );
        singlePost.image && setPhoto(singlePost.image.secure_url);
    }, [singlePost]);

    useEffect(() => {
        if (editPostStatus === 'FULFILLED') {
            dispatch(
                setStateNamePost({
                    stateName: 'singlePost',
                    stateValue: {},
                }),
            );
            dispatch(
                setStateNamePost({
                    stateName: 'postStatus',
                    stateValue: 'IDLE',
                }),
            );

            setTimeout(() => {
                dispatch(
                    setStateNamePost({
                        stateName: 'editPostStatus',
                        stateValue: 'IDLE',
                    }),
                );
                navigate(`/post/${postId}`);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editPostStatus, postId]);

    return (
        <>
            {singlePost._id ? (
                singlePost.author.user_id === userId ? (
                    <div className="component component-center gap-5">
                        <h1 className="user-info-header-name">Edit Post</h1>
                        <div className="sub-component flex-gap-5">
                            <EditCreatePostFields
                                title={title}
                                setTitle={setTitle}
                                tagArray={tagArray}
                                setTagArray={setTagArray}
                                picture={photo}
                                setPicture={setPhoto}
                                content={description}
                                setContent={setDescription}
                            />
                            <div>
                                {editPostStatus === 'PENDING' ? (
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
