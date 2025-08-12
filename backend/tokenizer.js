// tokenizer.js
let vocab = {};
let reverseVocab = {};
let specialTokens = ["<PAD>", "<UNK>", "<START>", "<END>"];

/**
 * Train tokenizer from text corpus
 */
function trainTokenizer(text) {
    vocab = {};
    reverseVocab = {};

    let tokens = text.split(/\s+/);

    // Add special tokens first
    specialTokens.forEach((token, index) => {
        vocab[token] = index;
        reverseVocab[index] = token;
    });

    let index = specialTokens.length;

    tokens.forEach(token => {
        if (!vocab[token]) {
            vocab[token] = index;
            reverseVocab[index] = token;
            index++;
        }
    });

    console.log(`Tokenizer trained. Vocabulary size: ${Object.keys(vocab).length}`);
}

/**
 * Encode text to token IDs
 */
function encode(text) {
    // Auto-train if vocab is empty
    if (Object.keys(vocab).length === 0) {
        console.log("No vocab found. Training tokenizer first...");
        trainTokenizer(text);
    }

    let tokens = text.split(/\s+/);
    return tokens.map(token => vocab[token] ?? vocab["<UNK>"]);
}

/**
 * Decode token IDs back to text
 */
function decode(tokenIds) {
    if (Object.keys(reverseVocab).length === 0) {
        throw new Error("Tokenizer not trained yet.");
    }

    return tokenIds.map(id => reverseVocab[id] ?? "<UNK>").join(" ");
}

/**
 * Reset tokenizer
 */
function resetTokenizer() {
    vocab = {};
    reverseVocab = {};
    console.log("Tokenizer reset.");
}

module.exports = {
    trainTokenizer,
    encode,
    decode,
    resetTokenizer
};
