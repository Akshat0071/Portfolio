import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcSet?: string;
  sources?: Array<{
    srcSet: string;
    type?: string;
    media?: string;
  }>;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  srcSet,
  sources = [],
  alt,
  className = '',
  width,
  height,
  containerClassName = '',
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for browsers that don't support IntersectionObserver
      setIsInView(true);
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '200px', // Start loading when within 200px of viewport
      threshold: 0.01,
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onError) onError();
  };

  // Show a low-quality image placeholder or nothing while loading
  const placeholder = (
    <div 
      className={cn(
        'bg-gray-200 dark:bg-gray-700 animate-pulse',
        !isLoaded ? 'block' : 'hidden',
        className
      )}
      style={{
        width: width || '100%',
        height: height || '100%',
      }}
      aria-hidden="true"
    />
  );

  // Only load the image when it's in view
  const imageElement = isInView ? (
    <>
      {sources.length > 0 && (
        <picture>
          {sources.map((source, index) => (
            <source
              key={index}
              srcSet={source.srcSet}
              type={source.type}
              media={source.media}
            />
          ))}
          <img
            ref={imgRef}
            src={src}
            srcSet={srcSet}
            alt={alt}
            loading={loading}
            decoding={decoding}
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
              className
            )}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}
      {sources.length === 0 && (
        <img
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          alt={alt}
          loading={loading}
          decoding={decoding}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </>
  ) : (
    <div 
      ref={imgRef}
      className={cn('bg-gray-200 dark:bg-gray-700', className)}
      style={{
        width: width || '100%',
        height: height || '100%',
      }}
      aria-hidden="true"
    />
  );

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {placeholder}
      {imageElement}
    </div>
  );
};

export default LazyImage;
