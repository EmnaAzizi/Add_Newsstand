import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { GeocodingService } from "../geocoding.service";

@Component({
  selector: "app-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.css"]
})
export class AddLocationComponent implements OnInit {
  locationForm: FormGroup;
  longitude: number = 0;
  latitude: number = 0;
  itineraire: string = "";
  imageUrl: string = "";
  adresse: string = "";
  data: any[];
  locations: any[] = [];
  key: string = "AIzaSyC934Va4L8ucwQXOsqNXJSM09HbUNBezas";

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  public handleAddressChange(address: Address) {
    this.itineraire = address.url;
    this.adresse = address.formatted_address;
    this.longitude = address.geometry.location.lng();
    this.latitude = address.geometry.location.lat();
    console.log(address);
    if (address.photos != undefined) {
      this.imageUrl = address.photos[0].getUrl({
        maxWidth: address.photos[0].width,
        maxHeight: address.photos[0].height
      });
      console.log("get image from google photos", this.imageUrl);
    } else {
      this.imageUrl =
        "https://maps.googleapis.com/maps/api/streetview?size=1400x1000&location=" +
        this.latitude +
        "," +
        this.longitude +
        "&key=AIzaSyC934Va4L8ucwQXOsqNXJSM09HbUNBezas&signature=Newspayper";
    }

    console.log(
      "this is the addrerss",
      this.adresse,
      this.longitude,
      this.latitude
    );
  }

  getAddress(query: string, nom: string) {
    console.log(query, "this is query ");
    this.here.getAddress(query).then(
      result => {
        this.db.object("/locations/" + query).update({
          nom: nom,
          adresse: query,
          longitude: result[0].Location.DisplayPosition.Longitude,
          latitude: result[0].Location.DisplayPosition.Latitude,
          imageUrl:
            "https://maps.googleapis.com/maps/api/streetview?size=1400x1000&location=" +
            result[0].Location.DisplayPosition.Latitude +
            "," +
            result[0].Location.DisplayPosition.Longitude +
            "&key=AIzaSyC934Va4L8ucwQXOsqNXJSM09HbUNBezas&signature=Newspayper",
          url: "",
          itineraire: ""
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private here: GeocodingService
  ) {}

  public getJSON(): Observable<any> {
    return this.http.get("./assets/librairie.json");
  }

  ngOnInit() {
    this.initForm();

    /*this.getJSON().subscribe(data => {
      for (let a of data) {
        let img = "";
        if (a.photo != undefined) {
          img =
            "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
            a.photo.photo_reference +
            "&sensor=false&maxheight=1000&maxwidth=1000&key=" +
            this.key;
          console.log("photooooooo", a.photo.photo_reference);
        } else if (a.photos != undefined) {
          img =
            "https://maps.googleapis.com/maps/api/place/photo?photoreference=" +
            a.photos[0].photo_reference +
            "&sensor=false&maxheight=1000&maxwidth=1000&key=" +
            this.key;
          console.log("photossssss", a.photos[0].photo_reference);
        } else {
          img =
            "https://maps.googleapis.com/maps/api/streetview?size=1400x1000&location=" +
            a.geometry.location.lat +
            "," +
            a.geometry.location.lng +
            "&key=" +
            this.key;
        }
        let res = a.formatted_address.replace(/[. ]+/g, " ").trim();
        res = res.replace(/[/ ]+/g, " ").trim();
        this.db.object("/locations/" + res).update({
          nom: a.name,
          adresse: a.formatted_address,
          longitude: a.geometry.location.lng,
          latitude: a.geometry.location.lat,
          imageUrl: img,
          url: "",
          itineraire: ""
        });
      }
    });*/
  }

  initForm() {
    this.locationForm = this.formBuilder.group({
      nom: ["", Validators.required],
      adresse: ["", Validators.required],
      site: "",
      img: ""
    });
  }

  onSaveLocation() {
    console.log("on submit ");
    const nom = this.locationForm.get("nom").value;
    const site = this.locationForm.get("site").value;
    const img = this.locationForm.get("img").value;

    if (img != null && img != "") {
      console.log("yes the image exists");
      this.imageUrl = img;
    }

    console.log("this is the image that we will use ", this.imageUrl);
    this.db.object("/locations/" + this.adresse).update({
      nom: nom,
      adresse: this.adresse,
      longitude: this.longitude,
      latitude: this.latitude,
      imageUrl: this.imageUrl,
      url: site,
      itineraire: this.itineraire
    });

    this.locationForm.reset();
  }
}
