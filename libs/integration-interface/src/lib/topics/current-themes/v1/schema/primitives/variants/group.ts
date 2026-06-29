import * as z from "zod";
import { severityStyles } from "./severity";

export const severityVariants = z.object({
  success: severityStyles.optional(),
  info: severityStyles.optional(),
  warning: severityStyles.optional(),
  danger: severityStyles.optional(),
  contrast: severityStyles.optional(),
});

export const severityVariantGroup = z.object({
  defaultVariant: severityStyles.optional(),
  variant: severityVariants.optional(),
});