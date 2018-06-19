 const names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    blue: "#0000ff",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    red: "#ff0000",
    yellow: "#ffff00"
};

function random () {
  var result;
  var count = 0;
  for (var prop in names)
      if (Math.random() < 1/++count)
         result = prop;
  return result;
};


export default {
names,
random
}