import { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';

import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

import DeleteComment from './DeleteComment';

import { CommentEditProps } from '../../Types';

import { editComment } from '../../features/index';

const CommentEditDelete = ({
    commentBody,
    setCommentBody,
    showCommentEdit,
    setShowCommentEdit,
    comment_id,
    oldCommentBody,
}: CommentEditProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dispatch = useAppDispatch();

    const handleUpdate = () => {
        dispatch(editComment({ comment_body: commentBody, comment_id }));
        setShowCommentEdit(!showCommentEdit);
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
                        className="post-comment post-number"
                        onClick={handleUpdate}
                    >
                        Save
                    </div>
                    <div
                        className="post-comment post-number"
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
