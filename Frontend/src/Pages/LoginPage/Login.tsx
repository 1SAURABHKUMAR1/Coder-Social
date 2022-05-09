import LoginHeader from '../../Components/LoginPage/LoginHeader';
import OauthForm from '../../Components/Oauth/OauthForm';
import LoginForm from '../../Components/LoginPage/LoginForm';
import useScrollToTop from '../../Hooks/useScrollToTop';

const Login = () => {
    useScrollToTop();

    return (
        <div className="component component-center">
            <div className="auth-component">
                <LoginHeader />
                <OauthForm />
                <div className="form-seperation">Or</div>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
