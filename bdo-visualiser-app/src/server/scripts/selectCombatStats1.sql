SELECT AVG(t1.trashLootAmount) AS trashLoot, AVG(t1.afuaruSpawns) AS afuaruSpawns, AVG(enum_time.timeAmount) AS timeAmount
FROM combat_grinding AS t1
INNER JOIN enum_time ON enum_time.timeId = t1.FK_timeId
UNION ALL
SELECT SUM(t2.trashLootAmount), SUM(t2.afuaruSpawns), SUM(enum_time.timeAmount)
FROM combat_grinding AS t2
INNER JOIN enum_time ON enum_time.timeId = t2.FK_timeId
WHERE t2.dateCreated == '2021-05-02'
UNION ALL
SELECT SUM(t3.trashLootAmount), SUM(t3.afuaruSpawns), SUM(enum_time.timeAmount)
FROM combat_grinding AS t3
INNER JOIN enum_time ON enum_time.timeId = t3.FK_timeId
WHERE t3.dateCreated BETWEEN '2021-05-01' AND '2021-05-02'