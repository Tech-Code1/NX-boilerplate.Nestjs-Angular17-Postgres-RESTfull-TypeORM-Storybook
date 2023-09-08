import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'c-error-input',
  imports: [CommonModule, SharedModule],
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorInputComponent {
  @Input() errors: Record<string, ValidationErrors> | null | undefined = {};
}
