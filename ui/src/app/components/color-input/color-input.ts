import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color } from '../../services/scene';

@Component({
  selector: 'app-color-input',
  imports: [FormsModule],
  templateUrl: './color-input.html',
})
export class ColorInput {
  value = input.required<Color>();
  valueChange = output<Color>();

  update(partial: Partial<Color>) {
    this.valueChange.emit({ ...this.value(), ...partial });
  }
}