import button from "bootstrap/js/src/button";

function PageSizeButtons({pageSizeHandler,pageSize}) {
    const sizes = [10,25,50,100]
    return (
        <div id="pageSizeContainer">
            {sizes.map(btn => {
                return (
                    <label key={btn}>
                        <span>{btn}</span>
                        <input name="pageSize" type="radio" value={btn} onChange={pageSizeHandler} checked={btn === parseInt(pageSize)}/>
                    </label>
                )
            })}
        </div>
    );
}

export default PageSizeButtons;