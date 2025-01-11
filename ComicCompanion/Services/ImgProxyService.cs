namespace ComicCompanion.Services;

public class ImgProxyService
{
    private static HttpClient _client = new HttpClient { Timeout = new TimeSpan(0, 0, 15) };
    public static async Task<byte[]> LoadImg(string imgUrl, string cookie)
    {
        _client.DefaultRequestHeaders.Add("Cookie", cookie);
        var response = await _client.GetAsync(imgUrl);
        var content = await response.Content.ReadAsByteArrayAsync();

        return content;
    }
}