import { useEffect, useState } from 'react';

import EditProfileForm from '../../Components/EditProfile/EditProfileForm';

import useScrollToTop from '../../Hooks/useScrollToTop';

import Axios from '../../http/axios';

const EditProfile = () => {
    useScrollToTop();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        username: '',
        photo: '',
        bio: '',
        portfolio_link: '',
        work: '',
        skills: '',
        education: '',
        location: '',
        githubUrl: '',
        twitterUrl: '',
    });

    const getData = async (unMounted: boolean, controller: AbortSignal) => {
        try {
            const { data } = await Axios.get(`/user/profile`, {
                signal: controller,
            });

            if (!unMounted) {
                setUserData({
                    name: data.user.name,
                    email: data.user.email,
                    username: data.user.username,
                    photo: data.user.profile_photo.secure_url,
                    bio: data.user?.bio ?? '',
                    portfolio_link: data.user?.portfolio_link ?? '',
                    work: data.user?.work ?? '',
                    skills: data.user?.skills ?? '',
                    education: data.user?.education ?? '',
                    location: data.user?.location ?? '',
                    githubUrl: data.user?.githubUrl ?? '',
                    twitterUrl: data.user?.twitterUrl ?? '',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let unMounted = false;
        const controller = new AbortController();

        getData(unMounted, controller.signal);

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
                <EditProfileForm userIntialData={userData} />
            </main>
        </>
    );
};

export default EditProfile;
