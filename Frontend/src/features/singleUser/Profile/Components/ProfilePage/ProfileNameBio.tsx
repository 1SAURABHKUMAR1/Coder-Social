import { HiLocationMarker, HiOutlineExternalLink } from 'react-icons/hi';
import { RiCake2Fill } from 'react-icons/ri';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import { ProfileNameProps } from '../../../../../Types';

import ConvertDate from '../../../../../Utils/ConvertDate';

const ProfileNameBio = ({
    name,
    bio,
    location,
    joinedDate,
    portfolio_link,
    twitterUrl,
    githubUrl,
}: ProfileNameProps) => {
    const [joiningDate] = ConvertDate(joinedDate, 'DD MMM YYYY');

    return (
        <div className="user-info-profile-header-bio">
            <h1 className="user-info-header-name" data-testid="user-name">
                {name}
            </h1>
            {bio && (
                <p className="user-info-bio" data-testid="user-bio">
                    {bio}
                </p>
            )}
            <div className="user-info-location-portfolio">
                {location && (
                    <span className="user-info-single-item">
                        <HiLocationMarker className="color-svg" />
                        {location?.charAt(0)?.toUpperCase() +
                            location?.slice(1)}
                    </span>
                )}
                <span className="user-info-single-item">
                    <>
                        <RiCake2Fill
                            className="color-svg"
                            style={{ marginRight: '0.1rem' }}
                        />
                        Joined on {joiningDate}
                    </>
                </span>
                {portfolio_link && (
                    <a
                        href={portfolio_link}
                        target="_blank"
                        className="user-info-single-item hover-user-info-single"
                        rel="noreferrer"
                    >
                        <HiOutlineExternalLink
                            className="color-svg"
                            style={{ fill: 'none' }}
                        />
                        {portfolio_link}
                    </a>
                )}
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        className="user-info-single-item hover-user-info-single"
                        rel="noreferrer"
                    >
                        <FaGithub className="color-svg" />
                    </a>
                )}
                {twitterUrl && (
                    <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="user-info-single-item hover-user-info-single"
                    >
                        <FaTwitter className="color-svg" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProfileNameBio;
