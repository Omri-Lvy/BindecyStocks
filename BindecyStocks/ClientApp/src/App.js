import {useState} from 'react';
import './styles/index.css'
import StocksList from "./components/StocksList.jsx";
import StockTable from "./components/StockTable";


function App() {
    const [stock, setStock] = useState(null)
    const handleStockSelection = (e) => {
        setStock(e.target.value);
    }
    
    return (
        <>
            <h1 id="title">BINDECY STOCKS</h1>
            <StocksList stockClickHandler={handleStockSelection}/>
            <StockTable stock={stock}/>
        </>
    );
}

export default App;