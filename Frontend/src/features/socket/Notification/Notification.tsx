import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../../Components/Loader/LoaderMain';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { notificationSingle } from '../../../Types';

import { getAllNotification, NotificationBody } from '../../index';

const Notification = () => {
    const dispatch = useAppDispatch();
    const { allNotifications, notificationStatus } = useAppSelector(
        (state) => state.socket,
    );

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(
            getAllNotification({
                controller,
                unMounted,
            }),
        );

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (notificationStatus === 'PENDING') {
        return <Loader />;
    } else if (
        (notificationStatus === 'FULFILLED' && allNotifications.length === 0) ||
        notificationStatus === 'REJECTED'
    ) {
        return (
            <div className="component component-no-p-m  component-pt-5">
                <div className="container-layout  flex flex-column">
                    <div className="width-100 component-justify flex not-found-header">
                        No Notification
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="component component-no-p-m  component-pt-5">
                <div className="container-layout  flex flex-column">
                    <div className="max-w-50 container container-post">
                        <ul>
                            {allNotifications.map(
                                (notification: notificationSingle) => (
                                    <div className="notification-wrapper">
                                        <Link
                                            to={`/user/profile/${notification.sender.username}`}
                                            className="notification-avatar"
                                            key={notification._id}
                                        >
                                            <img
                                                src={
                                                    notification.sender
                                                        .profile_photo
                                                        .secure_url
                                                }
                                                alt="avatar"
                                                className="image height-full"
                                                loading="lazy"
                                                key={notification._id}
                                            />
                                        </Link>

                                        <NotificationBody
                                            actionType={notification.type}
                                            commentBody={
                                                notification?.comment?.body
                                            }
                                            date={notification.createdAt}
                                            senderName={
                                                notification.sender.name
                                            }
                                            key={notification._id}
                                        />
                                    </div>
                                ),
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
