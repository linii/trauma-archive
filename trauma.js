var mic, recorder, soundFile;
var size, counter;
var origSize;
var img;
var x, y;

function setup() {
	noCursor();
	createCanvas(windowWidth, windowHeight);

	inputArchive();
	// startArchive();
	counter = 0;
	origSize = windowWidth/2.5;
	size = origSize;

	img = loadImage("art1.jpg");
	x = random(0, img.width);
	y = random(0, img.height);
}

function draw() {
	frameRate(40);
	background(0);

	var vol = mic.getLevel();
	display(vol);
	counter += 1;
}

function inputArchive() {
	mic = new p5.AudioIn();
	mic.start();
}

function startArchive() {
	recorder = new p5.SoundRecorder();
	recorder.setInput(mic);
	soundFile = new p5.SoundFile();
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

function display (vol) {
	var strokeColor = "white";
	if (vol * size > 0.01 && !keyIsPressed) {
		strokeColor = "red";
		counter = 0;
		frameRate(10);
	}

	size = max(0, (origSize - counter/3) + vol * 300);
	strokeWeight(0.2);
	stroke(strokeColor);
	fill("black");

	var posX = windowWidth/2 - size/2;
	var posY = windowHeight/2 - size/2;

	for (var i = 0; i < 10; i++) {
		var disp1 = random(-1, 1) * randomGaussian(vol * size);
		var disp2 = random(-1, 1) * randomGaussian(vol * size);

		x += disp1 * 5;
		y += disp2 * 5;

		// print("x: " + x + "/" + img.width);
		// print("y: " + y + "/" + img.height);
		rect(disp1 + posX, disp2 + posY, size, size);
		image(img, disp1+posX, disp2+posY, size, size,
			x, y, size, size);
	}

	if (x > img.width || x < 0)
		x = random(0, img.width - size);
	if (y > img.height || y < 0)
		y = random(0, img.height - size);
}
