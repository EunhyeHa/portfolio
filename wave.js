// WAVE wordmark — Damion "wave" extruded glass + ripple (Three.js r128)
document.addEventListener("DOMContentLoaded", function () {
    const wrap = document.getElementById("wave");
    const canvas = document.getElementById("waveCanvas");

    if (!wrap || !canvas) {
        return;
    }

    const FONT_JSON = "./assets/fonts/damion-wave.json";
    const DPR_MAX = 2;
    const MOBILE_MAX = 768;
    const RIPPLE_SEC = 1.5;
    const MAX_SPEED = 1.8;
    const TRAIL_LEN = 16;
    const TARGET_WIDTH = 2.45;

    const EXTRUDE = {
        depth: 0.18,
        bevelEnabled: true,
        bevelThickness: 0.026,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
        curveSegments: 16
    };

    let renderer = null;
    let scene = null;
    let camera = null;
    let mesh = null;
    let backdrop = null;
    let envTarget = null;
    let pmrem = null;
    let raycaster = null;
    let hitPlane = null;
    let rafId = 0;
    let running = false;
    let lastTime = 0;
    let fontData = null;
    let rippleUniforms = null;

    const mouse = {
        x: 0.5,
        y: 0.5,
        vx: 0,
        vy: 0,
        px: 0.5,
        py: 0.5,
        lx: 0,
        ly: 0,
        impulse: 0,
        rippleLife: 0
    };
    const trail = [];
    for (let i = 0; i < TRAIL_LEN; i += 1) {
        trail.push({ x: 0.5, y: 0.5, vx: 0, vy: 0, lx: 0, ly: 0 });
    }

    const ndc = new THREE.Vector2();
    const hitPoint = new THREE.Vector3();
    const worldNormal = new THREE.Vector3();
    const worldOrigin = new THREE.Vector3();

    function isEffectEnabled() {
        if (typeof THREE === "undefined") {
            return false;
        }
        if (window.innerWidth <= MOBILE_MAX) {
            return false;
        }
        if (window.matchMedia("(pointer: coarse)").matches) {
            return false;
        }
        return true;
    }

    function cssSize() {
        const rect = wrap.getBoundingClientRect();
        const w = Math.max(1, Math.round(rect.width || window.innerWidth));
        const h = Math.max(1, Math.round(rect.height || window.innerHeight));
        const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
        return { w: w, h: h, dpr: dpr };
    }

    function parseNums(str) {
        const out = [];
        const re = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
        let m;
        while ((m = re.exec(str)) !== null) {
            out.push(parseFloat(m[0]));
        }
        return out;
    }

    function parseContours(d) {
        const contours = [];
        let cmds = [];
        const re = /([MmLlHhVvQqTtCcZz])([^MmLlHhVvQqTtCcZz]*)/g;
        let match;
        let cx = 0;
        let cy = 0;
        let sx = 0;
        let sy = 0;
        let qcx = 0;
        let qcy = 0;
        let hasQuad = false;

        function startContour() {
            if (cmds.length) {
                contours.push(cmds);
                cmds = [];
            }
        }

        while ((match = re.exec(d)) !== null) {
            const cmd = match[1];
            const nums = parseNums(match[2]);
            const rel = cmd === cmd.toLowerCase();
            const type = cmd.toUpperCase();

            if (type === "M") {
                startContour();
                for (let i = 0; i + 1 < nums.length; i += 2) {
                    if (rel) {
                        cx += nums[i];
                        cy += nums[i + 1];
                    } else {
                        cx = nums[i];
                        cy = nums[i + 1];
                    }
                    if (i === 0) {
                        sx = cx;
                        sy = cy;
                        cmds.push({ t: "M", x: cx, y: cy });
                    } else {
                        cmds.push({ t: "L", x: cx, y: cy });
                    }
                    hasQuad = false;
                }
            } else if (type === "L") {
                for (let i = 0; i + 1 < nums.length; i += 2) {
                    if (rel) {
                        cx += nums[i];
                        cy += nums[i + 1];
                    } else {
                        cx = nums[i];
                        cy = nums[i + 1];
                    }
                    cmds.push({ t: "L", x: cx, y: cy });
                    hasQuad = false;
                }
            } else if (type === "H") {
                for (let i = 0; i < nums.length; i += 1) {
                    cx = rel ? cx + nums[i] : nums[i];
                    cmds.push({ t: "L", x: cx, y: cy });
                    hasQuad = false;
                }
            } else if (type === "V") {
                for (let i = 0; i < nums.length; i += 1) {
                    cy = rel ? cy + nums[i] : nums[i];
                    cmds.push({ t: "L", x: cx, y: cy });
                    hasQuad = false;
                }
            } else if (type === "Q") {
                for (let i = 0; i + 3 < nums.length; i += 4) {
                    let c1x = nums[i];
                    let c1y = nums[i + 1];
                    let x = nums[i + 2];
                    let y = nums[i + 3];
                    if (rel) {
                        c1x += cx;
                        c1y += cy;
                        x += cx;
                        y += cy;
                    }
                    qcx = c1x;
                    qcy = c1y;
                    cx = x;
                    cy = y;
                    cmds.push({ t: "Q", c1x: c1x, c1y: c1y, x: cx, y: cy });
                    hasQuad = true;
                }
            } else if (type === "T") {
                for (let i = 0; i + 1 < nums.length; i += 2) {
                    let x = nums[i];
                    let y = nums[i + 1];
                    if (rel) {
                        x += cx;
                        y += cy;
                    }
                    const c1x = hasQuad ? cx * 2 - qcx : cx;
                    const c1y = hasQuad ? cy * 2 - qcy : cy;
                    qcx = c1x;
                    qcy = c1y;
                    cx = x;
                    cy = y;
                    cmds.push({ t: "Q", c1x: c1x, c1y: c1y, x: cx, y: cy });
                    hasQuad = true;
                }
            } else if (type === "C") {
                for (let i = 0; i + 5 < nums.length; i += 6) {
                    let c1x = nums[i];
                    let c1y = nums[i + 1];
                    let c2x = nums[i + 2];
                    let c2y = nums[i + 3];
                    let x = nums[i + 4];
                    let y = nums[i + 5];
                    if (rel) {
                        c1x += cx;
                        c1y += cy;
                        c2x += cx;
                        c2y += cy;
                        x += cx;
                        y += cy;
                    }
                    cx = x;
                    cy = y;
                    cmds.push({
                        t: "C",
                        c1x: c1x,
                        c1y: c1y,
                        c2x: c2x,
                        c2y: c2y,
                        x: cx,
                        y: cy
                    });
                    hasQuad = false;
                }
            } else if (type === "Z") {
                cmds.push({ t: "Z" });
                cx = sx;
                cy = sy;
                startContour();
                hasQuad = false;
            }
        }

        startContour();
        return contours;
    }

    function applyContour(path, cmds, scale, ox) {
        for (let i = 0; i < cmds.length; i += 1) {
            const c = cmds[i];
            if (c.t === "M") {
                path.moveTo((c.x + ox) * scale, c.y * scale);
            } else if (c.t === "L") {
                path.lineTo((c.x + ox) * scale, c.y * scale);
            } else if (c.t === "Q") {
                path.quadraticCurveTo(
                    (c.c1x + ox) * scale,
                    c.c1y * scale,
                    (c.x + ox) * scale,
                    c.y * scale
                );
            } else if (c.t === "C") {
                path.bezierCurveTo(
                    (c.c1x + ox) * scale,
                    c.c1y * scale,
                    (c.c2x + ox) * scale,
                    c.c2y * scale,
                    (c.x + ox) * scale,
                    c.y * scale
                );
            } else if (c.t === "Z" && path.closePath) {
                path.closePath();
            }
        }
    }

    function shapesFromFontData(data) {
        const scale = TARGET_WIDTH / Math.max(1, data.width);
        const shapes = [];
        const glyphs = data.glyphs || [];
        for (let g = 0; g < glyphs.length; g += 1) {
            const glyph = glyphs[g];
            const contours = parseContours(glyph.d || "");
            if (!contours.length) {
                continue;
            }
            const shape = new THREE.Shape();
            applyContour(shape, contours[0], scale, glyph.x || 0);
            for (let h = 1; h < contours.length; h += 1) {
                const hole = new THREE.Path();
                applyContour(hole, contours[h], scale, glyph.x || 0);
                shape.holes.push(hole);
            }
            shapes.push(shape);
        }
        return shapes;
    }

    function buildGeometry() {
        if (!fontData) {
            return null;
        }
        const shapes = shapesFromFontData(fontData);
        if (!shapes.length) {
            return null;
        }
        const geometry = new THREE.ExtrudeGeometry(shapes, EXTRUDE);
        geometry.center();
        geometry.computeVertexNormals();
        return geometry;
    }

    function fitWave() {
        if (!mesh || !camera) {
            return;
        }
        mesh.scale.set(1, 1, 1);
        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const dist = Math.abs(camera.position.z);
        const viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * dist;
        const viewW = viewH * camera.aspect;
        const scale = Math.min((viewW * 0.86) / size.x, (viewH * 0.4) / size.y);
        mesh.scale.setScalar(scale);
        mesh.rotation.set(-0.14, 0.18, 0.02);
        mesh.position.set(0, -0.04, 0);
    }

    function layoutBackdrop() {
        if (!backdrop || !camera) {
            return;
        }
        const dist = Math.abs(camera.position.z - backdrop.position.z);
        const h = 2 * Math.tan((camera.fov * Math.PI) / 360) * dist;
        backdrop.scale.set(h * camera.aspect, h, 1);
    }

    function screenToLocal(clientX, clientY) {
        if (!mesh || !camera || !raycaster) {
            return false;
        }
        const size = cssSize();
        ndc.set((clientX / size.w) * 2 - 1, -(clientY / size.h) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        mesh.updateMatrixWorld(true);
        worldNormal.set(0, 0, 1).transformDirection(mesh.matrixWorld);
        worldOrigin.setFromMatrixPosition(mesh.matrixWorld);
        hitPlane.setFromNormalAndCoplanarPoint(worldNormal, worldOrigin);
        if (!raycaster.ray.intersectPlane(hitPlane, hitPoint)) {
            return false;
        }
        mesh.worldToLocal(hitPoint);
        mouse.lx = hitPoint.x;
        mouse.ly = hitPoint.y;
        return true;
    }

    function addLights() {
        scene.add(new THREE.AmbientLight(0x9ec8e6, 0.55));
        scene.add(new THREE.HemisphereLight(0xd4f0ff, 0x0a2438, 0.7));

        const key = new THREE.DirectionalLight(0xffffff, 1.05);
        key.position.set(2.4, 3.2, 4.2);
        scene.add(key);

        const rim = new THREE.DirectionalLight(0x7ad4ff, 0.45);
        rim.position.set(-3.2, 1.2, 2.4);
        scene.add(rim);

        const fill = new THREE.DirectionalLight(0xfff4e8, 0.28);
        fill.position.set(0.2, -2.4, 3.0);
        scene.add(fill);
    }

    function addEnvironment() {
        pmrem = new THREE.PMREMGenerator(renderer);
        pmrem.compileCubemapShader();

        const envScene = new THREE.Scene();
        envScene.background = new THREE.Color(0x1a5c78);

        const sky = new THREE.Mesh(
            new THREE.SphereGeometry(8, 16, 12),
            new THREE.MeshBasicMaterial({ color: 0xb8e8ff, side: THREE.BackSide })
        );
        envScene.add(sky);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshBasicMaterial({ color: 0x062033 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -2;
        envScene.add(floor);

        const highlight = new THREE.Mesh(
            new THREE.SphereGeometry(1.2, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        highlight.position.set(-3, 4, 2);
        envScene.add(highlight);

        envTarget = pmrem.fromScene(envScene, 0.04);
        scene.environment = envTarget.texture;
        envScene.traverse(function (obj) {
            if (obj.geometry) {
                obj.geometry.dispose();
            }
            if (obj.material) {
                obj.material.dispose();
            }
        });
    }

    function addBackdrop() {
        const video = document.querySelector("body > video");
        if (!video) {
            return;
        }
        const tex = new THREE.VideoTexture(video);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.format = THREE.RGBFormat;
        if (THREE.sRGBEncoding) {
            tex.encoding = THREE.sRGBEncoding;
        }
        backdrop = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshBasicMaterial({ map: tex, depthWrite: false })
        );
        backdrop.position.z = -4.2;
        scene.add(backdrop);
        layoutBackdrop();
    }

    function makeRippleMaterial() {
        const trailVecs = [];
        for (let i = 0; i < TRAIL_LEN; i += 1) {
            trailVecs.push(new THREE.Vector2(0, 0));
        }

        rippleUniforms = {
            uImpulse: { value: 0 },
            uLife: { value: 0 },
            uPos: { value: new THREE.Vector2(0, 0) },
            uDir: { value: new THREE.Vector2(1, 0) },
            uTrail: { value: trailVecs }
        };

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xeaf8ff,
            metalness: 0,
            roughness: 0.08,
            transmission: 0.94,
            ior: 1.45,
            transparent: true,
            opacity: 0.92,
            envMapIntensity: 1.15,
            clearcoat: 0.55,
            clearcoatRoughness: 0.12,
            reflectivity: 0.5,
            side: THREE.FrontSide
        });

        if ("thickness" in material) {
            material.thickness = 0.5;
        }

        material.onBeforeCompile = function (shader) {
            shader.uniforms.uImpulse = rippleUniforms.uImpulse;
            shader.uniforms.uLife = rippleUniforms.uLife;
            shader.uniforms.uPos = rippleUniforms.uPos;
            shader.uniforms.uDir = rippleUniforms.uDir;
            shader.uniforms.uTrail = rippleUniforms.uTrail;

            shader.vertexShader =
                "uniform float uImpulse;\n" +
                "uniform float uLife;\n" +
                "uniform vec2 uPos;\n" +
                "uniform vec2 uDir;\n" +
                "uniform vec2 uTrail[" +
                TRAIL_LEN +
                "];\n" +
                shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                "#include <begin_vertex>",
                [
                    "#include <begin_vertex>",
                    "vec2 rdir = uDir;",
                    "float rlen = length(rdir);",
                    "if (rlen > 0.0001) { rdir /= rlen; } else { rdir = vec2(1.0, 0.0); }",
                    "float life = clamp(uLife, 0.0, 1.0);",
                    "float amp = min(uImpulse, 1.8) * life * 0.12;",
                    "vec2 disp = vec2(0.0);",
                    "float nPush = 0.0;",
                    "for (int i = 0; i < " + TRAIL_LEN + "; i++) {",
                    "  float tw = 1.0 - float(i) / float(" + TRAIL_LEN + ");",
                    "  tw *= tw;",
                    "  vec2 src = (i == 0) ? uPos : uTrail[i];",
                    "  vec2 dlt = transformed.xy - src;",
                    "  float dist = length(dlt);",
                    "  float fall = exp(-dist * dist * 8.0);",
                    "  float along = dot(dlt, rdir);",
                    "  disp += rdir * along * fall * amp * tw;",
                    "  disp += vec2(-rdir.y, rdir.x) * fall * amp * tw * 0.18;",
                    "  nPush += fall * amp * tw;",
                    "}",
                    "transformed.xy += disp;",
                    "transformed += objectNormal * nPush * 0.4;"
                ].join("\n")
            );
        };

        material.customProgramCacheKey = function () {
            return "wave-ripple-v1";
        };

        return material;
    }

    function addWaveMesh() {
        const geometry = buildGeometry();
        if (!geometry) {
            return false;
        }
        mesh = new THREE.Mesh(geometry, makeRippleMaterial());
        scene.add(mesh);
        fitWave();
        return true;
    }

    function syncRippleUniforms() {
        if (!rippleUniforms) {
            return;
        }
        rippleUniforms.uImpulse.value = mouse.impulse;
        rippleUniforms.uLife.value = mouse.rippleLife / RIPPLE_SEC;
        rippleUniforms.uPos.value.set(mouse.lx, mouse.ly);
        const len = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
        if (len > 0.0001) {
            rippleUniforms.uDir.value.set(mouse.vx / len, mouse.vy / len);
        }
        const arr = rippleUniforms.uTrail.value;
        for (let i = 0; i < TRAIL_LEN; i += 1) {
            arr[i].set(trail[i].lx, trail[i].ly);
        }
    }

    function render(now) {
        if (!running || !renderer) {
            return;
        }
        const t = (now || performance.now()) * 0.001;
        const dt = lastTime ? Math.min(0.05, t - lastTime) : 0;
        lastTime = t;
        if (mouse.rippleLife > 0) {
            mouse.rippleLife = Math.max(0, mouse.rippleLife - dt);
        }
        syncRippleUniforms();
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(render);
    }

    function onMouseMove(event) {
        const rect = wrap.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / Math.max(1, rect.width);
        const ny = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
        mouse.vx = (nx - mouse.x) * 18;
        mouse.vy = (ny - mouse.y) * 18;
        mouse.x = nx;
        mouse.y = ny;

        screenToLocal(event.clientX - rect.left, event.clientY - rect.top);

        const speed = Math.min(
            MAX_SPEED,
            Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy)
        );
        if (speed > 0.002) {
            mouse.impulse = speed;
            mouse.rippleLife = RIPPLE_SEC;
            mouse.px = nx;
            mouse.py = ny;
        }

        trail.pop();
        trail.unshift({
            x: nx,
            y: ny,
            vx: mouse.vx,
            vy: mouse.vy,
            lx: mouse.lx,
            ly: mouse.ly
        });
    }

    function onResize() {
        if (!running || !renderer || !camera) {
            return;
        }
        const size = cssSize();
        camera.aspect = size.w / size.h;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(size.dpr);
        renderer.setSize(size.w, size.h, false);
        fitWave();
        layoutBackdrop();
    }

    function destroy() {
        running = false;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);

        if (mesh) {
            scene.remove(mesh);
            if (mesh.geometry) {
                mesh.geometry.dispose();
            }
            if (mesh.material) {
                mesh.material.dispose();
            }
            mesh = null;
        }
        if (backdrop) {
            scene.remove(backdrop);
            if (backdrop.geometry) {
                backdrop.geometry.dispose();
            }
            if (backdrop.material) {
                if (backdrop.material.map) {
                    backdrop.material.map.dispose();
                }
                backdrop.material.dispose();
            }
            backdrop = null;
        }
        if (envTarget) {
            envTarget.dispose();
            envTarget = null;
        }
        if (pmrem) {
            pmrem.dispose();
            pmrem = null;
        }
        if (renderer) {
            renderer.dispose();
            renderer.forceContextLoss();
            renderer = null;
        }
        scene = null;
        camera = null;
        raycaster = null;
        hitPlane = null;
        rippleUniforms = null;
        lastTime = 0;
        wrap.classList.remove("wave--gl");
        canvas.style.pointerEvents = "none";
    }

    function create() {
        if (running || !isEffectEnabled() || !fontData) {
            return;
        }

        const size = cssSize();
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(size.dpr);
        renderer.setSize(size.w, size.h, false);
        renderer.setClearColor(0x000000, 0);
        renderer.physicallyCorrectLights = true;
        if (THREE.sRGBEncoding) {
            renderer.outputEncoding = THREE.sRGBEncoding;
        }
        if (THREE.ACESFilmicToneMapping) {
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.05;
        }

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(36, size.w / size.h, 0.05, 40);
        camera.position.set(0.12, 0.1, 5.4);
        camera.lookAt(0, 0, 0);
        raycaster = new THREE.Raycaster();
        hitPlane = new THREE.Plane();

        addEnvironment();
        addLights();
        addBackdrop();
        if (!addWaveMesh()) {
            destroy();
            return;
        }

        canvas.style.pointerEvents = "none";
        wrap.classList.add("wave--gl");
        running = true;
        lastTime = 0;
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("resize", onResize);
        render();
    }

    function syncMode() {
        const want = isEffectEnabled();
        if (want && !running) {
            create();
        } else if (!want && running) {
            destroy();
        } else if (want && running) {
            onResize();
        }
    }

    function boot() {
        fetch(FONT_JSON)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error("font json missing");
                }
                return res.json();
            })
            .then(function (data) {
                if (!data || !data.glyphs || !data.glyphs.length) {
                    throw new Error("empty glyphs");
                }
                fontData = data;
                syncMode();
                window.addEventListener("resize", syncMode);
            })
            .catch(function () {
                wrap.classList.remove("wave--gl");
            });
    }

    boot();
});
