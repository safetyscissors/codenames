define(function() {
    function generateRooms(roomsList, parent) {
        if (!parent) return;
        for (let n of roomsList) {
            parent.appendChild(makeDiv(`room-${n}`, `room ${n}`,`roomChoice`, logCallback));
        }
    }

    function generateTeamSelect(maxPlayerCount, parent) {
        if (!parent) return;
        parent.innerHTML = '';
        const teamSize = (maxPlayerCount / 2);
        // generate spymaster option
        parent.appendChild(makeDiv(`red-player-0`, `red spymaster`,`teamChoice`, logCallback));
        parent.appendChild(makeDiv(`blue-player-0`, `blue spymaster`,`teamChoice`, logCallback));
        // generate team options
        for (let i = 1; i < teamSize; ++i) {
            parent.appendChild(makeDiv(`red-player-${i}`, `red player ${i}`,`teamChoice`, logCallback));
            parent.appendChild(makeDiv(`blue-player-${i}`, `blue player ${i}`,`teamChoice`, logCallback));
        }
    }

    function generateGameCard(cardData, parent) {
        if (!parent) return;
        for (let c of cardData) {
            parent.appendChild(makeDiv(`card-${c.id}`, `card-${c.value}`,`card`, logCallback));
        }
    }

    function logCallback(e) {
        console.log(e.target.id);
    }

    function makeDiv(id, label, className, callback){
        const role = document.createElement("div");
        role.innerHTML = label;
        role.id = id;
        role.classList.add(className);
        role.addEventListener("click", callback);
        return role;
    }

    return {
        init: init,
        generateGameCard: generateGameCard,
        generateRooms: generateRooms,
        generateTeamSelect: generateTeamSelect
    }
});