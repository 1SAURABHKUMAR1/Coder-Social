import { useEffect, useState } from 'react';

import Posts from '../../Shared/Posts/Posts';

import Axios from '../../../http/axios';

import { Post } from '../../../Types';

const PostContainer = () => {
    const [posts, setPosts] = useState<Array<Post>>([]);

    const getPosts = async (
        controller: AbortController,
        unMounted: boolean,
    ) => {
        try {
            const { data } = await Axios.get('/post', {
                signal: controller.signal,
            });

            !unMounted && data.success && setPosts(data.post);
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
            <div className="container-post container">
                <ul>
                    {posts &&
                        posts.map((post) => (
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
                            />
                        ))}
                </ul>
            </div>
        </>
    );
};

export default PostContainer;
