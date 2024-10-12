// handle bubbles
const bubbleTemplate = document.getElementById('template__bubble');
const container = document.querySelector('.container');

// bubble counter
let bubbleCount = 1;
let poppedCount = 0;

const containerCounter = document.createElement('div');
containerCounter.classList.add('container__counter');

const bubbleCounter = document.createElement('p');
bubbleCounter.id = 'bubbleCounter';
bubbleCounter.classList.add('counter');
const scoreCounter = document.createElement('p');
scoreCounter.id = 'scoreCounter';
scoreCounter.classList.add('counter');

bubbleCounter.textContent = `Bubbles: ${bubbleCount}`;
scoreCounter.textContent = `Score: ${poppedCount}`;

containerCounter.append(bubbleCounter, scoreCounter);
container.append(containerCounter);

// create initial bubble
createBubble();

container.addEventListener('click', handleClick);

function handleClick(ev) {
	const target = ev.target;

	const parentButton = target.closest('#create__bubble');
	const parentBubble = target.closest('.container__bubble');

	if (parentButton) {
		handleCounters('bubble');
		createBubble();
	} else if (parentBubble) {
		handleCounters('popped');
		parentBubble.remove();
	}
}


function handleCounters(type) {
	if (type === 'bubble') {
		bubbleCount++;
	} else {
		bubbleCount--;
		poppedCount++;
	}
	bubbleCounter.textContent = `Bubbles: ${bubbleCount}`;
	scoreCounter.textContent = `Score: ${poppedCount}`;
}

function createBubble() {
	// Clone the bubble template content
	const bubbleClone = bubbleTemplate.content.cloneNode(true);

	// Find the newly created bubble container element
	const newBubbleContainer = bubbleClone.querySelector('.container__bubble');
	const bubbleWrapper = bubbleClone.querySelector('.bubble__wrapper');
	const newBubble = bubbleClone.querySelector('.bubble');

	// Generate a random starting position (left) between 15vw and 85vw
	const max = 85;
	const min = 15;
	const range = max - min;
	const randomLeftPosition = Math.random() * (range + 1) + min;
	newBubbleContainer.style.left = `${randomLeftPosition}vw`;

	// Generate a random scale factor between 0.5 and 1.5
	const randomScale = Math.random() * 1 + 0.5; // Scale between 0.5 and 1.5
	bubbleWrapper.style.transform = `scale(${randomScale})`;

	// Randomize floatUp duration between 5s and 12s
	const floatUpDuration = Math.random() * 7 + 5;
	newBubbleContainer.style.animationDuration = `${floatUpDuration}s`;

	// Randomize sway duration between 2s and 4s
	const swayDuration = Math.random() * 2 + 2;
	// Randomize sway amount between -5vw and 5vw
	let swayDistanceStart = Math.floor(Math.random() * 5) + 1;
	let swayDistanceEnd = swayDistanceStart * -1;

	// randomize starting direction
	if (Math.random() > 0.5) {
		[swayDistanceStart, swayDistanceEnd] = [swayDistanceEnd, swayDistanceStart];
	}

	newBubble.style.animation = `sway ${swayDuration}s ease-in-out infinite alternate`;
	newBubble.style.setProperty('--swayStart', `${swayDistanceStart}vw`);
	newBubble.style.setProperty('--swayEnd', `${swayDistanceEnd}vw`);

	// Randomize z-index value from 0 to 5
	const zIndex = Math.floor(Math.random() * 6);
	newBubble.style.zIndex = zIndex;

	// Add an event listener for when the animation ends
	newBubbleContainer.addEventListener('animationend', () => {
		newBubbleContainer.remove();
		createBubble();
	});

	// Append the cloned bubble to the container
	container.appendChild(bubbleClone);
}

// handle button
const btnAnimated = document.querySelector('.btn--animated');
const clickMeSvg = document.getElementById('clickme');
const bubbleMeSvg = document.getElementById('bubbleme');

// Add event listeners for hover to toggle the active class
btnAnimated.addEventListener('mouseenter', () => {
	clickMeSvg.classList.remove('active'); 
	bubbleMeSvg.classList.add('active'); 
});

btnAnimated.addEventListener('mouseleave', () => {
	bubbleMeSvg.classList.remove('active'); 
	clickMeSvg.classList.add('active'); 
});
