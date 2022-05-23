import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Posts from '../../Components/Shared/Posts/Posts';

import Axios from '../../http/axios';

import { Post } from '../../Types';

const ReadingList = () => {
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    const [posts, setPosts] = useState<Array<Post>>([]);

    const getPosts = async (
        controller: AbortController,
        unMounted: boolean,
    ) => {
        try {
            const { data } = await Axios.get('/user/readinglist', {
                signal: controller.signal,
            });

            if (!unMounted) {
                data.success && setPosts(data.bookmarks);
                data.success && setIsAvailable(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        getPosts(controller, unMounted);

        return () => {
            controller.abort();
            unMounted = true;
        };
    }, []);

    return (
        <>
            {isAvailable && posts.length >= 0 ? (
                <>
                    <main className="component component-center component-no-p-m profile-component">
                        <div className="profile-edit-form-header margin-mobile">
                            Reading List ({posts.length})
                        </div>

                        <div className="max-w-50 container container-post">
                            <ul>
                                {posts &&
                                    posts.map((post) => (
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
