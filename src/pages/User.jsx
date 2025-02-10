import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import "./User.css";

const User = () => {
    const id = new URLSearchParams(window.location.search).get('id');

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const db = getFirestore();
            const userDoc = doc(db, "users", id);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                setUserData(userSnapshot.data());
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
        <div className="user-container">
            <img className="user-img" src={userData.img} alt="User profile" />
            <div className="user-extra">
                <span className="user-usr">{userData.username}</span>
                <span className="user-info">@{userData.email.split('@')[0]}</span>
                <span className="user-date">Since {userData.joined.slice(0, -4)}</span>
            </div>
        </div>
    );
};

export default User;
