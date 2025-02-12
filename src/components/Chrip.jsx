import { useEffect, useState, memo, useMemo } from 'react';
import { Style } from '../assets/Style';
import LikeDislike from './LikeDislike';
import ReChrips from './ReChrips';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ChripContent from './ChripContent';

const CommentComponent = memo(({ count, id }) => {
    return (
        <span
            style={{
                backgroundColor: Style.backgroundLite,
                padding: '3px',
                borderRadius: '10px',
                color: Style.primaryLite,
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
            border: `1px solid ${Style.primaryLite}`,
            borderRadius: '10px',
            padding: '10px',
            minWidth: '50vw',
            margin: '1vw',
            marginBottom: '10px',
            backgroundColor: Style.background,
            color: Style.primary
        },
        chripHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            flexWrap: 'wrap',
            gap: '5px'
        },
        chripUsername: {
            fontFamily: Style.font2,
            fontSize: '25px',
            color: Style.primaryLite,
            userSelect: 'none'
        },
        chripHandle: {
            fontFamily: Style.font3,
            color: Style.backgroundLite,
            fontSize: '20px',
            cursor: 'pointer',
            overflow: 'hidden',
            userSelect: 'none'
        },
        chripFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            color: Style.backgroundLite,
            fontFamily: Style.font3,
            fontSize: '20px',
            flexWrap: 'wrap',
            gap: '5px'
        }
    }), [Style]);

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