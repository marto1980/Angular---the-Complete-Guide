import { Pipe, PipeTransform } from '@angular/core'

enum SortDirection {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(
    value: Readonly<number[] | string[]>,
    direction: SortDirection = SortDirection.ASC,
  ) {
    return value.toSorted((a, b) => {
      if (direction === SortDirection.ASC) {
        return a > b ? 1 : -1
      } else {
        return a > b ? -1 : 1
      }
    })
  }
}
