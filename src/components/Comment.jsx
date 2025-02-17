import { Style } from '../assets/Style';
import CommentLikeDislike from './CommentLikeDislike';
import ChripContent from './ChripContent';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Comment({ data, postId }) {
    const navigate = useNavigate();
    const styles = useMemo(() => ({
        comment: {
            border: `1px solid ${Style.primary}`,
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: Style.background,
            color: Style.primary,
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
            fontFamily: Style.font2,
            fontSize: '25px',
            color: Style.primaryLite,
            userSelect: 'none'
        },
        commentHandle: {
            fontFamily: Style.font3,
            color: Style.backgroundLite,
            fontSize: '20px',
            cursor: 'pointer',
            overflow: 'hidden',
            userSelect: 'none'
        },
        commentFooter: {
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
        <div style={styles.comment}>
            <div style={styles.commentHeader}>
                <span style={styles.commentUsername}>{data.username}</span>
                <span style={styles.commentHandle} onClick={(e) => navigate('/user?id=' + data.useruid)}>{data.handle}</span>
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
