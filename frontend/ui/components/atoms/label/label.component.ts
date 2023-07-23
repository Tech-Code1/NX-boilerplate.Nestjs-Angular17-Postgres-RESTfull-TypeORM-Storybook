import { Directive, HostBinding, Input } from '@angular/core';
import { LabelType } from './label.interface';

@Directive({
  standalone: true,
  selector: '[Label]',
})
export class LabelDirective implements LabelType {
  @Input() cssClass!: 'labelPrimary' | 'label-secondary' | 'label-tertiary';
  @Input() for?: string;

  private label = 'text-base';
  private labelPrimary = 'text-black font-medium';

  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.label,
      this.cssClass === 'labelPrimary' ? this.labelPrimary : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /* @HostBinding('attr.for')
  get hostFor(): string | undefined {
    return this.for;
  } */
}
