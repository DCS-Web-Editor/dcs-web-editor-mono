var hc = (e, o) => () => (o || e((o = { exports: {} }).exports, o), o.exports);
import { effectScope as Il, ref as F, markRaw as qe, toRaw as Mr, getCurrentInstance as Bn, inject as he, watch as ye, unref as Xe, reactive as pc, isRef as bt, isReactive as An, toRef as se, nextTick as Ct, computed as E, getCurrentScope as vc, onScopeDispose as gc, toRefs as ci, createTextVNode as xt, Fragment as to, Comment as Rn, isVNode as mc, defineComponent as ie, readonly as un, onMounted as Ve, onBeforeUnmount as Qe, provide as ro, withDirectives as Xt, h as y, Teleport as bc, renderSlot as zl, onActivated as Ml, onDeactivated as kl, mergeProps as kr, onBeforeMount as Fn, watchEffect as go, Transition as yt, vShow as Ol, cloneVNode as Cc, openBlock as zo, createElementBlock as Ao, createElementVNode as be, createVNode as ut, withCtx as ft, toDisplayString as Zt, renderList as Lr, normalizeClass as Wr, createBlock as xc, createApp as yc } from "vue";
var rS = hc((He, Be) => {
  var El = !1;
  function Qt(e, o, t) {
    return Array.isArray(e) ? (e.length = Math.max(e.length, o), e.splice(o, 1, t), t) : (e[o] = t, t);
  }
  function Nr(e, o) {
    if (Array.isArray(e)) {
      e.splice(o, 1);
      return;
    }
    delete e[o];
  }
  function Sc() {
    return _l().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function _l() {
    return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
  }
  const wc = typeof Proxy == "function", $c = "devtools-plugin:setup", Pc = "plugin:settings:set";
  let lt, fn;
  function Tc() {
    var e;
    return lt !== void 0 || (typeof window < "u" && window.performance ? (lt = !0, fn = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (lt = !0, fn = global.perf_hooks.performance) : lt = !1), lt;
  }
  function Ic() {
    return Tc() ? fn.now() : Date.now();
  }
  class zc {
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
          return Ic();
        }
      }, t && t.on(Pc, (l, a) => {
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
  function Dl(e, o) {
    const t = e, r = _l(), n = Sc(), i = wc && t.enableEarlyProxy;
    if (n && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
      n.emit($c, e, o);
    else {
      const l = i ? new zc(t, n) : null;
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
  let Dt;
  const Wt = (e) => Dt = e, Hl = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
    /* istanbul ignore next */
    Symbol()
  );
  function Ko(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var no;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(no || (no = {}));
  const Or = typeof window < "u", Bt = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && Or, di = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
  function Mc(e, { autoBom: o = !1 } = {}) {
    return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
  }
  function Ln(e, o, t) {
    const r = new XMLHttpRequest();
    r.open("GET", e), r.responseType = "blob", r.onload = function() {
      Rl(r.response, o, t);
    }, r.onerror = function() {
      console.error("could not download file");
    }, r.send();
  }
  function Bl(e) {
    const o = new XMLHttpRequest();
    o.open("HEAD", e, !1);
    try {
      o.send();
    } catch {
    }
    return o.status >= 200 && o.status <= 299;
  }
  function cr(e) {
    try {
      e.dispatchEvent(new MouseEvent("click"));
    } catch {
      const t = document.createEvent("MouseEvents");
      t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
    }
  }
  const dr = typeof navigator == "object" ? navigator : { userAgent: "" }, Al = /* @__PURE__ */ (() => /Macintosh/.test(dr.userAgent) && /AppleWebKit/.test(dr.userAgent) && !/Safari/.test(dr.userAgent))(), Rl = Or ? (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Al ? kc : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in dr ? Oc : (
        // Fallback to using FileReader and a popup
        Ec
      )
    )
  ) : () => {
  };
  function kc(e, o = "download", t) {
    const r = document.createElement("a");
    r.download = o, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? Bl(r.href) ? Ln(e, o, t) : (r.target = "_blank", cr(r)) : cr(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
      URL.revokeObjectURL(r.href);
    }, 4e4), setTimeout(function() {
      cr(r);
    }, 0));
  }
  function Oc(e, o = "download", t) {
    if (typeof e == "string")
      if (Bl(e))
        Ln(e, o, t);
      else {
        const r = document.createElement("a");
        r.href = e, r.target = "_blank", setTimeout(function() {
          cr(r);
        });
      }
    else
      navigator.msSaveOrOpenBlob(Mc(e, t), o);
  }
  function Ec(e, o, t, r) {
    if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
      return Ln(e, o, t);
    const n = e.type === "application/octet-stream", i = /constructor/i.test(String(di.HTMLElement)) || "safari" in di, l = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((l || n && i || Al) && typeof FileReader < "u") {
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
  function Ce(e, o) {
    const t = "🍍 " + e;
    typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, o) : o === "error" ? console.error(t) : o === "warn" ? console.warn(t) : console.log(t);
  }
  function Wn(e) {
    return "_a" in e && "install" in e;
  }
  function Fl() {
    if (!("clipboard" in navigator))
      return Ce("Your browser doesn't support the Clipboard API", "error"), !0;
  }
  function Ll(e) {
    return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Ce('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
  }
  async function _c(e) {
    if (!Fl())
      try {
        await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Ce("Global state copied to clipboard.");
      } catch (o) {
        if (Ll(o))
          return;
        Ce("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Dc(e) {
    if (!Fl())
      try {
        e.state.value = JSON.parse(await navigator.clipboard.readText()), Ce("Global state pasted from clipboard.");
      } catch (o) {
        if (Ll(o))
          return;
        Ce("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Hc(e) {
    try {
      Rl(new Blob([JSON.stringify(e.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (o) {
      Ce("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  let po;
  function Bc() {
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
  async function Ac(e) {
    try {
      const t = await (await Bc())();
      if (!t)
        return;
      const { text: r, file: n } = t;
      e.state.value = JSON.parse(r), Ce(`Global state imported from "${n.name}".`);
    } catch (o) {
      Ce("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  function Ye(e) {
    return {
      _custom: {
        display: e
      }
    };
  }
  const Wl = "🍍 Pinia (root)", hn = "_root";
  function Rc(e) {
    return Wn(e) ? {
      id: hn,
      label: Wl
    } : {
      id: e.$id,
      label: e.$id
    };
  }
  function Fc(e) {
    if (Wn(e)) {
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
  function Lc(e) {
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
  function Wc(e) {
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
  let ht = !0;
  const ur = [], Fo = "pinia:mutations", $e = "pinia", { assign: Nc } = Object, vr = (e) => "🍍 " + e;
  function jc(e, o) {
    Dl({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes: ur,
      app: e
    }, (t) => {
      typeof t.now != "function" && Ce("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
        id: Fo,
        label: "Pinia 🍍",
        color: 15064968
      }), t.addInspector({
        id: $e,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              _c(o);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await Dc(o), t.sendInspectorTree($e), t.sendInspectorState($e);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              Hc(o);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await Ac(o), t.sendInspectorTree($e), t.sendInspectorState($e);
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
              n ? n._isOptionsAPI ? (n.$reset(), Ce(`Store "${r}" reset.`)) : Ce(`Cannot reset "${r}" store because it's a setup store.`, "warn") : Ce(`Cannot reset "${r}" store because it wasn't found.`, "warn");
            }
          }
        ]
      }), t.on.inspectComponent((r, n) => {
        const i = r.componentInstance && r.componentInstance.proxy;
        if (i && i._pStores) {
          const l = r.componentInstance.proxy._pStores;
          Object.values(l).forEach((a) => {
            r.instanceData.state.push({
              type: vr(a.$id),
              key: "state",
              editable: !0,
              value: a._isOptionsAPI ? {
                _custom: {
                  value: Mr(a.$state),
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
              type: vr(a.$id),
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
        if (r.app === e && r.inspectorId === $e) {
          let n = [o];
          n = n.concat(Array.from(o._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : Wl.toLowerCase().includes(r.filter.toLowerCase())) : n).map(Rc);
        }
      }), t.on.getInspectorState((r) => {
        if (r.app === e && r.inspectorId === $e) {
          const n = r.nodeId === hn ? o : o._s.get(r.nodeId);
          if (!n)
            return;
          n && (r.state = Fc(n));
        }
      }), t.on.editInspectorState((r, n) => {
        if (r.app === e && r.inspectorId === $e) {
          const i = r.nodeId === hn ? o : o._s.get(r.nodeId);
          if (!i)
            return Ce(`store "${r.nodeId}" not found`, "error");
          const { path: l } = r;
          Wn(i) ? l.unshift("state") : (l.length !== 1 || !i._customProperties.has(l[0]) || l[0] in i.$state) && l.unshift("$state"), ht = !1, r.set(i, l, r.state.value), ht = !0;
        }
      }), t.on.editComponentState((r) => {
        if (r.type.startsWith("🍍")) {
          const n = r.type.replace(/^🍍\s*/, ""), i = o._s.get(n);
          if (!i)
            return Ce(`store "${n}" not found`, "error");
          const { path: l } = r;
          if (l[0] !== "state")
            return Ce(`Invalid path for store "${n}":
${l}
Only state can be modified.`);
          l[0] = "$state", ht = !1, r.set(i, l, r.state.value), ht = !0;
        }
      });
    });
  }
  function Vc(e, o) {
    ur.includes(vr(o.$id)) || ur.push(vr(o.$id)), Dl({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes: ur,
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
        const u = Nl++;
        t.addTimelineEvent({
          layerId: Fo,
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
          Wo = void 0, t.addTimelineEvent({
            layerId: Fo,
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
          Wo = void 0, t.addTimelineEvent({
            layerId: Fo,
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
        ye(() => Xe(o[l]), (a, s) => {
          t.notifyComponentUpdate(), t.sendInspectorState($e), ht && t.addTimelineEvent({
            layerId: Fo,
            event: {
              time: r(),
              title: "Change",
              subtitle: l,
              data: {
                newValue: a,
                oldValue: s
              },
              groupId: Wo
            }
          });
        }, { deep: !0 });
      }), o.$subscribe(({ events: l, type: a }, s) => {
        if (t.notifyComponentUpdate(), t.sendInspectorState($e), !ht)
          return;
        const c = {
          time: r(),
          title: Wc(a),
          data: Nc({ store: Ye(o.$id) }, Lc(l)),
          groupId: Wo
        };
        Wo = void 0, a === no.patchFunction ? c.subtitle = "⤵️" : a === no.patchObject ? c.subtitle = "🧩" : l && !Array.isArray(l) && (c.subtitle = l.type), l && (c.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: l
          }
        }), t.addTimelineEvent({
          layerId: Fo,
          event: c
        });
      }, { detached: !0, flush: "sync" });
      const n = o._hotUpdate;
      o._hotUpdate = qe((l) => {
        n(l), t.addTimelineEvent({
          layerId: Fo,
          event: {
            time: r(),
            title: "🔥 " + o.$id,
            subtitle: "HMR update",
            data: {
              store: Ye(o.$id),
              info: Ye("HMR update")
            }
          }
        }), t.notifyComponentUpdate(), t.sendInspectorTree($e), t.sendInspectorState($e);
      });
      const { $dispose: i } = o;
      o.$dispose = () => {
        i(), t.notifyComponentUpdate(), t.sendInspectorTree($e), t.sendInspectorState($e), t.getSettings().logStoreChanges && Ce(`Disposed "${o.$id}" store 🗑`);
      }, t.notifyComponentUpdate(), t.sendInspectorTree($e), t.sendInspectorState($e), t.getSettings().logStoreChanges && Ce(`"${o.$id}" store installed 🆕`);
    });
  }
  let Nl = 0, Wo;
  function ui(e, o) {
    const t = o.reduce((r, n) => (r[n] = Mr(e)[n], r), {});
    for (const r in t)
      e[r] = function() {
        const n = Nl, i = new Proxy(e, {
          get(...l) {
            return Wo = n, Reflect.get(...l);
          },
          set(...l) {
            return Wo = n, Reflect.set(...l);
          }
        });
        return t[r].apply(i, arguments);
      };
  }
  function Uc({ app: e, store: o, options: t }) {
    if (!o.$id.startsWith("__hot:")) {
      if (t.state && (o._isOptionsAPI = !0), typeof t.state == "function") {
        ui(
          // @ts-expect-error: can cast the store...
          o,
          Object.keys(t.actions)
        );
        const r = o._hotUpdate;
        Mr(o)._hotUpdate = function(n) {
          r.apply(this, arguments), ui(o, Object.keys(n._hmrPayload.actions));
        };
      }
      Vc(
        e,
        // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
        o
      );
    }
  }
  function Gc() {
    const e = Il(!0), o = e.run(() => F({}));
    let t = [], r = [];
    const n = qe({
      install(i) {
        Wt(n), n._a = i, i.provide(Hl, n), i.config.globalProperties.$pinia = n, Bt && jc(i, n), r.forEach((l) => t.push(l)), r = [];
      },
      use(i) {
        return !this._a && !El ? r.push(i) : t.push(i), this;
      },
      _p: t,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: e,
      _s: /* @__PURE__ */ new Map(),
      state: o
    });
    return Bt && typeof Proxy < "u" && n.use(Uc), n;
  }
  function jl(e, o) {
    for (const t in o) {
      const r = o[t];
      if (!(t in e))
        continue;
      const n = e[t];
      Ko(n) && Ko(r) && !bt(r) && !An(r) ? e[t] = jl(n, r) : e[t] = r;
    }
    return e;
  }
  const Vl = () => {
  };
  function fi(e, o, t, r = Vl) {
    e.push(o);
    const n = () => {
      const i = e.indexOf(o);
      i > -1 && (e.splice(i, 1), r());
    };
    return !t && vc() && gc(n), n;
  }
  function at(e, ...o) {
    e.slice().forEach((t) => {
      t(...o);
    });
  }
  function pn(e, o) {
    e instanceof Map && o instanceof Map && o.forEach((t, r) => e.set(r, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
    for (const t in o) {
      if (!o.hasOwnProperty(t))
        continue;
      const r = o[t], n = e[t];
      Ko(n) && Ko(r) && e.hasOwnProperty(t) && !bt(r) && !An(r) ? e[t] = pn(n, r) : e[t] = r;
    }
    return e;
  }
  const Kc = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
    /* istanbul ignore next */
    Symbol()
  );
  function Xc(e) {
    return !Ko(e) || !e.hasOwnProperty(Kc);
  }
  const { assign: Ne } = Object;
  function hi(e) {
    return !!(bt(e) && e.effect);
  }
  function pi(e, o, t, r) {
    const { state: n, actions: i, getters: l } = o, a = t.state.value[e];
    let s;
    function c() {
      !a && (process.env.NODE_ENV === "production" || !r) && (t.state.value[e] = n ? n() : {});
      const u = process.env.NODE_ENV !== "production" && r ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        ci(F(n ? n() : {}).value)
      ) : ci(t.state.value[e]);
      return Ne(u, i, Object.keys(l || {}).reduce((f, v) => (process.env.NODE_ENV !== "production" && v in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), f[v] = qe(E(() => {
        Wt(t);
        const p = t._s.get(e);
        return l[v].call(p, p);
      })), f), {}));
    }
    return s = vn(e, c, o, t, r, !0), s;
  }
  function vn(e, o, t = {}, r, n, i) {
    let l;
    const a = Ne({ actions: {} }, t);
    if (process.env.NODE_ENV !== "production" && !r._e.active)
      throw new Error("Pinia destroyed");
    const s = {
      deep: !0
      // flush: 'post',
    };
    process.env.NODE_ENV !== "production" && !El && (s.onTrigger = (w) => {
      c ? p = w : c == !1 && !b._hotUpdating && (Array.isArray(p) ? p.push(w) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
    });
    let c, u, f = qe([]), v = qe([]), p;
    const d = r.state.value[e];
    !i && !d && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
    const m = F({});
    let C;
    function h(w) {
      let x;
      c = u = !1, process.env.NODE_ENV !== "production" && (p = []), typeof w == "function" ? (w(r.state.value[e]), x = {
        type: no.patchFunction,
        storeId: e,
        events: p
      }) : (pn(r.state.value[e], w), x = {
        type: no.patchObject,
        payload: w,
        storeId: e,
        events: p
      });
      const P = C = Symbol();
      Ct().then(() => {
        C === P && (c = !0);
      }), u = !0, at(f, x, r.state.value[e]);
    }
    const S = i ? function() {
      const { state: x } = t, P = x ? x() : {};
      this.$patch((M) => {
        Ne(M, P);
      });
    } : (
      /* istanbul ignore next */
      process.env.NODE_ENV !== "production" ? () => {
        throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
      } : Vl
    );
    function D() {
      l.stop(), f = [], v = [], r._s.delete(e);
    }
    function T(w, x) {
      return function() {
        Wt(r);
        const P = Array.from(arguments), M = [], W = [];
        function H(V) {
          M.push(V);
        }
        function N(V) {
          W.push(V);
        }
        at(v, {
          args: P,
          name: w,
          store: b,
          after: H,
          onError: N
        });
        let G;
        try {
          G = x.apply(this && this.$id === e ? this : b, P);
        } catch (V) {
          throw at(W, V), V;
        }
        return G instanceof Promise ? G.then((V) => (at(M, V), V)).catch((V) => (at(W, V), Promise.reject(V))) : (at(M, G), G);
      };
    }
    const z = /* @__PURE__ */ qe({
      actions: {},
      getters: {},
      state: [],
      hotState: m
    }), O = {
      _p: r,
      // _s: scope,
      $id: e,
      $onAction: fi.bind(null, v),
      $patch: h,
      $reset: S,
      $subscribe(w, x = {}) {
        const P = fi(f, w, x.detached, () => M()), M = l.run(() => ye(() => r.state.value[e], (W) => {
          (x.flush === "sync" ? u : c) && w({
            storeId: e,
            type: no.direct,
            events: p
          }, W);
        }, Ne({}, s, x)));
        return P;
      },
      $dispose: D
    }, b = pc(process.env.NODE_ENV !== "production" || Bt ? Ne(
      {
        _hmrPayload: z,
        _customProperties: qe(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      O
      // must be added later
      // setupStore
    ) : O);
    r._s.set(e, b);
    const $ = r._e.run(() => (l = Il(), l.run(() => o())));
    for (const w in $) {
      const x = $[w];
      if (bt(x) && !hi(x) || An(x))
        process.env.NODE_ENV !== "production" && n ? Qt(m.value, w, se($, w)) : i || (d && Xc(x) && (bt(x) ? x.value = d[w] : pn(x, d[w])), r.state.value[e][w] = x), process.env.NODE_ENV !== "production" && z.state.push(w);
      else if (typeof x == "function") {
        const P = process.env.NODE_ENV !== "production" && n ? x : T(w, x);
        $[w] = P, process.env.NODE_ENV !== "production" && (z.actions[w] = x), a.actions[w] = x;
      } else
        process.env.NODE_ENV !== "production" && hi(x) && (z.getters[w] = i ? (
          // @ts-expect-error
          t.getters[w]
        ) : x, Or && ($._getters || // @ts-expect-error: same
        ($._getters = qe([]))).push(w));
    }
    if (Ne(b, $), Ne(Mr(b), $), Object.defineProperty(b, "$state", {
      get: () => process.env.NODE_ENV !== "production" && n ? m.value : r.state.value[e],
      set: (w) => {
        if (process.env.NODE_ENV !== "production" && n)
          throw new Error("cannot set hotState");
        h((x) => {
          Ne(x, w);
        });
      }
    }), process.env.NODE_ENV !== "production" && (b._hotUpdate = qe((w) => {
      b._hotUpdating = !0, w._hmrPayload.state.forEach((x) => {
        if (x in b.$state) {
          const P = w.$state[x], M = b.$state[x];
          typeof P == "object" && Ko(P) && Ko(M) ? jl(P, M) : w.$state[x] = M;
        }
        Qt(b, x, se(w.$state, x));
      }), Object.keys(b.$state).forEach((x) => {
        x in w.$state || Nr(b, x);
      }), c = !1, u = !1, r.state.value[e] = se(w._hmrPayload, "hotState"), u = !0, Ct().then(() => {
        c = !0;
      });
      for (const x in w._hmrPayload.actions) {
        const P = w[x];
        Qt(b, x, T(x, P));
      }
      for (const x in w._hmrPayload.getters) {
        const P = w._hmrPayload.getters[x], M = i ? (
          // special handling of options api
          E(() => (Wt(r), P.call(b, b)))
        ) : P;
        Qt(b, x, M);
      }
      Object.keys(b._hmrPayload.getters).forEach((x) => {
        x in w._hmrPayload.getters || Nr(b, x);
      }), Object.keys(b._hmrPayload.actions).forEach((x) => {
        x in w._hmrPayload.actions || Nr(b, x);
      }), b._hmrPayload = w._hmrPayload, b._getters = w._getters, b._hotUpdating = !1;
    })), Bt) {
      const w = {
        writable: !0,
        configurable: !0,
        // avoid warning on devtools trying to display this property
        enumerable: !1
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((x) => {
        Object.defineProperty(b, x, Ne({ value: b[x] }, w));
      });
    }
    return r._p.forEach((w) => {
      if (Bt) {
        const x = l.run(() => w({
          store: b,
          app: r._a,
          pinia: r,
          options: a
        }));
        Object.keys(x || {}).forEach((P) => b._customProperties.add(P)), Ne(b, x);
      } else
        Ne(b, l.run(() => w({
          store: b,
          app: r._a,
          pinia: r,
          options: a
        })));
    }), process.env.NODE_ENV !== "production" && b.$state && typeof b.$state == "object" && typeof b.$state.constructor == "function" && !b.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${b.$id}".`), d && i && t.hydrate && t.hydrate(b.$state, d), c = !0, u = !0, b;
  }
  function Ul(e, o, t) {
    let r, n;
    const i = typeof o == "function";
    typeof e == "string" ? (r = e, n = i ? t : o) : (n = e, r = e.id);
    function l(a, s) {
      const c = Bn();
      if (a = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (process.env.NODE_ENV === "test" && Dt && Dt._testing ? null : a) || c && he(Hl, null), a && Wt(a), process.env.NODE_ENV !== "production" && !Dt)
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      a = Dt, a._s.has(r) || (i ? vn(r, o, n, a) : pi(r, n, a), process.env.NODE_ENV !== "production" && (l._pinia = a));
      const u = a._s.get(r);
      if (process.env.NODE_ENV !== "production" && s) {
        const f = "__hot:" + r, v = i ? vn(f, o, n, a, !0) : pi(f, Ne({}, n), a, !0);
        s._hotUpdate(v), delete a.state.value[f], a._s.delete(f);
      }
      if (process.env.NODE_ENV !== "production" && Or && c && c.proxy && // avoid adding stores that are just built for hot module replacement
      !s) {
        const f = c.proxy, v = "_pStores" in f ? f._pStores : f._pStores = {};
        v[r] = u;
      }
      return u;
    }
    return l.$id = r, l;
  }
  let gr = [];
  const Gl = /* @__PURE__ */ new WeakMap();
  function Yc() {
    gr.forEach((e) => e(...Gl.get(e))), gr = [];
  }
  function Kl(e, ...o) {
    Gl.set(e, o), !gr.includes(e) && gr.push(e) === 1 && requestAnimationFrame(Yc);
  }
  function mr(e, o) {
    let { target: t } = e;
    for (; t; ) {
      if (t.dataset && t.dataset[o] !== void 0)
        return !0;
      t = t.parentElement;
    }
    return !1;
  }
  function Nt(e) {
    return e.composedPath()[0] || null;
  }
  function gn(e) {
    return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
  }
  function er(e) {
    if (e != null)
      return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
  }
  function jr(e, o) {
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
  const vi = {
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
  }, St = "^\\s*", wt = "\\s*$", No = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", jo = "([0-9A-Fa-f])", Vo = "([0-9A-Fa-f]{2})", qc = new RegExp(`${St}rgb\\s*\\(${No},${No},${No}\\)${wt}`), Jc = new RegExp(`${St}rgba\\s*\\(${No},${No},${No},${No}\\)${wt}`), Zc = new RegExp(`${St}#${jo}${jo}${jo}${wt}`), Qc = new RegExp(`${St}#${Vo}${Vo}${Vo}${wt}`), ed = new RegExp(`${St}#${jo}${jo}${jo}${jo}${wt}`), od = new RegExp(`${St}#${Vo}${Vo}${Vo}${Vo}${wt}`);
  function Oe(e) {
    return parseInt(e, 16);
  }
  function mo(e) {
    try {
      let o;
      if (o = Qc.exec(e))
        return [Oe(o[1]), Oe(o[2]), Oe(o[3]), 1];
      if (o = qc.exec(e))
        return [Pe(o[1]), Pe(o[5]), Pe(o[9]), 1];
      if (o = Jc.exec(e))
        return [
          Pe(o[1]),
          Pe(o[5]),
          Pe(o[9]),
          At(o[13])
        ];
      if (o = Zc.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          1
        ];
      if (o = od.exec(e))
        return [
          Oe(o[1]),
          Oe(o[2]),
          Oe(o[3]),
          At(Oe(o[4]) / 255)
        ];
      if (o = ed.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          At(Oe(o[4] + o[4]) / 255)
        ];
      if (e in vi)
        return mo(vi[e]);
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (o) {
      throw o;
    }
  }
  function td(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function mn(e, o, t, r) {
    return `rgba(${Pe(e)}, ${Pe(o)}, ${Pe(t)}, ${td(r)})`;
  }
  function Vr(e, o, t, r, n) {
    return Pe((e * o * (1 - r) + t * r) / n);
  }
  function Z(e, o) {
    Array.isArray(e) || (e = mo(e)), Array.isArray(o) || (o = mo(o));
    const t = e[3], r = o[3], n = At(t + r - t * r);
    return mn(Vr(e[0], t, o[0], r, n), Vr(e[1], t, o[1], r, n), Vr(e[2], t, o[2], r, n), n);
  }
  function _(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : mo(e);
    return o.alpha ? mn(t, r, n, o.alpha) : mn(t, r, n, i);
  }
  function pe(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : mo(e), { lightness: l = 1, alpha: a = 1 } = o;
    return rd([t * l, r * l, n * l, i * a]);
  }
  function At(e) {
    const o = Math.round(Number(e) * 100) / 100;
    return o > 1 ? 1 : o < 0 ? 0 : o;
  }
  function Pe(e) {
    const o = Math.round(Number(e));
    return o > 255 ? 255 : o < 0 ? 0 : o;
  }
  function rd(e) {
    const [o, t, r] = e;
    return 3 in e ? `rgba(${Pe(o)}, ${Pe(t)}, ${Pe(r)}, ${At(e[3])})` : `rgba(${Pe(o)}, ${Pe(t)}, ${Pe(r)}, 1)`;
  }
  function nd(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  }
  function id(e, o = [], t) {
    const r = {};
    return o.forEach((n) => {
      r[n] = e[n];
    }), Object.assign(r, t);
  }
  function bn(e, o = !0, t = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && t.push(xt(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          bn(r, o, t);
          return;
        }
        if (r.type === to) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && bn(r.children, o, t);
        } else
          r.type !== Rn && t.push(r);
      }
    }), t;
  }
  function we(e, ...o) {
    if (Array.isArray(e))
      e.forEach((t) => we(t, ...o));
    else
      return e(...o);
  }
  const pt = (e, ...o) => typeof e == "function" ? e(...o) : typeof e == "string" ? xt(e) : typeof e == "number" ? xt(String(e)) : null, gi = /* @__PURE__ */ new Set();
  function Mo(e, o) {
    const t = `[naive/${e}]: ${o}`;
    gi.has(t) || (gi.add(t), console.error(t));
  }
  function br(e, o) {
    console.error(`[naive/${e}]: ${o}`);
  }
  function Xl(e, o) {
    throw new Error(`[naive/${e}]: ${o}`);
  }
  function ld(e) {
    switch (typeof e) {
      case "string":
        return e || void 0;
      case "number":
        return String(e);
      default:
        return;
    }
  }
  function mi(e, o = "default", t = void 0) {
    const r = e[o];
    if (!r)
      return br("getFirstSlotVNode", `slot[${o}] is empty`), null;
    const n = bn(r(t));
    return n.length === 1 ? n[0] : (br("getFirstSlotVNode", `slot[${o}] should have exactly one child`), null);
  }
  function Er(e) {
    return e.some((o) => mc(o) ? !(o.type === Rn || o.type === to && !Er(o.children)) : !0) ? e : null;
  }
  function Nn(e, o) {
    return e && Er(e()) || o();
  }
  function vt(e, o) {
    const t = e && Er(e());
    return o(t || null);
  }
  function bi(e) {
    return !(e && Er(e()));
  }
  function Ur(e) {
    const o = e.filter((t) => t !== void 0);
    if (o.length !== 0)
      return o.length === 1 ? o[0] : (t) => {
        e.forEach((r) => {
          r && r(t);
        });
      };
  }
  const Cn = ie({
    render() {
      var e, o;
      return (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e);
    }
  }), ad = /^(\d|\.)+$/, Ci = /(\d|\.)+/;
  function fr(e, { c: o = 1, offset: t = 0, attachPx: r = !0 } = {}) {
    if (typeof e == "number") {
      const n = (e + t) * o;
      return n === 0 ? "0" : `${n}px`;
    } else if (typeof e == "string")
      if (ad.test(e)) {
        const n = (Number(e) + t) * o;
        return r ? n === 0 ? "0" : `${n}px` : `${n}`;
      } else {
        const n = Ci.exec(e);
        return n ? e.replace(Ci, String((Number(n[0]) + t) * o)) : e;
      }
    return e;
  }
  function xi(e) {
    return e.replace(/#|\(|\)|,|\s/g, "_");
  }
  function sd(e) {
    let o = 0;
    for (let t = 0; t < e.length; ++t)
      e[t] === "&" && ++o;
    return o;
  }
  const Yl = /\s*,(?![^(]*\))\s*/g, cd = /\s+/g;
  function dd(e, o) {
    const t = [];
    return o.split(Yl).forEach((r) => {
      let n = sd(r);
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
  function ud(e, o) {
    const t = [];
    return o.split(Yl).forEach((r) => {
      e.forEach((n) => {
        t.push((n && n + " ") + r);
      });
    }), t;
  }
  function fd(e) {
    let o = [""];
    return e.forEach((t) => {
      t = t && t.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      t && (t.includes("&") ? o = dd(o, t) : o = ud(o, t));
    }), o.join(", ").replace(cd, " ");
  }
  function yi(e) {
    if (!e)
      return;
    const o = e.parentElement;
    o && o.removeChild(e);
  }
  function _r(e) {
    return document.querySelector(`style[cssr-id="${e}"]`);
  }
  function hd(e) {
    const o = document.createElement("style");
    return o.setAttribute("cssr-id", e), o;
  }
  function or(e) {
    return e ? /^\s*@(s|m)/.test(e) : !1;
  }
  const pd = /[A-Z]/g;
  function ql(e) {
    return e.replace(pd, (o) => "-" + o.toLowerCase());
  }
  function vd(e, o = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((t) => o + `  ${ql(t[0])}: ${t[1]};`).join(`
`) + `
` + o + "}" : `: ${e};`;
  }
  function gd(e, o, t) {
    return typeof e == "function" ? e({
      context: o.context,
      props: t
    }) : e;
  }
  function Si(e, o, t, r) {
    if (!o)
      return "";
    const n = gd(o, t, r);
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
      a = ql(a), s != null && l.push(`  ${a}${vd(s)}`);
    }), e && l.push("}"), l.join(`
`);
  }
  function xn(e, o, t) {
    e && e.forEach((r) => {
      if (Array.isArray(r))
        xn(r, o, t);
      else if (typeof r == "function") {
        const n = r(o);
        Array.isArray(n) ? xn(n, o, t) : n && t(n);
      } else
        r && t(r);
    });
  }
  function Jl(e, o, t, r, n, i) {
    const l = e.$;
    let a = "";
    if (!l || typeof l == "string")
      or(l) ? a = l : o.push(l);
    else if (typeof l == "function") {
      const u = l({
        context: r.context,
        props: n
      });
      or(u) ? a = u : o.push(u);
    } else if (l.before && l.before(r.context), !l.$ || typeof l.$ == "string")
      or(l.$) ? a = l.$ : o.push(l.$);
    else if (l.$) {
      const u = l.$({
        context: r.context,
        props: n
      });
      or(u) ? a = u : o.push(u);
    }
    const s = fd(o), c = Si(s, e.props, r, n);
    a ? (t.push(`${a} {`), i && c && i.insertRule(`${a} {
${c}
}
`)) : (i && c && i.insertRule(c), !i && c.length && t.push(c)), e.children && xn(e.children, {
      context: r.context,
      props: n
    }, (u) => {
      if (typeof u == "string") {
        const f = Si(s, { raw: u }, r, n);
        i ? i.insertRule(f) : t.push(f);
      } else
        Jl(u, o, t, r, n, i);
    }), o.pop(), a && t.push("}"), l && l.after && l.after(r.context);
  }
  function Zl(e, o, t, r = !1) {
    const n = [];
    return Jl(e, [], n, o, t, r ? e.instance.__styleSheet : void 0), r ? "" : n.join(`

`);
  }
  function jt(e) {
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
  function md(e, o, t) {
    const { els: r } = o;
    if (t === void 0)
      r.forEach(yi), o.els = [];
    else {
      const n = _r(t);
      n && r.includes(n) && (yi(n), o.els = r.filter((i) => i !== n));
    }
  }
  function wi(e, o) {
    e.push(o);
  }
  function bd(e, o, t, r, n, i, l, a, s) {
    if (i && !s) {
      if (t === void 0) {
        console.error("[css-render/mount]: `id` is required in `silent` mode.");
        return;
      }
      const v = window.__cssrContext;
      v[t] || (v[t] = !0, Zl(o, e, r, i));
      return;
    }
    let c;
    if (t === void 0 && (c = o.render(r), t = jt(c)), s) {
      s.adapter(t, c ?? o.render(r));
      return;
    }
    const u = _r(t);
    if (u !== null && !l)
      return u;
    const f = u ?? hd(t);
    if (c === void 0 && (c = o.render(r)), f.textContent = c, u !== null)
      return u;
    if (a) {
      const v = document.head.querySelector(`meta[name="${a}"]`);
      if (v)
        return document.head.insertBefore(f, v), wi(o.els, f), f;
    }
    return n ? document.head.insertBefore(f, document.head.querySelector("style, link")) : document.head.appendChild(f), wi(o.els, f), f;
  }
  function Cd(e) {
    return Zl(this, this.instance, e);
  }
  function xd(e = {}) {
    const { id: o, ssr: t, props: r, head: n = !1, silent: i = !1, force: l = !1, anchorMetaName: a } = e;
    return bd(this.instance, this, o, r, n, i, l, a, t);
  }
  function yd(e = {}) {
    const { id: o } = e;
    md(this.instance, this, o);
  }
  const tr = function(e, o, t, r) {
    return {
      instance: e,
      $: o,
      props: t,
      children: r,
      els: [],
      render: Cd,
      mount: xd,
      unmount: yd
    };
  }, Sd = function(e, o, t, r) {
    return Array.isArray(o) ? tr(e, { $: null }, null, o) : Array.isArray(t) ? tr(e, o, null, t) : Array.isArray(r) ? tr(e, o, t, r) : tr(e, o, t, null);
  };
  function Ql(e = {}) {
    let o = null;
    const t = {
      c: (...r) => Sd(t, ...r),
      use: (r, ...n) => r.install(t, ...n),
      find: _r,
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
  function wd(e, o) {
    if (e === void 0)
      return !1;
    if (o) {
      const { context: { ids: t } } = o;
      return t.has(e);
    }
    return _r(e) !== null;
  }
  function $d(e) {
    let o = ".", t = "__", r = "--", n;
    if (e) {
      let d = e.blockPrefix;
      d && (o = d), d = e.elementPrefix, d && (t = d), d = e.modifierPrefix, d && (r = d);
    }
    const i = {
      install(d) {
        n = d.c;
        const m = d.context;
        m.bem = {}, m.bem.b = null, m.bem.els = null;
      }
    };
    function l(d) {
      let m, C;
      return {
        before(h) {
          m = h.bem.b, C = h.bem.els, h.bem.els = null;
        },
        after(h) {
          h.bem.b = m, h.bem.els = C;
        },
        $({ context: h, props: S }) {
          return d = typeof d == "string" ? d : d({ context: h, props: S }), h.bem.b = d, `${(S == null ? void 0 : S.bPrefix) || o}${h.bem.b}`;
        }
      };
    }
    function a(d) {
      let m;
      return {
        before(C) {
          m = C.bem.els;
        },
        after(C) {
          C.bem.els = m;
        },
        $({ context: C, props: h }) {
          return d = typeof d == "string" ? d : d({ context: C, props: h }), C.bem.els = d.split(",").map((S) => S.trim()), C.bem.els.map((S) => `${(h == null ? void 0 : h.bPrefix) || o}${C.bem.b}${t}${S}`).join(", ");
        }
      };
    }
    function s(d) {
      return {
        $({ context: m, props: C }) {
          d = typeof d == "string" ? d : d({ context: m, props: C });
          const h = d.split(",").map((T) => T.trim());
          function S(T) {
            return h.map((z) => `&${(C == null ? void 0 : C.bPrefix) || o}${m.bem.b}${T !== void 0 ? `${t}${T}` : ""}${r}${z}`).join(", ");
          }
          const D = m.bem.els;
          if (D !== null) {
            if (process.env.NODE_ENV !== "production" && D.length >= 2)
              throw Error(`[css-render/plugin-bem]: m(${d}) is invalid, using modifier inside multiple elements is not allowed`);
            return S(D[0]);
          } else
            return S();
        }
      };
    }
    function c(d) {
      return {
        $({ context: m, props: C }) {
          d = typeof d == "string" ? d : d({ context: m, props: C });
          const h = m.bem.els;
          if (process.env.NODE_ENV !== "production" && h !== null && h.length >= 2)
            throw Error(`[css-render/plugin-bem]: notM(${d}) is invalid, using modifier inside multiple elements is not allowed`);
          return `&:not(${(C == null ? void 0 : C.bPrefix) || o}${m.bem.b}${h !== null && h.length > 0 ? `${t}${h[0]}` : ""}${r}${d})`;
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
  function fe(e, o) {
    return e + (o === "default" ? "" : o.replace(/^[a-z]/, (t) => t.toUpperCase()));
  }
  fe("abc", "def");
  const Pd = "n", Td = `.${Pd}-`, Id = "__", zd = "--", ea = Ql(), oa = $d({
    blockPrefix: Td,
    elementPrefix: Id,
    modifierPrefix: zd
  });
  ea.use(oa);
  const { c: U, find: lS } = ea, { cB: Q, cE: Y, cM: ae, cNotM: Je } = oa, Md = (...e) => U(">", [Q(...e)]);
  let Gr;
  function kd() {
    return Gr === void 0 && (Gr = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Gr;
  }
  const Od = /* @__PURE__ */ new WeakSet();
  function Ed(e) {
    Od.add(e);
  }
  function _d(e) {
    const o = F(!!e.value);
    if (o.value)
      return un(o);
    const t = ye(e, (r) => {
      r && (o.value = !0, t());
    });
    return un(o);
  }
  function Ze(e) {
    const o = E(e), t = F(o.value);
    return ye(o, (r) => {
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
  const Dd = typeof window < "u";
  let gt, Rt;
  const Hd = () => {
    var e, o;
    gt = Dd ? (o = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || o === void 0 ? void 0 : o.ready : void 0, Rt = !1, gt !== void 0 ? gt.then(() => {
      Rt = !0;
    }) : Rt = !0;
  };
  Hd();
  function Bd(e) {
    if (Rt)
      return;
    let o = !1;
    Ve(() => {
      Rt || gt == null || gt.then(() => {
        o || e();
      });
    }), Qe(() => {
      o = !0;
    });
  }
  function hr(e) {
    return e.composedPath()[0];
  }
  const Ad = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function Rd(e, o, t) {
    if (e === "mousemoveoutside") {
      const r = (n) => {
        o.contains(hr(n)) || t(n);
      };
      return {
        mousemove: r,
        touchstart: r
      };
    } else if (e === "clickoutside") {
      let r = !1;
      const n = (l) => {
        r = !o.contains(hr(l));
      }, i = (l) => {
        r && (o.contains(hr(l)) || t(l));
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
  function ta(e, o, t) {
    const r = Ad[e];
    let n = r.get(o);
    n === void 0 && r.set(o, n = /* @__PURE__ */ new WeakMap());
    let i = n.get(t);
    return i === void 0 && n.set(t, i = Rd(e, o, t)), i;
  }
  function Fd(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = ta(e, o, t);
      return Object.keys(n).forEach((i) => {
        Ie(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Ld(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = ta(e, o, t);
      return Object.keys(n).forEach((i) => {
        me(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Wd() {
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
    function n(b, $, w) {
      const x = b[$];
      return b[$] = function() {
        return w.apply(b, arguments), x.apply(b, arguments);
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
        const { type: w, eventPhase: x, bubbles: P } = $, M = hr($);
        if (x === 2)
          return;
        const W = x === 1 ? "capture" : "bubble";
        let H = M;
        const N = [];
        for (; H === null && (H = window), N.push(H), H !== window; )
          H = H.parentNode || null;
        const G = u.capture[w], V = u.bubble[w];
        if (n($, "stopPropagation", t), n($, "stopImmediatePropagation", r), c($, s), W === "capture") {
          if (G === void 0)
            return;
          for (let oe = N.length - 1; oe >= 0 && !e.has($); --oe) {
            const k = N[oe], L = G.get(k);
            if (L !== void 0) {
              l.set($, k);
              for (const re of L) {
                if (o.has($))
                  break;
                re($);
              }
            }
            if (oe === 0 && !P && V !== void 0) {
              const re = V.get(k);
              if (re !== void 0)
                for (const ue of re) {
                  if (o.has($))
                    break;
                  ue($);
                }
            }
          }
        } else if (W === "bubble") {
          if (V === void 0)
            return;
          for (let oe = 0; oe < N.length && !e.has($); ++oe) {
            const k = N[oe], L = V.get(k);
            if (L !== void 0) {
              l.set($, k);
              for (const re of L) {
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
        const { type: w, eventPhase: x } = $;
        if (x !== 2)
          return;
        const P = f[w];
        P !== void 0 && P.forEach((M) => M($));
      };
      return b.displayName = "evtdUnifiedWindowEventHandler", b;
    }
    const d = v(), m = p();
    function C(b, $) {
      const w = u[b];
      return w[$] === void 0 && (w[$] = /* @__PURE__ */ new Map(), window.addEventListener($, d, b === "capture")), w[$];
    }
    function h(b) {
      return f[b] === void 0 && (f[b] = /* @__PURE__ */ new Set(), window.addEventListener(b, m)), f[b];
    }
    function S(b, $) {
      let w = b.get($);
      return w === void 0 && b.set($, w = /* @__PURE__ */ new Set()), w;
    }
    function D(b, $, w, x) {
      const P = u[$][w];
      if (P !== void 0) {
        const M = P.get(b);
        if (M !== void 0 && M.has(x))
          return !0;
      }
      return !1;
    }
    function T(b, $) {
      const w = f[b];
      return !!(w !== void 0 && w.has($));
    }
    function z(b, $, w, x) {
      let P;
      if (typeof x == "object" && x.once === !0 ? P = (G) => {
        O(b, $, P, x), w(G);
      } : P = w, Fd(b, $, P, x))
        return;
      const W = x === !0 || typeof x == "object" && x.capture === !0 ? "capture" : "bubble", H = C(W, b), N = S(H, $);
      if (N.has(P) || N.add(P), $ === window) {
        const G = h(b);
        G.has(P) || G.add(P);
      }
    }
    function O(b, $, w, x) {
      if (Ld(b, $, w, x))
        return;
      const M = x === !0 || typeof x == "object" && x.capture === !0, W = M ? "capture" : "bubble", H = C(W, b), N = S(H, $);
      if ($ === window && !D($, M ? "bubble" : "capture", b, w) && T(b, w)) {
        const V = f[b];
        V.delete(w), V.size === 0 && (window.removeEventListener(b, m), f[b] = void 0);
      }
      N.has(w) && N.delete(w), N.size === 0 && H.delete($), H.size === 0 && (window.removeEventListener(b, d, W === "capture"), u[W][b] = void 0);
    }
    return {
      on: z,
      off: O
    };
  }
  const { on: Ie, off: me } = Wd();
  function yn(e, o) {
    return ye(e, (t) => {
      t !== void 0 && (o.value = t);
    }), E(() => e.value === void 0 ? o.value : e.value);
  }
  function Dr() {
    const e = F(!1);
    return Ve(() => {
      e.value = !0;
    }), un(e);
  }
  function ra(e, o) {
    return E(() => {
      for (const t of o)
        if (e[t] !== void 0)
          return e[t];
      return e[o[o.length - 1]];
    });
  }
  const Nd = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  !window.MSStream;
  function jd() {
    return Nd;
  }
  const jn = "n-internal-select-menu", na = "n-internal-select-menu-body", ia = "n-modal-body", la = "n-drawer-body", aa = "n-popover-body", sa = "__disabled__";
  function bo(e) {
    const o = he(ia, null), t = he(la, null), r = he(aa, null), n = he(na, null), i = F();
    if (typeof document < "u") {
      i.value = document.fullscreenElement;
      const l = () => {
        i.value = document.fullscreenElement;
      };
      Ve(() => {
        Ie("fullscreenchange", document, l);
      }), Qe(() => {
        me("fullscreenchange", document, l);
      });
    }
    return Ze(() => {
      var l;
      const { to: a } = e;
      return a !== void 0 ? a === !1 ? sa : a === !0 ? i.value || "body" : a : o != null && o.value ? (l = o.value.$el) !== null && l !== void 0 ? l : o.value : t != null && t.value ? t.value : r != null && r.value ? r.value : n != null && n.value ? n.value : a ?? (i.value || "body");
    });
  }
  bo.tdkey = sa;
  bo.propTo = {
    type: [String, Object, Boolean],
    default: void 0
  };
  function Sn(e, o, t = "default") {
    const r = o[t];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${t}] is empty.`);
    return r();
  }
  function wn(e, o = !0, t = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && t.push(xt(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          wn(r, o, t);
          return;
        }
        if (r.type === to) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && wn(r.children, o, t);
        } else
          r.type !== Rn && t.push(r);
      }
    }), t;
  }
  function $i(e, o, t = "default") {
    const r = o[t];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${t}] is empty.`);
    const n = wn(r());
    if (n.length === 1)
      return n[0];
    throw new Error(`[vueuc/${e}]: slot[${t}] should have exactly one child.`);
  }
  let Io = null;
  function ca() {
    if (Io === null && (Io = document.getElementById("v-binder-view-measurer"), Io === null)) {
      Io = document.createElement("div"), Io.id = "v-binder-view-measurer";
      const { style: e } = Io;
      e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(Io);
    }
    return Io.getBoundingClientRect();
  }
  function Vd(e, o) {
    const t = ca();
    return {
      top: o,
      left: e,
      height: 0,
      width: 0,
      right: t.width - e,
      bottom: t.height - o
    };
  }
  function Kr(e) {
    const o = e.getBoundingClientRect(), t = ca();
    return {
      left: o.left - t.left,
      top: o.top - t.top,
      bottom: t.height + t.top - o.bottom,
      right: t.width + t.left - o.right,
      width: o.width,
      height: o.height
    };
  }
  function Ud(e) {
    return e.nodeType === 9 ? null : e.parentNode;
  }
  function da(e) {
    if (e === null)
      return null;
    const o = Ud(e);
    if (o === null)
      return null;
    if (o.nodeType === 9)
      return document;
    if (o.nodeType === 1) {
      const { overflow: t, overflowX: r, overflowY: n } = getComputedStyle(o);
      if (/(auto|scroll|overlay)/.test(t + n + r))
        return o;
    }
    return da(o);
  }
  const Gd = ie({
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
      ro("VBinder", (o = Bn()) === null || o === void 0 ? void 0 : o.proxy);
      const t = he("VBinder", null), r = F(null), n = (h) => {
        r.value = h, t && e.syncTargetWithParent && t.setTargetRef(h);
      };
      let i = [];
      const l = () => {
        let h = r.value;
        for (; h = da(h), h !== null; )
          i.push(h);
        for (const S of i)
          Ie("scroll", S, f, !0);
      }, a = () => {
        for (const h of i)
          me("scroll", h, f, !0);
        i = [];
      }, s = /* @__PURE__ */ new Set(), c = (h) => {
        s.size === 0 && l(), s.has(h) || s.add(h);
      }, u = (h) => {
        s.has(h) && s.delete(h), s.size === 0 && a();
      }, f = () => {
        Kl(v);
      }, v = () => {
        s.forEach((h) => h());
      }, p = /* @__PURE__ */ new Set(), d = (h) => {
        p.size === 0 && Ie("resize", window, C), p.has(h) || p.add(h);
      }, m = (h) => {
        p.has(h) && p.delete(h), p.size === 0 && me("resize", window, C);
      }, C = () => {
        p.forEach((h) => h());
      };
      return Qe(() => {
        me("resize", window, C), a();
      }), {
        targetRef: r,
        setTargetRef: n,
        addScrollListener: c,
        removeScrollListener: u,
        addResizeListener: d,
        removeResizeListener: m
      };
    },
    render() {
      return Sn("binder", this.$slots);
    }
  }), ua = Gd, fa = ie({
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
      return e ? Xt($i("follower", this.$slots), [
        [o]
      ]) : $i("follower", this.$slots);
    }
  }), st = "@@mmoContext", Kd = {
    mounted(e, { value: o }) {
      e[st] = {
        handler: void 0
      }, typeof o == "function" && (e[st].handler = o, Ie("mousemoveoutside", e, o));
    },
    updated(e, { value: o }) {
      const t = e[st];
      typeof o == "function" ? t.handler ? t.handler !== o && (me("mousemoveoutside", e, t.handler), t.handler = o, Ie("mousemoveoutside", e, o)) : (e[st].handler = o, Ie("mousemoveoutside", e, o)) : t.handler && (me("mousemoveoutside", e, t.handler), t.handler = void 0);
    },
    unmounted(e) {
      const { handler: o } = e[st];
      o && me("mousemoveoutside", e, o), e[st].handler = void 0;
    }
  }, Xd = Kd, ct = "@@coContext", Yd = {
    mounted(e, { value: o, modifiers: t }) {
      e[ct] = {
        handler: void 0
      }, typeof o == "function" && (e[ct].handler = o, Ie("clickoutside", e, o, {
        capture: t.capture
      }));
    },
    updated(e, { value: o, modifiers: t }) {
      const r = e[ct];
      typeof o == "function" ? r.handler ? r.handler !== o && (me("clickoutside", e, r.handler, {
        capture: t.capture
      }), r.handler = o, Ie("clickoutside", e, o, {
        capture: t.capture
      })) : (e[ct].handler = o, Ie("clickoutside", e, o, {
        capture: t.capture
      })) : r.handler && (me("clickoutside", e, r.handler, {
        capture: t.capture
      }), r.handler = void 0);
    },
    unmounted(e, { modifiers: o }) {
      const { handler: t } = e[ct];
      t && me("clickoutside", e, t, {
        capture: o.capture
      }), e[ct].handler = void 0;
    }
  }, Cr = Yd;
  function qd(e, o) {
    console.error(`[vdirs/${e}]: ${o}`);
  }
  class Jd {
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
      r.has(o) ? r.delete(o) : t === void 0 && qd("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
  const Xr = new Jd(), dt = "@@ziContext", Zd = {
    mounted(e, o) {
      const { value: t = {} } = o, { zIndex: r, enabled: n } = t;
      e[dt] = {
        enabled: !!n,
        initialized: !1
      }, n && (Xr.ensureZIndex(e, r), e[dt].initialized = !0);
    },
    updated(e, o) {
      const { value: t = {} } = o, { zIndex: r, enabled: n } = t, i = e[dt].enabled;
      n && !i && (Xr.ensureZIndex(e, r), e[dt].initialized = !0), e[dt].enabled = !!n;
    },
    unmounted(e, o) {
      if (!e[dt].initialized)
        return;
      const { value: t = {} } = o, { zIndex: r } = t;
      Xr.unregister(e, r);
    }
  }, ha = Zd, pa = Symbol("@css-render/vue3-ssr");
  function Qd(e, o) {
    return `<style cssr-id="${e}">
${o}
</style>`;
  }
  function eu(e, o) {
    const t = he(pa, null);
    if (t === null) {
      console.error("[css-render/vue3-ssr]: no ssr context found.");
      return;
    }
    const { styles: r, ids: n } = t;
    n.has(e) || r !== null && (n.add(e), r.push(Qd(e, o)));
  }
  const ou = typeof document < "u";
  function Yo() {
    if (ou)
      return;
    const e = he(pa, null);
    if (e !== null)
      return {
        adapter: eu,
        context: e
      };
  }
  function Pi(e, o) {
    console.error(`[vueuc/${e}]: ${o}`);
  }
  const { c: ko } = Ql(), Vn = "vueuc-style";
  function Ti(e) {
    return e & -e;
  }
  class tu {
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
        n[o] += t, o += Ti(o);
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
        i += t[o], o -= Ti(o);
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
  function Ii(e) {
    return typeof e == "string" ? document.querySelector(e) : e();
  }
  const ru = ie({
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
        showTeleport: _d(se(e, "show")),
        mergedTo: E(() => {
          const { to: o } = e;
          return o ?? "body";
        })
      };
    },
    render() {
      return this.showTeleport ? this.disabled ? Sn("lazy-teleport", this.$slots) : y(bc, {
        disabled: this.disabled,
        to: this.mergedTo
      }, Sn("lazy-teleport", this.$slots)) : null;
    }
  }), rr = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, zi = {
    start: "end",
    center: "center",
    end: "start"
  }, Yr = {
    top: "height",
    bottom: "height",
    left: "width",
    right: "width"
  }, nu = {
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
  }, iu = {
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
  }, lu = {
    "bottom-start": "right",
    "bottom-end": "left",
    "top-start": "right",
    "top-end": "left",
    "right-start": "bottom",
    "right-end": "top",
    "left-start": "bottom",
    "left-end": "top"
  }, Mi = {
    top: !0,
    bottom: !1,
    left: !0,
    right: !1
    // left--
  }, ki = {
    top: "end",
    bottom: "start",
    left: "end",
    right: "start"
  };
  function au(e, o, t, r, n, i) {
    if (!n || i)
      return { placement: e, top: 0, left: 0 };
    const [l, a] = e.split("-");
    let s = a ?? "center", c = {
      top: 0,
      left: 0
    };
    const u = (p, d, m) => {
      let C = 0, h = 0;
      const S = t[p] - o[d] - o[p];
      return S > 0 && r && (m ? h = Mi[d] ? S : -S : C = Mi[d] ? S : -S), {
        left: C,
        top: h
      };
    }, f = l === "left" || l === "right";
    if (s !== "center") {
      const p = lu[e], d = rr[p], m = Yr[p];
      if (t[m] > o[m]) {
        if (
          // current space is not enough
          // ----------[ target ]---------|
          // -------[     follower        ]
          o[p] + o[m] < t[m]
        ) {
          const C = (t[m] - o[m]) / 2;
          o[p] < C || o[d] < C ? o[p] < o[d] ? (s = zi[a], c = u(m, d, f)) : c = u(m, p, f) : s = "center";
        }
      } else
        t[m] < o[m] && o[d] < 0 && // opposite align has larger space
        // ------------[   target   ]
        // ----------------[follower]
        o[p] > o[d] && (s = zi[a]);
    } else {
      const p = l === "bottom" || l === "top" ? "left" : "top", d = rr[p], m = Yr[p], C = (t[m] - o[m]) / 2;
      // center is not enough
      // ----------- [ target ]--|
      // -------[     follower     ]
      (o[p] < C || o[d] < C) && (o[p] > o[d] ? (s = ki[p], c = u(m, p, f)) : (s = ki[d], c = u(m, d, f)));
    }
    let v = l;
    return (
      // space is not enough
      o[l] < t[Yr[l]] && // opposite position's space is larger
      o[l] < o[rr[l]] && (v = rr[l]), {
        placement: s !== "center" ? `${v}-${s}` : v,
        left: c.left,
        top: c.top
      }
    );
  }
  function su(e, o) {
    return o ? iu[e] : nu[e];
  }
  function cu(e, o, t, r, n, i) {
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
  const du = ko([
    ko(".v-binder-follower-container", {
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      height: "0",
      pointerEvents: "none",
      zIndex: "auto"
    }),
    ko(".v-binder-follower-content", {
      position: "absolute",
      zIndex: "auto"
    }, [
      ko("> *", {
        pointerEvents: "all"
      })
    ])
  ]), va = ie({
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
      const o = he("VBinder"), t = Ze(() => e.enabled !== void 0 ? e.enabled : e.show), r = F(null), n = F(null), i = () => {
        const { syncTrigger: v } = e;
        v.includes("scroll") && o.addScrollListener(s), v.includes("resize") && o.addResizeListener(s);
      }, l = () => {
        o.removeScrollListener(s), o.removeResizeListener(s);
      };
      Ve(() => {
        t.value && (s(), i());
      });
      const a = Yo();
      du.mount({
        id: "vueuc/binder",
        head: !0,
        anchorMetaName: Vn,
        ssr: a
      }), Qe(() => {
        l();
      }), Bd(() => {
        t.value && s();
      });
      const s = () => {
        if (!t.value)
          return;
        const v = r.value;
        if (v === null)
          return;
        const p = o.targetRef, { x: d, y: m, overlap: C } = e, h = d !== void 0 && m !== void 0 ? Vd(d, m) : Kr(p);
        v.style.setProperty("--v-target-width", `${Math.round(h.width)}px`), v.style.setProperty("--v-target-height", `${Math.round(h.height)}px`);
        const { width: S, minWidth: D, placement: T, internalShift: z, flip: O } = e;
        v.setAttribute("v-placement", T), C ? v.setAttribute("v-overlap", "") : v.removeAttribute("v-overlap");
        const { style: b } = v;
        S === "target" ? b.width = `${h.width}px` : S !== void 0 ? b.width = S : b.width = "", D === "target" ? b.minWidth = `${h.width}px` : D !== void 0 ? b.minWidth = D : b.minWidth = "";
        const $ = Kr(v), w = Kr(n.value), { left: x, top: P, placement: M } = au(T, h, $, z, O, C), W = su(M, C), { left: H, top: N, transform: G } = cu(M, w, h, P, x, C);
        v.setAttribute("v-placement", M), v.style.setProperty("--v-offset-left", `${Math.round(x)}px`), v.style.setProperty("--v-offset-top", `${Math.round(P)}px`), v.style.transform = `translateX(${H}) translateY(${N}) ${G}`, v.style.setProperty("--v-transform-origin", W), v.style.transformOrigin = W;
      };
      ye(t, (v) => {
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
        ye(se(e, v), s);
      }), ["teleportDisabled"].forEach((v) => {
        ye(se(e, v), c);
      }), ye(se(e, "syncTrigger"), (v) => {
        v.includes("resize") ? o.addResizeListener(s) : o.removeResizeListener(s), v.includes("scroll") ? o.addScrollListener(s) : o.removeScrollListener(s);
      });
      const u = Dr(), f = Ze(() => {
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
      return y(ru, {
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
          return this.zindexable ? Xt(t, [
            [
              ha,
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
  var Uo = [], uu = function() {
    return Uo.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, fu = function() {
    return Uo.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, Oi = "ResizeObserver loop completed with undelivered notifications.", hu = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
      message: Oi
    }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Oi), window.dispatchEvent(e);
  }, Vt;
  (function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
  })(Vt || (Vt = {}));
  var Go = function(e) {
    return Object.freeze(e);
  }, pu = function() {
    function e(o, t) {
      this.inlineSize = o, this.blockSize = t, Go(this);
    }
    return e;
  }(), ga = function() {
    function e(o, t, r, n) {
      return this.x = o, this.y = t, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Go(this);
    }
    return e.prototype.toJSON = function() {
      var o = this, t = o.x, r = o.y, n = o.top, i = o.right, l = o.bottom, a = o.left, s = o.width, c = o.height;
      return { x: t, y: r, top: n, right: i, bottom: l, left: a, width: s, height: c };
    }, e.fromRect = function(o) {
      return new e(o.x, o.y, o.width, o.height);
    }, e;
  }(), Un = function(e) {
    return e instanceof SVGElement && "getBBox" in e;
  }, ma = function(e) {
    if (Un(e)) {
      var o = e.getBBox(), t = o.width, r = o.height;
      return !t && !r;
    }
    var n = e, i = n.offsetWidth, l = n.offsetHeight;
    return !(i || l || e.getClientRects().length);
  }, Ei = function(e) {
    var o;
    if (e instanceof Element)
      return !0;
    var t = (o = e == null ? void 0 : e.ownerDocument) === null || o === void 0 ? void 0 : o.defaultView;
    return !!(t && e instanceof t.Element);
  }, vu = function(e) {
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
  }, Ft = typeof window < "u" ? window : {}, nr = /* @__PURE__ */ new WeakMap(), _i = /auto|scroll/, gu = /^tb|vertical/, mu = /msie|trident/i.test(Ft.navigator && Ft.navigator.userAgent), oo = function(e) {
    return parseFloat(e || "0");
  }, mt = function(e, o, t) {
    return e === void 0 && (e = 0), o === void 0 && (o = 0), t === void 0 && (t = !1), new pu((t ? o : e) || 0, (t ? e : o) || 0);
  }, Di = Go({
    devicePixelContentBoxSize: mt(),
    borderBoxSize: mt(),
    contentBoxSize: mt(),
    contentRect: new ga(0, 0, 0, 0)
  }), ba = function(e, o) {
    if (o === void 0 && (o = !1), nr.has(e) && !o)
      return nr.get(e);
    if (ma(e))
      return nr.set(e, Di), Di;
    var t = getComputedStyle(e), r = Un(e) && e.ownerSVGElement && e.getBBox(), n = !mu && t.boxSizing === "border-box", i = gu.test(t.writingMode || ""), l = !r && _i.test(t.overflowY || ""), a = !r && _i.test(t.overflowX || ""), s = r ? 0 : oo(t.paddingTop), c = r ? 0 : oo(t.paddingRight), u = r ? 0 : oo(t.paddingBottom), f = r ? 0 : oo(t.paddingLeft), v = r ? 0 : oo(t.borderTopWidth), p = r ? 0 : oo(t.borderRightWidth), d = r ? 0 : oo(t.borderBottomWidth), m = r ? 0 : oo(t.borderLeftWidth), C = f + c, h = s + u, S = m + p, D = v + d, T = a ? e.offsetHeight - D - e.clientHeight : 0, z = l ? e.offsetWidth - S - e.clientWidth : 0, O = n ? C + S : 0, b = n ? h + D : 0, $ = r ? r.width : oo(t.width) - O - z, w = r ? r.height : oo(t.height) - b - T, x = $ + C + z + S, P = w + h + T + D, M = Go({
      devicePixelContentBoxSize: mt(Math.round($ * devicePixelRatio), Math.round(w * devicePixelRatio), i),
      borderBoxSize: mt(x, P, i),
      contentBoxSize: mt($, w, i),
      contentRect: new ga(f, s, $, w)
    });
    return nr.set(e, M), M;
  }, Ca = function(e, o, t) {
    var r = ba(e, t), n = r.borderBoxSize, i = r.contentBoxSize, l = r.devicePixelContentBoxSize;
    switch (o) {
      case Vt.DEVICE_PIXEL_CONTENT_BOX:
        return l;
      case Vt.BORDER_BOX:
        return n;
      default:
        return i;
    }
  }, bu = function() {
    function e(o) {
      var t = ba(o);
      this.target = o, this.contentRect = t.contentRect, this.borderBoxSize = Go([t.borderBoxSize]), this.contentBoxSize = Go([t.contentBoxSize]), this.devicePixelContentBoxSize = Go([t.devicePixelContentBoxSize]);
    }
    return e;
  }(), xa = function(e) {
    if (ma(e))
      return 1 / 0;
    for (var o = 0, t = e.parentNode; t; )
      o += 1, t = t.parentNode;
    return o;
  }, Cu = function() {
    var e = 1 / 0, o = [];
    Uo.forEach(function(l) {
      if (l.activeTargets.length !== 0) {
        var a = [];
        l.activeTargets.forEach(function(c) {
          var u = new bu(c.target), f = xa(c.target);
          a.push(u), c.lastReportedSize = Ca(c.target, c.observedBox), f < e && (e = f);
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
  }, Hi = function(e) {
    Uo.forEach(function(t) {
      t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(n) {
        n.isActive() && (xa(n.target) > e ? t.activeTargets.push(n) : t.skippedTargets.push(n));
      });
    });
  }, xu = function() {
    var e = 0;
    for (Hi(e); uu(); )
      e = Cu(), Hi(e);
    return fu() && hu(), e > 0;
  }, qr, ya = [], yu = function() {
    return ya.splice(0).forEach(function(e) {
      return e();
    });
  }, Su = function(e) {
    if (!qr) {
      var o = 0, t = document.createTextNode(""), r = { characterData: !0 };
      new MutationObserver(function() {
        return yu();
      }).observe(t, r), qr = function() {
        t.textContent = "".concat(o ? o-- : o++);
      };
    }
    ya.push(e), qr();
  }, wu = function(e) {
    Su(function() {
      requestAnimationFrame(e);
    });
  }, pr = 0, $u = function() {
    return !!pr;
  }, Pu = 250, Tu = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Bi = [
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
  ], Ai = function(e) {
    return e === void 0 && (e = 0), Date.now() + e;
  }, Jr = !1, Iu = function() {
    function e() {
      var o = this;
      this.stopped = !0, this.listener = function() {
        return o.schedule();
      };
    }
    return e.prototype.run = function(o) {
      var t = this;
      if (o === void 0 && (o = Pu), !Jr) {
        Jr = !0;
        var r = Ai(o);
        wu(function() {
          var n = !1;
          try {
            n = xu();
          } finally {
            if (Jr = !1, o = r - Ai(), !$u())
              return;
            n ? t.run(1e3) : o > 0 ? t.run(o) : t.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var o = this, t = function() {
        return o.observer && o.observer.observe(document.body, Tu);
      };
      document.body ? t() : Ft.addEventListener("DOMContentLoaded", t);
    }, e.prototype.start = function() {
      var o = this;
      this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Bi.forEach(function(t) {
        return Ft.addEventListener(t, o.listener, !0);
      }));
    }, e.prototype.stop = function() {
      var o = this;
      this.stopped || (this.observer && this.observer.disconnect(), Bi.forEach(function(t) {
        return Ft.removeEventListener(t, o.listener, !0);
      }), this.stopped = !0);
    }, e;
  }(), $n = new Iu(), Ri = function(e) {
    !pr && e > 0 && $n.start(), pr += e, !pr && $n.stop();
  }, zu = function(e) {
    return !Un(e) && !vu(e) && getComputedStyle(e).display === "inline";
  }, Mu = function() {
    function e(o, t) {
      this.target = o, this.observedBox = t || Vt.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var o = Ca(this.target, this.observedBox, !0);
      return zu(this.target) && (this.lastReportedSize = o), this.lastReportedSize.inlineSize !== o.inlineSize || this.lastReportedSize.blockSize !== o.blockSize;
    }, e;
  }(), ku = function() {
    function e(o, t) {
      this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = o, this.callback = t;
    }
    return e;
  }(), ir = /* @__PURE__ */ new WeakMap(), Fi = function(e, o) {
    for (var t = 0; t < e.length; t += 1)
      if (e[t].target === o)
        return t;
    return -1;
  }, lr = function() {
    function e() {
    }
    return e.connect = function(o, t) {
      var r = new ku(o, t);
      ir.set(o, r);
    }, e.observe = function(o, t, r) {
      var n = ir.get(o), i = n.observationTargets.length === 0;
      Fi(n.observationTargets, t) < 0 && (i && Uo.push(n), n.observationTargets.push(new Mu(t, r && r.box)), Ri(1), $n.schedule());
    }, e.unobserve = function(o, t) {
      var r = ir.get(o), n = Fi(r.observationTargets, t), i = r.observationTargets.length === 1;
      n >= 0 && (i && Uo.splice(Uo.indexOf(r), 1), r.observationTargets.splice(n, 1), Ri(-1));
    }, e.disconnect = function(o) {
      var t = this, r = ir.get(o);
      r.observationTargets.slice().forEach(function(n) {
        return t.unobserve(o, n.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  }(), Ou = function() {
    function e(o) {
      if (arguments.length === 0)
        throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
      if (typeof o != "function")
        throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
      lr.connect(this, o);
    }
    return e.prototype.observe = function(o, t) {
      if (arguments.length === 0)
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!Ei(o))
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      lr.observe(this, o, t);
    }, e.prototype.unobserve = function(o) {
      if (arguments.length === 0)
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!Ei(o))
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      lr.unobserve(this, o);
    }, e.prototype.disconnect = function() {
      lr.disconnect(this);
    }, e.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    }, e;
  }();
  class Eu {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Ou)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
  const xr = new Eu(), yr = ie({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(e) {
      let o = !1;
      const t = Bn().proxy;
      function r(n) {
        const { onResize: i } = e;
        i !== void 0 && i(n);
      }
      Ve(() => {
        const n = t.$el;
        if (n === void 0) {
          Pi("resize-observer", "$el does not exist.");
          return;
        }
        if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
          Pi("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
        n.nextElementSibling !== null && (xr.registerHandler(n.nextElementSibling, r), o = !0);
      }), Qe(() => {
        o && xr.unregisterHandler(t.$el.nextElementSibling);
      });
    },
    render() {
      return zl(this.$slots, "default");
    }
  });
  let ar;
  function _u() {
    return ar === void 0 && ("matchMedia" in window ? ar = window.matchMedia("(pointer:coarse)").matches : ar = !1), ar;
  }
  let Zr;
  function Li() {
    return Zr === void 0 && (Zr = "chrome" in window ? window.devicePixelRatio : 1), Zr;
  }
  const Du = ko(".v-vl", {
    maxHeight: "inherit",
    height: "100%",
    overflow: "auto",
    minWidth: "1px"
    // a zero width container won't be scrollable
  }, [
    ko("&:not(.v-vl--show-scrollbar)", {
      scrollbarWidth: "none"
    }, [
      ko("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
        width: 0,
        height: 0,
        display: "none"
      })
    ])
  ]), Hu = ie({
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
      const o = Yo();
      Du.mount({
        id: "vueuc/virtual-list",
        head: !0,
        anchorMetaName: Vn,
        ssr: o
      }), Ve(() => {
        const { defaultScrollIndex: P, defaultScrollKey: M } = e;
        P != null ? d({ index: P }) : M != null && d({ key: M });
      });
      let t = !1, r = !1;
      Ml(() => {
        if (t = !1, !r) {
          r = !0;
          return;
        }
        d({ top: f.value, left: u });
      }), kl(() => {
        t = !0, r || (r = !0);
      });
      const n = E(() => {
        const P = /* @__PURE__ */ new Map(), { keyField: M } = e;
        return e.items.forEach((W, H) => {
          P.set(W[M], H);
        }), P;
      }), i = F(null), l = F(void 0), a = /* @__PURE__ */ new Map(), s = E(() => {
        const { items: P, itemSize: M, keyField: W } = e, H = new tu(P.length, M);
        return P.forEach((N, G) => {
          const V = N[W], oe = a.get(V);
          oe !== void 0 && H.add(G, oe);
        }), H;
      }), c = F(0);
      let u = 0;
      const f = F(0), v = Ze(() => Math.max(s.value.getBound(f.value - gn(e.paddingTop)) - 1, 0)), p = E(() => {
        const { value: P } = l;
        if (P === void 0)
          return [];
        const { items: M, itemSize: W } = e, H = v.value, N = Math.min(H + Math.ceil(P / W + 1), M.length - 1), G = [];
        for (let V = H; V <= N; ++V)
          G.push(M[V]);
        return G;
      }), d = (P, M) => {
        if (typeof P == "number") {
          S(P, M, "auto");
          return;
        }
        const { left: W, top: H, index: N, key: G, position: V, behavior: oe, debounce: k = !0 } = P;
        if (W !== void 0 || H !== void 0)
          S(W, H, oe);
        else if (N !== void 0)
          h(N, oe, k);
        else if (G !== void 0) {
          const L = n.value.get(G);
          L !== void 0 && h(L, oe, k);
        } else
          V === "bottom" ? S(0, Number.MAX_SAFE_INTEGER, oe) : V === "top" && S(0, 0, oe);
      };
      let m, C = null;
      function h(P, M, W) {
        const { value: H } = s, N = H.sum(P) + gn(e.paddingTop);
        if (!W)
          i.value.scrollTo({
            left: 0,
            top: N,
            behavior: M
          });
        else {
          m = P, C !== null && window.clearTimeout(C), C = window.setTimeout(() => {
            m = void 0, C = null;
          }, 16);
          const { scrollTop: G, offsetHeight: V } = i.value;
          if (N > G) {
            const oe = H.get(P);
            N + oe <= G + V || i.value.scrollTo({
              left: 0,
              top: N + oe - V,
              behavior: M
            });
          } else
            i.value.scrollTo({
              left: 0,
              top: N,
              behavior: M
            });
        }
      }
      function S(P, M, W) {
        i.value.scrollTo({
          left: P,
          top: M,
          behavior: W
        });
      }
      function D(P, M) {
        var W, H, N;
        if (t || e.ignoreItemResize || x(M.target))
          return;
        const { value: G } = s, V = n.value.get(P), oe = G.get(V), k = (N = (H = (W = M.borderBoxSize) === null || W === void 0 ? void 0 : W[0]) === null || H === void 0 ? void 0 : H.blockSize) !== null && N !== void 0 ? N : M.contentRect.height;
        if (k === oe)
          return;
        k - e.itemSize === 0 ? a.delete(P) : a.set(P, k - e.itemSize);
        const re = k - oe;
        if (re === 0)
          return;
        G.add(V, re);
        const ue = i.value;
        if (ue != null) {
          if (m === void 0) {
            const ze = G.sum(V);
            ue.scrollTop > ze && ue.scrollBy(0, re);
          } else if (V < m)
            ue.scrollBy(0, re);
          else if (V === m) {
            const ze = G.sum(V);
            k + ze > // Note, listEl shouldn't have border, nor offsetHeight won't be
            // correct
            ue.scrollTop + ue.offsetHeight && ue.scrollBy(0, re);
          }
          w();
        }
        c.value++;
      }
      const T = !_u();
      let z = !1;
      function O(P) {
        var M;
        (M = e.onScroll) === null || M === void 0 || M.call(e, P), (!T || !z) && w();
      }
      function b(P) {
        var M;
        if ((M = e.onWheel) === null || M === void 0 || M.call(e, P), T) {
          const W = i.value;
          if (W != null) {
            if (P.deltaX === 0 && (W.scrollTop === 0 && P.deltaY <= 0 || W.scrollTop + W.offsetHeight >= W.scrollHeight && P.deltaY >= 0))
              return;
            P.preventDefault(), W.scrollTop += P.deltaY / Li(), W.scrollLeft += P.deltaX / Li(), w(), z = !0, Kl(() => {
              z = !1;
            });
          }
        }
      }
      function $(P) {
        if (t || x(P.target) || P.contentRect.height === l.value)
          return;
        l.value = P.contentRect.height;
        const { onResize: M } = e;
        M !== void 0 && M(P);
      }
      function w() {
        const { value: P } = i;
        P != null && (f.value = P.scrollTop, u = P.scrollLeft);
      }
      function x(P) {
        let M = P;
        for (; M !== null; ) {
          if (M.style.display === "none")
            return !0;
          M = M.parentElement;
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
          const { itemResizable: P } = e, M = er(s.value.sum());
          return c.value, [
            e.itemsStyle,
            {
              boxSizing: "content-box",
              height: P ? "" : M,
              minHeight: P ? M : "",
              paddingTop: er(e.paddingTop),
              paddingBottom: er(e.paddingBottom)
            }
          ];
        }),
        visibleItemsStyle: E(() => (c.value, {
          transform: `translateY(${er(s.value.sum(v.value))})`
        })),
        viewportItems: p,
        listElRef: i,
        itemsElRef: F(null),
        scrollTo: d,
        handleListResize: $,
        handleListScroll: O,
        handleListWheel: b,
        handleItemResize: D
      };
    },
    render() {
      const { itemResizable: e, keyField: o, keyToIndex: t, visibleItemsTag: r } = this;
      return y(yr, {
        onResize: this.handleListResize
      }, {
        default: () => {
          var n, i;
          return y("div", kr(this.$attrs, {
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
                  return e ? y(yr, {
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
  }), Ro = "v-hidden", Bu = ko("[v-hidden]", {
    display: "none!important"
  }), Wi = ie({
    name: "Overflow",
    props: {
      getCounter: Function,
      getTail: Function,
      updateCounter: Function,
      onUpdateOverflow: Function
    },
    setup(e, { slots: o }) {
      const t = F(null), r = F(null);
      function n() {
        const { value: l } = t, { getCounter: a, getTail: s } = e;
        let c;
        if (a !== void 0 ? c = a() : c = r.value, !l || !c)
          return;
        c.hasAttribute(Ro) && c.removeAttribute(Ro);
        const { children: u } = l, f = l.offsetWidth, v = [], p = o.tail ? s == null ? void 0 : s() : null;
        let d = p ? p.offsetWidth : 0, m = !1;
        const C = l.children.length - (o.tail ? 1 : 0);
        for (let S = 0; S < C - 1; ++S) {
          if (S < 0)
            continue;
          const D = u[S];
          if (m) {
            D.hasAttribute(Ro) || D.setAttribute(Ro, "");
            continue;
          } else
            D.hasAttribute(Ro) && D.removeAttribute(Ro);
          const T = D.offsetWidth;
          if (d += T, v[S] = T, d > f) {
            const { updateCounter: z } = e;
            for (let O = S; O >= 0; --O) {
              const b = C - 1 - O;
              z !== void 0 ? z(b) : c.textContent = `${b}`;
              const $ = c.offsetWidth;
              if (d -= v[O], d + $ <= f || O === 0) {
                m = !0, S = O - 1, p && (S === -1 ? (p.style.maxWidth = `${f - $}px`, p.style.boxSizing = "border-box") : p.style.maxWidth = "");
                break;
              }
            }
          }
        }
        const { onUpdateOverflow: h } = e;
        m ? h !== void 0 && h(!0) : (h !== void 0 && h(!1), c.setAttribute(Ro, ""));
      }
      const i = Yo();
      return Bu.mount({
        id: "vueuc/overflow",
        head: !0,
        anchorMetaName: Vn,
        ssr: i
      }), Ve(n), {
        selfRef: t,
        counterRef: r,
        sync: n
      };
    },
    render() {
      const { $slots: e } = this;
      return Ct(this.sync), y("div", {
        class: "v-overflow",
        ref: "selfRef"
      }, [
        zl(e, "default"),
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
  function Sa(e) {
    return e instanceof HTMLElement;
  }
  function wa(e) {
    for (let o = 0; o < e.childNodes.length; o++) {
      const t = e.childNodes[o];
      if (Sa(t) && (Pa(t) || wa(t)))
        return !0;
    }
    return !1;
  }
  function $a(e) {
    for (let o = e.childNodes.length - 1; o >= 0; o--) {
      const t = e.childNodes[o];
      if (Sa(t) && (Pa(t) || $a(t)))
        return !0;
    }
    return !1;
  }
  function Pa(e) {
    if (!Au(e))
      return !1;
    try {
      e.focus({ preventScroll: !0 });
    } catch {
    }
    return document.activeElement === e;
  }
  function Au(e) {
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
  const Ru = ie({
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
      const o = nd(), t = F(null), r = F(null);
      let n = !1, i = !1;
      const l = typeof document > "u" ? null : document.activeElement;
      function a() {
        return kt[kt.length - 1] === o;
      }
      function s(C) {
        var h;
        C.code === "Escape" && a() && ((h = e.onEsc) === null || h === void 0 || h.call(e, C));
      }
      Ve(() => {
        ye(() => e.active, (C) => {
          C ? (f(), Ie("keydown", document, s)) : (me("keydown", document, s), n && v());
        }, {
          immediate: !0
        });
      }), Qe(() => {
        me("keydown", document, s), n && v();
      });
      function c(C) {
        if (!i && a()) {
          const h = u();
          if (h === null || h.contains(Nt(C)))
            return;
          p("first");
        }
      }
      function u() {
        const C = t.value;
        if (C === null)
          return null;
        let h = C;
        for (; h = h.nextSibling, !(h === null || h instanceof Element && h.tagName === "DIV"); )
          ;
        return h;
      }
      function f() {
        var C;
        if (!e.disabled) {
          if (kt.push(o), e.autoFocus) {
            const { initialFocusTo: h } = e;
            h === void 0 ? p("first") : (C = Ii(h)) === null || C === void 0 || C.focus({ preventScroll: !0 });
          }
          n = !0, document.addEventListener("focus", c, !0);
        }
      }
      function v() {
        var C;
        if (e.disabled || (document.removeEventListener("focus", c, !0), kt = kt.filter((S) => S !== o), a()))
          return;
        const { finalFocusTo: h } = e;
        h !== void 0 ? (C = Ii(h)) === null || C === void 0 || C.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
      }
      function p(C) {
        if (a() && e.active) {
          const h = t.value, S = r.value;
          if (h !== null && S !== null) {
            const D = u();
            if (D == null || D === S) {
              i = !0, h.focus({ preventScroll: !0 }), i = !1;
              return;
            }
            i = !0;
            const T = C === "first" ? wa(D) : $a(D);
            i = !1, T || (i = !0, h.focus({ preventScroll: !0 }), i = !1);
          }
        }
      }
      function d(C) {
        if (i)
          return;
        const h = u();
        h !== null && (C.relatedTarget !== null && h.contains(C.relatedTarget) ? p("last") : p("first"));
      }
      function m(C) {
        i || (C.relatedTarget !== null && C.relatedTarget === t.value ? p("last") : p("first"));
      }
      return {
        focusableStartRef: t,
        focusableEndRef: r,
        focusableStyle: "position: absolute; height: 0; width: 0;",
        handleStartFocus: d,
        handleEndFocus: m
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
  function Ta(e, o) {
    o && (Ve(() => {
      const { value: t } = e;
      t && xr.registerHandler(t, o);
    }), Qe(() => {
      const { value: t } = e;
      t && xr.unregisterHandler(t);
    }));
  }
  function Fu(e) {
    const o = { isDeactivated: !1 };
    let t = !1;
    return Ml(() => {
      if (o.isDeactivated = !1, !t) {
        t = !0;
        return;
      }
      e();
    }), kl(() => {
      o.isDeactivated = !0, t || (t = !0);
    }), o;
  }
  const Ni = "n-form-item";
  function Lu(e, { defaultSize: o = "medium", mergedSize: t, mergedDisabled: r } = {}) {
    const n = he(Ni, null);
    ro(Ni, null);
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
  var Wu = typeof global == "object" && global && global.Object === Object && global;
  const Ia = Wu;
  var Nu = typeof self == "object" && self && self.Object === Object && self, ju = Ia || Nu || Function("return this")();
  const lo = ju;
  var Vu = lo.Symbol;
  const Oo = Vu;
  var za = Object.prototype, Uu = za.hasOwnProperty, Gu = za.toString, Ot = Oo ? Oo.toStringTag : void 0;
  function Ku(e) {
    var o = Uu.call(e, Ot), t = e[Ot];
    try {
      e[Ot] = void 0;
      var r = !0;
    } catch {
    }
    var n = Gu.call(e);
    return r && (o ? e[Ot] = t : delete e[Ot]), n;
  }
  var Xu = Object.prototype, Yu = Xu.toString;
  function qu(e) {
    return Yu.call(e);
  }
  var Ju = "[object Null]", Zu = "[object Undefined]", ji = Oo ? Oo.toStringTag : void 0;
  function qo(e) {
    return e == null ? e === void 0 ? Zu : Ju : ji && ji in Object(e) ? Ku(e) : qu(e);
  }
  function Eo(e) {
    return e != null && typeof e == "object";
  }
  var Qu = "[object Symbol]";
  function Gn(e) {
    return typeof e == "symbol" || Eo(e) && qo(e) == Qu;
  }
  function Ma(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = Array(r); ++t < r; )
      n[t] = o(e[t], t, e);
    return n;
  }
  var ef = Array.isArray;
  const je = ef;
  var of = 1 / 0, Vi = Oo ? Oo.prototype : void 0, Ui = Vi ? Vi.toString : void 0;
  function ka(e) {
    if (typeof e == "string")
      return e;
    if (je(e))
      return Ma(e, ka) + "";
    if (Gn(e))
      return Ui ? Ui.call(e) : "";
    var o = e + "";
    return o == "0" && 1 / e == -of ? "-0" : o;
  }
  function _o(e) {
    var o = typeof e;
    return e != null && (o == "object" || o == "function");
  }
  function Kn(e) {
    return e;
  }
  var tf = "[object AsyncFunction]", rf = "[object Function]", nf = "[object GeneratorFunction]", lf = "[object Proxy]";
  function Xn(e) {
    if (!_o(e))
      return !1;
    var o = qo(e);
    return o == rf || o == nf || o == tf || o == lf;
  }
  var af = lo["__core-js_shared__"];
  const Qr = af;
  var Gi = function() {
    var e = /[^.]+$/.exec(Qr && Qr.keys && Qr.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
  function sf(e) {
    return !!Gi && Gi in e;
  }
  var cf = Function.prototype, df = cf.toString;
  function Jo(e) {
    if (e != null) {
      try {
        return df.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  var uf = /[\\^$.*+?()[\]{}|]/g, ff = /^\[object .+?Constructor\]$/, hf = Function.prototype, pf = Object.prototype, vf = hf.toString, gf = pf.hasOwnProperty, mf = RegExp(
    "^" + vf.call(gf).replace(uf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function bf(e) {
    if (!_o(e) || sf(e))
      return !1;
    var o = Xn(e) ? mf : ff;
    return o.test(Jo(e));
  }
  function Cf(e, o) {
    return e == null ? void 0 : e[o];
  }
  function Zo(e, o) {
    var t = Cf(e, o);
    return bf(t) ? t : void 0;
  }
  var xf = Zo(lo, "WeakMap");
  const Pn = xf;
  var Ki = Object.create, yf = function() {
    function e() {
    }
    return function(o) {
      if (!_o(o))
        return {};
      if (Ki)
        return Ki(o);
      e.prototype = o;
      var t = new e();
      return e.prototype = void 0, t;
    };
  }();
  const Sf = yf;
  function wf(e, o, t) {
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
  function $f(e, o) {
    var t = -1, r = e.length;
    for (o || (o = Array(r)); ++t < r; )
      o[t] = e[t];
    return o;
  }
  var Pf = 800, Tf = 16, If = Date.now;
  function zf(e) {
    var o = 0, t = 0;
    return function() {
      var r = If(), n = Tf - (r - t);
      if (t = r, n > 0) {
        if (++o >= Pf)
          return arguments[0];
      } else
        o = 0;
      return e.apply(void 0, arguments);
    };
  }
  function Mf(e) {
    return function() {
      return e;
    };
  }
  var kf = function() {
    try {
      var e = Zo(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }();
  const Sr = kf;
  var Of = Sr ? function(e, o) {
    return Sr(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Mf(o),
      writable: !0
    });
  } : Kn;
  const Ef = Of;
  var _f = zf(Ef);
  const Df = _f;
  var Hf = 9007199254740991, Bf = /^(?:0|[1-9]\d*)$/;
  function Yn(e, o) {
    var t = typeof e;
    return o = o ?? Hf, !!o && (t == "number" || t != "symbol" && Bf.test(e)) && e > -1 && e % 1 == 0 && e < o;
  }
  function qn(e, o, t) {
    o == "__proto__" && Sr ? Sr(e, o, {
      configurable: !0,
      enumerable: !0,
      value: t,
      writable: !0
    }) : e[o] = t;
  }
  function Yt(e, o) {
    return e === o || e !== e && o !== o;
  }
  var Af = Object.prototype, Rf = Af.hasOwnProperty;
  function Ff(e, o, t) {
    var r = e[o];
    (!(Rf.call(e, o) && Yt(r, t)) || t === void 0 && !(o in e)) && qn(e, o, t);
  }
  function Lf(e, o, t, r) {
    var n = !t;
    t || (t = {});
    for (var i = -1, l = o.length; ++i < l; ) {
      var a = o[i], s = r ? r(t[a], e[a], a, t, e) : void 0;
      s === void 0 && (s = e[a]), n ? qn(t, a, s) : Ff(t, a, s);
    }
    return t;
  }
  var Xi = Math.max;
  function Wf(e, o, t) {
    return o = Xi(o === void 0 ? e.length - 1 : o, 0), function() {
      for (var r = arguments, n = -1, i = Xi(r.length - o, 0), l = Array(i); ++n < i; )
        l[n] = r[o + n];
      n = -1;
      for (var a = Array(o + 1); ++n < o; )
        a[n] = r[n];
      return a[o] = t(l), wf(e, this, a);
    };
  }
  function Nf(e, o) {
    return Df(Wf(e, o, Kn), e + "");
  }
  var jf = 9007199254740991;
  function Jn(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= jf;
  }
  function $t(e) {
    return e != null && Jn(e.length) && !Xn(e);
  }
  function Vf(e, o, t) {
    if (!_o(t))
      return !1;
    var r = typeof o;
    return (r == "number" ? $t(t) && Yn(o, t.length) : r == "string" && o in t) ? Yt(t[o], e) : !1;
  }
  function Uf(e) {
    return Nf(function(o, t) {
      var r = -1, n = t.length, i = n > 1 ? t[n - 1] : void 0, l = n > 2 ? t[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, l && Vf(t[0], t[1], l) && (i = n < 3 ? void 0 : i, n = 1), o = Object(o); ++r < n; ) {
        var a = t[r];
        a && e(o, a, r, i);
      }
      return o;
    });
  }
  var Gf = Object.prototype;
  function Zn(e) {
    var o = e && e.constructor, t = typeof o == "function" && o.prototype || Gf;
    return e === t;
  }
  function Kf(e, o) {
    for (var t = -1, r = Array(e); ++t < e; )
      r[t] = o(t);
    return r;
  }
  var Xf = "[object Arguments]";
  function Yi(e) {
    return Eo(e) && qo(e) == Xf;
  }
  var Oa = Object.prototype, Yf = Oa.hasOwnProperty, qf = Oa.propertyIsEnumerable, Jf = Yi(function() {
    return arguments;
  }()) ? Yi : function(e) {
    return Eo(e) && Yf.call(e, "callee") && !qf.call(e, "callee");
  };
  const wr = Jf;
  function Zf() {
    return !1;
  }
  var Ea = typeof He == "object" && He && !He.nodeType && He, qi = Ea && typeof Be == "object" && Be && !Be.nodeType && Be, Qf = qi && qi.exports === Ea, Ji = Qf ? lo.Buffer : void 0, eh = Ji ? Ji.isBuffer : void 0, oh = eh || Zf;
  const $r = oh;
  var th = "[object Arguments]", rh = "[object Array]", nh = "[object Boolean]", ih = "[object Date]", lh = "[object Error]", ah = "[object Function]", sh = "[object Map]", ch = "[object Number]", dh = "[object Object]", uh = "[object RegExp]", fh = "[object Set]", hh = "[object String]", ph = "[object WeakMap]", vh = "[object ArrayBuffer]", gh = "[object DataView]", mh = "[object Float32Array]", bh = "[object Float64Array]", Ch = "[object Int8Array]", xh = "[object Int16Array]", yh = "[object Int32Array]", Sh = "[object Uint8Array]", wh = "[object Uint8ClampedArray]", $h = "[object Uint16Array]", Ph = "[object Uint32Array]", de = {};
  de[mh] = de[bh] = de[Ch] = de[xh] = de[yh] = de[Sh] = de[wh] = de[$h] = de[Ph] = !0;
  de[th] = de[rh] = de[vh] = de[nh] = de[gh] = de[ih] = de[lh] = de[ah] = de[sh] = de[ch] = de[dh] = de[uh] = de[fh] = de[hh] = de[ph] = !1;
  function Th(e) {
    return Eo(e) && Jn(e.length) && !!de[qo(e)];
  }
  function Ih(e) {
    return function(o) {
      return e(o);
    };
  }
  var _a = typeof He == "object" && He && !He.nodeType && He, Lt = _a && typeof Be == "object" && Be && !Be.nodeType && Be, zh = Lt && Lt.exports === _a, en = zh && Ia.process, Mh = function() {
    try {
      var e = Lt && Lt.require && Lt.require("util").types;
      return e || en && en.binding && en.binding("util");
    } catch {
    }
  }();
  const Zi = Mh;
  var Qi = Zi && Zi.isTypedArray, kh = Qi ? Ih(Qi) : Th;
  const Qn = kh;
  var Oh = Object.prototype, Eh = Oh.hasOwnProperty;
  function Da(e, o) {
    var t = je(e), r = !t && wr(e), n = !t && !r && $r(e), i = !t && !r && !n && Qn(e), l = t || r || n || i, a = l ? Kf(e.length, String) : [], s = a.length;
    for (var c in e)
      (o || Eh.call(e, c)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
      (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      n && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
      Yn(c, s))) && a.push(c);
    return a;
  }
  function Ha(e, o) {
    return function(t) {
      return e(o(t));
    };
  }
  var _h = Ha(Object.keys, Object);
  const Dh = _h;
  var Hh = Object.prototype, Bh = Hh.hasOwnProperty;
  function Ah(e) {
    if (!Zn(e))
      return Dh(e);
    var o = [];
    for (var t in Object(e))
      Bh.call(e, t) && t != "constructor" && o.push(t);
    return o;
  }
  function ei(e) {
    return $t(e) ? Da(e) : Ah(e);
  }
  function Rh(e) {
    var o = [];
    if (e != null)
      for (var t in Object(e))
        o.push(t);
    return o;
  }
  var Fh = Object.prototype, Lh = Fh.hasOwnProperty;
  function Wh(e) {
    if (!_o(e))
      return Rh(e);
    var o = Zn(e), t = [];
    for (var r in e)
      r == "constructor" && (o || !Lh.call(e, r)) || t.push(r);
    return t;
  }
  function Ba(e) {
    return $t(e) ? Da(e, !0) : Wh(e);
  }
  var Nh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, jh = /^\w*$/;
  function oi(e, o) {
    if (je(e))
      return !1;
    var t = typeof e;
    return t == "number" || t == "symbol" || t == "boolean" || e == null || Gn(e) ? !0 : jh.test(e) || !Nh.test(e) || o != null && e in Object(o);
  }
  var Vh = Zo(Object, "create");
  const Ut = Vh;
  function Uh() {
    this.__data__ = Ut ? Ut(null) : {}, this.size = 0;
  }
  function Gh(e) {
    var o = this.has(e) && delete this.__data__[e];
    return this.size -= o ? 1 : 0, o;
  }
  var Kh = "__lodash_hash_undefined__", Xh = Object.prototype, Yh = Xh.hasOwnProperty;
  function qh(e) {
    var o = this.__data__;
    if (Ut) {
      var t = o[e];
      return t === Kh ? void 0 : t;
    }
    return Yh.call(o, e) ? o[e] : void 0;
  }
  var Jh = Object.prototype, Zh = Jh.hasOwnProperty;
  function Qh(e) {
    var o = this.__data__;
    return Ut ? o[e] !== void 0 : Zh.call(o, e);
  }
  var ep = "__lodash_hash_undefined__";
  function op(e, o) {
    var t = this.__data__;
    return this.size += this.has(e) ? 0 : 1, t[e] = Ut && o === void 0 ? ep : o, this;
  }
  function Xo(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  Xo.prototype.clear = Uh;
  Xo.prototype.delete = Gh;
  Xo.prototype.get = qh;
  Xo.prototype.has = Qh;
  Xo.prototype.set = op;
  function tp() {
    this.__data__ = [], this.size = 0;
  }
  function Hr(e, o) {
    for (var t = e.length; t--; )
      if (Yt(e[t][0], o))
        return t;
    return -1;
  }
  var rp = Array.prototype, np = rp.splice;
  function ip(e) {
    var o = this.__data__, t = Hr(o, e);
    if (t < 0)
      return !1;
    var r = o.length - 1;
    return t == r ? o.pop() : np.call(o, t, 1), --this.size, !0;
  }
  function lp(e) {
    var o = this.__data__, t = Hr(o, e);
    return t < 0 ? void 0 : o[t][1];
  }
  function ap(e) {
    return Hr(this.__data__, e) > -1;
  }
  function sp(e, o) {
    var t = this.__data__, r = Hr(t, e);
    return r < 0 ? (++this.size, t.push([e, o])) : t[r][1] = o, this;
  }
  function xo(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  xo.prototype.clear = tp;
  xo.prototype.delete = ip;
  xo.prototype.get = lp;
  xo.prototype.has = ap;
  xo.prototype.set = sp;
  var cp = Zo(lo, "Map");
  const Gt = cp;
  function dp() {
    this.size = 0, this.__data__ = {
      hash: new Xo(),
      map: new (Gt || xo)(),
      string: new Xo()
    };
  }
  function up(e) {
    var o = typeof e;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? e !== "__proto__" : e === null;
  }
  function Br(e, o) {
    var t = e.__data__;
    return up(o) ? t[typeof o == "string" ? "string" : "hash"] : t.map;
  }
  function fp(e) {
    var o = Br(this, e).delete(e);
    return this.size -= o ? 1 : 0, o;
  }
  function hp(e) {
    return Br(this, e).get(e);
  }
  function pp(e) {
    return Br(this, e).has(e);
  }
  function vp(e, o) {
    var t = Br(this, e), r = t.size;
    return t.set(e, o), this.size += t.size == r ? 0 : 1, this;
  }
  function yo(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  yo.prototype.clear = dp;
  yo.prototype.delete = fp;
  yo.prototype.get = hp;
  yo.prototype.has = pp;
  yo.prototype.set = vp;
  var gp = "Expected a function";
  function ti(e, o) {
    if (typeof e != "function" || o != null && typeof o != "function")
      throw new TypeError(gp);
    var t = function() {
      var r = arguments, n = o ? o.apply(this, r) : r[0], i = t.cache;
      if (i.has(n))
        return i.get(n);
      var l = e.apply(this, r);
      return t.cache = i.set(n, l) || i, l;
    };
    return t.cache = new (ti.Cache || yo)(), t;
  }
  ti.Cache = yo;
  var mp = 500;
  function bp(e) {
    var o = ti(e, function(r) {
      return t.size === mp && t.clear(), r;
    }), t = o.cache;
    return o;
  }
  var Cp = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xp = /\\(\\)?/g, yp = bp(function(e) {
    var o = [];
    return e.charCodeAt(0) === 46 && o.push(""), e.replace(Cp, function(t, r, n, i) {
      o.push(n ? i.replace(xp, "$1") : r || t);
    }), o;
  });
  const Sp = yp;
  function Aa(e) {
    return e == null ? "" : ka(e);
  }
  function Ra(e, o) {
    return je(e) ? e : oi(e, o) ? [e] : Sp(Aa(e));
  }
  var wp = 1 / 0;
  function Ar(e) {
    if (typeof e == "string" || Gn(e))
      return e;
    var o = e + "";
    return o == "0" && 1 / e == -wp ? "-0" : o;
  }
  function Fa(e, o) {
    o = Ra(o, e);
    for (var t = 0, r = o.length; e != null && t < r; )
      e = e[Ar(o[t++])];
    return t && t == r ? e : void 0;
  }
  function $p(e, o, t) {
    var r = e == null ? void 0 : Fa(e, o);
    return r === void 0 ? t : r;
  }
  function Pp(e, o) {
    for (var t = -1, r = o.length, n = e.length; ++t < r; )
      e[n + t] = o[t];
    return e;
  }
  var Tp = Ha(Object.getPrototypeOf, Object);
  const La = Tp;
  var Ip = "[object Object]", zp = Function.prototype, Mp = Object.prototype, Wa = zp.toString, kp = Mp.hasOwnProperty, Op = Wa.call(Object);
  function Ep(e) {
    if (!Eo(e) || qo(e) != Ip)
      return !1;
    var o = La(e);
    if (o === null)
      return !0;
    var t = kp.call(o, "constructor") && o.constructor;
    return typeof t == "function" && t instanceof t && Wa.call(t) == Op;
  }
  function _p(e, o, t) {
    var r = -1, n = e.length;
    o < 0 && (o = -o > n ? 0 : n + o), t = t > n ? n : t, t < 0 && (t += n), n = o > t ? 0 : t - o >>> 0, o >>>= 0;
    for (var i = Array(n); ++r < n; )
      i[r] = e[r + o];
    return i;
  }
  function Dp(e, o, t) {
    var r = e.length;
    return t = t === void 0 ? r : t, !o && t >= r ? e : _p(e, o, t);
  }
  var Hp = "\\ud800-\\udfff", Bp = "\\u0300-\\u036f", Ap = "\\ufe20-\\ufe2f", Rp = "\\u20d0-\\u20ff", Fp = Bp + Ap + Rp, Lp = "\\ufe0e\\ufe0f", Wp = "\\u200d", Np = RegExp("[" + Wp + Hp + Fp + Lp + "]");
  function Na(e) {
    return Np.test(e);
  }
  function jp(e) {
    return e.split("");
  }
  var ja = "\\ud800-\\udfff", Vp = "\\u0300-\\u036f", Up = "\\ufe20-\\ufe2f", Gp = "\\u20d0-\\u20ff", Kp = Vp + Up + Gp, Xp = "\\ufe0e\\ufe0f", Yp = "[" + ja + "]", Tn = "[" + Kp + "]", In = "\\ud83c[\\udffb-\\udfff]", qp = "(?:" + Tn + "|" + In + ")", Va = "[^" + ja + "]", Ua = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ga = "[\\ud800-\\udbff][\\udc00-\\udfff]", Jp = "\\u200d", Ka = qp + "?", Xa = "[" + Xp + "]?", Zp = "(?:" + Jp + "(?:" + [Va, Ua, Ga].join("|") + ")" + Xa + Ka + ")*", Qp = Xa + Ka + Zp, ev = "(?:" + [Va + Tn + "?", Tn, Ua, Ga, Yp].join("|") + ")", ov = RegExp(In + "(?=" + In + ")|" + ev + Qp, "g");
  function tv(e) {
    return e.match(ov) || [];
  }
  function rv(e) {
    return Na(e) ? tv(e) : jp(e);
  }
  function nv(e) {
    return function(o) {
      o = Aa(o);
      var t = Na(o) ? rv(o) : void 0, r = t ? t[0] : o.charAt(0), n = t ? Dp(t, 1).join("") : o.slice(1);
      return r[e]() + n;
    };
  }
  var iv = nv("toUpperCase");
  const lv = iv;
  function av() {
    this.__data__ = new xo(), this.size = 0;
  }
  function sv(e) {
    var o = this.__data__, t = o.delete(e);
    return this.size = o.size, t;
  }
  function cv(e) {
    return this.__data__.get(e);
  }
  function dv(e) {
    return this.__data__.has(e);
  }
  var uv = 200;
  function fv(e, o) {
    var t = this.__data__;
    if (t instanceof xo) {
      var r = t.__data__;
      if (!Gt || r.length < uv - 1)
        return r.push([e, o]), this.size = ++t.size, this;
      t = this.__data__ = new yo(r);
    }
    return t.set(e, o), this.size = t.size, this;
  }
  function io(e) {
    var o = this.__data__ = new xo(e);
    this.size = o.size;
  }
  io.prototype.clear = av;
  io.prototype.delete = sv;
  io.prototype.get = cv;
  io.prototype.has = dv;
  io.prototype.set = fv;
  var Ya = typeof He == "object" && He && !He.nodeType && He, el = Ya && typeof Be == "object" && Be && !Be.nodeType && Be, hv = el && el.exports === Ya, ol = hv ? lo.Buffer : void 0, tl = ol ? ol.allocUnsafe : void 0;
  function pv(e, o) {
    if (o)
      return e.slice();
    var t = e.length, r = tl ? tl(t) : new e.constructor(t);
    return e.copy(r), r;
  }
  function vv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = 0, i = []; ++t < r; ) {
      var l = e[t];
      o(l, t, e) && (i[n++] = l);
    }
    return i;
  }
  function gv() {
    return [];
  }
  var mv = Object.prototype, bv = mv.propertyIsEnumerable, rl = Object.getOwnPropertySymbols, Cv = rl ? function(e) {
    return e == null ? [] : (e = Object(e), vv(rl(e), function(o) {
      return bv.call(e, o);
    }));
  } : gv;
  const xv = Cv;
  function yv(e, o, t) {
    var r = o(e);
    return je(e) ? r : Pp(r, t(e));
  }
  function nl(e) {
    return yv(e, ei, xv);
  }
  var Sv = Zo(lo, "DataView");
  const zn = Sv;
  var wv = Zo(lo, "Promise");
  const Mn = wv;
  var $v = Zo(lo, "Set");
  const kn = $v;
  var il = "[object Map]", Pv = "[object Object]", ll = "[object Promise]", al = "[object Set]", sl = "[object WeakMap]", cl = "[object DataView]", Tv = Jo(zn), Iv = Jo(Gt), zv = Jo(Mn), Mv = Jo(kn), kv = Jo(Pn), Lo = qo;
  (zn && Lo(new zn(new ArrayBuffer(1))) != cl || Gt && Lo(new Gt()) != il || Mn && Lo(Mn.resolve()) != ll || kn && Lo(new kn()) != al || Pn && Lo(new Pn()) != sl) && (Lo = function(e) {
    var o = qo(e), t = o == Pv ? e.constructor : void 0, r = t ? Jo(t) : "";
    if (r)
      switch (r) {
        case Tv:
          return cl;
        case Iv:
          return il;
        case zv:
          return ll;
        case Mv:
          return al;
        case kv:
          return sl;
      }
    return o;
  });
  const dl = Lo;
  var Ov = lo.Uint8Array;
  const Pr = Ov;
  function Ev(e) {
    var o = new e.constructor(e.byteLength);
    return new Pr(o).set(new Pr(e)), o;
  }
  function _v(e, o) {
    var t = o ? Ev(e.buffer) : e.buffer;
    return new e.constructor(t, e.byteOffset, e.length);
  }
  function Dv(e) {
    return typeof e.constructor == "function" && !Zn(e) ? Sf(La(e)) : {};
  }
  var Hv = "__lodash_hash_undefined__";
  function Bv(e) {
    return this.__data__.set(e, Hv), this;
  }
  function Av(e) {
    return this.__data__.has(e);
  }
  function Tr(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.__data__ = new yo(); ++o < t; )
      this.add(e[o]);
  }
  Tr.prototype.add = Tr.prototype.push = Bv;
  Tr.prototype.has = Av;
  function Rv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length; ++t < r; )
      if (o(e[t], t, e))
        return !0;
    return !1;
  }
  function Fv(e, o) {
    return e.has(o);
  }
  var Lv = 1, Wv = 2;
  function qa(e, o, t, r, n, i) {
    var l = t & Lv, a = e.length, s = o.length;
    if (a != s && !(l && s > a))
      return !1;
    var c = i.get(e), u = i.get(o);
    if (c && u)
      return c == o && u == e;
    var f = -1, v = !0, p = t & Wv ? new Tr() : void 0;
    for (i.set(e, o), i.set(o, e); ++f < a; ) {
      var d = e[f], m = o[f];
      if (r)
        var C = l ? r(m, d, f, o, e, i) : r(d, m, f, e, o, i);
      if (C !== void 0) {
        if (C)
          continue;
        v = !1;
        break;
      }
      if (p) {
        if (!Rv(o, function(h, S) {
          if (!Fv(p, S) && (d === h || n(d, h, t, r, i)))
            return p.push(S);
        })) {
          v = !1;
          break;
        }
      } else if (!(d === m || n(d, m, t, r, i))) {
        v = !1;
        break;
      }
    }
    return i.delete(e), i.delete(o), v;
  }
  function Nv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r, n) {
      t[++o] = [n, r];
    }), t;
  }
  function jv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r) {
      t[++o] = r;
    }), t;
  }
  var Vv = 1, Uv = 2, Gv = "[object Boolean]", Kv = "[object Date]", Xv = "[object Error]", Yv = "[object Map]", qv = "[object Number]", Jv = "[object RegExp]", Zv = "[object Set]", Qv = "[object String]", eg = "[object Symbol]", og = "[object ArrayBuffer]", tg = "[object DataView]", ul = Oo ? Oo.prototype : void 0, on = ul ? ul.valueOf : void 0;
  function rg(e, o, t, r, n, i, l) {
    switch (t) {
      case tg:
        if (e.byteLength != o.byteLength || e.byteOffset != o.byteOffset)
          return !1;
        e = e.buffer, o = o.buffer;
      case og:
        return !(e.byteLength != o.byteLength || !i(new Pr(e), new Pr(o)));
      case Gv:
      case Kv:
      case qv:
        return Yt(+e, +o);
      case Xv:
        return e.name == o.name && e.message == o.message;
      case Jv:
      case Qv:
        return e == o + "";
      case Yv:
        var a = Nv;
      case Zv:
        var s = r & Vv;
        if (a || (a = jv), e.size != o.size && !s)
          return !1;
        var c = l.get(e);
        if (c)
          return c == o;
        r |= Uv, l.set(e, o);
        var u = qa(a(e), a(o), r, n, i, l);
        return l.delete(e), u;
      case eg:
        if (on)
          return on.call(e) == on.call(o);
    }
    return !1;
  }
  var ng = 1, ig = Object.prototype, lg = ig.hasOwnProperty;
  function ag(e, o, t, r, n, i) {
    var l = t & ng, a = nl(e), s = a.length, c = nl(o), u = c.length;
    if (s != u && !l)
      return !1;
    for (var f = s; f--; ) {
      var v = a[f];
      if (!(l ? v in o : lg.call(o, v)))
        return !1;
    }
    var p = i.get(e), d = i.get(o);
    if (p && d)
      return p == o && d == e;
    var m = !0;
    i.set(e, o), i.set(o, e);
    for (var C = l; ++f < s; ) {
      v = a[f];
      var h = e[v], S = o[v];
      if (r)
        var D = l ? r(S, h, v, o, e, i) : r(h, S, v, e, o, i);
      if (!(D === void 0 ? h === S || n(h, S, t, r, i) : D)) {
        m = !1;
        break;
      }
      C || (C = v == "constructor");
    }
    if (m && !C) {
      var T = e.constructor, z = o.constructor;
      T != z && "constructor" in e && "constructor" in o && !(typeof T == "function" && T instanceof T && typeof z == "function" && z instanceof z) && (m = !1);
    }
    return i.delete(e), i.delete(o), m;
  }
  var sg = 1, fl = "[object Arguments]", hl = "[object Array]", sr = "[object Object]", cg = Object.prototype, pl = cg.hasOwnProperty;
  function dg(e, o, t, r, n, i) {
    var l = je(e), a = je(o), s = l ? hl : dl(e), c = a ? hl : dl(o);
    s = s == fl ? sr : s, c = c == fl ? sr : c;
    var u = s == sr, f = c == sr, v = s == c;
    if (v && $r(e)) {
      if (!$r(o))
        return !1;
      l = !0, u = !1;
    }
    if (v && !u)
      return i || (i = new io()), l || Qn(e) ? qa(e, o, t, r, n, i) : rg(e, o, s, t, r, n, i);
    if (!(t & sg)) {
      var p = u && pl.call(e, "__wrapped__"), d = f && pl.call(o, "__wrapped__");
      if (p || d) {
        var m = p ? e.value() : e, C = d ? o.value() : o;
        return i || (i = new io()), n(m, C, t, r, i);
      }
    }
    return v ? (i || (i = new io()), ag(e, o, t, r, n, i)) : !1;
  }
  function ri(e, o, t, r, n) {
    return e === o ? !0 : e == null || o == null || !Eo(e) && !Eo(o) ? e !== e && o !== o : dg(e, o, t, r, ri, n);
  }
  var ug = 1, fg = 2;
  function hg(e, o, t, r) {
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
        if (!(v === void 0 ? ri(u, c, ug | fg, r, f) : v))
          return !1;
      }
    }
    return !0;
  }
  function Ja(e) {
    return e === e && !_o(e);
  }
  function pg(e) {
    for (var o = ei(e), t = o.length; t--; ) {
      var r = o[t], n = e[r];
      o[t] = [r, n, Ja(n)];
    }
    return o;
  }
  function Za(e, o) {
    return function(t) {
      return t == null ? !1 : t[e] === o && (o !== void 0 || e in Object(t));
    };
  }
  function vg(e) {
    var o = pg(e);
    return o.length == 1 && o[0][2] ? Za(o[0][0], o[0][1]) : function(t) {
      return t === e || hg(t, e, o);
    };
  }
  function gg(e, o) {
    return e != null && o in Object(e);
  }
  function mg(e, o, t) {
    o = Ra(o, e);
    for (var r = -1, n = o.length, i = !1; ++r < n; ) {
      var l = Ar(o[r]);
      if (!(i = e != null && t(e, l)))
        break;
      e = e[l];
    }
    return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && Jn(n) && Yn(l, n) && (je(e) || wr(e)));
  }
  function bg(e, o) {
    return e != null && mg(e, o, gg);
  }
  var Cg = 1, xg = 2;
  function yg(e, o) {
    return oi(e) && Ja(o) ? Za(Ar(e), o) : function(t) {
      var r = $p(t, e);
      return r === void 0 && r === o ? bg(t, e) : ri(o, r, Cg | xg);
    };
  }
  function Sg(e) {
    return function(o) {
      return o == null ? void 0 : o[e];
    };
  }
  function wg(e) {
    return function(o) {
      return Fa(o, e);
    };
  }
  function $g(e) {
    return oi(e) ? Sg(Ar(e)) : wg(e);
  }
  function Pg(e) {
    return typeof e == "function" ? e : e == null ? Kn : typeof e == "object" ? je(e) ? yg(e[0], e[1]) : vg(e) : $g(e);
  }
  function Tg(e) {
    return function(o, t, r) {
      for (var n = -1, i = Object(o), l = r(o), a = l.length; a--; ) {
        var s = l[e ? a : ++n];
        if (t(i[s], s, i) === !1)
          break;
      }
      return o;
    };
  }
  var Ig = Tg();
  const Qa = Ig;
  function zg(e, o) {
    return e && Qa(e, o, ei);
  }
  function Mg(e, o) {
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
  var kg = Mg(zg);
  const Og = kg;
  function On(e, o, t) {
    (t !== void 0 && !Yt(e[o], t) || t === void 0 && !(o in e)) && qn(e, o, t);
  }
  function Eg(e) {
    return Eo(e) && $t(e);
  }
  function En(e, o) {
    if (!(o === "constructor" && typeof e[o] == "function") && o != "__proto__")
      return e[o];
  }
  function _g(e) {
    return Lf(e, Ba(e));
  }
  function Dg(e, o, t, r, n, i, l) {
    var a = En(e, t), s = En(o, t), c = l.get(s);
    if (c) {
      On(e, t, c);
      return;
    }
    var u = i ? i(a, s, t + "", e, o, l) : void 0, f = u === void 0;
    if (f) {
      var v = je(s), p = !v && $r(s), d = !v && !p && Qn(s);
      u = s, v || p || d ? je(a) ? u = a : Eg(a) ? u = $f(a) : p ? (f = !1, u = pv(s, !0)) : d ? (f = !1, u = _v(s, !0)) : u = [] : Ep(s) || wr(s) ? (u = a, wr(a) ? u = _g(a) : (!_o(a) || Xn(a)) && (u = Dv(s))) : f = !1;
    }
    f && (l.set(s, u), n(u, s, r, i, l), l.delete(s)), On(e, t, u);
  }
  function es(e, o, t, r, n) {
    e !== o && Qa(o, function(i, l) {
      if (n || (n = new io()), _o(i))
        Dg(e, o, l, t, es, r, n);
      else {
        var a = r ? r(En(e, l), i, l + "", e, o, n) : void 0;
        a === void 0 && (a = i), On(e, l, a);
      }
    }, Ba);
  }
  function Hg(e, o) {
    var t = -1, r = $t(e) ? Array(e.length) : [];
    return Og(e, function(n, i, l) {
      r[++t] = o(n, i, l);
    }), r;
  }
  function Bg(e, o) {
    var t = je(e) ? Ma : Hg;
    return t(e, Pg(o));
  }
  var Ag = Uf(function(e, o, t) {
    es(e, o, t);
  });
  const Ht = Ag, Pt = {
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
    fontSize: Rg,
    fontFamily: Fg,
    lineHeight: Lg
  } = Pt, os = U("body", `
 margin: 0;
 font-size: ${Rg};
 font-family: ${Fg};
 line-height: ${Lg};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [U("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), Co = "n-config-provider", Kt = "naive-ui-style";
  function ve(e, o, t, r, n, i) {
    const l = Yo(), a = he(Co, null);
    if (t) {
      const c = () => {
        const u = i == null ? void 0 : i.value;
        t.mount({
          id: u === void 0 ? o : u + o,
          head: !0,
          props: {
            bPrefix: u ? `.${u}-` : void 0
          },
          anchorMetaName: Kt,
          ssr: l
        }), a != null && a.preflightStyleDisabled || os.mount({
          id: "n-global",
          head: !0,
          anchorMetaName: Kt,
          ssr: l
        });
      };
      l ? c() : Fn(c);
    }
    return E(() => {
      var c;
      const { theme: { common: u, self: f, peers: v = {} } = {}, themeOverrides: p = {}, builtinThemeOverrides: d = {} } = n, { common: m, peers: C } = p, { common: h = void 0, [e]: { common: S = void 0, self: D = void 0, peers: T = {} } = {} } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, { common: z = void 0, [e]: O = {} } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, { common: b, peers: $ = {} } = O, w = Ht({}, u || S || h || r.common, z, b, m), x = Ht(
        // {}, executed every time, no need for empty obj
        (c = f || D || r.self) === null || c === void 0 ? void 0 : c(w),
        d,
        O,
        p
      );
      return {
        common: w,
        self: x,
        peers: Ht({}, r.peers, T, v),
        peerOverrides: Ht({}, d.peers, $, C)
      };
    });
  }
  ve.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  const ts = "n";
  function Tt(e = {}, o = {
    defaultBordered: !0
  }) {
    const t = he(Co, null);
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
      mergedClsPrefixRef: E(() => (t == null ? void 0 : t.mergedClsPrefixRef.value) || ts),
      namespaceRef: E(() => t == null ? void 0 : t.mergedNamespaceRef.value)
    };
  }
  const Wg = {
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
  }, Ng = Wg;
  function tn(e) {
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
      var l = i[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? Vg(a, function(f) {
        return f.test(l);
      }) : jg(a, function(f) {
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
  function jg(e, o) {
    for (var t in e)
      if (e.hasOwnProperty(t) && o(e[t]))
        return t;
  }
  function Vg(e, o) {
    for (var t = 0; t < e.length; t++)
      if (o(e[t]))
        return t;
  }
  function Ug(e) {
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
  var Gg = {
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
  }, Kg = function(o, t, r) {
    var n, i = Gg[o];
    return typeof i == "string" ? n = i : t === 1 ? n = i.one : n = i.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
  };
  const Xg = Kg;
  var Yg = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, qg = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, Jg = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, Zg = {
    date: tn({
      formats: Yg,
      defaultWidth: "full"
    }),
    time: tn({
      formats: qg,
      defaultWidth: "full"
    }),
    dateTime: tn({
      formats: Jg,
      defaultWidth: "full"
    })
  };
  const Qg = Zg;
  var em = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, om = function(o, t, r, n) {
    return em[o];
  };
  const tm = om;
  var rm = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }, nm = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }, im = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }, lm = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }, am = {
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
  }, sm = {
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
  }, cm = function(o, t) {
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
  }, dm = {
    ordinalNumber: cm,
    era: Et({
      values: rm,
      defaultWidth: "wide"
    }),
    quarter: Et({
      values: nm,
      defaultWidth: "wide",
      argumentCallback: function(o) {
        return o - 1;
      }
    }),
    month: Et({
      values: im,
      defaultWidth: "wide"
    }),
    day: Et({
      values: lm,
      defaultWidth: "wide"
    }),
    dayPeriod: Et({
      values: am,
      defaultWidth: "wide",
      formattingValues: sm,
      defaultFormattingWidth: "wide"
    })
  };
  const um = dm;
  var fm = /^(\d+)(th|st|nd|rd)?/i, hm = /\d+/i, pm = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, vm = {
    any: [/^b/i, /^(a|c)/i]
  }, gm = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, mm = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }, bm = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, Cm = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  }, xm = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, ym = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }, Sm = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, wm = {
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
  }, $m = {
    ordinalNumber: Ug({
      matchPattern: fm,
      parsePattern: hm,
      valueCallback: function(o) {
        return parseInt(o, 10);
      }
    }),
    era: _t({
      matchPatterns: pm,
      defaultMatchWidth: "wide",
      parsePatterns: vm,
      defaultParseWidth: "any"
    }),
    quarter: _t({
      matchPatterns: gm,
      defaultMatchWidth: "wide",
      parsePatterns: mm,
      defaultParseWidth: "any",
      valueCallback: function(o) {
        return o + 1;
      }
    }),
    month: _t({
      matchPatterns: bm,
      defaultMatchWidth: "wide",
      parsePatterns: Cm,
      defaultParseWidth: "any"
    }),
    day: _t({
      matchPatterns: xm,
      defaultMatchWidth: "wide",
      parsePatterns: ym,
      defaultParseWidth: "any"
    }),
    dayPeriod: _t({
      matchPatterns: Sm,
      defaultMatchWidth: "any",
      parsePatterns: wm,
      defaultParseWidth: "any"
    })
  };
  const Pm = $m;
  var Tm = {
    code: "en-US",
    formatDistance: Xg,
    formatLong: Qg,
    formatRelative: tm,
    localize: um,
    match: Pm,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  const Im = Tm, zm = {
    name: "en-US",
    locale: Im
  }, Mm = zm;
  function rs(e) {
    const { mergedLocaleRef: o, mergedDateLocaleRef: t } = he(Co, null) || {}, r = E(() => {
      var i, l;
      return (l = (i = o == null ? void 0 : o.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : Ng[e];
    });
    return {
      dateLocaleRef: E(() => {
        var i;
        return (i = t == null ? void 0 : t.value) !== null && i !== void 0 ? i : Mm;
      }),
      localeRef: r
    };
  }
  function Rr(e, o, t) {
    if (!o) {
      process.env.NODE_ENV !== "production" && Xl("use-style", "No style is specified.");
      return;
    }
    const r = Yo(), n = he(Co, null), i = () => {
      const l = t == null ? void 0 : t.value;
      o.mount({
        id: l === void 0 ? e : l + e,
        head: !0,
        anchorMetaName: Kt,
        props: {
          bPrefix: l ? `.${l}-` : void 0
        },
        ssr: r
      }), n != null && n.preflightStyleDisabled || os.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: Kt,
        ssr: r
      });
    };
    r ? i() : Fn(i);
  }
  function Do(e, o, t, r) {
    var n;
    t || Xl("useThemeClass", "cssVarsRef is not passed");
    const i = (n = he(Co, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, l = F(""), a = Yo();
    let s;
    const c = `__${e}`, u = () => {
      let f = c;
      const v = o ? o.value : void 0, p = i == null ? void 0 : i.value;
      p && (f += "-" + p), v && (f += "-" + v);
      const { themeOverrides: d, builtinThemeOverrides: m } = r;
      d && (f += "-" + jt(JSON.stringify(d))), m && (f += "-" + jt(JSON.stringify(m))), l.value = f, s = () => {
        const C = t.value;
        let h = "";
        for (const S in C)
          h += `${S}: ${C[S]};`;
        U(`.${f}`, h).mount({
          id: f,
          ssr: a
        }), s = void 0;
      };
    };
    return go(() => {
      u();
    }), {
      themeClass: l,
      onRender: () => {
        s == null || s();
      }
    };
  }
  function ns(e, o, t) {
    if (!o)
      return;
    const r = Yo(), n = E(() => {
      const { value: l } = o;
      if (!l)
        return;
      const a = l[e];
      if (a)
        return a;
    }), i = () => {
      go(() => {
        const { value: l } = t, a = `${l}${e}Rtl`;
        if (wd(a, r))
          return;
        const { value: s } = n;
        s && s.style.mount({
          id: a,
          head: !0,
          anchorMetaName: Kt,
          props: {
            bPrefix: l ? `.${l}-` : void 0
          },
          ssr: r
        });
      });
    };
    return r ? i() : Fn(i), n;
  }
  function is(e, o) {
    return ie({
      name: lv(e),
      setup() {
        var t;
        const r = (t = he(Co, null)) === null || t === void 0 ? void 0 : t.mergedIconsRef;
        return () => {
          var n;
          const i = (n = r == null ? void 0 : r.value) === null || n === void 0 ? void 0 : n[e];
          return i ? i() : o;
        };
      }
    });
  }
  const km = ie({
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
  }), Om = is("close", y(
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
  )), Em = ie({
    name: "Empty",
    render() {
      return y(
        "svg",
        { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        y("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
        y("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
      );
    }
  }), _m = ie({
    name: "ChevronDown",
    render() {
      return y(
        "svg",
        { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        y("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
      );
    }
  }), Dm = is("clear", y(
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
  )), ls = ie({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: o }) {
      const t = Dr();
      return () => y(yt, { name: "icon-switch-transition", appear: t.value }, o);
    }
  }), Hm = Q("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [U("svg", `
 height: 1em;
 width: 1em;
 `)]), qt = ie({
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
      Rr("-base-icon", Hm, se(e, "clsPrefix"));
    },
    render() {
      return y("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
    }
  }), Bm = Q("base-close", `
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
`, [ae("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), U("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), Je("disabled", [U("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), U("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), U("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), U("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), U("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), ae("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), ae("round", [U("&::before", `
 border-radius: 50%;
 `)])]), Am = ie({
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
      return Rr("-base-close", Bm, se(e, "clsPrefix")), () => {
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
          y(qt, { clsPrefix: o }, {
            default: () => y(Om, null)
          })
        );
      };
    }
  }), Rm = ie({
    props: {
      onFocus: Function,
      onBlur: Function
    },
    setup(e) {
      return () => y("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
    }
  }), {
    cubicBezierEaseInOut: Fm
  } = Pt;
  function _n({
    originalTransform: e = "",
    left: o = 0,
    top: t = 0,
    transition: r = `all .3s ${Fm} !important`
  } = {}) {
    return [U("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
      transform: e + " scale(0.75)",
      left: o,
      top: t,
      opacity: 0
    }), U("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
      transform: `scale(1) ${e}`,
      left: o,
      top: t,
      opacity: 1
    }), U("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
      transformOrigin: "center",
      position: "absolute",
      left: o,
      top: t,
      transition: r
    })];
  }
  const Lm = U([U("@keyframes loading-container-rotate", `
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `), U("@keyframes loading-layer-rotate", `
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
 `), U("@keyframes loading-left-spin", `
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
 `), U("@keyframes loading-right-spin", `
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
 `, [Y("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [_n()]), Y("container", `
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
 `, [_n({
    left: "50%",
    top: "50%",
    originalTransform: "translateX(-50%) translateY(-50%)"
  })])])]), Wm = {
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: void 0
    }
  }, as = ie({
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
    } }, Wm),
    setup(e) {
      Rr("-base-loading", Lm, se(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: o, strokeWidth: t, stroke: r, scale: n } = this, i = o / n;
      return y(
        "div",
        { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
        y(ls, null, {
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
  function vl(e) {
    return Array.isArray(e) ? e : [e];
  }
  const Dn = {
    STOP: "STOP"
  };
  function ss(e, o) {
    const t = o(e);
    e.children !== void 0 && t !== Dn.STOP && e.children.forEach((r) => ss(r, o));
  }
  function Nm(e, o = {}) {
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
  function jm(e, o) {
    const { isLeaf: t } = e;
    return t !== void 0 ? t : !o(e);
  }
  function Vm(e) {
    return e.children;
  }
  function Um(e) {
    return e.key;
  }
  function Gm() {
    return !1;
  }
  function Km(e, o) {
    const { isLeaf: t } = e;
    return !(t === !1 && !Array.isArray(o(e)));
  }
  function Xm(e) {
    return e.disabled === !0;
  }
  function Ym(e, o) {
    return e.isLeaf === !1 && !Array.isArray(o(e));
  }
  function qm(e, o) {
    if (e.isLeaf === !0) {
      const t = o(e);
      if (Array.isArray(t) && t.length > 0)
        return !0;
    }
    return !1;
  }
  function rn(e) {
    var o;
    return e == null ? [] : Array.isArray(e) ? e : (o = e.checkedKeys) !== null && o !== void 0 ? o : [];
  }
  function nn(e) {
    var o;
    return e == null || Array.isArray(e) ? [] : (o = e.indeterminateKeys) !== null && o !== void 0 ? o : [];
  }
  function Jm(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) || t.add(r);
    }), Array.from(t);
  }
  function Zm(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) && t.delete(r);
    }), Array.from(t);
  }
  function Qm(e) {
    return (e == null ? void 0 : e.type) === "group";
  }
  function eb(e) {
    const o = /* @__PURE__ */ new Map();
    return e.forEach((t, r) => {
      o.set(t.key, r);
    }), (t) => {
      var r;
      return (r = o.get(t)) !== null && r !== void 0 ? r : null;
    };
  }
  class ob extends Error {
    constructor() {
      super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
    }
  }
  function tb(e, o, t, r) {
    return Ir(o.concat(e), t, r, !1);
  }
  function rb(e, o) {
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
  function nb(e, o, t, r) {
    const n = Ir(o, t, r, !1), i = Ir(e, t, r, !0), l = rb(e, t), a = [];
    return n.forEach((s) => {
      (i.has(s) || l.has(s)) && a.push(s);
    }), a.forEach((s) => n.delete(s)), n;
  }
  function ln(e, o) {
    const { checkedKeys: t, keysToCheck: r, keysToUncheck: n, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: c } = e;
    if (!l)
      return r !== void 0 ? {
        checkedKeys: Jm(t, r),
        indeterminateKeys: Array.from(i)
      } : n !== void 0 ? {
        checkedKeys: Zm(t, n),
        indeterminateKeys: Array.from(i)
      } : {
        checkedKeys: Array.from(t),
        indeterminateKeys: Array.from(i)
      };
    const { levelTreeNodeMap: u } = o;
    let f;
    n !== void 0 ? f = nb(n, t, o, c) : r !== void 0 ? f = tb(r, t, o, c) : f = Ir(t, o, c, !1);
    const v = s === "parent", p = s === "child" || a, d = f, m = /* @__PURE__ */ new Set(), C = Math.max.apply(null, Array.from(u.keys()));
    for (let h = C; h >= 0; h -= 1) {
      const S = h === 0, D = u.get(h);
      for (const T of D) {
        if (T.isLeaf)
          continue;
        const { key: z, shallowLoaded: O } = T;
        if (p && O && T.children.forEach((x) => {
          !x.disabled && !x.isLeaf && x.shallowLoaded && d.has(x.key) && d.delete(x.key);
        }), T.disabled || !O)
          continue;
        let b = !0, $ = !1, w = !0;
        for (const x of T.children) {
          const P = x.key;
          if (!x.disabled) {
            if (w && (w = !1), d.has(P))
              $ = !0;
            else if (m.has(P)) {
              $ = !0, b = !1;
              break;
            } else if (b = !1, $)
              break;
          }
        }
        b && !w ? (v && T.children.forEach((x) => {
          !x.disabled && d.has(x.key) && d.delete(x.key);
        }), d.add(z)) : $ && m.add(z), S && p && d.has(z) && d.delete(z);
      }
    }
    return {
      checkedKeys: Array.from(d),
      indeterminateKeys: Array.from(m)
    };
  }
  function Ir(e, o, t, r) {
    const { treeNodeMap: n, getChildren: i } = o, l = /* @__PURE__ */ new Set(), a = new Set(e);
    return e.forEach((s) => {
      const c = n.get(s);
      c !== void 0 && ss(c, (u) => {
        if (u.disabled)
          return Dn.STOP;
        const { key: f } = u;
        if (!l.has(f) && (l.add(f), a.add(f), Ym(u.rawNode, i))) {
          if (r)
            return Dn.STOP;
          if (!t)
            throw new ob();
        }
      });
    }), a;
  }
  function ib(e, { includeGroup: o = !1, includeSelf: t = !0 }, r) {
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
  function lb(e) {
    if (e.length === 0)
      return null;
    const o = e[0];
    return o.isGroup || o.ignored || o.disabled ? o.getNext() : o;
  }
  function ab(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n + 1) % r] : n === t.length - 1 ? null : t[n + 1];
  }
  function gl(e, o, { loop: t = !1, includeDisabled: r = !1 } = {}) {
    const n = o === "prev" ? sb : ab, i = {
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
          const u = ni(c, i);
          u !== null ? a = u : s(n(c, t));
        } else {
          const u = n(c, !1);
          if (u !== null)
            s(u);
          else {
            const f = cb(c);
            f != null && f.isGroup ? s(n(f, t)) : t && s(n(c, !0));
          }
        }
      }
    }
    return s(e), a;
  }
  function sb(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n - 1 + r) % r] : n === 0 ? null : t[n - 1];
  }
  function cb(e) {
    return e.parent;
  }
  function ni(e, o = {}) {
    const { reverse: t = !1 } = o, { children: r } = e;
    if (r) {
      const { length: n } = r, i = t ? n - 1 : 0, l = t ? -1 : n, a = t ? -1 : 1;
      for (let s = i; s !== l; s += a) {
        const c = r[s];
        if (!c.disabled && !c.ignored)
          if (c.isGroup) {
            const u = ni(c, o);
            if (u !== null)
              return u;
          } else
            return c;
      }
    }
    return null;
  }
  const db = {
    getChild() {
      return this.ignored ? null : ni(this);
    },
    getParent() {
      const { parent: e } = this;
      return e != null && e.isGroup ? e.getParent() : e;
    },
    getNext(e = {}) {
      return gl(this, "next", e);
    },
    getPrev(e = {}) {
      return gl(this, "prev", e);
    }
  };
  function ub(e, o) {
    const t = o ? new Set(o) : void 0, r = [];
    function n(i) {
      i.forEach((l) => {
        r.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
        t === void 0 || t.has(l.key)) && n(l.children);
      });
    }
    return n(e), r;
  }
  function fb(e, o) {
    const t = e.key;
    for (; o; ) {
      if (o.key === t)
        return !0;
      o = o.parent;
    }
    return !1;
  }
  function cs(e, o, t, r, n, i = null, l = 0) {
    const a = [];
    return e.forEach((s, c) => {
      var u;
      process.env.NODE_ENV !== "production" && qm(s, n) && console.error("[treemate]: node", s, "is invalid");
      const f = Object.create(r);
      if (f.rawNode = s, f.siblings = a, f.level = l, f.index = c, f.isFirstChild = c === 0, f.isLastChild = c + 1 === e.length, f.parent = i, !f.ignored) {
        const v = n(s);
        Array.isArray(v) && (f.children = cs(v, o, t, r, n, f, l + 1));
      }
      a.push(f), o.set(f.key, f), t.has(l) || t.set(l, []), (u = t.get(l)) === null || u === void 0 || u.push(f);
    }), a;
  }
  function hb(e, o = {}) {
    var t;
    const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), { getDisabled: i = Xm, getIgnored: l = Gm, getIsGroup: a = Qm, getKey: s = Um } = o, c = (t = o.getChildren) !== null && t !== void 0 ? t : Vm, u = o.ignoreEmptyChildren ? (T) => {
      const z = c(T);
      return Array.isArray(z) ? z.length ? z : null : z;
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
        return jm(this.rawNode, u);
      },
      get shallowLoaded() {
        return Km(this.rawNode, u);
      },
      get ignored() {
        return l(this.rawNode);
      },
      contains(T) {
        return fb(this, T);
      }
    }, db), v = cs(e, r, n, f, u);
    function p(T) {
      if (T == null)
        return null;
      const z = r.get(T);
      return z && !z.isGroup && !z.ignored ? z : null;
    }
    function d(T) {
      if (T == null)
        return null;
      const z = r.get(T);
      return z && !z.ignored ? z : null;
    }
    function m(T, z) {
      const O = d(T);
      return O ? O.getPrev(z) : null;
    }
    function C(T, z) {
      const O = d(T);
      return O ? O.getNext(z) : null;
    }
    function h(T) {
      const z = d(T);
      return z ? z.getParent() : null;
    }
    function S(T) {
      const z = d(T);
      return z ? z.getChild() : null;
    }
    const D = {
      treeNodes: v,
      treeNodeMap: r,
      levelTreeNodeMap: n,
      maxLevel: Math.max(...n.keys()),
      getChildren: u,
      getFlattenedNodes(T) {
        return ub(v, T);
      },
      getNode: p,
      getPrev: m,
      getNext: C,
      getParent: h,
      getChild: S,
      getFirstAvailableNode() {
        return lb(v);
      },
      getPath(T, z = {}) {
        return ib(T, z, D);
      },
      getCheckedKeys(T, z = {}) {
        const { cascade: O = !0, leafOnly: b = !1, checkStrategy: $ = "all", allowNotLoaded: w = !1 } = z;
        return ln({
          checkedKeys: rn(T),
          indeterminateKeys: nn(T),
          cascade: O,
          leafOnly: b,
          checkStrategy: $,
          allowNotLoaded: w
        }, D);
      },
      check(T, z, O = {}) {
        const { cascade: b = !0, leafOnly: $ = !1, checkStrategy: w = "all", allowNotLoaded: x = !1 } = O;
        return ln({
          checkedKeys: rn(z),
          indeterminateKeys: nn(z),
          keysToCheck: T == null ? [] : vl(T),
          cascade: b,
          leafOnly: $,
          checkStrategy: w,
          allowNotLoaded: x
        }, D);
      },
      uncheck(T, z, O = {}) {
        const { cascade: b = !0, leafOnly: $ = !1, checkStrategy: w = "all", allowNotLoaded: x = !1 } = O;
        return ln({
          checkedKeys: rn(z),
          indeterminateKeys: nn(z),
          keysToUncheck: T == null ? [] : vl(T),
          cascade: b,
          leafOnly: $,
          checkStrategy: w,
          allowNotLoaded: x
        }, D);
      },
      getNonLeafKeys(T = {}) {
        return Nm(v, T);
      }
    };
    return D;
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
  }, pb = mo(j.neutralBase), ds = mo(j.neutralInvertBase), vb = "rgba(" + ds.slice(0, 3).join(", ") + ", ";
  function le(e) {
    return vb + String(e) + ")";
  }
  function gb(e) {
    const o = Array.from(ds);
    return o[3] = Number(e), Z(pb, o);
  }
  const mb = Object.assign(Object.assign({ name: "common" }, Pt), {
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
    textColor1: le(j.alpha1),
    textColor2: le(j.alpha2),
    textColor3: le(j.alpha3),
    // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
    // textColor5: overlay(base.alpha5),
    textColorDisabled: le(j.alpha4),
    placeholderColor: le(j.alpha4),
    placeholderColorDisabled: le(j.alpha5),
    iconColor: le(j.alpha4),
    iconColorDisabled: le(j.alpha5),
    iconColorHover: le(Number(j.alpha4) * 1.25),
    iconColorPressed: le(Number(j.alpha4) * 0.8),
    opacity1: j.alpha1,
    opacity2: j.alpha2,
    opacity3: j.alpha3,
    opacity4: j.alpha4,
    opacity5: j.alpha5,
    dividerColor: le(j.alphaDivider),
    borderColor: le(j.alphaBorder),
    // close
    closeIconColorHover: le(Number(j.alphaClose)),
    closeIconColor: le(Number(j.alphaClose)),
    closeIconColorPressed: le(Number(j.alphaClose)),
    closeColorHover: "rgba(255, 255, 255, .12)",
    closeColorPressed: "rgba(255, 255, 255, .08)",
    // clear
    clearColor: le(j.alpha4),
    clearColorHover: pe(le(j.alpha4), { alpha: 1.25 }),
    clearColorPressed: pe(le(j.alpha4), { alpha: 0.8 }),
    scrollbarColor: le(j.alphaScrollbar),
    scrollbarColorHover: le(j.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: le(j.alphaProgressRail),
    railColor: le(j.alphaRail),
    popoverColor: j.neutralPopover,
    tableColor: j.neutralCard,
    cardColor: j.neutralCard,
    modalColor: j.neutralModal,
    bodyColor: j.neutralBody,
    tagColor: gb(j.alphaTag),
    avatarColor: le(j.alphaAvatar),
    invertedColor: j.neutralBase,
    inputColor: le(j.alphaInput),
    codeColor: le(j.alphaCode),
    tabColor: le(j.alphaTab),
    actionColor: le(j.alphaAction),
    tableHeaderColor: le(j.alphaAction),
    hoverColor: le(j.alphaPending),
    tableColorHover: le(j.alphaTablePending),
    tableColorStriped: le(j.alphaTableStriped),
    pressedColor: le(j.alphaPressed),
    opacityDisabled: j.alphaDisabled,
    inputColorDisabled: le(j.alphaDisabledInput),
    buttonColor2: "rgba(255, 255, 255, .08)",
    buttonColor2Hover: "rgba(255, 255, 255, .12)",
    buttonColor2Pressed: "rgba(255, 255, 255, .08)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), A = mb, J = {
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
  }, bb = mo(J.neutralBase), us = mo(J.neutralInvertBase), Cb = "rgba(" + us.slice(0, 3).join(", ") + ", ";
  function ml(e) {
    return Cb + String(e) + ")";
  }
  function Se(e) {
    const o = Array.from(us);
    return o[3] = Number(e), Z(bb, o);
  }
  const xb = Object.assign(Object.assign({ name: "common" }, Pt), {
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
    textColorDisabled: Se(J.alpha4),
    placeholderColor: Se(J.alpha4),
    placeholderColorDisabled: Se(J.alpha5),
    iconColor: Se(J.alpha4),
    iconColorHover: pe(Se(J.alpha4), { lightness: 0.75 }),
    iconColorPressed: pe(Se(J.alpha4), { lightness: 0.9 }),
    iconColorDisabled: Se(J.alpha5),
    opacity1: J.alpha1,
    opacity2: J.alpha2,
    opacity3: J.alpha3,
    opacity4: J.alpha4,
    opacity5: J.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    // close
    closeIconColor: Se(Number(J.alphaClose)),
    closeIconColorHover: Se(Number(J.alphaClose)),
    closeIconColorPressed: Se(Number(J.alphaClose)),
    closeColorHover: "rgba(0, 0, 0, .09)",
    closeColorPressed: "rgba(0, 0, 0, .13)",
    // clear
    clearColor: Se(J.alpha4),
    clearColorHover: pe(Se(J.alpha4), { lightness: 0.75 }),
    clearColorPressed: pe(Se(J.alpha4), { lightness: 0.9 }),
    scrollbarColor: ml(J.alphaScrollbar),
    scrollbarColorHover: ml(J.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: Se(J.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: J.neutralPopover,
    tableColor: J.neutralCard,
    cardColor: J.neutralCard,
    modalColor: J.neutralModal,
    bodyColor: J.neutralBody,
    tagColor: "#eee",
    avatarColor: Se(J.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: Se(J.alphaInput),
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
  }), So = xb, yb = {
    iconSizeSmall: "34px",
    iconSizeMedium: "40px",
    iconSizeLarge: "46px",
    iconSizeHuge: "52px"
  }, fs = (e) => {
    const { textColorDisabled: o, iconColor: t, textColor2: r, fontSizeSmall: n, fontSizeMedium: i, fontSizeLarge: l, fontSizeHuge: a } = e;
    return Object.assign(Object.assign({}, yb), {
      fontSizeSmall: n,
      fontSizeMedium: i,
      fontSizeLarge: l,
      fontSizeHuge: a,
      textColor: o,
      iconColor: t,
      extraTextColor: r
    });
  }, Sb = {
    name: "Empty",
    common: So,
    self: fs
  }, ii = Sb, wb = {
    name: "Empty",
    common: A,
    self: fs
  }, Qo = wb, $b = Q("empty", `
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
 `, [U("+", [Y("description", `
 margin-top: 8px;
 `)])]), Y("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), Y("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), Pb = Object.assign(Object.assign({}, ve.props), { description: String, showDescription: {
    type: Boolean,
    default: !0
  }, showIcon: {
    type: Boolean,
    default: !0
  }, size: {
    type: String,
    default: "medium"
  }, renderIcon: Function }), Tb = ie({
    name: "Empty",
    props: Pb,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = Tt(e), r = ve("Empty", "-empty", $b, ii, e, o), { localeRef: n } = rs("Empty"), i = he(Co, null), l = E(() => {
        var u, f, v;
        return (u = e.description) !== null && u !== void 0 ? u : (v = (f = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || f === void 0 ? void 0 : f.Empty) === null || v === void 0 ? void 0 : v.description;
      }), a = E(() => {
        var u, f;
        return ((f = (u = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || u === void 0 ? void 0 : u.Empty) === null || f === void 0 ? void 0 : f.renderIcon) || (() => y(Em, null));
      }), s = E(() => {
        const { size: u } = e, { common: { cubicBezierEaseInOut: f }, self: { [fe("iconSize", u)]: v, [fe("fontSize", u)]: p, textColor: d, iconColor: m, extraTextColor: C } } = r.value;
        return {
          "--n-icon-size": v,
          "--n-font-size": p,
          "--n-bezier": f,
          "--n-text-color": d,
          "--n-icon-color": m,
          "--n-extra-text-color": C
        };
      }), c = t ? Do("empty", E(() => {
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
      return t == null || t(), y(
        "div",
        { class: [`${o}-empty`, this.themeClass], style: this.cssVars },
        this.showIcon ? y("div", { class: `${o}-empty__icon` }, e.icon ? e.icon() : y(qt, { clsPrefix: o }, { default: this.mergedRenderIcon })) : null,
        this.showDescription ? y("div", { class: `${o}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null,
        e.extra ? y("div", { class: `${o}-empty__extra` }, e.extra()) : null
      );
    }
  }), hs = (e) => {
    const { scrollbarColor: o, scrollbarColorHover: t } = e;
    return {
      color: o,
      colorHover: t
    };
  }, Ib = {
    name: "Scrollbar",
    common: So,
    self: hs
  }, ps = Ib, zb = {
    name: "Scrollbar",
    common: A,
    self: hs
  }, Ee = zb, {
    cubicBezierEaseInOut: bl
  } = Pt;
  function Mb({
    name: e = "fade-in",
    enterDuration: o = "0.2s",
    leaveDuration: t = "0.2s",
    enterCubicBezier: r = bl,
    leaveCubicBezier: n = bl
  } = {}) {
    return [U(`&.${e}-transition-enter-active`, {
      transition: `all ${o} ${r}!important`
    }), U(`&.${e}-transition-leave-active`, {
      transition: `all ${t} ${n}!important`
    }), U(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
      opacity: 0
    }), U(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
      opacity: 1
    })];
  }
  const kb = Q("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [U(">", [Q("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [U("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), U(">", [Q("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), U(">, +", [Q("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [ae("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [U(">", [Y("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), ae("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [U(">", [Y("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), ae("disabled", [U(">", [Y("scrollbar", {
    pointerEvents: "none"
  })])]), U(">", [Y("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [Mb(), U("&:hover", {
    backgroundColor: "var(--n-scrollbar-color-hover)"
  })])])])])]), Ob = Object.assign(Object.assign({}, ve.props), {
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
  }), vs = ie({
    name: "Scrollbar",
    props: Ob,
    inheritAttrs: !1,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t, mergedRtlRef: r } = Tt(e), n = ns("Scrollbar", r, o), i = F(null), l = F(null), a = F(null), s = F(null), c = F(null), u = F(null), f = F(null), v = F(null), p = F(null), d = F(null), m = F(null), C = F(0), h = F(0), S = F(!1), D = F(!1);
      let T = !1, z = !1, O, b, $ = 0, w = 0, x = 0, P = 0;
      const M = jd(), W = E(() => {
        const { value: g } = v, { value: I } = u, { value: B } = d;
        return g === null || I === null || B === null ? 0 : Math.min(g, B * g / I + e.size * 1.5);
      }), H = E(() => `${W.value}px`), N = E(() => {
        const { value: g } = p, { value: I } = f, { value: B } = m;
        return g === null || I === null || B === null ? 0 : B * g / I + e.size * 1.5;
      }), G = E(() => `${N.value}px`), V = E(() => {
        const { value: g } = v, { value: I } = C, { value: B } = u, { value: X } = d;
        if (g === null || B === null || X === null)
          return 0;
        {
          const q = B - g;
          return q ? I / q * (X - W.value) : 0;
        }
      }), oe = E(() => `${V.value}px`), k = E(() => {
        const { value: g } = p, { value: I } = h, { value: B } = f, { value: X } = m;
        if (g === null || B === null || X === null)
          return 0;
        {
          const q = B - g;
          return q ? I / q * (X - N.value) : 0;
        }
      }), L = E(() => `${k.value}px`), re = E(() => {
        const { value: g } = v, { value: I } = u;
        return g !== null && I !== null && I > g;
      }), ue = E(() => {
        const { value: g } = p, { value: I } = f;
        return g !== null && I !== null && I > g;
      }), ze = E(() => {
        const { trigger: g } = e;
        return g === "none" || S.value;
      }), ao = E(() => {
        const { trigger: g } = e;
        return g === "none" || D.value;
      }), Te = E(() => {
        const { container: g } = e;
        return g ? g() : l.value;
      }), eo = E(() => {
        const { content: g } = e;
        return g ? g() : a.value;
      }), Ae = Fu(() => {
        e.container || Ge({
          top: C.value,
          left: h.value
        });
      }), De = () => {
        Ae.isDeactivated || Le();
      }, xe = (g) => {
        if (Ae.isDeactivated)
          return;
        const { onResize: I } = e;
        I && I(g), Le();
      }, Ge = (g, I) => {
        if (!e.scrollable)
          return;
        if (typeof g == "number") {
          Fe(I ?? 0, g, 0, !1, "auto");
          return;
        }
        const { left: B, top: X, index: q, elSize: ee, position: te, behavior: ne, el: ke, debounce: ho = !0 } = g;
        (B !== void 0 || X !== void 0) && Fe(B ?? 0, X ?? 0, 0, !1, ne), ke !== void 0 ? Fe(0, ke.offsetTop, ke.offsetHeight, ho, ne) : q !== void 0 && ee !== void 0 ? Fe(0, q * ee, ee, ho, ne) : te === "bottom" ? Fe(0, Number.MAX_SAFE_INTEGER, 0, !1, ne) : te === "top" && Fe(0, 0, 0, !1, ne);
      }, Re = (g, I) => {
        if (!e.scrollable)
          return;
        const { value: B } = Te;
        B && (typeof g == "object" ? B.scrollBy(g) : B.scrollBy(g, I || 0));
      };
      function Fe(g, I, B, X, q) {
        const { value: ee } = Te;
        if (ee) {
          if (X) {
            const { scrollTop: te, offsetHeight: ne } = ee;
            if (I > te) {
              I + B <= te + ne || ee.scrollTo({
                left: g,
                top: I + B - ne,
                behavior: q
              });
              return;
            }
          }
          ee.scrollTo({
            left: g,
            top: I,
            behavior: q
          });
        }
      }
      function so() {
        wo(), $o(), Le();
      }
      function co() {
        uo();
      }
      function uo() {
        Ho(), Bo();
      }
      function Ho() {
        b !== void 0 && window.clearTimeout(b), b = window.setTimeout(() => {
          D.value = !1;
        }, e.duration);
      }
      function Bo() {
        O !== void 0 && window.clearTimeout(O), O = window.setTimeout(() => {
          S.value = !1;
        }, e.duration);
      }
      function wo() {
        O !== void 0 && window.clearTimeout(O), S.value = !0;
      }
      function $o() {
        b !== void 0 && window.clearTimeout(b), D.value = !0;
      }
      function Me(g) {
        const { onScroll: I } = e;
        I && I(g), R();
      }
      function R() {
        const { value: g } = Te;
        g && (C.value = g.scrollTop, h.value = g.scrollLeft * (n != null && n.value ? -1 : 1));
      }
      function K() {
        const { value: g } = eo;
        g && (u.value = g.offsetHeight, f.value = g.offsetWidth);
        const { value: I } = Te;
        I && (v.value = I.offsetHeight, p.value = I.offsetWidth);
        const { value: B } = c, { value: X } = s;
        B && (m.value = B.offsetWidth), X && (d.value = X.offsetHeight);
      }
      function ce() {
        const { value: g } = Te;
        g && (C.value = g.scrollTop, h.value = g.scrollLeft * (n != null && n.value ? -1 : 1), v.value = g.offsetHeight, p.value = g.offsetWidth, u.value = g.scrollHeight, f.value = g.scrollWidth);
        const { value: I } = c, { value: B } = s;
        I && (m.value = I.offsetWidth), B && (d.value = B.offsetHeight);
      }
      function Le() {
        e.scrollable && (e.useUnifiedContainer ? ce() : (K(), R()));
      }
      function ot(g) {
        var I;
        return !(!((I = i.value) === null || I === void 0) && I.contains(Nt(g)));
      }
      function zt(g) {
        g.preventDefault(), g.stopPropagation(), z = !0, Ie("mousemove", window, tt, !0), Ie("mouseup", window, rt, !0), w = h.value, x = n != null && n.value ? window.innerWidth - g.clientX : g.clientX;
      }
      function tt(g) {
        if (!z)
          return;
        O !== void 0 && window.clearTimeout(O), b !== void 0 && window.clearTimeout(b);
        const { value: I } = p, { value: B } = f, { value: X } = N;
        if (I === null || B === null)
          return;
        const ee = (n != null && n.value ? window.innerWidth - g.clientX - x : g.clientX - x) * (B - I) / (I - X), te = B - I;
        let ne = w + ee;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Te;
        if (ke) {
          ke.scrollLeft = ne * (n != null && n.value ? -1 : 1);
          const { internalOnUpdateScrollLeft: ho } = e;
          ho && ho(ne);
        }
      }
      function rt(g) {
        g.preventDefault(), g.stopPropagation(), me("mousemove", window, tt, !0), me("mouseup", window, rt, !0), z = !1, Le(), ot(g) && uo();
      }
      function nt(g) {
        g.preventDefault(), g.stopPropagation(), T = !0, Ie("mousemove", window, Po, !0), Ie("mouseup", window, To, !0), $ = C.value, P = g.clientY;
      }
      function Po(g) {
        if (!T)
          return;
        O !== void 0 && window.clearTimeout(O), b !== void 0 && window.clearTimeout(b);
        const { value: I } = v, { value: B } = u, { value: X } = W;
        if (I === null || B === null)
          return;
        const ee = (g.clientY - P) * (B - I) / (I - X), te = B - I;
        let ne = $ + ee;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Te;
        ke && (ke.scrollTop = ne);
      }
      function To(g) {
        g.preventDefault(), g.stopPropagation(), me("mousemove", window, Po, !0), me("mouseup", window, To, !0), T = !1, Le(), ot(g) && uo();
      }
      go(() => {
        const { value: g } = ue, { value: I } = re, { value: B } = o, { value: X } = c, { value: q } = s;
        X && (g ? X.classList.remove(`${B}-scrollbar-rail--disabled`) : X.classList.add(`${B}-scrollbar-rail--disabled`)), q && (I ? q.classList.remove(`${B}-scrollbar-rail--disabled`) : q.classList.add(`${B}-scrollbar-rail--disabled`));
      }), Ve(() => {
        e.container || Le();
      }), Qe(() => {
        O !== void 0 && window.clearTimeout(O), b !== void 0 && window.clearTimeout(b), me("mousemove", window, Po, !0), me("mouseup", window, To, !0);
      });
      const Mt = ve("Scrollbar", "-scrollbar", kb, ps, e, o), it = E(() => {
        const { common: { cubicBezierEaseInOut: g, scrollbarBorderRadius: I, scrollbarHeight: B, scrollbarWidth: X }, self: { color: q, colorHover: ee } } = Mt.value;
        return {
          "--n-scrollbar-bezier": g,
          "--n-scrollbar-color": q,
          "--n-scrollbar-color-hover": ee,
          "--n-scrollbar-border-radius": I,
          "--n-scrollbar-width": X,
          "--n-scrollbar-height": B
        };
      }), Ke = t ? Do("scrollbar", void 0, it, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: Ge,
        scrollBy: Re,
        sync: Le,
        syncUnifiedContainer: ce,
        handleMouseEnterWrapper: so,
        handleMouseLeaveWrapper: co
      }), {
        mergedClsPrefix: o,
        rtlEnabled: n,
        containerScrollTop: C,
        wrapperRef: i,
        containerRef: l,
        contentRef: a,
        yRailRef: s,
        xRailRef: c,
        needYBar: re,
        needXBar: ue,
        yBarSizePx: H,
        xBarSizePx: G,
        yBarTopPx: oe,
        xBarLeftPx: L,
        isShowXBar: ze,
        isShowYBar: ao,
        isIos: M,
        handleScroll: Me,
        handleContentResize: De,
        handleContainerResize: xe,
        handleYScrollMouseDown: nt,
        handleXScrollMouseDown: zt,
        cssVars: t ? void 0 : it,
        themeClass: Ke == null ? void 0 : Ke.themeClass,
        onRender: Ke == null ? void 0 : Ke.onRender
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
      ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, y(l ? Cn : yt, l ? null : { name: "fade-in-transition" }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? y("div", { class: `${t}-scrollbar-rail__scrollbar`, style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        }, onMousedown: this.handleYScrollMouseDown }) : null
      })), s = () => {
        var u, f;
        return (u = this.onRender) === null || u === void 0 || u.call(this), y("div", kr(this.$attrs, {
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
            y(yr, { onResize: this.handleContentResize }, {
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
          ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, y(l ? Cn : yt, l ? null : { name: "fade-in-transition" }, {
            default: () => this.needXBar && this.isShowXBar && !this.isIos ? y("div", { class: `${t}-scrollbar-rail__scrollbar`, style: {
              width: this.xBarSizePx,
              right: n ? this.xBarLeftPx : void 0,
              left: n ? void 0 : this.xBarLeftPx
            }, onMousedown: this.handleXScrollMouseDown }) : null
          }))
        ]);
      }, c = this.container ? s() : y(yr, { onResize: this.handleContainerResize }, {
        default: s
      });
      return i ? y(
        to,
        null,
        c,
        a()
      ) : c;
    }
  }), Eb = vs, _b = vs, Db = {
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
  }, gs = (e) => {
    const { borderRadius: o, popoverColor: t, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: l, textColorDisabled: a, primaryColor: s, opacityDisabled: c, hoverColor: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p, fontSizeHuge: d, heightSmall: m, heightMedium: C, heightLarge: h, heightHuge: S } = e;
    return Object.assign(Object.assign({}, Db), { optionFontSizeSmall: f, optionFontSizeMedium: v, optionFontSizeLarge: p, optionFontSizeHuge: d, optionHeightSmall: m, optionHeightMedium: C, optionHeightLarge: h, optionHeightHuge: S, borderRadius: o, color: t, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: l, optionTextColorDisabled: a, optionTextColorActive: s, optionOpacityDisabled: c, optionCheckColor: s, optionColorPending: u, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: u, actionTextColor: i, loadingColor: s });
  }, Hb = {
    name: "InternalSelectMenu",
    common: So,
    peers: {
      Scrollbar: ps,
      Empty: ii
    },
    self: gs
  }, ms = Hb, Bb = {
    name: "InternalSelectMenu",
    common: A,
    peers: {
      Scrollbar: Ee,
      Empty: Qo
    },
    self: gs
  }, Jt = Bb;
  function Ab(e, o) {
    return y(yt, { name: "fade-in-scale-up-transition" }, {
      default: () => e ? y(qt, { clsPrefix: o, class: `${o}-base-select-option__check` }, {
        default: () => y(km)
      }) : null
    });
  }
  const Cl = ie({
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
      } = he(jn), p = Ze(() => {
        const { value: h } = t;
        return h ? e.tmNode.key === h.key : !1;
      });
      function d(h) {
        const { tmNode: S } = e;
        S.disabled || f(h, S);
      }
      function m(h) {
        const { tmNode: S } = e;
        S.disabled || v(h, S);
      }
      function C(h) {
        const { tmNode: S } = e, { value: D } = p;
        S.disabled || D || v(h, S);
      }
      return {
        multiple: r,
        isGrouped: Ze(() => {
          const { tmNode: h } = e, { parent: S } = h;
          return S && S.rawNode.type === "group";
        }),
        showCheckmark: c,
        nodeProps: u,
        isPending: p,
        isSelected: Ze(() => {
          const { value: h } = o, { value: S } = r;
          if (h === null)
            return !1;
          const D = e.tmNode.rawNode[s.value];
          if (S) {
            const { value: T } = n;
            return T.has(D);
          } else
            return h === D;
        }),
        labelField: a,
        renderLabel: i,
        renderOption: l,
        handleMouseMove: C,
        handleMouseEnter: m,
        handleClick: d
      };
    },
    render() {
      const { clsPrefix: e, tmNode: { rawNode: o }, isSelected: t, isPending: r, isGrouped: n, showCheckmark: i, nodeProps: l, renderOption: a, renderLabel: s, handleClick: c, handleMouseEnter: u, handleMouseMove: f } = this, v = Ab(t, e), p = s ? [s(o, t), i && v] : [
        pt(o[this.labelField], o, t),
        i && v
      ], d = l == null ? void 0 : l(o), m = y(
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
        ], style: [(d == null ? void 0 : d.style) || "", o.style || ""], onClick: Ur([c, d == null ? void 0 : d.onClick]), onMouseenter: Ur([
          u,
          d == null ? void 0 : d.onMouseenter
        ]), onMousemove: Ur([f, d == null ? void 0 : d.onMousemove]) }),
        y("div", { class: `${e}-base-select-option__content` }, p)
      );
      return o.render ? o.render({ node: m, option: o, selected: t }) : a ? a({ node: m, option: o, selected: t }) : m;
    }
  }), xl = ie({
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
      } = he(jn);
      return {
        labelField: t,
        nodeProps: r,
        renderLabel: e,
        renderOption: o
      };
    },
    render() {
      const { clsPrefix: e, renderLabel: o, renderOption: t, nodeProps: r, tmNode: { rawNode: n } } = this, i = r == null ? void 0 : r(n), l = o ? o(n, !1) : pt(n[this.labelField], n, !1), a = y("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), l);
      return n.render ? n.render({ node: a, option: n }) : t ? t({ node: a, option: n, selected: !1 }) : a;
    }
  }), {
    cubicBezierEaseIn: yl,
    cubicBezierEaseOut: Sl
  } = Pt;
  function bs({
    transformOrigin: e = "inherit",
    duration: o = ".2s",
    enterScale: t = ".9",
    originalTransform: r = "",
    originalTransition: n = ""
  } = {}) {
    return [U("&.fade-in-scale-up-transition-leave-active", {
      transformOrigin: e,
      transition: `opacity ${o} ${yl}, transform ${o} ${yl} ${n && "," + n}`
    }), U("&.fade-in-scale-up-transition-enter-active", {
      transformOrigin: e,
      transition: `opacity ${o} ${Sl}, transform ${o} ${Sl} ${n && "," + n}`
    }), U("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
      opacity: 0,
      transform: `${r} scale(${t})`
    }), U("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
      opacity: 1,
      transform: `${r} scale(1)`
    })];
  }
  const Rb = Q("base-select-menu", `
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
 `, [Y("content", `
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
 `, [ae("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), U("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), U("&:active", `
 color: var(--n-option-text-color-pressed);
 `), ae("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), ae("pending", [U("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), ae("selected", `
 color: var(--n-option-text-color-active);
 `, [U("&::before", `
 background-color: var(--n-option-color-active);
 `), ae("pending", [U("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), ae("disabled", `
 cursor: not-allowed;
 `, [Je("selected", `
 color: var(--n-option-text-color-disabled);
 `), ae("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), Y("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [bs({
    enterScale: "0.5"
  })])])]), Fb = ie({
    name: "InternalSelectMenu",
    props: Object.assign(Object.assign({}, ve.props), {
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
      const o = ve("InternalSelectMenu", "-internal-select-menu", Rb, ms, e, se(e, "clsPrefix")), t = F(null), r = F(null), n = F(null), i = E(() => e.treeMate.getFlattenedNodes()), l = E(() => eb(i.value)), a = F(null);
      function s() {
        const { treeMate: k } = e;
        let L = null;
        const { value: re } = e;
        re === null ? L = k.getFirstAvailableNode() : (e.multiple ? L = k.getNode((re || [])[(re || []).length - 1]) : L = k.getNode(re), (!L || L.disabled) && (L = k.getFirstAvailableNode())), P(L || null);
      }
      function c() {
        const { value: k } = a;
        k && !e.treeMate.getNode(k.key) && (a.value = null);
      }
      let u;
      ye(() => e.show, (k) => {
        k ? u = ye(() => e.treeMate, () => {
          e.resetMenuOnOptionsChange ? (e.autoPending ? s() : c(), Ct(M)) : c();
        }, {
          immediate: !0
        }) : u == null || u();
      }, {
        immediate: !0
      }), Qe(() => {
        u == null || u();
      });
      const f = E(() => gn(o.value.self[fe("optionHeight", e.size)])), v = E(() => jr(o.value.self[fe("padding", e.size)])), p = E(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), d = E(() => {
        const k = i.value;
        return k && k.length === 0;
      });
      function m(k) {
        const { onToggle: L } = e;
        L && L(k);
      }
      function C(k) {
        const { onScroll: L } = e;
        L && L(k);
      }
      function h(k) {
        var L;
        (L = n.value) === null || L === void 0 || L.sync(), C(k);
      }
      function S() {
        var k;
        (k = n.value) === null || k === void 0 || k.sync();
      }
      function D() {
        const { value: k } = a;
        return k || null;
      }
      function T(k, L) {
        L.disabled || P(L, !1);
      }
      function z(k, L) {
        L.disabled || m(L);
      }
      function O(k) {
        var L;
        mr(k, "action") || (L = e.onKeyup) === null || L === void 0 || L.call(e, k);
      }
      function b(k) {
        var L;
        mr(k, "action") || (L = e.onKeydown) === null || L === void 0 || L.call(e, k);
      }
      function $(k) {
        var L;
        (L = e.onMousedown) === null || L === void 0 || L.call(e, k), !e.focusable && k.preventDefault();
      }
      function w() {
        const { value: k } = a;
        k && P(k.getNext({ loop: !0 }), !0);
      }
      function x() {
        const { value: k } = a;
        k && P(k.getPrev({ loop: !0 }), !0);
      }
      function P(k, L = !1) {
        a.value = k, L && M();
      }
      function M() {
        var k, L;
        const re = a.value;
        if (!re)
          return;
        const ue = l.value(re.key);
        ue !== null && (e.virtualScroll ? (k = r.value) === null || k === void 0 || k.scrollTo({ index: ue }) : (L = n.value) === null || L === void 0 || L.scrollTo({
          index: ue,
          elSize: f.value
        }));
      }
      function W(k) {
        var L, re;
        !((L = t.value) === null || L === void 0) && L.contains(k.target) && ((re = e.onFocus) === null || re === void 0 || re.call(e, k));
      }
      function H(k) {
        var L, re;
        !((L = t.value) === null || L === void 0) && L.contains(k.relatedTarget) || (re = e.onBlur) === null || re === void 0 || re.call(e, k);
      }
      ro(jn, {
        handleOptionMouseEnter: T,
        handleOptionClick: z,
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
      }), ro(na, t), Ve(() => {
        const { value: k } = n;
        k && k.sync();
      });
      const N = E(() => {
        const { size: k } = e, { common: { cubicBezierEaseInOut: L }, self: { height: re, borderRadius: ue, color: ze, groupHeaderTextColor: ao, actionDividerColor: Te, optionTextColorPressed: eo, optionTextColor: Ae, optionTextColorDisabled: De, optionTextColorActive: xe, optionOpacityDisabled: Ge, optionCheckColor: Re, actionTextColor: Fe, optionColorPending: so, optionColorActive: co, loadingColor: uo, loadingSize: Ho, optionColorActivePending: Bo, [fe("optionFontSize", k)]: wo, [fe("optionHeight", k)]: $o, [fe("optionPadding", k)]: Me } } = o.value;
        return {
          "--n-height": re,
          "--n-action-divider-color": Te,
          "--n-action-text-color": Fe,
          "--n-bezier": L,
          "--n-border-radius": ue,
          "--n-color": ze,
          "--n-option-font-size": wo,
          "--n-group-header-text-color": ao,
          "--n-option-check-color": Re,
          "--n-option-color-pending": so,
          "--n-option-color-active": co,
          "--n-option-color-active-pending": Bo,
          "--n-option-height": $o,
          "--n-option-opacity-disabled": Ge,
          "--n-option-text-color": Ae,
          "--n-option-text-color-active": xe,
          "--n-option-text-color-disabled": De,
          "--n-option-text-color-pressed": eo,
          "--n-option-padding": Me,
          "--n-option-padding-left": jr(Me, "left"),
          "--n-option-padding-right": jr(Me, "right"),
          "--n-loading-color": uo,
          "--n-loading-size": Ho
        };
      }), { inlineThemeDisabled: G } = e, V = G ? Do("internal-select-menu", E(() => e.size[0]), N, e) : void 0, oe = {
        selfRef: t,
        next: w,
        prev: x,
        getPendingTmNode: D
      };
      return Ta(t, e.onResize), Object.assign({
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
        doScroll: C,
        handleFocusin: W,
        handleFocusout: H,
        handleKeyUp: O,
        handleKeyDown: b,
        handleMouseDown: $,
        handleVirtualListResize: S,
        handleVirtualListScroll: h,
        cssVars: G ? void 0 : N,
        themeClass: V == null ? void 0 : V.themeClass,
        onRender: V == null ? void 0 : V.onRender
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
          y(as, { clsPrefix: t, strokeWidth: 20 })
        ) : this.empty ? y("div", { class: `${t}-base-select-menu__empty`, "data-empty": !0 }, Nn(e.empty, () => [
          y(Tb, { theme: r.peers.Empty, themeOverrides: r.peerOverrides.Empty })
        ])) : y(Eb, { ref: "scrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, scrollable: this.scrollable, container: o ? this.virtualListContainer : void 0, content: o ? this.virtualListContent : void 0, onScroll: o ? void 0 : this.doScroll }, {
          default: () => o ? y(Hu, { ref: "virtualListRef", class: `${t}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: !1, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: !0 }, {
            default: ({ item: l }) => l.isGroup ? y(xl, { key: l.key, clsPrefix: t, tmNode: l }) : l.ignored ? null : y(Cl, { clsPrefix: t, key: l.key, tmNode: l })
          }) : y("div", { class: `${t}-base-select-menu-option-wrapper`, style: {
            paddingTop: this.padding.top,
            paddingBottom: this.padding.bottom
          } }, this.flattenedNodes.map((l) => l.isGroup ? y(xl, { key: l.key, clsPrefix: t, tmNode: l }) : y(Cl, { clsPrefix: t, key: l.key, tmNode: l })))
        }),
        vt(e.action, (l) => l && [
          y("div", { class: `${t}-base-select-menu__action`, "data-action": !0, key: "action" }, l),
          y(Rm, { onFocus: this.onTabOut, key: "focus-detector" })
        ])
      );
    }
  }), Lb = {
    space: "6px",
    spaceArrow: "10px",
    arrowOffset: "10px",
    arrowOffsetVertical: "10px",
    arrowHeight: "6px",
    padding: "8px 14px"
  }, Cs = (e) => {
    const { boxShadow2: o, popoverColor: t, textColor2: r, borderRadius: n, fontSize: i, dividerColor: l } = e;
    return Object.assign(Object.assign({}, Lb), {
      fontSize: i,
      borderRadius: n,
      color: t,
      dividerColor: l,
      textColor: r,
      boxShadow: o
    });
  }, Wb = {
    name: "Popover",
    common: So,
    self: Cs
  }, li = Wb, Nb = {
    name: "Popover",
    common: A,
    self: Cs
  }, et = Nb, an = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, ge = "var(--n-arrow-height) * 1.414", jb = U([Q("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [U(">", [Q("scrollbar", `
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
 `), ae("scrollable, show-header-or-footer", [Y("content", `
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
    U("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
    U("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
    U("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
    U("&.popover-transition-leave-active", `
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
 `), ...Bg({
    top: ["right-start", "left-start"],
    right: ["top-end", "bottom-end"],
    bottom: ["right-end", "left-end"],
    left: ["top-start", "bottom-start"]
  }, (e, o) => {
    const t = ["right", "left"].includes(o), r = t ? "width" : "height";
    return e.map((n) => {
      const i = n.split("-")[1] === "end", a = `calc((${`var(--v-target-${r}, 0px)`} - ${ge}) / 2)`, s = vo(n);
      return U(`[v-placement="${n}"] >`, [Q("popover-shared", [ae("center-arrow", [Q("popover-arrow", `${o}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${t ? "left" : "top"}));`)])])]);
    });
  })]);
  function vo(e) {
    return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
  }
  function We(e, o) {
    const t = e.split("-")[0], r = ["top", "bottom"].includes(t) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
    return U(`[v-placement="${e}"] >`, [Q("popover-shared", `
 margin-${an[t]}: var(--n-space);
 `, [ae("show-arrow", `
 margin-${an[t]}: var(--n-space-arrow);
 `), ae("overlap", `
 margin: 0;
 `), Md("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${t}: 100%;
 ${an[t]}: auto;
 ${r}
 `, [Q("popover-arrow", o)])])]);
  }
  const xs = Object.assign(Object.assign({}, ve.props), {
    to: bo.propTo,
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
  }), Vb = ({ arrowStyle: e, clsPrefix: o }) => y(
    "div",
    { key: "__popover-arrow__", class: `${o}-popover-arrow-wrapper` },
    y("div", { class: `${o}-popover-arrow`, style: e })
  ), Ub = ie({
    name: "PopoverBody",
    inheritAttrs: !1,
    props: xs,
    setup(e, { slots: o, attrs: t }) {
      const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = Tt(e), l = ve("Popover", "-popover", jb, li, e, n), a = F(null), s = he("NPopover"), c = F(null), u = F(e.show), f = F(!1);
      go(() => {
        const { show: b } = e;
        b && !kd() && !e.internalDeactivateImmediately && (f.value = !0);
      });
      const v = E(() => {
        const { trigger: b, onClickoutside: $ } = e, w = [], { positionManuallyRef: { value: x } } = s;
        return x || (b === "click" && !$ && w.push([
          Cr,
          T,
          void 0,
          { capture: !0 }
        ]), b === "hover" && w.push([Xd, D])), $ && w.push([
          Cr,
          T,
          void 0,
          { capture: !0 }
        ]), (e.displayDirective === "show" || e.animated && f.value) && w.push([Ol, e.show]), w;
      }), p = E(() => {
        const b = e.width === "trigger" ? void 0 : fr(e.width), $ = [];
        b && $.push({ width: b });
        const { maxWidth: w, minWidth: x } = e;
        return w && $.push({ maxWidth: fr(w) }), x && $.push({ maxWidth: fr(x) }), i || $.push(d.value), $;
      }), d = E(() => {
        const { common: { cubicBezierEaseInOut: b, cubicBezierEaseIn: $, cubicBezierEaseOut: w }, self: { space: x, spaceArrow: P, padding: M, fontSize: W, textColor: H, dividerColor: N, color: G, boxShadow: V, borderRadius: oe, arrowHeight: k, arrowOffset: L, arrowOffsetVertical: re } } = l.value;
        return {
          "--n-box-shadow": V,
          "--n-bezier": b,
          "--n-bezier-ease-in": $,
          "--n-bezier-ease-out": w,
          "--n-font-size": W,
          "--n-text-color": H,
          "--n-color": G,
          "--n-divider-color": N,
          "--n-border-radius": oe,
          "--n-arrow-height": k,
          "--n-arrow-offset": L,
          "--n-arrow-offset-vertical": re,
          "--n-padding": M,
          "--n-space": x,
          "--n-space-arrow": P
        };
      }), m = i ? Do("popover", void 0, d, e) : void 0;
      s.setBodyInstance({
        syncPosition: C
      }), Qe(() => {
        s.setBodyInstance(null);
      }), ye(se(e, "show"), (b) => {
        e.animated || (b ? u.value = !0 : u.value = !1);
      });
      function C() {
        var b;
        (b = a.value) === null || b === void 0 || b.syncPosition();
      }
      function h(b) {
        e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(b);
      }
      function S(b) {
        e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(b);
      }
      function D(b) {
        e.trigger === "hover" && !z().contains(Nt(b)) && s.handleMouseMoveOutside(b);
      }
      function T(b) {
        (e.trigger === "click" && !z().contains(Nt(b)) || e.onClickoutside) && s.handleClickOutside(b);
      }
      function z() {
        return s.getTriggerElement();
      }
      ro(aa, c), ro(la, null), ro(ia, null);
      function O() {
        if (m == null || m.onRender(), !(e.displayDirective === "show" || e.show || e.animated && f.value))
          return null;
        let $;
        const w = s.internalRenderBodyRef.value, { value: x } = n;
        if (w)
          $ = w(
            // The popover class and overlap class must exists, they will be used
            // to place the body & transition animation.
            // Shadow class exists for reuse box-shadow.
            [
              `${x}-popover-shared`,
              m == null ? void 0 : m.themeClass.value,
              e.overlap && `${x}-popover-shared--overlap`,
              e.showArrow && `${x}-popover-shared--show-arrow`,
              e.arrowPointToCenter && `${x}-popover-shared--center-arrow`
            ],
            c,
            p.value,
            h,
            S
          );
        else {
          const { value: P } = s.extraClassRef, { internalTrapFocus: M } = e, W = !bi(o.header) || !bi(o.footer), H = () => {
            var N;
            const G = W ? y(
              to,
              null,
              vt(o.header, (k) => k ? y("div", { class: `${x}-popover__header`, style: e.headerStyle }, k) : null),
              vt(o.default, (k) => k ? y("div", { class: `${x}-popover__content`, style: e.contentStyle }, o) : null),
              vt(o.footer, (k) => k ? y("div", { class: `${x}-popover__footer`, style: e.footerStyle }, k) : null)
            ) : e.scrollable ? (N = o.default) === null || N === void 0 ? void 0 : N.call(o) : y("div", { class: `${x}-popover__content`, style: e.contentStyle }, o), V = e.scrollable ? y(_b, { contentClass: W ? void 0 : `${x}-popover__content`, contentStyle: W ? void 0 : e.contentStyle }, {
              default: () => G
            }) : G, oe = e.showArrow ? Vb({
              arrowStyle: e.arrowStyle,
              clsPrefix: x
            }) : null;
            return [V, oe];
          };
          $ = y("div", kr({
            class: [
              `${x}-popover`,
              `${x}-popover-shared`,
              m == null ? void 0 : m.themeClass.value,
              P.map((N) => `${x}-${N}`),
              {
                [`${x}-popover--scrollable`]: e.scrollable,
                [`${x}-popover--show-header-or-footer`]: W,
                [`${x}-popover--raw`]: e.raw,
                [`${x}-popover-shared--overlap`]: e.overlap,
                [`${x}-popover-shared--show-arrow`]: e.showArrow,
                [`${x}-popover-shared--center-arrow`]: e.arrowPointToCenter
              }
            ],
            ref: c,
            style: p.value,
            onKeydown: s.handleKeydown,
            onMouseenter: h,
            onMouseleave: S
          }, t), M ? y(Ru, { active: e.show, autoFocus: !0 }, { default: H }) : H());
        }
        return Xt($, v.value);
      }
      return {
        displayed: f,
        namespace: r,
        isMounted: s.isMountedRef,
        zIndex: s.zIndexRef,
        followerRef: a,
        adjustedTo: bo(e),
        followerEnabled: u,
        renderContentNode: O
      };
    },
    render() {
      return y(va, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === bo.tdkey }, {
        default: () => this.animated ? y(yt, {
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
  }), Gb = Object.keys(xs), Kb = {
    focus: ["onFocus", "onBlur"],
    click: ["onClick"],
    hover: ["onMouseenter", "onMouseleave"],
    manual: [],
    nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
  };
  function Xb(e, o, t) {
    Kb[o].forEach((r) => {
      e.props ? e.props = Object.assign({}, e.props) : e.props = {};
      const n = e.props[r], i = t[r];
      n ? e.props[r] = (...l) => {
        n(...l), i(...l);
      } : e.props[r] = i;
    });
  }
  const Yb = xt("").type, ys = {
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
    to: bo.propTo,
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
  }, qb = Object.assign(Object.assign(Object.assign({}, ve.props), ys), { internalOnAfterLeave: Function, internalRenderBody: Function }), Ss = ie({
    name: "Popover",
    inheritAttrs: !1,
    props: qb,
    __popover__: !0,
    setup(e) {
      process.env.NODE_ENV !== "production" && go(() => {
        e.maxWidth !== void 0 && Mo("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && Mo("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && Mo("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && Mo("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && Mo("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
      });
      const o = Dr(), t = F(null), r = E(() => e.show), n = F(e.defaultShow), i = yn(r, n), l = Ze(() => e.disabled ? !1 : i.value), a = () => {
        if (e.disabled)
          return !0;
        const { getDisabled: H } = e;
        return !!(H != null && H());
      }, s = () => a() ? !1 : i.value, c = ra(e, ["arrow", "showArrow"]), u = E(() => e.overlap ? !1 : c.value);
      let f = null;
      const v = F(null), p = F(null), d = Ze(() => e.x !== void 0 && e.y !== void 0);
      function m(H) {
        const { "onUpdate:show": N, onUpdateShow: G, onShow: V, onHide: oe } = e;
        n.value = H, N && we(N, H), G && we(G, H), H && V && we(V, !0), H && oe && we(oe, !1);
      }
      function C() {
        f && f.syncPosition();
      }
      function h() {
        const { value: H } = v;
        H && (window.clearTimeout(H), v.value = null);
      }
      function S() {
        const { value: H } = p;
        H && (window.clearTimeout(H), p.value = null);
      }
      function D() {
        const H = a();
        if (e.trigger === "focus" && !H) {
          if (s())
            return;
          m(!0);
        }
      }
      function T() {
        const H = a();
        if (e.trigger === "focus" && !H) {
          if (!s())
            return;
          m(!1);
        }
      }
      function z() {
        const H = a();
        if (e.trigger === "hover" && !H) {
          if (S(), v.value !== null || s())
            return;
          const N = () => {
            m(!0), v.value = null;
          }, { delay: G } = e;
          G === 0 ? N() : v.value = window.setTimeout(N, G);
        }
      }
      function O() {
        const H = a();
        if (e.trigger === "hover" && !H) {
          if (h(), p.value !== null || !s())
            return;
          const N = () => {
            m(!1), p.value = null;
          }, { duration: G } = e;
          G === 0 ? N() : p.value = window.setTimeout(N, G);
        }
      }
      function b() {
        O();
      }
      function $(H) {
        var N;
        s() && (e.trigger === "click" && (h(), S(), m(!1)), (N = e.onClickoutside) === null || N === void 0 || N.call(e, H));
      }
      function w() {
        if (e.trigger === "click" && !a()) {
          h(), S();
          const H = !s();
          m(H);
        }
      }
      function x(H) {
        e.internalTrapFocus && H.key === "Escape" && (h(), S(), m(!1));
      }
      function P(H) {
        n.value = H;
      }
      function M() {
        var H;
        return (H = t.value) === null || H === void 0 ? void 0 : H.targetRef;
      }
      function W(H) {
        f = H;
      }
      return ro("NPopover", {
        getTriggerElement: M,
        handleKeydown: x,
        handleMouseEnter: z,
        handleMouseLeave: O,
        handleClickOutside: $,
        handleMouseMoveOutside: b,
        setBodyInstance: W,
        positionManuallyRef: d,
        isMountedRef: o,
        zIndexRef: se(e, "zIndex"),
        extraClassRef: se(e, "internalExtraClass"),
        internalRenderBodyRef: se(e, "internalRenderBody")
      }), go(() => {
        i.value && a() && m(!1);
      }), {
        binderInstRef: t,
        positionManually: d,
        mergedShowConsideringDisabledProp: l,
        // if to show popover body
        uncontrolledShow: n,
        mergedShowArrow: u,
        getMergedShow: s,
        setShow: P,
        handleClick: w,
        handleMouseEnter: z,
        handleMouseLeave: O,
        handleFocus: D,
        handleBlur: T,
        syncPosition: C
      };
    },
    render() {
      var e;
      const { positionManually: o, $slots: t } = this;
      let r, n = !1;
      if (!o && (t.activator ? r = mi(t, "activator") : r = mi(t, "trigger"), r)) {
        r = Cc(r), r = r.type === Yb ? y("span", [r]) : r;
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
          Xb(r, l ? "nested" : o ? "manual" : this.trigger, s);
        }
      }
      return y(ua, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
        default: () => {
          this.mergedShowConsideringDisabledProp;
          const i = this.getMergedShow();
          return [
            this.internalTrapFocus && i ? Xt(y("div", { style: { position: "fixed", inset: 0 } }), [
              [
                ha,
                {
                  enabled: i,
                  zIndex: this.zIndex
                }
              ]
            ]) : null,
            o ? null : y(fa, null, {
              default: () => r
            }),
            y(Ub, id(this.$props, Gb, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
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
  }), ws = {
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
  }, Jb = {
    name: "Tag",
    common: A,
    self(e) {
      const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, tagColor: f, opacityDisabled: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: m, closeColorHover: C, closeColorPressed: h, borderRadiusSmall: S, fontSizeMini: D, fontSizeTiny: T, fontSizeSmall: z, fontSizeMedium: O, heightMini: b, heightTiny: $, heightSmall: w, heightMedium: x, buttonColor2Hover: P, buttonColor2Pressed: M, fontWeightStrong: W } = e;
      return Object.assign(Object.assign({}, ws), {
        closeBorderRadius: S,
        heightTiny: b,
        heightSmall: $,
        heightMedium: w,
        heightLarge: x,
        borderRadius: S,
        opacityDisabled: v,
        fontSizeTiny: D,
        fontSizeSmall: T,
        fontSizeMedium: z,
        fontSizeLarge: O,
        fontWeightStrong: W,
        // checked
        textColorCheckable: o,
        textColorHoverCheckable: o,
        textColorPressedCheckable: o,
        textColorChecked: c,
        colorCheckable: "#0000",
        colorHoverCheckable: P,
        colorPressedCheckable: M,
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
        closeIconColorPressed: m,
        closeColorHover: C,
        closeColorPressed: h,
        borderPrimary: `1px solid ${_(n, { alpha: 0.3 })}`,
        textColorPrimary: n,
        colorPrimary: _(n, { alpha: 0.16 }),
        colorBorderedPrimary: "#0000",
        closeIconColorPrimary: pe(n, { lightness: 0.7 }),
        closeIconColorHoverPrimary: pe(n, { lightness: 0.7 }),
        closeIconColorPressedPrimary: pe(n, {
          lightness: 0.7
        }),
        closeColorHoverPrimary: _(n, { alpha: 0.16 }),
        closeColorPressedPrimary: _(n, { alpha: 0.12 }),
        borderInfo: `1px solid ${_(i, { alpha: 0.3 })}`,
        textColorInfo: i,
        colorInfo: _(i, { alpha: 0.16 }),
        colorBorderedInfo: "#0000",
        closeIconColorInfo: pe(i, { alpha: 0.7 }),
        closeIconColorHoverInfo: pe(i, { alpha: 0.7 }),
        closeIconColorPressedInfo: pe(i, { alpha: 0.7 }),
        closeColorHoverInfo: _(i, { alpha: 0.16 }),
        closeColorPressedInfo: _(i, { alpha: 0.12 }),
        borderSuccess: `1px solid ${_(l, { alpha: 0.3 })}`,
        textColorSuccess: l,
        colorSuccess: _(l, { alpha: 0.16 }),
        colorBorderedSuccess: "#0000",
        closeIconColorSuccess: pe(l, { alpha: 0.7 }),
        closeIconColorHoverSuccess: pe(l, { alpha: 0.7 }),
        closeIconColorPressedSuccess: pe(l, { alpha: 0.7 }),
        closeColorHoverSuccess: _(l, { alpha: 0.16 }),
        closeColorPressedSuccess: _(l, { alpha: 0.12 }),
        borderWarning: `1px solid ${_(a, { alpha: 0.3 })}`,
        textColorWarning: a,
        colorWarning: _(a, { alpha: 0.16 }),
        colorBorderedWarning: "#0000",
        closeIconColorWarning: pe(a, { alpha: 0.7 }),
        closeIconColorHoverWarning: pe(a, { alpha: 0.7 }),
        closeIconColorPressedWarning: pe(a, { alpha: 0.7 }),
        closeColorHoverWarning: _(a, { alpha: 0.16 }),
        closeColorPressedWarning: _(a, { alpha: 0.11 }),
        borderError: `1px solid ${_(s, { alpha: 0.3 })}`,
        textColorError: s,
        colorError: _(s, { alpha: 0.16 }),
        colorBorderedError: "#0000",
        closeIconColorError: pe(s, { alpha: 0.7 }),
        closeIconColorHoverError: pe(s, { alpha: 0.7 }),
        closeIconColorPressedError: pe(s, { alpha: 0.7 }),
        closeColorHoverError: _(s, { alpha: 0.16 }),
        closeColorPressedError: _(s, { alpha: 0.12 })
      });
    }
  }, $s = Jb, Zb = (e) => {
    const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, opacityDisabled: f, tagColor: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: m, borderRadiusSmall: C, fontSizeMini: h, fontSizeTiny: S, fontSizeSmall: D, fontSizeMedium: T, heightMini: z, heightTiny: O, heightSmall: b, heightMedium: $, closeColorHover: w, closeColorPressed: x, buttonColor2Hover: P, buttonColor2Pressed: M, fontWeightStrong: W } = e;
    return Object.assign(Object.assign({}, ws), {
      closeBorderRadius: C,
      heightTiny: z,
      heightSmall: O,
      heightMedium: b,
      heightLarge: $,
      borderRadius: C,
      opacityDisabled: f,
      fontSizeTiny: h,
      fontSizeSmall: S,
      fontSizeMedium: D,
      fontSizeLarge: T,
      fontWeightStrong: W,
      // checked
      textColorCheckable: o,
      textColorHoverCheckable: o,
      textColorPressedCheckable: o,
      textColorChecked: c,
      colorCheckable: "#0000",
      colorHoverCheckable: P,
      colorPressedCheckable: M,
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
      closeIconColorPressed: m,
      closeColorHover: w,
      closeColorPressed: x,
      borderPrimary: `1px solid ${_(n, { alpha: 0.3 })}`,
      textColorPrimary: n,
      colorPrimary: _(n, { alpha: 0.12 }),
      colorBorderedPrimary: _(n, { alpha: 0.1 }),
      closeIconColorPrimary: n,
      closeIconColorHoverPrimary: n,
      closeIconColorPressedPrimary: n,
      closeColorHoverPrimary: _(n, { alpha: 0.12 }),
      closeColorPressedPrimary: _(n, { alpha: 0.18 }),
      borderInfo: `1px solid ${_(i, { alpha: 0.3 })}`,
      textColorInfo: i,
      colorInfo: _(i, { alpha: 0.12 }),
      colorBorderedInfo: _(i, { alpha: 0.1 }),
      closeIconColorInfo: i,
      closeIconColorHoverInfo: i,
      closeIconColorPressedInfo: i,
      closeColorHoverInfo: _(i, { alpha: 0.12 }),
      closeColorPressedInfo: _(i, { alpha: 0.18 }),
      borderSuccess: `1px solid ${_(l, { alpha: 0.3 })}`,
      textColorSuccess: l,
      colorSuccess: _(l, { alpha: 0.12 }),
      colorBorderedSuccess: _(l, { alpha: 0.1 }),
      closeIconColorSuccess: l,
      closeIconColorHoverSuccess: l,
      closeIconColorPressedSuccess: l,
      closeColorHoverSuccess: _(l, { alpha: 0.12 }),
      closeColorPressedSuccess: _(l, { alpha: 0.18 }),
      borderWarning: `1px solid ${_(a, { alpha: 0.35 })}`,
      textColorWarning: a,
      colorWarning: _(a, { alpha: 0.15 }),
      colorBorderedWarning: _(a, { alpha: 0.12 }),
      closeIconColorWarning: a,
      closeIconColorHoverWarning: a,
      closeIconColorPressedWarning: a,
      closeColorHoverWarning: _(a, { alpha: 0.12 }),
      closeColorPressedWarning: _(a, { alpha: 0.18 }),
      borderError: `1px solid ${_(s, { alpha: 0.23 })}`,
      textColorError: s,
      colorError: _(s, { alpha: 0.1 }),
      colorBorderedError: _(s, { alpha: 0.08 }),
      closeIconColorError: s,
      closeIconColorHoverError: s,
      closeIconColorPressedError: s,
      closeColorHoverError: _(s, { alpha: 0.12 }),
      closeColorPressedError: _(s, { alpha: 0.18 })
    });
  }, Qb = {
    name: "Tag",
    common: So,
    self: Zb
  }, e0 = Qb, o0 = {
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
  }, t0 = Q("tag", `
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
`, [ae("strong", `
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
 `), ae("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [Y("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), Y("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), ae("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), ae("icon, avatar", [ae("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), ae("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), ae("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [Je("disabled", [U("&:hover", "background-color: var(--n-color-hover-checkable);", [Je("checked", "color: var(--n-text-color-hover-checkable);")]), U("&:active", "background-color: var(--n-color-pressed-checkable);", [Je("checked", "color: var(--n-text-color-pressed-checkable);")])]), ae("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Je("disabled", [U("&:hover", "background-color: var(--n-color-checked-hover);"), U("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), r0 = Object.assign(Object.assign(Object.assign({}, ve.props), o0), {
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
  }), n0 = "n-tag", sn = ie({
    name: "Tag",
    props: r0,
    setup(e) {
      process.env.NODE_ENV !== "production" && go(() => {
        e.onCheckedChange !== void 0 && Mo("tag", "`on-checked-change` is deprecated, please use `on-update:checked` instead");
      });
      const o = F(null), { mergedBorderedRef: t, mergedClsPrefixRef: r, inlineThemeDisabled: n, mergedRtlRef: i } = Tt(e), l = ve("Tag", "-tag", t0, e0, e, r);
      ro(n0, {
        roundRef: se(e, "round")
      });
      function a(p) {
        if (!e.disabled && e.checkable) {
          const { checked: d, onCheckedChange: m, onUpdateChecked: C, "onUpdate:checked": h } = e;
          C && C(!d), h && h(!d), m && m(!d);
        }
      }
      function s(p) {
        if (e.triggerClickOnClose || p.stopPropagation(), !e.disabled) {
          const { onClose: d } = e;
          d && we(d, p);
        }
      }
      const c = {
        setTextContent(p) {
          const { value: d } = o;
          d && (d.textContent = p);
        }
      }, u = ns("Tag", i, r), f = E(() => {
        const { type: p, size: d, color: { color: m, textColor: C } = {} } = e, { common: { cubicBezierEaseInOut: h }, self: { padding: S, closeMargin: D, closeMarginRtl: T, borderRadius: z, opacityDisabled: O, textColorCheckable: b, textColorHoverCheckable: $, textColorPressedCheckable: w, textColorChecked: x, colorCheckable: P, colorHoverCheckable: M, colorPressedCheckable: W, colorChecked: H, colorCheckedHover: N, colorCheckedPressed: G, closeBorderRadius: V, fontWeightStrong: oe, [fe("colorBordered", p)]: k, [fe("closeSize", d)]: L, [fe("closeIconSize", d)]: re, [fe("fontSize", d)]: ue, [fe("height", d)]: ze, [fe("color", p)]: ao, [fe("textColor", p)]: Te, [fe("border", p)]: eo, [fe("closeIconColor", p)]: Ae, [fe("closeIconColorHover", p)]: De, [fe("closeIconColorPressed", p)]: xe, [fe("closeColorHover", p)]: Ge, [fe("closeColorPressed", p)]: Re } } = l.value;
        return {
          "--n-font-weight-strong": oe,
          "--n-avatar-size-override": `calc(${ze} - 8px)`,
          "--n-bezier": h,
          "--n-border-radius": z,
          "--n-border": eo,
          "--n-close-icon-size": re,
          "--n-close-color-pressed": Re,
          "--n-close-color-hover": Ge,
          "--n-close-border-radius": V,
          "--n-close-icon-color": Ae,
          "--n-close-icon-color-hover": De,
          "--n-close-icon-color-pressed": xe,
          "--n-close-icon-color-disabled": Ae,
          "--n-close-margin": D,
          "--n-close-margin-rtl": T,
          "--n-close-size": L,
          "--n-color": m || (t.value ? k : ao),
          "--n-color-checkable": P,
          "--n-color-checked": H,
          "--n-color-checked-hover": N,
          "--n-color-checked-pressed": G,
          "--n-color-hover-checkable": M,
          "--n-color-pressed-checkable": W,
          "--n-font-size": ue,
          "--n-height": ze,
          "--n-opacity-disabled": O,
          "--n-padding": S,
          "--n-text-color": C || Te,
          "--n-text-color-checkable": b,
          "--n-text-color-checked": x,
          "--n-text-color-hover-checkable": $,
          "--n-text-color-pressed-checkable": w
        };
      }), v = n ? Do("tag", E(() => {
        let p = "";
        const { type: d, size: m, color: { color: C, textColor: h } = {} } = e;
        return p += d[0], p += m[0], C && (p += `a${xi(C)}`), h && (p += `b${xi(h)}`), t.value && (p += "c"), p;
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
      const c = vt(s.avatar, (f) => f && y("div", { class: `${t}-tag__avatar` }, f)), u = vt(s.icon, (f) => f && y("div", { class: `${t}-tag__icon` }, f));
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
        !this.checkable && n ? y(Am, { clsPrefix: t, class: `${t}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: l, isButtonTag: this.internalCloseIsButtonTag, absolute: !0 }) : null,
        !this.checkable && this.mergedBordered ? y("div", { class: `${t}-tag__border`, style: { borderColor: i } }) : null
      );
    }
  }), i0 = Q("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [U(">", [Y("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [U("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), U("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), Y("placeholder", `
 display: flex;
 `), Y("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [_n({
    originalTransform: "translateX(-50%) translateY(-50%)",
    left: "50%",
    top: "50%"
  })])])]), l0 = ie({
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
      return Rr("-base-clear", i0, se(e, "clsPrefix")), {
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
        y(ls, null, {
          default: () => {
            var o, t;
            return this.show ? y("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Nn(this.$slots.icon, () => [
              y(qt, { clsPrefix: e }, {
                default: () => y(Dm, null)
              })
            ])) : y("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (t = (o = this.$slots).placeholder) === null || t === void 0 ? void 0 : t.call(o));
          }
        })
      );
    }
  }), a0 = ie({
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
        return y(as, { clsPrefix: t, class: `${t}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
          default: () => e.showArrow ? y(l0, { clsPrefix: t, show: e.showClear, onClear: e.onClear }, {
            placeholder: () => y(qt, { clsPrefix: t, class: `${t}-base-suffix__arrow` }, {
              default: () => Nn(o.default, () => [
                y(_m, null)
              ])
            })
          }) : null
        });
      };
    }
  }), Ps = {
    paddingSingle: "0 26px 0 12px",
    paddingMultiple: "3px 26px 0 12px",
    clearSize: "16px",
    arrowSize: "16px"
  }, s0 = (e) => {
    const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderColor: v, iconColor: p, iconColorDisabled: d, clearColor: m, clearColorHover: C, clearColorPressed: h, placeholderColor: S, placeholderColorDisabled: D, fontSizeTiny: T, fontSizeSmall: z, fontSizeMedium: O, fontSizeLarge: b, heightTiny: $, heightSmall: w, heightMedium: x, heightLarge: P } = e;
    return Object.assign(Object.assign({}, Ps), {
      fontSizeTiny: T,
      fontSizeSmall: z,
      fontSizeMedium: O,
      fontSizeLarge: b,
      heightTiny: $,
      heightSmall: w,
      heightMedium: x,
      heightLarge: P,
      borderRadius: o,
      // default
      textColor: t,
      textColorDisabled: r,
      placeholderColor: S,
      placeholderColorDisabled: D,
      color: n,
      colorDisabled: i,
      colorActive: n,
      border: `1px solid ${v}`,
      borderHover: `1px solid ${a}`,
      borderActive: `1px solid ${l}`,
      borderFocus: `1px solid ${a}`,
      boxShadowHover: "none",
      boxShadowActive: `0 0 0 2px ${_(l, {
        alpha: 0.2
      })}`,
      boxShadowFocus: `0 0 0 2px ${_(l, {
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
      boxShadowActiveWarning: `0 0 0 2px ${_(s, {
        alpha: 0.2
      })}`,
      boxShadowFocusWarning: `0 0 0 2px ${_(s, {
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
      boxShadowActiveError: `0 0 0 2px ${_(u, {
        alpha: 0.2
      })}`,
      boxShadowFocusError: `0 0 0 2px ${_(u, {
        alpha: 0.2
      })}`,
      colorActiveError: n,
      caretColorError: u,
      clearColor: m,
      clearColorHover: C,
      clearColorPressed: h
    });
  }, c0 = {
    name: "InternalSelection",
    common: So,
    peers: {
      Popover: li
    },
    self: s0
  }, Ts = c0, d0 = {
    name: "InternalSelection",
    common: A,
    peers: {
      Popover: et
    },
    self(e) {
      const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, iconColor: v, iconColorDisabled: p, clearColor: d, clearColorHover: m, clearColorPressed: C, placeholderColor: h, placeholderColorDisabled: S, fontSizeTiny: D, fontSizeSmall: T, fontSizeMedium: z, fontSizeLarge: O, heightTiny: b, heightSmall: $, heightMedium: w, heightLarge: x } = e;
      return Object.assign(Object.assign({}, Ps), {
        fontSizeTiny: D,
        fontSizeSmall: T,
        fontSizeMedium: z,
        fontSizeLarge: O,
        heightTiny: b,
        heightSmall: $,
        heightMedium: w,
        heightLarge: x,
        borderRadius: o,
        // default
        textColor: t,
        textColorDisabled: r,
        placeholderColor: h,
        placeholderColorDisabled: S,
        color: n,
        colorDisabled: i,
        colorActive: _(l, { alpha: 0.1 }),
        border: "1px solid #0000",
        borderHover: `1px solid ${a}`,
        borderActive: `1px solid ${l}`,
        borderFocus: `1px solid ${a}`,
        boxShadowHover: "none",
        boxShadowActive: `0 0 8px 0 ${_(l, {
          alpha: 0.4
        })}`,
        boxShadowFocus: `0 0 8px 0 ${_(l, {
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
        boxShadowActiveWarning: `0 0 8px 0 ${_(s, {
          alpha: 0.4
        })}`,
        boxShadowFocusWarning: `0 0 8px 0 ${_(s, {
          alpha: 0.4
        })}`,
        colorActiveWarning: _(s, { alpha: 0.1 }),
        caretColorWarning: s,
        // error
        borderError: `1px solid ${u}`,
        borderHoverError: `1px solid ${f}`,
        borderActiveError: `1px solid ${u}`,
        borderFocusError: `1px solid ${f}`,
        boxShadowHoverError: "none",
        boxShadowActiveError: `0 0 8px 0 ${_(u, {
          alpha: 0.4
        })}`,
        boxShadowFocusError: `0 0 8px 0 ${_(u, {
          alpha: 0.4
        })}`,
        colorActiveError: _(u, { alpha: 0.1 }),
        caretColorError: u,
        clearColor: d,
        clearColorHover: m,
        clearColorPressed: C
      });
    }
  }, ai = d0, u0 = U([Q("base-selection", `
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
 `), Q("base-selection-tags", "min-height: var(--n-height);"), Y("border, state-border", `
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
 `), Q("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [Y("arrow", `
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
 `, [Y("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), Q("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [Y("inner", `
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
 `, [Y("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), Y("render-label", `
 color: var(--n-text-color);
 `)]), Je("disabled", [U("&:hover", [Y("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), ae("focus", [Y("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), ae("active", [Y("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), Q("base-selection-label", "background-color: var(--n-color-active);"), Q("base-selection-tags", "background-color: var(--n-color-active);")])]), ae("disabled", "cursor: not-allowed;", [Y("arrow", `
 color: var(--n-arrow-color-disabled);
 `), Q("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [Q("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), Y("render-label", `
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
 `)]), ["warning", "error"].map((e) => ae(`${e}-status`, [Y("state-border", `border: var(--n-border-${e});`), Je("disabled", [U("&:hover", [Y("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), ae("active", [Y("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), Q("base-selection-label", `background-color: var(--n-color-active-${e});`), Q("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), ae("focus", [Y("state-border", `
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
 `, [U("&:last-child", "padding-right: 0;"), Q("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [Y("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), f0 = ie({
    name: "InternalSelection",
    props: Object.assign(Object.assign({}, ve.props), { clsPrefix: {
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
      const o = F(null), t = F(null), r = F(null), n = F(null), i = F(null), l = F(null), a = F(null), s = F(null), c = F(null), u = F(null), f = F(!1), v = F(!1), p = F(!1), d = ve("InternalSelection", "-internal-selection", u0, Ts, e, se(e, "clsPrefix")), m = E(() => e.clearable && !e.disabled && (p.value || e.active)), C = E(() => e.selectedOption ? e.renderTag ? e.renderTag({
        option: e.selectedOption,
        handleClose: () => {
        }
      }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : pt(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), h = E(() => {
        const R = e.selectedOption;
        if (R)
          return R[e.labelField];
      }), S = E(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
      function D() {
        var R;
        const { value: K } = o;
        if (K) {
          const { value: ce } = t;
          ce && (ce.style.width = `${K.offsetWidth}px`, e.maxTagCount !== "responsive" && ((R = c.value) === null || R === void 0 || R.sync()));
        }
      }
      function T() {
        const { value: R } = u;
        R && (R.style.display = "none");
      }
      function z() {
        const { value: R } = u;
        R && (R.style.display = "inline-block");
      }
      ye(se(e, "active"), (R) => {
        R || T();
      }), ye(se(e, "pattern"), () => {
        e.multiple && Ct(D);
      });
      function O(R) {
        const { onFocus: K } = e;
        K && K(R);
      }
      function b(R) {
        const { onBlur: K } = e;
        K && K(R);
      }
      function $(R) {
        const { onDeleteOption: K } = e;
        K && K(R);
      }
      function w(R) {
        const { onClear: K } = e;
        K && K(R);
      }
      function x(R) {
        const { onPatternInput: K } = e;
        K && K(R);
      }
      function P(R) {
        var K;
        (!R.relatedTarget || !(!((K = r.value) === null || K === void 0) && K.contains(R.relatedTarget))) && O(R);
      }
      function M(R) {
        var K;
        !((K = r.value) === null || K === void 0) && K.contains(R.relatedTarget) || b(R);
      }
      function W(R) {
        w(R);
      }
      function H() {
        p.value = !0;
      }
      function N() {
        p.value = !1;
      }
      function G(R) {
        !e.active || !e.filterable || R.target !== t.value && R.preventDefault();
      }
      function V(R) {
        $(R);
      }
      function oe(R) {
        if (R.key === "Backspace" && !k.value && !e.pattern.length) {
          const { selectedOptions: K } = e;
          K != null && K.length && V(K[K.length - 1]);
        }
      }
      const k = F(!1);
      let L = null;
      function re(R) {
        const { value: K } = o;
        if (K) {
          const ce = R.target.value;
          K.textContent = ce, D();
        }
        e.ignoreComposition && k.value ? L = R : x(R);
      }
      function ue() {
        k.value = !0;
      }
      function ze() {
        k.value = !1, e.ignoreComposition && x(L), L = null;
      }
      function ao(R) {
        var K;
        v.value = !0, (K = e.onPatternFocus) === null || K === void 0 || K.call(e, R);
      }
      function Te(R) {
        var K;
        v.value = !1, (K = e.onPatternBlur) === null || K === void 0 || K.call(e, R);
      }
      function eo() {
        var R, K;
        if (e.filterable)
          v.value = !1, (R = l.value) === null || R === void 0 || R.blur(), (K = t.value) === null || K === void 0 || K.blur();
        else if (e.multiple) {
          const { value: ce } = n;
          ce == null || ce.blur();
        } else {
          const { value: ce } = i;
          ce == null || ce.blur();
        }
      }
      function Ae() {
        var R, K, ce;
        e.filterable ? (v.value = !1, (R = l.value) === null || R === void 0 || R.focus()) : e.multiple ? (K = n.value) === null || K === void 0 || K.focus() : (ce = i.value) === null || ce === void 0 || ce.focus();
      }
      function De() {
        const { value: R } = t;
        R && (z(), R.focus());
      }
      function xe() {
        const { value: R } = t;
        R && R.blur();
      }
      function Ge(R) {
        const { value: K } = a;
        K && K.setTextContent(`+${R}`);
      }
      function Re() {
        const { value: R } = s;
        return R;
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
          S.value && (f.value = !0);
        }, 100));
      }
      function Ho() {
        co();
      }
      function Bo(R) {
        R || (co(), f.value = !1);
      }
      ye(S, (R) => {
        R || (f.value = !1);
      }), Ve(() => {
        go(() => {
          const R = l.value;
          R && (R.tabIndex = e.disabled || v.value ? -1 : 0);
        });
      }), Ta(r, e.onResize);
      const { inlineThemeDisabled: wo } = e, $o = E(() => {
        const { size: R } = e, { common: { cubicBezierEaseInOut: K }, self: {
          borderRadius: ce,
          color: Le,
          placeholderColor: ot,
          textColor: zt,
          paddingSingle: tt,
          paddingMultiple: rt,
          caretColor: nt,
          colorDisabled: Po,
          textColorDisabled: To,
          placeholderColorDisabled: Mt,
          colorActive: it,
          boxShadowFocus: Ke,
          boxShadowActive: fo,
          boxShadowHover: g,
          border: I,
          borderFocus: B,
          borderHover: X,
          borderActive: q,
          arrowColor: ee,
          arrowColorDisabled: te,
          loadingColor: ne,
          // form warning
          colorActiveWarning: ke,
          boxShadowFocusWarning: ho,
          boxShadowActiveWarning: Gs,
          boxShadowHoverWarning: Ks,
          borderWarning: Xs,
          borderFocusWarning: Ys,
          borderHoverWarning: qs,
          borderActiveWarning: Js,
          // form error
          colorActiveError: Zs,
          boxShadowFocusError: Qs,
          boxShadowActiveError: ec,
          boxShadowHoverError: oc,
          borderError: tc,
          borderFocusError: rc,
          borderHoverError: nc,
          borderActiveError: ic,
          // clear
          clearColor: lc,
          clearColorHover: ac,
          clearColorPressed: sc,
          clearSize: cc,
          // arrow
          arrowSize: dc,
          [fe("height", R)]: uc,
          [fe("fontSize", R)]: fc
        } } = d.value;
        return {
          "--n-bezier": K,
          "--n-border": I,
          "--n-border-active": q,
          "--n-border-focus": B,
          "--n-border-hover": X,
          "--n-border-radius": ce,
          "--n-box-shadow-active": fo,
          "--n-box-shadow-focus": Ke,
          "--n-box-shadow-hover": g,
          "--n-caret-color": nt,
          "--n-color": Le,
          "--n-color-active": it,
          "--n-color-disabled": Po,
          "--n-font-size": fc,
          "--n-height": uc,
          "--n-padding-single": tt,
          "--n-padding-multiple": rt,
          "--n-placeholder-color": ot,
          "--n-placeholder-color-disabled": Mt,
          "--n-text-color": zt,
          "--n-text-color-disabled": To,
          "--n-arrow-color": ee,
          "--n-arrow-color-disabled": te,
          "--n-loading-color": ne,
          // form warning
          "--n-color-active-warning": ke,
          "--n-box-shadow-focus-warning": ho,
          "--n-box-shadow-active-warning": Gs,
          "--n-box-shadow-hover-warning": Ks,
          "--n-border-warning": Xs,
          "--n-border-focus-warning": Ys,
          "--n-border-hover-warning": qs,
          "--n-border-active-warning": Js,
          // form error
          "--n-color-active-error": Zs,
          "--n-box-shadow-focus-error": Qs,
          "--n-box-shadow-active-error": ec,
          "--n-box-shadow-hover-error": oc,
          "--n-border-error": tc,
          "--n-border-focus-error": rc,
          "--n-border-hover-error": nc,
          "--n-border-active-error": ic,
          // clear
          "--n-clear-size": cc,
          "--n-clear-color": lc,
          "--n-clear-color-hover": ac,
          "--n-clear-color-pressed": sc,
          // arrow-size
          "--n-arrow-size": dc
        };
      }), Me = wo ? Do("internal-selection", E(() => e.size[0]), $o, e) : void 0;
      return {
        mergedTheme: d,
        mergedClearable: m,
        patternInputFocused: v,
        filterablePlaceholder: C,
        label: h,
        selected: S,
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
        handleMouseDown: G,
        handleFocusin: P,
        handleClear: W,
        handleMouseEnter: H,
        handleMouseLeave: N,
        handleDeleteOption: V,
        handlePatternKeyDown: oe,
        handlePatternInputInput: re,
        handlePatternInputBlur: Te,
        handlePatternInputFocus: ao,
        handleMouseEnterCounter: uo,
        handleMouseLeaveCounter: Ho,
        handleFocusout: M,
        handleCompositionEnd: ze,
        handleCompositionStart: ue,
        onPopoverUpdateShow: Bo,
        focus: Ae,
        focusInput: De,
        blur: eo,
        blurInput: xe,
        updateCounter: Ge,
        getCounter: Re,
        getTail: Fe,
        renderLabel: e.renderLabel,
        cssVars: wo ? void 0 : $o,
        themeClass: Me == null ? void 0 : Me.themeClass,
        onRender: Me == null ? void 0 : Me.onRender
      };
    },
    render() {
      const { status: e, multiple: o, size: t, disabled: r, filterable: n, maxTagCount: i, bordered: l, clsPrefix: a, onRender: s, renderTag: c, renderLabel: u } = this;
      s == null || s();
      const f = i === "responsive", v = typeof i == "number", p = f || v, d = y(Cn, null, {
        default: () => y(a0, { clsPrefix: a, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
          default: () => {
            var C, h;
            return (h = (C = this.$slots).arrow) === null || h === void 0 ? void 0 : h.call(C);
          }
        })
      });
      let m;
      if (o) {
        const { labelField: C } = this, h = (M) => y("div", { class: `${a}-base-selection-tag-wrapper`, key: M.value }, c ? c({
          option: M,
          handleClose: () => this.handleDeleteOption(M)
        }) : y(sn, { size: t, closable: !M.disabled, disabled: r, onClose: () => this.handleDeleteOption(M), internalCloseIsButtonTag: !1, internalCloseFocusable: !1 }, {
          default: () => u ? u(M, !0) : pt(M[C], M, !0)
        })), S = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(h), D = n ? y(
          "div",
          { class: `${a}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
          y("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: r, value: this.pattern, autofocus: this.autofocus, class: `${a}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          y("span", { ref: "patternInputMirrorRef", class: `${a}-base-selection-input-tag__mirror` }, this.pattern)
        ) : null, T = f ? () => y(
          "div",
          { class: `${a}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
          y(sn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: r })
        ) : void 0;
        let z;
        if (v) {
          const M = this.selectedOptions.length - i;
          M > 0 && (z = y(
            "div",
            { class: `${a}-base-selection-tag-wrapper`, key: "__counter__" },
            y(sn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: r }, {
              default: () => `+${M}`
            })
          ));
        }
        const O = f ? n ? y(Wi, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: S,
          counter: T,
          tail: () => D
        }) : y(Wi, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: S,
          counter: T
        }) : v ? S().concat(z) : S(), b = p ? () => y("div", { class: `${a}-base-selection-popover` }, f ? S() : this.selectedOptions.map(h)) : void 0, $ = p ? {
          show: this.showTagsPanel,
          trigger: "hover",
          overlap: !0,
          placement: "top",
          width: "trigger",
          onUpdateShow: this.onPopoverUpdateShow,
          theme: this.mergedTheme.peers.Popover,
          themeOverrides: this.mergedTheme.peerOverrides.Popover
        } : null, x = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? y(
          "div",
          { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay` },
          y("div", { class: `${a}-base-selection-placeholder__inner` }, this.placeholder)
        ) : null, P = n ? y(
          "div",
          { ref: "patternInputWrapperRef", class: `${a}-base-selection-tags` },
          O,
          f ? null : D,
          d
        ) : y(
          "div",
          { ref: "multipleElRef", class: `${a}-base-selection-tags`, tabindex: r ? void 0 : 0 },
          O,
          d
        );
        m = y(
          to,
          null,
          p ? y(Ss, Object.assign({}, $, { scrollable: !0, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
            trigger: () => P,
            default: b
          }) : P,
          x
        );
      } else if (n) {
        const C = this.pattern || this.isComposing, h = this.active ? !C : !this.selected, S = this.active ? !1 : this.selected;
        m = y(
          "div",
          { ref: "patternInputWrapperRef", class: `${a}-base-selection-label` },
          y("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${a}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: r, disabled: r, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          S ? y(
            "div",
            { class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`, key: "input" },
            y("div", { class: `${a}-base-selection-overlay__wrapper` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : pt(this.label, this.selectedOption, !0))
          ) : null,
          h ? y(
            "div",
            { class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`, key: "placeholder" },
            y("div", { class: `${a}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)
          ) : null,
          d
        );
      } else
        m = y(
          "div",
          { ref: "singleElRef", class: `${a}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 },
          this.label !== void 0 ? y(
            "div",
            { class: `${a}-base-selection-input`, title: ld(this.label), key: "input" },
            y("div", { class: `${a}-base-selection-input__content` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : pt(this.label, this.selectedOption, !0))
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
        m,
        l ? y("div", { class: `${a}-base-selection__border` }) : null,
        l ? y("div", { class: `${a}-base-selection__state-border` }) : null
      );
    }
  }), h0 = {
    iconMargin: "11px 8px 0 12px",
    iconMarginRtl: "11px 12px 0 8px",
    iconSize: "24px",
    closeIconSize: "16px",
    closeSize: "20px",
    closeMargin: "13px 14px 0 0",
    closeMarginRtl: "13px 0 0 14px",
    padding: "13px"
  }, p0 = {
    name: "Alert",
    common: A,
    self(e) {
      const { lineHeight: o, borderRadius: t, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: l, textColor2: a, closeColorHover: s, closeColorPressed: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, infoColorSuppl: p, successColorSuppl: d, warningColorSuppl: m, errorColorSuppl: C, fontSize: h } = e;
      return Object.assign(Object.assign({}, h0), {
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
        borderInfo: `1px solid ${_(p, { alpha: 0.35 })}`,
        colorInfo: _(p, { alpha: 0.25 }),
        titleTextColorInfo: l,
        iconColorInfo: p,
        contentTextColorInfo: a,
        closeColorHoverInfo: s,
        closeColorPressedInfo: c,
        closeIconColorInfo: u,
        closeIconColorHoverInfo: f,
        closeIconColorPressedInfo: v,
        borderSuccess: `1px solid ${_(d, {
          alpha: 0.35
        })}`,
        colorSuccess: _(d, { alpha: 0.25 }),
        titleTextColorSuccess: l,
        iconColorSuccess: d,
        contentTextColorSuccess: a,
        closeColorHoverSuccess: s,
        closeColorPressedSuccess: c,
        closeIconColorSuccess: u,
        closeIconColorHoverSuccess: f,
        closeIconColorPressedSuccess: v,
        borderWarning: `1px solid ${_(m, {
          alpha: 0.35
        })}`,
        colorWarning: _(m, { alpha: 0.25 }),
        titleTextColorWarning: l,
        iconColorWarning: m,
        contentTextColorWarning: a,
        closeColorHoverWarning: s,
        closeColorPressedWarning: c,
        closeIconColorWarning: u,
        closeIconColorHoverWarning: f,
        closeIconColorPressedWarning: v,
        borderError: `1px solid ${_(C, { alpha: 0.35 })}`,
        colorError: _(C, { alpha: 0.25 }),
        titleTextColorError: l,
        iconColorError: C,
        contentTextColorError: a,
        closeColorHoverError: s,
        closeColorPressedError: c,
        closeIconColorError: u,
        closeIconColorHoverError: f,
        closeIconColorPressedError: v
      });
    }
  }, v0 = p0, g0 = {
    linkFontSize: "13px",
    linkPadding: "0 0 0 16px",
    railWidth: "4px"
  }, m0 = (e) => {
    const { borderRadius: o, railColor: t, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: l } = e;
    return Object.assign(Object.assign({}, g0), {
      borderRadius: o,
      railColor: t,
      railColorActive: r,
      linkColor: _(r, { alpha: 0.15 }),
      linkTextColor: l,
      linkTextColorHover: n,
      linkTextColorPressed: i,
      linkTextColorActive: r
    });
  }, b0 = {
    name: "Anchor",
    common: A,
    self: m0
  }, C0 = b0;
  function zr(e) {
    return e.type === "group";
  }
  function Is(e) {
    return e.type === "ignored";
  }
  function cn(e, o) {
    try {
      return !!(1 + o.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
    } catch {
      return !1;
    }
  }
  function x0(e, o) {
    return {
      getIsGroup: zr,
      getIgnored: Is,
      getKey(r) {
        return zr(r) ? r.name || r.key || "key-required" : r[e];
      },
      getChildren(r) {
        return r[o];
      }
    };
  }
  function y0(e, o, t, r) {
    if (!o)
      return e;
    function n(i) {
      if (!Array.isArray(i))
        return [];
      const l = [];
      for (const a of i)
        if (zr(a)) {
          const s = n(a[r]);
          s.length && l.push(Object.assign({}, a, {
            [r]: s
          }));
        } else {
          if (Is(a))
            continue;
          o(t, a) && l.push(a);
        }
      return l;
    }
    return n(e);
  }
  function S0(e, o, t) {
    const r = /* @__PURE__ */ new Map();
    return e.forEach((n) => {
      zr(n) ? n[t].forEach((i) => {
        r.set(i[o], i);
      }) : r.set(n[o], n);
    }), r;
  }
  const w0 = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  }, $0 = {
    name: "Input",
    common: A,
    self(e) {
      const { textColor2: o, textColor3: t, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderRadius: v, lineHeight: p, fontSizeTiny: d, fontSizeSmall: m, fontSizeMedium: C, fontSizeLarge: h, heightTiny: S, heightSmall: D, heightMedium: T, heightLarge: z, clearColor: O, clearColorHover: b, clearColorPressed: $, placeholderColor: w, placeholderColorDisabled: x, iconColor: P, iconColorDisabled: M, iconColorHover: W, iconColorPressed: H } = e;
      return Object.assign(Object.assign({}, w0), {
        countTextColorDisabled: r,
        countTextColor: t,
        heightTiny: S,
        heightSmall: D,
        heightMedium: T,
        heightLarge: z,
        fontSizeTiny: d,
        fontSizeSmall: m,
        fontSizeMedium: C,
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
        placeholderColor: w,
        placeholderColorDisabled: x,
        color: l,
        colorDisabled: a,
        colorFocus: _(n, { alpha: 0.1 }),
        groupLabelBorder: "1px solid #0000",
        border: "1px solid #0000",
        borderHover: `1px solid ${i}`,
        borderDisabled: "1px solid #0000",
        borderFocus: `1px solid ${i}`,
        boxShadowFocus: `0 0 8px 0 ${_(n, { alpha: 0.3 })}`,
        loadingColor: n,
        // warning
        loadingColorWarning: s,
        borderWarning: `1px solid ${s}`,
        borderHoverWarning: `1px solid ${c}`,
        colorFocusWarning: _(s, { alpha: 0.1 }),
        borderFocusWarning: `1px solid ${c}`,
        boxShadowFocusWarning: `0 0 8px 0 ${_(s, {
          alpha: 0.3
        })}`,
        caretColorWarning: s,
        // error
        loadingColorError: u,
        borderError: `1px solid ${u}`,
        borderHoverError: `1px solid ${f}`,
        colorFocusError: _(u, { alpha: 0.1 }),
        borderFocusError: `1px solid ${f}`,
        boxShadowFocusError: `0 0 8px 0 ${_(u, {
          alpha: 0.3
        })}`,
        caretColorError: u,
        clearColor: O,
        clearColorHover: b,
        clearColorPressed: $,
        iconColor: P,
        iconColorDisabled: M,
        iconColorHover: W,
        iconColorPressed: H,
        suffixTextColor: o
      });
    }
  }, Ue = $0;
  function P0(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const T0 = {
    name: "AutoComplete",
    common: A,
    peers: {
      InternalSelectMenu: Jt,
      Input: Ue
    },
    self: P0
  }, I0 = T0, z0 = (e) => {
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
      color: Z(r, t),
      colorModal: Z(u, t),
      colorPopover: Z(f, t)
    };
  }, M0 = {
    name: "Avatar",
    common: A,
    self: z0
  }, zs = M0, k0 = () => ({
    gap: "-12px"
  }), O0 = {
    name: "AvatarGroup",
    common: A,
    peers: {
      Avatar: zs
    },
    self: k0
  }, E0 = O0, _0 = {
    width: "44px",
    height: "44px",
    borderRadius: "22px",
    iconSize: "26px"
  }, D0 = {
    name: "BackTop",
    common: A,
    self(e) {
      const { popoverColor: o, textColor2: t, primaryColorHover: r, primaryColorPressed: n } = e;
      return Object.assign(Object.assign({}, _0), { color: o, textColor: t, iconColor: t, iconColorHover: r, iconColorPressed: n, boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)", boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)", boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)" });
    }
  }, H0 = D0, B0 = {
    name: "Badge",
    common: A,
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
  }, A0 = B0, R0 = {
    fontWeightActive: "400"
  }, F0 = (e) => {
    const { fontSize: o, textColor3: t, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: l } = e;
    return Object.assign(Object.assign({}, R0), { fontSize: o, itemLineHeight: "1.25", itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: r, itemTextColorActive: r, itemBorderRadius: n, itemColorHover: i, itemColorPressed: l, separatorColor: t });
  }, L0 = {
    name: "Breadcrumb",
    common: A,
    self: F0
  }, W0 = L0, N0 = {
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
  }, j0 = (e) => {
    const { heightTiny: o, heightSmall: t, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: l, fontSizeSmall: a, fontSizeMedium: s, fontSizeLarge: c, opacityDisabled: u, textColor2: f, textColor3: v, primaryColorHover: p, primaryColorPressed: d, borderColor: m, primaryColor: C, baseColor: h, infoColor: S, infoColorHover: D, infoColorPressed: T, successColor: z, successColorHover: O, successColorPressed: b, warningColor: $, warningColorHover: w, warningColorPressed: x, errorColor: P, errorColorHover: M, errorColorPressed: W, fontWeight: H, buttonColor2: N, buttonColor2Hover: G, buttonColor2Pressed: V, fontWeightStrong: oe } = e;
    return Object.assign(Object.assign({}, N0), {
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
      colorSecondaryHover: G,
      colorSecondaryPressed: V,
      // tertiary
      colorTertiary: N,
      colorTertiaryHover: G,
      colorTertiaryPressed: V,
      // quaternary
      colorQuaternary: "#0000",
      colorQuaternaryHover: G,
      colorQuaternaryPressed: V,
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
      border: `1px solid ${m}`,
      borderHover: `1px solid ${p}`,
      borderPressed: `1px solid ${d}`,
      borderFocus: `1px solid ${p}`,
      borderDisabled: `1px solid ${m}`,
      rippleColor: C,
      // primary
      colorPrimary: C,
      colorHoverPrimary: p,
      colorPressedPrimary: d,
      colorFocusPrimary: p,
      colorDisabledPrimary: C,
      textColorPrimary: h,
      textColorHoverPrimary: h,
      textColorPressedPrimary: h,
      textColorFocusPrimary: h,
      textColorDisabledPrimary: h,
      textColorTextPrimary: C,
      textColorTextHoverPrimary: p,
      textColorTextPressedPrimary: d,
      textColorTextFocusPrimary: p,
      textColorTextDisabledPrimary: f,
      textColorGhostPrimary: C,
      textColorGhostHoverPrimary: p,
      textColorGhostPressedPrimary: d,
      textColorGhostFocusPrimary: p,
      textColorGhostDisabledPrimary: C,
      borderPrimary: `1px solid ${C}`,
      borderHoverPrimary: `1px solid ${p}`,
      borderPressedPrimary: `1px solid ${d}`,
      borderFocusPrimary: `1px solid ${p}`,
      borderDisabledPrimary: `1px solid ${C}`,
      rippleColorPrimary: C,
      // info
      colorInfo: S,
      colorHoverInfo: D,
      colorPressedInfo: T,
      colorFocusInfo: D,
      colorDisabledInfo: S,
      textColorInfo: h,
      textColorHoverInfo: h,
      textColorPressedInfo: h,
      textColorFocusInfo: h,
      textColorDisabledInfo: h,
      textColorTextInfo: S,
      textColorTextHoverInfo: D,
      textColorTextPressedInfo: T,
      textColorTextFocusInfo: D,
      textColorTextDisabledInfo: f,
      textColorGhostInfo: S,
      textColorGhostHoverInfo: D,
      textColorGhostPressedInfo: T,
      textColorGhostFocusInfo: D,
      textColorGhostDisabledInfo: S,
      borderInfo: `1px solid ${S}`,
      borderHoverInfo: `1px solid ${D}`,
      borderPressedInfo: `1px solid ${T}`,
      borderFocusInfo: `1px solid ${D}`,
      borderDisabledInfo: `1px solid ${S}`,
      rippleColorInfo: S,
      // success
      colorSuccess: z,
      colorHoverSuccess: O,
      colorPressedSuccess: b,
      colorFocusSuccess: O,
      colorDisabledSuccess: z,
      textColorSuccess: h,
      textColorHoverSuccess: h,
      textColorPressedSuccess: h,
      textColorFocusSuccess: h,
      textColorDisabledSuccess: h,
      textColorTextSuccess: z,
      textColorTextHoverSuccess: O,
      textColorTextPressedSuccess: b,
      textColorTextFocusSuccess: O,
      textColorTextDisabledSuccess: f,
      textColorGhostSuccess: z,
      textColorGhostHoverSuccess: O,
      textColorGhostPressedSuccess: b,
      textColorGhostFocusSuccess: O,
      textColorGhostDisabledSuccess: z,
      borderSuccess: `1px solid ${z}`,
      borderHoverSuccess: `1px solid ${O}`,
      borderPressedSuccess: `1px solid ${b}`,
      borderFocusSuccess: `1px solid ${O}`,
      borderDisabledSuccess: `1px solid ${z}`,
      rippleColorSuccess: z,
      // warning
      colorWarning: $,
      colorHoverWarning: w,
      colorPressedWarning: x,
      colorFocusWarning: w,
      colorDisabledWarning: $,
      textColorWarning: h,
      textColorHoverWarning: h,
      textColorPressedWarning: h,
      textColorFocusWarning: h,
      textColorDisabledWarning: h,
      textColorTextWarning: $,
      textColorTextHoverWarning: w,
      textColorTextPressedWarning: x,
      textColorTextFocusWarning: w,
      textColorTextDisabledWarning: f,
      textColorGhostWarning: $,
      textColorGhostHoverWarning: w,
      textColorGhostPressedWarning: x,
      textColorGhostFocusWarning: w,
      textColorGhostDisabledWarning: $,
      borderWarning: `1px solid ${$}`,
      borderHoverWarning: `1px solid ${w}`,
      borderPressedWarning: `1px solid ${x}`,
      borderFocusWarning: `1px solid ${w}`,
      borderDisabledWarning: `1px solid ${$}`,
      rippleColorWarning: $,
      // error
      colorError: P,
      colorHoverError: M,
      colorPressedError: W,
      colorFocusError: M,
      colorDisabledError: P,
      textColorError: h,
      textColorHoverError: h,
      textColorPressedError: h,
      textColorFocusError: h,
      textColorDisabledError: h,
      textColorTextError: P,
      textColorTextHoverError: M,
      textColorTextPressedError: W,
      textColorTextFocusError: M,
      textColorTextDisabledError: f,
      textColorGhostError: P,
      textColorGhostHoverError: M,
      textColorGhostPressedError: W,
      textColorGhostFocusError: M,
      textColorGhostDisabledError: P,
      borderError: `1px solid ${P}`,
      borderHoverError: `1px solid ${M}`,
      borderPressedError: `1px solid ${W}`,
      borderFocusError: `1px solid ${M}`,
      borderDisabledError: `1px solid ${P}`,
      rippleColorError: P,
      waveOpacity: "0.6",
      fontWeight: H,
      fontWeightStrong: oe
    });
  }, V0 = {
    name: "Button",
    common: A,
    self(e) {
      const o = j0(e);
      return o.waveOpacity = "0.8", o.colorOpacitySecondary = "0.16", o.colorOpacitySecondaryHover = "0.2", o.colorOpacitySecondaryPressed = "0.12", o;
    }
  }, _e = V0, U0 = {
    titleFontSize: "22px"
  }, G0 = (e) => {
    const { borderRadius: o, fontSize: t, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: l, dividerColor: a, fontWeightStrong: s, primaryColor: c, baseColor: u, hoverColor: f, cardColor: v, modalColor: p, popoverColor: d } = e;
    return Object.assign(Object.assign({}, U0), {
      borderRadius: o,
      borderColor: Z(v, a),
      borderColorModal: Z(p, a),
      borderColorPopover: Z(d, a),
      textColor: n,
      titleFontWeight: s,
      titleTextColor: i,
      dayTextColor: l,
      fontSize: t,
      lineHeight: r,
      dateColorCurrent: c,
      dateTextColorCurrent: u,
      cellColorHover: Z(v, f),
      cellColorHoverModal: Z(p, f),
      cellColorHoverPopover: Z(d, f),
      cellColor: v,
      cellColorModal: p,
      cellColorPopover: d,
      barColor: c
    });
  }, K0 = {
    name: "Calendar",
    common: A,
    peers: {
      Button: _e
    },
    self: G0
  }, X0 = K0, Y0 = (e) => {
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
  }, q0 = {
    name: "ColorPicker",
    common: A,
    peers: {
      Input: Ue,
      Button: _e
    },
    self: Y0
  }, J0 = q0, Z0 = {
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
  }, Q0 = (e) => {
    const { primaryColor: o, borderRadius: t, lineHeight: r, fontSize: n, cardColor: i, textColor2: l, textColor1: a, dividerColor: s, fontWeightStrong: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, closeColorHover: p, closeColorPressed: d, modalColor: m, boxShadow1: C, popoverColor: h, actionColor: S } = e;
    return Object.assign(Object.assign({}, Z0), {
      lineHeight: r,
      color: i,
      colorModal: m,
      colorPopover: h,
      colorTarget: o,
      colorEmbedded: S,
      colorEmbeddedModal: S,
      colorEmbeddedPopover: S,
      textColor: l,
      titleTextColor: a,
      borderColor: s,
      actionColor: S,
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
      boxShadow: C,
      borderRadius: t
    });
  }, eC = {
    name: "Card",
    common: A,
    self(e) {
      const o = Q0(e), { cardColor: t, modalColor: r, popoverColor: n } = e;
      return o.colorEmbedded = t, o.colorEmbeddedModal = r, o.colorEmbeddedPopover = n, o;
    }
  }, Ms = eC, oC = (e) => ({
    dotSize: "8px",
    dotColor: "rgba(255, 255, 255, .3)",
    dotColorActive: "rgba(255, 255, 255, 1)",
    dotColorFocus: "rgba(255, 255, 255, .5)",
    dotLineWidth: "16px",
    dotLineWidthActive: "24px",
    arrowColor: "#eee"
  }), tC = {
    name: "Carousel",
    common: A,
    self: oC
  }, rC = tC, nC = {
    sizeSmall: "14px",
    sizeMedium: "16px",
    sizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, iC = (e) => {
    const { baseColor: o, inputColorDisabled: t, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: l, borderColor: a, primaryColor: s, textColor2: c, fontSizeSmall: u, fontSizeMedium: f, fontSizeLarge: v, borderRadiusSmall: p, lineHeight: d } = e;
    return Object.assign(Object.assign({}, nC), {
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
      boxShadowFocus: `0 0 0 2px ${_(s, { alpha: 0.3 })}`,
      textColor: c,
      textColorDisabled: l
    });
  }, lC = {
    name: "Checkbox",
    common: A,
    self(e) {
      const { cardColor: o } = e, t = iC(e);
      return t.color = "#0000", t.checkMarkColor = o, t;
    }
  }, It = lC, aC = (e) => {
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
  }, sC = {
    name: "Cascader",
    common: A,
    peers: {
      InternalSelectMenu: Jt,
      InternalSelection: ai,
      Scrollbar: Ee,
      Checkbox: It,
      Empty: ii
    },
    self: aC
  }, cC = sC, dC = {
    name: "Code",
    common: A,
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
  }, ks = dC, uC = (e) => {
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
  }, fC = {
    name: "Collapse",
    common: A,
    self: uC
  }, hC = fC, pC = (e) => {
    const { cubicBezierEaseInOut: o } = e;
    return {
      bezier: o
    };
  }, vC = {
    name: "CollapseTransition",
    common: A,
    self: pC
  }, gC = vC, mC = {
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
      validator: () => (br("config-provider", "`as` is deprecated, please use `tag` instead."), !0),
      default: void 0
    }
  }, bC = ie({
    name: "ConfigProvider",
    alias: ["App"],
    props: mC,
    setup(e) {
      const o = he(Co, null), t = E(() => {
        const { theme: d } = e;
        if (d === null)
          return;
        const m = o == null ? void 0 : o.mergedThemeRef.value;
        return d === void 0 ? m : m === void 0 ? d : Object.assign({}, m, d);
      }), r = E(() => {
        const { themeOverrides: d } = e;
        if (d !== null) {
          if (d === void 0)
            return o == null ? void 0 : o.mergedThemeOverridesRef.value;
          {
            const m = o == null ? void 0 : o.mergedThemeOverridesRef.value;
            return m === void 0 ? d : Ht({}, m, d);
          }
        }
      }), n = Ze(() => {
        const { namespace: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedNamespaceRef.value : d;
      }), i = Ze(() => {
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
        const { rtl: m } = e;
        if (m === void 0)
          return o == null ? void 0 : o.mergedRtlRef.value;
        const C = {};
        for (const h of m)
          C[h.name] = qe(h), (d = h.peers) === null || d === void 0 || d.forEach((S) => {
            S.name in C || (C[S.name] = qe(S));
          });
        return C;
      }), u = E(() => e.breakpoints || (o == null ? void 0 : o.mergedBreakpointsRef.value)), f = e.inlineThemeDisabled || (o == null ? void 0 : o.inlineThemeDisabled), v = e.preflightStyleDisabled || (o == null ? void 0 : o.preflightStyleDisabled), p = E(() => {
        const { value: d } = t, { value: m } = r, C = m && Object.keys(m).length !== 0, h = d == null ? void 0 : d.name;
        return h ? C ? `${h}-${jt(JSON.stringify(r.value))}` : h : C ? jt(JSON.stringify(r.value)) : "";
      });
      return ro(Co, {
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
      return this.abstract ? (r = (t = this.$slots).default) === null || r === void 0 ? void 0 : r.call(t) : y(this.as || this.tag, {
        class: `${this.mergedClsPrefix || ts}-config-provider`
      }, (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e));
    }
  }), CC = {
    name: "Popselect",
    common: A,
    peers: {
      Popover: et,
      InternalSelectMenu: Jt
    }
  }, Os = CC;
  function Es(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const xC = {
    name: "Select",
    common: So,
    peers: {
      InternalSelection: Ts,
      InternalSelectMenu: ms
    },
    self: Es
  }, yC = xC, SC = {
    name: "Select",
    common: A,
    peers: {
      InternalSelection: ai,
      InternalSelectMenu: Jt
    },
    self: Es
  }, _s = SC, wC = U([Q("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), Q("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [bs({
    originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
  })])]), $C = Object.assign(Object.assign({}, ve.props), {
    to: bo.propTo,
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
  }), PC = ie({
    name: "Select",
    props: $C,
    setup(e) {
      process.env.NODE_ENV !== "production" && go(() => {
        e.items !== void 0 && Mo("select", "`items` is deprecated, please use `options` instead."), e.onChange !== void 0 && Mo("select", "`on-change` is deprecated, please use `on-update:value` instead.");
      });
      const { mergedClsPrefixRef: o, mergedBorderedRef: t, namespaceRef: r, inlineThemeDisabled: n } = Tt(e), i = ve("Select", "-select", wC, yC, e, o), l = F(e.defaultValue), a = se(e, "value"), s = yn(a, l), c = F(!1), u = F(""), f = E(() => {
        const { valueField: g, childrenField: I } = e, B = x0(g, I);
        return hb(M.value, B);
      }), v = E(() => S0(x.value, e.valueField, e.childrenField)), p = F(!1), d = yn(se(e, "show"), p), m = F(null), C = F(null), h = F(null), { localeRef: S } = rs("Select"), D = E(() => {
        var g;
        return (g = e.placeholder) !== null && g !== void 0 ? g : S.value.placeholder;
      }), T = ra(e, ["items", "options"]), z = [], O = F([]), b = F([]), $ = F(/* @__PURE__ */ new Map()), w = E(() => {
        const { fallbackOption: g } = e;
        if (g === void 0) {
          const { labelField: I, valueField: B } = e;
          return (X) => ({
            [I]: String(X),
            [B]: X
          });
        }
        return g === !1 ? !1 : (I) => Object.assign(g(I), {
          value: I
        });
      }), x = E(() => b.value.concat(O.value).concat(T.value)), P = E(() => {
        const { filter: g } = e;
        if (g)
          return g;
        const { labelField: I, valueField: B } = e;
        return (X, q) => {
          if (!q)
            return !1;
          const ee = q[I];
          if (typeof ee == "string")
            return cn(X, ee);
          const te = q[B];
          return typeof te == "string" ? cn(X, te) : typeof te == "number" ? cn(X, String(te)) : !1;
        };
      }), M = E(() => {
        if (e.remote)
          return T.value;
        {
          const { value: g } = x, { value: I } = u;
          return !I.length || !e.filterable ? g : y0(g, P.value, I, e.childrenField);
        }
      });
      function W(g) {
        const I = e.remote, { value: B } = $, { value: X } = v, { value: q } = w, ee = [];
        return g.forEach((te) => {
          if (X.has(te))
            ee.push(X.get(te));
          else if (I && B.has(te))
            ee.push(B.get(te));
          else if (q) {
            const ne = q(te);
            ne && ee.push(ne);
          }
        }), ee;
      }
      const H = E(() => {
        if (e.multiple) {
          const { value: g } = s;
          return Array.isArray(g) ? W(g) : [];
        }
        return null;
      }), N = E(() => {
        const { value: g } = s;
        return !e.multiple && !Array.isArray(g) ? g === null ? null : W([g])[0] || null : null;
      }), G = Lu(e), { mergedSizeRef: V, mergedDisabledRef: oe, mergedStatusRef: k } = G;
      function L(g, I) {
        const { onChange: B, "onUpdate:value": X, onUpdateValue: q } = e, { nTriggerFormChange: ee, nTriggerFormInput: te } = G;
        B && we(B, g, I), q && we(q, g, I), X && we(X, g, I), l.value = g, ee(), te();
      }
      function re(g) {
        const { onBlur: I } = e, { nTriggerFormBlur: B } = G;
        I && we(I, g), B();
      }
      function ue() {
        const { onClear: g } = e;
        g && we(g);
      }
      function ze(g) {
        const { onFocus: I, showOnFocus: B } = e, { nTriggerFormFocus: X } = G;
        I && we(I, g), X(), B && De();
      }
      function ao(g) {
        const { onSearch: I } = e;
        I && we(I, g);
      }
      function Te(g) {
        const { onScroll: I } = e;
        I && we(I, g);
      }
      function eo() {
        var g;
        const { remote: I, multiple: B } = e;
        if (I) {
          const { value: X } = $;
          if (B) {
            const { valueField: q } = e;
            (g = H.value) === null || g === void 0 || g.forEach((ee) => {
              X.set(ee[q], ee);
            });
          } else {
            const q = N.value;
            q && X.set(q[e.valueField], q);
          }
        }
      }
      function Ae(g) {
        const { onUpdateShow: I, "onUpdate:show": B } = e;
        I && we(I, g), B && we(B, g), p.value = g;
      }
      function De() {
        oe.value || (Ae(!0), p.value = !0, e.filterable && To());
      }
      function xe() {
        Ae(!1);
      }
      function Ge() {
        u.value = "", b.value = z;
      }
      const Re = F(!1);
      function Fe() {
        e.filterable && (Re.value = !0);
      }
      function so() {
        e.filterable && (Re.value = !1, d.value || Ge());
      }
      function co() {
        oe.value || (d.value ? e.filterable ? To() : xe() : De());
      }
      function uo(g) {
        var I, B;
        !((B = (I = h.value) === null || I === void 0 ? void 0 : I.selfRef) === null || B === void 0) && B.contains(g.relatedTarget) || (c.value = !1, re(g), xe());
      }
      function Ho(g) {
        ze(g), c.value = !0;
      }
      function Bo(g) {
        c.value = !0;
      }
      function wo(g) {
        var I;
        !((I = m.value) === null || I === void 0) && I.$el.contains(g.relatedTarget) || (c.value = !1, re(g), xe());
      }
      function $o() {
        var g;
        (g = m.value) === null || g === void 0 || g.focus(), xe();
      }
      function Me(g) {
        var I;
        d.value && (!((I = m.value) === null || I === void 0) && I.$el.contains(Nt(g)) || xe());
      }
      function R(g) {
        if (!Array.isArray(g))
          return [];
        if (w.value)
          return Array.from(g);
        {
          const { remote: I } = e, { value: B } = v;
          if (I) {
            const { value: X } = $;
            return g.filter((q) => B.has(q) || X.has(q));
          } else
            return g.filter((X) => B.has(X));
        }
      }
      function K(g) {
        ce(g.rawNode);
      }
      function ce(g) {
        if (oe.value)
          return;
        const { tag: I, remote: B, clearFilterAfterSelect: X, valueField: q } = e;
        if (I && !B) {
          const { value: ee } = b, te = ee[0] || null;
          if (te) {
            const ne = O.value;
            ne.length ? ne.push(te) : O.value = [te], b.value = z;
          }
        }
        if (B && $.value.set(g[q], g), e.multiple) {
          const ee = R(s.value), te = ee.findIndex((ne) => ne === g[q]);
          if (~te) {
            if (ee.splice(te, 1), I && !B) {
              const ne = Le(g[q]);
              ~ne && (O.value.splice(ne, 1), X && (u.value = ""));
            }
          } else
            ee.push(g[q]), X && (u.value = "");
          L(ee, W(ee));
        } else {
          if (I && !B) {
            const ee = Le(g[q]);
            ~ee ? O.value = [
              O.value[ee]
            ] : O.value = z;
          }
          Po(), xe(), L(g[q], g);
        }
      }
      function Le(g) {
        return O.value.findIndex((B) => B[e.valueField] === g);
      }
      function ot(g) {
        d.value || De();
        const { value: I } = g.target;
        u.value = I;
        const { tag: B, remote: X } = e;
        if (ao(I), B && !X) {
          if (!I) {
            b.value = z;
            return;
          }
          const { onCreate: q } = e, ee = q ? q(I) : { [e.labelField]: I, [e.valueField]: I }, { valueField: te } = e;
          T.value.some((ne) => ne[te] === ee[te]) || O.value.some((ne) => ne[te] === ee[te]) ? b.value = z : b.value = [ee];
        }
      }
      function zt(g) {
        g.stopPropagation();
        const { multiple: I } = e;
        !I && e.filterable && xe(), ue(), I ? L([], []) : L(null, null);
      }
      function tt(g) {
        !mr(g, "action") && !mr(g, "empty") && g.preventDefault();
      }
      function rt(g) {
        Te(g);
      }
      function nt(g) {
        var I, B, X, q, ee;
        switch (g.key) {
          case " ":
            if (e.filterable)
              break;
            g.preventDefault();
          case "Enter":
            if (!(!((I = m.value) === null || I === void 0) && I.isComposing)) {
              if (d.value) {
                const te = (B = h.value) === null || B === void 0 ? void 0 : B.getPendingTmNode();
                te ? K(te) : e.filterable || (xe(), Po());
              } else if (De(), e.tag && Re.value) {
                const te = b.value[0];
                if (te) {
                  const ne = te[e.valueField], { value: ke } = s;
                  e.multiple && Array.isArray(ke) && ke.some((ho) => ho === ne) || ce(te);
                }
              }
            }
            g.preventDefault();
            break;
          case "ArrowUp":
            if (g.preventDefault(), e.loading)
              return;
            d.value && ((X = h.value) === null || X === void 0 || X.prev());
            break;
          case "ArrowDown":
            if (g.preventDefault(), e.loading)
              return;
            d.value ? (q = h.value) === null || q === void 0 || q.next() : De();
            break;
          case "Escape":
            d.value && (Ed(g), xe()), (ee = m.value) === null || ee === void 0 || ee.focus();
            break;
        }
      }
      function Po() {
        var g;
        (g = m.value) === null || g === void 0 || g.focus();
      }
      function To() {
        var g;
        (g = m.value) === null || g === void 0 || g.focusInput();
      }
      function Mt() {
        var g;
        d.value && ((g = C.value) === null || g === void 0 || g.syncPosition());
      }
      eo(), ye(se(e, "options"), eo);
      const it = {
        focus: () => {
          var g;
          (g = m.value) === null || g === void 0 || g.focus();
        },
        blur: () => {
          var g;
          (g = m.value) === null || g === void 0 || g.blur();
        }
      }, Ke = E(() => {
        const { self: { menuBoxShadow: g } } = i.value;
        return {
          "--n-menu-box-shadow": g
        };
      }), fo = n ? Do("select", void 0, Ke, e) : void 0;
      return Object.assign(Object.assign({}, it), {
        mergedStatus: k,
        mergedClsPrefix: o,
        mergedBordered: t,
        namespace: r,
        treeMate: f,
        isMounted: Dr(),
        triggerRef: m,
        menuRef: h,
        pattern: u,
        uncontrolledShow: p,
        mergedShow: d,
        adjustedTo: bo(e),
        uncontrolledValue: l,
        mergedValue: s,
        followerRef: C,
        localizedPlaceholder: D,
        selectedOption: N,
        selectedOptions: H,
        mergedSize: V,
        mergedDisabled: oe,
        focused: c,
        activeWithoutMenuOpen: Re,
        inlineThemeDisabled: n,
        onTriggerInputFocus: Fe,
        onTriggerInputBlur: so,
        handleTriggerOrMenuResize: Mt,
        handleMenuFocus: Bo,
        handleMenuBlur: wo,
        handleMenuTabOut: $o,
        handleTriggerClick: co,
        handleToggle: K,
        handleDeleteOption: ce,
        handlePatternInput: ot,
        handleClear: zt,
        handleTriggerBlur: uo,
        handleTriggerFocus: Ho,
        handleKeydown: nt,
        handleMenuAfterLeave: Ge,
        handleMenuClickOutside: Me,
        handleMenuScroll: rt,
        handleMenuKeydown: nt,
        handleMenuMousedown: tt,
        mergedTheme: i,
        cssVars: n ? void 0 : Ke,
        themeClass: fo == null ? void 0 : fo.themeClass,
        onRender: fo == null ? void 0 : fo.onRender
      });
    },
    render() {
      return y(
        "div",
        { class: `${this.mergedClsPrefix}-select` },
        y(ua, null, {
          default: () => [
            y(fa, null, {
              default: () => y(f0, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
                arrow: () => {
                  var e, o;
                  return [(o = (e = this.$slots).arrow) === null || o === void 0 ? void 0 : o.call(e)];
                }
              })
            }),
            y(va, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === bo.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
              default: () => y(yt, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
                default: () => {
                  var e, o, t;
                  return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Xt(y(Fb, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
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
                    [Ol, this.mergedShow],
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
  }), TC = {
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
  }, IC = (e) => {
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
    return Object.assign(Object.assign({}, TC), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${a}`, buttonBorderHover: `1px solid ${a}`, buttonBorderPressed: `1px solid ${a}`, buttonIconColor: o, buttonIconColorHover: o, buttonIconColorPressed: o, itemTextColor: o, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: t, itemTextColorDisabled: l, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${t}`, itemBorderDisabled: `1px solid ${a}`, itemBorderRadius: s, itemSizeSmall: v, itemSizeMedium: p, itemSizeLarge: d, itemFontSizeSmall: c, itemFontSizeMedium: u, itemFontSizeLarge: f, jumperFontSizeSmall: c, jumperFontSizeMedium: u, jumperFontSizeLarge: f, jumperTextColor: o, jumperTextColorDisabled: l });
  }, zC = {
    name: "Pagination",
    common: A,
    peers: {
      Select: _s,
      Input: Ue,
      Popselect: Os
    },
    self(e) {
      const { primaryColor: o, opacity3: t } = e, r = _(o, {
        alpha: Number(t)
      }), n = IC(e);
      return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
    }
  }, Ds = zC, Hs = {
    padding: "8px 14px"
  }, MC = {
    name: "Tooltip",
    common: A,
    peers: {
      Popover: et
    },
    self(e) {
      const { borderRadius: o, boxShadow2: t, popoverColor: r, textColor2: n } = e;
      return Object.assign(Object.assign({}, Hs), { borderRadius: o, boxShadow: t, color: r, textColor: n });
    }
  }, Fr = MC, kC = (e) => {
    const { borderRadius: o, boxShadow2: t, baseColor: r } = e;
    return Object.assign(Object.assign({}, Hs), { borderRadius: o, boxShadow: t, color: Z(r, "rgba(0, 0, 0, .85)"), textColor: r });
  }, OC = {
    name: "Tooltip",
    common: So,
    peers: {
      Popover: li
    },
    self: kC
  }, EC = OC, _C = {
    name: "Ellipsis",
    common: A,
    peers: {
      Tooltip: Fr
    }
  }, Bs = _C, DC = {
    radioSizeSmall: "14px",
    radioSizeMedium: "16px",
    radioSizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, HC = {
    name: "Radio",
    common: A,
    self(e) {
      const { borderColor: o, primaryColor: t, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: a, borderRadius: s, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: f, heightSmall: v, heightMedium: p, heightLarge: d, lineHeight: m } = e;
      return Object.assign(Object.assign({}, DC), {
        labelLineHeight: m,
        buttonHeightSmall: v,
        buttonHeightMedium: p,
        buttonHeightLarge: d,
        fontSizeSmall: c,
        fontSizeMedium: u,
        fontSizeLarge: f,
        boxShadow: `inset 0 0 0 1px ${o}`,
        boxShadowActive: `inset 0 0 0 1px ${t}`,
        boxShadowFocus: `inset 0 0 0 1px ${t}, 0 0 0 2px ${_(t, { alpha: 0.3 })}`,
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
        buttonBoxShadowFocus: `inset 0 0 0 1px ${t}, 0 0 0 2px ${_(t, { alpha: 0.3 })}`,
        buttonBoxShadowHover: `inset 0 0 0 1px ${t}`,
        buttonBoxShadow: "inset 0 0 0 1px #0000",
        buttonBorderRadius: s
      });
    }
  }, As = HC, BC = {
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
  }, AC = (e) => {
    const { primaryColor: o, textColor2: t, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: l, borderRadius: a, fontSizeSmall: s, fontSizeMedium: c, fontSizeLarge: u, fontSizeHuge: f, heightSmall: v, heightMedium: p, heightLarge: d, heightHuge: m, textColor3: C, opacityDisabled: h } = e;
    return Object.assign(Object.assign({}, BC), {
      optionHeightSmall: v,
      optionHeightMedium: p,
      optionHeightLarge: d,
      optionHeightHuge: m,
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
      optionColorActive: _(o, { alpha: 0.1 }),
      groupHeaderTextColor: C,
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
  }, RC = {
    name: "Dropdown",
    common: A,
    peers: {
      Popover: et
    },
    self(e) {
      const { primaryColorSuppl: o, primaryColor: t, popoverColor: r } = e, n = AC(e);
      return n.colorInverted = r, n.optionColorActive = _(t, { alpha: 0.15 }), n.optionColorActiveInverted = o, n.optionColorHoverInverted = o, n;
    }
  }, si = RC, FC = {
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
  }, LC = (e) => {
    const { cardColor: o, modalColor: t, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: l, tableColorHover: a, iconColor: s, primaryColor: c, fontWeightStrong: u, borderRadius: f, lineHeight: v, fontSizeSmall: p, fontSizeMedium: d, fontSizeLarge: m, dividerColor: C, heightSmall: h, opacityDisabled: S, tableColorStriped: D } = e;
    return Object.assign(Object.assign({}, FC), {
      actionDividerColor: C,
      lineHeight: v,
      borderRadius: f,
      fontSizeSmall: p,
      fontSizeMedium: d,
      fontSizeLarge: m,
      borderColor: Z(o, C),
      tdColorHover: Z(o, a),
      tdColorStriped: Z(o, D),
      thColor: Z(o, l),
      thColorHover: Z(Z(o, l), a),
      tdColor: o,
      tdTextColor: n,
      thTextColor: i,
      thFontWeight: u,
      thButtonColorHover: a,
      thIconColor: s,
      thIconColorActive: c,
      // modal
      borderColorModal: Z(t, C),
      tdColorHoverModal: Z(t, a),
      tdColorStripedModal: Z(t, D),
      thColorModal: Z(t, l),
      thColorHoverModal: Z(Z(t, l), a),
      tdColorModal: t,
      // popover
      borderColorPopover: Z(r, C),
      tdColorHoverPopover: Z(r, a),
      tdColorStripedPopover: Z(r, D),
      thColorPopover: Z(r, l),
      thColorHoverPopover: Z(Z(r, l), a),
      tdColorPopover: r,
      boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
      boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
      // loading
      loadingColor: c,
      loadingSize: h,
      opacityLoading: S
    });
  }, WC = {
    name: "DataTable",
    common: A,
    peers: {
      Button: _e,
      Checkbox: It,
      Radio: As,
      Pagination: Ds,
      Scrollbar: Ee,
      Empty: Qo,
      Popover: et,
      Ellipsis: Bs,
      Dropdown: si
    },
    self(e) {
      const o = LC(e);
      return o.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", o.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", o;
    }
  }, NC = WC, jC = Object.assign(Object.assign({}, ys), ve.props), VC = ie({
    name: "Tooltip",
    props: jC,
    __popover__: !0,
    setup(e) {
      const o = ve("Tooltip", "-tooltip", void 0, EC, e), t = F(null);
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
      return y(Ss, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: o.concat("tooltip"), ref: "popoverRef" }), this.$slots);
    }
  }), Rs = (e) => {
    const { textColorBase: o, opacity1: t, opacity2: r, opacity3: n, opacity4: i, opacity5: l } = e;
    return {
      color: o,
      opacity1Depth: t,
      opacity2Depth: r,
      opacity3Depth: n,
      opacity4Depth: i,
      opacity5Depth: l
    };
  }, UC = {
    name: "Icon",
    common: So,
    self: Rs
  }, GC = UC, KC = {
    name: "Icon",
    common: A,
    self: Rs
  }, XC = KC, YC = Q("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [ae("color-transition", {
    transition: "color .3s var(--n-bezier)"
  }), ae("depth", {
    color: "var(--n-color)"
  }, [U("svg", {
    opacity: "var(--n-opacity)",
    transition: "opacity .3s var(--n-bezier)"
  })]), U("svg", {
    height: "1em",
    width: "1em"
  })]), qC = Object.assign(Object.assign({}, ve.props), { depth: [String, Number], size: [Number, String], color: String, component: Object }), dn = ie({
    _n_icon__: !0,
    name: "Icon",
    inheritAttrs: !1,
    props: qC,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = Tt(e), r = ve("Icon", "-icon", YC, GC, e, o), n = E(() => {
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
      }), i = t ? Do("icon", E(() => `${e.depth || "d"}`), n, e) : void 0;
      return {
        mergedClsPrefix: o,
        mergedStyle: E(() => {
          const { size: l, color: a } = e;
          return {
            fontSize: fr(l),
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
      return !((e = o == null ? void 0 : o.$options) === null || e === void 0) && e._n_icon__ && br("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), y("i", kr(this.$attrs, {
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
  }), JC = {
    itemFontSize: "12px",
    itemHeight: "36px",
    itemWidth: "52px",
    panelActionPadding: "8px 0"
  }, ZC = (e) => {
    const { popoverColor: o, textColor2: t, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: l, boxShadow2: a, borderRadius: s, iconColor: c, iconColorDisabled: u } = e;
    return Object.assign(Object.assign({}, JC), {
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
  }, QC = {
    name: "TimePicker",
    common: A,
    peers: {
      Scrollbar: Ee,
      Button: _e,
      Input: Ue
    },
    self: ZC
  }, Fs = QC, ex = {
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
  }, ox = (e) => {
    const { hoverColor: o, fontSize: t, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: l, borderRadiusSmall: a, iconColor: s, iconColorDisabled: c, textColor1: u, dividerColor: f, boxShadow2: v, borderRadius: p, fontWeightStrong: d } = e;
    return Object.assign(Object.assign({}, ex), {
      itemFontSize: t,
      calendarDaysFontSize: t,
      calendarTitleFontSize: t,
      itemTextColor: r,
      itemTextColorDisabled: n,
      itemTextColorActive: i,
      itemTextColorCurrent: l,
      itemColorIncluded: _(l, { alpha: 0.1 }),
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
  }, tx = {
    name: "DatePicker",
    common: A,
    peers: {
      Input: Ue,
      Button: _e,
      TimePicker: Fs,
      Scrollbar: Ee
    },
    self(e) {
      const { popoverColor: o, hoverColor: t, primaryColor: r } = e, n = ox(e);
      return n.itemColorDisabled = Z(o, t), n.itemColorIncluded = _(r, { alpha: 0.15 }), n.itemColorHover = Z(o, t), n;
    }
  }, rx = tx, nx = {
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
  }, ix = (e) => {
    const { tableHeaderColor: o, textColor2: t, textColor1: r, cardColor: n, modalColor: i, popoverColor: l, dividerColor: a, borderRadius: s, fontWeightStrong: c, lineHeight: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p } = e;
    return Object.assign(Object.assign({}, nx), {
      lineHeight: u,
      fontSizeSmall: f,
      fontSizeMedium: v,
      fontSizeLarge: p,
      titleTextColor: r,
      thColor: Z(n, o),
      thColorModal: Z(i, o),
      thColorPopover: Z(l, o),
      thTextColor: r,
      thFontWeight: c,
      tdTextColor: t,
      tdColor: n,
      tdColorModal: i,
      tdColorPopover: l,
      borderColor: Z(n, a),
      borderColorModal: Z(i, a),
      borderColorPopover: Z(l, a),
      borderRadius: s
    });
  }, lx = {
    name: "Descriptions",
    common: A,
    self: ix
  }, ax = lx, sx = {
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
  }, cx = (e) => {
    const { textColor1: o, textColor2: t, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, infoColor: c, successColor: u, warningColor: f, errorColor: v, primaryColor: p, dividerColor: d, borderRadius: m, fontWeightStrong: C, lineHeight: h, fontSize: S } = e;
    return Object.assign(Object.assign({}, sx), {
      fontSize: S,
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
      closeBorderRadius: m,
      iconColor: p,
      iconColorInfo: c,
      iconColorSuccess: u,
      iconColorWarning: f,
      iconColorError: v,
      borderRadius: m,
      titleFontWeight: C
    });
  }, dx = {
    name: "Dialog",
    common: A,
    peers: {
      Button: _e
    },
    self: cx
  }, Ls = dx, ux = (e) => {
    const { modalColor: o, textColor2: t, boxShadow3: r } = e;
    return {
      color: o,
      textColor: t,
      boxShadow: r
    };
  }, fx = {
    name: "Modal",
    common: A,
    peers: {
      Scrollbar: Ee,
      Dialog: Ls,
      Card: Ms
    },
    self: ux
  }, hx = fx, px = (e) => {
    const { textColor1: o, dividerColor: t, fontWeightStrong: r } = e;
    return {
      textColor: o,
      color: t,
      fontWeight: r
    };
  }, vx = {
    name: "Divider",
    common: A,
    self: px
  }, gx = vx, mx = (e) => {
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
  }, bx = {
    name: "Drawer",
    common: A,
    peers: {
      Scrollbar: Ee
    },
    self: mx
  }, Cx = bx, xx = {
    actionMargin: "0 0 0 20px",
    actionMarginRtl: "0 20px 0 0"
  }, yx = {
    name: "DynamicInput",
    common: A,
    peers: {
      Input: Ue,
      Button: _e
    },
    self() {
      return xx;
    }
  }, Sx = yx, wx = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, $x = {
    name: "Space",
    self() {
      return wx;
    }
  }, Ws = $x, Px = {
    name: "DynamicTags",
    common: A,
    peers: {
      Input: Ue,
      Button: _e,
      Tag: $s,
      Space: Ws
    },
    self() {
      return {
        inputWidth: "64px"
      };
    }
  }, Tx = Px, Ix = {
    name: "Element",
    common: A
  }, zx = Ix, Mx = {
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
  }, kx = (e) => {
    const { heightSmall: o, heightMedium: t, heightLarge: r, textColor1: n, errorColor: i, warningColor: l, lineHeight: a, textColor3: s } = e;
    return Object.assign(Object.assign({}, Mx), { blankHeightSmall: o, blankHeightMedium: t, blankHeightLarge: r, lineHeight: a, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: l, feedbackTextColor: s });
  }, Ox = {
    name: "Form",
    common: A,
    self: kx
  }, Ex = Ox, _x = {
    name: "GradientText",
    common: A,
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
  }, Dx = _x, Hx = (e) => {
    const { primaryColor: o, baseColor: t } = e;
    return {
      color: o,
      iconColor: t
    };
  }, Bx = {
    name: "IconWrapper",
    common: A,
    self: Hx
  }, Ax = Bx, Rx = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  }, Fx = (e) => {
    const { textColor2: o, successColor: t, infoColor: r, warningColor: n, errorColor: i, popoverColor: l, closeIconColor: a, closeIconColorHover: s, closeIconColorPressed: c, closeColorHover: u, closeColorPressed: f, textColor1: v, textColor3: p, borderRadius: d, fontWeightStrong: m, boxShadow2: C, lineHeight: h, fontSize: S } = e;
    return Object.assign(Object.assign({}, Rx), {
      borderRadius: d,
      lineHeight: h,
      fontSize: S,
      headerFontWeight: m,
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
      boxShadow: C
    });
  }, Lx = {
    name: "Notification",
    common: A,
    peers: {
      Scrollbar: Ee
    },
    self: Fx
  }, Wx = Lx, Nx = {
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
  }, jx = (e) => {
    const { textColor2: o, closeIconColor: t, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: l, errorColor: a, warningColor: s, popoverColor: c, boxShadow2: u, primaryColor: f, lineHeight: v, borderRadius: p, closeColorHover: d, closeColorPressed: m } = e;
    return Object.assign(Object.assign({}, Nx), {
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
      closeColorPressed: m,
      closeIconColor: t,
      closeIconColorHover: r,
      closeIconColorPressed: n,
      closeColorHoverInfo: d,
      closeColorPressedInfo: m,
      closeIconColorInfo: t,
      closeIconColorHoverInfo: r,
      closeIconColorPressedInfo: n,
      closeColorHoverSuccess: d,
      closeColorPressedSuccess: m,
      closeIconColorSuccess: t,
      closeIconColorHoverSuccess: r,
      closeIconColorPressedSuccess: n,
      closeColorHoverError: d,
      closeColorPressedError: m,
      closeIconColorError: t,
      closeIconColorHoverError: r,
      closeIconColorPressedError: n,
      closeColorHoverWarning: d,
      closeColorPressedWarning: m,
      closeIconColorWarning: t,
      closeIconColorHoverWarning: r,
      closeIconColorPressedWarning: n,
      closeColorHoverLoading: d,
      closeColorPressedLoading: m,
      closeIconColorLoading: t,
      closeIconColorHoverLoading: r,
      closeIconColorPressedLoading: n,
      loadingColor: f,
      lineHeight: v,
      borderRadius: p
    });
  }, Vx = {
    name: "Message",
    common: A,
    self: jx
  }, Ux = Vx, Gx = {
    name: "ButtonGroup",
    common: A
  }, Kx = Gx, Xx = {
    name: "InputNumber",
    common: A,
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
  }, Yx = Xx, qx = {
    name: "Layout",
    common: A,
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
        siderToggleBarColor: Z(t, l),
        siderToggleBarColorHover: Z(t, a),
        __invertScrollbar: "false"
      };
    }
  }, Jx = qx, Zx = (e) => {
    const { textColor2: o, cardColor: t, modalColor: r, popoverColor: n, dividerColor: i, borderRadius: l, fontSize: a, hoverColor: s } = e;
    return {
      textColor: o,
      color: t,
      colorHover: s,
      colorModal: r,
      colorHoverModal: Z(r, s),
      colorPopover: n,
      colorHoverPopover: Z(n, s),
      borderColor: i,
      borderColorModal: Z(r, i),
      borderColorPopover: Z(n, i),
      borderRadius: l,
      fontSize: a
    };
  }, Qx = {
    name: "List",
    common: A,
    self: Zx
  }, ey = Qx, oy = {
    name: "LoadingBar",
    common: A,
    self(e) {
      const { primaryColor: o } = e;
      return {
        colorError: "red",
        colorLoading: o,
        height: "2px"
      };
    }
  }, ty = oy, ry = {
    name: "Log",
    common: A,
    peers: {
      Scrollbar: Ee,
      Code: ks
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
  }, ny = ry, iy = {
    name: "Mention",
    common: A,
    peers: {
      InternalSelectMenu: Jt,
      Input: Ue
    },
    self(e) {
      const { boxShadow2: o } = e;
      return {
        menuBoxShadow: o
      };
    }
  }, ly = iy;
  function ay(e, o, t, r) {
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
  const sy = (e) => {
    const { borderRadius: o, textColor3: t, primaryColor: r, textColor2: n, textColor1: i, fontSize: l, dividerColor: a, hoverColor: s, primaryColorHover: c } = e;
    return Object.assign({
      borderRadius: o,
      color: "#0000",
      groupTextColor: t,
      itemColorHover: s,
      itemColorActive: _(r, { alpha: 0.1 }),
      itemColorActiveHover: _(r, { alpha: 0.1 }),
      itemColorActiveCollapsed: _(r, { alpha: 0.1 }),
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
    }, ay("#BBB", r, "#FFF", "#AAA"));
  }, cy = {
    name: "Menu",
    common: A,
    peers: {
      Tooltip: Fr,
      Dropdown: si
    },
    self(e) {
      const { primaryColor: o, primaryColorSuppl: t } = e, r = sy(e);
      return r.itemColorActive = _(o, { alpha: 0.15 }), r.itemColorActiveHover = _(o, { alpha: 0.15 }), r.itemColorActiveCollapsed = _(o, {
        alpha: 0.15
      }), r.itemColorActiveInverted = t, r.itemColorActiveHoverInverted = t, r.itemColorActiveCollapsedInverted = t, r;
    }
  }, dy = cy, uy = {
    titleFontSize: "18px",
    backSize: "22px"
  };
  function fy(e) {
    const { textColor1: o, textColor2: t, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: l, primaryColorPressed: a } = e;
    return Object.assign(Object.assign({}, uy), { titleFontWeight: i, fontSize: n, titleTextColor: o, backColor: t, backColorHover: l, backColorPressed: a, subtitleTextColor: r });
  }
  const hy = {
    name: "PageHeader",
    common: A,
    self: fy
  }, py = {
    iconSize: "22px"
  }, vy = (e) => {
    const { fontSize: o, warningColor: t } = e;
    return Object.assign(Object.assign({}, py), { fontSize: o, iconColor: t });
  }, gy = {
    name: "Popconfirm",
    common: A,
    peers: {
      Button: _e,
      Popover: et
    },
    self: vy
  }, my = gy, by = (e) => {
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
  }, Cy = {
    name: "Progress",
    common: A,
    self(e) {
      const o = by(e);
      return o.textColorLineInner = "rgb(0, 0, 0)", o.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", o;
    }
  }, Ns = Cy, xy = {
    name: "Rate",
    common: A,
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
  }, yy = xy, Sy = {
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
  }, wy = (e) => {
    const { textColor2: o, textColor1: t, errorColor: r, successColor: n, infoColor: i, warningColor: l, lineHeight: a, fontWeightStrong: s } = e;
    return Object.assign(Object.assign({}, Sy), { lineHeight: a, titleFontWeight: s, titleTextColor: t, textColor: o, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: l });
  }, $y = {
    name: "Result",
    common: A,
    self: wy
  }, Py = $y, Ty = {
    railHeight: "4px",
    railWidthVertical: "4px",
    handleSize: "18px",
    dotHeight: "8px",
    dotWidth: "8px",
    dotBorderRadius: "4px"
  }, Iy = {
    name: "Slider",
    common: A,
    self(e) {
      const o = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: t, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: l, cardColor: a, borderRadius: s, fontSize: c, opacityDisabled: u } = e;
      return Object.assign(Object.assign({}, Ty), { fontSize: c, markFontSize: c, railColor: t, railColorHover: t, fillColor: n, fillColorHover: n, opacityDisabled: u, handleColor: "#FFF", dotColor: a, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: o, indicatorTextColor: l, indicatorBorderRadius: s, dotBorder: `2px solid ${t}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
    }
  }, zy = Iy, My = (e) => {
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
  }, ky = {
    name: "Spin",
    common: A,
    self: My
  }, Oy = ky, Ey = (e) => {
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
  }, _y = {
    name: "Statistic",
    common: A,
    self: Ey
  }, Dy = _y, Hy = {
    stepHeaderFontSizeSmall: "14px",
    stepHeaderFontSizeMedium: "16px",
    indicatorIndexFontSizeSmall: "14px",
    indicatorIndexFontSizeMedium: "16px",
    indicatorSizeSmall: "22px",
    indicatorSizeMedium: "28px",
    indicatorIconSizeSmall: "14px",
    indicatorIconSizeMedium: "18px"
  }, By = (e) => {
    const { fontWeightStrong: o, baseColor: t, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: l, textColor2: a } = e;
    return Object.assign(Object.assign({}, Hy), { stepHeaderFontWeight: o, indicatorTextColorProcess: t, indicatorTextColorWait: r, indicatorTextColorFinish: n, indicatorTextColorError: i, indicatorBorderColorProcess: n, indicatorBorderColorWait: r, indicatorBorderColorFinish: n, indicatorBorderColorError: i, indicatorColorProcess: n, indicatorColorWait: "#0000", indicatorColorFinish: "#0000", indicatorColorError: "#0000", splitorColorProcess: r, splitorColorWait: r, splitorColorFinish: n, splitorColorError: r, headerTextColorProcess: l, headerTextColorWait: r, headerTextColorFinish: r, headerTextColorError: i, descriptionTextColorProcess: a, descriptionTextColorWait: r, descriptionTextColorFinish: r, descriptionTextColorError: i });
  }, Ay = {
    name: "Steps",
    common: A,
    self: By
  }, Ry = Ay, Fy = {
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
  }, Ly = {
    name: "Switch",
    common: A,
    self(e) {
      const { primaryColorSuppl: o, opacityDisabled: t, borderRadius: r, primaryColor: n, textColor2: i, baseColor: l } = e, a = "rgba(255, 255, 255, .20)";
      return Object.assign(Object.assign({}, Fy), { iconColor: l, textColor: i, loadingColor: o, opacityDisabled: t, railColor: a, railColorActive: o, buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", buttonColor: "#FFF", railBorderRadiusSmall: r, railBorderRadiusMedium: r, railBorderRadiusLarge: r, buttonBorderRadiusSmall: r, buttonBorderRadiusMedium: r, buttonBorderRadiusLarge: r, boxShadowFocus: `0 0 8px 0 ${_(n, { alpha: 0.3 })}` });
    }
  }, Wy = Ly, Ny = {
    thPaddingSmall: "6px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "6px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px"
  }, jy = (e) => {
    const { dividerColor: o, cardColor: t, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: l, textColor1: a, textColor2: s, borderRadius: c, fontWeightStrong: u, lineHeight: f, fontSizeSmall: v, fontSizeMedium: p, fontSizeLarge: d } = e;
    return Object.assign(Object.assign({}, Ny), {
      fontSizeSmall: v,
      fontSizeMedium: p,
      fontSizeLarge: d,
      lineHeight: f,
      borderRadius: c,
      borderColor: Z(t, o),
      borderColorModal: Z(r, o),
      borderColorPopover: Z(n, o),
      tdColor: t,
      tdColorModal: r,
      tdColorPopover: n,
      tdColorStriped: Z(t, l),
      tdColorStripedModal: Z(r, l),
      tdColorStripedPopover: Z(n, l),
      thColor: Z(t, i),
      thColorModal: Z(r, i),
      thColorPopover: Z(n, i),
      thTextColor: a,
      tdTextColor: s,
      thFontWeight: u
    });
  }, Vy = {
    name: "Table",
    common: A,
    self: jy
  }, Uy = Vy, Gy = {
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
  }, Ky = (e) => {
    const { textColor2: o, primaryColor: t, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, tabColor: c, baseColor: u, dividerColor: f, fontWeight: v, textColor1: p, borderRadius: d, fontSize: m, fontWeightStrong: C } = e;
    return Object.assign(Object.assign({}, Gy), {
      colorSegment: c,
      tabFontSizeCard: m,
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
      fontWeightStrong: C
    });
  }, Xy = {
    name: "Tabs",
    common: A,
    self(e) {
      const o = Ky(e), { inputColor: t } = e;
      return o.colorSegment = t, o.tabColorSegment = t, o;
    }
  }, Yy = Xy, qy = (e) => {
    const { textColor1: o, textColor2: t, fontWeightStrong: r, fontSize: n } = e;
    return {
      fontSize: n,
      titleTextColor: o,
      textColor: t,
      titleFontWeight: r
    };
  }, Jy = {
    name: "Thing",
    common: A,
    self: qy
  }, Zy = Jy, Qy = {
    titleMarginMedium: "0 0 6px 0",
    titleMarginLarge: "-2px 0 6px 0",
    titleFontSizeMedium: "14px",
    titleFontSizeLarge: "16px",
    iconSizeMedium: "14px",
    iconSizeLarge: "14px"
  }, e1 = {
    name: "Timeline",
    common: A,
    self(e) {
      const { textColor3: o, infoColorSuppl: t, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: l, textColor2: a, railColor: s, fontWeightStrong: c, fontSize: u } = e;
      return Object.assign(Object.assign({}, Qy), { contentFontSize: u, titleFontWeight: c, circleBorder: `2px solid ${o}`, circleBorderInfo: `2px solid ${t}`, circleBorderError: `2px solid ${r}`, circleBorderSuccess: `2px solid ${n}`, circleBorderWarning: `2px solid ${i}`, iconColor: o, iconColorInfo: t, iconColorError: r, iconColorSuccess: n, iconColorWarning: i, titleTextColor: l, contentTextColor: a, metaTextColor: o, lineColor: s });
    }
  }, o1 = e1, t1 = {
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
  }, r1 = {
    name: "Transfer",
    common: A,
    peers: {
      Checkbox: It,
      Scrollbar: Ee,
      Input: Ue,
      Empty: Qo,
      Button: _e
    },
    self(e) {
      const { fontWeight: o, fontSizeLarge: t, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: l, borderRadius: a, inputColor: s, tableHeaderColor: c, textColor1: u, textColorDisabled: f, textColor2: v, textColor3: p, hoverColor: d, closeColorHover: m, closeColorPressed: C, closeIconColor: h, closeIconColorHover: S, closeIconColorPressed: D, dividerColor: T } = e;
      return Object.assign(Object.assign({}, t1), {
        itemHeightSmall: l,
        itemHeightMedium: l,
        itemHeightLarge: i,
        fontSizeSmall: n,
        fontSizeMedium: r,
        fontSizeLarge: t,
        borderRadius: a,
        dividerColor: T,
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
        closeColorHover: m,
        closeColorPressed: C,
        closeIconColor: h,
        closeIconColorHover: S,
        closeIconColorPressed: D
      });
    }
  }, n1 = r1, i1 = (e) => {
    const { borderRadiusSmall: o, hoverColor: t, pressedColor: r, primaryColor: n, textColor3: i, textColor2: l, textColorDisabled: a, fontSize: s } = e;
    return {
      fontSize: s,
      nodeBorderRadius: o,
      nodeColorHover: t,
      nodeColorPressed: r,
      nodeColorActive: _(n, { alpha: 0.1 }),
      arrowColor: i,
      nodeTextColor: l,
      nodeTextColorDisabled: a,
      loadingColor: n,
      dropMarkColor: n
    };
  }, l1 = {
    name: "Tree",
    common: A,
    peers: {
      Checkbox: It,
      Scrollbar: Ee,
      Empty: Qo
    },
    self(e) {
      const { primaryColor: o } = e, t = i1(e);
      return t.nodeColorActive = _(o, { alpha: 0.15 }), t;
    }
  }, js = l1, a1 = {
    name: "TreeSelect",
    common: A,
    peers: {
      Tree: js,
      Empty: Qo,
      InternalSelection: ai
    }
  }, s1 = a1, c1 = {
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
  }, d1 = (e) => {
    const { primaryColor: o, textColor2: t, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: l, dividerColor: a, fontWeightStrong: s, textColor1: c, textColor3: u, infoColor: f, warningColor: v, errorColor: p, successColor: d, codeColor: m } = e;
    return Object.assign(Object.assign({}, c1), { aTextColor: o, blockquoteTextColor: t, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: l, liTextColor: t, liLineHeight: n, liFontSize: i, hrColor: a, headerFontWeight: s, headerTextColor: c, pTextColor: t, pTextColor1Depth: c, pTextColor2Depth: t, pTextColor3Depth: u, pLineHeight: n, pFontSize: i, headerBarColor: o, headerBarColorPrimary: o, headerBarColorInfo: f, headerBarColorError: p, headerBarColorWarning: v, headerBarColorSuccess: d, textColor: t, textColor1Depth: c, textColor2Depth: t, textColor3Depth: u, textColorPrimary: o, textColorInfo: f, textColorSuccess: d, textColorWarning: v, textColorError: p, codeTextColor: t, codeColor: m, codeBorder: "1px solid #0000" });
  }, u1 = {
    name: "Typography",
    common: A,
    self: d1
  }, f1 = u1, h1 = (e) => {
    const { iconColor: o, primaryColor: t, errorColor: r, textColor2: n, successColor: i, opacityDisabled: l, actionColor: a, borderColor: s, hoverColor: c, lineHeight: u, borderRadius: f, fontSize: v } = e;
    return {
      fontSize: v,
      lineHeight: u,
      borderRadius: f,
      draggerColor: a,
      draggerBorder: `1px dashed ${s}`,
      draggerBorderHover: `1px dashed ${t}`,
      itemColorHover: c,
      itemColorHoverError: _(r, {
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
  }, p1 = {
    name: "Upload",
    common: A,
    peers: {
      Button: _e,
      Progress: Ns
    },
    self(e) {
      const { errorColor: o } = e, t = h1(e);
      return t.itemColorHoverError = _(o, {
        alpha: 0.09
      }), t;
    }
  }, v1 = p1, g1 = {
    name: "Watermark",
    common: A,
    self(e) {
      const { fontFamily: o } = e;
      return {
        fontFamily: o
      };
    }
  }, m1 = g1, b1 = {
    name: "Row",
    common: A
  }, C1 = b1, x1 = {
    name: "Image",
    common: A,
    peers: {
      Tooltip: Fr
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
  }, y1 = {
    extraFontSize: "12px",
    width: "440px"
  }, S1 = {
    name: "Transfer",
    common: A,
    peers: {
      Checkbox: It,
      Scrollbar: Ee,
      Input: Ue,
      Empty: Qo,
      Button: _e
    },
    self(e) {
      const { iconColorDisabled: o, iconColor: t, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: l, heightLarge: a, heightMedium: s, heightSmall: c, borderRadius: u, inputColor: f, tableHeaderColor: v, textColor1: p, textColorDisabled: d, textColor2: m, hoverColor: C } = e;
      return Object.assign(Object.assign({}, y1), {
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
        extraTextColor: m,
        filterDividerColor: "#0000",
        itemTextColor: m,
        itemTextColorDisabled: d,
        itemColorPending: C,
        titleFontWeight: r,
        iconColor: t,
        iconColorDisabled: o
      });
    }
  }, w1 = S1, $1 = {
    name: "Skeleton",
    common: A,
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
  }, P1 = () => ({}), T1 = {
    name: "Equation",
    common: A,
    self: P1
  }, I1 = T1, Vs = {
    name: "dark",
    common: A,
    Alert: v0,
    Anchor: C0,
    AutoComplete: I0,
    Avatar: zs,
    AvatarGroup: E0,
    BackTop: H0,
    Badge: A0,
    Breadcrumb: W0,
    Button: _e,
    ButtonGroup: Kx,
    Calendar: X0,
    Card: Ms,
    Carousel: rC,
    Cascader: cC,
    Checkbox: It,
    Code: ks,
    Collapse: hC,
    CollapseTransition: gC,
    ColorPicker: J0,
    DataTable: NC,
    DatePicker: rx,
    Descriptions: ax,
    Dialog: Ls,
    Divider: gx,
    Drawer: Cx,
    Dropdown: si,
    DynamicInput: Sx,
    DynamicTags: Tx,
    Element: zx,
    Empty: Qo,
    Ellipsis: Bs,
    Equation: I1,
    Form: Ex,
    GradientText: Dx,
    Icon: XC,
    IconWrapper: Ax,
    Image: x1,
    Input: Ue,
    InputNumber: Yx,
    LegacyTransfer: w1,
    Layout: Jx,
    List: ey,
    LoadingBar: ty,
    Log: ny,
    Menu: dy,
    Mention: ly,
    Message: Ux,
    Modal: hx,
    Notification: Wx,
    PageHeader: hy,
    Pagination: Ds,
    Popconfirm: my,
    Popover: et,
    Popselect: Os,
    Progress: Ns,
    Radio: As,
    Rate: yy,
    Result: Py,
    Row: C1,
    Scrollbar: Ee,
    Select: _s,
    Skeleton: $1,
    Slider: zy,
    Space: Ws,
    Spin: Oy,
    Statistic: Dy,
    Steps: Ry,
    Switch: Wy,
    Table: Uy,
    Tabs: Yy,
    Tag: $s,
    Thing: Zy,
    TimePicker: Fs,
    Timeline: o1,
    Tooltip: Fr,
    Transfer: n1,
    Tree: js,
    TreeSelect: s1,
    Typography: f1,
    Upload: v1,
    Watermark: m1
  }, z1 = "/leftarrow.svg", M1 = "/circle.svg", k1 = "/rightarrow.svg", wl = {
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
  }, Hn = {
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
  }, $l = {
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
  }, O1 = [
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
  ], E1 = Ul("coa", {
    state: () => ({
      coa: structuredClone(Hn)
    }),
    actions: {
      setAll(e) {
        this.coa = e;
      },
      getAll() {
        return this.coa;
      }
    }
  }), Pl = F(Vs), _1 = F("Dark"), Tl = {
    common: {
      bodyColor: "#23313f",
      cardColor: "#293949",
      railColor: "#555",
      primaryColorSuppl: "#fff"
    }
  }, D1 = Ul("theme", {
    state: () => ({
      theme: Vs
    }),
    actions: {
      setTheme(e) {
        Pl.value = e;
      },
      setThemeOverrides(e) {
        Tl.common = e.common;
      }
    },
    getters: {
      getTheme() {
        return Pl.value;
      },
      getThemeOverrides() {
        return Tl;
      },
      getSelectedTheme() {
        return _1.value;
      }
    }
  }), H1 = { class: "w-full h-full" }, B1 = { class: "flex flex-row justify-center p-5 relative" }, A1 = /* @__PURE__ */ be("img", { src: z1 }, null, -1), R1 = /* @__PURE__ */ be("img", { src: M1 }, null, -1), F1 = /* @__PURE__ */ be("img", { src: k1 }, null, -1), L1 = { class: "m-5" }, W1 = { class: "flex" }, N1 = { class: "w-1/2 mr-4" }, j1 = /* @__PURE__ */ be("h3", { class: "mb-3 text-lg font-semibold" }, "Red", -1), V1 = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg" }, U1 = ["onClick"], G1 = { class: "w-1/3 mr-4" }, K1 = /* @__PURE__ */ be("h3", { class: "mb-3 text-lg font-semibold" }, "Neutral", -1), X1 = { class: "list-none border border-gray-300 p-6 rounded-lg" }, Y1 = ["onClick"], q1 = { class: "w-1/2" }, J1 = /* @__PURE__ */ be("h3", { class: "mb-3 text-lg font-semibold" }, "Blue", -1), Z1 = { class: "list-none border border-gray-300 p-6 rounded-lg" }, Q1 = ["onClick"], eS = /* @__PURE__ */ ie({
    __name: "CoalitionComponent",
    setup(e) {
      const o = E1(), t = "Select a coalition preset", r = E(() => o.coa.red), n = E(() => o.coa.blue), i = E(() => o.coa.neutrals), l = F({
        list: "red",
        index: 0
      }), a = (T) => {
        const z = O1.find((O) => O.value === T);
        return z ? z.label : null;
      }, s = (T, z) => {
        l.value.list = T, l.value.index = z;
      }, c = (T, z, O) => {
        if (!O)
          return;
        const b = {
          red: {
            list: r,
            sortedList: d
          },
          blue: {
            list: n,
            sortedList: m
          },
          neutral: {
            list: i,
            sortedList: C
          }
        }, $ = b[T], w = b[z], x = $.sortedList.value[l.value.index], P = $.list.value.indexOf(x), M = $.list.value.splice(P, 1)[0];
        w.list.value.push(M), l.value.list = z, l.value.index = -1;
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
      }, p = (T) => T.value.slice().sort((z, O) => z - O), d = E(() => p(r)), m = E(() => p(n)), C = E(() => p(i)), h = E(() => ({
        red: d.value,
        neutrals: C.value,
        blue: m.value
      })), S = E({
        get() {
          return JSON.stringify(o.coa) === JSON.stringify($l) ? "Modern" : JSON.stringify(o.coa) === JSON.stringify(wl) ? "ColdWar" : JSON.stringify(o.coa) === JSON.stringify(Hn) ? "WW2" : "Custom";
        },
        set(T) {
          T === "Modern" ? o.setAll(structuredClone($l)) : T === "ColdWar" ? o.setAll(structuredClone(wl)) : T === "WW2" ? o.setAll(structuredClone(Hn)) : (S.value = "Custom", o.setAll(structuredClone(h.value)));
        }
      }), D = [
        { label: "Modern", value: "Modern" },
        { label: "Cold War 1947-1991", value: "ColdWar" },
        { label: "WWII", value: "WW2" },
        { label: "Custom", value: "Custom" }
      ];
      return (T, z) => (zo(), Ao("div", H1, [
        be("div", B1, [
          ut(Xe(VC), {
            trigger: "hover",
            class: "w-full"
          }, {
            trigger: ft(() => [
              ut(Xe(PC), {
                value: Xe(S),
                "onUpdate:value": z[0] || (z[0] = (O) => bt(S) ? S.value = O : null),
                options: D,
                class: "absolute left-0 ml-5 w-1/4"
              }, null, 8, ["value"])
            ]),
            default: ft(() => [
              xt(" " + Zt(t))
            ]),
            _: 1
          }),
          be("button", { onClick: u }, [
            ut(Xe(dn), { size: "35" }, {
              default: ft(() => [
                A1
              ]),
              _: 1
            })
          ]),
          be("button", { onClick: v }, [
            ut(Xe(dn), { size: "35" }, {
              default: ft(() => [
                R1
              ]),
              _: 1
            })
          ]),
          be("button", { onClick: f }, [
            ut(Xe(dn), { size: "35" }, {
              default: ft(() => [
                F1
              ]),
              _: 1
            })
          ])
        ]),
        be("div", L1, [
          be("div", W1, [
            be("div", N1, [
              j1,
              be("ul", V1, [
                (zo(!0), Ao(to, null, Lr(Xe(d), (O, b) => (zo(), Ao("li", {
                  key: b,
                  class: Wr(["mb-2 cursor-pointer rounded", {
                    "bg-blue-200 pl-2 text-black": l.value.list === "red" && l.value.index === b
                  }]),
                  onClick: ($) => s("red", b)
                }, Zt(a(O)), 11, U1))), 128))
              ])
            ]),
            be("div", G1, [
              K1,
              be("ul", X1, [
                (zo(!0), Ao(to, null, Lr(Xe(C), (O, b) => (zo(), Ao("li", {
                  key: b,
                  class: Wr(["mb-2 cursor-pointer rounded", {
                    "bg-blue-200 pl-2 text-black": l.value.list === "neutral" && l.value.index === b
                  }]),
                  onClick: ($) => s("neutral", b)
                }, Zt(a(O)), 11, Y1))), 128))
              ])
            ]),
            be("div", q1, [
              J1,
              be("ul", Z1, [
                (zo(!0), Ao(to, null, Lr(Xe(m), (O, b) => (zo(), Ao("li", {
                  key: b,
                  class: Wr(["mb-2 cursor-pointer rounded", {
                    "bg-blue-200 pl-2 text-black": l.value.list === "blue" && l.value.index === b
                  }]),
                  onClick: ($) => s("blue", b)
                }, Zt(a(O)), 11, Q1))), 128))
              ])
            ])
          ])
        ])
      ]));
    }
  }), oS = /* @__PURE__ */ ie({
    __name: "App",
    setup(e) {
      const o = D1(), t = F(o.theme), r = F(o.getSelectedTheme), n = F(o.getThemeOverrides);
      return (i, l) => (zo(), xc(Xe(bC), {
        theme: r.value === "Dark" ? t.value : null,
        "theme-overrides": r.value === "Dark" ? n.value : null
      }, {
        default: ft(() => [
          ut(eS)
        ]),
        _: 1
      }, 8, ["theme", "theme-overrides"]));
    }
  }), tS = Gc(), Us = yc(oS);
  Us.use(tS);
  Us.mount("#app");
});
export default rS();
