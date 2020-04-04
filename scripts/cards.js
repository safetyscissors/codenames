define(function(){
    let cards = [];
    const NORMAL_TYPE = 0;
    const RED_TYPE = 1;
    const BLUE_TYPE = 2;
    const BLACK_TYPE = 3;

    Array.prototype.sample = function(){
        return this[Math.floor(Math.random()*this.length)];
    };

    function createCard(x, y, id, value) {
        return {
            x: x, // row
            y: y, // col
            id: id, // cards[] index
            value: value, // word
            type: NORMAL_TYPE,
            revealed: 0, // shows the state to everyone
        }
    }

    function minify(cardList) {
        return cardList.map(c => [c.x, c.y, c.id, c.value, c.type, c.revealed]);
    }

    function unminify(data) {
        return data.map(d => {
            return {
                x: d[0],
                y: d[1],
                id: d[2],
                value: d[3],
                type: d[4],
                revealed: d[5],
            };
        });
    }

    function init(wordStr, rows, cols, blackCount, redCount, blueCount) {
        cards = selectWords(wordStr.split(','), rows, cols, blackCount, redCount, blueCount);
    }

    function selectWords(wordList, rows, cols, blackCount, redCount, blueCount) {
        let allCards = [];
        let existingWords = {};
        let unassignedCardIds = [...Array(rows * cols).keys()];
        // generate cards with values
        for (let x = 0; x < cols; ++x) {
            for (let y = 0; y < rows; ++y) {
                // get a unique random word;
                let randomWord = '';
                do {
                    randomWord = wordList.sample();
                } while (existingWords[randomWord]);
                existingWords[randomWord] = true;

                let id = x * rows + y;
                allCards[id] = createCard(x, y, id, randomWord);
            }
        }
        // assign black cards
        for (let b = 0; b < blackCount; ++b) {
            let randomId = unassignedCardIds.sample();
            unassignedCardIds.splice(unassignedCardIds.indexOf(randomId), 1);
            allCards[randomId].type = BLACK_TYPE;
        }
        // assign black cards
        for (let b = 0; b < redCount; ++b) {
            let randomId = unassignedCardIds.sample();
            unassignedCardIds.splice(unassignedCardIds.indexOf(randomId), 1);
            allCards[randomId].type = RED_TYPE;
        }
        // assign black cards
        for (let b = 0; b < blueCount; ++b) {
            let randomId = unassignedCardIds.sample();
            unassignedCardIds.splice(unassignedCardIds.indexOf(randomId), 1);
            allCards[randomId].type = BLUE_TYPE;
        }
        return allCards;
    }

    function getCards() {
        return cards;
    }

    return {
        init: init,
        getCards: getCards,
    }
});