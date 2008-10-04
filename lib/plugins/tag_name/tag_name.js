;(function(_) {
  _.tree.tag_name_label.click(function(e) {
    _(this).fn('edit');
  });
  
  _.tree.tag_name_input
    .hide()
    .keypress_size_to_fit()
    .keybind('tab',      function() { _(this).next().fn('edit'); })
    .keybind('shift+tab', function() { _(this).prev().fn('edit'); });
  
  _.tree.init_tag_name_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.tag_name_label.deep_clone(true));
    options.tag_name_input = _.tree.tag_name_input.clone(true);
  }
  
  _.tree.tag_name_label.fn({
    edit: function() {
      var node = _(this).parent_node();
      return node.edit_label({
        label: node.tag_name_label()
        ,input: node.tree().data('tree.options').tag_name_input
        ,default_value: 'div'
      });
    }
  });
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
  });
})(jQuery);
