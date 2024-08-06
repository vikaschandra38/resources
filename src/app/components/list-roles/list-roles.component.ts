import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../models/Role';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListHeaderComponent } from "../../shared/list-header/list-header.component";

@Component({
  selector: 'app-list-roles',
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
    MatSortModule, MatChipsModule, MatFormFieldModule, MatInputModule, ListHeaderComponent],
  templateUrl: './list-roles.component.html',
  styleUrl: './list-roles.component.scss'
})
export class ListRolesComponent  implements OnInit, AfterViewInit {
  router: Router = inject(Router);

  dataSource = new MatTableDataSource<Role>([]);;
  columnsToDisplay = [
    {
      columnName: 'roleId',
      columnLabel: 'ID',
    },
    {
      columnName: 'roleName',
      columnLabel: 'Name',
    },
    {
      columnName: 'description',
      columnLabel: 'Description',
    }
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay.map(column => column.columnName), 'edit', 'delete', 'expand'];
  expandedElement: Role | null = null;

  rolesService: RolesService = inject(RolesService);


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    if (!!this.paginator && !!this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  editRole(event: Event, role: Role) {
    event.stopPropagation();
    this.router.navigate(['/roles/edit', role.roleId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
