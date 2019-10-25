1. npm i
2. react-native link react-native-gesture-handler
   react-native link react-native-vector-icons
   react-native link react-native-svg
   react-native link @ant-design/icons-react-native
3. build.gradle
  repositories {
    maven { url 'http://maven.aliyun.com/nexus/content/repositories/google' }
    maven { url 'http://maven.aliyun.com/nexus/content/repositories/jcenter' }
    // google()
    // jcenter()
  }
  repositories {
    maven { url 'http://maven.aliyun.com/nexus/content/repositories/google' }
    maven { url 'http://maven.aliyun.com/nexus/content/repositories/jcenter' }
    // mavenLocal()
    // google()
    // jcenter()
    maven {
      // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
      url "$rootDir/../node_modules/react-native/android"
    }
  }
4. eslint-airbnb
  npm install -g install-peerdeps
  install-peerdeps --dev eslint-config-airbnb

  "eslint": "^4.8.0",
  "eslint-config-airbnb": "^16.0.0",
  "eslint-plugin-import": "^2.7.0",
  "eslint-plugin-jsx-a11y": "^6.0.2",
  "eslint-plugin-react": "^7.4.0",
