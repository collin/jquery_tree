;(function(_) {
  var closed_class = 'closed'
    ,expand_event = 'expand'
    ,collapse_event = 'collapse';
  _.tree.animate = true;
  
  
  _.tree.init_toggle_plugin = function(tree, options) {
    options.node.prepend(_.tree.toggle_button.deep_clone(true));
  };
  
  _.fn.extend({
    toggle_button: function() {
      return this.find('.toggle:first');
    }
    
    ,toggle_click: function(el, node) {
      if(el.hasClass(closed_class)) {
        node.trigger(expand_event);
        node.expand_children(_.tree.animate);
      }
      else {
        node.trigger(collapse_event);
        node.collapse_children(_.tree.animate);
      }
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
