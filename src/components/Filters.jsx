import { Colors } from "../assets/Colors";
function Filters({ filter, setFilter }) {
    const Filters = {
        Recent: 0,
        Popular: 1,
        Controversial: 2,
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: '10px 5%',
        }}>
            {Object.entries(Filters).map(([label, value]) => (
                <button
                    key={value}
                    style={{
                        padding: '8px',
                        backgroundColor: value == filter ? Colors.Primary : Colors.backgroundLite,
                        color: Colors.PrimaryLite,
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontFamily: 'Bebas Neue',
                        fontSize: '15px',
                    }}
                    onClick={() => setFilter(value)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
export default Filters;