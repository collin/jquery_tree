;(function(_) {

  function new_class(e) {
    e.preventDefault();
    _(this).parent_node().new_class();
  }

  function edit_id(e) {
    e.preventDefault();
    _(this).parent_node(e).id_label().fn('edit');
  }
  
  function edit_tag_name(e) {
    e.preventDefault();
    _(this).parent_node().tag_name_label().fn('edit');
  }
  
  function new_attribute(e) {
    e.preventDefault();
    _(this).parent_node().attribute_list().new_attr();
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
