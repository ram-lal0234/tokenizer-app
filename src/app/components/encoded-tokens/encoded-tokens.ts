import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encoded-tokens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encoded-tokens.html',
  styleUrls: ['./encoded-tokens.css']
})
export class EncodedTokensComponent {
  @Input() encodedTokens: number[] = [];
  @Input() originalText: string = '';
  
  copiedMessage: string = '';

  copyTokens(): void {
    const tokenString = this.encodedTokens.join(' ');
    navigator.clipboard.writeText(tokenString).then(() => {
      this.showCopiedMessage('Tokens copied!');
    });
  }

  copyAsArray(): void {
    const tokenArray = JSON.stringify(this.encodedTokens);
    navigator.clipboard.writeText(tokenArray).then(() => {
      this.showCopiedMessage('Array copied!');
    });
  }

  copyOriginalText(): void {
    navigator.clipboard.writeText(this.originalText).then(() => {
      this.showCopiedMessage('Text copied!');
    });
  }

  private showCopiedMessage(message: string): void {
    this.copiedMessage = message;
    setTimeout(() => {
      this.copiedMessage = '';
    }, 2000);
  }
} 