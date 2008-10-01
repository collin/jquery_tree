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
      .dblclick(function() {
        tree
          .create_node()
          .tag_name_label()
            .fn('edit');
      })
      .keybind('esc', function(e) {
        _(e.target).blur();
      })
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
      .keybind('ctrl+up', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.prev('li').find('.element:first .'+input.attr('class')).fn('edit');
      })
      .keybind('ctrl+down', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.next('li').find('.element:first .'+input.attr('class')).fn('edit');
      })
      .keybind('ctrl+left', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.parent_node().find('.element:first .'+input.attr('class')).fn('edit');
      })
      .keybind('ctrl+right', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.child_list().find('li:first').find('.element:first .'+input.attr('class')).fn('edit');
      })
      .keybind('ctrl+shift+up', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.prev('li').before(node);
        input.focus();
      })
      .keybind('ctrl+shift+down', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.next('li').after(node);
        input.focus();
      })
      .keybind('ctrl+shift+left', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.parent_node().before(node);
        input.focus();
        if(node.parent_node().child_list().blank()) parent_node.addClass('empty');
      })
      .keybind('ctrl+shift+right', function(e) {
        var input = _(e.target)
          ,node = input.parent_node();
        node.next().child_list().prepend(node);
        input.focus();
        node.next().removeClass('blank');
      });
  };
})(jQuery);
