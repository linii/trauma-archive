var mic, recorder, soundFile;
var size, counter;
var origSize;

function setup() {
	noCursor();
	createCanvas(windowWidth, windowHeight);

	mic = new p5.AudioIn();
	mic.start();

	recorder = new p5.SoundRecorder();
	recorder.setInput(mic);
	soundFile = new p5.SoundFile();

	startArchive();

	counter = 0;
	origSize = 500;
	size = origSize;
}

function draw() {
	frameRate(40);
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
		if (vol * 100 > 0.02 && !keyIsPressed) {
			strokeColor = "white";
			counter = 0;
			frameRate(6);
		}


		size = max(0, (origSize - counter/3) + vol * 10 );
		fill("white");
		stroke(strokeColor);

		var posX = windowWidth/2 - size/2;
		var posY = windowHeight/2 - size/2;
		for (var i = 0; i < 10; i++) {
			var disp1 = random([-1, 0, 1]) * randomGaussian(vol * 1000);
			var disp2 = random([-1, 0, 1]) * randomGaussian(vol * 1000);
			rect(disp1 + posX, disp2 + posY, size, size);
		}
	}
}
