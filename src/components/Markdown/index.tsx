import BaseMarkdown from 'react-markdown';

type MarkdownProps = {
  source: string,
};
function Markdown({ source }: MarkdownProps) {
  return (
    <BaseMarkdown>{source}</BaseMarkdown>
  );
}

export default Markdown;
