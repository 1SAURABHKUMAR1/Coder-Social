import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { RiHeart2Line, RiChat1Line } from 'react-icons/ri';

import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

import { PostActionsProps } from '../../../Types';

import Axios from '../../../http/axios';

const PostsActions = ({
    numberOfLikes,
    numberOfComments,
    timeToRead,
    postId,
    bookmarkArray,
}: PostActionsProps) => {
    const [bookmarked, setBookmarked] = useState<boolean>(false);

    const {
        userAuthState: { id, login },
    } = useAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();

    const handleBookmark = async () => {
        if (!login) {
            navigate('/login', { state: { from: location } });
        }

        setBookmarked(!bookmarked);

        try {
            const { data } = await Axios.put(`/post/${postId}/bookmark`);

            !data.success && setBookmarked(!bookmarked);
        } catch (error) {
            console.log(error);

            setBookmarked(!bookmarked);
        }
    };

    useEffect(() => {
        // @ts-ignore
        setBookmarked(bookmarkArray.includes(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="post-like-comment">
                <Link to={`/post/${postId}`} className="post-like">
                    <RiHeart2Line style={{ fontSize: '1.25rem' }} />
                    <div className="post-number">
                        {numberOfLikes ? numberOfLikes : '0'}
                        <span className="post-text">reactions</span>
                    </div>
                </Link>

                <Link to={`/post/${postId}#comment`} className="post-comment">
                    <RiChat1Line style={{ fontSize: '1.25rem' }} />
                    <div className="post-number">
                        {numberOfComments ? numberOfComments : '0'}
                        <span className="post-text">comments</span>
                    </div>
                </Link>
            </div>

            <div className="post-read-save">
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
