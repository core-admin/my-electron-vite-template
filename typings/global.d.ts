import type { VNodeChild, PropType as VuePropType, Plugin } from 'vue';
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';
import type { IPC } from '#common/types/preload';

declare global {
  type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type PropType<T> = VuePropType<T>;

  type VueNode = VNodeChild | JSX.Element;

  type SFCWithInstall<T> = T & Plugin;

  type EmitType = (event: string, ...args: any[]) => void;

  interface Window {
    // naive methods
    $loadingBar: import('naive-ui').LoadingBarProviderInst;
    $dialog: import('naive-ui').DialogProviderInst;
    $message: import('naive-ui').MessageProviderInst;
    $notification: import('naive-ui').NotificationProviderInst;

    $router: Router;
    $route: RouteLocationNormalizedLoaded;

    ipc: IPC;
  }
  // eslint-disable-next-line no-inner-declarations, no-var
  // var app: App;
}
