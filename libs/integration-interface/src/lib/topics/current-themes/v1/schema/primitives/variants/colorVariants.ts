import * as z from "zod";
import { variantWithStates } from "./states";

export const colorVariants = z.object({
  primary: variantWithStates.optional(),
  secondary: variantWithStates.optional(),
  tertiary: variantWithStates.optional(),
  quaternary: variantWithStates.optional(),
  quinary: variantWithStates.optional(),
});