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

// Util: gera botão com estilo inline (para não depender de CSS extra)
function btnSaibaMais(id) {
  const href = `detalhe.html?id=${encodeURIComponent(id)}`;
  return `<a href="${href}" style="
      display:inline-block;margin-top:8px;padding:8px 12px;border-radius:10px;
      background:#eb6213;color:#fff;text-decoration:none;font-weight:700
    ">Saiba mais</a>`;
}

// Carrega empresas e cria marcadores
fetch('empresas.json')
  .then(r => r.json())
  .then(empresas => {
    empresas.forEach(emp => {
      if (typeof emp.lat !== 'number' || typeof emp.lng !== 'number') return;

      const popupHtml = `
        <div style="min-width:220px">
          <strong>${emp.nome}</strong>
          <div style="margin-top:4px;color:#555">${emp.cidade || ''}</div>
          <div style="margin-top:4px;color:#333">${emp.area || ''}</div>
          ${btnSaibaMais(emp.id)}
        </div>
      `;

      L.marker([emp.lat, emp.lng], { icon: orangeIcon })
        .addTo(map)
        .bindPopup(popupHtml);
    });
  })
  .catch(err => {
    console.error('Erro ao carregar empresas.json', err);
  });

