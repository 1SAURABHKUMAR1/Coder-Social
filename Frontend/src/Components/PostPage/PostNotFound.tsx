import { Link } from 'react-router-dom';

const PostNotFound = () => {
    return (
        <main className="component component-center component-justify">
            <div className="not-found-header">
                <span className="text-primary">Post</span> Not Found
            </div>
            <Link
                to={'/'}
                className="button-primary profile-button not-found-button"
            >
                Return To Home
            </Link>
        </main>
    );
};

export default PostNotFound;
