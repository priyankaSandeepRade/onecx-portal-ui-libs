import z from 'zod'
import { themeSchemaRegistry } from '../registry'
import { font, withRef } from '../primitives'

export class DiagramCaptionSchema {
  static readonly tokens = {
    padding: withRef(z.string()).default('{{primitives.space.sm}}'),
  }

  static readonly header = {
    color: withRef(z.string()).default('{{primitives.defaultVariant.defaultState.defaultSeverity.color}}'),
    font: font.pick({ weight: true, family: true, size: true }).default({
      size: '{{primitives.font.size}}',
      weight: '{{primitives.font.weight}}',
      family: '{{primitives.font.family}}',
    }),
    padding: withRef(z.string()).default('{{primitives.space.sm}}'),
  }

  static readonly description = {
    color: withRef(z.string()).default('{{primitives.defaultVariant.defaultState.defaultSeverity.color}}'),
    font: font.pick({ weight: true, family: true, size: true }).default({
      size: '{{primitives.font.size}}',
      weight: '{{primitives.font.weight}}',
      family: '{{primitives.font.family}}',
    }),
    padding: withRef(z.string()).default('{{primitives.space.sm}}'),
  }

  static readonly schema = z
    .object({
      ...this.tokens,
      header: z.object({ ...this.header }).prefault({}),
      description: z.object({ ...this.description }).prefault({}),
    })
    .prefault({})
    .register(themeSchemaRegistry, { id: 'diagramCaption' })
}
