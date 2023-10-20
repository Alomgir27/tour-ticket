import React from "react";

function HighlightList({ list }) {
    return (
        <ul className="list-disc flex flex-col gap-2.5 ml-4">
            <li>Discover all three branches of the Chicago River with your guide, an expert in architecture</li>
            <li>Enjoy the best vantage point to admire the distinct city skyline and architecture</li>
            <li>See more than 40 buildings including the Wrigley Building and Willis Tower</li>
            <li>Discover the major events that helped shape the architectural history of Chicago</li>
        </ul>
    );
}

export default HighlightList;
