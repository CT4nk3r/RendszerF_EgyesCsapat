export default (length, onlyLettersAndNumbers = false) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
    let result = '';

    if(onlyLettersAndNumbers)
        for(let i = 0; i < length; i++) {
            let char = characters[Math.floor(Math.random() * 36)];
            result += Math.random() < 0.5 ? char : char.toLowerCase();
        }
    else
        for(let i = 0; i < length; i++) {
            let char = characters[Math.floor(Math.random() * characters.length)];
            result += Math.random() < 0.5 ? char : char.toLowerCase();
        }

    return result;
}