;(function(_) {

  function new_class() {
    _(this).parent().new_class();
  }

  function edit_id() {
    _(this).id_label().fn('edit');
  }
  
  function edit_tag_name() {
    _(this).tag_name().fn('edit');
  }
  
  function new_attribute() {
    _(this).parent().attribute_list().new_attr();
  }
  
  function bind_input_listeners(options) {
    with(options) {
      classes_input
        .keybind('<', edit_tag_name)
        .keybind('#', edit_id)
        .keybind('.', new_class)
        .keybind('=', new_attribute)
        .keybind('space', new_class);
      id_input
        .keybind('<', edit_tag_name)
        .keybind('=', new_attribute)
        .keybind('.', new_class);
      tag_name_input
        .keybind('<', edit_tag_name)
        .keybind('#', edit_id)
        .keybind('=', new_attribute)
        .keybind('.', new_class);
      attr_input
        .keybind('#', edit_id)
        .keybind('<', edit_tag_name);
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
