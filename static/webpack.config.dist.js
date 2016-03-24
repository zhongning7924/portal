/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

"use strict";

var config = require("./webpack.config.base");
module.exports = config.getPrdConfig();
