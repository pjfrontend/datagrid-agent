import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownComponentProps{
    markdown: string;
}

const MarkdownComponent = ({markdown}:MarkdownComponentProps) => {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;
