;(function(_) {
  _.tree.init_html_editor_plugin = function(tree, options) {
    var html_editor_plugins = 'toggle disable destroy tag_name id classes attributes'.split(/ /);
    options.plugins = options.plugins.concat(html_editor_plugins);
    options.node = _.tree.dom_node.deep_clone(true);
    tree.init_tree_plugins(html_editor_plugins, options);
  };
})(jQuery);
