import { Injectable } from "@angular/core";
declare var H: any;

@Injectable({
  providedIn: "root"
})
export class GeocodingService {
  public platform: any;
  public geocoder: any;

  public constructor() {
    this.platform = new H.service.Platform({
      app_id: "H5wKWu0y62GBquRK2bn8",
      app_code: "7BQ4flIAA2I5zDO0YkF51g"
    });
    this.geocoder = this.platform.getGeocodingService();
  }

  public getAddress(query: string) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(
        { searchText: query },
        result => {
          if (result.Response.View.length > 0) {
            if (result.Response.View[0].Result.length > 0) {
              resolve(result.Response.View[0].Result);
            } else {
              reject({ message: "no results found" });
            }
          } else {
            reject({ message: "no results found" });
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
