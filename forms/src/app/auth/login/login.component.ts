import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  onSubmit(formData: Readonly<NgForm>) {
    console.log(formData)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email: enteredEmail, password: enteredPassword } = formData.form.value
    console.log(enteredEmail, enteredPassword)
    if (formData.form.invalid) {
      return
    }
  }
}
