import * as z from 'zod'
import { bg, bgContrast, border, color, font, withRef } from './primitives'
import { themeSchemaRegistry } from './registry'

export const diagramTextStyles = z
    .object({
        font: font.default({
            family: '{{primitives.font.family}}',
            size: '{{primitives.font.size}}',
            weight: '{{primitives.font.weight}}',
        }),
    })
    .register(themeSchemaRegistry, { id: 'diagramTextStyles' })

export const diagramSettings = z
    .object({
        size: withRef(z.enum(['small', 'large'])).optional(),
    })
    .register(themeSchemaRegistry, { id: 'diagramSettings' })

const diagramSelectButtonTokens = (state: 'defaultState' | 'hover' | 'active' | 'selected' | 'focus' | 'invalid' | 'disabled') =>
    z.object({
        icon: z
            .object({
                color: color.default(`{{primitives.defaultVariant.${state}.defaultSeverity.contrast}}`),
            })
            .prefault({}),
        background: z
            .union([bg, withRef(z.string())])
            .default(`{{primitives.defaultVariant.${state}.defaultSeverity.bg}}`),
        color: color.default(`{{primitives.defaultVariant.${state}.defaultSeverity.contrast}}`),
        border: border.pick({ color: true }).default({
            color: `{{primitives.defaultVariant.${state}.defaultSeverity.border.color}}`,
        }),
    })

const diagramSelectButtonDefaultState = z.object({
    defaultSeverity: diagramSelectButtonTokens('defaultState').prefault({}),
})

const diagramSelectButtonState = (state: 'hover' | 'active' | 'selected' | 'focus' | 'invalid' | 'disabled') =>
    z.object({
        defaultSeverity: diagramSelectButtonTokens(state).prefault({}),
    })

export const diagramSelectButton = z
    .object({
        defaultVariant: z
            .object({
                defaultState: diagramSelectButtonDefaultState.prefault({}),
                hover: diagramSelectButtonState('hover').prefault({}),
                active: diagramSelectButtonState('active').prefault({}),
                selected: diagramSelectButtonState('selected').prefault({}),
                focus: diagramSelectButtonState('focus').prefault({}),
                invalid: diagramSelectButtonState('invalid').prefault({}),
                disabled: diagramSelectButtonState('disabled').prefault({}),
            })
            .prefault({}),
    })
    .register(themeSchemaRegistry, { id: 'diagramSelectButton' })

export interface DiagramInput {
    settings?: z.input<typeof diagramSettings>
    header?: z.input<typeof diagramTextStyles>
    description?: z.input<typeof diagramTextStyles>
    selectButton?: z.input<typeof diagramSelectButton>
    container?: z.input<typeof container>
    footer?: z.input<typeof diagramTextStyles>
}

export const container = z.object({
    bgContrast: bgContrast.default({
        bg: {
            color: {
                dark: '{{primitives.area.surface.defaultState.defaultSeverity.bg.color.dark}}',
                light: '{{primitives.area.surface.defaultState.defaultSeverity.bg.color.light}}',
            },
        },
        contrast: '{{primitives.area.surface.defaultState.defaultSeverity.contrast}}',
    }),
})
    .register(themeSchemaRegistry, { id: 'diagramContainer' })

export const diagram: z.ZodType<DiagramInput> = z
    .object({
        settings: (diagramSettings as typeof diagramSettings).optional(),
        header: (diagramTextStyles as typeof diagramTextStyles).prefault({}),
        description: (diagramTextStyles as typeof diagramTextStyles).prefault({}),
        selectButton: (diagramSelectButton as typeof diagramSelectButton).prefault({}),
        container: (container as typeof container).prefault({}),
        footer: (diagramTextStyles as typeof diagramTextStyles).prefault({}),
    })
    .register(themeSchemaRegistry, { id: 'diagram' })