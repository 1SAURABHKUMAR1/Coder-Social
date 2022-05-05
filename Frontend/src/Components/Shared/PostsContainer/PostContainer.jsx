import Posts from '../Posts/Posts';

const PostContainer = () => {
    return (
        <>
            <div className="container-post container">
                <ul>
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                </ul>
            </div>
        </>
    );
};

export default PostContainer;
