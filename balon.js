//balon ayarları
class Balon {
  //balonun konumu
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hiz = 1.5;
  }

  hareket() {
    this.y -= this.hiz;
  }

  goster() {
    push();
    translate(this.x, this.y);

    // Balon gövdesi
    fill(balonRenk);
    stroke(0);
    strokeWeight(1.5);
    ellipse(0, 0, 40, 50);

    // Sepet
    fill(100);
    rectMode(CENTER);
    rect(0, 40, 15, 15);

    // İpler
    stroke(0);
    line(-10, 20, -5, 32);
    line(10, 20, 5, 32);
    pop();
  }
}
