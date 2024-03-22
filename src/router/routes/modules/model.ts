import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MODEL: AppRouteRecordRaw = {
  name: 'MODEL',
  path: '/model',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.ai.model',
    icon: 'model',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      name: 'Model',
      path: '/ai/model',
      component: () => import('@/views/ai/model/index.vue'),
      meta: {
        locale: 'menu.ai.model.list',
        requiresAuth: true,
      },
    },
    {
      name: 'ModelScript',
      path: '/ai/modelScript',
      component: () => import('@/views/ai/modelScript/index.vue'),
      meta: {
        locale: 'menu.ai.modelScript.list',
        requiresAuth: true,
      },
    },
  ],
};

export default MODEL;
