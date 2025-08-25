// --- Inicialização do mapa ---
const sudesteBounds = L.latLngBounds(
  [
    [-25.5, -52.0], // canto sudoeste
    [-17.0, -38.0]  // canto nordeste
  ]
);

const map = L.map('map', {
  maxBounds: sudesteBounds,        // limita o arraste
  maxBoundsViscosity: 1.0,         // "gruda" nas bordas
  minZoom: 6                       // impede o zoom-out além do Sudeste
});

// Ajusta a visualização para caber no Sudeste
map.fitBounds(sudesteBounds);

// --- Camada base (OpenStreetMap) ---
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- Exemplo de marcadores ---
// São Paulo
L.marker([-23.55, -46.63]).addTo(map)
  .bindPopup("<b>São Paulo</b><br>Capital do estado de SP");

// Rio de Janeiro
L.marker([-22.90, -43.20]).addTo(map)
  .bindPopup("<b>Rio de Janeiro</b><br>Capital do estado do RJ");

// Belo Horizonte
L.marker([-19.92, -43.94]).addTo(map)
  .bindPopup("<b>Belo Horizonte</b><br>Capital de MG");

// Vitória
L.marker([-20.32, -40.34]).addTo(map)
  .bindPopup("<b>Vitória</b><br>Capital do ES");

// --- (Opcional) Desenhar os estados do Sudeste usando o GeoJSON ---
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
