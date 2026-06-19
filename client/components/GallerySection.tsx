import 'photoswipe/style.css';

import useEmblaCarousel from 'embla-carousel-react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { useCallback, useEffect } from 'react';

import { cn } from '@/lib/utils';

const galleryItems = [
  { image: '/images/gallery/1.webp', width: 1920, height: 1440 },
  { image: '/images/gallery/2.webp', width: 863, height: 618 },
  { image: '/images/gallery/3.webp', width: 863, height: 618 },
  { image: '/images/gallery/4.webp', width: 863, height: 618 },
  { image: '/images/gallery/5.webp', width: 863, height: 618 },
  { image: '/images/gallery/6.webp', width: 1024, height: 1536 },
  { image: '/images/gallery/7.webp', width: 1024, height: 1536 },
  { image: '/images/gallery/8.webp', width: 1024, height: 1536 },
  { image: '/images/gallery/9.webp', width: 1865, height: 2560 },
  { image: '/images/gallery/10.webp', width: 857, height: 1286 },
  { image: '/images/gallery/11.webp', width: 1024, height: 1536 },
  { image: '/images/gallery/12.webp', width: 1024, height: 1280 },
  { image: '/images/gallery/13.webp', width: 1024, height: 1365 },
  { image: '/images/gallery/14.webp', width: 944, height: 1180 },
  { image: '/images/gallery/15.webp', width: 1767, height: 2560 },
  { image: '/images/gallery/16.webp', width: 1024, height: 1536 },
  { image: '/images/gallery/17.webp', width: 1024, height: 1536 },
];

export default function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    const lb = new PhotoSwipeLightbox({
      gallery: '#gallery-lightbox',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lb.init();

    return () => {
      lb.destroy();
    };
  }, []);

  return (
    <section id='gallery' className={cn('py-20', 'bg-white')}>
      <div className={cn('max-w-7xl', 'mx-auto', 'px-6')}>
        <div
          className={cn(
            'flex',
            'flex-col',
            'sm:flex-row',
            'items-center',
            'justify-between',
            'mb-8',
            'lg:mb-12',
            'gap-4',
            'sm:gap-0'
          )}
        >
          <h2 className={cn('text-4xl', 'font-bold', 'text-custom-dark-pink', 'text-left')}>
            галерея пушистиков
          </h2>
          <div className={cn('hidden', 'lg:block')}>
            <button className='embla__prev' onClick={scrollPrev} aria-label='Предыдущий слайд'>
              <svg
                width='50'
                height='50'
                viewBox='0 0 70 70'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='35' cy='35' r='33.5' stroke='#DD7DB4' strokeWidth='3' />
                <path
                  d='M39 19L24 35.5L39 50.5'
                  stroke='#DD7DB4'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
              </svg>
            </button>
            <button
              className={cn('embla__next', 'ml-4')}
              onClick={scrollNext}
              aria-label='Следующий слайд'
            >
              <svg
                width='50'
                height='50'
                viewBox='0 0 70 70'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='35' cy='35' r='33.5' stroke='#DD7DB4' strokeWidth='3' />
                <path
                  d='M29 50.5L44 34L29 19'
                  stroke='#DD7DB4'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='relative'>
          <div className='embla'>
            <div className='embla__viewport' ref={emblaRef}>
              <div id='gallery-lightbox' className={cn('embla__container', 'flex', '-mx-3')}>
                {galleryItems.map((item, idx) => (
                  <a
                    key={item.image}
                    href={item.image}
                    data-pswp-width={item.width}
                    data-pswp-height={item.height}
                    target='_blank'
                    rel='noreferrer noopener'
                    className={cn(
                      'embla__slide',
                      'px-3',
                      'grow-0',
                      'shrink-0',
                      'basis-full',
                      'md:basis-1/2'
                    )}
                    aria-label={`Открыть фото #${String(idx + 1)} на весь экран`}
                  >
                    <img
                      src={item.image}
                      width={item.width}
                      height={item.height}
                      alt={`Фото собаки после груминга #${String(idx + 1)}`}
                      loading='lazy'
                      decoding='async'
                      className={cn(
                        'w-full',
                        'h-80',
                        'object-cover',
                        'rounded-2xl',
                        'transition-transform',
                        'hover:scale-105'
                      )}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
