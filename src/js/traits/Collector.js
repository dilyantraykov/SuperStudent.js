import { Sides, Trait } from '../Entity.js';

export default class Collector extends Trait {
    constructor() {
        super('collector');

        this.onCollect = function () {
        }
    }

    collides(us, them) {
        if (!them.collectable || them.collectable.collected) {
            return;
        }

        them.collectable.collected = true;
        this.onCollect(us, them);
    }
}
