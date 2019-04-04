import LazyAds from './script';

window._L = LazyAds();
_L.eventHandler();
_L.eventHandler('scroll', _L.loadAd());
