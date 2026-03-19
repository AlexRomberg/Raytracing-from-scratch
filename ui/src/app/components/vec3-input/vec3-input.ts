import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vec3 } from '../../services/scene';

@Component({
  selector: 'app-vec3-input',
  imports: [FormsModule],
  templateUrl: './vec3-input.html',
})
export class Vec3Input {
  value = input.required<Vec3>();
  valueChange = output<Vec3>();
  labels = input<string[]>(['X', 'Y', 'Z']);

  update(partial: Partial<Vec3>) {
    this.valueChange.emit({ ...this.value(), ...partial });
  }
}