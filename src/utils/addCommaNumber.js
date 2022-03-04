export default function addComma3Point(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}