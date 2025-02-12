import { useState } from "react";
import { Style, saveStyleToCookies, deleteStyleCookie } from "../assets/Style";
import NavBar from "../components/NavBar";

const Settings = () => {
    const [background, setBackground] = useState(Style.background);
    const [backgroundLite, setBackgroundLite] = useState(Style.backgroundLite);
    const [primaryLite, setPrimaryLite] = useState(Style.primaryLite);
    const [primary, setPrimary] = useState(Style.primary);
    const [font1, setFont1] = useState(Style.font1);
    const [font2, setFont2] = useState(Style.font2);
    const [font3, setFont3] = useState(Style.font3);

    const handleApply = () => {
        const newStyle = {
            background,
            backgroundLite,
            primaryLite,
            primary,
            font1,
            font2,
            font3
        };
        saveStyleToCookies(newStyle);
        window.location.reload();
    };

    const handleReset = () => {
        deleteStyleCookie();
        window.location.reload();
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Style.background,
            borderRadius: '10px',
        },
        table: {
            minWidth: '50vw',
            borderCollapse: 'collapse',
            margin: '20px',
        },
        th: {
            border: `1px solid ${Style.primaryLite}`,
            padding: '10px',
            backgroundColor: Style.backgroundLite,
            color: Style.primary,
            fontFamily: Style.font1,
        },
        td: {
            border: `1px solid ${Style.backgroundLite}`,
            padding: '10px',
            backgroundColor: 'transparent',
            color: Style.primaryLite,
            fontFamily: Style.font1,
        },
        input: {
            width: '100%',
            height: '40px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            outline: `2px solid ${Style.primaryLite}`,
            backgroundColor: 'transparent',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: Style.primaryLite,
            color: Style.background,
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: Style.font2,
            fontSize: '15px',
            marginTop: '10px',
            marginRight: '10px',
        },
        heading: {
            color: Style.primary,
            fontFamily: Style.font2,
            fontSize: '30px',
            marginBottom: '20px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
        fontInput: {
            width: 'calc(100% - 20px)',
            padding: '10px',
            borderRadius: '5px',
            border: `1px solid ${Style.primaryLite}`,
            backgroundColor: 'transparent',
            color: Style.primary,
            fontFamily: Style.font1,
        }
    };

    return (
        <>
            <NavBar />
            <div style={styles.container}>
                <table style={styles.table}>
                    <thead>
                        {/* for colors */}
                        <tr>
                            <th colSpan={2} style={styles.th}>Style</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>Background</td>
                            <td style={styles.td}>
                                <input
                                    type="color"
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Background Lite</td>
                            <td style={styles.td}>
                                <input
                                    type="color"
                                    value={backgroundLite}
                                    onChange={(e) => setBackgroundLite(e.target.value)}
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Primary Lite</td>
                            <td style={styles.td}>
                                <input
                                    type="color"
                                    value={primaryLite}
                                    onChange={(e) => setPrimaryLite(e.target.value)}
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Primary</td>
                            <td style={styles.td}>
                                <input
                                    type="color"
                                    value={primary}
                                    onChange={(e) => setPrimary(e.target.value)}
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        {/* for fonts */}
                        <tr>
                            <th colSpan={2} style={styles.th}>Fonts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>Font 1</td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    value={font1}
                                    onChange={(e) => setFont1(e.target.value)}
                                    style={styles.fontInput}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Font 2</td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    value={font2}
                                    onChange={(e) => setFont2(e.target.value)}
                                    style={styles.fontInput}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Font 3</td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    value={font3}
                                    onChange={(e) => setFont3(e.target.value)}
                                    style={styles.fontInput}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={handleReset}>Reset</button>
                    <button style={styles.button} onClick={handleApply}>Apply</button>
                </div>
            </div >
        </>
    );
};

export default Settings;
