import { Routes } from '@angular/router';
import { Family } from './pages/family/family';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Notfound } from './components/notfound/notfound';
import { Integrant } from './pages/integrant/integrant';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    { path: 'family', component: Family, canActivate: [authGuard] },
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'integrante/:id', component: Integrant, canActivate: [authGuard] },
    { path: 'login', component: Login },
    
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: Notfound}

];
