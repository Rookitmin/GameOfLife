var thing = function (a, b, c, s) {
  this.state = c; 
  this.next = false;
  this.pos = createVector(a,b);
  this.size = s;
}

thing.prototype.draw = function () {
  if (this.state) {
    fill(0,0,0);
    rect(this.pos.x,this.pos.y,this.size,this.size);
  }
  else {
    fill(250,250,250);
    rect(this.pos.x,this.pos.y,this.size,this.size);
  }
};

thing.prototype.getNext = function (args) {
  var count = 0;
  count -= this.state;
  for (var i = 0; i < args.length; i++) {
    count += args[i];
  }
  if (count === 2) {
    this.next = this.state;
  }
  else if (count === 3) {
    this.next = true;
  }
  else {
    this.next = false;
  }
};

thing.prototype.update = function () {
  this.state = this.next;
  this.next = -1;
};

// thing.prototype.handlePress = function () {
//   if (this.pos.x <= x && this.pos.x + this.size >= x && this.pos.y <= y && this.pos.y + this.size >= y) {
//     this.next = !this.next;
//     this.state = this.next;
//   }
// }

var theList = [];
var n = 0;
var sS = 10;
var tW = 0;
var tH = 0;
function setup() {
  createCanvas(400, 400);
  frameRate(60);
  tW = width/sS;
  tH = height/sS;
  for (var i = 0; i < tW; i ++) {
    for (var j = 0; j < tH; j ++) {
      if (floor(random(2)) === 1) {
        n = true;
      }
      else {
        n = false;
      }
      theList[j + (i * tH)] = new thing(i * sS, j * sS, n, sS);
    }
  }
}

function draw() {
  for (var i = 0; i < theList.length; i++) {
    theList[i].draw();
    var temp = [];
    for (var n = -1; n <= 1; n++) {
      for (var m = -1; m <= 1; m++) {
        var p = i + n + (m * tH);
        var a = abs(p % tW) === 0;
        var b = abs(p % tW) === tW-1;
        var c = abs(i % tW) === 0;
        var d = abs(i % tW) === tW-1;
        if (a && d) {
          p -= tW;
        }
        if (b && c) {
          p += tW;
        }
        if (p < 0) {
          p += theList.length;
        }
        if (p >= theList.length) {
          p -= theList.length;
        }
        temp[(n+1)*3+m+1] = theList[constrain(p, 0, theList.length-1)].state;
      }
    }
    theList[i].getNext(temp);
  }
  for (i = 0; i < theList.length; i ++) {
    theList[i].update();
  }
}

// function mousePressed () {
//  for (var i = 0; i < theList.length; i++) {
//     theList[constrain(round(mouseY/sS + (mouseX/sS * tH)),0,theList.length-1)].handlePress();
//   }
// }
