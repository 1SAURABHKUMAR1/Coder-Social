import { RiChat1Line, RiHeart2Line } from 'react-icons/ri';

import { CommentLikeReplyProps } from '../../Types';

const CommentLikeReply = ({ likes_array }: CommentLikeReplyProps) => {
    return (
        <>
            <div className="flex gap-5 align-center">
                <div className="flex align-center gap-2 cursor-pointer">
                    {/* TODO: | on like if logged in   and red if liked */}
                    <RiHeart2Line />
                    <span className="font-sm post-author-date">
                        {likes_array.length}
                    </span>
                </div>

                <div className="flex align-center gap-2 cursor-pointer">
                    {/* TODO: only comment and like if logged in */}
                    <RiChat1Line />
                    <span className="font-sm post-author-date">Reply</span>
                </div>
            </div>
        </>
    );
};

export default CommentLikeReply;
