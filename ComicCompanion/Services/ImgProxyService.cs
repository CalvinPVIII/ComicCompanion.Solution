using System.IO.Compression;

namespace ComicCompanion.Services;

public class ImgProxyService
{
    private static HttpClient _client = new HttpClient { Timeout = new TimeSpan(0, 0, 15) };
    public static async Task<byte[]> LoadImg(string imgUrl, string cookie)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, imgUrl);


        request.Headers.Add("Accept", "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5");
        request.Headers.Add("Accept-Encoding", "gzip, deflate, br, zstd");
        request.Headers.Add("Accept-Language", "en-US,en;q=0.5");
        request.Headers.Add("Host", "img.batcave.biz");
        request.Headers.Add("Referer", "https://batcave.biz/");
        request.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0");

        if (!string.IsNullOrEmpty(cookie))
        {
            request.Headers.Add("Cookie", cookie);
        }

        var response = await _client.SendAsync(request);


        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Failed to load image. HTTP Status: {response.StatusCode}");
        }

        await using var responseStream = await response.Content.ReadAsStreamAsync();
        await using var decompressionStream = new GZipStream(responseStream, CompressionMode.Decompress);
        using var memoryStream = new MemoryStream();
        await decompressionStream.CopyToAsync(memoryStream);

        return memoryStream.ToArray();
    }
}