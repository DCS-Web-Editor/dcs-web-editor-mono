import { effectScope as Kl, ref as E, markRaw as At, toRaw as Pn, getCurrentInstance as Or, inject as Be, watch as Te, unref as lu, reactive as su, isRef as br, isReactive as Hi, toRef as ke, nextTick as zt, computed as M, getCurrentScope as du, onScopeDispose as cu, toRefs as xa, createTextVNode as it, Fragment as Jt, Comment as Li, isVNode as uu, defineComponent as Ce, onBeforeUnmount as Ct, readonly as ui, onMounted as yt, provide as _t, withDirectives as Er, h as x, Teleport as fu, renderSlot as Yl, onActivated as Xl, onDeactivated as Zl, mergeProps as Wi, onBeforeMount as Ni, watchEffect as ht, Transition as Yt, TransitionGroup as hu, vShow as Jl, cloneVNode as pu, onBeforeUpdate as vu, resolveComponent as nt, openBlock as yo, createBlock as Ql, withCtx as De, createVNode as we, toDisplayString as es, createElementBlock as sr, createCommentVNode as Ln, createElementVNode as lo, createApp as gu } from "vue";
var ts = !1;
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
  return os().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function os() {
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
function rs(e, t) {
  const o = e, r = os(), n = mu(), i = bu && o.enableEarlyProxy;
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
const xr = (e) => dr = e, ns = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function zo(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ht;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ht || (Ht = {}));
const kn = typeof window < "u", fr = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && kn, Ca = /* @__PURE__ */ (() => typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null })();
function Pu(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], { type: e.type }) : e;
}
function Vi(e, t, o) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    ls(r.response, t, o);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function is(e) {
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
const en = typeof navigator == "object" ? navigator : { userAgent: "" }, as = /* @__PURE__ */ (() => /Macintosh/.test(en.userAgent) && /AppleWebKit/.test(en.userAgent) && !/Safari/.test(en.userAgent))(), ls = kn ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !as ? ku : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in en ? $u : (
      // Fallback to using FileReader and a popup
      Tu
    )
  )
) : () => {
};
function ku(e, t = "download", o) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? is(r.href) ? Vi(e, t, o) : (r.target = "_blank", Qr(r)) : Qr(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    Qr(r);
  }, 0));
}
function $u(e, t = "download", o) {
  if (typeof e == "string")
    if (is(e))
      Vi(e, t, o);
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
    return Vi(e, t, o);
  const n = e.type === "application/octet-stream", i = /constructor/i.test(String(Ca.HTMLElement)) || "safari" in Ca, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || n && i || as) && typeof FileReader < "u") {
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
function ji(e) {
  return "_a" in e && "install" in e;
}
function ss() {
  if (!("clipboard" in navigator))
    return at("Your browser doesn't support the Clipboard API", "error"), !0;
}
function ds(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (at('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function zu(e) {
  if (!ss())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), at("Global state copied to clipboard.");
    } catch (t) {
      if (ds(t))
        return;
      at("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function _u(e) {
  if (!ss())
    try {
      e.state.value = JSON.parse(await navigator.clipboard.readText()), at("Global state pasted from clipboard.");
    } catch (t) {
      if (ds(t))
        return;
      at("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Iu(e) {
  try {
    ls(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    at("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let qt;
function Ou() {
  qt || (qt = document.createElement("input"), qt.type = "file", qt.accept = ".json");
  function e() {
    return new Promise((t, o) => {
      qt.onchange = async () => {
        const r = qt.files;
        if (!r)
          return t(null);
        const n = r.item(0);
        return t(n ? { text: await n.text(), file: n } : null);
      }, qt.oncancel = () => t(null), qt.onerror = o, qt.click();
    });
  }
  return e;
}
async function Eu(e) {
  try {
    const o = await (await Ou())();
    if (!o)
      return;
    const { text: r, file: n } = o;
    e.state.value = JSON.parse(r), at(`Global state imported from "${n.name}".`);
  } catch (t) {
    at("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Bt(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const cs = "🍍 Pinia (root)", hi = "_root";
function Ru(e) {
  return ji(e) ? {
    id: hi,
    label: cs
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Mu(e) {
  if (ji(e)) {
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
function Du(e) {
  return e ? Array.isArray(e) ? e.reduce((t, o) => (t.keys.push(o.key), t.operations.push(o.type), t.oldValue[o.key] = o.oldValue, t.newValue[o.key] = o.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Bt(e.type),
    key: Bt(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Bu(e) {
  switch (e) {
    case Ht.direct:
      return "mutation";
    case Ht.patchFunction:
      return "$patch";
    case Ht.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let qo = !0;
const tn = [], bo = "pinia:mutations", ut = "pinia", { assign: Au } = Object, ln = (e) => "🍍 " + e;
function Fu(e, t) {
  rs({
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
            await Eu(t), o.sendInspectorTree(ut), o.sendInspectorState(ut);
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
        n = n.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : cs.toLowerCase().includes(r.filter.toLowerCase())) : n).map(Ru);
      }
    }), o.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === ut) {
        const n = r.nodeId === hi ? t : t._s.get(r.nodeId);
        if (!n)
          return;
        n && (r.state = Mu(n));
      }
    }), o.on.editInspectorState((r, n) => {
      if (r.app === e && r.inspectorId === ut) {
        const i = r.nodeId === hi ? t : t._s.get(r.nodeId);
        if (!i)
          return at(`store "${r.nodeId}" not found`, "error");
        const { path: a } = r;
        ji(i) ? a.unshift("state") : (a.length !== 1 || !i._customProperties.has(a[0]) || a[0] in i.$state) && a.unshift("$state"), qo = !1, r.set(i, a, r.state.value), qo = !0;
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
        a[0] = "$state", qo = !1, r.set(i, a, r.state.value), qo = !0;
      }
    });
  });
}
function Hu(e, t) {
  tn.includes(ln(t.$id)) || tn.push(ln(t.$id)), rs({
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
      const c = us++;
      o.addTimelineEvent({
        layerId: bo,
        event: {
          time: r(),
          title: "🛫 " + s,
          subtitle: "start",
          data: {
            store: Bt(t.$id),
            action: Bt(s),
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
              store: Bt(t.$id),
              action: Bt(s),
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
              store: Bt(t.$id),
              action: Bt(s),
              args: d,
              error: f
            },
            groupId: c
          }
        });
      });
    }, !0), t._customProperties.forEach((a) => {
      Te(() => lu(t[a]), (l, s) => {
        o.notifyComponentUpdate(), o.sendInspectorState(ut), qo && o.addTimelineEvent({
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
      if (o.notifyComponentUpdate(), o.sendInspectorState(ut), !qo)
        return;
      const d = {
        time: r(),
        title: Bu(l),
        data: Au({ store: Bt(t.$id) }, Du(a)),
        groupId: Co
      };
      Co = void 0, l === Ht.patchFunction ? d.subtitle = "⤵️" : l === Ht.patchObject ? d.subtitle = "🧩" : a && !Array.isArray(a) && (d.subtitle = a.type), a && (d.data["rawEvent(s)"] = {
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
    t._hotUpdate = At((a) => {
      n(a), o.addTimelineEvent({
        layerId: bo,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Bt(t.$id),
            info: Bt("HMR update")
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
let us = 0, Co;
function ya(e, t) {
  const o = t.reduce((r, n) => (r[n] = Pn(e)[n], r), {});
  for (const r in o)
    e[r] = function() {
      const n = us, i = new Proxy(e, {
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
  const e = Kl(!0), t = e.run(() => E({}));
  let o = [], r = [];
  const n = At({
    install(i) {
      xr(n), n._a = i, i.provide(ns, n), i.config.globalProperties.$pinia = n, fr && Fu(i, n), r.forEach((a) => o.push(a)), r = [];
    },
    use(i) {
      return !this._a && !ts ? r.push(i) : o.push(i), this;
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
function fs(e, t) {
  for (const o in t) {
    const r = t[o];
    if (!(o in e))
      continue;
    const n = e[o];
    zo(n) && zo(r) && !br(r) && !Hi(r) ? e[o] = fs(n, r) : e[o] = r;
  }
  return e;
}
const hs = () => {
};
function wa(e, t, o, r = hs) {
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
function Vu(e) {
  return !zo(e) || !e.hasOwnProperty(Nu);
}
const { assign: Et } = Object;
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
      xa(E(n ? n() : {}).value)
    ) : xa(o.state.value[e]);
    return Et(c, i, Object.keys(a || {}).reduce((f, v) => (process.env.NODE_ENV !== "production" && v in c && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), f[v] = At(M(() => {
      xr(o);
      const g = o._s.get(e);
      return a[v].call(g, g);
    })), f), {}));
  }
  return s = vi(e, d, t, o, r, !0), s;
}
function vi(e, t, o = {}, r, n, i) {
  let a;
  const l = Et({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const s = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !ts && (s.onTrigger = ($) => {
    d ? g = $ : d == !1 && !m._hotUpdating && (Array.isArray(g) ? g.push($) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, c, f = At([]), v = At([]), g;
  const u = r.state.value[e];
  !i && !u && (process.env.NODE_ENV === "production" || !n) && (r.state.value[e] = {});
  const p = E({});
  let b;
  function h($) {
    let k;
    d = c = !1, process.env.NODE_ENV !== "production" && (g = []), typeof $ == "function" ? ($(r.state.value[e]), k = {
      type: Ht.patchFunction,
      storeId: e,
      events: g
    }) : (pi(r.state.value[e], $), k = {
      type: Ht.patchObject,
      payload: $,
      storeId: e,
      events: g
    });
    const _ = b = Symbol();
    zt().then(() => {
      b === _ && (d = !0);
    }), c = !0, Ho(f, k, r.state.value[e]);
  }
  const S = i ? function() {
    const { state: k } = o, _ = k ? k() : {};
    this.$patch((w) => {
      Et(w, _);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : hs
  );
  function O() {
    a.stop(), f = [], v = [], r._s.delete(e);
  }
  function y($, k) {
    return function() {
      xr(r);
      const _ = Array.from(arguments), w = [], F = [];
      function L(j) {
        w.push(j);
      }
      function G(j) {
        F.push(j);
      }
      Ho(v, {
        args: _,
        name: $,
        store: m,
        after: L,
        onError: G
      });
      let Y;
      try {
        Y = k.apply(this && this.$id === e ? this : m, _);
      } catch (j) {
        throw Ho(F, j), j;
      }
      return Y instanceof Promise ? Y.then((j) => (Ho(w, j), j)).catch((j) => (Ho(F, j), Promise.reject(j))) : (Ho(w, Y), Y);
    };
  }
  const T = /* @__PURE__ */ At({
    actions: {},
    getters: {},
    state: [],
    hotState: p
  }), I = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: wa.bind(null, v),
    $patch: h,
    $reset: S,
    $subscribe($, k = {}) {
      const _ = wa(f, $, k.detached, () => w()), w = a.run(() => Te(() => r.state.value[e], (F) => {
        (k.flush === "sync" ? c : d) && $({
          storeId: e,
          type: Ht.direct,
          events: g
        }, F);
      }, Et({}, s, k)));
      return _;
    },
    $dispose: O
  }, m = su(process.env.NODE_ENV !== "production" || fr ? Et(
    {
      _hmrPayload: T,
      _customProperties: At(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    I
    // must be added later
    // setupStore
  ) : I);
  r._s.set(e, m);
  const P = r._e.run(() => (a = Kl(), a.run(() => t())));
  for (const $ in P) {
    const k = P[$];
    if (br(k) && !Sa(k) || Hi(k))
      process.env.NODE_ENV !== "production" && n ? Lr(p.value, $, ke(P, $)) : i || (u && Vu(k) && (br(k) ? k.value = u[$] : pi(k, u[$])), r.state.value[e][$] = k), process.env.NODE_ENV !== "production" && T.state.push($);
    else if (typeof k == "function") {
      const _ = process.env.NODE_ENV !== "production" && n ? k : y($, k);
      P[$] = _, process.env.NODE_ENV !== "production" && (T.actions[$] = k), l.actions[$] = k;
    } else
      process.env.NODE_ENV !== "production" && Sa(k) && (T.getters[$] = i ? (
        // @ts-expect-error
        o.getters[$]
      ) : k, kn && (P._getters || // @ts-expect-error: same
      (P._getters = At([]))).push($));
  }
  if (Et(m, P), Et(Pn(m), P), Object.defineProperty(m, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? p.value : r.state.value[e],
    set: ($) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      h((k) => {
        Et(k, $);
      });
    }
  }), process.env.NODE_ENV !== "production" && (m._hotUpdate = At(($) => {
    m._hotUpdating = !0, $._hmrPayload.state.forEach((k) => {
      if (k in m.$state) {
        const _ = $.$state[k], w = m.$state[k];
        typeof _ == "object" && zo(_) && zo(w) ? fs(_, w) : $.$state[k] = w;
      }
      Lr(m, k, ke($.$state, k));
    }), Object.keys(m.$state).forEach((k) => {
      k in $.$state || Wn(m, k);
    }), d = !1, c = !1, r.state.value[e] = ke($._hmrPayload, "hotState"), c = !0, zt().then(() => {
      d = !0;
    });
    for (const k in $._hmrPayload.actions) {
      const _ = $[k];
      Lr(m, k, y(k, _));
    }
    for (const k in $._hmrPayload.getters) {
      const _ = $._hmrPayload.getters[k], w = i ? (
        // special handling of options api
        M(() => (xr(r), _.call(m, m)))
      ) : _;
      Lr(m, k, w);
    }
    Object.keys(m._hmrPayload.getters).forEach((k) => {
      k in $._hmrPayload.getters || Wn(m, k);
    }), Object.keys(m._hmrPayload.actions).forEach((k) => {
      k in $._hmrPayload.actions || Wn(m, k);
    }), m._hmrPayload = $._hmrPayload, m._getters = $._getters, m._hotUpdating = !1;
  })), fr) {
    const $ = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((k) => {
      Object.defineProperty(m, k, Et({ value: m[k] }, $));
    });
  }
  return r._p.forEach(($) => {
    if (fr) {
      const k = a.run(() => $({
        store: m,
        app: r._a,
        pinia: r,
        options: l
      }));
      Object.keys(k || {}).forEach((_) => m._customProperties.add(_)), Et(m, k);
    } else
      Et(m, a.run(() => $({
        store: m,
        app: r._a,
        pinia: r,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && m.$state && typeof m.$state == "object" && typeof m.$state.constructor == "function" && !m.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${m.$id}".`), u && i && o.hydrate && o.hydrate(m.$state, u), d = !0, c = !0, m;
}
function ps(e, t, o) {
  let r, n;
  const i = typeof t == "function";
  typeof e == "string" ? (r = e, n = i ? o : t) : (n = e, r = e.id);
  function a(l, s) {
    const d = Or();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && dr && dr._testing ? null : l) || d && Be(ns, null), l && xr(l), process.env.NODE_ENV !== "production" && !dr)
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    l = dr, l._s.has(r) || (i ? vi(r, t, n, l) : Pa(r, n, l), process.env.NODE_ENV !== "production" && (a._pinia = l));
    const c = l._s.get(r);
    if (process.env.NODE_ENV !== "production" && s) {
      const f = "__hot:" + r, v = i ? vi(f, t, n, l, !0) : Pa(f, Et({}, n), l, !0);
      s._hotUpdate(v), delete l.state.value[f], l._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && kn && d && d.proxy && // avoid adding stores that are just built for hot module replacement
    !s) {
      const f = d.proxy, v = "_pStores" in f ? f._pStores : f._pStores = {};
      v[r] = c;
    }
    return c;
  }
  return a.$id = r, a;
}
let sn = [];
const vs = /* @__PURE__ */ new WeakMap();
function ju() {
  sn.forEach((e) => e(...vs.get(e))), sn = [];
}
function gs(e, ...t) {
  vs.set(e, t), !sn.includes(e) && sn.push(e) === 1 && requestAnimationFrame(ju);
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
const ka = {
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
function bt(e) {
  return parseInt(e, 16);
}
function Wt(e) {
  try {
    let t;
    if (t = Yu.exec(e))
      return [bt(t[1]), bt(t[2]), bt(t[3]), 1];
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
        bt(t[1] + t[1]),
        bt(t[2] + t[2]),
        bt(t[3] + t[3]),
        1
      ];
    if (t = Zu.exec(e))
      return [
        bt(t[1]),
        bt(t[2]),
        bt(t[3]),
        hr(bt(t[4]) / 255)
      ];
    if (t = Xu.exec(e))
      return [
        bt(t[1] + t[1]),
        bt(t[2] + t[2]),
        bt(t[3] + t[3]),
        hr(bt(t[4] + t[4]) / 255)
      ];
    if (e in ka)
      return Wt(ka[e]);
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
  Array.isArray(e) || (e = Wt(e)), Array.isArray(t) || (t = Wt(t));
  const o = e[3], r = t[3], n = hr(o + r - o * r);
  return gi(Nn(e[0], o, t[0], r, n), Nn(e[1], o, t[1], r, n), Nn(e[2], o, t[2], r, n), n);
}
function K(e, t) {
  const [o, r, n, i = 1] = Array.isArray(e) ? e : Wt(e);
  return t.alpha ? gi(o, r, n, t.alpha) : gi(o, r, n, i);
}
function Je(e, t) {
  const [o, r, n, i = 1] = Array.isArray(e) ? e : Wt(e), { lightness: a = 1, alpha: l = 1 } = t;
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
        (typeof r == "string" || typeof r == "number") && o.push(it(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        un(r, t, o);
        return;
      }
      if (r.type === Jt) {
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
const Go = (e, ...t) => typeof e == "function" ? e(...t) : typeof e == "string" ? it(e) : typeof e == "number" ? it(String(e)) : null, $a = /* @__PURE__ */ new Set();
function $t(e, t) {
  const o = `[naive/${e}]: ${t}`;
  $a.has(o) || ($a.add(o), console.error(o));
}
function wr(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function ms(e, t) {
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
  return e.some((t) => uu(t) ? !(t.type === Li || t.type === Jt && !Rr(t.children)) : !0) ? e : null;
}
function Kt(e, t) {
  return e && Rr(e()) || t();
}
function rf(e, t, o) {
  return e && Rr(e(t)) || o(t);
}
function gt(e, t) {
  const o = e && Rr(e());
  return t(o || null);
}
function mi(e) {
  return !(e && Rr(e()));
}
function Vn(e) {
  const t = e.filter((o) => o !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (o) => {
      e.forEach((r) => {
        r && r(o);
      });
    };
}
const bi = Ce({
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
const bs = /\s*,(?![^(]*\))\s*/g, lf = /\s+/g;
function sf(e, t) {
  const o = [];
  return t.split(bs).forEach((r) => {
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
  return t.split(bs).forEach((r) => {
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
function $n(e) {
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
function xs(e) {
  return e.replace(ff, (t) => "-" + t.toLowerCase());
}
function hf(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((o) => t + `  ${xs(o[0])}: ${o[1]};`).join(`
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
    l = xs(l), s != null && a.push(`  ${l}${hf(s)}`);
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
function Cs(e, t, o, r, n, i) {
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
      Cs(c, t, o, r, n, i);
  }), t.pop(), l && o.push("}"), a && a.after && a.after(r.context);
}
function ys(e, t, o, r = !1) {
  const n = [];
  return Cs(e, [], n, t, o, r ? e.instance.__styleSheet : void 0), r ? "" : n.join(`

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
    const n = $n(o);
    n && r.includes(n) && (_a(n), t.els = r.filter((i) => i !== n));
  }
}
function Oa(e, t) {
  e.push(t);
}
function gf(e, t, o, r, n, i, a, l, s) {
  if (i && !s) {
    if (o === void 0) {
      console.error("[css-render/mount]: `id` is required in `silent` mode.");
      return;
    }
    const v = window.__cssrContext;
    v[o] || (v[o] = !0, ys(t, e, r, i));
    return;
  }
  let d;
  if (o === void 0 && (d = t.render(r), o = Sr(d)), s) {
    s.adapter(o, d ?? t.render(r));
    return;
  }
  const c = $n(o);
  if (c !== null && !a)
    return c;
  const f = c ?? uf(o);
  if (d === void 0 && (d = t.render(r)), f.textContent = d, c !== null)
    return c;
  if (l) {
    const v = document.head.querySelector(`meta[name="${l}"]`);
    if (v)
      return document.head.insertBefore(f, v), Oa(t.els, f), f;
  }
  return n ? document.head.insertBefore(f, document.head.querySelector("style, link")) : document.head.appendChild(f), Oa(t.els, f), f;
}
function mf(e) {
  return ys(this, this.instance, e);
}
function bf(e = {}) {
  const { id: t, ssr: o, props: r, head: n = !1, silent: i = !1, force: a = !1, anchorMetaName: l } = e;
  return gf(this.instance, this, t, r, n, i, a, l, o);
}
function xf(e = {}) {
  const { id: t } = e;
  vf(this.instance, this, t);
}
const Vr = function(e, t, o, r) {
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
  return Array.isArray(t) ? Vr(e, { $: null }, null, t) : Array.isArray(o) ? Vr(e, t, null, o) : Array.isArray(r) ? Vr(e, t, o, r) : Vr(e, t, o, null);
};
function ws(e = {}) {
  let t = null;
  const o = {
    c: (...r) => Cf(o, ...r),
    use: (r, ...n) => r.install(o, ...n),
    find: $n,
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
  return $n(e) !== null;
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
      const p = u.context;
      p.bem = {}, p.bem.b = null, p.bem.els = null;
    }
  };
  function a(u) {
    let p, b;
    return {
      before(h) {
        p = h.bem.b, b = h.bem.els, h.bem.els = null;
      },
      after(h) {
        h.bem.b = p, h.bem.els = b;
      },
      $({ context: h, props: S }) {
        return u = typeof u == "string" ? u : u({ context: h, props: S }), h.bem.b = u, `${(S == null ? void 0 : S.bPrefix) || t}${h.bem.b}`;
      }
    };
  }
  function l(u) {
    let p;
    return {
      before(b) {
        p = b.bem.els;
      },
      after(b) {
        b.bem.els = p;
      },
      $({ context: b, props: h }) {
        return u = typeof u == "string" ? u : u({ context: b, props: h }), b.bem.els = u.split(",").map((S) => S.trim()), b.bem.els.map((S) => `${(h == null ? void 0 : h.bPrefix) || t}${b.bem.b}${o}${S}`).join(", ");
      }
    };
  }
  function s(u) {
    return {
      $({ context: p, props: b }) {
        u = typeof u == "string" ? u : u({ context: p, props: b });
        const h = u.split(",").map((y) => y.trim());
        function S(y) {
          return h.map((T) => `&${(b == null ? void 0 : b.bPrefix) || t}${p.bem.b}${y !== void 0 ? `${o}${y}` : ""}${r}${T}`).join(", ");
        }
        const O = p.bem.els;
        if (O !== null) {
          if (process.env.NODE_ENV !== "production" && O.length >= 2)
            throw Error(`[css-render/plugin-bem]: m(${u}) is invalid, using modifier inside multiple elements is not allowed`);
          return S(O[0]);
        } else
          return S();
      }
    };
  }
  function d(u) {
    return {
      $({ context: p, props: b }) {
        u = typeof u == "string" ? u : u({ context: p, props: b });
        const h = p.bem.els;
        if (process.env.NODE_ENV !== "production" && h !== null && h.length >= 2)
          throw Error(`[css-render/plugin-bem]: notM(${u}) is invalid, using modifier inside multiple elements is not allowed`);
        return `&:not(${(b == null ? void 0 : b.bPrefix) || t}${p.bem.b}${h !== null && h.length > 0 ? `${o}${h[0]}` : ""}${r}${u})`;
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
const Sf = "n", hn = `.${Sf}-`, Pf = "__", kf = "--", Ss = ws(), Ps = wf({
  blockPrefix: hn,
  elementPrefix: Pf,
  modifierPrefix: kf
});
Ss.use(Ps);
const { c: N, find: $P } = Ss, { cB: R, cE: B, cM: J, cNotM: Qe } = Ps;
function ks(e) {
  return N(({ props: { bPrefix: t } }) => `${t || hn}modal, ${t || hn}drawer`, [e]);
}
function $s(e) {
  return N(({ props: { bPrefix: t } }) => `${t || hn}popover`, [e]);
}
const $f = (...e) => N(">", [R(...e)]);
let jn;
function Tf() {
  return jn === void 0 && (jn = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), jn;
}
const Mr = typeof document < "u" && typeof window < "u", zf = /* @__PURE__ */ new WeakSet();
function _f(e) {
  zf.add(e);
}
function If(e, t, o) {
  var r;
  const n = Be(e, null);
  if (n === null)
    return;
  const i = (r = Or()) === null || r === void 0 ? void 0 : r.proxy;
  Te(o, a), a(o.value), Ct(() => {
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
function Of(e) {
  const t = E(!!e.value);
  if (t.value)
    return ui(t);
  const o = Te(e, (r) => {
    r && (t.value = !0, o());
  });
  return ui(t);
}
function Xe(e) {
  const t = M(e), o = E(t.value);
  return Te(t, (r) => {
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
const Ef = typeof window < "u";
let Yo, pr;
const Rf = () => {
  var e, t;
  Yo = Ef ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, pr = !1, Yo !== void 0 ? Yo.then(() => {
    pr = !0;
  }) : pr = !0;
};
Rf();
function Mf(e) {
  if (pr)
    return;
  let t = !1;
  yt(() => {
    pr || Yo == null || Yo.then(() => {
      t || e();
    });
  }), Ct(() => {
    t = !0;
  });
}
function rn(e) {
  return e.composedPath()[0];
}
const Df = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function Bf(e, t, o) {
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
function Ts(e, t, o) {
  const r = Df[e];
  let n = r.get(t);
  n === void 0 && r.set(t, n = /* @__PURE__ */ new WeakMap());
  let i = n.get(o);
  return i === void 0 && n.set(o, i = Bf(e, t, o)), i;
}
function Af(e, t, o, r) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const n = Ts(e, t, o);
    return Object.keys(n).forEach((i) => {
      Ke(i, document, n[i], r);
    }), !0;
  }
  return !1;
}
function Ff(e, t, o, r) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const n = Ts(e, t, o);
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
  function n(m, P, $) {
    const k = m[P];
    return m[P] = function() {
      return $.apply(m, arguments), k.apply(m, arguments);
    }, m;
  }
  function i(m, P) {
    m[P] = Event.prototype[P];
  }
  const a = /* @__PURE__ */ new WeakMap(), l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var m;
    return (m = a.get(this)) !== null && m !== void 0 ? m : null;
  }
  function d(m, P) {
    l !== void 0 && Object.defineProperty(m, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: P ?? l.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, f = {};
  function v() {
    const m = function(P) {
      const { type: $, eventPhase: k, bubbles: _ } = P, w = rn(P);
      if (k === 2)
        return;
      const F = k === 1 ? "capture" : "bubble";
      let L = w;
      const G = [];
      for (; L === null && (L = window), G.push(L), L !== window; )
        L = L.parentNode || null;
      const Y = c.capture[$], j = c.bubble[$];
      if (n(P, "stopPropagation", o), n(P, "stopImmediatePropagation", r), d(P, s), F === "capture") {
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
          if (ne === 0 && !_ && j !== void 0) {
            const de = j.get(H);
            if (de !== void 0)
              for (const Se of de) {
                if (t.has(P))
                  break;
                Se(P);
              }
          }
        }
      } else if (F === "bubble") {
        if (j === void 0)
          return;
        for (let ne = 0; ne < G.length && !e.has(P); ++ne) {
          const H = G[ne], U = j.get(H);
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
    return m.displayName = "evtdUnifiedHandler", m;
  }
  function g() {
    const m = function(P) {
      const { type: $, eventPhase: k } = P;
      if (k !== 2)
        return;
      const _ = f[$];
      _ !== void 0 && _.forEach((w) => w(P));
    };
    return m.displayName = "evtdUnifiedWindowEventHandler", m;
  }
  const u = v(), p = g();
  function b(m, P) {
    const $ = c[m];
    return $[P] === void 0 && ($[P] = /* @__PURE__ */ new Map(), window.addEventListener(P, u, m === "capture")), $[P];
  }
  function h(m) {
    return f[m] === void 0 && (f[m] = /* @__PURE__ */ new Set(), window.addEventListener(m, p)), f[m];
  }
  function S(m, P) {
    let $ = m.get(P);
    return $ === void 0 && m.set(P, $ = /* @__PURE__ */ new Set()), $;
  }
  function O(m, P, $, k) {
    const _ = c[P][$];
    if (_ !== void 0) {
      const w = _.get(m);
      if (w !== void 0 && w.has(k))
        return !0;
    }
    return !1;
  }
  function y(m, P) {
    const $ = f[m];
    return !!($ !== void 0 && $.has(P));
  }
  function T(m, P, $, k) {
    let _;
    if (typeof k == "object" && k.once === !0 ? _ = (Y) => {
      I(m, P, _, k), $(Y);
    } : _ = $, Af(m, P, _, k))
      return;
    const F = k === !0 || typeof k == "object" && k.capture === !0 ? "capture" : "bubble", L = b(F, m), G = S(L, P);
    if (G.has(_) || G.add(_), P === window) {
      const Y = h(m);
      Y.has(_) || Y.add(_);
    }
  }
  function I(m, P, $, k) {
    if (Ff(m, P, $, k))
      return;
    const w = k === !0 || typeof k == "object" && k.capture === !0, F = w ? "capture" : "bubble", L = b(F, m), G = S(L, P);
    if (P === window && !O(P, w ? "bubble" : "capture", m, $) && y(m, $)) {
      const j = f[m];
      j.delete($), j.size === 0 && (window.removeEventListener(m, p), f[m] = void 0);
    }
    G.has($) && G.delete($), G.size === 0 && L.delete(P), L.size === 0 && (window.removeEventListener(m, u, F === "capture"), c[F][m] = void 0);
  }
  return {
    on: T,
    off: I
  };
}
const { on: Ke, off: qe } = Hf();
function so(e, t) {
  return Te(e, (o) => {
    o !== void 0 && (t.value = o);
  }), M(() => e.value === void 0 ? t.value : e.value);
}
function Dr() {
  const e = E(!1);
  return yt(() => {
    e.value = !0;
  }), ui(e);
}
function zs(e, t) {
  return M(() => {
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
const Ui = "n-internal-select-menu", _s = "n-internal-select-menu-body", Is = "n-modal-body", Os = "n-drawer-body", Es = "n-popover-body", Rs = "__disabled__";
function Rt(e) {
  const t = Be(Is, null), o = Be(Os, null), r = Be(Es, null), n = Be(_s, null), i = E();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    yt(() => {
      Ke("fullscreenchange", document, a);
    }), Ct(() => {
      qe("fullscreenchange", document, a);
    });
  }
  return Xe(() => {
    var a;
    const { to: l } = e;
    return l !== void 0 ? l === !1 ? Rs : l === !0 ? i.value || "body" : l : t != null && t.value ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : o != null && o.value ? o.value : r != null && r.value ? r.value : n != null && n.value ? n.value : l ?? (i.value || "body");
  });
}
Rt.tdkey = Rs;
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
        (typeof r == "string" || typeof r == "number") && o.push(it(String(r)));
        return;
      }
      if (Array.isArray(r)) {
        yi(r, t, o);
        return;
      }
      if (r.type === Jt) {
        if (r.children === null)
          return;
        Array.isArray(r.children) && yi(r.children, t, o);
      } else
        r.type !== Li && o.push(r);
    }
  }), o;
}
function Ea(e, t, o = "default") {
  const r = t[o];
  if (r === void 0)
    throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);
  const n = yi(r());
  if (n.length === 1)
    return n[0];
  throw new Error(`[vueuc/${e}]: slot[${o}] should have exactly one child.`);
}
let no = null;
function Ms() {
  if (no === null && (no = document.getElementById("v-binder-view-measurer"), no === null)) {
    no = document.createElement("div"), no.id = "v-binder-view-measurer";
    const { style: e } = no;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(no);
  }
  return no.getBoundingClientRect();
}
function Nf(e, t) {
  const o = Ms();
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
  const t = e.getBoundingClientRect(), o = Ms();
  return {
    left: t.left - o.left,
    top: t.top - o.top,
    bottom: o.height + o.top - t.bottom,
    right: o.width + o.left - t.right,
    width: t.width,
    height: t.height
  };
}
function Vf(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Ds(e) {
  if (e === null)
    return null;
  const t = Vf(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: o, overflowX: r, overflowY: n } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(o + n + r))
      return t;
  }
  return Ds(t);
}
const jf = Ce({
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
    _t("VBinder", (t = Or()) === null || t === void 0 ? void 0 : t.proxy);
    const o = Be("VBinder", null), r = E(null), n = (h) => {
      r.value = h, o && e.syncTargetWithParent && o.setTargetRef(h);
    };
    let i = [];
    const a = () => {
      let h = r.value;
      for (; h = Ds(h), h !== null; )
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
      gs(v);
    }, v = () => {
      s.forEach((h) => h());
    }, g = /* @__PURE__ */ new Set(), u = (h) => {
      g.size === 0 && Ke("resize", window, b), g.has(h) || g.add(h);
    }, p = (h) => {
      g.has(h) && g.delete(h), g.size === 0 && qe("resize", window, b);
    }, b = () => {
      g.forEach((h) => h());
    };
    return Ct(() => {
      qe("resize", window, b), l();
    }), {
      targetRef: r,
      setTargetRef: n,
      addScrollListener: d,
      removeScrollListener: c,
      addResizeListener: u,
      removeResizeListener: p
    };
  },
  render() {
    return Ci("binder", this.$slots);
  }
}), qi = jf, Gi = Ce({
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
    return e ? Er(Ea("follower", this.$slots), [
      [t]
    ]) : Ea("follower", this.$slots);
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
}, Bs = Xf, As = Symbol("@css-render/vue3-ssr");
function Zf(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function Jf(e, t) {
  const o = Be(As, null);
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
  const e = Be(As, null);
  if (e !== null)
    return {
      adapter: Jf,
      context: e
    };
}
function Ra(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: ao } = ws(), Ki = "vueuc-style";
function Ma(e) {
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
      n[t] += o, t += Ma(t);
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
      i += o[t], t -= Ma(t);
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
function Da(e) {
  return typeof e == "string" ? document.querySelector(e) : e();
}
const th = Ce({
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
      showTeleport: Of(ke(e, "show")),
      mergedTo: M(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? Ci("lazy-teleport", this.$slots) : x(fu, {
      disabled: this.disabled,
      to: this.mergedTo
    }, Ci("lazy-teleport", this.$slots)) : null;
  }
}), jr = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Ba = {
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
  const c = (g, u, p) => {
    let b = 0, h = 0;
    const S = o[g] - t[u] - t[g];
    return S > 0 && r && (p ? h = Aa[u] ? S : -S : b = Aa[u] ? S : -S), {
      left: b,
      top: h
    };
  }, f = a === "left" || a === "right";
  if (s !== "center") {
    const g = nh[e], u = jr[g], p = Gn[g];
    if (o[p] > t[p]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[g] + t[p] < o[p]
      ) {
        const b = (o[p] - t[p]) / 2;
        t[g] < b || t[u] < b ? t[g] < t[u] ? (s = Ba[l], d = c(p, u, f)) : d = c(p, g, f) : s = "center";
      }
    } else
      o[p] < t[p] && t[u] < 0 && // opposite align has larger space
      // ------------[   target   ]
      // ----------------[follower]
      t[g] > t[u] && (s = Ba[l]);
  } else {
    const g = a === "bottom" || a === "top" ? "left" : "top", u = jr[g], p = Gn[g], b = (o[p] - t[p]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[g] < b || t[u] < b) && (t[g] > t[u] ? (s = Fa[g], d = c(p, g, f)) : (s = Fa[u], d = c(p, u, f)));
  }
  let v = a;
  return (
    // space is not enough
    t[a] < o[Gn[a]] && // opposite position's space is larger
    t[a] < t[jr[a]] && (v = jr[a]), {
      placement: s !== "center" ? `${v}-${s}` : v,
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
const sh = ao([
  ao(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  ao(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    ao("> *", {
      pointerEvents: "all"
    })
  ])
]), Yi = Ce({
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
    const t = Be("VBinder"), o = Xe(() => e.enabled !== void 0 ? e.enabled : e.show), r = E(null), n = E(null), i = () => {
      const { syncTrigger: v } = e;
      v.includes("scroll") && t.addScrollListener(s), v.includes("resize") && t.addResizeListener(s);
    }, a = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    yt(() => {
      o.value && (s(), i());
    });
    const l = Io();
    sh.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: Ki,
      ssr: l
    }), Ct(() => {
      a();
    }), Mf(() => {
      o.value && s();
    });
    const s = () => {
      if (!o.value)
        return;
      const v = r.value;
      if (v === null)
        return;
      const g = t.targetRef, { x: u, y: p, overlap: b } = e, h = u !== void 0 && p !== void 0 ? Nf(u, p) : Un(g);
      v.style.setProperty("--v-target-width", `${Math.round(h.width)}px`), v.style.setProperty("--v-target-height", `${Math.round(h.height)}px`);
      const { width: S, minWidth: O, placement: y, internalShift: T, flip: I } = e;
      v.setAttribute("v-placement", y), b ? v.setAttribute("v-overlap", "") : v.removeAttribute("v-overlap");
      const { style: m } = v;
      S === "target" ? m.width = `${h.width}px` : S !== void 0 ? m.width = S : m.width = "", O === "target" ? m.minWidth = `${h.width}px` : O !== void 0 ? m.minWidth = O : m.minWidth = "";
      const P = Un(v), $ = Un(n.value), { left: k, top: _, placement: w } = ih(y, h, P, T, I, b), F = ah(w, b), { left: L, top: G, transform: Y } = lh(w, $, h, _, k, b);
      v.setAttribute("v-placement", w), v.style.setProperty("--v-offset-left", `${Math.round(k)}px`), v.style.setProperty("--v-offset-top", `${Math.round(_)}px`), v.style.transform = `translateX(${L}) translateY(${G}) ${Y}`, v.style.setProperty("--v-transform-origin", F), v.style.transformOrigin = F;
    };
    Te(o, (v) => {
      v ? (i(), d()) : a();
    });
    const d = () => {
      zt().then(s).catch((v) => console.error(v));
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
      Te(ke(e, v), s);
    }), ["teleportDisabled"].forEach((v) => {
      Te(ke(e, v), d);
    }), Te(ke(e, "syncTrigger"), (v) => {
      v.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), v.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = Dr(), f = Xe(() => {
      const { to: v } = e;
      if (v !== void 0)
        return v;
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
    return x(th, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var e, t;
        const o = x("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          x("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
        ]);
        return this.zindexable ? Er(o, [
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
var $o = [], dh = function() {
  return $o.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, ch = function() {
  return $o.some(function(e) {
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
}(), Fs = function() {
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
}, Hs = function(e) {
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
}, vr = typeof window < "u" ? window : {}, Ur = /* @__PURE__ */ new WeakMap(), Wa = /auto|scroll/, ph = /^tb|vertical/, vh = /msie|trident/i.test(vr.navigator && vr.navigator.userAgent), Ft = function(e) {
  return parseFloat(e || "0");
}, Xo = function(e, t, o) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), o === void 0 && (o = !1), new fh((o ? t : e) || 0, (o ? e : t) || 0);
}, Na = To({
  devicePixelContentBoxSize: Xo(),
  borderBoxSize: Xo(),
  contentBoxSize: Xo(),
  contentRect: new Fs(0, 0, 0, 0)
}), Ls = function(e, t) {
  if (t === void 0 && (t = !1), Ur.has(e) && !t)
    return Ur.get(e);
  if (Hs(e))
    return Ur.set(e, Na), Na;
  var o = getComputedStyle(e), r = Xi(e) && e.ownerSVGElement && e.getBBox(), n = !vh && o.boxSizing === "border-box", i = ph.test(o.writingMode || ""), a = !r && Wa.test(o.overflowY || ""), l = !r && Wa.test(o.overflowX || ""), s = r ? 0 : Ft(o.paddingTop), d = r ? 0 : Ft(o.paddingRight), c = r ? 0 : Ft(o.paddingBottom), f = r ? 0 : Ft(o.paddingLeft), v = r ? 0 : Ft(o.borderTopWidth), g = r ? 0 : Ft(o.borderRightWidth), u = r ? 0 : Ft(o.borderBottomWidth), p = r ? 0 : Ft(o.borderLeftWidth), b = f + d, h = s + c, S = p + g, O = v + u, y = l ? e.offsetHeight - O - e.clientHeight : 0, T = a ? e.offsetWidth - S - e.clientWidth : 0, I = n ? b + S : 0, m = n ? h + O : 0, P = r ? r.width : Ft(o.width) - I - T, $ = r ? r.height : Ft(o.height) - m - y, k = P + b + T + S, _ = $ + h + y + O, w = To({
    devicePixelContentBoxSize: Xo(Math.round(P * devicePixelRatio), Math.round($ * devicePixelRatio), i),
    borderBoxSize: Xo(k, _, i),
    contentBoxSize: Xo(P, $, i),
    contentRect: new Fs(f, s, P, $)
  });
  return Ur.set(e, w), w;
}, Ws = function(e, t, o) {
  var r = Ls(e, o), n = r.borderBoxSize, i = r.contentBoxSize, a = r.devicePixelContentBoxSize;
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
    var o = Ls(t);
    this.target = t, this.contentRect = o.contentRect, this.borderBoxSize = To([o.borderBoxSize]), this.contentBoxSize = To([o.contentBoxSize]), this.devicePixelContentBoxSize = To([o.devicePixelContentBoxSize]);
  }
  return e;
}(), Ns = function(e) {
  if (Hs(e))
    return 1 / 0;
  for (var t = 0, o = e.parentNode; o; )
    t += 1, o = o.parentNode;
  return t;
}, mh = function() {
  var e = 1 / 0, t = [];
  $o.forEach(function(a) {
    if (a.activeTargets.length !== 0) {
      var l = [];
      a.activeTargets.forEach(function(d) {
        var c = new gh(d.target), f = Ns(d.target);
        l.push(c), d.lastReportedSize = Ws(d.target, d.observedBox), f < e && (e = f);
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
}, Va = function(e) {
  $o.forEach(function(o) {
    o.activeTargets.splice(0, o.activeTargets.length), o.skippedTargets.splice(0, o.skippedTargets.length), o.observationTargets.forEach(function(n) {
      n.isActive() && (Ns(n.target) > e ? o.activeTargets.push(n) : o.skippedTargets.push(n));
    });
  });
}, bh = function() {
  var e = 0;
  for (Va(e); dh(); )
    e = mh(), Va(e);
  return ch() && uh(), e > 0;
}, Kn, Vs = [], xh = function() {
  return Vs.splice(0).forEach(function(e) {
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
  Vs.push(e), Kn();
}, yh = function(e) {
  Ch(function() {
    requestAnimationFrame(e);
  });
}, nn = 0, wh = function() {
  return !!nn;
}, Sh = 250, Ph = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, ja = [
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
}, Yn = !1, kh = function() {
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
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), ja.forEach(function(o) {
      return vr.addEventListener(o, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), ja.forEach(function(o) {
      return vr.removeEventListener(o, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), wi = new kh(), qa = function(e) {
  !nn && e > 0 && wi.start(), nn += e, !nn && wi.stop();
}, $h = function(e) {
  return !Xi(e) && !hh(e) && getComputedStyle(e).display === "inline";
}, Th = function() {
  function e(t, o) {
    this.target = t, this.observedBox = o || Pr.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = Ws(this.target, this.observedBox, !0);
    return $h(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
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
    Ga(n.observationTargets, o) < 0 && (i && $o.push(n), n.observationTargets.push(new Th(o, r && r.box)), qa(1), wi.schedule());
  }, e.unobserve = function(t, o) {
    var r = qr.get(t), n = Ga(r.observationTargets, o), i = r.observationTargets.length === 1;
    n >= 0 && (i && $o.splice($o.indexOf(r), 1), r.observationTargets.splice(n, 1), qa(-1));
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
const vn = new Ih(), kr = Ce({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const o = Or().proxy;
    function r(n) {
      const { onResize: i } = e;
      i !== void 0 && i(n);
    }
    yt(() => {
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
    }), Ct(() => {
      t && vn.unregisterHandler(o.$el.nextElementSibling);
    });
  },
  render() {
    return Yl(this.$slots, "default");
  }
});
let Kr;
function Oh() {
  return Kr === void 0 && ("matchMedia" in window ? Kr = window.matchMedia("(pointer:coarse)").matches : Kr = !1), Kr;
}
let Xn;
function Ka() {
  return Xn === void 0 && (Xn = "chrome" in window ? window.devicePixelRatio : 1), Xn;
}
const Eh = ao(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  ao("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    ao("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), Rh = Ce({
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
    Eh.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: Ki,
      ssr: t
    }), yt(() => {
      const { defaultScrollIndex: _, defaultScrollKey: w } = e;
      _ != null ? u({ index: _ }) : w != null && u({ key: w });
    });
    let o = !1, r = !1;
    Xl(() => {
      if (o = !1, !r) {
        r = !0;
        return;
      }
      u({ top: f.value, left: c });
    }), Zl(() => {
      o = !0, r || (r = !0);
    });
    const n = M(() => {
      const _ = /* @__PURE__ */ new Map(), { keyField: w } = e;
      return e.items.forEach((F, L) => {
        _.set(F[w], L);
      }), _;
    }), i = E(null), a = E(void 0), l = /* @__PURE__ */ new Map(), s = M(() => {
      const { items: _, itemSize: w, keyField: F } = e, L = new eh(_.length, w);
      return _.forEach((G, Y) => {
        const j = G[F], ne = l.get(j);
        ne !== void 0 && L.add(Y, ne);
      }), L;
    }), d = E(0);
    let c = 0;
    const f = E(0), v = Xe(() => Math.max(s.value.getBound(f.value - yr(e.paddingTop)) - 1, 0)), g = M(() => {
      const { value: _ } = a;
      if (_ === void 0)
        return [];
      const { items: w, itemSize: F } = e, L = v.value, G = Math.min(L + Math.ceil(_ / F + 1), w.length - 1), Y = [];
      for (let j = L; j <= G; ++j)
        Y.push(w[j]);
      return Y;
    }), u = (_, w) => {
      if (typeof _ == "number") {
        S(_, w, "auto");
        return;
      }
      const { left: F, top: L, index: G, key: Y, position: j, behavior: ne, debounce: H = !0 } = _;
      if (F !== void 0 || L !== void 0)
        S(F, L, ne);
      else if (G !== void 0)
        h(G, ne, H);
      else if (Y !== void 0) {
        const U = n.value.get(Y);
        U !== void 0 && h(U, ne, H);
      } else
        j === "bottom" ? S(0, Number.MAX_SAFE_INTEGER, ne) : j === "top" && S(0, 0, ne);
    };
    let p, b = null;
    function h(_, w, F) {
      const { value: L } = s, G = L.sum(_) + yr(e.paddingTop);
      if (!F)
        i.value.scrollTo({
          left: 0,
          top: G,
          behavior: w
        });
      else {
        p = _, b !== null && window.clearTimeout(b), b = window.setTimeout(() => {
          p = void 0, b = null;
        }, 16);
        const { scrollTop: Y, offsetHeight: j } = i.value;
        if (G > Y) {
          const ne = L.get(_);
          G + ne <= Y + j || i.value.scrollTo({
            left: 0,
            top: G + ne - j,
            behavior: w
          });
        } else
          i.value.scrollTo({
            left: 0,
            top: G,
            behavior: w
          });
      }
    }
    function S(_, w, F) {
      i.value.scrollTo({
        left: _,
        top: w,
        behavior: F
      });
    }
    function O(_, w) {
      var F, L, G;
      if (o || e.ignoreItemResize || k(w.target))
        return;
      const { value: Y } = s, j = n.value.get(_), ne = Y.get(j), H = (G = (L = (F = w.borderBoxSize) === null || F === void 0 ? void 0 : F[0]) === null || L === void 0 ? void 0 : L.blockSize) !== null && G !== void 0 ? G : w.contentRect.height;
      if (H === ne)
        return;
      H - e.itemSize === 0 ? l.delete(_) : l.set(_, H - e.itemSize);
      const de = H - ne;
      if (de === 0)
        return;
      Y.add(j, de);
      const Se = i.value;
      if (Se != null) {
        if (p === void 0) {
          const Ie = Y.sum(j);
          Se.scrollTop > Ie && Se.scrollBy(0, de);
        } else if (j < p)
          Se.scrollBy(0, de);
        else if (j === p) {
          const Ie = Y.sum(j);
          H + Ie > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          Se.scrollTop + Se.offsetHeight && Se.scrollBy(0, de);
        }
        $();
      }
      d.value++;
    }
    const y = !Oh();
    let T = !1;
    function I(_) {
      var w;
      (w = e.onScroll) === null || w === void 0 || w.call(e, _), (!y || !T) && $();
    }
    function m(_) {
      var w;
      if ((w = e.onWheel) === null || w === void 0 || w.call(e, _), y) {
        const F = i.value;
        if (F != null) {
          if (_.deltaX === 0 && (F.scrollTop === 0 && _.deltaY <= 0 || F.scrollTop + F.offsetHeight >= F.scrollHeight && _.deltaY >= 0))
            return;
          _.preventDefault(), F.scrollTop += _.deltaY / Ka(), F.scrollLeft += _.deltaX / Ka(), $(), T = !0, gs(() => {
            T = !1;
          });
        }
      }
    }
    function P(_) {
      if (o || k(_.target) || _.contentRect.height === a.value)
        return;
      a.value = _.contentRect.height;
      const { onResize: w } = e;
      w !== void 0 && w(_);
    }
    function $() {
      const { value: _ } = i;
      _ != null && (f.value = _.scrollTop, c = _.scrollLeft);
    }
    function k(_) {
      let w = _;
      for (; w !== null; ) {
        if (w.style.display === "none")
          return !0;
        w = w.parentElement;
      }
      return !1;
    }
    return {
      listHeight: a,
      listStyle: {
        overflow: "auto"
      },
      keyToIndex: n,
      itemsStyle: M(() => {
        const { itemResizable: _ } = e, w = Wr(s.value.sum());
        return d.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            height: _ ? "" : w,
            minHeight: _ ? w : "",
            paddingTop: Wr(e.paddingTop),
            paddingBottom: Wr(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: M(() => (d.value, {
        transform: `translateY(${Wr(s.value.sum(v.value))})`
      })),
      viewportItems: g,
      listElRef: i,
      itemsElRef: E(null),
      scrollTo: u,
      handleListResize: P,
      handleListScroll: I,
      handleListWheel: m,
      handleItemResize: O
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: o, visibleItemsTag: r } = this;
    return x(kr, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var n, i;
        return x("div", Wi(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? x("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            x(r, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => this.viewportItems.map((a) => {
                const l = a[t], s = o.get(l), d = this.$slots.default({
                  item: a,
                  index: s
                })[0];
                return e ? x(kr, {
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
}), go = "v-hidden", Mh = ao("[v-hidden]", {
  display: "none!important"
}), Ya = Ce({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const o = E(null), r = E(null);
    function n() {
      const { value: a } = o, { getCounter: l, getTail: s } = e;
      let d;
      if (l !== void 0 ? d = l() : d = r.value, !a || !d)
        return;
      d.hasAttribute(go) && d.removeAttribute(go);
      const { children: c } = a, f = a.offsetWidth, v = [], g = t.tail ? s == null ? void 0 : s() : null;
      let u = g ? g.offsetWidth : 0, p = !1;
      const b = a.children.length - (t.tail ? 1 : 0);
      for (let S = 0; S < b - 1; ++S) {
        if (S < 0)
          continue;
        const O = c[S];
        if (p) {
          O.hasAttribute(go) || O.setAttribute(go, "");
          continue;
        } else
          O.hasAttribute(go) && O.removeAttribute(go);
        const y = O.offsetWidth;
        if (u += y, v[S] = y, u > f) {
          const { updateCounter: T } = e;
          for (let I = S; I >= 0; --I) {
            const m = b - 1 - I;
            T !== void 0 ? T(m) : d.textContent = `${m}`;
            const P = d.offsetWidth;
            if (u -= v[I], u + P <= f || I === 0) {
              p = !0, S = I - 1, g && (S === -1 ? (g.style.maxWidth = `${f - P}px`, g.style.boxSizing = "border-box") : g.style.maxWidth = "");
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: h } = e;
      p ? h !== void 0 && h(!0) : (h !== void 0 && h(!1), d.setAttribute(go, ""));
    }
    const i = Io();
    return Mh.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: Ki,
      ssr: i
    }), yt(n), {
      selfRef: o,
      counterRef: r,
      sync: n
    };
  },
  render() {
    const { $slots: e } = this;
    return zt(this.sync), x("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      Yl(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : x("span", {
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
function Us(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const o = e.childNodes[t];
    if (js(o) && (Gs(o) || Us(o)))
      return !0;
  }
  return !1;
}
function qs(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const o = e.childNodes[t];
    if (js(o) && (Gs(o) || qs(o)))
      return !0;
  }
  return !1;
}
function Gs(e) {
  if (!Dh(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function Dh(e) {
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
let rr = [];
const Bh = Ce({
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
    const t = cn(), o = E(null), r = E(null);
    let n = !1, i = !1;
    const a = typeof document > "u" ? null : document.activeElement;
    function l() {
      return rr[rr.length - 1] === t;
    }
    function s(b) {
      var h;
      b.code === "Escape" && l() && ((h = e.onEsc) === null || h === void 0 || h.call(e, b));
    }
    yt(() => {
      Te(() => e.active, (b) => {
        b ? (f(), Ke("keydown", document, s)) : (qe("keydown", document, s), n && v());
      }, {
        immediate: !0
      });
    }), Ct(() => {
      qe("keydown", document, s), n && v();
    });
    function d(b) {
      if (!i && l()) {
        const h = c();
        if (h === null || h.contains(Cr(b)))
          return;
        g("first");
      }
    }
    function c() {
      const b = o.value;
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
        if (rr.push(t), e.autoFocus) {
          const { initialFocusTo: h } = e;
          h === void 0 ? g("first") : (b = Da(h)) === null || b === void 0 || b.focus({ preventScroll: !0 });
        }
        n = !0, document.addEventListener("focus", d, !0);
      }
    }
    function v() {
      var b;
      if (e.disabled || (document.removeEventListener("focus", d, !0), rr = rr.filter((S) => S !== t), l()))
        return;
      const { finalFocusTo: h } = e;
      h !== void 0 ? (b = Da(h)) === null || b === void 0 || b.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = !0, a.focus({ preventScroll: !0 }), i = !1);
    }
    function g(b) {
      if (l() && e.active) {
        const h = o.value, S = r.value;
        if (h !== null && S !== null) {
          const O = c();
          if (O == null || O === S) {
            i = !0, h.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const y = b === "first" ? Us(O) : qs(O);
          i = !1, y || (i = !0, h.focus({ preventScroll: !0 }), i = !1);
        }
      }
    }
    function u(b) {
      if (i)
        return;
      const h = c();
      h !== null && (b.relatedTarget !== null && h.contains(b.relatedTarget) ? g("last") : g("first"));
    }
    function p(b) {
      i || (b.relatedTarget !== null && b.relatedTarget === o.value ? g("last") : g("first"));
    }
    return {
      focusableStartRef: o,
      focusableEndRef: r,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus: u,
      handleEndFocus: p
    };
  },
  render() {
    const { default: e } = this.$slots;
    if (e === void 0)
      return null;
    if (this.disabled)
      return e();
    const { active: t, focusableStyle: o } = this;
    return x(Jt, null, [
      x("div", {
        "aria-hidden": "true",
        tabindex: t ? "0" : "-1",
        ref: "focusableStartRef",
        style: o,
        onFocus: this.handleStartFocus
      }),
      e(),
      x("div", {
        "aria-hidden": "true",
        style: o,
        ref: "focusableEndRef",
        tabindex: t ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
});
function Ks(e, t) {
  t && (yt(() => {
    const { value: o } = e;
    o && vn.registerHandler(o, t);
  }), Ct(() => {
    const { value: o } = e;
    o && vn.unregisterHandler(o);
  }));
}
function Ah(e) {
  const t = { isDeactivated: !1 };
  let o = !1;
  return Xl(() => {
    if (t.isDeactivated = !1, !o) {
      o = !0;
      return;
    }
    e();
  }), Zl(() => {
    t.isDeactivated = !0, o || (o = !0);
  }), t;
}
const Si = "n-form-item";
function Oo(e, { defaultSize: t = "medium", mergedSize: o, mergedDisabled: r } = {}) {
  const n = Be(Si, null);
  _t(Si, null);
  const i = M(o ? () => o(n) : () => {
    const { size: s } = e;
    if (s)
      return s;
    if (n) {
      const { mergedSize: d } = n;
      if (d.value !== void 0)
        return d.value;
    }
    return t;
  }), a = M(r ? () => r(n) : () => {
    const { disabled: s } = e;
    return s !== void 0 ? s : n ? n.disabled.value : !1;
  }), l = M(() => {
    const { status: s } = e;
    return s || (n == null ? void 0 : n.mergedValidationStatus.value);
  });
  return Ct(() => {
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
const Ys = Fh;
var Hh = typeof self == "object" && self && self.Object === Object && self, Lh = Ys || Hh || Function("return this")();
const Nt = Lh;
var Wh = Nt.Symbol;
const co = Wh;
var Xs = Object.prototype, Nh = Xs.hasOwnProperty, Vh = Xs.toString, nr = co ? co.toStringTag : void 0;
function jh(e) {
  var t = Nh.call(e, nr), o = e[nr];
  try {
    e[nr] = void 0;
    var r = !0;
  } catch {
  }
  var n = Vh.call(e);
  return r && (t ? e[nr] = o : delete e[nr]), n;
}
var Uh = Object.prototype, qh = Uh.toString;
function Gh(e) {
  return qh.call(e);
}
var Kh = "[object Null]", Yh = "[object Undefined]", Xa = co ? co.toStringTag : void 0;
function Eo(e) {
  return e == null ? e === void 0 ? Yh : Kh : Xa && Xa in Object(e) ? jh(e) : Gh(e);
}
function uo(e) {
  return e != null && typeof e == "object";
}
var Xh = "[object Symbol]";
function Zi(e) {
  return typeof e == "symbol" || uo(e) && Eo(e) == Xh;
}
function Zs(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length, n = Array(r); ++o < r; )
    n[o] = t(e[o], o, e);
  return n;
}
var Zh = Array.isArray;
const Mt = Zh;
var Jh = 1 / 0, Za = co ? co.prototype : void 0, Ja = Za ? Za.toString : void 0;
function Js(e) {
  if (typeof e == "string")
    return e;
  if (Mt(e))
    return Zs(e, Js) + "";
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
  var t = Eo(e);
  return t == ep || t == tp || t == Qh || t == op;
}
var rp = Nt["__core-js_shared__"];
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
function Mo(e, t) {
  var o = vp(e, t);
  return pp(o) ? o : void 0;
}
var gp = Mo(Nt, "WeakMap");
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
function kp(e) {
  return function() {
    return e;
  };
}
var $p = function() {
  try {
    var e = Mo(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const gn = $p;
var Tp = gn ? function(e, t) {
  return gn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: kp(t),
    writable: !0
  });
} : Ji;
const zp = Tp;
var _p = Pp(zp);
const Ip = _p;
var Op = 9007199254740991, Ep = /^(?:0|[1-9]\d*)$/;
function ea(e, t) {
  var o = typeof e;
  return t = t ?? Op, !!t && (o == "number" || o != "symbol" && Ep.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function ta(e, t, o) {
  t == "__proto__" && gn ? gn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: o,
    writable: !0
  }) : e[t] = o;
}
function Br(e, t) {
  return e === t || e !== e && t !== t;
}
var Rp = Object.prototype, Mp = Rp.hasOwnProperty;
function Dp(e, t, o) {
  var r = e[t];
  (!(Mp.call(e, t) && Br(r, o)) || o === void 0 && !(t in e)) && ta(e, t, o);
}
function Bp(e, t, o, r) {
  var n = !o;
  o || (o = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var l = t[i], s = r ? r(o[l], e[l], l, o, e) : void 0;
    s === void 0 && (s = e[l]), n ? ta(o, l, s) : Dp(o, l, s);
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
  return (r == "number" ? Qo(o) && ea(t, o.length) : r == "string" && t in o) ? Br(o[t], e) : !1;
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
function Vp(e, t) {
  for (var o = -1, r = Array(e); ++o < e; )
    r[o] = t(o);
  return r;
}
var jp = "[object Arguments]";
function ol(e) {
  return uo(e) && Eo(e) == jp;
}
var Qs = Object.prototype, Up = Qs.hasOwnProperty, qp = Qs.propertyIsEnumerable, Gp = ol(function() {
  return arguments;
}()) ? ol : function(e) {
  return uo(e) && Up.call(e, "callee") && !qp.call(e, "callee");
};
const mn = Gp;
function Kp() {
  return !1;
}
var ed = typeof exports == "object" && exports && !exports.nodeType && exports, rl = ed && typeof module == "object" && module && !module.nodeType && module, Yp = rl && rl.exports === ed, nl = Yp ? Nt.Buffer : void 0, Xp = nl ? nl.isBuffer : void 0, Zp = Xp || Kp;
const bn = Zp;
var Jp = "[object Arguments]", Qp = "[object Array]", ev = "[object Boolean]", tv = "[object Date]", ov = "[object Error]", rv = "[object Function]", nv = "[object Map]", iv = "[object Number]", av = "[object Object]", lv = "[object RegExp]", sv = "[object Set]", dv = "[object String]", cv = "[object WeakMap]", uv = "[object ArrayBuffer]", fv = "[object DataView]", hv = "[object Float32Array]", pv = "[object Float64Array]", vv = "[object Int8Array]", gv = "[object Int16Array]", mv = "[object Int32Array]", bv = "[object Uint8Array]", xv = "[object Uint8ClampedArray]", Cv = "[object Uint16Array]", yv = "[object Uint32Array]", Ue = {};
Ue[hv] = Ue[pv] = Ue[vv] = Ue[gv] = Ue[mv] = Ue[bv] = Ue[xv] = Ue[Cv] = Ue[yv] = !0;
Ue[Jp] = Ue[Qp] = Ue[uv] = Ue[ev] = Ue[fv] = Ue[tv] = Ue[ov] = Ue[rv] = Ue[nv] = Ue[iv] = Ue[av] = Ue[lv] = Ue[sv] = Ue[dv] = Ue[cv] = !1;
function wv(e) {
  return uo(e) && oa(e.length) && !!Ue[Eo(e)];
}
function Sv(e) {
  return function(t) {
    return e(t);
  };
}
var td = typeof exports == "object" && exports && !exports.nodeType && exports, gr = td && typeof module == "object" && module && !module.nodeType && module, Pv = gr && gr.exports === td, Jn = Pv && Ys.process, kv = function() {
  try {
    var e = gr && gr.require && gr.require("util").types;
    return e || Jn && Jn.binding && Jn.binding("util");
  } catch {
  }
}();
const il = kv;
var al = il && il.isTypedArray, $v = al ? Sv(al) : wv;
const na = $v;
var Tv = Object.prototype, zv = Tv.hasOwnProperty;
function od(e, t) {
  var o = Mt(e), r = !o && mn(e), n = !o && !r && bn(e), i = !o && !r && !n && na(e), a = o || r || n || i, l = a ? Vp(e.length, String) : [], s = l.length;
  for (var d in e)
    (t || zv.call(e, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    ea(d, s))) && l.push(d);
  return l;
}
function rd(e, t) {
  return function(o) {
    return e(t(o));
  };
}
var _v = rd(Object.keys, Object);
const Iv = _v;
var Ov = Object.prototype, Ev = Ov.hasOwnProperty;
function Rv(e) {
  if (!ra(e))
    return Iv(e);
  var t = [];
  for (var o in Object(e))
    Ev.call(e, o) && o != "constructor" && t.push(o);
  return t;
}
function ia(e) {
  return Qo(e) ? od(e) : Rv(e);
}
function Mv(e) {
  var t = [];
  if (e != null)
    for (var o in Object(e))
      t.push(o);
  return t;
}
var Dv = Object.prototype, Bv = Dv.hasOwnProperty;
function Av(e) {
  if (!fo(e))
    return Mv(e);
  var t = ra(e), o = [];
  for (var r in e)
    r == "constructor" && (t || !Bv.call(e, r)) || o.push(r);
  return o;
}
function nd(e) {
  return Qo(e) ? od(e, !0) : Av(e);
}
var Fv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Hv = /^\w*$/;
function aa(e, t) {
  if (Mt(e))
    return !1;
  var o = typeof e;
  return o == "number" || o == "symbol" || o == "boolean" || e == null || Zi(e) ? !0 : Hv.test(e) || !Fv.test(e) || t != null && e in Object(t);
}
var Lv = Mo(Object, "create");
const $r = Lv;
function Wv() {
  this.__data__ = $r ? $r(null) : {}, this.size = 0;
}
function Nv(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Vv = "__lodash_hash_undefined__", jv = Object.prototype, Uv = jv.hasOwnProperty;
function qv(e) {
  var t = this.__data__;
  if ($r) {
    var o = t[e];
    return o === Vv ? void 0 : o;
  }
  return Uv.call(t, e) ? t[e] : void 0;
}
var Gv = Object.prototype, Kv = Gv.hasOwnProperty;
function Yv(e) {
  var t = this.__data__;
  return $r ? t[e] !== void 0 : Kv.call(t, e);
}
var Xv = "__lodash_hash_undefined__";
function Zv(e, t) {
  var o = this.__data__;
  return this.size += this.has(e) ? 0 : 1, o[e] = $r && t === void 0 ? Xv : t, this;
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
    if (Br(e[o][0], t))
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
function Qt(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Qt.prototype.clear = Jv;
Qt.prototype.delete = tg;
Qt.prototype.get = og;
Qt.prototype.has = rg;
Qt.prototype.set = ng;
var ig = Mo(Nt, "Map");
const Tr = ig;
function ag() {
  this.size = 0, this.__data__ = {
    hash: new _o(),
    map: new (Tr || Qt)(),
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
function eo(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++t < o; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
eo.prototype.clear = ag;
eo.prototype.delete = sg;
eo.prototype.get = dg;
eo.prototype.has = cg;
eo.prototype.set = ug;
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
  return o.cache = new (la.Cache || eo)(), o;
}
la.Cache = eo;
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
function id(e) {
  return e == null ? "" : Js(e);
}
function ad(e, t) {
  return Mt(e) ? e : aa(e, t) ? [e] : bg(id(e));
}
var xg = 1 / 0;
function _n(e) {
  if (typeof e == "string" || Zi(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -xg ? "-0" : t;
}
function ld(e, t) {
  t = ad(t, e);
  for (var o = 0, r = t.length; e != null && o < r; )
    e = e[_n(t[o++])];
  return o && o == r ? e : void 0;
}
function sa(e, t, o) {
  var r = e == null ? void 0 : ld(e, t);
  return r === void 0 ? o : r;
}
function Cg(e, t) {
  for (var o = -1, r = t.length, n = e.length; ++o < r; )
    e[n + o] = t[o];
  return e;
}
var yg = rd(Object.getPrototypeOf, Object);
const sd = yg;
var wg = "[object Object]", Sg = Function.prototype, Pg = Object.prototype, dd = Sg.toString, kg = Pg.hasOwnProperty, $g = dd.call(Object);
function Tg(e) {
  if (!uo(e) || Eo(e) != wg)
    return !1;
  var t = sd(e);
  if (t === null)
    return !0;
  var o = kg.call(t, "constructor") && t.constructor;
  return typeof o == "function" && o instanceof o && dd.call(o) == $g;
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
var Ig = "\\ud800-\\udfff", Og = "\\u0300-\\u036f", Eg = "\\ufe20-\\ufe2f", Rg = "\\u20d0-\\u20ff", Mg = Og + Eg + Rg, Dg = "\\ufe0e\\ufe0f", Bg = "\\u200d", Ag = RegExp("[" + Bg + Ig + Mg + Dg + "]");
function cd(e) {
  return Ag.test(e);
}
function Fg(e) {
  return e.split("");
}
var ud = "\\ud800-\\udfff", Hg = "\\u0300-\\u036f", Lg = "\\ufe20-\\ufe2f", Wg = "\\u20d0-\\u20ff", Ng = Hg + Lg + Wg, Vg = "\\ufe0e\\ufe0f", jg = "[" + ud + "]", ki = "[" + Ng + "]", $i = "\\ud83c[\\udffb-\\udfff]", Ug = "(?:" + ki + "|" + $i + ")", fd = "[^" + ud + "]", hd = "(?:\\ud83c[\\udde6-\\uddff]){2}", pd = "[\\ud800-\\udbff][\\udc00-\\udfff]", qg = "\\u200d", vd = Ug + "?", gd = "[" + Vg + "]?", Gg = "(?:" + qg + "(?:" + [fd, hd, pd].join("|") + ")" + gd + vd + ")*", Kg = gd + vd + Gg, Yg = "(?:" + [fd + ki + "?", ki, hd, pd, jg].join("|") + ")", Xg = RegExp($i + "(?=" + $i + ")|" + Yg + Kg, "g");
function Zg(e) {
  return e.match(Xg) || [];
}
function Jg(e) {
  return cd(e) ? Zg(e) : Fg(e);
}
function Qg(e) {
  return function(t) {
    t = id(t);
    var o = cd(t) ? Jg(t) : void 0, r = o ? o[0] : t.charAt(0), n = o ? _g(o, 1).join("") : t.slice(1);
    return r[e]() + n;
  };
}
var em = Qg("toUpperCase");
const tm = em;
function om() {
  this.__data__ = new Qt(), this.size = 0;
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
  if (o instanceof Qt) {
    var r = o.__data__;
    if (!Tr || r.length < am - 1)
      return r.push([e, t]), this.size = ++o.size, this;
    o = this.__data__ = new eo(r);
  }
  return o.set(e, t), this.size = o.size, this;
}
function Lt(e) {
  var t = this.__data__ = new Qt(e);
  this.size = t.size;
}
Lt.prototype.clear = om;
Lt.prototype.delete = rm;
Lt.prototype.get = nm;
Lt.prototype.has = im;
Lt.prototype.set = lm;
var md = typeof exports == "object" && exports && !exports.nodeType && exports, ll = md && typeof module == "object" && module && !module.nodeType && module, sm = ll && ll.exports === md, sl = sm ? Nt.Buffer : void 0, dl = sl ? sl.allocUnsafe : void 0;
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
  return Mt(e) ? r : Cg(r, o(e));
}
function ul(e) {
  return gm(e, ia, vm);
}
var mm = Mo(Nt, "DataView");
const Ti = mm;
var bm = Mo(Nt, "Promise");
const zi = bm;
var xm = Mo(Nt, "Set");
const _i = xm;
var fl = "[object Map]", Cm = "[object Object]", hl = "[object Promise]", pl = "[object Set]", vl = "[object WeakMap]", gl = "[object DataView]", ym = Ro(Ti), wm = Ro(Tr), Sm = Ro(zi), Pm = Ro(_i), km = Ro(Pi), xo = Eo;
(Ti && xo(new Ti(new ArrayBuffer(1))) != gl || Tr && xo(new Tr()) != fl || zi && xo(zi.resolve()) != hl || _i && xo(new _i()) != pl || Pi && xo(new Pi()) != vl) && (xo = function(e) {
  var t = Eo(e), o = t == Cm ? e.constructor : void 0, r = o ? Ro(o) : "";
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
      case km:
        return vl;
    }
  return t;
});
const ml = xo;
var $m = Nt.Uint8Array;
const xn = $m;
function Tm(e) {
  var t = new e.constructor(e.byteLength);
  return new xn(t).set(new xn(e)), t;
}
function zm(e, t) {
  var o = t ? Tm(e.buffer) : e.buffer;
  return new e.constructor(o, e.byteOffset, e.length);
}
function _m(e) {
  return typeof e.constructor == "function" && !ra(e) ? bp(sd(e)) : {};
}
var Im = "__lodash_hash_undefined__";
function Om(e) {
  return this.__data__.set(e, Im), this;
}
function Em(e) {
  return this.__data__.has(e);
}
function Cn(e) {
  var t = -1, o = e == null ? 0 : e.length;
  for (this.__data__ = new eo(); ++t < o; )
    this.add(e[t]);
}
Cn.prototype.add = Cn.prototype.push = Om;
Cn.prototype.has = Em;
function Rm(e, t) {
  for (var o = -1, r = e == null ? 0 : e.length; ++o < r; )
    if (t(e[o], o, e))
      return !0;
  return !1;
}
function Mm(e, t) {
  return e.has(t);
}
var Dm = 1, Bm = 2;
function bd(e, t, o, r, n, i) {
  var a = o & Dm, l = e.length, s = t.length;
  if (l != s && !(a && s > l))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var f = -1, v = !0, g = o & Bm ? new Cn() : void 0;
  for (i.set(e, t), i.set(t, e); ++f < l; ) {
    var u = e[f], p = t[f];
    if (r)
      var b = a ? r(p, u, f, t, e, i) : r(u, p, f, e, t, i);
    if (b !== void 0) {
      if (b)
        continue;
      v = !1;
      break;
    }
    if (g) {
      if (!Rm(t, function(h, S) {
        if (!Mm(g, S) && (u === h || n(u, h, o, r, i)))
          return g.push(S);
      })) {
        v = !1;
        break;
      }
    } else if (!(u === p || n(u, p, o, r, i))) {
      v = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), v;
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
var Hm = 1, Lm = 2, Wm = "[object Boolean]", Nm = "[object Date]", Vm = "[object Error]", jm = "[object Map]", Um = "[object Number]", qm = "[object RegExp]", Gm = "[object Set]", Km = "[object String]", Ym = "[object Symbol]", Xm = "[object ArrayBuffer]", Zm = "[object DataView]", bl = co ? co.prototype : void 0, Qn = bl ? bl.valueOf : void 0;
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
      return Br(+e, +t);
    case Vm:
      return e.name == t.name && e.message == t.message;
    case qm:
    case Km:
      return e == t + "";
    case jm:
      var l = Am;
    case Gm:
      var s = r & Hm;
      if (l || (l = Fm), e.size != t.size && !s)
        return !1;
      var d = a.get(e);
      if (d)
        return d == t;
      r |= Lm, a.set(e, t);
      var c = bd(l(e), l(t), r, n, i, a);
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
    var v = l[f];
    if (!(a ? v in t : tb.call(t, v)))
      return !1;
  }
  var g = i.get(e), u = i.get(t);
  if (g && u)
    return g == t && u == e;
  var p = !0;
  i.set(e, t), i.set(t, e);
  for (var b = a; ++f < s; ) {
    v = l[f];
    var h = e[v], S = t[v];
    if (r)
      var O = a ? r(S, h, v, t, e, i) : r(h, S, v, e, t, i);
    if (!(O === void 0 ? h === S || n(h, S, o, r, i) : O)) {
      p = !1;
      break;
    }
    b || (b = v == "constructor");
  }
  if (p && !b) {
    var y = e.constructor, T = t.constructor;
    y != T && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof T == "function" && T instanceof T) && (p = !1);
  }
  return i.delete(e), i.delete(t), p;
}
var rb = 1, xl = "[object Arguments]", Cl = "[object Array]", Yr = "[object Object]", nb = Object.prototype, yl = nb.hasOwnProperty;
function ib(e, t, o, r, n, i) {
  var a = Mt(e), l = Mt(t), s = a ? Cl : ml(e), d = l ? Cl : ml(t);
  s = s == xl ? Yr : s, d = d == xl ? Yr : d;
  var c = s == Yr, f = d == Yr, v = s == d;
  if (v && bn(e)) {
    if (!bn(t))
      return !1;
    a = !0, c = !1;
  }
  if (v && !c)
    return i || (i = new Lt()), a || na(e) ? bd(e, t, o, r, n, i) : Jm(e, t, s, o, r, n, i);
  if (!(o & rb)) {
    var g = c && yl.call(e, "__wrapped__"), u = f && yl.call(t, "__wrapped__");
    if (g || u) {
      var p = g ? e.value() : e, b = u ? t.value() : t;
      return i || (i = new Lt()), n(p, b, o, r, i);
    }
  }
  return v ? (i || (i = new Lt()), ob(e, t, o, r, n, i)) : !1;
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
      var f = new Lt();
      if (r)
        var v = r(d, c, s, e, t, f);
      if (!(v === void 0 ? da(c, d, ab | lb, r, f) : v))
        return !1;
    }
  }
  return !0;
}
function xd(e) {
  return e === e && !fo(e);
}
function db(e) {
  for (var t = ia(e), o = t.length; o--; ) {
    var r = t[o], n = e[r];
    t[o] = [r, n, xd(n)];
  }
  return t;
}
function Cd(e, t) {
  return function(o) {
    return o == null ? !1 : o[e] === t && (t !== void 0 || e in Object(o));
  };
}
function cb(e) {
  var t = db(e);
  return t.length == 1 && t[0][2] ? Cd(t[0][0], t[0][1]) : function(o) {
    return o === e || sb(o, e, t);
  };
}
function ub(e, t) {
  return e != null && t in Object(e);
}
function fb(e, t, o) {
  t = ad(t, e);
  for (var r = -1, n = t.length, i = !1; ++r < n; ) {
    var a = _n(t[r]);
    if (!(i = e != null && o(e, a)))
      break;
    e = e[a];
  }
  return i || ++r != n ? i : (n = e == null ? 0 : e.length, !!n && oa(n) && ea(a, n) && (Mt(e) || mn(e)));
}
function hb(e, t) {
  return e != null && fb(e, t, ub);
}
var pb = 1, vb = 2;
function gb(e, t) {
  return aa(e) && xd(t) ? Cd(_n(e), t) : function(o) {
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
    return ld(t, e);
  };
}
function xb(e) {
  return aa(e) ? mb(_n(e)) : bb(e);
}
function Cb(e) {
  return typeof e == "function" ? e : e == null ? Ji : typeof e == "object" ? Mt(e) ? gb(e[0], e[1]) : cb(e) : xb(e);
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
const yd = wb;
function Sb(e, t) {
  return e && yd(e, t, ia);
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
var kb = Pb(Sb);
const $b = kb;
function Ii(e, t, o) {
  (o !== void 0 && !Br(e[t], o) || o === void 0 && !(t in e)) && ta(e, t, o);
}
function Tb(e) {
  return uo(e) && Qo(e);
}
function Oi(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function zb(e) {
  return Bp(e, nd(e));
}
function _b(e, t, o, r, n, i, a) {
  var l = Oi(e, o), s = Oi(t, o), d = a.get(s);
  if (d) {
    Ii(e, o, d);
    return;
  }
  var c = i ? i(l, s, o + "", e, t, a) : void 0, f = c === void 0;
  if (f) {
    var v = Mt(s), g = !v && bn(s), u = !v && !g && na(s);
    c = s, v || g || u ? Mt(l) ? c = l : Tb(l) ? c = Cp(l) : g ? (f = !1, c = dm(s, !0)) : u ? (f = !1, c = zm(s, !0)) : c = [] : Tg(s) || mn(s) ? (c = l, mn(l) ? c = zb(l) : (!fo(l) || Qi(l)) && (c = _m(s))) : f = !1;
  }
  f && (a.set(s, c), n(c, s, r, i, a), a.delete(s)), Ii(e, o, c);
}
function wd(e, t, o, r, n) {
  e !== t && yd(t, function(i, a) {
    if (n || (n = new Lt()), fo(i))
      _b(e, t, a, o, wd, r, n);
    else {
      var l = r ? r(Oi(e, a), i, a + "", e, t, n) : void 0;
      l === void 0 && (l = i), Ii(e, a, l);
    }
  }, nd);
}
function Ib(e, t) {
  var o = -1, r = Qo(e) ? Array(e.length) : [];
  return $b(e, function(n, i, a) {
    r[++o] = t(n, i, a);
  }), r;
}
function Ob(e, t) {
  var o = Mt(e) ? Zs : Ib;
  return o(e, Cb(t));
}
var Eb = Wp(function(e, t, o) {
  wd(e, t, o);
});
const cr = Eb, ho = {
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
  fontFamily: Mb,
  lineHeight: Db
} = ho, Sd = N("body", `
 margin: 0;
 font-size: ${Rb};
 font-family: ${Mb};
 line-height: ${Db};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [N("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), Xt = "n-config-provider", zr = "naive-ui-style";
function Ee(e, t, o, r, n, i) {
  const a = Io(), l = Be(Xt, null);
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
      }), l != null && l.preflightStyleDisabled || Sd.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: zr,
        ssr: a
      });
    };
    a ? d() : Ni(d);
  }
  return M(() => {
    var d;
    const { theme: { common: c, self: f, peers: v = {} } = {}, themeOverrides: g = {}, builtinThemeOverrides: u = {} } = n, { common: p, peers: b } = g, { common: h = void 0, [e]: { common: S = void 0, self: O = void 0, peers: y = {} } = {} } = (l == null ? void 0 : l.mergedThemeRef.value) || {}, { common: T = void 0, [e]: I = {} } = (l == null ? void 0 : l.mergedThemeOverridesRef.value) || {}, { common: m, peers: P = {} } = I, $ = cr({}, c || S || h || r.common, T, m, p), k = cr(
      // {}, executed every time, no need for empty obj
      (d = f || O || r.self) === null || d === void 0 ? void 0 : d($),
      u,
      I,
      g
    );
    return {
      common: $,
      self: k,
      peers: cr({}, r.peers, y, v),
      peerOverrides: cr({}, u.peers, P, b)
    };
  });
}
Ee.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const Pd = "n";
function wt(e = {}, t = {
  defaultBordered: !0
}) {
  const o = Be(Xt, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: o == null ? void 0 : o.inlineThemeDisabled,
    mergedRtlRef: o == null ? void 0 : o.mergedRtlRef,
    mergedComponentPropsRef: o == null ? void 0 : o.mergedComponentPropsRef,
    mergedBreakpointsRef: o == null ? void 0 : o.mergedBreakpointsRef,
    mergedBorderedRef: M(() => {
      var r, n;
      const { bordered: i } = e;
      return i !== void 0 ? i : (n = (r = o == null ? void 0 : o.mergedBorderedRef.value) !== null && r !== void 0 ? r : t.defaultBordered) !== null && n !== void 0 ? n : !0;
    }),
    mergedClsPrefixRef: M(() => (o == null ? void 0 : o.mergedClsPrefixRef.value) || Pd),
    namespaceRef: M(() => o == null ? void 0 : o.mergedNamespaceRef.value)
  };
}
const Bb = {
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
}, Ab = Bb;
function ei(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = t.width ? String(t.width) : e.defaultWidth, r = e.formats[o] || e.formats[e.defaultWidth];
    return r;
  };
}
function ir(e) {
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
function ar(e) {
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
const Vb = Nb;
var jb = {
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
    formats: jb,
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
  era: ir({
    values: Jb,
    defaultWidth: "wide"
  }),
  quarter: ir({
    values: Qb,
    defaultWidth: "wide",
    argumentCallback: function(t) {
      return t - 1;
    }
  }),
  month: ir({
    values: e0,
    defaultWidth: "wide"
  }),
  day: ir({
    values: t0,
    defaultWidth: "wide"
  }),
  dayPeriod: ir({
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
  era: ar({
    matchPatterns: d0,
    defaultMatchWidth: "wide",
    parsePatterns: c0,
    defaultParseWidth: "any"
  }),
  quarter: ar({
    matchPatterns: u0,
    defaultMatchWidth: "wide",
    parsePatterns: f0,
    defaultParseWidth: "any",
    valueCallback: function(t) {
      return t + 1;
    }
  }),
  month: ar({
    matchPatterns: h0,
    defaultMatchWidth: "wide",
    parsePatterns: p0,
    defaultParseWidth: "any"
  }),
  day: ar({
    matchPatterns: v0,
    defaultMatchWidth: "wide",
    parsePatterns: g0,
    defaultParseWidth: "any"
  }),
  dayPeriod: ar({
    matchPatterns: m0,
    defaultMatchWidth: "any",
    parsePatterns: b0,
    defaultParseWidth: "any"
  })
};
const C0 = x0;
var y0 = {
  code: "en-US",
  formatDistance: Vb,
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
  const { mergedLocaleRef: t, mergedDateLocaleRef: o } = Be(Xt, null) || {}, r = M(() => {
    var i, a;
    return (a = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && a !== void 0 ? a : Ab[e];
  });
  return {
    dateLocaleRef: M(() => {
      var i;
      return (i = o == null ? void 0 : o.value) !== null && i !== void 0 ? i : P0;
    }),
    localeRef: r
  };
}
function er(e, t, o) {
  if (!t) {
    process.env.NODE_ENV !== "production" && ms("use-style", "No style is specified.");
    return;
  }
  const r = Io(), n = Be(Xt, null), i = () => {
    const a = o == null ? void 0 : o.value;
    t.mount({
      id: a === void 0 ? e : a + e,
      head: !0,
      anchorMetaName: zr,
      props: {
        bPrefix: a ? `.${a}-` : void 0
      },
      ssr: r
    }), n != null && n.preflightStyleDisabled || Sd.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: zr,
      ssr: r
    });
  };
  r ? i() : Ni(i);
}
function xt(e, t, o, r) {
  var n;
  o || ms("useThemeClass", "cssVarsRef is not passed");
  const i = (n = Be(Xt, null)) === null || n === void 0 ? void 0 : n.mergedThemeHashRef, a = E(""), l = Io();
  let s;
  const d = `__${e}`, c = () => {
    let f = d;
    const v = t ? t.value : void 0, g = i == null ? void 0 : i.value;
    g && (f += "-" + g), v && (f += "-" + v);
    const { themeOverrides: u, builtinThemeOverrides: p } = r;
    u && (f += "-" + Sr(JSON.stringify(u))), p && (f += "-" + Sr(JSON.stringify(p))), a.value = f, s = () => {
      const b = o.value;
      let h = "";
      for (const S in b)
        h += `${S}: ${b[S]};`;
      N(`.${f}`, h).mount({
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
function Do(e, t, o) {
  if (!t)
    return;
  const r = Io(), n = M(() => {
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
const k0 = Ce({
  name: "Add",
  render() {
    return x(
      "svg",
      { width: "512", height: "512", viewBox: "0 0 512 512", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      x("path", { d: "M256 112V400M400 256H112", stroke: "currentColor", "stroke-width": "32", "stroke-linecap": "round", "stroke-linejoin": "round" })
    );
  }
});
function kd(e, t) {
  return Ce({
    name: tm(e),
    setup() {
      var o;
      const r = (o = Be(Xt, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var n;
        const i = (n = r == null ? void 0 : r.value) === null || n === void 0 ? void 0 : n[e];
        return i ? i() : t;
      };
    }
  });
}
const $0 = Ce({
  name: "Checkmark",
  render() {
    return x(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
      x(
        "g",
        { fill: "none" },
        x("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" })
      )
    );
  }
}), T0 = kd("close", x(
  "svg",
  { viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": !0 },
  x(
    "g",
    { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
    x(
      "g",
      { fill: "currentColor", "fill-rule": "nonzero" },
      x("path", { d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z" })
    )
  )
)), z0 = Ce({
  name: "Eye",
  render() {
    return x(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      x("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }),
      x("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" })
    );
  }
}), _0 = Ce({
  name: "EyeOff",
  render() {
    return x(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      x("path", { d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z", fill: "currentColor" }),
      x("path", { d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z", fill: "currentColor" }),
      x("path", { d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z", fill: "currentColor" }),
      x("path", { d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z", fill: "currentColor" }),
      x("path", { d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z", fill: "currentColor" })
    );
  }
}), I0 = Ce({
  name: "Empty",
  render() {
    return x(
      "svg",
      { viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      x("path", { d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z", fill: "currentColor" }),
      x("path", { d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z", fill: "currentColor" })
    );
  }
}), O0 = Ce({
  name: "Remove",
  render() {
    return x(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
      x("line", { x1: "400", y1: "256", x2: "112", y2: "256", style: `
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      ` })
    );
  }
}), E0 = Ce({
  name: "ChevronDown",
  render() {
    return x(
      "svg",
      { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      x("path", { d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z", fill: "currentColor" })
    );
  }
}), R0 = kd("clear", x(
  "svg",
  { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
  x(
    "g",
    { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
    x(
      "g",
      { fill: "currentColor", "fill-rule": "nonzero" },
      x("path", { d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z" })
    )
  )
)), On = Ce({
  name: "BaseIconSwitchTransition",
  setup(e, { slots: t }) {
    const o = Dr();
    return () => x(Yt, { name: "icon-switch-transition", appear: o.value }, t);
  }
}), M0 = Ce({
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
      const l = e.group ? hu : Yt;
      return x(l, {
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
}), D0 = R("base-icon", `
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
 `)]), Zt = Ce({
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
    er("-base-icon", D0, ke(e, "clsPrefix"));
  },
  render() {
    return x("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots);
  }
}), B0 = R("base-close", `
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
 `), Qe("disabled", [N("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), N("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), N("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), N("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), N("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), J("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), J("round", [N("&::before", `
 border-radius: 50%;
 `)])]), A0 = Ce({
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
    return er("-base-close", B0, ke(e, "clsPrefix")), () => {
      const { clsPrefix: t, disabled: o, absolute: r, round: n, isButtonTag: i } = e;
      return x(
        i ? "button" : "div",
        { type: i ? "button" : void 0, tabindex: o || !e.focusable ? -1 : 0, "aria-disabled": o, "aria-label": "close", role: i ? void 0 : "button", disabled: o, class: [
          `${t}-base-close`,
          r && `${t}-base-close--absolute`,
          o && `${t}-base-close--disabled`,
          n && `${t}-base-close--round`
        ], onMousedown: (l) => {
          e.focusable || l.preventDefault();
        }, onClick: e.onClick },
        x(Zt, { clsPrefix: t }, {
          default: () => x(T0, null)
        })
      );
    };
  }
}), F0 = Ce({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => x("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: e.onFocus, onBlur: e.onBlur });
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
const L0 = N([N("@keyframes loading-container-rotate", `
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
 `), R("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [B("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [_r()]), B("container", `
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
 `, [B("svg", `
 stroke: var(--n-text-color);
 fill: transparent;
 position: absolute;
 height: 100%;
 overflow: hidden;
 `), B("container-layer", `
 position: absolute;
 width: 100%;
 height: 100%;
 animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 `, [B("container-layer-left", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [B("svg", `
 animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 width: 200%;
 `)]), B("container-layer-patch", `
 position: absolute;
 top: 0;
 left: 47.5%;
 box-sizing: border-box;
 width: 5%;
 height: 100%;
 overflow: hidden;
 `, [B("svg", `
 left: -900%;
 width: 2000%;
 transform: rotate(180deg);
 `)]), B("container-layer-right", `
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `, [B("svg", `
 animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 left: -100%;
 width: 200%;
 `)])])]), B("placeholder", `
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
}, ca = Ce({
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
    er("-base-loading", L0, ke(e, "clsPrefix"));
  },
  render() {
    const { clsPrefix: e, radius: t, strokeWidth: o, stroke: r, scale: n } = this, i = t / n;
    return x(
      "div",
      { class: `${e}-base-loading`, role: "img", "aria-label": "loading" },
      x(On, null, {
        default: () => this.show ? x(
          "div",
          { key: "icon", class: `${e}-base-loading__transition-wrapper` },
          x(
            "div",
            { class: `${e}-base-loading__container` },
            x(
              "div",
              { class: `${e}-base-loading__container-layer` },
              x(
                "div",
                { class: `${e}-base-loading__container-layer-left` },
                x(
                  "svg",
                  { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                  x("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                )
              ),
              x(
                "div",
                { class: `${e}-base-loading__container-layer-patch` },
                x(
                  "svg",
                  { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                  x("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                )
              ),
              x(
                "div",
                { class: `${e}-base-loading__container-layer-right` },
                x(
                  "svg",
                  { class: `${e}-base-loading__svg`, viewBox: `0 0 ${2 * i} ${2 * i}`, xmlns: "http://www.w3.org/2000/svg", style: { color: r } },
                  x("circle", { fill: "none", stroke: "currentColor", "stroke-width": o, "stroke-linecap": "round", cx: i, cy: i, r: t - o / 2, "stroke-dasharray": 4.91 * t, "stroke-dashoffset": 2.46 * t })
                )
              )
            )
          )
        ) : x("div", { key: "placeholder", class: `${e}-base-loading__placeholder` }, this.$slots)
      })
    );
  }
});
function wl(e) {
  return Array.isArray(e) ? e : [e];
}
const Ei = {
  STOP: "STOP"
};
function $d(e, t) {
  const o = t(e);
  e.children !== void 0 && o !== Ei.STOP && e.children.forEach((r) => $d(r, t));
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
function V0(e, t) {
  const { isLeaf: o } = e;
  return o !== void 0 ? o : !t(e);
}
function j0(e) {
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
  const v = s === "parent", g = s === "child" || l, u = f, p = /* @__PURE__ */ new Set(), b = Math.max.apply(null, Array.from(c.keys()));
  for (let h = b; h >= 0; h -= 1) {
    const S = h === 0, O = c.get(h);
    for (const y of O) {
      if (y.isLeaf)
        continue;
      const { key: T, shallowLoaded: I } = y;
      if (g && I && y.children.forEach((k) => {
        !k.disabled && !k.isLeaf && k.shallowLoaded && u.has(k.key) && u.delete(k.key);
      }), y.disabled || !I)
        continue;
      let m = !0, P = !1, $ = !0;
      for (const k of y.children) {
        const _ = k.key;
        if (!k.disabled) {
          if ($ && ($ = !1), u.has(_))
            P = !0;
          else if (p.has(_)) {
            P = !0, m = !1;
            break;
          } else if (m = !1, P)
            break;
        }
      }
      m && !$ ? (v && y.children.forEach((k) => {
        !k.disabled && u.has(k.key) && u.delete(k.key);
      }), u.add(T)) : P && p.add(T), S && g && u.has(T) && u.delete(T);
    }
  }
  return {
    checkedKeys: Array.from(u),
    indeterminateKeys: Array.from(p)
  };
}
function yn(e, t, o, r) {
  const { treeNodeMap: n, getChildren: i } = t, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const d = n.get(s);
    d !== void 0 && $d(d, (c) => {
      if (c.disabled)
        return Ei.STOP;
      const { key: f } = c;
      if (!a.has(f) && (a.add(f), l.add(f), Y0(c.rawNode, i))) {
        if (r)
          return Ei.STOP;
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
function Td(e, t, o, r, n, i = null, a = 0) {
  const l = [];
  return e.forEach((s, d) => {
    var c;
    process.env.NODE_ENV !== "production" && X0(s, n) && console.error("[treemate]: node", s, "is invalid");
    const f = Object.create(r);
    if (f.rawNode = s, f.siblings = l, f.level = a, f.index = d, f.isFirstChild = d === 0, f.isLastChild = d + 1 === e.length, f.parent = i, !f.ignored) {
      const v = n(s);
      Array.isArray(v) && (f.children = Td(v, t, o, r, n, f, a + 1));
    }
    l.push(f), t.set(f.key, f), o.has(a) || o.set(a, []), (c = o.get(a)) === null || c === void 0 || c.push(f);
  }), l;
}
function hx(e, t = {}) {
  var o;
  const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), { getDisabled: i = K0, getIgnored: a = q0, getIsGroup: l = Q0, getKey: s = U0 } = t, d = (o = t.getChildren) !== null && o !== void 0 ? o : j0, c = t.ignoreEmptyChildren ? (y) => {
    const T = d(y);
    return Array.isArray(T) ? T.length ? T : null : T;
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
      return V0(this.rawNode, c);
    },
    get shallowLoaded() {
      return G0(this.rawNode, c);
    },
    get ignored() {
      return a(this.rawNode);
    },
    contains(y) {
      return fx(this, y);
    }
  }, cx), v = Td(e, r, n, f, c);
  function g(y) {
    if (y == null)
      return null;
    const T = r.get(y);
    return T && !T.isGroup && !T.ignored ? T : null;
  }
  function u(y) {
    if (y == null)
      return null;
    const T = r.get(y);
    return T && !T.ignored ? T : null;
  }
  function p(y, T) {
    const I = u(y);
    return I ? I.getPrev(T) : null;
  }
  function b(y, T) {
    const I = u(y);
    return I ? I.getNext(T) : null;
  }
  function h(y) {
    const T = u(y);
    return T ? T.getParent() : null;
  }
  function S(y) {
    const T = u(y);
    return T ? T.getChild() : null;
  }
  const O = {
    treeNodes: v,
    treeNodeMap: r,
    levelTreeNodeMap: n,
    maxLevel: Math.max(...n.keys()),
    getChildren: c,
    getFlattenedNodes(y) {
      return ux(v, y);
    },
    getNode: g,
    getPrev: p,
    getNext: b,
    getParent: h,
    getChild: S,
    getFirstAvailableNode() {
      return ax(v);
    },
    getPath(y, T = {}) {
      return ix(y, T, O);
    },
    getCheckedKeys(y, T = {}) {
      const { cascade: I = !0, leafOnly: m = !1, checkStrategy: P = "all", allowNotLoaded: $ = !1 } = T;
      return ri({
        checkedKeys: ti(y),
        indeterminateKeys: oi(y),
        cascade: I,
        leafOnly: m,
        checkStrategy: P,
        allowNotLoaded: $
      }, O);
    },
    check(y, T, I = {}) {
      const { cascade: m = !0, leafOnly: P = !1, checkStrategy: $ = "all", allowNotLoaded: k = !1 } = I;
      return ri({
        checkedKeys: ti(T),
        indeterminateKeys: oi(T),
        keysToCheck: y == null ? [] : wl(y),
        cascade: m,
        leafOnly: P,
        checkStrategy: $,
        allowNotLoaded: k
      }, O);
    },
    uncheck(y, T, I = {}) {
      const { cascade: m = !0, leafOnly: P = !1, checkStrategy: $ = "all", allowNotLoaded: k = !1 } = I;
      return ri({
        checkedKeys: ti(T),
        indeterminateKeys: oi(T),
        keysToUncheck: y == null ? [] : wl(y),
        cascade: m,
        leafOnly: P,
        checkStrategy: $,
        allowNotLoaded: k
      }, O);
    },
    getNonLeafKeys(y = {}) {
      return N0(v, y);
    }
  };
  return O;
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
}, px = Wt(re.neutralBase), zd = Wt(re.neutralInvertBase), vx = "rgba(" + zd.slice(0, 3).join(", ") + ", ";
function Re(e) {
  return vx + String(e) + ")";
}
function gx(e) {
  const t = Array.from(zd);
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
  textColor1: Re(re.alpha1),
  textColor2: Re(re.alpha2),
  textColor3: Re(re.alpha3),
  // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
  // textColor5: overlay(base.alpha5),
  textColorDisabled: Re(re.alpha4),
  placeholderColor: Re(re.alpha4),
  placeholderColorDisabled: Re(re.alpha5),
  iconColor: Re(re.alpha4),
  iconColorDisabled: Re(re.alpha5),
  iconColorHover: Re(Number(re.alpha4) * 1.25),
  iconColorPressed: Re(Number(re.alpha4) * 0.8),
  opacity1: re.alpha1,
  opacity2: re.alpha2,
  opacity3: re.alpha3,
  opacity4: re.alpha4,
  opacity5: re.alpha5,
  dividerColor: Re(re.alphaDivider),
  borderColor: Re(re.alphaBorder),
  // close
  closeIconColorHover: Re(Number(re.alphaClose)),
  closeIconColor: Re(Number(re.alphaClose)),
  closeIconColorPressed: Re(Number(re.alphaClose)),
  closeColorHover: "rgba(255, 255, 255, .12)",
  closeColorPressed: "rgba(255, 255, 255, .08)",
  // clear
  clearColor: Re(re.alpha4),
  clearColorHover: Je(Re(re.alpha4), { alpha: 1.25 }),
  clearColorPressed: Je(Re(re.alpha4), { alpha: 0.8 }),
  scrollbarColor: Re(re.alphaScrollbar),
  scrollbarColorHover: Re(re.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: Re(re.alphaProgressRail),
  railColor: Re(re.alphaRail),
  popoverColor: re.neutralPopover,
  tableColor: re.neutralCard,
  cardColor: re.neutralCard,
  modalColor: re.neutralModal,
  bodyColor: re.neutralBody,
  tagColor: gx(re.alphaTag),
  avatarColor: Re(re.alphaAvatar),
  invertedColor: re.neutralBase,
  inputColor: Re(re.alphaInput),
  codeColor: Re(re.alphaCode),
  tabColor: Re(re.alphaTab),
  actionColor: Re(re.alphaAction),
  tableHeaderColor: Re(re.alphaAction),
  hoverColor: Re(re.alphaPending),
  tableColorHover: Re(re.alphaTablePending),
  tableColorStriped: Re(re.alphaTableStriped),
  pressedColor: Re(re.alphaPressed),
  opacityDisabled: re.alphaDisabled,
  inputColorDisabled: Re(re.alphaDisabledInput),
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
}, bx = Wt(pe.neutralBase), _d = Wt(pe.neutralInvertBase), xx = "rgba(" + _d.slice(0, 3).join(", ") + ", ";
function Pl(e) {
  return xx + String(e) + ")";
}
function ct(e) {
  const t = Array.from(_d);
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
}), mt = Cx, yx = {
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
}, Id = (e) => {
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
  common: mt,
  self: Id
}, fa = wx, Sx = {
  name: "Empty",
  common: ee,
  self: Id
}, Bo = Sx, Px = R("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [B("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [N("+", [B("description", `
 margin-top: 8px;
 `)])]), B("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), B("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), kx = Object.assign(Object.assign({}, Ee.props), { description: String, showDescription: {
  type: Boolean,
  default: !0
}, showIcon: {
  type: Boolean,
  default: !0
}, size: {
  type: String,
  default: "medium"
}, renderIcon: Function }), $x = Ce({
  name: "Empty",
  props: kx,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = wt(e), r = Ee("Empty", "-empty", Px, fa, e, t), { localeRef: n } = In("Empty"), i = Be(Xt, null), a = M(() => {
      var c, f, v;
      return (c = e.description) !== null && c !== void 0 ? c : (v = (f = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || f === void 0 ? void 0 : f.Empty) === null || v === void 0 ? void 0 : v.description;
    }), l = M(() => {
      var c, f;
      return ((f = (c = i == null ? void 0 : i.mergedComponentPropsRef.value) === null || c === void 0 ? void 0 : c.Empty) === null || f === void 0 ? void 0 : f.renderIcon) || (() => x(I0, null));
    }), s = M(() => {
      const { size: c } = e, { common: { cubicBezierEaseInOut: f }, self: { [oe("iconSize", c)]: v, [oe("fontSize", c)]: g, textColor: u, iconColor: p, extraTextColor: b } } = r.value;
      return {
        "--n-icon-size": v,
        "--n-font-size": g,
        "--n-bezier": f,
        "--n-text-color": u,
        "--n-icon-color": p,
        "--n-extra-text-color": b
      };
    }), d = o ? xt("empty", M(() => {
      let c = "";
      const { size: f } = e;
      return c += f[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: l,
      localizedDescription: M(() => a.value || n.value.description),
      cssVars: o ? void 0 : s,
      themeClass: d == null ? void 0 : d.themeClass,
      onRender: d == null ? void 0 : d.onRender
    };
  },
  render() {
    const { $slots: e, mergedClsPrefix: t, onRender: o } = this;
    return o == null || o(), x(
      "div",
      { class: [`${t}-empty`, this.themeClass], style: this.cssVars },
      this.showIcon ? x("div", { class: `${t}-empty__icon` }, e.icon ? e.icon() : x(Zt, { clsPrefix: t }, { default: this.mergedRenderIcon })) : null,
      this.showDescription ? x("div", { class: `${t}-empty__description` }, e.default ? e.default() : this.localizedDescription) : null,
      e.extra ? x("div", { class: `${t}-empty__extra` }, e.extra()) : null
    );
  }
}), Od = (e) => {
  const { scrollbarColor: t, scrollbarColorHover: o } = e;
  return {
    color: t,
    colorHover: o
  };
}, Tx = {
  name: "Scrollbar",
  common: mt,
  self: Od
}, Ed = Tx, zx = {
  name: "Scrollbar",
  common: ee,
  self: Od
}, St = zx, {
  cubicBezierEaseInOut: kl
} = ho;
function _x({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: o = "0.2s",
  enterCubicBezier: r = kl,
  leaveCubicBezier: n = kl
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
const Ix = R("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [N(">", [R("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `, [N("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), N(">", [R("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), N(">, +", [R("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `, [J("horizontal", `
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `, [N(">", [B("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), J("vertical", `
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `, [N(">", [B("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), J("disabled", [N(">", [B("scrollbar", {
  pointerEvents: "none"
})])]), N(">", [B("scrollbar", `
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [_x(), N("&:hover", {
  backgroundColor: "var(--n-scrollbar-color-hover)"
})])])])])]), Ox = Object.assign(Object.assign({}, Ee.props), {
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
}), Rd = Ce({
  name: "Scrollbar",
  props: Ox,
  inheritAttrs: !1,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o, mergedRtlRef: r } = wt(e), n = Do("Scrollbar", r, t), i = E(null), a = E(null), l = E(null), s = E(null), d = E(null), c = E(null), f = E(null), v = E(null), g = E(null), u = E(null), p = E(null), b = E(0), h = E(0), S = E(!1), O = E(!1);
    let y = !1, T = !1, I, m, P = 0, $ = 0, k = 0, _ = 0;
    const w = Wf(), F = M(() => {
      const { value: C } = v, { value: A } = c, { value: Z } = u;
      return C === null || A === null || Z === null ? 0 : Math.min(C, Z * C / A + e.size * 1.5);
    }), L = M(() => `${F.value}px`), G = M(() => {
      const { value: C } = g, { value: A } = f, { value: Z } = p;
      return C === null || A === null || Z === null ? 0 : Z * C / A + e.size * 1.5;
    }), Y = M(() => `${G.value}px`), j = M(() => {
      const { value: C } = v, { value: A } = b, { value: Z } = c, { value: se } = u;
      if (C === null || Z === null || se === null)
        return 0;
      {
        const ce = Z - C;
        return ce ? A / ce * (se - F.value) : 0;
      }
    }), ne = M(() => `${j.value}px`), H = M(() => {
      const { value: C } = g, { value: A } = h, { value: Z } = f, { value: se } = p;
      if (C === null || Z === null || se === null)
        return 0;
      {
        const ce = Z - C;
        return ce ? A / ce * (se - G.value) : 0;
      }
    }), U = M(() => `${H.value}px`), de = M(() => {
      const { value: C } = v, { value: A } = c;
      return C !== null && A !== null && A > C;
    }), Se = M(() => {
      const { value: C } = g, { value: A } = f;
      return C !== null && A !== null && A > C;
    }), Ie = M(() => {
      const { trigger: C } = e;
      return C === "none" || S.value;
    }), Me = M(() => {
      const { trigger: C } = e;
      return C === "none" || O.value;
    }), $e = M(() => {
      const { container: C } = e;
      return C ? C() : a.value;
    }), ue = M(() => {
      const { content: C } = e;
      return C ? C() : l.value;
    }), me = Ah(() => {
      e.container || Ve({
        top: b.value,
        left: h.value
      });
    }), ze = () => {
      me.isDeactivated || q();
    }, ae = (C) => {
      if (me.isDeactivated)
        return;
      const { onResize: A } = e;
      A && A(C), q();
    }, Ve = (C, A) => {
      if (!e.scrollable)
        return;
      if (typeof C == "number") {
        je(A ?? 0, C, 0, !1, "auto");
        return;
      }
      const { left: Z, top: se, index: ce, elSize: ve, position: be, behavior: Pe, el: tt, debounce: kt = !0 } = C;
      (Z !== void 0 || se !== void 0) && je(Z ?? 0, se ?? 0, 0, !1, Pe), tt !== void 0 ? je(0, tt.offsetTop, tt.offsetHeight, kt, Pe) : ce !== void 0 && ve !== void 0 ? je(0, ce * ve, ve, kt, Pe) : be === "bottom" ? je(0, Number.MAX_SAFE_INTEGER, 0, !1, Pe) : be === "top" && je(0, 0, 0, !1, Pe);
    }, Fe = (C, A) => {
      if (!e.scrollable)
        return;
      const { value: Z } = $e;
      Z && (typeof C == "object" ? Z.scrollBy(C) : Z.scrollBy(C, A || 0));
    };
    function je(C, A, Z, se, ce) {
      const { value: ve } = $e;
      if (ve) {
        if (se) {
          const { scrollTop: be, offsetHeight: Pe } = ve;
          if (A > be) {
            A + Z <= be + Pe || ve.scrollTo({
              left: C,
              top: A + Z - Pe,
              behavior: ce
            });
            return;
          }
        }
        ve.scrollTo({
          left: C,
          top: A,
          behavior: ce
        });
      }
    }
    function Ge() {
      le(), xe(), q();
    }
    function Ze() {
      lt();
    }
    function lt() {
      pt(), X();
    }
    function pt() {
      m !== void 0 && window.clearTimeout(m), m = window.setTimeout(() => {
        O.value = !1;
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
    function xe() {
      m !== void 0 && window.clearTimeout(m), O.value = !0;
    }
    function ie(C) {
      const { onScroll: A } = e;
      A && A(C), W();
    }
    function W() {
      const { value: C } = $e;
      C && (b.value = C.scrollTop, h.value = C.scrollLeft * (n != null && n.value ? -1 : 1));
    }
    function Q() {
      const { value: C } = ue;
      C && (c.value = C.offsetHeight, f.value = C.offsetWidth);
      const { value: A } = $e;
      A && (v.value = A.offsetHeight, g.value = A.offsetWidth);
      const { value: Z } = d, { value: se } = s;
      Z && (p.value = Z.offsetWidth), se && (u.value = se.offsetHeight);
    }
    function D() {
      const { value: C } = $e;
      C && (b.value = C.scrollTop, h.value = C.scrollLeft * (n != null && n.value ? -1 : 1), v.value = C.offsetHeight, g.value = C.offsetWidth, c.value = C.scrollHeight, f.value = C.scrollWidth);
      const { value: A } = d, { value: Z } = s;
      A && (p.value = A.offsetWidth), Z && (u.value = Z.offsetHeight);
    }
    function q() {
      e.scrollable && (e.useUnifiedContainer ? D() : (Q(), W()));
    }
    function te(C) {
      var A;
      return !(!((A = i.value) === null || A === void 0) && A.contains(Cr(C)));
    }
    function ye(C) {
      C.preventDefault(), C.stopPropagation(), T = !0, Ke("mousemove", window, _e, !0), Ke("mouseup", window, He, !0), $ = h.value, k = n != null && n.value ? window.innerWidth - C.clientX : C.clientX;
    }
    function _e(C) {
      if (!T)
        return;
      I !== void 0 && window.clearTimeout(I), m !== void 0 && window.clearTimeout(m);
      const { value: A } = g, { value: Z } = f, { value: se } = G;
      if (A === null || Z === null)
        return;
      const ve = (n != null && n.value ? window.innerWidth - C.clientX - k : C.clientX - k) * (Z - A) / (A - se), be = Z - A;
      let Pe = $ + ve;
      Pe = Math.min(be, Pe), Pe = Math.max(Pe, 0);
      const { value: tt } = $e;
      if (tt) {
        tt.scrollLeft = Pe * (n != null && n.value ? -1 : 1);
        const { internalOnUpdateScrollLeft: kt } = e;
        kt && kt(Pe);
      }
    }
    function He(C) {
      C.preventDefault(), C.stopPropagation(), qe("mousemove", window, _e, !0), qe("mouseup", window, He, !0), T = !1, q(), te(C) && lt();
    }
    function et(C) {
      C.preventDefault(), C.stopPropagation(), y = !0, Ke("mousemove", window, Le, !0), Ke("mouseup", window, We, !0), P = b.value, _ = C.clientY;
    }
    function Le(C) {
      if (!y)
        return;
      I !== void 0 && window.clearTimeout(I), m !== void 0 && window.clearTimeout(m);
      const { value: A } = v, { value: Z } = c, { value: se } = F;
      if (A === null || Z === null)
        return;
      const ve = (C.clientY - _) * (Z - A) / (A - se), be = Z - A;
      let Pe = P + ve;
      Pe = Math.min(be, Pe), Pe = Math.max(Pe, 0);
      const { value: tt } = $e;
      tt && (tt.scrollTop = Pe);
    }
    function We(C) {
      C.preventDefault(), C.stopPropagation(), qe("mousemove", window, Le, !0), qe("mouseup", window, We, !0), y = !1, q(), te(C) && lt();
    }
    ht(() => {
      const { value: C } = Se, { value: A } = de, { value: Z } = t, { value: se } = d, { value: ce } = s;
      se && (C ? se.classList.remove(`${Z}-scrollbar-rail--disabled`) : se.classList.add(`${Z}-scrollbar-rail--disabled`)), ce && (A ? ce.classList.remove(`${Z}-scrollbar-rail--disabled`) : ce.classList.add(`${Z}-scrollbar-rail--disabled`));
    }), yt(() => {
      e.container || q();
    }), Ct(() => {
      I !== void 0 && window.clearTimeout(I), m !== void 0 && window.clearTimeout(m), qe("mousemove", window, Le, !0), qe("mouseup", window, We, !0);
    });
    const dt = Ee("Scrollbar", "-scrollbar", Ix, Ed, e, t), It = M(() => {
      const { common: { cubicBezierEaseInOut: C, scrollbarBorderRadius: A, scrollbarHeight: Z, scrollbarWidth: se }, self: { color: ce, colorHover: ve } } = dt.value;
      return {
        "--n-scrollbar-bezier": C,
        "--n-scrollbar-color": ce,
        "--n-scrollbar-color-hover": ve,
        "--n-scrollbar-border-radius": A,
        "--n-scrollbar-width": se,
        "--n-scrollbar-height": Z
      };
    }), st = o ? xt("scrollbar", void 0, It, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: Ve,
      scrollBy: Fe,
      sync: q,
      syncUnifiedContainer: D,
      handleMouseEnterWrapper: Ge,
      handleMouseLeaveWrapper: Ze
    }), {
      mergedClsPrefix: t,
      rtlEnabled: n,
      containerScrollTop: b,
      wrapperRef: i,
      containerRef: a,
      contentRef: l,
      yRailRef: s,
      xRailRef: d,
      needYBar: de,
      needXBar: Se,
      yBarSizePx: L,
      xBarSizePx: Y,
      yBarTopPx: ne,
      xBarLeftPx: U,
      isShowXBar: Ie,
      isShowYBar: Me,
      isIos: w,
      handleScroll: ie,
      handleContentResize: ze,
      handleContainerResize: ae,
      handleYScrollMouseDown: et,
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
    const a = this.trigger === "none", l = () => x("div", { ref: "yRailRef", class: [
      `${o}-scrollbar-rail`,
      `${o}-scrollbar-rail--vertical`
    ], "data-scrollbar-rail": !0, style: this.verticalRailStyle, "aria-hidden": !0 }, x(a ? bi : Yt, a ? null : { name: "fade-in-transition" }, {
      default: () => this.needYBar && this.isShowYBar && !this.isIos ? x("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
        height: this.yBarSizePx,
        top: this.yBarTopPx
      }, onMousedown: this.handleYScrollMouseDown }) : null
    })), s = () => {
      var c, f;
      return (c = this.onRender) === null || c === void 0 || c.call(this), x("div", Wi(this.$attrs, {
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
        this.container ? (f = t.default) === null || f === void 0 ? void 0 : f.call(t) : x(
          "div",
          { role: "none", ref: "containerRef", class: [
            `${o}-scrollbar-container`,
            this.containerClass
          ], style: this.containerStyle, onScroll: this.handleScroll, onWheel: this.onWheel },
          x(kr, { onResize: this.handleContentResize }, {
            default: () => x("div", { ref: "contentRef", role: "none", style: [
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
        this.xScrollable && x("div", { ref: "xRailRef", class: [
          `${o}-scrollbar-rail`,
          `${o}-scrollbar-rail--horizontal`
        ], style: this.horizontalRailStyle, "data-scrollbar-rail": !0, "aria-hidden": !0 }, x(a ? bi : Yt, a ? null : { name: "fade-in-transition" }, {
          default: () => this.needXBar && this.isShowXBar && !this.isIos ? x("div", { class: `${o}-scrollbar-rail__scrollbar`, style: {
            width: this.xBarSizePx,
            right: n ? this.xBarLeftPx : void 0,
            left: n ? void 0 : this.xBarLeftPx
          }, onMousedown: this.handleXScrollMouseDown }) : null
        }))
      ]);
    }, d = this.container ? s() : x(kr, { onResize: this.handleContainerResize }, {
      default: s
    });
    return i ? x(
      Jt,
      null,
      d,
      l()
    ) : d;
  }
}), Md = Rd, Ex = Rd, Rx = {
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
}, Dd = (e) => {
  const { borderRadius: t, popoverColor: o, textColor3: r, dividerColor: n, textColor2: i, primaryColorPressed: a, textColorDisabled: l, primaryColor: s, opacityDisabled: d, hoverColor: c, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: g, fontSizeHuge: u, heightSmall: p, heightMedium: b, heightLarge: h, heightHuge: S } = e;
  return Object.assign(Object.assign({}, Rx), { optionFontSizeSmall: f, optionFontSizeMedium: v, optionFontSizeLarge: g, optionFontSizeHuge: u, optionHeightSmall: p, optionHeightMedium: b, optionHeightLarge: h, optionHeightHuge: S, borderRadius: t, color: o, groupHeaderTextColor: r, actionDividerColor: n, optionTextColor: i, optionTextColorPressed: a, optionTextColorDisabled: l, optionTextColorActive: s, optionOpacityDisabled: d, optionCheckColor: s, optionColorPending: c, optionColorActive: "rgba(0, 0, 0, 0)", optionColorActivePending: c, actionTextColor: i, loadingColor: s });
}, Mx = {
  name: "InternalSelectMenu",
  common: mt,
  peers: {
    Scrollbar: Ed,
    Empty: fa
  },
  self: Dd
}, Bd = Mx, Dx = {
  name: "InternalSelectMenu",
  common: ee,
  peers: {
    Scrollbar: St,
    Empty: Bo
  },
  self: Dd
}, Ar = Dx;
function Bx(e, t) {
  return x(Yt, { name: "fade-in-scale-up-transition" }, {
    default: () => e ? x(Zt, { clsPrefix: t, class: `${t}-base-select-option__check` }, {
      default: () => x($0)
    }) : null
  });
}
const $l = Ce({
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
      handleOptionMouseEnter: v
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = Be(Ui), g = Xe(() => {
      const { value: h } = o;
      return h ? e.tmNode.key === h.key : !1;
    });
    function u(h) {
      const { tmNode: S } = e;
      S.disabled || f(h, S);
    }
    function p(h) {
      const { tmNode: S } = e;
      S.disabled || v(h, S);
    }
    function b(h) {
      const { tmNode: S } = e, { value: O } = g;
      S.disabled || O || v(h, S);
    }
    return {
      multiple: r,
      isGrouped: Xe(() => {
        const { tmNode: h } = e, { parent: S } = h;
        return S && S.rawNode.type === "group";
      }),
      showCheckmark: d,
      nodeProps: c,
      isPending: g,
      isSelected: Xe(() => {
        const { value: h } = t, { value: S } = r;
        if (h === null)
          return !1;
        const O = e.tmNode.rawNode[s.value];
        if (S) {
          const { value: y } = n;
          return y.has(O);
        } else
          return h === O;
      }),
      labelField: l,
      renderLabel: i,
      renderOption: a,
      handleMouseMove: b,
      handleMouseEnter: p,
      handleClick: u
    };
  },
  render() {
    const { clsPrefix: e, tmNode: { rawNode: t }, isSelected: o, isPending: r, isGrouped: n, showCheckmark: i, nodeProps: a, renderOption: l, renderLabel: s, handleClick: d, handleMouseEnter: c, handleMouseMove: f } = this, v = Bx(o, e), g = s ? [s(t, o), i && v] : [
      Go(t[this.labelField], t, o),
      i && v
    ], u = a == null ? void 0 : a(t), p = x(
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
      ], style: [(u == null ? void 0 : u.style) || "", t.style || ""], onClick: Vn([d, u == null ? void 0 : u.onClick]), onMouseenter: Vn([
        c,
        u == null ? void 0 : u.onMouseenter
      ]), onMousemove: Vn([f, u == null ? void 0 : u.onMousemove]) }),
      x("div", { class: `${e}-base-select-option__content` }, g)
    );
    return t.render ? t.render({ node: p, option: t, selected: o }) : l ? l({ node: p, option: t, selected: o }) : p;
  }
}), Tl = Ce({
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
    const { clsPrefix: e, renderLabel: t, renderOption: o, nodeProps: r, tmNode: { rawNode: n } } = this, i = r == null ? void 0 : r(n), a = t ? t(n, !1) : Go(n[this.labelField], n, !1), l = x("div", Object.assign({}, i, { class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class] }), a);
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
  return [N("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${zl}, transform ${t} ${zl} ${n && "," + n}`
  }), N("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${_l}, transform ${t} ${_l} ${n && "," + n}`
  }), N("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${r} scale(${o})`
  }), N("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${r} scale(1)`
  })];
}
const Ax = R("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [R("scrollbar", `
 max-height: var(--n-height);
 `), R("virtual-list", `
 max-height: var(--n-height);
 `), R("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [B("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), R("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), R("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), B("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), B("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), B("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), R("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), R("base-select-option", `
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
 `), J("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), J("pending", [N("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), J("selected", `
 color: var(--n-option-text-color-active);
 `, [N("&::before", `
 background-color: var(--n-option-color-active);
 `), J("pending", [N("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), J("disabled", `
 cursor: not-allowed;
 `, [Qe("selected", `
 color: var(--n-option-text-color-disabled);
 `), J("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), B("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [wn({
  enterScale: "0.5"
})])])]), Fx = Ce({
  name: "InternalSelectMenu",
  props: Object.assign(Object.assign({}, Ee.props), {
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
    const t = Ee("InternalSelectMenu", "-internal-select-menu", Ax, Bd, e, ke(e, "clsPrefix")), o = E(null), r = E(null), n = E(null), i = M(() => e.treeMate.getFlattenedNodes()), a = M(() => ex(i.value)), l = E(null);
    function s() {
      const { treeMate: H } = e;
      let U = null;
      const { value: de } = e;
      de === null ? U = H.getFirstAvailableNode() : (e.multiple ? U = H.getNode((de || [])[(de || []).length - 1]) : U = H.getNode(de), (!U || U.disabled) && (U = H.getFirstAvailableNode())), _(U || null);
    }
    function d() {
      const { value: H } = l;
      H && !e.treeMate.getNode(H.key) && (l.value = null);
    }
    let c;
    Te(() => e.show, (H) => {
      H ? c = Te(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? s() : d(), zt(w)) : d();
      }, {
        immediate: !0
      }) : c == null || c();
    }, {
      immediate: !0
    }), Ct(() => {
      c == null || c();
    });
    const f = M(() => yr(t.value.self[oe("optionHeight", e.size)])), v = M(() => on(t.value.self[oe("padding", e.size)])), g = M(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), u = M(() => {
      const H = i.value;
      return H && H.length === 0;
    });
    function p(H) {
      const { onToggle: U } = e;
      U && U(H);
    }
    function b(H) {
      const { onScroll: U } = e;
      U && U(H);
    }
    function h(H) {
      var U;
      (U = n.value) === null || U === void 0 || U.sync(), b(H);
    }
    function S() {
      var H;
      (H = n.value) === null || H === void 0 || H.sync();
    }
    function O() {
      const { value: H } = l;
      return H || null;
    }
    function y(H, U) {
      U.disabled || _(U, !1);
    }
    function T(H, U) {
      U.disabled || p(U);
    }
    function I(H) {
      var U;
      dn(H, "action") || (U = e.onKeyup) === null || U === void 0 || U.call(e, H);
    }
    function m(H) {
      var U;
      dn(H, "action") || (U = e.onKeydown) === null || U === void 0 || U.call(e, H);
    }
    function P(H) {
      var U;
      (U = e.onMousedown) === null || U === void 0 || U.call(e, H), !e.focusable && H.preventDefault();
    }
    function $() {
      const { value: H } = l;
      H && _(H.getNext({ loop: !0 }), !0);
    }
    function k() {
      const { value: H } = l;
      H && _(H.getPrev({ loop: !0 }), !0);
    }
    function _(H, U = !1) {
      l.value = H, U && w();
    }
    function w() {
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
    function F(H) {
      var U, de;
      !((U = o.value) === null || U === void 0) && U.contains(H.target) && ((de = e.onFocus) === null || de === void 0 || de.call(e, H));
    }
    function L(H) {
      var U, de;
      !((U = o.value) === null || U === void 0) && U.contains(H.relatedTarget) || (de = e.onBlur) === null || de === void 0 || de.call(e, H);
    }
    _t(Ui, {
      handleOptionMouseEnter: y,
      handleOptionClick: T,
      valueSetRef: g,
      pendingTmNodeRef: l,
      nodePropsRef: ke(e, "nodeProps"),
      showCheckmarkRef: ke(e, "showCheckmark"),
      multipleRef: ke(e, "multiple"),
      valueRef: ke(e, "value"),
      renderLabelRef: ke(e, "renderLabel"),
      renderOptionRef: ke(e, "renderOption"),
      labelFieldRef: ke(e, "labelField"),
      valueFieldRef: ke(e, "valueField")
    }), _t(_s, o), yt(() => {
      const { value: H } = n;
      H && H.sync();
    });
    const G = M(() => {
      const { size: H } = e, { common: { cubicBezierEaseInOut: U }, self: { height: de, borderRadius: Se, color: Ie, groupHeaderTextColor: Me, actionDividerColor: $e, optionTextColorPressed: ue, optionTextColor: me, optionTextColorDisabled: ze, optionTextColorActive: ae, optionOpacityDisabled: Ve, optionCheckColor: Fe, actionTextColor: je, optionColorPending: Ge, optionColorActive: Ze, loadingColor: lt, loadingSize: pt, optionColorActivePending: X, [oe("optionFontSize", H)]: le, [oe("optionHeight", H)]: xe, [oe("optionPadding", H)]: ie } } = t.value;
      return {
        "--n-height": de,
        "--n-action-divider-color": $e,
        "--n-action-text-color": je,
        "--n-bezier": U,
        "--n-border-radius": Se,
        "--n-color": Ie,
        "--n-option-font-size": le,
        "--n-group-header-text-color": Me,
        "--n-option-check-color": Fe,
        "--n-option-color-pending": Ge,
        "--n-option-color-active": Ze,
        "--n-option-color-active-pending": X,
        "--n-option-height": xe,
        "--n-option-opacity-disabled": Ve,
        "--n-option-text-color": me,
        "--n-option-text-color-active": ae,
        "--n-option-text-color-disabled": ze,
        "--n-option-text-color-pressed": ue,
        "--n-option-padding": ie,
        "--n-option-padding-left": on(ie, "left"),
        "--n-option-padding-right": on(ie, "right"),
        "--n-loading-color": lt,
        "--n-loading-size": pt
      };
    }), { inlineThemeDisabled: Y } = e, j = Y ? xt("internal-select-menu", M(() => e.size[0]), G, e) : void 0, ne = {
      selfRef: o,
      next: $,
      prev: k,
      getPendingTmNode: O
    };
    return Ks(o, e.onResize), Object.assign({
      mergedTheme: t,
      virtualListRef: r,
      scrollbarRef: n,
      itemSize: f,
      padding: v,
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
      doScroll: b,
      handleFocusin: F,
      handleFocusout: L,
      handleKeyUp: I,
      handleKeyDown: m,
      handleMouseDown: P,
      handleVirtualListResize: S,
      handleVirtualListScroll: h,
      cssVars: Y ? void 0 : G,
      themeClass: j == null ? void 0 : j.themeClass,
      onRender: j == null ? void 0 : j.onRender
    }, ne);
  },
  render() {
    const { $slots: e, virtualScroll: t, clsPrefix: o, mergedTheme: r, themeClass: n, onRender: i } = this;
    return i == null || i(), x(
      "div",
      { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [
        `${o}-base-select-menu`,
        n,
        this.multiple && `${o}-base-select-menu--multiple`
      ], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
      this.loading ? x(
        "div",
        { class: `${o}-base-select-menu__loading` },
        x(ca, { clsPrefix: o, strokeWidth: 20 })
      ) : this.empty ? x("div", { class: `${o}-base-select-menu__empty`, "data-empty": !0 }, Kt(e.empty, () => [
        x($x, { theme: r.peers.Empty, themeOverrides: r.peerOverrides.Empty })
      ])) : x(Md, { ref: "scrollbarRef", theme: r.peers.Scrollbar, themeOverrides: r.peerOverrides.Scrollbar, scrollable: this.scrollable, container: t ? this.virtualListContainer : void 0, content: t ? this.virtualListContent : void 0, onScroll: t ? void 0 : this.doScroll }, {
        default: () => t ? x(Rh, { ref: "virtualListRef", class: `${o}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: !1, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: !0 }, {
          default: ({ item: a }) => a.isGroup ? x(Tl, { key: a.key, clsPrefix: o, tmNode: a }) : a.ignored ? null : x($l, { clsPrefix: o, key: a.key, tmNode: a })
        }) : x("div", { class: `${o}-base-select-menu-option-wrapper`, style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        } }, this.flattenedNodes.map((a) => a.isGroup ? x(Tl, { key: a.key, clsPrefix: o, tmNode: a }) : x($l, { clsPrefix: o, key: a.key, tmNode: a })))
      }),
      gt(e.action, (a) => a && [
        x("div", { class: `${o}-base-select-menu__action`, "data-action": !0, key: "action" }, a),
        x(F0, { onFocus: this.onTabOut, key: "focus-detector" })
      ])
    );
  }
}), Hx = R("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), Lx = Ce({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    er("-base-wave", Hx, ke(e, "clsPrefix"));
    const t = E(null), o = E(!1);
    let r = null;
    return Ct(() => {
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
    return x("div", { ref: "selfRef", "aria-hidden": !0, class: [
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
}, Ad = (e) => {
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
  common: mt,
  self: Ad
}, ha = Nx, Vx = {
  name: "Popover",
  common: ee,
  self: Ad
}, Ao = Vx, ni = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, ot = "var(--n-arrow-height) * 1.414", jx = N([R("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [N(">", [R("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Qe("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Qe("scrollable", [Qe("show-header-or-footer", "padding: var(--n-padding);")])]), B("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), B("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), J("scrollable, show-header-or-footer", [B("content", `
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
 width: calc(${ot});
 height: calc(${ot});
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
]), Ot("top-start", `
 top: calc(${ot} / -2);
 left: calc(${Gt("top-start")} - var(--v-offset-left));
 `), Ot("top", `
 top: calc(${ot} / -2);
 transform: translateX(calc(${ot} / -2)) rotate(45deg);
 left: 50%;
 `), Ot("top-end", `
 top: calc(${ot} / -2);
 right: calc(${Gt("top-end")} + var(--v-offset-left));
 `), Ot("bottom-start", `
 bottom: calc(${ot} / -2);
 left: calc(${Gt("bottom-start")} - var(--v-offset-left));
 `), Ot("bottom", `
 bottom: calc(${ot} / -2);
 transform: translateX(calc(${ot} / -2)) rotate(45deg);
 left: 50%;
 `), Ot("bottom-end", `
 bottom: calc(${ot} / -2);
 right: calc(${Gt("bottom-end")} + var(--v-offset-left));
 `), Ot("left-start", `
 left: calc(${ot} / -2);
 top: calc(${Gt("left-start")} - var(--v-offset-top));
 `), Ot("left", `
 left: calc(${ot} / -2);
 transform: translateY(calc(${ot} / -2)) rotate(45deg);
 top: 50%;
 `), Ot("left-end", `
 left: calc(${ot} / -2);
 bottom: calc(${Gt("left-end")} + var(--v-offset-top));
 `), Ot("right-start", `
 right: calc(${ot} / -2);
 top: calc(${Gt("right-start")} - var(--v-offset-top));
 `), Ot("right", `
 right: calc(${ot} / -2);
 transform: translateY(calc(${ot} / -2)) rotate(45deg);
 top: 50%;
 `), Ot("right-end", `
 right: calc(${ot} / -2);
 bottom: calc(${Gt("right-end")} + var(--v-offset-top));
 `), ...Ob({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const o = ["right", "left"].includes(t), r = o ? "width" : "height";
  return e.map((n) => {
    const i = n.split("-")[1] === "end", l = `calc((${`var(--v-target-${r}, 0px)`} - ${ot}) / 2)`, s = Gt(n);
    return N(`[v-placement="${n}"] >`, [R("popover-shared", [J("center-arrow", [R("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${o ? "left" : "top"}));`)])])]);
  });
})]);
function Gt(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function Ot(e, t) {
  const o = e.split("-")[0], r = ["top", "bottom"].includes(o) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return N(`[v-placement="${e}"] >`, [R("popover-shared", `
 margin-${ni[o]}: var(--n-space);
 `, [J("show-arrow", `
 margin-${ni[o]}: var(--n-space-arrow);
 `), J("overlap", `
 margin: 0;
 `), $f("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${o}: 100%;
 ${ni[o]}: auto;
 ${r}
 `, [R("popover-arrow", t)])])]);
}
const Fd = Object.assign(Object.assign({}, Ee.props), {
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
}), Ux = ({ arrowStyle: e, clsPrefix: t }) => x(
  "div",
  { key: "__popover-arrow__", class: `${t}-popover-arrow-wrapper` },
  x("div", { class: `${t}-popover-arrow`, style: e })
), qx = Ce({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: Fd,
  setup(e, { slots: t, attrs: o }) {
    const { namespaceRef: r, mergedClsPrefixRef: n, inlineThemeDisabled: i } = wt(e), a = Ee("Popover", "-popover", jx, ha, e, n), l = E(null), s = Be("NPopover"), d = E(null), c = E(e.show), f = E(!1);
    ht(() => {
      const { show: m } = e;
      m && !Tf() && !e.internalDeactivateImmediately && (f.value = !0);
    });
    const v = M(() => {
      const { trigger: m, onClickoutside: P } = e, $ = [], { positionManuallyRef: { value: k } } = s;
      return k || (m === "click" && !P && $.push([
        pn,
        y,
        void 0,
        { capture: !0 }
      ]), m === "hover" && $.push([qf, O])), P && $.push([
        pn,
        y,
        void 0,
        { capture: !0 }
      ]), (e.displayDirective === "show" || e.animated && f.value) && $.push([Jl, e.show]), $;
    }), g = M(() => {
      const m = e.width === "trigger" ? void 0 : Ko(e.width), P = [];
      m && P.push({ width: m });
      const { maxWidth: $, minWidth: k } = e;
      return $ && P.push({ maxWidth: Ko($) }), k && P.push({ maxWidth: Ko(k) }), i || P.push(u.value), P;
    }), u = M(() => {
      const { common: { cubicBezierEaseInOut: m, cubicBezierEaseIn: P, cubicBezierEaseOut: $ }, self: { space: k, spaceArrow: _, padding: w, fontSize: F, textColor: L, dividerColor: G, color: Y, boxShadow: j, borderRadius: ne, arrowHeight: H, arrowOffset: U, arrowOffsetVertical: de } } = a.value;
      return {
        "--n-box-shadow": j,
        "--n-bezier": m,
        "--n-bezier-ease-in": P,
        "--n-bezier-ease-out": $,
        "--n-font-size": F,
        "--n-text-color": L,
        "--n-color": Y,
        "--n-divider-color": G,
        "--n-border-radius": ne,
        "--n-arrow-height": H,
        "--n-arrow-offset": U,
        "--n-arrow-offset-vertical": de,
        "--n-padding": w,
        "--n-space": k,
        "--n-space-arrow": _
      };
    }), p = i ? xt("popover", void 0, u, e) : void 0;
    s.setBodyInstance({
      syncPosition: b
    }), Ct(() => {
      s.setBodyInstance(null);
    }), Te(ke(e, "show"), (m) => {
      e.animated || (m ? c.value = !0 : c.value = !1);
    });
    function b() {
      var m;
      (m = l.value) === null || m === void 0 || m.syncPosition();
    }
    function h(m) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && s.handleMouseEnter(m);
    }
    function S(m) {
      e.trigger === "hover" && e.keepAliveOnHover && s.handleMouseLeave(m);
    }
    function O(m) {
      e.trigger === "hover" && !T().contains(Cr(m)) && s.handleMouseMoveOutside(m);
    }
    function y(m) {
      (e.trigger === "click" && !T().contains(Cr(m)) || e.onClickoutside) && s.handleClickOutside(m);
    }
    function T() {
      return s.getTriggerElement();
    }
    _t(Es, d), _t(Os, null), _t(Is, null);
    function I() {
      if (p == null || p.onRender(), !(e.displayDirective === "show" || e.show || e.animated && f.value))
        return null;
      let P;
      const $ = s.internalRenderBodyRef.value, { value: k } = n;
      if ($)
        P = $(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [
            `${k}-popover-shared`,
            p == null ? void 0 : p.themeClass.value,
            e.overlap && `${k}-popover-shared--overlap`,
            e.showArrow && `${k}-popover-shared--show-arrow`,
            e.arrowPointToCenter && `${k}-popover-shared--center-arrow`
          ],
          d,
          g.value,
          h,
          S
        );
      else {
        const { value: _ } = s.extraClassRef, { internalTrapFocus: w } = e, F = !mi(t.header) || !mi(t.footer), L = () => {
          var G;
          const Y = F ? x(
            Jt,
            null,
            gt(t.header, (H) => H ? x("div", { class: `${k}-popover__header`, style: e.headerStyle }, H) : null),
            gt(t.default, (H) => H ? x("div", { class: `${k}-popover__content`, style: e.contentStyle }, t) : null),
            gt(t.footer, (H) => H ? x("div", { class: `${k}-popover__footer`, style: e.footerStyle }, H) : null)
          ) : e.scrollable ? (G = t.default) === null || G === void 0 ? void 0 : G.call(t) : x("div", { class: `${k}-popover__content`, style: e.contentStyle }, t), j = e.scrollable ? x(Ex, { contentClass: F ? void 0 : `${k}-popover__content`, contentStyle: F ? void 0 : e.contentStyle }, {
            default: () => Y
          }) : Y, ne = e.showArrow ? Ux({
            arrowStyle: e.arrowStyle,
            clsPrefix: k
          }) : null;
          return [j, ne];
        };
        P = x("div", Wi({
          class: [
            `${k}-popover`,
            `${k}-popover-shared`,
            p == null ? void 0 : p.themeClass.value,
            _.map((G) => `${k}-${G}`),
            {
              [`${k}-popover--scrollable`]: e.scrollable,
              [`${k}-popover--show-header-or-footer`]: F,
              [`${k}-popover--raw`]: e.raw,
              [`${k}-popover-shared--overlap`]: e.overlap,
              [`${k}-popover-shared--show-arrow`]: e.showArrow,
              [`${k}-popover-shared--center-arrow`]: e.arrowPointToCenter
            }
          ],
          ref: d,
          style: g.value,
          onKeydown: s.handleKeydown,
          onMouseenter: h,
          onMouseleave: S
        }, o), w ? x(Bh, { active: e.show, autoFocus: !0 }, { default: L }) : L());
      }
      return Er(P, v.value);
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
    return x(Yi, { ref: "followerRef", zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, overlap: this.overlap, width: this.width === "trigger" ? "target" : void 0, teleportDisabled: this.adjustedTo === Rt.tdkey }, {
      default: () => this.animated ? x(Yt, {
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
}), Gx = Object.keys(Fd), Kx = {
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
const Xx = it("").type, Hd = {
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
}, Zx = Object.assign(Object.assign(Object.assign({}, Ee.props), Hd), { internalOnAfterLeave: Function, internalRenderBody: Function }), Ld = Ce({
  name: "Popover",
  inheritAttrs: !1,
  props: Zx,
  __popover__: !0,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.maxWidth !== void 0 && $t("popover", "`max-width` is deprecated, please use `style` instead."), e.minWidth !== void 0 && $t("popover", "`min-width` is deprecated, please use `style` instead."), e.arrow !== void 0 && $t("popover", "`arrow` is deprecated, please use `showArrow` instead."), e.onHide !== void 0 && $t("popover", "`on-hide` is deprecated, please use `on-update:show` instead."), e.onShow !== void 0 && $t("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
    });
    const t = Dr(), o = E(null), r = M(() => e.show), n = E(e.defaultShow), i = so(r, n), a = Xe(() => e.disabled ? !1 : i.value), l = () => {
      if (e.disabled)
        return !0;
      const { getDisabled: L } = e;
      return !!(L != null && L());
    }, s = () => l() ? !1 : i.value, d = zs(e, ["arrow", "showArrow"]), c = M(() => e.overlap ? !1 : d.value);
    let f = null;
    const v = E(null), g = E(null), u = Xe(() => e.x !== void 0 && e.y !== void 0);
    function p(L) {
      const { "onUpdate:show": G, onUpdateShow: Y, onShow: j, onHide: ne } = e;
      n.value = L, G && he(G, L), Y && he(Y, L), L && j && he(j, !0), L && ne && he(ne, !1);
    }
    function b() {
      f && f.syncPosition();
    }
    function h() {
      const { value: L } = v;
      L && (window.clearTimeout(L), v.value = null);
    }
    function S() {
      const { value: L } = g;
      L && (window.clearTimeout(L), g.value = null);
    }
    function O() {
      const L = l();
      if (e.trigger === "focus" && !L) {
        if (s())
          return;
        p(!0);
      }
    }
    function y() {
      const L = l();
      if (e.trigger === "focus" && !L) {
        if (!s())
          return;
        p(!1);
      }
    }
    function T() {
      const L = l();
      if (e.trigger === "hover" && !L) {
        if (S(), v.value !== null || s())
          return;
        const G = () => {
          p(!0), v.value = null;
        }, { delay: Y } = e;
        Y === 0 ? G() : v.value = window.setTimeout(G, Y);
      }
    }
    function I() {
      const L = l();
      if (e.trigger === "hover" && !L) {
        if (h(), g.value !== null || !s())
          return;
        const G = () => {
          p(!1), g.value = null;
        }, { duration: Y } = e;
        Y === 0 ? G() : g.value = window.setTimeout(G, Y);
      }
    }
    function m() {
      I();
    }
    function P(L) {
      var G;
      s() && (e.trigger === "click" && (h(), S(), p(!1)), (G = e.onClickoutside) === null || G === void 0 || G.call(e, L));
    }
    function $() {
      if (e.trigger === "click" && !l()) {
        h(), S();
        const L = !s();
        p(L);
      }
    }
    function k(L) {
      e.internalTrapFocus && L.key === "Escape" && (h(), S(), p(!1));
    }
    function _(L) {
      n.value = L;
    }
    function w() {
      var L;
      return (L = o.value) === null || L === void 0 ? void 0 : L.targetRef;
    }
    function F(L) {
      f = L;
    }
    return _t("NPopover", {
      getTriggerElement: w,
      handleKeydown: k,
      handleMouseEnter: T,
      handleMouseLeave: I,
      handleClickOutside: P,
      handleMouseMoveOutside: m,
      setBodyInstance: F,
      positionManuallyRef: u,
      isMountedRef: t,
      zIndexRef: ke(e, "zIndex"),
      extraClassRef: ke(e, "internalExtraClass"),
      internalRenderBodyRef: ke(e, "internalRenderBody")
    }), ht(() => {
      i.value && l() && p(!1);
    }), {
      binderInstRef: o,
      positionManually: u,
      mergedShowConsideringDisabledProp: a,
      // if to show popover body
      uncontrolledShow: n,
      mergedShowArrow: c,
      getMergedShow: s,
      setShow: _,
      handleClick: $,
      handleMouseEnter: T,
      handleMouseLeave: I,
      handleFocus: O,
      handleBlur: y,
      syncPosition: b
    };
  },
  render() {
    var e;
    const { positionManually: t, $slots: o } = this;
    let r, n = !1;
    if (!t && (o.activator ? r = Ta(o, "activator") : r = Ta(o, "trigger"), r)) {
      r = pu(r), r = r.type === Xx ? x("span", [r]) : r;
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
    return x(qi, { ref: "binderInstRef", syncTarget: !n, syncTargetWithParent: this.internalSyncTargetWithParent }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [
          this.internalTrapFocus && i ? Er(x("div", { style: { position: "fixed", inset: 0 } }), [
            [
              Bs,
              {
                enabled: i,
                zIndex: this.zIndex
              }
            ]
          ]) : null,
          t ? null : x(Gi, null, {
            default: () => r
          }),
          x(qx, tf(this.$props, Gx, Object.assign(Object.assign({}, this.$attrs), { showArrow: this.mergedShowArrow, show: i })), {
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
}), Wd = {
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
    const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: d, borderColor: c, tagColor: f, opacityDisabled: v, closeIconColor: g, closeIconColorHover: u, closeIconColorPressed: p, closeColorHover: b, closeColorPressed: h, borderRadiusSmall: S, fontSizeMini: O, fontSizeTiny: y, fontSizeSmall: T, fontSizeMedium: I, heightMini: m, heightTiny: P, heightSmall: $, heightMedium: k, buttonColor2Hover: _, buttonColor2Pressed: w, fontWeightStrong: F } = e;
    return Object.assign(Object.assign({}, Wd), {
      closeBorderRadius: S,
      heightTiny: m,
      heightSmall: P,
      heightMedium: $,
      heightLarge: k,
      borderRadius: S,
      opacityDisabled: v,
      fontSizeTiny: O,
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
      colorHoverCheckable: _,
      colorPressedCheckable: w,
      colorChecked: n,
      colorCheckedHover: o,
      colorCheckedPressed: r,
      // default
      border: `1px solid ${c}`,
      textColor: t,
      color: f,
      colorBordered: "#0000",
      closeIconColor: g,
      closeIconColorHover: u,
      closeIconColorPressed: p,
      closeColorHover: b,
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
}, Nd = Jx, Qx = (e) => {
  const { textColor2: t, primaryColorHover: o, primaryColorPressed: r, primaryColor: n, infoColor: i, successColor: a, warningColor: l, errorColor: s, baseColor: d, borderColor: c, opacityDisabled: f, tagColor: v, closeIconColor: g, closeIconColorHover: u, closeIconColorPressed: p, borderRadiusSmall: b, fontSizeMini: h, fontSizeTiny: S, fontSizeSmall: O, fontSizeMedium: y, heightMini: T, heightTiny: I, heightSmall: m, heightMedium: P, closeColorHover: $, closeColorPressed: k, buttonColor2Hover: _, buttonColor2Pressed: w, fontWeightStrong: F } = e;
  return Object.assign(Object.assign({}, Wd), {
    closeBorderRadius: b,
    heightTiny: T,
    heightSmall: I,
    heightMedium: m,
    heightLarge: P,
    borderRadius: b,
    opacityDisabled: f,
    fontSizeTiny: h,
    fontSizeSmall: S,
    fontSizeMedium: O,
    fontSizeLarge: y,
    fontWeightStrong: F,
    // checked
    textColorCheckable: t,
    textColorHoverCheckable: t,
    textColorPressedCheckable: t,
    textColorChecked: d,
    colorCheckable: "#0000",
    colorHoverCheckable: _,
    colorPressedCheckable: w,
    colorChecked: n,
    colorCheckedHover: o,
    colorCheckedPressed: r,
    // default
    border: `1px solid ${c}`,
    textColor: t,
    color: v,
    colorBordered: "rgb(250, 250, 252)",
    closeIconColor: g,
    closeIconColorHover: u,
    closeIconColorPressed: p,
    closeColorHover: $,
    closeColorPressed: k,
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
  common: mt,
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
}, rC = R("tag", `
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
 `), B("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), B("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), B("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), B("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), J("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [B("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), B("avatar", `
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
 `, [Qe("disabled", [N("&:hover", "background-color: var(--n-color-hover-checkable);", [Qe("checked", "color: var(--n-text-color-hover-checkable);")]), N("&:active", "background-color: var(--n-color-pressed-checkable);", [Qe("checked", "color: var(--n-text-color-pressed-checkable);")])]), J("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Qe("disabled", [N("&:hover", "background-color: var(--n-color-checked-hover);"), N("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), nC = Object.assign(Object.assign(Object.assign({}, Ee.props), oC), {
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
}), iC = "n-tag", ii = Ce({
  name: "Tag",
  props: nC,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onCheckedChange !== void 0 && $t("tag", "`on-checked-change` is deprecated, please use `on-update:checked` instead");
    });
    const t = E(null), { mergedBorderedRef: o, mergedClsPrefixRef: r, inlineThemeDisabled: n, mergedRtlRef: i } = wt(e), a = Ee("Tag", "-tag", rC, tC, e, r);
    _t(iC, {
      roundRef: ke(e, "round")
    });
    function l(g) {
      if (!e.disabled && e.checkable) {
        const { checked: u, onCheckedChange: p, onUpdateChecked: b, "onUpdate:checked": h } = e;
        b && b(!u), h && h(!u), p && p(!u);
      }
    }
    function s(g) {
      if (e.triggerClickOnClose || g.stopPropagation(), !e.disabled) {
        const { onClose: u } = e;
        u && he(u, g);
      }
    }
    const d = {
      setTextContent(g) {
        const { value: u } = t;
        u && (u.textContent = g);
      }
    }, c = Do("Tag", i, r), f = M(() => {
      const { type: g, size: u, color: { color: p, textColor: b } = {} } = e, { common: { cubicBezierEaseInOut: h }, self: { padding: S, closeMargin: O, closeMarginRtl: y, borderRadius: T, opacityDisabled: I, textColorCheckable: m, textColorHoverCheckable: P, textColorPressedCheckable: $, textColorChecked: k, colorCheckable: _, colorHoverCheckable: w, colorPressedCheckable: F, colorChecked: L, colorCheckedHover: G, colorCheckedPressed: Y, closeBorderRadius: j, fontWeightStrong: ne, [oe("colorBordered", g)]: H, [oe("closeSize", u)]: U, [oe("closeIconSize", u)]: de, [oe("fontSize", u)]: Se, [oe("height", u)]: Ie, [oe("color", g)]: Me, [oe("textColor", g)]: $e, [oe("border", g)]: ue, [oe("closeIconColor", g)]: me, [oe("closeIconColorHover", g)]: ze, [oe("closeIconColorPressed", g)]: ae, [oe("closeColorHover", g)]: Ve, [oe("closeColorPressed", g)]: Fe } } = a.value;
      return {
        "--n-font-weight-strong": ne,
        "--n-avatar-size-override": `calc(${Ie} - 8px)`,
        "--n-bezier": h,
        "--n-border-radius": T,
        "--n-border": ue,
        "--n-close-icon-size": de,
        "--n-close-color-pressed": Fe,
        "--n-close-color-hover": Ve,
        "--n-close-border-radius": j,
        "--n-close-icon-color": me,
        "--n-close-icon-color-hover": ze,
        "--n-close-icon-color-pressed": ae,
        "--n-close-icon-color-disabled": me,
        "--n-close-margin": O,
        "--n-close-margin-rtl": y,
        "--n-close-size": U,
        "--n-color": p || (o.value ? H : Me),
        "--n-color-checkable": _,
        "--n-color-checked": L,
        "--n-color-checked-hover": G,
        "--n-color-checked-pressed": Y,
        "--n-color-hover-checkable": w,
        "--n-color-pressed-checkable": F,
        "--n-font-size": Se,
        "--n-height": Ie,
        "--n-opacity-disabled": I,
        "--n-padding": S,
        "--n-text-color": b || $e,
        "--n-text-color-checkable": m,
        "--n-text-color-checked": k,
        "--n-text-color-hover-checkable": P,
        "--n-text-color-pressed-checkable": $
      };
    }), v = n ? xt("tag", M(() => {
      let g = "";
      const { type: u, size: p, color: { color: b, textColor: h } = {} } = e;
      return g += u[0], g += p[0], b && (g += `a${fn(b)}`), h && (g += `b${fn(h)}`), o.value && (g += "c"), g;
    }), f, e) : void 0;
    return Object.assign(Object.assign({}, d), {
      rtlEnabled: c,
      mergedClsPrefix: r,
      contentRef: t,
      mergedBordered: o,
      handleClick: l,
      handleCloseClick: s,
      cssVars: n ? void 0 : f,
      themeClass: v == null ? void 0 : v.themeClass,
      onRender: v == null ? void 0 : v.onRender
    });
  },
  render() {
    var e, t;
    const { mergedClsPrefix: o, rtlEnabled: r, closable: n, color: { borderColor: i } = {}, round: a, onRender: l, $slots: s } = this;
    l == null || l();
    const d = gt(s.avatar, (f) => f && x("div", { class: `${o}-tag__avatar` }, f)), c = gt(s.icon, (f) => f && x("div", { class: `${o}-tag__icon` }, f));
    return x(
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
      x("span", { class: `${o}-tag__content`, ref: "contentRef" }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)),
      !this.checkable && n ? x(A0, { clsPrefix: o, class: `${o}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: a, isButtonTag: this.internalCloseIsButtonTag, absolute: !0 }) : null,
      !this.checkable && this.mergedBordered ? x("div", { class: `${o}-tag__border`, style: { borderColor: i } }) : null
    );
  }
}), aC = R("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [N(">", [B("clear", `
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
 `)]), B("placeholder", `
 display: flex;
 `), B("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [_r({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), Ri = Ce({
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
    return er("-base-clear", aC, ke(e, "clsPrefix")), {
      handleMouseDown(t) {
        t.preventDefault();
      }
    };
  },
  render() {
    const { clsPrefix: e } = this;
    return x(
      "div",
      { class: `${e}-base-clear` },
      x(On, null, {
        default: () => {
          var t, o;
          return this.show ? x("div", { key: "dismiss", class: `${e}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": !0 }, Kt(this.$slots.icon, () => [
            x(Zt, { clsPrefix: e }, {
              default: () => x(R0, null)
            })
          ])) : x("div", { key: "icon", class: `${e}-base-clear__placeholder` }, (o = (t = this.$slots).placeholder) === null || o === void 0 ? void 0 : o.call(t));
        }
      })
    );
  }
}), Vd = Ce({
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
      return x(ca, { clsPrefix: o, class: `${o}-base-suffix`, strokeWidth: 24, scale: 0.85, show: e.loading }, {
        default: () => e.showArrow ? x(Ri, { clsPrefix: o, show: e.showClear, onClear: e.onClear }, {
          placeholder: () => x(Zt, { clsPrefix: o, class: `${o}-base-suffix__arrow` }, {
            default: () => Kt(t.default, () => [
              x(E0, null)
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
  const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: f, borderColor: v, iconColor: g, iconColorDisabled: u, clearColor: p, clearColorHover: b, clearColorPressed: h, placeholderColor: S, placeholderColorDisabled: O, fontSizeTiny: y, fontSizeSmall: T, fontSizeMedium: I, fontSizeLarge: m, heightTiny: P, heightSmall: $, heightMedium: k, heightLarge: _ } = e;
  return Object.assign(Object.assign({}, jd), {
    fontSizeTiny: y,
    fontSizeSmall: T,
    fontSizeMedium: I,
    fontSizeLarge: m,
    heightTiny: P,
    heightSmall: $,
    heightMedium: k,
    heightLarge: _,
    borderRadius: t,
    // default
    textColor: o,
    textColorDisabled: r,
    placeholderColor: S,
    placeholderColorDisabled: O,
    color: n,
    colorDisabled: i,
    colorActive: n,
    border: `1px solid ${v}`,
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
    arrowColor: g,
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
    clearColor: p,
    clearColorHover: b,
    clearColorPressed: h
  });
}, sC = {
  name: "InternalSelection",
  common: mt,
  peers: {
    Popover: ha
  },
  self: lC
}, Ud = sC, dC = {
  name: "InternalSelection",
  common: ee,
  peers: {
    Popover: Ao
  },
  self(e) {
    const { borderRadius: t, textColor2: o, textColorDisabled: r, inputColor: n, inputColorDisabled: i, primaryColor: a, primaryColorHover: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: f, iconColor: v, iconColorDisabled: g, clearColor: u, clearColorHover: p, clearColorPressed: b, placeholderColor: h, placeholderColorDisabled: S, fontSizeTiny: O, fontSizeSmall: y, fontSizeMedium: T, fontSizeLarge: I, heightTiny: m, heightSmall: P, heightMedium: $, heightLarge: k } = e;
    return Object.assign(Object.assign({}, jd), {
      fontSizeTiny: O,
      fontSizeSmall: y,
      fontSizeMedium: T,
      fontSizeLarge: I,
      heightTiny: m,
      heightSmall: P,
      heightMedium: $,
      heightLarge: k,
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
      arrowColor: v,
      arrowColorDisabled: g,
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
      clearColorHover: p,
      clearColorPressed: b
    });
  }
}, pa = dC, cC = N([R("base-selection", `
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
 `, [R("base-loading", `
 color: var(--n-loading-color);
 `), R("base-selection-tags", "min-height: var(--n-height);"), B("border, state-border", `
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
 `), B("state-border", `
 z-index: 1;
 border-color: #0000;
 `), R("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [B("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), R("base-selection-overlay", `
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
 `, [B("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), R("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [B("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), R("base-selection-tags", `
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
 `), R("base-selection-label", `
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
 `, [R("base-selection-input", `
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
 `, [B("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), B("render-label", `
 color: var(--n-text-color);
 `)]), Qe("disabled", [N("&:hover", [B("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), J("focus", [B("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), J("active", [B("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), R("base-selection-label", "background-color: var(--n-color-active);"), R("base-selection-tags", "background-color: var(--n-color-active);")])]), J("disabled", "cursor: not-allowed;", [B("arrow", `
 color: var(--n-arrow-color-disabled);
 `), R("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [R("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), B("render-label", `
 color: var(--n-text-color-disabled);
 `)]), R("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), R("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), R("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [B("input", `
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
 `), B("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => J(`${e}-status`, [B("state-border", `border: var(--n-border-${e});`), Qe("disabled", [N("&:hover", [B("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), J("active", [B("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), R("base-selection-label", `background-color: var(--n-color-active-${e});`), R("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), J("focus", [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), R("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), R("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [N("&:last-child", "padding-right: 0;"), R("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [B("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), uC = Ce({
  name: "InternalSelection",
  props: Object.assign(Object.assign({}, Ee.props), { clsPrefix: {
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
    const t = E(null), o = E(null), r = E(null), n = E(null), i = E(null), a = E(null), l = E(null), s = E(null), d = E(null), c = E(null), f = E(!1), v = E(!1), g = E(!1), u = Ee("InternalSelection", "-internal-selection", cC, Ud, e, ke(e, "clsPrefix")), p = M(() => e.clearable && !e.disabled && (g.value || e.active)), b = M(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : Go(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), h = M(() => {
      const W = e.selectedOption;
      if (W)
        return W[e.labelField];
    }), S = M(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function O() {
      var W;
      const { value: Q } = t;
      if (Q) {
        const { value: D } = o;
        D && (D.style.width = `${Q.offsetWidth}px`, e.maxTagCount !== "responsive" && ((W = d.value) === null || W === void 0 || W.sync()));
      }
    }
    function y() {
      const { value: W } = c;
      W && (W.style.display = "none");
    }
    function T() {
      const { value: W } = c;
      W && (W.style.display = "inline-block");
    }
    Te(ke(e, "active"), (W) => {
      W || y();
    }), Te(ke(e, "pattern"), () => {
      e.multiple && zt(O);
    });
    function I(W) {
      const { onFocus: Q } = e;
      Q && Q(W);
    }
    function m(W) {
      const { onBlur: Q } = e;
      Q && Q(W);
    }
    function P(W) {
      const { onDeleteOption: Q } = e;
      Q && Q(W);
    }
    function $(W) {
      const { onClear: Q } = e;
      Q && Q(W);
    }
    function k(W) {
      const { onPatternInput: Q } = e;
      Q && Q(W);
    }
    function _(W) {
      var Q;
      (!W.relatedTarget || !(!((Q = r.value) === null || Q === void 0) && Q.contains(W.relatedTarget))) && I(W);
    }
    function w(W) {
      var Q;
      !((Q = r.value) === null || Q === void 0) && Q.contains(W.relatedTarget) || m(W);
    }
    function F(W) {
      $(W);
    }
    function L() {
      g.value = !0;
    }
    function G() {
      g.value = !1;
    }
    function Y(W) {
      !e.active || !e.filterable || W.target !== o.value && W.preventDefault();
    }
    function j(W) {
      P(W);
    }
    function ne(W) {
      if (W.key === "Backspace" && !H.value && !e.pattern.length) {
        const { selectedOptions: Q } = e;
        Q != null && Q.length && j(Q[Q.length - 1]);
      }
    }
    const H = E(!1);
    let U = null;
    function de(W) {
      const { value: Q } = t;
      if (Q) {
        const D = W.target.value;
        Q.textContent = D, O();
      }
      e.ignoreComposition && H.value ? U = W : k(W);
    }
    function Se() {
      H.value = !0;
    }
    function Ie() {
      H.value = !1, e.ignoreComposition && k(U), U = null;
    }
    function Me(W) {
      var Q;
      v.value = !0, (Q = e.onPatternFocus) === null || Q === void 0 || Q.call(e, W);
    }
    function $e(W) {
      var Q;
      v.value = !1, (Q = e.onPatternBlur) === null || Q === void 0 || Q.call(e, W);
    }
    function ue() {
      var W, Q;
      if (e.filterable)
        v.value = !1, (W = a.value) === null || W === void 0 || W.blur(), (Q = o.value) === null || Q === void 0 || Q.blur();
      else if (e.multiple) {
        const { value: D } = n;
        D == null || D.blur();
      } else {
        const { value: D } = i;
        D == null || D.blur();
      }
    }
    function me() {
      var W, Q, D;
      e.filterable ? (v.value = !1, (W = a.value) === null || W === void 0 || W.focus()) : e.multiple ? (Q = n.value) === null || Q === void 0 || Q.focus() : (D = i.value) === null || D === void 0 || D.focus();
    }
    function ze() {
      const { value: W } = o;
      W && (T(), W.focus());
    }
    function ae() {
      const { value: W } = o;
      W && W.blur();
    }
    function Ve(W) {
      const { value: Q } = l;
      Q && Q.setTextContent(`+${W}`);
    }
    function Fe() {
      const { value: W } = s;
      return W;
    }
    function je() {
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
    function pt() {
      Ze();
    }
    function X(W) {
      W || (Ze(), f.value = !1);
    }
    Te(S, (W) => {
      W || (f.value = !1);
    }), yt(() => {
      ht(() => {
        const W = a.value;
        W && (W.tabIndex = e.disabled || v.value ? -1 : 0);
      });
    }), Ks(r, e.onResize);
    const { inlineThemeDisabled: le } = e, xe = M(() => {
      const { size: W } = e, { common: { cubicBezierEaseInOut: Q }, self: {
        borderRadius: D,
        color: q,
        placeholderColor: te,
        textColor: ye,
        paddingSingle: _e,
        paddingMultiple: He,
        caretColor: et,
        colorDisabled: Le,
        textColorDisabled: We,
        placeholderColorDisabled: dt,
        colorActive: It,
        boxShadowFocus: st,
        boxShadowActive: vt,
        boxShadowHover: C,
        border: A,
        borderFocus: Z,
        borderHover: se,
        borderActive: ce,
        arrowColor: ve,
        arrowColorDisabled: be,
        loadingColor: Pe,
        // form warning
        colorActiveWarning: tt,
        boxShadowFocusWarning: kt,
        boxShadowActiveWarning: to,
        boxShadowHoverWarning: oo,
        borderWarning: Dn,
        borderFocusWarning: Bn,
        borderHoverWarning: Hr,
        borderActiveWarning: ro,
        // form error
        colorActiveError: z,
        boxShadowFocusError: V,
        boxShadowActiveError: ge,
        boxShadowHoverError: Ne,
        borderError: Ye,
        borderFocusError: Ae,
        borderHoverError: Vt,
        borderActiveError: jt,
        // clear
        clearColor: Ut,
        clearColorHover: po,
        clearColorPressed: vo,
        clearSize: or,
        // arrow
        arrowSize: An,
        [oe("height", W)]: Fn,
        [oe("fontSize", W)]: Hn
      } } = u.value;
      return {
        "--n-bezier": Q,
        "--n-border": A,
        "--n-border-active": ce,
        "--n-border-focus": Z,
        "--n-border-hover": se,
        "--n-border-radius": D,
        "--n-box-shadow-active": vt,
        "--n-box-shadow-focus": st,
        "--n-box-shadow-hover": C,
        "--n-caret-color": et,
        "--n-color": q,
        "--n-color-active": It,
        "--n-color-disabled": Le,
        "--n-font-size": Hn,
        "--n-height": Fn,
        "--n-padding-single": _e,
        "--n-padding-multiple": He,
        "--n-placeholder-color": te,
        "--n-placeholder-color-disabled": dt,
        "--n-text-color": ye,
        "--n-text-color-disabled": We,
        "--n-arrow-color": ve,
        "--n-arrow-color-disabled": be,
        "--n-loading-color": Pe,
        // form warning
        "--n-color-active-warning": tt,
        "--n-box-shadow-focus-warning": kt,
        "--n-box-shadow-active-warning": to,
        "--n-box-shadow-hover-warning": oo,
        "--n-border-warning": Dn,
        "--n-border-focus-warning": Bn,
        "--n-border-hover-warning": Hr,
        "--n-border-active-warning": ro,
        // form error
        "--n-color-active-error": z,
        "--n-box-shadow-focus-error": V,
        "--n-box-shadow-active-error": ge,
        "--n-box-shadow-hover-error": Ne,
        "--n-border-error": Ye,
        "--n-border-focus-error": Ae,
        "--n-border-hover-error": Vt,
        "--n-border-active-error": jt,
        // clear
        "--n-clear-size": or,
        "--n-clear-color": Ut,
        "--n-clear-color-hover": po,
        "--n-clear-color-pressed": vo,
        // arrow-size
        "--n-arrow-size": An
      };
    }), ie = le ? xt("internal-selection", M(() => e.size[0]), xe, e) : void 0;
    return {
      mergedTheme: u,
      mergedClearable: p,
      patternInputFocused: v,
      filterablePlaceholder: b,
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
      handleFocusin: _,
      handleClear: F,
      handleMouseEnter: L,
      handleMouseLeave: G,
      handleDeleteOption: j,
      handlePatternKeyDown: ne,
      handlePatternInputInput: de,
      handlePatternInputBlur: $e,
      handlePatternInputFocus: Me,
      handleMouseEnterCounter: lt,
      handleMouseLeaveCounter: pt,
      handleFocusout: w,
      handleCompositionEnd: Ie,
      handleCompositionStart: Se,
      onPopoverUpdateShow: X,
      focus: me,
      focusInput: ze,
      blur: ue,
      blurInput: ae,
      updateCounter: Ve,
      getCounter: Fe,
      getTail: je,
      renderLabel: e.renderLabel,
      cssVars: le ? void 0 : xe,
      themeClass: ie == null ? void 0 : ie.themeClass,
      onRender: ie == null ? void 0 : ie.onRender
    };
  },
  render() {
    const { status: e, multiple: t, size: o, disabled: r, filterable: n, maxTagCount: i, bordered: a, clsPrefix: l, onRender: s, renderTag: d, renderLabel: c } = this;
    s == null || s();
    const f = i === "responsive", v = typeof i == "number", g = f || v, u = x(bi, null, {
      default: () => x(Vd, { clsPrefix: l, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
        default: () => {
          var b, h;
          return (h = (b = this.$slots).arrow) === null || h === void 0 ? void 0 : h.call(b);
        }
      })
    });
    let p;
    if (t) {
      const { labelField: b } = this, h = (w) => x("div", { class: `${l}-base-selection-tag-wrapper`, key: w.value }, d ? d({
        option: w,
        handleClose: () => this.handleDeleteOption(w)
      }) : x(ii, { size: o, closable: !w.disabled, disabled: r, onClose: () => this.handleDeleteOption(w), internalCloseIsButtonTag: !1, internalCloseFocusable: !1 }, {
        default: () => c ? c(w, !0) : Go(w[b], w, !0)
      })), S = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(h), O = n ? x(
        "div",
        { class: `${l}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
        x("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: r, value: this.pattern, autofocus: this.autofocus, class: `${l}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
        x("span", { ref: "patternInputMirrorRef", class: `${l}-base-selection-input-tag__mirror` }, this.pattern)
      ) : null, y = f ? () => x(
        "div",
        { class: `${l}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
        x(ii, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: r })
      ) : void 0;
      let T;
      if (v) {
        const w = this.selectedOptions.length - i;
        w > 0 && (T = x(
          "div",
          { class: `${l}-base-selection-tag-wrapper`, key: "__counter__" },
          x(ii, { size: o, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: r }, {
            default: () => `+${w}`
          })
        ));
      }
      const I = f ? n ? x(Ya, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: S,
        counter: y,
        tail: () => O
      }) : x(Ya, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
        width: "100%",
        display: "flex",
        overflow: "hidden"
      } }, {
        default: S,
        counter: y
      }) : v ? S().concat(T) : S(), m = g ? () => x("div", { class: `${l}-base-selection-popover` }, f ? S() : this.selectedOptions.map(h)) : void 0, P = g ? {
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      } : null, k = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? x(
        "div",
        { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay` },
        x("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)
      ) : null, _ = n ? x(
        "div",
        { ref: "patternInputWrapperRef", class: `${l}-base-selection-tags` },
        I,
        f ? null : O,
        u
      ) : x(
        "div",
        { ref: "multipleElRef", class: `${l}-base-selection-tags`, tabindex: r ? void 0 : 0 },
        I,
        u
      );
      p = x(
        Jt,
        null,
        g ? x(Ld, Object.assign({}, P, { scrollable: !0, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
          trigger: () => _,
          default: m
        }) : _,
        k
      );
    } else if (n) {
      const b = this.pattern || this.isComposing, h = this.active ? !b : !this.selected, S = this.active ? !1 : this.selected;
      p = x(
        "div",
        { ref: "patternInputWrapperRef", class: `${l}-base-selection-label` },
        x("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${l}-base-selection-input`, value: this.active ? this.pattern : "", placeholder: "", readonly: r, disabled: r, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
        S ? x(
          "div",
          { class: `${l}-base-selection-label__render-label ${l}-base-selection-overlay`, key: "input" },
          x("div", { class: `${l}-base-selection-overlay__wrapper` }, d ? d({
            option: this.selectedOption,
            handleClose: () => {
            }
          }) : c ? c(this.selectedOption, !0) : Go(this.label, this.selectedOption, !0))
        ) : null,
        h ? x(
          "div",
          { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" },
          x("div", { class: `${l}-base-selection-overlay__wrapper` }, this.filterablePlaceholder)
        ) : null,
        u
      );
    } else
      p = x(
        "div",
        { ref: "singleElRef", class: `${l}-base-selection-label`, tabindex: this.disabled ? void 0 : 0 },
        this.label !== void 0 ? x(
          "div",
          { class: `${l}-base-selection-input`, title: of(this.label), key: "input" },
          x("div", { class: `${l}-base-selection-input__content` }, d ? d({
            option: this.selectedOption,
            handleClose: () => {
            }
          }) : c ? c(this.selectedOption, !0) : Go(this.label, this.selectedOption, !0))
        ) : x(
          "div",
          { class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`, key: "placeholder" },
          x("div", { class: `${l}-base-selection-placeholder__inner` }, this.placeholder)
        ),
        u
      );
    return x(
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
      p,
      a ? x("div", { class: `${l}-base-selection__border` }) : null,
      a ? x("div", { class: `${l}-base-selection__state-border` }) : null
    );
  }
}), {
  cubicBezierEaseInOut: io
} = ho;
function fC({
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
 opacity ${e} ${io},
 max-width ${e} ${io} ${t},
 margin-left ${e} ${io} ${t},
 margin-right ${e} ${io} ${t};
 `), N("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${io} ${t},
 max-width ${e} ${io},
 margin-left ${e} ${io},
 margin-right ${e} ${io};
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
    const { lineHeight: t, borderRadius: o, fontWeightStrong: r, dividerColor: n, inputColor: i, textColor1: a, textColor2: l, closeColorHover: s, closeColorPressed: d, closeIconColor: c, closeIconColorHover: f, closeIconColorPressed: v, infoColorSuppl: g, successColorSuppl: u, warningColorSuppl: p, errorColorSuppl: b, fontSize: h } = e;
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
      closeIconColorPressed: v,
      borderInfo: `1px solid ${K(g, { alpha: 0.35 })}`,
      colorInfo: K(g, { alpha: 0.25 }),
      titleTextColorInfo: a,
      iconColorInfo: g,
      contentTextColorInfo: l,
      closeColorHoverInfo: s,
      closeColorPressedInfo: d,
      closeIconColorInfo: c,
      closeIconColorHoverInfo: f,
      closeIconColorPressedInfo: v,
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
      closeIconColorPressedSuccess: v,
      borderWarning: `1px solid ${K(p, {
        alpha: 0.35
      })}`,
      colorWarning: K(p, { alpha: 0.25 }),
      titleTextColorWarning: a,
      iconColorWarning: p,
      contentTextColorWarning: l,
      closeColorHoverWarning: s,
      closeColorPressedWarning: d,
      closeIconColorWarning: c,
      closeIconColorHoverWarning: f,
      closeIconColorPressedWarning: v,
      borderError: `1px solid ${K(b, { alpha: 0.35 })}`,
      colorError: K(b, { alpha: 0.25 }),
      titleTextColorError: a,
      iconColorError: b,
      contentTextColorError: l,
      closeColorHoverError: s,
      closeColorPressedError: d,
      closeIconColorError: c,
      closeIconColorHoverError: f,
      closeIconColorPressedError: v
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
function qd(e) {
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
    getIgnored: qd,
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
        if (qd(l))
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
const SC = Mr && "chrome" in window;
Mr && navigator.userAgent.includes("Firefox");
const Gd = Mr && navigator.userAgent.includes("Safari") && !SC, Kd = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
}, PC = {
  name: "Input",
  common: ee,
  self(e) {
    const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, warningColor: s, warningColorHover: d, errorColor: c, errorColorHover: f, borderRadius: v, lineHeight: g, fontSizeTiny: u, fontSizeSmall: p, fontSizeMedium: b, fontSizeLarge: h, heightTiny: S, heightSmall: O, heightMedium: y, heightLarge: T, clearColor: I, clearColorHover: m, clearColorPressed: P, placeholderColor: $, placeholderColorDisabled: k, iconColor: _, iconColorDisabled: w, iconColorHover: F, iconColorPressed: L } = e;
    return Object.assign(Object.assign({}, Kd), {
      countTextColorDisabled: r,
      countTextColor: o,
      heightTiny: S,
      heightSmall: O,
      heightMedium: y,
      heightLarge: T,
      fontSizeTiny: u,
      fontSizeSmall: p,
      fontSizeMedium: b,
      fontSizeLarge: h,
      lineHeight: g,
      lineHeightTextarea: g,
      borderRadius: v,
      iconSize: "16px",
      groupLabelColor: a,
      textColor: t,
      textColorDisabled: r,
      textDecorationColor: t,
      groupLabelTextColor: t,
      caretColor: n,
      placeholderColor: $,
      placeholderColorDisabled: k,
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
      clearColorHover: m,
      clearColorPressed: P,
      iconColor: _,
      iconColorDisabled: w,
      iconColorHover: F,
      iconColorPressed: L,
      suffixTextColor: t
    });
  }
}, Dt = PC, kC = (e) => {
  const { textColor2: t, textColor3: o, textColorDisabled: r, primaryColor: n, primaryColorHover: i, inputColor: a, inputColorDisabled: l, borderColor: s, warningColor: d, warningColorHover: c, errorColor: f, errorColorHover: v, borderRadius: g, lineHeight: u, fontSizeTiny: p, fontSizeSmall: b, fontSizeMedium: h, fontSizeLarge: S, heightTiny: O, heightSmall: y, heightMedium: T, heightLarge: I, actionColor: m, clearColor: P, clearColorHover: $, clearColorPressed: k, placeholderColor: _, placeholderColorDisabled: w, iconColor: F, iconColorDisabled: L, iconColorHover: G, iconColorPressed: Y } = e;
  return Object.assign(Object.assign({}, Kd), {
    countTextColorDisabled: r,
    countTextColor: o,
    heightTiny: O,
    heightSmall: y,
    heightMedium: T,
    heightLarge: I,
    fontSizeTiny: p,
    fontSizeSmall: b,
    fontSizeMedium: h,
    fontSizeLarge: S,
    lineHeight: u,
    lineHeightTextarea: u,
    borderRadius: g,
    iconSize: "16px",
    groupLabelColor: m,
    groupLabelTextColor: t,
    textColor: t,
    textColorDisabled: r,
    textDecorationColor: t,
    caretColor: n,
    placeholderColor: _,
    placeholderColorDisabled: w,
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
    borderHoverError: `1px solid ${v}`,
    colorFocusError: a,
    borderFocusError: `1px solid ${v}`,
    boxShadowFocusError: `0 0 0 2px ${K(f, {
      alpha: 0.2
    })}`,
    caretColorError: f,
    clearColor: P,
    clearColorHover: $,
    clearColorPressed: k,
    iconColor: F,
    iconColorDisabled: L,
    iconColorHover: G,
    iconColorPressed: Y,
    suffixTextColor: t
  });
}, $C = {
  name: "Input",
  common: mt,
  self: kC
}, Yd = $C, Xd = "n-input";
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
  const t = E(null);
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
    let v = s.length;
    if (s.endsWith(f))
      v = s.length - f.length;
    else if (s.startsWith(c))
      v = c.length;
    else {
      const g = c[d - 1], u = s.indexOf(g, d - 1);
      u !== -1 && (v = u + 1);
    }
    (i = l.setSelectionRange) === null || i === void 0 || i.call(l, v, v);
  }
  function n() {
    t.value = null;
  }
  return Te(e, n), {
    recordCursor: o,
    restoreCursor: r
  };
}
const Il = Ce({
  name: "InputWordCount",
  setup(e, { slots: t }) {
    const { mergedValueRef: o, maxlengthRef: r, mergedClsPrefixRef: n, countGraphemesRef: i } = (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Be(Xd)
    ), a = M(() => {
      const { value: l } = o;
      return l === null || Array.isArray(l) ? 0 : (i.value || TC)(l);
    });
    return () => {
      const { value: l } = r, { value: s } = o;
      return x("span", { class: `${n.value}-input-word-count` }, rf(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [
        l === void 0 ? a.value : `${a.value} / ${l}`
      ]));
    };
  }
}), _C = R("input", `
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
  B("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  B("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
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
  B("input-el, textarea-el", `
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
 `), N("&:-webkit-autofill ~", [B("placeholder", "display: none;")])]),
  J("round", [Qe("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  B("placeholder", `
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
  J("textarea", [B("placeholder", "overflow: visible;")]),
  Qe("autosize", "width: 100%;"),
  J("autosize", [B("textarea-el, input-el", `
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
  B("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  B("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [N("+", [B("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  Qe("textarea", [B("placeholder", "white-space: nowrap;")]),
  B("eye", `
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  J("textarea", "width: 100%;", [R("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), J("resizable", [R("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), B("textarea-el, textarea-mirror, placeholder", `
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
 `), B("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  J("pair", [B("input-el, placeholder", "text-align: center;"), B("separator", `
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
  J("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [B("border", "border: var(--n-border-disabled);"), B("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), B("placeholder", "color: var(--n-placeholder-color-disabled);"), B("separator", "color: var(--n-text-color-disabled);", [R("icon", `
 color: var(--n-icon-color-disabled);
 `), R("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), R("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), B("suffix, prefix", "color: var(--n-text-color-disabled);", [R("icon", `
 color: var(--n-icon-color-disabled);
 `), R("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  Qe("disabled", [B("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-icon-color);
 cursor: pointer;
 `, [N("&:hover", `
 color: var(--n-icon-color-hover);
 `), N("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), N("&:hover", [B("state-border", "border: var(--n-border-hover);")]), J("focus", "background-color: var(--n-color-focus);", [B("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  B("border, state-border", `
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
  B("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  B("prefix", "margin-right: 4px;"),
  B("suffix", `
 margin-left: 4px;
 `),
  B("suffix, prefix", `
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
 `, [B("placeholder", [R("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), N(">", [R("icon", `
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
  ["warning", "error"].map((e) => J(`${e}-status`, [Qe("disabled", [R("base-loading", `
 color: var(--n-loading-color-${e})
 `), B("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), B("state-border", `
 border: var(--n-border-${e});
 `), N("&:hover", [B("state-border", `
 border: var(--n-border-hover-${e});
 `)]), N("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), J("focus", `
 background-color: var(--n-color-focus-${e});
 `, [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), IC = R("input", [J("disabled", [B("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), OC = Object.assign(Object.assign({}, Ee.props), {
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
}), EC = Ce({
  name: "Input",
  props: OC,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.showPasswordToggle && $t("input", '`show-password-toggle` is deprecated, please use `showPasswordOn="click"` instead');
    });
    const { mergedClsPrefixRef: t, mergedBorderedRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = wt(e), i = Ee("Input", "-input", _C, Yd, e, t);
    Gd && er("-input-safari", IC, t);
    const a = E(null), l = E(null), s = E(null), d = E(null), c = E(null), f = E(null), v = E(null), g = zC(v), u = E(null), { localeRef: p } = In("Input"), b = E(e.defaultValue), h = ke(e, "value"), S = so(h, b), O = Oo(e), { mergedSizeRef: y, mergedDisabledRef: T, mergedStatusRef: I } = O, m = E(!1), P = E(!1), $ = E(!1), k = E(!1);
    let _ = null;
    const w = M(() => {
      const { placeholder: z, pair: V } = e;
      return V ? Array.isArray(z) ? z : z === void 0 ? ["", ""] : [z, z] : z === void 0 ? [p.value.placeholder] : [z];
    }), F = M(() => {
      const { value: z } = $, { value: V } = S, { value: ge } = w;
      return !z && (Xr(V) || Array.isArray(V) && Xr(V[0])) && ge[0];
    }), L = M(() => {
      const { value: z } = $, { value: V } = S, { value: ge } = w;
      return !z && ge[1] && (Xr(V) || Array.isArray(V) && Xr(V[1]));
    }), G = Xe(() => e.internalForceFocus || m.value), Y = Xe(() => {
      if (T.value || e.readonly || !e.clearable || !G.value && !P.value)
        return !1;
      const { value: z } = S, { value: V } = G;
      return e.pair ? !!(Array.isArray(z) && (z[0] || z[1])) && (P.value || V) : !!z && (P.value || V);
    }), j = M(() => {
      const { showPasswordOn: z } = e;
      if (z)
        return z;
      if (e.showPasswordToggle)
        return "click";
    }), ne = E(!1), H = M(() => {
      const { textDecoration: z } = e;
      return z ? Array.isArray(z) ? z.map((V) => ({
        textDecoration: V
      })) : [
        {
          textDecoration: z
        }
      ] : ["", ""];
    }), U = E(void 0), de = () => {
      var z, V;
      if (e.type === "textarea") {
        const { autosize: ge } = e;
        if (ge && (U.value = (V = (z = u.value) === null || z === void 0 ? void 0 : z.$el) === null || V === void 0 ? void 0 : V.offsetWidth), !l.value || typeof ge == "boolean")
          return;
        const { paddingTop: Ne, paddingBottom: Ye, lineHeight: Ae } = window.getComputedStyle(l.value), Vt = Number(Ne.slice(0, -2)), jt = Number(Ye.slice(0, -2)), Ut = Number(Ae.slice(0, -2)), { value: po } = s;
        if (!po)
          return;
        if (ge.minRows) {
          const vo = Math.max(ge.minRows, 1), or = `${Vt + jt + Ut * vo}px`;
          po.style.minHeight = or;
        }
        if (ge.maxRows) {
          const vo = `${Vt + jt + Ut * ge.maxRows}px`;
          po.style.maxHeight = vo;
        }
      }
    }, Se = M(() => {
      const { maxlength: z } = e;
      return z === void 0 ? void 0 : Number(z);
    });
    yt(() => {
      const { value: z } = S;
      Array.isArray(z) || be(z);
    });
    const Ie = Or().proxy;
    function Me(z) {
      const { onUpdateValue: V, "onUpdate:value": ge, onInput: Ne } = e, { nTriggerFormInput: Ye } = O;
      V && he(V, z), ge && he(ge, z), Ne && he(Ne, z), b.value = z, Ye();
    }
    function $e(z) {
      const { onChange: V } = e, { nTriggerFormChange: ge } = O;
      V && he(V, z), b.value = z, ge();
    }
    function ue(z) {
      const { onBlur: V } = e, { nTriggerFormBlur: ge } = O;
      V && he(V, z), ge();
    }
    function me(z) {
      const { onFocus: V } = e, { nTriggerFormFocus: ge } = O;
      V && he(V, z), ge();
    }
    function ze(z) {
      const { onClear: V } = e;
      V && he(V, z);
    }
    function ae(z) {
      const { onInputBlur: V } = e;
      V && he(V, z);
    }
    function Ve(z) {
      const { onInputFocus: V } = e;
      V && he(V, z);
    }
    function Fe() {
      const { onDeactivate: z } = e;
      z && he(z);
    }
    function je() {
      const { onActivate: z } = e;
      z && he(z);
    }
    function Ge(z) {
      const { onClick: V } = e;
      V && he(V, z);
    }
    function Ze(z) {
      const { onWrapperFocus: V } = e;
      V && he(V, z);
    }
    function lt(z) {
      const { onWrapperBlur: V } = e;
      V && he(V, z);
    }
    function pt() {
      $.value = !0;
    }
    function X(z) {
      $.value = !1, z.target === f.value ? le(z, 1) : le(z, 0);
    }
    function le(z, V = 0, ge = "input") {
      const Ne = z.target.value;
      if (be(Ne), z instanceof InputEvent && !z.isComposing && ($.value = !1), e.type === "textarea") {
        const { value: Ae } = u;
        Ae && Ae.syncUnifiedContainer();
      }
      if (_ = Ne, $.value)
        return;
      g.recordCursor();
      const Ye = xe(Ne);
      if (Ye)
        if (!e.pair)
          ge === "input" ? Me(Ne) : $e(Ne);
        else {
          let { value: Ae } = S;
          Array.isArray(Ae) ? Ae = [Ae[0], Ae[1]] : Ae = ["", ""], Ae[V] = Ne, ge === "input" ? Me(Ae) : $e(Ae);
        }
      Ie.$forceUpdate(), Ye || zt(g.restoreCursor);
    }
    function xe(z) {
      const { countGraphemes: V, maxlength: ge, minlength: Ne } = e;
      if (V) {
        let Ae;
        if (ge !== void 0 && (Ae === void 0 && (Ae = V(z)), Ae > Number(ge)) || Ne !== void 0 && (Ae === void 0 && (Ae = V(z)), Ae < Number(ge)))
          return !1;
      }
      const { allowInput: Ye } = e;
      return typeof Ye == "function" ? Ye(z) : !0;
    }
    function ie(z) {
      ae(z), z.relatedTarget === a.value && Fe(), z.relatedTarget !== null && (z.relatedTarget === c.value || z.relatedTarget === f.value || z.relatedTarget === l.value) || (k.value = !1), q(z, "blur"), v.value = null;
    }
    function W(z, V) {
      Ve(z), m.value = !0, k.value = !0, je(), q(z, "focus"), V === 0 ? v.value = c.value : V === 1 ? v.value = f.value : V === 2 && (v.value = l.value);
    }
    function Q(z) {
      e.passivelyActivated && (lt(z), q(z, "blur"));
    }
    function D(z) {
      e.passivelyActivated && (m.value = !0, Ze(z), q(z, "focus"));
    }
    function q(z, V) {
      z.relatedTarget !== null && (z.relatedTarget === c.value || z.relatedTarget === f.value || z.relatedTarget === l.value || z.relatedTarget === a.value) || (V === "focus" ? (me(z), m.value = !0) : V === "blur" && (ue(z), m.value = !1));
    }
    function te(z, V) {
      le(z, V, "change");
    }
    function ye(z) {
      Ge(z);
    }
    function _e(z) {
      ze(z), e.pair ? (Me(["", ""]), $e(["", ""])) : (Me(""), $e(""));
    }
    function He(z) {
      const { onMousedown: V } = e;
      V && V(z);
      const { tagName: ge } = z.target;
      if (ge !== "INPUT" && ge !== "TEXTAREA") {
        if (e.resizable) {
          const { value: Ne } = a;
          if (Ne) {
            const { left: Ye, top: Ae, width: Vt, height: jt } = Ne.getBoundingClientRect(), Ut = 14;
            if (Ye + Vt - Ut < z.clientX && z.clientX < Ye + Vt && Ae + jt - Ut < z.clientY && z.clientY < Ae + jt)
              return;
          }
        }
        z.preventDefault(), m.value || C();
      }
    }
    function et() {
      var z;
      P.value = !0, e.type === "textarea" && ((z = u.value) === null || z === void 0 || z.handleMouseEnterWrapper());
    }
    function Le() {
      var z;
      P.value = !1, e.type === "textarea" && ((z = u.value) === null || z === void 0 || z.handleMouseLeaveWrapper());
    }
    function We() {
      T.value || j.value === "click" && (ne.value = !ne.value);
    }
    function dt(z) {
      if (T.value)
        return;
      z.preventDefault();
      const V = (Ne) => {
        Ne.preventDefault(), qe("mouseup", document, V);
      };
      if (Ke("mouseup", document, V), j.value !== "mousedown")
        return;
      ne.value = !0;
      const ge = () => {
        ne.value = !1, qe("mouseup", document, ge);
      };
      Ke("mouseup", document, ge);
    }
    function It(z) {
      var V;
      switch ((V = e.onKeydown) === null || V === void 0 || V.call(e, z), z.key) {
        case "Escape":
          vt();
          break;
        case "Enter":
          st(z);
          break;
      }
    }
    function st(z) {
      var V, ge;
      if (e.passivelyActivated) {
        const { value: Ne } = k;
        if (Ne) {
          e.internalDeactivateOnEnter && vt();
          return;
        }
        z.preventDefault(), e.type === "textarea" ? (V = l.value) === null || V === void 0 || V.focus() : (ge = c.value) === null || ge === void 0 || ge.focus();
      }
    }
    function vt() {
      e.passivelyActivated && (k.value = !1, zt(() => {
        var z;
        (z = a.value) === null || z === void 0 || z.focus();
      }));
    }
    function C() {
      var z, V, ge;
      T.value || (e.passivelyActivated ? (z = a.value) === null || z === void 0 || z.focus() : ((V = l.value) === null || V === void 0 || V.focus(), (ge = c.value) === null || ge === void 0 || ge.focus()));
    }
    function A() {
      var z;
      !((z = a.value) === null || z === void 0) && z.contains(document.activeElement) && document.activeElement.blur();
    }
    function Z() {
      var z, V;
      (z = l.value) === null || z === void 0 || z.select(), (V = c.value) === null || V === void 0 || V.select();
    }
    function se() {
      T.value || (l.value ? l.value.focus() : c.value && c.value.focus());
    }
    function ce() {
      const { value: z } = a;
      z != null && z.contains(document.activeElement) && z !== document.activeElement && vt();
    }
    function ve(z) {
      if (e.type === "textarea") {
        const { value: V } = l;
        V == null || V.scrollTo(z);
      } else {
        const { value: V } = c;
        V == null || V.scrollTo(z);
      }
    }
    function be(z) {
      const { type: V, pair: ge, autosize: Ne } = e;
      if (!ge && Ne)
        if (V === "textarea") {
          const { value: Ye } = s;
          Ye && (Ye.textContent = (z ?? "") + `\r
`);
        } else {
          const { value: Ye } = d;
          Ye && (z ? Ye.textContent = z : Ye.innerHTML = "&nbsp;");
        }
    }
    function Pe() {
      de();
    }
    const tt = E({
      top: "0"
    });
    function kt(z) {
      var V;
      const { scrollTop: ge } = z.target;
      tt.value.top = `${-ge}px`, (V = u.value) === null || V === void 0 || V.syncUnifiedContainer();
    }
    let to = null;
    ht(() => {
      const { autosize: z, type: V } = e;
      z && V === "textarea" ? to = Te(S, (ge) => {
        !Array.isArray(ge) && ge !== _ && be(ge);
      }) : to == null || to();
    });
    let oo = null;
    ht(() => {
      e.type === "textarea" ? oo = Te(S, (z) => {
        var V;
        !Array.isArray(z) && z !== _ && ((V = u.value) === null || V === void 0 || V.syncUnifiedContainer());
      }) : oo == null || oo();
    }), _t(Xd, {
      mergedValueRef: S,
      maxlengthRef: Se,
      mergedClsPrefixRef: t,
      countGraphemesRef: ke(e, "countGraphemes")
    });
    const Dn = {
      wrapperElRef: a,
      inputElRef: c,
      textareaElRef: l,
      isCompositing: $,
      focus: C,
      blur: A,
      select: Z,
      deactivate: ce,
      activate: se,
      scrollTo: ve
    }, Bn = Do("Input", n, t), Hr = M(() => {
      const { value: z } = y, { common: { cubicBezierEaseInOut: V }, self: { color: ge, borderRadius: Ne, textColor: Ye, caretColor: Ae, caretColorError: Vt, caretColorWarning: jt, textDecorationColor: Ut, border: po, borderDisabled: vo, borderHover: or, borderFocus: An, placeholderColor: Fn, placeholderColorDisabled: Hn, lineHeightTextarea: $c, colorDisabled: Tc, colorFocus: zc, textColorDisabled: _c, boxShadowFocus: Ic, iconSize: Oc, colorFocusWarning: Ec, boxShadowFocusWarning: Rc, borderWarning: Mc, borderFocusWarning: Dc, borderHoverWarning: Bc, colorFocusError: Ac, boxShadowFocusError: Fc, borderError: Hc, borderFocusError: Lc, borderHoverError: Wc, clearSize: Nc, clearColor: Vc, clearColorHover: jc, clearColorPressed: Uc, iconColor: qc, iconColorDisabled: Gc, suffixTextColor: Kc, countTextColor: Yc, countTextColorDisabled: Xc, iconColorHover: Zc, iconColorPressed: Jc, loadingColor: Qc, loadingColorError: eu, loadingColorWarning: tu, [oe("padding", z)]: ou, [oe("fontSize", z)]: ru, [oe("height", z)]: nu } } = i.value, { left: iu, right: au } = on(ou);
      return {
        "--n-bezier": V,
        "--n-count-text-color": Yc,
        "--n-count-text-color-disabled": Xc,
        "--n-color": ge,
        "--n-font-size": ru,
        "--n-border-radius": Ne,
        "--n-height": nu,
        "--n-padding-left": iu,
        "--n-padding-right": au,
        "--n-text-color": Ye,
        "--n-caret-color": Ae,
        "--n-text-decoration-color": Ut,
        "--n-border": po,
        "--n-border-disabled": vo,
        "--n-border-hover": or,
        "--n-border-focus": An,
        "--n-placeholder-color": Fn,
        "--n-placeholder-color-disabled": Hn,
        "--n-icon-size": Oc,
        "--n-line-height-textarea": $c,
        "--n-color-disabled": Tc,
        "--n-color-focus": zc,
        "--n-text-color-disabled": _c,
        "--n-box-shadow-focus": Ic,
        "--n-loading-color": Qc,
        // form warning
        "--n-caret-color-warning": jt,
        "--n-color-focus-warning": Ec,
        "--n-box-shadow-focus-warning": Rc,
        "--n-border-warning": Mc,
        "--n-border-focus-warning": Dc,
        "--n-border-hover-warning": Bc,
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
        "--n-clear-color": Vc,
        "--n-clear-size": Nc,
        "--n-clear-color-hover": jc,
        "--n-clear-color-pressed": Uc,
        "--n-icon-color": qc,
        "--n-icon-color-hover": Zc,
        "--n-icon-color-pressed": Jc,
        "--n-icon-color-disabled": Gc,
        "--n-suffix-text-color": Kc
      };
    }), ro = r ? xt("input", M(() => {
      const { value: z } = y;
      return z[0];
    }), Hr, e) : void 0;
    return Object.assign(Object.assign({}, Dn), {
      // DOM ref
      wrapperElRef: a,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: f,
      textareaElRef: l,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: u,
      // value
      rtlEnabled: Bn,
      uncontrolledValue: b,
      mergedValue: S,
      passwordVisible: ne,
      mergedPlaceholder: w,
      showPlaceholder1: F,
      showPlaceholder2: L,
      mergedFocus: G,
      isComposing: $,
      activated: k,
      showClearButton: Y,
      mergedSize: y,
      mergedDisabled: T,
      textDecorationStyle: H,
      mergedClsPrefix: t,
      mergedBordered: o,
      mergedShowPasswordOn: j,
      placeholderStyle: tt,
      mergedStatus: I,
      textAreaScrollContainerWidth: U,
      // methods
      handleTextAreaScroll: kt,
      handleCompositionStart: pt,
      handleCompositionEnd: X,
      handleInput: le,
      handleInputBlur: ie,
      handleInputFocus: W,
      handleWrapperBlur: Q,
      handleWrapperFocus: D,
      handleMouseEnter: et,
      handleMouseLeave: Le,
      handleMouseDown: He,
      handleChange: te,
      handleClick: ye,
      handleClear: _e,
      handlePasswordToggleClick: We,
      handlePasswordToggleMousedown: dt,
      handleWrapperKeydown: It,
      handleTextAreaMirrorResize: Pe,
      getTextareaScrollContainer: () => l.value,
      mergedTheme: i,
      cssVars: r ? void 0 : Hr,
      themeClass: ro == null ? void 0 : ro.themeClass,
      onRender: ro == null ? void 0 : ro.onRender
    });
  },
  render() {
    var e, t;
    const { mergedClsPrefix: o, mergedStatus: r, themeClass: n, type: i, countGraphemes: a, onRender: l } = this, s = this.$slots;
    return l == null || l(), x(
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
      x(
        "div",
        { class: `${o}-input-wrapper` },
        gt(s.prefix, (d) => d && x("div", { class: `${o}-input__prefix` }, d)),
        i === "textarea" ? x(Md, { ref: "textareaScrollbarInstRef", class: `${o}-input__textarea`, container: this.getTextareaScrollContainer, triggerDisplayManually: !0, useUnifiedContainer: !0, internalHoistYRail: !0 }, {
          default: () => {
            var d, c;
            const { textAreaScrollContainerWidth: f } = this, v = {
              width: this.autosize && f && `${f}px`
            };
            return x(
              Jt,
              null,
              x("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [
                `${o}-input__textarea-el`,
                (d = this.inputProps) === null || d === void 0 ? void 0 : d.class
              ], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, style: [
                this.textDecorationStyle[0],
                (c = this.inputProps) === null || c === void 0 ? void 0 : c.style,
                v
              ], onBlur: this.handleInputBlur, onFocus: (g) => this.handleInputFocus(g, 2), onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })),
              this.showPlaceholder1 ? x("div", { class: `${o}-input__placeholder`, style: [
                this.placeholderStyle,
                v
              ], key: "placeholder" }, this.mergedPlaceholder[0]) : null,
              this.autosize ? x(kr, { onResize: this.handleTextAreaMirrorResize }, {
                default: () => x("div", { ref: "textareaMirrorElRef", class: `${o}-input__textarea-mirror`, key: "mirror" })
              }) : null
            );
          }
        }) : x(
          "div",
          { class: `${o}-input__input` },
          x("input", Object.assign({ type: i === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : i }, this.inputProps, { ref: "inputElRef", class: [
            `${o}-input__input-el`,
            (e = this.inputProps) === null || e === void 0 ? void 0 : e.class
          ], style: [
            this.textDecorationStyle[0],
            (t = this.inputProps) === null || t === void 0 ? void 0 : t.style
          ], tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, onBlur: this.handleInputBlur, onFocus: (d) => this.handleInputFocus(d, 0), onInput: (d) => this.handleInput(d, 0), onChange: (d) => this.handleChange(d, 0) })),
          this.showPlaceholder1 ? x(
            "div",
            { class: `${o}-input__placeholder` },
            x("span", null, this.mergedPlaceholder[0])
          ) : null,
          this.autosize ? x("div", { class: `${o}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, " ") : null
        ),
        !this.pair && gt(s.suffix, (d) => d || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? x("div", { class: `${o}-input__suffix` }, [
          gt(s["clear-icon-placeholder"], (c) => (this.clearable || c) && x(Ri, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
            placeholder: () => c,
            icon: () => {
              var f, v;
              return (v = (f = this.$slots)["clear-icon"]) === null || v === void 0 ? void 0 : v.call(f);
            }
          })),
          this.internalLoadingBeforeSuffix ? null : d,
          this.loading !== void 0 ? x(Vd, { clsPrefix: o, loading: this.loading, showArrow: !1, showClear: !1, style: this.cssVars }) : null,
          this.internalLoadingBeforeSuffix ? d : null,
          this.showCount && this.type !== "textarea" ? x(Il, null, {
            default: (c) => {
              var f;
              return (f = s.count) === null || f === void 0 ? void 0 : f.call(s, c);
            }
          }) : null,
          this.mergedShowPasswordOn && this.type === "password" ? x("div", { class: `${o}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible ? Kt(s["password-visible-icon"], () => [
            x(Zt, { clsPrefix: o }, { default: () => x(z0, null) })
          ]) : Kt(s["password-invisible-icon"], () => [
            x(Zt, { clsPrefix: o }, { default: () => x(_0, null) })
          ])) : null
        ]) : null)
      ),
      this.pair ? x("span", { class: `${o}-input__separator` }, Kt(s.separator, () => [this.separator])) : null,
      this.pair ? x(
        "div",
        { class: `${o}-input-wrapper` },
        x(
          "div",
          { class: `${o}-input__input` },
          x("input", { ref: "inputEl2Ref", type: this.type, class: `${o}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : void 0, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: a ? void 0 : this.maxlength, minlength: a ? void 0 : this.minlength, value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: (d) => this.handleInputFocus(d, 1), onInput: (d) => this.handleInput(d, 1), onChange: (d) => this.handleChange(d, 1) }),
          this.showPlaceholder2 ? x(
            "div",
            { class: `${o}-input__placeholder` },
            x("span", null, this.mergedPlaceholder[1])
          ) : null
        ),
        gt(s.suffix, (d) => (this.clearable || d) && x("div", { class: `${o}-input__suffix` }, [
          this.clearable && x(Ri, { clsPrefix: o, show: this.showClearButton, onClear: this.handleClear }, {
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
      this.mergedBordered ? x("div", { class: `${o}-input__border` }) : null,
      this.mergedBordered ? x("div", { class: `${o}-input__state-border` }) : null,
      this.showCount && i === "textarea" ? x(Il, null, {
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
const MC = {
  name: "AutoComplete",
  common: ee,
  peers: {
    InternalSelectMenu: Ar,
    Input: Dt
  },
  self: RC
}, DC = MC, BC = (e) => {
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
  self: BC
}, Zd = AC, FC = () => ({
  gap: "-12px"
}), HC = {
  name: "AvatarGroup",
  common: ee,
  peers: {
    Avatar: Zd
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
}, VC = NC, jC = {
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
}, UC = jC, qC = {
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
}, Jd = (e) => {
  const { heightTiny: t, heightSmall: o, heightMedium: r, heightLarge: n, borderRadius: i, fontSizeTiny: a, fontSizeSmall: l, fontSizeMedium: s, fontSizeLarge: d, opacityDisabled: c, textColor2: f, textColor3: v, primaryColorHover: g, primaryColorPressed: u, borderColor: p, primaryColor: b, baseColor: h, infoColor: S, infoColorHover: O, infoColorPressed: y, successColor: T, successColorHover: I, successColorPressed: m, warningColor: P, warningColorHover: $, warningColorPressed: k, errorColor: _, errorColorHover: w, errorColorPressed: F, fontWeight: L, buttonColor2: G, buttonColor2Hover: Y, buttonColor2Pressed: j, fontWeightStrong: ne } = e;
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
    colorSecondaryPressed: j,
    // tertiary
    colorTertiary: G,
    colorTertiaryHover: Y,
    colorTertiaryPressed: j,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: Y,
    colorQuaternaryPressed: j,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: f,
    textColorTertiary: v,
    textColorHover: g,
    textColorPressed: u,
    textColorFocus: g,
    textColorDisabled: f,
    textColorText: f,
    textColorTextHover: g,
    textColorTextPressed: u,
    textColorTextFocus: g,
    textColorTextDisabled: f,
    textColorGhost: f,
    textColorGhostHover: g,
    textColorGhostPressed: u,
    textColorGhostFocus: g,
    textColorGhostDisabled: f,
    border: `1px solid ${p}`,
    borderHover: `1px solid ${g}`,
    borderPressed: `1px solid ${u}`,
    borderFocus: `1px solid ${g}`,
    borderDisabled: `1px solid ${p}`,
    rippleColor: b,
    // primary
    colorPrimary: b,
    colorHoverPrimary: g,
    colorPressedPrimary: u,
    colorFocusPrimary: g,
    colorDisabledPrimary: b,
    textColorPrimary: h,
    textColorHoverPrimary: h,
    textColorPressedPrimary: h,
    textColorFocusPrimary: h,
    textColorDisabledPrimary: h,
    textColorTextPrimary: b,
    textColorTextHoverPrimary: g,
    textColorTextPressedPrimary: u,
    textColorTextFocusPrimary: g,
    textColorTextDisabledPrimary: f,
    textColorGhostPrimary: b,
    textColorGhostHoverPrimary: g,
    textColorGhostPressedPrimary: u,
    textColorGhostFocusPrimary: g,
    textColorGhostDisabledPrimary: b,
    borderPrimary: `1px solid ${b}`,
    borderHoverPrimary: `1px solid ${g}`,
    borderPressedPrimary: `1px solid ${u}`,
    borderFocusPrimary: `1px solid ${g}`,
    borderDisabledPrimary: `1px solid ${b}`,
    rippleColorPrimary: b,
    // info
    colorInfo: S,
    colorHoverInfo: O,
    colorPressedInfo: y,
    colorFocusInfo: O,
    colorDisabledInfo: S,
    textColorInfo: h,
    textColorHoverInfo: h,
    textColorPressedInfo: h,
    textColorFocusInfo: h,
    textColorDisabledInfo: h,
    textColorTextInfo: S,
    textColorTextHoverInfo: O,
    textColorTextPressedInfo: y,
    textColorTextFocusInfo: O,
    textColorTextDisabledInfo: f,
    textColorGhostInfo: S,
    textColorGhostHoverInfo: O,
    textColorGhostPressedInfo: y,
    textColorGhostFocusInfo: O,
    textColorGhostDisabledInfo: S,
    borderInfo: `1px solid ${S}`,
    borderHoverInfo: `1px solid ${O}`,
    borderPressedInfo: `1px solid ${y}`,
    borderFocusInfo: `1px solid ${O}`,
    borderDisabledInfo: `1px solid ${S}`,
    rippleColorInfo: S,
    // success
    colorSuccess: T,
    colorHoverSuccess: I,
    colorPressedSuccess: m,
    colorFocusSuccess: I,
    colorDisabledSuccess: T,
    textColorSuccess: h,
    textColorHoverSuccess: h,
    textColorPressedSuccess: h,
    textColorFocusSuccess: h,
    textColorDisabledSuccess: h,
    textColorTextSuccess: T,
    textColorTextHoverSuccess: I,
    textColorTextPressedSuccess: m,
    textColorTextFocusSuccess: I,
    textColorTextDisabledSuccess: f,
    textColorGhostSuccess: T,
    textColorGhostHoverSuccess: I,
    textColorGhostPressedSuccess: m,
    textColorGhostFocusSuccess: I,
    textColorGhostDisabledSuccess: T,
    borderSuccess: `1px solid ${T}`,
    borderHoverSuccess: `1px solid ${I}`,
    borderPressedSuccess: `1px solid ${m}`,
    borderFocusSuccess: `1px solid ${I}`,
    borderDisabledSuccess: `1px solid ${T}`,
    rippleColorSuccess: T,
    // warning
    colorWarning: P,
    colorHoverWarning: $,
    colorPressedWarning: k,
    colorFocusWarning: $,
    colorDisabledWarning: P,
    textColorWarning: h,
    textColorHoverWarning: h,
    textColorPressedWarning: h,
    textColorFocusWarning: h,
    textColorDisabledWarning: h,
    textColorTextWarning: P,
    textColorTextHoverWarning: $,
    textColorTextPressedWarning: k,
    textColorTextFocusWarning: $,
    textColorTextDisabledWarning: f,
    textColorGhostWarning: P,
    textColorGhostHoverWarning: $,
    textColorGhostPressedWarning: k,
    textColorGhostFocusWarning: $,
    textColorGhostDisabledWarning: P,
    borderWarning: `1px solid ${P}`,
    borderHoverWarning: `1px solid ${$}`,
    borderPressedWarning: `1px solid ${k}`,
    borderFocusWarning: `1px solid ${$}`,
    borderDisabledWarning: `1px solid ${P}`,
    rippleColorWarning: P,
    // error
    colorError: _,
    colorHoverError: w,
    colorPressedError: F,
    colorFocusError: w,
    colorDisabledError: _,
    textColorError: h,
    textColorHoverError: h,
    textColorPressedError: h,
    textColorFocusError: h,
    textColorDisabledError: h,
    textColorTextError: _,
    textColorTextHoverError: w,
    textColorTextPressedError: F,
    textColorTextFocusError: w,
    textColorTextDisabledError: f,
    textColorGhostError: _,
    textColorGhostHoverError: w,
    textColorGhostPressedError: F,
    textColorGhostFocusError: w,
    textColorGhostDisabledError: _,
    borderError: `1px solid ${_}`,
    borderHoverError: `1px solid ${w}`,
    borderPressedError: `1px solid ${F}`,
    borderFocusError: `1px solid ${w}`,
    borderDisabledError: `1px solid ${_}`,
    rippleColorError: _,
    waveOpacity: "0.6",
    fontWeight: L,
    fontWeightStrong: ne
  });
}, JC = {
  name: "Button",
  common: mt,
  self: Jd
}, Qd = JC, QC = {
  name: "Button",
  common: ee,
  self(e) {
    const t = Jd(e);
    return t.waveOpacity = "0.8", t.colorOpacitySecondary = "0.16", t.colorOpacitySecondaryHover = "0.2", t.colorOpacitySecondaryPressed = "0.12", t;
  }
}, Pt = QC, ey = N([R("button", `
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
 `, [J("color", [B("border", {
  borderColor: "var(--n-border-color)"
}), J("disabled", [B("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), Qe("disabled", [N("&:focus", [B("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), N("&:hover", [B("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), N("&:active", [B("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), J("pressed", [B("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), J("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [B("border", {
  border: "var(--n-border-disabled)"
})]), Qe("disabled", [N("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [B("state-border", {
  border: "var(--n-border-focus)"
})]), N("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [B("state-border", {
  border: "var(--n-border-hover)"
})]), N("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [B("state-border", {
  border: "var(--n-border-pressed)"
})]), J("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [B("state-border", {
  border: "var(--n-border-pressed)"
})])]), J("loading", "cursor: wait;"), R("base-wave", `
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
})]), Mr && "MozBoxSizing" in document.createElement("div").style ? N("&::moz-focus-inner", {
  border: 0
}) : null, B("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), B("border", {
  border: "var(--n-border)"
}), B("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), B("icon", `
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
 `, [_r({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), fC()]), B("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [N("~", [B("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), J("block", `
 display: flex;
 width: 100%;
 `), J("dashed", [B("border, state-border", {
  borderStyle: "dashed !important"
})]), J("disabled", {
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
})]), ty = Object.assign(Object.assign({}, Ee.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: {
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
  default: !Gd
} }), oy = Ce({
  name: "Button",
  props: ty,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      const { dashed: y, ghost: T, text: I, secondary: m, tertiary: P, quaternary: $ } = e;
      (y || T || I) && (m || P || $) && $t("button", "`dashed`, `ghost` and `text` props can't be used along with `secondary`, `tertiary` and `quaterary` props.");
    });
    const t = E(null), o = E(null), r = E(!1), n = Xe(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = Be(XC, {}), { mergedSizeRef: a } = Oo({}, {
      defaultSize: "medium",
      mergedSize: (y) => {
        const { size: T } = e;
        if (T)
          return T;
        const { size: I } = i;
        if (I)
          return I;
        const { mergedSize: m } = y || {};
        return m ? m.value : "medium";
      }
    }), l = M(() => e.focusable && !e.disabled), s = (y) => {
      var T;
      l.value || y.preventDefault(), !e.nativeFocusBehavior && (y.preventDefault(), !e.disabled && l.value && ((T = t.value) === null || T === void 0 || T.focus({ preventScroll: !0 })));
    }, d = (y) => {
      var T;
      if (!e.disabled && !e.loading) {
        const { onClick: I } = e;
        I && he(I, y), e.text || (T = o.value) === null || T === void 0 || T.play();
      }
    }, c = (y) => {
      switch (y.key) {
        case "Enter":
          if (!e.keyboard)
            return;
          r.value = !1;
      }
    }, f = (y) => {
      switch (y.key) {
        case "Enter":
          if (!e.keyboard || e.loading) {
            y.preventDefault();
            return;
          }
          r.value = !0;
      }
    }, v = () => {
      r.value = !1;
    }, { inlineThemeDisabled: g, mergedClsPrefixRef: u, mergedRtlRef: p } = wt(e), b = Ee("Button", "-button", ey, Qd, e, u), h = Do("Button", p, u), S = M(() => {
      const y = b.value, { common: { cubicBezierEaseInOut: T, cubicBezierEaseOut: I }, self: m } = y, { rippleDuration: P, opacityDisabled: $, fontWeight: k, fontWeightStrong: _ } = m, w = a.value, { dashed: F, type: L, ghost: G, text: Y, color: j, round: ne, circle: H, textColor: U, secondary: de, tertiary: Se, quaternary: Ie, strong: Me } = e, $e = {
        "font-weight": Me ? _ : k
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
      const me = L === "tertiary", ze = L === "default", ae = me ? "default" : L;
      if (Y) {
        const ie = U || j;
        ue = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": ie || m[oe("textColorText", ae)],
          "--n-text-color-hover": ie ? mo(ie) : m[oe("textColorTextHover", ae)],
          "--n-text-color-pressed": ie ? Zr(ie) : m[oe("textColorTextPressed", ae)],
          "--n-text-color-focus": ie ? mo(ie) : m[oe("textColorTextHover", ae)],
          "--n-text-color-disabled": ie || m[oe("textColorTextDisabled", ae)]
        };
      } else if (G || F) {
        const ie = U || j;
        ue = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": j || m[oe("rippleColor", ae)],
          "--n-text-color": ie || m[oe("textColorGhost", ae)],
          "--n-text-color-hover": ie ? mo(ie) : m[oe("textColorGhostHover", ae)],
          "--n-text-color-pressed": ie ? Zr(ie) : m[oe("textColorGhostPressed", ae)],
          "--n-text-color-focus": ie ? mo(ie) : m[oe("textColorGhostHover", ae)],
          "--n-text-color-disabled": ie || m[oe("textColorGhostDisabled", ae)]
        };
      } else if (de) {
        const ie = ze ? m.textColor : me ? m.textColorTertiary : m[oe("color", ae)], W = j || ie, Q = L !== "default" && L !== "tertiary";
        ue = {
          "--n-color": Q ? K(W, {
            alpha: Number(m.colorOpacitySecondary)
          }) : m.colorSecondary,
          "--n-color-hover": Q ? K(W, {
            alpha: Number(m.colorOpacitySecondaryHover)
          }) : m.colorSecondaryHover,
          "--n-color-pressed": Q ? K(W, {
            alpha: Number(m.colorOpacitySecondaryPressed)
          }) : m.colorSecondaryPressed,
          "--n-color-focus": Q ? K(W, {
            alpha: Number(m.colorOpacitySecondaryHover)
          }) : m.colorSecondaryHover,
          "--n-color-disabled": m.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": W,
          "--n-text-color-hover": W,
          "--n-text-color-pressed": W,
          "--n-text-color-focus": W,
          "--n-text-color-disabled": W
        };
      } else if (Se || Ie) {
        const ie = ze ? m.textColor : me ? m.textColorTertiary : m[oe("color", ae)], W = j || ie;
        Se ? (ue["--n-color"] = m.colorTertiary, ue["--n-color-hover"] = m.colorTertiaryHover, ue["--n-color-pressed"] = m.colorTertiaryPressed, ue["--n-color-focus"] = m.colorSecondaryHover, ue["--n-color-disabled"] = m.colorTertiary) : (ue["--n-color"] = m.colorQuaternary, ue["--n-color-hover"] = m.colorQuaternaryHover, ue["--n-color-pressed"] = m.colorQuaternaryPressed, ue["--n-color-focus"] = m.colorQuaternaryHover, ue["--n-color-disabled"] = m.colorQuaternary), ue["--n-ripple-color"] = "#0000", ue["--n-text-color"] = W, ue["--n-text-color-hover"] = W, ue["--n-text-color-pressed"] = W, ue["--n-text-color-focus"] = W, ue["--n-text-color-disabled"] = W;
      } else
        ue = {
          "--n-color": j || m[oe("color", ae)],
          "--n-color-hover": j ? mo(j) : m[oe("colorHover", ae)],
          "--n-color-pressed": j ? Zr(j) : m[oe("colorPressed", ae)],
          "--n-color-focus": j ? mo(j) : m[oe("colorFocus", ae)],
          "--n-color-disabled": j || m[oe("colorDisabled", ae)],
          "--n-ripple-color": j || m[oe("rippleColor", ae)],
          "--n-text-color": U || (j ? m.textColorPrimary : me ? m.textColorTertiary : m[oe("textColor", ae)]),
          "--n-text-color-hover": U || (j ? m.textColorHoverPrimary : m[oe("textColorHover", ae)]),
          "--n-text-color-pressed": U || (j ? m.textColorPressedPrimary : m[oe("textColorPressed", ae)]),
          "--n-text-color-focus": U || (j ? m.textColorFocusPrimary : m[oe("textColorFocus", ae)]),
          "--n-text-color-disabled": U || (j ? m.textColorDisabledPrimary : m[oe("textColorDisabled", ae)])
        };
      let Ve = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      Y ? Ve = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : Ve = {
        "--n-border": m[oe("border", ae)],
        "--n-border-hover": m[oe("borderHover", ae)],
        "--n-border-pressed": m[oe("borderPressed", ae)],
        "--n-border-focus": m[oe("borderFocus", ae)],
        "--n-border-disabled": m[oe("borderDisabled", ae)]
      };
      const { [oe("height", w)]: Fe, [oe("fontSize", w)]: je, [oe("padding", w)]: Ge, [oe("paddingRound", w)]: Ze, [oe("iconSize", w)]: lt, [oe("borderRadius", w)]: pt, [oe("iconMargin", w)]: X, waveOpacity: le } = m, xe = {
        "--n-width": H && !Y ? Fe : "initial",
        "--n-height": Y ? "initial" : Fe,
        "--n-font-size": je,
        "--n-padding": H || Y ? "initial" : ne ? Ze : Ge,
        "--n-icon-size": lt,
        "--n-icon-margin": X,
        "--n-border-radius": Y ? "initial" : H || ne ? Fe : pt
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": T, "--n-bezier-ease-out": I, "--n-ripple-duration": P, "--n-opacity-disabled": $, "--n-wave-opacity": le }, $e), ue), Ve), xe);
    }), O = g ? xt("button", M(() => {
      let y = "";
      const { dashed: T, type: I, ghost: m, text: P, color: $, round: k, circle: _, textColor: w, secondary: F, tertiary: L, quaternary: G, strong: Y } = e;
      T && (y += "a"), m && (y += "b"), P && (y += "c"), k && (y += "d"), _ && (y += "e"), F && (y += "f"), L && (y += "g"), G && (y += "h"), Y && (y += "i"), $ && (y += "j" + fn($)), w && (y += "k" + fn(w));
      const { value: j } = a;
      return y += "l" + j[0], y += "m" + I[0], y;
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
      handleBlur: v,
      handleKeyup: c,
      handleClick: d,
      customColorCssVars: M(() => {
        const { color: y } = e;
        if (!y)
          return null;
        const T = mo(y);
        return {
          "--n-border-color": y,
          "--n-border-color-hover": T,
          "--n-border-color-pressed": Zr(y),
          "--n-border-color-focus": T,
          "--n-border-color-disabled": y
        };
      }),
      cssVars: g ? void 0 : S,
      themeClass: O == null ? void 0 : O.themeClass,
      onRender: O == null ? void 0 : O.onRender
    };
  },
  render() {
    const { mergedClsPrefix: e, tag: t, onRender: o } = this;
    o == null || o();
    const r = gt(this.$slots.default, (n) => n && x("span", { class: `${e}-button__content` }, n));
    return x(
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
      x(M0, { width: !0 }, {
        default: () => gt(this.$slots.icon, (n) => (this.loading || this.renderIcon || n) && x(
          "span",
          { class: `${e}-button__icon`, style: {
            margin: mi(this.$slots.default) ? "0" : ""
          } },
          x(On, null, {
            default: () => this.loading ? x(ca, { clsPrefix: e, key: "loading", class: `${e}-icon-slot`, strokeWidth: 20 }) : x("div", { key: "icon", class: `${e}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : n)
          })
        ))
      }),
      this.iconPlacement === "left" && r,
      this.text ? null : x(Lx, { ref: "waveElRef", clsPrefix: e }),
      this.showBorder ? x("div", { "aria-hidden": !0, class: `${e}-button__border`, style: this.customColorCssVars }) : null,
      this.showBorder ? x("div", { "aria-hidden": !0, class: `${e}-button__state-border`, style: this.customColorCssVars }) : null
    );
  }
}), Ol = oy, ry = {
  titleFontSize: "22px"
}, ny = (e) => {
  const { borderRadius: t, fontSize: o, lineHeight: r, textColor2: n, textColor1: i, textColorDisabled: a, dividerColor: l, fontWeightStrong: s, primaryColor: d, baseColor: c, hoverColor: f, cardColor: v, modalColor: g, popoverColor: u } = e;
  return Object.assign(Object.assign({}, ry), {
    borderRadius: t,
    borderColor: fe(v, l),
    borderColorModal: fe(g, l),
    borderColorPopover: fe(u, l),
    textColor: n,
    titleFontWeight: s,
    titleTextColor: i,
    dayTextColor: a,
    fontSize: o,
    lineHeight: r,
    dateColorCurrent: d,
    dateTextColorCurrent: c,
    cellColorHover: fe(v, f),
    cellColorHoverModal: fe(g, f),
    cellColorHoverPopover: fe(u, f),
    cellColor: v,
    cellColorModal: g,
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
  const { fontSize: t, boxShadow2: o, popoverColor: r, textColor2: n, borderRadius: i, borderColor: a, heightSmall: l, heightMedium: s, heightLarge: d, fontSizeSmall: c, fontSizeMedium: f, fontSizeLarge: v, dividerColor: g } = e;
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
    fontSizeLarge: v,
    dividerColor: g
  };
}, sy = {
  name: "ColorPicker",
  common: ee,
  peers: {
    Input: Dt,
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
  const { primaryColor: t, borderRadius: o, lineHeight: r, fontSize: n, cardColor: i, textColor2: a, textColor1: l, dividerColor: s, fontWeightStrong: d, closeIconColor: c, closeIconColorHover: f, closeIconColorPressed: v, closeColorHover: g, closeColorPressed: u, modalColor: p, boxShadow1: b, popoverColor: h, actionColor: S } = e;
  return Object.assign(Object.assign({}, cy), {
    lineHeight: r,
    color: i,
    colorModal: p,
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
    closeColorHover: g,
    closeColorPressed: u,
    closeBorderRadius: o,
    closeIconColor: c,
    closeIconColorHover: f,
    closeIconColorPressed: v,
    fontSizeSmall: n,
    fontSizeMedium: n,
    fontSizeLarge: n,
    fontSizeHuge: n,
    boxShadow: b,
    borderRadius: o
  });
}, fy = {
  name: "Card",
  common: ee,
  self(e) {
    const t = uy(e), { cardColor: o, modalColor: r, popoverColor: n } = e;
    return t.colorEmbedded = o, t.colorEmbeddedModal = r, t.colorEmbeddedPopover = n, t;
  }
}, ec = fy, hy = (e) => ({
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
}, tc = (e) => {
  const { baseColor: t, inputColorDisabled: o, cardColor: r, modalColor: n, popoverColor: i, textColorDisabled: a, borderColor: l, primaryColor: s, textColor2: d, fontSizeSmall: c, fontSizeMedium: f, fontSizeLarge: v, borderRadiusSmall: g, lineHeight: u } = e;
  return Object.assign(Object.assign({}, gy), {
    labelLineHeight: u,
    fontSizeSmall: c,
    fontSizeMedium: f,
    fontSizeLarge: v,
    borderRadius: g,
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
  common: mt,
  self: tc
}, by = my, xy = {
  name: "Checkbox",
  common: ee,
  self(e) {
    const { cardColor: t } = e, o = tc(e);
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
}, wy = yy, Sy = x(
  "svg",
  { viewBox: "0 0 64 64", class: "check-icon" },
  x("path", { d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z" })
), Py = x(
  "svg",
  { viewBox: "0 0 100 100", class: "line-icon" },
  x("path", { d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z" })
), oc = "n-checkbox-group", ky = {
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
Ce({
  name: "CheckboxGroup",
  props: ky,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onChange !== void 0 && $t("checkbox-group", "`on-change` is deprecated, please use `on-update:value` instead.");
    });
    const { mergedClsPrefixRef: t } = wt(e), o = Oo(e), { mergedSizeRef: r, mergedDisabledRef: n } = o, i = E(e.defaultValue), a = M(() => e.value), l = so(a, i), s = M(() => {
      var f;
      return ((f = l.value) === null || f === void 0 ? void 0 : f.length) || 0;
    }), d = M(() => Array.isArray(l.value) ? new Set(l.value) : /* @__PURE__ */ new Set());
    function c(f, v) {
      const { nTriggerFormInput: g, nTriggerFormChange: u } = o, { onChange: p, "onUpdate:value": b, onUpdateValue: h } = e;
      if (Array.isArray(l.value)) {
        const S = Array.from(l.value), O = S.findIndex((y) => y === v);
        f ? ~O || (S.push(v), h && he(h, S, {
          actionType: "check",
          value: v
        }), b && he(b, S, {
          actionType: "check",
          value: v
        }), g(), u(), i.value = S, p && he(p, S)) : ~O && (S.splice(O, 1), h && he(h, S, {
          actionType: "uncheck",
          value: v
        }), b && he(b, S, {
          actionType: "uncheck",
          value: v
        }), p && he(p, S), i.value = S, g(), u());
      } else
        f ? (h && he(h, [v], {
          actionType: "check",
          value: v
        }), b && he(b, [v], {
          actionType: "check",
          value: v
        }), p && he(p, [v]), i.value = [v], g(), u()) : (h && he(h, [], {
          actionType: "uncheck",
          value: v
        }), b && he(b, [], {
          actionType: "uncheck",
          value: v
        }), p && he(p, []), i.value = [], g(), u());
    }
    return _t(oc, {
      checkedCountRef: s,
      maxRef: ke(e, "max"),
      minRef: ke(e, "min"),
      valueSetRef: d,
      disabledRef: n,
      mergedSizeRef: r,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return x("div", { class: `${this.mergedClsPrefix}-checkbox-group`, role: "group" }, this.$slots);
  }
});
const $y = N([
  R("checkbox", `
 line-height: var(--n-label-line-height);
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 --n-merged-color-table: var(--n-color-table);
 `, [N("&:hover", [R("checkbox-box", [B("border", {
    border: "var(--n-border-checked)"
  })])]), N("&:focus:not(:active)", [R("checkbox-box", [B("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), J("inside-table", [R("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), J("checked", [R("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [R("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    N(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), J("indeterminate", [R("checkbox-box", [R("checkbox-icon", [N(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), N(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), J("checked, indeterminate", [N("&:focus:not(:active)", [R("checkbox-box", [B("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), R("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [B("border", {
    border: "var(--n-border-checked)"
  })])]), J("disabled", {
    cursor: "not-allowed"
  }, [J("checked", [R("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [B("border", {
    border: "var(--n-border-disabled-checked)"
  }), R("checkbox-icon", [N(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), R("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [B("border", {
    border: "var(--n-border-disabled)"
  }), R("checkbox-icon", [N(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled)"
  })])]), B("label", {
    color: "var(--n-text-color-disabled)"
  })]), R("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), R("checkbox-box", `
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
 `, [B("border", `
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
 `), R("checkbox-icon", `
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
 `), _r({
    left: "1px",
    top: "1px"
  })])]), B("label", `
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
  ks(R("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  $s(R("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), Ty = Object.assign(Object.assign({}, Ee.props), {
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
}), zy = Ce({
  name: "Checkbox",
  props: Ty,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onChange && $t("checkbox", "`on-change` is deprecated, please use `on-update:checked` instead.");
    });
    const t = E(null), { mergedClsPrefixRef: o, inlineThemeDisabled: r, mergedRtlRef: n } = wt(e), i = Oo(e, {
      mergedSize(I) {
        const { size: m } = e;
        if (m !== void 0)
          return m;
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
        const { disabled: m } = e;
        if (m !== void 0)
          return m;
        if (s) {
          if (s.disabledRef.value)
            return !0;
          const { maxRef: { value: P }, checkedCountRef: $ } = s;
          if (P !== void 0 && $.value >= P && !v.value)
            return !0;
          const { minRef: { value: k } } = s;
          if (k !== void 0 && $.value <= k && v.value)
            return !0;
        }
        return I ? I.disabled.value : !1;
      }
    }), { mergedDisabledRef: a, mergedSizeRef: l } = i, s = Be(oc, null), d = E(e.defaultChecked), c = ke(e, "checked"), f = so(c, d), v = Xe(() => {
      if (s) {
        const I = s.valueSetRef.value;
        return I && e.value !== void 0 ? I.has(e.value) : !1;
      } else
        return f.value === e.checkedValue;
    }), g = Ee("Checkbox", "-checkbox", $y, by, e, o);
    function u(I) {
      if (s && e.value !== void 0)
        s.toggleCheckbox(!v.value, e.value);
      else {
        const { onChange: m, "onUpdate:checked": P, onUpdateChecked: $ } = e, { nTriggerFormInput: k, nTriggerFormChange: _ } = i, w = v.value ? e.uncheckedValue : e.checkedValue;
        P && he(P, w, I), $ && he($, w, I), m && he(m, w, I), k(), _(), d.value = w;
      }
    }
    function p(I) {
      a.value || u(I);
    }
    function b(I) {
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
    }, O = Do("Checkbox", n, o), y = M(() => {
      const { value: I } = l, { common: { cubicBezierEaseInOut: m }, self: { borderRadius: P, color: $, colorChecked: k, colorDisabled: _, colorTableHeader: w, colorTableHeaderModal: F, colorTableHeaderPopover: L, checkMarkColor: G, checkMarkColorDisabled: Y, border: j, borderFocus: ne, borderDisabled: H, borderChecked: U, boxShadowFocus: de, textColor: Se, textColorDisabled: Ie, checkMarkColorDisabledChecked: Me, colorDisabledChecked: $e, borderDisabledChecked: ue, labelPadding: me, labelLineHeight: ze, labelFontWeight: ae, [oe("fontSize", I)]: Ve, [oe("size", I)]: Fe } } = g.value;
      return {
        "--n-label-line-height": ze,
        "--n-label-font-weight": ae,
        "--n-size": Fe,
        "--n-bezier": m,
        "--n-border-radius": P,
        "--n-border": j,
        "--n-border-checked": U,
        "--n-border-focus": ne,
        "--n-border-disabled": H,
        "--n-border-disabled-checked": ue,
        "--n-box-shadow-focus": de,
        "--n-color": $,
        "--n-color-checked": k,
        "--n-color-table": w,
        "--n-color-table-modal": F,
        "--n-color-table-popover": L,
        "--n-color-disabled": _,
        "--n-color-disabled-checked": $e,
        "--n-text-color": Se,
        "--n-text-color-disabled": Ie,
        "--n-check-mark-color": G,
        "--n-check-mark-color-disabled": Y,
        "--n-check-mark-color-disabled-checked": Me,
        "--n-font-size": Ve,
        "--n-label-padding": me
      };
    }), T = r ? xt("checkbox", M(() => l.value[0]), y, e) : void 0;
    return Object.assign(i, S, {
      rtlEnabled: O,
      selfRef: t,
      mergedClsPrefix: o,
      mergedDisabled: a,
      renderedChecked: v,
      mergedTheme: g,
      labelId: cn(),
      handleClick: p,
      handleKeyUp: b,
      handleKeyDown: h,
      cssVars: r ? void 0 : y,
      themeClass: T == null ? void 0 : T.themeClass,
      onRender: T == null ? void 0 : T.onRender
    });
  },
  render() {
    var e;
    const { $slots: t, renderedChecked: o, mergedDisabled: r, indeterminate: n, privateInsideTable: i, cssVars: a, labelId: l, label: s, mergedClsPrefix: d, focusable: c, handleKeyUp: f, handleKeyDown: v, handleClick: g } = this;
    return (e = this.onRender) === null || e === void 0 || e.call(this), x(
      "div",
      { ref: "selfRef", class: [
        `${d}-checkbox`,
        this.themeClass,
        this.rtlEnabled && `${d}-checkbox--rtl`,
        o && `${d}-checkbox--checked`,
        r && `${d}-checkbox--disabled`,
        n && `${d}-checkbox--indeterminate`,
        i && `${d}-checkbox--inside-table`
      ], tabindex: r || !c ? void 0 : 0, role: "checkbox", "aria-checked": n ? "mixed" : o, "aria-labelledby": l, style: a, onKeyup: f, onKeydown: v, onClick: g, onMousedown: () => {
        Ke("selectstart", window, (u) => {
          u.preventDefault();
        }, {
          once: !0
        });
      } },
      x(
        "div",
        { class: `${d}-checkbox-box-wrapper` },
        " ",
        x(
          "div",
          { class: `${d}-checkbox-box` },
          x(On, null, {
            default: () => this.indeterminate ? x("div", { key: "indeterminate", class: `${d}-checkbox-icon` }, Py) : x("div", { key: "check", class: `${d}-checkbox-icon` }, Sy)
          }),
          x("div", { class: `${d}-checkbox-box__border` })
        )
      ),
      s !== null || t.default ? x("span", { class: `${d}-checkbox__label`, id: l }, t.default ? t.default() : s) : null
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
}, rc = _y, Iy = (e) => {
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
}, Oy = {
  name: "Collapse",
  common: ee,
  self: Iy
}, Ey = Oy, Ry = (e) => {
  const { cubicBezierEaseInOut: t } = e;
  return {
    bezier: t
  };
}, My = {
  name: "CollapseTransition",
  common: ee,
  self: Ry
}, Dy = My, By = {
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
}, Ay = Ce({
  name: "ConfigProvider",
  alias: ["App"],
  props: By,
  setup(e) {
    const t = Be(Xt, null), o = M(() => {
      const { theme: u } = e;
      if (u === null)
        return;
      const p = t == null ? void 0 : t.mergedThemeRef.value;
      return u === void 0 ? p : p === void 0 ? u : Object.assign({}, p, u);
    }), r = M(() => {
      const { themeOverrides: u } = e;
      if (u !== null) {
        if (u === void 0)
          return t == null ? void 0 : t.mergedThemeOverridesRef.value;
        {
          const p = t == null ? void 0 : t.mergedThemeOverridesRef.value;
          return p === void 0 ? u : cr({}, p, u);
        }
      }
    }), n = Xe(() => {
      const { namespace: u } = e;
      return u === void 0 ? t == null ? void 0 : t.mergedNamespaceRef.value : u;
    }), i = Xe(() => {
      const { bordered: u } = e;
      return u === void 0 ? t == null ? void 0 : t.mergedBorderedRef.value : u;
    }), a = M(() => {
      const { icons: u } = e;
      return u === void 0 ? t == null ? void 0 : t.mergedIconsRef.value : u;
    }), l = M(() => {
      const { componentOptions: u } = e;
      return u !== void 0 ? u : t == null ? void 0 : t.mergedComponentPropsRef.value;
    }), s = M(() => {
      const { clsPrefix: u } = e;
      return u !== void 0 ? u : t == null ? void 0 : t.mergedClsPrefixRef.value;
    }), d = M(() => {
      var u;
      const { rtl: p } = e;
      if (p === void 0)
        return t == null ? void 0 : t.mergedRtlRef.value;
      const b = {};
      for (const h of p)
        b[h.name] = At(h), (u = h.peers) === null || u === void 0 || u.forEach((S) => {
          S.name in b || (b[S.name] = At(S));
        });
      return b;
    }), c = M(() => e.breakpoints || (t == null ? void 0 : t.mergedBreakpointsRef.value)), f = e.inlineThemeDisabled || (t == null ? void 0 : t.inlineThemeDisabled), v = e.preflightStyleDisabled || (t == null ? void 0 : t.preflightStyleDisabled), g = M(() => {
      const { value: u } = o, { value: p } = r, b = p && Object.keys(p).length !== 0, h = u == null ? void 0 : u.name;
      return h ? b ? `${h}-${Sr(JSON.stringify(r.value))}` : h : b ? Sr(JSON.stringify(r.value)) : "";
    });
    return _t(Xt, {
      mergedThemeHashRef: g,
      mergedBreakpointsRef: c,
      mergedRtlRef: d,
      mergedIconsRef: a,
      mergedComponentPropsRef: l,
      mergedBorderedRef: i,
      mergedNamespaceRef: n,
      mergedClsPrefixRef: s,
      mergedLocaleRef: M(() => {
        const { locale: u } = e;
        if (u !== null)
          return u === void 0 ? t == null ? void 0 : t.mergedLocaleRef.value : u;
      }),
      mergedDateLocaleRef: M(() => {
        const { dateLocale: u } = e;
        if (u !== null)
          return u === void 0 ? t == null ? void 0 : t.mergedDateLocaleRef.value : u;
      }),
      mergedHljsRef: M(() => {
        const { hljs: u } = e;
        return u === void 0 ? t == null ? void 0 : t.mergedHljsRef.value : u;
      }),
      mergedKatexRef: M(() => {
        const { katex: u } = e;
        return u === void 0 ? t == null ? void 0 : t.mergedKatexRef.value : u;
      }),
      mergedThemeRef: o,
      mergedThemeOverridesRef: r,
      inlineThemeDisabled: f || !1,
      preflightStyleDisabled: v || !1
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
    return this.abstract ? (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o) : x(this.as || this.tag, {
      class: `${this.mergedClsPrefix || Pd}-config-provider`
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e));
  }
}), Fy = {
  name: "Popselect",
  common: ee,
  peers: {
    Popover: Ao,
    InternalSelectMenu: Ar
  }
}, nc = Fy;
function ic(e) {
  const { boxShadow2: t } = e;
  return {
    menuBoxShadow: t
  };
}
const Hy = {
  name: "Select",
  common: mt,
  peers: {
    InternalSelection: Ud,
    InternalSelectMenu: Bd
  },
  self: ic
}, Ly = Hy, Wy = {
  name: "Select",
  common: ee,
  peers: {
    InternalSelection: pa,
    InternalSelectMenu: Ar
  },
  self: ic
}, ac = Wy, Ny = N([R("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `), R("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [wn({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), Vy = Object.assign(Object.assign({}, Ee.props), {
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
}), jy = Ce({
  name: "Select",
  props: Vy,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.items !== void 0 && $t("select", "`items` is deprecated, please use `options` instead."), e.onChange !== void 0 && $t("select", "`on-change` is deprecated, please use `on-update:value` instead.");
    });
    const { mergedClsPrefixRef: t, mergedBorderedRef: o, namespaceRef: r, inlineThemeDisabled: n } = wt(e), i = Ee("Select", "-select", Ny, Ly, e, t), a = E(e.defaultValue), l = ke(e, "value"), s = so(l, a), d = E(!1), c = E(""), f = M(() => {
      const { valueField: C, childrenField: A } = e, Z = CC(C, A);
      return hx(w.value, Z);
    }), v = M(() => wC(k.value, e.valueField, e.childrenField)), g = E(!1), u = so(ke(e, "show"), g), p = E(null), b = E(null), h = E(null), { localeRef: S } = In("Select"), O = M(() => {
      var C;
      return (C = e.placeholder) !== null && C !== void 0 ? C : S.value.placeholder;
    }), y = zs(e, ["items", "options"]), T = [], I = E([]), m = E([]), P = E(/* @__PURE__ */ new Map()), $ = M(() => {
      const { fallbackOption: C } = e;
      if (C === void 0) {
        const { labelField: A, valueField: Z } = e;
        return (se) => ({
          [A]: String(se),
          [Z]: se
        });
      }
      return C === !1 ? !1 : (A) => Object.assign(C(A), {
        value: A
      });
    }), k = M(() => m.value.concat(I.value).concat(y.value)), _ = M(() => {
      const { filter: C } = e;
      if (C)
        return C;
      const { labelField: A, valueField: Z } = e;
      return (se, ce) => {
        if (!ce)
          return !1;
        const ve = ce[A];
        if (typeof ve == "string")
          return ai(se, ve);
        const be = ce[Z];
        return typeof be == "string" ? ai(se, be) : typeof be == "number" ? ai(se, String(be)) : !1;
      };
    }), w = M(() => {
      if (e.remote)
        return y.value;
      {
        const { value: C } = k, { value: A } = c;
        return !A.length || !e.filterable ? C : yC(C, _.value, A, e.childrenField);
      }
    });
    function F(C) {
      const A = e.remote, { value: Z } = P, { value: se } = v, { value: ce } = $, ve = [];
      return C.forEach((be) => {
        if (se.has(be))
          ve.push(se.get(be));
        else if (A && Z.has(be))
          ve.push(Z.get(be));
        else if (ce) {
          const Pe = ce(be);
          Pe && ve.push(Pe);
        }
      }), ve;
    }
    const L = M(() => {
      if (e.multiple) {
        const { value: C } = s;
        return Array.isArray(C) ? F(C) : [];
      }
      return null;
    }), G = M(() => {
      const { value: C } = s;
      return !e.multiple && !Array.isArray(C) ? C === null ? null : F([C])[0] || null : null;
    }), Y = Oo(e), { mergedSizeRef: j, mergedDisabledRef: ne, mergedStatusRef: H } = Y;
    function U(C, A) {
      const { onChange: Z, "onUpdate:value": se, onUpdateValue: ce } = e, { nTriggerFormChange: ve, nTriggerFormInput: be } = Y;
      Z && he(Z, C, A), ce && he(ce, C, A), se && he(se, C, A), a.value = C, ve(), be();
    }
    function de(C) {
      const { onBlur: A } = e, { nTriggerFormBlur: Z } = Y;
      A && he(A, C), Z();
    }
    function Se() {
      const { onClear: C } = e;
      C && he(C);
    }
    function Ie(C) {
      const { onFocus: A, showOnFocus: Z } = e, { nTriggerFormFocus: se } = Y;
      A && he(A, C), se(), Z && ze();
    }
    function Me(C) {
      const { onSearch: A } = e;
      A && he(A, C);
    }
    function $e(C) {
      const { onScroll: A } = e;
      A && he(A, C);
    }
    function ue() {
      var C;
      const { remote: A, multiple: Z } = e;
      if (A) {
        const { value: se } = P;
        if (Z) {
          const { valueField: ce } = e;
          (C = L.value) === null || C === void 0 || C.forEach((ve) => {
            se.set(ve[ce], ve);
          });
        } else {
          const ce = G.value;
          ce && se.set(ce[e.valueField], ce);
        }
      }
    }
    function me(C) {
      const { onUpdateShow: A, "onUpdate:show": Z } = e;
      A && he(A, C), Z && he(Z, C), g.value = C;
    }
    function ze() {
      ne.value || (me(!0), g.value = !0, e.filterable && We());
    }
    function ae() {
      me(!1);
    }
    function Ve() {
      c.value = "", m.value = T;
    }
    const Fe = E(!1);
    function je() {
      e.filterable && (Fe.value = !0);
    }
    function Ge() {
      e.filterable && (Fe.value = !1, u.value || Ve());
    }
    function Ze() {
      ne.value || (u.value ? e.filterable ? We() : ae() : ze());
    }
    function lt(C) {
      var A, Z;
      !((Z = (A = h.value) === null || A === void 0 ? void 0 : A.selfRef) === null || Z === void 0) && Z.contains(C.relatedTarget) || (d.value = !1, de(C), ae());
    }
    function pt(C) {
      Ie(C), d.value = !0;
    }
    function X(C) {
      d.value = !0;
    }
    function le(C) {
      var A;
      !((A = p.value) === null || A === void 0) && A.$el.contains(C.relatedTarget) || (d.value = !1, de(C), ae());
    }
    function xe() {
      var C;
      (C = p.value) === null || C === void 0 || C.focus(), ae();
    }
    function ie(C) {
      var A;
      u.value && (!((A = p.value) === null || A === void 0) && A.$el.contains(Cr(C)) || ae());
    }
    function W(C) {
      if (!Array.isArray(C))
        return [];
      if ($.value)
        return Array.from(C);
      {
        const { remote: A } = e, { value: Z } = v;
        if (A) {
          const { value: se } = P;
          return C.filter((ce) => Z.has(ce) || se.has(ce));
        } else
          return C.filter((se) => Z.has(se));
      }
    }
    function Q(C) {
      D(C.rawNode);
    }
    function D(C) {
      if (ne.value)
        return;
      const { tag: A, remote: Z, clearFilterAfterSelect: se, valueField: ce } = e;
      if (A && !Z) {
        const { value: ve } = m, be = ve[0] || null;
        if (be) {
          const Pe = I.value;
          Pe.length ? Pe.push(be) : I.value = [be], m.value = T;
        }
      }
      if (Z && P.value.set(C[ce], C), e.multiple) {
        const ve = W(s.value), be = ve.findIndex((Pe) => Pe === C[ce]);
        if (~be) {
          if (ve.splice(be, 1), A && !Z) {
            const Pe = q(C[ce]);
            ~Pe && (I.value.splice(Pe, 1), se && (c.value = ""));
          }
        } else
          ve.push(C[ce]), se && (c.value = "");
        U(ve, F(ve));
      } else {
        if (A && !Z) {
          const ve = q(C[ce]);
          ~ve ? I.value = [
            I.value[ve]
          ] : I.value = T;
        }
        Le(), ae(), U(C[ce], C);
      }
    }
    function q(C) {
      return I.value.findIndex((Z) => Z[e.valueField] === C);
    }
    function te(C) {
      u.value || ze();
      const { value: A } = C.target;
      c.value = A;
      const { tag: Z, remote: se } = e;
      if (Me(A), Z && !se) {
        if (!A) {
          m.value = T;
          return;
        }
        const { onCreate: ce } = e, ve = ce ? ce(A) : { [e.labelField]: A, [e.valueField]: A }, { valueField: be } = e;
        y.value.some((Pe) => Pe[be] === ve[be]) || I.value.some((Pe) => Pe[be] === ve[be]) ? m.value = T : m.value = [ve];
      }
    }
    function ye(C) {
      C.stopPropagation();
      const { multiple: A } = e;
      !A && e.filterable && ae(), Se(), A ? U([], []) : U(null, null);
    }
    function _e(C) {
      !dn(C, "action") && !dn(C, "empty") && C.preventDefault();
    }
    function He(C) {
      $e(C);
    }
    function et(C) {
      var A, Z, se, ce, ve;
      switch (C.key) {
        case " ":
          if (e.filterable)
            break;
          C.preventDefault();
        case "Enter":
          if (!(!((A = p.value) === null || A === void 0) && A.isComposing)) {
            if (u.value) {
              const be = (Z = h.value) === null || Z === void 0 ? void 0 : Z.getPendingTmNode();
              be ? Q(be) : e.filterable || (ae(), Le());
            } else if (ze(), e.tag && Fe.value) {
              const be = m.value[0];
              if (be) {
                const Pe = be[e.valueField], { value: tt } = s;
                e.multiple && Array.isArray(tt) && tt.some((kt) => kt === Pe) || D(be);
              }
            }
          }
          C.preventDefault();
          break;
        case "ArrowUp":
          if (C.preventDefault(), e.loading)
            return;
          u.value && ((se = h.value) === null || se === void 0 || se.prev());
          break;
        case "ArrowDown":
          if (C.preventDefault(), e.loading)
            return;
          u.value ? (ce = h.value) === null || ce === void 0 || ce.next() : ze();
          break;
        case "Escape":
          u.value && (_f(C), ae()), (ve = p.value) === null || ve === void 0 || ve.focus();
          break;
      }
    }
    function Le() {
      var C;
      (C = p.value) === null || C === void 0 || C.focus();
    }
    function We() {
      var C;
      (C = p.value) === null || C === void 0 || C.focusInput();
    }
    function dt() {
      var C;
      u.value && ((C = b.value) === null || C === void 0 || C.syncPosition());
    }
    ue(), Te(ke(e, "options"), ue);
    const It = {
      focus: () => {
        var C;
        (C = p.value) === null || C === void 0 || C.focus();
      },
      blur: () => {
        var C;
        (C = p.value) === null || C === void 0 || C.blur();
      }
    }, st = M(() => {
      const { self: { menuBoxShadow: C } } = i.value;
      return {
        "--n-menu-box-shadow": C
      };
    }), vt = n ? xt("select", void 0, st, e) : void 0;
    return Object.assign(Object.assign({}, It), {
      mergedStatus: H,
      mergedClsPrefix: t,
      mergedBordered: o,
      namespace: r,
      treeMate: f,
      isMounted: Dr(),
      triggerRef: p,
      menuRef: h,
      pattern: c,
      uncontrolledShow: g,
      mergedShow: u,
      adjustedTo: Rt(e),
      uncontrolledValue: a,
      mergedValue: s,
      followerRef: b,
      localizedPlaceholder: O,
      selectedOption: G,
      selectedOptions: L,
      mergedSize: j,
      mergedDisabled: ne,
      focused: d,
      activeWithoutMenuOpen: Fe,
      inlineThemeDisabled: n,
      onTriggerInputFocus: je,
      onTriggerInputBlur: Ge,
      handleTriggerOrMenuResize: dt,
      handleMenuFocus: X,
      handleMenuBlur: le,
      handleMenuTabOut: xe,
      handleTriggerClick: Ze,
      handleToggle: Q,
      handleDeleteOption: D,
      handlePatternInput: te,
      handleClear: ye,
      handleTriggerBlur: lt,
      handleTriggerFocus: pt,
      handleKeydown: et,
      handleMenuAfterLeave: Ve,
      handleMenuClickOutside: ie,
      handleMenuScroll: He,
      handleMenuKeydown: et,
      handleMenuMousedown: _e,
      mergedTheme: i,
      cssVars: n ? void 0 : st,
      themeClass: vt == null ? void 0 : vt.themeClass,
      onRender: vt == null ? void 0 : vt.onRender
    });
  },
  render() {
    return x(
      "div",
      { class: `${this.mergedClsPrefix}-select` },
      x(qi, null, {
        default: () => [
          x(Gi, null, {
            default: () => x(uC, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
              arrow: () => {
                var e, t;
                return [(t = (e = this.$slots).arrow) === null || t === void 0 ? void 0 : t.call(e)];
              }
            })
          }),
          x(Yi, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === Rt.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? "target" : void 0, minWidth: "target", placement: this.placement }, {
            default: () => x(Yt, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
              default: () => {
                var e, t, o;
                return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), Er(x(Fx, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
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
                  [Jl, this.mergedShow],
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
    heightTiny: v,
    heightSmall: g,
    heightMedium: u
  } = e;
  return Object.assign(Object.assign({}, Uy), { buttonColor: "#0000", buttonColorHover: "#0000", buttonColorPressed: "#0000", buttonBorder: `1px solid ${l}`, buttonBorderHover: `1px solid ${l}`, buttonBorderPressed: `1px solid ${l}`, buttonIconColor: t, buttonIconColorHover: t, buttonIconColorPressed: t, itemTextColor: t, itemTextColorHover: r, itemTextColorPressed: n, itemTextColorActive: o, itemTextColorDisabled: a, itemColor: "#0000", itemColorHover: "#0000", itemColorPressed: "#0000", itemColorActive: "#0000", itemColorActiveHover: "#0000", itemColorDisabled: i, itemBorder: "1px solid #0000", itemBorderHover: "1px solid #0000", itemBorderPressed: "1px solid #0000", itemBorderActive: `1px solid ${o}`, itemBorderDisabled: `1px solid ${l}`, itemBorderRadius: s, itemSizeSmall: v, itemSizeMedium: g, itemSizeLarge: u, itemFontSizeSmall: d, itemFontSizeMedium: c, itemFontSizeLarge: f, jumperFontSizeSmall: d, jumperFontSizeMedium: c, jumperFontSizeLarge: f, jumperTextColor: t, jumperTextColorDisabled: a });
}, Gy = {
  name: "Pagination",
  common: ee,
  peers: {
    Select: ac,
    Input: Dt,
    Popselect: nc
  },
  self(e) {
    const { primaryColor: t, opacity3: o } = e, r = K(t, {
      alpha: Number(o)
    }), n = qy(e);
    return n.itemBorderActive = `1px solid ${r}`, n.itemBorderDisabled = "1px solid #0000", n;
  }
}, lc = Gy, sc = {
  padding: "8px 14px"
}, Ky = {
  name: "Tooltip",
  common: ee,
  peers: {
    Popover: Ao
  },
  self(e) {
    const { borderRadius: t, boxShadow2: o, popoverColor: r, textColor2: n } = e;
    return Object.assign(Object.assign({}, sc), { borderRadius: t, boxShadow: o, color: r, textColor: n });
  }
}, En = Ky, Yy = (e) => {
  const { borderRadius: t, boxShadow2: o, baseColor: r } = e;
  return Object.assign(Object.assign({}, sc), { borderRadius: t, boxShadow: o, color: fe(r, "rgba(0, 0, 0, .85)"), textColor: r });
}, Xy = {
  name: "Tooltip",
  common: mt,
  peers: {
    Popover: ha
  },
  self: Yy
}, Zy = Xy, Jy = {
  name: "Ellipsis",
  common: ee,
  peers: {
    Tooltip: En
  }
}, dc = Jy, Qy = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
}, ew = {
  name: "Radio",
  common: ee,
  self(e) {
    const { borderColor: t, primaryColor: o, baseColor: r, textColorDisabled: n, inputColorDisabled: i, textColor2: a, opacityDisabled: l, borderRadius: s, fontSizeSmall: d, fontSizeMedium: c, fontSizeLarge: f, heightSmall: v, heightMedium: g, heightLarge: u, lineHeight: p } = e;
    return Object.assign(Object.assign({}, Qy), {
      labelLineHeight: p,
      buttonHeightSmall: v,
      buttonHeightMedium: g,
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
}, cc = ew, tw = {
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
  const { primaryColor: t, textColor2: o, dividerColor: r, hoverColor: n, popoverColor: i, invertedColor: a, borderRadius: l, fontSizeSmall: s, fontSizeMedium: d, fontSizeLarge: c, fontSizeHuge: f, heightSmall: v, heightMedium: g, heightLarge: u, heightHuge: p, textColor3: b, opacityDisabled: h } = e;
  return Object.assign(Object.assign({}, tw), {
    optionHeightSmall: v,
    optionHeightMedium: g,
    optionHeightLarge: u,
    optionHeightHuge: p,
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
    groupHeaderTextColor: b,
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
  const { cardColor: t, modalColor: o, popoverColor: r, textColor2: n, textColor1: i, tableHeaderColor: a, tableColorHover: l, iconColor: s, primaryColor: d, fontWeightStrong: c, borderRadius: f, lineHeight: v, fontSizeSmall: g, fontSizeMedium: u, fontSizeLarge: p, dividerColor: b, heightSmall: h, opacityDisabled: S, tableColorStriped: O } = e;
  return Object.assign(Object.assign({}, nw), {
    actionDividerColor: b,
    lineHeight: v,
    borderRadius: f,
    fontSizeSmall: g,
    fontSizeMedium: u,
    fontSizeLarge: p,
    borderColor: fe(t, b),
    tdColorHover: fe(t, l),
    tdColorStriped: fe(t, O),
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
    borderColorModal: fe(o, b),
    tdColorHoverModal: fe(o, l),
    tdColorStripedModal: fe(o, O),
    thColorModal: fe(o, a),
    thColorHoverModal: fe(fe(o, a), l),
    tdColorModal: o,
    // popover
    borderColorPopover: fe(r, b),
    tdColorHoverPopover: fe(r, l),
    tdColorStripedPopover: fe(r, O),
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
    Radio: cc,
    Pagination: lc,
    Scrollbar: St,
    Empty: Bo,
    Popover: Ao,
    Ellipsis: dc,
    Dropdown: va
  },
  self(e) {
    const t = iw(e);
    return t.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)", t.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)", t;
  }
}, lw = aw, sw = Object.assign(Object.assign({}, Hd), Ee.props), dw = Ce({
  name: "Tooltip",
  props: sw,
  __popover__: !0,
  setup(e) {
    const t = Ee("Tooltip", "-tooltip", void 0, Zy, e), o = E(null);
    return Object.assign(Object.assign({}, {
      syncPosition() {
        o.value.syncPosition();
      },
      setShow(n) {
        o.value.setShow(n);
      }
    }), { popoverRef: o, mergedTheme: t, popoverThemeOverrides: M(() => t.value.self) });
  },
  render() {
    const { mergedTheme: e, internalExtraClass: t } = this;
    return x(Ld, Object.assign(Object.assign({}, this.$props), { theme: e.peers.Popover, themeOverrides: e.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: t.concat("tooltip"), ref: "popoverRef" }), this.$slots);
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
    Input: Dt
  },
  self: pw
}, uc = vw, gw = {
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
  const { hoverColor: t, fontSize: o, textColor2: r, textColorDisabled: n, popoverColor: i, primaryColor: a, borderRadiusSmall: l, iconColor: s, iconColorDisabled: d, textColor1: c, dividerColor: f, boxShadow2: v, borderRadius: g, fontWeightStrong: u } = e;
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
    panelBoxShadow: v,
    panelBorderRadius: g,
    calendarTitleFontWeight: u,
    scrollItemBorderRadius: g,
    iconColor: s,
    iconColorDisabled: d
  });
}, bw = {
  name: "DatePicker",
  common: ee,
  peers: {
    Input: Dt,
    Button: Pt,
    TimePicker: uc,
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
  const { tableHeaderColor: t, textColor2: o, textColor1: r, cardColor: n, modalColor: i, popoverColor: a, dividerColor: l, borderRadius: s, fontWeightStrong: d, lineHeight: c, fontSizeSmall: f, fontSizeMedium: v, fontSizeLarge: g } = e;
  return Object.assign(Object.assign({}, Cw), {
    lineHeight: c,
    fontSizeSmall: f,
    fontSizeMedium: v,
    fontSizeLarge: g,
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
}, kw = (e) => {
  const { textColor1: t, textColor2: o, modalColor: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, infoColor: d, successColor: c, warningColor: f, errorColor: v, primaryColor: g, dividerColor: u, borderRadius: p, fontWeightStrong: b, lineHeight: h, fontSize: S } = e;
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
    closeBorderRadius: p,
    iconColor: g,
    iconColorInfo: d,
    iconColorSuccess: c,
    iconColorWarning: f,
    iconColorError: v,
    borderRadius: p,
    titleFontWeight: b
  });
}, $w = {
  name: "Dialog",
  common: ee,
  peers: {
    Button: Pt
  },
  self: kw
}, fc = $w, Tw = (e) => {
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
    Dialog: fc,
    Card: ec
  },
  self: Tw
}, _w = zw, hc = (e) => {
  const { textColor1: t, dividerColor: o, fontWeightStrong: r } = e;
  return {
    textColor: t,
    color: o,
    fontWeight: r
  };
}, Iw = {
  name: "Divider",
  common: mt,
  self: hc
}, Ow = Iw, Ew = {
  name: "Divider",
  common: ee,
  self: hc
}, Rw = Ew, Mw = R("divider", `
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
 `)]), B("title", `
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `), J("title-position-left", [B("line", [J("left", {
  width: "28px"
})])]), J("title-position-right", [B("line", [J("right", {
  width: "28px"
})])]), J("dashed", [B("line", `
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
 `), B("line", `
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `), Qe("dashed", [B("line", {
  backgroundColor: "var(--n-color)"
})]), J("dashed", [B("line", {
  borderColor: "var(--n-color)"
})]), J("vertical", {
  backgroundColor: "var(--n-color)"
})]), Dw = Object.assign(Object.assign({}, Ee.props), { titlePlacement: {
  type: String,
  default: "center"
}, dashed: Boolean, vertical: Boolean }), pc = Ce({
  name: "Divider",
  props: Dw,
  setup(e) {
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = wt(e), r = Ee("Divider", "-divider", Mw, Ow, e, t), n = M(() => {
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
    return (e = this.onRender) === null || e === void 0 || e.call(this), x(
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
      r ? null : x("div", { class: `${a}-divider__line ${a}-divider__line--left` }),
      !r && t.default ? x(
        Jt,
        null,
        x("div", { class: `${a}-divider__title` }, this.$slots),
        x("div", { class: `${a}-divider__line ${a}-divider__line--right` })
      ) : null
    );
  }
}), Bw = (e) => {
  const { modalColor: t, textColor1: o, textColor2: r, boxShadow3: n, lineHeight: i, fontWeightStrong: a, dividerColor: l, closeColorHover: s, closeColorPressed: d, closeIconColor: c, closeIconColorHover: f, closeIconColorPressed: v, borderRadius: g, primaryColorHover: u } = e;
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
    closeIconColorPressed: v,
    closeSize: "22px",
    closeIconSize: "18px",
    closeColorHover: s,
    closeColorPressed: d,
    closeBorderRadius: g,
    resizableTriggerColorHover: u
  };
}, Aw = {
  name: "Drawer",
  common: ee,
  peers: {
    Scrollbar: St
  },
  self: Bw
}, Fw = Aw, Hw = {
  actionMargin: "0 0 0 20px",
  actionMarginRtl: "0 20px 0 0"
}, Lw = {
  name: "DynamicInput",
  common: ee,
  peers: {
    Input: Dt,
    Button: Pt
  },
  self() {
    return Hw;
  }
}, Ww = Lw, vc = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
}, Nw = {
  name: "Space",
  self() {
    return vc;
  }
}, gc = Nw, Vw = () => vc, jw = {
  name: "Space",
  self: Vw
}, Uw = jw;
let li;
const qw = () => {
  if (!Mr)
    return !0;
  if (li === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), li = t;
  }
  return li;
}, Gw = Object.assign(Object.assign({}, Ee.props), {
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
}), mc = Ce({
  name: "Space",
  props: Gw,
  setup(e) {
    const { mergedClsPrefixRef: t, mergedRtlRef: o } = wt(e), r = Ee("Space", "-space", void 0, Uw, e, t), n = Do("Space", o, t);
    return {
      useGap: qw(),
      rtlEnabled: n,
      mergedClsPrefix: t,
      margin: M(() => {
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
    const { vertical: e, align: t, inline: o, justify: r, itemStyle: n, margin: i, wrap: a, mergedClsPrefix: l, rtlEnabled: s, useGap: d, wrapItem: c, internalUseGap: f } = this, v = un(ef(this));
    if (!v.length)
      return null;
    const g = `${i.horizontal}px`, u = `${i.horizontal / 2}px`, p = `${i.vertical}px`, b = `${i.vertical / 2}px`, h = v.length - 1, S = r.startsWith("space-");
    return x("div", { role: "none", class: [
      `${l}-space`,
      s && `${l}-space--rtl`
    ], style: {
      display: o ? "inline-flex" : "flex",
      flexDirection: e ? "column" : "row",
      justifyContent: ["start", "end"].includes(r) ? "flex-" + r : r,
      flexWrap: !a || e ? "nowrap" : "wrap",
      marginTop: d || e ? "" : `-${b}`,
      marginBottom: d || e ? "" : `-${b}`,
      alignItems: t,
      gap: d ? `${i.vertical}px ${i.horizontal}px` : ""
    } }, !c && (d || f) ? v : v.map((O, y) => x("div", { role: "none", style: [
      n,
      {
        maxWidth: "100%"
      },
      d ? "" : e ? {
        marginBottom: y !== h ? p : ""
      } : s ? {
        marginLeft: S ? r === "space-between" && y === h ? "" : u : y !== h ? g : "",
        marginRight: S ? r === "space-between" && y === 0 ? "" : u : "",
        paddingTop: b,
        paddingBottom: b
      } : {
        marginRight: S ? r === "space-between" && y === h ? "" : u : y !== h ? g : "",
        marginLeft: S ? r === "space-between" && y === 0 ? "" : u : "",
        paddingTop: b,
        paddingBottom: b
      }
    ] }, O)));
  }
}), Kw = {
  name: "DynamicTags",
  common: ee,
  peers: {
    Input: Dt,
    Button: Pt,
    Tag: Nd,
    Space: gc
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
}, bc = (e) => {
  const { heightSmall: t, heightMedium: o, heightLarge: r, textColor1: n, errorColor: i, warningColor: a, lineHeight: l, textColor3: s } = e;
  return Object.assign(Object.assign({}, Jw), { blankHeightSmall: t, blankHeightMedium: o, blankHeightLarge: r, lineHeight: l, labelTextColor: n, asteriskColor: i, feedbackTextColorError: i, feedbackTextColorWarning: a, feedbackTextColor: s });
}, Qw = {
  name: "Form",
  common: mt,
  self: bc
}, e1 = Qw, t1 = {
  name: "Form",
  common: ee,
  self: bc
}, o1 = t1, Rn = "n-form", r1 = "n-form-item-insts";
function ko() {
  return ko = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];
      for (var r in o)
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
  }, ko.apply(this, arguments);
}
function n1(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ir(e, t);
}
function Mi(e) {
  return Mi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, Mi(e);
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
function Di(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Di = function(r) {
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
      return an(r, arguments, Mi(this).constructor);
    }
    return n.prototype = Object.create(r.prototype, {
      constructor: {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Ir(n, r);
  }, Di(e);
}
var l1 = /%[sdj%]/g, xc = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (xc = function(t, o) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && o.every(function(r) {
    return typeof r == "string";
  }) && console.warn(t, o);
});
function Bi(e) {
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
function rt(e, t) {
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
function El(e, t, o) {
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
}(/* @__PURE__ */ Di(Error));
function u1(e, t, o, r, n) {
  if (t.first) {
    var i = new Promise(function(v, g) {
      var u = function(h) {
        return r(h), h.length ? g(new Rl(h, Bi(h))) : v(n);
      }, p = c1(e);
      El(p, o, u);
    });
    return i.catch(function(v) {
      return v;
    }), i;
  }
  var a = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], l = Object.keys(e), s = l.length, d = 0, c = [], f = new Promise(function(v, g) {
    var u = function(b) {
      if (c.push.apply(c, b), d++, d === s)
        return r(c), c.length ? g(new Rl(c, Bi(c))) : v(n);
    };
    l.length || (r(c), v(n)), l.forEach(function(p) {
      var b = e[p];
      a.indexOf(p) !== -1 ? El(b, o, u) : d1(b, o, u);
    });
  });
  return f.catch(function(v) {
    return v;
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
function Ml(e, t) {
  return function(o) {
    var r;
    return e.fullFields ? r = h1(t, e.fullFields) : r = t[o.field || e.fullField], f1(o) ? (o.field = o.field || e.fullField, o.fieldValue = r, o) : {
      message: typeof o == "function" ? o() : o,
      fieldValue: r,
      field: o.field || e.fullField
    };
  };
}
function Dl(e, t) {
  if (t) {
    for (var o in t)
      if (t.hasOwnProperty(o)) {
        var r = t[o];
        typeof r == "object" && typeof e[o] == "object" ? e[o] = ko({}, e[o], r) : e[o] = r;
      }
  }
  return e;
}
var Cc = function(t, o, r, n, i, a) {
  t.required && (!r.hasOwnProperty(t.field) || rt(o, a || t.type)) && n.push(Tt(i.messages.required, t.fullField));
}, p1 = function(t, o, r, n, i) {
  (/^\s+$/.test(o) || o === "") && n.push(Tt(i.messages.whitespace, t.fullField));
}, Jr, v1 = function() {
  if (Jr)
    return Jr;
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
  s.v4 = function(O) {
    return O && O.exact ? a : new RegExp("" + t(O) + o + t(O), "g");
  }, s.v6 = function(O) {
    return O && O.exact ? l : new RegExp("" + t(O) + n + t(O), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", f = s.v4().source, v = s.v6().source, g = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", u = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", p = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", b = "(?::\\d{2,5})?", h = '(?:[/?#][^\\s"]*)?', S = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + f + "|" + v + "|" + g + u + p + ")" + b + h;
  return Jr = new RegExp("(?:^" + S + "$)", "i"), Jr;
}, Bl = {
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
    return typeof t == "string" && t.length <= 320 && !!t.match(Bl.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(v1());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Bl.hex);
  }
}, g1 = function(t, o, r, n, i) {
  if (t.required && o === void 0) {
    Cc(t, o, r, n, i);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = t.type;
  a.indexOf(l) > -1 ? ur[l](o) || n.push(Tt(i.messages.types[l], t.fullField, t.type)) : l && typeof o !== t.type && n.push(Tt(i.messages.types[l], t.fullField, t.type));
}, m1 = function(t, o, r, n, i) {
  var a = typeof t.len == "number", l = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = o, f = null, v = typeof o == "number", g = typeof o == "string", u = Array.isArray(o);
  if (v ? f = "number" : g ? f = "string" : u && (f = "array"), !f)
    return !1;
  u && (c = o.length), g && (c = o.replace(d, "_").length), a ? c !== t.len && n.push(Tt(i.messages[f].len, t.fullField, t.len)) : l && !s && c < t.min ? n.push(Tt(i.messages[f].min, t.fullField, t.min)) : s && !l && c > t.max ? n.push(Tt(i.messages[f].max, t.fullField, t.max)) : l && s && (c < t.min || c > t.max) && n.push(Tt(i.messages[f].range, t.fullField, t.min, t.max));
}, Vo = "enum", b1 = function(t, o, r, n, i) {
  t[Vo] = Array.isArray(t[Vo]) ? t[Vo] : [], t[Vo].indexOf(o) === -1 && n.push(Tt(i.messages[Vo], t.fullField, t[Vo].join(", ")));
}, x1 = function(t, o, r, n, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(o) || n.push(Tt(i.messages.pattern.mismatch, t.fullField, o, t.pattern));
    else if (typeof t.pattern == "string") {
      var a = new RegExp(t.pattern);
      a.test(o) || n.push(Tt(i.messages.pattern.mismatch, t.fullField, o, t.pattern));
    }
  }
}, Oe = {
  required: Cc,
  whitespace: p1,
  type: g1,
  range: m1,
  enum: b1,
  pattern: x1
}, C1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o, "string") && !t.required)
      return r();
    Oe.required(t, o, n, a, i, "string"), rt(o, "string") || (Oe.type(t, o, n, a, i), Oe.range(t, o, n, a, i), Oe.pattern(t, o, n, a, i), t.whitespace === !0 && Oe.whitespace(t, o, n, a, i));
  }
  r(a);
}, y1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), o !== void 0 && Oe.type(t, o, n, a, i);
  }
  r(a);
}, w1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (o === "" && (o = void 0), rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), o !== void 0 && (Oe.type(t, o, n, a, i), Oe.range(t, o, n, a, i));
  }
  r(a);
}, S1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), o !== void 0 && Oe.type(t, o, n, a, i);
  }
  r(a);
}, P1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), rt(o) || Oe.type(t, o, n, a, i);
  }
  r(a);
}, k1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), o !== void 0 && (Oe.type(t, o, n, a, i), Oe.range(t, o, n, a, i));
  }
  r(a);
}, $1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), o !== void 0 && (Oe.type(t, o, n, a, i), Oe.range(t, o, n, a, i));
  }
  r(a);
}, T1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (o == null && !t.required)
      return r();
    Oe.required(t, o, n, a, i, "array"), o != null && (Oe.type(t, o, n, a, i), Oe.range(t, o, n, a, i));
  }
  r(a);
}, z1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), o !== void 0 && Oe.type(t, o, n, a, i);
  }
  r(a);
}, _1 = "enum", I1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i), o !== void 0 && Oe[_1](t, o, n, a, i);
  }
  r(a);
}, O1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o, "string") && !t.required)
      return r();
    Oe.required(t, o, n, a, i), rt(o, "string") || Oe.pattern(t, o, n, a, i);
  }
  r(a);
}, E1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o, "date") && !t.required)
      return r();
    if (Oe.required(t, o, n, a, i), !rt(o, "date")) {
      var s;
      o instanceof Date ? s = o : s = new Date(o), Oe.type(t, s, n, a, i), s && Oe.range(t, s.getTime(), n, a, i);
    }
  }
  r(a);
}, R1 = function(t, o, r, n, i) {
  var a = [], l = Array.isArray(o) ? "array" : typeof o;
  Oe.required(t, o, n, a, i, l), r(a);
}, si = function(t, o, r, n, i) {
  var a = t.type, l = [], s = t.required || !t.required && n.hasOwnProperty(t.field);
  if (s) {
    if (rt(o, a) && !t.required)
      return r();
    Oe.required(t, o, n, l, i, a), rt(o, a) || Oe.type(t, o, n, l, i);
  }
  r(l);
}, M1 = function(t, o, r, n, i) {
  var a = [], l = t.required || !t.required && n.hasOwnProperty(t.field);
  if (l) {
    if (rt(o) && !t.required)
      return r();
    Oe.required(t, o, n, a, i);
  }
  r(a);
}, mr = {
  string: C1,
  method: y1,
  number: w1,
  boolean: S1,
  regexp: P1,
  integer: k1,
  float: $1,
  array: T1,
  object: z1,
  enum: I1,
  pattern: O1,
  date: E1,
  url: si,
  hex: si,
  email: si,
  required: R1,
  any: M1
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
    return r && (this._messages = Dl(Ai(), r)), this._messages;
  }, t.validate = function(r, n, i) {
    var a = this;
    n === void 0 && (n = {}), i === void 0 && (i = function() {
    });
    var l = r, s = n, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, l), Promise.resolve(l);
    function c(p) {
      var b = [], h = {};
      function S(y) {
        if (Array.isArray(y)) {
          var T;
          b = (T = b).concat.apply(T, y);
        } else
          b.push(y);
      }
      for (var O = 0; O < p.length; O++)
        S(p[O]);
      b.length ? (h = Bi(b), d(b, h)) : d(null, l);
    }
    if (s.messages) {
      var f = this.messages();
      f === Fi && (f = Ai()), Dl(f, s.messages), s.messages = f;
    } else
      s.messages = this.messages();
    var v = {}, g = s.keys || Object.keys(this.rules);
    g.forEach(function(p) {
      var b = a.rules[p], h = l[p];
      b.forEach(function(S) {
        var O = S;
        typeof O.transform == "function" && (l === r && (l = ko({}, l)), h = l[p] = O.transform(h)), typeof O == "function" ? O = {
          validator: O
        } : O = ko({}, O), O.validator = a.getValidationMethod(O), O.validator && (O.field = p, O.fullField = O.fullField || p, O.type = a.getType(O), v[p] = v[p] || [], v[p].push({
          rule: O,
          value: h,
          source: l,
          field: p
        }));
      });
    });
    var u = {};
    return u1(v, s, function(p, b) {
      var h = p.rule, S = (h.type === "object" || h.type === "array") && (typeof h.fields == "object" || typeof h.defaultField == "object");
      S = S && (h.required || !h.required && p.value), h.field = p.field;
      function O(I, m) {
        return ko({}, m, {
          fullField: h.fullField + "." + I,
          fullFields: h.fullFields ? [].concat(h.fullFields, [I]) : [I]
        });
      }
      function y(I) {
        I === void 0 && (I = []);
        var m = Array.isArray(I) ? I : [I];
        !s.suppressWarning && m.length && e.warning("async-validator:", m), m.length && h.message !== void 0 && (m = [].concat(h.message));
        var P = m.map(Ml(h, l));
        if (s.first && P.length)
          return u[h.field] = 1, b(P);
        if (!S)
          b(P);
        else {
          if (h.required && !p.value)
            return h.message !== void 0 ? P = [].concat(h.message).map(Ml(h, l)) : s.error && (P = [s.error(h, Tt(s.messages.required, h.field))]), b(P);
          var $ = {};
          h.defaultField && Object.keys(p.value).map(function(w) {
            $[w] = h.defaultField;
          }), $ = ko({}, $, p.rule.fields);
          var k = {};
          Object.keys($).forEach(function(w) {
            var F = $[w], L = Array.isArray(F) ? F : [F];
            k[w] = L.map(O.bind(null, w));
          });
          var _ = new e(k);
          _.messages(s.messages), p.rule.options && (p.rule.options.messages = s.messages, p.rule.options.error = s.error), _.validate(p.value, p.rule.options || s, function(w) {
            var F = [];
            P && P.length && F.push.apply(F, P), w && w.length && F.push.apply(F, w), b(F.length ? F : null);
          });
        }
      }
      var T;
      if (h.asyncValidator)
        T = h.asyncValidator(h, p.value, y, p.source, s);
      else if (h.validator) {
        try {
          T = h.validator(h, p.value, y, p.source, s);
        } catch (I) {
          console.error == null || console.error(I), s.suppressValidatorError || setTimeout(function() {
            throw I;
          }, 0), y(I.message);
        }
        T === !0 ? y() : T === !1 ? y(typeof h.message == "function" ? h.message(h.fullField || h.field) : h.message || (h.fullField || h.field) + " fails") : T instanceof Array ? y(T) : T instanceof Error && y(T.message);
      }
      T && T.then && T.then(function() {
        return y();
      }, function(I) {
        return y(I);
      });
    }, function(p) {
      c(p);
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
Fr.warning = xc;
Fr.messages = Fi;
Fr.validators = mr;
function D1(e) {
  const t = Be(Rn, null);
  return {
    mergedSize: M(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function B1(e) {
  const t = Be(Rn, null), o = M(() => {
    const { labelPlacement: g } = e;
    return g !== void 0 ? g : t != null && t.props.labelPlacement ? t.props.labelPlacement : "top";
  }), r = M(() => o.value === "left" && (e.labelWidth === "auto" || (t == null ? void 0 : t.props.labelWidth) === "auto")), n = M(() => {
    if (o.value === "top")
      return;
    const { labelWidth: g } = e;
    if (g !== void 0 && g !== "auto")
      return Ko(g);
    if (r.value) {
      const u = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return u !== void 0 ? Ko(u) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return Ko(t.props.labelWidth);
  }), i = M(() => {
    const { labelAlign: g } = e;
    if (g)
      return g;
    if (t != null && t.props.labelAlign)
      return t.props.labelAlign;
  }), a = M(() => {
    var g;
    return [
      (g = e.labelProps) === null || g === void 0 ? void 0 : g.style,
      e.labelStyle,
      {
        width: n.value
      }
    ];
  }), l = M(() => {
    const { showRequireMark: g } = e;
    return g !== void 0 ? g : t == null ? void 0 : t.props.showRequireMark;
  }), s = M(() => {
    const { requireMarkPlacement: g } = e;
    return g !== void 0 ? g : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = E(!1), c = M(() => {
    const { validationStatus: g } = e;
    if (g !== void 0)
      return g;
    if (d.value)
      return "error";
  }), f = M(() => {
    const { showFeedback: g } = e;
    return g !== void 0 ? g : (t == null ? void 0 : t.props.showFeedback) !== void 0 ? t.props.showFeedback : !0;
  }), v = M(() => {
    const { showLabel: g } = e;
    return g !== void 0 ? g : (t == null ? void 0 : t.props.showLabel) !== void 0 ? t.props.showLabel : !0;
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
    mergedShowLabel: v,
    isAutoLabelWidth: r
  };
}
function A1(e) {
  const t = Be(Rn, null), o = M(() => {
    const { rulePath: a } = e;
    if (a !== void 0)
      return a;
    const { path: l } = e;
    if (l !== void 0)
      return l;
  }), r = M(() => {
    const a = [], { rule: l } = e;
    if (l !== void 0 && (Array.isArray(l) ? a.push(...l) : a.push(l)), t) {
      const { rules: s } = t.props, { value: d } = o;
      if (s !== void 0 && d !== void 0) {
        const c = sa(s, d);
        c !== void 0 && (Array.isArray(c) ? a.push(...c) : a.push(c));
      }
    }
    return a;
  }), n = M(() => r.value.some((a) => a.required)), i = M(() => n.value || e.required);
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
const H1 = R("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [R("form-item-label", `
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
 `, [B("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), B("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), R("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), J("auto-label-width", [R("form-item-label", "white-space: nowrap;")]), J("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: start;
 `, [R("form-item-label", `
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
 `), B("text", `
 grid-area: text; 
 `), B("asterisk", `
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
 `), R("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), R("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), R("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [N("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), R("form-item-feedback", {
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
const L1 = Object.assign(Object.assign({}, Ee.props), { label: String, labelWidth: [Number, String], labelStyle: [String, Object], labelAlign: String, labelPlacement: String, path: String, first: Boolean, rulePath: String, required: Boolean, showRequireMark: {
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
const ga = Ce({
  name: "FormItem",
  props: L1,
  setup(e) {
    If(r1, "formItems", ke(e, "path"));
    const { mergedClsPrefixRef: t, inlineThemeDisabled: o } = wt(e), r = Be(Rn, null), n = D1(e), i = B1(e), { validationErrored: a } = i, { mergedRequired: l, mergedRules: s } = A1(e), { mergedSize: d } = n, { mergedLabelPlacement: c, mergedLabelAlign: f, mergedRequireMarkPlacement: v } = i, g = E([]), u = E(cn()), p = r ? ke(r.props, "disabled") : E(!1), b = Ee("Form", "-form-item", H1, e1, e, t);
    Te(ke(e, "path"), () => {
      e.ignorePathChange || h();
    });
    function h() {
      g.value = [], a.value = !1, e.feedback && (u.value = cn());
    }
    function S() {
      m("blur");
    }
    function O() {
      m("change");
    }
    function y() {
      m("focus");
    }
    function T() {
      m("input");
    }
    function I(F, L) {
      return Fl(this, void 0, void 0, function* () {
        let G, Y, j, ne;
        return typeof F == "string" ? (G = F, Y = L) : F !== null && typeof F == "object" && (G = F.trigger, Y = F.callback, j = F.shouldRuleBeApplied, ne = F.options), yield new Promise((H, U) => {
          m(G, j, ne).then(({ valid: de, errors: Se }) => {
            de ? (Y && Y(), H()) : (Y && Y(Se), U(Se));
          });
        });
      });
    }
    const m = (F = null, L = () => !0, G = {
      suppressWarning: !0
    }) => Fl(this, void 0, void 0, function* () {
      const { path: Y } = e;
      G ? G.first || (G.first = e.first) : G = {};
      const { value: j } = s, ne = r ? sa(r.props.model, Y || "") : void 0, H = {}, U = {}, de = (F ? j.filter(($e) => Array.isArray($e.trigger) ? $e.trigger.includes(F) : $e.trigger === F) : j).filter(L).map(($e, ue) => {
        const me = Object.assign({}, $e);
        if (me.validator && (me.validator = Hl(me.validator, !1)), me.asyncValidator && (me.asyncValidator = Hl(me.asyncValidator, !0)), me.renderMessage) {
          const ze = `__renderMessage__${ue}`;
          U[ze] = me.message, me.message = ze, H[ze] = me.renderMessage;
        }
        return me;
      });
      if (!de.length)
        return {
          valid: !0
        };
      const Se = Y ?? "__n_no_path__", Ie = new Fr({ [Se]: de }), { validateMessages: Me } = (r == null ? void 0 : r.props) || {};
      return Me && Ie.messages(Me), yield new Promise(($e) => {
        Ie.validate({ [Se]: ne }, G, (ue) => {
          ue != null && ue.length ? (g.value = ue.map((me) => {
            const ze = (me == null ? void 0 : me.message) || "";
            return {
              key: ze,
              render: () => ze.startsWith("__renderMessage__") ? H[ze]() : ze
            };
          }), ue.forEach((me) => {
            var ze;
            !((ze = me.message) === null || ze === void 0) && ze.startsWith("__renderMessage__") && (me.message = U[me.message]);
          }), a.value = !0, $e({
            valid: !1,
            errors: ue
          })) : (h(), $e({
            valid: !0
          }));
        });
      });
    });
    _t(Si, {
      path: ke(e, "path"),
      disabled: p,
      mergedSize: n.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: h,
      handleContentBlur: S,
      handleContentChange: O,
      handleContentFocus: y,
      handleContentInput: T
    });
    const P = {
      validate: I,
      restoreValidation: h,
      internalValidate: m
    }, $ = E(null);
    yt(() => {
      if (!i.isAutoLabelWidth.value)
        return;
      const F = $.value;
      if (F !== null) {
        const L = F.style.whiteSpace;
        F.style.whiteSpace = "nowrap", F.style.width = "", r == null || r.deriveMaxChildLabelWidth(Number(getComputedStyle(F).width.slice(0, -2))), F.style.whiteSpace = L;
      }
    });
    const k = M(() => {
      var F;
      const { value: L } = d, { value: G } = c, Y = G === "top" ? "vertical" : "horizontal", { common: { cubicBezierEaseInOut: j }, self: { labelTextColor: ne, asteriskColor: H, lineHeight: U, feedbackTextColor: de, feedbackTextColorWarning: Se, feedbackTextColorError: Ie, feedbackPadding: Me, labelFontWeight: $e, [oe("labelHeight", L)]: ue, [oe("blankHeight", L)]: me, [oe("feedbackFontSize", L)]: ze, [oe("feedbackHeight", L)]: ae, [oe("labelPadding", Y)]: Ve, [oe("labelTextAlign", Y)]: Fe, [oe(oe("labelFontSize", G), L)]: je } } = b.value;
      let Ge = (F = f.value) !== null && F !== void 0 ? F : Fe;
      return G === "top" && (Ge = Ge === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": j,
        "--n-line-height": U,
        "--n-blank-height": me,
        "--n-label-font-size": je,
        "--n-label-text-align": Ge,
        "--n-label-height": ue,
        "--n-label-padding": Ve,
        "--n-label-font-weight": $e,
        "--n-asterisk-color": H,
        "--n-label-text-color": ne,
        "--n-feedback-padding": Me,
        "--n-feedback-font-size": ze,
        "--n-feedback-height": ae,
        "--n-feedback-text-color": de,
        "--n-feedback-text-color-warning": Se,
        "--n-feedback-text-color-error": Ie
      };
    }), _ = o ? xt("form-item", M(() => {
      var F;
      return `${d.value[0]}${c.value[0]}${((F = f.value) === null || F === void 0 ? void 0 : F[0]) || ""}`;
    }), k, e) : void 0, w = M(() => c.value === "left" && v.value === "left" && f.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({ labelElementRef: $, mergedClsPrefix: t, mergedRequired: l, feedbackId: u, renderExplains: g, reverseColSpace: w }, i), n), P), { cssVars: o ? void 0 : k, themeClass: _ == null ? void 0 : _.themeClass, onRender: _ == null ? void 0 : _.onRender });
  },
  render() {
    const { $slots: e, mergedClsPrefix: t, mergedShowLabel: o, mergedShowRequireMark: r, mergedRequireMarkPlacement: n, onRender: i } = this, a = r !== void 0 ? r : this.mergedRequired;
    i == null || i();
    const l = () => {
      const s = this.$slots.label ? this.$slots.label() : this.label;
      if (!s)
        return null;
      const d = x("span", { class: `${t}-form-item-label__text` }, s), c = a ? x("span", { class: `${t}-form-item-label__asterisk` }, n !== "left" ? " *" : "* ") : n === "right-hanging" && x("span", { class: `${t}-form-item-label__asterisk-placeholder` }, " *"), { labelProps: f } = this;
      return x("label", Object.assign({}, f, { class: [
        f == null ? void 0 : f.class,
        `${t}-form-item-label`,
        `${t}-form-item-label--${n}-mark`,
        this.reverseColSpace && `${t}-form-item-label--reverse-columns-space`
      ], style: this.mergedLabelStyle, ref: "labelElementRef" }), n === "left" ? [c, d] : [d, c]);
    };
    return x(
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
      x("div", { class: [
        `${t}-form-item-blank`,
        this.mergedValidationStatus && `${t}-form-item-blank--${this.mergedValidationStatus}`
      ] }, e),
      this.mergedShowFeedback ? x(
        "div",
        { key: this.feedbackId, class: `${t}-form-item-feedback-wrapper` },
        x(Yt, { name: "fade-down-transition", mode: "out-in" }, {
          default: () => {
            const { mergedValidationStatus: s } = this;
            return gt(e.feedback, (d) => {
              var c;
              const { feedback: f } = this, v = d || f ? x("div", { key: "__feedback__", class: `${t}-form-item-feedback__line` }, d || f) : this.renderExplains.length ? (c = this.renderExplains) === null || c === void 0 ? void 0 : c.map(({ key: g, render: u }) => x("div", { key: g, class: `${t}-form-item-feedback__line` }, u())) : null;
              return v ? s === "warning" ? x("div", { key: "controlled-warning", class: `${t}-form-item-feedback ${t}-form-item-feedback--warning` }, v) : s === "error" ? x("div", { key: "controlled-error", class: `${t}-form-item-feedback ${t}-form-item-feedback--error` }, v) : s === "success" ? x("div", { key: "controlled-success", class: `${t}-form-item-feedback ${t}-form-item-feedback--success` }, v) : x("div", { key: "controlled-default", class: `${t}-form-item-feedback` }, v) : null;
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
}, N1 = W1, V1 = (e) => {
  const { primaryColor: t, baseColor: o } = e;
  return {
    color: t,
    iconColor: o
  };
}, j1 = {
  name: "IconWrapper",
  common: ee,
  self: V1
}, U1 = j1, q1 = {
  closeMargin: "16px 12px",
  closeSize: "20px",
  closeIconSize: "16px",
  width: "365px",
  padding: "16px",
  titleFontSize: "16px",
  metaFontSize: "12px",
  descriptionFontSize: "12px"
}, G1 = (e) => {
  const { textColor2: t, successColor: o, infoColor: r, warningColor: n, errorColor: i, popoverColor: a, closeIconColor: l, closeIconColorHover: s, closeIconColorPressed: d, closeColorHover: c, closeColorPressed: f, textColor1: v, textColor3: g, borderRadius: u, fontWeightStrong: p, boxShadow2: b, lineHeight: h, fontSize: S } = e;
  return Object.assign(Object.assign({}, q1), {
    borderRadius: u,
    lineHeight: h,
    fontSize: S,
    headerFontWeight: p,
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
    headerTextColor: v,
    descriptionTextColor: g,
    actionTextColor: t,
    boxShadow: b
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
  const { textColor2: t, closeIconColor: o, closeIconColorHover: r, closeIconColorPressed: n, infoColor: i, successColor: a, errorColor: l, warningColor: s, popoverColor: d, boxShadow2: c, primaryColor: f, lineHeight: v, borderRadius: g, closeColorHover: u, closeColorPressed: p } = e;
  return Object.assign(Object.assign({}, X1), {
    closeBorderRadius: g,
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
    closeColorPressed: p,
    closeIconColor: o,
    closeIconColorHover: r,
    closeIconColorPressed: n,
    closeColorHoverInfo: u,
    closeColorPressedInfo: p,
    closeIconColorInfo: o,
    closeIconColorHoverInfo: r,
    closeIconColorPressedInfo: n,
    closeColorHoverSuccess: u,
    closeColorPressedSuccess: p,
    closeIconColorSuccess: o,
    closeIconColorHoverSuccess: r,
    closeIconColorPressedSuccess: n,
    closeColorHoverError: u,
    closeColorPressedError: p,
    closeIconColorError: o,
    closeIconColorHoverError: r,
    closeIconColorPressedError: n,
    closeColorHoverWarning: u,
    closeColorPressedWarning: p,
    closeIconColorWarning: o,
    closeIconColorHoverWarning: r,
    closeIconColorPressedWarning: n,
    closeColorHoverLoading: u,
    closeColorPressedLoading: p,
    closeIconColorLoading: o,
    closeIconColorHoverLoading: r,
    closeIconColorPressedLoading: n,
    loadingColor: f,
    lineHeight: v,
    borderRadius: g
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
    Input: Dt
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
  common: mt,
  peers: {
    Button: Qd,
    Input: Yd
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
    Code: rc
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
    Input: Dt
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
    Tooltip: En,
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
}, kS = {
  iconSize: "22px"
}, $S = (e) => {
  const { fontSize: t, warningColor: o } = e;
  return Object.assign(Object.assign({}, kS), { fontSize: t, iconColor: o });
}, TS = {
  name: "Popconfirm",
  common: ee,
  peers: {
    Button: Pt,
    Popover: Ao
  },
  self: $S
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
}, yc = IS, OS = {
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
}, ES = OS, RS = {
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
}, MS = (e) => {
  const { textColor2: t, textColor1: o, errorColor: r, successColor: n, infoColor: i, warningColor: a, lineHeight: l, fontWeightStrong: s } = e;
  return Object.assign(Object.assign({}, RS), { lineHeight: l, titleFontWeight: s, titleTextColor: o, textColor: t, iconColorError: r, iconColorSuccess: n, iconColorInfo: i, iconColorWarning: a });
}, DS = {
  name: "Result",
  common: ee,
  self: MS
}, BS = DS, wc = {
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
    return Object.assign(Object.assign({}, wc), { fontSize: d, markFontSize: d, railColor: o, railColorHover: o, fillColor: n, fillColorHover: n, opacityDisabled: c, handleColor: "#FFF", dotColor: l, dotColorModal: r, dotColorPopover: i, handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)", indicatorColor: i, indicatorBoxShadow: t, indicatorTextColor: a, indicatorBorderRadius: s, dotBorder: `2px solid ${o}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
  }
}, FS = AS, HS = (e) => {
  const t = "rgba(0, 0, 0, .85)", o = "0 2px 8px 0 rgba(0, 0, 0, 0.12)", { railColor: r, primaryColor: n, baseColor: i, cardColor: a, modalColor: l, popoverColor: s, borderRadius: d, fontSize: c, opacityDisabled: f } = e;
  return Object.assign(Object.assign({}, wc), { fontSize: c, markFontSize: c, railColor: r, railColorHover: r, fillColor: n, fillColorHover: n, opacityDisabled: f, handleColor: "#FFF", dotColor: a, dotColorModal: l, dotColorPopover: s, handleBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowHover: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowActive: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", handleBoxShadowFocus: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", indicatorColor: t, indicatorBoxShadow: o, indicatorTextColor: i, indicatorBorderRadius: d, dotBorder: `2px solid ${r}`, dotBorderActive: `2px solid ${n}`, dotBoxShadow: "" });
}, LS = {
  name: "Slider",
  common: mt,
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
}, VS = {
  name: "Spin",
  common: ee,
  self: NS
}, jS = VS, US = (e) => {
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
  const { dividerColor: t, cardColor: o, modalColor: r, popoverColor: n, tableHeaderColor: i, tableColorStriped: a, textColor1: l, textColor2: s, borderRadius: d, fontWeightStrong: c, lineHeight: f, fontSizeSmall: v, fontSizeMedium: g, fontSizeLarge: u } = e;
  return Object.assign(Object.assign({}, t2), {
    fontSizeSmall: v,
    fontSizeMedium: g,
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
  const { textColor2: t, primaryColor: o, textColorDisabled: r, closeIconColor: n, closeIconColorHover: i, closeIconColorPressed: a, closeColorHover: l, closeColorPressed: s, tabColor: d, baseColor: c, dividerColor: f, fontWeight: v, textColor1: g, borderRadius: u, fontSize: p, fontWeightStrong: b } = e;
  return Object.assign(Object.assign({}, i2), {
    colorSegment: d,
    tabFontSizeCard: p,
    tabTextColorLine: g,
    tabTextColorActiveLine: o,
    tabTextColorHoverLine: o,
    tabTextColorDisabledLine: r,
    tabTextColorSegment: g,
    tabTextColorActiveSegment: t,
    tabTextColorHoverSegment: t,
    tabTextColorDisabledSegment: r,
    tabTextColorBar: g,
    tabTextColorActiveBar: o,
    tabTextColorHoverBar: o,
    tabTextColorDisabledBar: r,
    tabTextColorCard: g,
    tabTextColorHoverCard: g,
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
    tabFontWeightActive: v,
    tabFontWeight: v,
    tabBorderRadius: u,
    paneTextColor: t,
    fontWeightStrong: b
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
    Input: Dt,
    Empty: Bo,
    Button: Pt
  },
  self(e) {
    const { fontWeight: t, fontSizeLarge: o, fontSizeMedium: r, fontSizeSmall: n, heightLarge: i, heightMedium: a, borderRadius: l, inputColor: s, tableHeaderColor: d, textColor1: c, textColorDisabled: f, textColor2: v, textColor3: g, hoverColor: u, closeColorHover: p, closeColorPressed: b, closeIconColor: h, closeIconColorHover: S, closeIconColorPressed: O, dividerColor: y } = e;
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
      titleTextColorDisabled: f,
      extraTextColor: g,
      extraTextColorDisabled: f,
      itemTextColor: v,
      itemTextColorDisabled: f,
      itemColorPending: u,
      titleFontWeight: t,
      closeColorHover: p,
      closeColorPressed: b,
      closeIconColor: h,
      closeIconColorHover: S,
      closeIconColorPressed: O
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
    Empty: Bo
  },
  self(e) {
    const { primaryColor: t } = e, o = b2(e);
    return o.nodeColorActive = K(t, { alpha: 0.15 }), o;
  }
}, Sc = x2, C2 = {
  name: "TreeSelect",
  common: ee,
  peers: {
    Tree: Sc,
    Empty: Bo,
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
}, S2 = (e) => {
  const { primaryColor: t, textColor2: o, borderColor: r, lineHeight: n, fontSize: i, borderRadiusSmall: a, dividerColor: l, fontWeightStrong: s, textColor1: d, textColor3: c, infoColor: f, warningColor: v, errorColor: g, successColor: u, codeColor: p } = e;
  return Object.assign(Object.assign({}, w2), { aTextColor: t, blockquoteTextColor: o, blockquotePrefixColor: r, blockquoteLineHeight: n, blockquoteFontSize: i, codeBorderRadius: a, liTextColor: o, liLineHeight: n, liFontSize: i, hrColor: l, headerFontWeight: s, headerTextColor: d, pTextColor: o, pTextColor1Depth: d, pTextColor2Depth: o, pTextColor3Depth: c, pLineHeight: n, pFontSize: i, headerBarColor: t, headerBarColorPrimary: t, headerBarColorInfo: f, headerBarColorError: g, headerBarColorWarning: v, headerBarColorSuccess: u, textColor: o, textColor1Depth: d, textColor2Depth: o, textColor3Depth: c, textColorPrimary: t, textColorInfo: f, textColorSuccess: u, textColorWarning: v, textColorError: g, codeTextColor: o, codeColor: p, codeBorder: "1px solid #0000" });
}, P2 = {
  name: "Typography",
  common: ee,
  self: S2
}, k2 = P2, $2 = (e) => {
  const { iconColor: t, primaryColor: o, errorColor: r, textColor2: n, successColor: i, opacityDisabled: a, actionColor: l, borderColor: s, hoverColor: d, lineHeight: c, borderRadius: f, fontSize: v } = e;
  return {
    fontSize: v,
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
}, T2 = {
  name: "Upload",
  common: ee,
  peers: {
    Button: Pt,
    Progress: yc
  },
  self(e) {
    const { errorColor: t } = e, o = $2(e);
    return o.itemColorHoverError = K(t, {
      alpha: 0.09
    }), o;
  }
}, z2 = T2, _2 = {
  name: "Watermark",
  common: ee,
  self(e) {
    const { fontFamily: t } = e;
    return {
      fontFamily: t
    };
  }
}, I2 = _2, O2 = {
  name: "Row",
  common: ee
}, E2 = O2, R2 = {
  name: "Image",
  common: ee,
  peers: {
    Tooltip: En
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
function M2(e) {
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
const B2 = N([R("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), R("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]), Wl = 800, Nl = 100, A2 = Object.assign(Object.assign({}, Ee.props), {
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
}), ma = Ce({
  name: "InputNumber",
  props: A2,
  setup(e) {
    process.env.NODE_ENV !== "production" && ht(() => {
      e.onChange !== void 0 && $t("input-number", "`on-change` is deprecated, please use `on-update:value` instead");
    });
    const { mergedBorderedRef: t, mergedClsPrefixRef: o, mergedRtlRef: r } = wt(e), n = Ee("InputNumber", "-input-number", B2, aS, e, o), { localeRef: i } = In("InputNumber"), a = Oo(e), { mergedSizeRef: l, mergedDisabledRef: s, mergedStatusRef: d } = a, c = E(null), f = E(null), v = E(null), g = E(e.defaultValue), u = ke(e, "value"), p = so(u, g), b = E(""), h = (X) => {
      const le = String(X).split(".")[1];
      return le ? le.length : 0;
    }, S = (X) => {
      const le = [e.min, e.max, e.step, X].map((xe) => xe === void 0 ? 0 : h(xe));
      return Math.max(...le);
    }, O = Xe(() => {
      const { placeholder: X } = e;
      return X !== void 0 ? X : i.value.placeholder;
    }), y = Xe(() => {
      const X = ci(e.step);
      return X !== null ? X === 0 ? 1 : Math.abs(X) : 1;
    }), T = Xe(() => {
      const X = ci(e.min);
      return X !== null ? X : null;
    }), I = Xe(() => {
      const X = ci(e.max);
      return X !== null ? X : null;
    }), m = (X) => {
      const { value: le } = p;
      if (X === le) {
        $();
        return;
      }
      const { "onUpdate:value": xe, onUpdateValue: ie, onChange: W } = e, { nTriggerFormInput: Q, nTriggerFormChange: D } = a;
      W && he(W, X), ie && he(ie, X), xe && he(xe, X), g.value = X, Q(), D();
    }, P = ({ offset: X, doUpdateIfValid: le, fixPrecision: xe, isInputing: ie }) => {
      const { value: W } = b;
      if (ie && D2(W))
        return !1;
      const Q = (e.parse || M2)(W);
      if (Q === null)
        return le && m(null), null;
      if (di(Q)) {
        const D = h(Q), { precision: q } = e;
        if (q !== void 0 && q < D && !xe)
          return !1;
        let te = parseFloat((Q + X).toFixed(q ?? S(Q)));
        if (di(te)) {
          const { value: ye } = I, { value: _e } = T;
          if (ye !== null && te > ye) {
            if (!le || ie)
              return !1;
            te = ye;
          }
          if (_e !== null && te < _e) {
            if (!le || ie)
              return !1;
            te = _e;
          }
          return e.validator && !e.validator(te) ? !1 : (le && m(te), te);
        }
      }
      return !1;
    }, $ = () => {
      const { value: X } = p;
      if (di(X)) {
        const { format: le, precision: xe } = e;
        le ? b.value = le(X) : X === null || xe === void 0 || // precision overflow
        h(X) > xe ? b.value = Ll(X, void 0) : b.value = Ll(X, xe);
      } else
        b.value = String(X);
    };
    $();
    const k = Xe(() => P({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), _ = Xe(() => {
      const { value: X } = p;
      if (e.validator && X === null)
        return !1;
      const { value: le } = y;
      return P({
        offset: -le,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    }), w = Xe(() => {
      const { value: X } = p;
      if (e.validator && X === null)
        return !1;
      const { value: le } = y;
      return P({
        offset: +le,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    });
    function F(X) {
      const { onFocus: le } = e, { nTriggerFormFocus: xe } = a;
      le && he(le, X), xe();
    }
    function L(X) {
      var le, xe;
      if (X.target === ((le = c.value) === null || le === void 0 ? void 0 : le.wrapperElRef))
        return;
      const ie = P({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (ie !== !1) {
        const D = (xe = c.value) === null || xe === void 0 ? void 0 : xe.inputElRef;
        D && (D.value = String(ie || "")), p.value === ie && $();
      } else
        $();
      const { onBlur: W } = e, { nTriggerFormBlur: Q } = a;
      W && he(W, X), Q(), zt(() => {
        $();
      });
    }
    function G(X) {
      const { onClear: le } = e;
      le && he(le, X);
    }
    function Y() {
      const { value: X } = w;
      if (!X) {
        me();
        return;
      }
      const { value: le } = p;
      if (le === null)
        e.validator || m(U());
      else {
        const { value: xe } = y;
        P({
          offset: xe,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    function j() {
      const { value: X } = _;
      if (!X) {
        ue();
        return;
      }
      const { value: le } = p;
      if (le === null)
        e.validator || m(U());
      else {
        const { value: xe } = y;
        P({
          offset: -xe,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    const ne = F, H = L;
    function U() {
      if (e.validator)
        return null;
      const { value: X } = T, { value: le } = I;
      return X !== null ? Math.max(0, X) : le !== null ? Math.min(0, le) : 0;
    }
    function de(X) {
      G(X), m(null);
    }
    function Se(X) {
      var le, xe, ie;
      !((le = v.value) === null || le === void 0) && le.$el.contains(X.target) && X.preventDefault(), !((xe = f.value) === null || xe === void 0) && xe.$el.contains(X.target) && X.preventDefault(), (ie = c.value) === null || ie === void 0 || ie.activate();
    }
    let Ie = null, Me = null, $e = null;
    function ue() {
      $e && (window.clearTimeout($e), $e = null), Ie && (window.clearInterval(Ie), Ie = null);
    }
    function me() {
      ae && (window.clearTimeout(ae), ae = null), Me && (window.clearInterval(Me), Me = null);
    }
    function ze() {
      ue(), $e = window.setTimeout(() => {
        Ie = window.setInterval(() => {
          j();
        }, Nl);
      }, Wl), Ke("mouseup", document, ue, {
        once: !0
      });
    }
    let ae = null;
    function Ve() {
      me(), ae = window.setTimeout(() => {
        Me = window.setInterval(() => {
          Y();
        }, Nl);
      }, Wl), Ke("mouseup", document, me, {
        once: !0
      });
    }
    const Fe = () => {
      Me || Y();
    }, je = () => {
      Ie || j();
    };
    function Ge(X) {
      var le, xe;
      if (X.key === "Enter") {
        if (X.target === ((le = c.value) === null || le === void 0 ? void 0 : le.wrapperElRef))
          return;
        P({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && ((xe = c.value) === null || xe === void 0 || xe.deactivate());
      } else if (X.key === "ArrowUp") {
        if (!w.value || e.keyboard.ArrowUp === !1)
          return;
        X.preventDefault(), P({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && Y();
      } else if (X.key === "ArrowDown") {
        if (!_.value || e.keyboard.ArrowDown === !1)
          return;
        X.preventDefault(), P({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && j();
      }
    }
    function Ze(X) {
      b.value = X, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && P({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    Te(p, () => {
      $();
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
    }, pt = Do("InputNumber", r, o);
    return Object.assign(Object.assign({}, lt), {
      rtlEnabled: pt,
      inputInstRef: c,
      minusButtonInstRef: f,
      addButtonInstRef: v,
      mergedClsPrefix: o,
      mergedBordered: t,
      uncontrolledValue: g,
      mergedValue: p,
      mergedPlaceholder: O,
      displayedValueInvalid: k,
      mergedSize: l,
      mergedDisabled: s,
      displayedValue: b,
      addable: w,
      minusable: _,
      mergedStatus: d,
      handleFocus: ne,
      handleBlur: H,
      handleClear: de,
      handleMouseDown: Se,
      handleAddClick: Fe,
      handleMinusClick: je,
      handleAddMousedown: Ve,
      handleMinusMousedown: ze,
      handleKeyDown: Ge,
      handleUpdateDisplayedValue: Ze,
      // theme
      mergedTheme: n,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: M(() => {
        const { self: { iconColorDisabled: X } } = n.value, [le, xe, ie, W] = Wt(X);
        return {
          textColorTextDisabled: `rgb(${le}, ${xe}, ${ie})`,
          opacityDisabled: `${W}`
        };
      })
    });
  },
  render() {
    const { mergedClsPrefix: e, $slots: t } = this, o = () => x(Ol, { text: !0, disabled: !this.minusable || this.mergedDisabled || this.readonly, focusable: !1, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleMinusClick, onMousedown: this.handleMinusMousedown, ref: "minusButtonInstRef" }, {
      icon: () => Kt(t["minus-icon"], () => [
        x(Zt, { clsPrefix: e }, {
          default: () => x(O0, null)
        })
      ])
    }), r = () => x(Ol, { text: !0, disabled: !this.addable || this.mergedDisabled || this.readonly, focusable: !1, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, builtinThemeOverrides: this.buttonThemeOverrides, onClick: this.handleAddClick, onMousedown: this.handleAddMousedown, ref: "addButtonInstRef" }, {
      icon: () => Kt(t["add-icon"], () => [
        x(Zt, { clsPrefix: e }, {
          default: () => x(k0, null)
        })
      ])
    });
    return x(
      "div",
      { class: [
        `${e}-input-number`,
        this.rtlEnabled && `${e}-input-number--rtl`
      ] },
      x(EC, { ref: "inputInstRef", autofocus: this.autofocus, status: this.mergedStatus, bordered: this.mergedBordered, loading: this.loading, value: this.displayedValue, onUpdateValue: this.handleUpdateDisplayedValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, builtinThemeOverrides: this.inputThemeOverrides, size: this.mergedSize, placeholder: this.mergedPlaceholder, disabled: this.mergedDisabled, readonly: this.readonly, textDecoration: this.displayedValueInvalid ? "line-through" : void 0, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onClear: this.handleClear, clearable: this.clearable, internalLoadingBeforeSuffix: !0 }, {
        prefix: () => {
          var n;
          return this.showButton && this.buttonPlacement === "both" ? [
            o(),
            gt(t.prefix, (i) => i ? x("span", { class: `${e}-input-number-prefix` }, i) : null)
          ] : (n = t.prefix) === null || n === void 0 ? void 0 : n.call(t);
        },
        suffix: () => {
          var n;
          return this.showButton ? [
            gt(t.suffix, (i) => i ? x("span", { class: `${e}-input-number-suffix` }, i) : null),
            this.buttonPlacement === "right" ? o() : null,
            r()
          ] : (n = t.suffix) === null || n === void 0 ? void 0 : n.call(t);
        }
      })
    );
  }
}), F2 = {
  extraFontSize: "12px",
  width: "440px"
}, H2 = {
  name: "Transfer",
  common: ee,
  peers: {
    Checkbox: tr,
    Scrollbar: St,
    Input: Dt,
    Empty: Bo,
    Button: Pt
  },
  self(e) {
    const { iconColorDisabled: t, iconColor: o, fontWeight: r, fontSizeLarge: n, fontSizeMedium: i, fontSizeSmall: a, heightLarge: l, heightMedium: s, heightSmall: d, borderRadius: c, inputColor: f, tableHeaderColor: v, textColor1: g, textColorDisabled: u, textColor2: p, hoverColor: b } = e;
    return Object.assign(Object.assign({}, F2), {
      itemHeightSmall: d,
      itemHeightMedium: s,
      itemHeightLarge: l,
      fontSizeSmall: a,
      fontSizeMedium: i,
      fontSizeLarge: n,
      borderRadius: c,
      borderColor: "#0000",
      listColor: f,
      headerColor: v,
      titleTextColor: g,
      titleTextColorDisabled: u,
      extraTextColor: p,
      filterDividerColor: "#0000",
      itemTextColor: p,
      itemTextColorDisabled: u,
      itemColorPending: b,
      titleFontWeight: r,
      iconColor: o,
      iconColorDisabled: t
    });
  }
}, L2 = H2, W2 = {
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
function Vl(e) {
  return window.TouchEvent && e instanceof window.TouchEvent;
}
function jl() {
  const e = E(/* @__PURE__ */ new Map()), t = (o) => (r) => {
    e.value.set(o, r);
  };
  return vu(() => e.value.clear()), [e, t];
}
const N2 = N([R("slider", `
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `, [J("reverse", [R("slider-handles", [R("slider-handle-wrapper", `
 transform: translate(50%, -50%);
 `)]), R("slider-dots", [R("slider-dot", `
 transform: translateX(50%, -50%);
 `)]), J("vertical", [R("slider-handles", [R("slider-handle-wrapper", `
 transform: translate(-50%, -50%);
 `)]), R("slider-marks", [R("slider-mark", `
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]), R("slider-dots", [R("slider-dot", `
 transform: translateX(-50%) translateY(0);
 `)])])]), J("vertical", `
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `, [R("slider-handles", `
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `, [R("slider-handle-wrapper", `
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]), R("slider-rail", `
 height: 100%;
 `, [B("fill", `
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]), J("with-mark", `
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `), R("slider-marks", `
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `, [R("slider-mark", `
 transform: translateY(50%);
 white-space: nowrap;
 `)]), R("slider-dots", `
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `, [R("slider-dot", `
 transform: translateX(-50%) translateY(50%);
 `)])]), J("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `, [R("slider-handle", `
 cursor: not-allowed;
 `)]), J("with-mark", `
 width: 100%;
 margin: 8px 0 32px 0;
 `), N("&:hover", [R("slider-rail", {
  backgroundColor: "var(--n-rail-color-hover)"
}, [B("fill", {
  backgroundColor: "var(--n-fill-color-hover)"
})]), R("slider-handle", {
  boxShadow: "var(--n-handle-box-shadow-hover)"
})]), J("active", [R("slider-rail", {
  backgroundColor: "var(--n-rail-color-hover)"
}, [B("fill", {
  backgroundColor: "var(--n-fill-color-hover)"
})]), R("slider-handle", {
  boxShadow: "var(--n-handle-box-shadow-hover)"
})]), R("slider-marks", `
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `, [R("slider-mark", `
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]), R("slider-rail", `
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `, [B("fill", `
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]), R("slider-handles", `
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `, [R("slider-handle-wrapper", `
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `, [R("slider-handle", `
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `, [N("&:hover", `
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]), N("&:focus", [R("slider-handle", `
 box-shadow: var(--n-handle-box-shadow-focus);
 `, [N("&:hover", `
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]), R("slider-dots", `
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `, [J("transition-disabled", [R("slider-dot", "transition: none;")]), R("slider-dot", `
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
 `, [J("active", "border: var(--n-dot-border-active);")])])]), R("slider-handle-indicator", `
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `, [wn()]), R("slider-handle-indicator", `
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
 `), wn()]), ks(R("slider", [R("slider-dot", "background-color: var(--n-dot-color-modal);")])), $s(R("slider", [R("slider-dot", "background-color: var(--n-dot-color-popover);")]))]), V2 = 0, j2 = Object.assign(Object.assign({}, Ee.props), { to: Rt.propTo, defaultValue: {
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
}, vertical: Boolean, reverse: Boolean, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] }), U2 = Ce({
  name: "Slider",
  props: j2,
  setup(e) {
    const { mergedClsPrefixRef: t, namespaceRef: o, inlineThemeDisabled: r } = wt(e), n = Ee("Slider", "-slider", N2, WS, e, t), i = E(null), [a, l] = jl(), [s, d] = jl(), c = E(/* @__PURE__ */ new Set()), f = Oo(e), { mergedDisabledRef: v } = f, g = M(() => {
      const { step: D } = e;
      if (D <= 0 || D === "mark")
        return 0;
      const q = D.toString();
      let te = 0;
      return q.includes(".") && (te = q.length - q.indexOf(".") - 1), te;
    }), u = E(e.defaultValue), p = ke(e, "value"), b = so(p, u), h = M(() => {
      const { value: D } = b;
      return (e.range ? D : [D]).map(Se);
    }), S = M(() => h.value.length > 2), O = M(() => e.placement === void 0 ? e.vertical ? "right" : "top" : e.placement), y = M(() => {
      const { marks: D } = e;
      return D ? Object.keys(D).map(parseFloat) : null;
    }), T = E(-1), I = E(-1), m = E(-1), P = E(!1), $ = E(!1), k = M(() => {
      const { vertical: D, reverse: q } = e;
      return D ? q ? "top" : "bottom" : q ? "right" : "left";
    }), _ = M(() => {
      if (S.value)
        return;
      const D = h.value, q = Ie(e.range ? Math.min(...D) : e.min), te = Ie(e.range ? Math.max(...D) : D[0]), { value: ye } = k;
      return e.vertical ? {
        [ye]: `${q}%`,
        height: `${te - q}%`
      } : {
        [ye]: `${q}%`,
        width: `${te - q}%`
      };
    }), w = M(() => {
      const D = [], { marks: q } = e;
      if (q) {
        const te = h.value.slice();
        te.sort((Le, We) => Le - We);
        const { value: ye } = k, { value: _e } = S, { range: He } = e, et = _e ? () => !1 : (Le) => He ? Le >= te[0] && Le <= te[te.length - 1] : Le <= te[0];
        for (const Le of Object.keys(q)) {
          const We = Number(Le);
          D.push({
            active: et(We),
            label: q[Le],
            style: {
              [ye]: `${Ie(We)}%`
            }
          });
        }
      }
      return D;
    });
    function F(D, q) {
      const te = Ie(D), { value: ye } = k;
      return {
        [ye]: `${te}%`,
        zIndex: q === T.value ? 1 : 0
      };
    }
    function L(D) {
      return e.showTooltip || m.value === D || T.value === D && P.value;
    }
    function G(D) {
      return P.value ? !(T.value === D && I.value === D) : !0;
    }
    function Y(D) {
      var q;
      ~D && (T.value = D, (q = a.value.get(D)) === null || q === void 0 || q.focus());
    }
    function j() {
      s.value.forEach((D, q) => {
        L(q) && D.syncPosition();
      });
    }
    function ne(D) {
      const { "onUpdate:value": q, onUpdateValue: te } = e, { nTriggerFormInput: ye, nTriggerFormChange: _e } = f;
      te && he(te, D), q && he(q, D), u.value = D, ye(), _e();
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
      const _e = y.value || [], { step: He } = e;
      if (He === "mark") {
        const We = ue(D, _e.concat(q), ye ? te : void 0);
        return We ? We.value : q;
      }
      if (He <= 0)
        return q;
      const { value: et } = g;
      let Le;
      if (ye) {
        const We = Number((q / He).toFixed(et)), dt = Math.floor(We), It = We > dt ? dt : dt - 1, st = We < dt ? dt : dt + 1;
        Le = ue(q, [
          Number((It * He).toFixed(et)),
          Number((st * He).toFixed(et)),
          ..._e
        ], te);
      } else {
        const We = $e(D);
        Le = ue(D, [..._e, We]);
      }
      return Le ? Se(Le.value) : q;
    }
    function Se(D) {
      return Math.min(e.max, Math.max(e.min, D));
    }
    function Ie(D) {
      const { max: q, min: te } = e;
      return (D - te) / (q - te) * 100;
    }
    function Me(D) {
      const { max: q, min: te } = e;
      return te + (q - te) * D;
    }
    function $e(D) {
      const { step: q, min: te } = e;
      if (q <= 0 || q === "mark")
        return D;
      const ye = Math.round((D - te) / q) * q + te;
      return Number(ye.toFixed(g.value));
    }
    function ue(D, q = y.value, te) {
      if (!(q != null && q.length))
        return null;
      let ye = null, _e = -1;
      for (; ++_e < q.length; ) {
        const He = q[_e] - D, et = Math.abs(He);
        // find marks in the same direction
        (te === void 0 || He * te > 0) && (ye === null || et < ye.distance) && (ye = {
          index: _e,
          distance: et,
          value: q[_e]
        });
      }
      return ye;
    }
    function me(D) {
      const q = i.value;
      if (!q)
        return;
      const te = Vl(D) ? D.touches[0] : D, ye = q.getBoundingClientRect();
      let _e;
      return e.vertical ? _e = (ye.bottom - te.clientY) / ye.height : _e = (te.clientX - ye.left) / ye.width, e.reverse && (_e = 1 - _e), Me(_e);
    }
    function ze(D) {
      if (v.value || !e.keyboard)
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
      const q = T.value;
      if (q === -1)
        return;
      const { step: te } = e, ye = h.value[q], _e = te <= 0 || te === "mark" ? ye : ye + te * D;
      U(
        // Avoid the number of value does not change when `step` is null
        de(_e, ye, D > 0 ? 1 : -1),
        q
      );
    }
    function Ve(D) {
      var q, te;
      if (v.value || !Vl(D) && D.button !== V2)
        return;
      const ye = me(D);
      if (ye === void 0)
        return;
      const _e = h.value.slice(), He = e.range ? (te = (q = ue(ye, _e)) === null || q === void 0 ? void 0 : q.index) !== null && te !== void 0 ? te : -1 : 0;
      He !== -1 && (D.preventDefault(), Y(He), Fe(), U(de(ye, h.value[He]), He));
    }
    function Fe() {
      P.value || (P.value = !0, Ke("touchend", document, Ze), Ke("mouseup", document, Ze), Ke("touchmove", document, Ge), Ke("mousemove", document, Ge));
    }
    function je() {
      P.value && (P.value = !1, qe("touchend", document, Ze), qe("mouseup", document, Ze), qe("touchmove", document, Ge), qe("mousemove", document, Ge));
    }
    function Ge(D) {
      const { value: q } = T;
      if (!P.value || q === -1) {
        je();
        return;
      }
      const te = me(D);
      U(de(te, h.value[q]), q);
    }
    function Ze() {
      je();
    }
    function lt(D) {
      T.value = D, v.value || (m.value = D);
    }
    function pt(D) {
      T.value === D && (T.value = -1, je()), m.value === D && (m.value = -1);
    }
    function X(D) {
      m.value = D;
    }
    function le(D) {
      m.value === D && (m.value = -1);
    }
    Te(T, (D, q) => void zt(() => I.value = q)), Te(b, () => {
      if (e.marks) {
        if ($.value)
          return;
        $.value = !0, zt(() => {
          $.value = !1;
        });
      }
      zt(j);
    }), Ct(() => {
      je();
    });
    const xe = M(() => {
      const { self: { markFontSize: D, railColor: q, railColorHover: te, fillColor: ye, fillColorHover: _e, handleColor: He, opacityDisabled: et, dotColor: Le, dotColorModal: We, handleBoxShadow: dt, handleBoxShadowHover: It, handleBoxShadowActive: st, handleBoxShadowFocus: vt, dotBorder: C, dotBoxShadow: A, railHeight: Z, railWidthVertical: se, handleSize: ce, dotHeight: ve, dotWidth: be, dotBorderRadius: Pe, fontSize: tt, dotBorderActive: kt, dotColorPopover: to }, common: { cubicBezierEaseInOut: oo } } = n.value;
      return {
        "--n-bezier": oo,
        "--n-dot-border": C,
        "--n-dot-border-active": kt,
        "--n-dot-border-radius": Pe,
        "--n-dot-box-shadow": A,
        "--n-dot-color": Le,
        "--n-dot-color-modal": We,
        "--n-dot-color-popover": to,
        "--n-dot-height": ve,
        "--n-dot-width": be,
        "--n-fill-color": ye,
        "--n-fill-color-hover": _e,
        "--n-font-size": tt,
        "--n-handle-box-shadow": dt,
        "--n-handle-box-shadow-active": st,
        "--n-handle-box-shadow-focus": vt,
        "--n-handle-box-shadow-hover": It,
        "--n-handle-color": He,
        "--n-handle-size": ce,
        "--n-opacity-disabled": et,
        "--n-rail-color": q,
        "--n-rail-color-hover": te,
        "--n-rail-height": Z,
        "--n-rail-width-vertical": se,
        "--n-mark-font-size": D
      };
    }), ie = r ? xt("slider", void 0, xe, e) : void 0, W = M(() => {
      const { self: { fontSize: D, indicatorColor: q, indicatorBoxShadow: te, indicatorTextColor: ye, indicatorBorderRadius: _e } } = n.value;
      return {
        "--n-font-size": D,
        "--n-indicator-border-radius": _e,
        "--n-indicator-box-shadow": te,
        "--n-indicator-color": q,
        "--n-indicator-text-color": ye
      };
    }), Q = r ? xt("slider-indicator", void 0, W, e) : void 0;
    return {
      mergedClsPrefix: t,
      namespace: o,
      uncontrolledValue: u,
      mergedValue: b,
      mergedDisabled: v,
      mergedPlacement: O,
      isMounted: Dr(),
      adjustedTo: Rt(e),
      dotTransitionDisabled: $,
      markInfos: w,
      isShowTooltip: L,
      shouldKeepTooltipTransition: G,
      handleRailRef: i,
      setHandleRefs: l,
      setFollowerRefs: d,
      fillStyle: _,
      getHandleStyle: F,
      activeIndex: T,
      arrifiedValues: h,
      followerEnabledIndexSet: c,
      handleRailMouseDown: Ve,
      handleHandleFocus: lt,
      handleHandleBlur: pt,
      handleHandleMouseEnter: X,
      handleHandleMouseLeave: le,
      handleRailKeyDown: ze,
      indicatorCssVars: r ? void 0 : W,
      indicatorThemeClass: Q == null ? void 0 : Q.themeClass,
      indicatorOnRender: Q == null ? void 0 : Q.onRender,
      cssVars: r ? void 0 : xe,
      themeClass: ie == null ? void 0 : ie.themeClass,
      onRender: ie == null ? void 0 : ie.onRender
    };
  },
  render() {
    var e;
    const { mergedClsPrefix: t, themeClass: o, formatTooltip: r } = this;
    return (e = this.onRender) === null || e === void 0 || e.call(this), x(
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
      x(
        "div",
        { class: `${t}-slider-rail` },
        x("div", { class: `${t}-slider-rail__fill`, style: this.fillStyle }),
        this.marks ? x("div", { class: [
          `${t}-slider-dots`,
          this.dotTransitionDisabled && `${t}-slider-dots--transition-disabled`
        ] }, this.markInfos.map((n) => x("div", { key: n.label, class: [
          `${t}-slider-dot`,
          {
            [`${t}-slider-dot--active`]: n.active
          }
        ], style: n.style }))) : null,
        x("div", { ref: "handleRailRef", class: `${t}-slider-handles` }, this.arrifiedValues.map((n, i) => {
          const a = this.isShowTooltip(i);
          return x(qi, null, {
            default: () => [
              x(Gi, null, {
                default: () => x("div", { ref: this.setHandleRefs(i), class: `${t}-slider-handle-wrapper`, tabindex: this.mergedDisabled ? -1 : 0, style: this.getHandleStyle(n, i), onFocus: () => this.handleHandleFocus(i), onBlur: () => this.handleHandleBlur(i), onMouseenter: () => this.handleHandleMouseEnter(i), onMouseleave: () => this.handleHandleMouseLeave(i) }, Kt(this.$slots.thumb, () => [
                  x("div", { class: `${t}-slider-handle` })
                ]))
              }),
              this.tooltip && x(Yi, { ref: this.setFollowerRefs(i), show: a, to: this.adjustedTo, enabled: this.showTooltip && !this.range || this.followerEnabledIndexSet.has(i), teleportDisabled: this.adjustedTo === Rt.tdkey, placement: this.mergedPlacement, containerClass: this.namespace }, {
                default: () => x(Yt, { name: "fade-in-scale-up-transition", appear: this.isMounted, css: this.shouldKeepTooltipTransition(i), onEnter: () => {
                  this.followerEnabledIndexSet.add(i);
                }, onAfterLeave: () => {
                  this.followerEnabledIndexSet.delete(i);
                } }, {
                  default: () => {
                    var l;
                    return a ? ((l = this.indicatorOnRender) === null || l === void 0 || l.call(this), x("div", { class: [
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
        this.marks ? x("div", { class: `${t}-slider-marks` }, this.markInfos.map((n) => x("div", { key: n.label, class: `${t}-slider-mark`, style: n.style }, n.label))) : null
      )
    );
  }
}), q2 = () => ({}), G2 = {
  name: "Equation",
  common: ee,
  self: q2
}, K2 = G2, Pc = {
  name: "dark",
  common: ee,
  Alert: vC,
  Anchor: xC,
  AutoComplete: DC,
  Avatar: Zd,
  AvatarGroup: LC,
  BackTop: VC,
  Badge: UC,
  Breadcrumb: YC,
  Button: Pt,
  ButtonGroup: tS,
  Calendar: ay,
  Card: ec,
  Carousel: vy,
  Cascader: wy,
  Checkbox: tr,
  Code: rc,
  Collapse: Ey,
  CollapseTransition: Dy,
  ColorPicker: dy,
  DataTable: lw,
  DatePicker: xw,
  Descriptions: Sw,
  Dialog: fc,
  Divider: Rw,
  Drawer: Fw,
  Dropdown: va,
  DynamicInput: Ww,
  DynamicTags: Yw,
  Element: Zw,
  Empty: Bo,
  Ellipsis: dc,
  Equation: K2,
  Form: o1,
  GradientText: N1,
  Icon: fw,
  IconWrapper: U1,
  Image: R2,
  Input: Dt,
  InputNumber: rS,
  LegacyTransfer: L2,
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
  Pagination: lc,
  Popconfirm: zS,
  Popover: Ao,
  Popselect: nc,
  Progress: yc,
  Radio: cc,
  Rate: ES,
  Result: BS,
  Row: E2,
  Scrollbar: St,
  Select: ac,
  Skeleton: W2,
  Slider: FS,
  Space: gc,
  Spin: jS,
  Statistic: GS,
  Steps: ZS,
  Switch: e2,
  Table: n2,
  Tabs: s2,
  Tag: Nd,
  Thing: u2,
  TimePicker: uc,
  Timeline: p2,
  Tooltip: En,
  Transfer: m2,
  Tree: Sc,
  TreeSelect: y2,
  Typography: k2,
  Upload: z2,
  Watermark: I2
}, Y2 = {
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
}, Ul = (e) => {
  const t = e / 25.4;
  return Number(t.toFixed(2));
}, X2 = (e) => {
  const t = e * 25.4;
  return Number(t.toFixed(2));
}, jo = (e) => Math.round(e / 3.28084), Uo = (e) => Math.round(e * 3.28084), lr = (e) => Math.round(e / 100) * 100, ql = E(Pc), Z2 = E("Dark"), Gl = {
  common: {
    bodyColor: "#23313f",
    cardColor: "#293949",
    railColor: "#555",
    primaryColorSuppl: "#fff"
  }
}, ba = ps("wx", {
  state: () => ({
    wx: Y2
  }),
  actions: {
    updateFogVis(e) {
      this.wx.fog.visibility = jo(lr(e));
    },
    updateFogThickness(e) {
      this.wx.fog.thickness = jo(lr(e));
    },
    updateCloudBase(e) {
      this.wx.clouds.base = jo(lr(e));
    },
    updateCloudThickness(e) {
      this.wx.clouds.thickness = jo(lr(e));
    },
    updateDustVis(e) {
      this.wx.dust_density = jo(lr(e));
    },
    setAll(e) {
      this.wx = e;
    }
  },
  getters: {
    getWx() {
      return this.wx;
    }
  }
}), J2 = ps("theme", {
  state: () => ({
    theme: Pc
  }),
  actions: {
    setTheme(e) {
      ql.value = e;
    },
    setThemeOverrides(e) {
      Gl.common = e.common;
    }
  },
  getters: {
    getTheme() {
      return ql.value;
    },
    getThemeOverrides() {
      return Gl;
    },
    getSelectedTheme() {
      return Z2.value;
    }
  }
}), TP = (e) => {
  M(() => ba()).value.setAll(e);
}, Q2 = Ce({
  props: {
    labelText: {
      type: String,
      default: "Give it a name"
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
  setup(e) {
    return {
      value: E(e.val)
    };
  },
  components: {
    NInputNumber: ma,
    NSlider: U2,
    NSpace: mc,
    NFormItem: ga
  },
  methods: {
    update(e) {
      this.value = e, this.$emit("update-value", e);
    }
  },
  emits: ["update-value"]
}), Mn = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [r, n] of t)
    o[r] = n;
  return o;
};
function eP(e, t, o, r, n, i) {
  const a = nt("n-slider"), l = nt("n-input-number"), s = nt("n-form-item"), d = nt("n-space");
  return yo(), Ql(d, { vertical: "" }, {
    default: De(() => [
      we(s, {
        label: e.labelText,
        "label-style": "color: white"
      }, {
        default: De(() => [
          we(a, {
            value: e.value,
            "onUpdate:value": t[0] || (t[0] = (c) => e.value = c),
            "on-update:value": e.update,
            step: 1,
            min: e.min,
            max: e.max,
            disabled: e.disabled,
            class: "mr-4 ml-0 w-52"
          }, null, 8, ["value", "on-update:value", "min", "max", "disabled"]),
          we(l, {
            value: e.value,
            "onUpdate:value": t[1] || (t[1] = (c) => e.value = c),
            size: "small",
            class: "min-w-44 w-52",
            disabled: e.disabled
          }, {
            suffix: De(() => [
              it(es(e.suffix), 1)
            ]),
            _: 1
          }, 8, ["value", "disabled"])
        ]),
        _: 1
      }, 8, ["label"])
    ]),
    _: 1
  });
}
const tP = /* @__PURE__ */ Mn(Q2, [["render", eP]]), oP = {
  data() {
    return {};
  },
  setup() {
    const e = M(() => ba()), t = E(e.value.wx.clouds.preset) ? E(e.value.wx.clouds.preset) : E("Nothing"), o = E(Uo(e.value.wx.clouds.base)), r = E(
      Uo(
        e.value.wx.clouds.thickness ? e.value.wx.clouds.thickness : 0
      )
    ), n = E(
      e.value.wx.clouds.density ? E(e.value.wx.clouds.density) : E(0)
    ), i = E(e.value.wx.clouds.iprecptns) ? E(e.value.wx.clouds.iprecptns) : E(0), a = E(e.value.wx.enable_dust), l = E(Uo(e.value.wx.dust_density)), s = E(e.value.wx.enable_fog), d = E(Uo(e.value.wx.fog.thickness)), c = E(Uo(e.value.wx.fog.visibility)), f = E(e.value.wx.season.temperature), v = E(Ul(e.value.wx.qnh)), g = E(e.value.wx.halo.preset), u = E(e.value.wx.halo.crystalsPreset), p = E("Nothing"), b = E(0), h = E(18e3), S = (w) => {
      e.value.wx.season.temperature = w;
    }, O = (w) => {
      e.value.wx.halo.preset = w;
    }, y = (w) => {
      e.value.wx.halo.crystalsPreset = w;
    }, T = (w) => {
      e.value.wx.clouds.preset = w === "Nothing" ? void 0 : w, _(w === void 0 ? "Nothing" : w);
    }, I = (w) => {
      e.value.wx.clouds.density = e.value.wx.clouds.density !== void 0 ? w : 0;
    }, m = (w) => {
      e.value.wx.enable_dust = w;
    }, P = (w) => {
      e.value.wx.enable_fog = w;
    }, $ = (w) => {
      e.value.wx.qnh = X2(w);
    }, k = (w) => {
      e.value.wx.clouds.iprecptns = w;
    };
    function _(w) {
      switch (w) {
        case "Nothing":
          b.value = 984, h.value = 16404, p.value = "Nothing";
          break;
        case "Preset1":
          b.value = 2756, h.value = 13780, p.value = "Few Scattered";
          break;
        case "Preset2":
          b.value = 4134, h.value = 8268, p.value = "Two Layers Few Scattered";
          break;
        case "Preset3":
          b.value = 2756, h.value = 8268, p.value = "Two Layers Scattered";
          break;
        case "Preset4":
          b.value = 4134, h.value = 8268, p.value = "Two Layers Scattered";
          break;
        case "Preset5":
          b.value = 4134, h.value = 15157, p.value = "Three Layers High Scattered";
          break;
        case "Preset6":
          b.value = 4134, h.value = 13780, p.value = "One Layer Scattered/Broken";
          break;
        case "Preset7":
          b.value = 5512, h.value = 16535, p.value = "Two Layers Scattered/Broken";
          break;
        case "Preset8":
          b.value = 12402, h.value = 17913, p.value = "Two High Layers Scattered/Broken";
          break;
        case "Preset9":
          b.value = 5512, h.value = 12402, p.value = "Two Layers Scattered/Broken";
          break;
        case "Preset10":
          b.value = 4134, h.value = 13780, p.value = "Two Layers Large Thick Clouds";
          break;
        case "Preset11":
          b.value = 8268, h.value = 17913, p.value = "Two Layers Large Clouds High Ceiling";
          break;
        case "Preset12":
          b.value = 5512, h.value = 11024, p.value = "Two Layers Scattered Large Clouds High Ceiling";
          break;
        case "Preset13":
          b.value = 5512, h.value = 11024, p.value = "Two Layers Broken";
          break;
        case "Preset14":
          b.value = 5512, h.value = 11024, p.value = "Broken Thick Low Layer with Few High Layer";
          break;
        case "Preset15":
          b.value = 2756, h.value = 16535, p.value = "Broken Layers Broken Large Clouds";
          break;
        case "Preset16":
          b.value = 4134, h.value = 13780, p.value = "Two Layers Broken Large Clouds";
          break;
        case "Preset17":
          b.value = 0, h.value = 8268, p.value = "Two Layers Broken/Overcast";
          break;
        case "Preset18":
          b.value = 0, h.value = 12402, p.value = "Three Layers Broken/Overcast";
          break;
        case "Preset19":
          b.value = 0, h.value = 12402, p.value = "Three Layers Overcast at Low Level";
          break;
        case "Preset20":
          b.value = 0, h.value = 12402, p.value = "Three Layers Overcast at Low Level";
          break;
        case "Preset21":
          b.value = 4134, h.value = 13780, p.value = "Overcast at Low Level";
          break;
        case "Preset22":
          b.value = 1378, h.value = 13780, p.value = "Overcast at Low Level";
          break;
        case "Preset23":
          b.value = 2756, h.value = 11024, p.value = "Three Layers Broken Low Level Scattered High Level";
          break;
        case "Preset24":
          b.value = 1378, h.value = 8268, p.value = "Three Layers Overcast";
          break;
        case "Preset25":
          b.value = 1378, h.value = 11024, p.value = "Three Layers Overcast";
          break;
        case "Preset26":
          b.value = 1378, h.value = 9646, p.value = "Three Layers Overcast";
          break;
        case "Preset27":
          b.value = 1378, h.value = 8268, p.value = "Three Layers Overcast";
          break;
        case "RainyPreset1":
          b.value = 1378, h.value = 9646, p.value = "Overcast with Rain";
          break;
        case "RainyPreset2":
          b.value = 2756, h.value = 8268, p.value = "Overcast with Rain";
          break;
        case "RainyPreset3":
          b.value = 2756, h.value = 8268, p.value = "Overcast with Rain";
          break;
      }
    }
    return Te(
      () => e.value.wx.enable_dust,
      (w) => {
        a.value = w;
      }
    ), Te(
      () => e.value.wx.halo.preset,
      (w) => {
        g.value = w;
      }
    ), Te(
      () => e.value.wx.halo.crystalsPreset,
      (w) => {
        u.value = w === void 0 ? "Tangents" : w;
      }
    ), Te(
      () => e.value.wx.clouds.preset,
      (w) => {
        t.value = w === void 0 ? "Nothing" : w, _(w === void 0 ? "Nothing" : w);
      }
    ), Te(
      () => e.value.wx.clouds.density,
      (w) => {
        n.value = w === void 0 ? 0 : w;
      }
    ), Te(
      () => e.value.wx.clouds.iprecptns,
      (w) => {
        i.value = w;
      }
    ), Te(
      () => e.value.wx.season.temperature,
      (w) => {
        f.value = w;
      }
    ), Te(
      () => e.value.wx.enable_fog,
      (w) => {
        s.value = w;
      }
    ), Te(
      () => e.value.wx.qnh,
      (w) => {
        v.value = Ul(w);
      }
    ), {
      updatePressure: $,
      updateTemp: S,
      updateHaloPreset: O,
      updateHaloCrystalPreset: y,
      updateCloudPreset: T,
      updateCloudDensity: I,
      updatePrecip: k,
      updateToggleDust: m,
      updateToggleFog: P,
      updateFogVis: e.value.updateFogVis,
      updateFogThickness: e.value.updateFogThickness,
      updateCloudBase: e.value.updateCloudBase,
      updateCloudThickness: e.value.updateCloudThickness,
      updateDustVis: e.value.updateDustVis,
      cloud_preset: t,
      tooltip: p,
      cloud_base: o,
      isFogEnabled: s,
      isDustSmokeEnabled: a,
      fog_thickness: d,
      fog_visibility: c,
      dust_smoke_visibility: l,
      cloud_thickness: r,
      temp: f,
      pressure: v,
      halo_preset: g,
      cloud_density: n,
      precip: i,
      halo_crystal_preset: u,
      preset_min: b,
      preset_max: h,
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
    SliderComponent: tP,
    NSpace: mc,
    NFormItem: ga,
    NInputNumber: ma,
    NSelect: jy,
    NTooltip: dw,
    NCheckbox: zy,
    NDivider: pc
  }
}, rP = { class: "flex flex-row" }, nP = { key: 0 }, iP = { key: 0 }, aP = { key: 0 };
function lP(e, t, o, r, n, i) {
  const a = nt("n-input-number"), l = nt("n-form-item"), s = nt("n-divider"), d = nt("n-select"), c = nt("n-checkbox"), f = nt("SliderComponent"), v = nt("n-space"), g = nt("n-tooltip");
  return yo(), sr("div", rP, [
    we(v, {
      vertical: "",
      class: "mr-6 w-full"
    }, {
      default: De(() => [
        we(l, {
          label: "Temperature",
          "label-style": "color: white"
        }, {
          default: De(() => [
            we(a, {
              id: "temperature-input",
              "onUpdate:value": [
                r.updateTemp,
                t[0] || (t[0] = (u) => r.temp = u)
              ],
              min: 8.4,
              max: 50,
              value: r.temp,
              class: "w-full min-w-24",
              size: "small"
            }, {
              suffix: De(() => [
                it(" °C ")
              ]),
              _: 1
            }, 8, ["onUpdate:value", "min", "value"])
          ]),
          _: 1
        }),
        we(s, { class: "divider" }),
        we(l, {
          label: "Pressure",
          "label-style": "color: white"
        }, {
          default: De(() => [
            we(a, {
              id: "pressure-input",
              value: r.pressure,
              "onUpdate:value": [
                t[1] || (t[1] = (u) => r.pressure = u),
                r.updatePressure
              ],
              class: "w-full min-w-24",
              size: "small",
              step: 0.01,
              min: 28.35,
              max: 31.01,
              precision: 2
            }, {
              suffix: De(() => [
                it(" inHg ")
              ]),
              _: 1
            }, 8, ["value", "onUpdate:value", "step", "min", "max"])
          ]),
          _: 1
        }),
        we(s, { class: "divider" }),
        we(l, {
          label: "Ice Halo",
          "label-style": "color: white"
        }, {
          default: De(() => [
            we(d, {
              class: "w-full",
              value: r.halo_preset,
              "onUpdate:value": [
                t[2] || (t[2] = (u) => r.halo_preset = u),
                r.updateHaloPreset
              ],
              options: r.halo_options
            }, null, 8, ["value", "options", "onUpdate:value"])
          ]),
          _: 1
        }),
        r.halo_preset !== "off" && r.halo_preset !== "auto" ? (yo(), sr("div", nP, [
          we(l, {
            label: "Halo Preset",
            "label-style": "color: white"
          }, {
            default: De(() => [
              we(d, {
                class: "w-full",
                "onUpdate:value": [
                  r.updateHaloCrystalPreset,
                  t[3] || (t[3] = (u) => r.halo_crystal_preset = u)
                ],
                value: r.halo_crystal_preset,
                options: r.crystal_options
              }, null, 8, ["onUpdate:value", "value", "options"])
            ]),
            _: 1
          })
        ])) : Ln("", !0),
        we(s, { class: "divider" }),
        we(c, {
          checked: r.isFogEnabled,
          "onUpdate:checked": [
            t[4] || (t[4] = (u) => r.isFogEnabled = u),
            r.updateToggleFog
          ]
        }, {
          default: De(() => [
            it("Toggle Fog")
          ]),
          _: 1
        }, 8, ["checked", "onUpdate:checked"]),
        we(f, {
          labelText: "Fog Visibility",
          value: r.fog_visibility,
          "onUpdate:value": t[5] || (t[5] = (u) => r.fog_visibility = u),
          onUpdateValue: r.updateFogVis,
          class: "mt-2 w-full",
          suffix: "ft",
          max: 19685,
          disabled: !r.isFogEnabled
        }, null, 8, ["value", "onUpdateValue", "disabled"]),
        we(f, {
          labelText: "Fog Thickness",
          value: r.fog_thickness,
          "onUpdate:value": t[6] || (t[6] = (u) => r.fog_thickness = u),
          onUpdateValue: r.updateFogThickness,
          class: "w-full",
          suffix: "ft",
          max: 3281,
          disabled: !r.isFogEnabled
        }, null, 8, ["value", "onUpdateValue", "disabled"])
      ]),
      _: 1
    }),
    we(v, {
      vertical: "",
      class: "ml-8 w-full"
    }, {
      default: De(() => [
        we(l, {
          label: "Cloud Preset",
          "label-style": "color: white"
        }, {
          default: De(() => [
            we(g, {
              trigger: "hover",
              class: "w-full"
            }, {
              trigger: De(() => [
                we(d, {
                  class: "w-full",
                  value: r.cloud_preset,
                  "onUpdate:value": [
                    t[7] || (t[7] = (u) => r.cloud_preset = u),
                    r.updateCloudPreset
                  ],
                  options: r.cloud_options
                }, null, 8, ["value", "onUpdate:value", "options"])
              ]),
              default: De(() => [
                it(" " + es(r.tooltip), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        we(s, { class: "divider" }),
        we(f, {
          labelText: "Cloud Base",
          val: r.cloud_base,
          min: r.preset_min,
          max: r.preset_max,
          suffix: "ft",
          onUpdateValue: r.updateCloudBase
        }, null, 8, ["val", "min", "max", "onUpdateValue"]),
        r.cloud_preset === "Nothing" ? (yo(), sr("div", iP, [
          we(f, {
            labelText: "Cloud Thickness",
            onUpdateValue: r.updateCloudThickness,
            val: r.cloud_thickness,
            suffix: "ft"
          }, null, 8, ["onUpdateValue", "val"]),
          we(l, {
            label: "Density",
            "label-style": "color: white"
          }, {
            default: De(() => [
              we(a, {
                id: "cloud-thickness-input",
                class: "w-full min-w-24",
                value: r.cloud_density,
                "onUpdate:value": [
                  t[8] || (t[8] = (u) => r.cloud_density = u),
                  r.updateCloudDensity
                ],
                size: "small",
                min: 0,
                max: 10
              }, null, 8, ["value", "onUpdate:value"])
            ]),
            _: 1
          }),
          r.cloud_density >= 5 ? (yo(), sr("div", aP, [
            we(l, {
              label: "Precipitation",
              "label-style": "color: white"
            }, {
              default: De(() => [
                we(d, {
                  class: "w-full",
                  value: r.precip,
                  "onUpdate:value": [
                    t[9] || (t[9] = (u) => r.precip = u),
                    r.updatePrecip
                  ],
                  options: r.precip_options
                }, null, 8, ["value", "onUpdate:value", "options"])
              ]),
              _: 1
            })
          ])) : Ln("", !0),
          we(s, { class: "divider" })
        ])) : Ln("", !0),
        we(c, {
          checked: r.isDustSmokeEnabled,
          "onUpdate:checked": [
            t[10] || (t[10] = (u) => r.isDustSmokeEnabled = u),
            r.updateToggleDust
          ]
        }, {
          default: De(() => [
            it(" Toggle Dust/Smoke ")
          ]),
          _: 1
        }, 8, ["checked", "onUpdate:checked"]),
        we(f, {
          labelText: "Dust Smoke Visibility",
          val: r.dust_smoke_visibility,
          onUpdateValue: r.updateDustVis,
          suffix: "ft",
          class: "mt-2",
          min: 984,
          max: 9843,
          disabled: !r.isDustSmokeEnabled
        }, null, 8, ["val", "onUpdateValue", "disabled"])
      ]),
      _: 1
    })
  ]);
}
const sP = /* @__PURE__ */ Mn(oP, [["render", lP]]), dP = (e) => e === null ? "" : e > 359 ? "000" : e < 100 ? e.toString().padStart(3, "0") : e.toString(), cP = {
  components: {
    NFormItem: ga,
    NInputNumber: ma,
    NDivider: pc
  },
  setup() {
    const e = M(() => ba()), t = E(Uo(e.value.wx.groundTurbulence)), o = E(e.value.wx.wind.atGround.speed), r = E(e.value.wx.wind.atGround.dir), n = E(e.value.wx.wind.at2000.speed), i = E(e.value.wx.wind.at2000.dir), a = E(e.value.wx.wind.at8000.speed), l = E(e.value.wx.wind.at8000.dir), s = (p) => {
      e.value.wx.groundTurbulence = jo(p);
    }, d = (p) => {
      e.value.wx.wind.atGround.speed = p;
    }, c = (p) => {
      e.value.wx.wind.atGround.dir = p;
    }, f = (p) => {
      e.value.wx.wind.at2000.speed = p;
    }, v = (p) => {
      e.value.wx.wind.at2000.dir = p;
    }, g = (p) => {
      e.value.wx.wind.at8000.speed = p;
    }, u = (p) => {
      e.value.wx.wind.at8000.dir = p;
    };
    return Te(
      () => e.value.wx.groundTurbulence,
      (p) => {
        t.value = p;
      }
    ), Te(
      () => e.value.wx.wind.atGround.speed,
      (p) => {
        o.value = p;
      }
    ), Te(
      () => e.value.wx.wind.atGround.dir,
      (p) => {
        r.value = p;
      }
    ), Te(
      () => e.value.wx.wind.at2000.speed,
      (p) => {
        n.value = p;
      }
    ), Te(
      () => e.value.wx.wind.at2000.dir,
      (p) => {
        i.value = p;
      }
    ), Te(
      () => e.value.wx.wind.at8000.speed,
      (p) => {
        a.value = p;
      }
    ), Te(
      () => e.value.wx.wind.at8000.dir,
      (p) => {
        l.value = p;
      }
    ), {
      updateTurbulence: s,
      updateSfcWind: d,
      updateSfcWindDir: c,
      updateTwokWind: f,
      updateTwokWindDir: v,
      updateEightkWind: g,
      updateEightkWindDir: u,
      windDir: dP,
      turbulence: t,
      sfcwind: o,
      sfcwinddir: r,
      twokwind: n,
      twokwinddir: i,
      eightkwind: a,
      eightkwinddir: l
    };
  }
}, uP = { class: "flex flex-row w-1/2" }, fP = { class: "flex flex-row w-1/2" }, hP = { class: "flex flex-row w-1/2" };
function pP(e, t, o, r, n, i) {
  const a = nt("n-input-number"), l = nt("n-form-item"), s = nt("n-divider");
  return yo(), sr("div", null, [
    we(l, { label: "Surface Winds" }, {
      default: De(() => [
        lo("div", uP, [
          we(a, {
            id: "sfc-winds-input",
            class: "w-3/5",
            "onUpdate:value": [
              r.updateSfcWind,
              t[0] || (t[0] = (d) => r.sfcwind = d)
            ],
            value: r.sfcwind,
            min: 0
          }, {
            suffix: De(() => [
              it("kts")
            ]),
            _: 1
          }, 8, ["onUpdate:value", "value"]),
          we(a, {
            class: "ml-4 w-1/2",
            id: "sfc-winds-dir-input",
            value: r.sfcwinddir,
            "onUpdate:value": [
              t[1] || (t[1] = (d) => r.sfcwinddir = d),
              r.updateSfcWindDir
            ],
            min: 0,
            format: r.windDir
          }, {
            suffix: De(() => [
              it("°")
            ]),
            _: 1
          }, 8, ["value", "onUpdate:value", "format"])
        ])
      ]),
      _: 1
    }),
    we(l, { label: "Winds at 2000" }, {
      default: De(() => [
        lo("div", fP, [
          we(a, {
            class: "w-3/5",
            id: "twok-wind-input",
            value: r.twokwind,
            "onUpdate:value": [
              t[2] || (t[2] = (d) => r.twokwind = d),
              r.updateTwokWind
            ],
            min: 0
          }, {
            suffix: De(() => [
              it("kts")
            ]),
            _: 1
          }, 8, ["value", "onUpdate:value"]),
          we(a, {
            class: "ml-4 w-1/2",
            id: "twok-wind-dir-input",
            value: r.twokwinddir,
            "onUpdate:value": [
              t[3] || (t[3] = (d) => r.twokwinddir = d),
              r.updateTwokWindDir
            ],
            min: 0,
            format: r.windDir
          }, {
            suffix: De(() => [
              it("°")
            ]),
            _: 1
          }, 8, ["value", "onUpdate:value", "format"])
        ])
      ]),
      _: 1
    }),
    we(l, { label: "Winds at 8000" }, {
      default: De(() => [
        lo("div", hP, [
          we(a, {
            class: "w-3/5",
            id: "eightk-wind-input",
            value: r.eightkwind,
            "onUpdate:value": [
              t[4] || (t[4] = (d) => r.eightkwind = d),
              r.updateEightkWind
            ],
            min: 0
          }, {
            suffix: De(() => [
              it("kts")
            ]),
            _: 1
          }, 8, ["value", "onUpdate:value"]),
          we(a, {
            class: "ml-4 w-1/2",
            id: "eightk-wind-dir-input",
            value: r.eightkwinddir,
            "onUpdate:value": [
              t[5] || (t[5] = (d) => r.eightkwinddir = d),
              r.updateEightkWindDir
            ],
            min: 0,
            format: r.windDir
          }, {
            suffix: De(() => [
              it("°")
            ]),
            _: 1
          }, 8, ["value", "onUpdate:value", "format"])
        ])
      ]),
      _: 1
    }),
    we(s, { class: "divider w-1/2" }),
    we(l, { label: "Turbulence" }, {
      default: De(() => [
        we(a, {
          id: "turbulence-input",
          class: "w-1/2 min-w-24",
          value: r.turbulence,
          "onUpdate:value": [
            t[6] || (t[6] = (d) => r.turbulence = d),
            r.updateTurbulence
          ],
          size: "small",
          step: 3,
          min: 0,
          max: 197
        }, {
          suffix: De(() => [
            it(" 0.1* ft")
          ]),
          _: 1
        }, 8, ["value", "onUpdate:value"])
      ]),
      _: 1
    })
  ]);
}
const vP = /* @__PURE__ */ Mn(cP, [["render", pP]]), gP = {
  components: {
    AtmosphereClouds: sP,
    WindConditions: vP,
    NConfigProvider: Ay
  },
  setup() {
    const e = J2(), t = E(e.theme), o = E(e.getSelectedTheme), r = E(
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
}, mP = { class: "flex flex-row w-full text-xl mt-2 font-sans font-semibold" }, bP = { class: "flex justify-center flex-col w-1/2 h-full overflow-hidden pl-10" }, xP = /* @__PURE__ */ lo("h3", { class: "border-b border-white border-solid border-1 mb-12" }, " Clouds & Atmosphere ", -1), CP = { class: "flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10 ml-8" }, yP = /* @__PURE__ */ lo("h3", { class: "border-b border-white border-solid border-1 mb-12" }, "Wind", -1);
function wP(e, t, o, r, n, i) {
  const a = nt("AtmosphereClouds"), l = nt("WindConditions"), s = nt("n-config-provider");
  return yo(), Ql(s, {
    theme: r.selectedTheme === "Dark" ? r.theme : null,
    "theme-overrides": r.selectedTheme === "Dark" ? r.themeOverrides : null
  }, {
    default: De(() => [
      lo("div", mP, [
        lo("div", bP, [
          xP,
          we(a)
        ]),
        lo("div", CP, [
          yP,
          we(l)
        ])
      ])
    ]),
    _: 1
  }, 8, ["theme", "theme-overrides"]);
}
const SP = /* @__PURE__ */ Mn(gP, [["render", wP]]);
const PP = Wu(), kc = gu(SP);
kc.use(PP);
kc.mount("#app");
export {
  TP as inputWeather,
  ba as useWeatherStore
};
