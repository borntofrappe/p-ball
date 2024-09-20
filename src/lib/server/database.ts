import Database from "better-sqlite3";
import type {
  SearchParam,
  Version,
  Entry,
  Pokemon,
  Area,
  Catch,
  Location,
} from "./types";

const db = new Database("./p-ball.sqlite3");

const getImgSrc = (arrayBuffer: ArrayBuffer): string => {
  return `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
};

export const getSearchNames = () => {
  const searchNames = db
    .prepare(
      `
      SELECT 
        "name", 'pokemon' AS "param" 
      FROM 
        "entry"
      UNION
      SELECT 
        "name", 'area' AS "param" 
      FROM 
        "area";
      `
    )
    .all() as Array<{ name: string; param: SearchParam }>;

  return Object.entries(
    searchNames.reduce(
      (acc, { param, name }) => {
        acc[param].push(name);
        return acc;
      },
      { pokemon: [] as string[], area: [] as string[] }
    )
  ) as [SearchParam, string[]][];
};

export const getEntry = (name: string): Entry => {
  const entryDB = db
    .prepare(
      `
      SELECT 
        "no", "name", "category", "height", "weight", "description", "img" 
      FROM 
        "entry" 
      WHERE 
        "name" = ?;
      `
    )
    .get(name) as {
    no: string;
    name: string;
    category: string;
    height: number;
    weight: number;
    description: string;
    img: ArrayBuffer;
  };

  const { img, ...data } = entryDB;
  return {
    ...data,
    src: getImgSrc(img),
  };
};

export const getEntryOfTheDay = (): Entry => {
  const length = db
    .prepare(
      `
      SELECT 
        COUNT("entry_id") 
      FROM 
        "order_id";
      `
    )
    .pluck()
    .get() as number;

  const day = Math.ceil(new Date().getTime() / 8.64e7) % length;

  const name = db
    .prepare(
      `
      SELECT 
        "name" 
      FROM 
        "entry" 
      WHERE 
        "id" = (
          SELECT 
            "entry_id" 
          FROM 
            "order_id" 
          LIMIT 1 OFFSET ?
        );
      `
    )
    .pluck()
    .get(day) as string;

  return getEntry(name);
};

export const getPokemon = (name: string): Pokemon | null => {
  const pokemonDB = db
    .prepare(
      `
      SELECT 
        "name", "img" 
      FROM 
        "entry" 
      WHERE 
        "name" LIKE ?;
      `
    )
    .get(name) as { name: string; img: ArrayBuffer } | undefined;

  if (pokemonDB === undefined) {
    return null;
  }

  return {
    name: pokemonDB.name,
    src: getImgSrc(pokemonDB.img),
  };
};

export const getArea = (name: string): Area | null => {
  const areaDB = db
    .prepare(
      `
      SELECT 
        "name", "img" 
      FROM 
        "area" 
      WHERE 
        "name" LIKE ?;
      `
    )
    .get(name) as { name: string; img: ArrayBuffer };

  if (areaDB === undefined) {
    return null;
  }

  return {
    name: areaDB.name,
    src: getImgSrc(areaDB.img),
  };
};

export const getLocations = (pokemonName: string) => {
  const catchesDB = db
    .prepare(
      `
      SELECT 
        "name", "version", "img" 
      FROM 
        "name_catch" 
      JOIN 
        "area" ON "name_catch"."area" = "area"."name" 
      WHERE 
        "entry" = ?;
      `
    )
    .all(pokemonName) as Array<{
    name: string;
    version: Version;
    img: ArrayBuffer;
  }>;

  const locations: Location[] = catchesDB.map((catchDB) => {
    const { img, name, version } = catchDB;
    return {
      name,
      version,
      src: getImgSrc(img),
    };
  });

  return Object.entries(
    locations.reduce(
      (acc, curr) => {
        const { version, name, src } = curr;
        acc[version].push({ name, src });
        return acc;
      },
      { Red: [] as Area[], Blue: [] as Area[] }
    )
  ) as [Version, Area[]][];
};

export const getLineage = (pokemonName: string): Pokemon[] => {
  const connections = db
    .prepare(
      `
      SELECT 
        "name", "img" 
      FROM 
        "entry" 
      WHERE 
        "name" IN (
          SELECT 
            "base" 
          FROM 
            "name_evo" 
          WHERE 
            "evolution" = @name 
          UNION 
          SELECT 
            "evolution" 
          FROM 
            "name_evo" 
          WHERE 
            "base" = @name
        );
      `
    )
    .all({ name: pokemonName }) as Array<{ name: string; img: ArrayBuffer }>;

  return connections.map((connection) => {
    const { img, name } = connection;
    return {
      name,
      src: getImgSrc(img),
    };
  });
};

export const getCatches = (areaName: string) => {
  const catchesDB = db
    .prepare(
      `
      SELECT
        "name", "version", "img"
      FROM
        "name_catch"
        JOIN "entry" ON "name_catch"."entry" = "entry"."name"
      WHERE
        "area" = ?;
      `
    )
    .all(areaName) as Array<{
    name: string;
    version: Version;
    img: ArrayBuffer;
  }>;

  const catches: Catch[] = catchesDB.map((catchDB) => {
    const { img, name, version } = catchDB;
    return {
      name,
      version,
      src: getImgSrc(img),
    };
  });

  return Object.entries(
    catches.reduce(
      (acc, curr) => {
        const { version, name, src } = curr;
        acc[version].push({ name, src });
        return acc;
      },
      { Red: [] as Pokemon[], Blue: [] as Pokemon[] }
    )
  ) as [Version, Pokemon[]][];
};
