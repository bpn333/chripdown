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
            fontWeight: 'bold',
        },
        chripHandle: {
            color: Colors.PrimaryLite,
        },
        chripContent: {
            marginBottom: '10px',
        },
        chripFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            color: Colors.PrimaryLite,
        },
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
                    <span>Likes: {data.likes}</span>
                    <span> Comments: {data.comments}</span>
                    <span> Rechrips: {data.rechrips}</span>
                </div>
            </div>
        </div>
    );
}

export default Chrip;