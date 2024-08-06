import { Component, inject } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
import { CreateHeaderComponent } from "../../shared/create-header/create-header.component";

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, CreateHeaderComponent],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.scss'
})
export class CreateApplicationComponent {
  applicationService: ApplicationService = inject(ApplicationService);
  router: Router = inject(Router);
  fb: FormBuilder = new FormBuilder();

  applicationForm: FormGroup = this.fb.group({
    applicationName: new FormControl<string>('', Validators.required),
    accessControlModel: new FormControl<string>('', Validators.required),
    policy: new FormControl<string>('', Validators.required),
    others: new FormControl<string>('', Validators.required),
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
