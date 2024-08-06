import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application } from '../models/Application';
import { environment } from '../../environments/environment';

import { of } from 'rxjs';

const APPLICATIONS_DATA: Application[] = [
  {
    applicationId: 'app_01',
    applicationName: 'Finance Tracker',
    accessControlModel: 'RBAC',
    policies: 'Read-Only',
    others: JSON.stringify({ version: '1.0', lastUpdated: '2024-01-15' })
  },
  {
    applicationId: 'app_02',
    applicationName: 'HR Management',
    accessControlModel: 'ABAC',
    policies: 'Full Access',
    others: JSON.stringify({ version: '2.3', lastUpdated: '2024-02-10' })
  },
  {
    applicationId: 'app_03',
    applicationName: 'Inventory System',
    accessControlModel: 'RBAC',
    policies: 'Read-Write',
    others: JSON.stringify({ version: '1.5', lastUpdated: '2024-03-05' })
  },
  {
    applicationId: 'app_04',
    applicationName: 'Project Management',
    accessControlModel: 'RBAC',
    policies: 'Read-Only',
    others: JSON.stringify({ version: '2.1', lastUpdated: '2024-04-22' })
  },
  {
    applicationId: 'app_05',
    applicationName: 'CRM',
    accessControlModel: 'ABAC',
    policies: 'Full Access',
    others: JSON.stringify({ version: '3.0', lastUpdated: '2024-05-18' })
  },
  {
    applicationId: 'app_06',
    applicationName: 'E-commerce Platform',
    accessControlModel: 'RBAC',
    policies: 'Read-Write',
    others: JSON.stringify({ version: '1.2', lastUpdated: '2024-06-01' })
  },
  {
    applicationId: 'app_07',
    applicationName: 'Learning Management System',
    accessControlModel: 'RBAC',
    policies: 'Read-Only',
    others: JSON.stringify({ version: '2.4', lastUpdated: '2024-06-20' })
  },
  {
    applicationId: 'app_08',
    applicationName: 'Email Marketing',
    accessControlModel: 'ABAC',
    policies: 'Full Access',
    others: JSON.stringify({ version: '1.7', lastUpdated: '2024-07-10' })
  },
  {
    applicationId: 'app_09',
    applicationName: 'Social Media Management',
    accessControlModel: 'RBAC',
    policies: 'Read-Write',
    others: JSON.stringify({ version: '2.0', lastUpdated: '2024-07-25' })
  },
  {
    applicationId: 'app_10',
    applicationName: 'Document Management',
    accessControlModel: 'RBAC',
    policies: 'Read-Only',
    others: JSON.stringify({ version: '3.2', lastUpdated: '2024-08-02' })
  },
  {
    applicationId: 'app_11',
    applicationName: 'Event Management',
    accessControlModel: 'ABAC',
    policies: 'Full Access',
    others: JSON.stringify({ version: '2.5', lastUpdated: '2024-08-15' })
  },
  {
    applicationId: 'app_12',
    applicationName: 'Customer Support',
    accessControlModel: 'RBAC',
    policies: 'Read-Write',
    others: JSON.stringify({ version: '1.8', lastUpdated: '2024-08-30' })
  },
  {
    applicationId: 'app_13',
    applicationName: 'Online Banking',
    accessControlModel: 'RBAC',
    policies: 'Read-Only',
    others: JSON.stringify({ version: '4.0', lastUpdated: '2024-09-10' })
  },
  {
    applicationId: 'app_14',
    applicationName: 'Health Management',
    accessControlModel: 'ABAC',
    policies: 'Full Access',
    others: JSON.stringify({ version: '1.3', lastUpdated: '2024-09-25' })
  },
  {
    applicationId: 'app_15',
    applicationName: 'Fleet Management',
    accessControlModel: 'RBAC',
    policies: 'Read-Write',
    others: JSON.stringify({ version: '2.7', lastUpdated: '2024-10-05' })
  },
  {
    applicationId: 'app_16',
    applicationName: 'Travel Booking',
    accessControlModel: 'RBAC',
    policies: 'Read-Only',
    others: JSON.stringify({ version: '3.1', lastUpdated: '2024-10-20' })
  },
  {
    applicationId: 'app_17',
    applicationName: 'Content Management',
    accessControlModel: 'ABAC',
    policies: 'Full Access',
    others: JSON.stringify({ version: '1.9', lastUpdated: '2024-11-02' })
  },
  {
    applicationId: 'app_18',
    applicationName: 'Warehouse Management',
    accessControlModel: 'RBAC',
    policies: 'Read-Write',
    others: JSON.stringify({ version: '2.2', lastUpdated: '2024-11-18' })
  },
  {
    applicationId: 'app_19',
    applicationName: 'Job Portal',
    accessControlModel: 'RBAC',
    policies: 'Read-Only',
    others: JSON.stringify({ version: '3.3', lastUpdated: '2024-12-01' })
  },
  {
    applicationId: 'app_20',
    applicationName: 'Analytics Dashboard',
    accessControlModel: 'ABAC',
    policies: 'Full Access',
    others: JSON.stringify({ version: '2.6', lastUpdated: '2024-12-15' })
  }
];

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
    const applicationJSONString = JSON.stringify(application);

    // Encode the JSON string in Base64
    const base64String = btoa(applicationJSONString);
    return this.http.post(environment.apiUrl + '/api/applications', base64String, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  updateApplication(application: Application) {
    return this.http.put(environment.apiUrl + '/api/applications/' + application.applicationId, application);
  }

  deleteApplication(applicationId: string) {
    return this.http.delete<Application>(environment.apiUrl + '/api/applications/' + applicationId);
  }
}
