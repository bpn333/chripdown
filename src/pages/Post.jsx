import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, onSnapshot, collection, query, getDocs, orderBy } from "firebase/firestore";
import Spinner from "../components/Spinner";
import Chrip from "../components/Chrip";
import NavBar from "../components/NavBar";
import CommentWriter from "../components/CommentWriter";
import Comment from "../components/Comment";
import { Style } from "../assets/Style";

const Post = () => {
    const { id } = useParams();
    const [commentFilter, setCommentFilter] = useState("Recent");
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
        },
        filter: {
            marginTop: '5px',
            alignSelf: 'center',
            width: '250px',
            padding: '8px',
            backgroundColor: Style.backgroundLite,
            color: Style.primaryLite,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: Style.font2,
            fontSize: '18px',
            userSelect: 'none'
        }
    }), [Style]);
    const db = getFirestore();
    const postDoc = doc(db, `chrips/${id}`);
    const commentsRef = collection(db, `chrips/${id}/comments/`);
    const commentsQueries = useMemo(() => ({
        "Most Liked": query(commentsRef, orderBy("likes", "desc")), // Most Liked
        "Recent": query(commentsRef, orderBy("timestamp", "desc")), // Recent
        "Most Disliked": query(commentsRef, orderBy("dislikes", "desc")) // Most Disliked
    }), [commentsRef]);
    useEffect(() => {
        getDocs(commentsQueries[commentFilter]).then((commentsSnapshot) => {
            const commentsData = commentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        });
    }, [commentFilter]);

    useEffect(() => {
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
                <select style={styles.filter} value={commentFilter} onChange={(e) => setCommentFilter(e.target.value)}>
                    {Object.keys(commentsQueries).map((k, i) => (
                        <option key={i} value={k}>
                            {k}
                        </option>
                    ))}
                </select>
                {comments.map((comment) => (
                    <Comment key={comment.id} data={comment} postId={id} />
                ))}
            </div>
        </>
    );
};

export default Post;