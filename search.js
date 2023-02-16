const axios = require('axios');
const cheerio = require('cheerio');

const query = 'JavaScript';
const url = `https://www.google.com/search?q=${query}`;

const fetchHTML = async url => {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
  });
  return data;
};

const getSearchResults = async html => {
  const $ = cheerio.load(html);
  const searchResults = $('div.g');
  const results = [];
  searchResults.each((i, result) => {
    const linkElement = $(result).find('a');
    const title = linkElement.text();
    const url = linkElement.attr('href');
    if (title && url) {
      results.push({ title, url });
    }
  });
  return results;
};

const main = async () => {
  try {
    const html = await fetchHTML(url);
    const searchResults = await getSearchResults(html);
    console.log(`Top ${searchResults.length} results for "${query}":`);
    searchResults.forEach((result, i) => {
      console.log(`${i+1}. ${result.title} - ${result.url}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
