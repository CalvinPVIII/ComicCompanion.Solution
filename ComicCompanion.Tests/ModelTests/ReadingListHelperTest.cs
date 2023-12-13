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


            CollectionAssert.AreEqual(expectedResult, results);
        }
    }
}
