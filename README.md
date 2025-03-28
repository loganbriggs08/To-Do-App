## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js 
- Expo CLI (`npm install -g expo-cli`)
- Xcode (iOS emulator) or Android Studio (android emulator)

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/loganbriggs08/To-Do-App.git
   cd To-Do-App
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npx expo start
   ```
4. Run on an emulator or physical device:
   - For Android: Press `a`
   - For iOS: Press `i` (macOS required with Xcode installed)

Expo Go does seem to sometimes complain about Watermelon DB so creating a development build and putting it on the emulator is probably best.

Development build can be done like this:
```sh 
eas build --profile development --platform android
```

## Project Structure
```
To-Do-App/
│-- assets/              # Static assets (images, fonts, etc.)
│-- components/          # Reusable React Native components
│-- navigation/          # App navigation setup
│-- screens/             # Screens for different views in the app
│-- database/            # Database stuff (models, queries, etc.)
│-- App.tsx              # Main entry point of the app
```

## Technical Decisions & Assumptions
- **NativeWind**: Used for styling for performance and ease of use.
- **State Management**: Assumed simple state management via React Hooks.

## Areas for Future Enhancement
- **Authentication**: Add user authentication for personalized task lists.
- **Folder Structure**: Update structure of folders to be more meaningful.


