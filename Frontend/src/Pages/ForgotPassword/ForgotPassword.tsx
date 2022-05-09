import ForgotPasswordForm from '../../Components/ForgotPasswordPage/ForgotPasswordForm';
import LoginHeader from '../../Components/LoginPage/LoginHeader';
import useScrollToTop from '../../Hooks/useScrollToTop';

const ForgotPassword = () => {
    useScrollToTop();

    return (
        <>
            <div className="component component-center component-justify">
                <div className="auth-component">
                    <LoginHeader />
                    <ForgotPasswordForm />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
