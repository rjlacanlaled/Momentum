export function generateRandomNumber(upperBound, prevNum = -1) {
    const randNum = parseInt(Math.random() * upperBound);
    return (randNum !== prevNum) ? randNum : generateRandomNumber(upperBound, prevNum);
}