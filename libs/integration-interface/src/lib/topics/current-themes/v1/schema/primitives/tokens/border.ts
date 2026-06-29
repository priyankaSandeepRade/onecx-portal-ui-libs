import * as z from "zod";
import { color } from "./color";
import { withRef } from "../refs";

export const border = z.object({
  color: color.optional(),
  width: z.union([
    withRef(z.string()),
    z.object({
      top: withRef(z.string()).optional(),
      right: withRef(z.string()).optional(),
      bottom: withRef(z.string()).optional(),
      left: withRef(z.string()).optional(),
    }),
  ]).optional(),
  style: withRef(z.string()).optional(),
  radius: withRef(z.string()).optional(),
  offset: withRef(z.string()).optional(),
});

export const borderWithShadow = z.object({
  ...border.shape,
  shadow: withRef(z.string()).optional(),
});