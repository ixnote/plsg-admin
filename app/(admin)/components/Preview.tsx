import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.bubble.css';

type PreviewProps = {
  value: string;
  amountOfWords?: number;
};
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const Preview = ({ value, amountOfWords = 50 }: PreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const splittedText = value.split(' ');
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : value;
  const endText = splittedText.slice(amountOfWords - 1).join(' ');
  return (
    <p className=' text-lg'>
      {<QuillEditor value={beginText} theme='bubble' readOnly />}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span className={`${!isExpanded && 'hidden'}`}>
            {<QuillEditor value={endText} theme='bubble' readOnly />}
          </span>
          <span
            className='text-violet-400 ml-2'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'show less' : 'show more'}
          </span>
        </>
      )}
    </p>
  );
};

export default Preview;
