define(function() {
    let pusher;
    let channel;
    let subscribed = false;

    function init() {
        // connect to general channel
    }

    function getRoomsList() {
        // query available rooms
        return ['turtle'];
    }

    function txTick() {

    }

    function connect(roomName) {
        pusher = new Pusher('00fb49eaab4df13fd55b', { cluster: 'us3'}); //, authEndpoint: '/bananas/server/auth/' });
        channel = pusher.subscribe(`${roomName}`); // will be made private when productionized
    }

    return {
        init: init,
        isConnected: function() {return false},
        getRoomsList: getRoomsList,
        txTick: txTick,
    }
});