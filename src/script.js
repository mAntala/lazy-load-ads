/**
 * Lazyloading for Adform Ads.
 * Load Adform JavaScript ads on demand. Using new JavaScript features.
 * @author Maroš Antala
 * @keywords lazyload, lazyloading, lazyads
 * @version 1.0.0
 */
export default function LazyAds() {

  const iframes = document.querySelectorAll('.lazy-ad');
  const map = new Map();

  /**
   * Checks if element is in viewport OR 500px below
   * @param  {Sting}    element Element to check.
   * @return {Boolean}          True or False.
   */
  const isInViewport = function(element) {
    var rect = element.getBoundingClientRect();
    return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight + 500 || document.documentElement.clientHeight + 500) && rect.left <= (window.innerWidth || document.documentElement.clientWidth);
  };

  /**
   * Checks if device's width is lower than 767px (mobile, small tabler).
   * @return {Boolean} True or False.
   */
  const isMobile = function() {
    return window.innerWidth <= 767 ? true : false;
  };

  /**
   * Set all iframes to map and set its properties.
   * @param  {Node list} elements Node list of elements to include to map.
   * @return {Null}
   */
  const createMap = function(elements) {

    // If is mobile, include all elements marked as 'mobile'
    if( isMobile() ) {

      for (let i = 0; i < elements.length; i++) {
        let el = elements[i];
        if( el.getAttribute('data-for') === 'mobile' ) {
          map.set(i, {
            element: el,
            isVisible: false,
            content: el.getAttribute('data-content')
          });
        }

      }

    }

    // If is desktop, include all elements marked as 'desktop'
    else {

      for (let i = 0; i < elements.length; i++) {
        let el = elements[i];
        if( el.getAttribute('data-for') === 'desktop' ) {
          map.set(i, {
            element: el,
            isVisible: false,
            content: el.getAttribute('data-content')
          });
        }
      }

    }
    return null;

  }

  /**
   * Handle provided event.
   * @param  {String}   event    Name of supported event.
   * @param  {Function} callback Function to run.
   * @return {Null}
   */
  const eventHandler = function(event = 'DOMContentLoaded') {

    if( event === 'DOMContentLoaded' ) {
      document.addEventListener(event, function() {
        createMap(iframes);
        loadAd();
      });
    }
    else if( event === 'scroll' ) {
      document.addEventListener(event, function() {
        loadAd();
      });
    }

    return null;

  }

  /**
   * Load AD from JavaScript file.
   * @return {Null}
   */
  const loadAd = function() {

    for( let el of map) {

      if( isInViewport( el[1].element ) && el[1].isVisible === false ) {

        el[1].isVisible = true;

        loadJs( el[1].content, el[1].element );

      }

    }
    return null;

  };

  /**
   * Load JavaScript file  asynchronously.
   * @param  {String}       url    URL with JavaScript to load.
   * @param  {Node element} target Node element where to insert JavaScript.
   * @return {Promise}             Returns new Promise when file is loaded.
   */
  const loadJs = function(url, target) {

    // Create new <script> element and set its source and type.
    // Then insert it.
    let script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('type', 'text/javascript');
    target.appendChild(script);

    // Returns Promise. After load, we can use it.
    // (In this case, load it and show AD).
    return new Promise(function(resolve, reject) {
      script.onload = resolve;
      script.onreadystatechange = resolve;
    });

  };

  return {
    eventHandler,
    loadAd
  }

}
