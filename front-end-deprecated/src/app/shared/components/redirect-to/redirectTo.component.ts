import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../classes/globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'redirect-to',
  templateUrl: './redirectTo.component.html'
})
export class RedirectToComponent implements OnInit {

  constructor(private globals: Globals,
              private router: Router,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    var current_page = localStorage.getItem("current_page");
    if(current_page) 
      this.router.navigate(["/" + current_page + "/"]);
  }

}
