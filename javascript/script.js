const chart = document.getElementById('myChart');
let nomi = [];
let abitanti = [];

//CREAZIONE GRAFICO
//creazione della lista dei nomi delle città
for (const com of comuni) {
    nomi.push(com.nome);
}

//creazione della lista del numero degli abitanti delle città
for (const com of comuni) {
    abitanti.push(com.abitanti);
}

new Chart(chart, {
    type: 'bar',
    data: {
      labels: nomi,
      datasets: [{
        label: 'Numero di abitanti',
        data: abitanti,
      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Top 10 città italiane per popolazione'
            }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
    }
});
//------------------------------------------------------------------------

//CREAZIONE MAPPA
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//creazione marker + stabilimento della visualizzazione
var bounds = L.latLngBounds();
for (let c of comuni) {
  let lat_lng = [c.coordinate.lat, c.coordinate.lon]
  var marker = L.marker(lat_lng).addTo(map);
  marker.bindPopup(`<b>${c.nome}</b><br>${c.abitanti}`);
  bounds.extend(lat_lng);
}
map.fitBounds(bounds);
//-------------------------------------------------------------------------