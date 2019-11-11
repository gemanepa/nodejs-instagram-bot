export default function consoleMessage(type, message){
  let date = new Date();
  let hour = date.getHours();
  let mins = date.getMinutes();
  let string = `${hour}:${mins} | ${message}`
  type === 'log' ? console.log(string) : console.error(string)
}