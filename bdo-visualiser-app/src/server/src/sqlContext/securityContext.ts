import { TheDb } from '../thedb';
import { NavMenuEntity } from '../../shared/entities/securityEntities';

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