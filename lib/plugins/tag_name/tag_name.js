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
    .whitelist(/[a-z\d]/)
    .keybind('tab',      function(e) { 
      e.preventDefault();
      _(this).next().fn('edit'); 
    })
    .keybind('shift+tab', function(e) {
      e.preventDefault(); 
      _(this).prev().fn('edit'); 
    });
  
  _.tree.init_tag_name_plugin = function(tree, options) {
    options.node.dom.find('.element').append(_.tree.tag_name_label.deep_clone(true));
    options.tag_name_input = _.tree.tag_name_input.clone(true);
  }
  
  _.tree.tag_name_label.fn({
    edit: function() {
      var node = _(this).parent_node();
      node.triggerHandler('edit_tag_name');
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
        ,autocomplete: {
          collection: _.tree.tag_names
        }
      });
    }
    
    ,to_haml: function() {
      return '%' + _(this).text();
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
