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
                StockRowModel[] allData = reader.GetRecords<StockRowModel>().ToArray();
                if (startDate != null || endDate != null) {
                    return new StockDataModel(allData,sortBy,sortDir,page,pageSize,startDate,endDate);
                }

                return new StockDataModel(allData,sortBy,sortDir,page,pageSize);
            }
        }
    }
}