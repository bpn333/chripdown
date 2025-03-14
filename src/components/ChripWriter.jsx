import { useState, useEffect, useRef, useMemo } from "react";
import { Style } from "../assets/Style";
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { memo } from "react";
import Chrip from './Chrip';
import { useNavigate } from "react-router-dom";

function ChripWriter({ setData, data }) {
    const { user } = useAuth();
    const [newTweet, setNewTweet] = useState('');
    const textareaRef = useRef(null);
    const [showLiveChrip, setShowLiveChrip] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [newTweet]);

    const addChrip = async () => {
        if (!user) navigate('/login');
        if (newTweet.trim() === '') return;
        const newChrip = {
            username: user.displayName,
            handle: `@${user.email.split('@')[0]}`,
            timestamp: new Date().toISOString(),
            content: newTweet,
            likes: 0,
            dislikes: 0,
            comments: 0,
            rechrips: 0,
            useruid: user.uid
        };

        try {
            const db = getFirestore();
            const chripsRef = collection(db, 'chrips');
            const docRef = await addDoc(chripsRef, newChrip);

            // Add the tweet ID to the user's chrips array
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                chrips: arrayUnion(docRef.id)
            });

            setData([{ ...newChrip, id: docRef.id }, ...data]);
            setNewTweet('');
            setShowLiveChrip(false);
        } catch (error) {
            console.error("Error adding chrip: ", error);
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
            flexWrap: "wrap",
            margin: "10px"
        }
    }), [Style]);

    const handlePaste = (event) => {
        if (!event.clipboardData) return;

        const htmlData = event.clipboardData.getData("text/html");

        if (htmlData) {
            setNewTweet(newTweet + htmlData);
            event.preventDefault();
            return;
        }
    };

    return (
        <>
            <div style={styles.container}>
                <textarea
                    ref={textareaRef}
                    style={styles.input}
                    value={newTweet}
                    onChange={(e) => setNewTweet(e.target.value)}
                    placeholder="What's happening?"
                    onPaste={handlePaste}
                />
                <button style={{ ...styles.button, backgroundColor: showLiveChrip ? 'green' : Style.backgroundLite }} onClick={(e) => setShowLiveChrip(!showLiveChrip)} >👁️</button>
                <button
                    style={styles.button}
                    onClick={addChrip}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = Style.primary)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = Style.primaryLite)}
                >Add Chrip</button>
                <button style={styles.button} onClick={(e) => navigate('/help')}>Help</button>
            </div>
            {(showLiveChrip && newTweet.trim()) &&
                <Chrip
                    data={{
                        username: user?.displayName || 'anonymous',
                        handle: `@${user?.email.split('@')[0]}`,
                        content: newTweet,
                        useruid: user?.uid
                    }}
                    show={false}
                />
            }
        </>
    );
}
export default memo(ChripWriter);