using System.Text.Json.Serialization;

namespace ComicCompanion.Models
{
    public class ReadingListIssue
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("date")]
        public string Date { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("pages")]
        public int Pages { get; set; }

        [JsonPropertyName("comicId")]
        public string ComicId { get; set; }

        [JsonPropertyName("comicName")]
        public string ComicName { get; set; }
    }
}