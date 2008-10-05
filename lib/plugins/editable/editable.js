;(function(_) {
  _.fn.interactive_editing = function(options) {
  
    var options = _.extend({
      navigation_selector: ''
      ,default_node_type: undefined
    }, options);
  
    function navigate() {
      var method = [].shift.apply(arguments)
        ,args = arguments;
        
      return node_and_input(function(node, input) {
        var found = _.fn[method].apply(node, args)
          ,label;
        if(found.is('ol')) found = found.children('.tree_node:first');
        label = found.find(options.navigation_selector+':first .'+input.attr('class')+':first')
        if(label.length) label.fn('edit');
        else found.fn('edit');
      });
    }
  
    return this
      .dblclick(function() {
        _(this)
          .create_node()
            .fn('edit');
      })
      .keybind('esc', function(e) {
        _(e.target).blur();
      })
      .keybind('enter', node_insert_and_edit('create_node_after'))
      .keybind('shift+enter', node_insert_and_edit('create_node'))
      .keybind('ctrl+up', navigate('prev', 'li'))
      .keybind('ctrl+down', navigate('next', 'li'))
      .keybind('ctrl+left', navigate('parent_node'))
      .keybind('ctrl+right', navigate('child_list'))
      .keybind('ctrl+shift+up', node_and_focus_input(function(node, input) {
        node.prev('li').before(node);
      }))
      .keybind('ctrl+shift+down', node_and_focus_input(function(node, input) {
        node.next('li').after(node);
      }))
      .keybind('ctrl+shift+left', node_and_focus_input(function(node, input) {
        node.parent_node().before(node);
        if(node.parent_node().child_list().blank()) node.parent_node().addClass('empty');
      }))
      .keybind('ctrl+shift+right', node_and_focus_input(function(node, input) {
        node.next().child_list().prepend(node);
        node.next().removeClass('empty');
      }));
  };

  _.tree.tree_node.children('span')
    .fn({
      edit: function() {
        var node = _(this).parent_node();
        node.edit_label({
          label: node.label()
          ,input: node.tree().data('tree.options').tree_node_input
          ,if_empty: function() {
            node.remove();  
          }
        });
      }
    })
    .click(function(e) {
      _(this).fn('edit');
    });

  _.tree.tree_node_input
    .hide()
    .keypress_size_to_fit()

  _.tree.init_editable_plugin = function(tree, options) {
    tree.interactive_editing( );
    options.tree_node_input = _.tree.tree_node_input.deep_clone(true);
  };
  
  function node_insert_and_edit(insertion_method) {
    return function(e) {
      var node = _(e.target).parent_node();
      node[insertion_method]().fn('edit');
    }
  }
  
  function node_and_input(fn) {
    return function(e) {
      var input = _(e.target)
        ,node = input.parent_node();
      fn(node, input, e);
    } 
  }
  
  function node_and_focus_input(fn) {
    return node_and_input(function(node, input, e) {
      fn(node, input, e);
      input.focus();
    });
  }
  
  _.fn.extend({
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
    edit_label: function(opts) {
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
          opts.commit && opts.commit.call(this, opts);
          
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
                .hide_if_empty();
            }
            else if(opts.remove_if_empty) {
              label
                .html(input.val())
                .remove_if_empty();
            }
            else if(opts.if_empty) {
              label
                .show()
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
  })
  
})(jQuery);
