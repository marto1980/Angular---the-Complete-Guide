import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form)
  }

  onReset() {
    this.form.reset()
  }
}
