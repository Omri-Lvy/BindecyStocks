using CsvHelper.Configuration.Attributes;

namespace BindecyStocks.Models;

public class StockRowModel
{
    [Name("Date")]
    public string date { get; set; }

    [Name("Open")]
    public double open { get; set; }

    [Name("High")]
    public double high { get; set; }

    [Name("Low")]
    public double low { get; set; }

    [Name("Close")]
    public double close { get; set; }

    [Name("Adj Close")]
    public double adjClose { get; set; }

    [Name("Volume")]
    public double volume { get; set; }

}