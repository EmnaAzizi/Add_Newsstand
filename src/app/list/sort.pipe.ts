import { Pipe, PipeTransform } from "@angular/core";
import { Location } from "../location";
@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform {
  transform(value: Location[], filterBy: string): Location[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy
      ? value.filter(
          (loc: Location) =>
            loc.nom.toLocaleLowerCase().indexOf(filterBy) !== -1
        )
      : value;
  }
}
