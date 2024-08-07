import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application } from '../models/Application';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  http: HttpClient = inject(HttpClient);

  getApplications() {
    return this.http.get<Application[]>(environment.apiUrl + '/api/applications/all');
  }

  createApplication(application: Application) {
    // Convert form data to a JSON string
    // const applicationJSONString = JSON.stringify(application);

    // Encode the JSON string in Base64
    // const base64String = btoa(applicationJSONString);
    return this.http.post(environment.apiUrl + '/api/applications', application);
  }

  updateApplication(application: Application) {
    return this.http.put(environment.apiUrl + '/api/applications/' + application.applicationId, application);
  }

  deleteApplication(applicationId: number) {
    return this.http.delete<Application>(environment.apiUrl + '/api/applications/' + applicationId);
  }
}
