import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TokenInfo {
  id: number;
  text: string;
  type: 'special' | 'word' | 'unknown';
}

@Component({
  selector: 'app-visulization',
  imports: [CommonModule],
  templateUrl: './visulization.component.html',
  styleUrl: './visulization.component.css',
})
export class VisulizationComponent {
  @Input() tokenDetails: TokenInfo[] = [];

  getSpecialTokenName(id: number): string {
    const specialTokens = ['<PAD>', '<UNK>', '<START>', '<END>'];
    return specialTokens[id] || `<ID:${id}>`;
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
