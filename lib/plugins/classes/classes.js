;(function(_) {
  _.tree.classes_label.click(function(e) {
    e.preventDefault();
    _(this).edit_class(_(e.target));

  });
  
  _.tree.classes_input
    .hide()
    .keypress_size_to_fit()
    .whitelist(/[a-z-_\d]/)
    .keybind('tab', function() { 
      var _this = _(this);
      _this.parent().next_class(_this.prev());
    })
    .keybind('shift+tab', function() { 
      var _this = _(this);
      _this.parent().previous_class(_this.prev());
    });
      
  _.tree.init_classes_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.classes_label.deep_clone(true));
    options.classes_input = _.tree.classes_input.clone(true);
  };

  _.tree.classes_label.fn({
    edit: function(last) {
      var _this = _(this);
      if(last) {
        var last_class = _this.parent_node().last_class();
        if(last_class.length) return _this.edit_class(last_class);
      }
      else {
        var first_class = _this.parent_node().first_class();
        if(first_class.length) return _this.edit_class(first_class);
      }
      
      return _this.new_class();    
    }
    
    ,to_haml: function() {
      var classes = _(this).children();
      if(!classes.length) return '';
      return '.' + classes.map(function() {
        return _(this).text();
      }).join('.');
    }
  });
  
  _.fn.extend({
    class_list: function() {
      return this.find('.classes:first');
    }

    ,edit_class: function(cls) {
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
        label: cls
        ,input: node.tree().data('tree.options').classes_input
        ,remove_if_empty: true
        ,do_not_hide_label: true
      });    
    }
  
    ,new_class: function() {
      var cls = _('<li>');
      this.parent_node().class_list().append(cls);
      return this.edit_class(cls);
    }
  
    ,previous_class: function(cls) {
      var prev = cls.prev('li');
      if(prev.length) return this.edit_class(prev);
      return this.prev().fn('edit');
    }
    
    ,next_class: function(cls) {
      var next = cls.next().next();
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
      var dom = _.array_to_classes_dom(this.classes());
      return dom[0] === document ? null : dom;
    }
  
    ,last_class: function() {
      return this.class_list().find('li:last');
    }
    
    ,first_class: function() {
      return this.class_list().find('li:first');
    }
  });
  
  _.array_to_classes_dom = function(array) {
    return _(array.map(function(cls) {
      return '<li>'+cls+'</li>';
    }).join(''));
  }
})(jQuery);
