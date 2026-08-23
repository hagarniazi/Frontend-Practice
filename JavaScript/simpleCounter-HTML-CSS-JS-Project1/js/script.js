const count = document.getElementById("count")

const decrease = document.getElementById("decrease")

const reset = document.getElementById("reset")

const increase = document.getElementById("increase")

let counter = 0;
function updateButton() {
    if  (counter === 0) {
        decrease.disabled = true;
    } else {
        decrease.disabled = false;
    }
}

updateButton();

increase.addEventListener("click", function(){
    counter++;
    count.textContent = counter;
    count.classList.add("positive");
    updateButton();
});

decrease.addEventListener("click", function(){
    if (counter > 0) {
        counter--;
        count.textContent = counter;
        updateButton();
    }
});

reset.addEventListener("click", function(){
    counter = 0;
    count.textContent = counter;
    count.classList.remove("positive");
    updateButton();
});





