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
	navMinimised DEFAULT 0
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

-- Post Publish Script

-- Native Users
INSERT INTO security_user (userName, FK_roleId) VALUES ('Commander386', 2);
INSERT INTO security_settings (FK_appIdleSecsId, FK_themeId, FK_userId, FK_combatSettingsId, navMinimised) VALUES (2, 1, 1, 1, 0);

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

-- enum_theme