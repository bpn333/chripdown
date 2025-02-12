import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, onSnapshot, collection, query, getDocs, limit } from "firebase/firestore";
import Spinner from "../components/Spinner";
import Chrip from "../components/Chrip";
import NavBar from "../components/NavBar";
import CommentWriter from "../components/CommentWriter";
import Comment from "../components/Comment";

const Post = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const styles = useMemo(() => ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        commentsContainer: {
            display: 'flex',
            flexDirection: 'column',
        }
    }), []);

    useEffect(() => {
        const db = getFirestore();
        const postDoc = doc(db, "chrips", id);

        // Real-time listener for post data
        const unsubscribe = onSnapshot(postDoc, (postSnapshot) => {
            if (postSnapshot.exists()) {
                setPostData({
                    id: postSnapshot.id,
                    ...postSnapshot.data()
                });
                setLoading(false);
            } else {
                console.error("No such post!");
                setLoading(false);
            }
        });

        const commentsRef = collection(db, `chrips/${id}/comments/`);
        const commentsQuery = query(commentsRef, limit(10));
        getDocs(commentsQuery).then((commentsSnapshot) => {
            const commentsData = commentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        });

        return () => unsubscribe();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!postData) {
        return <div>Post not found</div>;
    }

    return (
        <>
            <NavBar />
            <Chrip data={postData} />
            <CommentWriter postId={id} setData={setComments} data={comments} />
            <div style={styles.container}>
                {comments.map((comment) => (
                    <Comment key={comment.id} data={comment} postId={id} />
                ))}
            </div>
        </>
    );
};

export default Post;
