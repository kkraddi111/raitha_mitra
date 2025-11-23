# 🌾 Raitha Mitra - Agricultural Assistant Platform

A comprehensive digital platform designed to empower farmers with access to government schemes, AI-powered agricultural advice, and community support. Built with modern web technologies to bridge the gap between technology and traditional farming.

![Raitha Mitra](https://img.shields.io/badge/Status-Active-green) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

### �️F Government Schemes Management
- **Comprehensive Database**: Browse and search through available agricultural schemes
- **Detailed Information**: Complete eligibility criteria, benefits, and documentation requirements
- **Real-time Updates**: Stay informed about the latest government initiatives
- **Contact Information**: Direct access to relevant offices and helplines

### 🤖 AI-Powered Assistant
- **Intelligent Chat**: Get instant answers to farming questions using Google Gemini AI
- **Multi-language Support**: Communicate in both Kannada and English
- **Voice Integration**: Voice input and text-to-speech capabilities
- **Context-Aware**: Understands agricultural terminology and local farming practices

### �‍💼 AdAmin Dashboard
- **Scheme Management**: Add, edit, and delete government schemes
- **User Management**: Monitor and manage farmer registrations
- **Content Control**: Maintain accurate and up-to-date information
- **Analytics**: Track platform usage and engagement

### 🌐 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, farmer-friendly design with easy navigation
- **Fast Performance**: Optimized for quick loading and smooth interactions
- **Accessibility**: Designed with accessibility best practices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **Vite 6** - Fast build tool and development server
- **Tailwind CSS 3.4** - Utility-first CSS framework

### AI Integration
- **Google Gemini AI** - Advanced language model for agricultural assistance
- **Web Speech API** - Voice input and text-to-speech

### Data & Storage
- **Local Storage** - Client-side data persistence
- **React Router** - Client-side routing

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kkraddi111/raitha_mitra.git
   cd raitha_mitra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
raitha_mitra/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Custom button component
│   ├── ChatInterface.tsx # AI chat interface
│   ├── IconButton.tsx   # Reusable icon buttons
│   ├── Icons.tsx        # Centralized icon definitions
│   ├── Input.tsx        # Form input components
│   ├── LandingPage.tsx  # Landing page component
│   ├── Navbar.tsx       # Navigation component
│   ├── SchemeCard.tsx   # Government scheme display
│   ├── SearchBar.tsx    # Search functionality
│   └── TabButton.tsx    # Reusable tab buttons
├── services/            # Business logic and API calls
│   ├── geminiService.ts # AI integration service
│   └── storageService.ts # Local storage management
├── App.tsx              # Main application component
├── constants.ts         # Application constants
├── types.ts             # TypeScript type definitions
├── index.tsx            # Application entry point
├── index.css            # Global styles
└── vite.config.ts       # Vite configuration
```

## 🎯 Usage

### For Farmers
1. **Browse Schemes**: Explore available government schemes with detailed information
2. **Search & Filter**: Find relevant schemes based on your needs
3. **AI Assistant**: Ask questions about farming, crops, weather, or schemes
4. **Voice Interaction**: Use voice input for hands-free interaction

### For Administrators
1. **Login**: Use admin credentials to access the dashboard
2. **Manage Schemes**: Add, edit, or remove government schemes
3. **User Management**: Monitor farmer registrations and manage accounts
4. **Content Updates**: Keep scheme information current and accurate

## 🔧 Configuration

### Environment Variables
- `VITE_API_KEY`: Your Google Gemini API key for AI functionality

### Default Admin Credentials
- **Username**: admin
- **Password**: password123

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write clean, readable code with proper comments
- Ensure responsive design for all components
- Test thoroughly before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Farmers**: The backbone of our society who inspired this platform
- **Government Initiatives**: For providing schemes that support agricultural development
- **Google Gemini AI**: For powering our intelligent assistant
- **Open Source Community**: For the amazing tools and libraries

## 📞 Support

For support, email support@raithamitra.in or create an issue in this repository.

---

**Made with ❤️ for farmers by developers who care about agriculture**