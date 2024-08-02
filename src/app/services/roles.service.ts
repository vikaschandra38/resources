import { inject, Injectable } from '@angular/core';
import { Role } from '../models/Role';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

const ROLES_DATA: Role[] = [
  { roleId: '1', roleName: 'Admin', description: 'Administrative role with full access' },
  { roleId: '2', roleName: 'User', description: 'Standard user role with limited access' },
  { roleId: '3', roleName: 'Manager', description: 'Managerial role with access to management features' },
];

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  http: HttpClient = inject(HttpClient);

  getRoles() {
    return of(ROLES_DATA);
    // return this.http.get<Role[]>(environment.apiUrl + '/api/roles/all');
  }

  createRole(role: Role) {
    return this.http.post(environment.apiUrl + '/api/roles', role);
  }

  updateRole(role: Role) {
    return this.http.put(environment.apiUrl + '/api/roles/' + role.roleId, role);
  }

  deleteRole(id: string) {
    return this.http.delete(environment.apiUrl + '/api/roles/' + id);
  }
}
