// Export the global variable `ue`. If it's not an object, initialize it as an empty object.
export let ue;
if (typeof ue !== "object") {
  ue = {};
}

// Export the `uuidv4` function that generates a unique identifier (UUID v4) as a string.
export const uuidv4 = function () {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (t) {
    return (
      t ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (t / 4)))
    ).toString(16);
  });
};

// Export the `ue5` function that allows broadcasting messages using either the `ue.interface.broadcast`
// function or the browser's history state depending on the availability of the `ue.interface.broadcast` function.
export const ue5 = (function (r) {
  // Check if `ue.interface.broadcast` is not available, and initialize `ue.interface` as an empty object.
  if (
    "object" != typeof ue.interface ||
    "function" != typeof ue.interface.broadcast
  ) {
    ue.interface = {};
    return function (t, e, n, o) {
      var u, i;
      if ("string" == typeof t) {
        // If the second argument is a function, shift the arguments.
        if ("function" == typeof e) {
          o = n;
          n = e;
          e = null;
        }
        // Create an array with the first argument, an empty string, and the return value of the function `r` called with `n` and `o`.
        u = [t, "", r(n, o)];
        if (void 0 !== e) {
          u[1] = e;
        }
        // Encode the array as a JSON string and store it in the browser's history state.
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
    // If `ue.interface.broadcast` is available, store the existing `ue.interface` and initialize a new empty object.
    const i = ue.interface;
    ue.interface = {};
    return function (t, e, n, o) {
      var u;
      if ("string" == typeof t) {
        // If the second argument is a function, shift the arguments.
        if ("function" == typeof e) {
          o = n;
          n = e;
          e = null;
        }
        u = r(n, o);
        // Broadcast the message using the `ue.interface.broadcast` function.
        if (void 0 !== e) {
          i.broadcast(t, JSON.stringify(e), u);
        } else {
          i.broadcast(t, "", u);
        }
      }
    };
  }
})(function (t, e) {
  // If the first argument is not a function, return an empty string.
  if ("function" != typeof t) return "";
  // Generate a UUID and store the function `t` in `ue.interface` using the UUID as a key.
  var n = uuidv4();
  ue.interface[n] = t;
  // After a certain timeout, delete the stored function from `ue.interface`.
  setTimeout(function () {
    delete ue.interface[n];
  }, 1e3 * Math.max(1, parseInt(e) || 0));
  return n;
});

// To summarize, this JavaScript code exports three items:

// ue: A global variable that is initialized as an empty object if it's not already an object.
// uuidv4: A function that generates a UUID v4 string.
// ue5: A function that broadcasts messages using either the ue.interface.broadcast function or the browser's history state, depending on the availability of ue.interface.broadcast.
// The ue5 function also accepts an optional callback function as an argument, which is stored in the ue.interface object using a UUID as the key. The stored function is removed after a specified timeout.
