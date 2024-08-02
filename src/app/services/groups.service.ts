import { inject, Injectable } from '@angular/core';
import { Group } from '../models/Group';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

const GROUP_DATA: Group[] = [
  {
    "groupId": "1",
    "groupName": "Engineering Team",
    "groupManager": "Alice Johnson",
    "groupMembers": ["John Doe", "Jane Smith", "Sam Wilson", "Nancy Black", "Evan Gray", "Rachel Red", "Sophia Pink", "William Cyan", "Emily Davis", "Michael Green", "John Doe", "Jane Smith", "Sam Wilson", "Nancy Black", "Evan Gray", "Rachel Red", "Sophia Pink", "William Cyan", "Emily Davis", "Michael Green"],
    "groupEmail": "engineering@example.com"
  },
  {
    "groupId": "2",
    "groupName": "Marketing Team",
    "groupManager": "Bob Brown",
    "groupMembers": ["Emily Davis", "Michael Green"],
    "groupEmail": "marketing@example.com"
  },
  {
    "groupId": "3",
    "groupName": "Sales Team",
    "groupManager": "Carol White",
    "groupMembers": ["Nancy Black", "Evan Gray", "Rachel Red"],
    "groupEmail": "sales@example.com"
  },
  {
    "groupId": "4",
    "groupName": "HR Team",
    "groupManager": "David Blue",
    "groupMembers": ["Olivia Purple", "Liam Orange"],
    "groupEmail": "hr@example.com"
  },
  {
    "groupId": "5",
    "groupName": "Finance Team",
    "groupManager": "Eve Yellow",
    "groupMembers": ["Sophia Pink", "William Cyan"],
    "groupEmail": "finance@example.com"
  }
]

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  http: HttpClient = inject(HttpClient);

  getGroups() {
    return of(GROUP_DATA);
    // return this.http.get<Group[]>(environment.apiUrl + '/api/groups/all');
  }

  createGroup(group: Group) {
    return this.http.post(environment.apiUrl + '/api/groups', group);
  }

  updateGroup(group: Group) {
    return this.http.put(environment.apiUrl + '/api/groups/' + group.groupId, group);
  }

  deleteGroup(id: string) {
    return this.http.delete(environment.apiUrl + '/api/groups/' + id);
  }
}
