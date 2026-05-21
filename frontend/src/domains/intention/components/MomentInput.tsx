import React, { useState } from 'react';

interface MomentInputProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
}

const MomentInput: React.FC<MomentInputProps> = ({ 
  onSubmit, 
  placeholder = '此刻的想法...' 
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="
            w-full p-4 pr-12
            bg-moonlight-soft/50
            backdrop-blur-sm
            border border-nordic-fog/20
            rounded-xl
            text-jade-white/90
            placeholder-nordic-fog/40
            resize-none
            focus:outline-none
            focus:border-nordic-fog/50
            focus:ring-2 focus:ring-nordic-fog/20
            transition-all duration-300
            min-h-[80px]
          "
          rows={3}
        />
        
        <button
          type="submit"
          disabled={!text.trim()}
          className="
            absolute bottom-3 right-3
            w-8 h-8
            bg-moonlight-deep/80
            border border-nordic-fog/30
            rounded-full
            flex items-center justify-center
            text-nordic-fog
            hover:text-jade-white
            hover:border-nordic-fog/50
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MomentInput;
