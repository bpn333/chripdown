import googleIcon from '../assets/image/Google__G__logo.svg'
import { Style } from '../assets/Style';
function SignInWithGoogle() {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '300px',
            height: '50px',
            border: '1px solid ' + Style.primaryLite,
            fontSize: '20px',
            color: Style.primary,
            cursor: 'pointer',
            userSelect: 'none',
            fontFamily: Style.font1,
        },
        googleImage: {
            width: '30px',
            height: '30px',
        }
    }
    return (
        <div className="signInWithGoogle" style={styles.container}>
            <img src={googleIcon} style={styles.googleImage} />
            <span>Sign In With Google</span>
        </div>
    );
}
export default SignInWithGoogle;