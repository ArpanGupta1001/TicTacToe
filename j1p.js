var players = [
    { name: '', chance: '', score: 0 },
    { name: '', chance: '', score: 0 }
];
var p = 0;
var t=0;
var chance = 0;
var ttt = ['', '', '', '', '', '', '', '', ''];
var log1 = 'Game log: ';
var log2 = 'Game log: ';

function startGame() {
    var P1 = document.getElementById('player1').value;
    var P2 = document.getElementById('player2').value;
    if (!P1 || !P2) {
        alert('Enter names of both the players');
        return;
    }
    players[0].name = P1;
    players[1].name = P2;
    updateP1();
    updateP2();
    reset();
}

function updateP1() {
    document.getElementById('player_1').textContent = players[0].name + " ( Score : " + players[0].score + " )";
    document.getElementById('player_1_chance').textContent = (p % 2 === 0) ? "Your chance" : "";
}

function updateP2() {
    document.getElementById('player_2').textContent = players[1].name + " ( Score : " + players[1].score + " )";
    document.getElementById('player_2_chance').textContent = (p % 2 === 1) ? "Bot's chance" : "";
}

function Click(cell) {
    t=0;
    if (players[0].name === '' || players[1].name === '') {
        alert('Enter name of the player first to start playing');
        return;
    }
    insert(cell);
    if (chance > 4) {
        check();
    }
    if(t!==0){
        return;
    }
    bot_insert();
    if (chance > 4) {
        check();
    }
}

function insert(cell) {
    if (ttt[cell - 1] === '') {
        ttt[cell - 1] = (p % 2 === 0) ? 'X' : 'O';
        document.getElementById('cell' + cell).innerText = ttt[cell - 1];
        chance++;
        p = (p+1)%2;
        updateP1();
        updateP2();
    } else {
        alert('Cell is already filled.');
        t=1;
    }
}

function bot_insert() {
    var max = 1;
    var c1;
    c1 = bot_can_win();
    if (c1 !== 0) {
        insert(c1);
        return;
    }
    if (chance === 3) {
        if ((ttt[5] === 'X' && ttt[6] === 'X') || (ttt[7] === 'X' && (ttt[0] === 'X' || ttt[2] === 'X'))) {
            insert(9);
            return;
        }
        if ((ttt[0] === 'X' && ttt[8] == 'X') || (ttt[2] === 'X' && ttt[6] === 'X')) {
            insert(2);
            return;
        }
        if ((ttt[5] === 'X' && ttt[7] == 'X')) {
            insert(9);
            return;
        }
    }
    c1 = user_can_win();
    if (c1 !== 0) {
        insert(c1);
        return;
    } else {
        for (var i = 0; i < 9; i++) {
            if (precedence(i) > max) {
                max = precedence(i);
            }
        }
        if (max !== 1) {
            for (var i = 0; i < 9; i++) {
                if (max === precedence(i)) {
                    insert(i + 1);
                    return;
                }
            }
        } else {
            check();
            return;
        }
    }
}

function precedence(i) {
    switch (ttt[i]) {
        case '':
            if (i === 4) {
                return 4;
            }
            if (i === 0 || i === 2 || i === 6 || i === 8) {
                return 3;
            }
            if (i === 1 || i === 3 || i === 5 || i === 7) {
                return 2;
            }
        case 'X': return 0;
        case 'O': return 0;
    }
}

function check() {
    var winningPositions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    for (var i = 0; i < winningPositions.length; i++) {
        var [a, b, c] = winningPositions[i];
        if (ttt[a] && ttt[a] === ttt[b] && ttt[a] === ttt[c]) {
            if (ttt[a] === 'X') {
                alert(players[0].name + ' wins');
                log1 = document.getElementById('player_1_log').textContent = log1 + 'Won ';
                log2 = document.getElementById('player_2_log').textContent = log2 + 'Lost ';
                players[0].score++;
                t++;
                reset();
            } else if (ttt[a] === 'O') {
                alert(players[1].name + ' wins');
                log1 = document.getElementById('player_1_log').textContent = log1 + 'Lost ';
                log2 = document.getElementById('player_2_log').textContent = log2 + 'Won ';
                players[1].score++;
                t++;
                reset();
            }
            updateP1();
            updateP2();
            reset();
            return;
        }
    }

    if (!ttt.includes('')) {
        alert("It is a draw");
        log1 = document.getElementById('player_1_log').textContent = log1 + 'Draw ';
        log2 = document.getElementById('player_2_log').textContent = log2 + 'Draw ';
        t++;
        reset();
    }
}

function user_can_win() {
    for (var i = 0; i < 9; i += 3) {
        if (ttt[i + 1] === 'X') {
            if (ttt[i] === ttt[i + 1] && ttt[i + 1] !== ttt[i + 2]) {
                if (ttt[i + 2] !== 'O') {
                    return i + 3;
                }
            }
            if (ttt[i] !== ttt[i + 1] && ttt[i + 1] === ttt[i + 2]) {
                if (ttt[i] !== 'O') {
                    return i + 1;
                }
            }
        }
        if (ttt[i] === 'X') {
            if (ttt[i] === ttt[i + 2] && ttt[i] !== ttt[i + 1]) {
                if (ttt[i + 1] !== 'O') {
                    return i + 2;
                }
            }
        }
    }
    for (var i = 0; i < 3; i++) {
        if (ttt[i + 3] === 'X') {
            if (ttt[i] === ttt[i + 3] && ttt[i + 3] !== ttt[i + 6]) {
                if (ttt[i + 6] !== 'O') {
                    return i + 7;
                }
            }
            if (ttt[i] !== ttt[i + 3] && ttt[i + 3] === ttt[i + 6]) {
                if (ttt[i] !== 'O') {
                    return i + 1;
                }
            }
        }
        if (ttt[i] === 'X') {
            if (ttt[i] === ttt[i + 6] && ttt[i] !== ttt[i + 3]) {
                if (ttt[i + 3] !== 'O') {
                    return i + 4;
                }
            }
        }
    }
    if (ttt[4] === 'X') {
        if (ttt[0] === ttt[4] && ttt[4] !== ttt[8]) {
            if (ttt[8] !== 'O') {
                return 9;
            }
        }
        if (ttt[8] === ttt[4] && ttt[4] !== ttt[0]) {
            if (ttt[0] !== 'O') {
                return 1;
            }
        }
        if (ttt[2] === ttt[4] && ttt[4] !== ttt[6]) {
            if (ttt[6] !== 'O') {
                return 7;
            }
        }
        if (ttt[6] === ttt[4] && ttt[4] !== ttt[2]) {
            if (ttt[2] !== 'O') {
                return 3;
            }
        }
    }
    return 0;
}

function bot_can_win() {
    for (var i = 0; i < 9; i += 3) {
        if (ttt[i + 1] === 'O') {
            if (ttt[i] === ttt[i + 1] && ttt[i + 1] !== ttt[i + 2]) {
                if (ttt[i + 2] !== 'X') {
                    return i + 3;
                }
            }
            if (ttt[i] !== ttt[i + 1] && ttt[i + 1] === ttt[i + 2]) {
                if (ttt[i] !== 'X') {
                    return i + 1;
                }
            }
        }
        if (ttt[i] === 'O') {
            if (ttt[i] === ttt[i + 2] && ttt[i] !== ttt[i + 1]) {
                if (ttt[i + 1] !== 'X') {
                    return i + 2;
                }
            }
        }
    }
    for (var i = 0; i < 3; i++) {
        if (ttt[i + 3] === 'O') {
            if (ttt[i] === ttt[i + 3] && ttt[i + 3] !== ttt[i + 6]) {
                if (ttt[i + 6] !== 'X') {
                    return i + 7;
                }
            }
            if (ttt[i] !== ttt[i + 3] && ttt[i + 3] === ttt[i + 6]) {
                if (ttt[i] !== 'X') {
                    return i + 1;
                }
            }
        }
        if (ttt[i] === 'O') {
            if (ttt[i] === ttt[i + 6] && ttt[i] !== ttt[i + 3]) {
                if (ttt[i + 3] !== 'X') {
                    return i + 4;
                }
            }
        }
    }
    if (ttt[4] === 'O') {
        if (ttt[0] === ttt[4] && ttt[4] !== ttt[8]) {
            if (ttt[8] !== 'X') {
                return 9;
            }
        }
        if (ttt[8] === ttt[4] && ttt[4] !== ttt[0]) {
            if (ttt[0] !== 'X') {
                return 1;
            }
        }
        if (ttt[2] === ttt[4] && ttt[4] !== ttt[6]) {
            if (ttt[6] !== 'X') {
                return 7;
            }
        }
        if (ttt[6] === ttt[4] && ttt[4] !== ttt[2]) {
            if (ttt[2] !== 'X') {
                return 3;
            }
        }
    }
    return 0;
}

function reset() {
    for (var i = 0; i < 9; i++) {
        document.getElementById('cell' + (i + 1)).innerText = '';
        ttt[i] = '';
    }
    p = 0;
    chance = 0;
    var P1_chance = document.getElementById('player_1_chance').textContent = "Your chance";
    var P2_chance = document.getElementById('player_2_chance').textContent = "";
}

document.getElementById('start').addEventListener('click', startGame);

document.getElementById('end').addEventListener('click', function () {
    location.reload();
});
