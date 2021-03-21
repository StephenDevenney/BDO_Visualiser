-- Publish Script

-- Security
CREATE TABLE security_settings (
	settingsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_appIdleSecsId INTEGER NOT NULL DEFAULT 2,
	FK_themeId INTEGER NOT NULL DEFAULT 1,
	FK_userId INTEGER DEFAULT 0,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	navMinimised DEFAULT 0
);

CREATE TABLE security_user (
	userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	userName TEXT NOT NULL,
	FK_roleId INTEGER DEFAULT 1
);

CREATE TABLE security_navMenu (
	navMenuId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	navName TEXT NOT NULL,
	navTitle TEXT,
	navRoute TEXT
);

CREATE TABLE security_navIcon (
	navIconId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	navMenuId INTEGER NOT NULL,
	iconPath TEXT
);

CREATE TABLE security_navRole (
	navRoleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_navMenuId INTEGER NOT NULL DEFAULT 0,
	FK_roleId INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE security_navSubMenu (
	navSubMenuId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	navName INTEGER NOT NULL DEFAULT 0,
	navTitle INTEGER NOT NULL DEFAULT 0,
	navRoute TEXT NOT NULL DEFAULT 0,
	FK_navRoleId INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE security_navSubRole (
	navSubRoleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_navSubMenuId INTEGER NOT NULL DEFAULT 0,
	FK_roleId INTEGER NOT NULL DEFAULT 0
);

-- Combat
CREATE TABLE combat_settings (
	combatSettingsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_currentGearScoreId INTEGER DEFAULT 0,
	FK_redBattleFieldId	INTEGER DEFAULT 0
);

CREATE TABLE combat_gearScore (
	gearScoreId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	ap INTEGER DEFAULT 0,
	aap INTEGER DEFAULT 0,
	dp INTEGER DEFAULT 0,
	gearScore INTEGER DEFAULT 0,
	date TEXT NOT NULL
);

CREATE TABLE combat_grinding (
	grindingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	trashLootAmount INTEGER DEFAULT 0,
	date TEXT NOT NULL,
	FK_timeId INTEGER DEFAULT 4,
	FK_classId INTEGER DEFAULT 0,
	FK_locationId INTEGER DEFAULT 0,
	FK_serverId	INTEGER DEFAULT 0,
	FK_combatTypeId INTEGER DEFAULT 0,
	FK_gearScoreId INTEGER DEFAULT 0,
	afuaruSpawns INTEGER DEFAULT 0
);

CREATE TABLE combat_treasureItems (
	treasureItemId INTEGER PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	huntingTime	INTEGER DEFAULT 0,
	date TEXT NOT NULL,
	FK_treasureItemId INTEGER DEFAULT 0,
	FK_dropLocationId INTEGER DEFAULT 0,
	FK_serverId	INTEGER DEFAULT 0
);

CREATE TABLE combat_rbf (
	redBattleFieldId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	wins INTEGER DEFAULT 0,
	loses INTEGER DEFAULT 0,
	avgScore INTEGER DEFAULT 0
);

CREATE TABLE combat_favLocations (
	favLocationId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	FK_locationId INTEGER DEFAULT 0
);

CREATE TABLE combat_classes (
	classId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId	INTEGER DEFAULT 0,
	FK_classNameId INTEGER DEFAULT 0,
	FK_classRoleId INTEGER DEFAULT 0
);

CREATE TABLE combat_activeBuffs (
	activeBuffsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_grindingId INTEGER DEFAULT 0,
	kamaBlessingActive INTEGER DEFAULT 0,
	lootScrollActive INTEGER DEFAULT 0,
	lootScrollAdvActive INTEGER DEFAULT 0
);

CREATE TABLE combat_columnDefaults (
	columnDefaultsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FK_combatSettingsId INTEGER DEFAULT 0,
	FK_headingId INTEGER DEFAULT 0,
	isActive INTEGER DEFAULT 0
);

-- Enums
CREATE TABLE enum_locations (
	locationId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	locationName TEXT,
	FK_territoryId INTEGER
);

CREATE TABLE enum_time (
	timeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	timeAmount INTEGER
);

CREATE TABLE enum_roles (
	roleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	roleName TEXT
);

CREATE TABLE enum_theme (
	themeId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	themeName TEXT,
	className TEXT
);

CREATE TABLE enum_appIdleSecs (
	appIdleSecsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	idleTime INTEGER,
	description	TEXT
);

CREATE TABLE enum_server (
	serverId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	serverName TEXT,
	serverNumber INTEGER
);

CREATE TABLE enum_serverRegion (
	serverRegionId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	regionName TEXT
);

CREATE TABLE enum_territory (
	territoryId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	territoryName TEXT
);

CREATE TABLE enum_class (
	classId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	className TEXT
);

CREATE TABLE enum_combatType (
	combatTypeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	combatTypeName TEXT
);

CREATE TABLE enum_classRole (
	roleId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	roleDescription TEXT
);

CREATE TABLE enum_combatBrackets (
	combatBracketsId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	apBracket TEXT,
	apBracketBonus INTEGER,
	dpBracket TEXT,
	dpBracketBonus INTEGER
);

CREATE TABLE enum_treasureItems (
	treasureItemId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	itemName TEXT,
	FK_completedItemId,
	FK_location	INTEGER,
	droppedByMob TEXT
);

CREATE TABLE enum_treasureItemCompleted (
	treasureItemId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	itemName TEXT
);

CREATE TABLE enum_combatTableHeadings (
	headingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	field TEXT,
	header TEXT
);

-- Post Publish Script

-- Native Users
INSERT INTO security_user (userName, FK_roleId) VALUES ('Commander386', 2);
INSERT INTO security_settings (FK_appIdleSecsId, FK_themeId, FK_userId, FK_combatSettingsId, navMinimised) VALUES (2, 1, 1, 1, 0);
INSERT INTO combat_settings (combatSettingsId, FK_currentGearScoreId, FK_redBattleFieldId) VALUES (1, 1, 1);
INSERT INTO combat_gearScore (gearScoreId, FK_combatSettingsId, date) VALUES(1, 1, '18-01-2021');
INSERT INTO combat_classes (classId, FK_combatSettingsId, FK_classNameId, FK_classRoleId) VALUES(1, 1, 17, 1);
INSERT INTO combat_classes (classId, FK_combatSettingsId, FK_classNameId, FK_classRoleId) VALUES(2, 1, 12, 3);

-- INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (1, 1, 1, 0);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (1, 1, 2, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (2, 1, 3, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (3, 1, 4, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (4, 1, 5, 0);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (5, 1, 6, 0);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (6, 1, 7, 1);
INSERT INTO combat_columnDefaults (columnDefaultsId, FK_combatSettingsId, FK_headingId, isActive) VALUES (7, 1, 8, 0);

-- Sample Combat Data - User 1 - Date Format: month-day-year
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5000, '01-12-2021', 4, 1, 13, 10, 1, 1, 2);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4500, '01-12-2021', 4, 1, 13, 12, 1, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4750, '01-11-2021', 4, 1, 3, 42, 2, 1, 0);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4800, '01-11-2021', 4, 1, 3, 30, 1, 1, 3);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5100, '01-11-2021', 4, 1, 12, 5, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4870, '01-11-2021', 4, 1, 4, 30, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4976, '01-10-2021', 4, 1, 12, 30, 1, 1, 0);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5436, '01-10-2021', 4, 2, 11, 30, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4326, '01-10-2021', 4, 2, 11, 30, 1, 1, 4);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5684, '01-10-2021', 2, 2, 15, 29, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 3212, '01-09-2021', 2, 2, 16, 5, 2, 1, 3);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5321, '01-09-2021', 4, 2, 16, 14, 1, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 2312, '01-08-2021', 4, 1, 12, 36, 2, 1, 4);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4123, '01-06-2021', 4, 1, 12, 37, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4321, '01-06-2021', 4, 2, 15, 37, 2, 1, 3);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 3443, '01-06-2021', 4, 1, 4, 37, 1, 1, 0);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 3243, '12-24-2020', 2, 2, 15, 37, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 3453, '12-24-2020', 2, 2, 12, 30, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 3453, '12-24-2020', 4, 2, 18, 5, 1, 1, 0);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4564, '12-24-2020', 4, 2, 18, 5, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4655, '12-24-2020', 4, 1, 14, 6, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5545, '12-23-2020', 4, 1, 14, 5, 1, 1, 0);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4563, '12-23-2020', 4, 2, 16, 5, 2, 1, 2);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5464, '12-23-2020', 2, 2, 16, 30, 2, 1, 4);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4456, '12-22-2020', 2, 1, 9, 5, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4563, '12-21-2020', 4, 1, 9, 17, 1, 1, 5);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5456, '12-20-2020', 4, 2, 10, 5, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4566, '12-19-2020', 4, 2, 10, 22, 2, 1, 2);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 4345, '12-17-2020', 4, 1, 5, 30, 2, 1, 1);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 5654, '12-17-2020', 4, 1, 5, 25, 2, 1, 0);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 3546, '10-15-2019', 4, 1, 3, 19, 2, 1, 0);
-- INSERT INTO combat_grinding (FK_combatSettingsId, trashLootAmount, date, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, afuaruSpawns) VALUES(1, 3867, '10-15-2019', 4, 1, 1, 19, 2, 1, 0);

-- security_navMenu
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Home', 'Overview', 'home');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Combat', 'Combat Stats Visualised', 'combat');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Life', 'Life Stats Visualised', 'life');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Map', 'Map Overlay', 'map');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Fail Stacks', 'Fail Stacks Tracker', 'fail-stacks');
INSERT INTO security_navMenu (navName, navTitle, navRoute) VALUES ('Scrolls', 'Track your scrolls', 'scrolls');

-- security_navIcon

-- security_navRole
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (1, 1); -- Home - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (1, 2); -- Home - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (2, 1); -- Combat - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (2, 2); -- Combat - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (3, 1); -- Life - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (3, 2); -- Life - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (4, 1); -- Map - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (4, 2); -- Map - admin
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (5, 1); -- FailStacks - user
INSERT INTO security_navRole (FK_navMenuId, FK_roleId) VALUES (5, 2); -- FailStacks - admin

-- security_navSubMenu

-- security_navSubRole

-- enum_time
INSERT INTO enum_time (timeAmount) VALUES (15);
INSERT INTO enum_time (timeAmount) VALUES (30);
INSERT INTO enum_time (timeAmount) VALUES (45);
INSERT INTO enum_time (timeAmount) VALUES (60);

-- enum_roles
INSERT INTO enum_roles (roleName) VALUES ('user');
INSERT INTO enum_roles (roleName) VALUES ('admin');

-- enum_classRole
INSERT INTO enum_classRole (roleDescription) VALUES ('Main');
INSERT INTO enum_classRole (roleDescription) VALUES ('Tagged');
INSERT INTO enum_classRole (roleDescription) VALUES ('Secondary');
INSERT INTO enum_classRole (roleDescription) VALUES ('Life Skiller');

-- enum_class
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
INSERT INTO enum_class (className) VALUES ('Wizard');
INSERT INTO enum_class (className) VALUES ('Warrior');

-- enum_theme
INSERT INTO enum_theme (themeName, className) VALUES ('Default', 'standard-theme');
INSERT INTO enum_theme (themeName, className) VALUES ('Dark', 'dark-theme');

-- enum_server
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Arsha(PvP)', 0);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Balenos', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Balenos', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Balenos', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Balenos', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Balenos', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Balenos', 6);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Calpheon', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Calpheon', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Calpheon', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Calpheon', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Calpheon', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Calpheon', 6);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Kamasylvia', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Kamasylvia', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Kamasylvia', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Kamasylvia', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Kamasylvia', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Mediah', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Mediah', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Mediah', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Mediah', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Mediah', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Mediah', 6);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Olvia', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Olvia', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Olvia', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Olvia', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Olvia', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Valencia', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Valencia', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Valencia', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Valencia', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Valencia', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Valencia', 6);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Serendia', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Serendia', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Serendia', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Serendia', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Serendia', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Serendia', 6);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Velia', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Velia', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Velia', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Velia', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Velia', 5);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Velia', 6);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Season', 1);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Season', 2);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Season', 3);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Season', 4);
INSERT INTO enum_server (serverName, serverNumber) VALUES ('Season(PvP)', 0);

-- enum_serverRegion, may change after merge
INSERT INTO enum_serverRegion (regionName) VALUES ('EU');
INSERT INTO enum_serverRegion (regionName) VALUES ('NA');
INSERT INTO enum_serverRegion (regionName) VALUES ('SEA');

-- enum_territory
INSERT INTO enum_territory (territoryName) VALUES ('Balenos');
INSERT INTO enum_territory (territoryName) VALUES ('Calpheon');
INSERT INTO enum_territory (territoryName) VALUES ('Dreighan');
INSERT INTO enum_territory (territoryName) VALUES ('Kamasylvia');
INSERT INTO enum_territory (territoryName) VALUES ('Mediah');
INSERT INTO enum_territory (territoryName) VALUES ('O''dyllita');
INSERT INTO enum_territory (territoryName) VALUES ('Serendia');
INSERT INTO enum_territory (territoryName) VALUES ('Valenica');

-- enum_appIdleSecs
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (0, 'Off');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (1800, '30 Minutes');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (3600, '1 Hour');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (10800, '3 Hours');
INSERT INTO enum_appIdleSecs (idleTime, description) VALUES (21600, '6 Hours');

-- enum_locations
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Turos', 6);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Sycria', 1);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Hystria', 8);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Stars End', 2);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Forest Ronaros Area (Ronaros)', 4);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Manshaum Forest', 4);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Ash Forest', 4);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Abandoned Monastery', 2);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Aakman', 8);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Titium Valley (Fogans)', 8);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Desert Naga Temple (Nagas)', 8);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Roud Sulpher Mine', 8);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Pila Ku Jail', 8);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Sherekhan Necropolis', 3);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Blood Wolf Settlement', 3);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Navarn Steppe', 4);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Tshira Ruins', 3);
INSERT INTO enum_locations (locationName, FK_territoryId) VALUES ('Manshaum Forest', 4);

-- enum_combatType
INSERT INTO enum_combatType (combatTypeName) VALUES ('Awakening');
INSERT INTO enum_combatType (combatTypeName) VALUES ('Succession');
INSERT INTO enum_combatType (combatTypeName) VALUES ('Mainhand');

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
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('date', 'Date');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('locationName', 'Location');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('timeAmount', 'Time');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('trashLootAmount', 'Trash Loot');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('className', 'Class');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('serverName', 'Server');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('combatTypeName', 'Combat Type');
INSERT INTO enum_combatTableHeadings (field, header) VALUES ('afuaruSpawns', 'Afuaru Spawns');