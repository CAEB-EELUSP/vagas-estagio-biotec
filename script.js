const map = L.map('map').setView([-15.78, -47.93], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
fetch('dados.json')
.then(r => r.json())
.then(pontos => {
pontos.forEach(p => {
L.marker([p.lat, p.lng]).addTo(map)
.bindPopup(`<strong>${p.nome}</strong><br>${p.lat.toFixed(4)}, $
{p.lng.toFixed(4)}`);
});
})
.catch(err => console.error('Erro ao carregar dados.json', err));