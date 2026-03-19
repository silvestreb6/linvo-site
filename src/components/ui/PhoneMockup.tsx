import { useTranslations } from 'next-intl';

export function PhoneMockup() {
  const t = useTranslations('features');

  return (
    <div className="relative mx-auto w-64 md:w-72 lg:w-80">
      <div className="rounded-[2.5rem] border-[6px] border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
        <div className="rounded-[2rem] bg-surface overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-2 bg-primary">
            <span className="text-[10px] text-white/70">9:41</span>
            <span className="text-xs font-heading font-bold text-white">Linvo</span>
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-white/50" />
              <div className="w-1 h-1 rounded-full bg-white/50" />
              <div className="w-1 h-1 rounded-full bg-white/50" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Announcement card */}
            <div className="rounded-xl bg-primary-bg p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-5v12L3 13v-2z" /></svg>
                </div>
                <span className="text-xs font-semibold text-primary">{t('items.0.title')}</span>
              </div>
              <div className="h-1.5 w-3/4 rounded bg-primary/15" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded bg-primary/10" />
            </div>

            {/* Voting card */}
            <div className="rounded-xl bg-success-bg p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /></svg>
                </div>
                <span className="text-xs font-semibold text-success">{t('items.1.title')}</span>
              </div>
              <div className="flex gap-1 mt-1">
                <div className="h-1.5 flex-1 rounded-full bg-success/30" />
                <div className="h-1.5 w-1/4 rounded-full bg-success/15" />
              </div>
            </div>

            {/* Booking card */}
            <div className="rounded-xl bg-background p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-text-muted/15 flex items-center justify-center">
                  <svg className="w-3 h-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                </div>
                <span className="text-xs font-semibold text-text-secondary">{t('items.2.title')}</span>
              </div>
              <div className="h-1.5 w-2/3 rounded bg-text-muted/15" />
              <div className="mt-1.5 h-1.5 w-5/6 rounded bg-text-muted/10" />
            </div>

            {/* Finance card */}
            <div className="rounded-xl bg-warning-bg p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-warning/15 flex items-center justify-center">
                  <svg className="w-3 h-3 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="22" height="14" rx="2" /><path d="M1 10h22" /></svg>
                </div>
                <span className="text-xs font-semibold text-warning">{t('items.5.title')}</span>
              </div>
              <div className="h-1.5 w-1/2 rounded bg-warning/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
