import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BiBookmark } from 'react-icons/bi';
import { RiHeart2Line } from 'react-icons/ri';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { PostReactionProps } from '../../../../Types';

import { postReaction, setStateNamePost } from '../../../index';

import { socket } from '../../../../Services/http/socket';

const PostReaction = ({ likes, unicorns, bookmarks }: PostReactionProps) => {
    const { postId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isClicked, setIsClicked] = useState({
        like: false,
        unicorn: false,
        bookmark: false,
    });
    const { id, login } = useAppSelector((state) => state.authenticate);
    const {
        reactionStatus,
        singlePost: {
            author: { name: recieverName, _id: recieverUserId },
        },
    } = useAppSelector((state) => state.post);
    const { socketConnectedState } = useAppSelector((state) => state.socket);

    const { name: senderName, photo: senderProfilePic } = useAppSelector(
        (state) => state.authenticate,
    );

    const handleReaction = async (
        reactionName: 'likes' | 'bookmarks' | 'unicorns',
        apiAddress: 'like' | 'bookmark' | 'unicorn',
    ) => {
        if (!login) {
            navigate('/login', { state: { from: location } });
        }

        setIsClicked({
            ...isClicked,
            [apiAddress]: !isClicked[apiAddress],
        });

        dispatch(
            postReaction({
                // @ts-ignore
                postId,
                reactionName,
                apiName: apiAddress,
            }),
        );

        if (
            socketConnectedState === 'CONNECTED' &&
            !likes.includes(id) &&
            reactionName === 'likes'
        ) {
            socket.emit('likedPost', {
                postId: postId,
                sender: {
                    name: senderName,
                    profile_image: senderProfilePic,
                    userId: id,
                },
                reciever: {
                    name: recieverName,
                    userId: recieverUserId,
                },
            });
        }
    };

    useEffect(() => {
        setIsClicked({
            ...isClicked,
            like: likes.includes(id),
            unicorn: unicorns.includes(id),
            bookmark: bookmarks.includes(id),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        reactionStatus === 'REJECTED' &&
            dispatch(
                setStateNamePost({
                    stateName: 'reactionStatus',
                    stateValue: 'IDLE',
                }),
            );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reactionStatus]);

    return (
        <>
            <section className="post-reaction-sidebar post-sticky-4px">
                <div className="post-reaction-bottom">
                    {/* Like */}
                    <button
                        className={`post-action-icons ${
                            isClicked.like ? 'clicked-like' : ''
                        }`}
                        data-testid="like-button"
                    >
                        <span
                            className={`post-single-heart icons-p-2 radius-50 ${
                                isClicked.like ? 'post-single-heart-liked' : ''
                            }`}
                            onClick={() => {
                                handleReaction('likes', 'like');
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
                        data-testid="unicorn-button"
                    >
                        <span
                            className={`post-single-unicorn icons-p-2 radius-50 ${
                                isClicked.unicorn
                                    ? 'post-single-unicorn-liked'
                                    : ''
                            }`}
                            onClick={() => {
                                handleReaction('unicorns', 'unicorn');
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
                        data-testid="bookmark-button"
                    >
                        <span
                            className={`post-single-bookmark icons-p-2 radius-50 ${
                                isClicked.bookmark
                                    ? 'post-single-bookmark-liked'
                                    : ''
                            }`}
                            onClick={() => {
                                handleReaction('bookmarks', 'bookmark');
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
