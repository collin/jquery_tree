;(function(_) {
  _.tree.<%= name %>_label.click(function(e) {
    e.preventDefault();
    _(this).fn('edit');
  });

  _.tree.<%= name %>_input
    .hide()
    .keypress_size_to_fit()
    .keybind('tab',      function() { _(this).next().fn('edit'); })
    .keybind('shift+tab', function() { _(this).prev().prev().fn('edit'); });
  
  _.tree.init_<%= name %>_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.<%= name %>_label.deep_clone(true));
    options.<%= name %>_input = _.tree.<%= name %>_input.clone(true);
  };
  
  _.tree.<%= name %>_label.fn({ 
    edit: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = _(this).parent_node();
      return node.edit_label({
        label: node.tree().data('tree.options').<%= name %>_label()
        ,input: _.tree.<%= name %>_input
      });
    }
  });
  
  _.fn.extend({
    <%= name %>_label: function() {
      return this.find('<%= selector %>:first');
    }
  });
})(jQuery);
