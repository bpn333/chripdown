import { useMemo } from 'react';
import { Style } from '../assets/Style';
import { useAuth } from '../auth/AuthProvider';
function NavBar() {
    const { user } = useAuth();
    const styles = useMemo(() => ({
        container: {
            border: `1px solid ${Style.primaryLite}`,
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: Style.backgroundLite,
            color: Style.primaryLite,
            borderRadius: '10px',
            overflow: 'hidden'
        },
        span: {
            padding: '5px',
            cursor: 'pointer',
            fontSize: '25px',
            fontWeight: 'bold',
            fontFamily: Style.font2,
            userSelect: 'none'
        }
    }), [Style])
    const userPage = () => {
        !user ? window.location.href = "/login" : window.location.href = "/user?id=" + user.uid;
    }
    return (
        <div style={styles.container}>
            <span style={styles.span} onClick={(e) => window.location.href = "/home"}>Home</span>
            <span style={styles.span} onClick={(e) => window.location.href = "/settings"}>Settings</span>
            <span style={styles.span} onClick={(userPage)}>
                {user?.displayName || "User"}
            </span>
        </div>
    );
}
export default NavBar;