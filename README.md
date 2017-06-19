# Mobile Center Demo App (React Native)

![MC](https://content.screencast.com/users/kangarooo/folders/Jing/media/2c9fa3df-3b84-4a77-8f29-454aceeb098a/2017-06-02_1813.png)

Mobile Center brings together multiple services, commonly used by mobile developers, into a single, integrated product. 
Team members can build, test, distribute, and monitor mobile apps. 
The Demo Application intended to represent the features of the Mobile Center API, 
such as managing cross platform applications and collecting statistics about how application behaves on real users’ devices, 
what kind of crashes occurred and so on. Applications were integrated with social services like Twitter and Facebook, and use Google Fit (Health Kit) to show daily data of user’s activity.


### Android platform

Run app from command line using 
1. npm install
1. react-native run-android

If you have no react native environment on your computer, follow instructions from [React Native. Getting started](https://facebook.github.io/react-native/docs/getting-started.html)


### Google fit setup

#### Release build:
Just build application in release mode. It will use Google Fit’s application from our google fit developer console.

#### Debug build:

You have to provide SHA1 of your debug keystore

1. Locate your debug keystore file. The file name is debug.keystore, and is created the first time you build your project. 
By default, it is stored in the same directory as your Android Virtual Device (AVD) files:

  * macOS and Linux: ~/.android/
  * Windows Vista and Windows 7: C:\Users\your_user_name\.android\

2. List the SHA-1 fingerprint:
  * For Linux or macOS, open a terminal window and enter the following:
keytool -list -v -keystore ~/.android/debug.keystore –alias androiddebugkey -storepass android -keypass android
  * For Windows Vista and Windows 7, run:
keytool -list -v –keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android

You should see output similar to this:

```
Alias name: androiddebugkey
Creation date: Jan 01, 2013
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, O=Android, C=US
Issuer: CN=Android Debug, O=Android, C=US
Serial number: 4aa9b300
Valid from: Mon Jan 01 08:04:04 UTC 2013 until: Mon Jan 01 18:04:04 PST 2033
Certificate fingerprints:
     MD5:  AE:9F:95:D0:A6:86:89:BC:A8:70:BA:34:FF:6A:AC:F9
     SHA1: BB:0D:AC:74:D3:21:E1:43:07:71:9B:62:90:AF:A1:66:6E:44:5D:75
     Signature algorithm name: SHA1withRSA
     Version: 3  
The line that begins with SHA1 contains the certificate's SHA-1 fingerprint. The fingerprint is the sequence of 20 two-digit hexadecimal numbers separated by colons.
```

3. Go to the Google API Console.
4. Select a project, or create a new one. 
5. Click Continue to enable the Fitness API.
6. Click Go to credentials.
7. Click New credentials, then select OAuth Client ID.
8. Under Application type select Android.
9. In the resulting dialog, enter your app's SHA-1 fingerprint and package name. For example:
```
BB:0D:AC:74:D3:21:E1:43:67:71:9B:62:91:AF:A1:66:6E:44:5D:75
com.example.android.fit-example
```
10. Click Create. 
Your new Android OAuth 2.0 Client ID and secret appear in the list of IDs for your project. An OAuth 2.0 Client ID is a string of characters, something like this:
```
780816631155-gbvyo1o7r2pn95qc4ei9d61io4uh48hl.apps.googleusercontent.com
```

For more information visit [Google developers](https://developers.google.com/fit/overview) site.

### iOS platform

NOTE! You will need macOS.

Run app from command line using 
1. npm install
1. react-native run-ios

If you have no react native environment on your computer, follow instructions from [React Native. Getting started](https://facebook.github.io/react-native/docs/getting-started.html)
