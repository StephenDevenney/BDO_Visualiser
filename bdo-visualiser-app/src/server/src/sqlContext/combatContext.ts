import { TheDb } from '../thedb';
import { CombatHeadersEntity, CombatSettingsEntity, GrindingDataEntity, GrindingTableHeadersEntity, LocationNamesEnumEntity, ServerNamesEnumEntity, TerritoryEnumEntity, TimeAmountEnumEntity } from '../../shared/entities/combatEntities';
import { Calculations } from '../../shared/calc/calculations';

export class CombatSettingsContext {
  public settingsId: number = 0;
  public FK_combatSettingsId: number = 0;
  public FK_currentGearScoreId: number = 0;
  public FK_redBattleFieldId: number = 0;
  public FK_appleSecsId: number = 0;
  public FK_themeId: number = 0;
  public hasDefaultCombatHeaders: boolean = false;
  public navMinimised: boolean = false;

  public async get(): Promise<CombatSettingsEntity> {
    const sql = `SELECT * FROM combat_settings INNER JOIN security_settings ON combat_settings.combatSettingsId = security_settings.FK_combatSettingsId WHERE security_settings.FK_userId = 1`;
    const values = {};

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new CombatSettingsContext().fromRow(row);
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
    if(!!row['navMinimised'])
      this.navMinimised = true;

    return this;
  }
}

export class CombatTableHeadersContext {
  public headingId: number = 0;
  public field: string = "";
  public header: string = "";
  public isActive: boolean = false;

  public getAll(): Promise<Array<GrindingTableHeadersEntity>> {
    const sql = `SELECT enum_combatTableHeadings.headingId, enum_combatTableHeadings.field, enum_combatTableHeadings.header, combat_columnDefaults.isActive FROM enum_combatTableHeadings INNER JOIN combat_columnDefaults ON combat_columnDefaults.FK_headingId = enum_combatTableHeadings.headingId WHERE combat_columnDefaults.FK_combatSettingsId = 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
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
  public classNameId: number = 0;
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

  public getAll(): Promise<Array<GrindingDataEntity>> {
    const sql = `SELECT grindingId, enum_locations.locationId, enum_locations.locationName, enum_territory.territoryId, enum_territory.territoryName, enum_locations.recommendedAP, enum_locations.recommendedLevel, enum_time.timeId, enum_time.timeAmount, userClass_classes.classId AS userClassId, enum_class.classId AS classNameId, enum_class.className, (className || ' (' || cast(userClass_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleId AS classRoleId, enum_classRole.roleDescription AS classRoleName, userClass_gearScore.gearScoreId, userClass_gearScore.ap, userClass_gearScore.aap, userClass_gearScore.dp, userClass_gearScore.gearScore, enum_server.serverId, enum_server.serverName as serverDescription, enum_server.isElviaRealm, combatType.combatTypeId, combatType.combatTypeName AS combatTypeName, combat_grinding.dateCreated, combat_grinding.trashLootAmount, combat_grinding.afuaruSpawns FROM combat_grinding INNER JOIN enum_locations ON enum_locations.locationId = combat_grinding.FK_locationId INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId INNER JOIN enum_time ON enum_time.timeId = combat_grinding.FK_timeId INNER JOIN userClass_classes ON userClass_classes.classId = combat_grinding.FK_classId INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId INNER JOIN enum_classRole ON enum_classRole.roleId = userClass_classes.FK_classRoleId INNER JOIN userClass_gearScore ON userClass_gearScore.gearScoreId = combat_grinding.FK_gearScoreId INNER JOIN enum_server ON enum_server.serverId = combat_grinding.FK_serverId INNER JOIN enum_combatType AS combatType ON combatType.combatTypeId = combat_grinding.FK_combatTypeId INNER JOIN enum_combatType AS primaryCombatType ON primaryCombatType.combatTypeId = userClass_classes.FK_primaryCombatTypeId WHERE combat_grinding.FK_combatSettingsId = 1 ORDER BY grindingId DESC`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<GrindingDataEntity> = new Array<GrindingDataEntity>();
      for (const row of rows) {
          const item = new GrindingDataContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public async getMostRecent(): Promise<GrindingDataEntity> {
    const sql = `SELECT grindingId, enum_locations.locationId, enum_locations.locationName, enum_territory.territoryId, enum_territory.territoryName, enum_locations.recommendedAP, enum_locations.recommendedLevel, enum_time.timeId, enum_time.timeAmount, userClass_classes.classId AS userClassId, enum_class.classId AS classNameId, enum_class.className, (className || ' (' || cast(userClass_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleId AS classRoleId, enum_classRole.roleDescription AS classRoleName, userClass_gearScore.gearScoreId, userClass_gearScore.ap, userClass_gearScore.aap, userClass_gearScore.dp, userClass_gearScore.gearScore, enum_server.serverId, enum_server.serverName as serverDescription, enum_server.isElviaRealm, combatType.combatTypeId, combatType.combatTypeName AS combatTypeName, combat_grinding.dateCreated, combat_grinding.trashLootAmount, combat_grinding.afuaruSpawns FROM combat_grinding INNER JOIN enum_locations ON enum_locations.locationId = combat_grinding.FK_locationId INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId INNER JOIN enum_time ON enum_time.timeId = combat_grinding.FK_timeId INNER JOIN userClass_classes ON userClass_classes.classId = combat_grinding.FK_classId INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId INNER JOIN enum_classRole ON enum_classRole.roleId = userClass_classes.FK_classRoleId INNER JOIN userClass_gearScore ON userClass_gearScore.gearScoreId = combat_grinding.FK_gearScoreId INNER JOIN enum_server ON enum_server.serverId = combat_grinding.FK_serverId INNER JOIN enum_combatType AS combatType ON combatType.combatTypeId = combat_grinding.FK_combatTypeId INNER JOIN enum_combatType AS primaryCombatType ON primaryCombatType.combatTypeId = userClass_classes.FK_primaryCombatTypeId WHERE combat_grinding.FK_combatSettingsId = 1 ORDER BY grindingId DESC LIMIT 1`;
    const values = { };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new GrindingDataContext().fromRow(row);
    });
  }

  public async insert(entry: GrindingDataEntity): Promise<void> {
    const sql = `INSERT OR REPLACE INTO combat_grinding (FK_combatSettingsId, FK_classId, FK_locationId, FK_timeId, FK_serverId, FK_combatTypeId, FK_gearScoreId, dateCreated, trashLootAmount, afuaruSpawns) VALUES (1, $classId, $locationId, $timeId, $serverId, $combatTypeId, $gearScoreId, $dateCreated, $trashloot, $afuaru);`;
    const values = { $classId: entry.userClassId, $locationId: entry.locationId, $timeId: entry.timeId, $serverId: entry.serverId, $combatTypeId: entry.combatTypeId, $gearScoreId: entry.gearScoreId, $dateCreated: new Calculations().calcCurrentDate(), $trashloot: entry.trashLootAmount, $afuaru: entry.afuaruSpawns };

    return TheDb.insert(sql, values).then((result) => {});
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
    this.classNameId = row['classNameId'];
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
    this.afuaruSpawns = row['afuaruSpawns'];

    return this;
  }
}

export class RecentLocationsContext {
  public locationId: number = 1;
  public territoryId: number = 1;
  public locationName: string = "-";
  public territoryName: string = "-";
  public recommendedLevel: string = "";
  public recommendedAP: string = "";

  /*
    Cut off for recent locations count is 3.
  */
  public getAll(): Promise<Array<LocationNamesEnumEntity>> {
    const sql = `SELECT DISTINCT enum_locations.locationId, enum_locations.FK_territoryId, enum_locations.locationName, enum_territory.territoryName, enum_locations.recommendedLevel, enum_locations.recommendedAP FROM combat_grinding INNER JOIN enum_locations ON enum_locations.locationId = FK_locationId INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId WHERE FK_combatSettingsId = 1 ORDER BY grindingId DESC LIMIT 3`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<LocationNamesEnumEntity> = new Array<LocationNamesEnumEntity>();
      for (const row of rows) {
          const item = new RecentLocationsContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  private fromRow(row: LocationNamesEnumEntity): LocationNamesEnumEntity {
    this.locationId = row['locationId'];
    this.territoryId = row['territoryId'];
    this.locationName = row['locationName'];
    this.territoryName = row['territoryName'];
    this.recommendedLevel = row['recommendedLevel'];
    this.recommendedAP = row['recommendedAP'];
  
    return this;
  }
}

export class ColumnHeadersContext {
  public headingId: number = 0;
  public field: string = "";
  public header: string = "";
  public isActive: boolean = false;

  public getAll(): Promise<Array<CombatHeadersEntity>> {
    const sql = `SELECT enum_combatTableHeadings.headingId, enum_combatTableHeadings.field, enum_combatTableHeadings.header, combat_columnDefaults.isActive FROM enum_combatTableHeadings INNER JOIN combat_columnDefaults ON combat_columnDefaults.FK_headingId = enum_combatTableHeadings.headingId WHERE combat_columnDefaults.FK_combatSettingsId = 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<CombatHeadersEntity> = new Array<CombatHeadersEntity>();
      for (const row of rows) {
          const item = new ColumnHeadersContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public update(headingId: number, isActive: boolean): Promise<void> {
    const sql = `UPDATE combat_columnDefaults SET isActive = $isActive WHERE FK_combatSettingsId = 1 AND FK_headingId = $headingId`;
    const values = { $headingId: headingId, $isActive: isActive};

    return TheDb.update(sql, values).then((result) => {});
  }

  public updateHasColumnsSet(): Promise<void> {
    const sql = `UPDATE combat_settings SET hasDefaultCombatHeaders = 1 WHERE combatSettingsId = 1`;
    const values = { };

    return TheDb.update(sql, values).then((result) => {});
  }

  private fromRow(row: CombatHeadersEntity): CombatHeadersEntity {
    this.headingId = row['headingId'];
    this.field = row['field'];
    this.header = row['header'];
    if(!!row['isActive'])
      this.isActive = true;
  
    return this;
  }
}

export class TerritoryEnumContext {
  public territoryId: number = 0;
  public territoryName: string = "";

  public getAll(): Promise<Array<TerritoryEnumEntity>> {
    const sql = `SELECT * FROM enum_territory WHERE territoryId != 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<TerritoryEnumEntity> = new Array<TerritoryEnumEntity>();
      for (const row of rows) {
        const item = new TerritoryEnumContext().fromRow(row);
        nm.push(item);
      }
      return nm;
    });
  }

  private fromRow(row: TerritoryEnumEntity): TerritoryEnumEntity {
    this.territoryId = row['territoryId'];
    this.territoryName = row['territoryName'];
  
    return this;
  }
}

export class LocationsEnumContext {
  public locationId: number = 1;
  public territoryId: number = 1;
  public locationName: string = "-";
  public territoryName: string = "-";
  public recommendedLevel: string = "";
  public recommendedAP: string = "";

  public getAll(): Promise<Array<LocationNamesEnumEntity>> {
    const sql = `SELECT enum_locations.locationId, enum_territory.territoryId, enum_locations.locationName, enum_territory.territoryName, enum_locations.recommendedLevel, enum_locations.recommendedAP FROM enum_locations INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId WHERE enum_locations.locationId != 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<LocationNamesEnumEntity> = new Array<LocationNamesEnumEntity>();
      for (const row of rows) {
        const item = new LocationsEnumContext().fromRow(row);
        nm.push(item);
      }
      return nm;
    });
  }

  private fromRow(row: LocationNamesEnumEntity): LocationNamesEnumEntity {
    this.locationId = row['locationId'];
    this.territoryId = row['territoryId'];
    this.locationName = row['locationName'];
    this.territoryName = row['territoryName'];
    this.recommendedLevel = row['recommendedLevel'];
    this.recommendedAP = row['recommendedAP'];
  
    return this;
  }
}

export class ServerEnumContext {
  public serverId: number = 1;
  public serverName: string = "-";
  public isElviaRealm: boolean = false;

  public getAll(): Promise<Array<ServerNamesEnumEntity>> {
    const sql = `SELECT * FROM enum_server WHERE serverId != 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<ServerNamesEnumEntity> = new Array<ServerNamesEnumEntity>();
      for (const row of rows) {
          const item = new ServerEnumContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  private fromRow(row: ServerNamesEnumEntity): ServerNamesEnumEntity {
    this.serverId = row['serverId'];
    this.serverName = row['serverName'];
    if(!!row['isElviaRealm'])
      this.isElviaRealm = true;
  
    return this;
  }
}

export class TimeEnumContext {
  public timeId: number = 1;
  public timeAmount: number = 60;

  public getAll(): Promise<Array<TimeAmountEnumEntity>> {
    const sql = `SELECT * FROM enum_time`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<TimeAmountEnumEntity> = new Array<TimeAmountEnumEntity>();
      for (const row of rows) {
          const item = new TimeEnumContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  private fromRow(row: TimeAmountEnumEntity): TimeAmountEnumEntity {
    this.timeId = row['timeId'];
    this.timeAmount = row['timeAmount'];
  
    return this;
  }
}
/*
  TODO: afuaru spawns not saving, update selected columns on save, have selected combat type change when class is changed when adding entry.
*/