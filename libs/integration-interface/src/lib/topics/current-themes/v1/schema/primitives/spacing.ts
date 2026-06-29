import z from "zod";
import { withRef } from "./refs";

export const space = z.object({
  xs: withRef(z.string()).optional(),
  sm: withRef(z.string()).optional(),
  md: withRef(z.string()).optional(),
  lg: withRef(z.string()).optional(),
  xl: withRef(z.string()).optional(),
  xxl: withRef(z.string()).optional(),
});