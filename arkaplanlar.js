//arka plan çiziminin ayarlamaları
function drawBackground(index, balonY) {
  // Uzay efekti çok daha geç gelsin (28. saniye civarı)
  if (balonY < -2500) {
    // Renkler balonY konumuna göre yavaş yavaş karartılır (gece efekti) yani yukarı çıktıkça kararır
    let geceR = map(balonY, -2500, -3000, 10, 0, true);
    let geceG = map(balonY, -2500, -3000, 10, 0, true);
    let geceB = map(balonY, -2500, -3000, 40, 0, true);
    background(geceR, geceG, geceB);
    // Bol yıldızlı uzay görünümü
    drawStars(true);
    return;
  }
//5 farklı temaya göre farklı arka planların çizilmesi
  switch (index) {
    case 0:
      background(135, 206, 235); // Gündüz
      break;
    case 1:
      background(10, 10, 40); // Gece
      drawStars();
      break;
    case 2:
      background(252, 157, 3); // Gün batımı
      fill(255, 140, 0, 100);
      ellipse(width / 2, height / 2, 200, 100);
      break;
    case 3:
      background(200); // Kar
      drawSnow();
      break;
    case 4:
      background(100, 100, 120); // Yağmur
      drawRain();
      break;
  }
}

//Yıldız ayarları
function drawStars(bol = false) {
  let adet = bol ? 200 : 80;
  for (let i = 0; i < adet; i++) {
    let y = yildizlar[i];
    fill(255);
    noStroke();
    ellipse(y.x, y.y, y.size);

    if (calisiyor) {
      y.y += 0.3;

      if (y.y > height) {
        y.y = 0;
        y.x = random(width);
      }
    }
  }
}



// kar ayarları
let snowflakes = [];

function drawSnow() {
  if (calisiyor && frameCount % 5 === 0) {
    snowflakes.push({ x: random(width), y: 0, size: random(2, 5) });
  }

  fill(255);
  for (let f of snowflakes) {
    if (calisiyor) {
      f.y += 1;
    }
    ellipse(f.x, f.y, f.size);
  }

  snowflakes = snowflakes.filter(f => f.y < height);
}
//yağmur ayarları
let raindrops = [];

function drawRain() {
  stroke(173, 216, 230);

  if (calisiyor && frameCount % 2 === 0) {
    raindrops.push({ x: random(width), y: 0, len: random(10, 20) });
  }

  for (let r of raindrops) {
    if (calisiyor) {
      r.y += 5;
    }
    line(r.x, r.y, r.x, r.y + r.len);
  }

  raindrops = raindrops.filter(r => r.y < height);
  noStroke();
}

