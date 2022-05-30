import { RiFilePaperLine, RiMessage3Line } from 'react-icons/ri';
import { useState } from 'react';

import { MdTag } from 'react-icons/md';

import { SideBarPortfolioProps } from '../../../../../Types';

const SideBar = ({
    works,
    skills,
    numberOfPosts,
    numberOfComments,
    numberOftags,
}: SideBarPortfolioProps) => {
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    return (
        <>
            {!showMoreInfo && (
                <button
                    className="button-secondary button-profile-show-more"
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                >
                    Show More Info
                </button>
            )}
            <div
                style={{ display: `${showMoreInfo ? 'flex' : 'none'}` }}
                className="profile-bottom-left"
            >
                <div className="profile-bottom-left-menu-items">
                    <h2>Works</h2>
                    <ul>
                        <li>{!works ? 'None' : works}</li>
                    </ul>
                </div>
                <div className="profile-bottom-left-menu-items">
                    <h2>Skills/Languages</h2>
                    <ul>
                        <li>{!skills ? 'None' : skills}</li>
                    </ul>
                </div>
                <div className="profile-bottom-left-menu-items">
                    <ul>
                        <li>
                            <RiFilePaperLine className="profile-svg" />
                            <span>
                                {!numberOfPosts ? '0' : numberOfPosts} post
                                published
                            </span>
                        </li>
                        <li>
                            <RiMessage3Line className="profile-svg" />
                            <span>
                                {!numberOfComments ? '0' : numberOfComments}{' '}
                                comments written
                            </span>
                        </li>
                        <li>
                            <MdTag className="profile-svg" />
                            <span>
                                {!numberOftags ? '0' : numberOftags} tags
                                followed
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBar;
