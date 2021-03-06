export function generateRandomNumber(upperBound, prevNum = -1) {
    const randNum = parseInt(Math.random() * upperBound);
    if(upperBound <= 1) return 0;
    return (randNum !== prevNum) ? randNum : generateRandomNumber(upperBound, prevNum);
}