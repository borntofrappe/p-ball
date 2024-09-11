import Database from "better-sqlite3";
import { DB_PATH } from "$env/static/private";
import type { Entry, Pokemon, Area, CatchArea, CatchEntry } from "./types";

const db = new Database(DB_PATH);

const getImgSrc = (arrayBuffer: ArrayBuffer): string => {
  return `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
};

export const getSearchNames = (): string[] => {
  return db
    .prepare(
      `
      SELECT 
        "name" FROM "entry"
      UNION
      SELECT 
        "name" FROM "area";
      `
    )
    .pluck()
    .all() as string[];
};

export const getEntryByName = (name: string): Entry => {
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

  return getEntryByName(name);
};

export const getPokemonByName = (name: string): Pokemon | null => {
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

export const getCatchesByEntryName = (entryName: string): CatchArea[] => {
  const catchAreasDB = db
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
    .all(entryName) as Array<{
    name: string;
    version: string;
    img: ArrayBuffer;
  }>;

  return catchAreasDB.map((catchAreaDB) => {
    const { img, name, version } = catchAreaDB;
    return {
      name,
      version,
      src: getImgSrc(img),
    };
  });
};

export const getLineageByEntryName = (entryName: string): Pokemon[] => {
  const pokemonDB = db
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
    .all({ name: entryName }) as Array<{ name: string; img: ArrayBuffer }>;

  return pokemonDB.map((pokemonDB) => {
    const { img, name } = pokemonDB;
    return {
      name,
      src: getImgSrc(img),
    };
  });
};

export const getAreaByName = (name: string): Area | null => {
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

export const getCatchesByAreaName = (areaName: string): CatchEntry[] => {
  const catchEntriesDB = db
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
    version: string;
    img: ArrayBuffer;
  }>;

  return catchEntriesDB.map((catchEntryDB) => {
    const { img, name, version } = catchEntryDB;
    return {
      name,
      version,
      src: getImgSrc(img),
    };
  });
};
