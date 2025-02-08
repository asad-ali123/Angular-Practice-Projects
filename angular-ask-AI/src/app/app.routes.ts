import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ImageGenComponent } from './pages/image-gen/image-gen.component';
import { CricketComponent } from './pages/cricket/cricket.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'chat', pathMatch: 'full'
    },
    {
        path: 'chat', component: ChatComponent
    },
    {
        path: 'imagegen', component: ImageGenComponent
    },
    {
        path: 'cricket', component: CricketComponent
    }
];
