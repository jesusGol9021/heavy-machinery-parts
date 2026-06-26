'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export function CategoryFilter({ categories }: { categories: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')
  const [selected, setSelected] = useState(selectedCategory)

  const handleCategoryChange = (categoryId: string | null) => {
    setSelected(categoryId)
    if (categoryId) {
      router.push(`/catalog?category=${categoryId}`)
    } else {
      router.push('/catalog')
    }
  }

  return (
    <div className="space-y-3">
      <motion.button
        whileHover={{ x: 5 }}
        onClick={() => handleCategoryChange(null)}
        className={`w-full text-left px-4 py-2 rounded-lg transition ${
          !selected
            ? 'bg-accent text-primary font-semibold'
            : 'bg-muted text-muted-foreground hover:bg-border'
        }`}
      >
        Todas las Categorías
      </motion.button>

      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 5 }}
          onClick={() => handleCategoryChange(category.id.toString())}
          className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            selected === category.id.toString()
              ? 'bg-accent text-primary font-semibold'
              : 'bg-muted text-muted-foreground hover:bg-border'
          }`}
        >
          <span className="text-xl">{category.icon}</span>
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}
