;(function(_) {
  _.inject_<%= name %>_dom = function() {
    _.tree_node.prepend(_.<%= name %>_button);
  }
  
  _.fn.extend({
    <%= name %>_button: function() {
      return this.find('.<%= name %>:first');
    }
    
    ,<%= name %>_click: function() {
      
    }
  });
})(jQuery);
