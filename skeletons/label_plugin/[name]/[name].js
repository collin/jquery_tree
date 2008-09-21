;(function(_) {
  _.inject_<%= name %>_dom = function() {
    _.tree_node.find('.labels').append(_.<%= name %>);
  }
  
  _.fn.extend({
    <%= name %>_label: function() {
      return this.find('<%= selector %>:first');
    }
  });
})(jQuery);
