// Definir limites do Sudeste
const sudesteBounds = L.latLngBounds([
  [-25.5, -52.0], // canto sudoeste
  [-17.0, -38.0]  // canto nordeste
]);

// Criar mapa dentro dos limites
const map = L.map('map', {
  maxBounds: sudesteBounds,
  maxBoundsViscosity: 1.0
});
map.fitBounds(sudesteBounds);
map.setMinZoom(map.getBoundsZoom(sudesteBounds));

// Adicionar camada de tiles do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Ícone laranja personalizado
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Exemplos de marcadores no Sudeste
L.marker([-23.55, -46.63], { icon: orangeIcon }).addTo(map)
  .bindPopup("São Paulo");

L.marker([-22.90, -43.20], { icon: orangeIcon }).addTo(map)
  .bindPopup("Rio de Janeiro");

L.marker([-19.92, -43.94], { icon: orangeIcon }).addTo(map)
  .bindPopup("Belo Horizonte");

L.marker([-22.90, -47.06], { icon: orangeIcon }).addTo(map)
  .bindPopup("Campinas");
