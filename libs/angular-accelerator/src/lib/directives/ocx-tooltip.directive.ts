import { Directive, AfterViewInit, OnChanges, inject, Renderer2, TemplateRef, NgZone, ViewContainerRef, SimpleChanges, Input } from "@angular/core"
import { TooltipOptions } from "primeng/api"
import { Tooltip, TooltipStyle } from "primeng/tooltip"

// todo - check if We need to convert this into module 
@Directive({ selector: '[ocxTooltip]', standalone: false, providers: [TooltipStyle] })
export class OcxTooltipDirective extends Tooltip implements AfterViewInit, OnChanges {
  override readonly renderer = inject(Renderer2)
  private generatedId: string | undefined

  @Input()
  get ocxTooltip(): string | TemplateRef<HTMLElement> | undefined {
    return this.content
  }

  set ocxTooltip(value: string | TemplateRef<HTMLElement> | undefined) {
    this.content = value
    this.setOption({ tooltipLabel: value })
    this.ensureIdAndAriaDescribedBy()
  }

  constructor() {
    const zone = inject(NgZone)
    const viewContainer = inject(ViewContainerRef)
    super(zone, viewContainer)
    this.ensureIdAndAriaDescribedBy()
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit()
    this.ensureIdAndAriaDescribedBy()
  }

  override onChanges(simpleChange: SimpleChanges): void {
    super.onChanges(simpleChange)
    this.ensureIdAndAriaDescribedBy()
  }

  private ensureIdAndAriaDescribedBy(): void {
    const idFromOptions = this.tooltipOptions?.id
    const idFromInternal = this._tooltipOptions?.id
    const resolvedId = this.normalizeId(idFromOptions) ?? this.normalizeId(idFromInternal) ?? this.getOrCreateGeneratedId()
    if (this.tooltipOptions) {
      const tooltipOptions = this.tooltipOptions as TooltipOptions & { id?: string }
      if (!this.normalizeId(tooltipOptions.id)) {
        tooltipOptions.id = resolvedId
      }
    }

    this.setOption({ id: resolvedId })
    this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', resolvedId)
  }

  private normalizeId(id: string | undefined | null): string | null {
    if (!id) return null
    const trimmed = String(id).trim()
    return trimmed.length ? trimmed : null
  }

  private getOrCreateGeneratedId(): string {
    if (this.generatedId) return this.generatedId
    const randomPart = Math.random().toString(36).slice(2, 10)
    const timePart = Date.now().toString(36)
    this.generatedId = `ocx-tooltip-${timePart}-${randomPart}`
    return this.generatedId
  }
}