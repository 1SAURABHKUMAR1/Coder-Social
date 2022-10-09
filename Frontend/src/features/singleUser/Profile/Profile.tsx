import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import Posts from '../../../Components/Posts/Posts';

import {
    ProfileSidebar,
    ProfileExtra,
    ProfileNotFound,
    ProfileNameBio,
} from '../../index';
import { getUserData } from '../../index';

import { SmallPost } from '../../../Types';

import { setStateNamePost, followUnfollowUser } from '../../../features';

import { socket } from '../../../Services/http/socket';
import Loader from '../../../Components/Loader/LoaderMain';

const Profile = () => {
    useScrollToTop();

    const { username } = useParams();
    const {
        getState,
        profile_photo,
        user_id,
        name,
        bio,
        work,
        education,
        total_followers,
        total_following,
        followers,
        skills,
        posts,
        comments,
        tags,
        location,
        createdAt,
        portfolio_link,
        twitterUrl,
        githubUrl,
        followUserState,
        _id: recieverUserId,
    } = useAppSelector((state) => state.user);
    const { reactionStatus } = useAppSelector((state) => state.post);
    const {
        userId,
        id,
        name: senderName,
        login,
        photo: senderProfilePic,
    } = useAppSelector((state) => state.authenticate);
    const dispatch = useAppDispatch();
    const currentUrl = useLocation();
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);

    const { socketConnectedState } = useAppSelector((state) => state.socket);

    const handleFollow = () => {
        if (!login) {
            navigate('/login', { state: { from: currentUrl } });
        }

        setIsFollowed(!isFollowed);
        dispatch(followUnfollowUser(user_id));

        if (socketConnectedState === 'CONNECTED' && !followers.includes(id)) {
            socket.emit('follow', {
                sender: {
                    name: senderName,
                    profile_image: senderProfilePic,
                    userId: id,
                },
                reciever: {
                    name: name,
                    userId: recieverUserId,
                },
            });
        }
    };

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

    useEffect(() => {
        setIsFollowed(followers.includes(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [followers, id]);

    if (getState === 'PENDING') {
        return <Loader />;
    } else if (getState === 'REJECTED') {
        return <ProfileNotFound />;
    } else if (getState === 'FULFILLED') {
        return (
            <main className="profile-page component">
                <div className="profile-user-info">
                    <div className="user-info-profile">
                        <header className="user-info-profile-name-image-bio">
                            <div className="user-info-profile-image-button">
                                <div className="user-info-avatar">
                                    <img
                                        src={profile_photo}
                                        className="profile-image"
                                        alt=""
                                        width="128"
                                        height="128"
                                        data-testid="profile-photo"
                                    />
                                </div>

                                <div className="user-info-follow-edit-button">
                                    {userId === user_id ? (
                                        <Link
                                            to="/user/profile/edit"
                                            className="button-primary button-profile"
                                            data-testid="edit-profile-button"
                                        >
                                            Edit Profile
                                        </Link>
                                    ) : (
                                        <button
                                            className="button-primary button-profile"
                                            disabled={
                                                followUserState === 'PENDING'
                                            }
                                            onClick={handleFollow}
                                        >
                                            {isFollowed
                                                ? 'Unfollow User'
                                                : 'Follow User'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <ProfileNameBio
                                name={name}
                                bio={bio}
                                location={location}
                                joinedDate={createdAt}
                                portfolio_link={portfolio_link}
                                twitterUrl={twitterUrl}
                                githubUrl={githubUrl}
                            />

                            <ProfileExtra
                                work={work}
                                education={education}
                                following={total_following}
                                followers={total_followers}
                            />
                        </header>
                    </div>
                </div>
                <div className="profile-sidebar-post-container">
                    <ProfileSidebar
                        works={work}
                        skills={skills}
                        numberOfPosts={posts.length}
                        numberOfComments={comments.length}
                        numberOftags={tags.length}
                    />

                    <div className="container-post container">
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
                </div>
            </main>
        );
    }

    return <></>;
};

export default Profile;
