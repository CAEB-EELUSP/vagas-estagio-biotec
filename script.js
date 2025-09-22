// --- Inicialização do mapa ---
const sudesteBounds = L.latLngBounds(
  [
    [-25.5, -52.0], // canto sudoeste
    [-17.0, -38.0]  // canto nordeste
  ]
);

const map = L.map('map', {
  maxBounds: sudesteBounds,
  maxBoundsViscosity: 1.0,
  minZoom: 6
});
map.fitBounds(sudesteBounds);

// --- Camada base ---
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- Ícone personalizado laranja ---
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// --- Marcadores com ícone laranja ---
L.marker([-23.55, -46.63], { icon: orangeIcon }).addTo(map)
  .bindPopup("<b>São Paulo</b><br>Capital do estado de SP");

L.marker([-22.90, -43.20], { icon: orangeIcon }).addTo(map)
  .bindPopup("<b>Rio de Janeiro</b><br>Capital do estado do RJ");

L.marker([-19.92, -43.94], { icon: orangeIcon }).addTo(map)
  .bindPopup("<b>Belo Horizonte</b><br>Capital de MG");

L.marker([-20.32, -40.34], { icon: orangeIcon }).addTo(map)
  .bindPopup("<b>Vitória</b><br>Capital do ES");

// --- (Opcional) Desenhar os estados do Sudeste ---
fetch("sudeste.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "blue",
        weight: 2,
        fillOpacity: 0.05
      }
    }).addTo(map);
  });

