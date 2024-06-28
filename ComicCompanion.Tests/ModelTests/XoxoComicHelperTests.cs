using Microsoft.VisualStudio.TestTools.UnitTesting;
using ComicCompanion.Models;
using System.Threading.Tasks;



namespace ComicCompanion.Tests
{
    [TestClass]
    public class XoxoComicHelperTests
    {

        [TestMethod]
        public async Task Search_GetAllComicsFromSearchResult_SearchResultDto()
        {
            var searchResult = await XoxoComicHelper.Search("batman", 1);

            Assert.IsNotNull(searchResult);
            Assert.AreEqual(searchResult.Comics.Count, 36);
            Assert.AreEqual(searchResult.MaxPage, 7);
        }
        [TestMethod]
        public async Task SearchPagination_GetAllComicsFromDifferentPage_SearchResultDto()
        {
            var searchResult = await XoxoComicHelper.Search("ghost rider", 2);

            Assert.IsNotNull(searchResult);
            Assert.AreEqual(searchResult.Comics.Count, 21);
            Assert.AreEqual(searchResult.MaxPage, 2);
            Assert.AreEqual(searchResult.CurrentPage, 2);

        }

        [TestMethod]
        public async Task Popular_GetAllPopularComics_SearchResultDto()
        {
            var searchResult = await XoxoComicHelper.Popular(1);

            Assert.IsNotNull(searchResult);
            Assert.AreEqual(searchResult.Comics.Count, 36);
            Assert.AreEqual(searchResult.MaxPage, 7);
        }

        [TestMethod]
        public async Task PopularPagination_GetAllPopularComicsFromDifferentPage_SearchResultDto()
        {
            var searchResult = await XoxoComicHelper.Popular(15);

            Assert.IsNotNull(searchResult);
            Assert.AreEqual(searchResult.Comics.Count, 36);
            Assert.AreEqual(searchResult.MaxPage, 18);
            Assert.AreEqual(searchResult.CurrentPage, 15);

        }

        [TestMethod]
        public async Task GetComicFromId_GetComicInfoWithGivenId_Comic()
        {
            var comic = await XoxoComicHelper.GetComicFromId("venom-2018");
            Assert.IsNotNull(comic);
            Assert.AreEqual(comic.Name, "Venom (2018)");
            Assert.AreEqual(comic.ComicId, "venom-2018");
            Assert.AreEqual(comic.IssueIds.Count, 37);
            Assert.AreEqual(comic.CoverImg, "https://1.bp.blogspot.com/-JvxyEVuIcM0/XmmL6nfOdvI/AAAAAAAAVlo/UTpI3LsDujcK1zqg0ATd78kK0SWwR7frgCLcBGAsYHQ/s1600/Venom%2B%25282018%2529-min.jpg");
        }

        [TestMethod]
        public async Task GetPagesFromIssues_GetAllPagesOfAnIssue_StringArray()
        {
            Issue testIssue = new Issue() { ComicId = "batman-2011", IssueId = "24" };
            var pages = await XoxoComicHelper.GetPagesFromIssue(testIssue);

            Assert.IsNotNull(pages);
            Assert.AreEqual(56, pages.Length);
        }







    }
}
