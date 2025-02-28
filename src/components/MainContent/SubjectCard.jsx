import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ 
  subject, 
  imageUrl, 
  backgroundColor, 
  path, 
  imageSize = {
    default: 'w-24 h-24',
    md: 'md:w-32 md:h-32',
    lg: 'lg:w-40 lg:h-40'
  },
  titleSize = {
    height: 'h-12 md:h-16',
    text: 'text-sm md:text-xl'
  }
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(path);
  };
  
  return (
    <div 
      className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="aspect-[4/2] bg-white flex items-center justify-center p-4">
        <div className={`${imageSize.default} ${imageSize.md} ${imageSize.lg}`}>
          <img 
            src={imageUrl} 
            alt={subject}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <div 
        style={{ backgroundColor }}
        className={`${titleSize.height} flex items-center justify-center text-white font-semibold ${titleSize.text} px-2`}
      >
        {subject}
      </div>
    </div>
  );
};

export default SubjectCard;