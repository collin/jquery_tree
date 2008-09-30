;(function(_) {
  _.tree.init_<%= name %>_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.<%= name %>_label.deep_clone(true));
    _(document.body).append(_.tree.<%= name %>_input.deep_clone(true));
  };
  
  _.<%= name %>_label.fn({ 
    edit: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = this.parent_node();
      return node.edit_label({
        label: node.<%= name %>_label()
        ,input: _.<%= name %>_input
      });
    }
  });
  
  _.fn.extend({
    <%= name %>_label: function() {
      return this.find('<%= selector %>:first');
    }
  });
})(jQuery);
