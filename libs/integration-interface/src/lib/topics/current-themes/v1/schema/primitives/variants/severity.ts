import * as z from "zod";
import { bg } from "../tokens/bg";
import { color } from "../tokens/color";

/* base */
export const bgContrast = z.object({
  bg: z.union([bg, z.string()]).optional(),
  contrast: color.optional(),
});

/* ✅ FIXED (no extend) */
export const severityStyles = z.object({
  ...bgContrast.shape,
  border: z.any().optional(),
  focusRing: z.any().optional(),
});