import { Style } from "../assets/Style";
import { useSearchParams } from "react-router-dom";
function Filters({ filter }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const setFilter = (value) => {
        const currentFilter = Number(searchParams.get('filter')) || 0;
        currentFilter != value && setSearchParams({ filter: value });
    }
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