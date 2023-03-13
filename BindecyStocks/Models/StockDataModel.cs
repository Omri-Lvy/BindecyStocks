namespace BindecyStocks.Models;

public class StockDataModel
{
    
    public StockRowModel[] stockData { get; }
    public int totalRecords { get; }
    public int numberOfPages { get; }
    public string startDate { get; }
    public string endDate { get; }

    public StockDataModel(StockRowModel[] data, string? sortBy = null, int sortDir = 0, int page = 0, int pageSize = 25)
    {
        stockData = Sort(data, sortBy, sortDir, page, pageSize);
        totalRecords = data.Count();
        numberOfPages = (int)Math.Ceiling((double)totalRecords / pageSize);
        startDate = MinDate(data);
        endDate = MaxDate(data);
    }
    public StockDataModel(StockRowModel[] data, string? sortBy = null, int sortDir = 0, int page = 0, int pageSize = 25, DateTime? minDate = null, DateTime? maxDate = null)
    {
        IEnumerable<StockRowModel> filteredData = data.Where(x => 
            DateTime.Parse(x.date).CompareTo(minDate ?? DateTime.MinValue) >= 0 && 
            DateTime.Parse(x.date).CompareTo(maxDate ?? DateTime.MaxValue) <= 0);
        stockData = Sort(filteredData, sortBy, sortDir, page, pageSize);
        totalRecords = filteredData.Count();
        numberOfPages = (int)Math.Ceiling((double)totalRecords / pageSize);
        startDate = MinDate(data);
        endDate = MaxDate(data);
    }

    private static string MaxDate(StockRowModel[] data)
    {
        DateTime max = DateTime.MinValue;
        foreach (StockRowModel row in data)
        {
            if (DateTime.Parse(row.date).CompareTo(max) > 0)
            {
                max = DateTime.Parse(row.date);
            }   
        }

        return max.ToString("yyyy-MM-dd");
    }
    
    private static string MinDate(StockRowModel[] data)
    {
        DateTime min = DateTime.MaxValue;
        foreach (StockRowModel row in data)
        {
            if (DateTime.Parse(row.date).CompareTo(min) < 0)
            {
                min = DateTime.Parse(row.date);
            }   
        }

        return min.ToString("yyyy-MM-dd");
    }

    private static StockRowModel[] Sort(IEnumerable<StockRowModel> filteredData, string? sortBy, int sortDir, int page, int pageSize)
    {
        IEnumerable<StockRowModel> temp = filteredData.Skip(page * pageSize).Take(pageSize);
        switch (sortBy)
        {
            case "date":
                return sortDir < 0 ? temp.OrderByDescending(x => x.date).ToArray() : temp.OrderBy(x => x.date).ToArray();
            case "open":
                return sortDir < 0 ? temp.OrderByDescending(x => x.open).ToArray() : temp.OrderBy(x => x.open).ToArray();
            case "high":
                return sortDir < 0 ? temp.OrderByDescending(x => x.high).ToArray() : temp.OrderBy(x => x.high).ToArray();
            case "low":
                return sortDir < 0 ? temp.OrderByDescending(x => x.low).ToArray() : temp.OrderBy(x => x.low).ToArray();
            case "close":
                return sortDir < 0 ? temp.OrderByDescending(x => x.close).ToArray() : temp.OrderBy(x => x.close).ToArray();
            case "adjClose":
                return sortDir < 0 ? temp.OrderByDescending(x => x.adjClose).ToArray() : temp.OrderBy(x => x.adjClose).ToArray();
            case "volume":
                return sortDir < 0 ? temp.OrderByDescending(x => x.volume).ToArray() : temp.OrderBy(x => x.volume).ToArray();
            default:
                return temp.ToArray();
        }
    }
}