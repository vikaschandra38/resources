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
import { ApplicationFormComponent } from "../../shared/application-form/application-form.component";
import { Application } from '../../models/Application';

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [MatCardModule, CreateHeaderComponent, ApplicationFormComponent],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.scss'
})
export class CreateApplicationComponent {
  applicationService: ApplicationService = inject(ApplicationService);
  router: Router = inject(Router);

  onCreateApplication(application: Application) {
    this.applicationService.createApplication(application).subscribe(res => {
      this.router.navigateByUrl('/applications');
    });
  }
}
