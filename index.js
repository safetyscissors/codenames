(function () {
    init();
})();

function init() {
    require([
        'scripts/configs.js',
        'scripts/placeholderUi.js',
        'scripts/multiplayer.js',
        'scripts/cards.js',
        'assets/words.js',
    ], function (configs, placeholderUi, multiplayer, cards, words) {
        // all dom functions happen here.

        // init modules.
        cards.init(
            words['English'],
            configs.get('rows'), configs.get('cols'),
            configs.get('blackCount'),
            // red/blue count to alternate based on previous game
            configs.get('redCount'), configs.get('blueCount'));
        multiplayer.init();
        placeholderUi.generateRooms(multiplayer.getRoomsList(), document.querySelector('#placeholderUi > #rooms'));
        placeholderUi.generateTeamSelect(configs.get('maxPlayerCount'), document.querySelector('#placeholderUi > #rooms'));
        placeholderUi.generateGameCard(cards.getCards(), document.querySelector('#placeholderUi > #rooms'));

        // game loop
        setInterval(function () {
            tick();
            render();
        }, 1000 / configs.get('fps'));

        setInterval(function () {
            if (!multiplayer.isConnected()) return;
            multiplayer.txTick();
        }, 1000 / configs.get('txFps'));
    });
}

function tick() {

}

function render() {

}