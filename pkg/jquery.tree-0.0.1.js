;(jQuery(function() {
  jQuery("head").append("<style>.tree{font-size:.7em;font-family:sans-serif}.tree .tree_node.dragging{position:absolute;border:1px outset;background-color:white !important;z-index:10000000000}.tree .tree_node.inspected> button.toggle{background-image:url(/icons/close.png)}.tree .tree_node .toggle{border:none;background:none;width:16px;height:16px;display:inline;float:left;position:relative;top:2px;top:4px}.tree .tree_node .toggle.closed{background-image:url(/icons/open.png)}.tree .tree_node.empty > button.toggle{visibility:hidden}.tree ol,.tree ul{list-style:none}.tree ol{white-space:nowrap;background-color:white;padding:0}.tree ol .inspected{background-color:#fcc}.tree ol .inspected .tree_node{background-color:white}.tree ol li{white-space:nowrap;display:block;clear:both;padding-left:10px;margin-left:0px}.tree.inspected> button.toggle{background-image:url(/icons/close.png)}.tree .toggle{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;width:16px;height:16px}.tree .toggle.closed{background-image:url(/icons/open.png)}.tree.empty > button.toggle{visibility:hidden}li.inspected> button.disable{background-color:transparent;background-image:url(/icons/block.png)}li button.disable{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px}li button.disable.active{background-image:url(/icons/active_block.png)}li.inspected> button.destroy{background-color:transparent;background-image:url(/icons/destroy.png)}li button.destroy{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px;opacity:.5}li button.destroy:hover{opacity:1}</style>");
}));

jQuery.tree_node = jQuery("<li class='tree_node empty'>  <button class='toggle'></button>  <span>Tree Node</span>  <ol></ol></li>");

jQuery.toggle_button = jQuery("<button class='toggle'></button>");

jQuery.disable_button = jQuery("<button class='disable'></button>");

jQuery.destroy_button = jQuery("<button class='destroy'></button>");

;(function(_) {
  var closed_class = 'closed'
    ,open_event = 'expand'
    ,close_event = 'collapse';
  _.tree.animate = true;
  
  _.inject_toggle_dom = function() {
    _.tree_node.prepend(_.toggle_button);
  }
  
  _.fn.extend({
    toggle_button: function() {
      return this.find('.toggle:first');
    }
    
    ,toggle_click: function(el, node) {
      if(el.hasClass(closed_class)) {
        node.trigger(expand_event);
        node.expand_children(_.tree.animate);
      }
      else
        node.trigger(collapse event);
        node.collapse_children(_.tree.animate);
    }

    ,collapse_children: function(slide) {
      if(slide)
        this.child_list().slideUp();
      else
        this.child_list().hide();
      this.toggle_button().addClass(closed_class);
      return this;
    }
    
    ,expand_children: function(slide) {
      if(slide)
        this.child_list().slideDown();
      else
        this.child_list().show();
      this.toggle_button().removeClass(closed_class);
      return this;
    }
  });
})(jQuery);


;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.inject_disable_dom = function() {
    _.tree_node.prepend(_.disable_button]);
  }
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class) node.trigger(disable_event);
      else                    node.trigger(enable_event);    
    }
  });
})(jQuery);


;(function(_) {
  var destroy_event = 'destroy'

  _.inject_destroy_dom = function() {
    _.tree_node.prepend(_.destroy_button]);
  }
  
  _.fn.extend({
    destroy_button: function() {
      return this.find('.destroy:first');
    }
    
    ,destroy_click: function(el, node) {
      node.trigger(destroy_event);
      node.remove();
    }
  });
})(jQuery);


;(function(_){
  _.tree = {
    plugins: []
    
    ,use_plugins: function(names) {
      _(names.split(/ |,/)).each(function() {
        _.plugins.push(this);
        _["inject_"+this+"_dom]"();
      });
    }
  };

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
    
    ,is_tree: function() {
      return this.click(function(e) {
        var el = _(e.target)
          ,node = el.parent_node();
        
        if(el.is('input')) return;
        node.blur_all();
        _.tree.plugins.each(function() {
          if(el.hasClass(this)) el[this+'_click'](el, node);
        });
      }        
    }
  });
})(jQuery);
