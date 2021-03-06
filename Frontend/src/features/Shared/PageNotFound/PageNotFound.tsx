import { Link } from 'react-router-dom';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import './PageNotFound.css';

const PageNotFound = () => {
    useScrollToTop();

    return (
        <div className="component page-not-found">
            <div className="error-numbers">
                <h1>4</h1>
                <h1>0</h1>
                <h1>4</h1>
            </div>
            <h2 className="page-not-found-header">Page not found</h2>
            <Link to="/" className="page-not-found-home">
                Back To Home
            </Link>
        </div>
    );
};

export default PageNotFound;
