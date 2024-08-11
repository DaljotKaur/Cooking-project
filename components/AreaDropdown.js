import React from "react";

const AreaDropdown = ({ areas, selectedArea, setSelectedArea }) => {
    return (
        <>
        <h2 className="text-black text-center mb-2">Area</h2>
        <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-black" // Change color here
            style={{ color: "black", backgroundColor: "white" }} // Change color of options
        >
            <option value="" style={{ color: "black" }}>All Areas</option>
            {areas.map((area) => (
                <option key={area} value={area} style={{ color: "black" }}>
                    {area}
                </option>
            ))}
        </select></>
    );
};

export default AreaDropdown;
