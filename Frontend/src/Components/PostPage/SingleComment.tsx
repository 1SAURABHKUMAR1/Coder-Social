import { RiChat1Line, RiHeart2Line } from 'react-icons/ri';

import { Link } from 'react-router-dom';

import ConvertDate from '../../Utils/ConvertDate';

import { SingleCommentProps } from '../../Types';

const SingleComment = ({
    authorAvatar,
    authorName,
    authorUserName,
    commentBody,
    commentDate,
    comment_id,
    likesArray,
}: SingleCommentProps) => {
    const [dateOfComment] = ConvertDate(commentDate, 'MMM DD');

    return (
        <>
            <div className="post-author-image">
                <Link
                    to={`/user/profile/${authorUserName}`}
                    className="post-author-name"
                >
                    <img
                        src={authorAvatar}
                        alt="autor-single"
                        className="image image-round"
                    />
                </Link>
            </div>

            <div className="width-100">
                <div className="width-100 comment-single color-mid-gray">
                    <div className="post-author-description flex-col gap-3 align-center">
                        <Link
                            to={`/user/profile/${authorUserName}`}
                            className="post-author-name"
                        >
                            <div>{authorName}</div>
                        </Link>

                        <span className="font-m-bold">•</span>

                        <div className="post-author-date">{dateOfComment}</div>
                    </div>

                    <div className="padding-top-3">{commentBody}</div>
                </div>
                <div className="padding-top-2 flex gap-5 align-center font-m-bold color-mid-gray margin-x-sm">
                    <div className="flex align-center gap-2 cursor-pointer">
                        {/* TODO:  */}
                        <RiHeart2Line />
                        <span className="font-sm">{likesArray.length}</span>
                    </div>

                    <div className="flex align-center gap-2 cursor-pointer">
                        {/* TODO: only comment and like if logged in */}
                        <RiChat1Line />
                        <span className="font-sm">{3}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleComment;
