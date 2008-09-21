;(function(_) {
  _.inject_classes_dom = function() {
    _.dom_node.find('.element').append(_.classes_label);
  }
  
  
  _.classes_label.fn({
    edit: function() {
      var first_class = this.class_list().find('li:first');
      if(first_class.length) return this.edit_class(first_class);
      return this.new_class();    
    }
    
    ,edit_class: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = this.parent_node(cls);
      return node.edit_label({
        label: cls
        ,input: _.classes_input
        ,remove_if_empty: true
        ,do_not_hide_label: true
      }    
    }
  });
  
  _.fn.extend({
    class_list: function() {
      return this.find('.classes:first');
    }
  });
})(jQuery);
