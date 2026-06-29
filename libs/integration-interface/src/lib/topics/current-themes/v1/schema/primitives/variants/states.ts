import * as z from "zod";
import { bgContrast } from "./severity";
import { severityVariantGroup } from "./group";

export const variantWithStates = z.lazy(() =>
  z.object({
    ...bgContrast.shape,
    defaultState: severityVariantGroup.optional(),
    state: z.object({
      hover: severityVariantGroup.optional(),
      active: severityVariantGroup.optional(),
      selected: severityVariantGroup.optional(),
      focus: severityVariantGroup.optional(),
    }).optional(),
  })
);