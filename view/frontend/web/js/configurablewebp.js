define([
    'jquery',
    'hasWebP',
    'mage/utils/wrapper',
    "domReady!"
], function($, hasWebP, wrapper){
  'use strict';

    return function (targetModule) {
        var reloadPrice = targetModule.prototype._reloadPrice,
        reloadPriceWrapper = wrapper.wrap(reloadPrice, function(original) {

          var images = this.options.spConfig.images[this.simpleProduct];

          if (hasWebP()) {
          $.each(images, function (key, images) {
          images['full'] = images['full_webp'];
          images['img'] = images['img_webp'];
          images['thumb'] = images['thumb_webp'];
          });
        }
        return original();
        });
    targetModule.prototype._reloadPrice = reloadPriceWrapper;
    return targetModule;
	};
});
