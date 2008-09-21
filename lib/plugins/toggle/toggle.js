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
