import { useEffect, useMemo, useRef, useState } from "react";
import { Style } from "../assets/Style";
import NavBar from "../components/NavBar";
import { useAuth } from "../auth/AuthProvider";
import { marked } from "marked";

const Help = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [markdown, setMarkdown] = useState('### markdown is not that scary\n*play around and learn here*\n# 😊 \n<a style="text-decoration:none; color: lime; font-family: Bebas Neue" href="https://github.com/bpn333">You can find me here</a>');
    const markdownRef = useRef(null);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        if (markdownRef.current) {
            markdownRef.current.style.height = "auto";
            markdownRef.current.style.height = `${markdownRef.current.scrollHeight}px`;
        }
    }, [markdown]);

    const styles = useMemo(() => ({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        form: {
            display: "flex",
            flexDirection: "row", //exactly what i want but wtf how does it work
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            margin: "10px auto",
            flexWrap: "wrap"
        },
        input: {
            width: "100%",
            maxWidth: "500px",
            padding: "12px",
            borderRadius: "6px",
            border: `1px solid ${Style.primaryLite}`,
            backgroundColor: "transparent",
            color: Style.primary,
            fontFamily: Style.font1,
            fontSize: "16px",
            outline: "none",
        },
        textarea: {
            width: "100%",
            maxWidth: "500px",
            padding: "12px",
            borderRadius: "6px",
            border: `1px solid ${Style.primaryLite}`,
            backgroundColor: "transparent",
            color: Style.primary,
            fontFamily: Style.font1,
            fontSize: "16px",
            resize: "none",
            minHeight: "120px",
            outline: "none",
        },
        button: {
            padding: "12px 20px",
            backgroundColor: Style.primaryLite,
            color: Style.background,
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: Style.font2,
            fontSize: "16px",
        },
        heading: {
            color: Style.primary,
            fontFamily: Style.font3,
            fontSize: "28px",
            marginBottom: "10px",
            textAlign: "center",
            userSelect: "none"
        },
        paragraph: {
            fontFamily: Style.font1,
            color: Style.primaryLite,
            fontSize: "18px",
            margin: "0 5vw",
            textAlign: "center"
        },
        markdownPlaygroundContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
            gap: "15px",
            marginTop: "20px",
            flexWrap: "wrap"
        },
        markdownOutput: {
            width: "100%",
            maxWidth: "500px",
            padding: "12px",
            borderRadius: "6px",
            border: `1px solid ${Style.primaryLite}`,
            backgroundColor: Style.backgroundLite,
            color: Style.primary,
            fontFamily: Style.font1,
            fontSize: "16px",
            overflowWrap: "break-word",
        },
        link: {
            color: Style.primaryLite,
            textDecoration: "none",
            fontFamily: Style.font2,
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "10px",
            userSelect: "none"
        },
    }), [Style]);

    return (
        <>
            <NavBar />
            <div style={styles.container}>
                <h2 style={styles.heading}>About</h2>
                <p style={styles.paragraph}>Welcome to ChirpDown, a truly open and unrestricted social platform. Inspired by Twitter but built for free expression, we empower you to share ideas without limits. We support Markdown formatting, allowing for rich and creative posts. Unlike traditional social networks, there are no restrictions. You can trash talk anyone, express controversial views, or share content ranging from wholesome texts and images to hardcore porn, NSFW material, and gore content. However, media files must be hosted externally and linked using Markdown to display them.</p>
                <h2 style={styles.heading}>Markdown Playground</h2>
                <div style={styles.markdownPlaygroundContainer}>
                    <textarea
                        placeholder="Write your markdown here..."
                        ref={markdownRef}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        style={styles.textarea}
                    />
                    <div
                        style={styles.markdownOutput}
                        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
                    />
                </div>
                <a
                    href="https://www.markdownguide.org/basic-syntax/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                >
                    Learn more about Markdown
                </a>
                <h2 style={styles.heading}>Help & Support</h2>
                <form
                    action="https://formsubmit.co/50342c617a04b1322ac19cbc0abb273d"
                    method="POST"
                    style={styles.form}
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <textarea
                        name="message"
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = Style.primary)
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = Style.primaryLite)
                        }
                    >
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default Help;
