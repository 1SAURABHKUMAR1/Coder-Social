import { useState } from 'react';

import { postEditProps } from '../../Types';

import DeleteModal from './DeleteModal';

const PostEditDelete = ({ postId }: postEditProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const toggleModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    return (
        <>
            <div className="post-author flex-start width-100 width-max gap-3">
                <DeleteModal
                    showModal={showDeleteModal}
                    handleModal={toggleModal}
                    postId={postId}
                />
                <button className="margin-0 edit-delete-button padding-button border-2">
                    {/* TODO: */}
                    Edit
                </button>
                <button
                    className="margin-0 edit-delete-button padding-button border-2"
                    onClick={toggleModal}
                >
                    Delete
                </button>
            </div>
        </>
    );
};

export default PostEditDelete;
