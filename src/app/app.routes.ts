import { Routes } from '@angular/router';
import { WordListComponent } from './word-list/word-list.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component: WordListComponent},
    {path: 'account', component: AccountComponent},
    {path: 'login', component: LoginComponent}
];
