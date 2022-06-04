import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks';

import axios from 'axios';
import { socket } from '../Services/http/socket';

import { refreshToken, setStateNameSocket } from '../features';

const useSetAuthWithRefresh = () => {
    const dispatch = useDispatch();
    const { login, id: userId } = useAppSelector((state) => state.authenticate);
    const { socketConnectedState } = useAppSelector((state) => state.socket);

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
            controller.abort();
            unMounted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (login) {
            if (socketConnectedState === 'DISCONNECTED') {
                socket.emit('joinNewUser', {
                    userId,
                });
            }
            dispatch(
                setStateNameSocket({
                    stateName: 'socketConnectedState',
                    stateValue: 'CONNECTED',
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);
};

export default useSetAuthWithRefresh;
