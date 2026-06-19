import { useEffect, useRef } from 'react';
import { useMediaQuery, useScript } from 'usehooks-ts';

import { cn } from '@/lib/utils';

const config = {
  width: '100%',
  height: '100%',
  pos: {
    lat: 54.986365,
    lon: 73.322134,
    zoom: 16,
  },
  opt: {
    city: 'omsk',
  },
  org: ['70000001103444909'],
};

export default function Map2GIS({ className }: { className?: string }) {
  const scriptStatus = useScript('/scripts/2gis-map.js');
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (scriptStatus === 'ready' && ref.current) {
      // @ts-expect-error - window.DGWidgetLoader is not typed
      if (!window.DGWidgetLoader) {
        return;
      }

      // @ts-expect-error - window.DGWidgetLoader is not typed
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      new window.DGWidgetLoader({
        ...config,
        containerNode: ref.current,
      });
    }
  }, [scriptStatus]);

  return (
    <div className={className}>
      <div
        className={cn(
          'w-full',
          'overflow-hidden',
          'rounded-2xl',
          'border',
          'border-white/70',
          'bg-white/60',
          'shadow-sm',
          'max-w-[600px]'
        )}
      >
        <div
          className={cn('relative', 'w-full', 'overflow-hidden')}
          style={{
            minHeight: `${isDesktop ? '450' : '300'}px`,
          }}
        >
          <div ref={ref} className={cn('absolute', 'inset-0')}>
            <noscript>Для просмотра виджета карты включите JavaScript.</noscript>
          </div>
        </div>
      </div>
    </div>
  );
}
