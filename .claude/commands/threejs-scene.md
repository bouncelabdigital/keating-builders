# /threejs-scene — Build a Three.js 3D Scene or Effect

**Usage:** `/threejs-scene $ARGUMENTS`
Examples:
- `/threejs-scene hero background particles` — animated particle field for the hero section
- `/threejs-scene rotating logo 3d` — a 3D animated version of the logo
- `/threejs-scene materials showcase` — interactive 3D material/texture viewer for building materials
- `/threejs-scene building model` — load and display a 3D building model (.glb/.gltf)

You are a senior creative developer implementing a Three.js 3D scene for the Keating Builders website.

---

## Setup

### Library Loading
```html
<!-- Load Three.js from CDN — only on pages that need it -->
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/"
  }
}
</script>
```

Use ES module imports. Do not load Three.js as a global script.

---

## Implementation Steps

### 1. Define the Scene Goal
From `$ARGUMENTS`, determine:
- What 3D effect or scene is needed?
- Is it decorative (background, ambient) or interactive (user can orbit/click)?
- Should it respond to scroll position or mouse movement?
- What is the performance budget? (decorative scenes must be lightweight)

### 2. Scene Architecture

Set up the standard Three.js scene structure in `js/[scene-name].js`:

```js
import * as THREE from 'three';

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Resize handler
// Animation loop with requestAnimationFrame
// Cleanup on page navigation
```

### 3. Lighting
Choose appropriate lighting for the scene:
- `AmbientLight` for base illumination
- `DirectionalLight` for sun-like shadows
- `PointLight` for localized glows
- `HemisphereLight` for outdoor sky/ground feel

For Keating Builders, favor warm, natural lighting (beige/cream sky, earthy ground) that matches the brand palette.

### 4. Materials & Brand Alignment
Use materials that feel premium and cohesive with the brand:
- `MeshStandardMaterial` for realistic surfaces (supports roughness/metalness)
- `MeshPhysicalMaterial` for glass, polished concrete, premium finishes
- Colors should draw from the brand palette where possible: `#103900`, `#181711`, `#a7a284`, `#efede7`

### 5. Performance Targets
- Keep draw calls minimal (merge geometries where possible)
- Use `dispose()` on geometries and materials when the scene is destroyed
- Target 60fps on mid-range hardware
- Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` — cap at 2x
- On mobile: reduce polygon count or disable the scene entirely if it would impact performance

### 6. Scroll/Mouse Reactivity (if applicable)
- Mouse parallax: subtle rotation of the scene based on cursor position
- Scroll-driven animation: objects animate as user scrolls (integrate with `IntersectionObserver` or a scroll position listener)
- Always use lerp (linear interpolation) for smooth, eased movement — never abrupt jumps

### 7. Canvas Integration
- Mount the canvas on a `<canvas>` element with a specific ID
- Use `position: absolute` within a `position: relative` container so it doesn't disrupt document flow
- Ensure it resizes correctly on window resize

### 8. Accessibility
- The 3D canvas is decorative — add `aria-hidden="true"` so screen readers skip it
- Ensure all important content is in the regular DOM, not inside the canvas
- Respect `prefers-reduced-motion`: if the user has reduced motion enabled, disable or simplify animations

---

## Common Scene Recipes

**Particle Field (hero background):**
- `BufferGeometry` with random point positions
- `PointsMaterial` with small size, warm color
- Gentle drift animation in the render loop

**Floating Geometric Shapes:**
- `BoxGeometry`, `IcosahedronGeometry`, or custom shapes
- Slight rotation and floating bob in the render loop

**GLTF Model Viewer:**
- Use `GLTFLoader` from Three.js addons
- Load `.glb` from `images/graphics/`
- `OrbitControls` for user interaction
- `DRACOLoader` for compressed models
