import hashtags from '../settings/defaultHashtags.json'
import shuffle from '../utils/shuffle.mjs';

export default function setHashtags() {
    return process.env.HASHTAGS
    ? shuffle(process.env.HASHTAGS.replace(/"|'|\[|\]| /ig,'').split(','))
    : shuffle(hashtags.standard)
}


