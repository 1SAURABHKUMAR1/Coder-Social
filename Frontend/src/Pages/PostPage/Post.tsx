import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import PostComments from '../../Components/PostPage/PostComments';
import PostNotFound from '../../Components/PostPage/PostNotFound';
import PostReaction from '../../Components/PostPage/PostReaction';
import PostSection from '../../Components/PostPage/PostSection';
import PostUserInfo from '../../Components/PostPage/PostUserInfo';

import useScrollToTop from '../../Hooks/useScrollToTop';

import { PostData } from '../../Types';

import Axios from '../../http/axios';

const Post = () => {
    const { postId } = useParams();
    const [isPostValid, setIsPostValid] = useState(false);
    const [postData, setPostData] = useState<PostData>({
        author: {
            name: '',
            profile_photo: {
                id: '',
                secure_url: '',
            },
            username: '',
            _id: '',
            bio: '',
            education: '',
            createdAt: '',
            location: '',
            user_id: '',
            work: '',
        },
        bookmarks: [],
        comments: [],
        createdAt: '',
        description: '',
        image: {
            id: '',
            secure_url: '',
        },
        likes: [],
        post_id: '',
        tags: [{ name: '', tag_id: '', _id: '' }],
        title: '',
        unicorns: [],
        _id: '',
    });

    useScrollToTop();

    const getPostInfo = async (
        controller: AbortController,
        unMounted: boolean,
    ) => {
        try {
            const { data } = await Axios.get(`/post/${postId}`, {
                signal: controller.signal,
            });

            !data.success && setIsPostValid(false);

            !unMounted && data.success && setPostData(data.post);
            !unMounted && data.success && setIsPostValid(true);
        } catch (error) {
            console.log(error);

            setIsPostValid(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        getPostInfo(controller, unMounted);

        return () => {
            controller.abort();
            unMounted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    return (
        <>
            {isPostValid ? (
                <div className="component component-no-p-m">
                    <div className="container-layout post-layout">
                        <PostReaction
                            likes={postData.likes}
                            unicorns={postData.unicorns}
                            bookmarks={postData.bookmarks}
                            setPostData={setPostData}
                        />
                        <div className="post-about-section">
                            <PostSection
                                image={postData.image?.secure_url}
                                heading={postData.title}
                                authorImage={
                                    postData.author.profile_photo.secure_url
                                }
                                authorName={postData.author.name}
                                authorUsername={postData.author.username}
                                postDate={postData.createdAt}
                                postId={postData.post_id}
                                postDescription={postData.description}
                                tagsArray={postData.tags}
                                authorUserId={postData.author.user_id}
                            >
                                <PostComments />
                            </PostSection>
                            <PostUserInfo
                                image_secure_url={
                                    postData.author.profile_photo.secure_url
                                }
                                bio={postData.author?.bio}
                                education={postData.author?.education}
                                joinedDate={postData.author.createdAt}
                                location={postData.author?.location}
                                user_id={postData.author?.user_id}
                                work={postData.author?.work}
                                username={postData.author.username}
                                name={postData.author.name}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <PostNotFound />
                </>
            )}
        </>
    );
};

export default Post;
