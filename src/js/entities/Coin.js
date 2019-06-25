import Entity, {Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadCoin() {
    return loadSpriteSheet('coin')
        .then(createCoinFactory);
}

class Collectable extends Trait
{
	constructor(){
        super('collectable');
        this.collected = false;
    }
    
	update(entity, deltaTime, level)
	{
        if (this.collected) {
            level.entities.delete(entity);
        }
    }
}

function createCoinFactory(sprite) {

    function drawCoin(context) {
        sprite.draw('coin', context, 0, 0);
    }

    return function createMario() {

        const coin = new Entity();
        coin.size.set(16, 16);

        coin.addTrait(new Physics());
        coin.addTrait(new Solid());	
		coin.addTrait(new Collectable());
        
        coin.draw = drawCoin;

        return coin;
    }
}