import { SQLiteDatabase } from "expo-sqlite";

export const getEntriesData = async ({
  db,
}: {
  db: SQLiteDatabase;
}): Promise<EntryLookup[]> => {
  const result: { name: string; img: number[] }[] = await db.getAllAsync(
    "SELECT name, img FROM entry"
  );

  if (result) {
    return result.map(({ name, img }) => {
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
  const result = await db.getFirstAsync<{
    no: string;
    name: string;
    category: string;
    height: number;
    weight: number;
    description: string;
    img: number[];
  }>(
    `
      SELECT no, name, category, height, weight, description, img
      FROM entry 
      WHERE name = ?
      `,
    [name]
  );

  if (result === null) {
    throw new Error(
      `"${name}" does not match the name of any entry in the Kanto dex`
    );
  }

  if (result) {
    const { no, name, category, height, weight, description, img } = result;
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
}): Promise<{ Red: Area[]; Blue: Area[] }> => {
  const result = await db.getAllAsync<{
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

  if (result) {
    const locations = result
      .map((d) => {
        const { name, version, img } = d;
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

  return {
    Red: [],
    Blue: [],
  };
};

export const getConnectionsByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<EntryLookup[]> => {
  const result = await db.getAllAsync<{ name: string; img: number[] }>(
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

  if (result) {
    const connections = result.map((d) => {
      const { name, img } = d;
      const base64Data = btoa(String.fromCharCode.apply(null, img));
      const uri = "data:image/png;base64," + base64Data;

      return {
        name,
        uri,
      };
    });

    return connections;
  }

  return [];
};

export const getAreaByName = async ({
  db,
  name,
}: {
  db: SQLiteDatabase;
  name: string;
}): Promise<Area | undefined> => {
  const result = await db.getFirstAsync<{ name: string; img: number[] }>(
    `
      SELECT name, img
      FROM area 
      WHERE name = ?
      `,
    [name]
  );

  if (result === null) {
    throw new Error(
      `"${name}" does not match the name of an area in the Kanto region`
    );
  }

  if (result) {
    const { name, img } = result;
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
}): Promise<{ Red: EntryLookup[]; Blue: EntryLookup[] }> => {
  const result = await db.getAllAsync<{
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

  if (result) {
    const catches = result
      .map((d) => {
        const { name, version, img } = d;
        const base64Data = btoa(String.fromCharCode.apply(null, img));
        const uri = "data:image/png;base64," + base64Data;
        return {
          name,
          version,
          uri,
        };
      })
      .reduce<{ Red: EntryLookup[]; Blue: EntryLookup[] }>(
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

  return {
    Red: [],
    Blue: [],
  };
};
