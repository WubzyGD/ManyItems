const ManyItems = require('./dist/index');

const player = new ManyItems.BasicItem('Player', 'player')
    .addFeature(new ManyItems.features.XP()
        .setHook((f, i) => console.log(`${f.name} is being applied to ${i.name}!`))
        .setGainHook((amt, xp) => console.log(`${player.name}'s new XP amount is ${amt}, from ${xp.xp} - ^${amt - xp.xp} - [${xp.xp}/${xp.currentLevelMax}]`))
        .setLevelCheck(xp => xp.xp >= xp.currentLevelMax)
        .setLevelHook((tl, xp) => console.log(`${player.name}'s new level is ${xp.level}!`))
    );
console.log(player.xp);

//for (i=1;i<21;i++) {console.log(i, player.xp.levelAlgorithm(i));}

for (i=1;i<21;i++) {player.xp.xp += 10;}