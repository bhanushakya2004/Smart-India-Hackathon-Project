# Business Directory App (with Crop Marketplace Feature)

This mobile application, built with React Native and Expo, serves as a comprehensive **Business Directory**. A key feature includes a dedicated marketplace for users to buy fresh crops directly from farmers, aiming to reduce costs and connect producers with consumers more efficiently. The project also incorporates features like real-time crop price predictions (via a TensorFlow model deployed on Replit Cloud), Firebase backend integration for data management and user authentication (including Google Authentication via Clerk).

This project was initially developed as a finalist for the Smart India Hackathon 2024.

## Key Features

*   **Business Listings & Categories:** Browse and search for various businesses. Businesses are organized into categories for easy navigation.
*   **Detailed Business Profiles:** View detailed information about each business, including contact details, services, and user reviews.
*   **User Authentication:** Secure sign-up and login functionality using Clerk, including Google Authentication.
*   **User Profiles:** Users can manage their profiles and view their activity.
*   **Crop Marketplace (Special Feature):**
    *   **Direct Buying from Farmers:** Enables users to purchase fresh crops directly from farmers.
    *   **AI-Powered Crop Price Prediction:** Utilizes a TensorFlow model (deployed on Replit Cloud) to provide users with predicted future crop prices, aiding informed purchasing decisions.
*   **Order Management:** Users can track their orders (especially relevant for the crop marketplace).
*   **Real-Time Updates:** Uses Expo Notifications for updates on orders, prices, or other relevant information.
*   **Seamless Navigation:** Implemented with Expo Router for a smooth user experience.
*   **Firebase Integration:** Leverages Firebase for backend services including Firestore database, storage, and potentially other features.

## Technologies Used

*   **React Native & Expo:** For cross-platform mobile app development.
*   **Expo Router:** For navigation within the app.
*   **Clerk:** For user authentication, including Google Sign-In.
*   **Firebase:** As a Backend-as-a-Service (BaaS) for database (Firestore), cloud storage, and other backend functionalities.
*   **TensorFlow:** For developing the AI model for crop price prediction.
*   **Replit Cloud:** For hosting the crop price prediction API.
*   **Expo Notifications:** For push notifications and real-time updates.

## Project Structure

The project follows a standard React Native (Expo) structure:

-   **/app:** Contains the main application screens and navigation setup, using Expo's file-based routing.
    -   **/app/(tabs):** Defines the layout and screens for tab-based navigation (e.g., Home, Explore, Profile).
    -   **/app/business:** Screens related to managing business listings.
    -   **/app/businessdetail:** Screen for displaying detailed information about a specific business.
    -   **/app/businesslist:** Screen for listing businesses, likely filtered by category.
-   **/components:** Reusable UI components used across different screens. Organized by feature or commonality (e.g., `Home`, `BusinessDetail`, `Profile`).
-   **/assets:** Static assets like images, fonts, etc.
-   **/configs:** Configuration files, such as Firebase setup (`FirebaseConfig.js`).
-   **/constants:** Global constants like color schemes (`Colors.ts`).
-   **/hooks:** Custom React hooks (e.g., `useWarmUpBrowser.jsx`).
-   **/scripts:** Utility scripts for the project (e.g., `reset-project.js`).

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

*   **Node.js:** Make sure you have Node.js installed (LTS version recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **Expo CLI:** Install the Expo CLI globally if you haven't already:
    ```bash
    npm install -g expo-cli
    ```
*   **Git:** For cloning the repository.

### Installation & Setup

1.  **Clone the Repository:**
    Replace the URL and folder name with your project's specific details.
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    This project uses Clerk for authentication. You'll need to create a `.env` file in the root of the project and add your Clerk Publishable Key:
    ```env
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
    ```
    Replace `your_clerk_publishable_key_here` with your actual key. You can obtain this key from your Clerk dashboard.

### Running the Application

1.  **Start the Development Server:**
    ```bash
    npx expo start
    ```
    This command will start the Metro Bundler.

2.  **Run on a Device or Emulator:**
    Once the Metro Bundler is running, it will provide several options:
    *   **Scan the QR code:** Use the Expo Go app (available on Android and iOS) to scan the QR code displayed in the terminal. This will run the app on your physical device.
    *   **Press `a`:** To run on an Android emulator or connected Android device.
    *   **Press `i`:** To run on an iOS simulator (macOS only) or connected iOS device.
    *   **Press `w`:** To run in a web browser.

    Refer to the [Expo documentation](https://docs.expo.dev/workflow/run-on-device/) for more detailed instructions on running the app.

### Running Tests

To run the automated tests for this project:
```bash
npm test
```
This command executes Jest tests, typically in watch mode as configured in `package.json`.

### Linting

To check the code for linting errors and maintain code quality:
```bash
npm run lint
```
This command uses `expo lint` to analyze the codebase.

## Contributing

Contributions are welcome! If you'd like to improve the app or add new features, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Make your changes.**
4.  **Test your changes thoroughly.**
5.  **Commit your changes** with a clear and descriptive commit message:
    ```bash
    git commit -m "feat: Implement amazing feature"
    ```
6.  **Push to your forked repository:**
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Open a Pull Request** to the main repository's `main` (or `develop`) branch.

Please ensure your code adheres to the project's linting standards (run `npm run lint`).

## License

This project is currently unlicensed.
