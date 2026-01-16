function now() {
  return new Date()
}

function year_start(d) {
  return new Date(d.getFullYear(), 0, 1)
}

function year_end(d) {
  return new Date(d.getFullYear() + 1, 0, 1)
}

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max)
}

function prog_ratio(d) {
  return clamp(
    (d - year_start(d)) / (year_end(d) - year_start(d)),
    0,
    1
  )
}

function remain(d) {
  return year_end(d) - d
}

function breakdown(ms) {
  var total_seconds = Math.max(0, Math.floor(ms / 1000))
  var ss = total_seconds % 60
  var total_minutes = Math.floor(total_seconds / 60)
  var mm = total_minutes % 60
  var total_hours = Math.floor(total_minutes / 60)
  var hh = total_hours % 24
  var dd = Math.floor(total_hours / 24)
  return { dd: dd, hh: hh, mm: mm, ss: ss }
}

function remain_txt(r) {
  return "There are " +
    r.dd + " days " +
    r.hh + " hours " +
    r.mm + " minutes " +
    r.ss + " seconds left this year."
}

function prog_txt(ratio) {
  return (Math.round(ratio * 1000) / 10).toFixed(1) + "%"
}

function prog_color(ratio) {
  var r = Math.round(200 * ratio)
  var g = Math.round(200 * (1 - ratio))
  return "rgb(" + r + "," + g + ",0)"
}

function view(d) {
  var ratio = prog_ratio(d)
  return {
    ratio: ratio,
    percentLeft: ratio * 100,
    progress: prog_txt(ratio),
    color: prog_color(ratio),
    text: remain_txt(breakdown(remain(d)))
  }
}

function render(vm) {
  var bar = document.getElementById("progress")
  bar.style.width = vm.percentLeft + "%"
  bar.style.backgroundColor = vm.color
  document.getElementById("percent").style.left = vm.percentLeft + "%"
  document.getElementById("percent").textContent = vm.progress
  document.getElementById("remaining").textContent = vm.text
}

function tick() {
  render(view(now()))
  document.getElementById("datetime").textContent = datetime_txt(new Date())
}

function datetime_txt(d) {
  var y = d.getFullYear()
  var m = String(d.getMonth() + 1).padStart(2, "0")
  var day = String(d.getDate()).padStart(2, "0")
  var h = String(d.getHours()).padStart(2, "0")
  var min = String(d.getMinutes()).padStart(2, "0")
  var s = String(d.getSeconds()).padStart(2, "0")
  return y + "-" + m + "-" + day + " " + h + ":" + min + ":" + s
}

tick()
setInterval(tick, 1000)