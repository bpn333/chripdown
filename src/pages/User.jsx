import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import Spinner from "../components/Spinner";
import Chrip from "../components/Chrip";
import NavBar from "../components/NavBar";

const User = () => {
    const id = new URLSearchParams(window.location.search).get('id');

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
            fontFamily: 'Daruma Drop',
            color: '#00ADB5',
        },
        userExtra: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        userInfo: {
            fontFamily: 'Roboto Mono',
            fontSize: '20px',
            color: '#EEEEEE',
        },
        userDate: {
            fontFamily: 'Roboto Mono',
            fontSize: '20px',
            color: '#EEEEEE',
        },
        userChrips: {
            display: 'flex',
            flexDirection: 'column',
            margin: '10px 5%',
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const db = getFirestore();
            const userDoc = doc(db, "users", id);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                setUserData(userData);

                // Fetch chrips based on the user's chrips array
                if (userData.chrips && userData.chrips.length > 0) {
                    const chripsRef = collection(db, "chrips");
                    const chripsQuery = query(chripsRef, where("__name__", "in", userData.chrips));
                    const chripsSnapshot = await getDocs(chripsQuery);
                    const chripsData = chripsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setChrips(chripsData);
                }
            } else {
                console.error("No such user!");
            }
            setLoading(false);
        };

        fetchUserData();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!userData) {
        return <div>User not found</div>;
    }

    return (
        <>
            <NavBar />
            <div style={styles.userContainer}>
                <img style={styles.userImg} src={userData.img} alt="User profile" />
                <div style={styles.userExtra}>
                    <span style={styles.userUsr}>{userData.username}</span>
                    <span style={styles.userInfo}>@{userData.email.split('@')[0]}</span>
                    <span style={styles.userDate}>Since {userData.joined.slice(0, -4)}</span>
                </div>
            </div>
            <div style={styles.userChrips}>
                {chrips.map((chrip, index) => (
                    <Chrip key={index} data={chrip} />
                ))}
            </div>
        </>
    );
};

export default User;
