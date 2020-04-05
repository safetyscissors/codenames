define(function(){
    let rooms = [];
    let myRoom = '';

    function roomListener(roomNames) {
        for (roomName of roomNames) {
            if (rooms.indexOf(roomName) >= 0) return;
            rooms.push(roomName);
        }
    }
    return {
        getAllRooms: function(){ return rooms},
        getRoom: function() {return myRoom},
        setRoom: function(roomName){ myRoom = roomName},
        roomListener: roomListener,
    }
});