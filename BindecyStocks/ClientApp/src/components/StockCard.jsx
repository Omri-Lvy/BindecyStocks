
function StockCard({name,stockClickHandler}) {
    return (
        <label className="stockCard">
            {name}
            <input type="radio" name="stock" value={name} onChange={stockClickHandler}/>
        </label>
    );
}

export default StockCard;