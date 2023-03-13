import {useEffect, useState} from "react";
import StockCard from "./StockCard";

function StocksList({stockClickHandler}) {
    const [stocksNames,setStocksNames] = useState([]);
    
    const getStocksNames= async () => {
        const response = await fetch('api/stocks');
        const data = await response.json();
        setStocksNames(data);
    } 
    
    useEffect(()=>{
        getStocksNames();
    },[setStocksNames])
    
    const stocksListRenderer = () => {
        if (stocksNames.length <= 0) {
            return <h3>Loading...</h3>
        }
        return (
            <>
                {stocksNames.map((name,index)=>{
                return (
                    <StockCard key={name+index} name={name} stockClickHandler={stockClickHandler}/>
                )
            })}          
            </>
        )
    }
    
    return (
        <div id="stocksList">
            {stocksListRenderer()}
        </div>
    );
}

export default StocksList;