# System Patterns

## High-Level Architecture
The project follows Clean Architecture principles with clear separation of concerns:

```
src/
├── application/    # Application business rules, DTOs, interfaces
├── domain/        # Enterprise business rules, core entities
├── infrastructure/# Framework & driver adapters
└── presentation/  # UI components and pages
```

## Core Technical Patterns

### 1. Repository Pattern
- Abstract data access through repository interfaces
- Implementation separation for testability
- Examples:
  - `AuthRepository` / `AuthRepositoryImpl`
  - `UserRepository` / `UserRepositoryImpl`

### 2. Service Pattern
- Encapsulated business logic in services
- Implementation independence through interfaces
- Key services:
  - `DateTimeService`
  - `LocalStorageService`
  - `LoggerService`

### 3. State Management
- Atom-based state management
- Global state atoms for:
  - Language preferences
  - User profile
  - Theme settings
  - Navigation state

### 4. Component Architecture
```
presentation/
├── components/    # Reusable UI components
├── layouts/       # Page layouts (Auth, Main)
├── pages/         # Route-based page components
├── providers/     # Context providers
└── routes/        # Routing configuration
```

## Error Handling Patterns
1. Custom exception types:
   - `NetworkException`
   - `NotImplementedException`

2. Response wrapper pattern:
   - `RequestResponse`
   - `SuccessResponse`
   - `FailureResponse`
   - `InvalidModelStateResponse`

## Data Flow Patterns
1. Repository Layer:
   - Abstract data access
   - HTTP client implementation
   - Response mapping

2. Service Layer:
   - Business logic encapsulation
   - Cross-cutting concerns

3. Component Layer:
   - Custom hooks for data access
   - Separation of UI and business logic

## Technical Decisions
1. **TypeScript** for type safety and better development experience
2. **Vite** for fast development and optimized builds
3. **Tailwind** for utility-first styling
4. **i18n** for internationalization support
5. **Clean Architecture** for maintainability and testability

## Operational Patterns
1. Environment-based configuration
   - Development settings
   - API endpoints configuration

2. Authentication flow:
   - Token-based authentication
   - Protected route pattern
   - Auth state management

3. Route management:
   - Public vs private routes
   - Role-based access control
   - Route configuration patterns