;(function(_) {
  _.tree.tree_node.label()
    .fn({
      edit: function() {
        var node = _(this).parent_node();
        node.edit_label({
          label: node.label()
          ,input: node.tree().data('tree.options').tree_node_input
          ,if_empty: function() {
            node.remove();  
          }
        });
      }
    })
    .click(function(e) {
      _(this).fn('edit');
    });

  _.tree.tree_node_input
    .hide()
    .keypress_size_to_fit()

  _.tree.init_editable_plugin = function(tree, options) {
    options.tree_node_input = _.tree.tree_node_input.deep_clone(true);
  };
})(jQuery);
