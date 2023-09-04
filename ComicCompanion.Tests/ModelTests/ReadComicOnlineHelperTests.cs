// using Microsoft.VisualStudio.TestTools.UnitTesting;
// using ComicCompanion.Models;
// using System.Threading.Tasks;


// namespace Project.Tests
// {
//     [TestClass]
//     public class ClassTests
//     {

//         [TestMethod]
//         public async Task GetPagesFromIssue_Issue_PagesStringArray()
//         {
//             Issue issue = new Issue() { ComicId = "batman-2011", IssueId = "1" };
//             string[] pages = await ReadComicOnlineHelper.GetPagesFromIssue(issue);
//             Assert.AreEqual(30, pages.Length);
//         }

//         [TestMethod]
//         public async Task Search_OneWordSearchParameter_ComicList()
//         {
//             Comic[] searchResults = await ReadComicOnlineHelper.Search("batman");
//             Assert.IsTrue(searchResults.Length >= 644);
//         }

//         [TestMethod]
//         public async Task Search_MultipleWordSearch_ComicList()
//         {
//             Comic[] searchResults = await ReadComicOnlineHelper.Search("ghost rider");
//             Assert.IsTrue(searchResults.Length >= 53);
//         }

//         [TestMethod]
//         public async Task Search_WordWithParenthesis_ComicList()
//         {
//             Comic[] searchResults = await ReadComicOnlineHelper.Search("batman (2011)");
//             Assert.IsTrue(searchResults.Length >= 12);
//         }



//     }
// }
