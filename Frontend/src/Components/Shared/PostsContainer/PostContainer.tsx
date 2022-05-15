import Posts from '../Posts/Posts';

const PostContainer = () => {
    return (
        <>
            <div className="container-post container">
                <ul>
                    <Posts
                        image={''}
                        heading={''}
                        id={''}
                        authorImage={''}
                        authorName={''}
                        authorUsername={''}
                        postDate={''}
                        numberOfComments={0}
                        numberOfLikes={0}
                        postDescription={''}
                        key={''}
                    />
                </ul>
            </div>
        </>
    );
};

export default PostContainer;
