import { useAppSelector } from '../../../../store/hooks';
import { Link } from 'react-router-dom';

import PostAuthor from '../../../../Components/Posts/PostAuthor';
import PostEditDelete from './PostEditDelete';

import ConvertDate from '../../../../Utils/ConvertDate';

import { PostSectionProps } from '../../../../Types';

const PostSection = ({
    image,
    heading,
    authorImage,
    authorName,
    authorUsername,
    authorUserId,
    postDate,
    postId,
    postDescription,
    tagsArray,
    children,
}: PostSectionProps) => {
    const [dateOnPosted] = ConvertDate(postDate, 'DD MMM');

    const { login, userId } = useAppSelector((state) => state.authenticate);

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
                        {login && userId === authorUserId && (
                            <PostEditDelete postId={postId} />
                        )}
                    </div>
                    <div className="post-about margin-small-profile">
                        <div className="post-title">
                            <div>{heading}</div>
                        </div>
                        {tagsArray?.length > 0 && (
                            <div className="post-tag-wrapper">
                                {tagsArray.map((tag) => (
                                    <Link
                                        to={`/tag/${tag?.name}`}
                                        className="post-tag"
                                        key={tag._id}
                                    >
                                        <span
                                            className="post-tag-hashtag"
                                            key={tag._id}
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