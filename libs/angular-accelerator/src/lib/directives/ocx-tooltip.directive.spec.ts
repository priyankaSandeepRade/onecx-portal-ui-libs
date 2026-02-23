import { Component, ViewChild } from "@angular/core"
import { OcxTooltipDirective } from "./ocx-tooltip.directive"
import { ComponentFixture, TestBed } from "@angular/core/testing"

@Component({
  standalone: false,
  template: `
	<div [ocxTooltip]="'test tooltip'"></div>
  `,
})
class HostComponent {
  @ViewChild(OcxTooltipDirective)
  directive!: OcxTooltipDirective
}

describe('OcxTooltipDirective', () => {
	let fixture: ComponentFixture<HostComponent>
	let component: HostComponent
  	let harness: OcxSrcHarness

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HostComponent, OcxTooltipDirective],
		}).compileComponents()

		fixture = TestBed.createComponent(HostComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	describe('input handling', () => {
		it('create directive instance', () => {
			const directive = new OcxTooltipDirective()
			expect(directive).toBeTruthy()
		})
		it.todo('accepts string input via ocxTooltip and maps it to tooltip content')
		it.todo('accepts TemplateRef input via ocxTooltip and maps it to tooltip content')
		it.todo('updates tooltip option tooltipLabel whenever ocxTooltip changes')
	})

	describe('id resolution and aria-describedby', () => {
		it.todo('uses tooltipOptions.id when provided and non-empty')
		it.todo('falls back to internal _tooltipOptions.id when tooltipOptions.id is missing')
		it.todo('generates deterministic non-empty id when no id is provided')
		it.todo('reuses generated id across subsequent updates for the same instance')
		it.todo('writes aria-describedby with resolved id to host element')
		it.todo('ignores empty or whitespace-only id values during normalization')
	})
})
