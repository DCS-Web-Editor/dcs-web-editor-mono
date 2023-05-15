var gc = (e, o) => () => (o || e((o = { exports: {} }).exports, o), o.exports);
import { effectScope as Ml, ref as A, markRaw as qe, toRaw as kr, getCurrentInstance as Rn, inject as he, watch as xe, unref as Ee, reactive as mc, isRef as Ct, isReactive as Fn, toRef as se, nextTick as yt, computed as O, getCurrentScope as bc, onScopeDispose as xc, toRefs as ui, createTextVNode as xo, Fragment as to, Comment as Ln, isVNode as Cc, defineComponent as ie, readonly as hn, onMounted as Ue, onBeforeUnmount as Qe, provide as ro, withDirectives as Yt, h as y, Teleport as yc, renderSlot as kl, onActivated as Ol, onDeactivated as El, mergeProps as Or, onBeforeMount as Wn, watchEffect as Co, Transition as St, vShow as _l, cloneVNode as Sc, openBlock as Eo, createElementBlock as Lo, createElementVNode as Te, createVNode as mo, withCtx as bo, toDisplayString as Qt, renderList as Wr, normalizeClass as Nr, createBlock as wc, createApp as $c } from "vue";
var cS = gc((Be, Ae) => {
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
  function Pc() {
    return Hl().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function Hl() {
    return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
  }
  const Tc = typeof Proxy == "function", zc = "devtools-plugin:setup", Ic = "plugin:settings:set";
  let dt, pn;
  function Mc() {
    var e;
    return dt !== void 0 || (typeof window < "u" && window.performance ? (dt = !0, pn = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (dt = !0, pn = global.perf_hooks.performance) : dt = !1), dt;
  }
  function kc() {
    return Mc() ? pn.now() : Date.now();
  }
  class Oc {
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
          return kc();
        }
      }, t && t.on(Ic, (l, a) => {
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
    const t = e, r = Hl(), n = Pc(), i = Tc && t.enableEarlyProxy;
    if (n && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
      n.emit(zc, e, o);
    else {
      const l = i ? new Oc(t, n) : null;
      (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
        pluginDescriptor: t,
        setupFn: o,
        proxy: l
      }), l && o(l.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.35
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let Ht;
  const Nt = (e) => Ht = e, Al = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
    /* istanbul ignore next */
    Symbol()
  );
  function qo(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var no;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(no || (no = {}));
  const Er = typeof window < "u", At = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && Er, fi = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
  function Ec(e, { autoBom: o = !1 } = {}) {
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
    typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Fl ? _c : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in ur ? Dc : (
        // Fallback to using FileReader and a popup
        Hc
      )
    )
  ) : () => {
  };
  function _c(e, o = "download", t) {
    const r = document.createElement("a");
    r.download = o, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? Rl(r.href) ? Nn(e, o, t) : (r.target = "_blank", dr(r)) : dr(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
      URL.revokeObjectURL(r.href);
    }, 4e4), setTimeout(function() {
      dr(r);
    }, 0));
  }
  function Dc(e, o = "download", t) {
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
      navigator.msSaveOrOpenBlob(Ec(e, t), o);
  }
  function Hc(e, o, t, r) {
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
  async function Bc(e) {
    if (!Wl())
      try {
        await navigator.clipboard.writeText(JSON.stringify(e.state.value)), be("Global state copied to clipboard.");
      } catch (o) {
        if (Nl(o))
          return;
        be("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Ac(e) {
    if (!Wl())
      try {
        e.state.value = JSON.parse(await navigator.clipboard.readText()), be("Global state pasted from clipboard.");
      } catch (o) {
        if (Nl(o))
          return;
        be("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Rc(e) {
    try {
      Ll(new Blob([JSON.stringify(e.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (o) {
      be("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  let vo;
  function Fc() {
    vo || (vo = document.createElement("input"), vo.type = "file", vo.accept = ".json");
    function e() {
      return new Promise((o, t) => {
        vo.onchange = async () => {
          const r = vo.files;
          if (!r)
            return o(null);
          const n = r.item(0);
          return o(n ? { text: await n.text(), file: n } : null);
        }, vo.oncancel = () => o(null), vo.onerror = t, vo.click();
      });
    }
    return e;
  }
  async function Lc(e) {
    try {
      const t = await (await Fc())();
      if (!t)
        return;
      const { text: r, file: n } = t;
      e.state.value = JSON.parse(r), be(`Global state imported from "${n.name}".`);
    } catch (o) {
      be("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  function Ye(e) {
    return {
      _custom: {
        display: e
      }
    };
  }
  const jl = "🍍 Pinia (root)", vn = "_root";
  function Wc(e) {
    return jn(e) ? {
      id: vn,
      label: jl
    } : {
      id: e.$id,
      label: e.$id
    };
  }
  function Nc(e) {
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
  function jc(e) {
    return e ? Array.isArray(e) ? e.reduce((o, t) => (o.keys.push(t.key), o.operations.push(t.type), o.oldValue[t.key] = t.oldValue, o.newValue[t.key] = t.newValue, o), {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    }) : {
      operation: Ye(e.type),
      key: Ye(e.key),
      oldValue: e.oldValue,
      newValue: e.newValue
    } : {};
  }
  function Vc(e) {
    switch (e) {
      case no.direct:
        return "mutation";
      case no.patchFunction:
        return "$patch";
      case no.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let vt = !0;
  const fr = [], No = "pinia:mutations", we = "pinia", { assign: Uc } = Object, gr = (e) => "🍍 " + e;
  function Gc(e, o) {
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
              Bc(o);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await Ac(o), t.sendInspectorTree(we), t.sendInspectorState(we);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              Rc(o);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await Lc(o), t.sendInspectorTree(we), t.sendInspectorState(we);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (r) => {
              const n = o._s.get(r);
              n ? n._isOptionsAPI ? (n.$reset(), be(`Store "${r}" reset.`)) : be(`Cannot reset "${r}" store because it's a setup store.`, "warn") : be(`Cannot reset "${r}" store because it wasn't found.`, "warn");
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
          n = n.concat(Array.from(o._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : jl.toLowerCase().includes(r.filter.toLowerCase())) : n).map(Wc);
        }
      }), t.on.getInspectorState((r) => {
        if (r.app === e && r.inspectorId === we) {
          const n = r.nodeId === vn ? o : o._s.get(r.nodeId);
          if (!n)
            return;
          n && (r.state = Nc(n));
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
  function Kc(e, o) {
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
              store: Ye(o.$id),
              action: Ye(s),
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
                store: Ye(o.$id),
                action: Ye(s),
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
                store: Ye(o.$id),
                action: Ye(s),
                args: c,
                error: f
              },
              groupId: u
            }
          });
        });
      }, !0), o._customProperties.forEach((l) => {
        xe(() => Ee(o[l]), (a, s) => {
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
          title: Vc(a),
          data: Uc({ store: Ye(o.$id) }, jc(l)),
          groupId: Vo
        };
        Vo = void 0, a === no.patchFunction ? c.subtitle = "⤵️" : a === no.patchObject ? c.subtitle = "🧩" : l && !Array.isArray(l) && (c.subtitle = l.type), l && (c.data["rawEvent(s)"] = {
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
      o._hotUpdate = qe((l) => {
        n(l), t.addTimelineEvent({
          layerId: No,
          event: {
            time: r(),
            title: "🔥 " + o.$id,
            subtitle: "HMR update",
            data: {
              store: Ye(o.$id),
              info: Ye("HMR update")
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
  function Xc({ app: e, store: o, options: t }) {
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
      Kc(
        e,
        // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
        o
      );
    }
  }
  function Yc() {
    const e = Ml(!0), o = e.run(() => A({}));
    let t = [], r = [];
    const n = qe({
      install(i) {
        Nt(n), n._a = i, i.provide(Al, n), i.config.globalProperties.$pinia = n, At && Gc(i, n), r.forEach((l) => t.push(l)), r = [];
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
    return At && typeof Proxy < "u" && n.use(Xc), n;
  }
  function Ul(e, o) {
    for (const t in o) {
      const r = o[t];
      if (!(t in e))
        continue;
      const n = e[t];
      qo(n) && qo(r) && !Ct(r) && !Fn(r) ? e[t] = Ul(n, r) : e[t] = r;
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
    return !t && bc() && xc(n), n;
  }
  function ut(e, ...o) {
    e.slice().forEach((t) => {
      t(...o);
    });
  }
  function gn(e, o) {
    e instanceof Map && o instanceof Map && o.forEach((t, r) => e.set(r, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
    for (const t in o) {
      if (!o.hasOwnProperty(t))
        continue;
      const r = o[t], n = e[t];
      qo(n) && qo(r) && e.hasOwnProperty(t) && !Ct(r) && !Fn(r) ? e[t] = gn(n, r) : e[t] = r;
    }
    return e;
  }
  const qc = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
    /* istanbul ignore next */
    Symbol()
  );
  function Jc(e) {
    return !qo(e) || !e.hasOwnProperty(qc);
  }
  const { assign: je } = Object;
  function vi(e) {
    return !!(Ct(e) && e.effect);
  }
  function gi(e, o, t, r) {
    const { state: n, actions: i, getters: l } = o, a = t.state.value[e];
    let s;
    function c() {
      !a && (process.env.NODE_ENV === "production" || !r) && (t.state.value[e] = n ? n() : {});
      const u = process.env.NODE_ENV !== "production" && r ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        ui(A(n ? n() : {}).value)
      ) : ui(t.state.value[e]);
      return je(u, i, Object.keys(l || {}).reduce((f, v) => (process.env.NODE_ENV !== "production" && v in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), f[v] = qe(O(() => {
        Nt(t);
        const p = t._s.get(e);
        return l[v].call(p, p);
      })), f), {}));
    }
    return s = mn(e, c, o, t, r, !0), s;
  }
  function mn(e, o, t = {}, r, n, i) {
    let l;
    const a = je({ actions: {} }, t);
    if (process.env.NODE_ENV !== "production" && !r._e.active)
      throw new Error("Pinia destroyed");
    const s = {
      deep: !0
      // flush: 'post',
    };
    process.env.NODE_ENV !== "production" && !Dl && (s.onTrigger = (S) => {
      c ? p = S : c == !1 && !x._hotUpdating && (Array.isArray(p) ? p.push(S) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
    });
    let c, u, f = qe([]), v = qe([]), p;
    const d = r.state.value[e];
    !i && !d && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
    const g = A({});
    let b;
    function h(S) {
      let C;
      c = u = !1, process.env.NODE_ENV !== "production" && (p = []), typeof S == "function" ? (S(r.state.value[e]), C = {
        type: no.patchFunction,
        storeId: e,
        events: p
      }) : (gn(r.state.value[e], S), C = {
        type: no.patchObject,
        payload: S,
        storeId: e,
        events: p
      });
      const P = b = Symbol();
      yt().then(() => {
        b === P && (c = !0);
      }), u = !0, ut(f, C, r.state.value[e]);
    }
    const $ = i ? function() {
      const { state: C } = t, P = C ? C() : {};
      this.$patch((z) => {
        je(z, P);
      });
    } : (
      /* istanbul ignore next */
      process.env.NODE_ENV !== "production" ? () => {
        throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
      } : Gl
    );
    function H() {
      l.stop(), f = [], v = [], r._s.delete(e);
    }
    function I(S, C) {
      return function() {
        Nt(r);
        const P = Array.from(arguments), z = [], L = [];
        function _(G) {
          z.push(G);
        }
        function N(G) {
          L.push(G);
        }
        ut(v, {
          args: P,
          name: S,
          store: x,
          after: _,
          onError: N
        });
        let U;
        try {
          U = C.apply(this && this.$id === e ? this : x, P);
        } catch (G) {
          throw ut(L, G), G;
        }
        return U instanceof Promise ? U.then((G) => (ut(z, G), G)).catch((G) => (ut(L, G), Promise.reject(G))) : (ut(z, U), U);
      };
    }
    const M = /* @__PURE__ */ qe({
      actions: {},
      getters: {},
      state: [],
      hotState: g
    }), E = {
      _p: r,
      // _s: scope,
      $id: e,
      $onAction: pi.bind(null, v),
      $patch: h,
      $reset: $,
      $subscribe(S, C = {}) {
        const P = pi(f, S, C.detached, () => z()), z = l.run(() => xe(() => r.state.value[e], (L) => {
          (C.flush === "sync" ? u : c) && S({
            storeId: e,
            type: no.direct,
            events: p
          }, L);
        }, je({}, s, C)));
        return P;
      },
      $dispose: H
    }, x = mc(process.env.NODE_ENV !== "production" || At ? je(
      {
        _hmrPayload: M,
        _customProperties: qe(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      E
      // must be added later
      // setupStore
    ) : E);
    r._s.set(e, x);
    const w = r._e.run(() => (l = Ml(), l.run(() => o())));
    for (const S in w) {
      const C = w[S];
      if (Ct(C) && !vi(C) || Fn(C))
        process.env.NODE_ENV !== "production" && n ? er(g.value, S, se(w, S)) : i || (d && Jc(C) && (Ct(C) ? C.value = d[S] : gn(C, d[S])), r.state.value[e][S] = C), process.env.NODE_ENV !== "production" && M.state.push(S);
      else if (typeof C == "function") {
        const P = process.env.NODE_ENV !== "production" && n ? C : I(S, C);
        w[S] = P, process.env.NODE_ENV !== "production" && (M.actions[S] = C), a.actions[S] = C;
      } else
        process.env.NODE_ENV !== "production" && vi(C) && (M.getters[S] = i ? (
          // @ts-expect-error
          t.getters[S]
        ) : C, Er && (w._getters || // @ts-expect-error: same
        (w._getters = qe([]))).push(S));
    }
    if (je(x, w), je(kr(x), w), Object.defineProperty(x, "$state", {
      get: () => process.env.NODE_ENV !== "production" && n ? g.value : r.state.value[e],
      set: (S) => {
        if (process.env.NODE_ENV !== "production" && n)
          throw new Error("cannot set hotState");
        h((C) => {
          je(C, S);
        });
      }
    }), process.env.NODE_ENV !== "production" && (x._hotUpdate = qe((S) => {
      x._hotUpdating = !0, S._hmrPayload.state.forEach((C) => {
        if (C in x.$state) {
          const P = S.$state[C], z = x.$state[C];
          typeof P == "object" && qo(P) && qo(z) ? Ul(P, z) : S.$state[C] = z;
        }
        er(x, C, se(S.$state, C));
      }), Object.keys(x.$state).forEach((C) => {
        C in S.$state || jr(x, C);
      }), c = !1, u = !1, r.state.value[e] = se(S._hmrPayload, "hotState"), u = !0, yt().then(() => {
        c = !0;
      });
      for (const C in S._hmrPayload.actions) {
        const P = S[C];
        er(x, C, I(C, P));
      }
      for (const C in S._hmrPayload.getters) {
        const P = S._hmrPayload.getters[C], z = i ? (
          // special handling of options api
          O(() => (Nt(r), P.call(x, x)))
        ) : P;
        er(x, C, z);
      }
      Object.keys(x._hmrPayload.getters).forEach((C) => {
        C in S._hmrPayload.getters || jr(x, C);
      }), Object.keys(x._hmrPayload.actions).forEach((C) => {
        C in S._hmrPayload.actions || jr(x, C);
      }), x._hmrPayload = S._hmrPayload, x._getters = S._getters, x._hotUpdating = !1;
    })), At) {
      const S = {
        writable: !0,
        configurable: !0,
        // avoid warning on devtools trying to display this property
        enumerable: !1
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((C) => {
        Object.defineProperty(x, C, je({ value: x[C] }, S));
      });
    }
    return r._p.forEach((S) => {
      if (At) {
        const C = l.run(() => S({
          store: x,
          app: r._a,
          pinia: r,
          options: a
        }));
        Object.keys(C || {}).forEach((P) => x._customProperties.add(P)), je(x, C);
      } else
        je(x, l.run(() => S({
          store: x,
          app: r._a,
          pinia: r,
          options: a
        })));
    }), process.env.NODE_ENV !== "production" && x.$state && typeof x.$state == "object" && typeof x.$state.constructor == "function" && !x.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${x.$id}".`), d && i && t.hydrate && t.hydrate(x.$state, d), c = !0, u = !0, x;
  }
  function Kl(e, o, t) {
    let r, n;
    const i = typeof o == "function";
    typeof e == "string" ? (r = e, n = i ? t : o) : (n = e, r = e.id);
    function l(a, s) {
      const c = Rn();
      if (a = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (process.env.NODE_ENV === "test" && Ht && Ht._testing ? null : a) || c && he(Al, null), a && Nt(a), process.env.NODE_ENV !== "production" && !Ht)
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      a = Ht, a._s.has(r) || (i ? mn(r, o, n, a) : gi(r, n, a), process.env.NODE_ENV !== "production" && (l._pinia = a));
      const u = a._s.get(r);
      if (process.env.NODE_ENV !== "production" && s) {
        const f = "__hot:" + r, v = i ? mn(f, o, n, a, !0) : gi(f, je({}, n), a, !0);
        s._hotUpdate(v), delete a.state.value[f], a._s.delete(f);
      }
      if (process.env.NODE_ENV !== "production" && Er && c && c.proxy && // avoid adding stores that are just built for hot module replacement
      !s) {
        const f = c.proxy, v = "_pStores" in f ? f._pStores : f._pStores = {};
        v[r] = u;
      }
      return u;
    }
    return l.$id = r, l;
  }
  let mr = [];
  const Xl = /* @__PURE__ */ new WeakMap();
  function Zc() {
    mr.forEach((e) => e(...Xl.get(e))), mr = [];
  }
  function Yl(e, ...o) {
    Xl.set(e, o), !mr.includes(e) && mr.push(e) === 1 && requestAnimationFrame(Zc);
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
  }, wt = "^\\s*", $t = "\\s*$", Uo = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Go = "([0-9A-Fa-f])", Ko = "([0-9A-Fa-f]{2})", Qc = new RegExp(`${wt}rgb\\s*\\(${Uo},${Uo},${Uo}\\)${$t}`), ed = new RegExp(`${wt}rgba\\s*\\(${Uo},${Uo},${Uo},${Uo}\\)${$t}`), od = new RegExp(`${wt}#${Go}${Go}${Go}${$t}`), td = new RegExp(`${wt}#${Ko}${Ko}${Ko}${$t}`), rd = new RegExp(`${wt}#${Go}${Go}${Go}${Go}${$t}`), nd = new RegExp(`${wt}#${Ko}${Ko}${Ko}${Ko}${$t}`);
  function Oe(e) {
    return parseInt(e, 16);
  }
  function yo(e) {
    try {
      let o;
      if (o = td.exec(e))
        return [Oe(o[1]), Oe(o[2]), Oe(o[3]), 1];
      if (o = Qc.exec(e))
        return [$e(o[1]), $e(o[5]), $e(o[9]), 1];
      if (o = ed.exec(e))
        return [
          $e(o[1]),
          $e(o[5]),
          $e(o[9]),
          Rt(o[13])
        ];
      if (o = od.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          1
        ];
      if (o = nd.exec(e))
        return [
          Oe(o[1]),
          Oe(o[2]),
          Oe(o[3]),
          Rt(Oe(o[4]) / 255)
        ];
      if (o = rd.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          Rt(Oe(o[4] + o[4]) / 255)
        ];
      if (e in mi)
        return yo(mi[e]);
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (o) {
      throw o;
    }
  }
  function id(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function xn(e, o, t, r) {
    return `rgba(${$e(e)}, ${$e(o)}, ${$e(t)}, ${id(r)})`;
  }
  function Ur(e, o, t, r, n) {
    return $e((e * o * (1 - r) + t * r) / n);
  }
  function Q(e, o) {
    Array.isArray(e) || (e = yo(e)), Array.isArray(o) || (o = yo(o));
    const t = e[3], r = o[3], n = Rt(t + r - t * r);
    return xn(Ur(e[0], t, o[0], r, n), Ur(e[1], t, o[1], r, n), Ur(e[2], t, o[2], r, n), n);
  }
  function D(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : yo(e);
    return o.alpha ? xn(t, r, n, o.alpha) : xn(t, r, n, i);
  }
  function ve(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : yo(e), { lightness: l = 1, alpha: a = 1 } = o;
    return ld([t * l, r * l, n * l, i * a]);
  }
  function Rt(e) {
    const o = Math.round(Number(e) * 100) / 100;
    return o > 1 ? 1 : o < 0 ? 0 : o;
  }
  function $e(e) {
    const o = Math.round(Number(e));
    return o > 255 ? 255 : o < 0 ? 0 : o;
  }
  function ld(e) {
    const [o, t, r] = e;
    return 3 in e ? `rgba(${$e(o)}, ${$e(t)}, ${$e(r)}, ${Rt(e[3])})` : `rgba(${$e(o)}, ${$e(t)}, ${$e(r)}, 1)`;
  }
  function ad(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  }
  function sd(e, o = [], t) {
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
        if (r.type === to) {
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
  function cd(e) {
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
    return e.some((o) => Cc(o) ? !(o.type === Ln || o.type === to && !_r(o.children)) : !0) ? e : null;
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
  }), dd = /^(\d|\.)+$/, yi = /(\d|\.)+/;
  function hr(e, { c: o = 1, offset: t = 0, attachPx: r = !0 } = {}) {
    if (typeof e == "number") {
      const n = (e + t) * o;
      return n === 0 ? "0" : `${n}px`;
    } else if (typeof e == "string")
      if (dd.test(e)) {
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
  function ud(e) {
    let o = 0;
    for (let t = 0; t < e.length; ++t)
      e[t] === "&" && ++o;
    return o;
  }
  const Jl = /\s*,(?![^(]*\))\s*/g, fd = /\s+/g;
  function hd(e, o) {
    const t = [];
    return o.split(Jl).forEach((r) => {
      let n = ud(r);
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
  function pd(e, o) {
    const t = [];
    return o.split(Jl).forEach((r) => {
      e.forEach((n) => {
        t.push((n && n + " ") + r);
      });
    }), t;
  }
  function vd(e) {
    let o = [""];
    return e.forEach((t) => {
      t = t && t.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      t && (t.includes("&") ? o = hd(o, t) : o = pd(o, t));
    }), o.join(", ").replace(fd, " ");
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
  function gd(e) {
    const o = document.createElement("style");
    return o.setAttribute("cssr-id", e), o;
  }
  function tr(e) {
    return e ? /^\s*@(s|m)/.test(e) : !1;
  }
  const md = /[A-Z]/g;
  function Zl(e) {
    return e.replace(md, (o) => "-" + o.toLowerCase());
  }
  function bd(e, o = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((t) => o + `  ${Zl(t[0])}: ${t[1]};`).join(`
`) + `
` + o + "}" : `: ${e};`;
  }
  function xd(e, o, t) {
    return typeof e == "function" ? e({
      context: o.context,
      props: t
    }) : e;
  }
  function $i(e, o, t, r) {
    if (!o)
      return "";
    const n = xd(o, t, r);
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
      a = Zl(a), s != null && l.push(`  ${a}${bd(s)}`);
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
    const s = vd(o), c = $i(s, e.props, r, n);
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
  function Cd(e, o, t) {
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
  function yd(e, o, t, r, n, i, l, a, s) {
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
    const f = u ?? gd(t);
    if (c === void 0 && (c = o.render(r)), f.textContent = c, u !== null)
      return u;
    if (a) {
      const v = document.head.querySelector(`meta[name="${a}"]`);
      if (v)
        return document.head.insertBefore(f, v), Pi(o.els, f), f;
    }
    return n ? document.head.insertBefore(f, document.head.querySelector("style, link")) : document.head.appendChild(f), Pi(o.els, f), f;
  }
  function Sd(e) {
    return ea(this, this.instance, e);
  }
  function wd(e = {}) {
    const { id: o, ssr: t, props: r, head: n = !1, silent: i = !1, force: l = !1, anchorMetaName: a } = e;
    return yd(this.instance, this, o, r, n, i, l, a, t);
  }
  function $d(e = {}) {
    const { id: o } = e;
    Cd(this.instance, this, o);
  }
  const rr = function(e, o, t, r) {
    return {
      instance: e,
      $: o,
      props: t,
      children: r,
      els: [],
      render: Sd,
      mount: wd,
      unmount: $d
    };
  }, Pd = function(e, o, t, r) {
    return Array.isArray(o) ? rr(e, { $: null }, null, o) : Array.isArray(t) ? rr(e, o, null, t) : Array.isArray(r) ? rr(e, o, t, r) : rr(e, o, t, null);
  };
  function oa(e = {}) {
    let o = null;
    const t = {
      c: (...r) => Pd(t, ...r),
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
  function Td(e, o) {
    if (e === void 0)
      return !1;
    if (o) {
      const { context: { ids: t } } = o;
      return t.has(e);
    }
    return Dr(e) !== null;
  }
  function zd(e) {
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
      let g, b;
      return {
        before(h) {
          g = h.bem.b, b = h.bem.els, h.bem.els = null;
        },
        after(h) {
          h.bem.b = g, h.bem.els = b;
        },
        $({ context: h, props: $ }) {
          return d = typeof d == "string" ? d : d({ context: h, props: $ }), h.bem.b = d, `${($ == null ? void 0 : $.bPrefix) || o}${h.bem.b}`;
        }
      };
    }
    function a(d) {
      let g;
      return {
        before(b) {
          g = b.bem.els;
        },
        after(b) {
          b.bem.els = g;
        },
        $({ context: b, props: h }) {
          return d = typeof d == "string" ? d : d({ context: b, props: h }), b.bem.els = d.split(",").map(($) => $.trim()), b.bem.els.map(($) => `${(h == null ? void 0 : h.bPrefix) || o}${b.bem.b}${t}${$}`).join(", ");
        }
      };
    }
    function s(d) {
      return {
        $({ context: g, props: b }) {
          d = typeof d == "string" ? d : d({ context: g, props: b });
          const h = d.split(",").map((I) => I.trim());
          function $(I) {
            return h.map((M) => `&${(b == null ? void 0 : b.bPrefix) || o}${g.bem.b}${I !== void 0 ? `${t}${I}` : ""}${r}${M}`).join(", ");
          }
          const H = g.bem.els;
          if (H !== null) {
            if (process.env.NODE_ENV !== "production" && H.length >= 2)
              throw Error(`[css-render/plugin-bem]: m(${d}) is invalid, using modifier inside multiple elements is not allowed`);
            return $(H[0]);
          } else
            return $();
        }
      };
    }
    function c(d) {
      return {
        $({ context: g, props: b }) {
          d = typeof d == "string" ? d : d({ context: g, props: b });
          const h = g.bem.els;
          if (process.env.NODE_ENV !== "production" && h !== null && h.length >= 2)
            throw Error(`[css-render/plugin-bem]: notM(${d}) is invalid, using modifier inside multiple elements is not allowed`);
          return `&:not(${(b == null ? void 0 : b.bPrefix) || o}${g.bem.b}${h !== null && h.length > 0 ? `${t}${h[0]}` : ""}${r}${d})`;
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
  const Id = "n", Md = `.${Id}-`, kd = "__", Od = "--", ta = oa(), ra = zd({
    blockPrefix: Md,
    elementPrefix: kd,
    modifierPrefix: Od
  });
  ta.use(ra);
  const { c: V, find: fS } = ta, { cB: Z, cE: Y, cM: le, cNotM: Je } = ra, Ed = (...e) => V(">", [Z(...e)]);
  let Kr;
  function _d() {
    return Kr === void 0 && (Kr = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Kr;
  }
  const Dd = /* @__PURE__ */ new WeakSet();
  function Hd(e) {
    Dd.add(e);
  }
  function Bd(e) {
    const o = A(!!e.value);
    if (o.value)
      return hn(o);
    const t = xe(e, (r) => {
      r && (o.value = !0, t());
    });
    return hn(o);
  }
  function Ze(e) {
    const o = O(e), t = A(o.value);
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
  const Ad = typeof window < "u";
  let bt, Ft;
  const Rd = () => {
    var e, o;
    bt = Ad ? (o = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || o === void 0 ? void 0 : o.ready : void 0, Ft = !1, bt !== void 0 ? bt.then(() => {
      Ft = !0;
    }) : Ft = !0;
  };
  Rd();
  function Fd(e) {
    if (Ft)
      return;
    let o = !1;
    Ue(() => {
      Ft || bt == null || bt.then(() => {
        o || e();
      });
    }), Qe(() => {
      o = !0;
    });
  }
  function pr(e) {
    return e.composedPath()[0];
  }
  const Ld = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function Wd(e, o, t) {
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
    const r = Ld[e];
    let n = r.get(o);
    n === void 0 && r.set(o, n = /* @__PURE__ */ new WeakMap());
    let i = n.get(t);
    return i === void 0 && n.set(t, i = Wd(e, o, t)), i;
  }
  function Nd(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = na(e, o, t);
      return Object.keys(n).forEach((i) => {
        ze(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function jd(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = na(e, o, t);
      return Object.keys(n).forEach((i) => {
        me(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Vd() {
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
    function n(x, w, S) {
      const C = x[w];
      return x[w] = function() {
        return S.apply(x, arguments), C.apply(x, arguments);
      }, x;
    }
    function i(x, w) {
      x[w] = Event.prototype[w];
    }
    const l = /* @__PURE__ */ new WeakMap(), a = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function s() {
      var x;
      return (x = l.get(this)) !== null && x !== void 0 ? x : null;
    }
    function c(x, w) {
      a !== void 0 && Object.defineProperty(x, "currentTarget", {
        configurable: !0,
        enumerable: !0,
        get: w ?? a.get
      });
    }
    const u = {
      bubble: {},
      capture: {}
    }, f = {};
    function v() {
      const x = function(w) {
        const { type: S, eventPhase: C, bubbles: P } = w, z = pr(w);
        if (C === 2)
          return;
        const L = C === 1 ? "capture" : "bubble";
        let _ = z;
        const N = [];
        for (; _ === null && (_ = window), N.push(_), _ !== window; )
          _ = _.parentNode || null;
        const U = u.capture[S], G = u.bubble[S];
        if (n(w, "stopPropagation", t), n(w, "stopImmediatePropagation", r), c(w, s), L === "capture") {
          if (U === void 0)
            return;
          for (let oe = N.length - 1; oe >= 0 && !e.has(w); --oe) {
            const k = N[oe], W = U.get(k);
            if (W !== void 0) {
              l.set(w, k);
              for (const re of W) {
                if (o.has(w))
                  break;
                re(w);
              }
            }
            if (oe === 0 && !P && G !== void 0) {
              const re = G.get(k);
              if (re !== void 0)
                for (const fe of re) {
                  if (o.has(w))
                    break;
                  fe(w);
                }
            }
          }
        } else if (L === "bubble") {
          if (G === void 0)
            return;
          for (let oe = 0; oe < N.length && !e.has(w); ++oe) {
            const k = N[oe], W = G.get(k);
            if (W !== void 0) {
              l.set(w, k);
              for (const re of W) {
                if (o.has(w))
                  break;
                re(w);
              }
            }
          }
        }
        i(w, "stopPropagation"), i(w, "stopImmediatePropagation"), c(w);
      };
      return x.displayName = "evtdUnifiedHandler", x;
    }
    function p() {
      const x = function(w) {
        const { type: S, eventPhase: C } = w;
        if (C !== 2)
          return;
        const P = f[S];
        P !== void 0 && P.forEach((z) => z(w));
      };
      return x.displayName = "evtdUnifiedWindowEventHandler", x;
    }
    const d = v(), g = p();
    function b(x, w) {
      const S = u[x];
      return S[w] === void 0 && (S[w] = /* @__PURE__ */ new Map(), window.addEventListener(w, d, x === "capture")), S[w];
    }
    function h(x) {
      return f[x] === void 0 && (f[x] = /* @__PURE__ */ new Set(), window.addEventListener(x, g)), f[x];
    }
    function $(x, w) {
      let S = x.get(w);
      return S === void 0 && x.set(w, S = /* @__PURE__ */ new Set()), S;
    }
    function H(x, w, S, C) {
      const P = u[w][S];
      if (P !== void 0) {
        const z = P.get(x);
        if (z !== void 0 && z.has(C))
          return !0;
      }
      return !1;
    }
    function I(x, w) {
      const S = f[x];
      return !!(S !== void 0 && S.has(w));
    }
    function M(x, w, S, C) {
      let P;
      if (typeof C == "object" && C.once === !0 ? P = (U) => {
        E(x, w, P, C), S(U);
      } : P = S, Nd(x, w, P, C))
        return;
      const L = C === !0 || typeof C == "object" && C.capture === !0 ? "capture" : "bubble", _ = b(L, x), N = $(_, w);
      if (N.has(P) || N.add(P), w === window) {
        const U = h(x);
        U.has(P) || U.add(P);
      }
    }
    function E(x, w, S, C) {
      if (jd(x, w, S, C))
        return;
      const z = C === !0 || typeof C == "object" && C.capture === !0, L = z ? "capture" : "bubble", _ = b(L, x), N = $(_, w);
      if (w === window && !H(w, z ? "bubble" : "capture", x, S) && I(x, S)) {
        const G = f[x];
        G.delete(S), G.size === 0 && (window.removeEventListener(x, g), f[x] = void 0);
      }
      N.has(S) && N.delete(S), N.size === 0 && _.delete(w), _.size === 0 && (window.removeEventListener(x, d, L === "capture"), u[L][x] = void 0);
    }
    return {
      on: M,
      off: E
    };
  }
  const { on: ze, off: me } = Vd();
  function wn(e, o) {
    return xe(e, (t) => {
      t !== void 0 && (o.value = t);
    }), O(() => e.value === void 0 ? o.value : e.value);
  }
  function Hr() {
    const e = A(!1);
    return Ue(() => {
      e.value = !0;
    }), hn(e);
  }
  function ia(e, o) {
    return O(() => {
      for (const t of o)
        if (e[t] !== void 0)
          return e[t];
      return e[o[o.length - 1]];
    });
  }
  const Ud = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  !window.MSStream;
  function Gd() {
    return Ud;
  }
  const Un = "n-internal-select-menu", la = "n-internal-select-menu-body", aa = "n-modal-body", sa = "n-drawer-body", ca = "n-popover-body", da = "__disabled__";
  function So(e) {
    const o = he(aa, null), t = he(sa, null), r = he(ca, null), n = he(la, null), i = A();
    if (typeof document < "u") {
      i.value = document.fullscreenElement;
      const l = () => {
        i.value = document.fullscreenElement;
      };
      Ue(() => {
        ze("fullscreenchange", document, l);
      }), Qe(() => {
        me("fullscreenchange", document, l);
      });
    }
    return Ze(() => {
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
        if (r.type === to) {
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
  function Kd(e, o) {
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
  function Xd(e) {
    return e.nodeType === 9 ? null : e.parentNode;
  }
  function fa(e) {
    if (e === null)
      return null;
    const o = Xd(e);
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
  const Yd = ie({
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
      ro("VBinder", (o = Rn()) === null || o === void 0 ? void 0 : o.proxy);
      const t = he("VBinder", null), r = A(null), n = (h) => {
        r.value = h, t && e.syncTargetWithParent && t.setTargetRef(h);
      };
      let i = [];
      const l = () => {
        let h = r.value;
        for (; h = fa(h), h !== null; )
          i.push(h);
        for (const $ of i)
          ze("scroll", $, f, !0);
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
        p.size === 0 && ze("resize", window, b), p.has(h) || p.add(h);
      }, g = (h) => {
        p.has(h) && p.delete(h), p.size === 0 && me("resize", window, b);
      }, b = () => {
        p.forEach((h) => h());
      };
      return Qe(() => {
        me("resize", window, b), a();
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
  }), ha = Yd, pa = ie({
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
  }), ft = "@@mmoContext", qd = {
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
  }, Jd = qd, ht = "@@coContext", Zd = {
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
  }, Cr = Zd;
  function Qd(e, o) {
    console.error(`[vdirs/${e}]: ${o}`);
  }
  class eu {
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
      r.has(o) ? r.delete(o) : t === void 0 && Qd("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
  const Yr = new eu(), pt = "@@ziContext", ou = {
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
  }, va = ou, ga = Symbol("@css-render/vue3-ssr");
  function tu(e, o) {
    return `<style cssr-id="${e}">
${o}
</style>`;
  }
  function ru(e, o) {
    const t = he(ga, null);
    if (t === null) {
      console.error("[css-render/vue3-ssr]: no ssr context found.");
      return;
    }
    const { styles: r, ids: n } = t;
    n.has(e) || r !== null && (n.add(e), r.push(tu(e, o)));
  }
  const nu = typeof document < "u";
  function Zo() {
    if (nu)
      return;
    const e = he(ga, null);
    if (e !== null)
      return {
        adapter: ru,
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
  class iu {
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
  const lu = ie({
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
        showTeleport: Bd(se(e, "show")),
        mergedTo: O(() => {
          const { to: o } = e;
          return o ?? "body";
        })
      };
    },
    render() {
      return this.showTeleport ? this.disabled ? $n("lazy-teleport", this.$slots) : y(yc, {
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
  }, au = {
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
  }, su = {
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
  }, cu = {
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
  function du(e, o, t, r, n, i) {
    if (!n || i)
      return { placement: e, top: 0, left: 0 };
    const [l, a] = e.split("-");
    let s = a ?? "center", c = {
      top: 0,
      left: 0
    };
    const u = (p, d, g) => {
      let b = 0, h = 0;
      const $ = t[p] - o[d] - o[p];
      return $ > 0 && r && (g ? h = Oi[d] ? $ : -$ : b = Oi[d] ? $ : -$), {
        left: b,
        top: h
      };
    }, f = l === "left" || l === "right";
    if (s !== "center") {
      const p = cu[e], d = nr[p], g = qr[p];
      if (t[g] > o[g]) {
        if (
          // current space is not enough
          // ----------[ target ]---------|
          // -------[     follower        ]
          o[p] + o[g] < t[g]
        ) {
          const b = (t[g] - o[g]) / 2;
          o[p] < b || o[d] < b ? o[p] < o[d] ? (s = ki[a], c = u(g, d, f)) : c = u(g, p, f) : s = "center";
        }
      } else
        t[g] < o[g] && o[d] < 0 && // opposite align has larger space
        // ------------[   target   ]
        // ----------------[follower]
        o[p] > o[d] && (s = ki[a]);
    } else {
      const p = l === "bottom" || l === "top" ? "left" : "top", d = nr[p], g = qr[p], b = (t[g] - o[g]) / 2;
      // center is not enough
      // ----------- [ target ]--|
      // -------[     follower     ]
      (o[p] < b || o[d] < b) && (o[p] > o[d] ? (s = Ei[p], c = u(g, p, f)) : (s = Ei[d], c = u(g, d, f)));
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
  function uu(e, o) {
    return o ? su[e] : au[e];
  }
  function fu(e, o, t, r, n, i) {
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
  const hu = Do([
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
      const o = he("VBinder"), t = Ze(() => e.enabled !== void 0 ? e.enabled : e.show), r = A(null), n = A(null), i = () => {
        const { syncTrigger: v } = e;
        v.includes("scroll") && o.addScrollListener(s), v.includes("resize") && o.addResizeListener(s);
      }, l = () => {
        o.removeScrollListener(s), o.removeResizeListener(s);
      };
      Ue(() => {
        t.value && (s(), i());
      });
      const a = Zo();
      hu.mount({
        id: "vueuc/binder",
        head: !0,
        anchorMetaName: Gn,
        ssr: a
      }), Qe(() => {
        l();
      }), Fd(() => {
        t.value && s();
      });
      const s = () => {
        if (!t.value)
          return;
        const v = r.value;
        if (v === null)
          return;
        const p = o.targetRef, { x: d, y: g, overlap: b } = e, h = d !== void 0 && g !== void 0 ? Kd(d, g) : Xr(p);
        v.style.setProperty("--v-target-width", `${Math.round(h.width)}px`), v.style.setProperty("--v-target-height", `${Math.round(h.height)}px`);
        const { width: $, minWidth: H, placement: I, internalShift: M, flip: E } = e;
        v.setAttribute("v-placement", I), b ? v.setAttribute("v-overlap", "") : v.removeAttribute("v-overlap");
        const { style: x } = v;
        $ === "target" ? x.width = `${h.width}px` : $ !== void 0 ? x.width = $ : x.width = "", H === "target" ? x.minWidth = `${h.width}px` : H !== void 0 ? x.minWidth = H : x.minWidth = "";
        const w = Xr(v), S = Xr(n.value), { left: C, top: P, placement: z } = du(I, h, w, M, E, b), L = uu(z, b), { left: _, top: N, transform: U } = fu(z, S, h, P, C, b);
        v.setAttribute("v-placement", z), v.style.setProperty("--v-offset-left", `${Math.round(C)}px`), v.style.setProperty("--v-offset-top", `${Math.round(P)}px`), v.style.transform = `translateX(${_}) translateY(${N}) ${U}`, v.style.setProperty("--v-transform-origin", L), v.style.transformOrigin = L;
      };
      xe(t, (v) => {
        v ? (i(), c()) : l();
      });
      const c = () => {
        yt().then(s).catch((v) => console.error(v));
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
      const u = Hr(), f = Ze(() => {
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
      return y(lu, {
        show: this.show,
        to: this.mergedTo,
        disabled: this.teleportDisabled
      }, {
        default: () => {
          var e, o;
          const t = y("div", {
            class: ["v-binder-follower-container", this.containerClass],
            ref: "offsetContainerRef"
          }, [
            y("div", {
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
  var Xo = [], pu = function() {
    return Xo.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, vu = function() {
    return Xo.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, _i = "ResizeObserver loop completed with undelivered notifications.", gu = function() {
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
  }, mu = function() {
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
  }, bu = function(e) {
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
  }, Lt = typeof window < "u" ? window : {}, ir = /* @__PURE__ */ new WeakMap(), Hi = /auto|scroll/, xu = /^tb|vertical/, Cu = /msie|trident/i.test(Lt.navigator && Lt.navigator.userAgent), oo = function(e) {
    return parseFloat(e || "0");
  }, xt = function(e, o, t) {
    return e === void 0 && (e = 0), o === void 0 && (o = 0), t === void 0 && (t = !1), new mu((t ? o : e) || 0, (t ? e : o) || 0);
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
    var t = getComputedStyle(e), r = Kn(e) && e.ownerSVGElement && e.getBBox(), n = !Cu && t.boxSizing === "border-box", i = xu.test(t.writingMode || ""), l = !r && Hi.test(t.overflowY || ""), a = !r && Hi.test(t.overflowX || ""), s = r ? 0 : oo(t.paddingTop), c = r ? 0 : oo(t.paddingRight), u = r ? 0 : oo(t.paddingBottom), f = r ? 0 : oo(t.paddingLeft), v = r ? 0 : oo(t.borderTopWidth), p = r ? 0 : oo(t.borderRightWidth), d = r ? 0 : oo(t.borderBottomWidth), g = r ? 0 : oo(t.borderLeftWidth), b = f + c, h = s + u, $ = g + p, H = v + d, I = a ? e.offsetHeight - H - e.clientHeight : 0, M = l ? e.offsetWidth - $ - e.clientWidth : 0, E = n ? b + $ : 0, x = n ? h + H : 0, w = r ? r.width : oo(t.width) - E - M, S = r ? r.height : oo(t.height) - x - I, C = w + b + M + $, P = S + h + I + H, z = Yo({
      devicePixelContentBoxSize: xt(Math.round(w * devicePixelRatio), Math.round(S * devicePixelRatio), i),
      borderBoxSize: xt(C, P, i),
      contentBoxSize: xt(w, S, i),
      contentRect: new ba(f, s, w, S)
    });
    return ir.set(e, z), z;
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
  }, yu = function() {
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
  }, Su = function() {
    var e = 1 / 0, o = [];
    Xo.forEach(function(l) {
      if (l.activeTargets.length !== 0) {
        var a = [];
        l.activeTargets.forEach(function(c) {
          var u = new yu(c.target), f = Sa(c.target);
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
  }, wu = function() {
    var e = 0;
    for (Ai(e); pu(); )
      e = Su(), Ai(e);
    return vu() && gu(), e > 0;
  }, Jr, wa = [], $u = function() {
    return wa.splice(0).forEach(function(e) {
      return e();
    });
  }, Pu = function(e) {
    if (!Jr) {
      var o = 0, t = document.createTextNode(""), r = { characterData: !0 };
      new MutationObserver(function() {
        return $u();
      }).observe(t, r), Jr = function() {
        t.textContent = "".concat(o ? o-- : o++);
      };
    }
    wa.push(e), Jr();
  }, Tu = function(e) {
    Pu(function() {
      requestAnimationFrame(e);
    });
  }, vr = 0, zu = function() {
    return !!vr;
  }, Iu = 250, Mu = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Ri = [
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
  }, Zr = !1, ku = function() {
    function e() {
      var o = this;
      this.stopped = !0, this.listener = function() {
        return o.schedule();
      };
    }
    return e.prototype.run = function(o) {
      var t = this;
      if (o === void 0 && (o = Iu), !Zr) {
        Zr = !0;
        var r = Fi(o);
        Tu(function() {
          var n = !1;
          try {
            n = wu();
          } finally {
            if (Zr = !1, o = r - Fi(), !zu())
              return;
            n ? t.run(1e3) : o > 0 ? t.run(o) : t.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var o = this, t = function() {
        return o.observer && o.observer.observe(document.body, Mu);
      };
      document.body ? t() : Lt.addEventListener("DOMContentLoaded", t);
    }, e.prototype.start = function() {
      var o = this;
      this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Ri.forEach(function(t) {
        return Lt.addEventListener(t, o.listener, !0);
      }));
    }, e.prototype.stop = function() {
      var o = this;
      this.stopped || (this.observer && this.observer.disconnect(), Ri.forEach(function(t) {
        return Lt.removeEventListener(t, o.listener, !0);
      }), this.stopped = !0);
    }, e;
  }(), Tn = new ku(), Li = function(e) {
    !vr && e > 0 && Tn.start(), vr += e, !vr && Tn.stop();
  }, Ou = function(e) {
    return !Kn(e) && !bu(e) && getComputedStyle(e).display === "inline";
  }, Eu = function() {
    function e(o, t) {
      this.target = o, this.observedBox = t || Ut.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var o = ya(this.target, this.observedBox, !0);
      return Ou(this.target) && (this.lastReportedSize = o), this.lastReportedSize.inlineSize !== o.inlineSize || this.lastReportedSize.blockSize !== o.blockSize;
    }, e;
  }(), _u = function() {
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
      var r = new _u(o, t);
      lr.set(o, r);
    }, e.observe = function(o, t, r) {
      var n = lr.get(o), i = n.observationTargets.length === 0;
      Wi(n.observationTargets, t) < 0 && (i && Xo.push(n), n.observationTargets.push(new Eu(t, r && r.box)), Li(1), Tn.schedule());
    }, e.unobserve = function(o, t) {
      var r = lr.get(o), n = Wi(r.observationTargets, t), i = r.observationTargets.length === 1;
      n >= 0 && (i && Xo.splice(Xo.indexOf(r), 1), r.observationTargets.splice(n, 1), Li(-1));
    }, e.disconnect = function(o) {
      var t = this, r = lr.get(o);
      r.observationTargets.slice().forEach(function(n) {
        return t.unobserve(o, n.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  }(), Du = function() {
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
  class Hu {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Du)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
  const yr = new Hu(), Sr = ie({
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
      Ue(() => {
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
      }), Qe(() => {
        o && yr.unregisterHandler(t.$el.nextElementSibling);
      });
    },
    render() {
      return kl(this.$slots, "default");
    }
  });
  let sr;
  function Bu() {
    return sr === void 0 && ("matchMedia" in window ? sr = window.matchMedia("(pointer:coarse)").matches : sr = !1), sr;
  }
  let Qr;
  function Ni() {
    return Qr === void 0 && (Qr = "chrome" in window ? window.devicePixelRatio : 1), Qr;
  }
  const Au = Do(".v-vl", {
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
  ]), Ru = ie({
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
      Au.mount({
        id: "vueuc/virtual-list",
        head: !0,
        anchorMetaName: Gn,
        ssr: o
      }), Ue(() => {
        const { defaultScrollIndex: P, defaultScrollKey: z } = e;
        P != null ? d({ index: P }) : z != null && d({ key: z });
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
      const n = O(() => {
        const P = /* @__PURE__ */ new Map(), { keyField: z } = e;
        return e.items.forEach((L, _) => {
          P.set(L[z], _);
        }), P;
      }), i = A(null), l = A(void 0), a = /* @__PURE__ */ new Map(), s = O(() => {
        const { items: P, itemSize: z, keyField: L } = e, _ = new iu(P.length, z);
        return P.forEach((N, U) => {
          const G = N[L], oe = a.get(G);
          oe !== void 0 && _.add(U, oe);
        }), _;
      }), c = A(0);
      let u = 0;
      const f = A(0), v = Ze(() => Math.max(s.value.getBound(f.value - bn(e.paddingTop)) - 1, 0)), p = O(() => {
        const { value: P } = l;
        if (P === void 0)
          return [];
        const { items: z, itemSize: L } = e, _ = v.value, N = Math.min(_ + Math.ceil(P / L + 1), z.length - 1), U = [];
        for (let G = _; G <= N; ++G)
          U.push(z[G]);
        return U;
      }), d = (P, z) => {
        if (typeof P == "number") {
          $(P, z, "auto");
          return;
        }
        const { left: L, top: _, index: N, key: U, position: G, behavior: oe, debounce: k = !0 } = P;
        if (L !== void 0 || _ !== void 0)
          $(L, _, oe);
        else if (N !== void 0)
          h(N, oe, k);
        else if (U !== void 0) {
          const W = n.value.get(U);
          W !== void 0 && h(W, oe, k);
        } else
          G === "bottom" ? $(0, Number.MAX_SAFE_INTEGER, oe) : G === "top" && $(0, 0, oe);
      };
      let g, b = null;
      function h(P, z, L) {
        const { value: _ } = s, N = _.sum(P) + bn(e.paddingTop);
        if (!L)
          i.value.scrollTo({
            left: 0,
            top: N,
            behavior: z
          });
        else {
          g = P, b !== null && window.clearTimeout(b), b = window.setTimeout(() => {
            g = void 0, b = null;
          }, 16);
          const { scrollTop: U, offsetHeight: G } = i.value;
          if (N > U) {
            const oe = _.get(P);
            N + oe <= U + G || i.value.scrollTo({
              left: 0,
              top: N + oe - G,
              behavior: z
            });
          } else
            i.value.scrollTo({
              left: 0,
              top: N,
              behavior: z
            });
        }
      }
      function $(P, z, L) {
        i.value.scrollTo({
          left: P,
          top: z,
          behavior: L
        });
      }
      function H(P, z) {
        var L, _, N;
        if (t || e.ignoreItemResize || C(z.target))
          return;
        const { value: U } = s, G = n.value.get(P), oe = U.get(G), k = (N = (_ = (L = z.borderBoxSize) === null || L === void 0 ? void 0 : L[0]) === null || _ === void 0 ? void 0 : _.blockSize) !== null && N !== void 0 ? N : z.contentRect.height;
        if (k === oe)
          return;
        k - e.itemSize === 0 ? a.delete(P) : a.set(P, k - e.itemSize);
        const re = k - oe;
        if (re === 0)
          return;
        U.add(G, re);
        const fe = i.value;
        if (fe != null) {
          if (g === void 0) {
            const Ie = U.sum(G);
            fe.scrollTop > Ie && fe.scrollBy(0, re);
          } else if (G < g)
            fe.scrollBy(0, re);
          else if (G === g) {
            const Ie = U.sum(G);
            k + Ie > // Note, listEl shouldn't have border, nor offsetHeight won't be
            // correct
            fe.scrollTop + fe.offsetHeight && fe.scrollBy(0, re);
          }
          S();
        }
        c.value++;
      }
      const I = !Bu();
      let M = !1;
      function E(P) {
        var z;
        (z = e.onScroll) === null || z === void 0 || z.call(e, P), (!I || !M) && S();
      }
      function x(P) {
        var z;
        if ((z = e.onWheel) === null || z === void 0 || z.call(e, P), I) {
          const L = i.value;
          if (L != null) {
            if (P.deltaX === 0 && (L.scrollTop === 0 && P.deltaY <= 0 || L.scrollTop + L.offsetHeight >= L.scrollHeight && P.deltaY >= 0))
              return;
            P.preventDefault(), L.scrollTop += P.deltaY / Ni(), L.scrollLeft += P.deltaX / Ni(), S(), M = !0, Yl(() => {
              M = !1;
            });
          }
        }
      }
      function w(P) {
        if (t || C(P.target) || P.contentRect.height === l.value)
          return;
        l.value = P.contentRect.height;
        const { onResize: z } = e;
        z !== void 0 && z(P);
      }
      function S() {
        const { value: P } = i;
        P != null && (f.value = P.scrollTop, u = P.scrollLeft);
      }
      function C(P) {
        let z = P;
        for (; z !== null; ) {
          if (z.style.display === "none")
            return !0;
          z = z.parentElement;
        }
        return !1;
      }
      return {
        listHeight: l,
        listStyle: {
          overflow: "auto"
        },
        keyToIndex: n,
        itemsStyle: O(() => {
          const { itemResizable: P } = e, z = or(s.value.sum());
          return c.value, [
            e.itemsStyle,
            {
              boxSizing: "content-box",
              height: P ? "" : z,
              minHeight: P ? z : "",
              paddingTop: or(e.paddingTop),
              paddingBottom: or(e.paddingBottom)
            }
          ];
        }),
        visibleItemsStyle: O(() => (c.value, {
          transform: `translateY(${or(s.value.sum(v.value))})`
        })),
        viewportItems: p,
        listElRef: i,
        itemsElRef: A(null),
        scrollTo: d,
        handleListResize: w,
        handleListScroll: E,
        handleListWheel: x,
        handleItemResize: H
      };
    },
    render() {
      const { itemResizable: e, keyField: o, keyToIndex: t, visibleItemsTag: r } = this;
      return y(Sr, {
        onResize: this.handleListResize
      }, {
        default: () => {
          var n, i;
          return y("div", Or(this.$attrs, {
            class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
            onScroll: this.handleListScroll,
            onWheel: this.handleListWheel,
            ref: "listElRef"
          }), [
            this.items.length !== 0 ? y("div", {
              ref: "itemsElRef",
              class: "v-vl-items",
              style: this.itemsStyle
            }, [
              y(r, Object.assign({
                class: "v-vl-visible-items",
                style: this.visibleItemsStyle
              }, this.visibleItemsProps), {
                default: () => this.viewportItems.map((l) => {
                  const a = l[o], s = t.get(a), c = this.$slots.default({
                    item: l,
                    index: s
                  })[0];
                  return e ? y(Sr, {
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
  }), Wo = "v-hidden", Fu = Do("[v-hidden]", {
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
      const t = A(null), r = A(null);
      function n() {
        const { value: l } = t, { getCounter: a, getTail: s } = e;
        let c;
        if (a !== void 0 ? c = a() : c = r.value, !l || !c)
          return;
        c.hasAttribute(Wo) && c.removeAttribute(Wo);
        const { children: u } = l, f = l.offsetWidth, v = [], p = o.tail ? s == null ? void 0 : s() : null;
        let d = p ? p.offsetWidth : 0, g = !1;
        const b = l.children.length - (o.tail ? 1 : 0);
        for (let $ = 0; $ < b - 1; ++$) {
          if ($ < 0)
            continue;
          const H = u[$];
          if (g) {
            H.hasAttribute(Wo) || H.setAttribute(Wo, "");
            continue;
          } else
            H.hasAttribute(Wo) && H.removeAttribute(Wo);
          const I = H.offsetWidth;
          if (d += I, v[$] = I, d > f) {
            const { updateCounter: M } = e;
            for (let E = $; E >= 0; --E) {
              const x = b - 1 - E;
              M !== void 0 ? M(x) : c.textContent = `${x}`;
              const w = c.offsetWidth;
              if (d -= v[E], d + w <= f || E === 0) {
                g = !0, $ = E - 1, p && ($ === -1 ? (p.style.maxWidth = `${f - w}px`, p.style.boxSizing = "border-box") : p.style.maxWidth = "");
                break;
              }
            }
          }
        }
        const { onUpdateOverflow: h } = e;
        g ? h !== void 0 && h(!0) : (h !== void 0 && h(!1), c.setAttribute(Wo, ""));
      }
      const i = Zo();
      return Fu.mount({
        id: "vueuc/overflow",
        head: !0,
        anchorMetaName: Gn,
        ssr: i
      }), Ue(n), {
        selfRef: t,
        counterRef: r,
        sync: n
      };
    },
    render() {
      const { $slots: e } = this;
      return yt(this.sync), y("div", {
        class: "v-overflow",
        ref: "selfRef"
      }, [
        kl(e, "default"),
        // $slots.counter should only has 1 element
        e.counter ? e.counter() : y("span", {
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
    if (!Lu(e))
      return !1;
    try {
      e.focus({ preventScroll: !0 });
    } catch {
    }
    return document.activeElement === e;
  }
  function Lu(e) {
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
  let Ot = [];
  const Wu = ie({
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
      const o = ad(), t = A(null), r = A(null);
      let n = !1, i = !1;
      const l = typeof document > "u" ? null : document.activeElement;
      function a() {
        return Ot[Ot.length - 1] === o;
      }
      function s(b) {
        var h;
        b.code === "Escape" && a() && ((h = e.onEsc) === null || h === void 0 || h.call(e, b));
      }
      Ue(() => {
        xe(() => e.active, (b) => {
          b ? (f(), ze("keydown", document, s)) : (me("keydown", document, s), n && v());
        }, {
          immediate: !0
        });
      }), Qe(() => {
        me("keydown", document, s), n && v();
      });
      function c(b) {
        if (!i && a()) {
          const h = u();
          if (h === null || h.contains(jt(b)))
            return;
          p("first");
        }
      }
      function u() {
        const b = t.value;
        if (b === null)
          return null;
        let h = b;
        for (; h = h.nextSibling, !(h === null || h instanceof Element && h.tagName === "DIV"); )
          ;
        return h;
      }
      function f() {
        var b;
        if (!e.disabled) {
          if (Ot.push(o), e.autoFocus) {
            const { initialFocusTo: h } = e;
            h === void 0 ? p("first") : (b = Mi(h)) === null || b === void 0 || b.focus({ preventScroll: !0 });
          }
          n = !0, document.addEventListener("focus", c, !0);
        }
      }
      function v() {
        var b;
        if (e.disabled || (document.removeEventListener("focus", c, !0), Ot = Ot.filter(($) => $ !== o), a()))
          return;
        const { finalFocusTo: h } = e;
        h !== void 0 ? (b = Mi(h)) === null || b === void 0 || b.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
      }
      function p(b) {
        if (a() && e.active) {
          const h = t.value, $ = r.value;
          if (h !== null && $ !== null) {
            const H = u();
            if (H == null || H === $) {
              i = !0, h.focus({ preventScroll: !0 }), i = !1;
              return;
            }
            i = !0;
            const I = b === "first" ? Pa(H) : Ta(H);
            i = !1, I || (i = !0, h.focus({ preventScroll: !0 }), i = !1);
          }
        }
      }
      function d(b) {
        if (i)
          return;
        const h = u();
        h !== null && (b.relatedTarget !== null && h.contains(b.relatedTarget) ? p("last") : p("first"));
      }
      function g(b) {
        i || (b.relatedTarget !== null && b.relatedTarget === t.value ? p("last") : p("first"));
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
      return y(to, null, [
        y("div", {
          "aria-hidden": "true",
          tabindex: o ? "0" : "-1",
          ref: "focusableStartRef",
          style: t,
          onFocus: this.handleStartFocus
        }),
        e(),
        y("div", {
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
    o && (Ue(() => {
      const { value: t } = e;
      t && yr.registerHandler(t, o);
    }), Qe(() => {
      const { value: t } = e;
      t && yr.unregisterHandler(t);
    }));
  }
  function Nu(e) {
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
  function ju(e, { defaultSize: o = "medium", mergedSize: t, mergedDisabled: r } = {}) {
    const n = he(Vi, null);
    ro(Vi, null);
    const i = O(t ? () => t(n) : () => {
      const { size: s } = e;
      if (s)
        return s;
      if (n) {
        const { mergedSize: c } = n;
        if (c.value !== void 0)
          return c.value;
      }
      return o;
    }), l = O(r ? () => r(n) : () => {
      const { disabled: s } = e;
      return s !== void 0 ? s : n ? n.disabled.value : !1;
    }), a = O(() => {
      const { status: s } = e;
      return s || (n == null ? void 0 : n.mergedValidationStatus.value);
    });
    return Qe(() => {
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
  var Vu = typeof global == "object" && global && global.Object === Object && global;
  const Ma = Vu;
  var Uu = typeof self == "object" && self && self.Object === Object && self, Gu = Ma || Uu || Function("return this")();
  const lo = Gu;
  var Ku = lo.Symbol;
  const Ho = Ku;
  var ka = Object.prototype, Xu = ka.hasOwnProperty, Yu = ka.toString, Et = Ho ? Ho.toStringTag : void 0;
  function qu(e) {
    var o = Xu.call(e, Et), t = e[Et];
    try {
      e[Et] = void 0;
      var r = !0;
    } catch {
    }
    var n = Yu.call(e);
    return r && (o ? e[Et] = t : delete e[Et]), n;
  }
  var Ju = Object.prototype, Zu = Ju.toString;
  function Qu(e) {
    return Zu.call(e);
  }
  var ef = "[object Null]", of = "[object Undefined]", Ui = Ho ? Ho.toStringTag : void 0;
  function Qo(e) {
    return e == null ? e === void 0 ? of : ef : Ui && Ui in Object(e) ? qu(e) : Qu(e);
  }
  function Bo(e) {
    return e != null && typeof e == "object";
  }
  var tf = "[object Symbol]";
  function Xn(e) {
    return typeof e == "symbol" || Bo(e) && Qo(e) == tf;
  }
  function Oa(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = Array(r); ++t < r; )
      n[t] = o(e[t], t, e);
    return n;
  }
  var rf = Array.isArray;
  const Ve = rf;
  var nf = 1 / 0, Gi = Ho ? Ho.prototype : void 0, Ki = Gi ? Gi.toString : void 0;
  function Ea(e) {
    if (typeof e == "string")
      return e;
    if (Ve(e))
      return Oa(e, Ea) + "";
    if (Xn(e))
      return Ki ? Ki.call(e) : "";
    var o = e + "";
    return o == "0" && 1 / e == -nf ? "-0" : o;
  }
  function Ao(e) {
    var o = typeof e;
    return e != null && (o == "object" || o == "function");
  }
  function Yn(e) {
    return e;
  }
  var lf = "[object AsyncFunction]", af = "[object Function]", sf = "[object GeneratorFunction]", cf = "[object Proxy]";
  function qn(e) {
    if (!Ao(e))
      return !1;
    var o = Qo(e);
    return o == af || o == sf || o == lf || o == cf;
  }
  var df = lo["__core-js_shared__"];
  const en = df;
  var Xi = function() {
    var e = /[^.]+$/.exec(en && en.keys && en.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
  function uf(e) {
    return !!Xi && Xi in e;
  }
  var ff = Function.prototype, hf = ff.toString;
  function et(e) {
    if (e != null) {
      try {
        return hf.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  var pf = /[\\^$.*+?()[\]{}|]/g, vf = /^\[object .+?Constructor\]$/, gf = Function.prototype, mf = Object.prototype, bf = gf.toString, xf = mf.hasOwnProperty, Cf = RegExp(
    "^" + bf.call(xf).replace(pf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function yf(e) {
    if (!Ao(e) || uf(e))
      return !1;
    var o = qn(e) ? Cf : vf;
    return o.test(et(e));
  }
  function Sf(e, o) {
    return e == null ? void 0 : e[o];
  }
  function ot(e, o) {
    var t = Sf(e, o);
    return yf(t) ? t : void 0;
  }
  var wf = ot(lo, "WeakMap");
  const zn = wf;
  var Yi = Object.create, $f = function() {
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
  const Pf = $f;
  function Tf(e, o, t) {
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
  function zf(e, o) {
    var t = -1, r = e.length;
    for (o || (o = Array(r)); ++t < r; )
      o[t] = e[t];
    return o;
  }
  var If = 800, Mf = 16, kf = Date.now;
  function Of(e) {
    var o = 0, t = 0;
    return function() {
      var r = kf(), n = Mf - (r - t);
      if (t = r, n > 0) {
        if (++o >= If)
          return arguments[0];
      } else
        o = 0;
      return e.apply(void 0, arguments);
    };
  }
  function Ef(e) {
    return function() {
      return e;
    };
  }
  var _f = function() {
    try {
      var e = ot(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }();
  const wr = _f;
  var Df = wr ? function(e, o) {
    return wr(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Ef(o),
      writable: !0
    });
  } : Yn;
  const Hf = Df;
  var Bf = Of(Hf);
  const Af = Bf;
  var Rf = 9007199254740991, Ff = /^(?:0|[1-9]\d*)$/;
  function Jn(e, o) {
    var t = typeof e;
    return o = o ?? Rf, !!o && (t == "number" || t != "symbol" && Ff.test(e)) && e > -1 && e % 1 == 0 && e < o;
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
  var Lf = Object.prototype, Wf = Lf.hasOwnProperty;
  function Nf(e, o, t) {
    var r = e[o];
    (!(Wf.call(e, o) && qt(r, t)) || t === void 0 && !(o in e)) && Zn(e, o, t);
  }
  function jf(e, o, t, r) {
    var n = !t;
    t || (t = {});
    for (var i = -1, l = o.length; ++i < l; ) {
      var a = o[i], s = r ? r(t[a], e[a], a, t, e) : void 0;
      s === void 0 && (s = e[a]), n ? Zn(t, a, s) : Nf(t, a, s);
    }
    return t;
  }
  var qi = Math.max;
  function Vf(e, o, t) {
    return o = qi(o === void 0 ? e.length - 1 : o, 0), function() {
      for (var r = arguments, n = -1, i = qi(r.length - o, 0), l = Array(i); ++n < i; )
        l[n] = r[o + n];
      n = -1;
      for (var a = Array(o + 1); ++n < o; )
        a[n] = r[n];
      return a[o] = t(l), Tf(e, this, a);
    };
  }
  function Uf(e, o) {
    return Af(Vf(e, o, Yn), e + "");
  }
  var Gf = 9007199254740991;
  function Qn(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Gf;
  }
  function Pt(e) {
    return e != null && Qn(e.length) && !qn(e);
  }
  function Kf(e, o, t) {
    if (!Ao(t))
      return !1;
    var r = typeof o;
    return (r == "number" ? Pt(t) && Jn(o, t.length) : r == "string" && o in t) ? qt(t[o], e) : !1;
  }
  function Xf(e) {
    return Uf(function(o, t) {
      var r = -1, n = t.length, i = n > 1 ? t[n - 1] : void 0, l = n > 2 ? t[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, l && Kf(t[0], t[1], l) && (i = n < 3 ? void 0 : i, n = 1), o = Object(o); ++r < n; ) {
        var a = t[r];
        a && e(o, a, r, i);
      }
      return o;
    });
  }
  var Yf = Object.prototype;
  function ei(e) {
    var o = e && e.constructor, t = typeof o == "function" && o.prototype || Yf;
    return e === t;
  }
  function qf(e, o) {
    for (var t = -1, r = Array(e); ++t < e; )
      r[t] = o(t);
    return r;
  }
  var Jf = "[object Arguments]";
  function Ji(e) {
    return Bo(e) && Qo(e) == Jf;
  }
  var _a = Object.prototype, Zf = _a.hasOwnProperty, Qf = _a.propertyIsEnumerable, eh = Ji(function() {
    return arguments;
  }()) ? Ji : function(e) {
    return Bo(e) && Zf.call(e, "callee") && !Qf.call(e, "callee");
  };
  const $r = eh;
  function oh() {
    return !1;
  }
  var Da = typeof Be == "object" && Be && !Be.nodeType && Be, Zi = Da && typeof Ae == "object" && Ae && !Ae.nodeType && Ae, th = Zi && Zi.exports === Da, Qi = th ? lo.Buffer : void 0, rh = Qi ? Qi.isBuffer : void 0, nh = rh || oh;
  const Pr = nh;
  var ih = "[object Arguments]", lh = "[object Array]", ah = "[object Boolean]", sh = "[object Date]", ch = "[object Error]", dh = "[object Function]", uh = "[object Map]", fh = "[object Number]", hh = "[object Object]", ph = "[object RegExp]", vh = "[object Set]", gh = "[object String]", mh = "[object WeakMap]", bh = "[object ArrayBuffer]", xh = "[object DataView]", Ch = "[object Float32Array]", yh = "[object Float64Array]", Sh = "[object Int8Array]", wh = "[object Int16Array]", $h = "[object Int32Array]", Ph = "[object Uint8Array]", Th = "[object Uint8ClampedArray]", zh = "[object Uint16Array]", Ih = "[object Uint32Array]", ue = {};
  ue[Ch] = ue[yh] = ue[Sh] = ue[wh] = ue[$h] = ue[Ph] = ue[Th] = ue[zh] = ue[Ih] = !0;
  ue[ih] = ue[lh] = ue[bh] = ue[ah] = ue[xh] = ue[sh] = ue[ch] = ue[dh] = ue[uh] = ue[fh] = ue[hh] = ue[ph] = ue[vh] = ue[gh] = ue[mh] = !1;
  function Mh(e) {
    return Bo(e) && Qn(e.length) && !!ue[Qo(e)];
  }
  function kh(e) {
    return function(o) {
      return e(o);
    };
  }
  var Ha = typeof Be == "object" && Be && !Be.nodeType && Be, Wt = Ha && typeof Ae == "object" && Ae && !Ae.nodeType && Ae, Oh = Wt && Wt.exports === Ha, on = Oh && Ma.process, Eh = function() {
    try {
      var e = Wt && Wt.require && Wt.require("util").types;
      return e || on && on.binding && on.binding("util");
    } catch {
    }
  }();
  const el = Eh;
  var ol = el && el.isTypedArray, _h = ol ? kh(ol) : Mh;
  const oi = _h;
  var Dh = Object.prototype, Hh = Dh.hasOwnProperty;
  function Ba(e, o) {
    var t = Ve(e), r = !t && $r(e), n = !t && !r && Pr(e), i = !t && !r && !n && oi(e), l = t || r || n || i, a = l ? qf(e.length, String) : [], s = a.length;
    for (var c in e)
      (o || Hh.call(e, c)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
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
  var Bh = Aa(Object.keys, Object);
  const Ah = Bh;
  var Rh = Object.prototype, Fh = Rh.hasOwnProperty;
  function Lh(e) {
    if (!ei(e))
      return Ah(e);
    var o = [];
    for (var t in Object(e))
      Fh.call(e, t) && t != "constructor" && o.push(t);
    return o;
  }
  function ti(e) {
    return Pt(e) ? Ba(e) : Lh(e);
  }
  function Wh(e) {
    var o = [];
    if (e != null)
      for (var t in Object(e))
        o.push(t);
    return o;
  }
  var Nh = Object.prototype, jh = Nh.hasOwnProperty;
  function Vh(e) {
    if (!Ao(e))
      return Wh(e);
    var o = ei(e), t = [];
    for (var r in e)
      r == "constructor" && (o || !jh.call(e, r)) || t.push(r);
    return t;
  }
  function Ra(e) {
    return Pt(e) ? Ba(e, !0) : Vh(e);
  }
  var Uh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Gh = /^\w*$/;
  function ri(e, o) {
    if (Ve(e))
      return !1;
    var t = typeof e;
    return t == "number" || t == "symbol" || t == "boolean" || e == null || Xn(e) ? !0 : Gh.test(e) || !Uh.test(e) || o != null && e in Object(o);
  }
  var Kh = ot(Object, "create");
  const Gt = Kh;
  function Xh() {
    this.__data__ = Gt ? Gt(null) : {}, this.size = 0;
  }
  function Yh(e) {
    var o = this.has(e) && delete this.__data__[e];
    return this.size -= o ? 1 : 0, o;
  }
  var qh = "__lodash_hash_undefined__", Jh = Object.prototype, Zh = Jh.hasOwnProperty;
  function Qh(e) {
    var o = this.__data__;
    if (Gt) {
      var t = o[e];
      return t === qh ? void 0 : t;
    }
    return Zh.call(o, e) ? o[e] : void 0;
  }
  var ep = Object.prototype, op = ep.hasOwnProperty;
  function tp(e) {
    var o = this.__data__;
    return Gt ? o[e] !== void 0 : op.call(o, e);
  }
  var rp = "__lodash_hash_undefined__";
  function np(e, o) {
    var t = this.__data__;
    return this.size += this.has(e) ? 0 : 1, t[e] = Gt && o === void 0 ? rp : o, this;
  }
  function Jo(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  Jo.prototype.clear = Xh;
  Jo.prototype.delete = Yh;
  Jo.prototype.get = Qh;
  Jo.prototype.has = tp;
  Jo.prototype.set = np;
  function ip() {
    this.__data__ = [], this.size = 0;
  }
  function Br(e, o) {
    for (var t = e.length; t--; )
      if (qt(e[t][0], o))
        return t;
    return -1;
  }
  var lp = Array.prototype, ap = lp.splice;
  function sp(e) {
    var o = this.__data__, t = Br(o, e);
    if (t < 0)
      return !1;
    var r = o.length - 1;
    return t == r ? o.pop() : ap.call(o, t, 1), --this.size, !0;
  }
  function cp(e) {
    var o = this.__data__, t = Br(o, e);
    return t < 0 ? void 0 : o[t][1];
  }
  function dp(e) {
    return Br(this.__data__, e) > -1;
  }
  function up(e, o) {
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
  $o.prototype.clear = ip;
  $o.prototype.delete = sp;
  $o.prototype.get = cp;
  $o.prototype.has = dp;
  $o.prototype.set = up;
  var fp = ot(lo, "Map");
  const Kt = fp;
  function hp() {
    this.size = 0, this.__data__ = {
      hash: new Jo(),
      map: new (Kt || $o)(),
      string: new Jo()
    };
  }
  function pp(e) {
    var o = typeof e;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? e !== "__proto__" : e === null;
  }
  function Ar(e, o) {
    var t = e.__data__;
    return pp(o) ? t[typeof o == "string" ? "string" : "hash"] : t.map;
  }
  function vp(e) {
    var o = Ar(this, e).delete(e);
    return this.size -= o ? 1 : 0, o;
  }
  function gp(e) {
    return Ar(this, e).get(e);
  }
  function mp(e) {
    return Ar(this, e).has(e);
  }
  function bp(e, o) {
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
  Po.prototype.clear = hp;
  Po.prototype.delete = vp;
  Po.prototype.get = gp;
  Po.prototype.has = mp;
  Po.prototype.set = bp;
  var xp = "Expected a function";
  function ni(e, o) {
    if (typeof e != "function" || o != null && typeof o != "function")
      throw new TypeError(xp);
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
  var Cp = 500;
  function yp(e) {
    var o = ni(e, function(r) {
      return t.size === Cp && t.clear(), r;
    }), t = o.cache;
    return o;
  }
  var Sp = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, wp = /\\(\\)?/g, $p = yp(function(e) {
    var o = [];
    return e.charCodeAt(0) === 46 && o.push(""), e.replace(Sp, function(t, r, n, i) {
      o.push(n ? i.replace(wp, "$1") : r || t);
    }), o;
  });
  const Pp = $p;
  function Fa(e) {
    return e == null ? "" : Ea(e);
  }
  function La(e, o) {
    return Ve(e) ? e : ri(e, o) ? [e] : Pp(Fa(e));
  }
  var Tp = 1 / 0;
  function Rr(e) {
    if (typeof e == "string" || Xn(e))
      return e;
    var o = e + "";
    return o == "0" && 1 / e == -Tp ? "-0" : o;
  }
  function Wa(e, o) {
    o = La(o, e);
    for (var t = 0, r = o.length; e != null && t < r; )
      e = e[Rr(o[t++])];
    return t && t == r ? e : void 0;
  }
  function zp(e, o, t) {
    var r = e == null ? void 0 : Wa(e, o);
    return r === void 0 ? t : r;
  }
  function Ip(e, o) {
    for (var t = -1, r = o.length, n = e.length; ++t < r; )
      e[n + t] = o[t];
    return e;
  }
  var Mp = Aa(Object.getPrototypeOf, Object);
  const Na = Mp;
  var kp = "[object Object]", Op = Function.prototype, Ep = Object.prototype, ja = Op.toString, _p = Ep.hasOwnProperty, Dp = ja.call(Object);
  function Hp(e) {
    if (!Bo(e) || Qo(e) != kp)
      return !1;
    var o = Na(e);
    if (o === null)
      return !0;
    var t = _p.call(o, "constructor") && o.constructor;
    return typeof t == "function" && t instanceof t && ja.call(t) == Dp;
  }
  function Bp(e, o, t) {
    var r = -1, n = e.length;
    o < 0 && (o = -o > n ? 0 : n + o), t = t > n ? n : t, t < 0 && (t += n), n = o > t ? 0 : t - o >>> 0, o >>>= 0;
    for (var i = Array(n); ++r < n; )
      i[r] = e[r + o];
    return i;
  }
  function Ap(e, o, t) {
    var r = e.length;
    return t = t === void 0 ? r : t, !o && t >= r ? e : Bp(e, o, t);
  }
  var Rp = "\\ud800-\\udfff", Fp = "\\u0300-\\u036f", Lp = "\\ufe20-\\ufe2f", Wp = "\\u20d0-\\u20ff", Np = Fp + Lp + Wp, jp = "\\ufe0e\\ufe0f", Vp = "\\u200d", Up = RegExp("[" + Vp + Rp + Np + jp + "]");
  function Va(e) {
    return Up.test(e);
  }
  function Gp(e) {
    return e.split("");
  }
  var Ua = "\\ud800-\\udfff", Kp = "\\u0300-\\u036f", Xp = "\\ufe20-\\ufe2f", Yp = "\\u20d0-\\u20ff", qp = Kp + Xp + Yp, Jp = "\\ufe0e\\ufe0f", Zp = "[" + Ua + "]", In = "[" + qp + "]", Mn = "\\ud83c[\\udffb-\\udfff]", Qp = "(?:" + In + "|" + Mn + ")", Ga = "[^" + Ua + "]", Ka = "(?:\\ud83c[\\udde6-\\uddff]){2}", Xa = "[\\ud800-\\udbff][\\udc00-\\udfff]", ev = "\\u200d", Ya = Qp + "?", qa = "[" + Jp + "]?", ov = "(?:" + ev + "(?:" + [Ga, Ka, Xa].join("|") + ")" + qa + Ya + ")*", tv = qa + Ya + ov, rv = "(?:" + [Ga + In + "?", In, Ka, Xa, Zp].join("|") + ")", nv = RegExp(Mn + "(?=" + Mn + ")|" + rv + tv, "g");
  function iv(e) {
    return e.match(nv) || [];
  }
  function lv(e) {
    return Va(e) ? iv(e) : Gp(e);
  }
  function av(e) {
    return function(o) {
      o = Fa(o);
      var t = Va(o) ? lv(o) : void 0, r = t ? t[0] : o.charAt(0), n = t ? Ap(t, 1).join("") : o.slice(1);
      return r[e]() + n;
    };
  }
  var sv = av("toUpperCase");
  const cv = sv;
  function dv() {
    this.__data__ = new $o(), this.size = 0;
  }
  function uv(e) {
    var o = this.__data__, t = o.delete(e);
    return this.size = o.size, t;
  }
  function fv(e) {
    return this.__data__.get(e);
  }
  function hv(e) {
    return this.__data__.has(e);
  }
  var pv = 200;
  function vv(e, o) {
    var t = this.__data__;
    if (t instanceof $o) {
      var r = t.__data__;
      if (!Kt || r.length < pv - 1)
        return r.push([e, o]), this.size = ++t.size, this;
      t = this.__data__ = new Po(r);
    }
    return t.set(e, o), this.size = t.size, this;
  }
  function io(e) {
    var o = this.__data__ = new $o(e);
    this.size = o.size;
  }
  io.prototype.clear = dv;
  io.prototype.delete = uv;
  io.prototype.get = fv;
  io.prototype.has = hv;
  io.prototype.set = vv;
  var Ja = typeof Be == "object" && Be && !Be.nodeType && Be, tl = Ja && typeof Ae == "object" && Ae && !Ae.nodeType && Ae, gv = tl && tl.exports === Ja, rl = gv ? lo.Buffer : void 0, nl = rl ? rl.allocUnsafe : void 0;
  function mv(e, o) {
    if (o)
      return e.slice();
    var t = e.length, r = nl ? nl(t) : new e.constructor(t);
    return e.copy(r), r;
  }
  function bv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = 0, i = []; ++t < r; ) {
      var l = e[t];
      o(l, t, e) && (i[n++] = l);
    }
    return i;
  }
  function xv() {
    return [];
  }
  var Cv = Object.prototype, yv = Cv.propertyIsEnumerable, il = Object.getOwnPropertySymbols, Sv = il ? function(e) {
    return e == null ? [] : (e = Object(e), bv(il(e), function(o) {
      return yv.call(e, o);
    }));
  } : xv;
  const wv = Sv;
  function $v(e, o, t) {
    var r = o(e);
    return Ve(e) ? r : Ip(r, t(e));
  }
  function ll(e) {
    return $v(e, ti, wv);
  }
  var Pv = ot(lo, "DataView");
  const kn = Pv;
  var Tv = ot(lo, "Promise");
  const On = Tv;
  var zv = ot(lo, "Set");
  const En = zv;
  var al = "[object Map]", Iv = "[object Object]", sl = "[object Promise]", cl = "[object Set]", dl = "[object WeakMap]", ul = "[object DataView]", Mv = et(kn), kv = et(Kt), Ov = et(On), Ev = et(En), _v = et(zn), jo = Qo;
  (kn && jo(new kn(new ArrayBuffer(1))) != ul || Kt && jo(new Kt()) != al || On && jo(On.resolve()) != sl || En && jo(new En()) != cl || zn && jo(new zn()) != dl) && (jo = function(e) {
    var o = Qo(e), t = o == Iv ? e.constructor : void 0, r = t ? et(t) : "";
    if (r)
      switch (r) {
        case Mv:
          return ul;
        case kv:
          return al;
        case Ov:
          return sl;
        case Ev:
          return cl;
        case _v:
          return dl;
      }
    return o;
  });
  const fl = jo;
  var Dv = lo.Uint8Array;
  const Tr = Dv;
  function Hv(e) {
    var o = new e.constructor(e.byteLength);
    return new Tr(o).set(new Tr(e)), o;
  }
  function Bv(e, o) {
    var t = o ? Hv(e.buffer) : e.buffer;
    return new e.constructor(t, e.byteOffset, e.length);
  }
  function Av(e) {
    return typeof e.constructor == "function" && !ei(e) ? Pf(Na(e)) : {};
  }
  var Rv = "__lodash_hash_undefined__";
  function Fv(e) {
    return this.__data__.set(e, Rv), this;
  }
  function Lv(e) {
    return this.__data__.has(e);
  }
  function zr(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.__data__ = new Po(); ++o < t; )
      this.add(e[o]);
  }
  zr.prototype.add = zr.prototype.push = Fv;
  zr.prototype.has = Lv;
  function Wv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length; ++t < r; )
      if (o(e[t], t, e))
        return !0;
    return !1;
  }
  function Nv(e, o) {
    return e.has(o);
  }
  var jv = 1, Vv = 2;
  function Za(e, o, t, r, n, i) {
    var l = t & jv, a = e.length, s = o.length;
    if (a != s && !(l && s > a))
      return !1;
    var c = i.get(e), u = i.get(o);
    if (c && u)
      return c == o && u == e;
    var f = -1, v = !0, p = t & Vv ? new zr() : void 0;
    for (i.set(e, o), i.set(o, e); ++f < a; ) {
      var d = e[f], g = o[f];
      if (r)
        var b = l ? r(g, d, f, o, e, i) : r(d, g, f, e, o, i);
      if (b !== void 0) {
        if (b)
          continue;
        v = !1;
        break;
      }
      if (p) {
        if (!Wv(o, function(h, $) {
          if (!Nv(p, $) && (d === h || n(d, h, t, r, i)))
            return p.push($);
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
  function Uv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r, n) {
      t[++o] = [n, r];
    }), t;
  }
  function Gv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r) {
      t[++o] = r;
    }), t;
  }
  var Kv = 1, Xv = 2, Yv = "[object Boolean]", qv = "[object Date]", Jv = "[object Error]", Zv = "[object Map]", Qv = "[object Number]", eg = "[object RegExp]", og = "[object Set]", tg = "[object String]", rg = "[object Symbol]", ng = "[object ArrayBuffer]", ig = "[object DataView]", hl = Ho ? Ho.prototype : void 0, tn = hl ? hl.valueOf : void 0;
  function lg(e, o, t, r, n, i, l) {
    switch (t) {
      case ig:
        if (e.byteLength != o.byteLength || e.byteOffset != o.byteOffset)
          return !1;
        e = e.buffer, o = o.buffer;
      case ng:
        return !(e.byteLength != o.byteLength || !i(new Tr(e), new Tr(o)));
      case Yv:
      case qv:
      case Qv:
        return qt(+e, +o);
      case Jv:
        return e.name == o.name && e.message == o.message;
      case eg:
      case tg:
        return e == o + "";
      case Zv:
        var a = Uv;
      case og:
        var s = r & Kv;
        if (a || (a = Gv), e.size != o.size && !s)
          return !1;
        var c = l.get(e);
        if (c)
          return c == o;
        r |= Xv, l.set(e, o);
        var u = Za(a(e), a(o), r, n, i, l);
        return l.delete(e), u;
      case rg:
        if (tn)
          return tn.call(e) == tn.call(o);
    }
    return !1;
  }
  var ag = 1, sg = Object.prototype, cg = sg.hasOwnProperty;
  function dg(e, o, t, r, n, i) {
    var l = t & ag, a = ll(e), s = a.length, c = ll(o), u = c.length;
    if (s != u && !l)
      return !1;
    for (var f = s; f--; ) {
      var v = a[f];
      if (!(l ? v in o : cg.call(o, v)))
        return !1;
    }
    var p = i.get(e), d = i.get(o);
    if (p && d)
      return p == o && d == e;
    var g = !0;
    i.set(e, o), i.set(o, e);
    for (var b = l; ++f < s; ) {
      v = a[f];
      var h = e[v], $ = o[v];
      if (r)
        var H = l ? r($, h, v, o, e, i) : r(h, $, v, e, o, i);
      if (!(H === void 0 ? h === $ || n(h, $, t, r, i) : H)) {
        g = !1;
        break;
      }
      b || (b = v == "constructor");
    }
    if (g && !b) {
      var I = e.constructor, M = o.constructor;
      I != M && "constructor" in e && "constructor" in o && !(typeof I == "function" && I instanceof I && typeof M == "function" && M instanceof M) && (g = !1);
    }
    return i.delete(e), i.delete(o), g;
  }
  var ug = 1, pl = "[object Arguments]", vl = "[object Array]", cr = "[object Object]", fg = Object.prototype, gl = fg.hasOwnProperty;
  function hg(e, o, t, r, n, i) {
    var l = Ve(e), a = Ve(o), s = l ? vl : fl(e), c = a ? vl : fl(o);
    s = s == pl ? cr : s, c = c == pl ? cr : c;
    var u = s == cr, f = c == cr, v = s == c;
    if (v && Pr(e)) {
      if (!Pr(o))
        return !1;
      l = !0, u = !1;
    }
    if (v && !u)
      return i || (i = new io()), l || oi(e) ? Za(e, o, t, r, n, i) : lg(e, o, s, t, r, n, i);
    if (!(t & ug)) {
      var p = u && gl.call(e, "__wrapped__"), d = f && gl.call(o, "__wrapped__");
      if (p || d) {
        var g = p ? e.value() : e, b = d ? o.value() : o;
        return i || (i = new io()), n(g, b, t, r, i);
      }
    }
    return v ? (i || (i = new io()), dg(e, o, t, r, n, i)) : !1;
  }
  function ii(e, o, t, r, n) {
    return e === o ? !0 : e == null || o == null || !Bo(e) && !Bo(o) ? e !== e && o !== o : hg(e, o, t, r, ii, n);
  }
  var pg = 1, vg = 2;
  function gg(e, o, t, r) {
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
        var f = new io();
        if (r)
          var v = r(c, u, s, e, o, f);
        if (!(v === void 0 ? ii(u, c, pg | vg, r, f) : v))
          return !1;
      }
    }
    return !0;
  }
  function Qa(e) {
    return e === e && !Ao(e);
  }
  function mg(e) {
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
  function bg(e) {
    var o = mg(e);
    return o.length == 1 && o[0][2] ? es(o[0][0], o[0][1]) : function(t) {
      return t === e || gg(t, e, o);
    };
  }
  function xg(e, o) {
    return e != null && o in Object(e);
  }
  function Cg(e, o, t) {
    o = La(o, e);
    for (var r = -1, n = o.length, i = !1; ++r < n; ) {
      var l = Rr(o[r]);
      if (!(i = e != null && t(e, l)))
        break;
      e = e[l];
    }
    return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && Qn(n) && Jn(l, n) && (Ve(e) || $r(e)));
  }
  function yg(e, o) {
    return e != null && Cg(e, o, xg);
  }
  var Sg = 1, wg = 2;
  function $g(e, o) {
    return ri(e) && Qa(o) ? es(Rr(e), o) : function(t) {
      var r = zp(t, e);
      return r === void 0 && r === o ? yg(t, e) : ii(o, r, Sg | wg);
    };
  }
  function Pg(e) {
    return function(o) {
      return o == null ? void 0 : o[e];
    };
  }
  function Tg(e) {
    return function(o) {
      return Wa(o, e);
    };
  }
  function zg(e) {
    return ri(e) ? Pg(Rr(e)) : Tg(e);
  }
  function Ig(e) {
    return typeof e == "function" ? e : e == null ? Yn : typeof e == "object" ? Ve(e) ? $g(e[0], e[1]) : bg(e) : zg(e);
  }
  function Mg(e) {
    return function(o, t, r) {
      for (var n = -1, i = Object(o), l = r(o), a = l.length; a--; ) {
        var s = l[e ? a : ++n];
        if (t(i[s], s, i) === !1)
          break;
      }
      return o;
    };
  }
  var kg = Mg();
  const os = kg;
  function Og(e, o) {
    return e && os(e, o, ti);
  }
  function Eg(e, o) {
    return function(t, r) {
      if (t == null)
        return t;
      if (!Pt(t))
        return e(t, r);
      for (var n = t.length, i = o ? n : -1, l = Object(t); (o ? i-- : ++i < n) && r(l[i], i, l) !== !1; )
        ;
      return t;
    };
  }
  var _g = Eg(Og);
  const Dg = _g;
  function _n(e, o, t) {
    (t !== void 0 && !qt(e[o], t) || t === void 0 && !(o in e)) && Zn(e, o, t);
  }
  function Hg(e) {
    return Bo(e) && Pt(e);
  }
  function Dn(e, o) {
    if (!(o === "constructor" && typeof e[o] == "function") && o != "__proto__")
      return e[o];
  }
  function Bg(e) {
    return jf(e, Ra(e));
  }
  function Ag(e, o, t, r, n, i, l) {
    var a = Dn(e, t), s = Dn(o, t), c = l.get(s);
    if (c) {
      _n(e, t, c);
      return;
    }
    var u = i ? i(a, s, t + "", e, o, l) : void 0, f = u === void 0;
    if (f) {
      var v = Ve(s), p = !v && Pr(s), d = !v && !p && oi(s);
      u = s, v || p || d ? Ve(a) ? u = a : Hg(a) ? u = zf(a) : p ? (f = !1, u = mv(s, !0)) : d ? (f = !1, u = Bv(s, !0)) : u = [] : Hp(s) || $r(s) ? (u = a, $r(a) ? u = Bg(a) : (!Ao(a) || qn(a)) && (u = Av(s))) : f = !1;
    }
    f && (l.set(s, u), n(u, s, r, i, l), l.delete(s)), _n(e, t, u);
  }
  function ts(e, o, t, r, n) {
    e !== o && os(o, function(i, l) {
      if (n || (n = new io()), Ao(i))
        Ag(e, o, l, t, ts, r, n);
      else {
        var a = r ? r(Dn(e, l), i, l + "", e, o, n) : void 0;
        a === void 0 && (a = i), _n(e, l, a);
      }
    }, Ra);
  }
  function Rg(e, o) {
    var t = -1, r = Pt(e) ? Array(e.length) : [];
    return Dg(e, function(n, i, l) {
      r[++t] = o(n, i, l);
    }), r;
  }
  function Fg(e, o) {
    var t = Ve(e) ? Oa : Rg;
    return t(e, Ig(o));
  }
  var Lg = Xf(function(e, o, t) {
    ts(e, o, t);
  });
  const Bt = Lg, Tt = {
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
    fontSize: Wg,
    fontFamily: Ng,
    lineHeight: jg
  } = Tt, rs = V("body", `
 margin: 0;
 font-size: ${Wg};
 font-family: ${Ng};
 line-height: ${jg};
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
    return O(() => {
      var c;
      const { theme: { common: u, self: f, peers: v = {} } = {}, themeOverrides: p = {}, builtinThemeOverrides: d = {} } = n, { common: g, peers: b } = p, { common: h = void 0, [e]: { common: $ = void 0, self: H = void 0, peers: I = {} } = {} } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, { common: M = void 0, [e]: E = {} } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, { common: x, peers: w = {} } = E, S = Bt({}, u || $ || h || r.common, M, x, g), C = Bt(
        // {}, executed every time, no need for empty obj
        (c = f || H || r.self) === null || c === void 0 ? void 0 : c(S),
        d,
        E,
        p
      );
      return {
        common: S,
        self: C,
        peers: Bt({}, r.peers, I, v),
        peerOverrides: Bt({}, d.peers, w, b)
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
      mergedBorderedRef: O(() => {
        var r, n;
        const { bordered: i } = e;
        return i !== void 0 ? i : (n = (r = t == null ? void 0 : t.mergedBorderedRef.value) !== null && r !== void 0 ? r : o.defaultBordered) !== null && n !== void 0 ? n : !0;
      }),
      mergedClsPrefixRef: O(() => (t == null ? void 0 : t.mergedClsPrefixRef.value) || ns),
      namespaceRef: O(() => t == null ? void 0 : t.mergedNamespaceRef.value)
    };
  }
  const Vg = {
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
  }, Ug = Vg;
  function rn(e) {
    return function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = o.width ? String(o.width) : e.defaultWidth, r = e.formats[t] || e.formats[e.defaultWidth];
      return r;
    };
  }
  function _t(e) {
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
  function Dt(e) {
    return function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = o.match(n);
      if (!i)
        return null;
      var l = i[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? Kg(a, function(f) {
        return f.test(l);
      }) : Gg(a, function(f) {
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
  function Gg(e, o) {
    for (var t in e)
      if (e.hasOwnProperty(t) && o(e[t]))
        return t;
  }
  function Kg(e, o) {
    for (var t = 0; t < e.length; t++)
      if (o(e[t]))
        return t;
  }
  function Xg(e) {
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
  var Yg = {
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
  }, qg = function(o, t, r) {
    var n, i = Yg[o];
    return typeof i == "string" ? n = i : t === 1 ? n = i.one : n = i.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
  };
  const Jg = qg;
  var Zg = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, Qg = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, em = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, om = {
    date: rn({
      formats: Zg,
      defaultWidth: "full"
    }),
    time: rn({
      formats: Qg,
      defaultWidth: "full"
    }),
    dateTime: rn({
      formats: em,
      defaultWidth: "full"
    })
  };
  const tm = om;
  var rm = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, nm = function(o, t, r, n) {
    return rm[o];
  };
  const im = nm;
  var lm = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }, am = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }, sm = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }, cm = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }, dm = {
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
  }, um = {
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
  }, fm = function(o, t) {
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
  }, hm = {
    ordinalNumber: fm,
    era: _t({
      values: lm,
      defaultWidth: "wide"
    }),
    quarter: _t({
      values: am,
      defaultWidth: "wide",
      argumentCallback: function(o) {
        return o - 1;
      }
    }),
    month: _t({
      values: sm,
      defaultWidth: "wide"
    }),
    day: _t({
      values: cm,
      defaultWidth: "wide"
    }),
    dayPeriod: _t({
      values: dm,
      defaultWidth: "wide",
      formattingValues: um,
      defaultFormattingWidth: "wide"
    })
  };
  const pm = hm;
  var vm = /^(\d+)(th|st|nd|rd)?/i, gm = /\d+/i, mm = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, bm = {
    any: [/^b/i, /^(a|c)/i]
  }, xm = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, Cm = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }, ym = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, Sm = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  }, wm = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, $m = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }, Pm = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, Tm = {
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
  }, zm = {
    ordinalNumber: Xg({
      matchPattern: vm,
      parsePattern: gm,
      valueCallback: function(o) {
        return parseInt(o, 10);
      }
    }),
    era: Dt({
      matchPatterns: mm,
      defaultMatchWidth: "wide",
      parsePatterns: bm,
      defaultParseWidth: "any"
    }),
    quarter: Dt({
      matchPatterns: xm,
      defaultMatchWidth: "wide",
      parsePatterns: Cm,
      defaultParseWidth: "any",
      valueCallback: function(o) {
        return o + 1;
      }
    }),
    month: Dt({
      matchPatterns: ym,
      defaultMatchWidth: "wide",
      parsePatterns: Sm,
      defaultParseWidth: "any"
    }),
    day: Dt({
      matchPatterns: wm,
      defaultMatchWidth: "wide",
      parsePatterns: $m,
      defaultParseWidth: "any"
    }),
    dayPeriod: Dt({
      matchPatterns: Pm,
      defaultMatchWidth: "any",
      parsePatterns: Tm,
      defaultParseWidth: "any"
    })
  };
  const Im = zm;
  var Mm = {
    code: "en-US",
    formatDistance: Jg,
    formatLong: tm,
    formatRelative: im,
    localize: pm,
    match: Im,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  const km = Mm, Om = {
    name: "en-US",
    locale: km
  }, Em = Om;
  function is(e) {
    const { mergedLocaleRef: o, mergedDateLocaleRef: t } = he(wo, null) || {}, r = O(() => {
      var i, l;
      return (l = (i = o == null ? void 0 : o.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : Ug[e];
    });
    return {
      dateLocaleRef: O(() => {
        var i;
        return (i = t == null ? void 0 : t.value) !== null && i !== void 0 ? i : Em;
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
    const i = (n = he(wo, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, l = A(""), a = Zo();
    let s;
    const c = `__${e}`, u = () => {
      let f = c;
      const v = o ? o.value : void 0, p = i == null ? void 0 : i.value;
      p && (f += "-" + p), v && (f += "-" + v);
      const { themeOverrides: d, builtinThemeOverrides: g } = r;
      d && (f += "-" + Vt(JSON.stringify(d))), g && (f += "-" + Vt(JSON.stringify(g))), l.value = f, s = () => {
        const b = t.value;
        let h = "";
        for (const $ in b)
          h += `${$}: ${b[$]};`;
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
    const r = Zo(), n = O(() => {
      const { value: l } = o;
      if (!l)
        return;
      const a = l[e];
      if (a)
        return a;
    }), i = () => {
      Co(() => {
        const { value: l } = t, a = `${l}${e}Rtl`;
        if (Td(a, r))
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
      name: cv(e),
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
  const _m = ie({
    name: "Checkmark",
    render() {
      return y(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
        y(
          "g",
          { fill: "none" },
          y("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })
        )
      );
    }
  }), Dm = as("close", y(
    "svg",
    { viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": !0 },
    y(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      y(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        y("path", { d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z" })
      )
    )
  )), Hm = ie({
    name: "Empty",
    render() {
      return y(
        "svg",
        { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        y("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
        y("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
      );
    }
  }), Bm = ie({
    name: "ChevronDown",
    render() {
      return y(
        "svg",
        { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        y("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
      );
    }
  }), Am = as("clear", y(
    "svg",
    { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    y(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      y(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        y("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" })
      )
    )
  )), ss = ie({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: o }) {
      const t = Hr();
      return () => y(St, { name: "icon-switch-transition", appear: t.value }, o);
    }
  }), Rm = Z("base-icon", `
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
      Fr("-base-icon", Rm, se(e, "clsPrefix"));
    },
    render() {
      return y("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
    }
  }), Fm = Z("base-close", `
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
 `), Je("disabled", [V("&:hover", `
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
 `)])]), Lm = ie({
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
      return Fr("-base-close", Fm, se(e, "clsPrefix")), () => {
        const { clsPrefix: o, disabled: t, absolute: r, round: n, isButtonTag: i } = e;
        return y(
          i ? "button" : "div",
          { type: i ? "button" : void 0, tabindex: t || !e.focusable ? -1 : 0, "aria-disabled": t, "aria-label": "close", role: i ? void 0 : "button", disabled: t, class: [
            `${o}-base-close`,
            r && `${o}-base-close--absolute`,
            t && `${o}-base-close--disabled`,
            n && `${o}-base-close--round`
          ], onMousedown: (a) => {
            e.focusable || a.preventDefault();
          }, onClick: e.onClick },
          y(Jt, { clsPrefix: o }, {
            default: () => y(Dm, null)
          })
        );
      };
    }
  }), Wm = ie({
    props: {
      onFocus: Function,
      onBlur: Function
    },
    setup(e) {
      return () => y("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
    }
  }), {
    cubicBezierEaseInOut: Nm
  } = Tt;
  function Hn({
    originalTransform: e = "",
    left: o = 0,
    top: t = 0,
    transition: r = `all .3s ${Nm} !important`
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
  const jm = V([V("@keyframes loading-container-rotate", `
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
 `), Z("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [Y("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [Hn()]), Y("container", `
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
 `, [Y("svg", `
 stroke: var(--n-text-color);
 fill: transparent;
 position: absolute;
 height: 100%;
 overflow: hidden;
 `), Y("container-layer", `
 position: absolute;
 width: 100%;
 height: 100%;
 animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 `, [Y("container-layer-left", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [Y("svg", `
 animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 width: 200%;
 `)]), Y("container-layer-patch", `
 position: absolute;
 top: 0;
 left: 47.5%;
 box-sizing: border-box;
 width: 5%;
 height: 100%;
 overflow: hidden;
 `, [Y("svg", `
 left: -900%;
 width: 2000%;
 transform: rotate(180deg);
 `)]), Y("container-layer-right", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [Y("svg", `
 animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 left: -100%;
 width: 200%;
 `)])])]), Y("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [Hn({
    left: "50%",
    top: "50%",
    originalTransform: "translateX(-50%) translateY(-50%)"
  })])])]), Vm = {
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
    } }, Vm),
    setup(e) {
      Fr("-base-loading", jm, se(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: o, strokeWidth: t, stroke: r, scale: n } = this, i = o / n;
      return y(
        "div",
        { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
        y(ss, null, {
          default: () => this.show ? y(
            "div",
            { key: "icon", class: `${e}-base-loading__transition-wrapper` },
            y(
              "div",
              { class: `${e}-base-loading__container` },
              y(
                "div",
                { class: `${e}-base-loading__container-layer` },
                y(
                  "div",
                  { class: `${e}-base-loading__container-layer-left` },
                  y(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    y("circle", { fill: "none", stroke: "currentColor", "stroke-width": t, "stroke-linecap": "round", cx: i, cy: i, r: o - t / 2, "stroke-dasharray": 4.91 * o, "stroke-dashoffset": 2.46 * o })
                  )
                ),
                y(
                  "div",
                  { class: `${e}-base-loading__container-layer-patch` },
                  y(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    y("circle", { fill: "none", stroke: "currentColor", "stroke-width": t, "stroke-linecap": "round", cx: i, cy: i, r: o - t / 2, "stroke-dasharray": 4.91 * o, "stroke-dashoffset": 2.46 * o })
                  )
                ),
                y(
                  "div",
                  { class: `${e}-base-loading__container-layer-right` },
                  y(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    y("circle", { fill: "none", stroke: "currentColor", "stroke-width": t, "stroke-linecap": "round", cx: i, cy: i, r: o - t / 2, "stroke-dasharray": 4.91 * o, "stroke-dashoffset": 2.46 * o })
                  )
                )
              )
            )
          ) : y("div", { key: "placeholder", class: `${e}-base-loading__placeholder` }, this.$slots)
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
  function Um(e, o = {}) {
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
  function Gm(e, o) {
    const { isLeaf: t } = e;
    return t !== void 0 ? t : !o(e);
  }
  function Km(e) {
    return e.children;
  }
  function Xm(e) {
    return e.key;
  }
  function Ym() {
    return !1;
  }
  function qm(e, o) {
    const { isLeaf: t } = e;
    return !(t === !1 && !Array.isArray(o(e)));
  }
  function Jm(e) {
    return e.disabled === !0;
  }
  function Zm(e, o) {
    return e.isLeaf === !1 && !Array.isArray(o(e));
  }
  function Qm(e, o) {
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
  function eb(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) || t.add(r);
    }), Array.from(t);
  }
  function ob(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) && t.delete(r);
    }), Array.from(t);
  }
  function tb(e) {
    return (e == null ? void 0 : e.type) === "group";
  }
  function rb(e) {
    const o = /* @__PURE__ */ new Map();
    return e.forEach((t, r) => {
      o.set(t.key, r);
    }), (t) => {
      var r;
      return (r = o.get(t)) !== null && r !== void 0 ? r : null;
    };
  }
  class nb extends Error {
    constructor() {
      super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
    }
  }
  function ib(e, o, t, r) {
    return Ir(o.concat(e), t, r, !1);
  }
  function lb(e, o) {
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
  function ab(e, o, t, r) {
    const n = Ir(o, t, r, !1), i = Ir(e, t, r, !0), l = lb(e, t), a = [];
    return n.forEach((s) => {
      (i.has(s) || l.has(s)) && a.push(s);
    }), a.forEach((s) => n.delete(s)), n;
  }
  function an(e, o) {
    const { checkedKeys: t, keysToCheck: r, keysToUncheck: n, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: c } = e;
    if (!l)
      return r !== void 0 ? {
        checkedKeys: eb(t, r),
        indeterminateKeys: Array.from(i)
      } : n !== void 0 ? {
        checkedKeys: ob(t, n),
        indeterminateKeys: Array.from(i)
      } : {
        checkedKeys: Array.from(t),
        indeterminateKeys: Array.from(i)
      };
    const { levelTreeNodeMap: u } = o;
    let f;
    n !== void 0 ? f = ab(n, t, o, c) : r !== void 0 ? f = ib(r, t, o, c) : f = Ir(t, o, c, !1);
    const v = s === "parent", p = s === "child" || a, d = f, g = /* @__PURE__ */ new Set(), b = Math.max.apply(null, Array.from(u.keys()));
    for (let h = b; h >= 0; h -= 1) {
      const $ = h === 0, H = u.get(h);
      for (const I of H) {
        if (I.isLeaf)
          continue;
        const { key: M, shallowLoaded: E } = I;
        if (p && E && I.children.forEach((C) => {
          !C.disabled && !C.isLeaf && C.shallowLoaded && d.has(C.key) && d.delete(C.key);
        }), I.disabled || !E)
          continue;
        let x = !0, w = !1, S = !0;
        for (const C of I.children) {
          const P = C.key;
          if (!C.disabled) {
            if (S && (S = !1), d.has(P))
              w = !0;
            else if (g.has(P)) {
              w = !0, x = !1;
              break;
            } else if (x = !1, w)
              break;
          }
        }
        x && !S ? (v && I.children.forEach((C) => {
          !C.disabled && d.has(C.key) && d.delete(C.key);
        }), d.add(M)) : w && g.add(M), $ && p && d.has(M) && d.delete(M);
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
        if (!l.has(f) && (l.add(f), a.add(f), Zm(u.rawNode, i))) {
          if (r)
            return Bn.STOP;
          if (!t)
            throw new nb();
        }
      });
    }), a;
  }
  function sb(e, { includeGroup: o = !1, includeSelf: t = !0 }, r) {
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
  function cb(e) {
    if (e.length === 0)
      return null;
    const o = e[0];
    return o.isGroup || o.ignored || o.disabled ? o.getNext() : o;
  }
  function db(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n + 1) % r] : n === t.length - 1 ? null : t[n + 1];
  }
  function bl(e, o, { loop: t = !1, includeDisabled: r = !1 } = {}) {
    const n = o === "prev" ? ub : db, i = {
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
            const f = fb(c);
            f != null && f.isGroup ? s(n(f, t)) : t && s(n(c, !0));
          }
        }
      }
    }
    return s(e), a;
  }
  function ub(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n - 1 + r) % r] : n === 0 ? null : t[n - 1];
  }
  function fb(e) {
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
  const hb = {
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
  function pb(e, o) {
    const t = o ? new Set(o) : void 0, r = [];
    function n(i) {
      i.forEach((l) => {
        r.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
        t === void 0 || t.has(l.key)) && n(l.children);
      });
    }
    return n(e), r;
  }
  function vb(e, o) {
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
      process.env.NODE_ENV !== "production" && Qm(s, n) && console.error("[treemate]: node", s, "is invalid");
      const f = Object.create(r);
      if (f.rawNode = s, f.siblings = a, f.level = l, f.index = c, f.isFirstChild = c === 0, f.isLastChild = c + 1 === e.length, f.parent = i, !f.ignored) {
        const v = n(s);
        Array.isArray(v) && (f.children = us(v, o, t, r, n, f, l + 1));
      }
      a.push(f), o.set(f.key, f), t.has(l) || t.set(l, []), (u = t.get(l)) === null || u === void 0 || u.push(f);
    }), a;
  }
  function gb(e, o = {}) {
    var t;
    const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), { getDisabled: i = Jm, getIgnored: l = Ym, getIsGroup: a = tb, getKey: s = Xm } = o, c = (t = o.getChildren) !== null && t !== void 0 ? t : Km, u = o.ignoreEmptyChildren ? (I) => {
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
        return Gm(this.rawNode, u);
      },
      get shallowLoaded() {
        return qm(this.rawNode, u);
      },
      get ignored() {
        return l(this.rawNode);
      },
      contains(I) {
        return vb(this, I);
      }
    }, hb), v = us(e, r, n, f, u);
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
      const E = d(I);
      return E ? E.getPrev(M) : null;
    }
    function b(I, M) {
      const E = d(I);
      return E ? E.getNext(M) : null;
    }
    function h(I) {
      const M = d(I);
      return M ? M.getParent() : null;
    }
    function $(I) {
      const M = d(I);
      return M ? M.getChild() : null;
    }
    const H = {
      treeNodes: v,
      treeNodeMap: r,
      levelTreeNodeMap: n,
      maxLevel: Math.max(...n.keys()),
      getChildren: u,
      getFlattenedNodes(I) {
        return pb(v, I);
      },
      getNode: p,
      getPrev: g,
      getNext: b,
      getParent: h,
      getChild: $,
      getFirstAvailableNode() {
        return cb(v);
      },
      getPath(I, M = {}) {
        return sb(I, M, H);
      },
      getCheckedKeys(I, M = {}) {
        const { cascade: E = !0, leafOnly: x = !1, checkStrategy: w = "all", allowNotLoaded: S = !1 } = M;
        return an({
          checkedKeys: nn(I),
          indeterminateKeys: ln(I),
          cascade: E,
          leafOnly: x,
          checkStrategy: w,
          allowNotLoaded: S
        }, H);
      },
      check(I, M, E = {}) {
        const { cascade: x = !0, leafOnly: w = !1, checkStrategy: S = "all", allowNotLoaded: C = !1 } = E;
        return an({
          checkedKeys: nn(M),
          indeterminateKeys: ln(M),
          keysToCheck: I == null ? [] : ml(I),
          cascade: x,
          leafOnly: w,
          checkStrategy: S,
          allowNotLoaded: C
        }, H);
      },
      uncheck(I, M, E = {}) {
        const { cascade: x = !0, leafOnly: w = !1, checkStrategy: S = "all", allowNotLoaded: C = !1 } = E;
        return an({
          checkedKeys: nn(M),
          indeterminateKeys: ln(M),
          keysToUncheck: I == null ? [] : ml(I),
          cascade: x,
          leafOnly: w,
          checkStrategy: S,
          allowNotLoaded: C
        }, H);
      },
      getNonLeafKeys(I = {}) {
        return Um(v, I);
      }
    };
    return H;
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
  }, mb = yo(j.neutralBase), fs = yo(j.neutralInvertBase), bb = "rgba(" + fs.slice(0, 3).join(", ") + ", ";
  function ae(e) {
    return bb + String(e) + ")";
  }
  function xb(e) {
    const o = Array.from(fs);
    return o[3] = Number(e), Q(mb, o);
  }
  const Cb = Object.assign(Object.assign({ name: "common" }, Tt), {
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
    tagColor: xb(j.alphaTag),
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
  }), R = Cb, J = {
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
  }, yb = yo(J.neutralBase), hs = yo(J.neutralInvertBase), Sb = "rgba(" + hs.slice(0, 3).join(", ") + ", ";
  function xl(e) {
    return Sb + String(e) + ")";
  }
  function ye(e) {
    const o = Array.from(hs);
    return o[3] = Number(e), Q(yb, o);
  }
  const wb = Object.assign(Object.assign({ name: "common" }, Tt), {
    baseColor: J.neutralBase,
    // primary color
    primaryColor: J.primaryDefault,
    primaryColorHover: J.primaryHover,
    primaryColorPressed: J.primaryActive,
    primaryColorSuppl: J.primarySuppl,
    // info color
    infoColor: J.infoDefault,
    infoColorHover: J.infoHover,
    infoColorPressed: J.infoActive,
    infoColorSuppl: J.infoSuppl,
    // success color
    successColor: J.successDefault,
    successColorHover: J.successHover,
    successColorPressed: J.successActive,
    successColorSuppl: J.successSuppl,
    // warning color
    warningColor: J.warningDefault,
    warningColorHover: J.warningHover,
    warningColorPressed: J.warningActive,
    warningColorSuppl: J.warningSuppl,
    // error color
    errorColor: J.errorDefault,
    errorColorHover: J.errorHover,
    errorColorPressed: J.errorActive,
    errorColorSuppl: J.errorSuppl,
    // text color
    textColorBase: J.neutralTextBase,
    textColor1: "rgb(31, 34, 37)",
    textColor2: "rgb(51, 54, 57)",
    textColor3: "rgb(118, 124, 130)",
    // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
    // textColor5: neutral(base.alpha5),
    textColorDisabled: ye(J.alpha4),
    placeholderColor: ye(J.alpha4),
    placeholderColorDisabled: ye(J.alpha5),
    iconColor: ye(J.alpha4),
    iconColorHover: ve(ye(J.alpha4), { lightness: 0.75 }),
    iconColorPressed: ve(ye(J.alpha4), { lightness: 0.9 }),
    iconColorDisabled: ye(J.alpha5),
    opacity1: J.alpha1,
    opacity2: J.alpha2,
    opacity3: J.alpha3,
    opacity4: J.alpha4,
    opacity5: J.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    // close
    closeIconColor: ye(Number(J.alphaClose)),
    closeIconColorHover: ye(Number(J.alphaClose)),
    closeIconColorPressed: ye(Number(J.alphaClose)),
    closeColorHover: "rgba(0, 0, 0, .09)",
    closeColorPressed: "rgba(0, 0, 0, .13)",
    // clear
    clearColor: ye(J.alpha4),
    clearColorHover: ve(ye(J.alpha4), { lightness: 0.75 }),
    clearColorPressed: ve(ye(J.alpha4), { lightness: 0.9 }),
    scrollbarColor: xl(J.alphaScrollbar),
    scrollbarColorHover: xl(J.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: ye(J.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: J.neutralPopover,
    tableColor: J.neutralCard,
    cardColor: J.neutralCard,
    modalColor: J.neutralModal,
    bodyColor: J.neutralBody,
    tagColor: "#eee",
    avatarColor: ye(J.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: ye(J.alphaInput),
    codeColor: "rgb(244, 244, 248)",
    tabColor: "rgb(247, 247, 250)",
    actionColor: "rgb(250, 250, 252)",
    tableHeaderColor: "rgb(250, 250, 252)",
    hoverColor: "rgb(243, 243, 245)",
    // use color with alpha since it can be nested with header filter & sorter effect
    tableColorHover: "rgba(0, 0, 100, 0.03)",
    tableColorStriped: "rgba(0, 0, 100, 0.02)",
    pressedColor: "rgb(237, 237, 239)",
    opacityDisabled: J.alphaDisabled,
    inputColorDisabled: "rgb(250, 250, 252)",
    // secondary button color
    // can also be used in tertiary button & quaternary button
    buttonColor2: "rgba(46, 51, 56, .05)",
    buttonColor2Hover: "rgba(46, 51, 56, .09)",
    buttonColor2Pressed: "rgba(46, 51, 56, .13)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), ao = wb, $b = {
    iconSizeSmall: "34px",
    iconSizeMedium: "40px",
    iconSizeLarge: "46px",
    iconSizeHuge: "52px"
  }, ps = (e) => {
    const { textColorDisabled: o, iconColor: t, textColor2: r, fontSizeSmall: n, fontSizeMedium: i, fontSizeLarge: l, fontSizeHuge: a } = e;
    return Object.assign(Object.assign({}, $b), {
      fontSizeSmall: n,
      fontSizeMedium: i,
      fontSizeLarge: l,
      fontSizeHuge: a,
      textColor: o,
      iconColor: t,
      extraTextColor: r
    });
  }, Pb = {
    name: "Empty",
    common: ao,
    self: ps
  }, ai = Pb, Tb = {
    name: "Empty",
    common: R,
    self: ps
  }, rt = Tb, zb = Z("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [Y("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [V("+", [Y("description", `
 margin-top: 8px;
 `)])]), Y("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), Y("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), Ib = Object.assign(Object.assign({}, pe.props), { description: String, showDescription: {
    type: Boolean,
    default: !0
  }, showIcon: {
    type: Boolean,
    default: !0
  }, size: {
    type: String,
    default: "medium"
  }, renderIcon: Function }), Mb = ie({
    name: "Empty",
    props: Ib,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = tt(e), r = pe("Empty", "-empty", zb, ai, e, o), { localeRef: n } = is("Empty"), i = he(wo, null), l = O(() => {
        var u, f, v;
        return (u = e.description) !== null && u !== void 0 ? u : (v = (f = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || f === void 0 ? void 0 : f.Empty) === null || v === void 0 ? void 0 : v.description;
      }), a = O(() => {
        var u, f;
        return ((f = (u = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || u === void 0 ? void 0 : u.Empty) === null || f === void 0 ? void 0 : f.renderIcon) || (() => y(Hm, null));
      }), s = O(() => {
        const { size: u } = e, { common: { cubicBezierEaseInOut: f }, self: { [ce("iconSize", u)]: v, [ce("fontSize", u)]: p, textColor: d, iconColor: g, extraTextColor: b } } = r.value;
        return {
          "--n-icon-size": v,
          "--n-font-size": p,
          "--n-bezier": f,
          "--n-text-color": d,
          "--n-icon-color": g,
          "--n-extra-text-color": b
        };
      }), c = t ? To("empty", O(() => {
        let u = "";
        const { size: f } = e;
        return u += f[0], u;
      }), s, e) : void 0;
      return {
        mergedClsPrefix: o,
        mergedRenderIcon: a,
        localizedDescription: O(() => l.value || n.value.description),
        cssVars: t ? void 0 : s,
        themeClass: c == null ? void 0 : c.themeClass,
        onRender: c == null ? void 0 : c.onRender
      };
    },
    render() {
      const { $slots: e, mergedClsPrefix: o, onRender: t } = this;
      return t == null || t(), y(
        "div",
        { class: [`${o}-empty`, this.themeClass], style: this.cssVars },
        this.showIcon ? y("div", { class: `${o}-empty__icon` }, e.icon ? e.icon() : y(Jt, { clsPrefix: o }, { default: this.mergedRenderIcon })) : null,
        this.showDescription ? y("div", { class: `${o}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null,
        e.extra ? y("div", { class: `${o}-empty__extra` }, e.extra()) : null
      );
    }
  }), vs = (e) => {
    const { scrollbarColor: o, scrollbarColorHover: t } = e;
    return {
      color: o,
      colorHover: t
    };
  }, kb = {
    name: "Scrollbar",
    common: ao,
    self: vs
  }, gs = kb, Ob = {
    name: "Scrollbar",
    common: R,
    self: vs
  }, _e = Ob, {
    cubicBezierEaseInOut: Cl
  } = Tt;
  function Eb({
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
  const _b = Z("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [V(">", [Z("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [V("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), V(">", [Z("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), V(">, +", [Z("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [le("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [V(">", [Y("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), le("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [V(">", [Y("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), le("disabled", [V(">", [Y("scrollbar", {
    pointerEvents: "none"
  })])]), V(">", [Y("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [Eb(), V("&:hover", {
    backgroundColor: "var(--n-scrollbar-color-hover)"
  })])])])])]), Db = Object.assign(Object.assign({}, pe.props), {
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
    props: Db,
    inheritAttrs: !1,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t, mergedRtlRef: r } = tt(e), n = ls("Scrollbar", r, o), i = A(null), l = A(null), a = A(null), s = A(null), c = A(null), u = A(null), f = A(null), v = A(null), p = A(null), d = A(null), g = A(null), b = A(0), h = A(0), $ = A(!1), H = A(!1);
      let I = !1, M = !1, E, x, w = 0, S = 0, C = 0, P = 0;
      const z = Gd(), L = O(() => {
        const { value: m } = v, { value: T } = u, { value: B } = d;
        return m === null || T === null || B === null ? 0 : Math.min(m, B * m / T + e.size * 1.5);
      }), _ = O(() => `${L.value}px`), N = O(() => {
        const { value: m } = p, { value: T } = f, { value: B } = g;
        return m === null || T === null || B === null ? 0 : B * m / T + e.size * 1.5;
      }), U = O(() => `${N.value}px`), G = O(() => {
        const { value: m } = v, { value: T } = b, { value: B } = u, { value: X } = d;
        if (m === null || B === null || X === null)
          return 0;
        {
          const q = B - m;
          return q ? T / q * (X - L.value) : 0;
        }
      }), oe = O(() => `${G.value}px`), k = O(() => {
        const { value: m } = p, { value: T } = h, { value: B } = f, { value: X } = g;
        if (m === null || B === null || X === null)
          return 0;
        {
          const q = B - m;
          return q ? T / q * (X - N.value) : 0;
        }
      }), W = O(() => `${k.value}px`), re = O(() => {
        const { value: m } = v, { value: T } = u;
        return m !== null && T !== null && T > m;
      }), fe = O(() => {
        const { value: m } = p, { value: T } = f;
        return m !== null && T !== null && T > m;
      }), Ie = O(() => {
        const { trigger: m } = e;
        return m === "none" || $.value;
      }), so = O(() => {
        const { trigger: m } = e;
        return m === "none" || H.value;
      }), Pe = O(() => {
        const { container: m } = e;
        return m ? m() : l.value;
      }), eo = O(() => {
        const { content: m } = e;
        return m ? m() : a.value;
      }), Re = Nu(() => {
        e.container || Ke({
          top: b.value,
          left: h.value
        });
      }), He = () => {
        Re.isDeactivated || We();
      }, Ce = (m) => {
        if (Re.isDeactivated)
          return;
        const { onResize: T } = e;
        T && T(m), We();
      }, Ke = (m, T) => {
        if (!e.scrollable)
          return;
        if (typeof m == "number") {
          Le(T ?? 0, m, 0, !1, "auto");
          return;
        }
        const { left: B, top: X, index: q, elSize: ee, position: te, behavior: ne, el: ke, debounce: po = !0 } = m;
        (B !== void 0 || X !== void 0) && Le(B ?? 0, X ?? 0, 0, !1, ne), ke !== void 0 ? Le(0, ke.offsetTop, ke.offsetHeight, po, ne) : q !== void 0 && ee !== void 0 ? Le(0, q * ee, ee, po, ne) : te === "bottom" ? Le(0, Number.MAX_SAFE_INTEGER, 0, !1, ne) : te === "top" && Le(0, 0, 0, !1, ne);
      }, Fe = (m, T) => {
        if (!e.scrollable)
          return;
        const { value: B } = Pe;
        B && (typeof m == "object" ? B.scrollBy(m) : B.scrollBy(m, T || 0));
      };
      function Le(m, T, B, X, q) {
        const { value: ee } = Pe;
        if (ee) {
          if (X) {
            const { scrollTop: te, offsetHeight: ne } = ee;
            if (T > te) {
              T + B <= te + ne || ee.scrollTo({
                left: m,
                top: T + B - ne,
                behavior: q
              });
              return;
            }
          }
          ee.scrollTo({
            left: m,
            top: T,
            behavior: q
          });
        }
      }
      function co() {
        zo(), Io(), We();
      }
      function uo() {
        fo();
      }
      function fo() {
        Ro(), Fo();
      }
      function Ro() {
        x !== void 0 && window.clearTimeout(x), x = window.setTimeout(() => {
          H.value = !1;
        }, e.duration);
      }
      function Fo() {
        E !== void 0 && window.clearTimeout(E), E = window.setTimeout(() => {
          $.value = !1;
        }, e.duration);
      }
      function zo() {
        E !== void 0 && window.clearTimeout(E), $.value = !0;
      }
      function Io() {
        x !== void 0 && window.clearTimeout(x), H.value = !0;
      }
      function Me(m) {
        const { onScroll: T } = e;
        T && T(m), F();
      }
      function F() {
        const { value: m } = Pe;
        m && (b.value = m.scrollTop, h.value = m.scrollLeft * (n != null && n.value ? -1 : 1));
      }
      function K() {
        const { value: m } = eo;
        m && (u.value = m.offsetHeight, f.value = m.offsetWidth);
        const { value: T } = Pe;
        T && (v.value = T.offsetHeight, p.value = T.offsetWidth);
        const { value: B } = c, { value: X } = s;
        B && (g.value = B.offsetWidth), X && (d.value = X.offsetHeight);
      }
      function de() {
        const { value: m } = Pe;
        m && (b.value = m.scrollTop, h.value = m.scrollLeft * (n != null && n.value ? -1 : 1), v.value = m.offsetHeight, p.value = m.offsetWidth, u.value = m.scrollHeight, f.value = m.scrollWidth);
        const { value: T } = c, { value: B } = s;
        T && (g.value = T.offsetWidth), B && (d.value = B.offsetHeight);
      }
      function We() {
        e.scrollable && (e.useUnifiedContainer ? de() : (K(), F()));
      }
      function it(m) {
        var T;
        return !(!((T = i.value) === null || T === void 0) && T.contains(jt(m)));
      }
      function Mt(m) {
        m.preventDefault(), m.stopPropagation(), M = !0, ze("mousemove", window, lt, !0), ze("mouseup", window, at, !0), S = h.value, C = n != null && n.value ? window.innerWidth - m.clientX : m.clientX;
      }
      function lt(m) {
        if (!M)
          return;
        E !== void 0 && window.clearTimeout(E), x !== void 0 && window.clearTimeout(x);
        const { value: T } = p, { value: B } = f, { value: X } = N;
        if (T === null || B === null)
          return;
        const ee = (n != null && n.value ? window.innerWidth - m.clientX - C : m.clientX - C) * (B - T) / (T - X), te = B - T;
        let ne = S + ee;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Pe;
        if (ke) {
          ke.scrollLeft = ne * (n != null && n.value ? -1 : 1);
          const { internalOnUpdateScrollLeft: po } = e;
          po && po(ne);
        }
      }
      function at(m) {
        m.preventDefault(), m.stopPropagation(), me("mousemove", window, lt, !0), me("mouseup", window, at, !0), M = !1, We(), it(m) && fo();
      }
      function st(m) {
        m.preventDefault(), m.stopPropagation(), I = !0, ze("mousemove", window, Mo, !0), ze("mouseup", window, ko, !0), w = b.value, P = m.clientY;
      }
      function Mo(m) {
        if (!I)
          return;
        E !== void 0 && window.clearTimeout(E), x !== void 0 && window.clearTimeout(x);
        const { value: T } = v, { value: B } = u, { value: X } = L;
        if (T === null || B === null)
          return;
        const ee = (m.clientY - P) * (B - T) / (T - X), te = B - T;
        let ne = w + ee;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Pe;
        ke && (ke.scrollTop = ne);
      }
      function ko(m) {
        m.preventDefault(), m.stopPropagation(), me("mousemove", window, Mo, !0), me("mouseup", window, ko, !0), I = !1, We(), it(m) && fo();
      }
      Co(() => {
        const { value: m } = fe, { value: T } = re, { value: B } = o, { value: X } = c, { value: q } = s;
        X && (m ? X.classList.remove(`${B}-scrollbar-rail--disabled`) : X.classList.add(`${B}-scrollbar-rail--disabled`)), q && (T ? q.classList.remove(`${B}-scrollbar-rail--disabled`) : q.classList.add(`${B}-scrollbar-rail--disabled`));
      }), Ue(() => {
        e.container || We();
      }), Qe(() => {
        E !== void 0 && window.clearTimeout(E), x !== void 0 && window.clearTimeout(x), me("mousemove", window, Mo, !0), me("mouseup", window, ko, !0);
      });
      const kt = pe("Scrollbar", "-scrollbar", _b, gs, e, o), ct = O(() => {
        const { common: { cubicBezierEaseInOut: m, scrollbarBorderRadius: T, scrollbarHeight: B, scrollbarWidth: X }, self: { color: q, colorHover: ee } } = kt.value;
        return {
          "--n-scrollbar-bezier": m,
          "--n-scrollbar-color": q,
          "--n-scrollbar-color-hover": ee,
          "--n-scrollbar-border-radius": T,
          "--n-scrollbar-width": X,
          "--n-scrollbar-height": B
        };
      }), Xe = t ? To("scrollbar", void 0, ct, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: Ke,
        scrollBy: Fe,
        sync: We,
        syncUnifiedContainer: de,
        handleMouseEnterWrapper: co,
        handleMouseLeaveWrapper: uo
      }), {
        mergedClsPrefix: o,
        rtlEnabled: n,
        containerScrollTop: b,
        wrapperRef: i,
        containerRef: l,
        contentRef: a,
        yRailRef: s,
        xRailRef: c,
        needYBar: re,
        needXBar: fe,
        yBarSizePx: _,
        xBarSizePx: U,
        yBarTopPx: oe,
        xBarLeftPx: W,
        isShowXBar: Ie,
        isShowYBar: so,
        isIos: z,
        handleScroll: Me,
        handleContentResize: He,
        handleContainerResize: Ce,
        handleYScrollMouseDown: st,
        handleXScrollMouseDown: Mt,
        cssVars: t ? void 0 : ct,
        themeClass: Xe == null ? void 0 : Xe.themeClass,
        onRender: Xe == null ? void 0 : Xe.onRender
      });
    },
    render() {
      var e;
      const { $slots: o, mergedClsPrefix: t, triggerDisplayManually: r, rtlEnabled: n, internalHoistYRail: i } = this;
      if (!this.scrollable)
        return (e = o.default) === null || e === void 0 ? void 0 : e.call(o);
      const l = this.trigger === "none", a = () => y("div", { ref: "yRailRef", class: [
        `${t}-scrollbar-rail`,
        `${t}-scrollbar-rail--vertical`
      ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, y(l ? yn : St, l ? null : { name: "fade-in-transition" }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? y("div", { class: `${t}-scrollbar-rail__scrollbar`, style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        }, onMousedown: this.handleYScrollMouseDown }) : null
      })), s = () => {
        var u, f;
        return (u = this.onRender) === null || u === void 0 || u.call(this), y("div", Or(this.$attrs, {
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
          this.container ? (f = o.default) === null || f === void 0 ? void 0 : f.call(o) : y(
            "div",
            { role: "none", ref: "containerRef", class: [
              `${t}-scrollbar-container`,
              this.containerClass
            ], style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel },
            y(Sr, { onResize: this.handleContentResize }, {
              default: () => y("div", { ref: "contentRef", role: "none", style: [
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
          this.xScrollable && y("div", { ref: "xRailRef", class: [
            `${t}-scrollbar-rail`,
            `${t}-scrollbar-rail--horizontal`
          ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, y(l ? yn : St, l ? null : { name: "fade-in-transition" }, {
            default: () => this.needXBar && this.isShowXBar && !this.isIos ? y("div", { class: `${t}-scrollbar-rail__scrollbar`, style: {
              width: this.xBarSizePx,
              right: n ? this.xBarLeftPx : void 0,
              left: n ? void 0 : this.xBarLeftPx
            }, onMousedown: this.handleXScrollMouseDown }) : null
          }))
        ]);
      }, c = this.container ? s() : y(Sr, { onResize: this.handleContainerResize }, {
        default: s
      });
      return i ? y(
        to,
        null,
        c,
        a()
      ) : c;
    }
  }), Hb = ms, Bb = ms, Ab = {
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
    const { borderRadius: o, popoverColor: t, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: l, textColorDisabled: a, primaryColor: s, opacityDisabled: c, hoverColor: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p, fontSizeHuge: d, heightSmall: g, heightMedium: b, heightLarge: h, heightHuge: $ } = e;
    return Object.assign(Object.assign({}, Ab), { optionFontSizeSmall: f, optionFontSizeMedium: v, optionFontSizeLarge: p, optionFontSizeHuge: d, optionHeightSmall: g, optionHeightMedium: b, optionHeightLarge: h, optionHeightHuge: $, borderRadius: o, color: t, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: l, optionTextColorDisabled: a, optionTextColorActive: s, optionOpacityDisabled: c, optionCheckColor: s, optionColorPending: u, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: u, actionTextColor: i, loadingColor: s });
  }, Rb = {
    name: "InternalSelectMenu",
    common: ao,
    peers: {
      Scrollbar: gs,
      Empty: ai
    },
    self: bs
  }, xs = Rb, Fb = {
    name: "InternalSelectMenu",
    common: R,
    peers: {
      Scrollbar: _e,
      Empty: rt
    },
    self: bs
  }, Zt = Fb;
  function Lb(e, o) {
    return y(St, { name: "fade-in-scale-up-transition" }, {
      default: () => e ? y(Jt, { clsPrefix: o, class: `${o}-base-select-option__check` }, {
        default: () => y(_m)
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
      } = he(Un), p = Ze(() => {
        const { value: h } = t;
        return h ? e.tmNode.key === h.key : !1;
      });
      function d(h) {
        const { tmNode: $ } = e;
        $.disabled || f(h, $);
      }
      function g(h) {
        const { tmNode: $ } = e;
        $.disabled || v(h, $);
      }
      function b(h) {
        const { tmNode: $ } = e, { value: H } = p;
        $.disabled || H || v(h, $);
      }
      return {
        multiple: r,
        isGrouped: Ze(() => {
          const { tmNode: h } = e, { parent: $ } = h;
          return $ && $.rawNode.type === "group";
        }),
        showCheckmark: c,
        nodeProps: u,
        isPending: p,
        isSelected: Ze(() => {
          const { value: h } = o, { value: $ } = r;
          if (h === null)
            return !1;
          const H = e.tmNode.rawNode[s.value];
          if ($) {
            const { value: I } = n;
            return I.has(H);
          } else
            return h === H;
        }),
        labelField: a,
        renderLabel: i,
        renderOption: l,
        handleMouseMove: b,
        handleMouseEnter: g,
        handleClick: d
      };
    },
    render() {
      const { clsPrefix: e, tmNode: { rawNode: o }, isSelected: t, isPending: r, isGrouped: n, showCheckmark: i, nodeProps: l, renderOption: a, renderLabel: s, handleClick: c, handleMouseEnter: u, handleMouseMove: f } = this, v = Lb(t, e), p = s ? [s(o, t), i && v] : [
        gt(o[this.labelField], o, t),
        i && v
      ], d = l == null ? void 0 : l(o), g = y(
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
        y("div", { class: `${e}-base-select-option__content` }, p)
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
      const { clsPrefix: e, renderLabel: o, renderOption: t, nodeProps: r, tmNode: { rawNode: n } } = this, i = r == null ? void 0 : r(n), l = o ? o(n, !1) : gt(n[this.labelField], n, !1), a = y("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), l);
      return n.render ? n.render({ node: a, option: n }) : t ? t({ node: a, option: n, selected: !1 }) : a;
    }
  }), {
    cubicBezierEaseIn: wl,
    cubicBezierEaseOut: $l
  } = Tt;
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
  const Wb = Z("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [Z("scrollbar", `
 max-height: var(--n-height);
 `), Z("virtual-list", `
 max-height: var(--n-height);
 `), Z("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [Y("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), Z("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), Z("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), Y("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), Y("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), Y("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), Z("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), Z("base-select-option", `
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
 `, [Je("selected", `
 color: var(--n-option-text-color-disabled);
 `), le("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), Y("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [Cs({
    enterScale: "0.5"
  })])])]), Nb = ie({
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
      const o = pe("InternalSelectMenu", "-internal-select-menu", Wb, xs, e, se(e, "clsPrefix")), t = A(null), r = A(null), n = A(null), i = O(() => e.treeMate.getFlattenedNodes()), l = O(() => rb(i.value)), a = A(null);
      function s() {
        const { treeMate: k } = e;
        let W = null;
        const { value: re } = e;
        re === null ? W = k.getFirstAvailableNode() : (e.multiple ? W = k.getNode((re || [])[(re || []).length - 1]) : W = k.getNode(re), (!W || W.disabled) && (W = k.getFirstAvailableNode())), P(W || null);
      }
      function c() {
        const { value: k } = a;
        k && !e.treeMate.getNode(k.key) && (a.value = null);
      }
      let u;
      xe(() => e.show, (k) => {
        k ? u = xe(() => e.treeMate, () => {
          e.resetMenuOnOptionsChange ? (e.autoPending ? s() : c(), yt(z)) : c();
        }, {
          immediate: !0
        }) : u == null || u();
      }, {
        immediate: !0
      }), Qe(() => {
        u == null || u();
      });
      const f = O(() => bn(o.value.self[ce("optionHeight", e.size)])), v = O(() => Vr(o.value.self[ce("padding", e.size)])), p = O(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), d = O(() => {
        const k = i.value;
        return k && k.length === 0;
      });
      function g(k) {
        const { onToggle: W } = e;
        W && W(k);
      }
      function b(k) {
        const { onScroll: W } = e;
        W && W(k);
      }
      function h(k) {
        var W;
        (W = n.value) === null || W === void 0 || W.sync(), b(k);
      }
      function $() {
        var k;
        (k = n.value) === null || k === void 0 || k.sync();
      }
      function H() {
        const { value: k } = a;
        return k || null;
      }
      function I(k, W) {
        W.disabled || P(W, !1);
      }
      function M(k, W) {
        W.disabled || g(W);
      }
      function E(k) {
        var W;
        br(k, "action") || (W = e.onKeyup) === null || W === void 0 || W.call(e, k);
      }
      function x(k) {
        var W;
        br(k, "action") || (W = e.onKeydown) === null || W === void 0 || W.call(e, k);
      }
      function w(k) {
        var W;
        (W = e.onMousedown) === null || W === void 0 || W.call(e, k), !e.focusable && k.preventDefault();
      }
      function S() {
        const { value: k } = a;
        k && P(k.getNext({ loop: !0 }), !0);
      }
      function C() {
        const { value: k } = a;
        k && P(k.getPrev({ loop: !0 }), !0);
      }
      function P(k, W = !1) {
        a.value = k, W && z();
      }
      function z() {
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
      function L(k) {
        var W, re;
        !((W = t.value) === null || W === void 0) && W.contains(k.target) && ((re = e.onFocus) === null || re === void 0 || re.call(e, k));
      }
      function _(k) {
        var W, re;
        !((W = t.value) === null || W === void 0) && W.contains(k.relatedTarget) || (re = e.onBlur) === null || re === void 0 || re.call(e, k);
      }
      ro(Un, {
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
      }), ro(la, t), Ue(() => {
        const { value: k } = n;
        k && k.sync();
      });
      const N = O(() => {
        const { size: k } = e, { common: { cubicBezierEaseInOut: W }, self: { height: re, borderRadius: fe, color: Ie, groupHeaderTextColor: so, actionDividerColor: Pe, optionTextColorPressed: eo, optionTextColor: Re, optionTextColorDisabled: He, optionTextColorActive: Ce, optionOpacityDisabled: Ke, optionCheckColor: Fe, actionTextColor: Le, optionColorPending: co, optionColorActive: uo, loadingColor: fo, loadingSize: Ro, optionColorActivePending: Fo, [ce("optionFontSize", k)]: zo, [ce("optionHeight", k)]: Io, [ce("optionPadding", k)]: Me } } = o.value;
        return {
          "--n-height": re,
          "--n-action-divider-color": Pe,
          "--n-action-text-color": Le,
          "--n-bezier": W,
          "--n-border-radius": fe,
          "--n-color": Ie,
          "--n-option-font-size": zo,
          "--n-group-header-text-color": so,
          "--n-option-check-color": Fe,
          "--n-option-color-pending": co,
          "--n-option-color-active": uo,
          "--n-option-color-active-pending": Fo,
          "--n-option-height": Io,
          "--n-option-opacity-disabled": Ke,
          "--n-option-text-color": Re,
          "--n-option-text-color-active": Ce,
          "--n-option-text-color-disabled": He,
          "--n-option-text-color-pressed": eo,
          "--n-option-padding": Me,
          "--n-option-padding-left": Vr(Me, "left"),
          "--n-option-padding-right": Vr(Me, "right"),
          "--n-loading-color": fo,
          "--n-loading-size": Ro
        };
      }), { inlineThemeDisabled: U } = e, G = U ? To("internal-select-menu", O(() => e.size[0]), N, e) : void 0, oe = {
        selfRef: t,
        next: S,
        prev: C,
        getPendingTmNode: H
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
        doScroll: b,
        handleFocusin: L,
        handleFocusout: _,
        handleKeyUp: E,
        handleKeyDown: x,
        handleMouseDown: w,
        handleVirtualListResize: $,
        handleVirtualListScroll: h,
        cssVars: U ? void 0 : N,
        themeClass: G == null ? void 0 : G.themeClass,
        onRender: G == null ? void 0 : G.onRender
      }, oe);
    },
    render() {
      const { $slots: e, virtualScroll: o, clsPrefix: t, mergedTheme: r, themeClass: n, onRender: i } = this;
      return i == null || i(), y(
        "div",
        { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [
          `${t}-base-select-menu`,
          n,
          this.multiple && `${t}-base-select-menu--multiple`
        ], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
        this.loading ? y(
          "div",
          { class: `${t}-base-select-menu__loading` },
          y(cs, { clsPrefix: t, strokeWidth: 20 })
        ) : this.empty ? y("div", { class: `${t}-base-select-menu__empty`, "data-empty": !0 }, Vn(e.empty, () => [
          y(Mb, { theme: r.peers.Empty, themeOverrides: r.peerOverrides.Empty })
        ])) : y(Hb, { ref: "scrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, scrollable: this.scrollable, container: o ? this.virtualListContainer : void 0, content: o ? this.virtualListContent : void 0, onScroll: o ? void 0 : this.doScroll }, {
          default: () => o ? y(Ru, { ref: "virtualListRef", class: `${t}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: !1, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: !0 }, {
            default: ({ item: l }) => l.isGroup ? y(Sl, { key: l.key, clsPrefix: t, tmNode: l }) : l.ignored ? null : y(yl, { clsPrefix: t, key: l.key, tmNode: l })
          }) : y("div", { class: `${t}-base-select-menu-option-wrapper`, style: {
            paddingTop: this.padding.top,
            paddingBottom: this.padding.bottom
          } }, this.flattenedNodes.map((l) => l.isGroup ? y(Sl, { key: l.key, clsPrefix: t, tmNode: l }) : y(yl, { clsPrefix: t, key: l.key, tmNode: l })))
        }),
        mt(e.action, (l) => l && [
          y("div", { class: `${t}-base-select-menu__action`, "data-action": !0, key: "action" }, l),
          y(Wm, { onFocus: this.onTabOut, key: "focus-detector" })
        ])
      );
    }
  }), jb = {
    space: "6px",
    spaceArrow: "10px",
    arrowOffset: "10px",
    arrowOffsetVertical: "10px",
    arrowHeight: "6px",
    padding: "8px 14px"
  }, ys = (e) => {
    const { boxShadow2: o, popoverColor: t, textColor2: r, borderRadius: n, fontSize: i, dividerColor: l } = e;
    return Object.assign(Object.assign({}, jb), {
      fontSize: i,
      borderRadius: n,
      color: t,
      dividerColor: l,
      textColor: r,
      boxShadow: o
    });
  }, Vb = {
    name: "Popover",
    common: ao,
    self: ys
  }, si = Vb, Ub = {
    name: "Popover",
    common: R,
    self: ys
  }, nt = Ub, sn = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, ge = "var(--n-arrow-height) * 1.414", Gb = V([Z("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [V(">", [Z("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Je("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Je("scrollable", [Je("show-header-or-footer", "padding: var(--n-padding);")])]), Y("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), Y("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), le("scrollable, show-header-or-footer", [Y("content", `
 padding: var(--n-padding);
 `)])]), Z("popover-shared", `
 transform-origin: inherit;
 `, [
    Z("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [Z("popover-arrow", `
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
  ]), Ne("top-start", `
 top: calc(${ge} / -2);
 left: calc(${go("top-start")} - var(--v-offset-left));
 `), Ne("top", `
 top: calc(${ge} / -2);
 transform: translateX(calc(${ge} / -2)) rotate(45deg);
 left: 50%;
 `), Ne("top-end", `
 top: calc(${ge} / -2);
 right: calc(${go("top-end")} + var(--v-offset-left));
 `), Ne("bottom-start", `
 bottom: calc(${ge} / -2);
 left: calc(${go("bottom-start")} - var(--v-offset-left));
 `), Ne("bottom", `
 bottom: calc(${ge} / -2);
 transform: translateX(calc(${ge} / -2)) rotate(45deg);
 left: 50%;
 `), Ne("bottom-end", `
 bottom: calc(${ge} / -2);
 right: calc(${go("bottom-end")} + var(--v-offset-left));
 `), Ne("left-start", `
 left: calc(${ge} / -2);
 top: calc(${go("left-start")} - var(--v-offset-top));
 `), Ne("left", `
 left: calc(${ge} / -2);
 transform: translateY(calc(${ge} / -2)) rotate(45deg);
 top: 50%;
 `), Ne("left-end", `
 left: calc(${ge} / -2);
 bottom: calc(${go("left-end")} + var(--v-offset-top));
 `), Ne("right-start", `
 right: calc(${ge} / -2);
 top: calc(${go("right-start")} - var(--v-offset-top));
 `), Ne("right", `
 right: calc(${ge} / -2);
 transform: translateY(calc(${ge} / -2)) rotate(45deg);
 top: 50%;
 `), Ne("right-end", `
 right: calc(${ge} / -2);
 bottom: calc(${go("right-end")} + var(--v-offset-top));
 `), ...Fg({
    top: ["right-start", "left-start"],
    right: ["top-end", "bottom-end"],
    bottom: ["right-end", "left-end"],
    left: ["top-start", "bottom-start"]
  }, (e, o) => {
    const t = ["right", "left"].includes(o), r = t ? "width" : "height";
    return e.map((n) => {
      const i = n.split("-")[1] === "end", a = `calc((${`var(--v-target-${r}, 0px)`} - ${ge}) / 2)`, s = go(n);
      return V(`[v-placement="${n}"] >`, [Z("popover-shared", [le("center-arrow", [Z("popover-arrow", `${o}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${t ? "left" : "top"}));`)])])]);
    });
  })]);
  function go(e) {
    return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
  }
  function Ne(e, o) {
    const t = e.split("-")[0], r = ["top", "bottom"].includes(t) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
    return V(`[v-placement="${e}"] >`, [Z("popover-shared", `
 margin-${sn[t]}: var(--n-space);
 `, [le("show-arrow", `
 margin-${sn[t]}: var(--n-space-arrow);
 `), le("overlap", `
 margin: 0;
 `), Ed("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${t}: 100%;
 ${sn[t]}: auto;
 ${r}
 `, [Z("popover-arrow", o)])])]);
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
  }), Kb = ({ arrowStyle: e, clsPrefix: o }) => y(
    "div",
    { key: "__popover-arrow__", class: `${o}-popover-arrow-wrapper` },
    y("div", { class: `${o}-popover-arrow`, style: e })
  ), Xb = ie({
    name: "PopoverBody",
    inheritAttrs: !1,
    props: Ss,
    setup(e, { slots: o, attrs: t }) {
      const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = tt(e), l = pe("Popover", "-popover", Gb, si, e, n), a = A(null), s = he("NPopover"), c = A(null), u = A(e.show), f = A(!1);
      Co(() => {
        const { show: x } = e;
        x && !_d() && !e.internalDeactivateImmediately && (f.value = !0);
      });
      const v = O(() => {
        const { trigger: x, onClickoutside: w } = e, S = [], { positionManuallyRef: { value: C } } = s;
        return C || (x === "click" && !w && S.push([
          Cr,
          I,
          void 0,
          { capture: !0 }
        ]), x === "hover" && S.push([Jd, H])), w && S.push([
          Cr,
          I,
          void 0,
          { capture: !0 }
        ]), (e.displayDirective === "show" || e.animated && f.value) && S.push([_l, e.show]), S;
      }), p = O(() => {
        const x = e.width === "trigger" ? void 0 : hr(e.width), w = [];
        x && w.push({ width: x });
        const { maxWidth: S, minWidth: C } = e;
        return S && w.push({ maxWidth: hr(S) }), C && w.push({ maxWidth: hr(C) }), i || w.push(d.value), w;
      }), d = O(() => {
        const { common: { cubicBezierEaseInOut: x, cubicBezierEaseIn: w, cubicBezierEaseOut: S }, self: { space: C, spaceArrow: P, padding: z, fontSize: L, textColor: _, dividerColor: N, color: U, boxShadow: G, borderRadius: oe, arrowHeight: k, arrowOffset: W, arrowOffsetVertical: re } } = l.value;
        return {
          "--n-box-shadow": G,
          "--n-bezier": x,
          "--n-bezier-ease-in": w,
          "--n-bezier-ease-out": S,
          "--n-font-size": L,
          "--n-text-color": _,
          "--n-color": U,
          "--n-divider-color": N,
          "--n-border-radius": oe,
          "--n-arrow-height": k,
          "--n-arrow-offset": W,
          "--n-arrow-offset-vertical": re,
          "--n-padding": z,
          "--n-space": C,
          "--n-space-arrow": P
        };
      }), g = i ? To("popover", void 0, d, e) : void 0;
      s.setBodyInstance({
        syncPosition: b
      }), Qe(() => {
        s.setBodyInstance(null);
      }), xe(se(e, "show"), (x) => {
        e.animated || (x ? u.value = !0 : u.value = !1);
      });
      function b() {
        var x;
        (x = a.value) === null || x === void 0 || x.syncPosition();
      }
      function h(x) {
        e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(x);
      }
      function $(x) {
        e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(x);
      }
      function H(x) {
        e.trigger === "hover" && !M().contains(jt(x)) && s.handleMouseMoveOutside(x);
      }
      function I(x) {
        (e.trigger === "click" && !M().contains(jt(x)) || e.onClickoutside) && s.handleClickOutside(x);
      }
      function M() {
        return s.getTriggerElement();
      }
      ro(ca, c), ro(sa, null), ro(aa, null);
      function E() {
        if (g == null || g.onRender(), !(e.displayDirective === "show" || e.show || e.animated && f.value))
          return null;
        let w;
        const S = s.internalRenderBodyRef.value, { value: C } = n;
        if (S)
          w = S(
            // The popover class and overlap class must exists, they will be used
            // to place the body & transition animation.
            // Shadow class exists for reuse box-shadow.
            [
              `${C}-popover-shared`,
              g == null ? void 0 : g.themeClass.value,
              e.overlap && `${C}-popover-shared--overlap`,
              e.showArrow && `${C}-popover-shared--show-arrow`,
              e.arrowPointToCenter && `${C}-popover-shared--center-arrow`
            ],
            c,
            p.value,
            h,
            $
          );
        else {
          const { value: P } = s.extraClassRef, { internalTrapFocus: z } = e, L = !Ci(o.header) || !Ci(o.footer), _ = () => {
            var N;
            const U = L ? y(
              to,
              null,
              mt(o.header, (k) => k ? y("div", { class: `${C}-popover__header`, style: e.headerStyle }, k) : null),
              mt(o.default, (k) => k ? y("div", { class: `${C}-popover__content`, style: e.contentStyle }, o) : null),
              mt(o.footer, (k) => k ? y("div", { class: `${C}-popover__footer`, style: e.footerStyle }, k) : null)
            ) : e.scrollable ? (N = o.default) === null || N === void 0 ? void 0 : N.call(o) : y("div", { class: `${C}-popover__content`, style: e.contentStyle }, o), G = e.scrollable ? y(Bb, { contentClass: L ? void 0 : `${C}-popover__content`, contentStyle: L ? void 0 : e.contentStyle }, {
              default: () => U
            }) : U, oe = e.showArrow ? Kb({
              arrowStyle: e.arrowStyle,
              clsPrefix: C
            }) : null;
            return [G, oe];
          };
          w = y("div", Or({
            class: [
              `${C}-popover`,
              `${C}-popover-shared`,
              g == null ? void 0 : g.themeClass.value,
              P.map((N) => `${C}-${N}`),
              {
                [`${C}-popover--scrollable`]: e.scrollable,
                [`${C}-popover--show-header-or-footer`]: L,
                [`${C}-popover--raw`]: e.raw,
                [`${C}-popover-shared--overlap`]: e.overlap,
                [`${C}-popover-shared--show-arrow`]: e.showArrow,
                [`${C}-popover-shared--center-arrow`]: e.arrowPointToCenter
              }
            ],
            ref: c,
            style: p.value,
            onKeydown: s.handleKeydown,
            onMouseenter: h,
            onMouseleave: $
          }, t), z ? y(Wu, { active: e.show, autoFocus: !0 }, { default: _ }) : _());
        }
        return Yt(w, v.value);
      }
      return {
        displayed: f,
        namespace: r,
        isMounted: s.isMountedRef,
        zIndex: s.zIndexRef,
        followerRef: a,
        adjustedTo: So(e),
        followerEnabled: u,
        renderContentNode: E
      };
    },
    render() {
      return y(ma, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === So.tdkey }, {
        default: () => this.animated ? y(St, {
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
  }), Yb = Object.keys(Ss), qb = {
    focus: ["onFocus", "onBlur"],
    click: ["onClick"],
    hover: ["onMouseenter", "onMouseleave"],
    manual: [],
    nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
  };
  function Jb(e, o, t) {
    qb[o].forEach((r) => {
      e.props ? e.props = Object.assign({}, e.props) : e.props = {};
      const n = e.props[r], i = t[r];
      n ? e.props[r] = (...l) => {
        n(...l), i(...l);
      } : e.props[r] = i;
    });
  }
  const Zb = xo("").type, ws = {
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
  }, Qb = Object.assign(Object.assign(Object.assign({}, pe.props), ws), { internalOnAfterLeave: Function, internalRenderBody: Function }), $s = ie({
    name: "Popover",
    inheritAttrs: !1,
    props: Qb,
    __popover__: !0,
    setup(e) {
      process.env.NODE_ENV !== "production" && Co(() => {
        e.maxWidth !== void 0 && _o("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && _o("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && _o("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && _o("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && _o("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
      });
      const o = Hr(), t = A(null), r = O(() => e.show), n = A(e.defaultShow), i = wn(r, n), l = Ze(() => e.disabled ? !1 : i.value), a = () => {
        if (e.disabled)
          return !0;
        const { getDisabled: _ } = e;
        return !!(_ != null && _());
      }, s = () => a() ? !1 : i.value, c = ia(e, ["arrow", "showArrow"]), u = O(() => e.overlap ? !1 : c.value);
      let f = null;
      const v = A(null), p = A(null), d = Ze(() => e.x !== void 0 && e.y !== void 0);
      function g(_) {
        const { "onUpdate:show": N, onUpdateShow: U, onShow: G, onHide: oe } = e;
        n.value = _, N && Se(N, _), U && Se(U, _), _ && G && Se(G, !0), _ && oe && Se(oe, !1);
      }
      function b() {
        f && f.syncPosition();
      }
      function h() {
        const { value: _ } = v;
        _ && (window.clearTimeout(_), v.value = null);
      }
      function $() {
        const { value: _ } = p;
        _ && (window.clearTimeout(_), p.value = null);
      }
      function H() {
        const _ = a();
        if (e.trigger === "focus" && !_) {
          if (s())
            return;
          g(!0);
        }
      }
      function I() {
        const _ = a();
        if (e.trigger === "focus" && !_) {
          if (!s())
            return;
          g(!1);
        }
      }
      function M() {
        const _ = a();
        if (e.trigger === "hover" && !_) {
          if ($(), v.value !== null || s())
            return;
          const N = () => {
            g(!0), v.value = null;
          }, { delay: U } = e;
          U === 0 ? N() : v.value = window.setTimeout(N, U);
        }
      }
      function E() {
        const _ = a();
        if (e.trigger === "hover" && !_) {
          if (h(), p.value !== null || !s())
            return;
          const N = () => {
            g(!1), p.value = null;
          }, { duration: U } = e;
          U === 0 ? N() : p.value = window.setTimeout(N, U);
        }
      }
      function x() {
        E();
      }
      function w(_) {
        var N;
        s() && (e.trigger === "click" && (h(), $(), g(!1)), (N = e.onClickoutside) === null || N === void 0 || N.call(e, _));
      }
      function S() {
        if (e.trigger === "click" && !a()) {
          h(), $();
          const _ = !s();
          g(_);
        }
      }
      function C(_) {
        e.internalTrapFocus && _.key === "Escape" && (h(), $(), g(!1));
      }
      function P(_) {
        n.value = _;
      }
      function z() {
        var _;
        return (_ = t.value) === null || _ === void 0 ? void 0 : _.targetRef;
      }
      function L(_) {
        f = _;
      }
      return ro("NPopover", {
        getTriggerElement: z,
        handleKeydown: C,
        handleMouseEnter: M,
        handleMouseLeave: E,
        handleClickOutside: w,
        handleMouseMoveOutside: x,
        setBodyInstance: L,
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
        setShow: P,
        handleClick: S,
        handleMouseEnter: M,
        handleMouseLeave: E,
        handleFocus: H,
        handleBlur: I,
        syncPosition: b
      };
    },
    render() {
      var e;
      const { positionManually: o, $slots: t } = this;
      let r, n = !1;
      if (!o && (t.activator ? r = xi(t, "activator") : r = xi(t, "trigger"), r)) {
        r = Sc(r), r = r.type === Zb ? y("span", [r]) : r;
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
          Jb(r, l ? "nested" : o ? "manual" : this.trigger, s);
        }
      }
      return y(ha, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
        default: () => {
          this.mergedShowConsideringDisabledProp;
          const i = this.getMergedShow();
          return [
            this.internalTrapFocus && i ? Yt(y("div", { style: { position: "fixed", inset: 0 } }), [
              [
                va,
                {
                  enabled: i,
                  zIndex: this.zIndex
                }
              ]
            ]) : null,
            o ? null : y(pa, null, {
              default: () => r
            }),
            y(Xb, sd(this.$props, Yb, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
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
  }, e0 = {
    name: "Tag",
    common: R,
    self(e) {
      const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, tagColor: f, opacityDisabled: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: g, closeColorHover: b, closeColorPressed: h, borderRadiusSmall: $, fontSizeMini: H, fontSizeTiny: I, fontSizeSmall: M, fontSizeMedium: E, heightMini: x, heightTiny: w, heightSmall: S, heightMedium: C, buttonColor2Hover: P, buttonColor2Pressed: z, fontWeightStrong: L } = e;
      return Object.assign(Object.assign({}, Ps), {
        closeBorderRadius: $,
        heightTiny: x,
        heightSmall: w,
        heightMedium: S,
        heightLarge: C,
        borderRadius: $,
        opacityDisabled: v,
        fontSizeTiny: H,
        fontSizeSmall: I,
        fontSizeMedium: M,
        fontSizeLarge: E,
        fontWeightStrong: L,
        // checked
        textColorCheckable: o,
        textColorHoverCheckable: o,
        textColorPressedCheckable: o,
        textColorChecked: c,
        colorCheckable: "#0000",
        colorHoverCheckable: P,
        colorPressedCheckable: z,
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
        closeColorHover: b,
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
  }, Ts = e0, o0 = (e) => {
    const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, opacityDisabled: f, tagColor: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: g, borderRadiusSmall: b, fontSizeMini: h, fontSizeTiny: $, fontSizeSmall: H, fontSizeMedium: I, heightMini: M, heightTiny: E, heightSmall: x, heightMedium: w, closeColorHover: S, closeColorPressed: C, buttonColor2Hover: P, buttonColor2Pressed: z, fontWeightStrong: L } = e;
    return Object.assign(Object.assign({}, Ps), {
      closeBorderRadius: b,
      heightTiny: M,
      heightSmall: E,
      heightMedium: x,
      heightLarge: w,
      borderRadius: b,
      opacityDisabled: f,
      fontSizeTiny: h,
      fontSizeSmall: $,
      fontSizeMedium: H,
      fontSizeLarge: I,
      fontWeightStrong: L,
      // checked
      textColorCheckable: o,
      textColorHoverCheckable: o,
      textColorPressedCheckable: o,
      textColorChecked: c,
      colorCheckable: "#0000",
      colorHoverCheckable: P,
      colorPressedCheckable: z,
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
      closeColorHover: S,
      closeColorPressed: C,
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
  }, t0 = {
    name: "Tag",
    common: ao,
    self: o0
  }, r0 = t0, n0 = {
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
  }, i0 = Z("tag", `
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
 `), Y("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), Y("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), Y("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), Y("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), le("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [Y("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), Y("avatar", `
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
 `, [Je("disabled", [V("&:hover", "background-color: var(--n-color-hover-checkable);", [Je("checked", "color: var(--n-text-color-hover-checkable);")]), V("&:active", "background-color: var(--n-color-pressed-checkable);", [Je("checked", "color: var(--n-text-color-pressed-checkable);")])]), le("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Je("disabled", [V("&:hover", "background-color: var(--n-color-checked-hover);"), V("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), l0 = Object.assign(Object.assign(Object.assign({}, pe.props), n0), {
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
  }), a0 = "n-tag", cn = ie({
    name: "Tag",
    props: l0,
    setup(e) {
      process.env.NODE_ENV !== "production" && Co(() => {
        e.onCheckedChange !== void 0 && _o("tag", "`on-checked-change` is deprecated, please use `on-update:checked` instead");
      });
      const o = A(null), { mergedBorderedRef: t, mergedClsPrefixRef: r, inlineThemeDisabled: n, mergedRtlRef: i } = tt(e), l = pe("Tag", "-tag", i0, r0, e, r);
      ro(a0, {
        roundRef: se(e, "round")
      });
      function a(p) {
        if (!e.disabled && e.checkable) {
          const { checked: d, onCheckedChange: g, onUpdateChecked: b, "onUpdate:checked": h } = e;
          b && b(!d), h && h(!d), g && g(!d);
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
      }, u = ls("Tag", i, r), f = O(() => {
        const { type: p, size: d, color: { color: g, textColor: b } = {} } = e, { common: { cubicBezierEaseInOut: h }, self: { padding: $, closeMargin: H, closeMarginRtl: I, borderRadius: M, opacityDisabled: E, textColorCheckable: x, textColorHoverCheckable: w, textColorPressedCheckable: S, textColorChecked: C, colorCheckable: P, colorHoverCheckable: z, colorPressedCheckable: L, colorChecked: _, colorCheckedHover: N, colorCheckedPressed: U, closeBorderRadius: G, fontWeightStrong: oe, [ce("colorBordered", p)]: k, [ce("closeSize", d)]: W, [ce("closeIconSize", d)]: re, [ce("fontSize", d)]: fe, [ce("height", d)]: Ie, [ce("color", p)]: so, [ce("textColor", p)]: Pe, [ce("border", p)]: eo, [ce("closeIconColor", p)]: Re, [ce("closeIconColorHover", p)]: He, [ce("closeIconColorPressed", p)]: Ce, [ce("closeColorHover", p)]: Ke, [ce("closeColorPressed", p)]: Fe } } = l.value;
        return {
          "--n-font-weight-strong": oe,
          "--n-avatar-size-override": `calc(${Ie} - 8px)`,
          "--n-bezier": h,
          "--n-border-radius": M,
          "--n-border": eo,
          "--n-close-icon-size": re,
          "--n-close-color-pressed": Fe,
          "--n-close-color-hover": Ke,
          "--n-close-border-radius": G,
          "--n-close-icon-color": Re,
          "--n-close-icon-color-hover": He,
          "--n-close-icon-color-pressed": Ce,
          "--n-close-icon-color-disabled": Re,
          "--n-close-margin": H,
          "--n-close-margin-rtl": I,
          "--n-close-size": W,
          "--n-color": g || (t.value ? k : so),
          "--n-color-checkable": P,
          "--n-color-checked": _,
          "--n-color-checked-hover": N,
          "--n-color-checked-pressed": U,
          "--n-color-hover-checkable": z,
          "--n-color-pressed-checkable": L,
          "--n-font-size": fe,
          "--n-height": Ie,
          "--n-opacity-disabled": E,
          "--n-padding": $,
          "--n-text-color": b || Pe,
          "--n-text-color-checkable": x,
          "--n-text-color-checked": C,
          "--n-text-color-hover-checkable": w,
          "--n-text-color-pressed-checkable": S
        };
      }), v = n ? To("tag", O(() => {
        let p = "";
        const { type: d, size: g, color: { color: b, textColor: h } = {} } = e;
        return p += d[0], p += g[0], b && (p += `a${Si(b)}`), h && (p += `b${Si(h)}`), t.value && (p += "c"), p;
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
      const c = mt(s.avatar, (f) => f && y("div", { class: `${t}-tag__avatar` }, f)), u = mt(s.icon, (f) => f && y("div", { class: `${t}-tag__icon` }, f));
      return y(
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
        y("span", { class: `${t}-tag__content`, ref: "contentRef" }, (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e)),
        !this.checkable && n ? y(Lm, { clsPrefix: t, class: `${t}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: l, isButtonTag: this.internalCloseIsButtonTag, absolute: !0 }) : null,
        !this.checkable && this.mergedBordered ? y("div", { class: `${t}-tag__border`, style: { borderColor: i } }) : null
      );
    }
  }), s0 = Z("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [V(">", [Y("clear", `
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
 `)]), Y("placeholder", `
 display: flex;
 `), Y("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [Hn({
    originalTransform: "translateX(-50%) translateY(-50%)",
    left: "50%",
    top: "50%"
  })])])]), c0 = ie({
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
      return Fr("-base-clear", s0, se(e, "clsPrefix")), {
        handleMouseDown(o) {
          o.preventDefault();
        }
      };
    },
    render() {
      const { clsPrefix: e } = this;
      return y(
        "div",
        { class: `${e}-base-clear` },
        y(ss, null, {
          default: () => {
            var o, t;
            return this.show ? y("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Vn(this.$slots.icon, () => [
              y(Jt, { clsPrefix: e }, {
                default: () => y(Am, null)
              })
            ])) : y("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (t = (o = this.$slots).placeholder) === null || t === void 0 ? void 0 : t.call(o));
          }
        })
      );
    }
  }), d0 = ie({
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
        return y(cs, { clsPrefix: t, class: `${t}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
          default: () => e.showArrow ? y(c0, { clsPrefix: t, show: e.showClear, onClear: e.onClear }, {
            placeholder: () => y(Jt, { clsPrefix: t, class: `${t}-base-suffix__arrow` }, {
              default: () => Vn(o.default, () => [
                y(Bm, null)
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
  }, u0 = (e) => {
    const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderColor: v, iconColor: p, iconColorDisabled: d, clearColor: g, clearColorHover: b, clearColorPressed: h, placeholderColor: $, placeholderColorDisabled: H, fontSizeTiny: I, fontSizeSmall: M, fontSizeMedium: E, fontSizeLarge: x, heightTiny: w, heightSmall: S, heightMedium: C, heightLarge: P } = e;
    return Object.assign(Object.assign({}, zs), {
      fontSizeTiny: I,
      fontSizeSmall: M,
      fontSizeMedium: E,
      fontSizeLarge: x,
      heightTiny: w,
      heightSmall: S,
      heightMedium: C,
      heightLarge: P,
      borderRadius: o,
      // default
      textColor: t,
      textColorDisabled: r,
      placeholderColor: $,
      placeholderColorDisabled: H,
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
      clearColorHover: b,
      clearColorPressed: h
    });
  }, f0 = {
    name: "InternalSelection",
    common: ao,
    peers: {
      Popover: si
    },
    self: u0
  }, Is = f0, h0 = {
    name: "InternalSelection",
    common: R,
    peers: {
      Popover: nt
    },
    self(e) {
      const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, iconColor: v, iconColorDisabled: p, clearColor: d, clearColorHover: g, clearColorPressed: b, placeholderColor: h, placeholderColorDisabled: $, fontSizeTiny: H, fontSizeSmall: I, fontSizeMedium: M, fontSizeLarge: E, heightTiny: x, heightSmall: w, heightMedium: S, heightLarge: C } = e;
      return Object.assign(Object.assign({}, zs), {
        fontSizeTiny: H,
        fontSizeSmall: I,
        fontSizeMedium: M,
        fontSizeLarge: E,
        heightTiny: x,
        heightSmall: w,
        heightMedium: S,
        heightLarge: C,
        borderRadius: o,
        // default
        textColor: t,
        textColorDisabled: r,
        placeholderColor: h,
        placeholderColorDisabled: $,
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
        clearColorPressed: b
      });
    }
  }, ci = h0, p0 = V([Z("base-selection", `
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
 `, [Z("base-loading", `
 color: var(--n-loading-color);
 `), Z("base-selection-tags", "min-height: var(--n-height);"), Y("border, state-border", `
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
 `), Y("state-border", `
 z-index: 1;
 border-color: #0000;
 `), Z("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [Y("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), Z("base-selection-overlay", `
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
 `, [Y("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), Z("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [Y("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), Z("base-selection-tags", `
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
 `), Z("base-selection-label", `
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
 `, [Z("base-selection-input", `
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
 `, [Y("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), Y("render-label", `
 color: var(--n-text-color);
 `)]), Je("disabled", [V("&:hover", [Y("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), le("focus", [Y("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), le("active", [Y("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), Z("base-selection-label", "background-color: var(--n-color-active);"), Z("base-selection-tags", "background-color: var(--n-color-active);")])]), le("disabled", "cursor: not-allowed;", [Y("arrow", `
 color: var(--n-arrow-color-disabled);
 `), Z("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [Z("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), Y("render-label", `
 color: var(--n-text-color-disabled);
 `)]), Z("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), Z("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), Z("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [Y("input", `
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
 `), Y("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => le(`${e}-status`, [Y("state-border", `border: var(--n-border-${e});`), Je("disabled", [V("&:hover", [Y("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), le("active", [Y("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), Z("base-selection-label", `background-color: var(--n-color-active-${e});`), Z("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), le("focus", [Y("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), Z("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), Z("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [V("&:last-child", "padding-right: 0;"), Z("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [Y("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), v0 = ie({
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
      const o = A(null), t = A(null), r = A(null), n = A(null), i = A(null), l = A(null), a = A(null), s = A(null), c = A(null), u = A(null), f = A(!1), v = A(!1), p = A(!1), d = pe("InternalSelection", "-internal-selection", p0, Is, e, se(e, "clsPrefix")), g = O(() => e.clearable && !e.disabled && (p.value || e.active)), b = O(() => e.selectedOption ? e.renderTag ? e.renderTag({
        option: e.selectedOption,
        handleClose: () => {
        }
      }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : gt(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), h = O(() => {
        const F = e.selectedOption;
        if (F)
          return F[e.labelField];
      }), $ = O(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
      function H() {
        var F;
        const { value: K } = o;
        if (K) {
          const { value: de } = t;
          de && (de.style.width = `${K.offsetWidth}px`, e.maxTagCount !== "responsive" && ((F = c.value) === null || F === void 0 || F.sync()));
        }
      }
      function I() {
        const { value: F } = u;
        F && (F.style.display = "none");
      }
      function M() {
        const { value: F } = u;
        F && (F.style.display = "inline-block");
      }
      xe(se(e, "active"), (F) => {
        F || I();
      }), xe(se(e, "pattern"), () => {
        e.multiple && yt(H);
      });
      function E(F) {
        const { onFocus: K } = e;
        K && K(F);
      }
      function x(F) {
        const { onBlur: K } = e;
        K && K(F);
      }
      function w(F) {
        const { onDeleteOption: K } = e;
        K && K(F);
      }
      function S(F) {
        const { onClear: K } = e;
        K && K(F);
      }
      function C(F) {
        const { onPatternInput: K } = e;
        K && K(F);
      }
      function P(F) {
        var K;
        (!F.relatedTarget || !(!((K = r.value) === null || K === void 0) && K.contains(F.relatedTarget))) && E(F);
      }
      function z(F) {
        var K;
        !((K = r.value) === null || K === void 0) && K.contains(F.relatedTarget) || x(F);
      }
      function L(F) {
        S(F);
      }
      function _() {
        p.value = !0;
      }
      function N() {
        p.value = !1;
      }
      function U(F) {
        !e.active || !e.filterable || F.target !== t.value && F.preventDefault();
      }
      function G(F) {
        w(F);
      }
      function oe(F) {
        if (F.key === "Backspace" && !k.value && !e.pattern.length) {
          const { selectedOptions: K } = e;
          K != null && K.length && G(K[K.length - 1]);
        }
      }
      const k = A(!1);
      let W = null;
      function re(F) {
        const { value: K } = o;
        if (K) {
          const de = F.target.value;
          K.textContent = de, H();
        }
        e.ignoreComposition && k.value ? W = F : C(F);
      }
      function fe() {
        k.value = !0;
      }
      function Ie() {
        k.value = !1, e.ignoreComposition && C(W), W = null;
      }
      function so(F) {
        var K;
        v.value = !0, (K = e.onPatternFocus) === null || K === void 0 || K.call(e, F);
      }
      function Pe(F) {
        var K;
        v.value = !1, (K = e.onPatternBlur) === null || K === void 0 || K.call(e, F);
      }
      function eo() {
        var F, K;
        if (e.filterable)
          v.value = !1, (F = l.value) === null || F === void 0 || F.blur(), (K = t.value) === null || K === void 0 || K.blur();
        else if (e.multiple) {
          const { value: de } = n;
          de == null || de.blur();
        } else {
          const { value: de } = i;
          de == null || de.blur();
        }
      }
      function Re() {
        var F, K, de;
        e.filterable ? (v.value = !1, (F = l.value) === null || F === void 0 || F.focus()) : e.multiple ? (K = n.value) === null || K === void 0 || K.focus() : (de = i.value) === null || de === void 0 || de.focus();
      }
      function He() {
        const { value: F } = t;
        F && (M(), F.focus());
      }
      function Ce() {
        const { value: F } = t;
        F && F.blur();
      }
      function Ke(F) {
        const { value: K } = a;
        K && K.setTextContent(`+${F}`);
      }
      function Fe() {
        const { value: F } = s;
        return F;
      }
      function Le() {
        return t.value;
      }
      let co = null;
      function uo() {
        co !== null && window.clearTimeout(co);
      }
      function fo() {
        e.disabled || e.active || (uo(), co = window.setTimeout(() => {
          $.value && (f.value = !0);
        }, 100));
      }
      function Ro() {
        uo();
      }
      function Fo(F) {
        F || (uo(), f.value = !1);
      }
      xe($, (F) => {
        F || (f.value = !1);
      }), Ue(() => {
        Co(() => {
          const F = l.value;
          F && (F.tabIndex = e.disabled || v.value ? -1 : 0);
        });
      }), Ia(r, e.onResize);
      const { inlineThemeDisabled: zo } = e, Io = O(() => {
        const { size: F } = e, { common: { cubicBezierEaseInOut: K }, self: {
          borderRadius: de,
          color: We,
          placeholderColor: it,
          textColor: Mt,
          paddingSingle: lt,
          paddingMultiple: at,
          caretColor: st,
          colorDisabled: Mo,
          textColorDisabled: ko,
          placeholderColorDisabled: kt,
          colorActive: ct,
          boxShadowFocus: Xe,
          boxShadowActive: ho,
          boxShadowHover: m,
          border: T,
          borderFocus: B,
          borderHover: X,
          borderActive: q,
          arrowColor: ee,
          arrowColorDisabled: te,
          loadingColor: ne,
          // form warning
          colorActiveWarning: ke,
          boxShadowFocusWarning: po,
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
          [ce("height", F)]: pc,
          [ce("fontSize", F)]: vc
        } } = d.value;
        return {
          "--n-bezier": K,
          "--n-border": T,
          "--n-border-active": q,
          "--n-border-focus": B,
          "--n-border-hover": X,
          "--n-border-radius": de,
          "--n-box-shadow-active": ho,
          "--n-box-shadow-focus": Xe,
          "--n-box-shadow-hover": m,
          "--n-caret-color": st,
          "--n-color": We,
          "--n-color-active": ct,
          "--n-color-disabled": Mo,
          "--n-font-size": vc,
          "--n-height": pc,
          "--n-padding-single": lt,
          "--n-padding-multiple": at,
          "--n-placeholder-color": it,
          "--n-placeholder-color-disabled": kt,
          "--n-text-color": Mt,
          "--n-text-color-disabled": ko,
          "--n-arrow-color": ee,
          "--n-arrow-color-disabled": te,
          "--n-loading-color": ne,
          // form warning
          "--n-color-active-warning": ke,
          "--n-box-shadow-focus-warning": po,
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
      }), Me = zo ? To("internal-selection", O(() => e.size[0]), Io, e) : void 0;
      return {
        mergedTheme: d,
        mergedClearable: g,
        patternInputFocused: v,
        filterablePlaceholder: b,
        label: h,
        selected: $,
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
        handleFocusin: P,
        handleClear: L,
        handleMouseEnter: _,
        handleMouseLeave: N,
        handleDeleteOption: G,
        handlePatternKeyDown: oe,
        handlePatternInputInput: re,
        handlePatternInputBlur: Pe,
        handlePatternInputFocus: so,
        handleMouseEnterCounter: fo,
        handleMouseLeaveCounter: Ro,
        handleFocusout: z,
        handleCompositionEnd: Ie,
        handleCompositionStart: fe,
        onPopoverUpdateShow: Fo,
        focus: Re,
        focusInput: He,
        blur: eo,
        blurInput: Ce,
        updateCounter: Ke,
        getCounter: Fe,
        getTail: Le,
        renderLabel: e.renderLabel,
        cssVars: zo ? void 0 : Io,
        themeClass: Me == null ? void 0 : Me.themeClass,
        onRender: Me == null ? void 0 : Me.onRender
      };
    },
    render() {
      const { status: e, multiple: o, size: t, disabled: r, filterable: n, maxTagCount: i, bordered: l, clsPrefix: a, onRender: s, renderTag: c, renderLabel: u } = this;
      s == null || s();
      const f = i === "responsive", v = typeof i == "number", p = f || v, d = y(yn, null, {
        default: () => y(d0, { clsPrefix: a, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
          default: () => {
            var b, h;
            return (h = (b = this.$slots).arrow) === null || h === void 0 ? void 0 : h.call(b);
          }
        })
      });
      let g;
      if (o) {
        const { labelField: b } = this, h = (z) => y("div", { class: `${a}-base-selection-tag-wrapper`, key: z.value }, c ? c({
          option: z,
          handleClose: () => this.handleDeleteOption(z)
        }) : y(cn, { size: t, closable: !z.disabled, disabled: r, onClose: () => this.handleDeleteOption(z), internalCloseIsButtonTag: !1, internalCloseFocusable: !1 }, {
          default: () => u ? u(z, !0) : gt(z[b], z, !0)
        })), $ = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(h), H = n ? y(
          "div",
          { class: `${a}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
          y("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: r, value: this.pattern, autofocus: this.autofocus, class: `${a}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          y("span", { ref: "patternInputMirrorRef", class: `${a}-base-selection-input-tag__mirror` }, this.pattern)
        ) : null, I = f ? () => y(
          "div",
          { class: `${a}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
          y(cn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: r })
        ) : void 0;
        let M;
        if (v) {
          const z = this.selectedOptions.length - i;
          z > 0 && (M = y(
            "div",
            { class: `${a}-base-selection-tag-wrapper`, key: "__counter__" },
            y(cn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: r }, {
              default: () => `+${z}`
            })
          ));
        }
        const E = f ? n ? y(ji, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: $,
          counter: I,
          tail: () => H
        }) : y(ji, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: $,
          counter: I
        }) : v ? $().concat(M) : $(), x = p ? () => y("div", { class: `${a}-base-selection-popover` }, f ? $() : this.selectedOptions.map(h)) : void 0, w = p ? {
          show: this.showTagsPanel,
          trigger: "hover",
          overlap: !0,
          placement: "top",
          width: "trigger",
          onUpdateShow: this.onPopoverUpdateShow,
          theme: this.mergedTheme.peers.Popover,
          themeOverrides: this.mergedTheme.peerOverrides.Popover
        } : null, C = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? y(
          "div",
          { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay` },
          y("div", { class: `${a}-base-selection-placeholder__inner` }, this.placeholder)
        ) : null, P = n ? y(
          "div",
          { ref: "patternInputWrapperRef", class: `${a}-base-selection-tags` },
          E,
          f ? null : H,
          d
        ) : y(
          "div",
          { ref: "multipleElRef", class: `${a}-base-selection-tags`, tabindex: r ? void 0 : 0 },
          E,
          d
        );
        g = y(
          to,
          null,
          p ? y($s, Object.assign({}, w, { scrollable: !0, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
            trigger: () => P,
            default: x
          }) : P,
          C
        );
      } else if (n) {
        const b = this.pattern || this.isComposing, h = this.active ? !b : !this.selected, $ = this.active ? !1 : this.selected;
        g = y(
          "div",
          { ref: "patternInputWrapperRef", class: `${a}-base-selection-label` },
          y("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${a}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: r, disabled: r, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          $ ? y(
            "div",
            { class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`, key: "input" },
            y("div", { class: `${a}-base-selection-overlay__wrapper` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : gt(this.label, this.selectedOption, !0))
          ) : null,
          h ? y(
            "div",
            { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`, key: "placeholder" },
            y("div", { class: `${a}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)
          ) : null,
          d
        );
      } else
        g = y(
          "div",
          { ref: "singleElRef", class: `${a}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 },
          this.label !== void 0 ? y(
            "div",
            { class: `${a}-base-selection-input`, title: cd(this.label), key: "input" },
            y("div", { class: `${a}-base-selection-input__content` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : gt(this.label, this.selectedOption, !0))
          ) : y(
            "div",
            { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`, key: "placeholder" },
            y("div", { class: `${a}-base-selection-placeholder__inner` }, this.placeholder)
          ),
          d
        );
      return y(
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
        l ? y("div", { class: `${a}-base-selection__border` }) : null,
        l ? y("div", { class: `${a}-base-selection__state-border` }) : null
      );
    }
  }), g0 = {
    iconMargin: "11px 8px 0 12px",
    iconMarginRtl: "11px 12px 0 8px",
    iconSize: "24px",
    closeIconSize: "16px",
    closeSize: "20px",
    closeMargin: "13px 14px 0 0",
    closeMarginRtl: "13px 0 0 14px",
    padding: "13px"
  }, m0 = {
    name: "Alert",
    common: R,
    self(e) {
      const { lineHeight: o, borderRadius: t, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: l, textColor2: a, closeColorHover: s, closeColorPressed: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, infoColorSuppl: p, successColorSuppl: d, warningColorSuppl: g, errorColorSuppl: b, fontSize: h } = e;
      return Object.assign(Object.assign({}, g0), {
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
        borderError: `1px solid ${D(b, { alpha: 0.35 })}`,
        colorError: D(b, { alpha: 0.25 }),
        titleTextColorError: l,
        iconColorError: b,
        contentTextColorError: a,
        closeColorHoverError: s,
        closeColorPressedError: c,
        closeIconColorError: u,
        closeIconColorHoverError: f,
        closeIconColorPressedError: v
      });
    }
  }, b0 = m0, x0 = {
    linkFontSize: "13px",
    linkPadding: "0 0 0 16px",
    railWidth: "4px"
  }, C0 = (e) => {
    const { borderRadius: o, railColor: t, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: l } = e;
    return Object.assign(Object.assign({}, x0), {
      borderRadius: o,
      railColor: t,
      railColorActive: r,
      linkColor: D(r, { alpha: 0.15 }),
      linkTextColor: l,
      linkTextColorHover: n,
      linkTextColorPressed: i,
      linkTextColorActive: r
    });
  }, y0 = {
    name: "Anchor",
    common: R,
    self: C0
  }, S0 = y0;
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
  function w0(e, o) {
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
  function $0(e, o, t, r) {
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
  function P0(e, o, t) {
    const r = /* @__PURE__ */ new Map();
    return e.forEach((n) => {
      Mr(n) ? n[t].forEach((i) => {
        r.set(i[o], i);
      }) : r.set(n[o], n);
    }), r;
  }
  const T0 = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  }, z0 = {
    name: "Input",
    common: R,
    self(e) {
      const { textColor2: o, textColor3: t, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderRadius: v, lineHeight: p, fontSizeTiny: d, fontSizeSmall: g, fontSizeMedium: b, fontSizeLarge: h, heightTiny: $, heightSmall: H, heightMedium: I, heightLarge: M, clearColor: E, clearColorHover: x, clearColorPressed: w, placeholderColor: S, placeholderColorDisabled: C, iconColor: P, iconColorDisabled: z, iconColorHover: L, iconColorPressed: _ } = e;
      return Object.assign(Object.assign({}, T0), {
        countTextColorDisabled: r,
        countTextColor: t,
        heightTiny: $,
        heightSmall: H,
        heightMedium: I,
        heightLarge: M,
        fontSizeTiny: d,
        fontSizeSmall: g,
        fontSizeMedium: b,
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
        placeholderColor: S,
        placeholderColorDisabled: C,
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
        clearColor: E,
        clearColorHover: x,
        clearColorPressed: w,
        iconColor: P,
        iconColorDisabled: z,
        iconColorHover: L,
        iconColorPressed: _,
        suffixTextColor: o
      });
    }
  }, Ge = z0;
  function I0(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const M0 = {
    name: "AutoComplete",
    common: R,
    peers: {
      InternalSelectMenu: Zt,
      Input: Ge
    },
    self: I0
  }, k0 = M0, O0 = (e) => {
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
      color: Q(r, t),
      colorModal: Q(u, t),
      colorPopover: Q(f, t)
    };
  }, E0 = {
    name: "Avatar",
    common: R,
    self: O0
  }, ks = E0, _0 = () => ({
    gap: "-12px"
  }), D0 = {
    name: "AvatarGroup",
    common: R,
    peers: {
      Avatar: ks
    },
    self: _0
  }, H0 = D0, B0 = {
    width: "44px",
    height: "44px",
    borderRadius: "22px",
    iconSize: "26px"
  }, A0 = {
    name: "BackTop",
    common: R,
    self(e) {
      const { popoverColor: o, textColor2: t, primaryColorHover: r, primaryColorPressed: n } = e;
      return Object.assign(Object.assign({}, B0), { color: o, textColor: t, iconColor: t, iconColorHover: r, iconColorPressed: n, boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)", boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)", boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)" });
    }
  }, R0 = A0, F0 = {
    name: "Badge",
    common: R,
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
  }, L0 = F0, W0 = {
    fontWeightActive: "400"
  }, N0 = (e) => {
    const { fontSize: o, textColor3: t, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: l } = e;
    return Object.assign(Object.assign({}, W0), { fontSize: o, itemLineHeight: "1.25", itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: r, itemTextColorActive: r, itemBorderRadius: n, itemColorHover: i, itemColorPressed: l, separatorColor: t });
  }, j0 = {
    name: "Breadcrumb",
    common: R,
    self: N0
  }, V0 = j0, U0 = {
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
  }, G0 = (e) => {
    const { heightTiny: o, heightSmall: t, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: l, fontSizeSmall: a, fontSizeMedium: s, fontSizeLarge: c, opacityDisabled: u, textColor2: f, textColor3: v, primaryColorHover: p, primaryColorPressed: d, borderColor: g, primaryColor: b, baseColor: h, infoColor: $, infoColorHover: H, infoColorPressed: I, successColor: M, successColorHover: E, successColorPressed: x, warningColor: w, warningColorHover: S, warningColorPressed: C, errorColor: P, errorColorHover: z, errorColorPressed: L, fontWeight: _, buttonColor2: N, buttonColor2Hover: U, buttonColor2Pressed: G, fontWeightStrong: oe } = e;
    return Object.assign(Object.assign({}, U0), {
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
      colorSecondaryPressed: G,
      // tertiary
      colorTertiary: N,
      colorTertiaryHover: U,
      colorTertiaryPressed: G,
      // quaternary
      colorQuaternary: "#0000",
      colorQuaternaryHover: U,
      colorQuaternaryPressed: G,
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
      rippleColor: b,
      // primary
      colorPrimary: b,
      colorHoverPrimary: p,
      colorPressedPrimary: d,
      colorFocusPrimary: p,
      colorDisabledPrimary: b,
      textColorPrimary: h,
      textColorHoverPrimary: h,
      textColorPressedPrimary: h,
      textColorFocusPrimary: h,
      textColorDisabledPrimary: h,
      textColorTextPrimary: b,
      textColorTextHoverPrimary: p,
      textColorTextPressedPrimary: d,
      textColorTextFocusPrimary: p,
      textColorTextDisabledPrimary: f,
      textColorGhostPrimary: b,
      textColorGhostHoverPrimary: p,
      textColorGhostPressedPrimary: d,
      textColorGhostFocusPrimary: p,
      textColorGhostDisabledPrimary: b,
      borderPrimary: `1px solid ${b}`,
      borderHoverPrimary: `1px solid ${p}`,
      borderPressedPrimary: `1px solid ${d}`,
      borderFocusPrimary: `1px solid ${p}`,
      borderDisabledPrimary: `1px solid ${b}`,
      rippleColorPrimary: b,
      // info
      colorInfo: $,
      colorHoverInfo: H,
      colorPressedInfo: I,
      colorFocusInfo: H,
      colorDisabledInfo: $,
      textColorInfo: h,
      textColorHoverInfo: h,
      textColorPressedInfo: h,
      textColorFocusInfo: h,
      textColorDisabledInfo: h,
      textColorTextInfo: $,
      textColorTextHoverInfo: H,
      textColorTextPressedInfo: I,
      textColorTextFocusInfo: H,
      textColorTextDisabledInfo: f,
      textColorGhostInfo: $,
      textColorGhostHoverInfo: H,
      textColorGhostPressedInfo: I,
      textColorGhostFocusInfo: H,
      textColorGhostDisabledInfo: $,
      borderInfo: `1px solid ${$}`,
      borderHoverInfo: `1px solid ${H}`,
      borderPressedInfo: `1px solid ${I}`,
      borderFocusInfo: `1px solid ${H}`,
      borderDisabledInfo: `1px solid ${$}`,
      rippleColorInfo: $,
      // success
      colorSuccess: M,
      colorHoverSuccess: E,
      colorPressedSuccess: x,
      colorFocusSuccess: E,
      colorDisabledSuccess: M,
      textColorSuccess: h,
      textColorHoverSuccess: h,
      textColorPressedSuccess: h,
      textColorFocusSuccess: h,
      textColorDisabledSuccess: h,
      textColorTextSuccess: M,
      textColorTextHoverSuccess: E,
      textColorTextPressedSuccess: x,
      textColorTextFocusSuccess: E,
      textColorTextDisabledSuccess: f,
      textColorGhostSuccess: M,
      textColorGhostHoverSuccess: E,
      textColorGhostPressedSuccess: x,
      textColorGhostFocusSuccess: E,
      textColorGhostDisabledSuccess: M,
      borderSuccess: `1px solid ${M}`,
      borderHoverSuccess: `1px solid ${E}`,
      borderPressedSuccess: `1px solid ${x}`,
      borderFocusSuccess: `1px solid ${E}`,
      borderDisabledSuccess: `1px solid ${M}`,
      rippleColorSuccess: M,
      // warning
      colorWarning: w,
      colorHoverWarning: S,
      colorPressedWarning: C,
      colorFocusWarning: S,
      colorDisabledWarning: w,
      textColorWarning: h,
      textColorHoverWarning: h,
      textColorPressedWarning: h,
      textColorFocusWarning: h,
      textColorDisabledWarning: h,
      textColorTextWarning: w,
      textColorTextHoverWarning: S,
      textColorTextPressedWarning: C,
      textColorTextFocusWarning: S,
      textColorTextDisabledWarning: f,
      textColorGhostWarning: w,
      textColorGhostHoverWarning: S,
      textColorGhostPressedWarning: C,
      textColorGhostFocusWarning: S,
      textColorGhostDisabledWarning: w,
      borderWarning: `1px solid ${w}`,
      borderHoverWarning: `1px solid ${S}`,
      borderPressedWarning: `1px solid ${C}`,
      borderFocusWarning: `1px solid ${S}`,
      borderDisabledWarning: `1px solid ${w}`,
      rippleColorWarning: w,
      // error
      colorError: P,
      colorHoverError: z,
      colorPressedError: L,
      colorFocusError: z,
      colorDisabledError: P,
      textColorError: h,
      textColorHoverError: h,
      textColorPressedError: h,
      textColorFocusError: h,
      textColorDisabledError: h,
      textColorTextError: P,
      textColorTextHoverError: z,
      textColorTextPressedError: L,
      textColorTextFocusError: z,
      textColorTextDisabledError: f,
      textColorGhostError: P,
      textColorGhostHoverError: z,
      textColorGhostPressedError: L,
      textColorGhostFocusError: z,
      textColorGhostDisabledError: P,
      borderError: `1px solid ${P}`,
      borderHoverError: `1px solid ${z}`,
      borderPressedError: `1px solid ${L}`,
      borderFocusError: `1px solid ${z}`,
      borderDisabledError: `1px solid ${P}`,
      rippleColorError: P,
      waveOpacity: "0.6",
      fontWeight: _,
      fontWeightStrong: oe
    });
  }, K0 = {
    name: "Button",
    common: R,
    self(e) {
      const o = G0(e);
      return o.waveOpacity = "0.8", o.colorOpacitySecondary = "0.16", o.colorOpacitySecondaryHover = "0.2", o.colorOpacitySecondaryPressed = "0.12", o;
    }
  }, De = K0, X0 = {
    titleFontSize: "22px"
  }, Y0 = (e) => {
    const { borderRadius: o, fontSize: t, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: l, dividerColor: a, fontWeightStrong: s, primaryColor: c, baseColor: u, hoverColor: f, cardColor: v, modalColor: p, popoverColor: d } = e;
    return Object.assign(Object.assign({}, X0), {
      borderRadius: o,
      borderColor: Q(v, a),
      borderColorModal: Q(p, a),
      borderColorPopover: Q(d, a),
      textColor: n,
      titleFontWeight: s,
      titleTextColor: i,
      dayTextColor: l,
      fontSize: t,
      lineHeight: r,
      dateColorCurrent: c,
      dateTextColorCurrent: u,
      cellColorHover: Q(v, f),
      cellColorHoverModal: Q(p, f),
      cellColorHoverPopover: Q(d, f),
      cellColor: v,
      cellColorModal: p,
      cellColorPopover: d,
      barColor: c
    });
  }, q0 = {
    name: "Calendar",
    common: R,
    peers: {
      Button: De
    },
    self: Y0
  }, J0 = q0, Z0 = (e) => {
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
  }, Q0 = {
    name: "ColorPicker",
    common: R,
    peers: {
      Input: Ge,
      Button: De
    },
    self: Z0
  }, ex = Q0, ox = {
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
  }, tx = (e) => {
    const { primaryColor: o, borderRadius: t, lineHeight: r, fontSize: n, cardColor: i, textColor2: l, textColor1: a, dividerColor: s, fontWeightStrong: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, closeColorHover: p, closeColorPressed: d, modalColor: g, boxShadow1: b, popoverColor: h, actionColor: $ } = e;
    return Object.assign(Object.assign({}, ox), {
      lineHeight: r,
      color: i,
      colorModal: g,
      colorPopover: h,
      colorTarget: o,
      colorEmbedded: $,
      colorEmbeddedModal: $,
      colorEmbeddedPopover: $,
      textColor: l,
      titleTextColor: a,
      borderColor: s,
      actionColor: $,
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
      boxShadow: b,
      borderRadius: t
    });
  }, rx = {
    name: "Card",
    common: R,
    self(e) {
      const o = tx(e), { cardColor: t, modalColor: r, popoverColor: n } = e;
      return o.colorEmbedded = t, o.colorEmbeddedModal = r, o.colorEmbeddedPopover = n, o;
    }
  }, Os = rx, nx = (e) => ({
    dotSize: "8px",
    dotColor: "rgba(255, 255, 255, .3)",
    dotColorActive: "rgba(255, 255, 255, 1)",
    dotColorFocus: "rgba(255, 255, 255, .5)",
    dotLineWidth: "16px",
    dotLineWidthActive: "24px",
    arrowColor: "#eee"
  }), ix = {
    name: "Carousel",
    common: R,
    self: nx
  }, lx = ix, ax = {
    sizeSmall: "14px",
    sizeMedium: "16px",
    sizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, sx = (e) => {
    const { baseColor: o, inputColorDisabled: t, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: l, borderColor: a, primaryColor: s, textColor2: c, fontSizeSmall: u, fontSizeMedium: f, fontSizeLarge: v, borderRadiusSmall: p, lineHeight: d } = e;
    return Object.assign(Object.assign({}, ax), {
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
  }, cx = {
    name: "Checkbox",
    common: R,
    self(e) {
      const { cardColor: o } = e, t = sx(e);
      return t.color = "#0000", t.checkMarkColor = o, t;
    }
  }, zt = cx, dx = (e) => {
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
  }, ux = {
    name: "Cascader",
    common: R,
    peers: {
      InternalSelectMenu: Zt,
      InternalSelection: ci,
      Scrollbar: _e,
      Checkbox: zt,
      Empty: ai
    },
    self: dx
  }, fx = ux, hx = {
    name: "Code",
    common: R,
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
  }, Es = hx, px = (e) => {
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
  }, vx = {
    name: "Collapse",
    common: R,
    self: px
  }, gx = vx, mx = (e) => {
    const { cubicBezierEaseInOut: o } = e;
    return {
      bezier: o
    };
  }, bx = {
    name: "CollapseTransition",
    common: R,
    self: mx
  }, xx = bx, Cx = {
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
  }, yx = ie({
    name: "ConfigProvider",
    alias: ["App"],
    props: Cx,
    setup(e) {
      const o = he(wo, null), t = O(() => {
        const { theme: d } = e;
        if (d === null)
          return;
        const g = o == null ? void 0 : o.mergedThemeRef.value;
        return d === void 0 ? g : g === void 0 ? d : Object.assign({}, g, d);
      }), r = O(() => {
        const { themeOverrides: d } = e;
        if (d !== null) {
          if (d === void 0)
            return o == null ? void 0 : o.mergedThemeOverridesRef.value;
          {
            const g = o == null ? void 0 : o.mergedThemeOverridesRef.value;
            return g === void 0 ? d : Bt({}, g, d);
          }
        }
      }), n = Ze(() => {
        const { namespace: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedNamespaceRef.value : d;
      }), i = Ze(() => {
        const { bordered: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedBorderedRef.value : d;
      }), l = O(() => {
        const { icons: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedIconsRef.value : d;
      }), a = O(() => {
        const { componentOptions: d } = e;
        return d !== void 0 ? d : o == null ? void 0 : o.mergedComponentPropsRef.value;
      }), s = O(() => {
        const { clsPrefix: d } = e;
        return d !== void 0 ? d : o == null ? void 0 : o.mergedClsPrefixRef.value;
      }), c = O(() => {
        var d;
        const { rtl: g } = e;
        if (g === void 0)
          return o == null ? void 0 : o.mergedRtlRef.value;
        const b = {};
        for (const h of g)
          b[h.name] = qe(h), (d = h.peers) === null || d === void 0 || d.forEach(($) => {
            $.name in b || (b[$.name] = qe($));
          });
        return b;
      }), u = O(() => e.breakpoints || (o == null ? void 0 : o.mergedBreakpointsRef.value)), f = e.inlineThemeDisabled || (o == null ? void 0 : o.inlineThemeDisabled), v = e.preflightStyleDisabled || (o == null ? void 0 : o.preflightStyleDisabled), p = O(() => {
        const { value: d } = t, { value: g } = r, b = g && Object.keys(g).length !== 0, h = d == null ? void 0 : d.name;
        return h ? b ? `${h}-${Vt(JSON.stringify(r.value))}` : h : b ? Vt(JSON.stringify(r.value)) : "";
      });
      return ro(wo, {
        mergedThemeHashRef: p,
        mergedBreakpointsRef: u,
        mergedRtlRef: c,
        mergedIconsRef: l,
        mergedComponentPropsRef: a,
        mergedBorderedRef: i,
        mergedNamespaceRef: n,
        mergedClsPrefixRef: s,
        mergedLocaleRef: O(() => {
          const { locale: d } = e;
          if (d !== null)
            return d === void 0 ? o == null ? void 0 : o.mergedLocaleRef.value : d;
        }),
        mergedDateLocaleRef: O(() => {
          const { dateLocale: d } = e;
          if (d !== null)
            return d === void 0 ? o == null ? void 0 : o.mergedDateLocaleRef.value : d;
        }),
        mergedHljsRef: O(() => {
          const { hljs: d } = e;
          return d === void 0 ? o == null ? void 0 : o.mergedHljsRef.value : d;
        }),
        mergedKatexRef: O(() => {
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
      return this.abstract ? (r = (t = this.$slots).default) === null || r === void 0 ? void 0 : r.call(t) : y(this.as || this.tag, {
        class: `${this.mergedClsPrefix || ns}-config-provider`
      }, (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e));
    }
  }), Sx = {
    name: "Popselect",
    common: R,
    peers: {
      Popover: nt,
      InternalSelectMenu: Zt
    }
  }, _s = Sx;
  function Ds(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const wx = {
    name: "Select",
    common: ao,
    peers: {
      InternalSelection: Is,
      InternalSelectMenu: xs
    },
    self: Ds
  }, $x = wx, Px = {
    name: "Select",
    common: R,
    peers: {
      InternalSelection: ci,
      InternalSelectMenu: Zt
    },
    self: Ds
  }, Hs = Px, Tx = V([Z("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), Z("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [Cs({
    originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
  })])]), zx = Object.assign(Object.assign({}, pe.props), {
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
  }), Ix = ie({
    name: "Select",
    props: zx,
    setup(e) {
      process.env.NODE_ENV !== "production" && Co(() => {
        e.items !== void 0 && _o("select", "`items` is deprecated, please use `options` instead."), e.onChange !== void 0 && _o("select", "`on-change` is deprecated, please use `on-update:value` instead.");
      });
      const { mergedClsPrefixRef: o, mergedBorderedRef: t, namespaceRef: r, inlineThemeDisabled: n } = tt(e), i = pe("Select", "-select", Tx, $x, e, o), l = A(e.defaultValue), a = se(e, "value"), s = wn(a, l), c = A(!1), u = A(""), f = O(() => {
        const { valueField: m, childrenField: T } = e, B = w0(m, T);
        return gb(z.value, B);
      }), v = O(() => P0(C.value, e.valueField, e.childrenField)), p = A(!1), d = wn(se(e, "show"), p), g = A(null), b = A(null), h = A(null), { localeRef: $ } = is("Select"), H = O(() => {
        var m;
        return (m = e.placeholder) !== null && m !== void 0 ? m : $.value.placeholder;
      }), I = ia(e, ["items", "options"]), M = [], E = A([]), x = A([]), w = A(/* @__PURE__ */ new Map()), S = O(() => {
        const { fallbackOption: m } = e;
        if (m === void 0) {
          const { labelField: T, valueField: B } = e;
          return (X) => ({
            [T]: String(X),
            [B]: X
          });
        }
        return m === !1 ? !1 : (T) => Object.assign(m(T), {
          value: T
        });
      }), C = O(() => x.value.concat(E.value).concat(I.value)), P = O(() => {
        const { filter: m } = e;
        if (m)
          return m;
        const { labelField: T, valueField: B } = e;
        return (X, q) => {
          if (!q)
            return !1;
          const ee = q[T];
          if (typeof ee == "string")
            return dn(X, ee);
          const te = q[B];
          return typeof te == "string" ? dn(X, te) : typeof te == "number" ? dn(X, String(te)) : !1;
        };
      }), z = O(() => {
        if (e.remote)
          return I.value;
        {
          const { value: m } = C, { value: T } = u;
          return !T.length || !e.filterable ? m : $0(m, P.value, T, e.childrenField);
        }
      });
      function L(m) {
        const T = e.remote, { value: B } = w, { value: X } = v, { value: q } = S, ee = [];
        return m.forEach((te) => {
          if (X.has(te))
            ee.push(X.get(te));
          else if (T && B.has(te))
            ee.push(B.get(te));
          else if (q) {
            const ne = q(te);
            ne && ee.push(ne);
          }
        }), ee;
      }
      const _ = O(() => {
        if (e.multiple) {
          const { value: m } = s;
          return Array.isArray(m) ? L(m) : [];
        }
        return null;
      }), N = O(() => {
        const { value: m } = s;
        return !e.multiple && !Array.isArray(m) ? m === null ? null : L([m])[0] || null : null;
      }), U = ju(e), { mergedSizeRef: G, mergedDisabledRef: oe, mergedStatusRef: k } = U;
      function W(m, T) {
        const { onChange: B, "onUpdate:value": X, onUpdateValue: q } = e, { nTriggerFormChange: ee, nTriggerFormInput: te } = U;
        B && Se(B, m, T), q && Se(q, m, T), X && Se(X, m, T), l.value = m, ee(), te();
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
        const { onFocus: T, showOnFocus: B } = e, { nTriggerFormFocus: X } = U;
        T && Se(T, m), X(), B && He();
      }
      function so(m) {
        const { onSearch: T } = e;
        T && Se(T, m);
      }
      function Pe(m) {
        const { onScroll: T } = e;
        T && Se(T, m);
      }
      function eo() {
        var m;
        const { remote: T, multiple: B } = e;
        if (T) {
          const { value: X } = w;
          if (B) {
            const { valueField: q } = e;
            (m = _.value) === null || m === void 0 || m.forEach((ee) => {
              X.set(ee[q], ee);
            });
          } else {
            const q = N.value;
            q && X.set(q[e.valueField], q);
          }
        }
      }
      function Re(m) {
        const { onUpdateShow: T, "onUpdate:show": B } = e;
        T && Se(T, m), B && Se(B, m), p.value = m;
      }
      function He() {
        oe.value || (Re(!0), p.value = !0, e.filterable && ko());
      }
      function Ce() {
        Re(!1);
      }
      function Ke() {
        u.value = "", x.value = M;
      }
      const Fe = A(!1);
      function Le() {
        e.filterable && (Fe.value = !0);
      }
      function co() {
        e.filterable && (Fe.value = !1, d.value || Ke());
      }
      function uo() {
        oe.value || (d.value ? e.filterable ? ko() : Ce() : He());
      }
      function fo(m) {
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
      function F(m) {
        if (!Array.isArray(m))
          return [];
        if (S.value)
          return Array.from(m);
        {
          const { remote: T } = e, { value: B } = v;
          if (T) {
            const { value: X } = w;
            return m.filter((q) => B.has(q) || X.has(q));
          } else
            return m.filter((X) => B.has(X));
        }
      }
      function K(m) {
        de(m.rawNode);
      }
      function de(m) {
        if (oe.value)
          return;
        const { tag: T, remote: B, clearFilterAfterSelect: X, valueField: q } = e;
        if (T && !B) {
          const { value: ee } = x, te = ee[0] || null;
          if (te) {
            const ne = E.value;
            ne.length ? ne.push(te) : E.value = [te], x.value = M;
          }
        }
        if (B && w.value.set(m[q], m), e.multiple) {
          const ee = F(s.value), te = ee.findIndex((ne) => ne === m[q]);
          if (~te) {
            if (ee.splice(te, 1), T && !B) {
              const ne = We(m[q]);
              ~ne && (E.value.splice(ne, 1), X && (u.value = ""));
            }
          } else
            ee.push(m[q]), X && (u.value = "");
          W(ee, L(ee));
        } else {
          if (T && !B) {
            const ee = We(m[q]);
            ~ee ? E.value = [
              E.value[ee]
            ] : E.value = M;
          }
          Mo(), Ce(), W(m[q], m);
        }
      }
      function We(m) {
        return E.value.findIndex((B) => B[e.valueField] === m);
      }
      function it(m) {
        d.value || He();
        const { value: T } = m.target;
        u.value = T;
        const { tag: B, remote: X } = e;
        if (so(T), B && !X) {
          if (!T) {
            x.value = M;
            return;
          }
          const { onCreate: q } = e, ee = q ? q(T) : { [e.labelField]: T, [e.valueField]: T }, { valueField: te } = e;
          I.value.some((ne) => ne[te] === ee[te]) || E.value.some((ne) => ne[te] === ee[te]) ? x.value = M : x.value = [ee];
        }
      }
      function Mt(m) {
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
        var T, B, X, q, ee;
        switch (m.key) {
          case " ":
            if (e.filterable)
              break;
            m.preventDefault();
          case "Enter":
            if (!(!((T = g.value) === null || T === void 0) && T.isComposing)) {
              if (d.value) {
                const te = (B = h.value) === null || B === void 0 ? void 0 : B.getPendingTmNode();
                te ? K(te) : e.filterable || (Ce(), Mo());
              } else if (He(), e.tag && Fe.value) {
                const te = x.value[0];
                if (te) {
                  const ne = te[e.valueField], { value: ke } = s;
                  e.multiple && Array.isArray(ke) && ke.some((po) => po === ne) || de(te);
                }
              }
            }
            m.preventDefault();
            break;
          case "ArrowUp":
            if (m.preventDefault(), e.loading)
              return;
            d.value && ((X = h.value) === null || X === void 0 || X.prev());
            break;
          case "ArrowDown":
            if (m.preventDefault(), e.loading)
              return;
            d.value ? (q = h.value) === null || q === void 0 || q.next() : He();
            break;
          case "Escape":
            d.value && (Hd(m), Ce()), (ee = g.value) === null || ee === void 0 || ee.focus();
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
      function kt() {
        var m;
        d.value && ((m = b.value) === null || m === void 0 || m.syncPosition());
      }
      eo(), xe(se(e, "options"), eo);
      const ct = {
        focus: () => {
          var m;
          (m = g.value) === null || m === void 0 || m.focus();
        },
        blur: () => {
          var m;
          (m = g.value) === null || m === void 0 || m.blur();
        }
      }, Xe = O(() => {
        const { self: { menuBoxShadow: m } } = i.value;
        return {
          "--n-menu-box-shadow": m
        };
      }), ho = n ? To("select", void 0, Xe, e) : void 0;
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
        followerRef: b,
        localizedPlaceholder: H,
        selectedOption: N,
        selectedOptions: _,
        mergedSize: G,
        mergedDisabled: oe,
        focused: c,
        activeWithoutMenuOpen: Fe,
        inlineThemeDisabled: n,
        onTriggerInputFocus: Le,
        onTriggerInputBlur: co,
        handleTriggerOrMenuResize: kt,
        handleMenuFocus: Fo,
        handleMenuBlur: zo,
        handleMenuTabOut: Io,
        handleTriggerClick: uo,
        handleToggle: K,
        handleDeleteOption: de,
        handlePatternInput: it,
        handleClear: Mt,
        handleTriggerBlur: fo,
        handleTriggerFocus: Ro,
        handleKeydown: st,
        handleMenuAfterLeave: Ke,
        handleMenuClickOutside: Me,
        handleMenuScroll: at,
        handleMenuKeydown: st,
        handleMenuMousedown: lt,
        mergedTheme: i,
        cssVars: n ? void 0 : Xe,
        themeClass: ho == null ? void 0 : ho.themeClass,
        onRender: ho == null ? void 0 : ho.onRender
      });
    },
    render() {
      return y(
        "div",
        { class: `${this.mergedClsPrefix}-select` },
        y(ha, null, {
          default: () => [
            y(pa, null, {
              default: () => y(v0, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
                arrow: () => {
                  var e, o;
                  return [(o = (e = this.$slots).arrow) === null || o === void 0 ? void 0 : o.call(e)];
                }
              })
            }),
            y(ma, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === So.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
              default: () => y(St, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
                default: () => {
                  var e, o, t;
                  return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Yt(y(Nb, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
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
  }), Mx = {
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
  }, kx = (e) => {
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
    return Object.assign(Object.assign({}, Mx), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${a}`, buttonBorderHover: `1px solid ${a}`, buttonBorderPressed: `1px solid ${a}`, buttonIconColor: o, buttonIconColorHover: o, buttonIconColorPressed: o, itemTextColor: o, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: t, itemTextColorDisabled: l, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${t}`, itemBorderDisabled: `1px solid ${a}`, itemBorderRadius: s, itemSizeSmall: v, itemSizeMedium: p, itemSizeLarge: d, itemFontSizeSmall: c, itemFontSizeMedium: u, itemFontSizeLarge: f, jumperFontSizeSmall: c, jumperFontSizeMedium: u, jumperFontSizeLarge: f, jumperTextColor: o, jumperTextColorDisabled: l });
  }, Ox = {
    name: "Pagination",
    common: R,
    peers: {
      Select: Hs,
      Input: Ge,
      Popselect: _s
    },
    self(e) {
      const { primaryColor: o, opacity3: t } = e, r = D(o, {
        alpha: Number(t)
      }), n = kx(e);
      return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
    }
  }, Bs = Ox, As = {
    padding: "8px 14px"
  }, Ex = {
    name: "Tooltip",
    common: R,
    peers: {
      Popover: nt
    },
    self(e) {
      const { borderRadius: o, boxShadow2: t, popoverColor: r, textColor2: n } = e;
      return Object.assign(Object.assign({}, As), { borderRadius: o, boxShadow: t, color: r, textColor: n });
    }
  }, Lr = Ex, _x = (e) => {
    const { borderRadius: o, boxShadow2: t, baseColor: r } = e;
    return Object.assign(Object.assign({}, As), { borderRadius: o, boxShadow: t, color: Q(r, "rgba(0, 0, 0, .85)"), textColor: r });
  }, Dx = {
    name: "Tooltip",
    common: ao,
    peers: {
      Popover: si
    },
    self: _x
  }, Hx = Dx, Bx = {
    name: "Ellipsis",
    common: R,
    peers: {
      Tooltip: Lr
    }
  }, Rs = Bx, Ax = {
    radioSizeSmall: "14px",
    radioSizeMedium: "16px",
    radioSizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, Rx = {
    name: "Radio",
    common: R,
    self(e) {
      const { borderColor: o, primaryColor: t, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: a, borderRadius: s, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: f, heightSmall: v, heightMedium: p, heightLarge: d, lineHeight: g } = e;
      return Object.assign(Object.assign({}, Ax), {
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
  }, Fs = Rx, Fx = {
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
  }, Lx = (e) => {
    const { primaryColor: o, textColor2: t, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: l, borderRadius: a, fontSizeSmall: s, fontSizeMedium: c, fontSizeLarge: u, fontSizeHuge: f, heightSmall: v, heightMedium: p, heightLarge: d, heightHuge: g, textColor3: b, opacityDisabled: h } = e;
    return Object.assign(Object.assign({}, Fx), {
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
      groupHeaderTextColor: b,
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
  }, Wx = {
    name: "Dropdown",
    common: R,
    peers: {
      Popover: nt
    },
    self(e) {
      const { primaryColorSuppl: o, primaryColor: t, popoverColor: r } = e, n = Lx(e);
      return n.colorInverted = r, n.optionColorActive = D(t, { alpha: 0.15 }), n.optionColorActiveInverted = o, n.optionColorHoverInverted = o, n;
    }
  }, di = Wx, Nx = {
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
  }, jx = (e) => {
    const { cardColor: o, modalColor: t, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: l, tableColorHover: a, iconColor: s, primaryColor: c, fontWeightStrong: u, borderRadius: f, lineHeight: v, fontSizeSmall: p, fontSizeMedium: d, fontSizeLarge: g, dividerColor: b, heightSmall: h, opacityDisabled: $, tableColorStriped: H } = e;
    return Object.assign(Object.assign({}, Nx), {
      actionDividerColor: b,
      lineHeight: v,
      borderRadius: f,
      fontSizeSmall: p,
      fontSizeMedium: d,
      fontSizeLarge: g,
      borderColor: Q(o, b),
      tdColorHover: Q(o, a),
      tdColorStriped: Q(o, H),
      thColor: Q(o, l),
      thColorHover: Q(Q(o, l), a),
      tdColor: o,
      tdTextColor: n,
      thTextColor: i,
      thFontWeight: u,
      thButtonColorHover: a,
      thIconColor: s,
      thIconColorActive: c,
      // modal
      borderColorModal: Q(t, b),
      tdColorHoverModal: Q(t, a),
      tdColorStripedModal: Q(t, H),
      thColorModal: Q(t, l),
      thColorHoverModal: Q(Q(t, l), a),
      tdColorModal: t,
      // popover
      borderColorPopover: Q(r, b),
      tdColorHoverPopover: Q(r, a),
      tdColorStripedPopover: Q(r, H),
      thColorPopover: Q(r, l),
      thColorHoverPopover: Q(Q(r, l), a),
      tdColorPopover: r,
      boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
      boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
      // loading
      loadingColor: c,
      loadingSize: h,
      opacityLoading: $
    });
  }, Vx = {
    name: "DataTable",
    common: R,
    peers: {
      Button: De,
      Checkbox: zt,
      Radio: Fs,
      Pagination: Bs,
      Scrollbar: _e,
      Empty: rt,
      Popover: nt,
      Ellipsis: Rs,
      Dropdown: di
    },
    self(e) {
      const o = jx(e);
      return o.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", o.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", o;
    }
  }, Ux = Vx, Gx = Object.assign(Object.assign({}, ws), pe.props), Kx = ie({
    name: "Tooltip",
    props: Gx,
    __popover__: !0,
    setup(e) {
      const o = pe("Tooltip", "-tooltip", void 0, Hx, e), t = A(null);
      return Object.assign(Object.assign({}, {
        syncPosition() {
          t.value.syncPosition();
        },
        setShow(n) {
          t.value.setShow(n);
        }
      }), { popoverRef: t, mergedTheme: o, popoverThemeOverrides: O(() => o.value.self) });
    },
    render() {
      const { mergedTheme: e, internalExtraClass: o } = this;
      return y($s, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: o.concat("tooltip"), ref: "popoverRef" }), this.$slots);
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
  }, Xx = {
    name: "Icon",
    common: ao,
    self: Ls
  }, Yx = Xx, qx = {
    name: "Icon",
    common: R,
    self: Ls
  }, Jx = qx, Zx = Z("icon", `
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
  })]), Qx = Object.assign(Object.assign({}, pe.props), { depth: [String, Number], size: [Number, String], color: String, component: Object }), un = ie({
    _n_icon__: !0,
    name: "Icon",
    inheritAttrs: !1,
    props: Qx,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = tt(e), r = pe("Icon", "-icon", Zx, Yx, e, o), n = O(() => {
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
      }), i = t ? To("icon", O(() => `${e.depth || "d"}`), n, e) : void 0;
      return {
        mergedClsPrefix: o,
        mergedStyle: O(() => {
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
      return !((e = o == null ? void 0 : o.$options) === null || e === void 0) && e._n_icon__ && xr("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), y("i", Or(this.$attrs, {
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
      }), n ? y(n) : this.$slots);
    }
  }), eC = {
    itemFontSize: "12px",
    itemHeight: "36px",
    itemWidth: "52px",
    panelActionPadding: "8px 0"
  }, oC = (e) => {
    const { popoverColor: o, textColor2: t, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: l, boxShadow2: a, borderRadius: s, iconColor: c, iconColorDisabled: u } = e;
    return Object.assign(Object.assign({}, eC), {
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
  }, tC = {
    name: "TimePicker",
    common: R,
    peers: {
      Scrollbar: _e,
      Button: De,
      Input: Ge
    },
    self: oC
  }, Ws = tC, rC = {
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
  }, nC = (e) => {
    const { hoverColor: o, fontSize: t, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: l, borderRadiusSmall: a, iconColor: s, iconColorDisabled: c, textColor1: u, dividerColor: f, boxShadow2: v, borderRadius: p, fontWeightStrong: d } = e;
    return Object.assign(Object.assign({}, rC), {
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
  }, iC = {
    name: "DatePicker",
    common: R,
    peers: {
      Input: Ge,
      Button: De,
      TimePicker: Ws,
      Scrollbar: _e
    },
    self(e) {
      const { popoverColor: o, hoverColor: t, primaryColor: r } = e, n = nC(e);
      return n.itemColorDisabled = Q(o, t), n.itemColorIncluded = D(r, { alpha: 0.15 }), n.itemColorHover = Q(o, t), n;
    }
  }, lC = iC, aC = {
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
  }, sC = (e) => {
    const { tableHeaderColor: o, textColor2: t, textColor1: r, cardColor: n, modalColor: i, popoverColor: l, dividerColor: a, borderRadius: s, fontWeightStrong: c, lineHeight: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p } = e;
    return Object.assign(Object.assign({}, aC), {
      lineHeight: u,
      fontSizeSmall: f,
      fontSizeMedium: v,
      fontSizeLarge: p,
      titleTextColor: r,
      thColor: Q(n, o),
      thColorModal: Q(i, o),
      thColorPopover: Q(l, o),
      thTextColor: r,
      thFontWeight: c,
      tdTextColor: t,
      tdColor: n,
      tdColorModal: i,
      tdColorPopover: l,
      borderColor: Q(n, a),
      borderColorModal: Q(i, a),
      borderColorPopover: Q(l, a),
      borderRadius: s
    });
  }, cC = {
    name: "Descriptions",
    common: R,
    self: sC
  }, dC = cC, uC = {
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
  }, fC = (e) => {
    const { textColor1: o, textColor2: t, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, infoColor: c, successColor: u, warningColor: f, errorColor: v, primaryColor: p, dividerColor: d, borderRadius: g, fontWeightStrong: b, lineHeight: h, fontSize: $ } = e;
    return Object.assign(Object.assign({}, uC), {
      fontSize: $,
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
      titleFontWeight: b
    });
  }, hC = {
    name: "Dialog",
    common: R,
    peers: {
      Button: De
    },
    self: fC
  }, Ns = hC, pC = (e) => {
    const { modalColor: o, textColor2: t, boxShadow3: r } = e;
    return {
      color: o,
      textColor: t,
      boxShadow: r
    };
  }, vC = {
    name: "Modal",
    common: R,
    peers: {
      Scrollbar: _e,
      Dialog: Ns,
      Card: Os
    },
    self: pC
  }, gC = vC, mC = (e) => {
    const { textColor1: o, dividerColor: t, fontWeightStrong: r } = e;
    return {
      textColor: o,
      color: t,
      fontWeight: r
    };
  }, bC = {
    name: "Divider",
    common: R,
    self: mC
  }, xC = bC, CC = (e) => {
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
  }, yC = {
    name: "Drawer",
    common: R,
    peers: {
      Scrollbar: _e
    },
    self: CC
  }, SC = yC, wC = {
    actionMargin: "0 0 0 20px",
    actionMarginRtl: "0 20px 0 0"
  }, $C = {
    name: "DynamicInput",
    common: R,
    peers: {
      Input: Ge,
      Button: De
    },
    self() {
      return wC;
    }
  }, PC = $C, TC = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, zC = {
    name: "Space",
    self() {
      return TC;
    }
  }, js = zC, IC = {
    name: "DynamicTags",
    common: R,
    peers: {
      Input: Ge,
      Button: De,
      Tag: Ts,
      Space: js
    },
    self() {
      return {
        inputWidth: "64px"
      };
    }
  }, MC = IC, kC = {
    name: "Element",
    common: R
  }, OC = kC, EC = {
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
  }, _C = (e) => {
    const { heightSmall: o, heightMedium: t, heightLarge: r, textColor1: n, errorColor: i, warningColor: l, lineHeight: a, textColor3: s } = e;
    return Object.assign(Object.assign({}, EC), { blankHeightSmall: o, blankHeightMedium: t, blankHeightLarge: r, lineHeight: a, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: l, feedbackTextColor: s });
  }, DC = {
    name: "Form",
    common: R,
    self: _C
  }, HC = DC, BC = {
    name: "GradientText",
    common: R,
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
  }, AC = BC, RC = (e) => {
    const { primaryColor: o, baseColor: t } = e;
    return {
      color: o,
      iconColor: t
    };
  }, FC = {
    name: "IconWrapper",
    common: R,
    self: RC
  }, LC = FC, WC = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  }, NC = (e) => {
    const { textColor2: o, successColor: t, infoColor: r, warningColor: n, errorColor: i, popoverColor: l, closeIconColor: a, closeIconColorHover: s, closeIconColorPressed: c, closeColorHover: u, closeColorPressed: f, textColor1: v, textColor3: p, borderRadius: d, fontWeightStrong: g, boxShadow2: b, lineHeight: h, fontSize: $ } = e;
    return Object.assign(Object.assign({}, WC), {
      borderRadius: d,
      lineHeight: h,
      fontSize: $,
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
      boxShadow: b
    });
  }, jC = {
    name: "Notification",
    common: R,
    peers: {
      Scrollbar: _e
    },
    self: NC
  }, VC = jC, UC = {
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
  }, GC = (e) => {
    const { textColor2: o, closeIconColor: t, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: l, errorColor: a, warningColor: s, popoverColor: c, boxShadow2: u, primaryColor: f, lineHeight: v, borderRadius: p, closeColorHover: d, closeColorPressed: g } = e;
    return Object.assign(Object.assign({}, UC), {
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
  }, KC = {
    name: "Message",
    common: R,
    self: GC
  }, XC = KC, YC = {
    name: "ButtonGroup",
    common: R
  }, qC = YC, JC = {
    name: "InputNumber",
    common: R,
    peers: {
      Button: De,
      Input: Ge
    },
    self(e) {
      const { textColorDisabled: o } = e;
      return {
        iconColorDisabled: o
      };
    }
  }, ZC = JC, QC = {
    name: "Layout",
    common: R,
    peers: {
      Scrollbar: _e
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
        siderToggleBarColor: Q(t, l),
        siderToggleBarColorHover: Q(t, a),
        __invertScrollbar: "false"
      };
    }
  }, ey = QC, oy = (e) => {
    const { textColor2: o, cardColor: t, modalColor: r, popoverColor: n, dividerColor: i, borderRadius: l, fontSize: a, hoverColor: s } = e;
    return {
      textColor: o,
      color: t,
      colorHover: s,
      colorModal: r,
      colorHoverModal: Q(r, s),
      colorPopover: n,
      colorHoverPopover: Q(n, s),
      borderColor: i,
      borderColorModal: Q(r, i),
      borderColorPopover: Q(n, i),
      borderRadius: l,
      fontSize: a
    };
  }, ty = {
    name: "List",
    common: R,
    self: oy
  }, ry = ty, ny = {
    name: "LoadingBar",
    common: R,
    self(e) {
      const { primaryColor: o } = e;
      return {
        colorError: "red",
        colorLoading: o,
        height: "2px"
      };
    }
  }, iy = ny, ly = {
    name: "Log",
    common: R,
    peers: {
      Scrollbar: _e,
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
  }, ay = ly, sy = {
    name: "Mention",
    common: R,
    peers: {
      InternalSelectMenu: Zt,
      Input: Ge
    },
    self(e) {
      const { boxShadow2: o } = e;
      return {
        menuBoxShadow: o
      };
    }
  }, cy = sy;
  function dy(e, o, t, r) {
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
  const uy = (e) => {
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
    }, dy("#BBB", r, "#FFF", "#AAA"));
  }, fy = {
    name: "Menu",
    common: R,
    peers: {
      Tooltip: Lr,
      Dropdown: di
    },
    self(e) {
      const { primaryColor: o, primaryColorSuppl: t } = e, r = uy(e);
      return r.itemColorActive = D(o, { alpha: 0.15 }), r.itemColorActiveHover = D(o, { alpha: 0.15 }), r.itemColorActiveCollapsed = D(o, {
        alpha: 0.15
      }), r.itemColorActiveInverted = t, r.itemColorActiveHoverInverted = t, r.itemColorActiveCollapsedInverted = t, r;
    }
  }, hy = fy, py = {
    titleFontSize: "18px",
    backSize: "22px"
  };
  function vy(e) {
    const { textColor1: o, textColor2: t, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: l, primaryColorPressed: a } = e;
    return Object.assign(Object.assign({}, py), { titleFontWeight: i, fontSize: n, titleTextColor: o, backColor: t, backColorHover: l, backColorPressed: a, subtitleTextColor: r });
  }
  const gy = {
    name: "PageHeader",
    common: R,
    self: vy
  }, my = {
    iconSize: "22px"
  }, by = (e) => {
    const { fontSize: o, warningColor: t } = e;
    return Object.assign(Object.assign({}, my), { fontSize: o, iconColor: t });
  }, xy = {
    name: "Popconfirm",
    common: R,
    peers: {
      Button: De,
      Popover: nt
    },
    self: by
  }, Cy = xy, yy = (e) => {
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
  }, Sy = {
    name: "Progress",
    common: R,
    self(e) {
      const o = yy(e);
      return o.textColorLineInner = "rgb(0, 0, 0)", o.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", o;
    }
  }, Vs = Sy, wy = {
    name: "Rate",
    common: R,
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
  }, $y = wy, Py = {
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
  }, Ty = (e) => {
    const { textColor2: o, textColor1: t, errorColor: r, successColor: n, infoColor: i, warningColor: l, lineHeight: a, fontWeightStrong: s } = e;
    return Object.assign(Object.assign({}, Py), { lineHeight: a, titleFontWeight: s, titleTextColor: t, textColor: o, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: l });
  }, zy = {
    name: "Result",
    common: R,
    self: Ty
  }, Iy = zy, My = {
    railHeight: "4px",
    railWidthVertical: "4px",
    handleSize: "18px",
    dotHeight: "8px",
    dotWidth: "8px",
    dotBorderRadius: "4px"
  }, ky = {
    name: "Slider",
    common: R,
    self(e) {
      const o = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: t, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: l, cardColor: a, borderRadius: s, fontSize: c, opacityDisabled: u } = e;
      return Object.assign(Object.assign({}, My), { fontSize: c, markFontSize: c, railColor: t, railColorHover: t, fillColor: n, fillColorHover: n, opacityDisabled: u, handleColor: "#FFF", dotColor: a, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: o, indicatorTextColor: l, indicatorBorderRadius: s, dotBorder: `2px solid ${t}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
    }
  }, Oy = ky, Ey = (e) => {
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
  }, _y = {
    name: "Spin",
    common: R,
    self: Ey
  }, Dy = _y, Hy = (e) => {
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
  }, By = {
    name: "Statistic",
    common: R,
    self: Hy
  }, Ay = By, Ry = {
    stepHeaderFontSizeSmall: "14px",
    stepHeaderFontSizeMedium: "16px",
    indicatorIndexFontSizeSmall: "14px",
    indicatorIndexFontSizeMedium: "16px",
    indicatorSizeSmall: "22px",
    indicatorSizeMedium: "28px",
    indicatorIconSizeSmall: "14px",
    indicatorIconSizeMedium: "18px"
  }, Fy = (e) => {
    const { fontWeightStrong: o, baseColor: t, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: l, textColor2: a } = e;
    return Object.assign(Object.assign({}, Ry), { stepHeaderFontWeight: o, indicatorTextColorProcess: t, indicatorTextColorWait: r, indicatorTextColorFinish: n, indicatorTextColorError: i, indicatorBorderColorProcess: n, indicatorBorderColorWait: r, indicatorBorderColorFinish: n, indicatorBorderColorError: i, indicatorColorProcess: n, indicatorColorWait: "#0000", indicatorColorFinish: "#0000", indicatorColorError: "#0000", splitorColorProcess: r, splitorColorWait: r, splitorColorFinish: n, splitorColorError: r, headerTextColorProcess: l, headerTextColorWait: r, headerTextColorFinish: r, headerTextColorError: i, descriptionTextColorProcess: a, descriptionTextColorWait: r, descriptionTextColorFinish: r, descriptionTextColorError: i });
  }, Ly = {
    name: "Steps",
    common: R,
    self: Fy
  }, Wy = Ly, Ny = {
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
  }, jy = {
    name: "Switch",
    common: R,
    self(e) {
      const { primaryColorSuppl: o, opacityDisabled: t, borderRadius: r, primaryColor: n, textColor2: i, baseColor: l } = e, a = "rgba(255, 255, 255, .20)";
      return Object.assign(Object.assign({}, Ny), { iconColor: l, textColor: i, loadingColor: o, opacityDisabled: t, railColor: a, railColorActive: o, buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", buttonColor: "#FFF", railBorderRadiusSmall: r, railBorderRadiusMedium: r, railBorderRadiusLarge: r, buttonBorderRadiusSmall: r, buttonBorderRadiusMedium: r, buttonBorderRadiusLarge: r, boxShadowFocus: `0 0 8px 0 ${D(n, { alpha: 0.3 })}` });
    }
  }, Vy = jy, Uy = {
    thPaddingSmall: "6px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "6px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px"
  }, Gy = (e) => {
    const { dividerColor: o, cardColor: t, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: l, textColor1: a, textColor2: s, borderRadius: c, fontWeightStrong: u, lineHeight: f, fontSizeSmall: v, fontSizeMedium: p, fontSizeLarge: d } = e;
    return Object.assign(Object.assign({}, Uy), {
      fontSizeSmall: v,
      fontSizeMedium: p,
      fontSizeLarge: d,
      lineHeight: f,
      borderRadius: c,
      borderColor: Q(t, o),
      borderColorModal: Q(r, o),
      borderColorPopover: Q(n, o),
      tdColor: t,
      tdColorModal: r,
      tdColorPopover: n,
      tdColorStriped: Q(t, l),
      tdColorStripedModal: Q(r, l),
      tdColorStripedPopover: Q(n, l),
      thColor: Q(t, i),
      thColorModal: Q(r, i),
      thColorPopover: Q(n, i),
      thTextColor: a,
      tdTextColor: s,
      thFontWeight: u
    });
  }, Ky = {
    name: "Table",
    common: R,
    self: Gy
  }, Xy = Ky, Yy = {
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
  }, qy = (e) => {
    const { textColor2: o, primaryColor: t, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, tabColor: c, baseColor: u, dividerColor: f, fontWeight: v, textColor1: p, borderRadius: d, fontSize: g, fontWeightStrong: b } = e;
    return Object.assign(Object.assign({}, Yy), {
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
      fontWeightStrong: b
    });
  }, Jy = {
    name: "Tabs",
    common: R,
    self(e) {
      const o = qy(e), { inputColor: t } = e;
      return o.colorSegment = t, o.tabColorSegment = t, o;
    }
  }, Zy = Jy, Qy = (e) => {
    const { textColor1: o, textColor2: t, fontWeightStrong: r, fontSize: n } = e;
    return {
      fontSize: n,
      titleTextColor: o,
      textColor: t,
      titleFontWeight: r
    };
  }, e1 = {
    name: "Thing",
    common: R,
    self: Qy
  }, o1 = e1, t1 = {
    titleMarginMedium: "0 0 6px 0",
    titleMarginLarge: "-2px 0 6px 0",
    titleFontSizeMedium: "14px",
    titleFontSizeLarge: "16px",
    iconSizeMedium: "14px",
    iconSizeLarge: "14px"
  }, r1 = {
    name: "Timeline",
    common: R,
    self(e) {
      const { textColor3: o, infoColorSuppl: t, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: l, textColor2: a, railColor: s, fontWeightStrong: c, fontSize: u } = e;
      return Object.assign(Object.assign({}, t1), { contentFontSize: u, titleFontWeight: c, circleBorder: `2px solid ${o}`, circleBorderInfo: `2px solid ${t}`, circleBorderError: `2px solid ${r}`, circleBorderSuccess: `2px solid ${n}`, circleBorderWarning: `2px solid ${i}`, iconColor: o, iconColorInfo: t, iconColorError: r, iconColorSuccess: n, iconColorWarning: i, titleTextColor: l, contentTextColor: a, metaTextColor: o, lineColor: s });
    }
  }, n1 = r1, i1 = {
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
  }, l1 = {
    name: "Transfer",
    common: R,
    peers: {
      Checkbox: zt,
      Scrollbar: _e,
      Input: Ge,
      Empty: rt,
      Button: De
    },
    self(e) {
      const { fontWeight: o, fontSizeLarge: t, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: l, borderRadius: a, inputColor: s, tableHeaderColor: c, textColor1: u, textColorDisabled: f, textColor2: v, textColor3: p, hoverColor: d, closeColorHover: g, closeColorPressed: b, closeIconColor: h, closeIconColorHover: $, closeIconColorPressed: H, dividerColor: I } = e;
      return Object.assign(Object.assign({}, i1), {
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
        closeColorPressed: b,
        closeIconColor: h,
        closeIconColorHover: $,
        closeIconColorPressed: H
      });
    }
  }, a1 = l1, s1 = (e) => {
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
  }, c1 = {
    name: "Tree",
    common: R,
    peers: {
      Checkbox: zt,
      Scrollbar: _e,
      Empty: rt
    },
    self(e) {
      const { primaryColor: o } = e, t = s1(e);
      return t.nodeColorActive = D(o, { alpha: 0.15 }), t;
    }
  }, Us = c1, d1 = {
    name: "TreeSelect",
    common: R,
    peers: {
      Tree: Us,
      Empty: rt,
      InternalSelection: ci
    }
  }, u1 = d1, f1 = {
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
    return Object.assign(Object.assign({}, f1), { aTextColor: o, blockquoteTextColor: t, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: l, liTextColor: t, liLineHeight: n, liFontSize: i, hrColor: a, headerFontWeight: s, headerTextColor: c, pTextColor: t, pTextColor1Depth: c, pTextColor2Depth: t, pTextColor3Depth: u, pLineHeight: n, pFontSize: i, headerBarColor: o, headerBarColorPrimary: o, headerBarColorInfo: f, headerBarColorError: p, headerBarColorWarning: v, headerBarColorSuccess: d, textColor: t, textColor1Depth: c, textColor2Depth: t, textColor3Depth: u, textColorPrimary: o, textColorInfo: f, textColorSuccess: d, textColorWarning: v, textColorError: p, codeTextColor: t, codeColor: g, codeBorder: "1px solid #0000" });
  }, h1 = {
    name: "Typography",
    common: ao,
    self: Gs
  }, p1 = h1, v1 = {
    name: "Typography",
    common: R,
    self: Gs
  }, g1 = v1, m1 = (e) => {
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
  }, b1 = {
    name: "Upload",
    common: R,
    peers: {
      Button: De,
      Progress: Vs
    },
    self(e) {
      const { errorColor: o } = e, t = m1(e);
      return t.itemColorHoverError = D(o, {
        alpha: 0.09
      }), t;
    }
  }, x1 = b1, C1 = {
    name: "Watermark",
    common: R,
    self(e) {
      const { fontFamily: o } = e;
      return {
        fontFamily: o
      };
    }
  }, y1 = C1, S1 = {
    name: "Row",
    common: R
  }, w1 = S1, $1 = {
    name: "Image",
    common: R,
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
  }, P1 = {
    extraFontSize: "12px",
    width: "440px"
  }, T1 = {
    name: "Transfer",
    common: R,
    peers: {
      Checkbox: zt,
      Scrollbar: _e,
      Input: Ge,
      Empty: rt,
      Button: De
    },
    self(e) {
      const { iconColorDisabled: o, iconColor: t, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: l, heightLarge: a, heightMedium: s, heightSmall: c, borderRadius: u, inputColor: f, tableHeaderColor: v, textColor1: p, textColorDisabled: d, textColor2: g, hoverColor: b } = e;
      return Object.assign(Object.assign({}, P1), {
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
        itemColorPending: b,
        titleFontWeight: r,
        iconColor: t,
        iconColorDisabled: o
      });
    }
  }, z1 = T1, I1 = {
    name: "Skeleton",
    common: R,
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
  }, M1 = Z("h", `
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
  })])]), k1 = Object.assign(Object.assign({}, pe.props), { type: {
    type: String,
    default: "default"
  }, prefix: String, alignText: Boolean }), It = (e) => ie({
    name: `H${e}`,
    props: k1,
    setup(o) {
      const { mergedClsPrefixRef: t, inlineThemeDisabled: r } = tt(o), n = pe("Typography", "-h", M1, p1, o, t), i = O(() => {
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
      }), l = r ? To(`h${e}`, O(() => o.type[0]), i, o) : void 0;
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
      return (o = this.onRender) === null || o === void 0 || o.call(this), y(`h${e}`, {
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
  It("1");
  It("2");
  const fn = It("3");
  It("4");
  It("5");
  It("6");
  const O1 = () => ({}), E1 = {
    name: "Equation",
    common: R,
    self: O1
  }, _1 = E1, Ks = {
    name: "dark",
    common: R,
    Alert: b0,
    Anchor: S0,
    AutoComplete: k0,
    Avatar: ks,
    AvatarGroup: H0,
    BackTop: R0,
    Badge: L0,
    Breadcrumb: V0,
    Button: De,
    ButtonGroup: qC,
    Calendar: J0,
    Card: Os,
    Carousel: lx,
    Cascader: fx,
    Checkbox: zt,
    Code: Es,
    Collapse: gx,
    CollapseTransition: xx,
    ColorPicker: ex,
    DataTable: Ux,
    DatePicker: lC,
    Descriptions: dC,
    Dialog: Ns,
    Divider: xC,
    Drawer: SC,
    Dropdown: di,
    DynamicInput: PC,
    DynamicTags: MC,
    Element: OC,
    Empty: rt,
    Ellipsis: Rs,
    Equation: _1,
    Form: HC,
    GradientText: AC,
    Icon: Jx,
    IconWrapper: LC,
    Image: $1,
    Input: Ge,
    InputNumber: ZC,
    LegacyTransfer: z1,
    Layout: ey,
    List: ry,
    LoadingBar: iy,
    Log: ay,
    Menu: hy,
    Mention: cy,
    Message: XC,
    Modal: gC,
    Notification: VC,
    PageHeader: gy,
    Pagination: Bs,
    Popconfirm: Cy,
    Popover: nt,
    Popselect: _s,
    Progress: Vs,
    Radio: Fs,
    Rate: $y,
    Result: Iy,
    Row: w1,
    Scrollbar: _e,
    Select: Hs,
    Skeleton: I1,
    Slider: Oy,
    Space: js,
    Spin: Dy,
    Statistic: Ay,
    Steps: Wy,
    Switch: Vy,
    Table: Xy,
    Tabs: Zy,
    Tag: Ts,
    Thing: o1,
    TimePicker: Ws,
    Timeline: n1,
    Tooltip: Lr,
    Transfer: a1,
    Tree: Us,
    TreeSelect: u1,
    Typography: g1,
    Upload: x1,
    Watermark: y1
  }, D1 = "/editor/leftarrow.svg", H1 = "/editor/circle.svg", B1 = "/editor/rightarrow.svg", Pl = {
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
  }, A1 = [
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
  ], R1 = Kl("coa", {
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
  }), zl = A(Ks), F1 = A("Dark"), Il = {
    common: {
      bodyColor: "#23313f",
      cardColor: "#293949",
      railColor: "#555",
      primaryColorSuppl: "#fff"
    }
  }, L1 = Kl("theme", {
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
        return F1.value;
      }
    }
  }), W1 = { class: "w-full h-full" }, N1 = { class: "flex flex-row justify-center p-5 relative" }, j1 = ["disabled"], V1 = /* @__PURE__ */ Te("img", { src: D1 }, null, -1), U1 = ["disabled"], G1 = /* @__PURE__ */ Te("img", { src: H1 }, null, -1), K1 = ["disabled"], X1 = /* @__PURE__ */ Te("img", { src: B1 }, null, -1), Y1 = { class: "m-5" }, q1 = { class: "flex" }, J1 = { class: "w-1/2 mr-4" }, Z1 = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80" }, Q1 = ["onClick"], eS = { class: "w-1/3 mr-4 text-sm" }, oS = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80" }, tS = ["onClick"], rS = { class: "w-1/2" }, nS = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg overflow-y-auto max-h-80" }, iS = ["onClick"], lS = /* @__PURE__ */ ie({
    __name: "CoalitionComponent",
    setup(e) {
      const o = R1(), t = "Select a coalition preset", r = O(() => o.coa.red), n = O(() => o.coa.blue), i = O(() => o.coa.neutrals), l = A({
        list: "red",
        index: 0
      }), a = (w) => {
        const S = A1.find((C) => C.value === w);
        return S ? S.label : null;
      }, s = (w, S) => {
        l.value.list = w, l.value.index = S;
      }, c = (w, S, C) => {
        if (!C)
          return;
        const P = {
          red: {
            list: r,
            sortedList: d
          },
          blue: {
            list: n,
            sortedList: g
          },
          neutral: {
            list: i,
            sortedList: b
          }
        }, z = P[w], L = P[S], _ = z.sortedList.value[l.value.index], N = z.list.value.indexOf(_), U = z.list.value.splice(N, 1)[0];
        L.list.value.push(U), l.value.list = S, l.value.index = -1;
      }, u = () => {
        c(
          "blue",
          "red",
          l.value.list === "blue" && l.value.index >= 0 && n.value.length > 0
        ), c(
          "neutral",
          "red",
          l.value.list === "neutral" && l.value.index >= 0 && i.value.length > 0
        );
      }, f = () => {
        c(
          "red",
          "blue",
          l.value.list === "red" && l.value.index >= 0 && r.value.length > 0
        ), c(
          "neutral",
          "blue",
          l.value.list === "neutral" && l.value.index >= 0 && i.value.length > 0
        );
      }, v = () => {
        c(
          "red",
          "neutral",
          l.value.list === "red" && l.value.index >= 0 && r.value.length > 0
        ), c(
          "blue",
          "neutral",
          l.value.list === "blue" && l.value.index >= 0 && n.value.length > 0
        );
      }, p = (w) => w.value.slice().sort((S, C) => S - C), d = O(() => p(r)), g = O(() => p(n)), b = O(() => p(i)), h = O(() => ({
        red: d.value,
        neutrals: b.value,
        blue: g.value
      })), $ = O({
        get() {
          return JSON.stringify(o.coa) === JSON.stringify(Tl) ? "Modern" : JSON.stringify(o.coa) === JSON.stringify(Pl) ? "ColdWar" : JSON.stringify(o.coa) === JSON.stringify(An) ? "WW2" : "Custom";
        },
        set(w) {
          w === "Modern" ? o.setAll(structuredClone(Tl)) : w === "ColdWar" ? o.setAll(structuredClone(Pl)) : w === "WW2" ? o.setAll(structuredClone(An)) : ($.value = "Custom", o.setAll(structuredClone(h.value)));
        }
      }), H = [
        { label: "Modern", value: "Modern" },
        { label: "Cold War 1947-1991", value: "ColdWar" },
        { label: "WWII", value: "WW2" },
        { label: "Custom", value: "Custom" }
      ], I = A(!0), M = A(!1), E = A(!1);
      return xe(() => l.value.list, (w) => {
        w === "red" ? (I.value = !0, M.value = !1, E.value = !1) : w === "neutral" ? (I.value = !1, M.value = !0, E.value = !1) : w === "blue" && (I.value = !1, M.value = !1, E.value = !0);
      }), (w, S) => (Eo(), Lo("div", W1, [
        Te("div", N1, [
          mo(Ee(Kx), {
            trigger: "hover",
            class: "w-full"
          }, {
            trigger: bo(() => [
              mo(Ee(Ix), {
                value: Ee($),
                "onUpdate:value": S[0] || (S[0] = (C) => Ct($) ? $.value = C : null),
                options: H,
                class: "absolute left-0 ml-5 w-1/4"
              }, null, 8, ["value"])
            ]),
            default: bo(() => [
              xo(" " + Qt(t))
            ]),
            _: 1
          }),
          Te("button", {
            onClick: u,
            disabled: I.value
          }, [
            mo(Ee(un), { size: "35" }, {
              default: bo(() => [
                V1
              ]),
              _: 1
            })
          ], 8, j1),
          Te("button", {
            onClick: v,
            disabled: M.value
          }, [
            mo(Ee(un), { size: "35" }, {
              default: bo(() => [
                G1
              ]),
              _: 1
            })
          ], 8, U1),
          Te("button", {
            onClick: f,
            disabled: E.value
          }, [
            mo(Ee(un), { size: "35" }, {
              default: bo(() => [
                X1
              ]),
              _: 1
            })
          ], 8, K1)
        ]),
        Te("div", Y1, [
          Te("div", q1, [
            Te("div", J1, [
              mo(Ee(fn), { class: "mb-3 text-lg" }, {
                default: bo(() => [
                  xo("Red")
                ]),
                _: 1
              }),
              Te("ul", Z1, [
                (Eo(!0), Lo(to, null, Wr(Ee(d), (C, P) => (Eo(), Lo("li", {
                  key: P,
                  class: Nr(["mb-2 cursor-pointer rounded text-sm", {
                    "bg-blue-200 pl-2 text-black text-sm": l.value.list === "red" && l.value.index === P
                  }]),
                  onClick: (z) => s("red", P)
                }, Qt(a(C)), 11, Q1))), 128))
              ])
            ]),
            Te("div", eS, [
              mo(Ee(fn), { class: "mb-3 text-lg" }, {
                default: bo(() => [
                  xo("Neutral")
                ]),
                _: 1
              }),
              Te("ul", oS, [
                (Eo(!0), Lo(to, null, Wr(Ee(b), (C, P) => (Eo(), Lo("li", {
                  key: P,
                  class: Nr(["mb-2 cursor-pointer rounded text-sm", {
                    "bg-blue-200 pl-2 text-black text-sm": l.value.list === "neutral" && l.value.index === P
                  }]),
                  onClick: (z) => s("neutral", P)
                }, Qt(a(C)), 11, tS))), 128))
              ])
            ]),
            Te("div", rS, [
              mo(Ee(fn), { class: "mb-3 text-lg" }, {
                default: bo(() => [
                  xo("Blue")
                ]),
                _: 1
              }),
              Te("ul", nS, [
                (Eo(!0), Lo(to, null, Wr(Ee(g), (C, P) => (Eo(), Lo("li", {
                  key: P,
                  class: Nr(["mb-2 cursor-pointer rounded text-sm", {
                    "bg-blue-200 pl-2 text-black text-sm": l.value.list === "blue" && l.value.index === P
                  }]),
                  onClick: (z) => s("blue", P)
                }, Qt(a(C)), 11, iS))), 128))
              ])
            ])
          ])
        ])
      ]));
    }
  }), aS = /* @__PURE__ */ ie({
    __name: "App",
    setup(e) {
      const o = L1(), t = A(o.theme), r = A(o.getSelectedTheme), n = A(o.getThemeOverrides);
      return (i, l) => (Eo(), wc(Ee(yx), {
        theme: r.value === "Dark" ? t.value : null,
        "theme-overrides": r.value === "Dark" ? n.value : null
      }, {
        default: bo(() => [
          mo(lS)
        ]),
        _: 1
      }, 8, ["theme", "theme-overrides"]));
    }
  }), sS = Yc(), Xs = $c(aS);
  Xs.use(sS);
  Xs.mount("#app");
});
export default cS();
