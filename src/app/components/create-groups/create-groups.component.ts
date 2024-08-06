import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Group } from '../../models/Group';
import { CreateHeaderComponent } from "../../shared/create-header/create-header.component";

@Component({
  selector: 'app-create-groups',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule, CreateHeaderComponent],
  templateUrl: './create-groups.component.html',
  styleUrl: './create-groups.component.scss'
})
export class CreateGroupsComponent implements OnInit{
  groupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      groupManager: ['', Validators.required],
      groupMembers: this.fb.array([], Validators.required),
      groupEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  get groupMembers(): FormArray {
    return this.groupForm.get('groupMembers') as FormArray;
  }

  addMember(member: string): void {
    this.groupMembers.push(this.fb.control(member));
  }

  removeMember(index: number): void {
    this.groupMembers.removeAt(index);
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const group: Group = this.groupForm.value;
      console.log('Group:', group);
    }
  }

  onReset(){
    this.groupForm.reset();
  }
}
