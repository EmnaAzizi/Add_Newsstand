import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Location } from "../location";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  locations: Location[] = [];
  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    var x = this.db.list("locations");

    x.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.locations.push(y as Location);
        this.locations.sort((a, b) =>
          a.address > b.address ? 1 : b.address > a.address ? -1 : 0
        );
      });
    });
  }
}
