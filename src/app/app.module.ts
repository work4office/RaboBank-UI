import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule,],
  declarations: [AppComponent, HomeComponent, DataComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
