import spin from '../assets/image/tadpole.svg'
function Spinner() {
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            userSelect: "none"
        },
        spin: {
            height: "15vh"
        }
    }
    return (
        <div style={styles.container}>
            <img src={spin} alt="Loading..." style={styles.spin} />
        </div>
    )
}
export default Spinner;