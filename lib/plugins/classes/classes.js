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
  });
  
  _.fn.extend({
    class_list: function() {
      return this.find('.classes:first');
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
  
    ,new_class: function() {
      var cls = _('<li>');
      this.class_list().append(cls);
      return this.edit_class(cls);
    }
  
    ,previous_class: function(cls) {
      var prev = cls.prev('li').prev('li').prev('li');
      if(prev.length) return this.edit_class(prev);
      return this.prev().fn('edit');
    }
    
    ,next_class: function(cls) {
      var next = cls.next('li');
      if(next.length) return this.edit_class(next);
      return this.next().fn('edit');
    }
  
    ,class_string: function() {
      var classes = this.class_list().children().map(function() {
        var _this = _(this);
        if(_this.is('input')) return _this.val(); 
        return _this.text();    
      });
      return classes.join(' ');
    }
    
    ,classes_to_dom: function() {
      var dom_string = this.classes().map(function(cls) {
        return '<li>'+cls+'</li>';
      }).join('');
      var dom = _(dom_string);
      return dom[0] === document ? null : dom;
    }
  });
})(jQuery);
