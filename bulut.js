//bulut ayarları
class Bulut {
  constructor() {
    this.x = random(width);
    this.y = random(-1000, height);
    this.xHiz = random(0.3, 1);
    this.yHiz = 0.5;
  }

  guncelle() {
    this.x += this.xHiz;
    this.y += this.yHiz;

    if (this.x > width + 50) this.x = -50;

    if (typeof balon !== "undefined" && this.y > balon.y + height / 2 + 100) {
      this.y = balon.y - random(300, 600);
      this.x = random(width);
    }
  }
//bulutun çizgi filmlerdeki görüntüsünü elde etmek için şekil verilmesi
  goster() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 40, 40);
    ellipse(this.x + 20, this.y + 10, 40, 40);
    ellipse(this.x - 20, this.y + 10, 40, 40);
  }
}
