function breakTheText() {
    var h1 = document.querySelector("#loader h1");
    //textContent used for print text content//
    var h1Text = h1.textContent;

    var splittedText = h1Text.split("");
    var halfValue = splittedText.length / 2;
    //.split used for sperating items//

    var clutter = "";
    splittedText.forEach(function (elem, idx) {
        if (idx < halfValue) {
            clutter += `<span class="a" >${elem}</span>`;
        } else {
            clutter += `<span class="b">${elem}</span>`;
        }

    })

    h1.innerHTML = clutter;

}
breakTheText()


gsap.from(".a", {
    y: 50,
    opacity: 0,
    duration: 0.6,
    delay: 0.5,
    stagger: 0.15
})

gsap.from(".b", {
    y: 50,
    opacity: 0,
    duration: 0.6,
    delay: 0.5,
    stagger: -0.15
})
gsap.to("#loader", {
    y: -1000,
    duration: 2,
    delay:2
})
