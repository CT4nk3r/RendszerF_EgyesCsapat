export default (dateObject) => {
    const year = dateObject.getFullYear();
    const month = `${dateObject.getMonth() + 1}`.padStart(2, '0');
    const day = `${dateObject.getDate()}`.padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    const hours = `${dateObject.getHours()}`.padStart(2, '0');
    const minutes = `${dateObject.getMinutes()}`.padStart(2, '0');
    const seconds = `${dateObject.getSeconds()}`.padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;

    const dateAndTime = `${date} ${time}`
    return /NaN/g.test(dateAndTime) ? 'Invalid date' : dateAndTime;
};