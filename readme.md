# Setup
1. Get API key from [Google News API](https://newsapi.org) and save it at `api-key.json`
2. Using Node 6.10.3

# Roadmap

## AWS
1. Lambda that makes requests every 30 minutes (96 requests per day currently)
2. Saves to multiple S3 files
    1. 30 min file
    2. 24 hour file
    3. 7 day file
    4. 30 day file
    5. Source file named by month
3. Every lambda should rewrite a stats file
    1. Version these?
4. Lambda should use Python
    1. Better than Node for IO
    2. Easy JSON parsing and iteration

## Stats
1. [X] Word frequency
2. [X] Phrase frequency 1 through 5 - e.g. "flynn" to "michael flynn pleads guilty to"

## Front End Infrastructure
1. React/Redux
2. S3/CloudFront with CLI deploy (or Travis)

## Front End Features
1. All vs. a tag or a source
2. Stream with titles and links
3. Percentage of tags that have that word
4. Slider for 30 min, day, week, month

## Future
1. Influential twitter accounts (e.g. @SeanHannity)
2. Facebook pages
3. More right-leaning sources
