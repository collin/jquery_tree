;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.tree.init_disable_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.disable_button.deep_clone(true));
    return this;
  };
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class)) 
        node
          .addClass('disabled')
          .trigger(disable_event);
      else 
        node
          .removeClass('disabled')
          .trigger(enable_event); 
    }
  });
})(jQuery);
