;(function(_){
  _.create_element = function(tag) {
    return _('<'+tag+'>');
  };

  _.fn.extend({
    'join': function() {
      return [].join.apply(this, arguments);
    }

    ,hide_if_empty: function() {
      return this.if_empty(function(){this.hide();});
    }
    
    ,id: function() {
      return this.attr('id');
    }
    
    ,tag_name: function() {
      return this.attr('tagName').toLowerCase();
    }
    
    ,classes: function() {
      var classes = this.attr('class');
      if(classes == '') return [];
      return classes.split(/ /);  
    }
    
    ,not_empty: function() {
      return this.removeClass('empty');
    }
    
    ,clear: function() {
      return this.html('');
    }
    
    ,remove_class_on_all_children_and_self: function(cls) {
      this.find('.'+cls).removeClass(cls);
      this.removeClass(cls);
      return this;
    }
    
    ,dragstart: function(fn) {
      return this.bind('dragstart', fn);
    }
    
    ,dragend: function(fn) {
      return this.bind('dragend', fn);
    }
    
    ,size_to_fit: function() {
      return this.attr('size', this.val().length || 1);
    }
    
    ,keyup_size_to_fit: function() {
      return this.keyup(function(e) {
        _(this).size_to_fit();
      });
    }

    ,blank: function() {
      return this.text().match(/^\s*$/);
    }  
    ,remove_if_empty: function() {
      return this.if_empty(function() {this.remove();});
    }
    
    ,if_empty: function(fn) {
      if(this.html() === "") fn.call(this);
      return this;
    }
    
    ,blur_all: function() {
      this.find('input').blur();
      return this;
    }
    
    ,log: function() {
      console.log(this[0]);
      return this;
    }
  });
})(jQuery);


;(jQuery(function() {
  jQuery("head").append("<style>.tree{font-size:.7em;font-family:sans-serif}.tree .tree_node.dragging{position:absolute;border:1px outset;background-color:white !important;z-index:10000000000}.tree .tree_node.inspected> button.toggle{background-image:url(/icons/close.png)}.tree .tree_node .toggle{border:none;background:none;width:16px;height:16px;display:inline;float:left;position:relative;top:2px;top:4px}.tree .tree_node .toggle.closed{background-image:url(/icons/open.png)}.tree .tree_node.empty > button.toggle{visibility:hidden}.tree ol,.tree ul{list-style:none}.tree ol{white-space:nowrap;background-color:white;padding:0}.tree ol .inspected{background-color:#fcc}.tree ol .inspected .tree_node{background-color:white}.tree ol li{white-space:nowrap;display:block;clear:both;padding-left:10px;margin-left:0px}</style>");
}));

jQuery.tree_node = jQuery("<li class='tree_node empty'>  <button class='toggle'></button>  <span>Tree Node</span>  <ol></ol></li>");

;(function(_){
_.fn.extend({
  child_list: function() {
    if(this.is('ol')) return this;
    return this.find('ol:first');
  }
  
  ,parent_node: function() {
    var node = this.parents('.tree_node:first');
    if(node.length) return node;
    return this.filter('.tree_node');
  }
  
  ,collapse_children: function(slide) {
    if(slide)
      this.child_list().slideUp();
    else
      this.child_list().hide();
    this.toggle_button().addClass('closed');
    return this;
  }
  
  ,expand_children: function(slide) {
    if(slide)
      this.child_list().slideDown();
    else
      this.child_list().show();
    this.toggle_button().removeClass('closed');
    return this;
  }
  
  ,toggle_button: function() {
    return this.find('.toggle:first');
  }
});
})(jQuery);
