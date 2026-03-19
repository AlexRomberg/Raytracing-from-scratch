import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color } from '../../services/scene';

@Component({
  selector: 'app-color-input',
  imports: [FormsModule],
  template: `
    <div class="space-y-2 text-xs text-gray-400">
      <div class="grid grid-cols-3 gap-2">
        <label>R</label>
        <label>G</label>
        <label>B</label>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <input
          type="number"
          step="0.05"
          min="0"
          max="1"
          class="w-full bg-gray-700/50 backdrop-blur-sm rounded border border-gray-600 px-2 py-1 outline-none focus:border-blue-400 focus:bg-gray-700 transition-colors"
          [ngModel]="value().r"
          (ngModelChange)="update({r: $event})"
        />
        <input
          type="number"
          step="0.05"
          min="0"
          max="1"
          class="w-full bg-gray-700/50 backdrop-blur-sm rounded border border-gray-600 px-2 py-1 outline-none focus:border-blue-400 focus:bg-gray-700 transition-colors"
          [ngModel]="value().g"
          (ngModelChange)="update({g: $event})"
        />
        <input
          type="number"
          step="0.05"
          min="0"
          max="1"
          class="w-full bg-gray-700/50 backdrop-blur-sm rounded border border-gray-600 px-2 py-1 outline-none focus:border-blue-400 focus:bg-gray-700 transition-colors"
          [ngModel]="value().b"
          (ngModelChange)="update({b: $event})"
        />
      </div>
      <!-- Color preview -->
      <div
        class="h-6 rounded border border-gray-600 shadow-inner"
        [style.background-color]="
          'rgb(' +
          value().r * 255 +
          ',' +
          value().g * 255 +
          ',' +
          value().b * 255 +
          ')'
        "
      ></div>
    </div>
  `
})
export class ColorInput {
  value = input.required<Color>();
  valueChange = output<Color>();

  update(partial: Partial<Color>) {
    this.valueChange.emit({ ...this.value(), ...partial });
  }
}