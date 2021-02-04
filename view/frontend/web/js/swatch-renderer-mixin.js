define([
    'jquery',
    'hasWebP',
    "domReady!"
], function ($, hasWebP) {
    'use strict';

    return function (widget) {
        $.widget('mage.SwatchRenderer', widget, {
            _init: function () {
                if (hasWebP()) {
                    this._replaceImageDataWithWebp();
                }
                this._super();
            },

            _replaceImageDataWithWebp: function () {
                if (_.isEmpty(this.options.jsonConfig.images)) {
                    return;
                }

                $.each(this.options.jsonConfig.images, function (key, imagesData) {
                    $.each(imagesData, function (key, imageData) {
                        imageData['full'] = imageData['full_webp'];
                        imageData['img'] = imageData['img_webp'];
                        imageData['thumb'] = imageData['thumb_webp'];
                    });
                });
            },

            _ProductMediaCallback: function ($this, response, isInProductView) {
                var $main = isInProductView ? $this.parents('.column.main') : $this.parents('.product-item-info'),
                    $widget = this,
                    images = [],

                images.push({
                    full: response.large,
                    img: response.medium,
                    thumb: response.small,
                    large_webp: response.large_webp,
                    medium_webp: response.medium_webp,
                    small_webp: response.small_webp,
                    isMain: true
                });

                this.updateBaseImage(images, $main, isInProductView);
            },

            updateBaseImage: function (images, context, isInProductView) {
                this._super(images, context, isInProductView);

                if (!isInProductView) {
                    const justAnImage = images[0];

                    if (justAnImage && justAnImage.img) {
                        const webpSourceTag = context.find('[type="image/webp"]');
                        const imgSourceTag = context.find('[type="image/jpg"], [type="image/png"]');

                            (webpSourceTag !== undefined)
                                ? webpSourceTag.attr('srcset', justAnImage.small_webp)
                                : context
                                    .find('.product-image-photo')
                                    .attr('srcset', justAnImage.small_webp);
                            (imgSourceTag !== undefined)
                                ? imgSourceTag.attr('srcset', justAnImage.thumb)
                                : context
                                    .find('.product-image-photo')
                                    .attr('srcset', justAnImage.thumb);
                    }
                }
            }
        });

        return $.mage.SwatchRenderer;
    }
});
