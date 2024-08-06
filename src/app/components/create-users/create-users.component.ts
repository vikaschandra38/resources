import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CreateHeaderComponent } from "../../shared/create-header/create-header.component";

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule, CreateHeaderComponent],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.scss'
})
export class CreateUsersComponent implements OnInit {
  userForm: FormGroup;

  constructor (private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userRoles: this.fb.array([], Validators.required),
      userGroups: this.fb.array([], Validators.required),
      userStatus: [false, Validators.required],
      userPhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void { }

  get userRoles(): FormArray {
    return this.userForm.get('userRoles') as FormArray;
  }

  get userGroups(): FormArray {
    return this.userForm.get('userGroups') as FormArray;
  }

  addRole(role: string): void {
    this.userRoles.push(this.fb.control(role));
  }

  removeRole(index: number): void {
    this.userRoles.removeAt(index);
  }

  addGroup(group: string): void {
    this.userGroups.push(this.fb.control(group));
  }

  removeGroup(index: number): void {
    this.userGroups.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      console.log('User:', user);
    }
  }

  onReset(){
    this.userForm.reset();
  }
}
