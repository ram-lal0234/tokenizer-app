import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TokenizerService,
  EncodeRequest,
  DecodeRequest,
} from '../../services/tokenizer.service';
import { EncodingComponent } from '../encoding/encoding.component';
import { DecodingComponent } from '../decoding/decoding.component';
import { VisulizationComponent } from '../visulization/visulization.component';

interface TokenInfo {
  id: number;
  text: string;
  type: 'special' | 'word' | 'unknown';
}

@Component({
  selector: 'app-tokenizer',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EncodingComponent,
    DecodingComponent,
    VisulizationComponent,
  ],
  templateUrl: './tokenizer.component.html',
  styleUrl: './tokenizer.component.css',
})
export class TokenizerComponent {
  encodeForm: FormGroup;
  decodeForm: FormGroup;

  encodedTokens: number[] = [];
  decodedText: string = '';
  tokenDetails: TokenInfo[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Vocabulary information
  vocabularySize: number = 0;
  vocabularyEntries: Array<{ word: string; id: number }> = [];
  isTrained: boolean = false;

  exampleTexts = [
    'Hello world this is a test',
    'Angular 20 makes development fun',
    'Custom tokenizer example data',
    'This is a test of the tokenizer, it should be able to handle this text',
  ];

  constructor(
    private fb: FormBuilder,
    private tokenizerService: TokenizerService
  ) {
    this.encodeForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.decodeForm = this.fb.group({
      tokens: ['', [Validators.required, Validators.pattern(/^[\d\s,]+$/)]],
    });
  }

  ngOnInit(): void {
    this.updateVocabularyInfo();
  }

  onEncode(): void {
    if (this.encodeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const request: EncodeRequest = {
        text: this.encodeForm.get('text')?.value,
      };

      this.tokenizerService.encodeText(request).subscribe({
        next: (response) => {
          this.encodedTokens = response.tokens;
          this.generateTokenDetails(request.text, response.tokens);
          this.updateVocabularyInfo();
          this.successMessage = `Text encoded successfully! Generated ${response.tokens.length} tokens.`;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to encode text';
          this.isLoading = false;
        },
      });
    }
  }

  onDecode(): void {
    if (this.decodeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const tokensInput = this.decodeForm.get('tokens')?.value;
      const tokens = tokensInput
        .split(/[\s,]+/)
        .map((t: string) => parseInt(t.trim()))
        .filter((t: number) => !isNaN(t));

      const request: DecodeRequest = { tokens };

      this.tokenizerService.decodeTokens(request).subscribe({
        next: (response) => {
          this.decodedText = response.text;
          this.successMessage = 'Tokens decoded successfully!';
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to decode tokens';
          this.isLoading = false;
        },
      });
    }
  }

  onReset(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.tokenizerService.resetTokenizer().subscribe({
      next: (response) => {
        this.encodedTokens = [];
        this.decodedText = '';
        this.tokenDetails = [];
        this.updateVocabularyInfo();
        this.successMessage = response.message;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to reset tokenizer';
        this.isLoading = false;
      },
    });
  }

  private generateTokenDetails(originalText: string, tokens: number[]): void {
    const words = originalText.split(/\s+/);
    this.tokenDetails = tokens.map((tokenId, index) => {
      let type: 'special' | 'word' | 'unknown' = 'word';

      if (tokenId <= 3) {
        type = 'special';
      } else if (tokenId === 1) {
        type = 'unknown';
      }

      return {
        id: tokenId,
        text: words[index] || `<ID:${tokenId}>`,
        type,
      };
    });
  }

  private updateVocabularyInfo(): void {
    this.vocabularySize = this.tokenizerService.getVocabularySize();
    this.isTrained = this.tokenizerService.isTokenTrained();

    const vocab = this.tokenizerService.getVocabulary();
    this.vocabularyEntries = Array.from(vocab.entries())
      .map(([word, id]) => ({ word, id }))
      .sort((a, b) => a.id - b.id);
  }

  getSpecialTokenName(id: number): string {
    const specialTokens = ['<PAD>', '<UNK>', '<START>', '<END>'];
    return specialTokens[id] || `<ID:${id}>`;
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Helper method to get token type for display
  getTokenTypeDisplay(type: 'special' | 'word' | 'unknown'): string {
    switch (type) {
      case 'special':
        return 'Special';
      case 'word':
        return 'Word';
      case 'unknown':
        return 'Unknown';
      default:
        return 'Unknown';
    }
  }

  // Helper method to get token type color class
  getTokenTypeColorClass(type: 'special' | 'word' | 'unknown'): string {
    switch (type) {
      case 'special':
        return 'bg-purple-900 text-purple-200 border-purple-700';
      case 'word':
        return 'bg-green-900 text-green-200 border-green-700';
      case 'unknown':
        return 'bg-red-900 text-red-200 border-red-700';
      default:
        return 'bg-gray-900 text-gray-200 border-gray-700';
    }
  }
}
