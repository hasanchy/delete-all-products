<?php

if (!\function_exists('daprods_is_plugin_active')) {
    /**
     * Checks if DAPRODS is active for the current user.
     *
     * @return boolean
     * @since 3.1.0
     */
    function daprods_is_plugin_active()
    {
        /**
         * Checks if DAPRODS is active for the current user. Do not use this filter
         * yourself, instead use daprods_is_plugin_active() function!
         *
         * @param {boolean} True for activated and false for deactivated
         * @return {boolean}
         * @hook DAPRODS/Active
         * @since 1.0.0
         */
        $result = \apply_filters('DAPRODS/Active', \current_user_can('manage_categories'));
        return $result;
    }
}
