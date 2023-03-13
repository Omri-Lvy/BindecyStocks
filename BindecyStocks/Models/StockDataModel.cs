namespace BindecyStocks.Models;

public class StockDataModel
{
    public StockDataModel(StockRowModel[] stockData, int totalRecords, int numberOfPages, DateTime startDate, DateTime endDate)
    {
        this.stockData = stockData;
        this.totalRecords = totalRecords;
        this.numberOfPages = numberOfPages;
        this.startDate = startDate.ToString("yyyy-MM-dd");
        this.endDate = endDate.ToString("yyyy-MM-dd");;
    }

    public StockRowModel[] stockData { get; }
    public int totalRecords { get; }
    public int numberOfPages { get; }
    public string startDate { get; }
    public string endDate { get; }
    
}