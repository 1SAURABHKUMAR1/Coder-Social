import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { RiChat1Line } from 'react-icons/ri';

import CommentEditDelete from './CommentEditDelete';
import CommentBody from './CommentBody';
import LikeComment from './LikeComment';
import LoaderButton from '../Loader/LoaderButton';

import { createComment } from '../../features/index';

import { SingleCommentProps } from '../../Types';

import ErrorToast from '../../Toast/Error';

import { getReplies } from '../../Utils/getReplies';

const SingleComment = ({
    author_avatar,
    author_name,
    author_username,
    author_user_id,
    comment_body,
    comment_date,
    comment_id,
    likes_array,
    replies, // for sub reply
    comment_array, // for extracting all comments
    levels, // for sub reply render
}: SingleCommentProps) => {
    const [commentDescription, setCommentDescription] = useState(comment_body);
    const [showCommentEdit, setShowCommentEdit] = useState(false);
    const [replyText, setReplyText] = useState<boolean>(false);
    const [replyBody, setReplyBody] = useState<string>('');
    const dispatch = useAppDispatch();
    const { postId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { userId, login } = useAppSelector((state) => state.authenticate);
    const { createCommentStatus } = useAppSelector((state) => state.post);

    const handleReplyBody = (event: React.FormEvent) => {
        setReplyBody((event.target as HTMLButtonElement).value);
    };

    const resetReplyBody = () => {
        setReplyText(false);
        setReplyBody('');
    };

    const toggleReplyTextarea = () => {
        if (!login) {
            navigate('/login', { state: { from: location } });
        }

        setReplyText(!replyText);
    };

    const handleReply = () => {
        if (!login) {
            navigate('/login', { state: { from: location } });
        }

        if (!replyBody) {
            ErrorToast('Cannot be empty');
            return;
        }

        dispatch(
            createComment({
                comment_body: replyBody,
                // @ts-ignore
                post_id: postId,
                parent_comment_id: levels < 3 ? comment_id : '',
            }),
        );
        resetReplyBody();
    };

    return (
        <>
            <div
                className="post-author width-100 align-start"
                data-testid="post-user-comments"
            >
                <div className="post-author-image">
                    <Link
                        to={`/user/profile/${author_username}`}
                        className="post-author-name"
                    >
                        <img
                            src={author_avatar}
                            alt="autor-single"
                            data-testid="comment-user-avatar"
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

                    <div className="padding-top-2 flex align-center font-m-bold color-mid-gray margin-x-sm justify-between  padding-top-small">
                        <div className="flex gap-5 align-center">
                            <LikeComment
                                likes_array={likes_array}
                                comment_id={comment_id}
                            />
                            {levels < 3 && (
                                <div
                                    className="flex align-center gap-2 cursor-pointer"
                                    onClick={toggleReplyTextarea}
                                    data-testid="comment-reply"
                                >
                                    <RiChat1Line />
                                    <span className="font-sm post-author-date">
                                        Reply
                                    </span>
                                </div>
                            )}
                        </div>

                        {author_user_id === userId && (
                            <CommentEditDelete
                                commentBody={commentDescription}
                                showCommentEdit={showCommentEdit}
                                setShowCommentEdit={setShowCommentEdit}
                                comment_id={comment_id}
                                setCommentBody={setCommentDescription}
                                oldCommentBody={comment_body}
                            />
                        )}
                    </div>

                    {/* reply text area*/}
                    {replyText && (
                        <div className="padding-top-3 post-author width-100 align-start">
                            <div className="width-100">
                                <textarea
                                    className="width-100 comment-text-area scrollbar-hidden"
                                    value={replyBody}
                                    onChange={handleReplyBody}
                                    data-testid="comment-reply-textarea"
                                />
                                <div className="flex gap-2 align-center color-mid-gray padding-top-2">
                                    {createCommentStatus === 'PENDING' ? (
                                        <LoaderButton classExtra="margin-0 padding-button border-2 width-max" />
                                    ) : (
                                        <button
                                            id="submit-primary-button"
                                            className="post-comment margin-0 border-2 font-85"
                                            onClick={handleReply}
                                            data-testid="comment-reply-submit"
                                        >
                                            Submit
                                        </button>
                                    )}
                                    <div
                                        className="post-comment post-number"
                                        onClick={resetReplyBody}
                                        data-testid="comment-reply-dismiss"
                                    >
                                        Dismiss
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {replies &&
                replies.map((comment) => (
                    <div
                        className={`padding-top-7 ${
                            levels <= 2 ? 'sub-comment' : ''
                        }`}
                        key={comment.comment_id}
                    >
                        <SingleComment
                            key={comment.comment_id}
                            author_avatar={
                                comment.author.profile_photo.secure_url
                            }
                            author_name={comment.author.name}
                            author_username={comment.author.username}
                            author_user_id={comment.author.user_id}
                            comment_body={comment.body}
                            comment_date={comment.createdAt}
                            comment_id={comment.comment_id}
                            likes_array={comment.likes}
                            replies={getReplies(comment_array, comment._id)}
                            comment_array={comment_array}
                            levels={levels + 1}
                        />
                    </div>
                ))}
        </>
    );
};

export default SingleComment;
