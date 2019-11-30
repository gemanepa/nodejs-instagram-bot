import hashtags from '../settings/defaultHashtags.json'
import shuffle from '../utils/shuffle.mjs';

export default function setHashtags() {
    try {
        return process.env.HASHTAGS
        ? shuffle(process.env.HASHTAGS.replace(/"|'|\[|\]| /ig,'').split(','))
        : shuffle(hashtags.coding)
    } catch(e) {
        console.error(error)
        consoleMessage('error', 'setHashtags function Failure')
        process.exit()
    }
}


