import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import Spinner from "../components/Spinner";
import Chrip from "../components/Chrip";
import "./User.css";

const User = () => {
    const id = new URLSearchParams(window.location.search).get('id');

    const [userData, setUserData] = useState(null);
    const [chrips, setChrips] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    const chripsData = chripsSnapshot.docs.map(doc => doc.data());
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
            <div className="user-container">
                <img className="user-img" src={userData.img} alt="User profile" />
                <div className="user-extra">
                    <span className="user-usr">{userData.username}</span>
                    <span className="user-info">@{userData.email.split('@')[0]}</span>
                    <span className="user-date">Since {userData.joined.slice(0, -4)}</span>
                </div>
            </div>
            <div className="user-chrips">
                {chrips.map((chrip, index) => (
                    <Chrip key={index} data={chrip} />
                ))}
            </div>
        </>
    );
};

export default User;
