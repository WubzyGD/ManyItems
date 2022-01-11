const mi = require('./dist/index');

let em = new mi.EffectManager()
    .setDefaultCountUpdateEvent(effect => console.log(`${effect.effect.name} now has ${effect.count} afflictions.`))
    .setDefaultDepletedEvent(effect => console.log(`${effect.effect.name} is now depleted!`))
    .on("add", effect => console.log(`${effect.effect.name} has been added to the plyer.`))
    .add(new mi.Effect('Poisoned'))
    .add(new mi.Effect('Poisoned'));

em.get('Poisoned').deplete();