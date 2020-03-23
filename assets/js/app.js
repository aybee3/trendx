// Render the color wheel
var colorPicker = new iro.ColorPicker('#colorPicker', {
	width: 280,
	color: 'rgb(61, 219, 133)',
	borderWidth: 5,
	borderColor: '#fff'
});


// ========== Probe elements ==========
const svg = document.querySelector('#dynamicSVG');
const colorWheel = document.querySelector('#userInput');
const navTitle = document.querySelector("#navTitle");
const hamburg = document.querySelector('.icofont-navigation-menu');
const toTopBtn = document.querySelector('.back-to-top');

const t1Image = document.querySelectorAll("#topwear-1-image");
const b1Image = document.querySelectorAll("#bottomwear-1-image");
const f1Image = document.querySelectorAll("#footwear-1-image");

const t1Link = document.querySelector("#topwear-1-link");
const b1Link = document.querySelector("#bottomwear-1-link");
const f1Link = document.querySelector("#footwear-1-link");


// ========== Remove "X" on small screens ==========
var w = window.innerWidth;
var h = window.innerHeight;
if (h > w) { // on portrait
	svg.style.display = 'none';
}


// ========== Log user input ==========

// Register change when clicking or touching the color wheel
colorWheel.addEventListener('touchend', registerColor);
colorWheel.addEventListener('mouseup', registerColor);


// Register category
var catIndex; // category index
// 1 = male, 2 = female, 3 = kids

document.querySelector("#category").onchange = function () {
	catIndex = this.selectedIndex;
	registerColor();
};


// Function to log on event
var selectedHEX; // user input
var hue; // hue of user input
var mainColor; // color selected [string]
var colorIndex; // 0 = red, 1 = orange, 2 = yellow, 3 = green, 4 = blue, 5 = purple, 6 = pink

function registerColor(e) {
	var selectedHEX = colorPicker.color.hexString;
	console.log(`HEX: ${selectedHEX}`);

	// Change color of elements on window
	svg.style.fill = selectedHEX;
	navTitle.style.color = selectedHEX;
	hamburg.style.color = selectedHEX;
	toTopBtn.style.background = selectedHEX;
	hue = HEXtoHUE(selectedHEX);
	colorCategory(hue);
	contentReplacer(catIndex, colorIndex);

	console.log(`Category index: ${catIndex}`);
	console.log(`Hue: ${hue}`);
	console.log(mainColor);
	console.log("-       x        -\n-       x        -");
}


// ========== Find complementary ==========
var hue;

function HEXtoHUE(hex) {

	// HEX to RGB
	var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l) {
		return parseInt(hex.length % 2 ? l + l : l, 16);
	}).join(',') + ')';

	// Get array of RGB values
	rgb = rgb.replace(/[^\d,]/g, '').split(',');

	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];

	console.log(`RGB: ${r} ${g} ${b}`);


	// RGB to HSB
	r /= 255.0;
	g /= 255.0;
	b /= 255.0;
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2.0;

	if (max == min) {
		h = s = 0; //achromatic
	} else {
		var d = max - min;
		s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

		if (max == r && g >= b) {
			h = 1.0472 * (g - b) / d;
		} else if (max == r && g < b) {
			h = 1.0472 * (g - b) / d + 6.2832;
		} else if (max == g) {
			h = 1.0472 * (b - r) / d + 2.0944;
		} else if (max == b) {
			h = 1.0472 * (r - g) / d + 4.1888;
		}
	}

	h = h / 6.2832 * 360.0 + 0;
	return h;
}


// ========== Categorize colors ============
function colorCategory(hue) {
	if (hue >= 330) {
		mainColor = "red";
		colorIndex = 0;
	} else if (hue >= 0 && hue < 30) {
		mainColor = "orange";
		colorIndex = 1;
	} else if (hue >= 30 && hue < 70) {
		mainColor = "yellow";
		colorIndex = 2;
	} else if (hue >= 70 && hue < 170) {
		mainColor = "green";
		colorIndex = 3;
	} else if (hue >= 170 && hue < 260) {
		mainColor = "blue";
		colorIndex = 4;
	} else if (hue >= 260 && hue < 295) {
		mainColor = "purple";
		colorIndex = 5;
	} else {
		mainColor = "pink";
		colorIndex = 6;
	}
}

var imageDir = "/assets/img/clothes/";
var linkDir = "/assets/img/clothes/links/"


function contentReplacer(catIndex, colorIndex) {

	// Replace links
	t1Link.href = linkDir + catIndex + "-" + colorIndex + "-top.html";
	b1Link.href = linkDir + catIndex + "-" + colorIndex + "-bottom.html";
	f1Link.href = linkDir + catIndex + "-" + colorIndex + "-foot.html";

}