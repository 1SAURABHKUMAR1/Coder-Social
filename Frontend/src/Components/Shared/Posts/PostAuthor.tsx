import { Link } from 'react-router-dom';
import { PostAuthorProps } from '../../../Types';

const PostAuthor = ({
    authorImage,
    authorName,
    postDate,
    authorUsername,
}: PostAuthorProps) => {
    return (
        <>
            <div className="post-author-image">
                <Link to={`/user/profile/${authorUsername}`}>
                    <img
                        src={authorImage}
                        alt="autor-single"
                        className="image image-round"
                    />
                </Link>
            </div>
            <div className="post-author-description">
                <div className="post-author-name">
                    <Link to="/">{authorName}</Link>
                </div>
                <div className="post-author-date">{postDate}</div>
            </div>
        </>
    );
};

export default PostAuthor;
