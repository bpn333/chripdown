import { useMemo } from 'react';
import { Colors } from '../assets/Colors';
import { useAuth } from '../auth/AuthProvider';
function NavBar() {
    const { user } = useAuth();
    const styles = useMemo(() => ({
        container: {
            border: `1px solid ${Colors.PrimaryLite}`,
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: Colors.backgroundLite,
            color: Colors.PrimaryLite,
            borderRadius: '10px',
        },
        span: {
            padding: '5px',
            cursor: 'pointer',
            fontSize: '25px',
            fontWeight: 'bold',
            fontFamily: 'Bebas Neue',
            userSelect: 'none'
        }
    }), [])
    const userPage = () => {
        if (user) window.location.href = "/login";
        window.location.href = "/user?id=" + user.uid;
    }
    return (
        <div style={styles.container}>
            <span style={styles.span} onClick={(e) => window.location.href = "/home"}>Home</span>
            <span style={styles.span}>Something</span>
            <span style={styles.span} onClick={(userPage)}>
                {user?.displayName || "User"}
            </span>
        </div>
    );
}
export default NavBar;