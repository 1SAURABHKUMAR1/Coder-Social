import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useParams } from 'react-router-dom';

import PostComments from '../../../Components/Comment/PostComments';
import {
    PostNotFound,
    PostReaction,
    PostSection,
    PostUserInfo,
} from '../../index';
import Loader from '../../../Components/Loader/LoaderMain';

import { getPost, setStateNamePost } from '../../index';

import useScrollToTop from '../../../Hooks/useScrollToTop';

const Post = () => {
    const { postId } = useParams();
    const dispatch = useAppDispatch();
    const { singlePost, postStatus } = useAppSelector((state) => state.post);

    useScrollToTop();

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
            controller.abort();
            unMounted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    useEffect(() => {
        postStatus === 'FULFILLED' &&
            dispatch(
                setStateNamePost({
                    stateName: 'postStatus',
                    stateValue: 'IDLE',
                }),
            );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postStatus]);

    if (postStatus === 'PENDING') {
        return <Loader />;
    } else if (postStatus === 'REJECTED' || singlePost._id === '') {
        return <PostNotFound />;
    } else if (postStatus === 'FULFILLED' || singlePost._id) {
        return (
            <div className="component component-no-p-m">
                <div className="container-layout post-layout">
                    <PostReaction
                        likes={singlePost.likes}
                        unicorns={singlePost.unicorns}
                        bookmarks={singlePost.bookmarks}
                    />
                    <div className="post-about-section">
                        <PostSection
                            image={singlePost.image?.secure_url}
                            heading={singlePost.title}
                            authorImage={
                                singlePost.author.profile_photo.secure_url
                            }
                            authorName={singlePost.author.name}
                            authorUsername={singlePost.author.username}
                            postDate={singlePost.createdAt}
                            postId={singlePost.post_id}
                            postDescription={singlePost.description}
                            tagsArray={singlePost.tags}
                            authorUserId={singlePost.author.user_id}
                        >
                            <PostComments commentArray={singlePost.comments} />
                        </PostSection>
                        <PostUserInfo
                            image_secure_url={
                                singlePost.author.profile_photo.secure_url
                            }
                            bio={singlePost.author?.bio}
                            education={singlePost.author?.education}
                            joinedDate={singlePost.author.createdAt}
                            location={singlePost.author?.location}
                            user_id={singlePost.author?.user_id}
                            work={singlePost.author?.work}
                            username={singlePost.author.username}
                            name={singlePost.author.name}
                            id={singlePost.author._id}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <></>;
};

export default Post;
