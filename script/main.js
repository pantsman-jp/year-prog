function now() {
  return new Date()
}

function yearStart(d) {
  return new Date(d.getFullYear(), 0, 1)
}

function yearEnd(d) {
  return new Date(d.getFullYear() + 1, 0, 1)
}

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max)
}

function progressRatio(d) {
  return clamp(
    (d - yearStart(d)) / (yearEnd(d) - yearStart(d)),
    0,
    1
  )
}

function remainingMillis(d) {
  return yearEnd(d) - d
}

function breakdown(ms) {
  var totalSeconds = Math.max(0, Math.floor(ms / 1000))
  var seconds = totalSeconds % 60
  var totalMinutes = Math.floor(totalSeconds / 60)
  var minutes = totalMinutes % 60
  var totalHours = Math.floor(totalMinutes / 60)
  var hours = totalHours % 24
  var days = Math.floor(totalHours / 24)
  return { days: days, hours: hours, minutes: minutes, seconds: seconds }
}

function remainingText(r) {
  return "There are " +
    r.days + " days " +
    r.hours + " hours " +
    r.minutes + " minutes " +
    r.seconds + " seconds left this year."
}

function viewModel(d) {
  return {
    ratio: progressRatio(d),
    text: remainingText(breakdown(remainingMillis(d)))
  }
}

function render(vm) {
  document.getElementById("progress").style.width = (vm.ratio * 100) + "%"
  document.getElementById("remaining").textContent = vm.text
}

function tick() {
  render(viewModel(now()))
}

tick()
setInterval(tick, 1000)