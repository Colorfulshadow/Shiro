import type { ReactNode } from 'react'
import { createElement as h } from 'react'

import {
  FaSolidCircle,
  FaSolidCircleNotch,
  FaSolidComments,
  FaSolidDotCircle,
  FaSolidFeatherAlt,
  FaSolidHistory,
  FaSolidUserFriends,
  IcTwotoneSignpost,
  IonBook,
  MdiFlask,
  MdiLightbulbOn20,
} from '~/components/icons/menu-collection'

export interface IHeaderMenu {
  title: string
  path: string
  type?: string
  icon?: ReactNode
  subMenu?: Omit<IHeaderMenu, 'exclude'>[]
  exclude?: string[]
}
export const headerMenuConfig: IHeaderMenu[] = [
  {
    title: '首页',
    path: '/',
    type: 'Home',
    icon: h(FaSolidDotCircle),
    subMenu: [],
  },
  {
    title: '文章',
    path: '/posts',
    type: 'Post',
    subMenu: [],
    icon: h(IcTwotoneSignpost),
  },
  {
    title: '手记',
    type: 'Note',
    path: '/notes',
    icon: h(FaSolidFeatherAlt),
    exclude: ['/notes/topics'],
  },

  {
    title: '时光',
    icon: h(FaSolidHistory),
    path: '/timeline',
    subMenu: [
      {
        title: '记录的生活',
        icon: h(FaSolidFeatherAlt),
        path: '/timeline?type=note',
      },
      {
        title: '写过的文章',
        icon: h(IonBook),
        path: '/timeline?type=post',
      },
      {
        title: '落下的文字',
        icon: h(FaSolidCircle),
        path: '/timeline?memory=1',
      },
      {
        title: '归档的记忆',
        path: '/notes/topics',
        icon: h('i', {
          className: 'i-mingcute-align-bottom-fill flex center',
        }),
      },
    ],
  },
  {
    title: '友链',
    icon: h(FaSolidUserFriends),
    path: '/friends',
  },
  {
    title: '网站',
    icon: h(FaSolidCircleNotch),
    path: '#',
    subMenu: [
      // {
      //   title: 'zty的小铺',
      //   icon: h(RMixPlanet),
      //   path: 'https://buy.zty.ink',
      // },
      {
        title: '服务器监控',
        icon: h('i', {
          className: 'icon-[mingcute--laptop-line] flex center',
        }),
        path: 'https://server.zty.ink',
      },
      {
        title: '文件储存箱',
        icon: h('i', {
          className: 'icon-[mingcute--storage-fill] flex center',
        }),
        path: 'https://pan.zty.ink',
      },
      {
        title: '女友记录册',
        icon: h('i', {
          className: 'icon-[mingcute--thought-fill] flex center',
        }),
        path: 'https://oql.zty.ink',
      },
    ],
  },
  {
    title: '更多',
    icon: h(FaSolidCircleNotch),
    path: '#',
    type: 'More',
    subMenu: [
      {
        title: '思考',
        icon: h(MdiLightbulbOn20),
        path: '/thinking',
      },
      {
        title: '折腾',
        icon: h(MdiFlask),
        path: '/projects',
      },
      {
        title: '摘录',
        path: '/says',
        icon: h(FaSolidComments),
      },
    ],
  },
]
