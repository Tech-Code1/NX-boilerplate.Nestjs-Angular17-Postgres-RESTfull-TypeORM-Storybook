import { Component, HostBinding, Input } from '@angular/core';
import { LabelType } from './label.interface';

@Component({
  selector: 'Label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements LabelType {
  @Input() text?: string;
  @Input() label?: string;
  @Input() style!: 'label-primary' | 'label-secondary' | 'label-tertiary';
  @Input() for?: string;

  @HostBinding('class')
  get hostClasses(): string {
    return ['label', this.style].filter(Boolean).join(' ');
  }

  @HostBinding('attr.for')
  get hostFor(): string | undefined {
    return this.for;
  }
}
