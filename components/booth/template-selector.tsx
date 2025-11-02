"use client"

import * as React from "react"

export interface Template {
  id: string
  name: string
  preview: string
  description: string
}

const templates: Template[] = [
  {
    id: "classic",
    name: "Classic",
    preview: "🎓",
    description: "Frame klasik elegan"
  },
  {
    id: "modern",
    name: "Modern",
    preview: "✨",
    description: "Style modern minimalis"
  },
  {
    id: "fun",
    name: "Fun",
    preview: "🎉",
    description: "Tema colorful ceria"
  },
  {
    id: "wedding",
    name: "Wedding",
    preview: "💍",
    description: "Elegant wedding theme"
  },
  {
    id: "birthday",
    name: "Birthday",
    preview: "🎂",
    description: "Pesta ulang tahun"
  },
  {
    id: "corporate",
    name: "Corporate",
    preview: "💼",
    description: "Professional look"
  }
]

interface TemplateSelectorProps {
  onSelect: (template: Template) => void
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Pilih Template</h2>
        <p className="text-muted-foreground">
          Pilih template frame foto sesuai kebutuhan Anda
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              setSelectedId(template.id)
              onSelect(template)
            }}
            className={`
              p-6 rounded-2xl border-2 transition-all duration-300
              ${selectedId === template.id
                ? "border-primary bg-primary/10 shadow-lg scale-105"
                : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
              }
            `}
          >
            <div className="text-center space-y-3">
              <div className="text-5xl">{template.preview}</div>
              <div>
                <h3 className="font-bold text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export { templates }

