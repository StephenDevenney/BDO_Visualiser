import { TheDb } from '../thedb';
import { Calculations } from '../../shared/calc/calculations';
import { ClassRolesEnumViewModel, CombatTypesEnumViewModel, GearViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassEntity, ClassNamesEnumEntity, ClassRoleEnumEntity, GearEntity, CombatTypesEnumEntity, GearBracketsEntity, userClassRoleChecksEntity } from '../../shared/entities/userClassEntities';

export class UserClassContext {
  public classId: number = 0;
  public FK_gearTypeId: number = 0;
  public FK_gearScoreId: number = 0;
  public classNameId: number = 0;
  public className: string = "";
  public fileName: string = "";
  public classDescription: string = "";
  public classRoleId: number = 0;
  public classRole: string = "";
  public combatTypeId: number = 0;
  public combatTypeName: string = "";
  public dateCreated: string = "";
  public userClassCount: number = 0;

  public async getAll(): Promise<Array<UserClassEntity>> {
    const sql = `SELECT userClass_classes.classId, userClass_classes.FK_gearTypeId, userClass_classes.FK_gearScoreId, enum_class.className as className, enum_class.classId as classNameId, enum_class.fileName, (className || ' (' || cast(userClass_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleId as classRoleId, enum_classRole.roleDescription as classRole, enum_combatType.combatTypeId, enum_combatType.combatTypeName, userClass_classes.dateCreated FROM userClass_classes INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId INNER JOIN userClass_gearScore ON userClass_gearScore.gearScoreId = userClass_classes.FK_gearScoreId INNER JOIN enum_classRole ON enum_classRole.roleId = userClass_classes.FK_classRoleId INNER JOIN enum_combatType ON enum_combatType.combatTypeId = userClass_classes.FK_primaryCombatTypeId WHERE userClass_classes.FK_combatSettingsId = 1 ORDER BY enum_classRole.roleId, userClass_classes.classId`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<UserClassEntity> = new Array<UserClassEntity>();
      for (const row of rows) {
          const item = new UserClassContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public async getMostRecent(): Promise<UserClassEntity> {
    const sql = `SELECT userClass_classes.classId, userClass_classes.FK_gearTypeId, userClass_classes.FK_gearScoreId, enum_class.className as className, enum_class.classId as classNameId, enum_class.fileName, (className || ' (' || cast(userClass_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleId as classRoleId, enum_classRole.roleDescription as classRole, enum_combatType.combatTypeId, enum_combatType.combatTypeName, userClass_classes.dateCreated FROM userClass_classes INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId INNER JOIN userClass_gearScore ON userClass_gearScore.gearScoreId = userClass_classes.FK_gearScoreId INNER JOIN enum_classRole ON enum_classRole.roleId = userClass_classes.FK_classRoleId INNER JOIN enum_combatType ON enum_combatType.combatTypeId = userClass_classes.FK_primaryCombatTypeId WHERE userClass_classes.FK_combatSettingsId = 1 ORDER BY userClass_classes.classId DESC LIMIT 1`;
    const values = { };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new UserClassContext().fromRow(row);
    });
  }

  public getUserClassCount() {
    const sql = `SELECT enum_class.classId, enum_class.className, COUNT(enum_class.classId) AS userClassCount FROM combat_grinding INNER JOIN userClass_classes ON userClass_classes.classId = combat_grinding.FK_classId INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId WHERE enum_class.classId != 1 GROUP BY enum_class.classId ORDER BY userClassCount DESC, enum_class.classId LIMIT 3`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<UserClassEntity> = new Array<UserClassEntity>();
      for (const row of rows) {
          const item = new UserClassContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public getUserClassCountViaLocation(locationId: number) {
    const sql = `SELECT enum_class.classId, enum_class.className, COUNT(enum_class.classId) AS userClassCount FROM combat_grinding INNER JOIN userClass_classes ON userClass_classes.classId = combat_grinding.FK_classId INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId WHERE enum_class.classId != 1 AND combat_grinding.FK_locationId = $locationId GROUP BY enum_class.classId ORDER BY userClassCount DESC, enum_class.classId LIMIT 3`;
    const values = { $locationId: locationId };

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<UserClassEntity> = new Array<UserClassEntity>();
      for (const row of rows) {
          const item = new UserClassContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public async insert(userClass: UserClassEntity): Promise<void> {
    if(userClass.FK_gearScoreId == 0)
      userClass.FK_gearTypeId = 2;

    const sql = `INSERT OR REPLACE INTO userClass_classes (FK_combatSettingsId, FK_classNameId, FK_classRoleId, FK_gearTypeId, FK_gearScoreId, FK_primaryCombatTypeId, dateCreated) VALUES (1, $FK_classNameId, $FK_classRoleId, $FK_gearTypeId, $FK_gearScoreId, $FK_primaryCombatTypeId, $dateCreated);`;
    const values = { $FK_classNameId: userClass.classNameId, $FK_classRoleId: userClass.classRoleId, $FK_gearTypeId: userClass.FK_gearTypeId, $FK_gearScoreId: userClass.FK_gearScoreId, $FK_primaryCombatTypeId: userClass.combatTypeId, $dateCreated: userClass.dateCreated };

    return TheDb.insert(sql, values).then((result) => {});
  }

  public async updateCombatGearActiveState(gearScoreId: number, userClassId: number): Promise<void> {
    const sql = `UPDATE userClass_classes SET FK_gearScoreId = $gearScoreId WHERE classId == $userClassId`;
    const values = { $gearScoreId: gearScoreId, $userClassId: userClassId };

    TheDb.update(sql, values).then((result) => {});
    return;
  }

  private fromRow(row: UserClassEntity): UserClassEntity {
    this.classId = row['classId'];
    this.FK_gearTypeId = row['FK_gearTypeId'];
    this.FK_gearScoreId = row['FK_gearScoreId'];
    this.classNameId = row['classNameId'];
    this.className = row['className'];
    this.fileName = row['fileName'];
    this.classRoleId = row['classRoleId'];
    this.classRole = row['classRole'];
    this.combatTypeId = row['combatTypeId'];
    this.combatTypeName = row['combatTypeName'];
    this.dateCreated = row['dateCreated'];
    this.classDescription = row['classDescription'];
    this.userClassCount = row['userClassCount'];

    return this;
  }
}

export class ClassNamesEnumContext {
  public classId: number = 0;
  public className: string = "";
  public fileName: string = "";

  public getAll(): Promise<Array<ClassNamesEnumEntity>> {
    const sql = `SELECT * FROM enum_class WHERE enum_class.classId != 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<ClassNamesEnumEntity> = new Array<ClassNamesEnumEntity>();
      for (const row of rows) {
          const item = new ClassNamesEnumContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public async get(className: string): Promise<ClassNamesEnumEntity> {
    const sql = `SELECT * FROM enum_class WHERE enum_class.className = $className`;
    const values = { $className: className };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row) 
        return new ClassNamesEnumContext().fromRow(row);
    });
  }

  private fromRow(row: ClassNamesEnumEntity): ClassNamesEnumEntity {
    this.classId = row['classId'];
    this.className = row['className'];
    this.fileName = row['fileName'];
  
    return this;
  }
}

export class ClassRolesEnumContext {
  public roleId: number = 1;
  public roleDescription: string = "-";

  public getAll(): Promise<Array<ClassRoleEnumEntity>> {
    const sql = `SELECT * FROM enum_classRole`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<ClassRoleEnumEntity> = new Array<ClassRoleEnumEntity>();
      for (const row of rows) {
          const item = new ClassRolesEnumContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public getAllWithoutMain(): Promise<Array<ClassRoleEnumEntity>> {
    const sql = `SELECT * FROM enum_classRole WHERE roleId != 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<ClassRoleEnumEntity> = new Array<ClassRoleEnumEntity>();
      for (const row of rows) {
          const item = new ClassRolesEnumContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public async get(roleDescription: string): Promise<ClassRoleEnumEntity> {
    const sql = `SELECT * FROM enum_classRole WHERE enum_classRole.roleDescription = $roleDescription`;
    const values = { $roleDescription: roleDescription };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row) 
        return new ClassRolesEnumContext().fromRow(row);
    });
  }

  public async getViaUserClassId(userClassId: number): Promise<ClassRoleEnumEntity> {
    const sql = `SELECT enum_classRole.roleId, enum_classRole.roleDescription FROM userClass_classes INNER JOIN enum_classRole ON enum_classRole.roleId = userClass_classes.FK_classRoleId WHERE userClass_classes.classId = $userClassId`;
    const values = { $userClassId: userClassId };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row) 
        return new ClassRolesEnumContext().fromRow(row);
    });
  }

  public async updateUserClassRole(userClassRole: ClassRolesEnumViewModel, userClassId: number): Promise<void> {
    const sql = `UPDATE userClass_classes SET FK_classRoleId = $userClassRoleId WHERE classId == $userClassId`;
    const values = { $userClassRoleId: userClassRole.classRoleId, $userClassId: userClassId};

    TheDb.update(sql, values).then((result) => {});
    return;
  }

  public async checkAvailableUserClassRoles(): Promise<userClassRoleChecksEntity> {
    const sql = `SELECT userClass_classes.classId AS mainClass, uc.classId AS secondaryClass FROM userClass_classes LEFT JOIN userClass_classes AS uc on uc.FK_classRoleId == 3 WHERE userClass_classes.FK_classRoleId == 1`;
    const values = { };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new ClassRolesEnumContext().fromRowRoleCheck(row);
    });
  }

  private fromRow(row: ClassRoleEnumEntity): ClassRoleEnumEntity {
    this.roleId = row['roleId'];
    this.roleDescription = row['roleDescription'];
  
    return this;
  }

  private fromRowRoleCheck(row: userClassRoleChecksEntity): userClassRoleChecksEntity {
    let res: userClassRoleChecksEntity = new userClassRoleChecksEntity(false, false);
    if(!!row['mainClass'])
      res.hasMainClass = true;
    if(!!row['secondaryClass'])
      res.hasSecondaryClass = true;

    return res;
  }
}

export class GearContext {
  public gearScoreId: number = 0;
  public gearScoreBuildId: number = 0;
  public ap: number = 0;
  public apBracketLow: number = 0;
  public apBracketHigh: number = 0;
  public apBracketBonus: number = 0;
  public aap: number = 0;
  public aapBracketLow: number = 0;
  public aapBracketHigh: number = 0;
  public aapBracketBonus: number = 0;
  public dp: number = 0
  public dpBracketLow: number = 0;
  public dpBracketHigh: number = 0;
  public dpBracketBonus: number = 0;
  public gearScore: number = 0;
  public dateCreated: string = "";
  public gearLabel: string = "";
  public isCurrent: boolean = false;
  public nextApBracketLow: number = 0;
  public nextApBracketHigh: number = 0;
  public nextApBracketBonus: number = 0;
  public nextAapBracketLow: number = 0;
  public nextAapBracketHigh: number = 0;
  public nextAapBracketBonus: number = 0;
  public nextDpBracketLow: number = 0;
  public nextDpBracketHigh: number = 0;
  public nextDpBracketBonus: number = 0;
  public isActive: boolean = false;

  public async get(gearScoreId: number): Promise<GearEntity> {
    const sql = `SELECT gearScoreId, gearScoreBuildId, ap, cb1.apBracketLow AS apBracketLow, cb1.apBracketHigh AS apBracketHigh, cb1.apBracketBonus AS apBracketBonus, aap, cb2.apBracketLow AS aapBracketLow, cb2.apBracketHigh AS aapBracketHigh, cb2.apBracketBonus AS aapBracketBonus, dp, cb3.dpBracketLow AS dpBracketLow, cb3.dpBracketHigh AS dpBracketHigh, cb3.dpBracketBonus AS dpBracketBonus, gearScore, userClass_gearScore.dateCreated, gearLabel, isCurrent, ccb1.apBracketLow AS nextApBracketLow, ccb1.apBracketHigh AS nextApBracketHigh, ccb1.apBracketBonus AS nextApBracketBonus, ccb2.apBracketLow AS nextAapBracketLow, ccb2.apBracketHigh AS nextAapBracketHigh, ccb2.apBracketBonus AS nextAapBracketBonus, ccb3.dpBracketLow AS nextDpBracketLow, ccb3.dpBracketHigh AS nextDpBracketHigh, ccb3.dpBracketBonus AS nextDpBracketBonus, uc.FK_gearScoreId AS userClassActiveGearScoreId FROM userClass_gearScore INNER JOIN enum_combatBrackets AS cb1 ON userClass_gearScore.ap >= cb1.apBracketLow AND userClass_gearScore.ap <= cb1.apBracketHigh INNER JOIN enum_combatBrackets AS cb2 ON userClass_gearScore.aap >= cb2.apBracketLow AND userClass_gearScore.aap <= cb2.apBracketHigh INNER JOIN enum_combatBrackets AS cb3 ON userClass_gearScore.dp >= cb3.dpBracketLow AND userClass_gearScore.dp <= cb3.dpBracketHigh LEFT JOIN enum_combatBrackets AS ccb1 ON cb1.ROWID = ccb1.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb2 ON cb2.ROWID = ccb2.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb3 ON cb3.ROWID = ccb3.ROWID-1 LEFT JOIN userClass_classes AS uc ON uc.classId == userClass_gearScore.FK_classId WHERE userClass_gearScore.gearScoreId = $gearScoreId`;
    const values = { $gearScoreId: gearScoreId };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new GearContext().fromRow(row);
    });
  }

  public async getAll(): Promise<Array<GearEntity>> {
    const sql = `SELECT gearScoreId, gearScoreBuildId, ap, cb1.apBracketLow AS apBracketLow, cb1.apBracketHigh AS apBracketHigh, cb1.apBracketBonus AS apBracketBonus, aap, cb2.apBracketLow AS aapBracketLow, cb2.apBracketHigh AS aapBracketHigh, cb2.apBracketBonus AS aapBracketBonus, dp, cb3.dpBracketLow AS dpBracketLow, cb3.dpBracketHigh AS dpBracketHigh, cb3.dpBracketBonus AS dpBracketBonus, gearScore, userClass_gearScore.dateCreated, gearLabel, isCurrent, ccb1.apBracketLow AS nextApBracketLow, ccb1.apBracketHigh AS nextApBracketHigh, ccb1.apBracketBonus AS nextApBracketBonus, ccb2.apBracketLow AS nextAapBracketLow, ccb2.apBracketHigh AS nextAapBracketHigh, ccb2.apBracketBonus AS nextAapBracketBonus, ccb3.dpBracketLow AS nextDpBracketLow, ccb3.dpBracketHigh AS nextDpBracketHigh, ccb3.dpBracketBonus AS nextDpBracketBonus, uc.FK_gearScoreId AS userClassActiveGearScoreId FROM userClass_gearScore INNER JOIN enum_combatBrackets AS cb1 ON userClass_gearScore.ap >= cb1.apBracketLow AND userClass_gearScore.ap <= cb1.apBracketHigh INNER JOIN enum_combatBrackets AS cb2 ON userClass_gearScore.aap >= cb2.apBracketLow AND userClass_gearScore.aap <= cb2.apBracketHigh INNER JOIN enum_combatBrackets AS cb3 ON userClass_gearScore.dp >= cb3.dpBracketLow AND userClass_gearScore.dp <= cb3.dpBracketHigh LEFT JOIN enum_combatBrackets AS ccb1 ON cb1.ROWID = ccb1.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb2 ON cb2.ROWID = ccb2.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb3 ON cb3.ROWID = ccb3.ROWID-1 LEFT JOIN userClass_classes AS uc ON uc.classId == userClass_gearScore.FK_classId`;
    const values = { };

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<GearEntity> = new Array<GearEntity>();
      for (const row of rows) {
          const item = new GearContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public async getViaClassId(classId: number): Promise<GearEntity> {
    const sql = `SELECT gearScoreId, gearScoreBuildId, ap, cb1.apBracketLow AS apBracketLow, cb1.apBracketHigh AS apBracketHigh, cb1.apBracketBonus AS apBracketBonus, aap, cb2.apBracketLow AS aapBracketLow, cb2.apBracketHigh AS aapBracketHigh, cb2.apBracketBonus AS aapBracketBonus, dp, cb3.dpBracketLow AS dpBracketLow, cb3.dpBracketHigh AS dpBracketHigh, cb3.dpBracketBonus AS dpBracketBonus, gearScore, userClass_gearScore.dateCreated, gearLabel, isCurrent, ccb1.apBracketLow AS nextApBracketLow, ccb1.apBracketHigh AS nextApBracketHigh, ccb1.apBracketBonus AS nextApBracketBonus, ccb2.apBracketLow AS nextAapBracketLow, ccb2.apBracketHigh AS nextAapBracketHigh, ccb2.apBracketBonus AS nextAapBracketBonus, ccb3.dpBracketLow AS nextDpBracketLow, ccb3.dpBracketHigh AS nextDpBracketHigh, ccb3.dpBracketBonus AS nextDpBracketBonus, uc.FK_gearScoreId AS userClassActiveGearScoreId FROM userClass_gearScore INNER JOIN enum_combatBrackets AS cb1 ON userClass_gearScore.ap >= cb1.apBracketLow AND userClass_gearScore.ap <= cb1.apBracketHigh INNER JOIN enum_combatBrackets AS cb2 ON userClass_gearScore.aap >= cb2.apBracketLow AND userClass_gearScore.aap <= cb2.apBracketHigh INNER JOIN enum_combatBrackets AS cb3 ON userClass_gearScore.dp >= cb3.dpBracketLow AND userClass_gearScore.dp <= cb3.dpBracketHigh LEFT JOIN enum_combatBrackets AS ccb1 ON cb1.ROWID = ccb1.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb2 ON cb2.ROWID = ccb2.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb3 ON cb3.ROWID = ccb3.ROWID-1 LEFT JOIN userClass_classes AS uc ON uc.classId == userClass_gearScore.FK_classId WHERE userClass_gearScore.FK_classId == $classId AND userClass_gearScore.isCurrent == 1 AND uc.FK_gearScoreId == userClass_gearScore.gearScoreId`;
    const values = { $classId: classId };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new GearContext().fromRow(row);
    });
  }

  public async getAllUserClassBuilds(classId: number): Promise<Array<GearEntity>> {
    const sql = `SELECT DISTINCT gearScoreId, gearScoreBuildId, ap, cb1.apBracketLow AS apBracketLow, cb1.apBracketHigh AS apBracketHigh, cb1.apBracketBonus AS apBracketBonus, aap, cb2.apBracketLow AS aapBracketLow, cb2.apBracketHigh AS aapBracketHigh, cb2.apBracketBonus AS aapBracketBonus, dp, cb3.dpBracketLow AS dpBracketLow, cb3.dpBracketHigh AS dpBracketHigh, cb3.dpBracketBonus AS dpBracketBonus, gearScore, userClass_gearScore.dateCreated, gearLabel, isCurrent, ccb1.apBracketLow AS nextApBracketLow, ccb1.apBracketHigh AS nextApBracketHigh, ccb1.apBracketBonus AS nextApBracketBonus, ccb2.apBracketLow AS nextAapBracketLow, ccb2.apBracketHigh AS nextAapBracketHigh, ccb2.apBracketBonus AS nextAapBracketBonus, ccb3.dpBracketLow AS nextDpBracketLow, ccb3.dpBracketHigh AS nextDpBracketHigh, ccb3.dpBracketBonus AS nextDpBracketBonus, uc.FK_gearScoreId AS userClassActiveGearScoreId FROM userClass_gearScore INNER JOIN enum_combatBrackets AS cb1 ON userClass_gearScore.ap >= cb1.apBracketLow AND userClass_gearScore.ap <= cb1.apBracketHigh INNER JOIN enum_combatBrackets AS cb2 ON userClass_gearScore.aap >= cb2.apBracketLow AND userClass_gearScore.aap <= cb2.apBracketHigh INNER JOIN enum_combatBrackets AS cb3 ON userClass_gearScore.dp >= cb3.dpBracketLow AND userClass_gearScore.dp <= cb3.dpBracketHigh LEFT JOIN enum_combatBrackets AS ccb1 ON cb1.ROWID = ccb1.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb2 ON cb2.ROWID = ccb2.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb3 ON cb3.ROWID = ccb3.ROWID-1 LEFT JOIN userClass_classes AS uc ON uc.classId == userClass_gearScore.FK_classId WHERE userClass_gearScore.FK_classId == $classId AND userClass_gearScore.isCurrent == 1 GROUP BY gearScoreId ORDER BY gearScoreBuildId ASC`;
    const values = { $classId: classId };

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<GearEntity> = new Array<GearEntity>();
      for (const row of rows) {
          const item = new GearContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public async getMostRecent(): Promise<GearEntity> {
    const sql = `SELECT gearScoreId, gearScoreBuildId, ap, cb1.apBracketLow AS apBracketLow, cb1.apBracketHigh AS apBracketHigh, cb1.apBracketBonus AS apBracketBonus, aap, cb2.apBracketLow AS aapBracketLow, cb2.apBracketHigh AS aapBracketHigh, cb2.apBracketBonus AS aapBracketBonus, dp, cb3.dpBracketLow AS dpBracketLow, cb3.dpBracketHigh AS dpBracketHigh, cb3.dpBracketBonus AS dpBracketBonus, gearScore, userClass_gearScore.dateCreated, gearLabel, isCurrent, ccb1.apBracketLow AS nextApBracketLow, ccb1.apBracketHigh AS nextApBracketHigh, ccb1.apBracketBonus AS nextApBracketBonus, ccb2.apBracketLow AS nextAapBracketLow, ccb2.apBracketHigh AS nextAapBracketHigh, ccb2.apBracketBonus AS nextAapBracketBonus, ccb3.dpBracketLow AS nextDpBracketLow, ccb3.dpBracketHigh AS nextDpBracketHigh, ccb3.dpBracketBonus AS nextDpBracketBonus, uc.FK_gearScoreId AS userClassActiveGearScoreId FROM userClass_gearScore INNER JOIN enum_combatBrackets AS cb1 ON userClass_gearScore.ap >= cb1.apBracketLow AND userClass_gearScore.ap <= cb1.apBracketHigh INNER JOIN enum_combatBrackets AS cb2 ON userClass_gearScore.aap >= cb2.apBracketLow AND userClass_gearScore.aap <= cb2.apBracketHigh INNER JOIN enum_combatBrackets AS cb3 ON userClass_gearScore.dp >= cb3.dpBracketLow AND userClass_gearScore.dp <= cb3.dpBracketHigh LEFT JOIN enum_combatBrackets AS ccb1 ON cb1.ROWID = ccb1.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb2 ON cb2.ROWID = ccb2.ROWID-1 LEFT JOIN enum_combatBrackets AS ccb3 ON cb3.ROWID = ccb3.ROWID-1 LEFT JOIN userClass_classes AS uc ON uc.classId == userClass_gearScore.FK_classId ORDER BY gearScoreId DESC LIMIT 1`;
    const values = { };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new GearContext().fromRow(row);
    });
  }

  public async insert(gear: GearViewModel): Promise<GearEntity> {
    const sql = `INSERT OR REPLACE INTO userClass_gearScore (FK_combatSettingsId, gearScoreBuildId, ap, aap, dp, gearScore, dateCreated, gearLabel, isCurrent) VALUES (1, $gearScoreBuildId, $ap, $aap, $dp, $gearScore, $dateCreated, $gearLabel, $isCurrent);`;
    const values = { $gearScoreBuildId: gear.gearScoreBuildId, $ap: gear.ap, $aap: gear.aap, $dp: gear.dp, $gearScore: new Calculations().calcGearScore(gear), $dateCreated: new Calculations().calcCurrentDate(), $gearLabel: gear.gearLabel, $isCurrent: true };

    TheDb.insert(sql, values).then((result) => {});
    return this.getMostRecent();
  }

  public async insertWithUserClassId(gear: GearViewModel, userClassId: number): Promise<GearEntity> {
    const sql = `INSERT OR REPLACE INTO userClass_gearScore (FK_combatSettingsId, FK_classId, gearScoreBuildId, ap, aap, dp, gearScore, dateCreated, gearLabel, isCurrent) VALUES (1, $userClassId, $gearScoreBuildId, $ap, $aap, $dp, $gearScore, $dateCreated, $gearLabel, $isCurrent);`;
    const values = { $userClassId: userClassId, $gearScoreBuildId: gear.gearScoreBuildId, $ap: gear.ap, $aap: gear.aap, $dp: gear.dp, $gearScore: new Calculations().calcGearScore(gear), $dateCreated: new Calculations().calcCurrentDate(), $gearLabel: gear.gearLabel, $isCurrent: true };

    TheDb.insert(sql, values).then((result) => {});
    return this.getMostRecent();
  }

  public async updateClassId(gearScoreId: number, classId: number): Promise<GearEntity> {
    const sql = `UPDATE userClass_gearScore SET FK_classId = $classId WHERE gearScoreId == $gearScoreId`;
    const values = { $gearScoreId: gearScoreId, $classId: classId};

    TheDb.update(sql, values).then((result) => {});
    return this.getMostRecent();
  }

  public async updateCombatGearCurrentState(userClassId: number, gearScoreBuildId: number): Promise<void> {
    const sql = `UPDATE userClass_gearScore SET isCurrent = 0 WHERE FK_classId == $userClassId AND gearScoreBuildId == $gearScoreBuildId`;
    const values = { $userClassId: userClassId, $gearScoreBuildId: gearScoreBuildId };

    TheDb.update(sql, values).then((result) => {});
    return;
  }

  public async updateGear(combatGear: GearViewModel): Promise<void> {
    const sql = `UPDATE userClass_gearScore SET ap = $ap, aap = $aap, dp = $dp WHERE FK_classId == $userClassId`;
    const values = { $gearScoreId: combatGear.gearScoreId, $ap: combatGear.ap, $aap: combatGear.aap, $dp: combatGear.dp };

    TheDb.update(sql, values).then((result) => {});
    return;
  }

  public async getNextAvailableBuildId(userClassId: number): Promise<number> {
    const sql = `SELECT (MAX(gearScoreBuildId) + 1) AS gearScoreBuildId FROM userClass_gearScore WHERE FK_classId == $userClassId`;
    const values = { $userClassId: userClassId };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return row.gearScoreBuildId as number;
    });
  }

  public async getExistingBuildId(combatGear: GearViewModel, userClassId: number): Promise<number> {
    const sql = `SELECT gearScoreBuildId FROM userClass_gearScore WHERE FK_classId == $userClassId AND gearLabel == $gearLabel GROUP BY gearScoreBuildId`;
    const values = { $userClassId: userClassId, $gearLabel: combatGear.gearLabel };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return row.gearScoreBuildId as number;
    });
  }

  private fromRow(row: GearEntity): GearEntity {
    this.gearScoreId = row['gearScoreId'];
    this.gearScoreBuildId = row['gearScoreBuildId'];
    this.ap = row['ap'];
    this.apBracketLow = row['apBracketLow'];
    this.apBracketHigh = row['apBracketHigh'];
    this.apBracketBonus = row['apBracketBonus'];
    this.aap = row['aap'];
    this.aapBracketLow = row['aapBracketLow'];
    this.aapBracketHigh = row['aapBracketHigh'];
    this.aapBracketBonus = row['apBracketBonus'];
    this.dp = row['dp'];
    this.dpBracketLow = row['dpBracketLow'];
    this.dpBracketHigh = row['dpBracketHigh'];
    this.dpBracketBonus = row['dpBracketBonus'];
    this.gearScore = row['gearScore'];
    this.gearLabel = row['gearLabel'];
    this.dateCreated = row['dateCreated'];
    if(!!row['isCurrent'])
      this.isCurrent = true;
    this.nextApBracketLow = row['nextApBracketLow'];
    this.nextApBracketHigh = row['nextApBracketHigh'];
    this.nextApBracketBonus = row['nextApBracketBonus'];
    this.nextAapBracketLow = row['nextAapBracketLow'];
    this.nextAapBracketHigh = row['nextAapBracketHigh'];
    this.nextAapBracketBonus = row['nextAapBracketBonus'];
    this.nextDpBracketLow = row['nextDpBracketLow'];
    this.nextDpBracketHigh = row['nextDpBracketHigh'];
    this.nextDpBracketBonus = row['nextDpBracketBonus'];
    if(!!row['userClassActiveGearScoreId']) {
      if(row['userClassActiveGearScoreId'] === row['gearScoreId'])
        this.isActive = true;
    }
      
    return this;
  }
}

export class CombatTypesEnumContext {
  public combatTypeId: number = 1;
  public combatTypeName: string = "-";
  public combatTypeCount: number = 0;

  public getAll(): Promise<Array<CombatTypesEnumEntity>> {
    const sql = `SELECT * FROM enum_combatType WHERE combatTypeId != 1`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<CombatTypesEnumEntity> = new Array<CombatTypesEnumEntity>();
      for (const row of rows) {
        const item = new CombatTypesEnumContext().fromRow(row);
        nm.push(item);
      }
      return nm;
    });
  }

  public getCombatTypeCount() {
    const sql = `SELECT enum_combatType.combatTypeId, enum_combatType.combatTypeName, COUNT(enum_combatType.combatTypeId) AS combatTypeCount FROM combat_grinding INNER JOIN enum_combatType ON enum_combatType.combatTypeId = combat_grinding.FK_combatTypeId WHERE enum_combatType.combatTypeId != 1 GROUP BY enum_combatType.combatTypeId ORDER BY combatTypeCount DESC, enum_combatType.combatTypeId LIMIT 3`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<CombatTypesEnumEntity> = new Array<CombatTypesEnumEntity>();
      for (const row of rows) {
          const item = new CombatTypesEnumContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public getCombatTypeCountViaLocation(locationId: number) {
    const sql = `SELECT enum_combatType.combatTypeId, enum_combatType.combatTypeName, COUNT(enum_combatType.combatTypeId) AS combatTypeCount FROM combat_grinding INNER JOIN enum_combatType ON enum_combatType.combatTypeId = combat_grinding.FK_combatTypeId WHERE enum_combatType.combatTypeId != 1 AND GROUP BY enum_combatType.combatTypeId ORDER BY combatTypeCount DESC, enum_combatType.combatTypeId LIMIT 3`;
    const values = { $locationId: locationId };

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<CombatTypesEnumEntity> = new Array<CombatTypesEnumEntity>();
      for (const row of rows) {
          const item = new CombatTypesEnumContext().fromRow(row);
          nm.push(item);
      }
      return nm;
    });
  }

  public getNewEntryCombatTypes(): Promise<Array<CombatTypesEnumEntity>> {
    const sql = `SELECT * FROM enum_combatType WHERE combatTypeId != 1 AND combatTypeId != 5`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<CombatTypesEnumEntity> = new Array<CombatTypesEnumEntity>();
      for (const row of rows) {
        const item = new CombatTypesEnumContext().fromRow(row);
        nm.push(item);
      }
      return nm;
    });
  }

   public async get(combatTypeName: string): Promise<CombatTypesEnumEntity> {
    const sql = `SELECT * FROM enum_combatType WHERE enum_combatType.combatTypeName = $combatTypeName`;
    const values = { $combatTypeName: combatTypeName };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row) 
        return new CombatTypesEnumContext().fromRow(row);
    });
  }

  public async getViaUserClassId(userClassId: number): Promise<CombatTypesEnumEntity> {
    const sql = `SELECT enum_combatType.combatTypeId, enum_combatType.combatTypeName FROM userClass_classes INNER JOIN enum_combatType ON enum_combatType.combatTypeId = userClass_classes.FK_primaryCombatTypeId WHERE userClass_classes.classId = $userClassId`;
    const values = { $userClassId: userClassId };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row) 
        return new CombatTypesEnumContext().fromRow(row);
    });
  }

  public async updateCombatType(combatType: CombatTypesEnumViewModel, userClassId: number): Promise<void> {
    const sql = `UPDATE userClass_classes SET FK_primaryCombatTypeId = $combatTypeId WHERE classId == $userClassId`;
    const values = { $combatTypeId: combatType.combatTypeId, $userClassId: userClassId};

    TheDb.update(sql, values).then((result) => {});
    return;
  }

  private fromRow(row: CombatTypesEnumEntity): CombatTypesEnumEntity {
    this.combatTypeId = row['combatTypeId'];
    this.combatTypeName = row['combatTypeName'];
    this.combatTypeCount = row['combatTypeCount'];
  
    return this;
  }
}

export class GearBracketContext {
  public bracketId: number = 0;
  public userClassId: number = 0;
  public bracketLow: number = 0;
  public bracketHigh: number = 0;
  public bracketBonus: number = 0;
  public description: string = "";

  public getAll(): Promise<Array<GearBracketsEntity>> {
    const sql = `SELECT combatBracketsId, userClass_gearScore.FK_classId AS userClassId, apBracketLow AS bracketLow, apBracketHigh AS bracketHigh, apBracketBonus AS bracketBonus, 'AP' AS description FROM enum_combatBrackets INNER JOIN userClass_gearScore WHERE userClass_gearScore.ap >= enum_combatBrackets.apBracketLow AND userClass_gearScore.ap <= enum_combatBrackets.apBracketHigh UNION SELECT combatBracketsId, userClass_gearScore.FK_classId, apBracketLow, apBracketHigh, apBracketBonus, 'AAP' FROM enum_combatBrackets INNER JOIN userClass_gearScore WHERE userClass_gearScore.aap >= enum_combatBrackets.apBracketLow AND userClass_gearScore.aap <= enum_combatBrackets.apBracketHigh UNION SELECT combatBracketsId, userClass_gearScore.FK_classId, dpBracketLow, dpBracketHigh, dpBracketBonus, 'DP' FROM enum_combatBrackets INNER JOIN userClass_gearScore WHERE userClass_gearScore.dp >= enum_combatBrackets.dpBracketLow AND userClass_gearScore.dp <= enum_combatBrackets.dpBracketHigh`;
    const values = {};

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<GearBracketsEntity> = new Array<GearBracketsEntity>();
      for (const row of rows) {
        const item = new GearBracketContext().fromRow(row);
        nm.push(item);
      }
      return nm;
    });
  }

  public async get(userClassId: number): Promise<Array<GearBracketsEntity>> {
    const sql = `SELECT combatBracketsId, userClass_gearScore.FK_classId AS userClassId, apBracketLow AS bracketLow, apBracketHigh AS bracketHigh, apBracketBonus AS bracketBonus, 'AP' AS description FROM enum_combatBrackets INNER JOIN userClass_gearScore WHERE userClass_gearScore.ap >= enum_combatBrackets.apBracketLow AND userClass_gearScore.ap <= enum_combatBrackets.apBracketHigh AND userClass_gearScore.FK_classId = $FK_classId UNION SELECT combatBracketsId, userClass_gearScore.FK_classId, apBracketLow, apBracketHigh, apBracketBonus, 'AAP' FROM enum_combatBrackets INNER JOIN userClass_gearScore WHERE userClass_gearScore.aap >= enum_combatBrackets.apBracketLow AND userClass_gearScore.aap <= enum_combatBrackets.apBracketHigh AND userClass_gearScore.FK_classId = $FK_classId UNION SELECT combatBracketsId, userClass_gearScore.FK_classId, dpBracketLow, dpBracketHigh, dpBracketBonus, 'DP' FROM enum_combatBrackets INNER JOIN userClass_gearScore WHERE userClass_gearScore.dp >= enum_combatBrackets.dpBracketLow AND userClass_gearScore.dp <= enum_combatBrackets.dpBracketHigh AND userClass_gearScore.FK_classId = $FK_classId`;
    const values = { $FK_classId: userClassId };

    return TheDb.selectAll(sql, values).then((rows: any) => {
      const nm: Array<GearBracketsEntity> = new Array<GearBracketsEntity>();
      for (const row of rows) {
        const item = new GearBracketContext().fromRow(row);
        nm.push(item);
      }
      return nm;
    });
  }

  private fromRow(row: GearBracketsEntity): GearBracketsEntity {
    this.bracketId = row['bracketId'];
    this.userClassId = row['userClassId'];
    this.bracketLow = row['bracketLow'];
    this.bracketHigh = row['bracketHigh'];
    this.bracketBonus = row['bracketBonus'];
    this.description = row['description'];
  
    return this;
  }
}