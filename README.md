API Project: Image Search Abstraction Layer
===========================================

### User stories:
  1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
  2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
  3. I can get a list of the most recently submitted search strings.

### Example usage
`https://equable-summer.glitch.me/api/imagesearch/lolcats%20funny?offset=0`<br>
`https://equable-summer.glitch.me/api/latest/imagesearch/`

### Example outputs

```
[
  {
    "url": "https://i.ytimg.com/vi/r_o3q7zc21Y/hqdefault.jpg",
    "snippet": "LOLCats - Funniest cat pictures for Android - YouTube",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtxCOQ1jMfrfEDBrBAkpR7Ifk1glwYlUgctm05hmgT1V_0LjTr3WX00tjE",
    "context": "https://www.youtube.com/watch?v=r_o3q7zc21Y"
  },
  {
    "url": "https://llwproductions.files.wordpress.com/2012/05/funny-cat-pictures-with-caption-lolcats-one-dumbazh-away.jpg",
    "snippet": "This is Motley News' 1,000th Post! Time to Celebrate with Funnies ...",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvgMU-uS_Czv-Gw7eHFYf2Ue6wMoNX00AImn8Ljk0ZHKzjG7_us5FCG6K5",
    "context": "https://motleynews.net/2012/05/01/this-is-motley-news-1000th-post-time-to-celebrate-with-funnies/"
  },
  ...
]
```

```
[
  {
    "term": "lolcats funny",
    "when": "2017-06-21T17:43:27.219Z"
  },
  {
    "term": "grumpycats",
    "when": "2017-06-21T17:43:24.895Z"
  },
  ...
]
```
