mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9tZXRyaWNzIiwiYSI6ImNqOGJ2ZXIzazAxd3kyd3AyMDVrOGpzNWkifQ.KwvwFfoDOeLnjR1gEHO8tg';

// Inicializar el mapa
var map = new mapboxgl.Map({
  container: 'map', // ID del contenedor del mapa
  style: 'mapbox://styles/cartometrics/cln2xci89037z01qx0ub43zi1', 
  center: [-4.355, 36.724], // Coordenadas
  zoom: 15 // zoom 
});



// mostrar el popup 
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['fraude'] // ID de la capa en Mapbox Studio que quiero que se vea el popup
    });
  
    if (!features.length) {
      return;
    }
  
    var feature = features[0];
    var coordinates = e.lngLat;
  
    // contenido del popup
    var popupContent = '<h3> ' + feature.properties.direccion + '</h3><p> <p><strong>Consumo: </strong>' + feature.properties.consumo + '</p><p><strong>Consumo último año vecinos: </strong>' + feature.properties.consumo_esp + '</p><strong>m2 vegetación: </strong>' + feature.properties.m2_veg + '</p><strong>Llenado piscina: </strong>' + feature.properties.llenado_pisc + '</p><strong>Probabilidad de fraude: </strong>' + feature.properties.prob_fraude + '</p><strong>Observaciones: </strong>' + feature.properties.observ + '</p>';
  

  
    
    var popupWidth = Math.min(300, popupContent.length * 10); // ancho máximo a 300 píxeles
    var popup = new mapboxgl.Popup({ maxWidth: popupWidth })
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map);
  
  
  });
  

  map.on('mouseenter', 'buildings-9qcn2w', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  map.on('mouseleave', 'buildings-9qcn2w', function () {
    map.getCanvas().style.cursor = '';
  });







map.on('load', function () {
  
    
    var layers = map.getStyle().layers;
    
    
    var controlsContainer = document.getElementById('layerControls');
    
    
    var specificLayerIds = ['fraude', 'parcelas', 'piscinas catastro', 'piscinas no registradas', 'vegetacion', 'agua', 'imagen sat']; // los IDs de las capas específicas para botones
    
    
    layers.forEach(function(layer) {
      if (specificLayerIds.includes(layer.id)) { 
        
        // Crear un botón
        var button = document.createElement('button');
        button.innerHTML = layer.id; 
        
       
        button.addEventListener('click', function() {
          
          var visibility = map.getLayoutProperty(layer.id, 'visibility');
          
          
          if (visibility === 'visible') {
            map.setLayoutProperty(layer.id, 'visibility', 'none');
          } else {
            map.setLayoutProperty(layer.id, 'visibility', 'visible');
          }
        });
        
        
        controlsContainer.appendChild(button);
      }
    });
  });
  

  