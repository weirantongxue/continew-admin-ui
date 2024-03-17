import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const QA: AppRouteRecordRaw = {
  name: 'QA',
  path: '/qa',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.ai.qa',
    icon: 'qa',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      name: 'Item',
      path: '/ai/item',
      component: () => import('@/views/ai/item/index.vue'),
      meta: {
        locale: 'menu.ai.item.list',
        requiresAuth: true,
      },
    },
    {
      name: 'Msg',
      path: '/ai/msg',
      component: () => import('@/views/ai/msg/index.vue'),
      meta: {
        locale: 'menu.ai.msg.list',
        requiresAuth: true,
      },
    },
  ],
};

export default QA;
