import { Link } from 'react-router-dom';

import ConvertDate from '../../Utils/ConvertDate';

import { CommentBodyProps } from '../../Types';

const CommentBody = ({
    author_name,
    comment_date,
    author_username,
    commentDescription,
    setCommentDescription,
    showCommentEdit,
    comment_body,
}: CommentBodyProps) => {
    const [dateOfComment] = ConvertDate(comment_date, 'MMM DD');

    return (
        <>
            <div className="width-100 comment-single color-mid-gray">
                <div className="post-author-description flex-col gap-3 align-center">
                    <Link
                        to={`/user/profile/${author_username}`}
                        className="post-author-name"
                        data-testid="comment-user-name"
                    >
                        <div>{author_name}</div>
                    </Link>

                    <span className="font-m-bold">•</span>

                    <div
                        className="post-author-date"
                        data-testid="comment-user-date"
                    >
                        {dateOfComment}
                    </div>
                </div>

                {showCommentEdit ? (
                    <textarea
                        className="width-100 comment-text-area scrollbar-hidden height-45 margin-top-4"
                        value={commentDescription}
                        onChange={(event) =>
                            setCommentDescription(event.target.value)
                        }
                    ></textarea>
                ) : (
                    <div
                        className="padding-top-3"
                        data-testid="comment-user-body"
                    >
                        {comment_body}
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentBody;
