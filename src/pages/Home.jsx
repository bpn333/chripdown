import { useState, useEffect } from 'react';
import Chrip from '../components/Chrip';
import ChripWriter from '../components/ChripWriter';
import NavBar from '../components/NavBar';
import { useAuth } from '../auth/AuthProvider';
import Spinner from '../components/Spinner';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

function Body() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChrips = async () => {
            const db = getFirestore();
            const chripsRef = collection(db, 'chrips');
            const chripsQuery = query(chripsRef, orderBy('timestamp', 'desc'), orderBy('likes', 'desc'), limit(15));
            const querySnapshot = await getDocs(chripsQuery);
            const chripsData = querySnapshot.docs.map(doc => doc.data());
            setData(chripsData);
            setLoading(false);
        };

        fetchChrips();
    }, []);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '10px 5%',
            borderRadius: '10px',
        },
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <NavBar usr={user?.displayName} uid={user?.uid} />
            <ChripWriter setData={setData} data={data} />
            <div style={styles.container}>
                {data.map((item, index) => (
                    <Chrip key={index} data={item} />
                ))}
            </div>
        </>
    );
}

export default Body;