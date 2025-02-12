import { useEffect, useMemo, useState } from "react";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Style } from "../assets/Style";
import Spinner from "../components/Spinner";
import Chrip from "../components/Chrip";
import NavBar from "../components/NavBar";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const User = () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const auth = getAuth();
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [userData, setUserData] = useState(null);
    const [chrips, setChrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const styles = {
        userContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '1% 5%',
            padding: '1%',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        userImg: {
            borderRadius: '50%',
            width: '150px',
            margin: '30px',
        },
        userUsr: {
            fontSize: '40px',
            fontFamily: Style.font3,
            color: Style.primaryLite,
        },
        userExtra: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        userInfo: {
            fontFamily: Style.font1,
            fontSize: '20px',
            color: Style.primary,
        },
        userDate: {
            fontFamily: Style.font1,
            fontSize: '20px',
            color: Style.primary,
        },
        userChrips: {
            display: 'flex',
            flexDirection: 'column',
            margin: '10px 5%',
        },
        signOutButton: {
            backgroundColor: Style.primaryLite,
            fontFamily: Style.font2,
            fontSize: '20px',
            padding: '3px',
            color: Style.background
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setVerifiedUser(user?.uid === id);
        });

        return () => unsubscribe(); // Cleanup the listener when component unmounts
    }, [id]);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const db = getFirestore();
                const userDoc = doc(db, "users", id);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUserData(userData);

                    if (userData.chrips?.length > 0) {
                        const chripsRef = collection(db, "chrips");
                        const chripsQuery = query(chripsRef, where("__name__", "in", userData.chrips));
                        const chripsSnapshot = await getDocs(chripsQuery);
                        setChrips(chripsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    }
                } else {
                    console.error("No such user!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) return <Spinner />;
    if (!userData) return <div>User not found</div>;

    return (
        <>
            <NavBar />
            <div style={styles.userContainer}>
                <img style={styles.userImg} src={userData.img} alt="User profile" />
                <div style={styles.userExtra}>
                    <span style={styles.userUsr}>{userData.username}</span>
                    <span style={styles.userInfo}>@{userData.email.split('@')[0]}</span>
                    <span style={styles.userDate}>Since {userData.joined.slice(0, -4)}</span>
                    {verifiedUser && <button style={styles.signOutButton}
                        onClick={async () => {
                            try {
                                await signOut(auth);
                            } catch (error) {
                                console.error("Sign-out error:", error);
                            }
                        }}
                    >LogOut</button>}
                </div>
            </div>
            <div style={styles.userChrips}>
                {chrips.map((chrip) => <Chrip key={chrip.id} data={chrip} />)}
            </div>
        </>
    );
};

export default User;