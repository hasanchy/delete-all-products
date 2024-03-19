<?php
namespace DAPRODS\base;

\defined('ABSPATH') or die('No direct access allowed!');
// Avoid direct file request
/**
 * To make the composer package in packages/utils work we need to
 * make the constant variables be passed to the High-Order class.
 *
 * Put this trait in all your classes! Note also not to use the
 * below methods by your plugin, instead use direct access to the constant.
 * It just is for composer packages which needs to access dynamically the plugin!
 */
trait UtilsProvider
{
    /**
     * Get the prefix of this plugin so composer packages can dynamically
     * build other constant values on it.
     *
     * @return string
     * @codeCoverageIgnore It only returns a string with the constant prefix
     */
    public function getPluginConstantPrefix()
    {
        return 'DAPRODS';
    }

    /**
     * Is the current using plugin Pro version?
     *
     * @return boolean
     */
    public function isPro()
    {
        /**
         * This trait always needs to be used along with base trait.
         *
         * @var Base
         */
        return DAPRODS_IS_PRO;
    }

    /**
     * Get the functions instance.
     *
     * @return mixed
     */
    public function getCore()
    {
        return \call_user_func([DAPRODS_NS . '\\Core', 'getInstance']);
    }

}
