import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
    console.log(this.form)
  }

  onReset() {
    this.form.reset()
  }
}
