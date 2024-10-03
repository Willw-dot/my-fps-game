// Set up a basic 3D environment using Three.js
let scene, camera, renderer, controls;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();

document.getElementById('start-button').onclick = () => {
    document.getElementById('game-container').style.display = 'none';
    startGame();
};

function startGame() {
    // Scene and Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ground
    let groundGeometry = new THREE.PlaneGeometry(100, 100);
    let groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Simple Player Box (instead of a 3D model)
    let playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    let playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let player = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(player);

    // Pointer Lock for FPS Controls
    document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock;
    document.body.onclick = () => document.body.requestPointerLock();

    // Capture Mouse Movements
    document.addEventListener('mousemove', (event) => {
        camera.rotation.y -= event.movementX * 0.002;
        camera.rotation.x -= event.movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    });

    // Keyboard Events
    document.addEventListener('keydown', (event) => {
        if (event.key === 'w') moveForward = true;
        if (event.key === 's') moveBackward = true;
        if (event.key === 'a') moveLeft = true;
        if (event.key === 'd') moveRight = true;
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'w') moveForward = false;
        if (event.key === 's') moveBackward = false;
        if (event.key === 'a') moveLeft = false;
        if (event.key === 'd') moveRight = false;
    });

    // Animation Loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Movement
    velocity.x -= velocity.x * 0.1;
    velocity.z -= velocity.z * 0.1;
    if (moveForward) velocity.z -= 0.02;
    if (moveBackward) velocity.z += 0.02;
    if (moveLeft) velocity.x -= 0.02;
    if (moveRight) velocity.x += 0.02;

    camera.position.add(velocity);
    renderer.render(scene, camera);
}

