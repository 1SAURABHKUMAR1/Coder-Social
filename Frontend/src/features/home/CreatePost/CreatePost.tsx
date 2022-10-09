import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';

import { EditCreatePostFields } from '../../index';
import LoaderButton from '../../../Components/Loader/LoaderButton';

import { createPost, setStateNamePost } from '../../index';

import ErrorToast from '../../../Toast/Error';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import { TagProp } from '../../../Types';

const CreatePost = () => {
    const [title, setTitle] = useState<string>('');
    const [tagArray, setTagArray] = useState<TagProp>([]);
    const [photo, setPhoto] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { userId } = useAppSelector((state) => state.authenticate);
    const { createPostStatus } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useScrollToTop();

    const handleSubmit = () => {
        if (title !== '' && tagArray.length >= 1 && description !== '') {
            const finalTagArray = tagArray.map((tag) => tag.name);
            const finalPhoto = photo !== '' ? photo : undefined;

            dispatch(
                createPost({
                    title,
                    photo: finalPhoto,
                    description,
                    tags: finalTagArray,
                    userId,
                }),
            );
        } else {
            ErrorToast('Fill All Details');
        }
    };

    useEffect(() => {
        if (createPostStatus === 'FULFILLED') {
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

            dispatch(
                setStateNamePost({
                    stateName: 'createPostStatus',
                    stateValue: 'IDLE',
                }),
            );

            setTimeout(() => {
                navigate(`/`);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createPostStatus]);

    return (
        <>
            <div className="component component-center gap-5">
                <h1 className="user-info-header-name">Create Post</h1>
                <div
                    className="sub-component flex-gap-5"
                    data-testid="create-post-form"
                >
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
                        <div>
                            {createPostStatus === 'PENDING' ? (
                                <LoaderButton classExtra="button-padding-small" />
                            ) : (
                                <button
                                    className="button-primary button-padding-small"
                                    onClick={handleSubmit}
                                    data-testid="create-post-button"
                                >
                                    Publish Post
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
