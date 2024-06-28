using Microsoft.VisualStudio.TestTools.UnitTesting;
using ComicCompanion.Models;

namespace ComicCompanion.Tests
{
    [TestClass]
    public class ComicHelperTests
    {

        [TestMethod]
        public void FormatSearchKeyword_AdjustStringForSearch_String()
        {
            string searchString = "batman (2011)";
            string formattedString = ComicHelper.FormatSearchKeyword(searchString);

            Assert.AreEqual("batman+%282011%29", formattedString);
        }





    }
}
