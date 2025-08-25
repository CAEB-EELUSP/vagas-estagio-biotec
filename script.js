// Bounds do Sudeste
const sudesteBounds = L.latLngBounds([
  [-25.5, -52.0], // SW
  [-17.0, -38.0]  // NE
]);

// Cria/ajusta o mapa para o Sudeste
const map = L.map('map', {
  maxBounds: sudesteBounds,
  maxBoundsViscosity: 1.0
});
map.fitBounds(sudesteBounds);
map.setMinZoom(map.getBoundsZoom(sudesteBounds)); // impede zoom-out para fora do Sudeste
