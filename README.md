# Raitha Mitra - AI-Powered Farmer Assistant

Raitha Mitra (Farmer's Friend) is a comprehensive web application designed to bridge the gap between technology and agriculture. It empowers farmers in Karnataka (and India) by providing easy access to government schemes and an intelligent, voice-enabled AI assistant capable of conversing in Kannada and English.

![Raitha Mitra Hero](https://images.unsplash.com/photo-1625246333195-f8196ba00896?q=80&w=1920&auto=format&fit=crop)

## 🌟 Key Features

### 🌾 For Farmers
*   **AI Assistant (AI Sahayaka)**:
    *   Powered by **Google Gemini 2.5 Flash**.
    *   **Bilingual Support**: Chat in **Kannada** or English.
    *   **Voice Interface**: Speech-to-Text input and Text-to-Speech output for accessibility.
    *   Ask questions about crops, weather, pest control, and farming techniques.
*   **Government Schemes**:
    *   View a curated list of active state and central government schemes (e.g., PM-KISAN, Krishi Bhagya).
    *   Detailed information on benefits, eligibility, and required documents.
    *   Search functionality to find specific subsidies.
*   **Authentication**: Secure login and registration system.

### 🛡️ For Administrators
*   **Scheme Management**: Add, Edit, and Delete government schemes dynamically.
*   **User Management**: View and remove registered users.
*   **Dashboard**: Overview of system statistics.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **AI Engine**: Google Gemini API (`@google/genai`)
*   **Routing**: React Router DOM
*   **State/Persistence**: LocalStorage (for demo purposes)
*   **Icons**: Heroicons (SVG)

---

## 🚀 How to Run Step by Step

Follow these instructions to set up the project locally.

### Prerequisites
1.  **Node.js**: Ensure you have Node.js installed (v16 or higher).
2.  **Google Gemini API Key**: You need an API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the Repository** (or download the source code):
    ```bash
    git clone <repository-url>
    cd raitha-mitra
    ```

2.  **Install Dependencies**:
    *Note: If you are setting this up from scratch in a folder, you will need a `package.json`. If using a build tool like Vite, run `npm create vite@latest .` first, then copy the source files into `src/`.*
    
    Assuming a standard React setup:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    *   Create a file named `.env` in the root directory.
    *   Add your Google Gemini API Key:
    ```env
    API_KEY=your_actual_api_key_here
    ```
    *   *Note: Ensure your bundler is configured to expose `process.env.API_KEY` or `import.meta.env` appropriately.*

4.  **Run the Application**:
    ```bash
    npm start
    # OR if using Vite
    npm run dev
    ```

5.  **Open in Browser**:
    *   Navigate to `http://localhost:3000` (or the port shown in your terminal).

---

## 📖 User Guide

### 1. Login Credentials
The application uses LocalStorage. To get started, you can use the default Admin account or register a new Farmer account.

*   **Default Admin**:
    *   **Username**: `admin`
    *   **Password**: `password123`

*   **Farmer**:
    *   Click "Register" on the login page to create a new account.

### 2. Using the AI Assistant
1.  Log in as a **Farmer**.
2.  Navigate to the **"Ask AI Assistant"** tab.
3.  **Type**: Enter your query in English or Kannada.
4.  **Speak**: Click the microphone icon to speak.
    *   *Note: Voice input works best in Google Chrome.*
5.  **Listen**: Click the speaker icon next to the AI's response to hear it read aloud.

### 3. Managing Schemes (Admin)
1.  Log in as **Admin**.
2.  Go to the **"Add New Scheme"** tab to create a new entry.
3.  Go to **"View Schemes"** to Edit or Delete existing entries.

---

## 📂 Project Structure

```
raitha-mitra/
├── components/          # Reusable UI components
│   ├── ChatInterface.tsx    # AI Chat logic & UI
│   ├── LandingPage.tsx      # Public home page
│   ├── Navbar.tsx           # Navigation bar
│   ├── SchemeCard.tsx       # Display card for schemes
│   └── ...
├── services/
│   ├── geminiService.ts     # Google GenAI API integration
│   └── storageService.ts    # LocalStorage wrapper (Mock Backend)
├── App.tsx              # Main application layout & routing
├── constants.ts         # Theme colors & initial data
├── types.ts             # TypeScript interfaces
└── index.html           # Entry HTML
```

## 📜 License

This project is created for educational purposes to support the agricultural sector.
