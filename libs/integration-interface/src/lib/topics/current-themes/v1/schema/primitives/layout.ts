import z from "zod";
import { withRef } from "./refs";

export const layout = z.object({
  contentMaxWidth: withRef(z.string()).optional(),
  overlayMaxWidth: withRef(z.string()).optional(),
  gap: withRef(z.string()).optional(),
});