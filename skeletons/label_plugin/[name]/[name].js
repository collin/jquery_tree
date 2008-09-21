;(function(_) {
  _.inject_<%= name %>_dom = function() {
    _.dom_node.find('.element').append(_.<%= name %>_label);
  }
  
  _.fn.extend({
    <%= name %>_label: function() {
      return this.find('<%= selector %>:first');
    }
    ,edit_<%= name %>: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      return this.edit_label({
        label: this.<%= name %>_label()
        ,input: _.<%= name %>_input
      });
    }
  });
})(jQuery);
