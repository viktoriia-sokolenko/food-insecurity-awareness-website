let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
    };
themeButton.addEventListener("click", toggleDarkMode);

let count = 3;

const addSignature = (person) => {
  let signatures = document.querySelector(".signatures");
  let checkbox = document.getElementById("checkbox");
  if (checkbox.checked){
    const newSignature = document.createElement("p");
    newSignature.textContent = ("🖊️ " + person.first_name + " from " + person.hometown +", " + person.state + " supports this cause.");
    signatures.appendChild(newSignature);
  }
  
  let counter = document.getElementById("counter");
  counter.remove();
  count = count + 1;
  counter = document.createElement("p");
  counter.id = "counter";
  counter.textContent = "🖊️ " + count + " people have signed this petition and support this cause."
  signatures.appendChild(counter);
}

const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    first_name: petitionInputs[0].value,
    last_name: petitionInputs[1].value,
    hometown: petitionInputs[2].value, 
    state: petitionInputs[3].value,
    email_: petitionInputs[4],
    email: petitionInputs[4].value,
    preference: petitionInputs[5].value,
  }
  // TODO: Loop through all inputs
  for (let i = 0; i < (petitionInputs.length - 1); i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }
    else {
      petitionInputs[i].classList.remove('error');
   }
  };
  if (!person.email.includes('.com') && !person.email.includes('.edu')) {
    containsErrors = true;
    person.email_.classList.add('error');
  } else {
      person.email_.classList.remove('error');
  }
  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < (petitionInputs.length - 1); i++) {
      petitionInputs[i].value = "";}
    containsErrors = false;
  }
}

let signNowButton = document.getElementById("sign-now-button");
signNowButton.addEventListener('click', validateForm);

let modal = document.getElementById("thanks-modal")
const toggleModal = (person) => {
  const IntervalId = setInterval(scaleImage, 500)
  let modalContent = document.getElementById("thanks-modal-content")
  modal.style.display = "flex"
  modalContent.textContent = `Thank you so much ${person.first_name} ${person.last_name}! ${person.hometown} represent! Your support means a lot to us and can help improve access to food in the US.`
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(IntervalId)
  }, 5000)
  
}

let scaleFactor = 1;
let modalImage = document.querySelector(".modal img");

const scaleImage = () => {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1
  modalImage.style.transform = `scale(${scaleFactor})`

}
let modalButton = document.getElementById("close-modal-button")
modalButton.addEventListener('click', ()=>{console.log("function called"); modal.style.display = "none"})

let animation = {
  revealDistance:150,
  initialOpacity:0,
  transitionDelay:0,
  transitionDuration:'2s',
  transitionProperty:"all",
  transitionTimingFunction:"ease",
}
let animation1 = {
  revealDistance:0,
  initialOpacity:0,
  transitionDuration:'2s',
  transitionProperty:"opacity",
  transitionTimingFunction:"ease",
}

let revealableContainers = document.querySelectorAll(".revealable, .revealable-shorter, .revealable-fade");

const reveal = () => {
  for (let i = 0; i < (revealableContainers.length); i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal)

let revealablerightContainers = document.querySelectorAll(".revealable-right");

const revealright = () => {
  for (let i = 0; i < (revealablerightContainers.length); i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealablerightContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealablerightContainers[i].classList.add("active-right");
    } else {
      revealablerightContainers[i].classList.remove("active-right");
    }
  }
}
window.addEventListener("scroll", revealright)
let revealableleftContainers = document.querySelectorAll(".revealable-left");

const revealleft = () => {
  for (let i = 0; i < (revealableleftContainers.length); i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableleftContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableleftContainers[i].classList.add("active-left");
    } else {
      revealableleftContainers[i].classList.remove("active-left");
    }
  }
}
window.addEventListener("scroll", revealleft)
const combinedContainers = [...revealableContainers, ...revealableleftContainers,...revealablerightContainers]
const reduceMotion = () =>{
  for (let i = 0; i < (combinedContainers.length); i++) {
    combinedContainers[i].style.transitionProperty = animation1.transitionProperty;
    combinedContainers[i].style.transform = 'none';
  }
}

let motionButton = document.getElementById("motion-button");
motionButton.addEventListener("click", reduceMotion)