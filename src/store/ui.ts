import { atom } from 'nanostores';

export type Tabs = 'Key' | 'Settings';

export const $currentTab = atom<Tabs>('Key');

export function changeTab(tab: Tabs) {
  $currentTab.set(tab);
}
