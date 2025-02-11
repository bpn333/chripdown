import { Colors } from "../assets/Colors";
import { useState, useRef, useEffect } from "react";
import { getFirestore, collection, addDoc, doc, runTransaction } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";

function ReChrips({ id, initialRechrips, isRechrip }) {
    const { user } = useAuth();
    const [reChrip, setReChrip] = useState(initialRechrips);
    const [showPopup, setShowPopup] = useState(false);
    const [reChripContent, setReChripContent] = useState('');
    const [loading, setLoading] = useState(false);
    const hiddenChripWriter = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        if (hiddenChripWriter.current) {
            hiddenChripWriter.current.style.height = 'auto';
            hiddenChripWriter.current.style.height = `${hiddenChripWriter.current.scrollHeight}px`;
        }
    }, [reChripContent]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef]);

    const handleReChrip = async () => {
        if (reChripContent.trim() === '' || loading) return;

        setLoading(true);
        const db = getFirestore();
        const chripsRef = collection(db, 'chrips');
        const originalChripRef = doc(db, 'chrips', id);

        try {
            await runTransaction(db, async (transaction) => {
                const originalChripDoc = await transaction.get(originalChripRef);
                if (!originalChripDoc.exists()) throw new Error("Original chrip not found");

                const newReChrip = {
                    username: user.displayName,
                    handle: `@${user.email.split('@')[0]}`,
                    timestamp: new Date().toISOString(),
                    content: reChripContent,
                    likes: 0,
                    dislikes: 0,
                    comments: 0,
                    rechrips: 0,
                    useruid: user.uid,
                    rechrip_from: id,
                };

                await addDoc(chripsRef, newReChrip);
                transaction.update(originalChripRef, { rechrips: originalChripDoc.data().rechrips + 1 });
                setShowPopup(false);
                setReChripContent('');
                setReChrip(reChrip + 1);
            });
        } catch (error) {
            console.error("Error adding rechrip: ", error);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        rechripButton: {
            backgroundColor: Colors.backgroundLite,
            margin: '3px',
            padding: '3px',
            borderRadius: '10px',
            cursor: 'pointer',
            color: Colors.PrimaryLite,
        },
        popup: {
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: Colors.background,
            zIndex: 1000,
        },
        textarea: {
            width: '30vw',
            borderRadius: '5px',
            border: `1px solid ${Colors.PrimaryLite}`,
            backgroundColor: 'transparent',
            color: Colors.Primary,
            resize: 'none',
            fontFamily: 'Roboto Mono',
        },
        button: {
            padding: '10px',
            backgroundColor: Colors.PrimaryLite,
            color: Colors.background,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'Bebas Neue',
            fontSize: '15px',
            marginTop: '10px',
        },
    };

    return (
        <>
            <span style={styles.rechripButton} onClick={() => setShowPopup(true)}>
                {isRechrip ? '' : reChrip + ' '}🔁
            </span>
            {showPopup && (
                <div style={styles.popup} ref={popupRef}>
                    <textarea
                        ref={hiddenChripWriter}
                        style={styles.textarea}
                        value={reChripContent}
                        onChange={(e) => setReChripContent(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button style={styles.button} onClick={handleReChrip} disabled={loading}>ReChrip</button>
                </div>
            )}
        </>
    );
}

export default ReChrips;


// why the fuck rechip count dont rerender thing