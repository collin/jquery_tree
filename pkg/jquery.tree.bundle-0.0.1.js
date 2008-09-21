;(function(_){
  _.create_element = function(tag) {
    return _('<'+tag+'>');
  };

  _.fn.extend({
    'join': function() {
      return [].join.apply(this, arguments);
    }

    ,hide_if_empty: function() {
      return this.if_empty(function(){this.hide();});
    }
    
    ,id: function() {
      return this.attr('id');
    }
    
    ,tag_name: function() {
      return this.attr('tagName').toLowerCase();
    }
    
    ,classes: function() {
      var classes = this.attr('class');
      if(classes == '') return [];
      return classes.split(/ /);  
    }
    
    ,not_empty: function() {
      return this.removeClass('empty');
    }
    
    ,clear: function() {
      return this.html('');
    }
    
    ,remove_class_on_all_children_and_self: function(cls) {
      this.find('.'+cls).removeClass(cls);
      this.removeClass(cls);
      return this;
    }
    
    ,dragstart: function(fn) {
      return this.bind('dragstart', fn);
    }
    
    ,dragend: function(fn) {
      return this.bind('dragend', fn);
    }
    
    ,size_to_fit: function() {
      return this.attr('size', this.val().length || 1);
    }
    
    ,keyup_size_to_fit: function() {
      return this.keyup(function(e) {
        _(this).size_to_fit();
      });
    }

    ,blank: function() {
      return this.text().match(/^\s*$/);
    }  
    ,remove_if_empty: function() {
      return this.if_empty(function() {this.remove();});
    }
    
    ,if_empty: function(fn) {
      if(this.html() === "") fn.call(this);
      return this;
    }
    
    ,blur_all: function() {
      this.find('input').blur();
      return this;
    }
    
    ,log: function() {
      console.log(this[0]);
      return this;
    }
  });
})(jQuery);


;(jQuery(function() {
  jQuery("head").append("<style>.tree{font-size:.7em;font-family:sans-serif}.tree .tree_node.dragging{position:absolute;border:1px outset;background-color:white !important;z-index:10000000000}.tree .tree_node.inspected> button.toggle{background-image:url(/icons/close.png)}.tree .tree_node .toggle{border:none;background:none;width:16px;height:16px;display:inline;float:left;position:relative;top:2px;top:4px}.tree .tree_node .toggle.closed{background-image:url(/icons/open.png)}.tree .tree_node.empty > button.toggle{visibility:hidden}.tree ol,.tree ul{list-style:none}.tree ol{white-space:nowrap;background-color:white;padding:0}.tree ol .inspected{background-color:#fcc}.tree ol .inspected .tree_node{background-color:white}.tree ol li{white-space:nowrap;display:block;clear:both;padding-left:10px;margin-left:0px}.tree.inspected> button.toggle{background-image:url(/icons/close.png)}.tree .toggle{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;width:16px;height:16px}.tree .toggle.closed{background-image:url(/icons/open.png)}.tree.empty > button.toggle{visibility:hidden}li.inspected> button.disable{background-color:transparent;background-image:url(/icons/block.png)}li button.disable{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px}li button.disable.active{background-image:url(/icons/active_block.png)}li.inspected> button.destroy{background-color:transparent;background-image:url(/icons/destroy.png)}li button.destroy{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px;opacity:.5}li button.destroy:hover{opacity:1}</style>");
}));

jQuery.tree_node = jQuery("<li class='tree_node empty'>  <div class='labels'></div>  <ol></ol></li>");

jQuery.toggle_button = jQuery("<button class='toggle'></button>");

jQuery.disable_button = jQuery("<button class='disable'></button>");

jQuery.destroy_button = jQuery("<button class='destroy'></button>");

jQuery.tag_name_button = jQuery("<button class='tag_name'></button>");

jQuery.tag_name_input = jQuery("<input type='text'>.tag_name</input>");

jQuery.tag_name_label = jQuery("<label/>");

;(function(_) {
  var closed_class = 'closed'
    ,open_event = 'expand'
    ,close_event = 'collapse';
  _.tree.animate = true;
  
  _.inject_toggle_dom = function() {
    _.tree_node.prepend(_.toggle_button);
  }
  
  _.fn.extend({
    toggle_button: function() {
      return this.find('.toggle:first');
    }
    
    ,toggle_click: function(el, node) {
      if(el.hasClass(closed_class)) {
        node.trigger(expand_event);
        node.expand_children(_.tree.animate);
      }
      else
        node.trigger(collapse event);
        node.collapse_children(_.tree.animate);
    }

    ,collapse_children: function(slide) {
      if(slide)
        this.child_list().slideUp();
      else
        this.child_list().hide();
      this.toggle_button().addClass(closed_class);
      return this;
    }
    
    ,expand_children: function(slide) {
      if(slide)
        this.child_list().slideDown();
      else
        this.child_list().show();
      this.toggle_button().removeClass(closed_class);
      return this;
    }
  });
})(jQuery);


;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.inject_disable_dom = function() {
    _.tree_node.prepend(_.disable_button]);
  }
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class) node.trigger(disable_event);
      else                    node.trigger(enable_event);    
    }
  });
})(jQuery);


;(function(_) {
  var destroy_event = 'destroy'

  _.inject_destroy_dom = function() {
    _.tree_node.prepend(_.destroy_button]);
  }
  
  _.fn.extend({
    destroy_button: function() {
      return this.find('.destroy:first');
    }
    
    ,destroy_click: function(el, node) {
      node.trigger(destroy_event);
      node.remove();
    }
  });
})(jQuery);


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


;(function(_){
  _.tree = {
    button_plugins: []
    
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
