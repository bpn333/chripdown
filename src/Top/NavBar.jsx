import { Colors } from '../assets/Colors';
function NavBar() {
    const styles = {
        'container': {
            'border': `1px solid ${Colors.PrimaryLite}`,
            'display': 'flex',
            'justifyContent': 'space-around',
            'backgroundColor': Colors.backgroundLite,
            'color': Colors.PrimaryLite,
            'borderRadius': '10px',
        },
        'span': {
            'padding': '10px',
            'cursor': 'pointer',
            'fontSize': '20px',
            'fontWeight': 'bold',
            'fontFamily': 'monospace',
        }
    }
    return (
        <div style={styles.container}>
            <span style={styles.span}>Home</span>
            <span style={styles.span}>Something</span>
            <span style={styles.span}>Home</span>
            <span style={styles.span}>Home</span>
        </div>
    );
}
export default NavBar;