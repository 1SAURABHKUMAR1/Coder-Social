import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getProfile, EditProfileForm } from '../../index';

import useScrollToTop from '../../../Hooks/useScrollToTop';
import { AppDispatch } from '../../../Types';

const EditProfile = () => {
    useScrollToTop();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        let unMounted = false;
        const controller = new AbortController();

        dispatch(getProfile({ controller, unMounted }));

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <main className="component component-center profile-component">
                <div className="profile-edit-form-header">Profile Settings</div>
                <EditProfileForm />
            </main>
        </>
    );
};

export default EditProfile;
