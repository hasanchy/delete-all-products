<?php

if (!\function_exists('wp_dap_active')) {
    /**
     * Checks if DAP is active for the current user.
     *
     * @return boolean
     * @since 3.1.0
     */
    function wp_dap_active()
    {
        /**
         * Checks if DAP is active for the current user. Do not use this filter
         * yourself, instead use wp_dap_active() function!
         *
         * @param {boolean} True for activated and false for deactivated
         * @return {boolean}
         * @hook DAP/Active
         * @since 1.0.0
         */
        $result = \apply_filters('DAP/Active', \current_user_can('manage_categories'));
        return $result;
    }
}
