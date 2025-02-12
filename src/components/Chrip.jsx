import { useEffect, useState, memo, useMemo } from 'react';
import { Colors } from '../assets/Colors';
import LikeDislike from './LikeDislike';
import ReChrips from './ReChrips';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ChripContent from './ChripContent';

const CommentComponent = memo(({ count, id }) => {
    return (
        <span
            style={{
                backgroundColor: Colors.backgroundLite,
                padding: '3px',
                borderRadius: '10px',
                color: Colors.PrimaryLite,
                cursor: 'pointer',
                userSelect: 'none'
            }}
            onClick={(e) => window.location.href = '/post/' + id}
        >{count} 💬</span>
    );
});

function Chrip({ data, show = true }) {
    const [originalChrip, setOriginalChrip] = useState(null);

    useEffect(() => {
        const fetchOriginalChrip = async () => {
            if (data.rechrip_from) {
                const db = getFirestore();
                const originalChripDoc = await getDoc(doc(db, "chrips", data.rechrip_from));
                if (originalChripDoc.exists()) {
                    setOriginalChrip({
                        id: originalChripDoc.id,
                        ...originalChripDoc.data()
                    });
                }
            }
        };
        fetchOriginalChrip();
    }, [data?.rechrip_from]);

    const styles = useMemo(() => ({
        chrip: {
            border: `1px solid ${Colors.PrimaryLite}`,
            borderRadius: '10px',
            padding: '10px',
            minWidth: '50vw',
            margin: '1vw',
            marginBottom: '10px',
            backgroundColor: Colors.background,
            color: Colors.Primary
        },
        chripHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            flexWrap: 'wrap',
            gap: '5px'
        },
        chripUsername: {
            fontFamily: 'Bebas Neue',
            fontSize: '25px',
            color: Colors.PrimaryLite,
            userSelect: 'none'
        },
        chripHandle: {
            fontFamily: 'Daruma Drop',
            color: Colors.backgroundLite,
            fontSize: '20px',
            cursor: 'pointer',
            overflow: 'hidden',
            userSelect: 'none'
        },
        chripFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            color: Colors.backgroundLite,
            fontFamily: 'Daruma Drop',
            fontSize: '20px',
            flexWrap: 'wrap',
            gap: '5px'
        }
    }), []);

    return (
        <div style={styles.chrip} >
            <div style={styles.chripHeader}>
                <span style={styles.chripUsername}>{data.username}</span>
                <span style={styles.chripHandle} onClick={(e) => window.location.href = '/user?id=' + data.useruid}>{data.handle}</span>
            </div>
            <ChripContent content={data.content} />
            {originalChrip && < Chrip data={originalChrip} show={false} />}
            {show
                &&
                <div style={styles.chripFooter}>
                    <span>{new Date(data.timestamp).toLocaleString()}</span>
                    <div>
                        <LikeDislike id={data.id} initialLikes={data.likes} initialDislikes={data.dislikes} />
                        <CommentComponent count={data.comments} id={data.id} />
                        <ReChrips id={data?.rechrip_from || data.id} initialRechrips={data.rechrips} isRechrip={originalChrip && 1} />
                    </div>
                </div>
            }
        </div>
    );
}

export default Chrip;