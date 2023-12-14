using Microsoft.VisualStudio.TestTools.UnitTesting;
using ComicCompanion.Models;
using System.Text.Json;


namespace ComicCompanion.Tests
{
    [TestClass]
    public class ReadingListHelperTests
    {


        [TestMethod]
        public void DeserializeIssues_SerializedIssuesString_IssuesList()
        {
            string serializedIssues = "[{\"issueId\":\"1\",\"comicId\":\"batman-the-dark-knight-1986\",\"Pages\":[]},{\"issueId\":\"2\",\"comicId\":\"batman-the-dark-knight-1986\",\"Pages\":[]},{\"issueId\":\"3\",\"comicId\":\"batman-the-dark-knight-1986\",\"Pages\":[]},{\"issueId\":\"4\",\"comicId\":\"batman-the-dark-knight-1986\",\"Pages\":[]}]";

            Issue[] results = ReadingListHelper.DeserializeIssues(serializedIssues);


            Issue[] expectedResult = {new Issue(){IssueId="1", ComicId="batman-the-dark-knight-1986"}, new Issue() { IssueId = "2", ComicId = "batman-the-dark-knight-1986",}, new Issue() { IssueId = "3", ComicId = "batman-the-dark-knight-1986"},
            new Issue(){IssueId="4", ComicId="batman-the-dark-knight-1986"},};

            System.Console.WriteLine(JsonSerializer.Serialize(results));


            Assert.AreEqual(expectedResult.Length, results.Length);
            Assert.AreEqual($"{results[0].ComicId} {results[0].IssueId}", "batman-the-dark-knight-1986 1");
            Assert.AreEqual($"{results[1].ComicId} {results[1].IssueId}", "batman-the-dark-knight-1986 2");
            Assert.AreEqual($"{results[2].ComicId} {results[2].IssueId}", "batman-the-dark-knight-1986 3");
            Assert.AreEqual($"{results[3].ComicId} {results[3].IssueId}", "batman-the-dark-knight-1986 4");
        }
    }
}
