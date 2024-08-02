import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/Application';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list-application',
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
    MatSortModule, MatChipsModule, JsonPipe],
  templateUrl: './list-application.component.html',
  styleUrl: './list-application.component.scss'
})
export class ListApplicationComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Application>([]);;
  columnsToDisplay = [
    {
      columnName: 'applicationId',
      columnLabel: 'ID',
    },
    {
      columnName: 'applicationName',
      columnLabel: 'Application Name',
    },
    {
      columnName: 'accessControlModel',
      columnLabel: 'Access Control Mode',
    },
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay.map(column => column.columnName), 'edit', 'delete', 'expand'];
  expandedElement: Application | null = null;

  applicationService: ApplicationService = inject(ApplicationService);


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.applicationService.getApplications().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    if (!!this.paginator && !!this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  editApplication(event: Event, application: Application) {
    event.stopPropagation();
  }

  deleteApplication(event: Event, application: Application) {
    event.stopPropagation();
    this.applicationService.deleteApplication(application.applicationId!).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(application => application.applicationId !== res.applicationId);
    });
  }

  parseString(others: string){
    return JSON.parse(others);
  }
}
