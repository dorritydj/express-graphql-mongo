const Heroes = [
    {
        id: '1',
        name: 'Clark Kent',
        alias: 'Superman'
    },
    {
        id: '2',
        name: 'Tony Stark',
        alias: 'Ironman'
    }
]


exports.resolver = {
    allHero: () => {
        return Heroes;
    },
    hero: ({ id }) => {
        return Heroes.find(hero => hero.id === id);
    }
}