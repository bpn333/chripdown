import googleIcon from '../assets/image/Google__G__logo.svg'
import { Colors } from '../assets/Colors';
function SignInWithGoogle() {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '300px',
            height: '50px',
            border: '1px solid ' + Colors.PrimaryLite,
            fontSize: '20px',
            color: Colors.Primary,
            cursor: 'pointer',
            userSelect: 'none',
            fontFamily: 'Roboto Mono',
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