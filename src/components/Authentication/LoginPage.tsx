import LoginForm from './LoginForm';
import RandomLogo from '../App/RandomLogo';


function LoginPage() {
    return (
        <>
            <RandomLogo />
            <LoginForm action='login'/>
        </>
    );
}

export default LoginPage;
