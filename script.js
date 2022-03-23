const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate--tree-button');
const btnDownload = document.getElementById('downlowadBtn');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const bgColor = 'darkgrey';
/* generateButton.addEventListener('click', () => {
    console.log('Button CLicked');
}); */

function drawTree(startX, startY, len, angle, branchWidth, bgColor, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 1);
    ctx.lineTo(0, -len);
    //ctx.bezierCurveTo(10, -len/2,20, -len/2, 0, len);
    ctx.stroke();
    if (len < 5) {
        ctx.beginPath();
        ctx.arc(0, -len, 15, 0, Math.PI / 2);
        ctx.fill();
        ctx.restore();
        return;
    }

    drawTree(0, -len, len * 0.75, angle + 10, branchWidth * 0.8, bgColor, color1, color2);
    drawTree(0, -len, len * 0.75, angle - 10, branchWidth * 0.8, bgColor, color1, color2);
    ctx.restore();
}

function generateRandTree() {

    //right
    var shiftX = Math.random() * -20;
    var randAngle = Math.random() * 30;
    var randTicknes = Math.random() * 8;
    var randonSize = Math.random() * 180;
    color1 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')'
    color2 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')'

    drawTree(canvas.width / 2 + shiftX, canvas.height - 150, randonSize, randAngle, randTicknes, bgColor, color1, color2);

    //left
    shiftX = Math.random() * -20;
    randAngle = Math.random() * -30;
    randTicknes = Math.random() * 8;
    randonSize = Math.random() * 180;
    color1 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')'
    color2 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')'

    drawTree(canvas.width / 2 + shiftX, canvas.height - 150, randonSize, randAngle, randTicknes, bgColor, color1, color2);

}

function populateScreen(population) {

    ctx.globalCompositeOperation = 'destination-under'
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = population; i > 0; i--) {
        generateRandTree();
    }
}


populateScreen(2);

//generateButton.removeEventListener('click',generate);
generateButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const population = Math.random() * 8;
    populateScreen(population);
});

btnDownload.addEventListener('click', function (e) {
    console.log(canvas.toDataURL());
    const link = document.createElement('a');
    link.download = 'art' + Date.now() + '.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
});

function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(function(){
    // do something
});

ready(() => {
    setInterval(() => {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
        const population = Math.random() * 8;
        populateScreen(population);  
    },8000)
});

/* ready("DOMContentLoaded",() => {
    setInterval(1000, () => {/* 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const population = Math.random() * 8;
        populateScreen(population); 
    })
}); */