import z from "zod";
import { withRef } from "./refs";

export const shadow = z.object({
  none: withRef(z.string()).optional(),
  sm: withRef(z.string()).optional(),
  md: withRef(z.string()).optional(),
  lg: withRef(z.string()).optional(),
  xl: withRef(z.string()).optional(),
});

export const radius = z.object({
  none: withRef(z.string()).optional(),
  sm: withRef(z.string()).optional(),
  md: withRef(z.string()).optional(),
  lg: withRef(z.string()).optional(),
  xl: withRef(z.string()).optional(),
  full: withRef(z.string()).optional(),
});