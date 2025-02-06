import React, { useState } from 'react';
import Chrip from './Chrip';
import { Colors } from '../assets/Colors';

function Body() {
    const [data, setData] = useState([
        {
            username: 'John Doe',
            handle: '@johndoe',
            timestamp: '2/6/2025, 9:38:54 PM',
            content: '| Item              | In Stock | Price |\n| :---------------- | :------: | ----: |\n| Python Hat        |   True   | 23.99 |\n| SQL Hat           |   True   | 23.99 |\n| Codecademy Tee    |  False   | 19.99 |\n| Codecademy Hoodie |  False   | 42.99 |',
            likes: 10,
            comments: 3,
            rechrips: 0,
        },
        {
            username: 'Jane Smith',
            handle: '@janesmith',
            timestamp: '2/6/2025, 10:15:30 PM',
            content: '![image](/chripdown1.webp)',
            likes: 5,
            comments: 1,
            rechrips: 2,
        },
        {
            username: 'Alice Johnson',
            handle: '@alicej',
            timestamp: '2/7/2025, 8:00:00 AM',
            content: '### Good morning!\n![image](https://fastly.picsum.photos/id/361/1920/1080.jpg?hmac=t3ddmnixzc87tof2AmyRQVG31bc2gIril_wAYZMHVz4)',
            likes: 20,
            comments: 4,
            rechrips: 1,
        },
    ]);

    const [newTweet, setNewTweet] = useState('');

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
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '10px 5%',
            borderRadius: '10px',
        },
        input: {
            padding: '10px',
            margin: '10px auto',
            width: '90%',
            borderRadius: '5px',
            border: `1px solid ${Colors.PrimaryLite}`,
            backgroundColor: Colors.backgroundLite,
            color: Colors.Primary,
        },
        button: {
            padding: '10px 20px',
            margin: '10px auto',
            backgroundColor: Colors.PrimaryLite,
            color: Colors.background,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <textarea
                style={styles.input}
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                placeholder="What's happening?"
            />
            <button style={styles.button} onClick={addChrip}>Add Tweet</button>
            {data.map((item, index) => (
                <Chrip key={index} data={item} />
            ))}
        </div>
    );
}

export default Body;