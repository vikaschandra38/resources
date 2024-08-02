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
import { RouterLink } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GroupsService } from '../../services/groups.service';

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
    MatSortModule],
  templateUrl: './list-groups.component.html',
  styleUrl: './list-groups.component.scss',
})
export class ListGroupsComponent implements OnInit, AfterViewInit {
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
  columnsToDisplayWithExpand = [...this.columnsToDisplay.map(column => column.columnName), 'edit', 'delete', 'expand'];
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
}
