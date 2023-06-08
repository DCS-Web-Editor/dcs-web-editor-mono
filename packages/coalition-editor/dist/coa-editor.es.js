var gc = (e, o) => () => (o || e((o = { exports: {} }).exports, o), o.exports);
import { effectScope as Ml, ref as R, markRaw as bo, toRaw as kr, hasInjectionContext as mc, inject as he, getCurrentInstance as Rn, watch as xe, unref as eo, reactive as bc, isRef as Wt, isReactive as Fn, toRef as se, nextTick as Ct, computed as E, getCurrentScope as xc, onScopeDispose as Cc, toRefs as ui, createTextVNode as xo, Fragment as oo, Comment as Ln, isVNode as yc, defineComponent as ie, readonly as hn, onMounted as Ve, onBeforeUnmount as Je, provide as to, withDirectives as Yt, h as S, Teleport as Sc, renderSlot as kl, onActivated as Ol, onDeactivated as El, mergeProps as Or, onBeforeMount as Wn, watchEffect as Co, Transition as yt, vShow as _l, cloneVNode as wc, openBlock as Eo, createElementBlock as Lo, createElementVNode as Te, createVNode as go, withCtx as mo, toDisplayString as Qt, renderList as Wr, normalizeClass as Nr, createBlock as $c, createApp as Pc } from "vue";
var fS = gc((He, Be) => {
  var Dl = !1;
  function er(e, o, t) {
    return Array.isArray(e) ? (e.length = Math.max(e.length, o), e.splice(o, 1, t), t) : (e[o] = t, t);
  }
  function jr(e, o) {
    if (Array.isArray(e)) {
      e.splice(o, 1);
      return;
    }
    delete e[o];
  }
  function Tc() {
    return Hl().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function Hl() {
    return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
  }
  const zc = typeof Proxy == "function", Ic = "devtools-plugin:setup", Mc = "plugin:settings:set";
  let dt, pn;
  function kc() {
    var e;
    return dt !== void 0 || (typeof window < "u" && window.performance ? (dt = !0, pn = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (dt = !0, pn = global.perf_hooks.performance) : dt = !1), dt;
  }
  function Oc() {
    return kc() ? pn.now() : Date.now();
  }
  class Ec {
    constructor(o, t) {
      this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = o, this.hook = t;
      const r = {};
      if (o.settings)
        for (const l in o.settings) {
          const a = o.settings[l];
          r[l] = a.defaultValue;
        }
      const n = `__vue-devtools-plugin-settings__${o.id}`;
      let i = Object.assign({}, r);
      try {
        const l = localStorage.getItem(n), a = JSON.parse(l);
        Object.assign(i, a);
      } catch {
      }
      this.fallbacks = {
        getSettings() {
          return i;
        },
        setSettings(l) {
          try {
            localStorage.setItem(n, JSON.stringify(l));
          } catch {
          }
          i = l;
        },
        now() {
          return Oc();
        }
      }, t && t.on(Mc, (l, a) => {
        l === this.plugin.id && this.fallbacks.setSettings(a);
      }), this.proxiedOn = new Proxy({}, {
        get: (l, a) => this.target ? this.target.on[a] : (...s) => {
          this.onQueue.push({
            method: a,
            args: s
          });
        }
      }), this.proxiedTarget = new Proxy({}, {
        get: (l, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...s) => (this.targetQueue.push({
          method: a,
          args: s,
          resolve: () => {
          }
        }), this.fallbacks[a](...s)) : (...s) => new Promise((c) => {
          this.targetQueue.push({
            method: a,
            args: s,
            resolve: c
          });
        })
      });
    }
    async setRealTarget(o) {
      this.target = o;
      for (const t of this.onQueue)
        this.target.on[t.method](...t.args);
      for (const t of this.targetQueue)
        t.resolve(await this.target[t.method](...t.args));
    }
  }
  function Bl(e, o) {
    const t = e, r = Hl(), n = Tc(), i = zc && t.enableEarlyProxy;
    if (n && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
      n.emit(Ic, e, o);
    else {
      const l = i ? new Ec(t, n) : null;
      (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
        pluginDescriptor: t,
        setupFn: o,
        proxy: l
      }), l && o(l.proxiedTarget);
    }
  }
  /*!
    * pinia v2.1.1
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let Dt;
  const Nt = (e) => Dt = e, Al = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
    /* istanbul ignore next */
    Symbol()
  );
  function qo(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var ro;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(ro || (ro = {}));
  const Er = typeof window < "u", Bt = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && Er, fi = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
  function _c(e, { autoBom: o = !1 } = {}) {
    return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
  }
  function Nn(e, o, t) {
    const r = new XMLHttpRequest();
    r.open("GET", e), r.responseType = "blob", r.onload = function() {
      Ll(r.response, o, t);
    }, r.onerror = function() {
      console.error("could not download file");
    }, r.send();
  }
  function Rl(e) {
    const o = new XMLHttpRequest();
    o.open("HEAD", e, !1);
    try {
      o.send();
    } catch {
    }
    return o.status >= 200 && o.status <= 299;
  }
  function dr(e) {
    try {
      e.dispatchEvent(new MouseEvent("click"));
    } catch {
      const t = document.createEvent("MouseEvents");
      t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
    }
  }
  const ur = typeof navigator == "object" ? navigator : { userAgent: "" }, Fl = /* @__PURE__ */ (() => /Macintosh/.test(ur.userAgent) && /AppleWebKit/.test(ur.userAgent) && !/Safari/.test(ur.userAgent))(), Ll = Er ? (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Fl ? Dc : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in ur ? Hc : (
        // Fallback to using FileReader and a popup
        Bc
      )
    )
  ) : () => {
  };
  function Dc(e, o = "download", t) {
    const r = document.createElement("a");
    r.download = o, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? Rl(r.href) ? Nn(e, o, t) : (r.target = "_blank", dr(r)) : dr(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
      URL.revokeObjectURL(r.href);
    }, 4e4), setTimeout(function() {
      dr(r);
    }, 0));
  }
  function Hc(e, o = "download", t) {
    if (typeof e == "string")
      if (Rl(e))
        Nn(e, o, t);
      else {
        const r = document.createElement("a");
        r.href = e, r.target = "_blank", setTimeout(function() {
          dr(r);
        });
      }
    else
      navigator.msSaveOrOpenBlob(_c(e, t), o);
  }
  function Bc(e, o, t, r) {
    if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
      return Nn(e, o, t);
    const n = e.type === "application/octet-stream", i = /constructor/i.test(String(fi.HTMLElement)) || "safari" in fi, l = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((l || n && i || Fl) && typeof FileReader < "u") {
      const a = new FileReader();
      a.onloadend = function() {
        let s = a.result;
        if (typeof s != "string")
          throw r = null, new Error("Wrong reader.result type");
        s = l ? s : s.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = s : location.assign(s), r = null;
      }, a.readAsDataURL(e);
    } else {
      const a = URL.createObjectURL(e);
      r ? r.location.assign(a) : location.href = a, r = null, setTimeout(function() {
        URL.revokeObjectURL(a);
      }, 4e4);
    }
  }
  function be(e, o) {
    const t = "🍍 " + e;
    typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, o) : o === "error" ? console.error(t) : o === "warn" ? console.warn(t) : console.log(t);
  }
  function jn(e) {
    return "_a" in e && "install" in e;
  }
  function Wl() {
    if (!("clipboard" in navigator))
      return be("Your browser doesn't support the Clipboard API", "error"), !0;
  }
  function Nl(e) {
    return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (be('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
  }
  async function Ac(e) {
    if (!Wl())
      try {
        await navigator.clipboard.writeText(JSON.stringify(e.state.value)), be("Global state copied to clipboard.");
      } catch (o) {
        if (Nl(o))
          return;
        be("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Rc(e) {
    if (!Wl())
      try {
        e.state.value = JSON.parse(await navigator.clipboard.readText()), be("Global state pasted from clipboard.");
      } catch (o) {
        if (Nl(o))
          return;
        be("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Fc(e) {
    try {
      Ll(new Blob([JSON.stringify(e.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (o) {
      be("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  let po;
  function Lc() {
    po || (po = document.createElement("input"), po.type = "file", po.accept = ".json");
    function e() {
      return new Promise((o, t) => {
        po.onchange = async () => {
          const r = po.files;
          if (!r)
            return o(null);
          const n = r.item(0);
          return o(n ? { text: await n.text(), file: n } : null);
        }, po.oncancel = () => o(null), po.onerror = t, po.click();
      });
    }
    return e;
  }
  async function Wc(e) {
    try {
      const t = await (await Lc())();
      if (!t)
        return;
      const { text: r, file: n } = t;
      e.state.value = JSON.parse(r), be(`Global state imported from "${n.name}".`);
    } catch (o) {
      be("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  function Xe(e) {
    return {
      _custom: {
        display: e
      }
    };
  }
  const jl = "🍍 Pinia (root)", vn = "_root";
  function Nc(e) {
    return jn(e) ? {
      id: vn,
      label: jl
    } : {
      id: e.$id,
      label: e.$id
    };
  }
  function jc(e) {
    if (jn(e)) {
      const t = Array.from(e._s.keys()), r = e._s;
      return {
        state: t.map((i) => ({
          editable: !0,
          key: i,
          value: e.state.value[i]
        })),
        getters: t.filter((i) => r.get(i)._getters).map((i) => {
          const l = r.get(i);
          return {
            editable: !1,
            key: i,
            value: l._getters.reduce((a, s) => (a[s] = l[s], a), {})
          };
        })
      };
    }
    const o = {
      state: Object.keys(e.$state).map((t) => ({
        editable: !0,
        key: t,
        value: e.$state[t]
      }))
    };
    return e._getters && e._getters.length && (o.getters = e._getters.map((t) => ({
      editable: !1,
      key: t,
      value: e[t]
    }))), e._customProperties.size && (o.customProperties = Array.from(e._customProperties).map((t) => ({
      editable: !0,
      key: t,
      value: e[t]
    }))), o;
  }
  function Vc(e) {
    return e ? Array.isArray(e) ? e.reduce((o, t) => (o.keys.push(t.key), o.operations.push(t.type), o.oldValue[t.key] = t.oldValue, o.newValue[t.key] = t.newValue, o), {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    }) : {
      operation: Xe(e.type),
      key: Xe(e.key),
      oldValue: e.oldValue,
      newValue: e.newValue
    } : {};
  }
  function Uc(e) {
    switch (e) {
      case ro.direct:
        return "mutation";
      case ro.patchFunction:
        return "$patch";
      case ro.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let vt = !0;
  const fr = [], No = "pinia:mutations", we = "pinia", { assign: Gc } = Object, gr = (e) => "🍍 " + e;
  function Kc(e, o) {
    Bl({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes: fr,
      app: e
    }, (t) => {
      typeof t.now != "function" && be("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
        id: No,
        label: "Pinia 🍍",
        color: 15064968
      }), t.addInspector({
        id: we,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              Ac(o);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await Rc(o), t.sendInspectorTree(we), t.sendInspectorState(we);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              Fc(o);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await Wc(o), t.sendInspectorTree(we), t.sendInspectorState(we);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (r) => {
              const n = o._s.get(r);
              n ? typeof n.$reset != "function" ? be(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (n.$reset(), be(`Store "${r}" reset.`)) : be(`Cannot reset "${r}" store because it wasn't found.`, "warn");
            }
          }
        ]
      }), t.on.inspectComponent((r, n) => {
        const i = r.componentInstance && r.componentInstance.proxy;
        if (i && i._pStores) {
          const l = r.componentInstance.proxy._pStores;
          Object.values(l).forEach((a) => {
            r.instanceData.state.push({
              type: gr(a.$id),
              key: "state",
              editable: !0,
              value: a._isOptionsAPI ? {
                _custom: {
                  value: kr(a.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => a.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(a.$state).reduce((s, c) => (s[c] = a.$state[c], s), {})
              )
            }), a._getters && a._getters.length && r.instanceData.state.push({
              type: gr(a.$id),
              key: "getters",
              editable: !1,
              value: a._getters.reduce((s, c) => {
                try {
                  s[c] = a[c];
                } catch (u) {
                  s[c] = u;
                }
                return s;
              }, {})
            });
          });
        }
      }), t.on.getInspectorTree((r) => {
        if (r.app === e && r.inspectorId === we) {
          let n = [o];
          n = n.concat(Array.from(o._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : jl.toLowerCase().includes(r.filter.toLowerCase())) : n).map(Nc);
        }
      }), t.on.getInspectorState((r) => {
        if (r.app === e && r.inspectorId === we) {
          const n = r.nodeId === vn ? o : o._s.get(r.nodeId);
          if (!n)
            return;
          n && (r.state = jc(n));
        }
      }), t.on.editInspectorState((r, n) => {
        if (r.app === e && r.inspectorId === we) {
          const i = r.nodeId === vn ? o : o._s.get(r.nodeId);
          if (!i)
            return be(`store "${r.nodeId}" not found`, "error");
          const { path: l } = r;
          jn(i) ? l.unshift("state") : (l.length !== 1 || !i._customProperties.has(l[0]) || l[0] in i.$state) && l.unshift("$state"), vt = !1, r.set(i, l, r.state.value), vt = !0;
        }
      }), t.on.editComponentState((r) => {
        if (r.type.startsWith("🍍")) {
          const n = r.type.replace(/^🍍\s*/, ""), i = o._s.get(n);
          if (!i)
            return be(`store "${n}" not found`, "error");
          const { path: l } = r;
          if (l[0] !== "state")
            return be(`Invalid path for store "${n}":
${l}
Only state can be modified.`);
          l[0] = "$state", vt = !1, r.set(i, l, r.state.value), vt = !0;
        }
      });
    });
  }
  function Xc(e, o) {
    fr.includes(gr(o.$id)) || fr.push(gr(o.$id)), Bl({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes: fr,
      app: e,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: !0
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (t) => {
      const r = typeof t.now == "function" ? t.now.bind(t) : Date.now;
      o.$onAction(({ after: l, onError: a, name: s, args: c }) => {
        const u = Vl++;
        t.addTimelineEvent({
          layerId: No,
          event: {
            time: r(),
            title: "🛫 " + s,
            subtitle: "start",
            data: {
              store: Xe(o.$id),
              action: Xe(s),
              args: c
            },
            groupId: u
          }
        }), l((f) => {
          Vo = void 0, t.addTimelineEvent({
            layerId: No,
            event: {
              time: r(),
              title: "🛬 " + s,
              subtitle: "end",
              data: {
                store: Xe(o.$id),
                action: Xe(s),
                args: c,
                result: f
              },
              groupId: u
            }
          });
        }), a((f) => {
          Vo = void 0, t.addTimelineEvent({
            layerId: No,
            event: {
              time: r(),
              logType: "error",
              title: "💥 " + s,
              subtitle: "end",
              data: {
                store: Xe(o.$id),
                action: Xe(s),
                args: c,
                error: f
              },
              groupId: u
            }
          });
        });
      }, !0), o._customProperties.forEach((l) => {
        xe(() => eo(o[l]), (a, s) => {
          t.notifyComponentUpdate(), t.sendInspectorState(we), vt && t.addTimelineEvent({
            layerId: No,
            event: {
              time: r(),
              title: "Change",
              subtitle: l,
              data: {
                newValue: a,
                oldValue: s
              },
              groupId: Vo
            }
          });
        }, { deep: !0 });
      }), o.$subscribe(({ events: l, type: a }, s) => {
        if (t.notifyComponentUpdate(), t.sendInspectorState(we), !vt)
          return;
        const c = {
          time: r(),
          title: Uc(a),
          data: Gc({ store: Xe(o.$id) }, Vc(l)),
          groupId: Vo
        };
        Vo = void 0, a === ro.patchFunction ? c.subtitle = "⤵️" : a === ro.patchObject ? c.subtitle = "🧩" : l && !Array.isArray(l) && (c.subtitle = l.type), l && (c.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: l
          }
        }), t.addTimelineEvent({
          layerId: No,
          event: c
        });
      }, { detached: !0, flush: "sync" });
      const n = o._hotUpdate;
      o._hotUpdate = bo((l) => {
        n(l), t.addTimelineEvent({
          layerId: No,
          event: {
            time: r(),
            title: "🔥 " + o.$id,
            subtitle: "HMR update",
            data: {
              store: Xe(o.$id),
              info: Xe("HMR update")
            }
          }
        }), t.notifyComponentUpdate(), t.sendInspectorTree(we), t.sendInspectorState(we);
      });
      const { $dispose: i } = o;
      o.$dispose = () => {
        i(), t.notifyComponentUpdate(), t.sendInspectorTree(we), t.sendInspectorState(we), t.getSettings().logStoreChanges && be(`Disposed "${o.$id}" store 🗑`);
      }, t.notifyComponentUpdate(), t.sendInspectorTree(we), t.sendInspectorState(we), t.getSettings().logStoreChanges && be(`"${o.$id}" store installed 🆕`);
    });
  }
  let Vl = 0, Vo;
  function hi(e, o) {
    const t = o.reduce((r, n) => (r[n] = kr(e)[n], r), {});
    for (const r in t)
      e[r] = function() {
        const n = Vl, i = new Proxy(e, {
          get(...l) {
            return Vo = n, Reflect.get(...l);
          },
          set(...l) {
            return Vo = n, Reflect.set(...l);
          }
        });
        return t[r].apply(i, arguments);
      };
  }
  function Yc({ app: e, store: o, options: t }) {
    if (!o.$id.startsWith("__hot:")) {
      if (t.state && (o._isOptionsAPI = !0), typeof t.state == "function") {
        hi(
          // @ts-expect-error: can cast the store...
          o,
          Object.keys(t.actions)
        );
        const r = o._hotUpdate;
        kr(o)._hotUpdate = function(n) {
          r.apply(this, arguments), hi(o, Object.keys(n._hmrPayload.actions));
        };
      }
      Xc(
        e,
        // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
        o
      );
    }
  }
  function qc() {
    const e = Ml(!0), o = e.run(() => R({}));
    let t = [], r = [];
    const n = bo({
      install(i) {
        Nt(n), n._a = i, i.provide(Al, n), i.config.globalProperties.$pinia = n, Bt && Kc(i, n), r.forEach((l) => t.push(l)), r = [];
      },
      use(i) {
        return !this._a && !Dl ? r.push(i) : t.push(i), this;
      },
      _p: t,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: e,
      _s: /* @__PURE__ */ new Map(),
      state: o
    });
    return Bt && typeof Proxy < "u" && n.use(Yc), n;
  }
  function Ul(e, o) {
    for (const t in o) {
      const r = o[t];
      if (!(t in e))
        continue;
      const n = e[t];
      qo(n) && qo(r) && !Wt(r) && !Fn(r) ? e[t] = Ul(n, r) : e[t] = r;
    }
    return e;
  }
  const Gl = () => {
  };
  function pi(e, o, t, r = Gl) {
    e.push(o);
    const n = () => {
      const i = e.indexOf(o);
      i > -1 && (e.splice(i, 1), r());
    };
    return !t && xc() && Cc(n), n;
  }
  function ut(e, ...o) {
    e.slice().forEach((t) => {
      t(...o);
    });
  }
  const Jc = (e) => e();
  function gn(e, o) {
    e instanceof Map && o instanceof Map && o.forEach((t, r) => e.set(r, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
    for (const t in o) {
      if (!o.hasOwnProperty(t))
        continue;
      const r = o[t], n = e[t];
      qo(n) && qo(r) && e.hasOwnProperty(t) && !Wt(r) && !Fn(r) ? e[t] = gn(n, r) : e[t] = r;
    }
    return e;
  }
  const Zc = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
    /* istanbul ignore next */
    Symbol()
  );
  function Qc(e) {
    return !qo(e) || !e.hasOwnProperty(Zc);
  }
  const { assign: Ne } = Object;
  function vi(e) {
    return !!(Wt(e) && e.effect);
  }
  function gi(e, o, t, r) {
    const { state: n, actions: i, getters: l } = o, a = t.state.value[e];
    let s;
    function c() {
      !a && (process.env.NODE_ENV === "production" || !r) && (t.state.value[e] = n ? n() : {});
      const u = process.env.NODE_ENV !== "production" && r ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        ui(R(n ? n() : {}).value)
      ) : ui(t.state.value[e]);
      return Ne(u, i, Object.keys(l || {}).reduce((f, v) => (process.env.NODE_ENV !== "production" && v in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), f[v] = bo(E(() => {
        Nt(t);
        const p = t._s.get(e);
        return l[v].call(p, p);
      })), f), {}));
    }
    return s = mn(e, c, o, t, r, !0), s;
  }
  function mn(e, o, t = {}, r, n, i) {
    let l;
    const a = Ne({ actions: {} }, t);
    if (process.env.NODE_ENV !== "production" && !r._e.active)
      throw new Error("Pinia destroyed");
    const s = {
      deep: !0
      // flush: 'post',
    };
    process.env.NODE_ENV !== "production" && !Dl && (s.onTrigger = (y) => {
      c ? p = y : c == !1 && !b._hotUpdating && (Array.isArray(p) ? p.push(y) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
    });
    let c, u, f = [], v = [], p;
    const d = r.state.value[e];
    !i && !d && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
    const g = R({});
    let x;
    function h(y) {
      let C;
      c = u = !1, process.env.NODE_ENV !== "production" && (p = []), typeof y == "function" ? (y(r.state.value[e]), C = {
        type: ro.patchFunction,
        storeId: e,
        events: p
      }) : (gn(r.state.value[e], y), C = {
        type: ro.patchObject,
        payload: y,
        storeId: e,
        events: p
      });
      const P = x = Symbol();
      Ct().then(() => {
        x === P && (c = !0);
      }), u = !0, ut(f, C, r.state.value[e]);
    }
    const w = i ? function() {
      const { state: C } = t, P = C ? C() : {};
      this.$patch((A) => {
        Ne(A, P);
      });
    } : (
      /* istanbul ignore next */
      process.env.NODE_ENV !== "production" ? () => {
        throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
      } : Gl
    );
    function _() {
      l.stop(), f = [], v = [], r._s.delete(e);
    }
    function I(y, C) {
      return function() {
        Nt(r);
        const P = Array.from(arguments), A = [], O = [];
        function N(X) {
          A.push(X);
        }
        function U(X) {
          O.push(X);
        }
        ut(v, {
          args: P,
          name: y,
          store: b,
          after: N,
          onError: U
        });
        let K;
        try {
          K = C.apply(this && this.$id === e ? this : b, P);
        } catch (X) {
          throw ut(O, X), X;
        }
        return K instanceof Promise ? K.then((X) => (ut(A, X), X)).catch((X) => (ut(O, X), Promise.reject(X))) : (ut(A, K), K);
      };
    }
    const M = /* @__PURE__ */ bo({
      actions: {},
      getters: {},
      state: [],
      hotState: g
    }), H = {
      _p: r,
      // _s: scope,
      $id: e,
      $onAction: pi.bind(null, v),
      $patch: h,
      $reset: w,
      $subscribe(y, C = {}) {
        const P = pi(f, y, C.detached, () => A()), A = l.run(() => xe(() => r.state.value[e], (O) => {
          (C.flush === "sync" ? u : c) && y({
            storeId: e,
            type: ro.direct,
            events: p
          }, O);
        }, Ne({}, s, C)));
        return P;
      },
      $dispose: _
    }, b = bc(process.env.NODE_ENV !== "production" || Bt ? Ne(
      {
        _hmrPayload: M,
        _customProperties: bo(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      H
      // must be added later
      // setupStore
    ) : H);
    r._s.set(e, b);
    const $ = r._a && r._a.runWithContext || Jc, z = r._e.run(() => (l = Ml(), $(() => l.run(o))));
    for (const y in z) {
      const C = z[y];
      if (Wt(C) && !vi(C) || Fn(C))
        process.env.NODE_ENV !== "production" && n ? er(g.value, y, se(z, y)) : i || (d && Qc(C) && (Wt(C) ? C.value = d[y] : gn(C, d[y])), r.state.value[e][y] = C), process.env.NODE_ENV !== "production" && M.state.push(y);
      else if (typeof C == "function") {
        const P = process.env.NODE_ENV !== "production" && n ? C : I(y, C);
        z[y] = P, process.env.NODE_ENV !== "production" && (M.actions[y] = C), a.actions[y] = C;
      } else
        process.env.NODE_ENV !== "production" && vi(C) && (M.getters[y] = i ? (
          // @ts-expect-error
          t.getters[y]
        ) : C, Er && (z._getters || // @ts-expect-error: same
        (z._getters = bo([]))).push(y));
    }
    if (Ne(b, z), Ne(kr(b), z), Object.defineProperty(b, "$state", {
      get: () => process.env.NODE_ENV !== "production" && n ? g.value : r.state.value[e],
      set: (y) => {
        if (process.env.NODE_ENV !== "production" && n)
          throw new Error("cannot set hotState");
        h((C) => {
          Ne(C, y);
        });
      }
    }), process.env.NODE_ENV !== "production" && (b._hotUpdate = bo((y) => {
      b._hotUpdating = !0, y._hmrPayload.state.forEach((C) => {
        if (C in b.$state) {
          const P = y.$state[C], A = b.$state[C];
          typeof P == "object" && qo(P) && qo(A) ? Ul(P, A) : y.$state[C] = A;
        }
        er(b, C, se(y.$state, C));
      }), Object.keys(b.$state).forEach((C) => {
        C in y.$state || jr(b, C);
      }), c = !1, u = !1, r.state.value[e] = se(y._hmrPayload, "hotState"), u = !0, Ct().then(() => {
        c = !0;
      });
      for (const C in y._hmrPayload.actions) {
        const P = y[C];
        er(b, C, I(C, P));
      }
      for (const C in y._hmrPayload.getters) {
        const P = y._hmrPayload.getters[C], A = i ? (
          // special handling of options api
          E(() => (Nt(r), P.call(b, b)))
        ) : P;
        er(b, C, A);
      }
      Object.keys(b._hmrPayload.getters).forEach((C) => {
        C in y._hmrPayload.getters || jr(b, C);
      }), Object.keys(b._hmrPayload.actions).forEach((C) => {
        C in y._hmrPayload.actions || jr(b, C);
      }), b._hmrPayload = y._hmrPayload, b._getters = y._getters, b._hotUpdating = !1;
    })), Bt) {
      const y = {
        writable: !0,
        configurable: !0,
        // avoid warning on devtools trying to display this property
        enumerable: !1
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((C) => {
        Object.defineProperty(b, C, Ne({ value: b[C] }, y));
      });
    }
    return r._p.forEach((y) => {
      if (Bt) {
        const C = l.run(() => y({
          store: b,
          app: r._a,
          pinia: r,
          options: a
        }));
        Object.keys(C || {}).forEach((P) => b._customProperties.add(P)), Ne(b, C);
      } else
        Ne(b, l.run(() => y({
          store: b,
          app: r._a,
          pinia: r,
          options: a
        })));
    }), process.env.NODE_ENV !== "production" && b.$state && typeof b.$state == "object" && typeof b.$state.constructor == "function" && !b.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${b.$id}".`), d && i && t.hydrate && t.hydrate(b.$state, d), c = !0, u = !0, b;
  }
  function Kl(e, o, t) {
    let r, n;
    const i = typeof o == "function";
    if (typeof e == "string")
      r = e, n = i ? t : o;
    else if (n = e, r = e.id, process.env.NODE_ENV !== "production" && typeof r != "string")
      throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
    function l(a, s) {
      const c = mc();
      if (a = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (process.env.NODE_ENV === "test" && Dt && Dt._testing ? null : a) || (c ? he(Al, null) : null), a && Nt(a), process.env.NODE_ENV !== "production" && !Dt)
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      a = Dt, a._s.has(r) || (i ? mn(r, o, n, a) : gi(r, n, a), process.env.NODE_ENV !== "production" && (l._pinia = a));
      const u = a._s.get(r);
      if (process.env.NODE_ENV !== "production" && s) {
        const f = "__hot:" + r, v = i ? mn(f, o, n, a, !0) : gi(f, Ne({}, n), a, !0);
        s._hotUpdate(v), delete a.state.value[f], a._s.delete(f);
      }
      if (process.env.NODE_ENV !== "production" && Er) {
        const f = Rn();
        if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
        !s) {
          const v = f.proxy, p = "_pStores" in v ? v._pStores : v._pStores = {};
          p[r] = u;
        }
      }
      return u;
    }
    return l.$id = r, l;
  }
  let mr = [];
  const Xl = /* @__PURE__ */ new WeakMap();
  function ed() {
    mr.forEach((e) => e(...Xl.get(e))), mr = [];
  }
  function Yl(e, ...o) {
    Xl.set(e, o), !mr.includes(e) && mr.push(e) === 1 && requestAnimationFrame(ed);
  }
  function br(e, o) {
    let { target: t } = e;
    for (; t; ) {
      if (t.dataset && t.dataset[o] !== void 0)
        return !0;
      t = t.parentElement;
    }
    return !1;
  }
  function jt(e) {
    return e.composedPath()[0] || null;
  }
  function bn(e) {
    return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
  }
  function or(e) {
    if (e != null)
      return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
  }
  function Vr(e, o) {
    const t = e.trim().split(/\s+/g), r = {
      top: t[0]
    };
    switch (t.length) {
      case 1:
        r.right = t[0], r.bottom = t[0], r.left = t[0];
        break;
      case 2:
        r.right = t[1], r.left = t[1], r.bottom = t[0];
        break;
      case 3:
        r.right = t[1], r.bottom = t[2], r.left = t[1];
        break;
      case 4:
        r.right = t[1], r.bottom = t[2], r.left = t[3];
        break;
      default:
        throw new Error("[seemly/getMargin]:" + e + " is not a valid value.");
    }
    return o === void 0 ? r : r[o];
  }
  const mi = {
    black: "#000",
    silver: "#C0C0C0",
    gray: "#808080",
    white: "#FFF",
    maroon: "#800000",
    red: "#F00",
    purple: "#800080",
    fuchsia: "#F0F",
    green: "#008000",
    lime: "#0F0",
    olive: "#808000",
    yellow: "#FF0",
    navy: "#000080",
    blue: "#00F",
    teal: "#008080",
    aqua: "#0FF",
    transparent: "#0000"
  }, St = "^\\s*", wt = "\\s*$", Uo = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Go = "([0-9A-Fa-f])", Ko = "([0-9A-Fa-f]{2})", od = new RegExp(`${St}rgb\\s*\\(${Uo},${Uo},${Uo}\\)${wt}`), td = new RegExp(`${St}rgba\\s*\\(${Uo},${Uo},${Uo},${Uo}\\)${wt}`), rd = new RegExp(`${St}#${Go}${Go}${Go}${wt}`), nd = new RegExp(`${St}#${Ko}${Ko}${Ko}${wt}`), id = new RegExp(`${St}#${Go}${Go}${Go}${Go}${wt}`), ld = new RegExp(`${St}#${Ko}${Ko}${Ko}${Ko}${wt}`);
  function Oe(e) {
    return parseInt(e, 16);
  }
  function yo(e) {
    try {
      let o;
      if (o = nd.exec(e))
        return [Oe(o[1]), Oe(o[2]), Oe(o[3]), 1];
      if (o = od.exec(e))
        return [$e(o[1]), $e(o[5]), $e(o[9]), 1];
      if (o = td.exec(e))
        return [
          $e(o[1]),
          $e(o[5]),
          $e(o[9]),
          At(o[13])
        ];
      if (o = rd.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          1
        ];
      if (o = ld.exec(e))
        return [
          Oe(o[1]),
          Oe(o[2]),
          Oe(o[3]),
          At(Oe(o[4]) / 255)
        ];
      if (o = id.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          At(Oe(o[4] + o[4]) / 255)
        ];
      if (e in mi)
        return yo(mi[e]);
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (o) {
      throw o;
    }
  }
  function ad(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function xn(e, o, t, r) {
    return `rgba(${$e(e)}, ${$e(o)}, ${$e(t)}, ${ad(r)})`;
  }
  function Ur(e, o, t, r, n) {
    return $e((e * o * (1 - r) + t * r) / n);
  }
  function ee(e, o) {
    Array.isArray(e) || (e = yo(e)), Array.isArray(o) || (o = yo(o));
    const t = e[3], r = o[3], n = At(t + r - t * r);
    return xn(Ur(e[0], t, o[0], r, n), Ur(e[1], t, o[1], r, n), Ur(e[2], t, o[2], r, n), n);
  }
  function D(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : yo(e);
    return o.alpha ? xn(t, r, n, o.alpha) : xn(t, r, n, i);
  }
  function ve(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : yo(e), { lightness: l = 1, alpha: a = 1 } = o;
    return sd([t * l, r * l, n * l, i * a]);
  }
  function At(e) {
    const o = Math.round(Number(e) * 100) / 100;
    return o > 1 ? 1 : o < 0 ? 0 : o;
  }
  function $e(e) {
    const o = Math.round(Number(e));
    return o > 255 ? 255 : o < 0 ? 0 : o;
  }
  function sd(e) {
    const [o, t, r] = e;
    return 3 in e ? `rgba(${$e(o)}, ${$e(t)}, ${$e(r)}, ${At(e[3])})` : `rgba(${$e(o)}, ${$e(t)}, ${$e(r)}, 1)`;
  }
  function cd(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  }
  function dd(e, o = [], t) {
    const r = {};
    return o.forEach((n) => {
      r[n] = e[n];
    }), Object.assign(r, t);
  }
  function Cn(e, o = !0, t = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && t.push(xo(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          Cn(r, o, t);
          return;
        }
        if (r.type === oo) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && Cn(r.children, o, t);
        } else
          r.type !== Ln && t.push(r);
      }
    }), t;
  }
  function Se(e, ...o) {
    if (Array.isArray(e))
      e.forEach((t) => Se(t, ...o));
    else
      return e(...o);
  }
  const gt = (e, ...o) => typeof e == "function" ? e(...o) : typeof e == "string" ? xo(e) : typeof e == "number" ? xo(String(e)) : null, bi = /* @__PURE__ */ new Set();
  function _o(e, o) {
    const t = `[naive/${e}]: ${o}`;
    bi.has(t) || (bi.add(t), console.error(t));
  }
  function xr(e, o) {
    console.error(`[naive/${e}]: ${o}`);
  }
  function ql(e, o) {
    throw new Error(`[naive/${e}]: ${o}`);
  }
  function ud(e) {
    switch (typeof e) {
      case "string":
        return e || void 0;
      case "number":
        return String(e);
      default:
        return;
    }
  }
  function xi(e, o = "default", t = void 0) {
    const r = e[o];
    if (!r)
      return xr("getFirstSlotVNode", `slot[${o}] is empty`), null;
    const n = Cn(r(t));
    return n.length === 1 ? n[0] : (xr("getFirstSlotVNode", `slot[${o}] should have exactly one child`), null);
  }
  function _r(e) {
    return e.some((o) => yc(o) ? !(o.type === Ln || o.type === oo && !_r(o.children)) : !0) ? e : null;
  }
  function Vn(e, o) {
    return e && _r(e()) || o();
  }
  function mt(e, o) {
    const t = e && _r(e());
    return o(t || null);
  }
  function Ci(e) {
    return !(e && _r(e()));
  }
  function Gr(e) {
    const o = e.filter((t) => t !== void 0);
    if (o.length !== 0)
      return o.length === 1 ? o[0] : (t) => {
        e.forEach((r) => {
          r && r(t);
        });
      };
  }
  const yn = ie({
    render() {
      var e, o;
      return (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e);
    }
  }), fd = /^(\d|\.)+$/, yi = /(\d|\.)+/;
  function hr(e, { c: o = 1, offset: t = 0, attachPx: r = !0 } = {}) {
    if (typeof e == "number") {
      const n = (e + t) * o;
      return n === 0 ? "0" : `${n}px`;
    } else if (typeof e == "string")
      if (fd.test(e)) {
        const n = (Number(e) + t) * o;
        return r ? n === 0 ? "0" : `${n}px` : `${n}`;
      } else {
        const n = yi.exec(e);
        return n ? e.replace(yi, String((Number(n[0]) + t) * o)) : e;
      }
    return e;
  }
  function Si(e) {
    return e.replace(/#|\(|\)|,|\s/g, "_");
  }
  function hd(e) {
    let o = 0;
    for (let t = 0; t < e.length; ++t)
      e[t] === "&" && ++o;
    return o;
  }
  const Jl = /\s*,(?![^(]*\))\s*/g, pd = /\s+/g;
  function vd(e, o) {
    const t = [];
    return o.split(Jl).forEach((r) => {
      let n = hd(r);
      if (n) {
        if (n === 1) {
          e.forEach((l) => {
            t.push(r.replace("&", l));
          });
          return;
        }
      } else {
        e.forEach((l) => {
          t.push(
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            (l && l + " ") + r
          );
        });
        return;
      }
      let i = [
        r
      ];
      for (; n--; ) {
        const l = [];
        i.forEach((a) => {
          e.forEach((s) => {
            l.push(a.replace("&", s));
          });
        }), i = l;
      }
      i.forEach((l) => t.push(l));
    }), t;
  }
  function gd(e, o) {
    const t = [];
    return o.split(Jl).forEach((r) => {
      e.forEach((n) => {
        t.push((n && n + " ") + r);
      });
    }), t;
  }
  function md(e) {
    let o = [""];
    return e.forEach((t) => {
      t = t && t.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      t && (t.includes("&") ? o = vd(o, t) : o = gd(o, t));
    }), o.join(", ").replace(pd, " ");
  }
  function wi(e) {
    if (!e)
      return;
    const o = e.parentElement;
    o && o.removeChild(e);
  }
  function Dr(e) {
    return document.querySelector(`style[cssr-id="${e}"]`);
  }
  function bd(e) {
    const o = document.createElement("style");
    return o.setAttribute("cssr-id", e), o;
  }
  function tr(e) {
    return e ? /^\s*@(s|m)/.test(e) : !1;
  }
  const xd = /[A-Z]/g;
  function Zl(e) {
    return e.replace(xd, (o) => "-" + o.toLowerCase());
  }
  function Cd(e, o = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((t) => o + `  ${Zl(t[0])}: ${t[1]};`).join(`
`) + `
` + o + "}" : `: ${e};`;
  }
  function yd(e, o, t) {
    return typeof e == "function" ? e({
      context: o.context,
      props: t
    }) : e;
  }
  function $i(e, o, t, r) {
    if (!o)
      return "";
    const n = yd(o, t, r);
    if (!n)
      return "";
    if (typeof n == "string")
      return `${e} {
${n}
}`;
    const i = Object.keys(n);
    if (i.length === 0)
      return t.config.keepEmptyBlock ? e + ` {
}` : "";
    const l = e ? [
      e + " {"
    ] : [];
    return i.forEach((a) => {
      const s = n[a];
      if (a === "raw") {
        l.push(`
` + s + `
`);
        return;
      }
      a = Zl(a), s != null && l.push(`  ${a}${Cd(s)}`);
    }), e && l.push("}"), l.join(`
`);
  }
  function Sn(e, o, t) {
    e && e.forEach((r) => {
      if (Array.isArray(r))
        Sn(r, o, t);
      else if (typeof r == "function") {
        const n = r(o);
        Array.isArray(n) ? Sn(n, o, t) : n && t(n);
      } else
        r && t(r);
    });
  }
  function Ql(e, o, t, r, n, i) {
    const l = e.$;
    let a = "";
    if (!l || typeof l == "string")
      tr(l) ? a = l : o.push(l);
    else if (typeof l == "function") {
      const u = l({
        context: r.context,
        props: n
      });
      tr(u) ? a = u : o.push(u);
    } else if (l.before && l.before(r.context), !l.$ || typeof l.$ == "string")
      tr(l.$) ? a = l.$ : o.push(l.$);
    else if (l.$) {
      const u = l.$({
        context: r.context,
        props: n
      });
      tr(u) ? a = u : o.push(u);
    }
    const s = md(o), c = $i(s, e.props, r, n);
    a ? (t.push(`${a} {`), i && c && i.insertRule(`${a} {
${c}
}
`)) : (i && c && i.insertRule(c), !i && c.length && t.push(c)), e.children && Sn(e.children, {
      context: r.context,
      props: n
    }, (u) => {
      if (typeof u == "string") {
        const f = $i(s, { raw: u }, r, n);
        i ? i.insertRule(f) : t.push(f);
      } else
        Ql(u, o, t, r, n, i);
    }), o.pop(), a && t.push("}"), l && l.after && l.after(r.context);
  }
  function ea(e, o, t, r = !1) {
    const n = [];
    return Ql(e, [], n, o, t, r ? e.instance.__styleSheet : void 0), r ? "" : n.join(`

`);
  }
  function Vt(e) {
    for (var o = 0, t, r = 0, n = e.length; n >= 4; ++r, n -= 4)
      t = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, t = /* Math.imul(k, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), t ^= /* k >>> r: */
      t >>> 24, o = /* Math.imul(k, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
      (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16);
    switch (n) {
      case 3:
        o ^= (e.charCodeAt(r + 2) & 255) << 16;
      case 2:
        o ^= (e.charCodeAt(r + 1) & 255) << 8;
      case 1:
        o ^= e.charCodeAt(r) & 255, o = /* Math.imul(h, m): */
        (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16);
    }
    return o ^= o >>> 13, o = /* Math.imul(h, m): */
    (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16), ((o ^ o >>> 15) >>> 0).toString(36);
  }
  typeof window < "u" && (window.__cssrContext = {});
  function Sd(e, o, t) {
    const { els: r } = o;
    if (t === void 0)
      r.forEach(wi), o.els = [];
    else {
      const n = Dr(t);
      n && r.includes(n) && (wi(n), o.els = r.filter((i) => i !== n));
    }
  }
  function Pi(e, o) {
    e.push(o);
  }
  function wd(e, o, t, r, n, i, l, a, s) {
    if (i && !s) {
      if (t === void 0) {
        console.error("[css-render/mount]: `id` is required in `silent` mode.");
        return;
      }
      const v = window.__cssrContext;
      v[t] || (v[t] = !0, ea(o, e, r, i));
      return;
    }
    let c;
    if (t === void 0 && (c = o.render(r), t = Vt(c)), s) {
      s.adapter(t, c ?? o.render(r));
      return;
    }
    const u = Dr(t);
    if (u !== null && !l)
      return u;
    const f = u ?? bd(t);
    if (c === void 0 && (c = o.render(r)), f.textContent = c, u !== null)
      return u;
    if (a) {
      const v = document.head.querySelector(`meta[name="${a}"]`);
      if (v)
        return document.head.insertBefore(f, v), Pi(o.els, f), f;
    }
    return n ? document.head.insertBefore(f, document.head.querySelector("style, link")) : document.head.appendChild(f), Pi(o.els, f), f;
  }
  function $d(e) {
    return ea(this, this.instance, e);
  }
  function Pd(e = {}) {
    const { id: o, ssr: t, props: r, head: n = !1, silent: i = !1, force: l = !1, anchorMetaName: a } = e;
    return wd(this.instance, this, o, r, n, i, l, a, t);
  }
  function Td(e = {}) {
    const { id: o } = e;
    Sd(this.instance, this, o);
  }
  const rr = function(e, o, t, r) {
    return {
      instance: e,
      $: o,
      props: t,
      children: r,
      els: [],
      render: $d,
      mount: Pd,
      unmount: Td
    };
  }, zd = function(e, o, t, r) {
    return Array.isArray(o) ? rr(e, { $: null }, null, o) : Array.isArray(t) ? rr(e, o, null, t) : Array.isArray(r) ? rr(e, o, t, r) : rr(e, o, t, null);
  };
  function oa(e = {}) {
    let o = null;
    const t = {
      c: (...r) => zd(t, ...r),
      use: (r, ...n) => r.install(t, ...n),
      find: Dr,
      context: {},
      config: e,
      get __styleSheet() {
        if (!o) {
          const r = document.createElement("style");
          return document.head.appendChild(r), o = document.styleSheets[document.styleSheets.length - 1], o;
        }
        return o;
      }
    };
    return t;
  }
  function Id(e, o) {
    if (e === void 0)
      return !1;
    if (o) {
      const { context: { ids: t } } = o;
      return t.has(e);
    }
    return Dr(e) !== null;
  }
  function Md(e) {
    let o = ".", t = "__", r = "--", n;
    if (e) {
      let d = e.blockPrefix;
      d && (o = d), d = e.elementPrefix, d && (t = d), d = e.modifierPrefix, d && (r = d);
    }
    const i = {
      install(d) {
        n = d.c;
        const g = d.context;
        g.bem = {}, g.bem.b = null, g.bem.els = null;
      }
    };
    function l(d) {
      let g, x;
      return {
        before(h) {
          g = h.bem.b, x = h.bem.els, h.bem.els = null;
        },
        after(h) {
          h.bem.b = g, h.bem.els = x;
        },
        $({ context: h, props: w }) {
          return d = typeof d == "string" ? d : d({ context: h, props: w }), h.bem.b = d, `${(w == null ? void 0 : w.bPrefix) || o}${h.bem.b}`;
        }
      };
    }
    function a(d) {
      let g;
      return {
        before(x) {
          g = x.bem.els;
        },
        after(x) {
          x.bem.els = g;
        },
        $({ context: x, props: h }) {
          return d = typeof d == "string" ? d : d({ context: x, props: h }), x.bem.els = d.split(",").map((w) => w.trim()), x.bem.els.map((w) => `${(h == null ? void 0 : h.bPrefix) || o}${x.bem.b}${t}${w}`).join(", ");
        }
      };
    }
    function s(d) {
      return {
        $({ context: g, props: x }) {
          d = typeof d == "string" ? d : d({ context: g, props: x });
          const h = d.split(",").map((I) => I.trim());
          function w(I) {
            return h.map((M) => `&${(x == null ? void 0 : x.bPrefix) || o}${g.bem.b}${I !== void 0 ? `${t}${I}` : ""}${r}${M}`).join(", ");
          }
          const _ = g.bem.els;
          if (_ !== null) {
            if (process.env.NODE_ENV !== "production" && _.length >= 2)
              throw Error(`[css-render/plugin-bem]: m(${d}) is invalid, using modifier inside multiple elements is not allowed`);
            return w(_[0]);
          } else
            return w();
        }
      };
    }
    function c(d) {
      return {
        $({ context: g, props: x }) {
          d = typeof d == "string" ? d : d({ context: g, props: x });
          const h = g.bem.els;
          if (process.env.NODE_ENV !== "production" && h !== null && h.length >= 2)
            throw Error(`[css-render/plugin-bem]: notM(${d}) is invalid, using modifier inside multiple elements is not allowed`);
          return `&:not(${(x == null ? void 0 : x.bPrefix) || o}${g.bem.b}${h !== null && h.length > 0 ? `${t}${h[0]}` : ""}${r}${d})`;
        }
      };
    }
    return Object.assign(i, {
      cB: (...d) => n(l(d[0]), d[1], d[2]),
      cE: (...d) => n(a(d[0]), d[1], d[2]),
      cM: (...d) => n(s(d[0]), d[1], d[2]),
      cNotM: (...d) => n(c(d[0]), d[1], d[2])
    }), i;
  }
  function ce(e, o) {
    return e + (o === "default" ? "" : o.replace(/^[a-z]/, (t) => t.toUpperCase()));
  }
  ce("abc", "def");
  const kd = "n", Od = `.${kd}-`, Ed = "__", _d = "--", ta = oa(), ra = Md({
    blockPrefix: Od,
    elementPrefix: Ed,
    modifierPrefix: _d
  });
  ta.use(ra);
  const { c: V, find: vS } = ta, { cB: Q, cE: q, cM: le, cNotM: Ye } = ra, Dd = (...e) => V(">", [Q(...e)]);
  let Kr;
  function Hd() {
    return Kr === void 0 && (Kr = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Kr;
  }
  const Bd = /* @__PURE__ */ new WeakSet();
  function Ad(e) {
    Bd.add(e);
  }
  function Rd(e) {
    const o = R(!!e.value);
    if (o.value)
      return hn(o);
    const t = xe(e, (r) => {
      r && (o.value = !0, t());
    });
    return hn(o);
  }
  function qe(e) {
    const o = E(e), t = R(o.value);
    return xe(o, (r) => {
      t.value = r;
    }), typeof e == "function" ? t : {
      __v_isRef: !0,
      get value() {
        return t.value;
      },
      set value(r) {
        e.set(r);
      }
    };
  }
  const Fd = typeof window < "u";
  let bt, Rt;
  const Ld = () => {
    var e, o;
    bt = Fd ? (o = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || o === void 0 ? void 0 : o.ready : void 0, Rt = !1, bt !== void 0 ? bt.then(() => {
      Rt = !0;
    }) : Rt = !0;
  };
  Ld();
  function Wd(e) {
    if (Rt)
      return;
    let o = !1;
    Ve(() => {
      Rt || bt == null || bt.then(() => {
        o || e();
      });
    }), Je(() => {
      o = !0;
    });
  }
  function pr(e) {
    return e.composedPath()[0];
  }
  const Nd = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function jd(e, o, t) {
    if (e === "mousemoveoutside") {
      const r = (n) => {
        o.contains(pr(n)) || t(n);
      };
      return {
        mousemove: r,
        touchstart: r
      };
    } else if (e === "clickoutside") {
      let r = !1;
      const n = (l) => {
        r = !o.contains(pr(l));
      }, i = (l) => {
        r && (o.contains(pr(l)) || t(l));
      };
      return {
        mousedown: n,
        mouseup: i,
        touchstart: n,
        touchend: i
      };
    }
    return console.error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`
    ), {};
  }
  function na(e, o, t) {
    const r = Nd[e];
    let n = r.get(o);
    n === void 0 && r.set(o, n = /* @__PURE__ */ new WeakMap());
    let i = n.get(t);
    return i === void 0 && n.set(t, i = jd(e, o, t)), i;
  }
  function Vd(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = na(e, o, t);
      return Object.keys(n).forEach((i) => {
        ze(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Ud(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = na(e, o, t);
      return Object.keys(n).forEach((i) => {
        me(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Gd() {
    if (typeof window > "u")
      return {
        on: () => {
        },
        off: () => {
        }
      };
    const e = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
    function t() {
      e.set(this, !0);
    }
    function r() {
      e.set(this, !0), o.set(this, !0);
    }
    function n(b, $, z) {
      const y = b[$];
      return b[$] = function() {
        return z.apply(b, arguments), y.apply(b, arguments);
      }, b;
    }
    function i(b, $) {
      b[$] = Event.prototype[$];
    }
    const l = /* @__PURE__ */ new WeakMap(), a = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function s() {
      var b;
      return (b = l.get(this)) !== null && b !== void 0 ? b : null;
    }
    function c(b, $) {
      a !== void 0 && Object.defineProperty(b, "currentTarget", {
        configurable: !0,
        enumerable: !0,
        get: $ ?? a.get
      });
    }
    const u = {
      bubble: {},
      capture: {}
    }, f = {};
    function v() {
      const b = function($) {
        const { type: z, eventPhase: y, bubbles: C } = $, P = pr($);
        if (y === 2)
          return;
        const A = y === 1 ? "capture" : "bubble";
        let O = P;
        const N = [];
        for (; O === null && (O = window), N.push(O), O !== window; )
          O = O.parentNode || null;
        const U = u.capture[z], K = u.bubble[z];
        if (n($, "stopPropagation", t), n($, "stopImmediatePropagation", r), c($, s), A === "capture") {
          if (U === void 0)
            return;
          for (let X = N.length - 1; X >= 0 && !e.has($); --X) {
            const k = N[X], W = U.get(k);
            if (W !== void 0) {
              l.set($, k);
              for (const re of W) {
                if (o.has($))
                  break;
                re($);
              }
            }
            if (X === 0 && !C && K !== void 0) {
              const re = K.get(k);
              if (re !== void 0)
                for (const fe of re) {
                  if (o.has($))
                    break;
                  fe($);
                }
            }
          }
        } else if (A === "bubble") {
          if (K === void 0)
            return;
          for (let X = 0; X < N.length && !e.has($); ++X) {
            const k = N[X], W = K.get(k);
            if (W !== void 0) {
              l.set($, k);
              for (const re of W) {
                if (o.has($))
                  break;
                re($);
              }
            }
          }
        }
        i($, "stopPropagation"), i($, "stopImmediatePropagation"), c($);
      };
      return b.displayName = "evtdUnifiedHandler", b;
    }
    function p() {
      const b = function($) {
        const { type: z, eventPhase: y } = $;
        if (y !== 2)
          return;
        const C = f[z];
        C !== void 0 && C.forEach((P) => P($));
      };
      return b.displayName = "evtdUnifiedWindowEventHandler", b;
    }
    const d = v(), g = p();
    function x(b, $) {
      const z = u[b];
      return z[$] === void 0 && (z[$] = /* @__PURE__ */ new Map(), window.addEventListener($, d, b === "capture")), z[$];
    }
    function h(b) {
      return f[b] === void 0 && (f[b] = /* @__PURE__ */ new Set(), window.addEventListener(b, g)), f[b];
    }
    function w(b, $) {
      let z = b.get($);
      return z === void 0 && b.set($, z = /* @__PURE__ */ new Set()), z;
    }
    function _(b, $, z, y) {
      const C = u[$][z];
      if (C !== void 0) {
        const P = C.get(b);
        if (P !== void 0 && P.has(y))
          return !0;
      }
      return !1;
    }
    function I(b, $) {
      const z = f[b];
      return !!(z !== void 0 && z.has($));
    }
    function M(b, $, z, y) {
      let C;
      if (typeof y == "object" && y.once === !0 ? C = (U) => {
        H(b, $, C, y), z(U);
      } : C = z, Vd(b, $, C, y))
        return;
      const A = y === !0 || typeof y == "object" && y.capture === !0 ? "capture" : "bubble", O = x(A, b), N = w(O, $);
      if (N.has(C) || N.add(C), $ === window) {
        const U = h(b);
        U.has(C) || U.add(C);
      }
    }
    function H(b, $, z, y) {
      if (Ud(b, $, z, y))
        return;
      const P = y === !0 || typeof y == "object" && y.capture === !0, A = P ? "capture" : "bubble", O = x(A, b), N = w(O, $);
      if ($ === window && !_($, P ? "bubble" : "capture", b, z) && I(b, z)) {
        const K = f[b];
        K.delete(z), K.size === 0 && (window.removeEventListener(b, g), f[b] = void 0);
      }
      N.has(z) && N.delete(z), N.size === 0 && O.delete($), O.size === 0 && (window.removeEventListener(b, d, A === "capture"), u[A][b] = void 0);
    }
    return {
      on: M,
      off: H
    };
  }
  const { on: ze, off: me } = Gd();
  function wn(e, o) {
    return xe(e, (t) => {
      t !== void 0 && (o.value = t);
    }), E(() => e.value === void 0 ? o.value : e.value);
  }
  function Hr() {
    const e = R(!1);
    return Ve(() => {
      e.value = !0;
    }), hn(e);
  }
  function ia(e, o) {
    return E(() => {
      for (const t of o)
        if (e[t] !== void 0)
          return e[t];
      return e[o[o.length - 1]];
    });
  }
  const Kd = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  !window.MSStream;
  function Xd() {
    return Kd;
  }
  const Un = "n-internal-select-menu", la = "n-internal-select-menu-body", aa = "n-modal-body", sa = "n-drawer-body", ca = "n-popover-body", da = "__disabled__";
  function So(e) {
    const o = he(aa, null), t = he(sa, null), r = he(ca, null), n = he(la, null), i = R();
    if (typeof document < "u") {
      i.value = document.fullscreenElement;
      const l = () => {
        i.value = document.fullscreenElement;
      };
      Ve(() => {
        ze("fullscreenchange", document, l);
      }), Je(() => {
        me("fullscreenchange", document, l);
      });
    }
    return qe(() => {
      var l;
      const { to: a } = e;
      return a !== void 0 ? a === !1 ? da : a === !0 ? i.value || "body" : a : o != null && o.value ? (l = o.value.$el) !== null && l !== void 0 ? l : o.value : t != null && t.value ? t.value : r != null && r.value ? r.value : n != null && n.value ? n.value : a ?? (i.value || "body");
    });
  }
  So.tdkey = da;
  So.propTo = {
    type: [String, Object, Boolean],
    default: void 0
  };
  function $n(e, o, t = "default") {
    const r = o[t];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${t}] is empty.`);
    return r();
  }
  function Pn(e, o = !0, t = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && t.push(xo(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          Pn(r, o, t);
          return;
        }
        if (r.type === oo) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && Pn(r.children, o, t);
        } else
          r.type !== Ln && t.push(r);
      }
    }), t;
  }
  function Ti(e, o, t = "default") {
    const r = o[t];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${t}] is empty.`);
    const n = Pn(r());
    if (n.length === 1)
      return n[0];
    throw new Error(`[vueuc/${e}]: slot[${t}] should have exactly one child.`);
  }
  let Oo = null;
  function ua() {
    if (Oo === null && (Oo = document.getElementById("v-binder-view-measurer"), Oo === null)) {
      Oo = document.createElement("div"), Oo.id = "v-binder-view-measurer";
      const { style: e } = Oo;
      e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(Oo);
    }
    return Oo.getBoundingClientRect();
  }
  function Yd(e, o) {
    const t = ua();
    return {
      top: o,
      left: e,
      height: 0,
      width: 0,
      right: t.width - e,
      bottom: t.height - o
    };
  }
  function Xr(e) {
    const o = e.getBoundingClientRect(), t = ua();
    return {
      left: o.left - t.left,
      top: o.top - t.top,
      bottom: t.height + t.top - o.bottom,
      right: t.width + t.left - o.right,
      width: o.width,
      height: o.height
    };
  }
  function qd(e) {
    return e.nodeType === 9 ? null : e.parentNode;
  }
  function fa(e) {
    if (e === null)
      return null;
    const o = qd(e);
    if (o === null)
      return null;
    if (o.nodeType === 9)
      return document;
    if (o.nodeType === 1) {
      const { overflow: t, overflowX: r, overflowY: n } = getComputedStyle(o);
      if (/(auto|scroll|overlay)/.test(t + n + r))
        return o;
    }
    return fa(o);
  }
  const Jd = ie({
    name: "Binder",
    props: {
      syncTargetWithParent: Boolean,
      syncTarget: {
        type: Boolean,
        default: !0
      }
    },
    setup(e) {
      var o;
      to("VBinder", (o = Rn()) === null || o === void 0 ? void 0 : o.proxy);
      const t = he("VBinder", null), r = R(null), n = (h) => {
        r.value = h, t && e.syncTargetWithParent && t.setTargetRef(h);
      };
      let i = [];
      const l = () => {
        let h = r.value;
        for (; h = fa(h), h !== null; )
          i.push(h);
        for (const w of i)
          ze("scroll", w, f, !0);
      }, a = () => {
        for (const h of i)
          me("scroll", h, f, !0);
        i = [];
      }, s = /* @__PURE__ */ new Set(), c = (h) => {
        s.size === 0 && l(), s.has(h) || s.add(h);
      }, u = (h) => {
        s.has(h) && s.delete(h), s.size === 0 && a();
      }, f = () => {
        Yl(v);
      }, v = () => {
        s.forEach((h) => h());
      }, p = /* @__PURE__ */ new Set(), d = (h) => {
        p.size === 0 && ze("resize", window, x), p.has(h) || p.add(h);
      }, g = (h) => {
        p.has(h) && p.delete(h), p.size === 0 && me("resize", window, x);
      }, x = () => {
        p.forEach((h) => h());
      };
      return Je(() => {
        me("resize", window, x), a();
      }), {
        targetRef: r,
        setTargetRef: n,
        addScrollListener: c,
        removeScrollListener: u,
        addResizeListener: d,
        removeResizeListener: g
      };
    },
    render() {
      return $n("binder", this.$slots);
    }
  }), ha = Jd, pa = ie({
    name: "Target",
    setup() {
      const { setTargetRef: e, syncTarget: o } = he("VBinder");
      return {
        syncTarget: o,
        setTargetDirective: {
          mounted: e,
          updated: e
        }
      };
    },
    render() {
      const { syncTarget: e, setTargetDirective: o } = this;
      return e ? Yt(Ti("follower", this.$slots), [
        [o]
      ]) : Ti("follower", this.$slots);
    }
  }), ft = "@@mmoContext", Zd = {
    mounted(e, { value: o }) {
      e[ft] = {
        handler: void 0
      }, typeof o == "function" && (e[ft].handler = o, ze("mousemoveoutside", e, o));
    },
    updated(e, { value: o }) {
      const t = e[ft];
      typeof o == "function" ? t.handler ? t.handler !== o && (me("mousemoveoutside", e, t.handler), t.handler = o, ze("mousemoveoutside", e, o)) : (e[ft].handler = o, ze("mousemoveoutside", e, o)) : t.handler && (me("mousemoveoutside", e, t.handler), t.handler = void 0);
    },
    unmounted(e) {
      const { handler: o } = e[ft];
      o && me("mousemoveoutside", e, o), e[ft].handler = void 0;
    }
  }, Qd = Zd, ht = "@@coContext", eu = {
    mounted(e, { value: o, modifiers: t }) {
      e[ht] = {
        handler: void 0
      }, typeof o == "function" && (e[ht].handler = o, ze("clickoutside", e, o, {
        capture: t.capture
      }));
    },
    updated(e, { value: o, modifiers: t }) {
      const r = e[ht];
      typeof o == "function" ? r.handler ? r.handler !== o && (me("clickoutside", e, r.handler, {
        capture: t.capture
      }), r.handler = o, ze("clickoutside", e, o, {
        capture: t.capture
      })) : (e[ht].handler = o, ze("clickoutside", e, o, {
        capture: t.capture
      })) : r.handler && (me("clickoutside", e, r.handler, {
        capture: t.capture
      }), r.handler = void 0);
    },
    unmounted(e, { modifiers: o }) {
      const { handler: t } = e[ht];
      t && me("clickoutside", e, t, {
        capture: o.capture
      }), e[ht].handler = void 0;
    }
  }, Cr = eu;
  function ou(e, o) {
    console.error(`[vdirs/${e}]: ${o}`);
  }
  class tu {
    constructor() {
      this.elementZIndex = /* @__PURE__ */ new Map(), this.nextZIndex = 2e3;
    }
    get elementCount() {
      return this.elementZIndex.size;
    }
    ensureZIndex(o, t) {
      const { elementZIndex: r } = this;
      if (t !== void 0) {
        o.style.zIndex = `${t}`, r.delete(o);
        return;
      }
      const { nextZIndex: n } = this;
      r.has(o) && r.get(o) + 1 === this.nextZIndex || (o.style.zIndex = `${n}`, r.set(o, n), this.nextZIndex = n + 1, this.squashState());
    }
    unregister(o, t) {
      const { elementZIndex: r } = this;
      r.has(o) ? r.delete(o) : t === void 0 && ou("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
    }
    squashState() {
      const { elementCount: o } = this;
      o || (this.nextZIndex = 2e3), this.nextZIndex - o > 2500 && this.rearrange();
    }
    rearrange() {
      const o = Array.from(this.elementZIndex.entries());
      o.sort((t, r) => t[1] - r[1]), this.nextZIndex = 2e3, o.forEach((t) => {
        const r = t[0], n = this.nextZIndex++;
        `${n}` !== r.style.zIndex && (r.style.zIndex = `${n}`);
      });
    }
  }
  const Yr = new tu(), pt = "@@ziContext", ru = {
    mounted(e, o) {
      const { value: t = {} } = o, { zIndex: r, enabled: n } = t;
      e[pt] = {
        enabled: !!n,
        initialized: !1
      }, n && (Yr.ensureZIndex(e, r), e[pt].initialized = !0);
    },
    updated(e, o) {
      const { value: t = {} } = o, { zIndex: r, enabled: n } = t, i = e[pt].enabled;
      n && !i && (Yr.ensureZIndex(e, r), e[pt].initialized = !0), e[pt].enabled = !!n;
    },
    unmounted(e, o) {
      if (!e[pt].initialized)
        return;
      const { value: t = {} } = o, { zIndex: r } = t;
      Yr.unregister(e, r);
    }
  }, va = ru, ga = Symbol("@css-render/vue3-ssr");
  function nu(e, o) {
    return `<style cssr-id="${e}">
${o}
</style>`;
  }
  function iu(e, o) {
    const t = he(ga, null);
    if (t === null) {
      console.error("[css-render/vue3-ssr]: no ssr context found.");
      return;
    }
    const { styles: r, ids: n } = t;
    n.has(e) || r !== null && (n.add(e), r.push(nu(e, o)));
  }
  const lu = typeof document < "u";
  function Zo() {
    if (lu)
      return;
    const e = he(ga, null);
    if (e !== null)
      return {
        adapter: iu,
        context: e
      };
  }
  function zi(e, o) {
    console.error(`[vueuc/${e}]: ${o}`);
  }
  const { c: Do } = oa(), Gn = "vueuc-style";
  function Ii(e) {
    return e & -e;
  }
  class au {
    /**
     * @param l length of the array
     * @param min min value of the array
     */
    constructor(o, t) {
      this.l = o, this.min = t;
      const r = new Array(o + 1);
      for (let n = 0; n < o + 1; ++n)
        r[n] = 0;
      this.ft = r;
    }
    /**
     * Add arr[i] by n, start from 0
     * @param i the index of the element to be added
     * @param n the value to be added
     */
    add(o, t) {
      if (t === 0)
        return;
      const { l: r, ft: n } = this;
      for (o += 1; o <= r; )
        n[o] += t, o += Ii(o);
    }
    /**
     * Get the value of index i
     * @param i index
     * @returns value of the index
     */
    get(o) {
      return this.sum(o + 1) - this.sum(o);
    }
    /**
     * Get the sum of first i elements
     * @param i count of head elements to be added
     * @returns the sum of first i elements
     */
    sum(o) {
      if (o === void 0 && (o = this.l), o <= 0)
        return 0;
      const { ft: t, min: r, l: n } = this;
      if (o > n)
        throw new Error("[FinweckTree.sum]: `i` is larger than length.");
      let i = o * r;
      for (; o > 0; )
        i += t[o], o -= Ii(o);
      return i;
    }
    /**
     * Get the largest count of head elements whose sum are <= threshold
     * @param threshold
     * @returns the largest count of head elements whose sum are <= threshold
     */
    getBound(o) {
      let t = 0, r = this.l;
      for (; r > t; ) {
        const n = Math.floor((t + r) / 2), i = this.sum(n);
        if (i > o) {
          r = n;
          continue;
        } else if (i < o) {
          if (t === n)
            return this.sum(t + 1) <= o ? t + 1 : n;
          t = n;
        } else
          return n;
      }
      return t;
    }
  }
  function Mi(e) {
    return typeof e == "string" ? document.querySelector(e) : e();
  }
  const su = ie({
    name: "LazyTeleport",
    props: {
      to: {
        type: [String, Object],
        default: void 0
      },
      disabled: Boolean,
      show: {
        type: Boolean,
        required: !0
      }
    },
    setup(e) {
      return {
        showTeleport: Rd(se(e, "show")),
        mergedTo: E(() => {
          const { to: o } = e;
          return o ?? "body";
        })
      };
    },
    render() {
      return this.showTeleport ? this.disabled ? $n("lazy-teleport", this.$slots) : S(Sc, {
        disabled: this.disabled,
        to: this.mergedTo
      }, $n("lazy-teleport", this.$slots)) : null;
    }
  }), nr = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, ki = {
    start: "end",
    center: "center",
    end: "start"
  }, qr = {
    top: "height",
    bottom: "height",
    left: "width",
    right: "width"
  }, cu = {
    "bottom-start": "top left",
    bottom: "top center",
    "bottom-end": "top right",
    "top-start": "bottom left",
    top: "bottom center",
    "top-end": "bottom right",
    "right-start": "top left",
    right: "center left",
    "right-end": "bottom left",
    "left-start": "top right",
    left: "center right",
    "left-end": "bottom right"
  }, du = {
    "bottom-start": "bottom left",
    bottom: "bottom center",
    "bottom-end": "bottom right",
    "top-start": "top left",
    top: "top center",
    "top-end": "top right",
    "right-start": "top right",
    right: "center right",
    "right-end": "bottom right",
    "left-start": "top left",
    left: "center left",
    "left-end": "bottom left"
  }, uu = {
    "bottom-start": "right",
    "bottom-end": "left",
    "top-start": "right",
    "top-end": "left",
    "right-start": "bottom",
    "right-end": "top",
    "left-start": "bottom",
    "left-end": "top"
  }, Oi = {
    top: !0,
    bottom: !1,
    left: !0,
    right: !1
    // left--
  }, Ei = {
    top: "end",
    bottom: "start",
    left: "end",
    right: "start"
  };
  function fu(e, o, t, r, n, i) {
    if (!n || i)
      return { placement: e, top: 0, left: 0 };
    const [l, a] = e.split("-");
    let s = a ?? "center", c = {
      top: 0,
      left: 0
    };
    const u = (p, d, g) => {
      let x = 0, h = 0;
      const w = t[p] - o[d] - o[p];
      return w > 0 && r && (g ? h = Oi[d] ? w : -w : x = Oi[d] ? w : -w), {
        left: x,
        top: h
      };
    }, f = l === "left" || l === "right";
    if (s !== "center") {
      const p = uu[e], d = nr[p], g = qr[p];
      if (t[g] > o[g]) {
        if (
          // current space is not enough
          // ----------[ target ]---------|
          // -------[     follower        ]
          o[p] + o[g] < t[g]
        ) {
          const x = (t[g] - o[g]) / 2;
          o[p] < x || o[d] < x ? o[p] < o[d] ? (s = ki[a], c = u(g, d, f)) : c = u(g, p, f) : s = "center";
        }
      } else
        t[g] < o[g] && o[d] < 0 && // opposite align has larger space
        // ------------[   target   ]
        // ----------------[follower]
        o[p] > o[d] && (s = ki[a]);
    } else {
      const p = l === "bottom" || l === "top" ? "left" : "top", d = nr[p], g = qr[p], x = (t[g] - o[g]) / 2;
      // center is not enough
      // ----------- [ target ]--|
      // -------[     follower     ]
      (o[p] < x || o[d] < x) && (o[p] > o[d] ? (s = Ei[p], c = u(g, p, f)) : (s = Ei[d], c = u(g, d, f)));
    }
    let v = l;
    return (
      // space is not enough
      o[l] < t[qr[l]] && // opposite position's space is larger
      o[l] < o[nr[l]] && (v = nr[l]), {
        placement: s !== "center" ? `${v}-${s}` : v,
        left: c.left,
        top: c.top
      }
    );
  }
  function hu(e, o) {
    return o ? du[e] : cu[e];
  }
  function pu(e, o, t, r, n, i) {
    if (i)
      switch (e) {
        case "bottom-start":
          return {
            top: `${Math.round(t.top - o.top + t.height)}px`,
            left: `${Math.round(t.left - o.left)}px`,
            transform: "translateY(-100%)"
          };
        case "bottom-end":
          return {
            top: `${Math.round(t.top - o.top + t.height)}px`,
            left: `${Math.round(t.left - o.left + t.width)}px`,
            transform: "translateX(-100%) translateY(-100%)"
          };
        case "top-start":
          return {
            top: `${Math.round(t.top - o.top)}px`,
            left: `${Math.round(t.left - o.left)}px`,
            transform: ""
          };
        case "top-end":
          return {
            top: `${Math.round(t.top - o.top)}px`,
            left: `${Math.round(t.left - o.left + t.width)}px`,
            transform: "translateX(-100%)"
          };
        case "right-start":
          return {
            top: `${Math.round(t.top - o.top)}px`,
            left: `${Math.round(t.left - o.left + t.width)}px`,
            transform: "translateX(-100%)"
          };
        case "right-end":
          return {
            top: `${Math.round(t.top - o.top + t.height)}px`,
            left: `${Math.round(t.left - o.left + t.width)}px`,
            transform: "translateX(-100%) translateY(-100%)"
          };
        case "left-start":
          return {
            top: `${Math.round(t.top - o.top)}px`,
            left: `${Math.round(t.left - o.left)}px`,
            transform: ""
          };
        case "left-end":
          return {
            top: `${Math.round(t.top - o.top + t.height)}px`,
            left: `${Math.round(t.left - o.left)}px`,
            transform: "translateY(-100%)"
          };
        case "top":
          return {
            top: `${Math.round(t.top - o.top)}px`,
            left: `${Math.round(t.left - o.left + t.width / 2)}px`,
            transform: "translateX(-50%)"
          };
        case "right":
          return {
            top: `${Math.round(t.top - o.top + t.height / 2)}px`,
            left: `${Math.round(t.left - o.left + t.width)}px`,
            transform: "translateX(-100%) translateY(-50%)"
          };
        case "left":
          return {
            top: `${Math.round(t.top - o.top + t.height / 2)}px`,
            left: `${Math.round(t.left - o.left)}px`,
            transform: "translateY(-50%)"
          };
        case "bottom":
        default:
          return {
            top: `${Math.round(t.top - o.top + t.height)}px`,
            left: `${Math.round(t.left - o.left + t.width / 2)}px`,
            transform: "translateX(-50%) translateY(-100%)"
          };
      }
    switch (e) {
      case "bottom-start":
        return {
          top: `${Math.round(t.top - o.top + t.height + r)}px`,
          left: `${Math.round(t.left - o.left + n)}px`,
          transform: ""
        };
      case "bottom-end":
        return {
          top: `${Math.round(t.top - o.top + t.height + r)}px`,
          left: `${Math.round(t.left - o.left + t.width + n)}px`,
          transform: "translateX(-100%)"
        };
      case "top-start":
        return {
          top: `${Math.round(t.top - o.top + r)}px`,
          left: `${Math.round(t.left - o.left + n)}px`,
          transform: "translateY(-100%)"
        };
      case "top-end":
        return {
          top: `${Math.round(t.top - o.top + r)}px`,
          left: `${Math.round(t.left - o.left + t.width + n)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "right-start":
        return {
          top: `${Math.round(t.top - o.top + r)}px`,
          left: `${Math.round(t.left - o.left + t.width + n)}px`,
          transform: ""
        };
      case "right-end":
        return {
          top: `${Math.round(t.top - o.top + t.height + r)}px`,
          left: `${Math.round(t.left - o.left + t.width + n)}px`,
          transform: "translateY(-100%)"
        };
      case "left-start":
        return {
          top: `${Math.round(t.top - o.top + r)}px`,
          left: `${Math.round(t.left - o.left + n)}px`,
          transform: "translateX(-100%)"
        };
      case "left-end":
        return {
          top: `${Math.round(t.top - o.top + t.height + r)}px`,
          left: `${Math.round(t.left - o.left + n)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "top":
        return {
          top: `${Math.round(t.top - o.top + r)}px`,
          left: `${Math.round(t.left - o.left + t.width / 2 + n)}px`,
          transform: "translateY(-100%) translateX(-50%)"
        };
      case "right":
        return {
          top: `${Math.round(t.top - o.top + t.height / 2 + r)}px`,
          left: `${Math.round(t.left - o.left + t.width + n)}px`,
          transform: "translateY(-50%)"
        };
      case "left":
        return {
          top: `${Math.round(t.top - o.top + t.height / 2 + r)}px`,
          left: `${Math.round(t.left - o.left + n)}px`,
          transform: "translateY(-50%) translateX(-100%)"
        };
      case "bottom":
      default:
        return {
          top: `${Math.round(t.top - o.top + t.height + r)}px`,
          left: `${Math.round(t.left - o.left + t.width / 2 + n)}px`,
          transform: "translateX(-50%)"
        };
    }
  }
  const vu = Do([
    Do(".v-binder-follower-container", {
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      height: "0",
      pointerEvents: "none",
      zIndex: "auto"
    }),
    Do(".v-binder-follower-content", {
      position: "absolute",
      zIndex: "auto"
    }, [
      Do("> *", {
        pointerEvents: "all"
      })
    ])
  ]), ma = ie({
    name: "Follower",
    inheritAttrs: !1,
    props: {
      show: Boolean,
      enabled: {
        type: Boolean,
        default: void 0
      },
      placement: {
        type: String,
        default: "bottom"
      },
      syncTrigger: {
        type: Array,
        default: ["resize", "scroll"]
      },
      to: [String, Object],
      flip: {
        type: Boolean,
        default: !0
      },
      internalShift: Boolean,
      x: Number,
      y: Number,
      width: String,
      minWidth: String,
      containerClass: String,
      teleportDisabled: Boolean,
      zindexable: {
        type: Boolean,
        default: !0
      },
      zIndex: Number,
      overlap: Boolean
    },
    setup(e) {
      const o = he("VBinder"), t = qe(() => e.enabled !== void 0 ? e.enabled : e.show), r = R(null), n = R(null), i = () => {
        const { syncTrigger: v } = e;
        v.includes("scroll") && o.addScrollListener(s), v.includes("resize") && o.addResizeListener(s);
      }, l = () => {
        o.removeScrollListener(s), o.removeResizeListener(s);
      };
      Ve(() => {
        t.value && (s(), i());
      });
      const a = Zo();
      vu.mount({
        id: "vueuc/binder",
        head: !0,
        anchorMetaName: Gn,
        ssr: a
      }), Je(() => {
        l();
      }), Wd(() => {
        t.value && s();
      });
      const s = () => {
        if (!t.value)
          return;
        const v = r.value;
        if (v === null)
          return;
        const p = o.targetRef, { x: d, y: g, overlap: x } = e, h = d !== void 0 && g !== void 0 ? Yd(d, g) : Xr(p);
        v.style.setProperty("--v-target-width", `${Math.round(h.width)}px`), v.style.setProperty("--v-target-height", `${Math.round(h.height)}px`);
        const { width: w, minWidth: _, placement: I, internalShift: M, flip: H } = e;
        v.setAttribute("v-placement", I), x ? v.setAttribute("v-overlap", "") : v.removeAttribute("v-overlap");
        const { style: b } = v;
        w === "target" ? b.width = `${h.width}px` : w !== void 0 ? b.width = w : b.width = "", _ === "target" ? b.minWidth = `${h.width}px` : _ !== void 0 ? b.minWidth = _ : b.minWidth = "";
        const $ = Xr(v), z = Xr(n.value), { left: y, top: C, placement: P } = fu(I, h, $, M, H, x), A = hu(P, x), { left: O, top: N, transform: U } = pu(P, z, h, C, y, x);
        v.setAttribute("v-placement", P), v.style.setProperty("--v-offset-left", `${Math.round(y)}px`), v.style.setProperty("--v-offset-top", `${Math.round(C)}px`), v.style.transform = `translateX(${O}) translateY(${N}) ${U}`, v.style.setProperty("--v-transform-origin", A), v.style.transformOrigin = A;
      };
      xe(t, (v) => {
        v ? (i(), c()) : l();
      });
      const c = () => {
        Ct().then(s).catch((v) => console.error(v));
      };
      [
        "placement",
        "x",
        "y",
        "internalShift",
        "flip",
        "width",
        "overlap",
        "minWidth"
      ].forEach((v) => {
        xe(se(e, v), s);
      }), ["teleportDisabled"].forEach((v) => {
        xe(se(e, v), c);
      }), xe(se(e, "syncTrigger"), (v) => {
        v.includes("resize") ? o.addResizeListener(s) : o.removeResizeListener(s), v.includes("scroll") ? o.addScrollListener(s) : o.removeScrollListener(s);
      });
      const u = Hr(), f = qe(() => {
        const { to: v } = e;
        if (v !== void 0)
          return v;
        u.value;
      });
      return {
        VBinder: o,
        mergedEnabled: t,
        offsetContainerRef: n,
        followerRef: r,
        mergedTo: f,
        syncPosition: s
      };
    },
    render() {
      return S(su, {
        show: this.show,
        to: this.mergedTo,
        disabled: this.teleportDisabled
      }, {
        default: () => {
          var e, o;
          const t = S("div", {
            class: ["v-binder-follower-container", this.containerClass],
            ref: "offsetContainerRef"
          }, [
            S("div", {
              class: "v-binder-follower-content",
              ref: "followerRef"
            }, (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e))
          ]);
          return this.zindexable ? Yt(t, [
            [
              va,
              {
                enabled: this.mergedEnabled,
                zIndex: this.zIndex
              }
            ]
          ]) : t;
        }
      });
    }
  });
  var Xo = [], gu = function() {
    return Xo.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, mu = function() {
    return Xo.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, _i = "ResizeObserver loop completed with undelivered notifications.", bu = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
      message: _i
    }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = _i), window.dispatchEvent(e);
  }, Ut;
  (function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
  })(Ut || (Ut = {}));
  var Yo = function(e) {
    return Object.freeze(e);
  }, xu = function() {
    function e(o, t) {
      this.inlineSize = o, this.blockSize = t, Yo(this);
    }
    return e;
  }(), ba = function() {
    function e(o, t, r, n) {
      return this.x = o, this.y = t, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Yo(this);
    }
    return e.prototype.toJSON = function() {
      var o = this, t = o.x, r = o.y, n = o.top, i = o.right, l = o.bottom, a = o.left, s = o.width, c = o.height;
      return { x: t, y: r, top: n, right: i, bottom: l, left: a, width: s, height: c };
    }, e.fromRect = function(o) {
      return new e(o.x, o.y, o.width, o.height);
    }, e;
  }(), Kn = function(e) {
    return e instanceof SVGElement && "getBBox" in e;
  }, xa = function(e) {
    if (Kn(e)) {
      var o = e.getBBox(), t = o.width, r = o.height;
      return !t && !r;
    }
    var n = e, i = n.offsetWidth, l = n.offsetHeight;
    return !(i || l || e.getClientRects().length);
  }, Di = function(e) {
    var o;
    if (e instanceof Element)
      return !0;
    var t = (o = e == null ? void 0 : e.ownerDocument) === null || o === void 0 ? void 0 : o.defaultView;
    return !!(t && e instanceof t.Element);
  }, Cu = function(e) {
    switch (e.tagName) {
      case "INPUT":
        if (e.type !== "image")
          break;
      case "VIDEO":
      case "AUDIO":
      case "EMBED":
      case "OBJECT":
      case "CANVAS":
      case "IFRAME":
      case "IMG":
        return !0;
    }
    return !1;
  }, Ft = typeof window < "u" ? window : {}, ir = /* @__PURE__ */ new WeakMap(), Hi = /auto|scroll/, yu = /^tb|vertical/, Su = /msie|trident/i.test(Ft.navigator && Ft.navigator.userAgent), Qe = function(e) {
    return parseFloat(e || "0");
  }, xt = function(e, o, t) {
    return e === void 0 && (e = 0), o === void 0 && (o = 0), t === void 0 && (t = !1), new xu((t ? o : e) || 0, (t ? e : o) || 0);
  }, Bi = Yo({
    devicePixelContentBoxSize: xt(),
    borderBoxSize: xt(),
    contentBoxSize: xt(),
    contentRect: new ba(0, 0, 0, 0)
  }), Ca = function(e, o) {
    if (o === void 0 && (o = !1), ir.has(e) && !o)
      return ir.get(e);
    if (xa(e))
      return ir.set(e, Bi), Bi;
    var t = getComputedStyle(e), r = Kn(e) && e.ownerSVGElement && e.getBBox(), n = !Su && t.boxSizing === "border-box", i = yu.test(t.writingMode || ""), l = !r && Hi.test(t.overflowY || ""), a = !r && Hi.test(t.overflowX || ""), s = r ? 0 : Qe(t.paddingTop), c = r ? 0 : Qe(t.paddingRight), u = r ? 0 : Qe(t.paddingBottom), f = r ? 0 : Qe(t.paddingLeft), v = r ? 0 : Qe(t.borderTopWidth), p = r ? 0 : Qe(t.borderRightWidth), d = r ? 0 : Qe(t.borderBottomWidth), g = r ? 0 : Qe(t.borderLeftWidth), x = f + c, h = s + u, w = g + p, _ = v + d, I = a ? e.offsetHeight - _ - e.clientHeight : 0, M = l ? e.offsetWidth - w - e.clientWidth : 0, H = n ? x + w : 0, b = n ? h + _ : 0, $ = r ? r.width : Qe(t.width) - H - M, z = r ? r.height : Qe(t.height) - b - I, y = $ + x + M + w, C = z + h + I + _, P = Yo({
      devicePixelContentBoxSize: xt(Math.round($ * devicePixelRatio), Math.round(z * devicePixelRatio), i),
      borderBoxSize: xt(y, C, i),
      contentBoxSize: xt($, z, i),
      contentRect: new ba(f, s, $, z)
    });
    return ir.set(e, P), P;
  }, ya = function(e, o, t) {
    var r = Ca(e, t), n = r.borderBoxSize, i = r.contentBoxSize, l = r.devicePixelContentBoxSize;
    switch (o) {
      case Ut.DEVICE_PIXEL_CONTENT_BOX:
        return l;
      case Ut.BORDER_BOX:
        return n;
      default:
        return i;
    }
  }, wu = function() {
    function e(o) {
      var t = Ca(o);
      this.target = o, this.contentRect = t.contentRect, this.borderBoxSize = Yo([t.borderBoxSize]), this.contentBoxSize = Yo([t.contentBoxSize]), this.devicePixelContentBoxSize = Yo([t.devicePixelContentBoxSize]);
    }
    return e;
  }(), Sa = function(e) {
    if (xa(e))
      return 1 / 0;
    for (var o = 0, t = e.parentNode; t; )
      o += 1, t = t.parentNode;
    return o;
  }, $u = function() {
    var e = 1 / 0, o = [];
    Xo.forEach(function(l) {
      if (l.activeTargets.length !== 0) {
        var a = [];
        l.activeTargets.forEach(function(c) {
          var u = new wu(c.target), f = Sa(c.target);
          a.push(u), c.lastReportedSize = ya(c.target, c.observedBox), f < e && (e = f);
        }), o.push(function() {
          l.callback.call(l.observer, a, l.observer);
        }), l.activeTargets.splice(0, l.activeTargets.length);
      }
    });
    for (var t = 0, r = o; t < r.length; t++) {
      var n = r[t];
      n();
    }
    return e;
  }, Ai = function(e) {
    Xo.forEach(function(t) {
      t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(n) {
        n.isActive() && (Sa(n.target) > e ? t.activeTargets.push(n) : t.skippedTargets.push(n));
      });
    });
  }, Pu = function() {
    var e = 0;
    for (Ai(e); gu(); )
      e = $u(), Ai(e);
    return mu() && bu(), e > 0;
  }, Jr, wa = [], Tu = function() {
    return wa.splice(0).forEach(function(e) {
      return e();
    });
  }, zu = function(e) {
    if (!Jr) {
      var o = 0, t = document.createTextNode(""), r = { characterData: !0 };
      new MutationObserver(function() {
        return Tu();
      }).observe(t, r), Jr = function() {
        t.textContent = "".concat(o ? o-- : o++);
      };
    }
    wa.push(e), Jr();
  }, Iu = function(e) {
    zu(function() {
      requestAnimationFrame(e);
    });
  }, vr = 0, Mu = function() {
    return !!vr;
  }, ku = 250, Ou = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Ri = [
    "resize",
    "load",
    "transitionend",
    "animationend",
    "animationstart",
    "animationiteration",
    "keyup",
    "keydown",
    "mouseup",
    "mousedown",
    "mouseover",
    "mouseout",
    "blur",
    "focus"
  ], Fi = function(e) {
    return e === void 0 && (e = 0), Date.now() + e;
  }, Zr = !1, Eu = function() {
    function e() {
      var o = this;
      this.stopped = !0, this.listener = function() {
        return o.schedule();
      };
    }
    return e.prototype.run = function(o) {
      var t = this;
      if (o === void 0 && (o = ku), !Zr) {
        Zr = !0;
        var r = Fi(o);
        Iu(function() {
          var n = !1;
          try {
            n = Pu();
          } finally {
            if (Zr = !1, o = r - Fi(), !Mu())
              return;
            n ? t.run(1e3) : o > 0 ? t.run(o) : t.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var o = this, t = function() {
        return o.observer && o.observer.observe(document.body, Ou);
      };
      document.body ? t() : Ft.addEventListener("DOMContentLoaded", t);
    }, e.prototype.start = function() {
      var o = this;
      this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Ri.forEach(function(t) {
        return Ft.addEventListener(t, o.listener, !0);
      }));
    }, e.prototype.stop = function() {
      var o = this;
      this.stopped || (this.observer && this.observer.disconnect(), Ri.forEach(function(t) {
        return Ft.removeEventListener(t, o.listener, !0);
      }), this.stopped = !0);
    }, e;
  }(), Tn = new Eu(), Li = function(e) {
    !vr && e > 0 && Tn.start(), vr += e, !vr && Tn.stop();
  }, _u = function(e) {
    return !Kn(e) && !Cu(e) && getComputedStyle(e).display === "inline";
  }, Du = function() {
    function e(o, t) {
      this.target = o, this.observedBox = t || Ut.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var o = ya(this.target, this.observedBox, !0);
      return _u(this.target) && (this.lastReportedSize = o), this.lastReportedSize.inlineSize !== o.inlineSize || this.lastReportedSize.blockSize !== o.blockSize;
    }, e;
  }(), Hu = function() {
    function e(o, t) {
      this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = o, this.callback = t;
    }
    return e;
  }(), lr = /* @__PURE__ */ new WeakMap(), Wi = function(e, o) {
    for (var t = 0; t < e.length; t += 1)
      if (e[t].target === o)
        return t;
    return -1;
  }, ar = function() {
    function e() {
    }
    return e.connect = function(o, t) {
      var r = new Hu(o, t);
      lr.set(o, r);
    }, e.observe = function(o, t, r) {
      var n = lr.get(o), i = n.observationTargets.length === 0;
      Wi(n.observationTargets, t) < 0 && (i && Xo.push(n), n.observationTargets.push(new Du(t, r && r.box)), Li(1), Tn.schedule());
    }, e.unobserve = function(o, t) {
      var r = lr.get(o), n = Wi(r.observationTargets, t), i = r.observationTargets.length === 1;
      n >= 0 && (i && Xo.splice(Xo.indexOf(r), 1), r.observationTargets.splice(n, 1), Li(-1));
    }, e.disconnect = function(o) {
      var t = this, r = lr.get(o);
      r.observationTargets.slice().forEach(function(n) {
        return t.unobserve(o, n.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  }(), Bu = function() {
    function e(o) {
      if (arguments.length === 0)
        throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
      if (typeof o != "function")
        throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
      ar.connect(this, o);
    }
    return e.prototype.observe = function(o, t) {
      if (arguments.length === 0)
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!Di(o))
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      ar.observe(this, o, t);
    }, e.prototype.unobserve = function(o) {
      if (arguments.length === 0)
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!Di(o))
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      ar.unobserve(this, o);
    }, e.prototype.disconnect = function() {
      ar.disconnect(this);
    }, e.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    }, e;
  }();
  class Au {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Bu)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
    }
    handleResize(o) {
      for (const t of o) {
        const r = this.elHandlersMap.get(t.target);
        r !== void 0 && r(t);
      }
    }
    registerHandler(o, t) {
      this.elHandlersMap.set(o, t), this.observer.observe(o);
    }
    unregisterHandler(o) {
      this.elHandlersMap.has(o) && (this.elHandlersMap.delete(o), this.observer.unobserve(o));
    }
  }
  const yr = new Au(), Sr = ie({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(e) {
      let o = !1;
      const t = Rn().proxy;
      function r(n) {
        const { onResize: i } = e;
        i !== void 0 && i(n);
      }
      Ve(() => {
        const n = t.$el;
        if (n === void 0) {
          zi("resize-observer", "$el does not exist.");
          return;
        }
        if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
          zi("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
        n.nextElementSibling !== null && (yr.registerHandler(n.nextElementSibling, r), o = !0);
      }), Je(() => {
        o && yr.unregisterHandler(t.$el.nextElementSibling);
      });
    },
    render() {
      return kl(this.$slots, "default");
    }
  });
  let sr;
  function Ru() {
    return sr === void 0 && ("matchMedia" in window ? sr = window.matchMedia("(pointer:coarse)").matches : sr = !1), sr;
  }
  let Qr;
  function Ni() {
    return Qr === void 0 && (Qr = "chrome" in window ? window.devicePixelRatio : 1), Qr;
  }
  const Fu = Do(".v-vl", {
    maxHeight: "inherit",
    height: "100%",
    overflow: "auto",
    minWidth: "1px"
    // a zero width container won't be scrollable
  }, [
    Do("&:not(.v-vl--show-scrollbar)", {
      scrollbarWidth: "none"
    }, [
      Do("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
        width: 0,
        height: 0,
        display: "none"
      })
    ])
  ]), Lu = ie({
    name: "VirtualList",
    inheritAttrs: !1,
    props: {
      showScrollbar: {
        type: Boolean,
        default: !0
      },
      items: {
        type: Array,
        default: () => []
      },
      // it is suppose to be the min height
      itemSize: {
        type: Number,
        required: !0
      },
      itemResizable: Boolean,
      itemsStyle: [String, Object],
      visibleItemsTag: {
        type: [String, Object],
        default: "div"
      },
      visibleItemsProps: Object,
      ignoreItemResize: Boolean,
      onScroll: Function,
      onWheel: Function,
      onResize: Function,
      defaultScrollKey: [Number, String],
      defaultScrollIndex: Number,
      keyField: {
        type: String,
        default: "key"
      },
      // Whether it is a good API?
      // ResizeObserver + footer & header is not enough.
      // Too complex for simple case
      paddingTop: {
        type: [Number, String],
        default: 0
      },
      paddingBottom: {
        type: [Number, String],
        default: 0
      }
    },
    setup(e) {
      const o = Zo();
      Fu.mount({
        id: "vueuc/virtual-list",
        head: !0,
        anchorMetaName: Gn,
        ssr: o
      }), Ve(() => {
        const { defaultScrollIndex: C, defaultScrollKey: P } = e;
        C != null ? d({ index: C }) : P != null && d({ key: P });
      });
      let t = !1, r = !1;
      Ol(() => {
        if (t = !1, !r) {
          r = !0;
          return;
        }
        d({ top: f.value, left: u });
      }), El(() => {
        t = !0, r || (r = !0);
      });
      const n = E(() => {
        const C = /* @__PURE__ */ new Map(), { keyField: P } = e;
        return e.items.forEach((A, O) => {
          C.set(A[P], O);
        }), C;
      }), i = R(null), l = R(void 0), a = /* @__PURE__ */ new Map(), s = E(() => {
        const { items: C, itemSize: P, keyField: A } = e, O = new au(C.length, P);
        return C.forEach((N, U) => {
          const K = N[A], X = a.get(K);
          X !== void 0 && O.add(U, X);
        }), O;
      }), c = R(0);
      let u = 0;
      const f = R(0), v = qe(() => Math.max(s.value.getBound(f.value - bn(e.paddingTop)) - 1, 0)), p = E(() => {
        const { value: C } = l;
        if (C === void 0)
          return [];
        const { items: P, itemSize: A } = e, O = v.value, N = Math.min(O + Math.ceil(C / A + 1), P.length - 1), U = [];
        for (let K = O; K <= N; ++K)
          U.push(P[K]);
        return U;
      }), d = (C, P) => {
        if (typeof C == "number") {
          w(C, P, "auto");
          return;
        }
        const { left: A, top: O, index: N, key: U, position: K, behavior: X, debounce: k = !0 } = C;
        if (A !== void 0 || O !== void 0)
          w(A, O, X);
        else if (N !== void 0)
          h(N, X, k);
        else if (U !== void 0) {
          const W = n.value.get(U);
          W !== void 0 && h(W, X, k);
        } else
          K === "bottom" ? w(0, Number.MAX_SAFE_INTEGER, X) : K === "top" && w(0, 0, X);
      };
      let g, x = null;
      function h(C, P, A) {
        const { value: O } = s, N = O.sum(C) + bn(e.paddingTop);
        if (!A)
          i.value.scrollTo({
            left: 0,
            top: N,
            behavior: P
          });
        else {
          g = C, x !== null && window.clearTimeout(x), x = window.setTimeout(() => {
            g = void 0, x = null;
          }, 16);
          const { scrollTop: U, offsetHeight: K } = i.value;
          if (N > U) {
            const X = O.get(C);
            N + X <= U + K || i.value.scrollTo({
              left: 0,
              top: N + X - K,
              behavior: P
            });
          } else
            i.value.scrollTo({
              left: 0,
              top: N,
              behavior: P
            });
        }
      }
      function w(C, P, A) {
        i.value.scrollTo({
          left: C,
          top: P,
          behavior: A
        });
      }
      function _(C, P) {
        var A, O, N;
        if (t || e.ignoreItemResize || y(P.target))
          return;
        const { value: U } = s, K = n.value.get(C), X = U.get(K), k = (N = (O = (A = P.borderBoxSize) === null || A === void 0 ? void 0 : A[0]) === null || O === void 0 ? void 0 : O.blockSize) !== null && N !== void 0 ? N : P.contentRect.height;
        if (k === X)
          return;
        k - e.itemSize === 0 ? a.delete(C) : a.set(C, k - e.itemSize);
        const re = k - X;
        if (re === 0)
          return;
        U.add(K, re);
        const fe = i.value;
        if (fe != null) {
          if (g === void 0) {
            const Ie = U.sum(K);
            fe.scrollTop > Ie && fe.scrollBy(0, re);
          } else if (K < g)
            fe.scrollBy(0, re);
          else if (K === g) {
            const Ie = U.sum(K);
            k + Ie > // Note, listEl shouldn't have border, nor offsetHeight won't be
            // correct
            fe.scrollTop + fe.offsetHeight && fe.scrollBy(0, re);
          }
          z();
        }
        c.value++;
      }
      const I = !Ru();
      let M = !1;
      function H(C) {
        var P;
        (P = e.onScroll) === null || P === void 0 || P.call(e, C), (!I || !M) && z();
      }
      function b(C) {
        var P;
        if ((P = e.onWheel) === null || P === void 0 || P.call(e, C), I) {
          const A = i.value;
          if (A != null) {
            if (C.deltaX === 0 && (A.scrollTop === 0 && C.deltaY <= 0 || A.scrollTop + A.offsetHeight >= A.scrollHeight && C.deltaY >= 0))
              return;
            C.preventDefault(), A.scrollTop += C.deltaY / Ni(), A.scrollLeft += C.deltaX / Ni(), z(), M = !0, Yl(() => {
              M = !1;
            });
          }
        }
      }
      function $(C) {
        if (t || y(C.target) || C.contentRect.height === l.value)
          return;
        l.value = C.contentRect.height;
        const { onResize: P } = e;
        P !== void 0 && P(C);
      }
      function z() {
        const { value: C } = i;
        C != null && (f.value = C.scrollTop, u = C.scrollLeft);
      }
      function y(C) {
        let P = C;
        for (; P !== null; ) {
          if (P.style.display === "none")
            return !0;
          P = P.parentElement;
        }
        return !1;
      }
      return {
        listHeight: l,
        listStyle: {
          overflow: "auto"
        },
        keyToIndex: n,
        itemsStyle: E(() => {
          const { itemResizable: C } = e, P = or(s.value.sum());
          return c.value, [
            e.itemsStyle,
            {
              boxSizing: "content-box",
              height: C ? "" : P,
              minHeight: C ? P : "",
              paddingTop: or(e.paddingTop),
              paddingBottom: or(e.paddingBottom)
            }
          ];
        }),
        visibleItemsStyle: E(() => (c.value, {
          transform: `translateY(${or(s.value.sum(v.value))})`
        })),
        viewportItems: p,
        listElRef: i,
        itemsElRef: R(null),
        scrollTo: d,
        handleListResize: $,
        handleListScroll: H,
        handleListWheel: b,
        handleItemResize: _
      };
    },
    render() {
      const { itemResizable: e, keyField: o, keyToIndex: t, visibleItemsTag: r } = this;
      return S(Sr, {
        onResize: this.handleListResize
      }, {
        default: () => {
          var n, i;
          return S("div", Or(this.$attrs, {
            class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
            onScroll: this.handleListScroll,
            onWheel: this.handleListWheel,
            ref: "listElRef"
          }), [
            this.items.length !== 0 ? S("div", {
              ref: "itemsElRef",
              class: "v-vl-items",
              style: this.itemsStyle
            }, [
              S(r, Object.assign({
                class: "v-vl-visible-items",
                style: this.visibleItemsStyle
              }, this.visibleItemsProps), {
                default: () => this.viewportItems.map((l) => {
                  const a = l[o], s = t.get(a), c = this.$slots.default({
                    item: l,
                    index: s
                  })[0];
                  return e ? S(Sr, {
                    key: a,
                    onResize: (u) => this.handleItemResize(a, u)
                  }, {
                    default: () => c
                  }) : (c.key = a, c);
                })
              })
            ]) : (i = (n = this.$slots).empty) === null || i === void 0 ? void 0 : i.call(n)
          ]);
        }
      });
    }
  }), Wo = "v-hidden", Wu = Do("[v-hidden]", {
    display: "none!important"
  }), ji = ie({
    name: "Overflow",
    props: {
      getCounter: Function,
      getTail: Function,
      updateCounter: Function,
      onUpdateOverflow: Function
    },
    setup(e, { slots: o }) {
      const t = R(null), r = R(null);
      function n() {
        const { value: l } = t, { getCounter: a, getTail: s } = e;
        let c;
        if (a !== void 0 ? c = a() : c = r.value, !l || !c)
          return;
        c.hasAttribute(Wo) && c.removeAttribute(Wo);
        const { children: u } = l, f = l.offsetWidth, v = [], p = o.tail ? s == null ? void 0 : s() : null;
        let d = p ? p.offsetWidth : 0, g = !1;
        const x = l.children.length - (o.tail ? 1 : 0);
        for (let w = 0; w < x - 1; ++w) {
          if (w < 0)
            continue;
          const _ = u[w];
          if (g) {
            _.hasAttribute(Wo) || _.setAttribute(Wo, "");
            continue;
          } else
            _.hasAttribute(Wo) && _.removeAttribute(Wo);
          const I = _.offsetWidth;
          if (d += I, v[w] = I, d > f) {
            const { updateCounter: M } = e;
            for (let H = w; H >= 0; --H) {
              const b = x - 1 - H;
              M !== void 0 ? M(b) : c.textContent = `${b}`;
              const $ = c.offsetWidth;
              if (d -= v[H], d + $ <= f || H === 0) {
                g = !0, w = H - 1, p && (w === -1 ? (p.style.maxWidth = `${f - $}px`, p.style.boxSizing = "border-box") : p.style.maxWidth = "");
                break;
              }
            }
          }
        }
        const { onUpdateOverflow: h } = e;
        g ? h !== void 0 && h(!0) : (h !== void 0 && h(!1), c.setAttribute(Wo, ""));
      }
      const i = Zo();
      return Wu.mount({
        id: "vueuc/overflow",
        head: !0,
        anchorMetaName: Gn,
        ssr: i
      }), Ve(n), {
        selfRef: t,
        counterRef: r,
        sync: n
      };
    },
    render() {
      const { $slots: e } = this;
      return Ct(this.sync), S("div", {
        class: "v-overflow",
        ref: "selfRef"
      }, [
        kl(e, "default"),
        // $slots.counter should only has 1 element
        e.counter ? e.counter() : S("span", {
          style: {
            display: "inline-block"
          },
          ref: "counterRef"
        }),
        // $slots.tail should only has 1 element
        e.tail ? e.tail() : null
      ]);
    }
  });
  function $a(e) {
    return e instanceof HTMLElement;
  }
  function Pa(e) {
    for (let o = 0; o < e.childNodes.length; o++) {
      const t = e.childNodes[o];
      if ($a(t) && (za(t) || Pa(t)))
        return !0;
    }
    return !1;
  }
  function Ta(e) {
    for (let o = e.childNodes.length - 1; o >= 0; o--) {
      const t = e.childNodes[o];
      if ($a(t) && (za(t) || Ta(t)))
        return !0;
    }
    return !1;
  }
  function za(e) {
    if (!Nu(e))
      return !1;
    try {
      e.focus({ preventScroll: !0 });
    } catch {
    }
    return document.activeElement === e;
  }
  function Nu(e) {
    if (e.tabIndex > 0 || e.tabIndex === 0 && e.getAttribute("tabIndex") !== null)
      return !0;
    if (e.getAttribute("disabled"))
      return !1;
    switch (e.nodeName) {
      case "A":
        return !!e.href && e.rel !== "ignore";
      case "INPUT":
        return e.type !== "hidden" && e.type !== "file";
      case "BUTTON":
      case "SELECT":
      case "TEXTAREA":
        return !0;
      default:
        return !1;
    }
  }
  let kt = [];
  const ju = ie({
    name: "FocusTrap",
    props: {
      disabled: Boolean,
      active: Boolean,
      autoFocus: {
        type: Boolean,
        default: !0
      },
      onEsc: Function,
      initialFocusTo: String,
      finalFocusTo: String,
      returnFocusOnDeactivated: {
        type: Boolean,
        default: !0
      }
    },
    setup(e) {
      const o = cd(), t = R(null), r = R(null);
      let n = !1, i = !1;
      const l = typeof document > "u" ? null : document.activeElement;
      function a() {
        return kt[kt.length - 1] === o;
      }
      function s(x) {
        var h;
        x.code === "Escape" && a() && ((h = e.onEsc) === null || h === void 0 || h.call(e, x));
      }
      Ve(() => {
        xe(() => e.active, (x) => {
          x ? (f(), ze("keydown", document, s)) : (me("keydown", document, s), n && v());
        }, {
          immediate: !0
        });
      }), Je(() => {
        me("keydown", document, s), n && v();
      });
      function c(x) {
        if (!i && a()) {
          const h = u();
          if (h === null || h.contains(jt(x)))
            return;
          p("first");
        }
      }
      function u() {
        const x = t.value;
        if (x === null)
          return null;
        let h = x;
        for (; h = h.nextSibling, !(h === null || h instanceof Element && h.tagName === "DIV"); )
          ;
        return h;
      }
      function f() {
        var x;
        if (!e.disabled) {
          if (kt.push(o), e.autoFocus) {
            const { initialFocusTo: h } = e;
            h === void 0 ? p("first") : (x = Mi(h)) === null || x === void 0 || x.focus({ preventScroll: !0 });
          }
          n = !0, document.addEventListener("focus", c, !0);
        }
      }
      function v() {
        var x;
        if (e.disabled || (document.removeEventListener("focus", c, !0), kt = kt.filter((w) => w !== o), a()))
          return;
        const { finalFocusTo: h } = e;
        h !== void 0 ? (x = Mi(h)) === null || x === void 0 || x.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
      }
      function p(x) {
        if (a() && e.active) {
          const h = t.value, w = r.value;
          if (h !== null && w !== null) {
            const _ = u();
            if (_ == null || _ === w) {
              i = !0, h.focus({ preventScroll: !0 }), i = !1;
              return;
            }
            i = !0;
            const I = x === "first" ? Pa(_) : Ta(_);
            i = !1, I || (i = !0, h.focus({ preventScroll: !0 }), i = !1);
          }
        }
      }
      function d(x) {
        if (i)
          return;
        const h = u();
        h !== null && (x.relatedTarget !== null && h.contains(x.relatedTarget) ? p("last") : p("first"));
      }
      function g(x) {
        i || (x.relatedTarget !== null && x.relatedTarget === t.value ? p("last") : p("first"));
      }
      return {
        focusableStartRef: t,
        focusableEndRef: r,
        focusableStyle: "position: absolute; height: 0; width: 0;",
        handleStartFocus: d,
        handleEndFocus: g
      };
    },
    render() {
      const { default: e } = this.$slots;
      if (e === void 0)
        return null;
      if (this.disabled)
        return e();
      const { active: o, focusableStyle: t } = this;
      return S(oo, null, [
        S("div", {
          "aria-hidden": "true",
          tabindex: o ? "0" : "-1",
          ref: "focusableStartRef",
          style: t,
          onFocus: this.handleStartFocus
        }),
        e(),
        S("div", {
          "aria-hidden": "true",
          style: t,
          ref: "focusableEndRef",
          tabindex: o ? "0" : "-1",
          onFocus: this.handleEndFocus
        })
      ]);
    }
  });
  function Ia(e, o) {
    o && (Ve(() => {
      const { value: t } = e;
      t && yr.registerHandler(t, o);
    }), Je(() => {
      const { value: t } = e;
      t && yr.unregisterHandler(t);
    }));
  }
  function Vu(e) {
    const o = { isDeactivated: !1 };
    let t = !1;
    return Ol(() => {
      if (o.isDeactivated = !1, !t) {
        t = !0;
        return;
      }
      e();
    }), El(() => {
      o.isDeactivated = !0, t || (t = !0);
    }), o;
  }
  const Vi = "n-form-item";
  function Uu(e, { defaultSize: o = "medium", mergedSize: t, mergedDisabled: r } = {}) {
    const n = he(Vi, null);
    to(Vi, null);
    const i = E(t ? () => t(n) : () => {
      const { size: s } = e;
      if (s)
        return s;
      if (n) {
        const { mergedSize: c } = n;
        if (c.value !== void 0)
          return c.value;
      }
      return o;
    }), l = E(r ? () => r(n) : () => {
      const { disabled: s } = e;
      return s !== void 0 ? s : n ? n.disabled.value : !1;
    }), a = E(() => {
      const { status: s } = e;
      return s || (n == null ? void 0 : n.mergedValidationStatus.value);
    });
    return Je(() => {
      n && n.restoreValidation();
    }), {
      mergedSizeRef: i,
      mergedDisabledRef: l,
      mergedStatusRef: a,
      nTriggerFormBlur() {
        n && n.handleContentBlur();
      },
      nTriggerFormChange() {
        n && n.handleContentChange();
      },
      nTriggerFormFocus() {
        n && n.handleContentFocus();
      },
      nTriggerFormInput() {
        n && n.handleContentInput();
      }
    };
  }
  var Gu = typeof global == "object" && global && global.Object === Object && global;
  const Ma = Gu;
  var Ku = typeof self == "object" && self && self.Object === Object && self, Xu = Ma || Ku || Function("return this")();
  const io = Xu;
  var Yu = io.Symbol;
  const Ho = Yu;
  var ka = Object.prototype, qu = ka.hasOwnProperty, Ju = ka.toString, Ot = Ho ? Ho.toStringTag : void 0;
  function Zu(e) {
    var o = qu.call(e, Ot), t = e[Ot];
    try {
      e[Ot] = void 0;
      var r = !0;
    } catch {
    }
    var n = Ju.call(e);
    return r && (o ? e[Ot] = t : delete e[Ot]), n;
  }
  var Qu = Object.prototype, ef = Qu.toString;
  function of(e) {
    return ef.call(e);
  }
  var tf = "[object Null]", rf = "[object Undefined]", Ui = Ho ? Ho.toStringTag : void 0;
  function Qo(e) {
    return e == null ? e === void 0 ? rf : tf : Ui && Ui in Object(e) ? Zu(e) : of(e);
  }
  function Bo(e) {
    return e != null && typeof e == "object";
  }
  var nf = "[object Symbol]";
  function Xn(e) {
    return typeof e == "symbol" || Bo(e) && Qo(e) == nf;
  }
  function Oa(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = Array(r); ++t < r; )
      n[t] = o(e[t], t, e);
    return n;
  }
  var lf = Array.isArray;
  const je = lf;
  var af = 1 / 0, Gi = Ho ? Ho.prototype : void 0, Ki = Gi ? Gi.toString : void 0;
  function Ea(e) {
    if (typeof e == "string")
      return e;
    if (je(e))
      return Oa(e, Ea) + "";
    if (Xn(e))
      return Ki ? Ki.call(e) : "";
    var o = e + "";
    return o == "0" && 1 / e == -af ? "-0" : o;
  }
  function Ao(e) {
    var o = typeof e;
    return e != null && (o == "object" || o == "function");
  }
  function Yn(e) {
    return e;
  }
  var sf = "[object AsyncFunction]", cf = "[object Function]", df = "[object GeneratorFunction]", uf = "[object Proxy]";
  function qn(e) {
    if (!Ao(e))
      return !1;
    var o = Qo(e);
    return o == cf || o == df || o == sf || o == uf;
  }
  var ff = io["__core-js_shared__"];
  const en = ff;
  var Xi = function() {
    var e = /[^.]+$/.exec(en && en.keys && en.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
  function hf(e) {
    return !!Xi && Xi in e;
  }
  var pf = Function.prototype, vf = pf.toString;
  function et(e) {
    if (e != null) {
      try {
        return vf.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  var gf = /[\\^$.*+?()[\]{}|]/g, mf = /^\[object .+?Constructor\]$/, bf = Function.prototype, xf = Object.prototype, Cf = bf.toString, yf = xf.hasOwnProperty, Sf = RegExp(
    "^" + Cf.call(yf).replace(gf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function wf(e) {
    if (!Ao(e) || hf(e))
      return !1;
    var o = qn(e) ? Sf : mf;
    return o.test(et(e));
  }
  function $f(e, o) {
    return e == null ? void 0 : e[o];
  }
  function ot(e, o) {
    var t = $f(e, o);
    return wf(t) ? t : void 0;
  }
  var Pf = ot(io, "WeakMap");
  const zn = Pf;
  var Yi = Object.create, Tf = function() {
    function e() {
    }
    return function(o) {
      if (!Ao(o))
        return {};
      if (Yi)
        return Yi(o);
      e.prototype = o;
      var t = new e();
      return e.prototype = void 0, t;
    };
  }();
  const zf = Tf;
  function If(e, o, t) {
    switch (t.length) {
      case 0:
        return e.call(o);
      case 1:
        return e.call(o, t[0]);
      case 2:
        return e.call(o, t[0], t[1]);
      case 3:
        return e.call(o, t[0], t[1], t[2]);
    }
    return e.apply(o, t);
  }
  function Mf(e, o) {
    var t = -1, r = e.length;
    for (o || (o = Array(r)); ++t < r; )
      o[t] = e[t];
    return o;
  }
  var kf = 800, Of = 16, Ef = Date.now;
  function _f(e) {
    var o = 0, t = 0;
    return function() {
      var r = Ef(), n = Of - (r - t);
      if (t = r, n > 0) {
        if (++o >= kf)
          return arguments[0];
      } else
        o = 0;
      return e.apply(void 0, arguments);
    };
  }
  function Df(e) {
    return function() {
      return e;
    };
  }
  var Hf = function() {
    try {
      var e = ot(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }();
  const wr = Hf;
  var Bf = wr ? function(e, o) {
    return wr(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Df(o),
      writable: !0
    });
  } : Yn;
  const Af = Bf;
  var Rf = _f(Af);
  const Ff = Rf;
  var Lf = 9007199254740991, Wf = /^(?:0|[1-9]\d*)$/;
  function Jn(e, o) {
    var t = typeof e;
    return o = o ?? Lf, !!o && (t == "number" || t != "symbol" && Wf.test(e)) && e > -1 && e % 1 == 0 && e < o;
  }
  function Zn(e, o, t) {
    o == "__proto__" && wr ? wr(e, o, {
      configurable: !0,
      enumerable: !0,
      value: t,
      writable: !0
    }) : e[o] = t;
  }
  function qt(e, o) {
    return e === o || e !== e && o !== o;
  }
  var Nf = Object.prototype, jf = Nf.hasOwnProperty;
  function Vf(e, o, t) {
    var r = e[o];
    (!(jf.call(e, o) && qt(r, t)) || t === void 0 && !(o in e)) && Zn(e, o, t);
  }
  function Uf(e, o, t, r) {
    var n = !t;
    t || (t = {});
    for (var i = -1, l = o.length; ++i < l; ) {
      var a = o[i], s = r ? r(t[a], e[a], a, t, e) : void 0;
      s === void 0 && (s = e[a]), n ? Zn(t, a, s) : Vf(t, a, s);
    }
    return t;
  }
  var qi = Math.max;
  function Gf(e, o, t) {
    return o = qi(o === void 0 ? e.length - 1 : o, 0), function() {
      for (var r = arguments, n = -1, i = qi(r.length - o, 0), l = Array(i); ++n < i; )
        l[n] = r[o + n];
      n = -1;
      for (var a = Array(o + 1); ++n < o; )
        a[n] = r[n];
      return a[o] = t(l), If(e, this, a);
    };
  }
  function Kf(e, o) {
    return Ff(Gf(e, o, Yn), e + "");
  }
  var Xf = 9007199254740991;
  function Qn(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Xf;
  }
  function $t(e) {
    return e != null && Qn(e.length) && !qn(e);
  }
  function Yf(e, o, t) {
    if (!Ao(t))
      return !1;
    var r = typeof o;
    return (r == "number" ? $t(t) && Jn(o, t.length) : r == "string" && o in t) ? qt(t[o], e) : !1;
  }
  function qf(e) {
    return Kf(function(o, t) {
      var r = -1, n = t.length, i = n > 1 ? t[n - 1] : void 0, l = n > 2 ? t[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, l && Yf(t[0], t[1], l) && (i = n < 3 ? void 0 : i, n = 1), o = Object(o); ++r < n; ) {
        var a = t[r];
        a && e(o, a, r, i);
      }
      return o;
    });
  }
  var Jf = Object.prototype;
  function ei(e) {
    var o = e && e.constructor, t = typeof o == "function" && o.prototype || Jf;
    return e === t;
  }
  function Zf(e, o) {
    for (var t = -1, r = Array(e); ++t < e; )
      r[t] = o(t);
    return r;
  }
  var Qf = "[object Arguments]";
  function Ji(e) {
    return Bo(e) && Qo(e) == Qf;
  }
  var _a = Object.prototype, eh = _a.hasOwnProperty, oh = _a.propertyIsEnumerable, th = Ji(function() {
    return arguments;
  }()) ? Ji : function(e) {
    return Bo(e) && eh.call(e, "callee") && !oh.call(e, "callee");
  };
  const $r = th;
  function rh() {
    return !1;
  }
  var Da = typeof He == "object" && He && !He.nodeType && He, Zi = Da && typeof Be == "object" && Be && !Be.nodeType && Be, nh = Zi && Zi.exports === Da, Qi = nh ? io.Buffer : void 0, ih = Qi ? Qi.isBuffer : void 0, lh = ih || rh;
  const Pr = lh;
  var ah = "[object Arguments]", sh = "[object Array]", ch = "[object Boolean]", dh = "[object Date]", uh = "[object Error]", fh = "[object Function]", hh = "[object Map]", ph = "[object Number]", vh = "[object Object]", gh = "[object RegExp]", mh = "[object Set]", bh = "[object String]", xh = "[object WeakMap]", Ch = "[object ArrayBuffer]", yh = "[object DataView]", Sh = "[object Float32Array]", wh = "[object Float64Array]", $h = "[object Int8Array]", Ph = "[object Int16Array]", Th = "[object Int32Array]", zh = "[object Uint8Array]", Ih = "[object Uint8ClampedArray]", Mh = "[object Uint16Array]", kh = "[object Uint32Array]", ue = {};
  ue[Sh] = ue[wh] = ue[$h] = ue[Ph] = ue[Th] = ue[zh] = ue[Ih] = ue[Mh] = ue[kh] = !0;
  ue[ah] = ue[sh] = ue[Ch] = ue[ch] = ue[yh] = ue[dh] = ue[uh] = ue[fh] = ue[hh] = ue[ph] = ue[vh] = ue[gh] = ue[mh] = ue[bh] = ue[xh] = !1;
  function Oh(e) {
    return Bo(e) && Qn(e.length) && !!ue[Qo(e)];
  }
  function Eh(e) {
    return function(o) {
      return e(o);
    };
  }
  var Ha = typeof He == "object" && He && !He.nodeType && He, Lt = Ha && typeof Be == "object" && Be && !Be.nodeType && Be, _h = Lt && Lt.exports === Ha, on = _h && Ma.process, Dh = function() {
    try {
      var e = Lt && Lt.require && Lt.require("util").types;
      return e || on && on.binding && on.binding("util");
    } catch {
    }
  }();
  const el = Dh;
  var ol = el && el.isTypedArray, Hh = ol ? Eh(ol) : Oh;
  const oi = Hh;
  var Bh = Object.prototype, Ah = Bh.hasOwnProperty;
  function Ba(e, o) {
    var t = je(e), r = !t && $r(e), n = !t && !r && Pr(e), i = !t && !r && !n && oi(e), l = t || r || n || i, a = l ? Zf(e.length, String) : [], s = a.length;
    for (var c in e)
      (o || Ah.call(e, c)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
      (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      n && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
      Jn(c, s))) && a.push(c);
    return a;
  }
  function Aa(e, o) {
    return function(t) {
      return e(o(t));
    };
  }
  var Rh = Aa(Object.keys, Object);
  const Fh = Rh;
  var Lh = Object.prototype, Wh = Lh.hasOwnProperty;
  function Nh(e) {
    if (!ei(e))
      return Fh(e);
    var o = [];
    for (var t in Object(e))
      Wh.call(e, t) && t != "constructor" && o.push(t);
    return o;
  }
  function ti(e) {
    return $t(e) ? Ba(e) : Nh(e);
  }
  function jh(e) {
    var o = [];
    if (e != null)
      for (var t in Object(e))
        o.push(t);
    return o;
  }
  var Vh = Object.prototype, Uh = Vh.hasOwnProperty;
  function Gh(e) {
    if (!Ao(e))
      return jh(e);
    var o = ei(e), t = [];
    for (var r in e)
      r == "constructor" && (o || !Uh.call(e, r)) || t.push(r);
    return t;
  }
  function Ra(e) {
    return $t(e) ? Ba(e, !0) : Gh(e);
  }
  var Kh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Xh = /^\w*$/;
  function ri(e, o) {
    if (je(e))
      return !1;
    var t = typeof e;
    return t == "number" || t == "symbol" || t == "boolean" || e == null || Xn(e) ? !0 : Xh.test(e) || !Kh.test(e) || o != null && e in Object(o);
  }
  var Yh = ot(Object, "create");
  const Gt = Yh;
  function qh() {
    this.__data__ = Gt ? Gt(null) : {}, this.size = 0;
  }
  function Jh(e) {
    var o = this.has(e) && delete this.__data__[e];
    return this.size -= o ? 1 : 0, o;
  }
  var Zh = "__lodash_hash_undefined__", Qh = Object.prototype, ep = Qh.hasOwnProperty;
  function op(e) {
    var o = this.__data__;
    if (Gt) {
      var t = o[e];
      return t === Zh ? void 0 : t;
    }
    return ep.call(o, e) ? o[e] : void 0;
  }
  var tp = Object.prototype, rp = tp.hasOwnProperty;
  function np(e) {
    var o = this.__data__;
    return Gt ? o[e] !== void 0 : rp.call(o, e);
  }
  var ip = "__lodash_hash_undefined__";
  function lp(e, o) {
    var t = this.__data__;
    return this.size += this.has(e) ? 0 : 1, t[e] = Gt && o === void 0 ? ip : o, this;
  }
  function Jo(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  Jo.prototype.clear = qh;
  Jo.prototype.delete = Jh;
  Jo.prototype.get = op;
  Jo.prototype.has = np;
  Jo.prototype.set = lp;
  function ap() {
    this.__data__ = [], this.size = 0;
  }
  function Br(e, o) {
    for (var t = e.length; t--; )
      if (qt(e[t][0], o))
        return t;
    return -1;
  }
  var sp = Array.prototype, cp = sp.splice;
  function dp(e) {
    var o = this.__data__, t = Br(o, e);
    if (t < 0)
      return !1;
    var r = o.length - 1;
    return t == r ? o.pop() : cp.call(o, t, 1), --this.size, !0;
  }
  function up(e) {
    var o = this.__data__, t = Br(o, e);
    return t < 0 ? void 0 : o[t][1];
  }
  function fp(e) {
    return Br(this.__data__, e) > -1;
  }
  function hp(e, o) {
    var t = this.__data__, r = Br(t, e);
    return r < 0 ? (++this.size, t.push([e, o])) : t[r][1] = o, this;
  }
  function $o(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  $o.prototype.clear = ap;
  $o.prototype.delete = dp;
  $o.prototype.get = up;
  $o.prototype.has = fp;
  $o.prototype.set = hp;
  var pp = ot(io, "Map");
  const Kt = pp;
  function vp() {
    this.size = 0, this.__data__ = {
      hash: new Jo(),
      map: new (Kt || $o)(),
      string: new Jo()
    };
  }
  function gp(e) {
    var o = typeof e;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? e !== "__proto__" : e === null;
  }
  function Ar(e, o) {
    var t = e.__data__;
    return gp(o) ? t[typeof o == "string" ? "string" : "hash"] : t.map;
  }
  function mp(e) {
    var o = Ar(this, e).delete(e);
    return this.size -= o ? 1 : 0, o;
  }
  function bp(e) {
    return Ar(this, e).get(e);
  }
  function xp(e) {
    return Ar(this, e).has(e);
  }
  function Cp(e, o) {
    var t = Ar(this, e), r = t.size;
    return t.set(e, o), this.size += t.size == r ? 0 : 1, this;
  }
  function Po(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  Po.prototype.clear = vp;
  Po.prototype.delete = mp;
  Po.prototype.get = bp;
  Po.prototype.has = xp;
  Po.prototype.set = Cp;
  var yp = "Expected a function";
  function ni(e, o) {
    if (typeof e != "function" || o != null && typeof o != "function")
      throw new TypeError(yp);
    var t = function() {
      var r = arguments, n = o ? o.apply(this, r) : r[0], i = t.cache;
      if (i.has(n))
        return i.get(n);
      var l = e.apply(this, r);
      return t.cache = i.set(n, l) || i, l;
    };
    return t.cache = new (ni.Cache || Po)(), t;
  }
  ni.Cache = Po;
  var Sp = 500;
  function wp(e) {
    var o = ni(e, function(r) {
      return t.size === Sp && t.clear(), r;
    }), t = o.cache;
    return o;
  }
  var $p = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Pp = /\\(\\)?/g, Tp = wp(function(e) {
    var o = [];
    return e.charCodeAt(0) === 46 && o.push(""), e.replace($p, function(t, r, n, i) {
      o.push(n ? i.replace(Pp, "$1") : r || t);
    }), o;
  });
  const zp = Tp;
  function Fa(e) {
    return e == null ? "" : Ea(e);
  }
  function La(e, o) {
    return je(e) ? e : ri(e, o) ? [e] : zp(Fa(e));
  }
  var Ip = 1 / 0;
  function Rr(e) {
    if (typeof e == "string" || Xn(e))
      return e;
    var o = e + "";
    return o == "0" && 1 / e == -Ip ? "-0" : o;
  }
  function Wa(e, o) {
    o = La(o, e);
    for (var t = 0, r = o.length; e != null && t < r; )
      e = e[Rr(o[t++])];
    return t && t == r ? e : void 0;
  }
  function Mp(e, o, t) {
    var r = e == null ? void 0 : Wa(e, o);
    return r === void 0 ? t : r;
  }
  function kp(e, o) {
    for (var t = -1, r = o.length, n = e.length; ++t < r; )
      e[n + t] = o[t];
    return e;
  }
  var Op = Aa(Object.getPrototypeOf, Object);
  const Na = Op;
  var Ep = "[object Object]", _p = Function.prototype, Dp = Object.prototype, ja = _p.toString, Hp = Dp.hasOwnProperty, Bp = ja.call(Object);
  function Ap(e) {
    if (!Bo(e) || Qo(e) != Ep)
      return !1;
    var o = Na(e);
    if (o === null)
      return !0;
    var t = Hp.call(o, "constructor") && o.constructor;
    return typeof t == "function" && t instanceof t && ja.call(t) == Bp;
  }
  function Rp(e, o, t) {
    var r = -1, n = e.length;
    o < 0 && (o = -o > n ? 0 : n + o), t = t > n ? n : t, t < 0 && (t += n), n = o > t ? 0 : t - o >>> 0, o >>>= 0;
    for (var i = Array(n); ++r < n; )
      i[r] = e[r + o];
    return i;
  }
  function Fp(e, o, t) {
    var r = e.length;
    return t = t === void 0 ? r : t, !o && t >= r ? e : Rp(e, o, t);
  }
  var Lp = "\\ud800-\\udfff", Wp = "\\u0300-\\u036f", Np = "\\ufe20-\\ufe2f", jp = "\\u20d0-\\u20ff", Vp = Wp + Np + jp, Up = "\\ufe0e\\ufe0f", Gp = "\\u200d", Kp = RegExp("[" + Gp + Lp + Vp + Up + "]");
  function Va(e) {
    return Kp.test(e);
  }
  function Xp(e) {
    return e.split("");
  }
  var Ua = "\\ud800-\\udfff", Yp = "\\u0300-\\u036f", qp = "\\ufe20-\\ufe2f", Jp = "\\u20d0-\\u20ff", Zp = Yp + qp + Jp, Qp = "\\ufe0e\\ufe0f", ev = "[" + Ua + "]", In = "[" + Zp + "]", Mn = "\\ud83c[\\udffb-\\udfff]", ov = "(?:" + In + "|" + Mn + ")", Ga = "[^" + Ua + "]", Ka = "(?:\\ud83c[\\udde6-\\uddff]){2}", Xa = "[\\ud800-\\udbff][\\udc00-\\udfff]", tv = "\\u200d", Ya = ov + "?", qa = "[" + Qp + "]?", rv = "(?:" + tv + "(?:" + [Ga, Ka, Xa].join("|") + ")" + qa + Ya + ")*", nv = qa + Ya + rv, iv = "(?:" + [Ga + In + "?", In, Ka, Xa, ev].join("|") + ")", lv = RegExp(Mn + "(?=" + Mn + ")|" + iv + nv, "g");
  function av(e) {
    return e.match(lv) || [];
  }
  function sv(e) {
    return Va(e) ? av(e) : Xp(e);
  }
  function cv(e) {
    return function(o) {
      o = Fa(o);
      var t = Va(o) ? sv(o) : void 0, r = t ? t[0] : o.charAt(0), n = t ? Fp(t, 1).join("") : o.slice(1);
      return r[e]() + n;
    };
  }
  var dv = cv("toUpperCase");
  const uv = dv;
  function fv() {
    this.__data__ = new $o(), this.size = 0;
  }
  function hv(e) {
    var o = this.__data__, t = o.delete(e);
    return this.size = o.size, t;
  }
  function pv(e) {
    return this.__data__.get(e);
  }
  function vv(e) {
    return this.__data__.has(e);
  }
  var gv = 200;
  function mv(e, o) {
    var t = this.__data__;
    if (t instanceof $o) {
      var r = t.__data__;
      if (!Kt || r.length < gv - 1)
        return r.push([e, o]), this.size = ++t.size, this;
      t = this.__data__ = new Po(r);
    }
    return t.set(e, o), this.size = t.size, this;
  }
  function no(e) {
    var o = this.__data__ = new $o(e);
    this.size = o.size;
  }
  no.prototype.clear = fv;
  no.prototype.delete = hv;
  no.prototype.get = pv;
  no.prototype.has = vv;
  no.prototype.set = mv;
  var Ja = typeof He == "object" && He && !He.nodeType && He, tl = Ja && typeof Be == "object" && Be && !Be.nodeType && Be, bv = tl && tl.exports === Ja, rl = bv ? io.Buffer : void 0, nl = rl ? rl.allocUnsafe : void 0;
  function xv(e, o) {
    if (o)
      return e.slice();
    var t = e.length, r = nl ? nl(t) : new e.constructor(t);
    return e.copy(r), r;
  }
  function Cv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = 0, i = []; ++t < r; ) {
      var l = e[t];
      o(l, t, e) && (i[n++] = l);
    }
    return i;
  }
  function yv() {
    return [];
  }
  var Sv = Object.prototype, wv = Sv.propertyIsEnumerable, il = Object.getOwnPropertySymbols, $v = il ? function(e) {
    return e == null ? [] : (e = Object(e), Cv(il(e), function(o) {
      return wv.call(e, o);
    }));
  } : yv;
  const Pv = $v;
  function Tv(e, o, t) {
    var r = o(e);
    return je(e) ? r : kp(r, t(e));
  }
  function ll(e) {
    return Tv(e, ti, Pv);
  }
  var zv = ot(io, "DataView");
  const kn = zv;
  var Iv = ot(io, "Promise");
  const On = Iv;
  var Mv = ot(io, "Set");
  const En = Mv;
  var al = "[object Map]", kv = "[object Object]", sl = "[object Promise]", cl = "[object Set]", dl = "[object WeakMap]", ul = "[object DataView]", Ov = et(kn), Ev = et(Kt), _v = et(On), Dv = et(En), Hv = et(zn), jo = Qo;
  (kn && jo(new kn(new ArrayBuffer(1))) != ul || Kt && jo(new Kt()) != al || On && jo(On.resolve()) != sl || En && jo(new En()) != cl || zn && jo(new zn()) != dl) && (jo = function(e) {
    var o = Qo(e), t = o == kv ? e.constructor : void 0, r = t ? et(t) : "";
    if (r)
      switch (r) {
        case Ov:
          return ul;
        case Ev:
          return al;
        case _v:
          return sl;
        case Dv:
          return cl;
        case Hv:
          return dl;
      }
    return o;
  });
  const fl = jo;
  var Bv = io.Uint8Array;
  const Tr = Bv;
  function Av(e) {
    var o = new e.constructor(e.byteLength);
    return new Tr(o).set(new Tr(e)), o;
  }
  function Rv(e, o) {
    var t = o ? Av(e.buffer) : e.buffer;
    return new e.constructor(t, e.byteOffset, e.length);
  }
  function Fv(e) {
    return typeof e.constructor == "function" && !ei(e) ? zf(Na(e)) : {};
  }
  var Lv = "__lodash_hash_undefined__";
  function Wv(e) {
    return this.__data__.set(e, Lv), this;
  }
  function Nv(e) {
    return this.__data__.has(e);
  }
  function zr(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.__data__ = new Po(); ++o < t; )
      this.add(e[o]);
  }
  zr.prototype.add = zr.prototype.push = Wv;
  zr.prototype.has = Nv;
  function jv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length; ++t < r; )
      if (o(e[t], t, e))
        return !0;
    return !1;
  }
  function Vv(e, o) {
    return e.has(o);
  }
  var Uv = 1, Gv = 2;
  function Za(e, o, t, r, n, i) {
    var l = t & Uv, a = e.length, s = o.length;
    if (a != s && !(l && s > a))
      return !1;
    var c = i.get(e), u = i.get(o);
    if (c && u)
      return c == o && u == e;
    var f = -1, v = !0, p = t & Gv ? new zr() : void 0;
    for (i.set(e, o), i.set(o, e); ++f < a; ) {
      var d = e[f], g = o[f];
      if (r)
        var x = l ? r(g, d, f, o, e, i) : r(d, g, f, e, o, i);
      if (x !== void 0) {
        if (x)
          continue;
        v = !1;
        break;
      }
      if (p) {
        if (!jv(o, function(h, w) {
          if (!Vv(p, w) && (d === h || n(d, h, t, r, i)))
            return p.push(w);
        })) {
          v = !1;
          break;
        }
      } else if (!(d === g || n(d, g, t, r, i))) {
        v = !1;
        break;
      }
    }
    return i.delete(e), i.delete(o), v;
  }
  function Kv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r, n) {
      t[++o] = [n, r];
    }), t;
  }
  function Xv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r) {
      t[++o] = r;
    }), t;
  }
  var Yv = 1, qv = 2, Jv = "[object Boolean]", Zv = "[object Date]", Qv = "[object Error]", eg = "[object Map]", og = "[object Number]", tg = "[object RegExp]", rg = "[object Set]", ng = "[object String]", ig = "[object Symbol]", lg = "[object ArrayBuffer]", ag = "[object DataView]", hl = Ho ? Ho.prototype : void 0, tn = hl ? hl.valueOf : void 0;
  function sg(e, o, t, r, n, i, l) {
    switch (t) {
      case ag:
        if (e.byteLength != o.byteLength || e.byteOffset != o.byteOffset)
          return !1;
        e = e.buffer, o = o.buffer;
      case lg:
        return !(e.byteLength != o.byteLength || !i(new Tr(e), new Tr(o)));
      case Jv:
      case Zv:
      case og:
        return qt(+e, +o);
      case Qv:
        return e.name == o.name && e.message == o.message;
      case tg:
      case ng:
        return e == o + "";
      case eg:
        var a = Kv;
      case rg:
        var s = r & Yv;
        if (a || (a = Xv), e.size != o.size && !s)
          return !1;
        var c = l.get(e);
        if (c)
          return c == o;
        r |= qv, l.set(e, o);
        var u = Za(a(e), a(o), r, n, i, l);
        return l.delete(e), u;
      case ig:
        if (tn)
          return tn.call(e) == tn.call(o);
    }
    return !1;
  }
  var cg = 1, dg = Object.prototype, ug = dg.hasOwnProperty;
  function fg(e, o, t, r, n, i) {
    var l = t & cg, a = ll(e), s = a.length, c = ll(o), u = c.length;
    if (s != u && !l)
      return !1;
    for (var f = s; f--; ) {
      var v = a[f];
      if (!(l ? v in o : ug.call(o, v)))
        return !1;
    }
    var p = i.get(e), d = i.get(o);
    if (p && d)
      return p == o && d == e;
    var g = !0;
    i.set(e, o), i.set(o, e);
    for (var x = l; ++f < s; ) {
      v = a[f];
      var h = e[v], w = o[v];
      if (r)
        var _ = l ? r(w, h, v, o, e, i) : r(h, w, v, e, o, i);
      if (!(_ === void 0 ? h === w || n(h, w, t, r, i) : _)) {
        g = !1;
        break;
      }
      x || (x = v == "constructor");
    }
    if (g && !x) {
      var I = e.constructor, M = o.constructor;
      I != M && "constructor" in e && "constructor" in o && !(typeof I == "function" && I instanceof I && typeof M == "function" && M instanceof M) && (g = !1);
    }
    return i.delete(e), i.delete(o), g;
  }
  var hg = 1, pl = "[object Arguments]", vl = "[object Array]", cr = "[object Object]", pg = Object.prototype, gl = pg.hasOwnProperty;
  function vg(e, o, t, r, n, i) {
    var l = je(e), a = je(o), s = l ? vl : fl(e), c = a ? vl : fl(o);
    s = s == pl ? cr : s, c = c == pl ? cr : c;
    var u = s == cr, f = c == cr, v = s == c;
    if (v && Pr(e)) {
      if (!Pr(o))
        return !1;
      l = !0, u = !1;
    }
    if (v && !u)
      return i || (i = new no()), l || oi(e) ? Za(e, o, t, r, n, i) : sg(e, o, s, t, r, n, i);
    if (!(t & hg)) {
      var p = u && gl.call(e, "__wrapped__"), d = f && gl.call(o, "__wrapped__");
      if (p || d) {
        var g = p ? e.value() : e, x = d ? o.value() : o;
        return i || (i = new no()), n(g, x, t, r, i);
      }
    }
    return v ? (i || (i = new no()), fg(e, o, t, r, n, i)) : !1;
  }
  function ii(e, o, t, r, n) {
    return e === o ? !0 : e == null || o == null || !Bo(e) && !Bo(o) ? e !== e && o !== o : vg(e, o, t, r, ii, n);
  }
  var gg = 1, mg = 2;
  function bg(e, o, t, r) {
    var n = t.length, i = n, l = !r;
    if (e == null)
      return !i;
    for (e = Object(e); n--; ) {
      var a = t[n];
      if (l && a[2] ? a[1] !== e[a[0]] : !(a[0] in e))
        return !1;
    }
    for (; ++n < i; ) {
      a = t[n];
      var s = a[0], c = e[s], u = a[1];
      if (l && a[2]) {
        if (c === void 0 && !(s in e))
          return !1;
      } else {
        var f = new no();
        if (r)
          var v = r(c, u, s, e, o, f);
        if (!(v === void 0 ? ii(u, c, gg | mg, r, f) : v))
          return !1;
      }
    }
    return !0;
  }
  function Qa(e) {
    return e === e && !Ao(e);
  }
  function xg(e) {
    for (var o = ti(e), t = o.length; t--; ) {
      var r = o[t], n = e[r];
      o[t] = [r, n, Qa(n)];
    }
    return o;
  }
  function es(e, o) {
    return function(t) {
      return t == null ? !1 : t[e] === o && (o !== void 0 || e in Object(t));
    };
  }
  function Cg(e) {
    var o = xg(e);
    return o.length == 1 && o[0][2] ? es(o[0][0], o[0][1]) : function(t) {
      return t === e || bg(t, e, o);
    };
  }
  function yg(e, o) {
    return e != null && o in Object(e);
  }
  function Sg(e, o, t) {
    o = La(o, e);
    for (var r = -1, n = o.length, i = !1; ++r < n; ) {
      var l = Rr(o[r]);
      if (!(i = e != null && t(e, l)))
        break;
      e = e[l];
    }
    return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && Qn(n) && Jn(l, n) && (je(e) || $r(e)));
  }
  function wg(e, o) {
    return e != null && Sg(e, o, yg);
  }
  var $g = 1, Pg = 2;
  function Tg(e, o) {
    return ri(e) && Qa(o) ? es(Rr(e), o) : function(t) {
      var r = Mp(t, e);
      return r === void 0 && r === o ? wg(t, e) : ii(o, r, $g | Pg);
    };
  }
  function zg(e) {
    return function(o) {
      return o == null ? void 0 : o[e];
    };
  }
  function Ig(e) {
    return function(o) {
      return Wa(o, e);
    };
  }
  function Mg(e) {
    return ri(e) ? zg(Rr(e)) : Ig(e);
  }
  function kg(e) {
    return typeof e == "function" ? e : e == null ? Yn : typeof e == "object" ? je(e) ? Tg(e[0], e[1]) : Cg(e) : Mg(e);
  }
  function Og(e) {
    return function(o, t, r) {
      for (var n = -1, i = Object(o), l = r(o), a = l.length; a--; ) {
        var s = l[e ? a : ++n];
        if (t(i[s], s, i) === !1)
          break;
      }
      return o;
    };
  }
  var Eg = Og();
  const os = Eg;
  function _g(e, o) {
    return e && os(e, o, ti);
  }
  function Dg(e, o) {
    return function(t, r) {
      if (t == null)
        return t;
      if (!$t(t))
        return e(t, r);
      for (var n = t.length, i = o ? n : -1, l = Object(t); (o ? i-- : ++i < n) && r(l[i], i, l) !== !1; )
        ;
      return t;
    };
  }
  var Hg = Dg(_g);
  const Bg = Hg;
  function _n(e, o, t) {
    (t !== void 0 && !qt(e[o], t) || t === void 0 && !(o in e)) && Zn(e, o, t);
  }
  function Ag(e) {
    return Bo(e) && $t(e);
  }
  function Dn(e, o) {
    if (!(o === "constructor" && typeof e[o] == "function") && o != "__proto__")
      return e[o];
  }
  function Rg(e) {
    return Uf(e, Ra(e));
  }
  function Fg(e, o, t, r, n, i, l) {
    var a = Dn(e, t), s = Dn(o, t), c = l.get(s);
    if (c) {
      _n(e, t, c);
      return;
    }
    var u = i ? i(a, s, t + "", e, o, l) : void 0, f = u === void 0;
    if (f) {
      var v = je(s), p = !v && Pr(s), d = !v && !p && oi(s);
      u = s, v || p || d ? je(a) ? u = a : Ag(a) ? u = Mf(a) : p ? (f = !1, u = xv(s, !0)) : d ? (f = !1, u = Rv(s, !0)) : u = [] : Ap(s) || $r(s) ? (u = a, $r(a) ? u = Rg(a) : (!Ao(a) || qn(a)) && (u = Fv(s))) : f = !1;
    }
    f && (l.set(s, u), n(u, s, r, i, l), l.delete(s)), _n(e, t, u);
  }
  function ts(e, o, t, r, n) {
    e !== o && os(o, function(i, l) {
      if (n || (n = new no()), Ao(i))
        Fg(e, o, l, t, ts, r, n);
      else {
        var a = r ? r(Dn(e, l), i, l + "", e, o, n) : void 0;
        a === void 0 && (a = i), _n(e, l, a);
      }
    }, Ra);
  }
  function Lg(e, o) {
    var t = -1, r = $t(e) ? Array(e.length) : [];
    return Bg(e, function(n, i, l) {
      r[++t] = o(n, i, l);
    }), r;
  }
  function Wg(e, o) {
    var t = je(e) ? Oa : Lg;
    return t(e, kg(o));
  }
  var Ng = qf(function(e, o, t) {
    ts(e, o, t);
  });
  const Ht = Ng, Pt = {
    fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
    fontWeight: "400",
    fontWeightStrong: "500",
    cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
    cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
    cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
    borderRadius: "3px",
    borderRadiusSmall: "2px",
    fontSize: "14px",
    fontSizeMini: "12px",
    fontSizeTiny: "12px",
    fontSizeSmall: "14px",
    fontSizeMedium: "14px",
    fontSizeLarge: "15px",
    fontSizeHuge: "16px",
    lineHeight: "1.6",
    heightMini: "16px",
    heightTiny: "22px",
    heightSmall: "28px",
    heightMedium: "34px",
    heightLarge: "40px",
    heightHuge: "46px"
  }, {
    fontSize: jg,
    fontFamily: Vg,
    lineHeight: Ug
  } = Pt, rs = V("body", `
 margin: 0;
 font-size: ${jg};
 font-family: ${Vg};
 line-height: ${Ug};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [V("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), wo = "n-config-provider", Xt = "naive-ui-style";
  function pe(e, o, t, r, n, i) {
    const l = Zo(), a = he(wo, null);
    if (t) {
      const c = () => {
        const u = i == null ? void 0 : i.value;
        t.mount({
          id: u === void 0 ? o : u + o,
          head: !0,
          props: {
            bPrefix: u ? `.${u}-` : void 0
          },
          anchorMetaName: Xt,
          ssr: l
        }), a != null && a.preflightStyleDisabled || rs.mount({
          id: "n-global",
          head: !0,
          anchorMetaName: Xt,
          ssr: l
        });
      };
      l ? c() : Wn(c);
    }
    return E(() => {
      var c;
      const { theme: { common: u, self: f, peers: v = {} } = {}, themeOverrides: p = {}, builtinThemeOverrides: d = {} } = n, { common: g, peers: x } = p, { common: h = void 0, [e]: { common: w = void 0, self: _ = void 0, peers: I = {} } = {} } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, { common: M = void 0, [e]: H = {} } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, { common: b, peers: $ = {} } = H, z = Ht({}, u || w || h || r.common, M, b, g), y = Ht(
        // {}, executed every time, no need for empty obj
        (c = f || _ || r.self) === null || c === void 0 ? void 0 : c(z),
        d,
        H,
        p
      );
      return {
        common: z,
        self: y,
        peers: Ht({}, r.peers, I, v),
        peerOverrides: Ht({}, d.peers, $, x)
      };
    });
  }
  pe.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  const ns = "n";
  function tt(e = {}, o = {
    defaultBordered: !0
  }) {
    const t = he(wo, null);
    return {
      // NConfigProvider,
      inlineThemeDisabled: t == null ? void 0 : t.inlineThemeDisabled,
      mergedRtlRef: t == null ? void 0 : t.mergedRtlRef,
      mergedComponentPropsRef: t == null ? void 0 : t.mergedComponentPropsRef,
      mergedBreakpointsRef: t == null ? void 0 : t.mergedBreakpointsRef,
      mergedBorderedRef: E(() => {
        var r, n;
        const { bordered: i } = e;
        return i !== void 0 ? i : (n = (r = t == null ? void 0 : t.mergedBorderedRef.value) !== null && r !== void 0 ? r : o.defaultBordered) !== null && n !== void 0 ? n : !0;
      }),
      mergedClsPrefixRef: E(() => (t == null ? void 0 : t.mergedClsPrefixRef.value) || ns),
      namespaceRef: E(() => t == null ? void 0 : t.mergedNamespaceRef.value)
    };
  }
  const Gg = {
    name: "en-US",
    global: {
      undo: "Undo",
      redo: "Redo",
      confirm: "Confirm",
      clear: "Clear"
    },
    Popconfirm: {
      positiveText: "Confirm",
      negativeText: "Cancel"
    },
    Cascader: {
      placeholder: "Please Select",
      loading: "Loading",
      loadingRequiredMessage: (e) => `Please load all ${e}'s descendants before checking it.`
    },
    Time: {
      dateFormat: "yyyy-MM-dd",
      dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
    },
    DatePicker: {
      yearFormat: "yyyy",
      monthFormat: "MMM",
      dayFormat: "eeeeee",
      yearTypeFormat: "yyyy",
      monthTypeFormat: "yyyy-MM",
      dateFormat: "yyyy-MM-dd",
      dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
      quarterFormat: "yyyy-qqq",
      clear: "Clear",
      now: "Now",
      confirm: "Confirm",
      selectTime: "Select Time",
      selectDate: "Select Date",
      datePlaceholder: "Select Date",
      datetimePlaceholder: "Select Date and Time",
      monthPlaceholder: "Select Month",
      yearPlaceholder: "Select Year",
      quarterPlaceholder: "Select Quarter",
      startDatePlaceholder: "Start Date",
      endDatePlaceholder: "End Date",
      startDatetimePlaceholder: "Start Date and Time",
      endDatetimePlaceholder: "End Date and Time",
      startMonthPlaceholder: "Start Month",
      endMonthPlaceholder: "End Month",
      monthBeforeYear: !0,
      firstDayOfWeek: 6,
      today: "Today"
    },
    DataTable: {
      checkTableAll: "Select all in the table",
      uncheckTableAll: "Unselect all in the table",
      confirm: "Confirm",
      clear: "Clear"
    },
    LegacyTransfer: {
      sourceTitle: "Source",
      targetTitle: "Target"
    },
    Transfer: {
      selectAll: "Select all",
      unselectAll: "Unselect all",
      clearAll: "Clear",
      total: (e) => `Total ${e} items`,
      selected: (e) => `${e} items selected`
    },
    Empty: {
      description: "No Data"
    },
    Select: {
      placeholder: "Please Select"
    },
    TimePicker: {
      placeholder: "Select Time",
      positiveText: "OK",
      negativeText: "Cancel",
      now: "Now"
    },
    Pagination: {
      goto: "Goto",
      selectionSuffix: "page"
    },
    DynamicTags: {
      add: "Add"
    },
    Log: {
      loading: "Loading"
    },
    Input: {
      placeholder: "Please Input"
    },
    InputNumber: {
      placeholder: "Please Input"
    },
    DynamicInput: {
      create: "Create"
    },
    ThemeEditor: {
      title: "Theme Editor",
      clearAllVars: "Clear All Variables",
      clearSearch: "Clear Search",
      filterCompName: "Filter Component Name",
      filterVarName: "Filter Variable Name",
      import: "Import",
      export: "Export",
      restore: "Reset to Default"
    },
    Image: {
      tipPrevious: "Previous picture (←)",
      tipNext: "Next picture (→)",
      tipCounterclockwise: "Counterclockwise",
      tipClockwise: "Clockwise",
      tipZoomOut: "Zoom out",
      tipZoomIn: "Zoom in",
      tipClose: "Close (Esc)",
      // TODO: translation
      tipOriginalSize: "Zoom to original size"
    }
  }, Kg = Gg;
  function rn(e) {
    return function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = o.width ? String(o.width) : e.defaultWidth, r = e.formats[t] || e.formats[e.defaultWidth];
      return r;
    };
  }
  function Et(e) {
    return function(o, t) {
      var r = t != null && t.context ? String(t.context) : "standalone", n;
      if (r === "formatting" && e.formattingValues) {
        var i = e.defaultFormattingWidth || e.defaultWidth, l = t != null && t.width ? String(t.width) : i;
        n = e.formattingValues[l] || e.formattingValues[i];
      } else {
        var a = e.defaultWidth, s = t != null && t.width ? String(t.width) : e.defaultWidth;
        n = e.values[s] || e.values[a];
      }
      var c = e.argumentCallback ? e.argumentCallback(o) : o;
      return n[c];
    };
  }
  function _t(e) {
    return function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = o.match(n);
      if (!i)
        return null;
      var l = i[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? Yg(a, function(f) {
        return f.test(l);
      }) : Xg(a, function(f) {
        return f.test(l);
      }), c;
      c = e.valueCallback ? e.valueCallback(s) : s, c = t.valueCallback ? t.valueCallback(c) : c;
      var u = o.slice(l.length);
      return {
        value: c,
        rest: u
      };
    };
  }
  function Xg(e, o) {
    for (var t in e)
      if (e.hasOwnProperty(t) && o(e[t]))
        return t;
  }
  function Yg(e, o) {
    for (var t = 0; t < e.length; t++)
      if (o(e[t]))
        return t;
  }
  function qg(e) {
    return function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = o.match(e.matchPattern);
      if (!r)
        return null;
      var n = r[0], i = o.match(e.parsePattern);
      if (!i)
        return null;
      var l = e.valueCallback ? e.valueCallback(i[0]) : i[0];
      l = t.valueCallback ? t.valueCallback(l) : l;
      var a = o.slice(n.length);
      return {
        value: l,
        rest: a
      };
    };
  }
  var Jg = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  }, Zg = function(o, t, r) {
    var n, i = Jg[o];
    return typeof i == "string" ? n = i : t === 1 ? n = i.one : n = i.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
  };
  const Qg = Zg;
  var em = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, om = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, tm = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, rm = {
    date: rn({
      formats: em,
      defaultWidth: "full"
    }),
    time: rn({
      formats: om,
      defaultWidth: "full"
    }),
    dateTime: rn({
      formats: tm,
      defaultWidth: "full"
    })
  };
  const nm = rm;
  var im = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, lm = function(o, t, r, n) {
    return im[o];
  };
  const am = lm;
  var sm = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }, cm = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }, dm = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }, um = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }, fm = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  }, hm = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  }, pm = function(o, t) {
    var r = Number(o), n = r % 100;
    if (n > 20 || n < 10)
      switch (n % 10) {
        case 1:
          return r + "st";
        case 2:
          return r + "nd";
        case 3:
          return r + "rd";
      }
    return r + "th";
  }, vm = {
    ordinalNumber: pm,
    era: Et({
      values: sm,
      defaultWidth: "wide"
    }),
    quarter: Et({
      values: cm,
      defaultWidth: "wide",
      argumentCallback: function(o) {
        return o - 1;
      }
    }),
    month: Et({
      values: dm,
      defaultWidth: "wide"
    }),
    day: Et({
      values: um,
      defaultWidth: "wide"
    }),
    dayPeriod: Et({
      values: fm,
      defaultWidth: "wide",
      formattingValues: hm,
      defaultFormattingWidth: "wide"
    })
  };
  const gm = vm;
  var mm = /^(\d+)(th|st|nd|rd)?/i, bm = /\d+/i, xm = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, Cm = {
    any: [/^b/i, /^(a|c)/i]
  }, ym = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, Sm = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }, wm = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, $m = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  }, Pm = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, Tm = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }, zm = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, Im = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  }, Mm = {
    ordinalNumber: qg({
      matchPattern: mm,
      parsePattern: bm,
      valueCallback: function(o) {
        return parseInt(o, 10);
      }
    }),
    era: _t({
      matchPatterns: xm,
      defaultMatchWidth: "wide",
      parsePatterns: Cm,
      defaultParseWidth: "any"
    }),
    quarter: _t({
      matchPatterns: ym,
      defaultMatchWidth: "wide",
      parsePatterns: Sm,
      defaultParseWidth: "any",
      valueCallback: function(o) {
        return o + 1;
      }
    }),
    month: _t({
      matchPatterns: wm,
      defaultMatchWidth: "wide",
      parsePatterns: $m,
      defaultParseWidth: "any"
    }),
    day: _t({
      matchPatterns: Pm,
      defaultMatchWidth: "wide",
      parsePatterns: Tm,
      defaultParseWidth: "any"
    }),
    dayPeriod: _t({
      matchPatterns: zm,
      defaultMatchWidth: "any",
      parsePatterns: Im,
      defaultParseWidth: "any"
    })
  };
  const km = Mm;
  var Om = {
    code: "en-US",
    formatDistance: Qg,
    formatLong: nm,
    formatRelative: am,
    localize: gm,
    match: km,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  const Em = Om, _m = {
    name: "en-US",
    locale: Em
  }, Dm = _m;
  function is(e) {
    const { mergedLocaleRef: o, mergedDateLocaleRef: t } = he(wo, null) || {}, r = E(() => {
      var i, l;
      return (l = (i = o == null ? void 0 : o.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : Kg[e];
    });
    return {
      dateLocaleRef: E(() => {
        var i;
        return (i = t == null ? void 0 : t.value) !== null && i !== void 0 ? i : Dm;
      }),
      localeRef: r
    };
  }
  function Fr(e, o, t) {
    if (!o) {
      process.env.NODE_ENV !== "production" && ql("use-style", "No style is specified.");
      return;
    }
    const r = Zo(), n = he(wo, null), i = () => {
      const l = t == null ? void 0 : t.value;
      o.mount({
        id: l === void 0 ? e : l + e,
        head: !0,
        anchorMetaName: Xt,
        props: {
          bPrefix: l ? `.${l}-` : void 0
        },
        ssr: r
      }), n != null && n.preflightStyleDisabled || rs.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: Xt,
        ssr: r
      });
    };
    r ? i() : Wn(i);
  }
  function To(e, o, t, r) {
    var n;
    t || ql("useThemeClass", "cssVarsRef is not passed");
    const i = (n = he(wo, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, l = R(""), a = Zo();
    let s;
    const c = `__${e}`, u = () => {
      let f = c;
      const v = o ? o.value : void 0, p = i == null ? void 0 : i.value;
      p && (f += "-" + p), v && (f += "-" + v);
      const { themeOverrides: d, builtinThemeOverrides: g } = r;
      d && (f += "-" + Vt(JSON.stringify(d))), g && (f += "-" + Vt(JSON.stringify(g))), l.value = f, s = () => {
        const x = t.value;
        let h = "";
        for (const w in x)
          h += `${w}: ${x[w]};`;
        V(`.${f}`, h).mount({
          id: f,
          ssr: a
        }), s = void 0;
      };
    };
    return Co(() => {
      u();
    }), {
      themeClass: l,
      onRender: () => {
        s == null || s();
      }
    };
  }
  function ls(e, o, t) {
    if (!o)
      return;
    const r = Zo(), n = E(() => {
      const { value: l } = o;
      if (!l)
        return;
      const a = l[e];
      if (a)
        return a;
    }), i = () => {
      Co(() => {
        const { value: l } = t, a = `${l}${e}Rtl`;
        if (Id(a, r))
          return;
        const { value: s } = n;
        s && s.style.mount({
          id: a,
          head: !0,
          anchorMetaName: Xt,
          props: {
            bPrefix: l ? `.${l}-` : void 0
          },
          ssr: r
        });
      });
    };
    return r ? i() : Wn(i), n;
  }
  function as(e, o) {
    return ie({
      name: uv(e),
      setup() {
        var t;
        const r = (t = he(wo, null)) === null || t === void 0 ? void 0 : t.mergedIconsRef;
        return () => {
          var n;
          const i = (n = r == null ? void 0 : r.value) === null || n === void 0 ? void 0 : n[e];
          return i ? i() : o;
        };
      }
    });
  }
  const Hm = ie({
    name: "Checkmark",
    render() {
      return S(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
        S(
          "g",
          { fill: "none" },
          S("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })
        )
      );
    }
  }), Bm = as("close", S(
    "svg",
    { viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": !0 },
    S(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      S(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        S("path", { d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z" })
      )
    )
  )), Am = ie({
    name: "Empty",
    render() {
      return S(
        "svg",
        { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        S("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
        S("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
      );
    }
  }), Rm = ie({
    name: "ChevronDown",
    render() {
      return S(
        "svg",
        { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        S("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
      );
    }
  }), Fm = as("clear", S(
    "svg",
    { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    S(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      S(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        S("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" })
      )
    )
  )), ss = ie({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: o }) {
      const t = Hr();
      return () => S(yt, { name: "icon-switch-transition", appear: t.value }, o);
    }
  }), Lm = Q("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [V("svg", `
 height: 1em;
 width: 1em;
 `)]), Jt = ie({
    name: "BaseIcon",
    props: {
      role: String,
      ariaLabel: String,
      ariaDisabled: {
        type: Boolean,
        default: void 0
      },
      ariaHidden: {
        type: Boolean,
        default: void 0
      },
      clsPrefix: {
        type: String,
        required: !0
      },
      onClick: Function,
      onMousedown: Function,
      onMouseup: Function
    },
    setup(e) {
      Fr("-base-icon", Lm, se(e, "clsPrefix"));
    },
    render() {
      return S("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
    }
  }), Wm = Q("base-close", `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [le("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), V("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), Ye("disabled", [V("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), V("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), V("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), V("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), V("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), le("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), le("round", [V("&::before", `
 border-radius: 50%;
 `)])]), Nm = ie({
    name: "BaseClose",
    props: {
      isButtonTag: {
        type: Boolean,
        default: !0
      },
      clsPrefix: {
        type: String,
        required: !0
      },
      disabled: {
        type: Boolean,
        default: void 0
      },
      focusable: {
        type: Boolean,
        default: !0
      },
      round: Boolean,
      onClick: Function,
      absolute: Boolean
    },
    setup(e) {
      return Fr("-base-close", Wm, se(e, "clsPrefix")), () => {
        const { clsPrefix: o, disabled: t, absolute: r, round: n, isButtonTag: i } = e;
        return S(
          i ? "button" : "div",
          { type: i ? "button" : void 0, tabindex: t || !e.focusable ? -1 : 0, "aria-disabled": t, "aria-label": "close", role: i ? void 0 : "button", disabled: t, class: [
            `${o}-base-close`,
            r && `${o}-base-close--absolute`,
            t && `${o}-base-close--disabled`,
            n && `${o}-base-close--round`
          ], onMousedown: (a) => {
            e.focusable || a.preventDefault();
          }, onClick: e.onClick },
          S(Jt, { clsPrefix: o }, {
            default: () => S(Bm, null)
          })
        );
      };
    }
  }), jm = ie({
    props: {
      onFocus: Function,
      onBlur: Function
    },
    setup(e) {
      return () => S("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
    }
  }), {
    cubicBezierEaseInOut: Vm
  } = Pt;
  function Hn({
    originalTransform: e = "",
    left: o = 0,
    top: t = 0,
    transition: r = `all .3s ${Vm} !important`
  } = {}) {
    return [V("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
      transform: e + " scale(0.75)",
      left: o,
      top: t,
      opacity: 0
    }), V("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
      transform: `scale(1) ${e}`,
      left: o,
      top: t,
      opacity: 1
    }), V("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
      transformOrigin: "center",
      position: "absolute",
      left: o,
      top: t,
      transition: r
    })];
  }
  const Um = V([V("@keyframes loading-container-rotate", `
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `), V("@keyframes loading-layer-rotate", `
 12.5% {
 -webkit-transform: rotate(135deg);
 transform: rotate(135deg);
 }
 25% {
 -webkit-transform: rotate(270deg);
 transform: rotate(270deg);
 }
 37.5% {
 -webkit-transform: rotate(405deg);
 transform: rotate(405deg);
 }
 50% {
 -webkit-transform: rotate(540deg);
 transform: rotate(540deg);
 }
 62.5% {
 -webkit-transform: rotate(675deg);
 transform: rotate(675deg);
 }
 75% {
 -webkit-transform: rotate(810deg);
 transform: rotate(810deg);
 }
 87.5% {
 -webkit-transform: rotate(945deg);
 transform: rotate(945deg);
 }
 100% {
 -webkit-transform: rotate(1080deg);
 transform: rotate(1080deg);
 } 
 `), V("@keyframes loading-left-spin", `
 from {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 50% {
 -webkit-transform: rotate(130deg);
 transform: rotate(130deg);
 }
 to {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 `), V("@keyframes loading-right-spin", `
 from {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 50% {
 -webkit-transform: rotate(-130deg);
 transform: rotate(-130deg);
 }
 to {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 `), Q("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [q("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [Hn()]), q("container", `
 display: inline-flex;
 position: relative;
 direction: ltr;
 line-height: 0;
 animation: loading-container-rotate 1568.2352941176ms linear infinite;
 font-size: 0;
 letter-spacing: 0;
 white-space: nowrap;
 opacity: 1;
 width: 100%;
 height: 100%;
 `, [q("svg", `
 stroke: var(--n-text-color);
 fill: transparent;
 position: absolute;
 height: 100%;
 overflow: hidden;
 `), q("container-layer", `
 position: absolute;
 width: 100%;
 height: 100%;
 animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 `, [q("container-layer-left", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [q("svg", `
 animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 width: 200%;
 `)]), q("container-layer-patch", `
 position: absolute;
 top: 0;
 left: 47.5%;
 box-sizing: border-box;
 width: 5%;
 height: 100%;
 overflow: hidden;
 `, [q("svg", `
 left: -900%;
 width: 2000%;
 transform: rotate(180deg);
 `)]), q("container-layer-right", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [q("svg", `
 animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 left: -100%;
 width: 200%;
 `)])])]), q("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [Hn({
    left: "50%",
    top: "50%",
    originalTransform: "translateX(-50%) translateY(-50%)"
  })])])]), Gm = {
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: void 0
    }
  }, cs = ie({
    name: "BaseLoading",
    props: Object.assign({ clsPrefix: {
      type: String,
      required: !0
    }, show: {
      type: Boolean,
      default: !0
    }, scale: {
      type: Number,
      default: 1
    }, radius: {
      type: Number,
      default: 100
    } }, Gm),
    setup(e) {
      Fr("-base-loading", Um, se(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: o, strokeWidth: t, stroke: r, scale: n } = this, i = o / n;
      return S(
        "div",
        { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
        S(ss, null, {
          default: () => this.show ? S(
            "div",
            { key: "icon", class: `${e}-base-loading__transition-wrapper` },
            S(
              "div",
              { class: `${e}-base-loading__container` },
              S(
                "div",
                { class: `${e}-base-loading__container-layer` },
                S(
                  "div",
                  { class: `${e}-base-loading__container-layer-left` },
                  S(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    S("circle", { fill: "none", stroke: "currentColor", "stroke-width": t, "stroke-linecap": "round", cx: i, cy: i, r: o - t / 2, "stroke-dasharray": 4.91 * o, "stroke-dashoffset": 2.46 * o })
                  )
                ),
                S(
                  "div",
                  { class: `${e}-base-loading__container-layer-patch` },
                  S(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    S("circle", { fill: "none", stroke: "currentColor", "stroke-width": t, "stroke-linecap": "round", cx: i, cy: i, r: o - t / 2, "stroke-dasharray": 4.91 * o, "stroke-dashoffset": 2.46 * o })
                  )
                ),
                S(
                  "div",
                  { class: `${e}-base-loading__container-layer-right` },
                  S(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    S("circle", { fill: "none", stroke: "currentColor", "stroke-width": t, "stroke-linecap": "round", cx: i, cy: i, r: o - t / 2, "stroke-dasharray": 4.91 * o, "stroke-dashoffset": 2.46 * o })
                  )
                )
              )
            )
          ) : S("div", { key: "placeholder", class: `${e}-base-loading__placeholder` }, this.$slots)
        })
      );
    }
  });
  function ml(e) {
    return Array.isArray(e) ? e : [e];
  }
  const Bn = {
    STOP: "STOP"
  };
  function ds(e, o) {
    const t = o(e);
    e.children !== void 0 && t !== Bn.STOP && e.children.forEach((r) => ds(r, o));
  }
  function Km(e, o = {}) {
    const { preserveGroup: t = !1 } = o, r = [], n = t ? (l) => {
      l.isLeaf || (r.push(l.key), i(l.children));
    } : (l) => {
      l.isLeaf || (l.isGroup || r.push(l.key), i(l.children));
    };
    function i(l) {
      l.forEach(n);
    }
    return i(e), r;
  }
  function Xm(e, o) {
    const { isLeaf: t } = e;
    return t !== void 0 ? t : !o(e);
  }
  function Ym(e) {
    return e.children;
  }
  function qm(e) {
    return e.key;
  }
  function Jm() {
    return !1;
  }
  function Zm(e, o) {
    const { isLeaf: t } = e;
    return !(t === !1 && !Array.isArray(o(e)));
  }
  function Qm(e) {
    return e.disabled === !0;
  }
  function eb(e, o) {
    return e.isLeaf === !1 && !Array.isArray(o(e));
  }
  function ob(e, o) {
    if (e.isLeaf === !0) {
      const t = o(e);
      if (Array.isArray(t) && t.length > 0)
        return !0;
    }
    return !1;
  }
  function nn(e) {
    var o;
    return e == null ? [] : Array.isArray(e) ? e : (o = e.checkedKeys) !== null && o !== void 0 ? o : [];
  }
  function ln(e) {
    var o;
    return e == null || Array.isArray(e) ? [] : (o = e.indeterminateKeys) !== null && o !== void 0 ? o : [];
  }
  function tb(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) || t.add(r);
    }), Array.from(t);
  }
  function rb(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) && t.delete(r);
    }), Array.from(t);
  }
  function nb(e) {
    return (e == null ? void 0 : e.type) === "group";
  }
  function ib(e) {
    const o = /* @__PURE__ */ new Map();
    return e.forEach((t, r) => {
      o.set(t.key, r);
    }), (t) => {
      var r;
      return (r = o.get(t)) !== null && r !== void 0 ? r : null;
    };
  }
  class lb extends Error {
    constructor() {
      super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
    }
  }
  function ab(e, o, t, r) {
    return Ir(o.concat(e), t, r, !1);
  }
  function sb(e, o) {
    const t = /* @__PURE__ */ new Set();
    return e.forEach((r) => {
      const n = o.treeNodeMap.get(r);
      if (n !== void 0) {
        let i = n.parent;
        for (; i !== null && !(i.disabled || t.has(i.key)); )
          t.add(i.key), i = i.parent;
      }
    }), t;
  }
  function cb(e, o, t, r) {
    const n = Ir(o, t, r, !1), i = Ir(e, t, r, !0), l = sb(e, t), a = [];
    return n.forEach((s) => {
      (i.has(s) || l.has(s)) && a.push(s);
    }), a.forEach((s) => n.delete(s)), n;
  }
  function an(e, o) {
    const { checkedKeys: t, keysToCheck: r, keysToUncheck: n, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: c } = e;
    if (!l)
      return r !== void 0 ? {
        checkedKeys: tb(t, r),
        indeterminateKeys: Array.from(i)
      } : n !== void 0 ? {
        checkedKeys: rb(t, n),
        indeterminateKeys: Array.from(i)
      } : {
        checkedKeys: Array.from(t),
        indeterminateKeys: Array.from(i)
      };
    const { levelTreeNodeMap: u } = o;
    let f;
    n !== void 0 ? f = cb(n, t, o, c) : r !== void 0 ? f = ab(r, t, o, c) : f = Ir(t, o, c, !1);
    const v = s === "parent", p = s === "child" || a, d = f, g = /* @__PURE__ */ new Set(), x = Math.max.apply(null, Array.from(u.keys()));
    for (let h = x; h >= 0; h -= 1) {
      const w = h === 0, _ = u.get(h);
      for (const I of _) {
        if (I.isLeaf)
          continue;
        const { key: M, shallowLoaded: H } = I;
        if (p && H && I.children.forEach((y) => {
          !y.disabled && !y.isLeaf && y.shallowLoaded && d.has(y.key) && d.delete(y.key);
        }), I.disabled || !H)
          continue;
        let b = !0, $ = !1, z = !0;
        for (const y of I.children) {
          const C = y.key;
          if (!y.disabled) {
            if (z && (z = !1), d.has(C))
              $ = !0;
            else if (g.has(C)) {
              $ = !0, b = !1;
              break;
            } else if (b = !1, $)
              break;
          }
        }
        b && !z ? (v && I.children.forEach((y) => {
          !y.disabled && d.has(y.key) && d.delete(y.key);
        }), d.add(M)) : $ && g.add(M), w && p && d.has(M) && d.delete(M);
      }
    }
    return {
      checkedKeys: Array.from(d),
      indeterminateKeys: Array.from(g)
    };
  }
  function Ir(e, o, t, r) {
    const { treeNodeMap: n, getChildren: i } = o, l = /* @__PURE__ */ new Set(), a = new Set(e);
    return e.forEach((s) => {
      const c = n.get(s);
      c !== void 0 && ds(c, (u) => {
        if (u.disabled)
          return Bn.STOP;
        const { key: f } = u;
        if (!l.has(f) && (l.add(f), a.add(f), eb(u.rawNode, i))) {
          if (r)
            return Bn.STOP;
          if (!t)
            throw new lb();
        }
      });
    }), a;
  }
  function db(e, { includeGroup: o = !1, includeSelf: t = !0 }, r) {
    var n;
    const i = r.treeNodeMap;
    let l = e == null ? null : (n = i.get(e)) !== null && n !== void 0 ? n : null;
    const a = {
      keyPath: [],
      treeNodePath: [],
      treeNode: l
    };
    if (l != null && l.ignored)
      return a.treeNode = null, a;
    for (; l; )
      !l.ignored && (o || !l.isGroup) && a.treeNodePath.push(l), l = l.parent;
    return a.treeNodePath.reverse(), t || a.treeNodePath.pop(), a.keyPath = a.treeNodePath.map((s) => s.key), a;
  }
  function ub(e) {
    if (e.length === 0)
      return null;
    const o = e[0];
    return o.isGroup || o.ignored || o.disabled ? o.getNext() : o;
  }
  function fb(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n + 1) % r] : n === t.length - 1 ? null : t[n + 1];
  }
  function bl(e, o, { loop: t = !1, includeDisabled: r = !1 } = {}) {
    const n = o === "prev" ? hb : fb, i = {
      reverse: o === "prev"
    };
    let l = !1, a = null;
    function s(c) {
      if (c !== null) {
        if (c === e) {
          if (!l)
            l = !0;
          else if (!e.disabled && !e.isGroup) {
            a = e;
            return;
          }
        } else if ((!c.disabled || r) && !c.ignored && !c.isGroup) {
          a = c;
          return;
        }
        if (c.isGroup) {
          const u = li(c, i);
          u !== null ? a = u : s(n(c, t));
        } else {
          const u = n(c, !1);
          if (u !== null)
            s(u);
          else {
            const f = pb(c);
            f != null && f.isGroup ? s(n(f, t)) : t && s(n(c, !0));
          }
        }
      }
    }
    return s(e), a;
  }
  function hb(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n - 1 + r) % r] : n === 0 ? null : t[n - 1];
  }
  function pb(e) {
    return e.parent;
  }
  function li(e, o = {}) {
    const { reverse: t = !1 } = o, { children: r } = e;
    if (r) {
      const { length: n } = r, i = t ? n - 1 : 0, l = t ? -1 : n, a = t ? -1 : 1;
      for (let s = i; s !== l; s += a) {
        const c = r[s];
        if (!c.disabled && !c.ignored)
          if (c.isGroup) {
            const u = li(c, o);
            if (u !== null)
              return u;
          } else
            return c;
      }
    }
    return null;
  }
  const vb = {
    getChild() {
      return this.ignored ? null : li(this);
    },
    getParent() {
      const { parent: e } = this;
      return e != null && e.isGroup ? e.getParent() : e;
    },
    getNext(e = {}) {
      return bl(this, "next", e);
    },
    getPrev(e = {}) {
      return bl(this, "prev", e);
    }
  };
  function gb(e, o) {
    const t = o ? new Set(o) : void 0, r = [];
    function n(i) {
      i.forEach((l) => {
        r.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
        t === void 0 || t.has(l.key)) && n(l.children);
      });
    }
    return n(e), r;
  }
  function mb(e, o) {
    const t = e.key;
    for (; o; ) {
      if (o.key === t)
        return !0;
      o = o.parent;
    }
    return !1;
  }
  function us(e, o, t, r, n, i = null, l = 0) {
    const a = [];
    return e.forEach((s, c) => {
      var u;
      process.env.NODE_ENV !== "production" && ob(s, n) && console.error("[treemate]: node", s, "is invalid");
      const f = Object.create(r);
      if (f.rawNode = s, f.siblings = a, f.level = l, f.index = c, f.isFirstChild = c === 0, f.isLastChild = c + 1 === e.length, f.parent = i, !f.ignored) {
        const v = n(s);
        Array.isArray(v) && (f.children = us(v, o, t, r, n, f, l + 1));
      }
      a.push(f), o.set(f.key, f), t.has(l) || t.set(l, []), (u = t.get(l)) === null || u === void 0 || u.push(f);
    }), a;
  }
  function bb(e, o = {}) {
    var t;
    const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), { getDisabled: i = Qm, getIgnored: l = Jm, getIsGroup: a = nb, getKey: s = qm } = o, c = (t = o.getChildren) !== null && t !== void 0 ? t : Ym, u = o.ignoreEmptyChildren ? (I) => {
      const M = c(I);
      return Array.isArray(M) ? M.length ? M : null : M;
    } : c, f = Object.assign({
      get key() {
        return s(this.rawNode);
      },
      get disabled() {
        return i(this.rawNode);
      },
      get isGroup() {
        return a(this.rawNode);
      },
      get isLeaf() {
        return Xm(this.rawNode, u);
      },
      get shallowLoaded() {
        return Zm(this.rawNode, u);
      },
      get ignored() {
        return l(this.rawNode);
      },
      contains(I) {
        return mb(this, I);
      }
    }, vb), v = us(e, r, n, f, u);
    function p(I) {
      if (I == null)
        return null;
      const M = r.get(I);
      return M && !M.isGroup && !M.ignored ? M : null;
    }
    function d(I) {
      if (I == null)
        return null;
      const M = r.get(I);
      return M && !M.ignored ? M : null;
    }
    function g(I, M) {
      const H = d(I);
      return H ? H.getPrev(M) : null;
    }
    function x(I, M) {
      const H = d(I);
      return H ? H.getNext(M) : null;
    }
    function h(I) {
      const M = d(I);
      return M ? M.getParent() : null;
    }
    function w(I) {
      const M = d(I);
      return M ? M.getChild() : null;
    }
    const _ = {
      treeNodes: v,
      treeNodeMap: r,
      levelTreeNodeMap: n,
      maxLevel: Math.max(...n.keys()),
      getChildren: u,
      getFlattenedNodes(I) {
        return gb(v, I);
      },
      getNode: p,
      getPrev: g,
      getNext: x,
      getParent: h,
      getChild: w,
      getFirstAvailableNode() {
        return ub(v);
      },
      getPath(I, M = {}) {
        return db(I, M, _);
      },
      getCheckedKeys(I, M = {}) {
        const { cascade: H = !0, leafOnly: b = !1, checkStrategy: $ = "all", allowNotLoaded: z = !1 } = M;
        return an({
          checkedKeys: nn(I),
          indeterminateKeys: ln(I),
          cascade: H,
          leafOnly: b,
          checkStrategy: $,
          allowNotLoaded: z
        }, _);
      },
      check(I, M, H = {}) {
        const { cascade: b = !0, leafOnly: $ = !1, checkStrategy: z = "all", allowNotLoaded: y = !1 } = H;
        return an({
          checkedKeys: nn(M),
          indeterminateKeys: ln(M),
          keysToCheck: I == null ? [] : ml(I),
          cascade: b,
          leafOnly: $,
          checkStrategy: z,
          allowNotLoaded: y
        }, _);
      },
      uncheck(I, M, H = {}) {
        const { cascade: b = !0, leafOnly: $ = !1, checkStrategy: z = "all", allowNotLoaded: y = !1 } = H;
        return an({
          checkedKeys: nn(M),
          indeterminateKeys: ln(M),
          keysToUncheck: I == null ? [] : ml(I),
          cascade: b,
          leafOnly: $,
          checkStrategy: z,
          allowNotLoaded: y
        }, _);
      },
      getNonLeafKeys(I = {}) {
        return Km(v, I);
      }
    };
    return _;
  }
  const j = {
    neutralBase: "#000",
    neutralInvertBase: "#fff",
    neutralTextBase: "#fff",
    neutralPopover: "rgb(72, 72, 78)",
    neutralCard: "rgb(24, 24, 28)",
    neutralModal: "rgb(44, 44, 50)",
    neutralBody: "rgb(16, 16, 20)",
    alpha1: "0.9",
    alpha2: "0.82",
    alpha3: "0.52",
    alpha4: "0.38",
    alpha5: "0.28",
    alphaClose: "0.52",
    alphaDisabled: "0.38",
    alphaDisabledInput: "0.06",
    alphaPending: "0.09",
    alphaTablePending: "0.06",
    alphaTableStriped: "0.05",
    alphaPressed: "0.05",
    alphaAvatar: "0.18",
    alphaRail: "0.2",
    alphaProgressRail: "0.12",
    alphaBorder: "0.24",
    alphaDivider: "0.09",
    alphaInput: "0.1",
    alphaAction: "0.06",
    alphaTab: "0.04",
    alphaScrollbar: "0.2",
    alphaScrollbarHover: "0.3",
    alphaCode: "0.12",
    alphaTag: "0.2",
    // primary
    primaryHover: "#7fe7c4",
    primaryDefault: "#63e2b7",
    primaryActive: "#5acea7",
    primarySuppl: "rgb(42, 148, 125)",
    // info
    infoHover: "#8acbec",
    infoDefault: "#70c0e8",
    infoActive: "#66afd3",
    infoSuppl: "rgb(56, 137, 197)",
    // error
    errorHover: "#e98b8b",
    errorDefault: "#e88080",
    errorActive: "#e57272",
    errorSuppl: "rgb(208, 58, 82)",
    // warning
    warningHover: "#f5d599",
    warningDefault: "#f2c97d",
    warningActive: "#e6c260",
    warningSuppl: "rgb(240, 138, 0)",
    // success
    successHover: "#7fe7c4",
    successDefault: "#63e2b7",
    successActive: "#5acea7",
    successSuppl: "rgb(42, 148, 125)"
  }, xb = yo(j.neutralBase), fs = yo(j.neutralInvertBase), Cb = "rgba(" + fs.slice(0, 3).join(", ") + ", ";
  function ae(e) {
    return Cb + String(e) + ")";
  }
  function yb(e) {
    const o = Array.from(fs);
    return o[3] = Number(e), ee(xb, o);
  }
  const Sb = Object.assign(Object.assign({ name: "common" }, Pt), {
    baseColor: j.neutralBase,
    // primary color
    primaryColor: j.primaryDefault,
    primaryColorHover: j.primaryHover,
    primaryColorPressed: j.primaryActive,
    primaryColorSuppl: j.primarySuppl,
    // info color
    infoColor: j.infoDefault,
    infoColorHover: j.infoHover,
    infoColorPressed: j.infoActive,
    infoColorSuppl: j.infoSuppl,
    // success color
    successColor: j.successDefault,
    successColorHover: j.successHover,
    successColorPressed: j.successActive,
    successColorSuppl: j.successSuppl,
    // warning color
    warningColor: j.warningDefault,
    warningColorHover: j.warningHover,
    warningColorPressed: j.warningActive,
    warningColorSuppl: j.warningSuppl,
    // error color
    errorColor: j.errorDefault,
    errorColorHover: j.errorHover,
    errorColorPressed: j.errorActive,
    errorColorSuppl: j.errorSuppl,
    // text color
    textColorBase: j.neutralTextBase,
    textColor1: ae(j.alpha1),
    textColor2: ae(j.alpha2),
    textColor3: ae(j.alpha3),
    // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
    // textColor5: overlay(base.alpha5),
    textColorDisabled: ae(j.alpha4),
    placeholderColor: ae(j.alpha4),
    placeholderColorDisabled: ae(j.alpha5),
    iconColor: ae(j.alpha4),
    iconColorDisabled: ae(j.alpha5),
    iconColorHover: ae(Number(j.alpha4) * 1.25),
    iconColorPressed: ae(Number(j.alpha4) * 0.8),
    opacity1: j.alpha1,
    opacity2: j.alpha2,
    opacity3: j.alpha3,
    opacity4: j.alpha4,
    opacity5: j.alpha5,
    dividerColor: ae(j.alphaDivider),
    borderColor: ae(j.alphaBorder),
    // close
    closeIconColorHover: ae(Number(j.alphaClose)),
    closeIconColor: ae(Number(j.alphaClose)),
    closeIconColorPressed: ae(Number(j.alphaClose)),
    closeColorHover: "rgba(255, 255, 255, .12)",
    closeColorPressed: "rgba(255, 255, 255, .08)",
    // clear
    clearColor: ae(j.alpha4),
    clearColorHover: ve(ae(j.alpha4), { alpha: 1.25 }),
    clearColorPressed: ve(ae(j.alpha4), { alpha: 0.8 }),
    scrollbarColor: ae(j.alphaScrollbar),
    scrollbarColorHover: ae(j.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: ae(j.alphaProgressRail),
    railColor: ae(j.alphaRail),
    popoverColor: j.neutralPopover,
    tableColor: j.neutralCard,
    cardColor: j.neutralCard,
    modalColor: j.neutralModal,
    bodyColor: j.neutralBody,
    tagColor: yb(j.alphaTag),
    avatarColor: ae(j.alphaAvatar),
    invertedColor: j.neutralBase,
    inputColor: ae(j.alphaInput),
    codeColor: ae(j.alphaCode),
    tabColor: ae(j.alphaTab),
    actionColor: ae(j.alphaAction),
    tableHeaderColor: ae(j.alphaAction),
    hoverColor: ae(j.alphaPending),
    tableColorHover: ae(j.alphaTablePending),
    tableColorStriped: ae(j.alphaTableStriped),
    pressedColor: ae(j.alphaPressed),
    opacityDisabled: j.alphaDisabled,
    inputColorDisabled: ae(j.alphaDisabledInput),
    buttonColor2: "rgba(255, 255, 255, .08)",
    buttonColor2Hover: "rgba(255, 255, 255, .12)",
    buttonColor2Pressed: "rgba(255, 255, 255, .08)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), F = Sb, Z = {
    neutralBase: "#FFF",
    neutralInvertBase: "#000",
    neutralTextBase: "#000",
    neutralPopover: "#fff",
    neutralCard: "#fff",
    neutralModal: "#fff",
    neutralBody: "#fff",
    alpha1: "0.82",
    alpha2: "0.72",
    alpha3: "0.38",
    alpha4: "0.24",
    alpha5: "0.18",
    alphaClose: "0.6",
    alphaDisabled: "0.5",
    alphaDisabledInput: "0.02",
    alphaPending: "0.05",
    alphaTablePending: "0.02",
    alphaPressed: "0.07",
    alphaAvatar: "0.2",
    alphaRail: "0.14",
    alphaProgressRail: ".08",
    alphaBorder: "0.12",
    alphaDivider: "0.06",
    alphaInput: "0",
    alphaAction: "0.02",
    alphaTab: "0.04",
    alphaScrollbar: "0.25",
    alphaScrollbarHover: "0.4",
    alphaCode: "0.05",
    alphaTag: "0.02",
    // primary
    primaryHover: "#36ad6a",
    primaryDefault: "#18a058",
    primaryActive: "#0c7a43",
    primarySuppl: "#36ad6a",
    // info
    infoHover: "#4098fc",
    infoDefault: "#2080f0",
    infoActive: "#1060c9",
    infoSuppl: "#4098fc",
    // error
    errorHover: "#de576d",
    errorDefault: "#d03050",
    errorActive: "#ab1f3f",
    errorSuppl: "#de576d",
    // warning
    warningHover: "#fcb040",
    warningDefault: "#f0a020",
    warningActive: "#c97c10",
    warningSuppl: "#fcb040",
    // success
    successHover: "#36ad6a",
    successDefault: "#18a058",
    successActive: "#0c7a43",
    successSuppl: "#36ad6a"
  }, wb = yo(Z.neutralBase), hs = yo(Z.neutralInvertBase), $b = "rgba(" + hs.slice(0, 3).join(", ") + ", ";
  function xl(e) {
    return $b + String(e) + ")";
  }
  function ye(e) {
    const o = Array.from(hs);
    return o[3] = Number(e), ee(wb, o);
  }
  const Pb = Object.assign(Object.assign({ name: "common" }, Pt), {
    baseColor: Z.neutralBase,
    // primary color
    primaryColor: Z.primaryDefault,
    primaryColorHover: Z.primaryHover,
    primaryColorPressed: Z.primaryActive,
    primaryColorSuppl: Z.primarySuppl,
    // info color
    infoColor: Z.infoDefault,
    infoColorHover: Z.infoHover,
    infoColorPressed: Z.infoActive,
    infoColorSuppl: Z.infoSuppl,
    // success color
    successColor: Z.successDefault,
    successColorHover: Z.successHover,
    successColorPressed: Z.successActive,
    successColorSuppl: Z.successSuppl,
    // warning color
    warningColor: Z.warningDefault,
    warningColorHover: Z.warningHover,
    warningColorPressed: Z.warningActive,
    warningColorSuppl: Z.warningSuppl,
    // error color
    errorColor: Z.errorDefault,
    errorColorHover: Z.errorHover,
    errorColorPressed: Z.errorActive,
    errorColorSuppl: Z.errorSuppl,
    // text color
    textColorBase: Z.neutralTextBase,
    textColor1: "rgb(31, 34, 37)",
    textColor2: "rgb(51, 54, 57)",
    textColor3: "rgb(118, 124, 130)",
    // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
    // textColor5: neutral(base.alpha5),
    textColorDisabled: ye(Z.alpha4),
    placeholderColor: ye(Z.alpha4),
    placeholderColorDisabled: ye(Z.alpha5),
    iconColor: ye(Z.alpha4),
    iconColorHover: ve(ye(Z.alpha4), { lightness: 0.75 }),
    iconColorPressed: ve(ye(Z.alpha4), { lightness: 0.9 }),
    iconColorDisabled: ye(Z.alpha5),
    opacity1: Z.alpha1,
    opacity2: Z.alpha2,
    opacity3: Z.alpha3,
    opacity4: Z.alpha4,
    opacity5: Z.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    // close
    closeIconColor: ye(Number(Z.alphaClose)),
    closeIconColorHover: ye(Number(Z.alphaClose)),
    closeIconColorPressed: ye(Number(Z.alphaClose)),
    closeColorHover: "rgba(0, 0, 0, .09)",
    closeColorPressed: "rgba(0, 0, 0, .13)",
    // clear
    clearColor: ye(Z.alpha4),
    clearColorHover: ve(ye(Z.alpha4), { lightness: 0.75 }),
    clearColorPressed: ve(ye(Z.alpha4), { lightness: 0.9 }),
    scrollbarColor: xl(Z.alphaScrollbar),
    scrollbarColorHover: xl(Z.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: ye(Z.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: Z.neutralPopover,
    tableColor: Z.neutralCard,
    cardColor: Z.neutralCard,
    modalColor: Z.neutralModal,
    bodyColor: Z.neutralBody,
    tagColor: "#eee",
    avatarColor: ye(Z.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: ye(Z.alphaInput),
    codeColor: "rgb(244, 244, 248)",
    tabColor: "rgb(247, 247, 250)",
    actionColor: "rgb(250, 250, 252)",
    tableHeaderColor: "rgb(250, 250, 252)",
    hoverColor: "rgb(243, 243, 245)",
    // use color with alpha since it can be nested with header filter & sorter effect
    tableColorHover: "rgba(0, 0, 100, 0.03)",
    tableColorStriped: "rgba(0, 0, 100, 0.02)",
    pressedColor: "rgb(237, 237, 239)",
    opacityDisabled: Z.alphaDisabled,
    inputColorDisabled: "rgb(250, 250, 252)",
    // secondary button color
    // can also be used in tertiary button & quaternary button
    buttonColor2: "rgba(46, 51, 56, .05)",
    buttonColor2Hover: "rgba(46, 51, 56, .09)",
    buttonColor2Pressed: "rgba(46, 51, 56, .13)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), lo = Pb, Tb = {
    iconSizeSmall: "34px",
    iconSizeMedium: "40px",
    iconSizeLarge: "46px",
    iconSizeHuge: "52px"
  }, ps = (e) => {
    const { textColorDisabled: o, iconColor: t, textColor2: r, fontSizeSmall: n, fontSizeMedium: i, fontSizeLarge: l, fontSizeHuge: a } = e;
    return Object.assign(Object.assign({}, Tb), {
      fontSizeSmall: n,
      fontSizeMedium: i,
      fontSizeLarge: l,
      fontSizeHuge: a,
      textColor: o,
      iconColor: t,
      extraTextColor: r
    });
  }, zb = {
    name: "Empty",
    common: lo,
    self: ps
  }, ai = zb, Ib = {
    name: "Empty",
    common: F,
    self: ps
  }, rt = Ib, Mb = Q("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [q("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [V("+", [q("description", `
 margin-top: 8px;
 `)])]), q("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), q("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), kb = Object.assign(Object.assign({}, pe.props), { description: String, showDescription: {
    type: Boolean,
    default: !0
  }, showIcon: {
    type: Boolean,
    default: !0
  }, size: {
    type: String,
    default: "medium"
  }, renderIcon: Function }), Ob = ie({
    name: "Empty",
    props: kb,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = tt(e), r = pe("Empty", "-empty", Mb, ai, e, o), { localeRef: n } = is("Empty"), i = he(wo, null), l = E(() => {
        var u, f, v;
        return (u = e.description) !== null && u !== void 0 ? u : (v = (f = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || f === void 0 ? void 0 : f.Empty) === null || v === void 0 ? void 0 : v.description;
      }), a = E(() => {
        var u, f;
        return ((f = (u = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || u === void 0 ? void 0 : u.Empty) === null || f === void 0 ? void 0 : f.renderIcon) || (() => S(Am, null));
      }), s = E(() => {
        const { size: u } = e, { common: { cubicBezierEaseInOut: f }, self: { [ce("iconSize", u)]: v, [ce("fontSize", u)]: p, textColor: d, iconColor: g, extraTextColor: x } } = r.value;
        return {
          "--n-icon-size": v,
          "--n-font-size": p,
          "--n-bezier": f,
          "--n-text-color": d,
          "--n-icon-color": g,
          "--n-extra-text-color": x
        };
      }), c = t ? To("empty", E(() => {
        let u = "";
        const { size: f } = e;
        return u += f[0], u;
      }), s, e) : void 0;
      return {
        mergedClsPrefix: o,
        mergedRenderIcon: a,
        localizedDescription: E(() => l.value || n.value.description),
        cssVars: t ? void 0 : s,
        themeClass: c == null ? void 0 : c.themeClass,
        onRender: c == null ? void 0 : c.onRender
      };
    },
    render() {
      const { $slots: e, mergedClsPrefix: o, onRender: t } = this;
      return t == null || t(), S(
        "div",
        { class: [`${o}-empty`, this.themeClass], style: this.cssVars },
        this.showIcon ? S("div", { class: `${o}-empty__icon` }, e.icon ? e.icon() : S(Jt, { clsPrefix: o }, { default: this.mergedRenderIcon })) : null,
        this.showDescription ? S("div", { class: `${o}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null,
        e.extra ? S("div", { class: `${o}-empty__extra` }, e.extra()) : null
      );
    }
  }), vs = (e) => {
    const { scrollbarColor: o, scrollbarColorHover: t } = e;
    return {
      color: o,
      colorHover: t
    };
  }, Eb = {
    name: "Scrollbar",
    common: lo,
    self: vs
  }, gs = Eb, _b = {
    name: "Scrollbar",
    common: F,
    self: vs
  }, Ee = _b, {
    cubicBezierEaseInOut: Cl
  } = Pt;
  function Db({
    name: e = "fade-in",
    enterDuration: o = "0.2s",
    leaveDuration: t = "0.2s",
    enterCubicBezier: r = Cl,
    leaveCubicBezier: n = Cl
  } = {}) {
    return [V(`&.${e}-transition-enter-active`, {
      transition: `all ${o} ${r}!important`
    }), V(`&.${e}-transition-leave-active`, {
      transition: `all ${t} ${n}!important`
    }), V(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
      opacity: 0
    }), V(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
      opacity: 1
    })];
  }
  const Hb = Q("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [V(">", [Q("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [V("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), V(">", [Q("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), V(">, +", [Q("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [le("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [V(">", [q("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), le("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [V(">", [q("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), le("disabled", [V(">", [q("scrollbar", {
    pointerEvents: "none"
  })])]), V(">", [q("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [Db(), V("&:hover", {
    backgroundColor: "var(--n-scrollbar-color-hover)"
  })])])])])]), Bb = Object.assign(Object.assign({}, pe.props), {
    size: {
      type: Number,
      default: 5
    },
    duration: {
      type: Number,
      default: 0
    },
    scrollable: {
      type: Boolean,
      default: !0
    },
    xScrollable: Boolean,
    trigger: {
      type: String,
      default: "hover"
    },
    useUnifiedContainer: Boolean,
    triggerDisplayManually: Boolean,
    // If container is set, resize observer won't not attached
    container: Function,
    content: Function,
    containerClass: String,
    containerStyle: [String, Object],
    contentClass: String,
    contentStyle: [String, Object],
    horizontalRailStyle: [String, Object],
    verticalRailStyle: [String, Object],
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    internalOnUpdateScrollLeft: Function,
    internalHoistYRail: Boolean
  }), ms = ie({
    name: "Scrollbar",
    props: Bb,
    inheritAttrs: !1,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t, mergedRtlRef: r } = tt(e), n = ls("Scrollbar", r, o), i = R(null), l = R(null), a = R(null), s = R(null), c = R(null), u = R(null), f = R(null), v = R(null), p = R(null), d = R(null), g = R(null), x = R(0), h = R(0), w = R(!1), _ = R(!1);
      let I = !1, M = !1, H, b, $ = 0, z = 0, y = 0, C = 0;
      const P = Xd(), A = E(() => {
        const { value: m } = v, { value: T } = u, { value: B } = d;
        return m === null || T === null || B === null ? 0 : Math.min(m, B * m / T + e.size * 1.5);
      }), O = E(() => `${A.value}px`), N = E(() => {
        const { value: m } = p, { value: T } = f, { value: B } = g;
        return m === null || T === null || B === null ? 0 : B * m / T + e.size * 1.5;
      }), U = E(() => `${N.value}px`), K = E(() => {
        const { value: m } = v, { value: T } = x, { value: B } = u, { value: Y } = d;
        if (m === null || B === null || Y === null)
          return 0;
        {
          const J = B - m;
          return J ? T / J * (Y - A.value) : 0;
        }
      }), X = E(() => `${K.value}px`), k = E(() => {
        const { value: m } = p, { value: T } = h, { value: B } = f, { value: Y } = g;
        if (m === null || B === null || Y === null)
          return 0;
        {
          const J = B - m;
          return J ? T / J * (Y - N.value) : 0;
        }
      }), W = E(() => `${k.value}px`), re = E(() => {
        const { value: m } = v, { value: T } = u;
        return m !== null && T !== null && T > m;
      }), fe = E(() => {
        const { value: m } = p, { value: T } = f;
        return m !== null && T !== null && T > m;
      }), Ie = E(() => {
        const { trigger: m } = e;
        return m === "none" || w.value;
      }), ao = E(() => {
        const { trigger: m } = e;
        return m === "none" || _.value;
      }), Pe = E(() => {
        const { container: m } = e;
        return m ? m() : l.value;
      }), Ze = E(() => {
        const { content: m } = e;
        return m ? m() : a.value;
      }), Ae = Vu(() => {
        e.container || Ge({
          top: x.value,
          left: h.value
        });
      }), De = () => {
        Ae.isDeactivated || Le();
      }, Ce = (m) => {
        if (Ae.isDeactivated)
          return;
        const { onResize: T } = e;
        T && T(m), Le();
      }, Ge = (m, T) => {
        if (!e.scrollable)
          return;
        if (typeof m == "number") {
          Fe(T ?? 0, m, 0, !1, "auto");
          return;
        }
        const { left: B, top: Y, index: J, elSize: oe, position: te, behavior: ne, el: ke, debounce: ho = !0 } = m;
        (B !== void 0 || Y !== void 0) && Fe(B ?? 0, Y ?? 0, 0, !1, ne), ke !== void 0 ? Fe(0, ke.offsetTop, ke.offsetHeight, ho, ne) : J !== void 0 && oe !== void 0 ? Fe(0, J * oe, oe, ho, ne) : te === "bottom" ? Fe(0, Number.MAX_SAFE_INTEGER, 0, !1, ne) : te === "top" && Fe(0, 0, 0, !1, ne);
      }, Re = (m, T) => {
        if (!e.scrollable)
          return;
        const { value: B } = Pe;
        B && (typeof m == "object" ? B.scrollBy(m) : B.scrollBy(m, T || 0));
      };
      function Fe(m, T, B, Y, J) {
        const { value: oe } = Pe;
        if (oe) {
          if (Y) {
            const { scrollTop: te, offsetHeight: ne } = oe;
            if (T > te) {
              T + B <= te + ne || oe.scrollTo({
                left: m,
                top: T + B - ne,
                behavior: J
              });
              return;
            }
          }
          oe.scrollTo({
            left: m,
            top: T,
            behavior: J
          });
        }
      }
      function so() {
        zo(), Io(), Le();
      }
      function co() {
        uo();
      }
      function uo() {
        Ro(), Fo();
      }
      function Ro() {
        b !== void 0 && window.clearTimeout(b), b = window.setTimeout(() => {
          _.value = !1;
        }, e.duration);
      }
      function Fo() {
        H !== void 0 && window.clearTimeout(H), H = window.setTimeout(() => {
          w.value = !1;
        }, e.duration);
      }
      function zo() {
        H !== void 0 && window.clearTimeout(H), w.value = !0;
      }
      function Io() {
        b !== void 0 && window.clearTimeout(b), _.value = !0;
      }
      function Me(m) {
        const { onScroll: T } = e;
        T && T(m), L();
      }
      function L() {
        const { value: m } = Pe;
        m && (x.value = m.scrollTop, h.value = m.scrollLeft * (n != null && n.value ? -1 : 1));
      }
      function G() {
        const { value: m } = Ze;
        m && (u.value = m.offsetHeight, f.value = m.offsetWidth);
        const { value: T } = Pe;
        T && (v.value = T.offsetHeight, p.value = T.offsetWidth);
        const { value: B } = c, { value: Y } = s;
        B && (g.value = B.offsetWidth), Y && (d.value = Y.offsetHeight);
      }
      function de() {
        const { value: m } = Pe;
        m && (x.value = m.scrollTop, h.value = m.scrollLeft * (n != null && n.value ? -1 : 1), v.value = m.offsetHeight, p.value = m.offsetWidth, u.value = m.scrollHeight, f.value = m.scrollWidth);
        const { value: T } = c, { value: B } = s;
        T && (g.value = T.offsetWidth), B && (d.value = B.offsetHeight);
      }
      function Le() {
        e.scrollable && (e.useUnifiedContainer ? de() : (G(), L()));
      }
      function it(m) {
        var T;
        return !(!((T = i.value) === null || T === void 0) && T.contains(jt(m)));
      }
      function It(m) {
        m.preventDefault(), m.stopPropagation(), M = !0, ze("mousemove", window, lt, !0), ze("mouseup", window, at, !0), z = h.value, y = n != null && n.value ? window.innerWidth - m.clientX : m.clientX;
      }
      function lt(m) {
        if (!M)
          return;
        H !== void 0 && window.clearTimeout(H), b !== void 0 && window.clearTimeout(b);
        const { value: T } = p, { value: B } = f, { value: Y } = N;
        if (T === null || B === null)
          return;
        const oe = (n != null && n.value ? window.innerWidth - m.clientX - y : m.clientX - y) * (B - T) / (T - Y), te = B - T;
        let ne = z + oe;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Pe;
        if (ke) {
          ke.scrollLeft = ne * (n != null && n.value ? -1 : 1);
          const { internalOnUpdateScrollLeft: ho } = e;
          ho && ho(ne);
        }
      }
      function at(m) {
        m.preventDefault(), m.stopPropagation(), me("mousemove", window, lt, !0), me("mouseup", window, at, !0), M = !1, Le(), it(m) && uo();
      }
      function st(m) {
        m.preventDefault(), m.stopPropagation(), I = !0, ze("mousemove", window, Mo, !0), ze("mouseup", window, ko, !0), $ = x.value, C = m.clientY;
      }
      function Mo(m) {
        if (!I)
          return;
        H !== void 0 && window.clearTimeout(H), b !== void 0 && window.clearTimeout(b);
        const { value: T } = v, { value: B } = u, { value: Y } = A;
        if (T === null || B === null)
          return;
        const oe = (m.clientY - C) * (B - T) / (T - Y), te = B - T;
        let ne = $ + oe;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Pe;
        ke && (ke.scrollTop = ne);
      }
      function ko(m) {
        m.preventDefault(), m.stopPropagation(), me("mousemove", window, Mo, !0), me("mouseup", window, ko, !0), I = !1, Le(), it(m) && uo();
      }
      Co(() => {
        const { value: m } = fe, { value: T } = re, { value: B } = o, { value: Y } = c, { value: J } = s;
        Y && (m ? Y.classList.remove(`${B}-scrollbar-rail--disabled`) : Y.classList.add(`${B}-scrollbar-rail--disabled`)), J && (T ? J.classList.remove(`${B}-scrollbar-rail--disabled`) : J.classList.add(`${B}-scrollbar-rail--disabled`));
      }), Ve(() => {
        e.container || Le();
      }), Je(() => {
        H !== void 0 && window.clearTimeout(H), b !== void 0 && window.clearTimeout(b), me("mousemove", window, Mo, !0), me("mouseup", window, ko, !0);
      });
      const Mt = pe("Scrollbar", "-scrollbar", Hb, gs, e, o), ct = E(() => {
        const { common: { cubicBezierEaseInOut: m, scrollbarBorderRadius: T, scrollbarHeight: B, scrollbarWidth: Y }, self: { color: J, colorHover: oe } } = Mt.value;
        return {
          "--n-scrollbar-bezier": m,
          "--n-scrollbar-color": J,
          "--n-scrollbar-color-hover": oe,
          "--n-scrollbar-border-radius": T,
          "--n-scrollbar-width": Y,
          "--n-scrollbar-height": B
        };
      }), Ke = t ? To("scrollbar", void 0, ct, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: Ge,
        scrollBy: Re,
        sync: Le,
        syncUnifiedContainer: de,
        handleMouseEnterWrapper: so,
        handleMouseLeaveWrapper: co
      }), {
        mergedClsPrefix: o,
        rtlEnabled: n,
        containerScrollTop: x,
        wrapperRef: i,
        containerRef: l,
        contentRef: a,
        yRailRef: s,
        xRailRef: c,
        needYBar: re,
        needXBar: fe,
        yBarSizePx: O,
        xBarSizePx: U,
        yBarTopPx: X,
        xBarLeftPx: W,
        isShowXBar: Ie,
        isShowYBar: ao,
        isIos: P,
        handleScroll: Me,
        handleContentResize: De,
        handleContainerResize: Ce,
        handleYScrollMouseDown: st,
        handleXScrollMouseDown: It,
        cssVars: t ? void 0 : ct,
        themeClass: Ke == null ? void 0 : Ke.themeClass,
        onRender: Ke == null ? void 0 : Ke.onRender
      });
    },
    render() {
      var e;
      const { $slots: o, mergedClsPrefix: t, triggerDisplayManually: r, rtlEnabled: n, internalHoistYRail: i } = this;
      if (!this.scrollable)
        return (e = o.default) === null || e === void 0 ? void 0 : e.call(o);
      const l = this.trigger === "none", a = () => S("div", { ref: "yRailRef", class: [
        `${t}-scrollbar-rail`,
        `${t}-scrollbar-rail--vertical`
      ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, S(l ? yn : yt, l ? null : { name: "fade-in-transition" }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? S("div", { class: `${t}-scrollbar-rail__scrollbar`, style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        }, onMousedown: this.handleYScrollMouseDown }) : null
      })), s = () => {
        var u, f;
        return (u = this.onRender) === null || u === void 0 || u.call(this), S("div", Or(this.$attrs, {
          role: "none",
          ref: "wrapperRef",
          class: [
            `${t}-scrollbar`,
            this.themeClass,
            n && `${t}-scrollbar--rtl`
          ],
          style: this.cssVars,
          onMouseenter: r ? void 0 : this.handleMouseEnterWrapper,
          onMouseleave: r ? void 0 : this.handleMouseLeaveWrapper
        }), [
          this.container ? (f = o.default) === null || f === void 0 ? void 0 : f.call(o) : S(
            "div",
            { role: "none", ref: "containerRef", class: [
              `${t}-scrollbar-container`,
              this.containerClass
            ], style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel },
            S(Sr, { onResize: this.handleContentResize }, {
              default: () => S("div", { ref: "contentRef", role: "none", style: [
                {
                  width: this.xScrollable ? "fit-content" : null
                },
                this.contentStyle
              ], class: [
                `${t}-scrollbar-content`,
                this.contentClass
              ] }, o)
            })
          ),
          i ? null : a(),
          this.xScrollable && S("div", { ref: "xRailRef", class: [
            `${t}-scrollbar-rail`,
            `${t}-scrollbar-rail--horizontal`
          ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, S(l ? yn : yt, l ? null : { name: "fade-in-transition" }, {
            default: () => this.needXBar && this.isShowXBar && !this.isIos ? S("div", { class: `${t}-scrollbar-rail__scrollbar`, style: {
              width: this.xBarSizePx,
              right: n ? this.xBarLeftPx : void 0,
              left: n ? void 0 : this.xBarLeftPx
            }, onMousedown: this.handleXScrollMouseDown }) : null
          }))
        ]);
      }, c = this.container ? s() : S(Sr, { onResize: this.handleContainerResize }, {
        default: s
      });
      return i ? S(
        oo,
        null,
        c,
        a()
      ) : c;
    }
  }), Ab = ms, Rb = ms, Fb = {
    height: "calc(var(--n-option-height) * 7.6)",
    paddingSmall: "4px 0",
    paddingMedium: "4px 0",
    paddingLarge: "4px 0",
    paddingHuge: "4px 0",
    optionPaddingSmall: "0 12px",
    optionPaddingMedium: "0 12px",
    optionPaddingLarge: "0 12px",
    optionPaddingHuge: "0 12px",
    loadingSize: "18px"
  }, bs = (e) => {
    const { borderRadius: o, popoverColor: t, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: l, textColorDisabled: a, primaryColor: s, opacityDisabled: c, hoverColor: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p, fontSizeHuge: d, heightSmall: g, heightMedium: x, heightLarge: h, heightHuge: w } = e;
    return Object.assign(Object.assign({}, Fb), { optionFontSizeSmall: f, optionFontSizeMedium: v, optionFontSizeLarge: p, optionFontSizeHuge: d, optionHeightSmall: g, optionHeightMedium: x, optionHeightLarge: h, optionHeightHuge: w, borderRadius: o, color: t, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: l, optionTextColorDisabled: a, optionTextColorActive: s, optionOpacityDisabled: c, optionCheckColor: s, optionColorPending: u, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: u, actionTextColor: i, loadingColor: s });
  }, Lb = {
    name: "InternalSelectMenu",
    common: lo,
    peers: {
      Scrollbar: gs,
      Empty: ai
    },
    self: bs
  }, xs = Lb, Wb = {
    name: "InternalSelectMenu",
    common: F,
    peers: {
      Scrollbar: Ee,
      Empty: rt
    },
    self: bs
  }, Zt = Wb;
  function Nb(e, o) {
    return S(yt, { name: "fade-in-scale-up-transition" }, {
      default: () => e ? S(Jt, { clsPrefix: o, class: `${o}-base-select-option__check` }, {
        default: () => S(Hm)
      }) : null
    });
  }
  const yl = ie({
    name: "NBaseSelectOption",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      tmNode: {
        type: Object,
        required: !0
      }
    },
    setup(e) {
      const {
        valueRef: o,
        pendingTmNodeRef: t,
        multipleRef: r,
        valueSetRef: n,
        renderLabelRef: i,
        renderOptionRef: l,
        labelFieldRef: a,
        valueFieldRef: s,
        showCheckmarkRef: c,
        nodePropsRef: u,
        handleOptionClick: f,
        handleOptionMouseEnter: v
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = he(Un), p = qe(() => {
        const { value: h } = t;
        return h ? e.tmNode.key === h.key : !1;
      });
      function d(h) {
        const { tmNode: w } = e;
        w.disabled || f(h, w);
      }
      function g(h) {
        const { tmNode: w } = e;
        w.disabled || v(h, w);
      }
      function x(h) {
        const { tmNode: w } = e, { value: _ } = p;
        w.disabled || _ || v(h, w);
      }
      return {
        multiple: r,
        isGrouped: qe(() => {
          const { tmNode: h } = e, { parent: w } = h;
          return w && w.rawNode.type === "group";
        }),
        showCheckmark: c,
        nodeProps: u,
        isPending: p,
        isSelected: qe(() => {
          const { value: h } = o, { value: w } = r;
          if (h === null)
            return !1;
          const _ = e.tmNode.rawNode[s.value];
          if (w) {
            const { value: I } = n;
            return I.has(_);
          } else
            return h === _;
        }),
        labelField: a,
        renderLabel: i,
        renderOption: l,
        handleMouseMove: x,
        handleMouseEnter: g,
        handleClick: d
      };
    },
    render() {
      const { clsPrefix: e, tmNode: { rawNode: o }, isSelected: t, isPending: r, isGrouped: n, showCheckmark: i, nodeProps: l, renderOption: a, renderLabel: s, handleClick: c, handleMouseEnter: u, handleMouseMove: f } = this, v = Nb(t, e), p = s ? [s(o, t), i && v] : [
        gt(o[this.labelField], o, t),
        i && v
      ], d = l == null ? void 0 : l(o), g = S(
        "div",
        Object.assign({}, d, { class: [
          `${e}-base-select-option`,
          o.class,
          d == null ? void 0 : d.class,
          {
            [`${e}-base-select-option--disabled`]: o.disabled,
            [`${e}-base-select-option--selected`]: t,
            [`${e}-base-select-option--grouped`]: n,
            [`${e}-base-select-option--pending`]: r,
            [`${e}-base-select-option--show-checkmark`]: i
          }
        ], style: [(d == null ? void 0 : d.style) || "", o.style || ""], onClick: Gr([c, d == null ? void 0 : d.onClick]), onMouseenter: Gr([
          u,
          d == null ? void 0 : d.onMouseenter
        ]), onMousemove: Gr([f, d == null ? void 0 : d.onMousemove]) }),
        S("div", { class: `${e}-base-select-option__content` }, p)
      );
      return o.render ? o.render({ node: g, option: o, selected: t }) : a ? a({ node: g, option: o, selected: t }) : g;
    }
  }), Sl = ie({
    name: "NBaseSelectGroupHeader",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      tmNode: {
        type: Object,
        required: !0
      }
    },
    setup() {
      const {
        renderLabelRef: e,
        renderOptionRef: o,
        labelFieldRef: t,
        nodePropsRef: r
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = he(Un);
      return {
        labelField: t,
        nodeProps: r,
        renderLabel: e,
        renderOption: o
      };
    },
    render() {
      const { clsPrefix: e, renderLabel: o, renderOption: t, nodeProps: r, tmNode: { rawNode: n } } = this, i = r == null ? void 0 : r(n), l = o ? o(n, !1) : gt(n[this.labelField], n, !1), a = S("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), l);
      return n.render ? n.render({ node: a, option: n }) : t ? t({ node: a, option: n, selected: !1 }) : a;
    }
  }), {
    cubicBezierEaseIn: wl,
    cubicBezierEaseOut: $l
  } = Pt;
  function Cs({
    transformOrigin: e = "inherit",
    duration: o = ".2s",
    enterScale: t = ".9",
    originalTransform: r = "",
    originalTransition: n = ""
  } = {}) {
    return [V("&.fade-in-scale-up-transition-leave-active", {
      transformOrigin: e,
      transition: `opacity ${o} ${wl}, transform ${o} ${wl} ${n && "," + n}`
    }), V("&.fade-in-scale-up-transition-enter-active", {
      transformOrigin: e,
      transition: `opacity ${o} ${$l}, transform ${o} ${$l} ${n && "," + n}`
    }), V("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
      opacity: 0,
      transform: `${r} scale(${t})`
    }), V("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
      opacity: 1,
      transform: `${r} scale(1)`
    })];
  }
  const jb = Q("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [Q("scrollbar", `
 max-height: var(--n-height);
 `), Q("virtual-list", `
 max-height: var(--n-height);
 `), Q("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [q("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), Q("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), Q("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), q("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), q("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), q("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), Q("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), Q("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [le("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), V("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), V("&:active", `
 color: var(--n-option-text-color-pressed);
 `), le("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), le("pending", [V("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), le("selected", `
 color: var(--n-option-text-color-active);
 `, [V("&::before", `
 background-color: var(--n-option-color-active);
 `), le("pending", [V("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), le("disabled", `
 cursor: not-allowed;
 `, [Ye("selected", `
 color: var(--n-option-text-color-disabled);
 `), le("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), q("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [Cs({
    enterScale: "0.5"
  })])])]), Vb = ie({
    name: "InternalSelectMenu",
    props: Object.assign(Object.assign({}, pe.props), {
      clsPrefix: {
        type: String,
        required: !0
      },
      scrollable: {
        type: Boolean,
        default: !0
      },
      treeMate: {
        type: Object,
        required: !0
      },
      multiple: Boolean,
      size: {
        type: String,
        default: "medium"
      },
      value: {
        type: [String, Number, Array],
        default: null
      },
      autoPending: Boolean,
      virtualScroll: {
        type: Boolean,
        default: !0
      },
      // show is used to toggle pending state initialization
      show: {
        type: Boolean,
        default: !0
      },
      labelField: {
        type: String,
        default: "label"
      },
      valueField: {
        type: String,
        default: "value"
      },
      loading: Boolean,
      focusable: Boolean,
      renderLabel: Function,
      renderOption: Function,
      nodeProps: Function,
      showCheckmark: { type: Boolean, default: !0 },
      onMousedown: Function,
      onScroll: Function,
      onFocus: Function,
      onBlur: Function,
      onKeyup: Function,
      onKeydown: Function,
      onTabOut: Function,
      onMouseenter: Function,
      onMouseleave: Function,
      onResize: Function,
      resetMenuOnOptionsChange: {
        type: Boolean,
        default: !0
      },
      inlineThemeDisabled: Boolean,
      // deprecated
      onToggle: Function
    }),
    setup(e) {
      const o = pe("InternalSelectMenu", "-internal-select-menu", jb, xs, e, se(e, "clsPrefix")), t = R(null), r = R(null), n = R(null), i = E(() => e.treeMate.getFlattenedNodes()), l = E(() => ib(i.value)), a = R(null);
      function s() {
        const { treeMate: k } = e;
        let W = null;
        const { value: re } = e;
        re === null ? W = k.getFirstAvailableNode() : (e.multiple ? W = k.getNode((re || [])[(re || []).length - 1]) : W = k.getNode(re), (!W || W.disabled) && (W = k.getFirstAvailableNode())), C(W || null);
      }
      function c() {
        const { value: k } = a;
        k && !e.treeMate.getNode(k.key) && (a.value = null);
      }
      let u;
      xe(() => e.show, (k) => {
        k ? u = xe(() => e.treeMate, () => {
          e.resetMenuOnOptionsChange ? (e.autoPending ? s() : c(), Ct(P)) : c();
        }, {
          immediate: !0
        }) : u == null || u();
      }, {
        immediate: !0
      }), Je(() => {
        u == null || u();
      });
      const f = E(() => bn(o.value.self[ce("optionHeight", e.size)])), v = E(() => Vr(o.value.self[ce("padding", e.size)])), p = E(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), d = E(() => {
        const k = i.value;
        return k && k.length === 0;
      });
      function g(k) {
        const { onToggle: W } = e;
        W && W(k);
      }
      function x(k) {
        const { onScroll: W } = e;
        W && W(k);
      }
      function h(k) {
        var W;
        (W = n.value) === null || W === void 0 || W.sync(), x(k);
      }
      function w() {
        var k;
        (k = n.value) === null || k === void 0 || k.sync();
      }
      function _() {
        const { value: k } = a;
        return k || null;
      }
      function I(k, W) {
        W.disabled || C(W, !1);
      }
      function M(k, W) {
        W.disabled || g(W);
      }
      function H(k) {
        var W;
        br(k, "action") || (W = e.onKeyup) === null || W === void 0 || W.call(e, k);
      }
      function b(k) {
        var W;
        br(k, "action") || (W = e.onKeydown) === null || W === void 0 || W.call(e, k);
      }
      function $(k) {
        var W;
        (W = e.onMousedown) === null || W === void 0 || W.call(e, k), !e.focusable && k.preventDefault();
      }
      function z() {
        const { value: k } = a;
        k && C(k.getNext({ loop: !0 }), !0);
      }
      function y() {
        const { value: k } = a;
        k && C(k.getPrev({ loop: !0 }), !0);
      }
      function C(k, W = !1) {
        a.value = k, W && P();
      }
      function P() {
        var k, W;
        const re = a.value;
        if (!re)
          return;
        const fe = l.value(re.key);
        fe !== null && (e.virtualScroll ? (k = r.value) === null || k === void 0 || k.scrollTo({ index: fe }) : (W = n.value) === null || W === void 0 || W.scrollTo({
          index: fe,
          elSize: f.value
        }));
      }
      function A(k) {
        var W, re;
        !((W = t.value) === null || W === void 0) && W.contains(k.target) && ((re = e.onFocus) === null || re === void 0 || re.call(e, k));
      }
      function O(k) {
        var W, re;
        !((W = t.value) === null || W === void 0) && W.contains(k.relatedTarget) || (re = e.onBlur) === null || re === void 0 || re.call(e, k);
      }
      to(Un, {
        handleOptionMouseEnter: I,
        handleOptionClick: M,
        valueSetRef: p,
        pendingTmNodeRef: a,
        nodePropsRef: se(e, "nodeProps"),
        showCheckmarkRef: se(e, "showCheckmark"),
        multipleRef: se(e, "multiple"),
        valueRef: se(e, "value"),
        renderLabelRef: se(e, "renderLabel"),
        renderOptionRef: se(e, "renderOption"),
        labelFieldRef: se(e, "labelField"),
        valueFieldRef: se(e, "valueField")
      }), to(la, t), Ve(() => {
        const { value: k } = n;
        k && k.sync();
      });
      const N = E(() => {
        const { size: k } = e, { common: { cubicBezierEaseInOut: W }, self: { height: re, borderRadius: fe, color: Ie, groupHeaderTextColor: ao, actionDividerColor: Pe, optionTextColorPressed: Ze, optionTextColor: Ae, optionTextColorDisabled: De, optionTextColorActive: Ce, optionOpacityDisabled: Ge, optionCheckColor: Re, actionTextColor: Fe, optionColorPending: so, optionColorActive: co, loadingColor: uo, loadingSize: Ro, optionColorActivePending: Fo, [ce("optionFontSize", k)]: zo, [ce("optionHeight", k)]: Io, [ce("optionPadding", k)]: Me } } = o.value;
        return {
          "--n-height": re,
          "--n-action-divider-color": Pe,
          "--n-action-text-color": Fe,
          "--n-bezier": W,
          "--n-border-radius": fe,
          "--n-color": Ie,
          "--n-option-font-size": zo,
          "--n-group-header-text-color": ao,
          "--n-option-check-color": Re,
          "--n-option-color-pending": so,
          "--n-option-color-active": co,
          "--n-option-color-active-pending": Fo,
          "--n-option-height": Io,
          "--n-option-opacity-disabled": Ge,
          "--n-option-text-color": Ae,
          "--n-option-text-color-active": Ce,
          "--n-option-text-color-disabled": De,
          "--n-option-text-color-pressed": Ze,
          "--n-option-padding": Me,
          "--n-option-padding-left": Vr(Me, "left"),
          "--n-option-padding-right": Vr(Me, "right"),
          "--n-loading-color": uo,
          "--n-loading-size": Ro
        };
      }), { inlineThemeDisabled: U } = e, K = U ? To("internal-select-menu", E(() => e.size[0]), N, e) : void 0, X = {
        selfRef: t,
        next: z,
        prev: y,
        getPendingTmNode: _
      };
      return Ia(t, e.onResize), Object.assign({
        mergedTheme: o,
        virtualListRef: r,
        scrollbarRef: n,
        itemSize: f,
        padding: v,
        flattenedNodes: i,
        empty: d,
        virtualListContainer() {
          const { value: k } = r;
          return k == null ? void 0 : k.listElRef;
        },
        virtualListContent() {
          const { value: k } = r;
          return k == null ? void 0 : k.itemsElRef;
        },
        doScroll: x,
        handleFocusin: A,
        handleFocusout: O,
        handleKeyUp: H,
        handleKeyDown: b,
        handleMouseDown: $,
        handleVirtualListResize: w,
        handleVirtualListScroll: h,
        cssVars: U ? void 0 : N,
        themeClass: K == null ? void 0 : K.themeClass,
        onRender: K == null ? void 0 : K.onRender
      }, X);
    },
    render() {
      const { $slots: e, virtualScroll: o, clsPrefix: t, mergedTheme: r, themeClass: n, onRender: i } = this;
      return i == null || i(), S(
        "div",
        { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [
          `${t}-base-select-menu`,
          n,
          this.multiple && `${t}-base-select-menu--multiple`
        ], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
        this.loading ? S(
          "div",
          { class: `${t}-base-select-menu__loading` },
          S(cs, { clsPrefix: t, strokeWidth: 20 })
        ) : this.empty ? S("div", { class: `${t}-base-select-menu__empty`, "data-empty": !0 }, Vn(e.empty, () => [
          S(Ob, { theme: r.peers.Empty, themeOverrides: r.peerOverrides.Empty })
        ])) : S(Ab, { ref: "scrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, scrollable: this.scrollable, container: o ? this.virtualListContainer : void 0, content: o ? this.virtualListContent : void 0, onScroll: o ? void 0 : this.doScroll }, {
          default: () => o ? S(Lu, { ref: "virtualListRef", class: `${t}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: !1, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: !0 }, {
            default: ({ item: l }) => l.isGroup ? S(Sl, { key: l.key, clsPrefix: t, tmNode: l }) : l.ignored ? null : S(yl, { clsPrefix: t, key: l.key, tmNode: l })
          }) : S("div", { class: `${t}-base-select-menu-option-wrapper`, style: {
            paddingTop: this.padding.top,
            paddingBottom: this.padding.bottom
          } }, this.flattenedNodes.map((l) => l.isGroup ? S(Sl, { key: l.key, clsPrefix: t, tmNode: l }) : S(yl, { clsPrefix: t, key: l.key, tmNode: l })))
        }),
        mt(e.action, (l) => l && [
          S("div", { class: `${t}-base-select-menu__action`, "data-action": !0, key: "action" }, l),
          S(jm, { onFocus: this.onTabOut, key: "focus-detector" })
        ])
      );
    }
  }), Ub = {
    space: "6px",
    spaceArrow: "10px",
    arrowOffset: "10px",
    arrowOffsetVertical: "10px",
    arrowHeight: "6px",
    padding: "8px 14px"
  }, ys = (e) => {
    const { boxShadow2: o, popoverColor: t, textColor2: r, borderRadius: n, fontSize: i, dividerColor: l } = e;
    return Object.assign(Object.assign({}, Ub), {
      fontSize: i,
      borderRadius: n,
      color: t,
      dividerColor: l,
      textColor: r,
      boxShadow: o
    });
  }, Gb = {
    name: "Popover",
    common: lo,
    self: ys
  }, si = Gb, Kb = {
    name: "Popover",
    common: F,
    self: ys
  }, nt = Kb, sn = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, ge = "var(--n-arrow-height) * 1.414", Xb = V([Q("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [V(">", [Q("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Ye("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Ye("scrollable", [Ye("show-header-or-footer", "padding: var(--n-padding);")])]), q("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), q("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), le("scrollable, show-header-or-footer", [q("content", `
 padding: var(--n-padding);
 `)])]), Q("popover-shared", `
 transform-origin: inherit;
 `, [
    Q("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [Q("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${ge});
 height: calc(${ge});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
    // body transition
    V("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
    V("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
    V("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
    V("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
  ]), We("top-start", `
 top: calc(${ge} / -2);
 left: calc(${vo("top-start")} - var(--v-offset-left));
 `), We("top", `
 top: calc(${ge} / -2);
 transform: translateX(calc(${ge} / -2)) rotate(45deg);
 left: 50%;
 `), We("top-end", `
 top: calc(${ge} / -2);
 right: calc(${vo("top-end")} + var(--v-offset-left));
 `), We("bottom-start", `
 bottom: calc(${ge} / -2);
 left: calc(${vo("bottom-start")} - var(--v-offset-left));
 `), We("bottom", `
 bottom: calc(${ge} / -2);
 transform: translateX(calc(${ge} / -2)) rotate(45deg);
 left: 50%;
 `), We("bottom-end", `
 bottom: calc(${ge} / -2);
 right: calc(${vo("bottom-end")} + var(--v-offset-left));
 `), We("left-start", `
 left: calc(${ge} / -2);
 top: calc(${vo("left-start")} - var(--v-offset-top));
 `), We("left", `
 left: calc(${ge} / -2);
 transform: translateY(calc(${ge} / -2)) rotate(45deg);
 top: 50%;
 `), We("left-end", `
 left: calc(${ge} / -2);
 bottom: calc(${vo("left-end")} + var(--v-offset-top));
 `), We("right-start", `
 right: calc(${ge} / -2);
 top: calc(${vo("right-start")} - var(--v-offset-top));
 `), We("right", `
 right: calc(${ge} / -2);
 transform: translateY(calc(${ge} / -2)) rotate(45deg);
 top: 50%;
 `), We("right-end", `
 right: calc(${ge} / -2);
 bottom: calc(${vo("right-end")} + var(--v-offset-top));
 `), ...Wg({
    top: ["right-start", "left-start"],
    right: ["top-end", "bottom-end"],
    bottom: ["right-end", "left-end"],
    left: ["top-start", "bottom-start"]
  }, (e, o) => {
    const t = ["right", "left"].includes(o), r = t ? "width" : "height";
    return e.map((n) => {
      const i = n.split("-")[1] === "end", a = `calc((${`var(--v-target-${r}, 0px)`} - ${ge}) / 2)`, s = vo(n);
      return V(`[v-placement="${n}"] >`, [Q("popover-shared", [le("center-arrow", [Q("popover-arrow", `${o}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${t ? "left" : "top"}));`)])])]);
    });
  })]);
  function vo(e) {
    return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
  }
  function We(e, o) {
    const t = e.split("-")[0], r = ["top", "bottom"].includes(t) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
    return V(`[v-placement="${e}"] >`, [Q("popover-shared", `
 margin-${sn[t]}: var(--n-space);
 `, [le("show-arrow", `
 margin-${sn[t]}: var(--n-space-arrow);
 `), le("overlap", `
 margin: 0;
 `), Dd("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${t}: 100%;
 ${sn[t]}: auto;
 ${r}
 `, [Q("popover-arrow", o)])])]);
  }
  const Ss = Object.assign(Object.assign({}, pe.props), {
    to: So.propTo,
    show: Boolean,
    trigger: String,
    showArrow: Boolean,
    delay: Number,
    duration: Number,
    raw: Boolean,
    arrowPointToCenter: Boolean,
    arrowStyle: [String, Object],
    displayDirective: String,
    x: Number,
    y: Number,
    flip: Boolean,
    overlap: Boolean,
    placement: String,
    width: [Number, String],
    keepAliveOnHover: Boolean,
    scrollable: Boolean,
    contentStyle: [Object, String],
    headerStyle: [Object, String],
    footerStyle: [Object, String],
    // private
    internalDeactivateImmediately: Boolean,
    animated: Boolean,
    onClickoutside: Function,
    internalTrapFocus: Boolean,
    internalOnAfterLeave: Function,
    // deprecated
    minWidth: Number,
    maxWidth: Number
  }), Yb = ({ arrowStyle: e, clsPrefix: o }) => S(
    "div",
    { key: "__popover-arrow__", class: `${o}-popover-arrow-wrapper` },
    S("div", { class: `${o}-popover-arrow`, style: e })
  ), qb = ie({
    name: "PopoverBody",
    inheritAttrs: !1,
    props: Ss,
    setup(e, { slots: o, attrs: t }) {
      const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = tt(e), l = pe("Popover", "-popover", Xb, si, e, n), a = R(null), s = he("NPopover"), c = R(null), u = R(e.show), f = R(!1);
      Co(() => {
        const { show: b } = e;
        b && !Hd() && !e.internalDeactivateImmediately && (f.value = !0);
      });
      const v = E(() => {
        const { trigger: b, onClickoutside: $ } = e, z = [], { positionManuallyRef: { value: y } } = s;
        return y || (b === "click" && !$ && z.push([
          Cr,
          I,
          void 0,
          { capture: !0 }
        ]), b === "hover" && z.push([Qd, _])), $ && z.push([
          Cr,
          I,
          void 0,
          { capture: !0 }
        ]), (e.displayDirective === "show" || e.animated && f.value) && z.push([_l, e.show]), z;
      }), p = E(() => {
        const b = e.width === "trigger" ? void 0 : hr(e.width), $ = [];
        b && $.push({ width: b });
        const { maxWidth: z, minWidth: y } = e;
        return z && $.push({ maxWidth: hr(z) }), y && $.push({ maxWidth: hr(y) }), i || $.push(d.value), $;
      }), d = E(() => {
        const { common: { cubicBezierEaseInOut: b, cubicBezierEaseIn: $, cubicBezierEaseOut: z }, self: { space: y, spaceArrow: C, padding: P, fontSize: A, textColor: O, dividerColor: N, color: U, boxShadow: K, borderRadius: X, arrowHeight: k, arrowOffset: W, arrowOffsetVertical: re } } = l.value;
        return {
          "--n-box-shadow": K,
          "--n-bezier": b,
          "--n-bezier-ease-in": $,
          "--n-bezier-ease-out": z,
          "--n-font-size": A,
          "--n-text-color": O,
          "--n-color": U,
          "--n-divider-color": N,
          "--n-border-radius": X,
          "--n-arrow-height": k,
          "--n-arrow-offset": W,
          "--n-arrow-offset-vertical": re,
          "--n-padding": P,
          "--n-space": y,
          "--n-space-arrow": C
        };
      }), g = i ? To("popover", void 0, d, e) : void 0;
      s.setBodyInstance({
        syncPosition: x
      }), Je(() => {
        s.setBodyInstance(null);
      }), xe(se(e, "show"), (b) => {
        e.animated || (b ? u.value = !0 : u.value = !1);
      });
      function x() {
        var b;
        (b = a.value) === null || b === void 0 || b.syncPosition();
      }
      function h(b) {
        e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(b);
      }
      function w(b) {
        e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(b);
      }
      function _(b) {
        e.trigger === "hover" && !M().contains(jt(b)) && s.handleMouseMoveOutside(b);
      }
      function I(b) {
        (e.trigger === "click" && !M().contains(jt(b)) || e.onClickoutside) && s.handleClickOutside(b);
      }
      function M() {
        return s.getTriggerElement();
      }
      to(ca, c), to(sa, null), to(aa, null);
      function H() {
        if (g == null || g.onRender(), !(e.displayDirective === "show" || e.show || e.animated && f.value))
          return null;
        let $;
        const z = s.internalRenderBodyRef.value, { value: y } = n;
        if (z)
          $ = z(
            // The popover class and overlap class must exists, they will be used
            // to place the body & transition animation.
            // Shadow class exists for reuse box-shadow.
            [
              `${y}-popover-shared`,
              g == null ? void 0 : g.themeClass.value,
              e.overlap && `${y}-popover-shared--overlap`,
              e.showArrow && `${y}-popover-shared--show-arrow`,
              e.arrowPointToCenter && `${y}-popover-shared--center-arrow`
            ],
            c,
            p.value,
            h,
            w
          );
        else {
          const { value: C } = s.extraClassRef, { internalTrapFocus: P } = e, A = !Ci(o.header) || !Ci(o.footer), O = () => {
            var N;
            const U = A ? S(
              oo,
              null,
              mt(o.header, (k) => k ? S("div", { class: `${y}-popover__header`, style: e.headerStyle }, k) : null),
              mt(o.default, (k) => k ? S("div", { class: `${y}-popover__content`, style: e.contentStyle }, o) : null),
              mt(o.footer, (k) => k ? S("div", { class: `${y}-popover__footer`, style: e.footerStyle }, k) : null)
            ) : e.scrollable ? (N = o.default) === null || N === void 0 ? void 0 : N.call(o) : S("div", { class: `${y}-popover__content`, style: e.contentStyle }, o), K = e.scrollable ? S(Rb, { contentClass: A ? void 0 : `${y}-popover__content`, contentStyle: A ? void 0 : e.contentStyle }, {
              default: () => U
            }) : U, X = e.showArrow ? Yb({
              arrowStyle: e.arrowStyle,
              clsPrefix: y
            }) : null;
            return [K, X];
          };
          $ = S("div", Or({
            class: [
              `${y}-popover`,
              `${y}-popover-shared`,
              g == null ? void 0 : g.themeClass.value,
              C.map((N) => `${y}-${N}`),
              {
                [`${y}-popover--scrollable`]: e.scrollable,
                [`${y}-popover--show-header-or-footer`]: A,
                [`${y}-popover--raw`]: e.raw,
                [`${y}-popover-shared--overlap`]: e.overlap,
                [`${y}-popover-shared--show-arrow`]: e.showArrow,
                [`${y}-popover-shared--center-arrow`]: e.arrowPointToCenter
              }
            ],
            ref: c,
            style: p.value,
            onKeydown: s.handleKeydown,
            onMouseenter: h,
            onMouseleave: w
          }, t), P ? S(ju, { active: e.show, autoFocus: !0 }, { default: O }) : O());
        }
        return Yt($, v.value);
      }
      return {
        displayed: f,
        namespace: r,
        isMounted: s.isMountedRef,
        zIndex: s.zIndexRef,
        followerRef: a,
        adjustedTo: So(e),
        followerEnabled: u,
        renderContentNode: H
      };
    },
    render() {
      return S(ma, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === So.tdkey }, {
        default: () => this.animated ? S(yt, {
          name: "popover-transition",
          appear: this.isMounted,
          // Don't use watch to enable follower, since the transition may
          // make position sync timing very subtle and buggy.
          onEnter: () => {
            this.followerEnabled = !0;
          },
          onAfterLeave: () => {
            var e;
            (e = this.internalOnAfterLeave) === null || e === void 0 || e.call(this), this.followerEnabled = !1, this.displayed = !1;
          }
        }, {
          default: this.renderContentNode
        }) : this.renderContentNode()
      });
    }
  }), Jb = Object.keys(Ss), Zb = {
    focus: ["onFocus", "onBlur"],
    click: ["onClick"],
    hover: ["onMouseenter", "onMouseleave"],
    manual: [],
    nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
  };
  function Qb(e, o, t) {
    Zb[o].forEach((r) => {
      e.props ? e.props = Object.assign({}, e.props) : e.props = {};
      const n = e.props[r], i = t[r];
      n ? e.props[r] = (...l) => {
        n(...l), i(...l);
      } : e.props[r] = i;
    });
  }
  const e0 = xo("").type, ws = {
    show: {
      type: Boolean,
      default: void 0
    },
    defaultShow: Boolean,
    showArrow: {
      type: Boolean,
      default: !0
    },
    trigger: {
      type: String,
      default: "hover"
    },
    delay: {
      type: Number,
      default: 100
    },
    duration: {
      type: Number,
      default: 100
    },
    raw: Boolean,
    placement: {
      type: String,
      default: "top"
    },
    x: Number,
    y: Number,
    arrowPointToCenter: Boolean,
    disabled: Boolean,
    getDisabled: Function,
    displayDirective: {
      type: String,
      default: "if"
    },
    arrowStyle: [String, Object],
    flip: {
      type: Boolean,
      default: !0
    },
    animated: {
      type: Boolean,
      default: !0
    },
    width: {
      type: [Number, String],
      default: void 0
    },
    overlap: Boolean,
    keepAliveOnHover: {
      type: Boolean,
      default: !0
    },
    zIndex: Number,
    to: So.propTo,
    scrollable: Boolean,
    contentStyle: [Object, String],
    headerStyle: [Object, String],
    footerStyle: [Object, String],
    // events
    onClickoutside: Function,
    "onUpdate:show": [Function, Array],
    onUpdateShow: [Function, Array],
    // internal
    internalDeactivateImmediately: Boolean,
    internalSyncTargetWithParent: Boolean,
    internalInheritedEventHandlers: {
      type: Array,
      default: () => []
    },
    internalTrapFocus: Boolean,
    internalExtraClass: {
      type: Array,
      default: () => []
    },
    // deprecated
    onShow: [Function, Array],
    onHide: [Function, Array],
    arrow: {
      type: Boolean,
      default: void 0
    },
    minWidth: Number,
    maxWidth: Number
  }, o0 = Object.assign(Object.assign(Object.assign({}, pe.props), ws), { internalOnAfterLeave: Function, internalRenderBody: Function }), $s = ie({
    name: "Popover",
    inheritAttrs: !1,
    props: o0,
    __popover__: !0,
    setup(e) {
      process.env.NODE_ENV !== "production" && Co(() => {
        e.maxWidth !== void 0 && _o("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && _o("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && _o("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && _o("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && _o("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
      });
      const o = Hr(), t = R(null), r = E(() => e.show), n = R(e.defaultShow), i = wn(r, n), l = qe(() => e.disabled ? !1 : i.value), a = () => {
        if (e.disabled)
          return !0;
        const { getDisabled: O } = e;
        return !!(O != null && O());
      }, s = () => a() ? !1 : i.value, c = ia(e, ["arrow", "showArrow"]), u = E(() => e.overlap ? !1 : c.value);
      let f = null;
      const v = R(null), p = R(null), d = qe(() => e.x !== void 0 && e.y !== void 0);
      function g(O) {
        const { "onUpdate:show": N, onUpdateShow: U, onShow: K, onHide: X } = e;
        n.value = O, N && Se(N, O), U && Se(U, O), O && K && Se(K, !0), O && X && Se(X, !1);
      }
      function x() {
        f && f.syncPosition();
      }
      function h() {
        const { value: O } = v;
        O && (window.clearTimeout(O), v.value = null);
      }
      function w() {
        const { value: O } = p;
        O && (window.clearTimeout(O), p.value = null);
      }
      function _() {
        const O = a();
        if (e.trigger === "focus" && !O) {
          if (s())
            return;
          g(!0);
        }
      }
      function I() {
        const O = a();
        if (e.trigger === "focus" && !O) {
          if (!s())
            return;
          g(!1);
        }
      }
      function M() {
        const O = a();
        if (e.trigger === "hover" && !O) {
          if (w(), v.value !== null || s())
            return;
          const N = () => {
            g(!0), v.value = null;
          }, { delay: U } = e;
          U === 0 ? N() : v.value = window.setTimeout(N, U);
        }
      }
      function H() {
        const O = a();
        if (e.trigger === "hover" && !O) {
          if (h(), p.value !== null || !s())
            return;
          const N = () => {
            g(!1), p.value = null;
          }, { duration: U } = e;
          U === 0 ? N() : p.value = window.setTimeout(N, U);
        }
      }
      function b() {
        H();
      }
      function $(O) {
        var N;
        s() && (e.trigger === "click" && (h(), w(), g(!1)), (N = e.onClickoutside) === null || N === void 0 || N.call(e, O));
      }
      function z() {
        if (e.trigger === "click" && !a()) {
          h(), w();
          const O = !s();
          g(O);
        }
      }
      function y(O) {
        e.internalTrapFocus && O.key === "Escape" && (h(), w(), g(!1));
      }
      function C(O) {
        n.value = O;
      }
      function P() {
        var O;
        return (O = t.value) === null || O === void 0 ? void 0 : O.targetRef;
      }
      function A(O) {
        f = O;
      }
      return to("NPopover", {
        getTriggerElement: P,
        handleKeydown: y,
        handleMouseEnter: M,
        handleMouseLeave: H,
        handleClickOutside: $,
        handleMouseMoveOutside: b,
        setBodyInstance: A,
        positionManuallyRef: d,
        isMountedRef: o,
        zIndexRef: se(e, "zIndex"),
        extraClassRef: se(e, "internalExtraClass"),
        internalRenderBodyRef: se(e, "internalRenderBody")
      }), Co(() => {
        i.value && a() && g(!1);
      }), {
        binderInstRef: t,
        positionManually: d,
        mergedShowConsideringDisabledProp: l,
        // if to show popover body
        uncontrolledShow: n,
        mergedShowArrow: u,
        getMergedShow: s,
        setShow: C,
        handleClick: z,
        handleMouseEnter: M,
        handleMouseLeave: H,
        handleFocus: _,
        handleBlur: I,
        syncPosition: x
      };
    },
    render() {
      var e;
      const { positionManually: o, $slots: t } = this;
      let r, n = !1;
      if (!o && (t.activator ? r = xi(t, "activator") : r = xi(t, "trigger"), r)) {
        r = wc(r), r = r.type === e0 ? S("span", [r]) : r;
        const i = {
          onClick: this.handleClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        };
        if (!((e = r.type) === null || e === void 0) && e.__popover__)
          n = !0, r.props || (r.props = {
            internalSyncTargetWithParent: !0,
            internalInheritedEventHandlers: []
          }), r.props.internalSyncTargetWithParent = !0, r.props.internalInheritedEventHandlers ? r.props.internalInheritedEventHandlers = [
            i,
            ...r.props.internalInheritedEventHandlers
          ] : r.props.internalInheritedEventHandlers = [i];
        else {
          const { internalInheritedEventHandlers: l } = this, a = [
            i,
            ...l
          ], s = {
            onBlur: (c) => {
              a.forEach((u) => {
                u.onBlur(c);
              });
            },
            onFocus: (c) => {
              a.forEach((u) => {
                u.onFocus(c);
              });
            },
            onClick: (c) => {
              a.forEach((u) => {
                u.onClick(c);
              });
            },
            onMouseenter: (c) => {
              a.forEach((u) => {
                u.onMouseenter(c);
              });
            },
            onMouseleave: (c) => {
              a.forEach((u) => {
                u.onMouseleave(c);
              });
            }
          };
          Qb(r, l ? "nested" : o ? "manual" : this.trigger, s);
        }
      }
      return S(ha, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
        default: () => {
          this.mergedShowConsideringDisabledProp;
          const i = this.getMergedShow();
          return [
            this.internalTrapFocus && i ? Yt(S("div", { style: { position: "fixed", inset: 0 } }), [
              [
                va,
                {
                  enabled: i,
                  zIndex: this.zIndex
                }
              ]
            ]) : null,
            o ? null : S(pa, null, {
              default: () => r
            }),
            S(qb, dd(this.$props, Jb, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
              default: () => {
                var l, a;
                return (a = (l = this.$slots).default) === null || a === void 0 ? void 0 : a.call(l);
              },
              header: () => {
                var l, a;
                return (a = (l = this.$slots).header) === null || a === void 0 ? void 0 : a.call(l);
              },
              footer: () => {
                var l, a;
                return (a = (l = this.$slots).footer) === null || a === void 0 ? void 0 : a.call(l);
              }
            })
          ];
        }
      });
    }
  }), Ps = {
    closeIconSizeTiny: "12px",
    closeIconSizeSmall: "12px",
    closeIconSizeMedium: "14px",
    closeIconSizeLarge: "14px",
    closeSizeTiny: "16px",
    closeSizeSmall: "16px",
    closeSizeMedium: "18px",
    closeSizeLarge: "18px",
    padding: "0 7px",
    closeMargin: "0 0 0 4px",
    closeMarginRtl: "0 4px 0 0"
  }, t0 = {
    name: "Tag",
    common: F,
    self(e) {
      const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, tagColor: f, opacityDisabled: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: g, closeColorHover: x, closeColorPressed: h, borderRadiusSmall: w, fontSizeMini: _, fontSizeTiny: I, fontSizeSmall: M, fontSizeMedium: H, heightMini: b, heightTiny: $, heightSmall: z, heightMedium: y, buttonColor2Hover: C, buttonColor2Pressed: P, fontWeightStrong: A } = e;
      return Object.assign(Object.assign({}, Ps), {
        closeBorderRadius: w,
        heightTiny: b,
        heightSmall: $,
        heightMedium: z,
        heightLarge: y,
        borderRadius: w,
        opacityDisabled: v,
        fontSizeTiny: _,
        fontSizeSmall: I,
        fontSizeMedium: M,
        fontSizeLarge: H,
        fontWeightStrong: A,
        // checked
        textColorCheckable: o,
        textColorHoverCheckable: o,
        textColorPressedCheckable: o,
        textColorChecked: c,
        colorCheckable: "#0000",
        colorHoverCheckable: C,
        colorPressedCheckable: P,
        colorChecked: n,
        colorCheckedHover: t,
        colorCheckedPressed: r,
        // default
        border: `1px solid ${u}`,
        textColor: o,
        color: f,
        colorBordered: "#0000",
        closeIconColor: p,
        closeIconColorHover: d,
        closeIconColorPressed: g,
        closeColorHover: x,
        closeColorPressed: h,
        borderPrimary: `1px solid ${D(n, { alpha: 0.3 })}`,
        textColorPrimary: n,
        colorPrimary: D(n, { alpha: 0.16 }),
        colorBorderedPrimary: "#0000",
        closeIconColorPrimary: ve(n, { lightness: 0.7 }),
        closeIconColorHoverPrimary: ve(n, { lightness: 0.7 }),
        closeIconColorPressedPrimary: ve(n, {
          lightness: 0.7
        }),
        closeColorHoverPrimary: D(n, { alpha: 0.16 }),
        closeColorPressedPrimary: D(n, { alpha: 0.12 }),
        borderInfo: `1px solid ${D(i, { alpha: 0.3 })}`,
        textColorInfo: i,
        colorInfo: D(i, { alpha: 0.16 }),
        colorBorderedInfo: "#0000",
        closeIconColorInfo: ve(i, { alpha: 0.7 }),
        closeIconColorHoverInfo: ve(i, { alpha: 0.7 }),
        closeIconColorPressedInfo: ve(i, { alpha: 0.7 }),
        closeColorHoverInfo: D(i, { alpha: 0.16 }),
        closeColorPressedInfo: D(i, { alpha: 0.12 }),
        borderSuccess: `1px solid ${D(l, { alpha: 0.3 })}`,
        textColorSuccess: l,
        colorSuccess: D(l, { alpha: 0.16 }),
        colorBorderedSuccess: "#0000",
        closeIconColorSuccess: ve(l, { alpha: 0.7 }),
        closeIconColorHoverSuccess: ve(l, { alpha: 0.7 }),
        closeIconColorPressedSuccess: ve(l, { alpha: 0.7 }),
        closeColorHoverSuccess: D(l, { alpha: 0.16 }),
        closeColorPressedSuccess: D(l, { alpha: 0.12 }),
        borderWarning: `1px solid ${D(a, { alpha: 0.3 })}`,
        textColorWarning: a,
        colorWarning: D(a, { alpha: 0.16 }),
        colorBorderedWarning: "#0000",
        closeIconColorWarning: ve(a, { alpha: 0.7 }),
        closeIconColorHoverWarning: ve(a, { alpha: 0.7 }),
        closeIconColorPressedWarning: ve(a, { alpha: 0.7 }),
        closeColorHoverWarning: D(a, { alpha: 0.16 }),
        closeColorPressedWarning: D(a, { alpha: 0.11 }),
        borderError: `1px solid ${D(s, { alpha: 0.3 })}`,
        textColorError: s,
        colorError: D(s, { alpha: 0.16 }),
        colorBorderedError: "#0000",
        closeIconColorError: ve(s, { alpha: 0.7 }),
        closeIconColorHoverError: ve(s, { alpha: 0.7 }),
        closeIconColorPressedError: ve(s, { alpha: 0.7 }),
        closeColorHoverError: D(s, { alpha: 0.16 }),
        closeColorPressedError: D(s, { alpha: 0.12 })
      });
    }
  }, Ts = t0, r0 = (e) => {
    const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, opacityDisabled: f, tagColor: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: g, borderRadiusSmall: x, fontSizeMini: h, fontSizeTiny: w, fontSizeSmall: _, fontSizeMedium: I, heightMini: M, heightTiny: H, heightSmall: b, heightMedium: $, closeColorHover: z, closeColorPressed: y, buttonColor2Hover: C, buttonColor2Pressed: P, fontWeightStrong: A } = e;
    return Object.assign(Object.assign({}, Ps), {
      closeBorderRadius: x,
      heightTiny: M,
      heightSmall: H,
      heightMedium: b,
      heightLarge: $,
      borderRadius: x,
      opacityDisabled: f,
      fontSizeTiny: h,
      fontSizeSmall: w,
      fontSizeMedium: _,
      fontSizeLarge: I,
      fontWeightStrong: A,
      // checked
      textColorCheckable: o,
      textColorHoverCheckable: o,
      textColorPressedCheckable: o,
      textColorChecked: c,
      colorCheckable: "#0000",
      colorHoverCheckable: C,
      colorPressedCheckable: P,
      colorChecked: n,
      colorCheckedHover: t,
      colorCheckedPressed: r,
      // default
      border: `1px solid ${u}`,
      textColor: o,
      color: v,
      colorBordered: "rgb(250, 250, 252)",
      closeIconColor: p,
      closeIconColorHover: d,
      closeIconColorPressed: g,
      closeColorHover: z,
      closeColorPressed: y,
      borderPrimary: `1px solid ${D(n, { alpha: 0.3 })}`,
      textColorPrimary: n,
      colorPrimary: D(n, { alpha: 0.12 }),
      colorBorderedPrimary: D(n, { alpha: 0.1 }),
      closeIconColorPrimary: n,
      closeIconColorHoverPrimary: n,
      closeIconColorPressedPrimary: n,
      closeColorHoverPrimary: D(n, { alpha: 0.12 }),
      closeColorPressedPrimary: D(n, { alpha: 0.18 }),
      borderInfo: `1px solid ${D(i, { alpha: 0.3 })}`,
      textColorInfo: i,
      colorInfo: D(i, { alpha: 0.12 }),
      colorBorderedInfo: D(i, { alpha: 0.1 }),
      closeIconColorInfo: i,
      closeIconColorHoverInfo: i,
      closeIconColorPressedInfo: i,
      closeColorHoverInfo: D(i, { alpha: 0.12 }),
      closeColorPressedInfo: D(i, { alpha: 0.18 }),
      borderSuccess: `1px solid ${D(l, { alpha: 0.3 })}`,
      textColorSuccess: l,
      colorSuccess: D(l, { alpha: 0.12 }),
      colorBorderedSuccess: D(l, { alpha: 0.1 }),
      closeIconColorSuccess: l,
      closeIconColorHoverSuccess: l,
      closeIconColorPressedSuccess: l,
      closeColorHoverSuccess: D(l, { alpha: 0.12 }),
      closeColorPressedSuccess: D(l, { alpha: 0.18 }),
      borderWarning: `1px solid ${D(a, { alpha: 0.35 })}`,
      textColorWarning: a,
      colorWarning: D(a, { alpha: 0.15 }),
      colorBorderedWarning: D(a, { alpha: 0.12 }),
      closeIconColorWarning: a,
      closeIconColorHoverWarning: a,
      closeIconColorPressedWarning: a,
      closeColorHoverWarning: D(a, { alpha: 0.12 }),
      closeColorPressedWarning: D(a, { alpha: 0.18 }),
      borderError: `1px solid ${D(s, { alpha: 0.23 })}`,
      textColorError: s,
      colorError: D(s, { alpha: 0.1 }),
      colorBorderedError: D(s, { alpha: 0.08 }),
      closeIconColorError: s,
      closeIconColorHoverError: s,
      closeIconColorPressedError: s,
      closeColorHoverError: D(s, { alpha: 0.12 }),
      closeColorPressedError: D(s, { alpha: 0.18 })
    });
  }, n0 = {
    name: "Tag",
    common: lo,
    self: r0
  }, i0 = n0, l0 = {
    color: Object,
    type: {
      type: String,
      default: "default"
    },
    round: Boolean,
    size: {
      type: String,
      default: "medium"
    },
    closable: Boolean,
    disabled: {
      type: Boolean,
      default: void 0
    }
  }, a0 = Q("tag", `
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`, [le("strong", `
 font-weight: var(--n-font-weight-strong);
 `), q("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), q("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), q("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), q("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), le("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [q("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), q("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), le("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), le("icon, avatar", [le("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), le("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), le("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [Ye("disabled", [V("&:hover", "background-color: var(--n-color-hover-checkable);", [Ye("checked", "color: var(--n-text-color-hover-checkable);")]), V("&:active", "background-color: var(--n-color-pressed-checkable);", [Ye("checked", "color: var(--n-text-color-pressed-checkable);")])]), le("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Ye("disabled", [V("&:hover", "background-color: var(--n-color-checked-hover);"), V("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), s0 = Object.assign(Object.assign(Object.assign({}, pe.props), l0), {
    bordered: {
      type: Boolean,
      default: void 0
    },
    checked: Boolean,
    checkable: Boolean,
    strong: Boolean,
    triggerClickOnClose: Boolean,
    onClose: [Array, Function],
    onMouseenter: Function,
    onMouseleave: Function,
    "onUpdate:checked": Function,
    onUpdateChecked: Function,
    // private
    internalCloseFocusable: {
      type: Boolean,
      default: !0
    },
    internalCloseIsButtonTag: {
      type: Boolean,
      default: !0
    },
    // deprecated
    onCheckedChange: Function
  }), c0 = "n-tag", cn = ie({
    name: "Tag",
    props: s0,
    setup(e) {
      process.env.NODE_ENV !== "production" && Co(() => {
        e.onCheckedChange !== void 0 && _o("tag", "`on-checked-change` is deprecated, please use `on-update:checked` instead");
      });
      const o = R(null), { mergedBorderedRef: t, mergedClsPrefixRef: r, inlineThemeDisabled: n, mergedRtlRef: i } = tt(e), l = pe("Tag", "-tag", a0, i0, e, r);
      to(c0, {
        roundRef: se(e, "round")
      });
      function a(p) {
        if (!e.disabled && e.checkable) {
          const { checked: d, onCheckedChange: g, onUpdateChecked: x, "onUpdate:checked": h } = e;
          x && x(!d), h && h(!d), g && g(!d);
        }
      }
      function s(p) {
        if (e.triggerClickOnClose || p.stopPropagation(), !e.disabled) {
          const { onClose: d } = e;
          d && Se(d, p);
        }
      }
      const c = {
        setTextContent(p) {
          const { value: d } = o;
          d && (d.textContent = p);
        }
      }, u = ls("Tag", i, r), f = E(() => {
        const { type: p, size: d, color: { color: g, textColor: x } = {} } = e, { common: { cubicBezierEaseInOut: h }, self: { padding: w, closeMargin: _, closeMarginRtl: I, borderRadius: M, opacityDisabled: H, textColorCheckable: b, textColorHoverCheckable: $, textColorPressedCheckable: z, textColorChecked: y, colorCheckable: C, colorHoverCheckable: P, colorPressedCheckable: A, colorChecked: O, colorCheckedHover: N, colorCheckedPressed: U, closeBorderRadius: K, fontWeightStrong: X, [ce("colorBordered", p)]: k, [ce("closeSize", d)]: W, [ce("closeIconSize", d)]: re, [ce("fontSize", d)]: fe, [ce("height", d)]: Ie, [ce("color", p)]: ao, [ce("textColor", p)]: Pe, [ce("border", p)]: Ze, [ce("closeIconColor", p)]: Ae, [ce("closeIconColorHover", p)]: De, [ce("closeIconColorPressed", p)]: Ce, [ce("closeColorHover", p)]: Ge, [ce("closeColorPressed", p)]: Re } } = l.value;
        return {
          "--n-font-weight-strong": X,
          "--n-avatar-size-override": `calc(${Ie} - 8px)`,
          "--n-bezier": h,
          "--n-border-radius": M,
          "--n-border": Ze,
          "--n-close-icon-size": re,
          "--n-close-color-pressed": Re,
          "--n-close-color-hover": Ge,
          "--n-close-border-radius": K,
          "--n-close-icon-color": Ae,
          "--n-close-icon-color-hover": De,
          "--n-close-icon-color-pressed": Ce,
          "--n-close-icon-color-disabled": Ae,
          "--n-close-margin": _,
          "--n-close-margin-rtl": I,
          "--n-close-size": W,
          "--n-color": g || (t.value ? k : ao),
          "--n-color-checkable": C,
          "--n-color-checked": O,
          "--n-color-checked-hover": N,
          "--n-color-checked-pressed": U,
          "--n-color-hover-checkable": P,
          "--n-color-pressed-checkable": A,
          "--n-font-size": fe,
          "--n-height": Ie,
          "--n-opacity-disabled": H,
          "--n-padding": w,
          "--n-text-color": x || Pe,
          "--n-text-color-checkable": b,
          "--n-text-color-checked": y,
          "--n-text-color-hover-checkable": $,
          "--n-text-color-pressed-checkable": z
        };
      }), v = n ? To("tag", E(() => {
        let p = "";
        const { type: d, size: g, color: { color: x, textColor: h } = {} } = e;
        return p += d[0], p += g[0], x && (p += `a${Si(x)}`), h && (p += `b${Si(h)}`), t.value && (p += "c"), p;
      }), f, e) : void 0;
      return Object.assign(Object.assign({}, c), {
        rtlEnabled: u,
        mergedClsPrefix: r,
        contentRef: o,
        mergedBordered: t,
        handleClick: a,
        handleCloseClick: s,
        cssVars: n ? void 0 : f,
        themeClass: v == null ? void 0 : v.themeClass,
        onRender: v == null ? void 0 : v.onRender
      });
    },
    render() {
      var e, o;
      const { mergedClsPrefix: t, rtlEnabled: r, closable: n, color: { borderColor: i } = {}, round: l, onRender: a, $slots: s } = this;
      a == null || a();
      const c = mt(s.avatar, (f) => f && S("div", { class: `${t}-tag__avatar` }, f)), u = mt(s.icon, (f) => f && S("div", { class: `${t}-tag__icon` }, f));
      return S(
        "div",
        { class: [
          `${t}-tag`,
          this.themeClass,
          {
            [`${t}-tag--rtl`]: r,
            [`${t}-tag--strong`]: this.strong,
            [`${t}-tag--disabled`]: this.disabled,
            [`${t}-tag--checkable`]: this.checkable,
            [`${t}-tag--checked`]: this.checkable && this.checked,
            [`${t}-tag--round`]: l,
            [`${t}-tag--avatar`]: c,
            [`${t}-tag--icon`]: u,
            [`${t}-tag--closable`]: n
          }
        ], style: this.cssVars, onClick: this.handleClick, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
        u || c,
        S("span", { class: `${t}-tag__content`, ref: "contentRef" }, (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e)),
        !this.checkable && n ? S(Nm, { clsPrefix: t, class: `${t}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: l, isButtonTag: this.internalCloseIsButtonTag, absolute: !0 }) : null,
        !this.checkable && this.mergedBordered ? S("div", { class: `${t}-tag__border`, style: { borderColor: i } }) : null
      );
    }
  }), d0 = Q("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [V(">", [q("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [V("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), V("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), q("placeholder", `
 display: flex;
 `), q("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [Hn({
    originalTransform: "translateX(-50%) translateY(-50%)",
    left: "50%",
    top: "50%"
  })])])]), u0 = ie({
    name: "BaseClear",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      show: Boolean,
      onClear: Function
    },
    setup(e) {
      return Fr("-base-clear", d0, se(e, "clsPrefix")), {
        handleMouseDown(o) {
          o.preventDefault();
        }
      };
    },
    render() {
      const { clsPrefix: e } = this;
      return S(
        "div",
        { class: `${e}-base-clear` },
        S(ss, null, {
          default: () => {
            var o, t;
            return this.show ? S("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Vn(this.$slots.icon, () => [
              S(Jt, { clsPrefix: e }, {
                default: () => S(Fm, null)
              })
            ])) : S("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (t = (o = this.$slots).placeholder) === null || t === void 0 ? void 0 : t.call(o));
          }
        })
      );
    }
  }), f0 = ie({
    name: "InternalSelectionSuffix",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      showArrow: {
        type: Boolean,
        default: void 0
      },
      showClear: {
        type: Boolean,
        default: void 0
      },
      loading: {
        type: Boolean,
        default: !1
      },
      onClear: Function
    },
    setup(e, { slots: o }) {
      return () => {
        const { clsPrefix: t } = e;
        return S(cs, { clsPrefix: t, class: `${t}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
          default: () => e.showArrow ? S(u0, { clsPrefix: t, show: e.showClear, onClear: e.onClear }, {
            placeholder: () => S(Jt, { clsPrefix: t, class: `${t}-base-suffix__arrow` }, {
              default: () => Vn(o.default, () => [
                S(Rm, null)
              ])
            })
          }) : null
        });
      };
    }
  }), zs = {
    paddingSingle: "0 26px 0 12px",
    paddingMultiple: "3px 26px 0 12px",
    clearSize: "16px",
    arrowSize: "16px"
  }, h0 = (e) => {
    const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderColor: v, iconColor: p, iconColorDisabled: d, clearColor: g, clearColorHover: x, clearColorPressed: h, placeholderColor: w, placeholderColorDisabled: _, fontSizeTiny: I, fontSizeSmall: M, fontSizeMedium: H, fontSizeLarge: b, heightTiny: $, heightSmall: z, heightMedium: y, heightLarge: C } = e;
    return Object.assign(Object.assign({}, zs), {
      fontSizeTiny: I,
      fontSizeSmall: M,
      fontSizeMedium: H,
      fontSizeLarge: b,
      heightTiny: $,
      heightSmall: z,
      heightMedium: y,
      heightLarge: C,
      borderRadius: o,
      // default
      textColor: t,
      textColorDisabled: r,
      placeholderColor: w,
      placeholderColorDisabled: _,
      color: n,
      colorDisabled: i,
      colorActive: n,
      border: `1px solid ${v}`,
      borderHover: `1px solid ${a}`,
      borderActive: `1px solid ${l}`,
      borderFocus: `1px solid ${a}`,
      boxShadowHover: "none",
      boxShadowActive: `0 0 0 2px ${D(l, {
        alpha: 0.2
      })}`,
      boxShadowFocus: `0 0 0 2px ${D(l, {
        alpha: 0.2
      })}`,
      caretColor: l,
      arrowColor: p,
      arrowColorDisabled: d,
      loadingColor: l,
      // warning
      borderWarning: `1px solid ${s}`,
      borderHoverWarning: `1px solid ${c}`,
      borderActiveWarning: `1px solid ${s}`,
      borderFocusWarning: `1px solid ${c}`,
      boxShadowHoverWarning: "none",
      boxShadowActiveWarning: `0 0 0 2px ${D(s, {
        alpha: 0.2
      })}`,
      boxShadowFocusWarning: `0 0 0 2px ${D(s, {
        alpha: 0.2
      })}`,
      colorActiveWarning: n,
      caretColorWarning: s,
      // error
      borderError: `1px solid ${u}`,
      borderHoverError: `1px solid ${f}`,
      borderActiveError: `1px solid ${u}`,
      borderFocusError: `1px solid ${f}`,
      boxShadowHoverError: "none",
      boxShadowActiveError: `0 0 0 2px ${D(u, {
        alpha: 0.2
      })}`,
      boxShadowFocusError: `0 0 0 2px ${D(u, {
        alpha: 0.2
      })}`,
      colorActiveError: n,
      caretColorError: u,
      clearColor: g,
      clearColorHover: x,
      clearColorPressed: h
    });
  }, p0 = {
    name: "InternalSelection",
    common: lo,
    peers: {
      Popover: si
    },
    self: h0
  }, Is = p0, v0 = {
    name: "InternalSelection",
    common: F,
    peers: {
      Popover: nt
    },
    self(e) {
      const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, iconColor: v, iconColorDisabled: p, clearColor: d, clearColorHover: g, clearColorPressed: x, placeholderColor: h, placeholderColorDisabled: w, fontSizeTiny: _, fontSizeSmall: I, fontSizeMedium: M, fontSizeLarge: H, heightTiny: b, heightSmall: $, heightMedium: z, heightLarge: y } = e;
      return Object.assign(Object.assign({}, zs), {
        fontSizeTiny: _,
        fontSizeSmall: I,
        fontSizeMedium: M,
        fontSizeLarge: H,
        heightTiny: b,
        heightSmall: $,
        heightMedium: z,
        heightLarge: y,
        borderRadius: o,
        // default
        textColor: t,
        textColorDisabled: r,
        placeholderColor: h,
        placeholderColorDisabled: w,
        color: n,
        colorDisabled: i,
        colorActive: D(l, { alpha: 0.1 }),
        border: "1px solid #0000",
        borderHover: `1px solid ${a}`,
        borderActive: `1px solid ${l}`,
        borderFocus: `1px solid ${a}`,
        boxShadowHover: "none",
        boxShadowActive: `0 0 8px 0 ${D(l, {
          alpha: 0.4
        })}`,
        boxShadowFocus: `0 0 8px 0 ${D(l, {
          alpha: 0.4
        })}`,
        caretColor: l,
        arrowColor: v,
        arrowColorDisabled: p,
        loadingColor: l,
        // warning
        borderWarning: `1px solid ${s}`,
        borderHoverWarning: `1px solid ${c}`,
        borderActiveWarning: `1px solid ${s}`,
        borderFocusWarning: `1px solid ${c}`,
        boxShadowHoverWarning: "none",
        boxShadowActiveWarning: `0 0 8px 0 ${D(s, {
          alpha: 0.4
        })}`,
        boxShadowFocusWarning: `0 0 8px 0 ${D(s, {
          alpha: 0.4
        })}`,
        colorActiveWarning: D(s, { alpha: 0.1 }),
        caretColorWarning: s,
        // error
        borderError: `1px solid ${u}`,
        borderHoverError: `1px solid ${f}`,
        borderActiveError: `1px solid ${u}`,
        borderFocusError: `1px solid ${f}`,
        boxShadowHoverError: "none",
        boxShadowActiveError: `0 0 8px 0 ${D(u, {
          alpha: 0.4
        })}`,
        boxShadowFocusError: `0 0 8px 0 ${D(u, {
          alpha: 0.4
        })}`,
        colorActiveError: D(u, { alpha: 0.1 }),
        caretColorError: u,
        clearColor: d,
        clearColorHover: g,
        clearColorPressed: x
      });
    }
  }, ci = v0, g0 = V([Q("base-selection", `
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [Q("base-loading", `
 color: var(--n-loading-color);
 `), Q("base-selection-tags", "min-height: var(--n-height);"), q("border, state-border", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), q("state-border", `
 z-index: 1;
 border-color: #0000;
 `), Q("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [q("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), Q("base-selection-overlay", `
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `, [q("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), Q("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [q("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), Q("base-selection-tags", `
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), Q("base-selection-label", `
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `, [Q("base-selection-input", `
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `, [q("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), q("render-label", `
 color: var(--n-text-color);
 `)]), Ye("disabled", [V("&:hover", [q("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), le("focus", [q("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), le("active", [q("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), Q("base-selection-label", "background-color: var(--n-color-active);"), Q("base-selection-tags", "background-color: var(--n-color-active);")])]), le("disabled", "cursor: not-allowed;", [q("arrow", `
 color: var(--n-arrow-color-disabled);
 `), Q("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [Q("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), q("render-label", `
 color: var(--n-text-color-disabled);
 `)]), Q("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), Q("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), Q("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [q("input", `
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `), q("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => le(`${e}-status`, [q("state-border", `border: var(--n-border-${e});`), Ye("disabled", [V("&:hover", [q("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), le("active", [q("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), Q("base-selection-label", `background-color: var(--n-color-active-${e});`), Q("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), le("focus", [q("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), Q("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), Q("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [V("&:last-child", "padding-right: 0;"), Q("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [q("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), m0 = ie({
    name: "InternalSelection",
    props: Object.assign(Object.assign({}, pe.props), { clsPrefix: {
      type: String,
      required: !0
    }, bordered: {
      type: Boolean,
      default: void 0
    }, active: Boolean, pattern: {
      type: String,
      default: ""
    }, placeholder: String, selectedOption: {
      type: Object,
      default: null
    }, selectedOptions: {
      type: Array,
      default: null
    }, labelField: { type: String, default: "label" }, valueField: {
      type: String,
      default: "value"
    }, multiple: Boolean, filterable: Boolean, clearable: Boolean, disabled: Boolean, size: {
      type: String,
      default: "medium"
    }, loading: Boolean, autofocus: Boolean, showArrow: {
      type: Boolean,
      default: !0
    }, inputProps: Object, focused: Boolean, renderTag: Function, onKeydown: Function, onClick: Function, onBlur: Function, onFocus: Function, onDeleteOption: Function, maxTagCount: [String, Number], onClear: Function, onPatternInput: Function, onPatternFocus: Function, onPatternBlur: Function, renderLabel: Function, status: String, inlineThemeDisabled: Boolean, ignoreComposition: { type: Boolean, default: !0 }, onResize: Function }),
    setup(e) {
      const o = R(null), t = R(null), r = R(null), n = R(null), i = R(null), l = R(null), a = R(null), s = R(null), c = R(null), u = R(null), f = R(!1), v = R(!1), p = R(!1), d = pe("InternalSelection", "-internal-selection", g0, Is, e, se(e, "clsPrefix")), g = E(() => e.clearable && !e.disabled && (p.value || e.active)), x = E(() => e.selectedOption ? e.renderTag ? e.renderTag({
        option: e.selectedOption,
        handleClose: () => {
        }
      }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : gt(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), h = E(() => {
        const L = e.selectedOption;
        if (L)
          return L[e.labelField];
      }), w = E(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
      function _() {
        var L;
        const { value: G } = o;
        if (G) {
          const { value: de } = t;
          de && (de.style.width = `${G.offsetWidth}px`, e.maxTagCount !== "responsive" && ((L = c.value) === null || L === void 0 || L.sync()));
        }
      }
      function I() {
        const { value: L } = u;
        L && (L.style.display = "none");
      }
      function M() {
        const { value: L } = u;
        L && (L.style.display = "inline-block");
      }
      xe(se(e, "active"), (L) => {
        L || I();
      }), xe(se(e, "pattern"), () => {
        e.multiple && Ct(_);
      });
      function H(L) {
        const { onFocus: G } = e;
        G && G(L);
      }
      function b(L) {
        const { onBlur: G } = e;
        G && G(L);
      }
      function $(L) {
        const { onDeleteOption: G } = e;
        G && G(L);
      }
      function z(L) {
        const { onClear: G } = e;
        G && G(L);
      }
      function y(L) {
        const { onPatternInput: G } = e;
        G && G(L);
      }
      function C(L) {
        var G;
        (!L.relatedTarget || !(!((G = r.value) === null || G === void 0) && G.contains(L.relatedTarget))) && H(L);
      }
      function P(L) {
        var G;
        !((G = r.value) === null || G === void 0) && G.contains(L.relatedTarget) || b(L);
      }
      function A(L) {
        z(L);
      }
      function O() {
        p.value = !0;
      }
      function N() {
        p.value = !1;
      }
      function U(L) {
        !e.active || !e.filterable || L.target !== t.value && L.preventDefault();
      }
      function K(L) {
        $(L);
      }
      function X(L) {
        if (L.key === "Backspace" && !k.value && !e.pattern.length) {
          const { selectedOptions: G } = e;
          G != null && G.length && K(G[G.length - 1]);
        }
      }
      const k = R(!1);
      let W = null;
      function re(L) {
        const { value: G } = o;
        if (G) {
          const de = L.target.value;
          G.textContent = de, _();
        }
        e.ignoreComposition && k.value ? W = L : y(L);
      }
      function fe() {
        k.value = !0;
      }
      function Ie() {
        k.value = !1, e.ignoreComposition && y(W), W = null;
      }
      function ao(L) {
        var G;
        v.value = !0, (G = e.onPatternFocus) === null || G === void 0 || G.call(e, L);
      }
      function Pe(L) {
        var G;
        v.value = !1, (G = e.onPatternBlur) === null || G === void 0 || G.call(e, L);
      }
      function Ze() {
        var L, G;
        if (e.filterable)
          v.value = !1, (L = l.value) === null || L === void 0 || L.blur(), (G = t.value) === null || G === void 0 || G.blur();
        else if (e.multiple) {
          const { value: de } = n;
          de == null || de.blur();
        } else {
          const { value: de } = i;
          de == null || de.blur();
        }
      }
      function Ae() {
        var L, G, de;
        e.filterable ? (v.value = !1, (L = l.value) === null || L === void 0 || L.focus()) : e.multiple ? (G = n.value) === null || G === void 0 || G.focus() : (de = i.value) === null || de === void 0 || de.focus();
      }
      function De() {
        const { value: L } = t;
        L && (M(), L.focus());
      }
      function Ce() {
        const { value: L } = t;
        L && L.blur();
      }
      function Ge(L) {
        const { value: G } = a;
        G && G.setTextContent(`+${L}`);
      }
      function Re() {
        const { value: L } = s;
        return L;
      }
      function Fe() {
        return t.value;
      }
      let so = null;
      function co() {
        so !== null && window.clearTimeout(so);
      }
      function uo() {
        e.disabled || e.active || (co(), so = window.setTimeout(() => {
          w.value && (f.value = !0);
        }, 100));
      }
      function Ro() {
        co();
      }
      function Fo(L) {
        L || (co(), f.value = !1);
      }
      xe(w, (L) => {
        L || (f.value = !1);
      }), Ve(() => {
        Co(() => {
          const L = l.value;
          L && (L.tabIndex = e.disabled || v.value ? -1 : 0);
        });
      }), Ia(r, e.onResize);
      const { inlineThemeDisabled: zo } = e, Io = E(() => {
        const { size: L } = e, { common: { cubicBezierEaseInOut: G }, self: {
          borderRadius: de,
          color: Le,
          placeholderColor: it,
          textColor: It,
          paddingSingle: lt,
          paddingMultiple: at,
          caretColor: st,
          colorDisabled: Mo,
          textColorDisabled: ko,
          placeholderColorDisabled: Mt,
          colorActive: ct,
          boxShadowFocus: Ke,
          boxShadowActive: fo,
          boxShadowHover: m,
          border: T,
          borderFocus: B,
          borderHover: Y,
          borderActive: J,
          arrowColor: oe,
          arrowColorDisabled: te,
          loadingColor: ne,
          // form warning
          colorActiveWarning: ke,
          boxShadowFocusWarning: ho,
          boxShadowActiveWarning: Ys,
          boxShadowHoverWarning: qs,
          borderWarning: Js,
          borderFocusWarning: Zs,
          borderHoverWarning: Qs,
          borderActiveWarning: ec,
          // form error
          colorActiveError: oc,
          boxShadowFocusError: tc,
          boxShadowActiveError: rc,
          boxShadowHoverError: nc,
          borderError: ic,
          borderFocusError: lc,
          borderHoverError: ac,
          borderActiveError: sc,
          // clear
          clearColor: cc,
          clearColorHover: dc,
          clearColorPressed: uc,
          clearSize: fc,
          // arrow
          arrowSize: hc,
          [ce("height", L)]: pc,
          [ce("fontSize", L)]: vc
        } } = d.value;
        return {
          "--n-bezier": G,
          "--n-border": T,
          "--n-border-active": J,
          "--n-border-focus": B,
          "--n-border-hover": Y,
          "--n-border-radius": de,
          "--n-box-shadow-active": fo,
          "--n-box-shadow-focus": Ke,
          "--n-box-shadow-hover": m,
          "--n-caret-color": st,
          "--n-color": Le,
          "--n-color-active": ct,
          "--n-color-disabled": Mo,
          "--n-font-size": vc,
          "--n-height": pc,
          "--n-padding-single": lt,
          "--n-padding-multiple": at,
          "--n-placeholder-color": it,
          "--n-placeholder-color-disabled": Mt,
          "--n-text-color": It,
          "--n-text-color-disabled": ko,
          "--n-arrow-color": oe,
          "--n-arrow-color-disabled": te,
          "--n-loading-color": ne,
          // form warning
          "--n-color-active-warning": ke,
          "--n-box-shadow-focus-warning": ho,
          "--n-box-shadow-active-warning": Ys,
          "--n-box-shadow-hover-warning": qs,
          "--n-border-warning": Js,
          "--n-border-focus-warning": Zs,
          "--n-border-hover-warning": Qs,
          "--n-border-active-warning": ec,
          // form error
          "--n-color-active-error": oc,
          "--n-box-shadow-focus-error": tc,
          "--n-box-shadow-active-error": rc,
          "--n-box-shadow-hover-error": nc,
          "--n-border-error": ic,
          "--n-border-focus-error": lc,
          "--n-border-hover-error": ac,
          "--n-border-active-error": sc,
          // clear
          "--n-clear-size": fc,
          "--n-clear-color": cc,
          "--n-clear-color-hover": dc,
          "--n-clear-color-pressed": uc,
          // arrow-size
          "--n-arrow-size": hc
        };
      }), Me = zo ? To("internal-selection", E(() => e.size[0]), Io, e) : void 0;
      return {
        mergedTheme: d,
        mergedClearable: g,
        patternInputFocused: v,
        filterablePlaceholder: x,
        label: h,
        selected: w,
        showTagsPanel: f,
        isComposing: k,
        // dom ref
        counterRef: a,
        counterWrapperRef: s,
        patternInputMirrorRef: o,
        patternInputRef: t,
        selfRef: r,
        multipleElRef: n,
        singleElRef: i,
        patternInputWrapperRef: l,
        overflowRef: c,
        inputTagElRef: u,
        handleMouseDown: U,
        handleFocusin: C,
        handleClear: A,
        handleMouseEnter: O,
        handleMouseLeave: N,
        handleDeleteOption: K,
        handlePatternKeyDown: X,
        handlePatternInputInput: re,
        handlePatternInputBlur: Pe,
        handlePatternInputFocus: ao,
        handleMouseEnterCounter: uo,
        handleMouseLeaveCounter: Ro,
        handleFocusout: P,
        handleCompositionEnd: Ie,
        handleCompositionStart: fe,
        onPopoverUpdateShow: Fo,
        focus: Ae,
        focusInput: De,
        blur: Ze,
        blurInput: Ce,
        updateCounter: Ge,
        getCounter: Re,
        getTail: Fe,
        renderLabel: e.renderLabel,
        cssVars: zo ? void 0 : Io,
        themeClass: Me == null ? void 0 : Me.themeClass,
        onRender: Me == null ? void 0 : Me.onRender
      };
    },
    render() {
      const { status: e, multiple: o, size: t, disabled: r, filterable: n, maxTagCount: i, bordered: l, clsPrefix: a, onRender: s, renderTag: c, renderLabel: u } = this;
      s == null || s();
      const f = i === "responsive", v = typeof i == "number", p = f || v, d = S(yn, null, {
        default: () => S(f0, { clsPrefix: a, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
          default: () => {
            var x, h;
            return (h = (x = this.$slots).arrow) === null || h === void 0 ? void 0 : h.call(x);
          }
        })
      });
      let g;
      if (o) {
        const { labelField: x } = this, h = (P) => S("div", { class: `${a}-base-selection-tag-wrapper`, key: P.value }, c ? c({
          option: P,
          handleClose: () => this.handleDeleteOption(P)
        }) : S(cn, { size: t, closable: !P.disabled, disabled: r, onClose: () => this.handleDeleteOption(P), internalCloseIsButtonTag: !1, internalCloseFocusable: !1 }, {
          default: () => u ? u(P, !0) : gt(P[x], P, !0)
        })), w = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(h), _ = n ? S(
          "div",
          { class: `${a}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
          S("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: r, value: this.pattern, autofocus: this.autofocus, class: `${a}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          S("span", { ref: "patternInputMirrorRef", class: `${a}-base-selection-input-tag__mirror` }, this.pattern)
        ) : null, I = f ? () => S(
          "div",
          { class: `${a}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
          S(cn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: r })
        ) : void 0;
        let M;
        if (v) {
          const P = this.selectedOptions.length - i;
          P > 0 && (M = S(
            "div",
            { class: `${a}-base-selection-tag-wrapper`, key: "__counter__" },
            S(cn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: r }, {
              default: () => `+${P}`
            })
          ));
        }
        const H = f ? n ? S(ji, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: w,
          counter: I,
          tail: () => _
        }) : S(ji, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: w,
          counter: I
        }) : v ? w().concat(M) : w(), b = p ? () => S("div", { class: `${a}-base-selection-popover` }, f ? w() : this.selectedOptions.map(h)) : void 0, $ = p ? {
          show: this.showTagsPanel,
          trigger: "hover",
          overlap: !0,
          placement: "top",
          width: "trigger",
          onUpdateShow: this.onPopoverUpdateShow,
          theme: this.mergedTheme.peers.Popover,
          themeOverrides: this.mergedTheme.peerOverrides.Popover
        } : null, y = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? S(
          "div",
          { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay` },
          S("div", { class: `${a}-base-selection-placeholder__inner` }, this.placeholder)
        ) : null, C = n ? S(
          "div",
          { ref: "patternInputWrapperRef", class: `${a}-base-selection-tags` },
          H,
          f ? null : _,
          d
        ) : S(
          "div",
          { ref: "multipleElRef", class: `${a}-base-selection-tags`, tabindex: r ? void 0 : 0 },
          H,
          d
        );
        g = S(
          oo,
          null,
          p ? S($s, Object.assign({}, $, { scrollable: !0, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
            trigger: () => C,
            default: b
          }) : C,
          y
        );
      } else if (n) {
        const x = this.pattern || this.isComposing, h = this.active ? !x : !this.selected, w = this.active ? !1 : this.selected;
        g = S(
          "div",
          { ref: "patternInputWrapperRef", class: `${a}-base-selection-label` },
          S("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${a}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: r, disabled: r, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          w ? S(
            "div",
            { class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`, key: "input" },
            S("div", { class: `${a}-base-selection-overlay__wrapper` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : gt(this.label, this.selectedOption, !0))
          ) : null,
          h ? S(
            "div",
            { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`, key: "placeholder" },
            S("div", { class: `${a}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)
          ) : null,
          d
        );
      } else
        g = S(
          "div",
          { ref: "singleElRef", class: `${a}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 },
          this.label !== void 0 ? S(
            "div",
            { class: `${a}-base-selection-input`, title: ud(this.label), key: "input" },
            S("div", { class: `${a}-base-selection-input__content` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : gt(this.label, this.selectedOption, !0))
          ) : S(
            "div",
            { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`, key: "placeholder" },
            S("div", { class: `${a}-base-selection-placeholder__inner` }, this.placeholder)
          ),
          d
        );
      return S(
        "div",
        { ref: "selfRef", class: [
          `${a}-base-selection`,
          this.themeClass,
          e && `${a}-base-selection--${e}-status`,
          {
            [`${a}-base-selection--active`]: this.active,
            [`${a}-base-selection--selected`]: this.selected || this.active && this.pattern,
            [`${a}-base-selection--disabled`]: this.disabled,
            [`${a}-base-selection--multiple`]: this.multiple,
            // focus is not controlled by selection itself since it always need
            // to be managed together with menu. provide :focus style will cause
            // many redundant codes.
            [`${a}-base-selection--focus`]: this.focused
          }
        ], style: this.cssVars, onClick: this.onClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onKeydown: this.onKeydown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onMousedown: this.handleMouseDown },
        g,
        l ? S("div", { class: `${a}-base-selection__border` }) : null,
        l ? S("div", { class: `${a}-base-selection__state-border` }) : null
      );
    }
  }), b0 = {
    iconMargin: "11px 8px 0 12px",
    iconMarginRtl: "11px 12px 0 8px",
    iconSize: "24px",
    closeIconSize: "16px",
    closeSize: "20px",
    closeMargin: "13px 14px 0 0",
    closeMarginRtl: "13px 0 0 14px",
    padding: "13px"
  }, x0 = {
    name: "Alert",
    common: F,
    self(e) {
      const { lineHeight: o, borderRadius: t, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: l, textColor2: a, closeColorHover: s, closeColorPressed: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, infoColorSuppl: p, successColorSuppl: d, warningColorSuppl: g, errorColorSuppl: x, fontSize: h } = e;
      return Object.assign(Object.assign({}, b0), {
        fontSize: h,
        lineHeight: o,
        titleFontWeight: r,
        borderRadius: t,
        border: `1px solid ${n}`,
        color: i,
        titleTextColor: l,
        iconColor: a,
        contentTextColor: a,
        closeBorderRadius: t,
        closeColorHover: s,
        closeColorPressed: c,
        closeIconColor: u,
        closeIconColorHover: f,
        closeIconColorPressed: v,
        borderInfo: `1px solid ${D(p, { alpha: 0.35 })}`,
        colorInfo: D(p, { alpha: 0.25 }),
        titleTextColorInfo: l,
        iconColorInfo: p,
        contentTextColorInfo: a,
        closeColorHoverInfo: s,
        closeColorPressedInfo: c,
        closeIconColorInfo: u,
        closeIconColorHoverInfo: f,
        closeIconColorPressedInfo: v,
        borderSuccess: `1px solid ${D(d, {
          alpha: 0.35
        })}`,
        colorSuccess: D(d, { alpha: 0.25 }),
        titleTextColorSuccess: l,
        iconColorSuccess: d,
        contentTextColorSuccess: a,
        closeColorHoverSuccess: s,
        closeColorPressedSuccess: c,
        closeIconColorSuccess: u,
        closeIconColorHoverSuccess: f,
        closeIconColorPressedSuccess: v,
        borderWarning: `1px solid ${D(g, {
          alpha: 0.35
        })}`,
        colorWarning: D(g, { alpha: 0.25 }),
        titleTextColorWarning: l,
        iconColorWarning: g,
        contentTextColorWarning: a,
        closeColorHoverWarning: s,
        closeColorPressedWarning: c,
        closeIconColorWarning: u,
        closeIconColorHoverWarning: f,
        closeIconColorPressedWarning: v,
        borderError: `1px solid ${D(x, { alpha: 0.35 })}`,
        colorError: D(x, { alpha: 0.25 }),
        titleTextColorError: l,
        iconColorError: x,
        contentTextColorError: a,
        closeColorHoverError: s,
        closeColorPressedError: c,
        closeIconColorError: u,
        closeIconColorHoverError: f,
        closeIconColorPressedError: v
      });
    }
  }, C0 = x0, y0 = {
    linkFontSize: "13px",
    linkPadding: "0 0 0 16px",
    railWidth: "4px"
  }, S0 = (e) => {
    const { borderRadius: o, railColor: t, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: l } = e;
    return Object.assign(Object.assign({}, y0), {
      borderRadius: o,
      railColor: t,
      railColorActive: r,
      linkColor: D(r, { alpha: 0.15 }),
      linkTextColor: l,
      linkTextColorHover: n,
      linkTextColorPressed: i,
      linkTextColorActive: r
    });
  }, w0 = {
    name: "Anchor",
    common: F,
    self: S0
  }, $0 = w0;
  function Mr(e) {
    return e.type === "group";
  }
  function Ms(e) {
    return e.type === "ignored";
  }
  function dn(e, o) {
    try {
      return !!(1 + o.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
    } catch {
      return !1;
    }
  }
  function P0(e, o) {
    return {
      getIsGroup: Mr,
      getIgnored: Ms,
      getKey(r) {
        return Mr(r) ? r.name || r.key || "key-required" : r[e];
      },
      getChildren(r) {
        return r[o];
      }
    };
  }
  function T0(e, o, t, r) {
    if (!o)
      return e;
    function n(i) {
      if (!Array.isArray(i))
        return [];
      const l = [];
      for (const a of i)
        if (Mr(a)) {
          const s = n(a[r]);
          s.length && l.push(Object.assign({}, a, {
            [r]: s
          }));
        } else {
          if (Ms(a))
            continue;
          o(t, a) && l.push(a);
        }
      return l;
    }
    return n(e);
  }
  function z0(e, o, t) {
    const r = /* @__PURE__ */ new Map();
    return e.forEach((n) => {
      Mr(n) ? n[t].forEach((i) => {
        r.set(i[o], i);
      }) : r.set(n[o], n);
    }), r;
  }
  const I0 = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  }, M0 = {
    name: "Input",
    common: F,
    self(e) {
      const { textColor2: o, textColor3: t, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderRadius: v, lineHeight: p, fontSizeTiny: d, fontSizeSmall: g, fontSizeMedium: x, fontSizeLarge: h, heightTiny: w, heightSmall: _, heightMedium: I, heightLarge: M, clearColor: H, clearColorHover: b, clearColorPressed: $, placeholderColor: z, placeholderColorDisabled: y, iconColor: C, iconColorDisabled: P, iconColorHover: A, iconColorPressed: O } = e;
      return Object.assign(Object.assign({}, I0), {
        countTextColorDisabled: r,
        countTextColor: t,
        heightTiny: w,
        heightSmall: _,
        heightMedium: I,
        heightLarge: M,
        fontSizeTiny: d,
        fontSizeSmall: g,
        fontSizeMedium: x,
        fontSizeLarge: h,
        lineHeight: p,
        lineHeightTextarea: p,
        borderRadius: v,
        iconSize: "16px",
        groupLabelColor: l,
        textColor: o,
        textColorDisabled: r,
        textDecorationColor: o,
        groupLabelTextColor: o,
        caretColor: n,
        placeholderColor: z,
        placeholderColorDisabled: y,
        color: l,
        colorDisabled: a,
        colorFocus: D(n, { alpha: 0.1 }),
        groupLabelBorder: "1px solid #0000",
        border: "1px solid #0000",
        borderHover: `1px solid ${i}`,
        borderDisabled: "1px solid #0000",
        borderFocus: `1px solid ${i}`,
        boxShadowFocus: `0 0 8px 0 ${D(n, { alpha: 0.3 })}`,
        loadingColor: n,
        // warning
        loadingColorWarning: s,
        borderWarning: `1px solid ${s}`,
        borderHoverWarning: `1px solid ${c}`,
        colorFocusWarning: D(s, { alpha: 0.1 }),
        borderFocusWarning: `1px solid ${c}`,
        boxShadowFocusWarning: `0 0 8px 0 ${D(s, {
          alpha: 0.3
        })}`,
        caretColorWarning: s,
        // error
        loadingColorError: u,
        borderError: `1px solid ${u}`,
        borderHoverError: `1px solid ${f}`,
        colorFocusError: D(u, { alpha: 0.1 }),
        borderFocusError: `1px solid ${f}`,
        boxShadowFocusError: `0 0 8px 0 ${D(u, {
          alpha: 0.3
        })}`,
        caretColorError: u,
        clearColor: H,
        clearColorHover: b,
        clearColorPressed: $,
        iconColor: C,
        iconColorDisabled: P,
        iconColorHover: A,
        iconColorPressed: O,
        suffixTextColor: o
      });
    }
  }, Ue = M0;
  function k0(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const O0 = {
    name: "AutoComplete",
    common: F,
    peers: {
      InternalSelectMenu: Zt,
      Input: Ue
    },
    self: k0
  }, E0 = O0, _0 = (e) => {
    const { borderRadius: o, avatarColor: t, cardColor: r, fontSize: n, heightTiny: i, heightSmall: l, heightMedium: a, heightLarge: s, heightHuge: c, modalColor: u, popoverColor: f } = e;
    return {
      borderRadius: o,
      fontSize: n,
      border: `2px solid ${r}`,
      heightTiny: i,
      heightSmall: l,
      heightMedium: a,
      heightLarge: s,
      heightHuge: c,
      color: ee(r, t),
      colorModal: ee(u, t),
      colorPopover: ee(f, t)
    };
  }, D0 = {
    name: "Avatar",
    common: F,
    self: _0
  }, ks = D0, H0 = () => ({
    gap: "-12px"
  }), B0 = {
    name: "AvatarGroup",
    common: F,
    peers: {
      Avatar: ks
    },
    self: H0
  }, A0 = B0, R0 = {
    width: "44px",
    height: "44px",
    borderRadius: "22px",
    iconSize: "26px"
  }, F0 = {
    name: "BackTop",
    common: F,
    self(e) {
      const { popoverColor: o, textColor2: t, primaryColorHover: r, primaryColorPressed: n } = e;
      return Object.assign(Object.assign({}, R0), { color: o, textColor: t, iconColor: t, iconColorHover: r, iconColorPressed: n, boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)", boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)", boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)" });
    }
  }, L0 = F0, W0 = {
    name: "Badge",
    common: F,
    self(e) {
      const { errorColorSuppl: o, infoColorSuppl: t, successColorSuppl: r, warningColorSuppl: n, fontFamily: i } = e;
      return {
        color: o,
        colorInfo: t,
        colorSuccess: r,
        colorError: o,
        colorWarning: n,
        fontSize: "12px",
        fontFamily: i
      };
    }
  }, N0 = W0, j0 = {
    fontWeightActive: "400"
  }, V0 = (e) => {
    const { fontSize: o, textColor3: t, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: l } = e;
    return Object.assign(Object.assign({}, j0), { fontSize: o, itemLineHeight: "1.25", itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: r, itemTextColorActive: r, itemBorderRadius: n, itemColorHover: i, itemColorPressed: l, separatorColor: t });
  }, U0 = {
    name: "Breadcrumb",
    common: F,
    self: V0
  }, G0 = U0, K0 = {
    paddingTiny: "0 6px",
    paddingSmall: "0 10px",
    paddingMedium: "0 14px",
    paddingLarge: "0 18px",
    paddingRoundTiny: "0 10px",
    paddingRoundSmall: "0 14px",
    paddingRoundMedium: "0 18px",
    paddingRoundLarge: "0 22px",
    iconMarginTiny: "6px",
    iconMarginSmall: "6px",
    iconMarginMedium: "6px",
    iconMarginLarge: "6px",
    iconSizeTiny: "14px",
    iconSizeSmall: "18px",
    iconSizeMedium: "18px",
    iconSizeLarge: "20px",
    rippleDuration: ".6s"
  }, X0 = (e) => {
    const { heightTiny: o, heightSmall: t, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: l, fontSizeSmall: a, fontSizeMedium: s, fontSizeLarge: c, opacityDisabled: u, textColor2: f, textColor3: v, primaryColorHover: p, primaryColorPressed: d, borderColor: g, primaryColor: x, baseColor: h, infoColor: w, infoColorHover: _, infoColorPressed: I, successColor: M, successColorHover: H, successColorPressed: b, warningColor: $, warningColorHover: z, warningColorPressed: y, errorColor: C, errorColorHover: P, errorColorPressed: A, fontWeight: O, buttonColor2: N, buttonColor2Hover: U, buttonColor2Pressed: K, fontWeightStrong: X } = e;
    return Object.assign(Object.assign({}, K0), {
      heightTiny: o,
      heightSmall: t,
      heightMedium: r,
      heightLarge: n,
      borderRadiusTiny: i,
      borderRadiusSmall: i,
      borderRadiusMedium: i,
      borderRadiusLarge: i,
      fontSizeTiny: l,
      fontSizeSmall: a,
      fontSizeMedium: s,
      fontSizeLarge: c,
      opacityDisabled: u,
      // secondary
      colorOpacitySecondary: "0.16",
      colorOpacitySecondaryHover: "0.22",
      colorOpacitySecondaryPressed: "0.28",
      colorSecondary: N,
      colorSecondaryHover: U,
      colorSecondaryPressed: K,
      // tertiary
      colorTertiary: N,
      colorTertiaryHover: U,
      colorTertiaryPressed: K,
      // quaternary
      colorQuaternary: "#0000",
      colorQuaternaryHover: U,
      colorQuaternaryPressed: K,
      // default type
      color: "#0000",
      colorHover: "#0000",
      colorPressed: "#0000",
      colorFocus: "#0000",
      colorDisabled: "#0000",
      textColor: f,
      textColorTertiary: v,
      textColorHover: p,
      textColorPressed: d,
      textColorFocus: p,
      textColorDisabled: f,
      textColorText: f,
      textColorTextHover: p,
      textColorTextPressed: d,
      textColorTextFocus: p,
      textColorTextDisabled: f,
      textColorGhost: f,
      textColorGhostHover: p,
      textColorGhostPressed: d,
      textColorGhostFocus: p,
      textColorGhostDisabled: f,
      border: `1px solid ${g}`,
      borderHover: `1px solid ${p}`,
      borderPressed: `1px solid ${d}`,
      borderFocus: `1px solid ${p}`,
      borderDisabled: `1px solid ${g}`,
      rippleColor: x,
      // primary
      colorPrimary: x,
      colorHoverPrimary: p,
      colorPressedPrimary: d,
      colorFocusPrimary: p,
      colorDisabledPrimary: x,
      textColorPrimary: h,
      textColorHoverPrimary: h,
      textColorPressedPrimary: h,
      textColorFocusPrimary: h,
      textColorDisabledPrimary: h,
      textColorTextPrimary: x,
      textColorTextHoverPrimary: p,
      textColorTextPressedPrimary: d,
      textColorTextFocusPrimary: p,
      textColorTextDisabledPrimary: f,
      textColorGhostPrimary: x,
      textColorGhostHoverPrimary: p,
      textColorGhostPressedPrimary: d,
      textColorGhostFocusPrimary: p,
      textColorGhostDisabledPrimary: x,
      borderPrimary: `1px solid ${x}`,
      borderHoverPrimary: `1px solid ${p}`,
      borderPressedPrimary: `1px solid ${d}`,
      borderFocusPrimary: `1px solid ${p}`,
      borderDisabledPrimary: `1px solid ${x}`,
      rippleColorPrimary: x,
      // info
      colorInfo: w,
      colorHoverInfo: _,
      colorPressedInfo: I,
      colorFocusInfo: _,
      colorDisabledInfo: w,
      textColorInfo: h,
      textColorHoverInfo: h,
      textColorPressedInfo: h,
      textColorFocusInfo: h,
      textColorDisabledInfo: h,
      textColorTextInfo: w,
      textColorTextHoverInfo: _,
      textColorTextPressedInfo: I,
      textColorTextFocusInfo: _,
      textColorTextDisabledInfo: f,
      textColorGhostInfo: w,
      textColorGhostHoverInfo: _,
      textColorGhostPressedInfo: I,
      textColorGhostFocusInfo: _,
      textColorGhostDisabledInfo: w,
      borderInfo: `1px solid ${w}`,
      borderHoverInfo: `1px solid ${_}`,
      borderPressedInfo: `1px solid ${I}`,
      borderFocusInfo: `1px solid ${_}`,
      borderDisabledInfo: `1px solid ${w}`,
      rippleColorInfo: w,
      // success
      colorSuccess: M,
      colorHoverSuccess: H,
      colorPressedSuccess: b,
      colorFocusSuccess: H,
      colorDisabledSuccess: M,
      textColorSuccess: h,
      textColorHoverSuccess: h,
      textColorPressedSuccess: h,
      textColorFocusSuccess: h,
      textColorDisabledSuccess: h,
      textColorTextSuccess: M,
      textColorTextHoverSuccess: H,
      textColorTextPressedSuccess: b,
      textColorTextFocusSuccess: H,
      textColorTextDisabledSuccess: f,
      textColorGhostSuccess: M,
      textColorGhostHoverSuccess: H,
      textColorGhostPressedSuccess: b,
      textColorGhostFocusSuccess: H,
      textColorGhostDisabledSuccess: M,
      borderSuccess: `1px solid ${M}`,
      borderHoverSuccess: `1px solid ${H}`,
      borderPressedSuccess: `1px solid ${b}`,
      borderFocusSuccess: `1px solid ${H}`,
      borderDisabledSuccess: `1px solid ${M}`,
      rippleColorSuccess: M,
      // warning
      colorWarning: $,
      colorHoverWarning: z,
      colorPressedWarning: y,
      colorFocusWarning: z,
      colorDisabledWarning: $,
      textColorWarning: h,
      textColorHoverWarning: h,
      textColorPressedWarning: h,
      textColorFocusWarning: h,
      textColorDisabledWarning: h,
      textColorTextWarning: $,
      textColorTextHoverWarning: z,
      textColorTextPressedWarning: y,
      textColorTextFocusWarning: z,
      textColorTextDisabledWarning: f,
      textColorGhostWarning: $,
      textColorGhostHoverWarning: z,
      textColorGhostPressedWarning: y,
      textColorGhostFocusWarning: z,
      textColorGhostDisabledWarning: $,
      borderWarning: `1px solid ${$}`,
      borderHoverWarning: `1px solid ${z}`,
      borderPressedWarning: `1px solid ${y}`,
      borderFocusWarning: `1px solid ${z}`,
      borderDisabledWarning: `1px solid ${$}`,
      rippleColorWarning: $,
      // error
      colorError: C,
      colorHoverError: P,
      colorPressedError: A,
      colorFocusError: P,
      colorDisabledError: C,
      textColorError: h,
      textColorHoverError: h,
      textColorPressedError: h,
      textColorFocusError: h,
      textColorDisabledError: h,
      textColorTextError: C,
      textColorTextHoverError: P,
      textColorTextPressedError: A,
      textColorTextFocusError: P,
      textColorTextDisabledError: f,
      textColorGhostError: C,
      textColorGhostHoverError: P,
      textColorGhostPressedError: A,
      textColorGhostFocusError: P,
      textColorGhostDisabledError: C,
      borderError: `1px solid ${C}`,
      borderHoverError: `1px solid ${P}`,
      borderPressedError: `1px solid ${A}`,
      borderFocusError: `1px solid ${P}`,
      borderDisabledError: `1px solid ${C}`,
      rippleColorError: C,
      waveOpacity: "0.6",
      fontWeight: O,
      fontWeightStrong: X
    });
  }, Y0 = {
    name: "Button",
    common: F,
    self(e) {
      const o = X0(e);
      return o.waveOpacity = "0.8", o.colorOpacitySecondary = "0.16", o.colorOpacitySecondaryHover = "0.2", o.colorOpacitySecondaryPressed = "0.12", o;
    }
  }, _e = Y0, q0 = {
    titleFontSize: "22px"
  }, J0 = (e) => {
    const { borderRadius: o, fontSize: t, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: l, dividerColor: a, fontWeightStrong: s, primaryColor: c, baseColor: u, hoverColor: f, cardColor: v, modalColor: p, popoverColor: d } = e;
    return Object.assign(Object.assign({}, q0), {
      borderRadius: o,
      borderColor: ee(v, a),
      borderColorModal: ee(p, a),
      borderColorPopover: ee(d, a),
      textColor: n,
      titleFontWeight: s,
      titleTextColor: i,
      dayTextColor: l,
      fontSize: t,
      lineHeight: r,
      dateColorCurrent: c,
      dateTextColorCurrent: u,
      cellColorHover: ee(v, f),
      cellColorHoverModal: ee(p, f),
      cellColorHoverPopover: ee(d, f),
      cellColor: v,
      cellColorModal: p,
      cellColorPopover: d,
      barColor: c
    });
  }, Z0 = {
    name: "Calendar",
    common: F,
    peers: {
      Button: _e
    },
    self: J0
  }, Q0 = Z0, ex = (e) => {
    const { fontSize: o, boxShadow2: t, popoverColor: r, textColor2: n, borderRadius: i, borderColor: l, heightSmall: a, heightMedium: s, heightLarge: c, fontSizeSmall: u, fontSizeMedium: f, fontSizeLarge: v, dividerColor: p } = e;
    return {
      panelFontSize: o,
      boxShadow: t,
      color: r,
      textColor: n,
      borderRadius: i,
      border: `1px solid ${l}`,
      heightSmall: a,
      heightMedium: s,
      heightLarge: c,
      fontSizeSmall: u,
      fontSizeMedium: f,
      fontSizeLarge: v,
      dividerColor: p
    };
  }, ox = {
    name: "ColorPicker",
    common: F,
    peers: {
      Input: Ue,
      Button: _e
    },
    self: ex
  }, tx = ox, rx = {
    paddingSmall: "12px 16px 12px",
    paddingMedium: "19px 24px 20px",
    paddingLarge: "23px 32px 24px",
    paddingHuge: "27px 40px 28px",
    titleFontSizeSmall: "16px",
    titleFontSizeMedium: "18px",
    titleFontSizeLarge: "18px",
    titleFontSizeHuge: "18px",
    closeIconSize: "18px",
    closeSize: "22px"
  }, nx = (e) => {
    const { primaryColor: o, borderRadius: t, lineHeight: r, fontSize: n, cardColor: i, textColor2: l, textColor1: a, dividerColor: s, fontWeightStrong: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, closeColorHover: p, closeColorPressed: d, modalColor: g, boxShadow1: x, popoverColor: h, actionColor: w } = e;
    return Object.assign(Object.assign({}, rx), {
      lineHeight: r,
      color: i,
      colorModal: g,
      colorPopover: h,
      colorTarget: o,
      colorEmbedded: w,
      colorEmbeddedModal: w,
      colorEmbeddedPopover: w,
      textColor: l,
      titleTextColor: a,
      borderColor: s,
      actionColor: w,
      titleFontWeight: c,
      closeColorHover: p,
      closeColorPressed: d,
      closeBorderRadius: t,
      closeIconColor: u,
      closeIconColorHover: f,
      closeIconColorPressed: v,
      fontSizeSmall: n,
      fontSizeMedium: n,
      fontSizeLarge: n,
      fontSizeHuge: n,
      boxShadow: x,
      borderRadius: t
    });
  }, ix = {
    name: "Card",
    common: F,
    self(e) {
      const o = nx(e), { cardColor: t, modalColor: r, popoverColor: n } = e;
      return o.colorEmbedded = t, o.colorEmbeddedModal = r, o.colorEmbeddedPopover = n, o;
    }
  }, Os = ix, lx = (e) => ({
    dotSize: "8px",
    dotColor: "rgba(255, 255, 255, .3)",
    dotColorActive: "rgba(255, 255, 255, 1)",
    dotColorFocus: "rgba(255, 255, 255, .5)",
    dotLineWidth: "16px",
    dotLineWidthActive: "24px",
    arrowColor: "#eee"
  }), ax = {
    name: "Carousel",
    common: F,
    self: lx
  }, sx = ax, cx = {
    sizeSmall: "14px",
    sizeMedium: "16px",
    sizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, dx = (e) => {
    const { baseColor: o, inputColorDisabled: t, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: l, borderColor: a, primaryColor: s, textColor2: c, fontSizeSmall: u, fontSizeMedium: f, fontSizeLarge: v, borderRadiusSmall: p, lineHeight: d } = e;
    return Object.assign(Object.assign({}, cx), {
      labelLineHeight: d,
      fontSizeSmall: u,
      fontSizeMedium: f,
      fontSizeLarge: v,
      borderRadius: p,
      color: o,
      colorChecked: s,
      colorDisabled: t,
      colorDisabledChecked: t,
      colorTableHeader: r,
      colorTableHeaderModal: n,
      colorTableHeaderPopover: i,
      checkMarkColor: o,
      checkMarkColorDisabled: l,
      checkMarkColorDisabledChecked: l,
      border: `1px solid ${a}`,
      borderDisabled: `1px solid ${a}`,
      borderDisabledChecked: `1px solid ${a}`,
      borderChecked: `1px solid ${s}`,
      borderFocus: `1px solid ${s}`,
      boxShadowFocus: `0 0 0 2px ${D(s, { alpha: 0.3 })}`,
      textColor: c,
      textColorDisabled: l
    });
  }, ux = {
    name: "Checkbox",
    common: F,
    self(e) {
      const { cardColor: o } = e, t = dx(e);
      return t.color = "#0000", t.checkMarkColor = o, t;
    }
  }, Tt = ux, fx = (e) => {
    const { borderRadius: o, boxShadow2: t, popoverColor: r, textColor2: n, textColor3: i, primaryColor: l, textColorDisabled: a, dividerColor: s, hoverColor: c, fontSizeMedium: u, heightMedium: f } = e;
    return {
      menuBorderRadius: o,
      menuColor: r,
      menuBoxShadow: t,
      menuDividerColor: s,
      menuHeight: "calc(var(--n-option-height) * 6.6)",
      optionArrowColor: i,
      optionHeight: f,
      optionFontSize: u,
      optionColorHover: c,
      optionTextColor: n,
      optionTextColorActive: l,
      optionTextColorDisabled: a,
      optionCheckMarkColor: l,
      loadingColor: l,
      columnWidth: "180px"
    };
  }, hx = {
    name: "Cascader",
    common: F,
    peers: {
      InternalSelectMenu: Zt,
      InternalSelection: ci,
      Scrollbar: Ee,
      Checkbox: Tt,
      Empty: ai
    },
    self: fx
  }, px = hx, vx = {
    name: "Code",
    common: F,
    self(e) {
      const { textColor2: o, fontSize: t, fontWeightStrong: r, textColor3: n } = e;
      return {
        textColor: o,
        fontSize: t,
        fontWeightStrong: r,
        // extracted from hljs atom-one-dark.scss
        "mono-3": "#5c6370",
        "hue-1": "#56b6c2",
        "hue-2": "#61aeee",
        "hue-3": "#c678dd",
        "hue-4": "#98c379",
        "hue-5": "#e06c75",
        "hue-5-2": "#be5046",
        "hue-6": "#d19a66",
        "hue-6-2": "#e6c07b",
        // line-number styles
        lineNumberTextColor: n
      };
    }
  }, Es = vx, gx = (e) => {
    const { fontWeight: o, textColor1: t, textColor2: r, textColorDisabled: n, dividerColor: i, fontSize: l } = e;
    return {
      titleFontSize: l,
      titleFontWeight: o,
      dividerColor: i,
      titleTextColor: t,
      titleTextColorDisabled: n,
      fontSize: l,
      textColor: r,
      arrowColor: r,
      arrowColorDisabled: n,
      itemMargin: "16px 0 0 0"
    };
  }, mx = {
    name: "Collapse",
    common: F,
    self: gx
  }, bx = mx, xx = (e) => {
    const { cubicBezierEaseInOut: o } = e;
    return {
      bezier: o
    };
  }, Cx = {
    name: "CollapseTransition",
    common: F,
    self: xx
  }, yx = Cx, Sx = {
    abstract: Boolean,
    bordered: {
      type: Boolean,
      default: void 0
    },
    clsPrefix: String,
    locale: Object,
    dateLocale: Object,
    namespace: String,
    rtl: Array,
    tag: {
      type: String,
      default: "div"
    },
    hljs: Object,
    katex: Object,
    theme: Object,
    themeOverrides: Object,
    componentOptions: Object,
    icons: Object,
    breakpoints: Object,
    preflightStyleDisabled: Boolean,
    inlineThemeDisabled: {
      type: Boolean,
      default: void 0
    },
    // deprecated
    as: {
      type: String,
      validator: () => (xr("config-provider", "`as` is deprecated, please use `tag` instead."), !0),
      default: void 0
    }
  }, wx = ie({
    name: "ConfigProvider",
    alias: ["App"],
    props: Sx,
    setup(e) {
      const o = he(wo, null), t = E(() => {
        const { theme: d } = e;
        if (d === null)
          return;
        const g = o == null ? void 0 : o.mergedThemeRef.value;
        return d === void 0 ? g : g === void 0 ? d : Object.assign({}, g, d);
      }), r = E(() => {
        const { themeOverrides: d } = e;
        if (d !== null) {
          if (d === void 0)
            return o == null ? void 0 : o.mergedThemeOverridesRef.value;
          {
            const g = o == null ? void 0 : o.mergedThemeOverridesRef.value;
            return g === void 0 ? d : Ht({}, g, d);
          }
        }
      }), n = qe(() => {
        const { namespace: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedNamespaceRef.value : d;
      }), i = qe(() => {
        const { bordered: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedBorderedRef.value : d;
      }), l = E(() => {
        const { icons: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedIconsRef.value : d;
      }), a = E(() => {
        const { componentOptions: d } = e;
        return d !== void 0 ? d : o == null ? void 0 : o.mergedComponentPropsRef.value;
      }), s = E(() => {
        const { clsPrefix: d } = e;
        return d !== void 0 ? d : o == null ? void 0 : o.mergedClsPrefixRef.value;
      }), c = E(() => {
        var d;
        const { rtl: g } = e;
        if (g === void 0)
          return o == null ? void 0 : o.mergedRtlRef.value;
        const x = {};
        for (const h of g)
          x[h.name] = bo(h), (d = h.peers) === null || d === void 0 || d.forEach((w) => {
            w.name in x || (x[w.name] = bo(w));
          });
        return x;
      }), u = E(() => e.breakpoints || (o == null ? void 0 : o.mergedBreakpointsRef.value)), f = e.inlineThemeDisabled || (o == null ? void 0 : o.inlineThemeDisabled), v = e.preflightStyleDisabled || (o == null ? void 0 : o.preflightStyleDisabled), p = E(() => {
        const { value: d } = t, { value: g } = r, x = g && Object.keys(g).length !== 0, h = d == null ? void 0 : d.name;
        return h ? x ? `${h}-${Vt(JSON.stringify(r.value))}` : h : x ? Vt(JSON.stringify(r.value)) : "";
      });
      return to(wo, {
        mergedThemeHashRef: p,
        mergedBreakpointsRef: u,
        mergedRtlRef: c,
        mergedIconsRef: l,
        mergedComponentPropsRef: a,
        mergedBorderedRef: i,
        mergedNamespaceRef: n,
        mergedClsPrefixRef: s,
        mergedLocaleRef: E(() => {
          const { locale: d } = e;
          if (d !== null)
            return d === void 0 ? o == null ? void 0 : o.mergedLocaleRef.value : d;
        }),
        mergedDateLocaleRef: E(() => {
          const { dateLocale: d } = e;
          if (d !== null)
            return d === void 0 ? o == null ? void 0 : o.mergedDateLocaleRef.value : d;
        }),
        mergedHljsRef: E(() => {
          const { hljs: d } = e;
          return d === void 0 ? o == null ? void 0 : o.mergedHljsRef.value : d;
        }),
        mergedKatexRef: E(() => {
          const { katex: d } = e;
          return d === void 0 ? o == null ? void 0 : o.mergedKatexRef.value : d;
        }),
        mergedThemeRef: t,
        mergedThemeOverridesRef: r,
        inlineThemeDisabled: f || !1,
        preflightStyleDisabled: v || !1
      }), {
        mergedClsPrefix: s,
        mergedBordered: i,
        mergedNamespace: n,
        mergedTheme: t,
        mergedThemeOverrides: r
      };
    },
    render() {
      var e, o, t, r;
      return this.abstract ? (r = (t = this.$slots).default) === null || r === void 0 ? void 0 : r.call(t) : S(this.as || this.tag, {
        class: `${this.mergedClsPrefix || ns}-config-provider`
      }, (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e));
    }
  }), $x = {
    name: "Popselect",
    common: F,
    peers: {
      Popover: nt,
      InternalSelectMenu: Zt
    }
  }, _s = $x;
  function Ds(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const Px = {
    name: "Select",
    common: lo,
    peers: {
      InternalSelection: Is,
      InternalSelectMenu: xs
    },
    self: Ds
  }, Tx = Px, zx = {
    name: "Select",
    common: F,
    peers: {
      InternalSelection: ci,
      InternalSelectMenu: Zt
    },
    self: Ds
  }, Hs = zx, Ix = V([Q("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), Q("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [Cs({
    originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
  })])]), Mx = Object.assign(Object.assign({}, pe.props), {
    to: So.propTo,
    bordered: {
      type: Boolean,
      default: void 0
    },
    clearable: Boolean,
    clearFilterAfterSelect: {
      type: Boolean,
      default: !0
    },
    options: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: [String, Number, Array],
      default: null
    },
    value: [String, Number, Array],
    placeholder: String,
    menuProps: Object,
    multiple: Boolean,
    size: String,
    filterable: Boolean,
    disabled: {
      type: Boolean,
      default: void 0
    },
    remote: Boolean,
    loading: Boolean,
    filter: Function,
    placement: {
      type: String,
      default: "bottom-start"
    },
    widthMode: {
      type: String,
      default: "trigger"
    },
    tag: Boolean,
    onCreate: Function,
    fallbackOption: {
      type: [Function, Boolean],
      default: void 0
    },
    show: {
      type: Boolean,
      default: void 0
    },
    showArrow: {
      type: Boolean,
      default: !0
    },
    maxTagCount: [Number, String],
    consistentMenuWidth: {
      type: Boolean,
      default: !0
    },
    virtualScroll: {
      type: Boolean,
      default: !0
    },
    labelField: {
      type: String,
      default: "label"
    },
    valueField: {
      type: String,
      default: "value"
    },
    childrenField: {
      type: String,
      default: "children"
    },
    renderLabel: Function,
    renderOption: Function,
    renderTag: Function,
    "onUpdate:value": [Function, Array],
    inputProps: Object,
    nodeProps: Function,
    ignoreComposition: { type: Boolean, default: !0 },
    showOnFocus: Boolean,
    // for jsx
    onUpdateValue: [Function, Array],
    onBlur: [Function, Array],
    onClear: [Function, Array],
    onFocus: [Function, Array],
    onScroll: [Function, Array],
    onSearch: [Function, Array],
    onUpdateShow: [Function, Array],
    "onUpdate:show": [Function, Array],
    displayDirective: {
      type: String,
      default: "show"
    },
    resetMenuOnOptionsChange: {
      type: Boolean,
      default: !0
    },
    status: String,
    showCheckmark: {
      type: Boolean,
      default: !0
    },
    /** deprecated */
    onChange: [Function, Array],
    items: Array
  }), kx = ie({
    name: "Select",
    props: Mx,
    setup(e) {
      process.env.NODE_ENV !== "production" && Co(() => {
        e.items !== void 0 && _o("select", "`items` is deprecated, please use `options` instead."), e.onChange !== void 0 && _o("select", "`on-change` is deprecated, please use `on-update:value` instead.");
      });
      const { mergedClsPrefixRef: o, mergedBorderedRef: t, namespaceRef: r, inlineThemeDisabled: n } = tt(e), i = pe("Select", "-select", Ix, Tx, e, o), l = R(e.defaultValue), a = se(e, "value"), s = wn(a, l), c = R(!1), u = R(""), f = E(() => {
        const { valueField: m, childrenField: T } = e, B = P0(m, T);
        return bb(P.value, B);
      }), v = E(() => z0(y.value, e.valueField, e.childrenField)), p = R(!1), d = wn(se(e, "show"), p), g = R(null), x = R(null), h = R(null), { localeRef: w } = is("Select"), _ = E(() => {
        var m;
        return (m = e.placeholder) !== null && m !== void 0 ? m : w.value.placeholder;
      }), I = ia(e, ["items", "options"]), M = [], H = R([]), b = R([]), $ = R(/* @__PURE__ */ new Map()), z = E(() => {
        const { fallbackOption: m } = e;
        if (m === void 0) {
          const { labelField: T, valueField: B } = e;
          return (Y) => ({
            [T]: String(Y),
            [B]: Y
          });
        }
        return m === !1 ? !1 : (T) => Object.assign(m(T), {
          value: T
        });
      }), y = E(() => b.value.concat(H.value).concat(I.value)), C = E(() => {
        const { filter: m } = e;
        if (m)
          return m;
        const { labelField: T, valueField: B } = e;
        return (Y, J) => {
          if (!J)
            return !1;
          const oe = J[T];
          if (typeof oe == "string")
            return dn(Y, oe);
          const te = J[B];
          return typeof te == "string" ? dn(Y, te) : typeof te == "number" ? dn(Y, String(te)) : !1;
        };
      }), P = E(() => {
        if (e.remote)
          return I.value;
        {
          const { value: m } = y, { value: T } = u;
          return !T.length || !e.filterable ? m : T0(m, C.value, T, e.childrenField);
        }
      });
      function A(m) {
        const T = e.remote, { value: B } = $, { value: Y } = v, { value: J } = z, oe = [];
        return m.forEach((te) => {
          if (Y.has(te))
            oe.push(Y.get(te));
          else if (T && B.has(te))
            oe.push(B.get(te));
          else if (J) {
            const ne = J(te);
            ne && oe.push(ne);
          }
        }), oe;
      }
      const O = E(() => {
        if (e.multiple) {
          const { value: m } = s;
          return Array.isArray(m) ? A(m) : [];
        }
        return null;
      }), N = E(() => {
        const { value: m } = s;
        return !e.multiple && !Array.isArray(m) ? m === null ? null : A([m])[0] || null : null;
      }), U = Uu(e), { mergedSizeRef: K, mergedDisabledRef: X, mergedStatusRef: k } = U;
      function W(m, T) {
        const { onChange: B, "onUpdate:value": Y, onUpdateValue: J } = e, { nTriggerFormChange: oe, nTriggerFormInput: te } = U;
        B && Se(B, m, T), J && Se(J, m, T), Y && Se(Y, m, T), l.value = m, oe(), te();
      }
      function re(m) {
        const { onBlur: T } = e, { nTriggerFormBlur: B } = U;
        T && Se(T, m), B();
      }
      function fe() {
        const { onClear: m } = e;
        m && Se(m);
      }
      function Ie(m) {
        const { onFocus: T, showOnFocus: B } = e, { nTriggerFormFocus: Y } = U;
        T && Se(T, m), Y(), B && De();
      }
      function ao(m) {
        const { onSearch: T } = e;
        T && Se(T, m);
      }
      function Pe(m) {
        const { onScroll: T } = e;
        T && Se(T, m);
      }
      function Ze() {
        var m;
        const { remote: T, multiple: B } = e;
        if (T) {
          const { value: Y } = $;
          if (B) {
            const { valueField: J } = e;
            (m = O.value) === null || m === void 0 || m.forEach((oe) => {
              Y.set(oe[J], oe);
            });
          } else {
            const J = N.value;
            J && Y.set(J[e.valueField], J);
          }
        }
      }
      function Ae(m) {
        const { onUpdateShow: T, "onUpdate:show": B } = e;
        T && Se(T, m), B && Se(B, m), p.value = m;
      }
      function De() {
        X.value || (Ae(!0), p.value = !0, e.filterable && ko());
      }
      function Ce() {
        Ae(!1);
      }
      function Ge() {
        u.value = "", b.value = M;
      }
      const Re = R(!1);
      function Fe() {
        e.filterable && (Re.value = !0);
      }
      function so() {
        e.filterable && (Re.value = !1, d.value || Ge());
      }
      function co() {
        X.value || (d.value ? e.filterable ? ko() : Ce() : De());
      }
      function uo(m) {
        var T, B;
        !((B = (T = h.value) === null || T === void 0 ? void 0 : T.selfRef) === null || B === void 0) && B.contains(m.relatedTarget) || (c.value = !1, re(m), Ce());
      }
      function Ro(m) {
        Ie(m), c.value = !0;
      }
      function Fo(m) {
        c.value = !0;
      }
      function zo(m) {
        var T;
        !((T = g.value) === null || T === void 0) && T.$el.contains(m.relatedTarget) || (c.value = !1, re(m), Ce());
      }
      function Io() {
        var m;
        (m = g.value) === null || m === void 0 || m.focus(), Ce();
      }
      function Me(m) {
        var T;
        d.value && (!((T = g.value) === null || T === void 0) && T.$el.contains(jt(m)) || Ce());
      }
      function L(m) {
        if (!Array.isArray(m))
          return [];
        if (z.value)
          return Array.from(m);
        {
          const { remote: T } = e, { value: B } = v;
          if (T) {
            const { value: Y } = $;
            return m.filter((J) => B.has(J) || Y.has(J));
          } else
            return m.filter((Y) => B.has(Y));
        }
      }
      function G(m) {
        de(m.rawNode);
      }
      function de(m) {
        if (X.value)
          return;
        const { tag: T, remote: B, clearFilterAfterSelect: Y, valueField: J } = e;
        if (T && !B) {
          const { value: oe } = b, te = oe[0] || null;
          if (te) {
            const ne = H.value;
            ne.length ? ne.push(te) : H.value = [te], b.value = M;
          }
        }
        if (B && $.value.set(m[J], m), e.multiple) {
          const oe = L(s.value), te = oe.findIndex((ne) => ne === m[J]);
          if (~te) {
            if (oe.splice(te, 1), T && !B) {
              const ne = Le(m[J]);
              ~ne && (H.value.splice(ne, 1), Y && (u.value = ""));
            }
          } else
            oe.push(m[J]), Y && (u.value = "");
          W(oe, A(oe));
        } else {
          if (T && !B) {
            const oe = Le(m[J]);
            ~oe ? H.value = [
              H.value[oe]
            ] : H.value = M;
          }
          Mo(), Ce(), W(m[J], m);
        }
      }
      function Le(m) {
        return H.value.findIndex((B) => B[e.valueField] === m);
      }
      function it(m) {
        d.value || De();
        const { value: T } = m.target;
        u.value = T;
        const { tag: B, remote: Y } = e;
        if (ao(T), B && !Y) {
          if (!T) {
            b.value = M;
            return;
          }
          const { onCreate: J } = e, oe = J ? J(T) : { [e.labelField]: T, [e.valueField]: T }, { valueField: te } = e;
          I.value.some((ne) => ne[te] === oe[te]) || H.value.some((ne) => ne[te] === oe[te]) ? b.value = M : b.value = [oe];
        }
      }
      function It(m) {
        m.stopPropagation();
        const { multiple: T } = e;
        !T && e.filterable && Ce(), fe(), T ? W([], []) : W(null, null);
      }
      function lt(m) {
        !br(m, "action") && !br(m, "empty") && m.preventDefault();
      }
      function at(m) {
        Pe(m);
      }
      function st(m) {
        var T, B, Y, J, oe;
        switch (m.key) {
          case " ":
            if (e.filterable)
              break;
            m.preventDefault();
          case "Enter":
            if (!(!((T = g.value) === null || T === void 0) && T.isComposing)) {
              if (d.value) {
                const te = (B = h.value) === null || B === void 0 ? void 0 : B.getPendingTmNode();
                te ? G(te) : e.filterable || (Ce(), Mo());
              } else if (De(), e.tag && Re.value) {
                const te = b.value[0];
                if (te) {
                  const ne = te[e.valueField], { value: ke } = s;
                  e.multiple && Array.isArray(ke) && ke.some((ho) => ho === ne) || de(te);
                }
              }
            }
            m.preventDefault();
            break;
          case "ArrowUp":
            if (m.preventDefault(), e.loading)
              return;
            d.value && ((Y = h.value) === null || Y === void 0 || Y.prev());
            break;
          case "ArrowDown":
            if (m.preventDefault(), e.loading)
              return;
            d.value ? (J = h.value) === null || J === void 0 || J.next() : De();
            break;
          case "Escape":
            d.value && (Ad(m), Ce()), (oe = g.value) === null || oe === void 0 || oe.focus();
            break;
        }
      }
      function Mo() {
        var m;
        (m = g.value) === null || m === void 0 || m.focus();
      }
      function ko() {
        var m;
        (m = g.value) === null || m === void 0 || m.focusInput();
      }
      function Mt() {
        var m;
        d.value && ((m = x.value) === null || m === void 0 || m.syncPosition());
      }
      Ze(), xe(se(e, "options"), Ze);
      const ct = {
        focus: () => {
          var m;
          (m = g.value) === null || m === void 0 || m.focus();
        },
        blur: () => {
          var m;
          (m = g.value) === null || m === void 0 || m.blur();
        }
      }, Ke = E(() => {
        const { self: { menuBoxShadow: m } } = i.value;
        return {
          "--n-menu-box-shadow": m
        };
      }), fo = n ? To("select", void 0, Ke, e) : void 0;
      return Object.assign(Object.assign({}, ct), {
        mergedStatus: k,
        mergedClsPrefix: o,
        mergedBordered: t,
        namespace: r,
        treeMate: f,
        isMounted: Hr(),
        triggerRef: g,
        menuRef: h,
        pattern: u,
        uncontrolledShow: p,
        mergedShow: d,
        adjustedTo: So(e),
        uncontrolledValue: l,
        mergedValue: s,
        followerRef: x,
        localizedPlaceholder: _,
        selectedOption: N,
        selectedOptions: O,
        mergedSize: K,
        mergedDisabled: X,
        focused: c,
        activeWithoutMenuOpen: Re,
        inlineThemeDisabled: n,
        onTriggerInputFocus: Fe,
        onTriggerInputBlur: so,
        handleTriggerOrMenuResize: Mt,
        handleMenuFocus: Fo,
        handleMenuBlur: zo,
        handleMenuTabOut: Io,
        handleTriggerClick: co,
        handleToggle: G,
        handleDeleteOption: de,
        handlePatternInput: it,
        handleClear: It,
        handleTriggerBlur: uo,
        handleTriggerFocus: Ro,
        handleKeydown: st,
        handleMenuAfterLeave: Ge,
        handleMenuClickOutside: Me,
        handleMenuScroll: at,
        handleMenuKeydown: st,
        handleMenuMousedown: lt,
        mergedTheme: i,
        cssVars: n ? void 0 : Ke,
        themeClass: fo == null ? void 0 : fo.themeClass,
        onRender: fo == null ? void 0 : fo.onRender
      });
    },
    render() {
      return S(
        "div",
        { class: `${this.mergedClsPrefix}-select` },
        S(ha, null, {
          default: () => [
            S(pa, null, {
              default: () => S(m0, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
                arrow: () => {
                  var e, o;
                  return [(o = (e = this.$slots).arrow) === null || o === void 0 ? void 0 : o.call(e)];
                }
              })
            }),
            S(ma, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === So.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
              default: () => S(yt, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
                default: () => {
                  var e, o, t;
                  return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Yt(S(Vb, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
                    `${this.mergedClsPrefix}-select-menu`,
                    this.themeClass,
                    (o = this.menuProps) === null || o === void 0 ? void 0 : o.class
                  ], clsPrefix: this.mergedClsPrefix, focusable: !0, labelField: this.labelField, valueField: this.valueField, autoPending: !0, nodeProps: this.nodeProps, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, treeMate: this.treeMate, multiple: this.multiple, size: "medium", renderOption: this.renderOption, renderLabel: this.renderLabel, value: this.mergedValue, style: [(t = this.menuProps) === null || t === void 0 ? void 0 : t.style, this.cssVars], onToggle: this.handleToggle, onScroll: this.handleMenuScroll, onFocus: this.handleMenuFocus, onBlur: this.handleMenuBlur, onKeydown: this.handleMenuKeydown, onTabOut: this.handleMenuTabOut, onMousedown: this.handleMenuMousedown, show: this.mergedShow, showCheckmark: this.showCheckmark, resetMenuOnOptionsChange: this.resetMenuOnOptionsChange }), {
                    empty: () => {
                      var r, n;
                      return [(n = (r = this.$slots).empty) === null || n === void 0 ? void 0 : n.call(r)];
                    },
                    action: () => {
                      var r, n;
                      return [(n = (r = this.$slots).action) === null || n === void 0 ? void 0 : n.call(r)];
                    }
                  }), this.displayDirective === "show" ? [
                    [_l, this.mergedShow],
                    [
                      Cr,
                      this.handleMenuClickOutside,
                      void 0,
                      { capture: !0 }
                    ]
                  ] : [
                    [
                      Cr,
                      this.handleMenuClickOutside,
                      void 0,
                      { capture: !0 }
                    ]
                  ])) : null;
                }
              })
            })
          ]
        })
      );
    }
  }), Ox = {
    itemPaddingSmall: "0 4px",
    itemMarginSmall: "0 0 0 8px",
    itemMarginSmallRtl: "0 8px 0 0",
    itemPaddingMedium: "0 4px",
    itemMarginMedium: "0 0 0 8px",
    itemMarginMediumRtl: "0 8px 0 0",
    itemPaddingLarge: "0 4px",
    itemMarginLarge: "0 0 0 8px",
    itemMarginLargeRtl: "0 8px 0 0",
    buttonIconSizeSmall: "14px",
    buttonIconSizeMedium: "16px",
    buttonIconSizeLarge: "18px",
    inputWidthSmall: "60px",
    selectWidthSmall: "unset",
    inputMarginSmall: "0 0 0 8px",
    inputMarginSmallRtl: "0 8px 0 0",
    selectMarginSmall: "0 0 0 8px",
    prefixMarginSmall: "0 8px 0 0",
    suffixMarginSmall: "0 0 0 8px",
    inputWidthMedium: "60px",
    selectWidthMedium: "unset",
    inputMarginMedium: "0 0 0 8px",
    inputMarginMediumRtl: "0 8px 0 0",
    selectMarginMedium: "0 0 0 8px",
    prefixMarginMedium: "0 8px 0 0",
    suffixMarginMedium: "0 0 0 8px",
    inputWidthLarge: "60px",
    selectWidthLarge: "unset",
    inputMarginLarge: "0 0 0 8px",
    inputMarginLargeRtl: "0 8px 0 0",
    selectMarginLarge: "0 0 0 8px",
    prefixMarginLarge: "0 8px 0 0",
    suffixMarginLarge: "0 0 0 8px"
  }, Ex = (e) => {
    const {
      textColor2: o,
      primaryColor: t,
      primaryColorHover: r,
      primaryColorPressed: n,
      inputColorDisabled: i,
      textColorDisabled: l,
      borderColor: a,
      borderRadius: s,
      // item font size
      fontSizeTiny: c,
      fontSizeSmall: u,
      fontSizeMedium: f,
      // item size
      heightTiny: v,
      heightSmall: p,
      heightMedium: d
    } = e;
    return Object.assign(Object.assign({}, Ox), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${a}`, buttonBorderHover: `1px solid ${a}`, buttonBorderPressed: `1px solid ${a}`, buttonIconColor: o, buttonIconColorHover: o, buttonIconColorPressed: o, itemTextColor: o, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: t, itemTextColorDisabled: l, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${t}`, itemBorderDisabled: `1px solid ${a}`, itemBorderRadius: s, itemSizeSmall: v, itemSizeMedium: p, itemSizeLarge: d, itemFontSizeSmall: c, itemFontSizeMedium: u, itemFontSizeLarge: f, jumperFontSizeSmall: c, jumperFontSizeMedium: u, jumperFontSizeLarge: f, jumperTextColor: o, jumperTextColorDisabled: l });
  }, _x = {
    name: "Pagination",
    common: F,
    peers: {
      Select: Hs,
      Input: Ue,
      Popselect: _s
    },
    self(e) {
      const { primaryColor: o, opacity3: t } = e, r = D(o, {
        alpha: Number(t)
      }), n = Ex(e);
      return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
    }
  }, Bs = _x, As = {
    padding: "8px 14px"
  }, Dx = {
    name: "Tooltip",
    common: F,
    peers: {
      Popover: nt
    },
    self(e) {
      const { borderRadius: o, boxShadow2: t, popoverColor: r, textColor2: n } = e;
      return Object.assign(Object.assign({}, As), { borderRadius: o, boxShadow: t, color: r, textColor: n });
    }
  }, Lr = Dx, Hx = (e) => {
    const { borderRadius: o, boxShadow2: t, baseColor: r } = e;
    return Object.assign(Object.assign({}, As), { borderRadius: o, boxShadow: t, color: ee(r, "rgba(0, 0, 0, .85)"), textColor: r });
  }, Bx = {
    name: "Tooltip",
    common: lo,
    peers: {
      Popover: si
    },
    self: Hx
  }, Ax = Bx, Rx = {
    name: "Ellipsis",
    common: F,
    peers: {
      Tooltip: Lr
    }
  }, Rs = Rx, Fx = {
    radioSizeSmall: "14px",
    radioSizeMedium: "16px",
    radioSizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, Lx = {
    name: "Radio",
    common: F,
    self(e) {
      const { borderColor: o, primaryColor: t, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: a, borderRadius: s, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: f, heightSmall: v, heightMedium: p, heightLarge: d, lineHeight: g } = e;
      return Object.assign(Object.assign({}, Fx), {
        labelLineHeight: g,
        buttonHeightSmall: v,
        buttonHeightMedium: p,
        buttonHeightLarge: d,
        fontSizeSmall: c,
        fontSizeMedium: u,
        fontSizeLarge: f,
        boxShadow: `inset 0 0 0 1px ${o}`,
        boxShadowActive: `inset 0 0 0 1px ${t}`,
        boxShadowFocus: `inset 0 0 0 1px ${t}, 0 0 0 2px ${D(t, { alpha: 0.3 })}`,
        boxShadowHover: `inset 0 0 0 1px ${t}`,
        boxShadowDisabled: `inset 0 0 0 1px ${o}`,
        color: "#0000",
        colorDisabled: i,
        colorActive: "#0000",
        textColor: l,
        textColorDisabled: n,
        dotColorActive: t,
        dotColorDisabled: o,
        buttonBorderColor: o,
        buttonBorderColorActive: t,
        buttonBorderColorHover: t,
        buttonColor: "#0000",
        buttonColorActive: t,
        buttonTextColor: l,
        buttonTextColorActive: r,
        buttonTextColorHover: t,
        opacityDisabled: a,
        buttonBoxShadowFocus: `inset 0 0 0 1px ${t}, 0 0 0 2px ${D(t, { alpha: 0.3 })}`,
        buttonBoxShadowHover: `inset 0 0 0 1px ${t}`,
        buttonBoxShadow: "inset 0 0 0 1px #0000",
        buttonBorderRadius: s
      });
    }
  }, Fs = Lx, Wx = {
    padding: "4px 0",
    optionIconSizeSmall: "14px",
    optionIconSizeMedium: "16px",
    optionIconSizeLarge: "16px",
    optionIconSizeHuge: "18px",
    optionSuffixWidthSmall: "14px",
    optionSuffixWidthMedium: "14px",
    optionSuffixWidthLarge: "16px",
    optionSuffixWidthHuge: "16px",
    optionIconSuffixWidthSmall: "32px",
    optionIconSuffixWidthMedium: "32px",
    optionIconSuffixWidthLarge: "36px",
    optionIconSuffixWidthHuge: "36px",
    optionPrefixWidthSmall: "14px",
    optionPrefixWidthMedium: "14px",
    optionPrefixWidthLarge: "16px",
    optionPrefixWidthHuge: "16px",
    optionIconPrefixWidthSmall: "36px",
    optionIconPrefixWidthMedium: "36px",
    optionIconPrefixWidthLarge: "40px",
    optionIconPrefixWidthHuge: "40px"
  }, Nx = (e) => {
    const { primaryColor: o, textColor2: t, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: l, borderRadius: a, fontSizeSmall: s, fontSizeMedium: c, fontSizeLarge: u, fontSizeHuge: f, heightSmall: v, heightMedium: p, heightLarge: d, heightHuge: g, textColor3: x, opacityDisabled: h } = e;
    return Object.assign(Object.assign({}, Wx), {
      optionHeightSmall: v,
      optionHeightMedium: p,
      optionHeightLarge: d,
      optionHeightHuge: g,
      borderRadius: a,
      fontSizeSmall: s,
      fontSizeMedium: c,
      fontSizeLarge: u,
      fontSizeHuge: f,
      // non-inverted
      optionTextColor: t,
      optionTextColorHover: t,
      optionTextColorActive: o,
      optionTextColorChildActive: o,
      color: i,
      dividerColor: r,
      suffixColor: t,
      prefixColor: t,
      optionColorHover: n,
      optionColorActive: D(o, { alpha: 0.1 }),
      groupHeaderTextColor: x,
      // inverted
      optionTextColorInverted: "#BBB",
      optionTextColorHoverInverted: "#FFF",
      optionTextColorActiveInverted: "#FFF",
      optionTextColorChildActiveInverted: "#FFF",
      colorInverted: l,
      dividerColorInverted: "#BBB",
      suffixColorInverted: "#BBB",
      prefixColorInverted: "#BBB",
      optionColorHoverInverted: o,
      optionColorActiveInverted: o,
      groupHeaderTextColorInverted: "#AAA",
      optionOpacityDisabled: h
    });
  }, jx = {
    name: "Dropdown",
    common: F,
    peers: {
      Popover: nt
    },
    self(e) {
      const { primaryColorSuppl: o, primaryColor: t, popoverColor: r } = e, n = Nx(e);
      return n.colorInverted = r, n.optionColorActive = D(t, { alpha: 0.15 }), n.optionColorActiveInverted = o, n.optionColorHoverInverted = o, n;
    }
  }, di = jx, Vx = {
    thPaddingSmall: "8px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "8px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px",
    sorterSize: "15px",
    resizableContainerSize: "8px",
    resizableSize: "2px",
    filterSize: "15px",
    paginationMargin: "12px 0 0 0",
    emptyPadding: "48px 0",
    actionPadding: "8px 12px",
    actionButtonMargin: "0 8px 0 0"
  }, Ux = (e) => {
    const { cardColor: o, modalColor: t, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: l, tableColorHover: a, iconColor: s, primaryColor: c, fontWeightStrong: u, borderRadius: f, lineHeight: v, fontSizeSmall: p, fontSizeMedium: d, fontSizeLarge: g, dividerColor: x, heightSmall: h, opacityDisabled: w, tableColorStriped: _ } = e;
    return Object.assign(Object.assign({}, Vx), {
      actionDividerColor: x,
      lineHeight: v,
      borderRadius: f,
      fontSizeSmall: p,
      fontSizeMedium: d,
      fontSizeLarge: g,
      borderColor: ee(o, x),
      tdColorHover: ee(o, a),
      tdColorStriped: ee(o, _),
      thColor: ee(o, l),
      thColorHover: ee(ee(o, l), a),
      tdColor: o,
      tdTextColor: n,
      thTextColor: i,
      thFontWeight: u,
      thButtonColorHover: a,
      thIconColor: s,
      thIconColorActive: c,
      // modal
      borderColorModal: ee(t, x),
      tdColorHoverModal: ee(t, a),
      tdColorStripedModal: ee(t, _),
      thColorModal: ee(t, l),
      thColorHoverModal: ee(ee(t, l), a),
      tdColorModal: t,
      // popover
      borderColorPopover: ee(r, x),
      tdColorHoverPopover: ee(r, a),
      tdColorStripedPopover: ee(r, _),
      thColorPopover: ee(r, l),
      thColorHoverPopover: ee(ee(r, l), a),
      tdColorPopover: r,
      boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
      boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
      // loading
      loadingColor: c,
      loadingSize: h,
      opacityLoading: w
    });
  }, Gx = {
    name: "DataTable",
    common: F,
    peers: {
      Button: _e,
      Checkbox: Tt,
      Radio: Fs,
      Pagination: Bs,
      Scrollbar: Ee,
      Empty: rt,
      Popover: nt,
      Ellipsis: Rs,
      Dropdown: di
    },
    self(e) {
      const o = Ux(e);
      return o.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", o.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", o;
    }
  }, Kx = Gx, Xx = Object.assign(Object.assign({}, ws), pe.props), Yx = ie({
    name: "Tooltip",
    props: Xx,
    __popover__: !0,
    setup(e) {
      const o = pe("Tooltip", "-tooltip", void 0, Ax, e), t = R(null);
      return Object.assign(Object.assign({}, {
        syncPosition() {
          t.value.syncPosition();
        },
        setShow(n) {
          t.value.setShow(n);
        }
      }), { popoverRef: t, mergedTheme: o, popoverThemeOverrides: E(() => o.value.self) });
    },
    render() {
      const { mergedTheme: e, internalExtraClass: o } = this;
      return S($s, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: o.concat("tooltip"), ref: "popoverRef" }), this.$slots);
    }
  }), Ls = (e) => {
    const { textColorBase: o, opacity1: t, opacity2: r, opacity3: n, opacity4: i, opacity5: l } = e;
    return {
      color: o,
      opacity1Depth: t,
      opacity2Depth: r,
      opacity3Depth: n,
      opacity4Depth: i,
      opacity5Depth: l
    };
  }, qx = {
    name: "Icon",
    common: lo,
    self: Ls
  }, Jx = qx, Zx = {
    name: "Icon",
    common: F,
    self: Ls
  }, Qx = Zx, eC = Q("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [le("color-transition", {
    transition: "color .3s var(--n-bezier)"
  }), le("depth", {
    color: "var(--n-color)"
  }, [V("svg", {
    opacity: "var(--n-opacity)",
    transition: "opacity .3s var(--n-bezier)"
  })]), V("svg", {
    height: "1em",
    width: "1em"
  })]), oC = Object.assign(Object.assign({}, pe.props), { depth: [String, Number], size: [Number, String], color: String, component: Object }), un = ie({
    _n_icon__: !0,
    name: "Icon",
    inheritAttrs: !1,
    props: oC,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = tt(e), r = pe("Icon", "-icon", eC, Jx, e, o), n = E(() => {
        const { depth: l } = e, { common: { cubicBezierEaseInOut: a }, self: s } = r.value;
        if (l !== void 0) {
          const { color: c, [`opacity${l}Depth`]: u } = s;
          return {
            "--n-bezier": a,
            "--n-color": c,
            "--n-opacity": u
          };
        }
        return {
          "--n-bezier": a,
          "--n-color": "",
          "--n-opacity": ""
        };
      }), i = t ? To("icon", E(() => `${e.depth || "d"}`), n, e) : void 0;
      return {
        mergedClsPrefix: o,
        mergedStyle: E(() => {
          const { size: l, color: a } = e;
          return {
            fontSize: hr(l),
            color: a
          };
        }),
        cssVars: t ? void 0 : n,
        themeClass: i == null ? void 0 : i.themeClass,
        onRender: i == null ? void 0 : i.onRender
      };
    },
    render() {
      var e;
      const { $parent: o, depth: t, mergedClsPrefix: r, component: n, onRender: i, themeClass: l } = this;
      return !((e = o == null ? void 0 : o.$options) === null || e === void 0) && e._n_icon__ && xr("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), S("i", Or(this.$attrs, {
        role: "img",
        class: [
          `${r}-icon`,
          l,
          {
            [`${r}-icon--depth`]: t,
            [`${r}-icon--color-transition`]: t !== void 0
          }
        ],
        style: [this.cssVars, this.mergedStyle]
      }), n ? S(n) : this.$slots);
    }
  }), tC = {
    itemFontSize: "12px",
    itemHeight: "36px",
    itemWidth: "52px",
    panelActionPadding: "8px 0"
  }, rC = (e) => {
    const { popoverColor: o, textColor2: t, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: l, boxShadow2: a, borderRadius: s, iconColor: c, iconColorDisabled: u } = e;
    return Object.assign(Object.assign({}, tC), {
      panelColor: o,
      panelBoxShadow: a,
      panelDividerColor: i,
      itemTextColor: t,
      itemTextColorActive: r,
      itemColorHover: n,
      itemOpacityDisabled: l,
      itemBorderRadius: s,
      borderRadius: s,
      iconColor: c,
      iconColorDisabled: u
    });
  }, nC = {
    name: "TimePicker",
    common: F,
    peers: {
      Scrollbar: Ee,
      Button: _e,
      Input: Ue
    },
    self: rC
  }, Ws = nC, iC = {
    itemSize: "24px",
    itemCellWidth: "38px",
    itemCellHeight: "32px",
    scrollItemWidth: "80px",
    scrollItemHeight: "40px",
    panelExtraFooterPadding: "8px 12px",
    panelActionPadding: "8px 12px",
    calendarTitlePadding: "0",
    calendarTitleHeight: "28px",
    arrowSize: "14px",
    panelHeaderPadding: "8px 12px",
    calendarDaysHeight: "32px",
    calendarTitleGridTempateColumns: "28px 28px 1fr 28px 28px",
    // type
    calendarLeftPaddingDate: "6px 12px 4px 12px",
    calendarLeftPaddingDatetime: "4px 12px",
    calendarLeftPaddingDaterange: "6px 12px 4px 12px",
    calendarLeftPaddingDatetimerange: "4px 12px",
    calendarLeftPaddingMonth: "0",
    calendarLeftPaddingYear: "0",
    calendarLeftPaddingQuarter: "0",
    calendarLeftPaddingMonthrange: "0",
    calendarLeftPaddingQuarterrange: "0",
    calendarLeftPaddingYearrange: "0",
    calendarRightPaddingDate: "6px 12px 4px 12px",
    calendarRightPaddingDatetime: "4px 12px",
    calendarRightPaddingDaterange: "6px 12px 4px 12px",
    calendarRightPaddingDatetimerange: "4px 12px",
    calendarRightPaddingMonth: "0",
    calendarRightPaddingYear: "0",
    calendarRightPaddingQuarter: "0",
    calendarRightPaddingMonthrange: "0",
    calendarRightPaddingQuarterrange: "0",
    calendarRightPaddingYearrange: "0"
  }, lC = (e) => {
    const { hoverColor: o, fontSize: t, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: l, borderRadiusSmall: a, iconColor: s, iconColorDisabled: c, textColor1: u, dividerColor: f, boxShadow2: v, borderRadius: p, fontWeightStrong: d } = e;
    return Object.assign(Object.assign({}, iC), {
      itemFontSize: t,
      calendarDaysFontSize: t,
      calendarTitleFontSize: t,
      itemTextColor: r,
      itemTextColorDisabled: n,
      itemTextColorActive: i,
      itemTextColorCurrent: l,
      itemColorIncluded: D(l, { alpha: 0.1 }),
      itemColorHover: o,
      itemColorDisabled: o,
      itemColorActive: l,
      itemBorderRadius: a,
      panelColor: i,
      panelTextColor: r,
      arrowColor: s,
      calendarTitleTextColor: u,
      calendarTitleColorHover: o,
      calendarDaysTextColor: r,
      panelHeaderDividerColor: f,
      calendarDaysDividerColor: f,
      calendarDividerColor: f,
      panelActionDividerColor: f,
      panelBoxShadow: v,
      panelBorderRadius: p,
      calendarTitleFontWeight: d,
      scrollItemBorderRadius: p,
      iconColor: s,
      iconColorDisabled: c
    });
  }, aC = {
    name: "DatePicker",
    common: F,
    peers: {
      Input: Ue,
      Button: _e,
      TimePicker: Ws,
      Scrollbar: Ee
    },
    self(e) {
      const { popoverColor: o, hoverColor: t, primaryColor: r } = e, n = lC(e);
      return n.itemColorDisabled = ee(o, t), n.itemColorIncluded = D(r, { alpha: 0.15 }), n.itemColorHover = ee(o, t), n;
    }
  }, sC = aC, cC = {
    thPaddingBorderedSmall: "8px 12px",
    thPaddingBorderedMedium: "12px 16px",
    thPaddingBorderedLarge: "16px 24px",
    thPaddingSmall: "0",
    thPaddingMedium: "0",
    thPaddingLarge: "0",
    tdPaddingBorderedSmall: "8px 12px",
    tdPaddingBorderedMedium: "12px 16px",
    tdPaddingBorderedLarge: "16px 24px",
    tdPaddingSmall: "0 0 8px 0",
    tdPaddingMedium: "0 0 12px 0",
    tdPaddingLarge: "0 0 16px 0"
  }, dC = (e) => {
    const { tableHeaderColor: o, textColor2: t, textColor1: r, cardColor: n, modalColor: i, popoverColor: l, dividerColor: a, borderRadius: s, fontWeightStrong: c, lineHeight: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p } = e;
    return Object.assign(Object.assign({}, cC), {
      lineHeight: u,
      fontSizeSmall: f,
      fontSizeMedium: v,
      fontSizeLarge: p,
      titleTextColor: r,
      thColor: ee(n, o),
      thColorModal: ee(i, o),
      thColorPopover: ee(l, o),
      thTextColor: r,
      thFontWeight: c,
      tdTextColor: t,
      tdColor: n,
      tdColorModal: i,
      tdColorPopover: l,
      borderColor: ee(n, a),
      borderColorModal: ee(i, a),
      borderColorPopover: ee(l, a),
      borderRadius: s
    });
  }, uC = {
    name: "Descriptions",
    common: F,
    self: dC
  }, fC = uC, hC = {
    titleFontSize: "18px",
    padding: "16px 28px 20px 28px",
    iconSize: "28px",
    actionSpace: "12px",
    contentMargin: "8px 0 16px 0",
    iconMargin: "0 4px 0 0",
    iconMarginIconTop: "4px 0 8px 0",
    closeSize: "22px",
    closeIconSize: "18px",
    closeMargin: "20px 26px 0 0",
    closeMarginIconTop: "10px 16px 0 0"
  }, pC = (e) => {
    const { textColor1: o, textColor2: t, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, infoColor: c, successColor: u, warningColor: f, errorColor: v, primaryColor: p, dividerColor: d, borderRadius: g, fontWeightStrong: x, lineHeight: h, fontSize: w } = e;
    return Object.assign(Object.assign({}, hC), {
      fontSize: w,
      lineHeight: h,
      border: `1px solid ${d}`,
      titleTextColor: o,
      textColor: t,
      color: r,
      closeColorHover: a,
      closeColorPressed: s,
      closeIconColor: n,
      closeIconColorHover: i,
      closeIconColorPressed: l,
      closeBorderRadius: g,
      iconColor: p,
      iconColorInfo: c,
      iconColorSuccess: u,
      iconColorWarning: f,
      iconColorError: v,
      borderRadius: g,
      titleFontWeight: x
    });
  }, vC = {
    name: "Dialog",
    common: F,
    peers: {
      Button: _e
    },
    self: pC
  }, Ns = vC, gC = (e) => {
    const { modalColor: o, textColor2: t, boxShadow3: r } = e;
    return {
      color: o,
      textColor: t,
      boxShadow: r
    };
  }, mC = {
    name: "Modal",
    common: F,
    peers: {
      Scrollbar: Ee,
      Dialog: Ns,
      Card: Os
    },
    self: gC
  }, bC = mC, xC = (e) => {
    const { textColor1: o, dividerColor: t, fontWeightStrong: r } = e;
    return {
      textColor: o,
      color: t,
      fontWeight: r
    };
  }, CC = {
    name: "Divider",
    common: F,
    self: xC
  }, yC = CC, SC = (e) => {
    const { modalColor: o, textColor1: t, textColor2: r, boxShadow3: n, lineHeight: i, fontWeightStrong: l, dividerColor: a, closeColorHover: s, closeColorPressed: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, borderRadius: p, primaryColorHover: d } = e;
    return {
      bodyPadding: "16px 24px",
      headerPadding: "16px 24px",
      footerPadding: "16px 24px",
      color: o,
      textColor: r,
      titleTextColor: t,
      titleFontSize: "18px",
      titleFontWeight: l,
      boxShadow: n,
      lineHeight: i,
      headerBorderBottom: `1px solid ${a}`,
      footerBorderTop: `1px solid ${a}`,
      closeIconColor: u,
      closeIconColorHover: f,
      closeIconColorPressed: v,
      closeSize: "22px",
      closeIconSize: "18px",
      closeColorHover: s,
      closeColorPressed: c,
      closeBorderRadius: p,
      resizableTriggerColorHover: d
    };
  }, wC = {
    name: "Drawer",
    common: F,
    peers: {
      Scrollbar: Ee
    },
    self: SC
  }, $C = wC, PC = {
    actionMargin: "0 0 0 20px",
    actionMarginRtl: "0 20px 0 0"
  }, TC = {
    name: "DynamicInput",
    common: F,
    peers: {
      Input: Ue,
      Button: _e
    },
    self() {
      return PC;
    }
  }, zC = TC, IC = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, MC = {
    name: "Space",
    self() {
      return IC;
    }
  }, js = MC, kC = {
    name: "DynamicTags",
    common: F,
    peers: {
      Input: Ue,
      Button: _e,
      Tag: Ts,
      Space: js
    },
    self() {
      return {
        inputWidth: "64px"
      };
    }
  }, OC = kC, EC = {
    name: "Element",
    common: F
  }, _C = EC, DC = {
    feedbackPadding: "4px 0 0 2px",
    feedbackHeightSmall: "24px",
    feedbackHeightMedium: "24px",
    feedbackHeightLarge: "26px",
    feedbackFontSizeSmall: "13px",
    feedbackFontSizeMedium: "14px",
    feedbackFontSizeLarge: "14px",
    labelFontSizeLeftSmall: "14px",
    labelFontSizeLeftMedium: "14px",
    labelFontSizeLeftLarge: "15px",
    labelFontSizeTopSmall: "13px",
    labelFontSizeTopMedium: "14px",
    labelFontSizeTopLarge: "14px",
    labelHeightSmall: "24px",
    labelHeightMedium: "26px",
    labelHeightLarge: "28px",
    labelPaddingVertical: "0 0 6px 2px",
    labelPaddingHorizontal: "0 12px 0 0",
    labelTextAlignVertical: "left",
    labelTextAlignHorizontal: "right",
    labelFontWeight: "400"
  }, HC = (e) => {
    const { heightSmall: o, heightMedium: t, heightLarge: r, textColor1: n, errorColor: i, warningColor: l, lineHeight: a, textColor3: s } = e;
    return Object.assign(Object.assign({}, DC), { blankHeightSmall: o, blankHeightMedium: t, blankHeightLarge: r, lineHeight: a, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: l, feedbackTextColor: s });
  }, BC = {
    name: "Form",
    common: F,
    self: HC
  }, AC = BC, RC = {
    name: "GradientText",
    common: F,
    self(e) {
      const { primaryColor: o, successColor: t, warningColor: r, errorColor: n, infoColor: i, primaryColorSuppl: l, successColorSuppl: a, warningColorSuppl: s, errorColorSuppl: c, infoColorSuppl: u, fontWeightStrong: f } = e;
      return {
        fontWeight: f,
        rotate: "252deg",
        colorStartPrimary: o,
        colorEndPrimary: l,
        colorStartInfo: i,
        colorEndInfo: u,
        colorStartWarning: r,
        colorEndWarning: s,
        colorStartError: n,
        colorEndError: c,
        colorStartSuccess: t,
        colorEndSuccess: a
      };
    }
  }, FC = RC, LC = (e) => {
    const { primaryColor: o, baseColor: t } = e;
    return {
      color: o,
      iconColor: t
    };
  }, WC = {
    name: "IconWrapper",
    common: F,
    self: LC
  }, NC = WC, jC = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  }, VC = (e) => {
    const { textColor2: o, successColor: t, infoColor: r, warningColor: n, errorColor: i, popoverColor: l, closeIconColor: a, closeIconColorHover: s, closeIconColorPressed: c, closeColorHover: u, closeColorPressed: f, textColor1: v, textColor3: p, borderRadius: d, fontWeightStrong: g, boxShadow2: x, lineHeight: h, fontSize: w } = e;
    return Object.assign(Object.assign({}, jC), {
      borderRadius: d,
      lineHeight: h,
      fontSize: w,
      headerFontWeight: g,
      iconColor: o,
      iconColorSuccess: t,
      iconColorInfo: r,
      iconColorWarning: n,
      iconColorError: i,
      color: l,
      textColor: o,
      closeIconColor: a,
      closeIconColorHover: s,
      closeIconColorPressed: c,
      closeBorderRadius: d,
      closeColorHover: u,
      closeColorPressed: f,
      headerTextColor: v,
      descriptionTextColor: p,
      actionTextColor: o,
      boxShadow: x
    });
  }, UC = {
    name: "Notification",
    common: F,
    peers: {
      Scrollbar: Ee
    },
    self: VC
  }, GC = UC, KC = {
    margin: "0 0 8px 0",
    padding: "10px 20px",
    maxWidth: "720px",
    minWidth: "420px",
    iconMargin: "0 10px 0 0",
    closeMargin: "0 0 0 10px",
    closeSize: "20px",
    closeIconSize: "16px",
    iconSize: "20px",
    fontSize: "14px"
  }, XC = (e) => {
    const { textColor2: o, closeIconColor: t, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: l, errorColor: a, warningColor: s, popoverColor: c, boxShadow2: u, primaryColor: f, lineHeight: v, borderRadius: p, closeColorHover: d, closeColorPressed: g } = e;
    return Object.assign(Object.assign({}, KC), {
      closeBorderRadius: p,
      textColor: o,
      textColorInfo: o,
      textColorSuccess: o,
      textColorError: o,
      textColorWarning: o,
      textColorLoading: o,
      color: c,
      colorInfo: c,
      colorSuccess: c,
      colorError: c,
      colorWarning: c,
      colorLoading: c,
      boxShadow: u,
      boxShadowInfo: u,
      boxShadowSuccess: u,
      boxShadowError: u,
      boxShadowWarning: u,
      boxShadowLoading: u,
      iconColor: o,
      iconColorInfo: i,
      iconColorSuccess: l,
      iconColorWarning: s,
      iconColorError: a,
      iconColorLoading: f,
      closeColorHover: d,
      closeColorPressed: g,
      closeIconColor: t,
      closeIconColorHover: r,
      closeIconColorPressed: n,
      closeColorHoverInfo: d,
      closeColorPressedInfo: g,
      closeIconColorInfo: t,
      closeIconColorHoverInfo: r,
      closeIconColorPressedInfo: n,
      closeColorHoverSuccess: d,
      closeColorPressedSuccess: g,
      closeIconColorSuccess: t,
      closeIconColorHoverSuccess: r,
      closeIconColorPressedSuccess: n,
      closeColorHoverError: d,
      closeColorPressedError: g,
      closeIconColorError: t,
      closeIconColorHoverError: r,
      closeIconColorPressedError: n,
      closeColorHoverWarning: d,
      closeColorPressedWarning: g,
      closeIconColorWarning: t,
      closeIconColorHoverWarning: r,
      closeIconColorPressedWarning: n,
      closeColorHoverLoading: d,
      closeColorPressedLoading: g,
      closeIconColorLoading: t,
      closeIconColorHoverLoading: r,
      closeIconColorPressedLoading: n,
      loadingColor: f,
      lineHeight: v,
      borderRadius: p
    });
  }, YC = {
    name: "Message",
    common: F,
    self: XC
  }, qC = YC, JC = {
    name: "ButtonGroup",
    common: F
  }, ZC = JC, QC = {
    name: "InputNumber",
    common: F,
    peers: {
      Button: _e,
      Input: Ue
    },
    self(e) {
      const { textColorDisabled: o } = e;
      return {
        iconColorDisabled: o
      };
    }
  }, ey = QC, oy = {
    name: "Layout",
    common: F,
    peers: {
      Scrollbar: Ee
    },
    self(e) {
      const { textColor2: o, bodyColor: t, popoverColor: r, cardColor: n, dividerColor: i, scrollbarColor: l, scrollbarColorHover: a } = e;
      return {
        textColor: o,
        textColorInverted: o,
        color: t,
        colorEmbedded: t,
        headerColor: n,
        headerColorInverted: n,
        footerColor: n,
        footerColorInverted: n,
        headerBorderColor: i,
        headerBorderColorInverted: i,
        footerBorderColor: i,
        footerBorderColorInverted: i,
        siderBorderColor: i,
        siderBorderColorInverted: i,
        siderColor: n,
        siderColorInverted: n,
        siderToggleButtonBorder: "1px solid transparent",
        siderToggleButtonColor: r,
        siderToggleButtonIconColor: o,
        siderToggleButtonIconColorInverted: o,
        siderToggleBarColor: ee(t, l),
        siderToggleBarColorHover: ee(t, a),
        __invertScrollbar: "false"
      };
    }
  }, ty = oy, ry = (e) => {
    const { textColor2: o, cardColor: t, modalColor: r, popoverColor: n, dividerColor: i, borderRadius: l, fontSize: a, hoverColor: s } = e;
    return {
      textColor: o,
      color: t,
      colorHover: s,
      colorModal: r,
      colorHoverModal: ee(r, s),
      colorPopover: n,
      colorHoverPopover: ee(n, s),
      borderColor: i,
      borderColorModal: ee(r, i),
      borderColorPopover: ee(n, i),
      borderRadius: l,
      fontSize: a
    };
  }, ny = {
    name: "List",
    common: F,
    self: ry
  }, iy = ny, ly = {
    name: "LoadingBar",
    common: F,
    self(e) {
      const { primaryColor: o } = e;
      return {
        colorError: "red",
        colorLoading: o,
        height: "2px"
      };
    }
  }, ay = ly, sy = {
    name: "Log",
    common: F,
    peers: {
      Scrollbar: Ee,
      Code: Es
    },
    self(e) {
      const { textColor2: o, inputColor: t, fontSize: r, primaryColor: n } = e;
      return {
        loaderFontSize: r,
        loaderTextColor: o,
        loaderColor: t,
        loaderBorder: "1px solid #0000",
        loadingColor: n
      };
    }
  }, cy = sy, dy = {
    name: "Mention",
    common: F,
    peers: {
      InternalSelectMenu: Zt,
      Input: Ue
    },
    self(e) {
      const { boxShadow2: o } = e;
      return {
        menuBoxShadow: o
      };
    }
  }, uy = dy;
  function fy(e, o, t, r) {
    return {
      itemColorHoverInverted: "#0000",
      itemColorActiveInverted: o,
      itemColorActiveHoverInverted: o,
      itemColorActiveCollapsedInverted: o,
      itemTextColorInverted: e,
      itemTextColorHoverInverted: t,
      itemTextColorChildActiveInverted: t,
      itemTextColorChildActiveHoverInverted: t,
      itemTextColorActiveInverted: t,
      itemTextColorActiveHoverInverted: t,
      itemTextColorHorizontalInverted: e,
      itemTextColorHoverHorizontalInverted: t,
      itemTextColorChildActiveHorizontalInverted: t,
      itemTextColorChildActiveHoverHorizontalInverted: t,
      itemTextColorActiveHorizontalInverted: t,
      itemTextColorActiveHoverHorizontalInverted: t,
      itemIconColorInverted: e,
      itemIconColorHoverInverted: t,
      itemIconColorActiveInverted: t,
      itemIconColorActiveHoverInverted: t,
      itemIconColorChildActiveInverted: t,
      itemIconColorChildActiveHoverInverted: t,
      itemIconColorCollapsedInverted: e,
      itemIconColorHorizontalInverted: e,
      itemIconColorHoverHorizontalInverted: t,
      itemIconColorActiveHorizontalInverted: t,
      itemIconColorActiveHoverHorizontalInverted: t,
      itemIconColorChildActiveHorizontalInverted: t,
      itemIconColorChildActiveHoverHorizontalInverted: t,
      arrowColorInverted: e,
      arrowColorHoverInverted: t,
      arrowColorActiveInverted: t,
      arrowColorActiveHoverInverted: t,
      arrowColorChildActiveInverted: t,
      arrowColorChildActiveHoverInverted: t,
      groupTextColorInverted: r
    };
  }
  const hy = (e) => {
    const { borderRadius: o, textColor3: t, primaryColor: r, textColor2: n, textColor1: i, fontSize: l, dividerColor: a, hoverColor: s, primaryColorHover: c } = e;
    return Object.assign({
      borderRadius: o,
      color: "#0000",
      groupTextColor: t,
      itemColorHover: s,
      itemColorActive: D(r, { alpha: 0.1 }),
      itemColorActiveHover: D(r, { alpha: 0.1 }),
      itemColorActiveCollapsed: D(r, { alpha: 0.1 }),
      itemTextColor: n,
      itemTextColorHover: n,
      itemTextColorActive: r,
      itemTextColorActiveHover: r,
      itemTextColorChildActive: r,
      itemTextColorChildActiveHover: r,
      itemTextColorHorizontal: n,
      itemTextColorHoverHorizontal: c,
      itemTextColorActiveHorizontal: r,
      itemTextColorActiveHoverHorizontal: r,
      itemTextColorChildActiveHorizontal: r,
      itemTextColorChildActiveHoverHorizontal: r,
      itemIconColor: i,
      itemIconColorHover: i,
      itemIconColorActive: r,
      itemIconColorActiveHover: r,
      itemIconColorChildActive: r,
      itemIconColorChildActiveHover: r,
      itemIconColorCollapsed: i,
      itemIconColorHorizontal: i,
      itemIconColorHoverHorizontal: c,
      itemIconColorActiveHorizontal: r,
      itemIconColorActiveHoverHorizontal: r,
      itemIconColorChildActiveHorizontal: r,
      itemIconColorChildActiveHoverHorizontal: r,
      itemHeight: "42px",
      arrowColor: n,
      arrowColorHover: n,
      arrowColorActive: r,
      arrowColorActiveHover: r,
      arrowColorChildActive: r,
      arrowColorChildActiveHover: r,
      colorInverted: "#0000",
      borderColorHorizontal: "#0000",
      fontSize: l,
      dividerColor: a
    }, fy("#BBB", r, "#FFF", "#AAA"));
  }, py = {
    name: "Menu",
    common: F,
    peers: {
      Tooltip: Lr,
      Dropdown: di
    },
    self(e) {
      const { primaryColor: o, primaryColorSuppl: t } = e, r = hy(e);
      return r.itemColorActive = D(o, { alpha: 0.15 }), r.itemColorActiveHover = D(o, { alpha: 0.15 }), r.itemColorActiveCollapsed = D(o, {
        alpha: 0.15
      }), r.itemColorActiveInverted = t, r.itemColorActiveHoverInverted = t, r.itemColorActiveCollapsedInverted = t, r;
    }
  }, vy = py, gy = {
    titleFontSize: "18px",
    backSize: "22px"
  };
  function my(e) {
    const { textColor1: o, textColor2: t, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: l, primaryColorPressed: a } = e;
    return Object.assign(Object.assign({}, gy), { titleFontWeight: i, fontSize: n, titleTextColor: o, backColor: t, backColorHover: l, backColorPressed: a, subtitleTextColor: r });
  }
  const by = {
    name: "PageHeader",
    common: F,
    self: my
  }, xy = {
    iconSize: "22px"
  }, Cy = (e) => {
    const { fontSize: o, warningColor: t } = e;
    return Object.assign(Object.assign({}, xy), { fontSize: o, iconColor: t });
  }, yy = {
    name: "Popconfirm",
    common: F,
    peers: {
      Button: _e,
      Popover: nt
    },
    self: Cy
  }, Sy = yy, wy = (e) => {
    const { infoColor: o, successColor: t, warningColor: r, errorColor: n, textColor2: i, progressRailColor: l, fontSize: a, fontWeight: s } = e;
    return {
      fontSize: a,
      fontSizeCircle: "28px",
      fontWeightCircle: s,
      railColor: l,
      railHeight: "8px",
      iconSizeCircle: "36px",
      iconSizeLine: "18px",
      iconColor: o,
      iconColorInfo: o,
      iconColorSuccess: t,
      iconColorWarning: r,
      iconColorError: n,
      textColorCircle: i,
      textColorLineInner: "rgb(255, 255, 255)",
      textColorLineOuter: i,
      fillColor: o,
      fillColorInfo: o,
      fillColorSuccess: t,
      fillColorWarning: r,
      fillColorError: n,
      lineBgProcessing: "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"
    };
  }, $y = {
    name: "Progress",
    common: F,
    self(e) {
      const o = wy(e);
      return o.textColorLineInner = "rgb(0, 0, 0)", o.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", o;
    }
  }, Vs = $y, Py = {
    name: "Rate",
    common: F,
    self(e) {
      const { railColor: o } = e;
      return {
        itemColor: o,
        itemColorActive: "#CCAA33",
        itemSize: "20px",
        sizeSmall: "16px",
        sizeMedium: "20px",
        sizeLarge: "24px"
      };
    }
  }, Ty = Py, zy = {
    titleFontSizeSmall: "26px",
    titleFontSizeMedium: "32px",
    titleFontSizeLarge: "40px",
    titleFontSizeHuge: "48px",
    fontSizeSmall: "14px",
    fontSizeMedium: "14px",
    fontSizeLarge: "15px",
    fontSizeHuge: "16px",
    iconSizeSmall: "64px",
    iconSizeMedium: "80px",
    iconSizeLarge: "100px",
    iconSizeHuge: "125px",
    iconColor418: void 0,
    iconColor404: void 0,
    iconColor403: void 0,
    iconColor500: void 0
  }, Iy = (e) => {
    const { textColor2: o, textColor1: t, errorColor: r, successColor: n, infoColor: i, warningColor: l, lineHeight: a, fontWeightStrong: s } = e;
    return Object.assign(Object.assign({}, zy), { lineHeight: a, titleFontWeight: s, titleTextColor: t, textColor: o, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: l });
  }, My = {
    name: "Result",
    common: F,
    self: Iy
  }, ky = My, Oy = {
    railHeight: "4px",
    railWidthVertical: "4px",
    handleSize: "18px",
    dotHeight: "8px",
    dotWidth: "8px",
    dotBorderRadius: "4px"
  }, Ey = {
    name: "Slider",
    common: F,
    self(e) {
      const o = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: t, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: l, cardColor: a, borderRadius: s, fontSize: c, opacityDisabled: u } = e;
      return Object.assign(Object.assign({}, Oy), { fontSize: c, markFontSize: c, railColor: t, railColorHover: t, fillColor: n, fillColorHover: n, opacityDisabled: u, handleColor: "#FFF", dotColor: a, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: o, indicatorTextColor: l, indicatorBorderRadius: s, dotBorder: `2px solid ${t}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
    }
  }, _y = Ey, Dy = (e) => {
    const { opacityDisabled: o, heightTiny: t, heightSmall: r, heightMedium: n, heightLarge: i, heightHuge: l, primaryColor: a, fontSize: s } = e;
    return {
      fontSize: s,
      textColor: a,
      sizeTiny: t,
      sizeSmall: r,
      sizeMedium: n,
      sizeLarge: i,
      sizeHuge: l,
      color: a,
      opacitySpinning: o
    };
  }, Hy = {
    name: "Spin",
    common: F,
    self: Dy
  }, By = Hy, Ay = (e) => {
    const { textColor2: o, textColor3: t, fontSize: r, fontWeight: n } = e;
    return {
      labelFontSize: r,
      labelFontWeight: n,
      valueFontWeight: n,
      valueFontSize: "24px",
      labelTextColor: t,
      valuePrefixTextColor: o,
      valueSuffixTextColor: o,
      valueTextColor: o
    };
  }, Ry = {
    name: "Statistic",
    common: F,
    self: Ay
  }, Fy = Ry, Ly = {
    stepHeaderFontSizeSmall: "14px",
    stepHeaderFontSizeMedium: "16px",
    indicatorIndexFontSizeSmall: "14px",
    indicatorIndexFontSizeMedium: "16px",
    indicatorSizeSmall: "22px",
    indicatorSizeMedium: "28px",
    indicatorIconSizeSmall: "14px",
    indicatorIconSizeMedium: "18px"
  }, Wy = (e) => {
    const { fontWeightStrong: o, baseColor: t, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: l, textColor2: a } = e;
    return Object.assign(Object.assign({}, Ly), { stepHeaderFontWeight: o, indicatorTextColorProcess: t, indicatorTextColorWait: r, indicatorTextColorFinish: n, indicatorTextColorError: i, indicatorBorderColorProcess: n, indicatorBorderColorWait: r, indicatorBorderColorFinish: n, indicatorBorderColorError: i, indicatorColorProcess: n, indicatorColorWait: "#0000", indicatorColorFinish: "#0000", indicatorColorError: "#0000", splitorColorProcess: r, splitorColorWait: r, splitorColorFinish: n, splitorColorError: r, headerTextColorProcess: l, headerTextColorWait: r, headerTextColorFinish: r, headerTextColorError: i, descriptionTextColorProcess: a, descriptionTextColorWait: r, descriptionTextColorFinish: r, descriptionTextColorError: i });
  }, Ny = {
    name: "Steps",
    common: F,
    self: Wy
  }, jy = Ny, Vy = {
    buttonHeightSmall: "14px",
    buttonHeightMedium: "18px",
    buttonHeightLarge: "22px",
    buttonWidthSmall: "14px",
    buttonWidthMedium: "18px",
    buttonWidthLarge: "22px",
    buttonWidthPressedSmall: "20px",
    buttonWidthPressedMedium: "24px",
    buttonWidthPressedLarge: "28px",
    railHeightSmall: "18px",
    railHeightMedium: "22px",
    railHeightLarge: "26px",
    railWidthSmall: "32px",
    railWidthMedium: "40px",
    railWidthLarge: "48px"
  }, Uy = {
    name: "Switch",
    common: F,
    self(e) {
      const { primaryColorSuppl: o, opacityDisabled: t, borderRadius: r, primaryColor: n, textColor2: i, baseColor: l } = e, a = "rgba(255, 255, 255, .20)";
      return Object.assign(Object.assign({}, Vy), { iconColor: l, textColor: i, loadingColor: o, opacityDisabled: t, railColor: a, railColorActive: o, buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", buttonColor: "#FFF", railBorderRadiusSmall: r, railBorderRadiusMedium: r, railBorderRadiusLarge: r, buttonBorderRadiusSmall: r, buttonBorderRadiusMedium: r, buttonBorderRadiusLarge: r, boxShadowFocus: `0 0 8px 0 ${D(n, { alpha: 0.3 })}` });
    }
  }, Gy = Uy, Ky = {
    thPaddingSmall: "6px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "6px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px"
  }, Xy = (e) => {
    const { dividerColor: o, cardColor: t, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: l, textColor1: a, textColor2: s, borderRadius: c, fontWeightStrong: u, lineHeight: f, fontSizeSmall: v, fontSizeMedium: p, fontSizeLarge: d } = e;
    return Object.assign(Object.assign({}, Ky), {
      fontSizeSmall: v,
      fontSizeMedium: p,
      fontSizeLarge: d,
      lineHeight: f,
      borderRadius: c,
      borderColor: ee(t, o),
      borderColorModal: ee(r, o),
      borderColorPopover: ee(n, o),
      tdColor: t,
      tdColorModal: r,
      tdColorPopover: n,
      tdColorStriped: ee(t, l),
      tdColorStripedModal: ee(r, l),
      tdColorStripedPopover: ee(n, l),
      thColor: ee(t, i),
      thColorModal: ee(r, i),
      thColorPopover: ee(n, i),
      thTextColor: a,
      tdTextColor: s,
      thFontWeight: u
    });
  }, Yy = {
    name: "Table",
    common: F,
    self: Xy
  }, qy = Yy, Jy = {
    tabFontSizeSmall: "14px",
    tabFontSizeMedium: "14px",
    tabFontSizeLarge: "16px",
    tabGapSmallLine: "36px",
    tabGapMediumLine: "36px",
    tabGapLargeLine: "36px",
    tabPaddingSmallLine: "6px 0",
    tabPaddingMediumLine: "10px 0",
    tabPaddingLargeLine: "14px 0",
    tabPaddingVerticalSmallLine: "0 6px",
    tabPaddingVerticalMediumLine: "0 10px",
    tabPaddingVerticalLargeLine: "0 14px",
    tabGapSmallBar: "36px",
    tabGapMediumBar: "36px",
    tabGapLargeBar: "36px",
    tabPaddingSmallBar: "4px 0",
    tabPaddingMediumBar: "6px 0",
    tabPaddingLargeBar: "10px 0",
    tabPaddingVerticalSmallBar: "0 4px",
    tabPaddingVerticalMediumBar: "0 6px ",
    tabPaddingVerticalLargeBar: "0 10px ",
    tabGapSmallCard: "4px",
    tabGapMediumCard: "4px",
    tabGapLargeCard: "4px",
    tabPaddingSmallCard: "6px 10px",
    tabPaddingMediumCard: "8px 12px",
    tabPaddingLargeCard: "8px 16px",
    tabPaddingSmallSegment: "4px 0",
    tabPaddingMediumSegment: "6px 0",
    tabPaddingLargeSegment: "8px 0",
    tabPaddingVerticalLargeSegment: "0 8px",
    tabPaddingVerticalSmallCard: "10px 6px",
    tabPaddingVerticalMediumCard: "12px 8px",
    tabPaddingVerticalLargeCard: "16px 8px",
    tabPaddingVerticalSmallSegment: "0 4px",
    tabPaddingVerticalMediumSegment: "0 6px",
    tabGapSmallSegment: "0",
    tabGapMediumSegment: "0",
    tabGapLargeSegment: "0",
    panePaddingSmall: "8px 0 0 0",
    panePaddingMedium: "12px 0 0 0",
    panePaddingLarge: "16px 0 0 0",
    closeSize: "18px",
    closeIconSize: "14px"
  }, Zy = (e) => {
    const { textColor2: o, primaryColor: t, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, tabColor: c, baseColor: u, dividerColor: f, fontWeight: v, textColor1: p, borderRadius: d, fontSize: g, fontWeightStrong: x } = e;
    return Object.assign(Object.assign({}, Jy), {
      colorSegment: c,
      tabFontSizeCard: g,
      tabTextColorLine: p,
      tabTextColorActiveLine: t,
      tabTextColorHoverLine: t,
      tabTextColorDisabledLine: r,
      tabTextColorSegment: p,
      tabTextColorActiveSegment: o,
      tabTextColorHoverSegment: o,
      tabTextColorDisabledSegment: r,
      tabTextColorBar: p,
      tabTextColorActiveBar: t,
      tabTextColorHoverBar: t,
      tabTextColorDisabledBar: r,
      tabTextColorCard: p,
      tabTextColorHoverCard: p,
      tabTextColorActiveCard: t,
      tabTextColorDisabledCard: r,
      barColor: t,
      closeIconColor: n,
      closeIconColorHover: i,
      closeIconColorPressed: l,
      closeColorHover: a,
      closeColorPressed: s,
      closeBorderRadius: d,
      tabColor: c,
      tabColorSegment: u,
      tabBorderColor: f,
      tabFontWeightActive: v,
      tabFontWeight: v,
      tabBorderRadius: d,
      paneTextColor: o,
      fontWeightStrong: x
    });
  }, Qy = {
    name: "Tabs",
    common: F,
    self(e) {
      const o = Zy(e), { inputColor: t } = e;
      return o.colorSegment = t, o.tabColorSegment = t, o;
    }
  }, e1 = Qy, o1 = (e) => {
    const { textColor1: o, textColor2: t, fontWeightStrong: r, fontSize: n } = e;
    return {
      fontSize: n,
      titleTextColor: o,
      textColor: t,
      titleFontWeight: r
    };
  }, t1 = {
    name: "Thing",
    common: F,
    self: o1
  }, r1 = t1, n1 = {
    titleMarginMedium: "0 0 6px 0",
    titleMarginLarge: "-2px 0 6px 0",
    titleFontSizeMedium: "14px",
    titleFontSizeLarge: "16px",
    iconSizeMedium: "14px",
    iconSizeLarge: "14px"
  }, i1 = {
    name: "Timeline",
    common: F,
    self(e) {
      const { textColor3: o, infoColorSuppl: t, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: l, textColor2: a, railColor: s, fontWeightStrong: c, fontSize: u } = e;
      return Object.assign(Object.assign({}, n1), { contentFontSize: u, titleFontWeight: c, circleBorder: `2px solid ${o}`, circleBorderInfo: `2px solid ${t}`, circleBorderError: `2px solid ${r}`, circleBorderSuccess: `2px solid ${n}`, circleBorderWarning: `2px solid ${i}`, iconColor: o, iconColorInfo: t, iconColorError: r, iconColorSuccess: n, iconColorWarning: i, titleTextColor: l, contentTextColor: a, metaTextColor: o, lineColor: s });
    }
  }, l1 = i1, a1 = {
    extraFontSizeSmall: "12px",
    extraFontSizeMedium: "12px",
    extraFontSizeLarge: "14px",
    titleFontSizeSmall: "14px",
    titleFontSizeMedium: "16px",
    titleFontSizeLarge: "16px",
    closeSize: "20px",
    closeIconSize: "16px",
    headerHeightSmall: "44px",
    headerHeightMedium: "44px",
    headerHeightLarge: "50px"
  }, s1 = {
    name: "Transfer",
    common: F,
    peers: {
      Checkbox: Tt,
      Scrollbar: Ee,
      Input: Ue,
      Empty: rt,
      Button: _e
    },
    self(e) {
      const { fontWeight: o, fontSizeLarge: t, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: l, borderRadius: a, inputColor: s, tableHeaderColor: c, textColor1: u, textColorDisabled: f, textColor2: v, textColor3: p, hoverColor: d, closeColorHover: g, closeColorPressed: x, closeIconColor: h, closeIconColorHover: w, closeIconColorPressed: _, dividerColor: I } = e;
      return Object.assign(Object.assign({}, a1), {
        itemHeightSmall: l,
        itemHeightMedium: l,
        itemHeightLarge: i,
        fontSizeSmall: n,
        fontSizeMedium: r,
        fontSizeLarge: t,
        borderRadius: a,
        dividerColor: I,
        borderColor: "#0000",
        listColor: s,
        headerColor: c,
        titleTextColor: u,
        titleTextColorDisabled: f,
        extraTextColor: p,
        extraTextColorDisabled: f,
        itemTextColor: v,
        itemTextColorDisabled: f,
        itemColorPending: d,
        titleFontWeight: o,
        closeColorHover: g,
        closeColorPressed: x,
        closeIconColor: h,
        closeIconColorHover: w,
        closeIconColorPressed: _
      });
    }
  }, c1 = s1, d1 = (e) => {
    const { borderRadiusSmall: o, hoverColor: t, pressedColor: r, primaryColor: n, textColor3: i, textColor2: l, textColorDisabled: a, fontSize: s } = e;
    return {
      fontSize: s,
      nodeBorderRadius: o,
      nodeColorHover: t,
      nodeColorPressed: r,
      nodeColorActive: D(n, { alpha: 0.1 }),
      arrowColor: i,
      nodeTextColor: l,
      nodeTextColorDisabled: a,
      loadingColor: n,
      dropMarkColor: n
    };
  }, u1 = {
    name: "Tree",
    common: F,
    peers: {
      Checkbox: Tt,
      Scrollbar: Ee,
      Empty: rt
    },
    self(e) {
      const { primaryColor: o } = e, t = d1(e);
      return t.nodeColorActive = D(o, { alpha: 0.15 }), t;
    }
  }, Us = u1, f1 = {
    name: "TreeSelect",
    common: F,
    peers: {
      Tree: Us,
      Empty: rt,
      InternalSelection: ci
    }
  }, h1 = f1, p1 = {
    headerFontSize1: "30px",
    headerFontSize2: "22px",
    headerFontSize3: "18px",
    headerFontSize4: "16px",
    headerFontSize5: "16px",
    headerFontSize6: "16px",
    headerMargin1: "28px 0 20px 0",
    headerMargin2: "28px 0 20px 0",
    headerMargin3: "28px 0 20px 0",
    headerMargin4: "28px 0 18px 0",
    headerMargin5: "28px 0 18px 0",
    headerMargin6: "28px 0 18px 0",
    headerPrefixWidth1: "16px",
    headerPrefixWidth2: "16px",
    headerPrefixWidth3: "12px",
    headerPrefixWidth4: "12px",
    headerPrefixWidth5: "12px",
    headerPrefixWidth6: "12px",
    headerBarWidth1: "4px",
    headerBarWidth2: "4px",
    headerBarWidth3: "3px",
    headerBarWidth4: "3px",
    headerBarWidth5: "3px",
    headerBarWidth6: "3px",
    pMargin: "16px 0 16px 0",
    liMargin: ".25em 0 0 0",
    olPadding: "0 0 0 2em",
    ulPadding: "0 0 0 2em"
  }, Gs = (e) => {
    const { primaryColor: o, textColor2: t, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: l, dividerColor: a, fontWeightStrong: s, textColor1: c, textColor3: u, infoColor: f, warningColor: v, errorColor: p, successColor: d, codeColor: g } = e;
    return Object.assign(Object.assign({}, p1), { aTextColor: o, blockquoteTextColor: t, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: l, liTextColor: t, liLineHeight: n, liFontSize: i, hrColor: a, headerFontWeight: s, headerTextColor: c, pTextColor: t, pTextColor1Depth: c, pTextColor2Depth: t, pTextColor3Depth: u, pLineHeight: n, pFontSize: i, headerBarColor: o, headerBarColorPrimary: o, headerBarColorInfo: f, headerBarColorError: p, headerBarColorWarning: v, headerBarColorSuccess: d, textColor: t, textColor1Depth: c, textColor2Depth: t, textColor3Depth: u, textColorPrimary: o, textColorInfo: f, textColorSuccess: d, textColorWarning: v, textColorError: p, codeTextColor: t, codeColor: g, codeBorder: "1px solid #0000" });
  }, v1 = {
    name: "Typography",
    common: lo,
    self: Gs
  }, g1 = v1, m1 = {
    name: "Typography",
    common: F,
    self: Gs
  }, b1 = m1, x1 = (e) => {
    const { iconColor: o, primaryColor: t, errorColor: r, textColor2: n, successColor: i, opacityDisabled: l, actionColor: a, borderColor: s, hoverColor: c, lineHeight: u, borderRadius: f, fontSize: v } = e;
    return {
      fontSize: v,
      lineHeight: u,
      borderRadius: f,
      draggerColor: a,
      draggerBorder: `1px dashed ${s}`,
      draggerBorderHover: `1px dashed ${t}`,
      itemColorHover: c,
      itemColorHoverError: D(r, {
        alpha: 0.06
      }),
      itemTextColor: n,
      itemTextColorError: r,
      itemTextColorSuccess: i,
      itemIconColor: o,
      itemDisabledOpacity: l,
      itemBorderImageCardError: `1px solid ${r}`,
      itemBorderImageCard: `1px solid ${s}`
    };
  }, C1 = {
    name: "Upload",
    common: F,
    peers: {
      Button: _e,
      Progress: Vs
    },
    self(e) {
      const { errorColor: o } = e, t = x1(e);
      return t.itemColorHoverError = D(o, {
        alpha: 0.09
      }), t;
    }
  }, y1 = C1, S1 = {
    name: "Watermark",
    common: F,
    self(e) {
      const { fontFamily: o } = e;
      return {
        fontFamily: o
      };
    }
  }, w1 = S1, $1 = {
    name: "Row",
    common: F
  }, P1 = $1, T1 = {
    name: "Image",
    common: F,
    peers: {
      Tooltip: Lr
    },
    self: (e) => {
      const { textColor2: o } = e;
      return {
        toolbarIconColor: o,
        toolbarColor: "rgba(0, 0, 0, .35)",
        toolbarBoxShadow: "none",
        toolbarBorderRadius: "24px"
      };
    }
  }, z1 = {
    extraFontSize: "12px",
    width: "440px"
  }, I1 = {
    name: "Transfer",
    common: F,
    peers: {
      Checkbox: Tt,
      Scrollbar: Ee,
      Input: Ue,
      Empty: rt,
      Button: _e
    },
    self(e) {
      const { iconColorDisabled: o, iconColor: t, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: l, heightLarge: a, heightMedium: s, heightSmall: c, borderRadius: u, inputColor: f, tableHeaderColor: v, textColor1: p, textColorDisabled: d, textColor2: g, hoverColor: x } = e;
      return Object.assign(Object.assign({}, z1), {
        itemHeightSmall: c,
        itemHeightMedium: s,
        itemHeightLarge: a,
        fontSizeSmall: l,
        fontSizeMedium: i,
        fontSizeLarge: n,
        borderRadius: u,
        borderColor: "#0000",
        listColor: f,
        headerColor: v,
        titleTextColor: p,
        titleTextColorDisabled: d,
        extraTextColor: g,
        filterDividerColor: "#0000",
        itemTextColor: g,
        itemTextColorDisabled: d,
        itemColorPending: x,
        titleFontWeight: r,
        iconColor: t,
        iconColorDisabled: o
      });
    }
  }, M1 = I1, k1 = {
    name: "Skeleton",
    common: F,
    self(e) {
      const { heightSmall: o, heightMedium: t, heightLarge: r, borderRadius: n } = e;
      return {
        color: "rgba(255, 255, 255, 0.12)",
        colorEnd: "rgba(255, 255, 255, 0.18)",
        borderRadius: n,
        heightSmall: o,
        heightMedium: t,
        heightLarge: r
      };
    }
  }, O1 = Q("h", `
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [V("&:first-child", {
    marginTop: 0
  }), le("prefix-bar", {
    position: "relative",
    paddingLeft: "var(--n-prefix-width)"
  }, [le("align-text", {
    paddingLeft: 0
  }, [V("&::before", {
    left: "calc(-1 * var(--n-prefix-width))"
  })]), V("&::before", `
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `), V("&::before", {
    backgroundColor: "var(--n-bar-color)"
  })])]), E1 = Object.assign(Object.assign({}, pe.props), { type: {
    type: String,
    default: "default"
  }, prefix: String, alignText: Boolean }), zt = (e) => ie({
    name: `H${e}`,
    props: E1,
    setup(o) {
      const { mergedClsPrefixRef: t, inlineThemeDisabled: r } = tt(o), n = pe("Typography", "-h", O1, g1, o, t), i = E(() => {
        const { type: a } = o, { common: { cubicBezierEaseInOut: s }, self: { headerFontWeight: c, headerTextColor: u, [ce("headerPrefixWidth", e)]: f, [ce("headerFontSize", e)]: v, [ce("headerMargin", e)]: p, [ce("headerBarWidth", e)]: d, [ce("headerBarColor", a)]: g } } = n.value;
        return {
          "--n-bezier": s,
          "--n-font-size": v,
          "--n-margin": p,
          "--n-bar-color": g,
          "--n-bar-width": d,
          "--n-font-weight": c,
          "--n-text-color": u,
          "--n-prefix-width": f
        };
      }), l = r ? To(`h${e}`, E(() => o.type[0]), i, o) : void 0;
      return {
        mergedClsPrefix: t,
        cssVars: r ? void 0 : i,
        themeClass: l == null ? void 0 : l.themeClass,
        onRender: l == null ? void 0 : l.onRender
      };
    },
    render() {
      var o;
      const { prefix: t, alignText: r, mergedClsPrefix: n, cssVars: i, $slots: l } = this;
      return (o = this.onRender) === null || o === void 0 || o.call(this), S(`h${e}`, {
        class: [
          `${n}-h`,
          `${n}-h${e}`,
          this.themeClass,
          {
            [`${n}-h--prefix-bar`]: t,
            [`${n}-h--align-text`]: r
          }
        ],
        style: i
      }, l);
    }
  });
  zt("1");
  zt("2");
  const fn = zt("3");
  zt("4");
  zt("5");
  zt("6");
  const _1 = () => ({}), D1 = {
    name: "Equation",
    common: F,
    self: _1
  }, H1 = D1, Ks = {
    name: "dark",
    common: F,
    Alert: C0,
    Anchor: $0,
    AutoComplete: E0,
    Avatar: ks,
    AvatarGroup: A0,
    BackTop: L0,
    Badge: N0,
    Breadcrumb: G0,
    Button: _e,
    ButtonGroup: ZC,
    Calendar: Q0,
    Card: Os,
    Carousel: sx,
    Cascader: px,
    Checkbox: Tt,
    Code: Es,
    Collapse: bx,
    CollapseTransition: yx,
    ColorPicker: tx,
    DataTable: Kx,
    DatePicker: sC,
    Descriptions: fC,
    Dialog: Ns,
    Divider: yC,
    Drawer: $C,
    Dropdown: di,
    DynamicInput: zC,
    DynamicTags: OC,
    Element: _C,
    Empty: rt,
    Ellipsis: Rs,
    Equation: H1,
    Form: AC,
    GradientText: FC,
    Icon: Qx,
    IconWrapper: NC,
    Image: T1,
    Input: Ue,
    InputNumber: ey,
    LegacyTransfer: M1,
    Layout: ty,
    List: iy,
    LoadingBar: ay,
    Log: cy,
    Menu: vy,
    Mention: uy,
    Message: qC,
    Modal: bC,
    Notification: GC,
    PageHeader: by,
    Pagination: Bs,
    Popconfirm: Sy,
    Popover: nt,
    Popselect: _s,
    Progress: Vs,
    Radio: Fs,
    Rate: Ty,
    Result: ky,
    Row: P1,
    Scrollbar: Ee,
    Select: Hs,
    Skeleton: k1,
    Slider: _y,
    Space: js,
    Spin: By,
    Statistic: Fy,
    Steps: jy,
    Switch: Gy,
    Table: qy,
    Tabs: e1,
    Tag: Ts,
    Thing: r1,
    TimePicker: Ws,
    Timeline: l1,
    Tooltip: Lr,
    Transfer: c1,
    Tree: Us,
    TreeSelect: h1,
    Typography: b1,
    Upload: y1,
    Watermark: w1
  }, B1 = "/editor/leftarrow.svg", A1 = "/editor/circle.svg", R1 = "/editor/rightarrow.svg", Pl = {
    blue: [21, 23, 11, 8, 13, 5, 6, 31, 15, 20, 36, 12, 45, 9, 46, 10, 3, 4, 2],
    neutrals: [
      18,
      70,
      83,
      65,
      24,
      86,
      64,
      63,
      27,
      80,
      81,
      28,
      84,
      29,
      62,
      30,
      16,
      87,
      61,
      33,
      60,
      17,
      34,
      69,
      59,
      37,
      71,
      79,
      58,
      57,
      56,
      55,
      88,
      73,
      39,
      89,
      54,
      77,
      72,
      0,
      42,
      43,
      85,
      75,
      19,
      53,
      22,
      52,
      66,
      51,
      1,
      74,
      82,
      7,
      50
    ],
    red: [25, 76, 26, 78, 32, 35, 38, 40, 41, 44, 47, 68, 49, 67]
  }, An = {
    blue: [68, 67, 21, 11, 4, 20, 8, 10, 40, 2, 5, 26],
    neutrals: [
      7,
      18,
      23,
      65,
      24,
      64,
      50,
      49,
      6,
      61,
      31,
      16,
      13,
      29,
      15,
      33,
      60,
      59,
      35,
      34,
      9,
      48,
      37,
      27,
      58,
      57,
      56,
      55,
      17,
      12,
      39,
      0,
      42,
      38,
      43,
      47,
      44,
      53,
      52,
      51,
      3,
      1,
      54,
      28,
      63,
      22,
      46,
      62,
      45,
      19
    ],
    red: [69, 66, 25, 32, 41, 30, 36]
  }, Tl = {
    blue: [
      21,
      23,
      11,
      25,
      8,
      28,
      26,
      13,
      30,
      5,
      16,
      6,
      31,
      32,
      15,
      20,
      12,
      40,
      41,
      44,
      9,
      46,
      10,
      3,
      4,
      2,
      1
    ],
    neutrals: [
      65,
      64,
      63,
      38,
      29,
      62,
      61,
      33,
      60,
      17,
      34,
      35,
      36,
      59,
      37,
      58,
      57,
      56,
      55,
      39,
      54,
      42,
      45,
      53,
      22,
      52,
      51,
      7,
      50,
      49,
      48
    ],
    red: [18, 24, 0, 43, 19, 47, 27]
  }, F1 = [
    { label: "Russia", value: 0 },
    { label: "Ukraine", value: 1 },
    { label: "USA", value: 2 },
    { label: "Turkey", value: 3 },
    { label: "UK", value: 4 },
    { label: "France", value: 5 },
    { label: "Germany", value: 6 },
    { label: "USAF Aggressors", value: 7 },
    { label: "Canada", value: 8 },
    { label: "Spain", value: 9 },
    { label: "The Netherlands", value: 10 },
    { label: "Belgium", value: 11 },
    { label: "Norway", value: 12 },
    { label: "Denmark", value: 13 },
    { label: "Israel", value: 15 },
    { label: "Georgia", value: 16 },
    { label: "Insurgents", value: 17 },
    { label: "Abkhazia", value: 18 },
    { label: "South Osetia", value: 19 },
    { label: "Italy", value: 20 },
    { label: "Australia", value: 21 },
    { label: "Switzerland", value: 22 },
    { label: "Austria", value: 23 },
    { label: "Belarus", value: 24 },
    { label: "Bulgaria", value: 25 },
    { label: "Czech Republic", value: 26 },
    { label: "China", value: 27 },
    { label: "Croatia", value: 28 },
    { label: "Egypt", value: 29 },
    { label: "Finland", value: 30 },
    { label: "Greece", value: 31 },
    { label: "Hungary", value: 32 },
    { label: "India", value: 33 },
    { label: "Iran", value: 34 },
    { label: "Iraq", value: 35 },
    { label: "Japan", value: 36 },
    { label: "Kazakhstan", value: 37 },
    { label: "North Korea", value: 38 },
    { label: "Pakistan", value: 39 },
    { label: "Poland", value: 40 },
    { label: "Romania", value: 41 },
    { label: "Saudi Arabia", value: 42 },
    { label: "Serbia", value: 43 },
    { label: "Slovakia", value: 44 },
    { label: "South Korea", value: 45 },
    { label: "Sweden", value: 46 },
    { label: "Syria", value: 47 },
    { label: "Yemen", value: 48 },
    { label: "Vietnam", value: 49 },
    { label: "Venezuela", value: 50 },
    { label: "Tunisia", value: 51 },
    { label: "Thailand", value: 52 },
    { label: "Sudan", value: 53 },
    { label: "Philippines", value: 54 },
    { label: "Morocco", value: 55 },
    { label: "Mexico", value: 56 },
    { label: "Malaysia", value: 57 },
    { label: "Libya", value: 58 },
    { label: "Jordan", value: 59 },
    { label: "Indonesia", value: 60 },
    { label: "Honduras", value: 61 },
    { label: "Ethiopia", value: 62 },
    { label: "Chile", value: 63 },
    { label: "Brazil", value: 64 },
    { label: "Bahrain", value: 65 },
    { label: "Third Reich", value: 66 },
    { label: "Yugoslavia", value: 67 },
    { label: "USSR", value: 68 },
    { label: "Italian Social Republic", value: 69 },
    { label: "Algeria", value: 70 },
    { label: "Kuwait", value: 71 },
    { label: "Qatar", value: 72 },
    { label: "Oman", value: 73 },
    { label: "United Arab Emirates", value: 74 },
    { label: "South Africa", value: 75 },
    { label: "Cuba", value: 76 },
    { label: "Portugal", value: 77 },
    { label: "GDR", value: 78 },
    { label: "Lebanon", value: 79 },
    { label: "CJTF Blue", value: 80 },
    { label: "CJTF Red", value: 81 },
    { label: "UN", value: 82 },
    { label: "Argentina", value: 83 },
    { label: "Cyprus", value: 84 },
    { label: "Slovenia", value: 85 },
    { label: "Bolivia", value: 86 },
    { label: "Ghana", value: 87 },
    { label: "Nigeria", value: 88 },
    { label: "Peru", value: 89 },
    { label: "Ecuador", value: 90 }
  ], L1 = Kl("coa", {
    state: () => ({
      coa: structuredClone(An)
    }),
    actions: {
      setAll(e) {
        this.coa = e;
      },
      getAll() {
        return this.coa;
      }
    }
  }), zl = R(Ks), W1 = R("Dark"), Il = {
    common: {
      bodyColor: "#23313f",
      cardColor: "#293949",
      railColor: "#555",
      primaryColorSuppl: "#fff"
    }
  }, N1 = Kl("theme", {
    state: () => ({
      theme: Ks
    }),
    actions: {
      setTheme(e) {
        zl.value = e;
      },
      setThemeOverrides(e) {
        Il.common = e.common;
      }
    },
    getters: {
      getTheme() {
        return zl.value;
      },
      getThemeOverrides() {
        return Il;
      },
      getSelectedTheme() {
        return W1.value;
      }
    }
  }), j1 = { class: "w-full h-full" }, V1 = { class: "flex flex-row justify-center p-5 relative" }, U1 = ["disabled"], G1 = /* @__PURE__ */ Te("img", { src: B1 }, null, -1), K1 = ["disabled"], X1 = /* @__PURE__ */ Te("img", { src: A1 }, null, -1), Y1 = ["disabled"], q1 = /* @__PURE__ */ Te("img", { src: R1 }, null, -1), J1 = { class: "m-5" }, Z1 = { class: "flex" }, Q1 = { class: "w-1/2 mr-4" }, eS = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80" }, oS = ["onClick"], tS = { class: "w-1/3 mr-4 text-sm" }, rS = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80" }, nS = ["onClick"], iS = { class: "w-1/2" }, lS = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80" }, aS = ["onClick"], sS = "Select a coalition preset", cS = /* @__PURE__ */ ie({
    __name: "CoalitionComponent",
    setup(e) {
      const o = L1(), t = E(() => o.coa.red), r = E(() => o.coa.blue), n = E(() => o.coa.neutrals), i = R({
        list: "red",
        index: 0
      }), l = (b) => {
        const $ = F1.find((z) => z.value === b);
        return $ ? $.label : null;
      }, a = (b, $) => {
        i.value.list = b, i.value.index = $;
      }, s = (b, $, z) => {
        if (!z)
          return;
        const y = {
          red: {
            list: t,
            sortedList: p
          },
          blue: {
            list: r,
            sortedList: d
          },
          neutral: {
            list: n,
            sortedList: g
          }
        }, C = y[b], P = y[$], A = C.sortedList.value[i.value.index], O = C.list.value.indexOf(A), N = C.list.value.splice(O, 1)[0];
        P.list.value.push(N), i.value.list = $, i.value.index = -1;
      }, c = () => {
        s(
          "blue",
          "red",
          i.value.list === "blue" && i.value.index >= 0 && r.value.length > 0
        ), s(
          "neutral",
          "red",
          i.value.list === "neutral" && i.value.index >= 0 && n.value.length > 0
        );
      }, u = () => {
        s(
          "red",
          "blue",
          i.value.list === "red" && i.value.index >= 0 && t.value.length > 0
        ), s(
          "neutral",
          "blue",
          i.value.list === "neutral" && i.value.index >= 0 && n.value.length > 0
        );
      }, f = () => {
        s(
          "red",
          "neutral",
          i.value.list === "red" && i.value.index >= 0 && t.value.length > 0
        ), s(
          "blue",
          "neutral",
          i.value.list === "blue" && i.value.index >= 0 && r.value.length > 0
        );
      }, v = (b) => b.value.slice().sort(($, z) => $ - z), p = E(() => v(t)), d = E(() => v(r)), g = E(() => v(n)), x = E(() => ({
        red: p.value,
        neutrals: g.value,
        blue: d.value
      })), h = E({
        get() {
          return JSON.stringify(o.coa) === JSON.stringify(Tl) ? "Modern" : JSON.stringify(o.coa) === JSON.stringify(Pl) ? "ColdWar" : JSON.stringify(o.coa) === JSON.stringify(An) ? "WW2" : "Custom";
        },
        set(b) {
          b === "Modern" ? o.setAll(structuredClone(Tl)) : b === "ColdWar" ? o.setAll(structuredClone(Pl)) : b === "WW2" ? o.setAll(structuredClone(An)) : (h.value = "Custom", o.setAll(structuredClone(x.value)));
        }
      }), w = [
        { label: "Modern", value: "Modern" },
        { label: "Cold War 1947-1991", value: "ColdWar" },
        { label: "WWII", value: "WW2" },
        { label: "Custom", value: "Custom" }
      ], _ = R(!0), I = R(!1), M = R(!1);
      return xe(() => i.value.list, (b) => {
        b === "red" ? (_.value = !0, I.value = !1, M.value = !1) : b === "neutral" ? (_.value = !1, I.value = !0, M.value = !1) : b === "blue" && (_.value = !1, I.value = !1, M.value = !0);
      }), (b, $) => (Eo(), Lo("div", j1, [
        Te("div", V1, [
          go(eo(Yx), {
            trigger: "hover",
            class: "w-full"
          }, {
            trigger: mo(() => [
              go(eo(kx), {
                value: h.value,
                "onUpdate:value": $[0] || ($[0] = (z) => h.value = z),
                options: w,
                class: "absolute left-0 ml-5 w-1/4"
              }, null, 8, ["value"])
            ]),
            default: mo(() => [
              xo(" " + Qt(sS))
            ]),
            _: 1
          }),
          Te("button", {
            onClick: c,
            disabled: _.value
          }, [
            go(eo(un), { size: "35" }, {
              default: mo(() => [
                G1
              ]),
              _: 1
            })
          ], 8, U1),
          Te("button", {
            onClick: f,
            disabled: I.value
          }, [
            go(eo(un), { size: "35" }, {
              default: mo(() => [
                X1
              ]),
              _: 1
            })
          ], 8, K1),
          Te("button", {
            onClick: u,
            disabled: M.value
          }, [
            go(eo(un), { size: "35" }, {
              default: mo(() => [
                q1
              ]),
              _: 1
            })
          ], 8, Y1)
        ]),
        Te("div", J1, [
          Te("div", Z1, [
            Te("div", Q1, [
              go(eo(fn), { class: "mb-3 text-lg" }, {
                default: mo(() => [
                  xo("Red")
                ]),
                _: 1
              }),
              Te("ul", eS, [
                (Eo(!0), Lo(oo, null, Wr(p.value, (z, y) => (Eo(), Lo("li", {
                  key: y,
                  class: Nr(["mb-2 cursor-pointer rounded text-sm", {
                    "bg-blue-200 pl-2 text-black text-sm": i.value.list === "red" && i.value.index === y
                  }]),
                  onClick: (C) => a("red", y)
                }, Qt(l(z)), 11, oS))), 128))
              ])
            ]),
            Te("div", tS, [
              go(eo(fn), { class: "mb-3 text-lg" }, {
                default: mo(() => [
                  xo("Neutral")
                ]),
                _: 1
              }),
              Te("ul", rS, [
                (Eo(!0), Lo(oo, null, Wr(g.value, (z, y) => (Eo(), Lo("li", {
                  key: y,
                  class: Nr(["mb-2 cursor-pointer rounded text-sm", {
                    "bg-blue-200 pl-2 text-black text-sm": i.value.list === "neutral" && i.value.index === y
                  }]),
                  onClick: (C) => a("neutral", y)
                }, Qt(l(z)), 11, nS))), 128))
              ])
            ]),
            Te("div", iS, [
              go(eo(fn), { class: "mb-3 text-lg" }, {
                default: mo(() => [
                  xo("Blue")
                ]),
                _: 1
              }),
              Te("ul", lS, [
                (Eo(!0), Lo(oo, null, Wr(d.value, (z, y) => (Eo(), Lo("li", {
                  key: y,
                  class: Nr(["mb-2 cursor-pointer rounded text-sm", {
                    "bg-blue-200 pl-2 text-black text-sm": i.value.list === "blue" && i.value.index === y
                  }]),
                  onClick: (C) => a("blue", y)
                }, Qt(l(z)), 11, aS))), 128))
              ])
            ])
          ])
        ])
      ]));
    }
  }), dS = /* @__PURE__ */ ie({
    __name: "App",
    setup(e) {
      const o = N1(), t = R(o.theme), r = R(o.getSelectedTheme), n = R(o.getThemeOverrides);
      return (i, l) => (Eo(), $c(eo(wx), {
        theme: r.value === "Dark" ? t.value : null,
        "theme-overrides": r.value === "Dark" ? n.value : null
      }, {
        default: mo(() => [
          go(cS)
        ]),
        _: 1
      }, 8, ["theme", "theme-overrides"]));
    }
  }), uS = qc(), Xs = Pc(dS);
  Xs.use(uS);
  Xs.mount("#app");
});
export default fS();
