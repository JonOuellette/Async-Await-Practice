const baseURL = 'https://deckofcardsapi.com/api/deck';

//1.
async function oneCard() {
    let res = await axios.get(`${baseURL}/new/draw`)
    let {suit, value} = res.data.cards[0]
    console.log(`${value} of ${suit}`)
}
oneCard();

//2. 
async function redraw() {
    let firstCard = await axios.get(`${baseURL}/new/draw`);
    let deckId = firstCard.data.deck_id;
    let secondCard = await axios.get(`${baseURL}/${deckId}/draw`);
    [firstCard, secondCard].forEach(card => {
        let {suit, value} = card.data.cards[0];
        console.log(`${value} of ${suit}`)
    })
}

redraw()

//3.
async function pickACard() {
    let btn = document.querySelector('button');
    let cardArea = document.getElementById('card-area');

    let res = await axios.get(`${baseURL}/new/shuffle`);
    let deckData = res.data;

    btn.style.display = 'block'
    btn.addEventListener('click', async function() {
        const cardResponse = await axios.get(`${baseURL}/${deckData.deck_id}/draw/`);
        const cardData = cardResponse.data;
        const cardSrc = cardData.cards[0].image;

        const angle = Math.random() * 90 - 45;
        const randomX = Math.random() * 40 - 20;
        const randomY = Math.random() * 40 - 20;

        const img = document.createElement('img');
        img.src = cardSrc;
        img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;

cardArea.appendChild(img);


        if (cardData.remaining === 0) btn.remove();
    });
}

pickACard();

