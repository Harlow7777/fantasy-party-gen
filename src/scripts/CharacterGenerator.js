function gender() {
    let genders = ['Male', 'Female'];
    return getRandomItem(genders);
}

function klass() {
    let classes = ['Rogue', 'Paladin', 'Fighter', 'Wizard', 'Sorcerer', 'Barbarian', 'Monk', 'Ranger', 'Druid', 'Cleric', 'Warlock', 'Artificer'];
    return getRandomItem(classes);
}

function race() {
    let races = ['Human', 'Elf', 'Goblin', 'Dragonborn', 'Dwarf', 'Halfling', 'Half-Elf', 'Gnome', 'Half-Orc', 'Tiefling', 'Aarakocra', 'Aasimar', 'Genasi', 'Bugbear', 'Centaur', 'Changeling', 'Deep Gnome', 'Duergar', 'Eladrin', 'Fairy', 'Firbolg', 'Githyanki', 'Githzerai', 'Goliath', 'Harengon', 'Hobgoblin', 'Kenku', 'Kobold', 'Lizardfolk', 'Minotaur', 'Orc', 'Satyr', 'Sea Elf', 'Shadar-kai', 'Shifter', 'Tabaxi', 'Tortle', 'Triton', 'Yuan-ti', 'Kalashtar', 'Warforged', 'Loxodon', 'Vedalken', 'Simic Hybrid', 'Tiefling', 'Goliath'];
    return getRandomItem(races);
}

function getRandomItem(items) {
    return items[Math.floor(Math.random()*items.length)];
}

export { gender, klass, race }