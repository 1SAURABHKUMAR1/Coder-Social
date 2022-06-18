import './Components/Home.css';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { LeftSideBar, RightSideBar } from '../../index';
import Posts from '../../../Components/Posts/Posts';
import Loader from '../../../Components/Loader/LoaderMain';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import { getAllPosts } from '../../../features';

import { SmallPost } from '../../../Types';

import { setStateNamePost } from '../../../features';

const Home = () => {
    useScrollToTop();

    const { posts, postStatus } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const { reactionStatus } = useAppSelector((state) => state.post);

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(getAllPosts({ controller, unMounted }));

        return () => {
            controller.abort();
            unMounted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        reactionStatus === 'REJECTED' &&
            dispatch(
                setStateNamePost({
                    stateName: 'reactionStatus',
                    stateValue: 'IDLE',
                }),
            );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reactionStatus]);

    if (postStatus === 'PENDING') {
        return <Loader />;
    }

    return (
        <div className="component  component-no-p-m  component-pt-5">
            <div className="container-layout">
                <div className="container-sidebar">
                    <LeftSideBar />
                </div>
                <div className="container-post container ">
                    <ul>
                        {posts.map((post: SmallPost) => (
                            <Posts
                                image={post?.image?.secure_url}
                                heading={post.title}
                                id={post.post_id}
                                authorImage={
                                    post.author.profile_photo.secure_url
                                }
                                authorName={post.author.name}
                                authorUsername={post.author.username}
                                postDate={post.createdAt}
                                numberOfComments={post.comments.length}
                                numberOfLikes={post.likes.length}
                                postDescription={post.description}
                                key={post.post_id}
                                tagsArray={post.tags}
                                bookmarkArray={post.bookmarks}
                            />
                        ))}
                    </ul>
                </div>
                <RightSideBar />
            </div>
        </div>
    );
};

export default Home;
