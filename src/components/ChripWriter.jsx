import { useState, useEffect, useRef } from "react";
import { Colors } from "../assets/Colors";
function ChripWriter({ setData, data }) {
    const [newTweet, setNewTweet] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [newTweet]);

    const addChrip = () => {
        if (newTweet.trim() === '') return;
        const newChrip = {
            username: 'Bipin Lamsal',
            handle: '@bpn333',
            timestamp: new Date().toLocaleString(),
            content: newTweet,
            likes: 0,
            comments: 0,
            rechrips: 0,
        };
        setData([newChrip, ...data]);
        setNewTweet('');
    };
    const styles = {
        input: {
            padding: '10px',
            margin: '10px auto',
            width: '90%',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            outline: 'none',
            border: `1px solid ${Colors.PrimaryLite}`,
            color: Colors.Primary,
            resize: 'none', // Disable user adjustment
            overflow: 'hidden', // Hide scrollbar
        },
        button: {
            padding: '10px 20px',
            backgroundColor: Colors.PrimaryLite,
            color: Colors.background,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '10px 5%',
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
            <button style={styles.button} onClick={addChrip}>Add Tweet</button>
        </div>
    );
}
export default ChripWriter;