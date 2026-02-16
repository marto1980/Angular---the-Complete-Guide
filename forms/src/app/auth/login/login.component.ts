import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core'
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
  destroyRef = inject(DestroyRef)

  constructor() {
    afterNextRender(() => {
      const savedForm = globalThis.localStorage.getItem('saved-login-form')

      if (savedForm) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const loadedFormData = JSON.parse(savedForm)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const savedEmail = loadedFormData.email

        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.form()?.setValue({ email: savedEmail, password: '' })
        }, 1)
      }

      this.form()
        ?.valueChanges?.pipe(debounceTime(500))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (value) => {
            globalThis.localStorage.setItem(
              'saved-login-form',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              JSON.stringify({ email: value.email }),
            )
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
