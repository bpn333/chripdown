import { useState, useEffect, useMemo } from 'react';
import Chrip from '../components/Chrip';
import ChripWriter from '../components/ChripWriter';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Filters from '../components/Filters';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

function Body() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chripsQuery, setChripsQuery] = useState(0);

    const chripsRef = useMemo(() => collection(getFirestore(), "chrips"), []);

    const Queries = useMemo(() => [
        query(chripsRef, orderBy("timestamp", "desc"), orderBy("likes", "desc"), limit(15)),    // recent
        query(chripsRef, orderBy("likes", "desc"), orderBy("dislikes", "asc"), orderBy("timestamp", "desc"), limit(15)),    // popular
        query(chripsRef, orderBy("dislikes", "desc"), limit(15)),    // most controversial
        query(chripsRef, orderBy("rechrips", "desc"), limit(15)),   // rechrips
        query(chripsRef, orderBy("comments", "desc"), limit(15)),    // comments
        query(chripsRef, orderBy("timestamp", "asc"))   //everything
    ], [chripsRef]);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onSnapshot(Queries[chripsQuery], (querySnapshot) => {
            setData(querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, [chripsQuery, Queries]);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
                {data.map((item) => (
                    <Chrip key={item.id} data={item} />
                ))}
            </div>
        </>
    );
}

export default Body;
