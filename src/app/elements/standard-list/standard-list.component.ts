import {Component, Injector, Input, OnInit} from '@angular/core';
import {ApiOverviewService} from "../../api-overview.service";

@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.scss'],
})
export class StandardListComponent implements OnInit {

  constructor(private apiOverview: ApiOverviewService) { }

  @Input()
  public entityName;

  @Input()
  public renderOptions;

  @Input()
  public customApiPath;

  @Input()
  public routingPrefix = '';

  @Input()
  public queryParameters = {};

  public listItems;

  @Input()
  isSubHierarchy = false;

  protected apiService;

  ngOnInit(): void {
    let me = this;
    this.apiService = this.apiOverview.getServiceByEntityName(this.entityName);
    let apiCall = this.apiOverview.getApiMethodName(this.entityName, 'Get', this.customApiPath);

    this.apiService[apiCall](this.queryParameters).subscribe({
      next(response) {
        me.listItems = response;
        me.listItems.items.forEach(function(item) {
          for (const [key, value] of Object.entries(item)) {
            if(typeof value === 'object' &&
              !Array.isArray(value) &&
              value !== null)
            {
              for (const [subkey, subvalue] of Object.entries(value)) {
                item[key+"__"+subkey] = subvalue;
              }
            }
          }
          return item;
        });
        console.log("me.listItems");
        console.log(me.listItems);
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });
  }

}
