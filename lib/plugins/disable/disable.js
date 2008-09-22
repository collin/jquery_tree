;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.inject_disable_dom = function() {
    _.tree_node.prepend(_.disable_button);
  }
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class)) node.trigger(disable_event);
      else                     node.trigger(enable_event);    
    }
  });
})(jQuery);
