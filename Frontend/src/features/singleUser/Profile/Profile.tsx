import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Link, useParams } from 'react-router-dom';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import Posts from '../../../Components/Posts/Posts';

import {
    ProfileSidebar,
    ProfileExtra,
    ProfileNotFound,
    ProfileNameBio,
} from '../../index';
import { getUserData } from '../../index';

import { Bookmark } from '../../../Types';

import { setStateNamePost } from '../../../features';

const Profile = () => {
    useScrollToTop();

    const { username } = useParams();

    const userData = useAppSelector((state) => state.user);
    const { reactionStatus } = useAppSelector((state) => state.post);
    const { userId } = useAppSelector((state) => state.authenticate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let unMounted = false;
        const controller = new AbortController();

        dispatch(
            getUserData({
                // @ts-ignore
                username,
                controller,
                unMounted,
            }),
        );

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

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

    return (
        <>
            {userData.getState === 'FULFILLED' ? (
                <main className="profile-page component">
                    <div className="profile-user-info">
                        <div className="user-info-profile">
                            <header className="user-info-profile-name-image-bio">
                                <div className="user-info-profile-image-button">
                                    <div className="user-info-avatar">
                                        <img
                                            src={userData.profile_photo}
                                            className="profile-image"
                                            alt=""
                                            width="128"
                                            height="128"
                                        />
                                    </div>

                                    <div className="user-info-follow-edit-button">
                                        {userId === userData.user_id ? (
                                            <Link
                                                to="/user/profile/edit"
                                                className="button-primary button-profile"
                                            >
                                                Edit Profile
                                            </Link>
                                        ) : (
                                            <button className="button-primary button-profile">
                                                Follow User
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <ProfileNameBio
                                    name={userData.name}
                                    bio={userData.bio}
                                    location={userData.location}
                                    joinedDate={userData.createdAt}
                                    portfolio_link={userData.portfolio_link}
                                    twitterUrl={userData.twitterUrl}
                                    githubUrl={userData.githubUrl}
                                />

                                <ProfileExtra
                                    work={userData.work}
                                    education={userData.education}
                                    following={userData.total_followers}
                                    followers={userData.total_following}
                                />
                            </header>
                        </div>
                    </div>
                    <div className="profile-sidebar-post-container">
                        <ProfileSidebar
                            works={userData.work}
                            skills={userData.skills}
                            numberOfPosts={userData.posts.length}
                            numberOfComments={userData.comments.length}
                            numberOftags={userData.tags.length}
                        />

                        <div className="container-post container">
                            <ul>
                                {userData.posts.map((post: Bookmark) => (
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
                    </div>
                </main>
            ) : (
                <ProfileNotFound />
            )}
        </>
    );
};

export default Profile;
