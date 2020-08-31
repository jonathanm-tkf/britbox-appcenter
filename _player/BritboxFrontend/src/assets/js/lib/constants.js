module.exports = {
  environment: 'uat',
  development: {
    cloudfront: 'https://d2rqdg7nynl3m1.cloudfront.net/',
    cloudfrontStatic: 'assets/',
    catalogue: 'http://localhost:3000/genre',
    quickSearch: 'http://localhost:3000/quick-search',
    search: 'http://localhost:3000/search',
    apiContent: 'https://staging-api.britbox.takeoffmedia.com',
    account: '/api/account/',
    mediaSelectorHost: 'https://open.live.bbc.co.uk',
    useBBCCustomID: true,
    chromecastID: 'A619221B'
  },
  staging: {
    cloudfront: 'https://d2rqdg7nynl3m1.cloudfront.net/',
    cloudfrontStatic: '/Content/',
    catalogue: '',
    quickSearch: '',
    search:
      'https://staging-api.britbox.takeoffmedia.com/v1/search?device=web_browser&maxresults=6&segments=US&sub=Subscriber&useCustomId=true',
    apiContent: 'https://staging-api.britbox.takeoffmedia.com',
    account: '/api/account/',
    mediaSelectorHost: 'https://open.live.bbc.co.uk',
    useBBCCustomID: true,
    chromecastID: 'A619221B'
  },
  uat: {
    cloudfront: 'https://d2rqdg7nynl3m1.cloudfront.net/',
    cloudfrontStatic: '/Content/',
    catalogue: '',
    quickSearch: '',
    search:
      'https://uat-api.britbox.takeoffmedia.com/v1/search?device=web_browser&maxresults=6&segments=US&sub=Subscriber&useCustomId=true',
    apiContent: 'https://uat-api.britbox.takeoffmedia.com',
    account: '/api/account/',
    mediaSelectorHost: 'https://open.live.bbc.co.uk',
    useBBCCustomID: true,
    chromecastID: 'A619221B'
  },
  australia: {
    cloudfront: 'https://d2rqdg7nynl3m1.cloudfront.net/',
    cloudfrontStatic: '/',
    catalogue: '',
    apiContent: 'https://staging-api.britbox.takeoffmedia.com',
    account: '/api/account/',
    useBBCCustomID: false
  },
  preprod: {
    cloudfront: 'https://d2rqdg7nynl3m1.cloudfront.net/',
    cloudfrontStatic: '/Content/',
    catalogue: '',
    quickSearch: '',
    search:
      'https://stage.api.britbox.com/v1/search?device=web_browser&maxresults=6&segments=US&sub=Subscriber&useCustomId=true',
    apiContent: 'https://stage.api.britbox.com',
    account: '/api/account/',
    mediaSelectorHost: 'https://open.live.bbc.co.uk',
    useBBCCustomID: true,
    chromecastID: 'E50CC266'
  },
  production: {
    cloudfront: 'https://d2rqdg7nynl3m1.cloudfront.net/',
    cloudfrontStatic: '/Content/',
    catalogue: '',
    quickSearch: '',
    search:
      'https://api.britbox.com/v1/search?device=web_browser&maxresults=6&segments=US&sub=Subscriber&useCustomId=true',
    apiContent: 'https://api.britbox.com',
    account: '/api/account/',
    mediaSelectorHost: 'https://open.live.bbc.co.uk',
    useBBCCustomID: true,
    chromecastID: 'E50CC266'
  }
};
