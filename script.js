// Cria o mapa e centraliza no Sudeste
const map = L.map('map').setView([-22.0, -43.0], 6);

// Adiciona o mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 🔹 Limitar a área só ao Sudeste
const sudesteBounds = [
  [-25.5, -52.0], // canto inferior esquerdo (Paraná/SP)
  [-17.0, -38.0]  // canto superior direito (Minas/ES)
];

// Aplica os limites
map.setMaxBounds(sudesteBounds);
map.fitBounds(sudesteBounds);

// Agora você pode adicionar marcadores normalmente
L.marker([-23.55, -46.63]).addTo(map)
  .bindPopup("São Paulo - exemplo");

L.marker([-22.90, -43.20]).addTo(map)
  .bindPopup("Rio de Janeiro - exemplo");
