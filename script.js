// ====== Configuração do mapa (Sudeste travado) ======
const sudesteBounds = L.latLngBounds([[-25.5, -52.0], [-17.0, -38.0]]);
const map = L.map('map', { maxBounds: sudesteBounds, maxBoundsViscosity: 1.0 });
map.fitBounds(sudesteBounds);
map.setMinZoom(map.getBoundsZoom(sudesteBounds));

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Ícone laranja para os marcadores
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

// ====== Estado global dos dados/marcadores ======
let EMPRESAS = [];          // lista original carregada do JSON
let MARKERS = [];           // { emp, marker, areas[] }
let ALL_AREAS = [];         // lista deduplicada de áreas
const filtersAreaEl = document.getElementById('filters-area');

// ====== Helpers de "área" ======
// Aceita emp.area como string ("Fermentação • Enzimas, Downstream") ou emp.areas como array.
function parseAreas(emp) {
  if (Array.isArray(emp.areas)) {
    return emp.areas.map(a => String(a).trim()).filter(Boolean);
  }
  if (emp.area) {
    return String(emp.area)
      .split(/[,;|•\/]/g)
      .map(a => a.trim())
      .filter(Boolean);
  }
  return [];
}
function uniq(arr) {
  return [...new Set(arr)];
}

// ====== UI: render dos filtros de área ======
function renderAreaFilters(areas) {
  filtersAreaEl.innerHTML = '';

  // "Selecionar todos"
  const allId = 'area__todos';
  filtersAreaEl.insertAdjacentHTML('beforeend', `
    <label class="filterItem" for="${allId}">
      <input type="checkbox" id="${allId}" checked />
      <span>Todos</span>
    </label>
  `);

  areas.forEach((area, idx) => {
    const id = `area__${idx}`;
    filtersAreaEl.insertAdjacentHTML('beforeend', `
      <label class="filterItem" for="${id}">
        <input type="checkbox" id="${id}" data-area="${area}" checked />
        <span>${area}</span>
      </label>
    `);
  });

  // listeners
  const allCb = document.getElementById(allId);
  allCb.addEventListener('change', () => {
    const checks = filtersAreaEl.querySelectorAll('input[type="checkbox"][data-area]');
    checks.forEach(cb => (cb.checked = allCb.checked));
    applyFilters();
  });

  const itemCbs = filtersAreaEl.querySelectorAll('input[type="checkbox"][data-area]');
  itemCbs.forEach(cb => {
    cb.addEventListener('change', () => {
      const allChecked = [...itemCbs].every(x => x.checked);
      allCb.checked = allChecked;
      applyFilters();
    });
  });

  // botão "Limpar filtros"
  const btnLimpar = document.getElementById('btnLimpar');
  if (btnLimpar) {
    btnLimpar.onclick = () => {
      allCb.checked = true;
      itemCbs.forEach(cb => (cb.checked = true));
      applyFilters();
    };
  }
}

// ====== Aplicar filtros no mapa ======
function applyFilters() {
  // áreas selecionadas
  const selected = [...filtersAreaEl.querySelectorAll('input[type="checkbox"][data-area]:checked')]
    .map(cb => cb.getAttribute('data-area'));

  // Se nada selecionado, esconde tudo
  const hideAll = selected.length === 0;

  MARKERS.forEach(({ marker, areas }) => {
    // Visível se houver interseção entre areas do ponto e selected
    const visible = !hideAll && areas.some(a => selected.includes(a));
    if (visible) {
      if (!map.hasLayer(marker)) marker.addTo(map);
    } else {
      if (map.hasLayer(marker)) map.removeLayer(marker);
    }
  });
}

// ====== Pop-up com "Saiba mais" ======
function popupHtml(emp) {

  const linkBtn = `
    <a href="detalhes.html?id=${emp.id}"
       style="display:inline-block;margin-top:8px;padding:8px 12px;
              border-radius:10px;background:#eb6213;color:#fff;
              text-decoration:none;font-weight:700">
       Saiba mais
    </a>`;

  return `
    <div style="min-width:220px">
      <strong>${emp.nome}</strong>
      <div style="margin-top:4px;color:#555">${emp.cidade ?? ""}</div>

      <div style="
        margin-top:4px;
        color:#777;
        font-size: 0.70rem;
        font-family: 'Segoe UI', sans-serif;">
        # ${emp.area ?? (Array.isArray(emp.areas) ? emp.areas.join(", ") : "")}
      </div>

      ${linkBtn}
    </div>
  `;
}


// ====== Carregamento dos dados e inicialização ======
fetch('empresas.json')
  .then(r => r.json())
  .then(empresas => {
    EMPRESAS = empresas;

    // Criar marcadores
    MARKERS = empresas.map(emp => {
      const areas = parseAreas(emp);
      const marker = L.marker([emp.lat, emp.lng], { icon: orangeIcon }).bindPopup(popupHtml(emp)).addTo(map);
      return { emp, marker, areas };
    });

    // Construir lista de áreas únicas e ordenar alfabeticamente
    ALL_AREAS = uniq(MARKERS.flatMap(m => m.areas)).sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));

    // Renderizar filtros e aplicá-los
    renderAreaFilters(ALL_AREAS);
    applyFilters();
  })
  .catch(err => {
    console.error('Erro ao carregar empresas.json', err);
  });










