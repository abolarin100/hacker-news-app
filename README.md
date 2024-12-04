
# Hacker News React Native App

This is a React Native application designed to provide a user-friendly interface for browsing tech-related news from Hacker News. The app features a splash screen, login/registration with SQLite, navigation, and infinite scrolling for top stories, leveraging the Hacker News API.

---

## Features


1. **Splash Screen**: Displays an animated welcome screen upon app launch.
2. **Login/Registration**: User authentication is implemented using a local SQLite database.
3. **Top Stories Display**: Fetches and displays top stories using the [Hacker News API](https://github.com/HackerNews/API).
4. **Infinite Scroll**: Implements lazy loading for seamless browsing.
5. **Navigation**: A smooth and intuitive navigation system for switching between screens.
6. **About Screen**: Includes information about the developer.



---

## Setup Instructions

### Prerequisites
1. Ensure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) for Android development.
2. Install Node.js and a package manager like `npm` or `yarn`.

### Installation Steps

#### Step 1: Clone the Repository
```bash
git clone https://github.com/abolarin100/hacker-news-app.git
cd hacker-news-app
```

#### Step 2: Install Dependencies
```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

#### Step 3: Run the Application

To start the Metro bundler and launch the app on your emulator:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

#### Step 4: Run on Android

In a new terminal, run the following command:

```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

---


## Troubleshooting

- If you run into any issues with dependencies or the build, try the following:
  1. Clear the cache with: `npm start --reset-cache`
  2. Rebuild the app: `react-native run-android`
  3. Check the [React Native troubleshooting guide](https://reactnative.dev/docs/troubleshooting).

---

## Learn More

To learn more about React Native, check out the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how to set up your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
