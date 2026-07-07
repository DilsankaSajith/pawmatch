I need to build a semantic search feature that allows users to find pet profiles by matching descriptions. Here's my technical approach - please guide me through implementing this with clean, production-ready code. Give me your opinion of this architecture whether it is good or bad. I want you to teach me how to connect a huggingface model from scratch as well.

**Core Requirements:**

- Users create pet profiles with text descriptions (already completed)

- Users can search for pets by entering descriptive text

- Search returns pet profiles with semantically similar descriptions

**Proposed Architecture:**

1. **Profile Creation Flow:**
   
   - User submits pet profile via `create-pet-profile-modal.tsx`
   
   - Extract description text and generate vector embeddings
   
   - Store embeddings in Redis (for similarity search)
   
   - Store pet profile data + vector in PostgreSQL using Prisma

2. **Search Flow:**
   
   - User enters description in search input
   
   - Convert search text to vector embeddings
   
   - Query Redis for vectors with cosine similarity > 0.5
   
   - Fetch and display matching pet profiles from PostgreSQL

**Technologies I'm using:**

- Frontend: Next.js

- Database: PostgreSQL with Prisma ORM

- Vector Store: Redis (with RediSearch module)

- Embeddings: huggingface model

**What I need from you:**

1. Complete implementation code for both flows

2. Best practices for vector storage and similarity search

3. Error handling and edge cases

4. Performance optimization tips

5. Clean code structure with proper separation of concerns
