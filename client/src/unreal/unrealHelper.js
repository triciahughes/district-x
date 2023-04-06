// Creates the global ue5(...) helper function

export let ue;
if (typeof ue !== "object") {
  ue = {};
}

export const uuidv4 = function () {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (t) {
    return (
      t ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (t / 4)))
    ).toString(16);
  });
};

export const ue5 = (function (r) {
  if (
    "object" != typeof ue.interface ||
    "function" != typeof ue.interface.broadcast
  ) {
    ue.interface = {};
    return function (t, e, n, o) {
      var u, i;
      if ("string" == typeof t) {
        if ("function" == typeof e) {
          o = n;
          n = e;
          e = null;
        }
        u = [t, "", r(n, o)];
        if (void 0 !== e) {
          u[1] = e;
        }
        i = encodeURIComponent(JSON.stringify(u));
        if (
          "object" == typeof window.history &&
          "function" == typeof window.history.pushState
        ) {
          window.history.pushState({}, "", "#" + i);
          window.history.pushState({}, "", "#" + encodeURIComponent("[]"));
        } else {
          document.location.hash = i;
          document.location.hash = encodeURIComponent("[]");
        }
      }
    };
  } else {
    const i = ue.interface;
    ue.interface = {};
    return function (t, e, n, o) {
      var u;
      if ("string" == typeof t) {
        if ("function" == typeof e) {
          o = n;
          n = e;
          e = null;
        }
        u = r(n, o);
        if (void 0 !== e) {
          i.broadcast(t, JSON.stringify(e), u);
        } else {
          i.broadcast(t, "", u);
        }
      }
    };
  }
})(function (t, e) {
  if ("function" != typeof t) return "";
  var n = uuidv4();
  ue.interface[n] = t;
  setTimeout(function () {
    delete ue.interface[n];
  }, 1e3 * Math.max(1, parseInt(e) || 0));
  return n;
});
