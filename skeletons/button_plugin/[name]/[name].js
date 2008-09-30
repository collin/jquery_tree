;(function(_) {  
  _.tree.init_<%= name %>_plugin = function(tree, options) {
    return options.node.prepend(_.tree.<%= name %>_button.deep_clone(true));
  };
  
  _.fn.extend({
    <%= name %>_button: function() {
      return this.find('.<%= name %>:first');
    }
    
    ,<%= name %>_click: function() {
      
    }
  });
})(jQuery);
