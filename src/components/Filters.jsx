import { Style } from "../assets/Style";
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
                        backgroundColor: value == filter ? Style.primary : Style.backgroundLite,
                        color: value == 5 ? "red" : Style.primaryLite,
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontFamily: Style.font2,
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