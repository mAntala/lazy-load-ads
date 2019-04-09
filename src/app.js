import LazyAds from './lazyload.module';

window._L = LazyAds();
_L.eventHandler('DOMContentLoaded');
_L.eventHandler('scroll');
