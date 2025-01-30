# expo-native-configuration

My new module

# API documentation

- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/www.google.com#readme/)
- [Documentation for the main branch](https://docs.expo.dev/versions/unversioned/sdk/www.google.com#readme/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-native-configuration
```

### Configure for Android




### Configure for iOS

Run `npx pod-install` after installing the npm package.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).



This file defines a **custom native module** for Expo, written in **Kotlin**, allowing **React Native** (JavaScript) to interact with native Android functionality.

### **Breakdown of the File**
#### **1. Package Declaration**
```kotlin
package expo.modules.nativeconfiguration
```
This declares the package the module belongs to, following standard **Kotlin/Java packaging** conventions.

#### **2. Imports**
```kotlin
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL
import android.content.pm.PackageManager
```
- `expo.modules.kotlin.modules.Module`: Base class for creating an Expo module.
- `expo.modules.kotlin.modules.ModuleDefinition`: Defines the structure of the module.
- `java.net.URL`: Used for handling URL values.
- `android.content.pm.PackageManager`: Used to fetch application metadata.

#### **3. Class Definition**
```kotlin
class ExpoNativeConfigurationModule : Module() {
```
- `ExpoNativeConfigurationModule` extends `Module`, meaning it is an **Expo module** that exposes native functionality to JavaScript.

#### **4. Module Definition (`definition()`)**
The `definition()` function is overridden to define how the module behaves and interacts with JavaScript.

---

### **Key Components of the Module**
#### **1. Naming the Module**
```kotlin
Name("ExpoNativeConfiguration")
```
- Sets the **module's name** for JavaScript. It will be accessible as:
  ```javascript
  import { NativeModules } from 'react-native';
  const { ExpoNativeConfiguration } = NativeModules;
  ```

---

#### **2. Fetching API Key from Android Metadata**
```kotlin
Function("getApiKey") {
  val applicationInfo = appContext?.reactContext?.packageManager?.getApplicationInfo(
    appContext?.reactContext?.packageName.toString(),
    PackageManager.GET_META_DATA
  )
  return@Function applicationInfo?.metaData?.getString("MY_CUSTOM_API_KEY")
}
```
- Retrieves an API key (`MY_CUSTOM_API_KEY`) from the app's **AndroidManifest.xml** metadata.
- This method is **exposed to JavaScript** via:
  ```javascript
  const apiKey = await ExpoNativeConfiguration.getApiKey();
  ```

---

#### **3. Constants**
```kotlin
Constants(
  "PI" to Math.PI
)
```
- Exposes a **constant value** (`PI = 3.14159`) to JavaScript:
  ```javascript
  console.log(ExpoNativeConfiguration.PI); // 3.14159
  ```

---

#### **4. Event Handling**
```kotlin
Events("onChange")
```
- Declares an **event** (`onChange`) that can be sent from Kotlin to JavaScript.

---

#### **5. A Synchronous Function (`hello()`)**
```kotlin
Function("hello") {
  "Hello world! 👋"
}
```
- Exposes a **synchronous function** to JavaScript:
  ```javascript
  console.log(ExpoNativeConfiguration.hello()); // "Hello world! 👋"
  ```

---

#### **6. An Asynchronous Function (`setValueAsync()`)**
```kotlin
AsyncFunction("setValueAsync") { value: String ->
  sendEvent("onChange", mapOf("value" to value))
}
```
- Exposes an **asynchronous function** to JavaScript that:
    1. Accepts a `String` parameter.
    2. Sends an event (`onChange`) to JavaScript.
- JavaScript Usage:
  ```javascript
  await ExpoNativeConfiguration.setValueAsync("New Value");
  ```

---

#### **7. Native View Integration**
```kotlin
View(ExpoNativeConfigurationView::class) {
  Prop("url") { view: ExpoNativeConfigurationView, url: URL ->
    view.webView.loadUrl(url.toString())
  }
  Events("onLoad")
}
```
- Defines a **custom native view** (`ExpoNativeConfigurationView`).
- Exposes:
    - A **prop (`url`)** that allows JavaScript to load a URL into a WebView.
    - An **event (`onLoad`)** that signals when the WebView has loaded.

---

### **Summary**
This Kotlin module:
✅ **Exposes Native Android Metadata** (`getApiKey()`).  
✅ **Defines Constants** (`PI`).  
✅ **Implements Sync & Async Functions** (`hello()`, `setValueAsync()`).  
✅ **Sends Events to JavaScript** (`onChange`).  
✅ **Provides a Custom Native View** (`ExpoNativeConfigurationView`).

It enables **React Native apps** to access **native Android configurations** and UI elements efficiently. 🚀
