import SignInWithGoogle from "../components/SignInWithGoogle";
import { Colors } from "../assets/Colors";
import auth from "../auth/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../auth/AuthProvider";
import Spinner from "../components/Spinner";

function Login() {
    const { user, loading } = useAuth();
    const signInGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh",
            userSelect: "none"
        },
        heading: {
            fontSize: "40px",
            color: Colors.Primary,
            marginBottom: "20px",
            fontFamily: "Kumar One"
        },
        //yoinked style from https://orbitbymozilla.com/
        name: {
            background: "linear-gradient(90deg, rgb(193, 105, 255) 0%, rgb(117, 120, 255) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontFamily: "Roboto Mono"
        },
    }
    if (loading) {
        return (
            <Spinner />
        );
    }
    if (user) {
        window.location.href = "/home";
    }
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to <span style={styles.name}>ChripDown</span></h1>
            <div onClick={(e) => { signInGoogle() }}>
                <SignInWithGoogle />
            </div>
        </div>
    );
}
export default Login;