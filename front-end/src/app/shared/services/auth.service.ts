import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../classes/globals';
import { APIService } from './api.service';

@Injectable()
export class AuthService {

    constructor(private router: Router,
                private http: APIService,
                private globals: Globals){

    }

    
}