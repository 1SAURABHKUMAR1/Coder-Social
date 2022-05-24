import { useState } from 'react';

import { GrClose } from 'react-icons/gr';

import LoaderButton from '../Shared/Loader/LoaderButton';

import SuccessToast from '../../Toast/Success';
import ErrorToast from '../../Toast/Error';

import Axios from '../../http/axios';

import { deleteCommentProps } from '../../Types';

const DeleteComment = ({
    showModal,
    handleModal,
    commentId,
    updateComment,
}: deleteCommentProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            const { data } = await Axios.delete(`/comment/${commentId}`);

            setLoading(false);
            data.success && SuccessToast('Comment Deleted');
            data.success &&
                updateComment((oldData) => ({
                    ...oldData,
                    comments: [
                        ...oldData.comments.filter(
                            (item) => item.comment_id !== commentId,
                        ),
                    ],
                }));
            !data.success && ErrorToast('Failed');

            data.success && handleModal();
        } catch (error) {
            ErrorToast('Failed');

            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            {showModal && (
                <div className="modal-wrapper">
                    <div className="modal-box">
                        <div className="modal-side">
                            <GrClose
                                onClick={handleModal}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <div className="modal-flex">
                            <div className="modal-heading">
                                Confirm Deletion of Comemnt?
                            </div>
                            {loading ? (
                                <LoaderButton />
                            ) : (
                                <button
                                    className="modal-button"
                                    onClick={handleDelete}
                                >
                                    Delete Comment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteComment;
