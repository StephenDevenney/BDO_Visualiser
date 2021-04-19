import { TheDb } from '../thedb';
import { NavMenuEntity, SecuritySettingsEntity, ThemeEntity } from '../../shared/entities/securityEntities';

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

export class SecuritySettingsContext {
  public userId: number = 0;
  public userName: string = "";
  public userRoleId: number = 0;
  public navMinimised: boolean = false;
  public idleTime: number = 0;
  public themeId: number = 0;
  public themeName: string = "";
  public themeClassName: string = "";

    // GET Security Settings
  public get(): Promise<SecuritySettingsEntity> {
    const sql = `SELECT security_user.userId, security_user.userName, security_user.FK_roleId AS userRoleId, security_settings.navMinimised, enum_appIdleSecs.idleTime AS appIdleSecs, enum_theme.themeId, enum_theme.themeName, enum_theme.themeClassName FROM security_settings INNER JOIN security_user ON security_user.userId = security_settings.FK_userId INNER JOIN enum_theme ON enum_theme.themeId = security_settings.FK_themeId INNER JOIN enum_appIdleSecs ON enum_appIdleSecs.appIdleSecsId = security_settings.FK_appIdleSecsId WHERE security_settings.settingsId = 1`;
    const values = {};

    return TheDb.selectOne(sql, values)
        .then((row: any) => {
            return new SecuritySettingsContext().fromRow(row);
    });
  }

    // PUT Security Settings
  public update(themeId: number, navMinimised: boolean): Promise<void> {
    // let navMinBool = 0;
    const sql = `UPDATE security_settings SET (FK_appIdleSecsId, FK_themeId, navMinimised) = (1, $themeId, $navMinimised) WHERE security_settings.settingsId = 1`;
    const values = { $themeId: themeId, $navMinimised: navMinimised};

    return TheDb.update(sql, values)
            .then((result) => {

            });
  }

  private fromRow(row: SecuritySettingsEntity): SecuritySettingsEntity {
    this.userId = row['userId'];
    this.userName = row['userName'];
    this.userRoleId = row['userRoleId'];
    if(!!row['navMinimised'])
      this.navMinimised = true;
    this.idleTime = row['idleTime'];
    this.themeId = row['themeId'];
    this.themeName = row['themeName'];
    this.themeClassName = row['themeClassName'];

    return this;
  }
}

export class ThemesContext {
  public themeId: number = 0;
  public themeName: string = "";
  public themeClassName: string = "";

  // GET NavMenu
  public getAll(): Promise<Array<ThemeEntity>> {
    const sql = `SELECT themeId, themeName, themeClassName FROM enum_theme`;
    const values = {};

    return TheDb.selectAll(sql, values)
        .then((rows: any) => {
            const nm: Array<ThemeEntity> = new Array<ThemeEntity>();
            for (const row of rows) {
                const item = new ThemesContext().fromRow(row);
                nm.push(item);
            }
            return nm;
        });
    }

    private fromRow(row: ThemeEntity): ThemeEntity {
      this.themeId = row['themeId'];
      this.themeName = row['themeName'];
      this.themeClassName = row['themeClassName'];

      return this;
    }
}