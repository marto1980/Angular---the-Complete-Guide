import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { debounceTime, of } from 'rxjs'

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

const isSavedForm = (value: unknown): value is { email: string } =>
  !!value && typeof value === 'object' && 'email' in value && typeof value.email === 'string'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  })

  private readonly destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    const savedForm = globalThis.localStorage.getItem('saved-login-form')
    if (savedForm) {
      const loadedForm: unknown = JSON.parse(savedForm)
      if (isSavedForm(loadedForm)) {
        this.form.patchValue({ email: loadedForm.email })
      }
    }

    this.form.valueChanges.pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        globalThis.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
      },
    })
  }

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
