import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellService } from '../shell/shell.service';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  ShellService.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent }
  ])
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
