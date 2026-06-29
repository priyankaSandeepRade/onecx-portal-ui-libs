import * as z from "zod";
import { withRef } from "../refs";

const colorPair = z.object({
  light: withRef(z.string()),
  dark: withRef(z.string()),
});

export const color = z.union([
  withRef(z.string()),
  colorPair,
]);