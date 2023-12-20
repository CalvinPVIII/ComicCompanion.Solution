namespace ComicCompanion.Models;

public class APIResponseDto
{
    public string Status { get; set; }
    public int StatusCode { get; set; }
    public dynamic Data { get; set; }
    public int? PageNumber { get; set; }



    public APIResponseDto(string status, int statusCode, dynamic data)
    {
        Status = status;
        StatusCode = statusCode;
        Data = data;

    }

    public APIResponseDto(string status, int statusCode, dynamic data, int pageNumber)
    {
        Status = status;
        StatusCode = statusCode;
        Data = data;
        PageNumber = pageNumber;
    }

}