import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'applications',
    pathMatch: 'full'
  },
  {
    path: 'applications',
    loadComponent: () => import('./components/sidenav-content-container/sidenav-content-container.component').then(m => m.SidenavContentContainerComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/list-application/list-application.component').then(m => m.ListApplicationComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./components/create-application/create-application.component').then(m => m.CreateApplicationComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/update-application/update-application.component').then(m => m.UpdateApplicationComponent)
      },
    ]
  },
  {
    path: 'roles',
    loadComponent: () => import('./components/sidenav-content-container/sidenav-content-container.component').then(m => m.SidenavContentContainerComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/list-roles/list-roles.component').then(m => m.ListRolesComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./components/create-roles/create-roles.component').then(m => m.CreateRolesComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/update-roles/update-roles.component').then(m => m.UpdateRolesComponent)
      },
    ]
  },
  {
    path: 'groups',
    loadComponent: () => import('./components/sidenav-content-container/sidenav-content-container.component').then(m => m.SidenavContentContainerComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/list-groups/list-groups.component').then(m => m.ListGroupsComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./components/create-groups/create-groups.component').then(m => m.CreateGroupsComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/update-groups/update-groups.component').then(m => m.UpdateGroupsComponent)
      },
    ]
  },
  {
    path: 'users',
    loadComponent: () => import('./components/sidenav-content-container/sidenav-content-container.component').then(m => m.SidenavContentContainerComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/list-users/list-users.component').then(m => m.ListUsersComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./components/create-users/create-users.component').then(m => m.CreateUsersComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/update-users/update-users.component').then(m => m.UpdateUsersComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'list',
  }
];
