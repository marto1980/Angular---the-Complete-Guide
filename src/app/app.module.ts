import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { SharedModule } from './shared/shared.module'
import { TasksModule } from './tasks/tasks.module'
import { UserComponent } from './user/user.component'

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent], // for non-standalone components
  bootstrap: [AppComponent],
  imports: [BrowserModule, SharedModule, TasksModule], // for angular modules and standalone components
})
export class AppModule {}
