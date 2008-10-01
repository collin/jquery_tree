;(function(_) {
  _.tree.id_label.click(function(e) {
    e.preventDefault();
    _(this).fn('edit');
  });
  
  _.tree.id_input
    .keybind('tab',      function() { _(this).next().fn('edit'); })
    .keybind('shift+tab', function() { _(this).prev().prev().fn('edit'); });
  
  _.tree.init_id_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.id_label.deep_clone(true));
    _(document.body).append(_.tree.id_input);
  };

  _.tree.id_label.fn({
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
        label: node.id_label()
        ,input: _.tree.id_input
        ,hide_if_empty: true
        ,do_not_hide_label: true
      });
    }
  });
  
  _.fn.extend({
    id_label: function() {
      return this.find('.id:first');
    }
  });
})(jQuery);
