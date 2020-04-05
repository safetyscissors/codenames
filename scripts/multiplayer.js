define(function() {
    let pusher;
    let generalChannel;
    let roomChannel;
    let subscribed = false;

    function init(roomListener, sendRooms) {
        Pusher.logToConsole = true;
        pusher = new Pusher('00fb49eaab4df13fd55b', { cluster: 'us3', authEndpoint: 'server/auth/' });
        joinGeneral(sendRooms);
        listenForRooms(roomListener);
    }

    /**
     * Join general > request rooms > save rooms.
     */
    function joinGeneral(sendRooms) {
        generalChannel = pusher.subscribe('private-general');
        generalChannel.bind('pusher:subscription_error', function(e) {
            console.log(e)
        });
        generalChannel.bind('client-request-rooms', function() {
            generalChannel.trigger('client-response-rooms', sendRooms);
        });
        generalChannel.bind('pusher:subscription_succeeded', function() {
            getRoomsList();
        });
    }

    function getRoomsList() {
        generalChannel.trigger('client-request-rooms', {});
    }

    function listenForRooms(roomListener) {
        generalChannel.bind('client-response-rooms', function(roomNames) {
            roomListener(roomNames);
        });
        generalChannel.bind('client-new-room', function(roomName) {
            roomListener([roomName]);
        });
    }

    function createNewRoom(roomName) {
        generalChannel.trigger('client-new-room', roomName);
        roomChannel = pusher.subscribe(`private-${roomName}`);
        roomChannel.bind('pusher:subscription_error', function(e) {
            console.log(e)
        });
    }

    function txTick() {

    }

    return {
        init: init,
        isConnected: function() {return false},
        getRoomsList: getRoomsList,
        txTick: txTick,
    }
});