import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav-content-container',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './sidenav-content-container.component.html',
  styleUrl: './sidenav-content-container.component.scss'
})
export class SidenavContentContainerComponent {

}
