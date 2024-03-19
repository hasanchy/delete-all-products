<?php
namespace DAPRODS;

use DAPRODS\base\Core as BaseCore;
use DAPRODS\rest\Service;
use DAPRODS\view\ConfigPage;

\defined('ABSPATH') or die('No direct access allowed!'); // Avoid direct file request

/**
 * Singleton core class which handles the main system for plugin. It includes
 * registering of the autoload, all hooks (actions & filters) (see BaseCore class).
 */
class Core extends BaseCore {

	/**
     * The minimal required capability so a user can manage options for RCL.
     */
    const MANAGE_MIN_CAPABILITY = 'manage_options';

	/**
     * Singleton instance.
     */
    private static $me;
	/**
     * The config page.
     *
     * @var ConfigPage
     */
    private $configPage;
	/**
     * Assets handler.
     *
     * @var Assets
     */
    private $assets;

	/**
     * Application core constructor.
     */
	protected function __construct() 
	{
		parent::__construct();
		$this->assets = Assets::instance();

		// Load no-namespace API functions
        foreach (['general'] as $apiInclude) {
            require_once DAPRODS_INC . 'api/' . $apiInclude . '.php';
        }

		add_action('init', [$this, 'init'], 2);
	}

	/**
	 * The init function is fired even the init hook of WordPress. If possible
	 * it should register all hooks to have them in one place.
	 */
	public function init()
	{
		$this->configPage = ConfigPage::instance();

		\add_action('rest_api_init', [Service::instance(), 'rest_api_init']);
		\add_action('admin_enqueue_scripts', [$this->getAssets(), 'admin_enqueue_scripts']);
		\add_action('admin_init', [$this, 'check_required_plugin']);
		\add_action('admin_menu', [$this->getConfigPage(), 'admin_menu']);
		\add_filter('plugin_action_links_' . \plugin_basename(DAPRODS_FILE), [$this->getConfigPage(), 'plugin_action_links'], 10, 2);
	}

	/**
     * Get config page.
     *
     * @codeCoverageIgnore
     */
    public function getConfigPage()
    {
        return $this->configPage;
    }

	/**
     * Get singleton core class.
     *
     * @return Core
     */
    public static function getInstance()
    {
        return !isset(self::$me) ? self::$me = new \DAPRODS\Core() : self::$me;
    }

	/**
	 * Check if required plugin is available
	 */
	public function check_required_plugin() {
		// check if woocommerce is installed.
		if ( ! class_exists( 'WooCommerce' ) ) {
			require_once \DAPRODS_INC . 'base/others/fallback-woocommerce.php';
		}
	}

	/**
     * Get assets handler.
     *
     * @codeCoverageIgnore
     */
    public function getAssets()
    {
        return $this->assets;
    }

}