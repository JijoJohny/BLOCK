import {
    DynamicContextProvider,
    DynamicWidget,
  } from "@dynamic-labs/sdk-react-core";
  import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
  import {
    createConfig,
    WagmiProvider,
  } from 'wagmi';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { http } from 'viem';
  import { mainnet } from 'viem/chains';
  
  import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
  
  const config = createConfig({
    chains: [mainnet],
    multiInjectedProviderDiscovery: false,
    transports: {
      [mainnet.id]: http(),
    },
  });
    
  const queryClient = new QueryClient();
    
  export default function ConnectWallet() {
    return (
      <DynamicContextProvider
        settings={{
          // Find your environment id at https://app.dynamic.xyz/dashboard/developer
          environmentId: "a7edcb1c-1d0e-4836-99e2-a68a86af7b5c",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <DynamicWidget />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider> 
      </DynamicContextProvider>
    );
  };