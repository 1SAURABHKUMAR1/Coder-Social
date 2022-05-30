import './Posts.css';

import { Link } from 'react-router-dom';

import PostsActions from './PostsActions';
import PostAuthor from './PostAuthor';

import ConvertDate from '../../Utils/ConvertDate';
import CalculateTimeRead from '../../Utils/CalculateTimeRead';

import { PostProps, SingleTag } from '../../Types';

import randomColor from '../../Utils/randomColor';

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
    tagsArray,
    bookmarkArray,
}: PostProps) => {
    const [dateOnPosted] = ConvertDate(postDate, 'DD MMM');

    const [timeToRead] = CalculateTimeRead(postDescription);

    return (
        <>
            <li className="post-single">
                {image && (
                    <Link
                        to={`/post/${id}`}
                        className="post-image padding-42"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    ></Link>
                )}
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
                        {tagsArray?.length >= 1 && (
                            <div className="post-tag-wrapper">
                                {tagsArray.map((tag: SingleTag) => {
                                    const color = randomColor();

                                    return (
                                        <Link
                                            to={`/tag/${tag?.name}`}
                                            className={`post-tag`}
                                            style={{
                                                // @ts-ignore
                                                '--hover-color': `rgba(${color}, 0.9)`,
                                            }}
                                            key={tag?._id}
                                        >
                                            <span
                                                className="post-tag-hashtag"
                                                style={{
                                                    // @ts-ignore
                                                    '--tag-color': `rgba(${color}, 0.95)`,
                                                }}
                                                key={tag?._id}
                                            >
                                                #
                                            </span>
                                            {tag?.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                        <div className="post-actions">
                            <PostsActions
                                numberOfComments={numberOfComments}
                                numberOfLikes={numberOfLikes}
                                timeToRead={timeToRead}
                                postId={id}
                                bookmarkArray={bookmarkArray}
                            />
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default Posts;