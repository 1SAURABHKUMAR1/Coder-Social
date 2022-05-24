import { useState } from 'react';

import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

import DeleteComment from './DeleteComment';

import { CommentEditProps } from '../../Types';
import Axios from '../../http/axios';
import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

const CommentEditDelete = ({
    commentBody,
    setCommentBody,
    showCommentEdit,
    setShowCommentEdit,
    updateComment,
    comment_id,
    oldCommentBody,
}: CommentEditProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleUpdate = async () => {
        try {
            const { data } = await Axios.post(`/comment/edit`, {
                comment_body: commentBody,
                comment_id,
            });

            data.success &&
                updateComment((oldComment) => ({
                    ...oldComment,
                    comments: [
                        ...oldComment.comments.map((item) => {
                            if (item.comment_id === data.comment.comment_id) {
                                item.body = data.comment.body;
                                return item;
                            }
                            return item;
                        }),
                    ],
                }));

            data.success && SuccessToast('Comment Updated');
            data.success && setShowCommentEdit(!showCommentEdit);
            data.success && setCommentBody(data.comment.body);

            !data.success && ErrorToast('Failed');
        } catch (error) {
            ErrorToast('Failed');

            console.log(error);
        }
    };

    const toggleEdit = () => {
        setShowCommentEdit(!showCommentEdit);
        setCommentBody(oldCommentBody);
    };

    const toggleDelete = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    return (
        <>
            {showCommentEdit ? (
                <div className="flex gap-2 align-center color-mid-gray">
                    <div
                        className="post-comment post-number post-text"
                        onClick={handleUpdate}
                    >
                        Save
                    </div>
                    <div
                        className="post-comment post-number post-text"
                        onClick={toggleEdit}
                    >
                        Dismiss
                    </div>
                </div>
            ) : (
                <div className="flex gap-5 align-center color-mid-gray">
                    <DeleteComment
                        commentId={comment_id}
                        handleModal={toggleDelete}
                        showModal={showDeleteModal}
                        updateComment={updateComment}
                    />
                    <BiEditAlt
                        className="flex align-center gap-2 cursor-pointer"
                        onClick={toggleEdit}
                    />

                    <MdDeleteOutline
                        className="flex align-center gap-2 cursor-pointer"
                        onClick={toggleDelete}
                    />
                </div>
            )}
        </>
    );
};

export default CommentEditDelete;
