import { useAppSelector } from '../../../../store/hooks';
import { Link } from 'react-router-dom';

import ConvertDate from '../../../../Utils/ConvertDate';

import { PostProfileProps } from '../../../../Types';

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
}: PostProfileProps) => {
    const { userId } = useAppSelector((state) => state.authenticate);

    const [joiningDate] = ConvertDate(joinedDate, 'DD MMM YYYY');

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
                            />
                        </Link>

                        {name && (
                            <div className="post-profile-bio margin-top-3 small-text text-center">
                                {name}
                            </div>
                        )}

                        {userId === user_id ? (
                            <Link to="/user/profile/edit">
                                <button className="button-primary margin-top-3 small-padding">
                                    Edit Profile
                                </button>
                            </Link>
                        ) : (
                            // TODO: follow
                            <button className="button-primary margin-top-3 small-padding">
                                Follow User
                            </button>
                        )}

                        {bio && (
                            <div className="post-profile-bio margin-top-4 small-text">
                                {bio}
                            </div>
                        )}

                        {location && (
                            <div className="post-profile-item">
                                <strong>LOCATION</strong>
                                <p>{location}</p>
                            </div>
                        )}

                        {education && (
                            <div className="post-profile-item">
                                <strong>EDUCATION</strong>
                                <p>{education}</p>
                            </div>
                        )}

                        {work && (
                            <div className="post-profile-item">
                                <strong>WORK</strong>
                                <p>{work}</p>
                            </div>
                        )}

                        <div className="post-profile-item">
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
