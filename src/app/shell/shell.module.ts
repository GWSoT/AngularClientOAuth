import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ShellComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ShellModule { }
