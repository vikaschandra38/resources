import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Application } from '../../models/Application';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss'
})
export class ApplicationFormComponent {
  fb: FormBuilder = new FormBuilder();
  formSubmit = output<Application>();
  router = inject(Router);
  applicationForm: FormGroup = this.fb.group({
    applicationId: new FormControl<number | null>(null),
    applicationName: new FormControl<string>('', Validators.required),
    accessControlModel: new FormControl<string>('', Validators.required),
    policies: new FormControl<string>('', Validators.required),
    others: new FormControl<string>('', Validators.required),
  });

  state: {
    [k: string]: any;
  } | undefined;


  constructor () {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if (!!this.state && this.state['application']) {
      this.applicationForm.get('applicationId')?.addValidators(Validators.required);
      this.applicationForm.updateValueAndValidity();
      this.applicationForm.patchValue(this.state['application']);
    }
  }

  onSubmit() {
    this.formSubmit.emit(this.applicationForm.getRawValue());
  }

  onReset() {
    if (!!this.state && this.state['application']) {
      this.applicationForm.reset(this.state['application']);
    } else {
      this.applicationForm.reset();
    }
  }
}
