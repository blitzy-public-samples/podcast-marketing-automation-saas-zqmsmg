# Podcast Marketing Automation Mobile App

## Introduction

This is the mobile application component of the Podcast Marketing Automation SaaS platform. It provides podcast creators with on-the-go access to manage their podcasts, episodes, and marketing content.

## Getting Started

To set up the development environment and run the app:

1. Clone the repository
2. Navigate to the `src/mobile` directory
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

### iOS Setup

1. Install Xcode from the App Store
2. Install CocoaPods:
   ```
   sudo gem install cocoapods
   ```
3. Navigate to the `ios` directory and run:
   ```
   pod install
   ```
4. Open the `.xcworkspace` file in Xcode

### Android Setup

1. Install Android Studio
2. Set up Android SDK and create an emulator
3. Set the `ANDROID_HOME` environment variable

## Project Structure

- `/src`: Main source code directory
  - `/components`: Reusable React Native components
  - `/screens`: Individual screen components
  - `/navigation`: Navigation configuration
  - `/services`: API and third-party service integrations
  - `/store`: Redux store configuration and slices
  - `/hooks`: Custom React hooks
  - `/utils`: Utility functions
  - `/styles`: Global styles and theme configuration
- `/assets`: Static assets like images and fonts
- `/ios`: iOS-specific files
- `/android`: Android-specific files

## Available Scripts

- `npm start` or `yarn start`: Start the Metro bundler
- `npm run ios` or `yarn ios`: Run the app on iOS simulator
- `npm run android` or `yarn android`: Run the app on Android emulator
- `npm test` or `yarn test`: Run tests
- `npm run lint` or `yarn lint`: Run ESLint
- `npm run build` or `yarn build`: Build the app for production

## Dependencies

- React Native: Mobile app framework
- React Navigation: Navigation library
- Redux Toolkit: State management
- Axios: HTTP client
- React Native Vector Icons: Icon library
- React Native Reanimated: Animations library
- React Native Gesture Handler: Gesture system

## Testing

To run tests:

```
npm test
```

or

```
yarn test
```

We use Jest and React Native Testing Library for unit and component testing.

## Deployment

1. Increment the version number in `app.json`
2. For iOS:
   - Open the project in Xcode
   - Archive the project
   - Upload to App Store Connect
3. For Android:
   - Run `cd android && ./gradlew assembleRelease`
   - The APK will be in `android/app/build/outputs/apk/release`
   - Upload to Google Play Console

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

Please adhere to the coding standards and write tests for new features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.