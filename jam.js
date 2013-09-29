
//FONTS
var sansSerif = ['PT Sans', 'Ubuntu', 'Open Sans'];
var serif = ['Playfair Display', 'Bitter', 'Kreon'];
var script = new Array();





function getFont(type) {
	var i;
	var font;
	switch (type) {
		case 'friendly':
			i = Math.floor(Math.random()*sansSerif.length);
			return sansSerif[i];
		case 'sansSerif':
			i = Math.floor(Math.random()*sansSerif.length);
			return sansSerif[i];
		case 'serif':
			i = Math.floor(Math.random()*serif.length);
			return serif[i];
		case 'script':
			i = Math.floor(Math.random()*script.length);
			return script[i];
		default: 
	}
}


function convertWebFont() {
	var concat = '';
	for (var i=0; i < arguments.length; i++) {
		if (i == 0) {
			concat += arguments[i];
		} else {
			concat = concat + '|' + arguments[i];
		}
	}
	return concat;
}

//var color = Math.floor(Math.random()*16777215).toString(16);

function convertHex(num) {
	//num always <= 255;
	var dict = {10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F"}
	var f = Math.floor(num / 16);
	var r = num % 16;
	var a;
	var hex;

	if (f >= 10) {
		a = dict[f];
	} else {
		a = Integer.toString(f);
	}

	if (r >= 10) {
		hex = a + dict[r];
	} else {
		hex = a + Integer.toString(r);
	}

	return hex;
}

function concatHex(r, g, b) {
	return r+g+b;
}

function darker(c) {
	var hex;
	var random = Math.floor((Math.random()*255)+127);
	switch (c) {
		case 'red': return concatHex(random, 0, 0);
		case 'green': return concatHex(0, random, 0);
		case 'blue': return concatHex(0, 0, random);
		default: return concatHex(random, random, random);
			//should never fall to here
	}
}

/*
function mainColor(String s)
	String mainHex = darker(s);
	if (RED) {
		var red = Math.floor((Math.random()*255)+);
		var blue = Math.floor((Math.random()*255)+1);
		var green = Math.floor((Math.random()*255)+1);
	}

	} else if (BLUE) {
		if (darker blue) {
			hex = concatHex(0, 0, ));
		}

	} else if (GREEN) {
		if 
	}
}*/

function linkFonts(fonts) {
	var docHead = document.getElementsByTagName('head')[0].innerHTML;
	var webFontLink = "<link href='http://fonts.googleapis.com/css?family=" + fonts + " rel='stylesheet' type='text/css'>";
	docHead += webFontLink;
	console.log(docHead);
	document.getElementsByTagName('head')[0].innerHTML = docHead;
}

function changeFonts() {
	h1font = arguments[0];
	h2font = arguments[1];
	pfont = arguments[2];

	var h1 = document.getElementById('header')
	var h2 = document.getElementById('subheader')
	var p = document.getElementById('text')

	//change text of each
	h1.innerHTML = h1font;
	h2.innerHTML = h2font;
	/*p.innerHTML = pfont;*/

	h1.style.fontFamily = h1font;
	h2.style.fontFamily = h2font;
	p.style.fontFamily = pfont;

	//google web font link in <head>
	var fonts = convertWebFont(h1font.replace(/\s/,'+'), h2font.replace(/\s/, '+'), pfont.replace(/\s/, '+'));
	linkFonts(fonts);
}

window.onload = function() {
	var w = document.getElementById("wrapper");
	var color = Math.floor(Math.random()*16777215).toString(16);
	document.body.style.background = "#" + color;

	console.log(color);
	//w.style.backgroundColor = "#"+color;

	var h1font = getFont('sansSerif');
	var h2font = getFont('serif');
	var pfont = getFont('sansSerif');

	changeFonts(h1font, h2font, pfont);
}
