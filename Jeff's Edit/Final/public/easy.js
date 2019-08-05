var text, temp, time, timer, words;
var size, counter, error;
var list = ["The growth of commercial agriculture which began with the tobacco monopoly was greatly accelerated by the rising demands of other exports products. Not only that, the Philippines economy growth also increase their foreign trade as well.",
            "On the other hand, this led to a social changes in Philippines where some Filipinos were able to get a proper education and some others were able to raise their capitals, becoming rich, and this was the time where the Filipinos realized that they are not inferior to the Spaniards.",
            "From this point onwards, the educated Filipinos were beginning to express reactions to the criticism of colonial arrangements.",
            "At first, what Spaniards did were according to what they had promised.",
            "However, these improvements could not be achieved through peaceful means. There must be a revolution.",
            "Although most of the Filipinos were remain loyal to the Spaniards, the Spaniards realized that they couldn't stay hidden inside the wall of Intramuros any longer.",
            "Short story, the Spaniards were able to recover the Philippines."];

document.addEventListener('keypress', function(e) {
    $("#inputText").css({'color':'rgb(255, 110, 236)'});
    if(e.keyCode == 13) {
        e.preventDefault();
    }
    if(getIndex() + words[counter].length == size) {
        if(words[counter].substring(0, words[counter].length - 1) == $("#inputText").val().substring(0, words[counter].length) && words[words.length - 1].charCodeAt([words[words.length - 1].length - 1]) == e.keyCode) {
			$('input[type="text"]').prop("disabled", true);
            e.preventDefault();
            $("#inputText").val('');
            $("#mainText").text(text);
            finish();
        }
    }
    if(e.keyCode == 32) {
        if(words[counter] == $("#inputText").val()) {
			e.preventDefault();
            counter++;
            $("#inputText").val('');
            init();
        } else {
            error++;
            $("#inputText").css({'color':'#F44336'});
        }
        marking();
    }
})

function start() {
    // console.log(data);
    $('input[type="text"]').prop("disabled", true);
    countdown();
    init();
}

function countdown() {
    var ctr = 5;
    var down = setInterval(function() {
        if(ctr > 0) {
            $("#countDown").css({'visibility':'visible'});
            $("#count").text(ctr);
            ctr--;
        } else {
            randomize(1);
            $("#count").text("GO!");
            clearInterval(down);
            $("#count").text("");
            $("#countDown").css({'visibility':'hidden'});
        }
    }, 1000);
}

function startGame() {
    timer = setInterval(function() {
        setInterval(convertTime(), 1000);
    }, 1000);
}

function convertTime() {
    var newTime;
    if(time < 60) {
        newTime = "00:" + digits(time);
    } else {
        newTime = digits(Math.trunc(time/60)) + ":" + digits(time % 60);
    }
    $("#time").text(newTime);
    time++;
}

function digits(num) {
    return num > 9 ? "" + num: "0" + num;
}

function init() {
    $("#showStats").css("visibility","hidden");
}

function marking() {
    var mark = document.getElementById("mainText");
    mark.innerHTML = words.join(" ");
    var innerHTML = mark.innerHTML;
    if(counter == 0) {
        innerHTML = "<span class='highlight'>" + innerHTML.substring(0, getIndex() + words[counter].length - 1) + "</span> " + innerHTML.substring(getIndex() + words[counter].length);
    } else {
        innerHTML = "<span class='done'>" + innerHTML.substring(0, getIndex()) + "</span><span class='highlight'>" + innerHTML.substring(getIndex(), getIndex() + words[counter].length) + "</span>" + innerHTML.substring(getIndex() + words[counter].length);
    }
    mark.innerHTML = innerHTML;
}

function getIndex() {
    return words.slice(0, counter).join(" ").length + 1;
}

function finish() {
    clearInterval(timer);
    timer = null;
    $("#wpmStat").text(getTime(words.length));
    $("#accuracyStat").text(getAccuracy() + "%");
    $("#timeStat").text(digits(Math.trunc(time/60)) + ":" + digits(time % 60));
    $("#showStats").css("visibility","visible");
}

function getTime(num) {
    return ((num/time)*60).toFixed(2);
}

function getAccuracy() {
    return ((size-error)*100/size).toFixed(2);
}

function randomize(num) {
    if(num != 1) {
        num = 0;
    }
    counter = 0;
    error = 0;
    time = num;
    while(temp == text) {
        text = list[Math.floor(Math.random() * list.length)]
        if(temp != text) {
            $("#mainText").text(text);
            size = text.length;
        }
    }
    temp = text;
    words = $.trim($("#mainText").text()).split(" ");
    marking();
    $('input[type="text"]').prop("disabled", false);
    $("#time").text("00:00");
    $("#time").css({'visibility':'visible'});
    startGame();
    init();
}

function restart() {
    location.reload();
}