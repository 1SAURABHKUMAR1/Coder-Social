import { Link } from 'react-router-dom';

import PostAuthor from '../Shared/Posts/PostAuthor';

import ConvertDate from '../../Utils/ConvertDate';

import { PostSectionProps } from '../../Types';
import PostEditDelete from './PostEditDelete';

const PostSection = ({
    image,
    heading,
    authorImage,
    authorName,
    authorUsername,
    postDate,
    postDescription,
    tagsArray,
    children,
}: PostSectionProps) => {
    const [dateOnPosted] = ConvertDate(postDate, 'DD MMM');

    return (
        <main className="post-section">
            <li className="post-single border-desktop">
                {image && (
                    <div
                        className="post-image padding-42"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    ></div>
                )}
                <div className="post-description post-single-padding">
                    <div className="post-author margin-small-profile justify-between row-m-col-d">
                        <PostAuthor
                            authorImage={authorImage}
                            authorName={authorName}
                            postDate={dateOnPosted}
                            authorUsername={authorUsername}
                        />
                        <PostEditDelete />
                    </div>
                    <div className="post-about margin-small-profile">
                        <div className="post-title">
                            <div>{heading}</div>
                        </div>
                        {tagsArray.length >= 1 && (
                            <div className="post-tag-wrapper">
                                {tagsArray.map((tag) => (
                                    <Link
                                        to={`/tag/${tag?.name}`}
                                        className="post-tag"
                                        key={tag.tag_id}
                                    >
                                        <span
                                            className="post-tag-hashtag"
                                            key={tag.tag_id}
                                        >
                                            #
                                        </span>
                                        {tag?.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="margin-small-profile post-description-single">
                        {postDescription}
                    </div>
                </div>
                <div
                    id="paddding-top-3"
                    className="post-single-padding border-top"
                >
                    {children}
                </div>
            </li>
        </main>
    );
};

export default PostSection;
