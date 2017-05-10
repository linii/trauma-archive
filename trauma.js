var mic, recorder, soundFile;
var size, counter;
var origSize;
var multiplier = 1.75;
var volMult = 0.3;
var img;
var x, y;
var posX, posY;

function setup() {
	noCursor();
	createCanvas(windowWidth, windowHeight);

	inputArchive();
	img = loadImage("art1.jpg");
	init();
}

function init() {
	counter = 0;

	origSize = windowWidth/3;
	size = origSize;

	posX = windowWidth/2 - size/2;
	posY = windowHeight/2 - size/2;

	x = random(0, img.width);
	y = random(0, img.height);
}

function draw() {
	frameRate(60);
	display(mic.getLevel());
	counter += 1;
}

function inputArchive() {
	mic = new p5.AudioIn();
	mic.start();
}

function display (vol) {
	if (vol * size > 0.05 && !keyIsPressed) {
		counter = 0;
		frameRate(20);
	}

	size = max(0, (origSize - counter/3) + vol * size * volMult);

	noStroke();
	fill("black");

	for (var i = 0; i < 10; i++) {
		var disp1 = random(-1, 1) * randomGaussian(vol * size);
		var disp2 = random(-1, 1) * randomGaussian(vol * size);

		x += disp1 * 2;
		y += disp2 * 2;

		var imgSize = size * multiplier;
		rect(disp1 + posX, disp2 + posY, size, size);
		image(img,
			disp1+posX,
			disp2+posY,
			size, size,
			min(x, img.width - imgSize),
			min(y, img.height - imgSize),
			imgSize, imgSize );
	}

	// check for bounds
	if (x > img.width || x < 0)
		x = random(0, img.width - size);
	if (y > img.height || y < 0)
		y = random(0, img.height - size);
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
