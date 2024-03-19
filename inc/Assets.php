<?php
namespace DAPRODS;

// @codeCoverageIgnoreStart
\defined('ABSPATH') or die('No direct access allowed!');
// Avoid direct file request
// @codeCoverageIgnoreEnd
/**
 * Asset management for frontend scripts and styles.
 */
class Assets
{

    /**
     * Enqueue scripts and styles for admin pages.
     *
     * @param string $hook_suffix The current admin page
     */
    public function admin_enqueue_scripts()
    {
        $this->enqueue_scripts_and_styles();
    }


    /**
     * Enqueue scripts and styles depending on the type. This function is called
     * from both admin_enqueue_scripts and wp_enqueue_scripts. You can check the
     * type through the $type parameter. In this function you can include your
     * external libraries from src/public/lib, too.
     *
     * @param string $type The type (see utils Assets constants)
     * @param string $hook_suffix The current admin page
     */
    public function enqueue_scripts_and_styles()
    {
        
        // Enqueue plugin entry points
        $handle = $this->enqueueScript('admin', 'admin.lite.js');
        $this->enqueueStyle('admin', 'admin.css');
        // Localize script with server-side variables
        \wp_localize_script($handle, 'appLocalizer', [
            'restUrl' => home_url( '/wp-json' ),
            'restNonce' => wp_create_nonce( 'wp_rest' ),
        ]);

    }

    /**
     * Enqueue a CSS stylesheet. Use this wrapper method instead of wp_enqueue_style if you want
     * to use the cachebuster for the given src. If the src is not found in the cachebuster (inc/base/others/cachebuster.php)
     * it falls back to _VERSION.
     *
     * It also allows $src to be like in enqueueScript()
     *
     * @param string $handle Name of the style. Should be unique.
     * @param mixed $src The src relative to public/dist or public/dev folder (when $isLib is false)
     * @param string[] $deps An array of registered style handles this style depends on.
     * @param string $media The media for which this stylesheet has been defined. Accepts media types like 'all', 'print' and 'screen', or media queries like '(orientation: portrait)' and '(max-width: 640px)'.
     * @param boolean $isLib If true the public/lib/ folder is used.
     * @return string|boolean The used handle
     * @see https://developer.wordpress.org/reference/functions/wp_enqueue_style/ For parameters
     */
    public function enqueueStyle($handle, $src, $deps = [], $media = 'all', $isLib = \false)
    {
        return $this->enqueue($handle, $src, $deps, $isLib, 'style', null, $media);
    }

    /**
     * Registers the script if $src provided (does NOT overwrite), and enqueues it. Use this wrapper
     * method instead of wp_enqueue_script if you want to use the cachebuster for the given src. If the
     * src is not found in the cachebuster (inc/base/others/cachebuster.php) it falls back to _VERSION.
     *
     * You can also use something like this to determine SCRIPT_DEBUG files:
     *
     * ```php
     * $this->enqueueLibraryScript(
     *     Constants::ASSETS_HANDLE_REACT_DOM,
     *     [[$useNonMinifiedSources, 'react-dom/umd/react-dom.development.js'], 'react-dom/umd/react-dom.production.min.js'],
     *     Constants::ASSETS_HANDLE_REACT
     * );
     * ```
     *
     * @param string $handle Name of the script. Should be unique.
     * @param mixed $src The src relative to public/dist or public/dev folder (when $isLib is false)
     * @param string[] $deps An array of registered script handles this script depends on.
     * @param boolean $in_footer Whether to enqueue the script before </body> instead of in the <head>.
     * @param boolean $isLib If true the public/lib/ folder is used.
     * @return string|boolean The used handle
     * @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/ For parameters
     */
    public function enqueueScript($handle, $src, $deps = [], $in_footer = \true, $isLib = \false)
    {
        return $this->enqueue($handle, $src, $deps, $isLib, 'script', $in_footer);
    }

/**
     * Enqueue helper for entry points and libraries. See dependents for more documentation.
     *
     * @param string $handle
     * @param mixed $src
     * @param string[] $deps
     * @param boolean $isLib
     * @param string $type Can be 'script' or 'style'
     * @param boolean $in_footer
     * @param string $media
     * @return string|boolean The used handle
     */
    protected function enqueue($handle, $src, $deps = [], $isLib = \false, $type = 'script', $in_footer = \true, $media = 'all')
    {
        if (!\is_array($src)) {
            $src = [$src];
        }
        $publicFolder = $this->getPublicFolder();
        foreach ($src as $s) {
            // Allow to skip e. g. SCRIPT_DEBUG files
            if (\is_array($s) && $s[0] !== \true) {
                continue;
            }
            $useSrc = \is_array($s) ? $s[1] : $s;
            $publicSrc = $publicFolder . $useSrc;
            $path = \trailingslashit(DAPRODS_PATH) . $publicSrc;
            if (\file_exists($path)) {
                $url = \plugins_url($publicSrc, DAPRODS_FILE);
                // In dev environment, the cachebuster is not created; it is only created at build time
                $cachebuster = $this->getCachebusterVersion($publicSrc);
                
                if ($type === 'script') {
                    \wp_enqueue_script($handle, $url, $deps, $cachebuster, $in_footer);
                } else {
                    \wp_enqueue_style($handle, $url, $deps, $cachebuster, $media);
                }
                return $handle;
            }
        }
        return \false;
    }


    /**
     * Gets a public folder depending on the debug mode relative to the plugins folder with trailing slash.
     *
     * @param boolean $isLib If true the public/lib/ folder is returned.
     * @return string
     */
    public function getPublicFolder()
    {
        return 'public/dist/';
    }

    /**
     * Get the cachebuster entry for a given file. If the $src begins with public/lib/ it
     * will use the inc/base/others/cachebuster-lib.php cachebuster instead of inc/base/others/cachebuster.php.
     *
     * @param string $src The src relative to public/ folder
     * @param boolean $isLib If true the cachebuster-lib.php cachebuster is used
     * @param string $default
     * @return string _VERSION or cachebuster timestamp
     */
    public function getCachebusterVersion($src, $isLib = \false, $default = null)
    {
        $default = $default ?? DAPRODS_VERSION;
        $path = DAPRODS_INC . '/base/others/';
        $path = $path . 'cachebuster.php';
        
        // Main cachebuster
        if (\file_exists($path)) {
            // Store cachebuster once
            static $cachebuster = null;
            if ($cachebuster === null) {
                $cachebuster = (include $path);
            }
            // Prepend src/ because the cachebuster task prefixes it
            $src = 'src/' . $src;
            if (\is_array($cachebuster) && \array_key_exists($src, $cachebuster)) {
                // Valid cachebuster
                return $cachebuster[$src];
            }
        }
        
        return $default;
    }

    /**
     * New instance.
     *
     * @codeCoverageIgnore
     */
    public static function instance()
    {
        return new Assets();
    }

}