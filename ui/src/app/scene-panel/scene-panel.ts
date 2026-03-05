import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Scene } from '../services/scene';

@Component({
    selector: 'app-scene-panel',
    imports: [FormsModule],
    templateUrl: './scene-panel.html',
    styleUrl: './scene-panel.css',
})
export class ScenePanel {
    protected scene = inject(Scene);
    protected open = signal(false);

    protected sceneConfig = this.scene.scene;
    protected spheres = computed(() => this.sceneConfig().spheres);
    protected lights = computed(() => this.sceneConfig().lights);
    protected diffuseIntensity = computed(() => this.sceneConfig().diffuseIntensity);

    toggle() {
        this.open.update(v => !v);
    }

    onDiffuseChange(value: number) {
        this.scene.update({ diffuseIntensity: value });
    }

    onSphereChange(index: number, field: string, value: number | string) {
        this.scene.updateSphere(index, { [field]: value });
    }

    onLightChange(index: number, field: string, value: number | string) {
        this.scene.updateLight(index, { [field]: value });
    }

    addSphere() {
        this.scene.addSphere();
    }

    removeSphere(index: number) {
        this.scene.removeSphere(index);
    }

    addLight() {
        this.scene.addLight();
    }

    removeLight(index: number) {
        this.scene.removeLight(index);
    }
}
