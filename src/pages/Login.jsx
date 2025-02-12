import SignInWithGoogle from "../components/SignInWithGoogle";
import { Style } from "../assets/Style";
import auth from "../auth/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../auth/AuthProvider";
import Spinner from "../components/Spinner";
import { useMemo, useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

function Login() {
    const { user, loading } = useAuth();
    const [docInProgress, setDocInProgress] = useState(false);
    const [gradient, setGradient] = useState("linear-gradient(90deg, rgb(193, 105, 255) 0%, rgb(117, 120, 255) 100%) text");

    const signInGoogle = async () => {
        setDocInProgress(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const db = getFirestore();
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (!userDocSnap.exists()) {
                const newUser = {
                    email: user.email,
                    img: user.photoURL,
                    joined: user.metadata.creationTime,
                    username: user.displayName,
                    chrips: []
                };
                await setDoc(userDocRef, newUser);
            }
            setDocInProgress(false);
            window.location.href = "/home";
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            setDocInProgress(false);
        }
    };


    const handleMouseMove = () => {
        if (Math.random() < 0.93) return;
        const randomColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        const randomColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        setGradient(`linear-gradient(90deg, ${randomColor1} 0%, ${randomColor2} 100%) text`);
    };

    const styles = useMemo(() => ({
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
            color: Style.primary,
            marginBottom: "20px",
            fontFamily: Style.font3
        },
        //yoinked style from https://orbitbymozilla.com/
        name: {
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontFamily: Style.font1
        },
    }), [gradient, Style]);

    if (loading) {
        return (
            <Spinner />
        );
    } else if (user && !docInProgress) {
        window.location.href = "/home"
    }
    return (
        <div style={styles.container} onMouseMove={handleMouseMove}>
            <h1 style={styles.heading}>Welcome to <span style={styles.name}>ChripDown</span></h1>
            <div onClick={(e) => { signInGoogle() }}>
                <SignInWithGoogle />
            </div>
        </div >
    );
}
export default Login;