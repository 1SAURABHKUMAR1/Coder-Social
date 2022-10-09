import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Posts from '../../Components/Posts/Posts';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { SmallPost } from '../../Types';

import { searchPost } from '../index';

const Search = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { searchPosts, searchPostState } = useAppSelector(
        (state) => state.search,
    );

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(
            searchPost({
                controller,
                unMounted,
                // @ts-ignore
                searchParams: searchParams.get('text'),
            }),
        );

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    if (searchPostState === 'REJECTED' || searchPosts.length === 0) {
        return (
            <div className="component component-no-p-m  component-pt-5">
                <div className="container-layout  flex flex-column">
                    <div className="width-100 component-justify flex not-found-header">
                        No post found for "{searchParams.get('text')}"
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="component component-no-p-m  component-pt-5">
                <div className="container-layout  flex flex-column">
                    <div className="width-100 component-justify flex header-container">
                        Search results for "{searchParams.get('text')}"
                    </div>
                    <div className="max-w-50 container container-post">
                        <ul>
                            {searchPosts.length !== 0 &&
                                searchPosts.map((post: SmallPost) => (
                                    <Posts
                                        image={post?.image?.secure_url}
                                        heading={post.title}
                                        id={post.post_id}
                                        authorImage={
                                            post.author.profile_photo.secure_url
                                        }
                                        authorName={post.author.name}
                                        authorUsername={post.author.username}
                                        postDate={post.createdAt}
                                        numberOfComments={post.comments.length}
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
        </>
    );
};

export default Search;
