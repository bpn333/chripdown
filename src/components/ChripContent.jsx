import { marked } from "marked";
import { memo } from "react";
import './chrip_overide.css'

function ChripContent({ content }) {
    const styles = {
        chripContent: {
            marginBottom: '10px',
            fontFamily: 'Roboto Mono',
            maxWidth: '100%',
            overflowWrap: "break-word"
        },
    }
    return (
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} style={styles.chripContent} />
    )
}

export default memo(ChripContent);