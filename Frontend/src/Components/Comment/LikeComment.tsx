import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { RiHeart2Line } from 'react-icons/ri';

import { CommentLikeProps } from '../../Types';

import { likeComment } from '../../features/index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const LikeComment = ({ likes_array, comment_id }: CommentLikeProps) => {
    const [liked, setLiked] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { login, id } = useAppSelector((state) => state.authenticate);

    const handleLike = async () => {
        if (!login) {
            navigate('/login', { state: { from: location } });
            return;
        }

        setLiked(!liked);
        dispatch(likeComment(comment_id));
    };

    useEffect(() => {
        likes_array &&
            setLiked(
                likes_array.find((user) => user._id === id) ? true : false,
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                className="flex align-center gap-2 cursor-pointer icon-padding"
                style={{
                    backgroundColor: `${
                        liked ? 'var(--icon-like-background)' : 'transparent'
                    }`,
                }}
                data-testid="comment-like"
                onClick={handleLike}
            >
                <RiHeart2Line
                    style={{
                        fill: `${
                            liked ? 'var(--icon-color-like)' : 'currentColor'
                        }`,
                    }}
                />
                <span className="font-sm post-author-date">
                    {likes_array.length}
                </span>
            </div>
        </>
    );
};

export default LikeComment;
