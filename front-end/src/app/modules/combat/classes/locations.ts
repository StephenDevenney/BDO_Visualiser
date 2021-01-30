import { Injectable } from '@angular/core';

@Injectable()
export class Location {
    public locationId: number = 0;
    public locationName: string = "";
    public territory: string = "";
}