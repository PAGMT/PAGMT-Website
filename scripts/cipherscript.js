window.addEventListener("load", () => {
    const ciphers = document.querySelectorAll(".cipher");
    const solveMilliseconds = 2000;
    const characterSelectionMilliseconds = 50;
    const delayMilliseconds = 0;
    const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^"];

    const randomArrayElement = (arr) => {
        return arr[(arr.length * Math.random()) | 0];
    };

    ciphers.forEach((element) => {
        element.addEventListener("load", (e) => {
            const element = e.target;
            scrambleText(element);
            e.preventDefault();
        });
        scrambleText(element);
    })

    function scrambleText(element) {
        if (element.classList.contains("active") === false) {
            let delay = 0;
            const elementText = element.textContent;
            const elementCharacters = [...elementText];
            const lockMilliseconds = delayMilliseconds * elementCharacters.length + solveMilliseconds;

            element.classList.add("active");

            setTimeout(() => {
                element.classList.remove("active");
            }, lockMilliseconds);

            elementCharacters.forEach((character, index) => {
                setTimeout(() => {
                    let intervalId = setInterval(() => {
                        const randomCharacter = randomArrayElement(characters);
                        element.textContent = replaceCharacter(element.textContent, index, randomCharacter);

                        setTimeout(() => {
                            clearInterval(intervalId);
                            element.textContent = replaceCharacter(element.textContent, index, elementCharacters[index]);
                        }, solveMilliseconds);
                    }, characterSelectionMilliseconds);
                }, delay === 0 ? (delay += 1) : (delay += delayMilliseconds));
            });
        }
    }

    function replaceCharacter(str, index, chr) {
        return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
    }
});
