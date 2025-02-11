import { useState, useEffect } from 'react';
import Chrip from '../components/Chrip';
import ChripWriter from '../components/ChripWriter';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Filters from '../components/Filters';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

function Body() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const chripsRef = collection(getFirestore(), "chrips");
    const [chripsQuery, setChripsQuery] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(Queries[chripsQuery], (querySnapshot) => {
            const chripsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(chripsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [chripsQuery]);

    const Queries = [
        query(chripsRef, orderBy("timestamp", "desc"), orderBy("likes", "desc"), limit(15)),    //recent
        query(chripsRef, orderBy("likes", "desc"), orderBy("dislikes", "asc"), orderBy("timestamp", "desc"), limit(15)),    //popular
        query(chripsRef, orderBy("dislikes", "desc"), limit(15)),    //most controversial
    ];

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
            <NavBar />
            <ChripWriter setData={setData} data={data} />
            <Filters filter={chripsQuery} setFilter={setChripsQuery} />
            <div style={styles.container}>
                {data.map((item, index) => (
                    <Chrip key={index} data={item} />
                ))}
            </div>
        </>
    );
}

export default Body;