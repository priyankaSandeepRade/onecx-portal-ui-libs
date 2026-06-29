import z from "zod";
import { withRef } from "./refs";

export const font = z.object({
  family: withRef(z.string()).optional(),
  size: withRef(z.string()).optional(),
  weight: withRef(z.string()).optional(),
  lineHeight: withRef(z.string()).optional(),
  letterSpacing: withRef(z.string()).optional(),
  style: withRef(z.string()).optional(),
});