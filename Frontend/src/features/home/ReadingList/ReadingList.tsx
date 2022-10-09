import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Link } from 'react-router-dom';

import Posts from '../../../Components/Posts/Posts';

import { SmallPost } from '../../../Types';

import { getBookmarks } from '../postSlice';

import { setStateNamePost } from '../../../features';

const ReadingList = () => {
    const { bookmark } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const { reactionStatus } = useAppSelector((state) => state.post);

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(getBookmarks({ controller, unMounted }));

        return () => {
            controller.abort();
            unMounted = true;
        };
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
            {bookmark.length !== 0 ? (
                <>
                    <main className="component component-center component-no-p-m profile-component">
                        <div className="profile-edit-form-header margin-mobile">
                            Reading List ({bookmark.length})
                        </div>

                        <div className="max-w-50 container container-post">
                            <ul data-testid="reading-list-list">
                                {bookmark.length !== 0 &&
                                    bookmark.map((post: SmallPost) => (
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
                    </main>
                </>
            ) : (
                <>
                    <main className="component component-center component-justify">
                        <div className="not-found-header">
                            <span className="text-primary">Reading List</span>{' '}
                            is empty!
                        </div>
                        <Link
                            to={'/'}
                            className="button-primary profile-button not-found-button"
                        >
                            Return To Home
                        </Link>
                    </main>
                </>
            )}
        </>
    );
};

export default ReadingList;
