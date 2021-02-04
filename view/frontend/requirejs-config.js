var config = {
    map: {
      '*': {
          hasWebP: 'Yireo_Webp2/js/has-webp'
      }
    },
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Yireo_Webp2/js/swatch-renderer-mixin': true
            },
            'mage/gallery/gallery': {
                'Yireo_Webp2/js/gallery-mixin': true
            },
            'Magento_ConfigurableProduct/js/configurable': {
                'Yireo_Webp2/js/configurablewebp': true
            }
        }
    }
};
