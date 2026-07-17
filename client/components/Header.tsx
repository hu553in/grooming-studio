import { type ButtonHTMLAttributes, useCallback, useEffect, useState } from 'react';

import { useMetrika } from '@/components/MetrikaContext';
import { useHash } from '@/hooks/use-hash';
import { cn } from '@/lib/utils';

const navItems: { id: string; label: string }[] = [
  { id: 'hero', label: 'главная' },
  { id: 'about', label: 'о нас' },
  { id: 'gallery', label: 'работы' },
  { id: 'services', label: 'услуги' },
  { id: 'reviews', label: 'отзывы' },
  { id: 'contacts', label: 'контакты' },
];

function NavButton({
  label,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
}) {
  return (
    <button
      {...props}
      className={cn(
        'text-custom-dark-blue',
        'hover:text-custom-pink',
        'transition-colors',
        'text-sm',
        'lg:text-lg',
        'font-semibold',
        className
      )}
    >
      {label}
    </button>
  );
}

export default function Header({
  setHeaderRef,
}: {
  setHeaderRef: (node: HTMLDivElement | null) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { extLink } = useMetrika();
  const { updateHash, clearHash } = useHash();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = useCallback(
    (sectionId: string) => {
      if (sectionId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        clearHash();
      } else {
        updateHash(sectionId);
      }
    },
    [clearHash, updateHash]
  );

  return (
    <header
      ref={setHeaderRef}
      className={cn(
        'fixed',
        'top-0',
        'left-0',
        'right-0',
        'z-30',
        'transition-shadow',
        'duration-300',
        'bg-white',
        isScrolled ? 'shadow-md' : ''
      )}
    >
      <div className={cn('max-w-screen', 'px-4', 'lg:px-6', 'py-3', 'lg:py-4')}>
        <div className={cn('grid', 'grid-cols-[1fr_auto]', 'items-center')}>
          <div className='relative'>
            <div
              className={cn(
                'lg:absolute',
                'lg:left-1/2',
                'lg:-translate-x-1/2',
                'lg:top-0',
                'lg:-translate-y-1/4'
              )}
            >
              <div className={cn('relative', `h-24`, 'w-24', 'lg:h-32', 'lg:w-32')}>
                <div
                  className={cn(
                    'absolute',
                    'h-full',
                    'w-full',
                    'rounded-full',
                    'z-10',
                    'transition-shadow',
                    'duration-300',
                    isScrolled ? 'lg:shadow-lg' : ''
                  )}
                  style={{
                    clipPath: 'polygon(-50% 50%, -50% 150%, 150% 150%, 150% 50%)',
                  }}
                />
                <div
                  className={cn('relative', 'h-full', 'w-full', 'rounded-full', 'bg-white', 'z-20')}
                >
                  <button
                    type='button'
                    onClick={() => {
                      handleNavClick('hero');
                    }}
                    aria-label='Перейти на главную'
                    className={cn(
                      'h-full',
                      'w-full',
                      'rounded-full',
                      'appearance-none',
                      'border-0',
                      'bg-transparent',
                      'p-0',
                      'cursor-pointer'
                    )}
                  >
                    <img
                      src='/images/logo.webp'
                      width={176}
                      height={176}
                      alt='Логотип'
                      className={cn('object-cover', 'h-full', 'w-full', 'rounded-full')}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={cn('flex', 'items-center', 'justify-end', 'lg:gap-6')}>
            <nav className={cn('hidden', 'lg:flex', 'items-center', 'space-x-6', 'xl:space-x-8')}>
              {navItems.map(item => (
                <NavButton
                  key={item.id}
                  label={item.label}
                  onClick={() => {
                    handleNavClick(item.id);
                  }}
                />
              ))}
            </nav>

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
                'px-6',
                'py-2',
                'rounded-full',
                'transition-colors',
                'text-lg',
                'font-semibold'
              )}
            >
              записаться
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
