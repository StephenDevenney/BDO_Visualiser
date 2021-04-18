import { TheDb } from '../thedb';
import { NavMenuEntity } from 'src/server/shared/entities/securityEntities';

export class NavMenuContext {
  public navMenuId = -1;
  public navName = '';
  public navTitle = '';
  public navRoute = '';

  // GET NavMenu
  public getAll(): Promise<Array<NavMenuEntity>> {
    const sql = `SELECT security_navMenu.navMenuId AS navMenuId, security_navMenu.navName AS navName, security_navMenu.navRoute AS navRoute, security_navMenu.navTitle AS navTitle FROM security_settings INNER JOIN security_navRole ON security_navRole.FK_navMenuId = security_navMenu.navMenuId INNER JOIN security_navMenu ON security_navMenu.navMenuId = security_navRole.FK_navMenuId INNER JOIN security_user ON security_user.FK_roleId = security_navRole.FK_roleId WHERE security_settings.FK_userId = 1`;
    const values = {};

    return TheDb.selectAll(sql, values)
        .then((rows: any) => {
            const nm: Array<NavMenuEntity> = new Array<NavMenuEntity>();
            for (const row of rows) {
                const item = new NavMenuContext().fromRow(row);
                nm.push(item);
            }
            return nm;
        });
    }

    private fromRow(row: NavMenuEntity): NavMenuEntity {
      this.navMenuId = row['navMenuId'];
      this.navName = row['navName'];
      this.navTitle = row['navTitle'];
      this.navRoute = row['navRoute'];

      return this;
  }
}





// import { Injectable } from '@angular/core';
// import { NavMenuEntity } from '../../shared/entities/securityEntities';
// // const { app } = require("electron");
// import {app} from 'electron';
// // const dbPath = app.getPath('userData') + "\\Local Storage";
// // console.log(dbPath);
// // import * as path from 'path';
// // const knex = require('knex')({
// //   client: 'sqlite3',
// //   connection: {
// //     filename: dbPath + "\\bdo-visualiser.sqlite"
// //   }
// // });
// // let knex = require("knex")({
// //   client: "sqlite3",
// //   connection: {
// //     //when i comment this line app does not crash
// //     filename: path.join(dbPath, 'database.sqlite') 
// //   }
// // });
// // const SQLite = require("better-sqlite3");
// // const dbPath = app.getPath('userData') + "\\Local Storage";
// // console.log(dbPath);
// // const dbFile = path.resolve(dbPath, 'bdo-visualiser.sqlite');
// // const db = new SQLite(dbFile); 
// // const db = require('../../../../main.js');

// @Injectable()
// export class SecurityContext {
//   // private electronService: ElectronService = new ElectronService();
//   constructor(){}


//     public async getNavMenu(): Promise<Array<NavMenuEntity>> {
//         // return await db.prepare("SELECT security_navMenu.navName AS navName, security_navMenu.navRoute AS navRoute, security_navMenu.navTitle AS navTitle FROM security_settings INNER JOIN security_navRole ON security_navRole.FK_navMenuId = security_navMenu.navMenuId INNER JOIN security_navMenu ON security_navMenu.navMenuId = security_navRole.FK_navMenuId INNER JOIN security_user ON security_user.FK_roleId = security_navRole.FK_roleId WHERE security_settings.FK_userId = 1").all() as Array<NavMenuEntity>;
//         return new Array<NavMenuEntity>();
//     }

//     // public getNavMenu(): Observable<NavMenuEntity[]> {
//     //   return of(this.electronService.ipcRenderer.sendSync('get-items')).pipe(
//     //     catchError((error: any) => Observable.throw(error.json))
//     //   );
//     // }
  
// } 