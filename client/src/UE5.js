// if (typeof ue != "object") ue = {};
let ue = {};
const uuidv4 = function () {
  // RFC4122
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (c) {
    return (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16);
  });
};

const ue5 = (function (register) {
  if (typeof ue === "undefined" || typeof ue !== "object") {
    ue = {};
  }

  if (
    typeof ue.interop != "object" ||
    typeof ue.interop.broadcast != "function"
  ) {
    // mobile
    ue.interop = {};
    return function (name, data, callback, timeout) {
      if (typeof name != "string") return;

      if (typeof data == "function") {
        timeout = callback;
        callback = data;
        data = null;
      }

      var uuid = register(callback, timeout);
      var args = [name, "", uuid];
      if (typeof data != "undefined") args[1] = data;

      var hash = encodeURIComponent(JSON.stringify(args));
      if (
        typeof window.history == "object" &&
        typeof window.history.pushState == "function"
      ) {
        window.history.pushState({}, "", "#" + hash);
        window.history.pushState({}, "", "#" + encodeURIComponent("[]"));
      } else {
        document.location.hash = hash;
        document.location.hash = encodeURIComponent("[]");
      }
    };
  }

  return (function (interop) {
    // desktop
    ue.interop = {};
    return function (name, data, callback, timeout) {
      if (typeof name != "string") return;

      if (typeof data == "function") {
        timeout = callback;
        callback = data;
        data = null;
      }

      var uuid = register(callback, timeout);
      if (typeof data != "undefined")
        interop.broadcast(name, JSON.stringify(data), uuid);
      else interop.broadcast(name, "", uuid);
    };
  })(ue.interop);
})(function (callback, timeout) {
  if (typeof callback != "function") return "";

  var uuid = uuidv4();
  ue.interop[uuid] = callback;

  setTimeout(function () {
    delete ue.interop[uuid];
  }, 1000 * Math.max(1, parseInt(timeout) || 0));

  return uuid;
});

export default ue5;
