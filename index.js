
const $ = (s) => document.querySelector(s)

const start = $('#start')
const stop = $('#stop')
const reset = $('#reset')
const breakBtn = $('#start-break')
const pomodoro = $('#pomodoro')
const _work = $('#work')
const _break = $('#break')
const audio = $('#audio')

stop.addEventListener('click', stopInterval)
start.addEventListener('click', startWork)
reset.addEventListener('click', resetTimer)
breakBtn.addEventListener('click', startBreak)

// interval, for stoping the interval easily
let int;

function startWork() {
	// we want it in minutes
	let worktime = (_work.value) * 60

	stopInterval()
	int = setInterval( () => {
		if (worktime <= 0) clearInterval(int)
		if (worktime <= 5) audio.play()
		pomodoro.innerHTML = prettyTime(worktime)
		worktime -= 1
	}, 1000)
}

function startBreak() {
	let breaktime = (_break.value) * 60

	stopInterval()
	int = setInterval( () => {
		if (breaktime <= 0) clearInterval(int)
		pomodoro.innerHTML = prettyTime(breaktime)
		breaktime -= 1
	}, 1000)
}

function stopInterval() {
	clearInterval(int)
}

function resetTimer() {
	// reset all values to default and stop timer
	stopInterval()
	timer = 25 * 60
	_work.value = 25
	_break.value = 5
	// change the time too
	pomodoro.innerHTML = prettyTime(timer)
}

function prettyTime(time) {
	const _min = Math.floor( time / 60 )
	const min = _min >= 10 ? _min : '0' + _min
	const _sec = time % 60
	const sec = _sec >= 10 ? _sec : '0' + _sec

	return `${ min }:${ sec }`
}
