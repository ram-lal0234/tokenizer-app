# Custom Tokenizer - Full Stack Application

A complete text tokenization application with a modern Angular frontend and Node.js backend API.

## 🏗️ Project Structure

```
tokenizer-app/
├── src/                    # Angular frontend application
│   └── app/
│       ├── components/     # UI components
│       └── services/       # Frontend services
├── backend/                # Node.js backend API
│   ├── server.js          # Express server
│   ├── tokenizer.js       # Tokenization logic
│   └── README-API.md      # Backend documentation
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## 🚀 Features

### Frontend (Angular)
- **Dark Mode UI**: Modern, responsive interface with Tailwind CSS
- **Real-time Tokenization**: Encode and decode text with live visualization
- **Copy Functionality**: Copy tokens in multiple formats (space-separated, JSON array, text)
- **Vocabulary Display**: Complete view of all tokens and their types
- **Component Architecture**: Modular, maintainable code structure

### Backend (Node.js)
- **RESTful API**: Clean HTTP endpoints for tokenization operations
- **Local Tokenization**: No external dependencies, works completely offline
- **Special Token Support**: Built-in PAD, UNK, START, END tokens
- **Auto-training**: Automatically builds vocabulary on first encode

## 🛠️ Technology Stack

- **Frontend**: Angular 20, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js
- **Architecture**: Standalone components, RESTful API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend API
```bash
cd backend
npm install
npm run dev
```
The API will start on `http://localhost:3000`

### 3. Start the Frontend (in a new terminal)
```bash
npm start
```
The Angular app will open at `http://localhost:4200`

## 🔧 Usage

### API Endpoints
- **POST** `/encode` - Convert text to token IDs
- **POST** `/decode` - Convert token IDs back to text
- **POST** `/reset` - Clear vocabulary and start fresh

### Frontend Features
1. **Encode Text**: Enter any text to see it converted to token IDs
2. **Decode Tokens**: Enter token IDs to see the original text
3. **Visualize**: See detailed token mapping in tables
4. **Copy Data**: Copy tokens, arrays, or text in various formats

## 🎯 Key Components

- **Tokenizer Component**: Main application interface
- **Encoded Tokens**: Display and copy encoded results
- **Decoded Text**: Show decoded text with copy option
- **Vocabulary Display**: Complete token vocabulary table

## 🚧 Development

### Adding New Components
```bash
ng generate component components/new-component
```

### Building for Production
```bash
npm run build
```

### Testing
```bash
npm test
```

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔗 Links

- **Frontend**: Angular application with dark mode UI
- **Backend**: Node.js tokenization API
- **Documentation**: See `backend/README-API.md` for detailed API docs 