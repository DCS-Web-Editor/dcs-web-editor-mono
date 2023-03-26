import { initialize } from "./src/miz-manager.js";

const aceEditor = ace.edit("editor");
ace.config.set("basePath", "https://dcs-web-editor.github.io/dcs-web-editor-mono/lib/ace");
ace.require("ace/ext-searchbox");
ace.require("ace/ext-themelist");
ace.require("ace/ext-modelist");
aceEditor.setTheme("ace/theme/cobalt");
aceEditor.session.setMode("ace/mode/lua");
aceEditor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
});

initialize(aceEditor, 'editor');