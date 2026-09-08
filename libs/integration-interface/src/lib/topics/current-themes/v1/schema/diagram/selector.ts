import z from 'zod'
import { themeSchemaRegistry } from '../registry'
import { togglebutton } from '../togglebutton'

export class DiagramSelectorSchema {
  static readonly tokens = {
    paddingX: z.string().default('{{primitives.space.sm}}'),
    paddingY: z.string().default('{{primitives.space.sm}}'),
    marginX: z.string().default('{{primitives.space.sm}}'),
    marginY: z.string().default('{{primitives.space.sm}}'),
  }

  static readonly toggleButton = togglebutton

  static readonly schema = z
    .object({
      ...this.tokens,
      toggleButton: this.toggleButton.prefault({}),
    })
    .register(themeSchemaRegistry, { id: 'diagramSelector' })
}
