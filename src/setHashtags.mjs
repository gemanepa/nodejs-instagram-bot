
const hashtags = {
    "standard": [
      "love", "instagood", "me", "photooftheday", "instamood", "instadaily", "summer", "smile", "pretty", "food",
      "funny", "beach", "bored", "life", "cool", "selfie", "sunset", "family", "followback", "like4like", "likeforlike"
    ],
    "coding": [
      "programming", "code", "coding", "programminglanguage", "instaprogramming",
      "instacoding", "python", "java", "javascript", "html"
    ],
    "anime": [
      "anime", "animefunny", "animefunnymemes", "animefunnymoments", "animefunnypic", "animeromance", "animemoments", 
      "anime4life", "iloveanime", "animeforlife", "animeislife", "animefun", "animelove", "animeislife", "animeforever",
      "iloveanime", "shingeki", "shingekinokyojin", "heavensfeel", "fatezero", "fatestaynight", "unlimitedbladeworks",
      "swordartonline", "kirito"
    ],
    "tv": [
      "gameofthrones", "supernaturaltv", "frontier", "casadepapel", "lacasadepapel", "netflix"
    ],
    "travel": [
      "travelers", "travelbug", "traveling", "travelholic", "travelgram", "travelinggram", "travelphotography",
      "exploring", "explorer", "wanderer", "wanderlust", "doyoutravel", "goexplore", "travelmore", "lovetotravel",
      "wonderfulplaces", "roamtheplanet", "travellifestyle", "winter", "autumn", "otoño", "invierno", "outono",
      "inverno", "autunno", "automne", "mountain", "montaña", "lago", "lake"
    ]
  }

export default function setHashtags() {
    return process.env.HASHTAGS
    ? process.env.HASHTAGS.replace(/"|'|\[|\]| /ig,'').split(',')
    : hashtags.standard
}


