var mic, recorder, soundFile;
var size, counter;

function setup() {
	noCursor();
	createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
	mic.start();

	recorder = new p5.SoundRecorder();
	recorder.setInput(mic);
	soundFile = new p5.SoundFile();

	startArchive();
	size = 500;
	counter = 0;

}

function draw() {
	frameRate(20);
	background(0);

	var vol = mic.getLevel();
	new Panel().display(vol);

	// endDirection();
	counter += 1;
}

function startArchive() {
	recorder.record(soundFile);
}

function completed() {
	recorder.stop();
	save(soundFile, 'remembered on ' +
		year() + '_' + month() + '_' + day() + '_' + hour() + '_' + minute() +
		'.wav');
}

function endDirection() {
	textSize(12);
	fill("white");
	text("press any key to exit", 100, 100);
}

function keyPressed() {
	// completed();
}

function Panel (x, y) {
	this.display = function(vol) {
		var strokeColor = "red";
		if (vol * 100 > 0.02) {
			strokeColor = "white";
			counter = 0;
			frameRate(4);
		}

		size = max(0, size + vol * 100 - counter/5);
		// var adjustedVol = vol * 10;
		fill("white");
		stroke(strokeColor);

		var posX = windowWidth/2 - size/2;
		var posY = windowHeight/2 - size/2;
		rect(vol * 4000 + posX, vol * 4000 + posY, size, size);
	}
}
