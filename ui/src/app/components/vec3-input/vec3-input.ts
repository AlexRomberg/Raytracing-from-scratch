import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vec3 } from '../../services/scene';

@Component({
  selector: 'app-vec3-input',
  imports: [FormsModule],
  template: `
    <div class="grid grid-cols-3 gap-2 text-xs">
      <div>
        <label class="text-gray-500">{{ labels()[0] || 'X' }}</label>
        <input
          type="number"
          class="w-full bg-gray-700/50 backdrop-blur-sm rounded border border-gray-600 px-2 py-1 outline-none focus:border-blue-400 focus:bg-gray-700 transition-colors"
          [ngModel]="value().x"
          (ngModelChange)="update({x: $event})"
        />
      </div>
      <div>
        <label class="text-gray-500">{{ labels()[1] || 'Y' }}</label>
        <input
          type="number"
          class="w-full bg-gray-700/50 backdrop-blur-sm rounded border border-gray-600 px-2 py-1 outline-none focus:border-blue-400 focus:bg-gray-700 transition-colors"
          [ngModel]="value().y"
          (ngModelChange)="update({y: $event})"
        />
      </div>
      <div>
        <label class="text-gray-500">{{ labels()[2] || 'Z' }}</label>
        <input
          type="number"
          class="w-full bg-gray-700/50 backdrop-blur-sm rounded border border-gray-600 px-2 py-1 outline-none focus:border-blue-400 focus:bg-gray-700 transition-colors"
          [ngModel]="value().z"
          (ngModelChange)="update({z: $event})"
        />
      </div>
    </div>
  `
})
export class Vec3Input {
  value = input.required<Vec3>();
  valueChange = output<Vec3>();
  labels = input<string[]>(['X', 'Y', 'Z']);

  update(partial: Partial<Vec3>) {
    this.valueChange.emit({ ...this.value(), ...partial });
  }
}