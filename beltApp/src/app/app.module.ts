import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ReviewComponent } from './review/review.component';
import { EditComponent } from './edit/edit.component';
import { WriteComponent } from './write/write.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    ReviewComponent,
    EditComponent,
    WriteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
