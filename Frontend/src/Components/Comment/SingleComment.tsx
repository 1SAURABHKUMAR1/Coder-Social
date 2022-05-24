import { useState } from 'react';

import { Link } from 'react-router-dom';

import CommentEditDelete from './CommentEditDelete';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import { SingleCommentProps } from '../../Types';
import CommentBody from './CommentBody';
import CommentLikeReply from './CommentLikeReply';

const SingleComment = ({
    author_avatar,
    author_name,
    author_username,
    author_user_id,
    comment_body,
    comment_date,
    comment_id,
    likes_array,
    updateComment,
}: SingleCommentProps) => {
    const [commentDescription, setCommentDescription] = useState(comment_body);
    const [showCommentEdit, setShowCommentEdit] = useState(false);

    const {
        userAuthState: { userId },
    } = useAuthProvider();

    return (
        <>
            <div className="post-author-image">
                <Link
                    to={`/user/profile/${author_username}`}
                    className="post-author-name"
                >
                    <img
                        src={author_avatar}
                        alt="autor-single"
                        className="image image-round"
                    />
                </Link>
            </div>

            <div className="width-100">
                <CommentBody
                    author_name={author_name}
                    author_username={author_username}
                    commentDescription={commentDescription}
                    comment_body={comment_body}
                    comment_date={comment_date}
                    setCommentDescription={setCommentDescription}
                    showCommentEdit={showCommentEdit}
                />

                <div className="padding-top-2 flex align-center font-m-bold color-mid-gray margin-x-sm justify-between">
                    <CommentLikeReply likes_array={likes_array} />

                    {author_user_id === userId && (
                        <CommentEditDelete
                            commentBody={commentDescription}
                            showCommentEdit={showCommentEdit}
                            setShowCommentEdit={setShowCommentEdit}
                            updateComment={updateComment}
                            comment_id={comment_id}
                            setCommentBody={setCommentDescription}
                            oldCommentBody={comment_body}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default SingleComment;
