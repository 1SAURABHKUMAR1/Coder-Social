import React, { useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import LoaderButton from '../Shared/Loader/LoaderButton';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import ErrorToast from '../../Toast/Error';

import Axios from '../../http/axios';

import { PostCommentsProps } from '../../Types';
import SingleComment from './SingleComment';

const PostComments = ({ commentArray, updateComment }: PostCommentsProps) => {
    const {
        userAuthState: { photo: user_avatar, login, username },
    } = useAuthProvider();

    const [commentBody, setCommentBody] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const { postId } = useParams();

    const handleCommentBody = (event: React.FormEvent) => {
        setCommentBody((event.target as HTMLButtonElement).value);
    };

    const handleCommentSubmit = async () => {
        try {
            setLoading(true);

            const { data } = await Axios.post('/comment/create', {
                post_id: postId,
                comment_body: commentBody,
            });

            updateComment((oldData) => ({
                ...oldData,
                comments: [...commentArray, data.comment],
            }));

            setLoading(false);
            setCommentBody('');
        } catch (error) {
            console.log(error);

            setLoading(false);
            ErrorToast('Failed');
        }
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
                                    {loading ? (
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

                {commentArray?.length > 0 &&
                    commentArray.map((comment) => (
                        <div className="padding-top-7">
                            <div className="post-author width-100 align-start">
                                <SingleComment
                                    authorAvatar={
                                        comment.author.profile_photo.secure_url
                                    }
                                    authorName={comment.author.name}
                                    authorUserName={comment.author.username}
                                    commentBody={comment.body}
                                    commentDate={comment.createdAt}
                                    comment_id={comment._id}
                                    likesArray={comment.likes}
                                />
                            </div>
                        </div>
                    ))}
            </section>
        </>
    );
};

export default PostComments;
