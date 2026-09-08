import { diagram } from '../diagram'
import { expectExactTokens, expectExactUndefinedTokens } from '../test-utils'

describe('diagram schema', () => {
  it('should parse an empty object with all default tokens', () => {
    const result = diagram.safeParse({})

    expect(result.success).toBe(true)

    if (!result.success) return

    expectExactUndefinedTokens(result.data, diagram.shape, [])
    expectExactTokens(result.data, {
      container: {
        bg: { color: '{{primitives.defaultVariant.defaultState.defaultSeverity.bg.color}}' },
        contrast: '{{primitives.defaultVariant.defaultState.defaultSeverity.contrast}}',
      },
      header: {
        font: {
          size: '{{primitives.font.size}}',
          weight: '{{primitives.font.weight}}',
          family: '{{primitives.font.family}}',
        },
      },
      description: {
        font: {
          size: '{{primitives.font.size}}',
          weight: '{{primitives.font.weight}}',
          family: '{{primitives.font.family}}',
        },
      },
      selectButton: {
        icon: { color: '{{primitives.defaultVariant.defaultState.defaultSeverity.contrast}}' },
        background: { color: '{{primitives.defaultVariant.defaultState.defaultSeverity.bg.color}}' },
        border: { color: '{{primitives.defaultVariant.defaultState.defaultSeverity.border.color}}' },
        color: '{{primitives.defaultVariant.defaultState.defaultSeverity.contrast}}',
        hover: {
          background: { color: '{{primitives.defaultVariant.state.hover.defaultSeverity.bg.color}}' },
          color: '{{primitives.defaultVariant.state.hover.defaultSeverity.contrast}}',
        },
        active: {
          background: { color: '{{primitives.defaultVariant.state.active.defaultSeverity.bg.color}}' },
          color: '{{primitives.defaultVariant.state.active.defaultSeverity.contrast}}',
        },
        selected: {
          background: { color: '{{primitives.defaultVariant.state.active.defaultSeverity.bg.color}}' },
          color: '{{primitives.defaultVariant.state.active.defaultSeverity.contrast}}',
        },
        focus: {
          background: { color: '{{primitives.defaultVariant.state.focus.defaultSeverity.bg.color}}' },
          color: '{{primitives.defaultVariant.state.focus.defaultSeverity.contrast}}',
        },
      },
      footer: {
        font: {
          size: '{{primitives.font.size}}',
          weight: '{{primitives.font.weight}}',
          family: '{{primitives.font.family}}',
        },
      },
    })
  })
})