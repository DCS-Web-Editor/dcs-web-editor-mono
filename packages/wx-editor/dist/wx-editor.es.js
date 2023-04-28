import { effectScope as Gl, ref as L, markRaw as Ft, toRaw as Pn, getCurrentInstance as Mr, inject as Be, watch as Ae, unref as lu, reactive as su, isRef as br, isReactive as Hi, toRef as $e, nextTick as zt, computed as R, getCurrentScope as du, onScopeDispose as cu, toRefs as xa, createTextVNode as et, Fragment as Qt, Comment as Li, isVNode as uu, defineComponent as xe, onBeforeUnmount as yt, readonly as ui, onMounted as wt, provide as _t, withDirectives as Or, h as m, Teleport as fu, renderSlot as Kl, onActivated as Yl, onDeactivated as Xl, mergeProps as Wi, onBeforeMount as Ni, watchEffect as ht, Transition as Xt, TransitionGroup as hu, vShow as Zl, cloneVNode as pu, onBeforeUpdate as vu, resolveComponent as nt, openBlock as yo, createBlock as Jl, withCtx as Re, createVNode as we, toDisplayString as Ql, createElementBlock as sr, createCommentVNode as Ln, createElementVNode as Go, createApp as gu } from "vue";
var es = !1;
function Lr(e, t, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
}
function Wn(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function mu() {
  return ts().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ts() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const bu = typeof Proxy == "function", xu = "devtools-plugin:setup", Cu = "plugin:settings:set";
let Fo, fi;
function yu() {
  var e;
  return Fo !== void 0 || (typeof window < "u" && window.performance ? (Fo = !0, fi = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (Fo = !0, fi = global.perf_hooks.performance) : Fo = !1), Fo;
}
function wu() {
  return yu() ? fi.now() : Date.now();
}
class Su {
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
        return wu();
      }
    }, o && o.on(Cu, (a, l) => {
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
function os(e, t) {
  const o = e, r = ts(), n = mu(), i = bu && o.enableEarlyProxy;
  if (n && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    n.emit(xu, e, t);
  else {
    const a = i ? new Su(o, n) : null;
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
let dr;
const xr = (e) => dr = e, rs = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function zo(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Lt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Lt || (Lt = {}));
const $n = typeof window < "u", fr = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && $n, Ca = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
function Pu(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
}
function ji(e, t, o) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    as(r.response, t, o);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function ns(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Qr(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const en = typeof navigator == "object" ? navigator : { userAgent: "" }, is = /* @__PURE__ */ (() => /Macintosh/.test(en.userAgent) && /AppleWebKit/.test(en.userAgent) && !/Safari/.test(en.userAgent))(), as = $n ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !is ? $u : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in en ? ku : (
      // Fallback to using FileReader and a popup
      Tu
    )
  )
) : () => {
};
function $u(e, t = "download", o) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? ns(r.href) ? ji(e, t, o) : (r.target = "_blank", Qr(r)) : Qr(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    Qr(r);
  }, 0));
}
function ku(e, t = "download", o) {
  if (typeof e == "string")
    if (ns(e))
      ji(e, t, o);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        Qr(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Pu(e, o), t);
}
function Tu(e, t, o, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return ji(e, t, o);
  const n = e.type === "application/octet-stream", i = /constructor/i.test(String(Ca.HTMLElement)) || "safari" in Ca, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || n && i || is) && typeof FileReader < "u") {
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
function at(e, t) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, t) : t === "error" ? console.error(o) : t === "warn" ? console.warn(o) : console.log(o);
}
function Vi(e) {
  return "_a" in e && "install" in e;
}
function ls() {
  if (!("clipboard" in navigator))
    return at("Your browser doesn't support the Clipboard API", "error"), !0;
}
function ss(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (at('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function zu(e) {
  if (!ls())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), at("Global state copied to clipboard.");
    } catch (t) {
      if (ss(t))
        return;
      at("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function _u(e) {
  if (!ls())
    try {
      e.state.value = JSON.parse(await navigator.clipboard.readText()), at("Global state pasted from clipboard.");
    } catch (t) {
      if (ss(t))
        return;
      at("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Iu(e) {
  try {
    as(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    at("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Gt;
function Mu() {
  Gt || (Gt = document.createElement("input"), Gt.type = "file", Gt.accept = ".json");
  function e() {
    return new Promise((t, o) => {
      Gt.onchange = async () => {
        const r = Gt.files;
        if (!r)
          return t(null);
        const n = r.item(0);
        return t(n ? { text: await n.text(), file: n } : null);
      }, Gt.oncancel = () => t(null), Gt.onerror = o, Gt.click();
    });
  }
  return e;
}
async function Ou(e) {
  try {
    const o = await (await Mu())();
    if (!o)
      return;
    const { text: r, file: n } = o;
    e.state.value = JSON.parse(r), at(`Global state imported from "${n.name}".`);
  } catch (t) {
    at("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function At(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const ds = "🍍 Pinia (root)", hi = "_root";
function Ru(e) {
  return Vi(e) ? {
    id: hi,
    label: ds
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Eu(e) {
  if (Vi(e)) {
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
function Bu(e) {
  return e ? Array.isArray(e) ? e.reduce((t, o) => (t.keys.push(o.key), t.operations.push(o.type), t.oldValue[o.key] = o.oldValue, t.newValue[o.key] = o.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: At(e.type),
    key: At(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Du(e) {
  switch (e) {
    case Lt.direct:
      return "mutation";
    case Lt.patchFunction:
      return "$patch";
    case Lt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Uo = !0;
const tn = [], bo = "pinia:mutations", ut = "pinia", { assign: Au } = Object, ln = (e) => "🍍 " + e;
function Fu(e, t) {
  os({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: tn,
    app: e
  }, (o) => {
    typeof o.now != "function" && at("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: bo,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: ut,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            zu(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await _u(t), o.sendInspectorTree(ut), o.sendInspectorState(ut);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Iu(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Ou(t), o.sendInspectorTree(ut), o.sendInspectorState(ut);
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
            n ? n._isOptionsAPI ? (n.$reset(), at(`Store "${r}" reset.`)) : at(`Cannot reset "${r}" store because it's a setup store.`, "warn") : at(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((r, n) => {
      const i = r.componentInstance && r.componentInstance.proxy;
      if (i && i._pStores) {
        const a = r.componentInstance.proxy._pStores;
        Object.values(a).forEach((l) => {
          r.instanceData.state.push({
            type: ln(l.$id),
            key: "state",
            editable: !0,
            value: l._isOptionsAPI ? {
              _custom: {
                value: Pn(l.$state),
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
            type: ln(l.$id),
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
      if (r.app === e && r.inspectorId === ut) {
        let n = [t];
        n = n.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : ds.toLowerCase().includes(r.filter.toLowerCase())) : n).map(Ru);
      }
    }), o.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === ut) {
        const n = r.nodeId === hi ? t : t._s.get(r.nodeId);
        if (!n)
          return;
        n && (r.state = Eu(n));
      }
    }), o.on.editInspectorState((r, n) => {
      if (r.app === e && r.inspectorId === ut) {
        const i = r.nodeId === hi ? t : t._s.get(r.nodeId);
        if (!i)
          return at(`store "${r.nodeId}" not found`, "error");
        const { path: a } = r;
        Vi(i) ? a.unshift("state") : (a.length !== 1 || !i._customProperties.has(a[0]) || a[0] in i.$state) && a.unshift("$state"), Uo = !1, r.set(i, a, r.state.value), Uo = !0;
      }
    }), o.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const n = r.type.replace(/^🍍\s*/, ""), i = t._s.get(n);
        if (!i)
          return at(`store "${n}" not found`, "error");
        const { path: a } = r;
        if (a[0] !== "state")
          return at(`Invalid path for store "${n}":
${a}
Only state can be modified.`);
        a[0] = "$state", Uo = !1, r.set(i, a, r.state.value), Uo = !0;
      }
    });
  });
}
function Hu(e, t) {
  tn.includes(ln(t.$id)) || tn.push(ln(t.$id)), os({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: tn,
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
      const c = cs++;
      o.addTimelineEvent({
        layerId: bo,
        event: {
          time: r(),
          title: "🛫 " + s,
          subtitle: "start",
          data: {
            store: At(t.$id),
            action: At(s),
            args: d
          },
          groupId: c
        }
      }), a((f) => {
        Co = void 0, o.addTimelineEvent({
          layerId: bo,
          event: {
            time: r(),
            title: "🛬 " + s,
            subtitle: "end",
            data: {
              store: At(t.$id),
              action: At(s),
              args: d,
              result: f
            },
            groupId: c
          }
        });
      }), l((f) => {
        Co = void 0, o.addTimelineEvent({
          layerId: bo,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + s,
            subtitle: "end",
            data: {
              store: At(t.$id),
              action: At(s),
              args: d,
              error: f
            },
            groupId: c
          }
        });
      });
    }, !0), t._customProperties.forEach((a) => {
      Ae(() => lu(t[a]), (l, s) => {
        o.notifyComponentUpdate(), o.sendInspectorState(ut), Uo && o.addTimelineEvent({
          layerId: bo,
          event: {
            time: r(),
            title: "Change",
            subtitle: a,
            data: {
              newValue: l,
              oldValue: s
            },
            groupId: Co
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: a, type: l }, s) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(ut), !Uo)
        return;
      const d = {
        time: r(),
        title: Du(l),
        data: Au({ store: At(t.$id) }, Bu(a)),
        groupId: Co
      };
      Co = void 0, l === Lt.patchFunction ? d.subtitle = "⤵️" : l === Lt.patchObject ? d.subtitle = "🧩" : a && !Array.isArray(a) && (d.subtitle = a.type), a && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: a
        }
      }), o.addTimelineEvent({
        layerId: bo,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const n = t._hotUpdate;
    t._hotUpdate = Ft((a) => {
      n(a), o.addTimelineEvent({
        layerId: bo,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: At(t.$id),
            info: At("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree(ut), o.sendInspectorState(ut);
    });
    const { $dispose: i } = t;
    t.$dispose = () => {
      i(), o.notifyComponentUpdate(), o.sendInspectorTree(ut), o.sendInspectorState(ut), o.getSettings().logStoreChanges && at(`Disposed "${t.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(ut), o.sendInspectorState(ut), o.getSettings().logStoreChanges && at(`"${t.$id}" store installed 🆕`);
  });
}
let cs = 0, Co;
function ya(e, t) {
  const o = t.reduce((r, n) => (r[n] = Pn(e)[n], r), {});
  for (const r in o)
    e[r] = function() {
      const n = cs, i = new Proxy(e, {
        get(...a) {
          return Co = n, Reflect.get(...a);
        },
        set(...a) {
          return Co = n, Reflect.set(...a);
        }
      });
      return o[r].apply(i, arguments);
    };
}
function Lu({ app: e, store: t, options: o }) {
  if (!t.$id.startsWith("__hot:")) {
    if (o.state && (t._isOptionsAPI = !0), typeof o.state == "function") {
      ya(
        // @ts-expect-error: can cast the store...
        t,
        Object.keys(o.actions)
      );
      const r = t._hotUpdate;
      Pn(t)._hotUpdate = function(n) {
        r.apply(this, arguments), ya(t, Object.keys(n._hmrPayload.actions));
      };
    }
    Hu(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function Wu() {
  const e = Gl(!0), t = e.run(() => L({}));
  let o = [], r = [];
  const n = Ft({
    install(i) {
      xr(n), n._a = i, i.provide(rs, n), i.config.globalProperties.$pinia = n, fr && Fu(i, n), r.forEach((a) => o.push(a)), r = [];
    },
    use(i) {
      return !this._a && !es ? r.push(i) : o.push(i), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return fr && typeof Proxy < "u" && n.use(Lu), n;
}
function us(e, t) {
  for (const o in t) {
    const r = t[o];
    if (!(o in e))
      continue;
    const n = e[o];
    zo(n) && zo(r) && !br(r) && !Hi(r) ? e[o] = us(n, r) : e[o] = r;
  }
  return e;
}
const fs = () => {
};
function wa(e, t, o, r = fs) {
  e.push(t);
  const n = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), r());
  };
  return !o && du() && cu(n), n;
}
function Ho(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
function pi(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, r) => e.set(r, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const r = t[o], n = e[o];
    zo(n) && zo(r) && e.hasOwnProperty(o) && !br(r) && !Hi(r) ? e[o] = pi(n, r) : e[o] = r;
  }
  return e;
}
const Nu = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function ju(e) {
  return !zo(e) || !e.hasOwnProperty(Nu);
}
const { assign: Ot } = Object;
function Sa(e) {
  return !!(br(e) && e.effect);
}
function Pa(e, t, o, r) {
  const { state: n, actions: i, getters: a } = t, l = o.state.value[e];
  let s;
  function d() {
    !l && (process.env.NODE_ENV === "production" || !r) && (o.state.value[e] = n ? n() : {});
    const c = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      xa(L(n ? n() : {}).value)
    ) : xa(o.state.value[e]);
    return Ot(c, i, Object.keys(a || {}).reduce((f, p) => (process.env.NODE_ENV !== "production" && p in c && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), f[p] = Ft(R(() => {
      xr(o);
      const v = o._s.get(e);
      return a[p].call(v, v);
    })), f), {}));
  }
  return s = vi(e, d, t, o, r, !0), s;
}
function vi(e, t, o = {}, r, n, i) {
  let a;
  const l = Ot({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const s = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !es && (s.onTrigger = (k) => {
    d ? v = k : d == !1 && !g._hotUpdating && (Array.isArray(v) ? v.push(k) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, c, f = Ft([]), p = Ft([]), v;
  const u = r.state.value[e];
  !i && !u && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
  const b = L({});
  let x;
  function h(k) {
    let $;
    d = c = !1, process.env.NODE_ENV !== "production" && (v = []), typeof k == "function" ? (k(r.state.value[e]), $ = {
      type: Lt.patchFunction,
      storeId: e,
      events: v
    }) : (pi(r.state.value[e], k), $ = {
      type: Lt.patchObject,
      payload: k,
      storeId: e,
      events: v
    });
    const C = x = Symbol();
    zt().then(() => {
      x === C && (d = !0);
    }), c = !0, Ho(f, $, r.state.value[e]);
  }
  const S = i ? function() {
    const { state: $ } = o, C = $ ? $() : {};
    this.$patch((T) => {
      Ot(T, C);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : fs
  );
  function E() {
    a.stop(), f = [], p = [], r._s.delete(e);
  }
  function w(k, $) {
    return function() {
      xr(r);
      const C = Array.from(arguments), T = [], M = [];
      function O(V) {
        T.push(V);
      }
      function G(V) {
        M.push(V);
      }
      Ho(p, {
        args: C,
        name: k,
        store: g,
        after: O,
        onError: G
      });
      let Y;
      try {
        Y = $.apply(this && this.$id === e ? this : g, C);
      } catch (V) {
        throw Ho(M, V), V;
      }
      return Y instanceof Promise ? Y.then((V) => (Ho(T, V), V)).catch((V) => (Ho(M, V), Promise.reject(V))) : (Ho(T, Y), Y);
    };
  }
  const z = /* @__PURE__ */ Ft({
    actions: {},
    getters: {},
    state: [],
    hotState: b
  }), I = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: wa.bind(null, p),
    $patch: h,
    $reset: S,
    $subscribe(k, $ = {}) {
      const C = wa(f, k, $.detached, () => T()), T = a.run(() => Ae(() => r.state.value[e], (M) => {
        ($.flush === "sync" ? c : d) && k({
          storeId: e,
          type: Lt.direct,
          events: v
        }, M);
      }, Ot({}, s, $)));
      return C;
    },
    $dispose: E
  }, g = su(process.env.NODE_ENV !== "production" || fr ? Ot(
    {
      _hmrPayload: z,
      _customProperties: Ft(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    I
    // must be added later
    // setupStore
  ) : I);
  r._s.set(e, g);
  const P = r._e.run(() => (a = Gl(), a.run(() => t())));
  for (const k in P) {
    const $ = P[k];
    if (br($) && !Sa($) || Hi($))
      process.env.NODE_ENV !== "production" && n ? Lr(b.value, k, $e(P, k)) : i || (u && ju($) && (br($) ? $.value = u[k] : pi($, u[k])), r.state.value[e][k] = $), process.env.NODE_ENV !== "production" && z.state.push(k);
    else if (typeof $ == "function") {
      const C = process.env.NODE_ENV !== "production" && n ? $ : w(k, $);
      P[k] = C, process.env.NODE_ENV !== "production" && (z.actions[k] = $), l.actions[k] = $;
    } else
      process.env.NODE_ENV !== "production" && Sa($) && (z.getters[k] = i ? (
        // @ts-expect-error
        o.getters[k]
      ) : $, $n && (P._getters || // @ts-expect-error: same
      (P._getters = Ft([]))).push(k));
  }
  if (Ot(g, P), Ot(Pn(g), P), Object.defineProperty(g, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? b.value : r.state.value[e],
    set: (k) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      h(($) => {
        Ot($, k);
      });
    }
  }), process.env.NODE_ENV !== "production" && (g._hotUpdate = Ft((k) => {
    g._hotUpdating = !0, k._hmrPayload.state.forEach(($) => {
      if ($ in g.$state) {
        const C = k.$state[$], T = g.$state[$];
        typeof C == "object" && zo(C) && zo(T) ? us(C, T) : k.$state[$] = T;
      }
      Lr(g, $, $e(k.$state, $));
    }), Object.keys(g.$state).forEach(($) => {
      $ in k.$state || Wn(g, $);
    }), d = !1, c = !1, r.state.value[e] = $e(k._hmrPayload, "hotState"), c = !0, zt().then(() => {
      d = !0;
    });
    for (const $ in k._hmrPayload.actions) {
      const C = k[$];
      Lr(g, $, w($, C));
    }
    for (const $ in k._hmrPayload.getters) {
      const C = k._hmrPayload.getters[$], T = i ? (
        // special handling of options api
        R(() => (xr(r), C.call(g, g)))
      ) : C;
      Lr(g, $, T);
    }
    Object.keys(g._hmrPayload.getters).forEach(($) => {
      $ in k._hmrPayload.getters || Wn(g, $);
    }), Object.keys(g._hmrPayload.actions).forEach(($) => {
      $ in k._hmrPayload.actions || Wn(g, $);
    }), g._hmrPayload = k._hmrPayload, g._getters = k._getters, g._hotUpdating = !1;
  })), fr) {
    const k = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach(($) => {
      Object.defineProperty(g, $, Ot({ value: g[$] }, k));
    });
  }
  return r._p.forEach((k) => {
    if (fr) {
      const $ = a.run(() => k({
        store: g,
        app: r._a,
        pinia: r,
        options: l
      }));
      Object.keys($ || {}).forEach((C) => g._customProperties.add(C)), Ot(g, $);
    } else
      Ot(g, a.run(() => k({
        store: g,
        app: r._a,
        pinia: r,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && g.$state && typeof g.$state == "object" && typeof g.$state.constructor == "function" && !g.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${g.$id}".`), u && i && o.hydrate && o.hydrate(g.$state, u), d = !0, c = !0, g;
}
function hs(e, t, o) {
  let r, n;
  const i = typeof t == "function";
  typeof e == "string" ? (r = e, n = i ? o : t) : (n = e, r = e.id);
  function a(l, s) {
    const d = Mr();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && dr && dr._testing ? null : l) || d && Be(rs, null), l && xr(l), process.env.NODE_ENV !== "production" && !dr)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    l = dr, l._s.has(r) || (i ? vi(r, t, n, l) : Pa(r, n, l), process.env.NODE_ENV !== "production" && (a._pinia = l));
    const c = l._s.get(r);
    if (process.env.NODE_ENV !== "production" && s) {
      const f = "__hot:" + r, p = i ? vi(f, t, n, l, !0) : Pa(f, Ot({}, n), l, !0);
      s._hotUpdate(p), delete l.state.value[f], l._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && $n && d && d.proxy && // avoid adding stores that are just built for hot module replacement
    !s) {
      const f = d.proxy, p = "_pStores" in f ? f._pStores : f._pStores = {};
      p[r] = c;
    }
    return c;
  }
  return a.$id = r, a;
}
let sn = [];
const ps = /* @__PURE__ */ new WeakMap();
function Vu() {
  sn.forEach((e) => e(...ps.get(e))), sn = [];
}
function vs(e, ...t) {
  ps.set(e, t), !sn.includes(e) && sn.push(e) === 1 && requestAnimationFrame(Vu);
}
function dn(e, t) {
  let { target: o } = e;
  for (; o; ) {
    if (o.dataset && o.dataset[t] !== void 0)
      return !0;
    o = o.parentElement;
  }
  return !1;
}
function Cr(e) {
  return e.composedPath()[0] || null;
}
function yr(e) {
  return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
}
function Wr(e) {
  if (e != null)
    return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
}
function on(e, t) {
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
function Uu(e, t) {
  const [o, r] = e.split(" ");
  return t ? t === "row" ? o : r : {
    row: o,
    col: r || o
  };
}
const $a = {
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
}, Zo = "^\\s*", Jo = "\\s*$", wo = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", So = "([0-9A-Fa-f])", Po = "([0-9A-Fa-f]{2})", qu = new RegExp(`${Zo}rgb\\s*\\(${wo},${wo},${wo}\\)${Jo}`), Gu = new RegExp(`${Zo}rgba\\s*\\(${wo},${wo},${wo},${wo}\\)${Jo}`), Ku = new RegExp(`${Zo}#${So}${So}${So}${Jo}`), Yu = new RegExp(`${Zo}#${Po}${Po}${Po}${Jo}`), Xu = new RegExp(`${Zo}#${So}${So}${So}${So}${Jo}`), Zu = new RegExp(`${Zo}#${Po}${Po}${Po}${Po}${Jo}`);
function Ct(e) {
  return parseInt(e, 16);
}
function Nt(e) {
  try {
    let t;
    if (t = Yu.exec(e))
      return [Ct(t[1]), Ct(t[2]), Ct(t[3]), 1];
    if (t = qu.exec(e))
      return [ft(t[1]), ft(t[5]), ft(t[9]), 1];
    if (t = Gu.exec(e))
      return [
        ft(t[1]),
        ft(t[5]),
        ft(t[9]),
        hr(t[13])
      ];
    if (t = Ku.exec(e))
      return [
        Ct(t[1] + t[1]),
        Ct(t[2] + t[2]),
        Ct(t[3] + t[3]),
        1
      ];
    if (t = Zu.exec(e))
      return [
        Ct(t[1]),
        Ct(t[2]),
        Ct(t[3]),
        hr(Ct(t[4]) / 255)
      ];
    if (t = Xu.exec(e))
      return [
        Ct(t[1] + t[1]),
        Ct(t[2] + t[2]),
        Ct(t[3] + t[3]),
        hr(Ct(t[4] + t[4]) / 255)
      ];
    if (e in $a)
      return Nt($a[e]);
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Ju(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function gi(e, t, o, r) {
  return `rgba(${ft(e)}, ${ft(t)}, ${ft(o)}, ${Ju(r)})`;
}
function Nn(e, t, o, r, n) {
  return ft((e * t * (1 - r) + o * r) / n);
}
function fe(e, t) {
  Array.isArray(e) || (e = Nt(e)), Array.isArray(t) || (t = Nt(t));
  const o = e[3], r = t[3], n = hr(o + r - o * r);
  return gi(Nn(e[0], o, t[0], r, n), Nn(e[1], o, t[1], r, n), Nn(e[2], o, t[2], r, n), n);
}
function K(e, t) {
  const [o, r, n, i = 1] = Array.isArray(e) ? e : Nt(e);
  return t.alpha ? gi(o, r, n, t.alpha) : gi(o, r, n, i);
}
function Je(e, t) {
  const [o, r, n, i = 1] = Array.isArray(e) ? e : Nt(e), { lightness: a = 1, alpha: l = 1 } = t;
  return Qu([o * a, r * a, n * a, i * l]);
}
function hr(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function ft(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function Qu(e) {
  const [t, o, r] = e;
  return 3 in e ? `rgba(${ft(t)}, ${ft(o)}, ${ft(r)}, ${hr(e[3])})` : `rgba(${ft(t)}, ${ft(o)}, ${ft(r)}, 1)`;
}
function cn(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function ef(e, t = "default", o = []) {
  const n = e.$slots[t];
  return n === void 0 ? o : n();
}
function tf(e, t = [], o) {
  const r = {};
  return t.forEach((n) => {
    r[n] = e[n];
  }), Object.assign(r, o);
}
function un(e, t = !0, o = []) {
  return e.forEach((r) => {
    if (r !== null) {
      if (typeof r != "object") {
        (typeof r == "string" || typeof r == "number") && o.push(et(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        un(r, t, o);
        return;
      }
      if (r.type === Qt) {
        if (r.children === null)
          return;
        Array.isArray(r.children) && un(r.children, t, o);
      } else
        r.type !== Li && o.push(r);
    }
  }), o;
}
function he(e, ...t) {
  if (Array.isArray(e))
    e.forEach((o) => he(o, ...t));
  else
    return e(...t);
}
const qo = (e, ...t) => typeof e == "function" ? e(...t) : typeof e == "string" ? et(e) : typeof e == "number" ? et(String(e)) : null, ka = /* @__PURE__ */ new Set();
function kt(e, t) {
  const o = `[naive/${e}]: ${t}`;
  ka.has(o) || (ka.add(o), console.error(o));
}
function wr(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function gs(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function of(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
function Ta(e, t = "default", o = void 0) {
  const r = e[t];
  if (!r)
    return wr("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const n = un(r(o));
  return n.length === 1 ? n[0] : (wr("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function Rr(e) {
  return e.some((t) => uu(t) ? !(t.type === Li || t.type === Qt && !Rr(t.children)) : !0) ? e : null;
}
function Yt(e, t) {
  return e && Rr(e()) || t();
}
function rf(e, t, o) {
  return e && Rr(e(t)) || o(t);
}
function mt(e, t) {
  const o = e && Rr(e());
  return t(o || null);
}
function mi(e) {
  return !(e && Rr(e()));
}
function jn(e) {
  const t = e.filter((o) => o !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (o) => {
      e.forEach((r) => {
        r && r(o);
      });
    };
}
const bi = xe({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), nf = /^(\d|\.)+$/, za = /(\d|\.)+/;
function Ko(e, { c: t = 1, offset: o = 0, attachPx: r = !0 } = {}) {
  if (typeof e == "number") {
    const n = (e + o) * t;
    return n === 0 ? "0" : `${n}px`;
  } else if (typeof e == "string")
    if (nf.test(e)) {
      const n = (Number(e) + o) * t;
      return r ? n === 0 ? "0" : `${n}px` : `${n}`;
    } else {
      const n = za.exec(e);
      return n ? e.replace(za, String((Number(n[0]) + o) * t)) : e;
    }
  return e;
}
function fn(e) {
  return e.replace(/#|\(|\)|,|\s/g, "_");
}
function af(e) {
  let t = 0;
  for (let o = 0; o < e.length; ++o)
    e[o] === "&" && ++t;
  return t;
}
const ms = /\s*,(?![^(]*\))\s*/g, lf = /\s+/g;
function sf(e, t) {
  const o = [];
  return t.split(ms).forEach((r) => {
    let n = af(r);
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
function df(e, t) {
  const o = [];
  return t.split(ms).forEach((r) => {
    e.forEach((n) => {
      o.push((n && n + " ") + r);
    });
  }), o;
}
function cf(e) {
  let t = [""];
  return e.forEach((o) => {
    o = o && o.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    o && (o.includes("&") ? t = sf(t, o) : t = df(t, o));
  }), t.join(", ").replace(lf, " ");
}
function _a(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function kn(e) {
  return document.querySelector(`style[cssr-id="${e}"]`);
}
function uf(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function Nr(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const ff = /[A-Z]/g;
function bs(e) {
  return e.replace(ff, (t) => "-" + t.toLowerCase());
}
function hf(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((o) => t + `  ${bs(o[0])}: ${o[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function pf(e, t, o) {
  return typeof e == "function" ? e({
    context: t.context,
    props: o
  }) : e;
}
function Ia(e, t, o, r) {
  if (!t)
    return "";
  const n = pf(t, o, r);
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
    l = bs(l), s != null && a.push(`  ${l}${hf(s)}`);
  }), e && a.push("}"), a.join(`
`);
}
function xi(e, t, o) {
  e && e.forEach((r) => {
    if (Array.isArray(r))
      xi(r, t, o);
    else if (typeof r == "function") {
      const n = r(t);
      Array.isArray(n) ? xi(n, t, o) : n && o(n);
    } else
      r && o(r);
  });
}
function xs(e, t, o, r, n, i) {
  const a = e.$;
  let l = "";
  if (!a || typeof a == "string")
    Nr(a) ? l = a : t.push(a);
  else if (typeof a == "function") {
    const c = a({
      context: r.context,
      props: n
    });
    Nr(c) ? l = c : t.push(c);
  } else if (a.before && a.before(r.context), !a.$ || typeof a.$ == "string")
    Nr(a.$) ? l = a.$ : t.push(a.$);
  else if (a.$) {
    const c = a.$({
      context: r.context,
      props: n
    });
    Nr(c) ? l = c : t.push(c);
  }
  const s = cf(t), d = Ia(s, e.props, r, n);
  l ? (o.push(`${l} {`), i && d && i.insertRule(`${l} {
${d}
}
`)) : (i && d && i.insertRule(d), !i && d.length && o.push(d)), e.children && xi(e.children, {
    context: r.context,
    props: n
  }, (c) => {
    if (typeof c == "string") {
      const f = Ia(s, { raw: c }, r, n);
      i ? i.insertRule(f) : o.push(f);
    } else
      xs(c, t, o, r, n, i);
  }), t.pop(), l && o.push("}"), a && a.after && a.after(r.context);
}
function Cs(e, t, o, r = !1) {
  const n = [];
  return xs(e, [], n, t, o, r ? e.instance.__styleSheet : void 0), r ? "" : n.join(`

`);
}
function Sr(e) {
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
function vf(e, t, o) {
  const { els: r } = t;
  if (o === void 0)
    r.forEach(_a), t.els = [];
  else {
    const n = kn(o);
    n && r.includes(n) && (_a(n), t.els = r.filter((i) => i !== n));
  }
}
function Ma(e, t) {
  e.push(t);
}
function gf(e, t, o, r, n, i, a, l, s) {
  if (i && !s) {
    if (o === void 0) {
      console.error("[css-render/mount]: `id` is required in `silent` mode.");
      return;
    }
    const p = window.__cssrContext;
    p[o] || (p[o] = !0, Cs(t, e, r, i));
    return;
  }
  let d;
  if (o === void 0 && (d = t.render(r), o = Sr(d)), s) {
    s.adapter(o, d ?? t.render(r));
    return;
  }
  const c = kn(o);
  if (c !== null && !a)
    return c;
  const f = c ?? uf(o);
  if (d === void 0 && (d = t.render(r)), f.textContent = d, c !== null)
    return c;
  if (l) {
    const p = document.head.querySelector(`meta[name="${l}"]`);
    if (p)
      return document.head.insertBefore(f, p), Ma(t.els, f), f;
  }
  return n ? document.head.insertBefore(f, document.head.querySelector("style, link")) : document.head.appendChild(f), Ma(t.els, f), f;
}
function mf(e) {
  return Cs(this, this.instance, e);
}
function bf(e = {}) {
  const { id: t, ssr: o, props: r, head: n = !1, silent: i = !1, force: a = !1, anchorMetaName: l } = e;
  return gf(this.instance, this, t, r, n, i, a, l, o);
}
function xf(e = {}) {
  const { id: t } = e;
  vf(this.instance, this, t);
}
const jr = function(e, t, o, r) {
  return {
    instance: e,
    $: t,
    props: o,
    children: r,
    els: [],
    render: mf,
    mount: bf,
    unmount: xf
  };
}, Cf = function(e, t, o, r) {
  return Array.isArray(t) ? jr(e, { $: null }, null, t) : Array.isArray(o) ? jr(e, t, null, o) : Array.isArray(r) ? jr(e, t, o, r) : jr(e, t, o, null);
};
function ys(e = {}) {
  let t = null;
  const o = {
    c: (...r) => Cf(o, ...r),
    use: (r, ...n) => r.install(o, ...n),
    find: kn,
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
function yf(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: o } } = t;
    return o.has(e);
  }
  return kn(e) !== null;
}
function wf(e) {
  let t = ".", o = "__", r = "--", n;
  if (e) {
    let u = e.blockPrefix;
    u && (t = u), u = e.elementPrefix, u && (o = u), u = e.modifierPrefix, u && (r = u);
  }
  const i = {
    install(u) {
      n = u.c;
      const b = u.context;
      b.bem = {}, b.bem.b = null, b.bem.els = null;
    }
  };
  function a(u) {
    let b, x;
    return {
      before(h) {
        b = h.bem.b, x = h.bem.els, h.bem.els = null;
      },
      after(h) {
        h.bem.b = b, h.bem.els = x;
      },
      $({ context: h, props: S }) {
        return u = typeof u == "string" ? u : u({ context: h, props: S }), h.bem.b = u, `${(S == null ? void 0 : S.bPrefix) || t}${h.bem.b}`;
      }
    };
  }
  function l(u) {
    let b;
    return {
      before(x) {
        b = x.bem.els;
      },
      after(x) {
        x.bem.els = b;
      },
      $({ context: x, props: h }) {
        return u = typeof u == "string" ? u : u({ context: x, props: h }), x.bem.els = u.split(",").map((S) => S.trim()), x.bem.els.map((S) => `${(h == null ? void 0 : h.bPrefix) || t}${x.bem.b}${o}${S}`).join(", ");
      }
    };
  }
  function s(u) {
    return {
      $({ context: b, props: x }) {
        u = typeof u == "string" ? u : u({ context: b, props: x });
        const h = u.split(",").map((w) => w.trim());
        function S(w) {
          return h.map((z) => `&${(x == null ? void 0 : x.bPrefix) || t}${b.bem.b}${w !== void 0 ? `${o}${w}` : ""}${r}${z}`).join(", ");
        }
        const E = b.bem.els;
        if (E !== null) {
          if (process.env.NODE_ENV !== "production" && E.length >= 2)
            throw Error(`[css-render/plugin-bem]: m(${u}) is invalid, using modifier inside multiple elements is not allowed`);
          return S(E[0]);
        } else
          return S();
      }
    };
  }
  function d(u) {
    return {
      $({ context: b, props: x }) {
        u = typeof u == "string" ? u : u({ context: b, props: x });
        const h = b.bem.els;
        if (process.env.NODE_ENV !== "production" && h !== null && h.length >= 2)
          throw Error(`[css-render/plugin-bem]: notM(${u}) is invalid, using modifier inside multiple elements is not allowed`);
        return `&:not(${(x == null ? void 0 : x.bPrefix) || t}${b.bem.b}${h !== null && h.length > 0 ? `${o}${h[0]}` : ""}${r}${u})`;
      }
    };
  }
  return Object.assign(i, {
    cB: (...u) => n(a(u[0]), u[1], u[2]),
    cE: (...u) => n(l(u[0]), u[1], u[2]),
    cM: (...u) => n(s(u[0]), u[1], u[2]),
    cNotM: (...u) => n(d(u[0]), u[1], u[2])
  }), i;
}
function oe(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (o) => o.toUpperCase()));
}
oe("abc", "def");
const Sf = "n", hn = `.${Sf}-`, Pf = "__", $f = "--", ws = ys(), Ss = wf({
  blockPrefix: hn,
  elementPrefix: Pf,
  modifierPrefix: $f
});
ws.use(Ss);
const { c: W, find: _P } = ws, { cB: B, cE: A, cM: J, cNotM: Qe } = Ss;
function Ps(e) {
  return W(({ props: { bPrefix: t } }) => `${t || hn}modal, ${t || hn}drawer`, [e]);
}
function $s(e) {
  return W(({ props: { bPrefix: t } }) => `${t || hn}popover`, [e]);
}
const kf = (...e) => W(">", [B(...e)]);
let Vn;
function Tf() {
  return Vn === void 0 && (Vn = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Vn;
}
const Er = typeof document < "u" && typeof window < "u", zf = /* @__PURE__ */ new WeakSet();
function _f(e) {
  zf.add(e);
}
function If(e, t, o) {
  var r;
  const n = Be(e, null);
  if (n === null)
    return;
  const i = (r = Mr()) === null || r === void 0 ? void 0 : r.proxy;
  Ae(o, a), a(o.value), yt(() => {
    a(void 0, o.value);
  });
  function a(d, c) {
    const f = n[t];
    c !== void 0 && l(f, c), d !== void 0 && s(f, d);
  }
  function l(d, c) {
    d[c] || (d[c] = []), d[c].splice(d[c].findIndex((f) => f === i), 1);
  }
  function s(d, c) {
    d[c] || (d[c] = []), ~d[c].findIndex((f) => f === i) || d[c].push(i);
  }
}
function Mf(e) {
  const t = L(!!e.value);
  if (t.value)
    return ui(t);
  const o = Ae(e, (r) => {
    r && (t.value = !0, o());
  });
  return ui(t);
}
function Xe(e) {
  const t = R(e), o = L(t.value);
  return Ae(t, (r) => {
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
const Of = typeof window < "u";
let Yo, pr;
const Rf = () => {
  var e, t;
  Yo = Of ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, pr = !1, Yo !== void 0 ? Yo.then(() => {
    pr = !0;
  }) : pr = !0;
};
Rf();
function Ef(e) {
  if (pr)
    return;
  let t = !1;
  wt(() => {
    pr || Yo == null || Yo.then(() => {
      t || e();
    });
  }), yt(() => {
    t = !0;
  });
}
function rn(e) {
  return e.composedPath()[0];
}
const Bf = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function Df(e, t, o) {
  if (e === "mousemoveoutside") {
    const r = (n) => {
      t.contains(rn(n)) || o(n);
    };
    return {
      mousemove: r,
      touchstart: r
    };
  } else if (e === "clickoutside") {
    let r = !1;
    const n = (a) => {
      r = !t.contains(rn(a));
    }, i = (a) => {
      r && (t.contains(rn(a)) || o(a));
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
function ks(e, t, o) {
  const r = Bf[e];
  let n = r.get(t);
  n === void 0 && r.set(t, n = /* @__PURE__ */ new WeakMap());
  let i = n.get(o);
  return i === void 0 && n.set(o, i = Df(e, t, o)), i;
}
function Af(e, t, o, r) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const n = ks(e, t, o);
    return Object.keys(n).forEach((i) => {
      Ke(i, document, n[i], r);
    }), !0;
  }
  return !1;
}
function Ff(e, t, o, r) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const n = ks(e, t, o);
    return Object.keys(n).forEach((i) => {
      qe(i, document, n[i], r);
    }), !0;
  }
  return !1;
}
function Hf() {
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
  function n(g, P, k) {
    const $ = g[P];
    return g[P] = function() {
      return k.apply(g, arguments), $.apply(g, arguments);
    }, g;
  }
  function i(g, P) {
    g[P] = Event.prototype[P];
  }
  const a = /* @__PURE__ */ new WeakMap(), l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var g;
    return (g = a.get(this)) !== null && g !== void 0 ? g : null;
  }
  function d(g, P) {
    l !== void 0 && Object.defineProperty(g, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: P ?? l.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, f = {};
  function p() {
    const g = function(P) {
      const { type: k, eventPhase: $, bubbles: C } = P, T = rn(P);
      if ($ === 2)
        return;
      const M = $ === 1 ? "capture" : "bubble";
      let O = T;
      const G = [];
      for (; O === null && (O = window), G.push(O), O !== window; )
        O = O.parentNode || null;
      const Y = c.capture[k], V = c.bubble[k];
      if (n(P, "stopPropagation", o), n(P, "stopImmediatePropagation", r), d(P, s), M === "capture") {
        if (Y === void 0)
          return;
        for (let ne = G.length - 1; ne >= 0 && !e.has(P); --ne) {
          const H = G[ne], U = Y.get(H);
          if (U !== void 0) {
            a.set(P, H);
            for (const de of U) {
              if (t.has(P))
                break;
              de(P);
            }
          }
          if (ne === 0 && !C && V !== void 0) {
            const de = V.get(H);
            if (de !== void 0)
              for (const Se of de) {
                if (t.has(P))
                  break;
                Se(P);
              }
          }
        }
      } else if (M === "bubble") {
        if (V === void 0)
          return;
        for (let ne = 0; ne < G.length && !e.has(P); ++ne) {
          const H = G[ne], U = V.get(H);
          if (U !== void 0) {
            a.set(P, H);
            for (const de of U) {
              if (t.has(P))
                break;
              de(P);
            }
          }
        }
      }
      i(P, "stopPropagation"), i(P, "stopImmediatePropagation"), d(P);
    };
    return g.displayName = "evtdUnifiedHandler", g;
  }
  function v() {
    const g = function(P) {
      const { type: k, eventPhase: $ } = P;
      if ($ !== 2)
        return;
      const C = f[k];
      C !== void 0 && C.forEach((T) => T(P));
    };
    return g.displayName = "evtdUnifiedWindowEventHandler", g;
  }
  const u = p(), b = v();
  function x(g, P) {
    const k = c[g];
    return k[P] === void 0 && (k[P] = /* @__PURE__ */ new Map(), window.addEventListener(P, u, g === "capture")), k[P];
  }
  function h(g) {
    return f[g] === void 0 && (f[g] = /* @__PURE__ */ new Set(), window.addEventListener(g, b)), f[g];
  }
  function S(g, P) {
    let k = g.get(P);
    return k === void 0 && g.set(P, k = /* @__PURE__ */ new Set()), k;
  }
  function E(g, P, k, $) {
    const C = c[P][k];
    if (C !== void 0) {
      const T = C.get(g);
      if (T !== void 0 && T.has($))
        return !0;
    }
    return !1;
  }
  function w(g, P) {
    const k = f[g];
    return !!(k !== void 0 && k.has(P));
  }
  function z(g, P, k, $) {
    let C;
    if (typeof $ == "object" && $.once === !0 ? C = (Y) => {
      I(g, P, C, $), k(Y);
    } : C = k, Af(g, P, C, $))
      return;
    const M = $ === !0 || typeof $ == "object" && $.capture === !0 ? "capture" : "bubble", O = x(M, g), G = S(O, P);
    if (G.has(C) || G.add(C), P === window) {
      const Y = h(g);
      Y.has(C) || Y.add(C);
    }
  }
  function I(g, P, k, $) {
    if (Ff(g, P, k, $))
      return;
    const T = $ === !0 || typeof $ == "object" && $.capture === !0, M = T ? "capture" : "bubble", O = x(M, g), G = S(O, P);
    if (P === window && !E(P, T ? "bubble" : "capture", g, k) && w(g, k)) {
      const V = f[g];
      V.delete(k), V.size === 0 && (window.removeEventListener(g, b), f[g] = void 0);
    }
    G.has(k) && G.delete(k), G.size === 0 && O.delete(P), O.size === 0 && (window.removeEventListener(g, u, M === "capture"), c[M][g] = void 0);
  }
  return {
    on: z,
    off: I
  };
}
const { on: Ke, off: qe } = Hf();
function so(e, t) {
  return Ae(e, (o) => {
    o !== void 0 && (t.value = o);
  }), R(() => e.value === void 0 ? t.value : e.value);
}
function Br() {
  const e = L(!1);
  return wt(() => {
    e.value = !0;
  }), ui(e);
}
function Ts(e, t) {
  return R(() => {
    for (const o of t)
      if (e[o] !== void 0)
        return e[o];
    return e[t[t.length - 1]];
  });
}
const Lf = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function Wf() {
  return Lf;
}
const Ui = "n-internal-select-menu", zs = "n-internal-select-menu-body", _s = "n-modal-body", Is = "n-drawer-body", Ms = "n-popover-body", Os = "__disabled__";
function Rt(e) {
  const t = Be(_s, null), o = Be(Is, null), r = Be(Ms, null), n = Be(zs, null), i = L();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    wt(() => {
      Ke("fullscreenchange", document, a);
    }), yt(() => {
      qe("fullscreenchange", document, a);
    });
  }
  return Xe(() => {
    var a;
    const { to: l } = e;
    return l !== void 0 ? l === !1 ? Os : l === !0 ? i.value || "body" : l : t != null && t.value ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : o != null && o.value ? o.value : r != null && r.value ? r.value : n != null && n.value ? n.value : l ?? (i.value || "body");
  });
}
Rt.tdkey = Os;
Rt.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
function Ci(e, t, o = "default") {
  const r = t[o];
  if (r === void 0)
    throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
  return r();
}
function yi(e, t = !0, o = []) {
  return e.forEach((r) => {
    if (r !== null) {
      if (typeof r != "object") {
        (typeof r == "string" || typeof r == "number") && o.push(et(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        yi(r, t, o);
        return;
      }
      if (r.type === Qt) {
        if (r.children === null)
          return;
        Array.isArray(r.children) && yi(r.children, t, o);
      } else
        r.type !== Li && o.push(r);
    }
  }), o;
}
function Oa(e, t, o = "default") {
  const r = t[o];
  if (r === void 0)
    throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
  const n = yi(r());
  if (n.length === 1)
    return n[0];
  throw new Error(`[vueuc/${e}]: slot[${o}] should have exactly one child.`);
}
let io = null;
function Rs() {
  if (io === null && (io = document.getElementById("v-binder-view-measurer"), io === null)) {
    io = document.createElement("div"), io.id = "v-binder-view-measurer";
    const { style: e } = io;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(io);
  }
  return io.getBoundingClientRect();
}
function Nf(e, t) {
  const o = Rs();
  return {
    top: t,
    left: e,
    height: 0,
    width: 0,
    right: o.width - e,
    bottom: o.height - t
  };
}
function Un(e) {
  const t = e.getBoundingClientRect(), o = Rs();
  return {
    left: t.left - o.left,
    top: t.top - o.top,
    bottom: o.height + o.top - t.bottom,
    right: o.width + o.left - t.right,
    width: t.width,
    height: t.height
  };
}
function jf(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Es(e) {
  if (e === null)
    return null;
  const t = jf(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: o, overflowX: r, overflowY: n } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(o + n + r))
      return t;
  }
  return Es(t);
}
const Vf = xe({
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
    _t("VBinder", (t = Mr()) === null || t === void 0 ? void 0 : t.proxy);
    const o = Be("VBinder", null), r = L(null), n = (h) => {
      r.value = h, o && e.syncTargetWithParent && o.setTargetRef(h);
    };
    let i = [];
    const a = () => {
      let h = r.value;
      for (; h = Es(h), h !== null; )
        i.push(h);
      for (const S of i)
        Ke("scroll", S, f, !0);
    }, l = () => {
      for (const h of i)
        qe("scroll", h, f, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (h) => {
      s.size === 0 && a(), s.has(h) || s.add(h);
    }, c = (h) => {
      s.has(h) && s.delete(h), s.size === 0 && l();
    }, f = () => {
      vs(p);
    }, p = () => {
      s.forEach((h) => h());
    }, v = /* @__PURE__ */ new Set(), u = (h) => {
      v.size === 0 && Ke("resize", window, x), v.has(h) || v.add(h);
    }, b = (h) => {
      v.has(h) && v.delete(h), v.size === 0 && qe("resize", window, x);
    }, x = () => {
      v.forEach((h) => h());
    };
    return yt(() => {
      qe("resize", window, x), l();
    }), {
      targetRef: r,
      setTargetRef: n,
      addScrollListener: d,
      removeScrollListener: c,
      addResizeListener: u,
      removeResizeListener: b
    };
  },
  render() {
    return Ci("binder", this.$slots);
  }
}), qi = Vf, Gi = xe({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = Be("VBinder");
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
    return e ? Or(Oa("follower", this.$slots), [
      [t]
    ]) : Oa("follower", this.$slots);
  }
}), Lo = "@@mmoContext", Uf = {
  mounted(e, { value: t }) {
    e[Lo] = {
      handler: void 0
    }, typeof t == "function" && (e[Lo].handler = t, Ke("mousemoveoutside", e, t));
  },
  updated(e, { value: t }) {
    const o = e[Lo];
    typeof t == "function" ? o.handler ? o.handler !== t && (qe("mousemoveoutside", e, o.handler), o.handler = t, Ke("mousemoveoutside", e, t)) : (e[Lo].handler = t, Ke("mousemoveoutside", e, t)) : o.handler && (qe("mousemoveoutside", e, o.handler), o.handler = void 0);
  },
  unmounted(e) {
    const { handler: t } = e[Lo];
    t && qe("mousemoveoutside", e, t), e[Lo].handler = void 0;
  }
}, qf = Uf, Wo = "@@coContext", Gf = {
  mounted(e, { value: t, modifiers: o }) {
    e[Wo] = {
      handler: void 0
    }, typeof t == "function" && (e[Wo].handler = t, Ke("clickoutside", e, t, {
      capture: o.capture
    }));
  },
  updated(e, { value: t, modifiers: o }) {
    const r = e[Wo];
    typeof t == "function" ? r.handler ? r.handler !== t && (qe("clickoutside", e, r.handler, {
      capture: o.capture
    }), r.handler = t, Ke("clickoutside", e, t, {
      capture: o.capture
    })) : (e[Wo].handler = t, Ke("clickoutside", e, t, {
      capture: o.capture
    })) : r.handler && (qe("clickoutside", e, r.handler, {
      capture: o.capture
    }), r.handler = void 0);
  },
  unmounted(e, { modifiers: t }) {
    const { handler: o } = e[Wo];
    o && qe("clickoutside", e, o, {
      capture: t.capture
    }), e[Wo].handler = void 0;
  }
}, pn = Gf;
function Kf(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class Yf {
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
    r.has(t) ? r.delete(t) : o === void 0 && Kf("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const qn = new Yf(), No = "@@ziContext", Xf = {
  mounted(e, t) {
    const { value: o = {} } = t, { zIndex: r, enabled: n } = o;
    e[No] = {
      enabled: !!n,
      initialized: !1
    }, n && (qn.ensureZIndex(e, r), e[No].initialized = !0);
  },
  updated(e, t) {
    const { value: o = {} } = t, { zIndex: r, enabled: n } = o, i = e[No].enabled;
    n && !i && (qn.ensureZIndex(e, r), e[No].initialized = !0), e[No].enabled = !!n;
  },
  unmounted(e, t) {
    if (!e[No].initialized)
      return;
    const { value: o = {} } = t, { zIndex: r } = o;
    qn.unregister(e, r);
  }
}, Bs = Xf, Ds = Symbol("@css-render/vue3-ssr");
function Zf(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function Jf(e, t) {
  const o = Be(Ds, null);
  if (o === null) {
    console.error("[css-render/vue3-ssr]: no ssr context found.");
    return;
  }
  const { styles: r, ids: n } = o;
  n.has(e) || r !== null && (n.add(e), r.push(Zf(e, t)));
}
const Qf = typeof document < "u";
function Io() {
  if (Qf)
    return;
  const e = Be(Ds, null);
  if (e !== null)
    return {
      adapter: Jf,
      context: e
    };
}
function Ra(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: lo } = ys(), Ki = "vueuc-style";
function Ea(e) {
  return e & -e;
}
class eh {
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
      n[t] += o, t += Ea(t);
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
      i += o[t], t -= Ea(t);
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
function Ba(e) {
  return typeof e == "string" ? document.querySelector(e) : e();
}
const th = xe({
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
      showTeleport: Mf($e(e, "show")),
      mergedTo: R(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? Ci("lazy-teleport", this.$slots) : m(fu, {
      disabled: this.disabled,
      to: this.mergedTo
    }, Ci("lazy-teleport", this.$slots)) : null;
  }
}), Vr = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Da = {
  start: "end",
  center: "center",
  end: "start"
}, Gn = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, oh = {
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
}, rh = {
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
}, nh = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, Aa = {
  top: !0,
  bottom: !1,
  left: !0,
  right: !1
  // left--
}, Fa = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function ih(e, t, o, r, n, i) {
  if (!n || i)
    return { placement: e, top: 0, left: 0 };
  const [a, l] = e.split("-");
  let s = l ?? "center", d = {
    top: 0,
    left: 0
  };
  const c = (v, u, b) => {
    let x = 0, h = 0;
    const S = o[v] - t[u] - t[v];
    return S > 0 && r && (b ? h = Aa[u] ? S : -S : x = Aa[u] ? S : -S), {
      left: x,
      top: h
    };
  }, f = a === "left" || a === "right";
  if (s !== "center") {
    const v = nh[e], u = Vr[v], b = Gn[v];
    if (o[b] > t[b]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[v] + t[b] < o[b]
      ) {
        const x = (o[b] - t[b]) / 2;
        t[v] < x || t[u] < x ? t[v] < t[u] ? (s = Da[l], d = c(b, u, f)) : d = c(b, v, f) : s = "center";
      }
    } else
      o[b] < t[b] && t[u] < 0 && // opposite align has larger space
      // ------------[   target   ]
      // ----------------[follower]
      t[v] > t[u] && (s = Da[l]);
  } else {
    const v = a === "bottom" || a === "top" ? "left" : "top", u = Vr[v], b = Gn[v], x = (o[b] - t[b]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[v] < x || t[u] < x) && (t[v] > t[u] ? (s = Fa[v], d = c(b, v, f)) : (s = Fa[u], d = c(b, u, f)));
  }
  let p = a;
  return (
    // space is not enough
    t[a] < o[Gn[a]] && // opposite position's space is larger
    t[a] < t[Vr[a]] && (p = Vr[a]), {
      placement: s !== "center" ? `${p}-${s}` : p,
      left: d.left,
      top: d.top
    }
  );
}
function ah(e, t) {
  return t ? rh[e] : oh[e];
}
function lh(e, t, o, r, n, i) {
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
const sh = lo([
  lo(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  lo(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    lo("> *", {
      pointerEvents: "all"
    })
  ])
]), Yi = xe({
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
    const t = Be("VBinder"), o = Xe(() => e.enabled !== void 0 ? e.enabled : e.show), r = L(null), n = L(null), i = () => {
      const { syncTrigger: p } = e;
      p.includes("scroll") && t.addScrollListener(s), p.includes("resize") && t.addResizeListener(s);
    }, a = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    wt(() => {
      o.value && (s(), i());
    });
    const l = Io();
    sh.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: Ki,
      ssr: l
    }), yt(() => {
      a();
    }), Ef(() => {
      o.value && s();
    });
    const s = () => {
      if (!o.value)
        return;
      const p = r.value;
      if (p === null)
        return;
      const v = t.targetRef, { x: u, y: b, overlap: x } = e, h = u !== void 0 && b !== void 0 ? Nf(u, b) : Un(v);
      p.style.setProperty("--v-target-width", `${Math.round(h.width)}px`), p.style.setProperty("--v-target-height", `${Math.round(h.height)}px`);
      const { width: S, minWidth: E, placement: w, internalShift: z, flip: I } = e;
      p.setAttribute("v-placement", w), x ? p.setAttribute("v-overlap", "") : p.removeAttribute("v-overlap");
      const { style: g } = p;
      S === "target" ? g.width = `${h.width}px` : S !== void 0 ? g.width = S : g.width = "", E === "target" ? g.minWidth = `${h.width}px` : E !== void 0 ? g.minWidth = E : g.minWidth = "";
      const P = Un(p), k = Un(n.value), { left: $, top: C, placement: T } = ih(w, h, P, z, I, x), M = ah(T, x), { left: O, top: G, transform: Y } = lh(T, k, h, C, $, x);
      p.setAttribute("v-placement", T), p.style.setProperty("--v-offset-left", `${Math.round($)}px`), p.style.setProperty("--v-offset-top", `${Math.round(C)}px`), p.style.transform = `translateX(${O}) translateY(${G}) ${Y}`, p.style.setProperty("--v-transform-origin", M), p.style.transformOrigin = M;
    };
    Ae(o, (p) => {
      p ? (i(), d()) : a();
    });
    const d = () => {
      zt().then(s).catch((p) => console.error(p));
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
    ].forEach((p) => {
      Ae($e(e, p), s);
    }), ["teleportDisabled"].forEach((p) => {
      Ae($e(e, p), d);
    }), Ae($e(e, "syncTrigger"), (p) => {
      p.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), p.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = Br(), f = Xe(() => {
      const { to: p } = e;
      if (p !== void 0)
        return p;
      c.value;
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
    return m(th, {
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
        return this.zindexable ? Or(o, [
          [
            Bs,
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
var ko = [], dh = function() {
  return ko.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, ch = function() {
  return ko.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, Ha = "ResizeObserver loop completed with undelivered notifications.", uh = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: Ha
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Ha), window.dispatchEvent(e);
}, Pr;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(Pr || (Pr = {}));
var To = function(e) {
  return Object.freeze(e);
}, fh = function() {
  function e(t, o) {
    this.inlineSize = t, this.blockSize = o, To(this);
  }
  return e;
}(), As = function() {
  function e(t, o, r, n) {
    return this.x = t, this.y = o, this.width = r, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, To(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, o = t.x, r = t.y, n = t.top, i = t.right, a = t.bottom, l = t.left, s = t.width, d = t.height;
    return { x: o, y: r, top: n, right: i, bottom: a, left: l, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), Xi = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, Fs = function(e) {
  if (Xi(e)) {
    var t = e.getBBox(), o = t.width, r = t.height;
    return !o && !r;
  }
  var n = e, i = n.offsetWidth, a = n.offsetHeight;
  return !(i || a || e.getClientRects().length);
}, La = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var o = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(o && e instanceof o.Element);
}, hh = function(e) {
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
}, vr = typeof window < "u" ? window : {}, Ur = /* @__PURE__ */ new WeakMap(), Wa = /auto|scroll/, ph = /^tb|vertical/, vh = /msie|trident/i.test(vr.navigator && vr.navigator.userAgent), Ht = function(e) {
  return parseFloat(e || "0");
}, Xo = function(e, t, o) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), o === void 0 && (o = !1), new fh((o ? t : e) || 0, (o ? e : t) || 0);
}, Na = To({
  devicePixelContentBoxSize: Xo(),
  borderBoxSize: Xo(),
  contentBoxSize: Xo(),
  contentRect: new As(0, 0, 0, 0)
}), Hs = function(e, t) {
  if (t === void 0 && (t = !1), Ur.has(e) && !t)
    return Ur.get(e);
  if (Fs(e))
    return Ur.set(e, Na), Na;
  var o = getComputedStyle(e), r = Xi(e) && e.ownerSVGElement && e.getBBox(), n = !vh && o.boxSizing === "border-box", i = ph.test(o.writingMode || ""), a = !r && Wa.test(o.overflowY || ""), l = !r && Wa.test(o.overflowX || ""), s = r ? 0 : Ht(o.paddingTop), d = r ? 0 : Ht(o.paddingRight), c = r ? 0 : Ht(o.paddingBottom), f = r ? 0 : Ht(o.paddingLeft), p = r ? 0 : Ht(o.borderTopWidth), v = r ? 0 : Ht(o.borderRightWidth), u = r ? 0 : Ht(o.borderBottomWidth), b = r ? 0 : Ht(o.borderLeftWidth), x = f + d, h = s + c, S = b + v, E = p + u, w = l ? e.offsetHeight - E - e.clientHeight : 0, z = a ? e.offsetWidth - S - e.clientWidth : 0, I = n ? x + S : 0, g = n ? h + E : 0, P = r ? r.width : Ht(o.width) - I - z, k = r ? r.height : Ht(o.height) - g - w, $ = P + x + z + S, C = k + h + w + E, T = To({
    devicePixelContentBoxSize: Xo(Math.round(P * devicePixelRatio), Math.round(k * devicePixelRatio), i),
    borderBoxSize: Xo($, C, i),
    contentBoxSize: Xo(P, k, i),
    contentRect: new As(f, s, P, k)
  });
  return Ur.set(e, T), T;
}, Ls = function(e, t, o) {
  var r = Hs(e, o), n = r.borderBoxSize, i = r.contentBoxSize, a = r.devicePixelContentBoxSize;
  switch (t) {
    case Pr.DEVICE_PIXEL_CONTENT_BOX:
      return a;
    case Pr.BORDER_BOX:
      return n;
    default:
      return i;
  }
}, gh = function() {
  function e(t) {
    var o = Hs(t);
    this.target = t, this.contentRect = o.contentRect, this.borderBoxSize = To([o.borderBoxSize]), this.contentBoxSize = To([o.contentBoxSize]), this.devicePixelContentBoxSize = To([o.devicePixelContentBoxSize]);
  }
  return e;
}(), Ws = function(e) {
  if (Fs(e))
    return 1 / 0;
  for (var t = 0, o = e.parentNode; o; )
    t += 1, o = o.parentNode;
  return t;
}, mh = function() {
  var e = 1 / 0, t = [];
  ko.forEach(function(a) {
    if (a.activeTargets.length !== 0) {
      var l = [];
      a.activeTargets.forEach(function(d) {
        var c = new gh(d.target), f = Ws(d.target);
        l.push(c), d.lastReportedSize = Ls(d.target, d.observedBox), f < e && (e = f);
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
}, ja = function(e) {
  ko.forEach(function(o) {
    o.activeTargets.splice(0, o.activeTargets.length), o.skippedTargets.splice(0, o.skippedTargets.length), o.observationTargets.forEach(function(n) {
      n.isActive() && (Ws(n.target) > e ? o.activeTargets.push(n) : o.skippedTargets.push(n));
    });
  });
}, bh = function() {
  var e = 0;
  for (ja(e); dh(); )
    e = mh(), ja(e);
  return ch() && uh(), e > 0;
}, Kn, Ns = [], xh = function() {
  return Ns.splice(0).forEach(function(e) {
    return e();
  });
}, Ch = function(e) {
  if (!Kn) {
    var t = 0, o = document.createTextNode(""), r = { characterData: !0 };
    new MutationObserver(function() {
      return xh();
    }).observe(o, r), Kn = function() {
      o.textContent = "".concat(t ? t-- : t++);
    };
  }
  Ns.push(e), Kn();
}, yh = function(e) {
  Ch(function() {
    requestAnimationFrame(e);
  });
}, nn = 0, wh = function() {
  return !!nn;
}, Sh = 250, Ph = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Va = [
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
], Ua = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, Yn = !1, $h = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var o = this;
    if (t === void 0 && (t = Sh), !Yn) {
      Yn = !0;
      var r = Ua(t);
      yh(function() {
        var n = !1;
        try {
          n = bh();
        } finally {
          if (Yn = !1, t = r - Ua(), !wh())
            return;
          n ? o.run(1e3) : t > 0 ? o.run(t) : o.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, o = function() {
      return t.observer && t.observer.observe(document.body, Ph);
    };
    document.body ? o() : vr.addEventListener("DOMContentLoaded", o);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Va.forEach(function(o) {
      return vr.addEventListener(o, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), Va.forEach(function(o) {
      return vr.removeEventListener(o, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), wi = new $h(), qa = function(e) {
  !nn && e > 0 && wi.start(), nn += e, !nn && wi.stop();
}, kh = function(e) {
  return !Xi(e) && !hh(e) && getComputedStyle(e).display === "inline";
}, Th = function() {
  function e(t, o) {
    this.target = t, this.observedBox = o || Pr.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = Ls(this.target, this.observedBox, !0);
    return kh(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), zh = function() {
  function e(t, o) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = o;
  }
  return e;
}(), qr = /* @__PURE__ */ new WeakMap(), Ga = function(e, t) {
  for (var o = 0; o < e.length; o += 1)
    if (e[o].target === t)
      return o;
  return -1;
}, Gr = function() {
  function e() {
  }
  return e.connect = function(t, o) {
    var r = new zh(t, o);
    qr.set(t, r);
  }, e.observe = function(t, o, r) {
    var n = qr.get(t), i = n.observationTargets.length === 0;
    Ga(n.observationTargets, o) < 0 && (i && ko.push(n), n.observationTargets.push(new Th(o, r && r.box)), qa(1), wi.schedule());
  }, e.unobserve = function(t, o) {
    var r = qr.get(t), n = Ga(r.observationTargets, o), i = r.observationTargets.length === 1;
    n >= 0 && (i && ko.splice(ko.indexOf(r), 1), r.observationTargets.splice(n, 1), qa(-1));
  }, e.disconnect = function(t) {
    var o = this, r = qr.get(t);
    r.observationTargets.slice().forEach(function(n) {
      return o.unobserve(t, n.target);
    }), r.activeTargets.splice(0, r.activeTargets.length);
  }, e;
}(), _h = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Gr.connect(this, t);
  }
  return e.prototype.observe = function(t, o) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!La(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Gr.observe(this, t, o);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!La(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Gr.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Gr.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class Ih {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || _h)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
const vn = new Ih(), $r = xe({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const o = Mr().proxy;
    function r(n) {
      const { onResize: i } = e;
      i !== void 0 && i(n);
    }
    wt(() => {
      const n = o.$el;
      if (n === void 0) {
        Ra("resize-observer", "$el does not exist.");
        return;
      }
      if (n.nextElementSibling !== n.nextSibling && n.nodeType === 3 && n.nodeValue !== "") {
        Ra("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      n.nextElementSibling !== null && (vn.registerHandler(n.nextElementSibling, r), t = !0);
    }), yt(() => {
      t && vn.unregisterHandler(o.$el.nextElementSibling);
    });
  },
  render() {
    return Kl(this.$slots, "default");
  }
});
let Kr;
function Mh() {
  return Kr === void 0 && ("matchMedia" in window ? Kr = window.matchMedia("(pointer:coarse)").matches : Kr = !1), Kr;
}
let Xn;
function Ka() {
  return Xn === void 0 && (Xn = "chrome" in window ? window.devicePixelRatio : 1), Xn;
}
const Oh = lo(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  lo("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    lo("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), Rh = xe({
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
    const t = Io();
    Oh.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: Ki,
      ssr: t
    }), wt(() => {
      const { defaultScrollIndex: C, defaultScrollKey: T } = e;
      C != null ? u({ index: C }) : T != null && u({ key: T });
    });
    let o = !1, r = !1;
    Yl(() => {
      if (o = !1, !r) {
        r = !0;
        return;
      }
      u({ top: f.value, left: c });
    }), Xl(() => {
      o = !0, r || (r = !0);
    });
    const n = R(() => {
      const C = /* @__PURE__ */ new Map(), { keyField: T } = e;
      return e.items.forEach((M, O) => {
        C.set(M[T], O);
      }), C;
    }), i = L(null), a = L(void 0), l = /* @__PURE__ */ new Map(), s = R(() => {
      const { items: C, itemSize: T, keyField: M } = e, O = new eh(C.length, T);
      return C.forEach((G, Y) => {
        const V = G[M], ne = l.get(V);
        ne !== void 0 && O.add(Y, ne);
      }), O;
    }), d = L(0);
    let c = 0;
    const f = L(0), p = Xe(() => Math.max(s.value.getBound(f.value - yr(e.paddingTop)) - 1, 0)), v = R(() => {
      const { value: C } = a;
      if (C === void 0)
        return [];
      const { items: T, itemSize: M } = e, O = p.value, G = Math.min(O + Math.ceil(C / M + 1), T.length - 1), Y = [];
      for (let V = O; V <= G; ++V)
        Y.push(T[V]);
      return Y;
    }), u = (C, T) => {
      if (typeof C == "number") {
        S(C, T, "auto");
        return;
      }
      const { left: M, top: O, index: G, key: Y, position: V, behavior: ne, debounce: H = !0 } = C;
      if (M !== void 0 || O !== void 0)
        S(M, O, ne);
      else if (G !== void 0)
        h(G, ne, H);
      else if (Y !== void 0) {
        const U = n.value.get(Y);
        U !== void 0 && h(U, ne, H);
      } else
        V === "bottom" ? S(0, Number.MAX_SAFE_INTEGER, ne) : V === "top" && S(0, 0, ne);
    };
    let b, x = null;
    function h(C, T, M) {
      const { value: O } = s, G = O.sum(C) + yr(e.paddingTop);
      if (!M)
        i.value.scrollTo({
          left: 0,
          top: G,
          behavior: T
        });
      else {
        b = C, x !== null && window.clearTimeout(x), x = window.setTimeout(() => {
          b = void 0, x = null;
        }, 16);
        const { scrollTop: Y, offsetHeight: V } = i.value;
        if (G > Y) {
          const ne = O.get(C);
          G + ne <= Y + V || i.value.scrollTo({
            left: 0,
            top: G + ne - V,
            behavior: T
          });
        } else
          i.value.scrollTo({
            left: 0,
            top: G,
            behavior: T
          });
      }
    }
    function S(C, T, M) {
      i.value.scrollTo({
        left: C,
        top: T,
        behavior: M
      });
    }
    function E(C, T) {
      var M, O, G;
      if (o || e.ignoreItemResize || $(T.target))
        return;
      const { value: Y } = s, V = n.value.get(C), ne = Y.get(V), H = (G = (O = (M = T.borderBoxSize) === null || M === void 0 ? void 0 : M[0]) === null || O === void 0 ? void 0 : O.blockSize) !== null && G !== void 0 ? G : T.contentRect.height;
      if (H === ne)
        return;
      H - e.itemSize === 0 ? l.delete(C) : l.set(C, H - e.itemSize);
      const de = H - ne;
      if (de === 0)
        return;
      Y.add(V, de);
      const Se = i.value;
      if (Se != null) {
        if (b === void 0) {
          const _e = Y.sum(V);
          Se.scrollTop > _e && Se.scrollBy(0, de);
        } else if (V < b)
          Se.scrollBy(0, de);
        else if (V === b) {
          const _e = Y.sum(V);
          H + _e > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          Se.scrollTop + Se.offsetHeight && Se.scrollBy(0, de);
        }
        k();
      }
      d.value++;
    }
    const w = !Mh();
    let z = !1;
    function I(C) {
      var T;
      (T = e.onScroll) === null || T === void 0 || T.call(e, C), (!w || !z) && k();
    }
    function g(C) {
      var T;
      if ((T = e.onWheel) === null || T === void 0 || T.call(e, C), w) {
        const M = i.value;
        if (M != null) {
          if (C.deltaX === 0 && (M.scrollTop === 0 && C.deltaY <= 0 || M.scrollTop + M.offsetHeight >= M.scrollHeight && C.deltaY >= 0))
            return;
          C.preventDefault(), M.scrollTop += C.deltaY / Ka(), M.scrollLeft += C.deltaX / Ka(), k(), z = !0, vs(() => {
            z = !1;
          });
        }
      }
    }
    function P(C) {
      if (o || $(C.target) || C.contentRect.height === a.value)
        return;
      a.value = C.contentRect.height;
      const { onResize: T } = e;
      T !== void 0 && T(C);
    }
    function k() {
      const { value: C } = i;
      C != null && (f.value = C.scrollTop, c = C.scrollLeft);
    }
    function $(C) {
      let T = C;
      for (; T !== null; ) {
        if (T.style.display === "none")
          return !0;
        T = T.parentElement;
      }
      return !1;
    }
    return {
      listHeight: a,
      listStyle: {
        overflow: "auto"
      },
      keyToIndex: n,
      itemsStyle: R(() => {
        const { itemResizable: C } = e, T = Wr(s.value.sum());
        return d.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            height: C ? "" : T,
            minHeight: C ? T : "",
            paddingTop: Wr(e.paddingTop),
            paddingBottom: Wr(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: R(() => (d.value, {
        transform: `translateY(${Wr(s.value.sum(p.value))})`
      })),
      viewportItems: v,
      listElRef: i,
      itemsElRef: L(null),
      scrollTo: u,
      handleListResize: P,
      handleListScroll: I,
      handleListWheel: g,
      handleItemResize: E
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: o, visibleItemsTag: r } = this;
    return m($r, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var n, i;
        return m("div", Wi(this.$attrs, {
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
                return e ? m($r, {
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
}), go = "v-hidden", Eh = lo("[v-hidden]", {
  display: "none!important"
}), Ya = xe({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const o = L(null), r = L(null);
    function n() {
      const { value: a } = o, { getCounter: l, getTail: s } = e;
      let d;
      if (l !== void 0 ? d = l() : d = r.value, !a || !d)
        return;
      d.hasAttribute(go) && d.removeAttribute(go);
      const { children: c } = a, f = a.offsetWidth, p = [], v = t.tail ? s == null ? void 0 : s() : null;
      let u = v ? v.offsetWidth : 0, b = !1;
      const x = a.children.length - (t.tail ? 1 : 0);
      for (let S = 0; S < x - 1; ++S) {
        if (S < 0)
          continue;
        const E = c[S];
        if (b) {
          E.hasAttribute(go) || E.setAttribute(go, "");
          continue;
        } else
          E.hasAttribute(go) && E.removeAttribute(go);
        const w = E.offsetWidth;
        if (u += w, p[S] = w, u > f) {
          const { updateCounter: z } = e;
          for (let I = S; I >= 0; --I) {
            const g = x - 1 - I;
            z !== void 0 ? z(g) : d.textContent = `${g}`;
            const P = d.offsetWidth;
            if (u -= p[I], u + P <= f || I === 0) {
              b = !0, S = I - 1, v && (S === -1 ? (v.style.maxWidth = `${f - P}px`, v.style.boxSizing = "border-box") : v.style.maxWidth = "");
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: h } = e;
      b ? h !== void 0 && h(!0) : (h !== void 0 && h(!1), d.setAttribute(go, ""));
    }
    const i = Io();
    return Eh.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: Ki,
      ssr: i
    }), wt(n), {
      selfRef: o,
      counterRef: r,
      sync: n
    };
  },
  render() {
    const { $slots: e } = this;
    return zt(this.sync), m("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      Kl(e, "default"),
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
function js(e) {
  return e instanceof HTMLElement;
}
function Vs(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const o = e.childNodes[t];
    if (js(o) && (qs(o) || Vs(o)))
      return !0;
  }
  return !1;
}
function Us(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const o = e.childNodes[t];
    if (js(o) && (qs(o) || Us(o)))
      return !0;
  }
  return !1;
}
function qs(e) {
  if (!Bh(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function Bh(e) {
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
let nr = [];
const Dh = xe({
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
    const t = cn(), o = L(null), r = L(null);
    let n = !1, i = !1;
    const a = typeof document > "u" ? null : document.activeElement;
    function l() {
      return nr[nr.length - 1] === t;
    }
    function s(x) {
      var h;
      x.code === "Escape" && l() && ((h = e.onEsc) === null || h === void 0 || h.call(e, x));
    }
    wt(() => {
      Ae(() => e.active, (x) => {
        x ? (f(), Ke("keydown", document, s)) : (qe("keydown", document, s), n && p());
      }, {
        immediate: !0
      });
    }), yt(() => {
      qe("keydown", document, s), n && p();
    });
    function d(x) {
      if (!i && l()) {
        const h = c();
        if (h === null || h.contains(Cr(x)))
          return;
        v("first");
      }
    }
    function c() {
      const x = o.value;
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
        if (nr.push(t), e.autoFocus) {
          const { initialFocusTo: h } = e;
          h === void 0 ? v("first") : (x = Ba(h)) === null || x === void 0 || x.focus({ preventScroll: !0 });
        }
        n = !0, document.addEventListener("focus", d, !0);
      }
    }
    function p() {
      var x;
      if (e.disabled || (document.removeEventListener("focus", d, !0), nr = nr.filter((S) => S !== t), l()))
        return;
      const { finalFocusTo: h } = e;
      h !== void 0 ? (x = Ba(h)) === null || x === void 0 || x.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = !0, a.focus({ preventScroll: !0 }), i = !1);
    }
    function v(x) {
      if (l() && e.active) {
        const h = o.value, S = r.value;
        if (h !== null && S !== null) {
          const E = c();
          if (E == null || E === S) {
            i = !0, h.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const w = x === "first" ? Vs(E) : Us(E);
          i = !1, w || (i = !0, h.focus({ preventScroll: !0 }), i = !1);
        }
      }
    }
    function u(x) {
      if (i)
        return;
      const h = c();
      h !== null && (x.relatedTarget !== null && h.contains(x.relatedTarget) ? v("last") : v("first"));
    }
    function b(x) {
      i || (x.relatedTarget !== null && x.relatedTarget === o.value ? v("last") : v("first"));
    }
    return {
      focusableStartRef: o,
      focusableEndRef: r,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus: u,
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
    return m(Qt, null, [
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
function Gs(e, t) {
  t && (wt(() => {
    const { value: o } = e;
    o && vn.registerHandler(o, t);
  }), yt(() => {
    const { value: o } = e;
    o && vn.unregisterHandler(o);
  }));
}
function Ah(e) {
  const t = { isDeactivated: !1 };
  let o = !1;
  return Yl(() => {
    if (t.isDeactivated = !1, !o) {
      o = !0;
      return;
    }
    e();
  }), Xl(() => {
    t.isDeactivated = !0, o || (o = !0);
  }), t;
}
const Si = "n-form-item";
function Mo(e, { defaultSize: t = "medium", mergedSize: o, mergedDisabled: r } = {}) {
  const n = Be(Si, null);
  _t(Si, null);
  const i = R(o ? () => o(n) : () => {
    const { size: s } = e;
    if (s)
      return s;
    if (n) {
      const { mergedSize: d } = n;
      if (d.value !== void 0)
        return d.value;
    }
    return t;
  }), a = R(r ? () => r(n) : () => {
    const { disabled: s } = e;
    return s !== void 0 ? s : n ? n.disabled.value : !1;
  }), l = R(() => {
    const { status: s } = e;
    return s || (n == null ? void 0 : n.mergedValidationStatus.value);
  });
  return yt(() => {
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
var Fh = typeof global == "object" && global && global.Object === Object && global;
const Ks = Fh;
var Hh = typeof self == "object" && self && self.Object === Object && self, Lh = Ks || Hh || Function("return this")();
const jt = Lh;
var Wh = jt.Symbol;
const co = Wh;
var Ys = Object.prototype, Nh = Ys.hasOwnProperty, jh = Ys.toString, ir = co ? co.toStringTag : void 0;
function Vh(e) {
  var t = Nh.call(e, ir), o = e[ir];
  try {
    e[ir] = void 0;
    var r = !0;
  } catch {
  }
  var n = jh.call(e);
  return r && (t ? e[ir] = o : delete e[ir]), n;
}
var Uh = Object.prototype, qh = Uh.toString;
function Gh(e) {
  return qh.call(e);
}
var Kh = "[object Null]", Yh = "[object Undefined]", Xa = co ? co.toStringTag : void 0;
function Oo(e) {
  return e == null ? e === void 0 ? Yh : Kh : Xa && Xa in Object(e) ? Vh(e) : Gh(e);
}
function uo(e) {
  return e != null && typeof e == "object";
}
var Xh = "[object Symbol]";
function Zi(e) {
  return typeof e == "symbol" || uo(e) && Oo(e) == Xh;
}
function Xs(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length, n = Array(r); ++o < r; )
    n[o] = t(e[o], o, e);
  return n;
}
var Zh = Array.isArray;
const Et = Zh;
var Jh = 1 / 0, Za = co ? co.prototype : void 0, Ja = Za ? Za.toString : void 0;
function Zs(e) {
  if (typeof e == "string")
    return e;
  if (Et(e))
    return Xs(e, Zs) + "";
  if (Zi(e))
    return Ja ? Ja.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Jh ? "-0" : t;
}
function fo(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function Ji(e) {
  return e;
}
var Qh = "[object AsyncFunction]", ep = "[object Function]", tp = "[object GeneratorFunction]", op = "[object Proxy]";
function Qi(e) {
  if (!fo(e))
    return !1;
  var t = Oo(e);
  return t == ep || t == tp || t == Qh || t == op;
}
var rp = jt["__core-js_shared__"];
const Zn = rp;
var Qa = function() {
  var e = /[^.]+$/.exec(Zn && Zn.keys && Zn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function np(e) {
  return !!Qa && Qa in e;
}
var ip = Function.prototype, ap = ip.toString;
function Ro(e) {
  if (e != null) {
    try {
      return ap.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var lp = /[\\^$.*+?()[\]{}|]/g, sp = /^\[object .+?Constructor\]$/, dp = Function.prototype, cp = Object.prototype, up = dp.toString, fp = cp.hasOwnProperty, hp = RegExp(
  "^" + up.call(fp).replace(lp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function pp(e) {
  if (!fo(e) || np(e))
    return !1;
  var t = Qi(e) ? hp : sp;
  return t.test(Ro(e));
}
function vp(e, t) {
  return e == null ? void 0 : e[t];
}
function Eo(e, t) {
  var o = vp(e, t);
  return pp(o) ? o : void 0;
}
var gp = Eo(jt, "WeakMap");
const Pi = gp;
var el = Object.create, mp = function() {
  function e() {
  }
  return function(t) {
    if (!fo(t))
      return {};
    if (el)
      return el(t);
    e.prototype = t;
    var o = new e();
    return e.prototype = void 0, o;
  };
}();
const bp = mp;
function xp(e, t, o) {
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
function Cp(e, t) {
  var o = -1, r = e.length;
  for (t || (t = Array(r)); ++o < r; )
    t[o] = e[o];
  return t;
}
var yp = 800, wp = 16, Sp = Date.now;
function Pp(e) {
  var t = 0, o = 0;
  return function() {
    var r = Sp(), n = wp - (r - o);
    if (o = r, n > 0) {
      if (++t >= yp)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function $p(e) {
  return function() {
    return e;
  };
}
var kp = function() {
  try {
    var e = Eo(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const gn = kp;
var Tp = gn ? function(e, t) {
  return gn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: $p(t),
    writable: !0
  });
} : Ji;
const zp = Tp;
var _p = Pp(zp);
const Ip = _p;
var Mp = 9007199254740991, Op = /^(?:0|[1-9]\d*)$/;
function ea(e, t) {
  var o = typeof e;
  return t = t ?? Mp, !!t && (o == "number" || o != "symbol" && Op.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function ta(e, t, o) {
  t == "__proto__" && gn ? gn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: o,
    writable: !0
  }) : e[t] = o;
}
function Dr(e, t) {
  return e === t || e !== e && t !== t;
}
var Rp = Object.prototype, Ep = Rp.hasOwnProperty;
function Bp(e, t, o) {
  var r = e[t];
  (!(Ep.call(e, t) && Dr(r, o)) || o === void 0 && !(t in e)) && ta(e, t, o);
}
function Dp(e, t, o, r) {
  var n = !o;
  o || (o = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var l = t[i], s = r ? r(o[l], e[l], l, o, e) : void 0;
    s === void 0 && (s = e[l]), n ? ta(o, l, s) : Bp(o, l, s);
  }
  return o;
}
var tl = Math.max;
function Ap(e, t, o) {
  return t = tl(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, n = -1, i = tl(r.length - t, 0), a = Array(i); ++n < i; )
      a[n] = r[t + n];
    n = -1;
    for (var l = Array(t + 1); ++n < t; )
      l[n] = r[n];
    return l[t] = o(a), xp(e, this, l);
  };
}
function Fp(e, t) {
  return Ip(Ap(e, t, Ji), e + "");
}
var Hp = 9007199254740991;
function oa(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Hp;
}
function Qo(e) {
  return e != null && oa(e.length) && !Qi(e);
}
function Lp(e, t, o) {
  if (!fo(o))
    return !1;
  var r = typeof t;
  return (r == "number" ? Qo(o) && ea(t, o.length) : r == "string" && t in o) ? Dr(o[t], e) : !1;
}
function Wp(e) {
  return Fp(function(t, o) {
    var r = -1, n = o.length, i = n > 1 ? o[n - 1] : void 0, a = n > 2 ? o[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0, a && Lp(o[0], o[1], a) && (i = n < 3 ? void 0 : i, n = 1), t = Object(t); ++r < n; ) {
      var l = o[r];
      l && e(t, l, r, i);
    }
    return t;
  });
}
var Np = Object.prototype;
function ra(e) {
  var t = e && e.constructor, o = typeof t == "function" && t.prototype || Np;
  return e === o;
}
function jp(e, t) {
  for (var o = -1, r = Array(e); ++o < e; )
    r[o] = t(o);
  return r;
}
var Vp = "[object Arguments]";
function ol(e) {
  return uo(e) && Oo(e) == Vp;
}
var Js = Object.prototype, Up = Js.hasOwnProperty, qp = Js.propertyIsEnumerable, Gp = ol(function() {
  return arguments;
}()) ? ol : function(e) {
  return uo(e) && Up.call(e, "callee") && !qp.call(e, "callee");
};
const mn = Gp;
function Kp() {
  return !1;
}
var Qs = typeof exports == "object" && exports && !exports.nodeType && exports, rl = Qs && typeof module == "object" && module && !module.nodeType && module, Yp = rl && rl.exports === Qs, nl = Yp ? jt.Buffer : void 0, Xp = nl ? nl.isBuffer : void 0, Zp = Xp || Kp;
const bn = Zp;
var Jp = "[object Arguments]", Qp = "[object Array]", ev = "[object Boolean]", tv = "[object Date]", ov = "[object Error]", rv = "[object Function]", nv = "[object Map]", iv = "[object Number]", av = "[object Object]", lv = "[object RegExp]", sv = "[object Set]", dv = "[object String]", cv = "[object WeakMap]", uv = "[object ArrayBuffer]", fv = "[object DataView]", hv = "[object Float32Array]", pv = "[object Float64Array]", vv = "[object Int8Array]", gv = "[object Int16Array]", mv = "[object Int32Array]", bv = "[object Uint8Array]", xv = "[object Uint8ClampedArray]", Cv = "[object Uint16Array]", yv = "[object Uint32Array]", Ue = {};
Ue[hv] = Ue[pv] = Ue[vv] = Ue[gv] = Ue[mv] = Ue[bv] = Ue[xv] = Ue[Cv] = Ue[yv] = !0;
Ue[Jp] = Ue[Qp] = Ue[uv] = Ue[ev] = Ue[fv] = Ue[tv] = Ue[ov] = Ue[rv] = Ue[nv] = Ue[iv] = Ue[av] = Ue[lv] = Ue[sv] = Ue[dv] = Ue[cv] = !1;
function wv(e) {
  return uo(e) && oa(e.length) && !!Ue[Oo(e)];
}
function Sv(e) {
  return function(t) {
    return e(t);
  };
}
var ed = typeof exports == "object" && exports && !exports.nodeType && exports, gr = ed && typeof module == "object" && module && !module.nodeType && module, Pv = gr && gr.exports === ed, Jn = Pv && Ks.process, $v = function() {
  try {
    var e = gr && gr.require && gr.require("util").types;
    return e || Jn && Jn.binding && Jn.binding("util");
  } catch {
  }
}();
const il = $v;
var al = il && il.isTypedArray, kv = al ? Sv(al) : wv;
const na = kv;
var Tv = Object.prototype, zv = Tv.hasOwnProperty;
function td(e, t) {
  var o = Et(e), r = !o && mn(e), n = !o && !r && bn(e), i = !o && !r && !n && na(e), a = o || r || n || i, l = a ? jp(e.length, String) : [], s = l.length;
  for (var d in e)
    (t || zv.call(e, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    ea(d, s))) && l.push(d);
  return l;
}
function od(e, t) {
  return function(o) {
    return e(t(o));
  };
}
var _v = od(Object.keys, Object);
const Iv = _v;
var Mv = Object.prototype, Ov = Mv.hasOwnProperty;
function Rv(e) {
  if (!ra(e))
    return Iv(e);
  var t = [];
  for (var o in Object(e))
    Ov.call(e, o) && o != "constructor" && t.push(o);
  return t;
}
function ia(e) {
  return Qo(e) ? td(e) : Rv(e);
}
function Ev(e) {
  var t = [];
  if (e != null)
    for (var o in Object(e))
      t.push(o);
  return t;
}
var Bv = Object.prototype, Dv = Bv.hasOwnProperty;
function Av(e) {
  if (!fo(e))
    return Ev(e);
  var t = ra(e), o = [];
  for (var r in e)
    r == "constructor" && (t || !Dv.call(e, r)) || o.push(r);
  return o;
}
function rd(e) {
  return Qo(e) ? td(e, !0) : Av(e);
}
var Fv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Hv = /^\w*$/;
function aa(e, t) {
  if (Et(e))
    return !1;
  var o = typeof e;
  return o == "number" || o == "symbol" || o == "boolean" || e == null || Zi(e) ? !0 : Hv.test(e) || !Fv.test(e) || t != null && e in Object(t);
}
var Lv = Eo(Object, "create");
const kr = Lv;
function Wv() {
  this.__data__ = kr ? kr(null) : {}, this.size = 0;
}
function Nv(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var jv = "__lodash_hash_undefined__", Vv = Object.prototype, Uv = Vv.hasOwnProperty;
function qv(e) {
  var t = this.__data__;
  if (kr) {
    var o = t[e];
    return o === jv ? void 0 : o;
  }
  return Uv.call(t, e) ? t[e] : void 0;
}
var Gv = Object.prototype, Kv = Gv.hasOwnProperty;
function Yv(e) {
  var t = this.__data__;
  return kr ? t[e] !== void 0 : Kv.call(t, e);
}
var Xv = "__lodash_hash_undefined__";
function Zv(e, t) {
  var o = this.__data__;
  return this.size += this.has(e) ? 0 : 1, o[e] = kr && t === void 0 ? Xv : t, this;
}
function _o(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
_o.prototype.clear = Wv;
_o.prototype.delete = Nv;
_o.prototype.get = qv;
_o.prototype.has = Yv;
_o.prototype.set = Zv;
function Jv() {
  this.__data__ = [], this.size = 0;
}
function Tn(e, t) {
  for (var o = e.length; o--; )
    if (Dr(e[o][0], t))
      return o;
  return -1;
}
var Qv = Array.prototype, eg = Qv.splice;
function tg(e) {
  var t = this.__data__, o = Tn(t, e);
  if (o < 0)
    return !1;
  var r = t.length - 1;
  return o == r ? t.pop() : eg.call(t, o, 1), --this.size, !0;
}
function og(e) {
  var t = this.__data__, o = Tn(t, e);
  return o < 0 ? void 0 : t[o][1];
}
function rg(e) {
  return Tn(this.__data__, e) > -1;
}
function ng(e, t) {
  var o = this.__data__, r = Tn(o, e);
  return r < 0 ? (++this.size, o.push([e, t])) : o[r][1] = t, this;
}
function eo(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
eo.prototype.clear = Jv;
eo.prototype.delete = tg;
eo.prototype.get = og;
eo.prototype.has = rg;
eo.prototype.set = ng;
var ig = Eo(jt, "Map");
const Tr = ig;
function ag() {
  this.size = 0, this.__data__ = {
    hash: new _o(),
    map: new (Tr || eo)(),
    string: new _o()
  };
}
function lg(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function zn(e, t) {
  var o = e.__data__;
  return lg(t) ? o[typeof t == "string" ? "string" : "hash"] : o.map;
}
function sg(e) {
  var t = zn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function dg(e) {
  return zn(this, e).get(e);
}
function cg(e) {
  return zn(this, e).has(e);
}
function ug(e, t) {
  var o = zn(this, e), r = o.size;
  return o.set(e, t), this.size += o.size == r ? 0 : 1, this;
}
function to(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
to.prototype.clear = ag;
to.prototype.delete = sg;
to.prototype.get = dg;
to.prototype.has = cg;
to.prototype.set = ug;
var fg = "Expected a function";
function la(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(fg);
  var o = function() {
    var r = arguments, n = t ? t.apply(this, r) : r[0], i = o.cache;
    if (i.has(n))
      return i.get(n);
    var a = e.apply(this, r);
    return o.cache = i.set(n, a) || i, a;
  };
  return o.cache = new (la.Cache || to)(), o;
}
la.Cache = to;
var hg = 500;
function pg(e) {
  var t = la(e, function(r) {
    return o.size === hg && o.clear(), r;
  }), o = t.cache;
  return t;
}
var vg = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, gg = /\\(\\)?/g, mg = pg(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(vg, function(o, r, n, i) {
    t.push(n ? i.replace(gg, "$1") : r || o);
  }), t;
});
const bg = mg;
function nd(e) {
  return e == null ? "" : Zs(e);
}
function id(e, t) {
  return Et(e) ? e : aa(e, t) ? [e] : bg(nd(e));
}
var xg = 1 / 0;
function _n(e) {
  if (typeof e == "string" || Zi(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -xg ? "-0" : t;
}
function ad(e, t) {
  t = id(t, e);
  for (var o = 0, r = t.length; e != null && o < r; )
    e = e[_n(t[o++])];
  return o && o == r ? e : void 0;
}
function sa(e, t, o) {
  var r = e == null ? void 0 : ad(e, t);
  return r === void 0 ? o : r;
}
function Cg(e, t) {
  for (var o = -1, r = t.length, n = e.length; ++o < r; )
    e[n + o] = t[o];
  return e;
}
var yg = od(Object.getPrototypeOf, Object);
const ld = yg;
var wg = "[object Object]", Sg = Function.prototype, Pg = Object.prototype, sd = Sg.toString, $g = Pg.hasOwnProperty, kg = sd.call(Object);
function Tg(e) {
  if (!uo(e) || Oo(e) != wg)
    return !1;
  var t = ld(e);
  if (t === null)
    return !0;
  var o = $g.call(t, "constructor") && t.constructor;
  return typeof o == "function" && o instanceof o && sd.call(o) == kg;
}
function zg(e, t, o) {
  var r = -1, n = e.length;
  t < 0 && (t = -t > n ? 0 : n + t), o = o > n ? n : o, o < 0 && (o += n), n = t > o ? 0 : o - t >>> 0, t >>>= 0;
  for (var i = Array(n); ++r < n; )
    i[r] = e[r + t];
  return i;
}
function _g(e, t, o) {
  var r = e.length;
  return o = o === void 0 ? r : o, !t && o >= r ? e : zg(e, t, o);
}
var Ig = "\\ud800-\\udfff", Mg = "\\u0300-\\u036f", Og = "\\ufe20-\\ufe2f", Rg = "\\u20d0-\\u20ff", Eg = Mg + Og + Rg, Bg = "\\ufe0e\\ufe0f", Dg = "\\u200d", Ag = RegExp("[" + Dg + Ig + Eg + Bg + "]");
function dd(e) {
  return Ag.test(e);
}
function Fg(e) {
  return e.split("");
}
var cd = "\\ud800-\\udfff", Hg = "\\u0300-\\u036f", Lg = "\\ufe20-\\ufe2f", Wg = "\\u20d0-\\u20ff", Ng = Hg + Lg + Wg, jg = "\\ufe0e\\ufe0f", Vg = "[" + cd + "]", $i = "[" + Ng + "]", ki = "\\ud83c[\\udffb-\\udfff]", Ug = "(?:" + $i + "|" + ki + ")", ud = "[^" + cd + "]", fd = "(?:\\ud83c[\\udde6-\\uddff]){2}", hd = "[\\ud800-\\udbff][\\udc00-\\udfff]", qg = "\\u200d", pd = Ug + "?", vd = "[" + jg + "]?", Gg = "(?:" + qg + "(?:" + [ud, fd, hd].join("|") + ")" + vd + pd + ")*", Kg = vd + pd + Gg, Yg = "(?:" + [ud + $i + "?", $i, fd, hd, Vg].join("|") + ")", Xg = RegExp(ki + "(?=" + ki + ")|" + Yg + Kg, "g");
function Zg(e) {
  return e.match(Xg) || [];
}
function Jg(e) {
  return dd(e) ? Zg(e) : Fg(e);
}
function Qg(e) {
  return function(t) {
    t = nd(t);
    var o = dd(t) ? Jg(t) : void 0, r = o ? o[0] : t.charAt(0), n = o ? _g(o, 1).join("") : t.slice(1);
    return r[e]() + n;
  };
}
var em = Qg("toUpperCase");
const tm = em;
function om() {
  this.__data__ = new eo(), this.size = 0;
}
function rm(e) {
  var t = this.__data__, o = t.delete(e);
  return this.size = t.size, o;
}
function nm(e) {
  return this.__data__.get(e);
}
function im(e) {
  return this.__data__.has(e);
}
var am = 200;
function lm(e, t) {
  var o = this.__data__;
  if (o instanceof eo) {
    var r = o.__data__;
    if (!Tr || r.length < am - 1)
      return r.push([e, t]), this.size = ++o.size, this;
    o = this.__data__ = new to(r);
  }
  return o.set(e, t), this.size = o.size, this;
}
function Wt(e) {
  var t = this.__data__ = new eo(e);
  this.size = t.size;
}
Wt.prototype.clear = om;
Wt.prototype.delete = rm;
Wt.prototype.get = nm;
Wt.prototype.has = im;
Wt.prototype.set = lm;
var gd = typeof exports == "object" && exports && !exports.nodeType && exports, ll = gd && typeof module == "object" && module && !module.nodeType && module, sm = ll && ll.exports === gd, sl = sm ? jt.Buffer : void 0, dl = sl ? sl.allocUnsafe : void 0;
function dm(e, t) {
  if (t)
    return e.slice();
  var o = e.length, r = dl ? dl(o) : new e.constructor(o);
  return e.copy(r), r;
}
function cm(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length, n = 0, i = []; ++o < r; ) {
    var a = e[o];
    t(a, o, e) && (i[n++] = a);
  }
  return i;
}
function um() {
  return [];
}
var fm = Object.prototype, hm = fm.propertyIsEnumerable, cl = Object.getOwnPropertySymbols, pm = cl ? function(e) {
  return e == null ? [] : (e = Object(e), cm(cl(e), function(t) {
    return hm.call(e, t);
  }));
} : um;
const vm = pm;
function gm(e, t, o) {
  var r = t(e);
  return Et(e) ? r : Cg(r, o(e));
}
function ul(e) {
  return gm(e, ia, vm);
}
var mm = Eo(jt, "DataView");
const Ti = mm;
var bm = Eo(jt, "Promise");
const zi = bm;
var xm = Eo(jt, "Set");
const _i = xm;
var fl = "[object Map]", Cm = "[object Object]", hl = "[object Promise]", pl = "[object Set]", vl = "[object WeakMap]", gl = "[object DataView]", ym = Ro(Ti), wm = Ro(Tr), Sm = Ro(zi), Pm = Ro(_i), $m = Ro(Pi), xo = Oo;
(Ti && xo(new Ti(new ArrayBuffer(1))) != gl || Tr && xo(new Tr()) != fl || zi && xo(zi.resolve()) != hl || _i && xo(new _i()) != pl || Pi && xo(new Pi()) != vl) && (xo = function(e) {
  var t = Oo(e), o = t == Cm ? e.constructor : void 0, r = o ? Ro(o) : "";
  if (r)
    switch (r) {
      case ym:
        return gl;
      case wm:
        return fl;
      case Sm:
        return hl;
      case Pm:
        return pl;
      case $m:
        return vl;
    }
  return t;
});
const ml = xo;
var km = jt.Uint8Array;
const xn = km;
function Tm(e) {
  var t = new e.constructor(e.byteLength);
  return new xn(t).set(new xn(e)), t;
}
function zm(e, t) {
  var o = t ? Tm(e.buffer) : e.buffer;
  return new e.constructor(o, e.byteOffset, e.length);
}
function _m(e) {
  return typeof e.constructor == "function" && !ra(e) ? bp(ld(e)) : {};
}
var Im = "__lodash_hash_undefined__";
function Mm(e) {
  return this.__data__.set(e, Im), this;
}
function Om(e) {
  return this.__data__.has(e);
}
function Cn(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.__data__ = new to(); ++t < o; )
    this.add(e[t]);
}
Cn.prototype.add = Cn.prototype.push = Mm;
Cn.prototype.has = Om;
function Rm(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
    if (t(e[o], o, e))
      return !0;
  return !1;
}
function Em(e, t) {
  return e.has(t);
}
var Bm = 1, Dm = 2;
function md(e, t, o, r, n, i) {
  var a = o & Bm, l = e.length, s = t.length;
  if (l != s && !(a && s > l))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var f = -1, p = !0, v = o & Dm ? new Cn() : void 0;
  for (i.set(e, t), i.set(t, e); ++f < l; ) {
    var u = e[f], b = t[f];
    if (r)
      var x = a ? r(b, u, f, t, e, i) : r(u, b, f, e, t, i);
    if (x !== void 0) {
      if (x)
        continue;
      p = !1;
      break;
    }
    if (v) {
      if (!Rm(t, function(h, S) {
        if (!Em(v, S) && (u === h || n(u, h, o, r, i)))
          return v.push(S);
      })) {
        p = !1;
        break;
      }
    } else if (!(u === b || n(u, b, o, r, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
function Am(e) {
  var t = -1, o = Array(e.size);
  return e.forEach(function(r, n) {
    o[++t] = [n, r];
  }), o;
}
function Fm(e) {
  var t = -1, o = Array(e.size);
  return e.forEach(function(r) {
    o[++t] = r;
  }), o;
}
var Hm = 1, Lm = 2, Wm = "[object Boolean]", Nm = "[object Date]", jm = "[object Error]", Vm = "[object Map]", Um = "[object Number]", qm = "[object RegExp]", Gm = "[object Set]", Km = "[object String]", Ym = "[object Symbol]", Xm = "[object ArrayBuffer]", Zm = "[object DataView]", bl = co ? co.prototype : void 0, Qn = bl ? bl.valueOf : void 0;
function Jm(e, t, o, r, n, i, a) {
  switch (o) {
    case Zm:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Xm:
      return !(e.byteLength != t.byteLength || !i(new xn(e), new xn(t)));
    case Wm:
    case Nm:
    case Um:
      return Dr(+e, +t);
    case jm:
      return e.name == t.name && e.message == t.message;
    case qm:
    case Km:
      return e == t + "";
    case Vm:
      var l = Am;
    case Gm:
      var s = r & Hm;
      if (l || (l = Fm), e.size != t.size && !s)
        return !1;
      var d = a.get(e);
      if (d)
        return d == t;
      r |= Lm, a.set(e, t);
      var c = md(l(e), l(t), r, n, i, a);
      return a.delete(e), c;
    case Ym:
      if (Qn)
        return Qn.call(e) == Qn.call(t);
  }
  return !1;
}
var Qm = 1, eb = Object.prototype, tb = eb.hasOwnProperty;
function ob(e, t, o, r, n, i) {
  var a = o & Qm, l = ul(e), s = l.length, d = ul(t), c = d.length;
  if (s != c && !a)
    return !1;
  for (var f = s; f--; ) {
    var p = l[f];
    if (!(a ? p in t : tb.call(t, p)))
      return !1;
  }
  var v = i.get(e), u = i.get(t);
  if (v && u)
    return v == t && u == e;
  var b = !0;
  i.set(e, t), i.set(t, e);
  for (var x = a; ++f < s; ) {
    p = l[f];
    var h = e[p], S = t[p];
    if (r)
      var E = a ? r(S, h, p, t, e, i) : r(h, S, p, e, t, i);
    if (!(E === void 0 ? h === S || n(h, S, o, r, i) : E)) {
      b = !1;
      break;
    }
    x || (x = p == "constructor");
  }
  if (b && !x) {
    var w = e.constructor, z = t.constructor;
    w != z && "constructor" in e && "constructor" in t && !(typeof w == "function" && w instanceof w && typeof z == "function" && z instanceof z) && (b = !1);
  }
  return i.delete(e), i.delete(t), b;
}
var rb = 1, xl = "[object Arguments]", Cl = "[object Array]", Yr = "[object Object]", nb = Object.prototype, yl = nb.hasOwnProperty;
function ib(e, t, o, r, n, i) {
  var a = Et(e), l = Et(t), s = a ? Cl : ml(e), d = l ? Cl : ml(t);
  s = s == xl ? Yr : s, d = d == xl ? Yr : d;
  var c = s == Yr, f = d == Yr, p = s == d;
  if (p && bn(e)) {
    if (!bn(t))
      return !1;
    a = !0, c = !1;
  }
  if (p && !c)
    return i || (i = new Wt()), a || na(e) ? md(e, t, o, r, n, i) : Jm(e, t, s, o, r, n, i);
  if (!(o & rb)) {
    var v = c && yl.call(e, "__wrapped__"), u = f && yl.call(t, "__wrapped__");
    if (v || u) {
      var b = v ? e.value() : e, x = u ? t.value() : t;
      return i || (i = new Wt()), n(b, x, o, r, i);
    }
  }
  return p ? (i || (i = new Wt()), ob(e, t, o, r, n, i)) : !1;
}
function da(e, t, o, r, n) {
  return e === t ? !0 : e == null || t == null || !uo(e) && !uo(t) ? e !== e && t !== t : ib(e, t, o, r, da, n);
}
var ab = 1, lb = 2;
function sb(e, t, o, r) {
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
      var f = new Wt();
      if (r)
        var p = r(d, c, s, e, t, f);
      if (!(p === void 0 ? da(c, d, ab | lb, r, f) : p))
        return !1;
    }
  }
  return !0;
}
function bd(e) {
  return e === e && !fo(e);
}
function db(e) {
  for (var t = ia(e), o = t.length; o--; ) {
    var r = t[o], n = e[r];
    t[o] = [r, n, bd(n)];
  }
  return t;
}
function xd(e, t) {
  return function(o) {
    return o == null ? !1 : o[e] === t && (t !== void 0 || e in Object(o));
  };
}
function cb(e) {
  var t = db(e);
  return t.length == 1 && t[0][2] ? xd(t[0][0], t[0][1]) : function(o) {
    return o === e || sb(o, e, t);
  };
}
function ub(e, t) {
  return e != null && t in Object(e);
}
function fb(e, t, o) {
  t = id(t, e);
  for (var r = -1, n = t.length, i = !1; ++r < n; ) {
    var a = _n(t[r]);
    if (!(i = e != null && o(e, a)))
      break;
    e = e[a];
  }
  return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && oa(n) && ea(a, n) && (Et(e) || mn(e)));
}
function hb(e, t) {
  return e != null && fb(e, t, ub);
}
var pb = 1, vb = 2;
function gb(e, t) {
  return aa(e) && bd(t) ? xd(_n(e), t) : function(o) {
    var r = sa(o, e);
    return r === void 0 && r === t ? hb(o, e) : da(t, r, pb | vb);
  };
}
function mb(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function bb(e) {
  return function(t) {
    return ad(t, e);
  };
}
function xb(e) {
  return aa(e) ? mb(_n(e)) : bb(e);
}
function Cb(e) {
  return typeof e == "function" ? e : e == null ? Ji : typeof e == "object" ? Et(e) ? gb(e[0], e[1]) : cb(e) : xb(e);
}
function yb(e) {
  return function(t, o, r) {
    for (var n = -1, i = Object(t), a = r(t), l = a.length; l--; ) {
      var s = a[e ? l : ++n];
      if (o(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var wb = yb();
const Cd = wb;
function Sb(e, t) {
  return e && Cd(e, t, ia);
}
function Pb(e, t) {
  return function(o, r) {
    if (o == null)
      return o;
    if (!Qo(o))
      return e(o, r);
    for (var n = o.length, i = t ? n : -1, a = Object(o); (t ? i-- : ++i < n) && r(a[i], i, a) !== !1; )
      ;
    return o;
  };
}
var $b = Pb(Sb);
const kb = $b;
function Ii(e, t, o) {
  (o !== void 0 && !Dr(e[t], o) || o === void 0 && !(t in e)) && ta(e, t, o);
}
function Tb(e) {
  return uo(e) && Qo(e);
}
function Mi(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function zb(e) {
  return Dp(e, rd(e));
}
function _b(e, t, o, r, n, i, a) {
  var l = Mi(e, o), s = Mi(t, o), d = a.get(s);
  if (d) {
    Ii(e, o, d);
    return;
  }
  var c = i ? i(l, s, o + "", e, t, a) : void 0, f = c === void 0;
  if (f) {
    var p = Et(s), v = !p && bn(s), u = !p && !v && na(s);
    c = s, p || v || u ? Et(l) ? c = l : Tb(l) ? c = Cp(l) : v ? (f = !1, c = dm(s, !0)) : u ? (f = !1, c = zm(s, !0)) : c = [] : Tg(s) || mn(s) ? (c = l, mn(l) ? c = zb(l) : (!fo(l) || Qi(l)) && (c = _m(s))) : f = !1;
  }
  f && (a.set(s, c), n(c, s, r, i, a), a.delete(s)), Ii(e, o, c);
}
function yd(e, t, o, r, n) {
  e !== t && Cd(t, function(i, a) {
    if (n || (n = new Wt()), fo(i))
      _b(e, t, a, o, yd, r, n);
    else {
      var l = r ? r(Mi(e, a), i, a + "", e, t, n) : void 0;
      l === void 0 && (l = i), Ii(e, a, l);
    }
  }, rd);
}
function Ib(e, t) {
  var o = -1, r = Qo(e) ? Array(e.length) : [];
  return kb(e, function(n, i, a) {
    r[++o] = t(n, i, a);
  }), r;
}
function Mb(e, t) {
  var o = Et(e) ? Xs : Ib;
  return o(e, Cb(t));
}
var Ob = Wp(function(e, t, o) {
  yd(e, t, o);
});
const cr = Ob, ho = {
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
  fontSize: Rb,
  fontFamily: Eb,
  lineHeight: Bb
} = ho, wd = W("body", `
 margin: 0;
 font-size: ${Rb};
 font-family: ${Eb};
 line-height: ${Bb};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [W("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), Zt = "n-config-provider", zr = "naive-ui-style";
function Me(e, t, o, r, n, i) {
  const a = Io(), l = Be(Zt, null);
  if (o) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      o.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: zr,
        ssr: a
      }), l != null && l.preflightStyleDisabled || wd.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: zr,
        ssr: a
      });
    };
    a ? d() : Ni(d);
  }
  return R(() => {
    var d;
    const { theme: { common: c, self: f, peers: p = {} } = {}, themeOverrides: v = {}, builtinThemeOverrides: u = {} } = n, { common: b, peers: x } = v, { common: h = void 0, [e]: { common: S = void 0, self: E = void 0, peers: w = {} } = {} } = (l == null ? void 0 : l.mergedThemeRef.value) || {}, { common: z = void 0, [e]: I = {} } = (l == null ? void 0 : l.mergedThemeOverridesRef.value) || {}, { common: g, peers: P = {} } = I, k = cr({}, c || S || h || r.common, z, g, b), $ = cr(
      // {}, executed every time, no need for empty obj
      (d = f || E || r.self) === null || d === void 0 ? void 0 : d(k),
      u,
      I,
      v
    );
    return {
      common: k,
      self: $,
      peers: cr({}, r.peers, w, p),
      peerOverrides: cr({}, u.peers, P, x)
    };
  });
}
Me.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const Sd = "n";
function xt(e = {}, t = {
  defaultBordered: !0
}) {
  const o = Be(Zt, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: o == null ? void 0 : o.inlineThemeDisabled,
    mergedRtlRef: o == null ? void 0 : o.mergedRtlRef,
    mergedComponentPropsRef: o == null ? void 0 : o.mergedComponentPropsRef,
    mergedBreakpointsRef: o == null ? void 0 : o.mergedBreakpointsRef,
    mergedBorderedRef: R(() => {
      var r, n;
      const { bordered: i } = e;
      return i !== void 0 ? i : (n = (r = o == null ? void 0 : o.mergedBorderedRef.value) !== null && r !== void 0 ? r : t.defaultBordered) !== null && n !== void 0 ? n : !0;
    }),
    mergedClsPrefixRef: R(() => (o == null ? void 0 : o.mergedClsPrefixRef.value) || Sd),
    namespaceRef: R(() => o == null ? void 0 : o.mergedNamespaceRef.value)
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
}, Ab = Db;
function ei(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = t.width ? String(t.width) : e.defaultWidth, r = e.formats[o] || e.formats[e.defaultWidth];
    return r;
  };
}
function ar(e) {
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
function lr(e) {
  return function(t) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = o.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(n);
    if (!i)
      return null;
    var a = i[0], l = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(l) ? Hb(l, function(f) {
      return f.test(a);
    }) : Fb(l, function(f) {
      return f.test(a);
    }), d;
    d = e.valueCallback ? e.valueCallback(s) : s, d = o.valueCallback ? o.valueCallback(d) : d;
    var c = t.slice(a.length);
    return {
      value: d,
      rest: c
    };
  };
}
function Fb(e, t) {
  for (var o in e)
    if (e.hasOwnProperty(o) && t(e[o]))
      return o;
}
function Hb(e, t) {
  for (var o = 0; o < e.length; o++)
    if (t(e[o]))
      return o;
}
function Lb(e) {
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
var Wb = {
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
}, Nb = function(t, o, r) {
  var n, i = Wb[t];
  return typeof i == "string" ? n = i : o === 1 ? n = i.one : n = i.other.replace("{{count}}", o.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
};
const jb = Nb;
var Vb = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Ub = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, qb = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Gb = {
  date: ei({
    formats: Vb,
    defaultWidth: "full"
  }),
  time: ei({
    formats: Ub,
    defaultWidth: "full"
  }),
  dateTime: ei({
    formats: qb,
    defaultWidth: "full"
  })
};
const Kb = Gb;
var Yb = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Xb = function(t, o, r, n) {
  return Yb[t];
};
const Zb = Xb;
var Jb = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Qb = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, e0 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, t0 = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, o0 = {
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
}, r0 = {
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
}, n0 = function(t, o) {
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
}, i0 = {
  ordinalNumber: n0,
  era: ar({
    values: Jb,
    defaultWidth: "wide"
  }),
  quarter: ar({
    values: Qb,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: ar({
    values: e0,
    defaultWidth: "wide"
  }),
  day: ar({
    values: t0,
    defaultWidth: "wide"
  }),
  dayPeriod: ar({
    values: o0,
    defaultWidth: "wide",
    formattingValues: r0,
    defaultFormattingWidth: "wide"
  })
};
const a0 = i0;
var l0 = /^(\d+)(th|st|nd|rd)?/i, s0 = /\d+/i, d0 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, c0 = {
  any: [/^b/i, /^(a|c)/i]
}, u0 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, f0 = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, h0 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, p0 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, v0 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, g0 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, m0 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, b0 = {
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
}, x0 = {
  ordinalNumber: Lb({
    matchPattern: l0,
    parsePattern: s0,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: lr({
    matchPatterns: d0,
    defaultMatchWidth: "wide",
    parsePatterns: c0,
    defaultParseWidth: "any"
  }),
  quarter: lr({
    matchPatterns: u0,
    defaultMatchWidth: "wide",
    parsePatterns: f0,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: lr({
    matchPatterns: h0,
    defaultMatchWidth: "wide",
    parsePatterns: p0,
    defaultParseWidth: "any"
  }),
  day: lr({
    matchPatterns: v0,
    defaultMatchWidth: "wide",
    parsePatterns: g0,
    defaultParseWidth: "any"
  }),
  dayPeriod: lr({
    matchPatterns: m0,
    defaultMatchWidth: "any",
    parsePatterns: b0,
    defaultParseWidth: "any"
  })
};
const C0 = x0;
var y0 = {
  code: "en-US",
  formatDistance: jb,
  formatLong: Kb,
  formatRelative: Zb,
  localize: a0,
  match: C0,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const w0 = y0, S0 = {
  name: "en-US",
  locale: w0
}, P0 = S0;
function In(e) {
  const { mergedLocaleRef: t, mergedDateLocaleRef: o } = Be(Zt, null) || {}, r = R(() => {
    var i, a;
    return (a = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && a !== void 0 ? a : Ab[e];
  });
  return {
    dateLocaleRef: R(() => {
      var i;
      return (i = o == null ? void 0 : o.value) !== null && i !== void 0 ? i : P0;
    }),
    localeRef: r
  };
}
function er(e, t, o) {
  if (!t) {
    process.env.NODE_ENV !== "production" && gs("use-style", "No style is specified.");
    return;
  }
  const r = Io(), n = Be(Zt, null), i = () => {
    const a = o == null ? void 0 : o.value;
    t.mount({
      id: a === void 0 ? e : a + e,
      head: !0,
      anchorMetaName: zr,
      props: {
        bPrefix: a ? `.${a}-` : void 0
      },
      ssr: r
    }), n != null && n.preflightStyleDisabled || wd.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: zr,
      ssr: r
    });
  };
  r ? i() : Ni(i);
}
function bt(e, t, o, r) {
  var n;
  o || gs("useThemeClass", "cssVarsRef is not passed");
  const i = (n = Be(Zt, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, a = L(""), l = Io();
  let s;
  const d = `__${e}`, c = () => {
    let f = d;
    const p = t ? t.value : void 0, v = i == null ? void 0 : i.value;
    v && (f += "-" + v), p && (f += "-" + p);
    const { themeOverrides: u, builtinThemeOverrides: b } = r;
    u && (f += "-" + Sr(JSON.stringify(u))), b && (f += "-" + Sr(JSON.stringify(b))), a.value = f, s = () => {
      const x = o.value;
      let h = "";
      for (const S in x)
        h += `${S}: ${x[S]};`;
      W(`.${f}`, h).mount({
        id: f,
        ssr: l
      }), s = void 0;
    };
  };
  return ht(() => {
    c();
  }), {
    themeClass: a,
    onRender: () => {
      s == null || s();
    }
  };
}
function Bo(e, t, o) {
  if (!t)
    return;
  const r = Io(), n = R(() => {
    const { value: a } = t;
    if (!a)
      return;
    const l = a[e];
    if (l)
      return l;
  }), i = () => {
    ht(() => {
      const { value: a } = o, l = `${a}${e}Rtl`;
      if (yf(l, r))
        return;
      const { value: s } = n;
      s && s.style.mount({
        id: l,
        head: !0,
        anchorMetaName: zr,
        props: {
          bPrefix: a ? `.${a}-` : void 0
        },
        ssr: r
      });
    });
  };
  return r ? i() : Ni(i), n;
}
const $0 = xe({
  name: "Add",
  render() {
    return m(
      "svg",
      { width: "512", height: "512", viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      m("path", { d: "M256 112V400M400 256H112", stroke: "currentColor", "stroke-width": "32", "stroke-linecap": "round", "stroke-linejoin": "round" })
    );
  }
});
function Pd(e, t) {
  return xe({
    name: tm(e),
    setup() {
      var o;
      const r = (o = Be(Zt, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var n;
        const i = (n = r == null ? void 0 : r.value) === null || n === void 0 ? void 0 : n[e];
        return i ? i() : t;
      };
    }
  });
}
const k0 = xe({
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
}), T0 = Pd("close", m(
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
)), z0 = xe({
  name: "Eye",
  render() {
    return m(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      m("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }),
      m("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" })
    );
  }
}), _0 = xe({
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
}), I0 = xe({
  name: "Empty",
  render() {
    return m(
      "svg",
      { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      m("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
      m("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
    );
  }
}), M0 = xe({
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
}), O0 = xe({
  name: "ChevronDown",
  render() {
    return m(
      "svg",
      { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      m("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
    );
  }
}), R0 = Pd("clear", m(
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
)), Mn = xe({
  name: "BaseIconSwitchTransition",
  setup(e, { slots: t }) {
    const o = Br();
    return () => m(Xt, { name: "icon-switch-transition", appear: o.value }, t);
  }
}), E0 = xe({
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
      const l = e.group ? hu : Xt;
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
}), B0 = B("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [W("svg", `
 height: 1em;
 width: 1em;
 `)]), Jt = xe({
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
    er("-base-icon", B0, $e(e, "clsPrefix"));
  },
  render() {
    return m("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
  }
}), D0 = B("base-close", `
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
`, [J("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), W("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), Qe("disabled", [W("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), W("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), W("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), W("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), W("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), J("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), J("round", [W("&::before", `
 border-radius: 50%;
 `)])]), A0 = xe({
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
    return er("-base-close", D0, $e(e, "clsPrefix")), () => {
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
        m(Jt, { clsPrefix: t }, {
          default: () => m(T0, null)
        })
      );
    };
  }
}), F0 = xe({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => m("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
  }
}), {
  cubicBezierEaseInOut: H0
} = ho;
function _r({
  originalTransform: e = "",
  left: t = 0,
  top: o = 0,
  transition: r = `all .3s ${H0} !important`
} = {}) {
  return [W("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: e + " scale(0.75)",
    left: t,
    top: o,
    opacity: 0
  }), W("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${e}`,
    left: t,
    top: o,
    opacity: 1
  }), W("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left: t,
    top: o,
    transition: r
  })];
}
const L0 = W([W("@keyframes loading-container-rotate", `
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `), W("@keyframes loading-layer-rotate", `
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
 `), W("@keyframes loading-left-spin", `
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
 `), W("@keyframes loading-right-spin", `
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
 `, [_r()]), A("container", `
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
 `, [_r({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})])])]), W0 = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, ca = xe({
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
  } }, W0),
  setup(e) {
    er("-base-loading", L0, $e(e, "clsPrefix"));
  },
  render() {
    const { clsPrefix: e, radius: t, strokeWidth: o, stroke: r, scale: n } = this, i = t / n;
    return m(
      "div",
      { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
      m(Mn, null, {
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
function wl(e) {
  return Array.isArray(e) ? e : [e];
}
const Oi = {
  STOP: "STOP"
};
function $d(e, t) {
  const o = t(e);
  e.children !== void 0 && o !== Oi.STOP && e.children.forEach((r) => $d(r, t));
}
function N0(e, t = {}) {
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
function j0(e, t) {
  const { isLeaf: o } = e;
  return o !== void 0 ? o : !t(e);
}
function V0(e) {
  return e.children;
}
function U0(e) {
  return e.key;
}
function q0() {
  return !1;
}
function G0(e, t) {
  const { isLeaf: o } = e;
  return !(o === !1 && !Array.isArray(t(e)));
}
function K0(e) {
  return e.disabled === !0;
}
function Y0(e, t) {
  return e.isLeaf === !1 && !Array.isArray(t(e));
}
function X0(e, t) {
  if (e.isLeaf === !0) {
    const o = t(e);
    if (Array.isArray(o) && o.length > 0)
      return !0;
  }
  return !1;
}
function ti(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function oi(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function Z0(e, t) {
  const o = new Set(e);
  return t.forEach((r) => {
    o.has(r) || o.add(r);
  }), Array.from(o);
}
function J0(e, t) {
  const o = new Set(e);
  return t.forEach((r) => {
    o.has(r) && o.delete(r);
  }), Array.from(o);
}
function Q0(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function ex(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((o, r) => {
    t.set(o.key, r);
  }), (o) => {
    var r;
    return (r = t.get(o)) !== null && r !== void 0 ? r : null;
  };
}
class tx extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function ox(e, t, o, r) {
  return yn(t.concat(e), o, r, !1);
}
function rx(e, t) {
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
function nx(e, t, o, r) {
  const n = yn(t, o, r, !1), i = yn(e, o, r, !0), a = rx(e, o), l = [];
  return n.forEach((s) => {
    (i.has(s) || a.has(s)) && l.push(s);
  }), l.forEach((s) => n.delete(s)), n;
}
function ri(e, t) {
  const { checkedKeys: o, keysToCheck: r, keysToUncheck: n, indeterminateKeys: i, cascade: a, leafOnly: l, checkStrategy: s, allowNotLoaded: d } = e;
  if (!a)
    return r !== void 0 ? {
      checkedKeys: Z0(o, r),
      indeterminateKeys: Array.from(i)
    } : n !== void 0 ? {
      checkedKeys: J0(o, n),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(o),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let f;
  n !== void 0 ? f = nx(n, o, t, d) : r !== void 0 ? f = ox(r, o, t, d) : f = yn(o, t, d, !1);
  const p = s === "parent", v = s === "child" || l, u = f, b = /* @__PURE__ */ new Set(), x = Math.max.apply(null, Array.from(c.keys()));
  for (let h = x; h >= 0; h -= 1) {
    const S = h === 0, E = c.get(h);
    for (const w of E) {
      if (w.isLeaf)
        continue;
      const { key: z, shallowLoaded: I } = w;
      if (v && I && w.children.forEach(($) => {
        !$.disabled && !$.isLeaf && $.shallowLoaded && u.has($.key) && u.delete($.key);
      }), w.disabled || !I)
        continue;
      let g = !0, P = !1, k = !0;
      for (const $ of w.children) {
        const C = $.key;
        if (!$.disabled) {
          if (k && (k = !1), u.has(C))
            P = !0;
          else if (b.has(C)) {
            P = !0, g = !1;
            break;
          } else if (g = !1, P)
            break;
        }
      }
      g && !k ? (p && w.children.forEach(($) => {
        !$.disabled && u.has($.key) && u.delete($.key);
      }), u.add(z)) : P && b.add(z), S && v && u.has(z) && u.delete(z);
    }
  }
  return {
    checkedKeys: Array.from(u),
    indeterminateKeys: Array.from(b)
  };
}
function yn(e, t, o, r) {
  const { treeNodeMap: n, getChildren: i } = t, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const d = n.get(s);
    d !== void 0 && $d(d, (c) => {
      if (c.disabled)
        return Oi.STOP;
      const { key: f } = c;
      if (!a.has(f) && (a.add(f), l.add(f), Y0(c.rawNode, i))) {
        if (r)
          return Oi.STOP;
        if (!o)
          throw new tx();
      }
    });
  }), l;
}
function ix(e, { includeGroup: t = !1, includeSelf: o = !0 }, r) {
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
function ax(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function lx(e, t) {
  const o = e.siblings, r = o.length, { index: n } = e;
  return t ? o[(n + 1) % r] : n === o.length - 1 ? null : o[n + 1];
}
function Sl(e, t, { loop: o = !1, includeDisabled: r = !1 } = {}) {
  const n = t === "prev" ? sx : lx, i = {
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
        const c = ua(d, i);
        c !== null ? l = c : s(n(d, o));
      } else {
        const c = n(d, !1);
        if (c !== null)
          s(c);
        else {
          const f = dx(d);
          f != null && f.isGroup ? s(n(f, o)) : o && s(n(d, !0));
        }
      }
    }
  }
  return s(e), l;
}
function sx(e, t) {
  const o = e.siblings, r = o.length, { index: n } = e;
  return t ? o[(n - 1 + r) % r] : n === 0 ? null : o[n - 1];
}
function dx(e) {
  return e.parent;
}
function ua(e, t = {}) {
  const { reverse: o = !1 } = t, { children: r } = e;
  if (r) {
    const { length: n } = r, i = o ? n - 1 : 0, a = o ? -1 : n, l = o ? -1 : 1;
    for (let s = i; s !== a; s += l) {
      const d = r[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = ua(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const cx = {
  getChild() {
    return this.ignored ? null : ua(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return Sl(this, "next", e);
  },
  getPrev(e = {}) {
    return Sl(this, "prev", e);
  }
};
function ux(e, t) {
  const o = t ? new Set(t) : void 0, r = [];
  function n(i) {
    i.forEach((a) => {
      r.push(a), !(a.isLeaf || !a.children || a.ignored) && (a.isGroup || // normal non-leaf node
      o === void 0 || o.has(a.key)) && n(a.children);
    });
  }
  return n(e), r;
}
function fx(e, t) {
  const o = e.key;
  for (; t; ) {
    if (t.key === o)
      return !0;
    t = t.parent;
  }
  return !1;
}
function kd(e, t, o, r, n, i = null, a = 0) {
  const l = [];
  return e.forEach((s, d) => {
    var c;
    process.env.NODE_ENV !== "production" && X0(s, n) && console.error("[treemate]: node", s, "is invalid");
    const f = Object.create(r);
    if (f.rawNode = s, f.siblings = l, f.level = a, f.index = d, f.isFirstChild = d === 0, f.isLastChild = d + 1 === e.length, f.parent = i, !f.ignored) {
      const p = n(s);
      Array.isArray(p) && (f.children = kd(p, t, o, r, n, f, a + 1));
    }
    l.push(f), t.set(f.key, f), o.has(a) || o.set(a, []), (c = o.get(a)) === null || c === void 0 || c.push(f);
  }), l;
}
function hx(e, t = {}) {
  var o;
  const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), { getDisabled: i = K0, getIgnored: a = q0, getIsGroup: l = Q0, getKey: s = U0 } = t, d = (o = t.getChildren) !== null && o !== void 0 ? o : V0, c = t.ignoreEmptyChildren ? (w) => {
    const z = d(w);
    return Array.isArray(z) ? z.length ? z : null : z;
  } : d, f = Object.assign({
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
      return j0(this.rawNode, c);
    },
    get shallowLoaded() {
      return G0(this.rawNode, c);
    },
    get ignored() {
      return a(this.rawNode);
    },
    contains(w) {
      return fx(this, w);
    }
  }, cx), p = kd(e, r, n, f, c);
  function v(w) {
    if (w == null)
      return null;
    const z = r.get(w);
    return z && !z.isGroup && !z.ignored ? z : null;
  }
  function u(w) {
    if (w == null)
      return null;
    const z = r.get(w);
    return z && !z.ignored ? z : null;
  }
  function b(w, z) {
    const I = u(w);
    return I ? I.getPrev(z) : null;
  }
  function x(w, z) {
    const I = u(w);
    return I ? I.getNext(z) : null;
  }
  function h(w) {
    const z = u(w);
    return z ? z.getParent() : null;
  }
  function S(w) {
    const z = u(w);
    return z ? z.getChild() : null;
  }
  const E = {
    treeNodes: p,
    treeNodeMap: r,
    levelTreeNodeMap: n,
    maxLevel: Math.max(...n.keys()),
    getChildren: c,
    getFlattenedNodes(w) {
      return ux(p, w);
    },
    getNode: v,
    getPrev: b,
    getNext: x,
    getParent: h,
    getChild: S,
    getFirstAvailableNode() {
      return ax(p);
    },
    getPath(w, z = {}) {
      return ix(w, z, E);
    },
    getCheckedKeys(w, z = {}) {
      const { cascade: I = !0, leafOnly: g = !1, checkStrategy: P = "all", allowNotLoaded: k = !1 } = z;
      return ri({
        checkedKeys: ti(w),
        indeterminateKeys: oi(w),
        cascade: I,
        leafOnly: g,
        checkStrategy: P,
        allowNotLoaded: k
      }, E);
    },
    check(w, z, I = {}) {
      const { cascade: g = !0, leafOnly: P = !1, checkStrategy: k = "all", allowNotLoaded: $ = !1 } = I;
      return ri({
        checkedKeys: ti(z),
        indeterminateKeys: oi(z),
        keysToCheck: w == null ? [] : wl(w),
        cascade: g,
        leafOnly: P,
        checkStrategy: k,
        allowNotLoaded: $
      }, E);
    },
    uncheck(w, z, I = {}) {
      const { cascade: g = !0, leafOnly: P = !1, checkStrategy: k = "all", allowNotLoaded: $ = !1 } = I;
      return ri({
        checkedKeys: ti(z),
        indeterminateKeys: oi(z),
        keysToUncheck: w == null ? [] : wl(w),
        cascade: g,
        leafOnly: P,
        checkStrategy: k,
        allowNotLoaded: $
      }, E);
    },
    getNonLeafKeys(w = {}) {
      return N0(p, w);
    }
  };
  return E;
}
const re = {
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
}, px = Nt(re.neutralBase), Td = Nt(re.neutralInvertBase), vx = "rgba(" + Td.slice(0, 3).join(", ") + ", ";
function Oe(e) {
  return vx + String(e) + ")";
}
function gx(e) {
  const t = Array.from(Td);
  return t[3] = Number(e), fe(px, t);
}
const mx = Object.assign(Object.assign({ name: "common" }, ho), {
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
  textColor1: Oe(re.alpha1),
  textColor2: Oe(re.alpha2),
  textColor3: Oe(re.alpha3),
  // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
  // textColor5: overlay(base.alpha5),
  textColorDisabled: Oe(re.alpha4),
  placeholderColor: Oe(re.alpha4),
  placeholderColorDisabled: Oe(re.alpha5),
  iconColor: Oe(re.alpha4),
  iconColorDisabled: Oe(re.alpha5),
  iconColorHover: Oe(Number(re.alpha4) * 1.25),
  iconColorPressed: Oe(Number(re.alpha4) * 0.8),
  opacity1: re.alpha1,
  opacity2: re.alpha2,
  opacity3: re.alpha3,
  opacity4: re.alpha4,
  opacity5: re.alpha5,
  dividerColor: Oe(re.alphaDivider),
  borderColor: Oe(re.alphaBorder),
  // close
  closeIconColorHover: Oe(Number(re.alphaClose)),
  closeIconColor: Oe(Number(re.alphaClose)),
  closeIconColorPressed: Oe(Number(re.alphaClose)),
  closeColorHover: "rgba(255, 255, 255, .12)",
  closeColorPressed: "rgba(255, 255, 255, .08)",
  // clear
  clearColor: Oe(re.alpha4),
  clearColorHover: Je(Oe(re.alpha4), { alpha: 1.25 }),
  clearColorPressed: Je(Oe(re.alpha4), { alpha: 0.8 }),
  scrollbarColor: Oe(re.alphaScrollbar),
  scrollbarColorHover: Oe(re.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: Oe(re.alphaProgressRail),
  railColor: Oe(re.alphaRail),
  popoverColor: re.neutralPopover,
  tableColor: re.neutralCard,
  cardColor: re.neutralCard,
  modalColor: re.neutralModal,
  bodyColor: re.neutralBody,
  tagColor: gx(re.alphaTag),
  avatarColor: Oe(re.alphaAvatar),
  invertedColor: re.neutralBase,
  inputColor: Oe(re.alphaInput),
  codeColor: Oe(re.alphaCode),
  tabColor: Oe(re.alphaTab),
  actionColor: Oe(re.alphaAction),
  tableHeaderColor: Oe(re.alphaAction),
  hoverColor: Oe(re.alphaPending),
  tableColorHover: Oe(re.alphaTablePending),
  tableColorStriped: Oe(re.alphaTableStriped),
  pressedColor: Oe(re.alphaPressed),
  opacityDisabled: re.alphaDisabled,
  inputColorDisabled: Oe(re.alphaDisabledInput),
  buttonColor2: "rgba(255, 255, 255, .08)",
  buttonColor2Hover: "rgba(255, 255, 255, .12)",
  buttonColor2Pressed: "rgba(255, 255, 255, .08)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), ee = mx, pe = {
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
}, bx = Nt(pe.neutralBase), zd = Nt(pe.neutralInvertBase), xx = "rgba(" + zd.slice(0, 3).join(", ") + ", ";
function Pl(e) {
  return xx + String(e) + ")";
}
function ct(e) {
  const t = Array.from(zd);
  return t[3] = Number(e), fe(bx, t);
}
const Cx = Object.assign(Object.assign({ name: "common" }, ho), {
  baseColor: pe.neutralBase,
  // primary color
  primaryColor: pe.primaryDefault,
  primaryColorHover: pe.primaryHover,
  primaryColorPressed: pe.primaryActive,
  primaryColorSuppl: pe.primarySuppl,
  // info color
  infoColor: pe.infoDefault,
  infoColorHover: pe.infoHover,
  infoColorPressed: pe.infoActive,
  infoColorSuppl: pe.infoSuppl,
  // success color
  successColor: pe.successDefault,
  successColorHover: pe.successHover,
  successColorPressed: pe.successActive,
  successColorSuppl: pe.successSuppl,
  // warning color
  warningColor: pe.warningDefault,
  warningColorHover: pe.warningHover,
  warningColorPressed: pe.warningActive,
  warningColorSuppl: pe.warningSuppl,
  // error color
  errorColor: pe.errorDefault,
  errorColorHover: pe.errorHover,
  errorColorPressed: pe.errorActive,
  errorColorSuppl: pe.errorSuppl,
  // text color
  textColorBase: pe.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: ct(pe.alpha4),
  placeholderColor: ct(pe.alpha4),
  placeholderColorDisabled: ct(pe.alpha5),
  iconColor: ct(pe.alpha4),
  iconColorHover: Je(ct(pe.alpha4), { lightness: 0.75 }),
  iconColorPressed: Je(ct(pe.alpha4), { lightness: 0.9 }),
  iconColorDisabled: ct(pe.alpha5),
  opacity1: pe.alpha1,
  opacity2: pe.alpha2,
  opacity3: pe.alpha3,
  opacity4: pe.alpha4,
  opacity5: pe.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: ct(Number(pe.alphaClose)),
  closeIconColorHover: ct(Number(pe.alphaClose)),
  closeIconColorPressed: ct(Number(pe.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: ct(pe.alpha4),
  clearColorHover: Je(ct(pe.alpha4), { lightness: 0.75 }),
  clearColorPressed: Je(ct(pe.alpha4), { lightness: 0.9 }),
  scrollbarColor: Pl(pe.alphaScrollbar),
  scrollbarColorHover: Pl(pe.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: ct(pe.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: pe.neutralPopover,
  tableColor: pe.neutralCard,
  cardColor: pe.neutralCard,
  modalColor: pe.neutralModal,
  bodyColor: pe.neutralBody,
  tagColor: "#eee",
  avatarColor: ct(pe.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: ct(pe.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: pe.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), pt = Cx, yx = {
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
}, _d = (e) => {
  const { textColorDisabled: t, iconColor: o, textColor2: r, fontSizeSmall: n, fontSizeMedium: i, fontSizeLarge: a, fontSizeHuge: l } = e;
  return Object.assign(Object.assign({}, yx), {
    fontSizeSmall: n,
    fontSizeMedium: i,
    fontSizeLarge: a,
    fontSizeHuge: l,
    textColor: t,
    iconColor: o,
    extraTextColor: r
  });
}, wx = {
  name: "Empty",
  common: pt,
  self: _d
}, fa = wx, Sx = {
  name: "Empty",
  common: ee,
  self: _d
}, Do = Sx, Px = B("empty", `
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
 `, [W("+", [A("description", `
 margin-top: 8px;
 `)])]), A("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), A("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), $x = Object.assign(Object.assign({}, Me.props), { description: String, showDescription: {
  type: Boolean,
  default: !0
}, showIcon: {
  type: Boolean,
  default: !0
}, size: {
  type: String,
  default: "medium"
}, renderIcon: Function }), kx = xe({
  name: "Empty",
  props: $x,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = xt(e), r = Me("Empty", "-empty", Px, fa, e, t), { localeRef: n } = In("Empty"), i = Be(Zt, null), a = R(() => {
      var c, f, p;
      return (c = e.description) !== null && c !== void 0 ? c : (p = (f = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || f === void 0 ? void 0 : f.Empty) === null || p === void 0 ? void 0 : p.description;
    }), l = R(() => {
      var c, f;
      return ((f = (c = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || c === void 0 ? void 0 : c.Empty) === null || f === void 0 ? void 0 : f.renderIcon) || (() => m(I0, null));
    }), s = R(() => {
      const { size: c } = e, { common: { cubicBezierEaseInOut: f }, self: { [oe("iconSize", c)]: p, [oe("fontSize", c)]: v, textColor: u, iconColor: b, extraTextColor: x } } = r.value;
      return {
        "--n-icon-size": p,
        "--n-font-size": v,
        "--n-bezier": f,
        "--n-text-color": u,
        "--n-icon-color": b,
        "--n-extra-text-color": x
      };
    }), d = o ? bt("empty", R(() => {
      let c = "";
      const { size: f } = e;
      return c += f[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: l,
      localizedDescription: R(() => a.value || n.value.description),
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
      this.showIcon ? m("div", { class: `${t}-empty__icon` }, e.icon ? e.icon() : m(Jt, { clsPrefix: t }, { default: this.mergedRenderIcon })) : null,
      this.showDescription ? m("div", { class: `${t}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null,
      e.extra ? m("div", { class: `${t}-empty__extra` }, e.extra()) : null
    );
  }
}), Id = (e) => {
  const { scrollbarColor: t, scrollbarColorHover: o } = e;
  return {
    color: t,
    colorHover: o
  };
}, Tx = {
  name: "Scrollbar",
  common: pt,
  self: Id
}, Md = Tx, zx = {
  name: "Scrollbar",
  common: ee,
  self: Id
}, St = zx, {
  cubicBezierEaseInOut: $l
} = ho;
function _x({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: o = "0.2s",
  enterCubicBezier: r = $l,
  leaveCubicBezier: n = $l
} = {}) {
  return [W(`&.${e}-transition-enter-active`, {
    transition: `all ${t} ${r}!important`
  }), W(`&.${e}-transition-leave-active`, {
    transition: `all ${o} ${n}!important`
  }), W(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0
  }), W(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
    opacity: 1
  })];
}
const Ix = B("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [W(">", [B("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [W("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), W(">", [B("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), W(">, +", [B("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [J("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [W(">", [A("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), J("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [W(">", [A("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), J("disabled", [W(">", [A("scrollbar", {
  pointerEvents: "none"
})])]), W(">", [A("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [_x(), W("&:hover", {
  backgroundColor: "var(--n-scrollbar-color-hover)"
})])])])])]), Mx = Object.assign(Object.assign({}, Me.props), {
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
}), Od = xe({
  name: "Scrollbar",
  props: Mx,
  inheritAttrs: !1,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o, mergedRtlRef: r } = xt(e), n = Bo("Scrollbar", r, t), i = L(null), a = L(null), l = L(null), s = L(null), d = L(null), c = L(null), f = L(null), p = L(null), v = L(null), u = L(null), b = L(null), x = L(0), h = L(0), S = L(!1), E = L(!1);
    let w = !1, z = !1, I, g, P = 0, k = 0, $ = 0, C = 0;
    const T = Wf(), M = R(() => {
      const { value: y } = p, { value: F } = c, { value: Z } = u;
      return y === null || F === null || Z === null ? 0 : Math.min(y, Z * y / F + e.size * 1.5);
    }), O = R(() => `${M.value}px`), G = R(() => {
      const { value: y } = v, { value: F } = f, { value: Z } = b;
      return y === null || F === null || Z === null ? 0 : Z * y / F + e.size * 1.5;
    }), Y = R(() => `${G.value}px`), V = R(() => {
      const { value: y } = p, { value: F } = x, { value: Z } = c, { value: se } = u;
      if (y === null || Z === null || se === null)
        return 0;
      {
        const ce = Z - y;
        return ce ? F / ce * (se - M.value) : 0;
      }
    }), ne = R(() => `${V.value}px`), H = R(() => {
      const { value: y } = v, { value: F } = h, { value: Z } = f, { value: se } = b;
      if (y === null || Z === null || se === null)
        return 0;
      {
        const ce = Z - y;
        return ce ? F / ce * (se - G.value) : 0;
      }
    }), U = R(() => `${H.value}px`), de = R(() => {
      const { value: y } = p, { value: F } = c;
      return y !== null && F !== null && F > y;
    }), Se = R(() => {
      const { value: y } = v, { value: F } = f;
      return y !== null && F !== null && F > y;
    }), _e = R(() => {
      const { trigger: y } = e;
      return y === "none" || S.value;
    }), Ee = R(() => {
      const { trigger: y } = e;
      return y === "none" || E.value;
    }), ke = R(() => {
      const { container: y } = e;
      return y ? y() : a.value;
    }), ue = R(() => {
      const { content: y } = e;
      return y ? y() : l.value;
    }), me = Ah(() => {
      e.container || je({
        top: x.value,
        left: h.value
      });
    }), Te = () => {
      me.isDeactivated || q();
    }, ae = (y) => {
      if (me.isDeactivated)
        return;
      const { onResize: F } = e;
      F && F(y), q();
    }, je = (y, F) => {
      if (!e.scrollable)
        return;
      if (typeof y == "number") {
        Ve(F ?? 0, y, 0, !1, "auto");
        return;
      }
      const { left: Z, top: se, index: ce, elSize: ve, position: be, behavior: Pe, el: ot, debounce: $t = !0 } = y;
      (Z !== void 0 || se !== void 0) && Ve(Z ?? 0, se ?? 0, 0, !1, Pe), ot !== void 0 ? Ve(0, ot.offsetTop, ot.offsetHeight, $t, Pe) : ce !== void 0 && ve !== void 0 ? Ve(0, ce * ve, ve, $t, Pe) : be === "bottom" ? Ve(0, Number.MAX_SAFE_INTEGER, 0, !1, Pe) : be === "top" && Ve(0, 0, 0, !1, Pe);
    }, Fe = (y, F) => {
      if (!e.scrollable)
        return;
      const { value: Z } = ke;
      Z && (typeof y == "object" ? Z.scrollBy(y) : Z.scrollBy(y, F || 0));
    };
    function Ve(y, F, Z, se, ce) {
      const { value: ve } = ke;
      if (ve) {
        if (se) {
          const { scrollTop: be, offsetHeight: Pe } = ve;
          if (F > be) {
            F + Z <= be + Pe || ve.scrollTo({
              left: y,
              top: F + Z - Pe,
              behavior: ce
            });
            return;
          }
        }
        ve.scrollTo({
          left: y,
          top: F,
          behavior: ce
        });
      }
    }
    function Ge() {
      le(), Ce(), q();
    }
    function Ze() {
      lt();
    }
    function lt() {
      vt(), X();
    }
    function vt() {
      g !== void 0 && window.clearTimeout(g), g = window.setTimeout(() => {
        E.value = !1;
      }, e.duration);
    }
    function X() {
      I !== void 0 && window.clearTimeout(I), I = window.setTimeout(() => {
        S.value = !1;
      }, e.duration);
    }
    function le() {
      I !== void 0 && window.clearTimeout(I), S.value = !0;
    }
    function Ce() {
      g !== void 0 && window.clearTimeout(g), E.value = !0;
    }
    function ie(y) {
      const { onScroll: F } = e;
      F && F(y), N();
    }
    function N() {
      const { value: y } = ke;
      y && (x.value = y.scrollTop, h.value = y.scrollLeft * (n != null && n.value ? -1 : 1));
    }
    function Q() {
      const { value: y } = ue;
      y && (c.value = y.offsetHeight, f.value = y.offsetWidth);
      const { value: F } = ke;
      F && (p.value = F.offsetHeight, v.value = F.offsetWidth);
      const { value: Z } = d, { value: se } = s;
      Z && (b.value = Z.offsetWidth), se && (u.value = se.offsetHeight);
    }
    function D() {
      const { value: y } = ke;
      y && (x.value = y.scrollTop, h.value = y.scrollLeft * (n != null && n.value ? -1 : 1), p.value = y.offsetHeight, v.value = y.offsetWidth, c.value = y.scrollHeight, f.value = y.scrollWidth);
      const { value: F } = d, { value: Z } = s;
      F && (b.value = F.offsetWidth), Z && (u.value = Z.offsetHeight);
    }
    function q() {
      e.scrollable && (e.useUnifiedContainer ? D() : (Q(), N()));
    }
    function te(y) {
      var F;
      return !(!((F = i.value) === null || F === void 0) && F.contains(Cr(y)));
    }
    function ye(y) {
      y.preventDefault(), y.stopPropagation(), z = !0, Ke("mousemove", window, ze, !0), Ke("mouseup", window, He, !0), k = h.value, $ = n != null && n.value ? window.innerWidth - y.clientX : y.clientX;
    }
    function ze(y) {
      if (!z)
        return;
      I !== void 0 && window.clearTimeout(I), g !== void 0 && window.clearTimeout(g);
      const { value: F } = v, { value: Z } = f, { value: se } = G;
      if (F === null || Z === null)
        return;
      const ve = (n != null && n.value ? window.innerWidth - y.clientX - $ : y.clientX - $) * (Z - F) / (F - se), be = Z - F;
      let Pe = k + ve;
      Pe = Math.min(be, Pe), Pe = Math.max(Pe, 0);
      const { value: ot } = ke;
      if (ot) {
        ot.scrollLeft = Pe * (n != null && n.value ? -1 : 1);
        const { internalOnUpdateScrollLeft: $t } = e;
        $t && $t(Pe);
      }
    }
    function He(y) {
      y.preventDefault(), y.stopPropagation(), qe("mousemove", window, ze, !0), qe("mouseup", window, He, !0), z = !1, q(), te(y) && lt();
    }
    function tt(y) {
      y.preventDefault(), y.stopPropagation(), w = !0, Ke("mousemove", window, Le, !0), Ke("mouseup", window, We, !0), P = x.value, C = y.clientY;
    }
    function Le(y) {
      if (!w)
        return;
      I !== void 0 && window.clearTimeout(I), g !== void 0 && window.clearTimeout(g);
      const { value: F } = p, { value: Z } = c, { value: se } = M;
      if (F === null || Z === null)
        return;
      const ve = (y.clientY - C) * (Z - F) / (F - se), be = Z - F;
      let Pe = P + ve;
      Pe = Math.min(be, Pe), Pe = Math.max(Pe, 0);
      const { value: ot } = ke;
      ot && (ot.scrollTop = Pe);
    }
    function We(y) {
      y.preventDefault(), y.stopPropagation(), qe("mousemove", window, Le, !0), qe("mouseup", window, We, !0), w = !1, q(), te(y) && lt();
    }
    ht(() => {
      const { value: y } = Se, { value: F } = de, { value: Z } = t, { value: se } = d, { value: ce } = s;
      se && (y ? se.classList.remove(`${Z}-scrollbar-rail--disabled`) : se.classList.add(`${Z}-scrollbar-rail--disabled`)), ce && (F ? ce.classList.remove(`${Z}-scrollbar-rail--disabled`) : ce.classList.add(`${Z}-scrollbar-rail--disabled`));
    }), wt(() => {
      e.container || q();
    }), yt(() => {
      I !== void 0 && window.clearTimeout(I), g !== void 0 && window.clearTimeout(g), qe("mousemove", window, Le, !0), qe("mouseup", window, We, !0);
    });
    const dt = Me("Scrollbar", "-scrollbar", Ix, Md, e, t), It = R(() => {
      const { common: { cubicBezierEaseInOut: y, scrollbarBorderRadius: F, scrollbarHeight: Z, scrollbarWidth: se }, self: { color: ce, colorHover: ve } } = dt.value;
      return {
        "--n-scrollbar-bezier": y,
        "--n-scrollbar-color": ce,
        "--n-scrollbar-color-hover": ve,
        "--n-scrollbar-border-radius": F,
        "--n-scrollbar-width": se,
        "--n-scrollbar-height": Z
      };
    }), st = o ? bt("scrollbar", void 0, It, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: je,
      scrollBy: Fe,
      sync: q,
      syncUnifiedContainer: D,
      handleMouseEnterWrapper: Ge,
      handleMouseLeaveWrapper: Ze
    }), {
      mergedClsPrefix: t,
      rtlEnabled: n,
      containerScrollTop: x,
      wrapperRef: i,
      containerRef: a,
      contentRef: l,
      yRailRef: s,
      xRailRef: d,
      needYBar: de,
      needXBar: Se,
      yBarSizePx: O,
      xBarSizePx: Y,
      yBarTopPx: ne,
      xBarLeftPx: U,
      isShowXBar: _e,
      isShowYBar: Ee,
      isIos: T,
      handleScroll: ie,
      handleContentResize: Te,
      handleContainerResize: ae,
      handleYScrollMouseDown: tt,
      handleXScrollMouseDown: ye,
      cssVars: o ? void 0 : It,
      themeClass: st == null ? void 0 : st.themeClass,
      onRender: st == null ? void 0 : st.onRender
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
    ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, m(a ? bi : Xt, a ? null : { name: "fade-in-transition" }, {
      default: () => this.needYBar && this.isShowYBar && !this.isIos ? m("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
        height: this.yBarSizePx,
        top: this.yBarTopPx
      }, onMousedown: this.handleYScrollMouseDown }) : null
    })), s = () => {
      var c, f;
      return (c = this.onRender) === null || c === void 0 || c.call(this), m("div", Wi(this.$attrs, {
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
        this.container ? (f = t.default) === null || f === void 0 ? void 0 : f.call(t) : m(
          "div",
          { role: "none", ref: "containerRef", class: [
            `${o}-scrollbar-container`,
            this.containerClass
          ], style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel },
          m($r, { onResize: this.handleContentResize }, {
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
        ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, m(a ? bi : Xt, a ? null : { name: "fade-in-transition" }, {
          default: () => this.needXBar && this.isShowXBar && !this.isIos ? m("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
            width: this.xBarSizePx,
            right: n ? this.xBarLeftPx : void 0,
            left: n ? void 0 : this.xBarLeftPx
          }, onMousedown: this.handleXScrollMouseDown }) : null
        }))
      ]);
    }, d = this.container ? s() : m($r, { onResize: this.handleContainerResize }, {
      default: s
    });
    return i ? m(
      Qt,
      null,
      d,
      l()
    ) : d;
  }
}), Rd = Od, Ox = Od, Rx = {
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
}, Ed = (e) => {
  const { borderRadius: t, popoverColor: o, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: a, textColorDisabled: l, primaryColor: s, opacityDisabled: d, hoverColor: c, fontSizeSmall: f, fontSizeMedium: p, fontSizeLarge: v, fontSizeHuge: u, heightSmall: b, heightMedium: x, heightLarge: h, heightHuge: S } = e;
  return Object.assign(Object.assign({}, Rx), { optionFontSizeSmall: f, optionFontSizeMedium: p, optionFontSizeLarge: v, optionFontSizeHuge: u, optionHeightSmall: b, optionHeightMedium: x, optionHeightLarge: h, optionHeightHuge: S, borderRadius: t, color: o, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: a, optionTextColorDisabled: l, optionTextColorActive: s, optionOpacityDisabled: d, optionCheckColor: s, optionColorPending: c, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: c, actionTextColor: i, loadingColor: s });
}, Ex = {
  name: "InternalSelectMenu",
  common: pt,
  peers: {
    Scrollbar: Md,
    Empty: fa
  },
  self: Ed
}, Bd = Ex, Bx = {
  name: "InternalSelectMenu",
  common: ee,
  peers: {
    Scrollbar: St,
    Empty: Do
  },
  self: Ed
}, Ar = Bx;
function Dx(e, t) {
  return m(Xt, { name: "fade-in-scale-up-transition" }, {
    default: () => e ? m(Jt, { clsPrefix: t, class: `${t}-base-select-option__check` }, {
      default: () => m(k0)
    }) : null
  });
}
const kl = xe({
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
      handleOptionClick: f,
      handleOptionMouseEnter: p
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = Be(Ui), v = Xe(() => {
      const { value: h } = o;
      return h ? e.tmNode.key === h.key : !1;
    });
    function u(h) {
      const { tmNode: S } = e;
      S.disabled || f(h, S);
    }
    function b(h) {
      const { tmNode: S } = e;
      S.disabled || p(h, S);
    }
    function x(h) {
      const { tmNode: S } = e, { value: E } = v;
      S.disabled || E || p(h, S);
    }
    return {
      multiple: r,
      isGrouped: Xe(() => {
        const { tmNode: h } = e, { parent: S } = h;
        return S && S.rawNode.type === "group";
      }),
      showCheckmark: d,
      nodeProps: c,
      isPending: v,
      isSelected: Xe(() => {
        const { value: h } = t, { value: S } = r;
        if (h === null)
          return !1;
        const E = e.tmNode.rawNode[s.value];
        if (S) {
          const { value: w } = n;
          return w.has(E);
        } else
          return h === E;
      }),
      labelField: l,
      renderLabel: i,
      renderOption: a,
      handleMouseMove: x,
      handleMouseEnter: b,
      handleClick: u
    };
  },
  render() {
    const { clsPrefix: e, tmNode: { rawNode: t }, isSelected: o, isPending: r, isGrouped: n, showCheckmark: i, nodeProps: a, renderOption: l, renderLabel: s, handleClick: d, handleMouseEnter: c, handleMouseMove: f } = this, p = Dx(o, e), v = s ? [s(t, o), i && p] : [
      qo(t[this.labelField], t, o),
      i && p
    ], u = a == null ? void 0 : a(t), b = m(
      "div",
      Object.assign({}, u, { class: [
        `${e}-base-select-option`,
        t.class,
        u == null ? void 0 : u.class,
        {
          [`${e}-base-select-option--disabled`]: t.disabled,
          [`${e}-base-select-option--selected`]: o,
          [`${e}-base-select-option--grouped`]: n,
          [`${e}-base-select-option--pending`]: r,
          [`${e}-base-select-option--show-checkmark`]: i
        }
      ], style: [(u == null ? void 0 : u.style) || "", t.style || ""], onClick: jn([d, u == null ? void 0 : u.onClick]), onMouseenter: jn([
        c,
        u == null ? void 0 : u.onMouseenter
      ]), onMousemove: jn([f, u == null ? void 0 : u.onMousemove]) }),
      m("div", { class: `${e}-base-select-option__content` }, v)
    );
    return t.render ? t.render({ node: b, option: t, selected: o }) : l ? l({ node: b, option: t, selected: o }) : b;
  }
}), Tl = xe({
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
    } = Be(Ui);
    return {
      labelField: o,
      nodeProps: r,
      renderLabel: e,
      renderOption: t
    };
  },
  render() {
    const { clsPrefix: e, renderLabel: t, renderOption: o, nodeProps: r, tmNode: { rawNode: n } } = this, i = r == null ? void 0 : r(n), a = t ? t(n, !1) : qo(n[this.labelField], n, !1), l = m("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), a);
    return n.render ? n.render({ node: l, option: n }) : o ? o({ node: l, option: n, selected: !1 }) : l;
  }
}), {
  cubicBezierEaseIn: zl,
  cubicBezierEaseOut: _l
} = ho;
function wn({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: o = ".9",
  originalTransform: r = "",
  originalTransition: n = ""
} = {}) {
  return [W("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${zl}, transform ${t} ${zl} ${n && "," + n}`
  }), W("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${_l}, transform ${t} ${_l} ${n && "," + n}`
  }), W("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${r} scale(${o})`
  }), W("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${r} scale(1)`
  })];
}
const Ax = B("base-select-menu", `
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
 `, [J("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), W("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), W("&:active", `
 color: var(--n-option-text-color-pressed);
 `), J("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), J("pending", [W("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), J("selected", `
 color: var(--n-option-text-color-active);
 `, [W("&::before", `
 background-color: var(--n-option-color-active);
 `), J("pending", [W("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), J("disabled", `
 cursor: not-allowed;
 `, [Qe("selected", `
 color: var(--n-option-text-color-disabled);
 `), J("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), A("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [wn({
  enterScale: "0.5"
})])])]), Fx = xe({
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
    const t = Me("InternalSelectMenu", "-internal-select-menu", Ax, Bd, e, $e(e, "clsPrefix")), o = L(null), r = L(null), n = L(null), i = R(() => e.treeMate.getFlattenedNodes()), a = R(() => ex(i.value)), l = L(null);
    function s() {
      const { treeMate: H } = e;
      let U = null;
      const { value: de } = e;
      de === null ? U = H.getFirstAvailableNode() : (e.multiple ? U = H.getNode((de || [])[(de || []).length - 1]) : U = H.getNode(de), (!U || U.disabled) && (U = H.getFirstAvailableNode())), C(U || null);
    }
    function d() {
      const { value: H } = l;
      H && !e.treeMate.getNode(H.key) && (l.value = null);
    }
    let c;
    Ae(() => e.show, (H) => {
      H ? c = Ae(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? s() : d(), zt(T)) : d();
      }, {
        immediate: !0
      }) : c == null || c();
    }, {
      immediate: !0
    }), yt(() => {
      c == null || c();
    });
    const f = R(() => yr(t.value.self[oe("optionHeight", e.size)])), p = R(() => on(t.value.self[oe("padding", e.size)])), v = R(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), u = R(() => {
      const H = i.value;
      return H && H.length === 0;
    });
    function b(H) {
      const { onToggle: U } = e;
      U && U(H);
    }
    function x(H) {
      const { onScroll: U } = e;
      U && U(H);
    }
    function h(H) {
      var U;
      (U = n.value) === null || U === void 0 || U.sync(), x(H);
    }
    function S() {
      var H;
      (H = n.value) === null || H === void 0 || H.sync();
    }
    function E() {
      const { value: H } = l;
      return H || null;
    }
    function w(H, U) {
      U.disabled || C(U, !1);
    }
    function z(H, U) {
      U.disabled || b(U);
    }
    function I(H) {
      var U;
      dn(H, "action") || (U = e.onKeyup) === null || U === void 0 || U.call(e, H);
    }
    function g(H) {
      var U;
      dn(H, "action") || (U = e.onKeydown) === null || U === void 0 || U.call(e, H);
    }
    function P(H) {
      var U;
      (U = e.onMousedown) === null || U === void 0 || U.call(e, H), !e.focusable && H.preventDefault();
    }
    function k() {
      const { value: H } = l;
      H && C(H.getNext({ loop: !0 }), !0);
    }
    function $() {
      const { value: H } = l;
      H && C(H.getPrev({ loop: !0 }), !0);
    }
    function C(H, U = !1) {
      l.value = H, U && T();
    }
    function T() {
      var H, U;
      const de = l.value;
      if (!de)
        return;
      const Se = a.value(de.key);
      Se !== null && (e.virtualScroll ? (H = r.value) === null || H === void 0 || H.scrollTo({ index: Se }) : (U = n.value) === null || U === void 0 || U.scrollTo({
        index: Se,
        elSize: f.value
      }));
    }
    function M(H) {
      var U, de;
      !((U = o.value) === null || U === void 0) && U.contains(H.target) && ((de = e.onFocus) === null || de === void 0 || de.call(e, H));
    }
    function O(H) {
      var U, de;
      !((U = o.value) === null || U === void 0) && U.contains(H.relatedTarget) || (de = e.onBlur) === null || de === void 0 || de.call(e, H);
    }
    _t(Ui, {
      handleOptionMouseEnter: w,
      handleOptionClick: z,
      valueSetRef: v,
      pendingTmNodeRef: l,
      nodePropsRef: $e(e, "nodeProps"),
      showCheckmarkRef: $e(e, "showCheckmark"),
      multipleRef: $e(e, "multiple"),
      valueRef: $e(e, "value"),
      renderLabelRef: $e(e, "renderLabel"),
      renderOptionRef: $e(e, "renderOption"),
      labelFieldRef: $e(e, "labelField"),
      valueFieldRef: $e(e, "valueField")
    }), _t(zs, o), wt(() => {
      const { value: H } = n;
      H && H.sync();
    });
    const G = R(() => {
      const { size: H } = e, { common: { cubicBezierEaseInOut: U }, self: { height: de, borderRadius: Se, color: _e, groupHeaderTextColor: Ee, actionDividerColor: ke, optionTextColorPressed: ue, optionTextColor: me, optionTextColorDisabled: Te, optionTextColorActive: ae, optionOpacityDisabled: je, optionCheckColor: Fe, actionTextColor: Ve, optionColorPending: Ge, optionColorActive: Ze, loadingColor: lt, loadingSize: vt, optionColorActivePending: X, [oe("optionFontSize", H)]: le, [oe("optionHeight", H)]: Ce, [oe("optionPadding", H)]: ie } } = t.value;
      return {
        "--n-height": de,
        "--n-action-divider-color": ke,
        "--n-action-text-color": Ve,
        "--n-bezier": U,
        "--n-border-radius": Se,
        "--n-color": _e,
        "--n-option-font-size": le,
        "--n-group-header-text-color": Ee,
        "--n-option-check-color": Fe,
        "--n-option-color-pending": Ge,
        "--n-option-color-active": Ze,
        "--n-option-color-active-pending": X,
        "--n-option-height": Ce,
        "--n-option-opacity-disabled": je,
        "--n-option-text-color": me,
        "--n-option-text-color-active": ae,
        "--n-option-text-color-disabled": Te,
        "--n-option-text-color-pressed": ue,
        "--n-option-padding": ie,
        "--n-option-padding-left": on(ie, "left"),
        "--n-option-padding-right": on(ie, "right"),
        "--n-loading-color": lt,
        "--n-loading-size": vt
      };
    }), { inlineThemeDisabled: Y } = e, V = Y ? bt("internal-select-menu", R(() => e.size[0]), G, e) : void 0, ne = {
      selfRef: o,
      next: k,
      prev: $,
      getPendingTmNode: E
    };
    return Gs(o, e.onResize), Object.assign({
      mergedTheme: t,
      virtualListRef: r,
      scrollbarRef: n,
      itemSize: f,
      padding: p,
      flattenedNodes: i,
      empty: u,
      virtualListContainer() {
        const { value: H } = r;
        return H == null ? void 0 : H.listElRef;
      },
      virtualListContent() {
        const { value: H } = r;
        return H == null ? void 0 : H.itemsElRef;
      },
      doScroll: x,
      handleFocusin: M,
      handleFocusout: O,
      handleKeyUp: I,
      handleKeyDown: g,
      handleMouseDown: P,
      handleVirtualListResize: S,
      handleVirtualListScroll: h,
      cssVars: Y ? void 0 : G,
      themeClass: V == null ? void 0 : V.themeClass,
      onRender: V == null ? void 0 : V.onRender
    }, ne);
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
        m(ca, { clsPrefix: o, strokeWidth: 20 })
      ) : this.empty ? m("div", { class: `${o}-base-select-menu__empty`, "data-empty": !0 }, Yt(e.empty, () => [
        m(kx, { theme: r.peers.Empty, themeOverrides: r.peerOverrides.Empty })
      ])) : m(Rd, { ref: "scrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, scrollable: this.scrollable, container: t ? this.virtualListContainer : void 0, content: t ? this.virtualListContent : void 0, onScroll: t ? void 0 : this.doScroll }, {
        default: () => t ? m(Rh, { ref: "virtualListRef", class: `${o}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: !1, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: !0 }, {
          default: ({ item: a }) => a.isGroup ? m(Tl, { key: a.key, clsPrefix: o, tmNode: a }) : a.ignored ? null : m(kl, { clsPrefix: o, key: a.key, tmNode: a })
        }) : m("div", { class: `${o}-base-select-menu-option-wrapper`, style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        } }, this.flattenedNodes.map((a) => a.isGroup ? m(Tl, { key: a.key, clsPrefix: o, tmNode: a }) : m(kl, { clsPrefix: o, key: a.key, tmNode: a })))
      }),
      mt(e.action, (a) => a && [
        m("div", { class: `${o}-base-select-menu__action`, "data-action": !0, key: "action" }, a),
        m(F0, { onFocus: this.onTabOut, key: "focus-detector" })
      ])
    );
  }
}), Hx = B("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), Lx = xe({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    er("-base-wave", Hx, $e(e, "clsPrefix"));
    const t = L(null), o = L(!1);
    let r = null;
    return yt(() => {
      r !== null && window.clearTimeout(r);
    }), {
      active: o,
      selfRef: t,
      play() {
        r !== null && (window.clearTimeout(r), o.value = !1, r = null), zt(() => {
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
}), Wx = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
}, Dd = (e) => {
  const { boxShadow2: t, popoverColor: o, textColor2: r, borderRadius: n, fontSize: i, dividerColor: a } = e;
  return Object.assign(Object.assign({}, Wx), {
    fontSize: i,
    borderRadius: n,
    color: o,
    dividerColor: a,
    textColor: r,
    boxShadow: t
  });
}, Nx = {
  name: "Popover",
  common: pt,
  self: Dd
}, ha = Nx, jx = {
  name: "Popover",
  common: ee,
  self: Dd
}, Ao = jx, ni = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, rt = "var(--n-arrow-height) * 1.414", Vx = W([B("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [W(">", [B("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Qe("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Qe("scrollable", [Qe("show-header-or-footer", "padding: var(--n-padding);")])]), A("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), A("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), J("scrollable, show-header-or-footer", [A("content", `
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
 width: calc(${rt});
 height: calc(${rt});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
  // body transition
  W("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  W("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  W("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  W("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
]), Mt("top-start", `
 top: calc(${rt} / -2);
 left: calc(${Kt("top-start")} - var(--v-offset-left));
 `), Mt("top", `
 top: calc(${rt} / -2);
 transform: translateX(calc(${rt} / -2)) rotate(45deg);
 left: 50%;
 `), Mt("top-end", `
 top: calc(${rt} / -2);
 right: calc(${Kt("top-end")} + var(--v-offset-left));
 `), Mt("bottom-start", `
 bottom: calc(${rt} / -2);
 left: calc(${Kt("bottom-start")} - var(--v-offset-left));
 `), Mt("bottom", `
 bottom: calc(${rt} / -2);
 transform: translateX(calc(${rt} / -2)) rotate(45deg);
 left: 50%;
 `), Mt("bottom-end", `
 bottom: calc(${rt} / -2);
 right: calc(${Kt("bottom-end")} + var(--v-offset-left));
 `), Mt("left-start", `
 left: calc(${rt} / -2);
 top: calc(${Kt("left-start")} - var(--v-offset-top));
 `), Mt("left", `
 left: calc(${rt} / -2);
 transform: translateY(calc(${rt} / -2)) rotate(45deg);
 top: 50%;
 `), Mt("left-end", `
 left: calc(${rt} / -2);
 bottom: calc(${Kt("left-end")} + var(--v-offset-top));
 `), Mt("right-start", `
 right: calc(${rt} / -2);
 top: calc(${Kt("right-start")} - var(--v-offset-top));
 `), Mt("right", `
 right: calc(${rt} / -2);
 transform: translateY(calc(${rt} / -2)) rotate(45deg);
 top: 50%;
 `), Mt("right-end", `
 right: calc(${rt} / -2);
 bottom: calc(${Kt("right-end")} + var(--v-offset-top));
 `), ...Mb({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const o = ["right", "left"].includes(t), r = o ? "width" : "height";
  return e.map((n) => {
    const i = n.split("-")[1] === "end", l = `calc((${`var(--v-target-${r}, 0px)`} - ${rt}) / 2)`, s = Kt(n);
    return W(`[v-placement="${n}"] >`, [B("popover-shared", [J("center-arrow", [B("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${o ? "left" : "top"}));`)])])]);
  });
})]);
function Kt(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function Mt(e, t) {
  const o = e.split("-")[0], r = ["top", "bottom"].includes(o) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return W(`[v-placement="${e}"] >`, [B("popover-shared", `
 margin-${ni[o]}: var(--n-space);
 `, [J("show-arrow", `
 margin-${ni[o]}: var(--n-space-arrow);
 `), J("overlap", `
 margin: 0;
 `), kf("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${o}: 100%;
 ${ni[o]}: auto;
 ${r}
 `, [B("popover-arrow", t)])])]);
}
const Ad = Object.assign(Object.assign({}, Me.props), {
  to: Rt.propTo,
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
}), Ux = ({ arrowStyle: e, clsPrefix: t }) => m(
  "div",
  { key: "__popover-arrow__", class: `${t}-popover-arrow-wrapper` },
  m("div", { class: `${t}-popover-arrow`, style: e })
), qx = xe({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: Ad,
  setup(e, { slots: t, attrs: o }) {
    const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = xt(e), a = Me("Popover", "-popover", Vx, ha, e, n), l = L(null), s = Be("NPopover"), d = L(null), c = L(e.show), f = L(!1);
    ht(() => {
      const { show: g } = e;
      g && !Tf() && !e.internalDeactivateImmediately && (f.value = !0);
    });
    const p = R(() => {
      const { trigger: g, onClickoutside: P } = e, k = [], { positionManuallyRef: { value: $ } } = s;
      return $ || (g === "click" && !P && k.push([
        pn,
        w,
        void 0,
        { capture: !0 }
      ]), g === "hover" && k.push([qf, E])), P && k.push([
        pn,
        w,
        void 0,
        { capture: !0 }
      ]), (e.displayDirective === "show" || e.animated && f.value) && k.push([Zl, e.show]), k;
    }), v = R(() => {
      const g = e.width === "trigger" ? void 0 : Ko(e.width), P = [];
      g && P.push({ width: g });
      const { maxWidth: k, minWidth: $ } = e;
      return k && P.push({ maxWidth: Ko(k) }), $ && P.push({ maxWidth: Ko($) }), i || P.push(u.value), P;
    }), u = R(() => {
      const { common: { cubicBezierEaseInOut: g, cubicBezierEaseIn: P, cubicBezierEaseOut: k }, self: { space: $, spaceArrow: C, padding: T, fontSize: M, textColor: O, dividerColor: G, color: Y, boxShadow: V, borderRadius: ne, arrowHeight: H, arrowOffset: U, arrowOffsetVertical: de } } = a.value;
      return {
        "--n-box-shadow": V,
        "--n-bezier": g,
        "--n-bezier-ease-in": P,
        "--n-bezier-ease-out": k,
        "--n-font-size": M,
        "--n-text-color": O,
        "--n-color": Y,
        "--n-divider-color": G,
        "--n-border-radius": ne,
        "--n-arrow-height": H,
        "--n-arrow-offset": U,
        "--n-arrow-offset-vertical": de,
        "--n-padding": T,
        "--n-space": $,
        "--n-space-arrow": C
      };
    }), b = i ? bt("popover", void 0, u, e) : void 0;
    s.setBodyInstance({
      syncPosition: x
    }), yt(() => {
      s.setBodyInstance(null);
    }), Ae($e(e, "show"), (g) => {
      e.animated || (g ? c.value = !0 : c.value = !1);
    });
    function x() {
      var g;
      (g = l.value) === null || g === void 0 || g.syncPosition();
    }
    function h(g) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(g);
    }
    function S(g) {
      e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(g);
    }
    function E(g) {
      e.trigger === "hover" && !z().contains(Cr(g)) && s.handleMouseMoveOutside(g);
    }
    function w(g) {
      (e.trigger === "click" && !z().contains(Cr(g)) || e.onClickoutside) && s.handleClickOutside(g);
    }
    function z() {
      return s.getTriggerElement();
    }
    _t(Ms, d), _t(Is, null), _t(_s, null);
    function I() {
      if (b == null || b.onRender(), !(e.displayDirective === "show" || e.show || e.animated && f.value))
        return null;
      let P;
      const k = s.internalRenderBodyRef.value, { value: $ } = n;
      if (k)
        P = k(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [
            `${$}-popover-shared`,
            b == null ? void 0 : b.themeClass.value,
            e.overlap && `${$}-popover-shared--overlap`,
            e.showArrow && `${$}-popover-shared--show-arrow`,
            e.arrowPointToCenter && `${$}-popover-shared--center-arrow`
          ],
          d,
          v.value,
          h,
          S
        );
      else {
        const { value: C } = s.extraClassRef, { internalTrapFocus: T } = e, M = !mi(t.header) || !mi(t.footer), O = () => {
          var G;
          const Y = M ? m(
            Qt,
            null,
            mt(t.header, (H) => H ? m("div", { class: `${$}-popover__header`, style: e.headerStyle }, H) : null),
            mt(t.default, (H) => H ? m("div", { class: `${$}-popover__content`, style: e.contentStyle }, t) : null),
            mt(t.footer, (H) => H ? m("div", { class: `${$}-popover__footer`, style: e.footerStyle }, H) : null)
          ) : e.scrollable ? (G = t.default) === null || G === void 0 ? void 0 : G.call(t) : m("div", { class: `${$}-popover__content`, style: e.contentStyle }, t), V = e.scrollable ? m(Ox, { contentClass: M ? void 0 : `${$}-popover__content`, contentStyle: M ? void 0 : e.contentStyle }, {
            default: () => Y
          }) : Y, ne = e.showArrow ? Ux({
            arrowStyle: e.arrowStyle,
            clsPrefix: $
          }) : null;
          return [V, ne];
        };
        P = m("div", Wi({
          class: [
            `${$}-popover`,
            `${$}-popover-shared`,
            b == null ? void 0 : b.themeClass.value,
            C.map((G) => `${$}-${G}`),
            {
              [`${$}-popover--scrollable`]: e.scrollable,
              [`${$}-popover--show-header-or-footer`]: M,
              [`${$}-popover--raw`]: e.raw,
              [`${$}-popover-shared--overlap`]: e.overlap,
              [`${$}-popover-shared--show-arrow`]: e.showArrow,
              [`${$}-popover-shared--center-arrow`]: e.arrowPointToCenter
            }
          ],
          ref: d,
          style: v.value,
          onKeydown: s.handleKeydown,
          onMouseenter: h,
          onMouseleave: S
        }, o), T ? m(Dh, { active: e.show, autoFocus: !0 }, { default: O }) : O());
      }
      return Or(P, p.value);
    }
    return {
      displayed: f,
      namespace: r,
      isMounted: s.isMountedRef,
      zIndex: s.zIndexRef,
      followerRef: l,
      adjustedTo: Rt(e),
      followerEnabled: c,
      renderContentNode: I
    };
  },
  render() {
    return m(Yi, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === Rt.tdkey }, {
      default: () => this.animated ? m(Xt, {
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
}), Gx = Object.keys(Ad), Kx = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function Yx(e, t, o) {
  Kx[t].forEach((r) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const n = e.props[r], i = o[r];
    n ? e.props[r] = (...a) => {
      n(...a), i(...a);
    } : e.props[r] = i;
  });
}
const Xx = et("").type, Fd = {
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
  to: Rt.propTo,
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
}, Zx = Object.assign(Object.assign(Object.assign({}, Me.props), Fd), { internalOnAfterLeave: Function, internalRenderBody: Function }), Hd = xe({
  name: "Popover",
  inheritAttrs: !1,
  props: Zx,
  __popover__: !0,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.maxWidth !== void 0 && kt("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && kt("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && kt("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && kt("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && kt("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
    });
    const t = Br(), o = L(null), r = R(() => e.show), n = L(e.defaultShow), i = so(r, n), a = Xe(() => e.disabled ? !1 : i.value), l = () => {
      if (e.disabled)
        return !0;
      const { getDisabled: O } = e;
      return !!(O != null && O());
    }, s = () => l() ? !1 : i.value, d = Ts(e, ["arrow", "showArrow"]), c = R(() => e.overlap ? !1 : d.value);
    let f = null;
    const p = L(null), v = L(null), u = Xe(() => e.x !== void 0 && e.y !== void 0);
    function b(O) {
      const { "onUpdate:show": G, onUpdateShow: Y, onShow: V, onHide: ne } = e;
      n.value = O, G && he(G, O), Y && he(Y, O), O && V && he(V, !0), O && ne && he(ne, !1);
    }
    function x() {
      f && f.syncPosition();
    }
    function h() {
      const { value: O } = p;
      O && (window.clearTimeout(O), p.value = null);
    }
    function S() {
      const { value: O } = v;
      O && (window.clearTimeout(O), v.value = null);
    }
    function E() {
      const O = l();
      if (e.trigger === "focus" && !O) {
        if (s())
          return;
        b(!0);
      }
    }
    function w() {
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
        if (S(), p.value !== null || s())
          return;
        const G = () => {
          b(!0), p.value = null;
        }, { delay: Y } = e;
        Y === 0 ? G() : p.value = window.setTimeout(G, Y);
      }
    }
    function I() {
      const O = l();
      if (e.trigger === "hover" && !O) {
        if (h(), v.value !== null || !s())
          return;
        const G = () => {
          b(!1), v.value = null;
        }, { duration: Y } = e;
        Y === 0 ? G() : v.value = window.setTimeout(G, Y);
      }
    }
    function g() {
      I();
    }
    function P(O) {
      var G;
      s() && (e.trigger === "click" && (h(), S(), b(!1)), (G = e.onClickoutside) === null || G === void 0 || G.call(e, O));
    }
    function k() {
      if (e.trigger === "click" && !l()) {
        h(), S();
        const O = !s();
        b(O);
      }
    }
    function $(O) {
      e.internalTrapFocus && O.key === "Escape" && (h(), S(), b(!1));
    }
    function C(O) {
      n.value = O;
    }
    function T() {
      var O;
      return (O = o.value) === null || O === void 0 ? void 0 : O.targetRef;
    }
    function M(O) {
      f = O;
    }
    return _t("NPopover", {
      getTriggerElement: T,
      handleKeydown: $,
      handleMouseEnter: z,
      handleMouseLeave: I,
      handleClickOutside: P,
      handleMouseMoveOutside: g,
      setBodyInstance: M,
      positionManuallyRef: u,
      isMountedRef: t,
      zIndexRef: $e(e, "zIndex"),
      extraClassRef: $e(e, "internalExtraClass"),
      internalRenderBodyRef: $e(e, "internalRenderBody")
    }), ht(() => {
      i.value && l() && b(!1);
    }), {
      binderInstRef: o,
      positionManually: u,
      mergedShowConsideringDisabledProp: a,
      // if to show popover body
      uncontrolledShow: n,
      mergedShowArrow: c,
      getMergedShow: s,
      setShow: C,
      handleClick: k,
      handleMouseEnter: z,
      handleMouseLeave: I,
      handleFocus: E,
      handleBlur: w,
      syncPosition: x
    };
  },
  render() {
    var e;
    const { positionManually: t, $slots: o } = this;
    let r, n = !1;
    if (!t && (o.activator ? r = Ta(o, "activator") : r = Ta(o, "trigger"), r)) {
      r = pu(r), r = r.type === Xx ? m("span", [r]) : r;
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
        Yx(r, a ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return m(qi, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [
          this.internalTrapFocus && i ? Or(m("div", { style: { position: "fixed", inset: 0 } }), [
            [
              Bs,
              {
                enabled: i,
                zIndex: this.zIndex
              }
            ]
          ]) : null,
          t ? null : m(Gi, null, {
            default: () => r
          }),
          m(qx, tf(this.$props, Gx, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
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
}), Ld = {
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
}, Jx = {
  name: "Tag",
  common: ee,
  self(e) {
    const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: d, borderColor: c, tagColor: f, opacityDisabled: p, closeIconColor: v, closeIconColorHover: u, closeIconColorPressed: b, closeColorHover: x, closeColorPressed: h, borderRadiusSmall: S, fontSizeMini: E, fontSizeTiny: w, fontSizeSmall: z, fontSizeMedium: I, heightMini: g, heightTiny: P, heightSmall: k, heightMedium: $, buttonColor2Hover: C, buttonColor2Pressed: T, fontWeightStrong: M } = e;
    return Object.assign(Object.assign({}, Ld), {
      closeBorderRadius: S,
      heightTiny: g,
      heightSmall: P,
      heightMedium: k,
      heightLarge: $,
      borderRadius: S,
      opacityDisabled: p,
      fontSizeTiny: E,
      fontSizeSmall: w,
      fontSizeMedium: z,
      fontSizeLarge: I,
      fontWeightStrong: M,
      // checked
      textColorCheckable: t,
      textColorHoverCheckable: t,
      textColorPressedCheckable: t,
      textColorChecked: d,
      colorCheckable: "#0000",
      colorHoverCheckable: C,
      colorPressedCheckable: T,
      colorChecked: n,
      colorCheckedHover: o,
      colorCheckedPressed: r,
      // default
      border: `1px solid ${c}`,
      textColor: t,
      color: f,
      colorBordered: "#0000",
      closeIconColor: v,
      closeIconColorHover: u,
      closeIconColorPressed: b,
      closeColorHover: x,
      closeColorPressed: h,
      borderPrimary: `1px solid ${K(n, { alpha: 0.3 })}`,
      textColorPrimary: n,
      colorPrimary: K(n, { alpha: 0.16 }),
      colorBorderedPrimary: "#0000",
      closeIconColorPrimary: Je(n, { lightness: 0.7 }),
      closeIconColorHoverPrimary: Je(n, { lightness: 0.7 }),
      closeIconColorPressedPrimary: Je(n, {
        lightness: 0.7
      }),
      closeColorHoverPrimary: K(n, { alpha: 0.16 }),
      closeColorPressedPrimary: K(n, { alpha: 0.12 }),
      borderInfo: `1px solid ${K(i, { alpha: 0.3 })}`,
      textColorInfo: i,
      colorInfo: K(i, { alpha: 0.16 }),
      colorBorderedInfo: "#0000",
      closeIconColorInfo: Je(i, { alpha: 0.7 }),
      closeIconColorHoverInfo: Je(i, { alpha: 0.7 }),
      closeIconColorPressedInfo: Je(i, { alpha: 0.7 }),
      closeColorHoverInfo: K(i, { alpha: 0.16 }),
      closeColorPressedInfo: K(i, { alpha: 0.12 }),
      borderSuccess: `1px solid ${K(a, { alpha: 0.3 })}`,
      textColorSuccess: a,
      colorSuccess: K(a, { alpha: 0.16 }),
      colorBorderedSuccess: "#0000",
      closeIconColorSuccess: Je(a, { alpha: 0.7 }),
      closeIconColorHoverSuccess: Je(a, { alpha: 0.7 }),
      closeIconColorPressedSuccess: Je(a, { alpha: 0.7 }),
      closeColorHoverSuccess: K(a, { alpha: 0.16 }),
      closeColorPressedSuccess: K(a, { alpha: 0.12 }),
      borderWarning: `1px solid ${K(l, { alpha: 0.3 })}`,
      textColorWarning: l,
      colorWarning: K(l, { alpha: 0.16 }),
      colorBorderedWarning: "#0000",
      closeIconColorWarning: Je(l, { alpha: 0.7 }),
      closeIconColorHoverWarning: Je(l, { alpha: 0.7 }),
      closeIconColorPressedWarning: Je(l, { alpha: 0.7 }),
      closeColorHoverWarning: K(l, { alpha: 0.16 }),
      closeColorPressedWarning: K(l, { alpha: 0.11 }),
      borderError: `1px solid ${K(s, { alpha: 0.3 })}`,
      textColorError: s,
      colorError: K(s, { alpha: 0.16 }),
      colorBorderedError: "#0000",
      closeIconColorError: Je(s, { alpha: 0.7 }),
      closeIconColorHoverError: Je(s, { alpha: 0.7 }),
      closeIconColorPressedError: Je(s, { alpha: 0.7 }),
      closeColorHoverError: K(s, { alpha: 0.16 }),
      closeColorPressedError: K(s, { alpha: 0.12 })
    });
  }
}, Wd = Jx, Qx = (e) => {
  const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: d, borderColor: c, opacityDisabled: f, tagColor: p, closeIconColor: v, closeIconColorHover: u, closeIconColorPressed: b, borderRadiusSmall: x, fontSizeMini: h, fontSizeTiny: S, fontSizeSmall: E, fontSizeMedium: w, heightMini: z, heightTiny: I, heightSmall: g, heightMedium: P, closeColorHover: k, closeColorPressed: $, buttonColor2Hover: C, buttonColor2Pressed: T, fontWeightStrong: M } = e;
  return Object.assign(Object.assign({}, Ld), {
    closeBorderRadius: x,
    heightTiny: z,
    heightSmall: I,
    heightMedium: g,
    heightLarge: P,
    borderRadius: x,
    opacityDisabled: f,
    fontSizeTiny: h,
    fontSizeSmall: S,
    fontSizeMedium: E,
    fontSizeLarge: w,
    fontWeightStrong: M,
    // checked
    textColorCheckable: t,
    textColorHoverCheckable: t,
    textColorPressedCheckable: t,
    textColorChecked: d,
    colorCheckable: "#0000",
    colorHoverCheckable: C,
    colorPressedCheckable: T,
    colorChecked: n,
    colorCheckedHover: o,
    colorCheckedPressed: r,
    // default
    border: `1px solid ${c}`,
    textColor: t,
    color: p,
    colorBordered: "rgb(250, 250, 252)",
    closeIconColor: v,
    closeIconColorHover: u,
    closeIconColorPressed: b,
    closeColorHover: k,
    closeColorPressed: $,
    borderPrimary: `1px solid ${K(n, { alpha: 0.3 })}`,
    textColorPrimary: n,
    colorPrimary: K(n, { alpha: 0.12 }),
    colorBorderedPrimary: K(n, { alpha: 0.1 }),
    closeIconColorPrimary: n,
    closeIconColorHoverPrimary: n,
    closeIconColorPressedPrimary: n,
    closeColorHoverPrimary: K(n, { alpha: 0.12 }),
    closeColorPressedPrimary: K(n, { alpha: 0.18 }),
    borderInfo: `1px solid ${K(i, { alpha: 0.3 })}`,
    textColorInfo: i,
    colorInfo: K(i, { alpha: 0.12 }),
    colorBorderedInfo: K(i, { alpha: 0.1 }),
    closeIconColorInfo: i,
    closeIconColorHoverInfo: i,
    closeIconColorPressedInfo: i,
    closeColorHoverInfo: K(i, { alpha: 0.12 }),
    closeColorPressedInfo: K(i, { alpha: 0.18 }),
    borderSuccess: `1px solid ${K(a, { alpha: 0.3 })}`,
    textColorSuccess: a,
    colorSuccess: K(a, { alpha: 0.12 }),
    colorBorderedSuccess: K(a, { alpha: 0.1 }),
    closeIconColorSuccess: a,
    closeIconColorHoverSuccess: a,
    closeIconColorPressedSuccess: a,
    closeColorHoverSuccess: K(a, { alpha: 0.12 }),
    closeColorPressedSuccess: K(a, { alpha: 0.18 }),
    borderWarning: `1px solid ${K(l, { alpha: 0.35 })}`,
    textColorWarning: l,
    colorWarning: K(l, { alpha: 0.15 }),
    colorBorderedWarning: K(l, { alpha: 0.12 }),
    closeIconColorWarning: l,
    closeIconColorHoverWarning: l,
    closeIconColorPressedWarning: l,
    closeColorHoverWarning: K(l, { alpha: 0.12 }),
    closeColorPressedWarning: K(l, { alpha: 0.18 }),
    borderError: `1px solid ${K(s, { alpha: 0.23 })}`,
    textColorError: s,
    colorError: K(s, { alpha: 0.1 }),
    colorBorderedError: K(s, { alpha: 0.08 }),
    closeIconColorError: s,
    closeIconColorHoverError: s,
    closeIconColorPressedError: s,
    closeColorHoverError: K(s, { alpha: 0.12 }),
    closeColorPressedError: K(s, { alpha: 0.18 })
  });
}, eC = {
  name: "Tag",
  common: pt,
  self: Qx
}, tC = eC, oC = {
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
}, rC = B("tag", `
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
`, [J("strong", `
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
 `), J("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [A("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), A("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), J("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), J("icon, avatar", [J("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), J("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), J("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [Qe("disabled", [W("&:hover", "background-color: var(--n-color-hover-checkable);", [Qe("checked", "color: var(--n-text-color-hover-checkable);")]), W("&:active", "background-color: var(--n-color-pressed-checkable);", [Qe("checked", "color: var(--n-text-color-pressed-checkable);")])]), J("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Qe("disabled", [W("&:hover", "background-color: var(--n-color-checked-hover);"), W("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), nC = Object.assign(Object.assign(Object.assign({}, Me.props), oC), {
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
}), iC = "n-tag", ii = xe({
  name: "Tag",
  props: nC,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onCheckedChange !== void 0 && kt("tag", "`on-checked-change` is deprecated, please use `on-update:checked` instead");
    });
    const t = L(null), { mergedBorderedRef: o, mergedClsPrefixRef: r, inlineThemeDisabled: n, mergedRtlRef: i } = xt(e), a = Me("Tag", "-tag", rC, tC, e, r);
    _t(iC, {
      roundRef: $e(e, "round")
    });
    function l(v) {
      if (!e.disabled && e.checkable) {
        const { checked: u, onCheckedChange: b, onUpdateChecked: x, "onUpdate:checked": h } = e;
        x && x(!u), h && h(!u), b && b(!u);
      }
    }
    function s(v) {
      if (e.triggerClickOnClose || v.stopPropagation(), !e.disabled) {
        const { onClose: u } = e;
        u && he(u, v);
      }
    }
    const d = {
      setTextContent(v) {
        const { value: u } = t;
        u && (u.textContent = v);
      }
    }, c = Bo("Tag", i, r), f = R(() => {
      const { type: v, size: u, color: { color: b, textColor: x } = {} } = e, { common: { cubicBezierEaseInOut: h }, self: { padding: S, closeMargin: E, closeMarginRtl: w, borderRadius: z, opacityDisabled: I, textColorCheckable: g, textColorHoverCheckable: P, textColorPressedCheckable: k, textColorChecked: $, colorCheckable: C, colorHoverCheckable: T, colorPressedCheckable: M, colorChecked: O, colorCheckedHover: G, colorCheckedPressed: Y, closeBorderRadius: V, fontWeightStrong: ne, [oe("colorBordered", v)]: H, [oe("closeSize", u)]: U, [oe("closeIconSize", u)]: de, [oe("fontSize", u)]: Se, [oe("height", u)]: _e, [oe("color", v)]: Ee, [oe("textColor", v)]: ke, [oe("border", v)]: ue, [oe("closeIconColor", v)]: me, [oe("closeIconColorHover", v)]: Te, [oe("closeIconColorPressed", v)]: ae, [oe("closeColorHover", v)]: je, [oe("closeColorPressed", v)]: Fe } } = a.value;
      return {
        "--n-font-weight-strong": ne,
        "--n-avatar-size-override": `calc(${_e} - 8px)`,
        "--n-bezier": h,
        "--n-border-radius": z,
        "--n-border": ue,
        "--n-close-icon-size": de,
        "--n-close-color-pressed": Fe,
        "--n-close-color-hover": je,
        "--n-close-border-radius": V,
        "--n-close-icon-color": me,
        "--n-close-icon-color-hover": Te,
        "--n-close-icon-color-pressed": ae,
        "--n-close-icon-color-disabled": me,
        "--n-close-margin": E,
        "--n-close-margin-rtl": w,
        "--n-close-size": U,
        "--n-color": b || (o.value ? H : Ee),
        "--n-color-checkable": C,
        "--n-color-checked": O,
        "--n-color-checked-hover": G,
        "--n-color-checked-pressed": Y,
        "--n-color-hover-checkable": T,
        "--n-color-pressed-checkable": M,
        "--n-font-size": Se,
        "--n-height": _e,
        "--n-opacity-disabled": I,
        "--n-padding": S,
        "--n-text-color": x || ke,
        "--n-text-color-checkable": g,
        "--n-text-color-checked": $,
        "--n-text-color-hover-checkable": P,
        "--n-text-color-pressed-checkable": k
      };
    }), p = n ? bt("tag", R(() => {
      let v = "";
      const { type: u, size: b, color: { color: x, textColor: h } = {} } = e;
      return v += u[0], v += b[0], x && (v += `a${fn(x)}`), h && (v += `b${fn(h)}`), o.value && (v += "c"), v;
    }), f, e) : void 0;
    return Object.assign(Object.assign({}, d), {
      rtlEnabled: c,
      mergedClsPrefix: r,
      contentRef: t,
      mergedBordered: o,
      handleClick: l,
      handleCloseClick: s,
      cssVars: n ? void 0 : f,
      themeClass: p == null ? void 0 : p.themeClass,
      onRender: p == null ? void 0 : p.onRender
    });
  },
  render() {
    var e, t;
    const { mergedClsPrefix: o, rtlEnabled: r, closable: n, color: { borderColor: i } = {}, round: a, onRender: l, $slots: s } = this;
    l == null || l();
    const d = mt(s.avatar, (f) => f && m("div", { class: `${o}-tag__avatar` }, f)), c = mt(s.icon, (f) => f && m("div", { class: `${o}-tag__icon` }, f));
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
      !this.checkable && n ? m(A0, { clsPrefix: o, class: `${o}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: a, isButtonTag: this.internalCloseIsButtonTag, absolute: !0 }) : null,
      !this.checkable && this.mergedBordered ? m("div", { class: `${o}-tag__border`, style: { borderColor: i } }) : null
    );
  }
}), aC = B("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [W(">", [A("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [W("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), W("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), A("placeholder", `
 display: flex;
 `), A("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [_r({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), Ri = xe({
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
    return er("-base-clear", aC, $e(e, "clsPrefix")), {
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
      m(Mn, null, {
        default: () => {
          var t, o;
          return this.show ? m("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Yt(this.$slots.icon, () => [
            m(Jt, { clsPrefix: e }, {
              default: () => m(R0, null)
            })
          ])) : m("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (o = (t = this.$slots).placeholder) === null || o === void 0 ? void 0 : o.call(t));
        }
      })
    );
  }
}), Nd = xe({
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
      return m(ca, { clsPrefix: o, class: `${o}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
        default: () => e.showArrow ? m(Ri, { clsPrefix: o, show: e.showClear, onClear: e.onClear }, {
          placeholder: () => m(Jt, { clsPrefix: o, class: `${o}-base-suffix__arrow` }, {
            default: () => Yt(t.default, () => [
              m(O0, null)
            ])
          })
        }) : null
      });
    };
  }
}), jd = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
}, lC = (e) => {
  const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: f, borderColor: p, iconColor: v, iconColorDisabled: u, clearColor: b, clearColorHover: x, clearColorPressed: h, placeholderColor: S, placeholderColorDisabled: E, fontSizeTiny: w, fontSizeSmall: z, fontSizeMedium: I, fontSizeLarge: g, heightTiny: P, heightSmall: k, heightMedium: $, heightLarge: C } = e;
  return Object.assign(Object.assign({}, jd), {
    fontSizeTiny: w,
    fontSizeSmall: z,
    fontSizeMedium: I,
    fontSizeLarge: g,
    heightTiny: P,
    heightSmall: k,
    heightMedium: $,
    heightLarge: C,
    borderRadius: t,
    // default
    textColor: o,
    textColorDisabled: r,
    placeholderColor: S,
    placeholderColorDisabled: E,
    color: n,
    colorDisabled: i,
    colorActive: n,
    border: `1px solid ${p}`,
    borderHover: `1px solid ${l}`,
    borderActive: `1px solid ${a}`,
    borderFocus: `1px solid ${l}`,
    boxShadowHover: "none",
    boxShadowActive: `0 0 0 2px ${K(a, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${K(a, {
      alpha: 0.2
    })}`,
    caretColor: a,
    arrowColor: v,
    arrowColorDisabled: u,
    loadingColor: a,
    // warning
    borderWarning: `1px solid ${s}`,
    borderHoverWarning: `1px solid ${d}`,
    borderActiveWarning: `1px solid ${s}`,
    borderFocusWarning: `1px solid ${d}`,
    boxShadowHoverWarning: "none",
    boxShadowActiveWarning: `0 0 0 2px ${K(s, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${K(s, {
      alpha: 0.2
    })}`,
    colorActiveWarning: n,
    caretColorWarning: s,
    // error
    borderError: `1px solid ${c}`,
    borderHoverError: `1px solid ${f}`,
    borderActiveError: `1px solid ${c}`,
    borderFocusError: `1px solid ${f}`,
    boxShadowHoverError: "none",
    boxShadowActiveError: `0 0 0 2px ${K(c, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${K(c, {
      alpha: 0.2
    })}`,
    colorActiveError: n,
    caretColorError: c,
    clearColor: b,
    clearColorHover: x,
    clearColorPressed: h
  });
}, sC = {
  name: "InternalSelection",
  common: pt,
  peers: {
    Popover: ha
  },
  self: lC
}, Vd = sC, dC = {
  name: "InternalSelection",
  common: ee,
  peers: {
    Popover: Ao
  },
  self(e) {
    const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: f, iconColor: p, iconColorDisabled: v, clearColor: u, clearColorHover: b, clearColorPressed: x, placeholderColor: h, placeholderColorDisabled: S, fontSizeTiny: E, fontSizeSmall: w, fontSizeMedium: z, fontSizeLarge: I, heightTiny: g, heightSmall: P, heightMedium: k, heightLarge: $ } = e;
    return Object.assign(Object.assign({}, jd), {
      fontSizeTiny: E,
      fontSizeSmall: w,
      fontSizeMedium: z,
      fontSizeLarge: I,
      heightTiny: g,
      heightSmall: P,
      heightMedium: k,
      heightLarge: $,
      borderRadius: t,
      // default
      textColor: o,
      textColorDisabled: r,
      placeholderColor: h,
      placeholderColorDisabled: S,
      color: n,
      colorDisabled: i,
      colorActive: K(a, { alpha: 0.1 }),
      border: "1px solid #0000",
      borderHover: `1px solid ${l}`,
      borderActive: `1px solid ${a}`,
      borderFocus: `1px solid ${l}`,
      boxShadowHover: "none",
      boxShadowActive: `0 0 8px 0 ${K(a, {
        alpha: 0.4
      })}`,
      boxShadowFocus: `0 0 8px 0 ${K(a, {
        alpha: 0.4
      })}`,
      caretColor: a,
      arrowColor: p,
      arrowColorDisabled: v,
      loadingColor: a,
      // warning
      borderWarning: `1px solid ${s}`,
      borderHoverWarning: `1px solid ${d}`,
      borderActiveWarning: `1px solid ${s}`,
      borderFocusWarning: `1px solid ${d}`,
      boxShadowHoverWarning: "none",
      boxShadowActiveWarning: `0 0 8px 0 ${K(s, {
        alpha: 0.4
      })}`,
      boxShadowFocusWarning: `0 0 8px 0 ${K(s, {
        alpha: 0.4
      })}`,
      colorActiveWarning: K(s, { alpha: 0.1 }),
      caretColorWarning: s,
      // error
      borderError: `1px solid ${c}`,
      borderHoverError: `1px solid ${f}`,
      borderActiveError: `1px solid ${c}`,
      borderFocusError: `1px solid ${f}`,
      boxShadowHoverError: "none",
      boxShadowActiveError: `0 0 8px 0 ${K(c, {
        alpha: 0.4
      })}`,
      boxShadowFocusError: `0 0 8px 0 ${K(c, {
        alpha: 0.4
      })}`,
      colorActiveError: K(c, { alpha: 0.1 }),
      caretColorError: c,
      clearColor: u,
      clearColorHover: b,
      clearColorPressed: x
    });
  }
}, pa = dC, cC = W([B("base-selection", `
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
 `)]), Qe("disabled", [W("&:hover", [A("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), J("focus", [A("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), J("active", [A("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), B("base-selection-label", "background-color: var(--n-color-active);"), B("base-selection-tags", "background-color: var(--n-color-active);")])]), J("disabled", "cursor: not-allowed;", [A("arrow", `
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
 `)]), ["warning", "error"].map((e) => J(`${e}-status`, [A("state-border", `border: var(--n-border-${e});`), Qe("disabled", [W("&:hover", [A("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), J("active", [A("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), B("base-selection-label", `background-color: var(--n-color-active-${e});`), B("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), J("focus", [A("state-border", `
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
 `, [W("&:last-child", "padding-right: 0;"), B("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [A("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), uC = xe({
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
    const t = L(null), o = L(null), r = L(null), n = L(null), i = L(null), a = L(null), l = L(null), s = L(null), d = L(null), c = L(null), f = L(!1), p = L(!1), v = L(!1), u = Me("InternalSelection", "-internal-selection", cC, Vd, e, $e(e, "clsPrefix")), b = R(() => e.clearable && !e.disabled && (v.value || e.active)), x = R(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : qo(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), h = R(() => {
      const N = e.selectedOption;
      if (N)
        return N[e.labelField];
    }), S = R(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function E() {
      var N;
      const { value: Q } = t;
      if (Q) {
        const { value: D } = o;
        D && (D.style.width = `${Q.offsetWidth}px`, e.maxTagCount !== "responsive" && ((N = d.value) === null || N === void 0 || N.sync()));
      }
    }
    function w() {
      const { value: N } = c;
      N && (N.style.display = "none");
    }
    function z() {
      const { value: N } = c;
      N && (N.style.display = "inline-block");
    }
    Ae($e(e, "active"), (N) => {
      N || w();
    }), Ae($e(e, "pattern"), () => {
      e.multiple && zt(E);
    });
    function I(N) {
      const { onFocus: Q } = e;
      Q && Q(N);
    }
    function g(N) {
      const { onBlur: Q } = e;
      Q && Q(N);
    }
    function P(N) {
      const { onDeleteOption: Q } = e;
      Q && Q(N);
    }
    function k(N) {
      const { onClear: Q } = e;
      Q && Q(N);
    }
    function $(N) {
      const { onPatternInput: Q } = e;
      Q && Q(N);
    }
    function C(N) {
      var Q;
      (!N.relatedTarget || !(!((Q = r.value) === null || Q === void 0) && Q.contains(N.relatedTarget))) && I(N);
    }
    function T(N) {
      var Q;
      !((Q = r.value) === null || Q === void 0) && Q.contains(N.relatedTarget) || g(N);
    }
    function M(N) {
      k(N);
    }
    function O() {
      v.value = !0;
    }
    function G() {
      v.value = !1;
    }
    function Y(N) {
      !e.active || !e.filterable || N.target !== o.value && N.preventDefault();
    }
    function V(N) {
      P(N);
    }
    function ne(N) {
      if (N.key === "Backspace" && !H.value && !e.pattern.length) {
        const { selectedOptions: Q } = e;
        Q != null && Q.length && V(Q[Q.length - 1]);
      }
    }
    const H = L(!1);
    let U = null;
    function de(N) {
      const { value: Q } = t;
      if (Q) {
        const D = N.target.value;
        Q.textContent = D, E();
      }
      e.ignoreComposition && H.value ? U = N : $(N);
    }
    function Se() {
      H.value = !0;
    }
    function _e() {
      H.value = !1, e.ignoreComposition && $(U), U = null;
    }
    function Ee(N) {
      var Q;
      p.value = !0, (Q = e.onPatternFocus) === null || Q === void 0 || Q.call(e, N);
    }
    function ke(N) {
      var Q;
      p.value = !1, (Q = e.onPatternBlur) === null || Q === void 0 || Q.call(e, N);
    }
    function ue() {
      var N, Q;
      if (e.filterable)
        p.value = !1, (N = a.value) === null || N === void 0 || N.blur(), (Q = o.value) === null || Q === void 0 || Q.blur();
      else if (e.multiple) {
        const { value: D } = n;
        D == null || D.blur();
      } else {
        const { value: D } = i;
        D == null || D.blur();
      }
    }
    function me() {
      var N, Q, D;
      e.filterable ? (p.value = !1, (N = a.value) === null || N === void 0 || N.focus()) : e.multiple ? (Q = n.value) === null || Q === void 0 || Q.focus() : (D = i.value) === null || D === void 0 || D.focus();
    }
    function Te() {
      const { value: N } = o;
      N && (z(), N.focus());
    }
    function ae() {
      const { value: N } = o;
      N && N.blur();
    }
    function je(N) {
      const { value: Q } = l;
      Q && Q.setTextContent(`+${N}`);
    }
    function Fe() {
      const { value: N } = s;
      return N;
    }
    function Ve() {
      return o.value;
    }
    let Ge = null;
    function Ze() {
      Ge !== null && window.clearTimeout(Ge);
    }
    function lt() {
      e.disabled || e.active || (Ze(), Ge = window.setTimeout(() => {
        S.value && (f.value = !0);
      }, 100));
    }
    function vt() {
      Ze();
    }
    function X(N) {
      N || (Ze(), f.value = !1);
    }
    Ae(S, (N) => {
      N || (f.value = !1);
    }), wt(() => {
      ht(() => {
        const N = a.value;
        N && (N.tabIndex = e.disabled || p.value ? -1 : 0);
      });
    }), Gs(r, e.onResize);
    const { inlineThemeDisabled: le } = e, Ce = R(() => {
      const { size: N } = e, { common: { cubicBezierEaseInOut: Q }, self: {
        borderRadius: D,
        color: q,
        placeholderColor: te,
        textColor: ye,
        paddingSingle: ze,
        paddingMultiple: He,
        caretColor: tt,
        colorDisabled: Le,
        textColorDisabled: We,
        placeholderColorDisabled: dt,
        colorActive: It,
        boxShadowFocus: st,
        boxShadowActive: gt,
        boxShadowHover: y,
        border: F,
        borderFocus: Z,
        borderHover: se,
        borderActive: ce,
        arrowColor: ve,
        arrowColorDisabled: be,
        loadingColor: Pe,
        // form warning
        colorActiveWarning: ot,
        boxShadowFocusWarning: $t,
        boxShadowActiveWarning: oo,
        boxShadowHoverWarning: ro,
        borderWarning: Bn,
        borderFocusWarning: Dn,
        borderHoverWarning: Hr,
        borderActiveWarning: no,
        // form error
        colorActiveError: _,
        boxShadowFocusError: j,
        boxShadowActiveError: ge,
        boxShadowHoverError: Ne,
        borderError: Ye,
        borderFocusError: De,
        borderHoverError: Vt,
        borderActiveError: Ut,
        // clear
        clearColor: qt,
        clearColorHover: po,
        clearColorPressed: vo,
        clearSize: rr,
        // arrow
        arrowSize: An,
        [oe("height", N)]: Fn,
        [oe("fontSize", N)]: Hn
      } } = u.value;
      return {
        "--n-bezier": Q,
        "--n-border": F,
        "--n-border-active": ce,
        "--n-border-focus": Z,
        "--n-border-hover": se,
        "--n-border-radius": D,
        "--n-box-shadow-active": gt,
        "--n-box-shadow-focus": st,
        "--n-box-shadow-hover": y,
        "--n-caret-color": tt,
        "--n-color": q,
        "--n-color-active": It,
        "--n-color-disabled": Le,
        "--n-font-size": Hn,
        "--n-height": Fn,
        "--n-padding-single": ze,
        "--n-padding-multiple": He,
        "--n-placeholder-color": te,
        "--n-placeholder-color-disabled": dt,
        "--n-text-color": ye,
        "--n-text-color-disabled": We,
        "--n-arrow-color": ve,
        "--n-arrow-color-disabled": be,
        "--n-loading-color": Pe,
        // form warning
        "--n-color-active-warning": ot,
        "--n-box-shadow-focus-warning": $t,
        "--n-box-shadow-active-warning": oo,
        "--n-box-shadow-hover-warning": ro,
        "--n-border-warning": Bn,
        "--n-border-focus-warning": Dn,
        "--n-border-hover-warning": Hr,
        "--n-border-active-warning": no,
        // form error
        "--n-color-active-error": _,
        "--n-box-shadow-focus-error": j,
        "--n-box-shadow-active-error": ge,
        "--n-box-shadow-hover-error": Ne,
        "--n-border-error": Ye,
        "--n-border-focus-error": De,
        "--n-border-hover-error": Vt,
        "--n-border-active-error": Ut,
        // clear
        "--n-clear-size": rr,
        "--n-clear-color": qt,
        "--n-clear-color-hover": po,
        "--n-clear-color-pressed": vo,
        // arrow-size
        "--n-arrow-size": An
      };
    }), ie = le ? bt("internal-selection", R(() => e.size[0]), Ce, e) : void 0;
    return {
      mergedTheme: u,
      mergedClearable: b,
      patternInputFocused: p,
      filterablePlaceholder: x,
      label: h,
      selected: S,
      showTagsPanel: f,
      isComposing: H,
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
      handleMouseDown: Y,
      handleFocusin: C,
      handleClear: M,
      handleMouseEnter: O,
      handleMouseLeave: G,
      handleDeleteOption: V,
      handlePatternKeyDown: ne,
      handlePatternInputInput: de,
      handlePatternInputBlur: ke,
      handlePatternInputFocus: Ee,
      handleMouseEnterCounter: lt,
      handleMouseLeaveCounter: vt,
      handleFocusout: T,
      handleCompositionEnd: _e,
      handleCompositionStart: Se,
      onPopoverUpdateShow: X,
      focus: me,
      focusInput: Te,
      blur: ue,
      blurInput: ae,
      updateCounter: je,
      getCounter: Fe,
      getTail: Ve,
      renderLabel: e.renderLabel,
      cssVars: le ? void 0 : Ce,
      themeClass: ie == null ? void 0 : ie.themeClass,
      onRender: ie == null ? void 0 : ie.onRender
    };
  },
  render() {
    const { status: e, multiple: t, size: o, disabled: r, filterable: n, maxTagCount: i, bordered: a, clsPrefix: l, onRender: s, renderTag: d, renderLabel: c } = this;
    s == null || s();
    const f = i === "responsive", p = typeof i == "number", v = f || p, u = m(bi, null, {
      default: () => m(Nd, { clsPrefix: l, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
        default: () => {
          var x, h;
          return (h = (x = this.$slots).arrow) === null || h === void 0 ? void 0 : h.call(x);
        }
      })
    });
    let b;
    if (t) {
      const { labelField: x } = this, h = (T) => m("div", { class: `${l}-base-selection-tag-wrapper`, key: T.value }, d ? d({
        option: T,
        handleClose: () => this.handleDeleteOption(T)
      }) : m(ii, { size: o, closable: !T.disabled, disabled: r, onClose: () => this.handleDeleteOption(T), internalCloseIsButtonTag: !1, internalCloseFocusable: !1 }, {
        default: () => c ? c(T, !0) : qo(T[x], T, !0)
      })), S = () => (p ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(h), E = n ? m(
        "div",
        { class: `${l}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
        m("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: r, value: this.pattern, autofocus: this.autofocus, class: `${l}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
        m("span", { ref: "patternInputMirrorRef", class: `${l}-base-selection-input-tag__mirror` }, this.pattern)
      ) : null, w = f ? () => m(
        "div",
        { class: `${l}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
        m(ii, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: r })
      ) : void 0;
      let z;
      if (p) {
        const T = this.selectedOptions.length - i;
        T > 0 && (z = m(
          "div",
          { class: `${l}-base-selection-tag-wrapper`, key: "__counter__" },
          m(ii, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: r }, {
            default: () => `+${T}`
          })
        ));
      }
      const I = f ? n ? m(Ya, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: S,
        counter: w,
        tail: () => E
      }) : m(Ya, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: S,
        counter: w
      }) : p ? S().concat(z) : S(), g = v ? () => m("div", { class: `${l}-base-selection-popover` }, f ? S() : this.selectedOptions.map(h)) : void 0, P = v ? {
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      } : null, $ = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? m(
        "div",
        { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay` },
        m("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)
      ) : null, C = n ? m(
        "div",
        { ref: "patternInputWrapperRef", class: `${l}-base-selection-tags` },
        I,
        f ? null : E,
        u
      ) : m(
        "div",
        { ref: "multipleElRef", class: `${l}-base-selection-tags`, tabindex: r ? void 0 : 0 },
        I,
        u
      );
      b = m(
        Qt,
        null,
        v ? m(Hd, Object.assign({}, P, { scrollable: !0, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
          trigger: () => C,
          default: g
        }) : C,
        $
      );
    } else if (n) {
      const x = this.pattern || this.isComposing, h = this.active ? !x : !this.selected, S = this.active ? !1 : this.selected;
      b = m(
        "div",
        { ref: "patternInputWrapperRef", class: `${l}-base-selection-label` },
        m("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${l}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: r, disabled: r, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
        S ? m(
          "div",
          { class: `${l}-base-selection-label__render-label ${l}-base-selection-overlay`, key: "input" },
          m("div", { class: `${l}-base-selection-overlay__wrapper` }, d ? d({
            option: this.selectedOption,
            handleClose: () => {
            }
          }) : c ? c(this.selectedOption, !0) : qo(this.label, this.selectedOption, !0))
        ) : null,
        h ? m(
          "div",
          { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" },
          m("div", { class: `${l}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)
        ) : null,
        u
      );
    } else
      b = m(
        "div",
        { ref: "singleElRef", class: `${l}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 },
        this.label !== void 0 ? m(
          "div",
          { class: `${l}-base-selection-input`, title: of(this.label), key: "input" },
          m("div", { class: `${l}-base-selection-input__content` }, d ? d({
            option: this.selectedOption,
            handleClose: () => {
            }
          }) : c ? c(this.selectedOption, !0) : qo(this.label, this.selectedOption, !0))
        ) : m(
          "div",
          { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" },
          m("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)
        ),
        u
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
  cubicBezierEaseInOut: ao
} = ho;
function fC({
  duration: e = ".2s",
  delay: t = ".1s"
} = {}) {
  return [W("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), W("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), W("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${ao},
 max-width ${e} ${ao} ${t},
 margin-left ${e} ${ao} ${t},
 margin-right ${e} ${ao} ${t};
 `), W("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${ao} ${t},
 max-width ${e} ${ao},
 margin-left ${e} ${ao},
 margin-right ${e} ${ao};
 `)];
}
const hC = {
  iconMargin: "11px 8px 0 12px",
  iconMarginRtl: "11px 12px 0 8px",
  iconSize: "24px",
  closeIconSize: "16px",
  closeSize: "20px",
  closeMargin: "13px 14px 0 0",
  closeMarginRtl: "13px 0 0 14px",
  padding: "13px"
}, pC = {
  name: "Alert",
  common: ee,
  self(e) {
    const { lineHeight: t, borderRadius: o, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: a, textColor2: l, closeColorHover: s, closeColorPressed: d, closeIconColor: c, closeIconColorHover: f, closeIconColorPressed: p, infoColorSuppl: v, successColorSuppl: u, warningColorSuppl: b, errorColorSuppl: x, fontSize: h } = e;
    return Object.assign(Object.assign({}, hC), {
      fontSize: h,
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
      closeIconColorHover: f,
      closeIconColorPressed: p,
      borderInfo: `1px solid ${K(v, { alpha: 0.35 })}`,
      colorInfo: K(v, { alpha: 0.25 }),
      titleTextColorInfo: a,
      iconColorInfo: v,
      contentTextColorInfo: l,
      closeColorHoverInfo: s,
      closeColorPressedInfo: d,
      closeIconColorInfo: c,
      closeIconColorHoverInfo: f,
      closeIconColorPressedInfo: p,
      borderSuccess: `1px solid ${K(u, {
        alpha: 0.35
      })}`,
      colorSuccess: K(u, { alpha: 0.25 }),
      titleTextColorSuccess: a,
      iconColorSuccess: u,
      contentTextColorSuccess: l,
      closeColorHoverSuccess: s,
      closeColorPressedSuccess: d,
      closeIconColorSuccess: c,
      closeIconColorHoverSuccess: f,
      closeIconColorPressedSuccess: p,
      borderWarning: `1px solid ${K(b, {
        alpha: 0.35
      })}`,
      colorWarning: K(b, { alpha: 0.25 }),
      titleTextColorWarning: a,
      iconColorWarning: b,
      contentTextColorWarning: l,
      closeColorHoverWarning: s,
      closeColorPressedWarning: d,
      closeIconColorWarning: c,
      closeIconColorHoverWarning: f,
      closeIconColorPressedWarning: p,
      borderError: `1px solid ${K(x, { alpha: 0.35 })}`,
      colorError: K(x, { alpha: 0.25 }),
      titleTextColorError: a,
      iconColorError: x,
      contentTextColorError: l,
      closeColorHoverError: s,
      closeColorPressedError: d,
      closeIconColorError: c,
      closeIconColorHoverError: f,
      closeIconColorPressedError: p
    });
  }
}, vC = pC, gC = {
  linkFontSize: "13px",
  linkPadding: "0 0 0 16px",
  railWidth: "4px"
}, mC = (e) => {
  const { borderRadius: t, railColor: o, primaryColor: r, primaryColorHover: n, primaryColorPressed: i, textColor2: a } = e;
  return Object.assign(Object.assign({}, gC), {
    borderRadius: t,
    railColor: o,
    railColorActive: r,
    linkColor: K(r, { alpha: 0.15 }),
    linkTextColor: a,
    linkTextColorHover: n,
    linkTextColorPressed: i,
    linkTextColorActive: r
  });
}, bC = {
  name: "Anchor",
  common: ee,
  self: mC
}, xC = bC;
function Sn(e) {
  return e.type === "group";
}
function Ud(e) {
  return e.type === "ignored";
}
function ai(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function CC(e, t) {
  return {
    getIsGroup: Sn,
    getIgnored: Ud,
    getKey(r) {
      return Sn(r) ? r.name || r.key || "key-required" : r[e];
    },
    getChildren(r) {
      return r[t];
    }
  };
}
function yC(e, t, o, r) {
  if (!t)
    return e;
  function n(i) {
    if (!Array.isArray(i))
      return [];
    const a = [];
    for (const l of i)
      if (Sn(l)) {
        const s = n(l[r]);
        s.length && a.push(Object.assign({}, l, {
          [r]: s
        }));
      } else {
        if (Ud(l))
          continue;
        t(o, l) && a.push(l);
      }
    return a;
  }
  return n(e);
}
function wC(e, t, o) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((n) => {
    Sn(n) ? n[o].forEach((i) => {
      r.set(i[t], i);
    }) : r.set(n[t], n);
  }), r;
}
const SC = Er && "chrome" in window;
Er && navigator.userAgent.includes("Firefox");
const qd = Er && navigator.userAgent.includes("Safari") && !SC, Gd = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
}, PC = {
  name: "Input",
  common: ee,
  self(e) {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: f, borderRadius: p, lineHeight: v, fontSizeTiny: u, fontSizeSmall: b, fontSizeMedium: x, fontSizeLarge: h, heightTiny: S, heightSmall: E, heightMedium: w, heightLarge: z, clearColor: I, clearColorHover: g, clearColorPressed: P, placeholderColor: k, placeholderColorDisabled: $, iconColor: C, iconColorDisabled: T, iconColorHover: M, iconColorPressed: O } = e;
    return Object.assign(Object.assign({}, Gd), {
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: S,
      heightSmall: E,
      heightMedium: w,
      heightLarge: z,
      fontSizeTiny: u,
      fontSizeSmall: b,
      fontSizeMedium: x,
      fontSizeLarge: h,
      lineHeight: v,
      lineHeightTextarea: v,
      borderRadius: p,
      iconSize: "16px",
      groupLabelColor: a,
      textColor: t,
      textColorDisabled: r,
      textDecorationColor: t,
      groupLabelTextColor: t,
      caretColor: n,
      placeholderColor: k,
      placeholderColorDisabled: $,
      color: a,
      colorDisabled: l,
      colorFocus: K(n, { alpha: 0.1 }),
      groupLabelBorder: "1px solid #0000",
      border: "1px solid #0000",
      borderHover: `1px solid ${i}`,
      borderDisabled: "1px solid #0000",
      borderFocus: `1px solid ${i}`,
      boxShadowFocus: `0 0 8px 0 ${K(n, { alpha: 0.3 })}`,
      loadingColor: n,
      // warning
      loadingColorWarning: s,
      borderWarning: `1px solid ${s}`,
      borderHoverWarning: `1px solid ${d}`,
      colorFocusWarning: K(s, { alpha: 0.1 }),
      borderFocusWarning: `1px solid ${d}`,
      boxShadowFocusWarning: `0 0 8px 0 ${K(s, {
        alpha: 0.3
      })}`,
      caretColorWarning: s,
      // error
      loadingColorError: c,
      borderError: `1px solid ${c}`,
      borderHoverError: `1px solid ${f}`,
      colorFocusError: K(c, { alpha: 0.1 }),
      borderFocusError: `1px solid ${f}`,
      boxShadowFocusError: `0 0 8px 0 ${K(c, {
        alpha: 0.3
      })}`,
      caretColorError: c,
      clearColor: I,
      clearColorHover: g,
      clearColorPressed: P,
      iconColor: C,
      iconColorDisabled: T,
      iconColorHover: M,
      iconColorPressed: O,
      suffixTextColor: t
    });
  }
}, Bt = PC, $C = (e) => {
  const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, borderColor: s, warningColor: d, warningColorHover: c, errorColor: f, errorColorHover: p, borderRadius: v, lineHeight: u, fontSizeTiny: b, fontSizeSmall: x, fontSizeMedium: h, fontSizeLarge: S, heightTiny: E, heightSmall: w, heightMedium: z, heightLarge: I, actionColor: g, clearColor: P, clearColorHover: k, clearColorPressed: $, placeholderColor: C, placeholderColorDisabled: T, iconColor: M, iconColorDisabled: O, iconColorHover: G, iconColorPressed: Y } = e;
  return Object.assign(Object.assign({}, Gd), {
    countTextColorDisabled: r,
    countTextColor: o,
    heightTiny: E,
    heightSmall: w,
    heightMedium: z,
    heightLarge: I,
    fontSizeTiny: b,
    fontSizeSmall: x,
    fontSizeMedium: h,
    fontSizeLarge: S,
    lineHeight: u,
    lineHeightTextarea: u,
    borderRadius: v,
    iconSize: "16px",
    groupLabelColor: g,
    groupLabelTextColor: t,
    textColor: t,
    textColorDisabled: r,
    textDecorationColor: t,
    caretColor: n,
    placeholderColor: C,
    placeholderColorDisabled: T,
    color: a,
    colorDisabled: l,
    colorFocus: a,
    groupLabelBorder: `1px solid ${s}`,
    border: `1px solid ${s}`,
    borderHover: `1px solid ${i}`,
    borderDisabled: `1px solid ${s}`,
    borderFocus: `1px solid ${i}`,
    boxShadowFocus: `0 0 0 2px ${K(n, { alpha: 0.2 })}`,
    loadingColor: n,
    // warning
    loadingColorWarning: d,
    borderWarning: `1px solid ${d}`,
    borderHoverWarning: `1px solid ${c}`,
    colorFocusWarning: a,
    borderFocusWarning: `1px solid ${c}`,
    boxShadowFocusWarning: `0 0 0 2px ${K(d, {
      alpha: 0.2
    })}`,
    caretColorWarning: d,
    // error
    loadingColorError: f,
    borderError: `1px solid ${f}`,
    borderHoverError: `1px solid ${p}`,
    colorFocusError: a,
    borderFocusError: `1px solid ${p}`,
    boxShadowFocusError: `0 0 0 2px ${K(f, {
      alpha: 0.2
    })}`,
    caretColorError: f,
    clearColor: P,
    clearColorHover: k,
    clearColorPressed: $,
    iconColor: M,
    iconColorDisabled: O,
    iconColorHover: G,
    iconColorPressed: Y,
    suffixTextColor: t
  });
}, kC = {
  name: "Input",
  common: pt,
  self: $C
}, Kd = kC, Yd = "n-input";
function TC(e) {
  let t = 0;
  for (const o of e)
    t++;
  return t;
}
function Xr(e) {
  return e === "" || e == null;
}
function zC(e) {
  const t = L(null);
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
    const { value: s } = l, { start: d, beforeText: c, afterText: f } = a;
    let p = s.length;
    if (s.endsWith(f))
      p = s.length - f.length;
    else if (s.startsWith(c))
      p = c.length;
    else {
      const v = c[d - 1], u = s.indexOf(v, d - 1);
      u !== -1 && (p = u + 1);
    }
    (i = l.setSelectionRange) === null || i === void 0 || i.call(l, p, p);
  }
  function n() {
    t.value = null;
  }
  return Ae(e, n), {
    recordCursor: o,
    restoreCursor: r
  };
}
const Il = xe({
  name: "InputWordCount",
  setup(e, { slots: t }) {
    const { mergedValueRef: o, maxlengthRef: r, mergedClsPrefixRef: n, countGraphemesRef: i } = (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Be(Yd)
    ), a = R(() => {
      const { value: l } = o;
      return l === null || Array.isArray(l) ? 0 : (i.value || TC)(l);
    });
    return () => {
      const { value: l } = r, { value: s } = o;
      return m("span", { class: `${n.value}-input-word-count` }, rf(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [
        l === void 0 ? a.value : `${a.value} / ${l}`
      ]));
    };
  }
}), _C = B("input", `
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
 `, [W("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), W("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), W("&:-webkit-autofill ~", [A("placeholder", "display: none;")])]),
  J("round", [Qe("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  A("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [W("span", `
 width: 100%;
 display: inline-block;
 `)]),
  J("textarea", [A("placeholder", "overflow: visible;")]),
  Qe("autosize", "width: 100%;"),
  J("autosize", [A("textarea-el, input-el", `
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
 `, [W("+", [A("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  Qe("textarea", [A("placeholder", "white-space: nowrap;")]),
  A("eye", `
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  J("textarea", "width: 100%;", [B("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), J("resizable", [B("input-wrapper", `
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
  J("pair", [A("input-el, placeholder", "text-align: center;"), A("separator", `
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
  J("disabled", `
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
  Qe("disabled", [A("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-icon-color);
 cursor: pointer;
 `, [W("&:hover", `
 color: var(--n-icon-color-hover);
 `), W("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), W("&:hover", [A("state-border", "border: var(--n-border-hover);")]), J("focus", "background-color: var(--n-color-focus);", [A("state-border", `
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
 `)])]), W(">", [B("icon", `
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
  ["warning", "error"].map((e) => J(`${e}-status`, [Qe("disabled", [B("base-loading", `
 color: var(--n-loading-color-${e})
 `), A("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), A("state-border", `
 border: var(--n-border-${e});
 `), W("&:hover", [A("state-border", `
 border: var(--n-border-hover-${e});
 `)]), W("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), J("focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), IC = B("input", [J("disabled", [A("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), MC = Object.assign(Object.assign({}, Me.props), {
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
}), OC = xe({
  name: "Input",
  props: MC,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.showPasswordToggle && kt("input", '`show-password-toggle` is deprecated, please use `showPasswordOn="click"` instead');
    });
    const { mergedClsPrefixRef: t, mergedBorderedRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = xt(e), i = Me("Input", "-input", _C, Kd, e, t);
    qd && er("-input-safari", IC, t);
    const a = L(null), l = L(null), s = L(null), d = L(null), c = L(null), f = L(null), p = L(null), v = zC(p), u = L(null), { localeRef: b } = In("Input"), x = L(e.defaultValue), h = $e(e, "value"), S = so(h, x), E = Mo(e), { mergedSizeRef: w, mergedDisabledRef: z, mergedStatusRef: I } = E, g = L(!1), P = L(!1), k = L(!1), $ = L(!1);
    let C = null;
    const T = R(() => {
      const { placeholder: _, pair: j } = e;
      return j ? Array.isArray(_) ? _ : _ === void 0 ? ["", ""] : [_, _] : _ === void 0 ? [b.value.placeholder] : [_];
    }), M = R(() => {
      const { value: _ } = k, { value: j } = S, { value: ge } = T;
      return !_ && (Xr(j) || Array.isArray(j) && Xr(j[0])) && ge[0];
    }), O = R(() => {
      const { value: _ } = k, { value: j } = S, { value: ge } = T;
      return !_ && ge[1] && (Xr(j) || Array.isArray(j) && Xr(j[1]));
    }), G = Xe(() => e.internalForceFocus || g.value), Y = Xe(() => {
      if (z.value || e.readonly || !e.clearable || !G.value && !P.value)
        return !1;
      const { value: _ } = S, { value: j } = G;
      return e.pair ? !!(Array.isArray(_) && (_[0] || _[1])) && (P.value || j) : !!_ && (P.value || j);
    }), V = R(() => {
      const { showPasswordOn: _ } = e;
      if (_)
        return _;
      if (e.showPasswordToggle)
        return "click";
    }), ne = L(!1), H = R(() => {
      const { textDecoration: _ } = e;
      return _ ? Array.isArray(_) ? _.map((j) => ({
        textDecoration: j
      })) : [
        {
          textDecoration: _
        }
      ] : ["", ""];
    }), U = L(void 0), de = () => {
      var _, j;
      if (e.type === "textarea") {
        const { autosize: ge } = e;
        if (ge && (U.value = (j = (_ = u.value) === null || _ === void 0 ? void 0 : _.$el) === null || j === void 0 ? void 0 : j.offsetWidth), !l.value || typeof ge == "boolean")
          return;
        const { paddingTop: Ne, paddingBottom: Ye, lineHeight: De } = window.getComputedStyle(l.value), Vt = Number(Ne.slice(0, -2)), Ut = Number(Ye.slice(0, -2)), qt = Number(De.slice(0, -2)), { value: po } = s;
        if (!po)
          return;
        if (ge.minRows) {
          const vo = Math.max(ge.minRows, 1), rr = `${Vt + Ut + qt * vo}px`;
          po.style.minHeight = rr;
        }
        if (ge.maxRows) {
          const vo = `${Vt + Ut + qt * ge.maxRows}px`;
          po.style.maxHeight = vo;
        }
      }
    }, Se = R(() => {
      const { maxlength: _ } = e;
      return _ === void 0 ? void 0 : Number(_);
    });
    wt(() => {
      const { value: _ } = S;
      Array.isArray(_) || be(_);
    });
    const _e = Mr().proxy;
    function Ee(_) {
      const { onUpdateValue: j, "onUpdate:value": ge, onInput: Ne } = e, { nTriggerFormInput: Ye } = E;
      j && he(j, _), ge && he(ge, _), Ne && he(Ne, _), x.value = _, Ye();
    }
    function ke(_) {
      const { onChange: j } = e, { nTriggerFormChange: ge } = E;
      j && he(j, _), x.value = _, ge();
    }
    function ue(_) {
      const { onBlur: j } = e, { nTriggerFormBlur: ge } = E;
      j && he(j, _), ge();
    }
    function me(_) {
      const { onFocus: j } = e, { nTriggerFormFocus: ge } = E;
      j && he(j, _), ge();
    }
    function Te(_) {
      const { onClear: j } = e;
      j && he(j, _);
    }
    function ae(_) {
      const { onInputBlur: j } = e;
      j && he(j, _);
    }
    function je(_) {
      const { onInputFocus: j } = e;
      j && he(j, _);
    }
    function Fe() {
      const { onDeactivate: _ } = e;
      _ && he(_);
    }
    function Ve() {
      const { onActivate: _ } = e;
      _ && he(_);
    }
    function Ge(_) {
      const { onClick: j } = e;
      j && he(j, _);
    }
    function Ze(_) {
      const { onWrapperFocus: j } = e;
      j && he(j, _);
    }
    function lt(_) {
      const { onWrapperBlur: j } = e;
      j && he(j, _);
    }
    function vt() {
      k.value = !0;
    }
    function X(_) {
      k.value = !1, _.target === f.value ? le(_, 1) : le(_, 0);
    }
    function le(_, j = 0, ge = "input") {
      const Ne = _.target.value;
      if (be(Ne), _ instanceof InputEvent && !_.isComposing && (k.value = !1), e.type === "textarea") {
        const { value: De } = u;
        De && De.syncUnifiedContainer();
      }
      if (C = Ne, k.value)
        return;
      v.recordCursor();
      const Ye = Ce(Ne);
      if (Ye)
        if (!e.pair)
          ge === "input" ? Ee(Ne) : ke(Ne);
        else {
          let { value: De } = S;
          Array.isArray(De) ? De = [De[0], De[1]] : De = ["", ""], De[j] = Ne, ge === "input" ? Ee(De) : ke(De);
        }
      _e.$forceUpdate(), Ye || zt(v.restoreCursor);
    }
    function Ce(_) {
      const { countGraphemes: j, maxlength: ge, minlength: Ne } = e;
      if (j) {
        let De;
        if (ge !== void 0 && (De === void 0 && (De = j(_)), De > Number(ge)) || Ne !== void 0 && (De === void 0 && (De = j(_)), De < Number(ge)))
          return !1;
      }
      const { allowInput: Ye } = e;
      return typeof Ye == "function" ? Ye(_) : !0;
    }
    function ie(_) {
      ae(_), _.relatedTarget === a.value && Fe(), _.relatedTarget !== null && (_.relatedTarget === c.value || _.relatedTarget === f.value || _.relatedTarget === l.value) || ($.value = !1), q(_, "blur"), p.value = null;
    }
    function N(_, j) {
      je(_), g.value = !0, $.value = !0, Ve(), q(_, "focus"), j === 0 ? p.value = c.value : j === 1 ? p.value = f.value : j === 2 && (p.value = l.value);
    }
    function Q(_) {
      e.passivelyActivated && (lt(_), q(_, "blur"));
    }
    function D(_) {
      e.passivelyActivated && (g.value = !0, Ze(_), q(_, "focus"));
    }
    function q(_, j) {
      _.relatedTarget !== null && (_.relatedTarget === c.value || _.relatedTarget === f.value || _.relatedTarget === l.value || _.relatedTarget === a.value) || (j === "focus" ? (me(_), g.value = !0) : j === "blur" && (ue(_), g.value = !1));
    }
    function te(_, j) {
      le(_, j, "change");
    }
    function ye(_) {
      Ge(_);
    }
    function ze(_) {
      Te(_), e.pair ? (Ee(["", ""]), ke(["", ""])) : (Ee(""), ke(""));
    }
    function He(_) {
      const { onMousedown: j } = e;
      j && j(_);
      const { tagName: ge } = _.target;
      if (ge !== "INPUT" && ge !== "TEXTAREA") {
        if (e.resizable) {
          const { value: Ne } = a;
          if (Ne) {
            const { left: Ye, top: De, width: Vt, height: Ut } = Ne.getBoundingClientRect(), qt = 14;
            if (Ye + Vt - qt < _.clientX && _.clientX < Ye + Vt && De + Ut - qt < _.clientY && _.clientY < De + Ut)
              return;
          }
        }
        _.preventDefault(), g.value || y();
      }
    }
    function tt() {
      var _;
      P.value = !0, e.type === "textarea" && ((_ = u.value) === null || _ === void 0 || _.handleMouseEnterWrapper());
    }
    function Le() {
      var _;
      P.value = !1, e.type === "textarea" && ((_ = u.value) === null || _ === void 0 || _.handleMouseLeaveWrapper());
    }
    function We() {
      z.value || V.value === "click" && (ne.value = !ne.value);
    }
    function dt(_) {
      if (z.value)
        return;
      _.preventDefault();
      const j = (Ne) => {
        Ne.preventDefault(), qe("mouseup", document, j);
      };
      if (Ke("mouseup", document, j), V.value !== "mousedown")
        return;
      ne.value = !0;
      const ge = () => {
        ne.value = !1, qe("mouseup", document, ge);
      };
      Ke("mouseup", document, ge);
    }
    function It(_) {
      var j;
      switch ((j = e.onKeydown) === null || j === void 0 || j.call(e, _), _.key) {
        case "Escape":
          gt();
          break;
        case "Enter":
          st(_);
          break;
      }
    }
    function st(_) {
      var j, ge;
      if (e.passivelyActivated) {
        const { value: Ne } = $;
        if (Ne) {
          e.internalDeactivateOnEnter && gt();
          return;
        }
        _.preventDefault(), e.type === "textarea" ? (j = l.value) === null || j === void 0 || j.focus() : (ge = c.value) === null || ge === void 0 || ge.focus();
      }
    }
    function gt() {
      e.passivelyActivated && ($.value = !1, zt(() => {
        var _;
        (_ = a.value) === null || _ === void 0 || _.focus();
      }));
    }
    function y() {
      var _, j, ge;
      z.value || (e.passivelyActivated ? (_ = a.value) === null || _ === void 0 || _.focus() : ((j = l.value) === null || j === void 0 || j.focus(), (ge = c.value) === null || ge === void 0 || ge.focus()));
    }
    function F() {
      var _;
      !((_ = a.value) === null || _ === void 0) && _.contains(document.activeElement) && document.activeElement.blur();
    }
    function Z() {
      var _, j;
      (_ = l.value) === null || _ === void 0 || _.select(), (j = c.value) === null || j === void 0 || j.select();
    }
    function se() {
      z.value || (l.value ? l.value.focus() : c.value && c.value.focus());
    }
    function ce() {
      const { value: _ } = a;
      _ != null && _.contains(document.activeElement) && _ !== document.activeElement && gt();
    }
    function ve(_) {
      if (e.type === "textarea") {
        const { value: j } = l;
        j == null || j.scrollTo(_);
      } else {
        const { value: j } = c;
        j == null || j.scrollTo(_);
      }
    }
    function be(_) {
      const { type: j, pair: ge, autosize: Ne } = e;
      if (!ge && Ne)
        if (j === "textarea") {
          const { value: Ye } = s;
          Ye && (Ye.textContent = (_ ?? "") + `\r
`);
        } else {
          const { value: Ye } = d;
          Ye && (_ ? Ye.textContent = _ : Ye.innerHTML = "&nbsp;");
        }
    }
    function Pe() {
      de();
    }
    const ot = L({
      top: "0"
    });
    function $t(_) {
      var j;
      const { scrollTop: ge } = _.target;
      ot.value.top = `${-ge}px`, (j = u.value) === null || j === void 0 || j.syncUnifiedContainer();
    }
    let oo = null;
    ht(() => {
      const { autosize: _, type: j } = e;
      _ && j === "textarea" ? oo = Ae(S, (ge) => {
        !Array.isArray(ge) && ge !== C && be(ge);
      }) : oo == null || oo();
    });
    let ro = null;
    ht(() => {
      e.type === "textarea" ? ro = Ae(S, (_) => {
        var j;
        !Array.isArray(_) && _ !== C && ((j = u.value) === null || j === void 0 || j.syncUnifiedContainer());
      }) : ro == null || ro();
    }), _t(Yd, {
      mergedValueRef: S,
      maxlengthRef: Se,
      mergedClsPrefixRef: t,
      countGraphemesRef: $e(e, "countGraphemes")
    });
    const Bn = {
      wrapperElRef: a,
      inputElRef: c,
      textareaElRef: l,
      isCompositing: k,
      focus: y,
      blur: F,
      select: Z,
      deactivate: ce,
      activate: se,
      scrollTo: ve
    }, Dn = Bo("Input", n, t), Hr = R(() => {
      const { value: _ } = w, { common: { cubicBezierEaseInOut: j }, self: { color: ge, borderRadius: Ne, textColor: Ye, caretColor: De, caretColorError: Vt, caretColorWarning: Ut, textDecorationColor: qt, border: po, borderDisabled: vo, borderHover: rr, borderFocus: An, placeholderColor: Fn, placeholderColorDisabled: Hn, lineHeightTextarea: kc, colorDisabled: Tc, colorFocus: zc, textColorDisabled: _c, boxShadowFocus: Ic, iconSize: Mc, colorFocusWarning: Oc, boxShadowFocusWarning: Rc, borderWarning: Ec, borderFocusWarning: Bc, borderHoverWarning: Dc, colorFocusError: Ac, boxShadowFocusError: Fc, borderError: Hc, borderFocusError: Lc, borderHoverError: Wc, clearSize: Nc, clearColor: jc, clearColorHover: Vc, clearColorPressed: Uc, iconColor: qc, iconColorDisabled: Gc, suffixTextColor: Kc, countTextColor: Yc, countTextColorDisabled: Xc, iconColorHover: Zc, iconColorPressed: Jc, loadingColor: Qc, loadingColorError: eu, loadingColorWarning: tu, [oe("padding", _)]: ou, [oe("fontSize", _)]: ru, [oe("height", _)]: nu } } = i.value, { left: iu, right: au } = on(ou);
      return {
        "--n-bezier": j,
        "--n-count-text-color": Yc,
        "--n-count-text-color-disabled": Xc,
        "--n-color": ge,
        "--n-font-size": ru,
        "--n-border-radius": Ne,
        "--n-height": nu,
        "--n-padding-left": iu,
        "--n-padding-right": au,
        "--n-text-color": Ye,
        "--n-caret-color": De,
        "--n-text-decoration-color": qt,
        "--n-border": po,
        "--n-border-disabled": vo,
        "--n-border-hover": rr,
        "--n-border-focus": An,
        "--n-placeholder-color": Fn,
        "--n-placeholder-color-disabled": Hn,
        "--n-icon-size": Mc,
        "--n-line-height-textarea": kc,
        "--n-color-disabled": Tc,
        "--n-color-focus": zc,
        "--n-text-color-disabled": _c,
        "--n-box-shadow-focus": Ic,
        "--n-loading-color": Qc,
        // form warning
        "--n-caret-color-warning": Ut,
        "--n-color-focus-warning": Oc,
        "--n-box-shadow-focus-warning": Rc,
        "--n-border-warning": Ec,
        "--n-border-focus-warning": Bc,
        "--n-border-hover-warning": Dc,
        "--n-loading-color-warning": tu,
        // form error
        "--n-caret-color-error": Vt,
        "--n-color-focus-error": Ac,
        "--n-box-shadow-focus-error": Fc,
        "--n-border-error": Hc,
        "--n-border-focus-error": Lc,
        "--n-border-hover-error": Wc,
        "--n-loading-color-error": eu,
        // clear-button
        "--n-clear-color": jc,
        "--n-clear-size": Nc,
        "--n-clear-color-hover": Vc,
        "--n-clear-color-pressed": Uc,
        "--n-icon-color": qc,
        "--n-icon-color-hover": Zc,
        "--n-icon-color-pressed": Jc,
        "--n-icon-color-disabled": Gc,
        "--n-suffix-text-color": Kc
      };
    }), no = r ? bt("input", R(() => {
      const { value: _ } = w;
      return _[0];
    }), Hr, e) : void 0;
    return Object.assign(Object.assign({}, Bn), {
      // DOM ref
      wrapperElRef: a,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: f,
      textareaElRef: l,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: u,
      // value
      rtlEnabled: Dn,
      uncontrolledValue: x,
      mergedValue: S,
      passwordVisible: ne,
      mergedPlaceholder: T,
      showPlaceholder1: M,
      showPlaceholder2: O,
      mergedFocus: G,
      isComposing: k,
      activated: $,
      showClearButton: Y,
      mergedSize: w,
      mergedDisabled: z,
      textDecorationStyle: H,
      mergedClsPrefix: t,
      mergedBordered: o,
      mergedShowPasswordOn: V,
      placeholderStyle: ot,
      mergedStatus: I,
      textAreaScrollContainerWidth: U,
      // methods
      handleTextAreaScroll: $t,
      handleCompositionStart: vt,
      handleCompositionEnd: X,
      handleInput: le,
      handleInputBlur: ie,
      handleInputFocus: N,
      handleWrapperBlur: Q,
      handleWrapperFocus: D,
      handleMouseEnter: tt,
      handleMouseLeave: Le,
      handleMouseDown: He,
      handleChange: te,
      handleClick: ye,
      handleClear: ze,
      handlePasswordToggleClick: We,
      handlePasswordToggleMousedown: dt,
      handleWrapperKeydown: It,
      handleTextAreaMirrorResize: Pe,
      getTextareaScrollContainer: () => l.value,
      mergedTheme: i,
      cssVars: r ? void 0 : Hr,
      themeClass: no == null ? void 0 : no.themeClass,
      onRender: no == null ? void 0 : no.onRender
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
        mt(s.prefix, (d) => d && m("div", { class: `${o}-input__prefix` }, d)),
        i === "textarea" ? m(Rd, { ref: "textareaScrollbarInstRef", class: `${o}-input__textarea`, container: this.getTextareaScrollContainer, triggerDisplayManually: !0, useUnifiedContainer: !0, internalHoistYRail: !0 }, {
          default: () => {
            var d, c;
            const { textAreaScrollContainerWidth: f } = this, p = {
              width: this.autosize && f && `${f}px`
            };
            return m(
              Qt,
              null,
              m("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [
                `${o}-input__textarea-el`,
                (d = this.inputProps) === null || d === void 0 ? void 0 : d.class
              ], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: [
                this.textDecorationStyle[0],
                (c = this.inputProps) === null || c === void 0 ? void 0 : c.style,
                p
              ], onBlur: this.handleInputBlur, onFocus: (v) => this.handleInputFocus(v, 2), onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })),
              this.showPlaceholder1 ? m("div", { class: `${o}-input__placeholder`, style: [
                this.placeholderStyle,
                p
              ], key: "placeholder" }, this.mergedPlaceholder[0]) : null,
              this.autosize ? m($r, { onResize: this.handleTextAreaMirrorResize }, {
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
        !this.pair && mt(s.suffix, (d) => d || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? m("div", { class: `${o}-input__suffix` }, [
          mt(s["clear-icon-placeholder"], (c) => (this.clearable || c) && m(Ri, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
            placeholder: () => c,
            icon: () => {
              var f, p;
              return (p = (f = this.$slots)["clear-icon"]) === null || p === void 0 ? void 0 : p.call(f);
            }
          })),
          this.internalLoadingBeforeSuffix ? null : d,
          this.loading !== void 0 ? m(Nd, { clsPrefix: o, loading: this.loading, showArrow: !1, showClear: !1, style: this.cssVars }) : null,
          this.internalLoadingBeforeSuffix ? d : null,
          this.showCount && this.type !== "textarea" ? m(Il, null, {
            default: (c) => {
              var f;
              return (f = s.count) === null || f === void 0 ? void 0 : f.call(s, c);
            }
          }) : null,
          this.mergedShowPasswordOn && this.type === "password" ? m("div", { class: `${o}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible ? Yt(s["password-visible-icon"], () => [
            m(Jt, { clsPrefix: o }, { default: () => m(z0, null) })
          ]) : Yt(s["password-invisible-icon"], () => [
            m(Jt, { clsPrefix: o }, { default: () => m(_0, null) })
          ])) : null
        ]) : null)
      ),
      this.pair ? m("span", { class: `${o}-input__separator` }, Yt(s.separator, () => [this.separator])) : null,
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
        mt(s.suffix, (d) => (this.clearable || d) && m("div", { class: `${o}-input__suffix` }, [
          this.clearable && m(Ri, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
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
      this.showCount && i === "textarea" ? m(Il, null, {
        default: (d) => {
          var c;
          const { renderCount: f } = this;
          return f ? f(d) : (c = s.count) === null || c === void 0 ? void 0 : c.call(s, d);
        }
      }) : null
    );
  }
});
function RC(e) {
  const { boxShadow2: t } = e;
  return {
    menuBoxShadow: t
  };
}
const EC = {
  name: "AutoComplete",
  common: ee,
  peers: {
    InternalSelectMenu: Ar,
    Input: Bt
  },
  self: RC
}, BC = EC, DC = (e) => {
  const { borderRadius: t, avatarColor: o, cardColor: r, fontSize: n, heightTiny: i, heightSmall: a, heightMedium: l, heightLarge: s, heightHuge: d, modalColor: c, popoverColor: f } = e;
  return {
    borderRadius: t,
    fontSize: n,
    border: `2px solid ${r}`,
    heightTiny: i,
    heightSmall: a,
    heightMedium: l,
    heightLarge: s,
    heightHuge: d,
    color: fe(r, o),
    colorModal: fe(c, o),
    colorPopover: fe(f, o)
  };
}, AC = {
  name: "Avatar",
  common: ee,
  self: DC
}, Xd = AC, FC = () => ({
  gap: "-12px"
}), HC = {
  name: "AvatarGroup",
  common: ee,
  peers: {
    Avatar: Xd
  },
  self: FC
}, LC = HC, WC = {
  width: "44px",
  height: "44px",
  borderRadius: "22px",
  iconSize: "26px"
}, NC = {
  name: "BackTop",
  common: ee,
  self(e) {
    const { popoverColor: t, textColor2: o, primaryColorHover: r, primaryColorPressed: n } = e;
    return Object.assign(Object.assign({}, WC), { color: t, textColor: o, iconColor: o, iconColorHover: r, iconColorPressed: n, boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)", boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)", boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)" });
  }
}, jC = NC, VC = {
  name: "Badge",
  common: ee,
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
}, UC = VC, qC = {
  fontWeightActive: "400"
}, GC = (e) => {
  const { fontSize: t, textColor3: o, textColor2: r, borderRadius: n, buttonColor2Hover: i, buttonColor2Pressed: a } = e;
  return Object.assign(Object.assign({}, qC), { fontSize: t, itemLineHeight: "1.25", itemTextColor: o, itemTextColorHover: r, itemTextColorPressed: r, itemTextColorActive: r, itemBorderRadius: n, itemColorHover: i, itemColorPressed: a, separatorColor: o });
}, KC = {
  name: "Breadcrumb",
  common: ee,
  self: GC
}, YC = KC;
function mo(e) {
  return fe(e, [255, 255, 255, 0.16]);
}
function Zr(e) {
  return fe(e, [0, 0, 0, 0.12]);
}
const XC = "n-button-group", ZC = {
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
}, Zd = (e) => {
  const { heightTiny: t, heightSmall: o, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: a, fontSizeSmall: l, fontSizeMedium: s, fontSizeLarge: d, opacityDisabled: c, textColor2: f, textColor3: p, primaryColorHover: v, primaryColorPressed: u, borderColor: b, primaryColor: x, baseColor: h, infoColor: S, infoColorHover: E, infoColorPressed: w, successColor: z, successColorHover: I, successColorPressed: g, warningColor: P, warningColorHover: k, warningColorPressed: $, errorColor: C, errorColorHover: T, errorColorPressed: M, fontWeight: O, buttonColor2: G, buttonColor2Hover: Y, buttonColor2Pressed: V, fontWeightStrong: ne } = e;
  return Object.assign(Object.assign({}, ZC), {
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
    colorSecondaryHover: Y,
    colorSecondaryPressed: V,
    // tertiary
    colorTertiary: G,
    colorTertiaryHover: Y,
    colorTertiaryPressed: V,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: Y,
    colorQuaternaryPressed: V,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: f,
    textColorTertiary: p,
    textColorHover: v,
    textColorPressed: u,
    textColorFocus: v,
    textColorDisabled: f,
    textColorText: f,
    textColorTextHover: v,
    textColorTextPressed: u,
    textColorTextFocus: v,
    textColorTextDisabled: f,
    textColorGhost: f,
    textColorGhostHover: v,
    textColorGhostPressed: u,
    textColorGhostFocus: v,
    textColorGhostDisabled: f,
    border: `1px solid ${b}`,
    borderHover: `1px solid ${v}`,
    borderPressed: `1px solid ${u}`,
    borderFocus: `1px solid ${v}`,
    borderDisabled: `1px solid ${b}`,
    rippleColor: x,
    // primary
    colorPrimary: x,
    colorHoverPrimary: v,
    colorPressedPrimary: u,
    colorFocusPrimary: v,
    colorDisabledPrimary: x,
    textColorPrimary: h,
    textColorHoverPrimary: h,
    textColorPressedPrimary: h,
    textColorFocusPrimary: h,
    textColorDisabledPrimary: h,
    textColorTextPrimary: x,
    textColorTextHoverPrimary: v,
    textColorTextPressedPrimary: u,
    textColorTextFocusPrimary: v,
    textColorTextDisabledPrimary: f,
    textColorGhostPrimary: x,
    textColorGhostHoverPrimary: v,
    textColorGhostPressedPrimary: u,
    textColorGhostFocusPrimary: v,
    textColorGhostDisabledPrimary: x,
    borderPrimary: `1px solid ${x}`,
    borderHoverPrimary: `1px solid ${v}`,
    borderPressedPrimary: `1px solid ${u}`,
    borderFocusPrimary: `1px solid ${v}`,
    borderDisabledPrimary: `1px solid ${x}`,
    rippleColorPrimary: x,
    // info
    colorInfo: S,
    colorHoverInfo: E,
    colorPressedInfo: w,
    colorFocusInfo: E,
    colorDisabledInfo: S,
    textColorInfo: h,
    textColorHoverInfo: h,
    textColorPressedInfo: h,
    textColorFocusInfo: h,
    textColorDisabledInfo: h,
    textColorTextInfo: S,
    textColorTextHoverInfo: E,
    textColorTextPressedInfo: w,
    textColorTextFocusInfo: E,
    textColorTextDisabledInfo: f,
    textColorGhostInfo: S,
    textColorGhostHoverInfo: E,
    textColorGhostPressedInfo: w,
    textColorGhostFocusInfo: E,
    textColorGhostDisabledInfo: S,
    borderInfo: `1px solid ${S}`,
    borderHoverInfo: `1px solid ${E}`,
    borderPressedInfo: `1px solid ${w}`,
    borderFocusInfo: `1px solid ${E}`,
    borderDisabledInfo: `1px solid ${S}`,
    rippleColorInfo: S,
    // success
    colorSuccess: z,
    colorHoverSuccess: I,
    colorPressedSuccess: g,
    colorFocusSuccess: I,
    colorDisabledSuccess: z,
    textColorSuccess: h,
    textColorHoverSuccess: h,
    textColorPressedSuccess: h,
    textColorFocusSuccess: h,
    textColorDisabledSuccess: h,
    textColorTextSuccess: z,
    textColorTextHoverSuccess: I,
    textColorTextPressedSuccess: g,
    textColorTextFocusSuccess: I,
    textColorTextDisabledSuccess: f,
    textColorGhostSuccess: z,
    textColorGhostHoverSuccess: I,
    textColorGhostPressedSuccess: g,
    textColorGhostFocusSuccess: I,
    textColorGhostDisabledSuccess: z,
    borderSuccess: `1px solid ${z}`,
    borderHoverSuccess: `1px solid ${I}`,
    borderPressedSuccess: `1px solid ${g}`,
    borderFocusSuccess: `1px solid ${I}`,
    borderDisabledSuccess: `1px solid ${z}`,
    rippleColorSuccess: z,
    // warning
    colorWarning: P,
    colorHoverWarning: k,
    colorPressedWarning: $,
    colorFocusWarning: k,
    colorDisabledWarning: P,
    textColorWarning: h,
    textColorHoverWarning: h,
    textColorPressedWarning: h,
    textColorFocusWarning: h,
    textColorDisabledWarning: h,
    textColorTextWarning: P,
    textColorTextHoverWarning: k,
    textColorTextPressedWarning: $,
    textColorTextFocusWarning: k,
    textColorTextDisabledWarning: f,
    textColorGhostWarning: P,
    textColorGhostHoverWarning: k,
    textColorGhostPressedWarning: $,
    textColorGhostFocusWarning: k,
    textColorGhostDisabledWarning: P,
    borderWarning: `1px solid ${P}`,
    borderHoverWarning: `1px solid ${k}`,
    borderPressedWarning: `1px solid ${$}`,
    borderFocusWarning: `1px solid ${k}`,
    borderDisabledWarning: `1px solid ${P}`,
    rippleColorWarning: P,
    // error
    colorError: C,
    colorHoverError: T,
    colorPressedError: M,
    colorFocusError: T,
    colorDisabledError: C,
    textColorError: h,
    textColorHoverError: h,
    textColorPressedError: h,
    textColorFocusError: h,
    textColorDisabledError: h,
    textColorTextError: C,
    textColorTextHoverError: T,
    textColorTextPressedError: M,
    textColorTextFocusError: T,
    textColorTextDisabledError: f,
    textColorGhostError: C,
    textColorGhostHoverError: T,
    textColorGhostPressedError: M,
    textColorGhostFocusError: T,
    textColorGhostDisabledError: C,
    borderError: `1px solid ${C}`,
    borderHoverError: `1px solid ${T}`,
    borderPressedError: `1px solid ${M}`,
    borderFocusError: `1px solid ${T}`,
    borderDisabledError: `1px solid ${C}`,
    rippleColorError: C,
    waveOpacity: "0.6",
    fontWeight: O,
    fontWeightStrong: ne
  });
}, JC = {
  name: "Button",
  common: pt,
  self: Zd
}, Jd = JC, QC = {
  name: "Button",
  common: ee,
  self(e) {
    const t = Zd(e);
    return t.waveOpacity = "0.8", t.colorOpacitySecondary = "0.16", t.colorOpacitySecondaryHover = "0.2", t.colorOpacitySecondaryPressed = "0.12", t;
  }
}, Pt = QC, ey = W([B("button", `
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
 `, [J("color", [A("border", {
  borderColor: "var(--n-border-color)"
}), J("disabled", [A("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), Qe("disabled", [W("&:focus", [A("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), W("&:hover", [A("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), W("&:active", [A("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), J("pressed", [A("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), J("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [A("border", {
  border: "var(--n-border-disabled)"
})]), Qe("disabled", [W("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [A("state-border", {
  border: "var(--n-border-focus)"
})]), W("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [A("state-border", {
  border: "var(--n-border-hover)"
})]), W("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [A("state-border", {
  border: "var(--n-border-pressed)"
})]), J("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [A("state-border", {
  border: "var(--n-border-pressed)"
})])]), J("loading", "cursor: wait;"), B("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [J("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), Er && "MozBoxSizing" in document.createElement("div").style ? W("&::moz-focus-inner", {
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
 `, [_r({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), fC()]), A("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [W("~", [A("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), J("block", `
 display: flex;
 width: 100%;
 `), J("dashed", [A("border, state-border", {
  borderStyle: "dashed !important"
})]), J("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), W("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), W("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]), ty = Object.assign(Object.assign({}, Me.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: {
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
  default: !qd
} }), oy = xe({
  name: "Button",
  props: ty,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      const { dashed: w, ghost: z, text: I, secondary: g, tertiary: P, quaternary: k } = e;
      (w || z || I) && (g || P || k) && kt("button", "`dashed`, `ghost` and `text` props can't be used along with `secondary`, `tertiary` and `quaterary` props.");
    });
    const t = L(null), o = L(null), r = L(!1), n = Xe(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = Be(XC, {}), { mergedSizeRef: a } = Mo({}, {
      defaultSize: "medium",
      mergedSize: (w) => {
        const { size: z } = e;
        if (z)
          return z;
        const { size: I } = i;
        if (I)
          return I;
        const { mergedSize: g } = w || {};
        return g ? g.value : "medium";
      }
    }), l = R(() => e.focusable && !e.disabled), s = (w) => {
      var z;
      l.value || w.preventDefault(), !e.nativeFocusBehavior && (w.preventDefault(), !e.disabled && l.value && ((z = t.value) === null || z === void 0 || z.focus({ preventScroll: !0 })));
    }, d = (w) => {
      var z;
      if (!e.disabled && !e.loading) {
        const { onClick: I } = e;
        I && he(I, w), e.text || (z = o.value) === null || z === void 0 || z.play();
      }
    }, c = (w) => {
      switch (w.key) {
        case "Enter":
          if (!e.keyboard)
            return;
          r.value = !1;
      }
    }, f = (w) => {
      switch (w.key) {
        case "Enter":
          if (!e.keyboard || e.loading) {
            w.preventDefault();
            return;
          }
          r.value = !0;
      }
    }, p = () => {
      r.value = !1;
    }, { inlineThemeDisabled: v, mergedClsPrefixRef: u, mergedRtlRef: b } = xt(e), x = Me("Button", "-button", ey, Jd, e, u), h = Bo("Button", b, u), S = R(() => {
      const w = x.value, { common: { cubicBezierEaseInOut: z, cubicBezierEaseOut: I }, self: g } = w, { rippleDuration: P, opacityDisabled: k, fontWeight: $, fontWeightStrong: C } = g, T = a.value, { dashed: M, type: O, ghost: G, text: Y, color: V, round: ne, circle: H, textColor: U, secondary: de, tertiary: Se, quaternary: _e, strong: Ee } = e, ke = {
        "font-weight": Ee ? C : $
      };
      let ue = {
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
      const me = O === "tertiary", Te = O === "default", ae = me ? "default" : O;
      if (Y) {
        const ie = U || V;
        ue = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": ie || g[oe("textColorText", ae)],
          "--n-text-color-hover": ie ? mo(ie) : g[oe("textColorTextHover", ae)],
          "--n-text-color-pressed": ie ? Zr(ie) : g[oe("textColorTextPressed", ae)],
          "--n-text-color-focus": ie ? mo(ie) : g[oe("textColorTextHover", ae)],
          "--n-text-color-disabled": ie || g[oe("textColorTextDisabled", ae)]
        };
      } else if (G || M) {
        const ie = U || V;
        ue = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": V || g[oe("rippleColor", ae)],
          "--n-text-color": ie || g[oe("textColorGhost", ae)],
          "--n-text-color-hover": ie ? mo(ie) : g[oe("textColorGhostHover", ae)],
          "--n-text-color-pressed": ie ? Zr(ie) : g[oe("textColorGhostPressed", ae)],
          "--n-text-color-focus": ie ? mo(ie) : g[oe("textColorGhostHover", ae)],
          "--n-text-color-disabled": ie || g[oe("textColorGhostDisabled", ae)]
        };
      } else if (de) {
        const ie = Te ? g.textColor : me ? g.textColorTertiary : g[oe("color", ae)], N = V || ie, Q = O !== "default" && O !== "tertiary";
        ue = {
          "--n-color": Q ? K(N, {
            alpha: Number(g.colorOpacitySecondary)
          }) : g.colorSecondary,
          "--n-color-hover": Q ? K(N, {
            alpha: Number(g.colorOpacitySecondaryHover)
          }) : g.colorSecondaryHover,
          "--n-color-pressed": Q ? K(N, {
            alpha: Number(g.colorOpacitySecondaryPressed)
          }) : g.colorSecondaryPressed,
          "--n-color-focus": Q ? K(N, {
            alpha: Number(g.colorOpacitySecondaryHover)
          }) : g.colorSecondaryHover,
          "--n-color-disabled": g.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": N,
          "--n-text-color-hover": N,
          "--n-text-color-pressed": N,
          "--n-text-color-focus": N,
          "--n-text-color-disabled": N
        };
      } else if (Se || _e) {
        const ie = Te ? g.textColor : me ? g.textColorTertiary : g[oe("color", ae)], N = V || ie;
        Se ? (ue["--n-color"] = g.colorTertiary, ue["--n-color-hover"] = g.colorTertiaryHover, ue["--n-color-pressed"] = g.colorTertiaryPressed, ue["--n-color-focus"] = g.colorSecondaryHover, ue["--n-color-disabled"] = g.colorTertiary) : (ue["--n-color"] = g.colorQuaternary, ue["--n-color-hover"] = g.colorQuaternaryHover, ue["--n-color-pressed"] = g.colorQuaternaryPressed, ue["--n-color-focus"] = g.colorQuaternaryHover, ue["--n-color-disabled"] = g.colorQuaternary), ue["--n-ripple-color"] = "#0000", ue["--n-text-color"] = N, ue["--n-text-color-hover"] = N, ue["--n-text-color-pressed"] = N, ue["--n-text-color-focus"] = N, ue["--n-text-color-disabled"] = N;
      } else
        ue = {
          "--n-color": V || g[oe("color", ae)],
          "--n-color-hover": V ? mo(V) : g[oe("colorHover", ae)],
          "--n-color-pressed": V ? Zr(V) : g[oe("colorPressed", ae)],
          "--n-color-focus": V ? mo(V) : g[oe("colorFocus", ae)],
          "--n-color-disabled": V || g[oe("colorDisabled", ae)],
          "--n-ripple-color": V || g[oe("rippleColor", ae)],
          "--n-text-color": U || (V ? g.textColorPrimary : me ? g.textColorTertiary : g[oe("textColor", ae)]),
          "--n-text-color-hover": U || (V ? g.textColorHoverPrimary : g[oe("textColorHover", ae)]),
          "--n-text-color-pressed": U || (V ? g.textColorPressedPrimary : g[oe("textColorPressed", ae)]),
          "--n-text-color-focus": U || (V ? g.textColorFocusPrimary : g[oe("textColorFocus", ae)]),
          "--n-text-color-disabled": U || (V ? g.textColorDisabledPrimary : g[oe("textColorDisabled", ae)])
        };
      let je = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      Y ? je = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : je = {
        "--n-border": g[oe("border", ae)],
        "--n-border-hover": g[oe("borderHover", ae)],
        "--n-border-pressed": g[oe("borderPressed", ae)],
        "--n-border-focus": g[oe("borderFocus", ae)],
        "--n-border-disabled": g[oe("borderDisabled", ae)]
      };
      const { [oe("height", T)]: Fe, [oe("fontSize", T)]: Ve, [oe("padding", T)]: Ge, [oe("paddingRound", T)]: Ze, [oe("iconSize", T)]: lt, [oe("borderRadius", T)]: vt, [oe("iconMargin", T)]: X, waveOpacity: le } = g, Ce = {
        "--n-width": H && !Y ? Fe : "initial",
        "--n-height": Y ? "initial" : Fe,
        "--n-font-size": Ve,
        "--n-padding": H || Y ? "initial" : ne ? Ze : Ge,
        "--n-icon-size": lt,
        "--n-icon-margin": X,
        "--n-border-radius": Y ? "initial" : H || ne ? Fe : vt
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": z, "--n-bezier-ease-out": I, "--n-ripple-duration": P, "--n-opacity-disabled": k, "--n-wave-opacity": le }, ke), ue), je), Ce);
    }), E = v ? bt("button", R(() => {
      let w = "";
      const { dashed: z, type: I, ghost: g, text: P, color: k, round: $, circle: C, textColor: T, secondary: M, tertiary: O, quaternary: G, strong: Y } = e;
      z && (w += "a"), g && (w += "b"), P && (w += "c"), $ && (w += "d"), C && (w += "e"), M && (w += "f"), O && (w += "g"), G && (w += "h"), Y && (w += "i"), k && (w += "j" + fn(k)), T && (w += "k" + fn(T));
      const { value: V } = a;
      return w += "l" + V[0], w += "m" + I[0], w;
    }), S, e) : void 0;
    return {
      selfElRef: t,
      waveElRef: o,
      mergedClsPrefix: u,
      mergedFocusable: l,
      mergedSize: a,
      showBorder: n,
      enterPressed: r,
      rtlEnabled: h,
      handleMousedown: s,
      handleKeydown: f,
      handleBlur: p,
      handleKeyup: c,
      handleClick: d,
      customColorCssVars: R(() => {
        const { color: w } = e;
        if (!w)
          return null;
        const z = mo(w);
        return {
          "--n-border-color": w,
          "--n-border-color-hover": z,
          "--n-border-color-pressed": Zr(w),
          "--n-border-color-focus": z,
          "--n-border-color-disabled": w
        };
      }),
      cssVars: v ? void 0 : S,
      themeClass: E == null ? void 0 : E.themeClass,
      onRender: E == null ? void 0 : E.onRender
    };
  },
  render() {
    const { mergedClsPrefix: e, tag: t, onRender: o } = this;
    o == null || o();
    const r = mt(this.$slots.default, (n) => n && m("span", { class: `${e}-button__content` }, n));
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
      m(E0, { width: !0 }, {
        default: () => mt(this.$slots.icon, (n) => (this.loading || this.renderIcon || n) && m(
          "span",
          { class: `${e}-button__icon`, style: {
            margin: mi(this.$slots.default) ? "0" : ""
          } },
          m(Mn, null, {
            default: () => this.loading ? m(ca, { clsPrefix: e, key: "loading", class: `${e}-icon-slot`, strokeWidth: 20 }) : m("div", { key: "icon", class: `${e}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : n)
          })
        ))
      }),
      this.iconPlacement === "left" && r,
      this.text ? null : m(Lx, { ref: "waveElRef", clsPrefix: e }),
      this.showBorder ? m("div", { "aria-hidden": !0, class: `${e}-button__border`, style: this.customColorCssVars }) : null,
      this.showBorder ? m("div", { "aria-hidden": !0, class: `${e}-button__state-border`, style: this.customColorCssVars }) : null
    );
  }
}), Ml = oy, ry = {
  titleFontSize: "22px"
}, ny = (e) => {
  const { borderRadius: t, fontSize: o, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: a, dividerColor: l, fontWeightStrong: s, primaryColor: d, baseColor: c, hoverColor: f, cardColor: p, modalColor: v, popoverColor: u } = e;
  return Object.assign(Object.assign({}, ry), {
    borderRadius: t,
    borderColor: fe(p, l),
    borderColorModal: fe(v, l),
    borderColorPopover: fe(u, l),
    textColor: n,
    titleFontWeight: s,
    titleTextColor: i,
    dayTextColor: a,
    fontSize: o,
    lineHeight: r,
    dateColorCurrent: d,
    dateTextColorCurrent: c,
    cellColorHover: fe(p, f),
    cellColorHoverModal: fe(v, f),
    cellColorHoverPopover: fe(u, f),
    cellColor: p,
    cellColorModal: v,
    cellColorPopover: u,
    barColor: d
  });
}, iy = {
  name: "Calendar",
  common: ee,
  peers: {
    Button: Pt
  },
  self: ny
}, ay = iy, ly = (e) => {
  const { fontSize: t, boxShadow2: o, popoverColor: r, textColor2: n, borderRadius: i, borderColor: a, heightSmall: l, heightMedium: s, heightLarge: d, fontSizeSmall: c, fontSizeMedium: f, fontSizeLarge: p, dividerColor: v } = e;
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
    fontSizeMedium: f,
    fontSizeLarge: p,
    dividerColor: v
  };
}, sy = {
  name: "ColorPicker",
  common: ee,
  peers: {
    Input: Bt,
    Button: Pt
  },
  self: ly
}, dy = sy, cy = {
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
}, uy = (e) => {
  const { primaryColor: t, borderRadius: o, lineHeight: r, fontSize: n, cardColor: i, textColor2: a, textColor1: l, dividerColor: s, fontWeightStrong: d, closeIconColor: c, closeIconColorHover: f, closeIconColorPressed: p, closeColorHover: v, closeColorPressed: u, modalColor: b, boxShadow1: x, popoverColor: h, actionColor: S } = e;
  return Object.assign(Object.assign({}, cy), {
    lineHeight: r,
    color: i,
    colorModal: b,
    colorPopover: h,
    colorTarget: t,
    colorEmbedded: S,
    colorEmbeddedModal: S,
    colorEmbeddedPopover: S,
    textColor: a,
    titleTextColor: l,
    borderColor: s,
    actionColor: S,
    titleFontWeight: d,
    closeColorHover: v,
    closeColorPressed: u,
    closeBorderRadius: o,
    closeIconColor: c,
    closeIconColorHover: f,
    closeIconColorPressed: p,
    fontSizeSmall: n,
    fontSizeMedium: n,
    fontSizeLarge: n,
    fontSizeHuge: n,
    boxShadow: x,
    borderRadius: o
  });
}, fy = {
  name: "Card",
  common: ee,
  self(e) {
    const t = uy(e), { cardColor: o, modalColor: r, popoverColor: n } = e;
    return t.colorEmbedded = o, t.colorEmbeddedModal = r, t.colorEmbeddedPopover = n, t;
  }
}, Qd = fy, hy = (e) => ({
  dotSize: "8px",
  dotColor: "rgba(255, 255, 255, .3)",
  dotColorActive: "rgba(255, 255, 255, 1)",
  dotColorFocus: "rgba(255, 255, 255, .5)",
  dotLineWidth: "16px",
  dotLineWidthActive: "24px",
  arrowColor: "#eee"
}), py = {
  name: "Carousel",
  common: ee,
  self: hy
}, vy = py, gy = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
}, ec = (e) => {
  const { baseColor: t, inputColorDisabled: o, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: a, borderColor: l, primaryColor: s, textColor2: d, fontSizeSmall: c, fontSizeMedium: f, fontSizeLarge: p, borderRadiusSmall: v, lineHeight: u } = e;
  return Object.assign(Object.assign({}, gy), {
    labelLineHeight: u,
    fontSizeSmall: c,
    fontSizeMedium: f,
    fontSizeLarge: p,
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
    boxShadowFocus: `0 0 0 2px ${K(s, { alpha: 0.3 })}`,
    textColor: d,
    textColorDisabled: a
  });
}, my = {
  name: "Checkbox",
  common: pt,
  self: ec
}, by = my, xy = {
  name: "Checkbox",
  common: ee,
  self(e) {
    const { cardColor: t } = e, o = ec(e);
    return o.color = "#0000", o.checkMarkColor = t, o;
  }
}, tr = xy, Cy = (e) => {
  const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n, textColor3: i, primaryColor: a, textColorDisabled: l, dividerColor: s, hoverColor: d, fontSizeMedium: c, heightMedium: f } = e;
  return {
    menuBorderRadius: t,
    menuColor: r,
    menuBoxShadow: o,
    menuDividerColor: s,
    menuHeight: "calc(var(--n-option-height) * 6.6)",
    optionArrowColor: i,
    optionHeight: f,
    optionFontSize: c,
    optionColorHover: d,
    optionTextColor: n,
    optionTextColorActive: a,
    optionTextColorDisabled: l,
    optionCheckMarkColor: a,
    loadingColor: a,
    columnWidth: "180px"
  };
}, yy = {
  name: "Cascader",
  common: ee,
  peers: {
    InternalSelectMenu: Ar,
    InternalSelection: pa,
    Scrollbar: St,
    Checkbox: tr,
    Empty: fa
  },
  self: Cy
}, wy = yy, Sy = m(
  "svg",
  { viewBox: "0 0 64 64", class: "check-icon" },
  m("path", { d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z" })
), Py = m(
  "svg",
  { viewBox: "0 0 100 100", class: "line-icon" },
  m("path", { d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z" })
), tc = "n-checkbox-group", $y = {
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
xe({
  name: "CheckboxGroup",
  props: $y,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onChange !== void 0 && kt("checkbox-group", "`on-change` is deprecated, please use `on-update:value` instead.");
    });
    const { mergedClsPrefixRef: t } = xt(e), o = Mo(e), { mergedSizeRef: r, mergedDisabledRef: n } = o, i = L(e.defaultValue), a = R(() => e.value), l = so(a, i), s = R(() => {
      var f;
      return ((f = l.value) === null || f === void 0 ? void 0 : f.length) || 0;
    }), d = R(() => Array.isArray(l.value) ? new Set(l.value) : /* @__PURE__ */ new Set());
    function c(f, p) {
      const { nTriggerFormInput: v, nTriggerFormChange: u } = o, { onChange: b, "onUpdate:value": x, onUpdateValue: h } = e;
      if (Array.isArray(l.value)) {
        const S = Array.from(l.value), E = S.findIndex((w) => w === p);
        f ? ~E || (S.push(p), h && he(h, S, {
          actionType: "check",
          value: p
        }), x && he(x, S, {
          actionType: "check",
          value: p
        }), v(), u(), i.value = S, b && he(b, S)) : ~E && (S.splice(E, 1), h && he(h, S, {
          actionType: "uncheck",
          value: p
        }), x && he(x, S, {
          actionType: "uncheck",
          value: p
        }), b && he(b, S), i.value = S, v(), u());
      } else
        f ? (h && he(h, [p], {
          actionType: "check",
          value: p
        }), x && he(x, [p], {
          actionType: "check",
          value: p
        }), b && he(b, [p]), i.value = [p], v(), u()) : (h && he(h, [], {
          actionType: "uncheck",
          value: p
        }), x && he(x, [], {
          actionType: "uncheck",
          value: p
        }), b && he(b, []), i.value = [], v(), u());
    }
    return _t(tc, {
      checkedCountRef: s,
      maxRef: $e(e, "max"),
      minRef: $e(e, "min"),
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
const ky = W([
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
 `, [W("&:hover", [B("checkbox-box", [A("border", {
    border: "var(--n-border-checked)"
  })])]), W("&:focus:not(:active)", [B("checkbox-box", [A("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), J("inside-table", [B("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), J("checked", [B("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [B("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    W(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), J("indeterminate", [B("checkbox-box", [B("checkbox-icon", [W(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), W(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), J("checked, indeterminate", [W("&:focus:not(:active)", [B("checkbox-box", [A("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), B("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [A("border", {
    border: "var(--n-border-checked)"
  })])]), J("disabled", {
    cursor: "not-allowed"
  }, [J("checked", [B("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [A("border", {
    border: "var(--n-border-disabled-checked)"
  }), B("checkbox-icon", [W(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), B("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [A("border", {
    border: "var(--n-border-disabled)"
  }), B("checkbox-icon", [W(".check-icon, .line-icon", {
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
 `, [W(".check-icon, .line-icon", `
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
 `), _r({
    left: "1px",
    top: "1px"
  })])]), A("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [W("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  Ps(B("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  $s(B("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), Ty = Object.assign(Object.assign({}, Me.props), {
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
}), zy = xe({
  name: "Checkbox",
  props: Ty,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onChange && kt("checkbox", "`on-change` is deprecated, please use `on-update:checked` instead.");
    });
    const t = L(null), { mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = xt(e), i = Mo(e, {
      mergedSize(I) {
        const { size: g } = e;
        if (g !== void 0)
          return g;
        if (s) {
          const { value: P } = s.mergedSizeRef;
          if (P !== void 0)
            return P;
        }
        if (I) {
          const { mergedSize: P } = I;
          if (P !== void 0)
            return P.value;
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
          const { maxRef: { value: P }, checkedCountRef: k } = s;
          if (P !== void 0 && k.value >= P && !p.value)
            return !0;
          const { minRef: { value: $ } } = s;
          if ($ !== void 0 && k.value <= $ && p.value)
            return !0;
        }
        return I ? I.disabled.value : !1;
      }
    }), { mergedDisabledRef: a, mergedSizeRef: l } = i, s = Be(tc, null), d = L(e.defaultChecked), c = $e(e, "checked"), f = so(c, d), p = Xe(() => {
      if (s) {
        const I = s.valueSetRef.value;
        return I && e.value !== void 0 ? I.has(e.value) : !1;
      } else
        return f.value === e.checkedValue;
    }), v = Me("Checkbox", "-checkbox", ky, by, e, o);
    function u(I) {
      if (s && e.value !== void 0)
        s.toggleCheckbox(!p.value, e.value);
      else {
        const { onChange: g, "onUpdate:checked": P, onUpdateChecked: k } = e, { nTriggerFormInput: $, nTriggerFormChange: C } = i, T = p.value ? e.uncheckedValue : e.checkedValue;
        P && he(P, T, I), k && he(k, T, I), g && he(g, T, I), $(), C(), d.value = T;
      }
    }
    function b(I) {
      a.value || u(I);
    }
    function x(I) {
      if (!a.value)
        switch (I.key) {
          case " ":
          case "Enter":
            u(I);
        }
    }
    function h(I) {
      switch (I.key) {
        case " ":
          I.preventDefault();
      }
    }
    const S = {
      focus: () => {
        var I;
        (I = t.value) === null || I === void 0 || I.focus();
      },
      blur: () => {
        var I;
        (I = t.value) === null || I === void 0 || I.blur();
      }
    }, E = Bo("Checkbox", n, o), w = R(() => {
      const { value: I } = l, { common: { cubicBezierEaseInOut: g }, self: { borderRadius: P, color: k, colorChecked: $, colorDisabled: C, colorTableHeader: T, colorTableHeaderModal: M, colorTableHeaderPopover: O, checkMarkColor: G, checkMarkColorDisabled: Y, border: V, borderFocus: ne, borderDisabled: H, borderChecked: U, boxShadowFocus: de, textColor: Se, textColorDisabled: _e, checkMarkColorDisabledChecked: Ee, colorDisabledChecked: ke, borderDisabledChecked: ue, labelPadding: me, labelLineHeight: Te, labelFontWeight: ae, [oe("fontSize", I)]: je, [oe("size", I)]: Fe } } = v.value;
      return {
        "--n-label-line-height": Te,
        "--n-label-font-weight": ae,
        "--n-size": Fe,
        "--n-bezier": g,
        "--n-border-radius": P,
        "--n-border": V,
        "--n-border-checked": U,
        "--n-border-focus": ne,
        "--n-border-disabled": H,
        "--n-border-disabled-checked": ue,
        "--n-box-shadow-focus": de,
        "--n-color": k,
        "--n-color-checked": $,
        "--n-color-table": T,
        "--n-color-table-modal": M,
        "--n-color-table-popover": O,
        "--n-color-disabled": C,
        "--n-color-disabled-checked": ke,
        "--n-text-color": Se,
        "--n-text-color-disabled": _e,
        "--n-check-mark-color": G,
        "--n-check-mark-color-disabled": Y,
        "--n-check-mark-color-disabled-checked": Ee,
        "--n-font-size": je,
        "--n-label-padding": me
      };
    }), z = r ? bt("checkbox", R(() => l.value[0]), w, e) : void 0;
    return Object.assign(i, S, {
      rtlEnabled: E,
      selfRef: t,
      mergedClsPrefix: o,
      mergedDisabled: a,
      renderedChecked: p,
      mergedTheme: v,
      labelId: cn(),
      handleClick: b,
      handleKeyUp: x,
      handleKeyDown: h,
      cssVars: r ? void 0 : w,
      themeClass: z == null ? void 0 : z.themeClass,
      onRender: z == null ? void 0 : z.onRender
    });
  },
  render() {
    var e;
    const { $slots: t, renderedChecked: o, mergedDisabled: r, indeterminate: n, privateInsideTable: i, cssVars: a, labelId: l, label: s, mergedClsPrefix: d, focusable: c, handleKeyUp: f, handleKeyDown: p, handleClick: v } = this;
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
      ], tabindex: r || !c ? void 0 : 0, role: "checkbox", "aria-checked": n ? "mixed" : o, "aria-labelledby": l, style: a, onKeyup: f, onKeydown: p, onClick: v, onMousedown: () => {
        Ke("selectstart", window, (u) => {
          u.preventDefault();
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
          m(Mn, null, {
            default: () => this.indeterminate ? m("div", { key: "indeterminate", class: `${d}-checkbox-icon` }, Py) : m("div", { key: "check", class: `${d}-checkbox-icon` }, Sy)
          }),
          m("div", { class: `${d}-checkbox-box__border` })
        )
      ),
      s !== null || t.default ? m("span", { class: `${d}-checkbox__label`, id: l }, t.default ? t.default() : s) : null
    );
  }
}), _y = {
  name: "Code",
  common: ee,
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
}, oc = _y, Iy = (e) => {
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
  common: ee,
  self: Iy
}, Oy = My, Ry = (e) => {
  const { cubicBezierEaseInOut: t } = e;
  return {
    bezier: t
  };
}, Ey = {
  name: "CollapseTransition",
  common: ee,
  self: Ry
}, By = Ey, Dy = {
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
    validator: () => (wr("config-provider", "`as` is deprecated, please use `tag` instead."), !0),
    default: void 0
  }
}, Ay = xe({
  name: "ConfigProvider",
  alias: ["App"],
  props: Dy,
  setup(e) {
    const t = Be(Zt, null), o = R(() => {
      const { theme: u } = e;
      if (u === null)
        return;
      const b = t == null ? void 0 : t.mergedThemeRef.value;
      return u === void 0 ? b : b === void 0 ? u : Object.assign({}, b, u);
    }), r = R(() => {
      const { themeOverrides: u } = e;
      if (u !== null) {
        if (u === void 0)
          return t == null ? void 0 : t.mergedThemeOverridesRef.value;
        {
          const b = t == null ? void 0 : t.mergedThemeOverridesRef.value;
          return b === void 0 ? u : cr({}, b, u);
        }
      }
    }), n = Xe(() => {
      const { namespace: u } = e;
      return u === void 0 ? t == null ? void 0 : t.mergedNamespaceRef.value : u;
    }), i = Xe(() => {
      const { bordered: u } = e;
      return u === void 0 ? t == null ? void 0 : t.mergedBorderedRef.value : u;
    }), a = R(() => {
      const { icons: u } = e;
      return u === void 0 ? t == null ? void 0 : t.mergedIconsRef.value : u;
    }), l = R(() => {
      const { componentOptions: u } = e;
      return u !== void 0 ? u : t == null ? void 0 : t.mergedComponentPropsRef.value;
    }), s = R(() => {
      const { clsPrefix: u } = e;
      return u !== void 0 ? u : t == null ? void 0 : t.mergedClsPrefixRef.value;
    }), d = R(() => {
      var u;
      const { rtl: b } = e;
      if (b === void 0)
        return t == null ? void 0 : t.mergedRtlRef.value;
      const x = {};
      for (const h of b)
        x[h.name] = Ft(h), (u = h.peers) === null || u === void 0 || u.forEach((S) => {
          S.name in x || (x[S.name] = Ft(S));
        });
      return x;
    }), c = R(() => e.breakpoints || (t == null ? void 0 : t.mergedBreakpointsRef.value)), f = e.inlineThemeDisabled || (t == null ? void 0 : t.inlineThemeDisabled), p = e.preflightStyleDisabled || (t == null ? void 0 : t.preflightStyleDisabled), v = R(() => {
      const { value: u } = o, { value: b } = r, x = b && Object.keys(b).length !== 0, h = u == null ? void 0 : u.name;
      return h ? x ? `${h}-${Sr(JSON.stringify(r.value))}` : h : x ? Sr(JSON.stringify(r.value)) : "";
    });
    return _t(Zt, {
      mergedThemeHashRef: v,
      mergedBreakpointsRef: c,
      mergedRtlRef: d,
      mergedIconsRef: a,
      mergedComponentPropsRef: l,
      mergedBorderedRef: i,
      mergedNamespaceRef: n,
      mergedClsPrefixRef: s,
      mergedLocaleRef: R(() => {
        const { locale: u } = e;
        if (u !== null)
          return u === void 0 ? t == null ? void 0 : t.mergedLocaleRef.value : u;
      }),
      mergedDateLocaleRef: R(() => {
        const { dateLocale: u } = e;
        if (u !== null)
          return u === void 0 ? t == null ? void 0 : t.mergedDateLocaleRef.value : u;
      }),
      mergedHljsRef: R(() => {
        const { hljs: u } = e;
        return u === void 0 ? t == null ? void 0 : t.mergedHljsRef.value : u;
      }),
      mergedKatexRef: R(() => {
        const { katex: u } = e;
        return u === void 0 ? t == null ? void 0 : t.mergedKatexRef.value : u;
      }),
      mergedThemeRef: o,
      mergedThemeOverridesRef: r,
      inlineThemeDisabled: f || !1,
      preflightStyleDisabled: p || !1
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
      class: `${this.mergedClsPrefix || Sd}-config-provider`
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
  }
}), Fy = {
  name: "Popselect",
  common: ee,
  peers: {
    Popover: Ao,
    InternalSelectMenu: Ar
  }
}, rc = Fy;
function nc(e) {
  const { boxShadow2: t } = e;
  return {
    menuBoxShadow: t
  };
}
const Hy = {
  name: "Select",
  common: pt,
  peers: {
    InternalSelection: Vd,
    InternalSelectMenu: Bd
  },
  self: nc
}, Ly = Hy, Wy = {
  name: "Select",
  common: ee,
  peers: {
    InternalSelection: pa,
    InternalSelectMenu: Ar
  },
  self: nc
}, ic = Wy, Ny = W([B("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), B("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [wn({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), jy = Object.assign(Object.assign({}, Me.props), {
  to: Rt.propTo,
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
}), Vy = xe({
  name: "Select",
  props: jy,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.items !== void 0 && kt("select", "`items` is deprecated, please use `options` instead."), e.onChange !== void 0 && kt("select", "`on-change` is deprecated, please use `on-update:value` instead.");
    });
    const { mergedClsPrefixRef: t, mergedBorderedRef: o, namespaceRef: r, inlineThemeDisabled: n } = xt(e), i = Me("Select", "-select", Ny, Ly, e, t), a = L(e.defaultValue), l = $e(e, "value"), s = so(l, a), d = L(!1), c = L(""), f = R(() => {
      const { valueField: y, childrenField: F } = e, Z = CC(y, F);
      return hx(T.value, Z);
    }), p = R(() => wC($.value, e.valueField, e.childrenField)), v = L(!1), u = so($e(e, "show"), v), b = L(null), x = L(null), h = L(null), { localeRef: S } = In("Select"), E = R(() => {
      var y;
      return (y = e.placeholder) !== null && y !== void 0 ? y : S.value.placeholder;
    }), w = Ts(e, ["items", "options"]), z = [], I = L([]), g = L([]), P = L(/* @__PURE__ */ new Map()), k = R(() => {
      const { fallbackOption: y } = e;
      if (y === void 0) {
        const { labelField: F, valueField: Z } = e;
        return (se) => ({
          [F]: String(se),
          [Z]: se
        });
      }
      return y === !1 ? !1 : (F) => Object.assign(y(F), {
        value: F
      });
    }), $ = R(() => g.value.concat(I.value).concat(w.value)), C = R(() => {
      const { filter: y } = e;
      if (y)
        return y;
      const { labelField: F, valueField: Z } = e;
      return (se, ce) => {
        if (!ce)
          return !1;
        const ve = ce[F];
        if (typeof ve == "string")
          return ai(se, ve);
        const be = ce[Z];
        return typeof be == "string" ? ai(se, be) : typeof be == "number" ? ai(se, String(be)) : !1;
      };
    }), T = R(() => {
      if (e.remote)
        return w.value;
      {
        const { value: y } = $, { value: F } = c;
        return !F.length || !e.filterable ? y : yC(y, C.value, F, e.childrenField);
      }
    });
    function M(y) {
      const F = e.remote, { value: Z } = P, { value: se } = p, { value: ce } = k, ve = [];
      return y.forEach((be) => {
        if (se.has(be))
          ve.push(se.get(be));
        else if (F && Z.has(be))
          ve.push(Z.get(be));
        else if (ce) {
          const Pe = ce(be);
          Pe && ve.push(Pe);
        }
      }), ve;
    }
    const O = R(() => {
      if (e.multiple) {
        const { value: y } = s;
        return Array.isArray(y) ? M(y) : [];
      }
      return null;
    }), G = R(() => {
      const { value: y } = s;
      return !e.multiple && !Array.isArray(y) ? y === null ? null : M([y])[0] || null : null;
    }), Y = Mo(e), { mergedSizeRef: V, mergedDisabledRef: ne, mergedStatusRef: H } = Y;
    function U(y, F) {
      const { onChange: Z, "onUpdate:value": se, onUpdateValue: ce } = e, { nTriggerFormChange: ve, nTriggerFormInput: be } = Y;
      Z && he(Z, y, F), ce && he(ce, y, F), se && he(se, y, F), a.value = y, ve(), be();
    }
    function de(y) {
      const { onBlur: F } = e, { nTriggerFormBlur: Z } = Y;
      F && he(F, y), Z();
    }
    function Se() {
      const { onClear: y } = e;
      y && he(y);
    }
    function _e(y) {
      const { onFocus: F, showOnFocus: Z } = e, { nTriggerFormFocus: se } = Y;
      F && he(F, y), se(), Z && Te();
    }
    function Ee(y) {
      const { onSearch: F } = e;
      F && he(F, y);
    }
    function ke(y) {
      const { onScroll: F } = e;
      F && he(F, y);
    }
    function ue() {
      var y;
      const { remote: F, multiple: Z } = e;
      if (F) {
        const { value: se } = P;
        if (Z) {
          const { valueField: ce } = e;
          (y = O.value) === null || y === void 0 || y.forEach((ve) => {
            se.set(ve[ce], ve);
          });
        } else {
          const ce = G.value;
          ce && se.set(ce[e.valueField], ce);
        }
      }
    }
    function me(y) {
      const { onUpdateShow: F, "onUpdate:show": Z } = e;
      F && he(F, y), Z && he(Z, y), v.value = y;
    }
    function Te() {
      ne.value || (me(!0), v.value = !0, e.filterable && We());
    }
    function ae() {
      me(!1);
    }
    function je() {
      c.value = "", g.value = z;
    }
    const Fe = L(!1);
    function Ve() {
      e.filterable && (Fe.value = !0);
    }
    function Ge() {
      e.filterable && (Fe.value = !1, u.value || je());
    }
    function Ze() {
      ne.value || (u.value ? e.filterable ? We() : ae() : Te());
    }
    function lt(y) {
      var F, Z;
      !((Z = (F = h.value) === null || F === void 0 ? void 0 : F.selfRef) === null || Z === void 0) && Z.contains(y.relatedTarget) || (d.value = !1, de(y), ae());
    }
    function vt(y) {
      _e(y), d.value = !0;
    }
    function X(y) {
      d.value = !0;
    }
    function le(y) {
      var F;
      !((F = b.value) === null || F === void 0) && F.$el.contains(y.relatedTarget) || (d.value = !1, de(y), ae());
    }
    function Ce() {
      var y;
      (y = b.value) === null || y === void 0 || y.focus(), ae();
    }
    function ie(y) {
      var F;
      u.value && (!((F = b.value) === null || F === void 0) && F.$el.contains(Cr(y)) || ae());
    }
    function N(y) {
      if (!Array.isArray(y))
        return [];
      if (k.value)
        return Array.from(y);
      {
        const { remote: F } = e, { value: Z } = p;
        if (F) {
          const { value: se } = P;
          return y.filter((ce) => Z.has(ce) || se.has(ce));
        } else
          return y.filter((se) => Z.has(se));
      }
    }
    function Q(y) {
      D(y.rawNode);
    }
    function D(y) {
      if (ne.value)
        return;
      const { tag: F, remote: Z, clearFilterAfterSelect: se, valueField: ce } = e;
      if (F && !Z) {
        const { value: ve } = g, be = ve[0] || null;
        if (be) {
          const Pe = I.value;
          Pe.length ? Pe.push(be) : I.value = [be], g.value = z;
        }
      }
      if (Z && P.value.set(y[ce], y), e.multiple) {
        const ve = N(s.value), be = ve.findIndex((Pe) => Pe === y[ce]);
        if (~be) {
          if (ve.splice(be, 1), F && !Z) {
            const Pe = q(y[ce]);
            ~Pe && (I.value.splice(Pe, 1), se && (c.value = ""));
          }
        } else
          ve.push(y[ce]), se && (c.value = "");
        U(ve, M(ve));
      } else {
        if (F && !Z) {
          const ve = q(y[ce]);
          ~ve ? I.value = [
            I.value[ve]
          ] : I.value = z;
        }
        Le(), ae(), U(y[ce], y);
      }
    }
    function q(y) {
      return I.value.findIndex((Z) => Z[e.valueField] === y);
    }
    function te(y) {
      u.value || Te();
      const { value: F } = y.target;
      c.value = F;
      const { tag: Z, remote: se } = e;
      if (Ee(F), Z && !se) {
        if (!F) {
          g.value = z;
          return;
        }
        const { onCreate: ce } = e, ve = ce ? ce(F) : { [e.labelField]: F, [e.valueField]: F }, { valueField: be } = e;
        w.value.some((Pe) => Pe[be] === ve[be]) || I.value.some((Pe) => Pe[be] === ve[be]) ? g.value = z : g.value = [ve];
      }
    }
    function ye(y) {
      y.stopPropagation();
      const { multiple: F } = e;
      !F && e.filterable && ae(), Se(), F ? U([], []) : U(null, null);
    }
    function ze(y) {
      !dn(y, "action") && !dn(y, "empty") && y.preventDefault();
    }
    function He(y) {
      ke(y);
    }
    function tt(y) {
      var F, Z, se, ce, ve;
      switch (y.key) {
        case " ":
          if (e.filterable)
            break;
          y.preventDefault();
        case "Enter":
          if (!(!((F = b.value) === null || F === void 0) && F.isComposing)) {
            if (u.value) {
              const be = (Z = h.value) === null || Z === void 0 ? void 0 : Z.getPendingTmNode();
              be ? Q(be) : e.filterable || (ae(), Le());
            } else if (Te(), e.tag && Fe.value) {
              const be = g.value[0];
              if (be) {
                const Pe = be[e.valueField], { value: ot } = s;
                e.multiple && Array.isArray(ot) && ot.some(($t) => $t === Pe) || D(be);
              }
            }
          }
          y.preventDefault();
          break;
        case "ArrowUp":
          if (y.preventDefault(), e.loading)
            return;
          u.value && ((se = h.value) === null || se === void 0 || se.prev());
          break;
        case "ArrowDown":
          if (y.preventDefault(), e.loading)
            return;
          u.value ? (ce = h.value) === null || ce === void 0 || ce.next() : Te();
          break;
        case "Escape":
          u.value && (_f(y), ae()), (ve = b.value) === null || ve === void 0 || ve.focus();
          break;
      }
    }
    function Le() {
      var y;
      (y = b.value) === null || y === void 0 || y.focus();
    }
    function We() {
      var y;
      (y = b.value) === null || y === void 0 || y.focusInput();
    }
    function dt() {
      var y;
      u.value && ((y = x.value) === null || y === void 0 || y.syncPosition());
    }
    ue(), Ae($e(e, "options"), ue);
    const It = {
      focus: () => {
        var y;
        (y = b.value) === null || y === void 0 || y.focus();
      },
      blur: () => {
        var y;
        (y = b.value) === null || y === void 0 || y.blur();
      }
    }, st = R(() => {
      const { self: { menuBoxShadow: y } } = i.value;
      return {
        "--n-menu-box-shadow": y
      };
    }), gt = n ? bt("select", void 0, st, e) : void 0;
    return Object.assign(Object.assign({}, It), {
      mergedStatus: H,
      mergedClsPrefix: t,
      mergedBordered: o,
      namespace: r,
      treeMate: f,
      isMounted: Br(),
      triggerRef: b,
      menuRef: h,
      pattern: c,
      uncontrolledShow: v,
      mergedShow: u,
      adjustedTo: Rt(e),
      uncontrolledValue: a,
      mergedValue: s,
      followerRef: x,
      localizedPlaceholder: E,
      selectedOption: G,
      selectedOptions: O,
      mergedSize: V,
      mergedDisabled: ne,
      focused: d,
      activeWithoutMenuOpen: Fe,
      inlineThemeDisabled: n,
      onTriggerInputFocus: Ve,
      onTriggerInputBlur: Ge,
      handleTriggerOrMenuResize: dt,
      handleMenuFocus: X,
      handleMenuBlur: le,
      handleMenuTabOut: Ce,
      handleTriggerClick: Ze,
      handleToggle: Q,
      handleDeleteOption: D,
      handlePatternInput: te,
      handleClear: ye,
      handleTriggerBlur: lt,
      handleTriggerFocus: vt,
      handleKeydown: tt,
      handleMenuAfterLeave: je,
      handleMenuClickOutside: ie,
      handleMenuScroll: He,
      handleMenuKeydown: tt,
      handleMenuMousedown: ze,
      mergedTheme: i,
      cssVars: n ? void 0 : st,
      themeClass: gt == null ? void 0 : gt.themeClass,
      onRender: gt == null ? void 0 : gt.onRender
    });
  },
  render() {
    return m(
      "div",
      { class: `${this.mergedClsPrefix}-select` },
      m(qi, null, {
        default: () => [
          m(Gi, null, {
            default: () => m(uC, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
              arrow: () => {
                var e, t;
                return [(t = (e = this.$slots).arrow) === null || t === void 0 ? void 0 : t.call(e)];
              }
            })
          }),
          m(Yi, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === Rt.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
            default: () => m(Xt, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
              default: () => {
                var e, t, o;
                return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Or(m(Fx, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
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
                  [Zl, this.mergedShow],
                  [
                    pn,
                    this.handleMenuClickOutside,
                    void 0,
                    { capture: !0 }
                  ]
                ] : [
                  [
                    pn,
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
    fontSizeMedium: f,
    // item size
    heightTiny: p,
    heightSmall: v,
    heightMedium: u
  } = e;
  return Object.assign(Object.assign({}, Uy), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${l}`, buttonBorderHover: `1px solid ${l}`, buttonBorderPressed: `1px solid ${l}`, buttonIconColor: t, buttonIconColorHover: t, buttonIconColorPressed: t, itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: o, itemTextColorDisabled: a, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${o}`, itemBorderDisabled: `1px solid ${l}`, itemBorderRadius: s, itemSizeSmall: p, itemSizeMedium: v, itemSizeLarge: u, itemFontSizeSmall: d, itemFontSizeMedium: c, itemFontSizeLarge: f, jumperFontSizeSmall: d, jumperFontSizeMedium: c, jumperFontSizeLarge: f, jumperTextColor: t, jumperTextColorDisabled: a });
}, Gy = {
  name: "Pagination",
  common: ee,
  peers: {
    Select: ic,
    Input: Bt,
    Popselect: rc
  },
  self(e) {
    const { primaryColor: t, opacity3: o } = e, r = K(t, {
      alpha: Number(o)
    }), n = qy(e);
    return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
  }
}, ac = Gy, lc = {
  padding: "8px 14px"
}, Ky = {
  name: "Tooltip",
  common: ee,
  peers: {
    Popover: Ao
  },
  self(e) {
    const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n } = e;
    return Object.assign(Object.assign({}, lc), { borderRadius: t, boxShadow: o, color: r, textColor: n });
  }
}, On = Ky, Yy = (e) => {
  const { borderRadius: t, boxShadow2: o, baseColor: r } = e;
  return Object.assign(Object.assign({}, lc), { borderRadius: t, boxShadow: o, color: fe(r, "rgba(0, 0, 0, .85)"), textColor: r });
}, Xy = {
  name: "Tooltip",
  common: pt,
  peers: {
    Popover: ha
  },
  self: Yy
}, Zy = Xy, Jy = {
  name: "Ellipsis",
  common: ee,
  peers: {
    Tooltip: On
  }
}, sc = Jy, Qy = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
}, ew = {
  name: "Radio",
  common: ee,
  self(e) {
    const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: a, opacityDisabled: l, borderRadius: s, fontSizeSmall: d, fontSizeMedium: c, fontSizeLarge: f, heightSmall: p, heightMedium: v, heightLarge: u, lineHeight: b } = e;
    return Object.assign(Object.assign({}, Qy), {
      labelLineHeight: b,
      buttonHeightSmall: p,
      buttonHeightMedium: v,
      buttonHeightLarge: u,
      fontSizeSmall: d,
      fontSizeMedium: c,
      fontSizeLarge: f,
      boxShadow: `inset 0 0 0 1px ${t}`,
      boxShadowActive: `inset 0 0 0 1px ${o}`,
      boxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${K(o, { alpha: 0.3 })}`,
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
      buttonBoxShadowFocus: `inset 0 0 0 1px ${o}, 0 0 0 2px ${K(o, { alpha: 0.3 })}`,
      buttonBoxShadowHover: `inset 0 0 0 1px ${o}`,
      buttonBoxShadow: "inset 0 0 0 1px #0000",
      buttonBorderRadius: s
    });
  }
}, dc = ew, tw = {
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
}, ow = (e) => {
  const { primaryColor: t, textColor2: o, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: a, borderRadius: l, fontSizeSmall: s, fontSizeMedium: d, fontSizeLarge: c, fontSizeHuge: f, heightSmall: p, heightMedium: v, heightLarge: u, heightHuge: b, textColor3: x, opacityDisabled: h } = e;
  return Object.assign(Object.assign({}, tw), {
    optionHeightSmall: p,
    optionHeightMedium: v,
    optionHeightLarge: u,
    optionHeightHuge: b,
    borderRadius: l,
    fontSizeSmall: s,
    fontSizeMedium: d,
    fontSizeLarge: c,
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
    optionColorActive: K(t, { alpha: 0.1 }),
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
    optionOpacityDisabled: h
  });
}, rw = {
  name: "Dropdown",
  common: ee,
  peers: {
    Popover: Ao
  },
  self(e) {
    const { primaryColorSuppl: t, primaryColor: o, popoverColor: r } = e, n = ow(e);
    return n.colorInverted = r, n.optionColorActive = K(o, { alpha: 0.15 }), n.optionColorActiveInverted = t, n.optionColorHoverInverted = t, n;
  }
}, va = rw, nw = {
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
}, iw = (e) => {
  const { cardColor: t, modalColor: o, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: a, tableColorHover: l, iconColor: s, primaryColor: d, fontWeightStrong: c, borderRadius: f, lineHeight: p, fontSizeSmall: v, fontSizeMedium: u, fontSizeLarge: b, dividerColor: x, heightSmall: h, opacityDisabled: S, tableColorStriped: E } = e;
  return Object.assign(Object.assign({}, nw), {
    actionDividerColor: x,
    lineHeight: p,
    borderRadius: f,
    fontSizeSmall: v,
    fontSizeMedium: u,
    fontSizeLarge: b,
    borderColor: fe(t, x),
    tdColorHover: fe(t, l),
    tdColorStriped: fe(t, E),
    thColor: fe(t, a),
    thColorHover: fe(fe(t, a), l),
    tdColor: t,
    tdTextColor: n,
    thTextColor: i,
    thFontWeight: c,
    thButtonColorHover: l,
    thIconColor: s,
    thIconColorActive: d,
    // modal
    borderColorModal: fe(o, x),
    tdColorHoverModal: fe(o, l),
    tdColorStripedModal: fe(o, E),
    thColorModal: fe(o, a),
    thColorHoverModal: fe(fe(o, a), l),
    tdColorModal: o,
    // popover
    borderColorPopover: fe(r, x),
    tdColorHoverPopover: fe(r, l),
    tdColorStripedPopover: fe(r, E),
    thColorPopover: fe(r, a),
    thColorHoverPopover: fe(fe(r, a), l),
    tdColorPopover: r,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: h,
    opacityLoading: S
  });
}, aw = {
  name: "DataTable",
  common: ee,
  peers: {
    Button: Pt,
    Checkbox: tr,
    Radio: dc,
    Pagination: ac,
    Scrollbar: St,
    Empty: Do,
    Popover: Ao,
    Ellipsis: sc,
    Dropdown: va
  },
  self(e) {
    const t = iw(e);
    return t.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", t.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", t;
  }
}, lw = aw, sw = Object.assign(Object.assign({}, Fd), Me.props), dw = xe({
  name: "Tooltip",
  props: sw,
  __popover__: !0,
  setup(e) {
    const t = Me("Tooltip", "-tooltip", void 0, Zy, e), o = L(null);
    return Object.assign(Object.assign({}, {
      syncPosition() {
        o.value.syncPosition();
      },
      setShow(n) {
        o.value.setShow(n);
      }
    }), { popoverRef: o, mergedTheme: t, popoverThemeOverrides: R(() => t.value.self) });
  },
  render() {
    const { mergedTheme: e, internalExtraClass: t } = this;
    return m(Hd, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: t.concat("tooltip"), ref: "popoverRef" }), this.$slots);
  }
}), cw = (e) => {
  const { textColorBase: t, opacity1: o, opacity2: r, opacity3: n, opacity4: i, opacity5: a } = e;
  return {
    color: t,
    opacity1Depth: o,
    opacity2Depth: r,
    opacity3Depth: n,
    opacity4Depth: i,
    opacity5Depth: a
  };
}, uw = {
  name: "Icon",
  common: ee,
  self: cw
}, fw = uw, hw = {
  itemFontSize: "12px",
  itemHeight: "36px",
  itemWidth: "52px",
  panelActionPadding: "8px 0"
}, pw = (e) => {
  const { popoverColor: t, textColor2: o, primaryColor: r, hoverColor: n, dividerColor: i, opacityDisabled: a, boxShadow2: l, borderRadius: s, iconColor: d, iconColorDisabled: c } = e;
  return Object.assign(Object.assign({}, hw), {
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
}, vw = {
  name: "TimePicker",
  common: ee,
  peers: {
    Scrollbar: St,
    Button: Pt,
    Input: Bt
  },
  self: pw
}, cc = vw, gw = {
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
}, mw = (e) => {
  const { hoverColor: t, fontSize: o, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: a, borderRadiusSmall: l, iconColor: s, iconColorDisabled: d, textColor1: c, dividerColor: f, boxShadow2: p, borderRadius: v, fontWeightStrong: u } = e;
  return Object.assign(Object.assign({}, gw), {
    itemFontSize: o,
    calendarDaysFontSize: o,
    calendarTitleFontSize: o,
    itemTextColor: r,
    itemTextColorDisabled: n,
    itemTextColorActive: i,
    itemTextColorCurrent: a,
    itemColorIncluded: K(a, { alpha: 0.1 }),
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
    panelHeaderDividerColor: f,
    calendarDaysDividerColor: f,
    calendarDividerColor: f,
    panelActionDividerColor: f,
    panelBoxShadow: p,
    panelBorderRadius: v,
    calendarTitleFontWeight: u,
    scrollItemBorderRadius: v,
    iconColor: s,
    iconColorDisabled: d
  });
}, bw = {
  name: "DatePicker",
  common: ee,
  peers: {
    Input: Bt,
    Button: Pt,
    TimePicker: cc,
    Scrollbar: St
  },
  self(e) {
    const { popoverColor: t, hoverColor: o, primaryColor: r } = e, n = mw(e);
    return n.itemColorDisabled = fe(t, o), n.itemColorIncluded = K(r, { alpha: 0.15 }), n.itemColorHover = fe(t, o), n;
  }
}, xw = bw, Cw = {
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
}, yw = (e) => {
  const { tableHeaderColor: t, textColor2: o, textColor1: r, cardColor: n, modalColor: i, popoverColor: a, dividerColor: l, borderRadius: s, fontWeightStrong: d, lineHeight: c, fontSizeSmall: f, fontSizeMedium: p, fontSizeLarge: v } = e;
  return Object.assign(Object.assign({}, Cw), {
    lineHeight: c,
    fontSizeSmall: f,
    fontSizeMedium: p,
    fontSizeLarge: v,
    titleTextColor: r,
    thColor: fe(n, t),
    thColorModal: fe(i, t),
    thColorPopover: fe(a, t),
    thTextColor: r,
    thFontWeight: d,
    tdTextColor: o,
    tdColor: n,
    tdColorModal: i,
    tdColorPopover: a,
    borderColor: fe(n, l),
    borderColorModal: fe(i, l),
    borderColorPopover: fe(a, l),
    borderRadius: s
  });
}, ww = {
  name: "Descriptions",
  common: ee,
  self: yw
}, Sw = ww, Pw = {
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
}, $w = (e) => {
  const { textColor1: t, textColor2: o, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, infoColor: d, successColor: c, warningColor: f, errorColor: p, primaryColor: v, dividerColor: u, borderRadius: b, fontWeightStrong: x, lineHeight: h, fontSize: S } = e;
  return Object.assign(Object.assign({}, Pw), {
    fontSize: S,
    lineHeight: h,
    border: `1px solid ${u}`,
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
    iconColorWarning: f,
    iconColorError: p,
    borderRadius: b,
    titleFontWeight: x
  });
}, kw = {
  name: "Dialog",
  common: ee,
  peers: {
    Button: Pt
  },
  self: $w
}, uc = kw, Tw = (e) => {
  const { modalColor: t, textColor2: o, boxShadow3: r } = e;
  return {
    color: t,
    textColor: o,
    boxShadow: r
  };
}, zw = {
  name: "Modal",
  common: ee,
  peers: {
    Scrollbar: St,
    Dialog: uc,
    Card: Qd
  },
  self: Tw
}, _w = zw, fc = (e) => {
  const { textColor1: t, dividerColor: o, fontWeightStrong: r } = e;
  return {
    textColor: t,
    color: o,
    fontWeight: r
  };
}, Iw = {
  name: "Divider",
  common: pt,
  self: fc
}, Mw = Iw, Ow = {
  name: "Divider",
  common: ee,
  self: fc
}, Rw = Ow, Ew = B("divider", `
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`, [Qe("vertical", `
 margin-top: 24px;
 margin-bottom: 24px;
 `, [Qe("no-title", `
 display: flex;
 align-items: center;
 `)]), A("title", `
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `), J("title-position-left", [A("line", [J("left", {
  width: "28px"
})])]), J("title-position-right", [A("line", [J("right", {
  width: "28px"
})])]), J("dashed", [A("line", `
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]), J("vertical", `
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
 `), Qe("dashed", [A("line", {
  backgroundColor: "var(--n-color)"
})]), J("dashed", [A("line", {
  borderColor: "var(--n-color)"
})]), J("vertical", {
  backgroundColor: "var(--n-color)"
})]), Bw = Object.assign(Object.assign({}, Me.props), { titlePlacement: {
  type: String,
  default: "center"
}, dashed: Boolean, vertical: Boolean }), hc = xe({
  name: "Divider",
  props: Bw,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = xt(e), r = Me("Divider", "-divider", Ew, Mw, e, t), n = R(() => {
      const { common: { cubicBezierEaseInOut: a }, self: { color: l, textColor: s, fontWeight: d } } = r.value;
      return {
        "--n-bezier": a,
        "--n-color": l,
        "--n-text-color": s,
        "--n-font-weight": d
      };
    }), i = o ? bt("divider", void 0, n, e) : void 0;
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
        Qt,
        null,
        m("div", { class: `${a}-divider__title` }, this.$slots),
        m("div", { class: `${a}-divider__line ${a}-divider__line--right` })
      ) : null
    );
  }
}), Dw = (e) => {
  const { modalColor: t, textColor1: o, textColor2: r, boxShadow3: n, lineHeight: i, fontWeightStrong: a, dividerColor: l, closeColorHover: s, closeColorPressed: d, closeIconColor: c, closeIconColorHover: f, closeIconColorPressed: p, borderRadius: v, primaryColorHover: u } = e;
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
    closeIconColorHover: f,
    closeIconColorPressed: p,
    closeSize: "22px",
    closeIconSize: "18px",
    closeColorHover: s,
    closeColorPressed: d,
    closeBorderRadius: v,
    resizableTriggerColorHover: u
  };
}, Aw = {
  name: "Drawer",
  common: ee,
  peers: {
    Scrollbar: St
  },
  self: Dw
}, Fw = Aw, Hw = {
  actionMargin: "0 0 0 20px",
  actionMarginRtl: "0 20px 0 0"
}, Lw = {
  name: "DynamicInput",
  common: ee,
  peers: {
    Input: Bt,
    Button: Pt
  },
  self() {
    return Hw;
  }
}, Ww = Lw, pc = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
}, Nw = {
  name: "Space",
  self() {
    return pc;
  }
}, vc = Nw, jw = () => pc, Vw = {
  name: "Space",
  self: jw
}, Uw = Vw;
let li;
const qw = () => {
  if (!Er)
    return !0;
  if (li === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), li = t;
  }
  return li;
}, Gw = Object.assign(Object.assign({}, Me.props), {
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
}), gc = xe({
  name: "Space",
  props: Gw,
  setup(e) {
    const { mergedClsPrefixRef: t, mergedRtlRef: o } = xt(e), r = Me("Space", "-space", void 0, Uw, e, t), n = Bo("Space", o, t);
    return {
      useGap: qw(),
      rtlEnabled: n,
      mergedClsPrefix: t,
      margin: R(() => {
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
        const { self: { [oe("gap", i)]: a } } = r.value, { row: l, col: s } = Uu(a);
        return {
          horizontal: yr(s),
          vertical: yr(l)
        };
      })
    };
  },
  render() {
    const { vertical: e, align: t, inline: o, justify: r, itemStyle: n, margin: i, wrap: a, mergedClsPrefix: l, rtlEnabled: s, useGap: d, wrapItem: c, internalUseGap: f } = this, p = un(ef(this));
    if (!p.length)
      return null;
    const v = `${i.horizontal}px`, u = `${i.horizontal / 2}px`, b = `${i.vertical}px`, x = `${i.vertical / 2}px`, h = p.length - 1, S = r.startsWith("space-");
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
    } }, !c && (d || f) ? p : p.map((E, w) => m("div", { role: "none", style: [
      n,
      {
        maxWidth: "100%"
      },
      d ? "" : e ? {
        marginBottom: w !== h ? b : ""
      } : s ? {
        marginLeft: S ? r === "space-between" && w === h ? "" : u : w !== h ? v : "",
        marginRight: S ? r === "space-between" && w === 0 ? "" : u : "",
        paddingTop: x,
        paddingBottom: x
      } : {
        marginRight: S ? r === "space-between" && w === h ? "" : u : w !== h ? v : "",
        marginLeft: S ? r === "space-between" && w === 0 ? "" : u : "",
        paddingTop: x,
        paddingBottom: x
      }
    ] }, E)));
  }
}), Kw = {
  name: "DynamicTags",
  common: ee,
  peers: {
    Input: Bt,
    Button: Pt,
    Tag: Wd,
    Space: vc
  },
  self() {
    return {
      inputWidth: "64px"
    };
  }
}, Yw = Kw, Xw = {
  name: "Element",
  common: ee
}, Zw = Xw, Jw = {
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
}, mc = (e) => {
  const { heightSmall: t, heightMedium: o, heightLarge: r, textColor1: n, errorColor: i, warningColor: a, lineHeight: l, textColor3: s } = e;
  return Object.assign(Object.assign({}, Jw), { blankHeightSmall: t, blankHeightMedium: o, blankHeightLarge: r, lineHeight: l, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: a, feedbackTextColor: s });
}, Qw = {
  name: "Form",
  common: pt,
  self: mc
}, e1 = Qw, t1 = {
  name: "Form",
  common: ee,
  self: mc
}, o1 = t1, Rn = "n-form", r1 = "n-form-item-insts";
function $o() {
  return $o = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o)
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, $o.apply(this, arguments);
}
function n1(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ir(e, t);
}
function Ei(e) {
  return Ei = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, Ei(e);
}
function Ir(e, t) {
  return Ir = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, Ir(e, t);
}
function i1() {
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
function an(e, t, o) {
  return i1() ? an = Reflect.construct.bind() : an = function(n, i, a) {
    var l = [null];
    l.push.apply(l, i);
    var s = Function.bind.apply(n, l), d = new s();
    return a && Ir(d, a.prototype), d;
  }, an.apply(null, arguments);
}
function a1(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Bi(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Bi = function(r) {
    if (r === null || !a1(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, n);
    }
    function n() {
      return an(r, arguments, Ei(this).constructor);
    }
    return n.prototype = Object.create(r.prototype, {
      constructor: {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Ir(n, r);
  }, Bi(e);
}
var l1 = /%[sdj%]/g, bc = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (bc = function(t, o) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && o.every(function(r) {
    return typeof r == "string";
  }) && console.warn(t, o);
});
function Di(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(o) {
    var r = o.field;
    t[r] = t[r] || [], t[r].push(o);
  }), t;
}
function Tt(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    o[r - 1] = arguments[r];
  var n = 0, i = o.length;
  if (typeof e == "function")
    return e.apply(null, o);
  if (typeof e == "string") {
    var a = e.replace(l1, function(l) {
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
function s1(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function it(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || s1(t) && typeof e == "string" && !e);
}
function d1(e, t, o) {
  var r = [], n = 0, i = e.length;
  function a(l) {
    r.push.apply(r, l || []), n++, n === i && o(r);
  }
  e.forEach(function(l) {
    t(l, a);
  });
}
function Ol(e, t, o) {
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
function c1(e) {
  var t = [];
  return Object.keys(e).forEach(function(o) {
    t.push.apply(t, e[o] || []);
  }), t;
}
var Rl = /* @__PURE__ */ function(e) {
  n1(t, e);
  function t(o, r) {
    var n;
    return n = e.call(this, "Async Validation Error") || this, n.errors = o, n.fields = r, n;
  }
  return t;
}(/* @__PURE__ */ Bi(Error));
function u1(e, t, o, r, n) {
  if (t.first) {
    var i = new Promise(function(p, v) {
      var u = function(h) {
        return r(h), h.length ? v(new Rl(h, Di(h))) : p(n);
      }, b = c1(e);
      Ol(b, o, u);
    });
    return i.catch(function(p) {
      return p;
    }), i;
  }
  var a = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], l = Object.keys(e), s = l.length, d = 0, c = [], f = new Promise(function(p, v) {
    var u = function(x) {
      if (c.push.apply(c, x), d++, d === s)
        return r(c), c.length ? v(new Rl(c, Di(c))) : p(n);
    };
    l.length || (r(c), p(n)), l.forEach(function(b) {
      var x = e[b];
      a.indexOf(b) !== -1 ? Ol(x, o, u) : d1(x, o, u);
    });
  });
  return f.catch(function(p) {
    return p;
  }), f;
}
function f1(e) {
  return !!(e && e.message !== void 0);
}
function h1(e, t) {
  for (var o = e, r = 0; r < t.length; r++) {
    if (o == null)
      return o;
    o = o[t[r]];
  }
  return o;
}
function El(e, t) {
  return function(o) {
    var r;
    return e.fullFields ? r = h1(t, e.fullFields) : r = t[o.field || e.fullField], f1(o) ? (o.field = o.field || e.fullField, o.fieldValue = r, o) : {
      message: typeof o == "function" ? o() : o,
      fieldValue: r,
      field: o.field || e.fullField
    };
  };
}
function Bl(e, t) {
  if (t) {
    for (var o in t)
      if (t.hasOwnProperty(o)) {
        var r = t[o];
        typeof r == "object" && typeof e[o] == "object" ? e[o] = $o({}, e[o], r) : e[o] = r;
      }
  }
  return e;
}
var xc = function(t, o, r, n, i, a) {
  t.required && (!r.hasOwnProperty(t.field) || it(o, a || t.type)) && n.push(Tt(i.messages.required, t.fullField));
}, p1 = function(t, o, r, n, i) {
  (/^\s+$/.test(o) || o === "") && n.push(Tt(i.messages.whitespace, t.fullField));
}, Jr, v1 = function() {
  if (Jr)
    return Jr;
  var e = "[a-fA-F\\d:]", t = function(w) {
    return w && w.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + o + "$)|(?:^" + n + "$)"), a = new RegExp("^" + o + "$"), l = new RegExp("^" + n + "$"), s = function(w) {
    return w && w.exact ? i : new RegExp("(?:" + t(w) + o + t(w) + ")|(?:" + t(w) + n + t(w) + ")", "g");
  };
  s.v4 = function(E) {
    return E && E.exact ? a : new RegExp("" + t(E) + o + t(E), "g");
  }, s.v6 = function(E) {
    return E && E.exact ? l : new RegExp("" + t(E) + n + t(E), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", f = s.v4().source, p = s.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", u = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", b = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", x = "(?::\\d{2,5})?", h = '(?:[/?#][^\\s"]*)?', S = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + f + "|" + p + "|" + v + u + b + ")" + x + h;
  return Jr = new RegExp("(?:^" + S + "$)", "i"), Jr;
}, Dl = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, ur = {
  integer: function(t) {
    return ur.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return ur.number(t) && !ur.integer(t);
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
    return typeof t == "object" && !ur.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Dl.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(v1());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Dl.hex);
  }
}, g1 = function(t, o, r, n, i) {
  if (t.required && o === void 0) {
    xc(t, o, r, n, i);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = t.type;
  a.indexOf(l) > -1 ? ur[l](o) || n.push(Tt(i.messages.types[l], t.fullField, t.type)) : l && typeof o !== t.type && n.push(Tt(i.messages.types[l], t.fullField, t.type));
}, m1 = function(t, o, r, n, i) {
  var a = typeof t.len == "number", l = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = o, f = null, p = typeof o == "number", v = typeof o == "string", u = Array.isArray(o);
  if (p ? f = "number" : v ? f = "string" : u && (f = "array"), !f)
    return !1;
  u && (c = o.length), v && (c = o.replace(d, "_").length), a ? c !== t.len && n.push(Tt(i.messages[f].len, t.fullField, t.len)) : l && !s && c < t.min ? n.push(Tt(i.messages[f].min, t.fullField, t.min)) : s && !l && c > t.max ? n.push(Tt(i.messages[f].max, t.fullField, t.max)) : l && s && (c < t.min || c > t.max) && n.push(Tt(i.messages[f].range, t.fullField, t.min, t.max));
}, jo = "enum", b1 = function(t, o, r, n, i) {
  t[jo] = Array.isArray(t[jo]) ? t[jo] : [], t[jo].indexOf(o) === -1 && n.push(Tt(i.messages[jo], t.fullField, t[jo].join(", ")));
}, x1 = function(t, o, r, n, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(o) || n.push(Tt(i.messages.pattern.mismatch, t.fullField, o, t.pattern));
    else if (typeof t.pattern == "string") {
      var a = new RegExp(t.pattern);
      a.test(o) || n.push(Tt(i.messages.pattern.mismatch, t.fullField, o, t.pattern));
    }
  }
}, Ie = {
  required: xc,
  whitespace: p1,
  type: g1,
  range: m1,
  enum: b1,
  pattern: x1
}, C1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o, "string") && !t.required)
      return r();
    Ie.required(t, o, n, a, i, "string"), it(o, "string") || (Ie.type(t, o, n, a, i), Ie.range(t, o, n, a, i), Ie.pattern(t, o, n, a, i), t.whitespace === !0 && Ie.whitespace(t, o, n, a, i));
  }
  r(a);
}, y1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), o !== void 0 && Ie.type(t, o, n, a, i);
  }
  r(a);
}, w1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (o === "" && (o = void 0), it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), o !== void 0 && (Ie.type(t, o, n, a, i), Ie.range(t, o, n, a, i));
  }
  r(a);
}, S1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), o !== void 0 && Ie.type(t, o, n, a, i);
  }
  r(a);
}, P1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), it(o) || Ie.type(t, o, n, a, i);
  }
  r(a);
}, $1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), o !== void 0 && (Ie.type(t, o, n, a, i), Ie.range(t, o, n, a, i));
  }
  r(a);
}, k1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), o !== void 0 && (Ie.type(t, o, n, a, i), Ie.range(t, o, n, a, i));
  }
  r(a);
}, T1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (o == null && !t.required)
      return r();
    Ie.required(t, o, n, a, i, "array"), o != null && (Ie.type(t, o, n, a, i), Ie.range(t, o, n, a, i));
  }
  r(a);
}, z1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), o !== void 0 && Ie.type(t, o, n, a, i);
  }
  r(a);
}, _1 = "enum", I1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i), o !== void 0 && Ie[_1](t, o, n, a, i);
  }
  r(a);
}, M1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o, "string") && !t.required)
      return r();
    Ie.required(t, o, n, a, i), it(o, "string") || Ie.pattern(t, o, n, a, i);
  }
  r(a);
}, O1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o, "date") && !t.required)
      return r();
    if (Ie.required(t, o, n, a, i), !it(o, "date")) {
      var s;
      o instanceof Date ? s = o : s = new Date(o), Ie.type(t, s, n, a, i), s && Ie.range(t, s.getTime(), n, a, i);
    }
  }
  r(a);
}, R1 = function(t, o, r, n, i) {
  var a = [], l = Array.isArray(o) ? "array" : typeof o;
  Ie.required(t, o, n, a, i, l), r(a);
}, si = function(t, o, r, n, i) {
  var a = t.type, l = [], s = t.required || !t.required && n.hasOwnProperty(t.field);
  if (s) {
    if (it(o, a) && !t.required)
      return r();
    Ie.required(t, o, n, l, i, a), it(o, a) || Ie.type(t, o, n, l, i);
  }
  r(l);
}, E1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (it(o) && !t.required)
      return r();
    Ie.required(t, o, n, a, i);
  }
  r(a);
}, mr = {
  string: C1,
  method: y1,
  number: w1,
  boolean: S1,
  regexp: P1,
  integer: $1,
  float: k1,
  array: T1,
  object: z1,
  enum: I1,
  pattern: M1,
  date: O1,
  url: si,
  hex: si,
  email: si,
  required: R1,
  any: E1
};
function Ai() {
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
var Fi = Ai(), Fr = /* @__PURE__ */ function() {
  function e(o) {
    this.rules = null, this._messages = Fi, this.define(o);
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
    return r && (this._messages = Bl(Ai(), r)), this._messages;
  }, t.validate = function(r, n, i) {
    var a = this;
    n === void 0 && (n = {}), i === void 0 && (i = function() {
    });
    var l = r, s = n, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, l), Promise.resolve(l);
    function c(b) {
      var x = [], h = {};
      function S(w) {
        if (Array.isArray(w)) {
          var z;
          x = (z = x).concat.apply(z, w);
        } else
          x.push(w);
      }
      for (var E = 0; E < b.length; E++)
        S(b[E]);
      x.length ? (h = Di(x), d(x, h)) : d(null, l);
    }
    if (s.messages) {
      var f = this.messages();
      f === Fi && (f = Ai()), Bl(f, s.messages), s.messages = f;
    } else
      s.messages = this.messages();
    var p = {}, v = s.keys || Object.keys(this.rules);
    v.forEach(function(b) {
      var x = a.rules[b], h = l[b];
      x.forEach(function(S) {
        var E = S;
        typeof E.transform == "function" && (l === r && (l = $o({}, l)), h = l[b] = E.transform(h)), typeof E == "function" ? E = {
          validator: E
        } : E = $o({}, E), E.validator = a.getValidationMethod(E), E.validator && (E.field = b, E.fullField = E.fullField || b, E.type = a.getType(E), p[b] = p[b] || [], p[b].push({
          rule: E,
          value: h,
          source: l,
          field: b
        }));
      });
    });
    var u = {};
    return u1(p, s, function(b, x) {
      var h = b.rule, S = (h.type === "object" || h.type === "array") && (typeof h.fields == "object" || typeof h.defaultField == "object");
      S = S && (h.required || !h.required && b.value), h.field = b.field;
      function E(I, g) {
        return $o({}, g, {
          fullField: h.fullField + "." + I,
          fullFields: h.fullFields ? [].concat(h.fullFields, [I]) : [I]
        });
      }
      function w(I) {
        I === void 0 && (I = []);
        var g = Array.isArray(I) ? I : [I];
        !s.suppressWarning && g.length && e.warning("async-validator:", g), g.length && h.message !== void 0 && (g = [].concat(h.message));
        var P = g.map(El(h, l));
        if (s.first && P.length)
          return u[h.field] = 1, x(P);
        if (!S)
          x(P);
        else {
          if (h.required && !b.value)
            return h.message !== void 0 ? P = [].concat(h.message).map(El(h, l)) : s.error && (P = [s.error(h, Tt(s.messages.required, h.field))]), x(P);
          var k = {};
          h.defaultField && Object.keys(b.value).map(function(T) {
            k[T] = h.defaultField;
          }), k = $o({}, k, b.rule.fields);
          var $ = {};
          Object.keys(k).forEach(function(T) {
            var M = k[T], O = Array.isArray(M) ? M : [M];
            $[T] = O.map(E.bind(null, T));
          });
          var C = new e($);
          C.messages(s.messages), b.rule.options && (b.rule.options.messages = s.messages, b.rule.options.error = s.error), C.validate(b.value, b.rule.options || s, function(T) {
            var M = [];
            P && P.length && M.push.apply(M, P), T && T.length && M.push.apply(M, T), x(M.length ? M : null);
          });
        }
      }
      var z;
      if (h.asyncValidator)
        z = h.asyncValidator(h, b.value, w, b.source, s);
      else if (h.validator) {
        try {
          z = h.validator(h, b.value, w, b.source, s);
        } catch (I) {
          console.error == null || console.error(I), s.suppressValidatorError || setTimeout(function() {
            throw I;
          }, 0), w(I.message);
        }
        z === !0 ? w() : z === !1 ? w(typeof h.message == "function" ? h.message(h.fullField || h.field) : h.message || (h.fullField || h.field) + " fails") : z instanceof Array ? w(z) : z instanceof Error && w(z.message);
      }
      z && z.then && z.then(function() {
        return w();
      }, function(I) {
        return w(I);
      });
    }, function(b) {
      c(b);
    }, l);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !mr.hasOwnProperty(r.type))
      throw new Error(Tt("Unknown rule type %s", r.type));
    return r.type || "string";
  }, t.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var n = Object.keys(r), i = n.indexOf("message");
    return i !== -1 && n.splice(i, 1), n.length === 1 && n[0] === "required" ? mr.required : mr[this.getType(r)] || void 0;
  }, e;
}();
Fr.register = function(t, o) {
  if (typeof o != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  mr[t] = o;
};
Fr.warning = bc;
Fr.messages = Fi;
Fr.validators = mr;
function B1(e) {
  const t = Be(Rn, null);
  return {
    mergedSize: R(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function D1(e) {
  const t = Be(Rn, null), o = R(() => {
    const { labelPlacement: v } = e;
    return v !== void 0 ? v : t != null && t.props.labelPlacement ? t.props.labelPlacement : "top";
  }), r = R(() => o.value === "left" && (e.labelWidth === "auto" || (t == null ? void 0 : t.props.labelWidth) === "auto")), n = R(() => {
    if (o.value === "top")
      return;
    const { labelWidth: v } = e;
    if (v !== void 0 && v !== "auto")
      return Ko(v);
    if (r.value) {
      const u = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return u !== void 0 ? Ko(u) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return Ko(t.props.labelWidth);
  }), i = R(() => {
    const { labelAlign: v } = e;
    if (v)
      return v;
    if (t != null && t.props.labelAlign)
      return t.props.labelAlign;
  }), a = R(() => {
    var v;
    return [
      (v = e.labelProps) === null || v === void 0 ? void 0 : v.style,
      e.labelStyle,
      {
        width: n.value
      }
    ];
  }), l = R(() => {
    const { showRequireMark: v } = e;
    return v !== void 0 ? v : t == null ? void 0 : t.props.showRequireMark;
  }), s = R(() => {
    const { requireMarkPlacement: v } = e;
    return v !== void 0 ? v : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = L(!1), c = R(() => {
    const { validationStatus: v } = e;
    if (v !== void 0)
      return v;
    if (d.value)
      return "error";
  }), f = R(() => {
    const { showFeedback: v } = e;
    return v !== void 0 ? v : (t == null ? void 0 : t.props.showFeedback) !== void 0 ? t.props.showFeedback : !0;
  }), p = R(() => {
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
    mergedShowFeedback: f,
    mergedShowLabel: p,
    isAutoLabelWidth: r
  };
}
function A1(e) {
  const t = Be(Rn, null), o = R(() => {
    const { rulePath: a } = e;
    if (a !== void 0)
      return a;
    const { path: l } = e;
    if (l !== void 0)
      return l;
  }), r = R(() => {
    const a = [], { rule: l } = e;
    if (l !== void 0 && (Array.isArray(l) ? a.push(...l) : a.push(l)), t) {
      const { rules: s } = t.props, { value: d } = o;
      if (s !== void 0 && d !== void 0) {
        const c = sa(s, d);
        c !== void 0 && (Array.isArray(c) ? a.push(...c) : a.push(c));
      }
    }
    return a;
  }), n = R(() => r.value.some((a) => a.required)), i = R(() => n.value || e.required);
  return {
    mergedRules: r,
    mergedRequired: i
  };
}
const {
  cubicBezierEaseInOut: Al
} = ho;
function F1({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: o = ".3s",
  leaveDuration: r = ".3s",
  enterCubicBezier: n = Al,
  leaveCubicBezier: i = Al
} = {}) {
  return [W(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${t})`
  }), W(`&.${e}-transition-enter-to, &.${e}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), W(`&.${e}-transition-leave-active`, {
    transition: `opacity ${r} ${i}, transform ${r} ${i}`
  }), W(`&.${e}-transition-enter-active`, {
    transition: `opacity ${o} ${n}, transform ${o} ${n}`
  })];
}
const H1 = B("form-item", `
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
 `), J("auto-label-width", [B("form-item-label", "white-space: nowrap;")]), J("left-labelled", `
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
 `, [J("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), J("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), J("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), J("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), A("text", `
 grid-area: text; 
 `), A("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), J("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [J("no-label", `
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
 `, [W("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), B("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [J("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), J("error", {
  color: "var(--n-feedback-text-color-error)"
}), F1({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]);
var Fl = globalThis && globalThis.__awaiter || function(e, t, o, r) {
  function n(i) {
    return i instanceof o ? i : new o(function(a) {
      a(i);
    });
  }
  return new (o || (o = Promise))(function(i, a) {
    function l(c) {
      try {
        d(r.next(c));
      } catch (f) {
        a(f);
      }
    }
    function s(c) {
      try {
        d(r.throw(c));
      } catch (f) {
        a(f);
      }
    }
    function d(c) {
      c.done ? i(c.value) : n(c.value).then(l, s);
    }
    d((r = r.apply(e, t || [])).next());
  });
};
const L1 = Object.assign(Object.assign({}, Me.props), { label: String, labelWidth: [Number, String], labelStyle: [String, Object], labelAlign: String, labelPlacement: String, path: String, first: Boolean, rulePath: String, required: Boolean, showRequireMark: {
  type: Boolean,
  default: void 0
}, requireMarkPlacement: String, showFeedback: {
  type: Boolean,
  default: void 0
}, rule: [Object, Array], size: String, ignorePathChange: Boolean, validationStatus: String, feedback: String, showLabel: {
  type: Boolean,
  default: void 0
}, labelProps: Object });
function Hl(e, t) {
  return (...o) => {
    try {
      const r = e(...o);
      return !t && (typeof r == "boolean" || r instanceof Error || Array.isArray(r)) || // Error[]
      r != null && r.then ? r : (r === void 0 || wr("form-item/validate", `You return a ${typeof r} typed value in the validator method, which is not recommended. Please use ` + (t ? "`Promise`" : "`boolean`, `Error` or `Promise`") + " typed value instead."), !0);
    } catch (r) {
      wr("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(r);
      return;
    }
  };
}
const ga = xe({
  name: "FormItem",
  props: L1,
  setup(e) {
    If(r1, "formItems", $e(e, "path"));
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = xt(e), r = Be(Rn, null), n = B1(e), i = D1(e), { validationErrored: a } = i, { mergedRequired: l, mergedRules: s } = A1(e), { mergedSize: d } = n, { mergedLabelPlacement: c, mergedLabelAlign: f, mergedRequireMarkPlacement: p } = i, v = L([]), u = L(cn()), b = r ? $e(r.props, "disabled") : L(!1), x = Me("Form", "-form-item", H1, e1, e, t);
    Ae($e(e, "path"), () => {
      e.ignorePathChange || h();
    });
    function h() {
      v.value = [], a.value = !1, e.feedback && (u.value = cn());
    }
    function S() {
      g("blur");
    }
    function E() {
      g("change");
    }
    function w() {
      g("focus");
    }
    function z() {
      g("input");
    }
    function I(M, O) {
      return Fl(this, void 0, void 0, function* () {
        let G, Y, V, ne;
        return typeof M == "string" ? (G = M, Y = O) : M !== null && typeof M == "object" && (G = M.trigger, Y = M.callback, V = M.shouldRuleBeApplied, ne = M.options), yield new Promise((H, U) => {
          g(G, V, ne).then(({ valid: de, errors: Se }) => {
            de ? (Y && Y(), H()) : (Y && Y(Se), U(Se));
          });
        });
      });
    }
    const g = (M = null, O = () => !0, G = {
      suppressWarning: !0
    }) => Fl(this, void 0, void 0, function* () {
      const { path: Y } = e;
      G ? G.first || (G.first = e.first) : G = {};
      const { value: V } = s, ne = r ? sa(r.props.model, Y || "") : void 0, H = {}, U = {}, de = (M ? V.filter((ke) => Array.isArray(ke.trigger) ? ke.trigger.includes(M) : ke.trigger === M) : V).filter(O).map((ke, ue) => {
        const me = Object.assign({}, ke);
        if (me.validator && (me.validator = Hl(me.validator, !1)), me.asyncValidator && (me.asyncValidator = Hl(me.asyncValidator, !0)), me.renderMessage) {
          const Te = `__renderMessage__${ue}`;
          U[Te] = me.message, me.message = Te, H[Te] = me.renderMessage;
        }
        return me;
      });
      if (!de.length)
        return {
          valid: !0
        };
      const Se = Y ?? "__n_no_path__", _e = new Fr({ [Se]: de }), { validateMessages: Ee } = (r == null ? void 0 : r.props) || {};
      return Ee && _e.messages(Ee), yield new Promise((ke) => {
        _e.validate({ [Se]: ne }, G, (ue) => {
          ue != null && ue.length ? (v.value = ue.map((me) => {
            const Te = (me == null ? void 0 : me.message) || "";
            return {
              key: Te,
              render: () => Te.startsWith("__renderMessage__") ? H[Te]() : Te
            };
          }), ue.forEach((me) => {
            var Te;
            !((Te = me.message) === null || Te === void 0) && Te.startsWith("__renderMessage__") && (me.message = U[me.message]);
          }), a.value = !0, ke({
            valid: !1,
            errors: ue
          })) : (h(), ke({
            valid: !0
          }));
        });
      });
    });
    _t(Si, {
      path: $e(e, "path"),
      disabled: b,
      mergedSize: n.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: h,
      handleContentBlur: S,
      handleContentChange: E,
      handleContentFocus: w,
      handleContentInput: z
    });
    const P = {
      validate: I,
      restoreValidation: h,
      internalValidate: g
    }, k = L(null);
    wt(() => {
      if (!i.isAutoLabelWidth.value)
        return;
      const M = k.value;
      if (M !== null) {
        const O = M.style.whiteSpace;
        M.style.whiteSpace = "nowrap", M.style.width = "", r == null || r.deriveMaxChildLabelWidth(Number(getComputedStyle(M).width.slice(0, -2))), M.style.whiteSpace = O;
      }
    });
    const $ = R(() => {
      var M;
      const { value: O } = d, { value: G } = c, Y = G === "top" ? "vertical" : "horizontal", { common: { cubicBezierEaseInOut: V }, self: { labelTextColor: ne, asteriskColor: H, lineHeight: U, feedbackTextColor: de, feedbackTextColorWarning: Se, feedbackTextColorError: _e, feedbackPadding: Ee, labelFontWeight: ke, [oe("labelHeight", O)]: ue, [oe("blankHeight", O)]: me, [oe("feedbackFontSize", O)]: Te, [oe("feedbackHeight", O)]: ae, [oe("labelPadding", Y)]: je, [oe("labelTextAlign", Y)]: Fe, [oe(oe("labelFontSize", G), O)]: Ve } } = x.value;
      let Ge = (M = f.value) !== null && M !== void 0 ? M : Fe;
      return G === "top" && (Ge = Ge === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": V,
        "--n-line-height": U,
        "--n-blank-height": me,
        "--n-label-font-size": Ve,
        "--n-label-text-align": Ge,
        "--n-label-height": ue,
        "--n-label-padding": je,
        "--n-label-font-weight": ke,
        "--n-asterisk-color": H,
        "--n-label-text-color": ne,
        "--n-feedback-padding": Ee,
        "--n-feedback-font-size": Te,
        "--n-feedback-height": ae,
        "--n-feedback-text-color": de,
        "--n-feedback-text-color-warning": Se,
        "--n-feedback-text-color-error": _e
      };
    }), C = o ? bt("form-item", R(() => {
      var M;
      return `${d.value[0]}${c.value[0]}${((M = f.value) === null || M === void 0 ? void 0 : M[0]) || ""}`;
    }), $, e) : void 0, T = R(() => c.value === "left" && p.value === "left" && f.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({ labelElementRef: k, mergedClsPrefix: t, mergedRequired: l, feedbackId: u, renderExplains: v, reverseColSpace: T }, i), n), P), { cssVars: o ? void 0 : $, themeClass: C == null ? void 0 : C.themeClass, onRender: C == null ? void 0 : C.onRender });
  },
  render() {
    const { $slots: e, mergedClsPrefix: t, mergedShowLabel: o, mergedShowRequireMark: r, mergedRequireMarkPlacement: n, onRender: i } = this, a = r !== void 0 ? r : this.mergedRequired;
    i == null || i();
    const l = () => {
      const s = this.$slots.label ? this.$slots.label() : this.label;
      if (!s)
        return null;
      const d = m("span", { class: `${t}-form-item-label__text` }, s), c = a ? m("span", { class: `${t}-form-item-label__asterisk` }, n !== "left" ? " *" : "* ") : n === "right-hanging" && m("span", { class: `${t}-form-item-label__asterisk-placeholder` }, " *"), { labelProps: f } = this;
      return m("label", Object.assign({}, f, { class: [
        f == null ? void 0 : f.class,
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
        m(Xt, { name: "fade-down-transition", mode: "out-in" }, {
          default: () => {
            const { mergedValidationStatus: s } = this;
            return mt(e.feedback, (d) => {
              var c;
              const { feedback: f } = this, p = d || f ? m("div", { key: "__feedback__", class: `${t}-form-item-feedback__line` }, d || f) : this.renderExplains.length ? (c = this.renderExplains) === null || c === void 0 ? void 0 : c.map(({ key: v, render: u }) => m("div", { key: v, class: `${t}-form-item-feedback__line` }, u())) : null;
              return p ? s === "warning" ? m("div", { key: "controlled-warning", class: `${t}-form-item-feedback ${t}-form-item-feedback--warning` }, p) : s === "error" ? m("div", { key: "controlled-error", class: `${t}-form-item-feedback ${t}-form-item-feedback--error` }, p) : s === "success" ? m("div", { key: "controlled-success", class: `${t}-form-item-feedback ${t}-form-item-feedback--success` }, p) : m("div", { key: "controlled-default", class: `${t}-form-item-feedback` }, p) : null;
            });
          }
        })
      ) : null
    );
  }
}), W1 = {
  name: "GradientText",
  common: ee,
  self(e) {
    const { primaryColor: t, successColor: o, warningColor: r, errorColor: n, infoColor: i, primaryColorSuppl: a, successColorSuppl: l, warningColorSuppl: s, errorColorSuppl: d, infoColorSuppl: c, fontWeightStrong: f } = e;
    return {
      fontWeight: f,
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
}, N1 = W1, j1 = (e) => {
  const { primaryColor: t, baseColor: o } = e;
  return {
    color: t,
    iconColor: o
  };
}, V1 = {
  name: "IconWrapper",
  common: ee,
  self: j1
}, U1 = V1, q1 = {
  closeMargin: "16px 12px",
  closeSize: "20px",
  closeIconSize: "16px",
  width: "365px",
  padding: "16px",
  titleFontSize: "16px",
  metaFontSize: "12px",
  descriptionFontSize: "12px"
}, G1 = (e) => {
  const { textColor2: t, successColor: o, infoColor: r, warningColor: n, errorColor: i, popoverColor: a, closeIconColor: l, closeIconColorHover: s, closeIconColorPressed: d, closeColorHover: c, closeColorPressed: f, textColor1: p, textColor3: v, borderRadius: u, fontWeightStrong: b, boxShadow2: x, lineHeight: h, fontSize: S } = e;
  return Object.assign(Object.assign({}, q1), {
    borderRadius: u,
    lineHeight: h,
    fontSize: S,
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
    closeBorderRadius: u,
    closeColorHover: c,
    closeColorPressed: f,
    headerTextColor: p,
    descriptionTextColor: v,
    actionTextColor: t,
    boxShadow: x
  });
}, K1 = {
  name: "Notification",
  common: ee,
  peers: {
    Scrollbar: St
  },
  self: G1
}, Y1 = K1, X1 = {
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
}, Z1 = (e) => {
  const { textColor2: t, closeIconColor: o, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: a, errorColor: l, warningColor: s, popoverColor: d, boxShadow2: c, primaryColor: f, lineHeight: p, borderRadius: v, closeColorHover: u, closeColorPressed: b } = e;
  return Object.assign(Object.assign({}, X1), {
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
    iconColorLoading: f,
    closeColorHover: u,
    closeColorPressed: b,
    closeIconColor: o,
    closeIconColorHover: r,
    closeIconColorPressed: n,
    closeColorHoverInfo: u,
    closeColorPressedInfo: b,
    closeIconColorInfo: o,
    closeIconColorHoverInfo: r,
    closeIconColorPressedInfo: n,
    closeColorHoverSuccess: u,
    closeColorPressedSuccess: b,
    closeIconColorSuccess: o,
    closeIconColorHoverSuccess: r,
    closeIconColorPressedSuccess: n,
    closeColorHoverError: u,
    closeColorPressedError: b,
    closeIconColorError: o,
    closeIconColorHoverError: r,
    closeIconColorPressedError: n,
    closeColorHoverWarning: u,
    closeColorPressedWarning: b,
    closeIconColorWarning: o,
    closeIconColorHoverWarning: r,
    closeIconColorPressedWarning: n,
    closeColorHoverLoading: u,
    closeColorPressedLoading: b,
    closeIconColorLoading: o,
    closeIconColorHoverLoading: r,
    closeIconColorPressedLoading: n,
    loadingColor: f,
    lineHeight: p,
    borderRadius: v
  });
}, J1 = {
  name: "Message",
  common: ee,
  self: Z1
}, Q1 = J1, eS = {
  name: "ButtonGroup",
  common: ee
}, tS = eS, oS = {
  name: "InputNumber",
  common: ee,
  peers: {
    Button: Pt,
    Input: Bt
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
  common: pt,
  peers: {
    Button: Jd,
    Input: Kd
  },
  self: nS
}, aS = iS, lS = {
  name: "Layout",
  common: ee,
  peers: {
    Scrollbar: St
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
      siderToggleBarColor: fe(o, a),
      siderToggleBarColorHover: fe(o, l),
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
    colorHoverModal: fe(r, s),
    colorPopover: n,
    colorHoverPopover: fe(n, s),
    borderColor: i,
    borderColorModal: fe(r, i),
    borderColorPopover: fe(n, i),
    borderRadius: a,
    fontSize: l
  };
}, cS = {
  name: "List",
  common: ee,
  self: dS
}, uS = cS, fS = {
  name: "LoadingBar",
  common: ee,
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
  common: ee,
  peers: {
    Scrollbar: St,
    Code: oc
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
  common: ee,
  peers: {
    InternalSelectMenu: Ar,
    Input: Bt
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
    itemColorActive: K(r, { alpha: 0.1 }),
    itemColorActiveHover: K(r, { alpha: 0.1 }),
    itemColorActiveCollapsed: K(r, { alpha: 0.1 }),
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
  common: ee,
  peers: {
    Tooltip: On,
    Dropdown: va
  },
  self(e) {
    const { primaryColor: t, primaryColorSuppl: o } = e, r = xS(e);
    return r.itemColorActive = K(t, { alpha: 0.15 }), r.itemColorActiveHover = K(t, { alpha: 0.15 }), r.itemColorActiveCollapsed = K(t, {
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
const PS = {
  name: "PageHeader",
  common: ee,
  self: SS
}, $S = {
  iconSize: "22px"
}, kS = (e) => {
  const { fontSize: t, warningColor: o } = e;
  return Object.assign(Object.assign({}, $S), { fontSize: t, iconColor: o });
}, TS = {
  name: "Popconfirm",
  common: ee,
  peers: {
    Button: Pt,
    Popover: Ao
  },
  self: kS
}, zS = TS, _S = (e) => {
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
}, IS = {
  name: "Progress",
  common: ee,
  self(e) {
    const t = _S(e);
    return t.textColorLineInner = "rgb(0, 0, 0)", t.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)", t;
  }
}, Cc = IS, MS = {
  name: "Rate",
  common: ee,
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
}, OS = MS, RS = {
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
}, ES = (e) => {
  const { textColor2: t, textColor1: o, errorColor: r, successColor: n, infoColor: i, warningColor: a, lineHeight: l, fontWeightStrong: s } = e;
  return Object.assign(Object.assign({}, RS), { lineHeight: l, titleFontWeight: s, titleTextColor: o, textColor: t, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: a });
}, BS = {
  name: "Result",
  common: ee,
  self: ES
}, DS = BS, yc = {
  railHeight: "4px",
  railWidthVertical: "4px",
  handleSize: "18px",
  dotHeight: "8px",
  dotWidth: "8px",
  dotBorderRadius: "4px"
}, AS = {
  name: "Slider",
  common: ee,
  self(e) {
    const t = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: o, modalColor: r, primaryColorSuppl: n, popoverColor: i, textColor2: a, cardColor: l, borderRadius: s, fontSize: d, opacityDisabled: c } = e;
    return Object.assign(Object.assign({}, yc), { fontSize: d, markFontSize: d, railColor: o, railColorHover: o, fillColor: n, fillColorHover: n, opacityDisabled: c, handleColor: "#FFF", dotColor: l, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: t, indicatorTextColor: a, indicatorBorderRadius: s, dotBorder: `2px solid ${o}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
  }
}, FS = AS, HS = (e) => {
  const t = "rgba(0, 0, 0, .85)", o = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: r, primaryColor: n, baseColor: i, cardColor: a, modalColor: l, popoverColor: s, borderRadius: d, fontSize: c, opacityDisabled: f } = e;
  return Object.assign(Object.assign({}, yc), { fontSize: c, markFontSize: c, railColor: r, railColorHover: r, fillColor: n, fillColorHover: n, opacityDisabled: f, handleColor: "#FFF", dotColor: a, dotColorModal: l, dotColorPopover: s, handleBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowHover: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowActive: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowFocus: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", indicatorColor: t, indicatorBoxShadow: o, indicatorTextColor: i, indicatorBorderRadius: d, dotBorder: `2px solid ${r}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
}, LS = {
  name: "Slider",
  common: pt,
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
  common: ee,
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
  common: ee,
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
  common: ee,
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
  common: ee,
  self(e) {
    const { primaryColorSuppl: t, opacityDisabled: o, borderRadius: r, primaryColor: n, textColor2: i, baseColor: a } = e, l = "rgba(255, 255, 255, .20)";
    return Object.assign(Object.assign({}, JS), { iconColor: a, textColor: i, loadingColor: t, opacityDisabled: o, railColor: l, railColorActive: t, buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", buttonColor: "#FFF", railBorderRadiusSmall: r, railBorderRadiusMedium: r, railBorderRadiusLarge: r, buttonBorderRadiusSmall: r, buttonBorderRadiusMedium: r, buttonBorderRadiusLarge: r, boxShadowFocus: `0 0 8px 0 ${K(n, { alpha: 0.3 })}` });
  }
}, e2 = QS, t2 = {
  thPaddingSmall: "6px",
  thPaddingMedium: "12px",
  thPaddingLarge: "12px",
  tdPaddingSmall: "6px",
  tdPaddingMedium: "12px",
  tdPaddingLarge: "12px"
}, o2 = (e) => {
  const { dividerColor: t, cardColor: o, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: a, textColor1: l, textColor2: s, borderRadius: d, fontWeightStrong: c, lineHeight: f, fontSizeSmall: p, fontSizeMedium: v, fontSizeLarge: u } = e;
  return Object.assign(Object.assign({}, t2), {
    fontSizeSmall: p,
    fontSizeMedium: v,
    fontSizeLarge: u,
    lineHeight: f,
    borderRadius: d,
    borderColor: fe(o, t),
    borderColorModal: fe(r, t),
    borderColorPopover: fe(n, t),
    tdColor: o,
    tdColorModal: r,
    tdColorPopover: n,
    tdColorStriped: fe(o, a),
    tdColorStripedModal: fe(r, a),
    tdColorStripedPopover: fe(n, a),
    thColor: fe(o, i),
    thColorModal: fe(r, i),
    thColorPopover: fe(n, i),
    thTextColor: l,
    tdTextColor: s,
    thFontWeight: c
  });
}, r2 = {
  name: "Table",
  common: ee,
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
  const { textColor2: t, primaryColor: o, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, tabColor: d, baseColor: c, dividerColor: f, fontWeight: p, textColor1: v, borderRadius: u, fontSize: b, fontWeightStrong: x } = e;
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
    closeBorderRadius: u,
    tabColor: d,
    tabColorSegment: c,
    tabBorderColor: f,
    tabFontWeightActive: p,
    tabFontWeight: p,
    tabBorderRadius: u,
    paneTextColor: t,
    fontWeightStrong: x
  });
}, l2 = {
  name: "Tabs",
  common: ee,
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
  common: ee,
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
  common: ee,
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
  common: ee,
  peers: {
    Checkbox: tr,
    Scrollbar: St,
    Input: Bt,
    Empty: Do,
    Button: Pt
  },
  self(e) {
    const { fontWeight: t, fontSizeLarge: o, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: a, borderRadius: l, inputColor: s, tableHeaderColor: d, textColor1: c, textColorDisabled: f, textColor2: p, textColor3: v, hoverColor: u, closeColorHover: b, closeColorPressed: x, closeIconColor: h, closeIconColorHover: S, closeIconColorPressed: E, dividerColor: w } = e;
    return Object.assign(Object.assign({}, v2), {
      itemHeightSmall: a,
      itemHeightMedium: a,
      itemHeightLarge: i,
      fontSizeSmall: n,
      fontSizeMedium: r,
      fontSizeLarge: o,
      borderRadius: l,
      dividerColor: w,
      borderColor: "#0000",
      listColor: s,
      headerColor: d,
      titleTextColor: c,
      titleTextColorDisabled: f,
      extraTextColor: v,
      extraTextColorDisabled: f,
      itemTextColor: p,
      itemTextColorDisabled: f,
      itemColorPending: u,
      titleFontWeight: t,
      closeColorHover: b,
      closeColorPressed: x,
      closeIconColor: h,
      closeIconColorHover: S,
      closeIconColorPressed: E
    });
  }
}, m2 = g2, b2 = (e) => {
  const { borderRadiusSmall: t, hoverColor: o, pressedColor: r, primaryColor: n, textColor3: i, textColor2: a, textColorDisabled: l, fontSize: s } = e;
  return {
    fontSize: s,
    nodeBorderRadius: t,
    nodeColorHover: o,
    nodeColorPressed: r,
    nodeColorActive: K(n, { alpha: 0.1 }),
    arrowColor: i,
    nodeTextColor: a,
    nodeTextColorDisabled: l,
    loadingColor: n,
    dropMarkColor: n
  };
}, x2 = {
  name: "Tree",
  common: ee,
  peers: {
    Checkbox: tr,
    Scrollbar: St,
    Empty: Do
  },
  self(e) {
    const { primaryColor: t } = e, o = b2(e);
    return o.nodeColorActive = K(t, { alpha: 0.15 }), o;
  }
}, wc = x2, C2 = {
  name: "TreeSelect",
  common: ee,
  peers: {
    Tree: wc,
    Empty: Do,
    InternalSelection: pa
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
}, Sc = (e) => {
  const { primaryColor: t, textColor2: o, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: a, dividerColor: l, fontWeightStrong: s, textColor1: d, textColor3: c, infoColor: f, warningColor: p, errorColor: v, successColor: u, codeColor: b } = e;
  return Object.assign(Object.assign({}, w2), { aTextColor: t, blockquoteTextColor: o, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: a, liTextColor: o, liLineHeight: n, liFontSize: i, hrColor: l, headerFontWeight: s, headerTextColor: d, pTextColor: o, pTextColor1Depth: d, pTextColor2Depth: o, pTextColor3Depth: c, pLineHeight: n, pFontSize: i, headerBarColor: t, headerBarColorPrimary: t, headerBarColorInfo: f, headerBarColorError: v, headerBarColorWarning: p, headerBarColorSuccess: u, textColor: o, textColor1Depth: d, textColor2Depth: o, textColor3Depth: c, textColorPrimary: t, textColorInfo: f, textColorSuccess: u, textColorWarning: p, textColorError: v, codeTextColor: o, codeColor: b, codeBorder: "1px solid #0000" });
}, S2 = {
  name: "Typography",
  common: pt,
  self: Sc
}, P2 = S2, $2 = {
  name: "Typography",
  common: ee,
  self: Sc
}, k2 = $2, T2 = (e) => {
  const { iconColor: t, primaryColor: o, errorColor: r, textColor2: n, successColor: i, opacityDisabled: a, actionColor: l, borderColor: s, hoverColor: d, lineHeight: c, borderRadius: f, fontSize: p } = e;
  return {
    fontSize: p,
    lineHeight: c,
    borderRadius: f,
    draggerColor: l,
    draggerBorder: `1px dashed ${s}`,
    draggerBorderHover: `1px dashed ${o}`,
    itemColorHover: d,
    itemColorHoverError: K(r, {
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
  common: ee,
  peers: {
    Button: Pt,
    Progress: Cc
  },
  self(e) {
    const { errorColor: t } = e, o = T2(e);
    return o.itemColorHoverError = K(t, {
      alpha: 0.09
    }), o;
  }
}, _2 = z2, I2 = {
  name: "Watermark",
  common: ee,
  self(e) {
    const { fontFamily: t } = e;
    return {
      fontFamily: t
    };
  }
}, M2 = I2, O2 = {
  name: "Row",
  common: ee
}, R2 = O2, E2 = {
  name: "Image",
  common: ee,
  peers: {
    Tooltip: On
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
function di(e) {
  return e == null ? !0 : !Number.isNaN(e);
}
function Ll(e, t) {
  return e == null ? "" : t === void 0 ? String(e) : e.toFixed(t);
}
function ci(e) {
  if (e === null)
    return null;
  if (typeof e == "number")
    return e;
  {
    const t = Number(e);
    return Number.isNaN(t) ? null : t;
  }
}
const A2 = W([B("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), B("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]), Wl = 800, Nl = 100, F2 = Object.assign(Object.assign({}, Me.props), {
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
}), ma = xe({
  name: "InputNumber",
  props: F2,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onChange !== void 0 && kt("input-number", "`on-change` is deprecated, please use `on-update:value` instead");
    });
    const { mergedBorderedRef: t, mergedClsPrefixRef: o, mergedRtlRef: r } = xt(e), n = Me("InputNumber", "-input-number", A2, aS, e, o), { localeRef: i } = In("InputNumber"), a = Mo(e), { mergedSizeRef: l, mergedDisabledRef: s, mergedStatusRef: d } = a, c = L(null), f = L(null), p = L(null), v = L(e.defaultValue), u = $e(e, "value"), b = so(u, v), x = L(""), h = (X) => {
      const le = String(X).split(".")[1];
      return le ? le.length : 0;
    }, S = (X) => {
      const le = [e.min, e.max, e.step, X].map((Ce) => Ce === void 0 ? 0 : h(Ce));
      return Math.max(...le);
    }, E = Xe(() => {
      const { placeholder: X } = e;
      return X !== void 0 ? X : i.value.placeholder;
    }), w = Xe(() => {
      const X = ci(e.step);
      return X !== null ? X === 0 ? 1 : Math.abs(X) : 1;
    }), z = Xe(() => {
      const X = ci(e.min);
      return X !== null ? X : null;
    }), I = Xe(() => {
      const X = ci(e.max);
      return X !== null ? X : null;
    }), g = (X) => {
      const { value: le } = b;
      if (X === le) {
        k();
        return;
      }
      const { "onUpdate:value": Ce, onUpdateValue: ie, onChange: N } = e, { nTriggerFormInput: Q, nTriggerFormChange: D } = a;
      N && he(N, X), ie && he(ie, X), Ce && he(Ce, X), v.value = X, Q(), D();
    }, P = ({ offset: X, doUpdateIfValid: le, fixPrecision: Ce, isInputing: ie }) => {
      const { value: N } = x;
      if (ie && D2(N))
        return !1;
      const Q = (e.parse || B2)(N);
      if (Q === null)
        return le && g(null), null;
      if (di(Q)) {
        const D = h(Q), { precision: q } = e;
        if (q !== void 0 && q < D && !Ce)
          return !1;
        let te = parseFloat((Q + X).toFixed(q ?? S(Q)));
        if (di(te)) {
          const { value: ye } = I, { value: ze } = z;
          if (ye !== null && te > ye) {
            if (!le || ie)
              return !1;
            te = ye;
          }
          if (ze !== null && te < ze) {
            if (!le || ie)
              return !1;
            te = ze;
          }
          return e.validator && !e.validator(te) ? !1 : (le && g(te), te);
        }
      }
      return !1;
    }, k = () => {
      const { value: X } = b;
      if (di(X)) {
        const { format: le, precision: Ce } = e;
        le ? x.value = le(X) : X === null || Ce === void 0 || // precision overflow
        h(X) > Ce ? x.value = Ll(X, void 0) : x.value = Ll(X, Ce);
      } else
        x.value = String(X);
    };
    k();
    const $ = Xe(() => P({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), C = Xe(() => {
      const { value: X } = b;
      if (e.validator && X === null)
        return !1;
      const { value: le } = w;
      return P({
        offset: -le,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    }), T = Xe(() => {
      const { value: X } = b;
      if (e.validator && X === null)
        return !1;
      const { value: le } = w;
      return P({
        offset: +le,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    });
    function M(X) {
      const { onFocus: le } = e, { nTriggerFormFocus: Ce } = a;
      le && he(le, X), Ce();
    }
    function O(X) {
      var le, Ce;
      if (X.target === ((le = c.value) === null || le === void 0 ? void 0 : le.wrapperElRef))
        return;
      const ie = P({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (ie !== !1) {
        const D = (Ce = c.value) === null || Ce === void 0 ? void 0 : Ce.inputElRef;
        D && (D.value = String(ie || "")), b.value === ie && k();
      } else
        k();
      const { onBlur: N } = e, { nTriggerFormBlur: Q } = a;
      N && he(N, X), Q(), zt(() => {
        k();
      });
    }
    function G(X) {
      const { onClear: le } = e;
      le && he(le, X);
    }
    function Y() {
      const { value: X } = T;
      if (!X) {
        me();
        return;
      }
      const { value: le } = b;
      if (le === null)
        e.validator || g(U());
      else {
        const { value: Ce } = w;
        P({
          offset: Ce,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    function V() {
      const { value: X } = C;
      if (!X) {
        ue();
        return;
      }
      const { value: le } = b;
      if (le === null)
        e.validator || g(U());
      else {
        const { value: Ce } = w;
        P({
          offset: -Ce,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    const ne = M, H = O;
    function U() {
      if (e.validator)
        return null;
      const { value: X } = z, { value: le } = I;
      return X !== null ? Math.max(0, X) : le !== null ? Math.min(0, le) : 0;
    }
    function de(X) {
      G(X), g(null);
    }
    function Se(X) {
      var le, Ce, ie;
      !((le = p.value) === null || le === void 0) && le.$el.contains(X.target) && X.preventDefault(), !((Ce = f.value) === null || Ce === void 0) && Ce.$el.contains(X.target) && X.preventDefault(), (ie = c.value) === null || ie === void 0 || ie.activate();
    }
    let _e = null, Ee = null, ke = null;
    function ue() {
      ke && (window.clearTimeout(ke), ke = null), _e && (window.clearInterval(_e), _e = null);
    }
    function me() {
      ae && (window.clearTimeout(ae), ae = null), Ee && (window.clearInterval(Ee), Ee = null);
    }
    function Te() {
      ue(), ke = window.setTimeout(() => {
        _e = window.setInterval(() => {
          V();
        }, Nl);
      }, Wl), Ke("mouseup", document, ue, {
        once: !0
      });
    }
    let ae = null;
    function je() {
      me(), ae = window.setTimeout(() => {
        Ee = window.setInterval(() => {
          Y();
        }, Nl);
      }, Wl), Ke("mouseup", document, me, {
        once: !0
      });
    }
    const Fe = () => {
      Ee || Y();
    }, Ve = () => {
      _e || V();
    };
    function Ge(X) {
      var le, Ce;
      if (X.key === "Enter") {
        if (X.target === ((le = c.value) === null || le === void 0 ? void 0 : le.wrapperElRef))
          return;
        P({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && ((Ce = c.value) === null || Ce === void 0 || Ce.deactivate());
      } else if (X.key === "ArrowUp") {
        if (!T.value || e.keyboard.ArrowUp === !1)
          return;
        X.preventDefault(), P({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && Y();
      } else if (X.key === "ArrowDown") {
        if (!C.value || e.keyboard.ArrowDown === !1)
          return;
        X.preventDefault(), P({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && V();
      }
    }
    function Ze(X) {
      x.value = X, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && P({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    Ae(b, () => {
      k();
    });
    const lt = {
      focus: () => {
        var X;
        return (X = c.value) === null || X === void 0 ? void 0 : X.focus();
      },
      blur: () => {
        var X;
        return (X = c.value) === null || X === void 0 ? void 0 : X.blur();
      }
    }, vt = Bo("InputNumber", r, o);
    return Object.assign(Object.assign({}, lt), {
      rtlEnabled: vt,
      inputInstRef: c,
      minusButtonInstRef: f,
      addButtonInstRef: p,
      mergedClsPrefix: o,
      mergedBordered: t,
      uncontrolledValue: v,
      mergedValue: b,
      mergedPlaceholder: E,
      displayedValueInvalid: $,
      mergedSize: l,
      mergedDisabled: s,
      displayedValue: x,
      addable: T,
      minusable: C,
      mergedStatus: d,
      handleFocus: ne,
      handleBlur: H,
      handleClear: de,
      handleMouseDown: Se,
      handleAddClick: Fe,
      handleMinusClick: Ve,
      handleAddMousedown: je,
      handleMinusMousedown: Te,
      handleKeyDown: Ge,
      handleUpdateDisplayedValue: Ze,
      // theme
      mergedTheme: n,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: R(() => {
        const { self: { iconColorDisabled: X } } = n.value, [le, Ce, ie, N] = Nt(X);
        return {
          textColorTextDisabled: `rgb(${le}, ${Ce}, ${ie})`,
          opacityDisabled: `${N}`
        };
      })
    });
  },
  render() {
    const { mergedClsPrefix: e, $slots: t } = this, o = () => m(Ml, { text: !0, disabled: !this.minusable || this.mergedDisabled || this.readonly, focusable: !1, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleMinusClick, onMousedown: this.handleMinusMousedown, ref: "minusButtonInstRef" }, {
      icon: () => Yt(t["minus-icon"], () => [
        m(Jt, { clsPrefix: e }, {
          default: () => m(M0, null)
        })
      ])
    }), r = () => m(Ml, { text: !0, disabled: !this.addable || this.mergedDisabled || this.readonly, focusable: !1, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleAddClick, onMousedown: this.handleAddMousedown, ref: "addButtonInstRef" }, {
      icon: () => Yt(t["add-icon"], () => [
        m(Jt, { clsPrefix: e }, {
          default: () => m($0, null)
        })
      ])
    });
    return m(
      "div",
      { class: [
        `${e}-input-number`,
        this.rtlEnabled && `${e}-input-number--rtl`
      ] },
      m(OC, { ref: "inputInstRef", autofocus: this.autofocus, status: this.mergedStatus, bordered: this.mergedBordered, loading: this.loading, value: this.displayedValue, onUpdateValue: this.handleUpdateDisplayedValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, builtinThemeOverrides: this.inputThemeOverrides, size: this.mergedSize, placeholder: this.mergedPlaceholder, disabled: this.mergedDisabled, readonly: this.readonly, textDecoration: this.displayedValueInvalid ? "line-through" : void 0, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onClear: this.handleClear, clearable: this.clearable, internalLoadingBeforeSuffix: !0 }, {
        prefix: () => {
          var n;
          return this.showButton && this.buttonPlacement === "both" ? [
            o(),
            mt(t.prefix, (i) => i ? m("span", { class: `${e}-input-number-prefix` }, i) : null)
          ] : (n = t.prefix) === null || n === void 0 ? void 0 : n.call(t);
        },
        suffix: () => {
          var n;
          return this.showButton ? [
            mt(t.suffix, (i) => i ? m("span", { class: `${e}-input-number-suffix` }, i) : null),
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
  common: ee,
  peers: {
    Checkbox: tr,
    Scrollbar: St,
    Input: Bt,
    Empty: Do,
    Button: Pt
  },
  self(e) {
    const { iconColorDisabled: t, iconColor: o, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: a, heightLarge: l, heightMedium: s, heightSmall: d, borderRadius: c, inputColor: f, tableHeaderColor: p, textColor1: v, textColorDisabled: u, textColor2: b, hoverColor: x } = e;
    return Object.assign(Object.assign({}, H2), {
      itemHeightSmall: d,
      itemHeightMedium: s,
      itemHeightLarge: l,
      fontSizeSmall: a,
      fontSizeMedium: i,
      fontSizeLarge: n,
      borderRadius: c,
      borderColor: "#0000",
      listColor: f,
      headerColor: p,
      titleTextColor: v,
      titleTextColorDisabled: u,
      extraTextColor: b,
      filterDividerColor: "#0000",
      itemTextColor: b,
      itemTextColorDisabled: u,
      itemColorPending: x,
      titleFontWeight: r,
      iconColor: o,
      iconColorDisabled: t
    });
  }
}, W2 = L2, N2 = {
  name: "Skeleton",
  common: ee,
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
function jl(e) {
  return window.TouchEvent && e instanceof window.TouchEvent;
}
function Vl() {
  const e = L(/* @__PURE__ */ new Map()), t = (o) => (r) => {
    e.value.set(o, r);
  };
  return vu(() => e.value.clear()), [e, t];
}
const j2 = W([B("slider", `
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `, [J("reverse", [B("slider-handles", [B("slider-handle-wrapper", `
 transform: translate(50%, -50%);
 `)]), B("slider-dots", [B("slider-dot", `
 transform: translateX(50%, -50%);
 `)]), J("vertical", [B("slider-handles", [B("slider-handle-wrapper", `
 transform: translate(-50%, -50%);
 `)]), B("slider-marks", [B("slider-mark", `
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]), B("slider-dots", [B("slider-dot", `
 transform: translateX(-50%) translateY(0);
 `)])])]), J("vertical", `
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
 `)]), J("with-mark", `
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
 `)])]), J("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `, [B("slider-handle", `
 cursor: not-allowed;
 `)]), J("with-mark", `
 width: 100%;
 margin: 8px 0 32px 0;
 `), W("&:hover", [B("slider-rail", {
  backgroundColor: "var(--n-rail-color-hover)"
}, [A("fill", {
  backgroundColor: "var(--n-fill-color-hover)"
})]), B("slider-handle", {
  boxShadow: "var(--n-handle-box-shadow-hover)"
})]), J("active", [B("slider-rail", {
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
 `, [W("&:hover", `
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]), W("&:focus", [B("slider-handle", `
 box-shadow: var(--n-handle-box-shadow-focus);
 `, [W("&:hover", `
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]), B("slider-dots", `
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `, [J("transition-disabled", [B("slider-dot", "transition: none;")]), B("slider-dot", `
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
 `, [J("active", "border: var(--n-dot-border-active);")])])]), B("slider-handle-indicator", `
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `, [wn()]), B("slider-handle-indicator", `
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `, [J("top", `
 margin-bottom: 12px;
 `), J("right", `
 margin-left: 12px;
 `), J("bottom", `
 margin-top: 12px;
 `), J("left", `
 margin-right: 12px;
 `), wn()]), Ps(B("slider", [B("slider-dot", "background-color: var(--n-dot-color-modal);")])), $s(B("slider", [B("slider-dot", "background-color: var(--n-dot-color-popover);")]))]), V2 = 0, U2 = Object.assign(Object.assign({}, Me.props), { to: Rt.propTo, defaultValue: {
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
}, vertical: Boolean, reverse: Boolean, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] }), q2 = xe({
  name: "Slider",
  props: U2,
  setup(e) {
    const { mergedClsPrefixRef: t, namespaceRef: o, inlineThemeDisabled: r } = xt(e), n = Me("Slider", "-slider", j2, WS, e, t), i = L(null), [a, l] = Vl(), [s, d] = Vl(), c = L(/* @__PURE__ */ new Set()), f = Mo(e), { mergedDisabledRef: p } = f, v = R(() => {
      const { step: D } = e;
      if (D <= 0 || D === "mark")
        return 0;
      const q = D.toString();
      let te = 0;
      return q.includes(".") && (te = q.length - q.indexOf(".") - 1), te;
    }), u = L(e.defaultValue), b = $e(e, "value"), x = so(b, u), h = R(() => {
      const { value: D } = x;
      return (e.range ? D : [D]).map(Se);
    }), S = R(() => h.value.length > 2), E = R(() => e.placement === void 0 ? e.vertical ? "right" : "top" : e.placement), w = R(() => {
      const { marks: D } = e;
      return D ? Object.keys(D).map(parseFloat) : null;
    }), z = L(-1), I = L(-1), g = L(-1), P = L(!1), k = L(!1), $ = R(() => {
      const { vertical: D, reverse: q } = e;
      return D ? q ? "top" : "bottom" : q ? "right" : "left";
    }), C = R(() => {
      if (S.value)
        return;
      const D = h.value, q = _e(e.range ? Math.min(...D) : e.min), te = _e(e.range ? Math.max(...D) : D[0]), { value: ye } = $;
      return e.vertical ? {
        [ye]: `${q}%`,
        height: `${te - q}%`
      } : {
        [ye]: `${q}%`,
        width: `${te - q}%`
      };
    }), T = R(() => {
      const D = [], { marks: q } = e;
      if (q) {
        const te = h.value.slice();
        te.sort((Le, We) => Le - We);
        const { value: ye } = $, { value: ze } = S, { range: He } = e, tt = ze ? () => !1 : (Le) => He ? Le >= te[0] && Le <= te[te.length - 1] : Le <= te[0];
        for (const Le of Object.keys(q)) {
          const We = Number(Le);
          D.push({
            active: tt(We),
            label: q[Le],
            style: {
              [ye]: `${_e(We)}%`
            }
          });
        }
      }
      return D;
    });
    function M(D, q) {
      const te = _e(D), { value: ye } = $;
      return {
        [ye]: `${te}%`,
        zIndex: q === z.value ? 1 : 0
      };
    }
    function O(D) {
      return e.showTooltip || g.value === D || z.value === D && P.value;
    }
    function G(D) {
      return P.value ? !(z.value === D && I.value === D) : !0;
    }
    function Y(D) {
      var q;
      ~D && (z.value = D, (q = a.value.get(D)) === null || q === void 0 || q.focus());
    }
    function V() {
      s.value.forEach((D, q) => {
        O(q) && D.syncPosition();
      });
    }
    function ne(D) {
      const { "onUpdate:value": q, onUpdateValue: te } = e, { nTriggerFormInput: ye, nTriggerFormChange: ze } = f;
      te && he(te, D), q && he(q, D), u.value = D, ye(), ze();
    }
    function H(D) {
      const { range: q } = e;
      if (q) {
        if (Array.isArray(D)) {
          const { value: te } = h;
          D.join() !== te.join() && ne(D);
        }
      } else
        Array.isArray(D) || h.value[0] !== D && ne(D);
    }
    function U(D, q) {
      if (e.range) {
        const te = h.value.slice();
        te.splice(q, 1, D), H(te);
      } else
        H(D);
    }
    function de(D, q, te) {
      const ye = te !== void 0;
      te || (te = D - q > 0 ? 1 : -1);
      const ze = w.value || [], { step: He } = e;
      if (He === "mark") {
        const We = ue(D, ze.concat(q), ye ? te : void 0);
        return We ? We.value : q;
      }
      if (He <= 0)
        return q;
      const { value: tt } = v;
      let Le;
      if (ye) {
        const We = Number((q / He).toFixed(tt)), dt = Math.floor(We), It = We > dt ? dt : dt - 1, st = We < dt ? dt : dt + 1;
        Le = ue(q, [
          Number((It * He).toFixed(tt)),
          Number((st * He).toFixed(tt)),
          ...ze
        ], te);
      } else {
        const We = ke(D);
        Le = ue(D, [...ze, We]);
      }
      return Le ? Se(Le.value) : q;
    }
    function Se(D) {
      return Math.min(e.max, Math.max(e.min, D));
    }
    function _e(D) {
      const { max: q, min: te } = e;
      return (D - te) / (q - te) * 100;
    }
    function Ee(D) {
      const { max: q, min: te } = e;
      return te + (q - te) * D;
    }
    function ke(D) {
      const { step: q, min: te } = e;
      if (q <= 0 || q === "mark")
        return D;
      const ye = Math.round((D - te) / q) * q + te;
      return Number(ye.toFixed(v.value));
    }
    function ue(D, q = w.value, te) {
      if (!(q != null && q.length))
        return null;
      let ye = null, ze = -1;
      for (; ++ze < q.length; ) {
        const He = q[ze] - D, tt = Math.abs(He);
        // find marks in the same direction
        (te === void 0 || He * te > 0) && (ye === null || tt < ye.distance) && (ye = {
          index: ze,
          distance: tt,
          value: q[ze]
        });
      }
      return ye;
    }
    function me(D) {
      const q = i.value;
      if (!q)
        return;
      const te = jl(D) ? D.touches[0] : D, ye = q.getBoundingClientRect();
      let ze;
      return e.vertical ? ze = (ye.bottom - te.clientY) / ye.height : ze = (te.clientX - ye.left) / ye.width, e.reverse && (ze = 1 - ze), Ee(ze);
    }
    function Te(D) {
      if (p.value || !e.keyboard)
        return;
      const { vertical: q, reverse: te } = e;
      switch (D.key) {
        case "ArrowUp":
          D.preventDefault(), ae(q && te ? -1 : 1);
          break;
        case "ArrowRight":
          D.preventDefault(), ae(!q && te ? -1 : 1);
          break;
        case "ArrowDown":
          D.preventDefault(), ae(q && te ? 1 : -1);
          break;
        case "ArrowLeft":
          D.preventDefault(), ae(!q && te ? 1 : -1);
          break;
      }
    }
    function ae(D) {
      const q = z.value;
      if (q === -1)
        return;
      const { step: te } = e, ye = h.value[q], ze = te <= 0 || te === "mark" ? ye : ye + te * D;
      U(
        // Avoid the number of value does not change when `step` is null
        de(ze, ye, D > 0 ? 1 : -1),
        q
      );
    }
    function je(D) {
      var q, te;
      if (p.value || !jl(D) && D.button !== V2)
        return;
      const ye = me(D);
      if (ye === void 0)
        return;
      const ze = h.value.slice(), He = e.range ? (te = (q = ue(ye, ze)) === null || q === void 0 ? void 0 : q.index) !== null && te !== void 0 ? te : -1 : 0;
      He !== -1 && (D.preventDefault(), Y(He), Fe(), U(de(ye, h.value[He]), He));
    }
    function Fe() {
      P.value || (P.value = !0, Ke("touchend", document, Ze), Ke("mouseup", document, Ze), Ke("touchmove", document, Ge), Ke("mousemove", document, Ge));
    }
    function Ve() {
      P.value && (P.value = !1, qe("touchend", document, Ze), qe("mouseup", document, Ze), qe("touchmove", document, Ge), qe("mousemove", document, Ge));
    }
    function Ge(D) {
      const { value: q } = z;
      if (!P.value || q === -1) {
        Ve();
        return;
      }
      const te = me(D);
      U(de(te, h.value[q]), q);
    }
    function Ze() {
      Ve();
    }
    function lt(D) {
      z.value = D, p.value || (g.value = D);
    }
    function vt(D) {
      z.value === D && (z.value = -1, Ve()), g.value === D && (g.value = -1);
    }
    function X(D) {
      g.value = D;
    }
    function le(D) {
      g.value === D && (g.value = -1);
    }
    Ae(z, (D, q) => void zt(() => I.value = q)), Ae(x, () => {
      if (e.marks) {
        if (k.value)
          return;
        k.value = !0, zt(() => {
          k.value = !1;
        });
      }
      zt(V);
    }), yt(() => {
      Ve();
    });
    const Ce = R(() => {
      const { self: { markFontSize: D, railColor: q, railColorHover: te, fillColor: ye, fillColorHover: ze, handleColor: He, opacityDisabled: tt, dotColor: Le, dotColorModal: We, handleBoxShadow: dt, handleBoxShadowHover: It, handleBoxShadowActive: st, handleBoxShadowFocus: gt, dotBorder: y, dotBoxShadow: F, railHeight: Z, railWidthVertical: se, handleSize: ce, dotHeight: ve, dotWidth: be, dotBorderRadius: Pe, fontSize: ot, dotBorderActive: $t, dotColorPopover: oo }, common: { cubicBezierEaseInOut: ro } } = n.value;
      return {
        "--n-bezier": ro,
        "--n-dot-border": y,
        "--n-dot-border-active": $t,
        "--n-dot-border-radius": Pe,
        "--n-dot-box-shadow": F,
        "--n-dot-color": Le,
        "--n-dot-color-modal": We,
        "--n-dot-color-popover": oo,
        "--n-dot-height": ve,
        "--n-dot-width": be,
        "--n-fill-color": ye,
        "--n-fill-color-hover": ze,
        "--n-font-size": ot,
        "--n-handle-box-shadow": dt,
        "--n-handle-box-shadow-active": st,
        "--n-handle-box-shadow-focus": gt,
        "--n-handle-box-shadow-hover": It,
        "--n-handle-color": He,
        "--n-handle-size": ce,
        "--n-opacity-disabled": tt,
        "--n-rail-color": q,
        "--n-rail-color-hover": te,
        "--n-rail-height": Z,
        "--n-rail-width-vertical": se,
        "--n-mark-font-size": D
      };
    }), ie = r ? bt("slider", void 0, Ce, e) : void 0, N = R(() => {
      const { self: { fontSize: D, indicatorColor: q, indicatorBoxShadow: te, indicatorTextColor: ye, indicatorBorderRadius: ze } } = n.value;
      return {
        "--n-font-size": D,
        "--n-indicator-border-radius": ze,
        "--n-indicator-box-shadow": te,
        "--n-indicator-color": q,
        "--n-indicator-text-color": ye
      };
    }), Q = r ? bt("slider-indicator", void 0, N, e) : void 0;
    return {
      mergedClsPrefix: t,
      namespace: o,
      uncontrolledValue: u,
      mergedValue: x,
      mergedDisabled: p,
      mergedPlacement: E,
      isMounted: Br(),
      adjustedTo: Rt(e),
      dotTransitionDisabled: k,
      markInfos: T,
      isShowTooltip: O,
      shouldKeepTooltipTransition: G,
      handleRailRef: i,
      setHandleRefs: l,
      setFollowerRefs: d,
      fillStyle: C,
      getHandleStyle: M,
      activeIndex: z,
      arrifiedValues: h,
      followerEnabledIndexSet: c,
      handleRailMouseDown: je,
      handleHandleFocus: lt,
      handleHandleBlur: vt,
      handleHandleMouseEnter: X,
      handleHandleMouseLeave: le,
      handleRailKeyDown: Te,
      indicatorCssVars: r ? void 0 : N,
      indicatorThemeClass: Q == null ? void 0 : Q.themeClass,
      indicatorOnRender: Q == null ? void 0 : Q.onRender,
      cssVars: r ? void 0 : Ce,
      themeClass: ie == null ? void 0 : ie.themeClass,
      onRender: ie == null ? void 0 : ie.onRender
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
          return m(qi, null, {
            default: () => [
              m(Gi, null, {
                default: () => m("div", { ref: this.setHandleRefs(i), class: `${t}-slider-handle-wrapper`, tabindex: this.mergedDisabled ? -1 : 0, style: this.getHandleStyle(n, i), onFocus: () => this.handleHandleFocus(i), onBlur: () => this.handleHandleBlur(i), onMouseenter: () => this.handleHandleMouseEnter(i), onMouseleave: () => this.handleHandleMouseLeave(i) }, Yt(this.$slots.thumb, () => [
                  m("div", { class: `${t}-slider-handle` })
                ]))
              }),
              this.tooltip && m(Yi, { ref: this.setFollowerRefs(i), show: a, to: this.adjustedTo, enabled: this.showTooltip && !this.range || this.followerEnabledIndexSet.has(i), teleportDisabled: this.adjustedTo === Rt.tdkey, placement: this.mergedPlacement, containerClass: this.namespace }, {
                default: () => m(Xt, { name: "fade-in-scale-up-transition", appear: this.isMounted, css: this.shouldKeepTooltipTransition(i), onEnter: () => {
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
`, [W("&:first-child", {
  marginTop: 0
}), J("prefix-bar", {
  position: "relative",
  paddingLeft: "var(--n-prefix-width)"
}, [J("align-text", {
  paddingLeft: 0
}, [W("&::before", {
  left: "calc(-1 * var(--n-prefix-width))"
})]), W("&::before", `
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `), W("&::before", {
  backgroundColor: "var(--n-bar-color)"
})])]), K2 = Object.assign(Object.assign({}, Me.props), { type: {
  type: String,
  default: "default"
}, prefix: String, alignText: Boolean }), or = (e) => xe({
  name: `H${e}`,
  props: K2,
  setup(t) {
    const { mergedClsPrefixRef: o, inlineThemeDisabled: r } = xt(t), n = Me("Typography", "-h", G2, P2, t, o), i = R(() => {
      const { type: l } = t, { common: { cubicBezierEaseInOut: s }, self: { headerFontWeight: d, headerTextColor: c, [oe("headerPrefixWidth", e)]: f, [oe("headerFontSize", e)]: p, [oe("headerMargin", e)]: v, [oe("headerBarWidth", e)]: u, [oe("headerBarColor", l)]: b } } = n.value;
      return {
        "--n-bezier": s,
        "--n-font-size": p,
        "--n-margin": v,
        "--n-bar-color": b,
        "--n-bar-width": u,
        "--n-font-weight": d,
        "--n-text-color": c,
        "--n-prefix-width": f
      };
    }), a = r ? bt(`h${e}`, R(() => t.type[0]), i, t) : void 0;
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
or("1");
or("2");
const Y2 = or("3");
or("4");
or("5");
or("6");
const X2 = () => ({}), Z2 = {
  name: "Equation",
  common: ee,
  self: X2
}, J2 = Z2, Pc = {
  name: "dark",
  common: ee,
  Alert: vC,
  Anchor: xC,
  AutoComplete: BC,
  Avatar: Xd,
  AvatarGroup: LC,
  BackTop: jC,
  Badge: UC,
  Breadcrumb: YC,
  Button: Pt,
  ButtonGroup: tS,
  Calendar: ay,
  Card: Qd,
  Carousel: vy,
  Cascader: wy,
  Checkbox: tr,
  Code: oc,
  Collapse: Oy,
  CollapseTransition: By,
  ColorPicker: dy,
  DataTable: lw,
  DatePicker: xw,
  Descriptions: Sw,
  Dialog: uc,
  Divider: Rw,
  Drawer: Fw,
  Dropdown: va,
  DynamicInput: Ww,
  DynamicTags: Yw,
  Element: Zw,
  Empty: Do,
  Ellipsis: sc,
  Equation: J2,
  Form: o1,
  GradientText: N1,
  Icon: fw,
  IconWrapper: U1,
  Image: E2,
  Input: Bt,
  InputNumber: rS,
  LegacyTransfer: W2,
  Layout: sS,
  List: uS,
  LoadingBar: hS,
  Log: vS,
  Menu: yS,
  Mention: mS,
  Message: Q1,
  Modal: _w,
  Notification: Y1,
  PageHeader: PS,
  Pagination: ac,
  Popconfirm: zS,
  Popover: Ao,
  Popselect: rc,
  Progress: Cc,
  Radio: dc,
  Rate: OS,
  Result: DS,
  Row: R2,
  Scrollbar: St,
  Select: ic,
  Skeleton: N2,
  Slider: FS,
  Space: vc,
  Spin: VS,
  Statistic: GS,
  Steps: ZS,
  Switch: e2,
  Table: n2,
  Tabs: s2,
  Tag: Wd,
  Thing: u2,
  TimePicker: cc,
  Timeline: p2,
  Tooltip: On,
  Transfer: m2,
  Tree: wc,
  TreeSelect: y2,
  Typography: k2,
  Upload: _2,
  Watermark: M2
}, Q2 = {
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
}, Ul = L(Pc), eP = L("Dark"), ql = {
  common: {
    bodyColor: "#23313f",
    cardColor: "#293949",
    railColor: "#555",
    primaryColorSuppl: "#fff"
  }
}, ba = hs("wx", {
  state: () => ({
    wx: Q2
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
}), tP = hs("theme", {
  state: () => ({
    theme: Pc
  }),
  actions: {
    setTheme(e) {
      Ul.value = e;
    },
    setThemeOverrides(e) {
      ql.common = e.common;
    }
  },
  getters: {
    getTheme() {
      return Ul.value;
    },
    getThemeOverrides() {
      return ql;
    },
    getSelectedTheme() {
      return eP.value;
    }
  }
}), IP = (e) => {
  R(() => ba()).value.setAll(e);
}, oP = xe({
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
  setup(e, { emit: t }) {
    const o = L(e.val);
    return Ae(
      () => e.val,
      (n) => {
        o.value = n;
      }
    ), {
      value: o,
      onInput: () => {
        t("update", o.value);
      }
    };
  },
  components: {
    NInputNumber: ma,
    NSlider: q2,
    NSpace: gc,
    NFormItem: ga
  },
  emits: ["update"]
}), En = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [r, n] of t)
    o[r] = n;
  return o;
};
function rP(e, t, o, r, n, i) {
  const a = nt("n-slider"), l = nt("n-input-number"), s = nt("n-form-item"), d = nt("n-space");
  return yo(), Jl(d, { vertical: "" }, {
    default: Re(() => [
      we(s, {
        label: e.labelText,
        "label-style": "color: white"
      }, {
        default: Re(() => [
          we(a, {
            value: e.value,
            "onUpdate:value": [
              t[0] || (t[0] = (c) => e.value = c),
              e.onInput
            ],
            step: 1,
            min: e.min,
            max: e.max,
            disabled: e.disabled,
            class: "mr-4 ml-0 w-52"
          }, null, 8, ["value", "min", "max", "disabled", "onUpdate:value"]),
          we(l, {
            value: e.value,
            "onUpdate:value": [
              t[1] || (t[1] = (c) => e.value = c),
              e.onInput
            ],
            step: 1,
            min: e.min,
            max: e.max,
            size: "small",
            class: "min-w-44 w-52",
            disabled: e.disabled
          }, {
            suffix: Re(() => [
              et(Ql(e.suffix), 1)
            ]),
            _: 1
          }, 8, ["value", "min", "max", "disabled", "onUpdate:value"])
        ]),
        _: 1
      }, 8, ["label"])
    ]),
    _: 1
  });
}
const nP = /* @__PURE__ */ En(oP, [["render", rP]]), iP = (e) => {
  const t = e / 25.4;
  return Number(t.toFixed(2));
}, aP = (e) => {
  const t = e * 25.4;
  return Number(t.toFixed(2));
}, Dt = (e) => Math.round(e / 3.28084), Vo = (e) => Math.round(e * 3.28084), lP = {
  setup() {
    const e = R(() => ba()), t = R({
      get: () => e.value.wx.clouds.preset || "Nothing",
      set: (C) => {
        e.value.wx.clouds.preset = C === "Nothing" ? void 0 : C;
      }
    }), o = R({
      get: () => Vo(e.value.wx.clouds.base),
      set: (C) => {
        e.value.wx.clouds.base = Dt(C);
      }
    }), r = (C) => {
      e.value.wx.clouds.base = Dt(C);
    }, n = R({
      get: () => Vo(e.value.wx.clouds.thickness || 0),
      set: (C) => {
        e.value.wx.clouds.thickness = Dt(C);
      }
    }), i = (C) => {
      e.value.wx.clouds.thickness = Dt(C);
    }, a = R({
      get: () => e.value.wx.clouds.density || 0,
      set: (C) => {
        e.value.wx.clouds.density = C;
      }
    }), l = R({
      get: () => e.value.wx.clouds.iprecptns || 0,
      set: (C) => {
        e.value.wx.clouds.iprecptns = C;
      }
    }), s = R({
      get: () => e.value.wx.enable_dust,
      set: (C) => {
        e.value.wx.enable_dust = C;
      }
    }), d = R({
      get: () => Vo(e.value.wx.dust_density),
      set: (C) => {
        e.value.wx.dust_density = Dt(C);
      }
    }), c = (C) => {
      e.value.wx.dust_density = Dt(C);
    }, f = R({
      get: () => e.value.wx.enable_fog,
      set: (C) => {
        e.value.wx.enable_fog = C;
      }
    }), p = R({
      get: () => Vo(e.value.wx.fog.thickness),
      set: (C) => {
        e.value.wx.fog.thickness = Dt(C);
      }
    }), v = (C) => {
      e.value.wx.fog.thickness = Dt(C);
    }, u = R({
      get: () => Vo(e.value.wx.fog.visibility),
      set: (C) => {
        e.value.wx.fog.visibility = Dt(C);
      }
    }), b = (C) => {
      e.value.wx.fog.visibility = Dt(C);
    }, x = R({
      get: () => Math.round(e.value.wx.season.temperature),
      set: (C) => {
        e.value.wx.season.temperature = Math.round(C);
      }
    }), h = R({
      get: () => iP(e.value.wx.qnh),
      set: (C) => {
        e.value.wx.qnh = aP(C);
      }
    }), S = R({
      get: () => {
        var C;
        return ((C = e.value.wx.halo) == null ? void 0 : C.preset) ?? "off";
      },
      set: (C) => {
        e.value.wx.halo && (e.value.wx.halo.preset = C);
      }
    }), E = R({
      get: () => {
        var C;
        return ((C = e.value.wx.halo) == null ? void 0 : C.crystalsPreset) ?? "AllKinds";
      },
      set: (C) => {
        e.value.wx.halo && (e.value.wx.halo.crystalsPreset = C);
      }
    }), w = L("Nothing"), z = L(0), I = L(0);
    function g(C) {
      let T = 0, M = 0, O = "Nothing";
      switch (C) {
        case "Nothing":
          T = 984, M = 16404, O = "Nothing";
          break;
        case "Preset1":
          T = 2756, M = 13780, O = "Few Scattered";
          break;
        case "Preset2":
          T = 4134, M = 8268, O = "Two Layers Few Scattered";
          break;
        case "Preset3":
          T = 2756, M = 8268, O = "Two Layers Scattered";
          break;
        case "Preset4":
          T = 4134, M = 8268, O = "Two Layers Scattered";
          break;
        case "Preset5":
          T = 4134, M = 15157, O = "Three Layers High Scattered";
          break;
        case "Preset6":
          T = 4134, M = 13780, O = "One Layer Scattered/Broken";
          break;
        case "Preset7":
          T = 5512, M = 16535, O = "Two Layers Scattered/Broken";
          break;
        case "Preset8":
          T = 12402, M = 17913, O = "Two High Layers Scattered/Broken";
          break;
        case "Preset9":
          T = 5512, M = 12402, O = "Two Layers Scattered/Broken";
          break;
        case "Preset10":
          T = 4134, M = 13780, O = "Two Layers Large Thick Clouds";
          break;
        case "Preset11":
          T = 8268, M = 17913, O = "Two Layers Large Clouds High Ceiling";
          break;
        case "Preset12":
          T = 5512, M = 11024, O = "Two Layers Scattered Large Clouds High Ceiling";
          break;
        case "Preset13":
          T = 5512, M = 11024, O = "Two Layers Broken";
          break;
        case "Preset14":
          T = 5512, M = 11024, O = "Broken Thick Low Layer with Few High Layer";
          break;
        case "Preset15":
          T = 2756, M = 16535, O = "Broken Layers Broken Large Clouds";
          break;
        case "Preset16":
          T = 4134, M = 13780, O = "Two Layers Broken Large Clouds";
          break;
        case "Preset17":
          T = 0, M = 8268, O = "Two Layers Broken/Overcast";
          break;
        case "Preset18":
          T = 0, M = 12402, O = "Three Layers Broken/Overcast";
          break;
        case "Preset19":
          T = 0, M = 12402, O = "Three Layers Overcast at Low Level";
          break;
        case "Preset20":
          T = 0, M = 12402, O = "Three Layers Overcast at Low Level";
          break;
        case "Preset21":
          T = 4134, M = 13780, O = "Overcast at Low Level";
          break;
        case "Preset22":
          T = 1378, M = 13780, O = "Overcast at Low Level";
          break;
        case "Preset23":
          T = 2756, M = 11024, O = "Three Layers Broken Low Level Scattered High Level";
          break;
        case "Preset24":
          T = 1378, M = 8268, O = "Three Layers Overcast";
          break;
        case "Preset25":
          T = 1378, M = 11024, O = "Three Layers Overcast";
          break;
        case "Preset26":
          T = 1378, M = 9646, O = "Three Layers Overcast";
          break;
        case "Preset27":
          T = 1378, M = 8268, O = "Three Layers Overcast";
          break;
        case "RainyPreset1":
          T = 1378, M = 9646, O = "Overcast with Rain";
          break;
        case "RainyPreset2":
          T = 2756, M = 8268, O = "Overcast with Rain";
          break;
        case "RainyPreset3":
          T = 2756, M = 8268, O = "Overcast with Rain";
          break;
      }
      return { min: T, max: M, ttip: O };
    }
    const { min: P, max: k, ttip: $ } = g(
      e.value.wx.clouds.preset === void 0 ? "Nothing" : e.value.wx.clouds.preset
    );
    return z.value = P, I.value = k, w.value = $, Ae(
      () => e.value.wx.clouds.preset ?? "Nothing",
      (C) => {
        const { min: T, max: M, ttip: O } = g(C);
        z.value = T, I.value = M, w.value = O;
      }
    ), {
      updateFogThickness: v,
      updateFogVisibility: b,
      updateDustSmokeVisibility: c,
      updateCloudBase: r,
      updateCloudThickness: i,
      cloud_preset: t,
      tooltip: w,
      cloud_base: o,
      isFogEnabled: f,
      isDustSmokeEnabled: s,
      fog_thickness: p,
      fog_visibility: u,
      dust_smoke_visibility: d,
      cloud_thickness: n,
      temp: x,
      pressure: h,
      halo_preset: S,
      cloud_density: a,
      precip: l,
      halo_crystal_preset: E,
      preset_min: z,
      preset_max: I,
      halo_options: [
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
      ],
      crystal_options: [
        { label: "AllKinds", value: "AllKinds" },
        { label: "BasicHaloCircle", value: "BasicHaloCircle" },
        { label: "BasicHaloWithSundogs", value: "BasicHaloWithSundogs" },
        { label: "BasicSundogsTangents", value: "BasicSundogsTangents" },
        { label: "SundogsArcs", value: "SundogsArcs" },
        { label: "Tangents", value: "Tangents" }
      ],
      cloud_options: [
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
      ],
      precip_options: [
        { label: "None", value: 0 },
        { label: "Rain", value: 1 }
      ]
    };
  },
  components: {
    SliderComponent: nP,
    NSpace: gc,
    NFormItem: ga,
    NInputNumber: ma,
    NSelect: Vy,
    NTooltip: dw,
    NCheckbox: zy,
    NDivider: hc
  }
}, sP = { class: "flex flex-row" }, dP = { key: 0 }, cP = { key: 0 }, uP = { key: 0 };
function fP(e, t, o, r, n, i) {
  const a = nt("n-input-number"), l = nt("n-form-item"), s = nt("n-divider"), d = nt("n-select"), c = nt("n-checkbox"), f = nt("SliderComponent"), p = nt("n-space"), v = nt("n-tooltip");
  return yo(), sr("div", sP, [
    we(p, {
      vertical: "",
      class: "mr-6 w-full"
    }, {
      default: Re(() => [
        we(l, {
          label: "Temperature",
          "label-style": "color: white"
        }, {
          default: Re(() => [
            we(a, {
              id: "temperature-input",
              min: 8.4,
              max: 50,
              value: r.temp,
              "onUpdate:value": t[0] || (t[0] = (u) => r.temp = u),
              class: "w-full min-w-24",
              size: "small"
            }, {
              suffix: Re(() => [
                et(" °C ")
              ]),
              _: 1
            }, 8, ["min", "value"])
          ]),
          _: 1
        }),
        we(s, { class: "divider" }),
        we(l, {
          label: "Pressure",
          "label-style": "color: white"
        }, {
          default: Re(() => [
            we(a, {
              id: "pressure-input",
              value: r.pressure,
              "onUpdate:value": t[1] || (t[1] = (u) => r.pressure = u),
              class: "w-full min-w-24",
              size: "small",
              step: 0.01,
              min: 28.35,
              max: 31.01,
              precision: 2
            }, {
              suffix: Re(() => [
                et(" inHg ")
              ]),
              _: 1
            }, 8, ["value", "step", "min", "max"])
          ]),
          _: 1
        }),
        we(s, { class: "divider" }),
        we(l, {
          label: "Ice Halo",
          "label-style": "color: white"
        }, {
          default: Re(() => [
            we(d, {
              class: "w-full",
              value: r.halo_preset,
              "onUpdate:value": t[2] || (t[2] = (u) => r.halo_preset = u),
              options: r.halo_options
            }, null, 8, ["value", "options"])
          ]),
          _: 1
        }),
        r.halo_preset !== "off" && r.halo_preset !== "auto" ? (yo(), sr("div", dP, [
          we(l, {
            label: "Halo Preset",
            "label-style": "color: white"
          }, {
            default: Re(() => [
              we(d, {
                class: "w-full",
                value: r.halo_crystal_preset,
                "onUpdate:value": t[3] || (t[3] = (u) => r.halo_crystal_preset = u),
                options: r.crystal_options
              }, null, 8, ["value", "options"])
            ]),
            _: 1
          })
        ])) : Ln("", !0),
        we(s, { class: "divider" }),
        we(c, {
          checked: r.isFogEnabled,
          "onUpdate:checked": t[4] || (t[4] = (u) => r.isFogEnabled = u)
        }, {
          default: Re(() => [
            et("Toggle Fog")
          ]),
          _: 1
        }, 8, ["checked"]),
        we(f, {
          labelText: "Fog Visibility",
          onUpdate: r.updateFogVisibility,
          val: r.fog_visibility,
          class: "mt-2 w-full",
          suffix: "ft",
          max: 19685,
          disabled: !r.isFogEnabled
        }, null, 8, ["onUpdate", "val", "disabled"]),
        we(f, {
          labelText: "Fog Thickness",
          onUpdate: r.updateFogThickness,
          val: r.fog_thickness,
          class: "w-full",
          suffix: "ft",
          max: 3281,
          disabled: !r.isFogEnabled
        }, null, 8, ["onUpdate", "val", "disabled"])
      ]),
      _: 1
    }),
    we(p, {
      vertical: "",
      class: "ml-8 w-full"
    }, {
      default: Re(() => [
        we(l, {
          label: "Cloud Preset",
          "label-style": "color: white"
        }, {
          default: Re(() => [
            we(v, {
              trigger: "hover",
              class: "w-full"
            }, {
              trigger: Re(() => [
                we(d, {
                  class: "w-full",
                  value: r.cloud_preset,
                  "onUpdate:value": t[5] || (t[5] = (u) => r.cloud_preset = u),
                  options: r.cloud_options
                }, null, 8, ["value", "options"])
              ]),
              default: Re(() => [
                et(" " + Ql(r.tooltip), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        we(s, { class: "divider" }),
        we(f, {
          labelText: "Cloud Base",
          onUpdate: r.updateCloudBase,
          val: r.cloud_base,
          min: r.preset_min,
          max: r.preset_max,
          suffix: "ft"
        }, null, 8, ["onUpdate", "val", "min", "max"]),
        r.cloud_preset === "Nothing" ? (yo(), sr("div", cP, [
          we(f, {
            labelText: "Fog Thickness",
            onUpdate: r.updateCloudThickness,
            val: r.fog_thickness,
            class: "w-full",
            suffix: "ft",
            max: 3281,
            disabled: !r.isFogEnabled
          }, null, 8, ["onUpdate", "val", "disabled"]),
          we(l, {
            label: "Density",
            "label-style": "color: white"
          }, {
            default: Re(() => [
              we(a, {
                id: "cloud-thickness-input",
                class: "w-full min-w-24",
                value: r.cloud_density,
                "onUpdate:value": t[6] || (t[6] = (u) => r.cloud_density = u),
                size: "small",
                min: 0,
                max: 10
              }, null, 8, ["value"])
            ]),
            _: 1
          }),
          r.cloud_density >= 5 ? (yo(), sr("div", uP, [
            we(l, {
              label: "Precipitation",
              "label-style": "color: white"
            }, {
              default: Re(() => [
                we(d, {
                  class: "w-full",
                  value: r.precip,
                  "onUpdate:value": t[7] || (t[7] = (u) => r.precip = u),
                  options: r.precip_options
                }, null, 8, ["value", "options"])
              ]),
              _: 1
            })
          ])) : Ln("", !0),
          we(s, { class: "divider" })
        ])) : Ln("", !0),
        we(c, {
          checked: r.isDustSmokeEnabled,
          "onUpdate:checked": t[8] || (t[8] = (u) => r.isDustSmokeEnabled = u)
        }, {
          default: Re(() => [
            et(" Toggle Dust/Smoke ")
          ]),
          _: 1
        }, 8, ["checked"]),
        we(f, {
          labelText: "Dust Smoke Visibility",
          onUpdate: r.updateDustSmokeVisibility,
          val: r.dust_smoke_visibility,
          suffix: "ft",
          class: "mt-2",
          min: 984,
          max: 9843,
          disabled: !r.isDustSmokeEnabled
        }, null, 8, ["onUpdate", "val", "disabled"])
      ]),
      _: 1
    })
  ]);
}
const hP = /* @__PURE__ */ En(lP, [["render", fP]]), pP = (e) => e === null ? "" : e > 359 ? "000" : e < 100 ? e.toString().padStart(3, "0") : e.toString(), vP = {
  components: {
    NFormItem: ga,
    NInputNumber: ma,
    NDivider: hc
  },
  setup() {
    const e = R(() => ba()), t = R({
      get: () => Vo(e.value.wx.groundTurbulence),
      set: (s) => {
        e.value.wx.groundTurbulence = Dt(s);
      }
    }), o = R({
      get: () => Math.round(e.value.wx.wind.atGround.speed),
      set: (s) => {
        e.value.wx.wind.atGround.speed = Math.round(s);
      }
    }), r = R({
      get: () => Math.round(e.value.wx.wind.atGround.dir),
      set: (s) => {
        e.value.wx.wind.atGround.dir = Math.round(s);
      }
    }), n = R({
      get: () => Math.round(e.value.wx.wind.at2000.speed),
      set: (s) => {
        e.value.wx.wind.at2000.speed = Math.round(s);
      }
    }), i = R({
      get: () => Math.round(e.value.wx.wind.at2000.dir),
      set: (s) => {
        e.value.wx.wind.at2000.dir = Math.round(s);
      }
    }), a = R({
      get: () => Math.round(e.value.wx.wind.at8000.speed),
      set: (s) => {
        e.value.wx.wind.at8000.speed = Math.round(s);
      }
    }), l = R({
      get: () => Math.round(e.value.wx.wind.at8000.dir),
      set: (s) => {
        e.value.wx.wind.at8000.dir = Math.round(s);
      }
    });
    return {
      windDir: pP,
      turbulence: t,
      sfcwind: o,
      sfcwinddir: r,
      twokwind: n,
      twokwinddir: i,
      eightkwind: a,
      eightkwinddir: l
    };
  }
}, gP = { class: "flex flex-row w-1/2" }, mP = { class: "flex flex-row w-1/2" }, bP = { class: "flex flex-row w-1/2" };
function xP(e, t, o, r, n, i) {
  const a = nt("n-input-number"), l = nt("n-form-item"), s = nt("n-divider");
  return yo(), sr("div", null, [
    we(l, { label: "Surface Winds" }, {
      default: Re(() => [
        Go("div", gP, [
          we(a, {
            id: "sfc-winds-input",
            class: "w-3/5",
            value: r.sfcwind,
            "onUpdate:value": t[0] || (t[0] = (d) => r.sfcwind = d),
            min: 0
          }, {
            suffix: Re(() => [
              et("kts")
            ]),
            _: 1
          }, 8, ["value"]),
          we(a, {
            class: "ml-4 w-1/2",
            id: "sfc-winds-dir-input",
            value: r.sfcwinddir,
            "onUpdate:value": t[1] || (t[1] = (d) => r.sfcwinddir = d),
            min: 0,
            format: r.windDir
          }, {
            suffix: Re(() => [
              et("°")
            ]),
            _: 1
          }, 8, ["value", "format"])
        ])
      ]),
      _: 1
    }),
    we(l, { label: "Winds at 2000" }, {
      default: Re(() => [
        Go("div", mP, [
          we(a, {
            class: "w-3/5",
            id: "twok-wind-input",
            value: r.twokwind,
            "onUpdate:value": t[2] || (t[2] = (d) => r.twokwind = d),
            min: 0
          }, {
            suffix: Re(() => [
              et("kts")
            ]),
            _: 1
          }, 8, ["value"]),
          we(a, {
            class: "ml-4 w-1/2",
            id: "twok-wind-dir-input",
            value: r.twokwinddir,
            "onUpdate:value": t[3] || (t[3] = (d) => r.twokwinddir = d),
            min: 0,
            format: r.windDir
          }, {
            suffix: Re(() => [
              et("°")
            ]),
            _: 1
          }, 8, ["value", "format"])
        ])
      ]),
      _: 1
    }),
    we(l, { label: "Winds at 8000" }, {
      default: Re(() => [
        Go("div", bP, [
          we(a, {
            class: "w-3/5",
            id: "eightk-wind-input",
            value: r.eightkwind,
            "onUpdate:value": t[4] || (t[4] = (d) => r.eightkwind = d),
            min: 0
          }, {
            suffix: Re(() => [
              et("kts")
            ]),
            _: 1
          }, 8, ["value"]),
          we(a, {
            class: "ml-4 w-1/2",
            id: "eightk-wind-dir-input",
            value: r.eightkwinddir,
            "onUpdate:value": t[5] || (t[5] = (d) => r.eightkwinddir = d),
            min: 0,
            format: r.windDir
          }, {
            suffix: Re(() => [
              et("°")
            ]),
            _: 1
          }, 8, ["value", "format"])
        ])
      ]),
      _: 1
    }),
    we(s, { class: "divider w-1/2" }),
    we(l, { label: "Turbulence" }, {
      default: Re(() => [
        we(a, {
          id: "turbulence-input",
          class: "w-1/2 min-w-24",
          value: r.turbulence,
          "onUpdate:value": t[6] || (t[6] = (d) => r.turbulence = d),
          size: "small",
          step: 3,
          min: 0,
          max: 197
        }, {
          suffix: Re(() => [
            et(" 0.1* ft")
          ]),
          _: 1
        }, 8, ["value"])
      ]),
      _: 1
    })
  ]);
}
const CP = /* @__PURE__ */ En(vP, [["render", xP]]), yP = {
  components: {
    AtmosphereClouds: hP,
    WindConditions: CP,
    NConfigProvider: Ay,
    NH3: Y2
  },
  setup() {
    const e = tP(), t = L(e.theme), o = L(e.getSelectedTheme), r = L(
      e.getThemeOverrides
    );
    return {
      theme: t,
      selectedTheme: o,
      themeOverrides: r,
      setThemeOverrides: (i) => {
        e.setThemeOverrides(i);
      }
    };
  }
}, wP = { class: "flex flex-row w-full text-xl mt-2 font-sans font-semibold" }, SP = { class: "flex justify-center flex-col w-1/2 h-full overflow-hidden pl-10" }, PP = { class: "flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10 ml-8" };
function $P(e, t, o, r, n, i) {
  const a = nt("n-h3"), l = nt("AtmosphereClouds"), s = nt("WindConditions"), d = nt("n-config-provider");
  return yo(), Jl(d, {
    theme: r.selectedTheme === "Dark" ? r.theme : null,
    "theme-overrides": r.selectedTheme === "Dark" ? r.themeOverrides : null
  }, {
    default: Re(() => [
      Go("div", wP, [
        Go("div", SP, [
          we(a, { class: "border-b border-white border-solid border-1 mb-12" }, {
            default: Re(() => [
              et(" Clouds & Atmosphere ")
            ]),
            _: 1
          }),
          we(l)
        ]),
        Go("div", PP, [
          we(a, { class: "border-b border-white border-solid border-1 mb-12" }, {
            default: Re(() => [
              et("Wind")
            ]),
            _: 1
          }),
          we(s)
        ])
      ])
    ]),
    _: 1
  }, 8, ["theme", "theme-overrides"]);
}
const kP = /* @__PURE__ */ En(yP, [["render", $P]]);
const TP = Wu(), $c = gu(kP);
$c.use(TP);
$c.mount("#app");
export {
  IP as inputWeather,
  ba as useWeatherStore
};
