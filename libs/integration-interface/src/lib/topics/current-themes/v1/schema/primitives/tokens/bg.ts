import * as z from "zod";
import { color } from "./color";
import { withRef } from "../refs";

export const bg = z.object({
  color: color.optional(),
  image: withRef(z.string()).optional(),
  position: withRef(z.string()).optional(),
  size: withRef(z.string()).optional(),
  repeat: withRef(z.string()).optional(),
});