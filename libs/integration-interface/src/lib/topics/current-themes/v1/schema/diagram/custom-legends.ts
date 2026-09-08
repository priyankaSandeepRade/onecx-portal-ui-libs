import z from 'zod'
import { font, withRef } from '../primitives'
import { themeSchemaRegistry } from '../registry'

export class DiagramCustomLegendsSchema {
  static readonly tokens = {
    paddingX: withRef(z.string()).default('{{primitives.space.sm}}'),
    paddingY: withRef(z.string()).default('{{primitives.space.sm}}'),
    marginX: withRef(z.string()).default('{{primitives.space.sm}}'),
    marginY: withRef(z.string()).default('{{primitives.space.sm}}'),
    font: font.pick({ weight: true, family: true, size: true }).default({
      size: '{{primitives.font.size}}',
      weight: '{{primitives.font.weight}}',
      family: '{{primitives.font.family}}',
    }),
  }

  static readonly schema = z
    .object({
      ...this.tokens,
    })
    .register(themeSchemaRegistry, { id: 'diagramCustomLegends' })
}
