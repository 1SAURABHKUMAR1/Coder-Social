import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import LoaderButton from '../Loader/LoaderButton';
import SingleComment from './SingleComment';

import ErrorToast from '../../Toast/Error';

import { createComment } from '../../features/index';

import { PostCommentsProps } from '../../Types';

import { getReplies } from '../../Utils/getReplies';

import { socket } from '../../Services/http/socket';

const PostComments = ({ commentArray }: PostCommentsProps) => {
    const {
        login,
        username,
        photo: user_avatar,
        id: senderUserId,
    } = useAppSelector((state) => state.authenticate);
    const { createCommentStatus } = useAppSelector((state) => state.post);
    const { postId } = useParams();
    const dispatch = useAppDispatch();
    const [commentBody, setCommentBody] = useState<string>('');
    const rootComments =
        commentArray &&
        commentArray.filter((comment) => !comment.parent_comment);

    const { socketConnectedState } = useAppSelector((state) => state.socket);
    const { name: senderName, photo: senderProfilePic } = useAppSelector(
        (state) => state.authenticate,
    );
    const {
        singlePost: {
            author: { _id: recieverId, name: recieverName },
        },
    } = useAppSelector((state) => state.post);

    const handleCommentBody = (event: React.FormEvent) => {
        setCommentBody((event.target as HTMLButtonElement).value);
    };

    const handleCommentSubmit = () => {
        if (commentBody === '') {
            ErrorToast('Cannot be empty');
        }
        dispatch(
            createComment({
                comment_body: commentBody,
                // @ts-ignore
                post_id: postId,
            }),
        );

        if (socketConnectedState === 'CONNECTED') {
            socket.emit('commentPost', {
                postId: postId,
                sender: {
                    name: senderName,
                    profile_image: senderProfilePic,
                    userId: senderUserId,
                },
                reciever: {
                    name: recieverName,
                    userId: recieverId,
                },
            });
        }

        setCommentBody('');
    };

    return (
        <>
            <section className="padding-top-2" id="comment">
                <h1 className="auth-welcome-header-bold" id="font-8">
                    Discussion ({commentArray.length})
                </h1>

                {login && (
                    <div className="padding-top-3">
                        <div className="post-author width-100 align-start">
                            <Link
                                to={`/user/profile/${username}`}
                                className="post-author-image"
                            >
                                <img
                                    src={user_avatar}
                                    alt="autor-single"
                                    className="image image-round"
                                />
                            </Link>
                            <div className="width-100">
                                <textarea
                                    className="width-100 comment-text-area scrollbar-hidden"
                                    value={commentBody}
                                    onChange={handleCommentBody}
                                />
                                <div className="padding-top-2">
                                    {createCommentStatus === 'PENDING' ? (
                                        <LoaderButton classExtra="margin-0 padding-button border-2 width-max" />
                                    ) : (
                                        <button
                                            id="submit-primary-button"
                                            className="margin-0 padding-button border-2"
                                            onClick={handleCommentSubmit}
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {rootComments &&
                    rootComments.map((comment) => (
                        <div className="padding-top-7" key={comment.comment_id}>
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
                                replies={getReplies(commentArray, comment._id)}
                                comment_array={commentArray}
                                levels={1}
                            />
                        </div>
                    ))}
            </section>
        </>
    );
};

export default PostComments;
