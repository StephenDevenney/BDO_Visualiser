import { TheDb } from '../thedb';
import { CombatSettingsEntity, GearEntity, GrindingDataEntity, GrindingTableHeadersEntity, UserClassEntity } from '../../shared/entities/combatEntities';

export class CombatSettingsContext {
  public settingsId: number = 0;
  public FK_combatSettingsId: number = 0;
  public FK_currentGearScoreId: number = 0;
  public FK_redBattleFieldId: number = 0;
  public FK_appleSecsId: number = 0;
  public FK_themeId: number = 0;
  public hasDefaultCombatHeaders: boolean = false;
  public navMinimised: boolean = false;

  // GET CombatSettings
  public async get(): Promise<CombatSettingsEntity> {
    const sql = `SELECT * FROM combat_settings INNER JOIN security_settings ON combat_settings.combatSettingsId = security_settings.FK_combatSettingsId WHERE security_settings.FK_userId = 1`;
    const values = {};

    return TheDb.selectOne(sql, values)
        .then((row: any) => {
            if (row) {
                return new CombatSettingsContext().fromRow(row);
            } else {
                throw new Error('Failed to get combatSettingsEntity');
            }
        });
  }

  private fromRow(row: CombatSettingsEntity): CombatSettingsEntity {
    this.settingsId = row['settingsId'];
    this.FK_combatSettingsId = row['FK_combatSettingsId'];
    this.FK_currentGearScoreId = row['FK_currentGearScoreId'];
    this.FK_redBattleFieldId = row['FK_redBattleFieldId'];
    this.FK_appleSecsId = row['FK_appleSecsId'];
    this.FK_themeId = row['FK_themeId'];
    if(!!row['hasDefaultCombatHeaders'])
      this.hasDefaultCombatHeaders = true;
    else
      this.hasDefaultCombatHeaders = false;
    if(!!row['navMinimised'])
      this.navMinimised = true;
    else
      this.navMinimised = false;
    return this;
  }
}

export class CombatTableHeadersContext {
  public headingId: number = 0;
  public field: string = "";
  public header: string = "";
  public isActive: boolean = false;

  // GET Combat Table Headers
  public getAll(): Promise<Array<GrindingTableHeadersEntity>> {
    const sql = `SELECT enum_combatTableHeadings.headingId, enum_combatTableHeadings.field, enum_combatTableHeadings.header, combat_columnDefaults.isActive FROM enum_combatTableHeadings INNER JOIN combat_columnDefaults ON combat_columnDefaults.FK_headingId = enum_combatTableHeadings.headingId WHERE combat_columnDefaults.FK_combatSettingsId = 1`;
    const values = {};

    return TheDb.selectAll(sql, values)
        .then((rows: any) => {
            const nm: Array<GrindingTableHeadersEntity> = new Array<GrindingTableHeadersEntity>();
            for (const row of rows) {
                const item = new CombatTableHeadersContext().fromRow(row);
                nm.push(item);
            }
            return nm;
        });
    }

    private fromRow(row: GrindingTableHeadersEntity): GrindingTableHeadersEntity {
      this.headingId = row['headingId'];
      this.field = row['field'];
      this.header = row['header'];
      if(!!row['isActive'])
        this.isActive = true;
      else
        this.isActive = false;

      return this;
  }
}

export class ActiveClassesContext {
  public classId: number = 0;
  public FK_gearScoreId: number = 0;
  public className: string = "";
  public classDescription: string = "";
  public classRole: string = "";
  public combatTypeName: string = "";
  public dateCreated: string = "";
  public ap: number = 0;
  public aap: number = 0;
  public dp: number = 0;
  public gearScore: number = 0;

  // GET Active Classes
  public getAll(): Promise<Array<UserClassEntity>> {
    const sql = `SELECT combat_classes.classId, combat_classes.FK_gearScoreId, enum_class.className as className, (className || ' (' || cast(combat_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleDescription as classRole, enum_combatType.combatTypeName, combat_classes.dateCreated, combat_gearScore.ap, combat_gearScore.aap, combat_gearScore.dp, combat_gearScore.gearScore FROM combat_classes INNER JOIN enum_class ON enum_class.classId = combat_classes.FK_classNameId INNER JOIN combat_gearScore ON combat_gearScore.gearScoreId = combat_classes.FK_gearScoreId INNER JOIN enum_classRole ON enum_classRole.roleId = combat_classes.FK_classRoleId INNER JOIN enum_combatType ON enum_combatType.combatTypeId = combat_classes.FK_primaryCombatTypeId WHERE combat_classes.FK_combatSettingsId = 1`;
    const values = {};

    return TheDb.selectAll(sql, values)
        .then((rows: any) => {
            const nm: Array<UserClassEntity> = new Array<UserClassEntity>();
            for (const row of rows) {
                const item = new ActiveClassesContext().fromRow(row);
                nm.push(item);
            }
            return nm;
        });
    }

    private fromRow(row: UserClassEntity): UserClassEntity {
      this.classId = row['classId'];
      this.FK_gearScoreId = row['FK_gearScoreId'];
      this.className = row['className'];
      this.classRole = row['classRole'];
      this.combatTypeName = row['combatTypeName'];
      this.dateCreated = row['dateCreated'];
      this.classDescription = row['description'];
      this.ap = row['ap'];
      this.aap = row['aap'];
      this.dp = row['dp'];
      this.gearScore = row['gearScore'];

      return this;
  }
}

export class GearContext {
  public gearScoreId: number = 0;
  public ap: number = 0;
  public aap: number = 0;
  public dp: number = 0
  public gearScore: number = 0;
  public dateCreated: string = "";

  // GET Single Classes Gear
  public async get(gearScoreId: number): Promise<GearEntity> {
    const sql = `SELECT gearScoreId, ap, aap, dp, gearScore, dateCreated FROM combat_gearScore WHERE combat_gearScore.gearScoreId = $gearScoreId`;
    const values = { $gearScoreId: gearScoreId };

    return TheDb.selectOne(sql, values)
        .then((row: any) => {
            if (row) {
                return new GearContext().fromRow(row);
            } else {
                throw new Error('Failed to get gearEntity.');
            }
        });
  }

  private fromRow(row: GearEntity): GearEntity {
    this.gearScoreId = row['gearScoreId'];
    this.ap = row['ap'];
    this.aap = row['aap'];
    this.dp = row['dp'];
    this.gearScore = row['gearScore'];
    this.dateCreated = row['dateCreated'];
    return this;
  }
}

export class GrindingDataContext {
  public grindingId: number = 0;
  public locationId: number = 0;
  public locationName: string = "";
  public territoryId: number = 0;
  public territoryName: string = "";
  public recommendedAP: number = 0;
  public recommendedLevel: string = "";
  public timeId: number = 0;
  public timeAmount: number = 0;
  public userClassId: number = 0;
  public classId: number = 0;
  public className: string = "";
  public classDescription: string = "";
  public classRoleId: number = 0;
  public classRoleName: string = "";
  public gearScoreId: number = 0;
  public ap: number = 0;
  public aap: number = 0;
  public dp: number = 0;
  public gearScore: number = 0;
  public serverId: number = 0;
  public serverDescription: string = "";
  public isElviaRealm: boolean = false;
  public combatTypeId: number = 0;
  public combatTypeName: string = "";
  public dateCreated: string = "";
  public trashLootAmount: number = 0;
  public afuaruSpawns: number = 0;

  // GET Grinding Data
  public getAll(): Promise<Array<GrindingDataEntity>> {
    const sql = `SELECT grindingId, enum_locations.locationId, enum_locations.locationName, enum_territory.territoryId, enum_territory.territoryName, enum_locations.recommendedAP, enum_locations.recommendedLevel, enum_time.timeId, enum_time.timeAmount, combat_classes.classId AS userClassId, enum_class.classId, enum_class.className, (className || ' (' || cast(combat_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleId AS classRoleId, enum_classRole.roleDescription AS classRoleName, combat_gearScore.gearScoreId, combat_gearScore.ap, combat_gearScore.aap, combat_gearScore.dp, combat_gearScore.gearScore, enum_server.serverId, enum_server.serverName, enum_server.isElviaRealm, combatType.combatTypeId, combatType.combatTypeName AS combatTypeName, combat_grinding.dateCreated, combat_grinding.trashLootAmount, combat_grinding.afuaruSpawns FROM combat_grinding INNER JOIN enum_locations ON enum_locations.locationId = combat_grinding.FK_locationId INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId INNER JOIN enum_time ON enum_time.timeId = combat_grinding.FK_timeId INNER JOIN combat_classes ON combat_classes.classId = combat_grinding.FK_classId INNER JOIN enum_class ON enum_class.classId = combat_classes.FK_classNameId INNER JOIN enum_classRole ON enum_classRole.roleId = combat_classes.FK_classRoleId INNER JOIN combat_gearScore ON combat_gearScore.gearScoreId = combat_grinding.FK_gearScoreId INNER JOIN enum_server ON enum_server.serverId = combat_grinding.FK_serverId INNER JOIN enum_combatType AS combatType ON combatType.combatTypeId = combat_grinding.FK_combatTypeId INNER JOIN enum_combatType AS primaryCombatType ON primaryCombatType.combatTypeId = combat_classes.FK_primaryCombatTypeId WHERE combat_grinding.FK_combatSettingsId = 1`;
    const values = {};

    return TheDb.selectAll(sql, values)
        .then((rows: any) => {
            const nm: Array<GrindingDataEntity> = new Array<GrindingDataEntity>();
            for (const row of rows) {
                const item = new GrindingDataContext().fromRow(row);
                nm.push(item);
            }
            return nm;
        });
    }

    private fromRow(row: GrindingDataEntity): GrindingDataEntity {
      this.grindingId = row['grindingId'];
      this.locationId = row['locationId'];
      this.locationName = row['locationName'];
      this.territoryId = row['territoryId'];
      this.territoryName = row['territoryName'];
      this.recommendedAP = row['recommendedAP'];
      this.recommendedLevel = row['recommendedLevel'];
      this.timeId = row['timeId'];
      this.timeAmount = row['timeAmount'];
      this.userClassId = row['userClassId'];
      this.classId = row['classId'];
      this.className = row['className'];
      this.classDescription = row['classDescription'];
      this.classRoleId = row['classRoleId'];
      this.classRoleName = row['classRoleName'];
      this.gearScoreId = row['gearScoreId'];
      this.ap = row['ap'];
      this.aap = row['aap'];
      this.dp = row['dp'];
      this.gearScore = row['gearScore'];
      this.serverId = row['serverId'];
      this.serverDescription = row['serverDescription'];
      this.isElviaRealm = row['isElviaRealm'];
      this.combatTypeId = row['combatTypeId'];
      this.combatTypeName = row['combatTypeName'];
      this.dateCreated = row['dateCreated'];
      this.trashLootAmount = row['trashLootAmount'];

      return this;
  }
}