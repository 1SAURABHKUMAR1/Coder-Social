import { RiChat1Line, RiHeart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAuthProvider } from '../../Context/Auth/AuthProvider';
import { PostCommentsProps } from '../../Types';

const PostComments = ({
    noOfComments = 34,
    commentArray,
}: PostCommentsProps) => {
    const {
        userAuthState: { userId, photo: user_avatar, login },
    } = useAuthProvider();

    return (
        <>
            <section className="padding-top-2" id="comment">
                <h1 className="auth-welcome-header-bold">
                    Discussion ({noOfComments})
                </h1>
                {login && (
                    <div className="padding-top-3">
                        <div className="post-author width-100 align-start">
                            {/* TODO: */}
                            <Link to="/" className="post-author-image">
                                <img
                                    src={user_avatar}
                                    alt="autor-single"
                                    className="image image-round"
                                />
                            </Link>
                            <div className="width-100">
                                <textarea className="width-100 comment-text-area scrollbar-hidden" />
                                <div className="padding-top-2">
                                    {/* TODO: */}
                                    <button
                                        id="submit-primary-button"
                                        className="margin-0  padding-button border-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TODO: array */}
                <div className="padding-top-7">
                    <div className="post-author width-100 align-start">
                        <div className="post-author-image">
                            <img
                                src={
                                    // TODO:
                                    'https://res.cloudinary.com/practicaldev/image/fetch/s--YUdYmPrk--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/352636/a201c8d8-9ab8-4d01-9727-c16eb41c4fe1.png'
                                }
                                alt="autor-single"
                                className="image image-round"
                            />
                        </div>
                        <div className="width-100">
                            <div className="width-100 comment-single color-mid-gray">
                                <div className="post-author-description flex-col gap-3 align-center">
                                    {/* TODO:  link and jsx */}
                                    <Link to={'/'} className="post-author-name">
                                        <div>{'authorName'}</div>
                                    </Link>
                                    <span className="font-m-bold">•</span>
                                    {/* TODO: change to date */}
                                    <div className="post-author-date">
                                        {'postDate'}
                                    </div>
                                </div>
                                {/* TODO: */}
                                <div className="padding-top-3">
                                    I don't know if English is your first
                                    language, but that phrase is extremely
                                    condescending.
                                </div>
                            </div>
                            <div className="padding-top-2 flex gap-5 align-center font-m-bold color-mid-gray margin-x-sm">
                                <div className="flex align-center gap-2">
                                    {/* TODO: */}
                                    <RiHeart2Line />
                                    <span className="font-sm">{3}</span>
                                </div>

                                <div className="flex align-center gap-2">
                                    {/* TODO: */}
                                    <RiChat1Line />
                                    <span className="font-sm">{3}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PostComments;
