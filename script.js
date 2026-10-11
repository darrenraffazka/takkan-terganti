const lirik = [
  'Meski waktu datang dan berlalu sampai kau tiada bertahan', 
  'Semua tak kan mampu mengubahku',
  'Hanyalah kau yang ada di relungku',
  'Hanyalah dirimu mampu membuatku jatuh dan mencinta',
  'Kau bukan hanya sekedar indah',
  'Kau tak akan terganti'
];

const akhir = [6, 10, 15, 23, 26, 33];
const awal = [0, ...akhir.slice(0, -1)]; // 0, 6, 10, 15, 23, 26
const geser = 1.5;

const text = document.getElementById('text');
const lagu = document.getElementById('lagu');
const bg = document.getElementById('bg');
const tombol = document.getElementById('mulai');

let barisSekarang = -1;
let timer;

function tampilkan(idx) {
  clearTimeout(timer);
  barisSekarang = idx;
  text.style.opacity = 1;
  text.textContent = '';

  const durasi = (akhir[idx] - awal[idx]) * 1000;
  const kecepatan = (durasi * 0.85) / Math.max(lirik[idx].length, 1);
  let i = 0;

  function ketik() {
    if (i < lirik[idx].length) {
      text.textContent += lirik[idx].charAt(i);
      i++;
      timer = setTimeout(ketik, kecepatan);
    }
  }
  ketik();
}

lagu.addEventListener('timeupdate', () => {
  const t = lagu.currentTime - geser;
  if (t < 0) return;
  const idx = akhir.findIndex(batas => t < batas);

  // lewat detik 33: bersihin teks
  if (idx === -1) {
    clearTimeout(timer);
    text.textContent = '';
    barisSekarang = -1;
    return;
  }

  // pindah ke baris baru
  if (idx !== barisSekarang) tampilkan(idx);

  // fade out di 0,5 detik terakhir tiap baris
  if (t > akhir[idx] - 0.5) text.style.opacity = 0;
});

tombol.onclick = () => {
  tombol.style.display = 'none';
  bg.play();
  lagu.play();
};
