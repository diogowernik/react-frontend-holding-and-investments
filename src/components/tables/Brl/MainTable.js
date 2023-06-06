import React from "react";
import GroupedTables from "../MainTables";

const MainTable = ({grouped_assets}) => {

    return (
        <GroupedTables
        currency="brl"
        grouped_assets={grouped_assets}
        />  
    )
};

export default MainTable;