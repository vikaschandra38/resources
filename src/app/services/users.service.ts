import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

const USER_DATA: User[] = [
  {
    "userId": "1",
    "userName": "jdoe",
    "firstName": "John",
    "lastName": "Doe",
    "userEmail": "jdoe@example.com",
    "userRoles": ["Admin"],
    "userGroups": ["Engineering", "QA"],
    "userStatus": true,
    "userPhoneNumber": "555-1234"
  },
  {
    "userId": "2",
    "userName": "asmith",
    "firstName": "Alice",
    "lastName": "Smith",
    "userEmail": "asmith@example.com",
    "userRoles": ["User"],
    "userGroups": ["Marketing"],
    "userStatus": true,
    "userPhoneNumber": "555-5678"
  },
  {
    "userId": "3",
    "userName": "bwilliams",
    "firstName": "Bob",
    "lastName": "Williams",
    "userEmail": "bwilliams@example.com",
    "userRoles": ["Manager"],
    "userGroups": ["Sales"],
    "userStatus": false,
    "userPhoneNumber": "555-8765"
  },
  {
    "userId": "4",
    "userName": "ckim",
    "firstName": "Charlie",
    "lastName": "Kim",
    "userEmail": "ckim@example.com",
    "userRoles": ["User"],
    "userGroups": ["Engineering"],
    "userStatus": true,
    "userPhoneNumber": "555-2345"
  },
  {
    "userId": "5",
    "userName": "dmiller",
    "firstName": "Diana",
    "lastName": "Miller",
    "userEmail": "dmiller@example.com",
    "userRoles": ["HR"],
    "userGroups": ["HR"],
    "userStatus": false,
    "userPhoneNumber": "555-9876"
  },
  {
    "userId": "6",
    "userName": "ewilson",
    "firstName": "Edward",
    "lastName": "Wilson",
    "userEmail": "ewilson@example.com",
    "userRoles": ["User"],
    "userGroups": ["Finance"],
    "userStatus": true,
    "userPhoneNumber": "555-3456"
  },
  {
    "userId": "7",
    "userName": "flane",
    "firstName": "Fiona",
    "lastName": "Lane",
    "userEmail": "flane@example.com",
    "userRoles": ["User"],
    "userGroups": ["Sales"],
    "userStatus": true,
    "userPhoneNumber": "555-4567"
  },
  {
    "userId": "8",
    "userName": "gcooper",
    "firstName": "George",
    "lastName": "Cooper",
    "userEmail": "gcooper@example.com",
    "userRoles": ["Admin"],
    "userGroups": ["IT"],
    "userStatus": false,
    "userPhoneNumber": "555-5678"
  },
  {
    "userId": "9",
    "userName": "hjones",
    "firstName": "Hannah",
    "lastName": "Jones",
    "userEmail": "hjones@example.com",
    "userRoles": ["User"],
    "userGroups": ["Marketing"],
    "userStatus": true,
    "userPhoneNumber": "555-6789"
  },
  {
    "userId": "10",
    "userName": "imartin",
    "firstName": "Isaac",
    "lastName": "Martin",
    "userEmail": "imartin@example.com",
    "userRoles": ["User"],
    "userGroups": ["QA"],
    "userStatus": true,
    "userPhoneNumber": "555-7890"
  },
  {
    "userId": "11",
    "userName": "jkhan",
    "firstName": "Jasmine",
    "lastName": "Khan",
    "userEmail": "jkhan@example.com",
    "userRoles": ["Manager"],
    "userGroups": ["HR"],
    "userStatus": true,
    "userPhoneNumber": "555-8901"
  },
  {
    "userId": "12",
    "userName": "klewis",
    "firstName": "Kyle",
    "lastName": "Lewis",
    "userEmail": "klewis@example.com",
    "userRoles": ["User"],
    "userGroups": ["IT"],
    "userStatus": false,
    "userPhoneNumber": "555-9012"
  },
  {
    "userId": "13",
    "userName": "lgreen",
    "firstName": "Laura",
    "lastName": "Green",
    "userEmail": "lgreen@example.com",
    "userRoles": ["User"],
    "userGroups": ["Finance"],
    "userStatus": true,
    "userPhoneNumber": "555-0123"
  },
  {
    "userId": "14",
    "userName": "mjohnson",
    "firstName": "Michael",
    "lastName": "Johnson",
    "userEmail": "mjohnson@example.com",
    "userRoles": ["User"],
    "userGroups": ["Engineering"],
    "userStatus": true,
    "userPhoneNumber": "555-1234"
  },
  {
    "userId": "15",
    "userName": "nmoore",
    "firstName": "Nancy",
    "lastName": "Moore",
    "userEmail": "nmoore@example.com",
    "userRoles": ["Admin"],
    "userGroups": ["Marketing"],
    "userStatus": true,
    "userPhoneNumber": "555-2345"
  },
  {
    "userId": "16",
    "userName": "operez",
    "firstName": "Oscar",
    "lastName": "Perez",
    "userEmail": "operez@example.com",
    "userRoles": ["User"],
    "userGroups": ["Sales"],
    "userStatus": false,
    "userPhoneNumber": "555-3456"
  },
  {
    "userId": "17",
    "userName": "pbrown",
    "firstName": "Paul",
    "lastName": "Brown",
    "userEmail": "pbrown@example.com",
    "userRoles": ["User"],
    "userGroups": ["HR"],
    "userStatus": true,
    "userPhoneNumber": "555-4567"
  },
  {
    "userId": "18",
    "userName": "qyoung",
    "firstName": "Quincy",
    "lastName": "Young",
    "userEmail": "qyoung@example.com",
    "userRoles": ["User"],
    "userGroups": ["IT"],
    "userStatus": true,
    "userPhoneNumber": "555-5678"
  },
  {
    "userId": "19",
    "userName": "rthomas",
    "firstName": "Rachel",
    "lastName": "Thomas",
    "userEmail": "rthomas@example.com",
    "userRoles": ["Manager"],
    "userGroups": ["Engineering"],
    "userStatus": true,
    "userPhoneNumber": "555-6789"
  },
  {
    "userId": "20",
    "userName": "sgarcia",
    "firstName": "Steven",
    "lastName": "Garcia",
    "userEmail": "sgarcia@example.com",
    "userRoles": ["User"],
    "userGroups": ["Finance"],
    "userStatus": false,
    "userPhoneNumber": "555-7890"
  }
]


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http: HttpClient = inject(HttpClient);

  getUsers() {
    return of(USER_DATA);
    // return this.http.get<User[]>(environment.apiUrl + '/api/users/all');
  }

  createUser(user: User) {
    return this.http.post(environment.apiUrl + 'api/users', user);
  }

  updateUser(user: User) {
    return this.http.put(environment.apiUrl + '/api/users/' + user.userId, user);
  }

  deleteUser(id: string) {
    return this.http.delete(environment.apiUrl + '/api/users/' + id);
  }
}
