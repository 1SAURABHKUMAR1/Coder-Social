import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import Posts from '../../../Components/Posts/Posts';

import { getSingleTag, followUnfollowTag } from '../../index';

import randomColor from '../../../Utils/randomColor';

import { SmallPost } from '../../../Types';

const SingleTag = () => {
    const [color, setColor] = useState(() => randomColor());
    const [isFollowed, setIsFollowed] = useState(false);
    const { tagName } = useParams();
    const dispatch = useAppDispatch();
    const { singleTagStatus, singleTag, followUnfollowStatus } = useAppSelector(
        (state) => state.tags,
    );
    const { id } = useAppSelector((state) => state.authenticate);

    const handleFollow = () => {
        setIsFollowed(!isFollowed);

        dispatch(followUnfollowTag(singleTag.tag_id));
    };

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(
            getSingleTag({
                controller,
                unMounted,
                // @ts-ignore
                tagName,
            }),
        );

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line
    }, [tagName]);

    useEffect(() => {
        setIsFollowed(singleTag.followers.includes(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleTag]);

    return (
        <>
            {singleTagStatus === 'FULFILLED' && singleTag.name === tagName ? (
                <div className="component component-no-p-m  component-pt-5">
                    <div className="container-layout  flex flex-column">
                        <div className="width-100 component-justify flex">
                            <div
                                className="single-tag max-56 width-100"
                                style={{
                                    // @ts-ignore
                                    '--border-top-color': `rgba(${color}, 0.95)`,
                                }}
                            >
                                <div className="tag-header">
                                    <div className="tag-hash">
                                        <span
                                            className="single-tag-hash-single"
                                            style={{
                                                // @ts-ignore
                                                '--tag-color': `rgba(${color}, 0.95)`,
                                            }}
                                        >
                                            #
                                        </span>
                                        {singleTag.name}
                                    </div>

                                    <button
                                        className="tag-follow"
                                        disabled={
                                            followUnfollowStatus === 'PENDING'
                                        }
                                        onClick={handleFollow}
                                    >
                                        {isFollowed ? 'Unfollow' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="max-56 container container-post">
                            <ul>
                                {singleTag.posts.length > 0 &&
                                    singleTag.posts.map((post: SmallPost) => (
                                        <Posts
                                            image={post?.image?.secure_url}
                                            heading={post.title}
                                            id={post.post_id}
                                            authorImage={
                                                post.author.profile_photo
                                                    .secure_url
                                            }
                                            authorName={post.author.name}
                                            authorUsername={
                                                post.author.username
                                            }
                                            postDate={post.createdAt}
                                            numberOfComments={
                                                post.comments.length
                                            }
                                            numberOfLikes={post.likes.length}
                                            postDescription={post.description}
                                            key={post.post_id}
                                            tagsArray={post.tags}
                                            bookmarkArray={post.bookmarks}
                                        />
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <main className="component component-center component-justify">
                    <div className="not-found-header">
                        <span className="text-primary">Tag</span> Not Found
                    </div>
                    <Link
                        to={'/'}
                        className="button-primary profile-button not-found-button"
                    >
                        Return To Home
                    </Link>
                </main>
            )}
        </>
    );
};

export default SingleTag;
