<?php
declare(strict_types=1);

namespace Yireo\Webp2\Test\Integration;

/**
 * Class MultipleImagesSameTest
 * @package Yireo\Webp2\Test\Integration
 */
class MultipleImagesSameTest extends Common
{
    /**
     * @magentoAppIsolation enabled
     * @magentoDbIsolation enabled
     * @magentoAdminConfigFixture yireo_webp2/settings/enabled 1
     * @magentoAdminConfigFixture yireo_webp2/settings/debug 1
     */
    public function testIfHtmlContainsSingleWebpImage()
    {
        $this->getResponse()->clearBody();
        $this->fixtureImageFiles();

        $this->getRequest()->setParam('case', 'multiple_images_same');
        $this->dispatch('webp/test/images');
        $this->assertSame('multiple_images_same', $this->getRequest()->getParam('case'));
        $this->assertSame(200, $this->getResponse()->getHttpResponseCode());

        $body = $this->getResponse()->getContent();
        $this->assertImageTagsExist($body, [$this->getImageProvider()->getImage()]);
    }
}