import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vocabulary-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vocabulary-display.html',
  styleUrls: ['./vocabulary-display.css']
})
export class VocabularyDisplayComponent {
  @Input() vocabularyEntries: Array<{word: string, id: number}> = [];
  @Input() vocabularySize: number = 0;
  
  copiedMessage: string = '';

  copyVocabulary(): void {
    const vocabText = this.vocabularyEntries
      .map(entry => `${entry.id}: ${entry.word}`)
      .join('\n');
    navigator.clipboard.writeText(vocabText).then(() => {
      this.showCopiedMessage('Vocabulary copied!');
    });
  }

  copyAsJSON(): void {
    const vocabObject = Object.fromEntries(
      this.vocabularyEntries.map(entry => [entry.word, entry.id])
    );
    const vocabJSON = JSON.stringify(vocabObject, null, 2);
    navigator.clipboard.writeText(vocabJSON).then(() => {
      this.showCopiedMessage('JSON copied!');
    });
  }

  private showCopiedMessage(message: string): void {
    this.copiedMessage = message;
    setTimeout(() => {
      this.copiedMessage = '';
    }, 2000);
  }
} 