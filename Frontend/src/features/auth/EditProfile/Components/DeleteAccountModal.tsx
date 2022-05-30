import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteProfile, setStateName } from '../../authSlice';

import { GrClose } from 'react-icons/gr';

import LoaderButton from '../../../../Components/Loader/LoaderButton';

import { DeleteModalProps } from '../../../../Types';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

const DeleteAccountModal = ({
    showModal,
    handleDeleteModal,
}: DeleteModalProps) => {
    const { deleteProfileState } = useAppSelector(
        (state) => state.authenticate,
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        dispatch(deleteProfile('delete'));
    };

    useEffect(() => {
        if (deleteProfileState === 'FULFILLED') {
            dispatch(
                setStateName({
                    stateName: 'deleteProfileState',
                    stateValue: 'IDLE',
                }),
            );

            setTimeout(() => {
                navigate(`/`);
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteProfile]);

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
                            {deleteProfileState === 'PENDING' ? (
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
