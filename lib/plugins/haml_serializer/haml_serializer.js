;(function(_) {

  _.tree.tree_node.fn({
    to_haml: function() {
      return _(this).label().text()
    }
  });

  _.fn.extend({
    serialize_children_to_haml: function(indent) {
      return this
        .children()
          .map(function(){
            return _(this).fn('to_haml', indent+'  ');
          })
            .join('');
    }
  });
})(jQuery);
