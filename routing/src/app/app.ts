import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [HeaderComponent, UsersComponent],
})
export class App {}

