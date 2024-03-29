import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PostAuthorProps } from '../../Types';

const PostAuthor = ({
    authorImage,
    authorName,
    postDate,
    authorUsername,
}: PostAuthorProps) => {
    return (
        <>
            <div className="post-author flex-start width-100 width-max">
                <div className="post-author-image">
                    <Link to={`/user/profile/${authorUsername}`}>
                        <img
                            src={authorImage}
                            alt="autor-single"
                            className="image image-round"
                            data-testid="post-author-image"
                        />
                    </Link>
                </div>
                <div className="post-author-description">
                    <div
                        className="post-author-name"
                        data-testid="post-author-name"
                    >
                        <Link to={`/user/profile/${authorUsername}`}>
                            {authorName}
                        </Link>
                    </div>
                    <div
                        className="post-author-date"
                        data-testid="post-author-date"
                    >
                        {postDate}
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(PostAuthor);
