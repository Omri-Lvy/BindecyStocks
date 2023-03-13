
function StockTableData({data, columns,sortBy, sortDir, sortHandler}) {
    return (
        <table id="stockDataTable">
            <thead>
                <tr>
                    {columns.map(column => {
                    return (
                        <th key={"th"+column["Header"]} onClick={sortHandler} aria-label={column["accessor"]}>
                            {column["Header"]}
                            <span>
                               {sortBy === column["accessor"]
                                   ? sortDir < 0
                                       ? ' ▼'
                                       : ' ▲'
                                   : ''}
                            </span>
                        </th>
                        )})}
                </tr>
            </thead>
            <tbody>
            {data.map((row,index) => {
                    return (
                        <tr key={"Row"+index}>
                            {Object.keys(row).map(key => {
                                return (
                                    <td key={"Cell"+row+key+index}>{row[key]}</td>
                                )
                            })}
                        </tr>
                    )}
            )}
            </tbody>
        </table>
    );
}

export default StockTableData;