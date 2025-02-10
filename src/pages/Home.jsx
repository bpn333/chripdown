import React, { useState } from 'react';
import Chrip from '../components/Chrip';
import ChripWriter from '../components/ChripWriter';
import NavBar from '../components/NavBar';

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
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '10px 5%',
            borderRadius: '10px',
        },
    };

    return (
        <>
            <NavBar />
            <ChripWriter setData={setData} data={data} />
            <div style={styles.container}>
                {data.map((item, index) => (
                    <Chrip key={index} data={item} />
                ))}
            </div>
        </>
    );
}

export default Body;