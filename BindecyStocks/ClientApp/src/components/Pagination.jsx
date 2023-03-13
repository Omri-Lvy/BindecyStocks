import PageSizeButtons from "./PageSizeButtons";


function Pagination({currentPage, numOfPages, pagePaginationHandler,pageSize, numOfEntries, pageSizeHandler,data}) {
    return (
        data.length > 0 ?
            <div id="paginationContainer">
                <div id="pageNavContainer">
                    <button type="button" value={currentPage-1} onClick={pagePaginationHandler} disabled={currentPage-1 < 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="chevron">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button type="button" value={currentPage+1} onClick={pagePaginationHandler} disabled={currentPage + 1 === numOfPages}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="chevron">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    <span>
                        Entries {currentPage*pageSize+1} to {Math.min((currentPage+1)*pageSize,numOfEntries)}
                    </span>
                </div>
                <PageSizeButtons pageSizeHandler={pageSizeHandler} pageSize={pageSize}/>
            </div>
        : <></>
    )
}

export default Pagination;