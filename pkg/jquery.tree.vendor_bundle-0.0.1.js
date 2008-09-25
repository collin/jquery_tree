console.log('vendor/effen/jquery.fn.js');
(function($) {
  $.fn.fn = function() {
    var self = this;
    var extension = arguments[0], name = arguments[0];
    if (typeof name == "string") {
      return apply(self, name, $.makeArray(arguments).slice(1, arguments.length));
    } else {
      $.each(extension, function(key, value) {
        define(self, key, value);
      });
      return self;
    }
  }
  $.fn.mixin = function(element) {
    var methods = {},
      data = $.cache[$.data(element[0])],
      slot;
      
    for(slot in data)
      if(slot.match(/^fn\./))
        this.data(slot, data[slot]);
    
    return this;
  };
  function define(self, name, fn) {
    self.data(namespacedName(name), fn);
  };
  function apply(self, name, args) {
    var result;
    self.each(function(i, item) {
      var fn = $(item).data(namespacedName(name));
      if (fn)
        result = fn.apply(item, args);
      else
        throw(name + " is not defined");
    });
    return result;
  };
  function namespacedName(name) {
    return 'fn.' + name;
  }
})(jQuery);


console.log('vendor/jquery_extensions/jquery.extension.js');
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


console.log('vendor/jquery_keybinder/jquery.keybinder.js');
// Look, I'm like all the cool kids!
;(function(_) {
  _.special_keys = {
	  27:'esc',
	  9:'tab',
	  32:'space',
	  13:'enter',
	  8:'backspace',

	  145:'scroll_lock',
	  20:'caps_lock',
	  144:'num_lock',
	
	  19:'pause',
	
	  45:'insert',
	  36:'home',
	  46:'delete',
	  35:'end',
	
	  33:'page_up',

	  34:'page_down',

	  37:'left',
	  38:'up',
	  39:'right',
	  40:'down',

	  112:'f1',
	  113:'f2',
	  114:'f3',
	  115:'f4',
	  116:'f5',
	  117:'f6',
	  118:'f7',
	  119:'f8',
	  120:'f9',
	  121:'f10',
	  122:'f11',
	  123:'f12',
  };

  _.shift_nums = {
	  "`":"~",
	  "1":"!",
	  "2":"@",
	  "3":"#",
	  "4":"$",
	  "5":"%",
	  "6":"^",
	  "7":"&",
	  "8":"*",
	  "9":"(",
	  "0":")",
	  "-":"_",
	  "=":"+",
	  ";":":",
	  "'":"\"",
	  ",":"<",
	  ".":">",
	  "/":"?",
	  "\\":"|"
  };
  _.fn.extend({
    keybindings: function(bindings) {
      var old = this.data("__keybindings__") || {};
      if(bindings) {
        return this.data("__keybindings__", _.extend(old, bindings));
      } 
      return old;
    }
    
    ,keybind: function(binding, fn) {
      var bindings = {}
        ,that = this;
      bindings[binding] = fn;
      this.keybindings(bindings);
      if(!this.data("__keybound__")) {
        this.data("__keybound__", true);
        this.keydown(function(e){
          var bindings = that.keybindings()
            ,binding
            ,keys
            ,modified
            ,matched
            ,modKeys = 'shift ctrl alt'.split(/ /)
            ,key
            ,requested_presses
            ,presses; 
          
          if(_.special_keys[e.keyCode]) key = _.special_keys[e.keyCode];        
          else if(e.keyCode == 188) key=","; //If the user presses , when the type is onkeydown
			    else if(e.keyCode == 190) key="."; //If the user presses , when the type is onkeydown
          else if(e.charCode != 0) key = String.fromCharCode(e.charCode); 
          
          for(binding in bindings) {
            presses = 0;
            requested_presses = binding.split('+').length;
            modified = true;
            _(modKeys).each(function() {
              // false if the modifier is wanted, but it isn't given
              if(binding.match(this) !== null) modified = e[this+"Key"];
              if(e[this+"Key"]) presses++;
              //console.log(binding.match(this) !== null, this, binding, modified, e[this+"Key"])
            });
            keys = binding.replace(/shift|ctrl|alt|meta/, '').split(/\++/);
            matched = false;
            _(keys).each(function() {
              if(this !== "") 
                if(this == key) {
                  matched = true;
                  presses++;
                }
            });
            if(modified && matched && presses === requested_presses) {
              bindings[binding].call(this, e);
              e.preventDefault();
              break;
            }
          }
        });
      }
      return this;
    }
  });  
})(jQuery);
