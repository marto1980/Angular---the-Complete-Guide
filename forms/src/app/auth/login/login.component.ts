import { afterNextRender, Component, viewChild } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule, NgForm } from '@angular/forms'
import { debounceTime } from 'rxjs'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = viewChild<NgForm>('form')

  constructor() {
    afterNextRender(() => {
      this.form()
        ?.valueChanges?.pipe(debounceTime(500))
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: (value) => {
            globalThis.localStorage.setItem('saved-login-form', JSON.stringify(value))
          },
        })
    })
  }

  onSubmit(formData: Readonly<NgForm>) {
    console.log(formData)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email: enteredEmail, password: enteredPassword } = formData.form.value
    console.log(enteredEmail, enteredPassword)
    if (formData.form.invalid) {
      return
    }
    formData.form.reset()
  }
}
