import React, { useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
// import { HStack } from 'native-base';

// Define types for the file structure
interface EditorFile {
  [key: string]: {
    name: string;
    language: string;
    value: string;
  };
}

// Initialize the files with type-safe values
const editorFile: EditorFile = {
  "script.java": {
    name: "script.java",
    language: "java",
    value: "public class Main {\n\tpublic static void main(String[] args) {\n\t System.out.println(\"Look at me coding\"); \n\t}\n}"
  }
};

export default function CodeEditor() {
  const [fileName, setFileName] = useState<string>("script.java");
  const editorRef = useRef<any>(null);
  const file = editorFile[fileName];

  function handleEditorDidMount(editor, monaco: Monaco) {
    editorRef.current = editor;

    // Register the Java language with syntax highlighting
    monaco.languages.register({ id: 'java' });

    // Provide basic autocomplete suggestions for Java
    monaco.languages.registerCompletionItemProvider('java', {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: 'System.out.println',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'System.out.println(${1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Prints a message to the console.',
          },
          {
            label: 'public',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'public ',
            documentation: 'Keyword for defining public access.',
          },
          {
            label: 'static',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'static ',
            documentation: 'Keyword for defining static methods or fields.',
          },
        ];
        return { suggestions: suggestions };
      }
    });
  }

  function getEditorValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <div className="Editor">
      <button onClick={() => getEditorValue()}>
        Get Value
      </button>
      <Editor
        height="400px"
        width="50%"
        theme="vs-light"
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        value={file.value}
      />
    </div>
  );
}
