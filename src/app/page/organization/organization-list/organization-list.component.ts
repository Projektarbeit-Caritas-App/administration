import { Component, OnInit } from '@angular/core';
import {OrganizationService} from "../../../api/services/organization.service";

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  constructor(protected organizationService : OrganizationService) { }

  public listItems;

  ngOnInit(): void {

    let me = this;

    this.organizationService.apiAdminOrganizationGet().subscribe({
      next(response) {
        me.listItems = response;
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });
  }

}
