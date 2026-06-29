import * as z from "zod";
import { themeSchemaRegistry } from "../registry";

export const themeRef = z
  .string()
  .regex(/^\{\{[\w.]+\}\}$/)
  .register(themeSchemaRegistry, { id: "themeRef" });

export const withRef = <T extends z.ZodTypeAny>(schema: T) =>
  z.union([schema, themeRef]) as z.ZodUnion<[T, typeof themeRef]>;