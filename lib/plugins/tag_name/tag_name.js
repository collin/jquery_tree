;(function(_) {
  _.inject_tag_name_dom = function() {
    _.tree_node.find('.labels').append(_.tag_name_label);
  }
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
  });
})(jQuery);
