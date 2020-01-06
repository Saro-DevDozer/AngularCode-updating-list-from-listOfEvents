import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../UserEvents/src/app/Model/User';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  constructor(private service: UserService, private router: Router, private formbuilder: FormBuilder, private route: ActivatedRoute) { }

  currUser: User;
  id: string;
  Mode: string;
  UserAddEditForm: any;
  options: any = { hour12: false }

  ngOnInit() {

    var queryParams = this.route.snapshot.queryParamMap;
    this.id = queryParams.get('id');
    this.Mode = queryParams.get('mode');

    this.currUser = new User();

    if (this.Mode == "Add") {
      //Add mode
    }
    else if (this.Mode == "Edit") {
      //edit mode
      this.LoadUserToEdit(this.id);
    }

    this.UserAddEditForm = this.formbuilder.group({
      userName: ['', [Validators.required]],
      userNo: ['', [Validators.required]]

    });

  }

  submitForm(formData: any) {
    debugger
    var time = new Date;
      // time.toLocaleString('en-US', this.options);
      time.toISOString();

    if (this.Mode == "Add" || this.Mode == null) {

      this.currUser.createdDate = time;
      this.currUser.userId = Guid.create().toString();
      this.currUser.modifiedDate = this.currUser.createdDate;

      this.service.CreateUser(this.currUser).subscribe((response) => {

        this.UserAddEditForm.reset();
        this.router.navigate(['/users/edit']);

      })
    }
    else if (this.Mode == "Edit") {
      this.currUser.modifiedDate = time

      this.service.UpdateUser(this.currUser).subscribe((response) => {
      })
    }
  }

  cancelEdit() {
    this.router.navigate(['/users']);
  }

  LoadUserToEdit(id: string) {
    this.service.LoadUserToEdit(id).subscribe((response: any) => {
      this.currUser = response;
    });
  }

}
