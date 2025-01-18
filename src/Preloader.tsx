import React, { useEffect, useState } from 'react';

const greetings = [
  { text: 'Hello 👋', lang: 'English' },
  { text: 'Hola 🖐️', lang: 'Spanish' },
  { text: 'Bonjour 🤚', lang: 'French' },
  { text: 'こんにちは 🙌', lang: 'Japanese' },
  { text: 'مرحبا 🙋‍♂️', lang: 'Arabic' },
  { text: 'नमस्ते 🙏', lang: 'Namaste' }
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    
    // Schedule each greeting change at precise intervals
    greetings.forEach((_, index) => {
      if (index > 0) { // Skip first greeting as it's already shown
        const timeout = setTimeout(() => {
          setCurrentIndex(index);
        }, index * 500); // Exactly 500ms between each greeting
        timeoutIds.push(timeout);
      }
    });

    // Schedule the completion
    const completionTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow time for fade out animation
    }, 3000);
    timeoutIds.push(completionTimer);

    // Cleanup all timeouts
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-500 z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        <div 
          key={currentIndex}
          className="text-5xl font-bold text-white mb-2"
        >
          {greetings[currentIndex].text}
        </div>
        <div 
          key={`lang-${currentIndex}`}
          className="text-sm text-gray-400"
        >
          ({greetings[currentIndex].lang})
        </div>
      </div>
    </div>
  );
};

export default Preloader;