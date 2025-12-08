# Brenda - AI Brand Quality Assistant

Een gecentraliseerd, AI-powered platform dat iedereen in staat stelt om consistente, verenigde en on-brand ervaringen te leveren.

## Features

- 💬 Chat interface met Brenda
- 🎨 Design check via upload of Figma URL
- 📊 Design Scan Report met gedetailleerde analyse
- 🎯 Role-based suggestions (Designer, Content Designer, Developer, etc.)
- 📚 Brand Guidelines navigatie
- 🔘 Floating Brenda button op alle pagina's
- 🎨 Clean design met veel white space en Utopia typography

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- React 18
- Utopia (responsive typography & spacing)
- CSS Design Tokens

## Setup

1. Installeer dependencies:
```bash
npm install
```

2. Kopieer `.env.example` naar `.env.local` en vul indien nodig API keys in (voor Fase B):
```bash
cp .env.example .env.local
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structuur

```
brenda/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/              # Utilities en services
├── styles/           # CSS tokens en Utopia config
└── public/           # Static assets
```

## Fase A (Prototype)

- Mock responses en simulated design analysis
- Geen echte AI integratie
- Statische design scan reports

## Fase B (Toekomst)

- Echte AI analyse met Figma MCP
- Vision API integratie
- Real-time brand compliance checking

## Design System

- **Typography**: Utopia responsive type scale
- **Spacing**: Utopia responsive space scale
- **Colors**: Design tokens uit `styles/tokens.css`
- **Principles**: Clean, spacious design met veel white space

