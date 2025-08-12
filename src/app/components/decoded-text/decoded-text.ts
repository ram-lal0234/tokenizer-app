import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decoded-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decoded-text.html',
  styleUrls: ['./decoded-text.css']
})
export class DecodedTextComponent {
  @Input() decodedText: string = '';
  
  copiedMessage: string = '';

  copyText(): void {
    navigator.clipboard.writeText(this.decodedText).then(() => {
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