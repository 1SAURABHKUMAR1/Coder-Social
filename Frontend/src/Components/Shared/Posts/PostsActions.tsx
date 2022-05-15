import { RiHeart2Line, RiChat1Line } from 'react-icons/ri';
import { PostActionsProps } from '../../../Types';

const PostsActions = ({
    numberOfLikes,
    numberOfComments,
    timeToRead,
}: PostActionsProps) => {
    return (
        <>
            <div className="post-like-comment">
                <div className="post-like">
                    <RiHeart2Line style={{ fontSize: '1.25rem' }} />
                    <div className="post-number">
                        {numberOfLikes ? numberOfLikes : '0'}
                        <span className="post-text">reactions</span>
                    </div>
                </div>
                <div className="post-comment">
                    <RiChat1Line style={{ fontSize: '1.25rem' }} />
                    <div className="post-number">
                        {numberOfComments ? numberOfComments : '0'}
                        <span className="post-text">comments</span>
                    </div>
                </div>
            </div>
            <div className="post-read-save">
                <div className="post-read-time">
                    {timeToRead ? timeToRead : 0} min read
                </div>
                {/* Save button TODO: */}
                <div className="post-save">Save</div>
            </div>
        </>
    );
};

export default PostsActions;
