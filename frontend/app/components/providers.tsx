// components/providers.tsx
'use client';

import {PrivyProvider} from '@privy-io/react-auth';

export default function Providers({children}: {children: React.ReactNode}) {
  return <PrivyProvider appId="cm1cg97wa055cph1jbnuygd01">{children}</PrivyProvider>;
}