//süre ayarları
class Sayac {
  constructor() {
    this.baslangicZamani = millis();
    this.gecenSure = 0;
    this.durdurmaZamani = 0;
    this.durduruldu = false;
  }
// animasyon durdurulduğunda da zamanın kaydedilmesi
  durdur() {
    if (!this.durduruldu) {
      this.durdurmaZamani = millis();
      this.durduruldu = true;
    }
  }
//sayaç devam ettirildiğinde durdurulma süresinin eklenmesi
  devamEt() {
    if (this.durduruldu) {
      const durmaSuresi = millis() - this.durdurmaZamani;
      this.baslangicZamani += durmaSuresi;
      this.durduruldu = false;
    }
  }
// Sürekli olarak geçen sürenin güncellenmesi
  guncelle() {
    if (!this.durduruldu) {
      this.gecenSure = floor((millis() - this.baslangicZamani) / 1000);
    }
  }
//sürenin ekrana yazdırılması
  goster() {
    fill(0);
    textSize(16);
    textAlign(RIGHT, TOP);
    text("Süre: " + this.gecenSure + " sn", width - 10, 10);
  }
}
