import RandomLogo from './RandomLogo';
import LoginForm from './LoginForm';


function LoginPage() {
    return (
        <>
            <RandomLogo />
            <LoginForm action='login'/>
        </>
    );
}

export default LoginPage;
