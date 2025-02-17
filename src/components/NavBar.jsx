import { useMemo } from 'react';
import { Style } from '../assets/Style';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
function NavBar() {
    const { user } = useAuth();
    const navigate = useNavigate();
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
        !user ? navigate("/login") : navigate("/user?id=" + user.uid);
    }
    return (
        <div style={styles.container}>
            <span style={styles.span} onClick={(e) => navigate("/home")}>Home</span>
            <span style={styles.span} onClick={(e) => navigate("/settings")}>Settings</span>
            <span style={styles.span} onClick={(userPage)}>
                {user?.displayName || "User"}
            </span>
        </div>
    );
}
export default NavBar;