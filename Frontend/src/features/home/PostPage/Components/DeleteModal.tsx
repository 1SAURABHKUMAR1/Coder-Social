import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { GrClose } from 'react-icons/gr';

import LoaderButton from '../../../../Components/Loader/LoaderButton';

import SuccessToast from '../../../../Toast/Success';
import ErrorToast from '../../../../Toast/Error';

import Axios from '../../../../Services/http/axios';

import { showModalProps } from '../../../../Types';

const DeleteModal = ({ showModal, handleModal, postId }: showModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            setLoading(true);

            const { data } = await Axios.delete(`/post/${postId}`);

            setLoading(false);
            !data.success && ErrorToast('Failed to Delete');

            data.success && handleModal();
            data.success && SuccessToast('Post Deleted');
            data.success &&
                setTimeout(() => {
                    navigate('/');
                }, 1000);
        } catch (error) {
            ErrorToast('Failed to delete');

            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            {showModal && (
                <div className="modal-wrapper">
                    <div className="modal-box" data-testid="post-delete-modal">
                        <div className="modal-side">
                            <GrClose
                                data-testid="post-delete-modal-close"
                                onClick={handleModal}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <div className="modal-flex">
                            <div className="modal-heading">
                                Confirm Deletion of Post?
                            </div>
                            {loading ? (
                                <LoaderButton />
                            ) : (
                                <button
                                    className="modal-button"
                                    onClick={handleDelete}
                                    data-testid="post-delete-modal-button"
                                >
                                    Delete Account
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
