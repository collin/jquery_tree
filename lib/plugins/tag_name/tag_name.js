;(function(_) {
  _.tree.tag_name_label.click(function(e) {
    e.preventDefault();
    _(this).fn('edit');
  });
  
  _.tree.init_tag_name_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.tag_name_label.deep_clone());
    _(document.body).append(_.tree.tag_name_input);
  }
  
  _.tree.tag_name_label.fn({
    edit: function() {
      var node = parent_node();
      return node.edit_label({
        label: node.tag_name_label()
        ,input: _.tag_name_input
        ,default_value: 'div'
      });
    }
  });
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
  });
})(jQuery);
