import Posts from '../Shared/Posts/Posts';

import { PostContainerProps } from '../../Types';

const PostContainer = ({ postArray }: PostContainerProps) => {
    return (
        <>
            <div className="container-post container">
                <ul>
                    {postArray.map((post) => (
                        <Posts
                            image={post.image.secure_url}
                            heading={post.title}
                            id={post.postId}
                            authorImage={post.author.image.secure_url}
                            authorName={post.author.name}
                            authorUsername={post.author.username}
                            postDate={post.createdAt}
                            numberOfComments={post.comments.length}
                            numberOfLikes={post.likes.length}
                            postDescription={post.description}
                            key={post.postId}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default PostContainer;
