import { useCallback, useEffect, useMemo } from 'react';
import { useDocumentTitle } from 'usehooks-ts';

import { useMetrika } from '@/components/MetrikaContext';
import { cn } from '@/lib/utils';

export interface Service {
  id: string;
  title: string;
  image: string;
  cost: string;
  main: string;
  breeds: string;
  features: string[];
  costVariations: string;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ServiceModal({
  service,
  closeModal,
}: {
  service: Service;
  closeModal: () => void;
}) {
  const { hit, extLink } = useMetrika();

  const title = useMemo(
    () => `${capitalize(service.title)} — Бережный груминг для собак в Омске — пёс, ты вымыт`,
    [service.title]
  );

  useDocumentTitle(title, {
    preserveTitleOnUnmount: false,
  });

  useEffect(() => {
    hit({ title });
  }, [hit, title]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <div
        className={cn(
          'fixed',
          'inset-0',
          'bg-black/50',
          'flex',
          'items-center',
          'justify-center',
          'z-50',
          'p-4',
          'cursor-auto'
        )}
        role='button'
        tabIndex={0}
        onClick={e => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
        onKeyDown={e => {
          if (e.target !== e.currentTarget) {
            return;
          }
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal();
          }
        }}
      >
        <div
          className={cn(
            'bg-white',
            'rounded-2xl',
            'p-8',
            'max-w-3xl',
            'w-full',
            'max-h-[95dvh]',
            'overflow-y-auto',
            'flex',
            'flex-col',
            'items-center',
            'text-center',
            'relative'
          )}
        >
          <button
            type='button'
            aria-label='Закрыть'
            onClick={closeModal}
            className={cn(
              'absolute',
              'top-4',
              'right-6',
              'text-custom-dark-pink',
              'hover:text-custom-pink',
              'transition-colors',
              'text-5xl',
              'leading-none'
            )}
          >
            ×
          </button>
          <h3 className={cn('text-2xl', 'font-semibold', 'text-custom-dark-blue', 'mb-4')}>
            {service.title}
          </h3>
          <p className={cn('text-xl', 'text-custom-dark-blue', 'mb-4')}>{service.cost}</p>
          <p className={cn('text-md', 'text-custom-dark-blue', 'mb-4')}>{service.main}</p>
          <p className={cn('text-sm', 'text-custom-dark-blue', 'mb-8')}>{service.breeds}</p>
          <ul
            className={cn(
              'text-md text-left',
              'text-custom-dark-blue',
              'mb-8',
              'sm:self-start',
              'sm:ml-8'
            )}
          >
            <span className='font-semibold'>В комплекс входит:</span>
            {service.features.map(feature => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <a
            role='button'
            href='https://dikidi.net/1886438'
            onClick={() => {
              extLink('https://dikidi.net/1886438');
            }}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'bg-custom-dark-pink',
              'hover:bg-custom-pink',
              'text-white',
              'px-12',
              'py-3',
              'mb-8',
              'rounded-full',
              'transition-colors',
              'font-semibold'
            )}
          >
            записаться
          </a>
          <p className={cn('text-sm', 'text-custom-dark-blue', 'max-w-[660px]')}>
            {service.costVariations}
          </p>
        </div>
      </div>
    </>
  );
}
