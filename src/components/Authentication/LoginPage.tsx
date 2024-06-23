import LoginForm from './LoginForm';
import RandomLogo from '../App/RandomLogo';


function LoginPage() {
    return (
        <>
            <RandomLogo figure='knight' />
            <LoginForm action='login'/>
        </>
    );
}

export default LoginPage;
