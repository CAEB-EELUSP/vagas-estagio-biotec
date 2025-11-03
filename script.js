// Limites do Sudeste
const sudesteBounds = L.latLngBounds([[-25.5, -52.0], [-17.0, -38.0]]);

// Inicializa o mapa travado na região Sudeste
const map = L.map('map', { maxBounds: sudesteBounds, maxBoundsViscosity: 1.0 });
map.fitBounds(sudesteBounds);
map.setMinZoom(map.getBoundsZoom(sudesteBounds));

// Camada base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Ícone laranja personalizado
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

// Marcadores de exemplo
L.marker([-23.55, -46.63], { icon: orangeIcon }).addTo(map).bindPopup('<b>São Paulo</b>');
L.marker([-22.90, -43.20], { icon: orangeIcon }).addTo(map).bindPopup('<b>Rio de Janeiro</b>');
L.marker([-19.92, -43.94], { icon: orangeIcon }).addTo(map).bindPopup('<b>Belo Horizonte</b>');
L.marker([-20.32, -40.34], { icon: orangeIcon }).addTo(map).bindPopup('<b>Vitória</b>');

