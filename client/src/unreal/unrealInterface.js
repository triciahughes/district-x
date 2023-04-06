if (typeof ue != "object" || typeof ue.interface != "object") {
  (function (obj) {
    if (obj && obj.broadcast) {
      ue.interface = {};

      ue.interface.broadcast = function (name, data) {
        if (typeof name != "string") return;
        if (typeof data != "undefined")
          obj.broadcast(name, JSON.stringify(data));
        else {
          console.log("Incoming Error");
          obj.broadcast(name, "");
        }
      };
    }
  })(ue.interface);
}

if (ue && ue.interface && ue.interface.broadcast) {
  ue5 = ue.interface.broadcast;
}
