# 🚀 Vibe Coding with References: Building Sortoi

**How I Built an Enterprise-Grade AI File Sorter Using Multiple AIs and Expert References**

--- 

## 📖 What This Documents

This is the **actual development process** I used to build Sortoi (AI File Sorter). You'll see:

- ✅ Real prompts I used (simple, not over-engineered)
- ✅ How I orchestrated 3 different AIs for their strengths
- ✅ The continuous improvement loop: Code → Claude reviews → Fix with references
- ✅ How code went from 4/10 to 9.8/10 in one session

**This isn't theory. This is exactly what happened, prompt by prompt.**

---

## 🎯 The Secret: Simple Prompts + Expert References

Instead of complex, over-engineered prompts, I used this simple pattern:

> **"[what I need] and make [expert name] proud"**

That's it. No elaborate instructions. Just clear intent + expert reference.

**Example:**
```
"haz los cambios necesarios para publicar a npm y haz sentir orgulloso a Sindre Sorhus"
```

**Why this works:**
- AIs know these experts and their standards
- Activates specific quality benchmarks
- Simple but produces enterprise-grade results

---

## 🤖 The Three AIs I Used (And Why)

Here's exactly how I split the work:

```
┌─────────────────────────────────────────────┐
│  YOU (The Orchestrator)                     │
│  - Write prompts with expert references     │
│  - Copy code between AIs                    │
│  - Make strategic decisions                 │
└──────┬────────────────────────────────┬─────┘
       │                                 │
       ▼                                 ▼
┌──────────────────┐          ┌──────────────────┐
│  KILO CODE       │          │  GITHUB COPILOT  │
│  (Implementer 1) │          │  (Implementer 2) │
│                  │          │                  │
│  Gemini 2.5-pro  │          │  Claude 4.5      │
│  Grok Fast-1     │          │  Sonnet          │
└────────┬─────────┘          └────────┬─────────┘
         │                              │
         │ Generates code               │ Fixes code
         ▼                              ▼
    Initial features ──────►  Improved implementation
         │                              │
         └──────► YOU copy code ────────┘
                       │
                       ▼
               ┌──────────────────┐
               │  CLAUDE WEB      │
               │  (The Auditor)   │
               └──────────────────┘
                       │
      Prompt: "What do you think of this?
               Give me your unfiltered opinion."
                       │
                       ▼
            Technical code review
            (Bugs, violations, scores)
                       │
                       ▼
        YOU create new prompt with reference
                       │
                       ▼
     "Fix [issue], make [Expert] proud"
                       │
                       ▼
            Implementation improves
                       │
                       ▼
                 [Loop continues]
```

---

## 📚 The Experts I Referenced

I built a quick reference list by domain:

**Clean Code & Architecture:**
- Uncle Bob (Robert C. Martin) - SOLID, Clean Architecture
- Martin Fowler - Refactoring, DDD

**Security:**
- OWASP Top 10 - Security standards
- Liran Tal - Node.js security

**UX/Developer Experience:**
- Sarah Drasner - Modern UX patterns
- Jesse James Garrett - User-centered design
- Sindre Sorhus - npm package quality

**Performance:**
- Node.js Best Practices - Optimization, streaming

---

## 🛠️ The Real Development Process

Here's how Sortoi was actually built, with the key moments where references made the difference.

### **Phase 1: NPM Publication** ⭐

**My Prompt (WITH REFERENCE):**
```
"haz los cambios necesarios para publicar a npm y haz sentir orgulloso a Sindre Sorhus"
```

**What happened:**
- Professional package.json metadata
- Proper .npmignore
- CLI setup following Sindre's quality standards
- Installation instructions

**Result:** npm-ready package with professional quality

---

### **Phase 2: Architecture Validation** ⭐

**My Prompt (WITH REFERENCE):**
```
"Pero el api key no deberia primero ser verificado en el inicio, 
no creo que deba ser verificado en la clase, sino en el inicio de todo, 
haz sentir orgulloso a uncle bob con tu implementación"
```

**What happened:**
- Moved API key validation to app entry point
- Created ConfigurationService (SRP compliant)
- Better separation of concerns

**Result:** Clean Architecture compliance

---

### **Phase 3: The Big Code Review**

I copied all code and pasted it into **Claude Web**.

**My Prompt to Claude:**
```
"QUE OPINAS DE ESTO, DAME TU OPINIÓN FINAL SIN FILTROS"
```

**Claude's Brutal Review:**
```
❌ SRP violated in index.ts (300+ lines)
❌ Path traversal vulnerability
❌ API keys logged in development
❌ Regex too restrictive

Score from Uncle Bob: 4/10
Score from Liran Tal: 6/10
```

This gave me the roadmap for what to fix.

---

### **Phase 4: Asking for Expert Perspective** ⭐

**My Prompt (WITH REFERENCE):**
```
"Que le podrías criticar al proyecto actualmente si fueras 
robert c martin y lirantal"
```

Copilot analyzed from both perspectives and listed all issues.


**Result:**
- ConfigurationService.ts (SRP) ✅
- Path sanitization ✅
- Security limits ✅
- API key validation ✅

**New Scores:**
- Uncle Bob: 4/10 → **7/10**
- Liran Tal: 6/10 → **9/10**

---

### **Phase 5: Final Security Hardening**

Based on Claude's detailed bug reports, I gave simple prompts:

```
"Crea suite completa de fuzzing tests para PathValidator. 
Siguiendo OWASP Top 10. Al menos 60 tests."
```

```
"Reescribe PathValidator con whitelist approach."
```

**Final Result:**
- 64 fuzzing tests ✅
- 101/101 tests passing ✅
- Security: **9.8/10** ✅

---

## 🔄 The Loop That Changed Everything

Here's the pattern I discovered:

```
1. Copilot implements feature (prompt simple or con referente)
2. Copy code → Claude Web
3. Ask: "QUE OPINAS DE ESTO, DAME TU OPINIÓN FINAL SIN FILTROS"
4. Claude gives brutal, detailed review
5. Take Claude's feedback → Create simple prompt con referente
6. Copilot fixes issues
7. Repeat until satisfied
```

**Key Insight:** Claude Web doesn't implement code. It's my external auditor that tells me what's wrong. Then I use that info to guide Copilot with references.

---

## 📝 Real Prompts I Used (Chronological)

### **Simple Prompts (No Reference)**
```
"Analiza el repositorio"
"esto se puede publicar en npm? o pnpm"
"donde es mejor poner la imagen de mi proyecto?"
"ejecuta el plan de acción"
"aplica todos"
```

### **Prompts with Expert References**
```
"haz los cambios necesarios para publicar a npm y haz sentir orgulloso a Sindre Sorhus"

"haz sentir orgulloso a uncle bob con tu implementación"

"Que le podrías criticar al proyecto actualmente si fueras robert c martin y lirantal"
```

### **Prompts to Claude Web (The Auditor)**
```
"QUE OPINAS DE ESTO, DAME TU OPINIÓN FINAL SIN FILTROS"

"Que le podrías criticar al proyecto actualmente si fueras robert c martin y lirantal"
```

**Notice:** My prompts were SHORT and SIMPLE. The reference at the end did the heavy lifting.

---

## 📊 Before vs After

---

## 📊 Before vs After

### **Code Quality Scores:**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Uncle Bob (Architecture) | 4/10 | 9/10 | **+125%** |
| Liran Tal (Security) | 6/10 | 9.8/10 | **+63%** |
| Test Coverage | 0% | 100% (101 tests) | **+100%** |
| Performance (hash) | Baseline | 3x faster | **+200%** |

### **Development Time:**

**Traditional approach:** ~1 week
**With this workflow:** ~3 hours (multiple sessions)
**Time saved:** 93%

---

## ✅ What You Can Replicate

### **The Simple Prompt Pattern:**

```
"[what you need] and make [expert name] proud"
```

**Examples you can copy:**

```
"add error handling and make uncle bob proud"

"optimize this function and make the node.js community proud"

"improve the user flow and make sarah drasner proud"

"add security validation and make liran tal proud"
```

### **The Audit Loop:**

1. Get code from your AI
2. Copy → Paste into Claude Web
3. Ask: "What would you criticize? Be brutal."
4. Take feedback → New prompt with reference
5. Repeat until satisfied

### **The Multi-AI Split:**

- **Kilo Code / Your main AI**: Initial implementation
- **Copilot / Secondary AI**: Fixes and improvements
- **Claude Web**: Code reviewer (doesn't write code, just criticizes)

---

## � Key Lessons

### **1. Keep Prompts Simple**
❌ Don't: "Implement a comprehensive security validation system with whitelist-based approach, OS-specific rules, and extensive test coverage following OWASP guidelines..."

✅ Do: "add security validation and make OWASP proud"

### **2. Use Claude Web as Your Auditor**
It won't write code for you, but it will tell you EXACTLY what's wrong.

### **3. References Work Because AIs Know These Experts**
- Uncle Bob → Clean Architecture, SOLID
- Liran Tal → Node.js security
- Sarah Drasner → Modern UX
- Sindre Sorhus → npm package quality

### **4. The Loop is What Creates Quality**
One pass = mediocre code
Three passes = production-ready code

---

## 🎯 Try It Yourself

### **Step 1: Pick One Feature** (10 min)
Choose something in your current project

### **Step 2: Simple Prompt + Reference** (2 min)
```
"[what you need] and make [relevant expert] proud"
```

### **Step 3: Audit with Claude Web** (5 min)
Copy code, ask: "What would you criticize?"

### **Step 4: One Fix Round** (10 min)
Take Claude's feedback, create new prompt with reference

**Total time:** 30 minutes
**Expected result:** Noticeably better code

---

## 📚 Expert Quick Reference

**When to reference who:**

- **Architecture issues** → Uncle Bob, Martin Fowler
- **Security problems** → OWASP, Liran Tal  
- **Performance issues** → Node.js Best Practices
- **UX/DX problems** → Sarah Drasner, Jesse James Garrett
- **Package quality** → Sindre Sorhus
- **TypeScript** → TypeScript Dev Community

---

## 😊 Creating the Logo with AI (Nano Banana)

The Sortoi logo was designed using **Nano Banana** with a detailed, single-prompt approach inspired by **Material Design** and **Jony Ive's minimalism**.

### The Prompt Used:

```
Diseña un logo minimalista y moderno para 'Sortoi', una app tipo terminal de 
organización y clasificación de archivos con inteligencia artificial. El logo 
debe representar visualmente un archivo (rectángulo redondeado blanco, #FFFFFF, 
sobre fondo negro #000000) y una carita feliz dibujada dentro del archivo usando 
solamente dos puntos negros (ojos) y una línea negra curva (boca), todos 
cuidadosamente proporcionados y equilibrados.

La carita feliz debe integrarse sutilmente en el archivo, transmitiendo 
accesibilidad, organización amigable y tecnología positiva. Aplica transparencias 
y superposiciones mínimas solo si es necesario para una sensación de profundidad 
o capa.

Inspiración: Material Design y estilo Jony Ive; sin texto, sin bordes duros ni 
detalles extra—solo el rectángulo redondeado y la carita feliz formada por los 
tres elementos dentro (dos puntos + línea curva). Composición ultralimpiada, 
balanceada y suave.

Especificaciones técnicas:
- Solo dos formas geométricas: el rectángulo redondeado (archivo) y los tres 
  elementos simples de la carita (dos puntos y una línea curva, todas en negro).
- La carita feliz debe estar centrada y proporciones suaves, evocando orden y 
  amabilidad tecnológica.
- Sin texto ni iconos extra.
- El símbolo debe funcionar y ser reconocible a tamaño reducido, mínimo 32px.
- Renderizar solo el símbolo del logo sobre fondo negro, sin texto ni elementos 
  adicionales, asegurando que evoque un archivo accesible y organizado mediante IA.
```

### Design Philosophy:

**Key Concepts:**
- 📄 **File + Emotion**: White rounded rectangle = organized file
- 😊 **Happy Face**: AI makes file organization joyful
- 🎯 **Minimalism**: Only essential elements (Jony Ive inspiration)
- 🖤 **High Contrast**: Black background (#000000) + white file (#FFFFFF)
- 📐 **Scalability**: Recognizable even at 32px

**Color Palette:**
- Background: `#000000` (Pure Black)
- File Shape: `#FFFFFF` (Pure White)
- Face Elements: `#000000` (Black dots + curve)

**Tool Used:** Nano Banana (AI image generation)

**Result:** A clean, professional logo that communicates "AI-powered file organization" at a glance.

The logo lives in `docs/screenshots/logo-sortoi.png` and is used in the README and GitHub repository.

---

##  🎉 Final Thoughts

This workflow isn't magic. It's:

1. **Simple prompts** with expert references
2. **Multiple AIs** for different strengths
3. **Continuous auditing** with Claude Web
4. **Iterative improvement** until satisfied

The result: Enterprise-grade code in a fraction of the time.

**Sortoi went from 4/10 to 9.8/10 using this exact process.**

You can do the same with any project.

---

## 🏆 Sortoi: Idea → Enterprise-Grade in Multiple Sessions 🚀

**From concept to production-ready AI File Sorter with:**
- 🤖 Kilo Code (Gemini 2.5-pro + Grok Fast-1)
- 💻 GitHub Copilot (Claude 4.5 Sonnet)
- 🔍 Claude Web (Code Auditor)
- ❤️ Human orchestration and strategic decision-making
