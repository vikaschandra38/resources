import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/Application';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { JsonPipe } from '@angular/common';
import { ListHeaderComponent } from "../../shared/list-header/list-header.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogService } from '../../services/dialog.service';

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
    MatSortModule, MatChipsModule, JsonPipe, ListHeaderComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './list-application.component.html',
  styleUrl: './list-application.component.scss'
})
export class ListApplicationComponent implements OnInit, AfterViewInit {
  router: Router = inject(Router);
  dialogService = inject(DialogService);

  dataSource = new MatTableDataSource<Application>([]);
  columnsToDisplay = [
    {
      columnName: 'applicationId',
      columnLabel: 'ID',
    },
    {
      columnName: 'applicationName',
      columnLabel: 'Application Name',
    },
  ];
  columnsToDisplayWithButtons = [...this.columnsToDisplay.map(column => column.columnName), 'edit', 'delete'];

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
    this.router.navigate(['/applications/edit', application.applicationId], {
      state: {
        application: application
      }
    });
  }

  deleteApplication(event: Event, application: Application) {
    event.stopPropagation();
    this.dialogService.launchDialog().afterClosed().subscribe(result => {
      if (!result) return;
      this.applicationService.deleteApplication(application.applicationId!).subscribe(res => {
        this.dataSource.data = this.dataSource.data.filter(application => application.applicationId !== res.applicationId);
      });
    })
  }

  parseString(others: string) {
    return JSON.parse(others);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
