<?php

namespace DAPRODS\view;

use DAPRODS\base\UtilsProvider;
use DAPRODS\Core;

\defined('ABSPATH') or die('No direct access allowed!');
// Avoid direct file request
/**
 * Add an option page to "Products".
 */
class ConfigPage
{
    use UtilsProvider;
    const COMPONENT_ID = DAPRODS_SLUG . '-component';

    /**
     * Constructor.
     */
    private function __construct()
    {
        // Silence is golden.
    }
    /**
     * Add new menu page.
     */
    public function admin_menu()
    {
        $pluginName = $this->getCore()->getPluginData()['Name'];
        \add_submenu_page('edit.php?post_type=product', $pluginName, \__('Delete Products', 'delete-all-products'), Core::MANAGE_MIN_CAPABILITY, self::COMPONENT_ID, [$this, 'render_component_library']);
    }

    /**
     * Show a "Settings" link in plugins list.
     *
     * @param string[] $actions
     * @return string[]
     */
    public function plugin_action_links($actions)
    {
        $actions[] = \sprintf('<a href="%s">%s</a>', $this->getUrl(), \__('Delete Products'));
        return $actions;
    }

    /**
     * Render the content of the menu page.
     */
    public function render_component_library()
    {
        echo '<div id="' . esc_html(self::COMPONENT_ID) . '" class="wrap"></div>';
    }

    /**
     * Get the URL of this page.
     */
    public function getUrl()
    {
        return \admin_url('edit.php?post_type=product&page=' . self::COMPONENT_ID);
    }

    /**
     * New instance.
     */
    public static function instance()
    {
        return new \DAPRODS\view\ConfigPage();
    }
}