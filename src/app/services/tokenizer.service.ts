import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface EncodeRequest {
  text: string;
}

export interface EncodeResponse {
  tokens: number[];
}

export interface DecodeRequest {
  tokens: number[];
}

export interface DecodeResponse {
  text: string;
}

export interface ResetResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenizerService {
  private vocab: Map<string, number> = new Map();
  private reverseVocab: Map<number, string> = new Map();
  private nextId: number = 4; // Start after special tokens (0-3)
  private isTrained: boolean = false;

  // Special tokens with fixed IDs
  private readonly specialTokens = ['<PAD>', '<UNK>', '<START>', '<END>'];

  constructor() {
    this.initializeSpecialTokens();
  }

  private initializeSpecialTokens(): void {
    this.specialTokens.forEach((token, index) => {
      this.vocab.set(token, index);
      this.reverseVocab.set(index, token);
    });
  }

  encodeText(request: EncodeRequest): Observable<EncodeResponse> {
    try {
      const { text } = request;
      
      if (!text || text.trim().length === 0) {
        throw new Error('Text cannot be empty');
      }

      // Split text into tokens (words)
      const words = text.trim().split(/\s+/);
      const tokens: number[] = [];

      // Always train on new words to expand vocabulary
      this.trainOnText(words);
      if (!this.isTrained) {
        this.isTrained = true;
      }

      // Encode each word
      for (const word of words) {
        const tokenId = this.vocab.get(word);
        if (tokenId !== undefined) {
          tokens.push(tokenId);
        } else {
          // Unknown word gets UNK token (ID: 1)
          tokens.push(1);
        }
      }

      return of({ tokens });
    } catch (error) {
      throw new Error(`Encoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  decodeTokens(request: DecodeRequest): Observable<DecodeResponse> {
    try {
      const { tokens } = request;
      
      if (!Array.isArray(tokens) || tokens.length === 0) {
        throw new Error('Tokens array cannot be empty');
      }

      if (!this.isTrained) {
        throw new Error('Tokenizer has not been trained yet. Please encode some text first.');
      }

      const decodedWords: string[] = [];

      for (const tokenId of tokens) {
        const word = this.reverseVocab.get(tokenId);
        if (word !== undefined) {
          decodedWords.push(word);
        } else {
          // Unknown token ID gets UNK token
          decodedWords.push('<UNK>');
        }
      }

      const decodedText = decodedWords.join(' ');
      return of({ text: decodedText });
    } catch (error) {
      throw new Error(`Decoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  resetTokenizer(): Observable<ResetResponse> {
    try {
      // Clear vocabulary
      this.vocab.clear();
      this.reverseVocab.clear();
      
      // Reset next ID
      this.nextId = 4;
      
      // Reinitialize special tokens
      this.initializeSpecialTokens();
      
      // Reset training status
      this.isTrained = false;

      return of({ message: 'Tokenizer reset successfully' });
    } catch (error) {
      throw new Error(`Reset failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private trainOnText(words: string[]): void {
    // Count word frequencies
    const wordCounts = new Map<string, number>();
    
    for (const word of words) {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }

    // Sort words by frequency (descending) and then alphabetically
    const sortedWords = Array.from(wordCounts.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1]; // Sort by frequency first
        }
        return a[0].localeCompare(b[0]); // Then alphabetically
      })
      .map(([word]) => word);

    // Add words to vocabulary
    for (const word of sortedWords) {
      if (!this.vocab.has(word)) {
        this.vocab.set(word, this.nextId);
        this.reverseVocab.set(this.nextId, word);
        this.nextId++;
      }
    }
  }

  // Helper methods for debugging and visualization
  getVocabulary(): Map<string, number> {
    return new Map(this.vocab);
  }

  getReverseVocabulary(): Map<number, string> {
    return new Map(this.reverseVocab);
  }

  getVocabularySize(): number {
    return this.vocab.size;
  }

  isTokenTrained(): boolean {
    return this.isTrained;
  }

  getNextId(): number {
    return this.nextId;
  }
} 