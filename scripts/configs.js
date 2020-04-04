define(function(){
    let canvasSize = {
        w: window.innerWidth,
        h: window.innerHeight
    };

    let configs = {
        fps: 20,
        txFps: 5,
        canvasSize: canvasSize,
        maxPlayerCount: 10,
        rows: 5,
        cols: 5,
        blackCount: 1,
        redCount: 8,
        blueCount: 9,
    };

    function updateSize() {
        canvasSize.w = window.innerWidth;
        canvasSize.h = window.innerHeight;
    }

    return {
        updateSize: updateSize,
        get: function(key) { return configs[key] },
        set: function(key, value) { configs[key] = value },
    }
});