# Tokenizer API

A simple yet powerful text tokenization service built with Node.js and Express. This project provides a RESTful API for training custom tokenizers and encoding/decoding text using trained vocabulary.

## 🚀 Features

- **Custom Tokenizer Training**: Train tokenizers on your own text corpus
- **Text Encoding**: Convert text into token IDs using trained vocabulary
- **Text Decoding**: Convert token IDs back to readable text
- **Special Tokens Support**: Built-in support for PAD, UNK, START, and END tokens
- **RESTful API**: Clean HTTP endpoints for all operations
- **Auto-training**: Automatically trains on first encode if no vocabulary exists
- **Reset Functionality**: Clear vocabulary and start fresh

## 🏗️ Architecture

The project consists of two main components:

1. **`tokenizer.js`** - Core tokenization logic and vocabulary management
2. **`server.js`** - Express.js HTTP server with REST API endpoints

### Core Components

- **Vocabulary Management**: Dynamic vocabulary building with special token support
- **Special Tokens**: Fixed token IDs for common NLP operations
- **Token Processing**: Word-based splitting with whitespace detection
- **Error Handling**: Comprehensive error handling for all operations

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd tokenizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on port 3000 by default.

## 🚀 Quick Start

### 1. Start the Server
```bash
npm run dev
```

### 2. Encode Text (Auto-trains if needed)
```bash
curl -X POST http://localhost:3000/encode \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world! This is a sample text."}'
```

### 3. Decode Tokens
```bash
curl -X POST http://localhost:3000/decode \
  -H "Content-Type: application/json" \
  -d '{"tokens": [4, 5, 6, 7]}'
```

### 4. Reset Tokenizer
```bash
curl -X POST http://localhost:3000/reset
```

## 🔍 How Encoding and Decoding Work

### **Encoding Process (Text → Token IDs)**

The encoding process converts human-readable text into numerical token IDs. Here's how it works:

#### 1. **Text Preprocessing**
```javascript
// Input text: "Hello world! This is a sample text."
let tokens = text.split(/\s+/);
// Result: ["Hello", "world!", "This", "is", "a", "sample", "text."]
```

#### 2. **Special Token Assignment**
The system automatically assigns fixed IDs to special tokens:
```javascript
specialTokens = ["<PAD>", "<UNK>", "<START>", "<END>"];
// <PAD>  → ID: 0
// <UNK>  → ID: 1  
// <START> → ID: 2
// <END>   → ID: 3
```

#### 3. **Vocabulary Building**
For each unique word in the text, assign sequential IDs starting after special tokens:
```javascript
// First encode of "Hello world! This is a sample text."
// Special tokens: 0-3
// Regular tokens: 4+
vocab = {
  "<PAD>": 0,
  "<UNK>": 1,
  "<START>": 2,
  "<END>": 3,
  "Hello": 4,
  "world!": 5,
  "This": 6,
  "is": 7,
  "a": 8,
  "sample": 9,
  "text.": 10
}
```

#### 4. **Token ID Generation**
Convert each word to its corresponding ID:
```javascript
// Input: "Hello world! This is a sample text."
// Output: [4, 5, 6, 7, 8, 9, 10]
```

#### 5. **Unknown Token Handling**
If a word isn't in the vocabulary, it gets the `<UNK>` token ID (1):
```javascript
// If encoding "Hello unknown word"
// And "unknown" isn't in vocab
// Result: [4, 1, 5]  // "unknown" becomes <UNK> (ID: 1)
```

### **Decoding Process (Token IDs → Text)**

The decoding process reverses the encoding, converting token IDs back to readable text:

#### 1. **Reverse Vocabulary Lookup**
```javascript
// reverseVocab maps IDs back to words
reverseVocab = {
  0: "<PAD>",
  1: "<UNK>",
  2: "<START>",
  3: "<END>",
  4: "Hello",
  5: "world!",
  6: "This",
  7: "is",
  8: "a",
  9: "sample",
  10: "text."
}
```

#### 2. **Token ID to Word Conversion**
```javascript
// Input: [4, 5, 6, 7, 8, 9, 10]
// Output: ["Hello", "world!", "This", "is", "a", "sample", "text."]
```

#### 3. **Text Reconstruction**
```javascript
// Join words with spaces
return tokens.map(id => reverseVocab[id] ?? "<UNK>").join(" ");
// Result: "Hello world! This is a sample text."
```

#### 4. **Unknown ID Handling**
If an ID isn't in the reverse vocabulary, it becomes `<UNK>`:
```javascript
// If decoding [4, 999, 5] and 999 doesn't exist
// Result: "Hello <UNK> world!"
```

## 📚 API Reference

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Encode Text
- **POST** `/encode`
- **Description**: Convert text to token IDs (auto-trains if needed)
- **Request Body**:
  ```json
  {
    "text": "Text to encode"
  }
  ```
- **Response**:
  ```json
  {
    "tokens": [4, 5, 6, 7]
  }
  ```
- **Error Cases**:
  - Missing `text` field: `400 Bad Request`
  - Encoding errors: `500 Internal Server Error`

#### 2. Decode Tokens
- **POST** `/decode`
- **Description**: Convert token IDs back to text
- **Request Body**:
  ```json
  {
    "tokens": [4, 5, 6, 7]
  }
  ```
- **Response**:
  ```json
  {
    "text": "Hello world! This is"
  }
  ```
- **Error Cases**:
  - Missing or invalid `tokens` array: `400 Bad Request`
  - Tokenizer not trained: `500 Internal Server Error`

#### 3. Reset Tokenizer
- **POST** `/reset`
- **Description**: Clear vocabulary and start fresh
- **Response**:
  ```json
  {
    "message": "Tokenizer reset successfully"
  }
  ```

#### 4. Fallback Handler
- **Any Route**: Returns `404 Not Found` with route information

## 💡 Usage Examples

### Complete Workflow Example

#### Step 1: First Encode (Auto-trains)
```bash
curl -X POST http://localhost:3000/encode \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world! This is a sample text."}'
```

**Response:**
```json
{
  "tokens": [4, 5, 6, 7, 8, 9, 10]
}
```

**What happened:**
- Tokenizer automatically trained on the text
- Built vocabulary with special tokens (0-3) and words (4-10)
- Returned token IDs for each word

#### Step 2: Decode the Tokens
```bash
curl -X POST http://localhost:3000/decode \
  -H "Content-Type: application/json" \
  -d '{"tokens": [4, 5, 6, 7, 8, 9, 10]}'
```

**Response:**
```json
{
  "text": "Hello world! This is a sample text."
}
```

**What happened:**
- Looked up each ID in reverse vocabulary
- Converted back to original words
- Joined with spaces to reconstruct text

#### Step 3: Encode New Text (Uses Existing Vocabulary)
```bash
curl -X POST http://localhost:3000/encode \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world again"}'
```

**Response:**
```json
{
  "tokens": [4, 5, 11]
}
```

**What happened:**
- "Hello" and "world!" already in vocab (IDs 4, 5)
- "again" is new, gets next available ID (11)
- Vocabulary expanded automatically

### JavaScript/Node.js Example
```javascript
const axios = require('axios');

// Encode text (auto-trains if needed)
const encodeResponse = await axios.post('http://localhost:3000/encode', {
  text: 'Hello world! This is a sample text.'
});
console.log('Encoded:', encodeResponse.data.tokens);

// Decode tokens
const decodeResponse = await axios.post('http://localhost:3000/decode', {
  tokens: encodeResponse.data.tokens
});
console.log('Decoded:', decodeResponse.data.text);

// Reset tokenizer
await axios.post('http://localhost:3000/reset');
```

### Python Example
```python
import requests

# Encode text
encode_response = requests.post('http://localhost:3000/encode', json={
    'text': 'Hello world! This is a sample text.'
})
encoded = encode_response.json()['tokens']

# Decode tokens
decode_response = requests.post('http://localhost:3000/decode', json={
    'tokens': encoded
})
decoded = decode_response.json()['text']

# Reset tokenizer
requests.post('http://localhost:3000/reset')
```

## 🔧 Configuration

### Special Tokens
The tokenizer automatically includes these special tokens with fixed IDs:
- `<PAD>` (ID: 0) - Padding token for sequence alignment
- `<UNK>` (ID: 1) - Unknown token for unseen words
- `<START>` (ID: 2) - Beginning of sequence marker
- `<END>` (ID: 3) - End of sequence marker

### Tokenization Strategy
- **Text Preprocessing**: Splits on whitespace using regex `/\s+/`
- **Vocabulary Building**: Sequential ID assignment starting after special tokens
- **Auto-training**: Automatically trains on first encode if vocabulary is empty
- **Dynamic Expansion**: Vocabulary grows as new words are encountered

## 🧪 Testing

### Manual Testing
1. Start the server: `npm run dev`
2. Test encoding: `curl -X POST http://localhost:3000/encode -H "Content-Type: application/json" -d '{"text": "Hello world"}'`
3. Test decoding: Use the returned tokens from step 2
4. Test reset: `curl -X POST http://localhost:3000/reset`

### Error Testing
- Try decoding without training first
- Send malformed JSON
- Test with empty text
- Use invalid token IDs for decoding

## 🔍 Technical Details

### Dependencies
- **express**: Web framework for HTTP server
- **body-parser**: Middleware for parsing JSON request bodies
- **cors**: Cross-origin resource sharing support

### Project Structure
```
tokenizer/
├── server.js          # Express server and API endpoints
├── tokenizer.js       # Core tokenization logic
├── package.json       # Project configuration and dependencies
└── README.md          # This documentation
```

### Memory Management
- Vocabulary is stored in memory (not persisted to disk)
- Each reset call clears the vocabulary
- Consider implementing persistence for production use

## 🚧 Limitations & Future Improvements

### Current Limitations
- **Memory-only Storage**: Vocabulary is not persisted between server restarts
- **Basic Tokenization**: Simple whitespace-based splitting
- **No Model Persistence**: Training data is lost on server restart
- **Single Vocabulary**: Only one vocabulary can be active at a time

### Potential Enhancements
- **File Persistence**: Save/load trained models
- **Advanced Tokenization**: Implement BPE, SentencePiece, or WordPiece
- **Multiple Models**: Support for multiple trained tokenizers
- **Model Versioning**: Track different versions of trained models
- **Performance Metrics**: Add training statistics and vocabulary analysis
- **Batch Processing**: Support for encoding/decoding multiple texts
- **Token Statistics**: Provide token frequency and distribution information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the error messages in the API responses
2. Verify the tokenizer has been trained before decoding
3. Ensure request bodies contain the required fields
4. Check server logs for detailed error information

## 🔄 Version History

- **v1.0.0**: Initial release with basic tokenization functionality
  - Core tokenizer implementation
  - RESTful API endpoints
  - Special tokens support
  - Auto-training capability
  - Reset functionality 