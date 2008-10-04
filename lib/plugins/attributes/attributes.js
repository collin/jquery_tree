;(function(_) {
  _.tree.attributes_label.click(function(e) {
    e.preventDefault();
    var el = _(e.target)
      ,_this = _(this)
      ,attr = el.parent();
    if(el.is('dt')) _this.edit_attr(attr);
    if(el.is('dd')) _this.edit_value(attr); 
  });
 
  function edit_value() { 
    var _this = _(this);
    _this.parent_node().edit_value(_this.parent());
  }
 
  _.tree.attr_input
    .hide()
    .keypress_size_to_fit()
    .keybind('tab', edit_value)
    .keybind('shift+tab', function() { 
      var _this = _(this);
      _this.parent_node().previous_attr(_this.parent());
    })
    .keybind('space', edit_value)
    .keybind('=', edit_value);
    console.warn('keybinding "=" not working');
 
  _.tree.value_input
    .hide()
    .keypress_size_to_fit()
    .keybind('tab', function() {  
      var _this = _(this);
      _this.parent_node().next_attr(_this.parent());
    })
    .keybind('shift+tab', function() {
      var _this = _(this);
      _this.parent_node().edit_attr(_this.parents('li:first'));
    });
  
  _.tree.init_attributes_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.attributes_label.deep_clone(true));
    options.attr_input = _.tree.attr_input.clone(true);
    options.value_input = _.tree.value_input.clone(true);
  };
    
  _.tree.attributes_label.fn({
    edit: function() {
      var _this = _(this)
        ,first_attr = _this.find('li:first');
      
      if(first_attr.length) return _this.edit_attr(first_attr);
      
      return _this.new_attr();  
    }
  });
  
  _.fn.extend({
    attribute_list: function() {
      return this.find('.attributes:first');
    }
    
    ,new_attr: function() {
      var attr = _('<li><dt class="attr"><dd class="value"></li>');
      this.append(attr);
      return this.edit_attr(attr);
    }
    
    ,previous_attr: function(attr) {
      var prev = attr.prev('li');
      if(prev.length) return this.edit_value(prev);
      attr.parent().prev().fn('edit', 'last');
    }
    
    ,next_attr: function(attr) {
      var next = attr.parent().next('li');
      if(next.length) return this.edit_attr(next);
      return this.new_attr();
    }
    
    ,edit_attr: function(label) {
      return this.edit_label({
        label: label.find('dt')
        ,input: label.tree().data('tree.options').attr_input
        ,insertion_method: 'before'
        ,if_empty: function() {this.parent().remove()}
        ,do_not_hide_label: true
      });
    }
    
    ,edit_value: function(label) {
      return this.edit_label({
        label: label.find('dd')
        ,input: label.tree().data('tree.options').value_input
        ,insertion_method: 'append'
        ,do_not_hide_label: true
      });
    }    
    
    ,attributes_to_dom: function() {
      var attrs = {} 
      
      _(this[0].attributes).each(function(which, attr) {
        if(!this.name.match(/id|class/)) {
          attrs[this.name] = this.value;
        }
      });
      
      var dom = _.object_to_attributes_dom(attrs);
      return dom[0] === document ? null : dom; 
    }
  });
  
  _.object_to_attributes_dom = function(object) {
    var dom_string = "", slot;
    for(slot in object)
      dom_string += '<li><dt class="attr">'+slot+'</dt><dd class="value">'+object[slot]+'</dd></li>';
    return _(dom_string);
  };
})(jQuery);
