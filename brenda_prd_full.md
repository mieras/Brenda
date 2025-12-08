# Product Requirements Document (PRD)
## Brenda — AI Brand Quality Assistant (Prototype Scope)
**Version:** Sprint Prototype  
**Owner:** Product Design / Brand Team  
**Type:** Concept Prototype to validate desirability & usability  

---

## 1. Problem Statement
Designers, content creators, and developers struggle to find brand guidelines, interpret rules, and validate designs early. This leads to inconsistent brand usage, unnecessary rework, and a fragmented understanding of the brand.

---

## 2. Goal
Create a **centralized, AI-powered platform — Brenda — that enables anyone to deliver consistent, unified, and on-brand experiences** by:

- Chatting with Brenda to ask brand/design questions  
- Uploading or referencing designs for instant feedback  
- Finding accurate brand content in one place  
- Receiving suggestions tied directly to brand rules  

This PRD defines the **prototype scope only**.

---

## 3. Target Users

### Primary
- **Digital (Product) Designers** → validate UI, use correct tokens, components, accessibility, tone-of-voice

### Secondary
- Content Designers  
- Brand Designers  
- Developers  
- External agencies  

The prototype must flex but **optimize for Designers**.

---

## 4. Prototype Features (In Scope)

### 4.1 Chat Interface
A conversational UI where users can:

- Ask free-form questions  
- Receive structured guidance  
- Get references to brand rules  
- Trigger a design review  

**Requirements**

- Conversational input field  
- Brenda greets user in warm, helpful tone  
- Autocomplete or suggestions allowed in prototype  

---

### 4.2 Upload or Figma Link Input
Users must supply a design for analysis, via:

#### A. File Upload
Prototype supports:
- PNG  
- JPG  
- PDF (single page)  

#### B. Figma Link Input
User pastes URL → prototype simulates analysis.

**Requirements**
- Input field  
- Preview of file  
- “Analyzing…” state  
- Mocked AI output  

---

### 4.3 Conversation Starters
Displayed below input field:

- “Check my spacing”
- “Is this layout on-brand?”
- “Validate my color usage”
- “Review accessibility”
- “Help me choose the right component”
- “Analyze my design”
- “Explain this guideline”
- “Improve my copy tone”

Clicking a suggestion autofills a question.

---

### 4.4 Role Selector
A simple selector:

“I’m a…”

- Designer  
- Content Designer  
- Developer  
- Brand Guardian  
- Agency Partner  

**Effect:**  
Tailors suggestions + wording (prototype only).

---

### 4.5 Brand Guidelines Navigation (Source of Truth Simulation)
Include clickable menu items:

- Homepage  
- Our Logos  
- Colour Palette  
- Typography  
- Supporting Graphic Elements  
- Icons  
- Cheques  
- Tickets  
- Plus and Premium  
- Photography  
- Clothing  
- Vehicles  
- Prize Plan  
- Creative Ladder  
- Brenda Group  
- The Power of Brenda  

Each opens a short **guideline snippet**, not full documentation.

---

### 4.6 Design Scan Report (Core Output)
Based on uploaded/link-referenced design.

#### Sections Required

| Category | Example Finding | Status |
|----------|------------------|--------|
| Logo Usage | Logo placed on unapproved background | Needs attention |
| Color | Unapproved top banner color used | Needs attention |
| Spacings | Too much space above/below logo | Almost there |
| Typography | Avoid italic text for emphasis | Almost there |
| Emotional Resonance | Vibrant imagery fits brand | On-brand |
| Imagery | Ambassador photo consistent | On-brand |
| Copywriting | Simple message, active tone | On-brand |
| Brand Asset Usage | Approved assets used | On-brand |
| Accessibility | Meets WCAG minimum contrast | On-brand |

User can expand each row.

---

### 4.7 Guideline Linking + Explanations
Each expanded row shows:

- The relevant brand rule  
- Why it matters  
- How to fix it  
- Links to guideline snippets  
- Suggested tokens/components/assets  

Tone is warm, constructive, clear.

---

## 5. Interaction Flow (Prototype)

### Step 1  
User opens Brenda → welcome message + suggestions.

### Step 2  
User selects role (optional).

### Step 3  
User asks a question or clicks suggestion.

### Step 4  
Brenda asks user to upload a file or paste a Figma link.

### Step 5  
User uploads/pastes → “Analyzing…” animation.

### Step 6  
Brenda presents **Design Scan Report**.

### Step 7  
User explores suggestions and guideline links.

### Step 8  
Brenda offers next steps (“Want me to re-check?” etc.)

---

## 6. Non-Functional Requirements (Prototype Constraints)

- Responses are scripted  
- No real AI  
- File uploads simulated  
- Figma link recognition simulated  
- Minimal navigation  
- No authentication  
- No real design system integration  

---

## 7. Out of Scope

- Real LLM or multimodal AI  
- Multi-design comparisons  
- Collaborative editing  
- Real code generation  
- Full CMS for guidelines  
- Tracking or analytics  
- User roles with permissions  

---

## 8. Success Criteria (Prototype)

The prototype works if:

- Users intuitively understand Brenda  
- Users trust report + feedback  
- Users find rules faster via Brenda  
- Designers feel confident after using Brenda  
- Brenda feels helpful, friendly, empowering  
- Brenda reduces perceived effort  

---

## 9. Prototype Deliverables

- Chat Interface  
- Upload / Figma Link flow  
- “Analyzing…” screen  
- Design Scan Report screen  
- Expanding guideline content  
- Conversation starter UI  
- Role selector  
- Tone-of-voice compliant dialogue  
- Minimal navigation of brand sections  

---

