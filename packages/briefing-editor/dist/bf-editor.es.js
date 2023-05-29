var Nd = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
import { effectScope as bl, ref as H, markRaw as Mt, toRaw as un, hasInjectionContext as Vd, inject as ve, getCurrentInstance as No, watch as ke, unref as Se, reactive as Ud, isRef as br, isReactive as mi, toRef as se, nextTick as Rt, computed as k, getCurrentScope as Gd, onScopeDispose as Xd, toRefs as Vi, createTextVNode as xt, Fragment as ft, Comment as bi, isVNode as qd, vShow as Ir, defineComponent as ie, readonly as qn, onMounted as yt, onBeforeUnmount as st, provide as lt, withDirectives as co, h as u, Teleport as xl, renderSlot as Yd, onActivated as Zd, onDeactivated as Kd, onBeforeMount as xi, watchEffect as Ge, Transition as Nt, TransitionGroup as Cl, mergeProps as xr, cloneVNode as en, normalizeStyle as Jd, openBlock as ko, createElementBlock as Qd, createVNode as Be, withCtx as Ne, createBlock as dr, createElementVNode as $n, createApp as eu } from "vue";
var l5 = Nd((it, at) => {
  var yl = !1;
  function kr(e, t, o) {
    return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
  }
  function Pn(e, t) {
    if (Array.isArray(e)) {
      e.splice(t, 1);
      return;
    }
    delete e[t];
  }
  function tu() {
    return wl().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function wl() {
    return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
  }
  const ou = typeof Proxy == "function", ru = "devtools-plugin:setup", nu = "plugin:settings:set";
  let Ro, Yn;
  function iu() {
    var e;
    return Ro !== void 0 || (typeof window < "u" && window.performance ? (Ro = !0, Yn = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (Ro = !0, Yn = global.perf_hooks.performance) : Ro = !1), Ro;
  }
  function au() {
    return iu() ? Yn.now() : Date.now();
  }
  class lu {
    constructor(t, o) {
      this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = o;
      const r = {};
      if (t.settings)
        for (const a in t.settings) {
          const l = t.settings[a];
          r[a] = l.defaultValue;
        }
      const n = `__vue-devtools-plugin-settings__${t.id}`;
      let i = Object.assign({}, r);
      try {
        const a = localStorage.getItem(n), l = JSON.parse(a);
        Object.assign(i, l);
      } catch {
      }
      this.fallbacks = {
        getSettings() {
          return i;
        },
        setSettings(a) {
          try {
            localStorage.setItem(n, JSON.stringify(a));
          } catch {
          }
          i = a;
        },
        now() {
          return au();
        }
      }, o && o.on(nu, (a, l) => {
        a === this.plugin.id && this.fallbacks.setSettings(l);
      }), this.proxiedOn = new Proxy({}, {
        get: (a, l) => this.target ? this.target.on[l] : (...s) => {
          this.onQueue.push({
            method: l,
            args: s
          });
        }
      }), this.proxiedTarget = new Proxy({}, {
        get: (a, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...s) => (this.targetQueue.push({
          method: l,
          args: s,
          resolve: () => {
          }
        }), this.fallbacks[l](...s)) : (...s) => new Promise((c) => {
          this.targetQueue.push({
            method: l,
            args: s,
            resolve: c
          });
        })
      });
    }
    async setRealTarget(t) {
      this.target = t;
      for (const o of this.onQueue)
        this.target.on[o.method](...o.args);
      for (const o of this.targetQueue)
        o.resolve(await this.target[o.method](...o.args));
    }
  }
  function Sl(e, t) {
    const o = e, r = wl(), n = tu(), i = ou && o.enableEarlyProxy;
    if (n && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
      n.emit(ru, e, t);
    else {
      const a = i ? new lu(o, n) : null;
      (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
        pluginDescriptor: o,
        setupFn: t,
        proxy: a
      }), a && t(a.proxiedTarget);
    }
  }
  /*!
    * pinia v2.1.1
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let ur;
  const Cr = (e) => ur = e, $l = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
    /* istanbul ignore next */
    Symbol()
  );
  function uo(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
  }
  var It;
  (function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
  })(It || (It = {}));
  const fn = typeof window < "u", pr = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && fn, Ui = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
  function su(e, { autoBom: t = !1 } = {}) {
    return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
  }
  function Ci(e, t, o) {
    const r = new XMLHttpRequest();
    r.open("GET", e), r.responseType = "blob", r.onload = function() {
      zl(r.response, t, o);
    }, r.onerror = function() {
      console.error("could not download file");
    }, r.send();
  }
  function Pl(e) {
    const t = new XMLHttpRequest();
    t.open("HEAD", e, !1);
    try {
      t.send();
    } catch {
    }
    return t.status >= 200 && t.status <= 299;
  }
  function Yr(e) {
    try {
      e.dispatchEvent(new MouseEvent("click"));
    } catch {
      const o = document.createEvent("MouseEvents");
      o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
    }
  }
  const Zr = typeof navigator == "object" ? navigator : { userAgent: "" }, Tl = /* @__PURE__ */ (() => /Macintosh/.test(Zr.userAgent) && /AppleWebKit/.test(Zr.userAgent) && !/Safari/.test(Zr.userAgent))(), zl = fn ? (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Tl ? cu : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in Zr ? du : (
        // Fallback to using FileReader and a popup
        uu
      )
    )
  ) : () => {
  };
  function cu(e, t = "download", o) {
    const r = document.createElement("a");
    r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? Pl(r.href) ? Ci(e, t, o) : (r.target = "_blank", Yr(r)) : Yr(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
      URL.revokeObjectURL(r.href);
    }, 4e4), setTimeout(function() {
      Yr(r);
    }, 0));
  }
  function du(e, t = "download", o) {
    if (typeof e == "string")
      if (Pl(e))
        Ci(e, t, o);
      else {
        const r = document.createElement("a");
        r.href = e, r.target = "_blank", setTimeout(function() {
          Yr(r);
        });
      }
    else
      navigator.msSaveOrOpenBlob(su(e, o), t);
  }
  function uu(e, t, o, r) {
    if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
      return Ci(e, t, o);
    const n = e.type === "application/octet-stream", i = /constructor/i.test(String(Ui.HTMLElement)) || "safari" in Ui, a = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((a || n && i || Tl) && typeof FileReader < "u") {
      const l = new FileReader();
      l.onloadend = function() {
        let s = l.result;
        if (typeof s != "string")
          throw r = null, new Error("Wrong reader.result type");
        s = a ? s : s.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = s : location.assign(s), r = null;
      }, l.readAsDataURL(e);
    } else {
      const l = URL.createObjectURL(e);
      r ? r.location.assign(l) : location.href = l, r = null, setTimeout(function() {
        URL.revokeObjectURL(l);
      }, 4e4);
    }
  }
  function Le(e, t) {
    const o = "🍍 " + e;
    typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, t) : t === "error" ? console.error(o) : t === "warn" ? console.warn(o) : console.log(o);
  }
  function yi(e) {
    return "_a" in e && "install" in e;
  }
  function Rl() {
    if (!("clipboard" in navigator))
      return Le("Your browser doesn't support the Clipboard API", "error"), !0;
  }
  function Il(e) {
    return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Le('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
  }
  async function fu(e) {
    if (!Rl())
      try {
        await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Le("Global state copied to clipboard.");
      } catch (t) {
        if (Il(t))
          return;
        Le("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
      }
  }
  async function pu(e) {
    if (!Rl())
      try {
        e.state.value = JSON.parse(await navigator.clipboard.readText()), Le("Global state pasted from clipboard.");
      } catch (t) {
        if (Il(t))
          return;
        Le("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
      }
  }
  async function hu(e) {
    try {
      zl(new Blob([JSON.stringify(e.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (t) {
      Le("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
    }
  }
  let Bt;
  function gu() {
    Bt || (Bt = document.createElement("input"), Bt.type = "file", Bt.accept = ".json");
    function e() {
      return new Promise((t, o) => {
        Bt.onchange = async () => {
          const r = Bt.files;
          if (!r)
            return t(null);
          const n = r.item(0);
          return t(n ? { text: await n.text(), file: n } : null);
        }, Bt.oncancel = () => t(null), Bt.onerror = o, Bt.click();
      });
    }
    return e;
  }
  async function vu(e) {
    try {
      const o = await (await gu())();
      if (!o)
        return;
      const { text: r, file: n } = o;
      e.state.value = JSON.parse(r), Le(`Global state imported from "${n.name}".`);
    } catch (t) {
      Le("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
    }
  }
  function mt(e) {
    return {
      _custom: {
        display: e
      }
    };
  }
  const Dl = "🍍 Pinia (root)", Zn = "_root";
  function mu(e) {
    return yi(e) ? {
      id: Zn,
      label: Dl
    } : {
      id: e.$id,
      label: e.$id
    };
  }
  function bu(e) {
    if (yi(e)) {
      const o = Array.from(e._s.keys()), r = e._s;
      return {
        state: o.map((i) => ({
          editable: !0,
          key: i,
          value: e.state.value[i]
        })),
        getters: o.filter((i) => r.get(i)._getters).map((i) => {
          const a = r.get(i);
          return {
            editable: !1,
            key: i,
            value: a._getters.reduce((l, s) => (l[s] = a[s], l), {})
          };
        })
      };
    }
    const t = {
      state: Object.keys(e.$state).map((o) => ({
        editable: !0,
        key: o,
        value: e.$state[o]
      }))
    };
    return e._getters && e._getters.length && (t.getters = e._getters.map((o) => ({
      editable: !1,
      key: o,
      value: e[o]
    }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((o) => ({
      editable: !0,
      key: o,
      value: e[o]
    }))), t;
  }
  function xu(e) {
    return e ? Array.isArray(e) ? e.reduce((t, o) => (t.keys.push(o.key), t.operations.push(o.type), t.oldValue[o.key] = o.oldValue, t.newValue[o.key] = o.newValue, t), {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    }) : {
      operation: mt(e.type),
      key: mt(e.key),
      oldValue: e.oldValue,
      newValue: e.newValue
    } : {};
  }
  function Cu(e) {
    switch (e) {
      case It.direct:
        return "mutation";
      case It.patchFunction:
        return "$patch";
      case It.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let Oo = !0;
  const Kr = [], eo = "pinia:mutations", Ve = "pinia", { assign: yu } = Object, tn = (e) => "🍍 " + e;
  function wu(e, t) {
    Sl({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes: Kr,
      app: e
    }, (o) => {
      typeof o.now != "function" && Le("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
        id: eo,
        label: "Pinia 🍍",
        color: 15064968
      }), o.addInspector({
        id: Ve,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              fu(t);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await pu(t), o.sendInspectorTree(Ve), o.sendInspectorState(Ve);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              hu(t);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await vu(t), o.sendInspectorTree(Ve), o.sendInspectorState(Ve);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (r) => {
              const n = t._s.get(r);
              n ? typeof n.$reset != "function" ? Le(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (n.$reset(), Le(`Store "${r}" reset.`)) : Le(`Cannot reset "${r}" store because it wasn't found.`, "warn");
            }
          }
        ]
      }), o.on.inspectComponent((r, n) => {
        const i = r.componentInstance && r.componentInstance.proxy;
        if (i && i._pStores) {
          const a = r.componentInstance.proxy._pStores;
          Object.values(a).forEach((l) => {
            r.instanceData.state.push({
              type: tn(l.$id),
              key: "state",
              editable: !0,
              value: l._isOptionsAPI ? {
                _custom: {
                  value: un(l.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => l.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(l.$state).reduce((s, c) => (s[c] = l.$state[c], s), {})
              )
            }), l._getters && l._getters.length && r.instanceData.state.push({
              type: tn(l.$id),
              key: "getters",
              editable: !1,
              value: l._getters.reduce((s, c) => {
                try {
                  s[c] = l[c];
                } catch (d) {
                  s[c] = d;
                }
                return s;
              }, {})
            });
          });
        }
      }), o.on.getInspectorTree((r) => {
        if (r.app === e && r.inspectorId === Ve) {
          let n = [t];
          n = n.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : Dl.toLowerCase().includes(r.filter.toLowerCase())) : n).map(mu);
        }
      }), o.on.getInspectorState((r) => {
        if (r.app === e && r.inspectorId === Ve) {
          const n = r.nodeId === Zn ? t : t._s.get(r.nodeId);
          if (!n)
            return;
          n && (r.state = bu(n));
        }
      }), o.on.editInspectorState((r, n) => {
        if (r.app === e && r.inspectorId === Ve) {
          const i = r.nodeId === Zn ? t : t._s.get(r.nodeId);
          if (!i)
            return Le(`store "${r.nodeId}" not found`, "error");
          const { path: a } = r;
          yi(i) ? a.unshift("state") : (a.length !== 1 || !i._customProperties.has(a[0]) || a[0] in i.$state) && a.unshift("$state"), Oo = !1, r.set(i, a, r.state.value), Oo = !0;
        }
      }), o.on.editComponentState((r) => {
        if (r.type.startsWith("🍍")) {
          const n = r.type.replace(/^🍍\s*/, ""), i = t._s.get(n);
          if (!i)
            return Le(`store "${n}" not found`, "error");
          const { path: a } = r;
          if (a[0] !== "state")
            return Le(`Invalid path for store "${n}":
${a}
Only state can be modified.`);
          a[0] = "$state", Oo = !1, r.set(i, a, r.state.value), Oo = !0;
        }
      });
    });
  }
  function Su(e, t) {
    Kr.includes(tn(t.$id)) || Kr.push(tn(t.$id)), Sl({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes: Kr,
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
    }, (o) => {
      const r = typeof o.now == "function" ? o.now.bind(o) : Date.now;
      t.$onAction(({ after: a, onError: l, name: s, args: c }) => {
        const d = El++;
        o.addTimelineEvent({
          layerId: eo,
          event: {
            time: r(),
            title: "🛫 " + s,
            subtitle: "start",
            data: {
              store: mt(t.$id),
              action: mt(s),
              args: c
            },
            groupId: d
          }
        }), a((f) => {
          oo = void 0, o.addTimelineEvent({
            layerId: eo,
            event: {
              time: r(),
              title: "🛬 " + s,
              subtitle: "end",
              data: {
                store: mt(t.$id),
                action: mt(s),
                args: c,
                result: f
              },
              groupId: d
            }
          });
        }), l((f) => {
          oo = void 0, o.addTimelineEvent({
            layerId: eo,
            event: {
              time: r(),
              logType: "error",
              title: "💥 " + s,
              subtitle: "end",
              data: {
                store: mt(t.$id),
                action: mt(s),
                args: c,
                error: f
              },
              groupId: d
            }
          });
        });
      }, !0), t._customProperties.forEach((a) => {
        ke(() => Se(t[a]), (l, s) => {
          o.notifyComponentUpdate(), o.sendInspectorState(Ve), Oo && o.addTimelineEvent({
            layerId: eo,
            event: {
              time: r(),
              title: "Change",
              subtitle: a,
              data: {
                newValue: l,
                oldValue: s
              },
              groupId: oo
            }
          });
        }, { deep: !0 });
      }), t.$subscribe(({ events: a, type: l }, s) => {
        if (o.notifyComponentUpdate(), o.sendInspectorState(Ve), !Oo)
          return;
        const c = {
          time: r(),
          title: Cu(l),
          data: yu({ store: mt(t.$id) }, xu(a)),
          groupId: oo
        };
        oo = void 0, l === It.patchFunction ? c.subtitle = "⤵️" : l === It.patchObject ? c.subtitle = "🧩" : a && !Array.isArray(a) && (c.subtitle = a.type), a && (c.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: a
          }
        }), o.addTimelineEvent({
          layerId: eo,
          event: c
        });
      }, { detached: !0, flush: "sync" });
      const n = t._hotUpdate;
      t._hotUpdate = Mt((a) => {
        n(a), o.addTimelineEvent({
          layerId: eo,
          event: {
            time: r(),
            title: "🔥 " + t.$id,
            subtitle: "HMR update",
            data: {
              store: mt(t.$id),
              info: mt("HMR update")
            }
          }
        }), o.notifyComponentUpdate(), o.sendInspectorTree(Ve), o.sendInspectorState(Ve);
      });
      const { $dispose: i } = t;
      t.$dispose = () => {
        i(), o.notifyComponentUpdate(), o.sendInspectorTree(Ve), o.sendInspectorState(Ve), o.getSettings().logStoreChanges && Le(`Disposed "${t.$id}" store 🗑`);
      }, o.notifyComponentUpdate(), o.sendInspectorTree(Ve), o.sendInspectorState(Ve), o.getSettings().logStoreChanges && Le(`"${t.$id}" store installed 🆕`);
    });
  }
  let El = 0, oo;
  function Gi(e, t) {
    const o = t.reduce((r, n) => (r[n] = un(e)[n], r), {});
    for (const r in o)
      e[r] = function() {
        const n = El, i = new Proxy(e, {
          get(...a) {
            return oo = n, Reflect.get(...a);
          },
          set(...a) {
            return oo = n, Reflect.set(...a);
          }
        });
        return o[r].apply(i, arguments);
      };
  }
  function $u({ app: e, store: t, options: o }) {
    if (!t.$id.startsWith("__hot:")) {
      if (o.state && (t._isOptionsAPI = !0), typeof o.state == "function") {
        Gi(
          // @ts-expect-error: can cast the store...
          t,
          Object.keys(o.actions)
        );
        const r = t._hotUpdate;
        un(t)._hotUpdate = function(n) {
          r.apply(this, arguments), Gi(t, Object.keys(n._hmrPayload.actions));
        };
      }
      Su(
        e,
        // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
        t
      );
    }
  }
  function Pu() {
    const e = bl(!0), t = e.run(() => H({}));
    let o = [], r = [];
    const n = Mt({
      install(i) {
        Cr(n), n._a = i, i.provide($l, n), i.config.globalProperties.$pinia = n, pr && wu(i, n), r.forEach((a) => o.push(a)), r = [];
      },
      use(i) {
        return !this._a && !yl ? r.push(i) : o.push(i), this;
      },
      _p: o,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: e,
      _s: /* @__PURE__ */ new Map(),
      state: t
    });
    return pr && typeof Proxy < "u" && n.use($u), n;
  }
  function _l(e, t) {
    for (const o in t) {
      const r = t[o];
      if (!(o in e))
        continue;
      const n = e[o];
      uo(n) && uo(r) && !br(r) && !mi(r) ? e[o] = _l(n, r) : e[o] = r;
    }
    return e;
  }
  const Bl = () => {
  };
  function Xi(e, t, o, r = Bl) {
    e.push(t);
    const n = () => {
      const i = e.indexOf(t);
      i > -1 && (e.splice(i, 1), r());
    };
    return !o && Gd() && Xd(n), n;
  }
  function Io(e, ...t) {
    e.slice().forEach((o) => {
      o(...t);
    });
  }
  const Tu = (e) => e();
  function Kn(e, t) {
    e instanceof Map && t instanceof Map && t.forEach((o, r) => e.set(r, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const o in t) {
      if (!t.hasOwnProperty(o))
        continue;
      const r = t[o], n = e[o];
      uo(n) && uo(r) && e.hasOwnProperty(o) && !br(r) && !mi(r) ? e[o] = Kn(n, r) : e[o] = r;
    }
    return e;
  }
  const zu = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
    /* istanbul ignore next */
    Symbol()
  );
  function Ru(e) {
    return !uo(e) || !e.hasOwnProperty(zu);
  }
  const { assign: ut } = Object;
  function qi(e) {
    return !!(br(e) && e.effect);
  }
  function Yi(e, t, o, r) {
    const { state: n, actions: i, getters: a } = t, l = o.state.value[e];
    let s;
    function c() {
      !l && (process.env.NODE_ENV === "production" || !r) && (o.state.value[e] = n ? n() : {});
      const d = process.env.NODE_ENV !== "production" && r ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        Vi(H(n ? n() : {}).value)
      ) : Vi(o.state.value[e]);
      return ut(d, i, Object.keys(a || {}).reduce((f, g) => (process.env.NODE_ENV !== "production" && g in d && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), f[g] = Mt(k(() => {
        Cr(o);
        const v = o._s.get(e);
        return a[g].call(v, v);
      })), f), {}));
    }
    return s = Jn(e, c, t, o, r, !0), s;
  }
  function Jn(e, t, o = {}, r, n, i) {
    let a;
    const l = ut({ actions: {} }, o);
    if (process.env.NODE_ENV !== "production" && !r._e.active)
      throw new Error("Pinia destroyed");
    const s = {
      deep: !0
      // flush: 'post',
    };
    process.env.NODE_ENV !== "production" && !yl && (s.onTrigger = (S) => {
      c ? v = S : c == !1 && !h._hotUpdating && (Array.isArray(v) ? v.push(S) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
    });
    let c, d, f = [], g = [], v;
    const p = r.state.value[e];
    !i && !p && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
    const b = H({});
    let x;
    function m(S) {
      let T;
      c = d = !1, process.env.NODE_ENV !== "production" && (v = []), typeof S == "function" ? (S(r.state.value[e]), T = {
        type: It.patchFunction,
        storeId: e,
        events: v
      }) : (Kn(r.state.value[e], S), T = {
        type: It.patchObject,
        payload: S,
        storeId: e,
        events: v
      });
      const M = x = Symbol();
      Rt().then(() => {
        x === M && (c = !0);
      }), d = !0, Io(f, T, r.state.value[e]);
    }
    const C = i ? function() {
      const { state: T } = o, M = T ? T() : {};
      this.$patch((L) => {
        ut(L, M);
      });
    } : (
      /* istanbul ignore next */
      process.env.NODE_ENV !== "production" ? () => {
        throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
      } : Bl
    );
    function D() {
      a.stop(), f = [], g = [], r._s.delete(e);
    }
    function I(S, T) {
      return function() {
        Cr(r);
        const M = Array.from(arguments), L = [], O = [];
        function N(Q) {
          L.push(Q);
        }
        function q(Q) {
          O.push(Q);
        }
        Io(g, {
          args: M,
          name: S,
          store: h,
          after: N,
          onError: q
        });
        let Y;
        try {
          Y = T.apply(this && this.$id === e ? this : h, M);
        } catch (Q) {
          throw Io(O, Q), Q;
        }
        return Y instanceof Promise ? Y.then((Q) => (Io(L, Q), Q)).catch((Q) => (Io(O, Q), Promise.reject(Q))) : (Io(L, Y), Y);
      };
    }
    const z = /* @__PURE__ */ Mt({
      actions: {},
      getters: {},
      state: [],
      hotState: b
    }), $ = {
      _p: r,
      // _s: scope,
      $id: e,
      $onAction: Xi.bind(null, g),
      $patch: m,
      $reset: C,
      $subscribe(S, T = {}) {
        const M = Xi(f, S, T.detached, () => L()), L = a.run(() => ke(() => r.state.value[e], (O) => {
          (T.flush === "sync" ? d : c) && S({
            storeId: e,
            type: It.direct,
            events: v
          }, O);
        }, ut({}, s, T)));
        return M;
      },
      $dispose: D
    }, h = Ud(process.env.NODE_ENV !== "production" || pr ? ut(
      {
        _hmrPayload: z,
        _customProperties: Mt(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      $
      // must be added later
      // setupStore
    ) : $);
    r._s.set(e, h);
    const P = r._a && r._a.runWithContext || Tu, y = r._e.run(() => (a = bl(), P(() => a.run(t))));
    for (const S in y) {
      const T = y[S];
      if (br(T) && !qi(T) || mi(T))
        process.env.NODE_ENV !== "production" && n ? kr(b.value, S, se(y, S)) : i || (p && Ru(T) && (br(T) ? T.value = p[S] : Kn(T, p[S])), r.state.value[e][S] = T), process.env.NODE_ENV !== "production" && z.state.push(S);
      else if (typeof T == "function") {
        const M = process.env.NODE_ENV !== "production" && n ? T : I(S, T);
        y[S] = M, process.env.NODE_ENV !== "production" && (z.actions[S] = T), l.actions[S] = T;
      } else
        process.env.NODE_ENV !== "production" && qi(T) && (z.getters[S] = i ? (
          // @ts-expect-error
          o.getters[S]
        ) : T, fn && (y._getters || // @ts-expect-error: same
        (y._getters = Mt([]))).push(S));
    }
    if (ut(h, y), ut(un(h), y), Object.defineProperty(h, "$state", {
      get: () => process.env.NODE_ENV !== "production" && n ? b.value : r.state.value[e],
      set: (S) => {
        if (process.env.NODE_ENV !== "production" && n)
          throw new Error("cannot set hotState");
        m((T) => {
          ut(T, S);
        });
      }
    }), process.env.NODE_ENV !== "production" && (h._hotUpdate = Mt((S) => {
      h._hotUpdating = !0, S._hmrPayload.state.forEach((T) => {
        if (T in h.$state) {
          const M = S.$state[T], L = h.$state[T];
          typeof M == "object" && uo(M) && uo(L) ? _l(M, L) : S.$state[T] = L;
        }
        kr(h, T, se(S.$state, T));
      }), Object.keys(h.$state).forEach((T) => {
        T in S.$state || Pn(h, T);
      }), c = !1, d = !1, r.state.value[e] = se(S._hmrPayload, "hotState"), d = !0, Rt().then(() => {
        c = !0;
      });
      for (const T in S._hmrPayload.actions) {
        const M = S[T];
        kr(h, T, I(T, M));
      }
      for (const T in S._hmrPayload.getters) {
        const M = S._hmrPayload.getters[T], L = i ? (
          // special handling of options api
          k(() => (Cr(r), M.call(h, h)))
        ) : M;
        kr(h, T, L);
      }
      Object.keys(h._hmrPayload.getters).forEach((T) => {
        T in S._hmrPayload.getters || Pn(h, T);
      }), Object.keys(h._hmrPayload.actions).forEach((T) => {
        T in S._hmrPayload.actions || Pn(h, T);
      }), h._hmrPayload = S._hmrPayload, h._getters = S._getters, h._hotUpdating = !1;
    })), pr) {
      const S = {
        writable: !0,
        configurable: !0,
        // avoid warning on devtools trying to display this property
        enumerable: !1
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((T) => {
        Object.defineProperty(h, T, ut({ value: h[T] }, S));
      });
    }
    return r._p.forEach((S) => {
      if (pr) {
        const T = a.run(() => S({
          store: h,
          app: r._a,
          pinia: r,
          options: l
        }));
        Object.keys(T || {}).forEach((M) => h._customProperties.add(M)), ut(h, T);
      } else
        ut(h, a.run(() => S({
          store: h,
          app: r._a,
          pinia: r,
          options: l
        })));
    }), process.env.NODE_ENV !== "production" && h.$state && typeof h.$state == "object" && typeof h.$state.constructor == "function" && !h.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${h.$id}".`), p && i && o.hydrate && o.hydrate(h.$state, p), c = !0, d = !0, h;
  }
  function Dr(e, t, o) {
    let r, n;
    const i = typeof t == "function";
    if (typeof e == "string")
      r = e, n = i ? o : t;
    else if (n = e, r = e.id, process.env.NODE_ENV !== "production" && typeof r != "string")
      throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
    function a(l, s) {
      const c = Vd();
      if (l = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (process.env.NODE_ENV === "test" && ur && ur._testing ? null : l) || (c ? ve($l, null) : null), l && Cr(l), process.env.NODE_ENV !== "production" && !ur)
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      l = ur, l._s.has(r) || (i ? Jn(r, t, n, l) : Yi(r, n, l), process.env.NODE_ENV !== "production" && (a._pinia = l));
      const d = l._s.get(r);
      if (process.env.NODE_ENV !== "production" && s) {
        const f = "__hot:" + r, g = i ? Jn(f, t, n, l, !0) : Yi(f, ut({}, n), l, !0);
        s._hotUpdate(g), delete l.state.value[f], l._s.delete(f);
      }
      if (process.env.NODE_ENV !== "production" && fn) {
        const f = No();
        if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
        !s) {
          const g = f.proxy, v = "_pStores" in g ? g._pStores : g._pStores = {};
          v[r] = d;
        }
      }
      return d;
    }
    return a.$id = r, a;
  }
  let on = [];
  const kl = /* @__PURE__ */ new WeakMap();
  function Iu() {
    on.forEach((e) => e(...kl.get(e))), on = [];
  }
  function wi(e, ...t) {
    kl.set(e, t), !on.includes(e) && on.push(e) === 1 && requestAnimationFrame(Iu);
  }
  function rn(e) {
    return e.composedPath()[0] || null;
  }
  function Du(e) {
    if (typeof e == "number")
      return {
        "": e.toString()
      };
    const t = {};
    return e.split(/ +/).forEach((o) => {
      if (o === "")
        return;
      const [r, n] = o.split(":");
      n === void 0 ? t[""] = r : t[r] = n;
    }), t;
  }
  function rr(e, t) {
    var o;
    if (e == null)
      return;
    const r = Du(e);
    if (t === void 0)
      return r[""];
    if (typeof t == "string")
      return (o = r[t]) !== null && o !== void 0 ? o : r[""];
    if (Array.isArray(t)) {
      for (let n = t.length - 1; n >= 0; --n) {
        const i = t[n];
        if (i in r)
          return r[i];
      }
      return r[""];
    } else {
      let n, i = -1;
      return Object.keys(r).forEach((a) => {
        const l = Number(a);
        !Number.isNaN(l) && t >= l && l >= i && (i = l, n = r[a]);
      }), n;
    }
  }
  function Mo(e) {
    if (e != null)
      return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
  }
  function Eu(e, t) {
    const o = e.trim().split(/\s+/g), r = {
      top: o[0]
    };
    switch (o.length) {
      case 1:
        r.right = o[0], r.bottom = o[0], r.left = o[0];
        break;
      case 2:
        r.right = o[1], r.left = o[1], r.bottom = o[0];
        break;
      case 3:
        r.right = o[1], r.bottom = o[2], r.left = o[1];
        break;
      case 4:
        r.right = o[1], r.bottom = o[2], r.left = o[3];
        break;
      default:
        throw new Error("[seemly/getMargin]:" + e + " is not a valid value.");
    }
    return t === void 0 ? r : r[t];
  }
  const Zi = {
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
  }, Vo = "^\\s*", Uo = "\\s*$", ro = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", no = "([0-9A-Fa-f])", io = "([0-9A-Fa-f]{2})", _u = new RegExp(`${Vo}rgb\\s*\\(${ro},${ro},${ro}\\)${Uo}`), Bu = new RegExp(`${Vo}rgba\\s*\\(${ro},${ro},${ro},${ro}\\)${Uo}`), ku = new RegExp(`${Vo}#${no}${no}${no}${Uo}`), Ou = new RegExp(`${Vo}#${io}${io}${io}${Uo}`), Mu = new RegExp(`${Vo}#${no}${no}${no}${no}${Uo}`), Hu = new RegExp(`${Vo}#${io}${io}${io}${io}${Uo}`);
  function et(e) {
    return parseInt(e, 16);
  }
  function Ht(e) {
    try {
      let t;
      if (t = Ou.exec(e))
        return [et(t[1]), et(t[2]), et(t[3]), 1];
      if (t = _u.exec(e))
        return [Ue(t[1]), Ue(t[5]), Ue(t[9]), 1];
      if (t = Bu.exec(e))
        return [
          Ue(t[1]),
          Ue(t[5]),
          Ue(t[9]),
          hr(t[13])
        ];
      if (t = ku.exec(e))
        return [
          et(t[1] + t[1]),
          et(t[2] + t[2]),
          et(t[3] + t[3]),
          1
        ];
      if (t = Hu.exec(e))
        return [
          et(t[1]),
          et(t[2]),
          et(t[3]),
          hr(et(t[4]) / 255)
        ];
      if (t = Mu.exec(e))
        return [
          et(t[1] + t[1]),
          et(t[2] + t[2]),
          et(t[3] + t[3]),
          hr(et(t[4] + t[4]) / 255)
        ];
      if (e in Zi)
        return Ht(Zi[e]);
      throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
    } catch (t) {
      throw t;
    }
  }
  function Au(e) {
    return e > 1 ? 1 : e < 0 ? 0 : e;
  }
  function Qn(e, t, o, r) {
    return `rgba(${Ue(e)}, ${Ue(t)}, ${Ue(o)}, ${Au(r)})`;
  }
  function Tn(e, t, o, r, n) {
    return Ue((e * t * (1 - r) + o * r) / n);
  }
  function te(e, t) {
    Array.isArray(e) || (e = Ht(e)), Array.isArray(t) || (t = Ht(t));
    const o = e[3], r = t[3], n = hr(o + r - o * r);
    return Qn(Tn(e[0], o, t[0], r, n), Tn(e[1], o, t[1], r, n), Tn(e[2], o, t[2], r, n), n);
  }
  function X(e, t) {
    const [o, r, n, i = 1] = Array.isArray(e) ? e : Ht(e);
    return t.alpha ? Qn(o, r, n, t.alpha) : Qn(o, r, n, i);
  }
  function _e(e, t) {
    const [o, r, n, i = 1] = Array.isArray(e) ? e : Ht(e), { lightness: a = 1, alpha: l = 1 } = t;
    return Lu([o * a, r * a, n * a, i * l]);
  }
  function hr(e) {
    const t = Math.round(Number(e) * 100) / 100;
    return t > 1 ? 1 : t < 0 ? 0 : t;
  }
  function Ue(e) {
    const t = Math.round(Number(e));
    return t > 255 ? 255 : t < 0 ? 0 : t;
  }
  function Lu(e) {
    const [t, o, r] = e;
    return 3 in e ? `rgba(${Ue(t)}, ${Ue(o)}, ${Ue(r)}, ${hr(e[3])})` : `rgba(${Ue(t)}, ${Ue(o)}, ${Ue(r)}, 1)`;
  }
  function nn(e = 8) {
    return Math.random().toString(16).slice(2, 2 + e);
  }
  function Fu(e, t = "default", o = []) {
    const n = e.$slots[t];
    return n === void 0 ? o : n();
  }
  function Wu(e, t = [], o) {
    const r = {};
    return t.forEach((n) => {
      r[n] = e[n];
    }), Object.assign(r, o);
  }
  function ju(e, t = [], o) {
    const r = {};
    return Object.getOwnPropertyNames(e).forEach((i) => {
      t.includes(i) || (r[i] = e[i]);
    }), Object.assign(r, o);
  }
  function ao(e, t = !0, o = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && o.push(xt(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          ao(r, t, o);
          return;
        }
        if (r.type === ft) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && ao(r.children, t, o);
        } else
          r.type !== bi && o.push(r);
      }
    }), o;
  }
  function xe(e, ...t) {
    if (Array.isArray(e))
      e.forEach((o) => xe(o, ...t));
    else
      return e(...t);
  }
  const Nu = (e, ...t) => typeof e == "function" ? e(...t) : typeof e == "string" ? xt(e) : typeof e == "number" ? xt(String(e)) : null, Ki = /* @__PURE__ */ new Set();
  function bt(e, t) {
    const o = `[naive/${e}]: ${t}`;
    Ki.has(o) || (Ki.add(o), console.error(o));
  }
  function yr(e, t) {
    console.error(`[naive/${e}]: ${t}`);
  }
  function po(e, t) {
    throw new Error(`[naive/${e}]: ${t}`);
  }
  function Ji(e, t = "default", o = void 0) {
    const r = e[t];
    if (!r)
      return yr("getFirstSlotVNode", `slot[${t}] is empty`), null;
    const n = ao(r(o));
    return n.length === 1 ? n[0] : (yr("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
  }
  function Er(e) {
    return e.some((t) => qd(t) ? !(t.type === bi || t.type === ft && !Er(t.children)) : !0) ? e : null;
  }
  function Ao(e, t) {
    return e && Er(e()) || t();
  }
  function Vu(e, t, o) {
    return e && Er(e(t)) || o(t);
  }
  function Ct(e, t) {
    const o = e && Er(e());
    return t(o || null);
  }
  function ei(e) {
    return !(e && Er(e()));
  }
  function Uu(e) {
    var t;
    const o = (t = e.dirs) === null || t === void 0 ? void 0 : t.find(({ dir: r }) => r === Ir);
    return !!(o && o.value === !1);
  }
  const Qi = ie({
    render() {
      var e, t;
      return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
    }
  }), Gu = /^(\d|\.)+$/, ea = /(\d|\.)+/;
  function Ot(e, { c: t = 1, offset: o = 0, attachPx: r = !0 } = {}) {
    if (typeof e == "number") {
      const n = (e + o) * t;
      return n === 0 ? "0" : `${n}px`;
    } else if (typeof e == "string")
      if (Gu.test(e)) {
        const n = (Number(e) + o) * t;
        return r ? n === 0 ? "0" : `${n}px` : `${n}`;
      } else {
        const n = ea.exec(e);
        return n ? e.replace(ea, String((Number(n[0]) + o) * t)) : e;
      }
    return e;
  }
  function ta(e) {
    return e.replace(/#|\(|\)|,|\s/g, "_");
  }
  function Xu(e) {
    let t = 0;
    for (let o = 0; o < e.length; ++o)
      e[o] === "&" && ++t;
    return t;
  }
  const Ol = /\s*,(?![^(]*\))\s*/g, qu = /\s+/g;
  function Yu(e, t) {
    const o = [];
    return t.split(Ol).forEach((r) => {
      let n = Xu(r);
      if (n) {
        if (n === 1) {
          e.forEach((a) => {
            o.push(r.replace("&", a));
          });
          return;
        }
      } else {
        e.forEach((a) => {
          o.push(
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            (a && a + " ") + r
          );
        });
        return;
      }
      let i = [
        r
      ];
      for (; n--; ) {
        const a = [];
        i.forEach((l) => {
          e.forEach((s) => {
            a.push(l.replace("&", s));
          });
        }), i = a;
      }
      i.forEach((a) => o.push(a));
    }), o;
  }
  function Zu(e, t) {
    const o = [];
    return t.split(Ol).forEach((r) => {
      e.forEach((n) => {
        o.push((n && n + " ") + r);
      });
    }), o;
  }
  function Ku(e) {
    let t = [""];
    return e.forEach((o) => {
      o = o && o.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      o && (o.includes("&") ? t = Yu(t, o) : t = Zu(t, o));
    }), t.join(", ").replace(qu, " ");
  }
  function oa(e) {
    if (!e)
      return;
    const t = e.parentElement;
    t && t.removeChild(e);
  }
  function pn(e) {
    return document.querySelector(`style[cssr-id="${e}"]`);
  }
  function Ju(e) {
    const t = document.createElement("style");
    return t.setAttribute("cssr-id", e), t;
  }
  function Or(e) {
    return e ? /^\s*@(s|m)/.test(e) : !1;
  }
  const Qu = /[A-Z]/g;
  function Ml(e) {
    return e.replace(Qu, (t) => "-" + t.toLowerCase());
  }
  function ef(e, t = "  ") {
    return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((o) => t + `  ${Ml(o[0])}: ${o[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
  }
  function tf(e, t, o) {
    return typeof e == "function" ? e({
      context: t.context,
      props: o
    }) : e;
  }
  function ra(e, t, o, r) {
    if (!t)
      return "";
    const n = tf(t, o, r);
    if (!n)
      return "";
    if (typeof n == "string")
      return `${e} {
${n}
}`;
    const i = Object.keys(n);
    if (i.length === 0)
      return o.config.keepEmptyBlock ? e + ` {
}` : "";
    const a = e ? [
      e + " {"
    ] : [];
    return i.forEach((l) => {
      const s = n[l];
      if (l === "raw") {
        a.push(`
` + s + `
`);
        return;
      }
      l = Ml(l), s != null && a.push(`  ${l}${ef(s)}`);
    }), e && a.push("}"), a.join(`
`);
  }
  function ti(e, t, o) {
    e && e.forEach((r) => {
      if (Array.isArray(r))
        ti(r, t, o);
      else if (typeof r == "function") {
        const n = r(t);
        Array.isArray(n) ? ti(n, t, o) : n && o(n);
      } else
        r && o(r);
    });
  }
  function Hl(e, t, o, r, n, i) {
    const a = e.$;
    let l = "";
    if (!a || typeof a == "string")
      Or(a) ? l = a : t.push(a);
    else if (typeof a == "function") {
      const d = a({
        context: r.context,
        props: n
      });
      Or(d) ? l = d : t.push(d);
    } else if (a.before && a.before(r.context), !a.$ || typeof a.$ == "string")
      Or(a.$) ? l = a.$ : t.push(a.$);
    else if (a.$) {
      const d = a.$({
        context: r.context,
        props: n
      });
      Or(d) ? l = d : t.push(d);
    }
    const s = Ku(t), c = ra(s, e.props, r, n);
    l ? (o.push(`${l} {`), i && c && i.insertRule(`${l} {
${c}
}
`)) : (i && c && i.insertRule(c), !i && c.length && o.push(c)), e.children && ti(e.children, {
      context: r.context,
      props: n
    }, (d) => {
      if (typeof d == "string") {
        const f = ra(s, { raw: d }, r, n);
        i ? i.insertRule(f) : o.push(f);
      } else
        Hl(d, t, o, r, n, i);
    }), t.pop(), l && o.push("}"), a && a.after && a.after(r.context);
  }
  function Al(e, t, o, r = !1) {
    const n = [];
    return Hl(e, [], n, t, o, r ? e.instance.__styleSheet : void 0), r ? "" : n.join(`

`);
  }
  function wr(e) {
    for (var t = 0, o, r = 0, n = e.length; n >= 4; ++r, n -= 4)
      o = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, o = /* Math.imul(k, m): */
      (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16), o ^= /* k >>> r: */
      o >>> 24, t = /* Math.imul(k, m): */
      (o & 65535) * 1540483477 + ((o >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
    switch (n) {
      case 3:
        t ^= (e.charCodeAt(r + 2) & 255) << 16;
      case 2:
        t ^= (e.charCodeAt(r + 1) & 255) << 8;
      case 1:
        t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
        (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
    }
    return t ^= t >>> 13, t = /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
  }
  typeof window < "u" && (window.__cssrContext = {});
  function of(e, t, o) {
    const { els: r } = t;
    if (o === void 0)
      r.forEach(oa), t.els = [];
    else {
      const n = pn(o);
      n && r.includes(n) && (oa(n), t.els = r.filter((i) => i !== n));
    }
  }
  function na(e, t) {
    e.push(t);
  }
  function rf(e, t, o, r, n, i, a, l, s) {
    if (i && !s) {
      if (o === void 0) {
        console.error("[css-render/mount]: `id` is required in `silent` mode.");
        return;
      }
      const g = window.__cssrContext;
      g[o] || (g[o] = !0, Al(t, e, r, i));
      return;
    }
    let c;
    if (o === void 0 && (c = t.render(r), o = wr(c)), s) {
      s.adapter(o, c ?? t.render(r));
      return;
    }
    const d = pn(o);
    if (d !== null && !a)
      return d;
    const f = d ?? Ju(o);
    if (c === void 0 && (c = t.render(r)), f.textContent = c, d !== null)
      return d;
    if (l) {
      const g = document.head.querySelector(`meta[name="${l}"]`);
      if (g)
        return document.head.insertBefore(f, g), na(t.els, f), f;
    }
    return n ? document.head.insertBefore(f, document.head.querySelector("style, link")) : document.head.appendChild(f), na(t.els, f), f;
  }
  function nf(e) {
    return Al(this, this.instance, e);
  }
  function af(e = {}) {
    const { id: t, ssr: o, props: r, head: n = !1, silent: i = !1, force: a = !1, anchorMetaName: l } = e;
    return rf(this.instance, this, t, r, n, i, a, l, o);
  }
  function lf(e = {}) {
    const { id: t } = e;
    of(this.instance, this, t);
  }
  const Mr = function(e, t, o, r) {
    return {
      instance: e,
      $: t,
      props: o,
      children: r,
      els: [],
      render: nf,
      mount: af,
      unmount: lf
    };
  }, sf = function(e, t, o, r) {
    return Array.isArray(t) ? Mr(e, { $: null }, null, t) : Array.isArray(o) ? Mr(e, t, null, o) : Array.isArray(r) ? Mr(e, t, o, r) : Mr(e, t, o, null);
  };
  function Ll(e = {}) {
    let t = null;
    const o = {
      c: (...r) => sf(o, ...r),
      use: (r, ...n) => r.install(o, ...n),
      find: pn,
      context: {},
      config: e,
      get __styleSheet() {
        if (!t) {
          const r = document.createElement("style");
          return document.head.appendChild(r), t = document.styleSheets[document.styleSheets.length - 1], t;
        }
        return t;
      }
    };
    return o;
  }
  function cf(e, t) {
    if (e === void 0)
      return !1;
    if (t) {
      const { context: { ids: o } } = t;
      return o.has(e);
    }
    return pn(e) !== null;
  }
  function df(e) {
    let t = ".", o = "__", r = "--", n;
    if (e) {
      let p = e.blockPrefix;
      p && (t = p), p = e.elementPrefix, p && (o = p), p = e.modifierPrefix, p && (r = p);
    }
    const i = {
      install(p) {
        n = p.c;
        const b = p.context;
        b.bem = {}, b.bem.b = null, b.bem.els = null;
      }
    };
    function a(p) {
      let b, x;
      return {
        before(m) {
          b = m.bem.b, x = m.bem.els, m.bem.els = null;
        },
        after(m) {
          m.bem.b = b, m.bem.els = x;
        },
        $({ context: m, props: C }) {
          return p = typeof p == "string" ? p : p({ context: m, props: C }), m.bem.b = p, `${(C == null ? void 0 : C.bPrefix) || t}${m.bem.b}`;
        }
      };
    }
    function l(p) {
      let b;
      return {
        before(x) {
          b = x.bem.els;
        },
        after(x) {
          x.bem.els = b;
        },
        $({ context: x, props: m }) {
          return p = typeof p == "string" ? p : p({ context: x, props: m }), x.bem.els = p.split(",").map((C) => C.trim()), x.bem.els.map((C) => `${(m == null ? void 0 : m.bPrefix) || t}${x.bem.b}${o}${C}`).join(", ");
        }
      };
    }
    function s(p) {
      return {
        $({ context: b, props: x }) {
          p = typeof p == "string" ? p : p({ context: b, props: x });
          const m = p.split(",").map((I) => I.trim());
          function C(I) {
            return m.map((z) => `&${(x == null ? void 0 : x.bPrefix) || t}${b.bem.b}${I !== void 0 ? `${o}${I}` : ""}${r}${z}`).join(", ");
          }
          const D = b.bem.els;
          if (D !== null) {
            if (process.env.NODE_ENV !== "production" && D.length >= 2)
              throw Error(`[css-render/plugin-bem]: m(${p}) is invalid, using modifier inside multiple elements is not allowed`);
            return C(D[0]);
          } else
            return C();
        }
      };
    }
    function c(p) {
      return {
        $({ context: b, props: x }) {
          p = typeof p == "string" ? p : p({ context: b, props: x });
          const m = b.bem.els;
          if (process.env.NODE_ENV !== "production" && m !== null && m.length >= 2)
            throw Error(`[css-render/plugin-bem]: notM(${p}) is invalid, using modifier inside multiple elements is not allowed`);
          return `&:not(${(x == null ? void 0 : x.bPrefix) || t}${b.bem.b}${m !== null && m.length > 0 ? `${o}${m[0]}` : ""}${r}${p})`;
        }
      };
    }
    return Object.assign(i, {
      cB: (...p) => n(a(p[0]), p[1], p[2]),
      cE: (...p) => n(l(p[0]), p[1], p[2]),
      cM: (...p) => n(s(p[0]), p[1], p[2]),
      cNotM: (...p) => n(c(p[0]), p[1], p[2])
    }), i;
  }
  function ee(e, t) {
    return e + (t === "default" ? "" : t.replace(/^[a-z]/, (o) => o.toUpperCase()));
  }
  ee("abc", "def");
  const uf = "n", ff = `.${uf}-`, pf = "__", hf = "--", Fl = Ll(), Wl = df({
    blockPrefix: ff,
    elementPrefix: pf,
    modifierPrefix: hf
  });
  Fl.use(Wl);
  const { c: E, find: d5 } = Fl, { cB: R, cE: A, cM: V, cNotM: nt } = Wl, gf = (...e) => E(">", [R(...e)]);
  let zn;
  function vf() {
    return zn === void 0 && (zn = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), zn;
  }
  const ho = typeof document < "u" && typeof window < "u";
  function mf(e) {
    const t = H(!!e.value);
    if (t.value)
      return qn(t);
    const o = ke(e, (r) => {
      r && (t.value = !0, o());
    });
    return qn(t);
  }
  function Ze(e) {
    const t = k(e), o = H(t.value);
    return ke(t, (r) => {
      o.value = r;
    }), typeof e == "function" ? o : {
      __v_isRef: !0,
      get value() {
        return o.value;
      },
      set value(r) {
        e.set(r);
      }
    };
  }
  const jl = typeof window < "u";
  let Lo, gr;
  const bf = () => {
    var e, t;
    Lo = jl ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, gr = !1, Lo !== void 0 ? Lo.then(() => {
      gr = !0;
    }) : gr = !0;
  };
  bf();
  function Nl(e) {
    if (gr)
      return;
    let t = !1;
    yt(() => {
      gr || Lo == null || Lo.then(() => {
        t || e();
      });
    }), st(() => {
      t = !0;
    });
  }
  function Jr(e) {
    return e.composedPath()[0];
  }
  const xf = {
    mousemoveoutside: /* @__PURE__ */ new WeakMap(),
    clickoutside: /* @__PURE__ */ new WeakMap()
  };
  function Cf(e, t, o) {
    if (e === "mousemoveoutside") {
      const r = (n) => {
        t.contains(Jr(n)) || o(n);
      };
      return {
        mousemove: r,
        touchstart: r
      };
    } else if (e === "clickoutside") {
      let r = !1;
      const n = (a) => {
        r = !t.contains(Jr(a));
      }, i = (a) => {
        r && (t.contains(Jr(a)) || o(a));
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
  function Vl(e, t, o) {
    const r = xf[e];
    let n = r.get(t);
    n === void 0 && r.set(t, n = /* @__PURE__ */ new WeakMap());
    let i = n.get(o);
    return i === void 0 && n.set(o, i = Cf(e, t, o)), i;
  }
  function yf(e, t, o, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = Vl(e, t, o);
      return Object.keys(n).forEach((i) => {
        Oe(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function wf(e, t, o, r) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
      const n = Vl(e, t, o);
      return Object.keys(n).forEach((i) => {
        Pe(i, document, n[i], r);
      }), !0;
    }
    return !1;
  }
  function Sf() {
    if (typeof window > "u")
      return {
        on: () => {
        },
        off: () => {
        }
      };
    const e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
    function o() {
      e.set(this, !0);
    }
    function r() {
      e.set(this, !0), t.set(this, !0);
    }
    function n(h, P, y) {
      const S = h[P];
      return h[P] = function() {
        return y.apply(h, arguments), S.apply(h, arguments);
      }, h;
    }
    function i(h, P) {
      h[P] = Event.prototype[P];
    }
    const a = /* @__PURE__ */ new WeakMap(), l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function s() {
      var h;
      return (h = a.get(this)) !== null && h !== void 0 ? h : null;
    }
    function c(h, P) {
      l !== void 0 && Object.defineProperty(h, "currentTarget", {
        configurable: !0,
        enumerable: !0,
        get: P ?? l.get
      });
    }
    const d = {
      bubble: {},
      capture: {}
    }, f = {};
    function g() {
      const h = function(P) {
        const { type: y, eventPhase: S, bubbles: T } = P, M = Jr(P);
        if (S === 2)
          return;
        const L = S === 1 ? "capture" : "bubble";
        let O = M;
        const N = [];
        for (; O === null && (O = window), N.push(O), O !== window; )
          O = O.parentNode || null;
        const q = d.capture[y], Y = d.bubble[y];
        if (n(P, "stopPropagation", o), n(P, "stopImmediatePropagation", r), c(P, s), L === "capture") {
          if (q === void 0)
            return;
          for (let Q = N.length - 1; Q >= 0 && !e.has(P); --Q) {
            const fe = N[Q], be = q.get(fe);
            if (be !== void 0) {
              a.set(P, fe);
              for (const Ie of be) {
                if (t.has(P))
                  break;
                Ie(P);
              }
            }
            if (Q === 0 && !T && Y !== void 0) {
              const Ie = Y.get(fe);
              if (Ie !== void 0)
                for (const Fe of Ie) {
                  if (t.has(P))
                    break;
                  Fe(P);
                }
            }
          }
        } else if (L === "bubble") {
          if (Y === void 0)
            return;
          for (let Q = 0; Q < N.length && !e.has(P); ++Q) {
            const fe = N[Q], be = Y.get(fe);
            if (be !== void 0) {
              a.set(P, fe);
              for (const Ie of be) {
                if (t.has(P))
                  break;
                Ie(P);
              }
            }
          }
        }
        i(P, "stopPropagation"), i(P, "stopImmediatePropagation"), c(P);
      };
      return h.displayName = "evtdUnifiedHandler", h;
    }
    function v() {
      const h = function(P) {
        const { type: y, eventPhase: S } = P;
        if (S !== 2)
          return;
        const T = f[y];
        T !== void 0 && T.forEach((M) => M(P));
      };
      return h.displayName = "evtdUnifiedWindowEventHandler", h;
    }
    const p = g(), b = v();
    function x(h, P) {
      const y = d[h];
      return y[P] === void 0 && (y[P] = /* @__PURE__ */ new Map(), window.addEventListener(P, p, h === "capture")), y[P];
    }
    function m(h) {
      return f[h] === void 0 && (f[h] = /* @__PURE__ */ new Set(), window.addEventListener(h, b)), f[h];
    }
    function C(h, P) {
      let y = h.get(P);
      return y === void 0 && h.set(P, y = /* @__PURE__ */ new Set()), y;
    }
    function D(h, P, y, S) {
      const T = d[P][y];
      if (T !== void 0) {
        const M = T.get(h);
        if (M !== void 0 && M.has(S))
          return !0;
      }
      return !1;
    }
    function I(h, P) {
      const y = f[h];
      return !!(y !== void 0 && y.has(P));
    }
    function z(h, P, y, S) {
      let T;
      if (typeof S == "object" && S.once === !0 ? T = (q) => {
        $(h, P, T, S), y(q);
      } : T = y, yf(h, P, T, S))
        return;
      const L = S === !0 || typeof S == "object" && S.capture === !0 ? "capture" : "bubble", O = x(L, h), N = C(O, P);
      if (N.has(T) || N.add(T), P === window) {
        const q = m(h);
        q.has(T) || q.add(T);
      }
    }
    function $(h, P, y, S) {
      if (wf(h, P, y, S))
        return;
      const M = S === !0 || typeof S == "object" && S.capture === !0, L = M ? "capture" : "bubble", O = x(L, h), N = C(O, P);
      if (P === window && !D(P, M ? "bubble" : "capture", h, y) && I(h, y)) {
        const Y = f[h];
        Y.delete(y), Y.size === 0 && (window.removeEventListener(h, b), f[h] = void 0);
      }
      N.has(y) && N.delete(y), N.size === 0 && O.delete(P), O.size === 0 && (window.removeEventListener(h, p, L === "capture"), d[L][h] = void 0);
    }
    return {
      on: z,
      off: $
    };
  }
  const { on: Oe, off: Pe } = Sf();
  function hn(e, t) {
    return ke(e, (o) => {
      o !== void 0 && (t.value = o);
    }), k(() => e.value === void 0 ? t.value : e.value);
  }
  function gn() {
    const e = H(!1);
    return yt(() => {
      e.value = !0;
    }), qn(e);
  }
  function oi(e, t) {
    return k(() => {
      for (const o of t)
        if (e[o] !== void 0)
          return e[o];
      return e[t[t.length - 1]];
    });
  }
  const $f = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  !window.MSStream;
  function Pf() {
    return $f;
  }
  const Tf = {
    // mobile
    // 0 ~ 640 doesn't mean it should display well in all the range,
    // but means you should treat it like a mobile phone.)
    xs: 0,
    s: 640,
    m: 1024,
    l: 1280,
    xl: 1536,
    "2xl": 1920
    // normal desktop display
  };
  function zf(e) {
    return `(min-width: ${e}px)`;
  }
  const nr = {};
  function Rf(e = Tf) {
    if (!jl)
      return k(() => []);
    if (typeof window.matchMedia != "function")
      return k(() => []);
    const t = H({}), o = Object.keys(e), r = (n, i) => {
      n.matches ? t.value[i] = !0 : t.value[i] = !1;
    };
    return o.forEach((n) => {
      const i = e[n];
      let a, l;
      nr[i] === void 0 ? (a = window.matchMedia(zf(i)), a.addEventListener ? a.addEventListener("change", (s) => {
        l.forEach((c) => {
          c(s, n);
        });
      }) : a.addListener && a.addListener((s) => {
        l.forEach((c) => {
          c(s, n);
        });
      }), l = /* @__PURE__ */ new Set(), nr[i] = {
        mql: a,
        cbs: l
      }) : (a = nr[i].mql, l = nr[i].cbs), l.add(r), a.matches && l.forEach((s) => {
        s(a, n);
      });
    }), st(() => {
      o.forEach((n) => {
        const { cbs: i } = nr[e[n]];
        i.has(r) && i.delete(r);
      });
    }), k(() => {
      const { value: n } = t;
      return o.filter((i) => n[i]);
    });
  }
  const If = "n-internal-select-menu-body", Ul = "n-modal-body", Gl = "n-drawer-body", Xl = "n-popover-body", ql = "__disabled__";
  function Wo(e) {
    const t = ve(Ul, null), o = ve(Gl, null), r = ve(Xl, null), n = ve(If, null), i = H();
    if (typeof document < "u") {
      i.value = document.fullscreenElement;
      const a = () => {
        i.value = document.fullscreenElement;
      };
      yt(() => {
        Oe("fullscreenchange", document, a);
      }), st(() => {
        Pe("fullscreenchange", document, a);
      });
    }
    return Ze(() => {
      var a;
      const { to: l } = e;
      return l !== void 0 ? l === !1 ? ql : l === !0 ? i.value || "body" : l : t != null && t.value ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : o != null && o.value ? o.value : r != null && r.value ? r.value : n != null && n.value ? n.value : l ?? (i.value || "body");
    });
  }
  Wo.tdkey = ql;
  Wo.propTo = {
    type: [String, Object, Boolean],
    default: void 0
  };
  function ri(e, t, o = "default") {
    const r = t[o];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
    return r();
  }
  function ni(e, t = !0, o = []) {
    return e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") && o.push(xt(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          ni(r, t, o);
          return;
        }
        if (r.type === ft) {
          if (r.children === null)
            return;
          Array.isArray(r.children) && ni(r.children, t, o);
        } else
          r.type !== bi && o.push(r);
      }
    }), o;
  }
  function ia(e, t, o = "default") {
    const r = t[o];
    if (r === void 0)
      throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
    const n = ni(r());
    if (n.length === 1)
      return n[0];
    throw new Error(`[vueuc/${e}]: slot[${o}] should have exactly one child.`);
  }
  let Wt = null;
  function Yl() {
    if (Wt === null && (Wt = document.getElementById("v-binder-view-measurer"), Wt === null)) {
      Wt = document.createElement("div"), Wt.id = "v-binder-view-measurer";
      const { style: e } = Wt;
      e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(Wt);
    }
    return Wt.getBoundingClientRect();
  }
  function Df(e, t) {
    const o = Yl();
    return {
      top: t,
      left: e,
      height: 0,
      width: 0,
      right: o.width - e,
      bottom: o.height - t
    };
  }
  function Rn(e) {
    const t = e.getBoundingClientRect(), o = Yl();
    return {
      left: t.left - o.left,
      top: t.top - o.top,
      bottom: o.height + o.top - t.bottom,
      right: o.width + o.left - t.right,
      width: t.width,
      height: t.height
    };
  }
  function Ef(e) {
    return e.nodeType === 9 ? null : e.parentNode;
  }
  function Zl(e) {
    if (e === null)
      return null;
    const t = Ef(e);
    if (t === null)
      return null;
    if (t.nodeType === 9)
      return document;
    if (t.nodeType === 1) {
      const { overflow: o, overflowX: r, overflowY: n } = getComputedStyle(t);
      if (/(auto|scroll|overlay)/.test(o + n + r))
        return t;
    }
    return Zl(t);
  }
  const _f = ie({
    name: "Binder",
    props: {
      syncTargetWithParent: Boolean,
      syncTarget: {
        type: Boolean,
        default: !0
      }
    },
    setup(e) {
      var t;
      lt("VBinder", (t = No()) === null || t === void 0 ? void 0 : t.proxy);
      const o = ve("VBinder", null), r = H(null), n = (m) => {
        r.value = m, o && e.syncTargetWithParent && o.setTargetRef(m);
      };
      let i = [];
      const a = () => {
        let m = r.value;
        for (; m = Zl(m), m !== null; )
          i.push(m);
        for (const C of i)
          Oe("scroll", C, f, !0);
      }, l = () => {
        for (const m of i)
          Pe("scroll", m, f, !0);
        i = [];
      }, s = /* @__PURE__ */ new Set(), c = (m) => {
        s.size === 0 && a(), s.has(m) || s.add(m);
      }, d = (m) => {
        s.has(m) && s.delete(m), s.size === 0 && l();
      }, f = () => {
        wi(g);
      }, g = () => {
        s.forEach((m) => m());
      }, v = /* @__PURE__ */ new Set(), p = (m) => {
        v.size === 0 && Oe("resize", window, x), v.has(m) || v.add(m);
      }, b = (m) => {
        v.has(m) && v.delete(m), v.size === 0 && Pe("resize", window, x);
      }, x = () => {
        v.forEach((m) => m());
      };
      return st(() => {
        Pe("resize", window, x), l();
      }), {
        targetRef: r,
        setTargetRef: n,
        addScrollListener: c,
        removeScrollListener: d,
        addResizeListener: p,
        removeResizeListener: b
      };
    },
    render() {
      return ri("binder", this.$slots);
    }
  }), Bf = _f, kf = ie({
    name: "Target",
    setup() {
      const { setTargetRef: e, syncTarget: t } = ve("VBinder");
      return {
        syncTarget: t,
        setTargetDirective: {
          mounted: e,
          updated: e
        }
      };
    },
    render() {
      const { syncTarget: e, setTargetDirective: t } = this;
      return e ? co(ia("follower", this.$slots), [
        [t]
      ]) : ia("follower", this.$slots);
    }
  }), Do = "@@mmoContext", Of = {
    mounted(e, { value: t }) {
      e[Do] = {
        handler: void 0
      }, typeof t == "function" && (e[Do].handler = t, Oe("mousemoveoutside", e, t));
    },
    updated(e, { value: t }) {
      const o = e[Do];
      typeof t == "function" ? o.handler ? o.handler !== t && (Pe("mousemoveoutside", e, o.handler), o.handler = t, Oe("mousemoveoutside", e, t)) : (e[Do].handler = t, Oe("mousemoveoutside", e, t)) : o.handler && (Pe("mousemoveoutside", e, o.handler), o.handler = void 0);
    },
    unmounted(e) {
      const { handler: t } = e[Do];
      t && Pe("mousemoveoutside", e, t), e[Do].handler = void 0;
    }
  }, Mf = Of, Eo = "@@coContext", Hf = {
    mounted(e, { value: t, modifiers: o }) {
      e[Eo] = {
        handler: void 0
      }, typeof t == "function" && (e[Eo].handler = t, Oe("clickoutside", e, t, {
        capture: o.capture
      }));
    },
    updated(e, { value: t, modifiers: o }) {
      const r = e[Eo];
      typeof t == "function" ? r.handler ? r.handler !== t && (Pe("clickoutside", e, r.handler, {
        capture: o.capture
      }), r.handler = t, Oe("clickoutside", e, t, {
        capture: o.capture
      })) : (e[Eo].handler = t, Oe("clickoutside", e, t, {
        capture: o.capture
      })) : r.handler && (Pe("clickoutside", e, r.handler, {
        capture: o.capture
      }), r.handler = void 0);
    },
    unmounted(e, { modifiers: t }) {
      const { handler: o } = e[Eo];
      o && Pe("clickoutside", e, o, {
        capture: t.capture
      }), e[Eo].handler = void 0;
    }
  }, aa = Hf;
  function Af(e, t) {
    console.error(`[vdirs/${e}]: ${t}`);
  }
  class Lf {
    constructor() {
      this.elementZIndex = /* @__PURE__ */ new Map(), this.nextZIndex = 2e3;
    }
    get elementCount() {
      return this.elementZIndex.size;
    }
    ensureZIndex(t, o) {
      const { elementZIndex: r } = this;
      if (o !== void 0) {
        t.style.zIndex = `${o}`, r.delete(t);
        return;
      }
      const { nextZIndex: n } = this;
      r.has(t) && r.get(t) + 1 === this.nextZIndex || (t.style.zIndex = `${n}`, r.set(t, n), this.nextZIndex = n + 1, this.squashState());
    }
    unregister(t, o) {
      const { elementZIndex: r } = this;
      r.has(t) ? r.delete(t) : o === void 0 && Af("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
    }
    squashState() {
      const { elementCount: t } = this;
      t || (this.nextZIndex = 2e3), this.nextZIndex - t > 2500 && this.rearrange();
    }
    rearrange() {
      const t = Array.from(this.elementZIndex.entries());
      t.sort((o, r) => o[1] - r[1]), this.nextZIndex = 2e3, t.forEach((o) => {
        const r = o[0], n = this.nextZIndex++;
        `${n}` !== r.style.zIndex && (r.style.zIndex = `${n}`);
      });
    }
  }
  const In = new Lf(), _o = "@@ziContext", Ff = {
    mounted(e, t) {
      const { value: o = {} } = t, { zIndex: r, enabled: n } = o;
      e[_o] = {
        enabled: !!n,
        initialized: !1
      }, n && (In.ensureZIndex(e, r), e[_o].initialized = !0);
    },
    updated(e, t) {
      const { value: o = {} } = t, { zIndex: r, enabled: n } = o, i = e[_o].enabled;
      n && !i && (In.ensureZIndex(e, r), e[_o].initialized = !0), e[_o].enabled = !!n;
    },
    unmounted(e, t) {
      if (!e[_o].initialized)
        return;
      const { value: o = {} } = t, { zIndex: r } = o;
      In.unregister(e, r);
    }
  }, Si = Ff, Kl = Symbol("@css-render/vue3-ssr");
  function Wf(e, t) {
    return `<style cssr-id="${e}">
${t}
</style>`;
  }
  function jf(e, t) {
    const o = ve(Kl, null);
    if (o === null) {
      console.error("[css-render/vue3-ssr]: no ssr context found.");
      return;
    }
    const { styles: r, ids: n } = o;
    n.has(e) || r !== null && (n.add(e), r.push(Wf(e, t)));
  }
  const Nf = typeof document < "u";
  function Go() {
    if (Nf)
      return;
    const e = ve(Kl, null);
    if (e !== null)
      return {
        adapter: jf,
        context: e
      };
  }
  function la(e, t) {
    console.error(`[vueuc/${e}]: ${t}`);
  }
  const { c: Ho } = Ll(), Jl = "vueuc-style";
  function sa(e) {
    return typeof e == "string" ? document.querySelector(e) : e();
  }
  const Ql = ie({
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
        showTeleport: mf(se(e, "show")),
        mergedTo: k(() => {
          const { to: t } = e;
          return t ?? "body";
        })
      };
    },
    render() {
      return this.showTeleport ? this.disabled ? ri("lazy-teleport", this.$slots) : u(xl, {
        disabled: this.disabled,
        to: this.mergedTo
      }, ri("lazy-teleport", this.$slots)) : null;
    }
  }), Hr = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, ca = {
    start: "end",
    center: "center",
    end: "start"
  }, Dn = {
    top: "height",
    bottom: "height",
    left: "width",
    right: "width"
  }, Vf = {
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
  }, Uf = {
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
  }, Gf = {
    "bottom-start": "right",
    "bottom-end": "left",
    "top-start": "right",
    "top-end": "left",
    "right-start": "bottom",
    "right-end": "top",
    "left-start": "bottom",
    "left-end": "top"
  }, da = {
    top: !0,
    bottom: !1,
    left: !0,
    right: !1
    // left--
  }, ua = {
    top: "end",
    bottom: "start",
    left: "end",
    right: "start"
  };
  function Xf(e, t, o, r, n, i) {
    if (!n || i)
      return { placement: e, top: 0, left: 0 };
    const [a, l] = e.split("-");
    let s = l ?? "center", c = {
      top: 0,
      left: 0
    };
    const d = (v, p, b) => {
      let x = 0, m = 0;
      const C = o[v] - t[p] - t[v];
      return C > 0 && r && (b ? m = da[p] ? C : -C : x = da[p] ? C : -C), {
        left: x,
        top: m
      };
    }, f = a === "left" || a === "right";
    if (s !== "center") {
      const v = Gf[e], p = Hr[v], b = Dn[v];
      if (o[b] > t[b]) {
        if (
          // current space is not enough
          // ----------[ target ]---------|
          // -------[     follower        ]
          t[v] + t[b] < o[b]
        ) {
          const x = (o[b] - t[b]) / 2;
          t[v] < x || t[p] < x ? t[v] < t[p] ? (s = ca[l], c = d(b, p, f)) : c = d(b, v, f) : s = "center";
        }
      } else
        o[b] < t[b] && t[p] < 0 && // opposite align has larger space
        // ------------[   target   ]
        // ----------------[follower]
        t[v] > t[p] && (s = ca[l]);
    } else {
      const v = a === "bottom" || a === "top" ? "left" : "top", p = Hr[v], b = Dn[v], x = (o[b] - t[b]) / 2;
      // center is not enough
      // ----------- [ target ]--|
      // -------[     follower     ]
      (t[v] < x || t[p] < x) && (t[v] > t[p] ? (s = ua[v], c = d(b, v, f)) : (s = ua[p], c = d(b, p, f)));
    }
    let g = a;
    return (
      // space is not enough
      t[a] < o[Dn[a]] && // opposite position's space is larger
      t[a] < t[Hr[a]] && (g = Hr[a]), {
        placement: s !== "center" ? `${g}-${s}` : g,
        left: c.left,
        top: c.top
      }
    );
  }
  function qf(e, t) {
    return t ? Uf[e] : Vf[e];
  }
  function Yf(e, t, o, r, n, i) {
    if (i)
      switch (e) {
        case "bottom-start":
          return {
            top: `${Math.round(o.top - t.top + o.height)}px`,
            left: `${Math.round(o.left - t.left)}px`,
            transform: "translateY(-100%)"
          };
        case "bottom-end":
          return {
            top: `${Math.round(o.top - t.top + o.height)}px`,
            left: `${Math.round(o.left - t.left + o.width)}px`,
            transform: "translateX(-100%) translateY(-100%)"
          };
        case "top-start":
          return {
            top: `${Math.round(o.top - t.top)}px`,
            left: `${Math.round(o.left - t.left)}px`,
            transform: ""
          };
        case "top-end":
          return {
            top: `${Math.round(o.top - t.top)}px`,
            left: `${Math.round(o.left - t.left + o.width)}px`,
            transform: "translateX(-100%)"
          };
        case "right-start":
          return {
            top: `${Math.round(o.top - t.top)}px`,
            left: `${Math.round(o.left - t.left + o.width)}px`,
            transform: "translateX(-100%)"
          };
        case "right-end":
          return {
            top: `${Math.round(o.top - t.top + o.height)}px`,
            left: `${Math.round(o.left - t.left + o.width)}px`,
            transform: "translateX(-100%) translateY(-100%)"
          };
        case "left-start":
          return {
            top: `${Math.round(o.top - t.top)}px`,
            left: `${Math.round(o.left - t.left)}px`,
            transform: ""
          };
        case "left-end":
          return {
            top: `${Math.round(o.top - t.top + o.height)}px`,
            left: `${Math.round(o.left - t.left)}px`,
            transform: "translateY(-100%)"
          };
        case "top":
          return {
            top: `${Math.round(o.top - t.top)}px`,
            left: `${Math.round(o.left - t.left + o.width / 2)}px`,
            transform: "translateX(-50%)"
          };
        case "right":
          return {
            top: `${Math.round(o.top - t.top + o.height / 2)}px`,
            left: `${Math.round(o.left - t.left + o.width)}px`,
            transform: "translateX(-100%) translateY(-50%)"
          };
        case "left":
          return {
            top: `${Math.round(o.top - t.top + o.height / 2)}px`,
            left: `${Math.round(o.left - t.left)}px`,
            transform: "translateY(-50%)"
          };
        case "bottom":
        default:
          return {
            top: `${Math.round(o.top - t.top + o.height)}px`,
            left: `${Math.round(o.left - t.left + o.width / 2)}px`,
            transform: "translateX(-50%) translateY(-100%)"
          };
      }
    switch (e) {
      case "bottom-start":
        return {
          top: `${Math.round(o.top - t.top + o.height + r)}px`,
          left: `${Math.round(o.left - t.left + n)}px`,
          transform: ""
        };
      case "bottom-end":
        return {
          top: `${Math.round(o.top - t.top + o.height + r)}px`,
          left: `${Math.round(o.left - t.left + o.width + n)}px`,
          transform: "translateX(-100%)"
        };
      case "top-start":
        return {
          top: `${Math.round(o.top - t.top + r)}px`,
          left: `${Math.round(o.left - t.left + n)}px`,
          transform: "translateY(-100%)"
        };
      case "top-end":
        return {
          top: `${Math.round(o.top - t.top + r)}px`,
          left: `${Math.round(o.left - t.left + o.width + n)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "right-start":
        return {
          top: `${Math.round(o.top - t.top + r)}px`,
          left: `${Math.round(o.left - t.left + o.width + n)}px`,
          transform: ""
        };
      case "right-end":
        return {
          top: `${Math.round(o.top - t.top + o.height + r)}px`,
          left: `${Math.round(o.left - t.left + o.width + n)}px`,
          transform: "translateY(-100%)"
        };
      case "left-start":
        return {
          top: `${Math.round(o.top - t.top + r)}px`,
          left: `${Math.round(o.left - t.left + n)}px`,
          transform: "translateX(-100%)"
        };
      case "left-end":
        return {
          top: `${Math.round(o.top - t.top + o.height + r)}px`,
          left: `${Math.round(o.left - t.left + n)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "top":
        return {
          top: `${Math.round(o.top - t.top + r)}px`,
          left: `${Math.round(o.left - t.left + o.width / 2 + n)}px`,
          transform: "translateY(-100%) translateX(-50%)"
        };
      case "right":
        return {
          top: `${Math.round(o.top - t.top + o.height / 2 + r)}px`,
          left: `${Math.round(o.left - t.left + o.width + n)}px`,
          transform: "translateY(-50%)"
        };
      case "left":
        return {
          top: `${Math.round(o.top - t.top + o.height / 2 + r)}px`,
          left: `${Math.round(o.left - t.left + n)}px`,
          transform: "translateY(-50%) translateX(-100%)"
        };
      case "bottom":
      default:
        return {
          top: `${Math.round(o.top - t.top + o.height + r)}px`,
          left: `${Math.round(o.left - t.left + o.width / 2 + n)}px`,
          transform: "translateX(-50%)"
        };
    }
  }
  const Zf = Ho([
    Ho(".v-binder-follower-container", {
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      height: "0",
      pointerEvents: "none",
      zIndex: "auto"
    }),
    Ho(".v-binder-follower-content", {
      position: "absolute",
      zIndex: "auto"
    }, [
      Ho("> *", {
        pointerEvents: "all"
      })
    ])
  ]), Kf = ie({
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
      const t = ve("VBinder"), o = Ze(() => e.enabled !== void 0 ? e.enabled : e.show), r = H(null), n = H(null), i = () => {
        const { syncTrigger: g } = e;
        g.includes("scroll") && t.addScrollListener(s), g.includes("resize") && t.addResizeListener(s);
      }, a = () => {
        t.removeScrollListener(s), t.removeResizeListener(s);
      };
      yt(() => {
        o.value && (s(), i());
      });
      const l = Go();
      Zf.mount({
        id: "vueuc/binder",
        head: !0,
        anchorMetaName: Jl,
        ssr: l
      }), st(() => {
        a();
      }), Nl(() => {
        o.value && s();
      });
      const s = () => {
        if (!o.value)
          return;
        const g = r.value;
        if (g === null)
          return;
        const v = t.targetRef, { x: p, y: b, overlap: x } = e, m = p !== void 0 && b !== void 0 ? Df(p, b) : Rn(v);
        g.style.setProperty("--v-target-width", `${Math.round(m.width)}px`), g.style.setProperty("--v-target-height", `${Math.round(m.height)}px`);
        const { width: C, minWidth: D, placement: I, internalShift: z, flip: $ } = e;
        g.setAttribute("v-placement", I), x ? g.setAttribute("v-overlap", "") : g.removeAttribute("v-overlap");
        const { style: h } = g;
        C === "target" ? h.width = `${m.width}px` : C !== void 0 ? h.width = C : h.width = "", D === "target" ? h.minWidth = `${m.width}px` : D !== void 0 ? h.minWidth = D : h.minWidth = "";
        const P = Rn(g), y = Rn(n.value), { left: S, top: T, placement: M } = Xf(I, m, P, z, $, x), L = qf(M, x), { left: O, top: N, transform: q } = Yf(M, y, m, T, S, x);
        g.setAttribute("v-placement", M), g.style.setProperty("--v-offset-left", `${Math.round(S)}px`), g.style.setProperty("--v-offset-top", `${Math.round(T)}px`), g.style.transform = `translateX(${O}) translateY(${N}) ${q}`, g.style.setProperty("--v-transform-origin", L), g.style.transformOrigin = L;
      };
      ke(o, (g) => {
        g ? (i(), c()) : a();
      });
      const c = () => {
        Rt().then(s).catch((g) => console.error(g));
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
      ].forEach((g) => {
        ke(se(e, g), s);
      }), ["teleportDisabled"].forEach((g) => {
        ke(se(e, g), c);
      }), ke(se(e, "syncTrigger"), (g) => {
        g.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), g.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
      });
      const d = gn(), f = Ze(() => {
        const { to: g } = e;
        if (g !== void 0)
          return g;
        d.value;
      });
      return {
        VBinder: t,
        mergedEnabled: o,
        offsetContainerRef: n,
        followerRef: r,
        mergedTo: f,
        syncPosition: s
      };
    },
    render() {
      return u(Ql, {
        show: this.show,
        to: this.mergedTo,
        disabled: this.teleportDisabled
      }, {
        default: () => {
          var e, t;
          const o = u("div", {
            class: ["v-binder-follower-container", this.containerClass],
            ref: "offsetContainerRef"
          }, [
            u("div", {
              class: "v-binder-follower-content",
              ref: "followerRef"
            }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
          ]);
          return this.zindexable ? co(o, [
            [
              Si,
              {
                enabled: this.mergedEnabled,
                zIndex: this.zIndex
              }
            ]
          ]) : o;
        }
      });
    }
  });
  var lo = [], Jf = function() {
    return lo.some(function(e) {
      return e.activeTargets.length > 0;
    });
  }, Qf = function() {
    return lo.some(function(e) {
      return e.skippedTargets.length > 0;
    });
  }, fa = "ResizeObserver loop completed with undelivered notifications.", ep = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
      message: fa
    }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = fa), window.dispatchEvent(e);
  }, Sr;
  (function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
  })(Sr || (Sr = {}));
  var so = function(e) {
    return Object.freeze(e);
  }, tp = function() {
    function e(t, o) {
      this.inlineSize = t, this.blockSize = o, so(this);
    }
    return e;
  }(), es = function() {
    function e(t, o, r, n) {
      return this.x = t, this.y = o, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, so(this);
    }
    return e.prototype.toJSON = function() {
      var t = this, o = t.x, r = t.y, n = t.top, i = t.right, a = t.bottom, l = t.left, s = t.width, c = t.height;
      return { x: o, y: r, top: n, right: i, bottom: a, left: l, width: s, height: c };
    }, e.fromRect = function(t) {
      return new e(t.x, t.y, t.width, t.height);
    }, e;
  }(), $i = function(e) {
    return e instanceof SVGElement && "getBBox" in e;
  }, ts = function(e) {
    if ($i(e)) {
      var t = e.getBBox(), o = t.width, r = t.height;
      return !o && !r;
    }
    var n = e, i = n.offsetWidth, a = n.offsetHeight;
    return !(i || a || e.getClientRects().length);
  }, pa = function(e) {
    var t;
    if (e instanceof Element)
      return !0;
    var o = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
    return !!(o && e instanceof o.Element);
  }, op = function(e) {
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
  }, vr = typeof window < "u" ? window : {}, Ar = /* @__PURE__ */ new WeakMap(), ha = /auto|scroll/, rp = /^tb|vertical/, np = /msie|trident/i.test(vr.navigator && vr.navigator.userAgent), Tt = function(e) {
    return parseFloat(e || "0");
  }, Fo = function(e, t, o) {
    return e === void 0 && (e = 0), t === void 0 && (t = 0), o === void 0 && (o = !1), new tp((o ? t : e) || 0, (o ? e : t) || 0);
  }, ga = so({
    devicePixelContentBoxSize: Fo(),
    borderBoxSize: Fo(),
    contentBoxSize: Fo(),
    contentRect: new es(0, 0, 0, 0)
  }), os = function(e, t) {
    if (t === void 0 && (t = !1), Ar.has(e) && !t)
      return Ar.get(e);
    if (ts(e))
      return Ar.set(e, ga), ga;
    var o = getComputedStyle(e), r = $i(e) && e.ownerSVGElement && e.getBBox(), n = !np && o.boxSizing === "border-box", i = rp.test(o.writingMode || ""), a = !r && ha.test(o.overflowY || ""), l = !r && ha.test(o.overflowX || ""), s = r ? 0 : Tt(o.paddingTop), c = r ? 0 : Tt(o.paddingRight), d = r ? 0 : Tt(o.paddingBottom), f = r ? 0 : Tt(o.paddingLeft), g = r ? 0 : Tt(o.borderTopWidth), v = r ? 0 : Tt(o.borderRightWidth), p = r ? 0 : Tt(o.borderBottomWidth), b = r ? 0 : Tt(o.borderLeftWidth), x = f + c, m = s + d, C = b + v, D = g + p, I = l ? e.offsetHeight - D - e.clientHeight : 0, z = a ? e.offsetWidth - C - e.clientWidth : 0, $ = n ? x + C : 0, h = n ? m + D : 0, P = r ? r.width : Tt(o.width) - $ - z, y = r ? r.height : Tt(o.height) - h - I, S = P + x + z + C, T = y + m + I + D, M = so({
      devicePixelContentBoxSize: Fo(Math.round(P * devicePixelRatio), Math.round(y * devicePixelRatio), i),
      borderBoxSize: Fo(S, T, i),
      contentBoxSize: Fo(P, y, i),
      contentRect: new es(f, s, P, y)
    });
    return Ar.set(e, M), M;
  }, rs = function(e, t, o) {
    var r = os(e, o), n = r.borderBoxSize, i = r.contentBoxSize, a = r.devicePixelContentBoxSize;
    switch (t) {
      case Sr.DEVICE_PIXEL_CONTENT_BOX:
        return a;
      case Sr.BORDER_BOX:
        return n;
      default:
        return i;
    }
  }, ip = function() {
    function e(t) {
      var o = os(t);
      this.target = t, this.contentRect = o.contentRect, this.borderBoxSize = so([o.borderBoxSize]), this.contentBoxSize = so([o.contentBoxSize]), this.devicePixelContentBoxSize = so([o.devicePixelContentBoxSize]);
    }
    return e;
  }(), ns = function(e) {
    if (ts(e))
      return 1 / 0;
    for (var t = 0, o = e.parentNode; o; )
      t += 1, o = o.parentNode;
    return t;
  }, ap = function() {
    var e = 1 / 0, t = [];
    lo.forEach(function(a) {
      if (a.activeTargets.length !== 0) {
        var l = [];
        a.activeTargets.forEach(function(c) {
          var d = new ip(c.target), f = ns(c.target);
          l.push(d), c.lastReportedSize = rs(c.target, c.observedBox), f < e && (e = f);
        }), t.push(function() {
          a.callback.call(a.observer, l, a.observer);
        }), a.activeTargets.splice(0, a.activeTargets.length);
      }
    });
    for (var o = 0, r = t; o < r.length; o++) {
      var n = r[o];
      n();
    }
    return e;
  }, va = function(e) {
    lo.forEach(function(o) {
      o.activeTargets.splice(0, o.activeTargets.length), o.skippedTargets.splice(0, o.skippedTargets.length), o.observationTargets.forEach(function(n) {
        n.isActive() && (ns(n.target) > e ? o.activeTargets.push(n) : o.skippedTargets.push(n));
      });
    });
  }, lp = function() {
    var e = 0;
    for (va(e); Jf(); )
      e = ap(), va(e);
    return Qf() && ep(), e > 0;
  }, En, is = [], sp = function() {
    return is.splice(0).forEach(function(e) {
      return e();
    });
  }, cp = function(e) {
    if (!En) {
      var t = 0, o = document.createTextNode(""), r = { characterData: !0 };
      new MutationObserver(function() {
        return sp();
      }).observe(o, r), En = function() {
        o.textContent = "".concat(t ? t-- : t++);
      };
    }
    is.push(e), En();
  }, dp = function(e) {
    cp(function() {
      requestAnimationFrame(e);
    });
  }, Qr = 0, up = function() {
    return !!Qr;
  }, fp = 250, pp = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, ma = [
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
  ], ba = function(e) {
    return e === void 0 && (e = 0), Date.now() + e;
  }, _n = !1, hp = function() {
    function e() {
      var t = this;
      this.stopped = !0, this.listener = function() {
        return t.schedule();
      };
    }
    return e.prototype.run = function(t) {
      var o = this;
      if (t === void 0 && (t = fp), !_n) {
        _n = !0;
        var r = ba(t);
        dp(function() {
          var n = !1;
          try {
            n = lp();
          } finally {
            if (_n = !1, t = r - ba(), !up())
              return;
            n ? o.run(1e3) : t > 0 ? o.run(t) : o.start();
          }
        });
      }
    }, e.prototype.schedule = function() {
      this.stop(), this.run();
    }, e.prototype.observe = function() {
      var t = this, o = function() {
        return t.observer && t.observer.observe(document.body, pp);
      };
      document.body ? o() : vr.addEventListener("DOMContentLoaded", o);
    }, e.prototype.start = function() {
      var t = this;
      this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), ma.forEach(function(o) {
        return vr.addEventListener(o, t.listener, !0);
      }));
    }, e.prototype.stop = function() {
      var t = this;
      this.stopped || (this.observer && this.observer.disconnect(), ma.forEach(function(o) {
        return vr.removeEventListener(o, t.listener, !0);
      }), this.stopped = !0);
    }, e;
  }(), ii = new hp(), xa = function(e) {
    !Qr && e > 0 && ii.start(), Qr += e, !Qr && ii.stop();
  }, gp = function(e) {
    return !$i(e) && !op(e) && getComputedStyle(e).display === "inline";
  }, vp = function() {
    function e(t, o) {
      this.target = t, this.observedBox = o || Sr.CONTENT_BOX, this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    return e.prototype.isActive = function() {
      var t = rs(this.target, this.observedBox, !0);
      return gp(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
    }, e;
  }(), mp = function() {
    function e(t, o) {
      this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = o;
    }
    return e;
  }(), Lr = /* @__PURE__ */ new WeakMap(), Ca = function(e, t) {
    for (var o = 0; o < e.length; o += 1)
      if (e[o].target === t)
        return o;
    return -1;
  }, Fr = function() {
    function e() {
    }
    return e.connect = function(t, o) {
      var r = new mp(t, o);
      Lr.set(t, r);
    }, e.observe = function(t, o, r) {
      var n = Lr.get(t), i = n.observationTargets.length === 0;
      Ca(n.observationTargets, o) < 0 && (i && lo.push(n), n.observationTargets.push(new vp(o, r && r.box)), xa(1), ii.schedule());
    }, e.unobserve = function(t, o) {
      var r = Lr.get(t), n = Ca(r.observationTargets, o), i = r.observationTargets.length === 1;
      n >= 0 && (i && lo.splice(lo.indexOf(r), 1), r.observationTargets.splice(n, 1), xa(-1));
    }, e.disconnect = function(t) {
      var o = this, r = Lr.get(t);
      r.observationTargets.slice().forEach(function(n) {
        return o.unobserve(t, n.target);
      }), r.activeTargets.splice(0, r.activeTargets.length);
    }, e;
  }(), bp = function() {
    function e(t) {
      if (arguments.length === 0)
        throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
      if (typeof t != "function")
        throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
      Fr.connect(this, t);
    }
    return e.prototype.observe = function(t, o) {
      if (arguments.length === 0)
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!pa(t))
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      Fr.observe(this, t, o);
    }, e.prototype.unobserve = function(t) {
      if (arguments.length === 0)
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      if (!pa(t))
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      Fr.unobserve(this, t);
    }, e.prototype.disconnect = function() {
      Fr.disconnect(this);
    }, e.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    }, e;
  }();
  class xp {
    constructor() {
      this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || bp)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
    }
    handleResize(t) {
      for (const o of t) {
        const r = this.elHandlersMap.get(o.target);
        r !== void 0 && r(o);
      }
    }
    registerHandler(t, o) {
      this.elHandlersMap.set(t, o), this.observer.observe(t);
    }
    unregisterHandler(t) {
      this.elHandlersMap.has(t) && (this.elHandlersMap.delete(t), this.observer.unobserve(t));
    }
  }
  const ya = new xp(), jo = ie({
    name: "ResizeObserver",
    props: {
      onResize: Function
    },
    setup(e) {
      let t = !1;
      const o = No().proxy;
      function r(n) {
        const { onResize: i } = e;
        i !== void 0 && i(n);
      }
      yt(() => {
        const n = o.$el;
        if (n === void 0) {
          la("resize-observer", "$el does not exist.");
          return;
        }
        if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
          la("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
        n.nextElementSibling !== null && (ya.registerHandler(n.nextElementSibling, r), t = !0);
      }), st(() => {
        t && ya.unregisterHandler(o.$el.nextElementSibling);
      });
    },
    render() {
      return Yd(this.$slots, "default");
    }
  }), Cp = Ho(".v-x-scroll", {
    overflow: "auto",
    scrollbarWidth: "none"
  }, [
    Ho("&::-webkit-scrollbar", {
      width: 0,
      height: 0
    })
  ]), yp = ie({
    name: "XScroll",
    props: {
      disabled: Boolean,
      onScroll: Function
    },
    setup() {
      const e = H(null);
      function t(n) {
        !(n.currentTarget.offsetWidth < n.currentTarget.scrollWidth) || n.deltaY === 0 || (n.currentTarget.scrollLeft += n.deltaY + n.deltaX, n.preventDefault());
      }
      const o = Go();
      return Cp.mount({
        id: "vueuc/x-scroll",
        head: !0,
        anchorMetaName: Jl,
        ssr: o
      }), Object.assign({
        selfRef: e,
        handleWheel: t
      }, {
        scrollTo(...n) {
          var i;
          (i = e.value) === null || i === void 0 || i.scrollTo(...n);
        }
      });
    },
    render() {
      return u("div", {
        ref: "selfRef",
        onScroll: this.onScroll,
        onWheel: this.disabled ? void 0 : this.handleWheel,
        class: "v-x-scroll"
      }, this.$slots);
    }
  });
  function as(e) {
    return e instanceof HTMLElement;
  }
  function ls(e) {
    for (let t = 0; t < e.childNodes.length; t++) {
      const o = e.childNodes[t];
      if (as(o) && (cs(o) || ls(o)))
        return !0;
    }
    return !1;
  }
  function ss(e) {
    for (let t = e.childNodes.length - 1; t >= 0; t--) {
      const o = e.childNodes[t];
      if (as(o) && (cs(o) || ss(o)))
        return !0;
    }
    return !1;
  }
  function cs(e) {
    if (!wp(e))
      return !1;
    try {
      e.focus({ preventScroll: !0 });
    } catch {
    }
    return document.activeElement === e;
  }
  function wp(e) {
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
  let ir = [];
  const Sp = ie({
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
      const t = nn(), o = H(null), r = H(null);
      let n = !1, i = !1;
      const a = typeof document > "u" ? null : document.activeElement;
      function l() {
        return ir[ir.length - 1] === t;
      }
      function s(x) {
        var m;
        x.code === "Escape" && l() && ((m = e.onEsc) === null || m === void 0 || m.call(e, x));
      }
      yt(() => {
        ke(() => e.active, (x) => {
          x ? (f(), Oe("keydown", document, s)) : (Pe("keydown", document, s), n && g());
        }, {
          immediate: !0
        });
      }), st(() => {
        Pe("keydown", document, s), n && g();
      });
      function c(x) {
        if (!i && l()) {
          const m = d();
          if (m === null || m.contains(rn(x)))
            return;
          v("first");
        }
      }
      function d() {
        const x = o.value;
        if (x === null)
          return null;
        let m = x;
        for (; m = m.nextSibling, !(m === null || m instanceof Element && m.tagName === "DIV"); )
          ;
        return m;
      }
      function f() {
        var x;
        if (!e.disabled) {
          if (ir.push(t), e.autoFocus) {
            const { initialFocusTo: m } = e;
            m === void 0 ? v("first") : (x = sa(m)) === null || x === void 0 || x.focus({ preventScroll: !0 });
          }
          n = !0, document.addEventListener("focus", c, !0);
        }
      }
      function g() {
        var x;
        if (e.disabled || (document.removeEventListener("focus", c, !0), ir = ir.filter((C) => C !== t), l()))
          return;
        const { finalFocusTo: m } = e;
        m !== void 0 ? (x = sa(m)) === null || x === void 0 || x.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = !0, a.focus({ preventScroll: !0 }), i = !1);
      }
      function v(x) {
        if (l() && e.active) {
          const m = o.value, C = r.value;
          if (m !== null && C !== null) {
            const D = d();
            if (D == null || D === C) {
              i = !0, m.focus({ preventScroll: !0 }), i = !1;
              return;
            }
            i = !0;
            const I = x === "first" ? ls(D) : ss(D);
            i = !1, I || (i = !0, m.focus({ preventScroll: !0 }), i = !1);
          }
        }
      }
      function p(x) {
        if (i)
          return;
        const m = d();
        m !== null && (x.relatedTarget !== null && m.contains(x.relatedTarget) ? v("last") : v("first"));
      }
      function b(x) {
        i || (x.relatedTarget !== null && x.relatedTarget === o.value ? v("last") : v("first"));
      }
      return {
        focusableStartRef: o,
        focusableEndRef: r,
        focusableStyle: "position: absolute; height: 0; width: 0;",
        handleStartFocus: p,
        handleEndFocus: b
      };
    },
    render() {
      const { default: e } = this.$slots;
      if (e === void 0)
        return null;
      if (this.disabled)
        return e();
      const { active: t, focusableStyle: o } = this;
      return u(ft, null, [
        u("div", {
          "aria-hidden": "true",
          tabindex: t ? "0" : "-1",
          ref: "focusableStartRef",
          style: o,
          onFocus: this.handleStartFocus
        }),
        e(),
        u("div", {
          "aria-hidden": "true",
          style: o,
          ref: "focusableEndRef",
          tabindex: t ? "0" : "-1",
          onFocus: this.handleEndFocus
        })
      ]);
    }
  });
  function $p(e) {
    const t = { isDeactivated: !1 };
    let o = !1;
    return Zd(() => {
      if (t.isDeactivated = !1, !o) {
        o = !0;
        return;
      }
      e();
    }), Kd(() => {
      t.isDeactivated = !0, o || (o = !0);
    }), t;
  }
  const wa = "n-form-item";
  function Pi(e, { defaultSize: t = "medium", mergedSize: o, mergedDisabled: r } = {}) {
    const n = ve(wa, null);
    lt(wa, null);
    const i = k(o ? () => o(n) : () => {
      const { size: s } = e;
      if (s)
        return s;
      if (n) {
        const { mergedSize: c } = n;
        if (c.value !== void 0)
          return c.value;
      }
      return t;
    }), a = k(r ? () => r(n) : () => {
      const { disabled: s } = e;
      return s !== void 0 ? s : n ? n.disabled.value : !1;
    }), l = k(() => {
      const { status: s } = e;
      return s || (n == null ? void 0 : n.mergedValidationStatus.value);
    });
    return st(() => {
      n && n.restoreValidation();
    }), {
      mergedSizeRef: i,
      mergedDisabledRef: a,
      mergedStatusRef: l,
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
  var Pp = typeof global == "object" && global && global.Object === Object && global;
  const ds = Pp;
  var Tp = typeof self == "object" && self && self.Object === Object && self, zp = ds || Tp || Function("return this")();
  const wt = zp;
  var Rp = wt.Symbol;
  const Vt = Rp;
  var us = Object.prototype, Ip = us.hasOwnProperty, Dp = us.toString, ar = Vt ? Vt.toStringTag : void 0;
  function Ep(e) {
    var t = Ip.call(e, ar), o = e[ar];
    try {
      e[ar] = void 0;
      var r = !0;
    } catch {
    }
    var n = Dp.call(e);
    return r && (t ? e[ar] = o : delete e[ar]), n;
  }
  var _p = Object.prototype, Bp = _p.toString;
  function kp(e) {
    return Bp.call(e);
  }
  var Op = "[object Null]", Mp = "[object Undefined]", Sa = Vt ? Vt.toStringTag : void 0;
  function go(e) {
    return e == null ? e === void 0 ? Mp : Op : Sa && Sa in Object(e) ? Ep(e) : kp(e);
  }
  function Ut(e) {
    return e != null && typeof e == "object";
  }
  var Hp = "[object Symbol]";
  function vn(e) {
    return typeof e == "symbol" || Ut(e) && go(e) == Hp;
  }
  function fs(e, t) {
    for (var o = -1, r = e == null ? 0 : e.length, n = Array(r); ++o < r; )
      n[o] = t(e[o], o, e);
    return n;
  }
  var Ap = Array.isArray;
  const pt = Ap;
  var Lp = 1 / 0, $a = Vt ? Vt.prototype : void 0, Pa = $a ? $a.toString : void 0;
  function ps(e) {
    if (typeof e == "string")
      return e;
    if (pt(e))
      return fs(e, ps) + "";
    if (vn(e))
      return Pa ? Pa.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -Lp ? "-0" : t;
  }
  var Fp = /\s/;
  function Wp(e) {
    for (var t = e.length; t-- && Fp.test(e.charAt(t)); )
      ;
    return t;
  }
  var jp = /^\s+/;
  function Np(e) {
    return e && e.slice(0, Wp(e) + 1).replace(jp, "");
  }
  function ht(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  var Ta = 0 / 0, Vp = /^[-+]0x[0-9a-f]+$/i, Up = /^0b[01]+$/i, Gp = /^0o[0-7]+$/i, Xp = parseInt;
  function za(e) {
    if (typeof e == "number")
      return e;
    if (vn(e))
      return Ta;
    if (ht(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = ht(t) ? t + "" : t;
    }
    if (typeof e != "string")
      return e === 0 ? e : +e;
    e = Np(e);
    var o = Up.test(e);
    return o || Gp.test(e) ? Xp(e.slice(2), o ? 2 : 8) : Vp.test(e) ? Ta : +e;
  }
  function Ti(e) {
    return e;
  }
  var qp = "[object AsyncFunction]", Yp = "[object Function]", Zp = "[object GeneratorFunction]", Kp = "[object Proxy]";
  function zi(e) {
    if (!ht(e))
      return !1;
    var t = go(e);
    return t == Yp || t == Zp || t == qp || t == Kp;
  }
  var Jp = wt["__core-js_shared__"];
  const Bn = Jp;
  var Ra = function() {
    var e = /[^.]+$/.exec(Bn && Bn.keys && Bn.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
  function Qp(e) {
    return !!Ra && Ra in e;
  }
  var eh = Function.prototype, th = eh.toString;
  function vo(e) {
    if (e != null) {
      try {
        return th.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  var oh = /[\\^$.*+?()[\]{}|]/g, rh = /^\[object .+?Constructor\]$/, nh = Function.prototype, ih = Object.prototype, ah = nh.toString, lh = ih.hasOwnProperty, sh = RegExp(
    "^" + ah.call(lh).replace(oh, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function ch(e) {
    if (!ht(e) || Qp(e))
      return !1;
    var t = zi(e) ? sh : rh;
    return t.test(vo(e));
  }
  function dh(e, t) {
    return e == null ? void 0 : e[t];
  }
  function mo(e, t) {
    var o = dh(e, t);
    return ch(o) ? o : void 0;
  }
  var uh = mo(wt, "WeakMap");
  const ai = uh;
  var Ia = Object.create, fh = function() {
    function e() {
    }
    return function(t) {
      if (!ht(t))
        return {};
      if (Ia)
        return Ia(t);
      e.prototype = t;
      var o = new e();
      return e.prototype = void 0, o;
    };
  }();
  const ph = fh;
  function hh(e, t, o) {
    switch (o.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, o[0]);
      case 2:
        return e.call(t, o[0], o[1]);
      case 3:
        return e.call(t, o[0], o[1], o[2]);
    }
    return e.apply(t, o);
  }
  function gh(e, t) {
    var o = -1, r = e.length;
    for (t || (t = Array(r)); ++o < r; )
      t[o] = e[o];
    return t;
  }
  var vh = 800, mh = 16, bh = Date.now;
  function xh(e) {
    var t = 0, o = 0;
    return function() {
      var r = bh(), n = mh - (r - o);
      if (o = r, n > 0) {
        if (++t >= vh)
          return arguments[0];
      } else
        t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function Ch(e) {
    return function() {
      return e;
    };
  }
  var yh = function() {
    try {
      var e = mo(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }();
  const an = yh;
  var wh = an ? function(e, t) {
    return an(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Ch(t),
      writable: !0
    });
  } : Ti;
  const Sh = wh;
  var $h = xh(Sh);
  const Ph = $h;
  var Th = 9007199254740991, zh = /^(?:0|[1-9]\d*)$/;
  function Ri(e, t) {
    var o = typeof e;
    return t = t ?? Th, !!t && (o == "number" || o != "symbol" && zh.test(e)) && e > -1 && e % 1 == 0 && e < t;
  }
  function Ii(e, t, o) {
    t == "__proto__" && an ? an(e, t, {
      configurable: !0,
      enumerable: !0,
      value: o,
      writable: !0
    }) : e[t] = o;
  }
  function _r(e, t) {
    return e === t || e !== e && t !== t;
  }
  var Rh = Object.prototype, Ih = Rh.hasOwnProperty;
  function Dh(e, t, o) {
    var r = e[t];
    (!(Ih.call(e, t) && _r(r, o)) || o === void 0 && !(t in e)) && Ii(e, t, o);
  }
  function Eh(e, t, o, r) {
    var n = !o;
    o || (o = {});
    for (var i = -1, a = t.length; ++i < a; ) {
      var l = t[i], s = r ? r(o[l], e[l], l, o, e) : void 0;
      s === void 0 && (s = e[l]), n ? Ii(o, l, s) : Dh(o, l, s);
    }
    return o;
  }
  var Da = Math.max;
  function _h(e, t, o) {
    return t = Da(t === void 0 ? e.length - 1 : t, 0), function() {
      for (var r = arguments, n = -1, i = Da(r.length - t, 0), a = Array(i); ++n < i; )
        a[n] = r[t + n];
      n = -1;
      for (var l = Array(t + 1); ++n < t; )
        l[n] = r[n];
      return l[t] = o(a), hh(e, this, l);
    };
  }
  function Bh(e, t) {
    return Ph(_h(e, t, Ti), e + "");
  }
  var kh = 9007199254740991;
  function Di(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= kh;
  }
  function Xo(e) {
    return e != null && Di(e.length) && !zi(e);
  }
  function Oh(e, t, o) {
    if (!ht(o))
      return !1;
    var r = typeof t;
    return (r == "number" ? Xo(o) && Ri(t, o.length) : r == "string" && t in o) ? _r(o[t], e) : !1;
  }
  function Mh(e) {
    return Bh(function(t, o) {
      var r = -1, n = o.length, i = n > 1 ? o[n - 1] : void 0, a = n > 2 ? o[2] : void 0;
      for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, a && Oh(o[0], o[1], a) && (i = n < 3 ? void 0 : i, n = 1), t = Object(t); ++r < n; ) {
        var l = o[r];
        l && e(t, l, r, i);
      }
      return t;
    });
  }
  var Hh = Object.prototype;
  function Ei(e) {
    var t = e && e.constructor, o = typeof t == "function" && t.prototype || Hh;
    return e === o;
  }
  function Ah(e, t) {
    for (var o = -1, r = Array(e); ++o < e; )
      r[o] = t(o);
    return r;
  }
  var Lh = "[object Arguments]";
  function Ea(e) {
    return Ut(e) && go(e) == Lh;
  }
  var hs = Object.prototype, Fh = hs.hasOwnProperty, Wh = hs.propertyIsEnumerable, jh = Ea(function() {
    return arguments;
  }()) ? Ea : function(e) {
    return Ut(e) && Fh.call(e, "callee") && !Wh.call(e, "callee");
  };
  const ln = jh;
  function Nh() {
    return !1;
  }
  var gs = typeof it == "object" && it && !it.nodeType && it, _a = gs && typeof at == "object" && at && !at.nodeType && at, Vh = _a && _a.exports === gs, Ba = Vh ? wt.Buffer : void 0, Uh = Ba ? Ba.isBuffer : void 0, Gh = Uh || Nh;
  const sn = Gh;
  var Xh = "[object Arguments]", qh = "[object Array]", Yh = "[object Boolean]", Zh = "[object Date]", Kh = "[object Error]", Jh = "[object Function]", Qh = "[object Map]", eg = "[object Number]", tg = "[object Object]", og = "[object RegExp]", rg = "[object Set]", ng = "[object String]", ig = "[object WeakMap]", ag = "[object ArrayBuffer]", lg = "[object DataView]", sg = "[object Float32Array]", cg = "[object Float64Array]", dg = "[object Int8Array]", ug = "[object Int16Array]", fg = "[object Int32Array]", pg = "[object Uint8Array]", hg = "[object Uint8ClampedArray]", gg = "[object Uint16Array]", vg = "[object Uint32Array]", we = {};
  we[sg] = we[cg] = we[dg] = we[ug] = we[fg] = we[pg] = we[hg] = we[gg] = we[vg] = !0;
  we[Xh] = we[qh] = we[ag] = we[Yh] = we[lg] = we[Zh] = we[Kh] = we[Jh] = we[Qh] = we[eg] = we[tg] = we[og] = we[rg] = we[ng] = we[ig] = !1;
  function mg(e) {
    return Ut(e) && Di(e.length) && !!we[go(e)];
  }
  function bg(e) {
    return function(t) {
      return e(t);
    };
  }
  var vs = typeof it == "object" && it && !it.nodeType && it, mr = vs && typeof at == "object" && at && !at.nodeType && at, xg = mr && mr.exports === vs, kn = xg && ds.process, Cg = function() {
    try {
      var e = mr && mr.require && mr.require("util").types;
      return e || kn && kn.binding && kn.binding("util");
    } catch {
    }
  }();
  const ka = Cg;
  var Oa = ka && ka.isTypedArray, yg = Oa ? bg(Oa) : mg;
  const _i = yg;
  var wg = Object.prototype, Sg = wg.hasOwnProperty;
  function ms(e, t) {
    var o = pt(e), r = !o && ln(e), n = !o && !r && sn(e), i = !o && !r && !n && _i(e), a = o || r || n || i, l = a ? Ah(e.length, String) : [], s = l.length;
    for (var c in e)
      (t || Sg.call(e, c)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
      (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      n && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
      Ri(c, s))) && l.push(c);
    return l;
  }
  function bs(e, t) {
    return function(o) {
      return e(t(o));
    };
  }
  var $g = bs(Object.keys, Object);
  const Pg = $g;
  var Tg = Object.prototype, zg = Tg.hasOwnProperty;
  function Rg(e) {
    if (!Ei(e))
      return Pg(e);
    var t = [];
    for (var o in Object(e))
      zg.call(e, o) && o != "constructor" && t.push(o);
    return t;
  }
  function Bi(e) {
    return Xo(e) ? ms(e) : Rg(e);
  }
  function Ig(e) {
    var t = [];
    if (e != null)
      for (var o in Object(e))
        t.push(o);
    return t;
  }
  var Dg = Object.prototype, Eg = Dg.hasOwnProperty;
  function _g(e) {
    if (!ht(e))
      return Ig(e);
    var t = Ei(e), o = [];
    for (var r in e)
      r == "constructor" && (t || !Eg.call(e, r)) || o.push(r);
    return o;
  }
  function xs(e) {
    return Xo(e) ? ms(e, !0) : _g(e);
  }
  var Bg = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, kg = /^\w*$/;
  function ki(e, t) {
    if (pt(e))
      return !1;
    var o = typeof e;
    return o == "number" || o == "symbol" || o == "boolean" || e == null || vn(e) ? !0 : kg.test(e) || !Bg.test(e) || t != null && e in Object(t);
  }
  var Og = mo(Object, "create");
  const $r = Og;
  function Mg() {
    this.__data__ = $r ? $r(null) : {}, this.size = 0;
  }
  function Hg(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  var Ag = "__lodash_hash_undefined__", Lg = Object.prototype, Fg = Lg.hasOwnProperty;
  function Wg(e) {
    var t = this.__data__;
    if ($r) {
      var o = t[e];
      return o === Ag ? void 0 : o;
    }
    return Fg.call(t, e) ? t[e] : void 0;
  }
  var jg = Object.prototype, Ng = jg.hasOwnProperty;
  function Vg(e) {
    var t = this.__data__;
    return $r ? t[e] !== void 0 : Ng.call(t, e);
  }
  var Ug = "__lodash_hash_undefined__";
  function Gg(e, t) {
    var o = this.__data__;
    return this.size += this.has(e) ? 0 : 1, o[e] = $r && t === void 0 ? Ug : t, this;
  }
  function fo(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  fo.prototype.clear = Mg;
  fo.prototype.delete = Hg;
  fo.prototype.get = Wg;
  fo.prototype.has = Vg;
  fo.prototype.set = Gg;
  function Xg() {
    this.__data__ = [], this.size = 0;
  }
  function mn(e, t) {
    for (var o = e.length; o--; )
      if (_r(e[o][0], t))
        return o;
    return -1;
  }
  var qg = Array.prototype, Yg = qg.splice;
  function Zg(e) {
    var t = this.__data__, o = mn(t, e);
    if (o < 0)
      return !1;
    var r = t.length - 1;
    return o == r ? t.pop() : Yg.call(t, o, 1), --this.size, !0;
  }
  function Kg(e) {
    var t = this.__data__, o = mn(t, e);
    return o < 0 ? void 0 : t[o][1];
  }
  function Jg(e) {
    return mn(this.__data__, e) > -1;
  }
  function Qg(e, t) {
    var o = this.__data__, r = mn(o, e);
    return r < 0 ? (++this.size, o.push([e, t])) : o[r][1] = t, this;
  }
  function At(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  At.prototype.clear = Xg;
  At.prototype.delete = Zg;
  At.prototype.get = Kg;
  At.prototype.has = Jg;
  At.prototype.set = Qg;
  var ev = mo(wt, "Map");
  const Pr = ev;
  function tv() {
    this.size = 0, this.__data__ = {
      hash: new fo(),
      map: new (Pr || At)(),
      string: new fo()
    };
  }
  function ov(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
  }
  function bn(e, t) {
    var o = e.__data__;
    return ov(t) ? o[typeof t == "string" ? "string" : "hash"] : o.map;
  }
  function rv(e) {
    var t = bn(this, e).delete(e);
    return this.size -= t ? 1 : 0, t;
  }
  function nv(e) {
    return bn(this, e).get(e);
  }
  function iv(e) {
    return bn(this, e).has(e);
  }
  function av(e, t) {
    var o = bn(this, e), r = o.size;
    return o.set(e, t), this.size += o.size == r ? 0 : 1, this;
  }
  function Lt(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.clear(); ++t < o; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  Lt.prototype.clear = tv;
  Lt.prototype.delete = rv;
  Lt.prototype.get = nv;
  Lt.prototype.has = iv;
  Lt.prototype.set = av;
  var lv = "Expected a function";
  function Oi(e, t) {
    if (typeof e != "function" || t != null && typeof t != "function")
      throw new TypeError(lv);
    var o = function() {
      var r = arguments, n = t ? t.apply(this, r) : r[0], i = o.cache;
      if (i.has(n))
        return i.get(n);
      var a = e.apply(this, r);
      return o.cache = i.set(n, a) || i, a;
    };
    return o.cache = new (Oi.Cache || Lt)(), o;
  }
  Oi.Cache = Lt;
  var sv = 500;
  function cv(e) {
    var t = Oi(e, function(r) {
      return o.size === sv && o.clear(), r;
    }), o = t.cache;
    return t;
  }
  var dv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, uv = /\\(\\)?/g, fv = cv(function(e) {
    var t = [];
    return e.charCodeAt(0) === 46 && t.push(""), e.replace(dv, function(o, r, n, i) {
      t.push(n ? i.replace(uv, "$1") : r || o);
    }), t;
  });
  const pv = fv;
  function xn(e) {
    return e == null ? "" : ps(e);
  }
  function Cs(e, t) {
    return pt(e) ? e : ki(e, t) ? [e] : pv(xn(e));
  }
  var hv = 1 / 0;
  function Cn(e) {
    if (typeof e == "string" || vn(e))
      return e;
    var t = e + "";
    return t == "0" && 1 / e == -hv ? "-0" : t;
  }
  function ys(e, t) {
    t = Cs(t, e);
    for (var o = 0, r = t.length; e != null && o < r; )
      e = e[Cn(t[o++])];
    return o && o == r ? e : void 0;
  }
  function gv(e, t, o) {
    var r = e == null ? void 0 : ys(e, t);
    return r === void 0 ? o : r;
  }
  function vv(e, t) {
    for (var o = -1, r = t.length, n = e.length; ++o < r; )
      e[n + o] = t[o];
    return e;
  }
  var mv = bs(Object.getPrototypeOf, Object);
  const ws = mv;
  var bv = "[object Object]", xv = Function.prototype, Cv = Object.prototype, Ss = xv.toString, yv = Cv.hasOwnProperty, wv = Ss.call(Object);
  function Sv(e) {
    if (!Ut(e) || go(e) != bv)
      return !1;
    var t = ws(e);
    if (t === null)
      return !0;
    var o = yv.call(t, "constructor") && t.constructor;
    return typeof o == "function" && o instanceof o && Ss.call(o) == wv;
  }
  function $v(e, t, o) {
    var r = -1, n = e.length;
    t < 0 && (t = -t > n ? 0 : n + t), o = o > n ? n : o, o < 0 && (o += n), n = t > o ? 0 : o - t >>> 0, t >>>= 0;
    for (var i = Array(n); ++r < n; )
      i[r] = e[r + t];
    return i;
  }
  function Pv(e, t, o) {
    var r = e.length;
    return o = o === void 0 ? r : o, !t && o >= r ? e : $v(e, t, o);
  }
  var Tv = "\\ud800-\\udfff", zv = "\\u0300-\\u036f", Rv = "\\ufe20-\\ufe2f", Iv = "\\u20d0-\\u20ff", Dv = zv + Rv + Iv, Ev = "\\ufe0e\\ufe0f", _v = "\\u200d", Bv = RegExp("[" + _v + Tv + Dv + Ev + "]");
  function $s(e) {
    return Bv.test(e);
  }
  function kv(e) {
    return e.split("");
  }
  var Ps = "\\ud800-\\udfff", Ov = "\\u0300-\\u036f", Mv = "\\ufe20-\\ufe2f", Hv = "\\u20d0-\\u20ff", Av = Ov + Mv + Hv, Lv = "\\ufe0e\\ufe0f", Fv = "[" + Ps + "]", li = "[" + Av + "]", si = "\\ud83c[\\udffb-\\udfff]", Wv = "(?:" + li + "|" + si + ")", Ts = "[^" + Ps + "]", zs = "(?:\\ud83c[\\udde6-\\uddff]){2}", Rs = "[\\ud800-\\udbff][\\udc00-\\udfff]", jv = "\\u200d", Is = Wv + "?", Ds = "[" + Lv + "]?", Nv = "(?:" + jv + "(?:" + [Ts, zs, Rs].join("|") + ")" + Ds + Is + ")*", Vv = Ds + Is + Nv, Uv = "(?:" + [Ts + li + "?", li, zs, Rs, Fv].join("|") + ")", Gv = RegExp(si + "(?=" + si + ")|" + Uv + Vv, "g");
  function Xv(e) {
    return e.match(Gv) || [];
  }
  function qv(e) {
    return $s(e) ? Xv(e) : kv(e);
  }
  function Yv(e) {
    return function(t) {
      t = xn(t);
      var o = $s(t) ? qv(t) : void 0, r = o ? o[0] : t.charAt(0), n = o ? Pv(o, 1).join("") : t.slice(1);
      return r[e]() + n;
    };
  }
  var Zv = Yv("toUpperCase");
  const Kv = Zv;
  function Jv(e, t, o, r) {
    var n = -1, i = e == null ? 0 : e.length;
    for (r && i && (o = e[++n]); ++n < i; )
      o = t(o, e[n], n, e);
    return o;
  }
  function Qv(e) {
    return function(t) {
      return e == null ? void 0 : e[t];
    };
  }
  var e0 = {
    // Latin-1 Supplement block.
    À: "A",
    Á: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    Å: "A",
    à: "a",
    á: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    Ç: "C",
    ç: "c",
    Ð: "D",
    ð: "d",
    È: "E",
    É: "E",
    Ê: "E",
    Ë: "E",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    Ì: "I",
    Í: "I",
    Î: "I",
    Ï: "I",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    Ñ: "N",
    ñ: "n",
    Ò: "O",
    Ó: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ø: "O",
    ò: "o",
    ó: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ø: "o",
    Ù: "U",
    Ú: "U",
    Û: "U",
    Ü: "U",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
    Ý: "Y",
    ý: "y",
    ÿ: "y",
    Æ: "Ae",
    æ: "ae",
    Þ: "Th",
    þ: "th",
    ß: "ss",
    // Latin Extended-A block.
    Ā: "A",
    Ă: "A",
    Ą: "A",
    ā: "a",
    ă: "a",
    ą: "a",
    Ć: "C",
    Ĉ: "C",
    Ċ: "C",
    Č: "C",
    ć: "c",
    ĉ: "c",
    ċ: "c",
    č: "c",
    Ď: "D",
    Đ: "D",
    ď: "d",
    đ: "d",
    Ē: "E",
    Ĕ: "E",
    Ė: "E",
    Ę: "E",
    Ě: "E",
    ē: "e",
    ĕ: "e",
    ė: "e",
    ę: "e",
    ě: "e",
    Ĝ: "G",
    Ğ: "G",
    Ġ: "G",
    Ģ: "G",
    ĝ: "g",
    ğ: "g",
    ġ: "g",
    ģ: "g",
    Ĥ: "H",
    Ħ: "H",
    ĥ: "h",
    ħ: "h",
    Ĩ: "I",
    Ī: "I",
    Ĭ: "I",
    Į: "I",
    İ: "I",
    ĩ: "i",
    ī: "i",
    ĭ: "i",
    į: "i",
    ı: "i",
    Ĵ: "J",
    ĵ: "j",
    Ķ: "K",
    ķ: "k",
    ĸ: "k",
    Ĺ: "L",
    Ļ: "L",
    Ľ: "L",
    Ŀ: "L",
    Ł: "L",
    ĺ: "l",
    ļ: "l",
    ľ: "l",
    ŀ: "l",
    ł: "l",
    Ń: "N",
    Ņ: "N",
    Ň: "N",
    Ŋ: "N",
    ń: "n",
    ņ: "n",
    ň: "n",
    ŋ: "n",
    Ō: "O",
    Ŏ: "O",
    Ő: "O",
    ō: "o",
    ŏ: "o",
    ő: "o",
    Ŕ: "R",
    Ŗ: "R",
    Ř: "R",
    ŕ: "r",
    ŗ: "r",
    ř: "r",
    Ś: "S",
    Ŝ: "S",
    Ş: "S",
    Š: "S",
    ś: "s",
    ŝ: "s",
    ş: "s",
    š: "s",
    Ţ: "T",
    Ť: "T",
    Ŧ: "T",
    ţ: "t",
    ť: "t",
    ŧ: "t",
    Ũ: "U",
    Ū: "U",
    Ŭ: "U",
    Ů: "U",
    Ű: "U",
    Ų: "U",
    ũ: "u",
    ū: "u",
    ŭ: "u",
    ů: "u",
    ű: "u",
    ų: "u",
    Ŵ: "W",
    ŵ: "w",
    Ŷ: "Y",
    ŷ: "y",
    Ÿ: "Y",
    Ź: "Z",
    Ż: "Z",
    Ž: "Z",
    ź: "z",
    ż: "z",
    ž: "z",
    Ĳ: "IJ",
    ĳ: "ij",
    Œ: "Oe",
    œ: "oe",
    ŉ: "'n",
    ſ: "s"
  }, t0 = Qv(e0);
  const o0 = t0;
  var r0 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, n0 = "\\u0300-\\u036f", i0 = "\\ufe20-\\ufe2f", a0 = "\\u20d0-\\u20ff", l0 = n0 + i0 + a0, s0 = "[" + l0 + "]", c0 = RegExp(s0, "g");
  function d0(e) {
    return e = xn(e), e && e.replace(r0, o0).replace(c0, "");
  }
  var u0 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  function f0(e) {
    return e.match(u0) || [];
  }
  var p0 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  function h0(e) {
    return p0.test(e);
  }
  var Es = "\\ud800-\\udfff", g0 = "\\u0300-\\u036f", v0 = "\\ufe20-\\ufe2f", m0 = "\\u20d0-\\u20ff", b0 = g0 + v0 + m0, _s = "\\u2700-\\u27bf", Bs = "a-z\\xdf-\\xf6\\xf8-\\xff", x0 = "\\xac\\xb1\\xd7\\xf7", C0 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", y0 = "\\u2000-\\u206f", w0 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ks = "A-Z\\xc0-\\xd6\\xd8-\\xde", S0 = "\\ufe0e\\ufe0f", Os = x0 + C0 + y0 + w0, Ms = "['’]", Ma = "[" + Os + "]", $0 = "[" + b0 + "]", Hs = "\\d+", P0 = "[" + _s + "]", As = "[" + Bs + "]", Ls = "[^" + Es + Os + Hs + _s + Bs + ks + "]", T0 = "\\ud83c[\\udffb-\\udfff]", z0 = "(?:" + $0 + "|" + T0 + ")", R0 = "[^" + Es + "]", Fs = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ws = "[\\ud800-\\udbff][\\udc00-\\udfff]", Bo = "[" + ks + "]", I0 = "\\u200d", Ha = "(?:" + As + "|" + Ls + ")", D0 = "(?:" + Bo + "|" + Ls + ")", Aa = "(?:" + Ms + "(?:d|ll|m|re|s|t|ve))?", La = "(?:" + Ms + "(?:D|LL|M|RE|S|T|VE))?", js = z0 + "?", Ns = "[" + S0 + "]?", E0 = "(?:" + I0 + "(?:" + [R0, Fs, Ws].join("|") + ")" + Ns + js + ")*", _0 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", B0 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", k0 = Ns + js + E0, O0 = "(?:" + [P0, Fs, Ws].join("|") + ")" + k0, M0 = RegExp([
    Bo + "?" + As + "+" + Aa + "(?=" + [Ma, Bo, "$"].join("|") + ")",
    D0 + "+" + La + "(?=" + [Ma, Bo + Ha, "$"].join("|") + ")",
    Bo + "?" + Ha + "+" + Aa,
    Bo + "+" + La,
    B0,
    _0,
    Hs,
    O0
  ].join("|"), "g");
  function H0(e) {
    return e.match(M0) || [];
  }
  function A0(e, t, o) {
    return e = xn(e), t = o ? void 0 : t, t === void 0 ? h0(e) ? H0(e) : f0(e) : e.match(t) || [];
  }
  var L0 = "['’]", F0 = RegExp(L0, "g");
  function W0(e) {
    return function(t) {
      return Jv(A0(d0(t).replace(F0, "")), e, "");
    };
  }
  function j0() {
    this.__data__ = new At(), this.size = 0;
  }
  function N0(e) {
    var t = this.__data__, o = t.delete(e);
    return this.size = t.size, o;
  }
  function V0(e) {
    return this.__data__.get(e);
  }
  function U0(e) {
    return this.__data__.has(e);
  }
  var G0 = 200;
  function X0(e, t) {
    var o = this.__data__;
    if (o instanceof At) {
      var r = o.__data__;
      if (!Pr || r.length < G0 - 1)
        return r.push([e, t]), this.size = ++o.size, this;
      o = this.__data__ = new Lt(r);
    }
    return o.set(e, t), this.size = o.size, this;
  }
  function Dt(e) {
    var t = this.__data__ = new At(e);
    this.size = t.size;
  }
  Dt.prototype.clear = j0;
  Dt.prototype.delete = N0;
  Dt.prototype.get = V0;
  Dt.prototype.has = U0;
  Dt.prototype.set = X0;
  var Vs = typeof it == "object" && it && !it.nodeType && it, Fa = Vs && typeof at == "object" && at && !at.nodeType && at, q0 = Fa && Fa.exports === Vs, Wa = q0 ? wt.Buffer : void 0, ja = Wa ? Wa.allocUnsafe : void 0;
  function Y0(e, t) {
    if (t)
      return e.slice();
    var o = e.length, r = ja ? ja(o) : new e.constructor(o);
    return e.copy(r), r;
  }
  function Z0(e, t) {
    for (var o = -1, r = e == null ? 0 : e.length, n = 0, i = []; ++o < r; ) {
      var a = e[o];
      t(a, o, e) && (i[n++] = a);
    }
    return i;
  }
  function K0() {
    return [];
  }
  var J0 = Object.prototype, Q0 = J0.propertyIsEnumerable, Na = Object.getOwnPropertySymbols, em = Na ? function(e) {
    return e == null ? [] : (e = Object(e), Z0(Na(e), function(t) {
      return Q0.call(e, t);
    }));
  } : K0;
  const tm = em;
  function om(e, t, o) {
    var r = t(e);
    return pt(e) ? r : vv(r, o(e));
  }
  function Va(e) {
    return om(e, Bi, tm);
  }
  var rm = mo(wt, "DataView");
  const ci = rm;
  var nm = mo(wt, "Promise");
  const di = nm;
  var im = mo(wt, "Set");
  const ui = im;
  var Ua = "[object Map]", am = "[object Object]", Ga = "[object Promise]", Xa = "[object Set]", qa = "[object WeakMap]", Ya = "[object DataView]", lm = vo(ci), sm = vo(Pr), cm = vo(di), dm = vo(ui), um = vo(ai), to = go;
  (ci && to(new ci(new ArrayBuffer(1))) != Ya || Pr && to(new Pr()) != Ua || di && to(di.resolve()) != Ga || ui && to(new ui()) != Xa || ai && to(new ai()) != qa) && (to = function(e) {
    var t = go(e), o = t == am ? e.constructor : void 0, r = o ? vo(o) : "";
    if (r)
      switch (r) {
        case lm:
          return Ya;
        case sm:
          return Ua;
        case cm:
          return Ga;
        case dm:
          return Xa;
        case um:
          return qa;
      }
    return t;
  });
  const Za = to;
  var fm = wt.Uint8Array;
  const cn = fm;
  function pm(e) {
    var t = new e.constructor(e.byteLength);
    return new cn(t).set(new cn(e)), t;
  }
  function hm(e, t) {
    var o = t ? pm(e.buffer) : e.buffer;
    return new e.constructor(o, e.byteOffset, e.length);
  }
  function gm(e) {
    return typeof e.constructor == "function" && !Ei(e) ? ph(ws(e)) : {};
  }
  var vm = "__lodash_hash_undefined__";
  function mm(e) {
    return this.__data__.set(e, vm), this;
  }
  function bm(e) {
    return this.__data__.has(e);
  }
  function dn(e) {
    var t = -1, o = e == null ? 0 : e.length;
    for (this.__data__ = new Lt(); ++t < o; )
      this.add(e[t]);
  }
  dn.prototype.add = dn.prototype.push = mm;
  dn.prototype.has = bm;
  function xm(e, t) {
    for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
      if (t(e[o], o, e))
        return !0;
    return !1;
  }
  function Cm(e, t) {
    return e.has(t);
  }
  var ym = 1, wm = 2;
  function Us(e, t, o, r, n, i) {
    var a = o & ym, l = e.length, s = t.length;
    if (l != s && !(a && s > l))
      return !1;
    var c = i.get(e), d = i.get(t);
    if (c && d)
      return c == t && d == e;
    var f = -1, g = !0, v = o & wm ? new dn() : void 0;
    for (i.set(e, t), i.set(t, e); ++f < l; ) {
      var p = e[f], b = t[f];
      if (r)
        var x = a ? r(b, p, f, t, e, i) : r(p, b, f, e, t, i);
      if (x !== void 0) {
        if (x)
          continue;
        g = !1;
        break;
      }
      if (v) {
        if (!xm(t, function(m, C) {
          if (!Cm(v, C) && (p === m || n(p, m, o, r, i)))
            return v.push(C);
        })) {
          g = !1;
          break;
        }
      } else if (!(p === b || n(p, b, o, r, i))) {
        g = !1;
        break;
      }
    }
    return i.delete(e), i.delete(t), g;
  }
  function Sm(e) {
    var t = -1, o = Array(e.size);
    return e.forEach(function(r, n) {
      o[++t] = [n, r];
    }), o;
  }
  function $m(e) {
    var t = -1, o = Array(e.size);
    return e.forEach(function(r) {
      o[++t] = r;
    }), o;
  }
  var Pm = 1, Tm = 2, zm = "[object Boolean]", Rm = "[object Date]", Im = "[object Error]", Dm = "[object Map]", Em = "[object Number]", _m = "[object RegExp]", Bm = "[object Set]", km = "[object String]", Om = "[object Symbol]", Mm = "[object ArrayBuffer]", Hm = "[object DataView]", Ka = Vt ? Vt.prototype : void 0, On = Ka ? Ka.valueOf : void 0;
  function Am(e, t, o, r, n, i, a) {
    switch (o) {
      case Hm:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        e = e.buffer, t = t.buffer;
      case Mm:
        return !(e.byteLength != t.byteLength || !i(new cn(e), new cn(t)));
      case zm:
      case Rm:
      case Em:
        return _r(+e, +t);
      case Im:
        return e.name == t.name && e.message == t.message;
      case _m:
      case km:
        return e == t + "";
      case Dm:
        var l = Sm;
      case Bm:
        var s = r & Pm;
        if (l || (l = $m), e.size != t.size && !s)
          return !1;
        var c = a.get(e);
        if (c)
          return c == t;
        r |= Tm, a.set(e, t);
        var d = Us(l(e), l(t), r, n, i, a);
        return a.delete(e), d;
      case Om:
        if (On)
          return On.call(e) == On.call(t);
    }
    return !1;
  }
  var Lm = 1, Fm = Object.prototype, Wm = Fm.hasOwnProperty;
  function jm(e, t, o, r, n, i) {
    var a = o & Lm, l = Va(e), s = l.length, c = Va(t), d = c.length;
    if (s != d && !a)
      return !1;
    for (var f = s; f--; ) {
      var g = l[f];
      if (!(a ? g in t : Wm.call(t, g)))
        return !1;
    }
    var v = i.get(e), p = i.get(t);
    if (v && p)
      return v == t && p == e;
    var b = !0;
    i.set(e, t), i.set(t, e);
    for (var x = a; ++f < s; ) {
      g = l[f];
      var m = e[g], C = t[g];
      if (r)
        var D = a ? r(C, m, g, t, e, i) : r(m, C, g, e, t, i);
      if (!(D === void 0 ? m === C || n(m, C, o, r, i) : D)) {
        b = !1;
        break;
      }
      x || (x = g == "constructor");
    }
    if (b && !x) {
      var I = e.constructor, z = t.constructor;
      I != z && "constructor" in e && "constructor" in t && !(typeof I == "function" && I instanceof I && typeof z == "function" && z instanceof z) && (b = !1);
    }
    return i.delete(e), i.delete(t), b;
  }
  var Nm = 1, Ja = "[object Arguments]", Qa = "[object Array]", Wr = "[object Object]", Vm = Object.prototype, el = Vm.hasOwnProperty;
  function Um(e, t, o, r, n, i) {
    var a = pt(e), l = pt(t), s = a ? Qa : Za(e), c = l ? Qa : Za(t);
    s = s == Ja ? Wr : s, c = c == Ja ? Wr : c;
    var d = s == Wr, f = c == Wr, g = s == c;
    if (g && sn(e)) {
      if (!sn(t))
        return !1;
      a = !0, d = !1;
    }
    if (g && !d)
      return i || (i = new Dt()), a || _i(e) ? Us(e, t, o, r, n, i) : Am(e, t, s, o, r, n, i);
    if (!(o & Nm)) {
      var v = d && el.call(e, "__wrapped__"), p = f && el.call(t, "__wrapped__");
      if (v || p) {
        var b = v ? e.value() : e, x = p ? t.value() : t;
        return i || (i = new Dt()), n(b, x, o, r, i);
      }
    }
    return g ? (i || (i = new Dt()), jm(e, t, o, r, n, i)) : !1;
  }
  function Mi(e, t, o, r, n) {
    return e === t ? !0 : e == null || t == null || !Ut(e) && !Ut(t) ? e !== e && t !== t : Um(e, t, o, r, Mi, n);
  }
  var Gm = 1, Xm = 2;
  function qm(e, t, o, r) {
    var n = o.length, i = n, a = !r;
    if (e == null)
      return !i;
    for (e = Object(e); n--; ) {
      var l = o[n];
      if (a && l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
        return !1;
    }
    for (; ++n < i; ) {
      l = o[n];
      var s = l[0], c = e[s], d = l[1];
      if (a && l[2]) {
        if (c === void 0 && !(s in e))
          return !1;
      } else {
        var f = new Dt();
        if (r)
          var g = r(c, d, s, e, t, f);
        if (!(g === void 0 ? Mi(d, c, Gm | Xm, r, f) : g))
          return !1;
      }
    }
    return !0;
  }
  function Gs(e) {
    return e === e && !ht(e);
  }
  function Ym(e) {
    for (var t = Bi(e), o = t.length; o--; ) {
      var r = t[o], n = e[r];
      t[o] = [r, n, Gs(n)];
    }
    return t;
  }
  function Xs(e, t) {
    return function(o) {
      return o == null ? !1 : o[e] === t && (t !== void 0 || e in Object(o));
    };
  }
  function Zm(e) {
    var t = Ym(e);
    return t.length == 1 && t[0][2] ? Xs(t[0][0], t[0][1]) : function(o) {
      return o === e || qm(o, e, t);
    };
  }
  function Km(e, t) {
    return e != null && t in Object(e);
  }
  function Jm(e, t, o) {
    t = Cs(t, e);
    for (var r = -1, n = t.length, i = !1; ++r < n; ) {
      var a = Cn(t[r]);
      if (!(i = e != null && o(e, a)))
        break;
      e = e[a];
    }
    return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && Di(n) && Ri(a, n) && (pt(e) || ln(e)));
  }
  function Qm(e, t) {
    return e != null && Jm(e, t, Km);
  }
  var eb = 1, tb = 2;
  function ob(e, t) {
    return ki(e) && Gs(t) ? Xs(Cn(e), t) : function(o) {
      var r = gv(o, e);
      return r === void 0 && r === t ? Qm(o, e) : Mi(t, r, eb | tb);
    };
  }
  function rb(e) {
    return function(t) {
      return t == null ? void 0 : t[e];
    };
  }
  function nb(e) {
    return function(t) {
      return ys(t, e);
    };
  }
  function ib(e) {
    return ki(e) ? rb(Cn(e)) : nb(e);
  }
  function ab(e) {
    return typeof e == "function" ? e : e == null ? Ti : typeof e == "object" ? pt(e) ? ob(e[0], e[1]) : Zm(e) : ib(e);
  }
  function lb(e) {
    return function(t, o, r) {
      for (var n = -1, i = Object(t), a = r(t), l = a.length; l--; ) {
        var s = a[e ? l : ++n];
        if (o(i[s], s, i) === !1)
          break;
      }
      return t;
    };
  }
  var sb = lb();
  const qs = sb;
  function cb(e, t) {
    return e && qs(e, t, Bi);
  }
  function db(e, t) {
    return function(o, r) {
      if (o == null)
        return o;
      if (!Xo(o))
        return e(o, r);
      for (var n = o.length, i = t ? n : -1, a = Object(o); (t ? i-- : ++i < n) && r(a[i], i, a) !== !1; )
        ;
      return o;
    };
  }
  var ub = db(cb);
  const fb = ub;
  var pb = function() {
    return wt.Date.now();
  };
  const Mn = pb;
  var hb = "Expected a function", gb = Math.max, vb = Math.min;
  function mb(e, t, o) {
    var r, n, i, a, l, s, c = 0, d = !1, f = !1, g = !0;
    if (typeof e != "function")
      throw new TypeError(hb);
    t = za(t) || 0, ht(o) && (d = !!o.leading, f = "maxWait" in o, i = f ? gb(za(o.maxWait) || 0, t) : i, g = "trailing" in o ? !!o.trailing : g);
    function v($) {
      var h = r, P = n;
      return r = n = void 0, c = $, a = e.apply(P, h), a;
    }
    function p($) {
      return c = $, l = setTimeout(m, t), d ? v($) : a;
    }
    function b($) {
      var h = $ - s, P = $ - c, y = t - h;
      return f ? vb(y, i - P) : y;
    }
    function x($) {
      var h = $ - s, P = $ - c;
      return s === void 0 || h >= t || h < 0 || f && P >= i;
    }
    function m() {
      var $ = Mn();
      if (x($))
        return C($);
      l = setTimeout(m, b($));
    }
    function C($) {
      return l = void 0, g && r ? v($) : (r = n = void 0, a);
    }
    function D() {
      l !== void 0 && clearTimeout(l), c = 0, r = s = n = l = void 0;
    }
    function I() {
      return l === void 0 ? a : C(Mn());
    }
    function z() {
      var $ = Mn(), h = x($);
      if (r = arguments, n = this, s = $, h) {
        if (l === void 0)
          return p(s);
        if (f)
          return clearTimeout(l), l = setTimeout(m, t), v(s);
      }
      return l === void 0 && (l = setTimeout(m, t)), a;
    }
    return z.cancel = D, z.flush = I, z;
  }
  function fi(e, t, o) {
    (o !== void 0 && !_r(e[t], o) || o === void 0 && !(t in e)) && Ii(e, t, o);
  }
  function bb(e) {
    return Ut(e) && Xo(e);
  }
  function pi(e, t) {
    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
      return e[t];
  }
  function xb(e) {
    return Eh(e, xs(e));
  }
  function Cb(e, t, o, r, n, i, a) {
    var l = pi(e, o), s = pi(t, o), c = a.get(s);
    if (c) {
      fi(e, o, c);
      return;
    }
    var d = i ? i(l, s, o + "", e, t, a) : void 0, f = d === void 0;
    if (f) {
      var g = pt(s), v = !g && sn(s), p = !g && !v && _i(s);
      d = s, g || v || p ? pt(l) ? d = l : bb(l) ? d = gh(l) : v ? (f = !1, d = Y0(s, !0)) : p ? (f = !1, d = hm(s, !0)) : d = [] : Sv(s) || ln(s) ? (d = l, ln(l) ? d = xb(l) : (!ht(l) || zi(l)) && (d = gm(s))) : f = !1;
    }
    f && (a.set(s, d), n(d, s, r, i, a), a.delete(s)), fi(e, o, d);
  }
  function Ys(e, t, o, r, n) {
    e !== t && qs(t, function(i, a) {
      if (n || (n = new Dt()), ht(i))
        Cb(e, t, a, o, Ys, r, n);
      else {
        var l = r ? r(pi(e, a), i, a + "", e, t, n) : void 0;
        l === void 0 && (l = i), fi(e, a, l);
      }
    }, xs);
  }
  function yb(e, t) {
    var o = -1, r = Xo(e) ? Array(e.length) : [];
    return fb(e, function(n, i, a) {
      r[++o] = t(n, i, a);
    }), r;
  }
  function wb(e, t) {
    var o = pt(e) ? fs : yb;
    return o(e, ab(t));
  }
  var Sb = W0(function(e, t, o) {
    return e + (o ? "-" : "") + t.toLowerCase();
  });
  const $b = Sb;
  var Pb = Mh(function(e, t, o) {
    Ys(e, t, o);
  });
  const fr = Pb;
  var Tb = "Expected a function";
  function Hn(e, t, o) {
    var r = !0, n = !0;
    if (typeof e != "function")
      throw new TypeError(Tb);
    return ht(o) && (r = "leading" in o ? !!o.leading : r, n = "trailing" in o ? !!o.trailing : n), mb(e, t, {
      leading: r,
      maxWait: t,
      trailing: n
    });
  }
  const Xt = {
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
    fontSize: zb,
    fontFamily: Rb,
    lineHeight: Ib
  } = Xt, Zs = E("body", `
 margin: 0;
 font-size: ${zb};
 font-family: ${Rb};
 line-height: ${Ib};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [E("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), Gt = "n-config-provider", Tr = "naive-ui-style";
  function De(e, t, o, r, n, i) {
    const a = Go(), l = ve(Gt, null);
    if (o) {
      const c = () => {
        const d = i == null ? void 0 : i.value;
        o.mount({
          id: d === void 0 ? t : d + t,
          head: !0,
          props: {
            bPrefix: d ? `.${d}-` : void 0
          },
          anchorMetaName: Tr,
          ssr: a
        }), l != null && l.preflightStyleDisabled || Zs.mount({
          id: "n-global",
          head: !0,
          anchorMetaName: Tr,
          ssr: a
        });
      };
      a ? c() : xi(c);
    }
    return k(() => {
      var c;
      const { theme: { common: d, self: f, peers: g = {} } = {}, themeOverrides: v = {}, builtinThemeOverrides: p = {} } = n, { common: b, peers: x } = v, { common: m = void 0, [e]: { common: C = void 0, self: D = void 0, peers: I = {} } = {} } = (l == null ? void 0 : l.mergedThemeRef.value) || {}, { common: z = void 0, [e]: $ = {} } = (l == null ? void 0 : l.mergedThemeOverridesRef.value) || {}, { common: h, peers: P = {} } = $, y = fr({}, d || C || m || r.common, z, h, b), S = fr(
        // {}, executed every time, no need for empty obj
        (c = f || D || r.self) === null || c === void 0 ? void 0 : c(y),
        p,
        $,
        v
      );
      return {
        common: y,
        self: S,
        peers: fr({}, r.peers, I, g),
        peerOverrides: fr({}, p.peers, P, x)
      };
    });
  }
  De.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
  };
  const Ks = "n";
  function gt(e = {}, t = {
    defaultBordered: !0
  }) {
    const o = ve(Gt, null);
    return {
      // NConfigProvider,
      inlineThemeDisabled: o == null ? void 0 : o.inlineThemeDisabled,
      mergedRtlRef: o == null ? void 0 : o.mergedRtlRef,
      mergedComponentPropsRef: o == null ? void 0 : o.mergedComponentPropsRef,
      mergedBreakpointsRef: o == null ? void 0 : o.mergedBreakpointsRef,
      mergedBorderedRef: k(() => {
        var r, n;
        const { bordered: i } = e;
        return i !== void 0 ? i : (n = (r = o == null ? void 0 : o.mergedBorderedRef.value) !== null && r !== void 0 ? r : t.defaultBordered) !== null && n !== void 0 ? n : !0;
      }),
      mergedClsPrefixRef: k(() => (o == null ? void 0 : o.mergedClsPrefixRef.value) || Ks),
      namespaceRef: k(() => o == null ? void 0 : o.mergedNamespaceRef.value)
    };
  }
  const Db = {
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
  }, Eb = Db;
  function An(e) {
    return function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = t.width ? String(t.width) : e.defaultWidth, r = e.formats[o] || e.formats[e.defaultWidth];
      return r;
    };
  }
  function lr(e) {
    return function(t, o) {
      var r = o != null && o.context ? String(o.context) : "standalone", n;
      if (r === "formatting" && e.formattingValues) {
        var i = e.defaultFormattingWidth || e.defaultWidth, a = o != null && o.width ? String(o.width) : i;
        n = e.formattingValues[a] || e.formattingValues[i];
      } else {
        var l = e.defaultWidth, s = o != null && o.width ? String(o.width) : e.defaultWidth;
        n = e.values[s] || e.values[l];
      }
      var c = e.argumentCallback ? e.argumentCallback(t) : t;
      return n[c];
    };
  }
  function sr(e) {
    return function(t) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = o.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(n);
      if (!i)
        return null;
      var a = i[0], l = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(l) ? Bb(l, function(f) {
        return f.test(a);
      }) : _b(l, function(f) {
        return f.test(a);
      }), c;
      c = e.valueCallback ? e.valueCallback(s) : s, c = o.valueCallback ? o.valueCallback(c) : c;
      var d = t.slice(a.length);
      return {
        value: c,
        rest: d
      };
    };
  }
  function _b(e, t) {
    for (var o in e)
      if (e.hasOwnProperty(o) && t(e[o]))
        return o;
  }
  function Bb(e, t) {
    for (var o = 0; o < e.length; o++)
      if (t(e[o]))
        return o;
  }
  function kb(e) {
    return function(t) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.match(e.matchPattern);
      if (!r)
        return null;
      var n = r[0], i = t.match(e.parsePattern);
      if (!i)
        return null;
      var a = e.valueCallback ? e.valueCallback(i[0]) : i[0];
      a = o.valueCallback ? o.valueCallback(a) : a;
      var l = t.slice(n.length);
      return {
        value: a,
        rest: l
      };
    };
  }
  var Ob = {
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
  }, Mb = function(t, o, r) {
    var n, i = Ob[t];
    return typeof i == "string" ? n = i : o === 1 ? n = i.one : n = i.other.replace("{{count}}", o.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
  };
  const Hb = Mb;
  var Ab = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, Lb = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, Fb = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, Wb = {
    date: An({
      formats: Ab,
      defaultWidth: "full"
    }),
    time: An({
      formats: Lb,
      defaultWidth: "full"
    }),
    dateTime: An({
      formats: Fb,
      defaultWidth: "full"
    })
  };
  const jb = Wb;
  var Nb = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, Vb = function(t, o, r, n) {
    return Nb[t];
  };
  const Ub = Vb;
  var Gb = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }, Xb = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }, qb = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }, Yb = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }, Zb = {
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
  }, Kb = {
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
  }, Jb = function(t, o) {
    var r = Number(t), n = r % 100;
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
  }, Qb = {
    ordinalNumber: Jb,
    era: lr({
      values: Gb,
      defaultWidth: "wide"
    }),
    quarter: lr({
      values: Xb,
      defaultWidth: "wide",
      argumentCallback: function(t) {
        return t - 1;
      }
    }),
    month: lr({
      values: qb,
      defaultWidth: "wide"
    }),
    day: lr({
      values: Yb,
      defaultWidth: "wide"
    }),
    dayPeriod: lr({
      values: Zb,
      defaultWidth: "wide",
      formattingValues: Kb,
      defaultFormattingWidth: "wide"
    })
  };
  const e1 = Qb;
  var t1 = /^(\d+)(th|st|nd|rd)?/i, o1 = /\d+/i, r1 = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, n1 = {
    any: [/^b/i, /^(a|c)/i]
  }, i1 = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, a1 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }, l1 = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, s1 = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  }, c1 = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, d1 = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }, u1 = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, f1 = {
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
  }, p1 = {
    ordinalNumber: kb({
      matchPattern: t1,
      parsePattern: o1,
      valueCallback: function(t) {
        return parseInt(t, 10);
      }
    }),
    era: sr({
      matchPatterns: r1,
      defaultMatchWidth: "wide",
      parsePatterns: n1,
      defaultParseWidth: "any"
    }),
    quarter: sr({
      matchPatterns: i1,
      defaultMatchWidth: "wide",
      parsePatterns: a1,
      defaultParseWidth: "any",
      valueCallback: function(t) {
        return t + 1;
      }
    }),
    month: sr({
      matchPatterns: l1,
      defaultMatchWidth: "wide",
      parsePatterns: s1,
      defaultParseWidth: "any"
    }),
    day: sr({
      matchPatterns: c1,
      defaultMatchWidth: "wide",
      parsePatterns: d1,
      defaultParseWidth: "any"
    }),
    dayPeriod: sr({
      matchPatterns: u1,
      defaultMatchWidth: "any",
      parsePatterns: f1,
      defaultParseWidth: "any"
    })
  };
  const h1 = p1;
  var g1 = {
    code: "en-US",
    formatDistance: Hb,
    formatLong: jb,
    formatRelative: Ub,
    localize: e1,
    match: h1,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  const v1 = g1, m1 = {
    name: "en-US",
    locale: v1
  }, b1 = m1;
  function Js(e) {
    const { mergedLocaleRef: t, mergedDateLocaleRef: o } = ve(Gt, null) || {}, r = k(() => {
      var i, a;
      return (a = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && a !== void 0 ? a : Eb[e];
    });
    return {
      dateLocaleRef: k(() => {
        var i;
        return (i = o == null ? void 0 : o.value) !== null && i !== void 0 ? i : b1;
      }),
      localeRef: r
    };
  }
  function qo(e, t, o) {
    if (!t) {
      process.env.NODE_ENV !== "production" && po("use-style", "No style is specified.");
      return;
    }
    const r = Go(), n = ve(Gt, null), i = () => {
      const a = o == null ? void 0 : o.value;
      t.mount({
        id: a === void 0 ? e : a + e,
        head: !0,
        anchorMetaName: Tr,
        props: {
          bPrefix: a ? `.${a}-` : void 0
        },
        ssr: r
      }), n != null && n.preflightStyleDisabled || Zs.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: Tr,
        ssr: r
      });
    };
    r ? i() : xi(i);
  }
  function Ft(e, t, o, r) {
    var n;
    o || po("useThemeClass", "cssVarsRef is not passed");
    const i = (n = ve(Gt, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, a = H(""), l = Go();
    let s;
    const c = `__${e}`, d = () => {
      let f = c;
      const g = t ? t.value : void 0, v = i == null ? void 0 : i.value;
      v && (f += "-" + v), g && (f += "-" + g);
      const { themeOverrides: p, builtinThemeOverrides: b } = r;
      p && (f += "-" + wr(JSON.stringify(p))), b && (f += "-" + wr(JSON.stringify(b))), a.value = f, s = () => {
        const x = o.value;
        let m = "";
        for (const C in x)
          m += `${C}: ${x[C]};`;
        E(`.${f}`, m).mount({
          id: f,
          ssr: l
        }), s = void 0;
      };
    };
    return Ge(() => {
      d();
    }), {
      themeClass: a,
      onRender: () => {
        s == null || s();
      }
    };
  }
  function Hi(e, t, o) {
    if (!t)
      return;
    const r = Go(), n = k(() => {
      const { value: a } = t;
      if (!a)
        return;
      const l = a[e];
      if (l)
        return l;
    }), i = () => {
      Ge(() => {
        const { value: a } = o, l = `${a}${e}Rtl`;
        if (cf(l, r))
          return;
        const { value: s } = n;
        s && s.style.mount({
          id: l,
          head: !0,
          anchorMetaName: Tr,
          props: {
            bPrefix: a ? `.${a}-` : void 0
          },
          ssr: r
        });
      });
    };
    return r ? i() : xi(i), n;
  }
  const Qs = ie({
    name: "Add",
    render() {
      return u(
        "svg",
        { width: "512", height: "512", viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        u("path", { d: "M256 112V400M400 256H112", stroke: "currentColor", "stroke-width": "32", "stroke-linecap": "round", "stroke-linejoin": "round" })
      );
    }
  });
  function Ke(e, t) {
    return ie({
      name: Kv(e),
      setup() {
        var o;
        const r = (o = ve(Gt, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
        return () => {
          var n;
          const i = (n = r == null ? void 0 : r.value) === null || n === void 0 ? void 0 : n[e];
          return i ? i() : t;
        };
      }
    });
  }
  const x1 = Ke("attach", u(
    "svg",
    { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      u(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        u("path", { d: "M3.25735931,8.70710678 L7.85355339,4.1109127 C8.82986412,3.13460197 10.4127766,3.13460197 11.3890873,4.1109127 C12.365398,5.08722343 12.365398,6.67013588 11.3890873,7.64644661 L6.08578644,12.9497475 C5.69526215,13.3402718 5.06209717,13.3402718 4.67157288,12.9497475 C4.28104858,12.5592232 4.28104858,11.9260582 4.67157288,11.5355339 L9.97487373,6.23223305 C10.1701359,6.0369709 10.1701359,5.72038841 9.97487373,5.52512627 C9.77961159,5.32986412 9.4630291,5.32986412 9.26776695,5.52512627 L3.96446609,10.8284271 C3.18341751,11.6094757 3.18341751,12.8758057 3.96446609,13.6568542 C4.74551468,14.4379028 6.01184464,14.4379028 6.79289322,13.6568542 L12.0961941,8.35355339 C13.4630291,6.98671837 13.4630291,4.77064094 12.0961941,3.40380592 C10.7293591,2.0369709 8.51328163,2.0369709 7.14644661,3.40380592 L2.55025253,8 C2.35499039,8.19526215 2.35499039,8.51184464 2.55025253,8.70710678 C2.74551468,8.90236893 3.06209717,8.90236893 3.25735931,8.70710678 Z" })
      )
    )
  )), C1 = Ke("close", u(
    "svg",
    { viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": !0 },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      u(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        u("path", { d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z" })
      )
    )
  )), ec = ie({
    name: "Eye",
    render() {
      return u(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
        u("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }),
        u("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" })
      );
    }
  }), y1 = ie({
    name: "EyeOff",
    render() {
      return u(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
        u("path", { d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z", fill: "currentColor" }),
        u("path", { d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z", fill: "currentColor" }),
        u("path", { d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z", fill: "currentColor" }),
        u("path", { d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z", fill: "currentColor" }),
        u("path", { d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z", fill: "currentColor" })
      );
    }
  }), w1 = Ke("trash", u(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    u("path", { d: "M432,144,403.33,419.74A32,32,0,0,1,371.55,448H140.46a32,32,0,0,1-31.78-28.26L80,144", style: "fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;" }),
    u("rect", { x: "32", y: "64", width: "448", height: "80", rx: "16", ry: "16", style: "fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;" }),
    u("line", { x1: "312", y1: "240", x2: "200", y2: "352", style: "fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;" }),
    u("line", { x1: "312", y1: "352", x2: "200", y2: "240", style: "fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;" })
  )), S1 = Ke("download", u(
    "svg",
    { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      u(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        u("path", { d: "M3.5,13 L12.5,13 C12.7761424,13 13,13.2238576 13,13.5 C13,13.7454599 12.8231248,13.9496084 12.5898756,13.9919443 L12.5,14 L3.5,14 C3.22385763,14 3,13.7761424 3,13.5 C3,13.2545401 3.17687516,13.0503916 3.41012437,13.0080557 L3.5,13 L12.5,13 L3.5,13 Z M7.91012437,1.00805567 L8,1 C8.24545989,1 8.44960837,1.17687516 8.49194433,1.41012437 L8.5,1.5 L8.5,10.292 L11.1819805,7.6109127 C11.3555469,7.43734635 11.6249713,7.4180612 11.8198394,7.55305725 L11.8890873,7.6109127 C12.0626536,7.78447906 12.0819388,8.05390346 11.9469427,8.2487716 L11.8890873,8.31801948 L8.35355339,11.8535534 C8.17998704,12.0271197 7.91056264,12.0464049 7.7156945,11.9114088 L7.64644661,11.8535534 L4.1109127,8.31801948 C3.91565056,8.12275734 3.91565056,7.80617485 4.1109127,7.6109127 C4.28447906,7.43734635 4.55390346,7.4180612 4.7487716,7.55305725 L4.81801948,7.6109127 L7.5,10.292 L7.5,1.5 C7.5,1.25454011 7.67687516,1.05039163 7.91012437,1.00805567 L8,1 L7.91012437,1.00805567 Z" })
      )
    )
  )), tc = Ke("error", u(
    "svg",
    { viewBox: "0 0 48 48", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" },
      u(
        "g",
        { "fill-rule": "nonzero" },
        u("path", { d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z" })
      )
    )
  )), oc = Ke("info", u(
    "svg",
    { viewBox: "0 0 28 28", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" },
      u(
        "g",
        { "fill-rule": "nonzero" },
        u("path", { d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z" })
      )
    )
  )), rc = Ke("success", u(
    "svg",
    { viewBox: "0 0 48 48", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" },
      u(
        "g",
        { "fill-rule": "nonzero" },
        u("path", { d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z" })
      )
    )
  )), nc = Ke("warning", u(
    "svg",
    { viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" },
      u(
        "g",
        { "fill-rule": "nonzero" },
        u("path", { d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z" })
      )
    )
  )), $1 = Ke("cancel", u(
    "svg",
    { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      u(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        u("path", { d: "M2.58859116,2.7156945 L2.64644661,2.64644661 C2.82001296,2.47288026 3.08943736,2.45359511 3.2843055,2.58859116 L3.35355339,2.64644661 L8,7.293 L12.6464466,2.64644661 C12.8417088,2.45118446 13.1582912,2.45118446 13.3535534,2.64644661 C13.5488155,2.84170876 13.5488155,3.15829124 13.3535534,3.35355339 L8.707,8 L13.3535534,12.6464466 C13.5271197,12.820013 13.5464049,13.0894374 13.4114088,13.2843055 L13.3535534,13.3535534 C13.179987,13.5271197 12.9105626,13.5464049 12.7156945,13.4114088 L12.6464466,13.3535534 L8,8.707 L3.35355339,13.3535534 C3.15829124,13.5488155 2.84170876,13.5488155 2.64644661,13.3535534 C2.45118446,13.1582912 2.45118446,12.8417088 2.64644661,12.6464466 L7.293,8 L2.64644661,3.35355339 C2.47288026,3.17998704 2.45359511,2.91056264 2.58859116,2.7156945 L2.64644661,2.64644661 L2.58859116,2.7156945 Z" })
      )
    )
  )), P1 = ie({
    name: "ChevronDown",
    render() {
      return u(
        "svg",
        { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        u("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
      );
    }
  }), T1 = Ke("clear", u(
    "svg",
    { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    u(
      "g",
      { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
      u(
        "g",
        { fill: "currentColor", "fill-rule": "nonzero" },
        u("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" })
      )
    )
  )), z1 = Ke("retry", u(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    u("path", { d: "M320,146s24.36-12-64-12A160,160,0,1,0,416,294", style: "fill: none; stroke: currentcolor; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 32px;" }),
    u("polyline", { points: "256 58 336 138 256 218", style: "fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;" })
  )), R1 = Ke("rotateClockwise", u(
    "svg",
    { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    u("path", { d: "M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 12.7916 15.3658 15.2026 13 16.3265V14.5C13 14.2239 12.7761 14 12.5 14C12.2239 14 12 14.2239 12 14.5V17.5C12 17.7761 12.2239 18 12.5 18H15.5C15.7761 18 16 17.7761 16 17.5C16 17.2239 15.7761 17 15.5 17H13.8758C16.3346 15.6357 18 13.0128 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 10.2761 2.22386 10.5 2.5 10.5C2.77614 10.5 3 10.2761 3 10Z", fill: "currentColor" }),
    u("path", { d: "M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM10 11C9.44772 11 9 10.5523 9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10C11 10.5523 10.5523 11 10 11Z", fill: "currentColor" })
  )), I1 = Ke("rotateClockwise", u(
    "svg",
    { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    u("path", { d: "M17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 12.7916 4.63419 15.2026 7 16.3265V14.5C7 14.2239 7.22386 14 7.5 14C7.77614 14 8 14.2239 8 14.5V17.5C8 17.7761 7.77614 18 7.5 18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H6.12422C3.66539 15.6357 2 13.0128 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 10.2761 17.7761 10.5 17.5 10.5C17.2239 10.5 17 10.2761 17 10Z", fill: "currentColor" }),
    u("path", { d: "M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z", fill: "currentColor" })
  )), D1 = Ke("zoomIn", u(
    "svg",
    { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    u("path", { d: "M11.5 8.5C11.5 8.22386 11.2761 8 11 8H9V6C9 5.72386 8.77614 5.5 8.5 5.5C8.22386 5.5 8 5.72386 8 6V8H6C5.72386 8 5.5 8.22386 5.5 8.5C5.5 8.77614 5.72386 9 6 9H8V11C8 11.2761 8.22386 11.5 8.5 11.5C8.77614 11.5 9 11.2761 9 11V9H11C11.2761 9 11.5 8.77614 11.5 8.5Z", fill: "currentColor" }),
    u("path", { d: "M8.5 3C11.5376 3 14 5.46243 14 8.5C14 9.83879 13.5217 11.0659 12.7266 12.0196L16.8536 16.1464C17.0488 16.3417 17.0488 16.6583 16.8536 16.8536C16.68 17.0271 16.4106 17.0464 16.2157 16.9114L16.1464 16.8536L12.0196 12.7266C11.0659 13.5217 9.83879 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3ZM8.5 4C6.01472 4 4 6.01472 4 8.5C4 10.9853 6.01472 13 8.5 13C10.9853 13 13 10.9853 13 8.5C13 6.01472 10.9853 4 8.5 4Z", fill: "currentColor" })
  )), E1 = Ke("zoomOut", u(
    "svg",
    { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    u("path", { d: "M11 8C11.2761 8 11.5 8.22386 11.5 8.5C11.5 8.77614 11.2761 9 11 9H6C5.72386 9 5.5 8.77614 5.5 8.5C5.5 8.22386 5.72386 8 6 8H11Z", fill: "currentColor" }),
    u("path", { d: "M14 8.5C14 5.46243 11.5376 3 8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L16.1464 16.8536L16.2157 16.9114C16.4106 17.0464 16.68 17.0271 16.8536 16.8536C17.0488 16.6583 17.0488 16.3417 16.8536 16.1464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z", fill: "currentColor" })
  )), _1 = ie({
    name: "ResizeSmall",
    render() {
      return u(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" },
        u(
          "g",
          { fill: "none" },
          u("path", { d: "M5.5 4A1.5 1.5 0 0 0 4 5.5v1a.5.5 0 0 1-1 0v-1A2.5 2.5 0 0 1 5.5 3h1a.5.5 0 0 1 0 1h-1zM16 5.5A1.5 1.5 0 0 0 14.5 4h-1a.5.5 0 0 1 0-1h1A2.5 2.5 0 0 1 17 5.5v1a.5.5 0 0 1-1 0v-1zm0 9a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 0 0 1h1a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1zm-12 0A1.5 1.5 0 0 0 5.5 16h1.25a.5.5 0 0 1 0 1H5.5A2.5 2.5 0 0 1 3 14.5v-1.25a.5.5 0 0 1 1 0v1.25zM8.5 7A1.5 1.5 0 0 0 7 8.5v3A1.5 1.5 0 0 0 8.5 13h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 11.5 7h-3zM8 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3z", fill: "currentColor" })
        )
      );
    }
  }), yn = ie({
    name: "BaseIconSwitchTransition",
    setup(e, { slots: t }) {
      const o = gn();
      return () => u(Nt, { name: "icon-switch-transition", appear: o.value }, t);
    }
  }), Ai = ie({
    name: "FadeInExpandTransition",
    props: {
      appear: Boolean,
      group: Boolean,
      mode: String,
      onLeave: Function,
      onAfterLeave: Function,
      onAfterEnter: Function,
      width: Boolean,
      // reverse mode is only used in tree
      // it make it from expanded to collapsed after mounted
      reverse: Boolean
    },
    setup(e, { slots: t }) {
      function o(l) {
        e.width ? l.style.maxWidth = `${l.offsetWidth}px` : l.style.maxHeight = `${l.offsetHeight}px`, l.offsetWidth;
      }
      function r(l) {
        e.width ? l.style.maxWidth = "0" : l.style.maxHeight = "0", l.offsetWidth;
        const { onLeave: s } = e;
        s && s();
      }
      function n(l) {
        e.width ? l.style.maxWidth = "" : l.style.maxHeight = "";
        const { onAfterLeave: s } = e;
        s && s();
      }
      function i(l) {
        if (l.style.transition = "none", e.width) {
          const s = l.offsetWidth;
          l.style.maxWidth = "0", l.offsetWidth, l.style.transition = "", l.style.maxWidth = `${s}px`;
        } else if (e.reverse)
          l.style.maxHeight = `${l.offsetHeight}px`, l.offsetHeight, l.style.transition = "", l.style.maxHeight = "0";
        else {
          const s = l.offsetHeight;
          l.style.maxHeight = "0", l.offsetWidth, l.style.transition = "", l.style.maxHeight = `${s}px`;
        }
        l.offsetWidth;
      }
      function a(l) {
        var s;
        e.width ? l.style.maxWidth = "" : e.reverse || (l.style.maxHeight = ""), (s = e.onAfterEnter) === null || s === void 0 || s.call(e);
      }
      return () => {
        const l = e.group ? Cl : Nt;
        return u(l, {
          name: e.width ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
          mode: e.mode,
          appear: e.appear,
          onEnter: i,
          onAfterEnter: a,
          onBeforeLeave: o,
          onLeave: r,
          onAfterLeave: n
        }, t);
      };
    }
  }), B1 = R("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [E("svg", `
 height: 1em;
 width: 1em;
 `)]), $e = ie({
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
      qo("-base-icon", B1, se(e, "clsPrefix"));
    },
    render() {
      return u("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
    }
  }), k1 = R("base-close", `
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
`, [V("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), E("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), nt("disabled", [E("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), E("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), E("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), E("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), E("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), V("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), V("round", [E("&::before", `
 border-radius: 50%;
 `)])]), O1 = ie({
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
      return qo("-base-close", k1, se(e, "clsPrefix")), () => {
        const { clsPrefix: t, disabled: o, absolute: r, round: n, isButtonTag: i } = e;
        return u(
          i ? "button" : "div",
          { type: i ? "button" : void 0, tabindex: o || !e.focusable ? -1 : 0, "aria-disabled": o, "aria-label": "close", role: i ? void 0 : "button", disabled: o, class: [
            `${t}-base-close`,
            r && `${t}-base-close--absolute`,
            o && `${t}-base-close--disabled`,
            n && `${t}-base-close--round`
          ], onMousedown: (l) => {
            e.focusable || l.preventDefault();
          }, onClick: e.onClick },
          u($e, { clsPrefix: t }, {
            default: () => u(C1, null)
          })
        );
      };
    }
  }), {
    cubicBezierEaseInOut: M1
  } = Xt;
  function zr({
    originalTransform: e = "",
    left: t = 0,
    top: o = 0,
    transition: r = `all .3s ${M1} !important`
  } = {}) {
    return [E("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
      transform: e + " scale(0.75)",
      left: t,
      top: o,
      opacity: 0
    }), E("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
      transform: `scale(1) ${e}`,
      left: t,
      top: o,
      opacity: 1
    }), E("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
      transformOrigin: "center",
      position: "absolute",
      left: t,
      top: o,
      transition: r
    })];
  }
  const H1 = E([E("@keyframes loading-container-rotate", `
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `), E("@keyframes loading-layer-rotate", `
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
 `), E("@keyframes loading-left-spin", `
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
 `), E("@keyframes loading-right-spin", `
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
 `), R("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [A("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [zr()]), A("container", `
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
 `, [A("svg", `
 stroke: var(--n-text-color);
 fill: transparent;
 position: absolute;
 height: 100%;
 overflow: hidden;
 `), A("container-layer", `
 position: absolute;
 width: 100%;
 height: 100%;
 animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 `, [A("container-layer-left", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [A("svg", `
 animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 width: 200%;
 `)]), A("container-layer-patch", `
 position: absolute;
 top: 0;
 left: 47.5%;
 box-sizing: border-box;
 width: 5%;
 height: 100%;
 overflow: hidden;
 `, [A("svg", `
 left: -900%;
 width: 2000%;
 transform: rotate(180deg);
 `)]), A("container-layer-right", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [A("svg", `
 animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 left: -100%;
 width: 200%;
 `)])])]), A("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [zr({
    left: "50%",
    top: "50%",
    originalTransform: "translateX(-50%) translateY(-50%)"
  })])])]), A1 = {
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: void 0
    }
  }, ic = ie({
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
    } }, A1),
    setup(e) {
      qo("-base-loading", H1, se(e, "clsPrefix"));
    },
    render() {
      const { clsPrefix: e, radius: t, strokeWidth: o, stroke: r, scale: n } = this, i = t / n;
      return u(
        "div",
        { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
        u(yn, null, {
          default: () => this.show ? u(
            "div",
            { key: "icon", class: `${e}-base-loading__transition-wrapper` },
            u(
              "div",
              { class: `${e}-base-loading__container` },
              u(
                "div",
                { class: `${e}-base-loading__container-layer` },
                u(
                  "div",
                  { class: `${e}-base-loading__container-layer-left` },
                  u(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    u("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                  )
                ),
                u(
                  "div",
                  { class: `${e}-base-loading__container-layer-patch` },
                  u(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    u("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                  )
                ),
                u(
                  "div",
                  { class: `${e}-base-loading__container-layer-right` },
                  u(
                    "svg",
                    { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                    u("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                  )
                )
              )
            )
          ) : u("div", { key: "placeholder", class: `${e}-base-loading__placeholder` }, this.$slots)
        })
      );
    }
  }), G = {
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
  }, L1 = Ht(G.neutralBase), ac = Ht(G.neutralInvertBase), F1 = "rgba(" + ac.slice(0, 3).join(", ") + ", ";
  function he(e) {
    return F1 + String(e) + ")";
  }
  function W1(e) {
    const t = Array.from(ac);
    return t[3] = Number(e), te(L1, t);
  }
  const j1 = Object.assign(Object.assign({ name: "common" }, Xt), {
    baseColor: G.neutralBase,
    // primary color
    primaryColor: G.primaryDefault,
    primaryColorHover: G.primaryHover,
    primaryColorPressed: G.primaryActive,
    primaryColorSuppl: G.primarySuppl,
    // info color
    infoColor: G.infoDefault,
    infoColorHover: G.infoHover,
    infoColorPressed: G.infoActive,
    infoColorSuppl: G.infoSuppl,
    // success color
    successColor: G.successDefault,
    successColorHover: G.successHover,
    successColorPressed: G.successActive,
    successColorSuppl: G.successSuppl,
    // warning color
    warningColor: G.warningDefault,
    warningColorHover: G.warningHover,
    warningColorPressed: G.warningActive,
    warningColorSuppl: G.warningSuppl,
    // error color
    errorColor: G.errorDefault,
    errorColorHover: G.errorHover,
    errorColorPressed: G.errorActive,
    errorColorSuppl: G.errorSuppl,
    // text color
    textColorBase: G.neutralTextBase,
    textColor1: he(G.alpha1),
    textColor2: he(G.alpha2),
    textColor3: he(G.alpha3),
    // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
    // textColor5: overlay(base.alpha5),
    textColorDisabled: he(G.alpha4),
    placeholderColor: he(G.alpha4),
    placeholderColorDisabled: he(G.alpha5),
    iconColor: he(G.alpha4),
    iconColorDisabled: he(G.alpha5),
    iconColorHover: he(Number(G.alpha4) * 1.25),
    iconColorPressed: he(Number(G.alpha4) * 0.8),
    opacity1: G.alpha1,
    opacity2: G.alpha2,
    opacity3: G.alpha3,
    opacity4: G.alpha4,
    opacity5: G.alpha5,
    dividerColor: he(G.alphaDivider),
    borderColor: he(G.alphaBorder),
    // close
    closeIconColorHover: he(Number(G.alphaClose)),
    closeIconColor: he(Number(G.alphaClose)),
    closeIconColorPressed: he(Number(G.alphaClose)),
    closeColorHover: "rgba(255, 255, 255, .12)",
    closeColorPressed: "rgba(255, 255, 255, .08)",
    // clear
    clearColor: he(G.alpha4),
    clearColorHover: _e(he(G.alpha4), { alpha: 1.25 }),
    clearColorPressed: _e(he(G.alpha4), { alpha: 0.8 }),
    scrollbarColor: he(G.alphaScrollbar),
    scrollbarColorHover: he(G.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: he(G.alphaProgressRail),
    railColor: he(G.alphaRail),
    popoverColor: G.neutralPopover,
    tableColor: G.neutralCard,
    cardColor: G.neutralCard,
    modalColor: G.neutralModal,
    bodyColor: G.neutralBody,
    tagColor: W1(G.alphaTag),
    avatarColor: he(G.alphaAvatar),
    invertedColor: G.neutralBase,
    inputColor: he(G.alphaInput),
    codeColor: he(G.alphaCode),
    tabColor: he(G.alphaTab),
    actionColor: he(G.alphaAction),
    tableHeaderColor: he(G.alphaAction),
    hoverColor: he(G.alphaPending),
    tableColorHover: he(G.alphaTablePending),
    tableColorStriped: he(G.alphaTableStriped),
    pressedColor: he(G.alphaPressed),
    opacityDisabled: G.alphaDisabled,
    inputColorDisabled: he(G.alphaDisabledInput),
    buttonColor2: "rgba(255, 255, 255, .08)",
    buttonColor2Hover: "rgba(255, 255, 255, .12)",
    buttonColor2Pressed: "rgba(255, 255, 255, .08)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), j = j1, re = {
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
  }, N1 = Ht(re.neutralBase), lc = Ht(re.neutralInvertBase), V1 = "rgba(" + lc.slice(0, 3).join(", ") + ", ";
  function tl(e) {
    return V1 + String(e) + ")";
  }
  function je(e) {
    const t = Array.from(lc);
    return t[3] = Number(e), te(N1, t);
  }
  const U1 = Object.assign(Object.assign({ name: "common" }, Xt), {
    baseColor: re.neutralBase,
    // primary color
    primaryColor: re.primaryDefault,
    primaryColorHover: re.primaryHover,
    primaryColorPressed: re.primaryActive,
    primaryColorSuppl: re.primarySuppl,
    // info color
    infoColor: re.infoDefault,
    infoColorHover: re.infoHover,
    infoColorPressed: re.infoActive,
    infoColorSuppl: re.infoSuppl,
    // success color
    successColor: re.successDefault,
    successColorHover: re.successHover,
    successColorPressed: re.successActive,
    successColorSuppl: re.successSuppl,
    // warning color
    warningColor: re.warningDefault,
    warningColorHover: re.warningHover,
    warningColorPressed: re.warningActive,
    warningColorSuppl: re.warningSuppl,
    // error color
    errorColor: re.errorDefault,
    errorColorHover: re.errorHover,
    errorColorPressed: re.errorActive,
    errorColorSuppl: re.errorSuppl,
    // text color
    textColorBase: re.neutralTextBase,
    textColor1: "rgb(31, 34, 37)",
    textColor2: "rgb(51, 54, 57)",
    textColor3: "rgb(118, 124, 130)",
    // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
    // textColor5: neutral(base.alpha5),
    textColorDisabled: je(re.alpha4),
    placeholderColor: je(re.alpha4),
    placeholderColorDisabled: je(re.alpha5),
    iconColor: je(re.alpha4),
    iconColorHover: _e(je(re.alpha4), { lightness: 0.75 }),
    iconColorPressed: _e(je(re.alpha4), { lightness: 0.9 }),
    iconColorDisabled: je(re.alpha5),
    opacity1: re.alpha1,
    opacity2: re.alpha2,
    opacity3: re.alpha3,
    opacity4: re.alpha4,
    opacity5: re.alpha5,
    dividerColor: "rgb(239, 239, 245)",
    borderColor: "rgb(224, 224, 230)",
    // close
    closeIconColor: je(Number(re.alphaClose)),
    closeIconColorHover: je(Number(re.alphaClose)),
    closeIconColorPressed: je(Number(re.alphaClose)),
    closeColorHover: "rgba(0, 0, 0, .09)",
    closeColorPressed: "rgba(0, 0, 0, .13)",
    // clear
    clearColor: je(re.alpha4),
    clearColorHover: _e(je(re.alpha4), { lightness: 0.75 }),
    clearColorPressed: _e(je(re.alpha4), { lightness: 0.9 }),
    scrollbarColor: tl(re.alphaScrollbar),
    scrollbarColorHover: tl(re.alphaScrollbarHover),
    scrollbarWidth: "5px",
    scrollbarHeight: "5px",
    scrollbarBorderRadius: "5px",
    progressRailColor: je(re.alphaProgressRail),
    railColor: "rgb(219, 219, 223)",
    popoverColor: re.neutralPopover,
    tableColor: re.neutralCard,
    cardColor: re.neutralCard,
    modalColor: re.neutralModal,
    bodyColor: re.neutralBody,
    tagColor: "#eee",
    avatarColor: je(re.alphaAvatar),
    invertedColor: "rgb(0, 20, 40)",
    inputColor: je(re.alphaInput),
    codeColor: "rgb(244, 244, 248)",
    tabColor: "rgb(247, 247, 250)",
    actionColor: "rgb(250, 250, 252)",
    tableHeaderColor: "rgb(250, 250, 252)",
    hoverColor: "rgb(243, 243, 245)",
    // use color with alpha since it can be nested with header filter & sorter effect
    tableColorHover: "rgba(0, 0, 100, 0.03)",
    tableColorStriped: "rgba(0, 0, 100, 0.02)",
    pressedColor: "rgb(237, 237, 239)",
    opacityDisabled: re.alphaDisabled,
    inputColorDisabled: "rgb(250, 250, 252)",
    // secondary button color
    // can also be used in tertiary button & quaternary button
    buttonColor2: "rgba(46, 51, 56, .05)",
    buttonColor2Hover: "rgba(46, 51, 56, .09)",
    buttonColor2Pressed: "rgba(46, 51, 56, .13)",
    boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
    boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
    boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
  }), St = U1, G1 = {
    iconSizeSmall: "34px",
    iconSizeMedium: "40px",
    iconSizeLarge: "46px",
    iconSizeHuge: "52px"
  }, sc = (e) => {
    const { textColorDisabled: t, iconColor: o, textColor2: r, fontSizeSmall: n, fontSizeMedium: i, fontSizeLarge: a, fontSizeHuge: l } = e;
    return Object.assign(Object.assign({}, G1), {
      fontSizeSmall: n,
      fontSizeMedium: i,
      fontSizeLarge: a,
      fontSizeHuge: l,
      textColor: t,
      iconColor: o,
      extraTextColor: r
    });
  }, X1 = {
    name: "Empty",
    common: St,
    self: sc
  }, q1 = X1, Y1 = {
    name: "Empty",
    common: j,
    self: sc
  }, bo = Y1, cc = (e) => {
    const { scrollbarColor: t, scrollbarColorHover: o } = e;
    return {
      color: t,
      colorHover: o
    };
  }, Z1 = {
    name: "Scrollbar",
    common: St,
    self: cc
  }, K1 = Z1, J1 = {
    name: "Scrollbar",
    common: j,
    self: cc
  }, tt = J1, {
    cubicBezierEaseInOut: ol
  } = Xt;
  function hi({
    name: e = "fade-in",
    enterDuration: t = "0.2s",
    leaveDuration: o = "0.2s",
    enterCubicBezier: r = ol,
    leaveCubicBezier: n = ol
  } = {}) {
    return [E(`&.${e}-transition-enter-active`, {
      transition: `all ${t} ${r}!important`
    }), E(`&.${e}-transition-leave-active`, {
      transition: `all ${o} ${n}!important`
    }), E(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
      opacity: 0
    }), E(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
      opacity: 1
    })];
  }
  const Q1 = R("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [E(">", [R("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [E("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), E(">", [R("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), E(">, +", [R("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [V("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [E(">", [A("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), V("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [E(">", [A("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), V("disabled", [E(">", [A("scrollbar", {
    pointerEvents: "none"
  })])]), E(">", [A("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [hi(), E("&:hover", {
    backgroundColor: "var(--n-scrollbar-color-hover)"
  })])])])])]), ex = Object.assign(Object.assign({}, De.props), {
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
  }), dc = ie({
    name: "Scrollbar",
    props: ex,
    inheritAttrs: !1,
    setup(e) {
      const { mergedClsPrefixRef: t, inlineThemeDisabled: o, mergedRtlRef: r } = gt(e), n = Hi("Scrollbar", r, t), i = H(null), a = H(null), l = H(null), s = H(null), c = H(null), d = H(null), f = H(null), g = H(null), v = H(null), p = H(null), b = H(null), x = H(0), m = H(0), C = H(!1), D = H(!1);
      let I = !1, z = !1, $, h, P = 0, y = 0, S = 0, T = 0;
      const M = Pf(), L = k(() => {
        const { value: F } = g, { value: K } = d, { value: le } = p;
        return F === null || K === null || le === null ? 0 : Math.min(F, le * F / K + e.size * 1.5);
      }), O = k(() => `${L.value}px`), N = k(() => {
        const { value: F } = v, { value: K } = f, { value: le } = b;
        return F === null || K === null || le === null ? 0 : le * F / K + e.size * 1.5;
      }), q = k(() => `${N.value}px`), Y = k(() => {
        const { value: F } = g, { value: K } = x, { value: le } = d, { value: me } = p;
        if (F === null || le === null || me === null)
          return 0;
        {
          const Re = le - F;
          return Re ? K / Re * (me - L.value) : 0;
        }
      }), Q = k(() => `${Y.value}px`), fe = k(() => {
        const { value: F } = v, { value: K } = m, { value: le } = f, { value: me } = b;
        if (F === null || le === null || me === null)
          return 0;
        {
          const Re = le - F;
          return Re ? K / Re * (me - N.value) : 0;
        }
      }), be = k(() => `${fe.value}px`), Ie = k(() => {
        const { value: F } = g, { value: K } = d;
        return F !== null && K !== null && K > F;
      }), Fe = k(() => {
        const { value: F } = v, { value: K } = f;
        return F !== null && K !== null && K > F;
      }), ct = k(() => {
        const { trigger: F } = e;
        return F === "none" || C.value;
      }), Te = k(() => {
        const { trigger: F } = e;
        return F === "none" || D.value;
      }), Me = k(() => {
        const { container: F } = e;
        return F ? F() : a.value;
      }), ge = k(() => {
        const { content: F } = e;
        return F ? F() : l.value;
      }), rt = $p(() => {
        e.container || Xe({
          top: x.value,
          left: m.value
        });
      }), $t = () => {
        rt.isDeactivated || Je();
      }, de = (F) => {
        if (rt.isDeactivated)
          return;
        const { onResize: K } = e;
        K && K(F), Je();
      }, Xe = (F, K) => {
        if (!e.scrollable)
          return;
        if (typeof F == "number") {
          U(K ?? 0, F, 0, !1, "auto");
          return;
        }
        const { left: le, top: me, index: Re, elSize: Ae, position: Ye, behavior: Ce, el: Qe, debounce: _t = !0 } = F;
        (le !== void 0 || me !== void 0) && U(le ?? 0, me ?? 0, 0, !1, Ce), Qe !== void 0 ? U(0, Qe.offsetTop, Qe.offsetHeight, _t, Ce) : Re !== void 0 && Ae !== void 0 ? U(0, Re * Ae, Ae, _t, Ce) : Ye === "bottom" ? U(0, Number.MAX_SAFE_INTEGER, 0, !1, Ce) : Ye === "top" && U(0, 0, 0, !1, Ce);
      }, We = (F, K) => {
        if (!e.scrollable)
          return;
        const { value: le } = Me;
        le && (typeof F == "object" ? le.scrollBy(F) : le.scrollBy(F, K || 0));
      };
      function U(F, K, le, me, Re) {
        const { value: Ae } = Me;
        if (Ae) {
          if (me) {
            const { scrollTop: Ye, offsetHeight: Ce } = Ae;
            if (K > Ye) {
              K + le <= Ye + Ce || Ae.scrollTo({
                left: F,
                top: K + le - Ce,
                behavior: Re
              });
              return;
            }
          }
          Ae.scrollTo({
            left: F,
            top: K,
            behavior: Re
          });
        }
      }
      function ne() {
        J(), oe(), Je();
      }
      function Z() {
        ue();
      }
      function ue() {
        _(), W();
      }
      function _() {
        h !== void 0 && window.clearTimeout(h), h = window.setTimeout(() => {
          D.value = !1;
        }, e.duration);
      }
      function W() {
        $ !== void 0 && window.clearTimeout($), $ = window.setTimeout(() => {
          C.value = !1;
        }, e.duration);
      }
      function J() {
        $ !== void 0 && window.clearTimeout($), C.value = !0;
      }
      function oe() {
        h !== void 0 && window.clearTimeout(h), D.value = !0;
      }
      function ce(F) {
        const { onScroll: K } = e;
        K && K(F), pe();
      }
      function pe() {
        const { value: F } = Me;
        F && (x.value = F.scrollTop, m.value = F.scrollLeft * (n != null && n.value ? -1 : 1));
      }
      function qe() {
        const { value: F } = ge;
        F && (d.value = F.offsetHeight, f.value = F.offsetWidth);
        const { value: K } = Me;
        K && (g.value = K.offsetHeight, v.value = K.offsetWidth);
        const { value: le } = c, { value: me } = s;
        le && (b.value = le.offsetWidth), me && (p.value = me.offsetHeight);
      }
      function Et() {
        const { value: F } = Me;
        F && (x.value = F.scrollTop, m.value = F.scrollLeft * (n != null && n.value ? -1 : 1), g.value = F.offsetHeight, v.value = F.offsetWidth, d.value = F.scrollHeight, f.value = F.scrollWidth);
        const { value: K } = c, { value: le } = s;
        K && (b.value = K.offsetWidth), le && (p.value = le.offsetHeight);
      }
      function Je() {
        e.scrollable && (e.useUnifiedContainer ? Et() : (qe(), pe()));
      }
      function Co(F) {
        var K;
        return !(!((K = i.value) === null || K === void 0) && K.contains(rn(F)));
      }
      function Jo(F) {
        F.preventDefault(), F.stopPropagation(), z = !0, Oe("mousemove", window, yo, !0), Oe("mouseup", window, wo, !0), y = m.value, S = n != null && n.value ? window.innerWidth - F.clientX : F.clientX;
      }
      function yo(F) {
        if (!z)
          return;
        $ !== void 0 && window.clearTimeout($), h !== void 0 && window.clearTimeout(h);
        const { value: K } = v, { value: le } = f, { value: me } = N;
        if (K === null || le === null)
          return;
        const Ae = (n != null && n.value ? window.innerWidth - F.clientX - S : F.clientX - S) * (le - K) / (K - me), Ye = le - K;
        let Ce = y + Ae;
        Ce = Math.min(Ye, Ce), Ce = Math.max(Ce, 0);
        const { value: Qe } = Me;
        if (Qe) {
          Qe.scrollLeft = Ce * (n != null && n.value ? -1 : 1);
          const { internalOnUpdateScrollLeft: _t } = e;
          _t && _t(Ce);
        }
      }
      function wo(F) {
        F.preventDefault(), F.stopPropagation(), Pe("mousemove", window, yo, !0), Pe("mouseup", window, wo, !0), z = !1, Je(), Co(F) && ue();
      }
      function Qo(F) {
        F.preventDefault(), F.stopPropagation(), I = !0, Oe("mousemove", window, qt, !0), Oe("mouseup", window, Yt, !0), P = x.value, T = F.clientY;
      }
      function qt(F) {
        if (!I)
          return;
        $ !== void 0 && window.clearTimeout($), h !== void 0 && window.clearTimeout(h);
        const { value: K } = g, { value: le } = d, { value: me } = L;
        if (K === null || le === null)
          return;
        const Ae = (F.clientY - T) * (le - K) / (K - me), Ye = le - K;
        let Ce = P + Ae;
        Ce = Math.min(Ye, Ce), Ce = Math.max(Ce, 0);
        const { value: Qe } = Me;
        Qe && (Qe.scrollTop = Ce);
      }
      function Yt(F) {
        F.preventDefault(), F.stopPropagation(), Pe("mousemove", window, qt, !0), Pe("mouseup", window, Yt, !0), I = !1, Je(), Co(F) && ue();
      }
      Ge(() => {
        const { value: F } = Fe, { value: K } = Ie, { value: le } = t, { value: me } = c, { value: Re } = s;
        me && (F ? me.classList.remove(`${le}-scrollbar-rail--disabled`) : me.classList.add(`${le}-scrollbar-rail--disabled`)), Re && (K ? Re.classList.remove(`${le}-scrollbar-rail--disabled`) : Re.classList.add(`${le}-scrollbar-rail--disabled`));
      }), yt(() => {
        e.container || Je();
      }), st(() => {
        $ !== void 0 && window.clearTimeout($), h !== void 0 && window.clearTimeout(h), Pe("mousemove", window, qt, !0), Pe("mouseup", window, Yt, !0);
      });
      const er = De("Scrollbar", "-scrollbar", Q1, K1, e, t), So = k(() => {
        const { common: { cubicBezierEaseInOut: F, scrollbarBorderRadius: K, scrollbarHeight: le, scrollbarWidth: me }, self: { color: Re, colorHover: Ae } } = er.value;
        return {
          "--n-scrollbar-bezier": F,
          "--n-scrollbar-color": Re,
          "--n-scrollbar-color-hover": Ae,
          "--n-scrollbar-border-radius": K,
          "--n-scrollbar-width": me,
          "--n-scrollbar-height": le
        };
      }), Pt = o ? Ft("scrollbar", void 0, So, e) : void 0;
      return Object.assign(Object.assign({}, {
        scrollTo: Xe,
        scrollBy: We,
        sync: Je,
        syncUnifiedContainer: Et,
        handleMouseEnterWrapper: ne,
        handleMouseLeaveWrapper: Z
      }), {
        mergedClsPrefix: t,
        rtlEnabled: n,
        containerScrollTop: x,
        wrapperRef: i,
        containerRef: a,
        contentRef: l,
        yRailRef: s,
        xRailRef: c,
        needYBar: Ie,
        needXBar: Fe,
        yBarSizePx: O,
        xBarSizePx: q,
        yBarTopPx: Q,
        xBarLeftPx: be,
        isShowXBar: ct,
        isShowYBar: Te,
        isIos: M,
        handleScroll: ce,
        handleContentResize: $t,
        handleContainerResize: de,
        handleYScrollMouseDown: Qo,
        handleXScrollMouseDown: Jo,
        cssVars: o ? void 0 : So,
        themeClass: Pt == null ? void 0 : Pt.themeClass,
        onRender: Pt == null ? void 0 : Pt.onRender
      });
    },
    render() {
      var e;
      const { $slots: t, mergedClsPrefix: o, triggerDisplayManually: r, rtlEnabled: n, internalHoistYRail: i } = this;
      if (!this.scrollable)
        return (e = t.default) === null || e === void 0 ? void 0 : e.call(t);
      const a = this.trigger === "none", l = () => u("div", { ref: "yRailRef", class: [
        `${o}-scrollbar-rail`,
        `${o}-scrollbar-rail--vertical`
      ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, u(a ? Qi : Nt, a ? null : { name: "fade-in-transition" }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? u("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        }, onMousedown: this.handleYScrollMouseDown }) : null
      })), s = () => {
        var d, f;
        return (d = this.onRender) === null || d === void 0 || d.call(this), u("div", xr(this.$attrs, {
          role: "none",
          ref: "wrapperRef",
          class: [
            `${o}-scrollbar`,
            this.themeClass,
            n && `${o}-scrollbar--rtl`
          ],
          style: this.cssVars,
          onMouseenter: r ? void 0 : this.handleMouseEnterWrapper,
          onMouseleave: r ? void 0 : this.handleMouseLeaveWrapper
        }), [
          this.container ? (f = t.default) === null || f === void 0 ? void 0 : f.call(t) : u(
            "div",
            { role: "none", ref: "containerRef", class: [
              `${o}-scrollbar-container`,
              this.containerClass
            ], style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel },
            u(jo, { onResize: this.handleContentResize }, {
              default: () => u("div", { ref: "contentRef", role: "none", style: [
                {
                  width: this.xScrollable ? "fit-content" : null
                },
                this.contentStyle
              ], class: [
                `${o}-scrollbar-content`,
                this.contentClass
              ] }, t)
            })
          ),
          i ? null : l(),
          this.xScrollable && u("div", { ref: "xRailRef", class: [
            `${o}-scrollbar-rail`,
            `${o}-scrollbar-rail--horizontal`
          ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, u(a ? Qi : Nt, a ? null : { name: "fade-in-transition" }, {
            default: () => this.needXBar && this.isShowXBar && !this.isIos ? u("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
              width: this.xBarSizePx,
              right: n ? this.xBarLeftPx : void 0,
              left: n ? void 0 : this.xBarLeftPx
            }, onMousedown: this.handleXScrollMouseDown }) : null
          }))
        ]);
      }, c = this.container ? s() : u(jo, { onResize: this.handleContainerResize }, {
        default: s
      });
      return i ? u(
        ft,
        null,
        c,
        l()
      ) : c;
    }
  }), tx = dc, ox = dc, rx = {
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
  }, nx = (e) => {
    const { borderRadius: t, popoverColor: o, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: a, textColorDisabled: l, primaryColor: s, opacityDisabled: c, hoverColor: d, fontSizeSmall: f, fontSizeMedium: g, fontSizeLarge: v, fontSizeHuge: p, heightSmall: b, heightMedium: x, heightLarge: m, heightHuge: C } = e;
    return Object.assign(Object.assign({}, rx), { optionFontSizeSmall: f, optionFontSizeMedium: g, optionFontSizeLarge: v, optionFontSizeHuge: p, optionHeightSmall: b, optionHeightMedium: x, optionHeightLarge: m, optionHeightHuge: C, borderRadius: t, color: o, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: a, optionTextColorDisabled: l, optionTextColorActive: s, optionOpacityDisabled: c, optionCheckColor: s, optionColorPending: d, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: d, actionTextColor: i, loadingColor: s });
  }, ix = {
    name: "InternalSelectMenu",
    common: j,
    peers: {
      Scrollbar: tt,
      Empty: bo
    },
    self: nx
  }, Br = ix, {
    cubicBezierEaseIn: rl,
    cubicBezierEaseOut: nl
  } = Xt;
  function ax({
    transformOrigin: e = "inherit",
    duration: t = ".2s",
    enterScale: o = ".9",
    originalTransform: r = "",
    originalTransition: n = ""
  } = {}) {
    return [E("&.fade-in-scale-up-transition-leave-active", {
      transformOrigin: e,
      transition: `opacity ${t} ${rl}, transform ${t} ${rl} ${n && "," + n}`
    }), E("&.fade-in-scale-up-transition-enter-active", {
      transformOrigin: e,
      transition: `opacity ${t} ${nl}, transform ${t} ${nl} ${n && "," + n}`
    }), E("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
      opacity: 0,
      transform: `${r} scale(${o})`
    }), E("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
      opacity: 1,
      transform: `${r} scale(1)`
    })];
  }
  const lx = R("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), sx = ie({
    name: "BaseWave",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      }
    },
    setup(e) {
      qo("-base-wave", lx, se(e, "clsPrefix"));
      const t = H(null), o = H(!1);
      let r = null;
      return st(() => {
        r !== null && window.clearTimeout(r);
      }), {
        active: o,
        selfRef: t,
        play() {
          r !== null && (window.clearTimeout(r), o.value = !1, r = null), Rt(() => {
            var n;
            (n = t.value) === null || n === void 0 || n.offsetHeight, o.value = !0, r = window.setTimeout(() => {
              o.value = !1, r = null;
            }, 1e3);
          });
        }
      };
    },
    render() {
      const { clsPrefix: e } = this;
      return u("div", { ref: "selfRef", "aria-hidden": !0, class: [
        `${e}-base-wave`,
        this.active && `${e}-base-wave--active`
      ] });
    }
  }), cx = {
    space: "6px",
    spaceArrow: "10px",
    arrowOffset: "10px",
    arrowOffsetVertical: "10px",
    arrowHeight: "6px",
    padding: "8px 14px"
  }, uc = (e) => {
    const { boxShadow2: t, popoverColor: o, textColor2: r, borderRadius: n, fontSize: i, dividerColor: a } = e;
    return Object.assign(Object.assign({}, cx), {
      fontSize: i,
      borderRadius: n,
      color: o,
      dividerColor: a,
      textColor: r,
      boxShadow: t
    });
  }, dx = {
    name: "Popover",
    common: St,
    self: uc
  }, fc = dx, ux = {
    name: "Popover",
    common: j,
    self: uc
  }, xo = ux, Ln = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
  }, He = "var(--n-arrow-height) * 1.414", fx = E([R("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [E(">", [R("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), nt("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [nt("scrollable", [nt("show-header-or-footer", "padding: var(--n-padding);")])]), A("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), A("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), V("scrollable, show-header-or-footer", [A("content", `
 padding: var(--n-padding);
 `)])]), R("popover-shared", `
 transform-origin: inherit;
 `, [
    R("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [R("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${He});
 height: calc(${He});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
    // body transition
    E("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
    E("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
    E("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
    E("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
  ]), dt("top-start", `
 top: calc(${He} / -2);
 left: calc(${kt("top-start")} - var(--v-offset-left));
 `), dt("top", `
 top: calc(${He} / -2);
 transform: translateX(calc(${He} / -2)) rotate(45deg);
 left: 50%;
 `), dt("top-end", `
 top: calc(${He} / -2);
 right: calc(${kt("top-end")} + var(--v-offset-left));
 `), dt("bottom-start", `
 bottom: calc(${He} / -2);
 left: calc(${kt("bottom-start")} - var(--v-offset-left));
 `), dt("bottom", `
 bottom: calc(${He} / -2);
 transform: translateX(calc(${He} / -2)) rotate(45deg);
 left: 50%;
 `), dt("bottom-end", `
 bottom: calc(${He} / -2);
 right: calc(${kt("bottom-end")} + var(--v-offset-left));
 `), dt("left-start", `
 left: calc(${He} / -2);
 top: calc(${kt("left-start")} - var(--v-offset-top));
 `), dt("left", `
 left: calc(${He} / -2);
 transform: translateY(calc(${He} / -2)) rotate(45deg);
 top: 50%;
 `), dt("left-end", `
 left: calc(${He} / -2);
 bottom: calc(${kt("left-end")} + var(--v-offset-top));
 `), dt("right-start", `
 right: calc(${He} / -2);
 top: calc(${kt("right-start")} - var(--v-offset-top));
 `), dt("right", `
 right: calc(${He} / -2);
 transform: translateY(calc(${He} / -2)) rotate(45deg);
 top: 50%;
 `), dt("right-end", `
 right: calc(${He} / -2);
 bottom: calc(${kt("right-end")} + var(--v-offset-top));
 `), ...wb({
    top: ["right-start", "left-start"],
    right: ["top-end", "bottom-end"],
    bottom: ["right-end", "left-end"],
    left: ["top-start", "bottom-start"]
  }, (e, t) => {
    const o = ["right", "left"].includes(t), r = o ? "width" : "height";
    return e.map((n) => {
      const i = n.split("-")[1] === "end", l = `calc((${`var(--v-target-${r}, 0px)`} - ${He}) / 2)`, s = kt(n);
      return E(`[v-placement="${n}"] >`, [R("popover-shared", [V("center-arrow", [R("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${o ? "left" : "top"}));`)])])]);
    });
  })]);
  function kt(e) {
    return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
  }
  function dt(e, t) {
    const o = e.split("-")[0], r = ["top", "bottom"].includes(o) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
    return E(`[v-placement="${e}"] >`, [R("popover-shared", `
 margin-${Ln[o]}: var(--n-space);
 `, [V("show-arrow", `
 margin-${Ln[o]}: var(--n-space-arrow);
 `), V("overlap", `
 margin: 0;
 `), gf("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${o}: 100%;
 ${Ln[o]}: auto;
 ${r}
 `, [R("popover-arrow", t)])])]);
  }
  const pc = Object.assign(Object.assign({}, De.props), {
    to: Wo.propTo,
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
  }), px = ({ arrowStyle: e, clsPrefix: t }) => u(
    "div",
    { key: "__popover-arrow__", class: `${t}-popover-arrow-wrapper` },
    u("div", { class: `${t}-popover-arrow`, style: e })
  ), hx = ie({
    name: "PopoverBody",
    inheritAttrs: !1,
    props: pc,
    setup(e, { slots: t, attrs: o }) {
      const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = gt(e), a = De("Popover", "-popover", fx, fc, e, n), l = H(null), s = ve("NPopover"), c = H(null), d = H(e.show), f = H(!1);
      Ge(() => {
        const { show: h } = e;
        h && !vf() && !e.internalDeactivateImmediately && (f.value = !0);
      });
      const g = k(() => {
        const { trigger: h, onClickoutside: P } = e, y = [], { positionManuallyRef: { value: S } } = s;
        return S || (h === "click" && !P && y.push([
          aa,
          I,
          void 0,
          { capture: !0 }
        ]), h === "hover" && y.push([Mf, D])), P && y.push([
          aa,
          I,
          void 0,
          { capture: !0 }
        ]), (e.displayDirective === "show" || e.animated && f.value) && y.push([Ir, e.show]), y;
      }), v = k(() => {
        const h = e.width === "trigger" ? void 0 : Ot(e.width), P = [];
        h && P.push({ width: h });
        const { maxWidth: y, minWidth: S } = e;
        return y && P.push({ maxWidth: Ot(y) }), S && P.push({ maxWidth: Ot(S) }), i || P.push(p.value), P;
      }), p = k(() => {
        const { common: { cubicBezierEaseInOut: h, cubicBezierEaseIn: P, cubicBezierEaseOut: y }, self: { space: S, spaceArrow: T, padding: M, fontSize: L, textColor: O, dividerColor: N, color: q, boxShadow: Y, borderRadius: Q, arrowHeight: fe, arrowOffset: be, arrowOffsetVertical: Ie } } = a.value;
        return {
          "--n-box-shadow": Y,
          "--n-bezier": h,
          "--n-bezier-ease-in": P,
          "--n-bezier-ease-out": y,
          "--n-font-size": L,
          "--n-text-color": O,
          "--n-color": q,
          "--n-divider-color": N,
          "--n-border-radius": Q,
          "--n-arrow-height": fe,
          "--n-arrow-offset": be,
          "--n-arrow-offset-vertical": Ie,
          "--n-padding": M,
          "--n-space": S,
          "--n-space-arrow": T
        };
      }), b = i ? Ft("popover", void 0, p, e) : void 0;
      s.setBodyInstance({
        syncPosition: x
      }), st(() => {
        s.setBodyInstance(null);
      }), ke(se(e, "show"), (h) => {
        e.animated || (h ? d.value = !0 : d.value = !1);
      });
      function x() {
        var h;
        (h = l.value) === null || h === void 0 || h.syncPosition();
      }
      function m(h) {
        e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(h);
      }
      function C(h) {
        e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(h);
      }
      function D(h) {
        e.trigger === "hover" && !z().contains(rn(h)) && s.handleMouseMoveOutside(h);
      }
      function I(h) {
        (e.trigger === "click" && !z().contains(rn(h)) || e.onClickoutside) && s.handleClickOutside(h);
      }
      function z() {
        return s.getTriggerElement();
      }
      lt(Xl, c), lt(Gl, null), lt(Ul, null);
      function $() {
        if (b == null || b.onRender(), !(e.displayDirective === "show" || e.show || e.animated && f.value))
          return null;
        let P;
        const y = s.internalRenderBodyRef.value, { value: S } = n;
        if (y)
          P = y(
            // The popover class and overlap class must exists, they will be used
            // to place the body & transition animation.
            // Shadow class exists for reuse box-shadow.
            [
              `${S}-popover-shared`,
              b == null ? void 0 : b.themeClass.value,
              e.overlap && `${S}-popover-shared--overlap`,
              e.showArrow && `${S}-popover-shared--show-arrow`,
              e.arrowPointToCenter && `${S}-popover-shared--center-arrow`
            ],
            c,
            v.value,
            m,
            C
          );
        else {
          const { value: T } = s.extraClassRef, { internalTrapFocus: M } = e, L = !ei(t.header) || !ei(t.footer), O = () => {
            var N;
            const q = L ? u(
              ft,
              null,
              Ct(t.header, (fe) => fe ? u("div", { class: `${S}-popover__header`, style: e.headerStyle }, fe) : null),
              Ct(t.default, (fe) => fe ? u("div", { class: `${S}-popover__content`, style: e.contentStyle }, t) : null),
              Ct(t.footer, (fe) => fe ? u("div", { class: `${S}-popover__footer`, style: e.footerStyle }, fe) : null)
            ) : e.scrollable ? (N = t.default) === null || N === void 0 ? void 0 : N.call(t) : u("div", { class: `${S}-popover__content`, style: e.contentStyle }, t), Y = e.scrollable ? u(ox, { contentClass: L ? void 0 : `${S}-popover__content`, contentStyle: L ? void 0 : e.contentStyle }, {
              default: () => q
            }) : q, Q = e.showArrow ? px({
              arrowStyle: e.arrowStyle,
              clsPrefix: S
            }) : null;
            return [Y, Q];
          };
          P = u("div", xr({
            class: [
              `${S}-popover`,
              `${S}-popover-shared`,
              b == null ? void 0 : b.themeClass.value,
              T.map((N) => `${S}-${N}`),
              {
                [`${S}-popover--scrollable`]: e.scrollable,
                [`${S}-popover--show-header-or-footer`]: L,
                [`${S}-popover--raw`]: e.raw,
                [`${S}-popover-shared--overlap`]: e.overlap,
                [`${S}-popover-shared--show-arrow`]: e.showArrow,
                [`${S}-popover-shared--center-arrow`]: e.arrowPointToCenter
              }
            ],
            ref: c,
            style: v.value,
            onKeydown: s.handleKeydown,
            onMouseenter: m,
            onMouseleave: C
          }, o), M ? u(Sp, { active: e.show, autoFocus: !0 }, { default: O }) : O());
        }
        return co(P, g.value);
      }
      return {
        displayed: f,
        namespace: r,
        isMounted: s.isMountedRef,
        zIndex: s.zIndexRef,
        followerRef: l,
        adjustedTo: Wo(e),
        followerEnabled: d,
        renderContentNode: $
      };
    },
    render() {
      return u(Kf, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === Wo.tdkey }, {
        default: () => this.animated ? u(Nt, {
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
  }), gx = Object.keys(pc), vx = {
    focus: ["onFocus", "onBlur"],
    click: ["onClick"],
    hover: ["onMouseenter", "onMouseleave"],
    manual: [],
    nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
  };
  function mx(e, t, o) {
    vx[t].forEach((r) => {
      e.props ? e.props = Object.assign({}, e.props) : e.props = {};
      const n = e.props[r], i = o[r];
      n ? e.props[r] = (...a) => {
        n(...a), i(...a);
      } : e.props[r] = i;
    });
  }
  const bx = xt("").type, hc = {
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
    to: Wo.propTo,
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
  }, xx = Object.assign(Object.assign(Object.assign({}, De.props), hc), { internalOnAfterLeave: Function, internalRenderBody: Function }), Cx = ie({
    name: "Popover",
    inheritAttrs: !1,
    props: xx,
    __popover__: !0,
    setup(e) {
      process.env.NODE_ENV !== "production" && Ge(() => {
        e.maxWidth !== void 0 && bt("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && bt("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && bt("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && bt("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && bt("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
      });
      const t = gn(), o = H(null), r = k(() => e.show), n = H(e.defaultShow), i = hn(r, n), a = Ze(() => e.disabled ? !1 : i.value), l = () => {
        if (e.disabled)
          return !0;
        const { getDisabled: O } = e;
        return !!(O != null && O());
      }, s = () => l() ? !1 : i.value, c = oi(e, ["arrow", "showArrow"]), d = k(() => e.overlap ? !1 : c.value);
      let f = null;
      const g = H(null), v = H(null), p = Ze(() => e.x !== void 0 && e.y !== void 0);
      function b(O) {
        const { "onUpdate:show": N, onUpdateShow: q, onShow: Y, onHide: Q } = e;
        n.value = O, N && xe(N, O), q && xe(q, O), O && Y && xe(Y, !0), O && Q && xe(Q, !1);
      }
      function x() {
        f && f.syncPosition();
      }
      function m() {
        const { value: O } = g;
        O && (window.clearTimeout(O), g.value = null);
      }
      function C() {
        const { value: O } = v;
        O && (window.clearTimeout(O), v.value = null);
      }
      function D() {
        const O = l();
        if (e.trigger === "focus" && !O) {
          if (s())
            return;
          b(!0);
        }
      }
      function I() {
        const O = l();
        if (e.trigger === "focus" && !O) {
          if (!s())
            return;
          b(!1);
        }
      }
      function z() {
        const O = l();
        if (e.trigger === "hover" && !O) {
          if (C(), g.value !== null || s())
            return;
          const N = () => {
            b(!0), g.value = null;
          }, { delay: q } = e;
          q === 0 ? N() : g.value = window.setTimeout(N, q);
        }
      }
      function $() {
        const O = l();
        if (e.trigger === "hover" && !O) {
          if (m(), v.value !== null || !s())
            return;
          const N = () => {
            b(!1), v.value = null;
          }, { duration: q } = e;
          q === 0 ? N() : v.value = window.setTimeout(N, q);
        }
      }
      function h() {
        $();
      }
      function P(O) {
        var N;
        s() && (e.trigger === "click" && (m(), C(), b(!1)), (N = e.onClickoutside) === null || N === void 0 || N.call(e, O));
      }
      function y() {
        if (e.trigger === "click" && !l()) {
          m(), C();
          const O = !s();
          b(O);
        }
      }
      function S(O) {
        e.internalTrapFocus && O.key === "Escape" && (m(), C(), b(!1));
      }
      function T(O) {
        n.value = O;
      }
      function M() {
        var O;
        return (O = o.value) === null || O === void 0 ? void 0 : O.targetRef;
      }
      function L(O) {
        f = O;
      }
      return lt("NPopover", {
        getTriggerElement: M,
        handleKeydown: S,
        handleMouseEnter: z,
        handleMouseLeave: $,
        handleClickOutside: P,
        handleMouseMoveOutside: h,
        setBodyInstance: L,
        positionManuallyRef: p,
        isMountedRef: t,
        zIndexRef: se(e, "zIndex"),
        extraClassRef: se(e, "internalExtraClass"),
        internalRenderBodyRef: se(e, "internalRenderBody")
      }), Ge(() => {
        i.value && l() && b(!1);
      }), {
        binderInstRef: o,
        positionManually: p,
        mergedShowConsideringDisabledProp: a,
        // if to show popover body
        uncontrolledShow: n,
        mergedShowArrow: d,
        getMergedShow: s,
        setShow: T,
        handleClick: y,
        handleMouseEnter: z,
        handleMouseLeave: $,
        handleFocus: D,
        handleBlur: I,
        syncPosition: x
      };
    },
    render() {
      var e;
      const { positionManually: t, $slots: o } = this;
      let r, n = !1;
      if (!t && (o.activator ? r = Ji(o, "activator") : r = Ji(o, "trigger"), r)) {
        r = en(r), r = r.type === bx ? u("span", [r]) : r;
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
          const { internalInheritedEventHandlers: a } = this, l = [
            i,
            ...a
          ], s = {
            onBlur: (c) => {
              l.forEach((d) => {
                d.onBlur(c);
              });
            },
            onFocus: (c) => {
              l.forEach((d) => {
                d.onFocus(c);
              });
            },
            onClick: (c) => {
              l.forEach((d) => {
                d.onClick(c);
              });
            },
            onMouseenter: (c) => {
              l.forEach((d) => {
                d.onMouseenter(c);
              });
            },
            onMouseleave: (c) => {
              l.forEach((d) => {
                d.onMouseleave(c);
              });
            }
          };
          mx(r, a ? "nested" : t ? "manual" : this.trigger, s);
        }
      }
      return u(Bf, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
        default: () => {
          this.mergedShowConsideringDisabledProp;
          const i = this.getMergedShow();
          return [
            this.internalTrapFocus && i ? co(u("div", { style: { position: "fixed", inset: 0 } }), [
              [
                Si,
                {
                  enabled: i,
                  zIndex: this.zIndex
                }
              ]
            ]) : null,
            t ? null : u(kf, null, {
              default: () => r
            }),
            u(hx, Wu(this.$props, gx, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
              default: () => {
                var a, l;
                return (l = (a = this.$slots).default) === null || l === void 0 ? void 0 : l.call(a);
              },
              header: () => {
                var a, l;
                return (l = (a = this.$slots).header) === null || l === void 0 ? void 0 : l.call(a);
              },
              footer: () => {
                var a, l;
                return (l = (a = this.$slots).footer) === null || l === void 0 ? void 0 : l.call(a);
              }
            })
          ];
        }
      });
    }
  }), yx = {
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
  }, wx = {
    name: "Tag",
    common: j,
    self(e) {
      const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: c, borderColor: d, tagColor: f, opacityDisabled: g, closeIconColor: v, closeIconColorHover: p, closeIconColorPressed: b, closeColorHover: x, closeColorPressed: m, borderRadiusSmall: C, fontSizeMini: D, fontSizeTiny: I, fontSizeSmall: z, fontSizeMedium: $, heightMini: h, heightTiny: P, heightSmall: y, heightMedium: S, buttonColor2Hover: T, buttonColor2Pressed: M, fontWeightStrong: L } = e;
      return Object.assign(Object.assign({}, yx), {
        closeBorderRadius: C,
        heightTiny: h,
        heightSmall: P,
        heightMedium: y,
        heightLarge: S,
        borderRadius: C,
        opacityDisabled: g,
        fontSizeTiny: D,
        fontSizeSmall: I,
        fontSizeMedium: z,
        fontSizeLarge: $,
        fontWeightStrong: L,
        // checked
        textColorCheckable: t,
        textColorHoverCheckable: t,
        textColorPressedCheckable: t,
        textColorChecked: c,
        colorCheckable: "#0000",
        colorHoverCheckable: T,
        colorPressedCheckable: M,
        colorChecked: n,
        colorCheckedHover: o,
        colorCheckedPressed: r,
        // default
        border: `1px solid ${d}`,
        textColor: t,
        color: f,
        colorBordered: "#0000",
        closeIconColor: v,
        closeIconColorHover: p,
        closeIconColorPressed: b,
        closeColorHover: x,
        closeColorPressed: m,
        borderPrimary: `1px solid ${X(n, { alpha: 0.3 })}`,
        textColorPrimary: n,
        colorPrimary: X(n, { alpha: 0.16 }),
        colorBorderedPrimary: "#0000",
        closeIconColorPrimary: _e(n, { lightness: 0.7 }),
        closeIconColorHoverPrimary: _e(n, { lightness: 0.7 }),
        closeIconColorPressedPrimary: _e(n, {
          lightness: 0.7
        }),
        closeColorHoverPrimary: X(n, { alpha: 0.16 }),
        closeColorPressedPrimary: X(n, { alpha: 0.12 }),
        borderInfo: `1px solid ${X(i, { alpha: 0.3 })}`,
        textColorInfo: i,
        colorInfo: X(i, { alpha: 0.16 }),
        colorBorderedInfo: "#0000",
        closeIconColorInfo: _e(i, { alpha: 0.7 }),
        closeIconColorHoverInfo: _e(i, { alpha: 0.7 }),
        closeIconColorPressedInfo: _e(i, { alpha: 0.7 }),
        closeColorHoverInfo: X(i, { alpha: 0.16 }),
        closeColorPressedInfo: X(i, { alpha: 0.12 }),
        borderSuccess: `1px solid ${X(a, { alpha: 0.3 })}`,
        textColorSuccess: a,
        colorSuccess: X(a, { alpha: 0.16 }),
        colorBorderedSuccess: "#0000",
        closeIconColorSuccess: _e(a, { alpha: 0.7 }),
        closeIconColorHoverSuccess: _e(a, { alpha: 0.7 }),
        closeIconColorPressedSuccess: _e(a, { alpha: 0.7 }),
        closeColorHoverSuccess: X(a, { alpha: 0.16 }),
        closeColorPressedSuccess: X(a, { alpha: 0.12 }),
        borderWarning: `1px solid ${X(l, { alpha: 0.3 })}`,
        textColorWarning: l,
        colorWarning: X(l, { alpha: 0.16 }),
        colorBorderedWarning: "#0000",
        closeIconColorWarning: _e(l, { alpha: 0.7 }),
        closeIconColorHoverWarning: _e(l, { alpha: 0.7 }),
        closeIconColorPressedWarning: _e(l, { alpha: 0.7 }),
        closeColorHoverWarning: X(l, { alpha: 0.16 }),
        closeColorPressedWarning: X(l, { alpha: 0.11 }),
        borderError: `1px solid ${X(s, { alpha: 0.3 })}`,
        textColorError: s,
        colorError: X(s, { alpha: 0.16 }),
        colorBorderedError: "#0000",
        closeIconColorError: _e(s, { alpha: 0.7 }),
        closeIconColorHoverError: _e(s, { alpha: 0.7 }),
        closeIconColorPressedError: _e(s, { alpha: 0.7 }),
        closeColorHoverError: X(s, { alpha: 0.16 }),
        closeColorPressedError: X(s, { alpha: 0.12 })
      });
    }
  }, gc = wx, Sx = R("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [E(">", [A("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [E("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), E("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), A("placeholder", `
 display: flex;
 `), A("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [zr({
    originalTransform: "translateX(-50%) translateY(-50%)",
    left: "50%",
    top: "50%"
  })])])]), gi = ie({
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
      return qo("-base-clear", Sx, se(e, "clsPrefix")), {
        handleMouseDown(t) {
          t.preventDefault();
        }
      };
    },
    render() {
      const { clsPrefix: e } = this;
      return u(
        "div",
        { class: `${e}-base-clear` },
        u(yn, null, {
          default: () => {
            var t, o;
            return this.show ? u("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Ao(this.$slots.icon, () => [
              u($e, { clsPrefix: e }, {
                default: () => u(T1, null)
              })
            ])) : u("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (o = (t = this.$slots).placeholder) === null || o === void 0 ? void 0 : o.call(t));
          }
        })
      );
    }
  }), $x = ie({
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
    setup(e, { slots: t }) {
      return () => {
        const { clsPrefix: o } = e;
        return u(ic, { clsPrefix: o, class: `${o}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
          default: () => e.showArrow ? u(gi, { clsPrefix: o, show: e.showClear, onClear: e.onClear }, {
            placeholder: () => u($e, { clsPrefix: o, class: `${o}-base-suffix__arrow` }, {
              default: () => Ao(t.default, () => [
                u(P1, null)
              ])
            })
          }) : null
        });
      };
    }
  }), Px = {
    paddingSingle: "0 26px 0 12px",
    paddingMultiple: "3px 26px 0 12px",
    clearSize: "16px",
    arrowSize: "16px"
  }, Tx = {
    name: "InternalSelection",
    common: j,
    peers: {
      Popover: xo
    },
    self(e) {
      const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: c, errorColor: d, errorColorHover: f, iconColor: g, iconColorDisabled: v, clearColor: p, clearColorHover: b, clearColorPressed: x, placeholderColor: m, placeholderColorDisabled: C, fontSizeTiny: D, fontSizeSmall: I, fontSizeMedium: z, fontSizeLarge: $, heightTiny: h, heightSmall: P, heightMedium: y, heightLarge: S } = e;
      return Object.assign(Object.assign({}, Px), {
        fontSizeTiny: D,
        fontSizeSmall: I,
        fontSizeMedium: z,
        fontSizeLarge: $,
        heightTiny: h,
        heightSmall: P,
        heightMedium: y,
        heightLarge: S,
        borderRadius: t,
        // default
        textColor: o,
        textColorDisabled: r,
        placeholderColor: m,
        placeholderColorDisabled: C,
        color: n,
        colorDisabled: i,
        colorActive: X(a, { alpha: 0.1 }),
        border: "1px solid #0000",
        borderHover: `1px solid ${l}`,
        borderActive: `1px solid ${a}`,
        borderFocus: `1px solid ${l}`,
        boxShadowHover: "none",
        boxShadowActive: `0 0 8px 0 ${X(a, {
          alpha: 0.4
        })}`,
        boxShadowFocus: `0 0 8px 0 ${X(a, {
          alpha: 0.4
        })}`,
        caretColor: a,
        arrowColor: g,
        arrowColorDisabled: v,
        loadingColor: a,
        // warning
        borderWarning: `1px solid ${s}`,
        borderHoverWarning: `1px solid ${c}`,
        borderActiveWarning: `1px solid ${s}`,
        borderFocusWarning: `1px solid ${c}`,
        boxShadowHoverWarning: "none",
        boxShadowActiveWarning: `0 0 8px 0 ${X(s, {
          alpha: 0.4
        })}`,
        boxShadowFocusWarning: `0 0 8px 0 ${X(s, {
          alpha: 0.4
        })}`,
        colorActiveWarning: X(s, { alpha: 0.1 }),
        caretColorWarning: s,
        // error
        borderError: `1px solid ${d}`,
        borderHoverError: `1px solid ${f}`,
        borderActiveError: `1px solid ${d}`,
        borderFocusError: `1px solid ${f}`,
        boxShadowHoverError: "none",
        boxShadowActiveError: `0 0 8px 0 ${X(d, {
          alpha: 0.4
        })}`,
        boxShadowFocusError: `0 0 8px 0 ${X(d, {
          alpha: 0.4
        })}`,
        colorActiveError: X(d, { alpha: 0.1 }),
        caretColorError: d,
        clearColor: p,
        clearColorHover: b,
        clearColorPressed: x
      });
    }
  }, Li = Tx, {
    cubicBezierEaseInOut: jt
  } = Xt;
  function zx({
    duration: e = ".2s",
    delay: t = ".1s"
  } = {}) {
    return [E("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
      opacity: 1
    }), E("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), E("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${jt},
 max-width ${e} ${jt} ${t},
 margin-left ${e} ${jt} ${t},
 margin-right ${e} ${jt} ${t};
 `), E("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${jt} ${t},
 max-width ${e} ${jt},
 margin-left ${e} ${jt},
 margin-right ${e} ${jt};
 `)];
  }
  const Rx = {
    iconMargin: "11px 8px 0 12px",
    iconMarginRtl: "11px 12px 0 8px",
    iconSize: "24px",
    closeIconSize: "16px",
    closeSize: "20px",
    closeMargin: "13px 14px 0 0",
    closeMarginRtl: "13px 0 0 14px",
    padding: "13px"
  }, Ix = {
    name: "Alert",
    common: j,
    self(e) {
      const { lineHeight: t, borderRadius: o, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: a, textColor2: l, closeColorHover: s, closeColorPressed: c, closeIconColor: d, closeIconColorHover: f, closeIconColorPressed: g, infoColorSuppl: v, successColorSuppl: p, warningColorSuppl: b, errorColorSuppl: x, fontSize: m } = e;
      return Object.assign(Object.assign({}, Rx), {
        fontSize: m,
        lineHeight: t,
        titleFontWeight: r,
        borderRadius: o,
        border: `1px solid ${n}`,
        color: i,
        titleTextColor: a,
        iconColor: l,
        contentTextColor: l,
        closeBorderRadius: o,
        closeColorHover: s,
        closeColorPressed: c,
        closeIconColor: d,
        closeIconColorHover: f,
        closeIconColorPressed: g,
        borderInfo: `1px solid ${X(v, { alpha: 0.35 })}`,
        colorInfo: X(v, { alpha: 0.25 }),
        titleTextColorInfo: a,
        iconColorInfo: v,
        contentTextColorInfo: l,
        closeColorHoverInfo: s,
        closeColorPressedInfo: c,
        closeIconColorInfo: d,
        closeIconColorHoverInfo: f,
        closeIconColorPressedInfo: g,
        borderSuccess: `1px solid ${X(p, {
          alpha: 0.35
        })}`,
        colorSuccess: X(p, { alpha: 0.25 }),
        titleTextColorSuccess: a,
        iconColorSuccess: p,
        contentTextColorSuccess: l,
        closeColorHoverSuccess: s,
        closeColorPressedSuccess: c,
        closeIconColorSuccess: d,
        closeIconColorHoverSuccess: f,
        closeIconColorPressedSuccess: g,
        borderWarning: `1px solid ${X(b, {
          alpha: 0.35
        })}`,
        colorWarning: X(b, { alpha: 0.25 }),
        titleTextColorWarning: a,
        iconColorWarning: b,
        contentTextColorWarning: l,
        closeColorHoverWarning: s,
        closeColorPressedWarning: c,
        closeIconColorWarning: d,
        closeIconColorHoverWarning: f,
        closeIconColorPressedWarning: g,
        borderError: `1px solid ${X(x, { alpha: 0.35 })}`,
        colorError: X(x, { alpha: 0.25 }),
        titleTextColorError: a,
        iconColorError: x,
        contentTextColorError: l,
        closeColorHoverError: s,
        closeColorPressedError: c,
        closeIconColorError: d,
        closeIconColorHoverError: f,
        closeIconColorPressedError: g
      });
    }
  }, Dx = Ix, {
    cubicBezierEaseInOut: zt,
    cubicBezierEaseOut: Ex,
    cubicBezierEaseIn: _x
  } = Xt;
  function il({
    overflow: e = "hidden",
    duration: t = ".3s",
    originalTransition: o = "",
    leavingDelay: r = "0s",
    foldPadding: n = !1,
    enterToProps: i = void 0,
    leaveToProps: a = void 0,
    reverse: l = !1
  } = {}) {
    const s = l ? "leave" : "enter", c = l ? "enter" : "leave";
    return [E(`&.fade-in-height-expand-transition-${c}-from,
 &.fade-in-height-expand-transition-${s}-to`, Object.assign(Object.assign({}, i), {
      opacity: 1
    })), E(`&.fade-in-height-expand-transition-${c}-to,
 &.fade-in-height-expand-transition-${s}-from`, Object.assign(Object.assign({}, a), {
      opacity: 0,
      marginTop: "0 !important",
      marginBottom: "0 !important",
      paddingTop: n ? "0 !important" : void 0,
      paddingBottom: n ? "0 !important" : void 0
    })), E(`&.fade-in-height-expand-transition-${c}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${zt} ${r},
 opacity ${t} ${Ex} ${r},
 margin-top ${t} ${zt} ${r},
 margin-bottom ${t} ${zt} ${r},
 padding-top ${t} ${zt} ${r},
 padding-bottom ${t} ${zt} ${r}
 ${o ? "," + o : ""}
 `), E(`&.fade-in-height-expand-transition-${s}-active`, `
 overflow: ${e};
 transition:
 max-height ${t} ${zt},
 opacity ${t} ${_x},
 margin-top ${t} ${zt},
 margin-bottom ${t} ${zt},
 padding-top ${t} ${zt},
 padding-bottom ${t} ${zt}
 ${o ? "," + o : ""}
 `)];
  }
  const Bx = {
    linkFontSize: "13px",
    linkPadding: "0 0 0 16px",
    railWidth: "4px"
  }, kx = (e) => {
    const { borderRadius: t, railColor: o, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: a } = e;
    return Object.assign(Object.assign({}, Bx), {
      borderRadius: t,
      railColor: o,
      railColorActive: r,
      linkColor: X(r, { alpha: 0.15 }),
      linkTextColor: a,
      linkTextColorHover: n,
      linkTextColorPressed: i,
      linkTextColorActive: r
    });
  }, Ox = {
    name: "Anchor",
    common: j,
    self: kx
  }, Mx = Ox, Hx = ho && "chrome" in window;
  ho && navigator.userAgent.includes("Firefox");
  const vc = ho && navigator.userAgent.includes("Safari") && !Hx, mc = {
    paddingTiny: "0 8px",
    paddingSmall: "0 10px",
    paddingMedium: "0 12px",
    paddingLarge: "0 14px",
    clearSize: "16px"
  }, Ax = {
    name: "Input",
    common: j,
    self(e) {
      const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, warningColor: s, warningColorHover: c, errorColor: d, errorColorHover: f, borderRadius: g, lineHeight: v, fontSizeTiny: p, fontSizeSmall: b, fontSizeMedium: x, fontSizeLarge: m, heightTiny: C, heightSmall: D, heightMedium: I, heightLarge: z, clearColor: $, clearColorHover: h, clearColorPressed: P, placeholderColor: y, placeholderColorDisabled: S, iconColor: T, iconColorDisabled: M, iconColorHover: L, iconColorPressed: O } = e;
      return Object.assign(Object.assign({}, mc), {
        countTextColorDisabled: r,
        countTextColor: o,
        heightTiny: C,
        heightSmall: D,
        heightMedium: I,
        heightLarge: z,
        fontSizeTiny: p,
        fontSizeSmall: b,
        fontSizeMedium: x,
        fontSizeLarge: m,
        lineHeight: v,
        lineHeightTextarea: v,
        borderRadius: g,
        iconSize: "16px",
        groupLabelColor: a,
        textColor: t,
        textColorDisabled: r,
        textDecorationColor: t,
        groupLabelTextColor: t,
        caretColor: n,
        placeholderColor: y,
        placeholderColorDisabled: S,
        color: a,
        colorDisabled: l,
        colorFocus: X(n, { alpha: 0.1 }),
        groupLabelBorder: "1px solid #0000",
        border: "1px solid #0000",
        borderHover: `1px solid ${i}`,
        borderDisabled: "1px solid #0000",
        borderFocus: `1px solid ${i}`,
        boxShadowFocus: `0 0 8px 0 ${X(n, { alpha: 0.3 })}`,
        loadingColor: n,
        // warning
        loadingColorWarning: s,
        borderWarning: `1px solid ${s}`,
        borderHoverWarning: `1px solid ${c}`,
        colorFocusWarning: X(s, { alpha: 0.1 }),
        borderFocusWarning: `1px solid ${c}`,
        boxShadowFocusWarning: `0 0 8px 0 ${X(s, {
          alpha: 0.3
        })}`,
        caretColorWarning: s,
        // error
        loadingColorError: d,
        borderError: `1px solid ${d}`,
        borderHoverError: `1px solid ${f}`,
        colorFocusError: X(d, { alpha: 0.1 }),
        borderFocusError: `1px solid ${f}`,
        boxShadowFocusError: `0 0 8px 0 ${X(d, {
          alpha: 0.3
        })}`,
        caretColorError: d,
        clearColor: $,
        clearColorHover: h,
        clearColorPressed: P,
        iconColor: T,
        iconColorDisabled: M,
        iconColorHover: L,
        iconColorPressed: O,
        suffixTextColor: t
      });
    }
  }, vt = Ax, Lx = (e) => {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, borderColor: s, warningColor: c, warningColorHover: d, errorColor: f, errorColorHover: g, borderRadius: v, lineHeight: p, fontSizeTiny: b, fontSizeSmall: x, fontSizeMedium: m, fontSizeLarge: C, heightTiny: D, heightSmall: I, heightMedium: z, heightLarge: $, actionColor: h, clearColor: P, clearColorHover: y, clearColorPressed: S, placeholderColor: T, placeholderColorDisabled: M, iconColor: L, iconColorDisabled: O, iconColorHover: N, iconColorPressed: q } = e;
    return Object.assign(Object.assign({}, mc), {
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: D,
      heightSmall: I,
      heightMedium: z,
      heightLarge: $,
      fontSizeTiny: b,
      fontSizeSmall: x,
      fontSizeMedium: m,
      fontSizeLarge: C,
      lineHeight: p,
      lineHeightTextarea: p,
      borderRadius: v,
      iconSize: "16px",
      groupLabelColor: h,
      groupLabelTextColor: t,
      textColor: t,
      textColorDisabled: r,
      textDecorationColor: t,
      caretColor: n,
      placeholderColor: T,
      placeholderColorDisabled: M,
      color: a,
      colorDisabled: l,
      colorFocus: a,
      groupLabelBorder: `1px solid ${s}`,
      border: `1px solid ${s}`,
      borderHover: `1px solid ${i}`,
      borderDisabled: `1px solid ${s}`,
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 0 2px ${X(n, { alpha: 0.2 })}`,
      loadingColor: n,
      // warning
      loadingColorWarning: c,
      borderWarning: `1px solid ${c}`,
      borderHoverWarning: `1px solid ${d}`,
      colorFocusWarning: a,
      borderFocusWarning: `1px solid ${d}`,
      boxShadowFocusWarning: `0 0 0 2px ${X(c, {
        alpha: 0.2
      })}`,
      caretColorWarning: c,
      // error
      loadingColorError: f,
      borderError: `1px solid ${f}`,
      borderHoverError: `1px solid ${g}`,
      colorFocusError: a,
      borderFocusError: `1px solid ${g}`,
      boxShadowFocusError: `0 0 0 2px ${X(f, {
        alpha: 0.2
      })}`,
      caretColorError: f,
      clearColor: P,
      clearColorHover: y,
      clearColorPressed: S,
      iconColor: L,
      iconColorDisabled: O,
      iconColorHover: N,
      iconColorPressed: q,
      suffixTextColor: t
    });
  }, Fx = {
    name: "Input",
    common: St,
    self: Lx
  }, Wx = Fx, bc = "n-input";
  function jx(e) {
    let t = 0;
    for (const o of e)
      t++;
    return t;
  }
  function jr(e) {
    return e === "" || e == null;
  }
  function Nx(e) {
    const t = H(null);
    function o() {
      const { value: i } = e;
      if (!(i != null && i.focus)) {
        n();
        return;
      }
      const { selectionStart: a, selectionEnd: l, value: s } = i;
      if (a == null || l == null) {
        n();
        return;
      }
      t.value = {
        start: a,
        end: l,
        beforeText: s.slice(0, a),
        afterText: s.slice(l)
      };
    }
    function r() {
      var i;
      const { value: a } = t, { value: l } = e;
      if (!a || !l)
        return;
      const { value: s } = l, { start: c, beforeText: d, afterText: f } = a;
      let g = s.length;
      if (s.endsWith(f))
        g = s.length - f.length;
      else if (s.startsWith(d))
        g = d.length;
      else {
        const v = d[c - 1], p = s.indexOf(v, c - 1);
        p !== -1 && (g = p + 1);
      }
      (i = l.setSelectionRange) === null || i === void 0 || i.call(l, g, g);
    }
    function n() {
      t.value = null;
    }
    return ke(e, n), {
      recordCursor: o,
      restoreCursor: r
    };
  }
  const al = ie({
    name: "InputWordCount",
    setup(e, { slots: t }) {
      const { mergedValueRef: o, maxlengthRef: r, mergedClsPrefixRef: n, countGraphemesRef: i } = (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ve(bc)
      ), a = k(() => {
        const { value: l } = o;
        return l === null || Array.isArray(l) ? 0 : (i.value || jx)(l);
      });
      return () => {
        const { value: l } = r, { value: s } = o;
        return u("span", { class: `${n.value}-input-word-count` }, Vu(t.default, {
          value: s === null || Array.isArray(s) ? "" : s
        }, () => [
          l === void 0 ? a.value : `${a.value} / ${l}`
        ]));
      };
    }
  }), Vx = R("input", `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [
    // common
    A("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
    A("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),
    A("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [E("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), E("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), E("&:-webkit-autofill ~", [A("placeholder", "display: none;")])]),
    V("round", [nt("textarea", "border-radius: calc(var(--n-height) / 2);")]),
    A("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [E("span", `
 width: 100%;
 display: inline-block;
 `)]),
    V("textarea", [A("placeholder", "overflow: visible;")]),
    nt("autosize", "width: 100%;"),
    V("autosize", [A("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
    // input
    R("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
    A("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
    A("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [E("+", [A("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
    nt("textarea", [A("placeholder", "white-space: nowrap;")]),
    A("eye", `
 transition: color .3s var(--n-bezier);
 `),
    // textarea
    V("textarea", "width: 100%;", [R("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), V("resizable", [R("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), A("textarea-el, textarea-mirror, placeholder", `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 `), A("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
    // pair
    V("pair", [A("input-el, placeholder", "text-align: center;"), A("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [R("icon", `
 color: var(--n-icon-color);
 `), R("base-icon", `
 color: var(--n-icon-color);
 `)])]),
    V("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [A("border", "border: var(--n-border-disabled);"), A("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), A("placeholder", "color: var(--n-placeholder-color-disabled);"), A("separator", "color: var(--n-text-color-disabled);", [R("icon", `
 color: var(--n-icon-color-disabled);
 `), R("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), R("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), A("suffix, prefix", "color: var(--n-text-color-disabled);", [R("icon", `
 color: var(--n-icon-color-disabled);
 `), R("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
    nt("disabled", [A("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-icon-color);
 cursor: pointer;
 `, [E("&:hover", `
 color: var(--n-icon-color-hover);
 `), E("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), E("&:hover", [A("state-border", "border: var(--n-border-hover);")]), V("focus", "background-color: var(--n-color-focus);", [A("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
    A("border, state-border", `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),
    A("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
    A("prefix", "margin-right: 4px;"),
    A("suffix", `
 margin-left: 4px;
 `),
    A("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [R("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), R("base-clear", `
 font-size: var(--n-icon-size);
 `, [A("placeholder", [R("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), E(">", [R("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), R("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
    R("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
    ["warning", "error"].map((e) => V(`${e}-status`, [nt("disabled", [R("base-loading", `
 color: var(--n-loading-color-${e})
 `), A("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), A("state-border", `
 border: var(--n-border-${e});
 `), E("&:hover", [A("state-border", `
 border: var(--n-border-hover-${e});
 `)]), E("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), V("focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
  ]), Ux = R("input", [V("disabled", [A("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), Gx = Object.assign(Object.assign({}, De.props), {
    bordered: {
      type: Boolean,
      default: void 0
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: [Array, String],
    defaultValue: {
      type: [String, Array],
      default: null
    },
    value: [String, Array],
    disabled: {
      type: Boolean,
      default: void 0
    },
    size: String,
    rows: {
      type: [Number, String],
      default: 3
    },
    round: Boolean,
    minlength: [String, Number],
    maxlength: [String, Number],
    clearable: Boolean,
    autosize: {
      type: [Boolean, Object],
      default: !1
    },
    pair: Boolean,
    separator: String,
    readonly: {
      type: [String, Boolean],
      default: !1
    },
    passivelyActivated: Boolean,
    showPasswordOn: String,
    stateful: {
      type: Boolean,
      default: !0
    },
    autofocus: Boolean,
    inputProps: Object,
    resizable: {
      type: Boolean,
      default: !0
    },
    showCount: Boolean,
    loading: {
      type: Boolean,
      default: void 0
    },
    allowInput: Function,
    renderCount: Function,
    onMousedown: Function,
    onKeydown: Function,
    onKeyup: Function,
    onInput: [Function, Array],
    onFocus: [Function, Array],
    onBlur: [Function, Array],
    onClick: [Function, Array],
    onChange: [Function, Array],
    onClear: [Function, Array],
    countGraphemes: Function,
    status: String,
    "onUpdate:value": [Function, Array],
    onUpdateValue: [Function, Array],
    /** private */
    textDecoration: [String, Array],
    attrSize: {
      type: Number,
      default: 20
    },
    onInputBlur: [Function, Array],
    onInputFocus: [Function, Array],
    onDeactivate: [Function, Array],
    onActivate: [Function, Array],
    onWrapperFocus: [Function, Array],
    onWrapperBlur: [Function, Array],
    internalDeactivateOnEnter: Boolean,
    internalForceFocus: Boolean,
    internalLoadingBeforeSuffix: Boolean,
    /** deprecated */
    showPasswordToggle: Boolean
  }), cr = ie({
    name: "Input",
    props: Gx,
    setup(e) {
      process.env.NODE_ENV !== "production" && Ge(() => {
        e.showPasswordToggle && bt("input", '`show-password-toggle` is deprecated, please use `showPasswordOn="click"` instead');
      });
      const { mergedClsPrefixRef: t, mergedBorderedRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = gt(e), i = De("Input", "-input", Vx, Wx, e, t);
      vc && qo("-input-safari", Ux, t);
      const a = H(null), l = H(null), s = H(null), c = H(null), d = H(null), f = H(null), g = H(null), v = Nx(g), p = H(null), { localeRef: b } = Js("Input"), x = H(e.defaultValue), m = se(e, "value"), C = hn(m, x), D = Pi(e), { mergedSizeRef: I, mergedDisabledRef: z, mergedStatusRef: $ } = D, h = H(!1), P = H(!1), y = H(!1), S = H(!1);
      let T = null;
      const M = k(() => {
        const { placeholder: w, pair: B } = e;
        return B ? Array.isArray(w) ? w : w === void 0 ? ["", ""] : [w, w] : w === void 0 ? [b.value.placeholder] : [w];
      }), L = k(() => {
        const { value: w } = y, { value: B } = C, { value: ae } = M;
        return !w && (jr(B) || Array.isArray(B) && jr(B[0])) && ae[0];
      }), O = k(() => {
        const { value: w } = y, { value: B } = C, { value: ae } = M;
        return !w && ae[1] && (jr(B) || Array.isArray(B) && jr(B[1]));
      }), N = Ze(() => e.internalForceFocus || h.value), q = Ze(() => {
        if (z.value || e.readonly || !e.clearable || !N.value && !P.value)
          return !1;
        const { value: w } = C, { value: B } = N;
        return e.pair ? !!(Array.isArray(w) && (w[0] || w[1])) && (P.value || B) : !!w && (P.value || B);
      }), Y = k(() => {
        const { showPasswordOn: w } = e;
        if (w)
          return w;
        if (e.showPasswordToggle)
          return "click";
      }), Q = H(!1), fe = k(() => {
        const { textDecoration: w } = e;
        return w ? Array.isArray(w) ? w.map((B) => ({
          textDecoration: B
        })) : [
          {
            textDecoration: w
          }
        ] : ["", ""];
      }), be = H(void 0), Ie = () => {
        var w, B;
        if (e.type === "textarea") {
          const { autosize: ae } = e;
          if (ae && (be.value = (B = (w = p.value) === null || w === void 0 ? void 0 : w.$el) === null || B === void 0 ? void 0 : B.offsetWidth), !l.value || typeof ae == "boolean")
            return;
          const { paddingTop: ze, paddingBottom: Ee, lineHeight: ye } = window.getComputedStyle(l.value), Zt = Number(ze.slice(0, -2)), Kt = Number(Ee.slice(0, -2)), Jt = Number(ye.slice(0, -2)), { value: tr } = s;
          if (!tr)
            return;
          if (ae.minRows) {
            const or = Math.max(ae.minRows, 1), Sn = `${Zt + Kt + Jt * or}px`;
            tr.style.minHeight = Sn;
          }
          if (ae.maxRows) {
            const or = `${Zt + Kt + Jt * ae.maxRows}px`;
            tr.style.maxHeight = or;
          }
        }
      }, Fe = k(() => {
        const { maxlength: w } = e;
        return w === void 0 ? void 0 : Number(w);
      });
      yt(() => {
        const { value: w } = C;
        Array.isArray(w) || Ye(w);
      });
      const ct = No().proxy;
      function Te(w) {
        const { onUpdateValue: B, "onUpdate:value": ae, onInput: ze } = e, { nTriggerFormInput: Ee } = D;
        B && xe(B, w), ae && xe(ae, w), ze && xe(ze, w), x.value = w, Ee();
      }
      function Me(w) {
        const { onChange: B } = e, { nTriggerFormChange: ae } = D;
        B && xe(B, w), x.value = w, ae();
      }
      function ge(w) {
        const { onBlur: B } = e, { nTriggerFormBlur: ae } = D;
        B && xe(B, w), ae();
      }
      function rt(w) {
        const { onFocus: B } = e, { nTriggerFormFocus: ae } = D;
        B && xe(B, w), ae();
      }
      function $t(w) {
        const { onClear: B } = e;
        B && xe(B, w);
      }
      function de(w) {
        const { onInputBlur: B } = e;
        B && xe(B, w);
      }
      function Xe(w) {
        const { onInputFocus: B } = e;
        B && xe(B, w);
      }
      function We() {
        const { onDeactivate: w } = e;
        w && xe(w);
      }
      function U() {
        const { onActivate: w } = e;
        w && xe(w);
      }
      function ne(w) {
        const { onClick: B } = e;
        B && xe(B, w);
      }
      function Z(w) {
        const { onWrapperFocus: B } = e;
        B && xe(B, w);
      }
      function ue(w) {
        const { onWrapperBlur: B } = e;
        B && xe(B, w);
      }
      function _() {
        y.value = !0;
      }
      function W(w) {
        y.value = !1, w.target === f.value ? J(w, 1) : J(w, 0);
      }
      function J(w, B = 0, ae = "input") {
        const ze = w.target.value;
        if (Ye(ze), w instanceof InputEvent && !w.isComposing && (y.value = !1), e.type === "textarea") {
          const { value: ye } = p;
          ye && ye.syncUnifiedContainer();
        }
        if (T = ze, y.value)
          return;
        v.recordCursor();
        const Ee = oe(ze);
        if (Ee)
          if (!e.pair)
            ae === "input" ? Te(ze) : Me(ze);
          else {
            let { value: ye } = C;
            Array.isArray(ye) ? ye = [ye[0], ye[1]] : ye = ["", ""], ye[B] = ze, ae === "input" ? Te(ye) : Me(ye);
          }
        ct.$forceUpdate(), Ee || Rt(v.restoreCursor);
      }
      function oe(w) {
        const { countGraphemes: B, maxlength: ae, minlength: ze } = e;
        if (B) {
          let ye;
          if (ae !== void 0 && (ye === void 0 && (ye = B(w)), ye > Number(ae)) || ze !== void 0 && (ye === void 0 && (ye = B(w)), ye < Number(ae)))
            return !1;
        }
        const { allowInput: Ee } = e;
        return typeof Ee == "function" ? Ee(w) : !0;
      }
      function ce(w) {
        de(w), w.relatedTarget === a.value && We(), w.relatedTarget !== null && (w.relatedTarget === d.value || w.relatedTarget === f.value || w.relatedTarget === l.value) || (S.value = !1), Je(w, "blur"), g.value = null;
      }
      function pe(w, B) {
        Xe(w), h.value = !0, S.value = !0, U(), Je(w, "focus"), B === 0 ? g.value = d.value : B === 1 ? g.value = f.value : B === 2 && (g.value = l.value);
      }
      function qe(w) {
        e.passivelyActivated && (ue(w), Je(w, "blur"));
      }
      function Et(w) {
        e.passivelyActivated && (h.value = !0, Z(w), Je(w, "focus"));
      }
      function Je(w, B) {
        w.relatedTarget !== null && (w.relatedTarget === d.value || w.relatedTarget === f.value || w.relatedTarget === l.value || w.relatedTarget === a.value) || (B === "focus" ? (rt(w), h.value = !0) : B === "blur" && (ge(w), h.value = !1));
      }
      function Co(w, B) {
        J(w, B, "change");
      }
      function Jo(w) {
        ne(w);
      }
      function yo(w) {
        $t(w), e.pair ? (Te(["", ""]), Me(["", ""])) : (Te(""), Me(""));
      }
      function wo(w) {
        const { onMousedown: B } = e;
        B && B(w);
        const { tagName: ae } = w.target;
        if (ae !== "INPUT" && ae !== "TEXTAREA") {
          if (e.resizable) {
            const { value: ze } = a;
            if (ze) {
              const { left: Ee, top: ye, width: Zt, height: Kt } = ze.getBoundingClientRect(), Jt = 14;
              if (Ee + Zt - Jt < w.clientX && w.clientX < Ee + Zt && ye + Kt - Jt < w.clientY && w.clientY < ye + Kt)
                return;
            }
          }
          w.preventDefault(), h.value || F();
        }
      }
      function Qo() {
        var w;
        P.value = !0, e.type === "textarea" && ((w = p.value) === null || w === void 0 || w.handleMouseEnterWrapper());
      }
      function qt() {
        var w;
        P.value = !1, e.type === "textarea" && ((w = p.value) === null || w === void 0 || w.handleMouseLeaveWrapper());
      }
      function Yt() {
        z.value || Y.value === "click" && (Q.value = !Q.value);
      }
      function er(w) {
        if (z.value)
          return;
        w.preventDefault();
        const B = (ze) => {
          ze.preventDefault(), Pe("mouseup", document, B);
        };
        if (Oe("mouseup", document, B), Y.value !== "mousedown")
          return;
        Q.value = !0;
        const ae = () => {
          Q.value = !1, Pe("mouseup", document, ae);
        };
        Oe("mouseup", document, ae);
      }
      function So(w) {
        var B;
        switch ((B = e.onKeydown) === null || B === void 0 || B.call(e, w), w.key) {
          case "Escape":
            $o();
            break;
          case "Enter":
            Pt(w);
            break;
        }
      }
      function Pt(w) {
        var B, ae;
        if (e.passivelyActivated) {
          const { value: ze } = S;
          if (ze) {
            e.internalDeactivateOnEnter && $o();
            return;
          }
          w.preventDefault(), e.type === "textarea" ? (B = l.value) === null || B === void 0 || B.focus() : (ae = d.value) === null || ae === void 0 || ae.focus();
        }
      }
      function $o() {
        e.passivelyActivated && (S.value = !1, Rt(() => {
          var w;
          (w = a.value) === null || w === void 0 || w.focus();
        }));
      }
      function F() {
        var w, B, ae;
        z.value || (e.passivelyActivated ? (w = a.value) === null || w === void 0 || w.focus() : ((B = l.value) === null || B === void 0 || B.focus(), (ae = d.value) === null || ae === void 0 || ae.focus()));
      }
      function K() {
        var w;
        !((w = a.value) === null || w === void 0) && w.contains(document.activeElement) && document.activeElement.blur();
      }
      function le() {
        var w, B;
        (w = l.value) === null || w === void 0 || w.select(), (B = d.value) === null || B === void 0 || B.select();
      }
      function me() {
        z.value || (l.value ? l.value.focus() : d.value && d.value.focus());
      }
      function Re() {
        const { value: w } = a;
        w != null && w.contains(document.activeElement) && w !== document.activeElement && $o();
      }
      function Ae(w) {
        if (e.type === "textarea") {
          const { value: B } = l;
          B == null || B.scrollTo(w);
        } else {
          const { value: B } = d;
          B == null || B.scrollTo(w);
        }
      }
      function Ye(w) {
        const { type: B, pair: ae, autosize: ze } = e;
        if (!ae && ze)
          if (B === "textarea") {
            const { value: Ee } = s;
            Ee && (Ee.textContent = (w ?? "") + `\r
`);
          } else {
            const { value: Ee } = c;
            Ee && (w ? Ee.textContent = w : Ee.innerHTML = "&nbsp;");
          }
      }
      function Ce() {
        Ie();
      }
      const Qe = H({
        top: "0"
      });
      function _t(w) {
        var B;
        const { scrollTop: ae } = w.target;
        Qe.value.top = `${-ae}px`, (B = p.value) === null || B === void 0 || B.syncUnifiedContainer();
      }
      let Po = null;
      Ge(() => {
        const { autosize: w, type: B } = e;
        w && B === "textarea" ? Po = ke(C, (ae) => {
          !Array.isArray(ae) && ae !== T && Ye(ae);
        }) : Po == null || Po();
      });
      let To = null;
      Ge(() => {
        e.type === "textarea" ? To = ke(C, (w) => {
          var B;
          !Array.isArray(w) && w !== T && ((B = p.value) === null || B === void 0 || B.syncUnifiedContainer());
        }) : To == null || To();
      }), lt(bc, {
        mergedValueRef: C,
        maxlengthRef: Fe,
        mergedClsPrefixRef: t,
        countGraphemesRef: se(e, "countGraphemes")
      });
      const rd = {
        wrapperElRef: a,
        inputElRef: d,
        textareaElRef: l,
        isCompositing: y,
        focus: F,
        blur: K,
        select: le,
        deactivate: Re,
        activate: me,
        scrollTo: Ae
      }, nd = Hi("Input", n, t), Ni = k(() => {
        const { value: w } = I, { common: { cubicBezierEaseInOut: B }, self: { color: ae, borderRadius: ze, textColor: Ee, caretColor: ye, caretColorError: Zt, caretColorWarning: Kt, textDecorationColor: Jt, border: tr, borderDisabled: or, borderHover: Sn, borderFocus: id, placeholderColor: ad, placeholderColorDisabled: ld, lineHeightTextarea: sd, colorDisabled: cd, colorFocus: dd, textColorDisabled: ud, boxShadowFocus: fd, iconSize: pd, colorFocusWarning: hd, boxShadowFocusWarning: gd, borderWarning: vd, borderFocusWarning: md, borderHoverWarning: bd, colorFocusError: xd, boxShadowFocusError: Cd, borderError: yd, borderFocusError: wd, borderHoverError: Sd, clearSize: $d, clearColor: Pd, clearColorHover: Td, clearColorPressed: zd, iconColor: Rd, iconColorDisabled: Id, suffixTextColor: Dd, countTextColor: Ed, countTextColorDisabled: _d, iconColorHover: Bd, iconColorPressed: kd, loadingColor: Od, loadingColorError: Md, loadingColorWarning: Hd, [ee("padding", w)]: Ad, [ee("fontSize", w)]: Ld, [ee("height", w)]: Fd } } = i.value, { left: Wd, right: jd } = Eu(Ad);
        return {
          "--n-bezier": B,
          "--n-count-text-color": Ed,
          "--n-count-text-color-disabled": _d,
          "--n-color": ae,
          "--n-font-size": Ld,
          "--n-border-radius": ze,
          "--n-height": Fd,
          "--n-padding-left": Wd,
          "--n-padding-right": jd,
          "--n-text-color": Ee,
          "--n-caret-color": ye,
          "--n-text-decoration-color": Jt,
          "--n-border": tr,
          "--n-border-disabled": or,
          "--n-border-hover": Sn,
          "--n-border-focus": id,
          "--n-placeholder-color": ad,
          "--n-placeholder-color-disabled": ld,
          "--n-icon-size": pd,
          "--n-line-height-textarea": sd,
          "--n-color-disabled": cd,
          "--n-color-focus": dd,
          "--n-text-color-disabled": ud,
          "--n-box-shadow-focus": fd,
          "--n-loading-color": Od,
          // form warning
          "--n-caret-color-warning": Kt,
          "--n-color-focus-warning": hd,
          "--n-box-shadow-focus-warning": gd,
          "--n-border-warning": vd,
          "--n-border-focus-warning": md,
          "--n-border-hover-warning": bd,
          "--n-loading-color-warning": Hd,
          // form error
          "--n-caret-color-error": Zt,
          "--n-color-focus-error": xd,
          "--n-box-shadow-focus-error": Cd,
          "--n-border-error": yd,
          "--n-border-focus-error": wd,
          "--n-border-hover-error": Sd,
          "--n-loading-color-error": Md,
          // clear-button
          "--n-clear-color": Pd,
          "--n-clear-size": $d,
          "--n-clear-color-hover": Td,
          "--n-clear-color-pressed": zd,
          "--n-icon-color": Rd,
          "--n-icon-color-hover": Bd,
          "--n-icon-color-pressed": kd,
          "--n-icon-color-disabled": Id,
          "--n-suffix-text-color": Dd
        };
      }), zo = r ? Ft("input", k(() => {
        const { value: w } = I;
        return w[0];
      }), Ni, e) : void 0;
      return Object.assign(Object.assign({}, rd), {
        // DOM ref
        wrapperElRef: a,
        inputElRef: d,
        inputMirrorElRef: c,
        inputEl2Ref: f,
        textareaElRef: l,
        textareaMirrorElRef: s,
        textareaScrollbarInstRef: p,
        // value
        rtlEnabled: nd,
        uncontrolledValue: x,
        mergedValue: C,
        passwordVisible: Q,
        mergedPlaceholder: M,
        showPlaceholder1: L,
        showPlaceholder2: O,
        mergedFocus: N,
        isComposing: y,
        activated: S,
        showClearButton: q,
        mergedSize: I,
        mergedDisabled: z,
        textDecorationStyle: fe,
        mergedClsPrefix: t,
        mergedBordered: o,
        mergedShowPasswordOn: Y,
        placeholderStyle: Qe,
        mergedStatus: $,
        textAreaScrollContainerWidth: be,
        // methods
        handleTextAreaScroll: _t,
        handleCompositionStart: _,
        handleCompositionEnd: W,
        handleInput: J,
        handleInputBlur: ce,
        handleInputFocus: pe,
        handleWrapperBlur: qe,
        handleWrapperFocus: Et,
        handleMouseEnter: Qo,
        handleMouseLeave: qt,
        handleMouseDown: wo,
        handleChange: Co,
        handleClick: Jo,
        handleClear: yo,
        handlePasswordToggleClick: Yt,
        handlePasswordToggleMousedown: er,
        handleWrapperKeydown: So,
        handleTextAreaMirrorResize: Ce,
        getTextareaScrollContainer: () => l.value,
        mergedTheme: i,
        cssVars: r ? void 0 : Ni,
        themeClass: zo == null ? void 0 : zo.themeClass,
        onRender: zo == null ? void 0 : zo.onRender
      });
    },
    render() {
      var e, t;
      const { mergedClsPrefix: o, mergedStatus: r, themeClass: n, type: i, countGraphemes: a, onRender: l } = this, s = this.$slots;
      return l == null || l(), u(
        "div",
        { ref: "wrapperElRef", class: [
          `${o}-input`,
          n,
          r && `${o}-input--${r}-status`,
          {
            [`${o}-input--rtl`]: this.rtlEnabled,
            [`${o}-input--disabled`]: this.mergedDisabled,
            [`${o}-input--textarea`]: i === "textarea",
            [`${o}-input--resizable`]: this.resizable && !this.autosize,
            [`${o}-input--autosize`]: this.autosize,
            [`${o}-input--round`]: this.round && i !== "textarea",
            [`${o}-input--pair`]: this.pair,
            [`${o}-input--focus`]: this.mergedFocus,
            [`${o}-input--stateful`]: this.stateful
          }
        ], style: this.cssVars, tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0, onFocus: this.handleWrapperFocus, onBlur: this.handleWrapperBlur, onClick: this.handleClick, onMousedown: this.handleMouseDown, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd, onKeyup: this.onKeyup, onKeydown: this.handleWrapperKeydown },
        u(
          "div",
          { class: `${o}-input-wrapper` },
          Ct(s.prefix, (c) => c && u("div", { class: `${o}-input__prefix` }, c)),
          i === "textarea" ? u(tx, { ref: "textareaScrollbarInstRef", class: `${o}-input__textarea`, container: this.getTextareaScrollContainer, triggerDisplayManually: !0, useUnifiedContainer: !0, internalHoistYRail: !0 }, {
            default: () => {
              var c, d;
              const { textAreaScrollContainerWidth: f } = this, g = {
                width: this.autosize && f && `${f}px`
              };
              return u(
                ft,
                null,
                u("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [
                  `${o}-input__textarea-el`,
                  (c = this.inputProps) === null || c === void 0 ? void 0 : c.class
                ], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: [
                  this.textDecorationStyle[0],
                  (d = this.inputProps) === null || d === void 0 ? void 0 : d.style,
                  g
                ], onBlur: this.handleInputBlur, onFocus: (v) => this.handleInputFocus(v, 2), onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })),
                this.showPlaceholder1 ? u("div", { class: `${o}-input__placeholder`, style: [
                  this.placeholderStyle,
                  g
                ], key: "placeholder" }, this.mergedPlaceholder[0]) : null,
                this.autosize ? u(jo, { onResize: this.handleTextAreaMirrorResize }, {
                  default: () => u("div", { ref: "textareaMirrorElRef", class: `${o}-input__textarea-mirror`, key: "mirror" })
                }) : null
              );
            }
          }) : u(
            "div",
            { class: `${o}-input__input` },
            u("input", Object.assign({ type: i === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : i }, this.inputProps, { ref: "inputElRef", class: [
              `${o}-input__input-el`,
              (e = this.inputProps) === null || e === void 0 ? void 0 : e.class
            ], style: [
              this.textDecorationStyle[0],
              (t = this.inputProps) === null || t === void 0 ? void 0 : t.style
            ], tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, onBlur: this.handleInputBlur, onFocus: (c) => this.handleInputFocus(c, 0), onInput: (c) => this.handleInput(c, 0), onChange: (c) => this.handleChange(c, 0) })),
            this.showPlaceholder1 ? u(
              "div",
              { class: `${o}-input__placeholder` },
              u("span", null, this.mergedPlaceholder[0])
            ) : null,
            this.autosize ? u("div", { class: `${o}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, " ") : null
          ),
          !this.pair && Ct(s.suffix, (c) => c || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? u("div", { class: `${o}-input__suffix` }, [
            Ct(s["clear-icon-placeholder"], (d) => (this.clearable || d) && u(gi, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
              placeholder: () => d,
              icon: () => {
                var f, g;
                return (g = (f = this.$slots)["clear-icon"]) === null || g === void 0 ? void 0 : g.call(f);
              }
            })),
            this.internalLoadingBeforeSuffix ? null : c,
            this.loading !== void 0 ? u($x, { clsPrefix: o, loading: this.loading, showArrow: !1, showClear: !1, style: this.cssVars }) : null,
            this.internalLoadingBeforeSuffix ? c : null,
            this.showCount && this.type !== "textarea" ? u(al, null, {
              default: (d) => {
                var f;
                return (f = s.count) === null || f === void 0 ? void 0 : f.call(s, d);
              }
            }) : null,
            this.mergedShowPasswordOn && this.type === "password" ? u("div", { class: `${o}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible ? Ao(s["password-visible-icon"], () => [
              u($e, { clsPrefix: o }, { default: () => u(ec, null) })
            ]) : Ao(s["password-invisible-icon"], () => [
              u($e, { clsPrefix: o }, { default: () => u(y1, null) })
            ])) : null
          ]) : null)
        ),
        this.pair ? u("span", { class: `${o}-input__separator` }, Ao(s.separator, () => [this.separator])) : null,
        this.pair ? u(
          "div",
          { class: `${o}-input-wrapper` },
          u(
            "div",
            { class: `${o}-input__input` },
            u("input", { ref: "inputEl2Ref", type: this.type, class: `${o}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: (c) => this.handleInputFocus(c, 1), onInput: (c) => this.handleInput(c, 1), onChange: (c) => this.handleChange(c, 1) }),
            this.showPlaceholder2 ? u(
              "div",
              { class: `${o}-input__placeholder` },
              u("span", null, this.mergedPlaceholder[1])
            ) : null
          ),
          Ct(s.suffix, (c) => (this.clearable || c) && u("div", { class: `${o}-input__suffix` }, [
            this.clearable && u(gi, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
              icon: () => {
                var d;
                return (d = s["clear-icon"]) === null || d === void 0 ? void 0 : d.call(s);
              },
              placeholder: () => {
                var d;
                return (d = s["clear-icon-placeholder"]) === null || d === void 0 ? void 0 : d.call(s);
              }
            }),
            c
          ]))
        ) : null,
        this.mergedBordered ? u("div", { class: `${o}-input__border` }) : null,
        this.mergedBordered ? u("div", { class: `${o}-input__state-border` }) : null,
        this.showCount && i === "textarea" ? u(al, null, {
          default: (c) => {
            var d;
            const { renderCount: f } = this;
            return f ? f(c) : (d = s.count) === null || d === void 0 ? void 0 : d.call(s, c);
          }
        }) : null
      );
    }
  });
  function Xx(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  const qx = {
    name: "AutoComplete",
    common: j,
    peers: {
      InternalSelectMenu: Br,
      Input: vt
    },
    self: Xx
  }, Yx = qx, Fn = ho && "loading" in document.createElement("img"), Zx = (e = {}) => {
    var t;
    const { root: o = null } = e;
    return {
      hash: `${e.rootMargin || "0px 0px 0px 0px"}-${Array.isArray(e.threshold) ? e.threshold.join(",") : (t = e.threshold) !== null && t !== void 0 ? t : "0"}`,
      options: Object.assign(Object.assign({}, e), { root: (typeof o == "string" ? document.querySelector(o) : o) || document.documentElement })
    };
  }, Wn = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), Kx = (e, t, o) => {
    if (!e)
      return () => {
      };
    const r = Zx(t), { root: n } = r.options;
    let i;
    const a = Wn.get(n);
    a ? i = a : (i = /* @__PURE__ */ new Map(), Wn.set(n, i));
    let l, s;
    i.has(r.hash) ? (s = // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    i.get(r.hash), s[1].has(e) || (l = s[0], s[1].add(e), l.observe(e))) : (l = new IntersectionObserver((f) => {
      f.forEach((g) => {
        if (g.isIntersecting) {
          const v = jn.get(g.target), p = Nn.get(g.target);
          v && v(), p && (p.value = !0);
        }
      });
    }, r.options), l.observe(e), s = [l, /* @__PURE__ */ new Set([e])], i.set(r.hash, s));
    let c = !1;
    const d = () => {
      c || (jn.delete(e), Nn.delete(e), c = !0, s[1].has(e) && (s[0].unobserve(e), s[1].delete(e)), s[1].size <= 0 && i.delete(r.hash), i.size || Wn.delete(n));
    };
    return jn.set(e, d), Nn.set(e, o), d;
  }, Jx = (e) => {
    const { borderRadius: t, avatarColor: o, cardColor: r, fontSize: n, heightTiny: i, heightSmall: a, heightMedium: l, heightLarge: s, heightHuge: c, modalColor: d, popoverColor: f } = e;
    return {
      borderRadius: t,
      fontSize: n,
      border: `2px solid ${r}`,
      heightTiny: i,
      heightSmall: a,
      heightMedium: l,
      heightLarge: s,
      heightHuge: c,
      color: te(r, o),
      colorModal: te(d, o),
      colorPopover: te(f, o)
    };
  }, Qx = {
    name: "Avatar",
    common: j,
    self: Jx
  }, xc = Qx, eC = () => ({
    gap: "-12px"
  }), tC = {
    name: "AvatarGroup",
    common: j,
    peers: {
      Avatar: xc
    },
    self: eC
  }, oC = tC, rC = {
    width: "44px",
    height: "44px",
    borderRadius: "22px",
    iconSize: "26px"
  }, nC = {
    name: "BackTop",
    common: j,
    self(e) {
      const { popoverColor: t, textColor2: o, primaryColorHover: r, primaryColorPressed: n } = e;
      return Object.assign(Object.assign({}, rC), { color: t, textColor: o, iconColor: o, iconColorHover: r, iconColorPressed: n, boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)", boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)", boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)" });
    }
  }, iC = nC, aC = {
    name: "Badge",
    common: j,
    self(e) {
      const { errorColorSuppl: t, infoColorSuppl: o, successColorSuppl: r, warningColorSuppl: n, fontFamily: i } = e;
      return {
        color: t,
        colorInfo: o,
        colorSuccess: r,
        colorError: t,
        colorWarning: n,
        fontSize: "12px",
        fontFamily: i
      };
    }
  }, lC = aC, sC = {
    fontWeightActive: "400"
  }, cC = (e) => {
    const { fontSize: t, textColor3: o, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: a } = e;
    return Object.assign(Object.assign({}, sC), { fontSize: t, itemLineHeight: "1.25", itemTextColor: o, itemTextColorHover: r, itemTextColorPressed: r, itemTextColorActive: r, itemBorderRadius: n, itemColorHover: i, itemColorPressed: a, separatorColor: o });
  }, dC = {
    name: "Breadcrumb",
    common: j,
    self: cC
  }, uC = dC;
  function Qt(e) {
    return te(e, [255, 255, 255, 0.16]);
  }
  function Nr(e) {
    return te(e, [0, 0, 0, 0.12]);
  }
  const fC = "n-button-group", pC = {
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
  }, Cc = (e) => {
    const { heightTiny: t, heightSmall: o, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: a, fontSizeSmall: l, fontSizeMedium: s, fontSizeLarge: c, opacityDisabled: d, textColor2: f, textColor3: g, primaryColorHover: v, primaryColorPressed: p, borderColor: b, primaryColor: x, baseColor: m, infoColor: C, infoColorHover: D, infoColorPressed: I, successColor: z, successColorHover: $, successColorPressed: h, warningColor: P, warningColorHover: y, warningColorPressed: S, errorColor: T, errorColorHover: M, errorColorPressed: L, fontWeight: O, buttonColor2: N, buttonColor2Hover: q, buttonColor2Pressed: Y, fontWeightStrong: Q } = e;
    return Object.assign(Object.assign({}, pC), {
      heightTiny: t,
      heightSmall: o,
      heightMedium: r,
      heightLarge: n,
      borderRadiusTiny: i,
      borderRadiusSmall: i,
      borderRadiusMedium: i,
      borderRadiusLarge: i,
      fontSizeTiny: a,
      fontSizeSmall: l,
      fontSizeMedium: s,
      fontSizeLarge: c,
      opacityDisabled: d,
      // secondary
      colorOpacitySecondary: "0.16",
      colorOpacitySecondaryHover: "0.22",
      colorOpacitySecondaryPressed: "0.28",
      colorSecondary: N,
      colorSecondaryHover: q,
      colorSecondaryPressed: Y,
      // tertiary
      colorTertiary: N,
      colorTertiaryHover: q,
      colorTertiaryPressed: Y,
      // quaternary
      colorQuaternary: "#0000",
      colorQuaternaryHover: q,
      colorQuaternaryPressed: Y,
      // default type
      color: "#0000",
      colorHover: "#0000",
      colorPressed: "#0000",
      colorFocus: "#0000",
      colorDisabled: "#0000",
      textColor: f,
      textColorTertiary: g,
      textColorHover: v,
      textColorPressed: p,
      textColorFocus: v,
      textColorDisabled: f,
      textColorText: f,
      textColorTextHover: v,
      textColorTextPressed: p,
      textColorTextFocus: v,
      textColorTextDisabled: f,
      textColorGhost: f,
      textColorGhostHover: v,
      textColorGhostPressed: p,
      textColorGhostFocus: v,
      textColorGhostDisabled: f,
      border: `1px solid ${b}`,
      borderHover: `1px solid ${v}`,
      borderPressed: `1px solid ${p}`,
      borderFocus: `1px solid ${v}`,
      borderDisabled: `1px solid ${b}`,
      rippleColor: x,
      // primary
      colorPrimary: x,
      colorHoverPrimary: v,
      colorPressedPrimary: p,
      colorFocusPrimary: v,
      colorDisabledPrimary: x,
      textColorPrimary: m,
      textColorHoverPrimary: m,
      textColorPressedPrimary: m,
      textColorFocusPrimary: m,
      textColorDisabledPrimary: m,
      textColorTextPrimary: x,
      textColorTextHoverPrimary: v,
      textColorTextPressedPrimary: p,
      textColorTextFocusPrimary: v,
      textColorTextDisabledPrimary: f,
      textColorGhostPrimary: x,
      textColorGhostHoverPrimary: v,
      textColorGhostPressedPrimary: p,
      textColorGhostFocusPrimary: v,
      textColorGhostDisabledPrimary: x,
      borderPrimary: `1px solid ${x}`,
      borderHoverPrimary: `1px solid ${v}`,
      borderPressedPrimary: `1px solid ${p}`,
      borderFocusPrimary: `1px solid ${v}`,
      borderDisabledPrimary: `1px solid ${x}`,
      rippleColorPrimary: x,
      // info
      colorInfo: C,
      colorHoverInfo: D,
      colorPressedInfo: I,
      colorFocusInfo: D,
      colorDisabledInfo: C,
      textColorInfo: m,
      textColorHoverInfo: m,
      textColorPressedInfo: m,
      textColorFocusInfo: m,
      textColorDisabledInfo: m,
      textColorTextInfo: C,
      textColorTextHoverInfo: D,
      textColorTextPressedInfo: I,
      textColorTextFocusInfo: D,
      textColorTextDisabledInfo: f,
      textColorGhostInfo: C,
      textColorGhostHoverInfo: D,
      textColorGhostPressedInfo: I,
      textColorGhostFocusInfo: D,
      textColorGhostDisabledInfo: C,
      borderInfo: `1px solid ${C}`,
      borderHoverInfo: `1px solid ${D}`,
      borderPressedInfo: `1px solid ${I}`,
      borderFocusInfo: `1px solid ${D}`,
      borderDisabledInfo: `1px solid ${C}`,
      rippleColorInfo: C,
      // success
      colorSuccess: z,
      colorHoverSuccess: $,
      colorPressedSuccess: h,
      colorFocusSuccess: $,
      colorDisabledSuccess: z,
      textColorSuccess: m,
      textColorHoverSuccess: m,
      textColorPressedSuccess: m,
      textColorFocusSuccess: m,
      textColorDisabledSuccess: m,
      textColorTextSuccess: z,
      textColorTextHoverSuccess: $,
      textColorTextPressedSuccess: h,
      textColorTextFocusSuccess: $,
      textColorTextDisabledSuccess: f,
      textColorGhostSuccess: z,
      textColorGhostHoverSuccess: $,
      textColorGhostPressedSuccess: h,
      textColorGhostFocusSuccess: $,
      textColorGhostDisabledSuccess: z,
      borderSuccess: `1px solid ${z}`,
      borderHoverSuccess: `1px solid ${$}`,
      borderPressedSuccess: `1px solid ${h}`,
      borderFocusSuccess: `1px solid ${$}`,
      borderDisabledSuccess: `1px solid ${z}`,
      rippleColorSuccess: z,
      // warning
      colorWarning: P,
      colorHoverWarning: y,
      colorPressedWarning: S,
      colorFocusWarning: y,
      colorDisabledWarning: P,
      textColorWarning: m,
      textColorHoverWarning: m,
      textColorPressedWarning: m,
      textColorFocusWarning: m,
      textColorDisabledWarning: m,
      textColorTextWarning: P,
      textColorTextHoverWarning: y,
      textColorTextPressedWarning: S,
      textColorTextFocusWarning: y,
      textColorTextDisabledWarning: f,
      textColorGhostWarning: P,
      textColorGhostHoverWarning: y,
      textColorGhostPressedWarning: S,
      textColorGhostFocusWarning: y,
      textColorGhostDisabledWarning: P,
      borderWarning: `1px solid ${P}`,
      borderHoverWarning: `1px solid ${y}`,
      borderPressedWarning: `1px solid ${S}`,
      borderFocusWarning: `1px solid ${y}`,
      borderDisabledWarning: `1px solid ${P}`,
      rippleColorWarning: P,
      // error
      colorError: T,
      colorHoverError: M,
      colorPressedError: L,
      colorFocusError: M,
      colorDisabledError: T,
      textColorError: m,
      textColorHoverError: m,
      textColorPressedError: m,
      textColorFocusError: m,
      textColorDisabledError: m,
      textColorTextError: T,
      textColorTextHoverError: M,
      textColorTextPressedError: L,
      textColorTextFocusError: M,
      textColorTextDisabledError: f,
      textColorGhostError: T,
      textColorGhostHoverError: M,
      textColorGhostPressedError: L,
      textColorGhostFocusError: M,
      textColorGhostDisabledError: T,
      borderError: `1px solid ${T}`,
      borderHoverError: `1px solid ${M}`,
      borderPressedError: `1px solid ${L}`,
      borderFocusError: `1px solid ${M}`,
      borderDisabledError: `1px solid ${T}`,
      rippleColorError: T,
      waveOpacity: "0.6",
      fontWeight: O,
      fontWeightStrong: Q
    });
  }, yc = {
    name: "Button",
    common: St,
    self: Cc
  }, hC = {
    name: "Button",
    common: j,
    self(e) {
      const t = Cc(e);
      return t.waveOpacity = "0.8", t.colorOpacitySecondary = "0.16", t.colorOpacitySecondaryHover = "0.2", t.colorOpacitySecondaryPressed = "0.12", t;
    }
  }, ot = hC, gC = E([R("button", `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [V("color", [A("border", {
    borderColor: "var(--n-border-color)"
  }), V("disabled", [A("border", {
    borderColor: "var(--n-border-color-disabled)"
  })]), nt("disabled", [E("&:focus", [A("state-border", {
    borderColor: "var(--n-border-color-focus)"
  })]), E("&:hover", [A("state-border", {
    borderColor: "var(--n-border-color-hover)"
  })]), E("&:active", [A("state-border", {
    borderColor: "var(--n-border-color-pressed)"
  })]), V("pressed", [A("state-border", {
    borderColor: "var(--n-border-color-pressed)"
  })])])]), V("disabled", {
    backgroundColor: "var(--n-color-disabled)",
    color: "var(--n-text-color-disabled)"
  }, [A("border", {
    border: "var(--n-border-disabled)"
  })]), nt("disabled", [E("&:focus", {
    backgroundColor: "var(--n-color-focus)",
    color: "var(--n-text-color-focus)"
  }, [A("state-border", {
    border: "var(--n-border-focus)"
  })]), E("&:hover", {
    backgroundColor: "var(--n-color-hover)",
    color: "var(--n-text-color-hover)"
  }, [A("state-border", {
    border: "var(--n-border-hover)"
  })]), E("&:active", {
    backgroundColor: "var(--n-color-pressed)",
    color: "var(--n-text-color-pressed)"
  }, [A("state-border", {
    border: "var(--n-border-pressed)"
  })]), V("pressed", {
    backgroundColor: "var(--n-color-pressed)",
    color: "var(--n-text-color-pressed)"
  }, [A("state-border", {
    border: "var(--n-border-pressed)"
  })])]), V("loading", "cursor: wait;"), R("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [V("active", {
    zIndex: 1,
    animationName: "button-wave-spread, button-wave-opacity"
  })]), ho && "MozBoxSizing" in document.createElement("div").style ? E("&::moz-focus-inner", {
    border: 0
  }) : null, A("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), A("border", {
    border: "var(--n-border)"
  }), A("state-border", {
    border: "var(--n-border)",
    borderColor: "#0000",
    zIndex: 1
  }), A("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [R("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [zr({
    top: "50%",
    originalTransform: "translateY(-50%)"
  })]), zx()]), A("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [E("~", [A("icon", {
    margin: "var(--n-icon-margin)",
    marginRight: 0
  })])]), V("block", `
 display: flex;
 width: 100%;
 `), V("dashed", [A("border, state-border", {
    borderStyle: "dashed !important"
  })]), V("disabled", {
    cursor: "not-allowed",
    opacity: "var(--n-opacity-disabled)"
  })]), E("@keyframes button-wave-spread", {
    from: {
      boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
    },
    to: {
      // don't use exact 5px since chrome will display the animation with glitches
      boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
    }
  }), E("@keyframes button-wave-opacity", {
    from: {
      opacity: "var(--n-wave-opacity)"
    },
    to: {
      opacity: 0
    }
  })]), vC = Object.assign(Object.assign({}, De.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: {
    type: Boolean,
    default: !0
  }, keyboard: {
    type: Boolean,
    default: !0
  }, tag: {
    type: String,
    default: "button"
  }, type: {
    type: String,
    default: "default"
  }, dashed: Boolean, renderIcon: Function, iconPlacement: {
    type: String,
    default: "left"
  }, attrType: {
    type: String,
    default: "button"
  }, bordered: {
    type: Boolean,
    default: !0
  }, onClick: [Function, Array], nativeFocusBehavior: {
    type: Boolean,
    default: !vc
  } }), mC = ie({
    name: "Button",
    props: vC,
    setup(e) {
      process.env.NODE_ENV !== "production" && Ge(() => {
        const { dashed: I, ghost: z, text: $, secondary: h, tertiary: P, quaternary: y } = e;
        (I || z || $) && (h || P || y) && bt("button", "`dashed`, `ghost` and `text` props can't be used along with `secondary`, `tertiary` and `quaterary` props.");
      });
      const t = H(null), o = H(null), r = H(!1), n = Ze(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = ve(fC, {}), { mergedSizeRef: a } = Pi({}, {
        defaultSize: "medium",
        mergedSize: (I) => {
          const { size: z } = e;
          if (z)
            return z;
          const { size: $ } = i;
          if ($)
            return $;
          const { mergedSize: h } = I || {};
          return h ? h.value : "medium";
        }
      }), l = k(() => e.focusable && !e.disabled), s = (I) => {
        var z;
        l.value || I.preventDefault(), !e.nativeFocusBehavior && (I.preventDefault(), !e.disabled && l.value && ((z = t.value) === null || z === void 0 || z.focus({ preventScroll: !0 })));
      }, c = (I) => {
        var z;
        if (!e.disabled && !e.loading) {
          const { onClick: $ } = e;
          $ && xe($, I), e.text || (z = o.value) === null || z === void 0 || z.play();
        }
      }, d = (I) => {
        switch (I.key) {
          case "Enter":
            if (!e.keyboard)
              return;
            r.value = !1;
        }
      }, f = (I) => {
        switch (I.key) {
          case "Enter":
            if (!e.keyboard || e.loading) {
              I.preventDefault();
              return;
            }
            r.value = !0;
        }
      }, g = () => {
        r.value = !1;
      }, { inlineThemeDisabled: v, mergedClsPrefixRef: p, mergedRtlRef: b } = gt(e), x = De("Button", "-button", gC, yc, e, p), m = Hi("Button", b, p), C = k(() => {
        const I = x.value, { common: { cubicBezierEaseInOut: z, cubicBezierEaseOut: $ }, self: h } = I, { rippleDuration: P, opacityDisabled: y, fontWeight: S, fontWeightStrong: T } = h, M = a.value, { dashed: L, type: O, ghost: N, text: q, color: Y, round: Q, circle: fe, textColor: be, secondary: Ie, tertiary: Fe, quaternary: ct, strong: Te } = e, Me = {
          "font-weight": Te ? T : S
        };
        let ge = {
          "--n-color": "initial",
          "--n-color-hover": "initial",
          "--n-color-pressed": "initial",
          "--n-color-focus": "initial",
          "--n-color-disabled": "initial",
          "--n-ripple-color": "initial",
          "--n-text-color": "initial",
          "--n-text-color-hover": "initial",
          "--n-text-color-pressed": "initial",
          "--n-text-color-focus": "initial",
          "--n-text-color-disabled": "initial"
        };
        const rt = O === "tertiary", $t = O === "default", de = rt ? "default" : O;
        if (q) {
          const ce = be || Y;
          ge = {
            "--n-color": "#0000",
            "--n-color-hover": "#0000",
            "--n-color-pressed": "#0000",
            "--n-color-focus": "#0000",
            "--n-color-disabled": "#0000",
            "--n-ripple-color": "#0000",
            "--n-text-color": ce || h[ee("textColorText", de)],
            "--n-text-color-hover": ce ? Qt(ce) : h[ee("textColorTextHover", de)],
            "--n-text-color-pressed": ce ? Nr(ce) : h[ee("textColorTextPressed", de)],
            "--n-text-color-focus": ce ? Qt(ce) : h[ee("textColorTextHover", de)],
            "--n-text-color-disabled": ce || h[ee("textColorTextDisabled", de)]
          };
        } else if (N || L) {
          const ce = be || Y;
          ge = {
            "--n-color": "#0000",
            "--n-color-hover": "#0000",
            "--n-color-pressed": "#0000",
            "--n-color-focus": "#0000",
            "--n-color-disabled": "#0000",
            "--n-ripple-color": Y || h[ee("rippleColor", de)],
            "--n-text-color": ce || h[ee("textColorGhost", de)],
            "--n-text-color-hover": ce ? Qt(ce) : h[ee("textColorGhostHover", de)],
            "--n-text-color-pressed": ce ? Nr(ce) : h[ee("textColorGhostPressed", de)],
            "--n-text-color-focus": ce ? Qt(ce) : h[ee("textColorGhostHover", de)],
            "--n-text-color-disabled": ce || h[ee("textColorGhostDisabled", de)]
          };
        } else if (Ie) {
          const ce = $t ? h.textColor : rt ? h.textColorTertiary : h[ee("color", de)], pe = Y || ce, qe = O !== "default" && O !== "tertiary";
          ge = {
            "--n-color": qe ? X(pe, {
              alpha: Number(h.colorOpacitySecondary)
            }) : h.colorSecondary,
            "--n-color-hover": qe ? X(pe, {
              alpha: Number(h.colorOpacitySecondaryHover)
            }) : h.colorSecondaryHover,
            "--n-color-pressed": qe ? X(pe, {
              alpha: Number(h.colorOpacitySecondaryPressed)
            }) : h.colorSecondaryPressed,
            "--n-color-focus": qe ? X(pe, {
              alpha: Number(h.colorOpacitySecondaryHover)
            }) : h.colorSecondaryHover,
            "--n-color-disabled": h.colorSecondary,
            "--n-ripple-color": "#0000",
            "--n-text-color": pe,
            "--n-text-color-hover": pe,
            "--n-text-color-pressed": pe,
            "--n-text-color-focus": pe,
            "--n-text-color-disabled": pe
          };
        } else if (Fe || ct) {
          const ce = $t ? h.textColor : rt ? h.textColorTertiary : h[ee("color", de)], pe = Y || ce;
          Fe ? (ge["--n-color"] = h.colorTertiary, ge["--n-color-hover"] = h.colorTertiaryHover, ge["--n-color-pressed"] = h.colorTertiaryPressed, ge["--n-color-focus"] = h.colorSecondaryHover, ge["--n-color-disabled"] = h.colorTertiary) : (ge["--n-color"] = h.colorQuaternary, ge["--n-color-hover"] = h.colorQuaternaryHover, ge["--n-color-pressed"] = h.colorQuaternaryPressed, ge["--n-color-focus"] = h.colorQuaternaryHover, ge["--n-color-disabled"] = h.colorQuaternary), ge["--n-ripple-color"] = "#0000", ge["--n-text-color"] = pe, ge["--n-text-color-hover"] = pe, ge["--n-text-color-pressed"] = pe, ge["--n-text-color-focus"] = pe, ge["--n-text-color-disabled"] = pe;
        } else
          ge = {
            "--n-color": Y || h[ee("color", de)],
            "--n-color-hover": Y ? Qt(Y) : h[ee("colorHover", de)],
            "--n-color-pressed": Y ? Nr(Y) : h[ee("colorPressed", de)],
            "--n-color-focus": Y ? Qt(Y) : h[ee("colorFocus", de)],
            "--n-color-disabled": Y || h[ee("colorDisabled", de)],
            "--n-ripple-color": Y || h[ee("rippleColor", de)],
            "--n-text-color": be || (Y ? h.textColorPrimary : rt ? h.textColorTertiary : h[ee("textColor", de)]),
            "--n-text-color-hover": be || (Y ? h.textColorHoverPrimary : h[ee("textColorHover", de)]),
            "--n-text-color-pressed": be || (Y ? h.textColorPressedPrimary : h[ee("textColorPressed", de)]),
            "--n-text-color-focus": be || (Y ? h.textColorFocusPrimary : h[ee("textColorFocus", de)]),
            "--n-text-color-disabled": be || (Y ? h.textColorDisabledPrimary : h[ee("textColorDisabled", de)])
          };
        let Xe = {
          "--n-border": "initial",
          "--n-border-hover": "initial",
          "--n-border-pressed": "initial",
          "--n-border-focus": "initial",
          "--n-border-disabled": "initial"
        };
        q ? Xe = {
          "--n-border": "none",
          "--n-border-hover": "none",
          "--n-border-pressed": "none",
          "--n-border-focus": "none",
          "--n-border-disabled": "none"
        } : Xe = {
          "--n-border": h[ee("border", de)],
          "--n-border-hover": h[ee("borderHover", de)],
          "--n-border-pressed": h[ee("borderPressed", de)],
          "--n-border-focus": h[ee("borderFocus", de)],
          "--n-border-disabled": h[ee("borderDisabled", de)]
        };
        const { [ee("height", M)]: We, [ee("fontSize", M)]: U, [ee("padding", M)]: ne, [ee("paddingRound", M)]: Z, [ee("iconSize", M)]: ue, [ee("borderRadius", M)]: _, [ee("iconMargin", M)]: W, waveOpacity: J } = h, oe = {
          "--n-width": fe && !q ? We : "initial",
          "--n-height": q ? "initial" : We,
          "--n-font-size": U,
          "--n-padding": fe || q ? "initial" : Q ? Z : ne,
          "--n-icon-size": ue,
          "--n-icon-margin": W,
          "--n-border-radius": q ? "initial" : fe || Q ? We : _
        };
        return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": z, "--n-bezier-ease-out": $, "--n-ripple-duration": P, "--n-opacity-disabled": y, "--n-wave-opacity": J }, Me), ge), Xe), oe);
      }), D = v ? Ft("button", k(() => {
        let I = "";
        const { dashed: z, type: $, ghost: h, text: P, color: y, round: S, circle: T, textColor: M, secondary: L, tertiary: O, quaternary: N, strong: q } = e;
        z && (I += "a"), h && (I += "b"), P && (I += "c"), S && (I += "d"), T && (I += "e"), L && (I += "f"), O && (I += "g"), N && (I += "h"), q && (I += "i"), y && (I += "j" + ta(y)), M && (I += "k" + ta(M));
        const { value: Y } = a;
        return I += "l" + Y[0], I += "m" + $[0], I;
      }), C, e) : void 0;
      return {
        selfElRef: t,
        waveElRef: o,
        mergedClsPrefix: p,
        mergedFocusable: l,
        mergedSize: a,
        showBorder: n,
        enterPressed: r,
        rtlEnabled: m,
        handleMousedown: s,
        handleKeydown: f,
        handleBlur: g,
        handleKeyup: d,
        handleClick: c,
        customColorCssVars: k(() => {
          const { color: I } = e;
          if (!I)
            return null;
          const z = Qt(I);
          return {
            "--n-border-color": I,
            "--n-border-color-hover": z,
            "--n-border-color-pressed": Nr(I),
            "--n-border-color-focus": z,
            "--n-border-color-disabled": I
          };
        }),
        cssVars: v ? void 0 : C,
        themeClass: D == null ? void 0 : D.themeClass,
        onRender: D == null ? void 0 : D.onRender
      };
    },
    render() {
      const { mergedClsPrefix: e, tag: t, onRender: o } = this;
      o == null || o();
      const r = Ct(this.$slots.default, (n) => n && u("span", { class: `${e}-button__content` }, n));
      return u(
        t,
        { ref: "selfElRef", class: [
          this.themeClass,
          `${e}-button`,
          `${e}-button--${this.type}-type`,
          `${e}-button--${this.mergedSize}-type`,
          this.rtlEnabled && `${e}-button--rtl`,
          this.disabled && `${e}-button--disabled`,
          this.block && `${e}-button--block`,
          this.enterPressed && `${e}-button--pressed`,
          !this.text && this.dashed && `${e}-button--dashed`,
          this.color && `${e}-button--color`,
          this.secondary && `${e}-button--secondary`,
          this.loading && `${e}-button--loading`,
          this.ghost && `${e}-button--ghost`
          // required for button group border collapse
        ], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMousedown, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown },
        this.iconPlacement === "right" && r,
        u(Ai, { width: !0 }, {
          default: () => Ct(this.$slots.icon, (n) => (this.loading || this.renderIcon || n) && u(
            "span",
            { class: `${e}-button__icon`, style: {
              margin: ei(this.$slots.default) ? "0" : ""
            } },
            u(yn, null, {
              default: () => this.loading ? u(ic, { clsPrefix: e, key: "loading", class: `${e}-icon-slot`, strokeWidth: 20 }) : u("div", { key: "icon", class: `${e}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : n)
            })
          ))
        }),
        this.iconPlacement === "left" && r,
        this.text ? null : u(sx, { ref: "waveElRef", clsPrefix: e }),
        this.showBorder ? u("div", { "aria-hidden": !0, class: `${e}-button__border`, style: this.customColorCssVars }) : null,
        this.showBorder ? u("div", { "aria-hidden": !0, class: `${e}-button__state-border`, style: this.customColorCssVars }) : null
      );
    }
  }), Vr = mC, bC = {
    titleFontSize: "22px"
  }, xC = (e) => {
    const { borderRadius: t, fontSize: o, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: a, dividerColor: l, fontWeightStrong: s, primaryColor: c, baseColor: d, hoverColor: f, cardColor: g, modalColor: v, popoverColor: p } = e;
    return Object.assign(Object.assign({}, bC), {
      borderRadius: t,
      borderColor: te(g, l),
      borderColorModal: te(v, l),
      borderColorPopover: te(p, l),
      textColor: n,
      titleFontWeight: s,
      titleTextColor: i,
      dayTextColor: a,
      fontSize: o,
      lineHeight: r,
      dateColorCurrent: c,
      dateTextColorCurrent: d,
      cellColorHover: te(g, f),
      cellColorHoverModal: te(v, f),
      cellColorHoverPopover: te(p, f),
      cellColor: g,
      cellColorModal: v,
      cellColorPopover: p,
      barColor: c
    });
  }, CC = {
    name: "Calendar",
    common: j,
    peers: {
      Button: ot
    },
    self: xC
  }, yC = CC, wC = (e) => {
    const { fontSize: t, boxShadow2: o, popoverColor: r, textColor2: n, borderRadius: i, borderColor: a, heightSmall: l, heightMedium: s, heightLarge: c, fontSizeSmall: d, fontSizeMedium: f, fontSizeLarge: g, dividerColor: v } = e;
    return {
      panelFontSize: t,
      boxShadow: o,
      color: r,
      textColor: n,
      borderRadius: i,
      border: `1px solid ${a}`,
      heightSmall: l,
      heightMedium: s,
      heightLarge: c,
      fontSizeSmall: d,
      fontSizeMedium: f,
      fontSizeLarge: g,
      dividerColor: v
    };
  }, SC = {
    name: "ColorPicker",
    common: j,
    peers: {
      Input: vt,
      Button: ot
    },
    self: wC
  }, $C = SC, PC = {
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
  }, TC = (e) => {
    const { primaryColor: t, borderRadius: o, lineHeight: r, fontSize: n, cardColor: i, textColor2: a, textColor1: l, dividerColor: s, fontWeightStrong: c, closeIconColor: d, closeIconColorHover: f, closeIconColorPressed: g, closeColorHover: v, closeColorPressed: p, modalColor: b, boxShadow1: x, popoverColor: m, actionColor: C } = e;
    return Object.assign(Object.assign({}, PC), {
      lineHeight: r,
      color: i,
      colorModal: b,
      colorPopover: m,
      colorTarget: t,
      colorEmbedded: C,
      colorEmbeddedModal: C,
      colorEmbeddedPopover: C,
      textColor: a,
      titleTextColor: l,
      borderColor: s,
      actionColor: C,
      titleFontWeight: c,
      closeColorHover: v,
      closeColorPressed: p,
      closeBorderRadius: o,
      closeIconColor: d,
      closeIconColorHover: f,
      closeIconColorPressed: g,
      fontSizeSmall: n,
      fontSizeMedium: n,
      fontSizeLarge: n,
      fontSizeHuge: n,
      boxShadow: x,
      borderRadius: o
    });
  }, zC = {
    name: "Card",
    common: j,
    self(e) {
      const t = TC(e), { cardColor: o, modalColor: r, popoverColor: n } = e;
      return t.colorEmbedded = o, t.colorEmbeddedModal = r, t.colorEmbeddedPopover = n, t;
    }
  }, wc = zC, RC = (e) => ({
    dotSize: "8px",
    dotColor: "rgba(255, 255, 255, .3)",
    dotColorActive: "rgba(255, 255, 255, 1)",
    dotColorFocus: "rgba(255, 255, 255, .5)",
    dotLineWidth: "16px",
    dotLineWidthActive: "24px",
    arrowColor: "#eee"
  }), IC = {
    name: "Carousel",
    common: j,
    self: RC
  }, DC = IC, EC = {
    sizeSmall: "14px",
    sizeMedium: "16px",
    sizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, _C = (e) => {
    const { baseColor: t, inputColorDisabled: o, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: a, borderColor: l, primaryColor: s, textColor2: c, fontSizeSmall: d, fontSizeMedium: f, fontSizeLarge: g, borderRadiusSmall: v, lineHeight: p } = e;
    return Object.assign(Object.assign({}, EC), {
      labelLineHeight: p,
      fontSizeSmall: d,
      fontSizeMedium: f,
      fontSizeLarge: g,
      borderRadius: v,
      color: t,
      colorChecked: s,
      colorDisabled: o,
      colorDisabledChecked: o,
      colorTableHeader: r,
      colorTableHeaderModal: n,
      colorTableHeaderPopover: i,
      checkMarkColor: t,
      checkMarkColorDisabled: a,
      checkMarkColorDisabledChecked: a,
      border: `1px solid ${l}`,
      borderDisabled: `1px solid ${l}`,
      borderDisabledChecked: `1px solid ${l}`,
      borderChecked: `1px solid ${s}`,
      borderFocus: `1px solid ${s}`,
      boxShadowFocus: `0 0 0 2px ${X(s, { alpha: 0.3 })}`,
      textColor: c,
      textColorDisabled: a
    });
  }, BC = {
    name: "Checkbox",
    common: j,
    self(e) {
      const { cardColor: t } = e, o = _C(e);
      return o.color = "#0000", o.checkMarkColor = t, o;
    }
  }, Yo = BC, kC = (e) => {
    const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n, textColor3: i, primaryColor: a, textColorDisabled: l, dividerColor: s, hoverColor: c, fontSizeMedium: d, heightMedium: f } = e;
    return {
      menuBorderRadius: t,
      menuColor: r,
      menuBoxShadow: o,
      menuDividerColor: s,
      menuHeight: "calc(var(--n-option-height) * 6.6)",
      optionArrowColor: i,
      optionHeight: f,
      optionFontSize: d,
      optionColorHover: c,
      optionTextColor: n,
      optionTextColorActive: a,
      optionTextColorDisabled: l,
      optionCheckMarkColor: a,
      loadingColor: a,
      columnWidth: "180px"
    };
  }, OC = {
    name: "Cascader",
    common: j,
    peers: {
      InternalSelectMenu: Br,
      InternalSelection: Li,
      Scrollbar: tt,
      Checkbox: Yo,
      Empty: q1
    },
    self: kC
  }, MC = OC, HC = {
    name: "Code",
    common: j,
    self(e) {
      const { textColor2: t, fontSize: o, fontWeightStrong: r, textColor3: n } = e;
      return {
        textColor: t,
        fontSize: o,
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
  }, Sc = HC, AC = (e) => {
    const { fontWeight: t, textColor1: o, textColor2: r, textColorDisabled: n, dividerColor: i, fontSize: a } = e;
    return {
      titleFontSize: a,
      titleFontWeight: t,
      dividerColor: i,
      titleTextColor: o,
      titleTextColorDisabled: n,
      fontSize: a,
      textColor: r,
      arrowColor: r,
      arrowColorDisabled: n,
      itemMargin: "16px 0 0 0"
    };
  }, LC = {
    name: "Collapse",
    common: j,
    self: AC
  }, FC = LC, WC = (e) => {
    const { cubicBezierEaseInOut: t } = e;
    return {
      bezier: t
    };
  }, jC = {
    name: "CollapseTransition",
    common: j,
    self: WC
  }, NC = jC, VC = {
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
      validator: () => (yr("config-provider", "`as` is deprecated, please use `tag` instead."), !0),
      default: void 0
    }
  }, UC = ie({
    name: "ConfigProvider",
    alias: ["App"],
    props: VC,
    setup(e) {
      const t = ve(Gt, null), o = k(() => {
        const { theme: p } = e;
        if (p === null)
          return;
        const b = t == null ? void 0 : t.mergedThemeRef.value;
        return p === void 0 ? b : b === void 0 ? p : Object.assign({}, b, p);
      }), r = k(() => {
        const { themeOverrides: p } = e;
        if (p !== null) {
          if (p === void 0)
            return t == null ? void 0 : t.mergedThemeOverridesRef.value;
          {
            const b = t == null ? void 0 : t.mergedThemeOverridesRef.value;
            return b === void 0 ? p : fr({}, b, p);
          }
        }
      }), n = Ze(() => {
        const { namespace: p } = e;
        return p === void 0 ? t == null ? void 0 : t.mergedNamespaceRef.value : p;
      }), i = Ze(() => {
        const { bordered: p } = e;
        return p === void 0 ? t == null ? void 0 : t.mergedBorderedRef.value : p;
      }), a = k(() => {
        const { icons: p } = e;
        return p === void 0 ? t == null ? void 0 : t.mergedIconsRef.value : p;
      }), l = k(() => {
        const { componentOptions: p } = e;
        return p !== void 0 ? p : t == null ? void 0 : t.mergedComponentPropsRef.value;
      }), s = k(() => {
        const { clsPrefix: p } = e;
        return p !== void 0 ? p : t == null ? void 0 : t.mergedClsPrefixRef.value;
      }), c = k(() => {
        var p;
        const { rtl: b } = e;
        if (b === void 0)
          return t == null ? void 0 : t.mergedRtlRef.value;
        const x = {};
        for (const m of b)
          x[m.name] = Mt(m), (p = m.peers) === null || p === void 0 || p.forEach((C) => {
            C.name in x || (x[C.name] = Mt(C));
          });
        return x;
      }), d = k(() => e.breakpoints || (t == null ? void 0 : t.mergedBreakpointsRef.value)), f = e.inlineThemeDisabled || (t == null ? void 0 : t.inlineThemeDisabled), g = e.preflightStyleDisabled || (t == null ? void 0 : t.preflightStyleDisabled), v = k(() => {
        const { value: p } = o, { value: b } = r, x = b && Object.keys(b).length !== 0, m = p == null ? void 0 : p.name;
        return m ? x ? `${m}-${wr(JSON.stringify(r.value))}` : m : x ? wr(JSON.stringify(r.value)) : "";
      });
      return lt(Gt, {
        mergedThemeHashRef: v,
        mergedBreakpointsRef: d,
        mergedRtlRef: c,
        mergedIconsRef: a,
        mergedComponentPropsRef: l,
        mergedBorderedRef: i,
        mergedNamespaceRef: n,
        mergedClsPrefixRef: s,
        mergedLocaleRef: k(() => {
          const { locale: p } = e;
          if (p !== null)
            return p === void 0 ? t == null ? void 0 : t.mergedLocaleRef.value : p;
        }),
        mergedDateLocaleRef: k(() => {
          const { dateLocale: p } = e;
          if (p !== null)
            return p === void 0 ? t == null ? void 0 : t.mergedDateLocaleRef.value : p;
        }),
        mergedHljsRef: k(() => {
          const { hljs: p } = e;
          return p === void 0 ? t == null ? void 0 : t.mergedHljsRef.value : p;
        }),
        mergedKatexRef: k(() => {
          const { katex: p } = e;
          return p === void 0 ? t == null ? void 0 : t.mergedKatexRef.value : p;
        }),
        mergedThemeRef: o,
        mergedThemeOverridesRef: r,
        inlineThemeDisabled: f || !1,
        preflightStyleDisabled: g || !1
      }), {
        mergedClsPrefix: s,
        mergedBordered: i,
        mergedNamespace: n,
        mergedTheme: o,
        mergedThemeOverrides: r
      };
    },
    render() {
      var e, t, o, r;
      return this.abstract ? (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o) : u(this.as || this.tag, {
        class: `${this.mergedClsPrefix || Ks}-config-provider`
      }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
    }
  }), GC = {
    name: "Popselect",
    common: j,
    peers: {
      Popover: xo,
      InternalSelectMenu: Br
    }
  }, $c = GC;
  function XC(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
  const qC = {
    name: "Select",
    common: j,
    peers: {
      InternalSelection: Li,
      InternalSelectMenu: Br
    },
    self: XC
  }, Pc = qC, YC = {
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
  }, ZC = (e) => {
    const {
      textColor2: t,
      primaryColor: o,
      primaryColorHover: r,
      primaryColorPressed: n,
      inputColorDisabled: i,
      textColorDisabled: a,
      borderColor: l,
      borderRadius: s,
      // item font size
      fontSizeTiny: c,
      fontSizeSmall: d,
      fontSizeMedium: f,
      // item size
      heightTiny: g,
      heightSmall: v,
      heightMedium: p
    } = e;
    return Object.assign(Object.assign({}, YC), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${l}`, buttonBorderHover: `1px solid ${l}`, buttonBorderPressed: `1px solid ${l}`, buttonIconColor: t, buttonIconColorHover: t, buttonIconColorPressed: t, itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: o, itemTextColorDisabled: a, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${o}`, itemBorderDisabled: `1px solid ${l}`, itemBorderRadius: s, itemSizeSmall: g, itemSizeMedium: v, itemSizeLarge: p, itemFontSizeSmall: c, itemFontSizeMedium: d, itemFontSizeLarge: f, jumperFontSizeSmall: c, jumperFontSizeMedium: d, jumperFontSizeLarge: f, jumperTextColor: t, jumperTextColorDisabled: a });
  }, KC = {
    name: "Pagination",
    common: j,
    peers: {
      Select: Pc,
      Input: vt,
      Popselect: $c
    },
    self(e) {
      const { primaryColor: t, opacity3: o } = e, r = X(t, {
        alpha: Number(o)
      }), n = ZC(e);
      return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
    }
  }, Tc = KC, zc = {
    padding: "8px 14px"
  }, JC = {
    name: "Tooltip",
    common: j,
    peers: {
      Popover: xo
    },
    self(e) {
      const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n } = e;
      return Object.assign(Object.assign({}, zc), { borderRadius: t, boxShadow: o, color: r, textColor: n });
    }
  }, wn = JC, QC = (e) => {
    const { borderRadius: t, boxShadow2: o, baseColor: r } = e;
    return Object.assign(Object.assign({}, zc), { borderRadius: t, boxShadow: o, color: te(r, "rgba(0, 0, 0, .85)"), textColor: r });
  }, ey = {
    name: "Tooltip",
    common: St,
    peers: {
      Popover: fc
    },
    self: QC
  }, Rc = ey, ty = {
    name: "Ellipsis",
    common: j,
    peers: {
      Tooltip: wn
    }
  }, Ic = ty, oy = {
    radioSizeSmall: "14px",
    radioSizeMedium: "16px",
    radioSizeLarge: "18px",
    labelPadding: "0 8px",
    labelFontWeight: "400"
  }, ry = {
    name: "Radio",
    common: j,
    self(e) {
      const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: a, opacityDisabled: l, borderRadius: s, fontSizeSmall: c, fontSizeMedium: d, fontSizeLarge: f, heightSmall: g, heightMedium: v, heightLarge: p, lineHeight: b } = e;
      return Object.assign(Object.assign({}, oy), {
        labelLineHeight: b,
        buttonHeightSmall: g,
        buttonHeightMedium: v,
        buttonHeightLarge: p,
        fontSizeSmall: c,
        fontSizeMedium: d,
        fontSizeLarge: f,
        boxShadow: `inset 0 0 0 1px ${t}`,
        boxShadowActive: `inset 0 0 0 1px ${o}`,
        boxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${X(o, { alpha: 0.3 })}`,
        boxShadowHover: `inset 0 0 0 1px ${o}`,
        boxShadowDisabled: `inset 0 0 0 1px ${t}`,
        color: "#0000",
        colorDisabled: i,
        colorActive: "#0000",
        textColor: a,
        textColorDisabled: n,
        dotColorActive: o,
        dotColorDisabled: t,
        buttonBorderColor: t,
        buttonBorderColorActive: o,
        buttonBorderColorHover: o,
        buttonColor: "#0000",
        buttonColorActive: o,
        buttonTextColor: a,
        buttonTextColorActive: r,
        buttonTextColorHover: o,
        opacityDisabled: l,
        buttonBoxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${X(o, { alpha: 0.3 })}`,
        buttonBoxShadowHover: `inset 0 0 0 1px ${o}`,
        buttonBoxShadow: "inset 0 0 0 1px #0000",
        buttonBorderRadius: s
      });
    }
  }, Dc = ry, ny = {
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
  }, iy = (e) => {
    const { primaryColor: t, textColor2: o, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: a, borderRadius: l, fontSizeSmall: s, fontSizeMedium: c, fontSizeLarge: d, fontSizeHuge: f, heightSmall: g, heightMedium: v, heightLarge: p, heightHuge: b, textColor3: x, opacityDisabled: m } = e;
    return Object.assign(Object.assign({}, ny), {
      optionHeightSmall: g,
      optionHeightMedium: v,
      optionHeightLarge: p,
      optionHeightHuge: b,
      borderRadius: l,
      fontSizeSmall: s,
      fontSizeMedium: c,
      fontSizeLarge: d,
      fontSizeHuge: f,
      // non-inverted
      optionTextColor: o,
      optionTextColorHover: o,
      optionTextColorActive: t,
      optionTextColorChildActive: t,
      color: i,
      dividerColor: r,
      suffixColor: o,
      prefixColor: o,
      optionColorHover: n,
      optionColorActive: X(t, { alpha: 0.1 }),
      groupHeaderTextColor: x,
      // inverted
      optionTextColorInverted: "#BBB",
      optionTextColorHoverInverted: "#FFF",
      optionTextColorActiveInverted: "#FFF",
      optionTextColorChildActiveInverted: "#FFF",
      colorInverted: a,
      dividerColorInverted: "#BBB",
      suffixColorInverted: "#BBB",
      prefixColorInverted: "#BBB",
      optionColorHoverInverted: t,
      optionColorActiveInverted: t,
      groupHeaderTextColorInverted: "#AAA",
      optionOpacityDisabled: m
    });
  }, ay = {
    name: "Dropdown",
    common: j,
    peers: {
      Popover: xo
    },
    self(e) {
      const { primaryColorSuppl: t, primaryColor: o, popoverColor: r } = e, n = iy(e);
      return n.colorInverted = r, n.optionColorActive = X(o, { alpha: 0.15 }), n.optionColorActiveInverted = t, n.optionColorHoverInverted = t, n;
    }
  }, Fi = ay, ly = {
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
  }, sy = (e) => {
    const { cardColor: t, modalColor: o, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: a, tableColorHover: l, iconColor: s, primaryColor: c, fontWeightStrong: d, borderRadius: f, lineHeight: g, fontSizeSmall: v, fontSizeMedium: p, fontSizeLarge: b, dividerColor: x, heightSmall: m, opacityDisabled: C, tableColorStriped: D } = e;
    return Object.assign(Object.assign({}, ly), {
      actionDividerColor: x,
      lineHeight: g,
      borderRadius: f,
      fontSizeSmall: v,
      fontSizeMedium: p,
      fontSizeLarge: b,
      borderColor: te(t, x),
      tdColorHover: te(t, l),
      tdColorStriped: te(t, D),
      thColor: te(t, a),
      thColorHover: te(te(t, a), l),
      tdColor: t,
      tdTextColor: n,
      thTextColor: i,
      thFontWeight: d,
      thButtonColorHover: l,
      thIconColor: s,
      thIconColorActive: c,
      // modal
      borderColorModal: te(o, x),
      tdColorHoverModal: te(o, l),
      tdColorStripedModal: te(o, D),
      thColorModal: te(o, a),
      thColorHoverModal: te(te(o, a), l),
      tdColorModal: o,
      // popover
      borderColorPopover: te(r, x),
      tdColorHoverPopover: te(r, l),
      tdColorStripedPopover: te(r, D),
      thColorPopover: te(r, a),
      thColorHoverPopover: te(te(r, a), l),
      tdColorPopover: r,
      boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
      boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
      // loading
      loadingColor: c,
      loadingSize: m,
      opacityLoading: C
    });
  }, cy = {
    name: "DataTable",
    common: j,
    peers: {
      Button: ot,
      Checkbox: Yo,
      Radio: Dc,
      Pagination: Tc,
      Scrollbar: tt,
      Empty: bo,
      Popover: xo,
      Ellipsis: Ic,
      Dropdown: Fi
    },
    self(e) {
      const t = sy(e);
      return t.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", t.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", t;
    }
  }, dy = cy, uy = Object.assign(Object.assign({}, hc), De.props), fy = ie({
    name: "Tooltip",
    props: uy,
    __popover__: !0,
    setup(e) {
      const t = De("Tooltip", "-tooltip", void 0, Rc, e), o = H(null);
      return Object.assign(Object.assign({}, {
        syncPosition() {
          o.value.syncPosition();
        },
        setShow(n) {
          o.value.setShow(n);
        }
      }), { popoverRef: o, mergedTheme: t, popoverThemeOverrides: k(() => t.value.self) });
    },
    render() {
      const { mergedTheme: e, internalExtraClass: t } = this;
      return u(Cx, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: t.concat("tooltip"), ref: "popoverRef" }), this.$slots);
    }
  }), py = (e) => {
    const { textColorBase: t, opacity1: o, opacity2: r, opacity3: n, opacity4: i, opacity5: a } = e;
    return {
      color: t,
      opacity1Depth: o,
      opacity2Depth: r,
      opacity3Depth: n,
      opacity4Depth: i,
      opacity5Depth: a
    };
  }, hy = {
    name: "Icon",
    common: j,
    self: py
  }, gy = hy, vy = {
    itemFontSize: "12px",
    itemHeight: "36px",
    itemWidth: "52px",
    panelActionPadding: "8px 0"
  }, my = (e) => {
    const { popoverColor: t, textColor2: o, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: a, boxShadow2: l, borderRadius: s, iconColor: c, iconColorDisabled: d } = e;
    return Object.assign(Object.assign({}, vy), {
      panelColor: t,
      panelBoxShadow: l,
      panelDividerColor: i,
      itemTextColor: o,
      itemTextColorActive: r,
      itemColorHover: n,
      itemOpacityDisabled: a,
      itemBorderRadius: s,
      borderRadius: s,
      iconColor: c,
      iconColorDisabled: d
    });
  }, by = {
    name: "TimePicker",
    common: j,
    peers: {
      Scrollbar: tt,
      Button: ot,
      Input: vt
    },
    self: my
  }, Ec = by, xy = {
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
  }, Cy = (e) => {
    const { hoverColor: t, fontSize: o, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: a, borderRadiusSmall: l, iconColor: s, iconColorDisabled: c, textColor1: d, dividerColor: f, boxShadow2: g, borderRadius: v, fontWeightStrong: p } = e;
    return Object.assign(Object.assign({}, xy), {
      itemFontSize: o,
      calendarDaysFontSize: o,
      calendarTitleFontSize: o,
      itemTextColor: r,
      itemTextColorDisabled: n,
      itemTextColorActive: i,
      itemTextColorCurrent: a,
      itemColorIncluded: X(a, { alpha: 0.1 }),
      itemColorHover: t,
      itemColorDisabled: t,
      itemColorActive: a,
      itemBorderRadius: l,
      panelColor: i,
      panelTextColor: r,
      arrowColor: s,
      calendarTitleTextColor: d,
      calendarTitleColorHover: t,
      calendarDaysTextColor: r,
      panelHeaderDividerColor: f,
      calendarDaysDividerColor: f,
      calendarDividerColor: f,
      panelActionDividerColor: f,
      panelBoxShadow: g,
      panelBorderRadius: v,
      calendarTitleFontWeight: p,
      scrollItemBorderRadius: v,
      iconColor: s,
      iconColorDisabled: c
    });
  }, yy = {
    name: "DatePicker",
    common: j,
    peers: {
      Input: vt,
      Button: ot,
      TimePicker: Ec,
      Scrollbar: tt
    },
    self(e) {
      const { popoverColor: t, hoverColor: o, primaryColor: r } = e, n = Cy(e);
      return n.itemColorDisabled = te(t, o), n.itemColorIncluded = X(r, { alpha: 0.15 }), n.itemColorHover = te(t, o), n;
    }
  }, wy = yy, Sy = {
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
  }, $y = (e) => {
    const { tableHeaderColor: t, textColor2: o, textColor1: r, cardColor: n, modalColor: i, popoverColor: a, dividerColor: l, borderRadius: s, fontWeightStrong: c, lineHeight: d, fontSizeSmall: f, fontSizeMedium: g, fontSizeLarge: v } = e;
    return Object.assign(Object.assign({}, Sy), {
      lineHeight: d,
      fontSizeSmall: f,
      fontSizeMedium: g,
      fontSizeLarge: v,
      titleTextColor: r,
      thColor: te(n, t),
      thColorModal: te(i, t),
      thColorPopover: te(a, t),
      thTextColor: r,
      thFontWeight: c,
      tdTextColor: o,
      tdColor: n,
      tdColorModal: i,
      tdColorPopover: a,
      borderColor: te(n, l),
      borderColorModal: te(i, l),
      borderColorPopover: te(a, l),
      borderRadius: s
    });
  }, Py = {
    name: "Descriptions",
    common: j,
    self: $y
  }, Ty = Py, zy = {
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
  }, Ry = (e) => {
    const { textColor1: t, textColor2: o, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, infoColor: c, successColor: d, warningColor: f, errorColor: g, primaryColor: v, dividerColor: p, borderRadius: b, fontWeightStrong: x, lineHeight: m, fontSize: C } = e;
    return Object.assign(Object.assign({}, zy), {
      fontSize: C,
      lineHeight: m,
      border: `1px solid ${p}`,
      titleTextColor: t,
      textColor: o,
      color: r,
      closeColorHover: l,
      closeColorPressed: s,
      closeIconColor: n,
      closeIconColorHover: i,
      closeIconColorPressed: a,
      closeBorderRadius: b,
      iconColor: v,
      iconColorInfo: c,
      iconColorSuccess: d,
      iconColorWarning: f,
      iconColorError: g,
      borderRadius: b,
      titleFontWeight: x
    });
  }, Iy = {
    name: "Dialog",
    common: j,
    peers: {
      Button: ot
    },
    self: Ry
  }, _c = Iy, Dy = (e) => {
    const { modalColor: t, textColor2: o, boxShadow3: r } = e;
    return {
      color: t,
      textColor: o,
      boxShadow: r
    };
  }, Ey = {
    name: "Modal",
    common: j,
    peers: {
      Scrollbar: tt,
      Dialog: _c,
      Card: wc
    },
    self: Dy
  }, _y = Ey, By = (e) => {
    const { textColor1: t, dividerColor: o, fontWeightStrong: r } = e;
    return {
      textColor: t,
      color: o,
      fontWeight: r
    };
  }, ky = {
    name: "Divider",
    common: j,
    self: By
  }, Oy = ky, My = (e) => {
    const { modalColor: t, textColor1: o, textColor2: r, boxShadow3: n, lineHeight: i, fontWeightStrong: a, dividerColor: l, closeColorHover: s, closeColorPressed: c, closeIconColor: d, closeIconColorHover: f, closeIconColorPressed: g, borderRadius: v, primaryColorHover: p } = e;
    return {
      bodyPadding: "16px 24px",
      headerPadding: "16px 24px",
      footerPadding: "16px 24px",
      color: t,
      textColor: r,
      titleTextColor: o,
      titleFontSize: "18px",
      titleFontWeight: a,
      boxShadow: n,
      lineHeight: i,
      headerBorderBottom: `1px solid ${l}`,
      footerBorderTop: `1px solid ${l}`,
      closeIconColor: d,
      closeIconColorHover: f,
      closeIconColorPressed: g,
      closeSize: "22px",
      closeIconSize: "18px",
      closeColorHover: s,
      closeColorPressed: c,
      closeBorderRadius: v,
      resizableTriggerColorHover: p
    };
  }, Hy = {
    name: "Drawer",
    common: j,
    peers: {
      Scrollbar: tt
    },
    self: My
  }, Ay = Hy, Ly = {
    actionMargin: "0 0 0 20px",
    actionMarginRtl: "0 20px 0 0"
  }, Fy = {
    name: "DynamicInput",
    common: j,
    peers: {
      Input: vt,
      Button: ot
    },
    self() {
      return Ly;
    }
  }, Wy = Fy, jy = {
    gapSmall: "4px 8px",
    gapMedium: "8px 12px",
    gapLarge: "12px 16px"
  }, Ny = {
    name: "Space",
    self() {
      return jy;
    }
  }, Bc = Ny, Vy = {
    name: "DynamicTags",
    common: j,
    peers: {
      Input: vt,
      Button: ot,
      Tag: gc,
      Space: Bc
    },
    self() {
      return {
        inputWidth: "64px"
      };
    }
  }, Uy = Vy, Gy = {
    name: "Element",
    common: j
  }, Xy = Gy, qy = {
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
  }, Yy = (e) => {
    const { heightSmall: t, heightMedium: o, heightLarge: r, textColor1: n, errorColor: i, warningColor: a, lineHeight: l, textColor3: s } = e;
    return Object.assign(Object.assign({}, qy), { blankHeightSmall: t, blankHeightMedium: o, blankHeightLarge: r, lineHeight: l, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: a, feedbackTextColor: s });
  }, Zy = {
    name: "Form",
    common: j,
    self: Yy
  }, Ky = Zy, ll = 1, kc = "n-grid", Oc = 1, Jy = {
    span: {
      type: [Number, String],
      default: Oc
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    suffix: Boolean,
    // private props
    privateOffset: Number,
    privateSpan: Number,
    privateColStart: Number,
    privateShow: {
      type: Boolean,
      default: !0
    }
  }, Ur = ie({
    __GRID_ITEM__: !0,
    name: "GridItem",
    alias: ["Gi"],
    props: Jy,
    setup() {
      const {
        isSsrRef: e,
        xGapRef: t,
        itemStyleRef: o,
        overflowRef: r,
        layoutShiftDisabledRef: n
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = ve(kc), i = No();
      return {
        overflow: r,
        itemStyle: o,
        layoutShiftDisabled: n,
        mergedXGap: k(() => Mo(t.value || 0)),
        deriveStyle: () => {
          e.value;
          const {
            privateSpan: a = Oc,
            privateShow: l = !0,
            privateColStart: s = void 0,
            privateOffset: c = 0
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          } = i.vnode.props, { value: d } = t, f = Mo(d || 0);
          return {
            display: l ? "" : "none",
            gridColumn: `${s ?? `span ${a}`} / span ${a}`,
            marginLeft: c ? `calc((100% - (${a} - 1) * ${f}) / ${a} * ${c} + ${f} * ${c})` : ""
          };
        }
      };
    },
    render() {
      var e, t;
      if (this.layoutShiftDisabled) {
        const { span: o, offset: r, mergedXGap: n } = this;
        return u("div", { style: {
          gridColumn: `span ${o} / span ${o}`,
          marginLeft: r ? `calc((100% - (${o} - 1) * ${n}) / ${o} * ${r} + ${n} * ${r})` : ""
        } }, this.$slots);
      }
      return u("div", { style: [this.itemStyle, this.deriveStyle()] }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e, { overflow: this.overflow }));
    }
  }), Qy = {
    name: "GradientText",
    common: j,
    self(e) {
      const { primaryColor: t, successColor: o, warningColor: r, errorColor: n, infoColor: i, primaryColorSuppl: a, successColorSuppl: l, warningColorSuppl: s, errorColorSuppl: c, infoColorSuppl: d, fontWeightStrong: f } = e;
      return {
        fontWeight: f,
        rotate: "252deg",
        colorStartPrimary: t,
        colorEndPrimary: a,
        colorStartInfo: i,
        colorEndInfo: d,
        colorStartWarning: r,
        colorEndWarning: s,
        colorStartError: n,
        colorEndError: c,
        colorStartSuccess: o,
        colorEndSuccess: l
      };
    }
  }, ew = Qy, tw = {
    xs: 0,
    s: 640,
    m: 1024,
    l: 1280,
    xl: 1536,
    xxl: 1920
    // normal desktop display
  }, Mc = 24, Vn = "__ssr__", ow = {
    layoutShiftDisabled: Boolean,
    responsive: {
      type: [String, Boolean],
      default: "self"
    },
    cols: {
      type: [Number, String],
      default: Mc
    },
    itemResponsive: Boolean,
    collapsed: Boolean,
    // may create grid rows < collapsedRows since a item may take all the row
    collapsedRows: {
      type: Number,
      default: 1
    },
    itemStyle: [Object, String],
    xGap: {
      type: [Number, String],
      default: 0
    },
    yGap: {
      type: [Number, String],
      default: 0
    }
  }, rw = ie({
    name: "Grid",
    inheritAttrs: !1,
    props: ow,
    setup(e) {
      const { mergedClsPrefixRef: t, mergedBreakpointsRef: o } = gt(e), r = /^\d+$/, n = H(void 0), i = Rf((o == null ? void 0 : o.value) || tw), a = Ze(() => !!(e.itemResponsive || !r.test(e.cols.toString()) || !r.test(e.xGap.toString()) || !r.test(e.yGap.toString()))), l = k(() => {
        if (a.value)
          return e.responsive === "self" ? n.value : i.value;
      }), s = Ze(() => {
        var m;
        return (m = Number(rr(e.cols.toString(), l.value))) !== null && m !== void 0 ? m : Mc;
      }), c = Ze(() => rr(e.xGap.toString(), l.value)), d = Ze(() => rr(e.yGap.toString(), l.value)), f = (m) => {
        n.value = m.contentRect.width;
      }, g = (m) => {
        wi(f, m);
      }, v = H(!1), p = k(() => {
        if (e.responsive === "self")
          return g;
      }), b = H(!1), x = H();
      return yt(() => {
        const { value: m } = x;
        m && m.hasAttribute(Vn) && (m.removeAttribute(Vn), b.value = !0);
      }), lt(kc, {
        layoutShiftDisabledRef: se(e, "layoutShiftDisabled"),
        isSsrRef: b,
        itemStyleRef: se(e, "itemStyle"),
        xGapRef: c,
        overflowRef: v
      }), {
        isSsr: !ho,
        contentEl: x,
        mergedClsPrefix: t,
        style: k(() => e.layoutShiftDisabled ? {
          width: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${e.cols}, minmax(0, 1fr))`,
          columnGap: Mo(e.xGap),
          rowGap: Mo(e.yGap)
        } : {
          width: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${s.value}, minmax(0, 1fr))`,
          columnGap: Mo(c.value),
          rowGap: Mo(d.value)
        }),
        isResponsive: a,
        responsiveQuery: l,
        responsiveCols: s,
        handleResize: p,
        overflow: v
      };
    },
    render() {
      if (this.layoutShiftDisabled)
        return u("div", xr({
          ref: "contentEl",
          class: `${this.mergedClsPrefix}-grid`,
          style: this.style
        }, this.$attrs), this.$slots);
      const e = () => {
        var t, o, r, n, i, a, l;
        this.overflow = !1;
        const s = ao(Fu(this)), c = [], { collapsed: d, collapsedRows: f, responsiveCols: g, responsiveQuery: v } = this;
        s.forEach((C) => {
          var D, I, z, $;
          if (((D = C == null ? void 0 : C.type) === null || D === void 0 ? void 0 : D.__GRID_ITEM__) !== !0)
            return;
          if (Uu(C)) {
            const y = en(C);
            y.props ? y.props.privateShow = !1 : y.props = { privateShow: !1 }, c.push({
              child: y,
              rawChildSpan: 0
            });
            return;
          }
          C.dirs = ((I = C.dirs) === null || I === void 0 ? void 0 : I.filter(({ dir: y }) => y !== Ir)) || null;
          const h = en(C), P = Number(($ = rr((z = h.props) === null || z === void 0 ? void 0 : z.span, v)) !== null && $ !== void 0 ? $ : ll);
          P !== 0 && c.push({
            child: h,
            rawChildSpan: P
          });
        });
        let p = 0;
        const b = (t = c[c.length - 1]) === null || t === void 0 ? void 0 : t.child;
        if (b != null && b.props) {
          const C = (o = b.props) === null || o === void 0 ? void 0 : o.suffix;
          C !== void 0 && C !== !1 && (p = (n = (r = b.props) === null || r === void 0 ? void 0 : r.span) !== null && n !== void 0 ? n : ll, b.props.privateSpan = p, b.props.privateColStart = g + 1 - p, b.props.privateShow = (i = b.props.privateShow) !== null && i !== void 0 ? i : !0);
        }
        let x = 0, m = !1;
        for (const { child: C, rawChildSpan: D } of c) {
          if (m && (this.overflow = !0), !m) {
            const I = Number((l = rr((a = C.props) === null || a === void 0 ? void 0 : a.offset, v)) !== null && l !== void 0 ? l : 0), z = Math.min(D + I, g);
            if (C.props ? (C.props.privateSpan = z, C.props.privateOffset = I) : C.props = {
              privateSpan: z,
              privateOffset: I
            }, d) {
              const $ = x % g;
              z + $ > g && (x += g - $), z + x + p > f * g ? m = !0 : x += z;
            }
          }
          m && (C.props ? C.props.privateShow !== !0 && (C.props.privateShow = !1) : C.props = {
            privateShow: !1
          });
        }
        return u("div", xr({
          ref: "contentEl",
          class: `${this.mergedClsPrefix}-grid`,
          style: this.style,
          [Vn]: this.isSsr || void 0
        }, this.$attrs), c.map(({ child: C }) => C));
      };
      return this.isResponsive && this.responsive === "self" ? u(jo, { onResize: this.handleResize }, {
        default: e
      }) : e();
    }
  }), nw = (e) => {
    const { primaryColor: t, baseColor: o } = e;
    return {
      color: t,
      iconColor: o
    };
  }, iw = {
    name: "IconWrapper",
    common: j,
    self: nw
  }, aw = iw, Wi = Object.assign(Object.assign({}, De.props), { showToolbar: { type: Boolean, default: !0 }, showToolbarTooltip: Boolean }), Hc = "n-image";
  function lw() {
    return {
      toolbarIconColor: "rgba(255, 255, 255, .9)",
      toolbarColor: "rgba(0, 0, 0, .35)",
      toolbarBoxShadow: "none",
      toolbarBorderRadius: "24px"
    };
  }
  const sw = {
    name: "Image",
    common: St,
    peers: {
      Tooltip: Rc
    },
    self: lw
  }, cw = {
    closeMargin: "16px 12px",
    closeSize: "20px",
    closeIconSize: "16px",
    width: "365px",
    padding: "16px",
    titleFontSize: "16px",
    metaFontSize: "12px",
    descriptionFontSize: "12px"
  }, dw = (e) => {
    const { textColor2: t, successColor: o, infoColor: r, warningColor: n, errorColor: i, popoverColor: a, closeIconColor: l, closeIconColorHover: s, closeIconColorPressed: c, closeColorHover: d, closeColorPressed: f, textColor1: g, textColor3: v, borderRadius: p, fontWeightStrong: b, boxShadow2: x, lineHeight: m, fontSize: C } = e;
    return Object.assign(Object.assign({}, cw), {
      borderRadius: p,
      lineHeight: m,
      fontSize: C,
      headerFontWeight: b,
      iconColor: t,
      iconColorSuccess: o,
      iconColorInfo: r,
      iconColorWarning: n,
      iconColorError: i,
      color: a,
      textColor: t,
      closeIconColor: l,
      closeIconColorHover: s,
      closeIconColorPressed: c,
      closeBorderRadius: p,
      closeColorHover: d,
      closeColorPressed: f,
      headerTextColor: g,
      descriptionTextColor: v,
      actionTextColor: t,
      boxShadow: x
    });
  }, uw = {
    name: "Notification",
    common: j,
    peers: {
      Scrollbar: tt
    },
    self: dw
  }, fw = uw, pw = {
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
  }, hw = (e) => {
    const { textColor2: t, closeIconColor: o, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: a, errorColor: l, warningColor: s, popoverColor: c, boxShadow2: d, primaryColor: f, lineHeight: g, borderRadius: v, closeColorHover: p, closeColorPressed: b } = e;
    return Object.assign(Object.assign({}, pw), {
      closeBorderRadius: v,
      textColor: t,
      textColorInfo: t,
      textColorSuccess: t,
      textColorError: t,
      textColorWarning: t,
      textColorLoading: t,
      color: c,
      colorInfo: c,
      colorSuccess: c,
      colorError: c,
      colorWarning: c,
      colorLoading: c,
      boxShadow: d,
      boxShadowInfo: d,
      boxShadowSuccess: d,
      boxShadowError: d,
      boxShadowWarning: d,
      boxShadowLoading: d,
      iconColor: t,
      iconColorInfo: i,
      iconColorSuccess: a,
      iconColorWarning: s,
      iconColorError: l,
      iconColorLoading: f,
      closeColorHover: p,
      closeColorPressed: b,
      closeIconColor: o,
      closeIconColorHover: r,
      closeIconColorPressed: n,
      closeColorHoverInfo: p,
      closeColorPressedInfo: b,
      closeIconColorInfo: o,
      closeIconColorHoverInfo: r,
      closeIconColorPressedInfo: n,
      closeColorHoverSuccess: p,
      closeColorPressedSuccess: b,
      closeIconColorSuccess: o,
      closeIconColorHoverSuccess: r,
      closeIconColorPressedSuccess: n,
      closeColorHoverError: p,
      closeColorPressedError: b,
      closeIconColorError: o,
      closeIconColorHoverError: r,
      closeIconColorPressedError: n,
      closeColorHoverWarning: p,
      closeColorPressedWarning: b,
      closeIconColorWarning: o,
      closeIconColorHoverWarning: r,
      closeIconColorPressedWarning: n,
      closeColorHoverLoading: p,
      closeColorPressedLoading: b,
      closeIconColorLoading: o,
      closeIconColorHoverLoading: r,
      closeIconColorPressedLoading: n,
      loadingColor: f,
      lineHeight: g,
      borderRadius: v
    });
  }, gw = {
    name: "Message",
    common: j,
    self: hw
  }, vw = gw, mw = {
    name: "ButtonGroup",
    common: j
  }, bw = mw, xw = {
    name: "InputNumber",
    common: j,
    peers: {
      Button: ot,
      Input: vt
    },
    self(e) {
      const { textColorDisabled: t } = e;
      return {
        iconColorDisabled: t
      };
    }
  }, Cw = xw, yw = {
    name: "Layout",
    common: j,
    peers: {
      Scrollbar: tt
    },
    self(e) {
      const { textColor2: t, bodyColor: o, popoverColor: r, cardColor: n, dividerColor: i, scrollbarColor: a, scrollbarColorHover: l } = e;
      return {
        textColor: t,
        textColorInverted: t,
        color: o,
        colorEmbedded: o,
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
        siderToggleButtonIconColor: t,
        siderToggleButtonIconColorInverted: t,
        siderToggleBarColor: te(o, a),
        siderToggleBarColorHover: te(o, l),
        __invertScrollbar: "false"
      };
    }
  }, ww = yw, Sw = (e) => {
    const { textColor2: t, cardColor: o, modalColor: r, popoverColor: n, dividerColor: i, borderRadius: a, fontSize: l, hoverColor: s } = e;
    return {
      textColor: t,
      color: o,
      colorHover: s,
      colorModal: r,
      colorHoverModal: te(r, s),
      colorPopover: n,
      colorHoverPopover: te(n, s),
      borderColor: i,
      borderColorModal: te(r, i),
      borderColorPopover: te(n, i),
      borderRadius: a,
      fontSize: l
    };
  }, $w = {
    name: "List",
    common: j,
    self: Sw
  }, Pw = $w, Tw = {
    name: "LoadingBar",
    common: j,
    self(e) {
      const { primaryColor: t } = e;
      return {
        colorError: "red",
        colorLoading: t,
        height: "2px"
      };
    }
  }, zw = Tw, Rw = {
    name: "Log",
    common: j,
    peers: {
      Scrollbar: tt,
      Code: Sc
    },
    self(e) {
      const { textColor2: t, inputColor: o, fontSize: r, primaryColor: n } = e;
      return {
        loaderFontSize: r,
        loaderTextColor: t,
        loaderColor: o,
        loaderBorder: "1px solid #0000",
        loadingColor: n
      };
    }
  }, Iw = Rw, Dw = {
    name: "Mention",
    common: j,
    peers: {
      InternalSelectMenu: Br,
      Input: vt
    },
    self(e) {
      const { boxShadow2: t } = e;
      return {
        menuBoxShadow: t
      };
    }
  }, Ew = Dw;
  function _w(e, t, o, r) {
    return {
      itemColorHoverInverted: "#0000",
      itemColorActiveInverted: t,
      itemColorActiveHoverInverted: t,
      itemColorActiveCollapsedInverted: t,
      itemTextColorInverted: e,
      itemTextColorHoverInverted: o,
      itemTextColorChildActiveInverted: o,
      itemTextColorChildActiveHoverInverted: o,
      itemTextColorActiveInverted: o,
      itemTextColorActiveHoverInverted: o,
      itemTextColorHorizontalInverted: e,
      itemTextColorHoverHorizontalInverted: o,
      itemTextColorChildActiveHorizontalInverted: o,
      itemTextColorChildActiveHoverHorizontalInverted: o,
      itemTextColorActiveHorizontalInverted: o,
      itemTextColorActiveHoverHorizontalInverted: o,
      itemIconColorInverted: e,
      itemIconColorHoverInverted: o,
      itemIconColorActiveInverted: o,
      itemIconColorActiveHoverInverted: o,
      itemIconColorChildActiveInverted: o,
      itemIconColorChildActiveHoverInverted: o,
      itemIconColorCollapsedInverted: e,
      itemIconColorHorizontalInverted: e,
      itemIconColorHoverHorizontalInverted: o,
      itemIconColorActiveHorizontalInverted: o,
      itemIconColorActiveHoverHorizontalInverted: o,
      itemIconColorChildActiveHorizontalInverted: o,
      itemIconColorChildActiveHoverHorizontalInverted: o,
      arrowColorInverted: e,
      arrowColorHoverInverted: o,
      arrowColorActiveInverted: o,
      arrowColorActiveHoverInverted: o,
      arrowColorChildActiveInverted: o,
      arrowColorChildActiveHoverInverted: o,
      groupTextColorInverted: r
    };
  }
  const Bw = (e) => {
    const { borderRadius: t, textColor3: o, primaryColor: r, textColor2: n, textColor1: i, fontSize: a, dividerColor: l, hoverColor: s, primaryColorHover: c } = e;
    return Object.assign({
      borderRadius: t,
      color: "#0000",
      groupTextColor: o,
      itemColorHover: s,
      itemColorActive: X(r, { alpha: 0.1 }),
      itemColorActiveHover: X(r, { alpha: 0.1 }),
      itemColorActiveCollapsed: X(r, { alpha: 0.1 }),
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
      fontSize: a,
      dividerColor: l
    }, _w("#BBB", r, "#FFF", "#AAA"));
  }, kw = {
    name: "Menu",
    common: j,
    peers: {
      Tooltip: wn,
      Dropdown: Fi
    },
    self(e) {
      const { primaryColor: t, primaryColorSuppl: o } = e, r = Bw(e);
      return r.itemColorActive = X(t, { alpha: 0.15 }), r.itemColorActiveHover = X(t, { alpha: 0.15 }), r.itemColorActiveCollapsed = X(t, {
        alpha: 0.15
      }), r.itemColorActiveInverted = o, r.itemColorActiveHoverInverted = o, r.itemColorActiveCollapsedInverted = o, r;
    }
  }, Ow = kw, Mw = {
    titleFontSize: "18px",
    backSize: "22px"
  };
  function Hw(e) {
    const { textColor1: t, textColor2: o, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: a, primaryColorPressed: l } = e;
    return Object.assign(Object.assign({}, Mw), { titleFontWeight: i, fontSize: n, titleTextColor: t, backColor: o, backColorHover: a, backColorPressed: l, subtitleTextColor: r });
  }
  const Aw = {
    name: "PageHeader",
    common: j,
    self: Hw
  }, Lw = {
    iconSize: "22px"
  }, Fw = (e) => {
    const { fontSize: t, warningColor: o } = e;
    return Object.assign(Object.assign({}, Lw), { fontSize: t, iconColor: o });
  }, Ww = {
    name: "Popconfirm",
    common: j,
    peers: {
      Button: ot,
      Popover: xo
    },
    self: Fw
  }, jw = Ww, Ac = (e) => {
    const { infoColor: t, successColor: o, warningColor: r, errorColor: n, textColor2: i, progressRailColor: a, fontSize: l, fontWeight: s } = e;
    return {
      fontSize: l,
      fontSizeCircle: "28px",
      fontWeightCircle: s,
      railColor: a,
      railHeight: "8px",
      iconSizeCircle: "36px",
      iconSizeLine: "18px",
      iconColor: t,
      iconColorInfo: t,
      iconColorSuccess: o,
      iconColorWarning: r,
      iconColorError: n,
      textColorCircle: i,
      textColorLineInner: "rgb(255, 255, 255)",
      textColorLineOuter: i,
      fillColor: t,
      fillColorInfo: t,
      fillColorSuccess: o,
      fillColorWarning: r,
      fillColorError: n,
      lineBgProcessing: "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"
    };
  }, Nw = {
    name: "Progress",
    common: St,
    self: Ac
  }, Lc = Nw, Vw = {
    name: "Progress",
    common: j,
    self(e) {
      const t = Ac(e);
      return t.textColorLineInner = "rgb(0, 0, 0)", t.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", t;
    }
  }, Fc = Vw, Uw = {
    name: "Rate",
    common: j,
    self(e) {
      const { railColor: t } = e;
      return {
        itemColor: t,
        itemColorActive: "#CCAA33",
        itemSize: "20px",
        sizeSmall: "16px",
        sizeMedium: "20px",
        sizeLarge: "24px"
      };
    }
  }, Gw = Uw, Xw = {
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
  }, qw = (e) => {
    const { textColor2: t, textColor1: o, errorColor: r, successColor: n, infoColor: i, warningColor: a, lineHeight: l, fontWeightStrong: s } = e;
    return Object.assign(Object.assign({}, Xw), { lineHeight: l, titleFontWeight: s, titleTextColor: o, textColor: t, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: a });
  }, Yw = {
    name: "Result",
    common: j,
    self: qw
  }, Zw = Yw, Kw = {
    railHeight: "4px",
    railWidthVertical: "4px",
    handleSize: "18px",
    dotHeight: "8px",
    dotWidth: "8px",
    dotBorderRadius: "4px"
  }, Jw = {
    name: "Slider",
    common: j,
    self(e) {
      const t = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: o, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: a, cardColor: l, borderRadius: s, fontSize: c, opacityDisabled: d } = e;
      return Object.assign(Object.assign({}, Kw), { fontSize: c, markFontSize: c, railColor: o, railColorHover: o, fillColor: n, fillColorHover: n, opacityDisabled: d, handleColor: "#FFF", dotColor: l, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: t, indicatorTextColor: a, indicatorBorderRadius: s, dotBorder: `2px solid ${o}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
    }
  }, Qw = Jw, e2 = (e) => {
    const { opacityDisabled: t, heightTiny: o, heightSmall: r, heightMedium: n, heightLarge: i, heightHuge: a, primaryColor: l, fontSize: s } = e;
    return {
      fontSize: s,
      textColor: l,
      sizeTiny: o,
      sizeSmall: r,
      sizeMedium: n,
      sizeLarge: i,
      sizeHuge: a,
      color: l,
      opacitySpinning: t
    };
  }, t2 = {
    name: "Spin",
    common: j,
    self: e2
  }, o2 = t2, r2 = (e) => {
    const { textColor2: t, textColor3: o, fontSize: r, fontWeight: n } = e;
    return {
      labelFontSize: r,
      labelFontWeight: n,
      valueFontWeight: n,
      valueFontSize: "24px",
      labelTextColor: o,
      valuePrefixTextColor: t,
      valueSuffixTextColor: t,
      valueTextColor: t
    };
  }, n2 = {
    name: "Statistic",
    common: j,
    self: r2
  }, i2 = n2, a2 = {
    stepHeaderFontSizeSmall: "14px",
    stepHeaderFontSizeMedium: "16px",
    indicatorIndexFontSizeSmall: "14px",
    indicatorIndexFontSizeMedium: "16px",
    indicatorSizeSmall: "22px",
    indicatorSizeMedium: "28px",
    indicatorIconSizeSmall: "14px",
    indicatorIconSizeMedium: "18px"
  }, l2 = (e) => {
    const { fontWeightStrong: t, baseColor: o, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: a, textColor2: l } = e;
    return Object.assign(Object.assign({}, a2), { stepHeaderFontWeight: t, indicatorTextColorProcess: o, indicatorTextColorWait: r, indicatorTextColorFinish: n, indicatorTextColorError: i, indicatorBorderColorProcess: n, indicatorBorderColorWait: r, indicatorBorderColorFinish: n, indicatorBorderColorError: i, indicatorColorProcess: n, indicatorColorWait: "#0000", indicatorColorFinish: "#0000", indicatorColorError: "#0000", splitorColorProcess: r, splitorColorWait: r, splitorColorFinish: n, splitorColorError: r, headerTextColorProcess: a, headerTextColorWait: r, headerTextColorFinish: r, headerTextColorError: i, descriptionTextColorProcess: l, descriptionTextColorWait: r, descriptionTextColorFinish: r, descriptionTextColorError: i });
  }, s2 = {
    name: "Steps",
    common: j,
    self: l2
  }, c2 = s2, d2 = {
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
  }, u2 = {
    name: "Switch",
    common: j,
    self(e) {
      const { primaryColorSuppl: t, opacityDisabled: o, borderRadius: r, primaryColor: n, textColor2: i, baseColor: a } = e, l = "rgba(255, 255, 255, .20)";
      return Object.assign(Object.assign({}, d2), { iconColor: a, textColor: i, loadingColor: t, opacityDisabled: o, railColor: l, railColorActive: t, buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", buttonColor: "#FFF", railBorderRadiusSmall: r, railBorderRadiusMedium: r, railBorderRadiusLarge: r, buttonBorderRadiusSmall: r, buttonBorderRadiusMedium: r, buttonBorderRadiusLarge: r, boxShadowFocus: `0 0 8px 0 ${X(n, { alpha: 0.3 })}` });
    }
  }, f2 = u2, p2 = {
    thPaddingSmall: "6px",
    thPaddingMedium: "12px",
    thPaddingLarge: "12px",
    tdPaddingSmall: "6px",
    tdPaddingMedium: "12px",
    tdPaddingLarge: "12px"
  }, h2 = (e) => {
    const { dividerColor: t, cardColor: o, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: a, textColor1: l, textColor2: s, borderRadius: c, fontWeightStrong: d, lineHeight: f, fontSizeSmall: g, fontSizeMedium: v, fontSizeLarge: p } = e;
    return Object.assign(Object.assign({}, p2), {
      fontSizeSmall: g,
      fontSizeMedium: v,
      fontSizeLarge: p,
      lineHeight: f,
      borderRadius: c,
      borderColor: te(o, t),
      borderColorModal: te(r, t),
      borderColorPopover: te(n, t),
      tdColor: o,
      tdColorModal: r,
      tdColorPopover: n,
      tdColorStriped: te(o, a),
      tdColorStripedModal: te(r, a),
      tdColorStripedPopover: te(n, a),
      thColor: te(o, i),
      thColorModal: te(r, i),
      thColorPopover: te(n, i),
      thTextColor: l,
      tdTextColor: s,
      thFontWeight: d
    });
  }, g2 = {
    name: "Table",
    common: j,
    self: h2
  }, v2 = g2, m2 = {
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
  }, Wc = (e) => {
    const { textColor2: t, primaryColor: o, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, tabColor: c, baseColor: d, dividerColor: f, fontWeight: g, textColor1: v, borderRadius: p, fontSize: b, fontWeightStrong: x } = e;
    return Object.assign(Object.assign({}, m2), {
      colorSegment: c,
      tabFontSizeCard: b,
      tabTextColorLine: v,
      tabTextColorActiveLine: o,
      tabTextColorHoverLine: o,
      tabTextColorDisabledLine: r,
      tabTextColorSegment: v,
      tabTextColorActiveSegment: t,
      tabTextColorHoverSegment: t,
      tabTextColorDisabledSegment: r,
      tabTextColorBar: v,
      tabTextColorActiveBar: o,
      tabTextColorHoverBar: o,
      tabTextColorDisabledBar: r,
      tabTextColorCard: v,
      tabTextColorHoverCard: v,
      tabTextColorActiveCard: o,
      tabTextColorDisabledCard: r,
      barColor: o,
      closeIconColor: n,
      closeIconColorHover: i,
      closeIconColorPressed: a,
      closeColorHover: l,
      closeColorPressed: s,
      closeBorderRadius: p,
      tabColor: c,
      tabColorSegment: d,
      tabBorderColor: f,
      tabFontWeightActive: g,
      tabFontWeight: g,
      tabBorderRadius: p,
      paneTextColor: t,
      fontWeightStrong: x
    });
  }, b2 = {
    name: "Tabs",
    common: St,
    self: Wc
  }, x2 = b2, C2 = {
    name: "Tabs",
    common: j,
    self(e) {
      const t = Wc(e), { inputColor: o } = e;
      return t.colorSegment = o, t.tabColorSegment = o, t;
    }
  }, y2 = C2, w2 = (e) => {
    const { textColor1: t, textColor2: o, fontWeightStrong: r, fontSize: n } = e;
    return {
      fontSize: n,
      titleTextColor: t,
      textColor: o,
      titleFontWeight: r
    };
  }, S2 = {
    name: "Thing",
    common: j,
    self: w2
  }, $2 = S2, P2 = {
    titleMarginMedium: "0 0 6px 0",
    titleMarginLarge: "-2px 0 6px 0",
    titleFontSizeMedium: "14px",
    titleFontSizeLarge: "16px",
    iconSizeMedium: "14px",
    iconSizeLarge: "14px"
  }, T2 = {
    name: "Timeline",
    common: j,
    self(e) {
      const { textColor3: t, infoColorSuppl: o, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: a, textColor2: l, railColor: s, fontWeightStrong: c, fontSize: d } = e;
      return Object.assign(Object.assign({}, P2), { contentFontSize: d, titleFontWeight: c, circleBorder: `2px solid ${t}`, circleBorderInfo: `2px solid ${o}`, circleBorderError: `2px solid ${r}`, circleBorderSuccess: `2px solid ${n}`, circleBorderWarning: `2px solid ${i}`, iconColor: t, iconColorInfo: o, iconColorError: r, iconColorSuccess: n, iconColorWarning: i, titleTextColor: a, contentTextColor: l, metaTextColor: t, lineColor: s });
    }
  }, z2 = T2, R2 = {
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
  }, I2 = {
    name: "Transfer",
    common: j,
    peers: {
      Checkbox: Yo,
      Scrollbar: tt,
      Input: vt,
      Empty: bo,
      Button: ot
    },
    self(e) {
      const { fontWeight: t, fontSizeLarge: o, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: a, borderRadius: l, inputColor: s, tableHeaderColor: c, textColor1: d, textColorDisabled: f, textColor2: g, textColor3: v, hoverColor: p, closeColorHover: b, closeColorPressed: x, closeIconColor: m, closeIconColorHover: C, closeIconColorPressed: D, dividerColor: I } = e;
      return Object.assign(Object.assign({}, R2), {
        itemHeightSmall: a,
        itemHeightMedium: a,
        itemHeightLarge: i,
        fontSizeSmall: n,
        fontSizeMedium: r,
        fontSizeLarge: o,
        borderRadius: l,
        dividerColor: I,
        borderColor: "#0000",
        listColor: s,
        headerColor: c,
        titleTextColor: d,
        titleTextColorDisabled: f,
        extraTextColor: v,
        extraTextColorDisabled: f,
        itemTextColor: g,
        itemTextColorDisabled: f,
        itemColorPending: p,
        titleFontWeight: t,
        closeColorHover: b,
        closeColorPressed: x,
        closeIconColor: m,
        closeIconColorHover: C,
        closeIconColorPressed: D
      });
    }
  }, D2 = I2, E2 = (e) => {
    const { borderRadiusSmall: t, hoverColor: o, pressedColor: r, primaryColor: n, textColor3: i, textColor2: a, textColorDisabled: l, fontSize: s } = e;
    return {
      fontSize: s,
      nodeBorderRadius: t,
      nodeColorHover: o,
      nodeColorPressed: r,
      nodeColorActive: X(n, { alpha: 0.1 }),
      arrowColor: i,
      nodeTextColor: a,
      nodeTextColorDisabled: l,
      loadingColor: n,
      dropMarkColor: n
    };
  }, _2 = {
    name: "Tree",
    common: j,
    peers: {
      Checkbox: Yo,
      Scrollbar: tt,
      Empty: bo
    },
    self(e) {
      const { primaryColor: t } = e, o = E2(e);
      return o.nodeColorActive = X(t, { alpha: 0.15 }), o;
    }
  }, jc = _2, B2 = {
    name: "TreeSelect",
    common: j,
    peers: {
      Tree: jc,
      Empty: bo,
      InternalSelection: Li
    }
  }, k2 = B2, O2 = {
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
  }, Nc = (e) => {
    const { primaryColor: t, textColor2: o, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: a, dividerColor: l, fontWeightStrong: s, textColor1: c, textColor3: d, infoColor: f, warningColor: g, errorColor: v, successColor: p, codeColor: b } = e;
    return Object.assign(Object.assign({}, O2), { aTextColor: t, blockquoteTextColor: o, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: a, liTextColor: o, liLineHeight: n, liFontSize: i, hrColor: l, headerFontWeight: s, headerTextColor: c, pTextColor: o, pTextColor1Depth: c, pTextColor2Depth: o, pTextColor3Depth: d, pLineHeight: n, pFontSize: i, headerBarColor: t, headerBarColorPrimary: t, headerBarColorInfo: f, headerBarColorError: v, headerBarColorWarning: g, headerBarColorSuccess: p, textColor: o, textColor1Depth: c, textColor2Depth: o, textColor3Depth: d, textColorPrimary: t, textColorInfo: f, textColorSuccess: p, textColorWarning: g, textColorError: v, codeTextColor: o, codeColor: b, codeBorder: "1px solid #0000" });
  }, M2 = {
    name: "Typography",
    common: St,
    self: Nc
  }, H2 = M2, A2 = {
    name: "Typography",
    common: j,
    self: Nc
  }, L2 = A2, Vc = (e) => {
    const { iconColor: t, primaryColor: o, errorColor: r, textColor2: n, successColor: i, opacityDisabled: a, actionColor: l, borderColor: s, hoverColor: c, lineHeight: d, borderRadius: f, fontSize: g } = e;
    return {
      fontSize: g,
      lineHeight: d,
      borderRadius: f,
      draggerColor: l,
      draggerBorder: `1px dashed ${s}`,
      draggerBorderHover: `1px dashed ${o}`,
      itemColorHover: c,
      itemColorHoverError: X(r, {
        alpha: 0.06
      }),
      itemTextColor: n,
      itemTextColorError: r,
      itemTextColorSuccess: i,
      itemIconColor: t,
      itemDisabledOpacity: a,
      itemBorderImageCardError: `1px solid ${r}`,
      itemBorderImageCard: `1px solid ${s}`
    };
  }, F2 = {
    name: "Upload",
    common: St,
    peers: {
      Button: yc,
      Progress: Lc
    },
    self: Vc
  }, W2 = F2, j2 = {
    name: "Upload",
    common: j,
    peers: {
      Button: ot,
      Progress: Fc
    },
    self(e) {
      const { errorColor: t } = e, o = Vc(e);
      return o.itemColorHoverError = X(t, {
        alpha: 0.09
      }), o;
    }
  }, N2 = j2, V2 = {
    name: "Watermark",
    common: j,
    self(e) {
      const { fontFamily: t } = e;
      return {
        fontFamily: t
      };
    }
  }, U2 = V2, G2 = {
    name: "Row",
    common: j
  }, X2 = G2, q2 = {
    name: "Image",
    common: j,
    peers: {
      Tooltip: wn
    },
    self: (e) => {
      const { textColor2: t } = e;
      return {
        toolbarIconColor: t,
        toolbarColor: "rgba(0, 0, 0, .35)",
        toolbarBoxShadow: "none",
        toolbarBorderRadius: "24px"
      };
    }
  }, Y2 = u(
    "svg",
    { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    u("path", { d: "M6 5C5.75454 5 5.55039 5.17688 5.50806 5.41012L5.5 5.5V14.5C5.5 14.7761 5.72386 15 6 15C6.24546 15 6.44961 14.8231 6.49194 14.5899L6.5 14.5V5.5C6.5 5.22386 6.27614 5 6 5ZM13.8536 5.14645C13.68 4.97288 13.4106 4.9536 13.2157 5.08859L13.1464 5.14645L8.64645 9.64645C8.47288 9.82001 8.4536 10.0894 8.58859 10.2843L8.64645 10.3536L13.1464 14.8536C13.3417 15.0488 13.6583 15.0488 13.8536 14.8536C14.0271 14.68 14.0464 14.4106 13.9114 14.2157L13.8536 14.1464L9.70711 10L13.8536 5.85355C14.0488 5.65829 14.0488 5.34171 13.8536 5.14645Z", fill: "currentColor" })
  ), Z2 = u(
    "svg",
    { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    u("path", { d: "M13.5 5C13.7455 5 13.9496 5.17688 13.9919 5.41012L14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2545 15 13.0504 14.8231 13.0081 14.5899L13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM5.64645 5.14645C5.82001 4.97288 6.08944 4.9536 6.28431 5.08859L6.35355 5.14645L10.8536 9.64645C11.0271 9.82001 11.0464 10.0894 10.9114 10.2843L10.8536 10.3536L6.35355 14.8536C6.15829 15.0488 5.84171 15.0488 5.64645 14.8536C5.47288 14.68 5.4536 14.4106 5.58859 14.2157L5.64645 14.1464L9.79289 10L5.64645 5.85355C5.45118 5.65829 5.45118 5.34171 5.64645 5.14645Z", fill: "currentColor" })
  ), K2 = u(
    "svg",
    { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    u("path", { d: "M4.089 4.216l.057-.07a.5.5 0 0 1 .638-.057l.07.057L10 9.293l5.146-5.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L10.707 10l5.147 5.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L10 10.707l-5.146 5.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L9.293 10L4.146 4.854a.5.5 0 0 1-.057-.638l.057-.07l-.057.07z", fill: "currentColor" })
  ), J2 = E([E("body >", [R("image-container", "position: fixed;")]), R("image-preview-container", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 `), R("image-preview-overlay", `
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background: rgba(0, 0, 0, .3);
 `, [hi()]), R("image-preview-toolbar", `
 z-index: 1;
 position: absolute;
 left: 50%;
 transform: translateX(-50%);
 border-radius: var(--n-toolbar-border-radius);
 height: 48px;
 bottom: 40px;
 padding: 0 12px;
 background: var(--n-toolbar-color);
 box-shadow: var(--n-toolbar-box-shadow);
 color: var(--n-toolbar-icon-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `, [R("base-icon", `
 padding: 0 8px;
 font-size: 28px;
 cursor: pointer;
 `), hi()]), R("image-preview-wrapper", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 pointer-events: none;
 `, [ax()]), R("image-preview", `
 user-select: none;
 -webkit-user-select: none;
 pointer-events: all;
 margin: auto;
 max-height: calc(100vh - 32px);
 max-width: calc(100vw - 32px);
 transition: transform .3s var(--n-bezier);
 `), R("image", `
 display: inline-flex;
 max-height: 100%;
 max-width: 100%;
 `, [nt("preview-disabled", `
 cursor: pointer;
 `), E("img", `
 border-radius: inherit;
 `)])]), Gr = 32, Uc = ie({
    name: "ImagePreview",
    props: Object.assign(Object.assign({}, Wi), { onNext: Function, onPrev: Function, clsPrefix: {
      type: String,
      required: !0
    } }),
    setup(e) {
      const t = De("Image", "-image", J2, sw, e, se(e, "clsPrefix"));
      let o = null;
      const r = H(null), n = H(null), i = H(void 0), a = H(!1), l = H(!1), { localeRef: s } = Js("Image");
      function c() {
        const { value: U } = n;
        if (!o || !U)
          return;
        const { style: ne } = U, Z = o.getBoundingClientRect(), ue = Z.left + Z.width / 2, _ = Z.top + Z.height / 2;
        ne.transformOrigin = `${ue}px ${_}px`;
      }
      function d(U) {
        var ne, Z;
        switch (U.key) {
          case " ":
            U.preventDefault();
            break;
          case "ArrowLeft":
            (ne = e.onPrev) === null || ne === void 0 || ne.call(e);
            break;
          case "ArrowRight":
            (Z = e.onNext) === null || Z === void 0 || Z.call(e);
            break;
          case "Escape":
            Me();
            break;
        }
      }
      ke(a, (U) => {
        U ? Oe("keydown", document, d) : Pe("keydown", document, d);
      }), st(() => {
        Pe("keydown", document, d);
      });
      let f = 0, g = 0, v = 0, p = 0, b = 0, x = 0, m = 0, C = 0, D = !1;
      function I(U) {
        const { clientX: ne, clientY: Z } = U;
        v = ne - f, p = Z - g, wi(Te);
      }
      function z(U) {
        const { mouseUpClientX: ne, mouseUpClientY: Z, mouseDownClientX: ue, mouseDownClientY: _ } = U, W = ue - ne, J = _ - Z, oe = `vertical${J > 0 ? "Top" : "Bottom"}`, ce = `horizontal${W > 0 ? "Left" : "Right"}`;
        return {
          moveVerticalDirection: oe,
          moveHorizontalDirection: ce,
          deltaHorizontal: W,
          deltaVertical: J
        };
      }
      function $(U) {
        const { value: ne } = r;
        if (!ne)
          return { offsetX: 0, offsetY: 0 };
        const Z = ne.getBoundingClientRect(), { moveVerticalDirection: ue, moveHorizontalDirection: _, deltaHorizontal: W, deltaVertical: J } = U || {};
        let oe = 0, ce = 0;
        return Z.width <= window.innerWidth ? oe = 0 : Z.left > 0 ? oe = (Z.width - window.innerWidth) / 2 : Z.right < window.innerWidth ? oe = -(Z.width - window.innerWidth) / 2 : _ === "horizontalRight" ? oe = Math.min((Z.width - window.innerWidth) / 2, b - (W ?? 0)) : oe = Math.max(-((Z.width - window.innerWidth) / 2), b - (W ?? 0)), Z.height <= window.innerHeight ? ce = 0 : Z.top > 0 ? ce = (Z.height - window.innerHeight) / 2 : Z.bottom < window.innerHeight ? ce = -(Z.height - window.innerHeight) / 2 : ue === "verticalBottom" ? ce = Math.min((Z.height - window.innerHeight) / 2, x - (J ?? 0)) : ce = Math.max(-((Z.height - window.innerHeight) / 2), x - (J ?? 0)), {
          offsetX: oe,
          offsetY: ce
        };
      }
      function h(U) {
        Pe("mousemove", document, I), Pe("mouseup", document, h);
        const { clientX: ne, clientY: Z } = U;
        D = !1;
        const ue = z({
          mouseUpClientX: ne,
          mouseUpClientY: Z,
          mouseDownClientX: m,
          mouseDownClientY: C
        }), _ = $(ue);
        v = _.offsetX, p = _.offsetY, Te();
      }
      const P = ve(Hc, null);
      function y(U) {
        var ne, Z;
        if ((Z = (ne = P == null ? void 0 : P.previewedImgPropsRef.value) === null || ne === void 0 ? void 0 : ne.onMousedown) === null || Z === void 0 || Z.call(ne, U), U.button !== 0)
          return;
        const { clientX: ue, clientY: _ } = U;
        D = !0, f = ue - v, g = _ - p, b = v, x = p, m = ue, C = _, Te(), Oe("mousemove", document, I), Oe("mouseup", document, h);
      }
      function S(U) {
        var ne, Z;
        (Z = (ne = P == null ? void 0 : P.previewedImgPropsRef.value) === null || ne === void 0 ? void 0 : ne.onDblclick) === null || Z === void 0 || Z.call(ne, U);
        const ue = Ie();
        L = L === ue ? 1 : ue, Te();
      }
      const T = 1.5;
      let M = 0, L = 1, O = 0;
      function N() {
        L = 1, M = 0;
      }
      function q() {
        var U;
        N(), O = 0, (U = e.onPrev) === null || U === void 0 || U.call(e);
      }
      function Y() {
        var U;
        N(), O = 0, (U = e.onNext) === null || U === void 0 || U.call(e);
      }
      function Q() {
        O -= 90, Te();
      }
      function fe() {
        O += 90, Te();
      }
      function be() {
        const { value: U } = r;
        if (!U)
          return 1;
        const { innerWidth: ne, innerHeight: Z } = window, ue = Math.max(1, U.naturalHeight / (Z - Gr)), _ = Math.max(1, U.naturalWidth / (ne - Gr));
        return Math.max(3, ue * 2, _ * 2);
      }
      function Ie() {
        const { value: U } = r;
        if (!U)
          return 1;
        const { innerWidth: ne, innerHeight: Z } = window, ue = U.naturalHeight / (Z - Gr), _ = U.naturalWidth / (ne - Gr);
        return ue < 1 && _ < 1 ? 1 : Math.max(ue, _);
      }
      function Fe() {
        const U = be();
        L < U && (M += 1, L = Math.min(U, Math.pow(T, M)), Te());
      }
      function ct() {
        if (L > 0.5) {
          const U = L;
          M -= 1, L = Math.max(0.5, Math.pow(T, M));
          const ne = U - L;
          Te(!1);
          const Z = $();
          L += ne, Te(!1), L -= ne, v = Z.offsetX, p = Z.offsetY, Te();
        }
      }
      function Te(U = !0) {
        var ne;
        const { value: Z } = r;
        if (!Z)
          return;
        const { style: ue } = Z, _ = Jd((ne = P == null ? void 0 : P.previewedImgPropsRef.value) === null || ne === void 0 ? void 0 : ne.style);
        let W = "";
        if (typeof _ == "string")
          W = _ + ";";
        else
          for (const oe in _)
            W += `${$b(oe)}: ${_[oe]};`;
        const J = `transform-origin: center; transform: translateX(${v}px) translateY(${p}px) rotate(${O}deg) scale(${L});`;
        D ? ue.cssText = W + "cursor: grabbing; transition: none;" + J : ue.cssText = W + "cursor: grab;" + J + (U ? "" : "transition: none;"), U || Z.offsetHeight;
      }
      function Me() {
        a.value = !a.value, l.value = !0;
      }
      function ge() {
        L = Ie(), M = Math.ceil(Math.log(L) / Math.log(T)), v = 0, p = 0, Te();
      }
      const rt = {
        setPreviewSrc: (U) => {
          i.value = U;
        },
        setThumbnailEl: (U) => {
          o = U;
        },
        toggleShow: Me
      };
      function $t(U, ne) {
        if (e.showToolbarTooltip) {
          const { value: Z } = t;
          return u(fy, { to: !1, theme: Z.peers.Tooltip, themeOverrides: Z.peerOverrides.Tooltip, keepAliveOnHover: !1 }, {
            default: () => s.value[ne],
            trigger: () => U
          });
        } else
          return U;
      }
      const de = k(() => {
        const { common: { cubicBezierEaseInOut: U }, self: { toolbarIconColor: ne, toolbarBorderRadius: Z, toolbarBoxShadow: ue, toolbarColor: _ } } = t.value;
        return {
          "--n-bezier": U,
          "--n-toolbar-icon-color": ne,
          "--n-toolbar-color": _,
          "--n-toolbar-border-radius": Z,
          "--n-toolbar-box-shadow": ue
        };
      }), { inlineThemeDisabled: Xe } = gt(), We = Xe ? Ft("image-preview", void 0, de, e) : void 0;
      return Object.assign({
        previewRef: r,
        previewWrapperRef: n,
        previewSrc: i,
        show: a,
        appear: gn(),
        displayed: l,
        previewedImgProps: P == null ? void 0 : P.previewedImgPropsRef,
        handleWheel(U) {
          U.preventDefault();
        },
        handlePreviewMousedown: y,
        handlePreviewDblclick: S,
        syncTransformOrigin: c,
        handleAfterLeave: () => {
          N(), O = 0, l.value = !1;
        },
        handleDragStart: (U) => {
          var ne, Z;
          (Z = (ne = P == null ? void 0 : P.previewedImgPropsRef.value) === null || ne === void 0 ? void 0 : ne.onDragstart) === null || Z === void 0 || Z.call(ne, U), U.preventDefault();
        },
        zoomIn: Fe,
        zoomOut: ct,
        rotateCounterclockwise: Q,
        rotateClockwise: fe,
        handleSwitchPrev: q,
        handleSwitchNext: Y,
        withTooltip: $t,
        resizeToOrignalImageSize: ge,
        cssVars: Xe ? void 0 : de,
        themeClass: We == null ? void 0 : We.themeClass,
        onRender: We == null ? void 0 : We.onRender
      }, rt);
    },
    render() {
      var e, t;
      const { clsPrefix: o } = this;
      return u(
        ft,
        null,
        (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e),
        u(Ql, { show: this.show }, {
          default: () => {
            var r;
            return this.show || this.displayed ? ((r = this.onRender) === null || r === void 0 || r.call(this), co(u(
              "div",
              { class: [
                `${o}-image-preview-container`,
                this.themeClass
              ], style: this.cssVars, onWheel: this.handleWheel },
              u(Nt, { name: "fade-in-transition", appear: this.appear }, {
                default: () => this.show ? u("div", { class: `${o}-image-preview-overlay`, onClick: this.toggleShow }) : null
              }),
              this.showToolbar ? u(Nt, { name: "fade-in-transition", appear: this.appear }, {
                default: () => {
                  if (!this.show)
                    return null;
                  const { withTooltip: n } = this;
                  return u(
                    "div",
                    { class: `${o}-image-preview-toolbar` },
                    this.onPrev ? u(
                      ft,
                      null,
                      n(u($e, { clsPrefix: o, onClick: this.handleSwitchPrev }, { default: () => Y2 }), "tipPrevious"),
                      n(u($e, { clsPrefix: o, onClick: this.handleSwitchNext }, { default: () => Z2 }), "tipNext")
                    ) : null,
                    n(u($e, { clsPrefix: o, onClick: this.rotateCounterclockwise }, {
                      default: () => u(I1, null)
                    }), "tipCounterclockwise"),
                    n(u($e, { clsPrefix: o, onClick: this.rotateClockwise }, {
                      default: () => u(R1, null)
                    }), "tipClockwise"),
                    n(u($e, { clsPrefix: o, onClick: this.resizeToOrignalImageSize }, {
                      default: () => u(_1, null)
                    }), "tipOriginalSize"),
                    n(u($e, { clsPrefix: o, onClick: this.zoomOut }, { default: () => u(E1, null) }), "tipZoomOut"),
                    n(u($e, { clsPrefix: o, onClick: this.zoomIn }, { default: () => u(D1, null) }), "tipZoomIn"),
                    n(u($e, { clsPrefix: o, onClick: this.toggleShow }, { default: () => K2 }), "tipClose")
                  );
                }
              }) : null,
              u(Nt, {
                name: "fade-in-scale-up-transition",
                onAfterLeave: this.handleAfterLeave,
                appear: this.appear,
                // BUG:
                // onEnter will be called twice, I don't know why
                // Maybe it is a bug of vue
                onEnter: this.syncTransformOrigin,
                onBeforeLeave: this.syncTransformOrigin
              }, {
                default: () => {
                  const { previewedImgProps: n = {} } = this;
                  return co(u(
                    "div",
                    { class: `${o}-image-preview-wrapper`, ref: "previewWrapperRef" },
                    u("img", Object.assign({}, n, { draggable: !1, onMousedown: this.handlePreviewMousedown, onDblclick: this.handlePreviewDblclick, class: [
                      `${o}-image-preview`,
                      n.class
                    ], key: this.previewSrc, src: this.previewSrc, ref: "previewRef", onDragstart: this.handleDragStart }))
                  ), [[Ir, this.show]]);
                }
              })
            ), [[Si, { enabled: this.show }]])) : null;
          }
        })
      );
    }
  }), Gc = "n-image-group", Q2 = Wi, eS = ie({
    name: "ImageGroup",
    props: Q2,
    setup(e) {
      let t;
      const { mergedClsPrefixRef: o } = gt(e), r = `c${nn()}`, n = No(), i = (s) => {
        var c;
        t = s, (c = l.value) === null || c === void 0 || c.setPreviewSrc(s);
      };
      function a(s) {
        if (!(n != null && n.proxy))
          return;
        const d = n.proxy.$el.parentElement.querySelectorAll(`[data-group-id=${r}]:not([data-error=true])`);
        if (!d.length)
          return;
        const f = Array.from(d).findIndex((g) => g.dataset.previewSrc === t);
        ~f ? i(d[(f + s + d.length) % d.length].dataset.previewSrc) : i(d[0].dataset.previewSrc);
      }
      lt(Gc, {
        mergedClsPrefixRef: o,
        setPreviewSrc: i,
        setThumbnailEl: (s) => {
          var c;
          (c = l.value) === null || c === void 0 || c.setThumbnailEl(s);
        },
        toggleShow: () => {
          var s;
          (s = l.value) === null || s === void 0 || s.toggleShow();
        },
        groupId: r
      });
      const l = H(null);
      return {
        mergedClsPrefix: o,
        previewInstRef: l,
        next: () => a(1),
        prev: () => a(-1)
      };
    },
    render() {
      return u(Uc, { theme: this.theme, themeOverrides: this.themeOverrides, clsPrefix: this.mergedClsPrefix, ref: "previewInstRef", onPrev: this.prev, onNext: this.next, showToolbar: this.showToolbar, showToolbarTooltip: this.showToolbarTooltip }, this.$slots);
    }
  }), tS = Object.assign({ alt: String, height: [String, Number], imgProps: Object, previewedImgProps: Object, lazy: Boolean, intersectionObserverOptions: Object, objectFit: {
    type: String,
    default: "fill"
  }, previewSrc: String, fallbackSrc: String, width: [String, Number], src: String, previewDisabled: Boolean, loadDescription: String, onError: Function, onLoad: Function }, Wi), oS = ie({
    name: "Image",
    props: tS,
    inheritAttrs: !1,
    setup(e) {
      const t = H(null), o = H(!1), r = H(null), n = ve(Gc, null), { mergedClsPrefixRef: i } = n || gt(e), a = {
        click: () => {
          if (e.previewDisabled || o.value)
            return;
          const c = e.previewSrc || e.src;
          if (n) {
            n.setPreviewSrc(c), n.setThumbnailEl(t.value), n.toggleShow();
            return;
          }
          const { value: d } = r;
          d && (d.setPreviewSrc(c), d.setThumbnailEl(t.value), d.toggleShow());
        }
      }, l = H(!e.lazy);
      yt(() => {
        var c;
        (c = t.value) === null || c === void 0 || c.setAttribute("data-group-id", (n == null ? void 0 : n.groupId) || "");
      }), yt(() => {
        if (Fn)
          return;
        let c;
        const d = Ge(() => {
          c == null || c(), c = void 0, e.lazy && (c = Kx(t.value, e.intersectionObserverOptions, l));
        });
        st(() => {
          d(), c == null || c();
        });
      }), Ge(() => {
        var c;
        e.src, (c = e.imgProps) === null || c === void 0 || c.src, o.value = !1;
      });
      const s = H(!1);
      return lt(Hc, {
        previewedImgPropsRef: se(e, "previewedImgProps")
      }), Object.assign({
        mergedClsPrefix: i,
        groupId: n == null ? void 0 : n.groupId,
        previewInstRef: r,
        imageRef: t,
        showError: o,
        shouldStartLoading: l,
        loaded: s,
        mergedOnClick: (c) => {
          var d, f;
          a.click(), (f = (d = e.imgProps) === null || d === void 0 ? void 0 : d.onClick) === null || f === void 0 || f.call(d, c);
        },
        mergedOnError: (c) => {
          if (!l.value)
            return;
          o.value = !0;
          const { onError: d, imgProps: { onError: f } = {} } = e;
          d == null || d(c), f == null || f(c);
        },
        mergedOnLoad: (c) => {
          const { onLoad: d, imgProps: { onLoad: f } = {} } = e;
          d == null || d(c), f == null || f(c), s.value = !0;
        }
      }, a);
    },
    render() {
      var e, t;
      const { mergedClsPrefix: o, imgProps: r = {}, loaded: n, $attrs: i, lazy: a } = this, l = (t = (e = this.$slots).placeholder) === null || t === void 0 ? void 0 : t.call(e), s = this.src || r.src || "", c = u("img", Object.assign(Object.assign({}, r), {
        ref: "imageRef",
        width: this.width || r.width,
        height: this.height || r.height,
        src: Fn ? s : this.showError ? this.fallbackSrc : this.shouldStartLoading ? s : void 0,
        alt: this.alt || r.alt,
        "aria-label": this.alt || r.alt,
        onClick: this.mergedOnClick,
        onError: this.mergedOnError,
        onLoad: this.mergedOnLoad,
        // If interseciton observer options is set, do not use native lazy
        loading: Fn && a && !this.intersectionObserverOptions ? "lazy" : "eager",
        style: [
          r.style || "",
          l && !n ? { height: "0", width: "0", visibility: "hidden" } : "",
          { objectFit: this.objectFit }
        ],
        "data-error": this.showError,
        "data-preview-src": this.previewSrc || this.src
      }));
      return u(
        "div",
        Object.assign({}, i, { role: "none", class: [
          i.class,
          `${o}-image`,
          (this.previewDisabled || this.showError) && `${o}-image--preview-disabled`
        ] }),
        this.groupId ? c : u(Uc, { theme: this.theme, themeOverrides: this.themeOverrides, clsPrefix: o, ref: "previewInstRef", showToolbar: this.showToolbar, showToolbarTooltip: this.showToolbarTooltip }, {
          default: () => c
        }),
        !n && l
      );
    }
  }), rS = {
    extraFontSize: "12px",
    width: "440px"
  }, nS = {
    name: "Transfer",
    common: j,
    peers: {
      Checkbox: Yo,
      Scrollbar: tt,
      Input: vt,
      Empty: bo,
      Button: ot
    },
    self(e) {
      const { iconColorDisabled: t, iconColor: o, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: a, heightLarge: l, heightMedium: s, heightSmall: c, borderRadius: d, inputColor: f, tableHeaderColor: g, textColor1: v, textColorDisabled: p, textColor2: b, hoverColor: x } = e;
      return Object.assign(Object.assign({}, rS), {
        itemHeightSmall: c,
        itemHeightMedium: s,
        itemHeightLarge: l,
        fontSizeSmall: a,
        fontSizeMedium: i,
        fontSizeLarge: n,
        borderRadius: d,
        borderColor: "#0000",
        listColor: f,
        headerColor: g,
        titleTextColor: v,
        titleTextColorDisabled: p,
        extraTextColor: b,
        filterDividerColor: "#0000",
        itemTextColor: b,
        itemTextColorDisabled: p,
        itemColorPending: x,
        titleFontWeight: r,
        iconColor: o,
        iconColorDisabled: t
      });
    }
  }, iS = nS, aS = E([R("progress", {
    display: "inline-block"
  }, [R("progress-icon", `
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `), V("line", `
 width: 100%;
 display: block;
 `, [R("progress-content", `
 display: flex;
 align-items: center;
 `, [R("progress-graph", {
    flex: 1
  })]), R("progress-custom-content", {
    marginLeft: "14px"
  }), R("progress-icon", `
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `, [V("as-text", `
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]), V("circle, dashboard", {
    width: "120px"
  }, [R("progress-custom-content", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `), R("progress-text", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `), R("progress-icon", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]), V("multiple-circle", `
 width: 200px;
 color: inherit;
 `, [R("progress-text", `
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]), R("progress-content", {
    position: "relative"
  }), R("progress-graph", {
    position: "relative"
  }, [R("progress-graph-circle", [E("svg", {
    verticalAlign: "bottom"
  }), R("progress-graph-circle-fill", `
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `, [V("empty", {
    opacity: 0
  })]), R("progress-graph-circle-rail", `
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]), R("progress-graph-line", [V("indicator-inside", [R("progress-graph-line-rail", `
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `, [R("progress-graph-line-fill", `
 height: inherit;
 border-radius: 10px;
 `), R("progress-graph-line-indicator", `
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]), V("indicator-inside-label", `
 height: 16px;
 display: flex;
 align-items: center;
 `, [R("progress-graph-line-rail", `
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `), R("progress-graph-line-indicator", `
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]), R("progress-graph-line-rail", `
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `, [R("progress-graph-line-fill", `
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `, [V("processing", [E("&::after", `
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]), E("@keyframes progress-processing-animation", `
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]), lS = {
    success: u(rc, null),
    error: u(tc, null),
    warning: u(nc, null),
    info: u(oc, null)
  }, sS = ie({
    name: "ProgressLine",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      percentage: {
        type: Number,
        default: 0
      },
      railColor: String,
      railStyle: [String, Object],
      fillColor: String,
      status: {
        type: String,
        required: !0
      },
      indicatorPlacement: {
        type: String,
        required: !0
      },
      indicatorTextColor: String,
      unit: {
        type: String,
        default: "%"
      },
      processing: {
        type: Boolean,
        required: !0
      },
      showIndicator: {
        type: Boolean,
        required: !0
      },
      height: [String, Number],
      railBorderRadius: [String, Number],
      fillBorderRadius: [String, Number]
    },
    setup(e, { slots: t }) {
      const o = k(() => Ot(e.height)), r = k(() => e.railBorderRadius !== void 0 ? Ot(e.railBorderRadius) : e.height !== void 0 ? Ot(e.height, { c: 0.5 }) : ""), n = k(() => e.fillBorderRadius !== void 0 ? Ot(e.fillBorderRadius) : e.railBorderRadius !== void 0 ? Ot(e.railBorderRadius) : e.height !== void 0 ? Ot(e.height, { c: 0.5 }) : "");
      return () => {
        const { indicatorPlacement: i, railColor: a, railStyle: l, percentage: s, unit: c, indicatorTextColor: d, status: f, showIndicator: g, fillColor: v, processing: p, clsPrefix: b } = e;
        return u(
          "div",
          { class: `${b}-progress-content`, role: "none" },
          u(
            "div",
            { class: `${b}-progress-graph`, "aria-hidden": !0 },
            u(
              "div",
              { class: [
                `${b}-progress-graph-line`,
                {
                  [`${b}-progress-graph-line--indicator-${i}`]: !0
                }
              ] },
              u(
                "div",
                { class: `${b}-progress-graph-line-rail`, style: [
                  {
                    backgroundColor: a,
                    height: o.value,
                    borderRadius: r.value
                  },
                  l
                ] },
                u("div", { class: [
                  `${b}-progress-graph-line-fill`,
                  p && `${b}-progress-graph-line-fill--processing`
                ], style: {
                  maxWidth: `${e.percentage}%`,
                  backgroundColor: v,
                  height: o.value,
                  lineHeight: o.value,
                  borderRadius: n.value
                } }, i === "inside" ? u(
                  "div",
                  { class: `${b}-progress-graph-line-indicator`, style: {
                    color: d
                  } },
                  s,
                  c
                ) : null)
              )
            )
          ),
          g && i === "outside" ? u("div", null, t.default ? u("div", { class: `${b}-progress-custom-content`, style: {
            color: d
          }, role: "none" }, t.default()) : f === "default" ? u(
            "div",
            { role: "none", class: `${b}-progress-icon ${b}-progress-icon--as-text`, style: {
              color: d
            } },
            s,
            c
          ) : u(
            "div",
            { class: `${b}-progress-icon`, "aria-hidden": !0 },
            u($e, { clsPrefix: b }, { default: () => lS[f] })
          )) : null
        );
      };
    }
  }), cS = {
    success: u(rc, null),
    error: u(tc, null),
    warning: u(nc, null),
    info: u(oc, null)
  }, dS = ie({
    name: "ProgressCircle",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      status: {
        type: String,
        required: !0
      },
      strokeWidth: {
        type: Number,
        required: !0
      },
      fillColor: String,
      railColor: String,
      railStyle: [String, Object],
      percentage: {
        type: Number,
        default: 0
      },
      offsetDegree: {
        type: Number,
        default: 0
      },
      showIndicator: {
        type: Boolean,
        required: !0
      },
      indicatorTextColor: String,
      unit: String,
      viewBoxWidth: {
        type: Number,
        required: !0
      },
      gapDegree: {
        type: Number,
        required: !0
      },
      gapOffsetDegree: {
        type: Number,
        default: 0
      }
    },
    setup(e, { slots: t }) {
      function o(r, n, i) {
        const { gapDegree: a, viewBoxWidth: l, strokeWidth: s } = e, c = 50, d = 0, f = c, g = 0, v = 2 * c, p = 50 + s / 2, b = `M ${p},${p} m ${d},${f}
      a ${c},${c} 0 1 1 ${g},${-v}
      a ${c},${c} 0 1 1 ${-g},${v}`, x = Math.PI * 2 * c, m = {
          stroke: i,
          strokeDasharray: `${r / 100 * (x - a)}px ${l * 8}px`,
          strokeDashoffset: `-${a / 2}px`,
          transformOrigin: n ? "center" : void 0,
          transform: n ? `rotate(${n}deg)` : void 0
        };
        return {
          pathString: b,
          pathStyle: m
        };
      }
      return () => {
        const { fillColor: r, railColor: n, strokeWidth: i, offsetDegree: a, status: l, percentage: s, showIndicator: c, indicatorTextColor: d, unit: f, gapOffsetDegree: g, clsPrefix: v } = e, { pathString: p, pathStyle: b } = o(100, 0, n), { pathString: x, pathStyle: m } = o(s, a, r), C = 100 + i;
        return u(
          "div",
          { class: `${v}-progress-content`, role: "none" },
          u(
            "div",
            { class: `${v}-progress-graph`, "aria-hidden": !0 },
            u(
              "div",
              { class: `${v}-progress-graph-circle`, style: {
                transform: g ? `rotate(${g}deg)` : void 0
              } },
              u(
                "svg",
                { viewBox: `0 0 ${C} ${C}` },
                u(
                  "g",
                  null,
                  u("path", { class: `${v}-progress-graph-circle-rail`, d: p, "stroke-width": i, "stroke-linecap": "round", fill: "none", style: b })
                ),
                u(
                  "g",
                  null,
                  u("path", { class: [
                    `${v}-progress-graph-circle-fill`,
                    s === 0 && `${v}-progress-graph-circle-fill--empty`
                  ], d: x, "stroke-width": i, "stroke-linecap": "round", fill: "none", style: m })
                )
              )
            )
          ),
          c ? u("div", null, t.default ? u("div", { class: `${v}-progress-custom-content`, role: "none" }, t.default()) : l !== "default" ? u(
            "div",
            { class: `${v}-progress-icon`, "aria-hidden": !0 },
            u($e, { clsPrefix: v }, {
              default: () => cS[l]
            })
          ) : u(
            "div",
            { class: `${v}-progress-text`, style: {
              color: d
            }, role: "none" },
            u("span", { class: `${v}-progress-text__percentage` }, s),
            u("span", { class: `${v}-progress-text__unit` }, f)
          )) : null
        );
      };
    }
  });
  function sl(e, t, o = 100) {
    return `m ${o / 2} ${o / 2 - e} a ${e} ${e} 0 1 1 0 ${2 * e} a ${e} ${e} 0 1 1 0 -${2 * e}`;
  }
  const uS = ie({
    name: "ProgressMultipleCircle",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      viewBoxWidth: {
        type: Number,
        required: !0
      },
      percentage: {
        type: Array,
        default: [0]
      },
      strokeWidth: {
        type: Number,
        required: !0
      },
      circleGap: {
        type: Number,
        required: !0
      },
      showIndicator: {
        type: Boolean,
        required: !0
      },
      fillColor: {
        type: Array,
        default: () => []
      },
      railColor: {
        type: Array,
        default: () => []
      },
      railStyle: {
        type: Array,
        default: () => []
      }
    },
    setup(e, { slots: t }) {
      const o = k(() => e.percentage.map((n, i) => `${Math.PI * n / 100 * (e.viewBoxWidth / 2 - e.strokeWidth / 2 * (1 + 2 * i) - e.circleGap * i) * 2}, ${e.viewBoxWidth * 8}`));
      return () => {
        const { viewBoxWidth: r, strokeWidth: n, circleGap: i, showIndicator: a, fillColor: l, railColor: s, railStyle: c, percentage: d, clsPrefix: f } = e;
        return u(
          "div",
          { class: `${f}-progress-content`, role: "none" },
          u(
            "div",
            { class: `${f}-progress-graph`, "aria-hidden": !0 },
            u(
              "div",
              { class: `${f}-progress-graph-circle` },
              u("svg", { viewBox: `0 0 ${r} ${r}` }, d.map((g, v) => u(
                "g",
                { key: v },
                u("path", { class: `${f}-progress-graph-circle-rail`, d: sl(r / 2 - n / 2 * (1 + 2 * v) - i * v, n, r), "stroke-width": n, "stroke-linecap": "round", fill: "none", style: [
                  {
                    strokeDashoffset: 0,
                    stroke: s[v]
                  },
                  c[v]
                ] }),
                u("path", { class: [
                  `${f}-progress-graph-circle-fill`,
                  g === 0 && `${f}-progress-graph-circle-fill--empty`
                ], d: sl(r / 2 - n / 2 * (1 + 2 * v) - i * v, n, r), "stroke-width": n, "stroke-linecap": "round", fill: "none", style: {
                  strokeDasharray: o.value[v],
                  strokeDashoffset: 0,
                  stroke: l[v]
                } })
              )))
            )
          ),
          a && t.default ? u(
            "div",
            null,
            u("div", { class: `${f}-progress-text` }, t.default())
          ) : null
        );
      };
    }
  }), fS = Object.assign(Object.assign({}, De.props), { processing: Boolean, type: {
    type: String,
    default: "line"
  }, gapDegree: Number, gapOffsetDegree: Number, status: {
    type: String,
    default: "default"
  }, railColor: [String, Array], railStyle: [String, Array], color: [String, Array], viewBoxWidth: {
    type: Number,
    default: 100
  }, strokeWidth: {
    type: Number,
    default: 7
  }, percentage: [Number, Array], unit: {
    type: String,
    default: "%"
  }, showIndicator: {
    type: Boolean,
    default: !0
  }, indicatorPosition: {
    type: String,
    default: "outside"
  }, indicatorPlacement: {
    type: String,
    default: "outside"
  }, indicatorTextColor: String, circleGap: {
    type: Number,
    default: 1
  }, height: Number, borderRadius: [String, Number], fillBorderRadius: [String, Number], offsetDegree: Number }), pS = ie({
    name: "Progress",
    props: fS,
    setup(e) {
      const t = k(() => e.indicatorPlacement || e.indicatorPosition), o = k(() => {
        if (e.gapDegree || e.gapDegree === 0)
          return e.gapDegree;
        if (e.type === "dashboard")
          return 75;
      }), { mergedClsPrefixRef: r, inlineThemeDisabled: n } = gt(e), i = De("Progress", "-progress", aS, Lc, e, r), a = k(() => {
        const { status: s } = e, { common: { cubicBezierEaseInOut: c }, self: { fontSize: d, fontSizeCircle: f, railColor: g, railHeight: v, iconSizeCircle: p, iconSizeLine: b, textColorCircle: x, textColorLineInner: m, textColorLineOuter: C, lineBgProcessing: D, fontWeightCircle: I, [ee("iconColor", s)]: z, [ee("fillColor", s)]: $ } } = i.value;
        return {
          "--n-bezier": c,
          "--n-fill-color": $,
          "--n-font-size": d,
          "--n-font-size-circle": f,
          "--n-font-weight-circle": I,
          "--n-icon-color": z,
          "--n-icon-size-circle": p,
          "--n-icon-size-line": b,
          "--n-line-bg-processing": D,
          "--n-rail-color": g,
          "--n-rail-height": v,
          "--n-text-color-circle": x,
          "--n-text-color-line-inner": m,
          "--n-text-color-line-outer": C
        };
      }), l = n ? Ft("progress", k(() => e.status[0]), a, e) : void 0;
      return {
        mergedClsPrefix: r,
        mergedIndicatorPlacement: t,
        gapDeg: o,
        cssVars: n ? void 0 : a,
        themeClass: l == null ? void 0 : l.themeClass,
        onRender: l == null ? void 0 : l.onRender
      };
    },
    render() {
      const { type: e, cssVars: t, indicatorTextColor: o, showIndicator: r, status: n, railColor: i, railStyle: a, color: l, percentage: s, viewBoxWidth: c, strokeWidth: d, mergedIndicatorPlacement: f, unit: g, borderRadius: v, fillBorderRadius: p, height: b, processing: x, circleGap: m, mergedClsPrefix: C, gapDeg: D, gapOffsetDegree: I, themeClass: z, $slots: $, onRender: h } = this;
      return h == null || h(), u("div", { class: [
        z,
        `${C}-progress`,
        `${C}-progress--${e}`,
        `${C}-progress--${n}`
      ], style: t, "aria-valuemax": 100, "aria-valuemin": 0, "aria-valuenow": s, role: e === "circle" || e === "line" || e === "dashboard" ? "progressbar" : "none" }, e === "circle" || e === "dashboard" ? u(dS, { clsPrefix: C, status: n, showIndicator: r, indicatorTextColor: o, railColor: i, fillColor: l, railStyle: a, offsetDegree: this.offsetDegree, percentage: s, viewBoxWidth: c, strokeWidth: d, gapDegree: D === void 0 ? e === "dashboard" ? 75 : 0 : D, gapOffsetDegree: I, unit: g }, $) : e === "line" ? u(sS, { clsPrefix: C, status: n, showIndicator: r, indicatorTextColor: o, railColor: i, fillColor: l, railStyle: a, percentage: s, processing: x, indicatorPlacement: f, unit: g, fillBorderRadius: p, railBorderRadius: v, height: b }, $) : e === "multiple-circle" ? u(uS, { clsPrefix: C, strokeWidth: d, railColor: i, fillColor: l, railStyle: a, viewBoxWidth: c, percentage: s, showIndicator: r, circleGap: m }, $) : null);
    }
  }), hS = {
    name: "Skeleton",
    common: j,
    self(e) {
      const { heightSmall: t, heightMedium: o, heightLarge: r, borderRadius: n } = e;
      return {
        color: "rgba(255, 255, 255, 0.12)",
        colorEnd: "rgba(255, 255, 255, 0.18)",
        borderRadius: n,
        heightSmall: t,
        heightMedium: o,
        heightLarge: r
      };
    }
  }, ji = "n-tabs", Xc = {
    tab: [String, Number, Object, Function],
    name: {
      type: [String, Number],
      required: !0
    },
    disabled: Boolean,
    displayDirective: {
      type: String,
      default: "if"
    },
    closable: {
      type: Boolean,
      default: void 0
    },
    tabProps: Object,
    /** @deprecated */
    label: [String, Number, Object, Function]
  }, Un = ie({
    __TAB_PANE__: !0,
    name: "TabPane",
    alias: ["TabPanel"],
    props: Xc,
    setup(e) {
      process.env.NODE_ENV !== "production" && Ge(() => {
        e.label !== void 0 && bt("tab-pane", "`label` is deprecated, please use `tab` instead.");
      });
      const t = ve(ji, null);
      return t || po("tab-pane", "`n-tab-pane` must be placed inside `n-tabs`."), {
        style: t.paneStyleRef,
        class: t.paneClassRef,
        mergedClsPrefix: t.mergedClsPrefixRef
      };
    },
    render() {
      return u("div", { class: [`${this.mergedClsPrefix}-tab-pane`, this.class], style: this.style }, this.$slots);
    }
  }), gS = Object.assign({ internalLeftPadded: Boolean, internalAddable: Boolean, internalCreatedByPane: Boolean }, ju(Xc, ["displayDirective"])), vi = ie({
    __TAB__: !0,
    inheritAttrs: !1,
    name: "Tab",
    props: gS,
    setup(e) {
      const {
        mergedClsPrefixRef: t,
        valueRef: o,
        typeRef: r,
        closableRef: n,
        tabStyleRef: i,
        tabChangeIdRef: a,
        onBeforeLeaveRef: l,
        triggerRef: s,
        handleAdd: c,
        activateTab: d,
        handleClose: f
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = ve(ji);
      return {
        trigger: s,
        mergedClosable: k(() => {
          if (e.internalAddable)
            return !1;
          const { closable: g } = e;
          return g === void 0 ? n.value : g;
        }),
        style: i,
        clsPrefix: t,
        value: o,
        type: r,
        handleClose(g) {
          g.stopPropagation(), !e.disabled && f(e.name);
        },
        activateTab() {
          if (e.disabled)
            return;
          if (e.internalAddable) {
            c();
            return;
          }
          const { name: g } = e, v = ++a.id;
          if (g !== o.value) {
            const { value: p } = l;
            p ? Promise.resolve(p(e.name, o.value)).then((b) => {
              b && a.id === v && d(g);
            }) : d(g);
          }
        }
      };
    },
    render() {
      const { internalAddable: e, clsPrefix: t, name: o, disabled: r, label: n, tab: i, value: a, mergedClosable: l, style: s, trigger: c, $slots: { default: d } } = this, f = n ?? i;
      return u(
        "div",
        { class: `${t}-tabs-tab-wrapper` },
        this.internalLeftPadded ? u("div", { class: `${t}-tabs-tab-pad` }) : null,
        u(
          "div",
          Object.assign({ key: o, "data-name": o, "data-disabled": r ? !0 : void 0 }, xr({
            class: [
              `${t}-tabs-tab`,
              a === o && `${t}-tabs-tab--active`,
              r && `${t}-tabs-tab--disabled`,
              l && `${t}-tabs-tab--closable`,
              e && `${t}-tabs-tab--addable`
            ],
            onClick: c === "click" ? this.activateTab : void 0,
            onMouseenter: c === "hover" ? this.activateTab : void 0,
            style: e ? void 0 : s
          }, this.internalCreatedByPane ? this.tabProps || {} : this.$attrs)),
          u("span", { class: `${t}-tabs-tab__label` }, e ? u(
            ft,
            null,
            u("div", { class: `${t}-tabs-tab__height-placeholder` }, " "),
            u($e, { clsPrefix: t }, {
              default: () => u(Qs, null)
            })
          ) : d ? d() : typeof f == "object" ? f : Nu(f ?? o)),
          l && this.type === "card" ? u(O1, { clsPrefix: t, class: `${t}-tabs-tab__close`, onClick: this.handleClose, disabled: r }) : null
        )
      );
    }
  }), vS = R("tabs", `
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`, [V("segment-type", [R("tabs-rail", [E("&.transition-disabled", "color: red;", [R("tabs-tab", `
 transition: none;
 `)])])]), V("left, right", `
 flex-direction: row;
 `, [R("tabs-bar", `
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), R("tabs-tab", `
 padding: var(--n-tab-padding-vertical); 
 `)]), V("right", `
 flex-direction: row-reverse;
 `, [R("tabs-bar", `
 left: 0;
 `)]), V("bottom", `
 flex-direction: column-reverse;
 justify-content: flex-end;
 `, [R("tabs-bar", `
 top: 0;
 `)]), R("tabs-rail", `
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `, [R("tabs-tab-wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [R("tabs-tab", `
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [V("active", `
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `), E("&:hover", `
 color: var(--n-tab-text-color-hover);
 `)])])]), V("flex", [R("tabs-nav", {
    width: "100%"
  }, [R("tabs-wrapper", {
    width: "100%"
  }, [R("tabs-tab", {
    marginRight: 0
  })])])]), R("tabs-nav", `
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `, [A("prefix, suffix", `
 display: flex;
 align-items: center;
 `), A("prefix", "padding-right: 16px;"), A("suffix", "padding-left: 16px;")]), R("tabs-nav-scroll-wrapper", `
 flex: 1;
 position: relative;
 overflow: hidden;
 `, [V("shadow-before", [E("&::before", `
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]), V("shadow-after", [E("&::after", `
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]), R("tabs-nav-y-scroll", `
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `, [E("&::-webkit-scrollbar", `
 width: 0;
 height: 0;
 `)]), E("&::before, &::after", `
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 20px;
 z-index: 1;
 `), E("&::before", `
 left: 0;
 `), E("&::after", `
 right: 0;
 `)]), R("tabs-nav-scroll-content", `
 display: flex;
 position: relative;
 min-width: 100%;
 width: fit-content;
 `), R("tabs-wrapper", `
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `), R("tabs-tab-wrapper", `
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `), R("tabs-tab", `
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [V("disabled", {
    cursor: "not-allowed"
  }), A("close", `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), A("label", `
 display: flex;
 align-items: center;
 `)]), R("tabs-bar", `
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `, [E("&.transition-disabled", `
 transition: none;
 `), V("disabled", `
 background-color: var(--n-tab-text-color-disabled)
 `)]), R("tabs-pane-wrapper", `
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `), R("tab-pane", `
 color: var(--n-pane-text-color);
 width: 100%;
 padding: var(--n-pane-padding);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `, [E("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active", `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `), E("&.next-transition-leave-active, &.prev-transition-leave-active", `
 position: absolute;
 `), E("&.next-transition-enter-from, &.prev-transition-leave-to", `
 transform: translateX(32px);
 opacity: 0;
 `), E("&.next-transition-leave-to, &.prev-transition-enter-from", `
 transform: translateX(-32px);
 opacity: 0;
 `), E("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to", `
 transform: translateX(0);
 opacity: 1;
 `)]), R("tabs-tab-pad", `
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `), V("line-type, bar-type", [R("tabs-tab", `
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `, [E("&:hover", {
    color: "var(--n-tab-text-color-hover)"
  }), V("active", `
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `), V("disabled", {
    color: "var(--n-tab-text-color-disabled)"
  })])]), R("tabs-nav", [V("line-type", [A("prefix, suffix", `
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `), R("tabs-nav-scroll-content", `
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `), R("tabs-bar", `
 border-radius: 0;
 bottom: -1px;
 `)]), V("card-type", [A("prefix, suffix", `
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `), R("tabs-pad", `
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `), R("tabs-tab-pad", `
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `), R("tabs-tab", `
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `, [V("addable", `
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `, [A("height-placeholder", `
 width: 0;
 font-size: var(--n-tab-font-size);
 `), nt("disabled", [E("&:hover", `
 color: var(--n-tab-text-color-hover);
 `)])]), V("closable", "padding-right: 6px;"), V("active", `
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `), V("disabled", "color: var(--n-tab-text-color-disabled);")]), R("tabs-scroll-padding", "border-bottom: 1px solid var(--n-tab-border-color);")]), V("left, right", [R("tabs-wrapper", `
 flex-direction: column;
 `, [R("tabs-tab-wrapper", `
 flex-direction: column;
 `, [R("tabs-tab-pad", `
 height: var(--n-tab-gap);
 width: 100%;
 `)])]), R("tabs-nav-scroll-content", `
 border-bottom: none;
 `)]), V("left", [R("tabs-nav-scroll-content", `
 box-sizing: border-box;
 border-right: 1px solid var(--n-tab-border-color);
 `)]), V("right", [R("tabs-nav-scroll-content", `
 border-left: 1px solid var(--n-tab-border-color);
 `)]), V("bottom", [R("tabs-nav-scroll-content", `
 border-top: 1px solid var(--n-tab-border-color);
 border-bottom: none;
 `)])])]), mS = Object.assign(Object.assign({}, De.props), {
    value: [String, Number],
    defaultValue: [String, Number],
    trigger: {
      type: String,
      default: "click"
    },
    type: {
      type: String,
      default: "bar"
    },
    closable: Boolean,
    justifyContent: String,
    size: {
      type: String,
      default: "medium"
    },
    placement: {
      type: String,
      default: "top"
    },
    tabStyle: [String, Object],
    barWidth: Number,
    paneClass: String,
    paneStyle: [String, Object],
    addable: [Boolean, Object],
    tabsPadding: {
      type: Number,
      default: 0
    },
    animated: Boolean,
    onBeforeLeave: Function,
    onAdd: Function,
    "onUpdate:value": [Function, Array],
    onUpdateValue: [Function, Array],
    onClose: [Function, Array],
    // deprecated
    labelSize: String,
    activeName: [String, Number],
    onActiveNameChange: [Function, Array]
  }), bS = ie({
    name: "Tabs",
    props: mS,
    setup(e, { slots: t }) {
      var o, r, n, i;
      process.env.NODE_ENV !== "production" && Ge(() => {
        e.labelSize !== void 0 && bt("tabs", "`label-size` is deprecated, please use `size` instead."), e.activeName !== void 0 && bt("tabs", "`active-name` is deprecated, please use `value` instead."), e.onActiveNameChange !== void 0 && bt("tabs", "`on-active-name-change` is deprecated, please use `on-update:value` instead.");
      });
      const { mergedClsPrefixRef: a, inlineThemeDisabled: l } = gt(e), s = De("Tabs", "-tabs", vS, x2, e, a), c = H(null), d = H(null), f = H(null), g = H(null), v = H(null), p = H(!0), b = H(!0), x = oi(e, ["labelSize", "size"]), m = oi(e, ["activeName", "value"]), C = H((r = (o = m.value) !== null && o !== void 0 ? o : e.defaultValue) !== null && r !== void 0 ? r : t.default ? (i = (n = ao(t.default())[0]) === null || n === void 0 ? void 0 : n.props) === null || i === void 0 ? void 0 : i.name : null), D = hn(m, C), I = { id: 0 }, z = k(() => {
        if (!(!e.justifyContent || e.type === "card"))
          return {
            display: "flex",
            justifyContent: e.justifyContent
          };
      });
      ke(D, () => {
        I.id = 0, y(), S();
      });
      function $() {
        var _;
        const { value: W } = D;
        return W === null ? null : (_ = c.value) === null || _ === void 0 ? void 0 : _.querySelector(`[data-name="${W}"]`);
      }
      function h(_) {
        if (e.type === "card")
          return;
        const { value: W } = d;
        if (W && _) {
          const J = `${a.value}-tabs-bar--disabled`, { barWidth: oe, placement: ce } = e;
          if (_.dataset.disabled === "true" ? W.classList.add(J) : W.classList.remove(J), ["top", "bottom"].includes(ce)) {
            if (P(["top", "maxHeight", "height"]), typeof oe == "number" && _.offsetWidth >= oe) {
              const pe = Math.floor((_.offsetWidth - oe) / 2) + _.offsetLeft;
              W.style.left = `${pe}px`, W.style.maxWidth = `${oe}px`;
            } else
              W.style.left = `${_.offsetLeft}px`, W.style.maxWidth = `${_.offsetWidth}px`;
            W.style.width = "8192px", W.offsetWidth;
          } else {
            if (P(["left", "maxWidth", "width"]), typeof oe == "number" && _.offsetHeight >= oe) {
              const pe = Math.floor((_.offsetHeight - oe) / 2) + _.offsetTop;
              W.style.top = `${pe}px`, W.style.maxHeight = `${oe}px`;
            } else
              W.style.top = `${_.offsetTop}px`, W.style.maxHeight = `${_.offsetHeight}px`;
            W.style.height = "8192px", W.offsetHeight;
          }
        }
      }
      function P(_) {
        const { value: W } = d;
        if (W)
          for (const J of _)
            W.style[J] = "";
      }
      function y() {
        if (e.type === "card")
          return;
        const _ = $();
        _ && h(_);
      }
      function S(_) {
        var W;
        const J = (W = v.value) === null || W === void 0 ? void 0 : W.$el;
        if (!J)
          return;
        const oe = $();
        if (!oe)
          return;
        const { scrollLeft: ce, offsetWidth: pe } = J, { offsetLeft: qe, offsetWidth: Et } = oe;
        ce > qe ? J.scrollTo({
          top: 0,
          left: qe,
          behavior: "smooth"
        }) : qe + Et > ce + pe && J.scrollTo({
          top: 0,
          left: qe + Et - pe,
          behavior: "smooth"
        });
      }
      const T = H(null);
      let M = 0, L = null;
      function O(_) {
        const W = T.value;
        if (W) {
          M = _.getBoundingClientRect().height;
          const J = `${M}px`, oe = () => {
            W.style.height = J, W.style.maxHeight = J;
          };
          L ? (oe(), L(), L = null) : L = oe;
        }
      }
      function N(_) {
        const W = T.value;
        if (W) {
          const J = _.getBoundingClientRect().height, oe = () => {
            document.body.offsetHeight, W.style.maxHeight = `${J}px`, W.style.height = `${Math.max(M, J)}px`;
          };
          L ? (L(), L = null, oe()) : L = oe;
        }
      }
      function q() {
        const _ = T.value;
        _ && (_.style.maxHeight = "", _.style.height = "");
      }
      const Y = { value: [] }, Q = H("next");
      function fe(_) {
        const W = D.value;
        let J = "next";
        for (const oe of Y.value) {
          if (oe === W)
            break;
          if (oe === _) {
            J = "prev";
            break;
          }
        }
        Q.value = J, be(_);
      }
      function be(_) {
        const { onActiveNameChange: W, onUpdateValue: J, "onUpdate:value": oe } = e;
        W && xe(W, _), J && xe(J, _), oe && xe(oe, _), C.value = _;
      }
      function Ie(_) {
        const { onClose: W } = e;
        W && xe(W, _);
      }
      function Fe() {
        const { value: _ } = d;
        if (!_)
          return;
        const W = "transition-disabled";
        _.classList.add(W), y(), _.classList.remove(W);
      }
      let ct = 0;
      function Te(_) {
        var W;
        if (_.contentRect.width === 0 && _.contentRect.height === 0 || ct === _.contentRect.width)
          return;
        ct = _.contentRect.width;
        const { type: J } = e;
        (J === "line" || J === "bar") && Fe(), J !== "segment" && Xe((W = v.value) === null || W === void 0 ? void 0 : W.$el);
      }
      const Me = Hn(Te, 64);
      ke([() => e.justifyContent, () => e.size], () => {
        Rt(() => {
          const { type: _ } = e;
          (_ === "line" || _ === "bar") && Fe();
        });
      });
      const ge = H(!1);
      function rt(_) {
        var W;
        const { target: J, contentRect: { width: oe } } = _, ce = J.parentElement.offsetWidth;
        if (!ge.value)
          ce < oe && (ge.value = !0);
        else {
          const { value: pe } = g;
          if (!pe)
            return;
          ce - oe > pe.$el.offsetWidth && (ge.value = !1);
        }
        Xe((W = v.value) === null || W === void 0 ? void 0 : W.$el);
      }
      const $t = Hn(rt, 64);
      function de() {
        const { onAdd: _ } = e;
        _ && _(), Rt(() => {
          const W = $(), { value: J } = v;
          !W || !J || J.scrollTo({
            left: W.offsetLeft,
            top: 0,
            behavior: "smooth"
          });
        });
      }
      function Xe(_) {
        if (!_)
          return;
        const { scrollLeft: W, scrollWidth: J, offsetWidth: oe } = _;
        p.value = W <= 0, b.value = W + oe >= J;
      }
      const We = Hn((_) => {
        Xe(_.target);
      }, 64);
      lt(ji, {
        triggerRef: se(e, "trigger"),
        tabStyleRef: se(e, "tabStyle"),
        paneClassRef: se(e, "paneClass"),
        paneStyleRef: se(e, "paneStyle"),
        mergedClsPrefixRef: a,
        typeRef: se(e, "type"),
        closableRef: se(e, "closable"),
        valueRef: D,
        tabChangeIdRef: I,
        onBeforeLeaveRef: se(e, "onBeforeLeave"),
        activateTab: fe,
        handleClose: Ie,
        handleAdd: de
      }), Nl(() => {
        y(), S();
      }), Ge(() => {
        const { value: _ } = f;
        if (!_ || ["left", "right"].includes(e.placement))
          return;
        const { value: W } = a, J = `${W}-tabs-nav-scroll-wrapper--shadow-before`, oe = `${W}-tabs-nav-scroll-wrapper--shadow-after`;
        p.value ? _.classList.remove(J) : _.classList.add(J), b.value ? _.classList.remove(oe) : _.classList.add(oe);
      });
      const U = H(null);
      ke(D, () => {
        if (e.type === "segment") {
          const _ = U.value;
          _ && Rt(() => {
            _.classList.add("transition-disabled"), _.offsetWidth, _.classList.remove("transition-disabled");
          });
        }
      });
      const ne = {
        syncBarPosition: () => {
          y();
        }
      }, Z = k(() => {
        const { value: _ } = x, { type: W } = e, J = {
          card: "Card",
          bar: "Bar",
          line: "Line",
          segment: "Segment"
        }[W], oe = `${_}${J}`, { self: { barColor: ce, closeIconColor: pe, closeIconColorHover: qe, closeIconColorPressed: Et, tabColor: Je, tabBorderColor: Co, paneTextColor: Jo, tabFontWeight: yo, tabBorderRadius: wo, tabFontWeightActive: Qo, colorSegment: qt, fontWeightStrong: Yt, tabColorSegment: er, closeSize: So, closeIconSize: Pt, closeColorHover: $o, closeColorPressed: F, closeBorderRadius: K, [ee("panePadding", _)]: le, [ee("tabPadding", oe)]: me, [ee("tabPaddingVertical", oe)]: Re, [ee("tabGap", oe)]: Ae, [ee("tabTextColor", W)]: Ye, [ee("tabTextColorActive", W)]: Ce, [ee("tabTextColorHover", W)]: Qe, [ee("tabTextColorDisabled", W)]: _t, [ee("tabFontSize", _)]: Po }, common: { cubicBezierEaseInOut: To } } = s.value;
        return {
          "--n-bezier": To,
          "--n-color-segment": qt,
          "--n-bar-color": ce,
          "--n-tab-font-size": Po,
          "--n-tab-text-color": Ye,
          "--n-tab-text-color-active": Ce,
          "--n-tab-text-color-disabled": _t,
          "--n-tab-text-color-hover": Qe,
          "--n-pane-text-color": Jo,
          "--n-tab-border-color": Co,
          "--n-tab-border-radius": wo,
          "--n-close-size": So,
          "--n-close-icon-size": Pt,
          "--n-close-color-hover": $o,
          "--n-close-color-pressed": F,
          "--n-close-border-radius": K,
          "--n-close-icon-color": pe,
          "--n-close-icon-color-hover": qe,
          "--n-close-icon-color-pressed": Et,
          "--n-tab-color": Je,
          "--n-tab-font-weight": yo,
          "--n-tab-font-weight-active": Qo,
          "--n-tab-padding": me,
          "--n-tab-padding-vertical": Re,
          "--n-tab-gap": Ae,
          "--n-pane-padding": le,
          "--n-font-weight-strong": Yt,
          "--n-tab-color-segment": er
        };
      }), ue = l ? Ft("tabs", k(() => `${x.value[0]}${e.type[0]}`), Z, e) : void 0;
      return Object.assign({
        mergedClsPrefix: a,
        mergedValue: D,
        renderedNames: /* @__PURE__ */ new Set(),
        tabsRailElRef: U,
        tabsPaneWrapperRef: T,
        tabsElRef: c,
        barElRef: d,
        addTabInstRef: g,
        xScrollInstRef: v,
        scrollWrapperElRef: f,
        addTabFixed: ge,
        tabWrapperStyle: z,
        handleNavResize: Me,
        mergedSize: x,
        handleScroll: We,
        handleTabsResize: $t,
        cssVars: l ? void 0 : Z,
        themeClass: ue == null ? void 0 : ue.themeClass,
        animationDirection: Q,
        renderNameListRef: Y,
        onAnimationBeforeLeave: O,
        onAnimationEnter: N,
        onAnimationAfterEnter: q,
        onRender: ue == null ? void 0 : ue.onRender
      }, ne);
    },
    render() {
      const { mergedClsPrefix: e, type: t, placement: o, addTabFixed: r, addable: n, mergedSize: i, renderNameListRef: a, onRender: l, $slots: { default: s, prefix: c, suffix: d } } = this;
      l == null || l();
      const f = s ? ao(s()).filter((C) => C.type.__TAB_PANE__ === !0) : [], g = s ? ao(s()).filter((C) => C.type.__TAB__ === !0) : [], v = !g.length, p = t === "card", b = t === "segment", x = !p && !b && this.justifyContent;
      a.value = [];
      const m = () => {
        const C = u(
          "div",
          { style: this.tabWrapperStyle, class: [`${e}-tabs-wrapper`] },
          x ? null : u("div", { class: `${e}-tabs-scroll-padding`, style: { width: `${this.tabsPadding}px` } }),
          v ? f.map((D, I) => (a.value.push(D.props.name), Gn(u(vi, Object.assign({}, D.props, { internalCreatedByPane: !0, internalLeftPadded: I !== 0 && (!x || x === "center" || x === "start" || x === "end") }), D.children ? {
            default: D.children.tab
          } : void 0)))) : g.map((D, I) => (a.value.push(D.props.name), Gn(I !== 0 && !x ? ul(D) : D))),
          !r && n && p ? dl(n, (v ? f.length : g.length) !== 0) : null,
          x ? null : u("div", { class: `${e}-tabs-scroll-padding`, style: { width: `${this.tabsPadding}px` } })
        );
        return u(
          "div",
          { ref: "tabsElRef", class: `${e}-tabs-nav-scroll-content` },
          p && n ? u(jo, { onResize: this.handleTabsResize }, {
            default: () => C
          }) : C,
          p ? u("div", { class: `${e}-tabs-pad` }) : null,
          p ? null : u("div", { ref: "barElRef", class: `${e}-tabs-bar` })
        );
      };
      return u(
        "div",
        { class: [
          `${e}-tabs`,
          this.themeClass,
          `${e}-tabs--${t}-type`,
          `${e}-tabs--${i}-size`,
          x && `${e}-tabs--flex`,
          `${e}-tabs--${o}`
        ], style: this.cssVars },
        u(
          "div",
          { class: [
            // the class should be applied here since it's possible
            // to make tabs nested in tabs, style may influence each
            // other. adding a class will make it easy to write the
            // style.
            `${e}-tabs-nav--${t}-type`,
            `${e}-tabs-nav--${o}`,
            `${e}-tabs-nav`
          ] },
          Ct(c, (C) => C && u("div", { class: `${e}-tabs-nav__prefix` }, C)),
          b ? u("div", { class: `${e}-tabs-rail`, ref: "tabsRailElRef" }, v ? f.map((C, D) => (a.value.push(C.props.name), u(vi, Object.assign({}, C.props, { internalCreatedByPane: !0, internalLeftPadded: D !== 0 }), C.children ? {
            default: C.children.tab
          } : void 0))) : g.map((C, D) => (a.value.push(C.props.name), D === 0 ? C : ul(C)))) : u(jo, { onResize: this.handleNavResize }, {
            default: () => u("div", { class: `${e}-tabs-nav-scroll-wrapper`, ref: "scrollWrapperElRef" }, ["top", "bottom"].includes(o) ? u(yp, { ref: "xScrollInstRef", onScroll: this.handleScroll }, {
              default: m
            }) : u("div", { class: `${e}-tabs-nav-y-scroll` }, m()))
          }),
          r && n && p ? dl(n, !0) : null,
          Ct(d, (C) => C && u("div", { class: `${e}-tabs-nav__suffix` }, C))
        ),
        v && (this.animated ? u("div", { ref: "tabsPaneWrapperRef", class: `${e}-tabs-pane-wrapper` }, cl(f, this.mergedValue, this.renderedNames, this.onAnimationBeforeLeave, this.onAnimationEnter, this.onAnimationAfterEnter, this.animationDirection)) : cl(f, this.mergedValue, this.renderedNames))
      );
    }
  });
  function cl(e, t, o, r, n, i, a) {
    const l = [];
    return e.forEach((s) => {
      const { name: c, displayDirective: d, "display-directive": f } = s.props, g = (p) => d === p || f === p, v = t === c;
      if (s.key !== void 0 && (s.key = c), v || g("show") || g("show:lazy") && o.has(c)) {
        o.has(c) || o.add(c);
        const p = !g("if");
        l.push(p ? co(s, [[Ir, v]]) : s);
      }
    }), a ? u(Cl, { name: `${a}-transition`, onBeforeLeave: r, onEnter: n, onAfterEnter: i }, { default: () => l }) : l;
  }
  function dl(e, t) {
    return u(vi, { ref: "addTabInstRef", key: "__addable", name: "__addable", internalCreatedByPane: !0, internalAddable: !0, internalLeftPadded: t, disabled: typeof e == "object" && e.disabled });
  }
  function ul(e) {
    const t = en(e);
    return t.props ? t.props.internalLeftPadded = !0 : t.props = {
      internalLeftPadded: !0
    }, t;
  }
  function Gn(e) {
    return Array.isArray(e.dynamicProps) ? e.dynamicProps.includes("internalLeftPadded") || e.dynamicProps.push("internalLeftPadded") : e.dynamicProps = ["internalLeftPadded"], e;
  }
  const xS = R("h", `
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [E("&:first-child", {
    marginTop: 0
  }), V("prefix-bar", {
    position: "relative",
    paddingLeft: "var(--n-prefix-width)"
  }, [V("align-text", {
    paddingLeft: 0
  }, [E("&::before", {
    left: "calc(-1 * var(--n-prefix-width))"
  })]), E("&::before", `
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `), E("&::before", {
    backgroundColor: "var(--n-bar-color)"
  })])]), CS = Object.assign(Object.assign({}, De.props), { type: {
    type: String,
    default: "default"
  }, prefix: String, alignText: Boolean }), Zo = (e) => ie({
    name: `H${e}`,
    props: CS,
    setup(t) {
      const { mergedClsPrefixRef: o, inlineThemeDisabled: r } = gt(t), n = De("Typography", "-h", xS, H2, t, o), i = k(() => {
        const { type: l } = t, { common: { cubicBezierEaseInOut: s }, self: { headerFontWeight: c, headerTextColor: d, [ee("headerPrefixWidth", e)]: f, [ee("headerFontSize", e)]: g, [ee("headerMargin", e)]: v, [ee("headerBarWidth", e)]: p, [ee("headerBarColor", l)]: b } } = n.value;
        return {
          "--n-bezier": s,
          "--n-font-size": g,
          "--n-margin": v,
          "--n-bar-color": b,
          "--n-bar-width": p,
          "--n-font-weight": c,
          "--n-text-color": d,
          "--n-prefix-width": f
        };
      }), a = r ? Ft(`h${e}`, k(() => t.type[0]), i, t) : void 0;
      return {
        mergedClsPrefix: o,
        cssVars: r ? void 0 : i,
        themeClass: a == null ? void 0 : a.themeClass,
        onRender: a == null ? void 0 : a.onRender
      };
    },
    render() {
      var t;
      const { prefix: o, alignText: r, mergedClsPrefix: n, cssVars: i, $slots: a } = this;
      return (t = this.onRender) === null || t === void 0 || t.call(this), u(`h${e}`, {
        class: [
          `${n}-h`,
          `${n}-h${e}`,
          this.themeClass,
          {
            [`${n}-h--prefix-bar`]: o,
            [`${n}-h--align-text`]: r
          }
        ],
        style: i
      }, a);
    }
  });
  Zo("1");
  Zo("2");
  const fl = Zo("3"), Xr = Zo("4");
  Zo("5");
  Zo("6");
  const Ko = "n-upload", qc = "__UPLOAD_DRAGGER__", yS = ie({
    name: "UploadDragger",
    [qc]: !0,
    setup(e, { slots: t }) {
      const o = ve(Ko, null);
      return o || po("upload-dragger", "`n-upload-dragger` must be placed inside `n-upload`."), () => {
        const { mergedClsPrefixRef: { value: r }, mergedDisabledRef: { value: n }, maxReachedRef: { value: i } } = o;
        return u("div", { class: [
          `${r}-upload-dragger`,
          (n || i) && `${r}-upload-dragger--disabled`
        ] }, t);
      };
    }
  });
  var Yc = globalThis && globalThis.__awaiter || function(e, t, o, r) {
    function n(i) {
      return i instanceof o ? i : new o(function(a) {
        a(i);
      });
    }
    return new (o || (o = Promise))(function(i, a) {
      function l(d) {
        try {
          c(r.next(d));
        } catch (f) {
          a(f);
        }
      }
      function s(d) {
        try {
          c(r.throw(d));
        } catch (f) {
          a(f);
        }
      }
      function c(d) {
        d.done ? i(d.value) : n(d.value).then(l, s);
      }
      c((r = r.apply(e, t || [])).next());
    });
  };
  const Zc = (e) => e.includes("image/"), pl = (e = "") => {
    const t = e.split("/"), r = t[t.length - 1].split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(r) || [""])[0];
  }, hl = /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i, Kc = (e) => {
    if (e.type)
      return Zc(e.type);
    const t = pl(e.name || "");
    if (hl.test(t))
      return !0;
    const o = e.thumbnailUrl || e.url || "", r = pl(o);
    return !!(/^data:image\//.test(o) || hl.test(r));
  };
  function wS(e) {
    return Yc(this, void 0, void 0, function* () {
      return yield new Promise((t) => {
        if (!e.type || !Zc(e.type)) {
          t("");
          return;
        }
        t(window.URL.createObjectURL(e));
      });
    });
  }
  const SS = ho && window.FileReader && window.File;
  function $S(e) {
    return e.isDirectory;
  }
  function PS(e) {
    return e.isFile;
  }
  function TS(e, t) {
    return Yc(this, void 0, void 0, function* () {
      const o = [];
      let r, n = 0;
      function i() {
        n++;
      }
      function a() {
        n--, n || r(o);
      }
      function l(s) {
        s.forEach((c) => {
          if (c) {
            if (i(), t && $S(c)) {
              const d = c.createReader();
              i(), d.readEntries((f) => {
                l(f), a();
              }, () => {
                a();
              });
            } else
              PS(c) && (i(), c.file((d) => {
                o.push({ file: d, entry: c, source: "dnd" }), a();
              }, () => {
                a();
              }));
            a();
          }
        });
      }
      return yield new Promise((s) => {
        r = s, l(e);
      }), o;
    });
  }
  function Rr(e) {
    const { id: t, name: o, percentage: r, status: n, url: i, file: a, thumbnailUrl: l, type: s, fullPath: c, batchId: d } = e;
    return {
      id: t,
      name: o,
      percentage: r ?? null,
      status: n,
      url: i ?? null,
      file: a ?? null,
      thumbnailUrl: l ?? null,
      type: s ?? null,
      fullPath: c ?? null,
      batchId: d ?? null
    };
  }
  function zS(e, t, o) {
    return e = e.toLowerCase(), t = t.toLocaleLowerCase(), o = o.toLocaleLowerCase(), o.split(",").map((n) => n.trim()).filter(Boolean).some((n) => {
      if (n.startsWith(".")) {
        if (e.endsWith(n))
          return !0;
      } else if (n.includes("/")) {
        const [i, a] = t.split("/"), [l, s] = n.split("/");
        if ((l === "*" || i && l && l === i) && (s === "*" || a && s && s === a))
          return !0;
      } else
        return !0;
      return !1;
    });
  }
  const RS = (e, t) => {
    if (!e)
      return;
    const o = document.createElement("a");
    o.href = e, t !== void 0 && (o.download = t), document.body.appendChild(o), o.click(), document.body.removeChild(o);
  }, Jc = ie({
    name: "UploadTrigger",
    props: {
      abstract: Boolean
    },
    setup(e, { slots: t }) {
      const o = ve(Ko, null);
      o || po("upload-trigger", "`n-upload-trigger` must be placed inside `n-upload`.");
      const { mergedClsPrefixRef: r, mergedDisabledRef: n, maxReachedRef: i, listTypeRef: a, dragOverRef: l, openOpenFileDialog: s, draggerInsideRef: c, handleFileAddition: d, mergedDirectoryDndRef: f, triggerStyleRef: g } = o, v = k(() => a.value === "image-card");
      function p() {
        n.value || i.value || s();
      }
      function b(D) {
        D.preventDefault(), l.value = !0;
      }
      function x(D) {
        D.preventDefault(), l.value = !0;
      }
      function m(D) {
        D.preventDefault(), l.value = !1;
      }
      function C(D) {
        var I;
        if (D.preventDefault(), !c.value || n.value || i.value) {
          l.value = !1;
          return;
        }
        const z = (I = D.dataTransfer) === null || I === void 0 ? void 0 : I.items;
        z != null && z.length ? TS(Array.from(z).map(($) => $.webkitGetAsEntry()), f.value).then(($) => {
          d($);
        }).finally(() => {
          l.value = !1;
        }) : l.value = !1;
      }
      return () => {
        var D;
        const { value: I } = r;
        return e.abstract ? (D = t.default) === null || D === void 0 ? void 0 : D.call(t, {
          handleClick: p,
          handleDrop: C,
          handleDragOver: b,
          handleDragEnter: x,
          handleDragLeave: m
        }) : u("div", { class: [
          `${I}-upload-trigger`,
          (n.value || i.value) && `${I}-upload-trigger--disabled`,
          v.value && `${I}-upload-trigger--image-card`
        ], style: g.value, onClick: p, onDrop: C, onDragover: b, onDragenter: x, onDragleave: m }, v.value ? u(yS, null, {
          default: () => Ao(t.default, () => [
            u($e, { clsPrefix: I }, { default: () => u(Qs, null) })
          ])
        }) : t);
      };
    }
  }), IS = ie({
    name: "UploadProgress",
    props: {
      show: Boolean,
      percentage: {
        type: Number,
        required: !0
      },
      status: {
        type: String,
        required: !0
      }
    },
    setup() {
      return {
        mergedTheme: ve(Ko).mergedThemeRef
      };
    },
    render() {
      return u(Ai, null, {
        default: () => this.show ? u(pS, { type: "line", showIndicator: !1, percentage: this.percentage, status: this.status, height: 2, theme: this.mergedTheme.peers.Progress, themeOverrides: this.mergedTheme.peerOverrides.Progress }) : null
      });
    }
  }), DS = u(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 28 28" },
    u(
      "g",
      { fill: "none" },
      u("path", { d: "M21.75 3A3.25 3.25 0 0 1 25 6.25v15.5A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V6.25A3.25 3.25 0 0 1 6.25 3h15.5zm.583 20.4l-7.807-7.68a.75.75 0 0 0-.968-.07l-.084.07l-7.808 7.68c.183.065.38.1.584.1h15.5c.204 0 .4-.035.583-.1l-7.807-7.68l7.807 7.68zM21.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v15.5c0 .208.036.408.103.593l7.82-7.692a2.25 2.25 0 0 1 3.026-.117l.129.117l7.82 7.692c.066-.185.102-.385.102-.593V6.25a1.75 1.75 0 0 0-1.75-1.75zm-3.25 3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zm0 1.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2z", fill: "currentColor" })
    )
  ), ES = u(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 28 28" },
    u(
      "g",
      { fill: "none" },
      u("path", { d: "M6.4 2A2.4 2.4 0 0 0 4 4.4v19.2A2.4 2.4 0 0 0 6.4 26h15.2a2.4 2.4 0 0 0 2.4-2.4V11.578c0-.729-.29-1.428-.805-1.944l-6.931-6.931A2.4 2.4 0 0 0 14.567 2H6.4zm-.9 2.4a.9.9 0 0 1 .9-.9H14V10a2 2 0 0 0 2 2h6.5v11.6a.9.9 0 0 1-.9.9H6.4a.9.9 0 0 1-.9-.9V4.4zm16.44 6.1H16a.5.5 0 0 1-.5-.5V4.06l6.44 6.44z", fill: "currentColor" })
    )
  );
  var _S = globalThis && globalThis.__awaiter || function(e, t, o, r) {
    function n(i) {
      return i instanceof o ? i : new o(function(a) {
        a(i);
      });
    }
    return new (o || (o = Promise))(function(i, a) {
      function l(d) {
        try {
          c(r.next(d));
        } catch (f) {
          a(f);
        }
      }
      function s(d) {
        try {
          c(r.throw(d));
        } catch (f) {
          a(f);
        }
      }
      function c(d) {
        d.done ? i(d.value) : n(d.value).then(l, s);
      }
      c((r = r.apply(e, t || [])).next());
    });
  };
  const qr = {
    paddingMedium: "0 3px",
    heightMedium: "24px",
    iconSizeMedium: "18px"
  }, BS = ie({
    name: "UploadFile",
    props: {
      clsPrefix: {
        type: String,
        required: !0
      },
      file: {
        type: Object,
        required: !0
      },
      listType: {
        type: String,
        required: !0
      }
    },
    setup(e) {
      const t = ve(Ko), o = H(null), r = H(""), n = k(() => {
        const { file: z } = e;
        return z.status === "finished" ? "success" : z.status === "error" ? "error" : "info";
      }), i = k(() => {
        const { file: z } = e;
        if (z.status === "error")
          return "error";
      }), a = k(() => {
        const { file: z } = e;
        return z.status === "uploading";
      }), l = k(() => {
        if (!t.showCancelButtonRef.value)
          return !1;
        const { file: z } = e;
        return ["uploading", "pending", "error"].includes(z.status);
      }), s = k(() => {
        if (!t.showRemoveButtonRef.value)
          return !1;
        const { file: z } = e;
        return ["finished"].includes(z.status);
      }), c = k(() => {
        if (!t.showDownloadButtonRef.value)
          return !1;
        const { file: z } = e;
        return ["finished"].includes(z.status);
      }), d = k(() => {
        if (!t.showRetryButtonRef.value)
          return !1;
        const { file: z } = e;
        return ["error"].includes(z.status);
      }), f = Ze(() => r.value || e.file.thumbnailUrl || e.file.url), g = k(() => {
        if (!t.showPreviewButtonRef.value)
          return !1;
        const { file: { status: z }, listType: $ } = e;
        return ["finished"].includes(z) && f.value && $ === "image-card";
      });
      function v() {
        t.submit(e.file.id);
      }
      function p(z) {
        z.preventDefault();
        const { file: $ } = e;
        ["finished", "pending", "error"].includes($.status) ? x($) : ["uploading"].includes($.status) ? C($) : yr("upload", "The button clicked type is unknown.");
      }
      function b(z) {
        z.preventDefault(), m(e.file);
      }
      function x(z) {
        const { xhrMap: $, doChange: h, onRemoveRef: { value: P }, mergedFileListRef: { value: y } } = t;
        Promise.resolve(P ? P({
          file: Object.assign({}, z),
          fileList: y
        }) : !0).then((S) => {
          if (S === !1)
            return;
          const T = Object.assign({}, z, {
            status: "removed"
          });
          $.delete(z.id), h(T, void 0, {
            remove: !0
          });
        });
      }
      function m(z) {
        const { onDownloadRef: { value: $ } } = t;
        Promise.resolve($ ? $(Object.assign({}, z)) : !0).then((h) => {
          h !== !1 && RS(z.url, z.name);
        });
      }
      function C(z) {
        const { xhrMap: $ } = t, h = $.get(z.id);
        h == null || h.abort(), x(Object.assign({}, z));
      }
      function D() {
        const { onPreviewRef: { value: z } } = t;
        if (z)
          z(e.file);
        else if (e.listType === "image-card") {
          const { value: $ } = o;
          if (!$)
            return;
          $.click();
        }
      }
      const I = () => _S(this, void 0, void 0, function* () {
        const { listType: z } = e;
        z !== "image" && z !== "image-card" || t.shouldUseThumbnailUrlRef.value(e.file) && (r.value = yield t.getFileThumbnailUrlResolver(e.file));
      });
      return Ge(() => {
        I();
      }), {
        mergedTheme: t.mergedThemeRef,
        progressStatus: n,
        buttonType: i,
        showProgress: a,
        disabled: t.mergedDisabledRef,
        showCancelButton: l,
        showRemoveButton: s,
        showDownloadButton: c,
        showRetryButton: d,
        showPreviewButton: g,
        mergedThumbnailUrl: f,
        shouldUseThumbnailUrl: t.shouldUseThumbnailUrlRef,
        renderIcon: t.renderIconRef,
        imageRef: o,
        handleRemoveOrCancelClick: p,
        handleDownloadClick: b,
        handleRetryClick: v,
        handlePreviewClick: D
      };
    },
    render() {
      const { clsPrefix: e, mergedTheme: t, listType: o, file: r, renderIcon: n } = this;
      let i;
      const a = o === "image";
      a || o === "image-card" ? i = !this.shouldUseThumbnailUrl(r) || !this.mergedThumbnailUrl ? u("span", { class: `${e}-upload-file-info__thumbnail` }, n ? n(r) : Kc(r) ? u($e, { clsPrefix: e }, { default: () => DS }) : u($e, { clsPrefix: e }, { default: () => ES })) : u("a", { rel: "noopener noreferer", target: "_blank", href: r.url || void 0, class: `${e}-upload-file-info__thumbnail`, onClick: this.handlePreviewClick }, o === "image-card" ? u(oS, { src: this.mergedThumbnailUrl || void 0, previewSrc: r.url || void 0, alt: r.name, ref: "imageRef" }) : u("img", { src: this.mergedThumbnailUrl || void 0, alt: r.name })) : i = u("span", { class: `${e}-upload-file-info__thumbnail` }, n ? n(r) : u($e, { clsPrefix: e }, { default: () => u(x1, null) }));
      const s = u(IS, { show: this.showProgress, percentage: r.percentage || 0, status: this.progressStatus }), c = o === "text" || o === "image";
      return u(
        "div",
        { class: [
          `${e}-upload-file`,
          `${e}-upload-file--${this.progressStatus}-status`,
          r.url && r.status !== "error" && o !== "image-card" && `${e}-upload-file--with-url`,
          `${e}-upload-file--${o}-type`
        ] },
        u(
          "div",
          { class: `${e}-upload-file-info` },
          i,
          u(
            "div",
            { class: `${e}-upload-file-info__name` },
            c && (r.url && r.status !== "error" ? u("a", { rel: "noopener noreferer", target: "_blank", href: r.url || void 0, onClick: this.handlePreviewClick }, r.name) : u("span", { onClick: this.handlePreviewClick }, r.name)),
            a && s
          ),
          u(
            "div",
            { class: [
              `${e}-upload-file-info__action`,
              `${e}-upload-file-info__action--${o}-type`
            ] },
            this.showPreviewButton ? u(Vr, { key: "preview", quaternary: !0, type: this.buttonType, onClick: this.handlePreviewClick, theme: t.peers.Button, themeOverrides: t.peerOverrides.Button, builtinThemeOverrides: qr }, {
              icon: () => u($e, { clsPrefix: e }, { default: () => u(ec, null) })
            }) : null,
            (this.showRemoveButton || this.showCancelButton) && !this.disabled && u(Vr, { key: "cancelOrTrash", theme: t.peers.Button, themeOverrides: t.peerOverrides.Button, quaternary: !0, builtinThemeOverrides: qr, type: this.buttonType, onClick: this.handleRemoveOrCancelClick }, {
              icon: () => u(yn, null, {
                default: () => this.showRemoveButton ? u($e, { clsPrefix: e, key: "trash" }, { default: () => u(w1, null) }) : u($e, { clsPrefix: e, key: "cancel" }, { default: () => u($1, null) })
              })
            }),
            this.showRetryButton && !this.disabled && u(Vr, { key: "retry", quaternary: !0, type: this.buttonType, onClick: this.handleRetryClick, theme: t.peers.Button, themeOverrides: t.peerOverrides.Button, builtinThemeOverrides: qr }, {
              icon: () => u($e, { clsPrefix: e }, { default: () => u(z1, null) })
            }),
            this.showDownloadButton ? u(Vr, { key: "download", quaternary: !0, type: this.buttonType, onClick: this.handleDownloadClick, theme: t.peers.Button, themeOverrides: t.peerOverrides.Button, builtinThemeOverrides: qr }, {
              icon: () => u($e, { clsPrefix: e }, { default: () => u(S1, null) })
            }) : null
          )
        ),
        !a && s
      );
    }
  }), kS = ie({
    name: "UploadFileList",
    setup(e, { slots: t }) {
      const o = ve(Ko, null);
      o || po("upload-file-list", "`n-upload-file-list` must be placed inside `n-upload`.");
      const { abstractRef: r, mergedClsPrefixRef: n, listTypeRef: i, mergedFileListRef: a, fileListStyleRef: l, cssVarsRef: s, themeClassRef: c, maxReachedRef: d, showTriggerRef: f, imageGroupPropsRef: g } = o, v = k(() => i.value === "image-card"), p = () => a.value.map((x) => u(BS, { clsPrefix: n.value, key: x.id, file: x, listType: i.value })), b = () => v.value ? u(eS, Object.assign({}, g.value), { default: p }) : u(Ai, { group: !0 }, {
        default: p
      });
      return () => {
        const { value: x } = n, { value: m } = r;
        return u(
          "div",
          { class: [
            `${x}-upload-file-list`,
            v.value && `${x}-upload-file-list--grid`,
            m ? c == null ? void 0 : c.value : void 0
          ], style: [
            m && s ? s.value : "",
            l.value
          ] },
          b(),
          f.value && !d.value && v.value && u(Jc, null, t)
        );
      };
    }
  }), OS = E([R("upload", "width: 100%;", [V("dragger-inside", [R("upload-trigger", `
 display: block;
 `)]), V("drag-over", [R("upload-dragger", `
 border: var(--n-dragger-border-hover);
 `)])]), R("upload-dragger", `
 cursor: pointer;
 box-sizing: border-box;
 width: 100%;
 text-align: center;
 border-radius: var(--n-border-radius);
 padding: 24px;
 opacity: 1;
 transition:
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-dragger-color);
 border: var(--n-dragger-border);
 `, [E("&:hover", `
 border: var(--n-dragger-border-hover);
 `), V("disabled", `
 cursor: not-allowed;
 `)]), R("upload-trigger", `
 display: inline-block;
 box-sizing: border-box;
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `, [E("+", [R("upload-file-list", "margin-top: 8px;")]), V("disabled", `
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `), V("image-card", `
 width: 96px;
 height: 96px;
 `, [R("base-icon", `
 font-size: 24px;
 `), R("upload-dragger", `
 padding: 0;
 height: 100%;
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `)])]), R("upload-file-list", `
 line-height: var(--n-line-height);
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `, [E("a, img", "outline: none;"), V("disabled", `
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `, [R("upload-file", "cursor: not-allowed;")]), V("grid", `
 display: grid;
 grid-template-columns: repeat(auto-fill, 96px);
 grid-gap: 8px;
 margin-top: 0;
 `), R("upload-file", `
 display: block;
 box-sizing: border-box;
 cursor: default;
 padding: 0px 12px 0 6px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `, [il(), R("progress", [il({
    foldPadding: !0
  })]), E("&:hover", `
 background-color: var(--n-item-color-hover);
 `, [R("upload-file-info", [A("action", `
 opacity: 1;
 `)])]), V("image-type", `
 border-radius: var(--n-border-radius);
 text-decoration: underline;
 text-decoration-color: #0000;
 `, [R("upload-file-info", `
 padding-top: 0px;
 padding-bottom: 0px;
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 6px 0;
 `, [R("progress", `
 padding: 2px 0;
 margin-bottom: 0;
 `), A("name", `
 padding: 0 8px;
 `), A("thumbnail", `
 width: 32px;
 height: 32px;
 font-size: 28px;
 display: flex;
 justify-content: center;
 align-items: center;
 `, [E("img", `
 width: 100%;
 `)])])]), V("text-type", [R("progress", `
 box-sizing: border-box;
 padding-bottom: 6px;
 margin-bottom: 6px;
 `)]), V("image-card-type", `
 position: relative;
 width: 96px;
 height: 96px;
 border: var(--n-item-border-image-card);
 border-radius: var(--n-border-radius);
 padding: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: border-color .3s var(--n-bezier), background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 overflow: hidden;
 `, [R("progress", `
 position: absolute;
 left: 8px;
 bottom: 8px;
 right: 8px;
 width: unset;
 `), R("upload-file-info", `
 padding: 0;
 width: 100%;
 height: 100%;
 `, [A("thumbnail", `
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 font-size: 36px;
 `, [E("img", `
 width: 100%;
 `)])]), E("&::before", `
 position: absolute;
 z-index: 1;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 opacity: 0;
 transition: opacity .2s var(--n-bezier);
 content: "";
 `), E("&:hover", [E("&::before", "opacity: 1;"), R("upload-file-info", [A("thumbnail", "opacity: .12;")])])]), V("error-status", [E("&:hover", `
 background-color: var(--n-item-color-hover-error);
 `), R("upload-file-info", [A("name", "color: var(--n-item-text-color-error);"), A("thumbnail", "color: var(--n-item-text-color-error);")]), V("image-card-type", `
 border: var(--n-item-border-image-card-error);
 `)]), V("with-url", `
 cursor: pointer;
 `, [R("upload-file-info", [A("name", `
 color: var(--n-item-text-color-success);
 text-decoration-color: var(--n-item-text-color-success);
 `, [E("a", `
 text-decoration: underline;
 `)])])]), R("upload-file-info", `
 position: relative;
 padding-top: 6px;
 padding-bottom: 6px;
 display: flex;
 flex-wrap: nowrap;
 `, [A("thumbnail", `
 font-size: 18px;
 opacity: 1;
 transition: opacity .2s var(--n-bezier);
 color: var(--n-item-icon-color);
 `, [R("base-icon", `
 margin-right: 2px;
 vertical-align: middle;
 transition: color .3s var(--n-bezier);
 `)]), A("action", `
 padding-top: inherit;
 padding-bottom: inherit;
 position: absolute;
 right: 0;
 top: 0;
 bottom: 0;
 width: 80px;
 display: flex;
 align-items: center;
 transition: opacity .2s var(--n-bezier);
 justify-content: flex-end;
 opacity: 0;
 `, [R("button", [E("&:not(:last-child)", {
    marginRight: "4px"
  }), R("base-icon", [E("svg", [zr()])])]), V("image-type", `
 position: relative;
 max-width: 80px;
 width: auto;
 `), V("image-card-type", `
 z-index: 2;
 position: absolute;
 width: 100%;
 height: 100%;
 left: 0;
 right: 0;
 bottom: 0;
 top: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 `)]), A("name", `
 color: var(--n-item-text-color);
 flex: 1;
 display: flex;
 justify-content: center;
 text-overflow: ellipsis;
 overflow: hidden;
 flex-direction: column;
 text-decoration-color: #0000;
 font-size: var(--n-font-size);
 transition:
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier); 
 `, [E("a", `
 color: inherit;
 text-decoration: underline;
 `)])])])]), R("upload-file-input", `
 display: block;
 width: 0;
 height: 0;
 opacity: 0;
 `)]);
  var gl = globalThis && globalThis.__awaiter || function(e, t, o, r) {
    function n(i) {
      return i instanceof o ? i : new o(function(a) {
        a(i);
      });
    }
    return new (o || (o = Promise))(function(i, a) {
      function l(d) {
        try {
          c(r.next(d));
        } catch (f) {
          a(f);
        }
      }
      function s(d) {
        try {
          c(r.throw(d));
        } catch (f) {
          a(f);
        }
      }
      function c(d) {
        d.done ? i(d.value) : n(d.value).then(l, s);
      }
      c((r = r.apply(e, t || [])).next());
    });
  };
  function MS(e, t, o) {
    const { doChange: r, xhrMap: n } = e;
    let i = 0;
    function a(s) {
      var c;
      let d = Object.assign({}, t, {
        status: "error",
        percentage: i
      });
      n.delete(t.id), d = Rr(((c = e.onError) === null || c === void 0 ? void 0 : c.call(e, { file: d, event: s })) || d), r(d, s);
    }
    function l(s) {
      var c;
      if (e.isErrorState) {
        if (e.isErrorState(o)) {
          a(s);
          return;
        }
      } else if (o.status < 200 || o.status >= 300) {
        a(s);
        return;
      }
      let d = Object.assign({}, t, {
        status: "finished",
        percentage: i
      });
      n.delete(t.id), d = Rr(((c = e.onFinish) === null || c === void 0 ? void 0 : c.call(e, { file: d, event: s })) || d), r(d, s);
    }
    return {
      handleXHRLoad: l,
      handleXHRError: a,
      handleXHRAbort(s) {
        const c = Object.assign({}, t, {
          status: "removed",
          file: null,
          percentage: i
        });
        n.delete(t.id), r(c, s);
      },
      handleXHRProgress(s) {
        const c = Object.assign({}, t, {
          status: "uploading"
        });
        if (s.lengthComputable) {
          const d = Math.ceil(s.loaded / s.total * 100);
          c.percentage = d, i = d;
        }
        r(c, s);
      }
    };
  }
  function HS(e) {
    const { inst: t, file: o, data: r, headers: n, withCredentials: i, action: a, customRequest: l } = e, { doChange: s } = e.inst;
    let c = 0;
    l({
      file: o,
      data: r,
      headers: n,
      withCredentials: i,
      action: a,
      onProgress(d) {
        const f = Object.assign({}, o, {
          status: "uploading"
        }), g = d.percent;
        f.percentage = g, c = g, s(f);
      },
      onFinish() {
        var d;
        let f = Object.assign({}, o, {
          status: "finished",
          percentage: c
        });
        f = Rr(((d = t.onFinish) === null || d === void 0 ? void 0 : d.call(t, { file: f })) || f), s(f);
      },
      onError() {
        var d;
        let f = Object.assign({}, o, {
          status: "error",
          percentage: c
        });
        f = Rr(((d = t.onError) === null || d === void 0 ? void 0 : d.call(t, { file: f })) || f), s(f);
      }
    });
  }
  function AS(e, t, o) {
    const r = MS(e, t, o);
    o.onabort = r.handleXHRAbort, o.onerror = r.handleXHRError, o.onload = r.handleXHRLoad, o.upload && (o.upload.onprogress = r.handleXHRProgress);
  }
  function Qc(e, t) {
    return typeof e == "function" ? e({ file: t }) : e || {};
  }
  function LS(e, t, o) {
    const r = Qc(t, o);
    r && Object.keys(r).forEach((n) => {
      e.setRequestHeader(n, r[n]);
    });
  }
  function FS(e, t, o) {
    const r = Qc(t, o);
    r && Object.keys(r).forEach((n) => {
      e.append(n, r[n]);
    });
  }
  function WS(e, t, o, { method: r, action: n, withCredentials: i, responseType: a, headers: l, data: s }) {
    const c = new XMLHttpRequest();
    c.responseType = a, e.xhrMap.set(o.id, c), c.withCredentials = i;
    const d = new FormData();
    if (FS(d, s, o), d.append(t, o.file), AS(e, o, c), n !== void 0) {
      c.open(r.toUpperCase(), n), LS(c, l, o), c.send(d);
      const f = Object.assign({}, o, {
        status: "uploading"
      });
      e.doChange(f);
    }
  }
  const jS = Object.assign(Object.assign({}, De.props), {
    name: {
      type: String,
      default: "file"
    },
    accept: String,
    action: String,
    customRequest: Function,
    directory: Boolean,
    directoryDnd: { type: Boolean, default: void 0 },
    method: {
      type: String,
      default: "POST"
    },
    multiple: Boolean,
    showFileList: {
      type: Boolean,
      default: !0
    },
    data: [Object, Function],
    headers: [Object, Function],
    withCredentials: Boolean,
    responseType: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    onChange: Function,
    onRemove: Function,
    onFinish: Function,
    onError: Function,
    onBeforeUpload: Function,
    isErrorState: Function,
    /** currently not used */
    onDownload: Function,
    defaultUpload: {
      type: Boolean,
      default: !0
    },
    fileList: Array,
    "onUpdate:fileList": [Function, Array],
    onUpdateFileList: [Function, Array],
    fileListStyle: [String, Object],
    defaultFileList: {
      type: Array,
      default: () => []
    },
    showCancelButton: {
      type: Boolean,
      default: !0
    },
    showRemoveButton: {
      type: Boolean,
      default: !0
    },
    showDownloadButton: Boolean,
    showRetryButton: {
      type: Boolean,
      default: !0
    },
    showPreviewButton: {
      type: Boolean,
      default: !0
    },
    listType: {
      type: String,
      default: "text"
    },
    onPreview: Function,
    shouldUseThumbnailUrl: {
      type: Function,
      default: (e) => SS ? Kc(e) : !1
    },
    createThumbnailUrl: Function,
    abstract: Boolean,
    max: Number,
    showTrigger: {
      type: Boolean,
      default: !0
    },
    imageGroupProps: Object,
    inputProps: Object,
    triggerStyle: [String, Object],
    renderIcon: Object
  }), Xn = ie({
    name: "Upload",
    props: jS,
    setup(e) {
      e.abstract && e.listType === "image-card" && po("upload", "when the list-type is image-card, abstract is not supported.");
      const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = gt(e), r = De("Upload", "-upload", OS, W2, e, t), n = Pi(e), i = k(() => {
        const { max: y } = e;
        return y !== void 0 ? v.value.length >= y : !1;
      }), a = H(e.defaultFileList), l = se(e, "fileList"), s = H(null), c = {
        value: !1
      }, d = H(!1), f = /* @__PURE__ */ new Map(), g = hn(l, a), v = k(() => g.value.map(Rr));
      function p() {
        var y;
        (y = s.value) === null || y === void 0 || y.click();
      }
      function b(y) {
        const S = y.target;
        C(S.files ? Array.from(S.files).map((T) => ({
          file: T,
          entry: null,
          source: "input"
        })) : null, y), S.value = "";
      }
      function x(y) {
        const { "onUpdate:fileList": S, onUpdateFileList: T } = e;
        S && xe(S, y), T && xe(T, y), a.value = y;
      }
      const m = k(() => e.multiple || e.directory);
      function C(y, S) {
        if (!y || y.length === 0)
          return;
        const { onBeforeUpload: T } = e;
        y = m.value ? y : [y[0]];
        const { max: M, accept: L } = e;
        y = y.filter(({ file: N, source: q }) => q === "dnd" && (L != null && L.trim()) ? zS(N.name, N.type, L) : !0), M && (y = y.slice(0, M - v.value.length));
        const O = nn();
        Promise.all(y.map(({ file: N, entry: q }) => gl(this, void 0, void 0, function* () {
          var Y;
          const Q = {
            id: nn(),
            batchId: O,
            name: N.name,
            status: "pending",
            percentage: 0,
            file: N,
            url: null,
            type: N.type,
            thumbnailUrl: null,
            fullPath: (Y = q == null ? void 0 : q.fullPath) !== null && Y !== void 0 ? Y : `/${N.webkitRelativePath || N.name}`
          };
          return !T || (yield T({
            file: Q,
            fileList: v.value
          })) !== !1 ? Q : null;
        }))).then((N) => gl(this, void 0, void 0, function* () {
          let q = Promise.resolve();
          return N.forEach((Y) => {
            q = q.then(Rt).then(() => {
              Y && I(Y, S, {
                append: !0
              });
            });
          }), yield q;
        })).then(() => {
          e.defaultUpload && D();
        });
      }
      function D(y) {
        const { method: S, action: T, withCredentials: M, headers: L, data: O, name: N } = e, q = y !== void 0 ? v.value.filter((Q) => Q.id === y) : v.value, Y = y !== void 0;
        q.forEach((Q) => {
          const { status: fe } = Q;
          (fe === "pending" || fe === "error" && Y) && (e.customRequest ? HS({
            inst: {
              doChange: I,
              xhrMap: f,
              onFinish: e.onFinish,
              onError: e.onError
            },
            file: Q,
            action: T,
            withCredentials: M,
            headers: L,
            data: O,
            customRequest: e.customRequest
          }) : WS({
            doChange: I,
            xhrMap: f,
            onFinish: e.onFinish,
            onError: e.onError,
            isErrorState: e.isErrorState
          }, N, Q, {
            method: S,
            action: T,
            withCredentials: M,
            responseType: e.responseType,
            headers: L,
            data: O
          }));
        });
      }
      const I = (y, S, T = {
        append: !1,
        remove: !1
      }) => {
        const { append: M, remove: L } = T, O = Array.from(v.value), N = O.findIndex((q) => q.id === y.id);
        if (M || L || ~N) {
          M ? O.push(y) : L ? O.splice(N, 1) : O.splice(N, 1, y);
          const { onChange: q } = e;
          q && q({
            file: y,
            fileList: O,
            event: S
          }), x(O);
        } else
          process.env.NODE_ENV !== "production" && yr("upload", "File has no corresponding id in current file list.");
      };
      function z(y) {
        var S;
        if (y.thumbnailUrl)
          return y.thumbnailUrl;
        const { createThumbnailUrl: T } = e;
        return T ? (S = T(y.file, y)) !== null && S !== void 0 ? S : y.url || "" : y.url ? y.url : y.file ? wS(y.file) : "";
      }
      const $ = k(() => {
        const { common: { cubicBezierEaseInOut: y }, self: { draggerColor: S, draggerBorder: T, draggerBorderHover: M, itemColorHover: L, itemColorHoverError: O, itemTextColorError: N, itemTextColorSuccess: q, itemTextColor: Y, itemIconColor: Q, itemDisabledOpacity: fe, lineHeight: be, borderRadius: Ie, fontSize: Fe, itemBorderImageCardError: ct, itemBorderImageCard: Te } } = r.value;
        return {
          "--n-bezier": y,
          "--n-border-radius": Ie,
          "--n-dragger-border": T,
          "--n-dragger-border-hover": M,
          "--n-dragger-color": S,
          "--n-font-size": Fe,
          "--n-item-color-hover": L,
          "--n-item-color-hover-error": O,
          "--n-item-disabled-opacity": fe,
          "--n-item-icon-color": Q,
          "--n-item-text-color": Y,
          "--n-item-text-color-error": N,
          "--n-item-text-color-success": q,
          "--n-line-height": be,
          "--n-item-border-image-card-error": ct,
          "--n-item-border-image-card": Te
        };
      }), h = o ? Ft("upload", void 0, $, e) : void 0;
      lt(Ko, {
        mergedClsPrefixRef: t,
        mergedThemeRef: r,
        showCancelButtonRef: se(e, "showCancelButton"),
        showDownloadButtonRef: se(e, "showDownloadButton"),
        showRemoveButtonRef: se(e, "showRemoveButton"),
        showRetryButtonRef: se(e, "showRetryButton"),
        onRemoveRef: se(e, "onRemove"),
        onDownloadRef: se(e, "onDownload"),
        mergedFileListRef: v,
        triggerStyleRef: se(e, "triggerStyle"),
        shouldUseThumbnailUrlRef: se(e, "shouldUseThumbnailUrl"),
        renderIconRef: se(e, "renderIcon"),
        xhrMap: f,
        submit: D,
        doChange: I,
        showPreviewButtonRef: se(e, "showPreviewButton"),
        onPreviewRef: se(e, "onPreview"),
        getFileThumbnailUrlResolver: z,
        listTypeRef: se(e, "listType"),
        dragOverRef: d,
        openOpenFileDialog: p,
        draggerInsideRef: c,
        handleFileAddition: C,
        mergedDisabledRef: n.mergedDisabledRef,
        maxReachedRef: i,
        fileListStyleRef: se(e, "fileListStyle"),
        abstractRef: se(e, "abstract"),
        acceptRef: se(e, "accept"),
        cssVarsRef: o ? void 0 : $,
        themeClassRef: h == null ? void 0 : h.themeClass,
        onRender: h == null ? void 0 : h.onRender,
        showTriggerRef: se(e, "showTrigger"),
        imageGroupPropsRef: se(e, "imageGroupProps"),
        mergedDirectoryDndRef: k(() => {
          var y;
          return (y = e.directoryDnd) !== null && y !== void 0 ? y : e.directory;
        })
      });
      const P = {
        clear: () => {
          a.value = [];
        },
        submit: D,
        openOpenFileDialog: p
      };
      return Object.assign({
        mergedClsPrefix: t,
        draggerInsideRef: c,
        inputElRef: s,
        mergedTheme: r,
        dragOver: d,
        mergedMultiple: m,
        cssVars: o ? void 0 : $,
        themeClass: h == null ? void 0 : h.themeClass,
        onRender: h == null ? void 0 : h.onRender,
        handleFileInputChange: b
      }, P);
    },
    render() {
      var e, t;
      const { draggerInsideRef: o, mergedClsPrefix: r, $slots: n, directory: i, onRender: a } = this;
      if (n.default && !this.abstract) {
        const s = n.default()[0];
        !((e = s == null ? void 0 : s.type) === null || e === void 0) && e[qc] && (o.value = !0);
      }
      const l = u("input", Object.assign({}, this.inputProps, {
        ref: "inputElRef",
        type: "file",
        class: `${r}-upload-file-input`,
        accept: this.accept,
        multiple: this.mergedMultiple,
        onChange: this.handleFileInputChange,
        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
        // @ts-ignore // seems vue-tsc will add the prop, so we can't use expect-error
        webkitdirectory: i || void 0,
        directory: i || void 0
      }));
      return this.abstract ? u(
        ft,
        null,
        (t = n.default) === null || t === void 0 ? void 0 : t.call(n),
        u(xl, { to: "body" }, l)
      ) : (a == null || a(), u(
        "div",
        { class: [
          `${r}-upload`,
          o.value && `${r}-upload--dragger-inside`,
          this.dragOver && `${r}-upload--drag-over`,
          this.themeClass
        ], style: this.cssVars },
        l,
        this.showTrigger && this.listType !== "image-card" && u(Jc, null, n),
        this.showFileList && u(kS, null, n)
      ));
    }
  }), NS = () => ({}), VS = {
    name: "Equation",
    common: j,
    self: NS
  }, US = VS, ed = {
    name: "dark",
    common: j,
    Alert: Dx,
    Anchor: Mx,
    AutoComplete: Yx,
    Avatar: xc,
    AvatarGroup: oC,
    BackTop: iC,
    Badge: lC,
    Breadcrumb: uC,
    Button: ot,
    ButtonGroup: bw,
    Calendar: yC,
    Card: wc,
    Carousel: DC,
    Cascader: MC,
    Checkbox: Yo,
    Code: Sc,
    Collapse: FC,
    CollapseTransition: NC,
    ColorPicker: $C,
    DataTable: dy,
    DatePicker: wy,
    Descriptions: Ty,
    Dialog: _c,
    Divider: Oy,
    Drawer: Ay,
    Dropdown: Fi,
    DynamicInput: Wy,
    DynamicTags: Uy,
    Element: Xy,
    Empty: bo,
    Ellipsis: Ic,
    Equation: US,
    Form: Ky,
    GradientText: ew,
    Icon: gy,
    IconWrapper: aw,
    Image: q2,
    Input: vt,
    InputNumber: Cw,
    LegacyTransfer: iS,
    Layout: ww,
    List: Pw,
    LoadingBar: zw,
    Log: Iw,
    Menu: Ow,
    Mention: Ew,
    Message: vw,
    Modal: _y,
    Notification: fw,
    PageHeader: Aw,
    Pagination: Tc,
    Popconfirm: jw,
    Popover: xo,
    Popselect: $c,
    Progress: Fc,
    Radio: Dc,
    Rate: Gw,
    Result: Zw,
    Row: X2,
    Scrollbar: tt,
    Select: Pc,
    Skeleton: hS,
    Slider: Qw,
    Space: Bc,
    Spin: o2,
    Statistic: i2,
    Steps: c2,
    Switch: f2,
    Table: v2,
    Tabs: y2,
    Tag: gc,
    Thing: $2,
    TimePicker: Ec,
    Timeline: z2,
    Tooltip: wn,
    Transfer: D2,
    Tree: jc,
    TreeSelect: k2,
    Typography: L2,
    Upload: N2,
    Watermark: U2
  }, GS = {
    maxDictId: 6,
    DictKey_descriptionText_1: "",
    DictKey_descriptionRedTask_2: "",
    DictKey_descriptionBlueTask_3: "",
    DictKey_descriptionNeutralsTask_4: "",
    DictKey_sortie_5: ""
  }, td = Dr("txt", {
    state: () => ({
      txt: GS
    }),
    actions: {
      setSortie(e) {
        this.txt.DictKey_sortie_5 = e;
      },
      setMaxDictId(e) {
        this.txt.maxDictId = e;
      },
      setBlueTask(e) {
        this.txt.DictKey_descriptionBlueTask_3 = e;
      },
      setNeutralTask(e) {
        this.txt.DictKey_descriptionNeutralsTask_4 = e;
      },
      setRedTask(e) {
        this.txt.DictKey_descriptionRedTask_2 = e;
      },
      setSituation(e) {
        this.txt.DictKey_descriptionText_1 = e;
      },
      getAll() {
        return this.txt;
      }
    }
  }), XS = /* @__PURE__ */ ie({
    __name: "TasksSortie",
    setup(e) {
      const t = td(), o = k({
        get: () => t.txt.DictKey_sortie_5,
        set: (l) => {
          t.txt.DictKey_sortie_5 = l;
        }
      }), r = k({
        get: () => t.txt.DictKey_descriptionText_1,
        set: (l) => {
          t.txt.DictKey_descriptionText_1 = l;
        }
      }), n = k({
        get: () => t.txt.DictKey_descriptionBlueTask_3,
        set: (l) => {
          t.txt.DictKey_descriptionBlueTask_3 = l;
        }
      }), i = k({
        get: () => t.txt.DictKey_descriptionRedTask_2,
        set: (l) => {
          t.txt.DictKey_descriptionRedTask_2 = l;
        }
      }), a = k({
        get: () => t.txt.DictKey_descriptionNeutralsTask_4,
        set: (l) => {
          t.txt.DictKey_descriptionNeutralsTask_4 = l;
        }
      });
      return (l, s) => (ko(), Qd(ft, null, [
        Be(Se(cr), {
          value: o.value,
          "onUpdate:value": s[0] || (s[0] = (c) => o.value = c),
          placeholder: "Enter a sortie name",
          class: "mb-8"
        }, null, 8, ["value"]),
        Be(Se(rw), {
          "x-gap": 14,
          "y-gap": 50,
          cols: 2,
          class: "pb-20"
        }, {
          default: Ne(() => [
            Be(Se(Ur), null, {
              default: Ne(() => [
                Be(Se(Xr), { class: "mb-2" }, {
                  default: Ne(() => [
                    xt("Situation")
                  ]),
                  _: 1
                }),
                Be(Se(cr), {
                  value: r.value,
                  "onUpdate:value": s[1] || (s[1] = (c) => r.value = c),
                  class: "h-full",
                  type: "textarea",
                  placeholder: "Situation",
                  resizable: !1
                }, null, 8, ["value"])
              ]),
              _: 1
            }),
            Be(Se(Ur), null, {
              default: Ne(() => [
                Be(Se(Xr), { class: "mb-2" }, {
                  default: Ne(() => [
                    xt("Blue Coalition Tasks")
                  ]),
                  _: 1
                }),
                Be(Se(cr), {
                  value: n.value,
                  "onUpdate:value": s[2] || (s[2] = (c) => n.value = c),
                  class: "h-full",
                  type: "textarea",
                  placeholder: "Blue Coalition Tasks",
                  resizable: !1
                }, null, 8, ["value"])
              ]),
              _: 1
            }),
            Be(Se(Ur), null, {
              default: Ne(() => [
                Be(Se(Xr), { class: "mb-2" }, {
                  default: Ne(() => [
                    xt("Red Coalition Tasks")
                  ]),
                  _: 1
                }),
                Be(Se(cr), {
                  value: i.value,
                  "onUpdate:value": s[3] || (s[3] = (c) => i.value = c),
                  class: "h-full",
                  type: "textarea",
                  placeholder: "Red Coalition Tasks",
                  resizable: !1
                }, null, 8, ["value"])
              ]),
              _: 1
            }),
            Be(Se(Ur), null, {
              default: Ne(() => [
                Be(Se(Xr), { class: "mb-2" }, {
                  default: Ne(() => [
                    xt("Neutral Coalition Tasks")
                  ]),
                  _: 1
                }),
                Be(Se(cr), {
                  value: a.value,
                  "onUpdate:value": s[4] || (s[4] = (c) => a.value = c),
                  class: "h-full",
                  type: "textarea",
                  placeholder: "Neutral Coalition Tasks",
                  resizable: !1
                }, null, 8, ["value"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ], 64));
    }
  }), qS = {}, YS = Dr("map", {
    state: () => ({
      map: qS
    }),
    actions: {
      setAll(e) {
        this.map = e.reduce((t, o) => (t[o.id] = o.name, t), {});
      },
      getAll() {
        return this.map;
      },
      setOne(e, t) {
        this.map[e] = t;
      }
    }
  }), ZS = Dr("img", {
    state: () => ({
      img: {}
    }),
    actions: {
      setImgData(e) {
        e.forEach((t) => {
          this.img[t.name] = t;
        });
      },
      setOneImage(e, t) {
        this.img[e] = t;
      },
      getOneImage(e) {
        return this.img[e];
      },
      getAllImage() {
        return this.img;
      },
      deleteOneImage(e) {
        delete this.img[e];
      }
    }
  }), KS = {
    pictureFileNameB: [],
    pictureFileNameN: [],
    pictureFileNameR: []
  }, JS = Dr("bf", {
    state: () => ({
      briefing: KS
    }),
    actions: {
      setBluePictures(e) {
        this.briefing.pictureFileNameB = e;
      },
      setNeutralPictures(e) {
        this.briefing.pictureFileNameN = e;
      },
      setRedPictures(e) {
        this.briefing.pictureFileNameR = e;
      },
      addBlue(e) {
        this.briefing.pictureFileNameB.push(e);
      },
      addNetural(e) {
        this.briefing.pictureFileNameN.push(e);
      },
      addRed(e) {
        this.briefing.pictureFileNameR.push(e);
      }
    }
  }), QS = /* @__PURE__ */ ie({
    __name: "ImageUpload",
    setup(e) {
      const t = YS(), o = JS(), r = ZS(), n = td();
      let i = 6;
      const a = H(0), l = () => {
        a.value += 1;
      }, s = () => `ResKey_ImageBriefing_${i++}`, c = () => n.txt.maxDictId > i ? n.txt.maxDictId : i, d = {
        id: "none",
        name: "none",
        status: "finished",
        url: "none"
      }, f = ($, h, P) => {
        switch (t.setOne($, h), P) {
          case "blue":
            o.addBlue($);
            break;
          case "neutral":
            o.addNetural($);
            break;
          case "red":
            o.addRed($);
            break;
        }
      }, g = ($) => $.map((h) => {
        const P = r.getOneImage(h);
        if (P != null) {
          const y = P;
          return {
            id: h,
            name: y.name,
            status: "finished",
            url: y.url
          };
        } else
          return d;
      }), v = ({ file: $, onFinish: h }, P) => {
        const y = new FileReader();
        y.onloadend = function() {
          const S = y.result, T = s();
          n.txt.maxDictId = c(), $.id = T;
          const M = {
            id: $.id,
            name: $.name,
            status: "finished",
            url: S
          };
          f($.id, $.name, P), r.setOneImage($.id, M), h();
        }, y.readAsDataURL($.file);
      }, p = ($, h) => {
        for (let P in $)
          $[P] = $[P].filter((y) => y !== h);
        return $;
      }, b = ($) => {
        r.deleteOneImage($.file.id), delete t.map[$.file.id], o.briefing = p(o.briefing, $.file.id);
        const h = new CustomEvent("deleteImage", {
          detail: { id: $.file.id, name: $.file.name }
        });
        return window.dispatchEvent(h), !0;
      }, x = ($) => {
        v(
          $,
          "red"
          /* red */
        );
      }, m = ($) => {
        v(
          $,
          "blue"
          /* blue */
        );
      }, C = ($) => {
        v(
          $,
          "neutral"
          /* neutral */
        );
      }, D = k(
        () => g(o.briefing.pictureFileNameR)
      ), I = k(
        () => g(o.briefing.pictureFileNameB)
      ), z = k(
        () => g(o.briefing.pictureFileNameN)
      );
      return ke(
        () => z.value,
        () => {
          l();
        }
      ), ke(
        () => I.value,
        () => {
          l();
        }
      ), ke(
        () => D.value,
        () => {
          l();
        }
      ), ($, h) => (ko(), dr(Se(bS), { type: "segment" }, {
        default: Ne(() => [
          Be(Se(Un), {
            name: "blue",
            tab: "Blue"
          }, {
            default: Ne(() => [
              (ko(), dr(Se(Xn), {
                key: a.value,
                accept: ".png, .jpeg, .jpg",
                "default-file-list": I.value,
                "list-type": "image-card",
                "custom-request": m,
                "on-remove": b
              }, null, 8, ["default-file-list"]))
            ]),
            _: 1
          }),
          Be(Se(Un), {
            name: "neutral",
            tab: "Neutral"
          }, {
            default: Ne(() => [
              (ko(), dr(Se(Xn), {
                key: a.value,
                accept: ".png, .jpeg, .jpg",
                "default-file-list": z.value,
                "list-type": "image-card",
                "custom-request": C,
                "on-remove": b
              }, null, 8, ["default-file-list"]))
            ]),
            _: 1
          }),
          Be(Se(Un), {
            name: "red",
            tab: "Red"
          }, {
            default: Ne(() => [
              (ko(), dr(Se(Xn), {
                key: a.value,
                accept: ".png, .jpeg, .jpg",
                "default-file-list": D.value,
                "list-type": "image-card",
                "custom-request": x,
                "on-remove": b
              }, null, 8, ["default-file-list"]))
            ]),
            _: 1
          })
        ]),
        _: 1
      }));
    }
  }), vl = H(ed), e5 = H("Dark"), ml = {
    common: {
      bodyColor: "#23313f",
      cardColor: "#293949",
      railColor: "#555",
      primaryColorSuppl: "#fff"
    }
  }, t5 = Dr("theme", {
    state: () => ({
      theme: ed
    }),
    actions: {
      setTheme(e) {
        vl.value = e;
      },
      setThemeOverrides(e) {
        ml.common = e.common;
      }
    },
    getters: {
      getTheme() {
        return vl.value;
      },
      getThemeOverrides() {
        return ml;
      },
      getSelectedTheme() {
        return e5.value;
      }
    }
  }), o5 = { class: "flex flex-row w-full mt-2 font-sans pr-10" }, r5 = { class: "flex justify-center flex-col w-full h-full overflow-hidden pl-10" }, n5 = { class: "flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10 ml-8" }, i5 = /* @__PURE__ */ ie({
    __name: "App",
    setup(e) {
      const t = t5(), o = H(t.theme), r = H(t.getSelectedTheme), n = H(t.getThemeOverrides);
      return (i, a) => (ko(), dr(Se(UC), {
        theme: r.value === "Dark" ? o.value : null,
        "theme-overrides": r.value === "Dark" ? n.value : null
      }, {
        default: Ne(() => [
          $n("div", o5, [
            $n("div", r5, [
              Be(Se(fl), { class: "border-b border-white border-solid border-1 mb-12 text-xl" }, {
                default: Ne(() => [
                  xt(" Briefing ")
                ]),
                _: 1
              }),
              Be(XS)
            ]),
            $n("div", n5, [
              Be(Se(fl), { class: "border-b border-white border-solid border-1 mb-12 text-xl" }, {
                default: Ne(() => [
                  xt(" Briefing Images")
                ]),
                _: 1
              }),
              Be(QS)
            ])
          ])
        ]),
        _: 1
      }, 8, ["theme", "theme-overrides"]));
    }
  }), a5 = Pu(), od = eu(i5);
  od.use(a5);
  od.mount("#app");
});
export default l5();
