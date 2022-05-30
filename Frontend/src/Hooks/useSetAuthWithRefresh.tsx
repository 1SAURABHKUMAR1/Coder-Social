import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { refreshToken } from '../features';

const useSetAuthWithRefresh = () => {
    const dispatch = useDispatch();

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

                if (!unMounted && data.success) {
                    dispatch(refreshToken(data));
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
