

let map;
let getColor = () => '#0C8';

// Create Text Control
export const textControl = L.control({ position: 'bottomleft' });
const context = { writeMode: false, writeInitialized: false, paintInitialized: false, paintMode: false }
const anchor = document.createElement('a');

textControl.onAdd = function (_map) {
  map  = _map;
  this._div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
  // otherwise drawing process would instantly start at controls' container or double click would zoom-in map
  L.DomEvent.disableClickPropagation(this._div);

  anchor.classList.add('leaflet-control-zoom-in');
  anchor.href = '#';
  anchor.innerHTML = '<span><i class="fa fa-font"></i></span>';
  L.DomEvent.on(anchor, 'click', textControlActivate);
  this._div.appendChild(anchor);
  return this._div;
}

textControl.getColor = function(cb: Function) {
  getColor =  cb;
}

//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function textControlActivate(e) {
  e.preventDefault();
  context.writeMode = !context.writeMode;
  if (context.writeMode) enableTextControl(anchor);
  else disableTextControl(anchor);
}

function enableTextControl(anchor) {
  map.dragging.disable();
  anchor.classList.add('polyline-measure-controlOnBgColor');
  
  if (context.writeInitialized) return;
  
  map.on('click', function (e) {
    let drawColor = getColor();
    if (e.target !== map) return;
    if (!context.writeMode) return;

    const text = prompt('Text ?');
    if (!text) return;
    const style = `color: ${drawColor}; font-weight: bold; font-family: sans-serif; pointer-events: auto;`;
    const icon: L.DivIcon = L.divIcon({
      iconSize: [0, 0],
      className: 'dwe-map-label',
      html: `<div style="${style}">${text}</div>`
    })

    const marker: L.Marker = new L.marker(e.latlng, { icon })
    map.addLayer(marker);
    marker.on('click', (e) => {
      if (context.writeMode) e.target.remove()
    });
    // L.DomEvent.disableClickPropagation(marker.getElement()); 
  });

  context.writeInitialized = true;
}

function disableTextControl(anchor) {
  map.dragging.enable();
  anchor.classList.remove('polyline-measure-controlOnBgColor');
}



/* 
  Create Paint Control
  ********************************/

export const paintControl = L.control({ position: 'bottomleft' });
const pAnchor = document.createElement('a');
let myPolyline:L.Polyline;

paintControl.onAdd = function (_map) {
  map  = _map;
  this._div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');

  pAnchor.classList.add('leaflet-control-zoom-in');
  pAnchor.href = '#';
  pAnchor.innerHTML = '<span><i class="fa fa-pencil"></i></span>';
  L.DomEvent.on(pAnchor, 'click', paintControlActivate);
  this._div.appendChild(pAnchor);
  return this._div;
}


//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function paintControlActivate(e) {
  e.preventDefault();
  context.paintMode = !context.paintMode;
  if (context.paintMode) enablePaintControl(pAnchor);
  else disablePaintControl(pAnchor);
}

let paintMode = false;
function enablePaintControl(anchor) {
  anchor.classList.add('polyline-measure-controlOnBgColor');
  map.dragging.disable();
  if (context.paintInitialized) return;
  // map.on('mousedown', paintStarted);
  // map.on('mousemove', doDraw);
  // map.on('mouseup', endDraw);
  const mapElement = document.getElementById('map');

  mapElement.addEventListener('pointerdown', paintStarted);
  mapElement.addEventListener('pointermove', doDraw);
  mapElement.addEventListener('pointerup', endDraw);

  context.paintInitialized = true;
}

function paintStarted(e) {
  console.log('paintStarted', e);
  
  // if (e.target !== mapElement) return;
  if (!context.paintMode) return;
  doPaint(e);    
}

function disablePaintControl(anchor) {
  anchor.classList.remove('polyline-measure-controlOnBgColor');
  map.dragging.enable();
}

function doPaint(e) {
  map.lastPointX = Math.floor(e.layerX);  
  map.lastPointY = Math.floor(e.layerY);  
  console.log(e);
  
  if (e.which === 1) {
    paintMode = true;

    const config = {
      // smoothFactor: 2,
      color: getColor(),
      weight: 4,
      className: 'leaflet-drawline'
    }

    if (e.shiftKey) config.dashArray = [5, 10];
    myPolyline = L.polyline([], config).addTo(map);
    myPolyline.on('click', (e) => e.target?.remove());
  }
}


function doDraw(e) {
	if (paintMode) {
    var pointlatlng = map.mouseEventToLatLng(e);
  	myPolyline.addLatLng(pointlatlng);
  }
}

function endDraw(e) {
	paintMode = false;
}

