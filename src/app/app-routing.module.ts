import { NgModule } from "@angular/core";
import { Router, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // { path: 'auth-callback', component: AuthCallbackComponent }
    { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}