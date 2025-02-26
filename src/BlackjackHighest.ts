const cardToValue: Record<string, number> = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 10,
    queen: 10,
    king: 10,
    ace: 1, // initial asumption
}

const cardToOrderImportance: Record<string, number> = { jack: 1, queen: 2, king: 3 }

export function blackjackHighest(dealedCards: string[]) {
    let total = 0
    let hasAce = false
    let highestCard = ''
    let highestValue = 0
    let highestFaceCard = ''

    dealedCards.forEach(currentCard => {
        const value = cardToValue[currentCard]
        total += value
        if (currentCard === 'ace') {
            hasAce = true
        }

        if (value > highestValue) {
            highestValue = value
            highestCard = currentCard
        }

        if (value === 10 && cardToOrderImportance[currentCard] !== undefined) {
            if (!highestFaceCard || cardToOrderImportance[currentCard] > cardToOrderImportance[highestFaceCard]) {
                highestFaceCard = currentCard
            }
        }
    })

    if (hasAce && total + 10 <= 21) {
        total += 10
        highestFaceCard = 'ace'
    }

    if (highestFaceCard) {
        highestCard = highestFaceCard
    }

    if (total === 21) return `blackjack ${highestCard}`
    if (total > 21) return `above ${highestCard}`
    return `below ${highestCard}`
}
