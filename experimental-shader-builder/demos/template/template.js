// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  var compileTemplate, dataEditor, getSample, onInput, outputEditor, setupEditors, templateEditor;

  templateEditor = null;

  dataEditor = null;

  outputEditor = null;

  setupEditors = function() {
    var fontSize;
    fontSize = 16;
    templateEditor = ace.edit('template-editor');
    templateEditor.setTheme('ace/theme/monokai');
    templateEditor.getSession().setMode('ace/mode/glsl');
    templateEditor.getSession().setUseWrapMode(true);
    templateEditor.setFontSize(fontSize);
    templateEditor.on('input', onInput);
    dataEditor = ace.edit('data-editor');
    dataEditor.setTheme('ace/theme/monokai');
    dataEditor.getSession().setMode('ace/mode/javascript');
    dataEditor.getSession().setUseWrapMode(true);
    dataEditor.setFontSize(fontSize);
    dataEditor.on('input', onInput);
    outputEditor = ace.edit('output-editor');
    outputEditor.setTheme('ace/theme/monokai');
    outputEditor.getSession().setMode('ace/mode/glsl');
    outputEditor.getSession().setUseWrapMode(true);
    outputEditor.setReadOnly(true);
    return outputEditor.setFontSize(fontSize);
  };

  onInput = function() {
    var dataText, result, template, templateText;
    templateText = templateEditor.getValue();
    dataText = dataEditor.getValue();
    template = compileTemplate(templateText);
    result = template(JSON.parse(dataText));
    outputEditor.setValue(result);
  };

  compileTemplate = function(source) {
    var compileLine, templateCode;
    compileLine = function(line) {
      var replacedBegin, replacedEnd, trimmed;
      trimmed = line.trim();
      if (trimmed.length === 0) {
        return '';
      }
      if ((trimmed.indexOf('/*')) === 0 && (trimmed.lastIndexOf('*/')) === trimmed.length - 2) {
        return trimmed.slice(2, -2);
      } else {
        replacedBegin = trimmed.replace(/\/\*/g, '" +');
        replacedEnd = replacedBegin.replace(/\*\//g, '+ "');
        return "__str += \"" + replacedEnd + "\\n\";";
      }
    };
    templateCode = ((source.split('\n')).map(compileLine)).join('\n');
    templateCode = "var __str = '';\n" + templateCode + "\n return __str;";
    return new Function('data', templateCode);
  };

  getSample = function(name) {
    $.ajax({
      url: "samples/" + name + "/shader.frag",
      dataType: 'text'
    }).done(function(text) {
      return templateEditor.setValue(text, -1);
    });
    return $.ajax({
      url: "samples/" + name + "/config.json",
      dataType: 'text'
    }).done(function(text) {
      return dataEditor.setValue(text, -1);
    });
  };

  setupEditors();

  getSample('s1');

}).call(this);

//# sourceMappingURL=template.map