import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private DataStorageService: DataStorageService) { }

  ngOnInit() {

    $(document).ready(function() {
      $('.sidenav').sidenav();
    });

    this.DataStorageService.getData();

  }

}
