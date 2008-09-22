;(function(_) {
  _.inject_tag_name_dom = function() {
    _.dom_node.find('.element').append(_.tag_name_label);
    _(document.body).append(_.tag_name_input);
  }
  
  _.tag_name_label.fn({
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
