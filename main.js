//samples 

var cards = [{ name: "A", type: "Dragon", cost: 15, attack: 30, defence: 5, speed: 15 },
{ name: "B", type: "Human", cost: 5, attack: 10, defence: 15, speed: 15 },
	{ name: "C", type: "Elf", cost: 10, attack: 10, defence: 5, speed: 20 }];

var deck = [{ name: "D", type: "Dragon", cost: 10, attack: 20, defence: 5, speed: 15 },
{ name: "E", type: "Elf", cost: 10, attack: 15, defence: 5, speed: 25 },
{ name: "F", type: "Human", cost: 5, attack: 15, defence: 10, speed: 15 }];
//max number of cards in deck
var limit = 30;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text/plain", ev.target.name);

}

function drop(ev) {
  ev.preventDefault();
	var data = ev.dataTransfer.getData("text/plain");
	//get moved card - name is shared in drag function
	for (var i = 0; i < cards.length; i++){
		
		if (cards[i]["name"] == data) {
			//move card to deck
			deck.push(cards[i]);
			cards = cards.filter(function (item) {
				return item !== cards[i];
			});
			
			break;
		}
		
	}

	console.log(deck);
	renderDeck();
	renderCards();
	
}

function renderCards()
{
	//cards available to add
	document.getElementById('cards').innerHTML = '';
	for(var i = 0; i < cards.length; i++)
	{
		//set up areas in card
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		var attack = document.createElement("div");
		//put class names
		card.className = "card";
		//set name to pick up on event handler
		card.name=cards[i].name;
		//set as draggable
		card.draggable = "true"
		//add draggable
		card.setAttribute('ondragstart', 'drag(event)');
		name.className = "name";
		type.className = "type" + cards[i].type;
		attack.className = "attack";
		///put in text
		name.innerHTML = cards[i].name;
		attack.innerHTML = cards[i].attack;
		//add to card
		card.appendChild(name);
		card.appendChild(type);
		card.appendChild(attack);
		card.classList.add("draggable")

		document.getElementById("cards").appendChild(card);
	}
}
function shuffle()
{
	// for limit turns
	// switch the values of two random cards
	for (var i = 0; i < limit; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

	renderDeck();
}

function renderDeck() {
//cards selected
	document.getElementById('deck').innerHTML = '';
	for (var i = 0; i < deck.length; i++) {
		//card divs
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		var attack = document.createElement("div");
		//className divs
		card.className = "card";
		name.className = "name";
		type.className = "type" + deck[i].type;
		attack.className = "attack";
		//text in divs
		attack.innerHTML = deck[i].attack;
		name.innerHTML = deck[i].name;
		//add to card
		card.appendChild(name);
		card.appendChild(type);
		card.appendChild(attack);

		document.getElementById("deck").appendChild(card);
	}
	//add others as empty for drop target

	for (var i = 0; i < limit - deck.length; i++) {
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		var attack = document.createElement("div");
		card.className = "card";
		name.className = "name";
		type.className = "typeUnknown";
		attack.className = "attack";
		card.appendChild(attack);
		card.setAttribute('ondrop', 'drop(event)');
		card.setAttribute('ondragover', 'allowDrop(event)');
		name.innerHTML = "Unknown";
		card.appendChild(name);
		card.appendChild(type);
		card.appendChild(attack);
		card.classList.add("draggable")

		document.getElementById("deck").appendChild(card);
	}
}

function load()
{
	//set up scene
	shuffle();
	renderCards();
	renderDeck();

}

window.onload = load;
