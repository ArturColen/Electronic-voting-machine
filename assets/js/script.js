// Manipulate the elements of the screen
let yourVoteFor = document.querySelector('#vote span');
let position = document.querySelector('#position span');
let description = document.querySelector('#data');
let instructions = document.querySelector('#instructions');
let images = document.querySelector('#images');
let numbers = document.querySelector('#numbers');

// Initial data
let currentStep = 0;
let number = '';
let blankVote = false;
let = votes = [];

// Start an empty voting screen
function startStep() {
    let step = steps[currentStep];
    let numberHTML = '';
    number = '';
    blankVote = false;

    for (let i = 0; i < step.numbers; i++) {
        if (i === 0) {
            numberHTML += '<div class="number blink"></div>';
        }
        else {
            numberHTML += '<div class="number"></div>';
        }
    }

    yourVoteFor.style.display = 'none';
    position.innerHTML = step.title;
    description.innerHTML = '';
    instructions.style.display = 'none';
    images.innerHTML = '';
    numbers.innerHTML = numberHTML;
}

// Refresh the screen with the applicant's data after you have entered the number
function updateInterface() {
    let step = steps[currentStep];
    let candidate = step.candidates.filter((item) => {
        if (item.number === number) {
            return true;
        }
        else {
            return false;
        }
    });

    if (candidate.length > 0) {
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        if (candidate.vice !== undefined) {
            description.innerHTML = `Nome: ${candidate.name} <br> Partido: ${candidate.party} <br> Vice: ${candidate.vice}`;
        }
        else {
            description.innerHTML = `Nome: ${candidate.name} <br> Partido: ${candidate.party}`;
        }

        let photosHTML = '';
        for (let i in candidate.photos) {
            if (candidate.photos[i].small) {
                photosHTML += `<div class="image small"> <img src="./assets/images/${candidate.photos[i].url}">${candidate.photos[i].caption} </div>`;
            }
            else {
                photosHTML += `<div class="image"> <img src="./assets/images/${candidate.photos[i].url}">${candidate.photos[i].caption} </div>`;
            }
        }

        images.innerHTML = photosHTML;
    }
    else {
        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        description.innerHTML = '<div class="warning-big blink" id="space">VOTO NULO</div>';
    }
}


// Enter the numbers and display them on the screen
function clicked(n) {
    let element = document.querySelector('.number.blink');

    if (element !== null) {
        element.innerHTML = n;
        number = `${number}${n}`;

        element.classList.remove('blink');
        if (element.nextElementSibling !== null) {
            element.nextElementSibling.classList.add('blink');
        }
        else {
            updateInterface();
        }
    }
}

// Show the blank vote
function blank() {
    number = '';
    blankVote = true;
    yourVoteFor.style.display = 'block';
    instructions.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="warning-big blink">VOTO EM BRANCO</div>';
    images.innerHTML = '';
}

// Restart the voting screen
function correct() {
    startStep();
}

// Confirm the vote and move on to the next step
function confirm() {
    let step = steps[currentStep];
    let confirmedVote = false;

    if (blankVote === true) {
        confirmedVote = true;
        votes.push({
            step: steps[currentStep].title,
            vote: 'Branco'
        });
    }
    else if (number.length === step.numbers) {
        confirmedVote = true;
        votes.push({
            step: steps[currentStep].title,
            vote: number
        });
    }

    if (confirmedVote) {
        currentStep++;
        if (steps[currentStep] !== undefined) {
            startStep();
        }
        else {
            document.querySelector('#screen').innerHTML = '<div id="warning-giant" class="blink">FIM</div>';
            console.log(votes);
        }
    }
}

startStep();