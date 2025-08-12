import { Routes } from '@angular/router';
import { TokenizerComponent } from './components/tokenizer/tokenizer.component';

export const routes: Routes = [
  { path: '', component: TokenizerComponent },
  { path: '**', redirectTo: '' }
];
