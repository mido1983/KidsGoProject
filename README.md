# KidsGo 🎈

KidsGo is a multilingual mobile application designed to help parents discover and book children's events and activities in Israel. The app supports Hebrew, Russian, and English, making it accessible to diverse communities.

## Features 🌟

- **Multilingual Support**: Full support for Hebrew, Russian, and English
- **Smart Event Discovery**: Find nearby events based on age, category, and location
- **Real-time Updates**: Get instant notifications about new events and updates
- **Social Authentication**: Easy sign-in with Google, Facebook, and Apple
- **Event Auto-parsing**: Automatic event aggregation from multiple sources
- **Premium Business Features**: Special tools for event organizers and venues

## Tech Stack 🛠️

- **Frontend**: React Native (Expo)
- **Backend**: Firebase
- **Authentication**: Firebase Auth, Expo Auth Session
- **Database**: Firebase Firestore
- **Translation**: Google Translate API
- **Maps**: Google Maps API
- **State Management**: React Context API
- **Localization**: i18next

## Data Sources 📊

- GoKids
- Kinderland
- TimeOut Israel
- Meetup API
- Eventbrite API

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Firebase account
- Google Cloud Platform account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/kidsgo.git
cd kidsgo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your configuration:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npx expo start
```

### Building for Production

To build the app for production:

```bash
# For Android
eas build --platform android

# For iOS
eas build --platform ios
```

## Project Structure 📁

```
kidsgo/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── _layout.tsx        # Root layout with theme and navigation
│   └── onboarding.tsx     # Onboarding and authentication
├── components/            # Reusable components
├── config/               # Configuration files
├── hooks/                # Custom React hooks
├── locales/              # Translation files
│   ├── en.json          # English translations
│   ├── he.json          # Hebrew translations
│   └── ru.json          # Russian translations
├── utils/                # Utility functions
└── types/                # TypeScript type definitions
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📧

For any questions or feedback, please reach out to our team at support@kidsgo.com

---

Made with ❤️ for families in Israel
