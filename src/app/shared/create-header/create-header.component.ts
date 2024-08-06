import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-header',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './create-header.component.html',
  styleUrl: './create-header.component.scss'
})
export class CreateHeaderComponent {
  title = input('title');
}
