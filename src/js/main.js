import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders/level.js';
import { loadEntities } from './entities.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadEntities(),
    loadLevel('1.1'),
])
.then(([factory, level]) => {
	const camera = new Camera();
    window.camera = camera;

    const mario = factory.mario();
    mario.pos.set(64, 180);

    const goomba = factory.goomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);

    const koopa = factory.koopa();
    koopa.pos.x = 260;
    level.entities.add(koopa);
	
    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));
	
	const input=setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.draw(context, camera);
    }

    timer.start();
});



