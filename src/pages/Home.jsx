import { useState, useEffect, useMemo, useRef } from 'react';
import Chrip from '../components/Chrip';
import ChripWriter from '../components/ChripWriter';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Filters from '../components/Filters';
import { Style } from '../assets/Style';
import { useSearchParams } from 'react-router-dom';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

function Body() {
    const [searchParams] = useSearchParams();
    const chripsQuery = Number(searchParams.get('filter')) || 0;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limits, setLimits] = useState(15);
    const [showLoadMore, setShowLoadMore] = useState(true);

    const chripsRef = useMemo(() => collection(getFirestore(), "chrips"), []);

    const Queries = useMemo(() => [
        query(chripsRef, orderBy("timestamp", "desc"), orderBy("likes", "desc"), limit(limits)),    // recent
        query(chripsRef, orderBy("likes", "desc"), orderBy("dislikes", "asc"), orderBy("timestamp", "desc"), limit(limits)),    // popular
        query(chripsRef, orderBy("dislikes", "desc"), orderBy("likes", "asc"), orderBy("timestamp", "desc"), limit(limits)),    // most controversial
        query(chripsRef, orderBy("rechrips", "desc"), limit(limits)),   // rechrips
        query(chripsRef, orderBy("comments", "desc"), limit(limits)),    // comments
        query(chripsRef, orderBy("timestamp", "asc"))   //everything
    ], [chripsRef, limits]);

    const unsubscribeRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        chripsQuery == 5 ? setShowLoadMore(false) : setShowLoadMore(true);
        setLimits(15); // something is messed up here
    }, [chripsQuery])

    useEffect(() => {
        if (chripsQuery > Queries.length) return;
        setLoading(true);
        unsubscribeRef.current?.();
        unsubscribeRef.current = onSnapshot(Queries[chripsQuery], (querySnapshot) => {
            const newDocs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(prevData => {
                let newItemAdded = false;
                const dataMap = new Map();
                const oldMap = new Map(prevData.map(pd => [pd.id, pd]));
                newDocs.forEach(item => {
                    if (!oldMap.has(item.id)) {
                        newItemAdded = true;            // future me issues
                    }
                    dataMap.set(item.id, item);
                });
                newItemAdded || setShowLoadMore(false);
                return Array.from(dataMap.values());
            });
            setLoading(false);
        });
        return () => unsubscribeRef.current?.();
    }, [chripsQuery, Queries]);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '10px',
        },
        button: {
            display: 'flex',
            padding: '8px',
            backgroundColor: Style.backgroundLite,
            color: Style.primaryLite,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: Style.font2,
            fontSize: '20px',
            userSelect: 'none',
            margin: '0 auto'
        }
    };

    if (chripsQuery > Queries.length) {
        return <h1>ERROR</h1>
    }
    if (loading && data.length === 0) {
        return <Spinner />;
    }

    return (
        <>
            <NavBar />
            <ChripWriter setData={setData} data={data} />
            <Filters filter={chripsQuery} />
            <div style={styles.container}>
                {data.map((item) => (
                    <Chrip key={item.id} data={item} />
                ))}
            </div>
            {showLoadMore && <button onClick={() => setLimits(limits + 10)} style={styles.button}>Load More</button>}
        </>
    );
}

export default Body;