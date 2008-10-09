;(jQuery(function() {
  jQuery("head").append("<style>.tree{list-style:none;padding:0px;margin:0px;font-size:12px;font-family:monospace}.tree .tree_node{line-height:20px;padding-left:10px;white-space:nowrap;display:block;clear:both;margin-left:0px}.tree input{border:2px solid black;border-top:0;border-bottom:0;margin:0;padding:0;-moz-border-radius:5px;padding-left:5px;background-color:#fffaaa;font-size:12px;font-family:monospace}.tree .inspected{background-color:#fcc}.tree .inspected .tree_node{background-color:white}.tree .disabled div,.tree .disabled div *{opacity:.5}.tree ol,.tree ul{list-style:none}.tree ol{white-space:nowrap;background-color:white;padding:0}.tree .inspected> button.toggle{background-image:url(icons/close.png)}.tree .empty button.toggle{background:none}.tree .toggle{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;width:16px;height:16px;top:2px}.tree .toggle.closed{background-image:url(icons/open.png) !important}.tree.empty > button.toggle{visibility:hidden}li.inspected> button.disable{background-color:transparent;background-image:url(icons/block.png)}li button.disable{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px}li button.disable.active{background-image:url(icons/active_block.png)}li.inspected> button.destroy{background-color:transparent;background-image:url(icons/small_cross.png)}li button.destroy{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px;opacity:.5}li button.destroy:hover{opacity:1}li.tree_node label{display:inline}li.tree_node label,li.tree_node input.tag_name{color:blue;font-weight:bold}li.tree_node .element{display:inline;position:relative;line-height:20px}li.tree_node .element:before,li.tree_node .element:after{color:#999}li.tree_node .element:before{content:\"<\"}li.tree_node .element:after{content:\">\"}li.tree_node .element *{cursor:text}li.tree_node .id{display:inline;color:red}li.tree_node .id:before,li.tree_node .id_input:before{content:\"#\"}li.tree_node .classes{color:green}li.tree_node ul.classes{display:inline;padding:0;margin:0}li.tree_node ul.classes li{padding:0;margin:0;background:transparent;display:inline}li.tree_node ul.classes li:before{content:\".\";color:black;font-weight:bold}li.tree_node input.attr{color:blue}li.tree_node input.value{color:red}li.tree_node .attributes,li.tree_node dd,li.tree_node dt{display:inline;margin:0;padding:0}li.tree_node .attributes> li,li.tree_node dd> li,li.tree_node dt> li{margin:0;padding:0;display:inline}li.tree_node dt{color:blue;margin-left:.3em}li.tree_node dt:after{content:\"=\";color:black}li.tree_node dd{color:red}li.tree_node dd:before,li.tree_node dd:after{content:'\"';color:black}li.tree_node .source{display:inline;position:relative;line-height:20px}li.tree_node .source *{cursor:text}</style>");
}));

if(!jQuery.tree) jQuery.tree = {};

jQuery.tree.tree_node = jQuery("<li class='tree_node empty'>  <span class='label'></span>  <ol></ol></li>");

jQuery.tree.toggle_button = jQuery("<button class='toggle'></button>");

jQuery.tree.disable_button = jQuery("<button class='disable'></button>");

jQuery.tree.destroy_button = jQuery("<button class='destroy'></button>");

jQuery.tree.tag_name_button = jQuery("<button class='tag_name'></button>");

jQuery.tree.tag_name_input = jQuery("<input class='tag_name' type='text' />");

jQuery.tree.tag_name_label = jQuery("<label class='tag_name'></label>");

jQuery.tree.dom_node = jQuery("<li class='tree_node empty'>  <div class='element'></div>  <ol></ol></li>");

jQuery.tree.id_input = jQuery("<input class='id' type='text' />");

jQuery.tree.id_label = jQuery("<div class=\"id\"/>");

jQuery.tree.classes_input = jQuery("<input class='classes' type='text' />");

jQuery.tree.classes_label = jQuery("<ul class=\"classes\"/>");

jQuery.tree.attributes_label = jQuery("<dl class=\"attributes\"></dl>");

jQuery.tree.attribute_label = jQuery("<li><dt/><dd/></li>");

jQuery.tree.attr_input = jQuery("<input class='attr' type='text' />");

jQuery.tree.value_input = jQuery("<input class='value' type='text' />");

jQuery.tree.tree_node_input = jQuery("<input class='tree_node' type='text' />");

jQuery.tree.code_node_label = jQuery("");

jQuery.tree.code_node_input = jQuery("<input class='code_node' type='text' />");

jQuery.tree.code_node = jQuery("<li class='code_node empty'>  <div class='source'></div>  <ol></ol></li>");

jQuery.tree.tree_node_input = jQuery("<input class='label' type='text' />");

console.log('lib/plugins/toggle/toggle.js');
;(function(_) {
  var closed_class = 'closed'
    ,expand_event = 'expand'
    ,collapse_event = 'collapse';
  _.tree.animate = true;
  
  _.tree.init_toggle_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.toggle_button.deep_clone(true));
    return this;
  };
  
  _.fn.extend({
    toggle_button: function() {
      return this.find('.toggle:first');
    }
    
    ,toggle_click: function(el, node) {
      if(el.hasClass(closed_class)) {
        node.trigger(expand_event);
        node.expand_children(_.tree.animate);
      }
      else {
        node.trigger(collapse_event);
        node.collapse_children(_.tree.animate);
      }
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


console.log('lib/plugins/disable/disable.js');
;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.tree.init_disable_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.disable_button.deep_clone(true));
    return this;
  };
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class)) 
        node
          .addClass('disabled')
          .trigger(disable_event);
      else 
        node
          .removeClass('disabled')
          .trigger(enable_event); 
    }
  });
})(jQuery);


console.log('lib/plugins/destroy/destroy.js');
;(function(_) {
  var destroy_event = 'destroy'

  _.tree.init_destroy_plugin = function(tree, options) {
    var slot;
    for(slot in options.node)
      options.node[slot].prepend(_.tree.destroy_button.deep_clone(true));
    return this;
  };
  
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


console.log('lib/plugins/tag_name/tag_name.js');
;(function(_) {
  _.tree.tag_name_label.click(function(e) {
    _(this).fn('edit');
  });
  
  jQuery.fn.whitelist = function(expr) {
    return this.keypress(function(e) {
      if( e.charCode > 0 
      && !String.fromCharCode(e.which).match(expr)) e.preventDefault();
    })
  }
  
  _.tree.tag_name_input
    .hide()
    .keypress_size_to_fit()
    .whitelist(/[a-z]/)
    .keybind('tab',      function() { _(this).next().fn('edit'); })
    .keybind('shift+tab', function() { _(this).prev().fn('edit'); });
  
  _.tree.init_tag_name_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.tag_name_label.deep_clone(true));
    options.tag_name_input = _.tree.tag_name_input.clone(true);
  }
  
  _.tree.tag_name_label.fn({
    edit: function() {
      var node = _(this).parent_node();
      return node.edit_label({
        label: node.tag_name_label()
        ,input: node.tree().data('tree.options').tag_name_input
        ,default_value: 'div'
        ,commit: function(options) {
          var _this = _(this);
          if(!_this.val().match(_.tree.tag_names_regex)) {
            console.warn(_this.val(), "is not a valid tag name");
            _this.val(options.default_value);
          }
        }
      });
    }
  });
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
  });
  
  _.tree.tag_names = "A,ABBR,ACRONYM,ADDRESS,APPLET,AREA,B,BASE, BASEFONT,BDO,BIG,BLOCKQUOTE,BODY,BR,BUTTON,CAPTION,CENTER,CITE,CODE,COL, COLGROUP,DD,DEL,DFN,DIR,DIV,DL,DT,EM,FIELDSET,FONT,FORM,FRAME, FRAMESET,H1,H2,H3,H4,H5,H6,HEAD,HR,HTML,I,IFRAME,IMG,INPUT,INS,ISINDEX,KBD,LABEL,LEGEND,LI,LINK,MAP,MENU,META, NOFRAMES, NOSCRIPT,OBJECT,OL, OPTGROUP,OPTION,P,PARAM,PRE,Q,S,SAMP,SCRIPT,SELECT,SMALL,SPAN,STRIKE,STRONG,STYLE,SUB,SUP,TABLE,TBODY,TD, TEXTAREA,TFOOT,TH,THEAD,TITLE,TR,TT,U,UL,VAR".toLowerCase().split(',');
  _.tree.tag_names_regex = new RegExp('^('+_.tree.tag_names.join('|')+')$');
})(jQuery);


console.log('lib/plugins/dom_node/dom_node.js');
;(function(_) {
  _.tree.dom_node.fn({
    edit: function() {
      var _this = _(this);
      _this.tag_name_label().fn('edit');
      return _this;
    }
    
    ,paint: function(data) {
      var _this = _(this)
        ,defaults = _.extend({}, {
          tag_name: 'div'
          ,id: ''
        })
        ,data = _.extend(defaults, data);
      
      //if(_this.child_list().children().length) _this.remove_class('empty');
      
      _this.tag_name_label().html(data.tag_name);
      _this.id_label().html(data.id).hide_if_empty();
      if(data.classes)
        _this.class_list().append(_.array_to_classes_dom(data.classes));
      if(data.attributes)
        _this.attribute_list().append(_.object_to_attributes_dom(data.attributes));
      return _this;
    }
  });
})(jQuery);


console.log('lib/plugins/id/id.js');
;(function(_) {
  _.tree.id_label.click(function(e) {
    e.preventDefault();
    _(this).fn('edit');
  });
  
  _.tree.id_input
    .hide()
    .keypress_size_to_fit()
    .whitelist(/[a-z-_\d]/)
    .keybind('tab',      function() { _(this).next().fn('edit'); })
    .keybind('shift+tab', function() { _(this).prev().prev().fn('edit'); });
  
  _.tree.init_id_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.id_label.deep_clone(true));
    options.id_input = _.tree.id_input.clone(true);
  };

  _.tree.id_label.fn({
    edit: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = _(this).parent_node();
      return node.edit_label({
        label: node.id_label()
        ,input: node.tree().data('tree.options').id_input
        ,hide_if_empty: true
        ,do_not_hide_label: true
      });
    }
  });
  
  _.fn.extend({
    id_label: function() {
      return this.find('.id:first');
    }
  });
})(jQuery);


console.log('lib/plugins/classes/classes.js');
;(function(_) {
  _.tree.classes_label.click(function(e) {
    e.preventDefault();
    _(this).edit_class(_(e.target));

  });
  
  _.tree.classes_input
    .hide()
    .keypress_size_to_fit()
    .whitelist(/[a-z-_\d]/)
    .keybind('tab', function() { 
      var _this = _(this);
      _this.parent().next_class(_this.prev());
    })
    .keybind('shift+tab', function() { 
      var _this = _(this);
      _this.parent().previous_class(_this.prev());
    });
      
  _.tree.init_classes_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.classes_label.deep_clone(true));
    options.classes_input = _.tree.classes_input.clone(true);
  };

  _.tree.classes_label.fn({
    edit: function(last) {
      var _this = _(this);
      if(last) {
        var last_class = _this.parent_node().last_class();
        if(last_class.length) return _this.edit_class(last_class);
      }
      else {
        var first_class = _this.parent_node().first_class();
        if(first_class.length) return _this.edit_class(first_class);
      }
      
      return _this.new_class();    
    }
  });
  
  _.fn.extend({
    class_list: function() {
      return this.find('.classes:first');
    }

    ,edit_class: function(cls) {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = this.parent_node();
      return node.edit_label({
        label: cls
        ,input: node.tree().data('tree.options').classes_input
        ,remove_if_empty: true
        ,do_not_hide_label: true
      });    
    }
  
    ,new_class: function() {
      var cls = _('<li>');
      this.parent_node().class_list().append(cls);
      return this.edit_class(cls);
    }
  
    ,previous_class: function(cls) {
      var prev = cls.prev('li');
      if(prev.length) return this.edit_class(prev);
      return this.prev().fn('edit');
    }
    
    ,next_class: function(cls) {
      var next = cls.next().next();
      if(next.length) return this.edit_class(next);
      return this.next().fn('edit');
    }
  
    ,class_string: function() {
      var classes = this.class_list().children().map(function() {
        var _this = _(this);
        if(_this.is('input')) return _this.val(); 
        return _this.text();    
      });
      return classes.join(' ');
    }
    
    ,classes_to_dom: function() {
      var dom = _.array_to_classes_dom(this.classes());
      return dom[0] === document ? null : dom;
    }
  
    ,last_class: function() {
      return this.class_list().find('li:last');
    }
    
    ,first_class: function() {
      return this.class_list().find('li:first');
    }
  });
  
  _.array_to_classes_dom = function(array) {
    return _(array.map(function(cls) {
      return '<li>'+cls+'</li>';
    }).join(''));
  }
})(jQuery);


console.log('lib/plugins/attributes/attributes.js');
;(function(_) {
  _.tree.attributes_label.click(function(e) {
    e.preventDefault();
    var el = _(e.target)
      ,_this = _(this)
      ,attr = el.parent();
    if(el.is('dt')) _this.edit_attr(attr);
    if(el.is('dd')) _this.edit_value(attr); 
  });
 
  function edit_value() { 
    var _this = _(this);
    _this.parent_node().edit_value(_this.parent());
  }
 
  _.tree.attr_input
    .hide()
    .whitelist(/[a-z-_]/)
    .keypress_size_to_fit()
    .keybind('tab', edit_value)
    .keybind('shift+tab', function() { 
      var _this = _(this);
      _this.parent_node().previous_attr(_this.parent());
    })
    .keybind('space', edit_value)
    .keybind('=', edit_value);
    console.warn('keybinding "=" not working');
 
  _.tree.value_input
    .hide()
    .keypress_size_to_fit()
    .keybind('tab', function() {  
      var _this = _(this);
      _this.parent_node().next_attr(_this.parent());
    })
    .keybind('shift+tab', function() {
      var _this = _(this);
      _this.parent_node().edit_attr(_this.parents('li:first'));
    });
  
  _.tree.init_attributes_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.attributes_label.deep_clone(true));
    options.attr_input = _.tree.attr_input.clone(true);
    options.value_input = _.tree.value_input.clone(true);
  };
    
  _.tree.attributes_label.fn({
    edit: function() {
      var _this = _(this)
        ,first_attr = _this.find('li:first');
      
      if(first_attr.length) return _this.edit_attr(first_attr);
      
      return _this.new_attr();  
    }
  });
  
  _.fn.extend({
    attribute_list: function() {
      return this.find('.attributes:first');
    }
    
    ,new_attr: function() {
      var attr = _('<li><dt class="attr"><dd class="value"></li>');
      this.append(attr);
      return this.edit_attr(attr);
    }
    
    ,previous_attr: function(attr) {
      var prev = attr.prev('li');
      if(prev.length) return this.edit_value(prev);
      attr.parent().prev().fn('edit', 'last');
    }
    
    ,next_attr: function(attr) {
      var next = attr.parent().next('li');
      if(next.length) return this.edit_attr(next);
      return this.attribute_list().new_attr();
    }
    
    ,edit_attr: function(label) {
      return this.edit_label({
        label: label.find('dt')
        ,input: label.tree().data('tree.options').attr_input
        ,insertion_method: 'before'
        ,if_empty: function() {this.parent().remove()}
        ,do_not_hide_label: true
      });
    }
    
    ,edit_value: function(label) {
      return this.edit_label({
        label: label.find('dd')
        ,input: label.tree().data('tree.options').value_input
        ,insertion_method: 'append'
        ,do_not_hide_label: true
      });
    }    
    
    ,attributes_to_dom: function() {
      var attrs = {} 
      
      _(this[0].attributes).each(function(which, attr) {
        if(!this.name.match(/^(id|class)$/)) {
          attrs[this.name] = this.value;
        }
      });
      
      var dom = _.object_to_attributes_dom(attrs);
      return dom[0] === document ? null : dom; 
    }
  });
  
  _.object_to_attributes_dom = function(object) {
    var dom_string = "", slot;
    for(slot in object)
      dom_string += '<li><dt class="attr">'+slot+'</dt><dd class="value">'+object[slot]+'</dd></li>';
    return _(dom_string);
  };
})(jQuery);


console.log('lib/plugins/html_editor/html_editor.js');
;(function(_) {

  function new_class() {
    _(this).parent().new_class();
  }

  function edit_id() {
    _(this).id_label().fn('edit');
  }
  
  function edit_tag_name() {
    _(this).tag_name().fn('edit');
  }
  
  function bind_input_listeners(options) {
    with(options) {
      classes_input
        .keybind('<', edit_tag_name)
        .keybind('#', edit_id)
        .keybind('.', new_class)
        .keybind(',', new_class)
        .keybind('space', new_class);
      id_input
        .keybind('<', edit_tag_name)
        .keybind('.', new_class);
      tag_name_input
        .keybind('<', edit_tag_name)
        .keybind('#', edit_id)
        .keybind('.', new_class);
      attr_input
        .keybind('#', edit_id)
        .keybind('<', edit_tag_name);
    }
  }


  _.tree.init_html_editor_plugin = function(tree, options) {
    var html_editor_plugins = 'tag_name id classes attributes'.split(/ /);
    options.plugins = options.plugins.concat(html_editor_plugins);
    options.node.dom = _.tree.dom_node.deep_clone(true);
    tree.init_tree_plugins(html_editor_plugins, options);
    bind_input_listeners(options);
    tree.interactive_editing({
      navigation_selector: '.element:first'
    });
  };
})(jQuery);


console.log('lib/plugins/code_editor/code_editor.js');
/*

a = 1
b = 3

for simple codez like this:
operands
  ==, ===, !==, ||, &&, +, -, *
assignment
  =
if
unless
else
objects in scope
fun() {}
def
dot.access
.implied_access
#{interpolation} -> .#{}
@ttributes
&
:events
= fall through javascript?
- eval javascript?
$

*/

;(function(_) {
  _.tree.init_code_editor_plugin = function(tree, options) {
  
  };
})(jQuery);


console.log('lib/plugins/editable/editable.js');
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


console.log('lib/plugins/code_node/code_node.js');
;(function(_) {
  _.tree.code_node.fn({
    edit: function() {
    }
    
    ,paint: function(data) {
      var _this = _(this)
    }
  });
})(jQuery);


console.log('lib/bubble_custom_event.js');
// PATCH http://dev.jquery.com/attachment/ticket/3379/bubble.patch
;(function() {

function now() { return +new Date; }
var expando = "jQuery" + now();

jQuery.event.trigger = function(type, data, elem, donative, extra) {
    // Clone the incoming data, if any
    data = jQuery.makeArray(data);

    if ( type.indexOf("!") >= 0 ) {
            type = type.slice(0, -1);
            var exclusive = true;
    }

    // Handle a global trigger
    if ( !elem ) {
            // Only trigger if we've ever bound an event for it
            if ( this.global[type] )
                    jQuery.each( jQuery.cache, function(){
                            if ( this.events && this.events[type] )
                                    jQuery.event.trigger( type, data, this.handle.elem );
                    });

    // Handle triggering a single element
    } else {
            // don't do events on text and comment nodes
            if ( elem.nodeType == 3 || elem.nodeType == 8 )
                    return undefined;

            var val, ret, fn = jQuery.isFunction( elem[ type ] || null ),
                    // Check to see if we need to provide a fake event, or not
                    event = !data[0] || !data[0].preventDefault;

            // Pass along a fake event
            if ( event ) {
                    data.unshift({
                            type: type,
                            target: elem,
// PATCH http://dev.jquery.com/attachment/ticket/3379/bubble.patch
                            _preventDefault: null,
                            _stopPropagation: null,
                            preventDefault: function(){ this._preventDefault = true; },
                            stopPropagation: function(){ this._stopPropagation = true; },
// END PATCH
// Doesn't work             timeStamp: now()
                    });
                    data[0][expando] = true; // no need to fix fake event
            }

            // Enforce the right trigger type
            data[0].type = type;
            if ( exclusive )
                    data[0].exclusive = true;


            // Trigger the event, it is assumed that "handle" is a function
            var handle = jQuery.data(elem, "handle");
// PATCH http://dev.jquery.com/attachment/ticket/3379/bubble.patch
            if ( handle )  
            val = handle.apply( elem, data ); 
 		             
            // handle the bubble if need be 
	          if (data[0]._stopPropagation !== true && val !== false && elem.parentNode)  
	            jQuery.event.trigger( type, data, elem.parentNode ); 
	             
	          if (data[0]._preventDefault === true) donative == false; 
// END PATCH
            // Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
            if ( (!fn || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
                    val = false;

            // Extra functions don't get the custom event object
            if ( event )
                    data.shift();

            // Handle triggering of extra function
            if ( extra && jQuery.isFunction( extra ) ) {
                    // call the extra function and tack the current return value on the end for possible inspection
                    ret = extra.apply( elem, val == null ? data : data.concat( val ) );
                    // if anything is returned, give it precedence and have it overwrite the previous value
                    if (ret !== undefined)
                            val = ret;
            }

            // Trigger the native events (except for clicks on links)
            if ( fn && donative !== false && val !== false && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
                    this.triggered = true;
                    try {
                            elem[ type ]();
                    // prevent IE from throwing an error for some hidden elements
                    } catch (e) {}
            }

            this.triggered = false;
    }

    return val;
};
})();
console.warn('PATCHED bubble custom event')


console.log('lib/tree.js');
;(function(_){
  _.tree.tree_node.fn({
    edit: function() {
      var _this = _(this);
      _this.label().fn('edit');
      return _this;
    }

    ,paint: function(label) {
      return _(this).label().html(label);
    }
  });

  function defaults() {
    return {
      node: {
        basic: _.tree.tree_node.deep_clone(true)
      }
      ,plugins: ''
    };
  }

  var inspection_class = 'inspected';

  _.fn.extend({
    init_tree_plugins: function(plugins, options) {
      var tree = this;
      _(plugins).each(function() {
        _.tree['init_'+this+'_plugin'].call(tree, tree, options);
      });
    }

    ,label: function() {
      return this.children('span:first');
    }

    ,is_tree: function(options) {
      options = _.extend(defaults(), options);
      options.plugins = options.plugins.split(/ /);

      var tree = this;
      tree
        .data('tree.options', options)
        .init_tree_plugins(options.plugins, options);

      return this
        .click(function(e) {
            e.preventDefault();
            var el = _(e.target)
              ,node = el.parent_node();

            if(el.is('input')) return;
            _(options.plugins).each(function() {
              if(el.hasClass(this))
                if(el[this+'_click'])
                  el[this+'_click'](el, node);
            });
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

    ,create_node_after: function(contents) {
      var node = this._create_node(contents);
      this.after(node);
      return node;
    }

    ,create_node: function(contents) {
      var node = this._create_node(contents);
      this
        .removeClass('empty')
        .child_list()
          .append(node);
      return node;
    }

    ,_create_node: function(contents, type) {
      if(!type) type = 'basic'
      var node = this.tree().data('tree.options').node[type].deep_clone(true);
      node.fn('paint', contents);
      return node;
    }
  });
})(jQuery);
