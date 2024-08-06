import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { ListHeaderComponent } from "../../shared/list-header/list-header.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-users',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule, MatDividerModule, MatCardModule, RouterLink, MatPaginatorModule,
    MatSortModule, MatChipsModule, ListHeaderComponent,MatFormFieldModule, MatInputModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  router: Router = inject(Router);

  dataSource = new MatTableDataSource<User>([]);;
  columnsToDisplay = [
    {
      columnName: 'userId',
      columnLabel: 'ID',
    },
    {
      columnName: 'firstName',
      columnLabel: 'First Name',
    },
    {
      columnName: 'lastName',
      columnLabel: 'Last Name',
    },
    {
      columnName: 'userEmail',
      columnLabel: 'Email',
    },
    {
      columnName: 'userPhoneNumber',
      columnLabel: 'Phone No',
    },
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay.map(column => column.columnName), 'edit', 'delete', 'expand'];
  expandedElement: User | null = null;

  usersService: UsersService = inject(UsersService);


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    if (!!this.paginator && !!this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  editUser(event: Event, user: User) {
    event.stopPropagation();
    this.router.navigate(['/users/edit', user.userId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
