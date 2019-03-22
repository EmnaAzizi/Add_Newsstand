import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";
import { AddLocationComponent } from "./add-location/add-location.component";
import { HeaderComponent } from "./header/header.component";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { HttpClientModule } from "@angular/common/http";
import { ListComponent } from "./list/list.component";
import { SortPipe } from './list/sort.pipe';

const appRoutes: Routes = [
  { path: "add", component: AddLocationComponent },
  { path: "list", component: ListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddLocationComponent,
    HeaderComponent,
    ListComponent,
    SortPipe
  ],
  imports: [
    GooglePlaceModule,
    HttpClientModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
