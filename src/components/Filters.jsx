import { Colors } from "../assets/Colors";
function Filters({ filter, setFilter }) {
    const Filters = {
        Recent: 0,
        Popular: 1,
        Controversial: 2,
        Rechrips: 3,
        Comments: 4,
        Everything: 5
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: '10px',
            flexWrap: "wrap",
            gap: "5px"
        }}>
            {Object.entries(Filters).map(([label, value]) => (
                <button
                    key={value}
                    style={{
                        padding: '8px',
                        backgroundColor: value == filter ? Colors.Primary : Colors.backgroundLite,
                        color: value == 5 ? "red" : Colors.PrimaryLite,
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontFamily: 'Bebas Neue',
                        fontSize: '20px',
                        userSelect: 'none'
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