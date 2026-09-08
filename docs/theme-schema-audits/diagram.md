# Diagram Theme Schema Audit

## Scope

Audited `diagram` on the current branch.

Canonical slots used by this audit:

- Variants: `defaultVariant`, `primary`, `secondary`, `tertiary`, `quaternary`, `quinary`
- States: `defaultState`, `hover`, `active`, `selected`, `focus`, `invalid`, `disabled`
- Severities: `defaultSeverity`, `success`, `info`, `warning`, `danger`, `contrast`

## Confirmed Structure

- `diagram`
  - `settings`: `size`
  - `header` (independent, specific): `font`
  - `description` (independent, specific): `font`
  - `selectButton` (independent, generic Option 2)
    - `defaultVariant`
      - `defaultState`, `hover`, `active`, `selected`, `focus`, `invalid`, `disabled`
        - `defaultSeverity`: `icon.color`, `background`, `color`, `border.color`
  - `container` (independent, specific): `bgContrast`
  - `footer` (independent, specific): `font`

The empty-state Message and the screen-reader table remain outside the Diagram usage: the former
uses the generic Message usage and the latter has no visual token requirements.

## Structural Gap Analysis

The previous schema nested the full generic SelectButton usage beneath Diagram-level
variant/state/severity slots. The confirmed design instead treats SelectButton as an independent
root-level child with its own `defaultVariant`, interaction states, and `defaultSeverity` baseline.
It is a generic Option 2 child: only the Diagram-specific overrides are declared; all other
SelectButton styling remains in the generic usage.

Header, description, container, footer, and the retained `settings.size` setting were already
independent root-level concepts. `settings.size` is not currently consumed by `DiagramComponent`.

## Default Values

| Node | Confirmed default policy |
| --- | --- |
| Header | `font.family`, `font.size`, and `font.weight` from global primitives |
| Description | `font.family`, `font.size`, and `font.weight` from global primitives |
| SelectButton | Primitive-backed `icon.color`, `background`, `color`, and `border.color` defaults at every declared state under `defaultVariant.defaultSeverity` |
| Container | Background and contrast from `area.surface.defaultState.defaultSeverity` |
| Footer | `font.family`, `font.size`, and `font.weight` from global primitives |
| Settings | `size` remains optional with no baked default |

## Applied Changes

- Replaced invalid nested font primitive references with direct global font primitives.
- Replaced the full generic SelectButton extension with a minimal Diagram SelectButton override
  tree at `diagram.selectButton.defaultVariant.<state>.defaultSeverity`.
- Added primitive-backed defaults for all declared SelectButton interaction states.
- Corrected the container defaults to use the `defaultSeverity` primitive slot.
- Updated Diagram CSS rules to consume the minimal SelectButton paths; selected buttons use
  PrimeNG's `.p-highlight` class instead of the invalid `:selected` pseudo-class.
- Removed the obsolete SelectButton mapping rule because the minimal Diagram override does not
  expose a border radius token.

## Testing

Spec files were intentionally left unchanged during this structural audit. The next audit step is
to add or replace the single Diagram schema spec with snapshots and structural invariant checks.

Validation run on 2026-09-01:

- `nx lint angular-utils` passed with 68 pre-existing warnings and no errors.
- `nx lint integration-interface` is blocked by three unrelated unused-symbol errors in
  `interactive-data-view` and `panelmenu.spec.ts`.
- `nx test integration-interface` reached Diagram without a Diagram failure, but is blocked by an
  existing `loading-indicator.ts` type error and a `message.spec.ts` expectation mismatch.
- `nx affected test` could not run because this checkout has no local `main` revision, which is its
  configured comparison base.
- After the rerun, `nx build integration-interface` no longer reported Diagram errors; it remains
  blocked by the unrelated `loading-indicator.ts` error and test-utils Jest-global type errors.