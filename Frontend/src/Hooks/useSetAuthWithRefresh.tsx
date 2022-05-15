import axios from 'axios';

import { useEffect } from 'react';
import { useAuthProvider } from '../Context/Auth/AuthProvider';

const useSetAuthWithRefresh = () => {
    const { userAuthDispatch } = useAuthProvider();

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        const getUserData = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/refresh`,
                    {
                        withCredentials: true,
                        signal: controller.signal,
                    },
                );

                if (!unMounted) {
                    userAuthDispatch({
                        type: 'LOGIN',
                        payload: {
                            user_id: data?.user.user_id,
                            username: data?.user.username,
                            name: data?.user.name,
                            email: data?.user.email,
                            photo: data?.user.profile_photo.secure_url,
                        },
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUserData();

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useSetAuthWithRefresh;
