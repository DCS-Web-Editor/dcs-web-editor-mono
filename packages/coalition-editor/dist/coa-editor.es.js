var hc = (e, o) => () => (o || e((o = { exports: {} }).exports, o), o.exports);
import { effectScope as Tl, ref as F, markRaw as Ye, toRaw as Mr, getCurrentInstance as Hn, inject as he, watch as ye, unref as pc, reactive as vc, isRef as Lt, isReactive as Bn, toRef as se, nextTick as mt, computed as E, getCurrentScope as gc, onScopeDispose as mc, toRefs as si, createTextVNode as bt, Fragment as oo, Comment as An, isVNode as bc, defineComponent as ie, readonly as dn, onMounted as Ve, onBeforeUnmount as Ze, provide as to, withDirectives as Xt, h as y, Teleport as Cc, renderSlot as Il, onActivated as zl, onDeactivated as Ml, mergeProps as kr, onBeforeMount as Rn, watchEffect as vo, Transition as Ct, vShow as kl, cloneVNode as xc, resolveComponent as Dt, openBlock as Io, createElementBlock as Bo, createElementVNode as be, createVNode as dt, withCtx as ut, toDisplayString as Zt, renderList as Lr, normalizeClass as Wr, createBlock as yc, createApp as Sc } from "vue";
var cS = hc((He, Be) => {
  var Ol = !1;
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
  function wc() {
    return El().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function El() {
    return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
  }
  const $c = typeof Proxy == "function", Pc = "devtools-plugin:setup", Tc = "plugin:settings:set";
  let it, un;
  function Ic() {
    var e;
    return it !== void 0 || (typeof window < "u" && window.performance ? (it = !0, un = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (it = !0, un = global.perf_hooks.performance) : it = !1), it;
  }
  function zc() {
    return Ic() ? un.now() : Date.now();
  }
  class Mc {
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
          return zc();
        }
      }, t && t.on(Tc, (l, a) => {
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
  function _l(e, o) {
    const t = e, r = El(), n = wc(), i = $c && t.enableEarlyProxy;
    if (n && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
      n.emit(Pc, e, o);
    else {
      const l = i ? new Mc(t, n) : null;
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
  let Et;
  const Wt = (e) => Et = e, Dl = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
    /* istanbul ignore next */
    Symbol()
  );
  function Go(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var ro;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(ro || (ro = {}));
  const Or = typeof window < "u", Ht = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && Or, ci = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
  function kc(e, { autoBom: o = !1 } = {}) {
    return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
  }
  function Fn(e, o, t) {
    const r = new XMLHttpRequest();
    r.open("GET", e), r.responseType = "blob", r.onload = function() {
      Al(r.response, o, t);
    }, r.onerror = function() {
      console.error("could not download file");
    }, r.send();
  }
  function Hl(e) {
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
  const dr = typeof navigator == "object" ? navigator : { userAgent: "" }, Bl = /* @__PURE__ */ (() => /Macintosh/.test(dr.userAgent) && /AppleWebKit/.test(dr.userAgent) && !/Safari/.test(dr.userAgent))(), Al = Or ? (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Bl ? Oc : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in dr ? Ec : (
        // Fallback to using FileReader and a popup
        _c
      )
    )
  ) : () => {
  };
  function Oc(e, o = "download", t) {
    const r = document.createElement("a");
    r.download = o, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? Hl(r.href) ? Fn(e, o, t) : (r.target = "_blank", cr(r)) : cr(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
      URL.revokeObjectURL(r.href);
    }, 4e4), setTimeout(function() {
      cr(r);
    }, 0));
  }
  function Ec(e, o = "download", t) {
    if (typeof e == "string")
      if (Hl(e))
        Fn(e, o, t);
      else {
        const r = document.createElement("a");
        r.href = e, r.target = "_blank", setTimeout(function() {
          cr(r);
        });
      }
    else
      navigator.msSaveOrOpenBlob(kc(e, t), o);
  }
  function _c(e, o, t, r) {
    if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
      return Fn(e, o, t);
    const n = e.type === "application/octet-stream", i = /constructor/i.test(String(ci.HTMLElement)) || "safari" in ci, l = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((l || n && i || Bl) && typeof FileReader < "u") {
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
  function Ln(e) {
    return "_a" in e && "install" in e;
  }
  function Rl() {
    if (!("clipboard" in navigator))
      return Ce("Your browser doesn't support the Clipboard API", "error"), !0;
  }
  function Fl(e) {
    return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Ce('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
  }
  async function Dc(e) {
    if (!Rl())
      try {
        await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Ce("Global state copied to clipboard.");
      } catch (o) {
        if (Fl(o))
          return;
        Ce("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Hc(e) {
    if (!Rl())
      try {
        e.state.value = JSON.parse(await navigator.clipboard.readText()), Ce("Global state pasted from clipboard.");
      } catch (o) {
        if (Fl(o))
          return;
        Ce("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
      }
  }
  async function Bc(e) {
    try {
      Al(new Blob([JSON.stringify(e.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (o) {
      Ce("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  let ho;
  function Ac() {
    ho || (ho = document.createElement("input"), ho.type = "file", ho.accept = ".json");
    function e() {
      return new Promise((o, t) => {
        ho.onchange = async () => {
          const r = ho.files;
          if (!r)
            return o(null);
          const n = r.item(0);
          return o(n ? { text: await n.text(), file: n } : null);
        }, ho.oncancel = () => o(null), ho.onerror = t, ho.click();
      });
    }
    return e;
  }
  async function Rc(e) {
    try {
      const t = await (await Ac())();
      if (!t)
        return;
      const { text: r, file: n } = t;
      e.state.value = JSON.parse(r), Ce(`Global state imported from "${n.name}".`);
    } catch (o) {
      Ce("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
    }
  }
  function Xe(e) {
    return {
      _custom: {
        display: e
      }
    };
  }
  const Ll = "🍍 Pinia (root)", fn = "_root";
  function Fc(e) {
    return Ln(e) ? {
      id: fn,
      label: Ll
    } : {
      id: e.$id,
      label: e.$id
    };
  }
  function Lc(e) {
    if (Ln(e)) {
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
  function Wc(e) {
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
  function Nc(e) {
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
  let ft = !0;
  const ur = [], Ro = "pinia:mutations", $e = "pinia", { assign: jc } = Object, vr = (e) => "🍍 " + e;
  function Vc(e, o) {
    _l({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes: ur,
      app: e
    }, (t) => {
      typeof t.now != "function" && Ce("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
        id: Ro,
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
              Dc(o);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await Hc(o), t.sendInspectorTree($e), t.sendInspectorState($e);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              Bc(o);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await Rc(o), t.sendInspectorTree($e), t.sendInspectorState($e);
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
          n = n.concat(Array.from(o._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : Ll.toLowerCase().includes(r.filter.toLowerCase())) : n).map(Fc);
        }
      }), t.on.getInspectorState((r) => {
        if (r.app === e && r.inspectorId === $e) {
          const n = r.nodeId === fn ? o : o._s.get(r.nodeId);
          if (!n)
            return;
          n && (r.state = Lc(n));
        }
      }), t.on.editInspectorState((r, n) => {
        if (r.app === e && r.inspectorId === $e) {
          const i = r.nodeId === fn ? o : o._s.get(r.nodeId);
          if (!i)
            return Ce(`store "${r.nodeId}" not found`, "error");
          const { path: l } = r;
          Ln(i) ? l.unshift("state") : (l.length !== 1 || !i._customProperties.has(l[0]) || l[0] in i.$state) && l.unshift("$state"), ft = !1, r.set(i, l, r.state.value), ft = !0;
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
          l[0] = "$state", ft = !1, r.set(i, l, r.state.value), ft = !0;
        }
      });
    });
  }
  function Uc(e, o) {
    ur.includes(vr(o.$id)) || ur.push(vr(o.$id)), _l({
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
        const u = Wl++;
        t.addTimelineEvent({
          layerId: Ro,
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
          Lo = void 0, t.addTimelineEvent({
            layerId: Ro,
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
          Lo = void 0, t.addTimelineEvent({
            layerId: Ro,
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
        ye(() => pc(o[l]), (a, s) => {
          t.notifyComponentUpdate(), t.sendInspectorState($e), ft && t.addTimelineEvent({
            layerId: Ro,
            event: {
              time: r(),
              title: "Change",
              subtitle: l,
              data: {
                newValue: a,
                oldValue: s
              },
              groupId: Lo
            }
          });
        }, { deep: !0 });
      }), o.$subscribe(({ events: l, type: a }, s) => {
        if (t.notifyComponentUpdate(), t.sendInspectorState($e), !ft)
          return;
        const c = {
          time: r(),
          title: Nc(a),
          data: jc({ store: Xe(o.$id) }, Wc(l)),
          groupId: Lo
        };
        Lo = void 0, a === ro.patchFunction ? c.subtitle = "⤵️" : a === ro.patchObject ? c.subtitle = "🧩" : l && !Array.isArray(l) && (c.subtitle = l.type), l && (c.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: l
          }
        }), t.addTimelineEvent({
          layerId: Ro,
          event: c
        });
      }, { detached: !0, flush: "sync" });
      const n = o._hotUpdate;
      o._hotUpdate = Ye((l) => {
        n(l), t.addTimelineEvent({
          layerId: Ro,
          event: {
            time: r(),
            title: "🔥 " + o.$id,
            subtitle: "HMR update",
            data: {
              store: Xe(o.$id),
              info: Xe("HMR update")
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
  let Wl = 0, Lo;
  function di(e, o) {
    const t = o.reduce((r, n) => (r[n] = Mr(e)[n], r), {});
    for (const r in t)
      e[r] = function() {
        const n = Wl, i = new Proxy(e, {
          get(...l) {
            return Lo = n, Reflect.get(...l);
          },
          set(...l) {
            return Lo = n, Reflect.set(...l);
          }
        });
        return t[r].apply(i, arguments);
      };
  }
  function Gc({ app: e, store: o, options: t }) {
    if (!o.$id.startsWith("__hot:")) {
      if (t.state && (o._isOptionsAPI = !0), typeof t.state == "function") {
        di(
          // @ts-expect-error: can cast the store...
          o,
          Object.keys(t.actions)
        );
        const r = o._hotUpdate;
        Mr(o)._hotUpdate = function(n) {
          r.apply(this, arguments), di(o, Object.keys(n._hmrPayload.actions));
        };
      }
      Uc(
        e,
        // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
        o
      );
    }
  }
  function Kc() {
    const e = Tl(!0), o = e.run(() => F({}));
    let t = [], r = [];
    const n = Ye({
      install(i) {
        Wt(n), n._a = i, i.provide(Dl, n), i.config.globalProperties.$pinia = n, Ht && Vc(i, n), r.forEach((l) => t.push(l)), r = [];
      },
      use(i) {
        return !this._a && !Ol ? r.push(i) : t.push(i), this;
      },
      _p: t,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: e,
      _s: /* @__PURE__ */ new Map(),
      state: o
    });
    return Ht && typeof Proxy < "u" && n.use(Gc), n;
  }
  function Nl(e, o) {
    for (const t in o) {
      const r = o[t];
      if (!(t in e))
        continue;
      const n = e[t];
      Go(n) && Go(r) && !Lt(r) && !Bn(r) ? e[t] = Nl(n, r) : e[t] = r;
    }
    return e;
  }
  const jl = () => {
  };
  function ui(e, o, t, r = jl) {
    e.push(o);
    const n = () => {
      const i = e.indexOf(o);
      i > -1 && (e.splice(i, 1), r());
    };
    return !t && gc() && mc(n), n;
  }
  function lt(e, ...o) {
    e.slice().forEach((t) => {
      t(...o);
    });
  }
  function hn(e, o) {
    e instanceof Map && o instanceof Map && o.forEach((t, r) => e.set(r, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
    for (const t in o) {
      if (!o.hasOwnProperty(t))
        continue;
      const r = o[t], n = e[t];
      Go(n) && Go(r) && e.hasOwnProperty(t) && !Lt(r) && !Bn(r) ? e[t] = hn(n, r) : e[t] = r;
    }
    return e;
  }
  const Xc = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
    /* istanbul ignore next */
    Symbol()
  );
  function Yc(e) {
    return !Go(e) || !e.hasOwnProperty(Xc);
  }
  const { assign: Ne } = Object;
  function fi(e) {
    return !!(Lt(e) && e.effect);
  }
  function hi(e, o, t, r) {
    const { state: n, actions: i, getters: l } = o, a = t.state.value[e];
    let s;
    function c() {
      !a && (process.env.NODE_ENV === "production" || !r) && (t.state.value[e] = n ? n() : {});
      const u = process.env.NODE_ENV !== "production" && r ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        si(F(n ? n() : {}).value)
      ) : si(t.state.value[e]);
      return Ne(u, i, Object.keys(l || {}).reduce((f, v) => (process.env.NODE_ENV !== "production" && v in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), f[v] = Ye(E(() => {
        Wt(t);
        const p = t._s.get(e);
        return l[v].call(p, p);
      })), f), {}));
    }
    return s = pn(e, c, o, t, r, !0), s;
  }
  function pn(e, o, t = {}, r, n, i) {
    let l;
    const a = Ne({ actions: {} }, t);
    if (process.env.NODE_ENV !== "production" && !r._e.active)
      throw new Error("Pinia destroyed");
    const s = {
      deep: !0
      // flush: 'post',
    };
    process.env.NODE_ENV !== "production" && !Ol && (s.onTrigger = (S) => {
      c ? p = S : c == !1 && !C._hotUpdating && (Array.isArray(p) ? p.push(S) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
    });
    let c, u, f = Ye([]), v = Ye([]), p;
    const d = r.state.value[e];
    !i && !d && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
    const m = F({});
    let b;
    function h(S) {
      let x;
      c = u = !1, process.env.NODE_ENV !== "production" && (p = []), typeof S == "function" ? (S(r.state.value[e]), x = {
        type: ro.patchFunction,
        storeId: e,
        events: p
      }) : (hn(r.state.value[e], S), x = {
        type: ro.patchObject,
        payload: S,
        storeId: e,
        events: p
      });
      const P = b = Symbol();
      mt().then(() => {
        b === P && (c = !0);
      }), u = !0, lt(f, x, r.state.value[e]);
    }
    const w = i ? function() {
      const { state: x } = t, P = x ? x() : {};
      this.$patch((z) => {
        Ne(z, P);
      });
    } : (
      /* istanbul ignore next */
      process.env.NODE_ENV !== "production" ? () => {
        throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
      } : jl
    );
    function O() {
      l.stop(), f = [], v = [], r._s.delete(e);
    }
    function I(S, x) {
      return function() {
        Wt(r);
        const P = Array.from(arguments), z = [], W = [];
        function H(V) {
          z.push(V);
        }
        function N(V) {
          W.push(V);
        }
        lt(v, {
          args: P,
          name: S,
          store: C,
          after: H,
          onError: N
        });
        let G;
        try {
          G = x.apply(this && this.$id === e ? this : C, P);
        } catch (V) {
          throw lt(W, V), V;
        }
        return G instanceof Promise ? G.then((V) => (lt(z, V), V)).catch((V) => (lt(W, V), Promise.reject(V))) : (lt(z, G), G);
      };
    }
    const M = /* @__PURE__ */ Ye({
      actions: {},
      getters: {},
      state: [],
      hotState: m
    }), _ = {
      _p: r,
      // _s: scope,
      $id: e,
      $onAction: ui.bind(null, v),
      $patch: h,
      $reset: w,
      $subscribe(S, x = {}) {
        const P = ui(f, S, x.detached, () => z()), z = l.run(() => ye(() => r.state.value[e], (W) => {
          (x.flush === "sync" ? u : c) && S({
            storeId: e,
            type: ro.direct,
            events: p
          }, W);
        }, Ne({}, s, x)));
        return P;
      },
      $dispose: O
    }, C = vc(process.env.NODE_ENV !== "production" || Ht ? Ne(
      {
        _hmrPayload: M,
        _customProperties: Ye(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      _
      // must be added later
      // setupStore
    ) : _);
    r._s.set(e, C);
    const $ = r._e.run(() => (l = Tl(), l.run(() => o())));
    for (const S in $) {
      const x = $[S];
      if (Lt(x) && !fi(x) || Bn(x))
        process.env.NODE_ENV !== "production" && n ? Qt(m.value, S, se($, S)) : i || (d && Yc(x) && (Lt(x) ? x.value = d[S] : hn(x, d[S])), r.state.value[e][S] = x), process.env.NODE_ENV !== "production" && M.state.push(S);
      else if (typeof x == "function") {
        const P = process.env.NODE_ENV !== "production" && n ? x : I(S, x);
        $[S] = P, process.env.NODE_ENV !== "production" && (M.actions[S] = x), a.actions[S] = x;
      } else
        process.env.NODE_ENV !== "production" && fi(x) && (M.getters[S] = i ? (
          // @ts-expect-error
          t.getters[S]
        ) : x, Or && ($._getters || // @ts-expect-error: same
        ($._getters = Ye([]))).push(S));
    }
    if (Ne(C, $), Ne(Mr(C), $), Object.defineProperty(C, "$state", {
      get: () => process.env.NODE_ENV !== "production" && n ? m.value : r.state.value[e],
      set: (S) => {
        if (process.env.NODE_ENV !== "production" && n)
          throw new Error("cannot set hotState");
        h((x) => {
          Ne(x, S);
        });
      }
    }), process.env.NODE_ENV !== "production" && (C._hotUpdate = Ye((S) => {
      C._hotUpdating = !0, S._hmrPayload.state.forEach((x) => {
        if (x in C.$state) {
          const P = S.$state[x], z = C.$state[x];
          typeof P == "object" && Go(P) && Go(z) ? Nl(P, z) : S.$state[x] = z;
        }
        Qt(C, x, se(S.$state, x));
      }), Object.keys(C.$state).forEach((x) => {
        x in S.$state || Nr(C, x);
      }), c = !1, u = !1, r.state.value[e] = se(S._hmrPayload, "hotState"), u = !0, mt().then(() => {
        c = !0;
      });
      for (const x in S._hmrPayload.actions) {
        const P = S[x];
        Qt(C, x, I(x, P));
      }
      for (const x in S._hmrPayload.getters) {
        const P = S._hmrPayload.getters[x], z = i ? (
          // special handling of options api
          E(() => (Wt(r), P.call(C, C)))
        ) : P;
        Qt(C, x, z);
      }
      Object.keys(C._hmrPayload.getters).forEach((x) => {
        x in S._hmrPayload.getters || Nr(C, x);
      }), Object.keys(C._hmrPayload.actions).forEach((x) => {
        x in S._hmrPayload.actions || Nr(C, x);
      }), C._hmrPayload = S._hmrPayload, C._getters = S._getters, C._hotUpdating = !1;
    })), Ht) {
      const S = {
        writable: !0,
        configurable: !0,
        // avoid warning on devtools trying to display this property
        enumerable: !1
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((x) => {
        Object.defineProperty(C, x, Ne({ value: C[x] }, S));
      });
    }
    return r._p.forEach((S) => {
      if (Ht) {
        const x = l.run(() => S({
          store: C,
          app: r._a,
          pinia: r,
          options: a
        }));
        Object.keys(x || {}).forEach((P) => C._customProperties.add(P)), Ne(C, x);
      } else
        Ne(C, l.run(() => S({
          store: C,
          app: r._a,
          pinia: r,
          options: a
        })));
    }), process.env.NODE_ENV !== "production" && C.$state && typeof C.$state == "object" && typeof C.$state.constructor == "function" && !C.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${C.$id}".`), d && i && t.hydrate && t.hydrate(C.$state, d), c = !0, u = !0, C;
  }
  function Vl(e, o, t) {
    let r, n;
    const i = typeof o == "function";
    typeof e == "string" ? (r = e, n = i ? t : o) : (n = e, r = e.id);
    function l(a, s) {
      const c = Hn();
      if (a = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (process.env.NODE_ENV === "test" && Et && Et._testing ? null : a) || c && he(Dl, null), a && Wt(a), process.env.NODE_ENV !== "production" && !Et)
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      a = Et, a._s.has(r) || (i ? pn(r, o, n, a) : hi(r, n, a), process.env.NODE_ENV !== "production" && (l._pinia = a));
      const u = a._s.get(r);
      if (process.env.NODE_ENV !== "production" && s) {
        const f = "__hot:" + r, v = i ? pn(f, o, n, a, !0) : hi(f, Ne({}, n), a, !0);
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
  const Ul = /* @__PURE__ */ new WeakMap();
  function qc() {
    gr.forEach((e) => e(...Ul.get(e))), gr = [];
  }
  function Gl(e, ...o) {
    Ul.set(e, o), !gr.includes(e) && gr.push(e) === 1 && requestAnimationFrame(qc);
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
  function vn(e) {
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
  const pi = {
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
  }, xt = "^\\s*", yt = "\\s*$", Wo = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", No = "([0-9A-Fa-f])", jo = "([0-9A-Fa-f]{2})", Jc = new RegExp(`${xt}rgb\\s*\\(${Wo},${Wo},${Wo}\\)${yt}`), Zc = new RegExp(`${xt}rgba\\s*\\(${Wo},${Wo},${Wo},${Wo}\\)${yt}`), Qc = new RegExp(`${xt}#${No}${No}${No}${yt}`), ed = new RegExp(`${xt}#${jo}${jo}${jo}${yt}`), od = new RegExp(`${xt}#${No}${No}${No}${No}${yt}`), td = new RegExp(`${xt}#${jo}${jo}${jo}${jo}${yt}`);
  function Oe(e) {
    return parseInt(e, 16);
  }
  function go(e) {
    try {
      let o;
      if (o = ed.exec(e))
        return [Oe(o[1]), Oe(o[2]), Oe(o[3]), 1];
      if (o = Jc.exec(e))
        return [Pe(o[1]), Pe(o[5]), Pe(o[9]), 1];
      if (o = Zc.exec(e))
        return [
          Pe(o[1]),
          Pe(o[5]),
          Pe(o[9]),
          Bt(o[13])
        ];
      if (o = Qc.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          1
        ];
      if (o = td.exec(e))
        return [
          Oe(o[1]),
          Oe(o[2]),
          Oe(o[3]),
          Bt(Oe(o[4]) / 255)
        ];
      if (o = od.exec(e))
        return [
          Oe(o[1] + o[1]),
          Oe(o[2] + o[2]),
          Oe(o[3] + o[3]),
          Bt(Oe(o[4] + o[4]) / 255)
        ];
      if (e in pi)
        return go(pi[e]);
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (o) {
      throw o;
    }
  }
  function rd(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function gn(e, o, t, r) {
    return `rgba(${Pe(e)}, ${Pe(o)}, ${Pe(t)}, ${rd(r)})`;
  }
  function Vr(e, o, t, r, n) {
    return Pe((e * o * (1 - r) + t * r) / n);
  }
  function Z(e, o) {
    Array.isArray(e) || (e = go(e)), Array.isArray(o) || (o = go(o));
    const t = e[3], r = o[3], n = Bt(t + r - t * r);
    return gn(Vr(e[0], t, o[0], r, n), Vr(e[1], t, o[1], r, n), Vr(e[2], t, o[2], r, n), n);
  }
  function D(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : go(e);
    return o.alpha ? gn(t, r, n, o.alpha) : gn(t, r, n, i);
  }
  function pe(e, o) {
    const [t, r, n, i = 1] = Array.isArray(e) ? e : go(e), { lightness: l = 1, alpha: a = 1 } = o;
    return nd([t * l, r * l, n * l, i * a]);
  }
  function Bt(e) {
    const o = Math.round(Number(e) * 100) / 100;
    return o > 1 ? 1 : o < 0 ? 0 : o;
  }
  function Pe(e) {
    const o = Math.round(Number(e));
    return o > 255 ? 255 : o < 0 ? 0 : o;
  }
  function nd(e) {
    const [o, t, r] = e;
    return 3 in e ? `rgba(${Pe(o)}, ${Pe(t)}, ${Pe(r)}, ${Bt(e[3])})` : `rgba(${Pe(o)}, ${Pe(t)}, ${Pe(r)}, 1)`;
  }
  function id(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  }
  function ld(e, o = [], t) {
    const r = {};
    return o.forEach((n) => {
      r[n] = e[n];
    }), Object.assign(r, t);
  }
  function mn(e, o = !0, t = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && t.push(bt(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          mn(r, o, t);
          return;
        }
        if (r.type === oo) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && mn(r.children, o, t);
        } else
          r.type !== An && t.push(r);
      }
    }), t;
  }
  function we(e, ...o) {
    if (Array.isArray(e))
      e.forEach((t) => we(t, ...o));
    else
      return e(...o);
  }
  const ht = (e, ...o) => typeof e == "function" ? e(...o) : typeof e == "string" ? bt(e) : typeof e == "number" ? bt(String(e)) : null, vi = /* @__PURE__ */ new Set();
  function zo(e, o) {
    const t = `[naive/${e}]: ${o}`;
    vi.has(t) || (vi.add(t), console.error(t));
  }
  function br(e, o) {
    console.error(`[naive/${e}]: ${o}`);
  }
  function Kl(e, o) {
    throw new Error(`[naive/${e}]: ${o}`);
  }
  function ad(e) {
    switch (typeof e) {
      case "string":
        return e || void 0;
      case "number":
        return String(e);
      default:
        return;
    }
  }
  function gi(e, o = "default", t = void 0) {
    const r = e[o];
    if (!r)
      return br("getFirstSlotVNode", `slot[${o}] is empty`), null;
    const n = mn(r(t));
    return n.length === 1 ? n[0] : (br("getFirstSlotVNode", `slot[${o}] should have exactly one child`), null);
  }
  function Er(e) {
    return e.some((o) => bc(o) ? !(o.type === An || o.type === oo && !Er(o.children)) : !0) ? e : null;
  }
  function Wn(e, o) {
    return e && Er(e()) || o();
  }
  function pt(e, o) {
    const t = e && Er(e());
    return o(t || null);
  }
  function mi(e) {
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
  const bn = ie({
    render() {
      var e, o;
      return (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e);
    }
  }), sd = /^(\d|\.)+$/, bi = /(\d|\.)+/;
  function fr(e, { c: o = 1, offset: t = 0, attachPx: r = !0 } = {}) {
    if (typeof e == "number") {
      const n = (e + t) * o;
      return n === 0 ? "0" : `${n}px`;
    } else if (typeof e == "string")
      if (sd.test(e)) {
        const n = (Number(e) + t) * o;
        return r ? n === 0 ? "0" : `${n}px` : `${n}`;
      } else {
        const n = bi.exec(e);
        return n ? e.replace(bi, String((Number(n[0]) + t) * o)) : e;
      }
    return e;
  }
  function Ci(e) {
    return e.replace(/#|\(|\)|,|\s/g, "_");
  }
  function cd(e) {
    let o = 0;
    for (let t = 0; t < e.length; ++t)
      e[t] === "&" && ++o;
    return o;
  }
  const Xl = /\s*,(?![^(]*\))\s*/g, dd = /\s+/g;
  function ud(e, o) {
    const t = [];
    return o.split(Xl).forEach((r) => {
      let n = cd(r);
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
  function fd(e, o) {
    const t = [];
    return o.split(Xl).forEach((r) => {
      e.forEach((n) => {
        t.push((n && n + " ") + r);
      });
    }), t;
  }
  function hd(e) {
    let o = [""];
    return e.forEach((t) => {
      t = t && t.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      t && (t.includes("&") ? o = ud(o, t) : o = fd(o, t));
    }), o.join(", ").replace(dd, " ");
  }
  function xi(e) {
    if (!e)
      return;
    const o = e.parentElement;
    o && o.removeChild(e);
  }
  function _r(e) {
    return document.querySelector(`style[cssr-id="${e}"]`);
  }
  function pd(e) {
    const o = document.createElement("style");
    return o.setAttribute("cssr-id", e), o;
  }
  function or(e) {
    return e ? /^\s*@(s|m)/.test(e) : !1;
  }
  const vd = /[A-Z]/g;
  function Yl(e) {
    return e.replace(vd, (o) => "-" + o.toLowerCase());
  }
  function gd(e, o = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((t) => o + `  ${Yl(t[0])}: ${t[1]};`).join(`
`) + `
` + o + "}" : `: ${e};`;
  }
  function md(e, o, t) {
    return typeof e == "function" ? e({
      context: o.context,
      props: t
    }) : e;
  }
  function yi(e, o, t, r) {
    if (!o)
      return "";
    const n = md(o, t, r);
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
      a = Yl(a), s != null && l.push(`  ${a}${gd(s)}`);
    }), e && l.push("}"), l.join(`
`);
  }
  function Cn(e, o, t) {
    e && e.forEach((r) => {
      if (Array.isArray(r))
        Cn(r, o, t);
      else if (typeof r == "function") {
        const n = r(o);
        Array.isArray(n) ? Cn(n, o, t) : n && t(n);
      } else
        r && t(r);
    });
  }
  function ql(e, o, t, r, n, i) {
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
    const s = hd(o), c = yi(s, e.props, r, n);
    a ? (t.push(`${a} {`), i && c && i.insertRule(`${a} {
${c}
}
`)) : (i && c && i.insertRule(c), !i && c.length && t.push(c)), e.children && Cn(e.children, {
      context: r.context,
      props: n
    }, (u) => {
      if (typeof u == "string") {
        const f = yi(s, { raw: u }, r, n);
        i ? i.insertRule(f) : t.push(f);
      } else
        ql(u, o, t, r, n, i);
    }), o.pop(), a && t.push("}"), l && l.after && l.after(r.context);
  }
  function Jl(e, o, t, r = !1) {
    const n = [];
    return ql(e, [], n, o, t, r ? e.instance.__styleSheet : void 0), r ? "" : n.join(`

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
  function bd(e, o, t) {
    const { els: r } = o;
    if (t === void 0)
      r.forEach(xi), o.els = [];
    else {
      const n = _r(t);
      n && r.includes(n) && (xi(n), o.els = r.filter((i) => i !== n));
    }
  }
  function Si(e, o) {
    e.push(o);
  }
  function Cd(e, o, t, r, n, i, l, a, s) {
    if (i && !s) {
      if (t === void 0) {
        console.error("[css-render/mount]: `id` is required in `silent` mode.");
        return;
      }
      const v = window.__cssrContext;
      v[t] || (v[t] = !0, Jl(o, e, r, i));
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
    const f = u ?? pd(t);
    if (c === void 0 && (c = o.render(r)), f.textContent = c, u !== null)
      return u;
    if (a) {
      const v = document.head.querySelector(`meta[name="${a}"]`);
      if (v)
        return document.head.insertBefore(f, v), Si(o.els, f), f;
    }
    return n ? document.head.insertBefore(f, document.head.querySelector("style, link")) : document.head.appendChild(f), Si(o.els, f), f;
  }
  function xd(e) {
    return Jl(this, this.instance, e);
  }
  function yd(e = {}) {
    const { id: o, ssr: t, props: r, head: n = !1, silent: i = !1, force: l = !1, anchorMetaName: a } = e;
    return Cd(this.instance, this, o, r, n, i, l, a, t);
  }
  function Sd(e = {}) {
    const { id: o } = e;
    bd(this.instance, this, o);
  }
  const tr = function(e, o, t, r) {
    return {
      instance: e,
      $: o,
      props: t,
      children: r,
      els: [],
      render: xd,
      mount: yd,
      unmount: Sd
    };
  }, wd = function(e, o, t, r) {
    return Array.isArray(o) ? tr(e, { $: null }, null, o) : Array.isArray(t) ? tr(e, o, null, t) : Array.isArray(r) ? tr(e, o, t, r) : tr(e, o, t, null);
  };
  function Zl(e = {}) {
    let o = null;
    const t = {
      c: (...r) => wd(t, ...r),
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
  function $d(e, o) {
    if (e === void 0)
      return !1;
    if (o) {
      const { context: { ids: t } } = o;
      return t.has(e);
    }
    return _r(e) !== null;
  }
  function Pd(e) {
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
      let m, b;
      return {
        before(h) {
          m = h.bem.b, b = h.bem.els, h.bem.els = null;
        },
        after(h) {
          h.bem.b = m, h.bem.els = b;
        },
        $({ context: h, props: w }) {
          return d = typeof d == "string" ? d : d({ context: h, props: w }), h.bem.b = d, `${(w == null ? void 0 : w.bPrefix) || o}${h.bem.b}`;
        }
      };
    }
    function a(d) {
      let m;
      return {
        before(b) {
          m = b.bem.els;
        },
        after(b) {
          b.bem.els = m;
        },
        $({ context: b, props: h }) {
          return d = typeof d == "string" ? d : d({ context: b, props: h }), b.bem.els = d.split(",").map((w) => w.trim()), b.bem.els.map((w) => `${(h == null ? void 0 : h.bPrefix) || o}${b.bem.b}${t}${w}`).join(", ");
        }
      };
    }
    function s(d) {
      return {
        $({ context: m, props: b }) {
          d = typeof d == "string" ? d : d({ context: m, props: b });
          const h = d.split(",").map((I) => I.trim());
          function w(I) {
            return h.map((M) => `&${(b == null ? void 0 : b.bPrefix) || o}${m.bem.b}${I !== void 0 ? `${t}${I}` : ""}${r}${M}`).join(", ");
          }
          const O = m.bem.els;
          if (O !== null) {
            if (process.env.NODE_ENV !== "production" && O.length >= 2)
              throw Error(`[css-render/plugin-bem]: m(${d}) is invalid, using modifier inside multiple elements is not allowed`);
            return w(O[0]);
          } else
            return w();
        }
      };
    }
    function c(d) {
      return {
        $({ context: m, props: b }) {
          d = typeof d == "string" ? d : d({ context: m, props: b });
          const h = m.bem.els;
          if (process.env.NODE_ENV !== "production" && h !== null && h.length >= 2)
            throw Error(`[css-render/plugin-bem]: notM(${d}) is invalid, using modifier inside multiple elements is not allowed`);
          return `&:not(${(b == null ? void 0 : b.bPrefix) || o}${m.bem.b}${h !== null && h.length > 0 ? `${t}${h[0]}` : ""}${r}${d})`;
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
  const Td = "n", Id = `.${Td}-`, zd = "__", Md = "--", Ql = Zl(), ea = Pd({
    blockPrefix: Id,
    elementPrefix: zd,
    modifierPrefix: Md
  });
  Ql.use(ea);
  const { c: U, find: fS } = Ql, { cB: Q, cE: Y, cM: ae, cNotM: qe } = ea, kd = (...e) => U(">", [Q(...e)]);
  let Gr;
  function Od() {
    return Gr === void 0 && (Gr = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Gr;
  }
  const Ed = /* @__PURE__ */ new WeakSet();
  function _d(e) {
    Ed.add(e);
  }
  function Dd(e) {
    const o = F(!!e.value);
    if (o.value)
      return dn(o);
    const t = ye(e, (r) => {
      r && (o.value = !0, t());
    });
    return dn(o);
  }
  function Je(e) {
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
  const Hd = typeof window < "u";
  let vt, At;
  const Bd = () => {
    var e, o;
    vt = Hd ? (o = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || o === void 0 ? void 0 : o.ready : void 0, At = !1, vt !== void 0 ? vt.then(() => {
      At = !0;
    }) : At = !0;
  };
  Bd();
  function Ad(e) {
    if (At)
      return;
    let o = !1;
    Ve(() => {
      At || vt == null || vt.then(() => {
        o || e();
      });
    }), Ze(() => {
      o = !0;
    });
  }
  function hr(e) {
    return e.composedPath()[0];
  }
  const Rd = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function Fd(e, o, t) {
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
  function oa(e, o, t) {
    const r = Rd[e];
    let n = r.get(o);
    n === void 0 && r.set(o, n = /* @__PURE__ */ new WeakMap());
    let i = n.get(t);
    return i === void 0 && n.set(t, i = Fd(e, o, t)), i;
  }
  function Ld(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = oa(e, o, t);
      return Object.keys(n).forEach((i) => {
        Ie(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Wd(e, o, t, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = oa(e, o, t);
      return Object.keys(n).forEach((i) => {
        me(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Nd() {
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
    function n(C, $, S) {
      const x = C[$];
      return C[$] = function() {
        return S.apply(C, arguments), x.apply(C, arguments);
      }, C;
    }
    function i(C, $) {
      C[$] = Event.prototype[$];
    }
    const l = /* @__PURE__ */ new WeakMap(), a = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function s() {
      var C;
      return (C = l.get(this)) !== null && C !== void 0 ? C : null;
    }
    function c(C, $) {
      a !== void 0 && Object.defineProperty(C, "currentTarget", {
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
      const C = function($) {
        const { type: S, eventPhase: x, bubbles: P } = $, z = hr($);
        if (x === 2)
          return;
        const W = x === 1 ? "capture" : "bubble";
        let H = z;
        const N = [];
        for (; H === null && (H = window), N.push(H), H !== window; )
          H = H.parentNode || null;
        const G = u.capture[S], V = u.bubble[S];
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
      return C.displayName = "evtdUnifiedHandler", C;
    }
    function p() {
      const C = function($) {
        const { type: S, eventPhase: x } = $;
        if (x !== 2)
          return;
        const P = f[S];
        P !== void 0 && P.forEach((z) => z($));
      };
      return C.displayName = "evtdUnifiedWindowEventHandler", C;
    }
    const d = v(), m = p();
    function b(C, $) {
      const S = u[C];
      return S[$] === void 0 && (S[$] = /* @__PURE__ */ new Map(), window.addEventListener($, d, C === "capture")), S[$];
    }
    function h(C) {
      return f[C] === void 0 && (f[C] = /* @__PURE__ */ new Set(), window.addEventListener(C, m)), f[C];
    }
    function w(C, $) {
      let S = C.get($);
      return S === void 0 && C.set($, S = /* @__PURE__ */ new Set()), S;
    }
    function O(C, $, S, x) {
      const P = u[$][S];
      if (P !== void 0) {
        const z = P.get(C);
        if (z !== void 0 && z.has(x))
          return !0;
      }
      return !1;
    }
    function I(C, $) {
      const S = f[C];
      return !!(S !== void 0 && S.has($));
    }
    function M(C, $, S, x) {
      let P;
      if (typeof x == "object" && x.once === !0 ? P = (G) => {
        _(C, $, P, x), S(G);
      } : P = S, Ld(C, $, P, x))
        return;
      const W = x === !0 || typeof x == "object" && x.capture === !0 ? "capture" : "bubble", H = b(W, C), N = w(H, $);
      if (N.has(P) || N.add(P), $ === window) {
        const G = h(C);
        G.has(P) || G.add(P);
      }
    }
    function _(C, $, S, x) {
      if (Wd(C, $, S, x))
        return;
      const z = x === !0 || typeof x == "object" && x.capture === !0, W = z ? "capture" : "bubble", H = b(W, C), N = w(H, $);
      if ($ === window && !O($, z ? "bubble" : "capture", C, S) && I(C, S)) {
        const V = f[C];
        V.delete(S), V.size === 0 && (window.removeEventListener(C, m), f[C] = void 0);
      }
      N.has(S) && N.delete(S), N.size === 0 && H.delete($), H.size === 0 && (window.removeEventListener(C, d, W === "capture"), u[W][C] = void 0);
    }
    return {
      on: M,
      off: _
    };
  }
  const { on: Ie, off: me } = Nd();
  function xn(e, o) {
    return ye(e, (t) => {
      t !== void 0 && (o.value = t);
    }), E(() => e.value === void 0 ? o.value : e.value);
  }
  function Dr() {
    const e = F(!1);
    return Ve(() => {
      e.value = !0;
    }), dn(e);
  }
  function ta(e, o) {
    return E(() => {
      for (const t of o)
        if (e[t] !== void 0)
          return e[t];
      return e[o[o.length - 1]];
    });
  }
  const jd = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  !window.MSStream;
  function Vd() {
    return jd;
  }
  const Nn = "n-internal-select-menu", ra = "n-internal-select-menu-body", na = "n-modal-body", ia = "n-drawer-body", la = "n-popover-body", aa = "__disabled__";
  function mo(e) {
    const o = he(na, null), t = he(ia, null), r = he(la, null), n = he(ra, null), i = F();
    if (typeof document < "u") {
      i.value = document.fullscreenElement;
      const l = () => {
        i.value = document.fullscreenElement;
      };
      Ve(() => {
        Ie("fullscreenchange", document, l);
      }), Ze(() => {
        me("fullscreenchange", document, l);
      });
    }
    return Je(() => {
      var l;
      const { to: a } = e;
      return a !== void 0 ? a === !1 ? aa : a === !0 ? i.value || "body" : a : o != null && o.value ? (l = o.value.$el) !== null && l !== void 0 ? l : o.value : t != null && t.value ? t.value : r != null && r.value ? r.value : n != null && n.value ? n.value : a ?? (i.value || "body");
    });
  }
  mo.tdkey = aa;
  mo.propTo = {
    type: [String, Object, Boolean],
    default: void 0
  };
  function yn(e, o, t = "default") {
    const r = o[t];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${t}] is empty.`);
    return r();
  }
  function Sn(e, o = !0, t = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && t.push(bt(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          Sn(r, o, t);
          return;
        }
        if (r.type === oo) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && Sn(r.children, o, t);
        } else
          r.type !== An && t.push(r);
      }
    }), t;
  }
  function wi(e, o, t = "default") {
    const r = o[t];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${t}] is empty.`);
    const n = Sn(r());
    if (n.length === 1)
      return n[0];
    throw new Error(`[vueuc/${e}]: slot[${t}] should have exactly one child.`);
  }
  let To = null;
  function sa() {
    if (To === null && (To = document.getElementById("v-binder-view-measurer"), To === null)) {
      To = document.createElement("div"), To.id = "v-binder-view-measurer";
      const { style: e } = To;
      e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(To);
    }
    return To.getBoundingClientRect();
  }
  function Ud(e, o) {
    const t = sa();
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
    const o = e.getBoundingClientRect(), t = sa();
    return {
      left: o.left - t.left,
      top: o.top - t.top,
      bottom: t.height + t.top - o.bottom,
      right: t.width + t.left - o.right,
      width: o.width,
      height: o.height
    };
  }
  function Gd(e) {
    return e.nodeType === 9 ? null : e.parentNode;
  }
  function ca(e) {
    if (e === null)
      return null;
    const o = Gd(e);
    if (o === null)
      return null;
    if (o.nodeType === 9)
      return document;
    if (o.nodeType === 1) {
      const { overflow: t, overflowX: r, overflowY: n } = getComputedStyle(o);
      if (/(auto|scroll|overlay)/.test(t + n + r))
        return o;
    }
    return ca(o);
  }
  const Kd = ie({
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
      to("VBinder", (o = Hn()) === null || o === void 0 ? void 0 : o.proxy);
      const t = he("VBinder", null), r = F(null), n = (h) => {
        r.value = h, t && e.syncTargetWithParent && t.setTargetRef(h);
      };
      let i = [];
      const l = () => {
        let h = r.value;
        for (; h = ca(h), h !== null; )
          i.push(h);
        for (const w of i)
          Ie("scroll", w, f, !0);
      }, a = () => {
        for (const h of i)
          me("scroll", h, f, !0);
        i = [];
      }, s = /* @__PURE__ */ new Set(), c = (h) => {
        s.size === 0 && l(), s.has(h) || s.add(h);
      }, u = (h) => {
        s.has(h) && s.delete(h), s.size === 0 && a();
      }, f = () => {
        Gl(v);
      }, v = () => {
        s.forEach((h) => h());
      }, p = /* @__PURE__ */ new Set(), d = (h) => {
        p.size === 0 && Ie("resize", window, b), p.has(h) || p.add(h);
      }, m = (h) => {
        p.has(h) && p.delete(h), p.size === 0 && me("resize", window, b);
      }, b = () => {
        p.forEach((h) => h());
      };
      return Ze(() => {
        me("resize", window, b), a();
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
      return yn("binder", this.$slots);
    }
  }), da = Kd, ua = ie({
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
      return e ? Xt(wi("follower", this.$slots), [
        [o]
      ]) : wi("follower", this.$slots);
    }
  }), at = "@@mmoContext", Xd = {
    mounted(e, { value: o }) {
      e[at] = {
        handler: void 0
      }, typeof o == "function" && (e[at].handler = o, Ie("mousemoveoutside", e, o));
    },
    updated(e, { value: o }) {
      const t = e[at];
      typeof o == "function" ? t.handler ? t.handler !== o && (me("mousemoveoutside", e, t.handler), t.handler = o, Ie("mousemoveoutside", e, o)) : (e[at].handler = o, Ie("mousemoveoutside", e, o)) : t.handler && (me("mousemoveoutside", e, t.handler), t.handler = void 0);
    },
    unmounted(e) {
      const { handler: o } = e[at];
      o && me("mousemoveoutside", e, o), e[at].handler = void 0;
    }
  }, Yd = Xd, st = "@@coContext", qd = {
    mounted(e, { value: o, modifiers: t }) {
      e[st] = {
        handler: void 0
      }, typeof o == "function" && (e[st].handler = o, Ie("clickoutside", e, o, {
        capture: t.capture
      }));
    },
    updated(e, { value: o, modifiers: t }) {
      const r = e[st];
      typeof o == "function" ? r.handler ? r.handler !== o && (me("clickoutside", e, r.handler, {
        capture: t.capture
      }), r.handler = o, Ie("clickoutside", e, o, {
        capture: t.capture
      })) : (e[st].handler = o, Ie("clickoutside", e, o, {
        capture: t.capture
      })) : r.handler && (me("clickoutside", e, r.handler, {
        capture: t.capture
      }), r.handler = void 0);
    },
    unmounted(e, { modifiers: o }) {
      const { handler: t } = e[st];
      t && me("clickoutside", e, t, {
        capture: o.capture
      }), e[st].handler = void 0;
    }
  }, Cr = qd;
  function Jd(e, o) {
    console.error(`[vdirs/${e}]: ${o}`);
  }
  class Zd {
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
      r.has(o) ? r.delete(o) : t === void 0 && Jd("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
  const Xr = new Zd(), ct = "@@ziContext", Qd = {
    mounted(e, o) {
      const { value: t = {} } = o, { zIndex: r, enabled: n } = t;
      e[ct] = {
        enabled: !!n,
        initialized: !1
      }, n && (Xr.ensureZIndex(e, r), e[ct].initialized = !0);
    },
    updated(e, o) {
      const { value: t = {} } = o, { zIndex: r, enabled: n } = t, i = e[ct].enabled;
      n && !i && (Xr.ensureZIndex(e, r), e[ct].initialized = !0), e[ct].enabled = !!n;
    },
    unmounted(e, o) {
      if (!e[ct].initialized)
        return;
      const { value: t = {} } = o, { zIndex: r } = t;
      Xr.unregister(e, r);
    }
  }, fa = Qd, ha = Symbol("@css-render/vue3-ssr");
  function eu(e, o) {
    return `<style cssr-id="${e}">
${o}
</style>`;
  }
  function ou(e, o) {
    const t = he(ha, null);
    if (t === null) {
      console.error("[css-render/vue3-ssr]: no ssr context found.");
      return;
    }
    const { styles: r, ids: n } = t;
    n.has(e) || r !== null && (n.add(e), r.push(eu(e, o)));
  }
  const tu = typeof document < "u";
  function Xo() {
    if (tu)
      return;
    const e = he(ha, null);
    if (e !== null)
      return {
        adapter: ou,
        context: e
      };
  }
  function $i(e, o) {
    console.error(`[vueuc/${e}]: ${o}`);
  }
  const { c: Mo } = Zl(), jn = "vueuc-style";
  function Pi(e) {
    return e & -e;
  }
  class ru {
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
        n[o] += t, o += Pi(o);
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
        i += t[o], o -= Pi(o);
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
  function Ti(e) {
    return typeof e == "string" ? document.querySelector(e) : e();
  }
  const nu = ie({
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
        showTeleport: Dd(se(e, "show")),
        mergedTo: E(() => {
          const { to: o } = e;
          return o ?? "body";
        })
      };
    },
    render() {
      return this.showTeleport ? this.disabled ? yn("lazy-teleport", this.$slots) : y(Cc, {
        disabled: this.disabled,
        to: this.mergedTo
      }, yn("lazy-teleport", this.$slots)) : null;
    }
  }), rr = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, Ii = {
    start: "end",
    center: "center",
    end: "start"
  }, Yr = {
    top: "height",
    bottom: "height",
    left: "width",
    right: "width"
  }, iu = {
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
  }, lu = {
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
  }, au = {
    "bottom-start": "right",
    "bottom-end": "left",
    "top-start": "right",
    "top-end": "left",
    "right-start": "bottom",
    "right-end": "top",
    "left-start": "bottom",
    "left-end": "top"
  }, zi = {
    top: !0,
    bottom: !1,
    left: !0,
    right: !1
    // left--
  }, Mi = {
    top: "end",
    bottom: "start",
    left: "end",
    right: "start"
  };
  function su(e, o, t, r, n, i) {
    if (!n || i)
      return { placement: e, top: 0, left: 0 };
    const [l, a] = e.split("-");
    let s = a ?? "center", c = {
      top: 0,
      left: 0
    };
    const u = (p, d, m) => {
      let b = 0, h = 0;
      const w = t[p] - o[d] - o[p];
      return w > 0 && r && (m ? h = zi[d] ? w : -w : b = zi[d] ? w : -w), {
        left: b,
        top: h
      };
    }, f = l === "left" || l === "right";
    if (s !== "center") {
      const p = au[e], d = rr[p], m = Yr[p];
      if (t[m] > o[m]) {
        if (
          // current space is not enough
          // ----------[ target ]---------|
          // -------[     follower        ]
          o[p] + o[m] < t[m]
        ) {
          const b = (t[m] - o[m]) / 2;
          o[p] < b || o[d] < b ? o[p] < o[d] ? (s = Ii[a], c = u(m, d, f)) : c = u(m, p, f) : s = "center";
        }
      } else
        t[m] < o[m] && o[d] < 0 && // opposite align has larger space
        // ------------[   target   ]
        // ----------------[follower]
        o[p] > o[d] && (s = Ii[a]);
    } else {
      const p = l === "bottom" || l === "top" ? "left" : "top", d = rr[p], m = Yr[p], b = (t[m] - o[m]) / 2;
      // center is not enough
      // ----------- [ target ]--|
      // -------[     follower     ]
      (o[p] < b || o[d] < b) && (o[p] > o[d] ? (s = Mi[p], c = u(m, p, f)) : (s = Mi[d], c = u(m, d, f)));
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
  function cu(e, o) {
    return o ? lu[e] : iu[e];
  }
  function du(e, o, t, r, n, i) {
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
  const uu = Mo([
    Mo(".v-binder-follower-container", {
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      height: "0",
      pointerEvents: "none",
      zIndex: "auto"
    }),
    Mo(".v-binder-follower-content", {
      position: "absolute",
      zIndex: "auto"
    }, [
      Mo("> *", {
        pointerEvents: "all"
      })
    ])
  ]), pa = ie({
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
      const o = he("VBinder"), t = Je(() => e.enabled !== void 0 ? e.enabled : e.show), r = F(null), n = F(null), i = () => {
        const { syncTrigger: v } = e;
        v.includes("scroll") && o.addScrollListener(s), v.includes("resize") && o.addResizeListener(s);
      }, l = () => {
        o.removeScrollListener(s), o.removeResizeListener(s);
      };
      Ve(() => {
        t.value && (s(), i());
      });
      const a = Xo();
      uu.mount({
        id: "vueuc/binder",
        head: !0,
        anchorMetaName: jn,
        ssr: a
      }), Ze(() => {
        l();
      }), Ad(() => {
        t.value && s();
      });
      const s = () => {
        if (!t.value)
          return;
        const v = r.value;
        if (v === null)
          return;
        const p = o.targetRef, { x: d, y: m, overlap: b } = e, h = d !== void 0 && m !== void 0 ? Ud(d, m) : Kr(p);
        v.style.setProperty("--v-target-width", `${Math.round(h.width)}px`), v.style.setProperty("--v-target-height", `${Math.round(h.height)}px`);
        const { width: w, minWidth: O, placement: I, internalShift: M, flip: _ } = e;
        v.setAttribute("v-placement", I), b ? v.setAttribute("v-overlap", "") : v.removeAttribute("v-overlap");
        const { style: C } = v;
        w === "target" ? C.width = `${h.width}px` : w !== void 0 ? C.width = w : C.width = "", O === "target" ? C.minWidth = `${h.width}px` : O !== void 0 ? C.minWidth = O : C.minWidth = "";
        const $ = Kr(v), S = Kr(n.value), { left: x, top: P, placement: z } = su(I, h, $, M, _, b), W = cu(z, b), { left: H, top: N, transform: G } = du(z, S, h, P, x, b);
        v.setAttribute("v-placement", z), v.style.setProperty("--v-offset-left", `${Math.round(x)}px`), v.style.setProperty("--v-offset-top", `${Math.round(P)}px`), v.style.transform = `translateX(${H}) translateY(${N}) ${G}`, v.style.setProperty("--v-transform-origin", W), v.style.transformOrigin = W;
      };
      ye(t, (v) => {
        v ? (i(), c()) : l();
      });
      const c = () => {
        mt().then(s).catch((v) => console.error(v));
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
      const u = Dr(), f = Je(() => {
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
      return y(nu, {
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
              fa,
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
  var Vo = [], fu = function() {
    return Vo.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, hu = function() {
    return Vo.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, ki = "ResizeObserver loop completed with undelivered notifications.", pu = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
      message: ki
    }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = ki), window.dispatchEvent(e);
  }, Vt;
  (function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
  })(Vt || (Vt = {}));
  var Uo = function(e) {
    return Object.freeze(e);
  }, vu = function() {
    function e(o, t) {
      this.inlineSize = o, this.blockSize = t, Uo(this);
    }
    return e;
  }(), va = function() {
    function e(o, t, r, n) {
      return this.x = o, this.y = t, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Uo(this);
    }
    return e.prototype.toJSON = function() {
      var o = this, t = o.x, r = o.y, n = o.top, i = o.right, l = o.bottom, a = o.left, s = o.width, c = o.height;
      return { x: t, y: r, top: n, right: i, bottom: l, left: a, width: s, height: c };
    }, e.fromRect = function(o) {
      return new e(o.x, o.y, o.width, o.height);
    }, e;
  }(), Vn = function(e) {
    return e instanceof SVGElement && "getBBox" in e;
  }, ga = function(e) {
    if (Vn(e)) {
      var o = e.getBBox(), t = o.width, r = o.height;
      return !t && !r;
    }
    var n = e, i = n.offsetWidth, l = n.offsetHeight;
    return !(i || l || e.getClientRects().length);
  }, Oi = function(e) {
    var o;
    if (e instanceof Element)
      return !0;
    var t = (o = e == null ? void 0 : e.ownerDocument) === null || o === void 0 ? void 0 : o.defaultView;
    return !!(t && e instanceof t.Element);
  }, gu = function(e) {
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
  }, Rt = typeof window < "u" ? window : {}, nr = /* @__PURE__ */ new WeakMap(), Ei = /auto|scroll/, mu = /^tb|vertical/, bu = /msie|trident/i.test(Rt.navigator && Rt.navigator.userAgent), eo = function(e) {
    return parseFloat(e || "0");
  }, gt = function(e, o, t) {
    return e === void 0 && (e = 0), o === void 0 && (o = 0), t === void 0 && (t = !1), new vu((t ? o : e) || 0, (t ? e : o) || 0);
  }, _i = Uo({
    devicePixelContentBoxSize: gt(),
    borderBoxSize: gt(),
    contentBoxSize: gt(),
    contentRect: new va(0, 0, 0, 0)
  }), ma = function(e, o) {
    if (o === void 0 && (o = !1), nr.has(e) && !o)
      return nr.get(e);
    if (ga(e))
      return nr.set(e, _i), _i;
    var t = getComputedStyle(e), r = Vn(e) && e.ownerSVGElement && e.getBBox(), n = !bu && t.boxSizing === "border-box", i = mu.test(t.writingMode || ""), l = !r && Ei.test(t.overflowY || ""), a = !r && Ei.test(t.overflowX || ""), s = r ? 0 : eo(t.paddingTop), c = r ? 0 : eo(t.paddingRight), u = r ? 0 : eo(t.paddingBottom), f = r ? 0 : eo(t.paddingLeft), v = r ? 0 : eo(t.borderTopWidth), p = r ? 0 : eo(t.borderRightWidth), d = r ? 0 : eo(t.borderBottomWidth), m = r ? 0 : eo(t.borderLeftWidth), b = f + c, h = s + u, w = m + p, O = v + d, I = a ? e.offsetHeight - O - e.clientHeight : 0, M = l ? e.offsetWidth - w - e.clientWidth : 0, _ = n ? b + w : 0, C = n ? h + O : 0, $ = r ? r.width : eo(t.width) - _ - M, S = r ? r.height : eo(t.height) - C - I, x = $ + b + M + w, P = S + h + I + O, z = Uo({
      devicePixelContentBoxSize: gt(Math.round($ * devicePixelRatio), Math.round(S * devicePixelRatio), i),
      borderBoxSize: gt(x, P, i),
      contentBoxSize: gt($, S, i),
      contentRect: new va(f, s, $, S)
    });
    return nr.set(e, z), z;
  }, ba = function(e, o, t) {
    var r = ma(e, t), n = r.borderBoxSize, i = r.contentBoxSize, l = r.devicePixelContentBoxSize;
    switch (o) {
      case Vt.DEVICE_PIXEL_CONTENT_BOX:
        return l;
      case Vt.BORDER_BOX:
        return n;
      default:
        return i;
    }
  }, Cu = function() {
    function e(o) {
      var t = ma(o);
      this.target = o, this.contentRect = t.contentRect, this.borderBoxSize = Uo([t.borderBoxSize]), this.contentBoxSize = Uo([t.contentBoxSize]), this.devicePixelContentBoxSize = Uo([t.devicePixelContentBoxSize]);
    }
    return e;
  }(), Ca = function(e) {
    if (ga(e))
      return 1 / 0;
    for (var o = 0, t = e.parentNode; t; )
      o += 1, t = t.parentNode;
    return o;
  }, xu = function() {
    var e = 1 / 0, o = [];
    Vo.forEach(function(l) {
      if (l.activeTargets.length !== 0) {
        var a = [];
        l.activeTargets.forEach(function(c) {
          var u = new Cu(c.target), f = Ca(c.target);
          a.push(u), c.lastReportedSize = ba(c.target, c.observedBox), f < e && (e = f);
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
  }, Di = function(e) {
    Vo.forEach(function(t) {
      t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(n) {
        n.isActive() && (Ca(n.target) > e ? t.activeTargets.push(n) : t.skippedTargets.push(n));
      });
    });
  }, yu = function() {
    var e = 0;
    for (Di(e); fu(); )
      e = xu(), Di(e);
    return hu() && pu(), e > 0;
  }, qr, xa = [], Su = function() {
    return xa.splice(0).forEach(function(e) {
      return e();
    });
  }, wu = function(e) {
    if (!qr) {
      var o = 0, t = document.createTextNode(""), r = { characterData: !0 };
      new MutationObserver(function() {
        return Su();
      }).observe(t, r), qr = function() {
        t.textContent = "".concat(o ? o-- : o++);
      };
    }
    xa.push(e), qr();
  }, $u = function(e) {
    wu(function() {
      requestAnimationFrame(e);
    });
  }, pr = 0, Pu = function() {
    return !!pr;
  }, Tu = 250, Iu = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Hi = [
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
  ], Bi = function(e) {
    return e === void 0 && (e = 0), Date.now() + e;
  }, Jr = !1, zu = function() {
    function e() {
      var o = this;
      this.stopped = !0, this.listener = function() {
        return o.schedule();
      };
    }
    return e.prototype.run = function(o) {
      var t = this;
      if (o === void 0 && (o = Tu), !Jr) {
        Jr = !0;
        var r = Bi(o);
        $u(function() {
          var n = !1;
          try {
            n = yu();
          } finally {
            if (Jr = !1, o = r - Bi(), !Pu())
              return;
            n ? t.run(1e3) : o > 0 ? t.run(o) : t.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var o = this, t = function() {
        return o.observer && o.observer.observe(document.body, Iu);
      };
      document.body ? t() : Rt.addEventListener("DOMContentLoaded", t);
    }, e.prototype.start = function() {
      var o = this;
      this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Hi.forEach(function(t) {
        return Rt.addEventListener(t, o.listener, !0);
      }));
    }, e.prototype.stop = function() {
      var o = this;
      this.stopped || (this.observer && this.observer.disconnect(), Hi.forEach(function(t) {
        return Rt.removeEventListener(t, o.listener, !0);
      }), this.stopped = !0);
    }, e;
  }(), wn = new zu(), Ai = function(e) {
    !pr && e > 0 && wn.start(), pr += e, !pr && wn.stop();
  }, Mu = function(e) {
    return !Vn(e) && !gu(e) && getComputedStyle(e).display === "inline";
  }, ku = function() {
    function e(o, t) {
      this.target = o, this.observedBox = t || Vt.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var o = ba(this.target, this.observedBox, !0);
      return Mu(this.target) && (this.lastReportedSize = o), this.lastReportedSize.inlineSize !== o.inlineSize || this.lastReportedSize.blockSize !== o.blockSize;
    }, e;
  }(), Ou = function() {
    function e(o, t) {
      this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = o, this.callback = t;
    }
    return e;
  }(), ir = /* @__PURE__ */ new WeakMap(), Ri = function(e, o) {
    for (var t = 0; t < e.length; t += 1)
      if (e[t].target === o)
        return t;
    return -1;
  }, lr = function() {
    function e() {
    }
    return e.connect = function(o, t) {
      var r = new Ou(o, t);
      ir.set(o, r);
    }, e.observe = function(o, t, r) {
      var n = ir.get(o), i = n.observationTargets.length === 0;
      Ri(n.observationTargets, t) < 0 && (i && Vo.push(n), n.observationTargets.push(new ku(t, r && r.box)), Ai(1), wn.schedule());
    }, e.unobserve = function(o, t) {
      var r = ir.get(o), n = Ri(r.observationTargets, t), i = r.observationTargets.length === 1;
      n >= 0 && (i && Vo.splice(Vo.indexOf(r), 1), r.observationTargets.splice(n, 1), Ai(-1));
    }, e.disconnect = function(o) {
      var t = this, r = ir.get(o);
      r.observationTargets.slice().forEach(function(n) {
        return t.unobserve(o, n.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  }(), Eu = function() {
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
      if (!Oi(o))
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      lr.observe(this, o, t);
    }, e.prototype.unobserve = function(o) {
      if (arguments.length === 0)
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!Oi(o))
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      lr.unobserve(this, o);
    }, e.prototype.disconnect = function() {
      lr.disconnect(this);
    }, e.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    }, e;
  }();
  class _u {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Eu)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
  const xr = new _u(), yr = ie({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(e) {
      let o = !1;
      const t = Hn().proxy;
      function r(n) {
        const { onResize: i } = e;
        i !== void 0 && i(n);
      }
      Ve(() => {
        const n = t.$el;
        if (n === void 0) {
          $i("resize-observer", "$el does not exist.");
          return;
        }
        if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
          $i("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
        n.nextElementSibling !== null && (xr.registerHandler(n.nextElementSibling, r), o = !0);
      }), Ze(() => {
        o && xr.unregisterHandler(t.$el.nextElementSibling);
      });
    },
    render() {
      return Il(this.$slots, "default");
    }
  });
  let ar;
  function Du() {
    return ar === void 0 && ("matchMedia" in window ? ar = window.matchMedia("(pointer:coarse)").matches : ar = !1), ar;
  }
  let Zr;
  function Fi() {
    return Zr === void 0 && (Zr = "chrome" in window ? window.devicePixelRatio : 1), Zr;
  }
  const Hu = Mo(".v-vl", {
    maxHeight: "inherit",
    height: "100%",
    overflow: "auto",
    minWidth: "1px"
    // a zero width container won't be scrollable
  }, [
    Mo("&:not(.v-vl--show-scrollbar)", {
      scrollbarWidth: "none"
    }, [
      Mo("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
        width: 0,
        height: 0,
        display: "none"
      })
    ])
  ]), Bu = ie({
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
      const o = Xo();
      Hu.mount({
        id: "vueuc/virtual-list",
        head: !0,
        anchorMetaName: jn,
        ssr: o
      }), Ve(() => {
        const { defaultScrollIndex: P, defaultScrollKey: z } = e;
        P != null ? d({ index: P }) : z != null && d({ key: z });
      });
      let t = !1, r = !1;
      zl(() => {
        if (t = !1, !r) {
          r = !0;
          return;
        }
        d({ top: f.value, left: u });
      }), Ml(() => {
        t = !0, r || (r = !0);
      });
      const n = E(() => {
        const P = /* @__PURE__ */ new Map(), { keyField: z } = e;
        return e.items.forEach((W, H) => {
          P.set(W[z], H);
        }), P;
      }), i = F(null), l = F(void 0), a = /* @__PURE__ */ new Map(), s = E(() => {
        const { items: P, itemSize: z, keyField: W } = e, H = new ru(P.length, z);
        return P.forEach((N, G) => {
          const V = N[W], oe = a.get(V);
          oe !== void 0 && H.add(G, oe);
        }), H;
      }), c = F(0);
      let u = 0;
      const f = F(0), v = Je(() => Math.max(s.value.getBound(f.value - vn(e.paddingTop)) - 1, 0)), p = E(() => {
        const { value: P } = l;
        if (P === void 0)
          return [];
        const { items: z, itemSize: W } = e, H = v.value, N = Math.min(H + Math.ceil(P / W + 1), z.length - 1), G = [];
        for (let V = H; V <= N; ++V)
          G.push(z[V]);
        return G;
      }), d = (P, z) => {
        if (typeof P == "number") {
          w(P, z, "auto");
          return;
        }
        const { left: W, top: H, index: N, key: G, position: V, behavior: oe, debounce: k = !0 } = P;
        if (W !== void 0 || H !== void 0)
          w(W, H, oe);
        else if (N !== void 0)
          h(N, oe, k);
        else if (G !== void 0) {
          const L = n.value.get(G);
          L !== void 0 && h(L, oe, k);
        } else
          V === "bottom" ? w(0, Number.MAX_SAFE_INTEGER, oe) : V === "top" && w(0, 0, oe);
      };
      let m, b = null;
      function h(P, z, W) {
        const { value: H } = s, N = H.sum(P) + vn(e.paddingTop);
        if (!W)
          i.value.scrollTo({
            left: 0,
            top: N,
            behavior: z
          });
        else {
          m = P, b !== null && window.clearTimeout(b), b = window.setTimeout(() => {
            m = void 0, b = null;
          }, 16);
          const { scrollTop: G, offsetHeight: V } = i.value;
          if (N > G) {
            const oe = H.get(P);
            N + oe <= G + V || i.value.scrollTo({
              left: 0,
              top: N + oe - V,
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
      function w(P, z, W) {
        i.value.scrollTo({
          left: P,
          top: z,
          behavior: W
        });
      }
      function O(P, z) {
        var W, H, N;
        if (t || e.ignoreItemResize || x(z.target))
          return;
        const { value: G } = s, V = n.value.get(P), oe = G.get(V), k = (N = (H = (W = z.borderBoxSize) === null || W === void 0 ? void 0 : W[0]) === null || H === void 0 ? void 0 : H.blockSize) !== null && N !== void 0 ? N : z.contentRect.height;
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
          S();
        }
        c.value++;
      }
      const I = !Du();
      let M = !1;
      function _(P) {
        var z;
        (z = e.onScroll) === null || z === void 0 || z.call(e, P), (!I || !M) && S();
      }
      function C(P) {
        var z;
        if ((z = e.onWheel) === null || z === void 0 || z.call(e, P), I) {
          const W = i.value;
          if (W != null) {
            if (P.deltaX === 0 && (W.scrollTop === 0 && P.deltaY <= 0 || W.scrollTop + W.offsetHeight >= W.scrollHeight && P.deltaY >= 0))
              return;
            P.preventDefault(), W.scrollTop += P.deltaY / Fi(), W.scrollLeft += P.deltaX / Fi(), S(), M = !0, Gl(() => {
              M = !1;
            });
          }
        }
      }
      function $(P) {
        if (t || x(P.target) || P.contentRect.height === l.value)
          return;
        l.value = P.contentRect.height;
        const { onResize: z } = e;
        z !== void 0 && z(P);
      }
      function S() {
        const { value: P } = i;
        P != null && (f.value = P.scrollTop, u = P.scrollLeft);
      }
      function x(P) {
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
        itemsStyle: E(() => {
          const { itemResizable: P } = e, z = er(s.value.sum());
          return c.value, [
            e.itemsStyle,
            {
              boxSizing: "content-box",
              height: P ? "" : z,
              minHeight: P ? z : "",
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
        handleListScroll: _,
        handleListWheel: C,
        handleItemResize: O
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
  }), Ao = "v-hidden", Au = Mo("[v-hidden]", {
    display: "none!important"
  }), Li = ie({
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
        c.hasAttribute(Ao) && c.removeAttribute(Ao);
        const { children: u } = l, f = l.offsetWidth, v = [], p = o.tail ? s == null ? void 0 : s() : null;
        let d = p ? p.offsetWidth : 0, m = !1;
        const b = l.children.length - (o.tail ? 1 : 0);
        for (let w = 0; w < b - 1; ++w) {
          if (w < 0)
            continue;
          const O = u[w];
          if (m) {
            O.hasAttribute(Ao) || O.setAttribute(Ao, "");
            continue;
          } else
            O.hasAttribute(Ao) && O.removeAttribute(Ao);
          const I = O.offsetWidth;
          if (d += I, v[w] = I, d > f) {
            const { updateCounter: M } = e;
            for (let _ = w; _ >= 0; --_) {
              const C = b - 1 - _;
              M !== void 0 ? M(C) : c.textContent = `${C}`;
              const $ = c.offsetWidth;
              if (d -= v[_], d + $ <= f || _ === 0) {
                m = !0, w = _ - 1, p && (w === -1 ? (p.style.maxWidth = `${f - $}px`, p.style.boxSizing = "border-box") : p.style.maxWidth = "");
                break;
              }
            }
          }
        }
        const { onUpdateOverflow: h } = e;
        m ? h !== void 0 && h(!0) : (h !== void 0 && h(!1), c.setAttribute(Ao, ""));
      }
      const i = Xo();
      return Au.mount({
        id: "vueuc/overflow",
        head: !0,
        anchorMetaName: jn,
        ssr: i
      }), Ve(n), {
        selfRef: t,
        counterRef: r,
        sync: n
      };
    },
    render() {
      const { $slots: e } = this;
      return mt(this.sync), y("div", {
        class: "v-overflow",
        ref: "selfRef"
      }, [
        Il(e, "default"),
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
  function ya(e) {
    return e instanceof HTMLElement;
  }
  function Sa(e) {
    for (let o = 0; o < e.childNodes.length; o++) {
      const t = e.childNodes[o];
      if (ya(t) && ($a(t) || Sa(t)))
        return !0;
    }
    return !1;
  }
  function wa(e) {
    for (let o = e.childNodes.length - 1; o >= 0; o--) {
      const t = e.childNodes[o];
      if (ya(t) && ($a(t) || wa(t)))
        return !0;
    }
    return !1;
  }
  function $a(e) {
    if (!Ru(e))
      return !1;
    try {
      e.focus({ preventScroll: !0 });
    } catch {
    }
    return document.activeElement === e;
  }
  function Ru(e) {
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
  let zt = [];
  const Fu = ie({
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
      const o = id(), t = F(null), r = F(null);
      let n = !1, i = !1;
      const l = typeof document > "u" ? null : document.activeElement;
      function a() {
        return zt[zt.length - 1] === o;
      }
      function s(b) {
        var h;
        b.code === "Escape" && a() && ((h = e.onEsc) === null || h === void 0 || h.call(e, b));
      }
      Ve(() => {
        ye(() => e.active, (b) => {
          b ? (f(), Ie("keydown", document, s)) : (me("keydown", document, s), n && v());
        }, {
          immediate: !0
        });
      }), Ze(() => {
        me("keydown", document, s), n && v();
      });
      function c(b) {
        if (!i && a()) {
          const h = u();
          if (h === null || h.contains(Nt(b)))
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
          if (zt.push(o), e.autoFocus) {
            const { initialFocusTo: h } = e;
            h === void 0 ? p("first") : (b = Ti(h)) === null || b === void 0 || b.focus({ preventScroll: !0 });
          }
          n = !0, document.addEventListener("focus", c, !0);
        }
      }
      function v() {
        var b;
        if (e.disabled || (document.removeEventListener("focus", c, !0), zt = zt.filter((w) => w !== o), a()))
          return;
        const { finalFocusTo: h } = e;
        h !== void 0 ? (b = Ti(h)) === null || b === void 0 || b.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
      }
      function p(b) {
        if (a() && e.active) {
          const h = t.value, w = r.value;
          if (h !== null && w !== null) {
            const O = u();
            if (O == null || O === w) {
              i = !0, h.focus({ preventScroll: !0 }), i = !1;
              return;
            }
            i = !0;
            const I = b === "first" ? Sa(O) : wa(O);
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
      function m(b) {
        i || (b.relatedTarget !== null && b.relatedTarget === t.value ? p("last") : p("first"));
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
      return y(oo, null, [
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
  function Pa(e, o) {
    o && (Ve(() => {
      const { value: t } = e;
      t && xr.registerHandler(t, o);
    }), Ze(() => {
      const { value: t } = e;
      t && xr.unregisterHandler(t);
    }));
  }
  function Lu(e) {
    const o = { isDeactivated: !1 };
    let t = !1;
    return zl(() => {
      if (o.isDeactivated = !1, !t) {
        t = !0;
        return;
      }
      e();
    }), Ml(() => {
      o.isDeactivated = !0, t || (t = !0);
    }), o;
  }
  const Wi = "n-form-item";
  function Wu(e, { defaultSize: o = "medium", mergedSize: t, mergedDisabled: r } = {}) {
    const n = he(Wi, null);
    to(Wi, null);
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
    return Ze(() => {
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
  var Nu = typeof global == "object" && global && global.Object === Object && global;
  const Ta = Nu;
  var ju = typeof self == "object" && self && self.Object === Object && self, Vu = Ta || ju || Function("return this")();
  const io = Vu;
  var Uu = io.Symbol;
  const ko = Uu;
  var Ia = Object.prototype, Gu = Ia.hasOwnProperty, Ku = Ia.toString, Mt = ko ? ko.toStringTag : void 0;
  function Xu(e) {
    var o = Gu.call(e, Mt), t = e[Mt];
    try {
      e[Mt] = void 0;
      var r = !0;
    } catch {
    }
    var n = Ku.call(e);
    return r && (o ? e[Mt] = t : delete e[Mt]), n;
  }
  var Yu = Object.prototype, qu = Yu.toString;
  function Ju(e) {
    return qu.call(e);
  }
  var Zu = "[object Null]", Qu = "[object Undefined]", Ni = ko ? ko.toStringTag : void 0;
  function Yo(e) {
    return e == null ? e === void 0 ? Qu : Zu : Ni && Ni in Object(e) ? Xu(e) : Ju(e);
  }
  function Oo(e) {
    return e != null && typeof e == "object";
  }
  var ef = "[object Symbol]";
  function Un(e) {
    return typeof e == "symbol" || Oo(e) && Yo(e) == ef;
  }
  function za(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = Array(r); ++t < r; )
      n[t] = o(e[t], t, e);
    return n;
  }
  var of = Array.isArray;
  const je = of;
  var tf = 1 / 0, ji = ko ? ko.prototype : void 0, Vi = ji ? ji.toString : void 0;
  function Ma(e) {
    if (typeof e == "string")
      return e;
    if (je(e))
      return za(e, Ma) + "";
    if (Un(e))
      return Vi ? Vi.call(e) : "";
    var o = e + "";
    return o == "0" && 1 / e == -tf ? "-0" : o;
  }
  function Eo(e) {
    var o = typeof e;
    return e != null && (o == "object" || o == "function");
  }
  function Gn(e) {
    return e;
  }
  var rf = "[object AsyncFunction]", nf = "[object Function]", lf = "[object GeneratorFunction]", af = "[object Proxy]";
  function Kn(e) {
    if (!Eo(e))
      return !1;
    var o = Yo(e);
    return o == nf || o == lf || o == rf || o == af;
  }
  var sf = io["__core-js_shared__"];
  const Qr = sf;
  var Ui = function() {
    var e = /[^.]+$/.exec(Qr && Qr.keys && Qr.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
  function cf(e) {
    return !!Ui && Ui in e;
  }
  var df = Function.prototype, uf = df.toString;
  function qo(e) {
    if (e != null) {
      try {
        return uf.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  var ff = /[\\^$.*+?()[\]{}|]/g, hf = /^\[object .+?Constructor\]$/, pf = Function.prototype, vf = Object.prototype, gf = pf.toString, mf = vf.hasOwnProperty, bf = RegExp(
    "^" + gf.call(mf).replace(ff, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function Cf(e) {
    if (!Eo(e) || cf(e))
      return !1;
    var o = Kn(e) ? bf : hf;
    return o.test(qo(e));
  }
  function xf(e, o) {
    return e == null ? void 0 : e[o];
  }
  function Jo(e, o) {
    var t = xf(e, o);
    return Cf(t) ? t : void 0;
  }
  var yf = Jo(io, "WeakMap");
  const $n = yf;
  var Gi = Object.create, Sf = function() {
    function e() {
    }
    return function(o) {
      if (!Eo(o))
        return {};
      if (Gi)
        return Gi(o);
      e.prototype = o;
      var t = new e();
      return e.prototype = void 0, t;
    };
  }();
  const wf = Sf;
  function $f(e, o, t) {
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
  function Pf(e, o) {
    var t = -1, r = e.length;
    for (o || (o = Array(r)); ++t < r; )
      o[t] = e[t];
    return o;
  }
  var Tf = 800, If = 16, zf = Date.now;
  function Mf(e) {
    var o = 0, t = 0;
    return function() {
      var r = zf(), n = If - (r - t);
      if (t = r, n > 0) {
        if (++o >= Tf)
          return arguments[0];
      } else
        o = 0;
      return e.apply(void 0, arguments);
    };
  }
  function kf(e) {
    return function() {
      return e;
    };
  }
  var Of = function() {
    try {
      var e = Jo(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }();
  const Sr = Of;
  var Ef = Sr ? function(e, o) {
    return Sr(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: kf(o),
      writable: !0
    });
  } : Gn;
  const _f = Ef;
  var Df = Mf(_f);
  const Hf = Df;
  var Bf = 9007199254740991, Af = /^(?:0|[1-9]\d*)$/;
  function Xn(e, o) {
    var t = typeof e;
    return o = o ?? Bf, !!o && (t == "number" || t != "symbol" && Af.test(e)) && e > -1 && e % 1 == 0 && e < o;
  }
  function Yn(e, o, t) {
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
  var Rf = Object.prototype, Ff = Rf.hasOwnProperty;
  function Lf(e, o, t) {
    var r = e[o];
    (!(Ff.call(e, o) && Yt(r, t)) || t === void 0 && !(o in e)) && Yn(e, o, t);
  }
  function Wf(e, o, t, r) {
    var n = !t;
    t || (t = {});
    for (var i = -1, l = o.length; ++i < l; ) {
      var a = o[i], s = r ? r(t[a], e[a], a, t, e) : void 0;
      s === void 0 && (s = e[a]), n ? Yn(t, a, s) : Lf(t, a, s);
    }
    return t;
  }
  var Ki = Math.max;
  function Nf(e, o, t) {
    return o = Ki(o === void 0 ? e.length - 1 : o, 0), function() {
      for (var r = arguments, n = -1, i = Ki(r.length - o, 0), l = Array(i); ++n < i; )
        l[n] = r[o + n];
      n = -1;
      for (var a = Array(o + 1); ++n < o; )
        a[n] = r[n];
      return a[o] = t(l), $f(e, this, a);
    };
  }
  function jf(e, o) {
    return Hf(Nf(e, o, Gn), e + "");
  }
  var Vf = 9007199254740991;
  function qn(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Vf;
  }
  function St(e) {
    return e != null && qn(e.length) && !Kn(e);
  }
  function Uf(e, o, t) {
    if (!Eo(t))
      return !1;
    var r = typeof o;
    return (r == "number" ? St(t) && Xn(o, t.length) : r == "string" && o in t) ? Yt(t[o], e) : !1;
  }
  function Gf(e) {
    return jf(function(o, t) {
      var r = -1, n = t.length, i = n > 1 ? t[n - 1] : void 0, l = n > 2 ? t[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, l && Uf(t[0], t[1], l) && (i = n < 3 ? void 0 : i, n = 1), o = Object(o); ++r < n; ) {
        var a = t[r];
        a && e(o, a, r, i);
      }
      return o;
    });
  }
  var Kf = Object.prototype;
  function Jn(e) {
    var o = e && e.constructor, t = typeof o == "function" && o.prototype || Kf;
    return e === t;
  }
  function Xf(e, o) {
    for (var t = -1, r = Array(e); ++t < e; )
      r[t] = o(t);
    return r;
  }
  var Yf = "[object Arguments]";
  function Xi(e) {
    return Oo(e) && Yo(e) == Yf;
  }
  var ka = Object.prototype, qf = ka.hasOwnProperty, Jf = ka.propertyIsEnumerable, Zf = Xi(function() {
    return arguments;
  }()) ? Xi : function(e) {
    return Oo(e) && qf.call(e, "callee") && !Jf.call(e, "callee");
  };
  const wr = Zf;
  function Qf() {
    return !1;
  }
  var Oa = typeof He == "object" && He && !He.nodeType && He, Yi = Oa && typeof Be == "object" && Be && !Be.nodeType && Be, eh = Yi && Yi.exports === Oa, qi = eh ? io.Buffer : void 0, oh = qi ? qi.isBuffer : void 0, th = oh || Qf;
  const $r = th;
  var rh = "[object Arguments]", nh = "[object Array]", ih = "[object Boolean]", lh = "[object Date]", ah = "[object Error]", sh = "[object Function]", ch = "[object Map]", dh = "[object Number]", uh = "[object Object]", fh = "[object RegExp]", hh = "[object Set]", ph = "[object String]", vh = "[object WeakMap]", gh = "[object ArrayBuffer]", mh = "[object DataView]", bh = "[object Float32Array]", Ch = "[object Float64Array]", xh = "[object Int8Array]", yh = "[object Int16Array]", Sh = "[object Int32Array]", wh = "[object Uint8Array]", $h = "[object Uint8ClampedArray]", Ph = "[object Uint16Array]", Th = "[object Uint32Array]", de = {};
  de[bh] = de[Ch] = de[xh] = de[yh] = de[Sh] = de[wh] = de[$h] = de[Ph] = de[Th] = !0;
  de[rh] = de[nh] = de[gh] = de[ih] = de[mh] = de[lh] = de[ah] = de[sh] = de[ch] = de[dh] = de[uh] = de[fh] = de[hh] = de[ph] = de[vh] = !1;
  function Ih(e) {
    return Oo(e) && qn(e.length) && !!de[Yo(e)];
  }
  function zh(e) {
    return function(o) {
      return e(o);
    };
  }
  var Ea = typeof He == "object" && He && !He.nodeType && He, Ft = Ea && typeof Be == "object" && Be && !Be.nodeType && Be, Mh = Ft && Ft.exports === Ea, en = Mh && Ta.process, kh = function() {
    try {
      var e = Ft && Ft.require && Ft.require("util").types;
      return e || en && en.binding && en.binding("util");
    } catch {
    }
  }();
  const Ji = kh;
  var Zi = Ji && Ji.isTypedArray, Oh = Zi ? zh(Zi) : Ih;
  const Zn = Oh;
  var Eh = Object.prototype, _h = Eh.hasOwnProperty;
  function _a(e, o) {
    var t = je(e), r = !t && wr(e), n = !t && !r && $r(e), i = !t && !r && !n && Zn(e), l = t || r || n || i, a = l ? Xf(e.length, String) : [], s = a.length;
    for (var c in e)
      (o || _h.call(e, c)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
      (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      n && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
      Xn(c, s))) && a.push(c);
    return a;
  }
  function Da(e, o) {
    return function(t) {
      return e(o(t));
    };
  }
  var Dh = Da(Object.keys, Object);
  const Hh = Dh;
  var Bh = Object.prototype, Ah = Bh.hasOwnProperty;
  function Rh(e) {
    if (!Jn(e))
      return Hh(e);
    var o = [];
    for (var t in Object(e))
      Ah.call(e, t) && t != "constructor" && o.push(t);
    return o;
  }
  function Qn(e) {
    return St(e) ? _a(e) : Rh(e);
  }
  function Fh(e) {
    var o = [];
    if (e != null)
      for (var t in Object(e))
        o.push(t);
    return o;
  }
  var Lh = Object.prototype, Wh = Lh.hasOwnProperty;
  function Nh(e) {
    if (!Eo(e))
      return Fh(e);
    var o = Jn(e), t = [];
    for (var r in e)
      r == "constructor" && (o || !Wh.call(e, r)) || t.push(r);
    return t;
  }
  function Ha(e) {
    return St(e) ? _a(e, !0) : Nh(e);
  }
  var jh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Vh = /^\w*$/;
  function ei(e, o) {
    if (je(e))
      return !1;
    var t = typeof e;
    return t == "number" || t == "symbol" || t == "boolean" || e == null || Un(e) ? !0 : Vh.test(e) || !jh.test(e) || o != null && e in Object(o);
  }
  var Uh = Jo(Object, "create");
  const Ut = Uh;
  function Gh() {
    this.__data__ = Ut ? Ut(null) : {}, this.size = 0;
  }
  function Kh(e) {
    var o = this.has(e) && delete this.__data__[e];
    return this.size -= o ? 1 : 0, o;
  }
  var Xh = "__lodash_hash_undefined__", Yh = Object.prototype, qh = Yh.hasOwnProperty;
  function Jh(e) {
    var o = this.__data__;
    if (Ut) {
      var t = o[e];
      return t === Xh ? void 0 : t;
    }
    return qh.call(o, e) ? o[e] : void 0;
  }
  var Zh = Object.prototype, Qh = Zh.hasOwnProperty;
  function ep(e) {
    var o = this.__data__;
    return Ut ? o[e] !== void 0 : Qh.call(o, e);
  }
  var op = "__lodash_hash_undefined__";
  function tp(e, o) {
    var t = this.__data__;
    return this.size += this.has(e) ? 0 : 1, t[e] = Ut && o === void 0 ? op : o, this;
  }
  function Ko(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  Ko.prototype.clear = Gh;
  Ko.prototype.delete = Kh;
  Ko.prototype.get = Jh;
  Ko.prototype.has = ep;
  Ko.prototype.set = tp;
  function rp() {
    this.__data__ = [], this.size = 0;
  }
  function Hr(e, o) {
    for (var t = e.length; t--; )
      if (Yt(e[t][0], o))
        return t;
    return -1;
  }
  var np = Array.prototype, ip = np.splice;
  function lp(e) {
    var o = this.__data__, t = Hr(o, e);
    if (t < 0)
      return !1;
    var r = o.length - 1;
    return t == r ? o.pop() : ip.call(o, t, 1), --this.size, !0;
  }
  function ap(e) {
    var o = this.__data__, t = Hr(o, e);
    return t < 0 ? void 0 : o[t][1];
  }
  function sp(e) {
    return Hr(this.__data__, e) > -1;
  }
  function cp(e, o) {
    var t = this.__data__, r = Hr(t, e);
    return r < 0 ? (++this.size, t.push([e, o])) : t[r][1] = o, this;
  }
  function Co(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  Co.prototype.clear = rp;
  Co.prototype.delete = lp;
  Co.prototype.get = ap;
  Co.prototype.has = sp;
  Co.prototype.set = cp;
  var dp = Jo(io, "Map");
  const Gt = dp;
  function up() {
    this.size = 0, this.__data__ = {
      hash: new Ko(),
      map: new (Gt || Co)(),
      string: new Ko()
    };
  }
  function fp(e) {
    var o = typeof e;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? e !== "__proto__" : e === null;
  }
  function Br(e, o) {
    var t = e.__data__;
    return fp(o) ? t[typeof o == "string" ? "string" : "hash"] : t.map;
  }
  function hp(e) {
    var o = Br(this, e).delete(e);
    return this.size -= o ? 1 : 0, o;
  }
  function pp(e) {
    return Br(this, e).get(e);
  }
  function vp(e) {
    return Br(this, e).has(e);
  }
  function gp(e, o) {
    var t = Br(this, e), r = t.size;
    return t.set(e, o), this.size += t.size == r ? 0 : 1, this;
  }
  function xo(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.clear(); ++o < t; ) {
      var r = e[o];
      this.set(r[0], r[1]);
    }
  }
  xo.prototype.clear = up;
  xo.prototype.delete = hp;
  xo.prototype.get = pp;
  xo.prototype.has = vp;
  xo.prototype.set = gp;
  var mp = "Expected a function";
  function oi(e, o) {
    if (typeof e != "function" || o != null && typeof o != "function")
      throw new TypeError(mp);
    var t = function() {
      var r = arguments, n = o ? o.apply(this, r) : r[0], i = t.cache;
      if (i.has(n))
        return i.get(n);
      var l = e.apply(this, r);
      return t.cache = i.set(n, l) || i, l;
    };
    return t.cache = new (oi.Cache || xo)(), t;
  }
  oi.Cache = xo;
  var bp = 500;
  function Cp(e) {
    var o = oi(e, function(r) {
      return t.size === bp && t.clear(), r;
    }), t = o.cache;
    return o;
  }
  var xp = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, yp = /\\(\\)?/g, Sp = Cp(function(e) {
    var o = [];
    return e.charCodeAt(0) === 46 && o.push(""), e.replace(xp, function(t, r, n, i) {
      o.push(n ? i.replace(yp, "$1") : r || t);
    }), o;
  });
  const wp = Sp;
  function Ba(e) {
    return e == null ? "" : Ma(e);
  }
  function Aa(e, o) {
    return je(e) ? e : ei(e, o) ? [e] : wp(Ba(e));
  }
  var $p = 1 / 0;
  function Ar(e) {
    if (typeof e == "string" || Un(e))
      return e;
    var o = e + "";
    return o == "0" && 1 / e == -$p ? "-0" : o;
  }
  function Ra(e, o) {
    o = Aa(o, e);
    for (var t = 0, r = o.length; e != null && t < r; )
      e = e[Ar(o[t++])];
    return t && t == r ? e : void 0;
  }
  function Pp(e, o, t) {
    var r = e == null ? void 0 : Ra(e, o);
    return r === void 0 ? t : r;
  }
  function Tp(e, o) {
    for (var t = -1, r = o.length, n = e.length; ++t < r; )
      e[n + t] = o[t];
    return e;
  }
  var Ip = Da(Object.getPrototypeOf, Object);
  const Fa = Ip;
  var zp = "[object Object]", Mp = Function.prototype, kp = Object.prototype, La = Mp.toString, Op = kp.hasOwnProperty, Ep = La.call(Object);
  function _p(e) {
    if (!Oo(e) || Yo(e) != zp)
      return !1;
    var o = Fa(e);
    if (o === null)
      return !0;
    var t = Op.call(o, "constructor") && o.constructor;
    return typeof t == "function" && t instanceof t && La.call(t) == Ep;
  }
  function Dp(e, o, t) {
    var r = -1, n = e.length;
    o < 0 && (o = -o > n ? 0 : n + o), t = t > n ? n : t, t < 0 && (t += n), n = o > t ? 0 : t - o >>> 0, o >>>= 0;
    for (var i = Array(n); ++r < n; )
      i[r] = e[r + o];
    return i;
  }
  function Hp(e, o, t) {
    var r = e.length;
    return t = t === void 0 ? r : t, !o && t >= r ? e : Dp(e, o, t);
  }
  var Bp = "\\ud800-\\udfff", Ap = "\\u0300-\\u036f", Rp = "\\ufe20-\\ufe2f", Fp = "\\u20d0-\\u20ff", Lp = Ap + Rp + Fp, Wp = "\\ufe0e\\ufe0f", Np = "\\u200d", jp = RegExp("[" + Np + Bp + Lp + Wp + "]");
  function Wa(e) {
    return jp.test(e);
  }
  function Vp(e) {
    return e.split("");
  }
  var Na = "\\ud800-\\udfff", Up = "\\u0300-\\u036f", Gp = "\\ufe20-\\ufe2f", Kp = "\\u20d0-\\u20ff", Xp = Up + Gp + Kp, Yp = "\\ufe0e\\ufe0f", qp = "[" + Na + "]", Pn = "[" + Xp + "]", Tn = "\\ud83c[\\udffb-\\udfff]", Jp = "(?:" + Pn + "|" + Tn + ")", ja = "[^" + Na + "]", Va = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ua = "[\\ud800-\\udbff][\\udc00-\\udfff]", Zp = "\\u200d", Ga = Jp + "?", Ka = "[" + Yp + "]?", Qp = "(?:" + Zp + "(?:" + [ja, Va, Ua].join("|") + ")" + Ka + Ga + ")*", ev = Ka + Ga + Qp, ov = "(?:" + [ja + Pn + "?", Pn, Va, Ua, qp].join("|") + ")", tv = RegExp(Tn + "(?=" + Tn + ")|" + ov + ev, "g");
  function rv(e) {
    return e.match(tv) || [];
  }
  function nv(e) {
    return Wa(e) ? rv(e) : Vp(e);
  }
  function iv(e) {
    return function(o) {
      o = Ba(o);
      var t = Wa(o) ? nv(o) : void 0, r = t ? t[0] : o.charAt(0), n = t ? Hp(t, 1).join("") : o.slice(1);
      return r[e]() + n;
    };
  }
  var lv = iv("toUpperCase");
  const av = lv;
  function sv() {
    this.__data__ = new Co(), this.size = 0;
  }
  function cv(e) {
    var o = this.__data__, t = o.delete(e);
    return this.size = o.size, t;
  }
  function dv(e) {
    return this.__data__.get(e);
  }
  function uv(e) {
    return this.__data__.has(e);
  }
  var fv = 200;
  function hv(e, o) {
    var t = this.__data__;
    if (t instanceof Co) {
      var r = t.__data__;
      if (!Gt || r.length < fv - 1)
        return r.push([e, o]), this.size = ++t.size, this;
      t = this.__data__ = new xo(r);
    }
    return t.set(e, o), this.size = t.size, this;
  }
  function no(e) {
    var o = this.__data__ = new Co(e);
    this.size = o.size;
  }
  no.prototype.clear = sv;
  no.prototype.delete = cv;
  no.prototype.get = dv;
  no.prototype.has = uv;
  no.prototype.set = hv;
  var Xa = typeof He == "object" && He && !He.nodeType && He, Qi = Xa && typeof Be == "object" && Be && !Be.nodeType && Be, pv = Qi && Qi.exports === Xa, el = pv ? io.Buffer : void 0, ol = el ? el.allocUnsafe : void 0;
  function vv(e, o) {
    if (o)
      return e.slice();
    var t = e.length, r = ol ? ol(t) : new e.constructor(t);
    return e.copy(r), r;
  }
  function gv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length, n = 0, i = []; ++t < r; ) {
      var l = e[t];
      o(l, t, e) && (i[n++] = l);
    }
    return i;
  }
  function mv() {
    return [];
  }
  var bv = Object.prototype, Cv = bv.propertyIsEnumerable, tl = Object.getOwnPropertySymbols, xv = tl ? function(e) {
    return e == null ? [] : (e = Object(e), gv(tl(e), function(o) {
      return Cv.call(e, o);
    }));
  } : mv;
  const yv = xv;
  function Sv(e, o, t) {
    var r = o(e);
    return je(e) ? r : Tp(r, t(e));
  }
  function rl(e) {
    return Sv(e, Qn, yv);
  }
  var wv = Jo(io, "DataView");
  const In = wv;
  var $v = Jo(io, "Promise");
  const zn = $v;
  var Pv = Jo(io, "Set");
  const Mn = Pv;
  var nl = "[object Map]", Tv = "[object Object]", il = "[object Promise]", ll = "[object Set]", al = "[object WeakMap]", sl = "[object DataView]", Iv = qo(In), zv = qo(Gt), Mv = qo(zn), kv = qo(Mn), Ov = qo($n), Fo = Yo;
  (In && Fo(new In(new ArrayBuffer(1))) != sl || Gt && Fo(new Gt()) != nl || zn && Fo(zn.resolve()) != il || Mn && Fo(new Mn()) != ll || $n && Fo(new $n()) != al) && (Fo = function(e) {
    var o = Yo(e), t = o == Tv ? e.constructor : void 0, r = t ? qo(t) : "";
    if (r)
      switch (r) {
        case Iv:
          return sl;
        case zv:
          return nl;
        case Mv:
          return il;
        case kv:
          return ll;
        case Ov:
          return al;
      }
    return o;
  });
  const cl = Fo;
  var Ev = io.Uint8Array;
  const Pr = Ev;
  function _v(e) {
    var o = new e.constructor(e.byteLength);
    return new Pr(o).set(new Pr(e)), o;
  }
  function Dv(e, o) {
    var t = o ? _v(e.buffer) : e.buffer;
    return new e.constructor(t, e.byteOffset, e.length);
  }
  function Hv(e) {
    return typeof e.constructor == "function" && !Jn(e) ? wf(Fa(e)) : {};
  }
  var Bv = "__lodash_hash_undefined__";
  function Av(e) {
    return this.__data__.set(e, Bv), this;
  }
  function Rv(e) {
    return this.__data__.has(e);
  }
  function Tr(e) {
    var o = -1, t = e == null ? 0 : e.length;
    for (this.__data__ = new xo(); ++o < t; )
      this.add(e[o]);
  }
  Tr.prototype.add = Tr.prototype.push = Av;
  Tr.prototype.has = Rv;
  function Fv(e, o) {
    for (var t = -1, r = e == null ? 0 : e.length; ++t < r; )
      if (o(e[t], t, e))
        return !0;
    return !1;
  }
  function Lv(e, o) {
    return e.has(o);
  }
  var Wv = 1, Nv = 2;
  function Ya(e, o, t, r, n, i) {
    var l = t & Wv, a = e.length, s = o.length;
    if (a != s && !(l && s > a))
      return !1;
    var c = i.get(e), u = i.get(o);
    if (c && u)
      return c == o && u == e;
    var f = -1, v = !0, p = t & Nv ? new Tr() : void 0;
    for (i.set(e, o), i.set(o, e); ++f < a; ) {
      var d = e[f], m = o[f];
      if (r)
        var b = l ? r(m, d, f, o, e, i) : r(d, m, f, e, o, i);
      if (b !== void 0) {
        if (b)
          continue;
        v = !1;
        break;
      }
      if (p) {
        if (!Fv(o, function(h, w) {
          if (!Lv(p, w) && (d === h || n(d, h, t, r, i)))
            return p.push(w);
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
  function jv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r, n) {
      t[++o] = [n, r];
    }), t;
  }
  function Vv(e) {
    var o = -1, t = Array(e.size);
    return e.forEach(function(r) {
      t[++o] = r;
    }), t;
  }
  var Uv = 1, Gv = 2, Kv = "[object Boolean]", Xv = "[object Date]", Yv = "[object Error]", qv = "[object Map]", Jv = "[object Number]", Zv = "[object RegExp]", Qv = "[object Set]", eg = "[object String]", og = "[object Symbol]", tg = "[object ArrayBuffer]", rg = "[object DataView]", dl = ko ? ko.prototype : void 0, on = dl ? dl.valueOf : void 0;
  function ng(e, o, t, r, n, i, l) {
    switch (t) {
      case rg:
        if (e.byteLength != o.byteLength || e.byteOffset != o.byteOffset)
          return !1;
        e = e.buffer, o = o.buffer;
      case tg:
        return !(e.byteLength != o.byteLength || !i(new Pr(e), new Pr(o)));
      case Kv:
      case Xv:
      case Jv:
        return Yt(+e, +o);
      case Yv:
        return e.name == o.name && e.message == o.message;
      case Zv:
      case eg:
        return e == o + "";
      case qv:
        var a = jv;
      case Qv:
        var s = r & Uv;
        if (a || (a = Vv), e.size != o.size && !s)
          return !1;
        var c = l.get(e);
        if (c)
          return c == o;
        r |= Gv, l.set(e, o);
        var u = Ya(a(e), a(o), r, n, i, l);
        return l.delete(e), u;
      case og:
        if (on)
          return on.call(e) == on.call(o);
    }
    return !1;
  }
  var ig = 1, lg = Object.prototype, ag = lg.hasOwnProperty;
  function sg(e, o, t, r, n, i) {
    var l = t & ig, a = rl(e), s = a.length, c = rl(o), u = c.length;
    if (s != u && !l)
      return !1;
    for (var f = s; f--; ) {
      var v = a[f];
      if (!(l ? v in o : ag.call(o, v)))
        return !1;
    }
    var p = i.get(e), d = i.get(o);
    if (p && d)
      return p == o && d == e;
    var m = !0;
    i.set(e, o), i.set(o, e);
    for (var b = l; ++f < s; ) {
      v = a[f];
      var h = e[v], w = o[v];
      if (r)
        var O = l ? r(w, h, v, o, e, i) : r(h, w, v, e, o, i);
      if (!(O === void 0 ? h === w || n(h, w, t, r, i) : O)) {
        m = !1;
        break;
      }
      b || (b = v == "constructor");
    }
    if (m && !b) {
      var I = e.constructor, M = o.constructor;
      I != M && "constructor" in e && "constructor" in o && !(typeof I == "function" && I instanceof I && typeof M == "function" && M instanceof M) && (m = !1);
    }
    return i.delete(e), i.delete(o), m;
  }
  var cg = 1, ul = "[object Arguments]", fl = "[object Array]", sr = "[object Object]", dg = Object.prototype, hl = dg.hasOwnProperty;
  function ug(e, o, t, r, n, i) {
    var l = je(e), a = je(o), s = l ? fl : cl(e), c = a ? fl : cl(o);
    s = s == ul ? sr : s, c = c == ul ? sr : c;
    var u = s == sr, f = c == sr, v = s == c;
    if (v && $r(e)) {
      if (!$r(o))
        return !1;
      l = !0, u = !1;
    }
    if (v && !u)
      return i || (i = new no()), l || Zn(e) ? Ya(e, o, t, r, n, i) : ng(e, o, s, t, r, n, i);
    if (!(t & cg)) {
      var p = u && hl.call(e, "__wrapped__"), d = f && hl.call(o, "__wrapped__");
      if (p || d) {
        var m = p ? e.value() : e, b = d ? o.value() : o;
        return i || (i = new no()), n(m, b, t, r, i);
      }
    }
    return v ? (i || (i = new no()), sg(e, o, t, r, n, i)) : !1;
  }
  function ti(e, o, t, r, n) {
    return e === o ? !0 : e == null || o == null || !Oo(e) && !Oo(o) ? e !== e && o !== o : ug(e, o, t, r, ti, n);
  }
  var fg = 1, hg = 2;
  function pg(e, o, t, r) {
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
        if (!(v === void 0 ? ti(u, c, fg | hg, r, f) : v))
          return !1;
      }
    }
    return !0;
  }
  function qa(e) {
    return e === e && !Eo(e);
  }
  function vg(e) {
    for (var o = Qn(e), t = o.length; t--; ) {
      var r = o[t], n = e[r];
      o[t] = [r, n, qa(n)];
    }
    return o;
  }
  function Ja(e, o) {
    return function(t) {
      return t == null ? !1 : t[e] === o && (o !== void 0 || e in Object(t));
    };
  }
  function gg(e) {
    var o = vg(e);
    return o.length == 1 && o[0][2] ? Ja(o[0][0], o[0][1]) : function(t) {
      return t === e || pg(t, e, o);
    };
  }
  function mg(e, o) {
    return e != null && o in Object(e);
  }
  function bg(e, o, t) {
    o = Aa(o, e);
    for (var r = -1, n = o.length, i = !1; ++r < n; ) {
      var l = Ar(o[r]);
      if (!(i = e != null && t(e, l)))
        break;
      e = e[l];
    }
    return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && qn(n) && Xn(l, n) && (je(e) || wr(e)));
  }
  function Cg(e, o) {
    return e != null && bg(e, o, mg);
  }
  var xg = 1, yg = 2;
  function Sg(e, o) {
    return ei(e) && qa(o) ? Ja(Ar(e), o) : function(t) {
      var r = Pp(t, e);
      return r === void 0 && r === o ? Cg(t, e) : ti(o, r, xg | yg);
    };
  }
  function wg(e) {
    return function(o) {
      return o == null ? void 0 : o[e];
    };
  }
  function $g(e) {
    return function(o) {
      return Ra(o, e);
    };
  }
  function Pg(e) {
    return ei(e) ? wg(Ar(e)) : $g(e);
  }
  function Tg(e) {
    return typeof e == "function" ? e : e == null ? Gn : typeof e == "object" ? je(e) ? Sg(e[0], e[1]) : gg(e) : Pg(e);
  }
  function Ig(e) {
    return function(o, t, r) {
      for (var n = -1, i = Object(o), l = r(o), a = l.length; a--; ) {
        var s = l[e ? a : ++n];
        if (t(i[s], s, i) === !1)
          break;
      }
      return o;
    };
  }
  var zg = Ig();
  const Za = zg;
  function Mg(e, o) {
    return e && Za(e, o, Qn);
  }
  function kg(e, o) {
    return function(t, r) {
      if (t == null)
        return t;
      if (!St(t))
        return e(t, r);
      for (var n = t.length, i = o ? n : -1, l = Object(t); (o ? i-- : ++i < n) && r(l[i], i, l) !== !1; )
        ;
      return t;
    };
  }
  var Og = kg(Mg);
  const Eg = Og;
  function kn(e, o, t) {
    (t !== void 0 && !Yt(e[o], t) || t === void 0 && !(o in e)) && Yn(e, o, t);
  }
  function _g(e) {
    return Oo(e) && St(e);
  }
  function On(e, o) {
    if (!(o === "constructor" && typeof e[o] == "function") && o != "__proto__")
      return e[o];
  }
  function Dg(e) {
    return Wf(e, Ha(e));
  }
  function Hg(e, o, t, r, n, i, l) {
    var a = On(e, t), s = On(o, t), c = l.get(s);
    if (c) {
      kn(e, t, c);
      return;
    }
    var u = i ? i(a, s, t + "", e, o, l) : void 0, f = u === void 0;
    if (f) {
      var v = je(s), p = !v && $r(s), d = !v && !p && Zn(s);
      u = s, v || p || d ? je(a) ? u = a : _g(a) ? u = Pf(a) : p ? (f = !1, u = vv(s, !0)) : d ? (f = !1, u = Dv(s, !0)) : u = [] : _p(s) || wr(s) ? (u = a, wr(a) ? u = Dg(a) : (!Eo(a) || Kn(a)) && (u = Hv(s))) : f = !1;
    }
    f && (l.set(s, u), n(u, s, r, i, l), l.delete(s)), kn(e, t, u);
  }
  function Qa(e, o, t, r, n) {
    e !== o && Za(o, function(i, l) {
      if (n || (n = new no()), Eo(i))
        Hg(e, o, l, t, Qa, r, n);
      else {
        var a = r ? r(On(e, l), i, l + "", e, o, n) : void 0;
        a === void 0 && (a = i), kn(e, l, a);
      }
    }, Ha);
  }
  function Bg(e, o) {
    var t = -1, r = St(e) ? Array(e.length) : [];
    return Eg(e, function(n, i, l) {
      r[++t] = o(n, i, l);
    }), r;
  }
  function Ag(e, o) {
    var t = je(e) ? za : Bg;
    return t(e, Tg(o));
  }
  var Rg = Gf(function(e, o, t) {
    Qa(e, o, t);
  });
  const _t = Rg, wt = {
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
    fontSize: Fg,
    fontFamily: Lg,
    lineHeight: Wg
  } = wt, es = U("body", `
 margin: 0;
 font-size: ${Fg};
 font-family: ${Lg};
 line-height: ${Wg};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [U("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), bo = "n-config-provider", Kt = "naive-ui-style";
  function ve(e, o, t, r, n, i) {
    const l = Xo(), a = he(bo, null);
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
        }), a != null && a.preflightStyleDisabled || es.mount({
          id: "n-global",
          head: !0,
          anchorMetaName: Kt,
          ssr: l
        });
      };
      l ? c() : Rn(c);
    }
    return E(() => {
      var c;
      const { theme: { common: u, self: f, peers: v = {} } = {}, themeOverrides: p = {}, builtinThemeOverrides: d = {} } = n, { common: m, peers: b } = p, { common: h = void 0, [e]: { common: w = void 0, self: O = void 0, peers: I = {} } = {} } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, { common: M = void 0, [e]: _ = {} } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, { common: C, peers: $ = {} } = _, S = _t({}, u || w || h || r.common, M, C, m), x = _t(
        // {}, executed every time, no need for empty obj
        (c = f || O || r.self) === null || c === void 0 ? void 0 : c(S),
        d,
        _,
        p
      );
      return {
        common: S,
        self: x,
        peers: _t({}, r.peers, I, v),
        peerOverrides: _t({}, d.peers, $, b)
      };
    });
  }
  ve.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  const os = "n";
  function $t(e = {}, o = {
    defaultBordered: !0
  }) {
    const t = he(bo, null);
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
      mergedClsPrefixRef: E(() => (t == null ? void 0 : t.mergedClsPrefixRef.value) || os),
      namespaceRef: E(() => t == null ? void 0 : t.mergedNamespaceRef.value)
    };
  }
  const Ng = {
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
  }, jg = Ng;
  function tn(e) {
    return function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = o.width ? String(o.width) : e.defaultWidth, r = e.formats[t] || e.formats[e.defaultWidth];
      return r;
    };
  }
  function kt(e) {
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
  function Ot(e) {
    return function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = o.match(n);
      if (!i)
        return null;
      var l = i[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? Ug(a, function(f) {
        return f.test(l);
      }) : Vg(a, function(f) {
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
  function Vg(e, o) {
    for (var t in e)
      if (e.hasOwnProperty(t) && o(e[t]))
        return t;
  }
  function Ug(e, o) {
    for (var t = 0; t < e.length; t++)
      if (o(e[t]))
        return t;
  }
  function Gg(e) {
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
  var Kg = {
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
  }, Xg = function(o, t, r) {
    var n, i = Kg[o];
    return typeof i == "string" ? n = i : t === 1 ? n = i.one : n = i.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
  };
  const Yg = Xg;
  var qg = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, Jg = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, Zg = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, Qg = {
    date: tn({
      formats: qg,
      defaultWidth: "full"
    }),
    time: tn({
      formats: Jg,
      defaultWidth: "full"
    }),
    dateTime: tn({
      formats: Zg,
      defaultWidth: "full"
    })
  };
  const em = Qg;
  var om = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, tm = function(o, t, r, n) {
    return om[o];
  };
  const rm = tm;
  var nm = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }, im = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }, lm = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }, am = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }, sm = {
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
  }, cm = {
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
  }, dm = function(o, t) {
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
  }, um = {
    ordinalNumber: dm,
    era: kt({
      values: nm,
      defaultWidth: "wide"
    }),
    quarter: kt({
      values: im,
      defaultWidth: "wide",
      argumentCallback: function(o) {
        return o - 1;
      }
    }),
    month: kt({
      values: lm,
      defaultWidth: "wide"
    }),
    day: kt({
      values: am,
      defaultWidth: "wide"
    }),
    dayPeriod: kt({
      values: sm,
      defaultWidth: "wide",
      formattingValues: cm,
      defaultFormattingWidth: "wide"
    })
  };
  const fm = um;
  var hm = /^(\d+)(th|st|nd|rd)?/i, pm = /\d+/i, vm = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, gm = {
    any: [/^b/i, /^(a|c)/i]
  }, mm = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, bm = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }, Cm = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, xm = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  }, ym = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, Sm = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }, wm = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, $m = {
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
  }, Pm = {
    ordinalNumber: Gg({
      matchPattern: hm,
      parsePattern: pm,
      valueCallback: function(o) {
        return parseInt(o, 10);
      }
    }),
    era: Ot({
      matchPatterns: vm,
      defaultMatchWidth: "wide",
      parsePatterns: gm,
      defaultParseWidth: "any"
    }),
    quarter: Ot({
      matchPatterns: mm,
      defaultMatchWidth: "wide",
      parsePatterns: bm,
      defaultParseWidth: "any",
      valueCallback: function(o) {
        return o + 1;
      }
    }),
    month: Ot({
      matchPatterns: Cm,
      defaultMatchWidth: "wide",
      parsePatterns: xm,
      defaultParseWidth: "any"
    }),
    day: Ot({
      matchPatterns: ym,
      defaultMatchWidth: "wide",
      parsePatterns: Sm,
      defaultParseWidth: "any"
    }),
    dayPeriod: Ot({
      matchPatterns: wm,
      defaultMatchWidth: "any",
      parsePatterns: $m,
      defaultParseWidth: "any"
    })
  };
  const Tm = Pm;
  var Im = {
    code: "en-US",
    formatDistance: Yg,
    formatLong: em,
    formatRelative: rm,
    localize: fm,
    match: Tm,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  const zm = Im, Mm = {
    name: "en-US",
    locale: zm
  }, km = Mm;
  function ts(e) {
    const { mergedLocaleRef: o, mergedDateLocaleRef: t } = he(bo, null) || {}, r = E(() => {
      var i, l;
      return (l = (i = o == null ? void 0 : o.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : jg[e];
    });
    return {
      dateLocaleRef: E(() => {
        var i;
        return (i = t == null ? void 0 : t.value) !== null && i !== void 0 ? i : km;
      }),
      localeRef: r
    };
  }
  function Rr(e, o, t) {
    if (!o) {
      process.env.NODE_ENV !== "production" && Kl("use-style", "No style is specified.");
      return;
    }
    const r = Xo(), n = he(bo, null), i = () => {
      const l = t == null ? void 0 : t.value;
      o.mount({
        id: l === void 0 ? e : l + e,
        head: !0,
        anchorMetaName: Kt,
        props: {
          bPrefix: l ? `.${l}-` : void 0
        },
        ssr: r
      }), n != null && n.preflightStyleDisabled || es.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: Kt,
        ssr: r
      });
    };
    r ? i() : Rn(i);
  }
  function _o(e, o, t, r) {
    var n;
    t || Kl("useThemeClass", "cssVarsRef is not passed");
    const i = (n = he(bo, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, l = F(""), a = Xo();
    let s;
    const c = `__${e}`, u = () => {
      let f = c;
      const v = o ? o.value : void 0, p = i == null ? void 0 : i.value;
      p && (f += "-" + p), v && (f += "-" + v);
      const { themeOverrides: d, builtinThemeOverrides: m } = r;
      d && (f += "-" + jt(JSON.stringify(d))), m && (f += "-" + jt(JSON.stringify(m))), l.value = f, s = () => {
        const b = t.value;
        let h = "";
        for (const w in b)
          h += `${w}: ${b[w]};`;
        U(`.${f}`, h).mount({
          id: f,
          ssr: a
        }), s = void 0;
      };
    };
    return vo(() => {
      u();
    }), {
      themeClass: l,
      onRender: () => {
        s == null || s();
      }
    };
  }
  function rs(e, o, t) {
    if (!o)
      return;
    const r = Xo(), n = E(() => {
      const { value: l } = o;
      if (!l)
        return;
      const a = l[e];
      if (a)
        return a;
    }), i = () => {
      vo(() => {
        const { value: l } = t, a = `${l}${e}Rtl`;
        if ($d(a, r))
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
    return r ? i() : Rn(i), n;
  }
  function ns(e, o) {
    return ie({
      name: av(e),
      setup() {
        var t;
        const r = (t = he(bo, null)) === null || t === void 0 ? void 0 : t.mergedIconsRef;
        return () => {
          var n;
          const i = (n = r == null ? void 0 : r.value) === null || n === void 0 ? void 0 : n[e];
          return i ? i() : o;
        };
      }
    });
  }
  const Om = ie({
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
  }), Em = ns("close", y(
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
  )), _m = ie({
    name: "Empty",
    render() {
      return y(
        "svg",
        { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        y("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
        y("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
      );
    }
  }), Dm = ie({
    name: "ChevronDown",
    render() {
      return y(
        "svg",
        { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        y("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
      );
    }
  }), Hm = ns("clear", y(
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
  )), is = ie({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: o }) {
      const t = Dr();
      return () => y(Ct, { name: "icon-switch-transition", appear: t.value }, o);
    }
  }), Bm = Q("base-icon", `
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
      Rr("-base-icon", Bm, se(e, "clsPrefix"));
    },
    render() {
      return y("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
    }
  }), Am = Q("base-close", `
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
 `), qe("disabled", [U("&:hover", `
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
 `)])]), Rm = ie({
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
      return Rr("-base-close", Am, se(e, "clsPrefix")), () => {
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
            default: () => y(Em, null)
          })
        );
      };
    }
  }), Fm = ie({
    props: {
      onFocus: Function,
      onBlur: Function
    },
    setup(e) {
      return () => y("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
    }
  }), {
    cubicBezierEaseInOut: Lm
  } = wt;
  function En({
    originalTransform: e = "",
    left: o = 0,
    top: t = 0,
    transition: r = `all .3s ${Lm} !important`
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
  const Wm = U([U("@keyframes loading-container-rotate", `
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
 `, [En()]), Y("container", `
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
 `, [En({
    left: "50%",
    top: "50%",
    originalTransform: "translateX(-50%) translateY(-50%)"
  })])])]), Nm = {
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: void 0
    }
  }, ls = ie({
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
    } }, Nm),
    setup(e) {
      Rr("-base-loading", Wm, se(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: o, strokeWidth: t, stroke: r, scale: n } = this, i = o / n;
      return y(
        "div",
        { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
        y(is, null, {
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
  function pl(e) {
    return Array.isArray(e) ? e : [e];
  }
  const _n = {
    STOP: "STOP"
  };
  function as(e, o) {
    const t = o(e);
    e.children !== void 0 && t !== _n.STOP && e.children.forEach((r) => as(r, o));
  }
  function jm(e, o = {}) {
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
  function Vm(e, o) {
    const { isLeaf: t } = e;
    return t !== void 0 ? t : !o(e);
  }
  function Um(e) {
    return e.children;
  }
  function Gm(e) {
    return e.key;
  }
  function Km() {
    return !1;
  }
  function Xm(e, o) {
    const { isLeaf: t } = e;
    return !(t === !1 && !Array.isArray(o(e)));
  }
  function Ym(e) {
    return e.disabled === !0;
  }
  function qm(e, o) {
    return e.isLeaf === !1 && !Array.isArray(o(e));
  }
  function Jm(e, o) {
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
  function Zm(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) || t.add(r);
    }), Array.from(t);
  }
  function Qm(e, o) {
    const t = new Set(e);
    return o.forEach((r) => {
      t.has(r) && t.delete(r);
    }), Array.from(t);
  }
  function eb(e) {
    return (e == null ? void 0 : e.type) === "group";
  }
  function ob(e) {
    const o = /* @__PURE__ */ new Map();
    return e.forEach((t, r) => {
      o.set(t.key, r);
    }), (t) => {
      var r;
      return (r = o.get(t)) !== null && r !== void 0 ? r : null;
    };
  }
  class tb extends Error {
    constructor() {
      super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
    }
  }
  function rb(e, o, t, r) {
    return Ir(o.concat(e), t, r, !1);
  }
  function nb(e, o) {
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
  function ib(e, o, t, r) {
    const n = Ir(o, t, r, !1), i = Ir(e, t, r, !0), l = nb(e, t), a = [];
    return n.forEach((s) => {
      (i.has(s) || l.has(s)) && a.push(s);
    }), a.forEach((s) => n.delete(s)), n;
  }
  function ln(e, o) {
    const { checkedKeys: t, keysToCheck: r, keysToUncheck: n, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: c } = e;
    if (!l)
      return r !== void 0 ? {
        checkedKeys: Zm(t, r),
        indeterminateKeys: Array.from(i)
      } : n !== void 0 ? {
        checkedKeys: Qm(t, n),
        indeterminateKeys: Array.from(i)
      } : {
        checkedKeys: Array.from(t),
        indeterminateKeys: Array.from(i)
      };
    const { levelTreeNodeMap: u } = o;
    let f;
    n !== void 0 ? f = ib(n, t, o, c) : r !== void 0 ? f = rb(r, t, o, c) : f = Ir(t, o, c, !1);
    const v = s === "parent", p = s === "child" || a, d = f, m = /* @__PURE__ */ new Set(), b = Math.max.apply(null, Array.from(u.keys()));
    for (let h = b; h >= 0; h -= 1) {
      const w = h === 0, O = u.get(h);
      for (const I of O) {
        if (I.isLeaf)
          continue;
        const { key: M, shallowLoaded: _ } = I;
        if (p && _ && I.children.forEach((x) => {
          !x.disabled && !x.isLeaf && x.shallowLoaded && d.has(x.key) && d.delete(x.key);
        }), I.disabled || !_)
          continue;
        let C = !0, $ = !1, S = !0;
        for (const x of I.children) {
          const P = x.key;
          if (!x.disabled) {
            if (S && (S = !1), d.has(P))
              $ = !0;
            else if (m.has(P)) {
              $ = !0, C = !1;
              break;
            } else if (C = !1, $)
              break;
          }
        }
        C && !S ? (v && I.children.forEach((x) => {
          !x.disabled && d.has(x.key) && d.delete(x.key);
        }), d.add(M)) : $ && m.add(M), w && p && d.has(M) && d.delete(M);
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
      c !== void 0 && as(c, (u) => {
        if (u.disabled)
          return _n.STOP;
        const { key: f } = u;
        if (!l.has(f) && (l.add(f), a.add(f), qm(u.rawNode, i))) {
          if (r)
            return _n.STOP;
          if (!t)
            throw new tb();
        }
      });
    }), a;
  }
  function lb(e, { includeGroup: o = !1, includeSelf: t = !0 }, r) {
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
  function ab(e) {
    if (e.length === 0)
      return null;
    const o = e[0];
    return o.isGroup || o.ignored || o.disabled ? o.getNext() : o;
  }
  function sb(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n + 1) % r] : n === t.length - 1 ? null : t[n + 1];
  }
  function vl(e, o, { loop: t = !1, includeDisabled: r = !1 } = {}) {
    const n = o === "prev" ? cb : sb, i = {
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
          const u = ri(c, i);
          u !== null ? a = u : s(n(c, t));
        } else {
          const u = n(c, !1);
          if (u !== null)
            s(u);
          else {
            const f = db(c);
            f != null && f.isGroup ? s(n(f, t)) : t && s(n(c, !0));
          }
        }
      }
    }
    return s(e), a;
  }
  function cb(e, o) {
    const t = e.siblings, r = t.length, { index: n } = e;
    return o ? t[(n - 1 + r) % r] : n === 0 ? null : t[n - 1];
  }
  function db(e) {
    return e.parent;
  }
  function ri(e, o = {}) {
    const { reverse: t = !1 } = o, { children: r } = e;
    if (r) {
      const { length: n } = r, i = t ? n - 1 : 0, l = t ? -1 : n, a = t ? -1 : 1;
      for (let s = i; s !== l; s += a) {
        const c = r[s];
        if (!c.disabled && !c.ignored)
          if (c.isGroup) {
            const u = ri(c, o);
            if (u !== null)
              return u;
          } else
            return c;
      }
    }
    return null;
  }
  const ub = {
    getChild() {
      return this.ignored ? null : ri(this);
    },
    getParent() {
      const { parent: e } = this;
      return e != null && e.isGroup ? e.getParent() : e;
    },
    getNext(e = {}) {
      return vl(this, "next", e);
    },
    getPrev(e = {}) {
      return vl(this, "prev", e);
    }
  };
  function fb(e, o) {
    const t = o ? new Set(o) : void 0, r = [];
    function n(i) {
      i.forEach((l) => {
        r.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
        t === void 0 || t.has(l.key)) && n(l.children);
      });
    }
    return n(e), r;
  }
  function hb(e, o) {
    const t = e.key;
    for (; o; ) {
      if (o.key === t)
        return !0;
      o = o.parent;
    }
    return !1;
  }
  function ss(e, o, t, r, n, i = null, l = 0) {
    const a = [];
    return e.forEach((s, c) => {
      var u;
      process.env.NODE_ENV !== "production" && Jm(s, n) && console.error("[treemate]: node", s, "is invalid");
      const f = Object.create(r);
      if (f.rawNode = s, f.siblings = a, f.level = l, f.index = c, f.isFirstChild = c === 0, f.isLastChild = c + 1 === e.length, f.parent = i, !f.ignored) {
        const v = n(s);
        Array.isArray(v) && (f.children = ss(v, o, t, r, n, f, l + 1));
      }
      a.push(f), o.set(f.key, f), t.has(l) || t.set(l, []), (u = t.get(l)) === null || u === void 0 || u.push(f);
    }), a;
  }
  function pb(e, o = {}) {
    var t;
    const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), { getDisabled: i = Ym, getIgnored: l = Km, getIsGroup: a = eb, getKey: s = Gm } = o, c = (t = o.getChildren) !== null && t !== void 0 ? t : Um, u = o.ignoreEmptyChildren ? (I) => {
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
        return Vm(this.rawNode, u);
      },
      get shallowLoaded() {
        return Xm(this.rawNode, u);
      },
      get ignored() {
        return l(this.rawNode);
      },
      contains(I) {
        return hb(this, I);
      }
    }, ub), v = ss(e, r, n, f, u);
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
    function m(I, M) {
      const _ = d(I);
      return _ ? _.getPrev(M) : null;
    }
    function b(I, M) {
      const _ = d(I);
      return _ ? _.getNext(M) : null;
    }
    function h(I) {
      const M = d(I);
      return M ? M.getParent() : null;
    }
    function w(I) {
      const M = d(I);
      return M ? M.getChild() : null;
    }
    const O = {
      treeNodes: v,
      treeNodeMap: r,
      levelTreeNodeMap: n,
      maxLevel: Math.max(...n.keys()),
      getChildren: u,
      getFlattenedNodes(I) {
        return fb(v, I);
      },
      getNode: p,
      getPrev: m,
      getNext: b,
      getParent: h,
      getChild: w,
      getFirstAvailableNode() {
        return ab(v);
      },
      getPath(I, M = {}) {
        return lb(I, M, O);
      },
      getCheckedKeys(I, M = {}) {
        const { cascade: _ = !0, leafOnly: C = !1, checkStrategy: $ = "all", allowNotLoaded: S = !1 } = M;
        return ln({
          checkedKeys: rn(I),
          indeterminateKeys: nn(I),
          cascade: _,
          leafOnly: C,
          checkStrategy: $,
          allowNotLoaded: S
        }, O);
      },
      check(I, M, _ = {}) {
        const { cascade: C = !0, leafOnly: $ = !1, checkStrategy: S = "all", allowNotLoaded: x = !1 } = _;
        return ln({
          checkedKeys: rn(M),
          indeterminateKeys: nn(M),
          keysToCheck: I == null ? [] : pl(I),
          cascade: C,
          leafOnly: $,
          checkStrategy: S,
          allowNotLoaded: x
        }, O);
      },
      uncheck(I, M, _ = {}) {
        const { cascade: C = !0, leafOnly: $ = !1, checkStrategy: S = "all", allowNotLoaded: x = !1 } = _;
        return ln({
          checkedKeys: rn(M),
          indeterminateKeys: nn(M),
          keysToUncheck: I == null ? [] : pl(I),
          cascade: C,
          leafOnly: $,
          checkStrategy: S,
          allowNotLoaded: x
        }, O);
      },
      getNonLeafKeys(I = {}) {
        return jm(v, I);
      }
    };
    return O;
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
  }, vb = go(j.neutralBase), cs = go(j.neutralInvertBase), gb = "rgba(" + cs.slice(0, 3).join(", ") + ", ";
  function le(e) {
    return gb + String(e) + ")";
  }
  function mb(e) {
    const o = Array.from(cs);
    return o[3] = Number(e), Z(vb, o);
  }
  const bb = Object.assign(Object.assign({ name: "common" }, wt), {
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
    tagColor: mb(j.alphaTag),
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
  }), A = bb, J = {
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
  }, Cb = go(J.neutralBase), ds = go(J.neutralInvertBase), xb = "rgba(" + ds.slice(0, 3).join(", ") + ", ";
  function gl(e) {
    return xb + String(e) + ")";
  }
  function Se(e) {
    const o = Array.from(ds);
    return o[3] = Number(e), Z(Cb, o);
  }
  const yb = Object.assign(Object.assign({ name: "common" }, wt), {
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
    scrollbarColor: gl(J.alphaScrollbar),
    scrollbarColorHover: gl(J.alphaScrollbarHover),
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
  }), yo = yb, Sb = {
    iconSizeSmall: "34px",
    iconSizeMedium: "40px",
    iconSizeLarge: "46px",
    iconSizeHuge: "52px"
  }, us = (e) => {
    const { textColorDisabled: o, iconColor: t, textColor2: r, fontSizeSmall: n, fontSizeMedium: i, fontSizeLarge: l, fontSizeHuge: a } = e;
    return Object.assign(Object.assign({}, Sb), {
      fontSizeSmall: n,
      fontSizeMedium: i,
      fontSizeLarge: l,
      fontSizeHuge: a,
      textColor: o,
      iconColor: t,
      extraTextColor: r
    });
  }, wb = {
    name: "Empty",
    common: yo,
    self: us
  }, ni = wb, $b = {
    name: "Empty",
    common: A,
    self: us
  }, Zo = $b, Pb = Q("empty", `
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
 `)]), Tb = Object.assign(Object.assign({}, ve.props), { description: String, showDescription: {
    type: Boolean,
    default: !0
  }, showIcon: {
    type: Boolean,
    default: !0
  }, size: {
    type: String,
    default: "medium"
  }, renderIcon: Function }), Ib = ie({
    name: "Empty",
    props: Tb,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = $t(e), r = ve("Empty", "-empty", Pb, ni, e, o), { localeRef: n } = ts("Empty"), i = he(bo, null), l = E(() => {
        var u, f, v;
        return (u = e.description) !== null && u !== void 0 ? u : (v = (f = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || f === void 0 ? void 0 : f.Empty) === null || v === void 0 ? void 0 : v.description;
      }), a = E(() => {
        var u, f;
        return ((f = (u = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || u === void 0 ? void 0 : u.Empty) === null || f === void 0 ? void 0 : f.renderIcon) || (() => y(_m, null));
      }), s = E(() => {
        const { size: u } = e, { common: { cubicBezierEaseInOut: f }, self: { [fe("iconSize", u)]: v, [fe("fontSize", u)]: p, textColor: d, iconColor: m, extraTextColor: b } } = r.value;
        return {
          "--n-icon-size": v,
          "--n-font-size": p,
          "--n-bezier": f,
          "--n-text-color": d,
          "--n-icon-color": m,
          "--n-extra-text-color": b
        };
      }), c = t ? _o("empty", E(() => {
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
  }), fs = (e) => {
    const { scrollbarColor: o, scrollbarColorHover: t } = e;
    return {
      color: o,
      colorHover: t
    };
  }, zb = {
    name: "Scrollbar",
    common: yo,
    self: fs
  }, hs = zb, Mb = {
    name: "Scrollbar",
    common: A,
    self: fs
  }, Ee = Mb, {
    cubicBezierEaseInOut: ml
  } = wt;
  function kb({
    name: e = "fade-in",
    enterDuration: o = "0.2s",
    leaveDuration: t = "0.2s",
    enterCubicBezier: r = ml,
    leaveCubicBezier: n = ml
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
  const Ob = Q("scrollbar", `
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
 `, [kb(), U("&:hover", {
    backgroundColor: "var(--n-scrollbar-color-hover)"
  })])])])])]), Eb = Object.assign(Object.assign({}, ve.props), {
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
  }), ps = ie({
    name: "Scrollbar",
    props: Eb,
    inheritAttrs: !1,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t, mergedRtlRef: r } = $t(e), n = rs("Scrollbar", r, o), i = F(null), l = F(null), a = F(null), s = F(null), c = F(null), u = F(null), f = F(null), v = F(null), p = F(null), d = F(null), m = F(null), b = F(0), h = F(0), w = F(!1), O = F(!1);
      let I = !1, M = !1, _, C, $ = 0, S = 0, x = 0, P = 0;
      const z = Vd(), W = E(() => {
        const { value: g } = v, { value: T } = u, { value: B } = d;
        return g === null || T === null || B === null ? 0 : Math.min(g, B * g / T + e.size * 1.5);
      }), H = E(() => `${W.value}px`), N = E(() => {
        const { value: g } = p, { value: T } = f, { value: B } = m;
        return g === null || T === null || B === null ? 0 : B * g / T + e.size * 1.5;
      }), G = E(() => `${N.value}px`), V = E(() => {
        const { value: g } = v, { value: T } = b, { value: B } = u, { value: X } = d;
        if (g === null || B === null || X === null)
          return 0;
        {
          const q = B - g;
          return q ? T / q * (X - W.value) : 0;
        }
      }), oe = E(() => `${V.value}px`), k = E(() => {
        const { value: g } = p, { value: T } = h, { value: B } = f, { value: X } = m;
        if (g === null || B === null || X === null)
          return 0;
        {
          const q = B - g;
          return q ? T / q * (X - N.value) : 0;
        }
      }), L = E(() => `${k.value}px`), re = E(() => {
        const { value: g } = v, { value: T } = u;
        return g !== null && T !== null && T > g;
      }), ue = E(() => {
        const { value: g } = p, { value: T } = f;
        return g !== null && T !== null && T > g;
      }), ze = E(() => {
        const { trigger: g } = e;
        return g === "none" || w.value;
      }), lo = E(() => {
        const { trigger: g } = e;
        return g === "none" || O.value;
      }), Te = E(() => {
        const { container: g } = e;
        return g ? g() : l.value;
      }), Qe = E(() => {
        const { content: g } = e;
        return g ? g() : a.value;
      }), Ae = Lu(() => {
        e.container || Ge({
          top: b.value,
          left: h.value
        });
      }), De = () => {
        Ae.isDeactivated || Le();
      }, xe = (g) => {
        if (Ae.isDeactivated)
          return;
        const { onResize: T } = e;
        T && T(g), Le();
      }, Ge = (g, T) => {
        if (!e.scrollable)
          return;
        if (typeof g == "number") {
          Fe(T ?? 0, g, 0, !1, "auto");
          return;
        }
        const { left: B, top: X, index: q, elSize: ee, position: te, behavior: ne, el: ke, debounce: fo = !0 } = g;
        (B !== void 0 || X !== void 0) && Fe(B ?? 0, X ?? 0, 0, !1, ne), ke !== void 0 ? Fe(0, ke.offsetTop, ke.offsetHeight, fo, ne) : q !== void 0 && ee !== void 0 ? Fe(0, q * ee, ee, fo, ne) : te === "bottom" ? Fe(0, Number.MAX_SAFE_INTEGER, 0, !1, ne) : te === "top" && Fe(0, 0, 0, !1, ne);
      }, Re = (g, T) => {
        if (!e.scrollable)
          return;
        const { value: B } = Te;
        B && (typeof g == "object" ? B.scrollBy(g) : B.scrollBy(g, T || 0));
      };
      function Fe(g, T, B, X, q) {
        const { value: ee } = Te;
        if (ee) {
          if (X) {
            const { scrollTop: te, offsetHeight: ne } = ee;
            if (T > te) {
              T + B <= te + ne || ee.scrollTo({
                left: g,
                top: T + B - ne,
                behavior: q
              });
              return;
            }
          }
          ee.scrollTo({
            left: g,
            top: T,
            behavior: q
          });
        }
      }
      function ao() {
        So(), wo(), Le();
      }
      function so() {
        co();
      }
      function co() {
        Do(), Ho();
      }
      function Do() {
        C !== void 0 && window.clearTimeout(C), C = window.setTimeout(() => {
          O.value = !1;
        }, e.duration);
      }
      function Ho() {
        _ !== void 0 && window.clearTimeout(_), _ = window.setTimeout(() => {
          w.value = !1;
        }, e.duration);
      }
      function So() {
        _ !== void 0 && window.clearTimeout(_), w.value = !0;
      }
      function wo() {
        C !== void 0 && window.clearTimeout(C), O.value = !0;
      }
      function Me(g) {
        const { onScroll: T } = e;
        T && T(g), R();
      }
      function R() {
        const { value: g } = Te;
        g && (b.value = g.scrollTop, h.value = g.scrollLeft * (n != null && n.value ? -1 : 1));
      }
      function K() {
        const { value: g } = Qe;
        g && (u.value = g.offsetHeight, f.value = g.offsetWidth);
        const { value: T } = Te;
        T && (v.value = T.offsetHeight, p.value = T.offsetWidth);
        const { value: B } = c, { value: X } = s;
        B && (m.value = B.offsetWidth), X && (d.value = X.offsetHeight);
      }
      function ce() {
        const { value: g } = Te;
        g && (b.value = g.scrollTop, h.value = g.scrollLeft * (n != null && n.value ? -1 : 1), v.value = g.offsetHeight, p.value = g.offsetWidth, u.value = g.scrollHeight, f.value = g.scrollWidth);
        const { value: T } = c, { value: B } = s;
        T && (m.value = T.offsetWidth), B && (d.value = B.offsetHeight);
      }
      function Le() {
        e.scrollable && (e.useUnifiedContainer ? ce() : (K(), R()));
      }
      function et(g) {
        var T;
        return !(!((T = i.value) === null || T === void 0) && T.contains(Nt(g)));
      }
      function Tt(g) {
        g.preventDefault(), g.stopPropagation(), M = !0, Ie("mousemove", window, ot, !0), Ie("mouseup", window, tt, !0), S = h.value, x = n != null && n.value ? window.innerWidth - g.clientX : g.clientX;
      }
      function ot(g) {
        if (!M)
          return;
        _ !== void 0 && window.clearTimeout(_), C !== void 0 && window.clearTimeout(C);
        const { value: T } = p, { value: B } = f, { value: X } = N;
        if (T === null || B === null)
          return;
        const ee = (n != null && n.value ? window.innerWidth - g.clientX - x : g.clientX - x) * (B - T) / (T - X), te = B - T;
        let ne = S + ee;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Te;
        if (ke) {
          ke.scrollLeft = ne * (n != null && n.value ? -1 : 1);
          const { internalOnUpdateScrollLeft: fo } = e;
          fo && fo(ne);
        }
      }
      function tt(g) {
        g.preventDefault(), g.stopPropagation(), me("mousemove", window, ot, !0), me("mouseup", window, tt, !0), M = !1, Le(), et(g) && co();
      }
      function rt(g) {
        g.preventDefault(), g.stopPropagation(), I = !0, Ie("mousemove", window, $o, !0), Ie("mouseup", window, Po, !0), $ = b.value, P = g.clientY;
      }
      function $o(g) {
        if (!I)
          return;
        _ !== void 0 && window.clearTimeout(_), C !== void 0 && window.clearTimeout(C);
        const { value: T } = v, { value: B } = u, { value: X } = W;
        if (T === null || B === null)
          return;
        const ee = (g.clientY - P) * (B - T) / (T - X), te = B - T;
        let ne = $ + ee;
        ne = Math.min(te, ne), ne = Math.max(ne, 0);
        const { value: ke } = Te;
        ke && (ke.scrollTop = ne);
      }
      function Po(g) {
        g.preventDefault(), g.stopPropagation(), me("mousemove", window, $o, !0), me("mouseup", window, Po, !0), I = !1, Le(), et(g) && co();
      }
      vo(() => {
        const { value: g } = ue, { value: T } = re, { value: B } = o, { value: X } = c, { value: q } = s;
        X && (g ? X.classList.remove(`${B}-scrollbar-rail--disabled`) : X.classList.add(`${B}-scrollbar-rail--disabled`)), q && (T ? q.classList.remove(`${B}-scrollbar-rail--disabled`) : q.classList.add(`${B}-scrollbar-rail--disabled`));
      }), Ve(() => {
        e.container || Le();
      }), Ze(() => {
        _ !== void 0 && window.clearTimeout(_), C !== void 0 && window.clearTimeout(C), me("mousemove", window, $o, !0), me("mouseup", window, Po, !0);
      });
      const It = ve("Scrollbar", "-scrollbar", Ob, hs, e, o), nt = E(() => {
        const { common: { cubicBezierEaseInOut: g, scrollbarBorderRadius: T, scrollbarHeight: B, scrollbarWidth: X }, self: { color: q, colorHover: ee } } = It.value;
        return {
          "--n-scrollbar-bezier": g,
          "--n-scrollbar-color": q,
          "--n-scrollbar-color-hover": ee,
          "--n-scrollbar-border-radius": T,
          "--n-scrollbar-width": X,
          "--n-scrollbar-height": B
        };
      }), Ke = t ? _o("scrollbar", void 0, nt, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: Ge,
        scrollBy: Re,
        sync: Le,
        syncUnifiedContainer: ce,
        handleMouseEnterWrapper: ao,
        handleMouseLeaveWrapper: so
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
        needXBar: ue,
        yBarSizePx: H,
        xBarSizePx: G,
        yBarTopPx: oe,
        xBarLeftPx: L,
        isShowXBar: ze,
        isShowYBar: lo,
        isIos: z,
        handleScroll: Me,
        handleContentResize: De,
        handleContainerResize: xe,
        handleYScrollMouseDown: rt,
        handleXScrollMouseDown: Tt,
        cssVars: t ? void 0 : nt,
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
      ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, y(l ? bn : Ct, l ? null : { name: "fade-in-transition" }, {
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
          ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, y(l ? bn : Ct, l ? null : { name: "fade-in-transition" }, {
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
        oo,
        null,
        c,
        a()
      ) : c;
    }
  }), _b = ps, Db = ps, Hb = {
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
  }, vs = (e) => {
    const { borderRadius: o, popoverColor: t, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: l, textColorDisabled: a, primaryColor: s, opacityDisabled: c, hoverColor: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p, fontSizeHuge: d, heightSmall: m, heightMedium: b, heightLarge: h, heightHuge: w } = e;
    return Object.assign(Object.assign({}, Hb), { optionFontSizeSmall: f, optionFontSizeMedium: v, optionFontSizeLarge: p, optionFontSizeHuge: d, optionHeightSmall: m, optionHeightMedium: b, optionHeightLarge: h, optionHeightHuge: w, borderRadius: o, color: t, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: l, optionTextColorDisabled: a, optionTextColorActive: s, optionOpacityDisabled: c, optionCheckColor: s, optionColorPending: u, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: u, actionTextColor: i, loadingColor: s });
  }, Bb = {
    name: "InternalSelectMenu",
    common: yo,
    peers: {
      Scrollbar: hs,
      Empty: ni
    },
    self: vs
  }, gs = Bb, Ab = {
    name: "InternalSelectMenu",
    common: A,
    peers: {
      Scrollbar: Ee,
      Empty: Zo
    },
    self: vs
  }, Jt = Ab;
  function Rb(e, o) {
    return y(Ct, { name: "fade-in-scale-up-transition" }, {
      default: () => e ? y(qt, { clsPrefix: o, class: `${o}-base-select-option__check` }, {
        default: () => y(Om)
      }) : null
    });
  }
  const bl = ie({
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
      } = he(Nn), p = Je(() => {
        const { value: h } = t;
        return h ? e.tmNode.key === h.key : !1;
      });
      function d(h) {
        const { tmNode: w } = e;
        w.disabled || f(h, w);
      }
      function m(h) {
        const { tmNode: w } = e;
        w.disabled || v(h, w);
      }
      function b(h) {
        const { tmNode: w } = e, { value: O } = p;
        w.disabled || O || v(h, w);
      }
      return {
        multiple: r,
        isGrouped: Je(() => {
          const { tmNode: h } = e, { parent: w } = h;
          return w && w.rawNode.type === "group";
        }),
        showCheckmark: c,
        nodeProps: u,
        isPending: p,
        isSelected: Je(() => {
          const { value: h } = o, { value: w } = r;
          if (h === null)
            return !1;
          const O = e.tmNode.rawNode[s.value];
          if (w) {
            const { value: I } = n;
            return I.has(O);
          } else
            return h === O;
        }),
        labelField: a,
        renderLabel: i,
        renderOption: l,
        handleMouseMove: b,
        handleMouseEnter: m,
        handleClick: d
      };
    },
    render() {
      const { clsPrefix: e, tmNode: { rawNode: o }, isSelected: t, isPending: r, isGrouped: n, showCheckmark: i, nodeProps: l, renderOption: a, renderLabel: s, handleClick: c, handleMouseEnter: u, handleMouseMove: f } = this, v = Rb(t, e), p = s ? [s(o, t), i && v] : [
        ht(o[this.labelField], o, t),
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
  }), Cl = ie({
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
      } = he(Nn);
      return {
        labelField: t,
        nodeProps: r,
        renderLabel: e,
        renderOption: o
      };
    },
    render() {
      const { clsPrefix: e, renderLabel: o, renderOption: t, nodeProps: r, tmNode: { rawNode: n } } = this, i = r == null ? void 0 : r(n), l = o ? o(n, !1) : ht(n[this.labelField], n, !1), a = y("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), l);
      return n.render ? n.render({ node: a, option: n }) : t ? t({ node: a, option: n, selected: !1 }) : a;
    }
  }), {
    cubicBezierEaseIn: xl,
    cubicBezierEaseOut: yl
  } = wt;
  function ms({
    transformOrigin: e = "inherit",
    duration: o = ".2s",
    enterScale: t = ".9",
    originalTransform: r = "",
    originalTransition: n = ""
  } = {}) {
    return [U("&.fade-in-scale-up-transition-leave-active", {
      transformOrigin: e,
      transition: `opacity ${o} ${xl}, transform ${o} ${xl} ${n && "," + n}`
    }), U("&.fade-in-scale-up-transition-enter-active", {
      transformOrigin: e,
      transition: `opacity ${o} ${yl}, transform ${o} ${yl} ${n && "," + n}`
    }), U("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
      opacity: 0,
      transform: `${r} scale(${t})`
    }), U("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
      opacity: 1,
      transform: `${r} scale(1)`
    })];
  }
  const Fb = Q("base-select-menu", `
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
 `, [qe("selected", `
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
 `, [ms({
    enterScale: "0.5"
  })])])]), Lb = ie({
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
      const o = ve("InternalSelectMenu", "-internal-select-menu", Fb, gs, e, se(e, "clsPrefix")), t = F(null), r = F(null), n = F(null), i = E(() => e.treeMate.getFlattenedNodes()), l = E(() => ob(i.value)), a = F(null);
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
          e.resetMenuOnOptionsChange ? (e.autoPending ? s() : c(), mt(z)) : c();
        }, {
          immediate: !0
        }) : u == null || u();
      }, {
        immediate: !0
      }), Ze(() => {
        u == null || u();
      });
      const f = E(() => vn(o.value.self[fe("optionHeight", e.size)])), v = E(() => jr(o.value.self[fe("padding", e.size)])), p = E(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), d = E(() => {
        const k = i.value;
        return k && k.length === 0;
      });
      function m(k) {
        const { onToggle: L } = e;
        L && L(k);
      }
      function b(k) {
        const { onScroll: L } = e;
        L && L(k);
      }
      function h(k) {
        var L;
        (L = n.value) === null || L === void 0 || L.sync(), b(k);
      }
      function w() {
        var k;
        (k = n.value) === null || k === void 0 || k.sync();
      }
      function O() {
        const { value: k } = a;
        return k || null;
      }
      function I(k, L) {
        L.disabled || P(L, !1);
      }
      function M(k, L) {
        L.disabled || m(L);
      }
      function _(k) {
        var L;
        mr(k, "action") || (L = e.onKeyup) === null || L === void 0 || L.call(e, k);
      }
      function C(k) {
        var L;
        mr(k, "action") || (L = e.onKeydown) === null || L === void 0 || L.call(e, k);
      }
      function $(k) {
        var L;
        (L = e.onMousedown) === null || L === void 0 || L.call(e, k), !e.focusable && k.preventDefault();
      }
      function S() {
        const { value: k } = a;
        k && P(k.getNext({ loop: !0 }), !0);
      }
      function x() {
        const { value: k } = a;
        k && P(k.getPrev({ loop: !0 }), !0);
      }
      function P(k, L = !1) {
        a.value = k, L && z();
      }
      function z() {
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
      to(Nn, {
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
      }), to(ra, t), Ve(() => {
        const { value: k } = n;
        k && k.sync();
      });
      const N = E(() => {
        const { size: k } = e, { common: { cubicBezierEaseInOut: L }, self: { height: re, borderRadius: ue, color: ze, groupHeaderTextColor: lo, actionDividerColor: Te, optionTextColorPressed: Qe, optionTextColor: Ae, optionTextColorDisabled: De, optionTextColorActive: xe, optionOpacityDisabled: Ge, optionCheckColor: Re, actionTextColor: Fe, optionColorPending: ao, optionColorActive: so, loadingColor: co, loadingSize: Do, optionColorActivePending: Ho, [fe("optionFontSize", k)]: So, [fe("optionHeight", k)]: wo, [fe("optionPadding", k)]: Me } } = o.value;
        return {
          "--n-height": re,
          "--n-action-divider-color": Te,
          "--n-action-text-color": Fe,
          "--n-bezier": L,
          "--n-border-radius": ue,
          "--n-color": ze,
          "--n-option-font-size": So,
          "--n-group-header-text-color": lo,
          "--n-option-check-color": Re,
          "--n-option-color-pending": ao,
          "--n-option-color-active": so,
          "--n-option-color-active-pending": Ho,
          "--n-option-height": wo,
          "--n-option-opacity-disabled": Ge,
          "--n-option-text-color": Ae,
          "--n-option-text-color-active": xe,
          "--n-option-text-color-disabled": De,
          "--n-option-text-color-pressed": Qe,
          "--n-option-padding": Me,
          "--n-option-padding-left": jr(Me, "left"),
          "--n-option-padding-right": jr(Me, "right"),
          "--n-loading-color": co,
          "--n-loading-size": Do
        };
      }), { inlineThemeDisabled: G } = e, V = G ? _o("internal-select-menu", E(() => e.size[0]), N, e) : void 0, oe = {
        selfRef: t,
        next: S,
        prev: x,
        getPendingTmNode: O
      };
      return Pa(t, e.onResize), Object.assign({
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
        handleFocusin: W,
        handleFocusout: H,
        handleKeyUp: _,
        handleKeyDown: C,
        handleMouseDown: $,
        handleVirtualListResize: w,
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
          y(ls, { clsPrefix: t, strokeWidth: 20 })
        ) : this.empty ? y("div", { class: `${t}-base-select-menu__empty`, "data-empty": !0 }, Wn(e.empty, () => [
          y(Ib, { theme: r.peers.Empty, themeOverrides: r.peerOverrides.Empty })
        ])) : y(_b, { ref: "scrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, scrollable: this.scrollable, container: o ? this.virtualListContainer : void 0, content: o ? this.virtualListContent : void 0, onScroll: o ? void 0 : this.doScroll }, {
          default: () => o ? y(Bu, { ref: "virtualListRef", class: `${t}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: !1, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: !0 }, {
            default: ({ item: l }) => l.isGroup ? y(Cl, { key: l.key, clsPrefix: t, tmNode: l }) : l.ignored ? null : y(bl, { clsPrefix: t, key: l.key, tmNode: l })
          }) : y("div", { class: `${t}-base-select-menu-option-wrapper`, style: {
            paddingTop: this.padding.top,
            paddingBottom: this.padding.bottom
          } }, this.flattenedNodes.map((l) => l.isGroup ? y(Cl, { key: l.key, clsPrefix: t, tmNode: l }) : y(bl, { clsPrefix: t, key: l.key, tmNode: l })))
        }),
        pt(e.action, (l) => l && [
          y("div", { class: `${t}-base-select-menu__action`, "data-action": !0, key: "action" }, l),
          y(Fm, { onFocus: this.onTabOut, key: "focus-detector" })
        ])
      );
    }
  }), Wb = {
    space: "6px",
    spaceArrow: "10px",
    arrowOffset: "10px",
    arrowOffsetVertical: "10px",
    arrowHeight: "6px",
    padding: "8px 14px"
  }, bs = (e) => {
    const { boxShadow2: o, popoverColor: t, textColor2: r, borderRadius: n, fontSize: i, dividerColor: l } = e;
    return Object.assign(Object.assign({}, Wb), {
      fontSize: i,
      borderRadius: n,
      color: t,
      dividerColor: l,
      textColor: r,
      boxShadow: o
    });
  }, Nb = {
    name: "Popover",
    common: yo,
    self: bs
  }, ii = Nb, jb = {
    name: "Popover",
    common: A,
    self: bs
  }, Qo = jb, an = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, ge = "var(--n-arrow-height) * 1.414", Vb = U([Q("popover", `
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
 `)]), qe("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [qe("scrollable", [qe("show-header-or-footer", "padding: var(--n-padding);")])]), Y("header", `
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
 left: calc(${po("top-start")} - var(--v-offset-left));
 `), We("top", `
 top: calc(${ge} / -2);
 transform: translateX(calc(${ge} / -2)) rotate(45deg);
 left: 50%;
 `), We("top-end", `
 top: calc(${ge} / -2);
 right: calc(${po("top-end")} + var(--v-offset-left));
 `), We("bottom-start", `
 bottom: calc(${ge} / -2);
 left: calc(${po("bottom-start")} - var(--v-offset-left));
 `), We("bottom", `
 bottom: calc(${ge} / -2);
 transform: translateX(calc(${ge} / -2)) rotate(45deg);
 left: 50%;
 `), We("bottom-end", `
 bottom: calc(${ge} / -2);
 right: calc(${po("bottom-end")} + var(--v-offset-left));
 `), We("left-start", `
 left: calc(${ge} / -2);
 top: calc(${po("left-start")} - var(--v-offset-top));
 `), We("left", `
 left: calc(${ge} / -2);
 transform: translateY(calc(${ge} / -2)) rotate(45deg);
 top: 50%;
 `), We("left-end", `
 left: calc(${ge} / -2);
 bottom: calc(${po("left-end")} + var(--v-offset-top));
 `), We("right-start", `
 right: calc(${ge} / -2);
 top: calc(${po("right-start")} - var(--v-offset-top));
 `), We("right", `
 right: calc(${ge} / -2);
 transform: translateY(calc(${ge} / -2)) rotate(45deg);
 top: 50%;
 `), We("right-end", `
 right: calc(${ge} / -2);
 bottom: calc(${po("right-end")} + var(--v-offset-top));
 `), ...Ag({
    top: ["right-start", "left-start"],
    right: ["top-end", "bottom-end"],
    bottom: ["right-end", "left-end"],
    left: ["top-start", "bottom-start"]
  }, (e, o) => {
    const t = ["right", "left"].includes(o), r = t ? "width" : "height";
    return e.map((n) => {
      const i = n.split("-")[1] === "end", a = `calc((${`var(--v-target-${r}, 0px)`} - ${ge}) / 2)`, s = po(n);
      return U(`[v-placement="${n}"] >`, [Q("popover-shared", [ae("center-arrow", [Q("popover-arrow", `${o}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${t ? "left" : "top"}));`)])])]);
    });
  })]);
  function po(e) {
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
 `), kd("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${t}: 100%;
 ${an[t]}: auto;
 ${r}
 `, [Q("popover-arrow", o)])])]);
  }
  const Cs = Object.assign(Object.assign({}, ve.props), {
    to: mo.propTo,
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
  }), Ub = ({ arrowStyle: e, clsPrefix: o }) => y(
    "div",
    { key: "__popover-arrow__", class: `${o}-popover-arrow-wrapper` },
    y("div", { class: `${o}-popover-arrow`, style: e })
  ), Gb = ie({
    name: "PopoverBody",
    inheritAttrs: !1,
    props: Cs,
    setup(e, { slots: o, attrs: t }) {
      const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = $t(e), l = ve("Popover", "-popover", Vb, ii, e, n), a = F(null), s = he("NPopover"), c = F(null), u = F(e.show), f = F(!1);
      vo(() => {
        const { show: C } = e;
        C && !Od() && !e.internalDeactivateImmediately && (f.value = !0);
      });
      const v = E(() => {
        const { trigger: C, onClickoutside: $ } = e, S = [], { positionManuallyRef: { value: x } } = s;
        return x || (C === "click" && !$ && S.push([
          Cr,
          I,
          void 0,
          { capture: !0 }
        ]), C === "hover" && S.push([Yd, O])), $ && S.push([
          Cr,
          I,
          void 0,
          { capture: !0 }
        ]), (e.displayDirective === "show" || e.animated && f.value) && S.push([kl, e.show]), S;
      }), p = E(() => {
        const C = e.width === "trigger" ? void 0 : fr(e.width), $ = [];
        C && $.push({ width: C });
        const { maxWidth: S, minWidth: x } = e;
        return S && $.push({ maxWidth: fr(S) }), x && $.push({ maxWidth: fr(x) }), i || $.push(d.value), $;
      }), d = E(() => {
        const { common: { cubicBezierEaseInOut: C, cubicBezierEaseIn: $, cubicBezierEaseOut: S }, self: { space: x, spaceArrow: P, padding: z, fontSize: W, textColor: H, dividerColor: N, color: G, boxShadow: V, borderRadius: oe, arrowHeight: k, arrowOffset: L, arrowOffsetVertical: re } } = l.value;
        return {
          "--n-box-shadow": V,
          "--n-bezier": C,
          "--n-bezier-ease-in": $,
          "--n-bezier-ease-out": S,
          "--n-font-size": W,
          "--n-text-color": H,
          "--n-color": G,
          "--n-divider-color": N,
          "--n-border-radius": oe,
          "--n-arrow-height": k,
          "--n-arrow-offset": L,
          "--n-arrow-offset-vertical": re,
          "--n-padding": z,
          "--n-space": x,
          "--n-space-arrow": P
        };
      }), m = i ? _o("popover", void 0, d, e) : void 0;
      s.setBodyInstance({
        syncPosition: b
      }), Ze(() => {
        s.setBodyInstance(null);
      }), ye(se(e, "show"), (C) => {
        e.animated || (C ? u.value = !0 : u.value = !1);
      });
      function b() {
        var C;
        (C = a.value) === null || C === void 0 || C.syncPosition();
      }
      function h(C) {
        e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(C);
      }
      function w(C) {
        e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(C);
      }
      function O(C) {
        e.trigger === "hover" && !M().contains(Nt(C)) && s.handleMouseMoveOutside(C);
      }
      function I(C) {
        (e.trigger === "click" && !M().contains(Nt(C)) || e.onClickoutside) && s.handleClickOutside(C);
      }
      function M() {
        return s.getTriggerElement();
      }
      to(la, c), to(ia, null), to(na, null);
      function _() {
        if (m == null || m.onRender(), !(e.displayDirective === "show" || e.show || e.animated && f.value))
          return null;
        let $;
        const S = s.internalRenderBodyRef.value, { value: x } = n;
        if (S)
          $ = S(
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
            w
          );
        else {
          const { value: P } = s.extraClassRef, { internalTrapFocus: z } = e, W = !mi(o.header) || !mi(o.footer), H = () => {
            var N;
            const G = W ? y(
              oo,
              null,
              pt(o.header, (k) => k ? y("div", { class: `${x}-popover__header`, style: e.headerStyle }, k) : null),
              pt(o.default, (k) => k ? y("div", { class: `${x}-popover__content`, style: e.contentStyle }, o) : null),
              pt(o.footer, (k) => k ? y("div", { class: `${x}-popover__footer`, style: e.footerStyle }, k) : null)
            ) : e.scrollable ? (N = o.default) === null || N === void 0 ? void 0 : N.call(o) : y("div", { class: `${x}-popover__content`, style: e.contentStyle }, o), V = e.scrollable ? y(Db, { contentClass: W ? void 0 : `${x}-popover__content`, contentStyle: W ? void 0 : e.contentStyle }, {
              default: () => G
            }) : G, oe = e.showArrow ? Ub({
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
            onMouseleave: w
          }, t), z ? y(Fu, { active: e.show, autoFocus: !0 }, { default: H }) : H());
        }
        return Xt($, v.value);
      }
      return {
        displayed: f,
        namespace: r,
        isMounted: s.isMountedRef,
        zIndex: s.zIndexRef,
        followerRef: a,
        adjustedTo: mo(e),
        followerEnabled: u,
        renderContentNode: _
      };
    },
    render() {
      return y(pa, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === mo.tdkey }, {
        default: () => this.animated ? y(Ct, {
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
  }), Kb = Object.keys(Cs), Xb = {
    focus: ["onFocus", "onBlur"],
    click: ["onClick"],
    hover: ["onMouseenter", "onMouseleave"],
    manual: [],
    nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
  };
  function Yb(e, o, t) {
    Xb[o].forEach((r) => {
      e.props ? e.props = Object.assign({}, e.props) : e.props = {};
      const n = e.props[r], i = t[r];
      n ? e.props[r] = (...l) => {
        n(...l), i(...l);
      } : e.props[r] = i;
    });
  }
  const qb = bt("").type, xs = {
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
    to: mo.propTo,
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
  }, Jb = Object.assign(Object.assign(Object.assign({}, ve.props), xs), { internalOnAfterLeave: Function, internalRenderBody: Function }), ys = ie({
    name: "Popover",
    inheritAttrs: !1,
    props: Jb,
    __popover__: !0,
    setup(e) {
      process.env.NODE_ENV !== "production" && vo(() => {
        e.maxWidth !== void 0 && zo("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && zo("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && zo("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && zo("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && zo("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
      });
      const o = Dr(), t = F(null), r = E(() => e.show), n = F(e.defaultShow), i = xn(r, n), l = Je(() => e.disabled ? !1 : i.value), a = () => {
        if (e.disabled)
          return !0;
        const { getDisabled: H } = e;
        return !!(H != null && H());
      }, s = () => a() ? !1 : i.value, c = ta(e, ["arrow", "showArrow"]), u = E(() => e.overlap ? !1 : c.value);
      let f = null;
      const v = F(null), p = F(null), d = Je(() => e.x !== void 0 && e.y !== void 0);
      function m(H) {
        const { "onUpdate:show": N, onUpdateShow: G, onShow: V, onHide: oe } = e;
        n.value = H, N && we(N, H), G && we(G, H), H && V && we(V, !0), H && oe && we(oe, !1);
      }
      function b() {
        f && f.syncPosition();
      }
      function h() {
        const { value: H } = v;
        H && (window.clearTimeout(H), v.value = null);
      }
      function w() {
        const { value: H } = p;
        H && (window.clearTimeout(H), p.value = null);
      }
      function O() {
        const H = a();
        if (e.trigger === "focus" && !H) {
          if (s())
            return;
          m(!0);
        }
      }
      function I() {
        const H = a();
        if (e.trigger === "focus" && !H) {
          if (!s())
            return;
          m(!1);
        }
      }
      function M() {
        const H = a();
        if (e.trigger === "hover" && !H) {
          if (w(), v.value !== null || s())
            return;
          const N = () => {
            m(!0), v.value = null;
          }, { delay: G } = e;
          G === 0 ? N() : v.value = window.setTimeout(N, G);
        }
      }
      function _() {
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
      function C() {
        _();
      }
      function $(H) {
        var N;
        s() && (e.trigger === "click" && (h(), w(), m(!1)), (N = e.onClickoutside) === null || N === void 0 || N.call(e, H));
      }
      function S() {
        if (e.trigger === "click" && !a()) {
          h(), w();
          const H = !s();
          m(H);
        }
      }
      function x(H) {
        e.internalTrapFocus && H.key === "Escape" && (h(), w(), m(!1));
      }
      function P(H) {
        n.value = H;
      }
      function z() {
        var H;
        return (H = t.value) === null || H === void 0 ? void 0 : H.targetRef;
      }
      function W(H) {
        f = H;
      }
      return to("NPopover", {
        getTriggerElement: z,
        handleKeydown: x,
        handleMouseEnter: M,
        handleMouseLeave: _,
        handleClickOutside: $,
        handleMouseMoveOutside: C,
        setBodyInstance: W,
        positionManuallyRef: d,
        isMountedRef: o,
        zIndexRef: se(e, "zIndex"),
        extraClassRef: se(e, "internalExtraClass"),
        internalRenderBodyRef: se(e, "internalRenderBody")
      }), vo(() => {
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
        handleClick: S,
        handleMouseEnter: M,
        handleMouseLeave: _,
        handleFocus: O,
        handleBlur: I,
        syncPosition: b
      };
    },
    render() {
      var e;
      const { positionManually: o, $slots: t } = this;
      let r, n = !1;
      if (!o && (t.activator ? r = gi(t, "activator") : r = gi(t, "trigger"), r)) {
        r = xc(r), r = r.type === qb ? y("span", [r]) : r;
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
          Yb(r, l ? "nested" : o ? "manual" : this.trigger, s);
        }
      }
      return y(da, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
        default: () => {
          this.mergedShowConsideringDisabledProp;
          const i = this.getMergedShow();
          return [
            this.internalTrapFocus && i ? Xt(y("div", { style: { position: "fixed", inset: 0 } }), [
              [
                fa,
                {
                  enabled: i,
                  zIndex: this.zIndex
                }
              ]
            ]) : null,
            o ? null : y(ua, null, {
              default: () => r
            }),
            y(Gb, ld(this.$props, Kb, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
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
  }), Ss = {
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
  }, Zb = {
    name: "Tag",
    common: A,
    self(e) {
      const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, tagColor: f, opacityDisabled: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: m, closeColorHover: b, closeColorPressed: h, borderRadiusSmall: w, fontSizeMini: O, fontSizeTiny: I, fontSizeSmall: M, fontSizeMedium: _, heightMini: C, heightTiny: $, heightSmall: S, heightMedium: x, buttonColor2Hover: P, buttonColor2Pressed: z, fontWeightStrong: W } = e;
      return Object.assign(Object.assign({}, Ss), {
        closeBorderRadius: w,
        heightTiny: C,
        heightSmall: $,
        heightMedium: S,
        heightLarge: x,
        borderRadius: w,
        opacityDisabled: v,
        fontSizeTiny: O,
        fontSizeSmall: I,
        fontSizeMedium: M,
        fontSizeLarge: _,
        fontWeightStrong: W,
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
        closeIconColorPressed: m,
        closeColorHover: b,
        closeColorPressed: h,
        borderPrimary: `1px solid ${D(n, { alpha: 0.3 })}`,
        textColorPrimary: n,
        colorPrimary: D(n, { alpha: 0.16 }),
        colorBorderedPrimary: "#0000",
        closeIconColorPrimary: pe(n, { lightness: 0.7 }),
        closeIconColorHoverPrimary: pe(n, { lightness: 0.7 }),
        closeIconColorPressedPrimary: pe(n, {
          lightness: 0.7
        }),
        closeColorHoverPrimary: D(n, { alpha: 0.16 }),
        closeColorPressedPrimary: D(n, { alpha: 0.12 }),
        borderInfo: `1px solid ${D(i, { alpha: 0.3 })}`,
        textColorInfo: i,
        colorInfo: D(i, { alpha: 0.16 }),
        colorBorderedInfo: "#0000",
        closeIconColorInfo: pe(i, { alpha: 0.7 }),
        closeIconColorHoverInfo: pe(i, { alpha: 0.7 }),
        closeIconColorPressedInfo: pe(i, { alpha: 0.7 }),
        closeColorHoverInfo: D(i, { alpha: 0.16 }),
        closeColorPressedInfo: D(i, { alpha: 0.12 }),
        borderSuccess: `1px solid ${D(l, { alpha: 0.3 })}`,
        textColorSuccess: l,
        colorSuccess: D(l, { alpha: 0.16 }),
        colorBorderedSuccess: "#0000",
        closeIconColorSuccess: pe(l, { alpha: 0.7 }),
        closeIconColorHoverSuccess: pe(l, { alpha: 0.7 }),
        closeIconColorPressedSuccess: pe(l, { alpha: 0.7 }),
        closeColorHoverSuccess: D(l, { alpha: 0.16 }),
        closeColorPressedSuccess: D(l, { alpha: 0.12 }),
        borderWarning: `1px solid ${D(a, { alpha: 0.3 })}`,
        textColorWarning: a,
        colorWarning: D(a, { alpha: 0.16 }),
        colorBorderedWarning: "#0000",
        closeIconColorWarning: pe(a, { alpha: 0.7 }),
        closeIconColorHoverWarning: pe(a, { alpha: 0.7 }),
        closeIconColorPressedWarning: pe(a, { alpha: 0.7 }),
        closeColorHoverWarning: D(a, { alpha: 0.16 }),
        closeColorPressedWarning: D(a, { alpha: 0.11 }),
        borderError: `1px solid ${D(s, { alpha: 0.3 })}`,
        textColorError: s,
        colorError: D(s, { alpha: 0.16 }),
        colorBorderedError: "#0000",
        closeIconColorError: pe(s, { alpha: 0.7 }),
        closeIconColorHoverError: pe(s, { alpha: 0.7 }),
        closeIconColorPressedError: pe(s, { alpha: 0.7 }),
        closeColorHoverError: D(s, { alpha: 0.16 }),
        closeColorPressedError: D(s, { alpha: 0.12 })
      });
    }
  }, ws = Zb, Qb = (e) => {
    const { textColor2: o, primaryColorHover: t, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: l, warningColor: a, errorColor: s, baseColor: c, borderColor: u, opacityDisabled: f, tagColor: v, closeIconColor: p, closeIconColorHover: d, closeIconColorPressed: m, borderRadiusSmall: b, fontSizeMini: h, fontSizeTiny: w, fontSizeSmall: O, fontSizeMedium: I, heightMini: M, heightTiny: _, heightSmall: C, heightMedium: $, closeColorHover: S, closeColorPressed: x, buttonColor2Hover: P, buttonColor2Pressed: z, fontWeightStrong: W } = e;
    return Object.assign(Object.assign({}, Ss), {
      closeBorderRadius: b,
      heightTiny: M,
      heightSmall: _,
      heightMedium: C,
      heightLarge: $,
      borderRadius: b,
      opacityDisabled: f,
      fontSizeTiny: h,
      fontSizeSmall: w,
      fontSizeMedium: O,
      fontSizeLarge: I,
      fontWeightStrong: W,
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
      closeIconColorPressed: m,
      closeColorHover: S,
      closeColorPressed: x,
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
  }, e0 = {
    name: "Tag",
    common: yo,
    self: Qb
  }, o0 = e0, t0 = {
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
  }, r0 = Q("tag", `
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
 `, [qe("disabled", [U("&:hover", "background-color: var(--n-color-hover-checkable);", [qe("checked", "color: var(--n-text-color-hover-checkable);")]), U("&:active", "background-color: var(--n-color-pressed-checkable);", [qe("checked", "color: var(--n-text-color-pressed-checkable);")])]), ae("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [qe("disabled", [U("&:hover", "background-color: var(--n-color-checked-hover);"), U("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), n0 = Object.assign(Object.assign(Object.assign({}, ve.props), t0), {
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
  }), i0 = "n-tag", sn = ie({
    name: "Tag",
    props: n0,
    setup(e) {
      process.env.NODE_ENV !== "production" && vo(() => {
        e.onCheckedChange !== void 0 && zo("tag", "`on-checked-change` is deprecated, please use `on-update:checked` instead");
      });
      const o = F(null), { mergedBorderedRef: t, mergedClsPrefixRef: r, inlineThemeDisabled: n, mergedRtlRef: i } = $t(e), l = ve("Tag", "-tag", r0, o0, e, r);
      to(i0, {
        roundRef: se(e, "round")
      });
      function a(p) {
        if (!e.disabled && e.checkable) {
          const { checked: d, onCheckedChange: m, onUpdateChecked: b, "onUpdate:checked": h } = e;
          b && b(!d), h && h(!d), m && m(!d);
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
      }, u = rs("Tag", i, r), f = E(() => {
        const { type: p, size: d, color: { color: m, textColor: b } = {} } = e, { common: { cubicBezierEaseInOut: h }, self: { padding: w, closeMargin: O, closeMarginRtl: I, borderRadius: M, opacityDisabled: _, textColorCheckable: C, textColorHoverCheckable: $, textColorPressedCheckable: S, textColorChecked: x, colorCheckable: P, colorHoverCheckable: z, colorPressedCheckable: W, colorChecked: H, colorCheckedHover: N, colorCheckedPressed: G, closeBorderRadius: V, fontWeightStrong: oe, [fe("colorBordered", p)]: k, [fe("closeSize", d)]: L, [fe("closeIconSize", d)]: re, [fe("fontSize", d)]: ue, [fe("height", d)]: ze, [fe("color", p)]: lo, [fe("textColor", p)]: Te, [fe("border", p)]: Qe, [fe("closeIconColor", p)]: Ae, [fe("closeIconColorHover", p)]: De, [fe("closeIconColorPressed", p)]: xe, [fe("closeColorHover", p)]: Ge, [fe("closeColorPressed", p)]: Re } } = l.value;
        return {
          "--n-font-weight-strong": oe,
          "--n-avatar-size-override": `calc(${ze} - 8px)`,
          "--n-bezier": h,
          "--n-border-radius": M,
          "--n-border": Qe,
          "--n-close-icon-size": re,
          "--n-close-color-pressed": Re,
          "--n-close-color-hover": Ge,
          "--n-close-border-radius": V,
          "--n-close-icon-color": Ae,
          "--n-close-icon-color-hover": De,
          "--n-close-icon-color-pressed": xe,
          "--n-close-icon-color-disabled": Ae,
          "--n-close-margin": O,
          "--n-close-margin-rtl": I,
          "--n-close-size": L,
          "--n-color": m || (t.value ? k : lo),
          "--n-color-checkable": P,
          "--n-color-checked": H,
          "--n-color-checked-hover": N,
          "--n-color-checked-pressed": G,
          "--n-color-hover-checkable": z,
          "--n-color-pressed-checkable": W,
          "--n-font-size": ue,
          "--n-height": ze,
          "--n-opacity-disabled": _,
          "--n-padding": w,
          "--n-text-color": b || Te,
          "--n-text-color-checkable": C,
          "--n-text-color-checked": x,
          "--n-text-color-hover-checkable": $,
          "--n-text-color-pressed-checkable": S
        };
      }), v = n ? _o("tag", E(() => {
        let p = "";
        const { type: d, size: m, color: { color: b, textColor: h } = {} } = e;
        return p += d[0], p += m[0], b && (p += `a${Ci(b)}`), h && (p += `b${Ci(h)}`), t.value && (p += "c"), p;
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
      const c = pt(s.avatar, (f) => f && y("div", { class: `${t}-tag__avatar` }, f)), u = pt(s.icon, (f) => f && y("div", { class: `${t}-tag__icon` }, f));
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
        !this.checkable && n ? y(Rm, { clsPrefix: t, class: `${t}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: l, isButtonTag: this.internalCloseIsButtonTag, absolute: !0 }) : null,
        !this.checkable && this.mergedBordered ? y("div", { class: `${t}-tag__border`, style: { borderColor: i } }) : null
      );
    }
  }), l0 = Q("base-clear", `
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
 `, [En({
    originalTransform: "translateX(-50%) translateY(-50%)",
    left: "50%",
    top: "50%"
  })])])]), a0 = ie({
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
      return Rr("-base-clear", l0, se(e, "clsPrefix")), {
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
        y(is, null, {
          default: () => {
            var o, t;
            return this.show ? y("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Wn(this.$slots.icon, () => [
              y(qt, { clsPrefix: e }, {
                default: () => y(Hm, null)
              })
            ])) : y("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (t = (o = this.$slots).placeholder) === null || t === void 0 ? void 0 : t.call(o));
          }
        })
      );
    }
  }), s0 = ie({
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
        return y(ls, { clsPrefix: t, class: `${t}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
          default: () => e.showArrow ? y(a0, { clsPrefix: t, show: e.showClear, onClear: e.onClear }, {
            placeholder: () => y(qt, { clsPrefix: t, class: `${t}-base-suffix__arrow` }, {
              default: () => Wn(o.default, () => [
                y(Dm, null)
              ])
            })
          }) : null
        });
      };
    }
  }), $s = {
    paddingSingle: "0 26px 0 12px",
    paddingMultiple: "3px 26px 0 12px",
    clearSize: "16px",
    arrowSize: "16px"
  }, c0 = (e) => {
    const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderColor: v, iconColor: p, iconColorDisabled: d, clearColor: m, clearColorHover: b, clearColorPressed: h, placeholderColor: w, placeholderColorDisabled: O, fontSizeTiny: I, fontSizeSmall: M, fontSizeMedium: _, fontSizeLarge: C, heightTiny: $, heightSmall: S, heightMedium: x, heightLarge: P } = e;
    return Object.assign(Object.assign({}, $s), {
      fontSizeTiny: I,
      fontSizeSmall: M,
      fontSizeMedium: _,
      fontSizeLarge: C,
      heightTiny: $,
      heightSmall: S,
      heightMedium: x,
      heightLarge: P,
      borderRadius: o,
      // default
      textColor: t,
      textColorDisabled: r,
      placeholderColor: w,
      placeholderColorDisabled: O,
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
      clearColor: m,
      clearColorHover: b,
      clearColorPressed: h
    });
  }, d0 = {
    name: "InternalSelection",
    common: yo,
    peers: {
      Popover: ii
    },
    self: c0
  }, Ps = d0, u0 = {
    name: "InternalSelection",
    common: A,
    peers: {
      Popover: Qo
    },
    self(e) {
      const { borderRadius: o, textColor2: t, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: l, primaryColorHover: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, iconColor: v, iconColorDisabled: p, clearColor: d, clearColorHover: m, clearColorPressed: b, placeholderColor: h, placeholderColorDisabled: w, fontSizeTiny: O, fontSizeSmall: I, fontSizeMedium: M, fontSizeLarge: _, heightTiny: C, heightSmall: $, heightMedium: S, heightLarge: x } = e;
      return Object.assign(Object.assign({}, $s), {
        fontSizeTiny: O,
        fontSizeSmall: I,
        fontSizeMedium: M,
        fontSizeLarge: _,
        heightTiny: C,
        heightSmall: $,
        heightMedium: S,
        heightLarge: x,
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
        clearColorHover: m,
        clearColorPressed: b
      });
    }
  }, li = u0, f0 = U([Q("base-selection", `
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
 `)]), qe("disabled", [U("&:hover", [Y("state-border", `
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
 `)]), ["warning", "error"].map((e) => ae(`${e}-status`, [Y("state-border", `border: var(--n-border-${e});`), qe("disabled", [U("&:hover", [Y("state-border", `
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
 `)])])]), h0 = ie({
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
      const o = F(null), t = F(null), r = F(null), n = F(null), i = F(null), l = F(null), a = F(null), s = F(null), c = F(null), u = F(null), f = F(!1), v = F(!1), p = F(!1), d = ve("InternalSelection", "-internal-selection", f0, Ps, e, se(e, "clsPrefix")), m = E(() => e.clearable && !e.disabled && (p.value || e.active)), b = E(() => e.selectedOption ? e.renderTag ? e.renderTag({
        option: e.selectedOption,
        handleClose: () => {
        }
      }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : ht(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), h = E(() => {
        const R = e.selectedOption;
        if (R)
          return R[e.labelField];
      }), w = E(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
      function O() {
        var R;
        const { value: K } = o;
        if (K) {
          const { value: ce } = t;
          ce && (ce.style.width = `${K.offsetWidth}px`, e.maxTagCount !== "responsive" && ((R = c.value) === null || R === void 0 || R.sync()));
        }
      }
      function I() {
        const { value: R } = u;
        R && (R.style.display = "none");
      }
      function M() {
        const { value: R } = u;
        R && (R.style.display = "inline-block");
      }
      ye(se(e, "active"), (R) => {
        R || I();
      }), ye(se(e, "pattern"), () => {
        e.multiple && mt(O);
      });
      function _(R) {
        const { onFocus: K } = e;
        K && K(R);
      }
      function C(R) {
        const { onBlur: K } = e;
        K && K(R);
      }
      function $(R) {
        const { onDeleteOption: K } = e;
        K && K(R);
      }
      function S(R) {
        const { onClear: K } = e;
        K && K(R);
      }
      function x(R) {
        const { onPatternInput: K } = e;
        K && K(R);
      }
      function P(R) {
        var K;
        (!R.relatedTarget || !(!((K = r.value) === null || K === void 0) && K.contains(R.relatedTarget))) && _(R);
      }
      function z(R) {
        var K;
        !((K = r.value) === null || K === void 0) && K.contains(R.relatedTarget) || C(R);
      }
      function W(R) {
        S(R);
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
          K.textContent = ce, O();
        }
        e.ignoreComposition && k.value ? L = R : x(R);
      }
      function ue() {
        k.value = !0;
      }
      function ze() {
        k.value = !1, e.ignoreComposition && x(L), L = null;
      }
      function lo(R) {
        var K;
        v.value = !0, (K = e.onPatternFocus) === null || K === void 0 || K.call(e, R);
      }
      function Te(R) {
        var K;
        v.value = !1, (K = e.onPatternBlur) === null || K === void 0 || K.call(e, R);
      }
      function Qe() {
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
        R && (M(), R.focus());
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
      let ao = null;
      function so() {
        ao !== null && window.clearTimeout(ao);
      }
      function co() {
        e.disabled || e.active || (so(), ao = window.setTimeout(() => {
          w.value && (f.value = !0);
        }, 100));
      }
      function Do() {
        so();
      }
      function Ho(R) {
        R || (so(), f.value = !1);
      }
      ye(w, (R) => {
        R || (f.value = !1);
      }), Ve(() => {
        vo(() => {
          const R = l.value;
          R && (R.tabIndex = e.disabled || v.value ? -1 : 0);
        });
      }), Pa(r, e.onResize);
      const { inlineThemeDisabled: So } = e, wo = E(() => {
        const { size: R } = e, { common: { cubicBezierEaseInOut: K }, self: {
          borderRadius: ce,
          color: Le,
          placeholderColor: et,
          textColor: Tt,
          paddingSingle: ot,
          paddingMultiple: tt,
          caretColor: rt,
          colorDisabled: $o,
          textColorDisabled: Po,
          placeholderColorDisabled: It,
          colorActive: nt,
          boxShadowFocus: Ke,
          boxShadowActive: uo,
          boxShadowHover: g,
          border: T,
          borderFocus: B,
          borderHover: X,
          borderActive: q,
          arrowColor: ee,
          arrowColorDisabled: te,
          loadingColor: ne,
          // form warning
          colorActiveWarning: ke,
          boxShadowFocusWarning: fo,
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
          "--n-border": T,
          "--n-border-active": q,
          "--n-border-focus": B,
          "--n-border-hover": X,
          "--n-border-radius": ce,
          "--n-box-shadow-active": uo,
          "--n-box-shadow-focus": Ke,
          "--n-box-shadow-hover": g,
          "--n-caret-color": rt,
          "--n-color": Le,
          "--n-color-active": nt,
          "--n-color-disabled": $o,
          "--n-font-size": fc,
          "--n-height": uc,
          "--n-padding-single": ot,
          "--n-padding-multiple": tt,
          "--n-placeholder-color": et,
          "--n-placeholder-color-disabled": It,
          "--n-text-color": Tt,
          "--n-text-color-disabled": Po,
          "--n-arrow-color": ee,
          "--n-arrow-color-disabled": te,
          "--n-loading-color": ne,
          // form warning
          "--n-color-active-warning": ke,
          "--n-box-shadow-focus-warning": fo,
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
      }), Me = So ? _o("internal-selection", E(() => e.size[0]), wo, e) : void 0;
      return {
        mergedTheme: d,
        mergedClearable: m,
        patternInputFocused: v,
        filterablePlaceholder: b,
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
        handleMouseDown: G,
        handleFocusin: P,
        handleClear: W,
        handleMouseEnter: H,
        handleMouseLeave: N,
        handleDeleteOption: V,
        handlePatternKeyDown: oe,
        handlePatternInputInput: re,
        handlePatternInputBlur: Te,
        handlePatternInputFocus: lo,
        handleMouseEnterCounter: co,
        handleMouseLeaveCounter: Do,
        handleFocusout: z,
        handleCompositionEnd: ze,
        handleCompositionStart: ue,
        onPopoverUpdateShow: Ho,
        focus: Ae,
        focusInput: De,
        blur: Qe,
        blurInput: xe,
        updateCounter: Ge,
        getCounter: Re,
        getTail: Fe,
        renderLabel: e.renderLabel,
        cssVars: So ? void 0 : wo,
        themeClass: Me == null ? void 0 : Me.themeClass,
        onRender: Me == null ? void 0 : Me.onRender
      };
    },
    render() {
      const { status: e, multiple: o, size: t, disabled: r, filterable: n, maxTagCount: i, bordered: l, clsPrefix: a, onRender: s, renderTag: c, renderLabel: u } = this;
      s == null || s();
      const f = i === "responsive", v = typeof i == "number", p = f || v, d = y(bn, null, {
        default: () => y(s0, { clsPrefix: a, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
          default: () => {
            var b, h;
            return (h = (b = this.$slots).arrow) === null || h === void 0 ? void 0 : h.call(b);
          }
        })
      });
      let m;
      if (o) {
        const { labelField: b } = this, h = (z) => y("div", { class: `${a}-base-selection-tag-wrapper`, key: z.value }, c ? c({
          option: z,
          handleClose: () => this.handleDeleteOption(z)
        }) : y(sn, { size: t, closable: !z.disabled, disabled: r, onClose: () => this.handleDeleteOption(z), internalCloseIsButtonTag: !1, internalCloseFocusable: !1 }, {
          default: () => u ? u(z, !0) : ht(z[b], z, !0)
        })), w = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(h), O = n ? y(
          "div",
          { class: `${a}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
          y("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: r, value: this.pattern, autofocus: this.autofocus, class: `${a}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          y("span", { ref: "patternInputMirrorRef", class: `${a}-base-selection-input-tag__mirror` }, this.pattern)
        ) : null, I = f ? () => y(
          "div",
          { class: `${a}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
          y(sn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: r })
        ) : void 0;
        let M;
        if (v) {
          const z = this.selectedOptions.length - i;
          z > 0 && (M = y(
            "div",
            { class: `${a}-base-selection-tag-wrapper`, key: "__counter__" },
            y(sn, { size: t, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: r }, {
              default: () => `+${z}`
            })
          ));
        }
        const _ = f ? n ? y(Li, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: w,
          counter: I,
          tail: () => O
        }) : y(Li, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        } }, {
          default: w,
          counter: I
        }) : v ? w().concat(M) : w(), C = p ? () => y("div", { class: `${a}-base-selection-popover` }, f ? w() : this.selectedOptions.map(h)) : void 0, $ = p ? {
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
          _,
          f ? null : O,
          d
        ) : y(
          "div",
          { ref: "multipleElRef", class: `${a}-base-selection-tags`, tabindex: r ? void 0 : 0 },
          _,
          d
        );
        m = y(
          oo,
          null,
          p ? y(ys, Object.assign({}, $, { scrollable: !0, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
            trigger: () => P,
            default: C
          }) : P,
          x
        );
      } else if (n) {
        const b = this.pattern || this.isComposing, h = this.active ? !b : !this.selected, w = this.active ? !1 : this.selected;
        m = y(
          "div",
          { ref: "patternInputWrapperRef", class: `${a}-base-selection-label` },
          y("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${a}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: r, disabled: r, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
          w ? y(
            "div",
            { class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`, key: "input" },
            y("div", { class: `${a}-base-selection-overlay__wrapper` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : ht(this.label, this.selectedOption, !0))
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
            { class: `${a}-base-selection-input`, title: ad(this.label), key: "input" },
            y("div", { class: `${a}-base-selection-input__content` }, c ? c({
              option: this.selectedOption,
              handleClose: () => {
              }
            }) : u ? u(this.selectedOption, !0) : ht(this.label, this.selectedOption, !0))
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
  }), p0 = {
    iconMargin: "11px 8px 0 12px",
    iconMarginRtl: "11px 12px 0 8px",
    iconSize: "24px",
    closeIconSize: "16px",
    closeSize: "20px",
    closeMargin: "13px 14px 0 0",
    closeMarginRtl: "13px 0 0 14px",
    padding: "13px"
  }, v0 = {
    name: "Alert",
    common: A,
    self(e) {
      const { lineHeight: o, borderRadius: t, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: l, textColor2: a, closeColorHover: s, closeColorPressed: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, infoColorSuppl: p, successColorSuppl: d, warningColorSuppl: m, errorColorSuppl: b, fontSize: h } = e;
      return Object.assign(Object.assign({}, p0), {
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
        borderWarning: `1px solid ${D(m, {
          alpha: 0.35
        })}`,
        colorWarning: D(m, { alpha: 0.25 }),
        titleTextColorWarning: l,
        iconColorWarning: m,
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
  }, g0 = v0, m0 = {
    linkFontSize: "13px",
    linkPadding: "0 0 0 16px",
    railWidth: "4px"
  }, b0 = (e) => {
    const { borderRadius: o, railColor: t, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: l } = e;
    return Object.assign(Object.assign({}, m0), {
      borderRadius: o,
      railColor: t,
      railColorActive: r,
      linkColor: D(r, { alpha: 0.15 }),
      linkTextColor: l,
      linkTextColorHover: n,
      linkTextColorPressed: i,
      linkTextColorActive: r
    });
  }, C0 = {
    name: "Anchor",
    common: A,
    self: b0
  }, x0 = C0;
  function zr(e) {
    return e.type === "group";
  }
  function Ts(e) {
    return e.type === "ignored";
  }
  function cn(e, o) {
    try {
      return !!(1 + o.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
    } catch {
      return !1;
    }
  }
  function y0(e, o) {
    return {
      getIsGroup: zr,
      getIgnored: Ts,
      getKey(r) {
        return zr(r) ? r.name || r.key || "key-required" : r[e];
      },
      getChildren(r) {
        return r[o];
      }
    };
  }
  function S0(e, o, t, r) {
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
          if (Ts(a))
            continue;
          o(t, a) && l.push(a);
        }
      return l;
    }
    return n(e);
  }
  function w0(e, o, t) {
    const r = /* @__PURE__ */ new Map();
    return e.forEach((n) => {
      zr(n) ? n[t].forEach((i) => {
        r.set(i[o], i);
      }) : r.set(n[o], n);
    }), r;
  }
  const $0 = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  }, P0 = {
    name: "Input",
    common: A,
    self(e) {
      const { textColor2: o, textColor3: t, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: l, inputColorDisabled: a, warningColor: s, warningColorHover: c, errorColor: u, errorColorHover: f, borderRadius: v, lineHeight: p, fontSizeTiny: d, fontSizeSmall: m, fontSizeMedium: b, fontSizeLarge: h, heightTiny: w, heightSmall: O, heightMedium: I, heightLarge: M, clearColor: _, clearColorHover: C, clearColorPressed: $, placeholderColor: S, placeholderColorDisabled: x, iconColor: P, iconColorDisabled: z, iconColorHover: W, iconColorPressed: H } = e;
      return Object.assign(Object.assign({}, $0), {
        countTextColorDisabled: r,
        countTextColor: t,
        heightTiny: w,
        heightSmall: O,
        heightMedium: I,
        heightLarge: M,
        fontSizeTiny: d,
        fontSizeSmall: m,
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
        placeholderColorDisabled: x,
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
        clearColor: _,
        clearColorHover: C,
        clearColorPressed: $,
        iconColor: P,
        iconColorDisabled: z,
        iconColorHover: W,
        iconColorPressed: H,
        suffixTextColor: o
      });
    }
  }, Ue = P0;
  function T0(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const I0 = {
    name: "AutoComplete",
    common: A,
    peers: {
      InternalSelectMenu: Jt,
      Input: Ue
    },
    self: T0
  }, z0 = I0, M0 = (e) => {
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
  }, k0 = {
    name: "Avatar",
    common: A,
    self: M0
  }, Is = k0, O0 = () => ({
    gap: "-12px"
  }), E0 = {
    name: "AvatarGroup",
    common: A,
    peers: {
      Avatar: Is
    },
    self: O0
  }, _0 = E0, D0 = {
    width: "44px",
    height: "44px",
    borderRadius: "22px",
    iconSize: "26px"
  }, H0 = {
    name: "BackTop",
    common: A,
    self(e) {
      const { popoverColor: o, textColor2: t, primaryColorHover: r, primaryColorPressed: n } = e;
      return Object.assign(Object.assign({}, D0), { color: o, textColor: t, iconColor: t, iconColorHover: r, iconColorPressed: n, boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)", boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)", boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)" });
    }
  }, B0 = H0, A0 = {
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
  }, R0 = A0, F0 = {
    fontWeightActive: "400"
  }, L0 = (e) => {
    const { fontSize: o, textColor3: t, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: l } = e;
    return Object.assign(Object.assign({}, F0), { fontSize: o, itemLineHeight: "1.25", itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: r, itemTextColorActive: r, itemBorderRadius: n, itemColorHover: i, itemColorPressed: l, separatorColor: t });
  }, W0 = {
    name: "Breadcrumb",
    common: A,
    self: L0
  }, N0 = W0, j0 = {
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
  }, V0 = (e) => {
    const { heightTiny: o, heightSmall: t, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: l, fontSizeSmall: a, fontSizeMedium: s, fontSizeLarge: c, opacityDisabled: u, textColor2: f, textColor3: v, primaryColorHover: p, primaryColorPressed: d, borderColor: m, primaryColor: b, baseColor: h, infoColor: w, infoColorHover: O, infoColorPressed: I, successColor: M, successColorHover: _, successColorPressed: C, warningColor: $, warningColorHover: S, warningColorPressed: x, errorColor: P, errorColorHover: z, errorColorPressed: W, fontWeight: H, buttonColor2: N, buttonColor2Hover: G, buttonColor2Pressed: V, fontWeightStrong: oe } = e;
    return Object.assign(Object.assign({}, j0), {
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
      colorInfo: w,
      colorHoverInfo: O,
      colorPressedInfo: I,
      colorFocusInfo: O,
      colorDisabledInfo: w,
      textColorInfo: h,
      textColorHoverInfo: h,
      textColorPressedInfo: h,
      textColorFocusInfo: h,
      textColorDisabledInfo: h,
      textColorTextInfo: w,
      textColorTextHoverInfo: O,
      textColorTextPressedInfo: I,
      textColorTextFocusInfo: O,
      textColorTextDisabledInfo: f,
      textColorGhostInfo: w,
      textColorGhostHoverInfo: O,
      textColorGhostPressedInfo: I,
      textColorGhostFocusInfo: O,
      textColorGhostDisabledInfo: w,
      borderInfo: `1px solid ${w}`,
      borderHoverInfo: `1px solid ${O}`,
      borderPressedInfo: `1px solid ${I}`,
      borderFocusInfo: `1px solid ${O}`,
      borderDisabledInfo: `1px solid ${w}`,
      rippleColorInfo: w,
      // success
      colorSuccess: M,
      colorHoverSuccess: _,
      colorPressedSuccess: C,
      colorFocusSuccess: _,
      colorDisabledSuccess: M,
      textColorSuccess: h,
      textColorHoverSuccess: h,
      textColorPressedSuccess: h,
      textColorFocusSuccess: h,
      textColorDisabledSuccess: h,
      textColorTextSuccess: M,
      textColorTextHoverSuccess: _,
      textColorTextPressedSuccess: C,
      textColorTextFocusSuccess: _,
      textColorTextDisabledSuccess: f,
      textColorGhostSuccess: M,
      textColorGhostHoverSuccess: _,
      textColorGhostPressedSuccess: C,
      textColorGhostFocusSuccess: _,
      textColorGhostDisabledSuccess: M,
      borderSuccess: `1px solid ${M}`,
      borderHoverSuccess: `1px solid ${_}`,
      borderPressedSuccess: `1px solid ${C}`,
      borderFocusSuccess: `1px solid ${_}`,
      borderDisabledSuccess: `1px solid ${M}`,
      rippleColorSuccess: M,
      // warning
      colorWarning: $,
      colorHoverWarning: S,
      colorPressedWarning: x,
      colorFocusWarning: S,
      colorDisabledWarning: $,
      textColorWarning: h,
      textColorHoverWarning: h,
      textColorPressedWarning: h,
      textColorFocusWarning: h,
      textColorDisabledWarning: h,
      textColorTextWarning: $,
      textColorTextHoverWarning: S,
      textColorTextPressedWarning: x,
      textColorTextFocusWarning: S,
      textColorTextDisabledWarning: f,
      textColorGhostWarning: $,
      textColorGhostHoverWarning: S,
      textColorGhostPressedWarning: x,
      textColorGhostFocusWarning: S,
      textColorGhostDisabledWarning: $,
      borderWarning: `1px solid ${$}`,
      borderHoverWarning: `1px solid ${S}`,
      borderPressedWarning: `1px solid ${x}`,
      borderFocusWarning: `1px solid ${S}`,
      borderDisabledWarning: `1px solid ${$}`,
      rippleColorWarning: $,
      // error
      colorError: P,
      colorHoverError: z,
      colorPressedError: W,
      colorFocusError: z,
      colorDisabledError: P,
      textColorError: h,
      textColorHoverError: h,
      textColorPressedError: h,
      textColorFocusError: h,
      textColorDisabledError: h,
      textColorTextError: P,
      textColorTextHoverError: z,
      textColorTextPressedError: W,
      textColorTextFocusError: z,
      textColorTextDisabledError: f,
      textColorGhostError: P,
      textColorGhostHoverError: z,
      textColorGhostPressedError: W,
      textColorGhostFocusError: z,
      textColorGhostDisabledError: P,
      borderError: `1px solid ${P}`,
      borderHoverError: `1px solid ${z}`,
      borderPressedError: `1px solid ${W}`,
      borderFocusError: `1px solid ${z}`,
      borderDisabledError: `1px solid ${P}`,
      rippleColorError: P,
      waveOpacity: "0.6",
      fontWeight: H,
      fontWeightStrong: oe
    });
  }, U0 = {
    name: "Button",
    common: A,
    self(e) {
      const o = V0(e);
      return o.waveOpacity = "0.8", o.colorOpacitySecondary = "0.16", o.colorOpacitySecondaryHover = "0.2", o.colorOpacitySecondaryPressed = "0.12", o;
    }
  }, _e = U0, G0 = {
    titleFontSize: "22px"
  }, K0 = (e) => {
    const { borderRadius: o, fontSize: t, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: l, dividerColor: a, fontWeightStrong: s, primaryColor: c, baseColor: u, hoverColor: f, cardColor: v, modalColor: p, popoverColor: d } = e;
    return Object.assign(Object.assign({}, G0), {
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
  }, X0 = {
    name: "Calendar",
    common: A,
    peers: {
      Button: _e
    },
    self: K0
  }, Y0 = X0, q0 = (e) => {
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
  }, J0 = {
    name: "ColorPicker",
    common: A,
    peers: {
      Input: Ue,
      Button: _e
    },
    self: q0
  }, Z0 = J0, Q0 = {
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
  }, eC = (e) => {
    const { primaryColor: o, borderRadius: t, lineHeight: r, fontSize: n, cardColor: i, textColor2: l, textColor1: a, dividerColor: s, fontWeightStrong: c, closeIconColor: u, closeIconColorHover: f, closeIconColorPressed: v, closeColorHover: p, closeColorPressed: d, modalColor: m, boxShadow1: b, popoverColor: h, actionColor: w } = e;
    return Object.assign(Object.assign({}, Q0), {
      lineHeight: r,
      color: i,
      colorModal: m,
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
      boxShadow: b,
      borderRadius: t
    });
  }, oC = {
    name: "Card",
    common: A,
    self(e) {
      const o = eC(e), { cardColor: t, modalColor: r, popoverColor: n } = e;
      return o.colorEmbedded = t, o.colorEmbeddedModal = r, o.colorEmbeddedPopover = n, o;
    }
  }, zs = oC, tC = (e) => ({
    dotSize: "8px",
    dotColor: "rgba(255, 255, 255, .3)",
    dotColorActive: "rgba(255, 255, 255, 1)",
    dotColorFocus: "rgba(255, 255, 255, .5)",
    dotLineWidth: "16px",
    dotLineWidthActive: "24px",
    arrowColor: "#eee"
  }), rC = {
    name: "Carousel",
    common: A,
    self: tC
  }, nC = rC, iC = {
    sizeSmall: "14px",
    sizeMedium: "16px",
    sizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, lC = (e) => {
    const { baseColor: o, inputColorDisabled: t, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: l, borderColor: a, primaryColor: s, textColor2: c, fontSizeSmall: u, fontSizeMedium: f, fontSizeLarge: v, borderRadiusSmall: p, lineHeight: d } = e;
    return Object.assign(Object.assign({}, iC), {
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
  }, aC = {
    name: "Checkbox",
    common: A,
    self(e) {
      const { cardColor: o } = e, t = lC(e);
      return t.color = "#0000", t.checkMarkColor = o, t;
    }
  }, Pt = aC, sC = (e) => {
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
  }, cC = {
    name: "Cascader",
    common: A,
    peers: {
      InternalSelectMenu: Jt,
      InternalSelection: li,
      Scrollbar: Ee,
      Checkbox: Pt,
      Empty: ni
    },
    self: sC
  }, dC = cC, uC = {
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
  }, Ms = uC, fC = (e) => {
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
  }, hC = {
    name: "Collapse",
    common: A,
    self: fC
  }, pC = hC, vC = (e) => {
    const { cubicBezierEaseInOut: o } = e;
    return {
      bezier: o
    };
  }, gC = {
    name: "CollapseTransition",
    common: A,
    self: vC
  }, mC = gC, bC = {
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
  }, CC = ie({
    name: "ConfigProvider",
    alias: ["App"],
    props: bC,
    setup(e) {
      const o = he(bo, null), t = E(() => {
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
            return m === void 0 ? d : _t({}, m, d);
          }
        }
      }), n = Je(() => {
        const { namespace: d } = e;
        return d === void 0 ? o == null ? void 0 : o.mergedNamespaceRef.value : d;
      }), i = Je(() => {
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
        const b = {};
        for (const h of m)
          b[h.name] = Ye(h), (d = h.peers) === null || d === void 0 || d.forEach((w) => {
            w.name in b || (b[w.name] = Ye(w));
          });
        return b;
      }), u = E(() => e.breakpoints || (o == null ? void 0 : o.mergedBreakpointsRef.value)), f = e.inlineThemeDisabled || (o == null ? void 0 : o.inlineThemeDisabled), v = e.preflightStyleDisabled || (o == null ? void 0 : o.preflightStyleDisabled), p = E(() => {
        const { value: d } = t, { value: m } = r, b = m && Object.keys(m).length !== 0, h = d == null ? void 0 : d.name;
        return h ? b ? `${h}-${jt(JSON.stringify(r.value))}` : h : b ? jt(JSON.stringify(r.value)) : "";
      });
      return to(bo, {
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
        class: `${this.mergedClsPrefix || os}-config-provider`
      }, (o = (e = this.$slots).default) === null || o === void 0 ? void 0 : o.call(e));
    }
  }), xC = {
    name: "Popselect",
    common: A,
    peers: {
      Popover: Qo,
      InternalSelectMenu: Jt
    }
  }, ks = xC;
  function Os(e) {
    const { boxShadow2: o } = e;
    return {
      menuBoxShadow: o
    };
  }
  const yC = {
    name: "Select",
    common: yo,
    peers: {
      InternalSelection: Ps,
      InternalSelectMenu: gs
    },
    self: Os
  }, SC = yC, wC = {
    name: "Select",
    common: A,
    peers: {
      InternalSelection: li,
      InternalSelectMenu: Jt
    },
    self: Os
  }, Es = wC, $C = U([Q("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), Q("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [ms({
    originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
  })])]), PC = Object.assign(Object.assign({}, ve.props), {
    to: mo.propTo,
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
  }), TC = ie({
    name: "Select",
    props: PC,
    setup(e) {
      process.env.NODE_ENV !== "production" && vo(() => {
        e.items !== void 0 && zo("select", "`items` is deprecated, please use `options` instead."), e.onChange !== void 0 && zo("select", "`on-change` is deprecated, please use `on-update:value` instead.");
      });
      const { mergedClsPrefixRef: o, mergedBorderedRef: t, namespaceRef: r, inlineThemeDisabled: n } = $t(e), i = ve("Select", "-select", $C, SC, e, o), l = F(e.defaultValue), a = se(e, "value"), s = xn(a, l), c = F(!1), u = F(""), f = E(() => {
        const { valueField: g, childrenField: T } = e, B = y0(g, T);
        return pb(z.value, B);
      }), v = E(() => w0(x.value, e.valueField, e.childrenField)), p = F(!1), d = xn(se(e, "show"), p), m = F(null), b = F(null), h = F(null), { localeRef: w } = ts("Select"), O = E(() => {
        var g;
        return (g = e.placeholder) !== null && g !== void 0 ? g : w.value.placeholder;
      }), I = ta(e, ["items", "options"]), M = [], _ = F([]), C = F([]), $ = F(/* @__PURE__ */ new Map()), S = E(() => {
        const { fallbackOption: g } = e;
        if (g === void 0) {
          const { labelField: T, valueField: B } = e;
          return (X) => ({
            [T]: String(X),
            [B]: X
          });
        }
        return g === !1 ? !1 : (T) => Object.assign(g(T), {
          value: T
        });
      }), x = E(() => C.value.concat(_.value).concat(I.value)), P = E(() => {
        const { filter: g } = e;
        if (g)
          return g;
        const { labelField: T, valueField: B } = e;
        return (X, q) => {
          if (!q)
            return !1;
          const ee = q[T];
          if (typeof ee == "string")
            return cn(X, ee);
          const te = q[B];
          return typeof te == "string" ? cn(X, te) : typeof te == "number" ? cn(X, String(te)) : !1;
        };
      }), z = E(() => {
        if (e.remote)
          return I.value;
        {
          const { value: g } = x, { value: T } = u;
          return !T.length || !e.filterable ? g : S0(g, P.value, T, e.childrenField);
        }
      });
      function W(g) {
        const T = e.remote, { value: B } = $, { value: X } = v, { value: q } = S, ee = [];
        return g.forEach((te) => {
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
      const H = E(() => {
        if (e.multiple) {
          const { value: g } = s;
          return Array.isArray(g) ? W(g) : [];
        }
        return null;
      }), N = E(() => {
        const { value: g } = s;
        return !e.multiple && !Array.isArray(g) ? g === null ? null : W([g])[0] || null : null;
      }), G = Wu(e), { mergedSizeRef: V, mergedDisabledRef: oe, mergedStatusRef: k } = G;
      function L(g, T) {
        const { onChange: B, "onUpdate:value": X, onUpdateValue: q } = e, { nTriggerFormChange: ee, nTriggerFormInput: te } = G;
        B && we(B, g, T), q && we(q, g, T), X && we(X, g, T), l.value = g, ee(), te();
      }
      function re(g) {
        const { onBlur: T } = e, { nTriggerFormBlur: B } = G;
        T && we(T, g), B();
      }
      function ue() {
        const { onClear: g } = e;
        g && we(g);
      }
      function ze(g) {
        const { onFocus: T, showOnFocus: B } = e, { nTriggerFormFocus: X } = G;
        T && we(T, g), X(), B && De();
      }
      function lo(g) {
        const { onSearch: T } = e;
        T && we(T, g);
      }
      function Te(g) {
        const { onScroll: T } = e;
        T && we(T, g);
      }
      function Qe() {
        var g;
        const { remote: T, multiple: B } = e;
        if (T) {
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
        const { onUpdateShow: T, "onUpdate:show": B } = e;
        T && we(T, g), B && we(B, g), p.value = g;
      }
      function De() {
        oe.value || (Ae(!0), p.value = !0, e.filterable && Po());
      }
      function xe() {
        Ae(!1);
      }
      function Ge() {
        u.value = "", C.value = M;
      }
      const Re = F(!1);
      function Fe() {
        e.filterable && (Re.value = !0);
      }
      function ao() {
        e.filterable && (Re.value = !1, d.value || Ge());
      }
      function so() {
        oe.value || (d.value ? e.filterable ? Po() : xe() : De());
      }
      function co(g) {
        var T, B;
        !((B = (T = h.value) === null || T === void 0 ? void 0 : T.selfRef) === null || B === void 0) && B.contains(g.relatedTarget) || (c.value = !1, re(g), xe());
      }
      function Do(g) {
        ze(g), c.value = !0;
      }
      function Ho(g) {
        c.value = !0;
      }
      function So(g) {
        var T;
        !((T = m.value) === null || T === void 0) && T.$el.contains(g.relatedTarget) || (c.value = !1, re(g), xe());
      }
      function wo() {
        var g;
        (g = m.value) === null || g === void 0 || g.focus(), xe();
      }
      function Me(g) {
        var T;
        d.value && (!((T = m.value) === null || T === void 0) && T.$el.contains(Nt(g)) || xe());
      }
      function R(g) {
        if (!Array.isArray(g))
          return [];
        if (S.value)
          return Array.from(g);
        {
          const { remote: T } = e, { value: B } = v;
          if (T) {
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
        const { tag: T, remote: B, clearFilterAfterSelect: X, valueField: q } = e;
        if (T && !B) {
          const { value: ee } = C, te = ee[0] || null;
          if (te) {
            const ne = _.value;
            ne.length ? ne.push(te) : _.value = [te], C.value = M;
          }
        }
        if (B && $.value.set(g[q], g), e.multiple) {
          const ee = R(s.value), te = ee.findIndex((ne) => ne === g[q]);
          if (~te) {
            if (ee.splice(te, 1), T && !B) {
              const ne = Le(g[q]);
              ~ne && (_.value.splice(ne, 1), X && (u.value = ""));
            }
          } else
            ee.push(g[q]), X && (u.value = "");
          L(ee, W(ee));
        } else {
          if (T && !B) {
            const ee = Le(g[q]);
            ~ee ? _.value = [
              _.value[ee]
            ] : _.value = M;
          }
          $o(), xe(), L(g[q], g);
        }
      }
      function Le(g) {
        return _.value.findIndex((B) => B[e.valueField] === g);
      }
      function et(g) {
        d.value || De();
        const { value: T } = g.target;
        u.value = T;
        const { tag: B, remote: X } = e;
        if (lo(T), B && !X) {
          if (!T) {
            C.value = M;
            return;
          }
          const { onCreate: q } = e, ee = q ? q(T) : { [e.labelField]: T, [e.valueField]: T }, { valueField: te } = e;
          I.value.some((ne) => ne[te] === ee[te]) || _.value.some((ne) => ne[te] === ee[te]) ? C.value = M : C.value = [ee];
        }
      }
      function Tt(g) {
        g.stopPropagation();
        const { multiple: T } = e;
        !T && e.filterable && xe(), ue(), T ? L([], []) : L(null, null);
      }
      function ot(g) {
        !mr(g, "action") && !mr(g, "empty") && g.preventDefault();
      }
      function tt(g) {
        Te(g);
      }
      function rt(g) {
        var T, B, X, q, ee;
        switch (g.key) {
          case " ":
            if (e.filterable)
              break;
            g.preventDefault();
          case "Enter":
            if (!(!((T = m.value) === null || T === void 0) && T.isComposing)) {
              if (d.value) {
                const te = (B = h.value) === null || B === void 0 ? void 0 : B.getPendingTmNode();
                te ? K(te) : e.filterable || (xe(), $o());
              } else if (De(), e.tag && Re.value) {
                const te = C.value[0];
                if (te) {
                  const ne = te[e.valueField], { value: ke } = s;
                  e.multiple && Array.isArray(ke) && ke.some((fo) => fo === ne) || ce(te);
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
            d.value && (_d(g), xe()), (ee = m.value) === null || ee === void 0 || ee.focus();
            break;
        }
      }
      function $o() {
        var g;
        (g = m.value) === null || g === void 0 || g.focus();
      }
      function Po() {
        var g;
        (g = m.value) === null || g === void 0 || g.focusInput();
      }
      function It() {
        var g;
        d.value && ((g = b.value) === null || g === void 0 || g.syncPosition());
      }
      Qe(), ye(se(e, "options"), Qe);
      const nt = {
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
      }), uo = n ? _o("select", void 0, Ke, e) : void 0;
      return Object.assign(Object.assign({}, nt), {
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
        adjustedTo: mo(e),
        uncontrolledValue: l,
        mergedValue: s,
        followerRef: b,
        localizedPlaceholder: O,
        selectedOption: N,
        selectedOptions: H,
        mergedSize: V,
        mergedDisabled: oe,
        focused: c,
        activeWithoutMenuOpen: Re,
        inlineThemeDisabled: n,
        onTriggerInputFocus: Fe,
        onTriggerInputBlur: ao,
        handleTriggerOrMenuResize: It,
        handleMenuFocus: Ho,
        handleMenuBlur: So,
        handleMenuTabOut: wo,
        handleTriggerClick: so,
        handleToggle: K,
        handleDeleteOption: ce,
        handlePatternInput: et,
        handleClear: Tt,
        handleTriggerBlur: co,
        handleTriggerFocus: Do,
        handleKeydown: rt,
        handleMenuAfterLeave: Ge,
        handleMenuClickOutside: Me,
        handleMenuScroll: tt,
        handleMenuKeydown: rt,
        handleMenuMousedown: ot,
        mergedTheme: i,
        cssVars: n ? void 0 : Ke,
        themeClass: uo == null ? void 0 : uo.themeClass,
        onRender: uo == null ? void 0 : uo.onRender
      });
    },
    render() {
      return y(
        "div",
        { class: `${this.mergedClsPrefix}-select` },
        y(da, null, {
          default: () => [
            y(ua, null, {
              default: () => y(h0, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
                arrow: () => {
                  var e, o;
                  return [(o = (e = this.$slots).arrow) === null || o === void 0 ? void 0 : o.call(e)];
                }
              })
            }),
            y(pa, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === mo.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
              default: () => y(Ct, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
                default: () => {
                  var e, o, t;
                  return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Xt(y(Lb, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
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
                    [kl, this.mergedShow],
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
  }), IC = {
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
  }, zC = (e) => {
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
    return Object.assign(Object.assign({}, IC), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${a}`, buttonBorderHover: `1px solid ${a}`, buttonBorderPressed: `1px solid ${a}`, buttonIconColor: o, buttonIconColorHover: o, buttonIconColorPressed: o, itemTextColor: o, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: t, itemTextColorDisabled: l, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${t}`, itemBorderDisabled: `1px solid ${a}`, itemBorderRadius: s, itemSizeSmall: v, itemSizeMedium: p, itemSizeLarge: d, itemFontSizeSmall: c, itemFontSizeMedium: u, itemFontSizeLarge: f, jumperFontSizeSmall: c, jumperFontSizeMedium: u, jumperFontSizeLarge: f, jumperTextColor: o, jumperTextColorDisabled: l });
  }, MC = {
    name: "Pagination",
    common: A,
    peers: {
      Select: Es,
      Input: Ue,
      Popselect: ks
    },
    self(e) {
      const { primaryColor: o, opacity3: t } = e, r = D(o, {
        alpha: Number(t)
      }), n = zC(e);
      return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
    }
  }, _s = MC, Ds = {
    padding: "8px 14px"
  }, kC = {
    name: "Tooltip",
    common: A,
    peers: {
      Popover: Qo
    },
    self(e) {
      const { borderRadius: o, boxShadow2: t, popoverColor: r, textColor2: n } = e;
      return Object.assign(Object.assign({}, Ds), { borderRadius: o, boxShadow: t, color: r, textColor: n });
    }
  }, Fr = kC, OC = (e) => {
    const { borderRadius: o, boxShadow2: t, baseColor: r } = e;
    return Object.assign(Object.assign({}, Ds), { borderRadius: o, boxShadow: t, color: Z(r, "rgba(0, 0, 0, .85)"), textColor: r });
  }, EC = {
    name: "Tooltip",
    common: yo,
    peers: {
      Popover: ii
    },
    self: OC
  }, _C = EC, DC = {
    name: "Ellipsis",
    common: A,
    peers: {
      Tooltip: Fr
    }
  }, Hs = DC, HC = {
    radioSizeSmall: "14px",
    radioSizeMedium: "16px",
    radioSizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, BC = {
    name: "Radio",
    common: A,
    self(e) {
      const { borderColor: o, primaryColor: t, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: l, opacityDisabled: a, borderRadius: s, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: f, heightSmall: v, heightMedium: p, heightLarge: d, lineHeight: m } = e;
      return Object.assign(Object.assign({}, HC), {
        labelLineHeight: m,
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
  }, Bs = BC, AC = {
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
  }, RC = (e) => {
    const { primaryColor: o, textColor2: t, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: l, borderRadius: a, fontSizeSmall: s, fontSizeMedium: c, fontSizeLarge: u, fontSizeHuge: f, heightSmall: v, heightMedium: p, heightLarge: d, heightHuge: m, textColor3: b, opacityDisabled: h } = e;
    return Object.assign(Object.assign({}, AC), {
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
  }, FC = {
    name: "Dropdown",
    common: A,
    peers: {
      Popover: Qo
    },
    self(e) {
      const { primaryColorSuppl: o, primaryColor: t, popoverColor: r } = e, n = RC(e);
      return n.colorInverted = r, n.optionColorActive = D(t, { alpha: 0.15 }), n.optionColorActiveInverted = o, n.optionColorHoverInverted = o, n;
    }
  }, ai = FC, LC = {
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
  }, WC = (e) => {
    const { cardColor: o, modalColor: t, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: l, tableColorHover: a, iconColor: s, primaryColor: c, fontWeightStrong: u, borderRadius: f, lineHeight: v, fontSizeSmall: p, fontSizeMedium: d, fontSizeLarge: m, dividerColor: b, heightSmall: h, opacityDisabled: w, tableColorStriped: O } = e;
    return Object.assign(Object.assign({}, LC), {
      actionDividerColor: b,
      lineHeight: v,
      borderRadius: f,
      fontSizeSmall: p,
      fontSizeMedium: d,
      fontSizeLarge: m,
      borderColor: Z(o, b),
      tdColorHover: Z(o, a),
      tdColorStriped: Z(o, O),
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
      borderColorModal: Z(t, b),
      tdColorHoverModal: Z(t, a),
      tdColorStripedModal: Z(t, O),
      thColorModal: Z(t, l),
      thColorHoverModal: Z(Z(t, l), a),
      tdColorModal: t,
      // popover
      borderColorPopover: Z(r, b),
      tdColorHoverPopover: Z(r, a),
      tdColorStripedPopover: Z(r, O),
      thColorPopover: Z(r, l),
      thColorHoverPopover: Z(Z(r, l), a),
      tdColorPopover: r,
      boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
      boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
      // loading
      loadingColor: c,
      loadingSize: h,
      opacityLoading: w
    });
  }, NC = {
    name: "DataTable",
    common: A,
    peers: {
      Button: _e,
      Checkbox: Pt,
      Radio: Bs,
      Pagination: _s,
      Scrollbar: Ee,
      Empty: Zo,
      Popover: Qo,
      Ellipsis: Hs,
      Dropdown: ai
    },
    self(e) {
      const o = WC(e);
      return o.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", o.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", o;
    }
  }, jC = NC, VC = Object.assign(Object.assign({}, xs), ve.props), UC = ie({
    name: "Tooltip",
    props: VC,
    __popover__: !0,
    setup(e) {
      const o = ve("Tooltip", "-tooltip", void 0, _C, e), t = F(null);
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
      return y(ys, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: o.concat("tooltip"), ref: "popoverRef" }), this.$slots);
    }
  }), As = (e) => {
    const { textColorBase: o, opacity1: t, opacity2: r, opacity3: n, opacity4: i, opacity5: l } = e;
    return {
      color: o,
      opacity1Depth: t,
      opacity2Depth: r,
      opacity3Depth: n,
      opacity4Depth: i,
      opacity5Depth: l
    };
  }, GC = {
    name: "Icon",
    common: yo,
    self: As
  }, KC = GC, XC = {
    name: "Icon",
    common: A,
    self: As
  }, YC = XC, qC = Q("icon", `
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
  })]), JC = Object.assign(Object.assign({}, ve.props), { depth: [String, Number], size: [Number, String], color: String, component: Object }), ZC = ie({
    _n_icon__: !0,
    name: "Icon",
    inheritAttrs: !1,
    props: JC,
    setup(e) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: t } = $t(e), r = ve("Icon", "-icon", qC, KC, e, o), n = E(() => {
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
      }), i = t ? _o("icon", E(() => `${e.depth || "d"}`), n, e) : void 0;
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
  }), QC = {
    itemFontSize: "12px",
    itemHeight: "36px",
    itemWidth: "52px",
    panelActionPadding: "8px 0"
  }, ex = (e) => {
    const { popoverColor: o, textColor2: t, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: l, boxShadow2: a, borderRadius: s, iconColor: c, iconColorDisabled: u } = e;
    return Object.assign(Object.assign({}, QC), {
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
  }, ox = {
    name: "TimePicker",
    common: A,
    peers: {
      Scrollbar: Ee,
      Button: _e,
      Input: Ue
    },
    self: ex
  }, Rs = ox, tx = {
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
  }, rx = (e) => {
    const { hoverColor: o, fontSize: t, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: l, borderRadiusSmall: a, iconColor: s, iconColorDisabled: c, textColor1: u, dividerColor: f, boxShadow2: v, borderRadius: p, fontWeightStrong: d } = e;
    return Object.assign(Object.assign({}, tx), {
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
  }, nx = {
    name: "DatePicker",
    common: A,
    peers: {
      Input: Ue,
      Button: _e,
      TimePicker: Rs,
      Scrollbar: Ee
    },
    self(e) {
      const { popoverColor: o, hoverColor: t, primaryColor: r } = e, n = rx(e);
      return n.itemColorDisabled = Z(o, t), n.itemColorIncluded = D(r, { alpha: 0.15 }), n.itemColorHover = Z(o, t), n;
    }
  }, ix = nx, lx = {
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
  }, ax = (e) => {
    const { tableHeaderColor: o, textColor2: t, textColor1: r, cardColor: n, modalColor: i, popoverColor: l, dividerColor: a, borderRadius: s, fontWeightStrong: c, lineHeight: u, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: p } = e;
    return Object.assign(Object.assign({}, lx), {
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
  }, sx = {
    name: "Descriptions",
    common: A,
    self: ax
  }, cx = sx, dx = {
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
  }, ux = (e) => {
    const { textColor1: o, textColor2: t, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, infoColor: c, successColor: u, warningColor: f, errorColor: v, primaryColor: p, dividerColor: d, borderRadius: m, fontWeightStrong: b, lineHeight: h, fontSize: w } = e;
    return Object.assign(Object.assign({}, dx), {
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
      closeBorderRadius: m,
      iconColor: p,
      iconColorInfo: c,
      iconColorSuccess: u,
      iconColorWarning: f,
      iconColorError: v,
      borderRadius: m,
      titleFontWeight: b
    });
  }, fx = {
    name: "Dialog",
    common: A,
    peers: {
      Button: _e
    },
    self: ux
  }, Fs = fx, hx = (e) => {
    const { modalColor: o, textColor2: t, boxShadow3: r } = e;
    return {
      color: o,
      textColor: t,
      boxShadow: r
    };
  }, px = {
    name: "Modal",
    common: A,
    peers: {
      Scrollbar: Ee,
      Dialog: Fs,
      Card: zs
    },
    self: hx
  }, vx = px, gx = (e) => {
    const { textColor1: o, dividerColor: t, fontWeightStrong: r } = e;
    return {
      textColor: o,
      color: t,
      fontWeight: r
    };
  }, mx = {
    name: "Divider",
    common: A,
    self: gx
  }, bx = mx, Cx = (e) => {
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
  }, xx = {
    name: "Drawer",
    common: A,
    peers: {
      Scrollbar: Ee
    },
    self: Cx
  }, yx = xx, Sx = {
    actionMargin: "0 0 0 20px",
    actionMarginRtl: "0 20px 0 0"
  }, wx = {
    name: "DynamicInput",
    common: A,
    peers: {
      Input: Ue,
      Button: _e
    },
    self() {
      return Sx;
    }
  }, $x = wx, Px = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, Tx = {
    name: "Space",
    self() {
      return Px;
    }
  }, Ls = Tx, Ix = {
    name: "DynamicTags",
    common: A,
    peers: {
      Input: Ue,
      Button: _e,
      Tag: ws,
      Space: Ls
    },
    self() {
      return {
        inputWidth: "64px"
      };
    }
  }, zx = Ix, Mx = {
    name: "Element",
    common: A
  }, kx = Mx, Ox = {
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
  }, Ex = (e) => {
    const { heightSmall: o, heightMedium: t, heightLarge: r, textColor1: n, errorColor: i, warningColor: l, lineHeight: a, textColor3: s } = e;
    return Object.assign(Object.assign({}, Ox), { blankHeightSmall: o, blankHeightMedium: t, blankHeightLarge: r, lineHeight: a, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: l, feedbackTextColor: s });
  }, _x = {
    name: "Form",
    common: A,
    self: Ex
  }, Dx = _x, Hx = {
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
  }, Bx = Hx, Ax = (e) => {
    const { primaryColor: o, baseColor: t } = e;
    return {
      color: o,
      iconColor: t
    };
  }, Rx = {
    name: "IconWrapper",
    common: A,
    self: Ax
  }, Fx = Rx, Lx = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  }, Wx = (e) => {
    const { textColor2: o, successColor: t, infoColor: r, warningColor: n, errorColor: i, popoverColor: l, closeIconColor: a, closeIconColorHover: s, closeIconColorPressed: c, closeColorHover: u, closeColorPressed: f, textColor1: v, textColor3: p, borderRadius: d, fontWeightStrong: m, boxShadow2: b, lineHeight: h, fontSize: w } = e;
    return Object.assign(Object.assign({}, Lx), {
      borderRadius: d,
      lineHeight: h,
      fontSize: w,
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
      boxShadow: b
    });
  }, Nx = {
    name: "Notification",
    common: A,
    peers: {
      Scrollbar: Ee
    },
    self: Wx
  }, jx = Nx, Vx = {
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
  }, Ux = (e) => {
    const { textColor2: o, closeIconColor: t, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: l, errorColor: a, warningColor: s, popoverColor: c, boxShadow2: u, primaryColor: f, lineHeight: v, borderRadius: p, closeColorHover: d, closeColorPressed: m } = e;
    return Object.assign(Object.assign({}, Vx), {
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
  }, Gx = {
    name: "Message",
    common: A,
    self: Ux
  }, Kx = Gx, Xx = {
    name: "ButtonGroup",
    common: A
  }, Yx = Xx, qx = {
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
  }, Jx = qx, Zx = {
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
  }, Qx = Zx, ey = (e) => {
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
  }, oy = {
    name: "List",
    common: A,
    self: ey
  }, ty = oy, ry = {
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
  }, ny = ry, iy = {
    name: "Log",
    common: A,
    peers: {
      Scrollbar: Ee,
      Code: Ms
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
  }, ly = iy, ay = {
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
  }, sy = ay;
  function cy(e, o, t, r) {
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
  const dy = (e) => {
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
    }, cy("#BBB", r, "#FFF", "#AAA"));
  }, uy = {
    name: "Menu",
    common: A,
    peers: {
      Tooltip: Fr,
      Dropdown: ai
    },
    self(e) {
      const { primaryColor: o, primaryColorSuppl: t } = e, r = dy(e);
      return r.itemColorActive = D(o, { alpha: 0.15 }), r.itemColorActiveHover = D(o, { alpha: 0.15 }), r.itemColorActiveCollapsed = D(o, {
        alpha: 0.15
      }), r.itemColorActiveInverted = t, r.itemColorActiveHoverInverted = t, r.itemColorActiveCollapsedInverted = t, r;
    }
  }, fy = uy, hy = {
    titleFontSize: "18px",
    backSize: "22px"
  };
  function py(e) {
    const { textColor1: o, textColor2: t, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: l, primaryColorPressed: a } = e;
    return Object.assign(Object.assign({}, hy), { titleFontWeight: i, fontSize: n, titleTextColor: o, backColor: t, backColorHover: l, backColorPressed: a, subtitleTextColor: r });
  }
  const vy = {
    name: "PageHeader",
    common: A,
    self: py
  }, gy = {
    iconSize: "22px"
  }, my = (e) => {
    const { fontSize: o, warningColor: t } = e;
    return Object.assign(Object.assign({}, gy), { fontSize: o, iconColor: t });
  }, by = {
    name: "Popconfirm",
    common: A,
    peers: {
      Button: _e,
      Popover: Qo
    },
    self: my
  }, Cy = by, xy = (e) => {
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
  }, yy = {
    name: "Progress",
    common: A,
    self(e) {
      const o = xy(e);
      return o.textColorLineInner = "rgb(0, 0, 0)", o.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", o;
    }
  }, Ws = yy, Sy = {
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
  }, wy = Sy, $y = {
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
  }, Py = (e) => {
    const { textColor2: o, textColor1: t, errorColor: r, successColor: n, infoColor: i, warningColor: l, lineHeight: a, fontWeightStrong: s } = e;
    return Object.assign(Object.assign({}, $y), { lineHeight: a, titleFontWeight: s, titleTextColor: t, textColor: o, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: l });
  }, Ty = {
    name: "Result",
    common: A,
    self: Py
  }, Iy = Ty, zy = {
    railHeight: "4px",
    railWidthVertical: "4px",
    handleSize: "18px",
    dotHeight: "8px",
    dotWidth: "8px",
    dotBorderRadius: "4px"
  }, My = {
    name: "Slider",
    common: A,
    self(e) {
      const o = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: t, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: l, cardColor: a, borderRadius: s, fontSize: c, opacityDisabled: u } = e;
      return Object.assign(Object.assign({}, zy), { fontSize: c, markFontSize: c, railColor: t, railColorHover: t, fillColor: n, fillColorHover: n, opacityDisabled: u, handleColor: "#FFF", dotColor: a, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: o, indicatorTextColor: l, indicatorBorderRadius: s, dotBorder: `2px solid ${t}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
    }
  }, ky = My, Oy = (e) => {
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
  }, Ey = {
    name: "Spin",
    common: A,
    self: Oy
  }, _y = Ey, Dy = (e) => {
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
  }, Hy = {
    name: "Statistic",
    common: A,
    self: Dy
  }, By = Hy, Ay = {
    stepHeaderFontSizeSmall: "14px",
    stepHeaderFontSizeMedium: "16px",
    indicatorIndexFontSizeSmall: "14px",
    indicatorIndexFontSizeMedium: "16px",
    indicatorSizeSmall: "22px",
    indicatorSizeMedium: "28px",
    indicatorIconSizeSmall: "14px",
    indicatorIconSizeMedium: "18px"
  }, Ry = (e) => {
    const { fontWeightStrong: o, baseColor: t, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: l, textColor2: a } = e;
    return Object.assign(Object.assign({}, Ay), { stepHeaderFontWeight: o, indicatorTextColorProcess: t, indicatorTextColorWait: r, indicatorTextColorFinish: n, indicatorTextColorError: i, indicatorBorderColorProcess: n, indicatorBorderColorWait: r, indicatorBorderColorFinish: n, indicatorBorderColorError: i, indicatorColorProcess: n, indicatorColorWait: "#0000", indicatorColorFinish: "#0000", indicatorColorError: "#0000", splitorColorProcess: r, splitorColorWait: r, splitorColorFinish: n, splitorColorError: r, headerTextColorProcess: l, headerTextColorWait: r, headerTextColorFinish: r, headerTextColorError: i, descriptionTextColorProcess: a, descriptionTextColorWait: r, descriptionTextColorFinish: r, descriptionTextColorError: i });
  }, Fy = {
    name: "Steps",
    common: A,
    self: Ry
  }, Ly = Fy, Wy = {
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
  }, Ny = {
    name: "Switch",
    common: A,
    self(e) {
      const { primaryColorSuppl: o, opacityDisabled: t, borderRadius: r, primaryColor: n, textColor2: i, baseColor: l } = e, a = "rgba(255, 255, 255, .20)";
      return Object.assign(Object.assign({}, Wy), { iconColor: l, textColor: i, loadingColor: o, opacityDisabled: t, railColor: a, railColorActive: o, buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", buttonColor: "#FFF", railBorderRadiusSmall: r, railBorderRadiusMedium: r, railBorderRadiusLarge: r, buttonBorderRadiusSmall: r, buttonBorderRadiusMedium: r, buttonBorderRadiusLarge: r, boxShadowFocus: `0 0 8px 0 ${D(n, { alpha: 0.3 })}` });
    }
  }, jy = Ny, Vy = {
    thPaddingSmall: "6px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "6px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px"
  }, Uy = (e) => {
    const { dividerColor: o, cardColor: t, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: l, textColor1: a, textColor2: s, borderRadius: c, fontWeightStrong: u, lineHeight: f, fontSizeSmall: v, fontSizeMedium: p, fontSizeLarge: d } = e;
    return Object.assign(Object.assign({}, Vy), {
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
  }, Gy = {
    name: "Table",
    common: A,
    self: Uy
  }, Ky = Gy, Xy = {
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
  }, Yy = (e) => {
    const { textColor2: o, primaryColor: t, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: l, closeColorHover: a, closeColorPressed: s, tabColor: c, baseColor: u, dividerColor: f, fontWeight: v, textColor1: p, borderRadius: d, fontSize: m, fontWeightStrong: b } = e;
    return Object.assign(Object.assign({}, Xy), {
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
      fontWeightStrong: b
    });
  }, qy = {
    name: "Tabs",
    common: A,
    self(e) {
      const o = Yy(e), { inputColor: t } = e;
      return o.colorSegment = t, o.tabColorSegment = t, o;
    }
  }, Jy = qy, Zy = (e) => {
    const { textColor1: o, textColor2: t, fontWeightStrong: r, fontSize: n } = e;
    return {
      fontSize: n,
      titleTextColor: o,
      textColor: t,
      titleFontWeight: r
    };
  }, Qy = {
    name: "Thing",
    common: A,
    self: Zy
  }, e1 = Qy, o1 = {
    titleMarginMedium: "0 0 6px 0",
    titleMarginLarge: "-2px 0 6px 0",
    titleFontSizeMedium: "14px",
    titleFontSizeLarge: "16px",
    iconSizeMedium: "14px",
    iconSizeLarge: "14px"
  }, t1 = {
    name: "Timeline",
    common: A,
    self(e) {
      const { textColor3: o, infoColorSuppl: t, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: l, textColor2: a, railColor: s, fontWeightStrong: c, fontSize: u } = e;
      return Object.assign(Object.assign({}, o1), { contentFontSize: u, titleFontWeight: c, circleBorder: `2px solid ${o}`, circleBorderInfo: `2px solid ${t}`, circleBorderError: `2px solid ${r}`, circleBorderSuccess: `2px solid ${n}`, circleBorderWarning: `2px solid ${i}`, iconColor: o, iconColorInfo: t, iconColorError: r, iconColorSuccess: n, iconColorWarning: i, titleTextColor: l, contentTextColor: a, metaTextColor: o, lineColor: s });
    }
  }, r1 = t1, n1 = {
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
  }, i1 = {
    name: "Transfer",
    common: A,
    peers: {
      Checkbox: Pt,
      Scrollbar: Ee,
      Input: Ue,
      Empty: Zo,
      Button: _e
    },
    self(e) {
      const { fontWeight: o, fontSizeLarge: t, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: l, borderRadius: a, inputColor: s, tableHeaderColor: c, textColor1: u, textColorDisabled: f, textColor2: v, textColor3: p, hoverColor: d, closeColorHover: m, closeColorPressed: b, closeIconColor: h, closeIconColorHover: w, closeIconColorPressed: O, dividerColor: I } = e;
      return Object.assign(Object.assign({}, n1), {
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
        closeColorHover: m,
        closeColorPressed: b,
        closeIconColor: h,
        closeIconColorHover: w,
        closeIconColorPressed: O
      });
    }
  }, l1 = i1, a1 = (e) => {
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
  }, s1 = {
    name: "Tree",
    common: A,
    peers: {
      Checkbox: Pt,
      Scrollbar: Ee,
      Empty: Zo
    },
    self(e) {
      const { primaryColor: o } = e, t = a1(e);
      return t.nodeColorActive = D(o, { alpha: 0.15 }), t;
    }
  }, Ns = s1, c1 = {
    name: "TreeSelect",
    common: A,
    peers: {
      Tree: Ns,
      Empty: Zo,
      InternalSelection: li
    }
  }, d1 = c1, u1 = {
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
  }, f1 = (e) => {
    const { primaryColor: o, textColor2: t, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: l, dividerColor: a, fontWeightStrong: s, textColor1: c, textColor3: u, infoColor: f, warningColor: v, errorColor: p, successColor: d, codeColor: m } = e;
    return Object.assign(Object.assign({}, u1), { aTextColor: o, blockquoteTextColor: t, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: l, liTextColor: t, liLineHeight: n, liFontSize: i, hrColor: a, headerFontWeight: s, headerTextColor: c, pTextColor: t, pTextColor1Depth: c, pTextColor2Depth: t, pTextColor3Depth: u, pLineHeight: n, pFontSize: i, headerBarColor: o, headerBarColorPrimary: o, headerBarColorInfo: f, headerBarColorError: p, headerBarColorWarning: v, headerBarColorSuccess: d, textColor: t, textColor1Depth: c, textColor2Depth: t, textColor3Depth: u, textColorPrimary: o, textColorInfo: f, textColorSuccess: d, textColorWarning: v, textColorError: p, codeTextColor: t, codeColor: m, codeBorder: "1px solid #0000" });
  }, h1 = {
    name: "Typography",
    common: A,
    self: f1
  }, p1 = h1, v1 = (e) => {
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
  }, g1 = {
    name: "Upload",
    common: A,
    peers: {
      Button: _e,
      Progress: Ws
    },
    self(e) {
      const { errorColor: o } = e, t = v1(e);
      return t.itemColorHoverError = D(o, {
        alpha: 0.09
      }), t;
    }
  }, m1 = g1, b1 = {
    name: "Watermark",
    common: A,
    self(e) {
      const { fontFamily: o } = e;
      return {
        fontFamily: o
      };
    }
  }, C1 = b1, x1 = {
    name: "Row",
    common: A
  }, y1 = x1, S1 = {
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
  }, w1 = {
    extraFontSize: "12px",
    width: "440px"
  }, $1 = {
    name: "Transfer",
    common: A,
    peers: {
      Checkbox: Pt,
      Scrollbar: Ee,
      Input: Ue,
      Empty: Zo,
      Button: _e
    },
    self(e) {
      const { iconColorDisabled: o, iconColor: t, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: l, heightLarge: a, heightMedium: s, heightSmall: c, borderRadius: u, inputColor: f, tableHeaderColor: v, textColor1: p, textColorDisabled: d, textColor2: m, hoverColor: b } = e;
      return Object.assign(Object.assign({}, w1), {
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
        itemColorPending: b,
        titleFontWeight: r,
        iconColor: t,
        iconColorDisabled: o
      });
    }
  }, P1 = $1, T1 = {
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
  }, I1 = () => ({}), z1 = {
    name: "Equation",
    common: A,
    self: I1
  }, M1 = z1, js = {
    name: "dark",
    common: A,
    Alert: g0,
    Anchor: x0,
    AutoComplete: z0,
    Avatar: Is,
    AvatarGroup: _0,
    BackTop: B0,
    Badge: R0,
    Breadcrumb: N0,
    Button: _e,
    ButtonGroup: Yx,
    Calendar: Y0,
    Card: zs,
    Carousel: nC,
    Cascader: dC,
    Checkbox: Pt,
    Code: Ms,
    Collapse: pC,
    CollapseTransition: mC,
    ColorPicker: Z0,
    DataTable: jC,
    DatePicker: ix,
    Descriptions: cx,
    Dialog: Fs,
    Divider: bx,
    Drawer: yx,
    Dropdown: ai,
    DynamicInput: $x,
    DynamicTags: zx,
    Element: kx,
    Empty: Zo,
    Ellipsis: Hs,
    Equation: M1,
    Form: Dx,
    GradientText: Bx,
    Icon: YC,
    IconWrapper: Fx,
    Image: S1,
    Input: Ue,
    InputNumber: Jx,
    LegacyTransfer: P1,
    Layout: Qx,
    List: ty,
    LoadingBar: ny,
    Log: ly,
    Menu: fy,
    Mention: sy,
    Message: Kx,
    Modal: vx,
    Notification: jx,
    PageHeader: vy,
    Pagination: _s,
    Popconfirm: Cy,
    Popover: Qo,
    Popselect: ks,
    Progress: Ws,
    Radio: Bs,
    Rate: wy,
    Result: Iy,
    Row: y1,
    Scrollbar: Ee,
    Select: Es,
    Skeleton: T1,
    Slider: ky,
    Space: Ls,
    Spin: _y,
    Statistic: By,
    Steps: Ly,
    Switch: jy,
    Table: Ky,
    Tabs: Jy,
    Tag: ws,
    Thing: e1,
    TimePicker: Rs,
    Timeline: r1,
    Tooltip: Fr,
    Transfer: l1,
    Tree: Ns,
    TreeSelect: d1,
    Typography: p1,
    Upload: m1,
    Watermark: C1
  }, Sl = {
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
  }, Dn = {
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
  }, wl = {
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
  }, k1 = [
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
  ], O1 = Vl("coa", {
    state: () => ({
      coa: structuredClone(Dn)
    }),
    actions: {
      setAll(e) {
        this.coa = e;
      },
      getAll() {
        return this.coa;
      }
    }
  }), $l = F(js), E1 = F("Dark"), Pl = {
    common: {
      bodyColor: "#23313f",
      cardColor: "#293949",
      railColor: "#555",
      primaryColorSuppl: "#fff"
    }
  }, _1 = Vl("theme", {
    state: () => ({
      theme: js
    }),
    actions: {
      setTheme(e) {
        $l.value = e;
      },
      setThemeOverrides(e) {
        Pl.common = e.common;
      }
    },
    getters: {
      getTheme() {
        return $l.value;
      },
      getThemeOverrides() {
        return Pl;
      },
      getSelectedTheme() {
        return E1.value;
      }
    }
  }), D1 = ie({
    setup() {
      const e = O1(), o = "Select a coalition preset", t = E(() => e.coa.red), r = E(() => e.coa.blue), n = E(() => e.coa.neutrals), i = F({
        list: "red",
        index: 0
      }), l = (O) => {
        const I = k1.find((M) => M.value === O);
        return I ? I.label : null;
      }, a = (O, I) => {
        i.value.list = O, i.value.index = I;
      }, s = (O, I, M) => {
        if (!M)
          return;
        const _ = {
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
            sortedList: m
          }
        }, C = _[O], $ = _[I], S = C.sortedList.value[i.value.index], x = C.list.value.indexOf(S), P = C.list.value.splice(x, 1)[0];
        $.list.value.push(P), i.value.list = I, i.value.index = -1;
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
      }, v = (O) => O.value.slice().sort((I, M) => I - M), p = E(() => v(t)), d = E(() => v(r)), m = E(() => v(n)), b = E(() => ({
        red: p.value,
        neutrals: m.value,
        blue: d.value
      })), h = E({
        get() {
          return JSON.stringify(e.coa) === JSON.stringify(wl) ? "Modern" : JSON.stringify(e.coa) === JSON.stringify(Sl) ? "ColdWar" : JSON.stringify(e.coa) === JSON.stringify(Dn) ? "WW2" : "Custom";
        },
        set(O) {
          O === "Modern" ? e.setAll(structuredClone(wl)) : O === "ColdWar" ? e.setAll(structuredClone(Sl)) : O === "WW2" ? e.setAll(structuredClone(Dn)) : (h.value = "Custom", e.setAll(structuredClone(b.value)));
        }
      });
      return {
        tooltip: o,
        sorted_red: p,
        sorted_blue: d,
        sorted_neutral: m,
        red: t,
        blue: r,
        neutral: n,
        currentSelection: i,
        preset_options: [
          { label: "Modern", value: "Modern" },
          { label: "Cold War 1947-1991", value: "ColdWar" },
          { label: "WWII", value: "WW2" },
          { label: "Custom", value: "Custom" }
        ],
        preset: h,
        findCountryByValue: l,
        handleLeftArrowClick: c,
        handleRightArrowClick: u,
        handleCircleClick: f,
        handleItemClick: a
      };
    },
    components: {
      NTooltip: UC,
      NSelect: TC,
      NIcon: ZC
    }
  }), H1 = "/leftarrow.svg", B1 = "/circle.svg", A1 = "/rightarrow.svg", Vs = (e, o) => {
    const t = e.__vccOpts || e;
    for (const [r, n] of o)
      t[r] = n;
    return t;
  }, R1 = { class: "w-full h-full" }, F1 = { class: "flex flex-row justify-center p-5 relative" }, L1 = /* @__PURE__ */ be("img", { src: H1 }, null, -1), W1 = /* @__PURE__ */ be("img", { src: B1 }, null, -1), N1 = /* @__PURE__ */ be("img", { src: A1 }, null, -1), j1 = { class: "m-5" }, V1 = { class: "flex" }, U1 = { class: "w-1/2 mr-4" }, G1 = /* @__PURE__ */ be("h3", { class: "mb-3 text-lg font-semibold" }, "Red", -1), K1 = { class: "list-none border border-gray-300 p-6 pl-4 rounded-lg" }, X1 = ["onClick"], Y1 = { class: "w-1/3 mr-4" }, q1 = /* @__PURE__ */ be("h3", { class: "mb-3 text-lg font-semibold" }, "Neutral", -1), J1 = { class: "list-none border border-gray-300 p-6 rounded-lg" }, Z1 = ["onClick"], Q1 = { class: "w-1/2" }, eS = /* @__PURE__ */ be("h3", { class: "mb-3 text-lg font-semibold" }, "Blue", -1), oS = { class: "list-none border border-gray-300 p-6 rounded-lg" }, tS = ["onClick"];
  function rS(e, o, t, r, n, i) {
    const l = Dt("n-select"), a = Dt("n-tooltip"), s = Dt("n-icon");
    return Io(), Bo("div", R1, [
      be("div", F1, [
        dt(a, {
          trigger: "hover",
          class: "w-full"
        }, {
          trigger: ut(() => [
            dt(l, {
              value: e.preset,
              "onUpdate:value": o[0] || (o[0] = (c) => e.preset = c),
              options: e.preset_options,
              class: "absolute left-0 ml-5 w-1/4"
            }, null, 8, ["value", "options"])
          ]),
          default: ut(() => [
            bt(" " + Zt(e.tooltip), 1)
          ]),
          _: 1
        }),
        be("button", {
          onClick: o[1] || (o[1] = (...c) => e.handleLeftArrowClick && e.handleLeftArrowClick(...c))
        }, [
          dt(s, { size: "35" }, {
            default: ut(() => [
              L1
            ]),
            _: 1
          })
        ]),
        be("button", {
          onClick: o[2] || (o[2] = (...c) => e.handleCircleClick && e.handleCircleClick(...c))
        }, [
          dt(s, { size: "35" }, {
            default: ut(() => [
              W1
            ]),
            _: 1
          })
        ]),
        be("button", {
          onClick: o[3] || (o[3] = (...c) => e.handleRightArrowClick && e.handleRightArrowClick(...c))
        }, [
          dt(s, { size: "35" }, {
            default: ut(() => [
              N1
            ]),
            _: 1
          })
        ])
      ]),
      be("div", j1, [
        be("div", V1, [
          be("div", U1, [
            G1,
            be("ul", K1, [
              (Io(!0), Bo(oo, null, Lr(e.sorted_red, (c, u) => (Io(), Bo("li", {
                key: u,
                class: Wr(["mb-2 cursor-pointer rounded", {
                  "bg-blue-200 pl-2 text-black": e.currentSelection.list === "red" && e.currentSelection.index === u
                }]),
                onClick: (f) => e.handleItemClick("red", u)
              }, Zt(e.findCountryByValue(c)), 11, X1))), 128))
            ])
          ]),
          be("div", Y1, [
            q1,
            be("ul", J1, [
              (Io(!0), Bo(oo, null, Lr(e.sorted_neutral, (c, u) => (Io(), Bo("li", {
                key: u,
                class: Wr(["mb-2 cursor-pointer rounded", {
                  "bg-blue-200 pl-2 text-black": e.currentSelection.list === "neutral" && e.currentSelection.index === u
                }]),
                onClick: (f) => e.handleItemClick("neutral", u)
              }, Zt(e.findCountryByValue(c)), 11, Z1))), 128))
            ])
          ]),
          be("div", Q1, [
            eS,
            be("ul", oS, [
              (Io(!0), Bo(oo, null, Lr(e.sorted_blue, (c, u) => (Io(), Bo("li", {
                key: u,
                class: Wr(["mb-2 cursor-pointer rounded", {
                  "bg-blue-200 pl-2 text-black": e.currentSelection.list === "blue" && e.currentSelection.index === u
                }]),
                onClick: (f) => e.handleItemClick("blue", u)
              }, Zt(e.findCountryByValue(c)), 11, tS))), 128))
            ])
          ])
        ])
      ])
    ]);
  }
  const nS = /* @__PURE__ */ Vs(D1, [["render", rS]]), iS = {
    setup() {
      const e = _1(), o = F(e.theme), t = F(e.getSelectedTheme), r = F(
        e.getThemeOverrides
      );
      return {
        theme: o,
        selectedTheme: t,
        themeOverrides: r,
        setThemeOverrides: (i) => {
          e.setThemeOverrides(i);
        }
      };
    },
    components: {
      NConfigProvider: CC,
      CoalitionComponent: nS
    }
  };
  function lS(e, o, t, r, n, i) {
    const l = Dt("CoalitionComponent"), a = Dt("n-config-provider");
    return Io(), yc(a, {
      theme: r.selectedTheme === "Dark" ? r.theme : null,
      "theme-overrides": r.selectedTheme === "Dark" ? r.themeOverrides : null
    }, {
      default: ut(() => [
        dt(l)
      ]),
      _: 1
    }, 8, ["theme", "theme-overrides"]);
  }
  const aS = /* @__PURE__ */ Vs(iS, [["render", lS]]), sS = Kc(), Us = Sc(aS);
  Us.use(sS);
  Us.mount("#app");
});
export default cS();
