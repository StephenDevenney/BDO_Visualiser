import { TheDb } from '../thedb';
import { CombatSettingsEntity } from 'src/server/shared/entities/combatEntities';

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
                throw new Error('Failed Get, CombatSettings.');
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
    this.hasDefaultCombatHeaders = row['hasDefaultCombatHeaders'];
    this.navMinimised = row['navMinimised'];
    return this;
  }
}

  // GET CombatSettings
  export class CombatTableHeadersContext {
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
                  return new CombatTableHeadersContext().fromRow(row);
              } else {
                  throw new Error('Failed Get, CombatSettings.');
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
      this.hasDefaultCombatHeaders = row['hasDefaultCombatHeaders'];
      this.navMinimised = row['navMinimised'];
      return this;
    }
  }