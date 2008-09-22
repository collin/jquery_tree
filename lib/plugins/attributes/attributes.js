;(function(_) {
  _.inject_attributes_dom = function() {
    _.dom_node.find('.element').append(_.attributes_label);
    _(document.body).append(_.attributes_input);
  }
    
  _.tag_name_label.fn({
    edit: function() {
      var first_attr = this.attribute_list().find('li:first');
      
      if(first_attr.length) return this.edit_attr(first_attr);
      
      return this.new_attr();  
    }
  });
  
  _.fn.extend({
    attribute_list: function() {
      return this.find('.attributes:first');
    }
    
    ,new_attr: function() {
      var attr = _('<li><dt><dd></li>');
      this.attribute_list().append(attr);
      return this.edit_attr(attr);
    }
    
    ,previous_attr: function(attr) {
      var prev = attr.prev('li');
      if(prev.length) return this.edit_value(prev);
      this.prev().fn('edit', 'last');
    }
    
    ,next_attr: function(attr) {
      var next = attr.next('li');
      if(next.length) return this.edit_attr(next);
      return this.parent_node().new_attr();
    }
    
    ,edit_attr: function(label) {
      return this.edit_label({
        label: label.find('dt')
        ,input: _.attr_input
        ,insertion_method: 'before'
        ,if_empty: function() {this.parent().remove()}
        ,do_not_hide_label: true
      });
    }
    
    ,edit_value: function(label) {
      return this.edit_label({
        label: label.find('dd')
        ,input: _.value_input
        ,insertion_method: 'append'
        ,do_not_hide_label: true
      });
    }    
    
    ,attributes_to_dom: function() {
      var dom_string = _(this[0].attributes).map(function(which, attr) {
        if(!this.name.match(/id|class/)) {
          return '<li><dt>'+attr.name+'</dt><dd>'+attr.value+'</dd></li>';
        }
      }).join('');
      
      var dom = _(dom_string);
      return dom[0] === document ? null : dom; 
    }
  });
})(jQuery);
