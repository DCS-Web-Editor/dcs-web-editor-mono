import { effectScope as Jl, ref as W, markRaw as Wt, toRaw as In, getCurrentInstance as Br, inject as De, watch as Fe, unref as ne, reactive as cu, isRef as et, isReactive as Vi, toRef as Te, nextTick as It, computed as E, getCurrentScope as uu, onScopeDispose as fu, toRefs as wa, createTextVNode as ot, Fragment as oo, Comment as Ui, isVNode as hu, defineComponent as ge, onBeforeUnmount as wt, readonly as vi, onMounted as St, provide as Ot, withDirectives as Dr, h as m, Teleport as pu, renderSlot as Ql, onActivated as es, onDeactivated as ts, mergeProps as qi, onBeforeMount as Gi, watchEffect as pt, Transition as Qt, TransitionGroup as vu, vShow as os, cloneVNode as gu, onBeforeUpdate as mu, openBlock as $o, createBlock as rs, withCtx as _e, createVNode as Se, toDisplayString as ns, createElementBlock as hr, createCommentVNode as Vn, createElementVNode as Zo, createApp as bu } from "vue";
var is = !1;
function Vr(e, t, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
}
function Un(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function xu() {
  return as().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function as() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Cu = typeof Proxy == "function", yu = "devtools-plugin:setup", wu = "plugin:settings:set";
let Wo, gi;
function Su() {
  var e;
  return Wo !== void 0 || (typeof window < "u" && window.performance ? (Wo = !0, gi = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (Wo = !0, gi = global.perf_hooks.performance) : Wo = !1), Wo;
}
function $u() {
  return Su() ? gi.now() : Date.now();
}
class Pu {
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
        return $u();
      }
    }, o && o.on(wu, (a, l) => {
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
      }), this.fallbacks[l](...s)) : (...s) => new Promise((d) => {
        this.targetQueue.push({
          method: l,
          args: s,
          resolve: d
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
function ls(e, t) {
  const o = e, r = as(), n = xu(), i = Cu && o.enableEarlyProxy;
  if (n && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    n.emit(yu, e, t);
  else {
    const a = i ? new Pu(o, n) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
  * pinia v2.0.35
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let pr;
const Sr = (e) => pr = e, ss = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Ro(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var jt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(jt || (jt = {}));
const On = typeof window < "u", mr = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && On, Sa = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
function Tu(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
}
function Ki(e, t, o) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    us(r.response, t, o);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function ds(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function nn(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const an = typeof navigator == "object" ? navigator : { userAgent: "" }, cs = /* @__PURE__ */ (() => /Macintosh/.test(an.userAgent) && /AppleWebKit/.test(an.userAgent) && !/Safari/.test(an.userAgent))(), us = On ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !cs ? ku : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in an ? zu : (
      // Fallback to using FileReader and a popup
      Iu
    )
  )
) : () => {
};
function ku(e, t = "download", o) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? ds(r.href) ? Ki(e, t, o) : (r.target = "_blank", nn(r)) : nn(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    nn(r);
  }, 0));
}
function zu(e, t = "download", o) {
  if (typeof e == "string")
    if (ds(e))
      Ki(e, t, o);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        nn(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Tu(e, o), t);
}
function Iu(e, t, o, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return Ki(e, t, o);
  const n = e.type === "application/octet-stream", i = /constructor/i.test(String(Sa.HTMLElement)) || "safari" in Sa, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || n && i || cs) && typeof FileReader < "u") {
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
function lt(e, t) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, t) : t === "error" ? console.error(o) : t === "warn" ? console.warn(o) : console.log(o);
}
function Yi(e) {
  return "_a" in e && "install" in e;
}
function fs() {
  if (!("clipboard" in navigator))
    return lt("Your browser doesn't support the Clipboard API", "error"), !0;
}
function hs(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (lt('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Ou(e) {
  if (!fs())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), lt("Global state copied to clipboard.");
    } catch (t) {
      if (hs(t))
        return;
      lt("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Ru(e) {
  if (!fs())
    try {
      e.state.value = JSON.parse(await navigator.clipboard.readText()), lt("Global state pasted from clipboard.");
    } catch (t) {
      if (hs(t))
        return;
      lt("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Mu(e) {
  try {
    us(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    lt("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Xt;
function Eu() {
  Xt || (Xt = document.createElement("input"), Xt.type = "file", Xt.accept = ".json");
  function e() {
    return new Promise((t, o) => {
      Xt.onchange = async () => {
        const r = Xt.files;
        if (!r)
          return t(null);
        const n = r.item(0);
        return t(n ? { text: await n.text(), file: n } : null);
      }, Xt.oncancel = () => t(null), Xt.onerror = o, Xt.click();
    });
  }
  return e;
}
async function _u(e) {
  try {
    const o = await (await Eu())();
    if (!o)
      return;
    const { text: r, file: n } = o;
    e.state.value = JSON.parse(r), lt(`Global state imported from "${n.name}".`);
  } catch (t) {
    lt("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Ht(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const ps = "🍍 Pinia (root)", mi = "_root";
function Bu(e) {
  return Yi(e) ? {
    id: mi,
    label: ps
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Du(e) {
  if (Yi(e)) {
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
function Au(e) {
  return e ? Array.isArray(e) ? e.reduce((t, o) => (t.keys.push(o.key), t.operations.push(o.type), t.oldValue[o.key] = o.oldValue, t.newValue[o.key] = o.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Ht(e.type),
    key: Ht(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Fu(e) {
  switch (e) {
    case jt.direct:
      return "mutation";
    case jt.patchFunction:
      return "$patch";
    case jt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Yo = !0;
const ln = [], yo = "pinia:mutations", ft = "pinia", { assign: Hu } = Object, fn = (e) => "🍍 " + e;
function Lu(e, t) {
  ls({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ln,
    app: e
  }, (o) => {
    typeof o.now != "function" && lt("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: yo,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: ft,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Ou(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Ru(t), o.sendInspectorTree(ft), o.sendInspectorState(ft);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Mu(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await _u(t), o.sendInspectorTree(ft), o.sendInspectorState(ft);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: "Reset the state (option store only)",
          action: (r) => {
            const n = t._s.get(r);
            n ? n._isOptionsAPI ? (n.$reset(), lt(`Store "${r}" reset.`)) : lt(`Cannot reset "${r}" store because it's a setup store.`, "warn") : lt(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((r, n) => {
      const i = r.componentInstance && r.componentInstance.proxy;
      if (i && i._pStores) {
        const a = r.componentInstance.proxy._pStores;
        Object.values(a).forEach((l) => {
          r.instanceData.state.push({
            type: fn(l.$id),
            key: "state",
            editable: !0,
            value: l._isOptionsAPI ? {
              _custom: {
                value: In(l.$state),
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
              Object.keys(l.$state).reduce((s, d) => (s[d] = l.$state[d], s), {})
            )
          }), l._getters && l._getters.length && r.instanceData.state.push({
            type: fn(l.$id),
            key: "getters",
            editable: !1,
            value: l._getters.reduce((s, d) => {
              try {
                s[d] = l[d];
              } catch (c) {
                s[d] = c;
              }
              return s;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((r) => {
      if (r.app === e && r.inspectorId === ft) {
        let n = [t];
        n = n.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : ps.toLowerCase().includes(r.filter.toLowerCase())) : n).map(Bu);
      }
    }), o.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === ft) {
        const n = r.nodeId === mi ? t : t._s.get(r.nodeId);
        if (!n)
          return;
        n && (r.state = Du(n));
      }
    }), o.on.editInspectorState((r, n) => {
      if (r.app === e && r.inspectorId === ft) {
        const i = r.nodeId === mi ? t : t._s.get(r.nodeId);
        if (!i)
          return lt(`store "${r.nodeId}" not found`, "error");
        const { path: a } = r;
        Yi(i) ? a.unshift("state") : (a.length !== 1 || !i._customProperties.has(a[0]) || a[0] in i.$state) && a.unshift("$state"), Yo = !1, r.set(i, a, r.state.value), Yo = !0;
      }
    }), o.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const n = r.type.replace(/^🍍\s*/, ""), i = t._s.get(n);
        if (!i)
          return lt(`store "${n}" not found`, "error");
        const { path: a } = r;
        if (a[0] !== "state")
          return lt(`Invalid path for store "${n}":
${a}
Only state can be modified.`);
        a[0] = "$state", Yo = !1, r.set(i, a, r.state.value), Yo = !0;
      }
    });
  });
}
function Wu(e, t) {
  ln.includes(fn(t.$id)) || ln.push(fn(t.$id)), ls({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ln,
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
    t.$onAction(({ after: a, onError: l, name: s, args: d }) => {
      const c = vs++;
      o.addTimelineEvent({
        layerId: yo,
        event: {
          time: r(),
          title: "🛫 " + s,
          subtitle: "start",
          data: {
            store: Ht(t.$id),
            action: Ht(s),
            args: d
          },
          groupId: c
        }
      }), a((u) => {
        So = void 0, o.addTimelineEvent({
          layerId: yo,
          event: {
            time: r(),
            title: "🛬 " + s,
            subtitle: "end",
            data: {
              store: Ht(t.$id),
              action: Ht(s),
              args: d,
              result: u
            },
            groupId: c
          }
        });
      }), l((u) => {
        So = void 0, o.addTimelineEvent({
          layerId: yo,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + s,
            subtitle: "end",
            data: {
              store: Ht(t.$id),
              action: Ht(s),
              args: d,
              error: u
            },
            groupId: c
          }
        });
      });
    }, !0), t._customProperties.forEach((a) => {
      Fe(() => ne(t[a]), (l, s) => {
        o.notifyComponentUpdate(), o.sendInspectorState(ft), Yo && o.addTimelineEvent({
          layerId: yo,
          event: {
            time: r(),
            title: "Change",
            subtitle: a,
            data: {
              newValue: l,
              oldValue: s
            },
            groupId: So
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: a, type: l }, s) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(ft), !Yo)
        return;
      const d = {
        time: r(),
        title: Fu(l),
        data: Hu({ store: Ht(t.$id) }, Au(a)),
        groupId: So
      };
      So = void 0, l === jt.patchFunction ? d.subtitle = "⤵️" : l === jt.patchObject ? d.subtitle = "🧩" : a && !Array.isArray(a) && (d.subtitle = a.type), a && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: a
        }
      }), o.addTimelineEvent({
        layerId: yo,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const n = t._hotUpdate;
    t._hotUpdate = Wt((a) => {
      n(a), o.addTimelineEvent({
        layerId: yo,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Ht(t.$id),
            info: Ht("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree(ft), o.sendInspectorState(ft);
    });
    const { $dispose: i } = t;
    t.$dispose = () => {
      i(), o.notifyComponentUpdate(), o.sendInspectorTree(ft), o.sendInspectorState(ft), o.getSettings().logStoreChanges && lt(`Disposed "${t.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(ft), o.sendInspectorState(ft), o.getSettings().logStoreChanges && lt(`"${t.$id}" store installed 🆕`);
  });
}
let vs = 0, So;
function $a(e, t) {
  const o = t.reduce((r, n) => (r[n] = In(e)[n], r), {});
  for (const r in o)
    e[r] = function() {
      const n = vs, i = new Proxy(e, {
        get(...a) {
          return So = n, Reflect.get(...a);
        },
        set(...a) {
          return So = n, Reflect.set(...a);
        }
      });
      return o[r].apply(i, arguments);
    };
}
function Nu({ app: e, store: t, options: o }) {
  if (!t.$id.startsWith("__hot:")) {
    if (o.state && (t._isOptionsAPI = !0), typeof o.state == "function") {
      $a(
        // @ts-expect-error: can cast the store...
        t,
        Object.keys(o.actions)
      );
      const r = t._hotUpdate;
      In(t)._hotUpdate = function(n) {
        r.apply(this, arguments), $a(t, Object.keys(n._hmrPayload.actions));
      };
    }
    Wu(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function ju() {
  const e = Jl(!0), t = e.run(() => W({}));
  let o = [], r = [];
  const n = Wt({
    install(i) {
      Sr(n), n._a = i, i.provide(ss, n), i.config.globalProperties.$pinia = n, mr && Lu(i, n), r.forEach((a) => o.push(a)), r = [];
    },
    use(i) {
      return !this._a && !is ? r.push(i) : o.push(i), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return mr && typeof Proxy < "u" && n.use(Nu), n;
}
function gs(e, t) {
  for (const o in t) {
    const r = t[o];
    if (!(o in e))
      continue;
    const n = e[o];
    Ro(n) && Ro(r) && !et(r) && !Vi(r) ? e[o] = gs(n, r) : e[o] = r;
  }
  return e;
}
const ms = () => {
};
function Pa(e, t, o, r = ms) {
  e.push(t);
  const n = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), r());
  };
  return !o && uu() && fu(n), n;
}
function No(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
function bi(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, r) => e.set(r, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const r = t[o], n = e[o];
    Ro(n) && Ro(r) && e.hasOwnProperty(o) && !et(r) && !Vi(r) ? e[o] = bi(n, r) : e[o] = r;
  }
  return e;
}
const Vu = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Uu(e) {
  return !Ro(e) || !e.hasOwnProperty(Vu);
}
const { assign: Et } = Object;
function Ta(e) {
  return !!(et(e) && e.effect);
}
function ka(e, t, o, r) {
  const { state: n, actions: i, getters: a } = t, l = o.state.value[e];
  let s;
  function d() {
    !l && (process.env.NODE_ENV === "production" || !r) && (o.state.value[e] = n ? n() : {});
    const c = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      wa(W(n ? n() : {}).value)
    ) : wa(o.state.value[e]);
    return Et(c, i, Object.keys(a || {}).reduce((u, h) => (process.env.NODE_ENV !== "production" && h in c && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${h}" in store "${e}".`), u[h] = Wt(E(() => {
      Sr(o);
      const v = o._s.get(e);
      return a[h].call(v, v);
    })), u), {}));
  }
  return s = xi(e, d, t, o, r, !0), s;
}
function xi(e, t, o = {}, r, n, i) {
  let a;
  const l = Et({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const s = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !is && (s.onTrigger = ($) => {
    d ? v = $ : d == !1 && !g._hotUpdating && (Array.isArray(v) ? v.push($) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, c, u = Wt([]), h = Wt([]), v;
  const f = r.state.value[e];
  !i && !f && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
  const b = W({});
  let x;
  function p($) {
    let P;
    d = c = !1, process.env.NODE_ENV !== "production" && (v = []), typeof $ == "function" ? ($(r.state.value[e]), P = {
      type: jt.patchFunction,
      storeId: e,
      events: v
    }) : (bi(r.state.value[e], $), P = {
      type: jt.patchObject,
      payload: $,
      storeId: e,
      events: v
    });
    const z = x = Symbol();
    It().then(() => {
      x === z && (d = !0);
    }), c = !0, No(u, P, r.state.value[e]);
  }
  const w = i ? function() {
    const { state: P } = o, z = P ? P() : {};
    this.$patch((M) => {
      Et(M, z);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : ms
  );
  function R() {
    a.stop(), u = [], h = [], r._s.delete(e);
  }
  function y($, P) {
    return function() {
      Sr(r);
      const z = Array.from(arguments), M = [], F = [];
      function L(O) {
        M.push(O);
      }
      function G(O) {
        F.push(O);
      }
      No(h, {
        args: z,
        name: $,
        store: g,
        after: L,
        onError: G
      });
      let K;
      try {
        K = P.apply(this && this.$id === e ? this : g, z);
      } catch (O) {
        throw No(F, O), O;
      }
      return K instanceof Promise ? K.then((O) => (No(M, O), O)).catch((O) => (No(F, O), Promise.reject(O))) : (No(M, K), K);
    };
  }
  const T = /* @__PURE__ */ Wt({
    actions: {},
    getters: {},
    state: [],
    hotState: b
  }), I = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Pa.bind(null, h),
    $patch: p,
    $reset: w,
    $subscribe($, P = {}) {
      const z = Pa(u, $, P.detached, () => M()), M = a.run(() => Fe(() => r.state.value[e], (F) => {
        (P.flush === "sync" ? c : d) && $({
          storeId: e,
          type: jt.direct,
          events: v
        }, F);
      }, Et({}, s, P)));
      return z;
    },
    $dispose: R
  }, g = cu(process.env.NODE_ENV !== "production" || mr ? Et(
    {
      _hmrPayload: T,
      _customProperties: Wt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    I
    // must be added later
    // setupStore
  ) : I);
  r._s.set(e, g);
  const S = r._e.run(() => (a = Jl(), a.run(() => t())));
  for (const $ in S) {
    const P = S[$];
    if (et(P) && !Ta(P) || Vi(P))
      process.env.NODE_ENV !== "production" && n ? Vr(b.value, $, Te(S, $)) : i || (f && Uu(P) && (et(P) ? P.value = f[$] : bi(P, f[$])), r.state.value[e][$] = P), process.env.NODE_ENV !== "production" && T.state.push($);
    else if (typeof P == "function") {
      const z = process.env.NODE_ENV !== "production" && n ? P : y($, P);
      S[$] = z, process.env.NODE_ENV !== "production" && (T.actions[$] = P), l.actions[$] = P;
    } else
      process.env.NODE_ENV !== "production" && Ta(P) && (T.getters[$] = i ? (
        // @ts-expect-error
        o.getters[$]
      ) : P, On && (S._getters || // @ts-expect-error: same
      (S._getters = Wt([]))).push($));
  }
  if (Et(g, S), Et(In(g), S), Object.defineProperty(g, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? b.value : r.state.value[e],
    set: ($) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      p((P) => {
        Et(P, $);
      });
    }
  }), process.env.NODE_ENV !== "production" && (g._hotUpdate = Wt(($) => {
    g._hotUpdating = !0, $._hmrPayload.state.forEach((P) => {
      if (P in g.$state) {
        const z = $.$state[P], M = g.$state[P];
        typeof z == "object" && Ro(z) && Ro(M) ? gs(z, M) : $.$state[P] = M;
      }
      Vr(g, P, Te($.$state, P));
    }), Object.keys(g.$state).forEach((P) => {
      P in $.$state || Un(g, P);
    }), d = !1, c = !1, r.state.value[e] = Te($._hmrPayload, "hotState"), c = !0, It().then(() => {
      d = !0;
    });
    for (const P in $._hmrPayload.actions) {
      const z = $[P];
      Vr(g, P, y(P, z));
    }
    for (const P in $._hmrPayload.getters) {
      const z = $._hmrPayload.getters[P], M = i ? (
        // special handling of options api
        E(() => (Sr(r), z.call(g, g)))
      ) : z;
      Vr(g, P, M);
    }
    Object.keys(g._hmrPayload.getters).forEach((P) => {
      P in $._hmrPayload.getters || Un(g, P);
    }), Object.keys(g._hmrPayload.actions).forEach((P) => {
      P in $._hmrPayload.actions || Un(g, P);
    }), g._hmrPayload = $._hmrPayload, g._getters = $._getters, g._hotUpdating = !1;
  })), mr) {
    const $ = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((P) => {
      Object.defineProperty(g, P, Et({ value: g[P] }, $));
    });
  }
  return r._p.forEach(($) => {
    if (mr) {
      const P = a.run(() => $({
        store: g,
        app: r._a,
        pinia: r,
        options: l
      }));
      Object.keys(P || {}).forEach((z) => g._customProperties.add(z)), Et(g, P);
    } else
      Et(g, a.run(() => $({
        store: g,
        app: r._a,
        pinia: r,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && g.$state && typeof g.$state == "object" && typeof g.$state.constructor == "function" && !g.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${g.$id}".`), f && i && o.hydrate && o.hydrate(g.$state, f), d = !0, c = !0, g;
}
function bs(e, t, o) {
  let r, n;
  const i = typeof t == "function";
  typeof e == "string" ? (r = e, n = i ? o : t) : (n = e, r = e.id);
  function a(l, s) {
    const d = Br();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && pr && pr._testing ? null : l) || d && De(ss, null), l && Sr(l), process.env.NODE_ENV !== "production" && !pr)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    l = pr, l._s.has(r) || (i ? xi(r, t, n, l) : ka(r, n, l), process.env.NODE_ENV !== "production" && (a._pinia = l));
    const c = l._s.get(r);
    if (process.env.NODE_ENV !== "production" && s) {
      const u = "__hot:" + r, h = i ? xi(u, t, n, l, !0) : ka(u, Et({}, n), l, !0);
      s._hotUpdate(h), delete l.state.value[u], l._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && On && d && d.proxy && // avoid adding stores that are just built for hot module replacement
    !s) {
      const u = d.proxy, h = "_pStores" in u ? u._pStores : u._pStores = {};
      h[r] = c;
    }
    return c;
  }
  return a.$id = r, a;
}
let hn = [];
const xs = /* @__PURE__ */ new WeakMap();
function qu() {
  hn.forEach((e) => e(...xs.get(e))), hn = [];
}
function Cs(e, ...t) {
  xs.set(e, t), !hn.includes(e) && hn.push(e) === 1 && requestAnimationFrame(qu);
}
function pn(e, t) {
  let { target: o } = e;
  for (; o; ) {
    if (o.dataset && o.dataset[t] !== void 0)
      return !0;
    o = o.parentElement;
  }
  return !1;
}
function $r(e) {
  return e.composedPath()[0] || null;
}
function Pr(e) {
  return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
}
function Ur(e) {
  if (e != null)
    return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
}
function sn(e, t) {
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
function Gu(e, t) {
  const [o, r] = e.split(" ");
  return t ? t === "row" ? o : r : {
    row: o,
    col: r || o
  };
}
const za = {
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
}, tr = "^\\s*", or = "\\s*$", Po = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", To = "([0-9A-Fa-f])", ko = "([0-9A-Fa-f]{2})", Ku = new RegExp(`${tr}rgb\\s*\\(${Po},${Po},${Po}\\)${or}`), Yu = new RegExp(`${tr}rgba\\s*\\(${Po},${Po},${Po},${Po}\\)${or}`), Xu = new RegExp(`${tr}#${To}${To}${To}${or}`), Zu = new RegExp(`${tr}#${ko}${ko}${ko}${or}`), Ju = new RegExp(`${tr}#${To}${To}${To}${To}${or}`), Qu = new RegExp(`${tr}#${ko}${ko}${ko}${ko}${or}`);
function yt(e) {
  return parseInt(e, 16);
}
function Ut(e) {
  try {
    let t;
    if (t = Zu.exec(e))
      return [yt(t[1]), yt(t[2]), yt(t[3]), 1];
    if (t = Ku.exec(e))
      return [ht(t[1]), ht(t[5]), ht(t[9]), 1];
    if (t = Yu.exec(e))
      return [
        ht(t[1]),
        ht(t[5]),
        ht(t[9]),
        br(t[13])
      ];
    if (t = Xu.exec(e))
      return [
        yt(t[1] + t[1]),
        yt(t[2] + t[2]),
        yt(t[3] + t[3]),
        1
      ];
    if (t = Qu.exec(e))
      return [
        yt(t[1]),
        yt(t[2]),
        yt(t[3]),
        br(yt(t[4]) / 255)
      ];
    if (t = Ju.exec(e))
      return [
        yt(t[1] + t[1]),
        yt(t[2] + t[2]),
        yt(t[3] + t[3]),
        br(yt(t[4] + t[4]) / 255)
      ];
    if (e in za)
      return Ut(za[e]);
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function ef(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function Ci(e, t, o, r) {
  return `rgba(${ht(e)}, ${ht(t)}, ${ht(o)}, ${ef(r)})`;
}
function qn(e, t, o, r, n) {
  return ht((e * t * (1 - r) + o * r) / n);
}
function he(e, t) {
  Array.isArray(e) || (e = Ut(e)), Array.isArray(t) || (t = Ut(t));
  const o = e[3], r = t[3], n = br(o + r - o * r);
  return Ci(qn(e[0], o, t[0], r, n), qn(e[1], o, t[1], r, n), qn(e[2], o, t[2], r, n), n);
}
function Y(e, t) {
  const [o, r, n, i = 1] = Array.isArray(e) ? e : Ut(e);
  return t.alpha ? Ci(o, r, n, t.alpha) : Ci(o, r, n, i);
}
function Qe(e, t) {
  const [o, r, n, i = 1] = Array.isArray(e) ? e : Ut(e), { lightness: a = 1, alpha: l = 1 } = t;
  return tf([o * a, r * a, n * a, i * l]);
}
function br(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function ht(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function tf(e) {
  const [t, o, r] = e;
  return 3 in e ? `rgba(${ht(t)}, ${ht(o)}, ${ht(r)}, ${br(e[3])})` : `rgba(${ht(t)}, ${ht(o)}, ${ht(r)}, 1)`;
}
function vn(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function of(e, t = "default", o = []) {
  const n = e.$slots[t];
  return n === void 0 ? o : n();
}
function rf(e, t = [], o) {
  const r = {};
  return t.forEach((n) => {
    r[n] = e[n];
  }), Object.assign(r, o);
}
function gn(e, t = !0, o = []) {
  return e.forEach((r) => {
    if (r !== null) {
      if (typeof r != "object") {
        (typeof r == "string" || typeof r == "number") && o.push(ot(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        gn(r, t, o);
        return;
      }
      if (r.type === oo) {
        if (r.children === null)
          return;
        Array.isArray(r.children) && gn(r.children, t, o);
      } else
        r.type !== Ui && o.push(r);
    }
  }), o;
}
function pe(e, ...t) {
  if (Array.isArray(e))
    e.forEach((o) => pe(o, ...t));
  else
    return e(...t);
}
const Xo = (e, ...t) => typeof e == "function" ? e(...t) : typeof e == "string" ? ot(e) : typeof e == "number" ? ot(String(e)) : null, Ia = /* @__PURE__ */ new Set();
function kt(e, t) {
  const o = `[naive/${e}]: ${t}`;
  Ia.has(o) || (Ia.add(o), console.error(o));
}
function Tr(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function ys(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function nf(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
function Oa(e, t = "default", o = void 0) {
  const r = e[t];
  if (!r)
    return Tr("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const n = gn(r(o));
  return n.length === 1 ? n[0] : (Tr("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function Ar(e) {
  return e.some((t) => hu(t) ? !(t.type === Ui || t.type === oo && !Ar(t.children)) : !0) ? e : null;
}
function Jt(e, t) {
  return e && Ar(e()) || t();
}
function af(e, t, o) {
  return e && Ar(e(t)) || o(t);
}
function bt(e, t) {
  const o = e && Ar(e());
  return t(o || null);
}
function yi(e) {
  return !(e && Ar(e()));
}
function Gn(e) {
  const t = e.filter((o) => o !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (o) => {
      e.forEach((r) => {
        r && r(o);
      });
    };
}
const wi = ge({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), lf = /^(\d|\.)+$/, Ra = /(\d|\.)+/;
function Jo(e, { c: t = 1, offset: o = 0, attachPx: r = !0 } = {}) {
  if (typeof e == "number") {
    const n = (e + o) * t;
    return n === 0 ? "0" : `${n}px`;
  } else if (typeof e == "string")
    if (lf.test(e)) {
      const n = (Number(e) + o) * t;
      return r ? n === 0 ? "0" : `${n}px` : `${n}`;
    } else {
      const n = Ra.exec(e);
      return n ? e.replace(Ra, String((Number(n[0]) + o) * t)) : e;
    }
  return e;
}
function mn(e) {
  return e.replace(/#|\(|\)|,|\s/g, "_");
}
function sf(e) {
  let t = 0;
  for (let o = 0; o < e.length; ++o)
    e[o] === "&" && ++t;
  return t;
}
const ws = /\s*,(?![^(]*\))\s*/g, df = /\s+/g;
function cf(e, t) {
  const o = [];
  return t.split(ws).forEach((r) => {
    let n = sf(r);
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
function uf(e, t) {
  const o = [];
  return t.split(ws).forEach((r) => {
    e.forEach((n) => {
      o.push((n && n + " ") + r);
    });
  }), o;
}
function ff(e) {
  let t = [""];
  return e.forEach((o) => {
    o = o && o.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    o && (o.includes("&") ? t = cf(t, o) : t = uf(t, o));
  }), t.join(", ").replace(df, " ");
}
function Ma(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function Rn(e) {
  return document.querySelector(`style[cssr-id="${e}"]`);
}
function hf(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function qr(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const pf = /[A-Z]/g;
function Ss(e) {
  return e.replace(pf, (t) => "-" + t.toLowerCase());
}
function vf(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((o) => t + `  ${Ss(o[0])}: ${o[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function gf(e, t, o) {
  return typeof e == "function" ? e({
    context: t.context,
    props: o
  }) : e;
}
function Ea(e, t, o, r) {
  if (!t)
    return "";
  const n = gf(t, o, r);
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
    l = Ss(l), s != null && a.push(`  ${l}${vf(s)}`);
  }), e && a.push("}"), a.join(`
`);
}
function Si(e, t, o) {
  e && e.forEach((r) => {
    if (Array.isArray(r))
      Si(r, t, o);
    else if (typeof r == "function") {
      const n = r(t);
      Array.isArray(n) ? Si(n, t, o) : n && o(n);
    } else
      r && o(r);
  });
}
function $s(e, t, o, r, n, i) {
  const a = e.$;
  let l = "";
  if (!a || typeof a == "string")
    qr(a) ? l = a : t.push(a);
  else if (typeof a == "function") {
    const c = a({
      context: r.context,
      props: n
    });
    qr(c) ? l = c : t.push(c);
  } else if (a.before && a.before(r.context), !a.$ || typeof a.$ == "string")
    qr(a.$) ? l = a.$ : t.push(a.$);
  else if (a.$) {
    const c = a.$({
      context: r.context,
      props: n
    });
    qr(c) ? l = c : t.push(c);
  }
  const s = ff(t), d = Ea(s, e.props, r, n);
  l ? (o.push(`${l} {`), i && d && i.insertRule(`${l} {
${d}
}
`)) : (i && d && i.insertRule(d), !i && d.length && o.push(d)), e.children && Si(e.children, {
    context: r.context,
    props: n
  }, (c) => {
    if (typeof c == "string") {
      const u = Ea(s, { raw: c }, r, n);
      i ? i.insertRule(u) : o.push(u);
    } else
      $s(c, t, o, r, n, i);
  }), t.pop(), l && o.push("}"), a && a.after && a.after(r.context);
}
function Ps(e, t, o, r = !1) {
  const n = [];
  return $s(e, [], n, t, o, r ? e.instance.__styleSheet : void 0), r ? "" : n.join(`

`);
}
function kr(e) {
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
function mf(e, t, o) {
  const { els: r } = t;
  if (o === void 0)
    r.forEach(Ma), t.els = [];
  else {
    const n = Rn(o);
    n && r.includes(n) && (Ma(n), t.els = r.filter((i) => i !== n));
  }
}
function _a(e, t) {
  e.push(t);
}
function bf(e, t, o, r, n, i, a, l, s) {
  if (i && !s) {
    if (o === void 0) {
      console.error("[css-render/mount]: `id` is required in `silent` mode.");
      return;
    }
    const h = window.__cssrContext;
    h[o] || (h[o] = !0, Ps(t, e, r, i));
    return;
  }
  let d;
  if (o === void 0 && (d = t.render(r), o = kr(d)), s) {
    s.adapter(o, d ?? t.render(r));
    return;
  }
  const c = Rn(o);
  if (c !== null && !a)
    return c;
  const u = c ?? hf(o);
  if (d === void 0 && (d = t.render(r)), u.textContent = d, c !== null)
    return c;
  if (l) {
    const h = document.head.querySelector(`meta[name="${l}"]`);
    if (h)
      return document.head.insertBefore(u, h), _a(t.els, u), u;
  }
  return n ? document.head.insertBefore(u, document.head.querySelector("style, link")) : document.head.appendChild(u), _a(t.els, u), u;
}
function xf(e) {
  return Ps(this, this.instance, e);
}
function Cf(e = {}) {
  const { id: t, ssr: o, props: r, head: n = !1, silent: i = !1, force: a = !1, anchorMetaName: l } = e;
  return bf(this.instance, this, t, r, n, i, a, l, o);
}
function yf(e = {}) {
  const { id: t } = e;
  mf(this.instance, this, t);
}
const Gr = function(e, t, o, r) {
  return {
    instance: e,
    $: t,
    props: o,
    children: r,
    els: [],
    render: xf,
    mount: Cf,
    unmount: yf
  };
}, wf = function(e, t, o, r) {
  return Array.isArray(t) ? Gr(e, { $: null }, null, t) : Array.isArray(o) ? Gr(e, t, null, o) : Array.isArray(r) ? Gr(e, t, o, r) : Gr(e, t, o, null);
};
function Ts(e = {}) {
  let t = null;
  const o = {
    c: (...r) => wf(o, ...r),
    use: (r, ...n) => r.install(o, ...n),
    find: Rn,
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
function Sf(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: o } } = t;
    return o.has(e);
  }
  return Rn(e) !== null;
}
function $f(e) {
  let t = ".", o = "__", r = "--", n;
  if (e) {
    let f = e.blockPrefix;
    f && (t = f), f = e.elementPrefix, f && (o = f), f = e.modifierPrefix, f && (r = f);
  }
  const i = {
    install(f) {
      n = f.c;
      const b = f.context;
      b.bem = {}, b.bem.b = null, b.bem.els = null;
    }
  };
  function a(f) {
    let b, x;
    return {
      before(p) {
        b = p.bem.b, x = p.bem.els, p.bem.els = null;
      },
      after(p) {
        p.bem.b = b, p.bem.els = x;
      },
      $({ context: p, props: w }) {
        return f = typeof f == "string" ? f : f({ context: p, props: w }), p.bem.b = f, `${(w == null ? void 0 : w.bPrefix) || t}${p.bem.b}`;
      }
    };
  }
  function l(f) {
    let b;
    return {
      before(x) {
        b = x.bem.els;
      },
      after(x) {
        x.bem.els = b;
      },
      $({ context: x, props: p }) {
        return f = typeof f == "string" ? f : f({ context: x, props: p }), x.bem.els = f.split(",").map((w) => w.trim()), x.bem.els.map((w) => `${(p == null ? void 0 : p.bPrefix) || t}${x.bem.b}${o}${w}`).join(", ");
      }
    };
  }
  function s(f) {
    return {
      $({ context: b, props: x }) {
        f = typeof f == "string" ? f : f({ context: b, props: x });
        const p = f.split(",").map((y) => y.trim());
        function w(y) {
          return p.map((T) => `&${(x == null ? void 0 : x.bPrefix) || t}${b.bem.b}${y !== void 0 ? `${o}${y}` : ""}${r}${T}`).join(", ");
        }
        const R = b.bem.els;
        if (R !== null) {
          if (process.env.NODE_ENV !== "production" && R.length >= 2)
            throw Error(`[css-render/plugin-bem]: m(${f}) is invalid, using modifier inside multiple elements is not allowed`);
          return w(R[0]);
        } else
          return w();
      }
    };
  }
  function d(f) {
    return {
      $({ context: b, props: x }) {
        f = typeof f == "string" ? f : f({ context: b, props: x });
        const p = b.bem.els;
        if (process.env.NODE_ENV !== "production" && p !== null && p.length >= 2)
          throw Error(`[css-render/plugin-bem]: notM(${f}) is invalid, using modifier inside multiple elements is not allowed`);
        return `&:not(${(x == null ? void 0 : x.bPrefix) || t}${b.bem.b}${p !== null && p.length > 0 ? `${o}${p[0]}` : ""}${r}${f})`;
      }
    };
  }
  return Object.assign(i, {
    cB: (...f) => n(a(f[0]), f[1], f[2]),
    cE: (...f) => n(l(f[0]), f[1], f[2]),
    cM: (...f) => n(s(f[0]), f[1], f[2]),
    cNotM: (...f) => n(d(f[0]), f[1], f[2])
  }), i;
}
function re(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (o) => o.toUpperCase()));
}
re("abc", "def");
const Pf = "n", bn = `.${Pf}-`, Tf = "__", kf = "--", ks = Ts(), zs = $f({
  blockPrefix: bn,
  elementPrefix: Tf,
  modifierPrefix: kf
});
ks.use(zs);
const { c: N, find: b$ } = ks, { cB: B, cE: A, cM: Q, cNotM: tt } = zs;
function Is(e) {
  return N(({ props: { bPrefix: t } }) => `${t || bn}modal, ${t || bn}drawer`, [e]);
}
function Os(e) {
  return N(({ props: { bPrefix: t } }) => `${t || bn}popover`, [e]);
}
const zf = (...e) => N(">", [B(...e)]);
let Kn;
function If() {
  return Kn === void 0 && (Kn = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Kn;
}
const Fr = typeof document < "u" && typeof window < "u", Of = /* @__PURE__ */ new WeakSet();
function Rf(e) {
  Of.add(e);
}
function Mf(e, t, o) {
  var r;
  const n = De(e, null);
  if (n === null)
    return;
  const i = (r = Br()) === null || r === void 0 ? void 0 : r.proxy;
  Fe(o, a), a(o.value), wt(() => {
    a(void 0, o.value);
  });
  function a(d, c) {
    const u = n[t];
    c !== void 0 && l(u, c), d !== void 0 && s(u, d);
  }
  function l(d, c) {
    d[c] || (d[c] = []), d[c].splice(d[c].findIndex((u) => u === i), 1);
  }
  function s(d, c) {
    d[c] || (d[c] = []), ~d[c].findIndex((u) => u === i) || d[c].push(i);
  }
}
function Ef(e) {
  const t = W(!!e.value);
  if (t.value)
    return vi(t);
  const o = Fe(e, (r) => {
    r && (t.value = !0, o());
  });
  return vi(t);
}
function Ze(e) {
  const t = E(e), o = W(t.value);
  return Fe(t, (r) => {
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
const _f = typeof window < "u";
let Qo, xr;
const Bf = () => {
  var e, t;
  Qo = _f ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, xr = !1, Qo !== void 0 ? Qo.then(() => {
    xr = !0;
  }) : xr = !0;
};
Bf();
function Df(e) {
  if (xr)
    return;
  let t = !1;
  St(() => {
    xr || Qo == null || Qo.then(() => {
      t || e();
    });
  }), wt(() => {
    t = !0;
  });
}
function dn(e) {
  return e.composedPath()[0];
}
const Af = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function Ff(e, t, o) {
  if (e === "mousemoveoutside") {
    const r = (n) => {
      t.contains(dn(n)) || o(n);
    };
    return {
      mousemove: r,
      touchstart: r
    };
  } else if (e === "clickoutside") {
    let r = !1;
    const n = (a) => {
      r = !t.contains(dn(a));
    }, i = (a) => {
      r && (t.contains(dn(a)) || o(a));
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
function Rs(e, t, o) {
  const r = Af[e];
  let n = r.get(t);
  n === void 0 && r.set(t, n = /* @__PURE__ */ new WeakMap());
  let i = n.get(o);
  return i === void 0 && n.set(o, i = Ff(e, t, o)), i;
}
function Hf(e, t, o, r) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const n = Rs(e, t, o);
    return Object.keys(n).forEach((i) => {
      Ye(i, document, n[i], r);
    }), !0;
  }
  return !1;
}
function Lf(e, t, o, r) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const n = Rs(e, t, o);
    return Object.keys(n).forEach((i) => {
      Ge(i, document, n[i], r);
    }), !0;
  }
  return !1;
}
function Wf() {
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
  function n(g, S, $) {
    const P = g[S];
    return g[S] = function() {
      return $.apply(g, arguments), P.apply(g, arguments);
    }, g;
  }
  function i(g, S) {
    g[S] = Event.prototype[S];
  }
  const a = /* @__PURE__ */ new WeakMap(), l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var g;
    return (g = a.get(this)) !== null && g !== void 0 ? g : null;
  }
  function d(g, S) {
    l !== void 0 && Object.defineProperty(g, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: S ?? l.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, u = {};
  function h() {
    const g = function(S) {
      const { type: $, eventPhase: P, bubbles: z } = S, M = dn(S);
      if (P === 2)
        return;
      const F = P === 1 ? "capture" : "bubble";
      let L = M;
      const G = [];
      for (; L === null && (L = window), G.push(L), L !== window; )
        L = L.parentNode || null;
      const K = c.capture[$], O = c.bubble[$];
      if (n(S, "stopPropagation", o), n(S, "stopImmediatePropagation", r), d(S, s), F === "capture") {
        if (K === void 0)
          return;
        for (let X = G.length - 1; X >= 0 && !e.has(S); --X) {
          const _ = G[X], U = K.get(_);
          if (U !== void 0) {
            a.set(S, _);
            for (const ce of U) {
              if (t.has(S))
                break;
              ce(S);
            }
          }
          if (X === 0 && !z && O !== void 0) {
            const ce = O.get(_);
            if (ce !== void 0)
              for (const $e of ce) {
                if (t.has(S))
                  break;
                $e(S);
              }
          }
        }
      } else if (F === "bubble") {
        if (O === void 0)
          return;
        for (let X = 0; X < G.length && !e.has(S); ++X) {
          const _ = G[X], U = O.get(_);
          if (U !== void 0) {
            a.set(S, _);
            for (const ce of U) {
              if (t.has(S))
                break;
              ce(S);
            }
          }
        }
      }
      i(S, "stopPropagation"), i(S, "stopImmediatePropagation"), d(S);
    };
    return g.displayName = "evtdUnifiedHandler", g;
  }
  function v() {
    const g = function(S) {
      const { type: $, eventPhase: P } = S;
      if (P !== 2)
        return;
      const z = u[$];
      z !== void 0 && z.forEach((M) => M(S));
    };
    return g.displayName = "evtdUnifiedWindowEventHandler", g;
  }
  const f = h(), b = v();
  function x(g, S) {
    const $ = c[g];
    return $[S] === void 0 && ($[S] = /* @__PURE__ */ new Map(), window.addEventListener(S, f, g === "capture")), $[S];
  }
  function p(g) {
    return u[g] === void 0 && (u[g] = /* @__PURE__ */ new Set(), window.addEventListener(g, b)), u[g];
  }
  function w(g, S) {
    let $ = g.get(S);
    return $ === void 0 && g.set(S, $ = /* @__PURE__ */ new Set()), $;
  }
  function R(g, S, $, P) {
    const z = c[S][$];
    if (z !== void 0) {
      const M = z.get(g);
      if (M !== void 0 && M.has(P))
        return !0;
    }
    return !1;
  }
  function y(g, S) {
    const $ = u[g];
    return !!($ !== void 0 && $.has(S));
  }
  function T(g, S, $, P) {
    let z;
    if (typeof P == "object" && P.once === !0 ? z = (K) => {
      I(g, S, z, P), $(K);
    } : z = $, Hf(g, S, z, P))
      return;
    const F = P === !0 || typeof P == "object" && P.capture === !0 ? "capture" : "bubble", L = x(F, g), G = w(L, S);
    if (G.has(z) || G.add(z), S === window) {
      const K = p(g);
      K.has(z) || K.add(z);
    }
  }
  function I(g, S, $, P) {
    if (Lf(g, S, $, P))
      return;
    const M = P === !0 || typeof P == "object" && P.capture === !0, F = M ? "capture" : "bubble", L = x(F, g), G = w(L, S);
    if (S === window && !R(S, M ? "bubble" : "capture", g, $) && y(g, $)) {
      const O = u[g];
      O.delete($), O.size === 0 && (window.removeEventListener(g, b), u[g] = void 0);
    }
    G.has($) && G.delete($), G.size === 0 && L.delete(S), L.size === 0 && (window.removeEventListener(g, f, F === "capture"), c[F][g] = void 0);
  }
  return {
    on: T,
    off: I
  };
}
const { on: Ye, off: Ge } = Wf();
function fo(e, t) {
  return Fe(e, (o) => {
    o !== void 0 && (t.value = o);
  }), E(() => e.value === void 0 ? t.value : e.value);
}
function Hr() {
  const e = W(!1);
  return St(() => {
    e.value = !0;
  }), vi(e);
}
function Ms(e, t) {
  return E(() => {
    for (const o of t)
      if (e[o] !== void 0)
        return e[o];
    return e[t[t.length - 1]];
  });
}
const Nf = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function jf() {
  return Nf;
}
const Xi = "n-internal-select-menu", Es = "n-internal-select-menu-body", _s = "n-modal-body", Bs = "n-drawer-body", Ds = "n-popover-body", As = "__disabled__";
function Bt(e) {
  const t = De(_s, null), o = De(Bs, null), r = De(Ds, null), n = De(Es, null), i = W();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    St(() => {
      Ye("fullscreenchange", document, a);
    }), wt(() => {
      Ge("fullscreenchange", document, a);
    });
  }
  return Ze(() => {
    var a;
    const { to: l } = e;
    return l !== void 0 ? l === !1 ? As : l === !0 ? i.value || "body" : l : t != null && t.value ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : o != null && o.value ? o.value : r != null && r.value ? r.value : n != null && n.value ? n.value : l ?? (i.value || "body");
  });
}
Bt.tdkey = As;
Bt.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
function $i(e, t, o = "default") {
  const r = t[o];
  if (r === void 0)
    throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
  return r();
}
function Pi(e, t = !0, o = []) {
  return e.forEach((r) => {
    if (r !== null) {
      if (typeof r != "object") {
        (typeof r == "string" || typeof r == "number") && o.push(ot(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        Pi(r, t, o);
        return;
      }
      if (r.type === oo) {
        if (r.children === null)
          return;
        Array.isArray(r.children) && Pi(r.children, t, o);
      } else
        r.type !== Ui && o.push(r);
    }
  }), o;
}
function Ba(e, t, o = "default") {
  const r = t[o];
  if (r === void 0)
    throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
  const n = Pi(r());
  if (n.length === 1)
    return n[0];
  throw new Error(`[vueuc/${e}]: slot[${o}] should have exactly one child.`);
}
let so = null;
function Fs() {
  if (so === null && (so = document.getElementById("v-binder-view-measurer"), so === null)) {
    so = document.createElement("div"), so.id = "v-binder-view-measurer";
    const { style: e } = so;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(so);
  }
  return so.getBoundingClientRect();
}
function Vf(e, t) {
  const o = Fs();
  return {
    top: t,
    left: e,
    height: 0,
    width: 0,
    right: o.width - e,
    bottom: o.height - t
  };
}
function Yn(e) {
  const t = e.getBoundingClientRect(), o = Fs();
  return {
    left: t.left - o.left,
    top: t.top - o.top,
    bottom: o.height + o.top - t.bottom,
    right: o.width + o.left - t.right,
    width: t.width,
    height: t.height
  };
}
function Uf(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Hs(e) {
  if (e === null)
    return null;
  const t = Uf(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: o, overflowX: r, overflowY: n } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(o + n + r))
      return t;
  }
  return Hs(t);
}
const qf = ge({
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
    Ot("VBinder", (t = Br()) === null || t === void 0 ? void 0 : t.proxy);
    const o = De("VBinder", null), r = W(null), n = (p) => {
      r.value = p, o && e.syncTargetWithParent && o.setTargetRef(p);
    };
    let i = [];
    const a = () => {
      let p = r.value;
      for (; p = Hs(p), p !== null; )
        i.push(p);
      for (const w of i)
        Ye("scroll", w, u, !0);
    }, l = () => {
      for (const p of i)
        Ge("scroll", p, u, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (p) => {
      s.size === 0 && a(), s.has(p) || s.add(p);
    }, c = (p) => {
      s.has(p) && s.delete(p), s.size === 0 && l();
    }, u = () => {
      Cs(h);
    }, h = () => {
      s.forEach((p) => p());
    }, v = /* @__PURE__ */ new Set(), f = (p) => {
      v.size === 0 && Ye("resize", window, x), v.has(p) || v.add(p);
    }, b = (p) => {
      v.has(p) && v.delete(p), v.size === 0 && Ge("resize", window, x);
    }, x = () => {
      v.forEach((p) => p());
    };
    return wt(() => {
      Ge("resize", window, x), l();
    }), {
      targetRef: r,
      setTargetRef: n,
      addScrollListener: d,
      removeScrollListener: c,
      addResizeListener: f,
      removeResizeListener: b
    };
  },
  render() {
    return $i("binder", this.$slots);
  }
}), Zi = qf, Ji = ge({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = De("VBinder");
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
    return e ? Dr(Ba("follower", this.$slots), [
      [t]
    ]) : Ba("follower", this.$slots);
  }
}), jo = "@@mmoContext", Gf = {
  mounted(e, { value: t }) {
    e[jo] = {
      handler: void 0
    }, typeof t == "function" && (e[jo].handler = t, Ye("mousemoveoutside", e, t));
  },
  updated(e, { value: t }) {
    const o = e[jo];
    typeof t == "function" ? o.handler ? o.handler !== t && (Ge("mousemoveoutside", e, o.handler), o.handler = t, Ye("mousemoveoutside", e, t)) : (e[jo].handler = t, Ye("mousemoveoutside", e, t)) : o.handler && (Ge("mousemoveoutside", e, o.handler), o.handler = void 0);
  },
  unmounted(e) {
    const { handler: t } = e[jo];
    t && Ge("mousemoveoutside", e, t), e[jo].handler = void 0;
  }
}, Kf = Gf, Vo = "@@coContext", Yf = {
  mounted(e, { value: t, modifiers: o }) {
    e[Vo] = {
      handler: void 0
    }, typeof t == "function" && (e[Vo].handler = t, Ye("clickoutside", e, t, {
      capture: o.capture
    }));
  },
  updated(e, { value: t, modifiers: o }) {
    const r = e[Vo];
    typeof t == "function" ? r.handler ? r.handler !== t && (Ge("clickoutside", e, r.handler, {
      capture: o.capture
    }), r.handler = t, Ye("clickoutside", e, t, {
      capture: o.capture
    })) : (e[Vo].handler = t, Ye("clickoutside", e, t, {
      capture: o.capture
    })) : r.handler && (Ge("clickoutside", e, r.handler, {
      capture: o.capture
    }), r.handler = void 0);
  },
  unmounted(e, { modifiers: t }) {
    const { handler: o } = e[Vo];
    o && Ge("clickoutside", e, o, {
      capture: t.capture
    }), e[Vo].handler = void 0;
  }
}, xn = Yf;
function Xf(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class Zf {
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
    r.has(t) ? r.delete(t) : o === void 0 && Xf("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const Xn = new Zf(), Uo = "@@ziContext", Jf = {
  mounted(e, t) {
    const { value: o = {} } = t, { zIndex: r, enabled: n } = o;
    e[Uo] = {
      enabled: !!n,
      initialized: !1
    }, n && (Xn.ensureZIndex(e, r), e[Uo].initialized = !0);
  },
  updated(e, t) {
    const { value: o = {} } = t, { zIndex: r, enabled: n } = o, i = e[Uo].enabled;
    n && !i && (Xn.ensureZIndex(e, r), e[Uo].initialized = !0), e[Uo].enabled = !!n;
  },
  unmounted(e, t) {
    if (!e[Uo].initialized)
      return;
    const { value: o = {} } = t, { zIndex: r } = o;
    Xn.unregister(e, r);
  }
}, Ls = Jf, Ws = Symbol("@css-render/vue3-ssr");
function Qf(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function eh(e, t) {
  const o = De(Ws, null);
  if (o === null) {
    console.error("[css-render/vue3-ssr]: no ssr context found.");
    return;
  }
  const { styles: r, ids: n } = o;
  n.has(e) || r !== null && (n.add(e), r.push(Qf(e, t)));
}
const th = typeof document < "u";
function Eo() {
  if (th)
    return;
  const e = De(Ws, null);
  if (e !== null)
    return {
      adapter: eh,
      context: e
    };
}
function Da(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: uo } = Ts(), Qi = "vueuc-style";
function Aa(e) {
  return e & -e;
}
class oh {
  /**
   * @param l length of the array
   * @param min min value of the array
   */
  constructor(t, o) {
    this.l = t, this.min = o;
    const r = new Array(t + 1);
    for (let n = 0; n < t + 1; ++n)
      r[n] = 0;
    this.ft = r;
  }
  /**
   * Add arr[i] by n, start from 0
   * @param i the index of the element to be added
   * @param n the value to be added
   */
  add(t, o) {
    if (o === 0)
      return;
    const { l: r, ft: n } = this;
    for (t += 1; t <= r; )
      n[t] += o, t += Aa(t);
  }
  /**
   * Get the value of index i
   * @param i index
   * @returns value of the index
   */
  get(t) {
    return this.sum(t + 1) - this.sum(t);
  }
  /**
   * Get the sum of first i elements
   * @param i count of head elements to be added
   * @returns the sum of first i elements
   */
  sum(t) {
    if (t === void 0 && (t = this.l), t <= 0)
      return 0;
    const { ft: o, min: r, l: n } = this;
    if (t > n)
      throw new Error("[FinweckTree.sum]: `i` is larger than length.");
    let i = t * r;
    for (; t > 0; )
      i += o[t], t -= Aa(t);
    return i;
  }
  /**
   * Get the largest count of head elements whose sum are <= threshold
   * @param threshold
   * @returns the largest count of head elements whose sum are <= threshold
   */
  getBound(t) {
    let o = 0, r = this.l;
    for (; r > o; ) {
      const n = Math.floor((o + r) / 2), i = this.sum(n);
      if (i > t) {
        r = n;
        continue;
      } else if (i < t) {
        if (o === n)
          return this.sum(o + 1) <= t ? o + 1 : n;
        o = n;
      } else
        return n;
    }
    return o;
  }
}
function Fa(e) {
  return typeof e == "string" ? document.querySelector(e) : e();
}
const rh = ge({
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
      showTeleport: Ef(Te(e, "show")),
      mergedTo: E(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? $i("lazy-teleport", this.$slots) : m(pu, {
      disabled: this.disabled,
      to: this.mergedTo
    }, $i("lazy-teleport", this.$slots)) : null;
  }
}), Kr = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Ha = {
  start: "end",
  center: "center",
  end: "start"
}, Zn = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, nh = {
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
}, ih = {
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
}, ah = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, La = {
  top: !0,
  bottom: !1,
  left: !0,
  right: !1
  // left--
}, Wa = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function lh(e, t, o, r, n, i) {
  if (!n || i)
    return { placement: e, top: 0, left: 0 };
  const [a, l] = e.split("-");
  let s = l ?? "center", d = {
    top: 0,
    left: 0
  };
  const c = (v, f, b) => {
    let x = 0, p = 0;
    const w = o[v] - t[f] - t[v];
    return w > 0 && r && (b ? p = La[f] ? w : -w : x = La[f] ? w : -w), {
      left: x,
      top: p
    };
  }, u = a === "left" || a === "right";
  if (s !== "center") {
    const v = ah[e], f = Kr[v], b = Zn[v];
    if (o[b] > t[b]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[v] + t[b] < o[b]
      ) {
        const x = (o[b] - t[b]) / 2;
        t[v] < x || t[f] < x ? t[v] < t[f] ? (s = Ha[l], d = c(b, f, u)) : d = c(b, v, u) : s = "center";
      }
    } else
      o[b] < t[b] && t[f] < 0 && // opposite align has larger space
      // ------------[   target   ]
      // ----------------[follower]
      t[v] > t[f] && (s = Ha[l]);
  } else {
    const v = a === "bottom" || a === "top" ? "left" : "top", f = Kr[v], b = Zn[v], x = (o[b] - t[b]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[v] < x || t[f] < x) && (t[v] > t[f] ? (s = Wa[v], d = c(b, v, u)) : (s = Wa[f], d = c(b, f, u)));
  }
  let h = a;
  return (
    // space is not enough
    t[a] < o[Zn[a]] && // opposite position's space is larger
    t[a] < t[Kr[a]] && (h = Kr[a]), {
      placement: s !== "center" ? `${h}-${s}` : h,
      left: d.left,
      top: d.top
    }
  );
}
function sh(e, t) {
  return t ? ih[e] : nh[e];
}
function dh(e, t, o, r, n, i) {
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
const ch = uo([
  uo(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  uo(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    uo("> *", {
      pointerEvents: "all"
    })
  ])
]), ea = ge({
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
    const t = De("VBinder"), o = Ze(() => e.enabled !== void 0 ? e.enabled : e.show), r = W(null), n = W(null), i = () => {
      const { syncTrigger: h } = e;
      h.includes("scroll") && t.addScrollListener(s), h.includes("resize") && t.addResizeListener(s);
    }, a = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    St(() => {
      o.value && (s(), i());
    });
    const l = Eo();
    ch.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: Qi,
      ssr: l
    }), wt(() => {
      a();
    }), Df(() => {
      o.value && s();
    });
    const s = () => {
      if (!o.value)
        return;
      const h = r.value;
      if (h === null)
        return;
      const v = t.targetRef, { x: f, y: b, overlap: x } = e, p = f !== void 0 && b !== void 0 ? Vf(f, b) : Yn(v);
      h.style.setProperty("--v-target-width", `${Math.round(p.width)}px`), h.style.setProperty("--v-target-height", `${Math.round(p.height)}px`);
      const { width: w, minWidth: R, placement: y, internalShift: T, flip: I } = e;
      h.setAttribute("v-placement", y), x ? h.setAttribute("v-overlap", "") : h.removeAttribute("v-overlap");
      const { style: g } = h;
      w === "target" ? g.width = `${p.width}px` : w !== void 0 ? g.width = w : g.width = "", R === "target" ? g.minWidth = `${p.width}px` : R !== void 0 ? g.minWidth = R : g.minWidth = "";
      const S = Yn(h), $ = Yn(n.value), { left: P, top: z, placement: M } = lh(y, p, S, T, I, x), F = sh(M, x), { left: L, top: G, transform: K } = dh(M, $, p, z, P, x);
      h.setAttribute("v-placement", M), h.style.setProperty("--v-offset-left", `${Math.round(P)}px`), h.style.setProperty("--v-offset-top", `${Math.round(z)}px`), h.style.transform = `translateX(${L}) translateY(${G}) ${K}`, h.style.setProperty("--v-transform-origin", F), h.style.transformOrigin = F;
    };
    Fe(o, (h) => {
      h ? (i(), d()) : a();
    });
    const d = () => {
      It().then(s).catch((h) => console.error(h));
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
    ].forEach((h) => {
      Fe(Te(e, h), s);
    }), ["teleportDisabled"].forEach((h) => {
      Fe(Te(e, h), d);
    }), Fe(Te(e, "syncTrigger"), (h) => {
      h.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), h.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = Hr(), u = Ze(() => {
      const { to: h } = e;
      if (h !== void 0)
        return h;
      c.value;
    });
    return {
      VBinder: t,
      mergedEnabled: o,
      offsetContainerRef: n,
      followerRef: r,
      mergedTo: u,
      syncPosition: s
    };
  },
  render() {
    return m(rh, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var e, t;
        const o = m("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          m("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
        ]);
        return this.zindexable ? Dr(o, [
          [
            Ls,
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
var Io = [], uh = function() {
  return Io.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, fh = function() {
  return Io.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, Na = "ResizeObserver loop completed with undelivered notifications.", hh = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: Na
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Na), window.dispatchEvent(e);
}, zr;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(zr || (zr = {}));
var Oo = function(e) {
  return Object.freeze(e);
}, ph = function() {
  function e(t, o) {
    this.inlineSize = t, this.blockSize = o, Oo(this);
  }
  return e;
}(), Ns = function() {
  function e(t, o, r, n) {
    return this.x = t, this.y = o, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Oo(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, o = t.x, r = t.y, n = t.top, i = t.right, a = t.bottom, l = t.left, s = t.width, d = t.height;
    return { x: o, y: r, top: n, right: i, bottom: a, left: l, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), ta = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, js = function(e) {
  if (ta(e)) {
    var t = e.getBBox(), o = t.width, r = t.height;
    return !o && !r;
  }
  var n = e, i = n.offsetWidth, a = n.offsetHeight;
  return !(i || a || e.getClientRects().length);
}, ja = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var o = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(o && e instanceof o.Element);
}, vh = function(e) {
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
}, Cr = typeof window < "u" ? window : {}, Yr = /* @__PURE__ */ new WeakMap(), Va = /auto|scroll/, gh = /^tb|vertical/, mh = /msie|trident/i.test(Cr.navigator && Cr.navigator.userAgent), Nt = function(e) {
  return parseFloat(e || "0");
}, er = function(e, t, o) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), o === void 0 && (o = !1), new ph((o ? t : e) || 0, (o ? e : t) || 0);
}, Ua = Oo({
  devicePixelContentBoxSize: er(),
  borderBoxSize: er(),
  contentBoxSize: er(),
  contentRect: new Ns(0, 0, 0, 0)
}), Vs = function(e, t) {
  if (t === void 0 && (t = !1), Yr.has(e) && !t)
    return Yr.get(e);
  if (js(e))
    return Yr.set(e, Ua), Ua;
  var o = getComputedStyle(e), r = ta(e) && e.ownerSVGElement && e.getBBox(), n = !mh && o.boxSizing === "border-box", i = gh.test(o.writingMode || ""), a = !r && Va.test(o.overflowY || ""), l = !r && Va.test(o.overflowX || ""), s = r ? 0 : Nt(o.paddingTop), d = r ? 0 : Nt(o.paddingRight), c = r ? 0 : Nt(o.paddingBottom), u = r ? 0 : Nt(o.paddingLeft), h = r ? 0 : Nt(o.borderTopWidth), v = r ? 0 : Nt(o.borderRightWidth), f = r ? 0 : Nt(o.borderBottomWidth), b = r ? 0 : Nt(o.borderLeftWidth), x = u + d, p = s + c, w = b + v, R = h + f, y = l ? e.offsetHeight - R - e.clientHeight : 0, T = a ? e.offsetWidth - w - e.clientWidth : 0, I = n ? x + w : 0, g = n ? p + R : 0, S = r ? r.width : Nt(o.width) - I - T, $ = r ? r.height : Nt(o.height) - g - y, P = S + x + T + w, z = $ + p + y + R, M = Oo({
    devicePixelContentBoxSize: er(Math.round(S * devicePixelRatio), Math.round($ * devicePixelRatio), i),
    borderBoxSize: er(P, z, i),
    contentBoxSize: er(S, $, i),
    contentRect: new Ns(u, s, S, $)
  });
  return Yr.set(e, M), M;
}, Us = function(e, t, o) {
  var r = Vs(e, o), n = r.borderBoxSize, i = r.contentBoxSize, a = r.devicePixelContentBoxSize;
  switch (t) {
    case zr.DEVICE_PIXEL_CONTENT_BOX:
      return a;
    case zr.BORDER_BOX:
      return n;
    default:
      return i;
  }
}, bh = function() {
  function e(t) {
    var o = Vs(t);
    this.target = t, this.contentRect = o.contentRect, this.borderBoxSize = Oo([o.borderBoxSize]), this.contentBoxSize = Oo([o.contentBoxSize]), this.devicePixelContentBoxSize = Oo([o.devicePixelContentBoxSize]);
  }
  return e;
}(), qs = function(e) {
  if (js(e))
    return 1 / 0;
  for (var t = 0, o = e.parentNode; o; )
    t += 1, o = o.parentNode;
  return t;
}, xh = function() {
  var e = 1 / 0, t = [];
  Io.forEach(function(a) {
    if (a.activeTargets.length !== 0) {
      var l = [];
      a.activeTargets.forEach(function(d) {
        var c = new bh(d.target), u = qs(d.target);
        l.push(c), d.lastReportedSize = Us(d.target, d.observedBox), u < e && (e = u);
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
}, qa = function(e) {
  Io.forEach(function(o) {
    o.activeTargets.splice(0, o.activeTargets.length), o.skippedTargets.splice(0, o.skippedTargets.length), o.observationTargets.forEach(function(n) {
      n.isActive() && (qs(n.target) > e ? o.activeTargets.push(n) : o.skippedTargets.push(n));
    });
  });
}, Ch = function() {
  var e = 0;
  for (qa(e); uh(); )
    e = xh(), qa(e);
  return fh() && hh(), e > 0;
}, Jn, Gs = [], yh = function() {
  return Gs.splice(0).forEach(function(e) {
    return e();
  });
}, wh = function(e) {
  if (!Jn) {
    var t = 0, o = document.createTextNode(""), r = { characterData: !0 };
    new MutationObserver(function() {
      return yh();
    }).observe(o, r), Jn = function() {
      o.textContent = "".concat(t ? t-- : t++);
    };
  }
  Gs.push(e), Jn();
}, Sh = function(e) {
  wh(function() {
    requestAnimationFrame(e);
  });
}, cn = 0, $h = function() {
  return !!cn;
}, Ph = 250, Th = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Ga = [
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
], Ka = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, Qn = !1, kh = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var o = this;
    if (t === void 0 && (t = Ph), !Qn) {
      Qn = !0;
      var r = Ka(t);
      Sh(function() {
        var n = !1;
        try {
          n = Ch();
        } finally {
          if (Qn = !1, t = r - Ka(), !$h())
            return;
          n ? o.run(1e3) : t > 0 ? o.run(t) : o.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, o = function() {
      return t.observer && t.observer.observe(document.body, Th);
    };
    document.body ? o() : Cr.addEventListener("DOMContentLoaded", o);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Ga.forEach(function(o) {
      return Cr.addEventListener(o, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), Ga.forEach(function(o) {
      return Cr.removeEventListener(o, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), Ti = new kh(), Ya = function(e) {
  !cn && e > 0 && Ti.start(), cn += e, !cn && Ti.stop();
}, zh = function(e) {
  return !ta(e) && !vh(e) && getComputedStyle(e).display === "inline";
}, Ih = function() {
  function e(t, o) {
    this.target = t, this.observedBox = o || zr.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = Us(this.target, this.observedBox, !0);
    return zh(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), Oh = function() {
  function e(t, o) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = o;
  }
  return e;
}(), Xr = /* @__PURE__ */ new WeakMap(), Xa = function(e, t) {
  for (var o = 0; o < e.length; o += 1)
    if (e[o].target === t)
      return o;
  return -1;
}, Zr = function() {
  function e() {
  }
  return e.connect = function(t, o) {
    var r = new Oh(t, o);
    Xr.set(t, r);
  }, e.observe = function(t, o, r) {
    var n = Xr.get(t), i = n.observationTargets.length === 0;
    Xa(n.observationTargets, o) < 0 && (i && Io.push(n), n.observationTargets.push(new Ih(o, r && r.box)), Ya(1), Ti.schedule());
  }, e.unobserve = function(t, o) {
    var r = Xr.get(t), n = Xa(r.observationTargets, o), i = r.observationTargets.length === 1;
    n >= 0 && (i && Io.splice(Io.indexOf(r), 1), r.observationTargets.splice(n, 1), Ya(-1));
  }, e.disconnect = function(t) {
    var o = this, r = Xr.get(t);
    r.observationTargets.slice().forEach(function(n) {
      return o.unobserve(t, n.target);
    }), r.activeTargets.splice(0, r.activeTargets.length);
  }, e;
}(), Rh = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Zr.connect(this, t);
  }
  return e.prototype.observe = function(t, o) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!ja(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Zr.observe(this, t, o);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!ja(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Zr.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Zr.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class Mh {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Rh)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
const Cn = new Mh(), Ir = ge({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const o = Br().proxy;
    function r(n) {
      const { onResize: i } = e;
      i !== void 0 && i(n);
    }
    St(() => {
      const n = o.$el;
      if (n === void 0) {
        Da("resize-observer", "$el does not exist.");
        return;
      }
      if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
        Da("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      n.nextElementSibling !== null && (Cn.registerHandler(n.nextElementSibling, r), t = !0);
    }), wt(() => {
      t && Cn.unregisterHandler(o.$el.nextElementSibling);
    });
  },
  render() {
    return Ql(this.$slots, "default");
  }
});
let Jr;
function Eh() {
  return Jr === void 0 && ("matchMedia" in window ? Jr = window.matchMedia("(pointer:coarse)").matches : Jr = !1), Jr;
}
let ei;
function Za() {
  return ei === void 0 && (ei = "chrome" in window ? window.devicePixelRatio : 1), ei;
}
const _h = uo(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  uo("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    uo("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), Bh = ge({
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
    const t = Eo();
    _h.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: Qi,
      ssr: t
    }), St(() => {
      const { defaultScrollIndex: z, defaultScrollKey: M } = e;
      z != null ? f({ index: z }) : M != null && f({ key: M });
    });
    let o = !1, r = !1;
    es(() => {
      if (o = !1, !r) {
        r = !0;
        return;
      }
      f({ top: u.value, left: c });
    }), ts(() => {
      o = !0, r || (r = !0);
    });
    const n = E(() => {
      const z = /* @__PURE__ */ new Map(), { keyField: M } = e;
      return e.items.forEach((F, L) => {
        z.set(F[M], L);
      }), z;
    }), i = W(null), a = W(void 0), l = /* @__PURE__ */ new Map(), s = E(() => {
      const { items: z, itemSize: M, keyField: F } = e, L = new oh(z.length, M);
      return z.forEach((G, K) => {
        const O = G[F], X = l.get(O);
        X !== void 0 && L.add(K, X);
      }), L;
    }), d = W(0);
    let c = 0;
    const u = W(0), h = Ze(() => Math.max(s.value.getBound(u.value - Pr(e.paddingTop)) - 1, 0)), v = E(() => {
      const { value: z } = a;
      if (z === void 0)
        return [];
      const { items: M, itemSize: F } = e, L = h.value, G = Math.min(L + Math.ceil(z / F + 1), M.length - 1), K = [];
      for (let O = L; O <= G; ++O)
        K.push(M[O]);
      return K;
    }), f = (z, M) => {
      if (typeof z == "number") {
        w(z, M, "auto");
        return;
      }
      const { left: F, top: L, index: G, key: K, position: O, behavior: X, debounce: _ = !0 } = z;
      if (F !== void 0 || L !== void 0)
        w(F, L, X);
      else if (G !== void 0)
        p(G, X, _);
      else if (K !== void 0) {
        const U = n.value.get(K);
        U !== void 0 && p(U, X, _);
      } else
        O === "bottom" ? w(0, Number.MAX_SAFE_INTEGER, X) : O === "top" && w(0, 0, X);
    };
    let b, x = null;
    function p(z, M, F) {
      const { value: L } = s, G = L.sum(z) + Pr(e.paddingTop);
      if (!F)
        i.value.scrollTo({
          left: 0,
          top: G,
          behavior: M
        });
      else {
        b = z, x !== null && window.clearTimeout(x), x = window.setTimeout(() => {
          b = void 0, x = null;
        }, 16);
        const { scrollTop: K, offsetHeight: O } = i.value;
        if (G > K) {
          const X = L.get(z);
          G + X <= K + O || i.value.scrollTo({
            left: 0,
            top: G + X - O,
            behavior: M
          });
        } else
          i.value.scrollTo({
            left: 0,
            top: G,
            behavior: M
          });
      }
    }
    function w(z, M, F) {
      i.value.scrollTo({
        left: z,
        top: M,
        behavior: F
      });
    }
    function R(z, M) {
      var F, L, G;
      if (o || e.ignoreItemResize || P(M.target))
        return;
      const { value: K } = s, O = n.value.get(z), X = K.get(O), _ = (G = (L = (F = M.borderBoxSize) === null || F === void 0 ? void 0 : F[0]) === null || L === void 0 ? void 0 : L.blockSize) !== null && G !== void 0 ? G : M.contentRect.height;
      if (_ === X)
        return;
      _ - e.itemSize === 0 ? l.delete(z) : l.set(z, _ - e.itemSize);
      const ce = _ - X;
      if (ce === 0)
        return;
      K.add(O, ce);
      const $e = i.value;
      if ($e != null) {
        if (b === void 0) {
          const Oe = K.sum(O);
          $e.scrollTop > Oe && $e.scrollBy(0, ce);
        } else if (O < b)
          $e.scrollBy(0, ce);
        else if (O === b) {
          const Oe = K.sum(O);
          _ + Oe > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          $e.scrollTop + $e.offsetHeight && $e.scrollBy(0, ce);
        }
        $();
      }
      d.value++;
    }
    const y = !Eh();
    let T = !1;
    function I(z) {
      var M;
      (M = e.onScroll) === null || M === void 0 || M.call(e, z), (!y || !T) && $();
    }
    function g(z) {
      var M;
      if ((M = e.onWheel) === null || M === void 0 || M.call(e, z), y) {
        const F = i.value;
        if (F != null) {
          if (z.deltaX === 0 && (F.scrollTop === 0 && z.deltaY <= 0 || F.scrollTop + F.offsetHeight >= F.scrollHeight && z.deltaY >= 0))
            return;
          z.preventDefault(), F.scrollTop += z.deltaY / Za(), F.scrollLeft += z.deltaX / Za(), $(), T = !0, Cs(() => {
            T = !1;
          });
        }
      }
    }
    function S(z) {
      if (o || P(z.target) || z.contentRect.height === a.value)
        return;
      a.value = z.contentRect.height;
      const { onResize: M } = e;
      M !== void 0 && M(z);
    }
    function $() {
      const { value: z } = i;
      z != null && (u.value = z.scrollTop, c = z.scrollLeft);
    }
    function P(z) {
      let M = z;
      for (; M !== null; ) {
        if (M.style.display === "none")
          return !0;
        M = M.parentElement;
      }
      return !1;
    }
    return {
      listHeight: a,
      listStyle: {
        overflow: "auto"
      },
      keyToIndex: n,
      itemsStyle: E(() => {
        const { itemResizable: z } = e, M = Ur(s.value.sum());
        return d.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            height: z ? "" : M,
            minHeight: z ? M : "",
            paddingTop: Ur(e.paddingTop),
            paddingBottom: Ur(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: E(() => (d.value, {
        transform: `translateY(${Ur(s.value.sum(h.value))})`
      })),
      viewportItems: v,
      listElRef: i,
      itemsElRef: W(null),
      scrollTo: f,
      handleListResize: S,
      handleListScroll: I,
      handleListWheel: g,
      handleItemResize: R
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: o, visibleItemsTag: r } = this;
    return m(Ir, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var n, i;
        return m("div", qi(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? m("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            m(r, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => this.viewportItems.map((a) => {
                const l = a[t], s = o.get(l), d = this.$slots.default({
                  item: a,
                  index: s
                })[0];
                return e ? m(Ir, {
                  key: l,
                  onResize: (c) => this.handleItemResize(l, c)
                }, {
                  default: () => d
                }) : (d.key = l, d);
              })
            })
          ]) : (i = (n = this.$slots).empty) === null || i === void 0 ? void 0 : i.call(n)
        ]);
      }
    });
  }
}), xo = "v-hidden", Dh = uo("[v-hidden]", {
  display: "none!important"
}), Ja = ge({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const o = W(null), r = W(null);
    function n() {
      const { value: a } = o, { getCounter: l, getTail: s } = e;
      let d;
      if (l !== void 0 ? d = l() : d = r.value, !a || !d)
        return;
      d.hasAttribute(xo) && d.removeAttribute(xo);
      const { children: c } = a, u = a.offsetWidth, h = [], v = t.tail ? s == null ? void 0 : s() : null;
      let f = v ? v.offsetWidth : 0, b = !1;
      const x = a.children.length - (t.tail ? 1 : 0);
      for (let w = 0; w < x - 1; ++w) {
        if (w < 0)
          continue;
        const R = c[w];
        if (b) {
          R.hasAttribute(xo) || R.setAttribute(xo, "");
          continue;
        } else
          R.hasAttribute(xo) && R.removeAttribute(xo);
        const y = R.offsetWidth;
        if (f += y, h[w] = y, f > u) {
          const { updateCounter: T } = e;
          for (let I = w; I >= 0; --I) {
            const g = x - 1 - I;
            T !== void 0 ? T(g) : d.textContent = `${g}`;
            const S = d.offsetWidth;
            if (f -= h[I], f + S <= u || I === 0) {
              b = !0, w = I - 1, v && (w === -1 ? (v.style.maxWidth = `${u - S}px`, v.style.boxSizing = "border-box") : v.style.maxWidth = "");
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: p } = e;
      b ? p !== void 0 && p(!0) : (p !== void 0 && p(!1), d.setAttribute(xo, ""));
    }
    const i = Eo();
    return Dh.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: Qi,
      ssr: i
    }), St(n), {
      selfRef: o,
      counterRef: r,
      sync: n
    };
  },
  render() {
    const { $slots: e } = this;
    return It(this.sync), m("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      Ql(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : m("span", {
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
function Ks(e) {
  return e instanceof HTMLElement;
}
function Ys(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const o = e.childNodes[t];
    if (Ks(o) && (Zs(o) || Ys(o)))
      return !0;
  }
  return !1;
}
function Xs(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const o = e.childNodes[t];
    if (Ks(o) && (Zs(o) || Xs(o)))
      return !0;
  }
  return !1;
}
function Zs(e) {
  if (!Ah(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function Ah(e) {
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
let sr = [];
const Fh = ge({
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
    const t = vn(), o = W(null), r = W(null);
    let n = !1, i = !1;
    const a = typeof document > "u" ? null : document.activeElement;
    function l() {
      return sr[sr.length - 1] === t;
    }
    function s(x) {
      var p;
      x.code === "Escape" && l() && ((p = e.onEsc) === null || p === void 0 || p.call(e, x));
    }
    St(() => {
      Fe(() => e.active, (x) => {
        x ? (u(), Ye("keydown", document, s)) : (Ge("keydown", document, s), n && h());
      }, {
        immediate: !0
      });
    }), wt(() => {
      Ge("keydown", document, s), n && h();
    });
    function d(x) {
      if (!i && l()) {
        const p = c();
        if (p === null || p.contains($r(x)))
          return;
        v("first");
      }
    }
    function c() {
      const x = o.value;
      if (x === null)
        return null;
      let p = x;
      for (; p = p.nextSibling, !(p === null || p instanceof Element && p.tagName === "DIV"); )
        ;
      return p;
    }
    function u() {
      var x;
      if (!e.disabled) {
        if (sr.push(t), e.autoFocus) {
          const { initialFocusTo: p } = e;
          p === void 0 ? v("first") : (x = Fa(p)) === null || x === void 0 || x.focus({ preventScroll: !0 });
        }
        n = !0, document.addEventListener("focus", d, !0);
      }
    }
    function h() {
      var x;
      if (e.disabled || (document.removeEventListener("focus", d, !0), sr = sr.filter((w) => w !== t), l()))
        return;
      const { finalFocusTo: p } = e;
      p !== void 0 ? (x = Fa(p)) === null || x === void 0 || x.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = !0, a.focus({ preventScroll: !0 }), i = !1);
    }
    function v(x) {
      if (l() && e.active) {
        const p = o.value, w = r.value;
        if (p !== null && w !== null) {
          const R = c();
          if (R == null || R === w) {
            i = !0, p.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const y = x === "first" ? Ys(R) : Xs(R);
          i = !1, y || (i = !0, p.focus({ preventScroll: !0 }), i = !1);
        }
      }
    }
    function f(x) {
      if (i)
        return;
      const p = c();
      p !== null && (x.relatedTarget !== null && p.contains(x.relatedTarget) ? v("last") : v("first"));
    }
    function b(x) {
      i || (x.relatedTarget !== null && x.relatedTarget === o.value ? v("last") : v("first"));
    }
    return {
      focusableStartRef: o,
      focusableEndRef: r,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus: f,
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
    return m(oo, null, [
      m("div", {
        "aria-hidden": "true",
        tabindex: t ? "0" : "-1",
        ref: "focusableStartRef",
        style: o,
        onFocus: this.handleStartFocus
      }),
      e(),
      m("div", {
        "aria-hidden": "true",
        style: o,
        ref: "focusableEndRef",
        tabindex: t ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
});
function Js(e, t) {
  t && (St(() => {
    const { value: o } = e;
    o && Cn.registerHandler(o, t);
  }), wt(() => {
    const { value: o } = e;
    o && Cn.unregisterHandler(o);
  }));
}
function Hh(e) {
  const t = { isDeactivated: !1 };
  let o = !1;
  return es(() => {
    if (t.isDeactivated = !1, !o) {
      o = !0;
      return;
    }
    e();
  }), ts(() => {
    t.isDeactivated = !0, o || (o = !0);
  }), t;
}
const ki = "n-form-item";
function _o(e, { defaultSize: t = "medium", mergedSize: o, mergedDisabled: r } = {}) {
  const n = De(ki, null);
  Ot(ki, null);
  const i = E(o ? () => o(n) : () => {
    const { size: s } = e;
    if (s)
      return s;
    if (n) {
      const { mergedSize: d } = n;
      if (d.value !== void 0)
        return d.value;
    }
    return t;
  }), a = E(r ? () => r(n) : () => {
    const { disabled: s } = e;
    return s !== void 0 ? s : n ? n.disabled.value : !1;
  }), l = E(() => {
    const { status: s } = e;
    return s || (n == null ? void 0 : n.mergedValidationStatus.value);
  });
  return wt(() => {
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
var Lh = typeof global == "object" && global && global.Object === Object && global;
const Qs = Lh;
var Wh = typeof self == "object" && self && self.Object === Object && self, Nh = Qs || Wh || Function("return this")();
const qt = Nh;
var jh = qt.Symbol;
const ho = jh;
var ed = Object.prototype, Vh = ed.hasOwnProperty, Uh = ed.toString, dr = ho ? ho.toStringTag : void 0;
function qh(e) {
  var t = Vh.call(e, dr), o = e[dr];
  try {
    e[dr] = void 0;
    var r = !0;
  } catch {
  }
  var n = Uh.call(e);
  return r && (t ? e[dr] = o : delete e[dr]), n;
}
var Gh = Object.prototype, Kh = Gh.toString;
function Yh(e) {
  return Kh.call(e);
}
var Xh = "[object Null]", Zh = "[object Undefined]", Qa = ho ? ho.toStringTag : void 0;
function Bo(e) {
  return e == null ? e === void 0 ? Zh : Xh : Qa && Qa in Object(e) ? qh(e) : Yh(e);
}
function po(e) {
  return e != null && typeof e == "object";
}
var Jh = "[object Symbol]";
function oa(e) {
  return typeof e == "symbol" || po(e) && Bo(e) == Jh;
}
function td(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length, n = Array(r); ++o < r; )
    n[o] = t(e[o], o, e);
  return n;
}
var Qh = Array.isArray;
const Dt = Qh;
var ep = 1 / 0, el = ho ? ho.prototype : void 0, tl = el ? el.toString : void 0;
function od(e) {
  if (typeof e == "string")
    return e;
  if (Dt(e))
    return td(e, od) + "";
  if (oa(e))
    return tl ? tl.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -ep ? "-0" : t;
}
function vo(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function ra(e) {
  return e;
}
var tp = "[object AsyncFunction]", op = "[object Function]", rp = "[object GeneratorFunction]", np = "[object Proxy]";
function na(e) {
  if (!vo(e))
    return !1;
  var t = Bo(e);
  return t == op || t == rp || t == tp || t == np;
}
var ip = qt["__core-js_shared__"];
const ti = ip;
var ol = function() {
  var e = /[^.]+$/.exec(ti && ti.keys && ti.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function ap(e) {
  return !!ol && ol in e;
}
var lp = Function.prototype, sp = lp.toString;
function Do(e) {
  if (e != null) {
    try {
      return sp.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var dp = /[\\^$.*+?()[\]{}|]/g, cp = /^\[object .+?Constructor\]$/, up = Function.prototype, fp = Object.prototype, hp = up.toString, pp = fp.hasOwnProperty, vp = RegExp(
  "^" + hp.call(pp).replace(dp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function gp(e) {
  if (!vo(e) || ap(e))
    return !1;
  var t = na(e) ? vp : cp;
  return t.test(Do(e));
}
function mp(e, t) {
  return e == null ? void 0 : e[t];
}
function Ao(e, t) {
  var o = mp(e, t);
  return gp(o) ? o : void 0;
}
var bp = Ao(qt, "WeakMap");
const zi = bp;
var rl = Object.create, xp = function() {
  function e() {
  }
  return function(t) {
    if (!vo(t))
      return {};
    if (rl)
      return rl(t);
    e.prototype = t;
    var o = new e();
    return e.prototype = void 0, o;
  };
}();
const Cp = xp;
function yp(e, t, o) {
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
function wp(e, t) {
  var o = -1, r = e.length;
  for (t || (t = Array(r)); ++o < r; )
    t[o] = e[o];
  return t;
}
var Sp = 800, $p = 16, Pp = Date.now;
function Tp(e) {
  var t = 0, o = 0;
  return function() {
    var r = Pp(), n = $p - (r - o);
    if (o = r, n > 0) {
      if (++t >= Sp)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function kp(e) {
  return function() {
    return e;
  };
}
var zp = function() {
  try {
    var e = Ao(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const yn = zp;
var Ip = yn ? function(e, t) {
  return yn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: kp(t),
    writable: !0
  });
} : ra;
const Op = Ip;
var Rp = Tp(Op);
const Mp = Rp;
var Ep = 9007199254740991, _p = /^(?:0|[1-9]\d*)$/;
function ia(e, t) {
  var o = typeof e;
  return t = t ?? Ep, !!t && (o == "number" || o != "symbol" && _p.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function aa(e, t, o) {
  t == "__proto__" && yn ? yn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: o,
    writable: !0
  }) : e[t] = o;
}
function Lr(e, t) {
  return e === t || e !== e && t !== t;
}
var Bp = Object.prototype, Dp = Bp.hasOwnProperty;
function Ap(e, t, o) {
  var r = e[t];
  (!(Dp.call(e, t) && Lr(r, o)) || o === void 0 && !(t in e)) && aa(e, t, o);
}
function Fp(e, t, o, r) {
  var n = !o;
  o || (o = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var l = t[i], s = r ? r(o[l], e[l], l, o, e) : void 0;
    s === void 0 && (s = e[l]), n ? aa(o, l, s) : Ap(o, l, s);
  }
  return o;
}
var nl = Math.max;
function Hp(e, t, o) {
  return t = nl(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, n = -1, i = nl(r.length - t, 0), a = Array(i); ++n < i; )
      a[n] = r[t + n];
    n = -1;
    for (var l = Array(t + 1); ++n < t; )
      l[n] = r[n];
    return l[t] = o(a), yp(e, this, l);
  };
}
function Lp(e, t) {
  return Mp(Hp(e, t, ra), e + "");
}
var Wp = 9007199254740991;
function la(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Wp;
}
function rr(e) {
  return e != null && la(e.length) && !na(e);
}
function Np(e, t, o) {
  if (!vo(o))
    return !1;
  var r = typeof t;
  return (r == "number" ? rr(o) && ia(t, o.length) : r == "string" && t in o) ? Lr(o[t], e) : !1;
}
function jp(e) {
  return Lp(function(t, o) {
    var r = -1, n = o.length, i = n > 1 ? o[n - 1] : void 0, a = n > 2 ? o[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, a && Np(o[0], o[1], a) && (i = n < 3 ? void 0 : i, n = 1), t = Object(t); ++r < n; ) {
      var l = o[r];
      l && e(t, l, r, i);
    }
    return t;
  });
}
var Vp = Object.prototype;
function sa(e) {
  var t = e && e.constructor, o = typeof t == "function" && t.prototype || Vp;
  return e === o;
}
function Up(e, t) {
  for (var o = -1, r = Array(e); ++o < e; )
    r[o] = t(o);
  return r;
}
var qp = "[object Arguments]";
function il(e) {
  return po(e) && Bo(e) == qp;
}
var rd = Object.prototype, Gp = rd.hasOwnProperty, Kp = rd.propertyIsEnumerable, Yp = il(function() {
  return arguments;
}()) ? il : function(e) {
  return po(e) && Gp.call(e, "callee") && !Kp.call(e, "callee");
};
const wn = Yp;
function Xp() {
  return !1;
}
var nd = typeof exports == "object" && exports && !exports.nodeType && exports, al = nd && typeof module == "object" && module && !module.nodeType && module, Zp = al && al.exports === nd, ll = Zp ? qt.Buffer : void 0, Jp = ll ? ll.isBuffer : void 0, Qp = Jp || Xp;
const Sn = Qp;
var ev = "[object Arguments]", tv = "[object Array]", ov = "[object Boolean]", rv = "[object Date]", nv = "[object Error]", iv = "[object Function]", av = "[object Map]", lv = "[object Number]", sv = "[object Object]", dv = "[object RegExp]", cv = "[object Set]", uv = "[object String]", fv = "[object WeakMap]", hv = "[object ArrayBuffer]", pv = "[object DataView]", vv = "[object Float32Array]", gv = "[object Float64Array]", mv = "[object Int8Array]", bv = "[object Int16Array]", xv = "[object Int32Array]", Cv = "[object Uint8Array]", yv = "[object Uint8ClampedArray]", wv = "[object Uint16Array]", Sv = "[object Uint32Array]", qe = {};
qe[vv] = qe[gv] = qe[mv] = qe[bv] = qe[xv] = qe[Cv] = qe[yv] = qe[wv] = qe[Sv] = !0;
qe[ev] = qe[tv] = qe[hv] = qe[ov] = qe[pv] = qe[rv] = qe[nv] = qe[iv] = qe[av] = qe[lv] = qe[sv] = qe[dv] = qe[cv] = qe[uv] = qe[fv] = !1;
function $v(e) {
  return po(e) && la(e.length) && !!qe[Bo(e)];
}
function Pv(e) {
  return function(t) {
    return e(t);
  };
}
var id = typeof exports == "object" && exports && !exports.nodeType && exports, yr = id && typeof module == "object" && module && !module.nodeType && module, Tv = yr && yr.exports === id, oi = Tv && Qs.process, kv = function() {
  try {
    var e = yr && yr.require && yr.require("util").types;
    return e || oi && oi.binding && oi.binding("util");
  } catch {
  }
}();
const sl = kv;
var dl = sl && sl.isTypedArray, zv = dl ? Pv(dl) : $v;
const da = zv;
var Iv = Object.prototype, Ov = Iv.hasOwnProperty;
function ad(e, t) {
  var o = Dt(e), r = !o && wn(e), n = !o && !r && Sn(e), i = !o && !r && !n && da(e), a = o || r || n || i, l = a ? Up(e.length, String) : [], s = l.length;
  for (var d in e)
    (t || Ov.call(e, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    ia(d, s))) && l.push(d);
  return l;
}
function ld(e, t) {
  return function(o) {
    return e(t(o));
  };
}
var Rv = ld(Object.keys, Object);
const Mv = Rv;
var Ev = Object.prototype, _v = Ev.hasOwnProperty;
function Bv(e) {
  if (!sa(e))
    return Mv(e);
  var t = [];
  for (var o in Object(e))
    _v.call(e, o) && o != "constructor" && t.push(o);
  return t;
}
function ca(e) {
  return rr(e) ? ad(e) : Bv(e);
}
function Dv(e) {
  var t = [];
  if (e != null)
    for (var o in Object(e))
      t.push(o);
  return t;
}
var Av = Object.prototype, Fv = Av.hasOwnProperty;
function Hv(e) {
  if (!vo(e))
    return Dv(e);
  var t = sa(e), o = [];
  for (var r in e)
    r == "constructor" && (t || !Fv.call(e, r)) || o.push(r);
  return o;
}
function sd(e) {
  return rr(e) ? ad(e, !0) : Hv(e);
}
var Lv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Wv = /^\w*$/;
function ua(e, t) {
  if (Dt(e))
    return !1;
  var o = typeof e;
  return o == "number" || o == "symbol" || o == "boolean" || e == null || oa(e) ? !0 : Wv.test(e) || !Lv.test(e) || t != null && e in Object(t);
}
var Nv = Ao(Object, "create");
const Or = Nv;
function jv() {
  this.__data__ = Or ? Or(null) : {}, this.size = 0;
}
function Vv(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Uv = "__lodash_hash_undefined__", qv = Object.prototype, Gv = qv.hasOwnProperty;
function Kv(e) {
  var t = this.__data__;
  if (Or) {
    var o = t[e];
    return o === Uv ? void 0 : o;
  }
  return Gv.call(t, e) ? t[e] : void 0;
}
var Yv = Object.prototype, Xv = Yv.hasOwnProperty;
function Zv(e) {
  var t = this.__data__;
  return Or ? t[e] !== void 0 : Xv.call(t, e);
}
var Jv = "__lodash_hash_undefined__";
function Qv(e, t) {
  var o = this.__data__;
  return this.size += this.has(e) ? 0 : 1, o[e] = Or && t === void 0 ? Jv : t, this;
}
function Mo(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Mo.prototype.clear = jv;
Mo.prototype.delete = Vv;
Mo.prototype.get = Kv;
Mo.prototype.has = Zv;
Mo.prototype.set = Qv;
function eg() {
  this.__data__ = [], this.size = 0;
}
function Mn(e, t) {
  for (var o = e.length; o--; )
    if (Lr(e[o][0], t))
      return o;
  return -1;
}
var tg = Array.prototype, og = tg.splice;
function rg(e) {
  var t = this.__data__, o = Mn(t, e);
  if (o < 0)
    return !1;
  var r = t.length - 1;
  return o == r ? t.pop() : og.call(t, o, 1), --this.size, !0;
}
function ng(e) {
  var t = this.__data__, o = Mn(t, e);
  return o < 0 ? void 0 : t[o][1];
}
function ig(e) {
  return Mn(this.__data__, e) > -1;
}
function ag(e, t) {
  var o = this.__data__, r = Mn(o, e);
  return r < 0 ? (++this.size, o.push([e, t])) : o[r][1] = t, this;
}
function ro(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ro.prototype.clear = eg;
ro.prototype.delete = rg;
ro.prototype.get = ng;
ro.prototype.has = ig;
ro.prototype.set = ag;
var lg = Ao(qt, "Map");
const Rr = lg;
function sg() {
  this.size = 0, this.__data__ = {
    hash: new Mo(),
    map: new (Rr || ro)(),
    string: new Mo()
  };
}
function dg(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function En(e, t) {
  var o = e.__data__;
  return dg(t) ? o[typeof t == "string" ? "string" : "hash"] : o.map;
}
function cg(e) {
  var t = En(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function ug(e) {
  return En(this, e).get(e);
}
function fg(e) {
  return En(this, e).has(e);
}
function hg(e, t) {
  var o = En(this, e), r = o.size;
  return o.set(e, t), this.size += o.size == r ? 0 : 1, this;
}
function no(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
no.prototype.clear = sg;
no.prototype.delete = cg;
no.prototype.get = ug;
no.prototype.has = fg;
no.prototype.set = hg;
var pg = "Expected a function";
function fa(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(pg);
  var o = function() {
    var r = arguments, n = t ? t.apply(this, r) : r[0], i = o.cache;
    if (i.has(n))
      return i.get(n);
    var a = e.apply(this, r);
    return o.cache = i.set(n, a) || i, a;
  };
  return o.cache = new (fa.Cache || no)(), o;
}
fa.Cache = no;
var vg = 500;
function gg(e) {
  var t = fa(e, function(r) {
    return o.size === vg && o.clear(), r;
  }), o = t.cache;
  return t;
}
var mg = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, bg = /\\(\\)?/g, xg = gg(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(mg, function(o, r, n, i) {
    t.push(n ? i.replace(bg, "$1") : r || o);
  }), t;
});
const Cg = xg;
function dd(e) {
  return e == null ? "" : od(e);
}
function cd(e, t) {
  return Dt(e) ? e : ua(e, t) ? [e] : Cg(dd(e));
}
var yg = 1 / 0;
function _n(e) {
  if (typeof e == "string" || oa(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -yg ? "-0" : t;
}
function ud(e, t) {
  t = cd(t, e);
  for (var o = 0, r = t.length; e != null && o < r; )
    e = e[_n(t[o++])];
  return o && o == r ? e : void 0;
}
function ha(e, t, o) {
  var r = e == null ? void 0 : ud(e, t);
  return r === void 0 ? o : r;
}
function wg(e, t) {
  for (var o = -1, r = t.length, n = e.length; ++o < r; )
    e[n + o] = t[o];
  return e;
}
var Sg = ld(Object.getPrototypeOf, Object);
const fd = Sg;
var $g = "[object Object]", Pg = Function.prototype, Tg = Object.prototype, hd = Pg.toString, kg = Tg.hasOwnProperty, zg = hd.call(Object);
function Ig(e) {
  if (!po(e) || Bo(e) != $g)
    return !1;
  var t = fd(e);
  if (t === null)
    return !0;
  var o = kg.call(t, "constructor") && t.constructor;
  return typeof o == "function" && o instanceof o && hd.call(o) == zg;
}
function Og(e, t, o) {
  var r = -1, n = e.length;
  t < 0 && (t = -t > n ? 0 : n + t), o = o > n ? n : o, o < 0 && (o += n), n = t > o ? 0 : o - t >>> 0, t >>>= 0;
  for (var i = Array(n); ++r < n; )
    i[r] = e[r + t];
  return i;
}
function Rg(e, t, o) {
  var r = e.length;
  return o = o === void 0 ? r : o, !t && o >= r ? e : Og(e, t, o);
}
var Mg = "\\ud800-\\udfff", Eg = "\\u0300-\\u036f", _g = "\\ufe20-\\ufe2f", Bg = "\\u20d0-\\u20ff", Dg = Eg + _g + Bg, Ag = "\\ufe0e\\ufe0f", Fg = "\\u200d", Hg = RegExp("[" + Fg + Mg + Dg + Ag + "]");
function pd(e) {
  return Hg.test(e);
}
function Lg(e) {
  return e.split("");
}
var vd = "\\ud800-\\udfff", Wg = "\\u0300-\\u036f", Ng = "\\ufe20-\\ufe2f", jg = "\\u20d0-\\u20ff", Vg = Wg + Ng + jg, Ug = "\\ufe0e\\ufe0f", qg = "[" + vd + "]", Ii = "[" + Vg + "]", Oi = "\\ud83c[\\udffb-\\udfff]", Gg = "(?:" + Ii + "|" + Oi + ")", gd = "[^" + vd + "]", md = "(?:\\ud83c[\\udde6-\\uddff]){2}", bd = "[\\ud800-\\udbff][\\udc00-\\udfff]", Kg = "\\u200d", xd = Gg + "?", Cd = "[" + Ug + "]?", Yg = "(?:" + Kg + "(?:" + [gd, md, bd].join("|") + ")" + Cd + xd + ")*", Xg = Cd + xd + Yg, Zg = "(?:" + [gd + Ii + "?", Ii, md, bd, qg].join("|") + ")", Jg = RegExp(Oi + "(?=" + Oi + ")|" + Zg + Xg, "g");
function Qg(e) {
  return e.match(Jg) || [];
}
function em(e) {
  return pd(e) ? Qg(e) : Lg(e);
}
function tm(e) {
  return function(t) {
    t = dd(t);
    var o = pd(t) ? em(t) : void 0, r = o ? o[0] : t.charAt(0), n = o ? Rg(o, 1).join("") : t.slice(1);
    return r[e]() + n;
  };
}
var om = tm("toUpperCase");
const rm = om;
function nm() {
  this.__data__ = new ro(), this.size = 0;
}
function im(e) {
  var t = this.__data__, o = t.delete(e);
  return this.size = t.size, o;
}
function am(e) {
  return this.__data__.get(e);
}
function lm(e) {
  return this.__data__.has(e);
}
var sm = 200;
function dm(e, t) {
  var o = this.__data__;
  if (o instanceof ro) {
    var r = o.__data__;
    if (!Rr || r.length < sm - 1)
      return r.push([e, t]), this.size = ++o.size, this;
    o = this.__data__ = new no(r);
  }
  return o.set(e, t), this.size = o.size, this;
}
function Vt(e) {
  var t = this.__data__ = new ro(e);
  this.size = t.size;
}
Vt.prototype.clear = nm;
Vt.prototype.delete = im;
Vt.prototype.get = am;
Vt.prototype.has = lm;
Vt.prototype.set = dm;
var yd = typeof exports == "object" && exports && !exports.nodeType && exports, cl = yd && typeof module == "object" && module && !module.nodeType && module, cm = cl && cl.exports === yd, ul = cm ? qt.Buffer : void 0, fl = ul ? ul.allocUnsafe : void 0;
function um(e, t) {
  if (t)
    return e.slice();
  var o = e.length, r = fl ? fl(o) : new e.constructor(o);
  return e.copy(r), r;
}
function fm(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length, n = 0, i = []; ++o < r; ) {
    var a = e[o];
    t(a, o, e) && (i[n++] = a);
  }
  return i;
}
function hm() {
  return [];
}
var pm = Object.prototype, vm = pm.propertyIsEnumerable, hl = Object.getOwnPropertySymbols, gm = hl ? function(e) {
  return e == null ? [] : (e = Object(e), fm(hl(e), function(t) {
    return vm.call(e, t);
  }));
} : hm;
const mm = gm;
function bm(e, t, o) {
  var r = t(e);
  return Dt(e) ? r : wg(r, o(e));
}
function pl(e) {
  return bm(e, ca, mm);
}
var xm = Ao(qt, "DataView");
const Ri = xm;
var Cm = Ao(qt, "Promise");
const Mi = Cm;
var ym = Ao(qt, "Set");
const Ei = ym;
var vl = "[object Map]", wm = "[object Object]", gl = "[object Promise]", ml = "[object Set]", bl = "[object WeakMap]", xl = "[object DataView]", Sm = Do(Ri), $m = Do(Rr), Pm = Do(Mi), Tm = Do(Ei), km = Do(zi), wo = Bo;
(Ri && wo(new Ri(new ArrayBuffer(1))) != xl || Rr && wo(new Rr()) != vl || Mi && wo(Mi.resolve()) != gl || Ei && wo(new Ei()) != ml || zi && wo(new zi()) != bl) && (wo = function(e) {
  var t = Bo(e), o = t == wm ? e.constructor : void 0, r = o ? Do(o) : "";
  if (r)
    switch (r) {
      case Sm:
        return xl;
      case $m:
        return vl;
      case Pm:
        return gl;
      case Tm:
        return ml;
      case km:
        return bl;
    }
  return t;
});
const Cl = wo;
var zm = qt.Uint8Array;
const $n = zm;
function Im(e) {
  var t = new e.constructor(e.byteLength);
  return new $n(t).set(new $n(e)), t;
}
function Om(e, t) {
  var o = t ? Im(e.buffer) : e.buffer;
  return new e.constructor(o, e.byteOffset, e.length);
}
function Rm(e) {
  return typeof e.constructor == "function" && !sa(e) ? Cp(fd(e)) : {};
}
var Mm = "__lodash_hash_undefined__";
function Em(e) {
  return this.__data__.set(e, Mm), this;
}
function _m(e) {
  return this.__data__.has(e);
}
function Pn(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.__data__ = new no(); ++t < o; )
    this.add(e[t]);
}
Pn.prototype.add = Pn.prototype.push = Em;
Pn.prototype.has = _m;
function Bm(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
    if (t(e[o], o, e))
      return !0;
  return !1;
}
function Dm(e, t) {
  return e.has(t);
}
var Am = 1, Fm = 2;
function wd(e, t, o, r, n, i) {
  var a = o & Am, l = e.length, s = t.length;
  if (l != s && !(a && s > l))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var u = -1, h = !0, v = o & Fm ? new Pn() : void 0;
  for (i.set(e, t), i.set(t, e); ++u < l; ) {
    var f = e[u], b = t[u];
    if (r)
      var x = a ? r(b, f, u, t, e, i) : r(f, b, u, e, t, i);
    if (x !== void 0) {
      if (x)
        continue;
      h = !1;
      break;
    }
    if (v) {
      if (!Bm(t, function(p, w) {
        if (!Dm(v, w) && (f === p || n(f, p, o, r, i)))
          return v.push(w);
      })) {
        h = !1;
        break;
      }
    } else if (!(f === b || n(f, b, o, r, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), h;
}
function Hm(e) {
  var t = -1, o = Array(e.size);
  return e.forEach(function(r, n) {
    o[++t] = [n, r];
  }), o;
}
function Lm(e) {
  var t = -1, o = Array(e.size);
  return e.forEach(function(r) {
    o[++t] = r;
  }), o;
}
var Wm = 1, Nm = 2, jm = "[object Boolean]", Vm = "[object Date]", Um = "[object Error]", qm = "[object Map]", Gm = "[object Number]", Km = "[object RegExp]", Ym = "[object Set]", Xm = "[object String]", Zm = "[object Symbol]", Jm = "[object ArrayBuffer]", Qm = "[object DataView]", yl = ho ? ho.prototype : void 0, ri = yl ? yl.valueOf : void 0;
function eb(e, t, o, r, n, i, a) {
  switch (o) {
    case Qm:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Jm:
      return !(e.byteLength != t.byteLength || !i(new $n(e), new $n(t)));
    case jm:
    case Vm:
    case Gm:
      return Lr(+e, +t);
    case Um:
      return e.name == t.name && e.message == t.message;
    case Km:
    case Xm:
      return e == t + "";
    case qm:
      var l = Hm;
    case Ym:
      var s = r & Wm;
      if (l || (l = Lm), e.size != t.size && !s)
        return !1;
      var d = a.get(e);
      if (d)
        return d == t;
      r |= Nm, a.set(e, t);
      var c = wd(l(e), l(t), r, n, i, a);
      return a.delete(e), c;
    case Zm:
      if (ri)
        return ri.call(e) == ri.call(t);
  }
  return !1;
}
var tb = 1, ob = Object.prototype, rb = ob.hasOwnProperty;
function nb(e, t, o, r, n, i) {
  var a = o & tb, l = pl(e), s = l.length, d = pl(t), c = d.length;
  if (s != c && !a)
    return !1;
  for (var u = s; u--; ) {
    var h = l[u];
    if (!(a ? h in t : rb.call(t, h)))
      return !1;
  }
  var v = i.get(e), f = i.get(t);
  if (v && f)
    return v == t && f == e;
  var b = !0;
  i.set(e, t), i.set(t, e);
  for (var x = a; ++u < s; ) {
    h = l[u];
    var p = e[h], w = t[h];
    if (r)
      var R = a ? r(w, p, h, t, e, i) : r(p, w, h, e, t, i);
    if (!(R === void 0 ? p === w || n(p, w, o, r, i) : R)) {
      b = !1;
      break;
    }
    x || (x = h == "constructor");
  }
  if (b && !x) {
    var y = e.constructor, T = t.constructor;
    y != T && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof T == "function" && T instanceof T) && (b = !1);
  }
  return i.delete(e), i.delete(t), b;
}
var ib = 1, wl = "[object Arguments]", Sl = "[object Array]", Qr = "[object Object]", ab = Object.prototype, $l = ab.hasOwnProperty;
function lb(e, t, o, r, n, i) {
  var a = Dt(e), l = Dt(t), s = a ? Sl : Cl(e), d = l ? Sl : Cl(t);
  s = s == wl ? Qr : s, d = d == wl ? Qr : d;
  var c = s == Qr, u = d == Qr, h = s == d;
  if (h && Sn(e)) {
    if (!Sn(t))
      return !1;
    a = !0, c = !1;
  }
  if (h && !c)
    return i || (i = new Vt()), a || da(e) ? wd(e, t, o, r, n, i) : eb(e, t, s, o, r, n, i);
  if (!(o & ib)) {
    var v = c && $l.call(e, "__wrapped__"), f = u && $l.call(t, "__wrapped__");
    if (v || f) {
      var b = v ? e.value() : e, x = f ? t.value() : t;
      return i || (i = new Vt()), n(b, x, o, r, i);
    }
  }
  return h ? (i || (i = new Vt()), nb(e, t, o, r, n, i)) : !1;
}
function pa(e, t, o, r, n) {
  return e === t ? !0 : e == null || t == null || !po(e) && !po(t) ? e !== e && t !== t : lb(e, t, o, r, pa, n);
}
var sb = 1, db = 2;
function cb(e, t, o, r) {
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
    var s = l[0], d = e[s], c = l[1];
    if (a && l[2]) {
      if (d === void 0 && !(s in e))
        return !1;
    } else {
      var u = new Vt();
      if (r)
        var h = r(d, c, s, e, t, u);
      if (!(h === void 0 ? pa(c, d, sb | db, r, u) : h))
        return !1;
    }
  }
  return !0;
}
function Sd(e) {
  return e === e && !vo(e);
}
function ub(e) {
  for (var t = ca(e), o = t.length; o--; ) {
    var r = t[o], n = e[r];
    t[o] = [r, n, Sd(n)];
  }
  return t;
}
function $d(e, t) {
  return function(o) {
    return o == null ? !1 : o[e] === t && (t !== void 0 || e in Object(o));
  };
}
function fb(e) {
  var t = ub(e);
  return t.length == 1 && t[0][2] ? $d(t[0][0], t[0][1]) : function(o) {
    return o === e || cb(o, e, t);
  };
}
function hb(e, t) {
  return e != null && t in Object(e);
}
function pb(e, t, o) {
  t = cd(t, e);
  for (var r = -1, n = t.length, i = !1; ++r < n; ) {
    var a = _n(t[r]);
    if (!(i = e != null && o(e, a)))
      break;
    e = e[a];
  }
  return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && la(n) && ia(a, n) && (Dt(e) || wn(e)));
}
function vb(e, t) {
  return e != null && pb(e, t, hb);
}
var gb = 1, mb = 2;
function bb(e, t) {
  return ua(e) && Sd(t) ? $d(_n(e), t) : function(o) {
    var r = ha(o, e);
    return r === void 0 && r === t ? vb(o, e) : pa(t, r, gb | mb);
  };
}
function xb(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Cb(e) {
  return function(t) {
    return ud(t, e);
  };
}
function yb(e) {
  return ua(e) ? xb(_n(e)) : Cb(e);
}
function wb(e) {
  return typeof e == "function" ? e : e == null ? ra : typeof e == "object" ? Dt(e) ? bb(e[0], e[1]) : fb(e) : yb(e);
}
function Sb(e) {
  return function(t, o, r) {
    for (var n = -1, i = Object(t), a = r(t), l = a.length; l--; ) {
      var s = a[e ? l : ++n];
      if (o(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var $b = Sb();
const Pd = $b;
function Pb(e, t) {
  return e && Pd(e, t, ca);
}
function Tb(e, t) {
  return function(o, r) {
    if (o == null)
      return o;
    if (!rr(o))
      return e(o, r);
    for (var n = o.length, i = t ? n : -1, a = Object(o); (t ? i-- : ++i < n) && r(a[i], i, a) !== !1; )
      ;
    return o;
  };
}
var kb = Tb(Pb);
const zb = kb;
function _i(e, t, o) {
  (o !== void 0 && !Lr(e[t], o) || o === void 0 && !(t in e)) && aa(e, t, o);
}
function Ib(e) {
  return po(e) && rr(e);
}
function Bi(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Ob(e) {
  return Fp(e, sd(e));
}
function Rb(e, t, o, r, n, i, a) {
  var l = Bi(e, o), s = Bi(t, o), d = a.get(s);
  if (d) {
    _i(e, o, d);
    return;
  }
  var c = i ? i(l, s, o + "", e, t, a) : void 0, u = c === void 0;
  if (u) {
    var h = Dt(s), v = !h && Sn(s), f = !h && !v && da(s);
    c = s, h || v || f ? Dt(l) ? c = l : Ib(l) ? c = wp(l) : v ? (u = !1, c = um(s, !0)) : f ? (u = !1, c = Om(s, !0)) : c = [] : Ig(s) || wn(s) ? (c = l, wn(l) ? c = Ob(l) : (!vo(l) || na(l)) && (c = Rm(s))) : u = !1;
  }
  u && (a.set(s, c), n(c, s, r, i, a), a.delete(s)), _i(e, o, c);
}
function Td(e, t, o, r, n) {
  e !== t && Pd(t, function(i, a) {
    if (n || (n = new Vt()), vo(i))
      Rb(e, t, a, o, Td, r, n);
    else {
      var l = r ? r(Bi(e, a), i, a + "", e, t, n) : void 0;
      l === void 0 && (l = i), _i(e, a, l);
    }
  }, sd);
}
function Mb(e, t) {
  var o = -1, r = rr(e) ? Array(e.length) : [];
  return zb(e, function(n, i, a) {
    r[++o] = t(n, i, a);
  }), r;
}
function Eb(e, t) {
  var o = Dt(e) ? td : Mb;
  return o(e, wb(t));
}
var _b = jp(function(e, t, o) {
  Td(e, t, o);
});
const vr = _b, go = {
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
  fontSize: Bb,
  fontFamily: Db,
  lineHeight: Ab
} = go, kd = N("body", `
 margin: 0;
 font-size: ${Bb};
 font-family: ${Db};
 line-height: ${Ab};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [N("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), eo = "n-config-provider", Mr = "naive-ui-style";
function Me(e, t, o, r, n, i) {
  const a = Eo(), l = De(eo, null);
  if (o) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      o.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: Mr,
        ssr: a
      }), l != null && l.preflightStyleDisabled || kd.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: Mr,
        ssr: a
      });
    };
    a ? d() : Gi(d);
  }
  return E(() => {
    var d;
    const { theme: { common: c, self: u, peers: h = {} } = {}, themeOverrides: v = {}, builtinThemeOverrides: f = {} } = n, { common: b, peers: x } = v, { common: p = void 0, [e]: { common: w = void 0, self: R = void 0, peers: y = {} } = {} } = (l == null ? void 0 : l.mergedThemeRef.value) || {}, { common: T = void 0, [e]: I = {} } = (l == null ? void 0 : l.mergedThemeOverridesRef.value) || {}, { common: g, peers: S = {} } = I, $ = vr({}, c || w || p || r.common, T, g, b), P = vr(
      // {}, executed every time, no need for empty obj
      (d = u || R || r.self) === null || d === void 0 ? void 0 : d($),
      f,
      I,
      v
    );
    return {
      common: $,
      self: P,
      peers: vr({}, r.peers, y, h),
      peerOverrides: vr({}, f.peers, S, x)
    };
  });
}
Me.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const zd = "n";
function Ct(e = {}, t = {
  defaultBordered: !0
}) {
  const o = De(eo, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: o == null ? void 0 : o.inlineThemeDisabled,
    mergedRtlRef: o == null ? void 0 : o.mergedRtlRef,
    mergedComponentPropsRef: o == null ? void 0 : o.mergedComponentPropsRef,
    mergedBreakpointsRef: o == null ? void 0 : o.mergedBreakpointsRef,
    mergedBorderedRef: E(() => {
      var r, n;
      const { bordered: i } = e;
      return i !== void 0 ? i : (n = (r = o == null ? void 0 : o.mergedBorderedRef.value) !== null && r !== void 0 ? r : t.defaultBordered) !== null && n !== void 0 ? n : !0;
    }),
    mergedClsPrefixRef: E(() => (o == null ? void 0 : o.mergedClsPrefixRef.value) || zd),
    namespaceRef: E(() => o == null ? void 0 : o.mergedNamespaceRef.value)
  };
}
const Fb = {
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
}, Hb = Fb;
function ni(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = t.width ? String(t.width) : e.defaultWidth, r = e.formats[o] || e.formats[e.defaultWidth];
    return r;
  };
}
function cr(e) {
  return function(t, o) {
    var r = o != null && o.context ? String(o.context) : "standalone", n;
    if (r === "formatting" && e.formattingValues) {
      var i = e.defaultFormattingWidth || e.defaultWidth, a = o != null && o.width ? String(o.width) : i;
      n = e.formattingValues[a] || e.formattingValues[i];
    } else {
      var l = e.defaultWidth, s = o != null && o.width ? String(o.width) : e.defaultWidth;
      n = e.values[s] || e.values[l];
    }
    var d = e.argumentCallback ? e.argumentCallback(t) : t;
    return n[d];
  };
}
function ur(e) {
  return function(t) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = o.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(n);
    if (!i)
      return null;
    var a = i[0], l = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(l) ? Wb(l, function(u) {
      return u.test(a);
    }) : Lb(l, function(u) {
      return u.test(a);
    }), d;
    d = e.valueCallback ? e.valueCallback(s) : s, d = o.valueCallback ? o.valueCallback(d) : d;
    var c = t.slice(a.length);
    return {
      value: d,
      rest: c
    };
  };
}
function Lb(e, t) {
  for (var o in e)
    if (e.hasOwnProperty(o) && t(e[o]))
      return o;
}
function Wb(e, t) {
  for (var o = 0; o < e.length; o++)
    if (t(e[o]))
      return o;
}
function Nb(e) {
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
var jb = {
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
}, Vb = function(t, o, r) {
  var n, i = jb[t];
  return typeof i == "string" ? n = i : o === 1 ? n = i.one : n = i.other.replace("{{count}}", o.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
};
const Ub = Vb;
var qb = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Gb = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Kb = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Yb = {
  date: ni({
    formats: qb,
    defaultWidth: "full"
  }),
  time: ni({
    formats: Gb,
    defaultWidth: "full"
  }),
  dateTime: ni({
    formats: Kb,
    defaultWidth: "full"
  })
};
const Xb = Yb;
var Zb = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Jb = function(t, o, r, n) {
  return Zb[t];
};
const Qb = Jb;
var e0 = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, t0 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, o0 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, r0 = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, n0 = {
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
}, i0 = {
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
}, a0 = function(t, o) {
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
}, l0 = {
  ordinalNumber: a0,
  era: cr({
    values: e0,
    defaultWidth: "wide"
  }),
  quarter: cr({
    values: t0,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: cr({
    values: o0,
    defaultWidth: "wide"
  }),
  day: cr({
    values: r0,
    defaultWidth: "wide"
  }),
  dayPeriod: cr({
    values: n0,
    defaultWidth: "wide",
    formattingValues: i0,
    defaultFormattingWidth: "wide"
  })
};
const s0 = l0;
var d0 = /^(\d+)(th|st|nd|rd)?/i, c0 = /\d+/i, u0 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, f0 = {
  any: [/^b/i, /^(a|c)/i]
}, h0 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, p0 = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, v0 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, g0 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, m0 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, b0 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, x0 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, C0 = {
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
}, y0 = {
  ordinalNumber: Nb({
    matchPattern: d0,
    parsePattern: c0,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: ur({
    matchPatterns: u0,
    defaultMatchWidth: "wide",
    parsePatterns: f0,
    defaultParseWidth: "any"
  }),
  quarter: ur({
    matchPatterns: h0,
    defaultMatchWidth: "wide",
    parsePatterns: p0,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: ur({
    matchPatterns: v0,
    defaultMatchWidth: "wide",
    parsePatterns: g0,
    defaultParseWidth: "any"
  }),
  day: ur({
    matchPatterns: m0,
    defaultMatchWidth: "wide",
    parsePatterns: b0,
    defaultParseWidth: "any"
  }),
  dayPeriod: ur({
    matchPatterns: x0,
    defaultMatchWidth: "any",
    parsePatterns: C0,
    defaultParseWidth: "any"
  })
};
const w0 = y0;
var S0 = {
  code: "en-US",
  formatDistance: Ub,
  formatLong: Xb,
  formatRelative: Qb,
  localize: s0,
  match: w0,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const $0 = S0, P0 = {
  name: "en-US",
  locale: $0
}, T0 = P0;
function Bn(e) {
  const { mergedLocaleRef: t, mergedDateLocaleRef: o } = De(eo, null) || {}, r = E(() => {
    var i, a;
    return (a = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && a !== void 0 ? a : Hb[e];
  });
  return {
    dateLocaleRef: E(() => {
      var i;
      return (i = o == null ? void 0 : o.value) !== null && i !== void 0 ? i : T0;
    }),
    localeRef: r
  };
}
function nr(e, t, o) {
  if (!t) {
    process.env.NODE_ENV !== "production" && ys("use-style", "No style is specified.");
    return;
  }
  const r = Eo(), n = De(eo, null), i = () => {
    const a = o == null ? void 0 : o.value;
    t.mount({
      id: a === void 0 ? e : a + e,
      head: !0,
      anchorMetaName: Mr,
      props: {
        bPrefix: a ? `.${a}-` : void 0
      },
      ssr: r
    }), n != null && n.preflightStyleDisabled || kd.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: Mr,
      ssr: r
    });
  };
  r ? i() : Gi(i);
}
function xt(e, t, o, r) {
  var n;
  o || ys("useThemeClass", "cssVarsRef is not passed");
  const i = (n = De(eo, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, a = W(""), l = Eo();
  let s;
  const d = `__${e}`, c = () => {
    let u = d;
    const h = t ? t.value : void 0, v = i == null ? void 0 : i.value;
    v && (u += "-" + v), h && (u += "-" + h);
    const { themeOverrides: f, builtinThemeOverrides: b } = r;
    f && (u += "-" + kr(JSON.stringify(f))), b && (u += "-" + kr(JSON.stringify(b))), a.value = u, s = () => {
      const x = o.value;
      let p = "";
      for (const w in x)
        p += `${w}: ${x[w]};`;
      N(`.${u}`, p).mount({
        id: u,
        ssr: l
      }), s = void 0;
    };
  };
  return pt(() => {
    c();
  }), {
    themeClass: a,
    onRender: () => {
      s == null || s();
    }
  };
}
function Fo(e, t, o) {
  if (!t)
    return;
  const r = Eo(), n = E(() => {
    const { value: a } = t;
    if (!a)
      return;
    const l = a[e];
    if (l)
      return l;
  }), i = () => {
    pt(() => {
      const { value: a } = o, l = `${a}${e}Rtl`;
      if (Sf(l, r))
        return;
      const { value: s } = n;
      s && s.style.mount({
        id: l,
        head: !0,
        anchorMetaName: Mr,
        props: {
          bPrefix: a ? `.${a}-` : void 0
        },
        ssr: r
      });
    });
  };
  return r ? i() : Gi(i), n;
}
const k0 = ge({
  name: "Add",
  render() {
    return m(
      "svg",
      { width: "512", height: "512", viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      m("path", { d: "M256 112V400M400 256H112", stroke: "currentColor", "stroke-width": "32", "stroke-linecap": "round", "stroke-linejoin": "round" })
    );
  }
});
function Id(e, t) {
  return ge({
    name: rm(e),
    setup() {
      var o;
      const r = (o = De(eo, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var n;
        const i = (n = r == null ? void 0 : r.value) === null || n === void 0 ? void 0 : n[e];
        return i ? i() : t;
      };
    }
  });
}
const z0 = ge({
  name: "Checkmark",
  render() {
    return m(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
      m(
        "g",
        { fill: "none" },
        m("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })
      )
    );
  }
}), I0 = Id("close", m(
  "svg",
  { viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": !0 },
  m(
    "g",
    { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
    m(
      "g",
      { fill: "currentColor", "fill-rule": "nonzero" },
      m("path", { d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z" })
    )
  )
)), O0 = ge({
  name: "Eye",
  render() {
    return m(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      m("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }),
      m("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" })
    );
  }
}), R0 = ge({
  name: "EyeOff",
  render() {
    return m(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      m("path", { d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z", fill: "currentColor" }),
      m("path", { d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z", fill: "currentColor" }),
      m("path", { d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z", fill: "currentColor" }),
      m("path", { d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z", fill: "currentColor" }),
      m("path", { d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z", fill: "currentColor" })
    );
  }
}), M0 = ge({
  name: "Empty",
  render() {
    return m(
      "svg",
      { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      m("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
      m("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
    );
  }
}), E0 = ge({
  name: "Remove",
  render() {
    return m(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      m("line", { x1: "400", y1: "256", x2: "112", y2: "256", style: `
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      ` })
    );
  }
}), _0 = ge({
  name: "ChevronDown",
  render() {
    return m(
      "svg",
      { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      m("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
    );
  }
}), B0 = Id("clear", m(
  "svg",
  { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
  m(
    "g",
    { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
    m(
      "g",
      { fill: "currentColor", "fill-rule": "nonzero" },
      m("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" })
    )
  )
)), Dn = ge({
  name: "BaseIconSwitchTransition",
  setup(e, { slots: t }) {
    const o = Hr();
    return () => m(Qt, { name: "icon-switch-transition", appear: o.value }, t);
  }
}), D0 = ge({
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
      const l = e.group ? vu : Qt;
      return m(l, {
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
}), A0 = B("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [N("svg", `
 height: 1em;
 width: 1em;
 `)]), to = ge({
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
    nr("-base-icon", A0, Te(e, "clsPrefix"));
  },
  render() {
    return m("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
  }
}), F0 = B("base-close", `
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
`, [Q("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), N("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), tt("disabled", [N("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), N("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), N("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), N("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), N("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), Q("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), Q("round", [N("&::before", `
 border-radius: 50%;
 `)])]), H0 = ge({
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
    return nr("-base-close", F0, Te(e, "clsPrefix")), () => {
      const { clsPrefix: t, disabled: o, absolute: r, round: n, isButtonTag: i } = e;
      return m(
        i ? "button" : "div",
        { type: i ? "button" : void 0, tabindex: o || !e.focusable ? -1 : 0, "aria-disabled": o, "aria-label": "close", role: i ? void 0 : "button", disabled: o, class: [
          `${t}-base-close`,
          r && `${t}-base-close--absolute`,
          o && `${t}-base-close--disabled`,
          n && `${t}-base-close--round`
        ], onMousedown: (l) => {
          e.focusable || l.preventDefault();
        }, onClick: e.onClick },
        m(to, { clsPrefix: t }, {
          default: () => m(I0, null)
        })
      );
    };
  }
}), L0 = ge({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => m("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
  }
}), {
  cubicBezierEaseInOut: W0
} = go;
function Er({
  originalTransform: e = "",
  left: t = 0,
  top: o = 0,
  transition: r = `all .3s ${W0} !important`
} = {}) {
  return [N("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: e + " scale(0.75)",
    left: t,
    top: o,
    opacity: 0
  }), N("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${e}`,
    left: t,
    top: o,
    opacity: 1
  }), N("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left: t,
    top: o,
    transition: r
  })];
}
const N0 = N([N("@keyframes loading-container-rotate", `
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `), N("@keyframes loading-layer-rotate", `
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
 `), N("@keyframes loading-left-spin", `
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
 `), N("@keyframes loading-right-spin", `
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
 `), B("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [A("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [Er()]), A("container", `
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
 `, [Er({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})])])]), j0 = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, va = ge({
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
  } }, j0),
  setup(e) {
    nr("-base-loading", N0, Te(e, "clsPrefix"));
  },
  render() {
    const { clsPrefix: e, radius: t, strokeWidth: o, stroke: r, scale: n } = this, i = t / n;
    return m(
      "div",
      { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
      m(Dn, null, {
        default: () => this.show ? m(
          "div",
          { key: "icon", class: `${e}-base-loading__transition-wrapper` },
          m(
            "div",
            { class: `${e}-base-loading__container` },
            m(
              "div",
              { class: `${e}-base-loading__container-layer` },
              m(
                "div",
                { class: `${e}-base-loading__container-layer-left` },
                m(
                  "svg",
                  { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                  m("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                )
              ),
              m(
                "div",
                { class: `${e}-base-loading__container-layer-patch` },
                m(
                  "svg",
                  { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                  m("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                )
              ),
              m(
                "div",
                { class: `${e}-base-loading__container-layer-right` },
                m(
                  "svg",
                  { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                  m("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                )
              )
            )
          )
        ) : m("div", { key: "placeholder", class: `${e}-base-loading__placeholder` }, this.$slots)
      })
    );
  }
});
function Pl(e) {
  return Array.isArray(e) ? e : [e];
}
const Di = {
  STOP: "STOP"
};
function Od(e, t) {
  const o = t(e);
  e.children !== void 0 && o !== Di.STOP && e.children.forEach((r) => Od(r, t));
}
function V0(e, t = {}) {
  const { preserveGroup: o = !1 } = t, r = [], n = o ? (a) => {
    a.isLeaf || (r.push(a.key), i(a.children));
  } : (a) => {
    a.isLeaf || (a.isGroup || r.push(a.key), i(a.children));
  };
  function i(a) {
    a.forEach(n);
  }
  return i(e), r;
}
function U0(e, t) {
  const { isLeaf: o } = e;
  return o !== void 0 ? o : !t(e);
}
function q0(e) {
  return e.children;
}
function G0(e) {
  return e.key;
}
function K0() {
  return !1;
}
function Y0(e, t) {
  const { isLeaf: o } = e;
  return !(o === !1 && !Array.isArray(t(e)));
}
function X0(e) {
  return e.disabled === !0;
}
function Z0(e, t) {
  return e.isLeaf === !1 && !Array.isArray(t(e));
}
function J0(e, t) {
  if (e.isLeaf === !0) {
    const o = t(e);
    if (Array.isArray(o) && o.length > 0)
      return !0;
  }
  return !1;
}
function ii(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function ai(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function Q0(e, t) {
  const o = new Set(e);
  return t.forEach((r) => {
    o.has(r) || o.add(r);
  }), Array.from(o);
}
function ex(e, t) {
  const o = new Set(e);
  return t.forEach((r) => {
    o.has(r) && o.delete(r);
  }), Array.from(o);
}
function tx(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function ox(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((o, r) => {
    t.set(o.key, r);
  }), (o) => {
    var r;
    return (r = t.get(o)) !== null && r !== void 0 ? r : null;
  };
}
class rx extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function nx(e, t, o, r) {
  return Tn(t.concat(e), o, r, !1);
}
function ix(e, t) {
  const o = /* @__PURE__ */ new Set();
  return e.forEach((r) => {
    const n = t.treeNodeMap.get(r);
    if (n !== void 0) {
      let i = n.parent;
      for (; i !== null && !(i.disabled || o.has(i.key)); )
        o.add(i.key), i = i.parent;
    }
  }), o;
}
function ax(e, t, o, r) {
  const n = Tn(t, o, r, !1), i = Tn(e, o, r, !0), a = ix(e, o), l = [];
  return n.forEach((s) => {
    (i.has(s) || a.has(s)) && l.push(s);
  }), l.forEach((s) => n.delete(s)), n;
}
function li(e, t) {
  const { checkedKeys: o, keysToCheck: r, keysToUncheck: n, indeterminateKeys: i, cascade: a, leafOnly: l, checkStrategy: s, allowNotLoaded: d } = e;
  if (!a)
    return r !== void 0 ? {
      checkedKeys: Q0(o, r),
      indeterminateKeys: Array.from(i)
    } : n !== void 0 ? {
      checkedKeys: ex(o, n),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(o),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let u;
  n !== void 0 ? u = ax(n, o, t, d) : r !== void 0 ? u = nx(r, o, t, d) : u = Tn(o, t, d, !1);
  const h = s === "parent", v = s === "child" || l, f = u, b = /* @__PURE__ */ new Set(), x = Math.max.apply(null, Array.from(c.keys()));
  for (let p = x; p >= 0; p -= 1) {
    const w = p === 0, R = c.get(p);
    for (const y of R) {
      if (y.isLeaf)
        continue;
      const { key: T, shallowLoaded: I } = y;
      if (v && I && y.children.forEach((P) => {
        !P.disabled && !P.isLeaf && P.shallowLoaded && f.has(P.key) && f.delete(P.key);
      }), y.disabled || !I)
        continue;
      let g = !0, S = !1, $ = !0;
      for (const P of y.children) {
        const z = P.key;
        if (!P.disabled) {
          if ($ && ($ = !1), f.has(z))
            S = !0;
          else if (b.has(z)) {
            S = !0, g = !1;
            break;
          } else if (g = !1, S)
            break;
        }
      }
      g && !$ ? (h && y.children.forEach((P) => {
        !P.disabled && f.has(P.key) && f.delete(P.key);
      }), f.add(T)) : S && b.add(T), w && v && f.has(T) && f.delete(T);
    }
  }
  return {
    checkedKeys: Array.from(f),
    indeterminateKeys: Array.from(b)
  };
}
function Tn(e, t, o, r) {
  const { treeNodeMap: n, getChildren: i } = t, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const d = n.get(s);
    d !== void 0 && Od(d, (c) => {
      if (c.disabled)
        return Di.STOP;
      const { key: u } = c;
      if (!a.has(u) && (a.add(u), l.add(u), Z0(c.rawNode, i))) {
        if (r)
          return Di.STOP;
        if (!o)
          throw new rx();
      }
    });
  }), l;
}
function lx(e, { includeGroup: t = !1, includeSelf: o = !0 }, r) {
  var n;
  const i = r.treeNodeMap;
  let a = e == null ? null : (n = i.get(e)) !== null && n !== void 0 ? n : null;
  const l = {
    keyPath: [],
    treeNodePath: [],
    treeNode: a
  };
  if (a != null && a.ignored)
    return l.treeNode = null, l;
  for (; a; )
    !a.ignored && (t || !a.isGroup) && l.treeNodePath.push(a), a = a.parent;
  return l.treeNodePath.reverse(), o || l.treeNodePath.pop(), l.keyPath = l.treeNodePath.map((s) => s.key), l;
}
function sx(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function dx(e, t) {
  const o = e.siblings, r = o.length, { index: n } = e;
  return t ? o[(n + 1) % r] : n === o.length - 1 ? null : o[n + 1];
}
function Tl(e, t, { loop: o = !1, includeDisabled: r = !1 } = {}) {
  const n = t === "prev" ? cx : dx, i = {
    reverse: t === "prev"
  };
  let a = !1, l = null;
  function s(d) {
    if (d !== null) {
      if (d === e) {
        if (!a)
          a = !0;
        else if (!e.disabled && !e.isGroup) {
          l = e;
          return;
        }
      } else if ((!d.disabled || r) && !d.ignored && !d.isGroup) {
        l = d;
        return;
      }
      if (d.isGroup) {
        const c = ga(d, i);
        c !== null ? l = c : s(n(d, o));
      } else {
        const c = n(d, !1);
        if (c !== null)
          s(c);
        else {
          const u = ux(d);
          u != null && u.isGroup ? s(n(u, o)) : o && s(n(d, !0));
        }
      }
    }
  }
  return s(e), l;
}
function cx(e, t) {
  const o = e.siblings, r = o.length, { index: n } = e;
  return t ? o[(n - 1 + r) % r] : n === 0 ? null : o[n - 1];
}
function ux(e) {
  return e.parent;
}
function ga(e, t = {}) {
  const { reverse: o = !1 } = t, { children: r } = e;
  if (r) {
    const { length: n } = r, i = o ? n - 1 : 0, a = o ? -1 : n, l = o ? -1 : 1;
    for (let s = i; s !== a; s += l) {
      const d = r[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = ga(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const fx = {
  getChild() {
    return this.ignored ? null : ga(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return Tl(this, "next", e);
  },
  getPrev(e = {}) {
    return Tl(this, "prev", e);
  }
};
function hx(e, t) {
  const o = t ? new Set(t) : void 0, r = [];
  function n(i) {
    i.forEach((a) => {
      r.push(a), !(a.isLeaf || !a.children || a.ignored) && (a.isGroup || // normal non-leaf node
      o === void 0 || o.has(a.key)) && n(a.children);
    });
  }
  return n(e), r;
}
function px(e, t) {
  const o = e.key;
  for (; t; ) {
    if (t.key === o)
      return !0;
    t = t.parent;
  }
  return !1;
}
function Rd(e, t, o, r, n, i = null, a = 0) {
  const l = [];
  return e.forEach((s, d) => {
    var c;
    process.env.NODE_ENV !== "production" && J0(s, n) && console.error("[treemate]: node", s, "is invalid");
    const u = Object.create(r);
    if (u.rawNode = s, u.siblings = l, u.level = a, u.index = d, u.isFirstChild = d === 0, u.isLastChild = d + 1 === e.length, u.parent = i, !u.ignored) {
      const h = n(s);
      Array.isArray(h) && (u.children = Rd(h, t, o, r, n, u, a + 1));
    }
    l.push(u), t.set(u.key, u), o.has(a) || o.set(a, []), (c = o.get(a)) === null || c === void 0 || c.push(u);
  }), l;
}
function vx(e, t = {}) {
  var o;
  const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), { getDisabled: i = X0, getIgnored: a = K0, getIsGroup: l = tx, getKey: s = G0 } = t, d = (o = t.getChildren) !== null && o !== void 0 ? o : q0, c = t.ignoreEmptyChildren ? (y) => {
    const T = d(y);
    return Array.isArray(T) ? T.length ? T : null : T;
  } : d, u = Object.assign({
    get key() {
      return s(this.rawNode);
    },
    get disabled() {
      return i(this.rawNode);
    },
    get isGroup() {
      return l(this.rawNode);
    },
    get isLeaf() {
      return U0(this.rawNode, c);
    },
    get shallowLoaded() {
      return Y0(this.rawNode, c);
    },
    get ignored() {
      return a(this.rawNode);
    },
    contains(y) {
      return px(this, y);
    }
  }, fx), h = Rd(e, r, n, u, c);
  function v(y) {
    if (y == null)
      return null;
    const T = r.get(y);
    return T && !T.isGroup && !T.ignored ? T : null;
  }
  function f(y) {
    if (y == null)
      return null;
    const T = r.get(y);
    return T && !T.ignored ? T : null;
  }
  function b(y, T) {
    const I = f(y);
    return I ? I.getPrev(T) : null;
  }
  function x(y, T) {
    const I = f(y);
    return I ? I.getNext(T) : null;
  }
  function p(y) {
    const T = f(y);
    return T ? T.getParent() : null;
  }
  function w(y) {
    const T = f(y);
    return T ? T.getChild() : null;
  }
  const R = {
    treeNodes: h,
    treeNodeMap: r,
    levelTreeNodeMap: n,
    maxLevel: Math.max(...n.keys()),
    getChildren: c,
    getFlattenedNodes(y) {
      return hx(h, y);
    },
    getNode: v,
    getPrev: b,
    getNext: x,
    getParent: p,
    getChild: w,
    getFirstAvailableNode() {
      return sx(h);
    },
    getPath(y, T = {}) {
      return lx(y, T, R);
    },
    getCheckedKeys(y, T = {}) {
      const { cascade: I = !0, leafOnly: g = !1, checkStrategy: S = "all", allowNotLoaded: $ = !1 } = T;
      return li({
        checkedKeys: ii(y),
        indeterminateKeys: ai(y),
        cascade: I,
        leafOnly: g,
        checkStrategy: S,
        allowNotLoaded: $
      }, R);
    },
    check(y, T, I = {}) {
      const { cascade: g = !0, leafOnly: S = !1, checkStrategy: $ = "all", allowNotLoaded: P = !1 } = I;
      return li({
        checkedKeys: ii(T),
        indeterminateKeys: ai(T),
        keysToCheck: y == null ? [] : Pl(y),
        cascade: g,
        leafOnly: S,
        checkStrategy: $,
        allowNotLoaded: P
      }, R);
    },
    uncheck(y, T, I = {}) {
      const { cascade: g = !0, leafOnly: S = !1, checkStrategy: $ = "all", allowNotLoaded: P = !1 } = I;
      return li({
        checkedKeys: ii(T),
        indeterminateKeys: ai(T),
        keysToUncheck: y == null ? [] : Pl(y),
        cascade: g,
        leafOnly: S,
        checkStrategy: $,
        allowNotLoaded: P
      }, R);
    },
    getNonLeafKeys(y = {}) {
      return V0(h, y);
    }
  };
  return R;
}
const ie = {
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
}, gx = Ut(ie.neutralBase), Md = Ut(ie.neutralInvertBase), mx = "rgba(" + Md.slice(0, 3).join(", ") + ", ";
function Ee(e) {
  return mx + String(e) + ")";
}
function bx(e) {
  const t = Array.from(Md);
  return t[3] = Number(e), he(gx, t);
}
const xx = Object.assign(Object.assign({ name: "common" }, go), {
  baseColor: ie.neutralBase,
  // primary color
  primaryColor: ie.primaryDefault,
  primaryColorHover: ie.primaryHover,
  primaryColorPressed: ie.primaryActive,
  primaryColorSuppl: ie.primarySuppl,
  // info color
  infoColor: ie.infoDefault,
  infoColorHover: ie.infoHover,
  infoColorPressed: ie.infoActive,
  infoColorSuppl: ie.infoSuppl,
  // success color
  successColor: ie.successDefault,
  successColorHover: ie.successHover,
  successColorPressed: ie.successActive,
  successColorSuppl: ie.successSuppl,
  // warning color
  warningColor: ie.warningDefault,
  warningColorHover: ie.warningHover,
  warningColorPressed: ie.warningActive,
  warningColorSuppl: ie.warningSuppl,
  // error color
  errorColor: ie.errorDefault,
  errorColorHover: ie.errorHover,
  errorColorPressed: ie.errorActive,
  errorColorSuppl: ie.errorSuppl,
  // text color
  textColorBase: ie.neutralTextBase,
  textColor1: Ee(ie.alpha1),
  textColor2: Ee(ie.alpha2),
  textColor3: Ee(ie.alpha3),
  // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
  // textColor5: overlay(base.alpha5),
  textColorDisabled: Ee(ie.alpha4),
  placeholderColor: Ee(ie.alpha4),
  placeholderColorDisabled: Ee(ie.alpha5),
  iconColor: Ee(ie.alpha4),
  iconColorDisabled: Ee(ie.alpha5),
  iconColorHover: Ee(Number(ie.alpha4) * 1.25),
  iconColorPressed: Ee(Number(ie.alpha4) * 0.8),
  opacity1: ie.alpha1,
  opacity2: ie.alpha2,
  opacity3: ie.alpha3,
  opacity4: ie.alpha4,
  opacity5: ie.alpha5,
  dividerColor: Ee(ie.alphaDivider),
  borderColor: Ee(ie.alphaBorder),
  // close
  closeIconColorHover: Ee(Number(ie.alphaClose)),
  closeIconColor: Ee(Number(ie.alphaClose)),
  closeIconColorPressed: Ee(Number(ie.alphaClose)),
  closeColorHover: "rgba(255, 255, 255, .12)",
  closeColorPressed: "rgba(255, 255, 255, .08)",
  // clear
  clearColor: Ee(ie.alpha4),
  clearColorHover: Qe(Ee(ie.alpha4), { alpha: 1.25 }),
  clearColorPressed: Qe(Ee(ie.alpha4), { alpha: 0.8 }),
  scrollbarColor: Ee(ie.alphaScrollbar),
  scrollbarColorHover: Ee(ie.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: Ee(ie.alphaProgressRail),
  railColor: Ee(ie.alphaRail),
  popoverColor: ie.neutralPopover,
  tableColor: ie.neutralCard,
  cardColor: ie.neutralCard,
  modalColor: ie.neutralModal,
  bodyColor: ie.neutralBody,
  tagColor: bx(ie.alphaTag),
  avatarColor: Ee(ie.alphaAvatar),
  invertedColor: ie.neutralBase,
  inputColor: Ee(ie.alphaInput),
  codeColor: Ee(ie.alphaCode),
  tabColor: Ee(ie.alphaTab),
  actionColor: Ee(ie.alphaAction),
  tableHeaderColor: Ee(ie.alphaAction),
  hoverColor: Ee(ie.alphaPending),
  tableColorHover: Ee(ie.alphaTablePending),
  tableColorStriped: Ee(ie.alphaTableStriped),
  pressedColor: Ee(ie.alphaPressed),
  opacityDisabled: ie.alphaDisabled,
  inputColorDisabled: Ee(ie.alphaDisabledInput),
  buttonColor2: "rgba(255, 255, 255, .08)",
  buttonColor2Hover: "rgba(255, 255, 255, .12)",
  buttonColor2Pressed: "rgba(255, 255, 255, .08)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), te = xx, ve = {
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
}, Cx = Ut(ve.neutralBase), Ed = Ut(ve.neutralInvertBase), yx = "rgba(" + Ed.slice(0, 3).join(", ") + ", ";
function kl(e) {
  return yx + String(e) + ")";
}
function ut(e) {
  const t = Array.from(Ed);
  return t[3] = Number(e), he(Cx, t);
}
const wx = Object.assign(Object.assign({ name: "common" }, go), {
  baseColor: ve.neutralBase,
  // primary color
  primaryColor: ve.primaryDefault,
  primaryColorHover: ve.primaryHover,
  primaryColorPressed: ve.primaryActive,
  primaryColorSuppl: ve.primarySuppl,
  // info color
  infoColor: ve.infoDefault,
  infoColorHover: ve.infoHover,
  infoColorPressed: ve.infoActive,
  infoColorSuppl: ve.infoSuppl,
  // success color
  successColor: ve.successDefault,
  successColorHover: ve.successHover,
  successColorPressed: ve.successActive,
  successColorSuppl: ve.successSuppl,
  // warning color
  warningColor: ve.warningDefault,
  warningColorHover: ve.warningHover,
  warningColorPressed: ve.warningActive,
  warningColorSuppl: ve.warningSuppl,
  // error color
  errorColor: ve.errorDefault,
  errorColorHover: ve.errorHover,
  errorColorPressed: ve.errorActive,
  errorColorSuppl: ve.errorSuppl,
  // text color
  textColorBase: ve.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: ut(ve.alpha4),
  placeholderColor: ut(ve.alpha4),
  placeholderColorDisabled: ut(ve.alpha5),
  iconColor: ut(ve.alpha4),
  iconColorHover: Qe(ut(ve.alpha4), { lightness: 0.75 }),
  iconColorPressed: Qe(ut(ve.alpha4), { lightness: 0.9 }),
  iconColorDisabled: ut(ve.alpha5),
  opacity1: ve.alpha1,
  opacity2: ve.alpha2,
  opacity3: ve.alpha3,
  opacity4: ve.alpha4,
  opacity5: ve.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: ut(Number(ve.alphaClose)),
  closeIconColorHover: ut(Number(ve.alphaClose)),
  closeIconColorPressed: ut(Number(ve.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: ut(ve.alpha4),
  clearColorHover: Qe(ut(ve.alpha4), { lightness: 0.75 }),
  clearColorPressed: Qe(ut(ve.alpha4), { lightness: 0.9 }),
  scrollbarColor: kl(ve.alphaScrollbar),
  scrollbarColorHover: kl(ve.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: ut(ve.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: ve.neutralPopover,
  tableColor: ve.neutralCard,
  cardColor: ve.neutralCard,
  modalColor: ve.neutralModal,
  bodyColor: ve.neutralBody,
  tagColor: "#eee",
  avatarColor: ut(ve.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: ut(ve.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: ve.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), vt = wx, Sx = {
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
}, _d = (e) => {
  const { textColorDisabled: t, iconColor: o, textColor2: r, fontSizeSmall: n, fontSizeMedium: i, fontSizeLarge: a, fontSizeHuge: l } = e;
  return Object.assign(Object.assign({}, Sx), {
    fontSizeSmall: n,
    fontSizeMedium: i,
    fontSizeLarge: a,
    fontSizeHuge: l,
    textColor: t,
    iconColor: o,
    extraTextColor: r
  });
}, $x = {
  name: "Empty",
  common: vt,
  self: _d
}, ma = $x, Px = {
  name: "Empty",
  common: te,
  self: _d
}, Ho = Px, Tx = B("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [A("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [N("+", [A("description", `
 margin-top: 8px;
 `)])]), A("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), A("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), kx = Object.assign(Object.assign({}, Me.props), { description: String, showDescription: {
  type: Boolean,
  default: !0
}, showIcon: {
  type: Boolean,
  default: !0
}, size: {
  type: String,
  default: "medium"
}, renderIcon: Function }), zx = ge({
  name: "Empty",
  props: kx,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = Ct(e), r = Me("Empty", "-empty", Tx, ma, e, t), { localeRef: n } = Bn("Empty"), i = De(eo, null), a = E(() => {
      var c, u, h;
      return (c = e.description) !== null && c !== void 0 ? c : (h = (u = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || u === void 0 ? void 0 : u.Empty) === null || h === void 0 ? void 0 : h.description;
    }), l = E(() => {
      var c, u;
      return ((u = (c = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || c === void 0 ? void 0 : c.Empty) === null || u === void 0 ? void 0 : u.renderIcon) || (() => m(M0, null));
    }), s = E(() => {
      const { size: c } = e, { common: { cubicBezierEaseInOut: u }, self: { [re("iconSize", c)]: h, [re("fontSize", c)]: v, textColor: f, iconColor: b, extraTextColor: x } } = r.value;
      return {
        "--n-icon-size": h,
        "--n-font-size": v,
        "--n-bezier": u,
        "--n-text-color": f,
        "--n-icon-color": b,
        "--n-extra-text-color": x
      };
    }), d = o ? xt("empty", E(() => {
      let c = "";
      const { size: u } = e;
      return c += u[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: l,
      localizedDescription: E(() => a.value || n.value.description),
      cssVars: o ? void 0 : s,
      themeClass: d == null ? void 0 : d.themeClass,
      onRender: d == null ? void 0 : d.onRender
    };
  },
  render() {
    const { $slots: e, mergedClsPrefix: t, onRender: o } = this;
    return o == null || o(), m(
      "div",
      { class: [`${t}-empty`, this.themeClass], style: this.cssVars },
      this.showIcon ? m("div", { class: `${t}-empty__icon` }, e.icon ? e.icon() : m(to, { clsPrefix: t }, { default: this.mergedRenderIcon })) : null,
      this.showDescription ? m("div", { class: `${t}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null,
      e.extra ? m("div", { class: `${t}-empty__extra` }, e.extra()) : null
    );
  }
}), Bd = (e) => {
  const { scrollbarColor: t, scrollbarColorHover: o } = e;
  return {
    color: t,
    colorHover: o
  };
}, Ix = {
  name: "Scrollbar",
  common: vt,
  self: Bd
}, Dd = Ix, Ox = {
  name: "Scrollbar",
  common: te,
  self: Bd
}, $t = Ox, {
  cubicBezierEaseInOut: zl
} = go;
function Rx({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: o = "0.2s",
  enterCubicBezier: r = zl,
  leaveCubicBezier: n = zl
} = {}) {
  return [N(`&.${e}-transition-enter-active`, {
    transition: `all ${t} ${r}!important`
  }), N(`&.${e}-transition-leave-active`, {
    transition: `all ${o} ${n}!important`
  }), N(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0
  }), N(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
    opacity: 1
  })];
}
const Mx = B("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [N(">", [B("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [N("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), N(">", [B("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), N(">, +", [B("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [Q("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [N(">", [A("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), Q("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [N(">", [A("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), Q("disabled", [N(">", [A("scrollbar", {
  pointerEvents: "none"
})])]), N(">", [A("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [Rx(), N("&:hover", {
  backgroundColor: "var(--n-scrollbar-color-hover)"
})])])])])]), Ex = Object.assign(Object.assign({}, Me.props), {
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
}), Ad = ge({
  name: "Scrollbar",
  props: Ex,
  inheritAttrs: !1,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o, mergedRtlRef: r } = Ct(e), n = Fo("Scrollbar", r, t), i = W(null), a = W(null), l = W(null), s = W(null), d = W(null), c = W(null), u = W(null), h = W(null), v = W(null), f = W(null), b = W(null), x = W(0), p = W(0), w = W(!1), R = W(!1);
    let y = !1, T = !1, I, g, S = 0, $ = 0, P = 0, z = 0;
    const M = jf(), F = E(() => {
      const { value: C } = h, { value: H } = c, { value: J } = f;
      return C === null || H === null || J === null ? 0 : Math.min(C, J * C / H + e.size * 1.5);
    }), L = E(() => `${F.value}px`), G = E(() => {
      const { value: C } = v, { value: H } = u, { value: J } = b;
      return C === null || H === null || J === null ? 0 : J * C / H + e.size * 1.5;
    }), K = E(() => `${G.value}px`), O = E(() => {
      const { value: C } = h, { value: H } = x, { value: J } = c, { value: de } = f;
      if (C === null || J === null || de === null)
        return 0;
      {
        const ue = J - C;
        return ue ? H / ue * (de - F.value) : 0;
      }
    }), X = E(() => `${O.value}px`), _ = E(() => {
      const { value: C } = v, { value: H } = p, { value: J } = u, { value: de } = b;
      if (C === null || J === null || de === null)
        return 0;
      {
        const ue = J - C;
        return ue ? H / ue * (de - G.value) : 0;
      }
    }), U = E(() => `${_.value}px`), ce = E(() => {
      const { value: C } = h, { value: H } = c;
      return C !== null && H !== null && H > C;
    }), $e = E(() => {
      const { value: C } = v, { value: H } = u;
      return C !== null && H !== null && H > C;
    }), Oe = E(() => {
      const { trigger: C } = e;
      return C === "none" || w.value;
    }), Be = E(() => {
      const { trigger: C } = e;
      return C === "none" || R.value;
    }), ke = E(() => {
      const { container: C } = e;
      return C ? C() : a.value;
    }), fe = E(() => {
      const { content: C } = e;
      return C ? C() : l.value;
    }), xe = Hh(() => {
      e.container || Ve({
        top: x.value,
        left: p.value
      });
    }), ze = () => {
      xe.isDeactivated || q();
    }, le = (C) => {
      if (xe.isDeactivated)
        return;
      const { onResize: H } = e;
      H && H(C), q();
    }, Ve = (C, H) => {
      if (!e.scrollable)
        return;
      if (typeof C == "number") {
        Ue(H ?? 0, C, 0, !1, "auto");
        return;
      }
      const { left: J, top: de, index: ue, elSize: me, position: Ce, behavior: Pe, el: nt, debounce: Tt = !0 } = C;
      (J !== void 0 || de !== void 0) && Ue(J ?? 0, de ?? 0, 0, !1, Pe), nt !== void 0 ? Ue(0, nt.offsetTop, nt.offsetHeight, Tt, Pe) : ue !== void 0 && me !== void 0 ? Ue(0, ue * me, me, Tt, Pe) : Ce === "bottom" ? Ue(0, Number.MAX_SAFE_INTEGER, 0, !1, Pe) : Ce === "top" && Ue(0, 0, 0, !1, Pe);
    }, He = (C, H) => {
      if (!e.scrollable)
        return;
      const { value: J } = ke;
      J && (typeof C == "object" ? J.scrollBy(C) : J.scrollBy(C, H || 0));
    };
    function Ue(C, H, J, de, ue) {
      const { value: me } = ke;
      if (me) {
        if (de) {
          const { scrollTop: Ce, offsetHeight: Pe } = me;
          if (H > Ce) {
            H + J <= Ce + Pe || me.scrollTo({
              left: C,
              top: H + J - Pe,
              behavior: ue
            });
            return;
          }
        }
        me.scrollTo({
          left: C,
          top: H,
          behavior: ue
        });
      }
    }
    function Ke() {
      se(), ye(), q();
    }
    function Je() {
      st();
    }
    function st() {
      gt(), Z();
    }
    function gt() {
      g !== void 0 && window.clearTimeout(g), g = window.setTimeout(() => {
        R.value = !1;
      }, e.duration);
    }
    function Z() {
      I !== void 0 && window.clearTimeout(I), I = window.setTimeout(() => {
        w.value = !1;
      }, e.duration);
    }
    function se() {
      I !== void 0 && window.clearTimeout(I), w.value = !0;
    }
    function ye() {
      g !== void 0 && window.clearTimeout(g), R.value = !0;
    }
    function ae(C) {
      const { onScroll: H } = e;
      H && H(C), j();
    }
    function j() {
      const { value: C } = ke;
      C && (x.value = C.scrollTop, p.value = C.scrollLeft * (n != null && n.value ? -1 : 1));
    }
    function ee() {
      const { value: C } = fe;
      C && (c.value = C.offsetHeight, u.value = C.offsetWidth);
      const { value: H } = ke;
      H && (h.value = H.offsetHeight, v.value = H.offsetWidth);
      const { value: J } = d, { value: de } = s;
      J && (b.value = J.offsetWidth), de && (f.value = de.offsetHeight);
    }
    function D() {
      const { value: C } = ke;
      C && (x.value = C.scrollTop, p.value = C.scrollLeft * (n != null && n.value ? -1 : 1), h.value = C.offsetHeight, v.value = C.offsetWidth, c.value = C.scrollHeight, u.value = C.scrollWidth);
      const { value: H } = d, { value: J } = s;
      H && (b.value = H.offsetWidth), J && (f.value = J.offsetHeight);
    }
    function q() {
      e.scrollable && (e.useUnifiedContainer ? D() : (ee(), j()));
    }
    function oe(C) {
      var H;
      return !(!((H = i.value) === null || H === void 0) && H.contains($r(C)));
    }
    function we(C) {
      C.preventDefault(), C.stopPropagation(), T = !0, Ye("mousemove", window, Ie, !0), Ye("mouseup", window, Le, !0), $ = p.value, P = n != null && n.value ? window.innerWidth - C.clientX : C.clientX;
    }
    function Ie(C) {
      if (!T)
        return;
      I !== void 0 && window.clearTimeout(I), g !== void 0 && window.clearTimeout(g);
      const { value: H } = v, { value: J } = u, { value: de } = G;
      if (H === null || J === null)
        return;
      const me = (n != null && n.value ? window.innerWidth - C.clientX - P : C.clientX - P) * (J - H) / (H - de), Ce = J - H;
      let Pe = $ + me;
      Pe = Math.min(Ce, Pe), Pe = Math.max(Pe, 0);
      const { value: nt } = ke;
      if (nt) {
        nt.scrollLeft = Pe * (n != null && n.value ? -1 : 1);
        const { internalOnUpdateScrollLeft: Tt } = e;
        Tt && Tt(Pe);
      }
    }
    function Le(C) {
      C.preventDefault(), C.stopPropagation(), Ge("mousemove", window, Ie, !0), Ge("mouseup", window, Le, !0), T = !1, q(), oe(C) && st();
    }
    function rt(C) {
      C.preventDefault(), C.stopPropagation(), y = !0, Ye("mousemove", window, We, !0), Ye("mouseup", window, Ne, !0), S = x.value, z = C.clientY;
    }
    function We(C) {
      if (!y)
        return;
      I !== void 0 && window.clearTimeout(I), g !== void 0 && window.clearTimeout(g);
      const { value: H } = h, { value: J } = c, { value: de } = F;
      if (H === null || J === null)
        return;
      const me = (C.clientY - z) * (J - H) / (H - de), Ce = J - H;
      let Pe = S + me;
      Pe = Math.min(Ce, Pe), Pe = Math.max(Pe, 0);
      const { value: nt } = ke;
      nt && (nt.scrollTop = Pe);
    }
    function Ne(C) {
      C.preventDefault(), C.stopPropagation(), Ge("mousemove", window, We, !0), Ge("mouseup", window, Ne, !0), y = !1, q(), oe(C) && st();
    }
    pt(() => {
      const { value: C } = $e, { value: H } = ce, { value: J } = t, { value: de } = d, { value: ue } = s;
      de && (C ? de.classList.remove(`${J}-scrollbar-rail--disabled`) : de.classList.add(`${J}-scrollbar-rail--disabled`)), ue && (H ? ue.classList.remove(`${J}-scrollbar-rail--disabled`) : ue.classList.add(`${J}-scrollbar-rail--disabled`));
    }), St(() => {
      e.container || q();
    }), wt(() => {
      I !== void 0 && window.clearTimeout(I), g !== void 0 && window.clearTimeout(g), Ge("mousemove", window, We, !0), Ge("mouseup", window, Ne, !0);
    });
    const ct = Me("Scrollbar", "-scrollbar", Mx, Dd, e, t), Rt = E(() => {
      const { common: { cubicBezierEaseInOut: C, scrollbarBorderRadius: H, scrollbarHeight: J, scrollbarWidth: de }, self: { color: ue, colorHover: me } } = ct.value;
      return {
        "--n-scrollbar-bezier": C,
        "--n-scrollbar-color": ue,
        "--n-scrollbar-color-hover": me,
        "--n-scrollbar-border-radius": H,
        "--n-scrollbar-width": de,
        "--n-scrollbar-height": J
      };
    }), dt = o ? xt("scrollbar", void 0, Rt, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: Ve,
      scrollBy: He,
      sync: q,
      syncUnifiedContainer: D,
      handleMouseEnterWrapper: Ke,
      handleMouseLeaveWrapper: Je
    }), {
      mergedClsPrefix: t,
      rtlEnabled: n,
      containerScrollTop: x,
      wrapperRef: i,
      containerRef: a,
      contentRef: l,
      yRailRef: s,
      xRailRef: d,
      needYBar: ce,
      needXBar: $e,
      yBarSizePx: L,
      xBarSizePx: K,
      yBarTopPx: X,
      xBarLeftPx: U,
      isShowXBar: Oe,
      isShowYBar: Be,
      isIos: M,
      handleScroll: ae,
      handleContentResize: ze,
      handleContainerResize: le,
      handleYScrollMouseDown: rt,
      handleXScrollMouseDown: we,
      cssVars: o ? void 0 : Rt,
      themeClass: dt == null ? void 0 : dt.themeClass,
      onRender: dt == null ? void 0 : dt.onRender
    });
  },
  render() {
    var e;
    const { $slots: t, mergedClsPrefix: o, triggerDisplayManually: r, rtlEnabled: n, internalHoistYRail: i } = this;
    if (!this.scrollable)
      return (e = t.default) === null || e === void 0 ? void 0 : e.call(t);
    const a = this.trigger === "none", l = () => m("div", { ref: "yRailRef", class: [
      `${o}-scrollbar-rail`,
      `${o}-scrollbar-rail--vertical`
    ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, m(a ? wi : Qt, a ? null : { name: "fade-in-transition" }, {
      default: () => this.needYBar && this.isShowYBar && !this.isIos ? m("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
        height: this.yBarSizePx,
        top: this.yBarTopPx
      }, onMousedown: this.handleYScrollMouseDown }) : null
    })), s = () => {
      var c, u;
      return (c = this.onRender) === null || c === void 0 || c.call(this), m("div", qi(this.$attrs, {
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
        this.container ? (u = t.default) === null || u === void 0 ? void 0 : u.call(t) : m(
          "div",
          { role: "none", ref: "containerRef", class: [
            `${o}-scrollbar-container`,
            this.containerClass
          ], style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel },
          m(Ir, { onResize: this.handleContentResize }, {
            default: () => m("div", { ref: "contentRef", role: "none", style: [
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
        this.xScrollable && m("div", { ref: "xRailRef", class: [
          `${o}-scrollbar-rail`,
          `${o}-scrollbar-rail--horizontal`
        ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, m(a ? wi : Qt, a ? null : { name: "fade-in-transition" }, {
          default: () => this.needXBar && this.isShowXBar && !this.isIos ? m("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
            width: this.xBarSizePx,
            right: n ? this.xBarLeftPx : void 0,
            left: n ? void 0 : this.xBarLeftPx
          }, onMousedown: this.handleXScrollMouseDown }) : null
        }))
      ]);
    }, d = this.container ? s() : m(Ir, { onResize: this.handleContainerResize }, {
      default: s
    });
    return i ? m(
      oo,
      null,
      d,
      l()
    ) : d;
  }
}), Fd = Ad, _x = Ad, Bx = {
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
}, Hd = (e) => {
  const { borderRadius: t, popoverColor: o, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: a, textColorDisabled: l, primaryColor: s, opacityDisabled: d, hoverColor: c, fontSizeSmall: u, fontSizeMedium: h, fontSizeLarge: v, fontSizeHuge: f, heightSmall: b, heightMedium: x, heightLarge: p, heightHuge: w } = e;
  return Object.assign(Object.assign({}, Bx), { optionFontSizeSmall: u, optionFontSizeMedium: h, optionFontSizeLarge: v, optionFontSizeHuge: f, optionHeightSmall: b, optionHeightMedium: x, optionHeightLarge: p, optionHeightHuge: w, borderRadius: t, color: o, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: a, optionTextColorDisabled: l, optionTextColorActive: s, optionOpacityDisabled: d, optionCheckColor: s, optionColorPending: c, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: c, actionTextColor: i, loadingColor: s });
}, Dx = {
  name: "InternalSelectMenu",
  common: vt,
  peers: {
    Scrollbar: Dd,
    Empty: ma
  },
  self: Hd
}, Ld = Dx, Ax = {
  name: "InternalSelectMenu",
  common: te,
  peers: {
    Scrollbar: $t,
    Empty: Ho
  },
  self: Hd
}, Wr = Ax;
function Fx(e, t) {
  return m(Qt, { name: "fade-in-scale-up-transition" }, {
    default: () => e ? m(to, { clsPrefix: t, class: `${t}-base-select-option__check` }, {
      default: () => m(z0)
    }) : null
  });
}
const Il = ge({
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
      valueRef: t,
      pendingTmNodeRef: o,
      multipleRef: r,
      valueSetRef: n,
      renderLabelRef: i,
      renderOptionRef: a,
      labelFieldRef: l,
      valueFieldRef: s,
      showCheckmarkRef: d,
      nodePropsRef: c,
      handleOptionClick: u,
      handleOptionMouseEnter: h
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = De(Xi), v = Ze(() => {
      const { value: p } = o;
      return p ? e.tmNode.key === p.key : !1;
    });
    function f(p) {
      const { tmNode: w } = e;
      w.disabled || u(p, w);
    }
    function b(p) {
      const { tmNode: w } = e;
      w.disabled || h(p, w);
    }
    function x(p) {
      const { tmNode: w } = e, { value: R } = v;
      w.disabled || R || h(p, w);
    }
    return {
      multiple: r,
      isGrouped: Ze(() => {
        const { tmNode: p } = e, { parent: w } = p;
        return w && w.rawNode.type === "group";
      }),
      showCheckmark: d,
      nodeProps: c,
      isPending: v,
      isSelected: Ze(() => {
        const { value: p } = t, { value: w } = r;
        if (p === null)
          return !1;
        const R = e.tmNode.rawNode[s.value];
        if (w) {
          const { value: y } = n;
          return y.has(R);
        } else
          return p === R;
      }),
      labelField: l,
      renderLabel: i,
      renderOption: a,
      handleMouseMove: x,
      handleMouseEnter: b,
      handleClick: f
    };
  },
  render() {
    const { clsPrefix: e, tmNode: { rawNode: t }, isSelected: o, isPending: r, isGrouped: n, showCheckmark: i, nodeProps: a, renderOption: l, renderLabel: s, handleClick: d, handleMouseEnter: c, handleMouseMove: u } = this, h = Fx(o, e), v = s ? [s(t, o), i && h] : [
      Xo(t[this.labelField], t, o),
      i && h
    ], f = a == null ? void 0 : a(t), b = m(
      "div",
      Object.assign({}, f, { class: [
        `${e}-base-select-option`,
        t.class,
        f == null ? void 0 : f.class,
        {
          [`${e}-base-select-option--disabled`]: t.disabled,
          [`${e}-base-select-option--selected`]: o,
          [`${e}-base-select-option--grouped`]: n,
          [`${e}-base-select-option--pending`]: r,
          [`${e}-base-select-option--show-checkmark`]: i
        }
      ], style: [(f == null ? void 0 : f.style) || "", t.style || ""], onClick: Gn([d, f == null ? void 0 : f.onClick]), onMouseenter: Gn([
        c,
        f == null ? void 0 : f.onMouseenter
      ]), onMousemove: Gn([u, f == null ? void 0 : f.onMousemove]) }),
      m("div", { class: `${e}-base-select-option__content` }, v)
    );
    return t.render ? t.render({ node: b, option: t, selected: o }) : l ? l({ node: b, option: t, selected: o }) : b;
  }
}), Ol = ge({
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
      renderOptionRef: t,
      labelFieldRef: o,
      nodePropsRef: r
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = De(Xi);
    return {
      labelField: o,
      nodeProps: r,
      renderLabel: e,
      renderOption: t
    };
  },
  render() {
    const { clsPrefix: e, renderLabel: t, renderOption: o, nodeProps: r, tmNode: { rawNode: n } } = this, i = r == null ? void 0 : r(n), a = t ? t(n, !1) : Xo(n[this.labelField], n, !1), l = m("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), a);
    return n.render ? n.render({ node: l, option: n }) : o ? o({ node: l, option: n, selected: !1 }) : l;
  }
}), {
  cubicBezierEaseIn: Rl,
  cubicBezierEaseOut: Ml
} = go;
function kn({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: o = ".9",
  originalTransform: r = "",
  originalTransition: n = ""
} = {}) {
  return [N("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Rl}, transform ${t} ${Rl} ${n && "," + n}`
  }), N("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Ml}, transform ${t} ${Ml} ${n && "," + n}`
  }), N("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${r} scale(${o})`
  }), N("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${r} scale(1)`
  })];
}
const Hx = B("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [B("scrollbar", `
 max-height: var(--n-height);
 `), B("virtual-list", `
 max-height: var(--n-height);
 `), B("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [A("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), B("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), B("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), A("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), A("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), A("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), B("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), B("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [Q("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), N("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), N("&:active", `
 color: var(--n-option-text-color-pressed);
 `), Q("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), Q("pending", [N("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), Q("selected", `
 color: var(--n-option-text-color-active);
 `, [N("&::before", `
 background-color: var(--n-option-color-active);
 `), Q("pending", [N("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), Q("disabled", `
 cursor: not-allowed;
 `, [tt("selected", `
 color: var(--n-option-text-color-disabled);
 `), Q("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), A("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [kn({
  enterScale: "0.5"
})])])]), Lx = ge({
  name: "InternalSelectMenu",
  props: Object.assign(Object.assign({}, Me.props), {
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
    const t = Me("InternalSelectMenu", "-internal-select-menu", Hx, Ld, e, Te(e, "clsPrefix")), o = W(null), r = W(null), n = W(null), i = E(() => e.treeMate.getFlattenedNodes()), a = E(() => ox(i.value)), l = W(null);
    function s() {
      const { treeMate: _ } = e;
      let U = null;
      const { value: ce } = e;
      ce === null ? U = _.getFirstAvailableNode() : (e.multiple ? U = _.getNode((ce || [])[(ce || []).length - 1]) : U = _.getNode(ce), (!U || U.disabled) && (U = _.getFirstAvailableNode())), z(U || null);
    }
    function d() {
      const { value: _ } = l;
      _ && !e.treeMate.getNode(_.key) && (l.value = null);
    }
    let c;
    Fe(() => e.show, (_) => {
      _ ? c = Fe(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? s() : d(), It(M)) : d();
      }, {
        immediate: !0
      }) : c == null || c();
    }, {
      immediate: !0
    }), wt(() => {
      c == null || c();
    });
    const u = E(() => Pr(t.value.self[re("optionHeight", e.size)])), h = E(() => sn(t.value.self[re("padding", e.size)])), v = E(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), f = E(() => {
      const _ = i.value;
      return _ && _.length === 0;
    });
    function b(_) {
      const { onToggle: U } = e;
      U && U(_);
    }
    function x(_) {
      const { onScroll: U } = e;
      U && U(_);
    }
    function p(_) {
      var U;
      (U = n.value) === null || U === void 0 || U.sync(), x(_);
    }
    function w() {
      var _;
      (_ = n.value) === null || _ === void 0 || _.sync();
    }
    function R() {
      const { value: _ } = l;
      return _ || null;
    }
    function y(_, U) {
      U.disabled || z(U, !1);
    }
    function T(_, U) {
      U.disabled || b(U);
    }
    function I(_) {
      var U;
      pn(_, "action") || (U = e.onKeyup) === null || U === void 0 || U.call(e, _);
    }
    function g(_) {
      var U;
      pn(_, "action") || (U = e.onKeydown) === null || U === void 0 || U.call(e, _);
    }
    function S(_) {
      var U;
      (U = e.onMousedown) === null || U === void 0 || U.call(e, _), !e.focusable && _.preventDefault();
    }
    function $() {
      const { value: _ } = l;
      _ && z(_.getNext({ loop: !0 }), !0);
    }
    function P() {
      const { value: _ } = l;
      _ && z(_.getPrev({ loop: !0 }), !0);
    }
    function z(_, U = !1) {
      l.value = _, U && M();
    }
    function M() {
      var _, U;
      const ce = l.value;
      if (!ce)
        return;
      const $e = a.value(ce.key);
      $e !== null && (e.virtualScroll ? (_ = r.value) === null || _ === void 0 || _.scrollTo({ index: $e }) : (U = n.value) === null || U === void 0 || U.scrollTo({
        index: $e,
        elSize: u.value
      }));
    }
    function F(_) {
      var U, ce;
      !((U = o.value) === null || U === void 0) && U.contains(_.target) && ((ce = e.onFocus) === null || ce === void 0 || ce.call(e, _));
    }
    function L(_) {
      var U, ce;
      !((U = o.value) === null || U === void 0) && U.contains(_.relatedTarget) || (ce = e.onBlur) === null || ce === void 0 || ce.call(e, _);
    }
    Ot(Xi, {
      handleOptionMouseEnter: y,
      handleOptionClick: T,
      valueSetRef: v,
      pendingTmNodeRef: l,
      nodePropsRef: Te(e, "nodeProps"),
      showCheckmarkRef: Te(e, "showCheckmark"),
      multipleRef: Te(e, "multiple"),
      valueRef: Te(e, "value"),
      renderLabelRef: Te(e, "renderLabel"),
      renderOptionRef: Te(e, "renderOption"),
      labelFieldRef: Te(e, "labelField"),
      valueFieldRef: Te(e, "valueField")
    }), Ot(Es, o), St(() => {
      const { value: _ } = n;
      _ && _.sync();
    });
    const G = E(() => {
      const { size: _ } = e, { common: { cubicBezierEaseInOut: U }, self: { height: ce, borderRadius: $e, color: Oe, groupHeaderTextColor: Be, actionDividerColor: ke, optionTextColorPressed: fe, optionTextColor: xe, optionTextColorDisabled: ze, optionTextColorActive: le, optionOpacityDisabled: Ve, optionCheckColor: He, actionTextColor: Ue, optionColorPending: Ke, optionColorActive: Je, loadingColor: st, loadingSize: gt, optionColorActivePending: Z, [re("optionFontSize", _)]: se, [re("optionHeight", _)]: ye, [re("optionPadding", _)]: ae } } = t.value;
      return {
        "--n-height": ce,
        "--n-action-divider-color": ke,
        "--n-action-text-color": Ue,
        "--n-bezier": U,
        "--n-border-radius": $e,
        "--n-color": Oe,
        "--n-option-font-size": se,
        "--n-group-header-text-color": Be,
        "--n-option-check-color": He,
        "--n-option-color-pending": Ke,
        "--n-option-color-active": Je,
        "--n-option-color-active-pending": Z,
        "--n-option-height": ye,
        "--n-option-opacity-disabled": Ve,
        "--n-option-text-color": xe,
        "--n-option-text-color-active": le,
        "--n-option-text-color-disabled": ze,
        "--n-option-text-color-pressed": fe,
        "--n-option-padding": ae,
        "--n-option-padding-left": sn(ae, "left"),
        "--n-option-padding-right": sn(ae, "right"),
        "--n-loading-color": st,
        "--n-loading-size": gt
      };
    }), { inlineThemeDisabled: K } = e, O = K ? xt("internal-select-menu", E(() => e.size[0]), G, e) : void 0, X = {
      selfRef: o,
      next: $,
      prev: P,
      getPendingTmNode: R
    };
    return Js(o, e.onResize), Object.assign({
      mergedTheme: t,
      virtualListRef: r,
      scrollbarRef: n,
      itemSize: u,
      padding: h,
      flattenedNodes: i,
      empty: f,
      virtualListContainer() {
        const { value: _ } = r;
        return _ == null ? void 0 : _.listElRef;
      },
      virtualListContent() {
        const { value: _ } = r;
        return _ == null ? void 0 : _.itemsElRef;
      },
      doScroll: x,
      handleFocusin: F,
      handleFocusout: L,
      handleKeyUp: I,
      handleKeyDown: g,
      handleMouseDown: S,
      handleVirtualListResize: w,
      handleVirtualListScroll: p,
      cssVars: K ? void 0 : G,
      themeClass: O == null ? void 0 : O.themeClass,
      onRender: O == null ? void 0 : O.onRender
    }, X);
  },
  render() {
    const { $slots: e, virtualScroll: t, clsPrefix: o, mergedTheme: r, themeClass: n, onRender: i } = this;
    return i == null || i(), m(
      "div",
      { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [
        `${o}-base-select-menu`,
        n,
        this.multiple && `${o}-base-select-menu--multiple`
      ], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
      this.loading ? m(
        "div",
        { class: `${o}-base-select-menu__loading` },
        m(va, { clsPrefix: o, strokeWidth: 20 })
      ) : this.empty ? m("div", { class: `${o}-base-select-menu__empty`, "data-empty": !0 }, Jt(e.empty, () => [
        m(zx, { theme: r.peers.Empty, themeOverrides: r.peerOverrides.Empty })
      ])) : m(Fd, { ref: "scrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, scrollable: this.scrollable, container: t ? this.virtualListContainer : void 0, content: t ? this.virtualListContent : void 0, onScroll: t ? void 0 : this.doScroll }, {
        default: () => t ? m(Bh, { ref: "virtualListRef", class: `${o}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: !1, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: !0 }, {
          default: ({ item: a }) => a.isGroup ? m(Ol, { key: a.key, clsPrefix: o, tmNode: a }) : a.ignored ? null : m(Il, { clsPrefix: o, key: a.key, tmNode: a })
        }) : m("div", { class: `${o}-base-select-menu-option-wrapper`, style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        } }, this.flattenedNodes.map((a) => a.isGroup ? m(Ol, { key: a.key, clsPrefix: o, tmNode: a }) : m(Il, { clsPrefix: o, key: a.key, tmNode: a })))
      }),
      bt(e.action, (a) => a && [
        m("div", { class: `${o}-base-select-menu__action`, "data-action": !0, key: "action" }, a),
        m(L0, { onFocus: this.onTabOut, key: "focus-detector" })
      ])
    );
  }
}), Wx = B("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), Nx = ge({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    nr("-base-wave", Wx, Te(e, "clsPrefix"));
    const t = W(null), o = W(!1);
    let r = null;
    return wt(() => {
      r !== null && window.clearTimeout(r);
    }), {
      active: o,
      selfRef: t,
      play() {
        r !== null && (window.clearTimeout(r), o.value = !1, r = null), It(() => {
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
    return m("div", { ref: "selfRef", "aria-hidden": !0, class: [
      `${e}-base-wave`,
      this.active && `${e}-base-wave--active`
    ] });
  }
}), jx = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
}, Wd = (e) => {
  const { boxShadow2: t, popoverColor: o, textColor2: r, borderRadius: n, fontSize: i, dividerColor: a } = e;
  return Object.assign(Object.assign({}, jx), {
    fontSize: i,
    borderRadius: n,
    color: o,
    dividerColor: a,
    textColor: r,
    boxShadow: t
  });
}, Vx = {
  name: "Popover",
  common: vt,
  self: Wd
}, ba = Vx, Ux = {
  name: "Popover",
  common: te,
  self: Wd
}, Lo = Ux, si = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, it = "var(--n-arrow-height) * 1.414", qx = N([B("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [N(">", [B("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), tt("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [tt("scrollable", [tt("show-header-or-footer", "padding: var(--n-padding);")])]), A("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), A("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), Q("scrollable, show-header-or-footer", [A("content", `
 padding: var(--n-padding);
 `)])]), B("popover-shared", `
 transform-origin: inherit;
 `, [
  B("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [B("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${it});
 height: calc(${it});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
  // body transition
  N("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  N("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  N("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  N("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
]), Mt("top-start", `
 top: calc(${it} / -2);
 left: calc(${Zt("top-start")} - var(--v-offset-left));
 `), Mt("top", `
 top: calc(${it} / -2);
 transform: translateX(calc(${it} / -2)) rotate(45deg);
 left: 50%;
 `), Mt("top-end", `
 top: calc(${it} / -2);
 right: calc(${Zt("top-end")} + var(--v-offset-left));
 `), Mt("bottom-start", `
 bottom: calc(${it} / -2);
 left: calc(${Zt("bottom-start")} - var(--v-offset-left));
 `), Mt("bottom", `
 bottom: calc(${it} / -2);
 transform: translateX(calc(${it} / -2)) rotate(45deg);
 left: 50%;
 `), Mt("bottom-end", `
 bottom: calc(${it} / -2);
 right: calc(${Zt("bottom-end")} + var(--v-offset-left));
 `), Mt("left-start", `
 left: calc(${it} / -2);
 top: calc(${Zt("left-start")} - var(--v-offset-top));
 `), Mt("left", `
 left: calc(${it} / -2);
 transform: translateY(calc(${it} / -2)) rotate(45deg);
 top: 50%;
 `), Mt("left-end", `
 left: calc(${it} / -2);
 bottom: calc(${Zt("left-end")} + var(--v-offset-top));
 `), Mt("right-start", `
 right: calc(${it} / -2);
 top: calc(${Zt("right-start")} - var(--v-offset-top));
 `), Mt("right", `
 right: calc(${it} / -2);
 transform: translateY(calc(${it} / -2)) rotate(45deg);
 top: 50%;
 `), Mt("right-end", `
 right: calc(${it} / -2);
 bottom: calc(${Zt("right-end")} + var(--v-offset-top));
 `), ...Eb({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const o = ["right", "left"].includes(t), r = o ? "width" : "height";
  return e.map((n) => {
    const i = n.split("-")[1] === "end", l = `calc((${`var(--v-target-${r}, 0px)`} - ${it}) / 2)`, s = Zt(n);
    return N(`[v-placement="${n}"] >`, [B("popover-shared", [Q("center-arrow", [B("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${o ? "left" : "top"}));`)])])]);
  });
})]);
function Zt(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function Mt(e, t) {
  const o = e.split("-")[0], r = ["top", "bottom"].includes(o) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return N(`[v-placement="${e}"] >`, [B("popover-shared", `
 margin-${si[o]}: var(--n-space);
 `, [Q("show-arrow", `
 margin-${si[o]}: var(--n-space-arrow);
 `), Q("overlap", `
 margin: 0;
 `), zf("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${o}: 100%;
 ${si[o]}: auto;
 ${r}
 `, [B("popover-arrow", t)])])]);
}
const Nd = Object.assign(Object.assign({}, Me.props), {
  to: Bt.propTo,
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
}), Gx = ({ arrowStyle: e, clsPrefix: t }) => m(
  "div",
  { key: "__popover-arrow__", class: `${t}-popover-arrow-wrapper` },
  m("div", { class: `${t}-popover-arrow`, style: e })
), Kx = ge({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: Nd,
  setup(e, { slots: t, attrs: o }) {
    const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = Ct(e), a = Me("Popover", "-popover", qx, ba, e, n), l = W(null), s = De("NPopover"), d = W(null), c = W(e.show), u = W(!1);
    pt(() => {
      const { show: g } = e;
      g && !If() && !e.internalDeactivateImmediately && (u.value = !0);
    });
    const h = E(() => {
      const { trigger: g, onClickoutside: S } = e, $ = [], { positionManuallyRef: { value: P } } = s;
      return P || (g === "click" && !S && $.push([
        xn,
        y,
        void 0,
        { capture: !0 }
      ]), g === "hover" && $.push([Kf, R])), S && $.push([
        xn,
        y,
        void 0,
        { capture: !0 }
      ]), (e.displayDirective === "show" || e.animated && u.value) && $.push([os, e.show]), $;
    }), v = E(() => {
      const g = e.width === "trigger" ? void 0 : Jo(e.width), S = [];
      g && S.push({ width: g });
      const { maxWidth: $, minWidth: P } = e;
      return $ && S.push({ maxWidth: Jo($) }), P && S.push({ maxWidth: Jo(P) }), i || S.push(f.value), S;
    }), f = E(() => {
      const { common: { cubicBezierEaseInOut: g, cubicBezierEaseIn: S, cubicBezierEaseOut: $ }, self: { space: P, spaceArrow: z, padding: M, fontSize: F, textColor: L, dividerColor: G, color: K, boxShadow: O, borderRadius: X, arrowHeight: _, arrowOffset: U, arrowOffsetVertical: ce } } = a.value;
      return {
        "--n-box-shadow": O,
        "--n-bezier": g,
        "--n-bezier-ease-in": S,
        "--n-bezier-ease-out": $,
        "--n-font-size": F,
        "--n-text-color": L,
        "--n-color": K,
        "--n-divider-color": G,
        "--n-border-radius": X,
        "--n-arrow-height": _,
        "--n-arrow-offset": U,
        "--n-arrow-offset-vertical": ce,
        "--n-padding": M,
        "--n-space": P,
        "--n-space-arrow": z
      };
    }), b = i ? xt("popover", void 0, f, e) : void 0;
    s.setBodyInstance({
      syncPosition: x
    }), wt(() => {
      s.setBodyInstance(null);
    }), Fe(Te(e, "show"), (g) => {
      e.animated || (g ? c.value = !0 : c.value = !1);
    });
    function x() {
      var g;
      (g = l.value) === null || g === void 0 || g.syncPosition();
    }
    function p(g) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(g);
    }
    function w(g) {
      e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(g);
    }
    function R(g) {
      e.trigger === "hover" && !T().contains($r(g)) && s.handleMouseMoveOutside(g);
    }
    function y(g) {
      (e.trigger === "click" && !T().contains($r(g)) || e.onClickoutside) && s.handleClickOutside(g);
    }
    function T() {
      return s.getTriggerElement();
    }
    Ot(Ds, d), Ot(Bs, null), Ot(_s, null);
    function I() {
      if (b == null || b.onRender(), !(e.displayDirective === "show" || e.show || e.animated && u.value))
        return null;
      let S;
      const $ = s.internalRenderBodyRef.value, { value: P } = n;
      if ($)
        S = $(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [
            `${P}-popover-shared`,
            b == null ? void 0 : b.themeClass.value,
            e.overlap && `${P}-popover-shared--overlap`,
            e.showArrow && `${P}-popover-shared--show-arrow`,
            e.arrowPointToCenter && `${P}-popover-shared--center-arrow`
          ],
          d,
          v.value,
          p,
          w
        );
      else {
        const { value: z } = s.extraClassRef, { internalTrapFocus: M } = e, F = !yi(t.header) || !yi(t.footer), L = () => {
          var G;
          const K = F ? m(
            oo,
            null,
            bt(t.header, (_) => _ ? m("div", { class: `${P}-popover__header`, style: e.headerStyle }, _) : null),
            bt(t.default, (_) => _ ? m("div", { class: `${P}-popover__content`, style: e.contentStyle }, t) : null),
            bt(t.footer, (_) => _ ? m("div", { class: `${P}-popover__footer`, style: e.footerStyle }, _) : null)
          ) : e.scrollable ? (G = t.default) === null || G === void 0 ? void 0 : G.call(t) : m("div", { class: `${P}-popover__content`, style: e.contentStyle }, t), O = e.scrollable ? m(_x, { contentClass: F ? void 0 : `${P}-popover__content`, contentStyle: F ? void 0 : e.contentStyle }, {
            default: () => K
          }) : K, X = e.showArrow ? Gx({
            arrowStyle: e.arrowStyle,
            clsPrefix: P
          }) : null;
          return [O, X];
        };
        S = m("div", qi({
          class: [
            `${P}-popover`,
            `${P}-popover-shared`,
            b == null ? void 0 : b.themeClass.value,
            z.map((G) => `${P}-${G}`),
            {
              [`${P}-popover--scrollable`]: e.scrollable,
              [`${P}-popover--show-header-or-footer`]: F,
              [`${P}-popover--raw`]: e.raw,
              [`${P}-popover-shared--overlap`]: e.overlap,
              [`${P}-popover-shared--show-arrow`]: e.showArrow,
              [`${P}-popover-shared--center-arrow`]: e.arrowPointToCenter
            }
          ],
          ref: d,
          style: v.value,
          onKeydown: s.handleKeydown,
          onMouseenter: p,
          onMouseleave: w
        }, o), M ? m(Fh, { active: e.show, autoFocus: !0 }, { default: L }) : L());
      }
      return Dr(S, h.value);
    }
    return {
      displayed: u,
      namespace: r,
      isMounted: s.isMountedRef,
      zIndex: s.zIndexRef,
      followerRef: l,
      adjustedTo: Bt(e),
      followerEnabled: c,
      renderContentNode: I
    };
  },
  render() {
    return m(ea, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === Bt.tdkey }, {
      default: () => this.animated ? m(Qt, {
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
}), Yx = Object.keys(Nd), Xx = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function Zx(e, t, o) {
  Xx[t].forEach((r) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const n = e.props[r], i = o[r];
    n ? e.props[r] = (...a) => {
      n(...a), i(...a);
    } : e.props[r] = i;
  });
}
const Jx = ot("").type, jd = {
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
  to: Bt.propTo,
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
}, Qx = Object.assign(Object.assign(Object.assign({}, Me.props), jd), { internalOnAfterLeave: Function, internalRenderBody: Function }), Vd = ge({
  name: "Popover",
  inheritAttrs: !1,
  props: Qx,
  __popover__: !0,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      e.maxWidth !== void 0 && kt("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && kt("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && kt("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && kt("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && kt("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
    });
    const t = Hr(), o = W(null), r = E(() => e.show), n = W(e.defaultShow), i = fo(r, n), a = Ze(() => e.disabled ? !1 : i.value), l = () => {
      if (e.disabled)
        return !0;
      const { getDisabled: L } = e;
      return !!(L != null && L());
    }, s = () => l() ? !1 : i.value, d = Ms(e, ["arrow", "showArrow"]), c = E(() => e.overlap ? !1 : d.value);
    let u = null;
    const h = W(null), v = W(null), f = Ze(() => e.x !== void 0 && e.y !== void 0);
    function b(L) {
      const { "onUpdate:show": G, onUpdateShow: K, onShow: O, onHide: X } = e;
      n.value = L, G && pe(G, L), K && pe(K, L), L && O && pe(O, !0), L && X && pe(X, !1);
    }
    function x() {
      u && u.syncPosition();
    }
    function p() {
      const { value: L } = h;
      L && (window.clearTimeout(L), h.value = null);
    }
    function w() {
      const { value: L } = v;
      L && (window.clearTimeout(L), v.value = null);
    }
    function R() {
      const L = l();
      if (e.trigger === "focus" && !L) {
        if (s())
          return;
        b(!0);
      }
    }
    function y() {
      const L = l();
      if (e.trigger === "focus" && !L) {
        if (!s())
          return;
        b(!1);
      }
    }
    function T() {
      const L = l();
      if (e.trigger === "hover" && !L) {
        if (w(), h.value !== null || s())
          return;
        const G = () => {
          b(!0), h.value = null;
        }, { delay: K } = e;
        K === 0 ? G() : h.value = window.setTimeout(G, K);
      }
    }
    function I() {
      const L = l();
      if (e.trigger === "hover" && !L) {
        if (p(), v.value !== null || !s())
          return;
        const G = () => {
          b(!1), v.value = null;
        }, { duration: K } = e;
        K === 0 ? G() : v.value = window.setTimeout(G, K);
      }
    }
    function g() {
      I();
    }
    function S(L) {
      var G;
      s() && (e.trigger === "click" && (p(), w(), b(!1)), (G = e.onClickoutside) === null || G === void 0 || G.call(e, L));
    }
    function $() {
      if (e.trigger === "click" && !l()) {
        p(), w();
        const L = !s();
        b(L);
      }
    }
    function P(L) {
      e.internalTrapFocus && L.key === "Escape" && (p(), w(), b(!1));
    }
    function z(L) {
      n.value = L;
    }
    function M() {
      var L;
      return (L = o.value) === null || L === void 0 ? void 0 : L.targetRef;
    }
    function F(L) {
      u = L;
    }
    return Ot("NPopover", {
      getTriggerElement: M,
      handleKeydown: P,
      handleMouseEnter: T,
      handleMouseLeave: I,
      handleClickOutside: S,
      handleMouseMoveOutside: g,
      setBodyInstance: F,
      positionManuallyRef: f,
      isMountedRef: t,
      zIndexRef: Te(e, "zIndex"),
      extraClassRef: Te(e, "internalExtraClass"),
      internalRenderBodyRef: Te(e, "internalRenderBody")
    }), pt(() => {
      i.value && l() && b(!1);
    }), {
      binderInstRef: o,
      positionManually: f,
      mergedShowConsideringDisabledProp: a,
      // if to show popover body
      uncontrolledShow: n,
      mergedShowArrow: c,
      getMergedShow: s,
      setShow: z,
      handleClick: $,
      handleMouseEnter: T,
      handleMouseLeave: I,
      handleFocus: R,
      handleBlur: y,
      syncPosition: x
    };
  },
  render() {
    var e;
    const { positionManually: t, $slots: o } = this;
    let r, n = !1;
    if (!t && (o.activator ? r = Oa(o, "activator") : r = Oa(o, "trigger"), r)) {
      r = gu(r), r = r.type === Jx ? m("span", [r]) : r;
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
          onBlur: (d) => {
            l.forEach((c) => {
              c.onBlur(d);
            });
          },
          onFocus: (d) => {
            l.forEach((c) => {
              c.onFocus(d);
            });
          },
          onClick: (d) => {
            l.forEach((c) => {
              c.onClick(d);
            });
          },
          onMouseenter: (d) => {
            l.forEach((c) => {
              c.onMouseenter(d);
            });
          },
          onMouseleave: (d) => {
            l.forEach((c) => {
              c.onMouseleave(d);
            });
          }
        };
        Zx(r, a ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return m(Zi, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [
          this.internalTrapFocus && i ? Dr(m("div", { style: { position: "fixed", inset: 0 } }), [
            [
              Ls,
              {
                enabled: i,
                zIndex: this.zIndex
              }
            ]
          ]) : null,
          t ? null : m(Ji, null, {
            default: () => r
          }),
          m(Kx, rf(this.$props, Yx, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
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
}), Ud = {
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
}, eC = {
  name: "Tag",
  common: te,
  self(e) {
    const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: d, borderColor: c, tagColor: u, opacityDisabled: h, closeIconColor: v, closeIconColorHover: f, closeIconColorPressed: b, closeColorHover: x, closeColorPressed: p, borderRadiusSmall: w, fontSizeMini: R, fontSizeTiny: y, fontSizeSmall: T, fontSizeMedium: I, heightMini: g, heightTiny: S, heightSmall: $, heightMedium: P, buttonColor2Hover: z, buttonColor2Pressed: M, fontWeightStrong: F } = e;
    return Object.assign(Object.assign({}, Ud), {
      closeBorderRadius: w,
      heightTiny: g,
      heightSmall: S,
      heightMedium: $,
      heightLarge: P,
      borderRadius: w,
      opacityDisabled: h,
      fontSizeTiny: R,
      fontSizeSmall: y,
      fontSizeMedium: T,
      fontSizeLarge: I,
      fontWeightStrong: F,
      // checked
      textColorCheckable: t,
      textColorHoverCheckable: t,
      textColorPressedCheckable: t,
      textColorChecked: d,
      colorCheckable: "#0000",
      colorHoverCheckable: z,
      colorPressedCheckable: M,
      colorChecked: n,
      colorCheckedHover: o,
      colorCheckedPressed: r,
      // default
      border: `1px solid ${c}`,
      textColor: t,
      color: u,
      colorBordered: "#0000",
      closeIconColor: v,
      closeIconColorHover: f,
      closeIconColorPressed: b,
      closeColorHover: x,
      closeColorPressed: p,
      borderPrimary: `1px solid ${Y(n, { alpha: 0.3 })}`,
      textColorPrimary: n,
      colorPrimary: Y(n, { alpha: 0.16 }),
      colorBorderedPrimary: "#0000",
      closeIconColorPrimary: Qe(n, { lightness: 0.7 }),
      closeIconColorHoverPrimary: Qe(n, { lightness: 0.7 }),
      closeIconColorPressedPrimary: Qe(n, {
        lightness: 0.7
      }),
      closeColorHoverPrimary: Y(n, { alpha: 0.16 }),
      closeColorPressedPrimary: Y(n, { alpha: 0.12 }),
      borderInfo: `1px solid ${Y(i, { alpha: 0.3 })}`,
      textColorInfo: i,
      colorInfo: Y(i, { alpha: 0.16 }),
      colorBorderedInfo: "#0000",
      closeIconColorInfo: Qe(i, { alpha: 0.7 }),
      closeIconColorHoverInfo: Qe(i, { alpha: 0.7 }),
      closeIconColorPressedInfo: Qe(i, { alpha: 0.7 }),
      closeColorHoverInfo: Y(i, { alpha: 0.16 }),
      closeColorPressedInfo: Y(i, { alpha: 0.12 }),
      borderSuccess: `1px solid ${Y(a, { alpha: 0.3 })}`,
      textColorSuccess: a,
      colorSuccess: Y(a, { alpha: 0.16 }),
      colorBorderedSuccess: "#0000",
      closeIconColorSuccess: Qe(a, { alpha: 0.7 }),
      closeIconColorHoverSuccess: Qe(a, { alpha: 0.7 }),
      closeIconColorPressedSuccess: Qe(a, { alpha: 0.7 }),
      closeColorHoverSuccess: Y(a, { alpha: 0.16 }),
      closeColorPressedSuccess: Y(a, { alpha: 0.12 }),
      borderWarning: `1px solid ${Y(l, { alpha: 0.3 })}`,
      textColorWarning: l,
      colorWarning: Y(l, { alpha: 0.16 }),
      colorBorderedWarning: "#0000",
      closeIconColorWarning: Qe(l, { alpha: 0.7 }),
      closeIconColorHoverWarning: Qe(l, { alpha: 0.7 }),
      closeIconColorPressedWarning: Qe(l, { alpha: 0.7 }),
      closeColorHoverWarning: Y(l, { alpha: 0.16 }),
      closeColorPressedWarning: Y(l, { alpha: 0.11 }),
      borderError: `1px solid ${Y(s, { alpha: 0.3 })}`,
      textColorError: s,
      colorError: Y(s, { alpha: 0.16 }),
      colorBorderedError: "#0000",
      closeIconColorError: Qe(s, { alpha: 0.7 }),
      closeIconColorHoverError: Qe(s, { alpha: 0.7 }),
      closeIconColorPressedError: Qe(s, { alpha: 0.7 }),
      closeColorHoverError: Y(s, { alpha: 0.16 }),
      closeColorPressedError: Y(s, { alpha: 0.12 })
    });
  }
}, qd = eC, tC = (e) => {
  const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: d, borderColor: c, opacityDisabled: u, tagColor: h, closeIconColor: v, closeIconColorHover: f, closeIconColorPressed: b, borderRadiusSmall: x, fontSizeMini: p, fontSizeTiny: w, fontSizeSmall: R, fontSizeMedium: y, heightMini: T, heightTiny: I, heightSmall: g, heightMedium: S, closeColorHover: $, closeColorPressed: P, buttonColor2Hover: z, buttonColor2Pressed: M, fontWeightStrong: F } = e;
  return Object.assign(Object.assign({}, Ud), {
    closeBorderRadius: x,
    heightTiny: T,
    heightSmall: I,
    heightMedium: g,
    heightLarge: S,
    borderRadius: x,
    opacityDisabled: u,
    fontSizeTiny: p,
    fontSizeSmall: w,
    fontSizeMedium: R,
    fontSizeLarge: y,
    fontWeightStrong: F,
    // checked
    textColorCheckable: t,
    textColorHoverCheckable: t,
    textColorPressedCheckable: t,
    textColorChecked: d,
    colorCheckable: "#0000",
    colorHoverCheckable: z,
    colorPressedCheckable: M,
    colorChecked: n,
    colorCheckedHover: o,
    colorCheckedPressed: r,
    // default
    border: `1px solid ${c}`,
    textColor: t,
    color: h,
    colorBordered: "rgb(250, 250, 252)",
    closeIconColor: v,
    closeIconColorHover: f,
    closeIconColorPressed: b,
    closeColorHover: $,
    closeColorPressed: P,
    borderPrimary: `1px solid ${Y(n, { alpha: 0.3 })}`,
    textColorPrimary: n,
    colorPrimary: Y(n, { alpha: 0.12 }),
    colorBorderedPrimary: Y(n, { alpha: 0.1 }),
    closeIconColorPrimary: n,
    closeIconColorHoverPrimary: n,
    closeIconColorPressedPrimary: n,
    closeColorHoverPrimary: Y(n, { alpha: 0.12 }),
    closeColorPressedPrimary: Y(n, { alpha: 0.18 }),
    borderInfo: `1px solid ${Y(i, { alpha: 0.3 })}`,
    textColorInfo: i,
    colorInfo: Y(i, { alpha: 0.12 }),
    colorBorderedInfo: Y(i, { alpha: 0.1 }),
    closeIconColorInfo: i,
    closeIconColorHoverInfo: i,
    closeIconColorPressedInfo: i,
    closeColorHoverInfo: Y(i, { alpha: 0.12 }),
    closeColorPressedInfo: Y(i, { alpha: 0.18 }),
    borderSuccess: `1px solid ${Y(a, { alpha: 0.3 })}`,
    textColorSuccess: a,
    colorSuccess: Y(a, { alpha: 0.12 }),
    colorBorderedSuccess: Y(a, { alpha: 0.1 }),
    closeIconColorSuccess: a,
    closeIconColorHoverSuccess: a,
    closeIconColorPressedSuccess: a,
    closeColorHoverSuccess: Y(a, { alpha: 0.12 }),
    closeColorPressedSuccess: Y(a, { alpha: 0.18 }),
    borderWarning: `1px solid ${Y(l, { alpha: 0.35 })}`,
    textColorWarning: l,
    colorWarning: Y(l, { alpha: 0.15 }),
    colorBorderedWarning: Y(l, { alpha: 0.12 }),
    closeIconColorWarning: l,
    closeIconColorHoverWarning: l,
    closeIconColorPressedWarning: l,
    closeColorHoverWarning: Y(l, { alpha: 0.12 }),
    closeColorPressedWarning: Y(l, { alpha: 0.18 }),
    borderError: `1px solid ${Y(s, { alpha: 0.23 })}`,
    textColorError: s,
    colorError: Y(s, { alpha: 0.1 }),
    colorBorderedError: Y(s, { alpha: 0.08 }),
    closeIconColorError: s,
    closeIconColorHoverError: s,
    closeIconColorPressedError: s,
    closeColorHoverError: Y(s, { alpha: 0.12 }),
    closeColorPressedError: Y(s, { alpha: 0.18 })
  });
}, oC = {
  name: "Tag",
  common: vt,
  self: tC
}, rC = oC, nC = {
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
}, iC = B("tag", `
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
`, [Q("strong", `
 font-weight: var(--n-font-weight-strong);
 `), A("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), A("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), A("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), A("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), Q("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [A("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), A("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), Q("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), Q("icon, avatar", [Q("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), Q("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), Q("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [tt("disabled", [N("&:hover", "background-color: var(--n-color-hover-checkable);", [tt("checked", "color: var(--n-text-color-hover-checkable);")]), N("&:active", "background-color: var(--n-color-pressed-checkable);", [tt("checked", "color: var(--n-text-color-pressed-checkable);")])]), Q("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [tt("disabled", [N("&:hover", "background-color: var(--n-color-checked-hover);"), N("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), aC = Object.assign(Object.assign(Object.assign({}, Me.props), nC), {
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
}), lC = "n-tag", di = ge({
  name: "Tag",
  props: aC,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      e.onCheckedChange !== void 0 && kt("tag", "`on-checked-change` is deprecated, please use `on-update:checked` instead");
    });
    const t = W(null), { mergedBorderedRef: o, mergedClsPrefixRef: r, inlineThemeDisabled: n, mergedRtlRef: i } = Ct(e), a = Me("Tag", "-tag", iC, rC, e, r);
    Ot(lC, {
      roundRef: Te(e, "round")
    });
    function l(v) {
      if (!e.disabled && e.checkable) {
        const { checked: f, onCheckedChange: b, onUpdateChecked: x, "onUpdate:checked": p } = e;
        x && x(!f), p && p(!f), b && b(!f);
      }
    }
    function s(v) {
      if (e.triggerClickOnClose || v.stopPropagation(), !e.disabled) {
        const { onClose: f } = e;
        f && pe(f, v);
      }
    }
    const d = {
      setTextContent(v) {
        const { value: f } = t;
        f && (f.textContent = v);
      }
    }, c = Fo("Tag", i, r), u = E(() => {
      const { type: v, size: f, color: { color: b, textColor: x } = {} } = e, { common: { cubicBezierEaseInOut: p }, self: { padding: w, closeMargin: R, closeMarginRtl: y, borderRadius: T, opacityDisabled: I, textColorCheckable: g, textColorHoverCheckable: S, textColorPressedCheckable: $, textColorChecked: P, colorCheckable: z, colorHoverCheckable: M, colorPressedCheckable: F, colorChecked: L, colorCheckedHover: G, colorCheckedPressed: K, closeBorderRadius: O, fontWeightStrong: X, [re("colorBordered", v)]: _, [re("closeSize", f)]: U, [re("closeIconSize", f)]: ce, [re("fontSize", f)]: $e, [re("height", f)]: Oe, [re("color", v)]: Be, [re("textColor", v)]: ke, [re("border", v)]: fe, [re("closeIconColor", v)]: xe, [re("closeIconColorHover", v)]: ze, [re("closeIconColorPressed", v)]: le, [re("closeColorHover", v)]: Ve, [re("closeColorPressed", v)]: He } } = a.value;
      return {
        "--n-font-weight-strong": X,
        "--n-avatar-size-override": `calc(${Oe} - 8px)`,
        "--n-bezier": p,
        "--n-border-radius": T,
        "--n-border": fe,
        "--n-close-icon-size": ce,
        "--n-close-color-pressed": He,
        "--n-close-color-hover": Ve,
        "--n-close-border-radius": O,
        "--n-close-icon-color": xe,
        "--n-close-icon-color-hover": ze,
        "--n-close-icon-color-pressed": le,
        "--n-close-icon-color-disabled": xe,
        "--n-close-margin": R,
        "--n-close-margin-rtl": y,
        "--n-close-size": U,
        "--n-color": b || (o.value ? _ : Be),
        "--n-color-checkable": z,
        "--n-color-checked": L,
        "--n-color-checked-hover": G,
        "--n-color-checked-pressed": K,
        "--n-color-hover-checkable": M,
        "--n-color-pressed-checkable": F,
        "--n-font-size": $e,
        "--n-height": Oe,
        "--n-opacity-disabled": I,
        "--n-padding": w,
        "--n-text-color": x || ke,
        "--n-text-color-checkable": g,
        "--n-text-color-checked": P,
        "--n-text-color-hover-checkable": S,
        "--n-text-color-pressed-checkable": $
      };
    }), h = n ? xt("tag", E(() => {
      let v = "";
      const { type: f, size: b, color: { color: x, textColor: p } = {} } = e;
      return v += f[0], v += b[0], x && (v += `a${mn(x)}`), p && (v += `b${mn(p)}`), o.value && (v += "c"), v;
    }), u, e) : void 0;
    return Object.assign(Object.assign({}, d), {
      rtlEnabled: c,
      mergedClsPrefix: r,
      contentRef: t,
      mergedBordered: o,
      handleClick: l,
      handleCloseClick: s,
      cssVars: n ? void 0 : u,
      themeClass: h == null ? void 0 : h.themeClass,
      onRender: h == null ? void 0 : h.onRender
    });
  },
  render() {
    var e, t;
    const { mergedClsPrefix: o, rtlEnabled: r, closable: n, color: { borderColor: i } = {}, round: a, onRender: l, $slots: s } = this;
    l == null || l();
    const d = bt(s.avatar, (u) => u && m("div", { class: `${o}-tag__avatar` }, u)), c = bt(s.icon, (u) => u && m("div", { class: `${o}-tag__icon` }, u));
    return m(
      "div",
      { class: [
        `${o}-tag`,
        this.themeClass,
        {
          [`${o}-tag--rtl`]: r,
          [`${o}-tag--strong`]: this.strong,
          [`${o}-tag--disabled`]: this.disabled,
          [`${o}-tag--checkable`]: this.checkable,
          [`${o}-tag--checked`]: this.checkable && this.checked,
          [`${o}-tag--round`]: a,
          [`${o}-tag--avatar`]: d,
          [`${o}-tag--icon`]: c,
          [`${o}-tag--closable`]: n
        }
      ], style: this.cssVars, onClick: this.handleClick, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
      c || d,
      m("span", { class: `${o}-tag__content`, ref: "contentRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)),
      !this.checkable && n ? m(H0, { clsPrefix: o, class: `${o}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: a, isButtonTag: this.internalCloseIsButtonTag, absolute: !0 }) : null,
      !this.checkable && this.mergedBordered ? m("div", { class: `${o}-tag__border`, style: { borderColor: i } }) : null
    );
  }
}), sC = B("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [N(">", [A("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [N("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), N("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), A("placeholder", `
 display: flex;
 `), A("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [Er({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), Ai = ge({
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
    return nr("-base-clear", sC, Te(e, "clsPrefix")), {
      handleMouseDown(t) {
        t.preventDefault();
      }
    };
  },
  render() {
    const { clsPrefix: e } = this;
    return m(
      "div",
      { class: `${e}-base-clear` },
      m(Dn, null, {
        default: () => {
          var t, o;
          return this.show ? m("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Jt(this.$slots.icon, () => [
            m(to, { clsPrefix: e }, {
              default: () => m(B0, null)
            })
          ])) : m("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (o = (t = this.$slots).placeholder) === null || o === void 0 ? void 0 : o.call(t));
        }
      })
    );
  }
}), Gd = ge({
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
      return m(va, { clsPrefix: o, class: `${o}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
        default: () => e.showArrow ? m(Ai, { clsPrefix: o, show: e.showClear, onClear: e.onClear }, {
          placeholder: () => m(to, { clsPrefix: o, class: `${o}-base-suffix__arrow` }, {
            default: () => Jt(t.default, () => [
              m(_0, null)
            ])
          })
        }) : null
      });
    };
  }
}), Kd = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
}, dC = (e) => {
  const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: u, borderColor: h, iconColor: v, iconColorDisabled: f, clearColor: b, clearColorHover: x, clearColorPressed: p, placeholderColor: w, placeholderColorDisabled: R, fontSizeTiny: y, fontSizeSmall: T, fontSizeMedium: I, fontSizeLarge: g, heightTiny: S, heightSmall: $, heightMedium: P, heightLarge: z } = e;
  return Object.assign(Object.assign({}, Kd), {
    fontSizeTiny: y,
    fontSizeSmall: T,
    fontSizeMedium: I,
    fontSizeLarge: g,
    heightTiny: S,
    heightSmall: $,
    heightMedium: P,
    heightLarge: z,
    borderRadius: t,
    // default
    textColor: o,
    textColorDisabled: r,
    placeholderColor: w,
    placeholderColorDisabled: R,
    color: n,
    colorDisabled: i,
    colorActive: n,
    border: `1px solid ${h}`,
    borderHover: `1px solid ${l}`,
    borderActive: `1px solid ${a}`,
    borderFocus: `1px solid ${l}`,
    boxShadowHover: "none",
    boxShadowActive: `0 0 0 2px ${Y(a, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${Y(a, {
      alpha: 0.2
    })}`,
    caretColor: a,
    arrowColor: v,
    arrowColorDisabled: f,
    loadingColor: a,
    // warning
    borderWarning: `1px solid ${s}`,
    borderHoverWarning: `1px solid ${d}`,
    borderActiveWarning: `1px solid ${s}`,
    borderFocusWarning: `1px solid ${d}`,
    boxShadowHoverWarning: "none",
    boxShadowActiveWarning: `0 0 0 2px ${Y(s, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${Y(s, {
      alpha: 0.2
    })}`,
    colorActiveWarning: n,
    caretColorWarning: s,
    // error
    borderError: `1px solid ${c}`,
    borderHoverError: `1px solid ${u}`,
    borderActiveError: `1px solid ${c}`,
    borderFocusError: `1px solid ${u}`,
    boxShadowHoverError: "none",
    boxShadowActiveError: `0 0 0 2px ${Y(c, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${Y(c, {
      alpha: 0.2
    })}`,
    colorActiveError: n,
    caretColorError: c,
    clearColor: b,
    clearColorHover: x,
    clearColorPressed: p
  });
}, cC = {
  name: "InternalSelection",
  common: vt,
  peers: {
    Popover: ba
  },
  self: dC
}, Yd = cC, uC = {
  name: "InternalSelection",
  common: te,
  peers: {
    Popover: Lo
  },
  self(e) {
    const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: u, iconColor: h, iconColorDisabled: v, clearColor: f, clearColorHover: b, clearColorPressed: x, placeholderColor: p, placeholderColorDisabled: w, fontSizeTiny: R, fontSizeSmall: y, fontSizeMedium: T, fontSizeLarge: I, heightTiny: g, heightSmall: S, heightMedium: $, heightLarge: P } = e;
    return Object.assign(Object.assign({}, Kd), {
      fontSizeTiny: R,
      fontSizeSmall: y,
      fontSizeMedium: T,
      fontSizeLarge: I,
      heightTiny: g,
      heightSmall: S,
      heightMedium: $,
      heightLarge: P,
      borderRadius: t,
      // default
      textColor: o,
      textColorDisabled: r,
      placeholderColor: p,
      placeholderColorDisabled: w,
      color: n,
      colorDisabled: i,
      colorActive: Y(a, { alpha: 0.1 }),
      border: "1px solid #0000",
      borderHover: `1px solid ${l}`,
      borderActive: `1px solid ${a}`,
      borderFocus: `1px solid ${l}`,
      boxShadowHover: "none",
      boxShadowActive: `0 0 8px 0 ${Y(a, {
        alpha: 0.4
      })}`,
      boxShadowFocus: `0 0 8px 0 ${Y(a, {
        alpha: 0.4
      })}`,
      caretColor: a,
      arrowColor: h,
      arrowColorDisabled: v,
      loadingColor: a,
      // warning
      borderWarning: `1px solid ${s}`,
      borderHoverWarning: `1px solid ${d}`,
      borderActiveWarning: `1px solid ${s}`,
      borderFocusWarning: `1px solid ${d}`,
      boxShadowHoverWarning: "none",
      boxShadowActiveWarning: `0 0 8px 0 ${Y(s, {
        alpha: 0.4
      })}`,
      boxShadowFocusWarning: `0 0 8px 0 ${Y(s, {
        alpha: 0.4
      })}`,
      colorActiveWarning: Y(s, { alpha: 0.1 }),
      caretColorWarning: s,
      // error
      borderError: `1px solid ${c}`,
      borderHoverError: `1px solid ${u}`,
      borderActiveError: `1px solid ${c}`,
      borderFocusError: `1px solid ${u}`,
      boxShadowHoverError: "none",
      boxShadowActiveError: `0 0 8px 0 ${Y(c, {
        alpha: 0.4
      })}`,
      boxShadowFocusError: `0 0 8px 0 ${Y(c, {
        alpha: 0.4
      })}`,
      colorActiveError: Y(c, { alpha: 0.1 }),
      caretColorError: c,
      clearColor: f,
      clearColorHover: b,
      clearColorPressed: x
    });
  }
}, xa = uC, fC = N([B("base-selection", `
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
 `, [B("base-loading", `
 color: var(--n-loading-color);
 `), B("base-selection-tags", "min-height: var(--n-height);"), A("border, state-border", `
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
 `), A("state-border", `
 z-index: 1;
 border-color: #0000;
 `), B("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [A("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), B("base-selection-overlay", `
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
 `, [A("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), B("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [A("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), B("base-selection-tags", `
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
 `), B("base-selection-label", `
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
 `, [B("base-selection-input", `
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
 `, [A("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), A("render-label", `
 color: var(--n-text-color);
 `)]), tt("disabled", [N("&:hover", [A("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), Q("focus", [A("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), Q("active", [A("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), B("base-selection-label", "background-color: var(--n-color-active);"), B("base-selection-tags", "background-color: var(--n-color-active);")])]), Q("disabled", "cursor: not-allowed;", [A("arrow", `
 color: var(--n-arrow-color-disabled);
 `), B("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [B("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), A("render-label", `
 color: var(--n-text-color-disabled);
 `)]), B("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), B("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), B("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [A("input", `
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
 `), A("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => Q(`${e}-status`, [A("state-border", `border: var(--n-border-${e});`), tt("disabled", [N("&:hover", [A("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), Q("active", [A("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), B("base-selection-label", `background-color: var(--n-color-active-${e});`), B("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), Q("focus", [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), B("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), B("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [N("&:last-child", "padding-right: 0;"), B("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [A("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), hC = ge({
  name: "InternalSelection",
  props: Object.assign(Object.assign({}, Me.props), { clsPrefix: {
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
    const t = W(null), o = W(null), r = W(null), n = W(null), i = W(null), a = W(null), l = W(null), s = W(null), d = W(null), c = W(null), u = W(!1), h = W(!1), v = W(!1), f = Me("InternalSelection", "-internal-selection", fC, Yd, e, Te(e, "clsPrefix")), b = E(() => e.clearable && !e.disabled && (v.value || e.active)), x = E(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : Xo(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), p = E(() => {
      const j = e.selectedOption;
      if (j)
        return j[e.labelField];
    }), w = E(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function R() {
      var j;
      const { value: ee } = t;
      if (ee) {
        const { value: D } = o;
        D && (D.style.width = `${ee.offsetWidth}px`, e.maxTagCount !== "responsive" && ((j = d.value) === null || j === void 0 || j.sync()));
      }
    }
    function y() {
      const { value: j } = c;
      j && (j.style.display = "none");
    }
    function T() {
      const { value: j } = c;
      j && (j.style.display = "inline-block");
    }
    Fe(Te(e, "active"), (j) => {
      j || y();
    }), Fe(Te(e, "pattern"), () => {
      e.multiple && It(R);
    });
    function I(j) {
      const { onFocus: ee } = e;
      ee && ee(j);
    }
    function g(j) {
      const { onBlur: ee } = e;
      ee && ee(j);
    }
    function S(j) {
      const { onDeleteOption: ee } = e;
      ee && ee(j);
    }
    function $(j) {
      const { onClear: ee } = e;
      ee && ee(j);
    }
    function P(j) {
      const { onPatternInput: ee } = e;
      ee && ee(j);
    }
    function z(j) {
      var ee;
      (!j.relatedTarget || !(!((ee = r.value) === null || ee === void 0) && ee.contains(j.relatedTarget))) && I(j);
    }
    function M(j) {
      var ee;
      !((ee = r.value) === null || ee === void 0) && ee.contains(j.relatedTarget) || g(j);
    }
    function F(j) {
      $(j);
    }
    function L() {
      v.value = !0;
    }
    function G() {
      v.value = !1;
    }
    function K(j) {
      !e.active || !e.filterable || j.target !== o.value && j.preventDefault();
    }
    function O(j) {
      S(j);
    }
    function X(j) {
      if (j.key === "Backspace" && !_.value && !e.pattern.length) {
        const { selectedOptions: ee } = e;
        ee != null && ee.length && O(ee[ee.length - 1]);
      }
    }
    const _ = W(!1);
    let U = null;
    function ce(j) {
      const { value: ee } = t;
      if (ee) {
        const D = j.target.value;
        ee.textContent = D, R();
      }
      e.ignoreComposition && _.value ? U = j : P(j);
    }
    function $e() {
      _.value = !0;
    }
    function Oe() {
      _.value = !1, e.ignoreComposition && P(U), U = null;
    }
    function Be(j) {
      var ee;
      h.value = !0, (ee = e.onPatternFocus) === null || ee === void 0 || ee.call(e, j);
    }
    function ke(j) {
      var ee;
      h.value = !1, (ee = e.onPatternBlur) === null || ee === void 0 || ee.call(e, j);
    }
    function fe() {
      var j, ee;
      if (e.filterable)
        h.value = !1, (j = a.value) === null || j === void 0 || j.blur(), (ee = o.value) === null || ee === void 0 || ee.blur();
      else if (e.multiple) {
        const { value: D } = n;
        D == null || D.blur();
      } else {
        const { value: D } = i;
        D == null || D.blur();
      }
    }
    function xe() {
      var j, ee, D;
      e.filterable ? (h.value = !1, (j = a.value) === null || j === void 0 || j.focus()) : e.multiple ? (ee = n.value) === null || ee === void 0 || ee.focus() : (D = i.value) === null || D === void 0 || D.focus();
    }
    function ze() {
      const { value: j } = o;
      j && (T(), j.focus());
    }
    function le() {
      const { value: j } = o;
      j && j.blur();
    }
    function Ve(j) {
      const { value: ee } = l;
      ee && ee.setTextContent(`+${j}`);
    }
    function He() {
      const { value: j } = s;
      return j;
    }
    function Ue() {
      return o.value;
    }
    let Ke = null;
    function Je() {
      Ke !== null && window.clearTimeout(Ke);
    }
    function st() {
      e.disabled || e.active || (Je(), Ke = window.setTimeout(() => {
        w.value && (u.value = !0);
      }, 100));
    }
    function gt() {
      Je();
    }
    function Z(j) {
      j || (Je(), u.value = !1);
    }
    Fe(w, (j) => {
      j || (u.value = !1);
    }), St(() => {
      pt(() => {
        const j = a.value;
        j && (j.tabIndex = e.disabled || h.value ? -1 : 0);
      });
    }), Js(r, e.onResize);
    const { inlineThemeDisabled: se } = e, ye = E(() => {
      const { size: j } = e, { common: { cubicBezierEaseInOut: ee }, self: {
        borderRadius: D,
        color: q,
        placeholderColor: oe,
        textColor: we,
        paddingSingle: Ie,
        paddingMultiple: Le,
        caretColor: rt,
        colorDisabled: We,
        textColorDisabled: Ne,
        placeholderColorDisabled: ct,
        colorActive: Rt,
        boxShadowFocus: dt,
        boxShadowActive: mt,
        boxShadowHover: C,
        border: H,
        borderFocus: J,
        borderHover: de,
        borderActive: ue,
        arrowColor: me,
        arrowColorDisabled: Ce,
        loadingColor: Pe,
        // form warning
        colorActiveWarning: nt,
        boxShadowFocusWarning: Tt,
        boxShadowActiveWarning: io,
        boxShadowHoverWarning: ao,
        borderWarning: Hn,
        borderFocusWarning: Ln,
        borderHoverWarning: jr,
        borderActiveWarning: lo,
        // form error
        colorActiveError: k,
        boxShadowFocusError: V,
        boxShadowActiveError: be,
        boxShadowHoverError: je,
        borderError: Xe,
        borderFocusError: Ae,
        borderHoverError: Gt,
        borderActiveError: Kt,
        // clear
        clearColor: Yt,
        clearColorHover: mo,
        clearColorPressed: bo,
        clearSize: lr,
        // arrow
        arrowSize: Wn,
        [re("height", j)]: Nn,
        [re("fontSize", j)]: jn
      } } = f.value;
      return {
        "--n-bezier": ee,
        "--n-border": H,
        "--n-border-active": ue,
        "--n-border-focus": J,
        "--n-border-hover": de,
        "--n-border-radius": D,
        "--n-box-shadow-active": mt,
        "--n-box-shadow-focus": dt,
        "--n-box-shadow-hover": C,
        "--n-caret-color": rt,
        "--n-color": q,
        "--n-color-active": Rt,
        "--n-color-disabled": We,
        "--n-font-size": jn,
        "--n-height": Nn,
        "--n-padding-single": Ie,
        "--n-padding-multiple": Le,
        "--n-placeholder-color": oe,
        "--n-placeholder-color-disabled": ct,
        "--n-text-color": we,
        "--n-text-color-disabled": Ne,
        "--n-arrow-color": me,
        "--n-arrow-color-disabled": Ce,
        "--n-loading-color": Pe,
        // form warning
        "--n-color-active-warning": nt,
        "--n-box-shadow-focus-warning": Tt,
        "--n-box-shadow-active-warning": io,
        "--n-box-shadow-hover-warning": ao,
        "--n-border-warning": Hn,
        "--n-border-focus-warning": Ln,
        "--n-border-hover-warning": jr,
        "--n-border-active-warning": lo,
        // form error
        "--n-color-active-error": k,
        "--n-box-shadow-focus-error": V,
        "--n-box-shadow-active-error": be,
        "--n-box-shadow-hover-error": je,
        "--n-border-error": Xe,
        "--n-border-focus-error": Ae,
        "--n-border-hover-error": Gt,
        "--n-border-active-error": Kt,
        // clear
        "--n-clear-size": lr,
        "--n-clear-color": Yt,
        "--n-clear-color-hover": mo,
        "--n-clear-color-pressed": bo,
        // arrow-size
        "--n-arrow-size": Wn
      };
    }), ae = se ? xt("internal-selection", E(() => e.size[0]), ye, e) : void 0;
    return {
      mergedTheme: f,
      mergedClearable: b,
      patternInputFocused: h,
      filterablePlaceholder: x,
      label: p,
      selected: w,
      showTagsPanel: u,
      isComposing: _,
      // dom ref
      counterRef: l,
      counterWrapperRef: s,
      patternInputMirrorRef: t,
      patternInputRef: o,
      selfRef: r,
      multipleElRef: n,
      singleElRef: i,
      patternInputWrapperRef: a,
      overflowRef: d,
      inputTagElRef: c,
      handleMouseDown: K,
      handleFocusin: z,
      handleClear: F,
      handleMouseEnter: L,
      handleMouseLeave: G,
      handleDeleteOption: O,
      handlePatternKeyDown: X,
      handlePatternInputInput: ce,
      handlePatternInputBlur: ke,
      handlePatternInputFocus: Be,
      handleMouseEnterCounter: st,
      handleMouseLeaveCounter: gt,
      handleFocusout: M,
      handleCompositionEnd: Oe,
      handleCompositionStart: $e,
      onPopoverUpdateShow: Z,
      focus: xe,
      focusInput: ze,
      blur: fe,
      blurInput: le,
      updateCounter: Ve,
      getCounter: He,
      getTail: Ue,
      renderLabel: e.renderLabel,
      cssVars: se ? void 0 : ye,
      themeClass: ae == null ? void 0 : ae.themeClass,
      onRender: ae == null ? void 0 : ae.onRender
    };
  },
  render() {
    const { status: e, multiple: t, size: o, disabled: r, filterable: n, maxTagCount: i, bordered: a, clsPrefix: l, onRender: s, renderTag: d, renderLabel: c } = this;
    s == null || s();
    const u = i === "responsive", h = typeof i == "number", v = u || h, f = m(wi, null, {
      default: () => m(Gd, { clsPrefix: l, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
        default: () => {
          var x, p;
          return (p = (x = this.$slots).arrow) === null || p === void 0 ? void 0 : p.call(x);
        }
      })
    });
    let b;
    if (t) {
      const { labelField: x } = this, p = (M) => m("div", { class: `${l}-base-selection-tag-wrapper`, key: M.value }, d ? d({
        option: M,
        handleClose: () => this.handleDeleteOption(M)
      }) : m(di, { size: o, closable: !M.disabled, disabled: r, onClose: () => this.handleDeleteOption(M), internalCloseIsButtonTag: !1, internalCloseFocusable: !1 }, {
        default: () => c ? c(M, !0) : Xo(M[x], M, !0)
      })), w = () => (h ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(p), R = n ? m(
        "div",
        { class: `${l}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
        m("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: r, value: this.pattern, autofocus: this.autofocus, class: `${l}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
        m("span", { ref: "patternInputMirrorRef", class: `${l}-base-selection-input-tag__mirror` }, this.pattern)
      ) : null, y = u ? () => m(
        "div",
        { class: `${l}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
        m(di, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: r })
      ) : void 0;
      let T;
      if (h) {
        const M = this.selectedOptions.length - i;
        M > 0 && (T = m(
          "div",
          { class: `${l}-base-selection-tag-wrapper`, key: "__counter__" },
          m(di, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: r }, {
            default: () => `+${M}`
          })
        ));
      }
      const I = u ? n ? m(Ja, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: w,
        counter: y,
        tail: () => R
      }) : m(Ja, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: w,
        counter: y
      }) : h ? w().concat(T) : w(), g = v ? () => m("div", { class: `${l}-base-selection-popover` }, u ? w() : this.selectedOptions.map(p)) : void 0, S = v ? {
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      } : null, P = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? m(
        "div",
        { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay` },
        m("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)
      ) : null, z = n ? m(
        "div",
        { ref: "patternInputWrapperRef", class: `${l}-base-selection-tags` },
        I,
        u ? null : R,
        f
      ) : m(
        "div",
        { ref: "multipleElRef", class: `${l}-base-selection-tags`, tabindex: r ? void 0 : 0 },
        I,
        f
      );
      b = m(
        oo,
        null,
        v ? m(Vd, Object.assign({}, S, { scrollable: !0, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
          trigger: () => z,
          default: g
        }) : z,
        P
      );
    } else if (n) {
      const x = this.pattern || this.isComposing, p = this.active ? !x : !this.selected, w = this.active ? !1 : this.selected;
      b = m(
        "div",
        { ref: "patternInputWrapperRef", class: `${l}-base-selection-label` },
        m("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${l}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: r, disabled: r, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
        w ? m(
          "div",
          { class: `${l}-base-selection-label__render-label ${l}-base-selection-overlay`, key: "input" },
          m("div", { class: `${l}-base-selection-overlay__wrapper` }, d ? d({
            option: this.selectedOption,
            handleClose: () => {
            }
          }) : c ? c(this.selectedOption, !0) : Xo(this.label, this.selectedOption, !0))
        ) : null,
        p ? m(
          "div",
          { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" },
          m("div", { class: `${l}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)
        ) : null,
        f
      );
    } else
      b = m(
        "div",
        { ref: "singleElRef", class: `${l}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 },
        this.label !== void 0 ? m(
          "div",
          { class: `${l}-base-selection-input`, title: nf(this.label), key: "input" },
          m("div", { class: `${l}-base-selection-input__content` }, d ? d({
            option: this.selectedOption,
            handleClose: () => {
            }
          }) : c ? c(this.selectedOption, !0) : Xo(this.label, this.selectedOption, !0))
        ) : m(
          "div",
          { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" },
          m("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)
        ),
        f
      );
    return m(
      "div",
      { ref: "selfRef", class: [
        `${l}-base-selection`,
        this.themeClass,
        e && `${l}-base-selection--${e}-status`,
        {
          [`${l}-base-selection--active`]: this.active,
          [`${l}-base-selection--selected`]: this.selected || this.active && this.pattern,
          [`${l}-base-selection--disabled`]: this.disabled,
          [`${l}-base-selection--multiple`]: this.multiple,
          // focus is not controlled by selection itself since it always need
          // to be managed together with menu. provide :focus style will cause
          // many redundant codes.
          [`${l}-base-selection--focus`]: this.focused
        }
      ], style: this.cssVars, onClick: this.onClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onKeydown: this.onKeydown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onMousedown: this.handleMouseDown },
      b,
      a ? m("div", { class: `${l}-base-selection__border` }) : null,
      a ? m("div", { class: `${l}-base-selection__state-border` }) : null
    );
  }
}), {
  cubicBezierEaseInOut: co
} = go;
function pC({
  duration: e = ".2s",
  delay: t = ".1s"
} = {}) {
  return [N("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), N("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), N("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${co},
 max-width ${e} ${co} ${t},
 margin-left ${e} ${co} ${t},
 margin-right ${e} ${co} ${t};
 `), N("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${co} ${t},
 max-width ${e} ${co},
 margin-left ${e} ${co},
 margin-right ${e} ${co};
 `)];
}
const vC = {
  iconMargin: "11px 8px 0 12px",
  iconMarginRtl: "11px 12px 0 8px",
  iconSize: "24px",
  closeIconSize: "16px",
  closeSize: "20px",
  closeMargin: "13px 14px 0 0",
  closeMarginRtl: "13px 0 0 14px",
  padding: "13px"
}, gC = {
  name: "Alert",
  common: te,
  self(e) {
    const { lineHeight: t, borderRadius: o, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: a, textColor2: l, closeColorHover: s, closeColorPressed: d, closeIconColor: c, closeIconColorHover: u, closeIconColorPressed: h, infoColorSuppl: v, successColorSuppl: f, warningColorSuppl: b, errorColorSuppl: x, fontSize: p } = e;
    return Object.assign(Object.assign({}, vC), {
      fontSize: p,
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
      closeColorPressed: d,
      closeIconColor: c,
      closeIconColorHover: u,
      closeIconColorPressed: h,
      borderInfo: `1px solid ${Y(v, { alpha: 0.35 })}`,
      colorInfo: Y(v, { alpha: 0.25 }),
      titleTextColorInfo: a,
      iconColorInfo: v,
      contentTextColorInfo: l,
      closeColorHoverInfo: s,
      closeColorPressedInfo: d,
      closeIconColorInfo: c,
      closeIconColorHoverInfo: u,
      closeIconColorPressedInfo: h,
      borderSuccess: `1px solid ${Y(f, {
        alpha: 0.35
      })}`,
      colorSuccess: Y(f, { alpha: 0.25 }),
      titleTextColorSuccess: a,
      iconColorSuccess: f,
      contentTextColorSuccess: l,
      closeColorHoverSuccess: s,
      closeColorPressedSuccess: d,
      closeIconColorSuccess: c,
      closeIconColorHoverSuccess: u,
      closeIconColorPressedSuccess: h,
      borderWarning: `1px solid ${Y(b, {
        alpha: 0.35
      })}`,
      colorWarning: Y(b, { alpha: 0.25 }),
      titleTextColorWarning: a,
      iconColorWarning: b,
      contentTextColorWarning: l,
      closeColorHoverWarning: s,
      closeColorPressedWarning: d,
      closeIconColorWarning: c,
      closeIconColorHoverWarning: u,
      closeIconColorPressedWarning: h,
      borderError: `1px solid ${Y(x, { alpha: 0.35 })}`,
      colorError: Y(x, { alpha: 0.25 }),
      titleTextColorError: a,
      iconColorError: x,
      contentTextColorError: l,
      closeColorHoverError: s,
      closeColorPressedError: d,
      closeIconColorError: c,
      closeIconColorHoverError: u,
      closeIconColorPressedError: h
    });
  }
}, mC = gC, bC = {
  linkFontSize: "13px",
  linkPadding: "0 0 0 16px",
  railWidth: "4px"
}, xC = (e) => {
  const { borderRadius: t, railColor: o, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: a } = e;
  return Object.assign(Object.assign({}, bC), {
    borderRadius: t,
    railColor: o,
    railColorActive: r,
    linkColor: Y(r, { alpha: 0.15 }),
    linkTextColor: a,
    linkTextColorHover: n,
    linkTextColorPressed: i,
    linkTextColorActive: r
  });
}, CC = {
  name: "Anchor",
  common: te,
  self: xC
}, yC = CC;
function zn(e) {
  return e.type === "group";
}
function Xd(e) {
  return e.type === "ignored";
}
function ci(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function wC(e, t) {
  return {
    getIsGroup: zn,
    getIgnored: Xd,
    getKey(r) {
      return zn(r) ? r.name || r.key || "key-required" : r[e];
    },
    getChildren(r) {
      return r[t];
    }
  };
}
function SC(e, t, o, r) {
  if (!t)
    return e;
  function n(i) {
    if (!Array.isArray(i))
      return [];
    const a = [];
    for (const l of i)
      if (zn(l)) {
        const s = n(l[r]);
        s.length && a.push(Object.assign({}, l, {
          [r]: s
        }));
      } else {
        if (Xd(l))
          continue;
        t(o, l) && a.push(l);
      }
    return a;
  }
  return n(e);
}
function $C(e, t, o) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((n) => {
    zn(n) ? n[o].forEach((i) => {
      r.set(i[t], i);
    }) : r.set(n[t], n);
  }), r;
}
const PC = Fr && "chrome" in window;
Fr && navigator.userAgent.includes("Firefox");
const Zd = Fr && navigator.userAgent.includes("Safari") && !PC, Jd = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
}, TC = {
  name: "Input",
  common: te,
  self(e) {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: u, borderRadius: h, lineHeight: v, fontSizeTiny: f, fontSizeSmall: b, fontSizeMedium: x, fontSizeLarge: p, heightTiny: w, heightSmall: R, heightMedium: y, heightLarge: T, clearColor: I, clearColorHover: g, clearColorPressed: S, placeholderColor: $, placeholderColorDisabled: P, iconColor: z, iconColorDisabled: M, iconColorHover: F, iconColorPressed: L } = e;
    return Object.assign(Object.assign({}, Jd), {
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: w,
      heightSmall: R,
      heightMedium: y,
      heightLarge: T,
      fontSizeTiny: f,
      fontSizeSmall: b,
      fontSizeMedium: x,
      fontSizeLarge: p,
      lineHeight: v,
      lineHeightTextarea: v,
      borderRadius: h,
      iconSize: "16px",
      groupLabelColor: a,
      textColor: t,
      textColorDisabled: r,
      textDecorationColor: t,
      groupLabelTextColor: t,
      caretColor: n,
      placeholderColor: $,
      placeholderColorDisabled: P,
      color: a,
      colorDisabled: l,
      colorFocus: Y(n, { alpha: 0.1 }),
      groupLabelBorder: "1px solid #0000",
      border: "1px solid #0000",
      borderHover: `1px solid ${i}`,
      borderDisabled: "1px solid #0000",
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 8px 0 ${Y(n, { alpha: 0.3 })}`,
      loadingColor: n,
      // warning
      loadingColorWarning: s,
      borderWarning: `1px solid ${s}`,
      borderHoverWarning: `1px solid ${d}`,
      colorFocusWarning: Y(s, { alpha: 0.1 }),
      borderFocusWarning: `1px solid ${d}`,
      boxShadowFocusWarning: `0 0 8px 0 ${Y(s, {
        alpha: 0.3
      })}`,
      caretColorWarning: s,
      // error
      loadingColorError: c,
      borderError: `1px solid ${c}`,
      borderHoverError: `1px solid ${u}`,
      colorFocusError: Y(c, { alpha: 0.1 }),
      borderFocusError: `1px solid ${u}`,
      boxShadowFocusError: `0 0 8px 0 ${Y(c, {
        alpha: 0.3
      })}`,
      caretColorError: c,
      clearColor: I,
      clearColorHover: g,
      clearColorPressed: S,
      iconColor: z,
      iconColorDisabled: M,
      iconColorHover: F,
      iconColorPressed: L,
      suffixTextColor: t
    });
  }
}, At = TC, kC = (e) => {
  const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, borderColor: s, warningColor: d, warningColorHover: c, errorColor: u, errorColorHover: h, borderRadius: v, lineHeight: f, fontSizeTiny: b, fontSizeSmall: x, fontSizeMedium: p, fontSizeLarge: w, heightTiny: R, heightSmall: y, heightMedium: T, heightLarge: I, actionColor: g, clearColor: S, clearColorHover: $, clearColorPressed: P, placeholderColor: z, placeholderColorDisabled: M, iconColor: F, iconColorDisabled: L, iconColorHover: G, iconColorPressed: K } = e;
  return Object.assign(Object.assign({}, Jd), {
    countTextColorDisabled: r,
    countTextColor: o,
    heightTiny: R,
    heightSmall: y,
    heightMedium: T,
    heightLarge: I,
    fontSizeTiny: b,
    fontSizeSmall: x,
    fontSizeMedium: p,
    fontSizeLarge: w,
    lineHeight: f,
    lineHeightTextarea: f,
    borderRadius: v,
    iconSize: "16px",
    groupLabelColor: g,
    groupLabelTextColor: t,
    textColor: t,
    textColorDisabled: r,
    textDecorationColor: t,
    caretColor: n,
    placeholderColor: z,
    placeholderColorDisabled: M,
    color: a,
    colorDisabled: l,
    colorFocus: a,
    groupLabelBorder: `1px solid ${s}`,
    border: `1px solid ${s}`,
    borderHover: `1px solid ${i}`,
    borderDisabled: `1px solid ${s}`,
    borderFocus: `1px solid ${i}`,
    boxShadowFocus: `0 0 0 2px ${Y(n, { alpha: 0.2 })}`,
    loadingColor: n,
    // warning
    loadingColorWarning: d,
    borderWarning: `1px solid ${d}`,
    borderHoverWarning: `1px solid ${c}`,
    colorFocusWarning: a,
    borderFocusWarning: `1px solid ${c}`,
    boxShadowFocusWarning: `0 0 0 2px ${Y(d, {
      alpha: 0.2
    })}`,
    caretColorWarning: d,
    // error
    loadingColorError: u,
    borderError: `1px solid ${u}`,
    borderHoverError: `1px solid ${h}`,
    colorFocusError: a,
    borderFocusError: `1px solid ${h}`,
    boxShadowFocusError: `0 0 0 2px ${Y(u, {
      alpha: 0.2
    })}`,
    caretColorError: u,
    clearColor: S,
    clearColorHover: $,
    clearColorPressed: P,
    iconColor: F,
    iconColorDisabled: L,
    iconColorHover: G,
    iconColorPressed: K,
    suffixTextColor: t
  });
}, zC = {
  name: "Input",
  common: vt,
  self: kC
}, Qd = zC, ec = "n-input";
function IC(e) {
  let t = 0;
  for (const o of e)
    t++;
  return t;
}
function en(e) {
  return e === "" || e == null;
}
function OC(e) {
  const t = W(null);
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
    const { value: s } = l, { start: d, beforeText: c, afterText: u } = a;
    let h = s.length;
    if (s.endsWith(u))
      h = s.length - u.length;
    else if (s.startsWith(c))
      h = c.length;
    else {
      const v = c[d - 1], f = s.indexOf(v, d - 1);
      f !== -1 && (h = f + 1);
    }
    (i = l.setSelectionRange) === null || i === void 0 || i.call(l, h, h);
  }
  function n() {
    t.value = null;
  }
  return Fe(e, n), {
    recordCursor: o,
    restoreCursor: r
  };
}
const El = ge({
  name: "InputWordCount",
  setup(e, { slots: t }) {
    const { mergedValueRef: o, maxlengthRef: r, mergedClsPrefixRef: n, countGraphemesRef: i } = (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      De(ec)
    ), a = E(() => {
      const { value: l } = o;
      return l === null || Array.isArray(l) ? 0 : (i.value || IC)(l);
    });
    return () => {
      const { value: l } = r, { value: s } = o;
      return m("span", { class: `${n.value}-input-word-count` }, af(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [
        l === void 0 ? a.value : `${a.value} / ${l}`
      ]));
    };
  }
}), RC = B("input", `
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
 `, [N("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), N("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), N("&:-webkit-autofill ~", [A("placeholder", "display: none;")])]),
  Q("round", [tt("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  A("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [N("span", `
 width: 100%;
 display: inline-block;
 `)]),
  Q("textarea", [A("placeholder", "overflow: visible;")]),
  tt("autosize", "width: 100%;"),
  Q("autosize", [A("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  B("input-wrapper", `
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
 `, [N("+", [A("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  tt("textarea", [A("placeholder", "white-space: nowrap;")]),
  A("eye", `
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  Q("textarea", "width: 100%;", [B("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), Q("resizable", [B("input-wrapper", `
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
  Q("pair", [A("input-el, placeholder", "text-align: center;"), A("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [B("icon", `
 color: var(--n-icon-color);
 `), B("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  Q("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [A("border", "border: var(--n-border-disabled);"), A("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), A("placeholder", "color: var(--n-placeholder-color-disabled);"), A("separator", "color: var(--n-text-color-disabled);", [B("icon", `
 color: var(--n-icon-color-disabled);
 `), B("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), B("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), A("suffix, prefix", "color: var(--n-text-color-disabled);", [B("icon", `
 color: var(--n-icon-color-disabled);
 `), B("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  tt("disabled", [A("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-icon-color);
 cursor: pointer;
 `, [N("&:hover", `
 color: var(--n-icon-color-hover);
 `), N("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), N("&:hover", [A("state-border", "border: var(--n-border-hover);")]), Q("focus", "background-color: var(--n-color-focus);", [A("state-border", `
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
 `, [B("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), B("base-clear", `
 font-size: var(--n-icon-size);
 `, [A("placeholder", [B("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), N(">", [B("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), B("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  B("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((e) => Q(`${e}-status`, [tt("disabled", [B("base-loading", `
 color: var(--n-loading-color-${e})
 `), A("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), A("state-border", `
 border: var(--n-border-${e});
 `), N("&:hover", [A("state-border", `
 border: var(--n-border-hover-${e});
 `)]), N("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), Q("focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), MC = B("input", [Q("disabled", [A("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), EC = Object.assign(Object.assign({}, Me.props), {
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
}), _C = ge({
  name: "Input",
  props: EC,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      e.showPasswordToggle && kt("input", '`show-password-toggle` is deprecated, please use `showPasswordOn="click"` instead');
    });
    const { mergedClsPrefixRef: t, mergedBorderedRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = Ct(e), i = Me("Input", "-input", RC, Qd, e, t);
    Zd && nr("-input-safari", MC, t);
    const a = W(null), l = W(null), s = W(null), d = W(null), c = W(null), u = W(null), h = W(null), v = OC(h), f = W(null), { localeRef: b } = Bn("Input"), x = W(e.defaultValue), p = Te(e, "value"), w = fo(p, x), R = _o(e), { mergedSizeRef: y, mergedDisabledRef: T, mergedStatusRef: I } = R, g = W(!1), S = W(!1), $ = W(!1), P = W(!1);
    let z = null;
    const M = E(() => {
      const { placeholder: k, pair: V } = e;
      return V ? Array.isArray(k) ? k : k === void 0 ? ["", ""] : [k, k] : k === void 0 ? [b.value.placeholder] : [k];
    }), F = E(() => {
      const { value: k } = $, { value: V } = w, { value: be } = M;
      return !k && (en(V) || Array.isArray(V) && en(V[0])) && be[0];
    }), L = E(() => {
      const { value: k } = $, { value: V } = w, { value: be } = M;
      return !k && be[1] && (en(V) || Array.isArray(V) && en(V[1]));
    }), G = Ze(() => e.internalForceFocus || g.value), K = Ze(() => {
      if (T.value || e.readonly || !e.clearable || !G.value && !S.value)
        return !1;
      const { value: k } = w, { value: V } = G;
      return e.pair ? !!(Array.isArray(k) && (k[0] || k[1])) && (S.value || V) : !!k && (S.value || V);
    }), O = E(() => {
      const { showPasswordOn: k } = e;
      if (k)
        return k;
      if (e.showPasswordToggle)
        return "click";
    }), X = W(!1), _ = E(() => {
      const { textDecoration: k } = e;
      return k ? Array.isArray(k) ? k.map((V) => ({
        textDecoration: V
      })) : [
        {
          textDecoration: k
        }
      ] : ["", ""];
    }), U = W(void 0), ce = () => {
      var k, V;
      if (e.type === "textarea") {
        const { autosize: be } = e;
        if (be && (U.value = (V = (k = f.value) === null || k === void 0 ? void 0 : k.$el) === null || V === void 0 ? void 0 : V.offsetWidth), !l.value || typeof be == "boolean")
          return;
        const { paddingTop: je, paddingBottom: Xe, lineHeight: Ae } = window.getComputedStyle(l.value), Gt = Number(je.slice(0, -2)), Kt = Number(Xe.slice(0, -2)), Yt = Number(Ae.slice(0, -2)), { value: mo } = s;
        if (!mo)
          return;
        if (be.minRows) {
          const bo = Math.max(be.minRows, 1), lr = `${Gt + Kt + Yt * bo}px`;
          mo.style.minHeight = lr;
        }
        if (be.maxRows) {
          const bo = `${Gt + Kt + Yt * be.maxRows}px`;
          mo.style.maxHeight = bo;
        }
      }
    }, $e = E(() => {
      const { maxlength: k } = e;
      return k === void 0 ? void 0 : Number(k);
    });
    St(() => {
      const { value: k } = w;
      Array.isArray(k) || Ce(k);
    });
    const Oe = Br().proxy;
    function Be(k) {
      const { onUpdateValue: V, "onUpdate:value": be, onInput: je } = e, { nTriggerFormInput: Xe } = R;
      V && pe(V, k), be && pe(be, k), je && pe(je, k), x.value = k, Xe();
    }
    function ke(k) {
      const { onChange: V } = e, { nTriggerFormChange: be } = R;
      V && pe(V, k), x.value = k, be();
    }
    function fe(k) {
      const { onBlur: V } = e, { nTriggerFormBlur: be } = R;
      V && pe(V, k), be();
    }
    function xe(k) {
      const { onFocus: V } = e, { nTriggerFormFocus: be } = R;
      V && pe(V, k), be();
    }
    function ze(k) {
      const { onClear: V } = e;
      V && pe(V, k);
    }
    function le(k) {
      const { onInputBlur: V } = e;
      V && pe(V, k);
    }
    function Ve(k) {
      const { onInputFocus: V } = e;
      V && pe(V, k);
    }
    function He() {
      const { onDeactivate: k } = e;
      k && pe(k);
    }
    function Ue() {
      const { onActivate: k } = e;
      k && pe(k);
    }
    function Ke(k) {
      const { onClick: V } = e;
      V && pe(V, k);
    }
    function Je(k) {
      const { onWrapperFocus: V } = e;
      V && pe(V, k);
    }
    function st(k) {
      const { onWrapperBlur: V } = e;
      V && pe(V, k);
    }
    function gt() {
      $.value = !0;
    }
    function Z(k) {
      $.value = !1, k.target === u.value ? se(k, 1) : se(k, 0);
    }
    function se(k, V = 0, be = "input") {
      const je = k.target.value;
      if (Ce(je), k instanceof InputEvent && !k.isComposing && ($.value = !1), e.type === "textarea") {
        const { value: Ae } = f;
        Ae && Ae.syncUnifiedContainer();
      }
      if (z = je, $.value)
        return;
      v.recordCursor();
      const Xe = ye(je);
      if (Xe)
        if (!e.pair)
          be === "input" ? Be(je) : ke(je);
        else {
          let { value: Ae } = w;
          Array.isArray(Ae) ? Ae = [Ae[0], Ae[1]] : Ae = ["", ""], Ae[V] = je, be === "input" ? Be(Ae) : ke(Ae);
        }
      Oe.$forceUpdate(), Xe || It(v.restoreCursor);
    }
    function ye(k) {
      const { countGraphemes: V, maxlength: be, minlength: je } = e;
      if (V) {
        let Ae;
        if (be !== void 0 && (Ae === void 0 && (Ae = V(k)), Ae > Number(be)) || je !== void 0 && (Ae === void 0 && (Ae = V(k)), Ae < Number(be)))
          return !1;
      }
      const { allowInput: Xe } = e;
      return typeof Xe == "function" ? Xe(k) : !0;
    }
    function ae(k) {
      le(k), k.relatedTarget === a.value && He(), k.relatedTarget !== null && (k.relatedTarget === c.value || k.relatedTarget === u.value || k.relatedTarget === l.value) || (P.value = !1), q(k, "blur"), h.value = null;
    }
    function j(k, V) {
      Ve(k), g.value = !0, P.value = !0, Ue(), q(k, "focus"), V === 0 ? h.value = c.value : V === 1 ? h.value = u.value : V === 2 && (h.value = l.value);
    }
    function ee(k) {
      e.passivelyActivated && (st(k), q(k, "blur"));
    }
    function D(k) {
      e.passivelyActivated && (g.value = !0, Je(k), q(k, "focus"));
    }
    function q(k, V) {
      k.relatedTarget !== null && (k.relatedTarget === c.value || k.relatedTarget === u.value || k.relatedTarget === l.value || k.relatedTarget === a.value) || (V === "focus" ? (xe(k), g.value = !0) : V === "blur" && (fe(k), g.value = !1));
    }
    function oe(k, V) {
      se(k, V, "change");
    }
    function we(k) {
      Ke(k);
    }
    function Ie(k) {
      ze(k), e.pair ? (Be(["", ""]), ke(["", ""])) : (Be(""), ke(""));
    }
    function Le(k) {
      const { onMousedown: V } = e;
      V && V(k);
      const { tagName: be } = k.target;
      if (be !== "INPUT" && be !== "TEXTAREA") {
        if (e.resizable) {
          const { value: je } = a;
          if (je) {
            const { left: Xe, top: Ae, width: Gt, height: Kt } = je.getBoundingClientRect(), Yt = 14;
            if (Xe + Gt - Yt < k.clientX && k.clientX < Xe + Gt && Ae + Kt - Yt < k.clientY && k.clientY < Ae + Kt)
              return;
          }
        }
        k.preventDefault(), g.value || C();
      }
    }
    function rt() {
      var k;
      S.value = !0, e.type === "textarea" && ((k = f.value) === null || k === void 0 || k.handleMouseEnterWrapper());
    }
    function We() {
      var k;
      S.value = !1, e.type === "textarea" && ((k = f.value) === null || k === void 0 || k.handleMouseLeaveWrapper());
    }
    function Ne() {
      T.value || O.value === "click" && (X.value = !X.value);
    }
    function ct(k) {
      if (T.value)
        return;
      k.preventDefault();
      const V = (je) => {
        je.preventDefault(), Ge("mouseup", document, V);
      };
      if (Ye("mouseup", document, V), O.value !== "mousedown")
        return;
      X.value = !0;
      const be = () => {
        X.value = !1, Ge("mouseup", document, be);
      };
      Ye("mouseup", document, be);
    }
    function Rt(k) {
      var V;
      switch ((V = e.onKeydown) === null || V === void 0 || V.call(e, k), k.key) {
        case "Escape":
          mt();
          break;
        case "Enter":
          dt(k);
          break;
      }
    }
    function dt(k) {
      var V, be;
      if (e.passivelyActivated) {
        const { value: je } = P;
        if (je) {
          e.internalDeactivateOnEnter && mt();
          return;
        }
        k.preventDefault(), e.type === "textarea" ? (V = l.value) === null || V === void 0 || V.focus() : (be = c.value) === null || be === void 0 || be.focus();
      }
    }
    function mt() {
      e.passivelyActivated && (P.value = !1, It(() => {
        var k;
        (k = a.value) === null || k === void 0 || k.focus();
      }));
    }
    function C() {
      var k, V, be;
      T.value || (e.passivelyActivated ? (k = a.value) === null || k === void 0 || k.focus() : ((V = l.value) === null || V === void 0 || V.focus(), (be = c.value) === null || be === void 0 || be.focus()));
    }
    function H() {
      var k;
      !((k = a.value) === null || k === void 0) && k.contains(document.activeElement) && document.activeElement.blur();
    }
    function J() {
      var k, V;
      (k = l.value) === null || k === void 0 || k.select(), (V = c.value) === null || V === void 0 || V.select();
    }
    function de() {
      T.value || (l.value ? l.value.focus() : c.value && c.value.focus());
    }
    function ue() {
      const { value: k } = a;
      k != null && k.contains(document.activeElement) && k !== document.activeElement && mt();
    }
    function me(k) {
      if (e.type === "textarea") {
        const { value: V } = l;
        V == null || V.scrollTo(k);
      } else {
        const { value: V } = c;
        V == null || V.scrollTo(k);
      }
    }
    function Ce(k) {
      const { type: V, pair: be, autosize: je } = e;
      if (!be && je)
        if (V === "textarea") {
          const { value: Xe } = s;
          Xe && (Xe.textContent = (k ?? "") + `\r
`);
        } else {
          const { value: Xe } = d;
          Xe && (k ? Xe.textContent = k : Xe.innerHTML = "&nbsp;");
        }
    }
    function Pe() {
      ce();
    }
    const nt = W({
      top: "0"
    });
    function Tt(k) {
      var V;
      const { scrollTop: be } = k.target;
      nt.value.top = `${-be}px`, (V = f.value) === null || V === void 0 || V.syncUnifiedContainer();
    }
    let io = null;
    pt(() => {
      const { autosize: k, type: V } = e;
      k && V === "textarea" ? io = Fe(w, (be) => {
        !Array.isArray(be) && be !== z && Ce(be);
      }) : io == null || io();
    });
    let ao = null;
    pt(() => {
      e.type === "textarea" ? ao = Fe(w, (k) => {
        var V;
        !Array.isArray(k) && k !== z && ((V = f.value) === null || V === void 0 || V.syncUnifiedContainer());
      }) : ao == null || ao();
    }), Ot(ec, {
      mergedValueRef: w,
      maxlengthRef: $e,
      mergedClsPrefixRef: t,
      countGraphemesRef: Te(e, "countGraphemes")
    });
    const Hn = {
      wrapperElRef: a,
      inputElRef: c,
      textareaElRef: l,
      isCompositing: $,
      focus: C,
      blur: H,
      select: J,
      deactivate: ue,
      activate: de,
      scrollTo: me
    }, Ln = Fo("Input", n, t), jr = E(() => {
      const { value: k } = y, { common: { cubicBezierEaseInOut: V }, self: { color: be, borderRadius: je, textColor: Xe, caretColor: Ae, caretColorError: Gt, caretColorWarning: Kt, textDecorationColor: Yt, border: mo, borderDisabled: bo, borderHover: lr, borderFocus: Wn, placeholderColor: Nn, placeholderColorDisabled: jn, lineHeightTextarea: Ic, colorDisabled: Oc, colorFocus: Rc, textColorDisabled: Mc, boxShadowFocus: Ec, iconSize: _c, colorFocusWarning: Bc, boxShadowFocusWarning: Dc, borderWarning: Ac, borderFocusWarning: Fc, borderHoverWarning: Hc, colorFocusError: Lc, boxShadowFocusError: Wc, borderError: Nc, borderFocusError: jc, borderHoverError: Vc, clearSize: Uc, clearColor: qc, clearColorHover: Gc, clearColorPressed: Kc, iconColor: Yc, iconColorDisabled: Xc, suffixTextColor: Zc, countTextColor: Jc, countTextColorDisabled: Qc, iconColorHover: eu, iconColorPressed: tu, loadingColor: ou, loadingColorError: ru, loadingColorWarning: nu, [re("padding", k)]: iu, [re("fontSize", k)]: au, [re("height", k)]: lu } } = i.value, { left: su, right: du } = sn(iu);
      return {
        "--n-bezier": V,
        "--n-count-text-color": Jc,
        "--n-count-text-color-disabled": Qc,
        "--n-color": be,
        "--n-font-size": au,
        "--n-border-radius": je,
        "--n-height": lu,
        "--n-padding-left": su,
        "--n-padding-right": du,
        "--n-text-color": Xe,
        "--n-caret-color": Ae,
        "--n-text-decoration-color": Yt,
        "--n-border": mo,
        "--n-border-disabled": bo,
        "--n-border-hover": lr,
        "--n-border-focus": Wn,
        "--n-placeholder-color": Nn,
        "--n-placeholder-color-disabled": jn,
        "--n-icon-size": _c,
        "--n-line-height-textarea": Ic,
        "--n-color-disabled": Oc,
        "--n-color-focus": Rc,
        "--n-text-color-disabled": Mc,
        "--n-box-shadow-focus": Ec,
        "--n-loading-color": ou,
        // form warning
        "--n-caret-color-warning": Kt,
        "--n-color-focus-warning": Bc,
        "--n-box-shadow-focus-warning": Dc,
        "--n-border-warning": Ac,
        "--n-border-focus-warning": Fc,
        "--n-border-hover-warning": Hc,
        "--n-loading-color-warning": nu,
        // form error
        "--n-caret-color-error": Gt,
        "--n-color-focus-error": Lc,
        "--n-box-shadow-focus-error": Wc,
        "--n-border-error": Nc,
        "--n-border-focus-error": jc,
        "--n-border-hover-error": Vc,
        "--n-loading-color-error": ru,
        // clear-button
        "--n-clear-color": qc,
        "--n-clear-size": Uc,
        "--n-clear-color-hover": Gc,
        "--n-clear-color-pressed": Kc,
        "--n-icon-color": Yc,
        "--n-icon-color-hover": eu,
        "--n-icon-color-pressed": tu,
        "--n-icon-color-disabled": Xc,
        "--n-suffix-text-color": Zc
      };
    }), lo = r ? xt("input", E(() => {
      const { value: k } = y;
      return k[0];
    }), jr, e) : void 0;
    return Object.assign(Object.assign({}, Hn), {
      // DOM ref
      wrapperElRef: a,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: u,
      textareaElRef: l,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: f,
      // value
      rtlEnabled: Ln,
      uncontrolledValue: x,
      mergedValue: w,
      passwordVisible: X,
      mergedPlaceholder: M,
      showPlaceholder1: F,
      showPlaceholder2: L,
      mergedFocus: G,
      isComposing: $,
      activated: P,
      showClearButton: K,
      mergedSize: y,
      mergedDisabled: T,
      textDecorationStyle: _,
      mergedClsPrefix: t,
      mergedBordered: o,
      mergedShowPasswordOn: O,
      placeholderStyle: nt,
      mergedStatus: I,
      textAreaScrollContainerWidth: U,
      // methods
      handleTextAreaScroll: Tt,
      handleCompositionStart: gt,
      handleCompositionEnd: Z,
      handleInput: se,
      handleInputBlur: ae,
      handleInputFocus: j,
      handleWrapperBlur: ee,
      handleWrapperFocus: D,
      handleMouseEnter: rt,
      handleMouseLeave: We,
      handleMouseDown: Le,
      handleChange: oe,
      handleClick: we,
      handleClear: Ie,
      handlePasswordToggleClick: Ne,
      handlePasswordToggleMousedown: ct,
      handleWrapperKeydown: Rt,
      handleTextAreaMirrorResize: Pe,
      getTextareaScrollContainer: () => l.value,
      mergedTheme: i,
      cssVars: r ? void 0 : jr,
      themeClass: lo == null ? void 0 : lo.themeClass,
      onRender: lo == null ? void 0 : lo.onRender
    });
  },
  render() {
    var e, t;
    const { mergedClsPrefix: o, mergedStatus: r, themeClass: n, type: i, countGraphemes: a, onRender: l } = this, s = this.$slots;
    return l == null || l(), m(
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
      m(
        "div",
        { class: `${o}-input-wrapper` },
        bt(s.prefix, (d) => d && m("div", { class: `${o}-input__prefix` }, d)),
        i === "textarea" ? m(Fd, { ref: "textareaScrollbarInstRef", class: `${o}-input__textarea`, container: this.getTextareaScrollContainer, triggerDisplayManually: !0, useUnifiedContainer: !0, internalHoistYRail: !0 }, {
          default: () => {
            var d, c;
            const { textAreaScrollContainerWidth: u } = this, h = {
              width: this.autosize && u && `${u}px`
            };
            return m(
              oo,
              null,
              m("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [
                `${o}-input__textarea-el`,
                (d = this.inputProps) === null || d === void 0 ? void 0 : d.class
              ], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: [
                this.textDecorationStyle[0],
                (c = this.inputProps) === null || c === void 0 ? void 0 : c.style,
                h
              ], onBlur: this.handleInputBlur, onFocus: (v) => this.handleInputFocus(v, 2), onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })),
              this.showPlaceholder1 ? m("div", { class: `${o}-input__placeholder`, style: [
                this.placeholderStyle,
                h
              ], key: "placeholder" }, this.mergedPlaceholder[0]) : null,
              this.autosize ? m(Ir, { onResize: this.handleTextAreaMirrorResize }, {
                default: () => m("div", { ref: "textareaMirrorElRef", class: `${o}-input__textarea-mirror`, key: "mirror" })
              }) : null
            );
          }
        }) : m(
          "div",
          { class: `${o}-input__input` },
          m("input", Object.assign({ type: i === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : i }, this.inputProps, { ref: "inputElRef", class: [
            `${o}-input__input-el`,
            (e = this.inputProps) === null || e === void 0 ? void 0 : e.class
          ], style: [
            this.textDecorationStyle[0],
            (t = this.inputProps) === null || t === void 0 ? void 0 : t.style
          ], tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, onBlur: this.handleInputBlur, onFocus: (d) => this.handleInputFocus(d, 0), onInput: (d) => this.handleInput(d, 0), onChange: (d) => this.handleChange(d, 0) })),
          this.showPlaceholder1 ? m(
            "div",
            { class: `${o}-input__placeholder` },
            m("span", null, this.mergedPlaceholder[0])
          ) : null,
          this.autosize ? m("div", { class: `${o}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, " ") : null
        ),
        !this.pair && bt(s.suffix, (d) => d || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? m("div", { class: `${o}-input__suffix` }, [
          bt(s["clear-icon-placeholder"], (c) => (this.clearable || c) && m(Ai, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
            placeholder: () => c,
            icon: () => {
              var u, h;
              return (h = (u = this.$slots)["clear-icon"]) === null || h === void 0 ? void 0 : h.call(u);
            }
          })),
          this.internalLoadingBeforeSuffix ? null : d,
          this.loading !== void 0 ? m(Gd, { clsPrefix: o, loading: this.loading, showArrow: !1, showClear: !1, style: this.cssVars }) : null,
          this.internalLoadingBeforeSuffix ? d : null,
          this.showCount && this.type !== "textarea" ? m(El, null, {
            default: (c) => {
              var u;
              return (u = s.count) === null || u === void 0 ? void 0 : u.call(s, c);
            }
          }) : null,
          this.mergedShowPasswordOn && this.type === "password" ? m("div", { class: `${o}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible ? Jt(s["password-visible-icon"], () => [
            m(to, { clsPrefix: o }, { default: () => m(O0, null) })
          ]) : Jt(s["password-invisible-icon"], () => [
            m(to, { clsPrefix: o }, { default: () => m(R0, null) })
          ])) : null
        ]) : null)
      ),
      this.pair ? m("span", { class: `${o}-input__separator` }, Jt(s.separator, () => [this.separator])) : null,
      this.pair ? m(
        "div",
        { class: `${o}-input-wrapper` },
        m(
          "div",
          { class: `${o}-input__input` },
          m("input", { ref: "inputEl2Ref", type: this.type, class: `${o}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: (d) => this.handleInputFocus(d, 1), onInput: (d) => this.handleInput(d, 1), onChange: (d) => this.handleChange(d, 1) }),
          this.showPlaceholder2 ? m(
            "div",
            { class: `${o}-input__placeholder` },
            m("span", null, this.mergedPlaceholder[1])
          ) : null
        ),
        bt(s.suffix, (d) => (this.clearable || d) && m("div", { class: `${o}-input__suffix` }, [
          this.clearable && m(Ai, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
            icon: () => {
              var c;
              return (c = s["clear-icon"]) === null || c === void 0 ? void 0 : c.call(s);
            },
            placeholder: () => {
              var c;
              return (c = s["clear-icon-placeholder"]) === null || c === void 0 ? void 0 : c.call(s);
            }
          }),
          d
        ]))
      ) : null,
      this.mergedBordered ? m("div", { class: `${o}-input__border` }) : null,
      this.mergedBordered ? m("div", { class: `${o}-input__state-border` }) : null,
      this.showCount && i === "textarea" ? m(El, null, {
        default: (d) => {
          var c;
          const { renderCount: u } = this;
          return u ? u(d) : (c = s.count) === null || c === void 0 ? void 0 : c.call(s, d);
        }
      }) : null
    );
  }
});
function BC(e) {
  const { boxShadow2: t } = e;
  return {
    menuBoxShadow: t
  };
}
const DC = {
  name: "AutoComplete",
  common: te,
  peers: {
    InternalSelectMenu: Wr,
    Input: At
  },
  self: BC
}, AC = DC, FC = (e) => {
  const { borderRadius: t, avatarColor: o, cardColor: r, fontSize: n, heightTiny: i, heightSmall: a, heightMedium: l, heightLarge: s, heightHuge: d, modalColor: c, popoverColor: u } = e;
  return {
    borderRadius: t,
    fontSize: n,
    border: `2px solid ${r}`,
    heightTiny: i,
    heightSmall: a,
    heightMedium: l,
    heightLarge: s,
    heightHuge: d,
    color: he(r, o),
    colorModal: he(c, o),
    colorPopover: he(u, o)
  };
}, HC = {
  name: "Avatar",
  common: te,
  self: FC
}, tc = HC, LC = () => ({
  gap: "-12px"
}), WC = {
  name: "AvatarGroup",
  common: te,
  peers: {
    Avatar: tc
  },
  self: LC
}, NC = WC, jC = {
  width: "44px",
  height: "44px",
  borderRadius: "22px",
  iconSize: "26px"
}, VC = {
  name: "BackTop",
  common: te,
  self(e) {
    const { popoverColor: t, textColor2: o, primaryColorHover: r, primaryColorPressed: n } = e;
    return Object.assign(Object.assign({}, jC), { color: t, textColor: o, iconColor: o, iconColorHover: r, iconColorPressed: n, boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)", boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)", boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)" });
  }
}, UC = VC, qC = {
  name: "Badge",
  common: te,
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
}, GC = qC, KC = {
  fontWeightActive: "400"
}, YC = (e) => {
  const { fontSize: t, textColor3: o, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: a } = e;
  return Object.assign(Object.assign({}, KC), { fontSize: t, itemLineHeight: "1.25", itemTextColor: o, itemTextColorHover: r, itemTextColorPressed: r, itemTextColorActive: r, itemBorderRadius: n, itemColorHover: i, itemColorPressed: a, separatorColor: o });
}, XC = {
  name: "Breadcrumb",
  common: te,
  self: YC
}, ZC = XC;
function Co(e) {
  return he(e, [255, 255, 255, 0.16]);
}
function tn(e) {
  return he(e, [0, 0, 0, 0.12]);
}
const JC = "n-button-group", QC = {
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
}, oc = (e) => {
  const { heightTiny: t, heightSmall: o, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: a, fontSizeSmall: l, fontSizeMedium: s, fontSizeLarge: d, opacityDisabled: c, textColor2: u, textColor3: h, primaryColorHover: v, primaryColorPressed: f, borderColor: b, primaryColor: x, baseColor: p, infoColor: w, infoColorHover: R, infoColorPressed: y, successColor: T, successColorHover: I, successColorPressed: g, warningColor: S, warningColorHover: $, warningColorPressed: P, errorColor: z, errorColorHover: M, errorColorPressed: F, fontWeight: L, buttonColor2: G, buttonColor2Hover: K, buttonColor2Pressed: O, fontWeightStrong: X } = e;
  return Object.assign(Object.assign({}, QC), {
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
    fontSizeLarge: d,
    opacityDisabled: c,
    // secondary
    colorOpacitySecondary: "0.16",
    colorOpacitySecondaryHover: "0.22",
    colorOpacitySecondaryPressed: "0.28",
    colorSecondary: G,
    colorSecondaryHover: K,
    colorSecondaryPressed: O,
    // tertiary
    colorTertiary: G,
    colorTertiaryHover: K,
    colorTertiaryPressed: O,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: K,
    colorQuaternaryPressed: O,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: u,
    textColorTertiary: h,
    textColorHover: v,
    textColorPressed: f,
    textColorFocus: v,
    textColorDisabled: u,
    textColorText: u,
    textColorTextHover: v,
    textColorTextPressed: f,
    textColorTextFocus: v,
    textColorTextDisabled: u,
    textColorGhost: u,
    textColorGhostHover: v,
    textColorGhostPressed: f,
    textColorGhostFocus: v,
    textColorGhostDisabled: u,
    border: `1px solid ${b}`,
    borderHover: `1px solid ${v}`,
    borderPressed: `1px solid ${f}`,
    borderFocus: `1px solid ${v}`,
    borderDisabled: `1px solid ${b}`,
    rippleColor: x,
    // primary
    colorPrimary: x,
    colorHoverPrimary: v,
    colorPressedPrimary: f,
    colorFocusPrimary: v,
    colorDisabledPrimary: x,
    textColorPrimary: p,
    textColorHoverPrimary: p,
    textColorPressedPrimary: p,
    textColorFocusPrimary: p,
    textColorDisabledPrimary: p,
    textColorTextPrimary: x,
    textColorTextHoverPrimary: v,
    textColorTextPressedPrimary: f,
    textColorTextFocusPrimary: v,
    textColorTextDisabledPrimary: u,
    textColorGhostPrimary: x,
    textColorGhostHoverPrimary: v,
    textColorGhostPressedPrimary: f,
    textColorGhostFocusPrimary: v,
    textColorGhostDisabledPrimary: x,
    borderPrimary: `1px solid ${x}`,
    borderHoverPrimary: `1px solid ${v}`,
    borderPressedPrimary: `1px solid ${f}`,
    borderFocusPrimary: `1px solid ${v}`,
    borderDisabledPrimary: `1px solid ${x}`,
    rippleColorPrimary: x,
    // info
    colorInfo: w,
    colorHoverInfo: R,
    colorPressedInfo: y,
    colorFocusInfo: R,
    colorDisabledInfo: w,
    textColorInfo: p,
    textColorHoverInfo: p,
    textColorPressedInfo: p,
    textColorFocusInfo: p,
    textColorDisabledInfo: p,
    textColorTextInfo: w,
    textColorTextHoverInfo: R,
    textColorTextPressedInfo: y,
    textColorTextFocusInfo: R,
    textColorTextDisabledInfo: u,
    textColorGhostInfo: w,
    textColorGhostHoverInfo: R,
    textColorGhostPressedInfo: y,
    textColorGhostFocusInfo: R,
    textColorGhostDisabledInfo: w,
    borderInfo: `1px solid ${w}`,
    borderHoverInfo: `1px solid ${R}`,
    borderPressedInfo: `1px solid ${y}`,
    borderFocusInfo: `1px solid ${R}`,
    borderDisabledInfo: `1px solid ${w}`,
    rippleColorInfo: w,
    // success
    colorSuccess: T,
    colorHoverSuccess: I,
    colorPressedSuccess: g,
    colorFocusSuccess: I,
    colorDisabledSuccess: T,
    textColorSuccess: p,
    textColorHoverSuccess: p,
    textColorPressedSuccess: p,
    textColorFocusSuccess: p,
    textColorDisabledSuccess: p,
    textColorTextSuccess: T,
    textColorTextHoverSuccess: I,
    textColorTextPressedSuccess: g,
    textColorTextFocusSuccess: I,
    textColorTextDisabledSuccess: u,
    textColorGhostSuccess: T,
    textColorGhostHoverSuccess: I,
    textColorGhostPressedSuccess: g,
    textColorGhostFocusSuccess: I,
    textColorGhostDisabledSuccess: T,
    borderSuccess: `1px solid ${T}`,
    borderHoverSuccess: `1px solid ${I}`,
    borderPressedSuccess: `1px solid ${g}`,
    borderFocusSuccess: `1px solid ${I}`,
    borderDisabledSuccess: `1px solid ${T}`,
    rippleColorSuccess: T,
    // warning
    colorWarning: S,
    colorHoverWarning: $,
    colorPressedWarning: P,
    colorFocusWarning: $,
    colorDisabledWarning: S,
    textColorWarning: p,
    textColorHoverWarning: p,
    textColorPressedWarning: p,
    textColorFocusWarning: p,
    textColorDisabledWarning: p,
    textColorTextWarning: S,
    textColorTextHoverWarning: $,
    textColorTextPressedWarning: P,
    textColorTextFocusWarning: $,
    textColorTextDisabledWarning: u,
    textColorGhostWarning: S,
    textColorGhostHoverWarning: $,
    textColorGhostPressedWarning: P,
    textColorGhostFocusWarning: $,
    textColorGhostDisabledWarning: S,
    borderWarning: `1px solid ${S}`,
    borderHoverWarning: `1px solid ${$}`,
    borderPressedWarning: `1px solid ${P}`,
    borderFocusWarning: `1px solid ${$}`,
    borderDisabledWarning: `1px solid ${S}`,
    rippleColorWarning: S,
    // error
    colorError: z,
    colorHoverError: M,
    colorPressedError: F,
    colorFocusError: M,
    colorDisabledError: z,
    textColorError: p,
    textColorHoverError: p,
    textColorPressedError: p,
    textColorFocusError: p,
    textColorDisabledError: p,
    textColorTextError: z,
    textColorTextHoverError: M,
    textColorTextPressedError: F,
    textColorTextFocusError: M,
    textColorTextDisabledError: u,
    textColorGhostError: z,
    textColorGhostHoverError: M,
    textColorGhostPressedError: F,
    textColorGhostFocusError: M,
    textColorGhostDisabledError: z,
    borderError: `1px solid ${z}`,
    borderHoverError: `1px solid ${M}`,
    borderPressedError: `1px solid ${F}`,
    borderFocusError: `1px solid ${M}`,
    borderDisabledError: `1px solid ${z}`,
    rippleColorError: z,
    waveOpacity: "0.6",
    fontWeight: L,
    fontWeightStrong: X
  });
}, ey = {
  name: "Button",
  common: vt,
  self: oc
}, rc = ey, ty = {
  name: "Button",
  common: te,
  self(e) {
    const t = oc(e);
    return t.waveOpacity = "0.8", t.colorOpacitySecondary = "0.16", t.colorOpacitySecondaryHover = "0.2", t.colorOpacitySecondaryPressed = "0.12", t;
  }
}, Pt = ty, oy = N([B("button", `
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
 `, [Q("color", [A("border", {
  borderColor: "var(--n-border-color)"
}), Q("disabled", [A("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), tt("disabled", [N("&:focus", [A("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), N("&:hover", [A("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), N("&:active", [A("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), Q("pressed", [A("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), Q("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [A("border", {
  border: "var(--n-border-disabled)"
})]), tt("disabled", [N("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [A("state-border", {
  border: "var(--n-border-focus)"
})]), N("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [A("state-border", {
  border: "var(--n-border-hover)"
})]), N("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [A("state-border", {
  border: "var(--n-border-pressed)"
})]), Q("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [A("state-border", {
  border: "var(--n-border-pressed)"
})])]), Q("loading", "cursor: wait;"), B("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [Q("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), Fr && "MozBoxSizing" in document.createElement("div").style ? N("&::moz-focus-inner", {
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
 `, [B("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [Er({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), pC()]), A("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [N("~", [A("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), Q("block", `
 display: flex;
 width: 100%;
 `), Q("dashed", [A("border, state-border", {
  borderStyle: "dashed !important"
})]), Q("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), N("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), N("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]), ry = Object.assign(Object.assign({}, Me.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: {
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
  default: !Zd
} }), ny = ge({
  name: "Button",
  props: ry,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      const { dashed: y, ghost: T, text: I, secondary: g, tertiary: S, quaternary: $ } = e;
      (y || T || I) && (g || S || $) && kt("button", "`dashed`, `ghost` and `text` props can't be used along with `secondary`, `tertiary` and `quaterary` props.");
    });
    const t = W(null), o = W(null), r = W(!1), n = Ze(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = De(JC, {}), { mergedSizeRef: a } = _o({}, {
      defaultSize: "medium",
      mergedSize: (y) => {
        const { size: T } = e;
        if (T)
          return T;
        const { size: I } = i;
        if (I)
          return I;
        const { mergedSize: g } = y || {};
        return g ? g.value : "medium";
      }
    }), l = E(() => e.focusable && !e.disabled), s = (y) => {
      var T;
      l.value || y.preventDefault(), !e.nativeFocusBehavior && (y.preventDefault(), !e.disabled && l.value && ((T = t.value) === null || T === void 0 || T.focus({ preventScroll: !0 })));
    }, d = (y) => {
      var T;
      if (!e.disabled && !e.loading) {
        const { onClick: I } = e;
        I && pe(I, y), e.text || (T = o.value) === null || T === void 0 || T.play();
      }
    }, c = (y) => {
      switch (y.key) {
        case "Enter":
          if (!e.keyboard)
            return;
          r.value = !1;
      }
    }, u = (y) => {
      switch (y.key) {
        case "Enter":
          if (!e.keyboard || e.loading) {
            y.preventDefault();
            return;
          }
          r.value = !0;
      }
    }, h = () => {
      r.value = !1;
    }, { inlineThemeDisabled: v, mergedClsPrefixRef: f, mergedRtlRef: b } = Ct(e), x = Me("Button", "-button", oy, rc, e, f), p = Fo("Button", b, f), w = E(() => {
      const y = x.value, { common: { cubicBezierEaseInOut: T, cubicBezierEaseOut: I }, self: g } = y, { rippleDuration: S, opacityDisabled: $, fontWeight: P, fontWeightStrong: z } = g, M = a.value, { dashed: F, type: L, ghost: G, text: K, color: O, round: X, circle: _, textColor: U, secondary: ce, tertiary: $e, quaternary: Oe, strong: Be } = e, ke = {
        "font-weight": Be ? z : P
      };
      let fe = {
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
      const xe = L === "tertiary", ze = L === "default", le = xe ? "default" : L;
      if (K) {
        const ae = U || O;
        fe = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": ae || g[re("textColorText", le)],
          "--n-text-color-hover": ae ? Co(ae) : g[re("textColorTextHover", le)],
          "--n-text-color-pressed": ae ? tn(ae) : g[re("textColorTextPressed", le)],
          "--n-text-color-focus": ae ? Co(ae) : g[re("textColorTextHover", le)],
          "--n-text-color-disabled": ae || g[re("textColorTextDisabled", le)]
        };
      } else if (G || F) {
        const ae = U || O;
        fe = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": O || g[re("rippleColor", le)],
          "--n-text-color": ae || g[re("textColorGhost", le)],
          "--n-text-color-hover": ae ? Co(ae) : g[re("textColorGhostHover", le)],
          "--n-text-color-pressed": ae ? tn(ae) : g[re("textColorGhostPressed", le)],
          "--n-text-color-focus": ae ? Co(ae) : g[re("textColorGhostHover", le)],
          "--n-text-color-disabled": ae || g[re("textColorGhostDisabled", le)]
        };
      } else if (ce) {
        const ae = ze ? g.textColor : xe ? g.textColorTertiary : g[re("color", le)], j = O || ae, ee = L !== "default" && L !== "tertiary";
        fe = {
          "--n-color": ee ? Y(j, {
            alpha: Number(g.colorOpacitySecondary)
          }) : g.colorSecondary,
          "--n-color-hover": ee ? Y(j, {
            alpha: Number(g.colorOpacitySecondaryHover)
          }) : g.colorSecondaryHover,
          "--n-color-pressed": ee ? Y(j, {
            alpha: Number(g.colorOpacitySecondaryPressed)
          }) : g.colorSecondaryPressed,
          "--n-color-focus": ee ? Y(j, {
            alpha: Number(g.colorOpacitySecondaryHover)
          }) : g.colorSecondaryHover,
          "--n-color-disabled": g.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": j,
          "--n-text-color-hover": j,
          "--n-text-color-pressed": j,
          "--n-text-color-focus": j,
          "--n-text-color-disabled": j
        };
      } else if ($e || Oe) {
        const ae = ze ? g.textColor : xe ? g.textColorTertiary : g[re("color", le)], j = O || ae;
        $e ? (fe["--n-color"] = g.colorTertiary, fe["--n-color-hover"] = g.colorTertiaryHover, fe["--n-color-pressed"] = g.colorTertiaryPressed, fe["--n-color-focus"] = g.colorSecondaryHover, fe["--n-color-disabled"] = g.colorTertiary) : (fe["--n-color"] = g.colorQuaternary, fe["--n-color-hover"] = g.colorQuaternaryHover, fe["--n-color-pressed"] = g.colorQuaternaryPressed, fe["--n-color-focus"] = g.colorQuaternaryHover, fe["--n-color-disabled"] = g.colorQuaternary), fe["--n-ripple-color"] = "#0000", fe["--n-text-color"] = j, fe["--n-text-color-hover"] = j, fe["--n-text-color-pressed"] = j, fe["--n-text-color-focus"] = j, fe["--n-text-color-disabled"] = j;
      } else
        fe = {
          "--n-color": O || g[re("color", le)],
          "--n-color-hover": O ? Co(O) : g[re("colorHover", le)],
          "--n-color-pressed": O ? tn(O) : g[re("colorPressed", le)],
          "--n-color-focus": O ? Co(O) : g[re("colorFocus", le)],
          "--n-color-disabled": O || g[re("colorDisabled", le)],
          "--n-ripple-color": O || g[re("rippleColor", le)],
          "--n-text-color": U || (O ? g.textColorPrimary : xe ? g.textColorTertiary : g[re("textColor", le)]),
          "--n-text-color-hover": U || (O ? g.textColorHoverPrimary : g[re("textColorHover", le)]),
          "--n-text-color-pressed": U || (O ? g.textColorPressedPrimary : g[re("textColorPressed", le)]),
          "--n-text-color-focus": U || (O ? g.textColorFocusPrimary : g[re("textColorFocus", le)]),
          "--n-text-color-disabled": U || (O ? g.textColorDisabledPrimary : g[re("textColorDisabled", le)])
        };
      let Ve = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      K ? Ve = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : Ve = {
        "--n-border": g[re("border", le)],
        "--n-border-hover": g[re("borderHover", le)],
        "--n-border-pressed": g[re("borderPressed", le)],
        "--n-border-focus": g[re("borderFocus", le)],
        "--n-border-disabled": g[re("borderDisabled", le)]
      };
      const { [re("height", M)]: He, [re("fontSize", M)]: Ue, [re("padding", M)]: Ke, [re("paddingRound", M)]: Je, [re("iconSize", M)]: st, [re("borderRadius", M)]: gt, [re("iconMargin", M)]: Z, waveOpacity: se } = g, ye = {
        "--n-width": _ && !K ? He : "initial",
        "--n-height": K ? "initial" : He,
        "--n-font-size": Ue,
        "--n-padding": _ || K ? "initial" : X ? Je : Ke,
        "--n-icon-size": st,
        "--n-icon-margin": Z,
        "--n-border-radius": K ? "initial" : _ || X ? He : gt
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": T, "--n-bezier-ease-out": I, "--n-ripple-duration": S, "--n-opacity-disabled": $, "--n-wave-opacity": se }, ke), fe), Ve), ye);
    }), R = v ? xt("button", E(() => {
      let y = "";
      const { dashed: T, type: I, ghost: g, text: S, color: $, round: P, circle: z, textColor: M, secondary: F, tertiary: L, quaternary: G, strong: K } = e;
      T && (y += "a"), g && (y += "b"), S && (y += "c"), P && (y += "d"), z && (y += "e"), F && (y += "f"), L && (y += "g"), G && (y += "h"), K && (y += "i"), $ && (y += "j" + mn($)), M && (y += "k" + mn(M));
      const { value: O } = a;
      return y += "l" + O[0], y += "m" + I[0], y;
    }), w, e) : void 0;
    return {
      selfElRef: t,
      waveElRef: o,
      mergedClsPrefix: f,
      mergedFocusable: l,
      mergedSize: a,
      showBorder: n,
      enterPressed: r,
      rtlEnabled: p,
      handleMousedown: s,
      handleKeydown: u,
      handleBlur: h,
      handleKeyup: c,
      handleClick: d,
      customColorCssVars: E(() => {
        const { color: y } = e;
        if (!y)
          return null;
        const T = Co(y);
        return {
          "--n-border-color": y,
          "--n-border-color-hover": T,
          "--n-border-color-pressed": tn(y),
          "--n-border-color-focus": T,
          "--n-border-color-disabled": y
        };
      }),
      cssVars: v ? void 0 : w,
      themeClass: R == null ? void 0 : R.themeClass,
      onRender: R == null ? void 0 : R.onRender
    };
  },
  render() {
    const { mergedClsPrefix: e, tag: t, onRender: o } = this;
    o == null || o();
    const r = bt(this.$slots.default, (n) => n && m("span", { class: `${e}-button__content` }, n));
    return m(
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
      m(D0, { width: !0 }, {
        default: () => bt(this.$slots.icon, (n) => (this.loading || this.renderIcon || n) && m(
          "span",
          { class: `${e}-button__icon`, style: {
            margin: yi(this.$slots.default) ? "0" : ""
          } },
          m(Dn, null, {
            default: () => this.loading ? m(va, { clsPrefix: e, key: "loading", class: `${e}-icon-slot`, strokeWidth: 20 }) : m("div", { key: "icon", class: `${e}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : n)
          })
        ))
      }),
      this.iconPlacement === "left" && r,
      this.text ? null : m(Nx, { ref: "waveElRef", clsPrefix: e }),
      this.showBorder ? m("div", { "aria-hidden": !0, class: `${e}-button__border`, style: this.customColorCssVars }) : null,
      this.showBorder ? m("div", { "aria-hidden": !0, class: `${e}-button__state-border`, style: this.customColorCssVars }) : null
    );
  }
}), _l = ny, iy = {
  titleFontSize: "22px"
}, ay = (e) => {
  const { borderRadius: t, fontSize: o, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: a, dividerColor: l, fontWeightStrong: s, primaryColor: d, baseColor: c, hoverColor: u, cardColor: h, modalColor: v, popoverColor: f } = e;
  return Object.assign(Object.assign({}, iy), {
    borderRadius: t,
    borderColor: he(h, l),
    borderColorModal: he(v, l),
    borderColorPopover: he(f, l),
    textColor: n,
    titleFontWeight: s,
    titleTextColor: i,
    dayTextColor: a,
    fontSize: o,
    lineHeight: r,
    dateColorCurrent: d,
    dateTextColorCurrent: c,
    cellColorHover: he(h, u),
    cellColorHoverModal: he(v, u),
    cellColorHoverPopover: he(f, u),
    cellColor: h,
    cellColorModal: v,
    cellColorPopover: f,
    barColor: d
  });
}, ly = {
  name: "Calendar",
  common: te,
  peers: {
    Button: Pt
  },
  self: ay
}, sy = ly, dy = (e) => {
  const { fontSize: t, boxShadow2: o, popoverColor: r, textColor2: n, borderRadius: i, borderColor: a, heightSmall: l, heightMedium: s, heightLarge: d, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: h, dividerColor: v } = e;
  return {
    panelFontSize: t,
    boxShadow: o,
    color: r,
    textColor: n,
    borderRadius: i,
    border: `1px solid ${a}`,
    heightSmall: l,
    heightMedium: s,
    heightLarge: d,
    fontSizeSmall: c,
    fontSizeMedium: u,
    fontSizeLarge: h,
    dividerColor: v
  };
}, cy = {
  name: "ColorPicker",
  common: te,
  peers: {
    Input: At,
    Button: Pt
  },
  self: dy
}, uy = cy, fy = {
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
}, hy = (e) => {
  const { primaryColor: t, borderRadius: o, lineHeight: r, fontSize: n, cardColor: i, textColor2: a, textColor1: l, dividerColor: s, fontWeightStrong: d, closeIconColor: c, closeIconColorHover: u, closeIconColorPressed: h, closeColorHover: v, closeColorPressed: f, modalColor: b, boxShadow1: x, popoverColor: p, actionColor: w } = e;
  return Object.assign(Object.assign({}, fy), {
    lineHeight: r,
    color: i,
    colorModal: b,
    colorPopover: p,
    colorTarget: t,
    colorEmbedded: w,
    colorEmbeddedModal: w,
    colorEmbeddedPopover: w,
    textColor: a,
    titleTextColor: l,
    borderColor: s,
    actionColor: w,
    titleFontWeight: d,
    closeColorHover: v,
    closeColorPressed: f,
    closeBorderRadius: o,
    closeIconColor: c,
    closeIconColorHover: u,
    closeIconColorPressed: h,
    fontSizeSmall: n,
    fontSizeMedium: n,
    fontSizeLarge: n,
    fontSizeHuge: n,
    boxShadow: x,
    borderRadius: o
  });
}, py = {
  name: "Card",
  common: te,
  self(e) {
    const t = hy(e), { cardColor: o, modalColor: r, popoverColor: n } = e;
    return t.colorEmbedded = o, t.colorEmbeddedModal = r, t.colorEmbeddedPopover = n, t;
  }
}, nc = py, vy = (e) => ({
  dotSize: "8px",
  dotColor: "rgba(255, 255, 255, .3)",
  dotColorActive: "rgba(255, 255, 255, 1)",
  dotColorFocus: "rgba(255, 255, 255, .5)",
  dotLineWidth: "16px",
  dotLineWidthActive: "24px",
  arrowColor: "#eee"
}), gy = {
  name: "Carousel",
  common: te,
  self: vy
}, my = gy, by = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
}, ic = (e) => {
  const { baseColor: t, inputColorDisabled: o, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: a, borderColor: l, primaryColor: s, textColor2: d, fontSizeSmall: c, fontSizeMedium: u, fontSizeLarge: h, borderRadiusSmall: v, lineHeight: f } = e;
  return Object.assign(Object.assign({}, by), {
    labelLineHeight: f,
    fontSizeSmall: c,
    fontSizeMedium: u,
    fontSizeLarge: h,
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
    boxShadowFocus: `0 0 0 2px ${Y(s, { alpha: 0.3 })}`,
    textColor: d,
    textColorDisabled: a
  });
}, xy = {
  name: "Checkbox",
  common: vt,
  self: ic
}, Cy = xy, yy = {
  name: "Checkbox",
  common: te,
  self(e) {
    const { cardColor: t } = e, o = ic(e);
    return o.color = "#0000", o.checkMarkColor = t, o;
  }
}, ir = yy, wy = (e) => {
  const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n, textColor3: i, primaryColor: a, textColorDisabled: l, dividerColor: s, hoverColor: d, fontSizeMedium: c, heightMedium: u } = e;
  return {
    menuBorderRadius: t,
    menuColor: r,
    menuBoxShadow: o,
    menuDividerColor: s,
    menuHeight: "calc(var(--n-option-height) * 6.6)",
    optionArrowColor: i,
    optionHeight: u,
    optionFontSize: c,
    optionColorHover: d,
    optionTextColor: n,
    optionTextColorActive: a,
    optionTextColorDisabled: l,
    optionCheckMarkColor: a,
    loadingColor: a,
    columnWidth: "180px"
  };
}, Sy = {
  name: "Cascader",
  common: te,
  peers: {
    InternalSelectMenu: Wr,
    InternalSelection: xa,
    Scrollbar: $t,
    Checkbox: ir,
    Empty: ma
  },
  self: wy
}, $y = Sy, Py = m(
  "svg",
  { viewBox: "0 0 64 64", class: "check-icon" },
  m("path", { d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z" })
), Ty = m(
  "svg",
  { viewBox: "0 0 100 100", class: "line-icon" },
  m("path", { d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z" })
), ac = "n-checkbox-group", ky = {
  min: Number,
  max: Number,
  size: String,
  value: Array,
  defaultValue: {
    type: Array,
    default: null
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  // deprecated
  onChange: [Function, Array]
};
ge({
  name: "CheckboxGroup",
  props: ky,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      e.onChange !== void 0 && kt("checkbox-group", "`on-change` is deprecated, please use `on-update:value` instead.");
    });
    const { mergedClsPrefixRef: t } = Ct(e), o = _o(e), { mergedSizeRef: r, mergedDisabledRef: n } = o, i = W(e.defaultValue), a = E(() => e.value), l = fo(a, i), s = E(() => {
      var u;
      return ((u = l.value) === null || u === void 0 ? void 0 : u.length) || 0;
    }), d = E(() => Array.isArray(l.value) ? new Set(l.value) : /* @__PURE__ */ new Set());
    function c(u, h) {
      const { nTriggerFormInput: v, nTriggerFormChange: f } = o, { onChange: b, "onUpdate:value": x, onUpdateValue: p } = e;
      if (Array.isArray(l.value)) {
        const w = Array.from(l.value), R = w.findIndex((y) => y === h);
        u ? ~R || (w.push(h), p && pe(p, w, {
          actionType: "check",
          value: h
        }), x && pe(x, w, {
          actionType: "check",
          value: h
        }), v(), f(), i.value = w, b && pe(b, w)) : ~R && (w.splice(R, 1), p && pe(p, w, {
          actionType: "uncheck",
          value: h
        }), x && pe(x, w, {
          actionType: "uncheck",
          value: h
        }), b && pe(b, w), i.value = w, v(), f());
      } else
        u ? (p && pe(p, [h], {
          actionType: "check",
          value: h
        }), x && pe(x, [h], {
          actionType: "check",
          value: h
        }), b && pe(b, [h]), i.value = [h], v(), f()) : (p && pe(p, [], {
          actionType: "uncheck",
          value: h
        }), x && pe(x, [], {
          actionType: "uncheck",
          value: h
        }), b && pe(b, []), i.value = [], v(), f());
    }
    return Ot(ac, {
      checkedCountRef: s,
      maxRef: Te(e, "max"),
      minRef: Te(e, "min"),
      valueSetRef: d,
      disabledRef: n,
      mergedSizeRef: r,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return m("div", { class: `${this.mergedClsPrefix}-checkbox-group`, role: "group" }, this.$slots);
  }
});
const zy = N([
  B("checkbox", `
 line-height: var(--n-label-line-height);
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 --n-merged-color-table: var(--n-color-table);
 `, [N("&:hover", [B("checkbox-box", [A("border", {
    border: "var(--n-border-checked)"
  })])]), N("&:focus:not(:active)", [B("checkbox-box", [A("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), Q("inside-table", [B("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), Q("checked", [B("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [B("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    N(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), Q("indeterminate", [B("checkbox-box", [B("checkbox-icon", [N(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), N(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), Q("checked, indeterminate", [N("&:focus:not(:active)", [B("checkbox-box", [A("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), B("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [A("border", {
    border: "var(--n-border-checked)"
  })])]), Q("disabled", {
    cursor: "not-allowed"
  }, [Q("checked", [B("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [A("border", {
    border: "var(--n-border-disabled-checked)"
  }), B("checkbox-icon", [N(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), B("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [A("border", {
    border: "var(--n-border-disabled)"
  }), B("checkbox-icon", [N(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled)"
  })])]), A("label", {
    color: "var(--n-text-color-disabled)"
  })]), B("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), B("checkbox-box", `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [A("border", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), B("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [N(".check-icon, .line-icon", `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), Er({
    left: "1px",
    top: "1px"
  })])]), A("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [N("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  Is(B("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  Os(B("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), Iy = Object.assign(Object.assign({}, Me.props), {
  size: String,
  checked: {
    type: [Boolean, String, Number],
    default: void 0
  },
  defaultChecked: {
    type: [Boolean, String, Number],
    default: !1
  },
  value: [String, Number],
  disabled: {
    type: Boolean,
    default: void 0
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: !0
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: !0
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: !1
  },
  "onUpdate:checked": [Function, Array],
  onUpdateChecked: [Function, Array],
  // private
  privateInsideTable: Boolean,
  // deprecated
  onChange: [Function, Array]
}), Bl = ge({
  name: "Checkbox",
  props: Iy,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      e.onChange && kt("checkbox", "`on-change` is deprecated, please use `on-update:checked` instead.");
    });
    const t = W(null), { mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = Ct(e), i = _o(e, {
      mergedSize(I) {
        const { size: g } = e;
        if (g !== void 0)
          return g;
        if (s) {
          const { value: S } = s.mergedSizeRef;
          if (S !== void 0)
            return S;
        }
        if (I) {
          const { mergedSize: S } = I;
          if (S !== void 0)
            return S.value;
        }
        return "medium";
      },
      mergedDisabled(I) {
        const { disabled: g } = e;
        if (g !== void 0)
          return g;
        if (s) {
          if (s.disabledRef.value)
            return !0;
          const { maxRef: { value: S }, checkedCountRef: $ } = s;
          if (S !== void 0 && $.value >= S && !h.value)
            return !0;
          const { minRef: { value: P } } = s;
          if (P !== void 0 && $.value <= P && h.value)
            return !0;
        }
        return I ? I.disabled.value : !1;
      }
    }), { mergedDisabledRef: a, mergedSizeRef: l } = i, s = De(ac, null), d = W(e.defaultChecked), c = Te(e, "checked"), u = fo(c, d), h = Ze(() => {
      if (s) {
        const I = s.valueSetRef.value;
        return I && e.value !== void 0 ? I.has(e.value) : !1;
      } else
        return u.value === e.checkedValue;
    }), v = Me("Checkbox", "-checkbox", zy, Cy, e, o);
    function f(I) {
      if (s && e.value !== void 0)
        s.toggleCheckbox(!h.value, e.value);
      else {
        const { onChange: g, "onUpdate:checked": S, onUpdateChecked: $ } = e, { nTriggerFormInput: P, nTriggerFormChange: z } = i, M = h.value ? e.uncheckedValue : e.checkedValue;
        S && pe(S, M, I), $ && pe($, M, I), g && pe(g, M, I), P(), z(), d.value = M;
      }
    }
    function b(I) {
      a.value || f(I);
    }
    function x(I) {
      if (!a.value)
        switch (I.key) {
          case " ":
          case "Enter":
            f(I);
        }
    }
    function p(I) {
      switch (I.key) {
        case " ":
          I.preventDefault();
      }
    }
    const w = {
      focus: () => {
        var I;
        (I = t.value) === null || I === void 0 || I.focus();
      },
      blur: () => {
        var I;
        (I = t.value) === null || I === void 0 || I.blur();
      }
    }, R = Fo("Checkbox", n, o), y = E(() => {
      const { value: I } = l, { common: { cubicBezierEaseInOut: g }, self: { borderRadius: S, color: $, colorChecked: P, colorDisabled: z, colorTableHeader: M, colorTableHeaderModal: F, colorTableHeaderPopover: L, checkMarkColor: G, checkMarkColorDisabled: K, border: O, borderFocus: X, borderDisabled: _, borderChecked: U, boxShadowFocus: ce, textColor: $e, textColorDisabled: Oe, checkMarkColorDisabledChecked: Be, colorDisabledChecked: ke, borderDisabledChecked: fe, labelPadding: xe, labelLineHeight: ze, labelFontWeight: le, [re("fontSize", I)]: Ve, [re("size", I)]: He } } = v.value;
      return {
        "--n-label-line-height": ze,
        "--n-label-font-weight": le,
        "--n-size": He,
        "--n-bezier": g,
        "--n-border-radius": S,
        "--n-border": O,
        "--n-border-checked": U,
        "--n-border-focus": X,
        "--n-border-disabled": _,
        "--n-border-disabled-checked": fe,
        "--n-box-shadow-focus": ce,
        "--n-color": $,
        "--n-color-checked": P,
        "--n-color-table": M,
        "--n-color-table-modal": F,
        "--n-color-table-popover": L,
        "--n-color-disabled": z,
        "--n-color-disabled-checked": ke,
        "--n-text-color": $e,
        "--n-text-color-disabled": Oe,
        "--n-check-mark-color": G,
        "--n-check-mark-color-disabled": K,
        "--n-check-mark-color-disabled-checked": Be,
        "--n-font-size": Ve,
        "--n-label-padding": xe
      };
    }), T = r ? xt("checkbox", E(() => l.value[0]), y, e) : void 0;
    return Object.assign(i, w, {
      rtlEnabled: R,
      selfRef: t,
      mergedClsPrefix: o,
      mergedDisabled: a,
      renderedChecked: h,
      mergedTheme: v,
      labelId: vn(),
      handleClick: b,
      handleKeyUp: x,
      handleKeyDown: p,
      cssVars: r ? void 0 : y,
      themeClass: T == null ? void 0 : T.themeClass,
      onRender: T == null ? void 0 : T.onRender
    });
  },
  render() {
    var e;
    const { $slots: t, renderedChecked: o, mergedDisabled: r, indeterminate: n, privateInsideTable: i, cssVars: a, labelId: l, label: s, mergedClsPrefix: d, focusable: c, handleKeyUp: u, handleKeyDown: h, handleClick: v } = this;
    return (e = this.onRender) === null || e === void 0 || e.call(this), m(
      "div",
      { ref: "selfRef", class: [
        `${d}-checkbox`,
        this.themeClass,
        this.rtlEnabled && `${d}-checkbox--rtl`,
        o && `${d}-checkbox--checked`,
        r && `${d}-checkbox--disabled`,
        n && `${d}-checkbox--indeterminate`,
        i && `${d}-checkbox--inside-table`
      ], tabindex: r || !c ? void 0 : 0, role: "checkbox", "aria-checked": n ? "mixed" : o, "aria-labelledby": l, style: a, onKeyup: u, onKeydown: h, onClick: v, onMousedown: () => {
        Ye("selectstart", window, (f) => {
          f.preventDefault();
        }, {
          once: !0
        });
      } },
      m(
        "div",
        { class: `${d}-checkbox-box-wrapper` },
        " ",
        m(
          "div",
          { class: `${d}-checkbox-box` },
          m(Dn, null, {
            default: () => this.indeterminate ? m("div", { key: "indeterminate", class: `${d}-checkbox-icon` }, Ty) : m("div", { key: "check", class: `${d}-checkbox-icon` }, Py)
          }),
          m("div", { class: `${d}-checkbox-box__border` })
        )
      ),
      s !== null || t.default ? m("span", { class: `${d}-checkbox__label`, id: l }, t.default ? t.default() : s) : null
    );
  }
}), Oy = {
  name: "Code",
  common: te,
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
}, lc = Oy, Ry = (e) => {
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
}, My = {
  name: "Collapse",
  common: te,
  self: Ry
}, Ey = My, _y = (e) => {
  const { cubicBezierEaseInOut: t } = e;
  return {
    bezier: t
  };
}, By = {
  name: "CollapseTransition",
  common: te,
  self: _y
}, Dy = By, Ay = {
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
    validator: () => (Tr("config-provider", "`as` is deprecated, please use `tag` instead."), !0),
    default: void 0
  }
}, Fy = ge({
  name: "ConfigProvider",
  alias: ["App"],
  props: Ay,
  setup(e) {
    const t = De(eo, null), o = E(() => {
      const { theme: f } = e;
      if (f === null)
        return;
      const b = t == null ? void 0 : t.mergedThemeRef.value;
      return f === void 0 ? b : b === void 0 ? f : Object.assign({}, b, f);
    }), r = E(() => {
      const { themeOverrides: f } = e;
      if (f !== null) {
        if (f === void 0)
          return t == null ? void 0 : t.mergedThemeOverridesRef.value;
        {
          const b = t == null ? void 0 : t.mergedThemeOverridesRef.value;
          return b === void 0 ? f : vr({}, b, f);
        }
      }
    }), n = Ze(() => {
      const { namespace: f } = e;
      return f === void 0 ? t == null ? void 0 : t.mergedNamespaceRef.value : f;
    }), i = Ze(() => {
      const { bordered: f } = e;
      return f === void 0 ? t == null ? void 0 : t.mergedBorderedRef.value : f;
    }), a = E(() => {
      const { icons: f } = e;
      return f === void 0 ? t == null ? void 0 : t.mergedIconsRef.value : f;
    }), l = E(() => {
      const { componentOptions: f } = e;
      return f !== void 0 ? f : t == null ? void 0 : t.mergedComponentPropsRef.value;
    }), s = E(() => {
      const { clsPrefix: f } = e;
      return f !== void 0 ? f : t == null ? void 0 : t.mergedClsPrefixRef.value;
    }), d = E(() => {
      var f;
      const { rtl: b } = e;
      if (b === void 0)
        return t == null ? void 0 : t.mergedRtlRef.value;
      const x = {};
      for (const p of b)
        x[p.name] = Wt(p), (f = p.peers) === null || f === void 0 || f.forEach((w) => {
          w.name in x || (x[w.name] = Wt(w));
        });
      return x;
    }), c = E(() => e.breakpoints || (t == null ? void 0 : t.mergedBreakpointsRef.value)), u = e.inlineThemeDisabled || (t == null ? void 0 : t.inlineThemeDisabled), h = e.preflightStyleDisabled || (t == null ? void 0 : t.preflightStyleDisabled), v = E(() => {
      const { value: f } = o, { value: b } = r, x = b && Object.keys(b).length !== 0, p = f == null ? void 0 : f.name;
      return p ? x ? `${p}-${kr(JSON.stringify(r.value))}` : p : x ? kr(JSON.stringify(r.value)) : "";
    });
    return Ot(eo, {
      mergedThemeHashRef: v,
      mergedBreakpointsRef: c,
      mergedRtlRef: d,
      mergedIconsRef: a,
      mergedComponentPropsRef: l,
      mergedBorderedRef: i,
      mergedNamespaceRef: n,
      mergedClsPrefixRef: s,
      mergedLocaleRef: E(() => {
        const { locale: f } = e;
        if (f !== null)
          return f === void 0 ? t == null ? void 0 : t.mergedLocaleRef.value : f;
      }),
      mergedDateLocaleRef: E(() => {
        const { dateLocale: f } = e;
        if (f !== null)
          return f === void 0 ? t == null ? void 0 : t.mergedDateLocaleRef.value : f;
      }),
      mergedHljsRef: E(() => {
        const { hljs: f } = e;
        return f === void 0 ? t == null ? void 0 : t.mergedHljsRef.value : f;
      }),
      mergedKatexRef: E(() => {
        const { katex: f } = e;
        return f === void 0 ? t == null ? void 0 : t.mergedKatexRef.value : f;
      }),
      mergedThemeRef: o,
      mergedThemeOverridesRef: r,
      inlineThemeDisabled: u || !1,
      preflightStyleDisabled: h || !1
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
    return this.abstract ? (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o) : m(this.as || this.tag, {
      class: `${this.mergedClsPrefix || zd}-config-provider`
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
  }
}), Hy = {
  name: "Popselect",
  common: te,
  peers: {
    Popover: Lo,
    InternalSelectMenu: Wr
  }
}, sc = Hy;
function dc(e) {
  const { boxShadow2: t } = e;
  return {
    menuBoxShadow: t
  };
}
const Ly = {
  name: "Select",
  common: vt,
  peers: {
    InternalSelection: Yd,
    InternalSelectMenu: Ld
  },
  self: dc
}, Wy = Ly, Ny = {
  name: "Select",
  common: te,
  peers: {
    InternalSelection: xa,
    InternalSelectMenu: Wr
  },
  self: dc
}, cc = Ny, jy = N([B("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), B("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [kn({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), Vy = Object.assign(Object.assign({}, Me.props), {
  to: Bt.propTo,
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
}), on = ge({
  name: "Select",
  props: Vy,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      e.items !== void 0 && kt("select", "`items` is deprecated, please use `options` instead."), e.onChange !== void 0 && kt("select", "`on-change` is deprecated, please use `on-update:value` instead.");
    });
    const { mergedClsPrefixRef: t, mergedBorderedRef: o, namespaceRef: r, inlineThemeDisabled: n } = Ct(e), i = Me("Select", "-select", jy, Wy, e, t), a = W(e.defaultValue), l = Te(e, "value"), s = fo(l, a), d = W(!1), c = W(""), u = E(() => {
      const { valueField: C, childrenField: H } = e, J = wC(C, H);
      return vx(M.value, J);
    }), h = E(() => $C(P.value, e.valueField, e.childrenField)), v = W(!1), f = fo(Te(e, "show"), v), b = W(null), x = W(null), p = W(null), { localeRef: w } = Bn("Select"), R = E(() => {
      var C;
      return (C = e.placeholder) !== null && C !== void 0 ? C : w.value.placeholder;
    }), y = Ms(e, ["items", "options"]), T = [], I = W([]), g = W([]), S = W(/* @__PURE__ */ new Map()), $ = E(() => {
      const { fallbackOption: C } = e;
      if (C === void 0) {
        const { labelField: H, valueField: J } = e;
        return (de) => ({
          [H]: String(de),
          [J]: de
        });
      }
      return C === !1 ? !1 : (H) => Object.assign(C(H), {
        value: H
      });
    }), P = E(() => g.value.concat(I.value).concat(y.value)), z = E(() => {
      const { filter: C } = e;
      if (C)
        return C;
      const { labelField: H, valueField: J } = e;
      return (de, ue) => {
        if (!ue)
          return !1;
        const me = ue[H];
        if (typeof me == "string")
          return ci(de, me);
        const Ce = ue[J];
        return typeof Ce == "string" ? ci(de, Ce) : typeof Ce == "number" ? ci(de, String(Ce)) : !1;
      };
    }), M = E(() => {
      if (e.remote)
        return y.value;
      {
        const { value: C } = P, { value: H } = c;
        return !H.length || !e.filterable ? C : SC(C, z.value, H, e.childrenField);
      }
    });
    function F(C) {
      const H = e.remote, { value: J } = S, { value: de } = h, { value: ue } = $, me = [];
      return C.forEach((Ce) => {
        if (de.has(Ce))
          me.push(de.get(Ce));
        else if (H && J.has(Ce))
          me.push(J.get(Ce));
        else if (ue) {
          const Pe = ue(Ce);
          Pe && me.push(Pe);
        }
      }), me;
    }
    const L = E(() => {
      if (e.multiple) {
        const { value: C } = s;
        return Array.isArray(C) ? F(C) : [];
      }
      return null;
    }), G = E(() => {
      const { value: C } = s;
      return !e.multiple && !Array.isArray(C) ? C === null ? null : F([C])[0] || null : null;
    }), K = _o(e), { mergedSizeRef: O, mergedDisabledRef: X, mergedStatusRef: _ } = K;
    function U(C, H) {
      const { onChange: J, "onUpdate:value": de, onUpdateValue: ue } = e, { nTriggerFormChange: me, nTriggerFormInput: Ce } = K;
      J && pe(J, C, H), ue && pe(ue, C, H), de && pe(de, C, H), a.value = C, me(), Ce();
    }
    function ce(C) {
      const { onBlur: H } = e, { nTriggerFormBlur: J } = K;
      H && pe(H, C), J();
    }
    function $e() {
      const { onClear: C } = e;
      C && pe(C);
    }
    function Oe(C) {
      const { onFocus: H, showOnFocus: J } = e, { nTriggerFormFocus: de } = K;
      H && pe(H, C), de(), J && ze();
    }
    function Be(C) {
      const { onSearch: H } = e;
      H && pe(H, C);
    }
    function ke(C) {
      const { onScroll: H } = e;
      H && pe(H, C);
    }
    function fe() {
      var C;
      const { remote: H, multiple: J } = e;
      if (H) {
        const { value: de } = S;
        if (J) {
          const { valueField: ue } = e;
          (C = L.value) === null || C === void 0 || C.forEach((me) => {
            de.set(me[ue], me);
          });
        } else {
          const ue = G.value;
          ue && de.set(ue[e.valueField], ue);
        }
      }
    }
    function xe(C) {
      const { onUpdateShow: H, "onUpdate:show": J } = e;
      H && pe(H, C), J && pe(J, C), v.value = C;
    }
    function ze() {
      X.value || (xe(!0), v.value = !0, e.filterable && Ne());
    }
    function le() {
      xe(!1);
    }
    function Ve() {
      c.value = "", g.value = T;
    }
    const He = W(!1);
    function Ue() {
      e.filterable && (He.value = !0);
    }
    function Ke() {
      e.filterable && (He.value = !1, f.value || Ve());
    }
    function Je() {
      X.value || (f.value ? e.filterable ? Ne() : le() : ze());
    }
    function st(C) {
      var H, J;
      !((J = (H = p.value) === null || H === void 0 ? void 0 : H.selfRef) === null || J === void 0) && J.contains(C.relatedTarget) || (d.value = !1, ce(C), le());
    }
    function gt(C) {
      Oe(C), d.value = !0;
    }
    function Z(C) {
      d.value = !0;
    }
    function se(C) {
      var H;
      !((H = b.value) === null || H === void 0) && H.$el.contains(C.relatedTarget) || (d.value = !1, ce(C), le());
    }
    function ye() {
      var C;
      (C = b.value) === null || C === void 0 || C.focus(), le();
    }
    function ae(C) {
      var H;
      f.value && (!((H = b.value) === null || H === void 0) && H.$el.contains($r(C)) || le());
    }
    function j(C) {
      if (!Array.isArray(C))
        return [];
      if ($.value)
        return Array.from(C);
      {
        const { remote: H } = e, { value: J } = h;
        if (H) {
          const { value: de } = S;
          return C.filter((ue) => J.has(ue) || de.has(ue));
        } else
          return C.filter((de) => J.has(de));
      }
    }
    function ee(C) {
      D(C.rawNode);
    }
    function D(C) {
      if (X.value)
        return;
      const { tag: H, remote: J, clearFilterAfterSelect: de, valueField: ue } = e;
      if (H && !J) {
        const { value: me } = g, Ce = me[0] || null;
        if (Ce) {
          const Pe = I.value;
          Pe.length ? Pe.push(Ce) : I.value = [Ce], g.value = T;
        }
      }
      if (J && S.value.set(C[ue], C), e.multiple) {
        const me = j(s.value), Ce = me.findIndex((Pe) => Pe === C[ue]);
        if (~Ce) {
          if (me.splice(Ce, 1), H && !J) {
            const Pe = q(C[ue]);
            ~Pe && (I.value.splice(Pe, 1), de && (c.value = ""));
          }
        } else
          me.push(C[ue]), de && (c.value = "");
        U(me, F(me));
      } else {
        if (H && !J) {
          const me = q(C[ue]);
          ~me ? I.value = [
            I.value[me]
          ] : I.value = T;
        }
        We(), le(), U(C[ue], C);
      }
    }
    function q(C) {
      return I.value.findIndex((J) => J[e.valueField] === C);
    }
    function oe(C) {
      f.value || ze();
      const { value: H } = C.target;
      c.value = H;
      const { tag: J, remote: de } = e;
      if (Be(H), J && !de) {
        if (!H) {
          g.value = T;
          return;
        }
        const { onCreate: ue } = e, me = ue ? ue(H) : { [e.labelField]: H, [e.valueField]: H }, { valueField: Ce } = e;
        y.value.some((Pe) => Pe[Ce] === me[Ce]) || I.value.some((Pe) => Pe[Ce] === me[Ce]) ? g.value = T : g.value = [me];
      }
    }
    function we(C) {
      C.stopPropagation();
      const { multiple: H } = e;
      !H && e.filterable && le(), $e(), H ? U([], []) : U(null, null);
    }
    function Ie(C) {
      !pn(C, "action") && !pn(C, "empty") && C.preventDefault();
    }
    function Le(C) {
      ke(C);
    }
    function rt(C) {
      var H, J, de, ue, me;
      switch (C.key) {
        case " ":
          if (e.filterable)
            break;
          C.preventDefault();
        case "Enter":
          if (!(!((H = b.value) === null || H === void 0) && H.isComposing)) {
            if (f.value) {
              const Ce = (J = p.value) === null || J === void 0 ? void 0 : J.getPendingTmNode();
              Ce ? ee(Ce) : e.filterable || (le(), We());
            } else if (ze(), e.tag && He.value) {
              const Ce = g.value[0];
              if (Ce) {
                const Pe = Ce[e.valueField], { value: nt } = s;
                e.multiple && Array.isArray(nt) && nt.some((Tt) => Tt === Pe) || D(Ce);
              }
            }
          }
          C.preventDefault();
          break;
        case "ArrowUp":
          if (C.preventDefault(), e.loading)
            return;
          f.value && ((de = p.value) === null || de === void 0 || de.prev());
          break;
        case "ArrowDown":
          if (C.preventDefault(), e.loading)
            return;
          f.value ? (ue = p.value) === null || ue === void 0 || ue.next() : ze();
          break;
        case "Escape":
          f.value && (Rf(C), le()), (me = b.value) === null || me === void 0 || me.focus();
          break;
      }
    }
    function We() {
      var C;
      (C = b.value) === null || C === void 0 || C.focus();
    }
    function Ne() {
      var C;
      (C = b.value) === null || C === void 0 || C.focusInput();
    }
    function ct() {
      var C;
      f.value && ((C = x.value) === null || C === void 0 || C.syncPosition());
    }
    fe(), Fe(Te(e, "options"), fe);
    const Rt = {
      focus: () => {
        var C;
        (C = b.value) === null || C === void 0 || C.focus();
      },
      blur: () => {
        var C;
        (C = b.value) === null || C === void 0 || C.blur();
      }
    }, dt = E(() => {
      const { self: { menuBoxShadow: C } } = i.value;
      return {
        "--n-menu-box-shadow": C
      };
    }), mt = n ? xt("select", void 0, dt, e) : void 0;
    return Object.assign(Object.assign({}, Rt), {
      mergedStatus: _,
      mergedClsPrefix: t,
      mergedBordered: o,
      namespace: r,
      treeMate: u,
      isMounted: Hr(),
      triggerRef: b,
      menuRef: p,
      pattern: c,
      uncontrolledShow: v,
      mergedShow: f,
      adjustedTo: Bt(e),
      uncontrolledValue: a,
      mergedValue: s,
      followerRef: x,
      localizedPlaceholder: R,
      selectedOption: G,
      selectedOptions: L,
      mergedSize: O,
      mergedDisabled: X,
      focused: d,
      activeWithoutMenuOpen: He,
      inlineThemeDisabled: n,
      onTriggerInputFocus: Ue,
      onTriggerInputBlur: Ke,
      handleTriggerOrMenuResize: ct,
      handleMenuFocus: Z,
      handleMenuBlur: se,
      handleMenuTabOut: ye,
      handleTriggerClick: Je,
      handleToggle: ee,
      handleDeleteOption: D,
      handlePatternInput: oe,
      handleClear: we,
      handleTriggerBlur: st,
      handleTriggerFocus: gt,
      handleKeydown: rt,
      handleMenuAfterLeave: Ve,
      handleMenuClickOutside: ae,
      handleMenuScroll: Le,
      handleMenuKeydown: rt,
      handleMenuMousedown: Ie,
      mergedTheme: i,
      cssVars: n ? void 0 : dt,
      themeClass: mt == null ? void 0 : mt.themeClass,
      onRender: mt == null ? void 0 : mt.onRender
    });
  },
  render() {
    return m(
      "div",
      { class: `${this.mergedClsPrefix}-select` },
      m(Zi, null, {
        default: () => [
          m(Ji, null, {
            default: () => m(hC, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
              arrow: () => {
                var e, t;
                return [(t = (e = this.$slots).arrow) === null || t === void 0 ? void 0 : t.call(e)];
              }
            })
          }),
          m(ea, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === Bt.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
            default: () => m(Qt, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
              default: () => {
                var e, t, o;
                return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Dr(m(Lx, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
                  `${this.mergedClsPrefix}-select-menu`,
                  this.themeClass,
                  (t = this.menuProps) === null || t === void 0 ? void 0 : t.class
                ], clsPrefix: this.mergedClsPrefix, focusable: !0, labelField: this.labelField, valueField: this.valueField, autoPending: !0, nodeProps: this.nodeProps, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, treeMate: this.treeMate, multiple: this.multiple, size: "medium", renderOption: this.renderOption, renderLabel: this.renderLabel, value: this.mergedValue, style: [(o = this.menuProps) === null || o === void 0 ? void 0 : o.style, this.cssVars], onToggle: this.handleToggle, onScroll: this.handleMenuScroll, onFocus: this.handleMenuFocus, onBlur: this.handleMenuBlur, onKeydown: this.handleMenuKeydown, onTabOut: this.handleMenuTabOut, onMousedown: this.handleMenuMousedown, show: this.mergedShow, showCheckmark: this.showCheckmark, resetMenuOnOptionsChange: this.resetMenuOnOptionsChange }), {
                  empty: () => {
                    var r, n;
                    return [(n = (r = this.$slots).empty) === null || n === void 0 ? void 0 : n.call(r)];
                  },
                  action: () => {
                    var r, n;
                    return [(n = (r = this.$slots).action) === null || n === void 0 ? void 0 : n.call(r)];
                  }
                }), this.displayDirective === "show" ? [
                  [os, this.mergedShow],
                  [
                    xn,
                    this.handleMenuClickOutside,
                    void 0,
                    { capture: !0 }
                  ]
                ] : [
                  [
                    xn,
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
}), Uy = {
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
}, qy = (e) => {
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
    fontSizeTiny: d,
    fontSizeSmall: c,
    fontSizeMedium: u,
    // item size
    heightTiny: h,
    heightSmall: v,
    heightMedium: f
  } = e;
  return Object.assign(Object.assign({}, Uy), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${l}`, buttonBorderHover: `1px solid ${l}`, buttonBorderPressed: `1px solid ${l}`, buttonIconColor: t, buttonIconColorHover: t, buttonIconColorPressed: t, itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: o, itemTextColorDisabled: a, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${o}`, itemBorderDisabled: `1px solid ${l}`, itemBorderRadius: s, itemSizeSmall: h, itemSizeMedium: v, itemSizeLarge: f, itemFontSizeSmall: d, itemFontSizeMedium: c, itemFontSizeLarge: u, jumperFontSizeSmall: d, jumperFontSizeMedium: c, jumperFontSizeLarge: u, jumperTextColor: t, jumperTextColorDisabled: a });
}, Gy = {
  name: "Pagination",
  common: te,
  peers: {
    Select: cc,
    Input: At,
    Popselect: sc
  },
  self(e) {
    const { primaryColor: t, opacity3: o } = e, r = Y(t, {
      alpha: Number(o)
    }), n = qy(e);
    return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
  }
}, uc = Gy, fc = {
  padding: "8px 14px"
}, Ky = {
  name: "Tooltip",
  common: te,
  peers: {
    Popover: Lo
  },
  self(e) {
    const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n } = e;
    return Object.assign(Object.assign({}, fc), { borderRadius: t, boxShadow: o, color: r, textColor: n });
  }
}, An = Ky, Yy = (e) => {
  const { borderRadius: t, boxShadow2: o, baseColor: r } = e;
  return Object.assign(Object.assign({}, fc), { borderRadius: t, boxShadow: o, color: he(r, "rgba(0, 0, 0, .85)"), textColor: r });
}, Xy = {
  name: "Tooltip",
  common: vt,
  peers: {
    Popover: ba
  },
  self: Yy
}, Zy = Xy, Jy = {
  name: "Ellipsis",
  common: te,
  peers: {
    Tooltip: An
  }
}, hc = Jy, Qy = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
}, e1 = {
  name: "Radio",
  common: te,
  self(e) {
    const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: a, opacityDisabled: l, borderRadius: s, fontSizeSmall: d, fontSizeMedium: c, fontSizeLarge: u, heightSmall: h, heightMedium: v, heightLarge: f, lineHeight: b } = e;
    return Object.assign(Object.assign({}, Qy), {
      labelLineHeight: b,
      buttonHeightSmall: h,
      buttonHeightMedium: v,
      buttonHeightLarge: f,
      fontSizeSmall: d,
      fontSizeMedium: c,
      fontSizeLarge: u,
      boxShadow: `inset 0 0 0 1px ${t}`,
      boxShadowActive: `inset 0 0 0 1px ${o}`,
      boxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${Y(o, { alpha: 0.3 })}`,
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
      buttonBoxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${Y(o, { alpha: 0.3 })}`,
      buttonBoxShadowHover: `inset 0 0 0 1px ${o}`,
      buttonBoxShadow: "inset 0 0 0 1px #0000",
      buttonBorderRadius: s
    });
  }
}, pc = e1, t1 = {
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
}, o1 = (e) => {
  const { primaryColor: t, textColor2: o, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: a, borderRadius: l, fontSizeSmall: s, fontSizeMedium: d, fontSizeLarge: c, fontSizeHuge: u, heightSmall: h, heightMedium: v, heightLarge: f, heightHuge: b, textColor3: x, opacityDisabled: p } = e;
  return Object.assign(Object.assign({}, t1), {
    optionHeightSmall: h,
    optionHeightMedium: v,
    optionHeightLarge: f,
    optionHeightHuge: b,
    borderRadius: l,
    fontSizeSmall: s,
    fontSizeMedium: d,
    fontSizeLarge: c,
    fontSizeHuge: u,
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
    optionColorActive: Y(t, { alpha: 0.1 }),
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
    optionOpacityDisabled: p
  });
}, r1 = {
  name: "Dropdown",
  common: te,
  peers: {
    Popover: Lo
  },
  self(e) {
    const { primaryColorSuppl: t, primaryColor: o, popoverColor: r } = e, n = o1(e);
    return n.colorInverted = r, n.optionColorActive = Y(o, { alpha: 0.15 }), n.optionColorActiveInverted = t, n.optionColorHoverInverted = t, n;
  }
}, Ca = r1, n1 = {
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
}, i1 = (e) => {
  const { cardColor: t, modalColor: o, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: a, tableColorHover: l, iconColor: s, primaryColor: d, fontWeightStrong: c, borderRadius: u, lineHeight: h, fontSizeSmall: v, fontSizeMedium: f, fontSizeLarge: b, dividerColor: x, heightSmall: p, opacityDisabled: w, tableColorStriped: R } = e;
  return Object.assign(Object.assign({}, n1), {
    actionDividerColor: x,
    lineHeight: h,
    borderRadius: u,
    fontSizeSmall: v,
    fontSizeMedium: f,
    fontSizeLarge: b,
    borderColor: he(t, x),
    tdColorHover: he(t, l),
    tdColorStriped: he(t, R),
    thColor: he(t, a),
    thColorHover: he(he(t, a), l),
    tdColor: t,
    tdTextColor: n,
    thTextColor: i,
    thFontWeight: c,
    thButtonColorHover: l,
    thIconColor: s,
    thIconColorActive: d,
    // modal
    borderColorModal: he(o, x),
    tdColorHoverModal: he(o, l),
    tdColorStripedModal: he(o, R),
    thColorModal: he(o, a),
    thColorHoverModal: he(he(o, a), l),
    tdColorModal: o,
    // popover
    borderColorPopover: he(r, x),
    tdColorHoverPopover: he(r, l),
    tdColorStripedPopover: he(r, R),
    thColorPopover: he(r, a),
    thColorHoverPopover: he(he(r, a), l),
    tdColorPopover: r,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: p,
    opacityLoading: w
  });
}, a1 = {
  name: "DataTable",
  common: te,
  peers: {
    Button: Pt,
    Checkbox: ir,
    Radio: pc,
    Pagination: uc,
    Scrollbar: $t,
    Empty: Ho,
    Popover: Lo,
    Ellipsis: hc,
    Dropdown: Ca
  },
  self(e) {
    const t = i1(e);
    return t.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", t.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", t;
  }
}, l1 = a1, s1 = Object.assign(Object.assign({}, jd), Me.props), d1 = ge({
  name: "Tooltip",
  props: s1,
  __popover__: !0,
  setup(e) {
    const t = Me("Tooltip", "-tooltip", void 0, Zy, e), o = W(null);
    return Object.assign(Object.assign({}, {
      syncPosition() {
        o.value.syncPosition();
      },
      setShow(n) {
        o.value.setShow(n);
      }
    }), { popoverRef: o, mergedTheme: t, popoverThemeOverrides: E(() => t.value.self) });
  },
  render() {
    const { mergedTheme: e, internalExtraClass: t } = this;
    return m(Vd, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: t.concat("tooltip"), ref: "popoverRef" }), this.$slots);
  }
}), c1 = (e) => {
  const { textColorBase: t, opacity1: o, opacity2: r, opacity3: n, opacity4: i, opacity5: a } = e;
  return {
    color: t,
    opacity1Depth: o,
    opacity2Depth: r,
    opacity3Depth: n,
    opacity4Depth: i,
    opacity5Depth: a
  };
}, u1 = {
  name: "Icon",
  common: te,
  self: c1
}, f1 = u1, h1 = {
  itemFontSize: "12px",
  itemHeight: "36px",
  itemWidth: "52px",
  panelActionPadding: "8px 0"
}, p1 = (e) => {
  const { popoverColor: t, textColor2: o, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: a, boxShadow2: l, borderRadius: s, iconColor: d, iconColorDisabled: c } = e;
  return Object.assign(Object.assign({}, h1), {
    panelColor: t,
    panelBoxShadow: l,
    panelDividerColor: i,
    itemTextColor: o,
    itemTextColorActive: r,
    itemColorHover: n,
    itemOpacityDisabled: a,
    itemBorderRadius: s,
    borderRadius: s,
    iconColor: d,
    iconColorDisabled: c
  });
}, v1 = {
  name: "TimePicker",
  common: te,
  peers: {
    Scrollbar: $t,
    Button: Pt,
    Input: At
  },
  self: p1
}, vc = v1, g1 = {
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
}, m1 = (e) => {
  const { hoverColor: t, fontSize: o, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: a, borderRadiusSmall: l, iconColor: s, iconColorDisabled: d, textColor1: c, dividerColor: u, boxShadow2: h, borderRadius: v, fontWeightStrong: f } = e;
  return Object.assign(Object.assign({}, g1), {
    itemFontSize: o,
    calendarDaysFontSize: o,
    calendarTitleFontSize: o,
    itemTextColor: r,
    itemTextColorDisabled: n,
    itemTextColorActive: i,
    itemTextColorCurrent: a,
    itemColorIncluded: Y(a, { alpha: 0.1 }),
    itemColorHover: t,
    itemColorDisabled: t,
    itemColorActive: a,
    itemBorderRadius: l,
    panelColor: i,
    panelTextColor: r,
    arrowColor: s,
    calendarTitleTextColor: c,
    calendarTitleColorHover: t,
    calendarDaysTextColor: r,
    panelHeaderDividerColor: u,
    calendarDaysDividerColor: u,
    calendarDividerColor: u,
    panelActionDividerColor: u,
    panelBoxShadow: h,
    panelBorderRadius: v,
    calendarTitleFontWeight: f,
    scrollItemBorderRadius: v,
    iconColor: s,
    iconColorDisabled: d
  });
}, b1 = {
  name: "DatePicker",
  common: te,
  peers: {
    Input: At,
    Button: Pt,
    TimePicker: vc,
    Scrollbar: $t
  },
  self(e) {
    const { popoverColor: t, hoverColor: o, primaryColor: r } = e, n = m1(e);
    return n.itemColorDisabled = he(t, o), n.itemColorIncluded = Y(r, { alpha: 0.15 }), n.itemColorHover = he(t, o), n;
  }
}, x1 = b1, C1 = {
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
}, y1 = (e) => {
  const { tableHeaderColor: t, textColor2: o, textColor1: r, cardColor: n, modalColor: i, popoverColor: a, dividerColor: l, borderRadius: s, fontWeightStrong: d, lineHeight: c, fontSizeSmall: u, fontSizeMedium: h, fontSizeLarge: v } = e;
  return Object.assign(Object.assign({}, C1), {
    lineHeight: c,
    fontSizeSmall: u,
    fontSizeMedium: h,
    fontSizeLarge: v,
    titleTextColor: r,
    thColor: he(n, t),
    thColorModal: he(i, t),
    thColorPopover: he(a, t),
    thTextColor: r,
    thFontWeight: d,
    tdTextColor: o,
    tdColor: n,
    tdColorModal: i,
    tdColorPopover: a,
    borderColor: he(n, l),
    borderColorModal: he(i, l),
    borderColorPopover: he(a, l),
    borderRadius: s
  });
}, w1 = {
  name: "Descriptions",
  common: te,
  self: y1
}, S1 = w1, $1 = {
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
}, P1 = (e) => {
  const { textColor1: t, textColor2: o, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, infoColor: d, successColor: c, warningColor: u, errorColor: h, primaryColor: v, dividerColor: f, borderRadius: b, fontWeightStrong: x, lineHeight: p, fontSize: w } = e;
  return Object.assign(Object.assign({}, $1), {
    fontSize: w,
    lineHeight: p,
    border: `1px solid ${f}`,
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
    iconColorInfo: d,
    iconColorSuccess: c,
    iconColorWarning: u,
    iconColorError: h,
    borderRadius: b,
    titleFontWeight: x
  });
}, T1 = {
  name: "Dialog",
  common: te,
  peers: {
    Button: Pt
  },
  self: P1
}, gc = T1, k1 = (e) => {
  const { modalColor: t, textColor2: o, boxShadow3: r } = e;
  return {
    color: t,
    textColor: o,
    boxShadow: r
  };
}, z1 = {
  name: "Modal",
  common: te,
  peers: {
    Scrollbar: $t,
    Dialog: gc,
    Card: nc
  },
  self: k1
}, I1 = z1, mc = (e) => {
  const { textColor1: t, dividerColor: o, fontWeightStrong: r } = e;
  return {
    textColor: t,
    color: o,
    fontWeight: r
  };
}, O1 = {
  name: "Divider",
  common: vt,
  self: mc
}, R1 = O1, M1 = {
  name: "Divider",
  common: te,
  self: mc
}, E1 = M1, _1 = B("divider", `
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`, [tt("vertical", `
 margin-top: 24px;
 margin-bottom: 24px;
 `, [tt("no-title", `
 display: flex;
 align-items: center;
 `)]), A("title", `
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `), Q("title-position-left", [A("line", [Q("left", {
  width: "28px"
})])]), Q("title-position-right", [A("line", [Q("right", {
  width: "28px"
})])]), Q("dashed", [A("line", `
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]), Q("vertical", `
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `), A("line", `
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `), tt("dashed", [A("line", {
  backgroundColor: "var(--n-color)"
})]), Q("dashed", [A("line", {
  borderColor: "var(--n-color)"
})]), Q("vertical", {
  backgroundColor: "var(--n-color)"
})]), B1 = Object.assign(Object.assign({}, Me.props), { titlePlacement: {
  type: String,
  default: "center"
}, dashed: Boolean, vertical: Boolean }), Go = ge({
  name: "Divider",
  props: B1,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = Ct(e), r = Me("Divider", "-divider", _1, R1, e, t), n = E(() => {
      const { common: { cubicBezierEaseInOut: a }, self: { color: l, textColor: s, fontWeight: d } } = r.value;
      return {
        "--n-bezier": a,
        "--n-color": l,
        "--n-text-color": s,
        "--n-font-weight": d
      };
    }), i = o ? xt("divider", void 0, n, e) : void 0;
    return {
      mergedClsPrefix: t,
      cssVars: o ? void 0 : n,
      themeClass: i == null ? void 0 : i.themeClass,
      onRender: i == null ? void 0 : i.onRender
    };
  },
  render() {
    var e;
    const { $slots: t, titlePlacement: o, vertical: r, dashed: n, cssVars: i, mergedClsPrefix: a } = this;
    return (e = this.onRender) === null || e === void 0 || e.call(this), m(
      "div",
      { role: "separator", class: [
        `${a}-divider`,
        this.themeClass,
        {
          [`${a}-divider--vertical`]: r,
          [`${a}-divider--no-title`]: !t.default,
          [`${a}-divider--dashed`]: n,
          [`${a}-divider--title-position-${o}`]: t.default && o
        }
      ], style: i },
      r ? null : m("div", { class: `${a}-divider__line ${a}-divider__line--left` }),
      !r && t.default ? m(
        oo,
        null,
        m("div", { class: `${a}-divider__title` }, this.$slots),
        m("div", { class: `${a}-divider__line ${a}-divider__line--right` })
      ) : null
    );
  }
}), D1 = (e) => {
  const { modalColor: t, textColor1: o, textColor2: r, boxShadow3: n, lineHeight: i, fontWeightStrong: a, dividerColor: l, closeColorHover: s, closeColorPressed: d, closeIconColor: c, closeIconColorHover: u, closeIconColorPressed: h, borderRadius: v, primaryColorHover: f } = e;
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
    closeIconColor: c,
    closeIconColorHover: u,
    closeIconColorPressed: h,
    closeSize: "22px",
    closeIconSize: "18px",
    closeColorHover: s,
    closeColorPressed: d,
    closeBorderRadius: v,
    resizableTriggerColorHover: f
  };
}, A1 = {
  name: "Drawer",
  common: te,
  peers: {
    Scrollbar: $t
  },
  self: D1
}, F1 = A1, H1 = {
  actionMargin: "0 0 0 20px",
  actionMarginRtl: "0 20px 0 0"
}, L1 = {
  name: "DynamicInput",
  common: te,
  peers: {
    Input: At,
    Button: Pt
  },
  self() {
    return H1;
  }
}, W1 = L1, bc = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
}, N1 = {
  name: "Space",
  self() {
    return bc;
  }
}, xc = N1, j1 = () => bc, V1 = {
  name: "Space",
  self: j1
}, U1 = V1;
let ui;
const q1 = () => {
  if (!Fr)
    return !0;
  if (ui === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), ui = t;
  }
  return ui;
}, G1 = Object.assign(Object.assign({}, Me.props), {
  align: String,
  justify: {
    type: String,
    default: "start"
  },
  inline: Boolean,
  vertical: Boolean,
  size: {
    type: [String, Number, Array],
    default: "medium"
  },
  wrapItem: {
    type: Boolean,
    default: !0
  },
  itemStyle: [String, Object],
  wrap: {
    type: Boolean,
    default: !0
  },
  // internal
  internalUseGap: {
    type: Boolean,
    default: void 0
  }
}), Fi = ge({
  name: "Space",
  props: G1,
  setup(e) {
    const { mergedClsPrefixRef: t, mergedRtlRef: o } = Ct(e), r = Me("Space", "-space", void 0, U1, e, t), n = Fo("Space", o, t);
    return {
      useGap: q1(),
      rtlEnabled: n,
      mergedClsPrefix: t,
      margin: E(() => {
        const { size: i } = e;
        if (Array.isArray(i))
          return {
            horizontal: i[0],
            vertical: i[1]
          };
        if (typeof i == "number")
          return {
            horizontal: i,
            vertical: i
          };
        const { self: { [re("gap", i)]: a } } = r.value, { row: l, col: s } = Gu(a);
        return {
          horizontal: Pr(s),
          vertical: Pr(l)
        };
      })
    };
  },
  render() {
    const { vertical: e, align: t, inline: o, justify: r, itemStyle: n, margin: i, wrap: a, mergedClsPrefix: l, rtlEnabled: s, useGap: d, wrapItem: c, internalUseGap: u } = this, h = gn(of(this));
    if (!h.length)
      return null;
    const v = `${i.horizontal}px`, f = `${i.horizontal / 2}px`, b = `${i.vertical}px`, x = `${i.vertical / 2}px`, p = h.length - 1, w = r.startsWith("space-");
    return m("div", { role: "none", class: [
      `${l}-space`,
      s && `${l}-space--rtl`
    ], style: {
      display: o ? "inline-flex" : "flex",
      flexDirection: e ? "column" : "row",
      justifyContent: ["start", "end"].includes(r) ? "flex-" + r : r,
      flexWrap: !a || e ? "nowrap" : "wrap",
      marginTop: d || e ? "" : `-${x}`,
      marginBottom: d || e ? "" : `-${x}`,
      alignItems: t,
      gap: d ? `${i.vertical}px ${i.horizontal}px` : ""
    } }, !c && (d || u) ? h : h.map((R, y) => m("div", { role: "none", style: [
      n,
      {
        maxWidth: "100%"
      },
      d ? "" : e ? {
        marginBottom: y !== p ? b : ""
      } : s ? {
        marginLeft: w ? r === "space-between" && y === p ? "" : f : y !== p ? v : "",
        marginRight: w ? r === "space-between" && y === 0 ? "" : f : "",
        paddingTop: x,
        paddingBottom: x
      } : {
        marginRight: w ? r === "space-between" && y === p ? "" : f : y !== p ? v : "",
        marginLeft: w ? r === "space-between" && y === 0 ? "" : f : "",
        paddingTop: x,
        paddingBottom: x
      }
    ] }, R)));
  }
}), K1 = {
  name: "DynamicTags",
  common: te,
  peers: {
    Input: At,
    Button: Pt,
    Tag: qd,
    Space: xc
  },
  self() {
    return {
      inputWidth: "64px"
    };
  }
}, Y1 = K1, X1 = {
  name: "Element",
  common: te
}, Z1 = X1, J1 = {
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
}, Cc = (e) => {
  const { heightSmall: t, heightMedium: o, heightLarge: r, textColor1: n, errorColor: i, warningColor: a, lineHeight: l, textColor3: s } = e;
  return Object.assign(Object.assign({}, J1), { blankHeightSmall: t, blankHeightMedium: o, blankHeightLarge: r, lineHeight: l, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: a, feedbackTextColor: s });
}, Q1 = {
  name: "Form",
  common: vt,
  self: Cc
}, ew = Q1, tw = {
  name: "Form",
  common: te,
  self: Cc
}, ow = tw, Fn = "n-form", rw = "n-form-item-insts";
function zo() {
  return zo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o)
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, zo.apply(this, arguments);
}
function nw(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, _r(e, t);
}
function Hi(e) {
  return Hi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, Hi(e);
}
function _r(e, t) {
  return _r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, _r(e, t);
}
function iw() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function un(e, t, o) {
  return iw() ? un = Reflect.construct.bind() : un = function(n, i, a) {
    var l = [null];
    l.push.apply(l, i);
    var s = Function.bind.apply(n, l), d = new s();
    return a && _r(d, a.prototype), d;
  }, un.apply(null, arguments);
}
function aw(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Li(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Li = function(r) {
    if (r === null || !aw(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, n);
    }
    function n() {
      return un(r, arguments, Hi(this).constructor);
    }
    return n.prototype = Object.create(r.prototype, {
      constructor: {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _r(n, r);
  }, Li(e);
}
var lw = /%[sdj%]/g, yc = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (yc = function(t, o) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && o.every(function(r) {
    return typeof r == "string";
  }) && console.warn(t, o);
});
function Wi(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(o) {
    var r = o.field;
    t[r] = t[r] || [], t[r].push(o);
  }), t;
}
function zt(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  var n = 0, i = o.length;
  if (typeof e == "function")
    return e.apply(null, o);
  if (typeof e == "string") {
    var a = e.replace(lw, function(l) {
      if (l === "%%")
        return "%";
      if (n >= i)
        return l;
      switch (l) {
        case "%s":
          return String(o[n++]);
        case "%d":
          return Number(o[n++]);
        case "%j":
          try {
            return JSON.stringify(o[n++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return l;
      }
    });
    return a;
  }
  return e;
}
function sw(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function at(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || sw(t) && typeof e == "string" && !e);
}
function dw(e, t, o) {
  var r = [], n = 0, i = e.length;
  function a(l) {
    r.push.apply(r, l || []), n++, n === i && o(r);
  }
  e.forEach(function(l) {
    t(l, a);
  });
}
function Dl(e, t, o) {
  var r = 0, n = e.length;
  function i(a) {
    if (a && a.length) {
      o(a);
      return;
    }
    var l = r;
    r = r + 1, l < n ? t(e[l], i) : o([]);
  }
  i([]);
}
function cw(e) {
  var t = [];
  return Object.keys(e).forEach(function(o) {
    t.push.apply(t, e[o] || []);
  }), t;
}
var Al = /* @__PURE__ */ function(e) {
  nw(t, e);
  function t(o, r) {
    var n;
    return n = e.call(this, "Async Validation Error") || this, n.errors = o, n.fields = r, n;
  }
  return t;
}(/* @__PURE__ */ Li(Error));
function uw(e, t, o, r, n) {
  if (t.first) {
    var i = new Promise(function(h, v) {
      var f = function(p) {
        return r(p), p.length ? v(new Al(p, Wi(p))) : h(n);
      }, b = cw(e);
      Dl(b, o, f);
    });
    return i.catch(function(h) {
      return h;
    }), i;
  }
  var a = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], l = Object.keys(e), s = l.length, d = 0, c = [], u = new Promise(function(h, v) {
    var f = function(x) {
      if (c.push.apply(c, x), d++, d === s)
        return r(c), c.length ? v(new Al(c, Wi(c))) : h(n);
    };
    l.length || (r(c), h(n)), l.forEach(function(b) {
      var x = e[b];
      a.indexOf(b) !== -1 ? Dl(x, o, f) : dw(x, o, f);
    });
  });
  return u.catch(function(h) {
    return h;
  }), u;
}
function fw(e) {
  return !!(e && e.message !== void 0);
}
function hw(e, t) {
  for (var o = e, r = 0; r < t.length; r++) {
    if (o == null)
      return o;
    o = o[t[r]];
  }
  return o;
}
function Fl(e, t) {
  return function(o) {
    var r;
    return e.fullFields ? r = hw(t, e.fullFields) : r = t[o.field || e.fullField], fw(o) ? (o.field = o.field || e.fullField, o.fieldValue = r, o) : {
      message: typeof o == "function" ? o() : o,
      fieldValue: r,
      field: o.field || e.fullField
    };
  };
}
function Hl(e, t) {
  if (t) {
    for (var o in t)
      if (t.hasOwnProperty(o)) {
        var r = t[o];
        typeof r == "object" && typeof e[o] == "object" ? e[o] = zo({}, e[o], r) : e[o] = r;
      }
  }
  return e;
}
var wc = function(t, o, r, n, i, a) {
  t.required && (!r.hasOwnProperty(t.field) || at(o, a || t.type)) && n.push(zt(i.messages.required, t.fullField));
}, pw = function(t, o, r, n, i) {
  (/^\s+$/.test(o) || o === "") && n.push(zt(i.messages.whitespace, t.fullField));
}, rn, vw = function() {
  if (rn)
    return rn;
  var e = "[a-fA-F\\d:]", t = function(y) {
    return y && y.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
  }, o = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", r = "[a-fA-F\\d]{1,4}", n = (`
(?:
(?:` + r + ":){7}(?:" + r + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + r + ":){6}(?:" + o + "|:" + r + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + r + ":){5}(?::" + o + "|(?::" + r + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + r + ":){4}(?:(?::" + r + "){0,1}:" + o + "|(?::" + r + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + r + ":){3}(?:(?::" + r + "){0,2}:" + o + "|(?::" + r + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + r + ":){2}(?:(?::" + r + "){0,3}:" + o + "|(?::" + r + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + r + ":){1}(?:(?::" + r + "){0,4}:" + o + "|(?::" + r + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + r + "){0,5}:" + o + "|(?::" + r + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + o + "$)|(?:^" + n + "$)"), a = new RegExp("^" + o + "$"), l = new RegExp("^" + n + "$"), s = function(y) {
    return y && y.exact ? i : new RegExp("(?:" + t(y) + o + t(y) + ")|(?:" + t(y) + n + t(y) + ")", "g");
  };
  s.v4 = function(R) {
    return R && R.exact ? a : new RegExp("" + t(R) + o + t(R), "g");
  }, s.v6 = function(R) {
    return R && R.exact ? l : new RegExp("" + t(R) + n + t(R), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", u = s.v4().source, h = s.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", b = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", x = "(?::\\d{2,5})?", p = '(?:[/?#][^\\s"]*)?', w = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + u + "|" + h + "|" + v + f + b + ")" + x + p;
  return rn = new RegExp("(?:^" + w + "$)", "i"), rn;
}, Ll = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, gr = {
  integer: function(t) {
    return gr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return gr.number(t) && !gr.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(t);
    } catch {
      return !1;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? !1 : typeof t == "number";
  },
  object: function(t) {
    return typeof t == "object" && !gr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Ll.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(vw());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Ll.hex);
  }
}, gw = function(t, o, r, n, i) {
  if (t.required && o === void 0) {
    wc(t, o, r, n, i);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = t.type;
  a.indexOf(l) > -1 ? gr[l](o) || n.push(zt(i.messages.types[l], t.fullField, t.type)) : l && typeof o !== t.type && n.push(zt(i.messages.types[l], t.fullField, t.type));
}, mw = function(t, o, r, n, i) {
  var a = typeof t.len == "number", l = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = o, u = null, h = typeof o == "number", v = typeof o == "string", f = Array.isArray(o);
  if (h ? u = "number" : v ? u = "string" : f && (u = "array"), !u)
    return !1;
  f && (c = o.length), v && (c = o.replace(d, "_").length), a ? c !== t.len && n.push(zt(i.messages[u].len, t.fullField, t.len)) : l && !s && c < t.min ? n.push(zt(i.messages[u].min, t.fullField, t.min)) : s && !l && c > t.max ? n.push(zt(i.messages[u].max, t.fullField, t.max)) : l && s && (c < t.min || c > t.max) && n.push(zt(i.messages[u].range, t.fullField, t.min, t.max));
}, qo = "enum", bw = function(t, o, r, n, i) {
  t[qo] = Array.isArray(t[qo]) ? t[qo] : [], t[qo].indexOf(o) === -1 && n.push(zt(i.messages[qo], t.fullField, t[qo].join(", ")));
}, xw = function(t, o, r, n, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(o) || n.push(zt(i.messages.pattern.mismatch, t.fullField, o, t.pattern));
    else if (typeof t.pattern == "string") {
      var a = new RegExp(t.pattern);
      a.test(o) || n.push(zt(i.messages.pattern.mismatch, t.fullField, o, t.pattern));
    }
  }
}, Re = {
  required: wc,
  whitespace: pw,
  type: gw,
  range: mw,
  enum: bw,
  pattern: xw
}, Cw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o, "string") && !t.required)
      return r();
    Re.required(t, o, n, a, i, "string"), at(o, "string") || (Re.type(t, o, n, a, i), Re.range(t, o, n, a, i), Re.pattern(t, o, n, a, i), t.whitespace === !0 && Re.whitespace(t, o, n, a, i));
  }
  r(a);
}, yw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), o !== void 0 && Re.type(t, o, n, a, i);
  }
  r(a);
}, ww = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (o === "" && (o = void 0), at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), o !== void 0 && (Re.type(t, o, n, a, i), Re.range(t, o, n, a, i));
  }
  r(a);
}, Sw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), o !== void 0 && Re.type(t, o, n, a, i);
  }
  r(a);
}, $w = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), at(o) || Re.type(t, o, n, a, i);
  }
  r(a);
}, Pw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), o !== void 0 && (Re.type(t, o, n, a, i), Re.range(t, o, n, a, i));
  }
  r(a);
}, Tw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), o !== void 0 && (Re.type(t, o, n, a, i), Re.range(t, o, n, a, i));
  }
  r(a);
}, kw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (o == null && !t.required)
      return r();
    Re.required(t, o, n, a, i, "array"), o != null && (Re.type(t, o, n, a, i), Re.range(t, o, n, a, i));
  }
  r(a);
}, zw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), o !== void 0 && Re.type(t, o, n, a, i);
  }
  r(a);
}, Iw = "enum", Ow = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i), o !== void 0 && Re[Iw](t, o, n, a, i);
  }
  r(a);
}, Rw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o, "string") && !t.required)
      return r();
    Re.required(t, o, n, a, i), at(o, "string") || Re.pattern(t, o, n, a, i);
  }
  r(a);
}, Mw = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o, "date") && !t.required)
      return r();
    if (Re.required(t, o, n, a, i), !at(o, "date")) {
      var s;
      o instanceof Date ? s = o : s = new Date(o), Re.type(t, s, n, a, i), s && Re.range(t, s.getTime(), n, a, i);
    }
  }
  r(a);
}, Ew = function(t, o, r, n, i) {
  var a = [], l = Array.isArray(o) ? "array" : typeof o;
  Re.required(t, o, n, a, i, l), r(a);
}, fi = function(t, o, r, n, i) {
  var a = t.type, l = [], s = t.required || !t.required && n.hasOwnProperty(t.field);
  if (s) {
    if (at(o, a) && !t.required)
      return r();
    Re.required(t, o, n, l, i, a), at(o, a) || Re.type(t, o, n, l, i);
  }
  r(l);
}, _w = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (at(o) && !t.required)
      return r();
    Re.required(t, o, n, a, i);
  }
  r(a);
}, wr = {
  string: Cw,
  method: yw,
  number: ww,
  boolean: Sw,
  regexp: $w,
  integer: Pw,
  float: Tw,
  array: kw,
  object: zw,
  enum: Ow,
  pattern: Rw,
  date: Mw,
  url: fi,
  hex: fi,
  email: fi,
  required: Ew,
  any: _w
};
function Ni() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var ji = Ni(), Nr = /* @__PURE__ */ function() {
  function e(o) {
    this.rules = null, this._messages = ji, this.define(o);
  }
  var t = e.prototype;
  return t.define = function(r) {
    var n = this;
    if (!r)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(i) {
      var a = r[i];
      n.rules[i] = Array.isArray(a) ? a : [a];
    });
  }, t.messages = function(r) {
    return r && (this._messages = Hl(Ni(), r)), this._messages;
  }, t.validate = function(r, n, i) {
    var a = this;
    n === void 0 && (n = {}), i === void 0 && (i = function() {
    });
    var l = r, s = n, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, l), Promise.resolve(l);
    function c(b) {
      var x = [], p = {};
      function w(y) {
        if (Array.isArray(y)) {
          var T;
          x = (T = x).concat.apply(T, y);
        } else
          x.push(y);
      }
      for (var R = 0; R < b.length; R++)
        w(b[R]);
      x.length ? (p = Wi(x), d(x, p)) : d(null, l);
    }
    if (s.messages) {
      var u = this.messages();
      u === ji && (u = Ni()), Hl(u, s.messages), s.messages = u;
    } else
      s.messages = this.messages();
    var h = {}, v = s.keys || Object.keys(this.rules);
    v.forEach(function(b) {
      var x = a.rules[b], p = l[b];
      x.forEach(function(w) {
        var R = w;
        typeof R.transform == "function" && (l === r && (l = zo({}, l)), p = l[b] = R.transform(p)), typeof R == "function" ? R = {
          validator: R
        } : R = zo({}, R), R.validator = a.getValidationMethod(R), R.validator && (R.field = b, R.fullField = R.fullField || b, R.type = a.getType(R), h[b] = h[b] || [], h[b].push({
          rule: R,
          value: p,
          source: l,
          field: b
        }));
      });
    });
    var f = {};
    return uw(h, s, function(b, x) {
      var p = b.rule, w = (p.type === "object" || p.type === "array") && (typeof p.fields == "object" || typeof p.defaultField == "object");
      w = w && (p.required || !p.required && b.value), p.field = b.field;
      function R(I, g) {
        return zo({}, g, {
          fullField: p.fullField + "." + I,
          fullFields: p.fullFields ? [].concat(p.fullFields, [I]) : [I]
        });
      }
      function y(I) {
        I === void 0 && (I = []);
        var g = Array.isArray(I) ? I : [I];
        !s.suppressWarning && g.length && e.warning("async-validator:", g), g.length && p.message !== void 0 && (g = [].concat(p.message));
        var S = g.map(Fl(p, l));
        if (s.first && S.length)
          return f[p.field] = 1, x(S);
        if (!w)
          x(S);
        else {
          if (p.required && !b.value)
            return p.message !== void 0 ? S = [].concat(p.message).map(Fl(p, l)) : s.error && (S = [s.error(p, zt(s.messages.required, p.field))]), x(S);
          var $ = {};
          p.defaultField && Object.keys(b.value).map(function(M) {
            $[M] = p.defaultField;
          }), $ = zo({}, $, b.rule.fields);
          var P = {};
          Object.keys($).forEach(function(M) {
            var F = $[M], L = Array.isArray(F) ? F : [F];
            P[M] = L.map(R.bind(null, M));
          });
          var z = new e(P);
          z.messages(s.messages), b.rule.options && (b.rule.options.messages = s.messages, b.rule.options.error = s.error), z.validate(b.value, b.rule.options || s, function(M) {
            var F = [];
            S && S.length && F.push.apply(F, S), M && M.length && F.push.apply(F, M), x(F.length ? F : null);
          });
        }
      }
      var T;
      if (p.asyncValidator)
        T = p.asyncValidator(p, b.value, y, b.source, s);
      else if (p.validator) {
        try {
          T = p.validator(p, b.value, y, b.source, s);
        } catch (I) {
          console.error == null || console.error(I), s.suppressValidatorError || setTimeout(function() {
            throw I;
          }, 0), y(I.message);
        }
        T === !0 ? y() : T === !1 ? y(typeof p.message == "function" ? p.message(p.fullField || p.field) : p.message || (p.fullField || p.field) + " fails") : T instanceof Array ? y(T) : T instanceof Error && y(T.message);
      }
      T && T.then && T.then(function() {
        return y();
      }, function(I) {
        return y(I);
      });
    }, function(b) {
      c(b);
    }, l);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !wr.hasOwnProperty(r.type))
      throw new Error(zt("Unknown rule type %s", r.type));
    return r.type || "string";
  }, t.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var n = Object.keys(r), i = n.indexOf("message");
    return i !== -1 && n.splice(i, 1), n.length === 1 && n[0] === "required" ? wr.required : wr[this.getType(r)] || void 0;
  }, e;
}();
Nr.register = function(t, o) {
  if (typeof o != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  wr[t] = o;
};
Nr.warning = yc;
Nr.messages = ji;
Nr.validators = wr;
function Bw(e) {
  const t = De(Fn, null);
  return {
    mergedSize: E(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function Dw(e) {
  const t = De(Fn, null), o = E(() => {
    const { labelPlacement: v } = e;
    return v !== void 0 ? v : t != null && t.props.labelPlacement ? t.props.labelPlacement : "top";
  }), r = E(() => o.value === "left" && (e.labelWidth === "auto" || (t == null ? void 0 : t.props.labelWidth) === "auto")), n = E(() => {
    if (o.value === "top")
      return;
    const { labelWidth: v } = e;
    if (v !== void 0 && v !== "auto")
      return Jo(v);
    if (r.value) {
      const f = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return f !== void 0 ? Jo(f) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return Jo(t.props.labelWidth);
  }), i = E(() => {
    const { labelAlign: v } = e;
    if (v)
      return v;
    if (t != null && t.props.labelAlign)
      return t.props.labelAlign;
  }), a = E(() => {
    var v;
    return [
      (v = e.labelProps) === null || v === void 0 ? void 0 : v.style,
      e.labelStyle,
      {
        width: n.value
      }
    ];
  }), l = E(() => {
    const { showRequireMark: v } = e;
    return v !== void 0 ? v : t == null ? void 0 : t.props.showRequireMark;
  }), s = E(() => {
    const { requireMarkPlacement: v } = e;
    return v !== void 0 ? v : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = W(!1), c = E(() => {
    const { validationStatus: v } = e;
    if (v !== void 0)
      return v;
    if (d.value)
      return "error";
  }), u = E(() => {
    const { showFeedback: v } = e;
    return v !== void 0 ? v : (t == null ? void 0 : t.props.showFeedback) !== void 0 ? t.props.showFeedback : !0;
  }), h = E(() => {
    const { showLabel: v } = e;
    return v !== void 0 ? v : (t == null ? void 0 : t.props.showLabel) !== void 0 ? t.props.showLabel : !0;
  });
  return {
    validationErrored: d,
    mergedLabelStyle: a,
    mergedLabelPlacement: o,
    mergedLabelAlign: i,
    mergedShowRequireMark: l,
    mergedRequireMarkPlacement: s,
    mergedValidationStatus: c,
    mergedShowFeedback: u,
    mergedShowLabel: h,
    isAutoLabelWidth: r
  };
}
function Aw(e) {
  const t = De(Fn, null), o = E(() => {
    const { rulePath: a } = e;
    if (a !== void 0)
      return a;
    const { path: l } = e;
    if (l !== void 0)
      return l;
  }), r = E(() => {
    const a = [], { rule: l } = e;
    if (l !== void 0 && (Array.isArray(l) ? a.push(...l) : a.push(l)), t) {
      const { rules: s } = t.props, { value: d } = o;
      if (s !== void 0 && d !== void 0) {
        const c = ha(s, d);
        c !== void 0 && (Array.isArray(c) ? a.push(...c) : a.push(c));
      }
    }
    return a;
  }), n = E(() => r.value.some((a) => a.required)), i = E(() => n.value || e.required);
  return {
    mergedRules: r,
    mergedRequired: i
  };
}
const {
  cubicBezierEaseInOut: Wl
} = go;
function Fw({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: o = ".3s",
  leaveDuration: r = ".3s",
  enterCubicBezier: n = Wl,
  leaveCubicBezier: i = Wl
} = {}) {
  return [N(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${t})`
  }), N(`&.${e}-transition-enter-to, &.${e}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), N(`&.${e}-transition-leave-active`, {
    transition: `opacity ${r} ${i}, transform ${r} ${i}`
  }), N(`&.${e}-transition-enter-active`, {
    transition: `opacity ${o} ${n}, transform ${o} ${n}`
  })];
}
const Hw = B("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [B("form-item-label", `
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 font-weight: var(--n-label-font-weight);
 `, [A("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), A("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), B("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), Q("auto-label-width", [B("form-item-label", "white-space: nowrap;")]), Q("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: start;
 `, [B("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [Q("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), Q("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), Q("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), Q("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), A("text", `
 grid-area: text; 
 `), A("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), Q("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [Q("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), B("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), B("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), B("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [N("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), B("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [Q("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), Q("error", {
  color: "var(--n-feedback-text-color-error)"
}), Fw({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]);
var Nl = globalThis && globalThis.__awaiter || function(e, t, o, r) {
  function n(i) {
    return i instanceof o ? i : new o(function(a) {
      a(i);
    });
  }
  return new (o || (o = Promise))(function(i, a) {
    function l(c) {
      try {
        d(r.next(c));
      } catch (u) {
        a(u);
      }
    }
    function s(c) {
      try {
        d(r.throw(c));
      } catch (u) {
        a(u);
      }
    }
    function d(c) {
      c.done ? i(c.value) : n(c.value).then(l, s);
    }
    d((r = r.apply(e, t || [])).next());
  });
};
const Lw = Object.assign(Object.assign({}, Me.props), { label: String, labelWidth: [Number, String], labelStyle: [String, Object], labelAlign: String, labelPlacement: String, path: String, first: Boolean, rulePath: String, required: Boolean, showRequireMark: {
  type: Boolean,
  default: void 0
}, requireMarkPlacement: String, showFeedback: {
  type: Boolean,
  default: void 0
}, rule: [Object, Array], size: String, ignorePathChange: Boolean, validationStatus: String, feedback: String, showLabel: {
  type: Boolean,
  default: void 0
}, labelProps: Object });
function jl(e, t) {
  return (...o) => {
    try {
      const r = e(...o);
      return !t && (typeof r == "boolean" || r instanceof Error || Array.isArray(r)) || // Error[]
      r != null && r.then ? r : (r === void 0 || Tr("form-item/validate", `You return a ${typeof r} typed value in the validator method, which is not recommended. Please use ` + (t ? "`Promise`" : "`boolean`, `Error` or `Promise`") + " typed value instead."), !0);
    } catch (r) {
      Tr("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(r);
      return;
    }
  };
}
const _t = ge({
  name: "FormItem",
  props: Lw,
  setup(e) {
    Mf(rw, "formItems", Te(e, "path"));
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = Ct(e), r = De(Fn, null), n = Bw(e), i = Dw(e), { validationErrored: a } = i, { mergedRequired: l, mergedRules: s } = Aw(e), { mergedSize: d } = n, { mergedLabelPlacement: c, mergedLabelAlign: u, mergedRequireMarkPlacement: h } = i, v = W([]), f = W(vn()), b = r ? Te(r.props, "disabled") : W(!1), x = Me("Form", "-form-item", Hw, ew, e, t);
    Fe(Te(e, "path"), () => {
      e.ignorePathChange || p();
    });
    function p() {
      v.value = [], a.value = !1, e.feedback && (f.value = vn());
    }
    function w() {
      g("blur");
    }
    function R() {
      g("change");
    }
    function y() {
      g("focus");
    }
    function T() {
      g("input");
    }
    function I(F, L) {
      return Nl(this, void 0, void 0, function* () {
        let G, K, O, X;
        return typeof F == "string" ? (G = F, K = L) : F !== null && typeof F == "object" && (G = F.trigger, K = F.callback, O = F.shouldRuleBeApplied, X = F.options), yield new Promise((_, U) => {
          g(G, O, X).then(({ valid: ce, errors: $e }) => {
            ce ? (K && K(), _()) : (K && K($e), U($e));
          });
        });
      });
    }
    const g = (F = null, L = () => !0, G = {
      suppressWarning: !0
    }) => Nl(this, void 0, void 0, function* () {
      const { path: K } = e;
      G ? G.first || (G.first = e.first) : G = {};
      const { value: O } = s, X = r ? ha(r.props.model, K || "") : void 0, _ = {}, U = {}, ce = (F ? O.filter((ke) => Array.isArray(ke.trigger) ? ke.trigger.includes(F) : ke.trigger === F) : O).filter(L).map((ke, fe) => {
        const xe = Object.assign({}, ke);
        if (xe.validator && (xe.validator = jl(xe.validator, !1)), xe.asyncValidator && (xe.asyncValidator = jl(xe.asyncValidator, !0)), xe.renderMessage) {
          const ze = `__renderMessage__${fe}`;
          U[ze] = xe.message, xe.message = ze, _[ze] = xe.renderMessage;
        }
        return xe;
      });
      if (!ce.length)
        return {
          valid: !0
        };
      const $e = K ?? "__n_no_path__", Oe = new Nr({ [$e]: ce }), { validateMessages: Be } = (r == null ? void 0 : r.props) || {};
      return Be && Oe.messages(Be), yield new Promise((ke) => {
        Oe.validate({ [$e]: X }, G, (fe) => {
          fe != null && fe.length ? (v.value = fe.map((xe) => {
            const ze = (xe == null ? void 0 : xe.message) || "";
            return {
              key: ze,
              render: () => ze.startsWith("__renderMessage__") ? _[ze]() : ze
            };
          }), fe.forEach((xe) => {
            var ze;
            !((ze = xe.message) === null || ze === void 0) && ze.startsWith("__renderMessage__") && (xe.message = U[xe.message]);
          }), a.value = !0, ke({
            valid: !1,
            errors: fe
          })) : (p(), ke({
            valid: !0
          }));
        });
      });
    });
    Ot(ki, {
      path: Te(e, "path"),
      disabled: b,
      mergedSize: n.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: p,
      handleContentBlur: w,
      handleContentChange: R,
      handleContentFocus: y,
      handleContentInput: T
    });
    const S = {
      validate: I,
      restoreValidation: p,
      internalValidate: g
    }, $ = W(null);
    St(() => {
      if (!i.isAutoLabelWidth.value)
        return;
      const F = $.value;
      if (F !== null) {
        const L = F.style.whiteSpace;
        F.style.whiteSpace = "nowrap", F.style.width = "", r == null || r.deriveMaxChildLabelWidth(Number(getComputedStyle(F).width.slice(0, -2))), F.style.whiteSpace = L;
      }
    });
    const P = E(() => {
      var F;
      const { value: L } = d, { value: G } = c, K = G === "top" ? "vertical" : "horizontal", { common: { cubicBezierEaseInOut: O }, self: { labelTextColor: X, asteriskColor: _, lineHeight: U, feedbackTextColor: ce, feedbackTextColorWarning: $e, feedbackTextColorError: Oe, feedbackPadding: Be, labelFontWeight: ke, [re("labelHeight", L)]: fe, [re("blankHeight", L)]: xe, [re("feedbackFontSize", L)]: ze, [re("feedbackHeight", L)]: le, [re("labelPadding", K)]: Ve, [re("labelTextAlign", K)]: He, [re(re("labelFontSize", G), L)]: Ue } } = x.value;
      let Ke = (F = u.value) !== null && F !== void 0 ? F : He;
      return G === "top" && (Ke = Ke === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": O,
        "--n-line-height": U,
        "--n-blank-height": xe,
        "--n-label-font-size": Ue,
        "--n-label-text-align": Ke,
        "--n-label-height": fe,
        "--n-label-padding": Ve,
        "--n-label-font-weight": ke,
        "--n-asterisk-color": _,
        "--n-label-text-color": X,
        "--n-feedback-padding": Be,
        "--n-feedback-font-size": ze,
        "--n-feedback-height": le,
        "--n-feedback-text-color": ce,
        "--n-feedback-text-color-warning": $e,
        "--n-feedback-text-color-error": Oe
      };
    }), z = o ? xt("form-item", E(() => {
      var F;
      return `${d.value[0]}${c.value[0]}${((F = u.value) === null || F === void 0 ? void 0 : F[0]) || ""}`;
    }), P, e) : void 0, M = E(() => c.value === "left" && h.value === "left" && u.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({ labelElementRef: $, mergedClsPrefix: t, mergedRequired: l, feedbackId: f, renderExplains: v, reverseColSpace: M }, i), n), S), { cssVars: o ? void 0 : P, themeClass: z == null ? void 0 : z.themeClass, onRender: z == null ? void 0 : z.onRender });
  },
  render() {
    const { $slots: e, mergedClsPrefix: t, mergedShowLabel: o, mergedShowRequireMark: r, mergedRequireMarkPlacement: n, onRender: i } = this, a = r !== void 0 ? r : this.mergedRequired;
    i == null || i();
    const l = () => {
      const s = this.$slots.label ? this.$slots.label() : this.label;
      if (!s)
        return null;
      const d = m("span", { class: `${t}-form-item-label__text` }, s), c = a ? m("span", { class: `${t}-form-item-label__asterisk` }, n !== "left" ? " *" : "* ") : n === "right-hanging" && m("span", { class: `${t}-form-item-label__asterisk-placeholder` }, " *"), { labelProps: u } = this;
      return m("label", Object.assign({}, u, { class: [
        u == null ? void 0 : u.class,
        `${t}-form-item-label`,
        `${t}-form-item-label--${n}-mark`,
        this.reverseColSpace && `${t}-form-item-label--reverse-columns-space`
      ], style: this.mergedLabelStyle, ref: "labelElementRef" }), n === "left" ? [c, d] : [d, c]);
    };
    return m(
      "div",
      { class: [
        `${t}-form-item`,
        this.themeClass,
        `${t}-form-item--${this.mergedSize}-size`,
        `${t}-form-item--${this.mergedLabelPlacement}-labelled`,
        this.isAutoLabelWidth && `${t}-form-item--auto-label-width`,
        !o && `${t}-form-item--no-label`
      ], style: this.cssVars },
      o && l(),
      m("div", { class: [
        `${t}-form-item-blank`,
        this.mergedValidationStatus && `${t}-form-item-blank--${this.mergedValidationStatus}`
      ] }, e),
      this.mergedShowFeedback ? m(
        "div",
        { key: this.feedbackId, class: `${t}-form-item-feedback-wrapper` },
        m(Qt, { name: "fade-down-transition", mode: "out-in" }, {
          default: () => {
            const { mergedValidationStatus: s } = this;
            return bt(e.feedback, (d) => {
              var c;
              const { feedback: u } = this, h = d || u ? m("div", { key: "__feedback__", class: `${t}-form-item-feedback__line` }, d || u) : this.renderExplains.length ? (c = this.renderExplains) === null || c === void 0 ? void 0 : c.map(({ key: v, render: f }) => m("div", { key: v, class: `${t}-form-item-feedback__line` }, f())) : null;
              return h ? s === "warning" ? m("div", { key: "controlled-warning", class: `${t}-form-item-feedback ${t}-form-item-feedback--warning` }, h) : s === "error" ? m("div", { key: "controlled-error", class: `${t}-form-item-feedback ${t}-form-item-feedback--error` }, h) : s === "success" ? m("div", { key: "controlled-success", class: `${t}-form-item-feedback ${t}-form-item-feedback--success` }, h) : m("div", { key: "controlled-default", class: `${t}-form-item-feedback` }, h) : null;
            });
          }
        })
      ) : null
    );
  }
}), Ww = {
  name: "GradientText",
  common: te,
  self(e) {
    const { primaryColor: t, successColor: o, warningColor: r, errorColor: n, infoColor: i, primaryColorSuppl: a, successColorSuppl: l, warningColorSuppl: s, errorColorSuppl: d, infoColorSuppl: c, fontWeightStrong: u } = e;
    return {
      fontWeight: u,
      rotate: "252deg",
      colorStartPrimary: t,
      colorEndPrimary: a,
      colorStartInfo: i,
      colorEndInfo: c,
      colorStartWarning: r,
      colorEndWarning: s,
      colorStartError: n,
      colorEndError: d,
      colorStartSuccess: o,
      colorEndSuccess: l
    };
  }
}, Nw = Ww, jw = (e) => {
  const { primaryColor: t, baseColor: o } = e;
  return {
    color: t,
    iconColor: o
  };
}, Vw = {
  name: "IconWrapper",
  common: te,
  self: jw
}, Uw = Vw, qw = {
  closeMargin: "16px 12px",
  closeSize: "20px",
  closeIconSize: "16px",
  width: "365px",
  padding: "16px",
  titleFontSize: "16px",
  metaFontSize: "12px",
  descriptionFontSize: "12px"
}, Gw = (e) => {
  const { textColor2: t, successColor: o, infoColor: r, warningColor: n, errorColor: i, popoverColor: a, closeIconColor: l, closeIconColorHover: s, closeIconColorPressed: d, closeColorHover: c, closeColorPressed: u, textColor1: h, textColor3: v, borderRadius: f, fontWeightStrong: b, boxShadow2: x, lineHeight: p, fontSize: w } = e;
  return Object.assign(Object.assign({}, qw), {
    borderRadius: f,
    lineHeight: p,
    fontSize: w,
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
    closeIconColorPressed: d,
    closeBorderRadius: f,
    closeColorHover: c,
    closeColorPressed: u,
    headerTextColor: h,
    descriptionTextColor: v,
    actionTextColor: t,
    boxShadow: x
  });
}, Kw = {
  name: "Notification",
  common: te,
  peers: {
    Scrollbar: $t
  },
  self: Gw
}, Yw = Kw, Xw = {
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
}, Zw = (e) => {
  const { textColor2: t, closeIconColor: o, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: a, errorColor: l, warningColor: s, popoverColor: d, boxShadow2: c, primaryColor: u, lineHeight: h, borderRadius: v, closeColorHover: f, closeColorPressed: b } = e;
  return Object.assign(Object.assign({}, Xw), {
    closeBorderRadius: v,
    textColor: t,
    textColorInfo: t,
    textColorSuccess: t,
    textColorError: t,
    textColorWarning: t,
    textColorLoading: t,
    color: d,
    colorInfo: d,
    colorSuccess: d,
    colorError: d,
    colorWarning: d,
    colorLoading: d,
    boxShadow: c,
    boxShadowInfo: c,
    boxShadowSuccess: c,
    boxShadowError: c,
    boxShadowWarning: c,
    boxShadowLoading: c,
    iconColor: t,
    iconColorInfo: i,
    iconColorSuccess: a,
    iconColorWarning: s,
    iconColorError: l,
    iconColorLoading: u,
    closeColorHover: f,
    closeColorPressed: b,
    closeIconColor: o,
    closeIconColorHover: r,
    closeIconColorPressed: n,
    closeColorHoverInfo: f,
    closeColorPressedInfo: b,
    closeIconColorInfo: o,
    closeIconColorHoverInfo: r,
    closeIconColorPressedInfo: n,
    closeColorHoverSuccess: f,
    closeColorPressedSuccess: b,
    closeIconColorSuccess: o,
    closeIconColorHoverSuccess: r,
    closeIconColorPressedSuccess: n,
    closeColorHoverError: f,
    closeColorPressedError: b,
    closeIconColorError: o,
    closeIconColorHoverError: r,
    closeIconColorPressedError: n,
    closeColorHoverWarning: f,
    closeColorPressedWarning: b,
    closeIconColorWarning: o,
    closeIconColorHoverWarning: r,
    closeIconColorPressedWarning: n,
    closeColorHoverLoading: f,
    closeColorPressedLoading: b,
    closeIconColorLoading: o,
    closeIconColorHoverLoading: r,
    closeIconColorPressedLoading: n,
    loadingColor: u,
    lineHeight: h,
    borderRadius: v
  });
}, Jw = {
  name: "Message",
  common: te,
  self: Zw
}, Qw = Jw, eS = {
  name: "ButtonGroup",
  common: te
}, tS = eS, oS = {
  name: "InputNumber",
  common: te,
  peers: {
    Button: Pt,
    Input: At
  },
  self(e) {
    const { textColorDisabled: t } = e;
    return {
      iconColorDisabled: t
    };
  }
}, rS = oS, nS = (e) => {
  const { textColorDisabled: t } = e;
  return {
    iconColorDisabled: t
  };
}, iS = {
  name: "InputNumber",
  common: vt,
  peers: {
    Button: rc,
    Input: Qd
  },
  self: nS
}, aS = iS, lS = {
  name: "Layout",
  common: te,
  peers: {
    Scrollbar: $t
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
      siderToggleBarColor: he(o, a),
      siderToggleBarColorHover: he(o, l),
      __invertScrollbar: "false"
    };
  }
}, sS = lS, dS = (e) => {
  const { textColor2: t, cardColor: o, modalColor: r, popoverColor: n, dividerColor: i, borderRadius: a, fontSize: l, hoverColor: s } = e;
  return {
    textColor: t,
    color: o,
    colorHover: s,
    colorModal: r,
    colorHoverModal: he(r, s),
    colorPopover: n,
    colorHoverPopover: he(n, s),
    borderColor: i,
    borderColorModal: he(r, i),
    borderColorPopover: he(n, i),
    borderRadius: a,
    fontSize: l
  };
}, cS = {
  name: "List",
  common: te,
  self: dS
}, uS = cS, fS = {
  name: "LoadingBar",
  common: te,
  self(e) {
    const { primaryColor: t } = e;
    return {
      colorError: "red",
      colorLoading: t,
      height: "2px"
    };
  }
}, hS = fS, pS = {
  name: "Log",
  common: te,
  peers: {
    Scrollbar: $t,
    Code: lc
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
}, vS = pS, gS = {
  name: "Mention",
  common: te,
  peers: {
    InternalSelectMenu: Wr,
    Input: At
  },
  self(e) {
    const { boxShadow2: t } = e;
    return {
      menuBoxShadow: t
    };
  }
}, mS = gS;
function bS(e, t, o, r) {
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
const xS = (e) => {
  const { borderRadius: t, textColor3: o, primaryColor: r, textColor2: n, textColor1: i, fontSize: a, dividerColor: l, hoverColor: s, primaryColorHover: d } = e;
  return Object.assign({
    borderRadius: t,
    color: "#0000",
    groupTextColor: o,
    itemColorHover: s,
    itemColorActive: Y(r, { alpha: 0.1 }),
    itemColorActiveHover: Y(r, { alpha: 0.1 }),
    itemColorActiveCollapsed: Y(r, { alpha: 0.1 }),
    itemTextColor: n,
    itemTextColorHover: n,
    itemTextColorActive: r,
    itemTextColorActiveHover: r,
    itemTextColorChildActive: r,
    itemTextColorChildActiveHover: r,
    itemTextColorHorizontal: n,
    itemTextColorHoverHorizontal: d,
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
    itemIconColorHoverHorizontal: d,
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
  }, bS("#BBB", r, "#FFF", "#AAA"));
}, CS = {
  name: "Menu",
  common: te,
  peers: {
    Tooltip: An,
    Dropdown: Ca
  },
  self(e) {
    const { primaryColor: t, primaryColorSuppl: o } = e, r = xS(e);
    return r.itemColorActive = Y(t, { alpha: 0.15 }), r.itemColorActiveHover = Y(t, { alpha: 0.15 }), r.itemColorActiveCollapsed = Y(t, {
      alpha: 0.15
    }), r.itemColorActiveInverted = o, r.itemColorActiveHoverInverted = o, r.itemColorActiveCollapsedInverted = o, r;
  }
}, yS = CS, wS = {
  titleFontSize: "18px",
  backSize: "22px"
};
function SS(e) {
  const { textColor1: t, textColor2: o, textColor3: r, fontSize: n, fontWeightStrong: i, primaryColorHover: a, primaryColorPressed: l } = e;
  return Object.assign(Object.assign({}, wS), { titleFontWeight: i, fontSize: n, titleTextColor: t, backColor: o, backColorHover: a, backColorPressed: l, subtitleTextColor: r });
}
const $S = {
  name: "PageHeader",
  common: te,
  self: SS
}, PS = {
  iconSize: "22px"
}, TS = (e) => {
  const { fontSize: t, warningColor: o } = e;
  return Object.assign(Object.assign({}, PS), { fontSize: t, iconColor: o });
}, kS = {
  name: "Popconfirm",
  common: te,
  peers: {
    Button: Pt,
    Popover: Lo
  },
  self: TS
}, zS = kS, IS = (e) => {
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
}, OS = {
  name: "Progress",
  common: te,
  self(e) {
    const t = IS(e);
    return t.textColorLineInner = "rgb(0, 0, 0)", t.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", t;
  }
}, Sc = OS, RS = {
  name: "Rate",
  common: te,
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
}, MS = RS, ES = {
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
}, _S = (e) => {
  const { textColor2: t, textColor1: o, errorColor: r, successColor: n, infoColor: i, warningColor: a, lineHeight: l, fontWeightStrong: s } = e;
  return Object.assign(Object.assign({}, ES), { lineHeight: l, titleFontWeight: s, titleTextColor: o, textColor: t, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: a });
}, BS = {
  name: "Result",
  common: te,
  self: _S
}, DS = BS, $c = {
  railHeight: "4px",
  railWidthVertical: "4px",
  handleSize: "18px",
  dotHeight: "8px",
  dotWidth: "8px",
  dotBorderRadius: "4px"
}, AS = {
  name: "Slider",
  common: te,
  self(e) {
    const t = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: o, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: a, cardColor: l, borderRadius: s, fontSize: d, opacityDisabled: c } = e;
    return Object.assign(Object.assign({}, $c), { fontSize: d, markFontSize: d, railColor: o, railColorHover: o, fillColor: n, fillColorHover: n, opacityDisabled: c, handleColor: "#FFF", dotColor: l, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: t, indicatorTextColor: a, indicatorBorderRadius: s, dotBorder: `2px solid ${o}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
  }
}, FS = AS, HS = (e) => {
  const t = "rgba(0, 0, 0, .85)", o = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: r, primaryColor: n, baseColor: i, cardColor: a, modalColor: l, popoverColor: s, borderRadius: d, fontSize: c, opacityDisabled: u } = e;
  return Object.assign(Object.assign({}, $c), { fontSize: c, markFontSize: c, railColor: r, railColorHover: r, fillColor: n, fillColorHover: n, opacityDisabled: u, handleColor: "#FFF", dotColor: a, dotColorModal: l, dotColorPopover: s, handleBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowHover: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowActive: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowFocus: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", indicatorColor: t, indicatorBoxShadow: o, indicatorTextColor: i, indicatorBorderRadius: d, dotBorder: `2px solid ${r}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
}, LS = {
  name: "Slider",
  common: vt,
  self: HS
}, WS = LS, NS = (e) => {
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
}, jS = {
  name: "Spin",
  common: te,
  self: NS
}, VS = jS, US = (e) => {
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
}, qS = {
  name: "Statistic",
  common: te,
  self: US
}, GS = qS, KS = {
  stepHeaderFontSizeSmall: "14px",
  stepHeaderFontSizeMedium: "16px",
  indicatorIndexFontSizeSmall: "14px",
  indicatorIndexFontSizeMedium: "16px",
  indicatorSizeSmall: "22px",
  indicatorSizeMedium: "28px",
  indicatorIconSizeSmall: "14px",
  indicatorIconSizeMedium: "18px"
}, YS = (e) => {
  const { fontWeightStrong: t, baseColor: o, textColorDisabled: r, primaryColor: n, errorColor: i, textColor1: a, textColor2: l } = e;
  return Object.assign(Object.assign({}, KS), { stepHeaderFontWeight: t, indicatorTextColorProcess: o, indicatorTextColorWait: r, indicatorTextColorFinish: n, indicatorTextColorError: i, indicatorBorderColorProcess: n, indicatorBorderColorWait: r, indicatorBorderColorFinish: n, indicatorBorderColorError: i, indicatorColorProcess: n, indicatorColorWait: "#0000", indicatorColorFinish: "#0000", indicatorColorError: "#0000", splitorColorProcess: r, splitorColorWait: r, splitorColorFinish: n, splitorColorError: r, headerTextColorProcess: a, headerTextColorWait: r, headerTextColorFinish: r, headerTextColorError: i, descriptionTextColorProcess: l, descriptionTextColorWait: r, descriptionTextColorFinish: r, descriptionTextColorError: i });
}, XS = {
  name: "Steps",
  common: te,
  self: YS
}, ZS = XS, JS = {
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
}, QS = {
  name: "Switch",
  common: te,
  self(e) {
    const { primaryColorSuppl: t, opacityDisabled: o, borderRadius: r, primaryColor: n, textColor2: i, baseColor: a } = e, l = "rgba(255, 255, 255, .20)";
    return Object.assign(Object.assign({}, JS), { iconColor: a, textColor: i, loadingColor: t, opacityDisabled: o, railColor: l, railColorActive: t, buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", buttonColor: "#FFF", railBorderRadiusSmall: r, railBorderRadiusMedium: r, railBorderRadiusLarge: r, buttonBorderRadiusSmall: r, buttonBorderRadiusMedium: r, buttonBorderRadiusLarge: r, boxShadowFocus: `0 0 8px 0 ${Y(n, { alpha: 0.3 })}` });
  }
}, e2 = QS, t2 = {
  thPaddingSmall: "6px",
  thPaddingMedium: "12px",
  thPaddingLarge: "12px",
  tdPaddingSmall: "6px",
  tdPaddingMedium: "12px",
  tdPaddingLarge: "12px"
}, o2 = (e) => {
  const { dividerColor: t, cardColor: o, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: a, textColor1: l, textColor2: s, borderRadius: d, fontWeightStrong: c, lineHeight: u, fontSizeSmall: h, fontSizeMedium: v, fontSizeLarge: f } = e;
  return Object.assign(Object.assign({}, t2), {
    fontSizeSmall: h,
    fontSizeMedium: v,
    fontSizeLarge: f,
    lineHeight: u,
    borderRadius: d,
    borderColor: he(o, t),
    borderColorModal: he(r, t),
    borderColorPopover: he(n, t),
    tdColor: o,
    tdColorModal: r,
    tdColorPopover: n,
    tdColorStriped: he(o, a),
    tdColorStripedModal: he(r, a),
    tdColorStripedPopover: he(n, a),
    thColor: he(o, i),
    thColorModal: he(r, i),
    thColorPopover: he(n, i),
    thTextColor: l,
    tdTextColor: s,
    thFontWeight: c
  });
}, r2 = {
  name: "Table",
  common: te,
  self: o2
}, n2 = r2, i2 = {
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
}, a2 = (e) => {
  const { textColor2: t, primaryColor: o, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, tabColor: d, baseColor: c, dividerColor: u, fontWeight: h, textColor1: v, borderRadius: f, fontSize: b, fontWeightStrong: x } = e;
  return Object.assign(Object.assign({}, i2), {
    colorSegment: d,
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
    closeBorderRadius: f,
    tabColor: d,
    tabColorSegment: c,
    tabBorderColor: u,
    tabFontWeightActive: h,
    tabFontWeight: h,
    tabBorderRadius: f,
    paneTextColor: t,
    fontWeightStrong: x
  });
}, l2 = {
  name: "Tabs",
  common: te,
  self(e) {
    const t = a2(e), { inputColor: o } = e;
    return t.colorSegment = o, t.tabColorSegment = o, t;
  }
}, s2 = l2, d2 = (e) => {
  const { textColor1: t, textColor2: o, fontWeightStrong: r, fontSize: n } = e;
  return {
    fontSize: n,
    titleTextColor: t,
    textColor: o,
    titleFontWeight: r
  };
}, c2 = {
  name: "Thing",
  common: te,
  self: d2
}, u2 = c2, f2 = {
  titleMarginMedium: "0 0 6px 0",
  titleMarginLarge: "-2px 0 6px 0",
  titleFontSizeMedium: "14px",
  titleFontSizeLarge: "16px",
  iconSizeMedium: "14px",
  iconSizeLarge: "14px"
}, h2 = {
  name: "Timeline",
  common: te,
  self(e) {
    const { textColor3: t, infoColorSuppl: o, errorColorSuppl: r, successColorSuppl: n, warningColorSuppl: i, textColor1: a, textColor2: l, railColor: s, fontWeightStrong: d, fontSize: c } = e;
    return Object.assign(Object.assign({}, f2), { contentFontSize: c, titleFontWeight: d, circleBorder: `2px solid ${t}`, circleBorderInfo: `2px solid ${o}`, circleBorderError: `2px solid ${r}`, circleBorderSuccess: `2px solid ${n}`, circleBorderWarning: `2px solid ${i}`, iconColor: t, iconColorInfo: o, iconColorError: r, iconColorSuccess: n, iconColorWarning: i, titleTextColor: a, contentTextColor: l, metaTextColor: t, lineColor: s });
  }
}, p2 = h2, v2 = {
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
}, g2 = {
  name: "Transfer",
  common: te,
  peers: {
    Checkbox: ir,
    Scrollbar: $t,
    Input: At,
    Empty: Ho,
    Button: Pt
  },
  self(e) {
    const { fontWeight: t, fontSizeLarge: o, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: a, borderRadius: l, inputColor: s, tableHeaderColor: d, textColor1: c, textColorDisabled: u, textColor2: h, textColor3: v, hoverColor: f, closeColorHover: b, closeColorPressed: x, closeIconColor: p, closeIconColorHover: w, closeIconColorPressed: R, dividerColor: y } = e;
    return Object.assign(Object.assign({}, v2), {
      itemHeightSmall: a,
      itemHeightMedium: a,
      itemHeightLarge: i,
      fontSizeSmall: n,
      fontSizeMedium: r,
      fontSizeLarge: o,
      borderRadius: l,
      dividerColor: y,
      borderColor: "#0000",
      listColor: s,
      headerColor: d,
      titleTextColor: c,
      titleTextColorDisabled: u,
      extraTextColor: v,
      extraTextColorDisabled: u,
      itemTextColor: h,
      itemTextColorDisabled: u,
      itemColorPending: f,
      titleFontWeight: t,
      closeColorHover: b,
      closeColorPressed: x,
      closeIconColor: p,
      closeIconColorHover: w,
      closeIconColorPressed: R
    });
  }
}, m2 = g2, b2 = (e) => {
  const { borderRadiusSmall: t, hoverColor: o, pressedColor: r, primaryColor: n, textColor3: i, textColor2: a, textColorDisabled: l, fontSize: s } = e;
  return {
    fontSize: s,
    nodeBorderRadius: t,
    nodeColorHover: o,
    nodeColorPressed: r,
    nodeColorActive: Y(n, { alpha: 0.1 }),
    arrowColor: i,
    nodeTextColor: a,
    nodeTextColorDisabled: l,
    loadingColor: n,
    dropMarkColor: n
  };
}, x2 = {
  name: "Tree",
  common: te,
  peers: {
    Checkbox: ir,
    Scrollbar: $t,
    Empty: Ho
  },
  self(e) {
    const { primaryColor: t } = e, o = b2(e);
    return o.nodeColorActive = Y(t, { alpha: 0.15 }), o;
  }
}, Pc = x2, C2 = {
  name: "TreeSelect",
  common: te,
  peers: {
    Tree: Pc,
    Empty: Ho,
    InternalSelection: xa
  }
}, y2 = C2, w2 = {
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
}, Tc = (e) => {
  const { primaryColor: t, textColor2: o, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: a, dividerColor: l, fontWeightStrong: s, textColor1: d, textColor3: c, infoColor: u, warningColor: h, errorColor: v, successColor: f, codeColor: b } = e;
  return Object.assign(Object.assign({}, w2), { aTextColor: t, blockquoteTextColor: o, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: a, liTextColor: o, liLineHeight: n, liFontSize: i, hrColor: l, headerFontWeight: s, headerTextColor: d, pTextColor: o, pTextColor1Depth: d, pTextColor2Depth: o, pTextColor3Depth: c, pLineHeight: n, pFontSize: i, headerBarColor: t, headerBarColorPrimary: t, headerBarColorInfo: u, headerBarColorError: v, headerBarColorWarning: h, headerBarColorSuccess: f, textColor: o, textColor1Depth: d, textColor2Depth: o, textColor3Depth: c, textColorPrimary: t, textColorInfo: u, textColorSuccess: f, textColorWarning: h, textColorError: v, codeTextColor: o, codeColor: b, codeBorder: "1px solid #0000" });
}, S2 = {
  name: "Typography",
  common: vt,
  self: Tc
}, $2 = S2, P2 = {
  name: "Typography",
  common: te,
  self: Tc
}, T2 = P2, k2 = (e) => {
  const { iconColor: t, primaryColor: o, errorColor: r, textColor2: n, successColor: i, opacityDisabled: a, actionColor: l, borderColor: s, hoverColor: d, lineHeight: c, borderRadius: u, fontSize: h } = e;
  return {
    fontSize: h,
    lineHeight: c,
    borderRadius: u,
    draggerColor: l,
    draggerBorder: `1px dashed ${s}`,
    draggerBorderHover: `1px dashed ${o}`,
    itemColorHover: d,
    itemColorHoverError: Y(r, {
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
}, z2 = {
  name: "Upload",
  common: te,
  peers: {
    Button: Pt,
    Progress: Sc
  },
  self(e) {
    const { errorColor: t } = e, o = k2(e);
    return o.itemColorHoverError = Y(t, {
      alpha: 0.09
    }), o;
  }
}, I2 = z2, O2 = {
  name: "Watermark",
  common: te,
  self(e) {
    const { fontFamily: t } = e;
    return {
      fontFamily: t
    };
  }
}, R2 = O2, M2 = {
  name: "Row",
  common: te
}, E2 = M2, _2 = {
  name: "Image",
  common: te,
  peers: {
    Tooltip: An
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
};
function B2(e) {
  return e == null || typeof e == "string" && e.trim() === "" ? null : Number(e);
}
function D2(e) {
  return e.includes(".") && (/^(-)?\d+.*(\.|0)$/.test(e) || /^\.\d+$/.test(e));
}
function hi(e) {
  return e == null ? !0 : !Number.isNaN(e);
}
function Vl(e, t) {
  return e == null ? "" : t === void 0 ? String(e) : e.toFixed(t);
}
function pi(e) {
  if (e === null)
    return null;
  if (typeof e == "number")
    return e;
  {
    const t = Number(e);
    return Number.isNaN(t) ? null : t;
  }
}
const A2 = N([B("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), B("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]), Ul = 800, ql = 100, F2 = Object.assign(Object.assign({}, Me.props), {
  autofocus: Boolean,
  loading: {
    type: Boolean,
    default: void 0
  },
  placeholder: String,
  defaultValue: {
    type: Number,
    default: null
  },
  value: Number,
  step: {
    type: [Number, String],
    default: 1
  },
  min: [Number, String],
  max: [Number, String],
  size: String,
  disabled: {
    type: Boolean,
    default: void 0
  },
  validator: Function,
  bordered: {
    type: Boolean,
    default: void 0
  },
  showButton: {
    type: Boolean,
    default: !0
  },
  buttonPlacement: {
    type: String,
    default: "right"
  },
  readonly: Boolean,
  clearable: Boolean,
  keyboard: {
    type: Object,
    default: {}
  },
  updateValueOnInput: {
    type: Boolean,
    default: !0
  },
  parse: Function,
  format: Function,
  precision: Number,
  status: String,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClear: [Function, Array],
  // deprecated
  onChange: [Function, Array]
}), Lt = ge({
  name: "InputNumber",
  props: F2,
  setup(e) {
    process.env.NODE_ENV !== "production" && pt(() => {
      e.onChange !== void 0 && kt("input-number", "`on-change` is deprecated, please use `on-update:value` instead");
    });
    const { mergedBorderedRef: t, mergedClsPrefixRef: o, mergedRtlRef: r } = Ct(e), n = Me("InputNumber", "-input-number", A2, aS, e, o), { localeRef: i } = Bn("InputNumber"), a = _o(e), { mergedSizeRef: l, mergedDisabledRef: s, mergedStatusRef: d } = a, c = W(null), u = W(null), h = W(null), v = W(e.defaultValue), f = Te(e, "value"), b = fo(f, v), x = W(""), p = (Z) => {
      const se = String(Z).split(".")[1];
      return se ? se.length : 0;
    }, w = (Z) => {
      const se = [e.min, e.max, e.step, Z].map((ye) => ye === void 0 ? 0 : p(ye));
      return Math.max(...se);
    }, R = Ze(() => {
      const { placeholder: Z } = e;
      return Z !== void 0 ? Z : i.value.placeholder;
    }), y = Ze(() => {
      const Z = pi(e.step);
      return Z !== null ? Z === 0 ? 1 : Math.abs(Z) : 1;
    }), T = Ze(() => {
      const Z = pi(e.min);
      return Z !== null ? Z : null;
    }), I = Ze(() => {
      const Z = pi(e.max);
      return Z !== null ? Z : null;
    }), g = (Z) => {
      const { value: se } = b;
      if (Z === se) {
        $();
        return;
      }
      const { "onUpdate:value": ye, onUpdateValue: ae, onChange: j } = e, { nTriggerFormInput: ee, nTriggerFormChange: D } = a;
      j && pe(j, Z), ae && pe(ae, Z), ye && pe(ye, Z), v.value = Z, ee(), D();
    }, S = ({ offset: Z, doUpdateIfValid: se, fixPrecision: ye, isInputing: ae }) => {
      const { value: j } = x;
      if (ae && D2(j))
        return !1;
      const ee = (e.parse || B2)(j);
      if (ee === null)
        return se && g(null), null;
      if (hi(ee)) {
        const D = p(ee), { precision: q } = e;
        if (q !== void 0 && q < D && !ye)
          return !1;
        let oe = parseFloat((ee + Z).toFixed(q ?? w(ee)));
        if (hi(oe)) {
          const { value: we } = I, { value: Ie } = T;
          if (we !== null && oe > we) {
            if (!se || ae)
              return !1;
            oe = we;
          }
          if (Ie !== null && oe < Ie) {
            if (!se || ae)
              return !1;
            oe = Ie;
          }
          return e.validator && !e.validator(oe) ? !1 : (se && g(oe), oe);
        }
      }
      return !1;
    }, $ = () => {
      const { value: Z } = b;
      if (hi(Z)) {
        const { format: se, precision: ye } = e;
        se ? x.value = se(Z) : Z === null || ye === void 0 || // precision overflow
        p(Z) > ye ? x.value = Vl(Z, void 0) : x.value = Vl(Z, ye);
      } else
        x.value = String(Z);
    };
    $();
    const P = Ze(() => S({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), z = Ze(() => {
      const { value: Z } = b;
      if (e.validator && Z === null)
        return !1;
      const { value: se } = y;
      return S({
        offset: -se,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    }), M = Ze(() => {
      const { value: Z } = b;
      if (e.validator && Z === null)
        return !1;
      const { value: se } = y;
      return S({
        offset: +se,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    });
    function F(Z) {
      const { onFocus: se } = e, { nTriggerFormFocus: ye } = a;
      se && pe(se, Z), ye();
    }
    function L(Z) {
      var se, ye;
      if (Z.target === ((se = c.value) === null || se === void 0 ? void 0 : se.wrapperElRef))
        return;
      const ae = S({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (ae !== !1) {
        const D = (ye = c.value) === null || ye === void 0 ? void 0 : ye.inputElRef;
        D && (D.value = String(ae || "")), b.value === ae && $();
      } else
        $();
      const { onBlur: j } = e, { nTriggerFormBlur: ee } = a;
      j && pe(j, Z), ee(), It(() => {
        $();
      });
    }
    function G(Z) {
      const { onClear: se } = e;
      se && pe(se, Z);
    }
    function K() {
      const { value: Z } = M;
      if (!Z) {
        xe();
        return;
      }
      const { value: se } = b;
      if (se === null)
        e.validator || g(U());
      else {
        const { value: ye } = y;
        S({
          offset: ye,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    function O() {
      const { value: Z } = z;
      if (!Z) {
        fe();
        return;
      }
      const { value: se } = b;
      if (se === null)
        e.validator || g(U());
      else {
        const { value: ye } = y;
        S({
          offset: -ye,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    const X = F, _ = L;
    function U() {
      if (e.validator)
        return null;
      const { value: Z } = T, { value: se } = I;
      return Z !== null ? Math.max(0, Z) : se !== null ? Math.min(0, se) : 0;
    }
    function ce(Z) {
      G(Z), g(null);
    }
    function $e(Z) {
      var se, ye, ae;
      !((se = h.value) === null || se === void 0) && se.$el.contains(Z.target) && Z.preventDefault(), !((ye = u.value) === null || ye === void 0) && ye.$el.contains(Z.target) && Z.preventDefault(), (ae = c.value) === null || ae === void 0 || ae.activate();
    }
    let Oe = null, Be = null, ke = null;
    function fe() {
      ke && (window.clearTimeout(ke), ke = null), Oe && (window.clearInterval(Oe), Oe = null);
    }
    function xe() {
      le && (window.clearTimeout(le), le = null), Be && (window.clearInterval(Be), Be = null);
    }
    function ze() {
      fe(), ke = window.setTimeout(() => {
        Oe = window.setInterval(() => {
          O();
        }, ql);
      }, Ul), Ye("mouseup", document, fe, {
        once: !0
      });
    }
    let le = null;
    function Ve() {
      xe(), le = window.setTimeout(() => {
        Be = window.setInterval(() => {
          K();
        }, ql);
      }, Ul), Ye("mouseup", document, xe, {
        once: !0
      });
    }
    const He = () => {
      Be || K();
    }, Ue = () => {
      Oe || O();
    };
    function Ke(Z) {
      var se, ye;
      if (Z.key === "Enter") {
        if (Z.target === ((se = c.value) === null || se === void 0 ? void 0 : se.wrapperElRef))
          return;
        S({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && ((ye = c.value) === null || ye === void 0 || ye.deactivate());
      } else if (Z.key === "ArrowUp") {
        if (!M.value || e.keyboard.ArrowUp === !1)
          return;
        Z.preventDefault(), S({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && K();
      } else if (Z.key === "ArrowDown") {
        if (!z.value || e.keyboard.ArrowDown === !1)
          return;
        Z.preventDefault(), S({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && O();
      }
    }
    function Je(Z) {
      x.value = Z, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && S({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    Fe(b, () => {
      $();
    });
    const st = {
      focus: () => {
        var Z;
        return (Z = c.value) === null || Z === void 0 ? void 0 : Z.focus();
      },
      blur: () => {
        var Z;
        return (Z = c.value) === null || Z === void 0 ? void 0 : Z.blur();
      }
    }, gt = Fo("InputNumber", r, o);
    return Object.assign(Object.assign({}, st), {
      rtlEnabled: gt,
      inputInstRef: c,
      minusButtonInstRef: u,
      addButtonInstRef: h,
      mergedClsPrefix: o,
      mergedBordered: t,
      uncontrolledValue: v,
      mergedValue: b,
      mergedPlaceholder: R,
      displayedValueInvalid: P,
      mergedSize: l,
      mergedDisabled: s,
      displayedValue: x,
      addable: M,
      minusable: z,
      mergedStatus: d,
      handleFocus: X,
      handleBlur: _,
      handleClear: ce,
      handleMouseDown: $e,
      handleAddClick: He,
      handleMinusClick: Ue,
      handleAddMousedown: Ve,
      handleMinusMousedown: ze,
      handleKeyDown: Ke,
      handleUpdateDisplayedValue: Je,
      // theme
      mergedTheme: n,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: E(() => {
        const { self: { iconColorDisabled: Z } } = n.value, [se, ye, ae, j] = Ut(Z);
        return {
          textColorTextDisabled: `rgb(${se}, ${ye}, ${ae})`,
          opacityDisabled: `${j}`
        };
      })
    });
  },
  render() {
    const { mergedClsPrefix: e, $slots: t } = this, o = () => m(_l, { text: !0, disabled: !this.minusable || this.mergedDisabled || this.readonly, focusable: !1, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleMinusClick, onMousedown: this.handleMinusMousedown, ref: "minusButtonInstRef" }, {
      icon: () => Jt(t["minus-icon"], () => [
        m(to, { clsPrefix: e }, {
          default: () => m(E0, null)
        })
      ])
    }), r = () => m(_l, { text: !0, disabled: !this.addable || this.mergedDisabled || this.readonly, focusable: !1, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleAddClick, onMousedown: this.handleAddMousedown, ref: "addButtonInstRef" }, {
      icon: () => Jt(t["add-icon"], () => [
        m(to, { clsPrefix: e }, {
          default: () => m(k0, null)
        })
      ])
    });
    return m(
      "div",
      { class: [
        `${e}-input-number`,
        this.rtlEnabled && `${e}-input-number--rtl`
      ] },
      m(_C, { ref: "inputInstRef", autofocus: this.autofocus, status: this.mergedStatus, bordered: this.mergedBordered, loading: this.loading, value: this.displayedValue, onUpdateValue: this.handleUpdateDisplayedValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, builtinThemeOverrides: this.inputThemeOverrides, size: this.mergedSize, placeholder: this.mergedPlaceholder, disabled: this.mergedDisabled, readonly: this.readonly, textDecoration: this.displayedValueInvalid ? "line-through" : void 0, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onClear: this.handleClear, clearable: this.clearable, internalLoadingBeforeSuffix: !0 }, {
        prefix: () => {
          var n;
          return this.showButton && this.buttonPlacement === "both" ? [
            o(),
            bt(t.prefix, (i) => i ? m("span", { class: `${e}-input-number-prefix` }, i) : null)
          ] : (n = t.prefix) === null || n === void 0 ? void 0 : n.call(t);
        },
        suffix: () => {
          var n;
          return this.showButton ? [
            bt(t.suffix, (i) => i ? m("span", { class: `${e}-input-number-suffix` }, i) : null),
            this.buttonPlacement === "right" ? o() : null,
            r()
          ] : (n = t.suffix) === null || n === void 0 ? void 0 : n.call(t);
        }
      })
    );
  }
}), H2 = {
  extraFontSize: "12px",
  width: "440px"
}, L2 = {
  name: "Transfer",
  common: te,
  peers: {
    Checkbox: ir,
    Scrollbar: $t,
    Input: At,
    Empty: Ho,
    Button: Pt
  },
  self(e) {
    const { iconColorDisabled: t, iconColor: o, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: a, heightLarge: l, heightMedium: s, heightSmall: d, borderRadius: c, inputColor: u, tableHeaderColor: h, textColor1: v, textColorDisabled: f, textColor2: b, hoverColor: x } = e;
    return Object.assign(Object.assign({}, H2), {
      itemHeightSmall: d,
      itemHeightMedium: s,
      itemHeightLarge: l,
      fontSizeSmall: a,
      fontSizeMedium: i,
      fontSizeLarge: n,
      borderRadius: c,
      borderColor: "#0000",
      listColor: u,
      headerColor: h,
      titleTextColor: v,
      titleTextColorDisabled: f,
      extraTextColor: b,
      filterDividerColor: "#0000",
      itemTextColor: b,
      itemTextColorDisabled: f,
      itemColorPending: x,
      titleFontWeight: r,
      iconColor: o,
      iconColorDisabled: t
    });
  }
}, W2 = L2, N2 = {
  name: "Skeleton",
  common: te,
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
};
function Gl(e) {
  return window.TouchEvent && e instanceof window.TouchEvent;
}
function Kl() {
  const e = W(/* @__PURE__ */ new Map()), t = (o) => (r) => {
    e.value.set(o, r);
  };
  return mu(() => e.value.clear()), [e, t];
}
const j2 = N([B("slider", `
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `, [Q("reverse", [B("slider-handles", [B("slider-handle-wrapper", `
 transform: translate(50%, -50%);
 `)]), B("slider-dots", [B("slider-dot", `
 transform: translateX(50%, -50%);
 `)]), Q("vertical", [B("slider-handles", [B("slider-handle-wrapper", `
 transform: translate(-50%, -50%);
 `)]), B("slider-marks", [B("slider-mark", `
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]), B("slider-dots", [B("slider-dot", `
 transform: translateX(-50%) translateY(0);
 `)])])]), Q("vertical", `
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `, [B("slider-handles", `
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `, [B("slider-handle-wrapper", `
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]), B("slider-rail", `
 height: 100%;
 `, [A("fill", `
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]), Q("with-mark", `
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `), B("slider-marks", `
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `, [B("slider-mark", `
 transform: translateY(50%);
 white-space: nowrap;
 `)]), B("slider-dots", `
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `, [B("slider-dot", `
 transform: translateX(-50%) translateY(50%);
 `)])]), Q("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `, [B("slider-handle", `
 cursor: not-allowed;
 `)]), Q("with-mark", `
 width: 100%;
 margin: 8px 0 32px 0;
 `), N("&:hover", [B("slider-rail", {
  backgroundColor: "var(--n-rail-color-hover)"
}, [A("fill", {
  backgroundColor: "var(--n-fill-color-hover)"
})]), B("slider-handle", {
  boxShadow: "var(--n-handle-box-shadow-hover)"
})]), Q("active", [B("slider-rail", {
  backgroundColor: "var(--n-rail-color-hover)"
}, [A("fill", {
  backgroundColor: "var(--n-fill-color-hover)"
})]), B("slider-handle", {
  boxShadow: "var(--n-handle-box-shadow-hover)"
})]), B("slider-marks", `
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `, [B("slider-mark", `
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]), B("slider-rail", `
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `, [A("fill", `
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]), B("slider-handles", `
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `, [B("slider-handle-wrapper", `
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `, [B("slider-handle", `
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `, [N("&:hover", `
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]), N("&:focus", [B("slider-handle", `
 box-shadow: var(--n-handle-box-shadow-focus);
 `, [N("&:hover", `
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]), B("slider-dots", `
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `, [Q("transition-disabled", [B("slider-dot", "transition: none;")]), B("slider-dot", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 transform: translate(-50%, -50%);
 height: var(--n-dot-height);
 width: var(--n-dot-width);
 border-radius: var(--n-dot-border-radius);
 overflow: hidden;
 box-sizing: border-box;
 border: var(--n-dot-border);
 background-color: var(--n-dot-color);
 `, [Q("active", "border: var(--n-dot-border-active);")])])]), B("slider-handle-indicator", `
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `, [kn()]), B("slider-handle-indicator", `
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `, [Q("top", `
 margin-bottom: 12px;
 `), Q("right", `
 margin-left: 12px;
 `), Q("bottom", `
 margin-top: 12px;
 `), Q("left", `
 margin-right: 12px;
 `), kn()]), Is(B("slider", [B("slider-dot", "background-color: var(--n-dot-color-modal);")])), Os(B("slider", [B("slider-dot", "background-color: var(--n-dot-color-popover);")]))]), V2 = 0, U2 = Object.assign(Object.assign({}, Me.props), { to: Bt.propTo, defaultValue: {
  type: [Number, Array],
  default: 0
}, marks: Object, disabled: {
  type: Boolean,
  default: void 0
}, formatTooltip: Function, keyboard: {
  type: Boolean,
  default: !0
}, min: {
  type: Number,
  default: 0
}, max: {
  type: Number,
  default: 100
}, step: {
  type: [Number, String],
  default: 1
}, range: Boolean, value: [Number, Array], placement: String, showTooltip: {
  type: Boolean,
  default: void 0
}, tooltip: {
  type: Boolean,
  default: !0
}, vertical: Boolean, reverse: Boolean, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] }), q2 = ge({
  name: "Slider",
  props: U2,
  setup(e) {
    const { mergedClsPrefixRef: t, namespaceRef: o, inlineThemeDisabled: r } = Ct(e), n = Me("Slider", "-slider", j2, WS, e, t), i = W(null), [a, l] = Kl(), [s, d] = Kl(), c = W(/* @__PURE__ */ new Set()), u = _o(e), { mergedDisabledRef: h } = u, v = E(() => {
      const { step: D } = e;
      if (D <= 0 || D === "mark")
        return 0;
      const q = D.toString();
      let oe = 0;
      return q.includes(".") && (oe = q.length - q.indexOf(".") - 1), oe;
    }), f = W(e.defaultValue), b = Te(e, "value"), x = fo(b, f), p = E(() => {
      const { value: D } = x;
      return (e.range ? D : [D]).map($e);
    }), w = E(() => p.value.length > 2), R = E(() => e.placement === void 0 ? e.vertical ? "right" : "top" : e.placement), y = E(() => {
      const { marks: D } = e;
      return D ? Object.keys(D).map(parseFloat) : null;
    }), T = W(-1), I = W(-1), g = W(-1), S = W(!1), $ = W(!1), P = E(() => {
      const { vertical: D, reverse: q } = e;
      return D ? q ? "top" : "bottom" : q ? "right" : "left";
    }), z = E(() => {
      if (w.value)
        return;
      const D = p.value, q = Oe(e.range ? Math.min(...D) : e.min), oe = Oe(e.range ? Math.max(...D) : D[0]), { value: we } = P;
      return e.vertical ? {
        [we]: `${q}%`,
        height: `${oe - q}%`
      } : {
        [we]: `${q}%`,
        width: `${oe - q}%`
      };
    }), M = E(() => {
      const D = [], { marks: q } = e;
      if (q) {
        const oe = p.value.slice();
        oe.sort((We, Ne) => We - Ne);
        const { value: we } = P, { value: Ie } = w, { range: Le } = e, rt = Ie ? () => !1 : (We) => Le ? We >= oe[0] && We <= oe[oe.length - 1] : We <= oe[0];
        for (const We of Object.keys(q)) {
          const Ne = Number(We);
          D.push({
            active: rt(Ne),
            label: q[We],
            style: {
              [we]: `${Oe(Ne)}%`
            }
          });
        }
      }
      return D;
    });
    function F(D, q) {
      const oe = Oe(D), { value: we } = P;
      return {
        [we]: `${oe}%`,
        zIndex: q === T.value ? 1 : 0
      };
    }
    function L(D) {
      return e.showTooltip || g.value === D || T.value === D && S.value;
    }
    function G(D) {
      return S.value ? !(T.value === D && I.value === D) : !0;
    }
    function K(D) {
      var q;
      ~D && (T.value = D, (q = a.value.get(D)) === null || q === void 0 || q.focus());
    }
    function O() {
      s.value.forEach((D, q) => {
        L(q) && D.syncPosition();
      });
    }
    function X(D) {
      const { "onUpdate:value": q, onUpdateValue: oe } = e, { nTriggerFormInput: we, nTriggerFormChange: Ie } = u;
      oe && pe(oe, D), q && pe(q, D), f.value = D, we(), Ie();
    }
    function _(D) {
      const { range: q } = e;
      if (q) {
        if (Array.isArray(D)) {
          const { value: oe } = p;
          D.join() !== oe.join() && X(D);
        }
      } else
        Array.isArray(D) || p.value[0] !== D && X(D);
    }
    function U(D, q) {
      if (e.range) {
        const oe = p.value.slice();
        oe.splice(q, 1, D), _(oe);
      } else
        _(D);
    }
    function ce(D, q, oe) {
      const we = oe !== void 0;
      oe || (oe = D - q > 0 ? 1 : -1);
      const Ie = y.value || [], { step: Le } = e;
      if (Le === "mark") {
        const Ne = fe(D, Ie.concat(q), we ? oe : void 0);
        return Ne ? Ne.value : q;
      }
      if (Le <= 0)
        return q;
      const { value: rt } = v;
      let We;
      if (we) {
        const Ne = Number((q / Le).toFixed(rt)), ct = Math.floor(Ne), Rt = Ne > ct ? ct : ct - 1, dt = Ne < ct ? ct : ct + 1;
        We = fe(q, [
          Number((Rt * Le).toFixed(rt)),
          Number((dt * Le).toFixed(rt)),
          ...Ie
        ], oe);
      } else {
        const Ne = ke(D);
        We = fe(D, [...Ie, Ne]);
      }
      return We ? $e(We.value) : q;
    }
    function $e(D) {
      return Math.min(e.max, Math.max(e.min, D));
    }
    function Oe(D) {
      const { max: q, min: oe } = e;
      return (D - oe) / (q - oe) * 100;
    }
    function Be(D) {
      const { max: q, min: oe } = e;
      return oe + (q - oe) * D;
    }
    function ke(D) {
      const { step: q, min: oe } = e;
      if (q <= 0 || q === "mark")
        return D;
      const we = Math.round((D - oe) / q) * q + oe;
      return Number(we.toFixed(v.value));
    }
    function fe(D, q = y.value, oe) {
      if (!(q != null && q.length))
        return null;
      let we = null, Ie = -1;
      for (; ++Ie < q.length; ) {
        const Le = q[Ie] - D, rt = Math.abs(Le);
        // find marks in the same direction
        (oe === void 0 || Le * oe > 0) && (we === null || rt < we.distance) && (we = {
          index: Ie,
          distance: rt,
          value: q[Ie]
        });
      }
      return we;
    }
    function xe(D) {
      const q = i.value;
      if (!q)
        return;
      const oe = Gl(D) ? D.touches[0] : D, we = q.getBoundingClientRect();
      let Ie;
      return e.vertical ? Ie = (we.bottom - oe.clientY) / we.height : Ie = (oe.clientX - we.left) / we.width, e.reverse && (Ie = 1 - Ie), Be(Ie);
    }
    function ze(D) {
      if (h.value || !e.keyboard)
        return;
      const { vertical: q, reverse: oe } = e;
      switch (D.key) {
        case "ArrowUp":
          D.preventDefault(), le(q && oe ? -1 : 1);
          break;
        case "ArrowRight":
          D.preventDefault(), le(!q && oe ? -1 : 1);
          break;
        case "ArrowDown":
          D.preventDefault(), le(q && oe ? 1 : -1);
          break;
        case "ArrowLeft":
          D.preventDefault(), le(!q && oe ? 1 : -1);
          break;
      }
    }
    function le(D) {
      const q = T.value;
      if (q === -1)
        return;
      const { step: oe } = e, we = p.value[q], Ie = oe <= 0 || oe === "mark" ? we : we + oe * D;
      U(
        // Avoid the number of value does not change when `step` is null
        ce(Ie, we, D > 0 ? 1 : -1),
        q
      );
    }
    function Ve(D) {
      var q, oe;
      if (h.value || !Gl(D) && D.button !== V2)
        return;
      const we = xe(D);
      if (we === void 0)
        return;
      const Ie = p.value.slice(), Le = e.range ? (oe = (q = fe(we, Ie)) === null || q === void 0 ? void 0 : q.index) !== null && oe !== void 0 ? oe : -1 : 0;
      Le !== -1 && (D.preventDefault(), K(Le), He(), U(ce(we, p.value[Le]), Le));
    }
    function He() {
      S.value || (S.value = !0, Ye("touchend", document, Je), Ye("mouseup", document, Je), Ye("touchmove", document, Ke), Ye("mousemove", document, Ke));
    }
    function Ue() {
      S.value && (S.value = !1, Ge("touchend", document, Je), Ge("mouseup", document, Je), Ge("touchmove", document, Ke), Ge("mousemove", document, Ke));
    }
    function Ke(D) {
      const { value: q } = T;
      if (!S.value || q === -1) {
        Ue();
        return;
      }
      const oe = xe(D);
      U(ce(oe, p.value[q]), q);
    }
    function Je() {
      Ue();
    }
    function st(D) {
      T.value = D, h.value || (g.value = D);
    }
    function gt(D) {
      T.value === D && (T.value = -1, Ue()), g.value === D && (g.value = -1);
    }
    function Z(D) {
      g.value = D;
    }
    function se(D) {
      g.value === D && (g.value = -1);
    }
    Fe(T, (D, q) => void It(() => I.value = q)), Fe(x, () => {
      if (e.marks) {
        if ($.value)
          return;
        $.value = !0, It(() => {
          $.value = !1;
        });
      }
      It(O);
    }), wt(() => {
      Ue();
    });
    const ye = E(() => {
      const { self: { markFontSize: D, railColor: q, railColorHover: oe, fillColor: we, fillColorHover: Ie, handleColor: Le, opacityDisabled: rt, dotColor: We, dotColorModal: Ne, handleBoxShadow: ct, handleBoxShadowHover: Rt, handleBoxShadowActive: dt, handleBoxShadowFocus: mt, dotBorder: C, dotBoxShadow: H, railHeight: J, railWidthVertical: de, handleSize: ue, dotHeight: me, dotWidth: Ce, dotBorderRadius: Pe, fontSize: nt, dotBorderActive: Tt, dotColorPopover: io }, common: { cubicBezierEaseInOut: ao } } = n.value;
      return {
        "--n-bezier": ao,
        "--n-dot-border": C,
        "--n-dot-border-active": Tt,
        "--n-dot-border-radius": Pe,
        "--n-dot-box-shadow": H,
        "--n-dot-color": We,
        "--n-dot-color-modal": Ne,
        "--n-dot-color-popover": io,
        "--n-dot-height": me,
        "--n-dot-width": Ce,
        "--n-fill-color": we,
        "--n-fill-color-hover": Ie,
        "--n-font-size": nt,
        "--n-handle-box-shadow": ct,
        "--n-handle-box-shadow-active": dt,
        "--n-handle-box-shadow-focus": mt,
        "--n-handle-box-shadow-hover": Rt,
        "--n-handle-color": Le,
        "--n-handle-size": ue,
        "--n-opacity-disabled": rt,
        "--n-rail-color": q,
        "--n-rail-color-hover": oe,
        "--n-rail-height": J,
        "--n-rail-width-vertical": de,
        "--n-mark-font-size": D
      };
    }), ae = r ? xt("slider", void 0, ye, e) : void 0, j = E(() => {
      const { self: { fontSize: D, indicatorColor: q, indicatorBoxShadow: oe, indicatorTextColor: we, indicatorBorderRadius: Ie } } = n.value;
      return {
        "--n-font-size": D,
        "--n-indicator-border-radius": Ie,
        "--n-indicator-box-shadow": oe,
        "--n-indicator-color": q,
        "--n-indicator-text-color": we
      };
    }), ee = r ? xt("slider-indicator", void 0, j, e) : void 0;
    return {
      mergedClsPrefix: t,
      namespace: o,
      uncontrolledValue: f,
      mergedValue: x,
      mergedDisabled: h,
      mergedPlacement: R,
      isMounted: Hr(),
      adjustedTo: Bt(e),
      dotTransitionDisabled: $,
      markInfos: M,
      isShowTooltip: L,
      shouldKeepTooltipTransition: G,
      handleRailRef: i,
      setHandleRefs: l,
      setFollowerRefs: d,
      fillStyle: z,
      getHandleStyle: F,
      activeIndex: T,
      arrifiedValues: p,
      followerEnabledIndexSet: c,
      handleRailMouseDown: Ve,
      handleHandleFocus: st,
      handleHandleBlur: gt,
      handleHandleMouseEnter: Z,
      handleHandleMouseLeave: se,
      handleRailKeyDown: ze,
      indicatorCssVars: r ? void 0 : j,
      indicatorThemeClass: ee == null ? void 0 : ee.themeClass,
      indicatorOnRender: ee == null ? void 0 : ee.onRender,
      cssVars: r ? void 0 : ye,
      themeClass: ae == null ? void 0 : ae.themeClass,
      onRender: ae == null ? void 0 : ae.onRender
    };
  },
  render() {
    var e;
    const { mergedClsPrefix: t, themeClass: o, formatTooltip: r } = this;
    return (e = this.onRender) === null || e === void 0 || e.call(this), m(
      "div",
      { class: [
        `${t}-slider`,
        o,
        {
          [`${t}-slider--disabled`]: this.mergedDisabled,
          [`${t}-slider--active`]: this.activeIndex !== -1,
          [`${t}-slider--with-mark`]: this.marks,
          [`${t}-slider--vertical`]: this.vertical,
          [`${t}-slider--reverse`]: this.reverse
        }
      ], style: this.cssVars, onKeydown: this.handleRailKeyDown, onMousedown: this.handleRailMouseDown, onTouchstart: this.handleRailMouseDown },
      m(
        "div",
        { class: `${t}-slider-rail` },
        m("div", { class: `${t}-slider-rail__fill`, style: this.fillStyle }),
        this.marks ? m("div", { class: [
          `${t}-slider-dots`,
          this.dotTransitionDisabled && `${t}-slider-dots--transition-disabled`
        ] }, this.markInfos.map((n) => m("div", { key: n.label, class: [
          `${t}-slider-dot`,
          {
            [`${t}-slider-dot--active`]: n.active
          }
        ], style: n.style }))) : null,
        m("div", { ref: "handleRailRef", class: `${t}-slider-handles` }, this.arrifiedValues.map((n, i) => {
          const a = this.isShowTooltip(i);
          return m(Zi, null, {
            default: () => [
              m(Ji, null, {
                default: () => m("div", { ref: this.setHandleRefs(i), class: `${t}-slider-handle-wrapper`, tabindex: this.mergedDisabled ? -1 : 0, style: this.getHandleStyle(n, i), onFocus: () => this.handleHandleFocus(i), onBlur: () => this.handleHandleBlur(i), onMouseenter: () => this.handleHandleMouseEnter(i), onMouseleave: () => this.handleHandleMouseLeave(i) }, Jt(this.$slots.thumb, () => [
                  m("div", { class: `${t}-slider-handle` })
                ]))
              }),
              this.tooltip && m(ea, { ref: this.setFollowerRefs(i), show: a, to: this.adjustedTo, enabled: this.showTooltip && !this.range || this.followerEnabledIndexSet.has(i), teleportDisabled: this.adjustedTo === Bt.tdkey, placement: this.mergedPlacement, containerClass: this.namespace }, {
                default: () => m(Qt, { name: "fade-in-scale-up-transition", appear: this.isMounted, css: this.shouldKeepTooltipTransition(i), onEnter: () => {
                  this.followerEnabledIndexSet.add(i);
                }, onAfterLeave: () => {
                  this.followerEnabledIndexSet.delete(i);
                } }, {
                  default: () => {
                    var l;
                    return a ? ((l = this.indicatorOnRender) === null || l === void 0 || l.call(this), m("div", { class: [
                      `${t}-slider-handle-indicator`,
                      this.indicatorThemeClass,
                      `${t}-slider-handle-indicator--${this.mergedPlacement}`
                    ], style: this.indicatorCssVars }, typeof r == "function" ? r(n) : n)) : null;
                  }
                })
              })
            ]
          });
        })),
        this.marks ? m("div", { class: `${t}-slider-marks` }, this.markInfos.map((n) => m("div", { key: n.label, class: `${t}-slider-mark`, style: n.style }, n.label))) : null
      )
    );
  }
}), G2 = B("h", `
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [N("&:first-child", {
  marginTop: 0
}), Q("prefix-bar", {
  position: "relative",
  paddingLeft: "var(--n-prefix-width)"
}, [Q("align-text", {
  paddingLeft: 0
}, [N("&::before", {
  left: "calc(-1 * var(--n-prefix-width))"
})]), N("&::before", `
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `), N("&::before", {
  backgroundColor: "var(--n-bar-color)"
})])]), K2 = Object.assign(Object.assign({}, Me.props), { type: {
  type: String,
  default: "default"
}, prefix: String, alignText: Boolean }), ar = (e) => ge({
  name: `H${e}`,
  props: K2,
  setup(t) {
    const { mergedClsPrefixRef: o, inlineThemeDisabled: r } = Ct(t), n = Me("Typography", "-h", G2, $2, t, o), i = E(() => {
      const { type: l } = t, { common: { cubicBezierEaseInOut: s }, self: { headerFontWeight: d, headerTextColor: c, [re("headerPrefixWidth", e)]: u, [re("headerFontSize", e)]: h, [re("headerMargin", e)]: v, [re("headerBarWidth", e)]: f, [re("headerBarColor", l)]: b } } = n.value;
      return {
        "--n-bezier": s,
        "--n-font-size": h,
        "--n-margin": v,
        "--n-bar-color": b,
        "--n-bar-width": f,
        "--n-font-weight": d,
        "--n-text-color": c,
        "--n-prefix-width": u
      };
    }), a = r ? xt(`h${e}`, E(() => t.type[0]), i, t) : void 0;
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
    return (t = this.onRender) === null || t === void 0 || t.call(this), m(`h${e}`, {
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
ar("1");
ar("2");
const Yl = ar("3");
ar("4");
ar("5");
ar("6");
const Y2 = () => ({}), X2 = {
  name: "Equation",
  common: te,
  self: Y2
}, Z2 = X2, kc = {
  name: "dark",
  common: te,
  Alert: mC,
  Anchor: yC,
  AutoComplete: AC,
  Avatar: tc,
  AvatarGroup: NC,
  BackTop: UC,
  Badge: GC,
  Breadcrumb: ZC,
  Button: Pt,
  ButtonGroup: tS,
  Calendar: sy,
  Card: nc,
  Carousel: my,
  Cascader: $y,
  Checkbox: ir,
  Code: lc,
  Collapse: Ey,
  CollapseTransition: Dy,
  ColorPicker: uy,
  DataTable: l1,
  DatePicker: x1,
  Descriptions: S1,
  Dialog: gc,
  Divider: E1,
  Drawer: F1,
  Dropdown: Ca,
  DynamicInput: W1,
  DynamicTags: Y1,
  Element: Z1,
  Empty: Ho,
  Ellipsis: hc,
  Equation: Z2,
  Form: ow,
  GradientText: Nw,
  Icon: f1,
  IconWrapper: Uw,
  Image: _2,
  Input: At,
  InputNumber: rS,
  LegacyTransfer: W2,
  Layout: sS,
  List: uS,
  LoadingBar: hS,
  Log: vS,
  Menu: yS,
  Mention: mS,
  Message: Qw,
  Modal: I1,
  Notification: Yw,
  PageHeader: $S,
  Pagination: uc,
  Popconfirm: zS,
  Popover: Lo,
  Popselect: sc,
  Progress: Sc,
  Radio: pc,
  Rate: MS,
  Result: DS,
  Row: E2,
  Scrollbar: $t,
  Select: cc,
  Skeleton: N2,
  Slider: FS,
  Space: xc,
  Spin: VS,
  Statistic: GS,
  Steps: ZS,
  Switch: e2,
  Table: n2,
  Tabs: s2,
  Tag: qd,
  Thing: u2,
  TimePicker: vc,
  Timeline: p2,
  Tooltip: An,
  Transfer: m2,
  Tree: Pc,
  TreeSelect: y2,
  Typography: T2,
  Upload: I2,
  Watermark: R2
}, J2 = {
  atmosphere_type: 0,
  clouds: {
    base: 2500,
    density: 0,
    iprecptns: 0,
    thickness: 0
  },
  cyclones: [],
  dust_density: 0,
  enable_dust: !1,
  enable_fog: !1,
  fog: {
    thickness: 0,
    visibility: 0
  },
  groundTurbulence: 0,
  halo: {
    preset: "off",
    crystalsPreset: "Tangents"
  },
  modifiedTime: !0,
  name: "Winter, clean sky",
  qnh: 760,
  season: {
    temperature: 9
  },
  type_weather: 0,
  visibility: {
    distance: 8e4
  },
  wind: {
    at2000: {
      dir: 0,
      speed: 0
    },
    at8000: {
      dir: 0,
      speed: 0
    },
    atGround: {
      dir: 0,
      speed: 0
    }
  }
}, Xl = W(kc), Q2 = W("Dark"), Zl = {
  common: {
    bodyColor: "#23313f",
    cardColor: "#293949",
    railColor: "#555",
    primaryColorSuppl: "#fff"
  }
}, ya = bs("wx", {
  state: () => ({
    wx: J2
  }),
  actions: {
    setAll(e) {
      this.wx = e;
    }
  },
  getters: {
    getWx() {
      return this.wx;
    }
  }
}), e$ = bs("theme", {
  state: () => ({
    theme: kc
  }),
  actions: {
    setTheme(e) {
      Xl.value = e;
    },
    setThemeOverrides(e) {
      Zl.common = e.common;
    }
  },
  getters: {
    getTheme() {
      return Xl.value;
    },
    getThemeOverrides() {
      return Zl;
    },
    getSelectedTheme() {
      return Q2.value;
    }
  }
}), x$ = (e) => {
  E(() => ya()).value.setAll(e);
}, fr = /* @__PURE__ */ ge({
  __name: "SliderComponent",
  props: {
    labelText: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    max: {
      type: Number,
      default: 18e3
    },
    min: {
      type: Number,
      default: 0
    },
    val: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const o = e, r = W(o.val);
    Fe(
      () => o.val,
      (i) => {
        r.value = i;
      }
    );
    const n = () => {
      t("update", r.value);
    };
    return (i, a) => ($o(), rs(ne(Fi), { vertical: "" }, {
      default: _e(() => [
        Se(ne(_t), {
          label: e.labelText,
          "label-style": "color: white"
        }, {
          default: _e(() => [
            Se(ne(q2), {
              value: r.value,
              "onUpdate:value": [
                a[0] || (a[0] = (l) => r.value = l),
                n
              ],
              step: 1,
              min: e.min,
              max: e.max,
              disabled: e.disabled,
              class: "mr-4 ml-0 w-52"
            }, null, 8, ["value", "min", "max", "disabled"]),
            Se(ne(Lt), {
              value: r.value,
              "onUpdate:value": [
                a[1] || (a[1] = (l) => r.value = l),
                n
              ],
              step: 1,
              min: e.min,
              max: e.max,
              size: "small",
              class: "min-w-44 w-52",
              disabled: e.disabled
            }, {
              suffix: _e(() => [
                ot(ns(e.suffix), 1)
              ]),
              _: 1
            }, 8, ["value", "min", "max", "disabled"])
          ]),
          _: 1
        }, 8, ["label"])
      ]),
      _: 1
    }));
  }
}), t$ = (e) => {
  const t = e / 25.4;
  return Number(t.toFixed(2));
}, o$ = (e) => {
  const t = e * 25.4;
  return Number(t.toFixed(2));
}, Ft = (e) => Math.round(e / 3.28084), Ko = (e) => Math.round(e * 3.28084), r$ = { class: "flex flex-row" }, n$ = { key: 0 }, i$ = { key: 0 }, a$ = { key: 0 }, l$ = /* @__PURE__ */ ge({
  __name: "AtmosphereClouds",
  setup(e) {
    const t = E(() => ya()), o = E({
      get: () => t.value.wx.clouds.preset || "Nothing",
      set: (O) => {
        t.value.wx.clouds.preset = O === "Nothing" ? void 0 : O;
      }
    }), r = E({
      get: () => Ko(t.value.wx.clouds.base),
      set: (O) => {
        t.value.wx.clouds.base = Ft(O);
      }
    }), n = (O) => {
      t.value.wx.clouds.base = Ft(O);
    }, i = E({
      get: () => Ko(t.value.wx.clouds.thickness || 0),
      set: (O) => {
        t.value.wx.clouds.thickness = Ft(O);
      }
    }), a = (O) => {
      t.value.wx.clouds.thickness = Ft(O);
    }, l = E({
      get: () => t.value.wx.clouds.density || 0,
      set: (O) => {
        t.value.wx.clouds.density = O;
      }
    }), s = E({
      get: () => t.value.wx.clouds.iprecptns || 0,
      set: (O) => {
        t.value.wx.clouds.iprecptns = O;
      }
    }), d = E({
      get: () => t.value.wx.enable_dust,
      set: (O) => {
        t.value.wx.enable_dust = O;
      }
    }), c = E({
      get: () => Ko(t.value.wx.dust_density),
      set: (O) => {
        t.value.wx.dust_density = Ft(O);
      }
    }), u = (O) => {
      t.value.wx.dust_density = Ft(O);
    }, h = E({
      get: () => t.value.wx.enable_fog,
      set: (O) => {
        t.value.wx.enable_fog = O;
      }
    }), v = E({
      get: () => Ko(t.value.wx.fog.thickness),
      set: (O) => {
        t.value.wx.fog.thickness = Ft(O);
      }
    }), f = (O) => {
      t.value.wx.fog.thickness = Ft(O);
    }, b = E({
      get: () => Ko(t.value.wx.fog.visibility),
      set: (O) => {
        t.value.wx.fog.visibility = Ft(O);
      }
    }), x = (O) => {
      t.value.wx.fog.visibility = Ft(O);
    }, p = E({
      get: () => Math.round(t.value.wx.season.temperature),
      set: (O) => {
        t.value.wx.season.temperature = Math.round(O);
      }
    }), w = E({
      get: () => t$(t.value.wx.qnh),
      set: (O) => {
        t.value.wx.qnh = o$(O);
      }
    }), R = E({
      get: () => {
        var O;
        return ((O = t.value.wx.halo) == null ? void 0 : O.preset) ?? "off";
      },
      set: (O) => {
        t.value.wx.halo ? t.value.wx.halo.preset = O : t.value.wx.halo = {
          preset: O !== "off" ? O : "off"
        }, O !== "off" && O !== "auto" && t.value.wx.halo && !t.value.wx.halo.crystalsPreset && (t.value.wx.halo.crystalsPreset = "AllKinds");
      }
    }), y = E({
      get: () => {
        var O;
        return ((O = t.value.wx.halo) == null ? void 0 : O.crystalsPreset) ?? "AllKinds";
      },
      set: (O) => {
        t.value.wx.halo && (t.value.wx.halo.crystalsPreset = O);
      }
    }), T = W("Nothing (984ft - 16404ft)"), I = W(0), g = W(0), S = {
      Nothing: {
        min: 984,
        max: 16404,
        ttip: "Nothing (984ft - 16404ft)"
      },
      Preset1: {
        min: 2756,
        max: 13780,
        ttip: "Few Scattered (2756ft - 13780ft)"
      },
      Preset2: {
        min: 4134,
        max: 8268,
        ttip: "Two Layers Few Scattered (4134ft - 8268ft)"
      },
      Preset3: {
        min: 2756,
        max: 8268,
        ttip: "Two Layers Scattered (2756ft - 8268ft)"
      },
      Preset4: {
        min: 4134,
        max: 8268,
        ttip: "Two Layers Scattered (4134ft - 8268ft)"
      },
      Preset5: {
        min: 4134,
        max: 15157,
        ttip: "Three Layers High Scattered (4134ft - 15157ft)"
      },
      Preset6: {
        min: 4134,
        max: 13780,
        ttip: "One Layer Scattered/Broken (4134ft - 13780ft)"
      },
      Preset7: {
        min: 5512,
        max: 16535,
        ttip: "Two Layers Scattered/Broken (5512ft - 16535ft)"
      },
      Preset8: {
        min: 12402,
        max: 17913,
        ttip: "Two High Layers Scattered/Broken (12402ft - 17913ft)"
      },
      Preset9: {
        min: 5512,
        max: 12402,
        ttip: "Two Layers Scattered/Broken (5512ft - 12402ft)"
      },
      Preset10: {
        min: 4134,
        max: 13780,
        ttip: "Two Layers Large Thick Clouds (4134ft - 13780ft)"
      },
      Preset11: {
        min: 8268,
        max: 17913,
        ttip: "Two Layers Large Clouds High Ceiling (8268ft - 17913ft)"
      },
      Preset12: {
        min: 5512,
        max: 11024,
        ttip: "Two Layers Scattered Large Clouds High Ceiling (5512ft - 11024ft)"
      },
      Preset13: {
        min: 5512,
        max: 11024,
        ttip: "Two Layers Broken (5512ft - 11024ft)"
      },
      Preset14: {
        min: 5512,
        max: 11024,
        ttip: "Broken Thick Low Layer with Few High Layer (5512ft - 11024ft)"
      },
      Preset15: {
        min: 2756,
        max: 16535,
        ttip: "Broken Layers Broken Large Clouds (2756ft - 16535ft)"
      },
      Preset16: {
        min: 4134,
        max: 13780,
        ttip: "Two Layers Broken Large Clouds (4134ft - 13780ft)"
      },
      Preset17: {
        min: 0,
        max: 8268,
        ttip: "Two Layers Broken/Overcast (0ft - 8268ft)"
      },
      Preset18: {
        min: 0,
        max: 12402,
        ttip: "Three Layers Broken/Overcast (0ft - 12402ft)"
      },
      Preset19: {
        min: 0,
        max: 12402,
        ttip: "Three Layers Overcast at Low Level (0ft - 12402ft)"
      },
      Preset20: {
        min: 0,
        max: 12402,
        ttip: "Three Layers Overcast at Low Level (0ft - 12402ft)"
      },
      Preset21: {
        min: 4134,
        max: 13780,
        ttip: "Overcast at Low Level (4134ft - 13780ft)"
      },
      Preset22: {
        min: 1378,
        max: 13780,
        ttip: "Overcast at Low Level (1378ft - 13780ft)"
      },
      Preset23: {
        min: 2756,
        max: 11024,
        ttip: "Three Layers Broken Low Level Scattered High Level (2756ft - 11024ft)"
      },
      Preset24: {
        min: 1378,
        max: 8268,
        ttip: "Three Layers Overcast (1378ft - 8268ft)"
      },
      Preset25: {
        min: 1378,
        max: 11024,
        ttip: "Three Layers Overcast (1378ft - 11024ft)"
      },
      Preset26: {
        min: 1378,
        max: 9646,
        ttip: "Three Layers Overcast (1378ft - 9646ft)"
      },
      Preset27: {
        min: 1378,
        max: 8268,
        ttip: "Three Layers Overcast (1378ft - 8268ft)"
      },
      RainyPreset1: {
        min: 1378,
        max: 9646,
        ttip: "Overcast with Rain (1378ft - 9646ft)"
      },
      RainyPreset2: {
        min: 2756,
        max: 8268,
        ttip: "Overcast with Rain (2756ft - 8268ft)"
      },
      RainyPreset3: {
        min: 2756,
        max: 8268,
        ttip: "Overcast with Rain (2756ft - 8268ft)"
      }
    };
    function $(O) {
      return S[O];
    }
    const { min: P, max: z, ttip: M } = $(
      t.value.wx.clouds.preset === void 0 ? "Nothing" : t.value.wx.clouds.preset
    );
    I.value = P, g.value = z, T.value = M, Fe(
      () => t.value.wx.clouds.preset ?? "Nothing",
      (O) => {
        const { min: X, max: _, ttip: U } = $(O);
        I.value = X, g.value = _, T.value = U, r.value < X ? r.value = X : r.value > _ && (r.value = _);
      }
    );
    const F = [
      { label: "Off", value: "off" },
      { label: "Auto", value: "auto" },
      { label: "Ice Halo On All Mediums", value: "AtmoHighClouds" },
      {
        label: "Ice Halo On High Volumentric Clouds",
        value: "VolumetricOnly"
      },
      {
        label: "Ice Halo On Cirrus and High Volumentric Clouds",
        value: "HighClouds"
      },
      { label: "Ice Halo On Cirrus Clouds", value: "CirrusOnly" }
    ], L = [
      { label: "AllKinds", value: "AllKinds" },
      { label: "BasicHaloCircle", value: "BasicHaloCircle" },
      { label: "BasicHaloWithSundogs", value: "BasicHaloWithSundogs" },
      { label: "BasicSundogsTangents", value: "BasicSundogsTangents" },
      { label: "SundogsArcs", value: "SundogsArcs" },
      { label: "Tangents", value: "Tangents" }
    ], G = [
      { label: "Nothing", value: "Nothing" },
      // Not an actual preset
      { label: "Light Scattered 1", value: "Preset1" },
      { label: "Light Scattered 2", value: "Preset2" },
      { label: "High Scattered 1", value: "Preset3" },
      { label: "High Scattered 2", value: "Preset4" },
      { label: "Scattered 1", value: "Preset5" },
      { label: "Scattered 2", value: "Preset6" },
      { label: "Scattered 3", value: "Preset7" },
      { label: "Scattered 4", value: "Preset8" },
      { label: "Scattered 5", value: "Preset9" },
      { label: "Scattered 6", value: "Preset10" },
      { label: "Scattered 7", value: "Preset11" },
      { label: "Broken 1", value: "Preset12" },
      { label: "Broken 2", value: "Preset13" },
      { label: "Broken 3", value: "Preset14" },
      { label: "Broken 4", value: "Preset15" },
      { label: "Broken 5", value: "Preset16" },
      { label: "Broken 6", value: "Preset17" },
      { label: "Broken 7", value: "Preset18" },
      { label: "Broken 8", value: "Preset19" },
      { label: "Overcast 1", value: "Preset20" },
      { label: "Overcast 2", value: "Preset21" },
      { label: "Overcast 3", value: "Preset22" },
      { label: "Overcast 4", value: "Preset23" },
      { label: "Overcast 5", value: "Preset24" },
      { label: "Overcast 6", value: "Preset25" },
      { label: "Overcast 7", value: "Preset26" },
      { label: "Overcast 8", value: "Preset27" },
      { label: "Overcast & Rain 1", value: "RainyPreset1" },
      { label: "Overcast & Rain 2", value: "RainyPreset2" },
      { label: "Overcast & Rain 3", value: "RainyPreset3" }
    ], K = [
      { label: "None", value: 0 },
      { label: "Rain", value: 1 }
    ];
    return (O, X) => ($o(), hr("div", r$, [
      Se(ne(Fi), {
        vertical: "",
        class: "mr-6 w-full"
      }, {
        default: _e(() => [
          Se(ne(_t), {
            label: "Temperature",
            "label-style": "color: white"
          }, {
            default: _e(() => [
              Se(ne(Lt), {
                id: "temperature-input",
                min: 8.4,
                max: 50,
                value: ne(p),
                "onUpdate:value": X[0] || (X[0] = (_) => et(p) ? p.value = _ : null),
                class: "w-full min-w-24",
                size: "small"
              }, {
                suffix: _e(() => [
                  ot(" °C ")
                ]),
                _: 1
              }, 8, ["min", "value"])
            ]),
            _: 1
          }),
          Se(ne(Go), { class: "divider" }),
          Se(ne(_t), {
            label: "Pressure",
            "label-style": "color: white"
          }, {
            default: _e(() => [
              Se(ne(Lt), {
                id: "pressure-input",
                value: ne(w),
                "onUpdate:value": X[1] || (X[1] = (_) => et(w) ? w.value = _ : null),
                class: "w-full min-w-24",
                size: "small",
                step: 0.01,
                min: 28.35,
                max: 31.01,
                precision: 2
              }, {
                suffix: _e(() => [
                  ot(" inHg ")
                ]),
                _: 1
              }, 8, ["value", "step", "min", "max"])
            ]),
            _: 1
          }),
          Se(ne(Go), { class: "divider" }),
          Se(ne(_t), {
            label: "Ice Halo",
            "label-style": "color: white"
          }, {
            default: _e(() => [
              Se(ne(on), {
                class: "w-full",
                value: ne(R),
                "onUpdate:value": X[2] || (X[2] = (_) => et(R) ? R.value = _ : null),
                options: F
              }, null, 8, ["value"])
            ]),
            _: 1
          }),
          ne(R) !== "off" && ne(R) !== "auto" ? ($o(), hr("div", n$, [
            Se(ne(_t), {
              label: "Halo Preset",
              "label-style": "color: white"
            }, {
              default: _e(() => [
                Se(ne(on), {
                  class: "w-full",
                  value: ne(y),
                  "onUpdate:value": X[3] || (X[3] = (_) => et(y) ? y.value = _ : null),
                  options: L
                }, null, 8, ["value"])
              ]),
              _: 1
            })
          ])) : Vn("", !0),
          Se(ne(Go), { class: "divider" }),
          Se(ne(Bl), {
            checked: ne(h),
            "onUpdate:checked": X[4] || (X[4] = (_) => et(h) ? h.value = _ : null)
          }, {
            default: _e(() => [
              ot("Toggle Fog")
            ]),
            _: 1
          }, 8, ["checked"]),
          Se(fr, {
            labelText: "Fog Visibility",
            onUpdate: x,
            val: ne(b),
            class: "mt-2 w-full",
            suffix: "ft",
            max: 19685,
            disabled: !ne(h)
          }, null, 8, ["val", "disabled"]),
          Se(fr, {
            labelText: "Fog Thickness",
            onUpdate: f,
            val: ne(v),
            class: "w-full",
            suffix: "ft",
            max: 3281,
            disabled: !ne(h)
          }, null, 8, ["val", "disabled"])
        ]),
        _: 1
      }),
      Se(ne(Fi), {
        vertical: "",
        class: "ml-8 w-full"
      }, {
        default: _e(() => [
          Se(ne(_t), {
            label: "Cloud Preset",
            "label-style": "color: white"
          }, {
            default: _e(() => [
              Se(ne(d1), {
                trigger: "hover",
                class: "w-full"
              }, {
                trigger: _e(() => [
                  Se(ne(on), {
                    class: "w-full",
                    value: ne(o),
                    "onUpdate:value": X[5] || (X[5] = (_) => et(o) ? o.value = _ : null),
                    options: G
                  }, null, 8, ["value"])
                ]),
                default: _e(() => [
                  ot(" " + ns(T.value), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          Se(ne(Go), { class: "divider" }),
          Se(fr, {
            labelText: "Cloud Base",
            onUpdate: n,
            val: ne(r),
            min: I.value,
            max: g.value,
            suffix: "ft"
          }, null, 8, ["val", "min", "max"]),
          ne(o) === "Nothing" ? ($o(), hr("div", i$, [
            Se(fr, {
              labelText: "Cloud Thickness",
              onUpdate: a,
              val: ne(i),
              class: "w-full",
              suffix: "ft",
              max: 3281
            }, null, 8, ["val"]),
            Se(ne(_t), {
              label: "Density",
              "label-style": "color: white"
            }, {
              default: _e(() => [
                Se(ne(Lt), {
                  id: "cloud-thickness-input",
                  class: "w-full min-w-24",
                  value: ne(l),
                  "onUpdate:value": X[6] || (X[6] = (_) => et(l) ? l.value = _ : null),
                  size: "small",
                  min: 0,
                  max: 10
                }, null, 8, ["value"])
              ]),
              _: 1
            }),
            ne(l) >= 5 ? ($o(), hr("div", a$, [
              Se(ne(_t), {
                label: "Precipitation",
                "label-style": "color: white"
              }, {
                default: _e(() => [
                  Se(ne(on), {
                    class: "w-full",
                    value: ne(s),
                    "onUpdate:value": X[7] || (X[7] = (_) => et(s) ? s.value = _ : null),
                    options: K
                  }, null, 8, ["value"])
                ]),
                _: 1
              })
            ])) : Vn("", !0),
            Se(ne(Go), { class: "divider" })
          ])) : Vn("", !0),
          Se(ne(Bl), {
            checked: ne(d),
            "onUpdate:checked": X[8] || (X[8] = (_) => et(d) ? d.value = _ : null)
          }, {
            default: _e(() => [
              ot(" Toggle Dust/Smoke ")
            ]),
            _: 1
          }, 8, ["checked"]),
          Se(fr, {
            labelText: "Dust Smoke Visibility",
            onUpdate: u,
            val: ne(c),
            suffix: "ft",
            class: "mt-2",
            min: 984,
            max: 9843,
            disabled: !ne(d)
          }, null, 8, ["val", "disabled"])
        ]),
        _: 1
      })
    ]));
  }
}), s$ = { class: "flex flex-row w-1/2" }, d$ = { class: "flex flex-row w-1/2" }, c$ = { class: "flex flex-row w-1/2" }, u$ = /* @__PURE__ */ ge({
  __name: "WindConditions",
  setup(e) {
    const t = (u) => u === null ? "" : u > 359 ? "000" : u < 100 ? u.toString().padStart(3, "0") : u.toString(), o = E(() => ya()), r = E({
      get: () => Ko(o.value.wx.groundTurbulence),
      set: (u) => {
        o.value.wx.groundTurbulence = Ft(u);
      }
    });
    function n(u, h) {
      return E({
        get: () => Math.round(o.value.wx.wind[u][h]),
        set: (v) => {
          o.value.wx.wind[u][h] = Math.round(v / 100) * 100;
        }
      });
    }
    const i = n("atGround", "speed"), a = n("atGround", "dir"), l = n("at2000", "speed"), s = n("at2000", "dir"), d = n("at8000", "speed"), c = n("at8000", "dir");
    return (u, h) => ($o(), hr("div", null, [
      Se(ne(_t), { label: "Surface Winds" }, {
        default: _e(() => [
          Zo("div", s$, [
            Se(ne(Lt), {
              id: "sfc-winds-input",
              class: "w-3/5",
              value: ne(i),
              "onUpdate:value": h[0] || (h[0] = (v) => et(i) ? i.value = v : null),
              min: 0
            }, {
              suffix: _e(() => [
                ot("kts")
              ]),
              _: 1
            }, 8, ["value"]),
            Se(ne(Lt), {
              class: "ml-4 w-1/2",
              id: "sfc-winds-dir-input",
              value: ne(a),
              "onUpdate:value": h[1] || (h[1] = (v) => et(a) ? a.value = v : null),
              min: 0,
              format: t
            }, {
              suffix: _e(() => [
                ot("°")
              ]),
              _: 1
            }, 8, ["value"])
          ])
        ]),
        _: 1
      }),
      Se(ne(_t), { label: "Winds at 2000" }, {
        default: _e(() => [
          Zo("div", d$, [
            Se(ne(Lt), {
              class: "w-3/5",
              id: "twok-wind-input",
              value: ne(l),
              "onUpdate:value": h[2] || (h[2] = (v) => et(l) ? l.value = v : null),
              min: 0
            }, {
              suffix: _e(() => [
                ot("kts")
              ]),
              _: 1
            }, 8, ["value"]),
            Se(ne(Lt), {
              class: "ml-4 w-1/2",
              id: "twok-wind-dir-input",
              value: ne(s),
              "onUpdate:value": h[3] || (h[3] = (v) => et(s) ? s.value = v : null),
              min: 0,
              format: t
            }, {
              suffix: _e(() => [
                ot("°")
              ]),
              _: 1
            }, 8, ["value"])
          ])
        ]),
        _: 1
      }),
      Se(ne(_t), { label: "Winds at 8000" }, {
        default: _e(() => [
          Zo("div", c$, [
            Se(ne(Lt), {
              class: "w-3/5",
              id: "eightk-wind-input",
              value: ne(d),
              "onUpdate:value": h[4] || (h[4] = (v) => et(d) ? d.value = v : null),
              min: 0
            }, {
              suffix: _e(() => [
                ot("kts")
              ]),
              _: 1
            }, 8, ["value"]),
            Se(ne(Lt), {
              class: "ml-4 w-1/2",
              id: "eightk-wind-dir-input",
              value: ne(c),
              "onUpdate:value": h[5] || (h[5] = (v) => et(c) ? c.value = v : null),
              min: 0,
              format: t
            }, {
              suffix: _e(() => [
                ot("°")
              ]),
              _: 1
            }, 8, ["value"])
          ])
        ]),
        _: 1
      }),
      Se(ne(Go), { class: "divider w-1/2" }),
      Se(ne(_t), { label: "Turbulence" }, {
        default: _e(() => [
          Se(ne(Lt), {
            id: "turbulence-input",
            class: "w-1/2 min-w-24",
            value: ne(r),
            "onUpdate:value": h[6] || (h[6] = (v) => et(r) ? r.value = v : null),
            size: "small",
            step: 3,
            min: 0,
            max: 197
          }, {
            suffix: _e(() => [
              ot(" 0.1* ft")
            ]),
            _: 1
          }, 8, ["value"])
        ]),
        _: 1
      })
    ]));
  }
}), f$ = { class: "flex flex-row w-full text-xl mt-2 font-sans font-semibold" }, h$ = { class: "flex justify-center flex-col w-1/2 h-full overflow-hidden pl-10" }, p$ = { class: "flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10 ml-8" }, v$ = /* @__PURE__ */ ge({
  __name: "App",
  setup(e) {
    const t = e$(), o = W(t.theme), r = W(t.getSelectedTheme), n = W(t.getThemeOverrides);
    return (i, a) => ($o(), rs(ne(Fy), {
      theme: r.value === "Dark" ? o.value : null,
      "theme-overrides": r.value === "Dark" ? n.value : null
    }, {
      default: _e(() => [
        Zo("div", f$, [
          Zo("div", h$, [
            Se(ne(Yl), { class: "border-b border-white border-solid border-1 mb-12" }, {
              default: _e(() => [
                ot(" Clouds & Atmosphere ")
              ]),
              _: 1
            }),
            Se(l$)
          ]),
          Zo("div", p$, [
            Se(ne(Yl), { class: "border-b border-white border-solid border-1 mb-12" }, {
              default: _e(() => [
                ot("Wind")
              ]),
              _: 1
            }),
            Se(u$)
          ])
        ])
      ]),
      _: 1
    }, 8, ["theme", "theme-overrides"]));
  }
});
const g$ = ju(), zc = bu(v$);
zc.use(g$);
zc.mount("#app");
export {
  x$ as inputWeather,
  ya as useWeatherStore
};
