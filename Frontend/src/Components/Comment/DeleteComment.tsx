import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteComment } from '../../features';

import { GrClose } from 'react-icons/gr';

import LoaderButton from '../Loader/LoaderButton';

import { deleteCommentProps } from '../../Types';

const DeleteComment = ({
    showModal,
    handleModal,
    commentId,
}: deleteCommentProps) => {
    const dispatch = useAppDispatch();
    const { reactionStatus } = useAppSelector((state) => state.post);

    const handleDelete = () => {
        dispatch(deleteComment(commentId));
        handleModal();
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
                                Confirm Deletion of Comment?
                            </div>
                            {reactionStatus === 'PENDING' ? (
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
