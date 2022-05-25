var cards = [{ name: "A", type: "Dragon", Cost: 15, Attack: 30, Defence: 5, Speed: 15 },
{ name: "B", type: "Human", Cost: 5, Attack: 10, Defence: 15, Speed: 15 },
	{ name: "C", type: "Elf", Cost: 10, Attack: 10, Defence: 5, Speed: 20 }];

var deck = [{ name: "D", type: "Dragon", Cost: 10, Attack: 20, Defence: 5, Speed: 15 },
{ name: "E", type: "Elf", Cost: 10, Attack: 15, Defence: 5, Speed: 25 },
{ name: "F", type: "Human", Cost: 5, Attack: 15, Defence: 10, Speed: 15 }];
var limit = 30;

cardsLink = document.getElementsByClassName("card");
for (var i = 0; i< cardsLink.length; i++){
	dragElement(cardsLink[i]);
}


function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById("name")) {
		// if present, the header is where you move the DIV from:
		document.getElementById("name").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function renderCards()
{
	document.getElementById('cards').innerHTML = '';
	for(var i = 0; i < cards.length; i++)
	{
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		card.className = "card";
		name.className = "name";
		type.className = "type" + cards[i].type;

		name.innerHTML = cards[i].name;
		card.appendChild(name);
		card.appendChild(type);
		card.classList.add("draggable")

		document.getElementById("cards").appendChild(card);
	}
}
function shuffle()
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 30; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

	renderDeck();
}

function renderDeck()
{
	document.getElementById('deck').innerHTML = '';
	for(var i = 0; i < deck.length; i++)
	{
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		card.className = "card";
		name.className = "name";
		type.className = "type" + deck[i].type;

		name.innerHTML = deck[i].name;
		card.appendChild(name);
		card.appendChild(type);
		card.classList.add("draggable")

		document.getElementById("deck").appendChild(card);
	}
}


function load()
{
	
	shuffle();
	renderCards();
	renderDeck();
}

window.onload = load;
