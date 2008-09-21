;(function(_) {
  _.inject_tag_name_dom = function() {
    _.dom_node.find('.element').append(_.tag_name_label);
  }
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
    
    ,edit_tag_name: function() {
      return this.edit_label({
        label: this.tag_label()
        ,input: _.tag_input
        ,default_value: 'div'
      });
    }
  });
})(jQuery);
