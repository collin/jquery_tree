;(function(_) {
  _.fn.extend({
    serialize_children_to_haml: function(indent) {
      if(indent === undefined) indent = '';
      else indent += '  ';
      return this
        .children()
          .map(function(){
            return _(this).fn('to_haml', indent);
          })
            .join('');
    }
  });
})(jQuery);
