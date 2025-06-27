import { SQLiteDatabase } from "expo-sqlite";

export const getMatchesByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<Match[]> => {
  if (name === "") {
    return [];
  }

  const entriesDB: EntryDB[] = await db.getAllAsync(
    "SELECT * FROM entry WHERE name LIKE ?",
    [`%${name}%`]
  );

  if (entriesDB) {
    return entriesDB.map(({ name, img }) => {
      const base64Data = btoa(String.fromCharCode.apply(null, img));
      const uri = "data:image/png;base64," + base64Data;

      return {
        name,
        uri,
      };
    });
  }

  return [];
};

export const getEntryByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<Entry | undefined> => {
  const entryDB = await db.getFirstAsync<EntryDB>(
    `
      SELECT *
      FROM entry 
      WHERE name = ?
      `,
    [name]
  );

  if (entryDB) {
    const { no, name, category, height, weight, description, img } = entryDB;
    const base64Data = btoa(String.fromCharCode.apply(null, img));
    const uri = "data:image/png;base64," + base64Data;

    return {
      no,
      name,
      category,
      height,
      weight,
      description,
      uri,
    };
  }
};

export const getLocationsByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<{ Red: Match[]; Blue: Match[] } | undefined> => {
  const locationsDB = await db.getAllAsync<{
    name: string;
    version: Version;
    img: number[];
  }>(
    `
      SELECT name, version, img
      FROM name_catch
      JOIN area ON name_catch.area = area.name
      WHERE entry = ?;
      `,
    [name]
  );

  if (locationsDB) {
    const locations = locationsDB
      .map((locationDB) => {
        const { name, version, img } = locationDB;
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;
        return {
          name,
          version,
          uri,
        };
      })
      .reduce<{ Red: Area[]; Blue: Area[] }>(
        (acc, curr) => {
          const { name, version, uri } = curr;
          acc[version].push({
            name,
            uri,
          });
          return acc;
        },
        { Red: [], Blue: [] }
      );

    return locations;
  }
};

export const getConnectionsByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<Match[] | undefined> => {
  const connectionsDB = await db.getAllAsync<{ name: string; img: number[] }>(
    `
      SELECT name, img
      FROM entry
      WHERE name IN (
        SELECT base
        FROM name_evo
        WHERE evolution = (
          SELECT base FROM name_evo
          WHERE evolution = $name
        )
        UNION
        SELECT base
        FROM name_evo
        WHERE evolution = $name
        UNION
        SELECT $name
        UNION
        SELECT evolution
        FROM name_evo
        WHERE base = $name
        UNION
        SELECT evolution
        FROM name_evo
        WHERE base = (
          SELECT evolution
          FROM name_evo
          WHERE base = $name
        )
      );
      `,
    {
      $name: name,
    }
  );

  if (connectionsDB) {
    const connections = connectionsDB.map((connectionDB) => {
      const { name, img } = connectionDB;
      const base64Data = btoa(String.fromCharCode.apply(null, img));
      const uri = "data:image/png;base64," + base64Data;

      return {
        name,
        uri,
      };
    });

    return connections;
  }
};

export const getAreaByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<Area | undefined> => {
  const areaDB = await db.getFirstAsync<AreaDB>(
    `
      SELECT *
      FROM area 
      WHERE name = ?
      `,
    [name]
  );

  if (areaDB) {
    const { name, img } = areaDB;
    const base64Data = btoa(String.fromCharCode.apply(null, img));
    const uri = "data:image/png;base64," + base64Data;

    return {
      name,
      uri,
    };
  }
};

export const getCatchesByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<{ Red: Match[]; Blue: Match[] } | undefined> => {
  const catchesDB = await db.getAllAsync<{
    name: string;
    version: Version;
    img: number[];
  }>(
    `
      SELECT name, version, img
      FROM name_catch 
      JOIN entry ON name_catch.entry = entry.name 
      WHERE area = ?;
      `,
    [name]
  );

  if (catchesDB) {
    const catches = catchesDB
      .map((catchDB) => {
        const { name, version, img } = catchDB;
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;
        return {
          name,
          version,
          uri,
        };
      })
      .reduce<{ Red: Match[]; Blue: Match[] }>(
        (acc, curr) => {
          const { name, version, uri } = curr;
          acc[version].push({
            name,
            uri,
          });
          return acc;
        },
        { Red: [], Blue: [] }
      );

    return catches;
  }
};
