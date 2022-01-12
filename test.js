const mi = require('./dist/index');

/*let em = new mi.EffectManager()
    .setDefaultCountUpdateEvent(effect => console.log(`${effect.effect.displayName} now has ${effect.count} afflictions.`))
    .setDefaultDepletedEvent(effect => console.log(`${effect.effect.displayName} is now depleted!`))
    .on("add", effect => console.log(`${effect.effect.displayName} has been added to the plyer.`))
    .add(new mi.Effect('poison', 'Poisoned'))
    .add(new mi.Effect('poison', 'Poisoned'));

em.get('poison').deplete().setCount(0);*/

const vincent = new mi.Player('Vincent', 100, {race: 'Demon'});
const exhausted = new mi.PlayerStatus('exh', 'Exhausted', (status, char) => {console.log(`${char.name} is now ${status.displayName}.`);});
exhausted.applyTo(vincent);