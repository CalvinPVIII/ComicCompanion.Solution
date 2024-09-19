using Microsoft.VisualStudio.TestTools.UnitTesting;
using ComicCompanion.Models;
using System.Threading.Tasks;



namespace ComicCompanion.Tests
{
    [TestClass]
    public class ComicExtraHelperTests
    {



        [TestMethod]
        public async Task GetPagesFromIssues_GetAllPagesOfAnIssue_StringArray()
        {
            Issue testIssue = new Issue() { ComicId = "batman-2016", IssueId = "24" };
            var pages = await ComicExtraHelper.GetPagesFromIssue(testIssue);

            Assert.IsNotNull(pages);
            Assert.AreEqual(25, pages.Length);
        }

        [TestMethod]
        public async Task Search_GetAllComicsFromSearchResult_SearchResultDto()
        {
            var searchResult = await ComicExtraHelper.Search("batman", 1);

            Assert.IsNotNull(searchResult);
            Assert.AreEqual(searchResult.Comics.Count, 25);
            Assert.AreEqual(searchResult.MaxPage, 7);
            Assert.AreEqual(searchResult.CurrentPage, 1);

        }


        [TestMethod]
        public async Task GetComicFromId_GetComicInfoWithGivenId_Comic()
        {
            var comic = await ComicExtraHelper.GetComicFromId("venom-2018");
            Assert.IsNotNull(comic);
            Assert.AreEqual(comic.Name, "Venom (2018-)");
            Assert.AreEqual(comic.ComicId, "venom-2018");
            Assert.AreEqual(comic.IssueIds.Count, 36);
            Assert.AreEqual(comic.CoverImg, "https://readcomicsonline.ru/uploads/manga/venom-2018/cover/cover_250x350.jpg");
        }






    }
}
