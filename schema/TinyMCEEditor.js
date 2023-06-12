import { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ initialValue, onChange }) => {
  const handleEditorChange = (content, editor) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="gzxj790aiwcrlarflyb5uk8bhzdneuymzm272uz52h1yc0dz"
      initialValue={initialValue}
      init={{
        height: 100,
        plugins: 'paste link',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link',
        menubar: false,
        content_style: 'body { font-family: Arial, sans-serif; font-size: 14px }',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
