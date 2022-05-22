import { useEffect, useState } from 'react';

import { BiBookmark } from 'react-icons/bi';
import { RiHeart2Line } from 'react-icons/ri';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import Axios from '../../http/axios';

import { PostReactionProps } from '../../Types';

const PostReaction = ({
    likes,
    unicorns,
    bookmarks,
    setPostData,
}: PostReactionProps) => {
    const [isClicked, setIsClicked] = useState({
        like: false,
        unicorn: false,
        bookmark: false,
    });

    const { userAuthState } = useAuthProvider();

    const { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle animation
    const handleClicked = (name: keyof typeof isClicked) => {
        !userAuthState.login &&
            navigate('/login', { state: { from: location } });
        setIsClicked({ ...isClicked, [name]: !isClicked[name] });
    };

    const handlePostData = (key: string, arr: any) => {
        setPostData((oldData) => ({
            ...oldData,
            [key]: arr,
        }));
    };

    // handle like
    const handleReaction = async (
        reactionArray: string[],
        reactionName: string,
        apiAddress: string,
    ) => {
        const oldArray = reactionArray;

        // @ts-ignore update screen
        if (!reactionArray.includes(userAuthState.id)) {
            handlePostData(reactionName, [
                ...reactionArray,
                userAuthState.id ?? '',
            ]);
        } else {
            const array = reactionArray.filter(
                (user) => user !== userAuthState.id,
            );
            handlePostData(reactionName, array);
        }

        // update type for unicorn and bookmark on backend then forntend
        // redirect to login if not logged in
        try {
            const { data } = await Axios.put(`/post/${postId}/${apiAddress}`);

            !data.success && handlePostData(reactionName, oldArray);

            data.success &&
                handlePostData(reactionName, data.post[reactionName]);
        } catch (error) {
            console.log(error);

            handlePostData(reactionName, oldArray);
        }
    };

    useEffect(() => {
        setIsClicked({
            ...isClicked,
            // @ts-ignore
            like: likes.includes(userAuthState.id),
            // @ts-ignore
            unicorn: unicorns.includes(userAuthState.id),
            // @ts-ignore
            bookmark: bookmarks.includes(userAuthState.id),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <section className="post-reaction-sidebar post-sticky-4px">
                <div className="post-reaction-bottom">
                    {/* Like */}
                    <button
                        className={`post-action-icons ${
                            isClicked.like ? 'clicked-like' : ''
                        }`}
                    >
                        <span
                            className={`post-single-heart icons-p-2 radius-50 ${
                                isClicked.like ? 'post-single-heart-liked' : ''
                            }`}
                            onClick={() => {
                                handleClicked('like');
                                handleReaction(likes, 'likes', 'like');
                            }}
                        >
                            <RiHeart2Line
                                className="profile-svg svg"
                                style={{
                                    width: '1.5rem',
                                    fill: 'currentcolor',
                                }}
                            />
                        </span>
                        <span>{likes.length}</span>
                    </button>

                    {/* Unicorns */}
                    <button
                        className={`post-action-icons ${
                            isClicked.unicorn ? 'clicked-unicorn' : ''
                        }`}
                    >
                        <span
                            className={`post-single-unicorn icons-p-2 radius-50 ${
                                isClicked.unicorn
                                    ? 'post-single-unicorn-liked'
                                    : ''
                            }`}
                            onClick={() => {
                                handleClicked('unicorn');
                                handleReaction(unicorns, 'unicorns', 'unicorn');
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                role="img"
                                aria-hidden="true"
                                className="profile-svg svg"
                                style={{
                                    width: '1.5rem',
                                    fill: 'currentcolor',
                                }}
                            >
                                <path d="M5.645 8.013c.013-.265-.261-.323-.4-.183-1.16 1.17-1.822 3.865-.344 7.32.294.961 1.938 3.19.84 6.131l-.003.006c-.094.255.206.404.366.263 1.395-1.226 1.933-3.593 1.1-6.375-.488-1.657-1.955-4.226-1.559-7.162zm-3.22 2.738c.05-.137-.124-.417-.326-.225-.939.893-1.316 2.863-.976 4.605.547 2.878 2.374 3.526 2.066 6.629-.028.102.176.38.348.154 1.546-2.033.409-4.453-.241-6.006-1.005-2.386-1.087-4.118-.871-5.157z"></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.622 7.223l8.579-3.68c.598-.256 1.087.547.6.985l-6.618 5.941c.881 2.043 2.738 6.34 2.931 6.775 1.348 3.031-2.055 4.918-3.807 3.583a7.027 7.027 0 01-.623-.574c-.974-.965-2.419-2.398-5.207-1.877.284-2.115-.313-3.737-.883-5.288-.38-1.032-.747-2.032-.837-3.124-.346-3.329 3.763-8.23 4.696-7.953.386.115.326 1.229.266 2.319-.051.948-.102 1.88.143 2.12.145.142.428.43.76.773zM11.5 16.5l2.5.5 2.5 2 1-.5-2-4.5-1.5-4-1.5-1-1-1-1-1.5L10 8l-.5 1.5 1 2.5 1 4.5z"
                                ></path>
                            </svg>
                        </span>
                        <span>{unicorns.length}</span>
                    </button>

                    {/* Bookmarks */}
                    <button
                        className={`post-action-icons ${
                            isClicked.bookmark ? 'clicked-bookmark' : ''
                        }`}
                    >
                        <span
                            className={`post-single-bookmark icons-p-2 radius-50 ${
                                isClicked.bookmark
                                    ? 'post-single-bookmark-liked'
                                    : ''
                            }`}
                            onClick={() => {
                                handleClicked('bookmark');
                                handleReaction(
                                    bookmarks,
                                    'bookmarks',
                                    'bookmark',
                                );
                            }}
                        >
                            <BiBookmark
                                style={{
                                    width: '1.5rem',
                                    fill: 'currentcolor',
                                }}
                                className="profile-svg svg"
                            />
                        </span>

                        <span>{bookmarks.length}</span>
                    </button>
                </div>
            </section>
        </>
    );
};

export default PostReaction;
