import emailIcon from '../assets/image/email-svgrepo-com.svg'
import { Style } from '../assets/Style';
function SignInWithEmail() {
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
            transition: '0.3s'
        },
        emailImage: {
            width: '30px',
            height: '30px',
        }
    }
    return (
        <div style={styles.container}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "grey";
                e.currentTarget.style.scale = "1.03";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.scale = "1";
            }}
        >
            <img src={emailIcon} style={styles.emailImage} />
            <span>Sign In With Email</span>
        </div>
    );
}
export default SignInWithEmail;