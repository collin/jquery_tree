;(function(_) {

  function new_class() {
    var _this = _(this);
    _this.parent().new_class();
  }
  
  function bind_input_listeners(options) {
    with(options) {
      classes_input
        .keybind('.', new_class)
        .keybind(',', new_class)
        .keybind('space', new_class);
      id_input
        .keybind('.', new_class)
      tag_name_input
        .keybind('.', new_class);
    }
  }


  _.tree.init_html_editor_plugin = function(tree, options) {
    var html_editor_plugins = 'tag_name id classes attributes'.split(/ /);
    options.plugins = options.plugins.concat(html_editor_plugins);
    options.node.dom = _.tree.dom_node.deep_clone(true);
    tree.init_tree_plugins(html_editor_plugins, options);
    bind_input_listeners(options);
    tree.interactive_editing({
      navigation_selector: '.element:first'
    });
  };
})(jQuery);
