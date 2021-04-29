-- Publish Script

-- Security
BEGIN TRANSACTION;
DROP TABLE IF EXISTS `security_user`;
CREATE TABLE IF NOT EXISTS security_user (
	userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	userName TEXT NOT NULL,
	FK_roleId INTEGER DEFAULT 1
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `security_settings`;
CREATE TABLE IF NOT EXISTS security_settings (
	settingsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_appIdleSecsId INTEGER NOT NULL DEFAULT 2,
	FK_themeId INTEGER NOT NULL DEFAULT 1,
	FK_userId INTEGER DEFAULT 0,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	navMinimised DEFAULT 0,
	previousPageId DEFAULT 1
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `security_navMenu`;
CREATE TABLE IF NOT EXISTS security_navMenu (
	navMenuId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	navName TEXT NOT NULL,
	navTitle TEXT,
	navRoute TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `security_navIcon`;
CREATE TABLE IF NOT EXISTS security_navIcon (
	navIconId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	navMenuId INTEGER NOT NULL,
	iconPath TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `security_navRole`;
CREATE TABLE IF NOT EXISTS security_navRole (
	navRoleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_navMenuId INTEGER NOT NULL DEFAULT 0,
	FK_roleId INTEGER NOT NULL DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `combat_settings`;
CREATE TABLE IF NOT EXISTS combat_settings (
	combatSettingsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_currentGearScoreId INTEGER DEFAULT 0,
	FK_redBattleFieldId	INTEGER DEFAULT 0,
	hasDefaultCombatHeaders INTEGER DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `combat_grinding`;
CREATE TABLE IF NOT EXISTS combat_grinding (
	grindingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	FK_classId INTEGER DEFAULT 0,
	FK_locationId INTEGER DEFAULT 0,
	FK_timeId INTEGER DEFAULT 1,
	FK_serverId	INTEGER DEFAULT 0,
	FK_combatTypeId INTEGER DEFAULT 0,
	FK_gearScoreId INTEGER DEFAULT 0,
	dateCreated TEXT NOT NULL,
	trashLootAmount INTEGER DEFAULT 0,
	afuaruSpawns INTEGER DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `combat_treasureItems`;
CREATE TABLE IF NOT EXISTS combat_treasureItems (
	treasureItemId INTEGER PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	huntingTime	INTEGER DEFAULT 0,
	date TEXT NOT NULL,
	FK_treasureItemId INTEGER DEFAULT 0,
	FK_dropLocationId INTEGER DEFAULT 0,
	FK_serverId	INTEGER DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `combat_rbf`;
CREATE TABLE IF NOT EXISTS combat_rbf (
	redBattleFieldId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	wins INTEGER DEFAULT 0,
	loses INTEGER DEFAULT 0,
	avgScore INTEGER DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `combat_favLocations`;
CREATE TABLE IF NOT EXISTS combat_favLocations (
	favLocationId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	FK_locationId INTEGER DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `combat_activeBuffs`;
CREATE TABLE IF NOT EXISTS combat_activeBuffs (
	activeBuffsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_grindingId INTEGER DEFAULT 0,
	kamaBlessingActive INTEGER DEFAULT 0,
	lootScrollActive INTEGER DEFAULT 0,
	lootScrollAdvActive INTEGER DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `combat_columnDefaults`;
CREATE TABLE IF NOT EXISTS combat_columnDefaults (
	columnDefaultsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId INTEGER DEFAULT 0,
	FK_headingId INTEGER DEFAULT 0,
	isActive INTEGER DEFAULT 0
);
COMMIT;

-- Enums
BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_locations`;
CREATE TABLE IF NOT EXISTS enum_locations (
	locationId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_territoryId INTEGER,
	locationName TEXT,
	recommendedLevel TEXT DEFAULT '',
	recommendedAP TEXT DEFAULT '',
	afuaruSpawnable INTEGER DEFAULT 0;
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_trashLootValue`;
CREATE TABLE IF NOT EXISTS enum_trashLootValue (
	locationId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_locationId INTEGER,
	trashLootName TEXT,
	trashLootValue INTEGER
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_time`;
CREATE TABLE IF NOT EXISTS enum_time (
	timeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	timeAmount INTEGER DEFAULT 1
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_roles`;
CREATE TABLE IF NOT EXISTS enum_roles (
	roleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	roleName TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_theme`;
CREATE TABLE IF NOT EXISTS enum_theme (
	themeId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	themeName TEXT,
	themeClassName TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_appIdleSecs`;
CREATE TABLE IF NOT EXISTS enum_appIdleSecs (
	appIdleSecsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	idleTime INTEGER,
	description	TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_server`;
CREATE TABLE IF NOT EXISTS enum_server (
	serverId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	serverName TEXT,
	isElviaRealm INTEGER DEFAULT 0
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_serverRegion`;
CREATE TABLE IF NOT EXISTS enum_serverRegion (
	serverRegionId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	regionName TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_territory`;
CREATE TABLE IF NOT EXISTS enum_territory (
	territoryId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	territoryName TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_class`;
CREATE TABLE IF NOT EXISTS enum_class (
	classId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	className TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_combatType`;
CREATE TABLE IF NOT EXISTS enum_combatType (
	combatTypeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	combatTypeName TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_classRole`;
CREATE TABLE IF NOT EXISTS enum_classRole (
	roleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	roleDescription TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_combatBrackets`;
CREATE TABLE IF NOT EXISTS enum_combatBrackets (
	combatBracketsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	apBracket TEXT,
	apBracketBonus INTEGER,
	dpBracket TEXT,
	dpBracketBonus INTEGER
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_treasureItems`;
CREATE TABLE IF NOT EXISTS enum_treasureItems (
	treasureItemId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	itemName TEXT,
	FK_completedItemId,
	FK_location	INTEGER,
	droppedByMob TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_treasureItemCompleted`;
CREATE TABLE IF NOT EXISTS enum_treasureItemCompleted (
	treasureItemId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	itemName TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `enum_combatTableHeadings`;
CREATE TABLE IF NOT EXISTS enum_combatTableHeadings (
	headingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	field TEXT,
	header TEXT
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `image_classPortraits`;
CREATE TABLE IF NOT EXISTS image_classPortraits (
	portraitId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_classNameId INTEGER DEFAULT 1,
	portraitJSON TEXT DEFAULT ''
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `userClass_classes`;
CREATE TABLE IF NOT EXISTS userClass_classes (
	classId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	FK_classNameId INTEGER DEFAULT 0,
	FK_classRoleId INTEGER DEFAULT 0,
	FK_gearScoreId INTEGER DEFAULT 0,
	FK_primaryCombatTypeId INTEGER DEFAULT 2,
	dateCreated TEXT NOT NULL
);
COMMIT;

BEGIN TRANSACTION;
DROP TABLE IF EXISTS `userClass_gearScore`;
CREATE TABLE IF NOT EXISTS userClass_gearScore (
	gearScoreId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	FK_classId INTEGER DEFAULT 0,
	ap INTEGER DEFAULT 0,
	aap INTEGER DEFAULT 0,
	dp INTEGER DEFAULT 0,
	gearScore INTEGER DEFAULT 0,
	dateCreated TEXT NOT NULL
);
COMMIT;

-- Post Publish Script

-- Native Users
INSERT INTO security_user (userName, FK_roleId) VALUES ('Commander386', 2);
INSERT INTO security_settings (FK_appIdleSecsId, FK_themeId, FK_userId, FK_combatSettingsId, navMinimised) VALUES (2, 1, 1, 1, 0);
INSERT INTO combat_settings (combatSettingsId, FK_currentGearScoreId, FK_redBattleFieldId) VALUES (1, 1, 1);

-- security_navMenu
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Home', 'Overview', 'home');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Combat', 'Combat Stats Visualised', 'combat');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Life', 'Life Stats Visualised', 'life');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Fail Stacks', 'Fail Stacks Tracker', 'fail-stacks');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Scrolls', 'Track Your Scrolls', 'scrolls');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Barter', 'Manage Your Bartering', 'barter');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Classes', 'Character Creation', 'user-classes');

-- security_navIcon

-- security_navRole
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (1, 1); -- Home - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (1, 2); -- Home - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (2, 1); -- Combat - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (2, 2); -- Combat - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (3, 1); -- Life - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (3, 2); -- Life - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (4, 1); -- Fail Stacks - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (4, 2); -- Fail Stacks - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (5, 1); -- Scrolls - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (5, 2); -- Scrolls - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (6, 1); -- Barter - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (6, 2); -- Barter - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (7, 1); -- UserClasses - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (7, 2); -- UserClasses - admin

-- Combat - ColumnDefaults
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (1, 1, 1, 0);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (2, 1, 2, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (3, 1, 3, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (4, 1, 4, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (5, 1, 5, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (6, 1, 6, 0);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (7, 1, 7, 0);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (8, 1, 8, 0);

-- enum_time
INSERT INTO enum_time (timeAmount) VALUES (60);
INSERT INTO enum_time (timeAmount) VALUES (45);
INSERT INTO enum_time (timeAmount) VALUES (30);
INSERT INTO enum_time (timeAmount) VALUES (15);

-- enum_roles
INSERT INTO enum_roles (roleName) VALUES ('user');
INSERT INTO enum_roles (roleName) VALUES ('admin');

-- enum_classRole
INSERT INTO enum_classRole (roleDescription) VALUES ('Main');
INSERT INTO enum_classRole (roleDescription) VALUES ('Tagged');
INSERT INTO enum_classRole (roleDescription) VALUES ('Secondary');
INSERT INTO enum_classRole (roleDescription) VALUES ('Life Skiller');
INSERT INTO enum_classRole (roleDescription) VALUES ('Alt');

-- enum_class
INSERT INTO enum_class (className) VALUES ('-');
INSERT INTO enum_class (className) VALUES ('Archer');
INSERT INTO enum_class (className) VALUES ('Beserker');
INSERT INTO enum_class (className) VALUES ('Dark Knight');
INSERT INTO enum_class (className) VALUES ('Guardian');
INSERT INTO enum_class (className) VALUES ('Hashashin');
INSERT INTO enum_class (className) VALUES ('Kunoichi');
INSERT INTO enum_class (className) VALUES ('Lahn');
INSERT INTO enum_class (className) VALUES ('Maehwa');
INSERT INTO enum_class (className) VALUES ('Musa');
INSERT INTO enum_class (className) VALUES ('Mystic');
INSERT INTO enum_class (className) VALUES ('Nova');
INSERT INTO enum_class (className) VALUES ('Ranger');
INSERT INTO enum_class (className) VALUES ('Sorceress');
INSERT INTO enum_class (className) VALUES ('Striker');
INSERT INTO enum_class (className) VALUES ('Shai');
INSERT INTO enum_class (className) VALUES ('Tamer');
INSERT INTO enum_class (className) VALUES ('Valkyrie');
INSERT INTO enum_class (className) VALUES ('Warrior');
INSERT INTO enum_class (className) VALUES ('Wizard');
INSERT INTO enum_class (className) VALUES ('Witch');

-- enum_theme
INSERT INTO enum_theme (themeName, themeClassName) VALUES ('Default', 'standard-theme');
INSERT INTO enum_theme (themeName, themeClassName) VALUES ('Dark', 'dark-theme');

-- enum_server
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('-', 0);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Arsha(PvP)', 1);
INSERT INTO enum_server (serverName) VALUES ('Balenos 1');
INSERT INTO enum_server (serverName) VALUES ('Balenos 2');
INSERT INTO enum_server (serverName) VALUES ('Balenos 3');
INSERT INTO enum_server (serverName) VALUES ('Balenos 4');
INSERT INTO enum_server (serverName) VALUES ('Balenos 5');
INSERT INTO enum_server (serverName) VALUES ('Balenos 6');
INSERT INTO enum_server (serverName) VALUES ('Calpheon 1');
INSERT INTO enum_server (serverName) VALUES ('Calpheon 2');
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Calpheon 3', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Calpheon 4', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Calpheon 5', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Calpheon 6', 1);
INSERT INTO enum_server (serverName) VALUES ('Kamasylvia 1');
INSERT INTO enum_server (serverName) VALUES ('Kamasylvia 2');
INSERT INTO enum_server (serverName) VALUES ('Kamasylvia 3');
INSERT INTO enum_server (serverName) VALUES ('Kamasylvia 4');
INSERT INTO enum_server (serverName) VALUES ('Kamasylvia 5');
INSERT INTO enum_server (serverName) VALUES ('Mediah 1');
INSERT INTO enum_server (serverName) VALUES ('Mediah 2');
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Mediah 3', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Mediah 4', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Mediah 5', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Mediah 6', 1);
INSERT INTO enum_server (serverName) VALUES ('New Olvia 1');
INSERT INTO enum_server (serverName) VALUES ('New Olvia 2');
INSERT INTO enum_server (serverName) VALUES ('New Olvia 3');
INSERT INTO enum_server (serverName) VALUES ('New Olvia 4');
INSERT INTO enum_server (serverName) VALUES ('New Olvia 5');
INSERT INTO enum_server (serverName) VALUES ('Season 1');
INSERT INTO enum_server (serverName) VALUES ('Season 2');
INSERT INTO enum_server (serverName) VALUES ('Season 3');
INSERT INTO enum_server (serverName) VALUES ('Season 4');
INSERT INTO enum_server (serverName) VALUES ('Season(PvP)');
INSERT INTO enum_server (serverName) VALUES ('Serendia 1');
INSERT INTO enum_server (serverName) VALUES ('Serendia 2');
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Serendia 3', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Serendia 4', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Serendia 5', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Serendia 6', 1);
INSERT INTO enum_server (serverName) VALUES ('Valencia 1');
INSERT INTO enum_server (serverName) VALUES ('Valencia 2');
INSERT INTO enum_server (serverName) VALUES ('Valencia 3');
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Valencia 4', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Valencia 5', 1);
INSERT INTO enum_server (serverName, isElviaRealm) VALUES ('Valencia 6', 1);
INSERT INTO enum_server (serverName) VALUES ('Velia 1');
INSERT INTO enum_server (serverName) VALUES ('Velia 2');
INSERT INTO enum_server (serverName) VALUES ('Velia 3');
INSERT INTO enum_server (serverName) VALUES ('Velia 4');
INSERT INTO enum_server (serverName) VALUES ('Velia 5');
INSERT INTO enum_server (serverName) VALUES ('Velia 6');

-- enum_serverRegion
INSERT INTO enum_serverRegion (regionName) VALUES ('-');
INSERT INTO enum_serverRegion (regionName) VALUES ('EU');
INSERT INTO enum_serverRegion (regionName) VALUES ('NA');
INSERT INTO enum_serverRegion (regionName) VALUES ('SEA');

-- enum_territory
INSERT INTO enum_territory (territoryName) VALUES ('-');
INSERT INTO enum_territory (territoryName) VALUES ('Balenos');
INSERT INTO enum_territory (territoryName) VALUES ('Calpheon');
INSERT INTO enum_territory (territoryName) VALUES ('Dreighan');
INSERT INTO enum_territory (territoryName) VALUES ('Kamasylvia');
INSERT INTO enum_territory (territoryName) VALUES ('Mediah');
INSERT INTO enum_territory (territoryName) VALUES ('O''dyllita');
INSERT INTO enum_territory (territoryName) VALUES ('Serendia');
INSERT INTO enum_territory (territoryName) VALUES ('Valencia');

-- enum_appIdleSecs
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (21600, '6 Hours');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (10800, '3 Hours');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (3600, '1 Hour');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (1800, '30 Minutes');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (0, 'Off');

-- enum_locations
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('-', 1);
-- Balenos
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Cron Castle', 2, '14-17');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Goblin', 2, '12-15');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Padix Island', 2, '270');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Pirate Island', 2, '55-56');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Protty Cave', 2, '170');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Sycraia Underwater Ruins', 2, '230');
-- Serendia
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Altar Imp', 8, '16-18');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Biraghi Den', 8, '24-27');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Bloody Monastery', 8, '23-26');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Castle Ruins', 8, '18-21');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Orc Camp', 8, '23-26');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Swamp Fogan', 8, '21-24');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Swamp Naga', 8, '19-22');
-- Calpheon
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Bree Tree Ruins', 3, '32-34');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Catfishman Camp', 3, '49-51');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Hexe Sanctuary', 3, '50-52');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Karanda Ridge', 3, '26-29');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Keplan Mine', 3, '35-38');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Khuruto', 3, '27-31');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Marni''s Lab', 3, '40-43');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Mask Owl''s Forest', 3, '34-37');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Primal Giant Post', 3, '42-45');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Refugee Camp', 3, '30-32');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Rhutum Outstation', 3, '48-50');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Star''s End', 3, '260');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Treant Forest', 3, '49-51');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Troll', 3, '39-42');
-- Mediah
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Abandoned Iron Mine', 6, '70-90');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Elric Shrine', 6, '95-150');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedLevel) VALUES ('Hasrah Ancient Ruins', 6, '55-56');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Helms Post', 6, '90-110');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Manes Hideout', 6, '80-100');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Sausan Garrison', 6, '100-180');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Shultz Guard', 6, '240');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Soldier''s Cemetery', 6, '100-180');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Wandering Rogue Den', 6, '80-100');
-- Valencia
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Bashim Base', 9, '100');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Basilisk Den', 9, '190');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Cadry', 9, '140');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Centaurus Herd', 9, '190');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Crescent Shrine', 9, '140');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Desert Naga Temple', 9, '100');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Gahaz Bandit Lair', 9, '140');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP, afuaruSpawnable) VALUES ('Pila Ku Jail', 9, '210', 1);
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP, afuaruSpawnable) VALUES ('Roud Sulfer Mine', 9, '210', 1);
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Titium Valley (Fogan)', 9, '100');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Waragon Nest', 9, '165');
-- Kamasylvia
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Ash Forest', 5, '300');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Fadus Habitat', 5, '120-190');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP, afuaruSpawnable) VALUES ('Forest Ronaros Area', 5, '240', 1);
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Gyfin Rhasia Temple', 5, '270');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Manshaum Forest', 5, '240');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Mirumok Ruins', 5, '240');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Navarn Steppe', 5, '210');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Polly''s Forest', 5, '160');
-- Dreighan
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP, afuaruSpawnable) VALUES ('Blood Wolf Settlement', 4, '190', 1);
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP, afuaruSpawnable) VALUES ('Sherekhan Necropolis', 4, '210', 1);
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP, afuaruSpawnable) VALUES ('Tshira Ruins', 4, '140', 1);
-- O'dyllita
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Crypt of Resting Thoughts', 7, '310');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Olun''s Valley', 7, '300');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Thornwood Forest', 7, '250');
INSERT INTO enum_locations (locationName, FK_territoryId, recommendedAP) VALUES ('Tunkuta (Turo''s)', 7, '270');

-- enum_trashLootValue
INSERT INTO enum_trashLootValue (FK_locationId, trashLootName, trashLootValue) VALUES (1, '-', 0);

-- enum_combatType
INSERT INTO enum_combatType (combatTypeName) VALUES ('-');
INSERT INTO enum_combatType (combatTypeName) VALUES ('Awakening');
INSERT INTO enum_combatType (combatTypeName) VALUES ('Succession');
INSERT INTO enum_combatType (combatTypeName) VALUES ('Mainhand');
INSERT INTO enum_combatType (combatTypeName) VALUES ('Mixed');

-- enum_combatBrackets
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('100 - 139', 5, '203 - 210', 1);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('140 - 169', 10, '211 - 217', 2);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('170 - 183', 15, '218 - 255', 3);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('184 - 208', 20, '226 - 232', 4);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('209 - 234', 30, '233 - 240', 5);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('235 - 244', 40, '241 - 247', 6);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('245 - 248', 48, '248 - 255', 7);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('249 - 252', 57, '256 - 262', 8);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('253 - 256', 69, '263 - 270', 9);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('257 - 260', 83, '271 - 277', 10);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('261 - 264', 101, '278 - 285', 11);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('269 - 272', 122, '286 - 292', 12);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('273 - 276', 137, '293 - 300', 13);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('277 - 280', 142, '301 - 307', 14);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('281 - 284', 148, '308 - 314', 15);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('285 - 288', 154, '315 - 321', 16);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('289 - 292', 160, '322 - 328', 17);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('293 - 296', 167, '329 - 334', 18);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('297 - 300', 174, '335 - 340', 19);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('301 - 304', 181, '341 - 346', 20);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('305 - 308', 188, '347 - 352', 21);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('309 - 315', 196, '353 - 358', 22);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('316 - 322', 200, '359 - 364', 23);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('323 - 329', 203, '365 - 370', 24);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('330 - 339', 205, '371 - 376', 25);
INSERT INTO enum_combatBrackets (apBracket, apBracketBonus, dpBracket, dpBracketBonus) VALUES ('340 +', 210, '377 - 382', 26);
INSERT INTO enum_combatBrackets (dpBracket, dpBracketBonus) VALUES ('383 - 388', 27);
INSERT INTO enum_combatBrackets (dpBracket, dpBracketBonus) VALUES ('389 - 394', 28);
INSERT INTO enum_combatBrackets (dpBracket, dpBracketBonus) VALUES ('395 - 400', 29);
INSERT INTO enum_combatBrackets (dpBracket, dpBracketBonus) VALUES ('401 +', 30);

-- enum_treasureItems
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Map of Unknown Piece', 1, 12, 'Lava Tukar');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Map of Unknown Piece', 1, 13, 'Iron Fist Warder');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Map of Unknown Piece', 1, 12, 'Lava Devourer');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Map of Unknown Piece', 1, 13, 'Sordid Deportee');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Lafi Bedmountain''s Upgraded Compass Parts', 2, 3, 'Vodkhan');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Lafi Bedmountain''s Upgraded Compass Parts', 2, 3, 'Elten, Tukar Balten');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Lafi Bedmountain''s Upgraded Compass Parts', 2, 9, 'Aakman Elite Guardian');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Sherekhan''s Pancacea', 3, 14, 'Garud, Belcadas, Lateh (Night), Nybrica (Night)');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Ron''s Tintinnabulum', 3, 5, 'Forest Ronaros Guardian, Forest Ronaros Catcher');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Ash Halfmoon Kagtunak', 3, 15, 'Kagtum Executioner, Kagtum Guard');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Valtarra''s Clairvoyance', 4, 16, 'Ferrica, Ferrina, Belladonna Elephant, Baby Belladonna Elephant');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Markthanan''s Gland', 4, 17, 'Leaf Keeper, Vine Keeper, Grove Keepers');
INSERT INTO enum_treasureItems (itemName, FK_completedItemId, FK_Location, droppedByMob) VALUES ('Narc''s Crimson Tear', 4, 18, 'Manshaum Shaman');

-- enum_treasureItemCompleted
INSERT INTO enum_treasureItemCompleted (itemName) VALUES ('Archaeologist''s Map');
INSERT INTO enum_treasureItemCompleted (itemName) VALUES ('Lafi Bedmountain''s Upgraded Compass');
INSERT INTO enum_treasureItemCompleted (itemName) VALUES ('Ornette’s Spirit Essence (Infinite HP potion)');
INSERT INTO enum_treasureItemCompleted (itemName) VALUES ('Odore’s Spirit Essence (Infinite MP/WP/EP/SP potion)');

-- enum_combatTableHeadings
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('dateCreated', 'Date');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('locationName', 'Location');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('timeAmount', 'Time');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('trashLootAmount', 'Trash Loot');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('className', 'Class');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('serverName', 'Server');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('combatTypeName', 'Combat Type');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('afuaruSpawns', 'Afuaru Spawns');