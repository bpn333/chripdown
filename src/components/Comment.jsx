import { Colors } from '../assets/Colors';
import CommentLikeDislike from './CommentLikeDislike';
import ChripContent from './ChripContent';
import { useMemo } from 'react';

function Comment({ data, postId }) {
    const styles = useMemo(() => ({
        comment: {
            border: `1px solid ${Colors.Primary}`,
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: Colors.background,
            color: Colors.Primary,
            minWidth: '50vw',
            margin: '1vw',
        },
        commentHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            flexWrap: 'wrap',
            gap: '5px'
        },
        commentUsername: {
            fontFamily: 'Bebas Neue',
            fontSize: '25px',
            color: Colors.PrimaryLite,
            userSelect: 'none'
        },
        commentHandle: {
            fontFamily: 'Daruma Drop',
            color: Colors.backgroundLite,
            fontSize: '20px',
            cursor: 'pointer',
            overflow: 'hidden',
            userSelect: 'none'
        },
        commentFooter: {
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
        <div style={styles.comment}>
            <div style={styles.commentHeader}>
                <span style={styles.commentUsername}>{data.username}</span>
                <span style={styles.commentHandle} onClick={(e) => window.location.href = '/user?id=' + data.useruid}>{data.handle}</span>
            </div>
            <ChripContent content={data.content} />
            <div style={styles.commentFooter}>
                <span>{new Date(data.timestamp).toLocaleString()}</span>
                <div>
                    <CommentLikeDislike postId={postId} commentId={data.id} initialLikes={data.likes} initialDislikes={data.dislikes} />
                </div>
            </div>
        </div>
    );
}

export default Comment;
