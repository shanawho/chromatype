//FONTS
var headerSans = ['Quicksand', 'Rokkitt', 'Sanchez', 'Oswald', 'Nunito', 'Yanone Kaffeesatz', 
				'Maven Pro', 'Cabin Condensed', 'Overlock', 'Raleway'];
var headerSerif = ['Libre Baskerville', 'Alegreya', 'Playfair Display', 'Lora', 
					'Bitter', 'Kreon', 'Jacques Francois', 'Marcellus', 'Quattrocentro',
			'Bentham', 'Alice'];
var subSans = ['PT Sans', 'Lato', 'Open Sans', 'Merriweather Sans'];
var subSerif = ['Lora', 'Merriweather', 'Libre Baskerville', 'Ovo'];
var paragraphSans = ['PT Sans', 'Lato', 'Open Sans', 'Merriweather Sans'];
var paragraphSerif = ['Lora', 'Merriweather', 'Libre Baskerville']
var script = ['Cherry Swash', 'Pacifico', 'Oleo Script', 'Berkshire Swash', 
			'Leckerli One', 'Grand Hotel', 'Sofia']

function getFont(tag, type) {
	var i;
	var font;
	switch (tag) {
		case 'header':
			var scr = Math.floor(Math.random()*2 + 1);
			if (scr == 1) {
				i = Math.floor(Math.random()*script.length);
				return script[i];	
			} else if (type == 'casual') {
				i = Math.floor(Math.random()*headerSans.length);
				return headerSans[i];
			} else if (type == 'formal') {
				i = Math.floor(Math.random()*headerSerif.length);
				return headerSerif[i];
			}
		case 'subheader':
			if (type == 'fomal') {
				i = Math.floor(Math.random()*subSans.length);
				return subSans[i];
			} else if (type == 'casual') {
				i = Math.floor(Math.random()*subSerif.length);
				return subSerif[i];
			}
		case 'paragraph':
			if (type == 'casual') {
				i = Math.floor(Math.random()*paragraphSans.length);
				return paragraphSans[i];
			} else if (type == 'formal') {
				i = Math.floor(Math.random()*paragraphSerif.length);
				return paragraphSerif[i];
			}
		default: 
	}
}


function convertWebFont() {
	var concat = '';
	for (var i=0; i < arguments.length; i++) {
		if (i == 0) {
			concat += arguments[i].replace(/\s/, '+');
		} else {
			concat = concat + '|' + arguments[i].replace(/\s/,'+');
		}
	}
	return concat;
}

function convertHex(num) {
	//num always <= 255;
	var dict = {10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F"}
	var f = Math.floor(num / 16);
	var r = num % 16;
	var a;
	var hex;

	if (f >= 16) {
		a = f % 16;
	} else if (f >= 10 && f <= 15) {
		a = dict[f];
	} else {
		a = f.toString();
	}

	if (r >= 16) {
		hex = '' + a + r % 16;
	} else if (r >= 10 && r <= 15) {
		hex = a + dict[r];
	} else {
		hex = a + r.toString();

	}
	return hex;
}

function concatHex(r, g, b) {
	return r+g+b;
}

function getColor(mood, shade) {
	var red;
	var blue;
	var green;
	if (mood == 'warm') {
		red = Math.floor((Math.random()*25)+230);
		if (shade == 'bright') {			
			green = Math.floor((Math.random()*255)+1);
			blue = 0;
		} else if (shade == 'dark') {
			green = Math.floor((Math.random()*170)+1);
			blue = Math.floor((Math.random()*45)+1);
		}
	} else if (mood == 'cool') {
		if (shade == 'bright') {
			red = Math.floor((Math.random()*120)+1);
			green = Math.floor((Math.random()*130)+150);
  			blue = Math.floor((Math.random()*225)+1);
		} else if (shade == 'dark') {
			red = 0;
			green = Math.floor((Math.random()*120)+1); 
			blue = Math.floor((Math.random()*125)+125);
		}
	}
	return concatHex(convertHex(red), convertHex(green), convertHex(blue));
}


function concatFonts(fonts) {
	var docHead = document.getElementsByTagName('head')[0].innerHTML;
	return "<link href='http://fonts.googleapis.com/css?family=" + fonts + "' rel='stylesheet' type='text/css'>";
	
}
function linkFonts(fonts) {
	var docHead = document.getElementsByTagName('head')[0].innerHTML;
	var webFontLink = concatFonts(fonts);
	docHead += webFontLink;
	document.getElementsByTagName('head')[0].innerHTML = docHead;
	return webFontLink;
}

function changeFonts() {
	h1font = arguments[0];
	h2font = arguments[1];
	pfont = arguments[2];

	var h1 = document.getElementById('header')
	var h2 = document.getElementById('subheader')
	var p = document.getElementById('paragraph')

	//change text of each
	h1.innerHTML = h1font;
	h2.innerHTML = h2font;

	h1.style.fontFamily = h1font;
	h2.style.fontFamily = h2font;
	p.style.fontFamily = pfont;

	document.getElementById('button1').style.fontFamily = pfont;
	document.getElementById('button2').style.fontFamily = pfont;
	document.getElementById('copy').style.fontFamily = pfont;

	//google web font link in <head>
	var fonts = convertWebFont(h1font, h2font, pfont);
	linkFonts(fonts);
}

window.onload = function() {

	var scheme = window.localStorage.getItem('id');
	var answers = scheme.split(',');
	var mood = answers[0];
	var shade = answers[1];
	var fontstyle = answers[2];

	var h1font = getFont('header', fontstyle);
	var h2font = getFont('subheader', fontstyle);
	var pfont = getFont('paragraph', fontstyle);

	changeFonts(h1font, h2font, pfont);

	var link = concatFonts(convertWebFont(h1font, h2font, pfont).toString());
	document.getElementById('text').innerHTML = link;

	var w = document.getElementById('wrapper');
	var color = "#" + getColor(mood, shade);

	document.getElementById('hex').innerHTML = color;
	document.getElementById('button1').style.backgroundColor = color;
	document.getElementById('button2').style.backgroundColor = color;
	document.body.style.background = color;
}
