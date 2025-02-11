import { useState, useEffect, useRef } from "react";
import { Colors } from "../assets/Colors";
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { memo } from "react";

function ChripWriter({ setData, data }) {
    const { user } = useAuth();
    const [newTweet, setNewTweet] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [newTweet]);

    const addChrip = async () => {
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
        } catch (error) {
            console.error("Error adding chrip: ", error);
        }
    };

    const styles = {
        input: {
            padding: '10px',
            width: '80%',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            outline: 'none',
            border: `1px solid ${Colors.PrimaryLite}`,
            color: Colors.Primary,
            resize: 'none', // Disable user adjustment
            overflow: 'hidden', // Hide scrollbar
            fontFamily: 'Roboto Mono',
        },
        button: {
            padding: '8px',
            backgroundColor: Colors.PrimaryLite,
            color: Colors.background,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'Bebas Neue',
            fontSize: '15px',
            margin: '10px',
            userSelect: 'none'
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px 5%',
            flexWrap: "wrap"
        }
    }
    return (
        <div style={styles.container}>
            <textarea
                ref={textareaRef}
                style={styles.input}
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                placeholder="What's happening?"
            />
            <button style={styles.button} onClick={addChrip}>Add Chrip</button>
        </div>
    );
}
export default memo(ChripWriter);