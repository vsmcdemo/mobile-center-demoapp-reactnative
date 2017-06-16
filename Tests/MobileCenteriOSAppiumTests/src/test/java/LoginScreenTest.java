import com.gargoylesoftware.htmlunit.javascript.host.Console;
import com.xamarin.testcloud.appium.EnhancedIOSDriver;
import com.xamarin.testcloud.appium.Factory;
import io.appium.java_client.MobileBy;
import org.junit.*;
import org.junit.rules.TestWatcher;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.MalformedURLException;
import java.net.URL;


public class LoginScreenTest {


    @Rule
    public TestWatcher watcher = Factory.createWatcher();
    private EnhancedIOSDriver<WebElement> driver;
    private static int TimeoutInSeconds = 10;
    private WebDriverWait wait;

    @Before
    public void setup() throws MalformedURLException {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("platformName", "iOS");
        capabilities.setCapability("bundleId", "com.MobileCenter.ReactNativeIOS");
        capabilities.setCapability("deviceName", "iPhone 5s");
        capabilities.setCapability("automationName", "XCUITest");
        capabilities.setCapability("udid", "9E73FFE8-3032-4546-8D77-F2347DB3320D");
        driver = Factory.createIOSDriver(new URL("http://localhost:4723/wd/hub"), capabilities);
        wait = new WebDriverWait(driver, TimeoutInSeconds);
    }

    @After
    public void tearDown() {
        driver.label("Stopping App");
        driver.quit();
    }

    @Test
    public void testTwitterButtonAvailability() {

        By twitterButton = MobileBy.AccessibilityId(" LOGIN VIA TWITTER");

        Assert.assertTrue("Twitter button must exist", isElementPresent(twitterButton));

        WebElement button = driver.findElement(twitterButton);
        Assert.assertTrue("Twitter button must be displayed", button.isDisplayed());
        Assert.assertTrue("Twitter button must be enabled", button.isEnabled());

        String buttonType = button.getTagName();
        Assert.assertEquals("Twitter button must be of button type", buttonType, "XCUIElementTypeOther");
    }

    @Test
    public void testFacebookButtonAvailability() {
        By facebookButton = MobileBy.name(" LOGIN VIA FACEBOOK");

        Assert.assertTrue("Facebook button must exist", isElementPresent(facebookButton));

        WebElement button = driver.findElement(facebookButton);
        Assert.assertTrue("Facebook button must be displayed", button.isDisplayed());
        Assert.assertTrue("Facebook button must be enabled", button.isEnabled());

        String buttonType = button.getTagName();
        Assert.assertEquals("Facebook button must be of button type", buttonType, "XCUIElementTypeOther");

        // initiating facebook login process
        button.click();

        // we have to wait before a web view is presented
        try {
            By webView = MobileBy.className("XCUIElementTypeWebView");
            wait.until(ExpectedConditions.visibilityOfElementLocated(webView));
        } catch (TimeoutException | NoSuchElementException e) {
            Assert.fail("Couldn't found web view");
        }

        // we have to wait before the web view's content is loaded
        try {
            By facebookPage = MobileBy.AccessibilityId("Log in to Facebook | Facebook");
            wait.until(ExpectedConditions.visibilityOfElementLocated(facebookPage));
        } catch (TimeoutException | NoSuchElementException e) {
            Assert.fail("Couldn't found facebook page");
        }

        By facebookLoginField = MobileBy.xpath("//XCUIElementTypeOther[@name=\"main\"]/XCUIElementTypeTextField");
        Assert.assertTrue("Facebook login field must exist", isElementPresent(facebookLoginField));

        By facebookPasswordField = MobileBy.xpath("//XCUIElementTypeOther[@name=\"main\"]/XCUIElementTypeSecureTextField");
        Assert.assertTrue("Facebook password field must exist", isElementPresent(facebookPasswordField));

        By facebookLoginButton = MobileBy.AccessibilityId("Log In");
        Assert.assertTrue("Facebook login button must exist", isElementPresent(facebookLoginButton));

        By facebookRegisterButton = MobileBy.AccessibilityId("Create account");
        Assert.assertTrue("Facebook register button must exist", isElementPresent(facebookRegisterButton));

    }

    protected boolean isElementPresent(By by) {
        try {
            driver.findElement(by);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
