import { Link } from 'react-router-dom';

const FormHeader = () => {
    return (
        <>
            <div className="auth-welcome-header">
                <div className="auth-welcome-header-bold">
                    Welcome to Coder Social Community
                </div>
                <div className="auth-welcome-header-description">
                    <Link to="/" className="link-primary-blue">
                        Coder Social
                    </Link>
                    is a community of 748,239 amazing developers.
                </div>
            </div>
        </>
    );
};

export default FormHeader;
