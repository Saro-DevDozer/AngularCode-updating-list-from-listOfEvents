import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { User } from '../../../../../UserEvents/src/app/Model/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsers: User[];
  timeIntevalSeconds: number = 6;
  options: any = { hour12: false }
  pageLoadedTime: any;
  ResponseArray: any[];
  recentUpdateTime: any;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {

    this.loadAllUsers();

    setInterval(() => { this.getEvents() }, this.timeIntevalSeconds * 1000);
  }

  getLatestDateFromList(data: User[]) {
    // convert to timestamp and sort
    var sorted_ms = data.map(function (item) {
      return new Date(item.modifiedDate).getTime()
    }).sort();
    // take latest
    var latest_ms = sorted_ms[sorted_ms.length - 1];
    // convert to js date object 
    // return new Date(latest_ms);
    return new Date(latest_ms).toLocaleString('en-US', { hour12: false });
  }

  getEvents() {
    debugger

    if (this.allUsers) {
      if (this.allUsers.length > 0) {
        this.recentUpdateTime = this.getLatestDateFromList(this.allUsers);
      }
      else if (this.recentUpdateTime != undefined) {
        // do nothing. just keep the recent updated time value
      }
      else {
        this.recentUpdateTime = this.pageLoadedTime;
      }
    }
    else {
      this.recentUpdateTime = this.pageLoadedTime;
    }

    this.service.getUserEvents(this.recentUpdateTime).subscribe((response: any[]) => {

      if (response == null)
        return;

      var time = new Date;
      this.recentUpdateTime = time.toISOString();

      this.ResponseArray = new Array();
      this.ResponseArray = response;

      this.ResponseArray.forEach(row => {
        var currentRow = <User>row;

        if (row.Action == "Insert") {

          var updateFlag = false;
          
          this.allUsers.forEach(element => {
            if (element.userId == row.userId) {
              updateFlag = true;
              element.userName = row.userName;
              element.userNo = row.userNo;
            }
          });

          if (!updateFlag) {
            var user = new User();
            user.userId = row.userId;
            user.userName = row.userName;
            user.userNo = row.userNo;
            user.createdDate = row.createdDate;
            user.modifiedDate = row.modifiedDate;

            this.allUsers.push(user);
          }
        }
        else if (row.Action == "Update") {
          debugger
          this.allUsers.forEach(user => {
            if (user.userId == currentRow.userId) {
              debugger
              // get index and delete then push
              user.userName = currentRow.userName;
              user.userNo = currentRow.userNo;
            }
          });
        }
        else if (row.Action == "Delete") {
          this.allUsers.forEach((user, index, item) => {
            if (user.userId == currentRow.userId) {
              debugger
              //get index and delete
              item.splice(index, 1);
            }
          });
        }
      });

      console.log(Date.now);
    });
  }

  loadAllUsers() {

    debugger

    var time = new Date;

    this.pageLoadedTime = time.toISOString();

    this.service.getAllUsers().subscribe((result: any) => {
      this.allUsers = result;
    });
  }

  editRow(user: User) {
    this.router.navigate(['users/edit'], { queryParams: { id: user.userId, mode: "Edit" } });
  }

  removeRow(userId: string) {
    this.service.DeleteUser(userId).subscribe((response: any) => {
      this.loadAllUsers();
    })
  }

  openNewUser() {
    this.router.navigate(['users/edit'], { queryParams: { id: "", mode: "Add" } });
  }

}
