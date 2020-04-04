define(function(){
    let rooms = [];
    let myRoom = '';

    return {
        getAllRooms: function(){ return rooms},
        getRoom: function() {return myRoom},
        setRoom: function(roomName){ myRoom = roomName},
    }
});