
cusor = '+';

count = 0;

mess = 'Happy birthday to you! <br/>'
+ 'Chúc em gái dễ thương của anh luôn luôn xinh đẹp, may mắn trong công việc và có một tình yêu đẹp nha ^^ <br/>'
+' Biết em dù chưa lâu nhưng mà anh quý em lắm đấy hehe <br/>'
+'Luôn xinh đẹp nha bé....<br/>'
+ '<a>Nhấn vào <a href="page.html" id="nextpage">đây</a> nè ^^</a>';

function type() {

    if (cusor == '_') cusor = ' '; else cusor = '_';
    $('#bg').css("-webkit-filter","blur(6px)");
    document.getElementById('scr').innerHTML = mess.substring(0, count++) + cusor;

    if (count <= mess.length) setTimeout("type()", 100);
    
}
$(document).ready(function () {
    $("#xem").on('click', function () {
        $(".bam").hide();
        const element = document.querySelector('img.btnxem');
        element.classList.add('oldbtn');
        $("#letter").show(200);
        setTimeout(function () {
            type();
        }, 600)

    })
})
function init() {
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion() {
  

    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/hinh/hinh.jpg',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
    }).then(function () {
        var audio = new Audio('sound/hp.mp3');
        audio.play();
        // $('#letter').show(200);
    })
}

// switch button position
function switchButton() {
    var audio = new Audio('sound/duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}
// move random button póition
function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function () {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#yes').click(function () {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            })
        }
    })
})

$('#nextpage').click(function(){
    alert('sdf');
    $('#letter').hide();
    setTimeout(function(){
        $('.content').show(200);

    },600)
})