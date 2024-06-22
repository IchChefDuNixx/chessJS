import RandomLogo from '../App/RandomLogo';
import LoginForm from './LoginForm';


function RegisterPage() {
    return (
        <>
            <RandomLogo />
            <LoginForm action='register'/>
        </>
    );
}

export default RegisterPage;
