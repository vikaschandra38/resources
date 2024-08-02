import { Component, inject } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.scss'
})
export class CreateApplicationComponent {
  applicationService: ApplicationService = inject(ApplicationService);
  router: Router = inject(Router);
  fb: FormBuilder = new FormBuilder();

  applicationForm: FormGroup = this.fb.group({
    applicationName: new FormControl<string>(''),
    accessControlModel: new FormControl<string>(''),
    policy: new FormControl<string>(''),
    others: new FormControl<string>(''),
  });

  constructor () { }

  onCreateApplication() {
    this.applicationService.createApplication(this.applicationForm.value).subscribe(res => {
      this.router.navigateByUrl('/applications');
    });
  }

  onReset() {
    this.applicationForm.reset();
  }
}
