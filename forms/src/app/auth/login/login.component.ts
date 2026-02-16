import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.email, Validators.required] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
  })

  get isEmailInvalid() {
    const emailControls = this.form.controls.email

    return emailControls.invalid && emailControls.touched && emailControls.dirty
  }

  get isPasswordInvalid() {
    const passwordControls = this.form.controls.password

    return passwordControls.invalid && passwordControls.touched && passwordControls.dirty
  }

  onSubmit() {
    console.log(this.form)
    const { email: enteredEmail, password: enteredPassword } = this.form.value
    console.log(enteredEmail, enteredPassword)
  }
}
