;(function(_) {
  _.inject_classes_dom = function() {
    _.dom_node.find('.element').append(_.classes_label);
  }
  
  _.fn.extend({
    classes_label: function() {
      return this.find('.classes:first');
    }
    ,edit_classes: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      return this.edit_label({
        label: this.classes_label()
        ,input: _.classes_input
      });
    }
  });
})(jQuery);
