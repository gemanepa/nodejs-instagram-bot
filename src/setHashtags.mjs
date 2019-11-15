import hashtags from '../settings/defaultHashtags.json'

export default function setHashtags() {
    return process.env.HASHTAGS
    ? process.env.HASHTAGS.replace(/"|'|\[|\]| /ig,'').split(',')
    : hashtags.standard
}


