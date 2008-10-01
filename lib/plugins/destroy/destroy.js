;(function(_) {
  var destroy_event = 'destroy'

  _.tree.init_destroy_plugin = function(tree, options) {
    options.node.prepend(_.tree.destroy_button.deep_clone(true));
  };
  
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
