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
    
    return (
        <div id="stocksList">
            {
                stocksNames.length <= 0 ?
                    <h3>Loading...</h3> :
                    <>
                        {stocksNames.map((name,index)=> (
                                <StockCard key={name} name={name} stockClickHandler={stockClickHandler}/>
                            )
                        )}
                    </>
            }
        </div>
    );
}

export default StocksList;