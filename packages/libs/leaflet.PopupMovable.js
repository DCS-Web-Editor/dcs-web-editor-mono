"use strict";
/*
 * Leaflet.PopupMovable
 * Description: A plugin that make L.Popup movable by user dragging and auto draw leadline.
 * Example: new L.map('MapContainer', {popupMovable: true})
 * Author: SUZUKI Yasuhiro
 */
L.Map.PopupMovable = L.Handler.extend({
  constructor(map) {
    if (this._map === undefined) {
      this._map = map;
    }
  },
  //translate '-'+lower chara to '-'+uppper chara
  _camelize(str) {
    return str.replace(/-([a-z])/g, (a, b) => b.toUpperCase());
  },
  //This is class name of popup element for judging whether popup moved or not.
  _movedLabel: "popup-moved",

  //Restore Popup's css(drawing popup's leader).
  _restorePopup(e) {
    const div = [],
      tip = [],
      css = {},
      dic = [
        "z-index",
        "width",
        "height",
        "position",
        "left",
        "top",
        "margin-left",
        "margin-top",
        "margin-bottom",
        "background-image",
        "filter",
      ];
    //When ZoomLeve change, all Popups's css are restore default css.
    if (e.type === "zoomstart") {
      document.querySelectorAll(".leaflet-popup-tip-container").forEach((c) => div.push(c));
      document.querySelectorAll(".leaflet-popup-tip").forEach((c) => tip.push(c));
    } else if (e.type === "popupclose") {
      div.push(e.popup._tipContainer);
      tip.push(e.popup._tipContainer.children[0]);
      L.DomUtil.removeClass(e.popup.getElement(), this._movedLabel);
    } else if (e instanceof L.Popup) {
      div.push(e._tipContainer);
      tip.push(e._tipContainer.children[0]);
      L.DomUtil.removeClass(e.getElement(), this._movedLabel);
    }

    for (const s in dic) css[dic[s]] = "";
    for (const d in div) for (const name in css) div[d].style[this._camelize(name)] = css[name];
    //redraw default tooltip
    for (const t in tip) tip[t].style.visibility = "visible";
    //Marker, which has not been moved, shall be excluded,
  },

  _hideLeader() {
    const div = [],
      css = {},
      dic = [
        "z-index",
        "width",
        "height",
        "position",
        "left",
        "top",
        "margin-left",
        "margin-top",
        "margin-bottom",
        "background-image",
        "filter",
      ];
    document.querySelectorAll(".leaflet-popup-tip-container").forEach((c) => div.push(c));
    for (const s in dic) css[dic[s]] = "";
    for (const d in div) for (const name in css) div[d].style[this._camelize(name)] = css[name];
  },

  //Return css for Popup's leader
  _createPopupCss(x, y, w, h) {
    //Drawing a rectangle using SVG and Triangulate part of it.
    const svgicon = (s, width, height) => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" preserveAspectRatio="none" viewBox="0 0 100 100">
  <polygon points="${s}" stroke-width="0.2" stroke="gray" fill="#23313f" />
</svg>`;
      //for easyPrint.js, convert svg's xml to base64.
      const encoded = btoa(xml);
      const uri = encodeURI(`data:image/svg+xml;charset=utf8;base64,${encoded}`);
      return `url(${uri})`;
    };
    const c = {
        //'z-index' : 900,
        "z-index": -1, //Placement on the back of Popup.
        position: "absolute",
        //If you want to emphasize the leader.
        filter: "drop-shadow(0px 0px 2px gray)",
        //For debbuging.(draw rectangle)
        /*
        'border-width': '1px',
        'border-color': 'black',
        'border-style': 'solid',
        */
      },
      //Width when Marker and Popup are parallel.
      para = 18,
      //Tweak leadline point.
      offset = 20,
      tweakH = 4,
      tweakW = 3;

    //Depending on The width of the balloon and distance, change the width of the base of the leader.
    function ww(width, minus = false) {
      const calc = (20 / width) * 100;
      //allways return 20px. this size can't over popup harf of width and heigth.
      if (minus) return String(100 - calc);
      else return String(calc);
    }
    //z-index ,When parallel position
    c["z-index"] = -1;
    //Change Processing depending on the position of Marker and Popup.
    if (Math.abs(y) + offset / 2 <= h / 2) {
      //parallel
      c["height"] = para;
      c["top"] = h / 2 - para / 2 + y - tweakH;
      if (x >= 0) {
        //left
        c["width"] = x - w / 2 - offset + tweakW;
        c["left"] = w + offset;
        c["background-image"] = svgicon("0,0 100,50 0,100", c["width"], para);
      } else {
        //right
        c["width"] = offset - tweakW - w / 2 - x;
        c["left"] = tweakW + x + w / 2;
        c["background-image"] = svgicon("0,50 100,0 100,100", c["width"], para);
      }
    } else if (Math.abs(x - offset) + offset <= w / 2) {
      //vertical
      c["width"] = para;
      c["left"] = w / 2 + x - para / 2 + tweakW;
      if (y >= 0) {
        //top
        c["height"] = y - h / 2;
        c["top"] = h - tweakH;
        c["background-image"] = svgicon("0,0 50,100 100,0", para, c["height"]);
      } else {
        //bottom
        c["height"] = tweakH - y;
        c["top"] = h / 2 + y - tweakH;
        c["background-image"] = svgicon("0,100 50,0 100,100", para, c["height"]);
      }
    } else if (x >= 0 && y >= 0) {
      //left-upper
      c["width"] = x;
      c["left"] = w / 2 + tweakW;
      c["height"] = y;
      c["top"] = h / 2 - tweakH;
      const width = ww(c["width"]),
        height = ww(c["height"]);
      c["background-image"] = svgicon(`${width},0 100,100 0,${height}`, c["width"], c["height"]);
    } else if (x < 0 && y >= 0) {
      //right-upper
      c["width"] = offset * 2 - x;
      c["left"] = w / 2 + x + tweakW;
      c["height"] = y;
      c["top"] = h / 2 - tweakH;
      const width = ww(c["width"], true),
        height = ww(c["height"]);
      c["background-image"] = svgicon(`0 100,${width},0 100,${height}`, c["width"], c["height"]);
    } else if (x < 0 && y < 0) {
      //right-lower
      c["width"] = offset * 2 - x;
      c["left"] = w / 2 + x + tweakW;
      c["height"] = offset - y;
      c["top"] = h / 2 + y - tweakH;
      const width = ww(c["width"], true),
        height = ww(c["height"], true);
      c["background-image"] = svgicon(`0,0 100,${height},${width} 100`, c["width"], c["height"]);
    } else if (x >= 0 && y < 0) {
      //left-lower
      c["width"] = x;
      c["left"] = w / 2 + tweakW;
      c["height"] = offset - y;
      c["top"] = h / 2 + y - tweakH;
      const width = ww(c["width"]),
        height = ww(c["height"], true);
      c["background-image"] = svgicon(`0,${height} ${width},100 100,0`, c["width"], c["height"]);
    }
    //Apply the retrieved css's values.
    Object.keys(c).forEach(function (key) {
      const lst = ["width", "left", "height", "top"];
      for (const i in lst) {
        if (lst[i] === key) c[key] = String(c[key]) + "px";
      }
    });
    return c;
  },

  //drawing css as Popup's leader.
  _drawCss(el, newPosition, popupAnchor = false) {
    //Position of Popup before movging.
    //const originalPos = this._map.latLngToLayerPoint(el.latlng),
    const originalPos = this._map.latLngToLayerPoint(el.latlng);
    //calculate for popupAnchor option of L.marker.
    if (popupAnchor) {
      originalPos.x += el.popupAnchor[0];
      originalPos.y += el.popupAnchor[1];
    }
    //Size of Popup.
    const h = el.clientHeight,
      w = el.clientWidth,
      //Drawing rectangle with before and after as vertices.
      tip = 17, //Size of tip(=leader).
      x = Math.round(originalPos.x - newPosition.x + tip), // + el.popupAnchor[0],
      y = Math.round(originalPos.y - (newPosition.y - h / 2 - tip)), // + el.popupAnchor[1],
      //Leader's CSS of moved Popup.
      css = this._createPopupCss(x, y, w, h),
      div = el.children[1];
    for (const name in css) div.style[this._camelize(name)] = css[name];
    //Undisplay default tip.
    div.children[0].style.visibility = "hidden";
  },

  //When ZoomLevel change, restore Popup's Position and redraw Popup's leader.
  _zoomCollect(popups, previous, marker) {
    popups.forEach((p) => {
      if (!L.DomUtil.hasClass(p, this._movedLabel)) return;
      const point = this._map.latLngToLayerPoint(p.latlng),
        pre = previous.shift(),
        mk = marker.shift(),
        x = pre.x - mk.x,
        y = pre.y - mk.y,
        //L.point(point.x + x, point.y + y);
        pos = point.add([x, y]);
      L.DomUtil.setPosition(p, pos);
      this._drawCss(p, pos, true); //third argument is enabling popupAnchor.
    });
  },

  /*
  Main Function
  */
  _popupMovable(mk) {
    const p = mk.popup;
    if (p.options.popupmovable === false) return;
    //First, Embed the original position in Popup's Object.(to be used later.)
    p._wrapper.parentNode.latlng = p.getLatLng();
    //Enbed the marker option(popupAnchor) that bindding this popup.
    try {
      p._wrapper.parentNode.popupAnchor = p._source.options.icon.options.popupAnchor;
    } catch {
      p._wrapper.parentNode.popupAnchor = [0, 0];
    }
    //Make Popup elements movable.
    new L.Draggable(p._container, p._wrapper)
      .on("drag", (e) => {
        this._drawCss(e.target._element, e.target._newPos);
        p.setLatLng(this._map.layerPointToLatLng(e.target._newPos));
      })
      .on("dragend", (e) => {
        //For ZoomLevel change Event,moved or not, it shall be possible to determine.
        L.DomUtil.addClass(e.target._element, this._movedLabel);
      })
      .enable();
    //When binded Marker clicked, restore leadline.
    if (p._source !== undefined) {
      L.featureGroup([p._source]).on("click", () => this._restorePopup(p));
    }
  },

  _zoomEvent(e) {
    //First, save the Popup's position before zoomlevel change.
    const popups = [],
      popupPositions = [],
      markerPositions = [];

    document.querySelectorAll(".leaflet-popup").forEach((p) => {
      if (!L.DomUtil.hasClass(p, this._movedLabel)) return;
      popups.push(p);
      popupPositions.push(L.DomUtil.getPosition(p));
      markerPositions.push(this._map.latLngToLayerPoint(p.latlng));
    });

    if (Object.keys(popupPositions).length > 0) {
      //While ZoomLebel changing, restore Popup's css temporary.
      if (e !== undefined && e.type === "zoomstart") this._hideLeader(e);
      //After zoom processing, redraw Popup's leader.
      this._map.once("zoomend", () => {
        this._zoomCollect(popups, popupPositions, markerPositions);
      });
    }
  },

  /*
    Disperse all opened Popup.
    This module is used after modification leaflet-tooltip-layout
    (https://github.com/ZijingPeng/leaflet-tooltip-layout.git)
  */
  popupDispersion: function () {
    const getPosition = (el) => {
      const translateString = el.style.transform.split("(")[1].split(")")[0].split(",");
      return L.point(parseInt(translateString[0]), parseInt(translateString[1]));
    };
    const computePositionStep = (t, mks) => {
      const normalize = (a) => {
        const l = a.distanceTo(L.point(0, 0));
        if (l === 0) return a;
        else return L.point(a.x / l, a.y / l);
      };
      const k = Math.sqrt((window.innerWidth * window.innerHeight) / 10 / mks.length),
        fr = (x, k) => (k * k) / x;
      for (let i = 0; i < mks.length; i++) {
        const v = mks[i],
          v_pos = getPosition(v.getPopup()._container);
        v.disp = L.point(0, 0);
        for (let j = 0; j < mks.length; j++) {
          if (i !== j) {
            const dpos = v_pos.subtract(getPosition(mks[j].getPopup()._container));
            if (dpos !== 0)
              v.disp = v.disp.add(
                normalize(dpos).multiplyBy(fr(dpos.distanceTo(L.point(0, 0)), k))
              );
          }
        }
      }

      const fa = (x, k) => (x * x) / k;
      for (const v of mks) {
        const v_pos = getPosition(v.getPopup()._container),
          dpos = v_pos.subtract(this._map.latLngToLayerPoint(v.getLatLng()));
        v.disp = v.disp.subtract(normalize(dpos).multiplyBy(fa(dpos.distanceTo(L.point(0, 0)), k)));
      }

      const scaleTo = (a, b) => L.point(a.x * b.x, a.y * b.y);
      for (const v of mks) {
        const disp = v.disp,
          el = v.getPopup()._container,
          p = getPosition(el).add(
            scaleTo(
              normalize(disp),
              L.point(Math.min(Math.abs(disp.x), t), Math.min(Math.abs(disp.y), t))
            )
          );
        L.DomUtil.setPosition(el, L.point(Math.ceil(p.x), Math.ceil(p.y)));
      }
    };

    const mks = [];
    this._map.eachLayer((e) => {
      if ((e instanceof L.CircleMarker || e instanceof L.Marker) && e.isPopupOpen()) mks.push(e);
    });

    for (let i = 0; i < mks.length; i++) {
      const mk = mks[i],
        p = this._map.latLngToLayerPoint(mk.getLatLng()),
        angle = ((2 * Math.PI) / 6) * i,
        dest = L.point(
          Math.ceil(p.x + 200 * Math.sin(angle)),
          Math.ceil(p.y + 200 * Math.cos(angle))
        ),
        popup = mk.getPopup();
      L.DomUtil.setPosition(popup._container, dest);
    }
    const start = Math.ceil(window.innerWidth / 10),
      times = 30;
    for (let i = 0; i < times; i += 1) computePositionStep(start * (1 - i / (times - 1)), mks);
    for (const v of mks) {
      const el = v.getPopup()._container,
        pos = getPosition(el),
        p = L.point(Math.ceil(pos.x - el.offsetWidth / 2), Math.ceil(pos.y - el.offsetHeight / 2));
      L.DomUtil.setPosition(el, p);
    }
    const bounds = this._map.getBounds(),
      NW = this._map.latLngToLayerPoint(bounds.getNorthWest()),
      SE = this._map.latLngToLayerPoint(bounds.getSouthEast());
    for (const v of mks) {
      const el = v.getPopup()._container,
        p = getPosition(el),
        m = this._map.latLngToLayerPoint(v.getLatLng()),
        w = el.offsetWidth,
        h = el.offsetHeight;
      let isEdge = false;
      if (m.x > NW.x && p.x < NW.x) {
        p.x = NW.x;
        isEdge = true;
      } else if (m.x < SE.x && p.x > SE.x - w) {
        p.x = SE.x - w;
        isEdge = true;
      }
      if (m.y > NW.y && p.y < NW.y) {
        p.y = NW.y;
        isEdge = true;
      } else if (m.y < SE.y && p.y > SE.y - h) {
        p.y = SE.y - h;
        isEdge = true;
      }
      if (!isEdge) {
        if (m.x < NW.x && p.x > NW.x - w) p.x = NW.x - w;
        else if (m.x > SE.x && p.x < SE.x) p.x = SE.x;
        if (m.y < NW.y && p.y > NW.y - h) p.y = NW.y - h;
        else if (m.y > SE.y && p.y < SE.y) p.y = SE.y;
      }
      L.DomUtil.setPosition(el, p);
      L.DomUtil.addClass(el, this._movedLabel);
      el.latlng = v.getLatLng();
      this._drawCss(el, p);
    }
  },

  addHooks: function () {
    //make it doraggable.
    this._map.on("popupopen", (e) => this._popupMovable(e), this);

    //restore Popup's css(tip).
    this._map.on("popupclose", (e) => this._restorePopup(e), this);

    //When ZoomLevel changing, save and restore Popup's potision.
    this._map.on("zoomstart", (e) => this._zoomEvent(e), this);

    //when zoomlevelChange, don't restore popup position.(only popup that binded marker)
    L.Popup = L.Popup.extend({
      popupmovable: true,
      _animateZoom: function (e) {
        if (!L.DomUtil.hasClass(this._container, this._movedLabel)) {
          const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
            anchor = this._getAnchor();
          L.DomUtil.setPosition(this._container, pos.add(anchor));
        }
      },
      //for handle SmoothWheelZoom.js
      _updatePosition: function () {
        if (!this._map) {
          return;
        }
        function toPoint(x, y, round) {
          if (x instanceof L.Point) return x;
          if (Array.isArray(x)) return new L.point(x[0], x[1]);
          if (x === undefined || x === null) return x;
          if (typeof x === "object" && "x" in x && "y" in x) return new Point(x.x, x.y);
          return new Point(x, y, round);
        }
        const pos = this._map.latLngToLayerPoint(this._latlng),
          offset = toPoint(this.options.offset),
          anchor = this._getAnchor();

        if (this._zoomAnimated) {
          if (!L.DomUtil.hasClass(this._container, this._movedLabel)) {
            L.DomUtil.setPosition(this._container, pos.add(anchor));
          }
        } else {
          offset = offset.add(pos).add(anchor);
        }

        const bottom = (this._containerBottom = -offset.y),
          left = (this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x);

        // bottom position the overlay in case the height of the overlay changes (images loading etc)
        this._container.style.bottom = bottom + "px";
        this._container.style.left = left + "px";
      },
    });
    L.popup = function (options, source) {
      return new L.Popup(options, source);
    };
  },

  removeHooks: function () {
    this._map.off("popupopen", (e) => this._popupMovable(e), this);
    this._map.off("popupclose", (e) => this._restorePopup(e), this);
    this._map.off("zoomstart", (e) => this._zoomEvent(e), this);
  },
});

L.Map.mergeOptions({
  popupMovable: false,
});

L.Map.addInitHook("addHandler", "popupMovable", L.Map.PopupMovable);
