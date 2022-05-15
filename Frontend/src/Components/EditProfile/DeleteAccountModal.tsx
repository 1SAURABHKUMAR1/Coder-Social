import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { GrClose } from 'react-icons/gr';

import LoaderButton from '../Shared/Loader/LoaderButton';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import Axios from '../../http/axios';

import { DeleteModalProps } from '../../Types';

const DeleteAccountModal = ({
    showModal,
    handleDeleteModal,
}: DeleteModalProps) => {
    const [loading, setLoading] = useState(false);
    const { userAuthDispatch } = useAuthProvider();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            setLoading(true);
            const { data } = await Axios.delete('/profile/delete');

            data.success &&
                userAuthDispatch({
                    type: 'LOGOUT',
                });

            setLoading(false);
            handleDeleteModal();
            data.success && SuccessToast('Account Deleted');
            data.success &&
                setTimeout(() => {
                    navigate(`/`);
                }, 1000);
        } catch (error) {
            ErrorToast('Account Delete Failed!');

            setLoading(false);
            console.log(error);
        }
    };

    return (
        <>
            {showModal && (
                <div className="modal-wrapper">
                    <div className="modal-box">
                        <div className="modal-side">
                            <GrClose
                                onClick={handleDeleteModal}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <div className="modal-flex">
                            <div className="modal-heading">
                                Confirm Deletion of Account?
                            </div>
                            {loading ? (
                                <LoaderButton />
                            ) : (
                                <button
                                    className="modal-button"
                                    onClick={handleDelete}
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

export default DeleteAccountModal;
