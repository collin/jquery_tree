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
    var html_editor_plugins = 'toggle disable destroy tag_name id classes attributes'.split(/ /);
    options.plugins = options.plugins.concat(html_editor_plugins);
    options.node = _.tree.dom_node.deep_clone(true);
    tree.init_tree_plugins(html_editor_plugins, options);
    bind_input_listeners(options);
    tree
      .keybind('enter', function(e) {
        var node = _(e.target).parent_node();
        node
          .create_node_after()
          .tag_name_label()
            .fn('edit');
      })
      .keybind('shift+enter', function(e) {
        var node = _(e.target).parent_node();
        node
          .create_node()
          .tag_name_label()
            .fn('edit');
      })
      .keybind('ctrl+up', function() {
      })
      .keybind('ctrl+down', function() {
      })
      .keybind('ctrl+left', function() {
      })
      .keybind('ctrl+right', function() {
      })
      .keybind('ctrl+shift+up', function() {
      })
      .keybind('ctrl+shift+down', function() {
      })
      .keybind('ctrl+shift+left', function() {
      })
      .keybind('ctrl+shift+right', function() {
      });
  };
})(jQuery);
