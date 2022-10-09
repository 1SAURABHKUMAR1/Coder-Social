import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { followUnfollowUser } from '../../../index';

import ConvertDate from '../../../../Utils/ConvertDate';

import { PostProfileProps } from '../../../../Types';

import { socket } from '../../../../Services/http/socket';

const PostUserInfo = ({
    image_secure_url,
    user_id,
    bio,
    location,
    education,
    work,
    joinedDate,
    name,
    username,
    id: recieverUserId,
}: PostProfileProps) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const {
        userId,
        id,
        name: senderName,
        photo: senderProfilePic,
        login,
    } = useAppSelector((state) => state.authenticate);
    const { followers, followUserState } = useAppSelector(
        (state) => state.user,
    );

    const dispatch = useAppDispatch();
    const currenturl = useLocation();
    const navigate = useNavigate();

    const { socketConnectedState } = useAppSelector((state) => state.socket);

    const [joiningDate] = ConvertDate(joinedDate, 'DD MMM YYYY');

    const handleFollow = () => {
        if (!login) {
            navigate('/login', { state: { from: currenturl } });
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
        setIsFollowed(followers.includes(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [followers, id]);

    return (
        <section className="post-user-info post-sticky-4px top-21">
            <div className="profile-user-info radius-small-desktop">
                <div className="post-profile-info">
                    <header className="post-user-info-profile-name-image-bio border-desktop">
                        <Link
                            to={`/user/profile/${username}`}
                            className="post-user-info-avatar"
                        >
                            <img
                                src={image_secure_url}
                                className="profile-image"
                                alt=""
                                width="128"
                                height="128"
                                data-testid="post-author-side-image"
                            />
                        </Link>

                        {name && (
                            <div
                                data-testid="post-author-side-name"
                                className="post-profile-bio margin-top-3 small-text text-center"
                            >
                                {name}
                            </div>
                        )}

                        {userId === user_id ? (
                            <Link
                                to="/user/profile/edit"
                                data-testid="post-author-side-edit-profile"
                            >
                                <button className="button-primary margin-top-3 small-padding">
                                    Edit Profile
                                </button>
                            </Link>
                        ) : (
                            <button
                                data-testid="post-author-side-follow-unfollow"
                                className="button-primary button-profile"
                                disabled={followUserState === 'PENDING'}
                                onClick={handleFollow}
                            >
                                {isFollowed ? 'Unfollow User' : 'Follow User'}
                            </button>
                        )}

                        {bio && (
                            <div
                                className="post-profile-bio margin-top-4 small-text"
                                data-testid="post-author-side-bio"
                            >
                                {bio}
                            </div>
                        )}

                        {location && (
                            <div
                                className="post-profile-item"
                                data-testid="post-author-side-location"
                            >
                                <strong>LOCATION</strong>
                                <p>{location}</p>
                            </div>
                        )}

                        {education && (
                            <div
                                className="post-profile-item"
                                data-testid="post-author-side-education"
                            >
                                <strong>EDUCATION</strong>
                                <p>{education}</p>
                            </div>
                        )}

                        {work && (
                            <div
                                className="post-profile-item"
                                data-testid="post-author-side-work"
                            >
                                <strong>WORK</strong>
                                <p>{work}</p>
                            </div>
                        )}

                        <div
                            data-testid="post-author-side-joined"
                            className="post-profile-item"
                        >
                            <strong>JOINED ON</strong>
                            <p>{joiningDate}</p>
                        </div>
                    </header>
                </div>
            </div>
        </section>
    );
};

export default PostUserInfo;
