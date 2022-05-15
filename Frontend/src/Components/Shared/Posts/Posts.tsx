import './Posts.css';

import { Link } from 'react-router-dom';

import PostsActions from './PostsActions';
import PostAuthor from './PostAuthor';

import { PostProps } from '../../../Types';
import ConvertDate from '../../../Utils/ConvertDate';
import CalculateTimeRead from '../../../Utils/CalculateTimeRead';

const Posts = ({
    image,
    heading,
    id,
    authorImage,
    authorName,
    postDate,
    numberOfComments,
    numberOfLikes,
    authorUsername,
    postDescription,
}: PostProps) => {
    const [dateOnPosted] = ConvertDate(postDate, 'DD MMM');

    const [timeToRead] = CalculateTimeRead(postDescription);

    return (
        <>
            <li className="post-single">
                <div className="post-image">
                    <Link to={`/post/${id}`}>
                        <img
                            src={image}
                            alt="post-green"
                            className="image post-image-single"
                        />
                    </Link>
                </div>
                <div className="post-description">
                    <div className="post-author">
                        <PostAuthor
                            authorImage={authorImage}
                            authorName={authorName}
                            postDate={dateOnPosted}
                            authorUsername={authorUsername}
                        />
                    </div>
                    <div className="post-about">
                        <div className="post-title">
                            <Link to={`/post/${id}`}>{heading}</Link>
                        </div>
                        <div className="post-tag">
                            {/* TODO: tags */}
                            <Link to="/">
                                <span className="post-tag-hashtag">#</span>
                                discuss
                            </Link>
                        </div>
                        <div className="post-actions">
                            <PostsActions
                                numberOfComments={numberOfComments}
                                numberOfLikes={numberOfLikes}
                                timeToRead={timeToRead}
                            />
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default Posts;
