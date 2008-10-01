;(function(_){
  _.tree.tree_node.fn({
    paint: function(label) {
      return _(this).find('span:first').html(label);
    }
  });

  function defaults() {     
    return {
      node: _.tree.tree_node.deep_clone(true)
      ,plugins: ''
    };    
  }

  var inspection_class = 'inspected';

  _.fn.extend({
  
    is_tree: function(options) {
      options = _.extend(defaults(), options);
      options.plugins = options.plugins.split(/ /);
      
      var tree = this;
      tree.data('tree.options', options)
      
      _(options.plugins).each(function() {
        _.tree['init_'+this+'_plugin'].call(tree, tree, options);
      });
      
      return this
        .click(function(e) {
            var el = _(e.target)
              ,node = el.parent_node();
            
            if(el.is('input')) return;
            node.blur_all();
            _(options.plugins).each(function() {
              if(el.hasClass(this)) el[this+'_click'](el, node);
            });
            e.preventDefault();
          })
        .mouseover(function(e) {
            var node = _(e.target);
            tree.remove_class_on_all_children_and_self(inspection_class)
            if(!node.is('.tree_node')) node = node.parent_node();
            node.addClass(inspection_class);      
          });        
    }
    
    ,child_list: function() {
      if(this.is('ol')) return this;
      return this.find('ol:first');
    }
    
    ,tree: function() {
      if(this.hasClass('tree')) return this;
      return this.parents('.tree:first');
    }
    
    ,parent_node: function() {
      var node = this.parents('.tree_node:first');
      if(node.length) return node;
      return this.filter('.tree_node');
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
          if(opts.complete) {        
            _(document.body).append(input.hide());
            opts.complete();
          }
          else {
            _(document.body).append(input.hide());
            if(opts.default_value) {
              label
                .html(input.val() || opts.default_value)
                .show();
            }
            else if(opts.hide_if_empty) {      
              label
                .html(input.val())
                click.hide_if_empty();
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
          }
        });
      
      label.parent().length && opts.success && opts.success.call(label);
      
      setTimeout(function(){input.focus();}, 1);
      return this;
    }
    
    // assumes effen
    ,deep_clone: function(events) {
      var clone = this.clone(events)
        .mixin(this)
        .clear();
        
      this.children().each(function() {
        clone.append(_(this).deep_clone(events));
      });
      
      return clone;
    }
    
    ,create_node: function(contents) {
      var node = this.tree().data('tree.options').node.deep_clone();
      node.fn('paint', contents);
      this.removeClass('empty');
      this.child_list().append(node);
      return node;
    }
  });
})(jQuery);
