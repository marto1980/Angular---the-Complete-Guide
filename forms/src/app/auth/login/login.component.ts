import { Component } from '@angular/core'
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { of } from 'rxjs'

const mustContainQuestionMark: ValidatorFn = (control: Readonly<AbstractControl>) => {
  if (typeof control.value === 'string' && control.value.includes('?')) {
    return null
  }

  return { doesNotContainQuestionMark: true }
}

const emailIsUnique: AsyncValidatorFn = (control: Readonly<AbstractControl>) => {
  if (control.value !== 'test@example.com') {
    return of(null)
  }

  return of({ notUnique: true })
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
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
