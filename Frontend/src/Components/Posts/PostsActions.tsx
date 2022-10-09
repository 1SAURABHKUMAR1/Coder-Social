import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { RiHeart2Line, RiChat1Line } from 'react-icons/ri';

import { PostActionsProps } from '../../Types';

import { postReaction } from '../../features';

const PostsActions = ({
    numberOfLikes,
    numberOfComments,
    timeToRead,
    postId,
    bookmarkArray,
}: PostActionsProps) => {
    const [bookmarked, setBookmarked] = useState<boolean>(false);

    const { login, id } = useAppSelector((state) => state.authenticate);
    const { reactionStatus } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const handleBookmark = async () => {
        if (!login) {
            navigate('/login', { state: { from: location } });
        }

        setBookmarked(!bookmarked);

        dispatch(
            postReaction({
                postId,
                reactionName: 'bookmarks',
                apiName: 'bookmark',
            }),
        );
    };

    useEffect(() => {
        setBookmarked(bookmarkArray.includes(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        reactionStatus === 'REJECTED' && setBookmarked(!bookmarked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reactionStatus]);

    return (
        <>
            <div className="post-like-comment">
                <Link
                    to={`/post/${postId}`}
                    className="post-like"
                    data-testid="post-like"
                >
                    <RiHeart2Line style={{ fontSize: '1.25rem' }} />
                    <div className="post-number">
                        {numberOfLikes ? numberOfLikes : '0'}
                        <span className="post-text">reactions</span>
                    </div>
                </Link>

                <Link
                    to={`/post/${postId}#comment`}
                    className="post-comment"
                    data-testid="post-comment"
                >
                    <RiChat1Line style={{ fontSize: '1.25rem' }} />
                    <div className="post-number">
                        {numberOfComments ? numberOfComments : '0'}
                        <span className="post-text">comments</span>
                    </div>
                </Link>
            </div>

            <div className="post-read-save" data-testid="post-bookmark">
                <div className="post-read-time">
                    {timeToRead ? timeToRead : 0} min read
                </div>
                <div className="post-save" onClick={handleBookmark}>
                    {bookmarked ? 'Saved' : 'Save'}
                </div>
            </div>
        </>
    );
};

export default PostsActions;
