import Map2GIS from '@/components/Map2GIS';
import { useMetrika } from '@/components/MetrikaProvider';
import { cn } from '@/lib/utils';

function SocialIcon({
  className = '',
  children,
  color,
  onClick,
  href,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  'aria-label': string;
  href: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <a
      {...props}
      href={href}
      onClick={onClick}
      target='_blank'
      rel='noopener noreferrer'
      style={{ backgroundColor: color }}
      className={cn(
        'inline-flex',
        'h-11',
        'w-11',
        'items-center',
        'justify-center',
        'rounded-full',
        'text-white',
        'shadow-sm',
        'transition-transform',
        'hover:scale-105',
        className
      )}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { extLink } = useMetrika();

  return (
    <footer
      id='contacts'
      className={cn(
        'relative',
        'bg-gray-100',
        'pt-16',
        "bg-[url('/images/footer.webp')]",
        'bg-repeat',
        'bg-auto',
        'bg-bottom',
        'flex',
        'flex-col',
        'justify-center',
        'min-h-[1020px]'
      )}
    >
      <div
        className={cn(
          'max-w-7xl',
          'mx-auto',
          'px-6',
          'grid',
          'grid-cols-1',
          'lg:grid-cols-2',
          'gap-8',
          'lg:gap-12'
        )}
      >
        <div>
          <div className={cn('text-center', 'lg:text-left', 'mb-4', 'lg:mb-8')}>
            <h3 className={cn('text-2xl', 'font-semibold', 'text-custom-dark-blue', 'mb-4')}>
              наш адрес
            </h3>
            <p className={cn('text-custom-dark-blue', 'mb-2', 'text-lg')}>
              Омск, ул. Чокана Валиханова, 2, оф. 3
            </p>
            <div
              className={cn(
                'flex',
                'justify-center',
                'lg:justify-start',
                'items-center',
                'gap-4',
                'mb-4'
              )}
            >
              <svg
                className={cn('hidden', 'lg:block')}
                width={38}
                height={38}
                viewBox='0 0 38 38'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_89_6)'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M34.2587 32.4035H31.9089V35.6191C31.9089 36.7322 31.0122 37.6289 29.8991 37.6289H27.1164C26.0033 37.6289 25.1066 36.7322 25.1066 35.6191V32.4344H12.8316V35.6191C12.8316 36.7322 11.9349 37.6289 10.8218 37.6289H8.03906C6.92596 37.6289 6.02929 36.7322 6.02929 35.6191V32.4344H3.71033V7.08045C3.71033 4.73057 5.07079 3.03 7.82262 1.97874C13.2644 -0.154698 24.7046 -0.154698 30.1774 1.97874C32.9292 3.03 34.2897 4.73057 34.2897 7.08045V32.4035H34.2587ZM36.6705 12.8624H35.4955V19.541H36.6705C37.4125 19.541 38 18.9535 38 18.2115V14.1919C38 13.4499 37.4125 12.8624 36.6705 12.8624ZM1.32954 12.8624H2.50448V19.541H1.32954C0.58747 19.541 0 18.9535 0 18.2115V14.1919C0 13.4499 0.58747 12.8624 1.32954 12.8624ZM14.3466 3.03H23.6534C23.9317 3.03 24.1481 3.24644 24.1481 3.52472V5.13253C24.1481 5.4108 23.9317 5.62724 23.6534 5.62724H14.3466C14.0683 5.62724 13.8519 5.4108 13.8519 5.13253V3.52472C13.8519 3.24644 14.0683 3.03 14.3466 3.03ZM7.08055 7.54424H30.7958C31.105 7.54424 31.3832 7.82252 31.3832 8.13171V21.3652C31.3832 21.6744 31.105 21.9527 30.7958 21.9527H7.08055C6.77136 21.9527 6.49308 21.6744 6.49308 21.3652V8.13171C6.49308 7.82252 6.74044 7.54424 7.08055 7.54424ZM30.4866 26.6215C30.4866 26.0341 30.2701 25.5084 29.8682 25.1065C29.4662 24.7045 28.9406 24.4881 28.3531 24.4881C27.7657 24.4881 27.271 24.7045 26.8381 25.1065C26.4052 25.5084 26.2197 26.0341 26.2197 26.6215C26.2197 27.209 26.4361 27.7037 26.8381 28.1057C27.271 28.5076 27.7657 28.7241 28.3531 28.7241C28.9406 28.7241 29.4662 28.5076 29.8682 28.1057C30.3011 27.7037 30.4866 27.209 30.4866 26.6215ZM11.7803 26.6215C11.7803 26.0341 11.5639 25.5084 11.1619 25.1065C10.76 24.7045 10.2343 24.4881 9.64687 24.4881C9.0594 24.4881 8.53377 24.7045 8.13181 25.1065C7.72986 25.5084 7.51343 26.0341 7.51343 26.6215C7.51343 27.209 7.69894 27.7037 8.13181 28.1057C8.53377 28.5076 9.0594 28.7241 9.64687 28.7241C10.2653 28.7241 10.76 28.5076 11.1619 28.1057C11.5639 27.7037 11.7803 27.209 11.7803 26.6215Z'
                    fill='#DD7DB4'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_89_6'>
                    <rect width={38} height={38} fill='white' />
                  </clipPath>
                </defs>
              </svg>
              <p className={cn('text-custom-dark-pink', 'text-md')}>
                5 минут от остановок
                <br />
                «Голубой огонек» и «Жемчужина»
              </p>
            </div>
            <a
              href='https://go.2gis.com/7WKry'
              onClick={() => {
                extLink('https://go.2gis.com/7WKry');
              }}
              target='_blank'
              role='button'
              rel='noopener noreferrer'
              className={cn(
                'bg-custom-dark-pink',
                'hover:bg-custom-pink',
                'text-white',
                'px-6',
                'py-2',
                'rounded-full',
                'transition-colors',
                'text-lg'
              )}
            >
              маршрут в 2GIS
            </a>
          </div>

          <div className={cn('text-center', 'lg:text-left', 'mb-4', 'lg:mb-8')}>
            <h3 className={cn('text-2xl', 'font-semibold', 'text-custom-dark-blue', 'mb-4')}>
              время работы
            </h3>
            <p className={cn('text-custom-dark-blue', 'text-lg')}>ежедневно с 10:00 до 20:00</p>
          </div>

          <div className={cn('text-center', 'lg:text-left', 'mb-4', 'lg:mb-8')}>
            <h3 className={cn('text-2xl', 'font-semibold', 'text-custom-dark-blue', 'mb-4')}>
              наш телефон
            </h3>
            <a
              href='tel:+79040742052'
              className={cn(
                'text-custom-dark-blue',
                'hover:text-custom-pink',
                'transition-colors',
                'text-lg',
                'underline'
              )}
            >
              +7 904 074 20 52
            </a>
          </div>

          <div>
            <div
              className={cn('flex', 'items-center', 'gap-3', 'justify-center', 'lg:justify-start')}
            >
              <SocialIcon
                href='https://instagram.com/pes.groom'
                onClick={() => {
                  extLink('https://instagram.com/pes.groom');
                }}
                aria-label='Instagram'
                className={cn('instagram', 'relative')}
                color='#FF6868'
              >
                <img src='/images/social/instagram.svg' alt='Instagram' width={24} height={24} />
              </SocialIcon>
              <SocialIcon
                href='https://wa.me/79040742052'
                onClick={() => {
                  extLink('https://wa.me/79040742052');
                }}
                aria-label='Whatsapp'
                color='#25D366'
              >
                <img src='/images/social/whatsapp.svg' alt='Whatsapp' width={24} height={24} />
              </SocialIcon>
              <SocialIcon
                href='https://t.me/five0f'
                onClick={() => {
                  extLink('https://t.me/five0f');
                }}
                aria-label='Telegram'
                color='#38BDFF'
              >
                <img src='/images/social/telegram.svg' alt='Telegram' width={24} height={24} />
              </SocialIcon>
            </div>
            <p
              className={cn(
                'text-custom-dark-blue',
                'text-xs',
                'text-center',
                'lg:text-left',
                'mt-4'
              )}
            >
              * признан экстремистской организацией
              <br />
              на территории РФ
            </p>
          </div>
        </div>

        <Map2GIS
          className={cn('w-full', 'flex', 'justify-center', 'lg:justify-end', 'lg:items-center')}
        />
      </div>

      <div className={cn('text-right', 'absolute', 'bottom-4', 'right-4')}>
        <p className={cn('text-custom-dark-blue', 'text-md')}>
          © {new Date().getFullYear()} пёс, ты вымыт
        </p>
      </div>
    </footer>
  );
}
