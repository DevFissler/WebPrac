const WIDTH = 600;
const HEIGHT = 300;

let character = $("#ma");
let gang = $("#gang");
let attack = $("#punch");
let charchoice =0;

//상태
let isJumping = false;
let isGameOver = false;
let isbullet = false; 
let ganghide = true;
let Score = 0;

function jump() {
    if (isJumping) {
        return;
    }

    isJumping = true;
    character.animate({ bottom: "+=100px" }, 200)
        .animate({ bottom: "-=100px" }, 200, function () {
            isJumping = false;
        });
}

function moveGang() {

    charchoice=Math.floor((Math.random()*4)+1);

    if(charchoice ==1 ){
        gang=$('#zhang');
    } else if (charchoice ==2){
        gang=$('#gang');
    } else if (charchoice ==3){
        gang=$('#isu');
    } else {
        gang=$('#capt');
    }
    console.log(charchoice);
    gang.show();
    let gangSpeed = (Math.floor((Math.random()*2)+1))  * 1000;
    gang.animate({ right: "120%" }, gangSpeed, function () {
        gang.css({ right: "-100px" });

        if (isGameOver == false) {
            setTimeout(moveGang, 1000);
            Score += 50;
            document.getElementById("totalscore").innerHTML = "    : " + Score;
        }
    });
}

function shootAttack() {
    if (isbullet) {
        return;
    }
    
    isbullet=true;
    attack.show();
    attack.animate({ left: "120%" }, 2000, function () {
        attack.css({ left: "110px" });
        attack.hide();
        isbullet = false;
    });
}

function gangDead() {
    const gangLeft = gang.offset().left;
    const attackRight = attack.offset().left + 50;

    if (gangLeft <= attackRight && gangLeft > 0) {
        $("#bomb") // 폭발 이펙트
            .css({ left: `${gang.offset().left}px` })
            .fadeIn(500)
            .fadeOut(500);
        gang.hide(); 
        ganghide = true;
        attack.hide(); 
        if(charchoice<=2){
            Score +=200;
        } else {
            isGameOver=true;
        }
    }

    if (attackRight > 600) 
        isbullet = false;
}

function maDead() {

    let gangLeft = parseInt(gang.css("left").replace("px", ""));
    let maLeft = parseInt(character.css("left").replace("px", ""));
    let maRight = maLeft + 100;

    if (isJumping == false && maRight > gangLeft && gangLeft > maLeft) {
        isGameOver = true;
    }
}

function gameOver() {
    isGameOver = true;
    gang.stop();
    gang.hide();
    document.getElementById("totalscore").innerHTML = "    : 0";

    //게임 오버 관련 화면 보여주기
    $(".gameover").show();
    $(".start").hide();
    $("#handcuff").hide();
    $("#totalscore").hide();
    $("#ma").hide();
    $("#punch").hide();
    $("#bomb").hide();

}

function gameStart() {
    Score = 0;
    $("#handcuff").hide();
    $(".gameover").hide();
    $(".start").hide();
    $("#container").show();
    $("#totalscore").show();
    $("#ma").show();
    $("#punch").hide();
    $("#bomb").hide();

    isGameOver = false;

    gang.css({ right: "-100px" })
    
}

$("body").keydown(function (event) {
    
    switch (event.key) {
        case " ":
            jump();
            break;
        case "Control" :       
            shootAttack();
            break;
        }
});

$(".game_start_button").click(function () {
    Score = 0;
    gameStart();
    $("#handcuff").show();       
    $("#totalscore").show();      

});

function game() {
    setTimeout(moveGang, 1000);
            // 게임 화면 그리기 30frame
    setInterval(function () {

        if (isGameOver == true) {
            gameOver();
        } else {
            maDead();
            if(isbullet)
                gangDead();
        }
    }, 1000 / 30);
}

$(function () {
    Score = 0
    gameStart();
    $(".start").show();
    $(".game_start_button").click(function () {
        game();
    });
})
