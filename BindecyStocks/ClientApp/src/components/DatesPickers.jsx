
function DatesPickers({minDate, maxDate,startDateInput,endDateInput,resetBtn,inputHandler}) {
    return (
        <div id="datePickerContainer">
            <label className="datePickerLabel">
                <span>Start Date</span>
                <input ref={startDateInput} type="date" name="startDate" min={minDate} max={maxDate} onInput={inputHandler}/>
            </label>
            <label className="datePickerLabel">
                <span>End Date</span>
                <input ref={endDateInput} type="date" name="endDate" min={minDate} max={maxDate} onInput={inputHandler}/>
            </label >
            <button type="button" ref={resetBtn} onClick={inputHandler}>
                Clear Dates
            </button>
        </div>
    );
}

export default DatesPickers;