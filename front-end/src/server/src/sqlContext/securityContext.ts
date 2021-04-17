import { Injectable } from '@angular/core';
import { NavMenuEntity } from '../../shared/entities/securityEntities';
// const SQLite = require("better-sqlite3");
// const db = new SQLite('../../database/bdo-visualiser.sqlite', { fileMustExist: false });

@Injectable()
export class SecurityContext {
  constructor(){}


    public getNavMenu(): Array<NavMenuEntity> {
        // return await db.prepare("SELECT security_navMenu.navName AS navName, security_navMenu.navRoute AS navRoute, security_navMenu.navTitle AS navTitle FROM security_settings INNER JOIN security_navRole ON security_navRole.FK_navMenuId = security_navMenu.navMenuId INNER JOIN security_navMenu ON security_navMenu.navMenuId = security_navRole.FK_navMenuId INNER JOIN security_user ON security_user.FK_roleId = security_navRole.FK_roleId WHERE security_settings.FK_userId = 1").all() as Array<NavMenuEntity>;
        return new Array<NavMenuEntity>();
    }
  
} 