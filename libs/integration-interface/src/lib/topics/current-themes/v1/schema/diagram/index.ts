import z from 'zod'
import { themeSchemaRegistry } from '../registry'
import { bg, withRef } from '../primitives'
import { DiagramCaptionSchema } from './caption'
import { DiagramSelectorSchema } from './selector'
import { DiagramCustomLegendsSchema } from './custom-legends'

export class DiagramSchema {
  static readonly tokens = {
    paddingX: withRef(z.string()).default('{{primitives.space.sm}}'),
    paddingY: withRef(z.string()).default('{{primitives.space.sm}}'),
    marginX: withRef(z.string()).default('{{primitives.space.sm}}'),
    marginY: withRef(z.string()).default('{{primitives.space.sm}}'),
    bg: bg.default({
      color: '{{primitives.defaultVariant.defaultState.defaultSeverity.bg.color}}',
    }),
    contrast: withRef(z.string()).default('{{primitives.defaultVariant.defaultState.defaultSeverity.contrast}}'),
  }
  static readonly schema = z
    .object({
      ...this.tokens,
      caption: DiagramCaptionSchema.schema,
      selectButton: DiagramSelectorSchema.schema.prefault({}),
      customLegends: DiagramCustomLegendsSchema.schema.prefault({}),
    })
    .register(themeSchemaRegistry, { id: 'diagram' })
}

export type DiagramInput = z.input<typeof DiagramSchema.schema>
