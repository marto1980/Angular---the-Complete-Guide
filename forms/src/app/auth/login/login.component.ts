import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  onSubmit(form: Readonly<NgForm>) {
    console.log(form)
  }
}
