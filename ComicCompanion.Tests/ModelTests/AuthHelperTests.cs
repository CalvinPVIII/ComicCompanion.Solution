using Microsoft.VisualStudio.TestTools.UnitTesting;
using ComicCompanion.Models;

namespace ComicCompanion.Tests
{
    [TestClass]
    public class AuthHelperTests
    {

        [TestMethod]
        public void GetUserId_NullIfNoAuthHeader_Null()
        {
            var result = AuthHelper.GetUserId(null);
            Assert.IsNull(result);
        }

        [TestMethod]
        public void GetUserId_ReturnUserId_String()
        {
            var result = AuthHelper.GetUserId("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxNjhlNzZjMi1iNDZhLTQ2MDMtOWQwNC1iOTQ5Mjc0NGMxZDgiLCJleHAiOjE3MTk2MDk2NTUsImlzcyI6IkNvbWljQ29tcGFuaW9uIiwiYXVkIjoiQ29taWNDb21wYW5pb24ifQ.Q4KfTkyJuFL9umroRgYbUe-p9DFH9UoSHvrnUin7xls");

            Assert.AreEqual("168e76c2-b46a-4603-9d04-b9492744c1d8", result);
        }




    }
}
