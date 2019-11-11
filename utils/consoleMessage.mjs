/* consoleMessage: Logs with date the stuff that's happening 
@param type: string, should be 'log' or 'error'
@param message: string to log
*/
export default function consoleMessage(type, message){
  const date = new Date();
  const hour = date.getHours();
  const mins = date.getMinutes();
  const string = `${hour}:${mins} | ${message}`
  type === 'log' ? console.log(string) : console.error(string)
}