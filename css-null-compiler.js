// Prevent Mocha from compiling class
function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.styl'] = noop;