import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApplicationFormComponent } from '../../shared/application-form/application-form.component';
import { CreateHeaderComponent } from '../../shared/create-header/create-header.component';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
import { Application } from '../../models/Application';

@Component({
  selector: 'app-update-application',
  standalone: true,
  imports: [MatCardModule, CreateHeaderComponent, ApplicationFormComponent],
  templateUrl: './update-application.component.html',
  styleUrl: './update-application.component.scss'
})
export class UpdateApplicationComponent {
  applicationService: ApplicationService = inject(ApplicationService);
  router: Router = inject(Router);

  onUpdateApplication(application: Application) {
    this.applicationService.updateApplication(application).subscribe(res => {
      this.router.navigateByUrl('/applications');
    });
  }
}
