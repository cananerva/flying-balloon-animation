class Kus {
  constructor() {
    this.x = random(width);
    this.y = random(-1000, height);
    this.xHiz = random(1, 2); // Sağa doğru uçuş
    this.yHiz = 0.5;
    this.kanatAcisi = 0.2;   // Başlangıç kanat açısı
    this.yon = 0.02;         // Kanat çırpma yönü
  }

  guncelle() {
    this.x += this.xHiz;
    this.y += this.yHiz;

    // Kanat çırpma hareketi
    this.kanatAcisi += this.yon;
    if (this.kanatAcisi > 0.5 || this.kanatAcisi < 0.1) {
      this.yon *= -1;
    }

    // Ekran dışına çıkarsa yeniden başlat
    if (this.x > width + 30) {
      this.x = -30;
      this.y = balon.y - random(300, 600);
    }
    if (this.y > balon.y + height / 2 + 100) {
      this.y = balon.y - random(300, 600);
      this.x = random(width);
    }
  }

  goster() {
    stroke(0);
    strokeWeight(2);
    noFill();
    push();
    translate(this.x, this.y);
    let uzunluk = 20;
    let aci = this.kanatAcisi;

    // Kanatlar
    line(0, 0, -uzunluk * cos(aci), -uzunluk * sin(aci));
    line(0, 0, uzunluk * cos(aci), -uzunluk * sin(aci));
    pop();
  }
}
