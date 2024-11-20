import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function ProgressiveImage({ src, alt, className }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setError(true);
  }, [src]);

  const blurredSrc = `${src}?w=20&blur=50`;

  return (
    <div className={clsx('relative overflow-hidden bg-gray-100', className)}>
      {isLoading && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      ) : (
        <>
          <img
            src={blurredSrc}
            alt={alt}
            className={clsx(
              'absolute inset-0 w-full h-full object-cover blur-lg scale-110',
              isLoading ? 'opacity-100' : 'opacity-0'
            )}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />
          <img
            src={src}
            alt={alt}
            className={clsx(
              'w-full h-full object-cover',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />
        </>
      )}
    </div>
  );
}