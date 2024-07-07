'use client'

import {
  createContext,
  createElement as h,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { cloneDeep } from '~/lib/lodash'
import { useAggregationSelector } from '~/providers/root/aggregation-data-provider'

import { headerMenuConfig as baseHeaderMenuConfig } from '../config'

const HeaderMenuConfigContext = createContext({
  config: baseHeaderMenuConfig,
})

export const useHeaderConfig = () => useContext(HeaderMenuConfigContext)
export const HeaderDataConfigureProvider: Component = ({ children }) => {
  const pageMeta = useAggregationSelector(
    (aggregationData) => aggregationData.pageMeta,
  )
  const categories = useAggregationSelector(
    (aggregationData) => aggregationData.categories,
  )
  const [headerMenuConfig, setHeaderMenuConfig] = useState(baseHeaderMenuConfig)

  useEffect(() => {
    if (!pageMeta) return
    const nextMenuConfig = cloneDeep(baseHeaderMenuConfig)
    if (pageMeta) {
      const moreIndex = nextMenuConfig.findIndex((item) => item.type === 'More')
      if (moreIndex !== -1) {
        const existingMoreSubMenu = nextMenuConfig[moreIndex].subMenu || []
        const newMoreSubMenuItems = pageMeta.map((page) => ({
          path: `/${page.slug}`,
          title: page.title,
          icon: h('i', {
            className: 'icon-[mingcute--paper-fill] flex center',
          }),
        }))
        nextMenuConfig[moreIndex].subMenu = [
          ...existingMoreSubMenu,
          ...newMoreSubMenuItems,
        ]
      }
    }

    if (categories?.length) {
      const postIndex = nextMenuConfig.findIndex((item) => item.type === 'Post')
      if (postIndex !== -1) {
        nextMenuConfig[postIndex].subMenu = []
        for (const category of categories) {
          nextMenuConfig[postIndex].subMenu!.push({
            path: `/categories/${category.slug}`,
            title: category.name,
          })
        }
      }
    }

    setHeaderMenuConfig(nextMenuConfig)
  }, [categories, pageMeta])

  return (
    <HeaderMenuConfigContext.Provider
      value={useMemo(() => ({ config: headerMenuConfig }), [headerMenuConfig])}
    >
      {children}
    </HeaderMenuConfigContext.Provider>
  )
}
