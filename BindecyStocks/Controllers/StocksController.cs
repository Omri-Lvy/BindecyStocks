using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using System.Globalization;
using BindecyStocks.Models;

namespace BindecyStocks.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StocksController
{
    [HttpGet]
    public IEnumerable<string> GetStocksList()
    {
        FileInfo[] filePaths = new DirectoryInfo(@"./Data").GetFiles("*.csv");
        string[] filesNames = new string[filePaths.Length];
        var i = 0;
        foreach (var file in filePaths)
        {
            filesNames[i] = file.Name.Replace(".csv", "");
            i++;
        }

        return filesNames;
    }
    
    [HttpGet("{name}", Name = "stock")]
    public StockDataModel GetStockData(string name, int pageSize = 25, int page = 0, int sortDir = 0, string? sortBy = null, DateTime? startDate = null, DateTime? endDate = null)
    {
        using (var stream = new StreamReader(@"./Data/" + name + ".csv"))
        {
            using (var reader = new CsvReader(stream, CultureInfo.InvariantCulture))
            {
                IEnumerable<StockRowModel> records;
                IEnumerable<StockRowModel> datesRecords = reader.GetRecords<StockRowModel>().ToArray();
                if (startDate != null || endDate != null) {
                    records = datesRecords.Where(x => 
                        DateTime.Parse(x.date).CompareTo(startDate ?? DateTime.MinValue) >= 0 && 
                        DateTime.Parse(x.date).CompareTo(endDate ?? DateTime.MaxValue) <= 0);
                }
                else
                {
                    records = datesRecords;
                }
                
                StockRowModel[] entries = new StockRowModel[] { };
                IEnumerable<StockRowModel> temp = records.Skip(page * pageSize).Take(pageSize);
                switch (sortBy)
                {
                    case "date":
                        entries = sortDir < 0 ? temp.OrderByDescending(x => x.date).ToArray() : temp.OrderBy(x => x.date).ToArray();
                        break;
                    case "open":
                        entries = sortDir < 0 ? temp.OrderByDescending(x => x.open).ToArray() : temp.OrderBy(x => x.open).ToArray();
                        break;
                    case "high":
                        entries = sortDir < 0 ? temp.OrderByDescending(x => x.high).ToArray() : temp.OrderBy(x => x.high).ToArray();
                        break;
                    case "low":
                        entries = sortDir < 0 ? temp.OrderByDescending(x => x.low).ToArray() : temp.OrderBy(x => x.low).ToArray();
                        break;
                    case "close":
                        entries = sortDir < 0 ? temp.OrderByDescending(x => x.close).ToArray() : temp.OrderBy(x => x.close).ToArray();
                        break;
                    case "adjClose":
                        entries = sortDir < 0 ? temp.OrderByDescending(x => x.adjClose).ToArray() : temp.OrderBy(x => x.adjClose).ToArray();
                        break;
                    case "volume":
                        entries =  sortDir < 0 ? temp.OrderByDescending(x => x.volume).ToArray() : temp.OrderBy(x => x.volume).ToArray();
                        break;
                    default:
                        entries = temp.ToArray();
                        break;
                }
                int totalRecords = records.Count();
                int numberOfPages = (int)Math.Ceiling((double)totalRecords / pageSize);
                DateTime min = DateTime.MaxValue;
                DateTime max = DateTime.MinValue;
                
                foreach (StockRowModel row in datesRecords)
                {
                    if (DateTime.Parse(row.date).CompareTo(min) < 0)
                    {
                        min = DateTime.Parse(row.date);
                    }   
                }
                
                foreach (StockRowModel row in datesRecords)
                {
                    if (DateTime.Parse(row.date).CompareTo(max) > 0)
                    {
                        max = DateTime.Parse(row.date);
                    }   
                }
                
                DateTime maxDate = max;
                DateTime minDate = min;


                return new StockDataModel(entries, totalRecords, numberOfPages,minDate,maxDate);
            }
        }
    }
}