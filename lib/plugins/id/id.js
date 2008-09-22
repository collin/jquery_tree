;(function(_) {
  _.inject_id_dom = function() {
    _.dom_node.find('.element').append(_.id_label);
  }

  _.id_label.fn({
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
        label: node.id_label()
        ,input: _.id_input
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
