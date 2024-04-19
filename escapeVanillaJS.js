document.addEventListener('DOMContentLoaded', () => {
    // Click event listener: fetches books array of objects from books.json, calls findMostRecentBook() and displays it.
    document.getElementById('solveRoom1').addEventListener('click', () => {
        fetch('books.json')
            .then((response) => response.json())
            .then((books) => {
                const mostRecentBook = findMostRecentBook(books);

                document.getElementById(
                    'room1Result'
                ).textContent = `The key to the next room is: ${mostRecentBook.title}`;
            })
            .catch((err) => {
                alert(`Error: ${err.message}`);
                console.log(err);
            });
    });

    // Click event listener: declares jsConcepts and reactConcepts, calls findIntersection() and displays it.
    document.getElementById('solveRoom2').addEventListener('click', () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']);
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);

        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById('room2Result').textContent = `The code to unlock the door is: ${Array.from(
            commonConcepts
        ).join(', ')}`;
    });

    // Click event listener with asynchronous function: fetches an array of objects from directions.json, calls navigateLabyrinth() and displays the message returned.
    document.getElementById('solveRoom3').addEventListener('click', async () => {
        try {
            const response = await fetch('directions.json');
            const directions = await response.json();
            const message = await navigateLabyrinth(directions);

            document.getElementById('room3Result').textContent = message;
        } catch (err) {
            alert(`Error: ${err.message}`);
            console.log(err);
        }
    });
});

//Function compares and finds most recently published book
function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => {
        return new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent;
    });
}

//Function compares two arrays of data and returns an array of common values.
function findIntersection(setA, setB) {
    const intersection = new Set([...setA].filter((concept) => setB.has(concept)));
    return intersection;
}

//Asynchronous function which loops through an array, logs the values in the console and then returns a message.
async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        // 🪲 Bug: No delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
