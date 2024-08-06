import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss'
})
export class ListHeaderComponent {
  title = input('title');
  buttonLabel = input('buttonLabel');
  isVisible = input(false);
}
