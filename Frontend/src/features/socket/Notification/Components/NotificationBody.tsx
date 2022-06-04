import { NotificationBodyProps } from '../../../../Types';
import ConvertDate from '../../../../Utils/ConvertDate';

const NotificationBody = ({
    actionType,
    senderName,
    commentBody,
    date,
}: NotificationBodyProps) => {
    const [dateOfAction] = ConvertDate(date, 'DD MMM');

    if (actionType === 'Like') {
        return (
            <>
                <div className="notification-details">
                    <span className="">{senderName} liked your post</span>
                    <span className="">{dateOfAction}</span>
                </div>
            </>
        );
    } else if (actionType === 'Comment') {
        return (
            <>
                <div className="details-comment">
                    <div className="notification-details">
                        <span className="">
                            {senderName} commented on your post
                        </span>
                        <span className="">{dateOfAction}</span>
                    </div>
                    <p className="notification-details-body">
                        "{commentBody && commentBody}"
                    </p>
                </div>
            </>
        );
    } else {
        return (
            <div className="notification-details">
                <span className="notification-details-title">
                    {senderName} followed you
                </span>
                <span className="notification-details-time">
                    {dateOfAction}
                </span>
            </div>
        );
    }
};

export default NotificationBody;
