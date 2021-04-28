import { TheDb } from '../thedb';
import { Calculations } from '../../shared/calc/calculations';
import { GearViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassEntity, ClassNamesEnumEntity, ClassRoleEnumEntity, GearEntity, CombatTypesEnumEntity } from '../../shared/entities/userClassEntities';

export class UserClassContext {
  public classId: number = 0;
  public FK_gearScoreId: number = 0;
  public classNameId: number = 0;
  public className: string = "";
  public classDescription: string = "";
  public classRoleId: number = 0;
  public classRole: string = "";
  public combatTypeId: number = 0;
  public combatTypeName: string = "";
  public dateCreated: string = "";
  public ap: number = 0;
  public aap: number = 0;
  public dp: number = 0;
  public gearScore: number = 0;

  public async getAll(): Promise<Array<UserClassEntity>> {
    const sql = `SELECT userClass_classes.classId, userClass_classes.FK_gearScoreId, enum_class.className as className, enum_class.classId as classNameId, (className || ' (' || cast(userClass_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleId as classRoleId, enum_classRole.roleDescription as classRole, enum_combatType.combatTypeId, enum_combatType.combatTypeName, userClass_classes.dateCreated, userClass_gearScore.ap, userClass_gearScore.aap, userClass_gearScore.dp, userClass_gearScore.gearScore FROM userClass_classes INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId INNER JOIN userClass_gearScore ON userClass_gearScore.gearScoreId = userClass_classes.FK_gearScoreId INNER JOIN enum_classRole ON enum_classRole.roleId = userClass_classes.FK_classRoleId INNER JOIN enum_combatType ON enum_combatType.combatTypeId = userClass_classes.FK_primaryCombatTypeId WHERE userClass_classes.FK_combatSettingsId = 1`;
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
    const sql = `SELECT userClass_classes.classId, userClass_classes.FK_gearScoreId, enum_class.className as className, enum_class.classId as classNameId, (className || ' (' || cast(userClass_gearScore.gearScore as text) || ' GS)') AS classDescription, enum_classRole.roleId as classRoleId, enum_classRole.roleDescription as classRole, enum_combatType.combatTypeId, enum_combatType.combatTypeName, userClass_classes.dateCreated, userClass_gearScore.ap, userClass_gearScore.aap, userClass_gearScore.dp, userClass_gearScore.gearScore FROM userClass_classes INNER JOIN enum_class ON enum_class.classId = userClass_classes.FK_classNameId INNER JOIN userClass_gearScore ON userClass_gearScore.gearScoreId = userClass_classes.FK_gearScoreId INNER JOIN enum_classRole ON enum_classRole.roleId = userClass_classes.FK_classRoleId INNER JOIN enum_combatType ON enum_combatType.combatTypeId = userClass_classes.FK_primaryCombatTypeId WHERE userClass_classes.FK_combatSettingsId = 1 ORDER BY gearScoreId DESC LIMIT 1`;
    const values = { };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new UserClassContext().fromRow(row);
    });
  }

  public async insert(userClass: UserClassEntity): Promise<void> {
    const sql = `INSERT OR REPLACE INTO userClass_classes (FK_combatSettingsId, FK_classNameId, FK_classRoleId, FK_gearScoreId, FK_primaryCombatTypeId, dateCreated) VALUES (1, $FK_classNameId, $FK_classRoleId, $FK_gearScoreId, $FK_primaryCombatTypeId, $dateCreated);`;
    const values = { $FK_classNameId: userClass.classNameId, $FK_classRoleId: userClass.classRoleId, $FK_gearScoreId: userClass.FK_gearScoreId, $FK_primaryCombatTypeId: userClass.combatTypeId, $dateCreated: userClass.dateCreated };

    return TheDb.insert(sql, values).then((result) => {});
  }

  private fromRow(row: UserClassEntity): UserClassEntity {
    this.classId = row['classId'];
    this.FK_gearScoreId = row['FK_gearScoreId'];
    this.classNameId = row['classNameId'];
    this.className = row['className'];
    this.classRoleId = row['classRoleId'];
    this.classRole = row['classRole'];
    this.combatTypeId = row['combatTypeId'];
    this.combatTypeName = row['combatTypeName'];
    this.dateCreated = row['dateCreated'];
    this.classDescription = row['classDescription'];
    this.ap = row['ap'];
    this.aap = row['aap'];
    this.dp = row['dp'];
    this.gearScore = row['gearScore'];

    return this;
  }
}

export class ClassNamesEnumContext {
  public classId: number = 0;
  public className: string = "";

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

  private fromRow(row: ClassRoleEnumEntity): ClassRoleEnumEntity {
    this.roleId = row['roleId'];
    this.roleDescription = row['roleDescription'];
  
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

  public async get(gearScoreId: number): Promise<GearEntity> {
    const sql = `SELECT gearScoreId, ap, aap, dp, gearScore, dateCreated FROM userClass_gearScore WHERE userClass_gearScore.gearScoreId = $gearScoreId`;
    const values = { $gearScoreId: gearScoreId };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new GearContext().fromRow(row);
    });
  }

  public async getViaClassId(classId: number): Promise<GearEntity> {
    const sql = `SELECT gearScoreId, ap, aap, dp, gearScore, dateCreated FROM userClass_gearScore WHERE userClass_gearScore.FK_classId = $classId`;
    const values = { $classId: classId };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new GearContext().fromRow(row);
    });
  }

  public async getMostRecent(): Promise<GearEntity> {
    const sql = `SELECT gearScoreId, ap, aap, dp, gearScore, dateCreated FROM userClass_gearScore ORDER BY gearScoreId DESC LIMIT 1`;
    const values = { };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row)
        return new GearContext().fromRow(row);
    });
  }

  public async insert(gear: GearViewModel): Promise<void> {
    const sql = `INSERT OR REPLACE INTO userClass_gearScore (FK_combatSettingsId, ap, aap, dp, gearScore, dateCreated) VALUES (1, $ap, $aap, $dp, $gearScore, $dateCreated);`;
    const values = { $ap: gear.ap, $aap: gear.aap, $dp: gear.dp, $gearScore: new Calculations().calcGearScore(gear), $dateCreated: new Calculations().calcCurrentDate() };

    return TheDb.insert(sql, values).then((result) => {});
  }

  public async updateClassId(gearScoreId: number, classId: number): Promise<void> {
    const sql = `UPDATE userClass_gearScore SET FK_classId = $classId WHERE gearScoreId = $gearScoreId`;
    const values = { $gearScoreId: gearScoreId, $classId: classId};

    return TheDb.update(sql, values).then((result) => {});
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

export class CombatTypesEnumContext {
  public combatTypeId: number = 1;
  public combatTypeName: string = "-";

  // GET Combat Type Enums
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

   // Get Single Combat Type Enum
   public async get(combatTypeName: string): Promise<CombatTypesEnumEntity> {
    const sql = `SELECT * FROM enum_combatType WHERE enum_combatType.combatTypeName = $combatTypeName`;
    const values = { $combatTypeName: combatTypeName };

    return TheDb.selectOne(sql, values).then((row: any) => {
      if(row) 
        return new CombatTypesEnumContext().fromRow(row);
    });
  }

  private fromRow(row: CombatTypesEnumEntity): CombatTypesEnumEntity {
    this.combatTypeId = row['combatTypeId'];
    this.combatTypeName = row['combatTypeName'];
  
    return this;
  }
}