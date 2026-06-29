import * as z from "zod";
import { space } from "../primitives/spacing";
import { font } from "../primitives/typography";
import { layout } from "../primitives/layout";
import { shadow, radius } from "../primitives/effects";
import { colorVariants } from "./variants/colorVariants";
import { variantWithStates } from "./variants/states";
import { themeSchemaRegistry } from "../registry";
import { withRef } from "./refs";
import { border, borderWithShadow } from "./tokens/border";

export const area = variantWithStates;

export const areas = z
  .object({
    canvas: area.optional(),
    surface: area.optional(),
    onSurface: area.optional(),
    overlay: area.optional(),
  })
  .register(themeSchemaRegistry, { id: "areas" });

export const componentBorders = z
  .object({
    button: border.optional(),
    input: border.optional(),
    card: border.optional(),
    dialog: border.optional(),
  })
  .register(themeSchemaRegistry, { id: "componentBorders" });

export const borderWithVariants = z
  .object({
    defaultVariant: border.optional(),
    variant: componentBorders.optional(),
  })
  .register(themeSchemaRegistry, { id: "borderWithVariants" });

export const transition = z
  .object({
    duration: withRef(z.number()).optional(),
  })
  .register(themeSchemaRegistry, { id: "transition" });

const primitivesShape = {
  defaultVariant: variantWithStates.optional(),
  variant: colorVariants,
  area: (areas as typeof areas).optional(),
  space: space.optional(),
  shadow: shadow.optional(),
  font: font.optional(),
  layout: layout.optional(),
  radius: radius.optional(),
  border: borderWithVariants.optional(),
  focusRing: (borderWithShadow as typeof borderWithShadow).optional(),
  transition: (transition as typeof transition).optional(),
};

export const primitives = z.object(primitivesShape).optional();