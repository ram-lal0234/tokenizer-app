import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decoding',
  imports: [CommonModule],
  templateUrl: './decoding.component.html',
  styleUrl: './decoding.component.css',
})
export class DecodingComponent {
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
