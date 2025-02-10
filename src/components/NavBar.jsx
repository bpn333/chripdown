import { Colors } from '../assets/Colors';
function NavBar({ usr, uid }) {
    const styles = {
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
        }
    }
    const userPage = () => {
        if (!usr) return;
        window.location.href = "/user?id=" + uid;
    }
    return (
        <div style={styles.container}>
            <span style={styles.span}>Home</span>
            <span style={styles.span}>Something</span>
            <span style={styles.span} onClick={(userPage)}>
                {usr || "User"}
            </span>
        </div>
    );
}
export default NavBar;