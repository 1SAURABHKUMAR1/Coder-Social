import './Posts.css';

import postimage from '../../../Data/images/postimage.png';
import postauthorimage from '../../../Data/images/postauthorimage.jpg';

import { Link } from 'react-router-dom';

import { RiHeart2Line, RiChat1Line } from 'react-icons/ri';

const Posts = () => {
    return (
        <>
            <li className="post-single">
                <div className="post-image">
                    <Link to="/">
                        <img
                            src={postimage}
                            alt="post-green"
                            className="image post-image-single"
                        />
                    </Link>
                </div>
                <div className="post-description">
                    <div className="post-author">
                        <div className="post-author-image">
                            <Link to="/">
                                <img
                                    src={postauthorimage}
                                    alt="autor-single"
                                    className="image image-round"
                                />
                            </Link>
                        </div>
                        <div className="post-author-description">
                            <div className="post-author-name">
                                <Link to="/">Ben Halpern</Link>
                            </div>
                            <div className="post-author-date">May 4</div>
                        </div>
                    </div>
                    <div className="post-about">
                        <div className="post-title">
                            <Link to="/">
                                What tools would you choose to create a personal
                                portfolio site if starting from scratch?
                            </Link>
                        </div>
                        <div className="post-tag">
                            <Link to="/">
                                <span className="post-tag-hashtag">#</span>
                                discuss
                            </Link>
                        </div>
                        <div className="post-actions">
                            <div className="post-like-comment">
                                <div className="post-like">
                                    <RiHeart2Line
                                        style={{ fontSize: '1.25rem' }}
                                    />
                                    <div className="post-number">
                                        28
                                        <span className="post-text">
                                            reactions
                                        </span>
                                    </div>
                                </div>
                                <div className="post-comment">
                                    <RiChat1Line
                                        style={{ fontSize: '1.25rem' }}
                                    />
                                    <div className="post-number">
                                        11
                                        <span className="post-text">
                                            reactions
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="post-read-save">
                                <div className="post-read-time">1 min read</div>
                                <div className="post-save">Save</div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default Posts;
