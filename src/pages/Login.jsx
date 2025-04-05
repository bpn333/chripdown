import SignInWithGoogle from "../components/SignInWithGoogle";
import SignInWithEmail from "../components/SignInWithEmail";
import { Style } from "../assets/Style";
import auth from "../auth/firebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../auth/AuthProvider";
import Spinner from "../components/Spinner";
import { useCallback, useMemo, useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [docInProgress, setDocInProgress] = useState(false);
    const [emailSign, setEmailSign] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [gradient, setGradient] = useState("linear-gradient(90deg, rgb(193, 105, 255) 0%, rgb(117, 120, 255) 100%) text");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [password, setPassword] = useState("");

    const fetchRandomImage = () => {
        setProfileImg("");
        fetch("https://picsum.photos/96/96")
            .then(response => setProfileImg(response.url))
            .catch(error => console.error("Error fetching random image:", error));
    };

    const signInGoogle = async () => {
        setDocInProgress(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // const isNewUser = result.additionalUserInfo.isNewUser; // Race condition here
            await createUserDoc(user);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            setDocInProgress(false);
        }
    };

    const createUserDoc = async (user) => {
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
        navigate("/home");
    }

    const handleEmailSignUp = async () => {
        if (!email || !profileImg || !name || !password) {
            alert('FILL ALL FIELD CAREFULLY');
            return;
        }
        setDocInProgress(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            await updateProfile(user, {
                displayName: name,
                photoURL: profileImg
            });
            await createUserDoc(user);
        } catch (error) {
            console.error("Error signing up with email: ", error);
            alert(error);
            setDocInProgress(false);
        }
    };

    const signInEmail = async () => {
        if (!email || !password) {
            alert('FILL ALL FIELD CAREFULLY');
            return;
        }
        setDocInProgress(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            console.error("Error logging in with email: ", error);
            alert(error);
            setDocInProgress(false);
        }
    };

    const handleMouseMove = useCallback(() => {
        if (Math.random() < 0.93) return;
        const randomColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        const randomColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        setGradient(`linear-gradient(90deg, ${randomColor1} 0%, ${randomColor2} 100%) text`);
    }, []);

    const styles = useMemo(() => ({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh",
            userSelect: "none",
            gap: "10px",
            padding: "20px"
        },
        heading: {
            fontSize: "50px",
            color: Style.primary,
            marginBottom: "20px",
            textAlign: 'center',
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
        input: {
            padding: "10px",
            margin: "5px 0",
            fontSize: "16px",
            fontFamily: Style.font1,
            borderRadius: "5px",
            border: `1px solid ${Style.primaryLite}`,
            width: "100%",
            maxWidth: "400px",
            boxSizing: "border-box"
        },
        button: {
            padding: "10px 20px",
            fontSize: "16px",
            fontFamily: Style.font2,
            backgroundColor: Style.primaryLite,
            color: Style.background,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "400px",
            boxSizing: "border-box"
        },
        imgPreview: {
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            margin: "10px 0"
        }
    }), [gradient, Style]);

    if (loading) {
        return (
            <Spinner />
        );
    } else if (user && !docInProgress) {
        navigate("/home");
    }
    return (
        <div style={styles.container} onMouseMove={handleMouseMove}>
            {!emailSign ?
                <>
                    <h1 style={styles.heading}>Welcome to <span style={styles.name}>ChripDown</span></h1>
                    <div onClick={signInGoogle}>
                        <SignInWithGoogle />
                    </div>
                    <div onClick={(e) => { setIsLogin(true); setEmailSign(true); }}>
                        <SignInWithEmail />
                    </div>
                </> :
                <>
                    {isLogin ? (
                        <>
                            <input
                                style={styles.input}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                style={styles.input}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button style={styles.button} onClick={signInEmail}>
                                Log In
                            </button>
                            <button style={styles.button} onClick={() => { setIsLogin(false); fetchRandomImage(); }}>
                                Sign Up Instead
                            </button>
                            <button style={styles.button} onClick={() => setEmailSign(false)}>
                                Go Back
                            </button>
                        </>
                    ) : (
                        <>
                            {profileImg ? <img
                                style={styles.imgPreview}
                                src={profileImg}
                                alt="Profile Preview"
                            /> : <Spinner />}
                            <button style={styles.button} onClick={fetchRandomImage}>
                                Random Image
                            </button>
                            <input
                                style={styles.input}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                style={styles.input}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Profile Image URL"
                                value={profileImg}
                                onChange={(e) => setProfileImg(e.target.value)}
                            />
                            <button style={styles.button} onClick={handleEmailSignUp}>
                                Sign Up
                            </button>
                            <button style={styles.button} onClick={() => setIsLogin(true)}>
                                Log In Instead
                            </button>
                        </>
                    )}
                </>
            }
        </div >
    );
}
export default Login;