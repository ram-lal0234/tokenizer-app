import { Routes } from '@angular/router';
import { TokenizerComponent } from './components/tokenizer';

export const routes: Routes = [
  { path: '', component: TokenizerComponent },
  { path: '**', redirectTo: '' }
];
