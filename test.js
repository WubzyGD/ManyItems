const mi = require('./dist/index');

let em = new mi.EffectManager()
    .setDefaultCountUpdateEvent(effect => console.log(`${effect.effect.displayName} now has ${effect.count} afflictions.`))
    .setDefaultDepletedEvent(effect => console.log(`${effect.effect.displayName} is now depleted!`))
    .on("add", effect => console.log(`${effect.effect.displayName} has been added to the plyer.`))
    .add(new mi.Effect('poison', 'Poisoned'))
    .add(new mi.Effect('poison', 'Poisoned'));

em.get('poison').deplete().setCount(0);