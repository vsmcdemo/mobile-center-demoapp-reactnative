using System;
using System.IO;
using System.Linq;
using Xamarin.UITest;
using Xamarin.UITest.Queries;

namespace MCXamarinUITests
{
    public class AppInitializer
    {
        public static IApp StartApp(Platform platform)
        {
            if (platform == Platform.Android)
            {

                return ConfigureApp.Android
                    .InstalledApp("com.mobilecenter")
                    .DeviceSerial("emulator-5554")
                    .StartApp();
            }

            if (platform == Platform.iOS)
            {
                return ConfigureApp
                    .iOS
                    .InstalledApp("com.mobilecenter")
                    .StartApp();
            }

            throw new PlatformNotSupportedException();
        }
    }
}

