using Microsoft.VisualStudio.TestTools.UnitTesting;
using ComicCompanion.Models;
using System.Threading.Tasks;
using AngleSharp.Text;


namespace Project.Tests
{
    [TestClass]
    public class ComicExtraHelperTests
    {

        [TestMethod]
        public async Task GetPagesFromIssue_GetAllPagesFromIssueOfComic_StringArray()
        {
            Issue issue = new Issue() { ComicId = "batman-2011", IssueId = "1" };
            string[] pages = await ComicExtraHelper.GetPagesFromIssue(issue);
            Assert.AreEqual(pages.Length, 30);
            Assert.IsTrue(pages.Contains("https://2.bp.blogspot.com/R2aPe7pFTOa9TBp7XDofGc9jhlLtLAS82cisIhr1mMrCxedGoDitxU14ElalFPJTp7klX441kqtQ=s1600"));
        }

        [TestMethod]
        public async Task Search_OneWordSearchParameter_ComicList()
        {
            Comic[] searchResults = await ComicExtraHelper.Search("batman");
            System.Console.WriteLine(searchResults.Length);
            Assert.IsTrue(searchResults.Length >= 25);
        }
        [TestMethod]
        public async Task Search_MultipleWordSearchParameter_ComicList()
        {
            Comic[] searchResults = await ComicExtraHelper.Search("man without fear");
            Assert.IsTrue(searchResults.Length >= 4);
        }

        [TestMethod]
        public async Task Search_KeywordAndPageNumber_ComicList()
        {
            Comic[] searchResults = await ComicExtraHelper.Search("ghost rider", 3);
            Assert.IsTrue(searchResults.Length >= 3);
        }

        [TestMethod]
        public async Task Search_WordWithParenthesis_ComicList()
        {
            Comic[] searchResults = await ComicExtraHelper.Search("batman (2011)");
            Assert.IsTrue(searchResults.Length >= 9);
        }

        [TestMethod]
        public async Task GetComicFromId_ComicId_Comic()
        {
            Comic comic = await ComicExtraHelper.GetComicFromId("batman-2011");
            Assert.AreEqual(comic.CoverImg, "https://4.bp.blogspot.com/-bs4rK8v-u5s/XBNwBCCJAdI/AAAAAAAAI2w/5fdjAEL_Zzo4QMt-wZO_fQxIe2nGEh57QCLcBGAs/s1600/Batman%2B%25282011%2529-min.jpg");
            Assert.AreEqual(comic.Name, "Batman (2011)");
        }



    }
}
