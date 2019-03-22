import { Component, NgZone } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  locations: Location[] = [];
  todos$: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase, private router: Router) {}

  ngOnInit() {
    var x = this.db.list("locations");
    this.todos$ = this.db.list("locations");

    x.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.locations.push(y as Location);
        // console.log(y);
      });
    });
  }
}
