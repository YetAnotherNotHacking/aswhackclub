let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000033);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl-container').appendChild(renderer.domElement);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 30000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);
    const timeOffsetArray = new Float32Array(particlesCount);
    for(let i = 0; i < particlesCount; i++) {
        timeOffsetArray[i] = Math.random() * Math.PI * 2;
    }
    particlesGeometry.setAttribute('timeOffset', new THREE.BufferAttribute(timeOffsetArray, 1));

    for(let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 500;
        posArray[i + 1] = (Math.random() - 0.5) * 500;
        posArray[i + 2] = (Math.random() - 0.5) * 700;
        const colorType = Math.random();
        if (colorType < 0.4) {
            colorArray[i] = 0.5 + Math.random() * 0.5;
            colorArray[i + 1] = 0.7 + Math.random() * 0.3;
            colorArray[i + 2] = 1;
        } else if (colorType < 0.7) {
            colorArray[i] = 1;
            colorArray[i + 1] = 0.3 + Math.random() * 0.5;
            colorArray[i + 2] = 0.2 + Math.random() * 0.3;
        } else if (colorType < 0.9) {
            colorArray[i] = 1;
            colorArray[i + 1] = 1;
            colorArray[i + 2] = 0.2 + Math.random() * 0.4;
        } else {
            colorArray[i] = 0.9 + Math.random() * 0.1;
            colorArray[i + 1] = 0.3 + Math.random() * 0.3;
            colorArray[i + 2] = 0.9 + Math.random() * 0.1;
        }
        sizeArray[i/3] = 0.05 + Math.random() * 1.2;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 1,
        size: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    document.addEventListener('mousemove', onMouseMove, false);
    animate();
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.001; 
    particles.rotation.y += 0.002;
    const positions = particles.geometry.attributes.position;
    const colors = particles.geometry.attributes.color;
    const timeOffsets = particles.geometry.attributes.timeOffset;
    const time = Date.now() * 0.001;
    for(let i = 0; i < positions.count; i++) {
        const timeOffset = timeOffsets.array[i];
        const hue = (time + timeOffset) * 0.1 % 1;
        const color = new THREE.Color();
        color.setHSL(hue, 0.8, 0.5);
        colors.array[i * 3] = color.r;
        colors.array[i * 3 + 1] = color.g;
        colors.array[i * 3 + 2] = color.b;
    }
    colors.needsUpdate = true;
    camera.position.x = mouseX * 0.5;
    camera.position.y = mouseY * 0.5;
    renderer.render(scene, camera);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);
init();
