import { getFirestore, doc, runTransaction, getDoc } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState, useCallback } from "react";
import { Style } from "../assets/Style";
import { useMemo } from "react";

function CommentLikeDislike({ postId, commentId, initialLikes, initialDislikes }) {
    const { user } = useAuth();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLikes(initialLikes);
        setDislikes(initialDislikes);
    }, [initialLikes, initialDislikes]);

    useEffect(() => {
        setLiked(false);
        setDisliked(false);
    }, [commentId]);

    useEffect(() => {
        if (!user) return;

        const fetchInteraction = async () => {
            const db = getFirestore();
            const userInteractionRef = doc(db, `chrips/${postId}/comments/${commentId}/interactions/${user.uid}`);

            try {
                const postInteractionDoc = await getDoc(userInteractionRef);
                if (postInteractionDoc.exists()) {
                    const interactionData = postInteractionDoc.data();
                    setLiked(interactionData.like === true);
                    setDisliked(interactionData.like === false);
                }
            } catch (error) {
                console.error("Error fetching interaction: ", error);
            }
        };

        fetchInteraction();
    }, [user, postId, commentId]);

    const handleInteraction = useCallback(async (action) => {
        if (!user) window.location.href = "/login";
        if (loading) return;

        setLoading(true);
        const db = getFirestore();
        const userInteractionRef = doc(db, `chrips/${postId}/comments/${commentId}/interactions/${user.uid}`);
        const commentRef = doc(db, `chrips/${postId}/comments/${commentId}`);

        try {
            await runTransaction(db, async (transaction) => {
                const commentDoc = await transaction.get(commentRef);
                if (!commentDoc.exists()) throw new Error("Comment not found");

                const commentData = commentDoc.data();
                let newLikes = commentData.likes || 0;
                let newDislikes = commentData.dislikes || 0;

                if (action === "like" && !liked) {
                    newLikes += 1;
                    if (disliked) newDislikes -= 1;
                    transaction.set(userInteractionRef, { like: true });
                    transaction.update(commentRef, { likes: newLikes, dislikes: newDislikes });
                    setLiked(true);
                    setDisliked(false);
                } else if (action === "dislike" && !disliked) {
                    newDislikes += 1;
                    if (liked) newLikes -= 1;
                    transaction.set(userInteractionRef, { like: false });
                    transaction.update(commentRef, { likes: newLikes, dislikes: newDislikes });
                    setLiked(false);
                    setDisliked(true);
                } else if (action === "like" && liked) {
                    newLikes -= 1;
                    transaction.delete(userInteractionRef);
                    transaction.update(commentRef, { likes: newLikes });
                    setLiked(false);
                } else if (action === "dislike" && disliked) {
                    newDislikes -= 1;
                    transaction.delete(userInteractionRef);
                    transaction.update(commentRef, { dislikes: newDislikes });
                    setDisliked(false);
                }
                setLikes(newLikes);
                setDislikes(newDislikes);
            });
        } catch (error) {
            console.error("Error updating interaction: ", error);
        } finally {
            setLoading(false);
        }
    }, [user, postId, commentId, liked, disliked, loading]);

    const styles = useMemo(() => ({
        like: {
            backgroundColor: liked ? 'green' : Style.backgroundLite,
            margin: '3px',
            padding: '3px',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            color: Style.primaryLite,
            userSelect: 'none'
        },
        dislike: {
            backgroundColor: disliked ? 'red' : Style.backgroundLite,
            margin: '3px',
            padding: '3px',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            color: Style.primaryLite,
            userSelect: 'none'
        }
    }), [liked, disliked, loading, Style]);

    return (
        <>
            <span style={styles.like} onClick={() => handleInteraction("like")}>
                {likes} ⬆️
            </span>
            <span style={styles.dislike} onClick={() => handleInteraction("dislike")}>
                {dislikes} ⬇️
            </span>
        </>
    );
}

export default CommentLikeDislike;
