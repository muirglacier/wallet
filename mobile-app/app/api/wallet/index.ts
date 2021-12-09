import { JellyfishWallet, WalletHdNode, WalletHdNodeProvider } from '@muirglacier/jellyfish-wallet'
import { WhaleApiClient } from '@muirglacier/whale-api-client'
import { WhaleWalletAccount, WhaleWalletAccountProvider } from '@muirglacier/whale-api-wallet'
import { EnvironmentNetwork } from '@environment'
import { getJellyfishNetwork } from '@shared-api/wallet/network'

export function initJellyfishWallet (provider: WalletHdNodeProvider<WalletHdNode>, network: EnvironmentNetwork, client: WhaleApiClient): JellyfishWallet<WhaleWalletAccount, WalletHdNode> {
  const accountProvider = new WhaleWalletAccountProvider(client, getJellyfishNetwork(network))
  return new JellyfishWallet(provider, accountProvider)
}

export * from './provider/mnemonic_encrypted'
export * from './provider/mnemonic_unprotected'
export * from './passcode_attempt'
export * from './persistence'
