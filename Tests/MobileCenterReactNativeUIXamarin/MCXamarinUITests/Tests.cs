using System;
using System.IO;
using System.Linq;
using NUnit.Framework;
using Xamarin.UITest;
using Xamarin.UITest.Queries;

namespace MCXamarinUITests
{
    using NUnit.Framework;
    using System;
    using System.Linq;
    using Xamarin.UITest;

    [TestFixture(Platform.Android)]
    [TestFixture(Platform.iOS)]
    public class Tests
    {
        private IApp _app;
        private readonly Platform _platform;

        public Tests(Platform platform)
        {
            _platform = platform;
        }

        [SetUp]
        public void BeforeEachTest()
        {
            _app = AppInitializer.StartApp(_platform);
        }

        [Test]
        public void CheckFacebookButton()
        {
            const string buttonName = "LOGIN VIA FACEBOOK";

            _app.WaitForElement(x => x.All());

            var button = _app.Query(buttonName);

            Assert.IsNotEmpty(button);
        }

        [Test]
        public void CheckTwitterButton()
        {
            const string buttonName = "LOGIN VIA TWITTER";

            _app.WaitForElement(x => x.All());

            var button = _app.Query(buttonName);

            Assert.IsNotEmpty(button);
        }

        [Test]
        public void CheckLoginPage()
        {
            const string buttonName = "LOGIN VIA FACEBOOK";

            _app.WaitForElement(x => x.All());

            _app.Tap(x => x.Text(buttonName));
            _app.WaitForElement(x => x.All());
            var webView2 = _app.Query(x => x.Css("TITLE"));
            var webView = _app.Query(x => x.WebView());
            Assert.IsNotEmpty(webView2);
            _app.WaitForElement(x => x.Css("input[type=email]"), timeout: TimeSpan.FromSeconds(100));
       

            var title = _app.Query(x=> x.Css("_2pie"));
            Assert.IsNotEmpty(title);
            
        }
    }
}

