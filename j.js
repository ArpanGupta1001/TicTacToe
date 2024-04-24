var players=[
    {
        name : '',
        chance : '',
        score : 0
    },
    {
        name : '',
        chance : '',
        score : 0
    }
]
var p=0;
var chance=0;
var ttt=['','','','','','','','',''];
var log1='Game log: ';
var log2='Game log: ';
var gameTable = document.getElementById('game-table');

function startGame(){
    var P1=document.getElementById('player1').value;
    var P2=document.getElementById('player2').value;
    if(!P1 || !P2){
        alert('Enter names of both the players');
        return;
    }
    players[0].name=P1;
    players[1].name=P2;
    updateP1();
    updateP2();
    reset();
}

function updateP1(){
    var P1=document.getElementById('player_1').textContent=players[0].name+" ( Score : "+players[0].score+" )";
    if(p%2===0){
        var P1_chance=document.getElementById('player_1_chance').textContent="Your chance";
    }else{
        var P1_chance=document.getElementById('player_1_chance').textContent="";
    }
}

function updateP2(){
    var P2=document.getElementById('player_2').textContent=players[1].name+" ( Score : "+players[1].score+" )";
    if(p%2===1){
        var P2_chance=document.getElementById('player_2_chance').textContent="Your chance";
    }else{
        var P2_chance=document.getElementById('player_2_chance').textContent="";
    }
}

function Click(cell){
    if(players[0].name==='' || players[1].name===''){
        alert('Enter names of the players first to start playing');
        return;
    }
    insert(cell);
    if(chance>4){
        check();
    }
}

function insert(cell){
    if (ttt[cell - 1] === '') {
        if((p%2)===0){
            ttt[cell - 1] = 'X';
            document.getElementById('cell' + cell).innerText = 'X';
            chance++;
            p=(p%2)+1;
            updateP1();
            updateP2();
            if(chance>4){
                check();
            }
        } else {
            ttt[cell - 1] = 'O';
            document.getElementById('cell' + cell).innerText = 'O';
            chance++;
            p=(p%2)+1;
            updateP1();
            updateP2();
            if(chance>4){
                check();
            }
        }
    } else {
        alert('Cell is already filled.');
    }
}

function check(){
    for(var i=0;i<9;i=i+3){
        if(ttt[i]===ttt[i+1] && ttt[i]===ttt[i+2]){
            if(ttt[i]==='X'){
                alert(players[0].name+' wins');
                log1 = document.getElementById('player_1_log').textContent=log1+'Won ';
                log2 = document.getElementById('player_2_log').textContent=log2+'Lost ';
                players[0].score++;
                updateP1();
                updateP2();
                reset();
                return;
            } 
            if(ttt[i]==='O'){
                alert(players[1].name+' wins');
                log1 = document.getElementById('player_1_log').textContent=log1+'Lost ';
                log2 = document.getElementById('player_2_log').textContent=log2+'Won ';
                players[1].score++;
                updateP1();
                updateP2();
                reset();
                return;
            }
        }
    }
    for(var i=0;i<3;i++){
        if(ttt[i]===ttt[i+3] && ttt[i]===ttt[i+6]){
            if(ttt[i]==='X'){
                alert(players[0].name+' wins');
                log1 = document.getElementById('player_1_log').textContent=log1+'Won ';
                log2 = document.getElementById('player_2_log').textContent=log2+'Lost ';
                players[0].score++;
                updateP1();
                updateP2();
                reset();
                return;
            }
            if(ttt[i]==='O'){
                alert(players[1].name+' wins');
                log1 = document.getElementById('player_1_log').textContent=log1+'Lost ';
                log2 = document.getElementById('player_2_log').textContent=log2+'Won ';
                players[1].score++;
                updateP1();
                updateP2();
                reset();
                return;
            }
        }
    }
    if(ttt[0]===ttt[4] && ttt[4]===ttt[8]){
        if(ttt[4]==='X'){
            alert(players[0].name+' wins');
            log1 = document.getElementById('player_1_log').textContent=log1+'Won ';
            log2 = document.getElementById('player_2_log').textContent=log2+'Lost ';
            players[0].score++;
            updateP1();
            updateP2();
            reset();
            return;
        }
        if(ttt[4]==='O'){
            alert(players[1].name+' wins');
            log1 = document.getElementById('player_1_log').textContent=log1+'Lost ';
            log2 = document.getElementById('player_2_log').textContent=log2+'Won ';
            players[1].score++;
            updateP1();
            updateP2();
            reset();
            return;
        }
    }
    if(ttt[2]===ttt[4] && ttt[2]===ttt[6]){
        if(ttt[4]==='X'){
            alert(players[0].name+' wins');
            log1 = document.getElementById('player_1_log').textContent=log1+'Won ';
            log2 = document.getElementById('player_2_log').textContent=log2+'Lost ';
            players[0].score++;
            updateP1();
            updateP2();
            reset();
            return;
        }
        if(ttt[4]==='O'){
            alert(players[1].name+' wins');
            log1 = document.getElementById('player_1_log').textContent=log1+'Lost ';
            log2 = document.getElementById('player_2_log').textContent=log2+'Won ';
            players[1].score++;
            updateP1();
            updateP2();
            reset();
            return;
        }
    }
    if(!ttt.includes('')){
        alert("It is a draw");
        log1 = document.getElementById('player_1_log').textContent=log1+'Draw ';
        log2 = document.getElementById('player_2_log').textContent=log2+'Draw ';
        reset();
        return;
    }
}

function reset(){
    for(var i=0;i<9;i++){
        document.getElementById('cell' + (i+1)).innerText = '';
        ttt[i]='';
    }
    p=0;
    chance=0;
    var P1_chance=document.getElementById('player_1_chance').textContent="Your chance";
    var P2_chance=document.getElementById('player_2_chance').textContent="";
}

document.getElementById('start').addEventListener('click', startGame);

document.getElementById('end').addEventListener('click', function() {
    location.reload();
});
