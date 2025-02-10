import React from 'react';
import { marked } from 'marked';
import { Colors } from '../assets/Colors';
import './chrip_overide.css';

function Chrip({ data }) {
    const styles = {
        chrip: {
            border: `1px solid ${Colors.PrimaryLite}`,
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: Colors.background,
            color: Colors.Primary,
        },
        chripHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
        },
        chripUsername: {
            fontFamily: 'Bebas Neue',
            fontSize: '25px',
        },
        chripHandle: {
            fontFamily: 'Kumar One',
            color: Colors.PrimaryLite,
        },
        chripContent: {
            marginBottom: '10px',
            fontFamily: 'Roboto Mono',
            textAlign: 'justify',
        },
        chripFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            color: Colors.PrimaryLite,
            fontFamily: 'Kumar One',
        },
        interactable: {
            cursor: 'pointer',
            backgroundColor: Colors.backgroundLite,
            margin: '2px',
            padding: '2px',
            borderRadius: '5px',
        }
    };

    return (
        <div style={styles.chrip}>
            <div style={styles.chripHeader}>
                <span style={styles.chripUsername}>{data.username}</span>
                <span style={styles.chripHandle}>{data.handle}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: marked(data.content) }} style={styles.chripContent} />
            <div style={styles.chripFooter}>
                <span>{data.timestamp}</span>
                <div>
                    <span style={styles.interactable}>{data.likes} 👍</span>
                    <span style={styles.interactable}>{data.likes} 👎</span>
                    <span style={styles.interactable}>{data.comments} 💬</span>
                    <span style={styles.interactable}>{data.rechrips} 🔁</span>
                </div>
            </div>
        </div>
    );
}

export default Chrip;