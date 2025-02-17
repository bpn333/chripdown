import { useState, useEffect, useRef, useMemo } from "react";
import { Style } from "../assets/Style";
import { getFirestore, doc, runTransaction, collection, increment } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function CommentWriter({ postId, setData, data }) {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const textareaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [newComment]);

    const addComment = async () => {
        if (!user) navigate("/login");
        if (newComment.trim() === '') return;
        const newCommentData = {
            username: user.displayName,
            handle: `@${user.email.split('@')[0]}`,
            timestamp: new Date().toISOString(),
            content: newComment,
            likes: 0,
            dislikes: 0,
            useruid: user.uid,
        };

        try {
            const db = getFirestore();
            const commentsRef = collection(db, `chrips/${postId}/comments`);
            const postRef = doc(db, `chrips/${postId}`);

            await runTransaction(db, async (transaction) => {
                const newCommentRef = doc(commentsRef);
                transaction.set(newCommentRef, newCommentData);
                transaction.update(postRef, { comments: increment(1) });
                setData([{ ...newCommentData, id: newCommentRef.id }, ...data]);
                setNewComment('');
            });
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const styles = useMemo(() => ({
        input: {
            padding: '10px',
            width: '80%',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            outline: 'none',
            border: `1px solid ${Style.primaryLite}`,
            color: Style.primary,
            resize: 'none', // Disable user adjustment
            overflow: 'hidden', // Hide scrollbar
            fontFamily: Style.font1,
        },
        button: {
            padding: '8px',
            backgroundColor: Style.primaryLite,
            color: Style.background,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: Style.font2,
            fontSize: '15px',
            margin: '10px',
            userSelect: 'none'
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }
    }), [Style]);
    return (
        <div style={styles.container}>
            <textarea
                ref={textareaRef}
                style={styles.input}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
            />
            <button
                style={styles.button}
                onClick={addComment}
                onMouseEnter={(e) => (e.target.style.backgroundColor = Style.primary)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = Style.primaryLite)}
            >Add Comment</button>
        </div>
    );
}
export default memo(CommentWriter);
