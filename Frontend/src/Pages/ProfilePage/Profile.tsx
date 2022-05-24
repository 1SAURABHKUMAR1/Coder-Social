import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import PostContainer from '../../Components/ProfilePage/PostContainer';
import SideBar from '../../Components/ProfilePage/SideBar';
import ProfileExtra from '../../Components/ProfilePage/ProfileExtra';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import Axios from '../../http/axios';

import useScrollToTop from '../../Hooks/useScrollToTop';
import ProfileNameBio from '../../Components/ProfilePage/ProfileNameBio';

import { UserData } from '../../Types';
import ProfileNotFound from '../../Components/ProfilePage/ProfileNotFound';

const Profile = () => {
    useScrollToTop();

    const { username } = useParams();
    const { userAuthState } = useAuthProvider();

    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        username: '',
        user_id: '',
        social_id: '',
        profile_photo: { id: '', secure_url: '' },
        role: '',
        bio: '',
        portfolio_link: '',
        work: '',
        skills: '',
        education: '',
        location: '',
        githubUrl: '',
        twitterUrl: '',
        total_followers: 0,
        total_following: 0,
        following: [],
        followers: [],
        bookmarks: [],
        posts: [],
        tags: [],
        comments: [],
        createdAt: '',
        __v: 0,
        _id: '',
    });

    const getData = async (unMounted: boolean, controller: AbortSignal) => {
        try {
            const { data } = await Axios.get(`/profile/${username}`, {
                signal: controller,
            });

            if (!unMounted) {
                setUserData(data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let unMounted = false;
        const controller = new AbortController();

        getData(unMounted, controller.signal);

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    return (
        <>
            {userData.user_id ? (
                <main className="profile-page component">
                    <div className="profile-user-info">
                        <div className="user-info-profile">
                            <header className="user-info-profile-name-image-bio">
                                <div className="user-info-profile-image-button">
                                    <div className="user-info-avatar">
                                        <img
                                            src={
                                                userData.profile_photo
                                                    .secure_url
                                            }
                                            className="profile-image"
                                            alt=""
                                            width="128"
                                            height="128"
                                        />
                                    </div>
                                    <div className="user-info-follow-edit-button">
                                        {userAuthState.userId ===
                                        userData.user_id ? (
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
                        <SideBar
                            works={userData.work}
                            skills={userData.skills}
                            numberOfPosts={userData.posts.length}
                            numberOfComments={userData.comments.length}
                            numberOftags={userData.tags.length}
                        />
                        <PostContainer postArray={userData.posts} />
                    </div>
                </main>
            ) : (
                <ProfileNotFound />
            )}
        </>
    );
};

export default Profile;
