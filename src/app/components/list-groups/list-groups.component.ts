import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Group } from '../../models/Group';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GroupsService } from '../../services/groups.service';
import { ListHeaderComponent } from "../../shared/list-header/list-header.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-list-groups',
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
    MatSortModule, ListHeaderComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './list-groups.component.html',
  styleUrl: './list-groups.component.scss',
})
export class ListGroupsComponent implements OnInit, AfterViewInit {
  router: Router = inject(Router);

  dataSource = new MatTableDataSource<Group>([]);;
  columnsToDisplay = [
    {
      columnName: 'groupId',
      columnLabel: 'ID',
    },
    {
      columnName: 'groupName',
      columnLabel: 'Name',
    },
    {
      columnName: 'groupManager',
      columnLabel: 'Manager',
    },
    {
      columnName: 'groupEmail',
      columnLabel: 'Email',
    },
  ];
  tableActionColumns = []; //['edit', 'delete'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay.map(column => column.columnName), ...this.tableActionColumns, 'expand'];
  expandedElement: Group | null = null;

  groupsService: GroupsService = inject(GroupsService);


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    if (!!this.paginator && !!this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  editGroup(event: Event, group: Group) {
    event.stopPropagation();
    this.router.navigate(['/groups/edit', group.groupId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
