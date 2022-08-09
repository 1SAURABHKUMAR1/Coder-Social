import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { FcHome, FcReading } from 'react-icons/fc';
import { FaGithub, FaLinkedin, FaTags, FaTwitter } from 'react-icons/fa';

import About from '../../../../Components/About/About';

import { getUserTags } from '../../../index';

import UserTagList from '../../../../Components/Tag/UserTagList';

const LeftSideBar = () => {
    const { login } = useAppSelector((state) => state.authenticate);
    const { userTags, userTagState } = useAppSelector((state) => state.tags);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(getUserTags({ controller, unMounted }));

        return () => {
            controller.abort();
            unMounted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="sidebar-left">
                <About />
                <ul className="home-sidebar-tags">
                    <li className="list-item hover-list-home">
                        <Link to="/">
                            <i>
                                <FcHome />
                            </i>
                            <span>Home</span>
                        </Link>
                    </li>
                    {login && (
                        <li className="list-item hover-list-home">
                            <Link to="/user/readinglist">
                                <i>
                                    <FcReading />
                                </i>
                                <span>Reading List</span>
                            </Link>
                        </li>
                    )}
                    <li className="list-item hover-list-home">
                        <Link to="/tags">
                            <i>
                                <FaTags />
                            </i>
                            <span>Tags</span>
                        </Link>
                    </li>
                </ul>

                <div className="home-socials">
                    <a
                        href="https://twitter.com/1SAURABHKUMAR1"
                        target="_blank"
                        className="home-socials-single"
                        rel="noreferrer"
                    >
                        <FaTwitter className="icons-home" />
                    </a>
                    <a
                        href="https://github.com/1SAURABHKUMAR1"
                        target="_blank"
                        className="home-socials-single"
                        rel="noreferrer"
                    >
                        <FaGithub className="icons-home" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/1saurabhkumar1/"
                        target="_blank"
                        className="home-socials-single"
                        rel="noreferrer"
                    >
                        <FaLinkedin className="icons-home" />
                    </a>
                </div>

                <UserTagList tagsArray={userTags} tagsState={userTagState} />
            </div>
        </>
    );
};

export default LeftSideBar;
