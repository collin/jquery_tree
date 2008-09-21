;(function(_){
  _.tree = {
    button_plugins: []
    
    ,label_plugins: []    
    
    ,node: _.tree_node
    
    ,use_button_plugins: function(names) {
      _(names.split(/ |,/)).each(function() {
        _.button_plugins.push(this);
        _["inject_"+this+"_dom]"();
      });
    }
  };

  _.fn.extend({
    child_list: function() {
      if(this.is('ol')) return this;
      return this.find('ol:first');
    }
    
    ,parent_node: function() {
      var node = this.parents('.tree_node:first');
      if(node.length) return node;
      return this.filter('.tree_node');
    }
    
    ,is_tree: function() {
      return this.click(function(e) {
        var el = _(e.target)
          ,node = el.parent_node();
        
        if(el.is('input')) return;
        node.blur_all();
        _.tree.button_plugins.each(function() {
          if(el.hasClass(this)) el[this+'_click'](el, node);
        });
      }        
    }
/*
  label: the jqueried label
  input: the jqueried input elment

  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/
    ,edit_label: function(opts) {
      var label = opts.label
        ,input = opts.input;

      _(document.body).blur_all();
      input.val(label.text());
      
      if(opts.do_not_hide_label) label.clear().css('display', '');
      else label.hide();
      
      label[opts.insertion_method || 'after'](input.show());
     
      input
        .size_to_fit()
        .one('blur', function() {
          _(document.body).append(input.hide());
          if(opts.default_value) {
            label
              .html(input.val() || opts.default_value)
              .show();
          }
          else if(opts.hide_if_empty) {      
            label
              .html(input.val())
              .hide_if_empty();
          }
          else if(opts.remove_if_empty) {
            label
              .html(input.val())
              .remove_if_empty();
          }
          else if(opts.if_empty) {
            label
              .html(input.val())
              .if_empty(opts.if_empty);
          }
          else {
            label.html(input.val());
          }
        });
      
      label.parent().length && opts.success && opts.success.call(label);
      
      setTimeout(function(){input.focus();}, 1);
      return this;
    }
  });
})(jQuery);
