;(function(_) {  
  _.tree.init_<%= name %>_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.<%= name %>_button.deep_clone(true));
    return this;
  };
  
  _.fn.extend({
    <%= name %>_button: function() {
      return this.find('.<%= name %>:first');
    }
    
    ,<%= name %>_click: function() {
      
    }
  });
})(jQuery);
