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

const ue5 = (function () {
  // Non-strict mode context inside the IIFE

  if (typeof ue != "object" || typeof ue.interface != "object") {
    if (typeof ue != "object") ue = {};
    // mobile
    ue.interface = {};
    ue.interface.broadcast = function (name, data) {
      if (typeof name != "string") return;
      var args = [name, ""];
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
  } else
    (function (obj) {
      // desktop
      ue.interface = {};
      ue.interface.broadcast = function (name, data) {
        if (typeof name != "string") return;
        if (typeof data != "undefined")
          obj.broadcast(name, JSON.stringify(data));
        else obj.broadcast(name, "");
      };
    })(ue.interface);

  // create the global ue5(...) helper function
  return ue.interface.broadcast;
})();

export default ue5;
