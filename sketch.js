// NOT: Ses dosyalarının yüklenmesi zaman aldığı için animasyon biraz geç başlayabilir.

// PROJE GENEL ÖZET
// 5 farklı arka plan teması ve her temaya ait 5 farklı ses bulunmakta. (güneşli gün, gün batımı, yağmur, kar, gece)
// Sağ ve sol ok tuşları ile temalar arasında geçiş yapılabilir.
// Proje başlarken 2 saniyelik bir “Yükleniyor...” ekranı gösterilir.
// Sol üst köşedeki ayarlar simgesi üzerinden müzik açılıp kapatılabilir ve balonun rengi seçilebilir (kırmızı, mavi, sarı).
// Renk seçici menüsünün yanındaki buton ile ekran görüntüsü kaydedilebilir.
// SPACE tuşuna veya fare sol tuşuna basılarak animasyon duraklatılıp devam ettirilebilir.
// Sağ üst köşede geçen süreyi gösteren bir sayaç bulunur.
// Arka planda kuşlar ve bulutlar sürekli hareket eder.
// Sol alt köşedeki soru işareti simgesi ile yardım menüsü açılabilir.
// Balon yukarı doğru yükseldikçe tema uzay temasına dönüşerek uzaya ulaşıldığında animasyon son bulur.



// Ana değişkenlerin tanımlanması
let balon;
let bulutlar = [];
let kuslar = [];
let sayac;
let calisiyor = true;
let ucusBitti = false;
let temaIndex = 0;
let uzayModu = false;
let yildizlar = [];

let ayarAcik = false;
let muzikAcik = true;
let renkAcik = false;
let yardimAcik = false;
let balonRenk = 'red';

let ssAlindi = false;
let ssZamani = 0;
let yukleniyor = true;

let sesler = [];
let aktifTema = -1;

//ses dosyalarının yüklenmesi
function preload() {
  soundFormats('mp3');
  sesler[0] = loadSound("sunny-day-outside-dia-soleado-exterior-6858.mp3");
  sesler[1] = loadSound("city-night-crickets-24013.mp3");
  sesler[2] = loadSound("ambience-at-sunset-17826.mp3");
  sesler[3] = loadSound("desert-wind-2-350417.mp3");
  sesler[4] = loadSound("light-rain-109591.mp3");
}

function setup() {
  createCanvas(360, 640); //tuval boyutu
  balon = new Balon(width / 2, height);
  for (let i = 0; i < 6; i++) bulutlar.push(new Bulut()); //bulutların oluşturulması
  for (let i = 0; i < 4; i++) kuslar.push(new Kus()); //kuşların oluşturulması
  sayac = new Sayac();
  
// Kullanıcının sesi açması
  userStartAudio().then(() => temaSesiYonet(temaIndex));

  // Uzay yıldızları
  for (let i = 0; i < 200; i++) {
    yildizlar.push({ x: random(width), y: random(height), size: random(1, 3) });
  }

  // 2 saniyelik "Yükleniyor" ekranı
  setTimeout(() => {
    yukleniyor = false;
  }, 2000);
}

function draw() {
  if (yukleniyor) {
    background(0);

    // Yükleniyor yazısı
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Yükleniyor...", width / 2, height / 2 - 20);

    // Dönen daire animasyonu
    push();
    translate(width / 2, height / 2 + 20);
    rotate(frameCount * 0.15);
    stroke(255);
    noFill();
    strokeWeight(3);
    arc(0, 0, 30, 30, 0, PI * 1.5);
    pop();

    return;
  }

// balon yeterince yükselince uzay moduna geçilmesi
  if (balon.y < -3000 && !uzayModu) {
    uzayModu = true;
    calisiyor = false;
    if (sesler[temaIndex]?.isPlaying()) sesler[temaIndex].stop();
  }

  drawBackground(temaIndex, balon.y);

  if (!uzayModu) temaSesiYonet(temaIndex);

  //ekranın balonla hareket etmesi
  push();
  translate(0, height / 2 - balon.y);

  //bulutların çizimi
  for (let b of bulutlar) {
    if (calisiyor && !uzayModu) b.guncelle();
    b.goster();
  }
  //kuşların çizimi
  for (let k of kuslar) {
    if (calisiyor && !uzayModu) k.guncelle();
    k.goster();
  }
  //balonun çizimi ve haraket etmesi
  if (calisiyor && !uzayModu && !ucusBitti) balon.hareket();
  balon.goster();
  pop();
  //sayaçın gözükmesi ve güncellenmesi
  if (calisiyor && !uzayModu) sayac.guncelle();
  if (!uzayModu) sayac.goster();

  if (uzayModu) {
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Uzaya ulaşıldı!", width / 2, height / 2 - 40);

    fill(255, 50, 50);
    rect(width / 2 - 75, height / 2, 150, 40, 10);
    fill(255);
    textSize(16);
    text("Yeniden Başlat", width / 2, height / 2 + 20);
  }
  //durduruldu mesajının verilmesi
  if (!calisiyor && !uzayModu) {
    fill(0, 150);
    noStroke();
    rect(width / 2 - 100, height - 70, 200, 40, 12);
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("⏸ Durduruldu", width / 2, height - 50);
  }
//arayüzün çizimi
  drawUI();
}

function drawUI() {
  drawButton(10, 10, "⚙️"); //ayarlar(sesin açılması ve kapatılması)
  drawButton(50, 10, "🎨"); // renk seçimi
  drawButton(90, 10, "🖼️"); //SS
  drawButton(10, height - 40, "❓"); //yardım(üsteki simgelerin ne işe yaradığı)
//ses ayarları
  if (ayarAcik) {
    fill(0, 180);
    rect(10, 50, 120, 40, 6);
    fill(255);
    textSize(12);
    textAlign(LEFT, CENTER);
    text("Müzik: " + (muzikAcik ? "Açık" : "Kapalı"), 20, 70);
  }
//renk ayarları
  if (renkAcik) {
    fill(0, 180);
    rect(50, 50, 100, 70, 6);
    fill(255);
    textSize(12);
    textAlign(LEFT, CENTER);
    text("Kırmızı", 60, 60);
    text("Mavi", 60, 80);
    text("Sarı", 60, 100);
  }
//kaydetme
  if (ssAlindi && millis() - ssZamani < 2000) {
    fill(0, 150);
    noStroke();
    rect(width / 2 - 100, height - 60, 200, 40, 10);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("📸 Ekran kaydedildi!", width / 2, height - 40);
  }
//yardım ayarları
  if (yardimAcik) {
    fill(0, 220);
    noStroke();
    rect(50, height - 170, 260, 150, 10);
    fill(255);
    textSize(12);
    textAlign(LEFT, TOP);
    text("⚙️ Ayarlar: Müzik aç/kapat\n🎨 Renk: Balon rengini seç\n🖼️ SS: 'S' tuşu veya buton ile al", 60, height - 160);
  }
}

function drawButton(x, y, icon) {
  fill(50);
  noStroke();
  rect(x, y, 30, 30, 6);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(icon, x + 15, y + 15);
}
//temaya göre ses kontrolü
function temaSesiYonet(index) {
  if (index !== aktifTema) {
    if (sesler[aktifTema]?.isPlaying()) sesler[aktifTema].stop();
    if (muzikAcik && !sesler[index]?.isPlaying()) sesler[index].loop();
    aktifTema = index;
  }
}
//tuş kontrolleri
function keyPressed() {
  if (keyCode === LEFT_ARROW && !uzayModu) temaIndex = (temaIndex + 1) % 5;
  if (keyCode === RIGHT_ARROW && !uzayModu) temaIndex = (temaIndex - 1 + 5) % 5;
  temaSesiYonet(temaIndex);

  if (key === 's' || key === 'S') {
    saveCanvas('balon', 'png');
    ssAlindi = true;
    ssZamani = millis();
  }

  //  Boşluk tuşu ile başlat/durdur
  if (key === ' ') {
    if (!uzayModu) {
      calisiyor = !calisiyor;

      if (calisiyor) {
        sayac.devamEt();
        if (muzikAcik && !sesler[temaIndex]?.isPlaying()) {
          sesler[temaIndex].loop();
        }
      } else {
        sayac.durdur();
        if (sesler[temaIndex]?.isPlaying()) {
          sesler[temaIndex].pause();
        }
      }
    }
  }
}

//fare ayarlamaları
function mousePressed() {
  if (uzayModu && mouseX > width / 2 - 75 && mouseX < width / 2 + 75 && mouseY > height / 2 && mouseY < height / 2 + 40) {
    window.location.reload();
    return;
  }

  // UI butonları kontrolü
  if (mouseX > 10 && mouseX < 40 && mouseY > 10 && mouseY < 40) {
    ayarAcik = !ayarAcik;
    renkAcik = false;
    yardimAcik = false;
    return;
  }
  if (mouseX > 50 && mouseX < 80 && mouseY > 10 && mouseY < 40) {
    renkAcik = !renkAcik;
    ayarAcik = false;
    yardimAcik = false;
    return;
  }
  if (mouseX > 90 && mouseX < 120 && mouseY > 10 && mouseY < 40) {
    saveCanvas('balon', 'png');
    ssAlindi = true;
    ssZamani = millis();
    return;
  }
  if (mouseX > 10 && mouseX < 40 && mouseY > height - 40 && mouseY < height - 10) {
    yardimAcik = !yardimAcik;
    ayarAcik = false;
    renkAcik = false;
    return;
  }

  // Müzik ayarı
  if (ayarAcik && mouseX > 10 && mouseX < 130 && mouseY > 50 && mouseY < 90) {
    muzikAcik = !muzikAcik;
    if (!muzikAcik) sesler[temaIndex]?.pause();
    else sesler[temaIndex]?.loop();
    return;
  }

  // Balon rengi
  if (renkAcik && mouseX > 50 && mouseX < 150) {
    if (mouseY > 50 && mouseY < 70) balonRenk = 'red';
    else if (mouseY > 70 && mouseY < 90) balonRenk = 'blue';
    else if (mouseY > 90 && mouseY < 110) balonRenk = 'yellow';
    return;
  }

  // Animasyonun başlatılması durdurulması
  if (!uzayModu) {
    calisiyor = !calisiyor;

    if (calisiyor) {
      sayac.devamEt(); // sayacın devam etmesi
      if (muzikAcik && !sesler[temaIndex]?.isPlaying()) {
        sesler[temaIndex].loop();
      }
    } else {
      sayac.durdur(); // sayacın durması
      if (sesler[temaIndex]?.isPlaying()) {
        sesler[temaIndex].pause();
      }
    }
  }
}
