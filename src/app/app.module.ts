import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import {  
  MatButtonModule, MatMenuModule, MatDatepickerModule,MatNativeDateModule , MatIconModule, MatCardModule, MatSidenavModule,MatFormFieldModule,  
  MatInputModule, MatTooltipModule, MatToolbarModule  
} from '@angular/material';  
import { MatRadioModule } from '@angular/material/radio';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserAddEditComponent } from './Components/user-add-edit/user-add-edit.component';
import { UserService } from './Services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,  
    BrowserAnimationsModule,  
    MatButtonModule,  
    MatSelectModule,
    MatMenuModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule,  
    MatTabsModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
