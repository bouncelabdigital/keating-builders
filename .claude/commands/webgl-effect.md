# /webgl-effect — Custom WebGL Shader Effect

**Usage:** `/webgl-effect $ARGUMENTS`
Examples:
- `/webgl-effect image distortion hover` — mouse-reactive image distortion on portfolio images
- `/webgl-effect noise background` — animated noise/grain texture for hero section background
- `/webgl-effect reveal scroll` — WebGL-powered image reveal on scroll
- `/webgl-effect gradient animated` — smooth animated gradient background using shaders
- `/webgl-effect displacement map` — 3D displacement effect on images using a texture map

You are a senior creative developer writing custom WebGL shaders for a visually premium effect on the Keating Builders website.

---

## Approach Options

### Option A: Raw WebGL (maximum control, zero dependencies)
Use when: The effect is simple, performance is critical, or no 3D is needed — just a shader on a flat plane.

```html
<canvas id="webgl-canvas"></canvas>
```

```js
// Minimal WebGL boilerplate
const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
// Compile vertex + fragment shaders
// Create buffers, bind textures
// Render loop with requestAnimationFrame
```

### Option B: Three.js PlaneGeometry + ShaderMaterial (recommended for image effects)
Use when: The effect involves images, textures, or needs to integrate with a Three.js scene.

```js
import * as THREE from 'three';
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTexture: { value: texture },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(width, height) }
  },
  vertexShader: `...`,
  fragmentShader: `...`
});
```

---

## GLSL Shader Patterns

### Uniforms to Always Include
```glsl
uniform float uTime;        // elapsed time in seconds
uniform vec2 uMouse;        // normalized mouse position (0-1)
uniform vec2 uResolution;   // canvas dimensions in pixels
uniform sampler2D uTexture; // image texture (if applicable)
```

### Useful GLSL Functions for Creative Effects

```glsl
// Smooth noise (2D)
float noise(vec2 p) { ... }

// Fractional Brownian Motion (layered noise)
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Smooth step for soft edges
float softEdge = smoothstep(0.0, 0.1, dist);
```

### Common Effect Recipes

**Image Distortion on Hover:**
```glsl
// Fragment shader
vec2 uv = vUv;
vec2 mouseOffset = uMouse - vec2(0.5);
float dist = length(uv - uMouse);
float ripple = sin(dist * 30.0 - uTime * 5.0) * 0.02 * smoothstep(0.4, 0.0, dist);
uv += ripple * mouseOffset;
gl_FragColor = texture2D(uTexture, uv);
```

**Animated Gradient:**
```glsl
// Fragment shader using brand colors
vec3 colorA = vec3(0.063, 0.224, 0.0);   // #103900
vec3 colorB = vec3(0.094, 0.090, 0.067); // #181711
float t = sin(uTime * 0.3 + vUv.x * 2.0) * 0.5 + 0.5;
gl_FragColor = vec4(mix(colorA, colorB, t), 1.0);
```

**Grain/Noise Overlay:**
```glsl
// Add subtle film grain — feels premium
float grain = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
gl_FragColor.rgb += (grain - 0.5) * 0.04;
```

---

## Implementation Steps

1. **Define the effect** clearly from `$ARGUMENTS` — what visual result are we achieving?
2. **Choose the approach** (raw WebGL or Three.js shader material)
3. **Write the vertex shader** (usually pass-through for 2D effects)
4. **Write the fragment shader** implementing the effect
5. **Set up uniforms** and update them in the render loop (`uTime`, `uMouse`)
6. **Mount to DOM** — overlay canvas on the target element using `position: absolute`
7. **Performance guard** — disable on `prefers-reduced-motion` and fall back gracefully on mobile if needed
8. **Accessibility** — `aria-hidden="true"` on the canvas, since all real content lives in the DOM

---

## Brand Notes
When using color in shaders, use the Keating Builders palette:
- Forest Green: `vec3(0.063, 0.224, 0.0)` — `#103900`
- Near-Black: `vec3(0.094, 0.090, 0.067)` — `#181711`
- Warm Stone: `vec3(0.655, 0.639, 0.518)` — `#a7a284`
- Cream: `vec3(0.937, 0.929, 0.906)` — `#efede7`
