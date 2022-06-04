//samples 

var cards = [{ name: "A", type: "dragon", energy: 15, power: 30, toughness: 5, speed: 15 },
{ name: "B", type: "human", energy: 5, power: 10, toughness: 15, speed: 15 },
	{ name: "C", type: "elf", energy: 10, power: 10, toughness: 5, speed: 20 }];

var deck = [{ name: "D", type: "dragon", energy: 10, power: 20, toughness: 5, speed: 15 },
{ name: "E", type: "elf", energy: 10, power: 15, toughness: 5, speed: 25 },
{ name: "F", type: "human", energy: 5, power: 15, toughness: 10, speed: 15 }];
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
			cards.splice(i, 1);
			//display on left
			renderCards("display", cards[i]);
			break;
		}
		
	}

	/*renderCards("deck",deck);
	renderCards("cards", cards);*/
	
	
	
}

function renderCards(id, stackCards)
{
	
	//cards available to add are StackCards

	var segment = document.getElementById(id)
	segment.innerHTML = '';
	
	for (var i = 0; i < stackCards.length; i++) {
		//set up areas in card
		
		var card = document.createElement("div");
		var gridTop = document.createElement("div");
		var name = document.createElement("div");
		var energy = document.createElement("div");
		var type = document.createElement("div");
		var gridBottom = document.createElement("div");
		var power = document.createElement("div");
		var toughness = document.createElement("div");
		var speed = document.createElement("div");
		//put class names
		card.className = "card";
		//set name to pick up on event handler
		card.name = stackCards[i].name;
		//set as draggable
		card.draggable = "true";
		//add draggable
		card.setAttribute('ondragstart', 'drag(event)');
		gridTop.className = "grid-container";
		energy.className = "grid-child energy";
		name.className = "grid-child name";
		type.className = "type"
		type.id=stackCards[i].type;
		gridBottom.className = "grid-container2";
		power.className = "grid-child power";
		toughness.className = "grid-child toughness";
		speed.className = "grid-child speed";
		///put in text
		energy.innerHTML = stackCards[i].energy;
		name.innerHTML = stackCards[i].name;
		power.innerHTML = stackCards[i].power;
		toughness.innerHTML = stackCards[i].toughness;
		//FIXME not showing
		speed.innerHTML == stackCards[i].speed;
		//console.log(speed,stackCards[i].speed);
		//add to card
		gridTop.appendChild(name);
		gridTop.appendChild(energy);
		
		card.appendChild(gridTop);
		card.appendChild(type);
		
		gridBottom.appendChild(power);
		gridBottom.appendChild(toughness);
		gridBottom.appendChild(speed);
		card.appendChild(gridBottom);
		segment.appendChild(card);
		
		if (id == "cards") card.classList.add("draggable")
	}
		if (id == "deck"){
			for (var i = 0; i < limit - stackCards.length; i++) {
				var card = document.createElement("div");
				var energy = document.createElement("div");
				var name = document.createElement("div");
				var type = document.createElement("div");
				var power = document.createElement("div");
				var toughness = document.createElement("div");
				var speed = document.createElement("div");
				card.className = "card";
				name.className = "name";
				type.className = "unknown";
				energy.className = "energy";
				power.className = "power";
				toughness.className = "toughness";
				speed.className = "speed";
				
				card.setAttribute('ondrop', 'drop(event)');
				card.setAttribute('ondragover', 'allowDrop(event)');
				

				name.innerHTML = "";
				
				
				card.appendChild(name);
				segment.appendChild(card);
				
			}
			
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

	//renderCards("deck",deck);
}

function load()
{
	//set up scene
	
	renderCards("display", [cards[0]]);
	renderCards("cards", cards);
	shuffle();
	renderCards("deck", deck);
	//display default 
   

}

window.onload = load;
