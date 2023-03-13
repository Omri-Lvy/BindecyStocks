import StockTableData from "./StockTableData";
import DatesPickers from "./DatesPickers";
import Pagination from "./Pagination";
import stringToTitle from "../utils/stringToTitle";
import {useEffect, useRef, useState} from "react";


function StockTable({stock}) {
    const [tableData,setTableData] = useState([]);
    const [columns,setColumns] = useState([]);
    const [minDate,setMinDate] = useState('');
    const [maxDate,setMaxDate] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [numOfPages,setNumOfPages] = useState(0);
    const [currentPage,setCurrentPage] = useState(0);
    const [pageSize,setPageSize] = useState(25);
    const [numOfEntries,setNumOfEntries] = useState(0)
    const [sortDir,setSortDir] = useState(0);
    const [sortBy,setSortBy] = useState('');
    const startDateInput = useRef();
    const endDateInput = useRef();
    
    const fetchData = async (stock,page) => {
        try {
            const response = await fetch(`api/stocks/${stock}?startDate=${startDate ?? startDate}&endDate=${endDate ?? endDate}&page=${page || currentPage}&pageSize=${pageSize}&sortBy=${sortBy??''}&sortDir=${sortDir}`)
            const data = await response.json();
            setTableData(data["stockData"]);
            setMinDate(data["startDate"]);
            setMaxDate(data["endDate"]);
            setNumOfPages(data["numberOfPages"]);
            setNumOfEntries(data["totalRecords"]);
            const cols = []
            if (data["stockData"].length > 0) {
                Object.keys(data["stockData"][0]).forEach(key => {
                    cols.push({Header:stringToTitle(key),accessor:key})
                })
                setColumns(cols)
            }
        }
        catch (error) {
            console.log(error);
            setTableData([]);
            setColumns([]);
            setMinDate('');
            setMaxDate('');
            setNumOfPages(0);
            setNumOfEntries(0);
        }
    }
    
    const sortHandler = (e) => {
        e.stopPropagation();
        if (sortDir === 0) {
            setSortDir(-1)
            setSortBy(e.currentTarget.ariaLabel)
        }
        else if (sortDir === -1) {
            setSortDir(1)
            setSortBy(e.currentTarget.ariaLabel)
        }
        else {
            setSortDir(0)
            setSortBy(null)
        }
        
    }
    
    const pagePaginationHandler = (e) => {
        e.stopPropagation();
        const page = Math.min(Math.max(parseInt(e.currentTarget.value), 0), numOfPages-1);
        setCurrentPage(page);
    }
    
    const datePickerHandler = (e) => {
        setStartDate(startDateInput.current?.value);
        setEndDate(endDateInput.current?.value);
    }

    const resetDatesFilter = (e) => {
        startDateInput.current.value = '';
        endDateInput.current.value = '';
        setStartDate(startDateInput.current?.value);
        setEndDate(endDateInput.current?.value);
    }
    
    const pageSizeHandler = (e) => {
        setPageSize(e.target.value)
    }
    
    useEffect(()=> {
        if (currentPage !== 0) {
            fetchData(stock)
        }
    },[currentPage])
    
    useEffect(()=> {
        if (stock) {
            setCurrentPage(0)
            fetchData(stock,0)
        }
    },[stock,startDate,endDate,pageSize,sortBy,sortDir])
    return (
        <div id="dataContainer">
            <div id="filtersContainer">
                <DatesPickers minDate={minDate} maxDate={maxDate} startDateInput={startDateInput} endDateInput={endDateInput} inputHandler={datePickerHandler} resetHandler={resetDatesFilter}/>
                <Pagination currentPage={currentPage} numOfPages={numOfPages} pagePaginationHandler={pagePaginationHandler} pageSize={pageSize} numOfEntries={numOfEntries} pageSizeHandler={pageSizeHandler} data={tableData}/>
            </div>
            {
                tableData.length > 0 ?
                    <div id="tableContainer">
                        <StockTableData data={tableData} columns={columns} sortBy={sortBy} sortDir={sortDir} sortHandler={sortHandler}/> 
                    </div> :
                    <div id="noData">
                        <h3>No Available Data...</h3>
                        <span>Please select on of the stock above or change your filters</span>
                    </div>
            }
        </div>
    )
}


export default StockTable;