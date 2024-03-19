<?php

namespace DAPRODS\base;

\defined('ABSPATH') or die('No script kiddies please!');
// Avoid direct file request
/**
 * Base class for the applications Core class.
 */
abstract class Core
{
    use \DAPRODS\base\UtilsProvider;

    /**
     * The stored plugin data.
     */
    private $plugin_data;

    /**
     * The constructor handles the core startup mechanism.
     *
     * The constructor is protected because a factory method should only create
     * a Core object.
     *
     * @codeCoverageIgnore
     */
    protected function __construct()
    {
        // Define lazy constants
        \define('DAPRODS_TD', $this->getPluginData('TextDomain'));
        \define('DAPRODS_VERSION', $this->getPluginData('Version'));
        // $this->construct();
    }

    /**
     * Gets the plugin data.
     *
     * @param string $key The key of the data to return
     * @return string[]|string|null
     * @see https://developer.wordpress.org/reference/functions/get_plugin_data/
     */
    public function getPluginData($key = null)
    {
        // @codeCoverageIgnoreStart
        if (!\defined('PHPUNIT_FILE')) {
            require_once ABSPATH . '/wp-admin/includes/plugin.php';
        }
        // @codeCoverageIgnoreEnd
        $data = isset($this->plugin_data) ? $this->plugin_data : ($this->plugin_data = \get_plugin_data(DAPRODS_FILE, \false, \false));
        return $key === null ? $data : (isset($data[$key]) ? $data[$key] : null);
    }
}
