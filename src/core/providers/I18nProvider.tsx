'use client';

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import React from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export default function I18nProvider({
  children,
  locale,
  messages,
}: I18nProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
