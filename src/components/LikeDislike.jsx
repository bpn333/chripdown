import { getFirestore, doc, runTransaction, getDoc } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Style } from "../assets/Style";

function LikeDislike({ id, initialLikes, initialDislikes }) {
    const { user } = useAuth();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [loading, setLoading] = useState(false);

    //fix old state retain
    useEffect(() => {
        setLikes(initialLikes);
        setDislikes(initialDislikes);
    }, [initialLikes, initialDislikes]);

    useEffect(() => {
        setLiked(false);
        setDisliked(false);
    }, [id]);

    useEffect(() => {
        if (!user) return;

        const fetchInteraction = async () => {
            const db = getFirestore();
            const userInteractionRef = doc(db, `chrips/${id}/interactions/${user.uid}`);

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
    }, [user, id]);

    const handleInteraction = useCallback(async (action) => {
        if (!user || loading) return;

        setLoading(true);
        const db = getFirestore();
        const userInteractionRef = doc(db, `chrips/${id}/interactions/${user.uid}`);
        const postRef = doc(db, `chrips/${id}`);

        try {
            await runTransaction(db, async (transaction) => {
                const postDoc = await transaction.get(postRef);
                if (!postDoc.exists()) throw new Error("Post not found");

                const postData = postDoc.data();
                let newLikes = postData.likes || 0;
                let newDislikes = postData.dislikes || 0;

                if (action === "like" && !liked) {
                    newLikes += 1;
                    if (disliked) newDislikes -= 1;
                    transaction.set(userInteractionRef, { like: true });
                    transaction.update(postRef, { likes: newLikes, dislikes: newDislikes });
                    setLiked(true);
                    setDisliked(false);
                } else if (action === "dislike" && !disliked) {
                    newDislikes += 1;
                    if (liked) newLikes -= 1;
                    transaction.set(userInteractionRef, { like: false });
                    transaction.update(postRef, { likes: newLikes, dislikes: newDislikes });
                    setLiked(false);
                    setDisliked(true);
                } else if (action === "like" && liked) {
                    newLikes -= 1;
                    transaction.delete(userInteractionRef);
                    transaction.update(postRef, { likes: newLikes });
                    setLiked(false);
                } else if (action === "dislike" && disliked) {
                    newDislikes -= 1;
                    transaction.delete(userInteractionRef);
                    transaction.update(postRef, { dislikes: newDislikes });
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
    }, [user, id, liked, disliked, loading]);

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
                {likes} 👍
            </span>
            <span style={styles.dislike} onClick={() => handleInteraction("dislike")}>
                {dislikes} 👎
            </span>
        </>
    );
}

export default LikeDislike;
