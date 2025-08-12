# TokenizerApp

A modern, interactive text tokenization application built with Angular 20 and TypeScript. This application provides real-time text encoding, decoding, and visualization capabilities with a beautiful dark-themed UI.

## 🚀 Features

- **Text Encoding**: Convert text into tokens using custom tokenization algorithms
- **Text Decoding**: Reconstruct original text from token sequences
- **Real-time Visualization**: Interactive display of encoded tokens and vocabulary
- **Dark Theme UI**: Modern, responsive design with smooth animations
- **Vocabulary Management**: Dynamic vocabulary building and display
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend**: Angular 20 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **State Management**: Angular Signals
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ram-lal0234/tokenizer-app.git
   cd tokenizer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/` to view the application.

## 🏗️ Development

### Prerequisites
- Node.js (v20.19+ or v22.12+)
- npm or yarn

### Available Scripts

- **Development Server**: `npm start` or `ng serve`
- **Build**: `npm run build` or `ng build`
- **Watch Mode**: `npm run watch` or `ng build --watch`
- **Testing**: `npm test` or `ng test`
- **Linting**: `ng lint`

### Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── tokenizer/          # Main tokenizer component
│   │   ├── encoded-tokens/     # Token display component
│   │   ├── decoded-text/       # Decoded text component
│   │   └── vocabulary-display/ # Vocabulary visualization
│   ├── services/
│   │   └── tokenizer.service.ts # Core tokenization logic
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts          # Application routing
│   └── app.config.ts          # App configuration
├── styles.css                 # Global styles
└── main.ts                    # Application entry point
```

## 🎨 UI Components

- **Tokenizer Component**: Main interface for text encoding/decoding
- **Encoded Tokens Display**: Visual representation of tokenized text
- **Decoded Text Output**: Reconstructed text from tokens
- **Vocabulary Display**: Interactive vocabulary management
- **Status Indicators**: Real-time training and vocabulary status

## 🔧 Configuration

The application uses Angular's modern standalone components and follows best practices:

- **Change Detection**: OnPush strategy for optimal performance
- **Component Architecture**: Standalone components with dependency injection
- **TypeScript**: Strict type checking enabled
- **Styling**: Tailwind CSS with custom dark theme

## 🚀 Deployment

### Production Build
```bash
ng build --configuration production
```

### Build Output
The build artifacts will be stored in the `dist/` directory, optimized for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ramlal**

- **LinkedIn**: [Ramlal](https://www.linkedin.com/in/ramlal24/)
- **X (Twitter)**: [@Ramlal_24](https://x.com/Ramlal_24)
- **GitHub**: [ram-lal0234](https://github.com/ram-lal0234/tokenizer-app)

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from various open-source icon libraries

---

⭐ If you find this project helpful, please give it a star on GitHub!
