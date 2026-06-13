Doulingo Clone (MAD Project)
An Android Duolingo-inspired language learning app built for the Mobile App Development (MAD) course.
The app includes onboarding, authentication, lesson selection screens, and a bottom-navigation dashboard experience.

Features
Splash screen with launch animation
Onboarding flow for new and existing users
Sign-up with Firebase Realtime Database
Sign-in using email/username + password
Google and Facebook authentication integration
Multi-step lesson selection flow using RecyclerView
Main dashboard with bottom navigation and fragments (Home, Chest, News, Profile, Reward)
Basic UI animations and custom drawable components
Tech Stack
Language: Java
UI: Android Views + ViewBinding
Architecture style: Activity/Fragment based navigation
Backend services: Firebase Authentication, Firebase Realtime Database, Firebase Storage, Firebase Analytics
Auth providers: Google Sign-In, Facebook Login
Libraries: Glide, Retrofit, OkHttp, Material Components, AndroidX Navigation
Project Structure
ProjectMADDoulingoClone/
app/
src/main/
java/com/example/projectmaddoulingoclone/
MainActivity... (onboarding/auth/lesson screens)
MainActivity10 (bottom-nav dashboard host)
MainActivity11 (sign-up)
activity_splash (launcher activity)
HomeFragment, ChestFragment, NewsFragment, ProfileFragment, RewardFragment
res/
layout/, drawable/, anim/, menu/, values/
Getting Started
Prerequisites
Android Studio (latest stable recommended)
Android SDK 34
JDK 11
Gradle (wrapper included)
Setup
Clone the repository.
Open ProjectMADDoulingoClone in Android Studio.
Sync Gradle dependencies.
Ensure Firebase is configured:
app/google-services.json is present.
Firebase Authentication and Realtime Database are enabled in your Firebase project.
Ensure OAuth providers are configured:
Google Sign-In in Firebase and Google Cloud Console
Facebook Login app ID/client token in strings.xml and Facebook developer console
Run
Connect an Android device or start an emulator.
Build and run the app module from Android Studio.
Launcher activity starts from activity_splash, then navigates into onboarding.
User Flow
Splash screen (activity_splash)
Welcome screen (MainActivity)
Auth choice (MainActivity2)
Sign-in (MainActivity3) or Sign-up (MainActivity11)
Lesson sequence (MainActivity5 to MainActivity9)
Main app dashboard (MainActivity10) with bottom navigation fragments
Notes
This is a course project clone focused on UI flow and integration experiments.
Some screens/fragments are currently template-based and can be expanded with dynamic lesson/content logic.
If you plan to publish this repo publicly, rotate or remove any real API/app credentials.
Future Improvements
Add MVVM architecture and repository pattern
Secure credentials and move sensitive values to safer config handling
Improve form validation and error handling
Add unit/UI tests
Connect lesson flow to dynamic backend data
License
This project is for educational use. https://github.com/Danyal-0276/Doulingo-Clone.git
