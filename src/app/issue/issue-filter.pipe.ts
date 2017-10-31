import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'issuefilter',
  pure: false
})
export class IssueFilterPipe implements PipeTransform {
  transform(items: any[], search: string): any {

    if( !search ) {
      return items;
    }
    return items.filter(item => item.title.indexOf(search) !== -1);
  }
}
