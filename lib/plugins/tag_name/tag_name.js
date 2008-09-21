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
  
  _.tag_input
    .keyup_size_to_fit()
    .keybind('tab', edit_id)
    .keybind('shift+3', edit_id)
    .keybind('space', edit_id)
    .keybind('shift+tab', edit_classes)
    .keybind('.', edit_classes)
    .blur(function(e) {
        var _this = _(this)
          ,node = _this.parent_node()
          ,dom_element = node.dom_element()
          ,new_el
          ,tag_name = _this.val();
        // blur handlers get out of order
        
          if(dom_element.length) return dom_element.swap_tag(tag_name);
          node.create_dom_element(tag_name);
      })
    .autocompleteArray(_.elements, {
        autoFill: true
        ,delay: 0
        ,mustMatch: true
        ,selectFirst: true
        ,onAutofill: function(input) {
          input.size_to_fit();
        }
      });

})(jQuery);
